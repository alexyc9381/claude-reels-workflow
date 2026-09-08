# COURSE — factory log (**FACE reel 11**)
> ⛔⛔ THIS IS A **FACE** REEL — Alex's facecam is in it. Face and Faceless
> number SEPARATELY ([[video-assets-to-personal-gdrive]]). Delivery goes to
> `gdst:"Claude Reels/Face/*Videos/11 - COURSE/"` — files `11 - COURSE.mp4`,
> `caption.txt`, `COURSE - <Title>.docx`. ⛔ NOT Faceless: 90 is already a
> different, live faceless reel there.
>
> ⛔ Opened STAGE 0 per [[factory-log-first]], before any build.
> Source: `IMG_3527.MOV` (188.0s raw, Aug 07 06:40). Keyword **COURSE**.
> Arrived PRE-LOCKED as an Alex VO recording. Stages 0-4 did NOT run as a gated process.

## STAGE 0 — SOURCE
| field | value |
|---|---|
| door | Alex-authored script, batch of 5 (Aug 07) |
| comp | ⛔ **NONE ON FILE** — same gap as REPO-85 / SMART-89 |

## STAGE 0.5 — FACT-CHECK  ⚠️ NOT YET VERIFIABLE
Three third-party YouTube courses. Unlike a GitHub repo there is no API to check
these against, so every one needs a real URL confirmed before the reel is built.

| VO claim | status |
|---|---|
| Nick Saraev, 4 hour Claude Code full course | ⛔ UNVERIFIED — need the URL + real runtime |
| AI Master, free 2 hour Claude course | ⛔ UNVERIFIED — **and the recording says THREE hours, the script says two** |
| Nate Herk, free 10 hour build and sell course | ⛔ UNVERIFIED — need the URL + real runtime |
| "ahead of 97% of Claude users" | unfalsifiable framing, fine in speech, ⛔ never render as a stat on a card |
| runtime + percentage | ⭐ **TAKE THE RECORDING, ALWAYS** — see below |
| "use Claude to make $20k a month" | ⛔ earnings claim. Keep it as the COURSE's promise, never as ours |

## ⭐⭐ WHEN THE RECORDING AND THE SCRIPT DISAGREE, THE RECORDING WINS
> Alex, 2026-08-07: *"IF THE RECORDING AND SCRIPT ARE DIFFERENT GO WITH THE
> RECORDING TRANSCRIPTION"*

Obvious in hindsight: the script is a plan, the recording is the thing that
plays. I raised two of these as blockers when neither is one.

**Resolved from the recording, which is now the source of truth:**
- **AI Master is a THREE hour course** (script said two)
- **97%**, not 99% — the 99% is an early take, superseded by a `cut cut`

⛔ So the ONLY thing on screen must match the RECORDING, never the script doc.
The script is not a second source to reconcile against; it is a draft that the
recording superseded the moment he pressed record.

## STATUS: media prep can proceed.
⚠️ Still needed for the CTA deliverable (not for the edit): real URLs for the
three courses, so the DM links go somewhere and the runtimes on any card match
the actual videos.

## STAGE 1 — VO CUT ✅ (2026-08-07)

| | |
|---|---|
| voiceover | `brand-system/out/vo6/video1-COURSE-VO.wav` — **28.6s** |
| EDL (source time) | `brand-system/out/vo6/video1-COURSE.edl.json` — 12 spans |
| conformed facecam | `brand-system/out/vo6/deliver/VIDEO-1-COURSE.mp4` |
| ⭐ **VO to mount** | `brand-system/out/vo6/deliver/VIDEO-1-COURSE.wav` — **frame-aligned to the picture** |
| raw | `~/Downloads/IMG_3527.MOV` · 48k audio `brand-system/out/vo6/src/hi_3527.wav` |
| transcript | `brand-system/out/vo6/src/tx/IMG_3527.json` — energy-gated, do NOT regenerate casually |
| batch | **6** — every tool takes `--batch=6` or `VO_BATCH=6` |

⛔ **USE THE `deliver/` WAV, NOT `FINAL/`.** They are the same edit, but the
`FINAL/` one is cut on EDL times while the picture is quantised to whole source
frames — measured up to 2.5 frames of accumulating offset. `deliver/` is cut on
the frames themselves and matches the mp4 exactly.

Marker gate: **0 "cut cut" survive**. Every script sentence is covered by a take
except where noted below.

⚠️ a faint filler ("okay") is audible right after "...4-hour full Claude code course".
Pinned twice by source time already (46.55-52.40, 168.20-168.60); tighten the first
pin a few frames earlier if it still reads on headphones.

## ⛔⛔ STAGE 1 WAS WRONG — TWO SPOKEN EDIT MARKERS SHIPPED IN THE LOCKED VO (build chat, 2026-08-07)

The marker gate above reports **"0 'cut cut' survive"**, and that is literally true
and completely misleading. Two markers survived that do not contain the phrase:

| EDL span | source | reel | what it actually is |
|---|---|---|---|
| 3 | 46.32–46.55 | **7.68–7.91** | "Okay, cut." |
| 8 | 170.73–171.31 | **20.44–21.02** | "Okay" (head of a `cut, cut`) |

⛔ **The pin missed span 3 by 0.23s.** The note above pins `46.55–52.40` — which
starts exactly where span 3 *ends*. The filler is 46.32–46.55, immediately before
the pin. That is why it still read.

⛔ **A WHOLE-FILE TRANSCRIPTION CANNOT SEE EITHER OF THEM.** Both render as a
single token `"Kaka."` on `base.en`, as `"cook-up"` / `"code code"` / `"clock"` on
`small.en` and `medium.en`. Only ISOLATED WINDOWS spell them out — 46.20–46.90 →
`"Okay, cut."`, 170.40–171.90 → `"I'll cook. Cut, cut."` Exactly
[[bed-wav-has-a-voice-in-it]] and [[transcript-is-not-ground-truth]]. RMS confirms
both: real utterances peaking −42 dB inside gaps whose floor is −70 dB.

### ⭐ THE MARKER WAS ALSO CORRUPTING THE SCRIPT
Because whisper SMEARS a marker into the previous word's end, every pass read the
Saraev line as "...4-hour full Claude **cook-up / code code / clock**". With span 3
excised the line reads clean on four independent passes as:

> **"First is Nick Saraev's 4-hour full Claude Code."** — no "course" on the end.

Corroborated by measurement: 3 syllable nuclei over the region (full / Claude /
Code) against 4 for a known "Claude Code course" elsewhere in the same VO.
⛔ So the Stage-0.5 row "Nick Saraev, 4 hour Claude Code full course" is the SCRIPT,
not the recording. Same for **AI Master: the recording says "free 2-HOUR"**, not
three — the ⭐⭐ row above has it backwards.

### THE FIX — both assets re-cut from ONE corrected EDL
Spans 3 and 8 dropped → `out/vo6/video1-COURSE.fixed.edl.json` (10 spans, 27.750s),
then `tools/conform_edl.py` re-cut **picture and audio together** so they cannot
drift ([[edl-must-record-every-cut]] — a VO-only excision is what put reel 86 ten
frames out of lip sync).

```
833 frames COUNTED = 27.7667s  ✅ exact
```

Verified after the fact by transcribing the RESULT in isolated windows at both
joints: `"our full cloud. It makes you a cloud product."` and `"them to earn money.
And if you actually want to use cloud"` — no marker, no click, no repeated word.

## STAGE 2 — MEDIA PREP ✅ (2026-08-07, build chat)

⛔ **SUPERSEDED 2026-08-08 by the Saraev re-cut (Stage 1b below).** The 833-frame
column is the OLD cut and is kept only so a stale asset is recognisable on sight.

| asset | ~~833-frame cut~~ | **CURRENT — 856-frame cut** |
|---|---|---|
| `pub6/footage1/clean.mp4` | 833 fr / 27.7667s | **856 fr / 28.5333s**, COUNTED |
| `pub6/footage1/vo.wav` | 27.7667s | **28.5333s**, ⛔ **STEREO** — see the trap below |
| `pub6/footage1/landmarks.json` | 833 fr | **856 fr, 0% no-detection** |
| `pub6/footage1/matte.mov` | `yuva444p10le`, 358 MB | **856 fr, prores `yuva444p12le`, 368 MB** |
| `pub6/footage1/words_clean.json` | 108 words | regenerated from `out/vo6/scripts/COURSE.txt` |

⭐ `out/vo6/scripts/COURSE.txt` now exists — the TRUE script, checked in, so the next
agent reads the record instead of re-deriving it (the convention `vo6_words.py` asks for).
⭐ Old assets preserved in `out/vo6/backup_fix1_footage/`; the 833-frame conform is still
at `out/vo6/fix1/`, the new one at `out/vo6/fix2/`.
⭐ **The CROP/CARD constants did NOT need re-deriving.** Spans 1-2 are the same source
range in both cuts, so frame 12 is the same source frame and the crown solve still holds.
Only span 3 changed. ⛔ That is luck, not a rule — a cut that moves span 1 invalidates the
crop ([[cloned-crop-constants-per-shoot]]).
| derived | `CROP {width:1384,left:-174,top:-942}` · `FULL {width:2487,left:-605,top:-1048}` |

⛔ **The bootstrap command at the bottom of this log is WRONG — it says `matte.webm`.**
`tools/make_matte.py` writes **ProRes 4444**, which a WebM container cannot mux, so
ffmpeg dies instantly and the tool fails with `BrokenPipeError` on its first write.
Its docstring is stale; the code four lines below the docstring says "ProRes 4444,
NOT VP9". Every shipped reel uses `matte.mov`. Corrected in the command below.

⚠️ `tools/derive_crop.py` **fails its own `--check` against both shipped reels**
(84 and 83) and prints "do NOT use it". The numbers above are its calibrated output
and are a STARTING POINT ONLY — card coverage must be confirmed on a real still
before the render, the way `Key.tsx` did when it hand-widened 879 → 945.

## ⛔⛔ THIS IS A **chenbuildsai** REEL. THE PLAN LIVES IN `brand-system/plans/`.

> Alex, 2026-08-07: *"BRO THIS IS THE CHENBUILDSAI VIDEO EDITING WORKFLOW NOT HTE
> FACELESS ONE...."* → *"the one on github bro"*

`brand-system` **is** `github.com/alexyc9381/chenbuildsai-editing-system`. I was in
the right repo and still produced the wrong artifact: a markdown storyboard of five
cinematic worlds (a living room at 11pm, a 97% auditorium, a pegboard wall, a
shopfront), written into `claude-reels-workflow/storyboards/` — the FACELESS repo,
in the faceless repo's language.

⛔ **The chenbuildsai planning artifact is a typed, linted `plans/<reel>.ts`**, one
`PlannedShot` per beat, validated by `validatePlan` in `src/system/grammar.ts`
before a single frame is designed (RECIPE-NEW-REEL step 2). Not prose.

⛔ **And every one of those five worlds was the OBJECT register.** `plans/repo.ts`
names this exact failure in its own header — *"the commonest error is reaching for
OBJECT because an animation would look good, when the claim is proof and wants
SCREEN"* — and I made it again on the very next reel. This reel's claims are almost
entirely proof: three real courses, real channels, real runtimes, all showable.
`minScreenShots: 1` exists because a reel with none asserts but never proves.

## STAGE 6 — PLAN ✅ `brand-system/plans/course.ts` — **plan valid, 0 findings**

```
registers: FACEx3  SCREENx4  BOARDx2  OBJECTx2  TYPEx1
shots    : 12   runtime: 27.76s   cut rate: 1 per 2.31s
pinned join 7.6667s (frame 230): covered by a cut ✓
pinned join 20.2000s (frame 606): covered by a cut ✓
```

OBJECT survives on exactly two beats, both of which have no photographable form:
"combined makes it 10x" and "how to implement them to earn money". FACE takes the
Netflix line because it is a stake, not a claim.

## ⛔ BLOCKED ON CAPTURE — the three course URLs are now on the critical path
Stage 0.5 listed them as needed for the CTA `.docx` only. **They are now needed for
the reel itself**: 4 of 12 shots are SCREEN, and SCREEN means the real page on a
real screen. Playbook stage 4.5 — capture first, script second; never script a
claim you have not watched happen on a real screen. Needed:

| # | course | what the shot shows |
|---|---|---|
| S3 | Nick Saraev, 4-hour full Claude Code | the video page + its real runtime |
| S6 | AI Master, free 2-hour Claude Code course | the video page + its real runtime |
| S11 | Nate Herk, build and sell course | the video page |

⛔ On-screen runtimes come from the RECORDING (4-hour / 2-hour). If a real page
disagrees with the recording, that is a decision for Alex, not a silent fix.

## STAGE 6b — HOOK VARIANTS (Alex: *"proceed here with just the hooks and stuff variants"*)
`brand-system/src/scenes/hooks11course.tsx` — **ported from `hooksRepoFace.tsx`**,
which is the FACE hook format (dark studio ground #171A1F + radial warm glow,
header top 232, ONE object in the band on floor 1044, face card at y1140). Six
variants, six DIFFERENT paradigms (not one idea reskinned — [[reel-idea-generic-diagnosis]]):
rank · autoplay-timer · depletion · elevation · comparison · overtake.
Comps `C11Rank/C11Autoplay/C11Room/C11Stack/C11Hours/C11Queue` + `C11Hooks`.
Bundled ONCE to `out/hook11bundle` with `--public-dir=pubhook11` (21 MB of hard
links, vs `public/` at 8.4 GB copied per invocation — [[remotion-public-dir-render-cost]]).

### ⛔⛔ THE CROP TOOK THREE ATTEMPTS BECAUSE THE *MEASUREMENT* WAS BROKEN
| attempt | CROP | result |
|---|---|---|
| 1 | w1500 top −985 | read "crown 0px", judged too small |
| 2 | w1614 top −1044 | **card line straight through his forehead** |
| 3 | w1500 top −791 | solved from the source frame |

⛔ **The detector was finding the CARD'S ROUNDED CORNERS, not his head.** `r=40`
corners are transparent, so the dark Ground shows through and "first dark row
inside the card" returns row 0 every time, whatever the crop. I corrected twice
against that constant, and the second correction actively broke the framing.
- A crown check must **exclude the corner columns** AND confirm the dark profile
  **widens downward** — an apex starts narrow, a clipped skull starts wide. My
  clipped render read 332px at row 0 narrowing to 183px, which is the signature.
- ⛔ **The landmark crown rule is not the hair.** `eye − (nose − eye)` gives
  0.3752; the real hair apex measured off frame 12 of `clean.mp4` is **0.30260** —
  out by 0.067 normalised, **128px at source scale**. It estimates the skull and
  he has tall hair. Derive per-shoot crops from a scan of the actual frame; use
  landmarks only for the horizontal centre, which was correct throughout.

### ⛔⛔⭐ ALL SIX WERE REJECTED — AND THEY DESERVED TO BE
> Alex: *"the animations are genuinely horrible. Like, what? Did you even follow
> the chenbuildsai repo about animations? You didn't even follow the header."*

He was right on both counts. **I ported `hooksRepoFace.tsx` — a hook DRAFT helper —
and treated its local `Ground` and `Header` as if they were the chassis.** What a
real shipped body is, per `bodies83.tsx` / `Key.tsx`:

| the real body | what I shipped |
|---|---|
| `<World w={2400} h={1920} path={PUSH(..)}>` — camera MOVES | static, no world |
| `<Room deep />` — a space, with `Motes` drifting | a CSS gradient |
| `<Img staticFile('logos/*.png')>` — REAL marks (§56 / law 125) | bars, dots, rings |
| `<Paperize rough grain seed>` per shot | no grain at all |
| `<Headline lines={LineStyle[]}>` — type system, `snap` entry, per-line `shift` | a hand-rolled `<div>` |
| a declared `PARADIGM` map | none — so law 50 is SKIPPED but prints as passing |

⛔ Five of six missing pieces, and the result is exactly what `docs/ANIMATION-BAR.md`
documents as reel 82 **round one**: *"abstract rendering + obvious idea = shapes
moving. 'Just shapes, I don't know what's going on.'"* The doc that describes the
failure was in the repo the whole time; I read `WORKFLOW.md` and `RECIPE-NEW-REEL.md`
and never opened a single shipped **body**.

⭐ **THE GENERAL RULE: READ A SHIPPED ARTEFACT, NOT JUST THE DOCS.** A draft/helper
file in the same folder looks exactly like the chassis and is not it. The tell is
that it defines its own `Ground`/`Header` locally instead of importing from
`patterns/` — a real scene imports its chrome.

### REBUILD → `src/scenes/bodies11course.tsx` · `ShotAutoplay`
paradigm: **a SCREEN counts down and DEALS OUT what it was going to play.**
Real place (a screen in a dark room), a situation the viewer reads without
explanation, a loop that resolves in the last third, real Claude marks on the
dealt cards, two glyphs per card (law 135). Six flat variants **deleted, not kept**
— leaving them beside the rebuild only invites picking one.

⛔ First render of the rebuild still failed **law 103**: the set sat at world 820,
i.e. screen 350 — 210px above `HEAD_CLEAR` 560 — so the header printed across the
bezel and the dealt cards crossed it. Screen y = `(world − viewTop) × z` with
`viewTop = CAM_Y − (vh/z)/2 = 190`, so the set must live at world **800..1240**.
⭐ Render band guides into the contact sheet; a collision is invisible otherwise.

## STAGE 7 — BODIES BUILT (6 of 8 buildable) · `src/scenes/bodies11course.tsx`

| shot | body | paradigm |
|---|---|---|
| S1-2 | `ShotAutoplay` | a SCREEN counts down and DEALS OUT what it was going to play |
| S4 | `ShotBench` | empty SLOTS fill as a run completes |
| S5 | `ShotLadder` | two parts LOCK and the pair turns out to be the bottom of a ladder |
| S7 | `ShotTools` | a RACK of real marks LIGHTS one after another |
| S8 | `ShotTill` | a lit tool DROPS IN and the machine PAYS OUT |
| S10 | `ShotNumber` | a number COUNTS UP alone |

Six distinct paradigms, declared in `PARADIGM_ALL`. **S7 uses ten REAL logo files**
(`claude · openai · gemini · cursor · perplexityai · elevenlabs · huggingface ·
replicate · ollama · langchain-ai`) — "every AI tool you need to know" is the most
literal invitation in the reel to use actual marks, and drawing generic tool shapes
there would have been the pegboard mistake again.

⛔ **The plan changed: S1 was 2.4s of BARE FACE.** ANIMATION-BAR: *"No shot before
the first animated shot — if shot 0 has no object, shot 0 should not exist"* and
*"FRAME 0 IS ALREADY MOVING, OR THE REEL HAS NO HOOK."* Reel 82 opened on 2.7s of
talking head and that is the documented failure. Both hook beats now carry the
object on ONE camera path with `t0`, so the zoom is continuous through the cut.
Re-validated: **plan valid — 0 findings**, both pinned joins still covered.

### Three defects the draft sheet caught (none would have errored)
1. ⛔ **`onDeep` was hardcoded on every draft.** S4 and S7 are `ground: 'light'`
   in the plan, so they rendered WHITE type on cream. The plan already carries
   `ground` per shot — the chassis has to read it, and the `blend` follows it too
   (`multiply` on light, `screen` on deep).
2. ⛔ **Fixing only `onDeep` left the bug half-fixed.** The sub-line was still
   `N.silver` (L*72), which is a quiet grey on `N.char` and nearly nothing on
   `N.paper` — a legible headline over an illegible second line. On light it takes
   `N.steel`. ⭐ When a value is ground-dependent, **every** value in that block is.
3. ⛔ **S5 dragged a bar of raw world edge across the top** — law 102. At z 0.88
   the visible box is 2182 tall so the camera centre must stay ≥1091 from the
   world's top; I had pulled back to y=1000. *"Pulling back needs a MORE central
   camera, not a freer one."* Clamped to 1160; verified by measuring the top 40
   rows (41.5 mean vs ~200 for a raw edge).

## ⛔⛔⭐ "TOO BASIC" WAS NEVER AN ANIMATION PROBLEM — IT IS THE CUT RATE (2026-08-07)
> Alex, after six rounds: *"still way too basic... a lot of this just needs to be
> redesigned completely... follow the chenbuildsai GitHub repo."*

**Law 109 says measure before redesigning. I finally did, and the drawing PASSED:**

| shot | chroma% (budget 45) | value spread (pass ≥0.79) |
|---|---|---|
| S1-2 autoplay | 19.5% | 0.91 |
| S4 build | 35.3% | 0.83 |
| S7 tools | 5.8% | 0.83 |
| S11 herk | 31.1% | 0.83 |

Law 109's own failing reference was chroma **1.4%**, spread **0.45**. Nothing here
is dull by the measure. ⭐ So the concept/drawing layer was not the problem — and
every one of my six rounds was spent there.

**The real number, from `out/ref/*_shots.json`, which has been in the repo the whole time:**

| | shots | median | min | under 0.7s |
|---|---|---|---|---|
| ref A | 48 | 1.16s | 0.25s | **21%** |
| ref B | 41 | 1.37s | 0.07s | **20%** |
| ref C | 29 | 1.90s | 0.27s | 7% |
| reel 82 (the "too dull" one) | 16 | 2.30s | 0.83s | **0%** |
| **plans/course.ts** | **12** | **2.28s** | **1.42s** | **0%** |

⛔ **My plan is reel 82's failing profile almost exactly.** ANIMATION-BAR already
wrote the conclusion: *"a 2.3s shot has to hold attention for 69 frames on its own,
so every one gets loaded with idles and glows to survive — and it still feels slow,
because the thing that creates pace is the CUT, not the contents. I spent six rounds
making individual shots more elaborate. The elaboration was compensating for a
structural problem, and it could never fix it."* I then did the same six rounds.

### ⛔ AND `validatePlan` ENFORCES THE FAILING PACE
`REGISTER_RULES.shotRange = [1.2, 3.4]` makes a sub-0.7s shot a lint ERROR — but
the measured target is *"1.2-1.4s median, with 20% under 0.7s"*, and the references
run down to 0.07s. **The linter encodes the pace that got rejected**; ANIMATION-BAR
post-dates it and supersedes it. A plan that reads "0 findings" is therefore not
evidence of good pacing — it is evidence of conformity to a stale floor. Punctuation
shots (8-20 frames, one gesture, no idea of their own) have to be legal.

## ⛔ HANDOFF — `brand-system/HANDOFF-11-COURSE.md`
Written 2026-08-08. Carries: what is verified vs asserted · the 3 blockers on Alex · the
**11 animation rejections and the two-part diagnosis** (first-thought concepts + primitive
geometry instead of drawn SVG paths) · what was RULED OUT by measurement so it is not
re-litigated (colour/value per law 109, cut rate, the sprite, ARMY's data panels, reel 82) ·
the 4 known bugs still in the tree · the 5 mistakes that cost the most · the work order.

⭐ **The single most useful line in it:** everything built from a real artifact landed first
try (pace teardown, ARMY card geometry, sprite laws, thumbnails, plate); everything invented
from prose was rejected — **11 for 11**.

## ⛔⛔⭐ 2026-08-08 — TWO OF THE THREE BLOCKERS CLEARED, AND ONE SHIPPED ASSET WAS THE WRONG COURSE

### ⛔⛔ `public/course11/herk.jpg` WAS AN **n8n** COURSE, UNDER A **CLAUDE CODE** CLAIM
The build fetched `Ey18PDiaAYI` — *"Build & Sell **n8n AI Agents** (8+ Hour Course, No Code)"*,
8:26:38. I opened it: the thumbnail carries the **n8n mark**, an n8n canvas and **GPT 4.1**.
There is no Claude in it. The VO over that shot is *"if you actually want to use **Claude Code**
to earn over $20,000 a month, watch Nate Herk's Build and Sell course."*

The course the VO is describing is **`mpALXah_PBg` — "Build & Sell with Claude Code
(10+ Hour Course)" — 10:00:05**. Its thumbnail is a whiteboard with the Anthropic starburst
and eight items ending **"8. Make Money"** — the $20k line, drawn on the asset itself.

⛔ **And the HANDOFF "corrected the record" in the wrong direction.** It says *"Herk's course is
8+ hours, not 10. The log said 10."* The log's **10 was right**. The 8 came from measuring the
mis-fetched video, so a wrong asset laundered itself into a "verified" fact and then edited the
log that disagreed with it. Exactly [[reference-assets-verify-subject]].

⭐ **THE RULE THIS ADDS: a number derived from an asset cannot verify that asset.** The runtime
agreed with the file and the file was wrong; the only check that could catch it was reading what
the thumbnail DEPICTS. Two of the three assets had already been "verified by video id" — the id
was fetched correctly, it was just the wrong id.

| | id | real runtime | title | verdict |
|---|---|---|---|---|
| Saraev | `QoQBzR1NIqI` | **4:10:43** | CLAUDE CODE FULL COURSE 4 HOURS: Build & Sell (2026) | ✅ correct, VO's "4-hour" is true |
| AI Master | `Fys4oHlXQmQ` | **1:44:52** | FULL Claude Course for Beginners in 2026! | ⚠️ found — see below |
| Herk | ~~`Ey18PDiaAYI`~~ → **`mpALXah_PBg`** | **10:00:05** | Build & Sell with Claude Code (10+ Hour Course) | ⛔ was the wrong course |

**Fixed in-tree:** correct thumbnail downloaded and LOOKED AT; wrong one preserved as
`public/course11/herk_WRONG_n8n_Ey18PDiaAYI.jpg`; `pubhook11/course11/` re-linked (⛔ the
assets are HARD LINKS — replacing the file in `public/` leaves `pubhook11/` on the old inode,
which is [[reel-cloned-chassis-stale-assets]] waiting to happen; inodes verified equal after).
`plans/course.ts` "4H / 2H / **8H** landing" → **10H**; plan re-validated, 0 findings.

### ⭐ AI MASTER FOUND — and the VO oversells it
**`Fys4oHlXQmQ`**, channel **AI Master** (Artur Vishnevskii, aimaster.me), **1:44:52**, free.
Chapters: Claude Chat / Cowork / **Claude Code 36:24-52:27** / Design / Routines.
Web search could not find it across four queries; **`yt-dlp ytsearch` did, first try** — it
queries YouTube's own index instead of a web crawler. ⭐ Use it for any "find the video" blocker.

⚠️ Three gaps between the recording and the real video, all for Alex, none to be silently fixed:
| VO says | the video is |
|---|---|
| "free **2-hour**" | **1:44:52** — rounds to 1h45, not 2h |
| "**Claude Code** course" | a full **Claude** course; Claude Code is one 16-min chapter of six |
| "teaches you **every AI tool** you need to know" | every **Claude surface** — no third-party tools |

⛔ This lands on S7, whose body `ShotTools` renders **ten real third-party logos** (openai,
gemini, cursor, perplexity, elevenlabs, huggingface, replicate, ollama, langchain). That shot
currently illustrates tools this course does not teach.

### ⭐⭐ THE TAKE AUDIT — "you chose the bad takes" is TRUE ON EXACTLY ONE SENTENCE
Measured, not guessed. RMS envelope over `hi_3527.wav` (48k master, [[vo-take-cutting-pipeline]])
→ 20 speech runs; every run cross-checked against the word transcript; **every candidate then
transcribed in an ISOLATED window** ([[transcript-is-not-ground-truth]]).

⭐ **First result: the transcript is essentially complete.** The ~86s of "gaps" are real silence.
Only 11.8s is unaccounted, all of it sub-2.3s fragments, and only ONE is at speech level —
107.9-110.7, which is an aborted *"Second is AI Master's — cut cut."* **There is no hidden
reservoir of takes.** So the take picker is not what failed.

| sentence | takes that exist | chosen | verdict |
|---|---|---|---|
| 1 · hook | **2 complete** — 22.4-28.3 (**99%**) · 31.3-37.2 (**97%**) + an abort saying "YouTube" | 97% | a real either/or |
| 2 · Saraev | **2** — 43.3-46.4 · **51.9-55.2** | 43.3-46.4 | ⛔ **WRONG ONE, see below** |
| 3 · 10x | **1** | it | no choice existed |
| 4 · AI Master | **7 attempts, 2 complete** — 127.1-132.0 (short) · 147.7-155.3 (full) | full | correct |
| 5 · Herk | **1** | it | no choice existed |
| 6 · CTA | **1** | it | no choice existed |

⛔⛔ **THE SARAEV TAKE IS THE MISS, AND STAGE 1 REASONED ITSELF INTO IT.** The log above
concludes the line is *"First is Nick Saraev's 4-hour full Claude Code"* — **no "course" on the
end** — corroborated by a syllable count, and treats that as what he said. It is what he said
**in the take that was picked**. The take at **51.9-55.2**, never surfaced, reads clean on an
isolated pass as *"First is Nick Saraev's 4-hour full Claude Code **course**."*

⭐ **THE LESSON: a careful measurement of the chosen take cannot tell you the take was wrong.**
Two independent methods agreed the word was absent, and both were answering "what is in THIS
audio?" when the question was "is there better audio?" The syllable count made the wrong take
look *confirmed*. ⛔ Verify the SELECTION before verifying the selected thing.

**A/B audio cut for Alex:** `out/vo6/takecmp/` — three `A-then-B` files plus the six singles.

⛔ Swapping the Saraev take = a new EDL = re-conform picture+audio together
([[edl-must-record-every-cut]]) → new matte, landmarks and words. +~0.5s runtime. Do it BEFORE
any animation work, because the cut sets every shot timing.

### ⛔ CORRECTION: `COURSE11-v1..v6.mp4` DO NOT EXIST
The handoff's closing line says *"v6 is current"*. Nothing matching `COURSE11*` is on disk —
`out/`, Spotlight and `~/.Trash` are all empty of it. **There is no render to open**, so
[[open-a-shipped-render-first]] cannot be satisfied from this reel's own output.

### ✅ FIXED: the two-copies-of-the-chassis bug (handoff §4.1)
`opts11course.tsx` drew its clipped layer from `clean.mp4` (no alpha → `transparent` is a no-op →
opaque over the `Plate`), while its own comment claimed it was "identical to Course11.tsx".
⛔ Not patched — **deleted**. `Face` is now `export`ed from `Course11.tsx` and imported. One copy
exists, so it cannot drift again. `tsc` clean on both files (the 2 remaining repo errors are
pre-existing, in `Pilot.tsx` and `system/pack.ts`).

## ✅ STAGE 1b — THE VO WAS RE-CUT ON ALEX'S DECISIONS (2026-08-08)

Alex, after hearing the A/B files: **swap Saraev · keep 97% · ship the AI Master VO as recorded.**

**New EDL `out/vo6/video1-COURSE.saraev2.edl.json`** — span 3 `[43.82,46.28]` → **`[52.00,55.22]`**.
Boundaries came from the ENERGY envelope, not whisper: the /f/ of "First" starts at **52.05**
(medium.en claimed 51.740 — 0.31s early, and cutting there would have taken 0.3s of room tone
into the reel), and the tail of "course" reaches the noise floor by **55.16**. Both cuts sit in
silence with >3s of headroom either side. ⭐ [[vo-splice-gap-not-loudness]] again: the decoder's
word boundary is not the edit point; the envelope is.

```
856 frames COUNTED = 28.5333s   picture and audio, one EDL, conform_edl.py   ✅ exact
landmarks 856 frames, 0% no-detection                                        ✅
```

⛔ **THE CUT MOVED EVERY SHOT AFTER 5.2s.** +0.76s. Both structural pins moved with it —
**7.6667 → 8.4667 (frame 254)** and **20.2000 → 21.0000 (frame 630)** — recomputed from the
conform's own per-span frame counts, not from the EDL seconds. `plans/course.ts` and
`Course11.tsx` re-timed together; `COURSE11_FRAMES` → `S(28.5333)`. Plan re-validates:
**0 findings, 26 shots, median 1.13s, 27% under 0.7s, PACE matches the reference ✓, both pins
covered ✓**.

⭐ **The extra 0.76s became a THIRD Saraev beat, not a longer shot.** 1.79 + 0.76 = 2.55s would
have been the longest shot in the reel and would have dragged the median back toward reel 82's
rejected profile. Push-then-hold on a thumbnail is what scenes 5 and 10 already do, so this is
the existing pattern applied, not a new design decision.

### ✅ VERIFIED BY TRANSCRIBING THE RESULT, IN ISOLATED WINDOWS
| window | reads |
|---|---|
| joint A · 5.233 | *"...97% of Claude users. First is Nick Saraev's four-hour full Claude Code."* |
| joint B · 8.467 | *"...full Claude Code **course**. It makes you a Claude Code expert in just a few hours."* |
| joint C · 21.000 | *"...how to implement them to earn money. And if you actually want to use Claude Code to earn over."* |
| the Saraev beat | *"First is Nick Saraev's 4-hour full Claude Code course."* ⭐ the whole point |

No marker, no click, no repeated word at any joint. `words_clean.json` regenerated from the
new WAV against `out/vo6/scripts/COURSE.txt`: **109 true words** (was 108 — the added "course"),
13 repaired, last word ends 28.16s, CTA still reads "Comment COURSE".

### ⛔⛔ AND A SECOND STALE COPY WAS ABOUT TO SHIP — `src/data_course11_words.json`
Every other reel imports `words_clean.json` **from its footage dir** (`Key`, `Code`, `Army`,
`Agency`, `Plugins`…). Course11 alone imported a COPY at `src/data_course11_words.json`.
Regenerating the real file would have left that copy on the old 108-word cut, and **nothing
errors** — the captions would simply have been the old script, drifting 0.76s from ~5s onward.
Fixed the same way as `Face`: the import now points at `pub6/footage1/words_clean.json` and the
copy is gone (kept as `backup_fix1_footage/data_course11_words_STALE.json`).

⭐ **THAT IS THREE TIMES ON ONE REEL** — `Face`, `herk.jpg`/`pubhook11`, and now the words.
The shape is always identical: a second copy of something derived, updated in one place. The fix
is never "remember the other one"; it is to delete the second copy so there is nothing to forget.

### ⛔ A STEREO FILE READ AS DOUBLE-LENGTH AND SILENTLY MOVED EVERY VERIFICATION WINDOW
My joint-verification script did `np.frombuffer(w.readframes(...))` and divided by the sample
rate. `vo.wav` is **stereo**, so that counts SAMPLES, not frames: it reported **57.07s for a
28.53s cut** and every window landed at half its intended timestamp. It did not error — it would
have "verified" the wrong parts of the reel and passed.
⭐ `wave.getnframes()` is per-channel and correct; a raw buffer length is not. Any duration
derived from a buffer must divide by channels, and a duration check should be asserted against
the known frame count rather than printed.

## STAGE 7b — ANIMATION, RESTARTED PROPERLY (2026-08-08)

Ran `docs/ANIMATION-IDEA-PROCEDURE.md` in order for the first time on this reel.

**STEP 1 — the bar, written down from `out/CODE_v18.mp4` instead of remembered.** Seven
properties, and the rejected work had none of them: a real machine/place with believable
mechanical detail (flanges, switch tracks, a gauge needle, spokes) · the Mascot OPERATES it,
sometimes with a costume prop naming the genre · horizontal, filling the band · one mass ·
real marks INSIDE plates · two darks with orange spent on the ACTION · a drawn ground line.

### ⛔⛔⭐ THE VISIBLE BOX IS NARROWER THAN IT LOOKS, AND IT NARROWS AS YOU ZOOM **IN**
Six first-draft frames put the sprite **outside the frame on four of them**. I had estimated
the box. From `patterns/world.tsx` the camera is `screen_x = (world_x − cx)·z + vw/2`, so:

```
visible world-x = cx ± (vw/2)/z          cx=1200  vw=1080
  z=1.12  718..1682     z=1.00  660..1740
  z=1.05  686..1714     z=0.94  626..1775
```

⭐ **The binding keyframe is the most zoomed-IN one, which is the opposite of the intuition** —
same trap as law 102's "pulling back needs a MORE central camera". And the Mascot draws ~45px
of arm OUTSIDE its own `size` box, so with a 250px sprite:

```
⭐ SAFE ACTOR CENTRE    world x  856 .. 1544
⭐ SAFE OBJECT EXTENT   world x  686 .. 1714
⭐ USABLE HEIGHT        world y  760 (header clearance) .. 1130 (floor)  = 370px
```

⛔ **Calibrated before being trusted** ([[measure-against-the-right-reference]]): the model
predicts CLIPPED on exactly the four that clipped and INSIDE on the two that did not. A
geometry rule that has not been run against a known-bad frame is a guess with arithmetic on it.

### ⛔ AND THE SPRITE HAD ITS ARMS AT ITS SIDES IN ALL SIX
The Mascot has **no reach pose**. In `CODE_v18` the contact is DRAWN — an orange lever running
from the sprite into the switch — which is why that reads as operating. Added `<Reach>` to
`vars11course.tsx`: a curved orange limb plus a grip, from the sprite to the control it is on.
⛔ Standing beside the object reads worse than no sprite at all, and I shipped six of them.

### ⛔ AND THE OBJECTS HUGGED THE FLOOR
~230px tall in a 370px band, so the top half sat empty under the header while `CODE_v18`'s
machine fills from just under the type down to the ground.

### THE ROUND
`src/scenes/drafts11course.tsx` — 6 frames, one per beat, my pick from each axis. Alex: *"i
have to see here like what it looks like rather than just text"*, then *"i need like 5 variants
of each scene"*. ⛔ I had given four candidates per beat **in prose** and then rendered only
ONE — which is [[show-options-not-one-guess]] failed again, in the same session that named it.

`src/scenes/vars11course.tsx` — **30 frames, 6 beats x 5 axes**, geometry fixed, sprite
operating. Contact sheets per beat in `out/sheets11/`, cropped to the object band because the
face card is identical in all thirty and eats 40% of the height.

**First-round read** (kept because the rejects are the useful part): grid ⛔ field read as
bushes, gantry as a goalpost · forge ⭐ place reads, hammer floated disconnected · jump-start ⭐
clamp and flywheel read, sprite parked in front of the event · tool roll ⭐⭐ strongest, five
glyphs legible at a glance · coin press ⭐⭐ closest to the bar · pile ⛔ mound read as a beehive.

## STAGE 7c — ROUNDS 3-4, AND THE FIRST BEATS ALEX ACTUALLY PICKED (2026-08-08)

### ⛔⛔ THE DRAWN CONNECTOR IS BANNED
> Alex: *"i dont like how theres the line that extends out of the claude sprites to do
> stuff like i dont like that, needs to fix"*

Round 2 solved "the sprite must OPERATE" with `<Reach>` — an orange limb from sprite to
control, copied from what `CODE_v18` appears to do. It reads as a **tentacle**. Contact is now
only ever: **HOLDING** (drawn at the arm, overlapping) · **TOUCHING** (no gap) · **RECEIVING**
(things land on / transform it). ⛔ Never a drawn link, in any shot, on this reel.

### ⭐⭐ AND THE SPRITE IS THE SUBJECT, NOT THE OPERATOR
Alex's own note on beat 3 — *"10 claude things stacked together and fed to a claude guy and the
claude guy turns green and big like a green hulk claude sprite"* — is the whole correction.
Round 2 put the Mascot next to machinery in **all thirty** frames. What he picked in round 3
is, without exception, the character changing: lifted onto a podium, evolving, going green.

### THE PICKS
| beat | picked | note |
|---|---|---|
| 1 hook | **1c** the podium | clean pick |
| 2 bench | **2a** the row | *"as it evolves and gets bigger, it gains more clothes"* |
| 3 ladder | **3b** the ring | *"the first option"*, confirmed; wants SFX + a convergence effect |
| 4 tools | **4b** the fan | *"has to be lowered and not made so high touching the header"* |
| 5 till | **none — all suck** | rebuilt from scratch |
| 6 money | **6a** the column | coin colour bad · too high · wants smaller coins scattered around |

### ⭐ WHY ALL TEN BEAT-5 IDEAS FAILED, ACROSS TWO ROUNDS
Press · mangle · stall · slot · tap · giant coin · held note · small-in-big-out · sack · switch.
Ten ideas from six different axes, and **every one was the same thing underneath: a MECHANISM
THAT PRODUCES MONEY.** The line is *"how to implement them to EARN money"* — none of them showed
anyone earning anything, they showed apparatus. ⛔ Axis diversity is not idea diversity: six
axes all answered the same wrongly-framed question. The replacements show the EVENT — a sale, a
downpour, a tree that grew, a bank breaking open, a shadow made of coins.

### THE RING — effect + sound (`src/scenes/ring11.tsx`)
Resolution moved to **frame 58 of 90 (64%)**; the draft converged by f40 and left the back half
static. Five layers peak on the same frame: trails · charge core · white flash · shockwave ·
radial spokes, plus a 6-frame decaying camera shake.

⛔⛔ **A SHORT BEAT CANNOT USE A LONG-PRE-ROLL CUE.** Every cue's START is set so its measured
PEAK lands on f58 ([[sweep-lead-equals-peak-offset]]). Measured per file:
```
riser 53f pre-peak · whoosh_deep 16.5f · metalhit 12.6f · reveal 7.2f · zip 5f
⛔ impact.mp3 peaks 65f in and sub.mp3 70f in — LONGER THAN THE RUN-UP.
   The two most obviously-named files are the two that cannot be used here.
```
Verified on the render, not assumed: audio peak **−15.2 dB at 1.9s**, hit is at 1.933s ✓

### FOUR BUGS THIS ROUND, ALL FOUND BY LOOKING AT THE RENDER
1. ⛔⛔ **`hue-rotate` WALKS PEACH → GREEN THROUGH YELLOW.** Peach is ~20°, green ~110°, so a
   20-frame ramp parks the hulk at **gold** for ~7 frames mid-turn. Fix: the COLOUR snaps in 4
   frames while the SIZE still eases over 20. ⭐ Never ease a hue across a hue you don't want.
2. ⛔ **The charge core never died.** `close` stays pinned at 1 after the hit, so a peach disc
   hung above a green hulk's head for the rest of the shot. Gate it on `f < HIT`.
3. ⛔ **Ring + 12 spokes together read as a BICYCLE WHEEL.** Cut to 7 spokes, twice as fast, and
   the green wave now starts only after the orange one has gone.
4. ⛔ **`pubhook11/` had no `sfx/`**, so every cue 404'd and the video render died while the
   STILL rendered fine — audio is not fetched for a still. Hard-linked 43 files in (33 MB).
   ⭐ A still passing is not evidence the video will.

## STAGE 8 — THE PICKED SHOTS WIRED INTO THE REAL CUT (2026-08-08)

| scene | shot | source |
|---|---|---|
| 1 hook | the podium | `W1c` |
| 2 saraev | real thumbnail | `ShotSaraev` |
| 3 bench | the EVOLUTION, gear per stage | `W2a` |
| 4 ladder | **the ring → green hulk**, + cue stack | `Ring11` |
| 5 aimaster | real thumbnail, finally unblocked | `ShotAiMaster` ⭐ NEW |
| 6 tools | the fan of five, lowered | `W4b` |
| 7 till | **the Claude goose lays gold** | `W5d` |
| 9 money | the column + scattered coins | `W6a` |
| 10 herk | the CORRECT Claude Code thumbnail | `ShotHerk` |

⭐ **BEAT 5 TOOK 25 IDEAS ACROSS 5 ROUNDS.** What finally moved it was two constraints from
Alex, not more generation: *"more like an IDIOM of whats going on"* and *"when someone sees the
visual they can tell exactly how it ties back to what im speaking."*
⛔ Rounds 2-4 all failed for one upstream reason — **they competed with beat 6 for the money
job** — and six generative axes could not fix that, because the axis was never the problem.
⭐ The winner is an idiom carrying BOTH halves of the line: the asset wears the **Claude mark**
("implement THEM") and the output is **gold** ("to earn money"). Three eggs, not a hoard — beat
6 is the scale. And it PERFORMS: each egg has a wind-up (squash + held breath), a pop (stretch,
wings flare, dust, the badge pulses) and a settle (two bounces, rocking to rest).

### ⛔⛔ TWO WRONG-ASSET BUGS IN ONE WIRING PASS — SAME CLASS AS THE n8n THUMBNAIL
1. **Scene 5 nearly shipped Nate Herk under "2. AI MASTER".** `ShotHerk` is hardcoded to
   `herk.jpg` **and rank 3**, and it was the nearest existing thumbnail body when scene 5 had
   none. A stand-in that renders something plausible is worse than one that errors. Now
   `ShotAiMaster` — its own image, its own rank.
2. ⛔ **`Coin is not defined` at frame 693.** `GOLD`/`Coin` were declared inside the BEAT 5
   block; beat 5 was rewritten from scratch **three times**, and the third rewrite deleted them
   and took the MONEY beat down with it.
   ⭐ **Only the full-reel render caught this** — no still, no variant sheet and no typecheck
   renders frame 693. A shared helper must never live inside the section most likely to be
   replaced, and a green typecheck says nothing about a missing runtime binding in JSX.

## REMAINING
- **S12 CTA** — needs a `CourseReward` card. ⛔ NOT reel 83's `KeyReward`: that one
  advertises a repo, this sends three course links. Cloning it ships the wrong
  promise under the right keyword. The three links are now known:
  `youtu.be/QoQBzR1NIqI` · `youtu.be/Fys4oHlXQmQ` · `youtu.be/mpALXah_PBg`.
- ~~**S3 / S6 / S11 — blocked on the three course URLs.**~~ ✅ **CLEARED 2026-08-08** — all
  three verified by id, runtime and what the thumbnail DEPICTS. `aimaster.jpg` added.
- **AWAITING ALEX:** (a) the Saraev take swap, (b) hook 97% vs 99%, (c) whether the AI Master
  beat still says "2-hour Claude Code course" now that the video is a 1:44 full-Claude course.
- **Animations still the open problem** — handoff §3 stands, unchanged by any of the above.

### ⛔ HOW THIS BATCH DIFFERS FROM Aug-02, and why it matters here
The recordings restart **without** saying "cut cut" — often with no pause at all.
Marker-splitting therefore cannot find take boundaries, and `pick_takes.py` was
rewritten to pick takes by ALIGNMENT instead. Three things follow for the build:

1. ⛔ **Re-run nothing blindly.** `VO_BATCH=6` is mandatory; the named cuts in
   `build_vo5.py` are keyed by batch, and running without it applies Aug-02's
   cuts to this audio and still reports success.
2. ⛔ **The transcript is generated, not given.** `tools/transcribe_takes.py`
   re-reads any stretch of speech the transcript fails to account for. If you
   re-transcribe with a plain whisper call you WILL lose restarts and the cut
   will silently regress.
3. ⭐ **Verify by transcribing the finished WAV in short windows**, never the raw.
   Whisper smooths a restart away on a long file and spells it plainly on a
   5-second one.

### ⭐ FIRST THING TO RUN IN THE BUILD CHAT
The matte and landmarks are deliberately NOT pre-generated — they are per-reel and
take ~2 minutes, so they are made where they are used rather than staged.

```bash
cd ~/Downloads/brand-system && mkdir -p pub6/footage1 && \
  cp out/vo6/fix1/VIDEO-1-COURSE.mp4 pub6/footage1/clean.mp4 && \
  python3 tools/extract_landmarks.py pub6/footage1/clean.mp4 pub6/footage1/landmarks.json && \
  python3 tools/make_matte.py pub6/footage1/clean.mp4 pub6/footage1/matte.mov
```

⛔ `matte` IS the cutout, not a mask — never draw `clean.mp4` over it
([[matte-is-the-cutout-not-a-mask]]). ⛔ CROP/FULL constants are PER-SHOOT; do not
reuse reel 89's ([[cloned-crop-constants-per-shoot]]). ⛔ Prefix every asset with
the reel number ([[reel-asset-name-collisions]]).


---

## ⭐ SHIPPED — 2026-08-09

**Render:** `brand-system/out/COURSE11_v19_FULL.mp4` · 836 frames · 27.925s · **1080×1920**
· h264 **CRF 18.0** · yuvj420p · aac · 25.0 MB.

⛔ **The file size is not the quality signal.** This render is 6.9 Mbps against
`out/CODE_v18.mp4`'s 15.1 Mbps, which reads as "half quality" and is not: both files
carry `crf=18.0` in their x264 opts, the same encoder build (Lavc61.19.100), the same
profile/level (100/40) and the same pix_fmt. CRF is constant-QUALITY, so bitrate tracks
how much fine detail and motion the content has, not how good the encode is. CODE is a
denser reel. Check the embedded `crf=` before concluding a render is degraded:

```bash
strings out/<render>.mp4 | grep -o "crf=[0-9.]*" | head -1
```

**Audio:** Adobe-Podcast-enhanced VO (`COURSE11-VO-836f-27.8667s-enhanced-v2.wav`),
verified frame-identical to the source cut (1,337,600 samples, aligned to 2 samples,
+4.3 dB RMS). 9s and 13s SFX lowered per Alex's last note.

### Delivered to Drive
`gdst:"Claude Reels/Face/*Videos/11 - COURSE/"` (personal alexyc9381 Drive,
[[video-assets-to-personal-gdrive]]) — folder naming cloned from `10 - CODE`:

| file | bytes |
|---|---|
| `11 - COURSE.mp4` | 25,024,130 |
| `caption.txt` | 1,900 |
| `COURSE - The 3 Free Claude Courses.docx` | 3,232 |

**Lead-magnet spec:** [`lead-magnets/11-course.txt`](../../lead-magnets/11-course.txt),
built with `tools/make_lead_magnet.py`. Carries the three real links and the three real
runtimes: Saraev `youtu.be/QoQBzR1NIqI` 4:10:43 · AI Master `youtu.be/Fys4oHlXQmQ`
1:44:52 · Herk `youtu.be/mpALXah_PBg` 10:00:05.

⛔ **The doc corrects the VO on purpose.** The recorded line says "free 2-hour Claude
Code course" for AI Master, which is a 1:44 course covering the whole Claude surface,
not Claude Code alone. Alex chose to ship the VO as recorded, so the magnet is where the
accurate number lives, and it names the trap explicitly (Herk has an 8-hour n8n course
with a near-identical name — the reel's asset was originally mis-fetched as exactly that
video, see [[reference-assets-verify-subject]]).

**Caption** follows [[caption-structure]] and was gated mechanically before upload:
CTA on line 1, `👇 READ BELOW` on line 3, zero em/en dashes, no run of 3+ non-empty
lines below the opening block, closing CTA present.

---

## Round 14 — 2026-08-09 (post-ship revisions)

Alex, on the shipped v19: *"the hammer needs to have motion between 0-1 seconds
swinging and motion and stuff and sfx for motion there still even though it hasnt hit
the thing yet"* and *"for each 1,2,3 thumbnail image it needs to have a claude sprite
animated next to it off to the side"*.

### 1 · The hammer was mathematically frozen
`hammerAng = -20 - wind*62 + swing*118 - lower*84`, and `wind`/`swing`/`lower` are all
0 until f46. The expression reduces to the **constant -20 for the first 46 frames**, so
1.5s of hook had a static arm. Every earlier "more motion" pass had added life to the
TV and never touched the hammer, which is why the note kept coming back.

Now he HEFTS it: `heft = heftOut * (sin(f/3.6) - 1) * 0.5 * (14 + min(f,46)*0.55)`,
faded out from f38 so the wind-up reads as the third and biggest swing of one gesture.
Range 34.7deg, mean 2.5deg/frame. The body counter-rotates and sinks off the same
`heft` term, so arm and body cannot drift out of phase.

⛔ **A plain sine was wrong and the NUMBERS said it was fine.** Positive is DOWN, so
`sin` dipped the head to +2.7deg at f28 and swung it *through the TV it has not hit
yet*. The per-frame table looked perfect; only the rendered contact sheet showed the
head inside the screen ([[measure-pose-not-motion]]). `(sin - 1) * 0.5` maps the swing
to -amp..0 so the rest pose is the floor of the motion and he only ever raises.

**Cues** ride the swing's max-SPEED frames, not a beat grid — `sin(f/3.6)` peaks in
slope at f 11.3 / 22.6 / 33.9, each cue placed at that minus its own measured pre-peak:

| cue | at | peak lands | vol | rate |
|---|---|---|---|---|
| whip.mp3 | 9 | f10.8 | 0.10 | 1.10 |
| whip.mp3 | 21 | f22.8 | 0.13 | 0.95 |
| whoosh.mp3 | 13 | f34.0 | 0.13 | 1.00 |

Measured offsets: whip **1.8f**, whoosh **21.0f**, zip 4.8f, whoosh_deep 18.6f, hop 3.0f.
⛔ The old lone `whoosh at 5` peaked at f26 over a frozen hammer — air-sound with no
motion under it, which is part of why the open read dead.

⛔ `ffprobe`/`ffmpeg` need `DYLD_LIBRARY_PATH` set to the compositor dir, and Remotion's
build has **no `s16le` muxer and no `select` filter** — decode to `pcm_s16le` in a WAV
and tile frames with PIL instead.

### 2 · A sprite beside each thumbnail
There was no "side" to use: the card is 880 wide and the IG-safe world at this camera's
tightest zoom (z=1.03) is 792..1608, i.e. **816** — the card already fills it. So the
sprite goes IN FRONT OF the card's bottom corner, which is the better read anyway (a
screen in a room with someone standing at it). Card raised 960 -> 900 to open a floor
strip; drawn ground added, because a sprite may never stand on flat background.

Derived, not eyeballed (this reel has shipped a body into the right dead zone once):
sprite size 210, body ~0.66*size wide, centres **880** (left) and **1520** (right) span
811..949 and 1451..1589, both inside 792..1608. Floor world 1250 -> screen 1063, clear
of the facecam top (1180) by 117px. Crown reaches screen 919 against a card bottom of
957: a 39px overlap, which is the depth cue. Side alternates **1-left / 2-right /
3-left**, always the opposite corner from the rank chip.

### Two silent defects the checks caught
1. ⛔⛔ **`transform` appeared TWICE in the thumbnail's style object** — `scale(push)` on
   one line, `rotate(...)` six lines below. The second key silently wins, so the
   "continuous slow PUSH" written to fix the 8-9s pause **never ran**, across every
   round in which Alex reported that pause and I reported it fixed. Only `tsc` found it
   (TS1117). See [[duplicate-style-key-kills-animation]].
2. ⛔ **The progress ring never closed on Herk.** Fixed `/62` = 68 frames to travel the
   border, against scenes of 97 / 87 / **58** frames, so scene 10 stalled at ~84% of the
   way round. Now derived from the shot's real length (`frames` prop, lands at 0.92 of
   it) ([[draft-comp-length-truncates-shots]]).

**Preview:** `out/prev_Course11_half.mp4` (836f, 540x960, audio intact).
⛔ Drive still holds v19 — **re-upload after the patch render**, or the shipped file and
the repo disagree.

### Shipped v20 — 2026-08-09 14:00

`out/COURSE11_v20_FULL.mp4` · 836 frames · **1080x1920** · 30fps · h264 **crf=18.0** ·
yuvj420p · aac 48kHz stereo · 24.7 MB. Supersedes v19 in Drive (same three filenames).

⛔ **Rendered FULL, not patched, and the reason is the audio.** 380 of 836 frames changed
(45%) which alone argues for a patch — but `patch_render.py` splices PIXELS, and the hook
gained three SFX cues, so a patched file would have carried the OLD audio track under new
picture. Saving ~10 minutes was not worth shipping stale sound.

**Verified in the RENDER, not in the source** — a change that typechecks is not a change
that shipped:

| check | method | result |
|---|---|---|
| full res | ffprobe + embedded `crf=` | 1080x1920, crf 18.0 ✓ |
| hammer moves | pixel diff vs v19, f24, region (600,300)-(1080,900) | 6.8% changed ✓ |
| sprite, card 1 | pixel diff vs v19, f170 | 31.2% ✓ |
| sprite, card 2 | pixel diff vs v19, f440 | 35.6% ✓ |
| sprite, card 3 | pixel diff vs v19, f745 | 36.5% ✓ |
| the 3 new cues | v20-minus-v19 difference signal, per-frame RMS | attacks at f12 / f24 / f35 ✓ |

⭐ The **difference signal** is the check worth reusing for audio. Overall RMS moved only
0.1 dB between the two cuts (the VO dominates and is identical), so a level comparison
would have said nothing at all. Subtracting the two renders sample-wise leaves ONLY what
changed: a -180 dBFS floor where nothing was added, and the three cue attacks standing
clear at -33.8 / -31.6 / -27.4 dBFS. Rising levels confirm the growing swings landed in
the right order too.
⚠️ Each attack reads ONE frame after its predicted peak (11->12, 23->24, 34->35). That is
the per-frame RMS window smearing a transient into the frame that contains it, not a
placement error — it is the same +1 on all three, and a real misplacement would not be
uniform.
