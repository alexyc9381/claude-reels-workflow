---
name: reel-sfx-pass
description: "⛔ STANDING SFX pass — after the visuals are locked (end of the overhaul stage, before encode), densify sound effects from the SFX library wherever a beat can carry one, to maximize retention; ALWAYS a hook RISER + click/tap on every UI interaction + impacts/money/meme stingers"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 34c266ae-aeaf-4063-b27a-b16a33164df3
---

⛔ STANDING — runs on EVERY reel as the last step of the [[reel-overhaul-stage]], after the visuals are locked and before the delivery encode. Alex (2026-07-12): "add more sound effects throughout... more clicking... Among Us... maximize retention," and "add the SFX process into the official workflow so it adds sounds from my library wherever possible."

# The SFX pass

**Goal:** every meaningful beat carries a sound. Dense, satisfying audio feedback = retention. Pull from the [[sfx-library]] (`~/Downloads/sfx-library`, 5 category folders) + `video/public/sfx/`. If a needed sound isn't in `public/sfx/`, copy it in from the library first. Wire via `<Sfx at={sec} src="file.ext" v={vol} dur={sec} />` (times are L-relative to each scene so they survive re-timing).

## ⛔ ALWAYS (non-negotiable)
- **HOOK RISER:** the hook MUST have a RISER building into its first big impact/slam (`metal_riser.wav` / `lib_riser.wav`, dur tuned so it PEAKS at the slam). Every reel. (Alex flagged a missing hook riser on reel 46/44.)
- **Scene cuts:** a whoosh on every cut (`lib_whoosh.wav`).
- **UI micro-interactions:** a click/tap on EVERY interaction — each item detected/scanned, each chip flipping, each card sliding in, each button/logo, each keyword. Use `click.mp3 / lib_click.wav / ui_tap.mp3 / mouse_click.mp3 / soft_pop.mp3` (low vol 0.13–0.18, they're texture). This is the biggest retention lever.

## The mapping (menu — apply wherever the beat exists)
- **Impacts / slams / stamps:** `lib_boom.wav / boom.wav / impact.wav / thock.wav`.
- **Typing:** `lib_typing.wav / lib_mactype.wav`. **Confirm / correct / check:** `lib_confirm.wav / lib_correct.wav / ding.wav`.
- **Money / SOLD / payout:** `cash-register.mp3` + coin chimes `chimehi.wav / chimelo.wav`.
- **Messages / notifications:** `lib_notif.wav`. **Counters ticking / rolls:** `glitch_counter.mp3 / data.wav`.
- **Reveals / magic:** `lib_magic_reveal.wav / sparkle.wav / shimmer.wav`. **Record-scratch pattern interrupt:** `screech.wav`.
- **Riser accents into any payoff** (not just the hook): `lib_riser.wav / swooshup.wav`.
- **MEME stingers for engagement (sparingly, ~1–3 per reel, at fun/sus/fail/shock beats):** `among_us.mp3` (sus reveal), `bruh.mp3` (fail/lazy), `vine_boom.wav` (shock), `boing.wav` (comedic). Alex likes Among Us — use it on a scary/sus reveal.
- **CTA:** `lib_boom.wav` + `sparkle.wav` + `cash-register.mp3` + `crowd_cheer.wav` + coin chimes.

## Discipline
- **Volumes:** VO full; music bed ≤ 0.11; SFX 0.12–0.44 — clicks/taps 0.13–0.18, impacts/risers 0.30–0.44, meme stingers ~0.20–0.26. Layer UNDER the VO; SFX are texture, not noise.
- **De-click:** if a sound clips harshly, trim/fade in the source; keep dur short.
- **Verify against the tight timeline:** all `at=` within their scene bounds (SFX are L-relative; they shift with re-timing — recheck offsets don't exceed shortened scenes).
- **No silent gaps:** the ambient SFX + music keep the bed alive under [[caption-sync-gate]] / [[reel-vo-pacing]] tightened VO.

Cross-links: [[sfx-library]] (the catalog + sourcing method), [[reel-overhaul-stage]] (this pass is its final step), [[claude-ai-reel-workflow]] (audio rules). Proven: reels 44 HIRED + 46 FLIP got dense click/tap layers + Among Us stingers + hook risers (2026-07-12).
