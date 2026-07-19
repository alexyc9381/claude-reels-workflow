# 01 - THE HARD SPEC

**What this is:** the non-negotiable geometry of the @nocodealex reel grid cover system. Canvas size, the two crop bands, the IG feed overlay zones, the LOCKED header slot, the header quiet zone, the optical-fit rule for the giant word, the palette, the fonts, and the safe-area rules for full-bleed bands. **When to read it:** before you author or edit any cover scene, and again before you ship one. Everything here is a number you can check with a script. If a rule below is broken, the cover is wrong even if it looks fine on your monitor, because the failure mode is almost always visible only in the 4:5 crop or at 130px.

One clarification that has caused real confusion: **this system builds COVERS, not carousels.** A cover is the single still image that represents a finished REEL in the profile grid. The client sometimes says "carousel" or "cover slide" when he means this. Carousels are a separate system with a separate design language (multi-slide, swipe pill, progress dots). ⛔ A reel cover must never carry a swipe pill or progress dots. Those are carousel affordances and they are a lie on a reel tile. ⛔ **Before building anything, ASK WHICH SURFACE.** "Carousel cover slide" and "reel grid cover" are different jobs with different crop math, and on this project's first day the wrong one was nearly built off an ambiguous request.

## What "shipped" counts as

**23 covers were built. 23 of them are SCENE covers** (the `SceneCover` chassis, the locked header slot, full-bleed bespoke art) **and 2 are CardCover-era covers** (OS and RAMSAY in `ReelCovers2.tsx`, which clone the older collectible-card chassis verbatim and do NOT use the locked slot). Every rule in this document describes the 23 scene covers. When another doc in this handbook says "23 covers", it means the scene covers; when it says 25, it means everything built. Both numbers are correct and they are not the same number.

⚠️ **The on-disk render set is smaller than the built set.** Only **20** files follow the `<KEYWORD>_cover.png` convention (the 7 in `ReelCovers3.tsx` plus the 13 in `ReelCovers4.tsx`). The three set-1 covers are on disk as `51_SKILLS_cover_FINAL.png`, `52_BALL_coverA_FINAL.png` and `HERMES_cover_FINAL.png`, and **those three PNGs are stale CardCover-era renders, not the SceneCover rebuilds.** Measured: their ink runs to y799 and BALL's slot starts at y503 with a 4px right margin. The SceneCover rebuilds exist as `v3_Cover52A.png`, `v5_Cover51.png` and `v5_CoverHermes.png` and those measure clean. **The regression set is the 20 `*_cover.png` files.** Re-rendering the three set-1 comps to their canonical filenames is outstanding work, not a spec question.

---

## 1. Canvas and crop math

The cover is uploaded at 9:16 and is almost never SEEN at 9:16. Instagram crops it, and you do not choose which crop.

| Thing | Size | y range | x range |
|---|---|---|---|
| Uploaded canvas | 1080 x 1920 | 0..1919 | 0..1079 |
| 4:5 profile-grid tile (what the grid shows today) | 1080 x 1350 | **285..1635** | full width |
| 1:1 legacy square crop | 1080 x 1080 | **420..1500** | full width |
| Top bleed band (never load-bearing) | 1080 x 285 | 0..284 | full width |
| Bottom bleed band (never load-bearing) | 1080 x 285 | 1635..1919 | full width |

Derivation, so a future reader can re-derive rather than trust: `(1920 - 1350) / 2 = 285`, so the 4:5 tile is y285..y1635. `(1920 - 1080) / 2 = 420`, so the 1:1 crop is y420..y1500. Both crops are horizontally full-bleed; only the vertical is cut.

**THE RULE: every load-bearing element lives inside the 1:1 band y420..y1500.** The 285px bands top and bottom are bleed and atmosphere ONLY. Obey that and the tile survives whichever crop Instagram applies. Constants in code:

```ts
const SAFE_TOP = 420;   // 1:1 crop top
const SAFE_BOT = 1500;  // 1:1 crop bottom
```
(`/Users/alexchensmacmini/Downloads/matchtern-longform/video/src/ReelCovers.tsx`)

### What bleeds and what does not

- **Bleeds (allowed, encouraged):** sky gradients, floor bands, walls, glow, dust, grain. These should run edge to edge and past the frame so no crop reveals a seam.
- **Does NOT bleed (must stay inside 420..1500):** the headline block, the giant word, the hero object, any figure's head AND feet, any legible string, any element that encodes a count.

### The failure that produced the "feet" rule

POWERS placed watching Claude figures with feet at y1706. **Feet below y1635 are cut by the 4:5 tile crop**, so the figures were sliced by the frame. The visible floor inside the 4:5 tile is only y1500..1635 (135px), so any figure standing on the far floor band must be small enough to fit that strip, roughly **110px tall, not 150px**.

### CROP is not the only thing that eats a cover: the IG FEED overlay

Crop bands are what Instagram *cuts*. There is a second, separate loss: what Instagram *draws on top*. This bit a reel (FABLE, 22) before the cover system existed and the house rule came from there, so it is easy to forget it applies to covers too.

In the **Reels feed** (not the profile grid), IG overlays its own chrome:

| Overlay | Region | What sits there |
|---|---|---|
| Status bar + Reels/Friends tabs | top ~250px (y0..250) | eats anything top-aligned |
| Caption, username, audio strip | bottom ~340px (y1580..1920) | eats bottom copy |
| Like / comment / share rail | right ~120px (x > 956) | eats right-edge content |

For a grid cover this mostly overlaps the bleed bands you already keep clear, so obeying y420..1500 handles the top and bottom. **The one that is NOT covered by the crop rule is the right rail at x > 956.** A cover whose hero or legible string runs to the right frame edge survives the grid and is obstructed in the feed. Keep meaningful content out of `x > 956`. See `[[reel-ig-feed-safezone]]` for the reel-side version of this rule and the FABLE fix that produced it.

### Verify programmatically, not by eye

⚠️ **Read the caveat before you use this scan.** A numpy content-row scan beat guessing on the CardCover-era covers, where the page is cream and the card is the only dark object:

```python
import numpy as np
from PIL import Image
img = Image.open("OUT.png")
dark = (np.array(img.convert("RGB")).astype(int).sum(axis=2) < 330)
rows = np.where(dark.any(axis=1))[0]
print(rows.min(), rows.max())
```

⛔ **This scan does NOT generalise to the full-bleed scene covers, and believing it does will waste a day.** Measured across the 20 shipped scene covers, `rows.max()` is **1919 on 19 of them** (POWERS is the lone exception at 1563), because a full-bleed dark floor band is legitimately below the `sum < 330` threshold and runs to the frame edge by design. That is the rule working, not the rule breaking. Use this scan only on cream/card covers (set 1 verified at 444..1488), or restrict it to the header band, or exclude declared full-bleed bands from the mask. For the scene covers, the checks that actually hold are the header-slot, margin and quiet-zone checks below, all of which are implemented in `tools/verify_cover.py`.

⛔ **A rotated card is BIGGER than its box.** A 610px-wide card at -2.2 degrees adds about 12px vertically on each side. The first BALL pass computed bottom = 1495, "inside 1500", and still clipped the 1:1 crop. Rotation means you measure the RENDER, not the CSS box.

### The crop proof

`cropProof(Comp)` in `ReelCovers.tsx` wraps any cover and overlays both crop rectangles: a cyan dashed box at top 285 height 1350 labelled `4:5 GRID TILE`, and a magenta dashed box at top 420 height 1080 labelled `1:1 SAFE`. ⛔ Proof comps are REVIEW ONLY and are never delivered. Registered examples: `Cover52AProof`, `Cover52BProof`, `Cover65AProof`, `Cover65BProof`.

---

## 2. The LOCKED header slot

```tsx
<Giant top={434} size={78}  c={c1}>{line1}</Giant>
<Giant top={514} size={giantSize /* SceneCover default 158 */} c={c2}>{giant}</Giant>
```

- `line1`: Fraunces 900, **top 434, size 78**
- `giant`: Fraunces 900, **top 514, size 158** as passed by `SceneCover`
- Both are centred full-width blocks (`left: 0, right: 0, textAlign: "center"`), `letterSpacing: -0.035em`, `lineHeight: 1.0`.
- Type occupies 434..672; the hero zone below it is 850..1400.

⚠️ **`Giant`'s own default is `size = 150`, not 158** (`ReelCovers.tsx:54`). 158 is the default of `SceneCover`'s `giantSize` prop (`ReelCovers.tsx:299`), which is what every scene cover actually goes through. So "158" is right about the output and wrong about the component. If you ever render a bare `<Giant>` without a size you get 150 and the slot is wrong.

### What the consistency guarantee actually is, measured

The guarantee is the **top** of the slot, not the bottom. Measured on all 20 shipped scene covers (dark-row scan restricted to y420..800):

- **First ink row: 440..445.** Most covers read 444; DESIGN and BLUEPRINT read 440, ATTACK reads 445. The 1-2px spread is glyph ascender variation, not drift.
- **Last ink row: 501..652.** This one varies a lot and it is supposed to: CALLBACK 501, POWERS 604, OS 627, BLUEPRINT 628, SOL 634, and the full-size giants 638..652. A smaller `giantSize` produces a shorter block. **A single "444..652" figure is wrong and unpassable as a check.**
- **Nothing past y665 ever.** Past 665 means the giant wrapped to two lines.

`tools/verify_cover.py` encodes exactly this: `SLOT_TOP_MIN, SLOT_TOP_MAX = 438, 447` and `SLOT_BOT_MAX = 665`. **Check against those, not against a prose number.**

### Why it is locked, and why it is defined exactly once

Alex complained about header consistency **twice**. The first complaint was about visibility ("the header text and stuff should be more visible"), the second was placement: **"the header text needs to be in the same spot for each post as well."**

The structural fix was not to re-measure each cover, it was to make drift impossible: **one shared `SceneCover` component owns the slot, and it is IMPORTED, never duplicated.** There are four cover source files:

| File | Exports / scenes | What it imports from `ReelCovers.tsx` |
|---|---|---|
| `.../src/ReelCovers.tsx` | defines `SceneCover`, `Giant`, `CardCover`, `cropProof`; scenes 52 BALL, 51 SKILLS, HERMES | (is the source) |
| `.../src/ReelCovers2.tsx` | 2 covers: OS, RAMSAY | `{ CardCover, cropProof }` |
| `.../src/ReelCovers3.tsx` | 7 scenes: OS, TAKES, CAROUSEL, DESIGN, CALLBACK, PURGE, PLUGINS | `{ SceneCover, cropProof }` |
| `.../src/ReelCovers4.tsx` | 13 scenes: POWERS, EVOLVE, STACK, ARENA, VAULT, MINT, CREW, BLUEPRINT, CLONE, WORTHY, ATTACK, FACTORY, SOL | `{ SceneCover, cropProof }` |

Two corrections a reader will otherwise get wrong:

- **`ReelCovers2.tsx` does NOT import `SceneCover`.** It imports `CardCover`, because OS and RAMSAY clone the older collectible-card chassis verbatim. They are the 2 non-scene covers. They do not use the locked slot and the slot checks do not apply to them.
- **`Giant` is exported but never imported by any file.** Only `SceneCover` and `cropProof` cross file boundaries. `Giant` is an internal of `ReelCovers.tsx`. Scenes never place headline type themselves; they pass `line1` and `giant` to `SceneCover` and it owns the geometry.

Files 2, 3 and 4 exist as separate files only because `ReelCovers.tsx` had a live concurrent editor and staying additive was the safe play. There is exactly ONE definition of the header slot across all 23 scene covers. Duplicating the chassis is how a slot drifts, and a drifted slot is exactly the thing the client noticed.

### Corollary rules for the header

- ⛔ **A small muted eyebrow does no work on a grid tile.** The original 37px grey Inter eyebrow was invisible at 130px. "More visible" meant promoting the eyebrow into the headline, not nudging its size. Both lines are now full-weight Fraunces 900. The `Eyebrow` component still exists but is not part of the shipping header.
- The clay accent (`#D2724E`) goes on the entice word (FREE, REAL, ACTUALLY, OWN, YOUR) or on the giant's numeral. It is applied with an inline `<span style={{ color: CLAY }}>`, inside the same locked `<Giant>`, so it never changes geometry.
- The header always gets its own ground: `SceneCover` paints a radial scrim at `left: -40, right: -40, top: 336, height: 420` (so exactly the quiet zone), default `rgba(250,244,234,0.90)` fading to 0 at 76%. This buys contrast on busy art without flattening it. On the sunburst cover the rays were also dropped from 0.20 to 0.13 opacity.
- ⛔ **No stamps, props or badges across the headline.** A `NOT RELEASED` stamp rotated over `FABLE 6` destroyed both. Stamps get their own band underneath.
- **When the header and another good thing conflict, the explicit ask wins.** Making the header taller cost the card its height (h820 down to h768). That was accepted without debate because a taller, more visible header was the thing the client had actually asked for. Record which requirement was explicitly requested; it is the tiebreaker.

---

## 3. The HEADER QUIET ZONE, y336..y780

```ts
const HEADER_QUIET = 780;
```

⛔ **RULE: every scene keeps y < 780 structurally EMPTY.** Sky, gradient and soft glow only. No columns, no blocks, no props, no hard edges, no silhouettes. Atmosphere is fine; geometry is not. The band is y336..y780 (the scrim's own extent: top 336, height 420).

### The full story of why this exists

This rule is counter-intuitive and gets ignored unless you know how it was found. Alex said the header was not in the same spot on every post. **It already was.** The measured first ink row was 444 on all three covers in the set, identical to the pixel.

What differed was what sat BEHIND the type. HERMES was a one-point-perspective interior, and its near columns rose into the band, so **HERMES' type sat on architecture while BALL and SKILLS sat on clean sky.** Identical coordinates, different perceived position. The eye reads "this one is placed differently" because the local background changed, not because the type moved.

So the fix could not be a placement fix. It had to be a background fix, enforced as scene discipline.

### ⛔⛔ THREE DIFFERENT QUIET-ZONE METRICS EXIST. DO NOT MIX THEIR THRESHOLDS.

This is the single most confusing thing in the handbook and it has already caused a wrong call. Three different functions all measure "is there geometry in the quiet zone", they are on **completely different scales**, and two of them happen to quote the number 40. Know which one you are running:

| Metric | What it computes | Where | Shipped range | Threshold |
|---|---|---|---|---|
| **A. Gutter std** | `std` of the two side gutters (x0..300, x780..1080) over y336..780 | this doc, `03-SCENE-CONTRACT.md` | **36.0 .. 68.0** | flag at **100+** |
| **B. Per-pixel row step** | `max(abs(diff(rows)))` over y336..430 and y665..780, all channels | `tools/verify_cover.py:check_quiet_zone` | **21 .. 24** | `QUIET_MAX_STEP = 40` |
| **C. Row-mean step** | mean each row first, then max abs diff | `04-VERIFICATION.md` §3.3 | **6.1 .. 6.5** | n/a, see below |

Metric C's ~6 readings are what its own printed code produces. Any place that quotes "max step 19..20" alongside metric C's code is quoting metric B's numbers against metric C's function. **Never carry a threshold from one of these to another.** The one you should actually run is **B**, because it is the one that ships in `tools/verify_cover.py` and gates the build.

### Metric A, measured across the shipped set

Reference readings, gutter `std` over y336..780:

| Cover | gutter std | | Cover | gutter std |
|---|---|---|---|---|
| DESIGN | 36.0 | | CAROUSEL | 57.6 |
| CLONE | 47.4 | | SOL | 60.0 |
| CALLBACK | 47.5 | | ARENA / VAULT | 61.2 |
| STACK | 47.6 | | WORTHY | 61.7 |
| SKILLS (set 1) | 47.8 | | PLUGINS | 62.2 |
| BALL (set 1) | 49.0 | | POWERS | 63.5 |
| TAKES | 49.5 | | MINT | 65.3 |
| CREW | 50.1 | | BLUEPRINT | 67.9 |
| ATTACK | 56.3 | | EVOLVE | **68.0** |
| PURGE | 56.9 | | HERMES (rebuilt) | 60.4 |

**The shipped ceiling is 68.0, not 65.** A threshold of "< 65" rejects EVOLVE, BLUEPRINT and MINT, and MINT is one of the covers the client holds up as the polish bar. A cover reading in the 60s is a wide warm sky ramp, not intruding geometry. **Genuine geometry reads 100+.** If you want a metric-A gate at all, set it at 100; anything tighter flags approved work.

### ⛔ CALIBRATE THE DETECTOR AGAINST A KNOWN-GOOD SAMPLE OR IT FLAGS EVERYTHING

Twice during the global audit the quiet-zone detector reported 8/8 FAIL with near-identical numbers, which is the tell that the *metric* is wrong, not the work.

1. First failure: it was measuring the headline itself. Masking the side gutters is not enough on its own because Fraunces 900 at 158px is nearly full-width.
2. Second failure: after excluding the text rows, the floor was about 20 on every cover. That is the `PaperGrain` noise overlay, not geometry.
3. HERMES, verified by eye, set the real floor at about 23 on metric B. That is where `QUIET_MAX_STEP = 40` comes from: roughly 1.7x the grain floor.

⭐ **Uniform failure across every item means suspect the metric.** ⭐ And the corollary the same audit taught: **uniform PASSING with near-identical numbers deserves the same suspicion.** Both times the detector lied, it lied identically across every item; the tell was the uniformity, not the direction.

### Consequence for scene architecture

A one-point-perspective interior is structurally incompatible with this rule, because near columns are tall by construction. HERMES had to be **rebuilt as an exterior with sky on top**. If your concept needs an interior, either push the vanishing point below 780 or reframe it as an exterior.

⭐ Alex confirmed the output stays **1080x1920 composed for the 4:5 tile**, not a 1080x1350 export, and the quiet zone is enforced by scene discipline rather than by drawing a masthead band. There is no band. There is only the rule.

---

## 4. Optical fit: the SLOT is fixed, the SIZE is not

Alex, 2026-07-18: **"the word OVERNIGHT and INTERVIEW, those ones like it's too close to the edges"**.

A fixed 158px font size does NOT give a fixed rendered width. Fraunces 900 at 158px measured across ten covers ran from **538px ("TASTE", DESIGN's giant) to 1012px ("OVERNIGHT")**. At 1012px on a 1080 canvas that is **37px of air on the left and 31px on the right**. Alex caught it by eye; the scan confirmed only two outliers, OVERNIGHT (37/31) and INTERVIEW (58/47), with everything else sitting at 118..275. (The pre-fit OVERNIGHT render survives as `OS_cover_FINAL.png` and still measures 1013 wide at 37/30 if you want to see the failure.)

### The fix

`SceneCover` takes a `giantSize` prop, default 158. Long giants pass a smaller value. **The SLOT (top 434 / top 514) never moves.** That is the actual consistency requirement: same position, optically fitted size. Shrinking every cover to fit the longest word would have cost the short ones their punch.

⛔ **STANDING TARGET: every giant keeps >= 110px side margin (rendered content width <= about 860px).**

⛔ This SUPERSEDES the earlier "cap the giant at 9 characters" rule. Character count is a bad proxy: I is narrow, W is wide. **Measure the rendered width. Do not count letters.** (The old rule was written after 10-char giants like "ONE PROMPT", "FIRST TAKE" and "YOU FORGOT" wrapped to two lines and broke the slot. Wrapping is auto-detected: if text rows run past y665, it wrapped.)

### The measure-then-fit loop (reliable, guessing is not)

1. Render every cover at the default 158.
2. Measure the giant's pixel width in the band `a[520:700]`, threshold `sum < 520` per pixel (this catches CLAY `#D2724E` as well as INK `#1A1813`; a threshold tuned only for INK misses clay accent words).
3. `size = round(158 * 840 / width)`.
4. Apply and re-render.
5. Re-run the margin scan. Guessing from character count was wrong every time.

```python
import numpy as np
from PIL import Image
a = np.array(Image.open("COVER.png").convert("RGB")).astype(int)
band = a[520:700]
cols = np.where((band.sum(axis=2) < 520).any(axis=0))[0]
left, right = int(cols[0]), int(1080 - cols[-1] - 1)
print(cols[-1] - cols[0] + 1, left, right)   # width, left margin, right margin
```

### The non-default giantSize table (source of truth: the .tsx files)

All ten values and line numbers below were re-verified against source.

| Cover | Giant word | giantSize | File |
|---|---|---|---|
| CALLBACK | UNREJECTABLE (12 letters) | **101** | ReelCovers3.tsx:1775 |
| POWERS | SUPERPOWERS (11 letters) | **103** | ReelCovers4.tsx:304 |
| OS | AGENTIC OS | **130** | ReelCovers3.tsx:344 |
| BLUEPRINT | OVERNIGHT | **131** | ReelCovers4.tsx:3971 |
| SOL | A CHATBOT | **137** | ReelCovers4.tsx:6167 |
| ARENA | CHAMPION | **142** | ReelCovers4.tsx:1976 |
| VAULT | JUDGMENT | **142** | ReelCovers4.tsx:2528 |
| PURGE | IDENTITY | **148** | ReelCovers3.tsx:2125 |
| EVOLVE | MISTAKES | **153** | ReelCovers4.tsx:869 |
| MINT | BROWSER | **155** | ReelCovers4.tsx:3120 |
| everything else | | 158 (via `SceneCover`) | |

Note how badly letter count predicts this: JUDGMENT and MISTAKES are both 8 letters and need 142 vs 153.

⚠️ **CALLBACK is 101.** An earlier interim fit used 136 and it appears in old notes. 136 was superseded when Alex retitled the cover to UNREJECTABLE, a 12-letter giant. The shipped value is 101 and the source line above is the arbiter.

### Measured result after fitting (re-run this to regress-test)

Scanned over `out/reel-covers/*_cover.png`, band y520..700, threshold `sum < 520`:

| Cover | giant width | left margin | right margin |
|---|---|---|---|
| EVOLVE | 841 | 121 | 118 |
| BLUEPRINT | 840 | 123 | 117 |
| MINT | 839 | 125 | 116 |
| ARENA | 838 | 124 | 118 |
| CAROUSEL | 838 | 125 | 117 |
| POWERS | 838 | 123 | 119 |
| SOL | 837 | 123 | 120 |
| VAULT | 836 | 125 | 119 |
| CALLBACK | 834 | 126 | 120 |
| CREW | 828 | 129 | 123 |
| OS | 813 | 134 | 133 |
| STACK | 810 | 138 | 132 |
| PURGE | 759 | 166 | 155 |
| ATTACK | 751 | 167 | 162 |
| WORTHY | 736 | 176 | 168 |
| FACTORY | 733 | 177 | 170 |
| PLUGINS | 723 | 182 | 175 |
| TAKES | 671 | 208 | 201 |
| CLONE | 603 | 242 | 235 |
| DESIGN | 538 | 275 | 267 |

Minimum margin across the shipped set is **116px** (MINT, right). The >= 110px target holds on every cover. ⛔ Re-run this scan after ANY copy change, including a retitle that "obviously" got shorter.

---

## 5. Palette

Declared once in `/Users/alexchensmacmini/Downloads/matchtern-longform/video/src/CarouselConcepts.tsx` and imported everywhere. Never hard-code a hex that duplicates one of these.

| Token | Hex | Role |
|---|---|---|
| `CREAM` | `#ECE9E2` | page base, `SceneCover` background |
| `INK` | `#1A1813` | headline default, dark type |
| `CLAY` | `#D2724E` | the accent, one word per headline |
| `GOLD` | `#E7B24C` | highlights, anything in motion |
| `GREEN` | `#3F9E74` | pass / success |
| `SLATE` | `#3A5C84` | cool structural fills |
| `RED` | `#C44A3A` | fail / stamp borders |

Also available and used in scene art: `AMBER #CF9544`, `TERM #0E1626`, `TERM2 #0A1120`, `NAVY #222F4D`, `STAR #EAD9A4`.

**⛔ Light and warm page ALWAYS.** Alex, 2026-07-18: **"i like the light colored background one, not the black background cover images."**

The tradeoff is worth stating in full, because the losing direction was genuinely better at one thing and a future author will rediscover that and be tempted: **dark page plus a bright burst beats cream for raw tile pop. Cream plus card beats dark for GRID COHESION with the cream carousels.** Cohesion won. The grid is a set, not a collection of individual tiles, and a dark cover in a cream grid reads as a mistake no matter how well it pops on its own. Dark covers are dead.

⛔ **Palette trap, found by a fan-out agent: pale trails `rgba(255,224,146, x)` are the SAME VALUE as the cream ground and render invisible.** Anything in motion must be `GOLD #E7B24C` or darker.

⛔ **When an element encodes a COUNT, every instance needs VALUE separation from its ground, not just hue.** In POWERS, gem 5 was `#F2E4B0` on a `#E0AE55` gold plate, so the five gems read as four.

⛔ **Check costume value against background value BEFORE rendering.** Costumes are flat solid colours, so this is checkable without a render. A navy `suit` on a navy ops room made the torso vanish and left a floating head, arms and legs. The generalised law: **the backdrop directly behind the sprite sits at the OPPOSITE end of the value scale from the costume.** Both directions of this bug have shipped: a tan mascot on cream marble (fix: a dark cella aperture behind the light figure) and a navy suit on a navy room (fix: a lit glass partition plus a brighter floor behind the dark figure).

`PaperGrain` (two radial-gradient noise layers at 0.10 and 0.08 alpha, 5px and 7px tiles) goes on last inside `SceneCover`. It is why the metric-B quiet-zone floor is about 23 rather than 0.

⛔ **No emoji, and no low-opacity spill.** A 0.34-alpha `Bloom` with no source object reads as a render smear; five of them made a page look broken. One tight 0.16 rim under the panel does the job.

---

## 6. Fonts

```ts
import { fraunces, inter } from "./fonts";           // @remotion/google-fonts
export const mono = "ui-monospace,'SF Mono',Menlo,monospace";
```

| Role | Family | Weight | Notes |
|---|---|---|---|
| Headline (`line1` and `giant`) | **Fraunces** | **900** | `letterSpacing: -0.035em`, `lineHeight: 1.0` |
| Labels, pills, chips, UI strings | **Inter** | 800 / 900 | pills at 40px, `letterSpacing: 0.03em` |
| Terminal, code, set lines, handle | **mono** (`ui-monospace, 'SF Mono', Menlo, monospace`) | 700 | handle at 30px, `letterSpacing: 0.22em` |

Fraunces is loaded with weights 400/500/600/700/900 and Inter with 400..900 in `.../src/fonts.ts`.

⚠️ **`fonts.ts` is the parent project's font module, not a cover-system file.** It also loads Playfair Display, Montserrat, `frauncesItalic` and `interItalic` for other compositions in `matchtern-longform`. The cover system uses only `fraunces` and `inter` from it. Do not describe it as a minimal two-family dependency; if you vendor it somewhere else, either carry the whole file or trim it deliberately and know you have forked it.

Ink height for Fraunces 900 is taken as **1.25x fontSize** when computing band disjointness (used in the 65A band table: `Fraunces 900 @60 at top 436 gives ink 430..514`).

Handle lockup, when used: `@NOCODEALEX`, mono 700, 30px, `letterSpacing: 0.22em`, colour `#6B675C`.

---

## 7. Safe-area rules for full-width bands

⛔ **After ANY vertical shift, re-assert `height = 1920 - top` on every band meant to reach the frame edge.**

Alex: **"for the clone video for some reason there's a big white bar at the bottom."** The CLONE reframe had shifted every element with `top >= 860` up by 80px. The full-bleed floor bands moved with the shift but **kept their original heights**, so they ended at y1840 and the last 80px rendered as the `SceneCover` base CREAM. Measured exactly: `rgb(103,70,38)` at y1820 jumping to `rgb(236,233,226)` (`#ECE9E2`) at y1840. Three bands were short in CLONE.

Detection is one line: sample a row near the bottom and compare it to the band colour you expect.

```python
import numpy as np
from PIL import Image
a = np.array(Image.open("COVER.png").convert("RGB"))
for y in (1780, 1820, 1860, 1900, 1919):
    print(y, a[y, 540])     # any CREAM #ECE9E2 down here on a full-bleed scene is the bug
```

Related geometry traps in the same family:

- ⛔ **Never tile a floor with two arcs.** Two hills spanning x-120..500 and x620..1240 left a 120px hole at dead centre, exactly where the hero stands, and the sky showing through read as the hero standing on a blue pillar. **Lay a solid band behind the arcs.** This was misdiagnosed twice as a sprite artefact before anyone cropped in to look.
- ⛔ **Any ground-line change means re-seating every prop that sits on it.** Moving a brick line from y1470 to y1420 left only 30px of a pipe rim showing.
- ⛔ **Enlarge sprites about their CENTRE, not their left edge.** Shadows, daises and badges are keyed to centres, so recompute `left = centre - size/2`. In CLONE the wizard went 260 to 315 and had to move left 102 to 74; the three copies went 150 to 184 and moved 595/735/875 to 578/718/858. Changing size alone drifts every sprite off its own shadow.
- ⛔ **When lifting a panel group, shift only elements whose `left` sits in the panel's x-range**, so full-width bands at `left: 0` are untouched. Absolute scene-coordinate elements (flag rows, in ATTACK) must be shifted by the same delta separately.
- ⛔ **A duplicate key in a style literal fails silently.** A style object with two `top` keys kept the last one and put a contact shadow 174px right of its owner. Grep for repeated keys after any hand-edit.

### Framing, measured

Alex on CLONE: **"it isn't properly framed for how it looks on the profile."** Diagnose by scanning content density per 60px band inside the 4:5 crop, where content means pixels differing from the row median. CLONE had a **240px totally empty band at y705..885**, mass piled in the bottom third, and content spanning only about 540px of the 1350px tile.

⛔ **Shifting content up does NOT fix a fill problem, it just moves the void.** The first attempt shifted everything 80px up and the empty band stayed exactly 240px (and produced the white-bar bug above). ⭐ **The real fix is SIZE**: enlarging the figures took the content from y900..1440 to y816..1510.

⛔ **Edge-hugging plus a void is the "looks bad" signature.** ATTACK had the hero at x33, a panel hard against the right edge at x480..990, and a 255px void above both. Fix pattern: pull the hero IN and scale it UP (x33 to x96, size 250 to 300, feet held on the floor line), then lift the panel group.

---

## 8. Render command

⛔ Use this, always. Every `npx remotion still` was copying the project's **845MB** `public/` directory before rendering, at about 90s per still. Covers reference no `staticFile()` assets, so point `--public-dir` at an empty directory:

```bash
cd /Users/alexchensmacmini/Downloads/matchtern-longform/video
mkdir -p /tmp/empty-public
npx remotion still src/index.ts <CompName> /abs/path/out.png \
  --frame=0 --public-dir=/tmp/empty-public
```

**5.5s instead of about 90s**, output verified byte-identical (max pixel diff 0). This is the single biggest tooling win of the cover work.

⚠️ **Where the code lives, stated plainly, because the two locations are easy to confuse.** The system RUNS in `/Users/alexchensmacmini/Downloads/matchtern-longform/video`, which is a private Remotion project outside this handbook. The `.tsx` files under `cover-system/src/` in this repo are **verbatim read-only copies for reference**, vendored so the spec can cite exact line numbers. **Editing the copies renders nothing.** Every render command above runs in the real project. The handbook's copies are missing their sibling modules (`CarouselConcepts.tsx`, `ClaudePokeballReel.tsx`, `Root.tsx`, `index.ts`) and are not independently buildable; see `src/README-src.md` for what is and is not vendored.

`--frame=0` is used because cover compositions are registered with `durationInFrames={2}` (Remotion requires at least 1 frame; a cover is a still, so frame 0 is the whole thing).

---

## 9. Pre-ship geometry checklist

Run all of these on the rendered PNG, not on the code. Items 1 through 6 are implemented in `tools/verify_cover.py`; run that rather than re-deriving them. **There is no `verify_cover.py`** despite what an older draft of `04-VERIFICATION.md` says; writing a second checker is exactly the "duplicating the chassis is how it drifts" failure applied to the verifier.

1. **Header slot top row in 438..447**, and nothing past **y665** (past 665 means the giant wrapped). Do NOT check for a fixed bottom row: the shipped range is 501..652 and it varies with `giantSize` by design.
2. Giant side margins both **>= 110px** (band y520..700, threshold `sum < 520`).
3. Quiet zone, metric B (`verify_cover.py`): max row step **<= 40**; shipped covers read 21..24. If you are running the gutter-std metric instead, flag at 100+, not 65. Never carry a threshold between the two.
4. No CREAM `#ECE9E2` in the bottom rows of a full-bleed scene (`height = 1920 - top` holds).
5. No feet below **y1635**; figures on the far floor band <= about 110px tall.
6. Content density per 60px band inside y800..1635: no empty band wider than about 180px. Scan from y800, not from the tile top, or you measure the deliberate header-to-scene gap that every cover has and false-positive CALLBACK.
7. Nothing meaningful in the **right 120px** (`x > 956`), where the IG feed action rail sits.
8. Content rows inside **420..1500** via the numpy dark-row scan: **set-1 / CardCover covers only.** It does not apply to full-bleed scene covers (see §1) and will report 1919 on 19 of the 20 shipped ones.
9. Downscale the 4:5 crop to **130px** and look at it. If the giant word and one hero silhouette do not survive, the geometry is legal and the cover is still wrong.

Cross-references: the detector implementations and their calibration stories are in **`04-VERIFICATION.md`** (there is no `04-VERIFICATION.md`; `05` is the pipeline). Scene-side rules are in `03-SCENE-CONTRACT.md`.

---

**keywords:** reel grid cover spec, 1080x1920, 4:5 crop 285 1635, 1:1 crop 420 1500, safe area, SAFE_TOP 420, SAFE_BOT 1500, IG feed safe zone top 250 bottom 340 right 120, header slot top 434 514, Giant default 150 SceneCover 158, locked header, slot top 438 447, SLOT_BOT_MAX 665, HEADER_QUIET 780, header quiet zone 336 780, three quiet zone metrics gutter std vs per-pixel step vs row-mean step, QUIET_MAX_STEP 40, gutter std 36 to 68, optical fit giantSize, 110px margin, giant width 538 TASTE 1012 OVERNIGHT, CALLBACK 101 not 136, measure-then-fit 158*840/width, palette CREAM ECE9E2 INK 1A1813 CLAY D2724E GOLD E7B24C GREEN 3F9E74 SLATE 3A5C84 RED C44A3A, cream beats dark for grid cohesion, Fraunces 900 Inter ui-monospace, fonts.ts is the parent project file, height = 1920 - top, white bar at bottom, cropProof, remotion still --public-dir empty, 23 scene covers 25 built, 20 canonical PNGs, nocodealex, SceneCover, CardCover, ReelCovers.tsx ReelCovers2.tsx ReelCovers3.tsx ReelCovers4.tsx, verify_cover.py
