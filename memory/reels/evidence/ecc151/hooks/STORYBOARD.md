# ECC 151 — two additional hook variants

Two visual hooks for the existing 34.3-second reel. The original snap cut remains available.
The spoken opening, exact headline REPLACE ALL ENGINEERS / 1 REPO, timing,
progress rail, captions and revised body remain the same. Changeover is frame 102 (3.4s).
There is no early ECC text reveal. These are creative alternatives, not measured retention winners.

## B — MAGNET: lateral consolidation

- 0.00–0.20: Claude immediately braces and lifts an oversized horseshoe magnet carrying an enlarged official Claude mark without a text label, fully visible from frame zero. Three engineering tools are visible in separate workstations. Brief inherited camera push.
- 0.20–1.57: blueprint, coding laptop and testing flask leave their stations on staggered curved paths. Each has a separate capture contact; the emptied workstations dissolve after capture.
- 1.60–2.17: all tools have arrived before the GitHub core forms. The room darkens, Claude eyes power up; the operating hand transfers from the magnet to the core.
- 2.17–3.40: Claude raises the consolidated core and steps forward. Three empowered specialists follow with staggered forward launches into the existing busy workshop scene.
- Audio: mechanical engagement, three distinct capture contacts, power contact, core lift, staggered footsteps. No snap cue.

## C — ZIPPER: vertical opening, then advance in depth

- 0.00–0.80: a Claude operator is already gripping a giant zipper tab carrying an enlarged official Claude mark without a text label, fully visible from frame zero. He pulls downward; both sides of the room peel apart with tracked zipper teeth and window halves.
- 0.80–1.43: the opening reveals a five-specialist workforce. Their expressions change as the eyes power up in sequence. The slider reaches its physical end stop.
- 1.43–2.37: the operator takes the detached tab aside, clearing the center. The front specialist receives the GitHub seal; the team steps toward the opening.
- 2.37–3.40: the leader crosses in front of the zipper threshold and the others advance behind him, feeding the existing workshop cut.
- Audio: tab grab, two zipper strokes, staggered power contacts, end stop, panel movement, seal catch and accelerating steps. Separate cue list from MAGNET.

## Reviews and revisions

First review used matched 0.0/0.4/0.8/1.2/1.6/2.0/2.4/2.8/3.2/3.4s frames, plus full-frame mobile layout.
Corrected MAGNET capture timing so the third tool lands before the core forms, moved the lead away from the left crop, and made the operating hand transfer to the core instead of growing a second arm.
The final MAGNET framing pass also raised the magnet above Claude’s eyes, reduced the backward lean, and gave each specialist its own entrance driver.
Corrected ZIPPER shoulder and wrist positions using actual rotated coordinates, started the opening sooner, lowered the initial tab out from under the header, enlarged the workforce, and allowed its leader to cross in front of the opened room.

## Rebuild

In video/, install the existing locked Remotion dependencies, then:

    node node_modules/@remotion/cli/remotion-cli.js render src/ec151-hooks-index.tsx ECC151B magnet-native.mp4 --concurrency=3 --crf=16
    node node_modules/@remotion/cli/remotion-cli.js render src/ec151-hooks-index.tsx ECC151C zipper-native.mp4 --concurrency=3 --crf=16

Full compositions preserve the global progress rail and caption timing even in a frame-range preview. Do not render these hooks as shortened independent compositions.
Audio master files contain the exact original PCM after 3.4s. The replacement opening uses the original voice, same soundtrack passage and its own contact stems.

## System references

- memory/three-cuts-three-hooks.md
- memory/dhash-passes-while-cuts-are-identical.md
- docs/TRIAL-CUTS.md
- memory/reel-hook-preview-artifacts.md
- memory/alex-ecc-continuous-action-and-reveal-gating.md
- memory/reel-motion-hierarchy.md (including ECC qualification)

Distinct mechanisms and choreography establish the creative difference. Hash distances and motion scores are review diagnostics, not proof of audience response.


## Frame-zero audience signal revision

Alex specified that hook scenes must signal Claude immediately so the intended audience can recognize relevance before the payoff. A mascot or the small shared header badge alone was insufficient for this request. Both operated props now carry an opaque, high-contrast official Claude mark without a CLAUDE text label at frame 0, with no entrance delay. The zipper starts slightly lower so the entire identity plate clears the headline. The later GitHub result remains intact. Full-frame first-frame checks verified visibility and legibility; no audience retention or filtering outcome has been measured.


### Logo-only correction

Alex subsequently requested the logo alone. Removed the CLAUDE label from both prop plates and centered/enlarged the official logo in the same housing. This supersedes the name-label treatment described in the earlier iteration record.
