# V16 — uncluttered hero actions and reactive roadmap

September 12, 2026. Alex rejected V15's price footers, enlarged blurry command screenshot, small scene elements and weak roadmap reactions. This revision targets those three scenes, not a new whole-film animation pass. Remotion remains the engine.

## Changes

| Time | Concrete change |
|---|---|
| 7.333–15.000 | Removed both “Recorded examples…” / unequal-cost footer lines. Large physical billing strip, real Higgsfield/Claude logos and a 350px original Claude operator. Prices retain their separate units, approximate sign and short local qualification; no unsupported savings multiplier. |
| 15.000–19.333 | Removed blurry `/fal-video` OBS magnification. A 320px skill file is carried by a 356px original operator, inserted into a large Claude working bay and activates the model logos. A cinema-camera response leads into the output. This is clearly authored illustration, not fabricated recorded UI. |
| 19.333–23.667 | Actual OBS result at source 1530s plays in a 1610px-wide viewport. Desktop/menu/player controls are cropped away. A compact saved-to-computer payoff replaces the little laptop and multiple secondary labels. “Demo preview” identifies the excerpt. |
| 23.667–27.000 | Full-screen roadmap with no competing presenter inset. Oversized key/socket, detailed cinema camera and paired real comparison videos. Courier travels between stops; the key turns, clapper closes, lens reacts and folded comparison panels open. Each contact has a bounded glow, radial accents and damped recovery. |

Opening blind A/B footage, teaser, free setup guide, later animations, all narration/EDL repairs, screen crops/privacy masks, chapters and ending remain V15. No CGI, synthetic voiceover, new source cuts or universally free-generation claim.

## Rhythm and sound

Rhythm is carry → insert → activation → large playing payoff, with overlapping 0.15–0.5s actions rather than a static screenshot. Roadmap uses a brief arrival hold between fast traversals. Contact response uses a shared driver, following motion-design control/target synchronization and reactive recovery principles; it is not a constant ambient glow.

Roadmap local contacts are 0.4s, 1.667s, 2.933s (fractions .12/.50/.88 of its 3.333s duration). At global frames 722, 760 and 798, the existing `latch.wav` cues coincide with the arrival and prop response. **No new sound file or louder mix is claimed:** the revision re-choreographs visuals onto the existing three quiet cues, preserving the entire sound contract. A brighter pitched ding can be auditioned separately if requested; do not describe the retained latch as a newly generated bell.

## Proof and packaging boundaries

The early skill insertion is an illustration; unlike V15 it is no longer an actual command-entry recording. The generated result is actual recorded footage, and the full tutorial still demonstrates setup and invocation later. Do not claim that early illustration establishes cost, feature parity or benchmark equivalence. Plan example and per-generation estimate remain different units.

Alex supplied the thumbnail after V15: pointing presenter, `/REPLACE`, green 10¢, orange Claude standing over lime Higgsfield. Its promise is replacement plus low cost, not just a blind quality comparison. The exact title is still missing. First-five-second packaging options remain proposals; V16 does not silently redesign the opening or spoil blind identities. Do not keep asking for the thumbnail as though it was not received.

## QA / delivery

Initial still review caught clipped local price text, contact with Claude's hat and an insertion endpoint that missed the bay. Corrected before rendering. Second review includes 13s, 17.85s, 20s, 23s and roadmap contact/recovery frames. The roadmap presenter exclusion is deliberate and restricted to s006.

Run `tools/test-v16.mjs`, then optional original-workstation `tools/prepare-v16-cache.mjs`, using the full path from the task root. Render with `REVIEW_OUTPUT=outputs/higgsfield-replacement-edit-v16.mp4 REVIEW_CONCURRENCY=1 REVIEW_SUBCHUNK_FRAMES=600` and the existing `render-low-storage.mjs`. Validate with `REVIEW_REVISION=v16` and `validate-v12-export.mjs`. Cache proof compares against V15 commit `829e2e923c0539e328a212c4397f1b4a2a0f837f`, permits changes only in frames 220–809 and freshly renders frames 0–1199. Other source/audio inputs must match exactly.

Status: full V16 export and validation passed. Output `outputs/higgsfield-replacement-edit-v16.mp4` at task root: 1920×1080, 30 fps, 13,713 frames, 457.1 seconds, 164,491,686 bytes and six chapters. Every picture/audio frame decodes. AAC is byte-identical to V15 (−16.56 LUFS, −1.24 dBTP); every decoded picture frame after 40 seconds matches V15. The targeted source change ends at 27 seconds; the 27–40 second interval was conservatively re-rendered with unchanged scene source. Source fingerprint `31c7653524b4aea34035bb9c8a1621d8309330d41fe167119c98163be0940687`. Corrected stills and encoded workflow/roadmap action sequences reviewed. [Verification receipt](verification-v16.json). No creative approval or full human listening review claimed.

[V15 history](REVISION-V15.md) · [Mac handoff](OTHER-MAC-HANDOFF-V16.md) · [Current direction](../../CURRENT-DIRECTION.md)
