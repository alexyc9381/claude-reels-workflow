# Editing Styles — the menu

Pick ONE editing style per reel at build time. A style is a **full look-and-feel + audio system** applied on top of the same script/VO/captions chassis. Say e.g. *"build this one in the **game-world** style"* and follow that style's pack.

Each style keeps the invariant chassis (1080×1920 @30fps, the 3-font role system — Fraunces display / Inter body / mono HUD, the base brand palette, the floating dark Panel, karaoke captions, VO-dominant mix, mac-safe encode). Styles differ in the **world, props, motion language, and audio skin**.

| Style | Pick it when | Signature | Pack |
|---|---|---|---|
| **Default — Cinematic Blueprint** *(house style)* | Most reels; credibility-first, money/receipt, or "system" topics; anything somber or serious | Clay Claude mascot + dark game-screen Panel + premium shaded props (gradient + rim-light + layered shadow), warm brand palette, cinematic riser/boom SFX, single cinematic hero per scene | *(the baseline every reel already uses — see `CLAUDE-REELS-PLAYBOOK.md`)* |
| **Game-World Theme Remake** | Listicle / count-up ("5 skills", "3 mistakes", "top N"); playful broad-consumer topics that benefit from pop-culture familiarity + a strong stay-to-end lever | The whole reel re-skinned as a recognizable video-game world (Super Mario / Zelda / Pokémon / arcade / RPG): a nested parallax overworld, a **persistent game HUD** (running avatar + coins + WORLD/TIME + N-tracker) as the retention spine, costumed base-Claude mascot, an original chiptune-SFX layer + a hero-music "invincibility" beat | [`game-world-remake.md`](game-world-remake.md) — reference build: reel 51 SKILLS (Super Mario) |

**⛔ Don't mix a style with the wrong topic.** The game-world style reads as *fun* — great for a skills listicle, wrong for a serious money/credibility reel (use the default there). When unsure, default to Cinematic Blueprint.

### How to add a new style
1. Ship one reel in the new look, iterate to a shipped result.
2. Decompose it into a `<style-name>.md` pack: the invariant chassis it keeps, then each dimension (world/background, HUD, mascot, prop kit, scene mapping, typography+color, motion+SFX+music) with **exact values from the source**, a re-theme/swap template, an apply-to-a-new-video checklist, and the gotchas.
3. Add a row here.

*(Method for decomposing a style from one example video: `~/Downloads/style-cloning-kit` + `memory/style-cloning-pipeline.md`.)*
