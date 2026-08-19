# STORYBOARD — REEL 114 SMART (Stage 6)

> **Logline:** your Claude setup is a support rig built for a weaker model, and on Opus 5 that rig
> is the thing making it slow, disobedient and wrong — so you cut it off.
> **Format:** single dark panel · clone the reel 112 SQUAD chassis (cream `Bg`, dark `Panel`,
> `KaraokeCaption`, `ProgressBar`, `HookHeader`/`SectionHeader`, `SlopKit.Mascot`, `WorldKit` sets)
> **Arc:** VILLAIN
> **Villain:** **THE RIG** — the brace frame bolted onto Claude. Its RULE: *it only ever tightens.*
> Every scene it is still on him; it is not defeated until S12, and it is never "argued with", only
> **cut**. It is also the house `Occluder`: a rig leg crops the frame in every single scene.
> **Hero cast:** ONE colossal Claude (the current model, s≈300-360) · ONE small pale Claude (the
> old model, s≈150) · a 3-Claude cut crew in Anthropic's bay (constr costume) · a 4-Claude line
> crew at the payoff. Costume levers cycled deterministically by `costumeFor(i)`.
> **⛔ NUMBER SPINE:** `5` (Opus 5, stamped on the bay wall) → the TOKEN GAUGE climbing (S4) →
> `80%` as **8 of 10 brace slots going dark** (S5) → the audit tally `KEEP / CUT` (S12) → the
> token gauge falling and the REJECT BIN staying empty (S13). No other numerals anywhere.
> **⛔ HERO ARTIFACT:** **THE RIG.** Everything else is the bay it stands in.

---

## The mapping table (THE-OPEN: every row must fill in)

| on screen | what it actually is |
|---|---|
| the colossal Claude | Claude Opus 5 |
| the brace rig clamped over him | your `CLAUDE.md` + skills + memory |
| each brace, stencilled with a short rule tag | one line of your `CLAUDE.md` |
| the rig **tightening** when he moves | context that only ever grows |
| the output line stalling / skipping / warping | answers taking longer · rules ignored · hallucinations |
| the small pale Claude the rig fits perfectly | the older model the rules were written for |
| the token furnace under the rig | tokens burnt deciding *which rule wins* |
| two braces yanking the same arm opposite ways | *"their own rules were fighting against each other"* |
| Anthropic's identical bay, 8 of 10 braces cut | the >80% they deleted from Claude Code's system prompt |
| the sledgehammer taken **away** from him | *"don't just go deleting everything"* |
| the prompt cartridge slotted into his console | the one prompt you paste |
| the audit scan that **flags** each brace KEEP/CUT | the audit |
| the empty reject bin at the end | no hallucinations |

No row reads "it just looks cool". The literal layer on top: the real conflicting pair Anthropic
published — `DOCUMENT IT` vs `NO COMMENTS` — stencilled on the two braces that fight in S7.

---

## ⛔ HONESTY LEDGER — what must not reach the screen

| the VO says | verdict | what is drawn, and where it stops |
|---|---|---|
| *"the smartest models ever"* | marketing superlative | **NO benchmark, NO score, NO chart.** Drawn as capability: he works fast and clean in the first 2.5s. |
| *"Anthropic's team deleted over 80% of their system prompts"* | ✅ **VERIFIED** — Anthropic removed >80% of **Claude Code's** system prompt for the Claude 5 generation (Opus 5 / Fable 5), announced 2026-07-24 by Thariq Shihipar, no measurable loss on coding evals | drawn as **8 of 10 brace slots cut**, in a bay that is visibly **not** Claude's own |
| *"calling them over-constraining"* | ✅ their word — *"we were over-constraining Claude Code, both through our system prompt and in our CLAUDE.md files and skills"* | one stamp, one shot |
| *"their own rules were fighting against each other"* | ✅ their published example is a request carrying both *"leave documentation as appropriate"* and *"DO NOT add comments"* | the two fighting braces are stencilled `DOCUMENT IT` / `NO COMMENTS` |
| *"running so much faster with no hallucinations"* | ⚠️ **Alex's own setup, unsourced** | ⛔ **NO multiplier, NO %, NO "0 hallucinations" plate.** Drawn as MECHANISM only: the line that stalled in S1 now runs, and the REJECT BIN that filled in S1 stays empty. Stops at the edge of the claim. |
| *"paste in this one prompt"* | Alex's prompt | drawn as a physical cartridge. ⛔ No fake Claude Code UI, no invented command. (Anthropic's own equivalent is `/doctor`; that belongs in the article, not on screen.) |

**Gates:** `grep -oE '[0-9]+ ?x faster|no hallucinations' src/Rig*.tsx | wc -l` → 0.

---

## The intensity curve (no belly sag; peak must beat the hook)

```
S0 HOOK   ████████░░  8
S1 SYMPT  ██████░░░░  6
S2 DIAG   █████░░░░░  5
S3 OLDFIT ███████░░░  7   <- the reveal
S4 BURN   ██████░░░░  6
S5 80%    ███████░░░  7
S6 STAMP  ████░░░░░░  4   <- the one deliberate dip, 1.2s
S7 FIGHT  ██████████ 10   <- THE PEAK. the villain at its worst
S8 NOTALL █████░░░░░  5
S9 TOOL   ██████░░░░  6
S10 PASTE ███████░░░  7
S11 SCAN  ████████░░  8
S12 CUT   █████████░  9   <- the villain dies here and only here
S13 FREE  █████████░  9
S14 CTA   ███████░░░  7
```

---

## Set + light plan (a new light and colour every 2-4s; one world, six zones)

| scenes | zone | `WorldKit` palette | key light |
|---|---|---|---|
| S0-S1 | THE FIT BAY | `backlot` (tungsten on gravel, warmest) | one high work-lamp, hard down |
| S2-S3 | THE INSPECTION | `plaza` (cold teal) | a swinging inspection lamp, raking |
| S4 | THE FURNACE | `kerb` (sodium orange) | up-light from the token furnace |
| S5-S7 | ANTHROPIC'S BAY → back to ours | `suburb` (cold sky/warm house, two sources fighting) ⭐ literally two sources fighting | two opposed sources |
| S8-S10 | THE TOOL CRIB | `marquee` (navy + gold) | gold key from the crib |
| S11-S12 | THE CUT DECK | `kerbside` (green screen-wash) | the scan itself is the source |
| S13-S14 | THE OPEN FLOOR | `backlot`, doors open, brightest body scene | daylight flood from the open bay doors |

Neighbouring scenes differ in **both hue and lightness**. Every zone keeps its dark stop: body
scenes target luma 70-105, sat 34-45%, p10 ≤ 35. Only **frame 0** is ≥140.

---

# SCENE CARDS

Frames are `round(onset × 30)` from `src/data/words_smart.json`. Nothing here is estimated.

---

### S0 — 0.00→4.63s (139f) · LOCKED WIDE · **HOOK**
- **VO:** "The new Claude models are the smartest models ever, but there's one setting that's making them dumber."
- **SET:** THE FIT BAY. Gravel floor, a gantry rail across the ceiling, a lit cream SPEC BOARD on the
  back wall (this is what carries `HOOK_LUMA` and `HOOK_PLATE` — **not** the hero, per reel 110's
  ⭐⭐⭐ "a gate carried by the wrong object deforms that object"). Rig leg cropped by the left edge
  = `Occluder`. 5 depth planes.
- **CAMERA:** locked. One slow in-panel push, 1.00→1.07.
- **BLOCKING — ONE EVENT, four parts, cut to the words:**
  - **before** (f0, settled): the colossal Claude stands FREE mid-bay, arms working; finished parts
    fly off his bench down a chute at speed. Frame 0 is bright, he is in it, he is winning.
  - **trigger** @2.52 *"but there's one setting"* — the gantry lamp snaps red, a chain ratchets.
  - **travel** @3.20→4.22 — **THE RIG FALLS the full height of the panel**, ~560px, 30 frames.
  - **arrival** @4.22 *"dumber"* — the clamps BITE. Squash on the body, a dust ring, the chute output
    stops dead mid-air, his head drops, arms pin to his sides, one red LOCKED lamp.
- **LIGHT:** hard tungsten from high left; he is a dark silhouette against the lit cream board
  (**value gap ~145 points** — brightness is the mean, hierarchy is the spread).
- **SFX:** `ratchet` + `chain_clank` @2.52 (J-cut, starts 0.12 early) · `metal_riser` pre-rolled into
  4.22 · `pneu_thunk` + `impact_deep` + `sub` ON 4.22 · `neon_off` @4.40. Heaviest stack of the reel.
- **TAKEAWAY:** the thing that made him dumber came from **outside** and it is still on him.

### S1 — 4.63→10.46s (175f) · CUT IN to the OUTPUT LINE · **SETUP**
- **VO:** "And you've definitely noticed it. Answers taking longer, simple rules getting ignored, and the hallucinations you weren't seeing before."
- **SET:** same bay, tighter framing on the belt + reject bin. The rig's arm crops the top edge.
- **BLOCKING — three symptoms, three word onsets, three DIFFERENT failures (never three cards):**
  - @6.04 *"Answers taking longer"* — a part crawls the belt and **STALLS**; a dwell wheel spins up.
  - @7.18 *"simple rules getting ignored"* — a stencilled rule plate drops in front of the part and
    the part **rides straight over it**, knocking it flat.
  - @8.48 *"hallucinations"* — three parts come off the line **WARPED** (bent, doubled, wrong colour)
    and clatter into the REJECT BIN. The bin fills. ⭐ This bin is the callback in S13.
- **Background process:** the belt never stops; the rig's pistons pump on their own clock.
- **SFX:** `gear-stutter` @6.04 · `dead_thud` @7.38 · `ceramic_crack` ×3 pitch-walked @8.48.
- **TAKEAWAY:** three named symptoms, three distinct mechanisms — none of them a card.

### S2 — 10.46→14.74s (128f) · INSPECTION · **TURN**
- **VO:** "But here's what surprised me, it's not an issue with the model, you actually just need to fix your setup."
- **SET:** THE INSPECTION zone, cold teal, a swinging inspection lamp on a cable.
- **BLOCKING:** the lamp swings in and rakes him. ⛔ **A beam with no FINDINGS is a progress bar**
  (§10) — so the beam produces both halves:
  - @11.94 *"not an issue with the model"* — a chest hatch opens on the colossal Claude: his own core
    is running clean, a green ring seats, one clean chime.
  - @13.96 *"fix your setup"* — the beam swings OFF him and onto the rig, and **seven red flags stab
    into seven braces** in sequence, 3 frames apart.
- **LIGHT:** the lamp is the only source; it swings, so the shadow direction sweeps across the frame.
- **SFX:** `lamp_clunk` on the swing · `scan_beep` · `green_tone` @11.94 · `metal_ping` ×7 @13.96.
- **TAKEAWAY:** the model passed. The rig failed.

### S3 — 14.74→19.12s (131f) · THE OLD FIT · **REVEAL** ⭐ the best beat in the reel
- **VO:** "Every line in your CLAUDE.md file and every skill you built were for models that needed the extra support."
- **BLOCKING:**
  - @14.74→16.90 the braces light one at a time as the line names them; each is stencilled with a
    SHORT tag — `CLAUDE.md` on the spine bar, `SKILLS` on the shoulder rank. **Marks and numerals
    only; no paragraphs** (reel 109 shipped 33 spans and was rejected for it).
  - @17.46 *"were for models that needed the extra support"* — the rig unclamps and lifts, and a
    **SMALL PALE CLAUDE** (s≈150, the old model) walks in and stands in it. **It fits him perfectly.**
    Every brace seats. He looks comfortable, even helped.
  - @18.28 he steps out; the colossal one steps back in and it is now visibly **far too small** —
    braces bite into his shoulders, the spine bar bends.
- **TAKEAWAY:** the rig was never wrong. It was written for someone else.
- **SFX:** `slot_lever` on each brace light · `harden_chime` on the perfect fit · `twang` on the bend.

### S4 — 19.12→23.60s (134f) · THE FURNACE · **ESCALATE**
- **VO:** "Now with Claude Opus 5, it's just extra clutter and burns more tokens for it to decide what to do."
- **SET:** sodium-orange, up-lit from a furnace grate under the rig.
- **BLOCKING:**
  - @19.82 *"5"* — a big `5` plate slams onto the bay wall behind him (the number spine's only
    stamped numeral outside the 80%).
  - @20.38 *"extra clutter"* — six MORE braces drop on and stack redundantly, overlapping, some
    duplicating one already there.
  - @21.32 *"burns more tokens"* — the furnace lights; the **token gauge climbs** as he tries to make
    ONE decision, consulting brace after brace, each consultation dropping a token coin into the fire.
    ⭐ the number MOVES to its value; it is never typeset at it.
  - @22.50 *"decide what to do"* — his hand hovers between two braces and **does not move**. The
    gauge is at the top. That stall IS the beat.
- **SFX:** `stamp_press` @19.82 · `mech_clank` ×6 @20.38 · `fire_bed` under · `coin-drop` per token.
- **TAKEAWAY:** the cost is not the rules, it is deciding between them.

### S5 — 23.60→26.62s (91f) · ANTHROPIC'S BAY · **ESCALATE**
- **VO:** "That's why Anthropic's team deleted over 80% of their system prompts,"
- **SET:** a DIFFERENT bay — `suburb` palette, two opposed sources. Clearly not ours: different floor,
  different gantry, its own crew. (It must not read as Anthropic endorsing the prompt in S10.)
- **BLOCKING:** three constr-costume Claudes work a cutting torch over an identical rig. A rank of
  **TEN brace slots** runs across the frame; @25.14 *"80"* → @25.52 *"%"* the crew cuts and **eight of
  the ten go dark**, one every 3 frames, each falling out of frame with a clang. Two stay lit.
  ⭐ 80% as a countable mechanism, per §4's translation table — plus one small `80%` mark on the tally.
- **SFX:** `crusher` bed · `knife_switch` ×8 pitch-walked · `metal_ping` on each landing.
- **TAKEAWAY:** the people who build it threw most of it away.

### S6 — 26.62→27.80s (35f) · THE STAMP · deliberate dip
- **VO:** "calling them over-constraining"
- **BLOCKING:** a press swings down and stamps **OVER-CONSTRAINING** across the cut rig's spine bar.
  ONE text chip, in a band nothing else enters. Hard cut, 1.17s, then out.
- **SFX:** `stamp_press` + `slate_whump`.

### S7 — 27.80→31.20s (102f) · **THE RULES FIGHT** · ⭐⭐⭐ **THE PEAK**
- **VO:** "because they realized that their own rules were fighting against each other."
- **SET:** back to our bay, but lit by BOTH sources at once — the two lamps are the two rules.
- **BLOCKING — the single image the reel is built for:**
  - @28.30 *"realized"* — the camera settles on ONE arm with TWO braces on it.
  - @29.16 *"rules"* — the two braces light: stencilled `DOCUMENT IT` and `NO COMMENTS`
    (Anthropic's own published conflicting pair).
  - @29.64 *"fighting"* — **they yank the same arm in opposite directions.** Cable tension, the arm
    judders between them, the shoulder plate visibly DEFORMS (weight is deformation, §11).
  - @30.00 *"against"* — the judder amplitude doubles; steam vents from his ears — the head is the
    stillest part of a pinned sprite, so that is where the emitter goes (§11).
  - @30.38 *"each other"* — the arm **SEIZES SOLID**, sparks blow off both cables, both lamps trip
    to red, and the whole rig stops moving. The villain at its worst.
- **SFX:** `wire_travel` tension rising · `screech` @29.64 · `adv_strike` sparks · `ballast_buzz` trip.
- **TAKEAWAY:** it is not too many rules, it is rules that contradict.

### S8 — 31.20→33.16s (59f) · THE TOOL CRIB · **TURN 2**
- **VO:** "Now don't just go deleting everything,"
- **BLOCKING:** he grabs a SLEDGEHAMMER off the crib wall and winds up at the whole rig —
  @32.30 *"everything"* a crew Claude catches the haft mid-swing and holds it. The hammer is taken
  away and racked. The two braces that were still lit in S5 stay on him: some of it earns its place.
- **SFX:** `whoosh_heavy` on the wind-up (movement) + `wrench_clank` (texture) · `dead_thud` on the catch.

### S9 — 33.16→34.36s (36f) · THE RIGHT TOOL
- **VO:** "let me show you how I did it."
- **BLOCKING:** the crib's gold key light comes up; a precision CUTTER is lifted off its hooks and
  handed across. One clean object, one clean hand-off, and its SOURCE is in frame (§10).
- **SFX:** `lights-on` · `chrome_shine` · `ident_chirp`.

### S10 — 34.36→36.56s (66f) · THE PASTE
- **VO:** "You just need to open Claude and paste in this one prompt."
- **BLOCKING:** a console plate opens on the rig's spine. @35.36 *"paste"* a single glowing PROMPT
  CARTRIDGE arcs in and **slots home** with a seat and a ring. ⛔ No fake product UI — it is an
  object (Alex's standing ruling: creative objects, not text/UI screens).
  ONE text chip on the cartridge face: `SMART`.
- **SFX:** `ui_tap` · `pneu_thunk` on the seat · `lib_confirm`.

### S11 — 36.56→38.12s (47f) · THE SCAN
- **VO:** "Now Claude will run an audit and clean up any"
- **BLOCKING:** a green scan line sweeps the rig **top to bottom** and every brace it crosses lights
  with a verdict tick — the beam's FINDINGS, not the beam alone.
- **SFX:** `scanner_sweep` · `scan_beep` ×N on the ticks.

### S12 — 38.12→40.74s (78f) · **THE VERDICT — the villain dies**
- **VO:** "rules, skills, and memory that doesn't make sense to keep."
- **BLOCKING — three ranks, three word onsets:**
  - @38.12 *"rules,"* — the rule rank is judged: 2 KEEP (green clamp holds), 5 CUT.
  - @38.64 *"skills,"* — the skill rank: 1 KEEP, 4 CUT.
  - @38.96 *"memory"* — the memory rank: 1 KEEP, 3 CUT.
  - @39.30→40.36 every CUT brace is torched off and **falls out of frame**, large, bright, fast, one
    every 2-3 frames — the only shape that measures above bar is many large objects arriving
    continuously, and here they are *departing*, which repaints the same area.
  - The KEEP braces stay. The rig is not deleted; it is **rightsized**.
- **SFX:** `knife_switch` per cut, pitch-walked · `mech_clank` per landing · `resolve` on the last.
- **TAKEAWAY:** an audit keeps things. That is what makes it not a delete.

### S13 — 40.74→45.00s (128f) · THE OPEN FLOOR · **PAYOFF**
- **VO:** "I actually ran this on my setup and Claude is running so much faster with no hallucinations."
- **SET:** the bay doors are open; daylight floods in. Brightest body scene in the reel.
- **BLOCKING — every S1 symptom answered, in the same order:**
  - @41.64 *"my setup"* — he stands free, four brace stubs where the rig was, and **stretches**.
  - @42.36 *"running"* → @43.12 *"faster"* — the belt from S1 runs HOT: finished parts fly down it at
    3× the S1 rate, four crew Claudes working the line, each on its own action loop.
  - @43.76 *"no"* → @44.04 *"hallucinations"* — the camera finds the **REJECT BIN**: it is empty, and
    a part comes down the line, is checked, and passes. ⛔ No numeral, no multiplier — the empty bin
    IS the claim, and it stops exactly where the evidence does.
  - The token gauge from S4 falls back down.
- **SFX:** `machine_bed` up-tempo · `positive-chime` · `check-pop` on the pass.

### S14 — 45.00→46.43s (43f) · CTA
- **VO:** "Comment SMART for the free guide."
- **BLOCKING:** the press from S6 returns and stamps **SMART** onto a clean cream plate — the same
  press that stamped OVER-CONSTRAINING, now stamping the way out. Claude holds it up; `cheer`.
- **SFX:** `stamp_press` · `gold_stamp` · `crowd-cheer` low.

---

## Adversarial critic pass

| the attack | verdict |
|---|---|
| *"S0-S1 is one scene played twice"* | No — S0 is the rig ARRIVING, S1 is the three symptoms it causes. Different sets, different framing, different events. |
| *"the payoff is spent early"* | The rig is on him from 4.22s to 40.4s — 78% of the reel. It comes off exactly once, at S12. |
| *"the villain loses too soon"* | S7 (the peak, 10/10) is the villain at its **worst**, at 60% through. It is never argued with, only cut. |
| *"three symptoms = three cards"* (§3 containers) | Each symptom is a different MECHANISM on the same belt: stall, override, warp. None is a card, none is a label. |
| *"the 80% is a numeral on a plate"* (§4 text) | It is 8 of 10 slots going dark, countable without reading. |
| *"a beam with no findings"* (§10) | Both beams produce findings: S2 stabs 7 red flags, S11 ticks each brace. |
| *"the sprites stand around"* (§5, and reel 110's correction) | The action loops are never the scene: S1 is a line failing, S12 is a rig being dismantled, S13 is a line running. Each has before/trigger/travel/arrival. |
| *"an unsourced result is drawn"* | The honesty ledger kills the multiplier and the "0 hallucinations" plate; S13 draws the empty bin and stops. |
| *"it is one interior, so one location"* | Six lit zones on five `WorldKit` palettes, changing every 2-4s, neighbours differing in hue AND lightness. |
| *"the hook prop carries the frame-0 gates and gets deformed"* (reel 110) | `HOOK_LUMA` + `HOOK_PLATE` ride on the **cream spec board on the back wall**. The rig and the Claude are free to be dark, big and correctly proportioned. |

## Floors

1. **Every scene is a real place** — 5+ depth planes, one committed light direction, world props,
   a rig leg cropped by the frame edge in every scene. ✅
2. **Camera disciplined** — locked in all 15; one slow in-panel push each; the only "move" is the
   swinging inspection lamp in S2, which is a light, not a camera. ✅
3. **Arc has shape, peak beats hook** — hook 8, peak 10 at S7, one deliberate 4 at S6. ✅

## ⚠️ Flags for Alex

- **LENGTH: 46.43s** against the stated 22-29s house range. The VO is one continuous argument in 11
  sentences with no listicle items to drop — there is no edit that reaches 30s without breaking the
  argument. **Flagged, not silently trimmed.**
- **R1 FAILS AT EVERY TEMPO.** Worst 5s window is **6.20 wps** (bar 4.5) around 33s
  ("don't just go deleting everything / let me show you how I did it") — that is how it was
  recorded. ×1.00 46.42s · ×1.04 44.64s · ×1.07 43.38s · ×1.10 42.20s, and the worst window is
  6.20-6.40 at all of them. The hook window is fine (3.60, bar 4.0). **Shipping at ×1.00** because
  every speedup makes the failing window worse.
- The VO's fix is "paste this one prompt". Anthropic's own equivalent is the `/doctor` command in
  Claude Code, which rightsizes skills and CLAUDE.md files. Not on screen; it belongs in the article.
