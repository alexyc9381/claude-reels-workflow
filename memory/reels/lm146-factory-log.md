# LM146: original voice, real LM Studio demo

> R4 below is historical and was rejected by the user. The current deliverable is R10; see the revision record at the end.

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
