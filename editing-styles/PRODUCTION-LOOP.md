# The Production Loop — how a reel is iteratively fixed before it ships

> Applies to **every** reel, in **every** editing style. The loop is what turns a correct-but-flat first render into a premium final. It is **not waivable** — a deadline or "just ship it" reduces the *number* of loops, never to zero.

## The one rule everything hangs on
**The first full render is a WIREFRAME, never a deliverable.** The first pass only gets the *structure* right (beats, VO sync, captions, what each scene says). It is always visually under-baked and the hook is always a placeholder. Shipping it wastes the topic. The first render exists **to be torn apart**, not delivered.

## Two loops

### Loop A — script adversarial gate (words, before any pixels)
3 **fresh** critic subagents (rules-logger / cold-viewer / comp-fidelity), no drafting history, score **6 dimensions**. **Ship bar = all six ≥ 8/10 + zero blockers.** Below bar → re-draft → re-run the same critics on the diff. Any hook/beat-order change forces a full 3-critic re-run. The script can't enter building until it clears.

### Loop B — visual overhaul (the "fix it 2–3×" loop)
```
render draft ─► extract evidence ─► FRESH critic ─► flags? ─┬─ yes ─► fix (rebuild) ─► re-render ─┐
   (wireframe)   (frame grid +        (Gate A + B,           │                                     │
                  0–2s hook burst)     zero-flag bar)        └──────────◄──────────────────────────┘
                                                             └─ no ──► SFX pass ─► encode ─► deliver
```
1. **Render** the draft; **extract evidence** — a per-scene frame grid **plus a dense 0–2s burst** for the hook (a single still can't reveal dead air or bad easing; motion must be judged on a sequence).
2. Hand it to a **FRESH adversarial critic** (never the author) against the two gates below. **Open flags are blocking.**
3. **Fix** (usually a parallel per-scene rebuild workflow), **re-render, re-grid, re-critic with a new agent.**
4. **Loop until an independent critic returns ZERO flags** on the hook and every scene — typically **2–3 rounds** (each round a fresh set of eyes on the real pixels finds new things). Then SFX → encode → deliver.

## Each pass RATCHETS UP — not just "fix what's broken"
A pass is not done when the obvious bugs are gone; it's done when the reel is *richer* than last pass.

### ⭐ The three Alex flags the most — HARD FLOORS, check every single scene
The recurring notes across DROP (v1→v9), SKILLS, HIRED, FLIP. These are **blocking**, not nice-to-have — every overhaul pass must visibly push all three UP:

1. **Detailed, ALIVE backgrounds.** Every scene's background is a designed, moving world — **≥3–4 concurrently animated layers** + ambient life (something walking / drifting / bobbing / particles / parallax), *never* a flat panel or a hero floating in a void. Detail lives HERE — dimmed and behind — so the foreground can stay one clean hero (the detail budget, `game-world-remake.md` §1b). **"The background is plain / boring / empty" = auto-fail.** Each pass adds depth + motion + life to the world, not just to the hero.
2. **Dressed sprite — a distinct, recognizable OUTFIT per scene.** The Claude sprite is the protagonist and it is **costumed, never a plain critter**. Give it an `outfit` matched to the beat, and make **several overtly pop-culture** (Neo/Matrix, Squid Game track, Sherlock, Mario, chef, crown-champion…). Keep the base Claude face untouched (costume = head-top + body props only; silhouette stays the rounded Claude critter, never a human bust). **Spread outfits — don't repeat adjacent.** "Boring / plain sprite" = fix it.
3. **Pop-culture references — MORE, wherever possible.** Floor is **≥1 per scene**, but actively push for more: knockoff brands/UIs (a "GEKKO PROPERTIES" landlord, a Robinhood-ish app), meme cameos drawn as Claude sprites/props (Doge, "Chad-Claude", moai, Shrek, Grogu, Messi kit — **never generic humans**), recognizable posters/props, living-world gags. **"Nothing fit" is NOT a passing answer** — invent a reason to plant one. The single most-flagged omission; over-index on it.

### Also ratchet every pass
- **⬆ Polish** — every shape premium-shaded (gradient + rim/inner highlight + layered shadow + rounded); rich **matte** palette, NO neon glow / NO low-opacity content washes; eased, weighty motion with overshoot (never linear/robotic).
- **⬆ SFX density** (final pass, once visuals lock) — a beat that can carry a sound gets one: hook riser, click/tap per UI interaction, impacts/money/notification/counter sounds, 1–3 meme stingers, CTA burst. Clicks ~0.13–0.18 under the VO.

## The gates the critic judges
- **Gate 0 — cover frame / thumbnail (frame 0):** the first frame is the IG thumbnail AND the mute scroll-stopper — design it deliberately, don't inherit it. Solid at frame 0 (no fade-in / no half-drawn state), the hook or payoff mute-readable in <2s, the dressed sprite + ≥1 pop-culture element present. If frame 0 wouldn't stop YOU mid-scroll, it fails.
- **Gate A — hook pattern-interrupt (0–5s):** something physically surprising lands by ~0.5–1s (a drop/slam/burst/POV-rush/fake-out), earned by the topic, mute-readable in <2s, escalating with **no dead air**, ≥1 pop-culture element. Judge on the **0–2s motion burst**, not one still.
- **Gate B — per-scene visual overhaul (every scene):** the three hard floors above — **alive background (≥3–4 animated layers) + dressed/pop-culture sprite + ≥1 pop-culture reference** — plus premium-shaded props, the Claude sprite as protagonist, and escalation. No scene is exempt or "already fine."

## Faster loops WITHOUT lowering the bar (#3)
The quality bar never drops — but interim rounds can be cheap so you afford MORE of them:
- **Interim critic rounds render at half-res** (`remotion render --scale 0.5`) and/or only the changed scenes' frames. The critic judges layout, occlusion, dead-air, background richness, outfits, pop-culture, escalation — none need full resolution. Faster renders = more loops, not fewer.
- **The FINAL pre-delivery critic pass + the delivery render are ALWAYS full-res** (1080×1920). Nothing ships judged on a proxy; fine-text legibility + final polish are verified at full quality.
- Net: speed buys iterations; the last word is always a full-quality render an independent critic signs off on. **A faster loop must never mean a looser loop.**

## Three principles that make the loop honest
1. **Fresh critic every round, judging the RENDER — not the author, not the code.** No self-certifying, no "good enough for a flat scene."
2. **Rendering is the only real gate** — on this box `npx tsc` is a decoy that means nothing; runtime errors and overlaps only appear in pixels. Render a dense sweep every pass.
3. **Not waivable** — cut the number of loops under time pressure, never the loop itself. Log the hook before/after + per-gate verdict (no evidence logged = not deliverable).

## Stop condition
A fresh critic that did not build the reel finds **zero** open flags on Gate 0, Gate A, and every scene's Gate B, AND the pass visibly raised the **three hard floors** (alive backgrounds · dressed pop-culture sprite · ≥1 reference per scene) over the previous one. Only then: SFX pass → mac-safe encode → deliver (audit audio onset 0.0s, `volumedetect max_volume < 0 dB`). *(This final sign-off pass is always a full-res render, per "Faster loops without lowering the bar".)*

## After posting — close the loop (don't optimize blind)
Delivery is not the end. 48–72h after a reel posts, pull the real numbers and park them next to the *predicted* Stage-4 scorecard: run `analytics/pull_ig_insights.py` (auto: views/reach/saves/shares/comments + **avg % watched**, the retention KPI) and add one screenshot for the app-only **3s-hold % + retention curve** (`analytics/PERFORMANCE-TEMPLATE.md`). Where the curve cliffs ↔ which beat, and which gate predictions actually held, become the next kill-rules (`script-factory-pipeline` POST-PUBLISH AUTOPSY). See `analytics/README.md`.

---
*Cross-refs: `CLAUDE-REELS-PLAYBOOK.md` (§6–§8), `editing-styles/game-world-remake.md` §1b (detail budget), `STYLES.md` (pick a style first). This loop runs the same regardless of which editing style is chosen.*
