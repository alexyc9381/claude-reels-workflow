# STORYBOARD — REEL 108 MARKETING (Stage 6)

> **Logline:** a solo operator working nights installs seven Claude marketing skills, and each one
> switches on a department that used to cost a retainer — until the whole floor is staffed and the
> campaign launches itself.
> **Format:** single dark panel · clone the reel-107 chassis (`ClaudeClaudeReel.tsx` assembly:
> root-owned `Bg` / `ProgressBar` / one `KaraokeCaption` / `HookHeader` on for all 1434 frames,
> `AssemblyCtx` true, `SfxTrack` in ROOT seconds) · sets built on `WorldKit` (`Surface`,
> `Occluder`, `Cone`, `StreetLamp`, `Contact`)
> **Arc:** UNDERDOG (value-first spine, single-scene villain — the 102-SEO pattern)
> **Villain:** **THE RETAINER** — a chained brass price board over a shuttered agency window,
> ticking upward. Its RULE: *it can only bill what it can gatekeep.* Named by the VO once (S2:
> *"what some softwares charge thousands of dollars for"*), it stays lit and undefeated through
> S3–S6 as a background presence, and is only overrun at S7 when the campaign launches past it.
> **Hero cast:** ONE hero Claude (glasses, the night-shift operator) + a specialist Claude per
> department in its own costume — all 12 `SlopKit.Mascot` levers cycled deterministically via
> `costumeFor(i)`, never random.
>
> ⛔ **NUMBER SPINE** — the exact things that must appear, in order:
> `head-of-content` · `AI SEO` · `brand guidelines` · `HubSpot / Slack / Canva / Klaviyo` ·
> `marketing council` · `Lessie` · `campaign-launcher-oss` · `MARKETING`
> ⛔ **NO NUMERAL is typeset for the plugin's command count** — see the HONESTY LEDGER below.
>
> ⛔ **HERO ARTIFACT:** **THE CAMPAIGN BOARD** — a seven-bay wall rig above the hero's desk. Seven
> bays, dark at frame 0, one igniting per skill with its specialist Claude working inside it. It is
> the number spine made physical and countable, it is what pays off at S7, and it is the only thing
> on screen that is allowed to be a "container" — because filling it *is* the story.

---

## ⛔ HONESTY LEDGER — every claim, checked live 2026-08-17

| # | VO says | live source | verdict |
|---|---|---|---|
| 1 | "head of content skill by Brad Automates" | `bradautomates/head-of-content` ★204 | ✅ exact |
| 2 | "AI SEO skill" | `ai-seo` in `coreyhaines31/marketingskills` ★44,580 (48 skills) | ✅ exact |
| 3 | "brand guidelines… colors, fonts and voice" | `brand-guidelines` skill (multiple pubs incl. Anthropic cookbook) | ✅ exact |
| 4 | "just one install gives you **six** commands" | `anthropics/knowledge-work-plugins` ★23,529 — README table has **SEVEN** | ⛔ **VO UNDERCOUNTS** |
| 4 | "wired straight into HubSpot, Slack, Canva and Klaviyo" | all four are real MCP integrations (of 10) | ✅ exact |
| 5 | "marketing council… board of marketing experts" | `marketing-council`, same repo — Godin / Ogilvy / Schwartz / Dunford / Sutherland / Hormozi / Sharp | ✅ exact |
| 6 | "the Lessie skill… 100 live sources, verifies each email" | lessie.ai — creators + B2B leads, 100+ live sources, verified emails | ✅ exact (VO audio reads "let's see") |
| 7 | "campaign launcher OSS" | `campaign-launcher-oss`, Improvado, in `tekliner/improvado-agentic-frameworks-and-skills` — Google Ads / Meta / Lemlist from one ICP prompt | ✅ exact |
| hook | "10 out of 10 marketing skills" | only SEVEN are listed | reads as a **RATING**, not a count |

**The two rulings this forces, both applying `docs/KICKOFF-PROMPT.md` §1 — *when a VO asserts a
result you cannot source, dramatise the MECHANISM and stop at the edge of the claim*:**

1. **S4 never puts a number on screen.** Not "6", not "7". The hero of S4 is the **four real
   integrations**, which are the vivid half of the line and are all verified. Commands arrive as a
   burst off one cartridge — a rack firing, deliberately not countable. Drawing seven chips under a
   spoken "six" invites the viewer to count and catch it; drawing six would put a false frame on
   screen. Neither happens.
2. **S0 never typesets "10".** The header states the promise in words, not a count the reel does
   not deliver. `HookHeader big="7 CLAUDE MARKETING SKILLS" hot="THAT REPLACE A RETAINER"`.

⚠️ **Prior-work note:** reel **102 SEO** shipped THE NIGHT AUDIT (studio floor, steel page rack, red
flags, `.md` cards, numbered ladder) for `AgriciDaniel/claude-seo`. This reel's S2 is a *different*
repo (`ai-seo` in coreyhaines31) and is boarded as a **vertical exterior shaft**, deliberately
sharing no set primitive, no colour and no camera with 102.

⚠️ **Length:** the cut VO is **47.78s** against a 22–29s house range. Flagged, not silently trimmed —
the VO counts *"Number one … number seven"*, so no item can be dropped without a re-record.

---

## The three floors (STORYBOARD-SPEC §2)

1. **Every scene is a real place.** Nine named locations, each ≥4 depth planes on `WorldKit.Surface`,
   each with ONE committed light direction and a mass cropped by the panel edge in front of the
   action (`Occluder`). Stated per card.
2. **Camera disciplined.** Locked by default. Only **three** scenes carry a motivated move (S2's
   climb, S6's pull-back, S7's tilt to sky); the other six are locked with the house in-panel push
   only. ⛔ `Scene` push is scene-local: keep `left >= 506 − 486/push`.
3. **Arc has a shape, peak beats the hook.** Intensity: `8 · 6 · 7 · 6.5 · 8 · 7 · 8.5 · 10 · 8.5`.
   No belly sag (the S3 6.5 sits between a 7 and an 8 and is the shortest scene). Peak S7 = 10 beats
   hook 8. Villain never loses before S7.

**Density is a SHAPE, not a level** (ANIMATION-QUALITY §9): the peaks are **S4** (the wiring) and
**S7** (the launch). S1/S3/S5 deliberately run thinner so the peaks read as peaks.

---

## SCENE CARDS

Frames are exact, converted from the measured word onsets in
`video/src/data/words_108marketing.json`. **Nothing here is estimated.**

---

### SCENE 0 — 0.00 to 5.63s (f0–169, 5.63s) · LOCKED WIDE, one framing · BEAT: HOOK
**VO:** *"10 out of 10 marketing skills for Claude that everyone needs but they get increasingly more powerful. And this is absolutely insane."*

- **SET:** **THE NIGHT DESK.** A marketing house at 2am. Planes: (1) far window wall, city dark;
  (2) THE CAMPAIGN BOARD — the seven-bay rig, all bays dark, filling the upper third; (3) the hero's
  desk, one warm lamp; (4) foreground — a stack of unopened invoices cropped by the panel edge
  (`Occluder`, left). Light: single warm `Cone` from the desk lamp, everything else cold blue.
- **CAMERA:** LOCKED. One framing for all 169 frames. House push 1.05.
- **BLOCKING — THE EVENT (§2: before / trigger / travel / arrival):**
  - **before (f0–24):** hero Claude alone at the desk, seven bays dark above. Frame 0 is settled and
    populated — the hero is ON it, the board is readable, the lamp is lit.
  - **trigger (f24):** the desk terminal flashes and the first **skill crate** is launched in from
    off-panel right.
  - **travel (f24–60):** it arcs across the full panel width — large, bright, fast, the only thing
    moving, crossing ~700px.
  - **arrival (f60):** it SLAMS into bay 1. Squash, recoil, dust puff, expanding ring, and bay 1
    **ignites** — a specialist Claude is already inside it, working. The hero flinches.
  - **f60–169:** bays 2–7 stay dark and the lit bay 1 throws a hard shadow across them — the promise
    of six more. Hero paces to the board. Background process: the city window's traffic band.
- **LIGHT:** warm key from screen-left, cold blue fill. Body luma target 70–105, sat 34–45%,
  black point p10 ≤35. ⛔ Frame 0 ONLY must clear luma ≥140 — carried by the ignited bay + lamp.
- **SFX:** `sub` @0.00 (low-band weight, frame 0 is a settled poster) · `thock` @0.80 ·
  `impact_deep` + `sub` @2.00 on the slam · `c_powerbig` @2.15 on the ignition.
- **TAKEAWAY:** *seven of these exist, they light up one at a time, and one is already on.*
- **§3 test — what does the picture ADD over the line?** The line says a count and a promise; the
  picture shows the SHAPE of the payoff (a seven-bay rig) and proves one works. Not a container.

> ⛔ **THE-OPEN compliance.** This is ONE locked framing with one real event, which is the *corrected*
> rule (ANIMATION-QUALITY §2 / THE-OPEN's own reel-104 correction) — **not** the superseded
> "≥3 hard cuts" rule. Reel 104 shipped one 2.57s framing and open motion went 9.97 → **12.10 with
> fewer cuts.** Checklist still enforced: frame 0 bright + saturated ✓, subject on frame 0 ✓,
> recognition with no narration (a dark board of empty bays at 2am + unopened invoices) ✓,
> mute-readable header ✓, transient on the event ✓, first-5s motion mean ≥4.0 (measure, don't assert).

---

### SCENE 1 — 5.63 to 10.75s (f169–322, 5.10s) · LOCKED · BEAT: SETUP
**VO:** *"Number one is the head of content skill by Brad Automates. It tracks top creators and turns their patterns into your next content."*

- **SET:** **THE RESEARCH WALL.** Bay 1, entered. Planes: (1) back wall of live creator tiles
  scrolling upward, continuously; (2) a rail of pinned outliers; (3) the specialist's bench;
  (4) foreground stanchion cropped left. Light: cool teal wash + one warm bench `Cone`.
- **CAMERA:** LOCKED. Push 1.06.
- **BLOCKING — THE EVENT:** *before* — a wall of ~40 creator tiles streaming past, all equal.
  *trigger* (f188) — the specialist Claude (fro costume) throws a lever. *travel* — five tiles
  **detach** from the wall and fly across to the bench, each on its own beat, spread across the FULL
  scene (f195/213/231/252/276), never bunched in the first third. *arrival* — each lands with a
  squash + ring and **flips**, revealing a pattern card that stacks into a plan. Background process:
  the wall never stops scrolling.
- **LIGHT:** teal key screen-right. Neighbouring-scene check: S0 warm/dark → S1 teal/mid. Differs in
  **both hue and lightness** ✓
- **SFX:** `thock` on each of the five lands (rate-varied, no sample >3×) · `temper_chime` @9.9 on
  the plan completing. Cut itself is silent — the picture cut carries itself.
- **TAKEAWAY:** *it reads what already works and hands you the next one.*
- **§3 test:** VO's verbs are **tracks** and **turns into**. The picture tracks (a moving wall being
  read) and turns (tiles flipping into a plan). Not three cards with a logo on them.

---

### SCENE 2 — 10.75 to 18.04s (f322–541, 7.30s) · MOTIVATED CLIMB · BEAT: TURN + villain
**VO:** *"Number two is the AI SEO skill. It rewrites your content so AI engines like ChatGPT and Claude can actually rank it. And this is what some softwares charge thousands of dollars for."*

⛔ **The longest scene in the reel at 7.30s — it gets THREE sub-shots.** A single framing held for
7.3s is the 3.23-with-a-60-frame-dead-run failure. Sub-beats are cut on measured word onsets.

- **SET:** **THE RANKINGS SHAFT.** Exterior, night, vertical: a lit ladder of ranked slabs climbing
  out of frame, your slab near the bottom. Planes: (1) night sky + haze; (2) far tower silhouettes;
  (3) the ranked ladder itself; (4) THE RETAINER — the chained brass price board, cropped by the
  panel edge foreground-right, ticking upward. ⛔ Deliberately shares nothing with 102 SEO's
  interior studio floor: exterior, vertical, no rack, no flags, no `.md` cards.
- **CAMERA:** the reel's **one true climb** — a motivated vertical follow as the slab rises. ≤1 move.
- **BLOCKING:**
  - **2a (f322–400):** the reading head — a lit AI engine bar sweeps down your slab and the text
    **re-sets under it**, line by line. Background process: the ladder's other slabs drifting.
  - **2b (f400–478):** hard cut to the ladder wide. Your slab **climbs**, passing four others, each
    pass a hard stepped land (⛔ N discrete pops, never one 78-frame tween — the tween measures
    4.27, the pops 5.63).
  - **2c (f478–541):** hard cut tight to THE RETAINER — the chained board ticking `$4,000/mo`, its
    chain taut, as your slab passes it *unbilled*. **The villain is not defeated here** — it stays
    lit and keeps ticking. It just gets passed.
- **LIGHT:** cold blue-green exterior + one hot amber `StreetLamp` on the villain board. Travelling
  band: the reading head sweep **alternates light AND shadow** (⛔⛔ a light-only wash lifts the black
  point — the reel-106 lesson).
- **SFX:** `ratchet` @11.0 on the reading head · `thock` ×4 rate-varied on the four passes
  (17.0/17.6/18.2 root-relative to the climb) · `impact_deep` @16.4 on the villain reveal.
- **TAKEAWAY:** *it rewrites the page so the AI engines rank it — and that is the thing you were being billed for.*
- **§3 test:** VO's verb is **rewrites** and the claim is **rank**. The picture rewrites (text
  re-setting under a sweep) and ranks (a physical climb past others). The dollar claim is drawn as a
  *toll being passed*, never as a numeral floating in space.

---

### SCENE 3 — 18.04 to 22.30s (f541–669, 4.27s) · LOCKED · BEAT: SETUP (thin by design)
**VO:** *"Number three is the brand guidelines. It applies a full brand system to your business like colors, fonts, and voice."*

- **SET:** **THE PAINT SHOP.** Planes: (1) rear shelf of pigment tins; (2) a swatch fan rack;
  (3) the bench with an unbranded artifact on it; (4) foreground paint rail cropped right.
- **CAMERA:** LOCKED. Push 1.04.
- **BLOCKING — THE EVENT:** *before* — a grey unbranded page on the bench. *trigger* (f560) — the
  specialist (chef costume, apron reads as a painter) slams a swatch fan open. *travel* — three
  swatches **sweep across** the artifact left to right, full-width, high-contrast, alternating light
  and shadow. *arrival* — on each pass the artifact repaints: pass 1 = **colour**, pass 2 = **type**
  (a specimen line re-setting), pass 3 = **voice** (a speech shape settling). Three discrete pops,
  spread f570 / f606 / f642 across the FULL duration.
- **LIGHT:** warm ochre key screen-left, deep shadow right. vs S2's cold blue exterior: differs in
  both hue and lightness ✓
- **SFX:** `stamp_press` ×3 rate-varied on the three passes · `gold_stamp` @21.9 on the final settle.
- **TAKEAWAY:** *one skill repaints the whole thing — colour, type and voice, not just a palette.*
- **§3 test:** the VO names three nouns; the picture performs three visible transformations ON one
  object. ⛔ Not three labelled cards reading "COLORS / FONTS / VOICE" — that is §4's exact failure.

---

### SCENE 4 — 22.30 to 27.66s (f669–830, 5.37s) · LOCKED · BEAT: ESCALATE ⭐ DENSITY PEAK 1
**VO:** *"Number four is the Anthropic marketing plugin. Just one install gives you six commands and it's wired straight into HubSpot, Slack, Canva, and Klaviyo."*

- **SET:** **THE PLUG RACK.** Planes: (1) rear patch wall, dark; (2) the rack with one empty slot;
  (3) four service pillars, unlit, each carrying a **white tile** for a real mark;
  (4) foreground cable loom cropped left.
- **CAMERA:** LOCKED. Push 1.07 (tight — this is a peak).
- **BLOCKING — THE EVENT:** *before* — one empty slot, four dark pillars. *trigger* (f690) — the
  hero seats a **cartridge** two-handed. *travel* — it drives home; four **cables fire out** across
  the full panel width to the four pillars, one after another (f705/f722/f739/f756). *arrival* —
  each pillar **lights** and its tile reads its real mark: **HubSpot** (real Simple Icons mark,
  brand `#FF7A59`), **Slack** (real), **Canva** (real), **Klaviyo** — ⛔ **no mark exists for
  Klaviyo on the CDN, so it gets a clean wordmark chip, never a faked logo.** A wrong mark is worse
  than no mark. Then a **burst of command chips** ejects off the cartridge as a rack firing —
  deliberately not countable, no numeral (see HONESTY LEDGER).
- **LIGHT:** near-black set with FOUR hard practical `Cone`s arriving one at a time — the scene
  literally lights itself as it wires. Hierarchy needs darkness; this is the darkest set in the reel
  and the most ranked.
- **SFX:** `ratchet` @22.6 on the seat · `thock` @23.0 (rate 0.78) on it driving home ·
  `lib_cinematic_hit` + `sub` @23.1 (SFX_HERO — this is one of the two hero moments) ·
  `c_power` ×4 rate-varied on the four pillar lights · `c_powerbig` @26.9.
- **TAKEAWAY:** *one install, and it is already wired into the tools you actually use.*
- **§3 test:** VO's verb is **wired straight into**. The picture wires — real cables travelling to
  real marks. The four brands are the hero because they are the four things verified true.

---

### SCENE 5 — 27.66 to 33.12s (f830–994, 5.47s) · LOCKED · BEAT: SETUP
**VO:** *"Number five is the marketing council skill. It simulates an entire board of marketing experts debating your strategy before you commit to it."*

- **SET:** **THE COUNCIL ROOM.** Planes: (1) dark panelled back wall; (2) a long table lit only by
  seven low lamps; (3) the council — Claudes in seven DIFFERENT costumes (suit / prof / beard /
  glasses / girl / wizard / cop), each behind a lamp; (4) foreground chair back cropped left.
  ⛔ Sprite pitch computed BEFORE count: 7 across ~700px = 100px pitch at s=118 → violates
  `spacing ≥ 0.85 × (rA + rB)`. **Five at the table, two standing back** — 5 columns, ~175px pitch.
  Ten sprites at 5 columns reads as a cast; seven crammed reads as a blob.
- **CAMERA:** LOCKED. Push 1.05.
- **BLOCKING — THE EVENT:** *before* — your strategy card alone in the middle of a dark table.
  *trigger* (f850) — the first lamp snaps on. *travel* — the **argument travels around the table**:
  lamps snap on one at a time (f850/f872/f894/f916/f938), and as each lights, that councillor
  **leans in and gestures** — each on its own ACTION LOOP (`0 PACE / 1 WORK / 2 HOP / 3 LOOK`),
  own phase, own rate. Two disagree visibly (a shake, a turn-away). *arrival* (f960) — the lamps
  converge on the card and one **recommendation stamps down** on it.
- **LIGHT:** seven warm practicals against near-black. Deepest black point of the reel by design.
- **SFX:** `key` ×5 rate-varied on the lamp snaps · `temper_chime` @32.2 on the converge ·
  `stamp_press` @32.6 on the recommendation.
- **TAKEAWAY:** *they argue it out first, so you commit after the argument, not before it.*
- **§3 test:** VO's verbs are **simulates**, **debating**, **before you commit**. The picture debates
  (visible disagreement, not a row of identical nodding heads) and resolves. ⛔ The councillors are
  NOT labelled with the real marketers' names — the skill simulates personas, and putting real
  people's names on sprites states a claim the frame cannot back.

---

### SCENE 6 — 33.12 to 39.72s (f994–1191, 6.57s) · MOTIVATED PULL-BACK · BEAT: ESCALATE
**VO:** *"And number six is the Lessie skill. It finds real creators and B2B leads across a hundred live sources then verifies each email before you reach out."*

⛔ **6.57s — the second-longest scene, so it gets TWO sub-shots**, cut on the measured onset of
*"then verifies"*.

- **SET:** **THE LEAD FLOOR.** Planes: (1) a back wall of many small live source feeds, all running;
  (2) an intake belt crossing the full panel width — the reel's strongest single motion primitive,
  a full-width high-contrast travelling band **alternating light and shadow**; (3) the verify
  station; (4) foreground hopper cropped right.
- **CAMERA:** ONE motivated pull-back at f1100, revealing the belt runs much further than the first
  framing showed. (Scene 3 of only 3 that move.)
- **BLOCKING:**
  - **6a (f994–1100):** contact cards pour onto the belt from many feeds — **large, bright, fast,
    travelling**, continuously, not in a single burst. Specialists work the line on action loops.
  - **6b (f1100–1191):** pull back to the **verify station**: each card passes under a stamp head —
    good ones take a **VERIFIED** stamp and travel on, bad ones are **flicked into the hopper**.
    The reject flick is what makes "verifies" visible; without it, verification is invisible.
- **LIGHT:** cool white worklight overhead + one warm `Cone` at the verify head. vs S5's near-black
  warm council: differs in both hue and lightness ✓
- **SFX:** belt bed under the whole scene at `SFX_BED` · `key` ×3 on card arrivals ·
  `stamp_press` ×2 on verifies · `thock` (low, rate 0.86) on each reject hitting the hopper.
- **TAKEAWAY:** *it does not just find them, it throws away the ones that would bounce.*
- **§3 test:** VO's verbs are **finds**, **across a hundred live sources**, **verifies**. Many
  sources = many feeds visibly running. Verifies = a stamp AND a reject. ⛔ The "hundred" is NOT
  typeset — countable objects, per §4: *a number moves to its value, it is never typeset at it.*

---

### SCENE 7 — 39.72 to 44.61s (f1191–1338, 4.90s) · MOTIVATED TILT · BEAT: PAYOFF ⭐⭐ PEAK (10)
**VO:** *"Number seven is the campaign launcher OSS. It actively plans and launches a multi-channel ad campaign directly for your business."*

- **SET:** **THE ROOF.** Exterior, night, the highest and brightest set in the reel. Planes:
  (1) full night sky; (2) the city, with THE RETAINER's chained board now far below and small;
  (3) the launch gantry with three rails; (4) foreground parapet cropped both sides.
- **CAMERA:** the reel's third and last move — a motivated **tilt up** to follow the launch.
- **BLOCKING — THE EVENT:** *before* — the campaign, assembled from everything built in S1–S6,
  sitting on the gantry; the full seven-bay CAMPAIGN BOARD now lit behind it — **the hero artifact
  paid off**. *trigger* (f1210) — the hero pulls the launch lever. *travel* — the campaign splits
  into **three channel rails** firing out across and up, full-width, high contrast. *arrival*
  (f1250–1338) — three bright channel beams punch into the sky and the whole roof floods with light.
  ⛔ Light is a **shaped cone**, never a full-frame fill (the reel-78 rejection). **THE RETAINER is
  overrun here and only here** — its chain goes slack as the campaign clears it.
- **LIGHT:** the brightest body scene in the reel, but still under the frame-0 bar — brightness comes
  from the SUBJECT and practicals, ⛔ never from lifting the palette's dark stop.
- **SFX:** `ratchet` @40.0 on the lever · `lib_cinematic_hit` + `sub` @40.6 (SFX_HERO #2 — the
  reel's loudest moment, and it must beat S4's) · `c_power` ×3 on the three rails ·
  `c_powerbig` @43.4.
- **TAKEAWAY:** *the last one does not plan the campaign, it launches it.*
- **§3 test:** VO's verbs are **actively plans and launches** and **multi-channel**. Multi-channel is
  drawn as literally multiple rails firing, not as a chip reading "MULTI-CHANNEL".

---

### SCENE 8 — 44.61 to 47.80s (f1338–1434, 3.20s) · LOCKED · BEAT: CTA
**VO:** *"If you want the full marketing skills set up, comment MARKETING and I'll send it to you."*

- **SET:** **THE FLOOR, WIDE.** Pull back to the whole night house, now fully staffed and lit — all
  seven bays burning, specialists working every one, the belt running, the roof beams still up.
  The S0 framing, transformed. Planes: all four, plus the invoice stack from S0 now shoved aside.
- **CAMERA:** LOCKED. Push 1.04.
- **BLOCKING:** the keyword **MARKETING** is STRUCK into a plate — two stamp hits, not a fade. Every
  specialist Claude on screen keeps running its action loop; the crowd does not freeze for the CTA.
- **LIGHT:** warm, full, the payoff state.
- **SFX:** `stamp_press` ×2 (rate 0.94 / 1.02) · `impact_deep` @45.9 · `c_powerbig` @46.2 ·
  `sub` @46.9.
- **TAKEAWAY:** *comment MARKETING.*

---

## §3 ADVERSARIAL CRITIC PASS (mandatory — run before build)

| check | finding | resolution |
|---|---|---|
| **Swipe points 0–5s** | s0–1 hero + dark board (reason to stay: what fills them?); s1–2 crate travels; s2 SLAM + ignition; s3–5 the six dark bays throw the promise | no "I've seen this" repeat in the open ✓ |
| **Repeated base-object** | ⛔ FLAGGED: S1 RESEARCH WALL and S6 LEAD FLOOR both = "many small tiles moving" | **Rewritten:** S1's wall is VERTICAL, scrolling, and tiles are PULLED OFF it toward camera; S6 is a HORIZONTAL belt travelling across frame with a stamp-and-reject. Different axis, different colour, different verb ✓ |
| **Repeated base-object 2** | ⛔ FLAGGED: S0 and S8 are the same set | **Intentional and load-bearing** — S8 is S0 transformed (dark→lit, empty→staffed). That is the arc's proof, not a repeat. Different light, different population ✓ |
| **Payoff spent early** | S0 ignites bay 1 at 2.0s — is the payoff spent? | No: bay 1 lighting is the PROMISE (six still dark). The payoff is all seven + the launch at S7 ✓ |
| **Villain integrity** | THE RETAINER appears S2, present S3–S6, overrun S7 | loses exactly ONCE, at the peak ✓ |
| **Intensity curve** | `8 · 6 · 7 · 6.5 · 8 · 7 · 8.5 · 10 · 8.5` | no belly sag; peak (10) clears hook (8) ✓ |
| **Container audit (§3)** | every card carries a "what does the picture ADD" line | 9/9 answered with a verb from the VO ✓ |
| **Text audit (§4)** | text chips per shot | ONE per shot, in a band nothing else enters. No numerals for counts anywhere ✓ |
| **Sprite pitch (§5)** | S5 council at 7 across 700px | recomputed → 5 columns @175px pitch + 2 standing ✓ |
| **Arrival spread (§9)** | S1 and S5 both risked front-loading | arrivals restaged across the FULL duration on both ✓ |
| **Locations** | 9 scenes | 9 named sets, 3 of them EXTERIOR (S2 shaft, S7 roof) so the interiors do not all count as one place ✓ |

---

## BUILD CONTRACT (what Stage 7 must produce)

```
video/src/MktWorld.tsx    palettes, PLACES, shared motion helpers, the verified facts as constants
video/src/MktProps.tsx    CampaignBoard, SkillCrate, CreatorWall, RankLadder, SwatchFan,
                          PlugRack (+ real logo tiles), CouncilTable, LeadBelt, LaunchGantry,
                          costumeFor / action-loop crowd
video/src/MktSets.tsx     SetFor(k) — the nine sets on WorldKit.Surface + Occluder + Cone
video/src/MktScenes.tsx   S0..S8, the Scene wrapper, CAM + push per variant
video/src/ClaudeMarketingReel.tsx   the assembly (clone of ClaudeClaudeReel.tsx)
video/src/marketing108-index.tsx    the Composition registration
```

**Gates this board will be checked against:**
```bash
python3 tools/verify_reel.py REEL.mp4 --words video/src/data/words_108marketing.json \
  --script "$(cat video/public/108marketing_script.txt)" --music video/public/<bed>.wav
python3 tools/scene_motion_audit.py REEL.mp4 --scenes 0,5.63,10.75,18.04,22.30,27.66,33.12,39.72,44.61 \
  --names HOOK,CONTENT,SEO,BRAND,PLUGIN,COUNCIL,LESSIE,LAUNCH,CTA
python3 tools/look_audit.py REEL.mp4 --scenes video/marketing108.intent.json
python3 tools/sfx_audit.py            # cue rate 1.0-1.5/sec; 47.78s => 48-72 cues
grep -hoE 'boxShadow: *"0 0 [0-9]+px' video/src/Mkt*.tsx | wc -l    # must be 0
```
Bars: motion median **≥9.00** and **report the WEAKEST scene by name** · scenes under bar ideally 0,
1–2 shippable · frame-0 luma ≥140 · body sat ≥34% · body black point p10 ≤35 · no shot under 0.7s ·
every Claude the one house clay · delivered mp4 re-transcribed to prove no flub survived.

## Related
`docs/ANIMATION-QUALITY.md` (§2 event · §3 containers · §4 text · §5 action loops · §9 density) ·
`docs/THE-OPEN.md` (and its reel-104 correction, applied at S0) · `docs/SOUND-DESIGN.md` ·
`storyboards/102-seo.md` (the adjacent reel S2 must not look like) · `memory/claude107-reel.md`
