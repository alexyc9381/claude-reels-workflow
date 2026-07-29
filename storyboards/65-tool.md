# Reel 65 — TOOL · Storyboard

> VO is **LOCKED** (Alex recording, spliced + 1.04×, `public/vo_tool.wav`, 45.22s).
> Style: CALLBACK-52 / SIMULATE-62 lineage — **ONE framed dark Panel** ([[reel-never-dual-screen]]),
> **Claude sprites act the story out**, colorful + grounded in a real situation ([[reel-cinematic-legup]] CORR-2),
> **ONE clear hero moment per scene** ([[reel-declutter-single-hero]]).
> ⛔ No emoji glyphs on screen · no low-opacity content · no split-screen · no "labelled box" scenes.
> Clone base: `ClaudeSimulateReel.tsx` → `ClaudeToolReel.tsx` (chrome byte-identical).

---

## THE STORY (this is the spine — every scene serves it)

**Genre:** underdog heist / David-vs-Goliath in a market town.
**Premise grounded in ONE real situation** (per CORR-2 — no abstract allegory): a **software town square**
where one bloated incumbent sells a cathedral-sized product nobody fully uses, and YOU walk off with the
one brick everyone actually wanted.

**Cast (Mascot sprites + costumes already in the chassis):**
| role | who | costume |
|---|---|---|
| **YOU** | the protagonist Claude sprite | plain → `constr` at the forge → `suit` at the market |
| **BLOATCORP** | the incumbent villain — a fat, smug SaaS baron | `zuck`/`suit` + `shades`, oversized |
| **THE CROWD** | ~8-10 townsfolk sprites, the customers | `girl`/`prof`/`beard`/`chef` mix |

**Recurring objects (Chekhov):**
1. **THE CATHEDRAL** — BloatCorp's absurd 40-module product tower. Planted S1, toppled by irrelevance in S6.
2. **THE ONE BRICK** — a single glowing clay tile pulled out of the cathedral in S1. It IS the product.
   Recurs as: the complaint card (S4) → the forged tool (S5) → the thing held up in the thread (S7).
3. **THE ★☆☆☆☆ PLACARD** — the crowd's one-star sign. Planted S3, **flipped to ★★★★★ in S7** = the loop closing.

**Arc:** setup (there's a fortune in ONE piece) → *how?* → hunt the complaint → name the product →
forge it → undercut in public → **return to the exact people who complained** → CTA.

**⭐ THE OPEN LOOP (per [[claude-ai-reel-workflow]] — pay off at the END, never mid-video):**
S1 asks *"which piece, and how would you ever find it?"* The three steps ESCALATE without resolving it;
the payoff is **S7** — the crowd that complained in S3 flips to five stars. Only then the CTA.

---

## HERO-HEADER (frame-0 complete, ~f2 → f200, then null) — [[reel-hook-header]]
> "**$40,000 a month** selling one feature of **someone else's app**."
(clay: *$40,000* + *someone else's*). Fraunces 900 ~76px, `ScreenHead` big/clay slots.
Mute-stamp low on the hero: **"STEAL THE ONE BRICK."**

---

## BEAT MAP — `L[]` from MEASURED VO onsets (see factory log)

| # | scene | L (s) | dur | VO beat |
|---|-------|-------|-----|---------|
| S1 | **THE CATHEDRAL** (hook) | 0.000 | 6.09 | "You don't need to invent an app… $40,000 a month selling a simpler version of something that already exists." |
| S2 | **NOBODY USES IT ALL** | 6.090 | 6.63 | "Nobody's paying $30 a month for a whole app… one specific feature, and Claude can build that in one afternoon." + "Here's how you do it." |
| S3 | **GO WHERE THEY COMPLAIN** | 12.715 | 8.57 | "1. Reddit + one-star reviews on G2 and Capterra." + "Point Claude at r/smallbusiness… pull every post where someone says a tool is too expensive." |
| S4 | **THE COMPLAINT IS THE PRODUCT** | 21.285 | 4.18 | "It'll come back with a list of software people complain about over and over. That complaint is your product." |
| S5 | **FORGE THE ONE THING** | 25.460 | 6.88 | "2. Build out that feature… one thing and nothing else. No settings, no dashboard, no setup. It works the second you open it, and it takes an afternoon." |
| S6 | **UNDERCUT OUT LOUD** | 32.340 | 5.36 | "3. Sell the software and undercut the main competitor out loud. Their price is on their pricing page, so you already know the number to beat." |
| S7 | **BACK TO THE THREAD** (payoff) | 37.700 | 3.88 | "Then you go back to that exact thread where people were complaining and show them the exact thing that you made." |
| S8 | **CTA** | 41.575 | 3.73 | "I made a guide with the exact prompts, the subreddits, and the pricing math. **Comment TOOL.**" |

`CUT = 45.30` · `durationInFrames = 1359` · fps 30 · 1080×1920.

---

## SCENE CARDS

### S1 · THE CATHEDRAL — hook (6.09s) · 3 shots
- **HERO:** a colossal absurd **product cathedral** filling the panel — 40+ mismatched module-blocks, pipes,
  dials, antennae, spinning gears, a `$30/mo` banner across it. BloatCorp sprite perched on top, smug.
- **SHOTS:** (A 0-2.0) slow crane-up the tower, scale-contrast: tiny YOU at its base, gawking.
  (B 2.0-4.2) push-in to ONE glowing module mid-tower — the only lit brick in a dead grey tower.
  (C 4.2-6.09) YOU **pulls that brick out**; it comes free clean; coins burst; the tower doesn't even notice.
- **ESCALATION:** camera rises → light narrows to one brick → the theft. Never static.
- **MUTE CHECK:** giant complicated tower vs one glowing brick in a small sprite's hands = "take one piece." ✓
- **LOOP:** which brick? how do you know? → held.
- **SFX:** deep sub + industrial hum; riser on the crane; `lib_magic_reveal` + `m_coin` on the pull.

### S2 · NOBODY USES IT ALL (6.63s) · 3 shots
- **HERO:** a **giant control panel / cockpit wall** of 40 buttons — a townsfolk sprite reaches past all of
  them and presses **ONE**. The other 39 are visibly dusty (cobwebs, grey caps).
- ⚠️ MUST NOT reuse the cathedral as the base object — this is a different composition (interior, close, wall of
  buttons), same world.
- **SHOTS:** (A) the wall + a `$30` turnstile the sprite pays at. (B) macro push on the ONE pressed button
  glowing clay. (C) the 39 dead buttons desaturate and slide away, leaving the single button alone in frame →
  it morphs into a small clean app-tile. On "Here's how you do it" YOU turns to camera and a **3-notch step-rail**
  ticks on (this rail persists as a corner HUD through S3/S5/S6 = the "hierarchical" through-line).
- **MUTE CHECK:** 40 buttons, one used → "you only need the one." ✓

### S3 · GO WHERE THEY COMPLAIN (8.57s) · 3 shots — the longest scene, needs 3 distinct events
- **HERO:** the **COMPLAINT SQUARE** — a packed town plaza of angry townsfolk sprites waving **★☆☆☆☆ placards**,
  speech-bubbles with drawn angry marks (⛔ no emoji — drawn vector glyphs only). Rain/grey wash.
- **SHOTS:** (A 0-2.4) ground level in the crowd, placards bobbing, YOU wades in.
  (B 2.4-5.4) YOU (`sherlock` costume) unfurls a **big magnet/net** — a signboard reading `r/smallbusiness`
  above the plaza gate; complaint-cards begin flying off the crowd toward the magnet in arcs.
  (C 5.4-8.57) a **torrent** of cards streams in from off-panel (large-area transit — see MOTION below),
  the magnet groaning, a counter climbing.
- **⭐ LARGE-MOVER BUDGET:** this scene carries the reel's dead-air risk. At every frame ≥2 elements of
  ≥40,000px² travelling ≥6px/frame (card torrent + crowd wave + a cart crossing the plaza).
- **MUTE CHECK:** angry crowd + one-star signs + a magnet hoovering complaints. ✓

### S4 · THE COMPLAINT IS THE PRODUCT (4.18s) · 2 shots
- **HERO:** the captured complaint-cards **funnel into a press** and come out as **ONE glowing card** —
  the same clay brick shape from S1 (Chekhov payoff #1). A wax seal thumps it.
- **SHOTS:** (A) hundreds of cards compress, duplicates stacking and a tally ticking "×47". (B) the press
  opens: ONE card, lit, held up by YOU. Everything else falls away as ash.
- **MUTE CHECK:** many gripes → one product. ✓ · **SFX:** compress whoosh → press slam → seal thump + chime.

### S5 · FORGE THE ONE THING (6.88s) · 3 shots
- **HERO:** a warm **FORGE / workbench** — YOU (`constr`) drops the complaint-card into the fire and hammers
  out a single clean **TOOL** (a bright app-tile with one button, glowing).
- **SHOTS:** (A) card into the forge, sparks. (B) three ghost-blueprints labelled by ICON only
  (a gear = settings, a grid = dashboard, a wrench = setup) drift in and YOU **sweeps them off the bench** —
  they shatter. ⛔ icons, not words. (C) the finished tool sits on the bench, one button; YOU taps it and it
  **works instantly** (a green tick + a satisfying bloom). A **sun arcs across the window** the whole scene =
  "an afternoon" (the large slow mover that also kills dead air).
- **MUTE CHECK:** forging one tool, sweeping away the extras, it works on tap. ✓

### S6 · UNDERCUT OUT LOUD (5.36s) · 3 shots
- **HERO:** a **public market face-off** — BloatCorp's storefront with its price **nailed up in the open**
  (`$30`), YOU sets up a stall opposite and slams a sign down: **`$9`**.
- **SHOTS:** (A) YOU reads BloatCorp's public price through a spyglass (the "it's already public" idea).
  (B) the `$9` sign SLAMS down, shockwave, BloatCorp's shades crack. (C) the crowd physically streams
  across the panel from his door to yours (full-width traffic = the big mover).
- **NUMBERS ARE THE ONLY ON-GRAPHIC TEXT ALLOWED HERE** ($30 / $9) — per the text rule, a number is fine.
- **MUTE CHECK:** two prices, one crossed, the crowd moves. ✓

### S7 · BACK TO THE THREAD — payoff, closes the loop (3.88s) · 2 shots
- ⭐ **DELIBERATE CALLBACK to S3** — the sanctioned exception to the no-repeat-base rule (hook↔payoff pair).
  Re-staged with a different camera: S3 was ground-level in the crowd, S7 is a **crane-up reveal** of the
  same plaza.
- **SHOTS:** (A) YOU walks back through the plaza gate holding the finished tool overhead.
  (B) the placards **FLIP in a wave** ★☆☆☆☆ → ★★★★★ across the whole crowd, left to right; coins arc in;
  BloatCorp's cathedral is visible tiny and dark on the horizon.
- **MUTE CHECK:** the same angry people, now five stars. ✓ **This is the peak — hold it to the cut.**

### S8 · CTA (3.73s)
Chassis `CTA` component, rendered OUTSIDE the Panel (true screen coords). Keyword **TOOL**.
Guide card title "THE TOOL PLAYBOOK", 3 checks = **the exact prompts · the subreddits · the pricing math**
(verbatim from the VO). Typed keyword + pulse + arrow bob, as CALLBACK/SIMULATE.

---

## STANDING BUILD CONSTRAINTS (hand these to every scene author)
1. Scene bodies are **PANEL-LOCAL 0..1012 × 0..792** ([[reel-build-gotchas]]). Anything `top > 792` is clipped.
   Only the CTA uses screen coords.
2. `over(f, start, dur)` takes **FRAMES** — always `over(lf, fr(2.4), fr(0.5))`, never a bare number.
3. `ramp(f,a,b)` maps f FROM [a,b] TO 0..1 — **not** a lerp. `a < b` strictly.
4. Valid easings only: quad, cubic, sin, circle, exp, poly, bounce, back, elastic, bezier, ease, linear, step0/1.
   ⛔ No `Easing.quart/quint/expo/circ`.
5. Clamp every "pop/flash": `lf < fr(X) ? 0 : Math.max(0, 1 - (lf-fr(X))/9)`.
6. Never `background:` + `backgroundImage:` in one style object (renders transparent).
7. Sprites use `<Actor x groundY size>` — the contact shadow must be WIDER than the body
   ([[reel-sprite-grounding-law]]); spacing ≥ 0.85×(rA+rB) or sprites merge.
8. ⛔ **`<Sfx at={}>` is ROOT-timeline seconds** ([[sfx-root-timeline-trap]]) — emit `L[i] + local`, never a
   scene-local number. The cloned chassis's cue map is DELETED, all cues re-authored.
9. Every 1s bucket must read ≥4.0 on `tools/motion_audit.py` — ≥1 element of ≥40,000px² moving ≥6px/frame
   at all times ([[reel-dead-air-motion-audit]]).
10. Camera move per scene, volumetric light, 4-6 parallax planes, rich backgrounds ([[reel-cinematic-legup]]).

## Pairs with
[[reels/tool-factory-log]] · [[claude-ai-reel-workflow]] · [[reel-never-dual-screen]] · [[reel-cinematic-legup]]
