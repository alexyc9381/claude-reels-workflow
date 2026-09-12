# V13 — purposeful intro motion and cleaner teaching

September 12, 2026. Existing Remotion composition, not a new editing system. Status: full V13 export complete; source checks, full decode, chapters, loudness and sampled encoded narration sync passed. Targeted encoded picture frames reviewed. V12 export and editable package remain preserved. Alex's final creative/listening approval is still required.

## Request → implementation

| Request | V13 change |
|---|---|
| Cluttered, unhelpful ~2:35 | One protected create → copy → private-storage illustration. Remove the competing API-key definition and end the four-step checklist before this scene. Real credentials stay masked. |
| Shaking text ~4:04 | Replace the format card with a fixed-position, opacity-only entrance. Animate the framing example, not the text. Remove competing whole-screen/typing zoom for s023; all other useful typing zooms remain. |
| Cursor starts playback during ~6:06 pause | Cursor arrives during the pause and presses the play symbol at ~6:08.80, immediately before measured recorded movement at ~6:08.9. Quiet click is coupled to the same event. Preserve the entire generated action and narration. |
| FREE setup in description | Explicit **FREE setup · description below ↓** in follow-along and closing scenes. The camera prompt pack remains a genuine local resource. Public download URL still requires publication confirmation. No new spoken pickup or synthetic narration added. |
| Hook timer around head | One orange perimeter stroke around the existing facecam, finishing on the last frame before the 7.33-second next scene. It spans the two spoken opening rows rather than restarting at their cut. |
| Faster, more detailed first 30 seconds | Accelerate receipt printing/pass scanning; three separately timed model shutters reveal moving, illustrated shot stages. Prompt upload, branch requests, model responses and saved-file states have shorter action timings and coupled restrained sounds. Keep actual comparison footage large, at normal speed and unaltered. No retention lift or “dopamine” outcome is claimed. |
| Copy/paste/free benefit at ~0:35 | New follow-along scene: copy reusable instructions → persistent payload travels → paste into coding-agent prompt → visible setup sequence. Not a replay of the closing carry/install scene. |
| Claude physically opens ~1:12 gate | Costumed operator uses a visible lever/drive linked to the shutter's rise; feet remain grounded. Exposed settings respond after opening. No floating idle mascot standing far from a magically opening panel. |
| Seedance 2.5 at ~1:03 | Direct-model selection explicitly highlights and labels **Seedance 2.5** (user-requested wording), rather than another logo. Selection is visible near 1:03. Model names in schematic scenes are not proof of the exact model/version or price used by any A/B result. |
| Roadmap labels obscured at ~0:25 | Labels move above the three action stations, outside Claude's travel path. Each station contact drives its own rim glow, material response and quiet latch accent; no continuous ding loop. |
| Center reveal countdown / round choices | One countdown circle at the center seam; circular **1 / 2** badges centered underneath each video. Remove LEFT/RIGHT wording. Preserve correct A/B media, brand identities and right-side winner crown. |
| Claude Code, Codex, Cursor in intro/end | Reuse repository brand marks in the early workflow, follow-along and ending. Found the installed `fal-video` skill in `~/.claude/skills/fal-video`; its standalone standard-library Python runner and offline checks support a shared backend, not a Claude-only implementation. No native installation or paid generation was tested across all three agents. Follow-along explicitly says setup varies by agent; no “all AI models” promise. |

## Timing and sources

- **No EDL changes from V12**: 47 rows, 13,713 frames, 457.10 seconds, 1920×1080 / 30 fps; six chapter times unchanged. Full props saved as `roughcut-v12-baseline.props.json` and current timeline as `v13-timeline.json`.
- OBS remains the sole recorded narration source. Sony files and every comparison/support video remain muted. All V12 camera-plate clocks, repaired word boundaries, source privacy, detail lenses and complete result playback are retained.
- V13 scene module: `video/src/youtube/ScenesV13.tsx`; shared existing scene modules and brand/cast remain active. `editVersion: v9` is still the renderer selector, not a delivery version.
- Cursor timing was grounded in encoded V12 imagery: frames remain stationary through ~368.8s and move strongly at 368.9s. No pause is falsely labeled as generation time.
- Existing `video/public/logos_official/{codex,cursor}.svg` copied unchanged into working `public/v3`. Media package includes them; source originals remain in Git. No newly generated/redrawn logos or downloaded voice recording.
- New sound cues reuse the existing ledgered sound library at restrained gains. Roadmap hit times are included in the audio-cache contract. One continuous soundtrack is encoded at final mux, never per picture chunk.
- Local skill inspection is recorded in [backend verification](verification/fal-backend-v13.json). Ran only `falrun.py --help` and offline `selftest.py`; all 13 pricing fixtures, routing and local rate-table checks passed. No account keys/config/ledger were printed, no funded API job was submitted, and the installed skill was not modified. This does not verify current provider prices, a universal importer, or every AI model.

## Verification

The full render encountered ENOSPC after completing its first 90-second picture chunk and continuous mix. Those verified outputs were preserved. Eleven inactive temporary JPEG directories from prior renders of this same project were visually/structurally checked, confirmed unused, and removed (roughly 1.3 GB total; regenerable, not source footage or deliveries). Rendering resumed with 300-frame temporary batches, unchanged source fingerprint and full-resolution settings.

`tools/test-v13.mjs` passed: unchanged V12 manifest/camera clocks, complete playback/end word, privacy, OBS-only audio, muted comparisons, single credential surface, stable format text, number badges/countdown, free CTA, actual sound-cue schedule and TS/TSX parsing. This is not a TypeScript typecheck.

Full export: `outputs/higgsfield-replacement-edit-v13.mp4`, **160,987,856 bytes**, **13,713 frames / 457.10 seconds**, **1920×1080 / 30 fps**, six verified chapters. Every picture chunk matches the current V13 source; no V12 picture chunks were substituted. All picture/audio frames decoded without error. Finished stereo 48 kHz AAC measured **−16.56 LUFS**, **−1.24 dBTP**, **5.1 LU LRA**. All 15 sampled OBS-to-AAC comparisons passed, with maximum absolute measured lag **0.3125 ms**. Four short-window ASR checks contain no `cut` retake candidates; transcription is machine evidence, not full human listening approval.

- MP4 SHA-256: `afba7815726a4d751dd98512b62e45b5ff5a54500e24f4759206b5abed30dfc9`
- Source fingerprint: `c4e4dbb9d8af94d37236539b2b4262acb1c0283052f1b9b73adc396bd7172598`
- Reports: [export](verification/export-v13.json), [audio sync](verification/audio-sync-v13.json), [joins](verification/joins-v13.json), [sampled encoded visuals](verification/visual-v13.json).

Encoded visual samples checked the continuous hook timer, circular identities, unobscured roadmap, copy/paste/free setup sequence, Seedance selection, gate opening, single protected credential surface, fixed-position format text, cursor-to-playback event, preserved landing/detail lens, centered reveal/correct winner and ending through the final frame. Sampled frame inspection and numerical checks do not establish exhaustive human listening, universal agent compatibility, or audience-retention improvement.

## Learnings to retain

1. One teaching surface per explanatory beat; navigation, definitions and demonstrations must not compete.
2. Keep text stationary while the illustrated object changes. Avoid simultaneous zoom systems that shimmer small recorded type.
3. A click, lever, impact or stamp needs an immediate, causally linked response at the actual content event.
4. Reserve distinct zones for video identity, countdown, facecam and brand reveal.
5. Character motion must act on the object and recover naturally; it is not a license to hide labels or levitate.
6. Increase intro action cadence without speeding footage, hiding comparisons or inventing model outputs. Every beat should add a comprehensible state change.
7. A workflow can target coding agents without claiming universal model compatibility. Verify the actual downloadable package before promising identical setup.

The animation skill informed causal coupling and settled actions; media-use informed reuse of existing brand/SFX assets. The user's Remotion, mature white-glass, Manrope/orange and footage-first direction takes precedence. Exact download URL, actual skill compatibility, comparison evidence/claims, rights/credits and Alex's final creative/listening approval remain publication gates.
