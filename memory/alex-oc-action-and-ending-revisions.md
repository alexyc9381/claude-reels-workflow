---
name: alex-oc-action-and-ending-revisions
description: OC rejects random shapes and weak contact; expressive fighting hook, concrete construction, shield destruction, late keyword reveal and exact spoken endpoint, plus caption and article delivery corrections
metadata:
  node_type: memory
  type: feedback
  source: OC revision conversation on September 12 2026
---

# OC action and ending revisions

Read before a scene revision described as basic shapes, an unconvincing smash, or a boring comment ending. The [150 OC revision log](reels/oc-factory-log.md) records the before/after scenes and delivered evidence. These notes separate Alex's requests from the production choices that answered them. Delivery and technical checks do not establish creative approval or retention.

## Replace the concept when the subject does nothing

Alex rejected the hook and scenes around 7, 10, 14 and 18 seconds as basic squares and rectangles. After an initial overhaul, he singled out 10 seconds again: “random shapes” and “its not even an animation.” The floating tool-pod revision remained an insufficient depiction even though it contained movement.

The final replacement shows Claude driving a bridge anchor down with two hammer strikes while the octopus tensions and pulls a planked bridge across a canyon. It leads into the existing bridge load test. This was an authored solution, not a user-prescribed bridge design.

Reusable check: name the actor, verb, contact and changed state before adding polish. Can a viewer describe the action without reading the header? Does the result feed the next scene? Renaming a rectangle or moving more tool icons does not answer a rejected concept. The underlying rectangle primitive is not banned; anonymous containers carrying the whole meaning are the problem.

## Hook identity and character performance

Alex asked for slightly bigger opening logos, a more interesting octopus, steam or anger, and possibly fighting Claude. He supplied the header wording “AI Arguing = 10X Output” and requested a slight opening zoom.

The revision enlarged the authentic AI marks, gave the octopus independent tentacle attacks, steam, gritted teeth, gaze and surprise, and made Claude duck, parry and react to contact. Warm/red changes reinforce anger; purple alone was not sufficient characterization. The shared header renders the supplied wording in house uppercase. The numerical wording is requested copy, not a measured result.

Review the opening as moving action, not just a thumbnail. Use the small zoom to support hierarchy; the tentacle sweep and reaction must still read without it. Keep both faces clear. In later scenes the original Claude rig inspects, hammers, recoils and boards a rocket; an idle bob does not substitute for those jobs. Do not change the house mascot anatomy to create expressiveness.

## A smash needs damage and a consequence

Alex's later note asked for the 15-second scene to look as if it was actually smashing the shield/lock, breaking down with red sparks and possibly an alarm.

The final security scene uses alternating steel rams, visible contact, displacement and recoil. Successive blows create red fractures; the final blow separates four jagged shield pieces and tears the padlock open. Contact sparks, a red beacon and a short audible alarm accompany the failure. Claude jumps back, then inspects the exposed bug.

Stage anticipation, contact, deformation and follow-through in that order. Make damage accumulate on the struck object. A spark overlay on an intact shield is decoration, not destruction. Inspect the actual strike frames and the following frames; an effect scheduled after a cut contributes nothing. Time sound to contact, and verify it in the mixed audio as well as the cue list.

## Keep the ending active and reveal the keyword when requested

Alex asked to end “right when i say OC,” to make the final scene interesting rather than merely showing OC, and to show OC near the end. The final scene hands over a setup scroll, boards Claude into a rocket, then launches while the trailing banner reveals OC.

For this reel only, every keyword surface is hidden until frame 582 at 30 fps: main banner, header and karaoke caption. Frame 581 has no OC; frame 582 reveals it. The reveal lasts 14 frames, about 0.467 seconds. Checking only the banner would miss an early leak in the header or caption.

The final cut is the exclusive frame boundary 596/30 = 19.8667 seconds. The last measured 5 ms VO window above -40 dBFS ends near 19.865 seconds. Preserve the C consonant; do not cut on the word's estimated onset. Music stops at 19.73 seconds, effects at 19.77, and the voice gets a 3 ms endpoint fade. The launch continues through the last visible frame, with no held card or audio tail.

This late reveal is OC-specific. Do not override another reel's explicit early-CTA requirement or replace normal caption timing globally. Generalize the method: inspect every text surface, measure the final spoken sound, and keep useful action alive through the endpoint.

## Rendering and delivery lessons from this session

- SVG image marks briefly appeared blank on a scene's first encoded frame. Root-level Remotion Img preloads made the images render-ready. Check the first frame of each cut, not only mid-scene proof images.
- The staged editable package was compared with the live source and assets, then a frame was rendered from both. Pixel equality at one frame proves that frame only; pair it with complete input hashes and final-file checks.
- A shortened soundtrack changed the sound gate outcome. The final mix removed the problematic paper-slide cue, used contact Foley, and retained 27 cues. Re-run audio checks after changing the endpoint.
- The first post caption buried the CTA. The final caption restores the existing [comment-first structure](caption-structure.md): first non-empty line Comment OC, next non-empty line READ BELOW, spaced value, closing CTA, then hashtags. The first and last CTA name the same guide. Keep copyable HOW in the article.
- The article was initially missing. Complete the live article, verify its public URL and download, and put an article-link file beside the final MP4 and caption in the numbered Drive folder. A ZIP and a storyboard do not satisfy the promised guide.
- On this Mac's Drive mount, copy2 replacement previously recreated file IDs. An in-place write/truncate/fsync preserved the canonical IDs in this run. This is observed behavior, not a universal Drive guarantee. Verify the server's name, size, modification time and URL after sync; local copy success is insufficient.
- The article converter reads direct run formatting, not all inherited Word styles. Headings and copyable prompts flattened on the first build. Verify generated blocks and the actual page, then verify the download too. Publishing through the site's GitHub integration succeeded after the local CLI deployment was not authorized.

Related: [animation craft](../docs/ANIMATION-QUALITY.md), [opening](../docs/THE-OPEN.md), [DEPARTMENT proof](alex-department-source-and-motion-proof.md), [Drive delivery](social-assets-to-gdrive.md), [final storyboard](../storyboards/150-oc.md).
