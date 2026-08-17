# HANDOFF — REEL 106 "SKILL"

Paste this into a new chat. Everything below is measured, not remembered.

## What it is
Reel 106, keyword **SKILL**. Four pasted prompts turn an ordinary Claude Project
into a tutor that drills you, dates you and grades you.
Board: `storyboards/106-skill.md` · Memory: `memory/skill-reel.md` (user memory dir)

**Files** (all in `video/`):
| | |
|---|---|
| assembly | `src/ClaudeSkillReel.tsx` (comp id `SkillReel`, 1172f) |
| scenes | `src/SklScenes.tsx` (S1..S10Cta) |
| hook | `src/SklHooks.tsx` (HookA approved; B and C kept, unused) |
| sets | `src/SklSets.tsx` (10 locations, built on `WorldKit`) |
| props | `src/SklWorld.tsx` (BookTower, PromptCard, Pinboard, Chair, Clamp, Ring…) |
| root | `src/skill106-index.tsx` |
| VO | `public/vo_106skill.wav` (39.07s) · canon `public/106skill_script.txt` |
| captions | `src/words_106skill.json` (191 words, 61 lines) |
| bed | `public/106skill_bed.wav` + `src/bed_duck_106.json` |
| latest render | `out/106/106_SKILL_v6.mp4` |

## ✅ DONE — do not redo
- **VO prep.** Raw 106.65s → 39.07s. Sliding isolated-window scan found **21 flub
  windows in the raw, 0 in the cut**. Two buried retakes a whole-file transcript
  smoothed away: the hook restarts at **2.844s**, and a false start on "Most
  people spend". Every splice edge measured in true silence (all under −52 dB).
- **Captions.** 191 words, 61 lines, all anchored to measured onsets, 0 lines
  under 5 frames.
- **Storyboard**, fact-checked (see constraints below).
- **Hook.** Variants round run; **A (collapsing stack) approved by Alex.**
- **10 locations, 10 distinct** — `library door bench rehearsal hall yard
  platform roof exam board`, four exterior, each its own WorldKit palette.
- **Audio.** Bed (new source: `route_music.mp3` @178.50s — both house tracks are
  exhausted) with a real sidechain from this VO's own envelope, + **49 SFX cues**
  with durations measured per file, a transient on all 11 cuts.
- **The look.** `tools/look_audit.py` → **✅ the look holds** (see numbers below).

## ⛔ THE OPEN TASK — MOTION. This is Alex's live complaint.
> *"a lot of the animations are still way too boring… it doesn't actually make
> the animations interesting, which is the primary issue"*

```bash
python3 tools/scene_motion_audit.py video/out/106/106_SKILL_v6.mp4 \
  --scenes "0,5.40,9.70,12.80,17.40,19.40,22.43,25.87,27.63,31.57,36.13" \
  --names "HOOK,LIBRARY,DOOR,BENCH,REHEARSAL,HALL,YARD,PLATFORM,ROOF,EXAM,CTA"
```
⛔ `--scenes` is **SECONDS**, not frames. Passing frames silently reports one row.

**median 6.14 · bar 9.00 · 5 of 11 STATIC**

| scene | motion | | scene | motion |
|---|---|---|---|---|
| ROOF | **2.69** STATIC | | PLATFORM | **13.89** |
| HOOK | **2.82** STATIC | | LIBRARY | 8.43 |
| BENCH | **3.74** STATIC | | DOOR | 7.84 |
| CTA | **4.12** STATIC | | HALL | 7.45 |
| YARD | **4.96** STATIC | | EXAM / REHEARSAL | 6.2 / 6.1 |

### The diagnosis, and it is one cause
**PLATFORM 13.89 vs ROOF 2.69.** The only structural difference: PLATFORM has a
departure board whose cells flicker **every frame** — a background process that
never stops. ROOF lands seven blocks in frames 29–53 of 118 and then **nothing
moves for 65 frames**. All five failures share it: arrivals bunch in the first
third, then the scene holds. The hook is the worst case — a settled poster for
4.3s with a single collapse at the end.

That is `docs/ANIMATION-QUALITY.md` §5 verbatim: *"a rebuild put all three objects
inside the first 34 of 70 frames and then held: 5.94… fixed by staggering the
arrivals across the full duration and giving each landed object a ceiling'd idle:
5.94 → 7.28"* and *"one hero doing one gesture is a dead shot; something else must
be running."*

### The fix, ranked by §1's measured table — apply to ROOF, HOOK, BENCH, CTA, YARD
1. **A background process in every scene.** Worth ~11 motion points (PLATFORM vs
   ROOF). A belt, cards tumbling, a beam sweeping, spools, a gantry. It costs the
   hierarchy nothing because it is furniture.
2. **Spread arrivals across the FULL scene duration**, not the first third, and
   give every landed object a ceiling'd idle — **≥2.6° / 4.6px**, because 1.15°/
   1.7px registers on a metric and reads as static to a human.
3. **Raise the per-scene push** 1.08–1.12 → **1.13–1.20** (measured median
   4.98 → 5.87 on its own). ⛔ The `push` range is SCENE-LOCAL: `Scene` reads
   `useCurrentFrame()`, which restarts per Sequence, so every range must end at
   or past its own scene's last local frame.
4. **A full-width high-contrast travelling band** where the set allows — measured
   10.44 vs 2.83 on neighbouring scenes at identical push.

⛔ **Re-run BOTH audits after every change.** The look currently passes at
AGENCY's numbers and must not regress while chasing motion — that trade is
exactly what produced the ten-reel drift (`ANIMATION-QUALITY` §8).

## The look gate — currently passing, DO NOT REGRESS
```bash
python3 tools/look_audit.py video/out/106/106_SKILL_v6.mp4
```
| gate | v6 | bar | AGENCY 94 |
|---|---|---|---|
| HOOK_LUMA | 177.1 ✓ | ≥140 **frame 0 ONLY** | 154 |
| BODY_SAT | **57.6% ✓** | ≥34% | 57.9 |
| BODY_BLACK p10 | **29.0 ✓** | ≤35 | 25.0 |
| BODY_LUMA | 94.3 | 70–105 (reported) | 64–103 |

⛔⛔ **THE MISTAKE THAT COST THIS BUILD THREE ROUNDS:** I applied THE-OPEN's
≥140 luma law to *every* scene. It is a **frame-0** law. Doing that makes every
frame mid-bright and mid-saturated, which IS "not hierarchical" — and the
sanctioned fix for each failure (lifting the shadows) is what destroys the black
point. **Never fix BODY_SAT/BODY_BLACK by lifting shading.** Repaint with
saturated stock; add a `Cone`/`StreetLamp` practical or brighten the SUBJECT.

## Standing constraints — non-negotiable
- ⛔ **There is NO Claude feature called "Personal Tutor."** The name is from a
  viral X/Medium post. The tutor is a CHARACTER WHO SITS DOWN — never a UI
  toggle, badge, menu row or status label. `TUTOR_LABEL_BANNED` in `SklWorld.tsx`
  makes the intent greppable.
- ⛔ Anthropic **does** ship a real **"Learning" style** (Socratic, style
  dropdown, all users 2025-08-14). It is a **different mechanism** from what this
  VO describes. Do not draw the style dropdown.
- ✅ Claude **Projects** + the **project instructions** field are REAL. The one
  place literal product language belongs — one chip, `PROJECT INSTRUCTIONS` (S3).
- ⚠️ **"4 hours vs 6 months" is UNSOURCED.** Fine on the claim plate; **no
  evidence furniture** — no tick, badge, testimonial or counter that "proves" it.
  S9 grades with a **SEAL**, never a score or percentage.
- ⛔ **"7 day" roadmap, not "70 day."** `small.en` mis-heard it; medium.en and
  large-v3 agree across two independent windows. It is on screen at S8.
- ⚠️ **39.07s vs the 22–29s house range. Alex chose to build at full length** —
  the VO counts "Second… Third… Fourth" so no beat can go. Do not silently trim.
- Header: **`LEARN ANY SKILL` / `WITH CLAUDE IN 4 HOURS`** (Alex's wording).

## Also still open (lower priority than motion)
- S7's date clamp reads as a dark blob, not a clamp that bites.
- S3's card arc leaves frame on the right before it slots.
- The pinboard accumulator is undersized for the job it does.
- Not yet run: `tools/verify_reel.py` ship gate. No lead-magnet .docx, no
  caption file, no Drive delivery. Deliverables go to
  `Faceless/106 - SKILL/` — its own numbered folder, never `Trial Reels/`.

## Scene spine (measured onsets — never retype these)
`0 HOOK · 162 LIBRARY · 291 DOOR · 384 BENCH · 522 REHEARSAL · 582 HALL ·
673 YARD · 776 PLATFORM · 829 ROOF · 947 EXAM · 1084 CTA` — TOTAL **1172**.
Pinboard fills at `FILL_AT = [497, 590, 786, 1023]` (derived, never typed).
⛔ The picture LEADS the audio by 4 frames. ⛔ After ANY retime, re-derive
`root = (scene.at + localFrame)/30` for every SFX cue in that scene.

## Build commands
```bash
cd ~/Downloads/claude-reels-workflow/video
npx --yes -p typescript@5 tsc --noEmit --jsx react-jsx --esModuleInterop \
  --skipLibCheck --moduleResolution bundler --module esnext --target es2020 \
  --resolveJsonModule src/skill106-index.tsx      # npx tsc here is a DECOY
npx remotion render src/skill106-index.tsx SkillReel out/106/106_SKILL_v7.mp4 --codec h264
```
⛔ `SoundKit.Sfx` already prefixes `sfx/` — a cue `src` of `"sfx/thock.wav"`
resolves to `sfx/sfx/thock.wav` and kills the whole render. Cost one render here.
