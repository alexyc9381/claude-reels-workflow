#!/usr/bin/env python3
"""
build_captions.py — the CANONICAL house caption builder.

Implements CLAUDE-REELS-PLAYBOOK C4 + memory/caption-sync-gate.md so the method
stops being re-improvised per reel (reel 81 hand-patched whisper mishears three
separate times, which that memory explicitly forbids).

    python3 tools/build_captions.py FINAL.wav SCRIPT.txt OUT.json

  1  CANON = the exact VO script, from a file. This is the source of truth for
     the WORDS. Never patch whisper's mishears word by word — whisper mangles
     DIFFERENT words on each run, so a fix-dict tuned to the last run silently
     passes the next one.
  2  Transcribe the FINAL wav for TIMING only (faster-whisper, word timestamps).
  3  Align CANON -> whisper with difflib.SequenceMatcher on normalised tokens:
       equal/replace(same len) -> map 1:1 to whisper's starts
       delete (script word whisper missed) -> interpolate between neighbours
       insert (whisper hallucination) -> skip
  4  Group into caption LINES the same way SlopKit.KaraokeCaption does, measure
     each line's REAL speech onset from the wav (RMS rising edge), and anchor the
     line's first word to it, shifting the rest of the line by the same constant
     delta. Whisper's per-line bias is +-0.1..0.4s scatter, not a constant, so
     this is the step that actually removes desync.
  5  Emit [{start, end, word}] with a LEADING SPACE on `word`, forced monotonic.
  6  Assert the emitted words equal the script, and that no line ends on a
     dangling connector.
"""
import json, math, re, struct, sys, wave
from difflib import SequenceMatcher

LEAD = 0.10           # captions land slightly BEFORE the word, never after
MAX_DELTA = 0.25      # a bigger measured shift than this is suspect
DANGLE = re.compile(r"^(i|a|an|the|to|of|and|or|you|your|for|is|it|in|on|so|my|as|at|but|if|their|its|our|his|her|with|from)$", re.I)
norm = lambda w: re.sub(r"[^a-z0-9.]", "", w.lower())


def envelope(path, hop=0.01):
    """RMS in `hop`-second windows, in dBFS."""
    w = wave.open(path, "rb")
    sr, ch, n = w.getframerate(), w.getnchannels(), w.getnframes()
    a = struct.unpack("<%dh" % (n * ch), w.readframes(n)); w.close()
    mono = [(a[i] + a[i + 1]) / 2 for i in range(0, len(a) - 1, ch)] if ch == 2 else list(a)
    H = int(sr * hop); env = []
    for i in range(0, len(mono) - H, H):
        s = sum(v * v for v in mono[i:i + H]) / H
        env.append(20 * math.log10(math.sqrt(s) / 32768.0 + 1e-12))
    return env, hop


def onset(env, hop, around, win=0.25):
    """The quiet->loud rising edge nearest `around`, or None."""
    lo, hi = int((around - win) / hop), int((around + win) / hop)
    lo, hi = max(0, lo), min(len(env), hi)
    if hi - lo < 3: return None
    seg = env[lo:hi]
    floor, peak = min(seg), max(seg)
    if peak - floor < 6: return None                      # no clear edge here
    thr = (floor + peak) / 2
    for k in range(1, len(seg)):
        if seg[k - 1] < thr <= seg[k]: return (lo + k) * hop
    return None


def lines_of(words):
    """Group exactly as SlopKit.KaraokeCaption does, so measured onsets are
       anchored to the lines the viewer actually sees."""
    out, cur = [], []
    for i, w in enumerate(words):
        cur.append(i)
        nxt = words[i + 1] if i + 1 < len(words) else None
        gap = (nxt["start"] - w["end"]) if nxt else 99
        ends = bool(re.search(r"[.!?]$", w["word"].strip()))
        dang = bool(DANGLE.match(norm(w["word"]).rstrip(".")))
        if (len(cur) >= 3 or gap > 0.34 or ends) and not (dang and nxt and not ends and len(cur) < 4):
            out.append(cur); cur = []
    if cur: out.append(cur)
    # mirror SlopKit exactly: hand a trailing connector to the next line, and
    # repeat to a fixed point (popping "the" can expose "on" underneath it)
    for _ in range(4):
        changed = False
        for i in range(len(out) - 1):
            if len(out[i]) < 2: continue
            last = words[out[i][-1]]["word"].strip()
            if re.search(r"[.!?]$", last) or not DANGLE.match(norm(last).rstrip(".")): continue
            out[i + 1].insert(0, out[i].pop()); changed = True
        if not changed: break
    # a hand-off can push a line to 5 words; split anything over 4, then re-settle
    for _ in range(3):
        touched = False
        i = 0
        while i < len(out):
            if len(out[i]) > 4:
                half = (len(out[i]) + 1) // 2
                tail = out[i][half:]; out[i] = out[i][:half]
                out.insert(i + 1, tail); touched = True
            i += 1
        for i in range(len(out) - 1):
            if len(out[i]) < 2: continue
            last = words[out[i][-1]]["word"].strip()
            if re.search(r"[.!?]$", last) or not DANGLE.match(norm(last).rstrip(".")): continue
            out[i + 1].insert(0, out[i].pop()); touched = True
        if not touched: break
    return out


def main(wav, script_path, out_path):
    canon = open(script_path).read().split()
    from faster_whisper import WhisperModel
    segs, _ = WhisperModel("base.en", device="cpu", compute_type="int8").transcribe(
        wav, word_timestamps=True, beam_size=5)
    hyp = [{"w": x.word.strip(), "s": x.start, "e": x.end} for s in segs for x in s.words]
    print(f"  script {len(canon)} words · whisper {len(hyp)} tokens")

    # ---- 3 · align the SCRIPT to whisper's timings -------------------------
    sm = SequenceMatcher(None, [norm(w) for w in canon], [norm(h["w"]) for h in hyp], autojunk=False)
    timed = [None] * len(canon)
    for tag, i1, i2, j1, j2 in sm.get_opcodes():
        if tag in ("equal", "replace") and (i2 - i1) == (j2 - j1):
            for k in range(i2 - i1): timed[i1 + k] = (hyp[j1 + k]["s"], hyp[j1 + k]["e"])
        elif tag == "replace":                      # uneven: spread the span evenly
            s0, e0 = hyp[j1]["s"], hyp[j2 - 1]["e"]; n = i2 - i1
            for k in range(n):
                timed[i1 + k] = (s0 + (e0 - s0) * k / n, s0 + (e0 - s0) * (k + 1) / n)
        elif tag == "delete":                       # whisper missed these words
            prev = hyp[j1 - 1]["e"] if j1 > 0 else 0.0
            nxt = hyp[j1]["s"] if j1 < len(hyp) else prev + 0.3 * (i2 - i1)
            n = i2 - i1
            for k in range(n):
                timed[i1 + k] = (prev + (nxt - prev) * k / n, prev + (nxt - prev) * (k + 1) / n)
        # 'insert' = whisper hallucination -> skipped
    assert all(t is not None for t in timed), "alignment left a word untimed"
    words = [{"start": round(s, 3), "end": round(e, 3), "word": " " + w}
             for w, (s, e) in zip(canon, timed)]

    # ---- 4 · anchor every LINE to its measured onset -----------------------
    env, hop = envelope(wav)
    ls = lines_of(words)
    moved = carried = 0; prev_delta = 0.0
    for idx in ls:
        first = words[idx[0]]
        m = onset(env, hop, first["start"])
        if m is None:
            delta = prev_delta; carried += 1              # continuous line: carry the last delta
        else:
            delta = m - first["start"]
            if abs(delta) > MAX_DELTA: delta = prev_delta; carried += 1
            else: moved += 1
        prev_delta = delta
        for i in idx:
            words[i]["start"] = round(words[i]["start"] + delta, 3)
            words[i]["end"] = round(words[i]["end"] + delta, 3)
    print(f"  {len(ls)} caption lines · {moved} anchored to a measured onset · {carried} carried")

    # ---- 5 · global lead, clamp, force monotonic ---------------------------
    for w in words:
        w["start"] = round(max(0.0, w["start"] - LEAD), 3)
        w["end"] = round(max(w["start"] + 0.04, w["end"] - LEAD), 3)
    for a, b in zip(words, words[1:]):
        if b["start"] < a["start"]: b["start"] = a["start"]
        if b["end"] < b["start"] + 0.04: b["end"] = round(b["start"] + 0.04, 3)

    # ---- 6 · gates ---------------------------------------------------------
    assert [w["word"].strip() for w in words] == canon, "emitted words != script"
    assert all(b["start"] >= a["start"] - 1e-6 for a, b in zip(words, words[1:])), "not monotonic"
    bad = []
    for idx in lines_of(words):
        last = words[idx[-1]]["word"].strip()
        if DANGLE.match(norm(last).rstrip(".")) and not re.search(r"[.!?]$", last): bad.append(last)
    if bad: print(f"  ⚠ lines ending on a dangling word: {bad}")
    json.dump(words, open(out_path, "w"), indent=0)
    print(f"  wrote {out_path}: {len(words)} words, span {words[0]['start']} -> {words[-1]['end']}")


if __name__ == "__main__":
    if len(sys.argv) != 4:
        print(__doc__); sys.exit(2)
    main(*sys.argv[1:])
