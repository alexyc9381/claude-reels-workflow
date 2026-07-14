# mavgpt — Proven-Viral Workflows
> The actual AI systems behind mavgpt's biggest hits, reverse-engineered into buildable specs.

Source-of-truth for view counts: `teardowns/mavgpt.md` + `transcripts/mavgpt/mavgpt-top-transcripts.md`.
Super-performers covered: **ERASE (1.3M)**, **PHOTO (735K)**, **IDENTITY (442K)**, **COLORS (398K)**, plus a short honesty note on **STACK (349K)**.

Note on scope: **ERASE and IDENTITY are the SAME workflow** — data-broker removal — built once on ChatGPT (ERASE, Agent Mode) and once on Claude (IDENTITY, Chrome Connector). They are folded into one spec below and cite both view counts (1.7M combined = by far this creator's biggest idea). The Claude build (IDENTITY) is the one Alex should ship.

---

## The Data-Broker Removal Agent — from "ERASE" (1.3M) + "IDENTITY" (442K)

- **What it does:** Finds every data-broker / people-search site that is selling your name, address, and phone number, drafts an opt-out request for each, submits them for you, and re-checks weekly until you're gone.

- **The build** — a 3-prompt escalation ladder plus a scheduler, all in one chat:
  - **Platform.** ChatGPT with **Agent Mode** (ERASE) OR Claude with a **browser Connector** (IDENTITY). Alex's build = Claude.
  - **Prompt 1 — DISCOVERY (web search):** shape = `[scope: everything about me on the web] + [enumerate the villain sites: every data broker + people-search site exposing my info] + [per-item deliverable: the exact opt-out link for each]`. Runs on Claude web search / ChatGPT search. Produces a list of broker sites + opt-out URLs.
  - **Prompt 2 — DRAFTING (same chat, no tools):** shape = `[continuity: stay in the same chat] + [per-item artifact: write the exact removal request to send to each one]`. Pure text generation, one request per site.
  - **Prompt 3 — THE TRICK / EXECUTION (browser automation):** the on-screen insider move. Claude path = `Customize → Connectors → Browse Connectors → search "Google Chrome" → install`, then `"use Chrome to go to every one of those sites and submit my removal request."` ChatGPT path = `hit the + → turn on Agent Mode → "go submit the removal request on every site for me."` This hands the drafted requests to a computer-use/browser agent that drives the real opt-out forms.
  - **Prompt 4 — THE BONUS / SCHEDULE:** shape = `[recheck every site every week] + [resubmit anything ignored] + [until end-state]`. Becomes a **scheduled task** (ChatGPT Tasks, or a Claude scheduled task / cron) that re-runs the whole agent weekly.
  - **The trick that makes it land:** the Connector-install click-path (IDENTITY's is a meatier 6-step path than ERASE's one-click Agent Mode — that's the save-bait) plus the browser visibly self-driving.

- **The wow artifact:** the AI's **own browser window pops open and starts typing into a real Spokeo/Whitepages opt-out form with no hands on the keyboard** — the "while you just sit there" moment. State change in <2s: a browser the viewer never touched begins navigating itself.

- **⚠️ Buildable today? PARTLY — the discovery + drafting are real, the auto-submission is mostly SMOKE.**
  - *Discovery* — REAL but generic. It reliably enumerates the known broker universe (~100-200 sites: Spokeo, Whitepages, BeenVerified, Radaris, PeopleFinders, Intelius, MyLife, etc.) and their opt-out URLs. But "found hundreds of sites selling **MY** address" is quantified vagueness: without visiting each one it can't confirm which specifically list *you*. It's really a standard broker checklist, not a personalized scan.
  - *Drafting* — REAL and trivial (LLM writes opt-out text all day).
  - *Auto-submission (the entire payoff)* — **SMOKE.** Broker opt-out flows are gated by **CAPTCHAs** (an agent can't and per policy shouldn't solve them), **email-confirmation links you must click**, and sometimes **phone/ID verification**. Agent Mode / Claude computer-use fills some fields, then **stalls on the first CAPTCHA or confirm-email on the majority of sites.** "Submit every removal request while you sit there" does not survive contact with real broker sites.
  - *Weekly scheduled task* — the scheduler itself is REAL (ChatGPT Tasks exist; Claude can build a cron/scheduled job). But it re-runs the same CAPTCHA-blocked submission, so a truly hands-off "wiped while I slept" loop is oversold.
  - **Rating: PARTLY.** Honest framing: the agent discovers the list, drafts every request, and auto-fills the forms it *can*, then hands you a short checklist of the ones needing a human click. A real time-saver — just not a hands-free wipe.

- **The gated deliverable:** (1) a **verified master list of 50-100 real US data brokers + direct opt-out URLs**; (2) the exact 3 prompts (discovery / draft / execute) + the bonus scheduler prompt; (3) copy-paste **removal-request email templates**; (4) the Claude Connector / ChatGPT Agent-Mode **setup steps with screenshots**; (5) the scheduled-task setup; (6) an **honest "these need you to click a confirmation email or clear a CAPTCHA" list** so the guide over-delivers instead of lying.

- **Alex's angle:**
  - Reframe privacy-horror → **money** (his niche). Hook: *"What happens when you ask Claude to hunt down every client who owes you money and never paid?"* Use **mavgpt's own ERASE beat skeleton** (Q-Hook → third-person receipt → 3 prompts → "Now here's the trick" → "while you just sit there" → scheduled-task bonus → keyword). The teardown already wrote the finished **PAID** adaptation.
  - **Buildability bonus:** the invoice reframe is *more* buildable than the original — chasing unpaid invoices runs on **email sending (Gmail connector), which has no CAPTCHA wall.** Claude reads invoices/inbox → drafts follow-ups → sends them → weekly re-chase. Alex can ship a guide that actually works end-to-end, which the privacy version can't.
  - Broad TAM: every freelancer, agency, coach, and store owner has unpaid invoices. Keyword: **PAID**. (Alt: keep privacy but reframe as "delete every account you forgot about" — echoes Alex's PURGE reel.)

---

## The Reverse Face-Search Agent — from "PHOTO" (735K)

- **What it does:** finds every photo of your face that exists on the internet, then writes takedown requests to pull each one down.

- **The build** — profile → autonomous hunt → fix:
  - **Platform.** ChatGPT Agent Mode (multimodal input).
  - **Prompt 1 — PROFILE (multimodal):** upload a selfie, shape = `[analyze this photo] + [list every specific feature that makes me recognizable] + [purpose: so you can identify me anywhere online]`. Produces a written description of your face.
  - **Prompt 2 — THE TRICK / HUNT:** `hit + → turn on Agent Mode`, then shape = `[using my selfie + the profile] + [reverse image search my face across the top tools] + [find every place I appear] + [per-item: a link to each one]`. Agent opens a browser and runs reverse-image searches.
  - **Prompt 3 — THE BONUS / FIX:** shape = `[write a custom removal request for each site] + [goal: get my photos taken down]`.

- **The wow artifact:** the agent's browser **runs your face through reverse-image engines and returns a scrolling list of URLs where "you" appear** — the conveyor-belt "run your face through every reverse image search" moment.

- **⚠️ Buildable today? SMOKE on the core magic.**
  - *Feature description from a selfie* — REAL (multimodal).
  - *Comprehensive reverse FACE search* — **SMOKE, three ways:** (a) a **text description of your features does not drive image search** — real face-search needs the actual image file uploaded to a face engine. (b) The only engines that do true comprehensive face matching are **PimEyes and FaceCheck.ID — both paywalled and both actively block bots/automation** (anti-scraping + their own CAPTCHAs). (c) **Google Lens / reverse-image** returns *visually similar* images, not "every place YOUR face appears," and rate-limits automated access. So a **free autonomous agent cannot deliver "find every single place I appear."** The demo looks real because the browser is moving, not because the list is true or complete.
  - *Takedown drafting* — REAL.
  - **Rating: SMOKE (headline) / PARTLY (pieces).** A guide promising "free, finds every photo of you" would lie.

- **The gated deliverable:** the profile prompt; an **honest tool map** — PimEyes / FaceCheck are the real face engines and they're **paid + manual upload**, Google Lens is the free-but-shallow option; the **takedown-request templates**; and where to actually file a DMCA/removal notice (host, Google removal form, platform report). Over-delivers precisely *because* it tells the truth about what finds faces.

- **Alex's angle:**
  - Reframe to **IP / money**: *"What happens when you ask Claude to find every website using your work without paying you?"* (the teardown's **MINE** adaptation). Broad TAM: any creator, designer, writer, or brand.
  - **Honesty caveat carries over:** "find every repost" is oversold for images too. The genuinely-buildable pivot for Alex is a **brand/name monitor** — *"find every website that mentions your brand"* via **web search + Google Alerts + a plagiarism/text-match API**. That version actually works end-to-end and still hits the same emotional beat (someone is using you without paying). Use PHOTO's beat skeleton. Keyword: **MINE**.

---

## The Color-Season Analysis — from "COLORS" (398K)

- **What it does:** analyze a selfie and return your 12-season color type, undertone, contrast level, a personalized palette (which colors flatter you vs wash you out), and whether gold or silver suits you.

- **The build** — the simplest of the set, one shot:
  - **Platform.** Any multimodal model (ChatGPT or Claude). **No agents, no connectors, no browser.**
  - **One prompt over an uploaded selfie.** Shape = `[role: color analyst using the 12-season system] + [analyze: undertone + contrast + season] + [deliver: palette split into harmonize / neutral / avoid] + [kicker: gold or silver]`.
  - **Structural signature (for Alex):** COLORS gates the prompt **in-body, mid-video**, at peak curiosity, and closes on a **result-sharing** CTA rather than a second keyword.

- **The wow artifact:** a **full palette / season card renders on screen** — "you're a Deep Autumn," a swatch grid of your colors — an identity reveal in a single frame.

- **⚠️ Buildable today? BUILDABLE.** This is a well-structured multimodal prompt and nothing more; the deliverable renders 100% with no smoke. The one honest caveat: accuracy depends on photo lighting / white-balance, and color-season theory is subjective and pseudo-scientific, so it's a fun *opinion*, not a lab measurement. The cleanest, most honest workflow of the three — and the best fit for Alex's "gate the how" rule because the whole payload is a single prompt.

- **The gated deliverable:** the **exact full prompt** (the in-body-gated payload), a lighting/white-balance tip for a better read, and an optional **"now generate my palette as an image"** follow-up so the result is shareable.

- **Alex's angle:**
  - Use COLORS' structure verbatim: **capability-announcement hook + in-body gate at peak curiosity + result-sharing CTA** (mavgpt's own COLORS teardown).
  - Reframe to Alex's niche: *"Claude can now run a full pricing audit on your business"* (the teardown's **PRICING** adaptation) — **fully buildable**, it's just a structured analysis prompt over your prices/offers, no browser needed. Alternatives that are equally real: a **positioning audit**, an **offer/funnel audit**, a **cold-email teardown**.
  - Broad TAM: any business owner, freelancer, or store. Keyword: **PRICING**. This is the **strongest match for Alex** because it genuinely delivers with zero automation smoke.

---

## STACK (349K) — not a workflow (honesty note)

STACK is a rapid-fire tier list ("for writing: bad / good / great…"), not a system. There is **nothing to build** — the "deliverable" is just a curated **2026 AI-tool stack list** handed over on the keyword. Buildable rating is **N/A (it's content, not a workflow)**. For Alex it's a **reach/rhythm play**, not a save play; the teardown notes it converts to *follow* less hard than the fear-driven follow-alongs. If Alex runs it, the gated payload is simply his own opinionated tool list; the VO gives only the verdict rhythm (tool names withheld), and he keeps the "no, no, eh, yes" rhythm-break beat.

---

## One-glance buildability card
| Workflow | From (views) | Core claim real? | Rating | Alex keyword |
|----------|-------------|------------------|--------|--------------|
| Data-Broker Removal Agent | ERASE 1.3M + IDENTITY 442K | discovery/drafting real; auto-submit blocked by CAPTCHAs/email-verify | **PARTLY** | PAID (money reframe = more buildable) |
| Reverse Face-Search Agent | PHOTO 735K | true face search is paywalled + anti-bot + can't run from a text description | **SMOKE** | MINE (pivot to brand-mention monitor) |
| Color-Season Analysis | COLORS 398K | single multimodal prompt, renders fully | **BUILDABLE** | PRICING (best fit for Alex) |
| Tier list (not a workflow) | STACK 349K | n/a — it's a list | **N/A** | STACK |

**Bottom line for Alex:** the video that pulled 1.3M is the *least* honest to gate (auto-submission is smoke), and the video at 398K is the *most* honest (a clean prompt). Lead the buildable guides with **COLORS-style single-prompt audits (PRICING)** and the **PAID invoice-chaser** (email has no CAPTCHA wall), where the guide can actually over-deliver. Use the mavgpt beat skeleton for the hook; never gate the smoke.
