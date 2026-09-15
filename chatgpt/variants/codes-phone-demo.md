# CODES: handheld selfie and ChatGPT phone demonstration

Scope: ChatGPT account, script five / CODE, September 14, 2026. Consolidates the user's repeated revision instructions through delivered revision 14. The user requested these learnings be indexed on GitHub. Revision 14 was delivered and visually checked; no claim of subsequent user approval or measured retention improvement is implied.

## Format and camera

- Start on Alex's extended-arm selfie recording so it feels like he is holding the phone. Keep him centered, less tightly cropped, and clear of social UI safe zones.
- Use subtle, smooth back-and-forth handheld motion with small reversals and rotation. Frame-by-frame eye tracking was too choppy; a slow continuous drift was also rejected. Stabilize framing per shot, then add restrained motion. Inspect eyes throughout, not just one frame.
- Slight fast push-in at frame zero and each new spoken section. The final face-only scene gets a little extra handheld movement.
- Each spoken numbered/keyword introduction shows Alex full screen. The ending returns to full-screen, synchronized Alex with its CTA header, without phone/demo animation.
- During ChatGPT demonstrations, put the recorded camera behind the phone. Do not use an isolated bottom facecam or blank background. Do not shake the ChatGPT UI.
- This variant has **no added background blur** and **no background music**. These override the blur and Another Day of Sun defaults of the animated UNLAZY/FLOW formats. No watermark in any corner.
- Hide downward-looking footage behind the fully opaque response screen or use silent, forward-facing background footage there. The repeated problem was around 25-28 seconds. Never show unrelated speaking lips unobstructed against the external VO. Return to the matching synchronized take for face-only sections.
- Phone and background changes must occur atomically. No one-frame flash of a different camera take before the screen arrives or as it leaves; use an opaque screen from its first frame.

## Headers and captions

- Use TikTok Sans Bold, black text on snug white rounded blocks, matching the supplied TikTok references. Opening header is present at frame zero. Sections use numbered slash keywords.
- Opening: `CHATGPT` / `CHEAT CODES 😳`. Every shortcut has a slash: `/FBI`, `/ROAST`, `/THINK3`, `/COPY`, `/SHORT50`.
- Exact requested closing header: `Comment "CODE"` / `for More Free`. This explicit mixed-case copy overrides the general all-caps header default. The CTA keyword is singular **CODE**, not CODES. The earlier one-word CODE ending was corrected by the user.
- Headers were repeatedly too high and initially off-center. Use equal horizontal margins to center on the actual video frame; do not offset header alignment for bottom-caption safe zones.
- Delivered 1080x1920 revision 14: opening and ending `top:280`, section headers `top:350`, all `left:60; right:60; text-align:center`. Font sizes: opening96, section98, ending78. Previous top145/215 and195/265 placements were too high; left90/right140 caused a 25px left shift. These are reference coordinates for this crop, not universal positions. Check every header against moving eyes and hair.
- Bottom captions: mostly **one word at a time**, all caps, large bold white with a dark outline, no special effects or animation. Initial requests to remove captions were superseded. Keep captions separate from the headers and clear of platform controls.

## Phone interaction and sprite actions

- Default phone view is about17% smaller than the initial near-full-screen design (scale0.83). Keep native-looking ChatGPT chrome and realistic mobile keyboard key popups, including slash and numbers.
- During typing, quickly zoom and translate the screen to focus on the actual composer and typed code. Merely enlarging the whole device while leaving the composer at the bottom does not satisfy the instruction. Unzoom when the answer arrives. The later typing-zoom/unzoom direction supersedes a separate output zoom request.
- Useful implementation reference: phone1050x1900; base translation89.25,161.5 and scale0.83; typing-focus translation66,-655 and scale1.53, with eased entry/exit. Check each shortcut independently so context text does not push the code outside the crop. ROAST used its own composer line.
- Scroll responses with purpose; highlight a specific useful result with a red outline or selection. Keep all response text within bounds.
- Small recognizable ChatGPT sprite must affect the screen: reach to Send, point/check a response, carry an object, select or reward an answer. Idle floating or generic movement is insufficient. Keep arms attached and long enough; preserve expressive gaze, nods and reactions without covering text or controls.
- Concrete THINK3 payoff: sprite carries a crown onto the strongest option, releases it, then celebrates. Crown and WINNER label belong to the winning response and scroll with it. Reserve space above its text; hide any duplicate idle sprite. Sync the landing/chime with the spoken strongest-answer beat (raw18.88s in this source, earlier after cuts).
- This composition is authored UI, not an actual live screen capture. Do not present these shortcut labels as official hidden modes. The article explains their full instructions.

## Voice, pacing and sound

- Separate GarageBand voiceover is the speech source; camera audio is sync reference only. Preserve original1.0x camera/voice playback. Speed/pitch effects apply only to SFX.
- Remove leading silence and distracting gaps after the hook, after ROAST, between sections and near the closing sentence. Cut camera and VO together. Check waveform onset and consonant tails: transcript timestamps alone were wrong for the closing word Make.
- Keep a natural tiny separation rather than cutting into words. Audit the opening ChatGPT word specifically: earlier cuts clipped it.
- Voice gain requested:20% louder (linear1.2). Preserve that increase through mastering; a fresh normalization pass can undo it. Keep headroom and check clipping.
- Attention sound at0:00; audible fast pitched-up riser directly after the hook. Louder pencil/writing accents. Fast, even phone typing should be prominent and may continue beyond visible keystrokes as requested, without obscuring speech.
- Rotate at least three answer-confirmation sounds rather than one repeated ding. Action-match the crown chime, screen interactions and final ding. End with a ding after the final speech, without adding dead time.
- Use the real FBI Open Up door-breach GIF/video and knocking meme sound. End the visual around final3s, before the ceiling-collapse section. Current source3.10-3.45s maps to roughly2.73-3.08s after edits. Never confuse source timestamps with delivered timestamps.

## Delivery and checks

- Final reference:29.6s,888frames at30fps,1080x1920. Source33s/990frames with102frames of synchronized silence cuts. For new footage, derive its own edit map.
- Review the opening, every header, typing focus and answer zoom-out, all camera transitions, the downward-glance area, crown transfer/landing, and final face-only CTA. Full decode and timing checks supplement visual/audio review; they do not establish engagement.
- Render to a new filename per revision. Wait for encoder completion before QA or reusing paths; overlapping encoder processes previously produced an invalid MP4.
- Update existing Drive video and editable source ZIP in place with the Drive connector; verify returned byte sizes. Do not use the browser to retrieve Drive assets.
- Publish the promised lead magnet as a live article, not merely a DOCX. CODE promises the five reel prompts plus50 more. Index it under CODE, verify the real domain, guide listing and download, and commit source before declaring it delivered.

## Canonical delivery references

- [Video](https://drive.google.com/file/d/1eX9_I1320rP2ZSYRt_xXta6ARs_fEZca/view)
- [Editable source ZIP](https://drive.google.com/file/d/1ukvq-Oj2QiaM4I8zzFgt51CPo3qTCwE4/view): Remotion `src/Codes.tsx`, audio builder, original-time and delivered-time word maps, export EDL, finalizer and revision notes.
- [Article: ChatGPT Cheat Codes](https://chen.media/guides/chatgpt-cheat-codes),55 prompts; publishing source in `alexyc9381/chenmedialabs`, commit `f6a31d1`.
- [ChatGPT index](../README.md) · [General camera/sync rules](../../memory/chatgpt-face-camera-and-separate-vo.md)
