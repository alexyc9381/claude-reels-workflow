# V7 opening revision

- Replaced 1.32–1.49× opening punch-in with near-original 1.015× foreground framing.
- Simulated dolly zoom: clean background scales 1.01–1.16× over 58 frames while the live subject stays steady.
- Live foreground extracted frame by frame using Apple Vision accurate person segmentation; mask contracted 5 px and feathered 0.65 px.
- Full-screen hold through frame 60; existing split reveal finishes at frame 76. Clean composite fades into original footage at frames 70–76, after the narrower camera card excludes the bed.
- Existing audio, speech timing, graphics and community CTA retained.
- This is a post-production simulation using a generated room plate, not a physical camera dolly.

## Background asset provenance
Built-in image generation tool; source `work/v5-full/frame-0.png`.
Output: `public/dolly-room-plate.png`.
Prompt: Create a photorealistic CLEAN BACKGROUND PLATE for compositing this exact talking-head video. Preserve the original 16:9 framing, camera angle, warm tan wall color and soft indoor lighting. Remove the man entirely including hair, face, body, hand and microphone. Remove the bed and bedding in the bottom left entirely and replace with seamless plain continuation of the tan wall. Reconstruct only what was behind the man: continue the existing straight vertical dark wood acoustic slat panels naturally behind where his body and head were; keep their current bounds and apparent perspective. Keep the existing green plant on the right and the wall switch on the far right in exactly their original locations. Keep the original mild background softness. No people, silhouettes, furniture, bed, new objects, lettering or logos. The result should look like an empty version of the same room, NOT a redesign. Landscape 1920x1080 or 16:9.
