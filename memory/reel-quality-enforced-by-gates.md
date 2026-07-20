---
name: reel-quality-enforced-by-gates
description: "⛔⭐ Reel consistency is now enforced by CODE, not by remembering. Two enforcement layers exist in claude-reels-workflow — run them, don't re-derive the rules: tools/verify_reel.py (ship-gate on the finished render) + storyboards/STORYBOARD-SPEC.md (mandatory board contract). Built 2026-07-17."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: ba2960ba-ffb4-43f7-b93f-0497a74d6489
---

⛔⭐ **The 50/50 reel-quality problem is a FLOOR problem, and the fix is enforcement, not more rules.**
Alex, 2026-07-17: *"50% of the time the videos suck, 50% they're amazing… I really need to make sure the
styling's consistent."* Diagnosed (his own `docs/specs/2026-07-16-reel-consistency-defaults-design.md`, n=24):
**every quality floor enforced by a function signature passes; every floor enforced by remembering
random-walks.** So two enforcement layers now live in `~/Downloads/claude-reels-workflow` — **use them; they
turn "remembered" floors into "checked" ones.**

## 1. `tools/verify_reel.py` — the SHIP-GATE. Run on the finished mp4 BEFORE delivery.
**A render succeeding proves nothing about whether the content is in the pixels/audio** — the repo is full of
things that "typecheck clean, render clean, and are silent" (95 dead SFX cues, a bed silent after 38s,
"cloud" captions, a buried VO flub, a soundtrack placed at 0 but not audible until ~1s). The gate MEASURES
the output and exits 1 if anything is missing. Checks: `VO_ONSET_0`, `AUDIO_AT_0`, **`MUSIC_ONSET_0`** (the
soundtrack must be *audible* by ~0.05s — pass the pre-mix `--music` stem because the VO masks a late music
start in the final mix), `MUSIC_CONTINUOUS`, `ENDS_TIGHT`, `VO_NO_FLUB`, `CAPTION_TEXT/DRIFT`, `SFX_CUES`.
`--emit-manifest` prints the intent schema. Tested on real deliveries; a bed with a 1.2s silent intro is
correctly ship-blocked. **"Done" = a clean verify_reel pass, not "the render finished."** Supersedes the
scattered "MANDATORY GATE before render" notes across memory — they're now one script that runs every time.

## 2. `storyboards/STORYBOARD-SPEC.md` — the mandatory BOARD contract. Board to it every time.
Reel *content* must differ every video (never template scenes), but *execution craft* is scene-agnostic and
was the 50/50 variable. The spec makes the standard the best board (`52-callback.md`) already hits mandatory:
a header (arc / number spine / hero artifact), a per-scene skeleton (**SET / CAMERA / BLOCKING / LIGHT / SFX /
TAKEAWAY**), three floors (real PLACE not shapes-on-black · disciplined camera · an arc whose payoff isn't
spent early), and a mandatory adversarial-critic pass. Three libraries fill the hard parts:
- `CAMERA-GRAMMAR.md` — **a cut is free, a move is expensive**; locked by default, ~60-70% of scenes still,
  ≤1 motivated move/scene (the "not overdone" discipline, from [[reel-motion-hierarchy]]).
- `STORY-ARCS.md` — a **selector first** (villain/transformation/underdog/discovery/quest, or **NONE →
  value-ladder**; a tips reel gets no arc — a fake villain reads as gimmick), then each arc's beats +
  intensity curve + rules (villain undefeated until the peak).
- `SET-AND-LIGHT.md` — a real place with 4-6 depth planes + one light direction + value separation (the #1
  fix for "boring").

⭐ **The through-line for ALL of it (tell Alex if he asks whether this hurts creativity): the floor is
ORTHOGONAL to the idea.** It polices execution (grounded sprites, eased motion, audible soundtrack, a real
set, a disciplined camera), never content. Enforcing it makes the *detail* consistent while every *story*
stays free. Related standing pieces: [[reel-chassis-cinematic-not-abstract]], [[reel-draw-dont-stack]],
[[sfx-root-timeline-trap]], [[soundtrack-onset-at-zero]], [[caption-sync-gate]], [[reel-dead-air-motion-audit]].
The repo's own map is `CLAUDE.md` (auto-loaded) → the subsystem README → the file.
