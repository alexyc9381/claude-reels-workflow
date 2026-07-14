# Workflows — the master ranked catalog of proven-viral AI builds
> Every buildable AI workflow behind the videos that already went viral, ranked by what Alex can honestly ship next.

---

## 1. What this is

Each per-creator file in this folder (`mavgpt.md`, `rileybrown.md`, `gregisenberg.md`, `raycfu.md`, `nicksaraev.md`, `cindiezhu.md`, `nateherk.md`) reverse-engineers the **actual buildable AI system** behind that creator's biggest hits — not the script, the *machine*. This README ranks all of them into one list.

The point: Alex's reels **gate the how** (name the artifact + result, withhold the exact prompts, cut on a keyword). That promise is only honest if the gated guide, once claimed, *actually works*. So this catalog does one job the view counts alone can't: it separates the workflows Alex can truthfully deliver from the ones that only look real on camera.

**The loop:** pick a workflow from this catalog → run it through `GENERATE.md` (route → load the creator's proven formula + a hook → refill → apply the 11 viral laws + Alex's hard-rule transforms → self-gate → ship) → the gated deliverable hands over the **real build**. A BUILDABLE workflow lets the guide over-deliver. A SMOKE workflow forces a lie, so it gets reframed or killed. That is what makes "gate the how" honest.

**Buildability ratings:**
- **BUILDABLE** — reproducible end-to-end with Claude today; the gated guide over-delivers vs the video. Ship these.
- **PARTLY** — the core is real but one headline claim is oversold (an external paid tool does the wow, "one prompt" is edited, or an autonomy/CAPTCHA/OAuth step is hidden). Shippable *only* with the honest reframe named in the creator file.
- **SMOKE** — the core magic doesn't survive contact with reality (paywalled, anti-bot, or physically can't run as claimed). Never gate as-is; pivot to the honest version or avoid.

**Totals:** 25 workflows spec'd · **15 BUILDABLE** · 9 PARTLY · 1 SMOKE. (STACK / tier-lists are content, not workflows, and are excluded from the count — see the bottom note.)

---

## 2. ⭐ THE RANKED TABLE

Ranked by a **blend of the source video's views/lift AND buildability**. Buildability dominates: a SMOKE workflow ranks at the floor no matter its views (Alex can't ship a guide that lies), and a clean BUILDABLE + huge-TAM build outranks a bigger PARTLY. Views are the source video's; "lift" (× creator median) matters most for the small-median creators (raycfu, cindiezhu, nateherk).

| # | Workflow | From (creator · video · views) | Buildable? | What it does (one line) | Best script formula |
|---|----------|-------------------------------|-----------|-------------------------|---------------------|
| 1 | **Anti-Slop Claude Code Method** | greg · "Claude Code Clearly Explained" · 419K | **BUILDABLE** | Interrogate-first + one-feature-per-session + reset-before-rot = finished work instead of AI slop | greg Teardown 3 ("everyone's doing it wrong / here's what to do instead" + contrast-pairs + counter-intuitive number) · kw SLOP |
| 2 | **Color-Season / Business Audit** | mavgpt · "COLORS" · 398K | **BUILDABLE** | One multimodal prompt returns a full structured analysis + shareable result card, zero automation | mavgpt COLORS (capability hook → in-body gate at peak curiosity → result-sharing CTA) · kw PRICING |
| 3 | **Data-Broker Removal → Invoice Chaser** | mavgpt · "ERASE" 1.3M + "IDENTITY" 442K = **1.7M** | **PARTLY** | Discovers + drafts + auto-fills opt-out/follow-ups, then hands you the ones needing a human click | mavgpt ERASE (Q-hook → 3rd-person receipt → 3 prompts → "here's the trick" → "while you sit there" → scheduled-task bonus) · kw PAID |
| 4 | **4-File Claude Second Brain** | greg · "10x Claude with 4 .md files" · 734K | **PARTLY** | CLAUDE.md + context/ + memory + a Skill turn generic Claude into a personalized operator | greg Teardown 1 (sunk-cost loss-frame → "Start by…" staircase → quantified before/after) · kw BRAIN |
| 5 | **4-Agent Dev / Content Team** | raycfu · "Dev team with 4 AI Agents" · 417K (55×) | **BUILDABLE**¹ | Planner→Coder→Tester→Reviewer ship a reviewed change from one command via a `.pipeline/` file bus | raycfu Teardown 1 (multi-agent named-character skeleton) · reframe dev→content team |
| 6 | **Overnight Automations (Routines)** | nick · "Claude Routines Just Dropped" · 210K | **BUILDABLE** | Scheduled/webhook/API Claude agents triage the inbox + draft every reply before you wake | nick Teardown 3 (news-peg "just" → old-way/new-way → "runs the exact same job") · kw AUTOPILOT |
| 7 | **One-Agent-Runs-Your-Apps (MCP)** | riley · "Claude is better with MCP" · 183K | **BUILDABLE** | One agent + Slack/Calendar/Notion connectors executes several real actions from one sentence | riley Teardown 4 (setup-inventory hook → small ask → "it keeps using tools" → stacked prompt → recap) · kw ASSISTANT |
| 8 | **Claude ↔ Google Workspace Bridge** | nate · "Google's New Tool Solved a Claude Problem" · 161K | **BUILDABLE** | Claude runs a CLI/connector to read+write your whole Workspace and build *formatted* Google Docs | nate Teardown 1 (news-drop → "Not X. Not Y. But Z." reveal → "boom" formatted-doc) · kw BRIDGE |
| 9 | **Claude Code as Video Editor** | riley · "Claude Code is now my video editor" · 357K | **BUILDABLE** | Describe a motion graphic in plain English; Claude Code renders a transparent overlay on the beat | riley Teardown 3 ("X is now my Y" meta-claim → nested tip → on-beat reveal); ADD a keyword gate · kw OVERLAY |
| 10 | **One-Shot Luxury Websites** | nick · "Gemini+Antigravity Destroys Site Designers" · 254K | **BUILDABLE**² | One role+constraints mega-prompt + a 4-question elicitation → an animated luxury landing page, deployed | nick Teardown 2 (skeptic-to-believer → deflate the 17-step framework to "just a prompt") · kw ONESHOT |
| 11 | **The "Roast" Council** | nate · "New Generation of Millionaires" · 116K | **BUILDABLE** | Sub-agent personas argue for/against your idea against real context → one verdict: Go / Reshape / Kill | nate Teardown 4 (barrier-collapse, tightened) or greg idea-validation frame · kw ROAST |
| 12 | **Agent-Controls-Blender** | riley · "OpenClaw + Blender" · 704.7K | **BUILDABLE**³ | Edit a 3D scene by texting an agent; Blender MCP drives `bpy` while it self-corrects | riley Teardown 2 (awe hook → honest partial-fail → chaos-then-resolve → open-ended ask) · kw SCENE |
| 13 | **Selfie → Pro Headshots App** | riley · "Tinder/Hinge profile generator" · 1M | **PARTLY** | Vibe-coded full-stack app turns one selfie into 6+ identity-matched photos (headshots reframe) | riley Teardown 1 (authority-flex hook → spoken prompt → prove-the-DB aside → ship payoff) · kw HEADSHOT |
| 14 | **Resume Rescue Chain** | raycfu · "Make your resume unrejectable" · 54.5K (7×) | **BUILDABLE** | Scanner→Surgeon→Stress-Test→Sparring-Partner: 4 prompts, one chat, diagnose→rewrite→harden→rehearse | raycfu Teardown 3 (named-villain + 4-character rescue); re-skins to cold email · kw (topic-dep) |
| 15 | **Obsidian Command Deck** | greg · "Claude Code + Obsidian in <1 min" · 597K | **PARTLY** | `/today` assembles your day, `/emerge` names the idea you keep circling, over a notes vault | greg Teardown 2 ("If you [habit]" qualifier → two-category staircase) · kw CHIEF |
| 16 | **Curated Skills Shortlist** | raycfu · "8 Claude Skills that matter" · 50K (6.5×) | **BUILDABLE**⁴ | Cuts the skills marketplace to a short, category-sorted, actually-worth-installing list | raycfu Teardown 4 (shock-inventory number → "I tested N" curation authority → 4 buckets) |
| 17 | **Cinematic Animated Landing Pages** | nick · "Nano Banana 2 + Kling = $15K Sites" · 314K | **PARTLY** | Claude builds a frame-by-frame 3D-scroll luxury site + preload/compress loop, deploys to Netlify free | nick Teardown 1 (price-collapse DROP → confession-receipt → deflate to 3 steps → cost meter) · kw CINEMATIC |
| 18 | **Creative Studio Skill Stack** | cindie · "7 skills to run a creative studio" · 292K (44×) | **PARTLY** | A bundle of skills (Remotion / research / Voice-DNA / TTS / writer) that runs a solo content shop | cindie 292K formula (persona-named skills each cashed out with "which means") · kw BUSINESS |
| 19 | **Unrejectable Resume Loop** | cindie · "4 Skills make your resume unrejectable" · 25.6K | **BUILDABLE** | Diagnosis→Recruiter→Rewriter→Hiring-Manager persona loop; ATS-style check + XYZ rewrite + mock interview | cindie 25.6K formula (coined power-word + "you just paste X and say make it better" call-out + 4 personas) · kw EMAIL |
| 20 | **Apple-Style Animated Landing Page** | nate · "$10,000 Apple-Style Websites" · 148K | **PARTLY** | Start-frame+end-frame → looping product video → Claude Code scroll-wires it into a premium site + copy | nate Teardown 2 (result hook → "this is not Apple" reveal → live-scroll receipt) · kw HERO |
| 21 | **Carousels as Visual Code** | cindie · "How people make 10/10 carousels" · 7.5K | **BUILDABLE** | A Project system-prompt makes Claude emit each carousel as an interactive HTML Artifact, brand-consistent | cindie 7.5K formula (friction pre-strip + social-receipt ratio); ADD the missing gate · kw DECK |
| 22 | **Autonomous Build→Verify Agent** | nate · "Fable 5 Made This Video By Itself" · 146K | **PARTLY→SMOKE** | Set one goal + stakes; agent runs long-horizon work then spins sub-agents to visually verify + redo | nate Teardown 3 (self-referential reveal → negation anaphora); gate the *pattern*, not auto-video · kw OVERNIGHT/VERIFY |
| 23 | **Solo Agency Stack** | raycfu · "$80k/mo AI Agency with Kimi" · 61K | **PARTLY** | Niche + MCP wiring + per-vertical Skill library + a daily job-post lead-finder that drafts outreach | raycfu Teardown 2 (three-named-phase playbook); swap Kimi→Claude, drop the $80k/300-agent claims |
| 24 | **One-Photo Room Redesigner** | cindie · "Claude x Nanobanana redesigns your house" · 12.3K | **BUILDABLE**⁵ | Upload one room photo → identity-preserving photorealistic redesigns you iterate conversationally | cindie 12.3K formula (persona-transformation hook + cost anchor + 3-micro-action install) · kw BRAND |
| 25 | **Reverse Face-Search Agent** | mavgpt · "PHOTO" · 735K | **SMOKE** | Claims to find every photo of your face online + draft takedowns (the core search is the smoke) | mavgpt PHOTO beat skeleton; pivot to a **brand-mention monitor** (web search + Alerts + text-match) · kw MINE |

**Footnotes (the honesty flag on each near-clean build):**
¹ Dev Team: subagents + per-agent model/tool restriction + file-bus are all real; **"while you sleep"** unattended runs are the oversell — it's "one command, walk away for coffee," and the dev framing needs a **content-team reframe** to clear the breadth litmus.
² One-Shot Websites: swap **Gemini→Claude**; expect **1–3 refinement passes**, not "pixel-perfect every time."
³ Blender: real but **finicky** — the "too big / too small" chaos is the true reliability profile; set iteration expectations.
⁴ Skills Shortlist: it's curation — **verify every skill still exists + strip the unverified counts** ("60,000 skills," "I tested 100") or the list lies.
⁵ Room Redesigner: needs **Claude Code + a Google AI Studio API key** (free tier limited), and **Gemini renders the image** — Claude orchestrates.

---

## 3. The BUILDABLE shortlist — make these next

The 6 that are genuinely BUILDABLE today **AND** huge-TAM (clear the "a student, an employee, a parent, a freelancer, AND a founder can all use it" bar) with no external-paid-tool smoke. These are the safest guides to over-deliver on:

1. **Color-Season / Business Audit (#2, PRICING)** — the single cleanest workflow in the whole set: one multimodal prompt, renders 100%, zero automation to break. The entire payload *is* the gated prompt, so it's the perfect fit for "gate the how." Reframes to a pricing/positioning/offer audit for infinite fresh topics.
2. **Anti-Slop Method (#1, SLOP)** — free, first-party technique (Plan mode / AskUserQuestion + `/compact` + `/clear`), not a fragile stack. Every Claude user makes slop, so TAM is maximal and there's nothing to oversell.
3. **Overnight Automations / Routines (#6, AUTOPILOT)** — native scheduled/webhook Claude agents; everyone has an inbox and repetitive follow-ups. On-brand for Alex's agents/automation niche; the honest scope is "one-shot the flows you'd build by hand," not "replace n8n."
4. **One-Agent-Runs-Your-Apps MCP (#7, ASSISTANT)** — the *least oversold* build in the whole catalog; Slack + Calendar + Notion connectors genuinely fire multi-app actions from one sentence. Only caveat is one-time OAuth + a test channel.
5. **Roast Council (#11, ROAST)** — the widest TAM of anything here: everyone with an idea wants an honest second opinion. Pure sub-agent personas + memory, no paid tools, no smoke; ships as one droppable skill file.
6. **Google Workspace Bridge (#8, BRIDGE)** — everyone lives in Gmail/Drive/Calendar and wants AI that writes *into* real docs, not a chat window. Fully buildable; the only friction to disclose is the one-time OAuth consent.

*Honorable mentions (BUILDABLE + broad, one notch below on TAM or novelty):* **Claude Code as Video Editor (#9)** — Alex already owns the Remotion pipeline, so his guide can ship his actual repo scaffold; **Resume Rescue / Unrejectable Resume (#14/#19)** — universally-wanted, four prompts in one chat, re-skins onto cold email; **4-Agent Content Team (#5)** — massive views, buildable, just needs the dev→content reframe.

---

## 4. The SMOKE list — reframe or avoid

Viral builds whose headline promise doesn't survive reality. Do **not** gate these as shown; each has an honest pivot named in its creator file.

- **Reverse Face-Search (#25, PHOTO, SMOKE)** — true comprehensive face search only exists on **PimEyes/FaceCheck (paywalled + actively anti-bot)**; a text description of your features can't drive image search, and Google Lens returns "similar," not "you." A free autonomous agent cannot deliver "find every photo of me." **Pivot:** a brand/name-mention monitor (web search + Google Alerts + a text-match API) — same emotional beat, actually works. Keyword MINE.
- **Autonomous Build→Verify / Fable auto-video (#22, PARTLY→SMOKE)** — "one prompt → a finished YouTube video" needs a **pre-trained voice clone, a HeyGen avatar, custom GSAP skills, the Max plan, and ~400K tokens**; Nate himself says a copier won't get the same result. **The pattern is real and gold** (long goal + stakes clause + "spin up sub-agents to visually verify and redo failures"). **Gate the pattern, never the auto-video.** Keyword OVERNIGHT/VERIFY.

**PARTLY builds with a specific claim to strip before gating (buildable core, oversold headline):**
- **Data-Broker auto-submission (#3)** — discovery + drafting are real; **auto-submit is blocked by CAPTCHAs / email-confirm / ID checks**. Honest version = "drafts + auto-fills what it can, hands you the human-click list." The **PAID invoice-chaser reframe is *more* buildable** (email has no CAPTCHA wall) — lead with that.
- **4-File Second Brain memory (#4)** — the video implies `memory.md` "updates as it learns" autonomously. It **does not self-write** unless you wire it (a CLAUDE.md append rule / `#` shortcut). Gate the wiring, not the magic.
- **Selfie→Headshots app (#13)** — the photos come from an **external Google image model (not Claude)**, "3 prompts" is heavily edited, and "sent to the app store" means **submitted for review** (needs a $99/yr Apple account), not live. Name the image API + the real shipping steps.
- **Cinematic (#17) + Apple-Style (#20) landing pages** — the wow assets need **Kling + Nano Banana (paid, non-Claude) with a manual mp4 handoff**, and "$15K / $10K / one-shot" is old pricing + edited iteration. The site/scroll/deploy half *is* pure Claude — gate that, disclose the paid video tool.
- **Creative Studio Skill Stack (#18)** — it's **6 skills, not 7**; the **Competitor-Ads Extractor isn't a native skill** (needs a Meta Ad Library / Apify connector) and ElevenLabs is paid. Ship "6 real skills, 4 free, 2 need a connector/key."
- **Solo Agency Stack (#23)** — strip the **"$80k/mo, keep 90%"** income fantasy and the **"300 sub-agents bypassing permissions"** red flag; swap Kimi→Claude. The MCP wiring + lead-finder + per-vertical Skills are the real, shippable core.
- **Obsidian `/today` (#15)** — `/today` no-ops without a **calendar connector** the "under 1 minute" title hides; `/emerge` is fully buildable. Include the connector step.

---

## 5. How it connects — workflow → GENERATE.md → gated guide

```
CATALOG (this file)          GENERATE.md                          THE GATED GUIDE
pick a BUILDABLE workflow  →  route to the creator (Step 1)     →  hands over the REAL build:
+ its buildability rating     load teardown formula + hook (2)      the exact prompts / skill files /
+ its honest-reframe note     refill every slot (3)                 connector setup / .pipeline scaffold
                              11 viral laws (4) + Alex's            named in the creator file's
                              hard-rule transforms (5)              "gated deliverable" block
                              self-gate (6) → ship + log (7)
```

- **The catalog is Step 0's input.** A topic must clear the breadth litmus + `KILL-LIST.md`; this catalog pre-answers "is there a real build behind it, and can Alex deliver it?" Pick a **BUILDABLE** row and the guide over-delivers; a **SMOKE** row forces the reframe first.
- **`GENERATE.md`** turns the chosen workflow into the *script* — routing to the right creator and refilling their proven formula (the "best script formula" column is the shortcut into Step 1/2).
- **The teardowns** (`teardowns/<creator>.md`) hold the fill-in-the-blank formula + transitional phrases each row cites; **`CREATOR-MATRIX.md` §5** is the router, **§4** the fusion/hard-rule transforms, and **`HOOK-BANK.md`** supplies the opener.
- **The gated deliverable** — the payload the reel withholds and the comment-keyword unlocks — is spec'd per workflow in each creator file ("The gated deliverable" block). For BUILDABLE rows it's a working artifact; for PARTLY/SMOKE rows it's the *honest* version that beats the video by telling the truth about the paid tool / OAuth / CAPTCHA the original hides.
- **The payoff:** because every row here is buildability-audited, Alex can gate the how and know the guide, once claimed, actually ships. That is the whole system — the viral formula sells the click, the honest build keeps the follow.

---

## Not workflows (excluded from the count)
**STACK (mavgpt, 349K)** and the tier-list format are **content, not systems** — the "deliverable" is just a curated 2026 tool-stack list, nothing to build. Run them as a reach/rhythm play (the gated payload is Alex's own opinionated list), but they don't enter the ranked table or the buildable count.
