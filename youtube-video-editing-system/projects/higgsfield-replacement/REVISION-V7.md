# v7 — character-led full-film revision

September 11, 2026. Remotion edit; review revision, not a claim of new creative approval. Original recordings and v1–v6 exports are retained. No GitHub push or publication.

## Current delivery state

Completed full review export: `outputs/higgsfield-replacement-edit-v7.mp4`, 149,103,492 bytes, 14,190 frames / exactly 473 seconds, 1920×1080/30. Final decode, six chapter markers, audio levels, sampled OBS alignment and current-source render-hash checks passed. The file ends on the intended picture clock; the audio-filter tail is not retained. `QA.md` records the evidence. This is a review delivery, not new creative or factual approval.

## Request → implementation

| Feedback | v7 change |
| --- | --- |
| Blur the room, not my face | A silent, output-clock camera plate uses Apple Vision per-frame person segmentation. Original sharp foreground is composited over a 10px room blur, with a small feathered edge. No fixed oval mask or whole-face CSS blur. All 14,281 frames obtained a mask. |
| Bigger first-five-second videos; consider center facecam | Two 885px-wide A/B screens. Presenter sits bottom-center underneath them; prices occupy separate left/right zones. The opening full-camera move decelerates quickly. |
| Orange aura around the clips from 0–4 seconds | Rounded-perimeter SVG traces, layered optical glow; completed at four seconds and faded out. |
| 0:11: less text, use Claude to explain | A sprite carries a request to a glass access gate; a plan/lock controls access to real model-logo alcoves. Anticipation, recoil and gate-lift action replace repeated price cards. |
| 1:04–1:09: don't freeze, explain model access | A new request/model/result sequence advances through the direct-model explanation; the following feature-gating sentence triggers a fresh gate scene, not a frozen previous card. Source-anchored `r-direct` / `r-features` timing is authoritative. |
| Roadmap should look like a roadmap | A curved map route with destination pins, topographic context, key/camera/result landmarks and an actor traveling along the actual route. |
| 0:34 skill handoff | A courier physically walks the file over to the receiving Claude, which carries it inside and loads it. |
| Duplicate fix-later cue | One continuous reminder across `s013` / `r-safety`: “Keep watching or skip to 4:10.” This derives from the new `s024` timestamp, not a hardcoded old edit time. It is a requested-budget guide, not evidence of an enforced billing cap. |
| Menu bar and Dock | Source crop y=32…1002 on every OBS shot. All four measured input-box corners remain within the viewport at every sampled frame of every typing-focus interval. Redacted account/API screens are fully masked before the explanatory overlay. |
| Unnatural ~3:02 join | Preserve the whole original “no additional lines of code…download it” clause at 972.2–977.5333, then use 987–988.2833 for the upload continuation. The actual frame-quantized Remotion audio audition retains “code” and the complete instruction. Remove the repeated setup, trailing silence and the next take’s stray “Now”. No synthesized word or camera audio. |
| ~3:18 readable text with Claude | A white-glass enlarged inset uses the real synchronized OBS pixels, including live selection/cursor changes. A 2D actor introduces it; no invented replacement text. |
| Pro tips near 3:47 and later | Camera-directing mini-scene with a moving camera path; additional storyboard, framing, output and sound-layer treatments vary the layout. Typing graphics/camera stay away from the actual input field. |
| Cut the billing detour | Remove selected `s028` entirely and join to the original “alright, let's take a look” results section. No other complete teaching segment was removed. |
| “cut cut” around 4:27 | The story explanation now starts at clean “it proposed…” (1286.72), keeping the useful options and ending at 1301.95, before the adjacent raw cut/cut markers around 1303.18. The sampled prior encoded region did not transcribe a literal cut marker; final mix is checked separately. |
| Equal eyes | Original Claude anatomy retained; both eye apertures are driven by the same value. Expressions, blinking, gaze and recovery remain. No asymmetric curious-eye preset. |
| Remove CGI | No 3D/CGI companion in active v7 composition. Original asset retained on disk, not deleted or recreated. |
| Distinct, more physical closing | Separate throw variant: lift, wind-up, ballistic file arc, catch/recoil, carry, insert, loaded command. Not a replay of the earlier horizontal handoff. |
| Not always a lower-left bar | Upper-right brand medallions, upper-left camera tips, real-text lens, model-logo arc, budget dial, typing actor, sound layers and the retained useful definitions. The “Fine detail” definition is removed. |
| Professional animation / sound | Manrope, white glass, orange/teal/gold, purposeful large character actions, safe margins and minimal labels. No costumes or cartoon machines. Ninety quiet source-clock SFX cues use paper/servo/latch/click/typing/land/whip/zip; no default ding. Existing credited music remains dialogue-first. |

The authored screen overlay inventory is 32 cues plus a single joined budget reminder, five chapter cards and nine full-screen scenes. Underlying footage/slides remain the user's actual recordings; their embedded typography is not rewritten.

## Reproduce

Run from this task's original directory. Media stays outside Git.

```sh
xcrun swiftc -O work/repos/claude-reels-workflow/youtube-video-editing-system/projects/higgsfield-replacement/tools/person-background.swift -o work/higgsfield-replacement/revision-v7/person-background
work/higgsfield-replacement/revision-v7/person-background work/repos/claude-reels-workflow/youtube-video-editing-system/projects/higgsfield-replacement/person-plate-v7-input.props.json work/higgsfield-replacement/public work/higgsfield-replacement/public/v7/presenter-background.mp4
work/higgsfield-replacement/revision-v7/person-background work/repos/claude-reels-workflow/youtube-video-editing-system/projects/higgsfield-replacement/person-plate-v7-no-code.props.json work/higgsfield-replacement/public work/higgsfield-replacement/public/v7/no-code-complete.mp4
node work/repos/claude-reels-workflow/youtube-video-editing-system/projects/higgsfield-replacement/tools/build-v7.mjs
node work/repos/claude-reels-workflow/youtube-video-editing-system/projects/higgsfield-replacement/tools/test-v7.mjs
REVIEW_CONCURRENCY=6 node work/repos/claude-reels-workflow/youtube-video-editing-system/projects/higgsfield-replacement/tools/render-low-storage.mjs
node work/repos/claude-reels-workflow/youtube-video-editing-system/projects/higgsfield-replacement/tools/validate-v7-export.mjs
python3 work/higgsfield-replacement/verify-v7-audio.py
```

The person tool refuses to overwrite an existing output; skip the two preprocessing commands when the verified media already exists. Its `startFrom` is the explicit **cameraPlate.starts[id]** mapped frame, not the new output frame or original camera time. Most rows trim exact subsets of the original 14,281-frame plate, recorded in `person-plate-v7-segments.json`. The complete no-code clause uses its own 160-frame `no-code-complete.mp4` source override with zero missing masks; `build-v7.mjs` checks coverage and records its hash. Use the corresponding saved input props to regenerate each plate, not the current trimmed EDL. The script samples the original muted camera footage using the measured OBS offsets and the same 30fps source-start rounding as Remotion. No new model download or cloud face upload is involved.

An intermediate render reused the unchanged silent intro after the dialogue repair. Final chapter-pose QA then caught a legacy pixel-valued lift being passed to a normalized 0–1 gesture. That is corrected to 0.7, with a regression test. **Every final picture chunk is freshly rendered**, including the intro. `tools/reuse-v7-intro.mjs` is historical evidence only and deliberately fails its exact-source assertion on this later pose change.

The continuous 473-second soundtrack is reused across that picture-only pose correction after an identical v7 audio contract: manifest, source-clock scene/cue timing, narration code, music/SFX code, sound asset hashes and easing all match. `revision-v7/chapter-pose-audio-reuse.json` records the isolated change. Dialogue is not cut again or encoded separately at picture boundaries.

The renderer hashes the manifest, source code and new v7 plate; v7 never reuses v6 audio. Continuous OBS + SFX/music WAV avoids AAC seams at picture-chunk boundaries. Final mastering and chapter muxing are deterministic output steps, not a second editor.

## Publication inputs still needed

The left A comparison is still the explicitly requested placeholder. The right generated video is a real recorded result, not proof that that exact result cost 10¢. Pricing, a true billing-cap demonstration, the precise Claude setup and model-switch explanations need the previously listed evidence or optional voiceover pickups before publishing. See `outputs/higgsfield-voiceover-pickups.md` in the task directory. No fabricated pickup was inserted.

## Design mechanism references

Used the video/animation skills for source-first timing, screen safety and motion QA, while retaining the explicitly requested Remotion runtime. The installed registry examples `svg-stroke-trace`, `offset-path-traveler` and `ui-focus-zoom` informed the aura/route/lens mechanisms, reauthored as seek-safe React/SVG. Character contact uses press/release spring and reactive-displacement principles; the throw uses an actual parabolic arc rather than easing gravity to a stop in midair.
