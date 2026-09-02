# STORYBOARD — REEL 133 BUILD (Stage 6)
> **Logline:** three free open-source AI tools, each one a machine that turns ONE small flat thing
> into a finished product a business will pay for — and the gate at the end of the row that will
> not open until you know how to sell them.
> **Format:** single dark panel · clone `ClaudeJudge132Reel` chassis (→ `HwWorld` kit) verbatim
> **Arc:** QUEST with a planted villain (see STORY-ARCS.md). Three escalating acquisitions, a block,
> a key, an opening.
> **Villain:** `THE TRADE GATE` — the black iron gate at the dark end of the row. RULE: it is
> **planted unremarked in the hook** (S0, far right, unlit, while the shutter goes up), it is never
> mentioned again until S13, it **refuses once** at S13, and it loses **exactly once**, at S14, the
> peak. It is not drawn ugly — it is good ironwork; what is wrong with it is that it is SHUT.
> **Hero cast:** one hero Claude (`constr` in the row and the works, `suit` at the counters,
> `glasses` in the booth, `prof` at the gate), plus small crews of 3-6 in the marketplace and the
> dock. All twelve costume levers cycled via `costumeFor(i)`.
> ⛔ **NUMBER SPINE** (exact, in order, and nothing else is a numeral in this reel):
> `3` · `$0 FREE` · `5 MIN` · `★119,300 MIT` · `1 WORD` · `★61,400 MIT` · `1 MIN` · `★14,700` ·
> `1 PHOTO` · `BUILD`
> ⛔ **HERO ARTIFACT:** **THE GUIDE.** It is the only object that opens the gate, it is what the CTA
> literally promises, and it does not appear anywhere before S14.

---

## THE ELEMENT → MEANING TABLE (the theme gate, `reel-theme-must-map-to-mechanic`)

Every row fills in. No row reads "it just looks cool".

| on screen | what it actually is |
|---|---|
| the shuttered unit on a lit trade row | your own one-person shop |
| the three lit bays behind the shutter | the three free repos |
| the ONE small flat thing fed into each machine (a word tile, a minute of tape, a photo print) | that tool's input, exactly as the VO names it |
| three DIFFERENT machines, three trades, three lights | three different repos — never one machine three times |
| the finished good leaving each machine | the deliverable you actually sell |
| the trade counter, the stalls, the dock | Fiverr and Upwork (both spoken, both real marks) and the businesses |
| the provenance strip bolted to each machine (★ count · MIT · GitHub) | the receipts — these are real public repos |
| the black gate at the end of the row | knowing how to build, market and sell them |
| the guide struck with three plates and slotted into the hasp | the lead magnet, which is the CTA |

---

## THE HONESTY LEDGER (lives in `BuildWorld.tsx` as `R`, and nowhere else)

Checked live 2026-09-01 against each repository's own page.

| drawn | value | source |
|---|---|---|
| MoneyPrinterTurbo stars / licence | `★119,300` · `MIT` | github.com/harry0703/MoneyPrinterTurbo |
| GPT-SoVITS stars / licence | `★61,400` · `MIT` | github.com/RVC-Boss/GPT-SoVITS |
| Hunyuan3D stars | `★14,700` | github.com/Tencent-Hunyuan/Hunyuan3D-2 |
| `5 MIN` | spoken | "they take just five minutes to set up" |
| `1 MIN` | spoken | "one minute of your voice is enough to clone it" |
| `$0 FREE` | spoken + true | "three free Claude plugins"; all three are open source |

⛔ **GUARDS — a grep over `Build*.tsx` must return zero rendered hits.**
- `EARN_BANNED` = `$/mo`, `PER GIG`, `REVENUE`, `PROFIT`, `INCOME`, `K/MONTH`, `A MONTH`.
  **Alex never says a single figure about money.** No price, no rate, no earnings, anywhere.
  Every sale is dramatised as a DOCKET being stamped `SOLD`, never as a number.
- `CLAIM_BANNED` = `GUARANTEED`, `UNLIMITED`, `BEST`, `#1`, `PASSIVE`, `EASY`.
- `NAME_BANNED` = every company the VO does not name. Only **Claude**, **Fiverr**, **Upwork** are
  spoken, so only those three marks appear. The "ecom brands" at S12 are anonymous shop silhouettes
  — naming a real retailer would be an invented endorsement.
- ⛔ The three tools are **repos the shop runs**, not Anthropic products. The Claude mark is on the
  SHOP (the operator), never on a machine's own name strip. Each machine carries its own
  GitHub + MIT provenance strip instead.

---

## THE THREE FLOORS (§2 of the spec)

1. **Every scene is a real place.** 16 named `PLACES`, each with back wall, two floor stops, a lip,
   a keyed light and a horizon; ≥4 depth planes via `Room` + `Jamb` + `Overhead` + `Edge`.
2. **The camera is disciplined.** Every scene is LOCKED. The reel has exactly **three re-framings**
   (S3, S8, S11) and all three are hard CUTS that reveal something a continuous take cannot.
3. **The arc has a shape.** Curve below: no belly sag, peak (S14 = 10) beats the hook (S0 = 9), and
   the villain is undefeated until that peak.

```
S0  S1  S2  S3  S4  S5  S6  S7  S8  S9  S10 S11 S12 S13 S14 S15
 9   6   5   8  7.5  5   8  7.5 6.5  5  8.5  8  7.5  7   10   8
 ▇   ▄   ▃   ▆   ▅   ▃   ▆   ▅   ▄   ▃   ▇   ▆   ▅   ▅   █    ▆
```
The three `5`s are the tool NAME beats — 1.4-1.6s breaths between escalations. Each is still an
EVENT (a different reveal mechanism per tool, below), never a still.

---

## SCENE CARDS

Onsets are read out of `video/src/data/words_133build.json` by matching the beat's opening words.
`L[]` frames = `round(t * 30)`.

---

### S0 — 0.00 to 2.40s (2.40s · 72f) · LOCKED WIDE · **HOOK**
- **VO:** *"You can sell these three free Claude plugins on Fiverr and Upwork."*
- **SET:** `row` — a trade row after dark under one hard sodium lamp. Planes: sodium sky glow /
  the terrace opposite in silhouette / the hero's unit with its corrugated roller shutter / the wet
  kerb / a bollard cropped by the left panel edge. **The gate is planted far right, unlit, unremarked.**
- **CAMERA:** locked. Push 1.00 → 1.055.
- **BLOCKING:** hero centre, both `Forearm`s on the shutter chain. He HAULS — `strain` 0 → 0.92,
  the shutter BOWS across its width, grit falls, the whole unit shakes on each pull. The shutter
  climbs in **overlapping action** (chain leads, curtain follows, the bottom rail swings and rings
  out) — never stepped. Behind it, three bays come into view one at a time and each machine is
  already mid-cycle. A `Runner` of traffic crosses the far end the whole time.
- **FRAME 0:** the shutter is already **22% up** with light spilling under it and one machine's
  flywheel visible through the gap. The subject is in frame, the promise is stated, and what is
  behind it is withheld → this is the anticipation §25 asks for.
- **LIGHT:** one sodium key from top-left; hero is a near-black silhouette against a lit shopfront.
  Target frame-0 panel luma **≥140** — carried by the lit awning board and the sodium wash, **not**
  by the hero, who stays dark (`THE-OPEN` law 1 vs "hierarchy is the SPREAD").
- **PLATE:** the awning board carries the Fiverr and Upwork marks and `$0 · FREE`. It carries the
  frame-0 luma and the claim plate, so **the shutter never has to** (`a gate carried by the wrong
  object deforms that object`).
- **SFX:** `L0+0` sub + engine_idle bed · chain ratchet ×3 ascending on the pulls · shutter roll ·
  bottom-rail ring on the lock-up.
- **TAKEAWAY:** you can open a shop with these, and it is already running.

### S1 — 2.40 to 4.73s (2.33s · 70f) · LOCKED WIDE · **SETUP**
- **VO:** *"And the best part, they take just five minutes to set up."*
- **SET:** `fitout` — inside the bare unit. Cold daylight through the open shutter, three empty
  machine beds with bolt holes, a joist overhead.
- **BLOCKING:** an overhead hoist swings in from the right and **drops three machines into their
  beds one-two-three**, each landing with a squash, a dust ring and a quarter-turn lock. Hero
  slams each lock home. A wall clock's minute hand travels barely a tick across the whole scene —
  the `5 MIN` is a **stencil on the bed rail**, and the clock is what says it (`info in the
  GRAPHIC`).
- **CAMERA:** locked. Arrivals span the **full 70 frames** (f8 / f28 / f48), never bunched.
- **TAKEAWAY:** installing them is nothing.

### S2 — 4.73 to 6.27s (1.54s · 46f) · LOCKED MID · **ESCALATE 1**
- **VO:** *"First, Money Printer Turbo."*
- **SET:** `mill` — the video workshop. Warm amber, a film bench, spools on the wall.
- **REVEAL MECHANISM (unique to this tool):** a **sodium lamp STRIKES on** (two flickers, then
  hard) and the name flips up on a **split-flap** strip, letter by letter.
- **RECEIPTS:** the provenance strip bolted under it — GitHub mark · `★119,300` · `MIT`.
- **TAKEAWAY:** tool one, and it is real and free.

### S3 — 6.27 to 9.90s (3.63s · 109f) · **CUT** to LOCKED CLOSE · **ESCALATE 1**
- **VO:** *"Just type one word or topic and it writes a script, records the voiceover, and edits
  the final video"*
- **SET:** `millc` — the same mill, re-framed close and re-lit ink-green. The cut REVEALS the line
  inside the machine, which the wide cannot show.
- **BLOCKING — beats on the measured word onsets:**
  | t | word | what happens |
  |---|---|---|
  | 6.27 | *"Just type one word"* | hero drops **ONE tile stamped with a single word** into the hopper |
  | 7.32 | *"writes a script"* | a pen carriage races the full width and a **script page ejects** and lands |
  | 8.07 | *"records the voiceover"* | a **mic boom drops** and a waveform is cut into a turning drum |
  | 8.83 | *"edits the final video"* | a **splicer slams**, film runs, and a reel canister fills |
- **BACKGROUND PROCESS:** the line belt runs full width the whole scene — alternating light and
  shadow, feathered, `rate` high (§1's top motion lever, §11's correction applied).
- **TAKEAWAY:** one word in, a finished video out, and you watched every stage.

### S4 — 9.90 to 11.19s (1.29s · 39f) · LOCKED MID · **PAYOFF 1**
- **VO:** *"to sell to businesses."*
- **SET:** `counter1` — the trade counter at the shop front. Cold bright daylight spill.
- **BLOCKING:** hero SLIDES the reel canister across the counter; a buyer's hands take it; a
  `SOLD` docket is **stamped**, and the stamp recoils. Fiverr and Upwork marks are cast into the
  counter face. ⛔ **No money, no number** — the stamp is the whole transaction.
- **TAKEAWAY:** the thing it makes is a thing someone buys.

### S5 — 11.19 to 12.77s (1.58s · 47f) · LOCKED MID · **ESCALATE 2**
- **VO:** *"Second, GPT SoVITS."*
- **SET:** `booth` — the voice shop. Violet, a glass booth, a cutting lathe behind it.
- **REVEAL MECHANISM (different from S2):** an **ON AIR sign glows** and the name is **cut into a
  rotating disc** that swings round to face us — a lathe reveals by turning, not by flipping.
- **RECEIPTS:** GitHub · `★61,400` · `MIT`.

### S6 — 12.77 to 14.23s (1.46s · 44f) · LOCKED CLOSE · **ESCALATE 2**
- **VO:** *"One minute of your voice is enough to clone it,"*
- **SET:** `lathe` — close on the lathe deck. Dark indigo, one hot brass lamp.
- **BLOCKING:** hero lays **ONE short reel of tape** stencilled `1 MIN` on the deck. The cutter
  drops, and **a rank of identical discs stacks out the other side**, accelerating. Both halves of
  the mechanism are drawn: the minute going in, and the many coming out (§10 — a machine that
  consumes and produces nothing is a progress bar). Hero's face reacts as the stack grows.
- **TAKEAWAY:** a minute of you becomes an unlimited supply of you.

### S7 — 14.23 to 16.23s (2.00s · 60f) · LOCKED WIDE · **PAYOFF 2**
- **VO:** *"so sell narration services on Fiverr and Upwork"*
- **SET:** `stalls` — the marketplace end of the row. Bright, green-keyed, two lit stall fronts.
- **BLOCKING:** discs travel out along a **full-width overhead rail** to two stalls carrying the
  real **Fiverr** and **Upwork** marks; each stall's tray fills as they arrive. A crew of four works
  the stalls on four different action loops.
- **TAKEAWAY:** the marketplaces the VO names, with the goods physically arriving at them.

### S8 — 16.23 to 17.71s (1.48s · 44f) · **CUT** to LOCKED CLOSE · **TURN**
- **VO:** *"without recording anything."*
- **SET:** `boothc` — the booth again, re-framed and re-lit teal.
- **BLOCKING:** the mic hangs **dead and unplugged**, its cable coiled on the floor. The hero walks
  OUT and pulls the door shut behind him — and the lathe **keeps cutting on its own** behind the
  glass. The empty stool is the subject.
- ⛔ **AN EMPTY CONTAINER MUST STILL READ:** the stool is a bright bone object against a dark teal
  booth — different in **hue AND value** — because empty is the promise.
- **TAKEAWAY:** nobody is in the room and it is still producing.

### S9 — 17.71 to 19.13s (1.42s · 43f) · LOCKED MID · **ESCALATE 3**
- **VO:** *"Third, Hunyuan 3D."*
- **SET:** `shop3` — the 3D shop. Steel and teal, a scanning rig on a gantry.
- **REVEAL MECHANISM (different again):** a **scan beam sweeps down** a steel plate and the name is
  **burned into it as the beam passes**, trailing sparks. Burned, not flipped, not turned.
- **RECEIPTS:** GitHub · `★14,700`.

### S10 — 19.13 to 20.48s (1.35s · 41f) · LOCKED CLOSE · **ESCALATE 3**
- **VO:** *"It turns one flat photo into a..."*
- **SET:** `rig` — close under the gantry. Dark slate, one hard downlight.
- **BLOCKING — the WEIGHT beat (§ reel 117):** hero slots **ONE FLAT PHOTO PRINT** into the
  carrier. Tongs descend and CLOSE. Chains go taut, **the gantry beam BOWS, and nothing moves for
  six frames** — the refusal is the whole beat. Then it TEARS free with a crack and a shower of
  scale, and rises **while rotating** −26° → 0 so the flat plate turns edge-on and **becomes
  solid**.
- ⭐ **THE REVEAL IS THE ROTATION, NOT THE TRAVEL.** The viewer decodes it at the instant it
  arrives.
- **TAKEAWAY:** flat goes in, something with volume comes out, and it cost the machine something.

### S11 — 20.48 to 22.61s (2.13s · 64f) · **CUT** to LOCKED MID · **ESCALATE 3**
- **VO:** *"real 3D model you can spin, light, and reuse."*
- **SET:** `turn` — the turntable under a three-lamp rig. Bright bone, the brightest body set.
- **BLOCKING — beats on the measured onsets:**
  | t | word | what happens |
  |---|---|---|
  | 21.35 | *"spin"* | hero cranks the table; the model turns a full revolution, shading tracking |
  | 21.81 | *"light"* | three lamps strike in sequence and the model's shading visibly changes |
  | 22.00 | *"reuse"* | it is lifted off and **copies rack up** on the shelf behind |
- **TAKEAWAY:** all three verbs, each depicted, none typeset.

### S12 — 22.61 to 24.71s (2.10s · 63f) · LOCKED WIDE · **PAYOFF 3**
- **VO:** *"So sell this to ecom brands and businesses."*
- **SET:** `dock` — the loading dock. Cold mid blue, roller door up, a van backed in.
- **BLOCKING:** hero loads crates onto a conveyor that runs out through the door; each crate carries
  a product silhouette; a crew of three works the tailgate; a `SOLD` docket stamps on the last one.
  The buyers are **anonymous shop silhouettes** — no real retailer is named.
- **TAKEAWAY:** the third thing sells too, to a different kind of buyer.

### S13 — 24.71 to 26.06s (1.35s · 41f) · LOCKED WIDE · **THE BLOCK**
- **VO:** *"But none of these are useful without the"*
- **SET:** `gate` — the dark end of the row. **The darkest set in the reel.** The black iron trade
  gate, a heavy drop-bar and a hasp. The three shops glow warm behind the hero.
- **BLOCKING:** hero pushes a trolley loaded with all three finished goods **at** the gate. It does
  not open. The trolley bumps, the load rocks, he shoves again and the bar does not move.
- ⛔ **A BARRIER YOU CAN WALK ROUND IS NOT "STOPPED"** — the gate and its piers fill everything past
  their near face, edge to edge, top to bottom.
- **TAKEAWAY:** owning the tools is not the same as being able to sell with them.

### S14 — 26.06 to 28.75s (2.69s · 81f) · LOCKED MID · **PEAK**
- **VO:** *"free guide I made covering how to build, market, and sell these tools."*
- **SET:** `gate` re-lit warm as the guide's lamp comes up — same place, and that is the point:
  the block and its answer share a frame.
- **BLOCKING — beats on the measured onsets:** the hero sets **THE GUIDE** on a stand and a press
  strikes three plates into its cover:
  | t | word | plate |
  |---|---|---|
  | 27.05 | *"build"* | plate 1 struck, sparks, the guide recoils |
  | 27.25 | *"market"* | plate 2, one step brighter |
  | 27.65 | *"sell"* | plate 3, the brightest, and the cover is complete |
  Then he lifts it into the gate's **hasp** — and the drop-bar RISES, the gate splits, and warm
  light floods through onto him. **The villain loses, once, here.**
- ⭐ An ascending run across the three strikes so the repeat reads as PROGRESS, not repetition.
- **TAKEAWAY:** the guide is the key. It is the only thing that opened it.

### S15 — 28.75 to 29.93s (1.18s · 35f) · LOCKED MID · **CTA**
- **VO:** *"Comment BUILD for access."*
- **SET:** `open` — through the open gate, the lit market beyond. Warm.
- **BLOCKING:** the three goods roll through on the trolley; `BUILD` is **struck into the gate's
  face** as a cast keyword plate in its own column, with nothing crossing it. Fiverr and Upwork
  marks lit on the far side.
- ⛔ The CTA graphic gets its **own column** — no sprite, no shadow, nothing across it. Render the
  still and look before delivering.

---

## ADVERSARIAL CRITIC PASS (§3 — run, and recorded)

| check | finding | resolution |
|---|---|---|
| **Swipe points 0-5s** | 0.0-2.4 a shutter is climbing and what is behind it is not yet readable; 2.4-4.7 three machines drop into beds; 4.7 first tool named. No second re-states the one before it. | pass |
| **Repeated base object** | ⚠️ **the shutter (S0) and the gate (S13/14) are both "a barrier that lifts".** | KEPT as a deliberate rhyme — the shop opens in one pull, the gate does not open at all — but they must not read as one prop: corrugated roller / warm sodium / rolls UP vs iron bar-and-hasp / near-black / swings APART. Different material, mechanism, colour, and 24s apart. |
| **Repeated base object 2** | ⚠️ **S2, S5 and S9 are all "a tool gets named"** — the exact `one-prop-five-scenes` shape. | Each gets a **different reveal mechanism and material**: split-flap under a striking sodium lamp / a name cut into a turning lathe disc / a name burned into steel by a scan beam. |
| **Repeated base object 3** | ⚠️ S4, S7 and S12 are all "it sells". | Three different buyers, places and mechanisms: a counter hand-off · an overhead rail to two stalls · a conveyor into a van. |
| **Payoff spent early** | The guide appears **only** at S14. | pass |
| **Villain integrity** | Planted S0 (unlit, far right), silent until S13, refuses once at S13, loses once at S14. Loses **zero** times before the peak. | pass |
| **Intensity curve** | `9 6 5 8 7.5 5 8 7.5 6.5 5 8.5 8 7.5 7 10 8` — no sag below 5, and every 5 is a 1.4-1.6s named-reveal breath. Peak 10 > hook 9. | pass |
| **§3 container test** (VO line beside each shot, "what does the picture ADD?") | Ran on all 16. The one that failed first draft was S1 — "five minutes to set up" drawn as a clock alone is a **number typeset at a value**. | Rebuilt as three machines being craned into beds and locked, with the clock as a background instrument and `5 MIN` as a bed-rail stencil. |
| **§2 event test** (before / trigger / travel / arrival that costs) | All 16 name all four. | pass |
| **Mute test** ("if you muted the copy, what is happening?") | S0 a man opens a shop · S3 a word becomes a film · S6 one tape becomes a hundred · S10 a flat picture is torn into a solid · S13 he cannot get out · S14 a key is made and the gate opens. | pass |
| **Proportion** | Every hand prop < 40% of the body beside it; no object over 85% of panel width except the gate at S13, which is a WALL and is supposed to be. | pass |
| **Silhouette value** | Named per scene: hero dark on lit ground in `row`/`stalls`/`turn`/`open`; hero lit against dark ground in `millc`/`lathe`/`rig`/`gate`. | pass |

---

## GATES THIS BOARD IS BUILT AGAINST

`motion median ≥ 9.00`, weakest scene reported by name · `0 scenes under bar` target ·
`HOOK_LUMA ≥ 140` frame 0 only · `BODY_SAT ≥ 34%` · `BODY_BLACK p10 ≤ 35` ·
`verify_reel 8/8` · `sfx 1.0-1.5 cues/sec`, density PEAKED on S0/S3/S14 · `dHash mean ≥ 14 MIN ≥ 10`
across the three trial cuts · no shot under 0.7s (shortest is S4 at 1.29s) · zero `boxShadow: 0 0`.

⚠️ **LENGTH: 29.93s** — 0.9s over the 22-29s house range, flagged not trimmed. The script is 127
words and no line is redundant. See the factory log for the VO arithmetic.

---

# ⭐⭐⭐ REVISION 2 — REAL MARKS, ELEVEN SCENES, ONE OBJECT EACH

**Alex on rev 1:** *"use real logos and graphics wherever possible, right now it's just random
scenes, not hierarchical enough nor interesting, I can't even tell what's going on in each scene,
it's way too odd and confusing."*

Three complaints, three causes, and none of them was a polish problem:

| the note | the cause | the fix |
|---|---|---|
| *"just random scenes"* | **16 places in 30s = 1.9s each.** Nothing had time to land, and the reel read as a slideshow of rooms. | **ELEVEN scenes.** Each tool owns ONE place for ~5s — long enough to state a name, show the thing, and show what comes out. |
| *"not hierarchical enough"* | every scene ran a machine **and** a crew **and** a travelling band **and** props, all competing for the same frame. | **ONE dominant object per scene**, at 40-55% of the panel, with nothing else above knee height. The crews come out of the tool scenes entirely. |
| *"I can't even tell what's going on"* | ⛔ the tools were drawn as **METAPHORS** — a film mill, a cutting lathe, a scan gantry — and **a metaphor has to be DECODED**, which 1.5s does not allow. | each tool now **OPENS ON ITS REAL GITHUB PLATE** and then shows the **literal output**. |

⛔⛔ **THE RULE I QUOTED IN MY OWN FILE AND THEN BROKE.** `BuildProps.tsx` carries reel 115's
finding verbatim — *at half a second on a phone a viewer RECOGNISES A MARK; they do not decode a
silhouette* — and I reasoned my way around it: "none of these repos has a brand mark, so draw
machines." **The mark that mattered was GitHub the whole time**, plus the star counts already
sitting in the honesty ledger.

## THE MARK TABLE — every one sourced, none an endorsement

| mark | where it appears | the source that licenses it |
|---|---|---|
| **GitHub** | the hero plate of all three tool scenes, at 84px | all three ARE public GitHub repos; the star counts are theirs |
| **Hugging Face** | beside the GPT-SoVITS and Hunyuan3D plates | `tencent/Hunyuan3D-2` is hosted there — 99,849 downloads last month |
| **TikTok · Instagram · YouTube** | hung over the bench in TOOL 1, on their spoken beat | MoneyPrinterTurbo's OWN README: *"automatic uploads to TikTok, Instagram and YouTube Shorts"* |
| **Docker** | on the bench in the fit-out | its README's documented deploy method (`docker-compose.release.yml`) |
| **Shopify** | the product page in the ecom sale | Shopify's own docs: *"Product media can include images, 3D models, and videos"* |
| **Fiverr · Upwork** | the awning, the counter, the narration beat | spoken in the VO, twice each |

⛔ **Nothing is drawn as a rival, a replacement or an endorsement.** Every mark is either the
tool's own home or a destination its own documentation names. No retailer is put on a buyer, no
competitor is put on a loser, and there is still no figure anywhere about money.

## THE ELEVEN SCENES

| # | t0-t1 | dur | the ONE object | what happens |
|---|---|---|---|---|
| S0 | 0.00-2.40 | 72f | the roller shutter | he hauls it up on three machines already running |
| S1 | 2.40-4.73 | 70f | three **repo plates** | craned in and bolted to the wall one-two-three, Docker on the bench |
| S2 | 4.73-9.90 | 155f | the **MoneyPrinterTurbo plate**, then the **vertical short** | plate lands · CUT · one topic in, and the short builds on *script* / *voiceover* / *final cut*, then TikTok + Instagram + YouTube light over the bench |
| S3 | 9.90-11.19 | 39f | the finished short | slid across the counter, docket stamped SOLD |
| S4 | 11.19-16.23 | 151f | the **GPT-SoVITS plate**, then the **waveform** | plate + Hugging Face · CUT · one minute of real waveform in, five speakers out, Fiverr and Upwork on their spoken word |
| S5 | 16.23-17.71 | 44f | the empty stool | he walks out, the machine keeps cutting |
| S6 | 17.71-22.61 | 147f | the **Hunyuan3D plate**, then the **mesh** | plate + Hugging Face · CUT · one flat photo drops in and becomes a wireframe mesh with vertex dots; three lamps strike; copies rack up |
| S7 | 22.61-24.71 | 63f | a **Shopify product page** | the model turning in the page's own 3D viewer |
| S8 | 24.71-26.06 | 41f | the iron gate | the loaded trolley hits it twice and it does not move |
| S9 | 26.06-28.75 | 81f | **the guide** | three plates struck on *build* / *market* / *sell*, then the bar lifts |
| S10 | 28.75-29.93 | 35f | the **BUILD** keyword plate | the goods go through the gate he just opened |

## THE TWO PROPS THAT HAD TO BE REDRAWN TO READ

- ⛔ **The mesh was a pale glass box.** A wireframe at 0.32 alpha over a face at `mxh(TEAL,0.12)`
  is two near-identical values — the greyscale audit sees what a viewer sees, which is nothing.
  Face went DARK, wires went bright cyan at 0.78, and **vertex dots** went on the intersections.
  ⭐ The dots are the fastest "this is a 3D model" cue there is, because that is what a mesh
  viewer actually draws.
- ⛔ **The short was a field of colour bands.** A viewer identifies a short-form video by three
  things and none of them is a band: a **vertical device frame** (now with a notch), **burned-in
  captions**, and a **scrub bar**. The content inside is a legible little scene that CUTS every
  14 frames, which is what a short looks like at a glance.

## THE FOUR BUGS THE FIRST REBUILD RENDER EXPOSED

1. ⛔ **The plate was sitting on the hero.** A 560x224 plate centred at y410 covers panel
   y298-522, and a 232px hero at `GY=706` has his head at y474 — **80% of every hero was behind
   the hero object.** Plate moved up and left, hero out to the right at size 300.
2. ⛔ **The Hugging Face mark landed on the sprite's chest** at y540, reading as a badge. It sits
   beside the plate now. (`feedback_face_is_a_performance_surface`, one body part down.)
3. ⛔ **The Shopify page was invisible** — its wrapper was `position:absolute` with **no
   `zIndex`**, which is the documented trap in this world file's own header.
4. ⛔ **`shopify.svg` ships `fill="#ffffff"`** — white on the house's white mark tile. Set to
   Shopify's real brand green `#7AB55C`. Every other mark in the reel was already correctly
   filled; this was the only one.

---

## REVISION 6 — THE PRICE TAG (the hook, rebuilt for "too cluttered")

> *"hook scene seems too cluttered and not straightfowrad enoguh ehre"* — Alex, rev 5

### The count that made the note objective

The defect was never object COUNT, it was REPEATS. On the shipped payoff frame:

| idea | said how many times | where |
|---|---|---|
| free / $0 | **4** | header pill · band chip · `$0 · FREE` plate · FREE stencilled on the crates |
| Fiverr / Upwork | **3** | header pill · band chip · two shipping labels |

The band chip read `3 FREE TOOLS · FIVERR + UPWORK` directly beneath a header
reading `3 FREE AI TOOLS / SELL THEM ON FIVERR`. A near-verbatim duplicate,
stacked. Five boxes of type and none of them was the hero.

### And it failed the mute test

`feedback_illustrate_the_sentence_not_the_set`: the VO verb is **SELL**. The
image was a Claude dragging a pallet in — that is DELIVERY. Nothing in frame
showed an exchange, a price, or a buyer.

### The rebuild

**ONE object: a price tag.** It is the object of selling, and its two faces
carry the entire sentence — `$0` on the front, the marketplaces on the back.

| f | word | what happens |
|---|---|---|
| 0 | *"You can sell…"* | an EMPTY, bright, cool shop front. Frame-0 luma **151.1** (bar 140) |
| 6 | | the tag's tip enters the top of frame |
| 0-20 | *"…these three free"* | a 570px near-black tag swings down on a real chain |
| 20 | | it lands; damped swing `sin((f-20)·0.36)·e^(-(f-20)/30)·12` |
| 26 | *"Claude"* | **`$0`** stamps onto the face — the only type in frame that is not the header |
| 40 | *"on"* | the card begins its TURN (drawn, front clamped ≥0.46, never edge-on) |
| 48 | *"Fiverr"* | the reverse lands: the real fiverr mark in its own green on the black card |
| 53 | *"Upwork"* | a rule draws and the Upwork mark lands under it — **same card** |

### What was removed
`$0 · FREE` plate · the S0 band chip · both shipping labels · the FreeLoad pallet,
its three crates, three dials and the tow strap. Two ideas now, not five.

### Value structure — `feedback_eyecatch_is_value_structure`
New place `front`: pale COOL slate-blue ground (`#6E86AE` → `#FDFBF4`), a
near-black mass that **ARRIVES** rather than sitting in frame 0, and one hot
accent (the brand greens, plus the Claude's own coral). The hook shipped on
`row` — warm sodium purple over cream over gold — the exact warm-on-warm mush
the memory names.

⛔ Both card faces stay near-black. The first build made the reverse Fiverr
green and put `si_fiverr.svg` on it — which ships `fill="#1DBF73"`, the identical
green, so the mark rendered invisible. Same trap as `shopify.svg` on a white tile.

⛔ Both marketplaces ride on ONE card. Hung as a second tag, Upwork clipped to
the word "up": a 570px card on a 1012px panel leaves 113px of room.
