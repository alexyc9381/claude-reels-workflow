# gregisenberg — Proven-Viral Workflows
> The actual AI systems behind gregisenberg's biggest hits, reverse-engineered into buildable specs.

Scope: the three super-performers that (a) cleared ~400K views and (b) actually demonstrate a buildable Claude workflow. Greg's #4 by views, "micro-startups" (300K), is a podcast philosophy monologue with no build to reverse-engineer, so it is noted at the bottom but not spec'd.

Ranked by views: **4 .md files (734K)** · **Claude Code + Obsidian (597K)** · **Claude Code Clearly Explained (419K)**.

---

## The 4-File Claude Second Brain — from "How to 10x your Claude with 4 .md files" (734,000 views)

- **What it does:** turns a generic Claude subscription into a personalized operator that already knows your business, remembers your corrections, and can run a 4-hour task from a single word. The outcome the viewer wants: stop re-explaining yourself to Claude every session.

- **The build — the real system:**
  1. **The identity file (Greg says `agents.md`; in Claude Code this is `CLAUDE.md`, and Claude Code now also reads `AGENTS.md`).** A single markdown file at the project root (or `~/.claude/CLAUDE.md` for a global one) that Claude loads into every session automatically before it does anything. Prompt structure: a role line ("You are my operator for X"), then labeled blocks — **Business**, **Voice/Tone**, **How I work / defaults**, and a short **Always / Never** do-and-don't list. It is instructions, not prose.
  2. **The `context/` folder.** A directory of reference docs Claude pulls in on demand: ICP, offers, past-work samples, brand-voice examples, SOPs. In `CLAUDE.md` you add a line like "Reference files in `context/` when relevant." Prompt structure of each file: heavier, nuanced source material the identity file is too short to hold. Claude reads them when the task calls for it (or you @-mention them).
  3. **The memory file (`memory.md`).** An append-only log of learned preferences ("stop signing emails with 'cheers'"). This is where the video oversells (see the caveat). The way to actually make it work: add a rule to `CLAUDE.md` — "When I correct you or state a lasting preference, append it as a one-line rule to `memory.md` and confirm" — and reference `memory.md` from `CLAUDE.md` so it is re-read each session. Claude Code's built-in `#`-to-remember and the memory tool do a lighter version of this.
  4. **The `.claude/skills/` folder (Claude Skills).** You walk Claude through a multi-step process once, then have it (or the `skill-creator` skill) package that into a `SKILL.md` with a name, a trigger description, and the ordered steps. After that, one instruction fires the whole workflow.
  - **The trick that makes it work:** the identity + memory files are *auto-loaded every session*, so the personalization is permanent and free after setup. The leverage compounds: the Skill turns a repeated 4-hour process into a one-word trigger, and memory means you never re-teach a correction.

- **The wow artifact:** the on-screen <2s moment is Claude obeying a preference the user *never restated this session* (it silently drops "cheers" because `memory.md` told it to), or typing one word and watching a Skill execute a multi-step process end to end. State change: a blank prompt to a fully-personalized, self-running action.

- **⚠️ Buildable today? PARTLY.**
  - `CLAUDE.md`/`AGENTS.md` auto-load: **BUILDABLE**, this is core Claude Code.
  - `context/` folder referenced on demand: **BUILDABLE**.
  - Skills packaging a walked-through process: **BUILDABLE** (Skills + `skill-creator` are real).
  - **The smoke:** the video implies `memory.md` "continuously updates as it learns about you" *autonomously*. Claude does **not** silently self-write memory unless you wire it — via a `CLAUDE.md` instruction to append corrections, a hook, or the `#` memory shortcut / memory tool. Left alone it will not journal your preferences on its own. Also minor: the file is called `CLAUDE.md` in Claude Code, not `agents.md` (though `AGENTS.md` is now also read). Gate a guide that says "here's how to wire the auto-update," not "it just does it."

- **The gated deliverable:** the actual `CLAUDE.md` template (role + Business/Voice/Defaults/Always-Never blocks pre-filled with slots), a `context/` folder starter set, the exact one-line `CLAUDE.md` rule that makes corrections persist to `memory.md`, and a worked `SKILL.md` example (e.g. "weekly content pack") built with `skill-creator`. Over-delivers because the video names the four files but hands over zero of their contents or the wiring that makes memory real.

- **Alex's angle:**
  - Hook: "Why pay for Claude only to re-explain your brand every single time you open it? Here's the setup that fixes it for good." (This is already drafted verbatim in the teardown COPY-IT for Teardown 1.)
  - Formula/teardown: **gregisenberg's own** — the staircase from Teardown 1 (`4 .md files`) is the exact match: reframe hook to sunk-cost loss-frame, "Start by…", "But a brand file alone isn't enough," "Finally… a reusable Skill," quantified before/after close, cut on keyword.
  - Broad-TAM framing: everyone with a Claude subscription "already owns" this and wastes it. Frame the four files as a **brand brain** so a freelance designer, a Shopify owner, a coach, and a founder all self-select in. Keyword: **BRAIN**.

---

## The Obsidian Second-Brain Command Deck — from "Claude Code + Obsidian in under 1 minute" (597,000 views)

- **What it does:** points Claude Code at your existing notes so it can think *with* you: a `/today` command that assembles your day, and an `/emerge` command that surfaces ideas you keep circling but never named. The outcome: your dead notes become a system that plans and connects for you.

- **The build — the real system:**
  1. **The vault.** Obsidian is free; a "vault" is just a folder of `.md` files. No lock-in — any markdown folder works. This is the corpus Claude reasons over.
  2. **Connect Claude to the vault.** Simplest real path: run Claude Code with the vault folder as the working directory (it reads/links the `.md` files natively). The video's "Obsidian CLI" is one option; an **Obsidian MCP server** is the cleaner connector if you want Claude to query the vault's graph/links rather than raw files. Either way the mechanism is: give Claude read (and optionally write) access to the notes.
  3. **Build custom slash commands** in `.claude/commands/*.md`. Two categories, exactly as Greg splits them:
     - **Daily-ops command — `/today`.** Prompt structure: "Pull my calendar + open tasks + notes modified in the last 24–48h, then produce a single prioritized one-day plan." The calendar/tasks pull requires a **Google Calendar connector / MCP** (and a tasks source) — this is the step the video glosses.
     - **Thinking command — `/emerge`.** Prompt structure: "Scan the vault for recurring themes and half-formed ideas across notes, cluster them, and name the 3 ideas I keep returning to but never articulated." This one needs no external connector — it is pure retrieval + synthesis over the folder.
  - **The trick:** the value is not the notes, it is the *commands*. A saved slash command turns a 200-word orchestration prompt into a one-word trigger, and pointing Claude at a linked markdown graph lets it surface cross-note connections a human misses.

- **The wow artifact:** typing `/emerge` and watching Claude name, in <2s, "the idea you've been circling for months but never wrote down" — pulled from notes scattered across the vault. State change: a pile of disconnected notes to a named insight the user couldn't articulate themselves.

- **⚠️ Buildable today? PARTLY.**
  - Vault = markdown folder, Claude Code reading it, custom slash commands: **BUILDABLE**, all core.
  - `/emerge` (synthesis over notes): **BUILDABLE**, no dependencies.
  - **The caveat:** `/today` "pulls your calendar and tasks" only works if you connect a calendar/tasks source (Google Calendar MCP/connector). Out of the box Claude cannot see your calendar. The "Obsidian CLI" phrasing also oversimplifies — you either point Claude at the folder or install the Obsidian MCP; there is a setup step the "under 1 minute" title hides. Nothing here is outright smoke, but a gated guide must include the calendar-connector step or `/today` will no-op.

- **The gated deliverable:** the two ready-to-drop command files (`today.md` and `emerge.md` with the full prompt bodies), the exact steps to point Claude Code at an Obsidian vault (folder-as-cwd and the MCP option), and the Google Calendar connector setup so `/today` actually returns a plan. Over-delivers vs a video that names the commands but never shows their contents or the connector.

- **Alex's angle:**
  - Hook: "If you leave yourself voice notes all day, Claude just became your chief of staff. Here's the setup." (drafted in Teardown 2 COPY-IT).
  - Formula/teardown: **gregisenberg's own** — Teardown 2's "If you [habit]" qualifier hook + the two-categories staircase (daily-ops command / thinking command) maps 1:1.
  - Broad-TAM framing: reframe from "if you use Obsidian" (narrow) to "**if you take notes anywhere**" (voice memos, Apple Notes, a messy folder) so note-takers of every stripe self-select. Keyword: **CHIEF**.

---

## The Anti-Slop Claude Code Method — from "Claude Code Clearly Explained" (419,000 views)

- **What it does:** stops Claude Code from producing "slop" by fixing the *user's* process, not the model: make Claude interrogate you first, build feature-by-feature, and reset the session before context rots. Outcome: a real finished app instead of a broken one-shot.

- **The build — the real system (it is a 3-step discipline, not a stack):**
  1. **Force interrogation before any code.** Use the ask-user-question behavior: a prompt that makes Claude interview you on every technical detail, trade-off, and edge case before writing a line. Real mechanism: Claude Code's **AskUserQuestion tool** and **Plan mode** already do this; a "spec/interrogation" prompt triggers it reliably. Prompt structure: "Before writing any code, ask me one question at a time about requirements, stack, trade-offs, and edge cases until you have a complete spec. Do not write code until I say go."
  2. **Decompose into features, build+test each in isolation.** Prompt structure: "Break this into feature A, B, C. Build feature A, test it, confirm it works, then move to B." This is workflow discipline, not a tool — but it is the single biggest quality lever.
  3. **Watch the context window; reset at ~40–50%.** When the session fills, start fresh and continue feature-by-feature. Real mechanisms: `/context` to check usage, `/compact` to summarize-and-continue, `/clear` to hard-reset. The "AI forgets at 50% of a 200K window" figure is a rule of thumb, not a spec number, but context degradation on long sessions is real and the practice is sound.
  - **The trick:** front-loaded rigor (interrogation) + bounded scope per session (one feature, fresh context) is what separates a working build from slop. It costs nothing and needs no extra tools.

- **The wow artifact:** the interrogation moment — you say "build me an app" and instead of dumping code, Claude fires back a sharp technical question you hadn't considered. State change in <2s: lazy prompt to Claude visibly taking control of the spec. (The context-window number-drop is the secondary save-worthy beat.)

- **⚠️ Buildable today? BUILDABLE.** This is the most honest of the three because it is technique, not a fragile stack. Interrogation (AskUserQuestion / Plan mode), feature decomposition, and session resets (`/compact`, `/clear`, `/context`) are all real, first-party, free. Only nuance to flag in the guide: the exact "50%" is a heuristic — teach "reset when the context bar climbs and quality drops," not a magic percentage.

- **The gated deliverable:** the copy-paste **interrogation prompt** (the one the video points at but never shows), a feature-decomposition prompt template, and the exact session-hygiene commands (`/context`, `/compact`, `/clear`) with when to fire each. This is pure over-delivery: the whole video is a tease for "this prompt," so handing over the real prompt is the payoff.

- **Alex's angle:**
  - Hook: "Everyone's using Claude for research like it's a search engine, and wonders why the answers still read like a Wikipedia stub. Here's what to do instead." (Teardown 3 COPY-IT generalizes the "slop" frame off code onto research.)
  - Formula/teardown: **gregisenberg's own** — Teardown 3's "everyone's doing it wrong / here's what to do instead" + the "don't X, instead Y" contrast-pair engine + the counterintuitive number-drop is the exact structure.
  - Broad-TAM framing: recast from "coding slop" (developers only) to **"AI output slop"** (research, copy, decks) so any Claude user, not just builders, sees themselves. The interrogate-first / one-task-per-session / reset-before-rot method transfers to every use. Keyword: **SLOP** (or **RESEARCH** if angled at the research variant).

---

## Not spec'd: "The future of building startups is building micro-startups" (300,000 views)
Greg's #4 by views is a raw podcast clip riding one contrarian one-liner ("not a startup, a micro-startup") plus an "AI makes building easy now" peg. It demonstrates **no AI workflow** — there is nothing to build or gate. Structurally it also under-lifts (~1.5x median vs ~2–3.7x for the scripted staircases) and uses first-person, which conflicts with Alex's rules. If Alex wants the contrarian-thesis energy, graft it onto a real workflow (e.g. "stop building one AI agent, build a team of tiny ones" — the agent-team staircase drafted in Teardown 4's COPY-IT), not onto a standalone philosophy clip.

## Cross-workflow honesty note
All three winners share the same real backbone: **Claude Code + markdown config + saved commands/skills + connectors.** The recurring oversell to correct in every gated guide is *autonomy* — the videos imply the memory writes itself, the calendar connects itself, the context manages itself. Each is buildable, but each needs one wiring step the video hides. Gate the wiring, and Alex's guide beats the video it copies.
