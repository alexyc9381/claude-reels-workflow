# Script coverage and runtime review

## Finding from the supplied script

The supplied script contains **1,354 spoken words**, excluding its reference links, title, table of contents, and section headings. The assembled cut's automatic transcript contains approximately **1,443 words**. Word counts are approximate because transcription and contractions affect tokenization; the comparison concerns meaning, not exact wording.

All scripted topic sections and their main teaching points are represented in the existing **6:12.906** first cut. Recorded wording changes are retained. A script comparison does not by itself prove that every useful unscripted remark was retained; the separate excluded-speech review has now checked 174 short windows and found no omitted unique teaching point.

The recording plays at **1× speed**, with its original 29.97 fps. The resulting delivery averages about **232 spoken words per minute**. No audio time compression was used.

## Section coverage

| Cut time | Section | Retained content |
| --- | --- | --- |
| 00:00 | Opening | Core promise, model warning, Artifacts preview, and cheat-sheet offer. |
| 00:39 | Models | Haiku, Sonnet, Opus, Fable, and transition to effort. |
| 01:18 | Effort | Faster/Smarter control, low/max comparison, cost and usage warning, suitable tasks. |
| 02:04 | Artifacts | Dashboard example, chart/button interaction, layout changes, publishing, and workspace transition. |
| 03:06 | Projects | Workspace creation, PDFs/brand voice/templates, custom instructions, team reuse, and manual-upload problem. |
| 03:52 | Connectors | Gmail/Drive setup, vendor proposal, draft reply, meeting notes/planning docs, other connectors, and automation transition. |
| 05:00 | Skills | Saved instructions, Customize/Skills ZIP upload, weekly report trigger, and task/email/document example. |
| 05:52 | Recap and cheat sheet | Model/app/workflow recap, free instructions, skill-creation bonus, and copy/paste ending. |

## Wording differences preserved

- The opening's “force the AI to use deep reasoning” becomes “stop getting surface-level responses” in the selected recorded take. The effort explanation follows later.
- Sonnet is described as a “reliable worker”; Fable's “dozens of steps” becomes “multiple steps.”
- The Connectors section adds Notion and describes sending from Gmail Drafts.
- Skills includes the recorded explanation about saving instructions once and following them each time.

These are recorded variations of the script. They were not replaced with synthetic narration.

## Why a 39-minute source becomes a six-minute cut

The external voice recording is **39:24** long. Automatic speech detection estimates **23:17 of nonspeech**, **10:32 of excluded speech**, and **5:36 of retained speech**. The cut includes roughly **37 seconds of quiet handles and natural gaps** around that retained speech, making **6:13** overall. These detector totals are approximate and do not alone justify an editorial cut.

The excluded-speech audit independently transcribes short regions with a different, larger model. Its purpose is to distinguish false starts, duplicate deliveries, and recording instructions from unique material. The original broad omission labels are insufficient evidence for a final completeness claim.

## Current status

Script comparison and independent excluded-speech audit complete. **No omitted unique teaching point was identified**, so the existing 6:12.906 video and its edit boundaries remain unchanged. No longer replacement export was made.

The audit covers 174 excluded detected-speech windows using medium.en transcription, reviewed against the selected takes and script. It confirmed repeated or abandoned deliveries, recording setup/end discussion, and a few incidental or recognition-artifact fragments. The final excluded region explicitly marks the end of the Claude for Beginners recording.

See `EXCLUDED-SPEECH-REVIEW.md` for source-clock timestamps and the independent text, and `analysis/reviewed-chunks.json` for grouped dispositions. This is a transcript-assisted content audit. Speech detection and recognition can err; it is not a claim of uninterrupted real-time listening or frame-by-frame review. The script comparison checks meaning and examples, not exact word identity. No factual rewriting of the tutorial was performed.
