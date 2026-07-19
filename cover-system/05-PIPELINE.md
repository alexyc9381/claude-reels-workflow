# 05 · End-to-end pipeline

**What this is:** the full production run for one Instagram reel grid cover, from "which surface
am I even building" through to the labeled index sheet the client actually receives. It also
documents the multi-agent workflow shape that produced the best result in this project (the
POWERS rebuild), plus the file-naming and concurrency rules that keep the shipped set from
drifting apart. **When to read it:** before you touch a keyboard on a new cover, and again before
you deliver. Copy rules live in `02`, scene authoring in `03`, verification in `04`; this doc is
the spine that calls them in order.

Reminder, because the client's own vocabulary is inconsistent: these are **reel grid covers**,
the still tile that represents a reel in the @nocodealex profile grid. Uploaded at 1080x1920,
composed for the 4:5 tile the grid shows (centre 1080x1350, y285..y1635). The client sometimes
says "carousel". It is not a carousel.

**Counts, stated once so nothing downstream contradicts itself.** 26 cover compositions are
built across four source files (4 + 2 + 7 + 13), the extra one being `Cover52B`, the rejected
dark-background direction kept in source as a documented alternative. The shipped `COVER_INDEX.png` carries **23**:
the set-2 `CoverOS` was superseded by set-3's `CoverOSv2` so OS appears once, and `CoverRamsay`
was built but never made it onto the sheet (see Stage 6, it is a real omission). When a doc says
"23 covers" it means the shipped set; "26" means comps that exist in source.

---

## Stage 0 · Establish the premise

### 0a. ⛔ ASK WHICH SURFACE FIRST

The very first question, before research, before copy, before any file is opened:

> **"Is this a carousel cover slide or a reel grid cover?"**

They are different jobs with different crop math, different readable-detail budgets and different
type systems, and this project began by nearly building the wrong one. The client's actual words
were "a cover image for my different posts", which is genuinely ambiguous, and the request was
resolved only by asking. A carousel cover is a 4:5 slide read at full width inside a post; a reel
grid cover is a 1080x1920 upload read at roughly 130px inside a 3-up profile grid. Nothing about
one transfers cleanly to the other.

Cost of asking: one sentence. Cost of not asking: the entire build.

### 0b. WATCH THE REEL

This is the stage that gets skipped and it is the stage that has cost the most rework.

**The failure story.** The POWERS cover was built twice from the wrong source. Pass 1 was built
from `carousel-format-concepts.md`, which describes *carousel POST 3* ("6 POWERS:
RUN/SWARM/FIX/CONNECT/SHIP/SKILL"). The actual reel is
`47_Claude-code-powers-hookA-meter.mp4` (52.54s), whose on-screen header is **"THE 5 CLAUDE CODE
SKILLS THAT MATTER"** and which names five real GitHub skills (superdesign, obra/superpowers,
trailofbits/claude-audit, karpathy/minimal-diff, claude-mem). The cover was confidently, fluently
about content the reel never contained. Worse: the research subagent had explicitly flagged it
("the visual record describes the carousel, not the reel; the reel has no factory log") and the
build went ahead anyway.

> ⛔ **RULE: a memory note is not the reel.** A factory log, a carousel spec, or a prior summary
> is secondary evidence. If a reel has no factory log, open the mp4.

**Where the secondary evidence lives, and why you may not have it.** The factory log for a reel
is `memory/reels/<keyword>-factory-log.md` inside the operator's Claude memory directory
(`~/.claude/projects/.../memory/` on the machine this system was built on), and the raw VO
catalogue is `~/Downloads/*.m4a`. **Neither is part of this repo.** If you are reading this cold
and have neither, skip straight to 0c and treat the mp4 as the only source of truth. That is the
stronger path anyway; the whole point of this stage is that the primary artifact wins.

### 0c. If there is no factory log, extract frames

Two commands. The first is an even spread across the whole video, the second is a dense pass over
the last 10 percent (see 0d for why that matters).

```bash
# ffmpeg on the build machine is the npm ffmpeg-static binary, not a system install:
FFMPEG=~/Downloads/matchtern-longform/tools/node_modules/ffmpeg-static/ffmpeg
V=~/Downloads/47_Claude-code-powers-hookA-meter.mp4

# duration WITHOUT ffprobe (the vendored ffprobe-static ships a linux-only binary
# on this machine; parsing ffmpeg's own banner is portable and has no extra dep)
DUR=$("$FFMPEG" -nostdin -i "$V" 2>&1 | awk -F'[:,]' '/Duration/{print $2*3600+$3*60+$4; exit}')

# 1) whole-video contact sheet, 12 tiles
FPS=$(awk -v d="$DUR" 'BEGIN{printf "%.6f", 12.5/d}')
"$FFMPEG" -y -nostdin -loglevel error -i "$V" \
  -vf "fps=$FPS,scale=360:-1,tile=4x3" -frames:v 1 /tmp/contact.png

# 2) the last 10 percent at 2fps, where the CTA payoff lives
S=$(awk -v d="$DUR" 'BEGIN{printf "%.2f", d*0.9}')
"$FFMPEG" -y -nostdin -loglevel error -ss "$S" -i "$V" \
  -vf "fps=2,scale=360:-1,tile=4x3" -frames:v 1 /tmp/contact_end.png
```

Both were re-run against reel 47 while writing this doc and both produce a 1440x1920 sheet.
Three details are load-bearing and the earlier version of this command got all three wrong:

- **`12.5/$DUR`, not `12/$DUR`.** `fps` filtering can land one frame short; asking for 12.5
  guarantees the `tile=4x3` mosaic fills instead of flushing a partial sheet at EOF.
- **Never truncate the duration with `cut -d. -f1`.** On a sub-1s clip that yields `0` and the
  shell divides by zero. `awk` float math handles any length.
- **Never glob the filename inside the duration subshell** while passing an explicit filename to
  `-i`. The old command probed `47_*.mp4` and measured a *different* video (there are two reel-47
  cuts on disk, hookA and hookB). One variable, used twice.
- `-nostdin` because ffmpeg eats stdin inside read-loops and silently corrupts the next iteration.

Everything the first two POWERS passes got wrong (the real header, the five repo names, the
signature beat) was visible in those sheets immediately. Cost: two commands.

### 0d. Scan to the END. Signature beats are CTA payoffs

⛔ **Sampling every 4 seconds missed the POWERS money shot**, because it lives in the last two
seconds: a glowing violet Claude raising a gold Infinity Gauntlet whose five gems are the five
skills, over confetti, under a POWERS banner. The `contact_end.png` command above puts that frame
on screen in one pass (verified: it is tiles 8 through 10 of that sheet, at roughly 51 to 52s).
CTA payoffs sit at the end of a reel and are usually the single most designed frame in the whole
video. Always sample the final 10 percent densely.

### 0e. Finding a specific element the client described

The client names beats by memory ("the GLOWING purple guy with thanos fist thing"). The reliable
way to locate one is a **rarest-colour scan** across extracted frames: pick the colour the
description implies, rank frames by that colour's pixel share, look at the top hit.

⭐ **Gate on BRIGHTNESS if the element is described as glowing.** The first, ungated violet scan
matched the wizard's *dark robe* from an earlier beat, which is how pass 2 shipped the wrong
purple. The detector that actually worked:

```python
violet = (R > G + 25) & (B > G + 35) & (R + G + B > 300)   # the last clause is the fix
score  = violet.sum() / violet.size
```

⭐ Rendering that hero afterwards: `PkMascot` computes `hue = (lf*15) % 360` under its `rainbow`
prop, so **`lf={18} rainbow={1}` yields 270deg = violet**. Add a `drop-shadow` filter pair for
the aura. No hue-rotate wrapper needed.

**The pass-2 beat, kept because it is the worked example of draw-dont-stack on a hostile shape.**
Before the gauntlet was found, the scan pointed at the reel's security beat: a wizard-costumed
Claude (purple hat and robe with gold stars, a staff with a blue crystal, which `wizard={1}`
renders exactly) squaring up to a red spiked threat monster with X eyes under the on-screen line
**"NONE SHIP PAST"**. That monster shipped as `ThreatMon`, a real inline `<svg>` with actual path
geometry, because a spiked organic silhouette assembled from rotated divs reads as scattered
shards. It is the same rule that killed the CSS sun in `SOL` (see `03`): **an organic or radial
hero object is ONE `<svg>`, never a stack of boxes.** The beat was ultimately superseded by the
gauntlet, but `ThreatMon` is the reference implementation for the rule.

### 0f. Some reels are not files at all

The client names videos by **subject**, and the catalogue of nameable videos is
`~/Downloads/*.m4a` (his raw VO recordings), not `video/out/`. HERMES, OS and RAMSAY had no
source file, no comp, no render and no factory log; only an m4a. Transcribing with
faster_whisper took about 2 minutes and was the only way to identify them. Do that FIRST rather
than grepping factory logs that do not exist. (⚠️ That m4a catalogue is on the operator's machine,
not in this repo.)

### 0g. Cover-worthiness check, before you build

Building 13 covers surfaced five classes of problem no cover can fix. Run this check against the
factory log **before** authoring, and say something out loud if it trips:

1. **Is the reel a confirmed failure?** VAULT (38) is: 47s, roughly 5s average watch (about 10
   percent), the account's worst. The autopsy is explicit that animation quality was not the
   variable; the premise was dead on arrival. A cover cannot rescue a dead premise. Build it if
   asked, but say so rather than quietly shipping it.
2. **Was the reel ever shipped?** EVOLVE failed three gate runs and was never posted. Its cover
   backs nothing.
3. **Is it even a Claude reel?** FACTORY (37) and SOL (36) are OpenAI/ChatGPT reels (GPT-5.6
   Sol/Terra/Luna, teal #10A37F). Their covers carry **zero Claude mascots**; a drawn gold sun
   and silver crescent instead. ⛔ Never let an OpenAI reel's cover read as Claude.
4. **Does the hook depend on an expired deadline?** BLUEPRINT, CLONE, MINT, CREW and VAULT all
   opened on the free-Fable-5 window that died 2026-07-12. For CLONE and BLUEPRINT the countdown
   *is* the hook (frame 0 is a ticking clock). **Expired deadlines do not travel.** Every cover
   leads with the evergreen payoff, and the fan-out contract bans clocks outright.
5. **Is the claim verified?** WORTHY (27) rests on an unverified routing claim that the reel
   itself hedges. Its cover frames a CHECK the viewer runs, never an accusation.

---

## Stage 1 · Write the copy (see `02`)

Two lines into the locked slot: `line1` at 78px, `giant` at `giantSize` (SceneCover's default is
158). The giant is one word in practice because 1080px only fits so much.

Gate the copy on three questions before authoring anything:

- **Is it a promise, not a lament?** "EVERYONE'S WAITING FOR / FABLE 6" describes other people.
  "BUILD YOUR OWN / FABLE 6" addresses the viewer. Same reel, and only the second earns a tap.
- **Can a stranger name the SUBJECT from the headline alone?** POWERS shipped as "NOT
  AUTOCOMPLETE. / 6 POWERS" and the client's literal reaction was *"what is this one for?"*
  Retitled "CLAUDE CODE'S / 6 POWERS". A cover has no VO and no caption to lean on; a contrarian
  hook that omits the subject is a riddle, not a hook.
- **If the premise cannot be asserted, ask it.** WORTHY's hedge "CHECK WHICH MODEL / YOU GOT"
  drew *"the check which model you got is such an ass headline"*. It asked the viewer to do
  admin. Replaced with "ARE YOU **ACTUALLY** ON / FABLE 5?" A question makes zero factual claim
  while creating the exact tension the hedge destroyed.

⛔ **After any headline change, re-read every secondary string in the scene.** This orphaning bug
has now happened twice: once when BUILD YOUR OWN made the chip "BUILD IT YOURSELF" a duplicate,
once when a WORTHY rewrite left the scene saying OPUS/SONNET while the reel's own language is
FABLE 5 vs OPUS 4.8.

---

## Stage 2 · Author the scene (see `03`)

Full-bleed bespoke art, imported chassis, constant type system. The four constraints that most
often bite at this stage, restated because they gate the render:

- **HEADER QUIET ZONE y336..780 stays structurally empty.** Sky, gradient, soft glow only. No
  columns, no blocks, no props, no hard edges. HERMES had to be rebuilt from a one-point
  perspective interior to an exterior because near columns are tall by construction.
- **Every cover needs a VERB.** If nothing is happening in the scene, the cover is a diagram.
  HERMES v2 was a figure standing in a hall and died next to the other two; pages converging on
  Claude fixed it.
- **Draw, do not stack.** Hero objects are ONE inline `<svg>` with real paths. A grep across all
  13 set-3 scenes found **0 real `<svg>`**, every sun and burst assembled from divs, and the
  client caught it: *"the sol image doesn't look good... it looks low quality, same with the yes
  man slide."*
- **When the artifact IS the subject, it has to dominate the tile** (see `03` §K). POWERS' IDE
  panel was enlarged 1.22x, 712x450 to 868x549, because the six tiles are the subject and were
  sitting in 66 percent of the width with a mascot beside them. Same failure as set 1's card at
  w500/h720, fixed by going to w610/h820.

---

## Stage 3 · Render fast

### What you need to run anything

The covers are Remotion compositions inside a private project, `~/Downloads/matchtern-longform/video`.
That project, not this repo, is where renders happen. Versions on the build machine:

| | |
|---|---|
| Node | v24.15.0 |
| `remotion` | 4.0.370 |
| `react` | 19.2.0 |
| Python (verification tools) | 3.x with `pillow` 11.3.0 and `numpy` 2.0.2 |

⛔ **`cover-system/src/` in this repo is a read-only VENDORED COPY, not the build tree.** The four
files there (`ReelCovers.tsx`, `ReelCovers3.tsx`, `ReelCovers4.tsx`, `fonts.ts`) are byte-identical
to the project's copies and exist so the spec in these docs can be checked against real source.
**Editing them renders nothing.** They also do not compile standalone: they import
`./CarouselConcepts` (CLAY, INK, mono, seed, Bloom, Dust, Mascot) and `./ClaudePokeballReel`
(Mascot, Pokeball, EvoGlow), plus `ReelCovers2.tsx`, `Root.tsx` and `index.ts`, none of which are
vendored here. Treat this repo as the specification and the project as the implementation, and if
you are rebuilding from scratch, expect to author those modules yourself against `01` through `04`.

### Registering a cover

Comps live in `src/Root.tsx` in a `reelCovers: [string, React.FC][]` tuple array (line 96) that is
`.map`ped at line 857 into `<Composition ... durationInFrames={2} fps={30} width={1080}
height={1920} />`. Adding a cover is one import plus one tuple entry.

- **Composition ID convention: `Cover<Keyword>` in PascalCase.** `CoverPowers`, `CoverCallback`,
  `CoverBlueprint`. Exceptions you will see and should not copy: set 1 is numbered
  (`Cover51`, `Cover52A`, `Cover52B`), and the rebuilt OS is `CoverOSv2` because `CoverOS` was
  already taken by the superseded set-2 comp. For a new reel "FOO" the ID is `CoverFoo`.
- Proof comps are `<Id>Proof` (the `cropProof` HOC overlays the 4:5 and 1:1 guides).
- `durationInFrames={2}` with `--frame=0` because these are stills. Remotion needs a nonzero
  duration; 2 is the cheapest legal value and frame 0 is what you render.

### The render command

Every `npx remotion still` was copying the project's `public/` directory before rendering
(845MB when first measured, 810MB today), roughly 90 seconds per render. Covers reference no
`staticFile()` assets, so point `--public-dir` at an empty directory:

```bash
mkdir -p /tmp/emptypublic
cd ~/Downloads/matchtern-longform/video     # the project, not this repo
npx remotion still src/index.ts CoverPowers \
  "$PWD/out/reel-covers/POWERS_cover.png" \
  --frame=0 --public-dir=/tmp/emptypublic
```

**5.5s instead of ~90s.** Output verified byte-identical to a normal render (max pixel diff 0).
This is the single biggest tooling win of the cover work, and it is what makes a
build-and-render-per-agent fan-out affordable. The output path must be absolute.

---

## Stage 4 · Verify (see `04`)

Never deliver an unverified render. **The checker is `tools/verify_cover.py`** in this repo
(needs `pillow` and `numpy`); it runs five checks, prints PASS/FAIL per check and exits non-zero
if any fail, so it can gate a build.

```bash
python3 tools/verify_cover.py ~/Downloads/matchtern-longform/video/out/reel-covers/POWERS_cover.png
python3 tools/verify_cover.py --tile POWERS_cover.png    # also writes a 150px grid crop
```

⛔ There is no `tools/verify_cover.py`. If a doc tells you to write one, do not: a second
divergent checker is the "duplicating the chassis is how it drifts" failure applied to the
verifier.

The three cheapest checks, in the order they catch the most:

1. **Header slot.** First headline ink row must land in **y438..447** and the last must not run
   past **y665** (past that, the giant wrapped to two lines and the slot is broken). Measured
   across the 20 canonically-named covers the first row is 440..445 and the last is 602..652.
   ⚠️ Do not quote "y445..652" as a per-cover guarantee; it is the envelope, not a constant.
2. **Giant margin scan.** Measure the band `a[520:700]` with threshold `sum < 520` (so it catches
   CLAY as well as INK) and take `min(left, 1080 - right)`. Standing target: **>=110px each
   side**. Re-run after ANY copy change.
3. **The 130px tile test.** Crop to 4:5, downscale to 130-150px, and look at it next to a shipped
   tile.

⚠️ **The numpy dark-row scan (`sum < 330`, content must sit inside y420..1500) is a SET-1 CHECK
ONLY.** It was written for the cream card covers, where it correctly reads 444..1488. On the
scene covers it reads `rows.max() = 1919` on 19 of 20, because a full-bleed dark floor band is by
design darker than the threshold and by design reaches the frame edge. Running it on a scene
cover and calling the result a failure is a metric error, not a defect. `verify_cover.py`'s
`check_composition` is the scene-cover equivalent: it compares against the row median, scans only
y800..1635, and looks for voids rather than for out-of-band content.

⭐ **Three different "quiet zone" numbers ship in this system and they are NOT interchangeable.**
Applying the wrong threshold is the single easiest way to misread a cover:

| metric | where | reads on a good cover | limit |
|---|---|---|---|
| gutter `std` over x0..300 + x780..1080, y336..780 | `01`, `03` | 47.8 / 49.0 / 60.4 | see `03`, and note real covers reach 69 |
| row-mean step over y336..430 | `04` §3.3 | 6.1 to 6.5 | not the tool's metric |
| per-pixel channel diff, `check_quiet_zone` | `tools/verify_cover.py` | 21 to 26 | **40** |

The `40` in this doc and in the tool is the **third** row. Genuine intruding geometry reads 100+
on that metric; the `~23` floor is the `PaperGrain` noise overlay.

⭐ **Calibrate every detector against a known-good sample.** Twice the quiet-zone detector
reported 8/8 FAIL with near-identical numbers, which is the tell that the *metric* is broken, not
the work: first it was measuring the headline itself, then the floor was `PaperGrain` at about 20
for every cover. HERMES (verified by eye) set the real floor at about 23. **Uniform failure across
every item means suspect the metric.** ⭐ Uniform *passing* deserves the same suspicion.

---

## Stage 5 · Iterate on the PNG, not the source

⛔ **The first render is a WIREFRAME.** It is never delivered. This is the same rule as the reel
overhaul stage (a pre-existing house rule, not something this project invented) and it holds here
for a specific reason: an entire class of defect is invisible in the code and obvious in a zoom.

Documented cases where the code read fine and the pixels did not:

- A pale rectangle under the hero that turned out to be **sky through a 120px gap** between two
  hill arcs, reading as Claude standing on a blue pillar. Misdiagnosed twice as a sprite artefact
  before cropping in to look.
- **A limb drawn as three colour bands separates into two floating bars** at grid size.
- **A pale gem on a gold plate is invisible**, so five gems read as four (#F2E4B0 on #E0AE55).
  When an element encodes a COUNT, every instance needs value separation from its ground.
- A style object with **two `top` keys**; JS silently keeps the last, putting a contact shadow
  174px right of its owner. Grep for repeated keys after any hand-edit.
- A scripted multi-line replace that **silently no-matched on whitespace**, so an enlarged font
  never applied and the bubble text spilled its box. The script printed `bubble: False` and the
  render shipped anyway. **When a scripted replace can fail, assert on the result.**

So the loop is: render, crop, zoom into each region, fix the source, re-render. Not: read the
source and reason about it.

---

## Stage 6 · Deliver

### ⛔⛔ ALWAYS ship a labeled index sheet

Two batches (8 covers, then 7) went out with one generic caption each. The client could not tell
which image was which post and had to ask what one of them was even for:

> *"please be clear which photo corresponds to which post"*
> *"what is this one for?"*

**A batch of visually similar deliverables is unusable without labels.** The covers share a type
system by design, which is exactly what makes a bare batch illegible.

Standing fix: regenerate `out/reel-covers/COVER_INDEX.png` after any cover change and send it
FIRST, before or alongside the individual files. Name the post in the caption of every
single-file send too.

### The index-sheet generator

It is a committed, argv-driven script: **`tools/build_cover_index.py`** (pillow only, no numpy,
no macOS-only font path, works on any render directory).

```bash
python3 tools/build_cover_index.py --check          # 23 covers -> 5 rows -> 1210x1756
python3 tools/build_cover_index.py                  # writes into the default render dir
python3 tools/build_cover_index.py --dir DIR --out /tmp/sheet.png
```

Shipped geometry: 5 columns, each cover cropped to its 4:5 tile (`crop(0, 285, 1080, 1635)`) at
230x288, a 43px clay bar with the post NAME burned under it, and a header line stating the
filename convention. The 23-cover sheet is **1210x1756**, and the run above reproduces the shipped
`reference/COVER_INDEX.png` at that exact size, with tile imagery matching to under 0.9 percent of
pixels (LANCZOS rounding). The residual difference is confined to the burned label text, which is
font-hinting, not geometry.

Two things the earlier pasted-in version of this script got wrong, both of which meant the
published code did not reproduce the published artifact:

- ⛔ **The height formula.** `H = PAD + HDR + rows*(TH + BAR + GAP - 1)`, not
  `... + rows*(TH+BAR) + (rows-1)*(GAP-1)`. The trailing 9px gap is included for **every** row so
  the last label bar does not touch the frame edge. The wrong formula yields 1747 against a
  shipped 1756.
- ⛔ **It globbed `*_cover.png`.** That silently returns **20** files and ships a 4-row sheet.
  The generator now carries an explicit ordered `COVERS` table of 23 `(label, filename)` pairs
  and hard-errors on a missing render. The order is editorial (build order: set 1, then set 2,
  then set 3), not alphabetical.

⚠️ **`CoverRamsay` is built and rendered but is not on the shipped sheet.** That is a real
omission, not a design decision. If you regenerate the sheet for a delivery that includes RAMSAY,
add it to `COVERS` and the sheet becomes 24 covers, still 5 rows, still 1210x1756.

### File naming

- On-disk convention is **`<KEYWORD>_cover.png`**, where KEYWORD is the reel's CTA comment
  keyword (POWERS, CALLBACK, MINT). The filename alone identifies the post, which is half the
  labeling problem solved for free. 20 of the 23 shipped covers follow it.
- ⛔ **Revisions get a FRESH filename**, never the same one. Re-sending an identical path serves a
  cached thumbnail on the client's side and it looks like nothing changed. Use `POWERS_cover_v2.png`,
  `POWERS_cover_FINAL.png`, and only then settle back onto the canonical name for the index sheet.
- ⛔⭐ **`_FINAL` is a trap on the three set-1 covers, and it cost a false regression claim.**
  `51_SKILLS_cover_FINAL.png`, `52_BALL_coverA_FINAL.png` and `HERMES_cover_FINAL.png` are the
  **CardCover-era** finals: that chassis was later killed, and all three **FAIL**
  `verify_cover.py` (card art intrudes into the quiet zone, so header ink runs to y799).
  The covers actually on the shipped index sheet are the SceneCover rebuilds
  **`52_BALL_cover_v3.png`, `51_SKILLS_cover_v2.png`, `HERMES_cover_v2.png`**, and those three
  pass every check. So the correct regression statement is: **all 23 covers referenced by
  `tools/build_cover_index.py` pass `tools/verify_cover.py`.** "All files matching `*_FINAL`" does
  not. The last revision by filename is not necessarily the shipped one; the index sheet is the
  authority on what shipped.
- `*Proof` comps (the `cropProof` HOC wraps a cover with the 4:5 and 1:1 guides overlaid) are
  **review only, never delivered**.

---

## The multi-agent shape that worked

This is the workflow that produced the POWERS rebuild, the highest-effort cover in the set. Four
stages, and the last one is the one people cut.

```
AUDIT                 measure the gap + extract a spec from source frames
   |
   v
N DIRECTIONS          3 independent builders, each BUILDS AND RENDERS a full PNG
   |
   v
DIVERSE-LENS JUDGES   per variant: craft / fidelity / grid  (not three identical critics)
   |
   v
SYNTHESIS             forced to answer: "does this clear the bar, YES or NO?"
```

**Audit first, and make it quantitative.** The trigger was *"the design here for this one doesn't
look as polished and as good as the other covers."* The audit compared POWERS against the six
strongest covers and the answer was STRUCTURAL, not decorative: every cover the client rates as
polished is the same composition, which this handbook calls **the house panel**. That means: a
warm cream field with real breathing room, **ONE dark rounded object centred with symmetric
margins** (MINT's browser, CALLBACK's ATS machine, OS's ledger board, PLUGINS' hub), mascots
grounded on a tan floor band below it, clay accent in the headline. POWERS was a sprite and
confetti on a bare gradient: 2 depth layers against their 5. ⭐ So the fix for "unpolished" is
usually **put the moment INSIDE the house panel**, which solves contrast for free (a violet hero
has nothing to read against on cream, and reads perfectly against a navy interior).

**Builders must render, not describe.** Each direction ships a PNG. This is only affordable
because of the 5.5s render trick in Stage 3. Agents that self-verify by rendering caught real
bugs that would otherwise have shipped: a board reading as a monitor, impact rays defacing the
resume artifact, a masked card number colliding with its status chip, content-box versus
border-box sizing.

**Judges get different lenses.** Three copies of the same critic produce three copies of the same
opinion. Assign craft (is the drawing good), fidelity (does this match the reel), and grid (does
it survive at 130px) to separate agents.

**Synthesis must be allowed to say NO.** On the POWERS rebuild the synthesis answered **NO for
all three variants and listed 16 defects.** That honesty was the entire value of the workflow. A
synthesis stage that can only rank and recommend is a rubber stamp.

⛔⭐ **Three agents making the same mistake is a MISSING CONTRACT, not bad luck.** All three
POWERS builders independently shipped a floating gauntlet and no contact shadows, and two
independently drew a limb as a rotated bar that read as a ramp. Both went straight into the
standing scene brief.

⛔⭐ **The worst offenders were rules that already existed and were simply never handed over.**
Draw-dont-stack, the sprite grounding law, no-emoji and first-render-is-a-wireframe were all
established house rules for this account before a single cover was built. The 13-scene
draw-dont-stack failure happened because nobody put them in the agent contract. When you assemble
a fan-out brief, the question is not "what have I learned here" but "what does this account
already know that these agents cannot see".

⭐ The set-2 fan-out (7 covers, 3 agents) worked *because the contract carried the session's
scars*: header quiet zone, no-gap floors, silhouette-carries-meaning, the grounding law,
nothing-behind-the-hero, 4+ depth layers, verb required. **The contract is the product of every
previous bug.** Update it every time.

⛔ A fan-out cannot see reel-wide patterns. Always add a GLOBAL AUDIT stage after a per-item
fan-out: the optical-fit problem (OVERNIGHT at 1012px wide, 37px of air) was only visible when
all ten covers were measured together.

---

## Concurrency: the chassis is IMPORTED, never duplicated

There are four cover files and **exactly one definition of the header slot**. `SceneCover`,
`CardCover`, `Giant` and `cropProof` all live in `ReelCovers.tsx`; the other files import what
they need:

| file | imports from `ReelCovers.tsx` | covers |
|---|---|---|
| `ReelCovers.tsx` | (defines them) | 3 set-1 covers + `Cover65A/B` |
| `ReelCovers2.tsx` | `{ CardCover, cropProof }` | OS (superseded), RAMSAY |
| `ReelCovers3.tsx` | `{ SceneCover, cropProof }` | 7 |
| `ReelCovers4.tsx` | `{ SceneCover, cropProof }` | 13 |

⚠️ Two corrections to a claim repeated across several docs. **`Giant` is exported and imported by
nobody**; it is used only inside `ReelCovers.tsx`, and scene files reach it through `SceneCover`.
And **`Giant`'s own default is `size = 150`** (`ReelCovers.tsx:54`); the 158 everyone quotes is
what `SceneCover` passes via its `giantSize = 158` default (`ReelCovers.tsx:299`). The rendered
output is 158; the component default is not.

- ⛔ **Duplicating the chassis is how the slot drifts.** Two parallel sessions with two copies of
  `SceneCover` will not keep `top 434 / size 78` and `top 514 / size 158` in sync, and the
  consistency guarantee (headline ink starting at y438..447 on every cover) is the entire product.
- ⭐ The isolation pattern that worked while a live concurrent session was editing
  `ReelCovers.tsx`: put new covers in **their own file** and make exactly ONE additive change to
  the busy file (adding an `export`). Edit's exact-match requirement is the safety net; it warns
  when the file moved under you.
- ⛔ **Re-grep for your own fixes after any concurrent edit.** A parallel session silently
  reverted a cleanup (a garbled `"...#D4B madre)".replace(" madre","877")` string came back). An
  Edit that "applied cleanly" does not mean the rest of your work survived.
- Stay purely ADDITIVE in a file someone else owns.

---

## The whole pipeline as a checklist

```
[ ] 0  ASK: carousel cover slide, or reel grid cover? Different jobs. Ask before anything else.
[ ] 0  Watch the reel. No factory log -> two ffmpeg sheets: whole video + last 10% at 2fps.
[ ] 0  Locate the signature beat by rarest-colour scan; brightness-gate if "glowing".
[ ] 0  Cover-worthiness: failed reel? never shipped? not Claude? expired deadline? unverified claim?
[ ] 1  Copy: promise not lament · subject named · question if unassertable · re-read sub-copy.
[ ] 2  Scene: quiet zone y336..780 clear · has a VERB · hero objects are one inline <svg> ·
       if the artifact is the subject, it dominates the tile.
[ ] 3  Register CoverFoo in Root.tsx. Render with --public-dir=<empty dir>. 5.5s.
[ ] 4  python3 tools/verify_cover.py <png>   (slot 438..447/<=665 · margins >=110 · quiet <=40)
[ ] 5  Zoom the PNG. First render is a wireframe. Fix source, re-render.
[ ] 6  python3 tools/build_cover_index.py. Send the sheet FIRST. <KEYWORD>_cover.png.
       Fresh name for revisions; the index sheet is the authority on what shipped.
```

---

**keywords:** reel grid cover pipeline, end-to-end cover process, ask which surface first,
carousel cover slide vs reel grid cover, watch the reel rule, ffmpeg contact sheet frames,
ffmpeg-static duration without ffprobe, signature beat detection, rarest colour scan, brightness
gated violet, ThreatMon inline svg, POWERS rebuild, cover worthiness check, remotion still
public-dir 5.5s, remotion 4.0.370, Root.tsx reelCovers tuple, CoverFoo composition id convention,
durationInFrames 2 frame 0, vendored src is not the build tree, verify_cover.py, no
verify_cover.py, header slot 438..447, set-1-only dark row scan, three quiet zone metrics, first
render is a wireframe, COVER_INDEX.png 1210x1756, build_cover_index.py, index sheet height
formula, labeled deliverable batch, &lt;KEYWORD&gt;_cover.png, _FINAL is superseded CardCover,
cached thumbnail fresh filename, multi-agent fan-out, diverse lens judges, synthesis says no,
missing contract, house panel, pre-existing house rules never handed over, SceneCover imported
not duplicated, Giant default 150 SceneCover 158, concurrency ReelCovers.tsx, 23 shipped 25
built, nocodealex
