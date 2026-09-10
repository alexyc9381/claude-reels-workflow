# LM146: original voice, real LM Studio demo

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

## Final validation
- 1080x1920, 30fps H.264, AAC stereo 48kHz; fast-start MP4, 10,337,399 bytes.
- verify_reel: 9/9 checks passed, 29/29 declared cues detected, no bed gaps, 0.08s dead audio tail.
- Final integrated loudness -17.1 LUFS, LRA 2.0 LU, true peak -1.3 dBFS.
- Eight SFX source files pass named-air, banned cue, swell, hiss and repeated-bright-transient checks. The house Another Day of Sun instrumental starts at source 13.95s. Cue gain uses measured A-weighted active-window levels and music ducking, not nominal volume alone.
- Hook panel luma 209.7, black-point p10 28.5. Cover passed all five geometry/crop checks and was reviewed at 150px and full size.
- Animation-only metrics are NOT all green: body saturation 21.6% is below the cinematic 34% floor; motion median 2.90 is below the animation-led 9.0 floor, and all 11 scenes flag a motion or hold check. These results are retained. The explicit demo-first request governs: white native UI and readable held fields must not be recolored or covered with gratuitous motion to pass those metrics. Opening action, camera changes and supporting mascot performance are reviewed separately.
- ASR of the final mix preserves Qwen3.8 and the clean instruction sequence. ASR misrecognizes the brief spoken letters LM as out loud; the original LM take and canonical captions are retained.

## Deliverables and durable source
Drive folder: 146 - LM, ID 1Z8dHIkxnU6zq3KxOYVObkOcfUia0JJ3D. One final MP4, cover, caption, subtitle file and editable source archive. Verify uploaded bytes against Drive server metadata, not the mounted folder.

Setup article: https://chen.media/guides/run-qwen3-8-locally-with-lm-studio
Article source: chenmedialabs branch guide-lm146, commit 8c0fe8b. Four-page DOCX used only as build source/gated download. It contains real hardware-fit distinctions, the MTP companion trap, three copyable prompts and troubleshooting. All pages rendered and visually checked. 150 guides built with full coverage. Local webpack build passed; Vercel native production build passed. Production deployment dpl_2VwkzBSxPjwDc8cob6VminxW5RCn; all four host aliases assigned and actual guide URL checked.
