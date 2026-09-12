# V9 — action, source-join and retention revision

September 11, 2026. **Full-length Remotion review exported; machine checks and sampled visual QA passed.** Not new creative/listening approval and not a published video. Previous outputs and source recordings remain intact.

## Current cut

47 selected source segments, 13,846 frames, 30 fps, **461.533 seconds / 7:41.53**, six chapters. V8 was 473 seconds. The net reduction is 11.467 seconds, limited to the explicitly requested recap removal and targeted join repairs, including restoration of the clipped sentence lead-in.

Active graph: `video/src/youtube-roughcut.tsx` → `RoughCut.tsx` → `YouTubeV9.tsx`, `ScenesV9.tsx`, `SupportingScenesV9.tsx`, `NarrativeV9.tsx`. Existing original character/material code is reused; historical V8 sources remain available.

## Request coverage

| Old review location | V9 implementation |
|---|---|
| Opening / all full explainers / closing need more motion and complete actions | Increased functional choreography across opening inspection/checkout, production, wrapper, direct model access, roadmap and closing; rebuilt guide and instruction-kit sequences. The [motion map](motion-map-v9.json) names beginning, action and payoff for every full-scene slot. Shared primitives do not imply repeated whole scenes. |
| ~0:30 text white on pale card | Black text on the white optical-glass teaser; rendered contrast checked. |
| ~0:35 unfinished/static animation | Guide opens into a miniature directed shot; tools deploy, perform and repack into the skill; courier receives it. |
| ~2:27 irrelevant oversized animation | Removed the s015 request/response wrapper overlay. No narration deleted. |
| ~2:40 more informational action | Private credential sequence: create → copy → store securely → close lock. Explicit illustration, actual secrets fully masked. |
| ~2:54 more motion/concept | Model/connection instruction kit → directed pursuit shot → consolidated file → Claude install and command. |
| ~3:45 exact pro tip | Larger, bolder PRO TIP; “Guide the camera like a movie director”; orbit/shot miniature. Corrected placement so active typing remains visible. |
| ~4:16 support actual narration | Recorded Wan 2.2 / Hailuo 2.3 / LTX 2.3 options and on-screen 10¢ / 49¢ / 53¢ estimates, with selection action. No wrong Google/Seedance alternatives and no generic budget-stop dial. Illustrative optics are not claimed as brand logos. |
| ~4:41 “or” glitch | Original-source repair: s026 end 1301.95→1301.70, s027 start 1313.02→1313.20. Removes duplicated/truncated conjunction boundary without deleting the option explanation. |
| ~4:41 generic intrusive checks | Small lower-left rooftop pursuit/camera-follow scene; removes approval-checkmarks. Preserves main source and facecam. |
| ~5:18 automatic camera direction and optional manual control | Visual cue switches from default camera movement to user-directed vision. The new **spoken** sentence awaits Alex's OBS pickup; no synthetic narration inserted. |
| ~6:35 model transition glitch | s035 end 1898.04→1898.01; s036 start 1981.23→1981.33. Protect wind ending and clean Seedance entry. |
| ~7:01 missing beginning | s037 starts at 2015.65 rather than 2017.60, restoring the original lead-in to “Second of all…”; short matched person-matted camera extension generated, 412 frames, zero missing masks. |
| Remove “Do you remember…” recap before “Can you spot the difference?” | Remove s039–s041; s042 begins at 2223.60 instead of 2220.75. Keep the question, actual identification and concluding next step. |
| ~7:19 coming-up incentive | Bottom-left cue at new 7:18.97 previews the existing free guide + skill file. No distinct unidentified bonus advertised; awaiting user confirmation. |
| Document/index/push entire conversation | Current-direction contract, full decision ledger, learning index, preserved prior notes, project repair map, source timeline, chapters, provenance and reproducible QA scripts. |

## Preserved contracts

- OBS is sole recorded speech; all Sony/video elements muted. Camera sources and measured offsets unchanged.
- `roughcut-v8-baseline.props.json` plus `audio-repairs-v9.json` lock every authorized difference. Every other source range and order is unchanged.
- Existing v7 person plate and no-code extension reused. For s027/s030/s033, cumulative rounding needs one extra picture frame: explicitly hold the last valid baked frame, never sample the next unrelated shot. No audio time-stretch or additional speech cut.
- Current Higgsfield film contains 2D Claude, no original/recreated CGI companion. Original source asset preserved.
- Opening centered face crop, independent inset crop, moving full-to-inset geometry, menu/Dock crop, private-source masks and safe real-input focus retained.
- No stock result loop in supporting review cards. Camera miniatures are visibly illustrations, not substituted generated proof footage.
- Thirty source-anchored support cues, ten full-scene slots, five PART navigation cards and 91 quiet material SFX events. Counts establish inventory, not artistic quality.

## Verification

- `tools/test-v9.mjs` passes EDL delta lock, source bounds, original camera offsets, plate source/hash/coverage, one-frame boundary allowance, privacy masks, muted video, deterministic TS/TSX parsing, unique scene identities and all focused input-box corners.
- Reviewed rendered frames across the opening, guide, wrapper/direct/gating, keys, skill, pro tip, options, chase, camera direction, coming-up and final throw/catch/result. Corrected guide label/sprite overlap, skill caption/facecam overlap, pro-tip/input overlap and source-model mismatch before full render.
- Delivered `outputs/higgsfield-replacement-edit-v9.mp4`: 145,252,775 bytes; exactly 13,846 frames, 1920×1080/30, 461.533333 seconds. Full audio/video fatal-error decode passed, all six embedded chapters match, and all six picture chunks match current source hash `1856c4ba087e6e6d1295f9f1243b8f86a0f1654e939ed69575887e2d3aa6a2e5`. [Export evidence](verification/export-v9.json).
- Final AAC is 48 kHz stereo, −16.57 LUFS integrated, −0.97 dBTP estimated true peak, 4.9 LU range. Thirteen final-file OBS waveform samples pass: maximum absolute lag 0.3125 ms; aligned correlations 0.9431–0.9958. This is sampled audio alignment, not a full listening or optical lip-sync verdict. [Audio evidence](verification/audio-sync-v9.json).
- Final-file short-window ASR retains “Or option B…”, “And now let's take a look…”, “Second of all…”, the shortened “Can you spot the difference?” transition and closing “minutes.” No standalone `cut` detected in these five windows; proper-noun ASR errors are analysis only. [Join evidence](verification/final-joins-v9.json).
- Encoded visual samples span opening, guides, keys, skill, pro tip, source-model options, chase, camera direction, late results, coming-up/reveal and the final lift → throw → catch → install → first-shot payoff. Full delivery includes the revised middle and ending, not only an intro pilot.
- Video/motion/audio skills informed causal choreography, boundary handling, source-clock safety and verification; the explicit Remotion engine choice remained authoritative.

## Repository delivery

Current direction, learning index, decision ledger, complete revision sources/history and reproducible tools were pushed to `main` at `2535a41`, preserving newer unrelated remote reel work through normal merges. Final QA evidence is committed in the follow-up delivery commit. Large original media and rendered MP4s remain local; GitHub holds code, documentation and metadata, not the video binary. No source media or older export was deleted.

## Pending publication inputs

See [RETENTION-AND-PICKUPS.md](RETENTION-AND-PICKUPS.md). Actual A comparison, matched B cost proof, exact setup/location and model-switch clarification, optional claim corrections, new camera-direction VO, bonus identity/asset, remaining SFX rights and Alex's creative/listening approval are not completed by this render. Keep them explicit.

Music credits remain: “Chase Pulse Faster” and “Hitman” by Kevin MacLeod (incompetech.com), CC BY 4.0, https://creativecommons.org/licenses/by/4.0/ . Include attribution when publishing. No new paid assets or voice clone created.
