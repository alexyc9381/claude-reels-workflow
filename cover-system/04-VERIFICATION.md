# 04 · Verification and measurement

**What this is:** the machine-checkable half of the reel grid cover system. Every geometric rule in
this handbook (the locked header slot, the giant's side margins, the header quiet zone, full-bleed
floor bands, composition fill) is a numpy scan over the rendered PNG, and running those scans is what
kept the set looking like one set instead of two dozen one-offs. **When to read it:** before you ship
any cover, after any copy change, after any vertical reframe, and any time a detector starts
disagreeing with your eyes.

These are Instagram **reel grid covers** (the still that represents a reel in the profile grid),
1080x1920 uploaded, composed for the 4:5 tile. Not carousels.

**There is exactly ONE checker: `tools/verify_cover.py`.** Earlier drafts of this document told you to
write a second one called `verify_cover.py`. Do not. A divergent second verifier is the same failure
as duplicating the cover chassis: two definitions drift and then neither is authoritative. Every
number in this document is the output of `tools/verify_cover.py` as shipped, re-measured 2026-07-19.

The single most important idea in this document is at the bottom, in **THE CALIBRATION LESSON**. Read
it first if you are debugging a check rather than a cover.

---

## 0. Why any of this is automated

The covers were built by fan-outs of agents across four source files, over one day, by someone who
could not hold two dozen compositions in their head. Three bugs made the case for automation on their
own:

- Alex, on CLONE: *"it isn't properly framed for how it looks on the profile."* Cause was a **240px
  totally empty band at y705..885** with all the mass in the bottom third. Invisible in code, obvious
  to a row-density scan.
- Alex, on CLONE again: *"for some reason there's a big white bar at the bottom."* A reframe shifted
  every `top >= 860` up by 80px; the full-bleed floor bands moved but kept their heights, ended at
  y1840, and the last 80px rendered as the SceneCover base CREAM. A one-line row-colour scan finds it
  instantly.
- Alex, on the giants: *"the word OVERNIGHT and INTERVIEW, those ones like it's too close to the
  edges."* He caught by eye what a 6-line margin scan catches in 200ms across the whole set.

Every check below exists because a specific bug shipped. The failure story is quoted with each one; a
rule without its failure story gets ignored by the next reader (including the next AI agent).

---

## 1. What was built, and what the checks run against

**23 covers were built.** They are not interchangeable and the count matters when you read a pass
report:

| Group | Count | Chassis | Source file | On-disk name |
| --- | --- | --- | --- | --- |
| Set 1 (BALL, SKILLS, HERMES) | 3 | `SceneCover` in source, `CardCover` in the delivered PNG | `ReelCovers.tsx` | `52_BALL_coverA_FINAL.png`, `51_SKILLS_cover_FINAL.png`, `HERMES_cover_FINAL.png` |
| Set 2a (OS, RAMSAY) | 2 | `CardCover` | `ReelCovers2.tsx` | `OS_cover_FINAL.png`, `RAMSAY_cover_FINAL.png` |
| Set 2b (OS, TAKES, CAROUSEL, DESIGN, CALLBACK, PURGE, PLUGINS) | 7 | `SceneCover` | `ReelCovers3.tsx` | `<KEYWORD>_cover.png` |
| Set 3 (POWERS, EVOLVE, STACK, ARENA, VAULT, MINT, CREW, BLUEPRINT, CLONE, WORTHY, ATTACK, FACTORY, SOL) | 13 | `SceneCover` | `ReelCovers4.tsx` | `<KEYWORD>_cover.png` |

**20 of the 25 are scene covers rendered under the `<KEYWORD>_cover.png` convention, and all 20 pass
all five checks.** The other 5 are `CardCover`-era PNGs and **13 checks fail across them**. That is
not a mystery, see section 4.1: those PNGs are stale renders and the check report is telling the
truth about them.

⛔ Do not quote "23 covers pass" or "all covers pass". The honest sentence is: **20/20 scene covers
pass; the 5 CardCover-era PNGs fail and are known-stale.**

### House geometry the checks assert against

| Constant | Value | Meaning |
| --- | --- | --- |
| Canvas | 1080 x 1920 | what you upload; `_load()` hard-fails on any other size |
| 4:5 grid tile | y285..y1635 (1080x1350) | what the profile grid shows |
| 1:1 legacy crop | y420..y1500 (1080x1080) | older surfaces; put load-bearing content here |
| Header line 1 | `top: 434`, `size: 78` | Fraunces 900, `<Giant>` |
| Header giant | `top: 514`, `size: giantSize` | Fraunces 900, `<Giant>` |
| `giantSize` default | **158** | `SceneCover`'s prop default (`ReelCovers.tsx:299`) |
| `Giant`'s own default | **150** | `ReelCovers.tsx:54`. Never used: `SceneCover` always passes a size |
| Measured header ink, first row | **440..445** | glyph ascender shape, not slot drift |
| Measured header ink, last row | **501..652** | varies with the giant's descenders and colour |
| Header quiet zone | y336..780 | nothing structural may be drawn here |
| Giant side margin | **>= 110px each side** | content width <= ~860px |
| Visible floor inside the tile | y1500..1635 | figures standing here must be ~110px, not 150 |
| CREAM (page base) | `#ECE9E2` = rgb(236,233,226) | a CREAM pixel at y1912 means a short band |

⛔ **"Measured text rows land at y445..652 on every cover" is FALSE and appears in several other
docs.** It is a half-remembered reading of the three set-1 covers. Across the 20 shipped scene covers
the first ink row varies **440..445** and the last varies **501..652**. The tool encodes the real
tolerance: `SLOT_TOP_MIN/MAX = 438..447`, `SLOT_BOT_MAX = 665`. Use those numbers in any checklist.
The guarantee that actually holds is the SLOT (`top: 434` and `top: 514` in `SceneCover`), which is
identical by construction because there is exactly one definition of it.

Source of truth for the slot: `SceneCover` in
`/Users/alexchensmacmini/Downloads/matchtern-longform/video/src/ReelCovers.tsx`. `ReelCovers3.tsx:5`
and `ReelCovers4.tsx:5` both do `import { SceneCover, cropProof } from "./ReelCovers"`, so there is
exactly one definition of the header slot. (`Giant` is exported but is **not** imported by any other
file; other docs claiming "they import `SceneCover` and `Giant`" are wrong. `ReelCovers2.tsx:3`
imports `{ CardCover, cropProof }` and never touches `SceneCover` at all, which is why its two covers
fail the slot check.) Duplicating the chassis is how the slot drifts.

---

## 2. Render the covers before you check them

The `src/*.tsx` files in this repo are a **read-only vendored copy** for reference. Rendering happens
in the real project:

```bash
cd /Users/alexchensmacmini/Downloads/matchtern-longform/video
mkdir -p /tmp/emptypub
npx remotion still src/index.ts CoverClone \
  /Users/alexchensmacmini/Downloads/matchtern-longform/video/out/reel-covers/CLONE_cover.png \
  --frame=0 --public-dir=/tmp/emptypub
```

Composition IDs are `Cover<Keyword>` (`CoverClone`, `CoverPowers`, `CoverCallback`), except the set-2b
OS cover which is `CoverOSv2`. They are registered in `Root.tsx` from a `reelCovers` tuple array.

`--public-dir` pointed at an **empty** directory is not optional in practice. The project's `public/`
is 845MB and Remotion copies it before every render: **~90s per still becomes 5.5s**, output verified
byte-identical (max pixel diff 0). These covers reference no `staticFile()` assets, so nothing is
lost. This was the single biggest tooling win of the cover work.

---

## 3. The five checks

`tools/verify_cover.py` needs pillow and numpy and nothing else:

```bash
python3 -m pip install pillow numpy
```

The five checks are `check_header_slot`, `check_margins`, `check_quiet_zone`, `check_bottom_band` and
`check_composition`, wired into the `CHECKS` list and run by `main()`. `main()` exits 1 if any cover
fails any check, so it can gate a build. The code below is quoted from the tool, not paraphrased.
Every check takes `a`, the `HxWx3` int array of the PNG.

---

### 3.1 Header slot: `check_header_slot`

```python
rows = np.where((a[380:780].sum(axis=2) < 210).any(axis=1))[0]
top, bot = 380 + int(rows.min()), 380 + int(rows.max())
# PASS: 438 <= top <= 447  AND  bot <= 665
```

**Threshold:** first ink row in 438..447, last ink row at or above y665. The ink gate is `sum < 210`
(INK `#1A1813` sums to 77), deliberately tighter than the margin check's gate, because scene art in
the same rows would otherwise pollute the reading.

**The bug it catches:** a giant that is one character too long wraps to two lines and breaks the
locked slot. Ten-character giants at 158px ("ONE PROMPT", "FIRST TAKE", "YOU FORGOT") all wrapped;
copy was retightened to "1 PROMPT", "5 TAKES", "FORGOT". **The wrap is detected here, not by counting
letters.** If the last ink row runs past y665, it wrapped.

**Measured across the 20 shipped scene covers** (actual tool output, 2026-07-19):

```
ARENA     445..638   BLUEPRINT 440..628   CALLBACK  445..501   CAROUSEL 445..652
ATTACK    445..652   CLONE     445..652   CREW      445..652   DESIGN   440..652
EVOLVE    445..647   FACTORY   445..652   MINT      445..649   OS       445..627
PLUGINS   445..652   POWERS    445..604   PURGE     445..642   SOL      445..633
STACK     445..652   TAKES     445..652   VAULT     445..638   WORTHY   445..652
```

440 vs 445 is glyph ascender shape (a `B` and a `D` do not start on the same row as a `T`), not slot
drift. Anything outside 438..447 is a real problem. `52_BALL_coverA_FINAL.png` reads **top y=503** and
is the worked example of a fail: 69px low, because `CardCover` never used the locked slot.

Note CALLBACK at 445..**501**. Its giant is CLAY, not INK, so the `sum < 210` gate never sees the
second line at all. That is fine for the slot check (line 1 alone proves the slot) and it is exactly
why the margin check below uses a different, looser threshold.

---

### 3.2 Giant side margins: `check_margins`

```python
band = a[520:700]
cols = np.where((band.sum(axis=2) < TEXT_SUM).any(axis=0))[0]   # TEXT_SUM = 520
left, right = int(cols.min()), 1080 - int(cols.max())
# PASS: min(left, right) >= 110
```

**Threshold:** `sum < 520`, and both margins >= 110. Note the tool reports `right = 1080 - cols.max()`
rather than `1080 - (cols.max() + 1)`, so its widths and right margins are 1px larger than a strict
pixel count. That is the off-by-one behind "TASTE is 537 or 538": **the tool says 537, a strict count
says 538.** Quote the tool.

**Why 520 and not 210.** This is the subtle one. INK is `#1A1813` (sum 77) but CLAY is `#D2724E`
(sum 448) and GOLD is `#E7B24C` (sum 573). The clay accent lands on the *entice word* or on the
giant's numeral, so an INK-only threshold **silently ignores half the headline** and reports a margin
that belongs to a shorter word than the one on screen. 520 catches INK and CLAY while staying below
CREAM (695) and below the `PaperGrain` speckle.

**The bug it catches:** Alex, 2026-07-18: *"the word OVERNIGHT and INTERVIEW, those ones like it's
too close to the edges."* At the fixed 158px size the giant ran from 537px ("TASTE") to **1012px
("OVERNIGHT")**. That reading still reproduces exactly: run the tool on `OS_cover_FINAL.png`, which is
the pre-retitle `A WEEK OF WORK / OVERNIGHT` render, and it reports `margins 37/31, width 1012`. The
scan confirmed only OVERNIGHT (37/31) and INTERVIEW (58/47) were outliers; everything else sat at
118..275.

**The fix is the `giantSize` prop, not a smaller default.** The SLOT (top 434 / 514) never moves; the
SIZE is optically fitted per cover. Shrinking every cover to fit the longest would have cost the short
ones their punch. Shipped fitted sizes, read straight from source:

| Cover | Giant | `giantSize` | Source line |
| --- | --- | --- | --- |
| CALLBACK | UNREJECTABLE | 101 | `ReelCovers3.tsx:1775` |
| POWERS | SUPERPOWERS | 103 | `ReelCovers4.tsx:304` |
| OS | AGENTIC OS | 130 | `ReelCovers3.tsx:344` |
| BLUEPRINT | OVERNIGHT | 131 | `ReelCovers4.tsx:3971` |
| SOL | (set 3) | 137 | `ReelCovers4.tsx:6167` |
| ARENA | (set 3) | 142 | `ReelCovers4.tsx:1976` |
| VAULT | (set 3) | 142 | `ReelCovers4.tsx:2528` |
| PURGE | IDENTITY | 148 | `ReelCovers3.tsx:2125` |
| EVOLVE | (set 3) | 153 | `ReelCovers4.tsx:869` |
| MINT | (set 3) | 155 | `ReelCovers4.tsx:3120` |

⛔ **CALLBACK is 101, not 136.** An earlier draft of this file said *"OS 130, CALLBACK 101"*, which inverts the history. 136 was CALLBACK's **earlier** set-2 fit, when its giant was
still the old title. When Alex retitled it to *"MAKE YOUR RESUME / UNREJECTABLE"*, the 12-letter giant
needed a much bigger step down and the fit landed at **101**, which is what ships. Every other file in
this handbook says 101 and they are right.

**The measure-then-fit loop** (six of fifteen covers needed it; guessing from character count was
wrong every time):

```
render every cover at giantSize 158
  -> measure the giant's pixel width w
  -> size = round(158 * 840 / w)
  -> apply, re-render, re-measure
```

This supersedes the older "cap the giant at 9 characters" rule. Character count is a bad proxy: `I` is
narrow, `W` is wide. **Measure the rendered width.**

Current shipped margins and giant widths (tool convention):

```
ARENA 124/119 w837   ATTACK 167/163 w750   BLUEPRINT 123/118 w839  CALLBACK 126/121 w833
CAROUSEL 125/118 w837 CLONE 242/236 w602   CREW 129/124 w827       DESIGN 275/268 w537
EVOLVE 121/119 w840  FACTORY 177/171 w732  MINT 125/117 w838       OS 134/134 w812
PLUGINS 182/176 w722 POWERS 123/120 w837   PURGE 166/156 w758      SOL 123/121 w836
STACK 138/133 w809   TAKES 208/202 w670    VAULT 125/120 w835      WORTHY 176/169 w735
```

The tightest shipped margin in the set is EVOLVE at 121. Re-run this after ANY copy change. Do not
trust arithmetic; font metrics do not add up the way you expect.

---

### 3.3 Header quiet zone: `check_quiet_zone`

```python
up = int(np.abs(np.diff(a[336:430], axis=0)).max())      # above the headline
dn = int(np.abs(np.diff(a[665:781], axis=0)).max())      # below it, above the scene
worst = max(up, dn)
# PASS: worst <= 40   (grain floor ~23; real geometry reads 200+)
```

**Threshold:** max vertical step <= 40, measured **per pixel per channel** over the full width of two
bands, y336..430 and y665..780. The headline rows themselves (430..665) are excluded, because the type
is nearly full width and would dominate any metric that included it.

⛔ **This is a per-pixel maximum, not a row-mean step.** An earlier draft of this file printed a
row-mean version (`np.abs(np.diff(g[336:430].mean(axis=1))).max()`) alongside the per-pixel numbers.
Those do not go together: the row-mean version reads **6.1..6.5** on the shipped set, not 21..24, and
a threshold of 40 against a 6.4 floor would never fire on anything. Averaging a row before
differencing it destroys the very thing the check exists to find: a hard horizontal edge that occupies
only part of the width. Use the code above.

**The rule it enforces:** Alex: *"the header text needs to be in the same spot for each post as
well."* The placement was **already pixel-identical**. What differed was what sat BEHIND it: HERMES'
one-point-perspective columns punched into the band, so its type sat on architecture while the others
sat on clean sky. **Same coordinates, different perceived position.** So: every scene keeps y < 780
structurally EMPTY. Sky, gradient, soft glow only. No columns, no blocks, no props, no hard edges.
Atmosphere yes, geometry no.

A one-point-perspective interior is structurally incompatible with this rule (near columns are tall by
construction). HERMES had to be rebuilt as an EXTERIOR archive facade with sky on top. That is a
design consequence of a machine check, which is the point.

**Measured now:**

```
20 scene covers      max step 21..24     (OS 21, BLUEPRINT/SOL/TAKES/VAULT/CALLBACK/CLONE 22,
                                          most others 23, ARENA 24)
5 CardCover PNGs     max step 209..211
```

That 209 is not grain, it is the top edge of the card, which is real structural geometry sitting
inside the quiet zone. It is the best known-bad sample in the repo, so keep those files: **21..24
known-good against 209 known-bad is a ~9x separation**, and the threshold of 40 sits with room on both
sides. Read section 6 before you conclude anything from the uniformity of the passing numbers.

An older variant of this check measured `std` of the two side gutters (x0..300 and x780..1080) over
y336..780 and gave Mario 47.8 / Fable 49.0 / Hermes 60.4. ⛔ **Do not port those thresholds.** They
are a different metric on a different scale that happens to share the number 40 with this one, and the
gutter `std` reading on the shipped set runs 36.2 (DESIGN) to 69.4 (BLUEPRINT), so any "std < 65" rule
rejects covers the client approved (BLUEPRINT 69.4, EVOLVE 69.1, MINT 66.6, and MINT is a named polish
exemplar). The per-pixel step version is the better metric anyway, because a smooth gradient produces
small steps while a hard edge produces a large one, whereas `std` cannot tell a wide warm ramp from
architecture.

---

### 3.4 Bottom band: `check_bottom_band`

```python
row = a[1912].mean(axis=0)
is_cream = np.abs(row - CREAM).max() < 8     # CREAM = (236, 233, 226)
# FAIL if is_cream
```

**Threshold:** the mean colour of row 1912 must differ from rgb(236,233,226) by at least 8 in at least
one channel.

**The bug it catches, exactly.** Alex: *"for the clone video for some reason there's a big white bar
at the bottom."* A CLONE reframe shifted every element with `top >= 860` up by 80px. The full-bleed
floor bands moved with it but **kept their heights**, so they ended at y1840 and the last 80px
rendered as the SceneCover base CREAM. Measured: **rgb(103,70,38) at y1820 jumping to
rgb(236,233,226) at y1840.** Three bands were short in CLONE.

**The rule:** after ANY vertical shift, re-assert `height = 1920 - top` on every band meant to reach
the frame edge. `top` moves a band; it does not resize it.

Current values at y1912: every scene cover reads a warm floor tone (CLONE 101/68/38, ARENA 152/116/66,
POWERS 160/124/76 and so on), all with a channel distance of 150..195 from CREAM. The five
CardCover-era PNGs read rgb(205,197,186), a vignetted cream, whose distance from CREAM is **40** on
the blue channel (`|186 - 226|`), so they pass. Do not compute that distance on the red channel and
report 31: `np.abs(row - CREAM).max()` is a max over channels, and getting it wrong here means
shipping the exact bug the check exists to catch.

---

### 3.5 Composition and voids: `check_composition`

```python
med = np.median(a, axis=1, keepdims=True)
content = np.abs(a - med).sum(axis=2) > 46
rows = np.where(content[800:1635].any(axis=1))[0]
worst_gap, run = 0, 0
for y in range(800, 1635, 20):
    if content[y:y + 20].mean() < 0.02:
        run += 20; worst_gap = max(worst_gap, run)
    else:
        run = 0
# PASS: worst_gap <= 200
```

**Threshold:** no in-scene void longer than 200px, scanned in 20px steps.

**The bug it catches:** Alex on CLONE: *"it isn't properly framed for how it looks on the profile."*
The scan found a 240px totally empty band at y705..885, mass piled in the bottom third, content
spanning only ~540px of a 1350px tile.

**Two fixes, and only the second one worked:**

- Shifting content up did **not** fix it. The first attempt moved everything 80px up and the empty
  band stayed exactly 240px. A fill problem is not a position problem; shifting a void just moves it.
  (It also caused the white bar in 3.4.)
- The real fix is SIZE: enlarge the figures so the composition occupies the frame (wizard 260 to 315,
  copies 150 to 184), which took content from y900..1440 to **y816..1510**.
- **Enlarge sprites about their CENTRE, not their left edge.** Shadows, daises and badges are keyed to
  centres, so recompute `left = centre - size/2` (wizard 102 to 74, copies 595/735/875 to
  578/718/858). Changing `size` alone drifts every sprite off its own shadow.

**Two calibration decisions are baked into this function and both were bought with a false positive.**

1. **It scans from y800, not from the tile top.** Every cover has a deliberate gap between the header
   block and the scene. Scanning from y285 measures that gap and reports it as a void, which
   false-positived CALLBACK, one of the covers Alex holds up as the polish bar.
2. **"Differs from the row median" treats a full-width band as empty**, because a full-bleed floor IS
   the row median. That is why the threshold is a generous 200px and not something tight: floor bands
   on SOL, TAKES, STACK and CLONE all read as low-content strips.

Current worst in-scene voids: 0px (SKILLS) to 200px (the SceneCover HERMES render), median 80px.
POWERS reads content y800..1631 with a 40px worst void, which is what a fully-occupied frame looks
like. Treat a value in the 140..200 band as a **pointer, not a verdict**: it tells you which strip to
crop and look at.

---

## 3b. Scans that are NOT in the tool

These three are useful and are run by hand. They are deliberately not in `verify_cover.py` because
none of them can be turned into a pass/fail that survives full-bleed art.

### 3b.1 Edge clipping

```python
ink = a.sum(axis=2) < 330
cols = np.where(ink[285:1635].any(axis=0))[0]
print(int(cols.min()), int(cols.max()))
# REVIEW if min < 24 or max > 1055, unless the row is a declared full-bleed band
```

Hero and panel content stays inside x24..x1055. Full-bleed floor and sky bands are allowed to touch,
so read this per-row rather than per-image, or accept that ATTACK / CLONE / CREW / FACTORY / OS /
VAULT reporting `x 0..1079` is their floor band and not a defect.

**The bug it catches** (the "looks bad" signature, ATTACK / yes-man): the hero sat at **x33**, 33px
off the left edge, the panel ran x480..990 hard against the right, and there was a 255px void above
both. Same failure shape as CLONE. Fix pattern:

- Pull the hero IN and UP-SCALE it (x33 to 96, size 250 to 300, feet held on the floor line).
- Lift the panel group by shifting only elements whose `left` sits in the panel's x-range, so
  full-width bands at `left: 0` are untouched.
- Move dependent rows (the flag rows) by the same delta, since they were absolute SCENE coords, not
  panel-relative.

Related, from the same fix: **a speech bubble wedged between two grown elements has nowhere to go. Put
it ABOVE the speaker**, tail pointing down at the head. And: a scripted multi-line replace can
silently no-match on whitespace. I enlarged the bubble's font, the replace no-matched, the text
spilled out of its box, and I printed `bubble: False` and shipped a render anyway before catching it.
**When a scripted replace can fail, assert on the result and stop.**

Two more edge facts worth encoding as checks in your own set:

- **Feet below y1635 are cut by the tile crop.** Watching figures were placed with feet at y1706 and
  were sliced. The visible floor inside the 4:5 tile is only y1500..1635, so anything standing there
  must be ~110px, not 150px.
- **A rotated card is BIGGER than its box.** A 610-wide card at -2.2 degrees adds ~12px vertically each
  side; a first pass computed bottom=1495 and still clipped the 1:1 crop.

### 3b.2 The crop scan, and why it no longer applies to scene covers

The original set-1 check:

```python
dark = (np.array(img.convert("RGB")).astype(int).sum(axis=2) < 330)
rows = np.where(dark.any(axis=1))[0]     # set 1: must sit inside 420..1500
```

⛔ **This check is set-1 only. Do not run it on a scene cover and do not put it in a pre-ship
checklist.** Set 1 was cream pages with a floating card, so all dark content genuinely lived inside
the 1:1 band, verified at 444..1488. Scene covers are FULL-BLEED by design, so `rows.max()` is
**1919 on 19 of the 20** (POWERS, at 1563, is the only exception) and the check fails everything
without meaning anything. That is the same class of error as section 6: the metric was written for a
chassis that no longer exists.

The intent survives and is still correct: a cover uploads at 9:16 but is almost never SEEN at 9:16.
Put every load-bearing element (headline, hero, artifact) inside the **1:1 band** y420..1500; the
285px bands top and bottom are bleed and atmosphere ONLY. To assert that on a scene cover you must
exclude the declared full-bleed bands first, which is why the shipped tool checks composition inside
y800..1635 instead.

There is also a visual version: `cropProof(Comp)` in `ReelCovers.tsx:712` wraps any cover and draws
the 4:5 (cyan) and 1:1 (magenta) boundaries over it, labelled `4:5 GRID TILE` and `1:1 SAFE`.
**Review only, never delivered.**

### 3b.3 Grid read: crop to 4:5, downscale, and LOOK

```bash
python3 tools/verify_cover.py --tile out/reel-covers/CLONE_cover.png   # writes CLONE_cover_tile150.png
```

The tile renders about **130px wide in a 3-up profile grid**. At 130px, detail is noise. The carousel
formula (2-line Fraunces headline plus a 2-line subhead) is unreadable there. A grid cover gets **ONE
giant claim and ONE unmistakable hero shape.**

- Survived the downscale: the giant Fraunces word, a big simple silhouette (the pokeball read
  perfectly), a high-contrast gold pill.
- Turned to mush: the eyebrow line, stat bars, the set-number line, the ability chip. Keep them as the
  reward for looking closer; never let them carry the read.
- **A small muted eyebrow does NO work on a grid tile.** A 37px grey Inter line was invisible at 130px.
  "More visible" meant promoting the eyebrow into the headline (78px over 158px, both full-weight
  Fraunces 900), not nudging its size.

⛔ **The tile test passes things a full-size zoom catches.** A navy `suit` mascot vanishing into a navy
ops room read fine at 130px and was obvious at 1:1. Run both, always. See section 5.

---

## 4. Running the whole thing

```bash
cd /Users/alexchensmacmini/Downloads/matchtern-longform/video/out/reel-covers
python3 /Users/alexchensmacmini/Downloads/claude-reels-workflow/cover-system/tools/verify_cover.py *_cover.png
```

Expected output today: `ALL PASS  (20 cover(s))`, exit code 0. A sample block:

```
POWERS_cover.png
  PASS  header slot     slot y=445..604
  PASS  giant margins   margins 123/120 (min 110), width 837
  PASS  quiet zone      max step 23 (limit 40, grain floor ~23)
  PASS  bottom band     bottom row rgb [160 124  76]
  PASS  composition     content y=800..1631, largest in-scene void 40px
```

Order of operations for a change:

1. Render with `--public-dir=/tmp/emptypub`.
2. Run `verify_cover.py` on the changed cover. Any copy change moves `header slot` and
   `giant margins`; any vertical shift moves `bottom band` and `composition`; any new scene moves
   `quiet zone`.
3. Hand-run the edge-clipping scan (3b.1) plus a native-resolution zoom of the hero. Always.
4. `--tile` and actually look at the 150px crop. Always.
5. Regenerate `COVER_INDEX.png` and send it FIRST.

**Always ship a labeled index sheet, never a bare batch of images.** Alex, after receiving 8 and then
7 covers with one generic caption each: *"please be clear which photo corresponds to which post."* He
could not tell which image was which post and had to ask what one of them was even for. The standing
fix is `out/reel-covers/COVER_INDEX.png`: every cover cropped to its 4:5 tile, in a grid, with the
post NAME burned into a clay bar underneath, plus a header line stating the filename convention. PIL
plus `/System/Library/Fonts/Supplemental/Arial Bold.ttf`. Keep the on-disk convention
`<KEYWORD>_cover.png` so the filename alone identifies the post, and name the post in the caption of
every single-file send.

### 4.1 ⛔ The 5 failing PNGs are a STALE-RENDER regression, not a design regression

Run the tool over all 25 and you get **13 failures across 5 files**:

```
51_SKILLS_cover_FINAL.png   FAIL slot (text to y779) · FAIL quiet zone (209)
52_BALL_coverA_FINAL.png    FAIL slot (top y503) · FAIL margins (221/5) · FAIL quiet zone (211)
HERMES_cover_FINAL.png      FAIL slot (text to y779) · FAIL quiet zone (209)
OS_cover_FINAL.png          FAIL slot (text to y779) · FAIL margins (37/31) · FAIL quiet zone (209)
RAMSAY_cover_FINAL.png      FAIL slot (text to y779) · FAIL margins (53/52) · FAIL quiet zone (209)
```

**The first three are stale.** `Cover51`, `Cover52A` and `CoverHermes` in `ReelCovers.tsx` are all
`SceneCover` compositions today (lines 399, 471, 615), and the newer scene renders of exactly those
comps sit in the same directory and pass everything:

```
v5_Cover51.png       PASS x5   slot 444..652, quiet zone 26
v3_Cover52A.png      PASS x5   slot 445..652, quiet zone 21
v5_CoverHermes.png   PASS x5   slot 445..652, quiet zone 21
```

The `*_FINAL.png` files are timestamped 22 minutes EARLIER than the `v5_*` renders. They are the
pre-rebuild `CardCover` output that kept the `_FINAL` name. **Any doc that describes HERMES as a
CardCover-era final is reading the stale file, not the source.** Re-render `Cover51`, `Cover52A` and
`CoverHermes` to `51_SKILLS_cover.png`, `52_BALL_cover.png` and `HERMES_cover.png` before anyone
delivers them again.

**The last two are genuinely CardCover.** `ReelCovers2.tsx` imports `CardCover`, not `SceneCover`, so
`CoverOS` and `CoverRamsay` never had the locked slot and their giants ("OVERNIGHT" at 1012px, "THE
TRUTH" at 975px) were never optically fitted. They are not broken renders, they are a different
chassis, and they are the reason the honest count is 20/20 and not 25/25.

⛔ The reusable lesson: **a `_FINAL` suffix is a claim, not a fact.** The verifier caught a shipped
regression that a human reading the source would have sworn was impossible, because the source was
right and the artifact was old. Always verify the PNG you are about to send, not the comp you think
produced it.

---

## 5. Review at NATIVE resolution, never contact sheets

Contact sheets and tile renders answer *"does this read in the grid"*. They cannot answer *"is this
well made"*. Every craft defect in this project was found at 1:1 and would have passed a contact
sheet:

- A navy `suit` on a navy ops room: torso vanished, leaving a floating head, arms and legs. Fine at
  130px. Costumes are flat solid colours, so this is checkable BEFORE render: the backdrop directly
  behind the sprite must sit at the opposite end of the value scale from the costume.
- A limb drawn as three colour bands separates into two floating bars at grid size. One solid quad
  plus ONE narrow top highlight, started inside the torso and finished inside the cuff.
- **A pale gem on a gold plate is invisible: the five read as four.** Gem 5 was `#F2E4B0` on `#E0AE55`.
  When an element encodes a COUNT, every instance needs value separation from its ground, not just
  hue.
- A 0.34-alpha spill Bloom with no source object reads as a render smear. Five of them made the page
  look broken. One tight 0.16 rim under the panel does the job.
- A pale rectangle under the hero was **sky through a gap**: two hills spanning -120..500 and
  620..1240 left a 120px hole at dead centre, exactly where Claude stands, reading as him standing on
  a blue pillar. Misdiagnosed twice as a sprite artefact before cropping in to look. Never tile a
  floor with two arcs; lay a solid band behind them.
- Pale trails at `rgba(255,224,146,x)` are the **same value as the cream ground** and render
  invisible. Anything in motion must be GOLD `#E7B24C` or darker.
- A style object with **two `top` keys**: JS silently keeps the last one, which put a contact shadow
  174px right of its owner's centre. Grep for repeated keys after any hand-edit.

So the review protocol is three passes, not one: **1:1 zoom of the hero region · full-frame at native
resolution · 150px tile.** In that order.

---

## 6. ⭐ THE CALIBRATION LESSON

**A detector that flags EVERY item is broken. It is not telling you the work is bad.**

This happened twice in one audit, with the same check:

1. The quiet-zone detector reported **8/8 FAIL with near-identical numbers**. Cause: it was measuring
   the headline itself. Masking the two side gutters was not enough, because the type is nearly
   full-width.
2. Fixed to exclude the text rows, it reported **8/8 FAIL again**, floor ~20 for every cover. Cause:
   the `PaperGrain` overlay (`CarouselConcepts.tsx:64`). It is two tiled radial-gradient speckles at
   `5px 5px` and `7px 7px` pitch, applied to every cover by `SceneCover` after the scene renders. It
   puts a constant ~20 of high-frequency noise into any max-step or std metric.

⭐ **Near-identical numbers across independent compositions is never a property of the compositions.**
Twenty scenes built by three different agents do not agree to within a couple of counts by accident.
The tell fired twice in the same audit with almost the same reading, and both times it was the metric.

**The fix that actually resolved it: a known-good sample.** A cover verified by eye set the real floor
at **~23**, and the threshold went to 40 with room on both sides. The known-BAD sample was found
later and is better than the original guess: the CardCover-era PNGs read **209..211**, because the
card's top edge is a genuine hard horizontal edge inside the quiet zone. So the calibrated picture is:

```
grain floor      21..24     (20 shipped scene covers)
THRESHOLD        40
real geometry    209..211   (5 CardCover-era PNGs)
```

⛔ **Uniform passing deserves the same suspicion as uniform failure.** Section 3.3 reports 21..24 on
every single scene cover. If someone had set the threshold at 15 the report would read 20/20 FAIL and
a day would have gone into "fixing" covers that were fine. The reason to trust 40 is not that it
passes everything, it is that a known-bad sample sits 5x above it.

The same trap appears in 3.5: a row-median density metric reports full-bleed floor bands as zero
content, so a naive threshold flags most of the set. Again: the metric, not the work. It appears a
third time in 3b.2, where a check written for the set-1 card chassis fails 19 of 20 full-bleed scene
covers and means nothing by it.

**Procedure, every time you write a detector:**

1. Pick a sample you have verified BY EYE as good, and one you have verified as bad.
2. Score both. If they are close, the metric is measuring the wrong thing. Fix the metric before you
   touch a single cover.
3. Set the threshold in the gap, closer to the known-good floor than to the bad reading.
4. Record the calibration numbers in the code comment (grain floor ~23, geometry 209), so the next
   reader does not re-derive them. `verify_cover.py` does this in its module docstring.
5. **Keep the known-bad samples on disk.** The five failing PNGs in section 4.1 are the only reason the
   quiet-zone threshold can be defended with a number instead of a story.
6. State the metric's SCALE next to its threshold. Three different quiet-zone metrics have existed in
   this project (per-pixel step, row-mean step, gutter `std`) and two of them share the number 40 by
   coincidence. A threshold without its function is a trap for the next reader.

Related, from the same audit: three independently-built directions all shipped a floating gauntlet and
missing contact shadows. **Three agents making the same mistake is a MISSING CONTRACT, not bad luck.**
When a check catches the same class of defect on multiple items, fix the brief, not the items.

---

## 7. What the checks cannot see

Machine checks verify geometry. They do not verify that the cover should exist:

- **VAULT (38) is a confirmed FAILED reel** (47s, ~5s average watch, the account's worst). A cover
  cannot rescue a dead premise. Say so rather than quietly shipping it.
- **EVOLVE was never shipped** (failed 3 gate runs). The cover backs no reel.
- **FACTORY (37) and SOL (36) are OpenAI reels, not Claude.** Their covers carry zero Claude mascots by
  design (a drawn gold sun and a silver crescent moon instead). Never let an OpenAI reel's cover read
  as Claude.
- **Expired deadlines do not travel.** BLUEPRINT, CLONE, MINT, CREW and VAULT all originally opened on
  a free-window countdown that died 2026-07-12. Every cover leads with the evergreen payoff, and
  clocks were banned outright in the fan-out contract.
- **If a stranger cannot name the SUBJECT from the headline alone, the hook is a riddle.** POWERS
  shipped as "NOT AUTOCOMPLETE. / 6 POWERS" and Alex's reaction was literally *"what is this one
  for?"*
- **A cover can be geometrically perfect and be about the wrong video.** The POWERS cover was built
  from a memory note describing a carousel, not from reel 47 itself. Every check passed. The content
  was fiction. When a reel has no factory log, extract frames from the mp4 before designing.
- **Numbers drawn on a cover are not measured numbers.** The set-1 card stat blocks (MEMORY 100 /
  TOOLS 96 / TEAM 92, RAMSAY's EGO 0) are game fiction. Defensible on an obviously-fictional Pokedex
  panel, and the same class of thing that got the RECEIPTS carousel format blocked. No check will stop
  you letting one drift onto a surface that reads as a receipt.

Check the factory log before building, not after.

---

**Keywords:** reel grid cover verification, cover QA, verify_cover.py, numpy PNG check, header slot
438 447 665, giant margin 110px scan, giantSize optical fit, CALLBACK 101, header quiet zone y336 780,
quiet zone max step 40 grain floor 23 geometry 209, PaperGrain false positive, detector calibration
known-good known-bad sample, bottom band white bar CREAM ECE9E2, in-scene void 200px, edge clipping
x24 x1055, 4:5 tile y285 1635, 1:1 safe y420 1500, cropProof, 130px grid tile test, remotion still
empty public-dir, COVER_INDEX.png, stale _FINAL render regression, 20 of 23 covers,
@nocodealex, ReelCovers.tsx SceneCover CardCover Giant
