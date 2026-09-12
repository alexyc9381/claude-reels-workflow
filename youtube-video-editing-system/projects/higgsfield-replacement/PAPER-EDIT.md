# First-pass narrative / chapter plan

Status: first-pass assembly now exists in roughcut.props.json; selects.json records editorial decisions and chapters.json records output-relative chapter starts. The table below preserves the original **raw OBS source navigation windows**, not final YouTube timestamps. Source duration: 41:07.5; current cut: 7:23.8.

| Chapter | Source navigation | Narrative job / bridge | Rough-cut treatment |
|---|---|---|---|
| Can you tell the difference? | 00:00–04:08 | Set up the A/B question; promise setup and a result reveal. End with the clean “Let's get started” line. | Presenter-led once Sony is synchronized. Keep one clean version of each necessary sentence; shorten repeated promises. Opening OBS includes recording-window recursion and is not usable full-screen proof. |
| Why use the models directly? | 05:06–10:43 | Explain the proposed alternative and introduce fal.ai. Bridge from why to setup. | Keep clean middleman → direct access → spending responsibility explanation; remove repeated takes and unsupported filler. Pricing/comparison claims require evidence before publication. |
| Connect fal.ai and Claude | 12:33–16:57 | Account/key setup → install the linked skill → begin the workflow. | Later recording restart supersedes duplicated earlier setup. Protect API-key/account screens. Prefer the clean revised skill explanation around 16:01. Correct transcript spelling to Claude/fal.ai; on-screen command inspected at 18:20 is `/fal-video`. |
| Make the first video—and set a budget | 17:15–24:10 | Prompt a concrete cyberpunk example; specify duration/format/budget, select a model and resolve billing. | Retain the later stated $1 maximum at 20:25 onward, not the earlier “unlimited” line at 18:15. Shorten generation waits only after visual inspection; preserve useful UI changes. Keep the billing prerequisite, ideally before the generation attempt if the spoken bridge allows it. |
| Review and compare the results | 25:25–34:36 | Show the first result, then demonstrate the detailed/multi-model variants. | Keep actual video playback and a concise specific reaction. Source 26:40 visually contains generated-video playback: no automatic silence removal there. Remove repeated superlatives and all failed takes. Verify model names against the UI. |
| The reveal and next step | 35:49–41:00 | Return to the opening question, identify A/B correctly and close with the linked setup file. | Keep one clean reveal and concise CTA. Verify which footage is A/B before cutting; don't imply comparison evidence exists merely because the narration says so. |

## Smooth chapter boundaries

- Mark boundaries on complete thought/action endings; never split a phrase or ongoing demonstration to meet a target runtime.
- Use existing spoken connectors: question → solution → setup → first generation → observed result → original comparison/payoff. Retain brief natural breathing room rather than a repeated sting or hard title interruption.
- Picture can change to the next relevant screen at the start of its explanation while OBS narration stays continuous. No decorative motion transitions or chapter graphics in this pass.
- Generate output-relative timestamps from the final EDL and chapter-start segment IDs. First chapter starts at output zero; do not publish the raw source ranges above as chapter timestamps.

## Story issues to resolve in the cut

1. The opening repeatedly promises an exact overspending-prevention fix. The transcript contains a per-run maximum-cost choice but does not establish a complete provider-side spending-limit walkthrough. Keep the promise proportionate to demonstrated footage, or request a short pickup later; don't invent missing instructions.
2. “Free” and “runs locally” narration conflicts with paid API generations/billing shown in the same recording. Distinguish a free skill/local saved output from remotely paid model generation. Flag final spoken claims rather than silently changing what Alex said.
3. Subscription prices, ownership/terms claims, detail-switch assertions, cost per generation and credit comparisons are unverified source claims. They need evidence before public release; no factual sign-off is claimed.
4. Whole-file transcription hallucinates repetitive “Okay,” “option B/C,” and “cut cut” stretches in apparent waits. Use isolated audio plus visual checks before applying cuts. Whisper segment timestamps include long pauses and are not sample-accurate splice evidence.

## Camera sync evidence available so far

- Raw OBS 12:18–12:33: Alex announces recording two after overheating and says he will clap.
- Raw OBS 24:37–24:59: announces part three / clap for sync.
- Raw OBS 29:38–29:56: announces part four / clap for sync.

These are search windows only. Camera files are now accessible and aligned through independent dialogue waveform checks, with clap-peak candidates retained in sync-evidence.json. See QA.md for measured offsets and limitations. Do not use file timestamps or the largest isolated peak as the final sync authority.
