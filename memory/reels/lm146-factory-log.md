# LM146: original voice, real LM Studio demo

> R4 below is historical and was rejected by the user. R10 is also superseded. The current revision is R22; see the final record at the end.

## Source and scope
User commissioned a finished reel from LM sep 10.m4a, specifically prioritizing real screen recording over elaborate animation. Original Drive ID: 1Vqil5y0781zDzYW72oW3VjbPZtKimfFD. Source duration 150.14s; edited narration 44.83s at the house 1.03x, delivered picture 45.60s. User supplied the script and topic; no new topic-selection or viral-performance claim is made.

Built in isolated worktree from claude-reels-workflow origin/main 6bcb1e1. Original SlopKit clay mascot, cream chassis, word captions, header and progress rail retained. The screen capture is the dominant content; the mascot provides brief edge reactions.

## Factual correction during production
The first broad web search missed Qwen3.8 and briefly led to a Qwen3.5 draft. A targeted official source check confirmed https://huggingface.co/Qwen/Qwen3.8-27B and https://huggingface.co/lmstudio-community/Qwen3.8-27B-GGUF. The final edit restores the original full Qwen3.8 wording. All affected search/model/quantization captures were replaced. No superseded 3.5 footage is used in the final.

The classic LM Studio app 0.4.24 was installed from lmstudio.ai. Actual 27B GGUF choices were flagged Likely too large on this Mac. The real live-chat demo therefore uses the clearly identified mradermacher/Qwen3-1.7B-uncensored-GGUF Q8_0, 1.83GB. It was downloaded and run. Its generated Python is the actual output. Never present this as 27B local performance. The 8x reasoning segment is visibly labeled.

Capture method: CUA native/browser screenshot streams with original capture timestamps preserved, encoded as video. These are real UI interactions, not simulated HTML or altered screenshots. Native macOS recording was unavailable; timestamped screen capture was used. Crops, pauses and time compression are editorial. UI values and model output remain unchanged.

## Iterative review
R1: full first assembly and 18 rendered samples. Found small search fields, loading waits, empty model pane, early settings-camera move and weak code readability.
R2: tightened field crops; shortened My Models viewport; added a supporting three-step strip; aligned settings view; enlarged final generated code; improved hook physical contact and model destination.
R3: replaced all model references with the verified Qwen3.8 source and recaptured proof. Added a closer hook cut at 1.2s and official-model proof at 3s. Rendered 25 samples plus a full review movie. Found quantization interpolation briefly showed the wrong adjacent row and the load transition exposed an empty app state.
R4: each spoken quantization now hard-cuts to the exact captured row; search wait compressed; configuration remains readable through the spoken button name; empty loading state removed before showing real model load. Re-rendered seven affected samples and the complete 1080x1920 master. Re-transcribed the exported MP4 to check for abandoned takes and correct model-version speech.

## R4 validation (superseded)
- 1080x1920, 30fps H.264, AAC stereo 48kHz; fast-start MP4, 10,337,399 bytes.
- verify_reel: 9/9 checks passed, 29/29 declared cues detected, no bed gaps, 0.08s dead audio tail.
- Final integrated loudness -17.1 LUFS, LRA 2.0 LU, true peak -1.3 dBFS.
- Eight SFX source files pass named-air, banned cue, swell, hiss and repeated-bright-transient checks. The house Another Day of Sun instrumental starts at source 13.95s. Cue gain uses measured A-weighted active-window levels and music ducking, not nominal volume alone.
- Hook panel luma 209.7, black-point p10 28.5. Cover passed all five geometry/crop checks and was reviewed at 150px and full size.
- Animation-only metrics are NOT all green: body saturation 21.6% is below the cinematic 34% floor; motion median 2.90 is below the animation-led 9.0 floor, and all 11 scenes flag a motion or hold check. These results are retained. The explicit demo-first request governs: white native UI and readable held fields must not be recolored or covered with gratuitous motion to pass those metrics. Opening action, camera changes and supporting mascot performance are reviewed separately.
- ASR of the final mix preserves Qwen3.8 and the clean instruction sequence. ASR misrecognizes the brief spoken letters LM as out loud; the original LM take and canonical captions are retained.

## R4 delivery record (superseded)
Drive folder: 146 - LM, ID 1Z8dHIkxnU6zq3KxOYVObkOcfUia0JJ3D. One final MP4, cover, caption, subtitle file and editable source archive. Verify uploaded bytes against Drive server metadata, not the mounted folder.

Setup article: https://chen.media/guides/run-qwen3-8-locally-with-lm-studio
Article source: chenmedialabs branch guide-lm146, commit 8c0fe8b. Four-page DOCX used only as build source/gated download. It contains real hardware-fit distinctions, the MTP companion trap, three copyable prompts and troubleshooting. All pages rendered and visually checked. 150 guides built with full coverage. Local webpack build passed; Vercel native production build passed. Production deployment dpl_2VwkzBSxPjwDc8cob6VminxW5RCn; all four host aliases assigned and actual guide URL checked.


## User correction and R5–R10 revision

The user explicitly required a visible moving mouse cursor, actual setup actions throughout, closer adherence to the GitHub animation system, and removal of “Local AI • Practical Demo”, “Qwen × LM Studio” and other unrelated labels. The previous R4 was rejected; its technical passes did not establish creative quality.

- R5: recaptured real website/app actions, including query entry, exact quantization clicks, model download progress, My Models, cog menu, loading and chat. Rebuilt all scenes with frame-timed editorial cursor travel and click feedback. Replaced the fake model-loading hook with original Claude physically pressing a mouse.
- R6: strengthened hit-target alignment, anticipatory body movement and expression changes. Kept the sprite at the edge of the demonstration and removed decorative labels and repeated model/footer text.
- R7: added a whole-app overview and synchronized magnification lens so navigation remains understandable while native controls remain readable.
- R8: corrected search typing states, explicit source-link popup, cursor travel across menu actions, loading offset and the Send-to-code transition. Downloaded the actual 1.11GB Q4_K_M community model. Rejected an earlier incorrect generated deduplication example and recorded a correct word-count function instead.
- R9: added a dark navy chassis and foreground depth around the unmodified native UI. Kept the active-control lens large and moved the overview inward for a clearer visual hierarchy.
- R10: fixed contrast of the smaller-model disclosure and made the Q6 menu continuity match its actual selected state. Rendered the final full-resolution master and repeated the export, hook, look and motion checks.

### Current capture and model facts

The complete demonstrated sequence is website → OS → Download → app → Model Search → typed query → 4/5/6/8-bit results → original source → GGUF choices and hardware warning → smaller model Download → real progress → My Models → selected row → cog → Use in New Chat → real load → input → Send → real generated code.

The live model is mradermacher/Qwen3-1.7B-uncensored-GGUF, Q4_K_M, 1.11GB. The earlier Q8_0 file is not the model used in this revision. The 27B results are inspected, not run. A readable on-screen disclosure names the smaller model at the switch. The actual prompt asks for a Python word-count function; the generated output is `def count_words(s): return len(s.split())`. Model-loading and response footage are time-compressed; response playback is 2.25×. No invented result or installation footage is inserted.

Screen sources are CUA screenshot streams of actual browser/native interactions. The source archive carries original event coordinates, timestamps and frames. Cursor paths are an editorial enhancement, with real clicks synchronized to the UI changes. One gray cursor artifact in blank Q6-menu whitespace is removed with adjacent blank source pixels. No UI value or generated code is altered.

### Current validation (R10)

- Final master: 45.600 seconds; H.264, 1080×1920, 30fps; AAC stereo 48kHz; fast-start MP4.
- `verify_reel.py`: 9/9 audio/caption/export checks pass; 48/48 cues detected; audio at 40ms, voice at 0; continuous music bed; 0.08s dead audio tail.
- Final integrated loudness -17.1 LUFS, LRA 2.1 LU, true peak -1.3 dBFS.
- Eight unchanged SFX bank files pass named-air, banned sound, swell, hiss and repeated bright transient checks. Final cue map is 48 cues / 45.6s = 1.05/s. The source bank and separate voice/music/SFX stems are included.
- Hook check, actual stage crop 1012×1020 at (34,400), excludes captions/progress: frame-0 luma 213.7 (bar 140); first-five-second motion 7.11 (bar 4). Three authored stages: physical mouse action, native model UI, official source page.
- Look check, same stage geometry: body saturation 33.3% (bar 34%, FAIL); black-point p10 32.4 (bar 35, PASS). Body luma 175.9 is reported, not gated. Hook plate warns because the bright app region merges with the cream surroundings.
- Motion check, same geometry and unchanged thresholds: median 3.94 (bar 9); 8/11 scenes flag low motion, with 24f/21f/18f/15f dead runs in fit/load/chat/CTA. Hook, search and quantization pass. These failures are retained; this revision must not be described as all-gates-passed. The demo request explains why reading holds were retained, but does not convert a failed metric into a pass.
- Full-resolution hook, dropdown, disclosure, loading, send, code and CTA samples were reviewed. Playback checks covered the opening and navigation sequence, and the complete final 14.4s loading/chat/CTA excerpt. The code example was checked on empty text and a five-word string.

### Current delivery and guide

Replace the existing MP4, source ZIP and notes in the existing 146 - LM Drive folder, preserving file IDs. Cover, caption and subtitles use their existing file IDs. Heavy media lives in the Drive source archive; GitHub stores code, storyboard, narration edit, cue map and validation records.

The setup guide and four-page downloadable DOCX were updated to the same Q4_K_M download and word-count prompt. Git commit d44846b on chenmedialabs main; production deployment dpl_Ba14UVft74YdGG5Ni7iNCgPn9dMF. The unlocked article text was checked for Q4_K_M, 1.11GB and the prompt; the downloaded DOCX is byte-identical to the reviewed build input. Guide: https://chen.media/guides/run-qwen3-8-locally-with-lm-studio


## R11 revision brief (September 10 follow-up)

User requested more interesting animation and mini-Claude performance, the standard progress system, and replacement of the top-left text. Planned changes: restore the actual SlopKit ProgressBar and centered SectionHeader/HookHeader; preserve actual UI/cursor choreography; replace generic edge bob/tilt with scene-specific tool actions (magnifier, quantization staircase, compression press, download catch, model drawer, loading crank, keyboard and result reaction). Every movement should terminate in a result. Secondary props stay outside/behind the readable app and magnifier. Review short motion before final render, then audit the updated output without changing thresholds.


## R12–R15 execution and visual review

R11 implemented the actual shared `SlopKit.ProgressBar`, `SectionHeader` and `HookHeader`. The custom thin bar and top-left serif headings are gone. `LM146AnimationKit.tsx` gives each scene an authored original-sprite action: magnifier search, quantization stair climb, precision press, balance, drive catch, model drawer, connected crank, keyboard/result presentation, and a physical CTA leap/press/landing. The source recording and cursor events retain their original timings.

R12 moved the shared retention rail upward by 48px so its moving score badge remains unobstructed. Hook UI begins below the taller shared hero card. The loading sprite's hand follows the actual crank handle position; its effort and release use the same authored mechanism. Code brackets were lifted above the face. Full motion review covered the quantization, compression, hardware and loading sequence.

R13 corrected balance geometry so the hardware analogy stays outside Claude's face. The miniature chips use neutral processor cores rather than misleading success checkmarks. Twelve low-level mechanical cues accompany the newly authored contacts and movements.

R14 added a warning double-take, three packet catches matching the actual captured download-progress states, and a final presentation hop. Three more soft packet cues bring the final map to 63 cues / 45.6s = 1.38/sec. The original voice, narration edit and house music source are unchanged.

R15 gives the magnifier additional clearance from the sprite's head and keeps the first quantization-step arm outside the magnified capture. Source-code review and full-resolution frames check facial clearance, hand-to-tool contact, UI control readability, rail/header separation and the hook transition. Remotion bundles and renders the revised source successfully; a standalone TypeScript compiler was not installed, so no separate tsc pass is claimed.

Current final audit results follow below. The stage crop is 1012×930 at (34,490), excluding the shared header, retention rail and captions. The original thresholds are unchanged. The earlier R10 is remeasured over the identical geometry for comparison.


### R16 final finish and validation

The R15 color audit exposed a pale surround: 30.5% saturation and black-point p10 40.4. R16 deepens the scene-specific stock/shadows and reduces the context overview from 884×534 to 836×504. The detailed 650px control lens stays unchanged. The hero laptop-to-overview transition is updated to the same exact target geometry. This fixes the surrounding set without recoloring any native UI.

- Final look gate passes: body saturation 35.7% against 34%; p10 28.4 against 35. Frame-0 luma 213.9 against 140. Body luma 168.3 and the merged bright-plate warning are reported, not blocking.
- Hook gate passes: first-five-second motion 8.54 against 4.0; three authored stages remain physical mouse action, real app and original-model source proof.
- All nine audio/caption/export checks pass. 63/63 cues fire; voice at 0, audio at 40ms, continuous music and 0.08s dead tail. SFX audit exits 0. Integrated loudness -17.1 LUFS, LRA 2.1 LU, true peak -1.3 dBFS.
- The DEADRUN bar now passes in every scene: longest is 12 frames. This resolves the earlier fit/load/chat/CTA failures of 24/21/18/15 frames.
- The strict pixel-motion bar is still unmet: median 4.33 against 9.0, eight scenes below 6.0. Weakest scene: fit, 2.18. R10 remeasured over the identical crop also has median 4.33. Do not claim a median-motion lift or all-gates approval. The actual gains are distinct sprite jobs, readable causal contacts, standard chrome, stronger color/contrast, and the removal of long dead runs.
- Full-resolution frames reviewed across all scene types, plus motion playback of the 24.5s quantization-to-loading segment and the 20.4s hardware-to-CTA segment. Late checks cover magnifier/face clearance, first-step/capture separation and final set contrast. Remotion render succeeds.

Delivery uses the same Drive MP4, ZIP and notes IDs; GitHub carries the updated code and records, and the source ZIP carries all native captures, the original voice, audio stems, tools and final audits. The linked guide remains unchanged because the real download/model/prompt sequence is unchanged.

## R17 revision brief

User requires the first 0–5 seconds to be primarily animation, followed by a smooth interesting transition into screen capture, and supplies the exact hook header: “How to Run Top AI Locally”. Replace the early recorded UI with a causal 2D installation metaphor: original Claude operates a geared hoist to seat an AI chip in a laptop, the laptop wakes, and Claude presses a mouse. At 5 seconds the illustrated monitor expands into the actual LM Studio website frame. Finish the move before the original OS-menu click at frame 172. Preserve narration, caption timing, original app evidence, and all later scene actions.

Mapping: chip = local AI model; hoist/socket = bringing the model onto a personal computer; activated laptop = running locally; monitor-to-website handoff = beginning the real setup. No claim that the illustrated installation is actual 27B execution. Review the entire 0–7 seconds, not only stills.

## R18–R22 opening review and user steering

The user reviewed R18 and identified the laptop’s proximity to the right edge and a loss of activity at 3–5s after the crank. They also changed the title to the exact all-caps “HOW TO RUN TOP AI MODELS LOCALLY”, then instructed us to proceed. R18 is not approved merely because it rendered.

R20 inset the illustration and increased processor activation. R21 replaced the generic robot face with original Claude physically jumping into the laptop. R22 moved the post-crank actions earlier: chip seats at f64; mouse press at f90; jump f96–124; landing opens the monitor from f126 into the real website. Actual capture starts fading in only after f150 and reaches its final 836×504 overview at f169, before the real f172 OS-menu click. No source-screen action is shown before five seconds. This is a drawn metaphor for bringing AI onto a computer, not footage of running 27B.

The hook’s artwork is inset with an 88% layout transform; its opening push is 4.3%. Essential rightmost artwork stays near x960 or inward. The hoist cable renders in front of the illustrated screen so it remains visibly attached; the crank stays behind Claude to protect the face. The later actual demo and disclosure are unchanged. Sound is re-timed to the new physical actions: 68 cues / 45.6s = 1.491/sec, with the original voice and house music preserved.

Opening probe: frame-0 luma 173.46, first-five-second motion 4.38 against 4.0; the formerly quiet 3–4s and 4–5s buckets now measure 4.70 and 7.02. Same stage crop and thresholds as R16. Final full-export checks follow.

### R22 final delivery checks

Final video is 7,838,659 bytes, H.264 yuv420p / TV range / BT.709, 1080×1920 at 30fps, AAC stereo. Remotion renders directly with BT.709 and PNG intermediates; stream-copy faststart puts moov before mdat. Container duration is 45.654s, including normal AAC padding around the 45.6s picture. The previous default Remotion export used full-range yuvj420p, so the delivery settings now explicitly select the compatible output format.

- verify_reel: 9/9 pass; 68/68 cues; first audio 40ms; original voice 0s; music continuous; 0.08s dead audio tail.
- SFX: all eight source files pass. Loudness -17.1 LUFS, LRA 2.1 LU, true peak -1.3 dBFS.
- Hook: final luma 171.51 ≥140; first-five-second motion 4.382 ≥4.0. The 3–4s and 4–5s buckets are 4.689 and 6.990.
- Look: body saturation 35.7% ≥34%; black point p10 26.3 ≤35. Report-only body luma 166.2 and header-plate warning remain.
- All scenes meet the ≤12-frame dead-run limit. The stricter overall motion audit still fails: median 4.36 vs9, 8/11 scenes below the scene target. The hook passes its dedicated opening gate but its 4.23 scene-average motion remains under the separate 6.0 scene threshold. No all-gates-passed claim.
- Frames 195 and 1082 are pixel-identical to R16 before final video encoding, confirming the later demonstration staging is preserved. Final decoded hook and loading frames were visually inspected. The 7.5s opening movie was replayed through the website handoff; intermediate hook and transition frames were inspected at full resolution.


## R23 revision brief

User asks for real subject animation from the first frame, already underway during the opening zoom, and an immediate cut at the last spoken “setup”. The existing hoist has a nine-frame delay plus a cubic slow start. Replace that with an in-progress crank at nonzero velocity, preserving the f64 chip arrival and all subsequent handoff events. The same motion driver must move the hand, wheel, cable and chip. The 48kHz voice release drops after 44.76s; low-level consonant decay remains through about 44.80s. End picture and mixed audio at 44.800s (1344 frames), with only a 5ms anti-click audio taper. Compress the illustrated CTA action so its press, landing and response finish before that cut. Review first-frame motion separately from camera scale, plus the complete new ending, then re-render and replace the existing Drive deliverables.


### R23 result and delivery checks

The hoist begins at 4% progress, with immediate nonzero cable velocity and 21.6° of crank rotation already established. From frame 0 to 1, before camera scaling, the chip descends 8.82px, the wheel turns 8.94°, and the connected hand moves 6.23px. Claude starts with the working expression active. The cable brakes smoothly over f52–64 into the same socket contact. Later hook and source-capture events retain their timings. Stage crops at f149, f195 and f1082 are pixel-identical to R22 before encoding.

The final word is measured from the original processed voice, including its consonant release. Picture and audio now both have an exact 44.800s duration; 1344 video frames. The original 45.6s padded ending is removed. The final CTA performance and cursor run at 1.5× so the press, landing and response complete by 44.678s. All declared SFX tails end by 44.669s; the redundant CTA entry accent is removed. Final sound uses 67 cues (1.496/sec), and only a 5ms anti-click taper at the cut. Original source voice and 1.03× narration speed are retained.

- Final exported MP4: 7,799,037 bytes; H.264, yuv420p, TV range, BT.709; 1080×1920 at 30fps; AAC stereo 48kHz. Both streams and the container end at 44.800s. Stream-copy faststart and exact-duration muxing follow the Remotion render; moov precedes mdat.
- verify_reel: 9/9 checks pass, 67/67 cues, audio at 40ms, voice and music at 0, continuous music, 0.04s dead audio tail. Caption checks here cover canonical text and monotonicity, not a newly measured full word-drift audit.
- SFX bank: eight files pass. Final loudness: -17.14 LUFS, LRA 2.10, true peak -1.31 dBFS.
- Hook: luma 171.68 ≥140; first-five-second motion 4.498 ≥4.0. First-second motion rises from 4.450 to 5.901. The 3–4s and 4–5s buckets remain 4.686 and 6.992.
- Look: body saturation 35.8% ≥34%; p10 26.3 ≤35. Report-only body luma 166.2 and hook-plate warning remain.
- Every scene meets the ≤12-frame dead-run limit; CTA now has only 3 dead frames. Strict scene motion remains below target: median 4.41 vs 9; 7/11 scenes below 6. The hook passes its dedicated opening gate but its separate scene score is 4.34. No all-gates-passed claim.
- Full-resolution first-frame/early motion and final CTA samples were inspected. Browser playback covered the 0–7s opening into the actual website and 42s through the immediate ending. The final setup word remains identifiable in a short-clip transcription; exact cut timing is based on the waveform, not ASR word times.

Standalone source package 3.2.0 bundles successfully as 1080×1920 / 1344 frames. Its rendered frame1 is pixel-identical to the main source render. The archive passes ZIP integrity validation and contains SHA-256 checksums.
