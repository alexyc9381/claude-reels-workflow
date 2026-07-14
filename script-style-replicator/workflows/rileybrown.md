# rileybrown — Proven-Viral Workflows
> The actual AI systems behind rileybrown's biggest hits, reverse-engineered into buildable specs.
> Source: 4 top-outlier transcripts + teardowns (fetched 2026-07-12). Views range 183K–1M.
> Honest-buildability audited against what Claude can genuinely do in 2026-07.

---

## Selfie-to-Dating-Photos App — from "Oh my.. this shouldn't be possible (Tinder/Hinge profile generator)" (1,000,000 views)

- **What it does:** A user snaps one selfie and the app returns six polished, dating-profile-quality photos of *their own face*, saved to a real database, then ships to the app store. The outcome the viewer wants: "an app that makes me look good on Hinge, built with zero code."

- **The build (the real system):**
  - **Platform:** a vibe-coding app builder (video uses vibecode.dev) that scaffolds a full-stack mobile app — React Native / Expo front end, a backend, and a hosted database — from natural-language prompts. Claude Code is the model driving the codegen inside it; the same result is reproducible with Claude Code + Lovable/Bolt/Expo directly.
  - **The image engine is external, not Claude:** face-consistent generation comes from the "nano banana API" = Google's Gemini image model (Nano Banana / Gemini 2.5 Flash Image), which preserves identity from a single reference selfie. Claude writes the app that *calls* that API; Claude does not generate the photos itself.
  - **Data layer:** a real DB (Supabase-class) stores every generated photo so the app can prove persistence, not a mockup.
  - **Prompt structure (3 shots, not 1):**
    1. **Spec prompt** — one paragraph: what to build (photo generator), which image API to wire in, how many outputs (6), and a *style-reference anchor* ("make it feel like the Netflix mobile app"). The style-reference shortcut is the trick — it hands the model a known aesthetic instead of a spec.
    2. **Iterate prompt** — a precise product-manager tweak ("generate all images in parallel, not sequentially; use this asset as the loading-screen logo").
    3. **Ship prompt/action** — deploy the backend, then submit to the app store via an Expo token.
  - **The trick that makes it work:** anchoring the UI to a famous app ("similar to Netflix") + letting an external identity-preserving image model do the hard part while the vibe-coder only handles glue code.

- **The wow artifact:** the selfie reveal — he takes a live selfie, waits ~2s, and six photos that clearly look like *him* fade in on screen. The face-match is the sub-2-second state change that sells "this shouldn't be possible."

- **⚠️ Buildable today? PARTLY.**
  - REAL: Claude Code genuinely scaffolds a full-stack Expo app with a live DB in a handful of prompts. Identity-preserving generation from one selfie is real via Gemini/Nano Banana (or fal/Replicate identity models).
  - SMOKE / compressed: (1) The photos are NOT made by Claude — it's an external Google image API; a Claude-branded guide must say so or it lies. (2) "One single prompt / just three prompts" is heavily edited — real builds need several correction loops. (3) "Boom, sent to the app store" = *submitted* for review, not live; it requires a paid Apple Developer account ($99/yr) and Apple's multi-day review. Don't let the guide imply an app is publicly downloadable in three minutes.

- **The gated deliverable (what the comment guide hands over):**
  - The exact 3-prompt sequence (spec + iterate + ship) with the style-reference-anchor pattern spelled out.
  - Which image API to plug in and where to get a key, plus the fal/Replicate fallback if they can't use Gemini.
  - The honest checklist for actually shipping: Apple Developer account, Expo/EAS build + submit steps, and the "submitted vs live" reality.
  - A copy-paste `.env` + wiring snippet so their app calls the image model on the first try.

- **Alex's angle:**
  - **Hook (rileybrown's authority-flex opener):** "We're using Claude, the best building AI in the world, and it just built a real app that turns one selfie into six pro photos."
  - **Formula/teardown:** rileybrown Teardown 1 (authority-flex hook → spoken prompt → proof-the-database aside → iterate turn → ship payoff). Cut hard on the keyword.
  - **Broad-TAM reframe (dating is niche-ish, widen it):** point the same build at *professional headshots* — "one selfie, ten LinkedIn-ready headshots, no photographer." Every freelancer, coach, realtor, and founder needs headshots; that clears the breadth litmus better than a dating app. Keyword: HEADSHOT.

---

## Agent-Controls-Blender — from "What happens when you give OpenClaw access to Blender" (704,700 views)

- **What it does:** An AI agent edits a 3D scene in Blender from plain-English messages — add a table, make the legs longer, "build my dream office" — with no manual modeling. Outcome the viewer wants: "I can make 3D scenes by just talking."

- **The build (the real system):**
  - **The controller is an MCP, not magic:** the real mechanism is **Blender MCP** (the `blender-mcp` server exposes Blender's Python API / `bpy` as MCP tools — create objects, set materials, transform, render). "OpenClaw" is the video's brand for the agent loop; the actual capability is Claude + Blender MCP.
  - **Runtime:** it runs headless on a Mac Mini so the scene persists and renders server-side.
  - **Input channel:** a **Telegram bot** relays the user's text to the agent, so he can drive Blender from his phone. Telegram → relay script → Claude (agentic loop) → Blender MCP tool calls → Blender re-renders.
  - **Agent roles (single agent, tool-using loop):** one Claude agent reads the instruction, decomposes it into object/material/transform operations, calls Blender MCP repeatedly, inspects the result, and self-corrects (this is the visible "too big / too small / it figured it out" loop).
  - **Prompt structure:** conversational spatial instructions ("add a monitor as if the Mac Mini is using it"), then stacked edits ("longer legs, thicker table, a wall behind the monitor"), then one open-ended autonomy ask ("based on everything you know about me, build my dream office"). The trick: describe *spatial intent and relationships*, not coordinates — the MCP + model resolve geometry.

- **The wow artifact:** an object literally appears/mutates in the Blender viewport seconds after a text message — the monitor pops onto the wall, or the empty room fills with a studio. The viewport changing on its own from a phone text is the sub-2-second payoff.

- **⚠️ Buildable today? BUILDABLE (with a reliability caveat).**
  - REAL: Blender MCP is a real, popular open-source server; Claude genuinely adds/edits objects, materials, and renders through it. Headless Mac Mini + Telegram relay are standard, simple pieces.
  - CAVEAT (not smoke, but be honest): it's finicky. The "way too big / way too small / what the hell" chaos in the video is the *real* reliability profile — spatial precision is hit-or-miss and needs iteration. The guide should sell "talk to Blender" as real but set expectations that you nudge it several times. Nothing here is faked; it's just messier than a clean 30s cut implies.

- **The gated deliverable:**
  - Step-by-step Blender MCP install + connect-to-Claude setup (the .json config, the Blender addon side).
  - The Telegram-bot relay: a ~40-line script that forwards messages to the Claude agent and posts renders back.
  - The prompt patterns that actually land geometry ("describe relationships, not coordinates"; "ask for one change at a time when precision matters").
  - Headless-Mac-Mini run notes so it survives a closed laptop.

- **Alex's angle:**
  - **Hook (rileybrown's reposted opener, verbatim skeleton):** "No way. This is one AI agent, and it can literally control Blender from a text message."
  - **Formula/teardown:** rileybrown Teardown 2 (awe hook → spoken prompt → honest partial-fail → escalation → chaos-then-resolve → open-ended imagination ask → reveal). Keep the chaos beat; it is the proof.
  - **Broad-TAM reframe:** Blender is intimidating/niche. Same mechanism, wider target: "an agent that controls [the design tool you already avoid]." Frame it as *3D product mockups* or *thumbnail scenes* a non-designer can talk into existence. Keyword: BLENDER (or SCENE for the wider cut).

---

## Claude-Code-as-Video-Editor — from "Claude Code is now my video editor" (357,200 views)

- **What it does:** You describe a motion graphic in plain English and Claude Code builds the animated overlay as a rendered video clip, which you drop onto your timeline so it lands on the exact word. Outcome the viewer wants: "custom motion graphics with no After Effects and no designer."

- **The build (the real system):**
  - **The engine is code-rendered motion graphics:** Claude Code generates a **Remotion** project (React-driven video) — or an HTML/CSS/canvas animation — and renders it to a transparent-background `.mov`/`.webm` overlay. (This is Alex's home turf: he already runs a Remotion pipeline at `~/Downloads/matchtern-video` and `claude-reels-workflow`.)
  - **No multi-agent needed:** single Claude Code session. It writes the animation component, renders it, and hands back a file.
  - **Prompt structure (one precise spoken prompt):** describe the *exact output and its timing* in plain English — "a scene with a gradient background, a horizontal bar labeled 'all features', then two seconds later the bar fills to 20% and that part is labeled 'the features I use'." The trick: specify the *visual states + the timing beat* ("then two seconds later…"), not styling jargon. Timing described in speech is what makes it drop on the word.
  - **Last mile:** export the rendered overlay, drag it onto the timeline over the target line.

- **The wow artifact:** playback where the graphic animates in on the *exact word* he speaks — the bar filling to 20% synced to "the features I use." The on-beat sync is the satisfying sub-2s payoff.

- **⚠️ Buildable today? BUILDABLE (fully).**
  - REAL and reproducible end-to-end: Claude Code + Remotion renders a described motion graphic to a transparent overlay; manual drag places it on the beat. Alex already owns this pipeline, so the guide can over-deliver with his actual repo scaffolding.
  - Only honest caveat: "lands on the exact word" is a manual timeline placement, not automatic — trivial, but say it.

- **The gated deliverable:**
  - A ready Remotion starter (the repo scaffold + render command) so the viewer isn't starting from zero.
  - The prompt template that reliably yields a transparent-background overlay ("render with alpha", correct dimensions/fps to match their footage).
  - The 3–4 highest-value overlay recipes (progress bar, callout label, number counter, lower-third) as plain-English prompts.
  - The export-with-alpha + drag-to-timeline steps for the common editors.

- **Alex's angle:**
  - **Hook (rileybrown's "X is now my Y" meta-claim):** "Claude is now your motion designer, and it builds the overlay right when you need it."
  - **Formula/teardown:** rileybrown Teardown 3 (meta "X is now my Y" hook → nested standalone tip → effort-minimizing spoken prompt → on-beat reveal). Note: the original had NO CTA — Alex must ADD the keyword gate.
  - **Broad-TAM reframe:** already broad. Every creator, coach, course-seller, and marketer who posts video needs graphics and can't afford a designer. Keyword: OVERLAY.

---

## One-Agent-Runs-Your-Apps (MCP) — from "Claude is so much better when you use MCP" (183,000 views)

- **What it does:** One agent with access to your Slack, your to-do app, and your calendar executes several real actions from a single plain-English request — sends the messages, books the event, adds the to-do — in parallel. Outcome the viewer wants: "an assistant that actually *does* things across my real apps."
- *(Note: this is the 4th video by views, below the 350K super-performer line, but included because it is the most Claude-native and the single most buildable-today build in the set — the cleanest thing for Alex to gate a guide on.)*

- **The build (the real system):**
  - **The Claude-native mechanism is MCP connectors** — Claude connected to **Slack MCP + a Notion (or to-do) MCP + Google Calendar MCP**. One agent, three tool servers. (The video routes it through a vibe-coded front end + an n8n backend; the connectors path is simpler and more on-brand for Alex — strip the n8n framing.)
  - **Agent role:** a single tool-using Claude agent that keeps calling tools "for as long as it needs" — it parses the multi-part request into discrete actions and fires each against the right connector.
  - **Prompt structure:** one natural-language request that *stacks multiple actions across multiple apps* — "message Muhammad on Slack welcoming him, add 'water the plants' to my to-do list, and put a 8pm event on my calendar." The trick: mixing one real work task with one absurd task ("dance around the room") is what makes it memorable and comment-bait — but structurally it's just N actions in one breath.
  - **Proof pattern:** the agent quotes its own confirmations ("I've created a calendar event for you") and each action is then shown landed in the actual app.

- **The wow artifact:** the recap where every stacked action shows up completed in the real apps at once — the Slack message sent, the calendar event there, "water the plants" sitting in the to-do list. Multiple real apps updating from one sentence is the payoff.

- **⚠️ Buildable today? BUILDABLE.**
  - REAL: Claude with Slack, Google Calendar, and Notion MCP connectors genuinely executes these multi-app actions today. This is the least oversold build in the set.
  - Caveat (permissions, not smoke): each connector needs a one-time OAuth connection, and these are *real side-effect actions* (it will actually send the Slack message / create the event). For a demo that's fine; the guide should flag that you're wiring live accounts, and to test in a sandbox channel first. The video's "n8n backend" is one implementation, not a requirement — Alex's guide should show the native-connector path.

- **The gated deliverable:**
  - The connect-your-apps walkthrough: adding Slack + Google Calendar + Notion MCP to Claude, with the OAuth steps and scopes.
  - The multi-action prompt template (how to stack asks so the agent reliably completes all of them, not just the first).
  - A safe "test channel / test calendar" setup so the first run doesn't spam real coworkers.
  - The exact demo script that produces a clean recap for filming.

- **Alex's angle:**
  - **Hook (rileybrown's setup-inventory opener):** "You can give one AI agent your Slack, your calendar, and your to-do list, and it runs all three at once."
  - **Formula/teardown:** rileybrown Teardown 4 — the cleanest CTA model in the set (setup-inventory hook → small first ask → "it keeps using tools" reframe → big stacked multi-action prompt → recap payoff → cut hard on "comment KEYWORD"). This is the template to copy for the gated close.
  - **Broad-TAM reframe:** universally wanted. Point it at the apps everyone has — inbox, calendar, client list: "reply to that lead, book them Tuesday, add them to my client list." Founders, freelancers, coaches, agencies all use it. Keyword: ASSISTANT.

---

### Cross-cutting honesty note for Alex
The two builds safest to gate (they are fully real and reproducible) are **Claude-Code-as-Video-Editor** and **One-Agent-Runs-Your-Apps (MCP)** — both are native Claude capability with no external smoke. **Agent-Controls-Blender** is real but finicky (set iteration expectations). **Selfie-to-Dating-Photos** is the biggest hook but the most oversold: the photos come from an external Google image model (not Claude), "3 prompts" is edited, and "app store" means *submitted*, not live. If Alex gates that one, the guide must name the external image API and the real shipping steps, or it breaks the "guide that actually works" promise.
