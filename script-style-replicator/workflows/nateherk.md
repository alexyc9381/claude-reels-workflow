# nateherk — Proven-Viral Workflows
> The actual AI systems behind nateherk's biggest hits, reverse-engineered into buildable specs.

Source: top-outlier transcripts + teardowns (fetched 2026-07-12), 100K–161K views. Nate's outliers cluster tightly (~1.1–1.5x his median), so the signal is *repeatability*, not multiple. The four biggest are below. Note the honest split: two are clean, buildable, over-deliverable systems (GWS connector, the "roast" council); one is a real pipeline that leans on paid third-party tools (Apple-style sites); one is a genuine orchestration that the video massively oversells (Fable 5 auto-video). Alex should lead his own channel with the two clean ones and treat the flashier two as "show the wow, gate the honest version."

---

## Claude Code ↔ Your Whole Google Workspace — from "Google's New Tool Just Solved A Major Claude Code Problem" (161,000 views)

- **What it does:** Lets Claude Code read, write, and manage your entire Google Workspace (Drive, Gmail, Calendar, Docs, Sheets, Slides) from inside any project, and produce *properly formatted* Google Docs (real headers, inserted images, working links) instead of the ugly raw-markdown blob you get from a naive API dump. In the video: paste a YouTube link, get back a finished, branded resource guide as a live Google Doc.

- **The build (the real system, step by step):**
  1. **Claude Code as the orchestrator.** No talking-head, no external app; the whole thing runs in the terminal/IDE.
  2. **A Google Workspace command-line tool wired in.** The video calls it "GWS" (Google Workspace CLI). The mechanism that matters: Claude does not talk to Google over a brittle API call or an MCP; it **runs a bash/terminal command** that authenticates to your Google account and performs the operation. Because Claude Code can already run shell commands, giving it a CLI that speaks Google is the entire unlock. The CLI exposes verbs (search, list, upload, download, move, copy, share) across Drive/Gmail/Calendar/Docs/Sheets/Slides, plus "multi-step workflow recipes" (Nate frames these as skills).
  3. **The formatting trick (why the output isn't ugly).** A raw API/markdown path renders as plain text. Routing document creation through the Workspace tooling (which builds real Doc structure: heading styles, image-as-header, hyperlinks, horizontal rules) is what makes the result look like a designed guide instead of a text file.
  - **Prompt structure:** discovery first (`What can you do with GWS?`) to surface the verb list, then a single plain-English job (`create me a YouTube resource guide from [link]`). No prompt engineering; the CLI + Claude's agentic loop (download transcript → assemble → format → insert image → add CTA → return link) does the work.

- **The wow artifact:** The <2s state-change is the click-through from a terminal "here's your link" to a **fully formatted Google Doc** opening in the browser: image header on top, a real hyperlink, section breaks, CTA at the bottom under horizontal rules. The pain/payoff contrast (ugly raw markdown → clean branded doc) is the shareable beat.

- **⚠️ Buildable today? BUILDABLE (with a sourcing caveat).**
  - **Real:** Claude Code genuinely runs bash, so a CLI (or a Google Workspace MCP connector) that authenticates via OAuth and drives the Docs/Drive/Gmail/Calendar APIs is a real, working pattern. Producing a *formatted* Google Doc (heading styles, inserted image, links, horizontal rules) is fully achievable via the Docs API / a wrapper CLI. Downloading a YouTube transcript and assembling a guide is standard.
  - **Caveat / do-not-oversell:** the specific "GWS" tool Nate installs is one particular utility; the video implies "one simple install and you're done." In practice the honest setup is: install the CLI (or connect the Google Workspace connector), run a **one-time OAuth consent** in the browser, and grant scopes. That auth step is the only friction, and Alex's guide must include it rather than pretending it's frictionless. The capability itself is not smoke.

- **The gated deliverable (over-delivers vs the video):**
  - The exact tool to install (the Workspace CLI **or** the equivalent Google Workspace MCP connector, whichever is currently live) + the one-time OAuth/scopes walkthrough with screenshots.
  - The discovery prompt (`what can you do with...`) and the "create a formatted resource guide from this link" prompt, plus the CLAUDE.md line that tells Claude to always build Docs through the Workspace tool (not raw markdown) so formatting never regresses.
  - 3 recipe prompts beyond the demo: "file this week's invoices into the right Drive folder," "draft replies to every unread email from a client," "build a formatted meeting brief from my calendar + the attendees' last emails."
  - Honest disclaimer: one OAuth consent required; nothing leaves your Google account.

- **Alex's angle:**
  - **Hook (nateherk Teardown-1, the Google-GWS formula):** "One file just connected Claude to your entire Google Workspace." Value noun ("workspace") by ~word 7, novelty peg ("new"), the anaphora reveal mid-clip ("Not an API call. Not a copy-paste. A live, formatted doc.").
  - **Formula/teardown to use:** nateherk's own **Teardown 1** skeleton (news-drop hook → universal pain "all your stuff lives in Google" → name-drop the enabler → "Not X. Not Y. But Z." reveal → "boom" formatted-doc payoff → gated CTA). Alex trims the "click the play button / see you over there" tail and cuts on the keyword.
  - **Broad-TAM framing:** everyone lives in Gmail/Drive/Calendar. A coach, a Shopify owner, a freelancer, an agency, and a founder all want AI that writes *into* their real documents, not a chat window. Keyword idea: **BRIDGE** or **WORKSPACE**.

---

## Image → Video → Animated Landing Page — from "How I Build $10,000 Apple-Style Websites with Claude Code" (148,000 views)

- **What it does:** Produces a luxury, Apple-tier product landing page with real scroll-triggered 3D animation (a product opening up, layers exposing, fruit dropping into a blender) in ~30 minutes. The page has premium copywriting too, not just visuals. The bait: it looks exactly like Apple, then "this isn't Apple, I built it."

- **The build (the real system, step by step):**
  1. **Generate the hero stills (image model).** Nano Banana 2, 16:9, a tight product-photography prompt: `professional studio-grade image of a [product], plain all-black background, no shadows, no hands, no reflections.` Save the output, feed it back as an image input, change one clause (`same prompt, but filled with fruit and juice`) to get the matched end-frame. Start-frame + end-frame is the whole animation trick.
  2. **Write the video prompt with Claude.** Hand Claude the start and end frames: `help me make an AI video prompt where the lid floats off, fruit and juice drop in, and the lid goes back on.` Claude turns the desired *motion* into an engineered video prompt. (Meta-move: use Claude to prompt the video tool.)
  3. **Render the loop (video model).** Paste that prompt into Kling ("Cling"), set the same image as first and last frame so the clip loops seamlessly. Download the mp4.
  4. **Build the site (Claude Code + a front-end/design skill).** Drag the mp4 into the project. `Help me create a one-page product landing page for this product.` Claude Code runs *agentically*: it interviews you (product name, brand, which content sections, "full premium"), then builds a scroll-animated site wired to the video frames, writes the premium marketing copy ("we engineered a force of nature that reduces anything to nothing"), and serves it live at localhost.
  - **Prompt structure:** tight image spec → Claude-authored video prompt → plain build command → answer the agent's planning questions. The design skill supplies the taste; the frame pair supplies the animation; Claude wires them together.

- **The wow artifact:** The live scroll-through: as you drag down, the product **appears, opens, and the fruit materializes in sync with scroll**, with Apple-grade headline copy fading in behind it. The <2s beat: scroll a few pixels, a static hero becomes a cinematic product reveal. The "this isn't Apple" reframe is the share trigger.

- **⚠️ Buildable today? PARTLY.**
  - **Real:** Claude Code genuinely builds the scroll-animated React site, wires the video/frames to scroll position, writes the premium copy, and runs the agentic planning interview. A front-end design skill is a real, importable Claude Skill. That half is solid.
  - **Smoke / oversell:** (a) "$10,000" is the price such work *used* to cost, not value the viewer captures. (b) The wow assets require **Nano Banana 2 + Kling, both paid third-party tools that are not Claude**, and the mp4 is generated and hand-dragged into the project. There is no end-to-end automation. (c) "30 minutes" hides real iteration; even in the demo Nate says "we maybe want to fix that a little bit." Alex must gate the honest multi-tool, multi-pass process, not a one-prompt fantasy.

- **The gated deliverable (over-delivers vs the video):**
  - The exact front-end/design Skill (link + how to import into Claude Code) that produces the premium look.
  - The image prompt template (studio-grade / black bg / no shadows-hands-reflections) + the "change one clause for the end-frame" trick.
  - The "have Claude write the video prompt from my two frames" prompt, and the loop trick (first frame = last frame in Kling).
  - The Claude Code build prompt + the exact planning answers that yield "full premium," plus a note that the copy is AI-written and editable.
  - Honest disclaimer: the animation needs a paid image + video model; the site, scroll-wiring, and copy are pure Claude.

- **Alex's angle:**
  - **Hook (nateherk Teardown-2, the $10k-Apple formula):** "This looks like Apple's site. It isn't. It was built with Claude Code in one afternoon." Reveal flip is the spine.
  - **Formula/teardown to use:** nateherk's own **Teardown 2** (result hook → iconic-brand familiarity bait → "this is not [brand]" reveal → name-drop the skill → partial-prompt generosity → live-scroll receipt → gated CTA). Convert "I build" → "how to build." A cleaner-fit alternative if Alex wants an even tighter build: **nicksaraev's** cinematic-landing-page teardown covers the same terrain with a heavier "deflate to 3 steps" cadence.
  - **Broad-TAM framing:** anyone who needs a site that looks expensive without a designer, coach, agency, Shopify store, local business, founder. Keyword idea: **APPLE** or **HERO**.

---

## Autonomous "Build → Verify" Agent (one-goal, self-checking) — from "Claude Fable 5 Made This Entire Video By Itself" (146,000 views)

- **What it does:** You set one goal, walk away, and Claude runs a long-horizon job end to end, then **spins up a verification workflow that checks its own output** and re-does anything that fails, before declaring done. In the video, the "job" is producing a finished YouTube video (research → script in his voice → voice clone → avatar render → edit → motion graphics → self-review), but the transferable system is the pattern, not the video.

- **The build (the real system, step by step):**
  1. **`/goal` (a long-running autonomous command).** Nate types one "goal" prompt into Claude Code and leaves. The goal includes *context and stakes* ("this goes to my YouTube channel; if it looks bad it damages my reputation; only stop when you're 100% confident it's high quality") because he finds the model performs better when it understands *why*, not just *what*.
  2. **A chain of specialist stages, each a real tool call.** For his video: Claude reads the source, fact-checks, writes the script using a **voice playbook built from his own transcripts**; sends chunks (split under ~1 min to avoid voice drift) to a pre-trained 11Labs voice clone; renders each chunk on a HeyGen avatar; stitches with FFmpeg; builds motion graphics as real code (HTML + GSAP inside "hyperframe" skills), timed to the transcript.
  3. **The verification loop (the actually-transferable core).** At the end, the goal instructs Claude to **spin up a dynamic workflow of sub-agents** that render frames from every scene, *visually* review them ("motion graphics come in on time, nothing out of bounds, everything's aesthetic"), and re-render anything that looks off until it all passes. Vision + sub-agents doing QA on the primary agent's work is the reusable machine.
  - **Prompt structure:** a "word-vomit" goal = objective + context/stakes + an explicit *"after you build it, verify it: use a dynamic workflow to visually validate everything is perfect"* clause. The stakes clause and the mandatory self-verification clause are the two tricks that make an open-ended goal actually finish well.

- **The wow artifact:** The video you're watching *is* the proof. The <2s reveal: "What you're watching was not filmed. This avatar is AI. Every word was written by Claude." A self-referential artifact is the most airtight show-don't-claim receipt there is. Secondary wow: the terminal at the end showing "done, video ready to upload," token count, and the self-verification log.

- **⚠️ Buildable today? PARTLY, leaning SMOKE on the "one prompt" claim.**
  - **Real and transferable:** the **build-then-self-verify pattern** is 100% buildable today. Claude can run a long goal, spin up sub-agents, use vision to review rendered output, and iterate until a checklist passes. The "give it stakes/context" and "make it prove it's done" tricks are legitimately effective. This core is the honest deliverable.
  - **Smoke / oversell:** the "one prompt and walk away and get a finished YouTube video" framing is heavily oversold, and **Nate says so himself**: it required his pre-built hyperframe/GSAP skills, a *pre-trained* 11Labs voice clone, a HeyGen avatar, the **Max plan**, ~380–400K tokens, and ~40% of a $200/month plan in one hour, and he admits "I'm not convinced you'd get the same results if you copied the prompt." A fresh user with none of those assets does **not** get this. Alex must gate the *pattern* (autonomous build + self-verification), not the fantasy of a one-shot auto-video.

- **The gated deliverable (over-delivers vs the video):**
  - A reusable **"goal + self-verify" skill/template**: the goal-prompt scaffold (objective + context/stakes clause + mandatory "spin up a verification workflow that visually validates X, Y, Z and re-does failures until they pass" clause).
  - The sub-agent QA pattern: how to have Claude render/screenshot its own output and score it against an explicit acceptance checklist before declaring done.
  - Honest cost/setup reality: what actually needs to pre-exist (voice clone, avatar, custom skills, plan tier, token budget) so nobody burns half their plan expecting magic.
  - A **stripped-down version anyone can run today** on a non-video job (e.g. "build this report and verify every number against the source before finishing"), so the guide over-delivers on breadth.

- **Alex's angle:**
  - **Hook (nateherk Teardown-3, the self-proof formula):** point the frame at a real artifact. "This entire [thing] was built and checked by an agent. Nobody reviewed it. It reviewed itself." Negation anaphora is the spine ("Nobody wrote it. Nobody edited it. Nobody checked it.").
  - **Formula/teardown to use:** nateherk's own **Teardown 3** (self-referential reveal → negation anaphora → news/why-now peg → third-person proof stack → "how did this get made" gated mechanism → "one input in, finished output out" seal). Cut the insider tool-stack (FFmpeg/GSAP/hyperframes) that Nate leans on; it's too deep for Alex's breadth rule.
  - **Broad-TAM framing:** reframe off "video" (small TAM) onto "an agent that does the job AND checks its own work overnight," a report, a week of content, a data cleanup, a migration. Every solopreneur wants work that verifies itself. Keyword idea: **OVERNIGHT** or **VERIFY**.

---

## The "Roast" Council — pressure-test any idea before you build — from "How Claude is Creating a New Generation of Millionaires" (116,000 views)

- **What it does:** Before Claude builds anything, it spins up a small council of sub-agent personas that argue for and against your idea (advocate, critic, objective researcher), each grounded in your real business context, and returns one clean verdict: **Go / Reshape / Kill**. It stops the model's sycophancy from hyping a flawed idea into a build. This is the single most broad-TAM, cleanly-buildable workflow in Nate's catalog.

- **The build (the real system, step by step):**
  1. **Claude Code with persistent business memory.** A CLAUDE.md / memory layer that knows the user's business, team, priorities, and past failures. The council members read this context, which is what makes the critique specific instead of generic "vibes."
  2. **The "roast" skill = a multi-agent council.** One invocation (`grill/roast this idea`) spins up several sub-agent personas: one makes the strongest case *for* the idea, one hunts every hole and tells you it sucks, one gathers evidence and judges purely on objective logic/research. Each argument must be backed by something real, not vibes.
  3. **One verdict out.** The council synthesizes to a single call: **Go** (idea's good), **Reshape** (fix these holes first), or **Kill** (drop it). Only survivors proceed to the build. Then the wider 4-step method around it: get on a paid plan → pick ONE task → describe it + run the roast before building → build in baby steps → **make it prove it's done** (verification again, Nate's recurring thesis).
  - **Prompt structure:** the skill file defines the personas + the "every point must cite something real" rule + the Go/Reshape/Kill output schema. The user just says "roast this idea"; the skill supplies the council. Nate explicitly notes it's "just a file you drop into Claude" and you customize the personas for your use case.

- **The wow artifact:** The <2s beat is the terminal spawning a **visible council of named sub-agents** all thinking at once, then collapsing to one stamped verdict card: **GO / RESHAPE / KILL**. The "one of them tells me my idea sucks" line is the memorable, screenshot-able hook.

- **⚠️ Buildable today? BUILDABLE.** This is the cleanest of the four. Claude Code genuinely runs multiple sub-agents with distinct persona prompts (via the Task/sub-agent mechanism), grounds them in a shared memory/CLAUDE.md, and synthesizes a verdict. No third-party tools, no paid asset pipeline, no oversell. The only honest caveat: "grounded in your business context" is only as good as the memory you've actually written, so the deliverable must include how to seed that context (which pairs perfectly with the "grill me" extraction skill from Nate's 115K video).

- **The gated deliverable (over-delivers vs the video):**
  - The actual **roast skill file**: the persona definitions (advocate / critic / objective researcher, plus optional extras), the "cite something real, no vibes" constraint, and the Go/Reshape/Kill output schema, ready to drop into `.claude/skills/`.
  - How to wire it to memory so the council knows the user's business (and the companion "grill me" extraction move to build that context in the first place).
  - The surrounding 4-step operating loop (paid plan → one task → roast-before-build → verify-before-done) as a one-page checklist.
  - Bonus: a customization guide so a designer, a coach, or a store owner can swap the personas for their domain.

- **Alex's angle:**
  - **Hook (nateherk Teardown-4, the barrier-collapse formula, but tightened for short-form):** "Before Claude builds your idea, it should try to kill it. This is the council that tells you the truth." Third-person receipt instead of first-person anecdote.
  - **Formula/teardown to use:** nateherk's own **Teardown 4** thesis-crystallization + counting cadence works, but for a 35s reel compress it: skip the funding-numbers ladder, keep the "make it argue with you / models lean sycophantic" tension and the Go/Reshape/Kill payoff. **gregisenberg's** idea-validation framing is an even tighter fit if Alex wants a pure "should you build this" angle.
  - **Broad-TAM framing:** every person with an idea, side project, product, campaign, hire, wants an honest second opinion before sinking time. This is the widest TAM of any Nate workflow. Keyword idea: **ROAST** or **COUNCIL**.

---

## Cross-cutting note for Alex

Nate's whole catalog rhymes on **two transferable Claude primitives**: (1) *sub-agent councils/workflows* (the roast, the verification loop) and (2) *self-verification via vision* ("make it prove it's done," "it checked its own work"). Those two are the honest, breadth-safe, no-paid-tool core Alex can build a whole series on. The asset-pipeline videos (Apple sites, Fable auto-video) show better on-screen wow but lean on paid third-party tools and, in the Fable case, on pre-built personal assets, so gate the *pattern*, never the "one prompt does everything" claim.
