#!/usr/bin/env python3
"""Re-seat caption words that SPAN A MEASURED SILENCE.

    python3 tools/mem_caption_reseat.py FINAL.wav WORDS.json [--write]

⛔ THIS IS NOT A HAND-PATCH, AND THE DISTINCTION MATTERS. `build_captions.py`
   forbids patching whisper's MISHEARS word by word, because whisper mangles a
   different word on every run and a fix-dict tuned to the last run silently
   passes the next one. This touches no WORDS at all — it only enforces one
   physical rule against the audio itself:

       A SPOKEN WORD CANNOT SPAN A SILENCE. If a word's [start,end] contains a
       measured gap, the word ends at the end of its own burst and the NEXT
       word starts at the next measured onset.

   That is a general law, it is re-derivable from the wav on any run, and it
   fixes the class rather than the instance.

WHY REEL 123 NEEDED IT. Line B6 was delivered haltingly — "It ... even ...
works in ... your ... browser" — with four internal pauses that the cut trims to
0.14s each. Both `medium.en` and `large-v3` align that stretch identically and
both put ' in' at 21.63-22.67: a 1.04s word straddling two silences, with 'your'
seated 0.69s late behind it. It is not a model problem, so re-running the model
is not a fix.
"""
import json, math, sys, wave, struct

MAXW = 0.55          # a word longer than this is a candidate, never a target
SIL_DB = -42.0       # what counts as silence, matched to the VO's own floor
MIN_SIL = 0.07       # a gap shorter than this is a stop consonant, not a pause
HOP = 0.01


def envelope(path):
    w = wave.open(path, "rb")
    sr, ch, n = w.getframerate(), w.getnchannels(), w.getnframes()
    a = struct.unpack("<%dh" % (n * ch), w.readframes(n)); w.close()
    mono = [(a[i] + a[i + 1]) / 2 for i in range(0, len(a) - 1, ch)] if ch == 2 else list(a)
    H = int(sr * HOP); env = []
    for i in range(0, len(mono) - H, H):
        s = sum(v * v for v in mono[i:i + H]) / H
        env.append(20 * math.log10(math.sqrt(s) / 32768.0 + 1e-12))
    return env


def bursts(env, t0, t1):
    """contiguous speech runs inside [t0,t1], as (start,end) seconds"""
    i0, i1 = int(t0 / HOP), min(len(env), int(t1 / HOP))
    out, run = [], None
    sil = 0
    for i in range(i0, i1):
        if env[i] > SIL_DB:
            if run is None: run = i
            sil = 0
        else:
            sil += 1
            if run is not None and sil * HOP >= MIN_SIL:
                out.append((run * HOP, (i - sil) * HOP)); run = None
    if run is not None: out.append((run * HOP, i1 * HOP))
    return out


def main(wav, jsn, write=False):
    env = envelope(wav)
    W = json.load(open(jsn))
    fixed = 0
    for i, w in enumerate(W):
        if w["end"] - w["start"] <= MAXW: continue
        bs = bursts(env, w["start"], w["end"])
        if len(bs) < 2: continue
        new_end = round(bs[0][1] + 0.02, 3)
        if new_end <= w["start"] + 0.05: continue
        print(f"  ' {w['word'].strip()}' {w['start']:.3f}-{w['end']:.3f} "
              f"spans {len(bs)} bursts -> end {new_end:.3f}")
        w["end"] = new_end
        # the following word is re-seated onto the NEXT measured onset, and only
        # if that moves it EARLIER — this can tighten a late word, never delay one
        if i + 1 < len(W):
            nxt, on = W[i + 1], round(bs[1][0] - 0.02, 3)
            if on < nxt["start"] - 0.05 and on > new_end:
                print(f"  ' {nxt['word'].strip()}' {nxt['start']:.3f} -> {on:.3f} "
                      f"(next measured onset)")
                nxt["start"] = on
        fixed += 1
    # monotonic, always
    for i in range(1, len(W)):
        W[i]["start"] = max(W[i]["start"], W[i - 1]["start"] + 0.03)
        W[i]["end"] = max(W[i]["end"], W[i]["start"] + 0.05)
    print(f"{fixed} word(s) re-seated")
    if write:
        json.dump(W, open(jsn, "w"), indent=1)
        print(f"wrote {jsn}")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2], "--write" in sys.argv)
