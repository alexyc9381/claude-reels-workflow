# V18 — presenter-first opening and clearer intro hierarchy

September 12, 2026. Latest request: restore the large opening presenter moving into the bottom inset; add a 0:38 cue pointing to 2:03; focus animation work on the first 30 seconds. This supersedes the V14/V17 small-face-from-frame-zero direction. It does not authorize a new narration edit or claim later scenes were rebuilt.

## Implemented scope

| Output time | Change |
|---|---|
| 0–1.6s | Large presenter, brief opening push, then an eased 1.05s move beginning at 0.55s into the bottom-center inset. Two-degree tilt and lifted travel arc preserve frame clearance. |
| 1.6–7.33s | Preserve dominant playing comparison clips and large blind 1/2 numerals. Orange perimeter timer still ends with the comparison. |
| 7.33–15s | Large persistent Higgsfield/Claude identities; recurring invoice versus one per-generation ticket. Claude pulls/sends the ticket into a playing result; values stay out of the actor lane. |
| 15–23.67s | One skill is carried into one Claude workspace. Models activate, then real result footage expands from the workspace into the dominant output. A computer-save payoff closes the action. |
| 23.67–27s | One unfolded map and route. Connect → load skill → compare, with one active destination, original courier, real paired outputs and contact glows using the existing roadmap sound clocks. |
| 27–30s | Existing reaction teaser retained; no new teaser wording, audio, blur or timing. |
| 38–43s | White-glass “Skip to tutorial · 2:03 →” at upper right, separate from the existing upper-left chapter card. 2:03 is a 1.1s preroll to the existing 2:04.1 tutorial chapter. |

No EDL, camera source, privacy mask, speech, music, SFX schedule, tutorial, later reveal or outro changes. CGI remains absent. Full delivery remains 7:37, not a hook-only replacement.

## Short-form concepts transferred

- Inspected `video/src/WorldKit.tsx`: clear foreground/contact plane and a primary light establish subject hierarchy. Adapted these principles to the existing cream/orange landscape stage, not the portrait dark-panel chassis.
- Inspected `video/src/ClaudeCrewReel.tsx`: original character lineage, role clothing and cause-driven expression. Reused this film's established `Actor` adapter rather than introducing a new mascot.
- Inspected `memory/alex-abstract-animation-and-audible-sfx.md`: action verbs must produce a consequence; anticipation, travel, contact and recovery; one dominant event; don't copy rejected SETUP scenes.
- Inspected `editing-styles/STYLES.md`: credibility-first default, not a game-world reskin. This film's newer Manrope/white-glass directions override the short-form serif/dark-panel defaults.
- Motion skill principles: linked displacement, bounded press/contact recovery, route drawing and explicit seek-safe clocks. Implemented in Remotion, as requested, not migrated to HyperFrames.

## Review and limits

Delivered full V18: 1920×1080,30fps,13713frames,457.1seconds,163971909bytes. Current-source receipts and full audio/video decode pass;6chapter markers match. AAC measures−16.56LUFS/−1.24dBTP. Audio packets are identical toV17; every decoded picture frame after50s is identical toV17. Final source fingerprint: `c1968e13c52a67f1cfebc82615626b54adffb29f6a85d0f7447154f7a8cebdbd`. [Machine receipt](verification-v18.json).

Initial still review caught a facecam travel frame dipping below the canvas and previews lacking a positioned clipping parent. Corrected both; separated cost qualifier and preview; removed the residual roadmap file once loaded. Encoded sequence review then caught workspace text showing through the expanding video. Complementary exit/entry opacity envelopes now clear the workspace before the result becomes visible. Re-rendered the transition including its frame600 boundary. Inspected entrance, transition, price, workspace, output, roadmap arrivals and skip cue at full-frame and small-player scales. Technical validation and encoded review results are recorded in `verification-v18.json` when complete.

No claim of measured retention improvement, final creative approval or full human listening approval. The comparison assets remain the user-confirmed sources. Monthly plan example and per-generation estimate are different units, not a measured savings ratio. No new price verification or feature-parity claim. The thumbnail is supplied; exact title remains missing and is not a blocker for this scoped edit.

## Reproduce from task/handoff root

```sh
node work/repos/claude-reels-workflow/youtube-video-editing-system/projects/higgsfield-replacement/tools/test-v18.mjs
REVIEW_CONCURRENCY=1 REVIEW_SUBCHUNK_FRAMES=300 REVIEW_OUTPUT=outputs/higgsfield-replacement-edit-v18.mp4 node work/repos/claude-reels-workflow/youtube-video-editing-system/projects/higgsfield-replacement/tools/render-low-storage.mjs
REVIEW_REVISION=v18 node work/repos/claude-reels-workflow/youtube-video-editing-system/projects/higgsfield-replacement/tools/validate-v12-export.mjs
```

Original workstation only: `prepare-v18-cache.mjs` proves the unchanged V17 source tail through exact source reversal before reusing it. Fresh picture range 0–1499; original soundtrack preserved by its audio contract. On another Mac, skip cache preparation and render fresh. Historical-export identity checks report null if V17 is unavailable. Do not run historical version-specific source tests against a newer revision.

Optional `prepare-v18-transition-cache.mjs` proves the subsequent opacity-only refinement against the committed first V18 source, with frames300–899 rendered again. Historical first-pass code is retained in Git; it is not a separate creatively approved delivery.

Output: `outputs/higgsfield-replacement-edit-v18.mp4`. Editable local package: `Documents/NoCodeAlex-Higgsfield-V18-Editing-Handoff`; see [handoff](OTHER-MAC-HANDOFF-V18.md). No Drive upload or publication implied.
