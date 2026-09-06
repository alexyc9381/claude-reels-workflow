#!/usr/bin/env python3
"""
⛔⛔⛔ "THE WORD IS CUT OFF" — THE THIRD CAUSE, AND THE ONE NOTHING WAS MEASURING.

`word_audible.py` answers "can you HEAR it". It cannot answer "is the CAPTION still
on screen while you hear it", and on reel 135 that is what "agents is cut off" meant:
the audio was complete and the caption line had already flipped to the next sentence.

The mechanism, from SlopKit's KaraokeCaption:

    gate = max(start[i+1], min(end[i] + 0.05, start[i+1] + 0.5))
    line i+1 shows when   t + lead >= gate       (lead = 0.12)

so a line is replaced at `start(next line's first word) - 0.12` at the earliest. If a
word's TRUE end runs past that, its last syllable plays under the next line's text.

⛔ AND STORED WORD TIMES ARE NOT THE TRUE ONES. On this reel "agents." was stored
ending at 4.736 and actually ran to 4.895 (159 ms), and "We're" was stored starting at
4.906 and actually began at 5.000. Whisper's word ends are estimates; a sibilant or a
released stop keeps going after the estimate. So this measures the audio and compares.

⭐ A SIBILANT TAIL IS QUIET AND BRIGHT — the end of a word is NOT where the dB floor
is crossed. Speech is present here if EITHER broadband level is up OR the >4kHz share
is high, which is what keeps a trailing /s/ from being scored as silence.

    python3 tools/word_caption_audit.py <vo.wav> <words.json> [--lead 0.12] [--fix]
"""
import json, sys, subprocess, os
import numpy as np

FF = os.path.join(os.path.dirname(__file__), "node_modules/ffmpeg-static/ffmpeg")
SR = 48000
HOP = 0.005                     # 5 ms — a released /ts/ is ~20 ms long
WIN = 0.016
SPEECH_DB = -42.0               # broadband speech floor, well above the take's -51 gate
HI_SHARE = 0.14                 # >4kHz share that means "fricative", however quiet
LEAD = 0.12                     # SlopKit KaraokeCaption's constant
SLACK = 0.030                   # a word may lose 30 ms of caption before anyone sees it


def load(p):
    raw = subprocess.run([FF, "-v", "error", "-i", p, "-f", "f32le", "-ac", "1",
                          "-ar", str(SR), "-"], capture_output=True).stdout
    return np.frombuffer(raw, dtype=np.float32).copy()


def envelope(x):
    """(times, dBFS, >4kHz share) on a 5 ms grid."""
    n = int(WIN * SR); h = int(HOP * SR)
    idx = np.arange(0, max(0, len(x) - n), h)
    win = np.hanning(n)
    fr = np.fft.rfftfreq(n, 1 / SR); hi_bins = fr > 4000
    db = np.empty(len(idx)); hs = np.empty(len(idx))
    for k, i in enumerate(idx):
        seg = x[i:i + n]
        db[k] = 20 * np.log10(float(np.sqrt((seg ** 2).mean())) + 1e-12)
        sp = np.abs(np.fft.rfft(seg * win)) ** 2
        hs[k] = sp[hi_bins].sum() / (sp.sum() + 1e-20)
    return idx / SR, db, hs


def true_end(t, db, hs, stored_end, limit):
    """Walk forward from the stored end while speech is still present.

    ⛔⛔ ONLY MEANINGFUL WHERE A PAUSE FOLLOWS. The first version of this ran on
    every word and reported a CONSTANT 535 ms uncovered for 40 of them — because
    mid-sentence there is no silence for the walk to stop at, so it always ran to
    the limit and the "finding" was just (limit - switch). A measurement that
    returns the same number for everything is measuring the bound, not the word
    (docs/MEASURING). Callers must gate on a real gap."""
    speech = (db > SPEECH_DB) | ((hs > HI_SHARE) & (db > SPEECH_DB - 12))
    i = int(np.searchsorted(t, stored_end))
    stop = int(np.searchsorted(t, limit))
    last = i
    gap = 0
    while i < stop:
        if speech[i]:
            last = i; gap = 0
        else:
            gap += 1
            if gap > 8:            # 40 ms of true silence ends the word
                break
        i += 1
    return float(t[min(last, len(t) - 1)] + WIN)


def true_start(t, db, hs, stored_start, floor_t):
    speech = (db > SPEECH_DB) | ((hs > HI_SHARE) & (db > SPEECH_DB - 12))
    i = int(np.searchsorted(t, stored_start))
    lo = int(np.searchsorted(t, floor_t))
    # if the stored start sits in silence, walk FORWARD to where speech begins
    if i < len(speech) and not speech[i]:
        j = i
        while j < len(speech) and not speech[j]:
            j += 1
        return float(t[min(j, len(t) - 1)])
    # otherwise walk BACK to the onset
    j = i
    while j > lo and speech[j - 1]:
        j -= 1
    return float(t[j])


NO_PLURAL = {"is", "was", "has", "this", "its", "his", "us", "yes", "less", "plus",
             "across", "process", "business", "class", "unless", "always"}


def plural_s(t, db, hs, w0, w1):
    """Is there a sibilant burst in the last part of this word?

    ⛔⛔ WHISPER CANNOT ADJUDICATE A PLURAL, IN EITHER DIRECTION. On reel 135 it
    read "agents." as 'agent.' while the /s/ was plainly there, and it read
    "dollars" INTO a slice that did not contain it. Both times a transcription
    was taken as evidence about a phoneme. A final /s/ or /z/ is a physical
    thing — a high-frequency burst — so measure it and stop asking the model."""
    i = int(np.searchsorted(t, max(w0, w1 - 0.26)))
    j = int(np.searchsorted(t, w1 + 0.02))
    if j <= i:
        return False, 0.0
    seg_hs, seg_db = hs[i:j], db[i:j]
    live = seg_db > SPEECH_DB - 14
    if not live.any():
        return False, 0.0
    peak = float(seg_hs[live].max())
    return peak >= 0.18, peak


def main():
    a = sys.argv[1:]
    wav, wjson = a[0], a[1]
    lead = float(a[a.index("--lead") + 1]) if "--lead" in a else LEAD
    fix = "--fix" in a

    ws = json.load(open(wjson))
    key = None
    if isinstance(ws, dict):
        key = "words" if "words" in ws else None
        ws = ws[key] if key else ws
    W = lambda w: (w.get("word") or w.get("w") or "").strip()
    S = lambda w: w.get("start", w.get("s"))
    E = lambda w: w.get("end", w.get("e"))

    t, db, hs = envelope(load(wav))
    print(f"word_caption_audit · {os.path.basename(wav)} · {len(ws)} words · lead {lead}s")
    print("-" * 96)

    bad, drift, plur = [], [], []
    for i, w in enumerate(ws):
        nxt = ws[i + 1] if i + 1 < len(ws) else None
        if not nxt:
            continue
        ts = true_start(t, db, hs, S(nxt), E(w))
        # ⛔ a word can only be MEASURED where a pause follows it, and it can only
        #    LOSE its line where a line break is certain: a sentence end, or a gap
        #    big enough that SlopKit breaks on it (>0.34s).
        gap = min(S(nxt), ts) - E(w)
        ends_sent = W(w)[-1:] in ".!?"
        if not (ends_sent or gap > 0.34):
            continue
        te = true_end(t, db, hs, E(w), min(S(nxt), ts))
        bare = W(w).strip(".,!?:;\"'").lower()
        if len(bare) >= 4 and bare.endswith("s") and bare not in NO_PLURAL:
            plur.append((W(w),) + plural_s(t, db, hs, S(w), te))
        # ⛔ 0.035, not 0.015: the walk reports t[last] + WIN on a 5ms grid, so its
        #    own resolution is ~21ms. A threshold under that makes every corrected
        #    word warn forever about the measurement's window (docs/MEASURING).
        if te - E(w) > 0.035:
            drift.append((i, W(w), E(w), te))
        # SlopKit holds a line until its own last word's stored end, so the
        # earliest the caption can flip is whichever of those comes LATER.
        switch = max(min(S(nxt), ts) - lead, E(w))
        if te > switch + SLACK:
            bad.append((i, W(w), te, switch, W(nxt), S(nxt), ts))

    if drift:
        print("⚠ STORED END IS INSIDE THE WORD (measured from the audio):")
        for i, s, e, te in drift:
            print(f"    [{i:3d}] {s:<16s} stored end {e:6.3f}  true end {te:6.3f}"
                  f"   {1000*(te-e):5.0f} ms short")
        print()
    if bad:
        print("⛔ WORD OUTLIVES ITS CAPTION LINE:")
        for i, s, te, sw, ns, nss, nts in bad:
            print(f"    [{i:3d}] {s:<16s} true end {te:6.3f}  caption can flip {sw:6.3f}"
                  f"   {1000*(te-sw):5.0f} ms uncovered   (next {ns!r} stored {nss:.3f} true {nts:.3f})")
        print()

    if fix and (bad or drift):
        touched = 0
        for i, _, _, te in drift:
            w = ws[i]
            (w.__setitem__("end", round(te, 3)) if "end" in w else w.__setitem__("e", round(te, 3)))
            touched += 1
        # ⛔⛔ ENDS ONLY — NEVER MOVE A START. Pushing the next word's onset later
        #    collided it with ITS successor and needed a ripple through the rest of
        #    the sentence; three words inverted before I stopped. The stored ENDS are
        #    the thing that is actually wrong (whisper under-reads a released stop or
        #    a sibilant), and once SlopKit refuses to retire a line before its own
        #    last word's end, correcting the ends is sufficient on its own.
        for i in range(len(ws) - 1):
            ek = "end" if "end" in ws[i] else "e"
            if E(ws[i]) > S(ws[i + 1]):
                ws[i][ek] = round(S(ws[i + 1]), 3)
        out = {key: ws} if key else ws
        json.dump(out, open(wjson, "w"), indent=1)
        print(f"→ wrote {touched} corrected times into {wjson}")
        return 0

    cuts = [float(v) for v in (a[a.index("--cuts") + 1].split(",") if "--cuts" in a else [])]
    if cuts:
        print("SCENE CUTS vs the sentence they end — a cut inside a word reads as")
        print("'the word is cut off' even when the audio is perfect:")
        bad_cut = False
        ends = []
        for i, w in enumerate(ws[:-1]):
            if W(w)[-1:] in ".!?":
                ns = true_start(t, db, hs, S(ws[i + 1]), E(w))
                ends.append((W(w), true_end(t, db, hs, E(w), ns), ns))
        for c in cuts:
            nm, e, ns = min(ends, key=lambda v: abs(v[1] - c))
            ok2 = c >= e
            bad_cut |= not ok2
            print(f"    cut {c:7.3f}   after {nm:<12s} (ends {e:6.3f}, next {ns:6.3f})   "
                  + ("ok" if ok2 else f"⛔ INSIDE THE WORD by {1000*(e-c):.0f} ms -> move to {(e+ns)/2:.3f}"))
        print()
        if bad_cut:
            print("❌ a scene cut lands inside a spoken word.")
            return 1
    if plur:
        print("PLURAL /s/ — measured as a high-frequency burst, not transcribed:")
        for nm, okp, pk in plur:
            print(f"    {nm:<16s} peak >4kHz {pk*100:5.1f}%   {'ok' if okp else '⛔ NO SIBILANT'}")
        print()
    if any(not o for _, o, _ in plur):
        print("❌ a plural loses its /s/ in the audio.")
        return 1
    if bad:
        print("❌ at least one word plays under the NEXT line's text — that is what")
        print("   'the word is cut off' looks like when the audio is complete.")
        return 1
    print("✅ every word's caption line is still on screen when the word finishes.")
    return 0


sys.exit(main())
