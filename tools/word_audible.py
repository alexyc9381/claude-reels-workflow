#!/usr/bin/env python3
"""
⭐⭐⭐ THE ACCEPTANCE TEST FOR "THAT WORD IS CUT OFF".

    python3 tools/word_audible.py out/135_AGENCY.mp4 public/agency135_script.txt

Reel 135 took SEVEN rounds on one word because every check measured the AUDIO
(level, spectrum, cue overlap, caption line) instead of asking the only question
that matters: CAN THE WORD STILL BE HEARD?

⛔⛔⛔ AND A FULL-SENTENCE TRANSCRIPTION IS NOT ENOUGH. Whisper's language model
RECONSTRUCTS a word it cannot hear from the words around it — "for exactly zero
___" predicts "dollars" whether or not the audio is there. That gave a false
pass on this reel. So each sentence-final word is ALSO transcribed on an exact
slice with no surrounding sentence to infer from.

⛔ Decode the WHOLE file and slice in numpy. `ffmpeg -ss` on an mp4 lands up to
40 ms off because of AAC priming, which is enough to clip the word you are
testing and produce a false FAIL.
"""
import subprocess, sys, re, os, tempfile, wave
import numpy as np

# whisper's own quirks on correct audio, not defects
# ⛔⛔ NO PLURAL->SINGULAR ENTRIES. This table used to map agents->agent and
#    wizards->wizard, so a word that had genuinely LOST its /s/ would pass — and
#    "the word agents is cut off" came back while this gate said ok. Whisper is
#    unreliable on a final /s/ in BOTH directions (it dropped one that was there
#    and reconstructed one that was not), so the plural is now guarded by
#    MEASUREMENT in tools/word_caption_audit.py, which looks for the >4kHz burst
#    a sibilant physically is. Never excuse a phoneme with a transcription.
KNOWN_MISHEARS = {"claude": ("cloud", "clod"), "comment": ("come", "commend")}
SR = 48000
VO_PCM = None          # set from --vo; the stem the sibilant floor is calibrated on


def decode(ff, src, out, rate=SR):
    subprocess.run([ff, "-y", "-v", "error", "-i", src, "-ac", "1", "-ar", str(rate), out], check=True)
    w = wave.open(out)
    return np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16)


def transcribe(model, ff, pcm, tmp):
    p = os.path.join(tmp, "seg.wav")
    w = wave.open(p, "wb"); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes(np.clip(pcm, -32768, 32767).astype(np.int16).tobytes()); w.close()
    p16 = os.path.join(tmp, "seg16.wav")
    subprocess.run([ff, "-y", "-v", "error", "-i", p, "-ac", "1", "-ar", "16000", p16], check=True)
    segs, _ = model.transcribe(p16, word_timestamps=True, language="en", vad_filter=False)
    return [(w.word.strip(), w.start, w.end) for s in segs for w in s.words]


def plural_sibilant(pcm, word, full, floor=0.35):
    """Measure the final /s/ or /z/ of `word`: a sibilant is a >4kHz burst.

    ⛔⛔ MEASURE THIS ON THE VO STEM, NOT THE MIX. The floor is a >4kHz SHARE and
    a share has a denominator: the music bed adds broadband energy, so the same
    healthy sibilant reads 51.5% in the VO and 29.9% in the deliverable and the
    gate false-fails. Pass --vo. (An HF-CONTRAST measure was tried as a
    mix-proof alternative and separates nothing — the known-bad "agents" scored
    +22.0 dB against a known-good "wizards" at +13.2, because it measures the
    word-against-silence step, not the sibilant.)

    Located from the whisper word list so it needs no external word file. Returns
    (ok, peak_share). The 0.35 floor is set from this reel's own healthy
    sibilants — specialist 55.6%, wizards 51.4%, dollars 77.3% — and above the
    27.1% that "agents" measured while Alex was reporting it as cut off."""
    stem = word[:-1].lower()
    cand = [(a, b) for t, a, b in full
            if t.strip(".,!?").lower().startswith(stem[:max(4, len(stem) - 1)])]
    if not cand:
        return True, 0.0                       # cannot locate it: do not invent a failure
    a, b = cand[-1]
    x = pcm.astype(np.float64) / 32768.0
    n = int(0.016 * SR)
    fr = np.fft.rfftfreq(n, 1 / SR); hb = fr > 4000
    best = 0.0
    lo, hi = max(0.0, b - 0.34), b + 0.14
    t = lo
    while t < hi:
        seg = x[int(t * SR):int(t * SR) + n]
        if len(seg) == n:
            sp = np.abs(np.fft.rfft(seg * np.hanning(n))) ** 2
            best = max(best, float(sp[hb].sum() / (sp.sum() + 1e-20)))
        t += 0.005
    return best >= floor, best


def main():
    if len(sys.argv) < 3:
        sys.exit(__doc__)
    mp4, script = sys.argv[1], sys.argv[2]
    here = os.path.dirname(os.path.abspath(__file__))
    ff = os.path.join(here, "node_modules/ffmpeg-static/ffmpeg")
    tmp = tempfile.mkdtemp()
    from faster_whisper import WhisperModel
    model = WhisperModel("small.en", device="cpu", compute_type="int8")

    pcm = decode(ff, mp4, os.path.join(tmp, "full.wav"))
    # ⛔ the plural check needs the STEM, not the mix — see plural_sibilant
    global VO_PCM
    if "--vo" in sys.argv:
        VO_PCM = decode(ff, sys.argv[sys.argv.index("--vo") + 1],
                        os.path.join(tmp, "vo.wav"))
    full = transcribe(model, ff, pcm, tmp)
    words = [w for w, _, _ in full]
    heard = [w.strip(".,!?$-").lower() for w in words]
    # ⛔ whisper JOINS and SPLITS tokens freely — "ad writers" comes back as the
    #    single token "adwriters", "front-end" as "front -end". Match against the
    #    joined text as well as the token list, or these read as missing words.
    joined = "".join(heard)
    print("transcribed from the delivered file:\n  " + " ".join(words) + "\n")

    fails = []
    # ⛔ whisper COLLAPSES a spoken currency phrase into notation: "zero dollars"
    #    comes back as the single token "$0." — so a "$" anywhere in the
    #    transcription means those two words were heard, not missed.
    currency = any("$" in w for w in words)
    want = list(dict.fromkeys(re.findall(r"[a-z']+", open(script).read().lower())))
    for w in want:
        if len(w) <= 3 or w in heard:
            continue
        if any(alt in heard for alt in KNOWN_MISHEARS.get(w, ())):
            continue
        # ⛔⛔ A PLURAL IS SETTLED BY MEASUREMENT, NEVER BY THE TRANSCRIPT.
        #    Whisper reads "Reddit wizards" as "and write a wizard" even from the
        #    CLEAN VO with no bed, where the /z/ measures 51.5% >4kHz and sits
        #    +9.6 dB over the bed — the mis-heard "Reddit" forces a singular
        #    article and the plural cannot survive it. Asking the model was the
        #    original bug in the other direction too (it PASSED a missing /s/ via
        #    a mishear entry). So when the singular is heard, stop asking and go
        #    look for the sibilant, which is a physical thing.
        if w.endswith("s") and len(w) > 3 and (w[:-1] in heard or w[:-1] in joined):
            ok_s, pk = plural_sibilant(VO_PCM if VO_PCM is not None else pcm, w, full)
            src = "VO stem" if VO_PCM is not None else "MIX (pass --vo!)"
            print(f"   plural {w!r}: singular heard; sibilant measured on the {src}: "
                  f"{pk*100:.1f}% >4kHz -> {'ok' if ok_s else '⛔ MISSING'}")
            if ok_s:
                continue
        if currency and w in ("zero", "dollars"):
            continue
        if w in joined:                     # joined/split tokens
            continue
        fails.append((w, "not transcribed at all"))

    # ⭐ the isolation pass: every sentence-final word, alone
    print("isolation check (no sentence context to infer from):")
    for w, a, b in full:
        if not w.strip().endswith((".", "!", "?")):
            continue
        # ⛔⛔ THE TRAILING ROOM MUST EXCEED A WORD-FINAL FRICATIVE. At +0.06 this
        #    slice CLIPPED THE VERY PHONEME IT EXISTS TO CHECK: an 85ms /s/ was cut
        #    to 60ms and "specialist agents" came back as "specialist ages", so the
        #    gate reported a repaired word as broken. Verified on a known-bad and a
        #    known-good before changing: at +0.20 the untouched take still reads
        #    'specialist agent.' 0/2 and the repaired one 'specialist agents.' 2/2,
        #    so the window discriminates. Widening it is not loosening it.
        s, e = int(max(0, a - 0.22) * SR), int(min(len(pcm) / SR, b + 0.20) * SR)
        got = " ".join(x for x, _, _ in transcribe(model, ff, pcm[s:e], tmp))
        # ⛔ a "$0." token is whisper's NOTATION for the spoken words "zero
        #    dollars" — check the isolated slice for the WORD it stands for.
        stem = "dollar" if w.lstrip().startswith("$") else w.strip(".,!?$-").lower()
        if not stem:
            continue
        g = got.lower()
        ok = stem[:4] in g or stem in g
        # ⛔ whisper writes a spoken currency word as NOTATION: "zero dollars"
        #    comes back as "$0." or "$1 .00." — a "$" is POSITIVE evidence that
        #    it heard the word, not a miss. Earlier failures on this reel came
        #    back as "0." and "" with no "$" at all, which is the real signal.
        if stem.startswith("dollar") and "$" in got:
            ok = True
        if not ok and any(alt in g for alt in KNOWN_MISHEARS.get(stem, ())):
            ok = True
        print(f"   {w:14s} -> {got!r}  {'ok' if ok else '⛔'}")
        if not ok:
            fails.append((w, f"isolated slice transcribed as {got!r}"))

    if fails:
        print("\n  ⛔ NOT AUDIBLE:")
        for w, why in fails:
            print(f"     {w}: {why}")
        print("     -> check, in this order: the cue list at that word's TRUE end,")
        print("        the bed duck, the caption line, and the splice point.")
        sys.exit(1)
    print("\n  ✅ every script word is audible, in context AND in isolation.")


if __name__ == "__main__":
    main()
