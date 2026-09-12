# Video QA record

## v7 — completed full-film review export

- Final file: `outputs/higgsfield-replacement-edit-v7.mp4`, 149,103,492 bytes; exactly 473 seconds, 14,190 H.264 frames at 1920×1080/30. All picture/audio frames decode with fatal-error handling. Six embedded chapter names/times match the EDL. Every picture chunk matches current source hash `33a8f9794d0f0529cf297d921a25e4a5b816f275a41fca05c4ca9c90b76787d6`.
- Final AAC: stereo 48 kHz, −16.57 LUFS integrated, −0.91 dBTP estimated true peak, 4.8 LU range. Ten final-file OBS comparisons pass: maximum lag 0.3125 ms, aligned correlation 0.942–1.000. The final mux caps output to exactly 473 seconds, removing the 100 ms audio-filter tail without shortening the picture or intended closing word.
- A separate transcription of the final MP4's last 4.7 seconds retains the complete closing instruction and “minutes” after the tail trim (`final-export-closing.srt`).
- Encoded samples cover chapters, roadmap, model gate, budget reminder, protected API setup, skill, import handoff, enlarged real text, unobstructed typing, pro tips, result playback, sound treatment, comparison, closing throw/catch and final loaded-skill state. Final export frames show sharp foreground/blurred room and no CGI pet. This is sampled visual review, not exhaustive human listening/privacy/creative approval.

- Source tests pass: 50 segments, 14,190 frames, nine full scenes, 32 varied cues plus one merged budget reminder, 90 sound cues, six chapters, unchanged measured camera offsets, OBS-only narration, no active CGI, symmetric authored eyes and all measured typing-box corners safe at every focused frame.
- Person-aware camera plate completed with 14,281 masks / zero missing masks; original sharp face over blurred room, no fixed ellipse. The 160-frame no-code extension also has zero missing masks. Full export checks passed.
- Visual still QA covers early and late scenes, the roadmap/handoff, direct/gating explanation, the joined 4:10 reminder, actual-text lens, typing/pro tip, budget, comparison and distinct closing. Corrected labels behind actors, a sprite behind the presenter, muted-looking logos, cramped file text and early empty model staging.
- Full-mix QA caught a tight boundary after “code” and trailing silence/next-take “Now” near 3:02. The final repair retains the complete original code/download clause, followed by the clean upload continuation. A nine-second actual Remotion WAV audition now transcribes the complete instruction, including “code”. Final EDL is 473 seconds; budget cue updates automatically to 4:10. Silent person plate uses checked per-row subset offsets plus a separate 160-frame no-code plate, with zero missing masks.
- Final continuous 473-second mix has been transcribed through the last word “minutes” (143 ASR blocks, final speech ends about 472.92). No standalone “cut” marker detected. The complete “additional lines of code” and download/upload instruction are present. Around 0:31, the teaser leads into the guide sentence without a new silence insert. This is machine-aided QA, not a claim of full human listening approval.
- Ten premix-to-OBS checks pass: maximum measured lag 0.3125 ms, aligned correlations 0.942–1.000. The chapter actor's legacy lift pose was normalized to 0.7; new static tests catch numeric lifts outside 0–1. Every final picture chunk was freshly rendered. The complete soundtrack was reused only after an identical audio contract across this picture-only correction.
- Full v7 request matrix and current reproduction steps: `REVISION-V7.md`. Machine reports are in task `work/higgsfield-replacement/revision-v7/`: `export-validation.json`, `audio-sync-validation.json`, `dialogue-qc.json`. v6 and original media retained; no source deletion, GitHub push or publication.

## Historical v6 full-film export — 2026-09-11

- Completed `outputs/higgsfield-replacement-edit-v6.mp4`: 152,466,328 bytes, 487.600 container seconds, 14,627 frames, 1920×1080/30 fps. This is the full film, not an intro pilot.
- All picture/audio frames decode successfully with fatal-error handling. Six embedded chapter names/start times match the current manifest.
- Single 48 kHz stereo AAC soundtrack: −16.57 LUFS integrated, −1.09 dBTP estimated true peak, 4.8 LU range. Narration remains OBS-only; Sony media is muted.
- Ten final-file OBS waveform checks: maximum absolute lag 0.3125 ms; aligned correlation 0.923–0.9996. Reports preserve raw zero-lag values as well. This is sampled acoustic alignment, not optical lip-sync or full human listening approval.
- Source regression checks pass: 51 segments, eight full scenes, 37 support cues, 88 sound events, protected sensitive panels, original CGI identity, unchanged camera offsets, and all measured typing-box corners inside the viewport.
- The reported 0:31 dead-air join is approximately 0.6 seconds shorter without dropping spoken words. No additional teaching segment was removed. Full mixed-soundtrack transcription retains the closing word and has no detected literal “cut cut” marker; proper-noun transcription errors remain analysis-only.
- Encoded visual samples cover opening, chapter handoff, protected API setup, skill, typing, budget, 5:46 result commentary, correct Veo/Google identification, later playback, comparison and closing CTA. Findings and full request-to-implementation matrix are in `REVISION-V6.md`.
- Remaining publication inputs: real A comparison clip, pricing/charge evidence or replacement narration, factual setup and model/budget clarifications, music/SFX credit/rights clearance, and Alex's end-to-end review. Voiceover-only pickup sheet is saved in the task's outputs directory. No synthesized pickup was inserted.
- Machine evidence: task `work/higgsfield-replacement/revision-v6/export-validation.json` and `audio-sync-validation.json`. Earlier versions and source media retained; no GitHub commit/push or publication.

## Historical first-pass QA — 2026-09-10

- Approved animation baseline v11 saved separately in the workflow. No animation applied to this footage.
- Drive folder and all five source file IDs/byte sizes grounded through the Drive connector.
- OBS raw fetch returned a remote file reference, not a local materialized path. A Downloads copy with matching name and exact byte size was located and decoded locally; remote hash identity remains unverified because the connector metadata response omitted checksum fields.
- OBS: 1920×1080, 60 fps, 41:07.5, H.264 + stereo AAC 48 kHz.
- Local Whisper small.en transcript completed. Analysis WAV is 16 kHz mono **for transcription only**, never editorial audio. Original 48 kHz OBS soundtrack remains the sole intended mix source.
- Work artifacts: task `work/higgsfield-replacement/obs-transcript.{json,txt,srt}` and `obs-analysis-only-16k.wav`. Machine transcript is not a corrected caption deliverable.
- Three OBS frames inspected: 01:20 contains OBS recursion/setup; 18:20 contains Claude prompt/budget UI; 26:40 contains generated-result playback. This is not a full visual/privacy sweep.
- Sony camera card is now readable. C0004–C0007 match Drive filenames and exact byte sizes. Originals remain untouched; no deletion, formatting or source overwrite.
- Sony: 3840×2160, 30000/1001 fps, S-Cinetone/Rec709 per camera XML. Four 1080p working copies retain source frame rate and contain **no audio stream**. Relink to 4K originals for a later finish; OBS is native 1080p.
- Camera coverage and frame-timing tests pass. Full review render is 45 segments, 13,314 frames at 30 fps: 443.8 seconds. chapters.json contains six output-relative chapter starts.
- Privacy-critical source regions: API key creation/copy and billing/account screens. Do not render them unobscured into a review deliverable.
- Not publish-ready: narration claims and hook/payoff consistency need review as noted in PAPER-EDIT.md.

## Measured synchronization

Convention: OBS time = camera time + offset. Renderer subtracts this offset to locate camera picture.

| Camera | Offset seconds | Spread across accepted dialogue checks |
|---|---:|---:|
| C0004 | -5.232875 | 1.875 ms |
| C0005 | 729.47290625 | 1.438 ms |
| C0006 | 1494.9025625 | 0.188 ms |
| C0007 | 1767.51075000 | 2.125 ms |

Independent envelope correlation and constrained waveform matching were checked at multiple speech locations per clip. No time-warp correction was indicated by these tests. This is measured acoustic alignment, not optical lip-sync approval. Output trims are quantized to 30 fps.

User's clap cues were located; candidates are preserved in sync-evidence.json. Largest peaks in those windows differ from the sustained-dialogue solution by up to about 85 ms, so they were not blindly substituted for stronger repeated speech alignment. Visual hand-contact/audio approval and full listening review remain review gates. Camera restarts and clap windows are excluded from the cut.

## Assembly checks

- Native Remotion composition: video/src/youtube-roughcut.tsx, HiggsfieldRoughCut. No Supereditor.
- Exactly one OBS Audio source in the component; both video elements muted. Analysis WAVs never enter the render. Source-audio invariant tests pass.
- Clean-take selection based on transcript, with isolated retranscription at ambiguous boundaries. Removed retakes, long waits and duplicate reactions; preserved generated-result playback. Pauses up to 1.5 seconds remain within selected phrases.
- Original 48 kHz OBS audio is unchanged in gain. No music or sound design; not a mastering pass.
- API-key creation/copy and billing explanation passages are presenter-only.
- 101 sampled screen frames checked using local OCR. Flagged frames visually inspected: billing matches were a setup button; token matches were thinking counts, not credentials. This is sampled privacy QA, not exhaustive clearance.
- Opening Remotion still inspected. Final rendered-file metadata, sampled-frame and decode results are recorded in the output review notes when complete. No full real-time listening claim.

## Remaining publication gates

1. Opening/reveal narration describes labeled A/B examples, but kept screen footage shows one result at a time. Identify the correct subscription-vs-direct comparison pair before the comparison layout pass. Do not relabel two skill-generated examples as that comparison.
2. Confirm pricing, terms/ownership, model names, detail-switch demonstration and the meaning of “local/free.” Paid model generation is distinct from a free skill or locally saved file. Narration is not factual sign-off.
3. Review splice pacing, lip sync, inset placement and full audio end-to-end. This is the first review assembly, not a publication-ready final.
4. Approved v11 motion design, chapter graphics, background polish and sound design follow story approval.

## Export recovery

The initial monolithic render exhausted disk near completion and cleaned its temporary frames. No finished full MP4 resulted. `tools/render-low-storage.mjs` uses hard-linked bundle media, bounded decoder caches, checkpointed 90-second picture renders and a separate continuous OBS-only WAV rendered by Remotion. Final FFmpeg muxing makes no new edits. This avoids restarting the whole render and avoids introducing AAC joins at chunk boundaries.

The continuous 48 kHz stereo soundtrack completed. Eight sampled comparisons against the intended OBS source selects match within about one 30 fps frame after timing quantization. Measurement: -22.18 LUFS integrated, +0.11 dBTP estimated true peak, 7.3 LU range; unchanged gain in this rough cut, balancing/limiting remains for the finishing pass.

## Final first-pass export

- Completed: 172,155,827 bytes, 443.8 seconds, 13,314 H.264 frames at 1920×1080/30, stereo 48 kHz AAC. Full audio/video decode with fatal-error handling exited successfully.
- Six named embedded chapters verified against the frame-based timeline. The separate timestamp file agrees to whole-second rounding.
- Nine rendered samples inspected: opening, software setup, both protected presenter-only passages, result playback, reveal and closing. No missing media seen in these samples. Full real-time listening/privacy review remains a publication gate.
- Chapter metadata muxing used the already installed full FFmpeg from imageio_ffmpeg because Remotion's reduced build lacks the ffmetadata demuxer. Picture and sound were stream-copied for this metadata-only step; the editing engine remains Remotion.

Saved locally; no commit or GitHub push is implied.

## v2 visual revision

The first-pass-only descriptions above document v1. The user subsequently requested restoring the missing post-intro OBS explanation, right-side/recentered headshot, gradient, opening zoom and approved 2D/CGI integration. See ANIMATION-PASS-V2.md for the applied cue map and asset provenance.

- Root cause of missing slides: all six chapter-two ranges were presenter-only. They now show original OBS slides and annotations at the original source timestamps. No audio selects or camera offsets were altered.
- Revision-specific regression suite passed: exact unchanged camera/OBS EDL, 45 segments/13,314 frames, restored six slide ranges, protected API/billing ranges, right inset/crop, bounded continuously decelerating 6.5% opening zoom, deterministic animation and original CGI SHA256 identity.
- Actual-VO intro pilot completed and audio/video decode passed. Rendered stills inspected for opening framing, zoom endpoint, CGI shoulder attachment, 2D pipeline action/output, two restored slides, both definitions, budget callout and CGI frame perch. Definition sprite feet corrected to the card edge; budget mascot omitted to leave option text readable.
- Additional local OCR audit covered 24 source frames across the six newly exposed slide ranges (both boundaries and five-second interior samples). Five billing flags were visually inspected: all were the same illustrative warning slide, not an account/card form. No credential exposure found in these samples. This is sampled QA, not exhaustive clearance.
- Original v1 and footage preserved. Full v2 export completed: 145,770,672 bytes, 443.8 seconds, 13,314 frames, 1920 × 1080 / 30 fps, single 48 kHz stereo AAC soundtrack. Six chapter names/start times match the EDL. Full audio/video fatal-error decode passed.
- Four encoded-frame comparisons against reviewed stills (12.5, 35, 120, 140 seconds) produced SSIM 0.9922–0.9951. Final-file samples at 350, 430 and 443.5 seconds visually inspected; main playback and closing framing present.
- The reused OBS WAV is identical, but AAC packet hashes differ from v1 after encoding. Eight decoded-audio spot comparisons at 3, 35, 120, 140, 216, 275, 350 and 430 seconds showed zero measured lag, correlation >=0.999987, and absolute gain difference <=0.0029 dB. No byte-identical AAC claim. This confirms sampled content/timing consistency, not full listening approval.

## v3 content / graphics / sound revision — September 11

- Delivered locally: `higgsfield-replacement-edit-v3.mp4`, 145,562,002 bytes, 489.600 container seconds, 14,687 video frames, 1920×1080, 30 fps; one 48 kHz stereo AAC soundtrack; six matching chapter markers. Earlier exports preserved.
- Regression tests passed: 51 valid phrase-level selects; camera offsets and OBS identity unchanged; Sony video muted; sensitive panel masks present; Higgsfield restored before the replacement line and within the opening 15 seconds; isolated s022 removed; decelerating 6.5% zoom; original CGI hash and frozen logo/music/SFX hashes validated.
- Full audio/video fatal-error decode passed. Two-pass delivery loudness: −16.58 LUFS integrated, −1.39 dB true peak, 4.7 LU loudness range.
- Ten source-to-export waveform samples show measured lag from −0.3125 to +0.3125 ms and aligned correlation from 0.9442 to 0.9997. Raw zero-lag correlation is retained in the report; submillisecond phase offsets were aligned for content comparison, not silently discarded.
- Actual encoded frames inspected: moving Step 1 handoff, setup screen at 2:04, masked API-key panel and lower-left definition, result-only playback, closing skill card and original CGI shoulder placement. Previous proof frames covered the A/B placeholders, real-logo pipeline stages, roadmap, teaser and skill overlay. Corrected placeholders/CTA to avoid covering the mouth; added a contrasting orange tile behind the white Seedance mark; removed the floating shoulder pet during facecam travel.
- Continuous-mix ASR found a truncated “I can't…” in the initial teaser draft. The teaser source endpoint was corrected to 1993.85; a fresh assembled-opening check now reads “This is insane. I even put together a free guide…”. A separately checked no-code source range ends after “code,” before the failed continuation. ASR found no explicit “cut cut” markers in the preflight assembly, but this is not a full human listening guarantee.
- Final machine reports: task work directory `revision-v3/export-validation.json` and `revision-v3/audio-sync-validation.json`. Review details, music attribution, real A/B asset needs and pickup/claim gates are in `REVISION-V3.md` and the delivered review notes. No Git commit, push, publication or synthesized narration was performed.
