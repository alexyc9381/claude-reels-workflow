# AUDIT FIRST — how to stop spending rounds on one instance of a class

Harvested from reel 86 **ARMY** (Aug 2026), which took roughly nine rounds of
feedback to ship. Most of those rounds were avoidable, and the pattern is the
same one every time.

> **The finding: almost every round was a CLASS of defect where one INSTANCE got
> fixed.** Five whole-reel audits, each under a minute, each collapse a round.

Run them **before the first review**, not in response to a note.

> **Companion doc:** [`MEASURING.md`](MEASURING.md) — an audit is only worth the round it
> saves if its number is about the thing you think it is. That doc is the 7 laws for that,
> with the eight times on reel 86 CODE that a correct calculation over the wrong signal
> produced a confident false answer.

---

## 1 · The five audits

### A. Every silent run in the VO
```bash
# every gap > 0.25s, in one pass over the whole file
python3 - <<'PY'
import wave, numpy as np
w=wave.open('vo.wav'); sr=w.getframerate()
a=np.frombuffer(w.readframes(w.getnframes()),dtype=np.int16).astype(np.float32)/32768
if w.getnchannels()==2: a=a.reshape(-1,2).mean(1)
step, run, runs = 0.02, 0, []
for i in range(int(len(a)/sr/step)):
    t=i*step; s=a[int(t*sr):int((t+step)*sr)]
    db=20*np.log10(max(1e-9,np.sqrt((s**2).mean())))
    if db < -62: run+=1
    else:
        if run*step > 0.25: runs.append((round(t-run*step,2), round(run*step,2)))
        run=0
print(runs)
PY
```
On ARMY this returned **exactly two** results. Alex reported them as separate
notes **five rounds apart**. House hold at a sentence boundary is 0.12s (law 60).

⛔ **Re-run this after ANY audio surgery.** Muting a take fragment in place
(correct — law 79 says never move audio) removes the SOUND and leaves the TIME.
That is how a "fix" in round 3 became a fresh complaint in round 6.

### B. The frame every cut lands on
```bash
for T in $(cat shot_starts.txt); do
  ffmpeg -y -v error -i reel.mp4 -ss $T -frames:v 1 cuts/c$T.png
done
# then tile them into ONE sheet and look at 22 faces at once
```
Two cuts in ARMY landed on a bad pose. The second was only found after the
subject reported it twice more.

⛔ Crop `full` shots and card shots differently — the face is in a different
place — or half the sheet is unreadable.

### C. Empty shots
```bash
grep -n "<Shot .*full />" src/scenes/Reel.tsx      # no children, no header
```
On ARMY this was **5.41 seconds — 54% of the first ten** — with no header and no
body. Six rounds were spent elevating the animations *next to* it while the
subject kept saying the opening was weak. **"Too boring" is often ABSENCE, not
quality.**

### D. Every header against the word list
For each shot, print the header beside the words spoken in its own window, and
beside the whole transcript.

⛔ A header can restate something said **ten seconds later** and still be a
repeat. `67 AGENTS` over the hook was fine in its own window and redundant
across the reel.

### E. Every seam in the conform EDL
```bash
python3 -c "
import json; e=json.load(open('out/vo5/<reel>.edl.json')); acc=0
for a,b in e['spans']:
    print('seam at out frame', round(acc*30)); acc += b-a"
```
Any shot boundary or held frame near a seam is suspect. ARMY's EDL kept a
**0.17s span — five frames** — between two long ones, and the picture was
conformed to the same cut list, so the video jump-cut to an unrelated moment.

---

## 2 · The symptom was in a different place from the cause, six times

| reported | actual cause |
|---|---|
| "the trophy is on his face" | drawn at `hy-132`; a 210px sprite's crown is `hy-140`. **8px below the top of his head** — placed from the anchor (0.92 = FEET) instead of the crown |
| "I'm turning away at 22s" | not a performance. A 5-frame orphan span in the conform EDL. **Nose x moved 0.494 -> 0.281 in ONE frame** (460px of a 2160-wide source). No head moves that fast — it is a cut |
| "a mumble at 15s" | a real un-cut take fragment, "that was...". The full-file transcript is clean; only the isolated 15.15-15.75 window exposes it |
| "still a pause at 15s" | self-inflicted — muting left the time behind |
| "I don't like the hammers at 29s" | five cues written for a hammering animation that had been deleted two rounds earlier. The visual changed; the cue list did not |
| "cut glitch at 14s" + "unnecessary cut at 13s" | the same boundary. Two shots drew the same object, same geometry, same camera — a cut carrying no information reads as a fault, not an edit |

⛔ **When you replace a visual, grep the cue table for its sounds.**

---

## 3 · Detectors worth keeping

- **Speech-level energy inside a labelled silence = un-cut take.** The word list
  had nothing between "GitHub." (14.90) and "So" (15.68); the waveform measured
  **-31 dB**. Cheaper and more reliable than transcription.
- **A single-frame landmark discontinuity = a seam.** Use it before blaming the
  performance.
- **Transcribe the RENDER, not the source, in ISOLATED short windows.** Whisper
  reconstructs across gaps and will hide a retake in a whole-file pass.
- **After any retime, assert frame contiguity:**
  ```
  for each shot: assert S(at) == previous S(at+len)
  assert last == S(duration)
  ```
  A regex retime silently missed one shot because `len={2.0}` did not match a
  pattern built from `str(2.0)` -> `"2"`. That left a **14-frame gap** nothing
  else would have caught.
- **Compare like with like.** "The fix did nothing" was a 14.7s segment measured
  against a whole-reel statistic. The same window before/after showed it plainly.

---

## 4 · The ceiling gate

**The z-timing trap — got this wrong three times in one reel.** `PUSH(1.03, 0.97)`
reaches 0.97 by frame 8 and holds. Ink that only exists late in the shot is
governed by **z=0.97 (ceiling 554)**, not the shot's peak zoom (585).
**Read z AT THE FRAME THE INK EXISTS.**

**Everything is ink.** A glow's radius. A wedge's direction. **And an arc's
apex** — which belongs to neither endpoint: entry and landing both cleared, and
the gate caught 12 frames at the top of the flight.

⛔ **Arithmetic in a comment is not a measurement.** Twice a confident ceiling
calculation went into the source and the gate disagreed: a plaque by **119px**,
a halo on **all 75 frames of its shot**. Both comments claimed "measured".

⛔ **Range-gate to exact shot bounds.** `--frames=0-60` flagged two frames that
belonged to the neighbouring `full` shot. **Every `full` shot reports ink at
exactly screen y 250** — that is the facecam plate, by construction. Confirm the
reported y before treating it as a break.

⛔ **A gate that fails everything at once is usually broken, not prophetic.**
`verify_reel` returned `0/2 SHIP-BLOCKED`; direct measurement found sound at
-37 dB by 100ms. Two tooling causes, zero reel causes. Corrected: **7/7**.

---

## 5 · Reading feedback

- **"Why is there the orange circle" meant TOO SMALL, not REMOVE.** The companion
  was deleted on that note. Four rounds later: *"where is the 3d claude character
  that bounces around my body?"* Deleting answered the symptom and lost the
  thing. **When a note reads as "remove X", ask whether it means "X is
  illegible".**
- **Headers, three passes, each fixing the previous fix's failure:**
  restating the VO -> asserting nothing (`REAL USERS`, `ALREADY WIRED` — *"that's
  bullshit"*) -> precise jargon (`TDD BUILT IN`, `2% LEFT` — *"what does that even
  mean?"*) -> plain language carrying a fact (`TESTS ITSELF`, `NEVER BROKE`).
  **Not restating is necessary, not sufficient.** A header must be independently
  informative, in words everyone parses.
- **Show 2-3 options in WORDS before building.** The CTA was settled in one round
  this way: both layouts built behind an input prop, rendered at the same frame,
  picked from evidence.

---

## 6 · Audio, and a metric that stopped meaning what it meant

An ML-restored VO (Adobe Podcast) came back **+6.23 dB speech, -5.5 dB noise
floor**, sample-aligned, same length.

⛔ **Scale by SPEECH level (P90), not RMS.** RMS moved +5.63 but peak only +3.07
— it had been compressed, so RMS overstates what happened to the speech the cues
compete with.

⛔⛔ **A de-noised VO breaks any gap-to-speech ratio.** The rendered mix read
-23.00 dB against a -19.90 target, so bed and SFX went up 3.10 dB. Then the
direct measurement:

```
MUSIC_BED 0.0450, OLD voice   -27.09 dB
MUSIC_BED 0.0922, NEW voice   -27.09 dB   <- IDENTICAL
reel 83 approved              -14.46 dB
```

This reel had always run its bed ~13 dB under the reference. **-19.90 was never
a balance — it was a byproduct of the old VO's room tone sitting in the gaps.**
Chasing it would have set `SFX_TRIM` to **1.07**, amplifying cues past their own
sample level, to fix nothing. **The constant did not drift; its MEANING did.**
When restoration enters the chain, re-derive from a floor-independent measure.

**Before trusting any returned audio file:** duration, cross-correlation lag at
several probes, and a transcript diff for dropped words. If the length changed,
four things desync — word timestamps, the per-frame duck envelope, shot
boundaries and cue times.

---

## 7 · Machine gotchas (this Mac)

- The bundled Remotion ffmpeg has **no `select`, no `trim`, no `s16le` muxer**.
  `verify_reel` pipes `-f s16le -` and gets **0 samples**, so every audio check
  reads as silence. Decode to a temp `.wav` instead.
- `verify_reel` has its **own ffmpeg discovery that ignores PATH**.
- `words_final.json` uses `{w, s, e}`; `verify_reel` expects `{word, start, end}`.
- **Any new `staticFile` must be `ln -f`'d into the slim `--public-dir`** or the
  render dies with an unreadable-file trace naming nothing useful.
- `nohup ... &` inside the agent's bash tool is **not** a background render — it
  reported exit 0 after 35 of 1424 frames. Use the tool's own background flag.
- **Never sweep `T/remotion-*` without `pgrep -f "node .*\.bin/remotion render"`**
  — a parallel session mid-render is streaming from those bundles. Guard on the
  node process, not on a grep that matches itself.
- `--frames=0-1424` is **out of range** for a 1424-frame composition.

---

## 8 · Delivery

⛔ **FACE vs FACELESS is decided by whether the subject is on screen**, and the
two trees **number separately** — Face was at `08` while Faceless was at `92`.
The in-repo reel number belongs to one series and means nothing in the other.
Filenames differ too. **List the destination folder, take the next number there,
and copy the filename pattern from the newest sibling.**

⛔ Verify uploads with `rclone ls` and check sizes are **non-zero** — the Drive
desktop mount creates entries with `fileSize: 0` and no visible error.

⛔ Source every number in a lead magnet on the day, and **declare drift rather
than picking a side**: ARMY's VO said 278 skills / 14 MCP servers; the repo said
281 / 6. The doc states both and tells the reader to trust the README on install
day.

---

## The five rules, short

1. Run the audits in §1 **before** the first review.
2. When one instance is reported, **fix the class**.
3. Never write a computed constraint into a comment **without rendering the check**.
4. When a note reads as "remove X", ask whether it means **"X is illegible"**.
5. **Grep the cue table whenever a visual is replaced.**
