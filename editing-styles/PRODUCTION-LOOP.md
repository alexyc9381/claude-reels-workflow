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
A pass is not done when the obvious bugs are gone; it's done when the reel is *richer* than last pass. On every loop, actively push these up wherever possible:

- **⬆ More detail** — richer, more alive backgrounds; more concurrently-animated layers; more depth (z-layers, parallax, stacked shadows). Governed by the **detail budget** (`game-world-remake.md` §1b, generalizes to all styles): **detail goes in the background (dimmed, behind), the foreground stays a single clean hero.** "Richer" = deeper shapes, not more competing foreground objects. Hard floor: **≥3–4 concurrently animated layers per scene**; never one static graphic on a panel.
- **⬆ More pop-culture references, wherever possible** — recognizable + funny comment-bait. **Hard floor: ≥1 per scene; push for more where it fits naturally.** Sources: knockoff real brands/UIs (a "GEKKO PROPERTIES" landlord, a Robinhood-ish app), meme cameos (Doge, Gigachad-as-"Chad-Claude", moai, Shrek, Grogu, Messi kit), living-world gags, recognizable props/posters. **"Nothing fit" is NOT a passing answer** — if a scene has none, invent a reason to add one (a poster on the wall, a prop on the desk, a cameo fly-by). This is the single most-flagged omission.
- **⬆ More polish** — every shape premium-shaded (gradient + rim/inner highlight + layered shadow + rounded); rich **matte** palette, NO neon glow / NO low-opacity content washes; eased, weighty motion with overshoot (never linear/robotic); the Claude sprite as protagonist, dressed in a distinct, recognizable (often pop-culture) outfit per scene.
- **⬆ More SFX density** (final pass, once visuals lock) — a beat that can carry a sound gets one: hook riser, click/tap on every UI interaction, impacts/money/notification/counter sounds, 1–3 meme stingers at sus/shock beats, a CTA burst. Volume discipline: clicks ~0.13–0.18 under the VO.

## The two gates the critic judges
- **Gate A — hook pattern-interrupt (0–5s):** something physically surprising lands by ~0.5–1s (a drop/slam/burst/POV-rush/fake-out), earned by the topic, mute-readable in <2s, escalating with **no dead air**, ≥1 pop-culture element. Judge on the **0–2s motion burst**, not one still.
- **Gate B — per-scene visual overhaul (every scene):** rich matte background + ≥3–4 animated layers + premium-shaded props + Claude sprite protagonist + **≥1 pop-culture item** + escalation. No scene is exempt or "already fine."

## Three principles that make the loop honest
1. **Fresh critic every round, judging the RENDER — not the author, not the code.** No self-certifying, no "good enough for a flat scene."
2. **Rendering is the only real gate** — on this box `npx tsc` is a decoy that means nothing; runtime errors and overlaps only appear in pixels. Render a dense sweep every pass.
3. **Not waivable** — cut the number of loops under time pressure, never the loop itself. Log the hook before/after + per-gate verdict (no evidence logged = not deliverable).

## Stop condition
A fresh critic that did not build the reel finds **zero** open flags on Gate A and every scene's Gate B, AND the pass added detail + pop-culture + polish over the previous one. Only then: SFX pass → mac-safe encode → deliver (audit audio onset 0.0s, `volumedetect max_volume < 0 dB`).

## After posting — close the loop (don't optimize blind)
Delivery is not the end. 48–72h after a reel posts, pull the real numbers and park them next to the *predicted* Stage-4 scorecard: run `analytics/pull_ig_insights.py` (auto: views/reach/saves/shares/comments + **avg % watched**, the retention KPI) and add one screenshot for the app-only **3s-hold % + retention curve** (`analytics/PERFORMANCE-TEMPLATE.md`). Where the curve cliffs ↔ which beat, and which gate predictions actually held, become the next kill-rules (`script-factory-pipeline` POST-PUBLISH AUTOPSY). See `analytics/README.md`.

---
*Cross-refs: `CLAUDE-REELS-PLAYBOOK.md` (§6–§8), `editing-styles/game-world-remake.md` §1b (detail budget), `STYLES.md` (pick a style first). This loop runs the same regardless of which editing style is chosen.*
