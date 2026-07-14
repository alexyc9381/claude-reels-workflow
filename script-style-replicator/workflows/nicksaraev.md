# nicksaraev — Proven-Viral Workflows
> The actual AI systems behind nicksaraev's biggest hits, reverse-engineered into buildable specs.

Source: top-outlier transcripts + teardowns (fetched 2026-07-12), 194K–314K views. The three super-performers below each demonstrate a real, buildable system. His #4 by views, **"Clawdbot Sucks, Actually" (194K)**, is deliberately excluded: it is a debunk/exposé, not a build. It demonstrates no workflow and hands over no deliverable, so there is nothing honest to gate. Its *format* (contrarian teardown) is captured in the teardown doc, not here.

---

## Cinematic Animated Landing Pages — from "Claude Code + Nano Banana 2 + Kling = $15K Animated Sites" (314,000 views)

- **What it does:** Ship a luxury landing page with real 3D-scroll animation (rotating globe, exploded-house reveal, panning interior) in ~10 minutes for a few dollars in tokens plus asset credits, then push it live free. The thing that used to be a $5K–$10K web-design job.

- **The build (the real system, step by step):**
  1. **Claude Code in an IDE.** He runs it inside Antigravity, but any Claude Code setup works. This is the orchestrator that writes the site, wires the animations, optimizes, and deploys.
  2. **A "taste" Skill (design system).** An open-source Claude Skill repo (shared on Twitter by a teenage builder, "Leon's skill") that instills high-end web-design principles: spacing, luxury layout, design schematics. You hand Claude Code the repo URL: `Use this skill to design a high-end website about [interior design]`. Claude fetches the repo, then one-shots a clean site. This Skill doing the design heavy-lifting is why a plain prompt yields a polished result.
  3. **Generate the hero asset (two external tools).** Nano Banana (image model) makes a still (e.g. a globe). Kling 3.0 (video model, accessed via the Higgsfield platform) animates a 5-second 3D render — prompt shape: `Generate a high-quality 3D render of [panning through a scene / an exploding-view diagram], white background, high-quality assets, should read like a landing-page hero, nothing leaves the frame.` 16:9, 1080p, ~36 cents/gen. He generates 2–3 and picks the best.
  4. **Integrate via Claude Code.** Download the mp4 into the project folder, then bark it: `Take interior_design.mp4 and make it the hero-header background, center the header, apply an inward masking gradient so the video doesn't fight the page background.` For the scroll effect: `Create a scroll animation under the hero; as I scroll, reveal two or three text sections and play the exploding-view frame by frame.` Claude builds a locomotive-scroll sequence.
  5. **The performance trick (this is the real magic).** The frame-by-frame scroll is heavy, so Claude **extracts the video into optimized JPEGs, ties each frame to scroll position, and preloads them.** Then the optimize loop: `Make it load significantly faster` → it compresses assets (he shows 5.3 MB → 252 KB). Repeat 3–4× until quality/speed balance.
  6. **Deploy free.** `Make it live on Netlify.` Claude Code deploys to Netlify's free tier (global CDN). Optional: `Mobile-optimize the site` 3–4×.
  - **Prompt structure:** bullet-point brief → Skill URL reference → a chain of verb-first imperatives (`Generate me…`, `Make the background white`, `Make it faster`, `Make it live on Netlify`). No clever prompt engineering, just plain barked commands. The Skill supplies the taste; the model supplies the code.

- **The wow artifact:** The scroll-through where a 3D house **explodes apart frame-by-frame in perfect sync with the scrollbar**, or the hero header whose 3D background subtly tracks the mouse. The <2s state-change: drag the scrollbar, the object detonates and reassembles smoothly. Runner-up on-screen moment: the compression receipt flashing `5.3 MB → 252 KB`.

- **⚠️ Buildable today? PARTLY.**
  - **Real:** Claude Code genuinely builds the React/scroll site, writes the frame-extraction + preload logic, runs the "make it faster" compression loop, and deploys to Netlify (it can run the Netlify CLI / git). The design Skill is a real, importable Claude Skill. This half is not smoke.
  - **Smoke / oversell:** (a) The "$15K" is the price *he* used to charge, not value the viewer captures. (b) The wow assets require **Kling 3.0 + Higgsfield + Nano Banana, all paid third-party tools that are not Claude**, and the mp4 is generated and downloaded by hand, then handed to Claude Code. There is no end-to-end automation. (c) "One-shot" is marketing: the transcript shows him iterating many times (gradient fixes, lag fixes, text-legibility fixes). Alex must not gate a guide that says "one prompt." Gate the honest multi-tool, multi-pass process.

- **The gated deliverable (over-delivers vs the video):**
  - The exact link to the open-source "taste" design Skill + how to import it into Claude Code.
  - The 6 copy-paste prompts in order: (1) Skill-reference build prompt, (2) hero-integration prompt with the inward-masking-gradient clause, (3) the locomotive-scroll prompt, (4) the frame-extraction-to-JPEG + preload prompt, (5) the "make it faster" compression loop, (6) the Netlify deploy prompt.
  - The Kling/Nano Banana asset-gen prompt template (scene, white bg, in-frame constraint) with the "generate 3, pick best" note and the real per-clip cost math.
  - An honest one-line disclaimer: the animated assets need a paid video model; the site/scroll/deploy is pure Claude.

- **Alex's angle:**
  - **Hook (nicksaraev Teardown-1: deliverable × price-collapse + confession-receipt):** "Someone just built a landing page with a 3D scroll effect that used to cost ten grand. It ran for about three dollars." Then the deflate ("everyone shows you a 40-step framework, it's nowhere near that complicated, there's really just three steps").
  - **Formula/teardown to use:** nicksaraev's own **Teardown 1** skeleton (DROP → confession-receipt → DEFLATE to three steps → running cost meter → scale-out → gated CTA). Convert his first-person "I built" to third-person "someone just built."
  - **Broad-TAM framing:** every person who needs a site (coach, Shopify owner, freelancer, local business, founder) wants a premium-looking page without a designer. Keyword idea: **CINEMATIC** or **SITEKIT**.

---

## One-Shot Luxury Websites from a Single Prompt — from "Gemini 3.1 Pro + Antigravity Destroys Every Site Designer" (254,000 views)

- **What it does:** Paste one structured prompt, answer a few questions, and get a pixel-perfect animated luxury landing page (frosted-glass scroll, hover-glow cards, heartbeat animations) in ~5 minutes. No design framework, no 17-step ritual.

- **The build (the real system, step by step):**
  1. **A single mega-prompt (the whole method).** Structure: **role** (`Act as a world-class senior creative technologist and lead front-end engineer`) → **objective** (`architect a high-fidelity, cinematic, pixel-perfect landing page for [business name]`) → **aesthetic-identity slots** (pick from: high-end / organic-tech / clinical / boutique / brutalist-signal; e.g. "a bridge between a biological research lab and an avant-garde luxury magazine") → **stack constraints** (Vite, React, Tailwind CSS, PostCSS, autoprefixer, Lucide React). The prompt pre-decides the navbar, morphing logic, and hero size, which is why it lands consistently.
  2. **The elicitation upgrade (his mini-CLI).** He wraps the mega-prompt in an **ask-user-question** call: it pops a short Q&A (business name, one-line pitch, target customer, aesthetic direction, three value props), feeds the answers into the mega-prompt, plans the implementation, then builds. This is the difference between "paste and pray" and a guided generator.
  3. **Deploy free** on Netlify or Vercel (hobby/free plan): `Host this on Vercel` and the agent walks the deploy end-to-end.
  - **Prompt structure:** role → objective → aesthetic identity → stack. The elicitation step turns four freeform answers into a filled template. **The trick, stated plainly by him: "It's not the prompt, it's the model."** A frontier model + a role-and-constraints prompt one-shots the site; the aesthetic-identity vocabulary is what steers the look.
  - **Multi-instance scale-out (his pitch):** run the same prompt across 5/10/20 model instances in parallel to spin up dozens of custom sites a day (e.g. one per outbound prospect).

- **The wow artifact:** Click "launch," and a finished luxury site renders in seconds: frosted-glass-on-scroll, cards that glow on hover, a live heartbeat/telemetry module, serif+sans mix. The <2s change: the blank preview flips to a fully-designed, animated page.

- **⚠️ Buildable today? BUILDABLE (adapt Gemini → Claude).**
  - **Real:** The video uses Gemini 3.1 Pro, but the identical prompt structure works with Claude — Opus/Sonnet one-shot React + Tailwind landing pages of this quality. The elicitation wrapper is just a Claude Code slash-command / Skill (or a plain interactive question in chat). Deploy-to-Vercel via the agent is real.
  - **Oversell to flag:** "9 out of 10 are pixel-perfect one-shots" is optimistic — realistically expect 1–3 refinement passes (legibility, spacing, mobile). Alex should frame it as "one prompt gets you 90% there," not "perfect every time." No hard smoke here; the caveat is expectation-setting plus the model swap.

- **The gated deliverable:**
  - The full mega-prompt (role + objective + the aesthetic-identity library of 5 named styles + the exact stack list), Claude-tuned.
  - The ask-user-question elicitation flow packaged as a Claude Code slash command / Skill so a non-coder can just answer four questions.
  - The Vercel/Netlify one-line deploy prompt + the "run N instances in parallel for N prospects" scale recipe.

- **Alex's angle:**
  - **Hook (nicksaraev Teardown-2: skeptic-to-believer):** "Claude got scary good at building websites, and the first reaction is that it has to be hype." Then the test framing ("so the move was simple: paste one prompt, run it once, look at what came out. It's clean.") into the deflate ("forget the 17-step 'map your vision and mission' framework, it's literally just a prompt").
  - **Faceless adaptation note:** the original relies on live gasps/"[gasps] Good god" reaction beats, which a faceless mascot can't perform. Substitute the reveal with a hard on-screen before/after cut plus a receipt ("5 minutes, one prompt"), and lean on **Teardown-2's skeptic frame** rather than the reaction beats. If the reveal moment feels flat faceless, borrow Teardown-1's price-collapse spine instead.
  - **Broad-TAM framing:** anyone launching an offer, a portfolio, or a client site. Keyword idea: **ONESHOT** or **LAUNCHPAD**.

---

## Overnight Automations that Replace n8n — from "Claude Routines Just Dropped, And It's Perfect" (210,000 views)

- **What it does:** Claude runs automations on a schedule / trigger / webhook / API with no computer open. It triages your inbox and drafts every reply before you wake up, turns a call transcript into a finished proposal, and chains steps together, replacing drag-and-drop tools like n8n/Make with plain English.

- **The build (the real system, step by step):**
  1. **Create a routine** at `claude.ai/code/routines` (new routine, top right). Fields: **name** → **prompt/SOP** → **repository** → **model** (he uses Opus, 1M context) → **cloud environment** (env vars, API keys, credentials) → **trigger** → **connectors**.
  2. **The prompt is an SOP, not a chat.** Structure it as numbered, unambiguous steps because it runs fully hands-off. Example (inbox triage): `(1) Pull all unreads via the Gmail connector. (2) For each unread, check for prior conversations with that contact; if any, pull them for context. (3) Draft a reply based on what you know about me and the task. (4) When done, use the Slack connector to send me a summary.` Shape = **data-pull → per-item context → draft/act → definition-of-done delivery.** His rule: be *more* precise than in an interactive Skill, because there's no human to steer mid-run — shrink the surface for mistakes.
  3. **Pick a trigger:** schedule (visual hourly/daily picker, e.g. 5:10 a.m.), GitHub event, or API/webhook. You can stack multiple triggers on one routine. The API trigger returns a curl snippet you can fire from anywhere (or from another Claude Code instance).
  4. **Add connectors** via OAuth (Gmail, Slack, etc.) in Claude Code → Settings → Connectors, then attach them to the routine and copy the issued token.
  5. **Multi-routine chaining (the multi-agent piece).** Routines call routines via webhook, and use **managed sessions** — siloed sub-agents with their own containers — for security. His agency chain: sales-call transcript arrives on a **webhook** → **proposal routine** (spawns a managed sub-agent that fills a proposal template + a workflow-diagram draft) → **post-call email routine** → **monitor-for-signature** → on signature, webhook fires the **onboarding routine** (calendar invite + welcome email). Each routine is one agent; the webhook is the handoff.
  6. **The n8n importer Skill.** He built a "routine generator" Claude Skill: copy an n8n workflow as JSON (shift-hover, cmd-C in n8n), paste it, say `Use the routine generator to turn this n8n workflow into a routine`, and it recreates the flow as a natural-language routine (his demo: a Hacker News scraper → markdown report → Slack).
  - **The trick:** hands-off execution means the prompt must be self-sufficient and error-tolerant — more context, tighter steps, an explicit definition-of-done that includes the delivery step (the Slack ping is how you know it ran).

- **The wow artifact:** The routines **calendar view** showing jobs scheduled to fire at 5:10 a.m., then the **Slack DM arriving with drafted replies "while you sleep."** The <2s change: hit "run now" (or fire the API curl), and a live run spins up cloud tool-calls, then the Slack notification pings with the finished drafts.

- **⚠️ Buildable today? BUILDABLE (with two honest caveats).**
  - **Real:** This is a native Anthropic feature per the video (scheduled/webhook/API-triggered Claude agents with Gmail + Slack connectors). Scheduling, connectors, webhook chaining, and SOP-style prompting are all exactly as demonstrated. This environment even exposes scheduled-task/cron tooling, so the scheduled-agent pattern is concretely real.
  - **Caveats to flag:** (a) The **n8n-importer Skill** and the **routine-generator** are things *he* built and shares — buildable, but the viewer assembles them; they aren't a button in the product. (b) **Token cost > compute cost:** he explicitly warns *against* porting all your n8n flows over, because tokens are pricier than n8n's compute for high-volume flows. So "kills n8n" is a headline; the honest scope is "one-shot the flows you'd otherwise spend hours building," not "migrate everything." (c) Connectors require one-time OAuth. No smoke, but don't sell "replace your entire automation stack."

- **The gated deliverable:**
  - The step-by-step routine setup (fields, model choice, cloud env, trigger selection) with screenshots.
  - Two ready SOP prompts: the **inbox-triage-and-draft** routine and the **transcript-to-proposal** routine, each written in the data-pull → context → act → deliver shape.
  - The **webhook-chaining recipe** (transcript → proposal → post-call email → signature-monitor → onboarding) with the managed-session/sub-agent note.
  - The Gmail + Slack connector OAuth walkthrough, and honest guidance on *which* flows are worth porting vs leaving on n8n (the token-cost caveat).

- **Alex's angle:**
  - **Hook (nicksaraev Teardown-3: news-peg + category-kill + old-way/new-way):** "Claude just got the ability to run itself on a schedule, no computer, no you." Then old-way/new-way contrast ("the old way: open the inbox, read everything, write each reply, do it again tomorrow. The new way is the exact same thing, except you just describe it once").
  - **Formula/teardown to use:** nicksaraev's own **Teardown 3** (this is the most on-brand video for Alex's Claude/agents/automation niche). Keep the news-peg "just," the old-way/new-way pair, the "replaces the exact same job" line; strip jargon (no "webhook," "routine spec," "managed session" in the VO — plain-swap to "it runs itself every morning").
  - **Broad-TAM framing:** everyone has an inbox, a to-do list, and repetitive follow-ups. A freelancer chasing invoices, a coach confirming bookings, a store owner answering the same emails. Keyword idea: **AUTOPILOT** (note: **CHASE** is already used for the invoice-specific variant in Teardown 3, so use a distinct one).

---

*Honesty pass:* WF1 is rated PARTLY because the viral wow (3D animated assets) needs paid non-Claude tools and manual handoff, and "$15K / one-shot" is framing, not fact — the site-build/scroll/deploy half is genuinely Claude. WF2 is BUILDABLE once you swap Gemini→Claude and set expectations at "90% in one prompt, 1–3 refinements." WF3 is BUILDABLE as a native scheduled-agent feature; the n8n-importer and full-stack-replacement claims are the parts to soften. No gated guide here promises something Claude can't do.
