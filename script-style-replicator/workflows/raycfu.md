# raycfu — Proven-Viral Workflows
> The actual AI systems behind raycfu's biggest hits, reverse-engineered into buildable specs.

Source: `transcripts/raycfu/raycfu-top-transcripts.md` + `teardowns/raycfu.md`. His median is ~7.5K views; the four below are 6.5x–55x outliers, so these are the workflows worth cloning. Ranked by views: Dev Team 4 Agents (417K), $80k Agency w/ Kimi (61K), Unrejectable Resume (54.5K), 8 Claude Skills (50K).

---

## The 4-Agent Dev Team (Plan → Code → Test → Review) — from "Dev team with 4 AI Agents in Claude" (417K)

- **What it does:** ships a real feature end-to-end from a one-line request, with a safety agent gating the merge, so you fire one command and come back to a reviewed, tested change.

- **The build — the real system:**
  - Runs entirely in **Claude Code using subagents** (`.claude/agents/*.md`), one custom **slash command** (`.claude/commands/*.md`) to chain them, and a shared markdown file as the handoff bus. No external MCP required.
  - **Agent 1 — Planner.** Model: **Opus** (quality of the plan sets the ceiling). Input: the vague feature request. Output: a spec written to `.pipeline/plan.md` listing exact file paths, function signatures, and edge cases. Prompt structure: "You are a senior architect. Turn this request into an implementation spec. For each change name the file, the function signature, and the edge cases. Do NOT write code. Write the spec to `.pipeline/plan.md`."
  - **Agent 2 — Coder.** Model: **Sonnet** (cheaper; the path is already decided). Input: `.pipeline/plan.md`. Output: the actual code changes + a note to `.pipeline/changes.md`. Prompt structure: "Read `.pipeline/plan.md`. Implement exactly what it specifies, nothing extra. List the files you touched in `.pipeline/changes.md`."
  - **Agent 3 — Tester.** Input: plan + changes. Output: test files covering happy path + the edge cases from the plan. Prompt structure: "Read `.pipeline/plan.md` and `.pipeline/changes.md`. Write tests for every edge case in the plan plus the happy path. Run them and record pass/fail in `.pipeline/tests.md`."
  - **Agent 4 — Reviewer.** **Read-only** (this is the load-bearing config: give the subagent only `Read`, `Grep`, `Bash(git diff)` tools, no `Edit`/`Write`). Input: plan + diff + test results. Output: a verdict (approve / reject + reasons) to `.pipeline/review.md`. Prompt structure: "You cannot edit code. Read the spec, run `git diff`, read the test results. Return APPROVE or REQUEST-CHANGES with specific reasons. Never touch the main branch."
  - **The handoff bus (the actual secret):** every agent reads the previous agent's file and writes its own inside `.pipeline/`. That shared-file relay is how four isolated context windows stay in sync. This is the "most people don't realize" payload.
  - **The one-command trigger:** a slash command like `/feature "rate-limit the login endpoint"` runs Planner → Coder → Tester → Reviewer in sequence, each reading the prior `.pipeline` artifact.

- **The wow artifact:** the on-screen moment is the **Reviewer posting a verdict** ("APPROVE — 4 files changed, 7 tests pass, edge cases covered") after a single typed command, with the `.pipeline/` folder visibly filling with plan.md → changes.md → tests.md → review.md. State that flips in <2s: one line of text becomes a green "APPROVED" verdict.

- **⚠️ Buildable today? BUILDABLE (with one honesty flag).** Claude Code genuinely supports subagents, per-agent model selection (Opus vs Sonnet), per-agent tool restriction (the read-only reviewer is real), custom slash commands, and file-based handoff. All four pieces are real product features. **The oversell is "while you are asleep":** fully unattended overnight runs are fragile: tool-permission prompts, a failed test loop, or an ambiguous spec will stall it, so in practice it's "one command, walk away for coffee," not "sleep 8 hours on autopilot." The architecture ships; the zero-supervision fantasy is trimmed.

- **The gated deliverable:** the repo scaffold: the four `.claude/agents/*.md` files with full system prompts and the exact `tools:`/`model:` frontmatter for each (including the reviewer's read-only tool list), the `/feature` slash-command file that chains them, and the `.pipeline/` convention. Over-delivers vs the video because the video only names the roles.

- **Alex's angle:**
  - Hook (from his 417K opener): "Most people don't realize four Claude agents can work as your team and finish the job while you sleep."
  - Formula/teardown: **raycfu's own Teardown 1** (the multi-agent named-character skeleton) is the exact fit. Alex already has a worked "content desk" adaptation in that teardown.
  - Broad-TAM framing: don't ship it as a *dev* team (too narrow for the 12-year-old test). Reframe the same architecture as a **content team** (Scout → Writer → Critic → Publisher) or **research desk** so a coach, freelancer, or store owner can use it, not just engineers. The named-character build is identical; only the job changes.

---

## The Solo Agency Stack (services + MCP + skill library + lead-finder) — from "Build a $80k/month AI Agency with Kimi" (61K)

- **What it does:** lets one person deliver the technical work of a 10-person agency by selling one repeatable service, wiring the tools once, and running an agent that finds clients daily.

- **The build — the real system (4 phases):**
  - **Phase 1 — The niche (pick one sellable outcome).** Not "AI," but a concrete service companies already buy: automated lead-gen, an internal knowledge base, or customer-support automation. This is positioning, not code.
  - **Phase 2 — The stack.** The model does the reasoning + code (video says Kimi K2; **for Alex's Claude niche, swap to Claude**). Then connect **MCP servers**, each with a plain job: **GitHub MCP** (code repo), **Postgres/Supabase MCP** (databases), **Slack MCP** (client comms), and an orchestrator like **n8n** to tie workflows together on a schedule. This wiring is genuinely how you productize delivery.
  - **Phase 3 — Client acquisition (the clever wedge).** A **scheduled monitoring agent** reads job listings daily; any company hiring a "data analyst / Python dev / AI consultant" is "trying to hire its way out of a problem." For each hit the agent reads the company's site + LinkedIn, infers the problem, and drafts a precise outreach message. Buildable with a scheduled task + a scrape/read step + a drafting prompt.
  - **Phase 4 — The moat (the differentiator).** **Skill ingestion:** a markdown **Skill file** loaded at task start turns the general model into a domain specialist (HIPAA files for healthcare, Shopify files for e-commerce). Build a **skill library per vertical** so every new client gets an expert on day one. This maps directly to real **Claude Skills** (`.md` capability files).
  - Prompt structure across phases: a positioning prompt (turn my capability into 3 sellable services), a per-service delivery prompt (the pipeline: scrape → qualify → send), a monitoring-agent prompt (find buying signals daily → draft outreach), and a per-vertical skill file (compliance/tooling facts that make Claude a specialist).

- **The wow artifact:** the **daily lead-finder dumping a list of named companies + a ready-to-send, personalized outreach draft** for each, generated overnight from public job posts. The reframe on screen ("a job post = a buying signal") is the shareable beat.

- **⚠️ Buildable today? PARTLY.** Real and shippable: the MCP wiring (GitHub/Supabase/Slack are live connectors), the scheduled lead-monitoring agent, per-vertical Skill files that specialize Claude, and the service pipelines. **Smoke to strip:** (a) the "**agent swarm that runs 300 sub-agents in parallel by bypassing permissions**" is a jaw-drop number, not a needed mechanism, and "bypassing permissions" is a red flag to omit; (b) "**$80k/month, keep 90%**" is an income fantasy, not a build step, do not put it in a guide as a promise; (c) **Kimi** is a competing model off-niche for Alex, use Claude. Scraping LinkedIn also has ToS limits, use public pages + the company site to stay clean.

- **The gated deliverable:** the actual setup: the MCP config (which servers, connected to what), the scheduled-task definition for the lead-finder, the outreach-draft prompt, and two example per-vertical Skill files so the buyer sees exactly what a "skill library" is. Honest version drops the 300-agent claim and the $80k number, keeps the working pipeline.

- **Alex's angle:**
  - Hook: "Nobody is talking about this, but paying an agency five figures a month to run your automations is already obsolete."
  - Formula/teardown: **raycfu's Teardown 2** (three-named-phase playbook) is the native fit; Alex's "answer their customer emails automatically" adaptation is already in that teardown and strips the jargon.
  - Broad-TAM framing: sell it as "**one Claude service any business will pay for**" (support-email autoresponder built from their own help docs) rather than "build an $80k agency", the humbler, true framing plays to Alex's calm-relief voice and survives the fabrication rule.

---

## The Resume Rescue Chain (Scanner → Surgeon → Stress Test → Sparring Partner) — from "Make your resume unrejectable with Claude" (54.5K)

- **What it does:** takes a resume that keeps getting auto-rejected and runs it through four sequential prompts that diagnose why, rewrite it in the format elite hires use, harden the weak spots, and rehearse the interview.

- **The build — the real system:** four prompts, **one Claude chat**, run in order, with the resume + target job description uploaded up front. No agents, no MCP, no code. The sequence is the product.
  - **Prompt 1 — The Scanner (diagnose).** "Act like a senior recruiter and an ATS. Given my resume and this job posting, tell me exactly why this gets filtered out: missing keywords, vague experience, ATS-unfriendly formatting." Output: a specific fault list.
  - **Prompt 2 — The Surgeon (rewrite).** "In the same chat, rewrite my experience bullets using the Google XYZ formula (accomplished X, measured by Y, by doing Z)." Turns "managed the team" into "reduced customer churn by 18% over six months by building an onboarding sequence for 3,000 people." The before→after is the whole sell.
  - **Prompt 3 — The Stress Test (harden).** "Act like a hiring manager reading 200 resumes in one sitting. Find the one or two sections I'd still skim past and rewrite them so nothing gets skipped."
  - **Prompt 4 — The Sparring Partner (rehearse).** "Act like the hiring manager for this exact role and run a realistic interview. Score each of my answers 1-10 and keep going until every answer is a 9 or 10." Uses the resume + JD already in context, so it knows where to push.
  - The trick that makes it work: **keeping all four in one chat** so context (resume + JD + the rewrite) carries forward; each prompt builds on the last's output.

- **The wow artifact:** the **before→after bullet transformation** on screen: a limp "managed the team" morphs into a number-dense "reduced churn 18% over six months for 3,000 people" in one generation. That single swap proves the method in <2s.

- **⚠️ Buildable today? BUILDABLE (most legit of the four).** It's four prompts in a chat; Claude reads the uploaded resume + JD and does all four passes today, no infra. **The one honesty flag:** Claude **simulates** an ATS and a recruiter, it does not run the employer's actual applicant-tracking software, so it approximates keyword/format matching rather than guaranteeing a specific system's pass. The "18%" number is illustrative of the format, not a promised result. Say "Claude acts like an ATS" not "beats the ATS."

- **The gated deliverable:** the four exact prompts, copy-paste, in order, plus the upload instructions and the Google-XYZ bullet template, so the recipient runs the whole chain in five minutes. Over-delivers because the video withholds every prompt.

- **Alex's angle:**
  - Hook: "Most people don't realize the reason your resume gets rejected is a robot trashing it before a human ever sees it."
  - Formula/teardown: **raycfu's Teardown 3** (named-villain + four-character rescue) fits perfectly; Alex's "un-ignorable cold email" adaptation in that teardown shows the exact broad-TAM swap.
  - Broad-TAM framing: the resume version is already universal (everyone has one). For freshness, the **same 4-prompt chain re-skins onto cold emails, sales pages, or a dating profile**, one villain (the skim/filter), four passes. Pick whichever is a net-new topic vs prior posts.

---

## The Curated Skills Shortlist (which Claude Skills to actually install) — from "8 Claude Skills that actually matter" (50K)

- **What it does:** cuts a giant, overwhelming skills marketplace down to a short, category-sorted install list so the viewer stops guessing and installs the few that move the needle.

- **The build — the real system:** this is a **curation + install workflow**, not a multi-agent system. The mechanism is: (1) name the real skills by category, (2) show how to add them to a Claude workflow. Categories and picks from the video (real, installable Skills):
  - **Marketing:** the marketing-skills pack by Corey Haines (SEO, copywriting, email sequences); the SEO skill does full-site audits.
  - **Design:** a front-end design skill (escapes the generic-AI look, builds real design systems); a Canvas skill that turns text into social graphics.
  - **Developers:** the Superpowers skill (TDD, debugging, plan-to-execute); a Remotion skill for AI video; a context/token-optimization skill for cheaper runs.
  - **Everyone:** the official Anthropic **PDF, PowerPoint, and docx skills** that recreate and edit files in plain English.
  - Install mechanism: Skills are markdown capability files you add to Claude (`.claude/skills/` or via the Skills marketplace/import), then invoke by name. The "system" is really "here's the shortlist + the one-minute install step."

- **The wow artifact:** a **skill installing and immediately changing Claude's output** on screen: e.g. run the design skill and a generic AI-looking page snaps into a real design system, or the docx skill turns a plain request into a formatted Word file in one shot. The visible before/after of one install is the hook.

- **⚠️ Buildable today? BUILDABLE as curation, but verify every number.** The skills named are real and installable, and the install flow is real. **Oversell to fix:** the inventory/proof numbers are ASR-noisy and likely inflated ("**over 60,000 skills**," "**I tested 100**," "277,000 installs," "96,000 stars"), do NOT repeat specific counts you haven't verified, or the guide lies. Also confirm each named skill still exists / hasn't been renamed before shipping the list. This is content, not a system, so its value is entirely "the list is accurate."

- **The gated deliverable:** the vetted install guide, each skill's real name + source link + the one-line install command + when to invoke it, with any stale/renamed skills removed and unverified stats stripped. Over-delivers by being a working, current list vs the video's spoken names.

- **Alex's angle:**
  - Hook: "Most people don't realize you can add hundreds of skills to Claude. Here are the only few that actually save you time."
  - Formula/teardown: **raycfu's Teardown 4** (shock-inventory number → "I tested N" curation authority → four category buckets) is the template; Alex's "slash commands worth setting up" adaptation is already in that teardown.
  - Broad-TAM framing: bucket by audience (writer / founder / seller / everyone) so every viewer finds their pick, and lead with the *outcome per skill* ("one word turns a voice note into a week of posts"), not the skill's internal jargon (no "KV cache," no "TDD").
