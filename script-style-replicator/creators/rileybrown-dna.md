# rileybrown — Script DNA
> Source stamp: 7 transcripts (1,000,000 → 116,000 views), TikTok + YouTube shorts, fetched 2026-07-12. No prior hand-written ref — this is the first profile, grounded 100% in the transcripts. One near-duplicate pair in the set: "You need to learn OpenClaw" (154K) and "OpenClaw Blender part 2" (116K) are the same build reposted, so treat that skeleton as weighted-high (it ran twice).

## 0. Voiceprint
He narrates a live screen-build in real time as a running stream of awe: he blurts a capability claim ("this can literally control Blender"), speaks his prompts out loud, then reacts out loud to every output ("Oh, let's go!", "Boom", "What the hell") until the thing ships to a public link.

## 1. Opener / Hook Formula

**Primary template (5 of 7 videos):** an awe interjection, then a "this thing / my thing can do a shocking thing" capability claim, in the first two sentences.

```
[AWE INTERJECTION]. [This right here is / (Tool), which is running on] my [SETUP],
and it can [literally] [SURPRISING CAPABILITY].
```

- Awe interjection leads in 4 of 7: "Oh my god" (Blender 704K; Codex 142K), "No way" (OpenClaw 154K; Blender pt2 116K). The 1M video's title itself is the interjection: "Oh my.. this shouldn't be possible."
- Capability claim lands in sentence 1 or 2 in 7 of 7. He never eases in — the value noun ("Blender", "video editor", "AI agent", "app") arrives inside the first ~12 words.
- "literally" is the signature hook intensifier (3 uses, all in the "it can literally control Blender" opener).

**Variant openers:**
- Tool-first authority flex: "We're using Quad [Claude] Opus 4.6, which is the best AI coding model in the world." (hinge, 1M) — names the model + a superlative, then immediately speaks the build prompt.
- Setup-inventory: "I just plugged this AI agent into this app that I vibe coded and it has access to my Slack, my notion to-do list, and my calendar." (MCP, 183K) — lists the connected tools as the hook.
- Meta / in-progress: "Cloud [Claude] code is now my video editor, so I'm working on this video and here I say this…" (video editor, 357K) — the title is a bald present-tense claim ("X is now my Y").

**The rules that make the hook fire:**
1. **Awe first, explanation never.** Open on a reaction word, not a setup. The viewer feels the surprise before they understand it.
2. **Impossible-sounding pairing.** Bolt an everyday tool to an unexpected controller: agent → Blender, Claude Code → video editor, vibe-coded app → Slack/calendar. The gap IS the hook.
3. **Name the frontier tool + a superlative.** "the best AI coding model in the world," "this shouldn't be possible" — stake a big claim you're about to prove live.
4. **Value noun by word ~12, zero setup throat-clearing.** No "hey guys," no channel intro — the demo is already running.
5. **Present tense, happening-now.** "is now my," "can now control," "This right here is" — never "I built a thing that."

**5 verbatim opener lines:**
- "We're using Quad Opus 4.6, which is the best AI coding model in the world." (hinge generator, 1M)
- "Oh my god. Open Claw, which is running on this Mac Mini, can now control Blender." (Blender, 704K)
- "No way. This right here is my open claw AI agent running on this Mac mini and it can literally control Blender." (OpenClaw, 154K)
- "Oh my god, Codex is actually insane. Look at this." (Codex, 142K)
- "I just plugged this AI agent into this app that I vibe coded and it has access to my Slack, my notion to-do list, and my calendar." (MCP, 183K)

## 2. Structural Skeleton (beat map)

There are no spoken section labels — the structure is carried by the **prompt → generate → react → escalate** loop, run 2–3 times, then a ship. The label grammar is implicit but consistent: each cycle is bookended by "Okay" (23 uses — his scene-cut marker) and closed by "Boom" / "Let's go" (19 combined) on payoff.

**Ordered beats:**

1. **HOOK — awe + capability claim.** Function: shock + promise. *"Oh my god. Open Claw… can now control Blender."*
2. **FIRST PROMPT (spoken live).** Function: show the how *partially*, by voicing the ask as he types it. *"Please fill a Tinder slash hinge profile generator using the nano banana API… similar to Netflix mobile app."*
3. **WAIT + FIRST REACTION.** Function: manufacture suspense then relief. *"All right, let's see. Okay, so it's done. Here we go."* / *"Oh, what is it adding? Look at this."*
4. **PROOF ASIDE (mid-build).** Function: prove it's real, not faked. *"what's cool, we set up a database… we can actually see all of these photos are saved in the database. And so this has a full front end and it has a back end."*
5. **ITERATE — the "but I want to change X" turn.** Function: re-hook by raising the bar. *"AI created this app in one single prompt, but I do want to make a few changes."* / *"Okay, here's my final prompt."*
6. **ESCALATION PROMPT (the big swing).** Function: the wow-peak. A bigger, more open-ended ask. *"Based on everything that you know about me, I want you to complete this room… make the entire room a big room with many walls."*
7. **PAYOFF / SHIP.** Function: tangible result you could touch. *"Please deploy this to Vercel. Send me a public link… This is actually on the internet."* / *"my app is sent to the app store."*
8. **CTA — the longer-video / comment handoff.** Function: route to the gated full method. *"If you want to learn how to do this, comment…"* / *"I just made a longer video showing you exactly how to set this up."*

**Target length / word budget:** the outliers run 267–374 spoken words (1M-view hinge = 322). The 530-word Codex piece is the long tail. For an Alex reel, honor the cap (target_seconds × 4.3): a 40s script ≈ 170 words, so compress to Hook → one spoken prompt → one escalation → ship → CTA.

## 3. Per-Beat Micro-Templates

- **Hook:** `[Oh my god / No way]. This right here is my [TOOL/AGENT] and it can literally [SURPRISING CAPABILITY].`
- **First prompt:** `Please [ACTION] [OBJECT] using [NAMED API/TOOL], make it [STYLE REFERENCE like "similar to Netflix"].`
- **Wait + react:** `All right, let's see. Okay, [it's done / here we go]. [Oh, wow / Look at this].`
- **Proof aside:** `And what's cool, [we set up / it has] a [DATABASE / back end / front end], so [we can actually see PROOF].`
- **Iterate turn:** `[AI did this in one prompt], but I do want to make a few changes. [Okay, here's my final prompt].`
- **Escalation:** `Based on everything you know, I want you to [OPEN-ENDED BIG ASK]. Use your imagination.`
- **Ship:** `Please deploy this to [Vercel / the app store]. Send me a public link. Okay, it's done. This is actually on the internet.`
- **CTA:** `If you want to learn how to do this, comment [KEYWORD].`

## 4. Sentence Rhythm & Mechanics

- **Avg sentence length: short and choppy, ~9–11 words.** Sentences fragment into interjections mid-flow: "Oh. Oh, he blinks. Let's go. Okay." The only long sentences are the spoken prompts (20–30 words), which he reads as one breath.
- **Opener length: very short.** When it leads with an awe word, sentence 1 is 2–3 words ("No way.", "Oh my god.") followed by a 12–15 word capability claim.
- **Imperative-heavy.** "please" appears 16×, almost all inside spoken prompts ("Please make this guy… red", "Please deploy this to Vercel"). The narration around the prompts is declarative present tense ("it added this," "we have a wall").
- **Number / proof density is spiky, not constant.** Numbers cluster at the proof beats: "one single prompt," "two or three prompts," "100% with AI in just three prompts," "7 minutes and 26 seconds later," "about 5 minutes." Roughly one hard number per 60–80 words.
- **Causal connectors:** "so" (37×) and "and so" (6×) are his default glue — he chains observations with "so…" rather than full stops. "but" marks the iterate turn ("…one single prompt, but I do want to make a few changes").
- **Signature cadence markers:** "Okay" (23×) is the scene-cut / new-beat marker. "Let's see" (9×) opens a wait. "Boom" (5×) and "bang" (2×) punctuate an instant result. "Let's go" (14×) is the payoff exhale. He stacks reaction words: "Oh, oh, let's go!"
- **Punctuation feel:** run-on excitement, lots of commas, near-zero semicolons, frequent standalone one-word sentences ("Boom." "Okay." "Yup.").

## 5. Signature Phrase Bank (verbatim)

- **Openers / awe:** "Oh my god" · "No way" · "This right here is my…" · "Oh my.. this shouldn't be possible" · "…is actually insane" · "which is the best AI coding model in the world"
- **Transitions / cadence:** "Okay, so…" · "And so…" · "All right, let's see" · "Let's see if it…" · "Now let's…" · "here's my final prompt" · "but I do want to make a few changes"
- **Intensifiers:** "literally" · "actually" ("Codex is actually insane," "this is actually on the internet") · "100%" · "the best… in the world" · "basically"
- **Reaction beats:** "Boom" · "bang" · "Let's go!" · "Oh, let's go!" · "Look at this" / "Look at that" · "What the hell" · "What is going on?" · "This is actually insane" · "Oh, wow" · "Ooh, these are kind of nice"
- **Proof phrases:** "AI created this app in one single prompt" · "in just three prompts" · "100% with AI" · "7 minutes and 26 seconds later" · "we set up a database… we can actually see" · "This is actually on the internet"
- **Ship phrases:** "I'm going to hit deploy" · "Please deploy this to Vercel. Send me a public link" · "my app is sent to the app store" · "we can submit it to the app store directly from vibecode.dev"
- **CTA phrases:** "If you want to learn how to do this, comment…" · "I just made a longer video showing you exactly how to set this up. Uploaded it on YouTube." · "you will literally get fully up to speed if you watch this video"

## 6. Retention / Escalation Devices

- **Live reaction stream.** A reaction word roughly every 2 sentences ("Let's go" 14×, "Boom" 5×, "Look at" 9×) keeps a dopamine tick running so nobody scrolls.
- **Manufactured suspense → relief.** "All right, let's see" / "So now we're gonna wait" sets a tiny cliffhanger; "Okay, it's done. Boom" pays it off seconds later.
- **Real confusion as authenticity.** He leaves in the failures: "Why is the Mac Mini so much bigger? What the hell… now it's way too big! Still balancing between extremes… okay, oh, it figured it out, let's go!" The near-fail makes the win land harder.
- **The "but I want to change X" re-hook.** Every video resets tension by demanding a harder thing after the first success.
- **Escalating asks.** Each cycle's prompt is bigger/vaguer than the last, peaking at an open-ended "use your imagination based on me" swing.
- **Number-drops as checkpoints.** "one single prompt," "two or three prompts," "7 minutes and 26 seconds" — each number re-certifies that this is fast and real.
- **Physical payoff.** The end is always something you can touch — a public URL opened on his phone, an app in the app store. "This is actually on the internet. You could go to this link right here."

## 7. Proof & Credibility Style

- **Prompt-count receipts:** "AI created this app in one single prompt," "We created this app with Claude Opus 4.6 Max in basically two or three prompts," "I did this 100% with AI in just three prompts."
- **Stopwatch receipts:** "7 minutes and 26 seconds later," "get it running in about 5 minutes."
- **Show-the-plumbing:** he clicks into the database / back end to prove it's a real full-stack app, not a mockup ("if we click on database here, we can actually see all of these photos are saved").
- **Ship-it-live proof:** deploying to Vercel and opening the link on his phone, or submitting to the app store on camera, is the ultimate credibility beat.
- **Name-drops (tool authority):** Claude Opus 4.6 / 4.6 Max, Codex, GPT-5.5, nano banana API, Suno.ai, Vercel, Expo, vibecode.dev, Blender, Slack, Notion, "n8n/noode backend," MCP. He treats the model name as a status object ("the best AI coding model in the world").
- **No fabricated third-party quotes** — his proof is his own screen, stated plainly.

## 8. CTA Formula

Two verbatim shapes, both routing to a gated full method:

1. **Comment-keyword (cut hard):** *"If you want to learn how to do this, comment…"* (MCP, 183K) — the video literally ends on the word "comment." This is already Alex-compliant (cut on keyword).
2. **Longer-video handoff:** *"by the way, I just made a longer video showing you exactly how to set this up. Uploaded it on YouTube."* (Blender, 704K) / *"I just made a hour and 43-minute video that explains every single thing… you will literally get fully up to speed if you watch this video."* (Codex, 142K)

**Template:** `[If you want to learn how to do this], comment [KEYWORD].`
**Mechanics:** the short-form never hands over the full build. The demo sells the *result*; the complete step-by-step is the thing the keyword/longer-video unlocks. That is exactly Alex's gate-the-how, already native to Riley.

## 9. Why It Works (transferable mechanism)

- **Awe-before-explanation.** Leading with a reaction word ("Oh my god") makes the viewer feel surprise before they've parsed what's happening — curiosity is loaded in 2 words.
- **Impossible pairing.** Bolting a normal tool to an unexpected controller (agent→Blender) creates a "wait, that's possible?" gap the whole video pays off.
- **Real-time = un-fakeable.** Narrating live, keeping the fumbles in, and opening the final URL on a phone reads as proof, not marketing.
- **Escalation loop.** Prompt → win → "but change this" → bigger win keeps resetting tension so the retention curve never flattens.
- **Number-certified speed.** "One prompt," "three prompts," "7 minutes" reframe the wow from "cool demo" to "you could do this today."

## 10. Adapting to Alex (fusion layer)

**Transfers cleanly:**
- The **awe-interjection hook** ("No way." / "This shouldn't be possible.") over a clay-mascot reaction pose + screen recording.
- The **capability-claim-by-word-12** structure.
- **Spoken partial prompts** as follow-along value (the rough ask is the value; the full prompt set stays gated).
- The **escalation loop** and **number-drop proof** ("one prompt," "in about 5 minutes").
- The **"This is actually on the internet / shipped" payoff.**
- The **comment-keyword CTA** — Riley already cuts on "comment."

**Conflicts with Alex's HARD RULES + resolution:**
- **First-person live anecdote (his entire format is "I'm working on this video / my Mac Mini").** → Convert to second-person value + third-person receipts. "I plugged this agent into my Slack" becomes "You point one agent at your Slack, calendar, and notes" and "This is making founders hours a week." Keep the awe; drop the "me."
- **Em-dashes / run-on ASR dashes.** → None. Use commas, periods, colons only.
- **Hands over the how (he speaks full prompts on screen).** → Keep ONE rough spoken prompt as the follow-along tease; gate the complete word-for-word prompt/system behind the keyword. Never voice the full replicable method.
- **Trailing tail after CTA ("…and I'll shoot them over to you," "Uploaded it on YouTube").** → Trim. End hard on the keyword.
- **Jargon (MCP, noode backend, Expo token, localhost 8888).** → Strip to the 12-year-old parse test. "MCP" becomes "you give it access to your apps." Keep model names (Claude, Opus) as flavor, not requirements.
- **Breadth litmus.** → Riley's builds skew technical (Blender, GitHub repos). Choose Alex topics a freelancer, Shopify owner, coach, AND founder can all use immediately (an agent that answers DMs, an app built from a sketch, a Skill that does your invoices).

**Gate-the-how mapping:** SHOWN = the awe result, one rough spoken prompt, the ship, the numbers. GATED behind keyword = the full prompt text, the tool wiring, the step-by-step setup.

## 11. Ready-to-Run Generation Template

> **Prompt to fire:** "Write a 35–45s faceless Alex reel about **[TOPIC]** in rileybrown style. Voice: live-build awe narration spoken to *you*, present tense, short choppy sentences, one hard number as proof. HARD RULES: no em-dashes, no first-person anecdote (use *you* + third-person receipts), gate the full method (show only one rough spoken prompt), cut hard on the comment keyword. Follow this skeleton:
>
> 1. **HOOK (2–3 words awe + capability claim, value noun by word 12):** `[No way / This shouldn't be possible]. [TOOL] can now [SURPRISING CAPABILITY] for you.`
> 2. **ROUGH SPOKEN PROMPT (the follow-along tease, partial):** `You just tell it: "[PLAIN-LANGUAGE ASK]."`
> 3. **WAIT + REACT:** `Give it a second. Okay. [Boom / Look at this]. [PROOF OF REAL OUTPUT].`
> 4. **ESCALATION (bigger ask):** `Now push it: "[HARDER, MORE OPEN-ENDED ASK]." [Let's go].`
> 5. **SHIP + NUMBER PROOF:** `[Deployed / done] in [ONE / THREE prompts]. This is actually live. It's already making [people $X / hours back].`
> 6. **CTA (cut on keyword):** `Want the exact setup? Comment [KEYWORD].`
>
> Keep it under [target_seconds × 4.3] words. No jargon. Keep model names as flavor only."

## 12. Worked Example (fresh Alex-niche topic, HARD-RULES-clean)

**Topic:** Claude Code turning a rough sketch into a real, deployed client-dashboard app (~40s, ~168 words). Keyword: **BUILD**.

---

No way. Claude just turned a napkin sketch into a real, live app. Watch this.

You give it one photo of your scribbled layout and you tell it, in plain words: build me a client dashboard that matches this, with a login and a place to track projects.

Give it a minute. Okay. Boom. There's the front end. And look, it wired up a real database behind it, so every client you add actually saves. This is not a mockup.

Now push it. Tell it: add a payments page and send me a public link.

Let's go. It's deploying. Okay, it's done. This is actually on the internet. You could open it on your phone right now.

A full app, from a sketch, in three prompts. No code. That is making freelancers and agencies hours back every single week.

Want the exact prompt I used to get this clean on the first try? Comment BUILD.

---

*Rule check:* no em-dashes; no first-person anecdote (the build is spoken to "you," proof is third-person "making freelancers and agencies hours back"); the how is gated (one rough spoken ask shown, full prompt behind BUILD); cut hard on the keyword; value noun ("real, live app") lands by word ~8; "three prompts" number-proof; awe hook + escalation loop + ship payoff preserved; ~168 words fits the 40s budget.
