# STUDENT: camera-led offer and product demonstration

Scope: ChatGPT account, script six / STUDENT. User-directed revision learnings from September 15, 2026. This extends the [CODES baseline](codes-phone-demo.md); the differences below take precedence for STUDENT. These are editing preferences and observed defects, not measured retention results or a claim of final creative approval.

## Load before editing

Use the separate GarageBand VO and synchronized camera at original 1.0x speed. Keep camera audio muted. Preserve the CODES baseline of centered framing, no watermark, no added background blur, no music, readable TikTok-style headers and mostly one-word all-caps bottom captions. Keep text sparse and use real product evidence. Do not import CODES-only FBI memes or slash-keyword instructions into this format.

| Decision | STUDENT rule |
|---|---|
| Camera | Slight fast push-in at the very beginning; remove random face zooms and repeated zoom-in/zoom-out cycles. CODES section-by-section pushes are not the default here. |
| Graphic shape | Match the actual asset: square illustrations, wide website views, proportionate price cards. Never force every asset into a tall phone. |
| Sound | Real recorded computer-keyboard typing, clearly audible during typing. Remove random taps and decorative cursor clicks. |
| Product sequence | Each new beat reveals different relevant content, not another crop of the same screenshot. |
| Emphasis | Measured outlines around actual targets; no arbitrary lines or inaccurate circles. |
| Opening copy | Remove the extra “ELIGIBLE U.S. STUDENTS” opening pill. Retain material eligibility information where the offer is explained. |

## Real assets, composition and motion

- Use official website captures and real high-resolution images where applicable. Show the actual $20 plan when the narration names the price, then distinct offer, feature, deadline and signup views. Do not reuse the same B-roll multiple times to fill the timeline.
- Choose dimensions from the graphic's content and native aspect ratio. Preserve useful UI with appropriate fitting/cropping; do not stretch images or crop away the evidence. Inspect at final 1080x1920 resolution. Small screenshot crops enlarged several times become visibly blurry even if the source page was high resolution.
- The roughly 6–11-second feature passage needs fuller, frame-filling presentation and meaningful emphasis. Small floating rectangles, simple square entrances and text blocks were repeatedly rejected. Use staggered reveals, depth and a clear visual hierarchy, while keeping the relevant product content readable.
- Calendar sequence must visibly flip through dates, with a page-turn accent. A static date card is insufficient.
- Around the signup beat (roughly 16 seconds in the reviewed version), show successive workflow pages: offer, account entry, student verification, then activation/reward. A checklist is not a signup demonstration. Recreated UI uses example information and must not be represented as proof of a real submitted signup.
- On “that's it,” open a gift, reveal the reward and land a satisfying reward sound. Let the character cause or react to that event.
- Replace the late plain-text hold with an ongoing, understandable action: deadline progress, accumulated savings or a useful output reveal. Do not let the last third freeze after its entrance animation finishes. Purposeful action matters more than adding an arbitrary idle loop.
- Remove the decorative mouse cursor. A cursor clicking unrelated places was explicitly rejected.
- Focus the study/output view once and hold the useful framing; do not repeatedly zoom out then back in.

## Accurate highlight geometry

Measure the actual target in source-image coordinates, then transform its bounds using the same scale, crop and translation as the displayed image. Account for entrance motion; either parent the highlight to the asset or delay the drawing until it settles. Inspect the beginning, middle and end of the stroke at full output resolution.

The last correction removed a misplaced underline and outlined the actual icon row and note card. Reference geometry for this render only: a 1360-square asset displayed 1080 pixels wide at (0,470); icon-row outline (70,1015,940,300); note-card outline (70,595,960,260). Entrance settled at local 0.25s and the stroke drew during 0.3–0.9s. Re-measure for any new asset or layout; these are not reusable universal coordinates.

## Sprite performance

The recognizable ChatGPT sprite must do work: reach toward a real field, scan a form, pull in a graphic, point at the relevant answer, or open/celebrate the reward. Idle standing, floating and bobbing do not satisfy interaction. Keep expressive eyes, attached arms with enough reach and a visible action consequence. The user's casual “Claude guy” reference in these notes describes this role; it does not change the ChatGPT account mascot.

## Speech, pauses and sound design

- Speech starts immediately at frame zero. Remove leading silence and distracting gaps between sections with paired camera/VO cuts. Do not accelerate or slow either recording to match animation.
- Repeated pause complaints were near 5, 11 and 25 seconds in reviewed versions. Those are review anchors, not permanent source timestamps; map through the current edit decision list before changing anything.
- Word timestamps are guides, not safe cut boundaries. “Dollars,” “watch” and “professor” were clipped during revisions. Inspect waveform energy and listen to the entire word, including its tail consonant, before selecting silence cuts. Preserve a small natural separation and validate the final encoded audio, not only the source stem.
- Synthetic ticks and phone-style taps failed the requested keyboard sound. Use an actual recorded keyboard clip, repeated at a natural fast cadence and audible under VO, matched to visible letters. Latest source archive includes `public/sfx/recorded-keyboard.wav`; provenance is the existing Vox Sound Effects / Tech Sounds / keyboard-typing.wav library asset. Listen before reuse and preserve applicable asset permissions.
- Make the first 3–5 seconds varied and active: an opening accent, short fast pitched-up riser and a contrasting chime/transition where the visual warrants them. The latest specific correction added accents near delivered 0.85, 1.30 and 1.72 seconds. These are reference timing, not a mandatory cue template.
- Tie sounds to typing, page turns, reward and graphic actions. Avoid unrelated taps, excessive identical dings or effects that mask speech. Audition the SFX stem and then the final mix. An SFX event existing in code or passing a peak test does not prove it sounds right.
- Preserve the requested 20% voice gain (linear 1.2) with sufficient headroom. No soundtrack in this variant.

## Review and delivery

1. Watch the complete final encode with sound. Inspect the first five seconds, every speech edit, every new asset and the ending. Check lips against VO wherever the face is visible; prevent flashes of the wrong background take during screen transitions.
2. Inspect full-resolution highlight frames, graphic sharpness and crop, header centering, caption safe zones, sprite contact and the final action. Check the entire duration of moving overlays, not one thumbnail.
3. Listen specifically for complete word onsets/tails, keyboard identity and audibility, varied opening effects and residual gaps. Technical gates supplement this review; earlier passes did not catch wrong highlight positions or the disliked synthetic keyboard sound.
4. Keep source-time and delivered-time mappings, paired cuts, original VO and camera, audio builder, source assets and revision notes in the editable source ZIP. Wait for encoding to finish and verify full decode, duration, sync and loudness before packaging.
5. Update the existing MP4 and source ZIP through the Google Drive connector, then read back metadata and verify sizes. Do not use browser automation for Drive. If no connector tools are exposed, report the upload as pending; do not equate a local export with Drive delivery.
6. Publish and verify the promised article and commit its source. Re-check current offer terms before future reuse; this reel's price, deadline and eligibility are not evergreen facts.

## Reference and status at documentation time

Latest local delivery revision 10 / render v15: 1080x1920, 30fps, 1104 frames / 36.8s. The source timeline was 1289 frames; 185 frames of paired silence cuts were removed without time stretching. This is a revision reference, not a pacing target for other scripts.

- [Drive video](https://drive.google.com/file/d/1EU9APWtv7pyHwn-N9lHoHfTGxj9MwBR2/view)
- [Editable source ZIP](https://drive.google.com/file/d/1OiCLzetpZUVOeTQNvB41p6i_u37GCIXF/view)
- [Post folder](https://drive.google.com/drive/folders/1sNQnOxaafxz-mf5Bf8ru-MxqiWWfQxu1)
- [Student offer article](https://chen.media/guides/chatgpt-student-offer), publishing source recorded at `alexyc9381/chenmedialabs` commit `1a62ce0`.

As of this documentation update, revision 10 is local and its upload is pending: the last recorded Drive revision is 3. The connection discovery still reports Google Drive not installed for this task. Verify fresh remote metadata after upload before calling those links current.

[ChatGPT index](../README.md) · [CODES baseline](codes-phone-demo.md) · [General camera and external-VO rules](../../memory/chatgpt-face-camera-and-separate-vo.md)
