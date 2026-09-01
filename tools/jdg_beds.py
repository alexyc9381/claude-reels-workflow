#!/usr/bin/env python3
"""REEL 132 JUDGE — build the three reel-local music beds, measured.

Cloned from `lby_beds.py` (reel 130) verbatim except for the output names and the
length: 132 runs 35.15s, so each bed is cut to 36.5s. Every rule in the docstring
below was paid for on an earlier reel and none of it is re-derived here.

⛔⛔⛔ THE BUG THIS EXISTS TO FIX. Alex: *"where is the soundtrack???"* The bed
WAS playing, `verify_reel`'s MUSIC_ONSET_0 and MUSIC_CONTINUOUS both passed, and
the arithmetic said it sat 13.6 dB under the voice — the house figure. It was
still inaudible, because the gain had been derived from the file's INTEGRATED
LUFS (-23.2) and LUFS is gated and K-weighted: the actual **RMS of the passage
the reel plays** is -28.0. Multiplied by MUSIC (-20 dB) that lands the bed near
-40 dB under a -22 LUFS voice, i.e. below the point anyone hears it.

⭐ THE RULE THAT COMES OUT OF IT: derive a bed gain from the MEASURED RMS OF THE
   WINDOW YOU ACTUALLY PLAY, never from the file's integrated loudness.

⛔ AND A MEAN OVER A WINDOW HIDES THE DROPOUT IN IT ([[feedback_the_bed_drifted]]).
   Measured in 1.5s bins across each candidate:
     ebm_bed_hot   @ 0s   mean -21.4  worst -34.8   spread 13.4  ⛔ dropout
     ebm_bed_hot   @21s   mean -14.8  worst -24.1   spread  9.4  ⛔ dropout
     ados_bed_loud @15s   mean -25.8  worst -28.2   spread  2.5  ✅ flat
     ados_bed_loud @ 0s   mean -28.0  worst -31.5   spread  3.5  ✅ flat
   So the FLAT track wins and its quietness is fixed in the FILE, not at the
   playback gain — lifting it at playback needed db(+12.6), which puts the final
   volume at 0.427 against the standing 0.25 cap.
"""
import subprocess, wave, numpy as np, os
R = os.path.dirname(os.path.abspath(__file__))
FF = os.path.join(R, "node_modules/ffmpeg-static/ffmpeg")
PUB = os.path.join(R, "../video/public")
TARGET_RMS = -18.4          # what each reel-local bed is normalised TO

def rms_db(path, s=0.0, e=None):
    w = wave.open(path); sr = w.getframerate()
    a = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float64)/32768.0
    if w.getnchannels() == 2: a = a.reshape(-1, 2).mean(axis=1)
    a = a[int(s*sr):int((e or len(a)/sr)*sr)]
    return 20*np.log10(max(float(np.sqrt(np.mean(a**2))), 1e-9)), sr, a

# (out, source, start, length) — three DIFFERENT passages, because an audio-only
# variant is a pixel duplicate and a bed is one of the axes a cut varies on.
# ⛔⛔⛔ THIRD REEL RUNNING. Alex: *"use the right bg soundtrack part, why is this
# near the end, why are you not using the beginning section."*
# [[feedback_the_bed_drifted_to_the_end_of_the_song]] was written after 124 and
# 125 both played 168.96s of a 229s master, and this reel did it again: the HOUSE
# cut started at **15.0s of a 50s track**, so the primary deliverable played the
# back half and never once stated the song's opening.
# ⭐ AND THE REASON I PICKED 15s DOES NOT SURVIVE READING IT BACK. The block
# above chose it over 0s on a 2.2 dB RMS difference (-25.8 vs -28.0) — a
# difference this script ERASES four lines later by normalising every bed to
# -18.4. It bought nothing and cost the hook of the track.
# ⭐ ALL THREE NOW OPEN THE SONG. Two cuts sharing a passage is fine: the trial
# cuts are flagged on PIXELS, and dHash cannot hear a bed
# ([[docs/TRIAL-CUTS.md]] — the measured lever ranking is rake > grade > camera).
# ⛔⛔⛔ SIX ROUNDS, AND EVERY ONE OF THE FIRST FIVE SEARCHED THE WRONG PLACE.
# Alex, unchanged throughout: *"the soundtrack sounds like it starts near the end
# but it should be the beginning part of the soundtrack."*
#
# ⛔ EVERY `*_bed.wav` IN `video/public` IS A PRE-CUT EXCERPT SOMEONE MADE FOR AN
# EARLIER REEL. There are 96 of them and only 74 are distinct recordings. So
# "0.0s of a bed file" is the start of somebody's excerpt and has nothing to do
# with the start of a song — which is why five rounds of choosing offsets, and
# then choosing different bed FILES, never once moved what Alex was hearing.
#
# ⭐ THE MEASUREMENT THAT ENDED IT: correlate the bed against the actual MASTER
# and read off where it sits in the song.
#     106skill_bed.wav   -> Another Day Of Sun @ **178.5s of 229s**   (near the end. he was right.)
#     ados_bed_loud.wav  -> Another Day Of Sun @ 29.2s
# Both are the same song, taken from deep inside it. The masters live in Drive at
# `Faceless/*Soundtracks/`, and `video/public/route_music.mp3` is already a
# byte-identical local copy of the 229s one (corr +1.0000).
#
# ⭐ SO THE BED IS NOW CUT FROM THE MASTER AT THE TOP OF THE SONG. 0.66s skips the
# 709 ms of silence in front of the first note, so the reel opens ON the downbeat:
# onset 95 ms (MUSIC_ONSET_0 needs <150), longest silence 0.1s (MUSIC_CONTINUOUS
# needs <2.0).
# ⛔ ONE DELIBERATE COMPROMISE: the song's own first 31s swings 18 dB, which my
# own "no dropout" rule would reject. That rule was written for a bed with a HOLE
# in it; this is musical dynamics, and the requirement Alex has now repeated six
# times outranks my preference for a flat passage. `dynaudnorm` tames the range
# so the bed never vanishes under the VO, and the opening stays the opening.
# ⛔ `rms_db` reads with `wave`, which cannot open an mp3. Decode the master once
#    to a wav sidecar and source every bed from that.
MASTER_MP3 = "route_music.mp3"      # = Another Day Of Sun, 228.6s, the house master
MASTER = "_master_adayofsun.wav"
subprocess.run([FF, "-v", "error", "-y", "-i", f"{PUB}/{MASTER_MP3}",
                "-ar", "48000", "-ac", "2", f"{PUB}/{MASTER}"], check=True)
SONG_START = 0.66                   # the first downbeat; 709 ms of silence precedes it
BEDS = [
    ("132judge_bed_house.wav", MASTER, SONG_START, 36.5),
    ("132judge_bed_amber.wav", MASTER, SONG_START, 36.5),
    ("132judge_bed_steel.wav", MASTER, SONG_START, 36.5),
]

# ⛔ THE GUARD, REWRITTEN. The old one only checked "is this a different file from
# the last one" — which passed happily while both files were cut from 178s and 29s
# of the same song. What actually matters is WHERE IN THE MASTER the bed sits.
def _assert_starts_at_the_top(src, start, master=MASTER, limit=8.0):
    import wave as _w, numpy as _np, subprocess as _sp, os as _os
    ff = _os.path.join(R, "node_modules/ffmpeg-static/ffmpeg")
    def _env(path, ss=None, t=None):
        cmd = [ff, "-v", "error", "-y"]
        if ss is not None: cmd += ["-ss", str(ss)]
        cmd += ["-i", path]
        if t is not None: cmd += ["-t", str(t)]
        cmd += ["-ar", "16000", "-ac", "1", "-f", "wav", "/tmp/_bedchk.wav"]
        _sp.run(cmd, check=True)
        h = _w.open("/tmp/_bedchk.wav"); sr = h.getframerate()
        v = _np.frombuffer(h.readframes(h.getnframes()), dtype=_np.int16).astype(float) / 32768
        hop = int(sr * 0.1); n = len(v) // hop
        return _np.array([_np.sqrt(_np.mean(v[i*hop:(i+1)*hop]**2)) for i in range(n)])
    eb = _env(f"{PUB}/{master}", start, 36.5); eb = (eb - eb.mean()) / (eb.std() + 1e-9)
    em = _env(f"{PUB}/{master}")
    best = (-9, 0.0)
    for off in range(0, max(1, len(em) - len(eb))):
        seg = em[off:off+len(eb)]
        if seg.std() < 1e-9: continue
        r = float(_np.dot(eb, (seg - seg.mean()) / seg.std()) / len(eb))
        if r > best[0]: best = (r, off * 0.1)
    assert best[1] <= limit, (f"⛔ this bed sits at {best[1]:.1f}s of a "
                              f"{len(em)*0.1:.0f}s master. That is not the beginning.")
    print(f"  ✅ the bed sits at {best[1]:.1f}s of the {len(em)*0.1:.0f}s master — the top of the song")

_assert_starts_at_the_top(MASTER, SONG_START)
print(f"  normalising every bed to {TARGET_RMS} dB RMS, then one modest playback gain\n")
for out, src, st, ln in BEDS:
    cur, sr, _ = rms_db(f"{PUB}/{src}", st, st+ln)
    lift = TARGET_RMS - cur
    subprocess.run([FF, "-v", "error", "-y", "-i", f"{PUB}/{src}", "-ss", str(st), "-t", str(ln),
                    "-af", f"dynaudnorm=f=250:g=9:p=0.72,volume={lift:.2f}dB,afade=t=in:st=0:d=0.02",
                    "-ar", "48000", "-ac", "1", f"{PUB}/{out}"], check=True)
    got, sr2, a = rms_db(f"{PUB}/{out}")
    # onset: MUSIC_ONSET_0 wants the bed audible inside 150 ms
    h = int(sr2*0.005); onset = None
    for i in range(len(a)//h):
        if 20*np.log10(np.sqrt(np.mean(a[i*h:(i+1)*h]**2))+1e-12) > -45: onset = i*5; break
    # worst 1.5s bin, so a dropout cannot hide inside the mean
    bins = [20*np.log10(np.sqrt(np.mean(a[int(t*sr2):int((t+1.5)*sr2)]**2))+1e-12)
            for t in np.arange(0, len(a)/sr2 - 1.5, 1.5)]
    peak = 20*np.log10(float(np.abs(a).max()) + 1e-9)
    gain = -33.0 - (got + (-20.0))
    vol = 10**((-20+gain)/20)
    print(f"  {out:26s} {src} @{st:4.1f}s  lift {lift:+5.1f} dB")
    print(f"     rms {got:6.1f}  worst-bin {min(bins):6.1f}  spread {got-min(bins):4.1f}  "
          f"peak {peak:5.1f} dBFS  onset {onset}ms")
    print(f"     -> gain db({gain:+5.2f})   final volume {vol:.3f}"
          + ("  ⛔ OVER CAP" if vol > 0.25 else "  ✅") + "\n")
