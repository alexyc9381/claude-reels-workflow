# STORYBOARD — REEL 110 FLOW (Stage 6)

> **Logline:** one Claude drowning in a queue types `npx ruflo init`, and the repo it summons
> turns it into sixty Claudes that work in parallel, share one memory, get smarter every run —
> and quietly stop paying frontier prices for easy work.
> Format:   single dark panel · clone the reel-108 MARKETING chassis (`Mkt*` → `Flw*`)
> Arc:      TRANSFORMATION with a villain (see STORY-ARCS.md)
> Villain:  **THE METER** — your API bill, a brass cost column with a climbing needle.
>           RULE: *every task you run makes it climb.* Undefeated S0→S5. Loses ONCE, at S6.
> Hero cast: ONE Claude (the operator, `glasses`) → 60 Claudes; four named specialists at S3
>           (`prof`=PLAN · `constr`=CODE · `chef`=TEST · `cop`=SECURITY); crowd costumes cycled
>           deterministically through all twelve `SlopKit.Mascot` levers.
> ⛔ NUMBER SPINE:  `ruvnet/ruflo` → `npx ruflo init` → **60 agents drawn** →
>                  PLAN · CODE · TEST · SECURITY → shared memory + the learning loop →
>                  LOCAL·FREE lane vs FRONTIER lane → **★ 68,132 · MIT** → COMMENT **FLOW**
> ⛔ HERO ARTIFACT: **THE RUFLO REPO CARD** — GitHub mark, `ruvnet/ruflo`, ★68,132, MIT.
>                  It is settled and complete at frame 0, it BURSTS into the swarm at f40,
>                  and it re-forms at S8 with the star count rolling up. Everything else is set.

---

## 0 · THE SUBJECT, AND THE HONESTY LEDGER

**Subject:** `github.com/ruvnet/ruflo` — *"The original agent meta-harness."* Formerly
`ruvnet/claude-flow`; the README says so in its own words (*"Claude Flow is now Ruflo"*), and
`api.github.com/repos/ruvnet/claude-flow` now redirects to `ruvnet/ruflo`. **This is why the VO
says "Ruflo" and not "Claude Flow" — it is the current name, not a mishearing.**

Verified live 2026-08-18 (`api.github.com/repos/ruvnet/ruflo` + raw README):

| # | VO says | live source | verdict → what the picture is allowed to do |
|---|---|---|---|
| 1 | "most powerful Claude tool on the planet" | — | rhetoric. **Never typeset.** |
| 2 | "60 agents working together simultaneously" | README: *"100+ Agents"*; the CLI track ships *"98 agents, 60+ commands, 30 skills"* | **60 is an UNDERSTATEMENT of a real number.** Draw exactly 60 sprites, header says `60 CLAUDE AGENTS`. ⛔ Never typeset `100+` against a spoken "60" — the mismatch invites a count. |
| 3 | "each one getting smarter every single run" | *"Self-Learning"*, *"SONA neural patterns, ReasoningBank, trajectory learning"*, *"Agents learn from past successes and get smarter"*, *"the planner gets smarter with every run"* | **TRUE.** Draw it as the LEARNING LOOP (the README's own architecture arrow). |
| 4 | "It's called Ruflo" | repo name `ruvnet/ruflo`, npm `npx ruflo` | **TRUE.** Spell it **Ruflo** in captions, **RUFLO** in display caps. |
| 5 | "planning / code / tests / security" | *"Specialized agents for coding, testing, security, docs, architecture"* + the GOAP **planner** at goal.ruv.io (*"plain-English goals → executable agent plans"*) | **ALL FOUR TRUE.** |
| 6 | "all run in parallel" | *"Tools run in parallel… one model response can fire 4–6+ tools at the same time"*, *"swarms"* | **TRUE.** |
| 7 | "sharing memory" | *"Shared memory + SONA"*, *"Vector Memory: HNSW-indexed AgentDB"*, *"Memory that sticks"* | **TRUE.** |
| 8 | **"slashes your API costs by 75%"** | **NOT IN THE README.** What IS there: `ruflo-cost-tracker` (*"track token usage, set budgets, get cost alerts"*), `ruflo-ruvllm` (*"run local LLMs (Ollama, etc.) with smart routing"*), *"Multi-Provider: Claude, GPT, Gemini, Cohere, Ollama with smart routing"* | ⛔⛔ **THE 75% IS UNSOURCED. NO NUMERAL, NO PERCENTAGE, NO "75" ANYWHERE IN THE FRAME.** Dramatise the MECHANISM and stop at the edge of the claim: the meter's needle FALLS, with nothing written on it. Guard: `PCT_BANNED` in `FlwWorld.tsx`. |
| 9 | "basic tasks route to a free tier automatically" | local models via Ollama are free; smart routing is real | **MECHANISM TRUE.** Lanes labelled `LOCAL · FREE` and `FRONTIER`, using the repo's own provider names. |
| 10 | "your Claude subscription just became three times more powerful" | — | rhetoric. ⛔ **No `3×` on screen.** S7 shows the *consequence*: the S0 queue, gone. |
| 11 | "ranked number one in agentic frameworks" | the OLD `claude-flow` description said *"Ranked #1 in agent-based frameworks"*; the CURRENT `ruflo` description does NOT | ⛔ **No `#1` badge.** Show the repo's own GitHub TOPIC chips instead: `agentic-framework` · `swarm-intelligence` · `multi-agent`. Same idea, zero asserted rank. |
| 12 | "over 20,000 stars" | **68,132** stars, 8,173 forks, MIT, pushed 2026-08-18 | **TRUE and understated.** Typeset the REAL figure `★ 68,132`. The VO's "over 20,000" is not contradicted by a bigger true number. |

**Marks available and dark-filled** (the reel-108 white-on-white trap checked on each):
`github.svg #181717` · `ollama.svg #000000` · `googlegemini.svg #8E75B2` · `anthropic.svg #191919` ·
`claude.svg #D97757` · `openai.png`. All ship on white tiles at ≥96px.

---

## 1 · WHY THIS WORLD, AND WHY IT IS NOT A BORROWED ONE

`feedback_real_marks_are_the_props` has now burned three reels: a night waterworks, a title
fight, and a heap of coins were each a **correct mapping of the mechanism** and each got
rejected, because *a metaphor for the mechanism is not the subject*.

So this reel is built out of the **subject's own objects only**, and the largest one is free:

> **An agent IS a Claude.** The VO says "60 agents". The house mascot is the literal noun.
> Nothing on screen has to be translated: sixty Claudes are sixty agents, a task ticket is a
> task, a star is a star, `★ 68,132` is the receipt, and the villain is your actual API bill.

Point at every prop and say what it is — the test from that memory:

| on screen | what it IS (not "stands for") |
|---|---|
| the repo card at frame 0 | the GitHub repo, with its real star count and licence |
| the terminal on the desk | Claude Code, running `npx ruflo init` |
| the stack of tickets taller than the hero | your backlog |
| sixty clay Claudes | the sixty agents |
| four benches labelled PLAN / CODE / TEST / SECURITY | the four specialist agents the VO names |
| the lit core every bench runs a cable to | the shared vector memory (AgentDB) |
| the tag that rides the loop back upstream | the learning loop — what worked last run |
| the brass column with a climbing needle | your API bill |
| two lanes with real provider marks on the gates | the model router |
| the star heap | GitHub stars |

**No row reads "it just looks cool."** The world is the LIGHT and the ROOM; the props are the
product.

---

## 2 · THE FOUR SENTENCES

1. The hero is **one Claude working alone at 3am** and it wants **to clear the queue**.
2. What stops it is **THE METER** — every task it runs makes the bill climb, so working harder
   is punished. (The topic's villain, made physical.)
3. The turn is **`npx ruflo init`** — the harness switches on, one Claude becomes sixty, and the
   router opens a lane the meter cannot bill.
4. The payoff you see is **the queue gone, sixty Claudes running, the needle falling, and the
   repo card reading ★ 68,132 · MIT.**

---

## 3 · THE TEN PLACES (hue AND lightness alternate — the AGENCY bar)

⛔ Every `back2`/`floor2` is the darkest value in its row **on purpose**. When a set is dim, add
a practical (`Cone`/`StreetLamp`/`Pool`) or brighten the SUBJECT — never lift the dark stop.
The ≥140 luma law applies to **frame 0 and nowhere else**; body scenes target luma 70–105,
saturated pixels ≥34%, black point p10 ≤35.

| # | key | place | hue | lightness |
|---|---|---|---|---|
| S0 | `desk` | THE 3AM DESK — one Claude, the repo card lit, a queue behind him | indigo + sodium | **BRIGHT** (frame-0 law) |
| S1 | `floor` | THE SWARM FLOOR — a deep hall, sixty Claudes land in five receding ranks | teal-green | mid-dark |
| S2 | `gantry` | THE GANTRY — exterior, the name lit on a sign over the floor | violet night | bright |
| S3 | `benches` | THE FOUR BENCHES — plan, code, test, security, side by side | ochre / amber | mid |
| S4 | `core` | THE MEMORY CORE — a lit vector core, sixty cables, the loop overhead | blue-black | **darkest** |
| S5 | `meter` | THE COST HALL — the METER at full height, tokens burning into it | oxblood / red | dark-warm |
| S6 | `router` | THE ROUTER — two lanes under one switch, tasks streaming down both | steel + cyan | mid-bright |
| S7 | `deskclear`| THE SAME DESK, STAFFED — queue gone, lights on, meter dropping | amber | bright |
| S8 | `stars` | THE STAR YARD — exterior, the repo card and a heap of stars | deep violet + gold | bright |
| S9 | `cta` | THE KEYWORD PLATE — the word struck into steel | near-black + clay | mid |

---

## 4 · THE SCENE CARDS

Frame constants are **measured** from `src/data/words_110flow.json`, `round(onset × 30)` — nothing
estimated. VO = `public/vo_110flow.wav`, 31.92s, 958 frames @30fps.

---

### SCENE 0 — 0.00→2.39s (72f) · LOCKED WIDE · BEAT: HOOK · intensity 8
- **VO:** *"Meet the most powerful Claude tool on the planet,"*
- **SET:** THE 3AM DESK. Back plane: a night window wall with warm sodium panes (high luma AND
  high saturation — ⛔ never pale blue, that is the ten-reel regression in one edit). Mid plane:
  a run of racks left, the terminal and the desk centre-right. Floor plane with a lamp pool.
  Occluder: a server cabinet cropped hard on the left, in front of the action.
- **CAMERA:** locked; the house in-panel push 1.00→1.09 only.
- **BLOCKING:**
  - **before (f0–f10)** — settled and complete: the **REPO CARD** hangs lit at 300px with the
    GitHub mark, `ruvnet/ruflo`, `★ 68,132`, `MIT`; ONE Claude (glasses) at the terminal; behind
    him a stack of **task tickets taller than he is**; the METER small at frame right, ticking up.
  - **trigger (f10)** — ⭐ **the card BURSTS.** Three-frame flash, the card's face cracks into
    eight shards thrown outward, the ticket stack jolts.
  - **travel (f14–f66)** — the shards fly the full panel width and out; through the gap the first
    Claudes begin streaming out of the card, small, accelerating toward camera.
  - **arrival (f66–f72)** — they hit the floor and the cut lands on the word "60".
- **LIGHT:** one warm key from the desk lamp at frame right, cold fill from the window. Hero reads
  against ground by LIGHTNESS (lit clay body on a dark indigo floor).
- **SFX:** `sub` @0.00 · `c_hit` typing @0.20/0.45 · **`lib_cinematic_hit` + `sub` + `thock` @0.33
  (the burst)** · `c_break` @0.40 · rising `blip1` @1.10/1.55/1.95 as the swarm accelerates.
- **TAKEAWAY:** *this is a GitHub repo, it is about Claude, and something just came out of it.*
- **§3 test — what does the picture ADD over the line?** The line says "tool"; the picture says
  *which* tool, with its own receipt, and then destroys it so the swarm can come out. Not a container.

---

### SCENE 1 — 2.39→6.12s (112f) · LOCKED WIDE · BEAT: HOOK-2 · intensity 9
- **VO:** *"60 agents working together simultaneously with each one getting smarter every single run."*
- **SET:** THE SWARM FLOOR. Deep teal-green hall, five receding rank lines, an overhead truss with
  worklights, floor grit drifting. Occluder: a stanchion cropped left.
- **CAMERA:** locked; push 1.00→1.10.
- **BLOCKING:**
  - **f0–f4** — the sixty land in **five receding ranks: 5 / 8 / 12 / 16 / 19 = 60**, front rank at
    190px pitch and s≈150 (the readable cast), each rank behind smaller, dimmer and higher.
    ⛔ Pitch computed before count: `spacing ≥ 0.85 × (rA + rB)`. Packing sixty at one size is the
    blob failure — depth is what makes sixty legible.
  - **arrival cost** — squash, a dust ring per rank, the truss lights jolting.
  - **f4–f112** — ⭐ **every landed Claude runs an ACTION LOOP, not an idle**, chosen by index
    (0 PACE · 1 WORK · 2 HOP · 3 LOOK), each on its own phase and rate.
  - ⭐ **"getting smarter every single run" = FOUR DISCRETE LEVEL-UPS** at f34 / f58 / f80 / f100,
    each a hard pop that sweeps left→right across all five ranks (N discrete events beat one long
    tween — measured 4.27 → 5.63 on identical frames).
- **LIGHT:** cold overhead worklight, warm rim from behind the ranks so the crowd separates.
- **SFX:** `impact_deep` @2.42 (the landing) · four `c_1up` at the level-ups, rising in pitch.
- **TAKEAWAY:** *sixty of them, all working, all improving.*

---

### SCENE 2 — 6.12→7.86s (52f) · PUSH-IN · BEAT: NAME · intensity 7
- **VO:** *"It's called Ruflo, and this thing is crazy."*
- **SET:** THE GANTRY. Exterior, violet night above the floor; the swarm visible below as small lit
  ranks; a steel gantry sign across the frame. Occluder: the parapet cropping both sides.
- **CAMERA:** the reel's **one motivated re-framing move** — a push 1.00→1.17 onto the sign.
- **BLOCKING:** the name **RUFLO** arrives letter-block by letter-block (five hard lands, f4→f26),
  the GitHub mark seats beside it, and the command `npx ruflo init` types itself on the plate
  under it. The gantry lamps strike on one at a time behind.
- **LIGHT:** one hard sodium key from below-left; the sign is the brightest object in the reel body.
- **SFX:** five `thock` on the letter lands, rising · `ratchet` @7.10 · `c_unlock` @7.45.
- **TAKEAWAY:** *the name, spelled, plus the one command that installs it.*
- ⛔ ONE text chip band. The name IS the chip; nothing else enters that band.

---

### SCENE 3 — 7.86→11.91s (121f) · LOCKED WIDE · BEAT: SETUP · intensity 7
- **VO:** *"One agent handles planning, another writes the code, another runs tests, then another checks security."*
- **SET:** THE FOUR BENCHES. Warm ochre workshop, four real benches in a row with tool boards
  behind them, shavings and offcuts on the floor. Occluder: a rack cropped right.
- **CAMERA:** locked; push 1.00→1.08.
- **BLOCKING:** ⭐ **each bench lights on its own VO word** — PLAN f0, CODE f39, TEST f63, SECURITY
  f88 — and each specialist is doing the actual job, not holding a labelled box:
  - **PLAN** (`prof`) — pins a route of cards across a board, one card at a time, and the route
    LINE draws itself between them.
  - **CODE** (`constr`) — a real editor pane fills line by line beside him, hammering each line in.
  - **TEST** (`chef`) — feeds cases into a rig; green ticks stamp down a column, one RED first
    (a test that fails is what makes "runs tests" legible), then it goes green.
  - **SECURITY** (`cop`) — sweeps a lamp across the code pane; two red findings flare and get
    clamped shut.
  - The work PASSES DOWN THE LINE: a lit ticket handed bench→bench, so it is one job through four
    hands, not four separate vignettes.
- **LIGHT:** warm key from the tool boards; each bench's own lamp snaps on when it activates.
- **SFX:** four `c_bump`/`c_clear` alternating at the bench lights · `key` ×3 on the code lines ·
  `c_break` on the failing test · `stamp_press` on the security clamp.
- **TAKEAWAY:** *four different jobs, one job travelling through them.*

---

### SCENE 4 — 11.91→15.59s (111f) · LOCKED WIDE · BEAT: ESCALATE · intensity 8
- **VO:** *"They all run in parallel, sharing memory, and even improving each other after every single run."*
- **SET:** THE MEMORY CORE. **The darkest set in the reel** — near-black blue, lit only by the core
  itself. A hexagonal vector core centre, sixty cable runs converging on it, an overhead return
  rail. Occluder: two cable trunks cropped left and right.
- **CAMERA:** locked; push 1.00→1.11.
- **BLOCKING:**
  - **parallel** — sixteen worker silhouettes across the back, all moving at once on different
    phases; ⛔ the background process here is the cable pulse, always running.
  - **sharing memory** — ⭐ **payload beads travel IN along the cables and OUT again**, continuously,
    both directions, large and bright against the black (light AND shadow alternating — a
    light-only wash lifts the black point, which is the move the look gate exists to ban).
  - **improving each other** — the **LEARNING LOOP**: at f52 a lit tag ejects from the core, climbs
    the overhead rail across the full panel width, and drops back into the queue upstream; the
    four benches visible at the back each step up a notch as it passes.
- **LIGHT:** the core is the only source. Everything else is rim light off it.
- **SFX:** `c_powerbig` @12.0 (the core spinning up) · `blip2` ×4 on the bead volleys ·
  `c_warp` @13.6 (the loop tag launching) · `arrive_chime` @14.9 (it lands back upstream).
- **TAKEAWAY:** *one shared brain, and what it learns goes back to the front of the line.*

---

### SCENE 5 — 15.59→19.68s (122f) · LOCKED WIDE · BEAT: TURN · intensity 8→6 (the villain's last win)
- **VO:** *"But here's the part that's even crazier. It slashes your API costs by 75%."*
- **SET:** THE COST HALL. Oxblood, dark-warm. **THE METER** at full height, a brass column with a
  needle track up its face, a hopper at the top burning tokens into it. Occluder: a girder across
  the top third, in front.
- **CAMERA:** locked; push 1.00→1.12.
- **BLOCKING:**
  - **before (f0–f40)** — the villain WINS one more time: tokens pour into the hopper and the
    needle CLIMBS in hard steps, four of them, each with a jolt; the hero shrinks under it.
  - **trigger (f52)** — the router breaker throws, offstage; the hall light changes from red to cool.
  - **travel/arrival (f52–f122)** — the needle **FALLS** in four hard steps with a recoil at each,
    the burning hopper cools, and the column's lit segments go out from the top down.
  - ⛔⛔ **NO NUMERAL.** The needle's track carries tick marks and nothing else — the percentage is
    unsourced. Ten segments, six going dark, no figure written anywhere.
- **LIGHT:** red key from the hopper, replaced by cool cyan from frame left as the router engages.
- **SFX:** four `impact` climbing on the rises · `alarm` low under it · `c_boss` @17.3 (the breaker) ·
  four `thock` falling in pitch on the drops · `sub` @19.2.
- **TAKEAWAY:** *the bill goes DOWN, and it goes down because something switched.*

---

### SCENE 6 — 19.68→24.52s (146f) · LOCKED WIDE · BEAT: ⭐⭐ PEAK · intensity 10
- **VO:** *"Basic tasks route to a free tier automatically, while advanced tasks only use the expensive model when necessary."*
- **SET:** THE ROUTER. Steel and cyan, mid-bright. One overhead SWITCH with a blade that throws
  left/right; **two lanes running the full width of the panel**, the near lane `LOCAL · FREE` with
  the Ollama mark on its gate, the far lane `FRONTIER` with the Claude mark on its gate. Occluder:
  a gantry leg cropped left.
- **CAMERA:** locked; push 1.00→1.14. ⛔ No shake — an impact is sold by what happens to the OBJECT.
- **BLOCKING:**
  - ⭐ **the peak's shape is MANY LARGE OBJECTS ARRIVING CONTINUOUSLY** — a stream of task tickets
    enters top-centre and does not stop for the whole 4.84s. The blade reads each one and throws it:
    small/simple ones sail down the FREE lane (many, fast, in a continuous run); the big red-flagged
    ones go down the FRONTIER lane (few, slow, heavy, each landing with a thud).
  - the ratio is DEPICTED, never labelled: the free lane is thick with traffic, the frontier lane
    passes four items in the whole scene. ⛔ No percentage anywhere.
  - the FREE lane's counter fills with tickets stacking visibly; a Claude works each gate.
  - the METER is visible top-right, needle flat and staying flat — the villain is beaten and stays
    beaten from here.
- **LIGHT:** cool cyan key over the free lane, warm gold pool over the frontier lane, so the two
  lanes differ in **hue AND value** and the sort is legible on a muted feed.
- **SFX:** density peaks here — `ratchet` on each blade throw (×6, alternating pitch) ·
  `c_coin` ×5 down the free lane · `impact_deep` ×3 on the frontier landings · `c_powerbig` @23.6.
- **TAKEAWAY:** *easy work goes to the free lane by itself; only the hard stuff pays.*

---

### SCENE 7 — 24.52→26.82s (69f) · LOCKED WIDE · BEAT: PAYOFF · intensity 9
- **VO:** *"Your Claude subscription just became three times more powerful."*
- **SET:** **THE SAME 3AM DESK AS S0**, now amber and fully staffed. The callback is the payoff:
  the window is the same window, the desk is the same desk, the racks are the same racks.
- **CAMERA:** locked; push 1.00→1.10.
- **BLOCKING:** the ticket stack that was taller than the hero at S0 is **gone** — the last three
  tickets get lifted away in the first 30 frames and the empty spike stands where the stack was;
  eight Claudes work the room where there was one; the METER sits at the bottom of its track with
  its lamp out. ⛔ **No `3×` on screen** — the claim is rhetoric, so the picture shows the
  consequence instead, and the consequence is a real before/after the viewer saw 24 seconds ago.
- **LIGHT:** the room's overheads are now ON (S0 had one lamp) — the same set, relit, is the story.
- **SFX:** three `c_collect` on the last tickets lifting · `c_fanfare` low @25.6 · `sub` @26.4.
- **TAKEAWAY:** *the exact thing that was blocking him at second one is gone.*

---

### SCENE 8 — 26.82→30.45s (109f) · LOCKED WIDE · BEAT: RECEIPTS · intensity 8
- **VO:** *"It's even ranked number one in agentic frameworks with over 20,000 stars."*
- **SET:** THE STAR YARD. Exterior, deep violet night, gold key. The **REPO CARD re-forms** at
  330px centre — the shards from S0 fly back IN and seat, which closes the loop the hook opened.
- **CAMERA:** locked; push 1.00→1.09.
- **BLOCKING:**
  - the card re-assembles f0–f20 (eight shards arriving, each with a seat-thud).
  - ⭐ the star count **ROLLS UP** on an odometer to `68,132` across f20–f76 — a number that MOVES
    to its value, never typeset at it.
  - a heap of stars builds under it as the counter climbs, each star a real landed object.
  - the repo's own GitHub **topic chips** land one at a time: `agentic-framework` ·
    `swarm-intelligence` · `multi-agent`. ⛔ **No `#1` badge** — the current repo description does
    not claim a rank.
  - `MIT` stamps into the card's footer at f92.
- **LIGHT:** gold key from below onto the card; the yard behind stays violet-dark so the card ranks.
- **SFX:** eight `thock` on the shards seating · a continuous low `c_coin` bed under the roll-up ·
  `gold_stamp` @29.9 on MIT.
- **TAKEAWAY:** *it is real, it is MIT, and here is the number.*

---

### SCENE 9 — 30.45→31.92s (44f) · LOCKED · BEAT: CTA · intensity 7
- **VO:** *"Comment Flow for the link."*
- **SET:** THE KEYWORD PLATE. Near-black with one clay key.
- **BLOCKING:** the word **FLOW** is STRUCK into a steel plate in two hits (f8, f24), each with a
  recoil, a ring and a puff; the Claude mark sits above it; the hero Claude stands beside the plate
  at scale. ⛔ HARD CUT on the last frame of the keyword — no fade, no outro.
- **SFX:** `impact` @31.0 and `impact` + `sub` @31.5, the second one heavier.
- **TAKEAWAY:** *the word to type.*

---

## 5 · THE INTENSITY CURVE

```
S0  8  ████████
S1  9  █████████
S2  7  ███████
S3  7  ███████
S4  8  ████████
S5  8  ████████   (villain's last win, then its fall)
S6 10  ██████████ ⭐ PEAK — beats the hook
S7  9  █████████
S8  8  ████████
S9  7  ███████
```
No belly sag: the lowest points (S2, S3) are the two shortest scenes and both carry a hard
arrival cadence. The peak (S6) beats the hook (S0=8, S1=9) — required by the spec.

**Density contour:** SFX run 4–6 cues per scene and **9–11 in S6**, which is the one that carries
the story. Flat coverage reads as busy AND unranked.

---

## 6 · THE ADVERSARIAL CRITIC PASS (mandatory)

**Swipe points, 0–5s, second by second:**
| t | what is on screen | reason to stay |
|---|---|---|
| 0.0–0.3 | the repo card, settled, with a real star count; a Claude; a queue taller than him | recognition: *that is a GitHub repo about Claude*, and *that queue is my Monday* |
| 0.3–0.5 | **the card bursts** | an object coming apart is an interrupt; a fade never is |
| 0.5–2.4 | Claudes accelerating out of it toward camera | "how many are there" is an open question |
| 2.4 | **sixty land, on the word "60"** | the answer arrives, oversized |
| 2.4–5.0 | four level-up sweeps across the ranks | the crowd is not static: it is being upgraded |
No second in 0–5s repeats a framing.

**Repeated base-object:** S0 and S7 deliberately share the desk — that is a CALLBACK, and the
before/after is the payoff. No other pair shares a set. The repo card appears at S0, S2 and S8
by design (burst → name → re-form) and is a different object state each time.

**Payoff spent early?** No. The queue clearing is held to S7; the star count to S8. S0 shows the
card's star figure small as a receipt, not as the payoff.

**Villain integrity:** the METER climbs at S0 (small), is absent S1–S4 (so it is not being beaten
off-screen), WINS a fourth time at S5 f0–f40, and loses exactly once, at S5 f52 driven by S6's
mechanism. It never loses twice.

**Intensity curve:** plotted above — no sag, peak beats hook. ✔

**What the critic broke, and the rewrite:**
1. *"S3 is four vignettes side by side — that is a container of four, not an event."* → rewritten
   so ONE lit ticket travels bench→bench and the benches light in VO order. The scene now has a
   subject that crosses the frame.
2. *"S5 and S6 are the same idea twice (cost)."* → S5 is the METER (the villain's fall, an
   emotional beat, no mechanism); S6 is the ROUTER (the mechanism, no emotion). Different set,
   different hue, different shape: a column vs two lanes.
3. *"S8's odometer is a number typeset at its value."* → changed to a roll-up that travels to
   68,132 with a star heap growing under it, so the figure is DEPICTED.
4. *"Sixty sprites will read as a blob."* → five receding ranks (5/8/12/16/19), only the front
   rank at legible scale; pitch computed before count.
5. *"The hook has no Claude mark in the first three seconds."* → the mark is ON the repo card at
   frame 0 at 300px, and the sixty bodies ARE the brand from f72.

---

## 7 · THE FLOORS THIS BOARD CLEARS

1. **Every scene is a real place, not shapes on black** — ten named locations, each with ≥4 depth
   planes (back wall / mid band / floor / grit) and a mass **cropped by the panel edge in front of
   the action** (`Occluder`) named in every card.
2. **The camera is disciplined** — every scene is LOCKED with only the house in-panel push; exactly
   **one** motivated re-framing move in the whole reel (S2's push onto the sign).
3. **The arc has a shape** — transformation with a villain; peak at S6 beats the hook; villain
   undefeated until it falls once.

---

## 8 · BUILD MANIFEST

| file | holds |
|---|---|
| `video/src/FlwWorld.tsx` | the honesty ledger (`R`, `PCT_BANNED`, `RANK_BANNED`), the ten `PLACES`, `Rake`/`Ring`/`Puff`/`Pool`, the `RepoCard` hero artifact, the `Meter` villain |
| `video/src/FlwSets.tsx` | the ten sets, each with its band contents and its occluder |
| `video/src/FlwProps.tsx` | `SwarmRanks`, `Bench`, `MemoryCore`, `LoopTag`, `RouterLanes`, `TicketStream`, `StarHeap`, `Odometer`, `KeywordPlate`, the specialists |
| `video/src/FlwScenes.tsx` | S0–S9 |
| `video/src/ClaudeFlowReel.tsx` | assembly, `L[]`, the SFX bank, the section headers |
| `video/src/flow-110-index.tsx` | the comp registration |
| `video/public/vo_110flow.wav` | 31.92s, −16.0 LUFS, 0 flubs |
| `video/src/data/words_110flow.json` | 119 words, 40 lines, span 0.00→31.52 |

**Gates this build is finished against:**
```bash
python3 tools/verify_reel.py REEL.mp4 --words src/data/words_110flow.json \
  --script "$(cat public/flow_script.txt)" --music public/110_flow_bed.wav
python3 tools/scene_motion_audit.py REEL.mp4 --scenes 0,72,184,236,357,468,590,736,805,914
python3 tools/look_audit.py REEL.mp4          # HOOK_LUMA on the ENCODED yuv420p file
grep -hoE 'boxShadow: *"0 0 [0-9]+px' src/Flw*.tsx | wc -l    # must be 0
grep -rn "75%\|#1\|100+ AGENTS\|3x\|3×" src/Flw*.tsx          # must be 0
```

---

## 9 · AS BUILT — the two review rounds, and the measured result

### Round 1 changes (build-time, all diagnosed off a measurement)

| board said | as built | why |
|---|---|---|
| five receding ranks, front at s≈150 / 190px pitch | ranks **19/16/12/8/5** at sizes **51/62/80/113/168**, plus a per-rank darker clay `RANK_TINT` | the pitch law is `892/(n+1)` per rank against `0.85 × size`. v1 was under it on all five and rendered as one orange mass |
| S6 "two lanes running the full width", tickets thrown by a blade | the blade is at the **LEFT** and every ticket crosses the **whole panel** into a gate at the right | v1 dropped each ticket on a short arc from centre and let it stop — nothing crossed the frame, so the ratio the scene exists to show was invisible |
| the repo card at 300px | **s=1.62 (486×347)**, its GitHub header strip repainted from `#181717` to stone | `HOOK_PLATE` measures the largest **contiguous** bright region; the dark strip split the plate, so the card scored 10.6% at 18% of the panel by area |
| S3's four benches with their panes | panes 0.62 → 0.82, plus a full-width overhead parts conveyor **above** them | the conveyor was first added at `zIndex 26` under panes at `zIndex 40` and bought +0.17; moved above them it took BENCH to 9.30 |
| the WORK loop swings "a real swinging arm" | body lean + a deeper, faster nod, no drawn limb | the hand-drawn arm read as a **TAIL** on every sprite in the reel |

### Round 2 — Alex's four notes, and what each one actually was

**1 · "The video needs to start right when the VO starts, cut out the blank space."**
The reel opened with **0.53s of dead room tone** and every gate passed it, including
`verify_reel.VO_ONSET_0` at 0.000s. Cause: `silencedetect=-40dB` found a **−48 dB
blip** at raw 1.847s — a mouth click — and reported speech from there. The real
onset of "Meet" is raw **2.50s**. Only a 10ms RMS scan shows it:
`1.84s −48.5 · 1.86s −60.8 · … · 2.48s −69.7 · 2.50s −26.4`.
⭐ **`silencedetect` finds a THRESHOLD CROSSING, not a word.** For a lead or tail
trim, confirm with a 10ms RMS scan and cut to where the level goes *and stays*
above about −30 dB. Re-cut at 2.44; the VO is now 31.36s and the voice is at full
level by 0.04s. Every `L[]` constant and every scene-local beat was re-derived.

**2 · "The animation at 12 seconds isn't good enough, I can't tell what that is,
it needs to be completely redone to a better concept."**
S4 was a hexagonal core with twelve cable runs and beads flying both ways. It
**measured 13.93** and depicted nothing a viewer can name — a metric that rewards
"large bright objects travelling" is perfectly happy with abstract lights on
wires. ⭐ Replaced with **THE MEMORY BANK**: 18 labelled drawers, eight already
full from earlier runs, four agents at four visible jobs. One agent finishes and
slams a block INTO a drawer; the same block immediately comes back OUT to the
other three, who each visibly level up. Three cycles, three different depositors.
One sentence, no decoding.

**3 · "The animation at 24 seconds needs an actual concept, not a bunch of
sprites standing around bouncing."**
S7 gave eight sprites four ACTION LOOPS — which fixed *"they just stand there"*
from reel 107 and still had no EVENT. ⭐ **An action loop is not a scene; it is
what a sprite does while the scene happens around it.** Replaced with **THE
THROUGHPUT LINE**: work pours out of a chute at an accelerating rate, five
Claudes pass every ticket hand to hand across the full panel, and a DONE crate at
the foot of the now-empty spike fills and overflows. Throughput IS the payoff.
**PAYOFF 12.83 → 23.13**, the highest-scoring scene in the reel.

**4 · "A lot of the sfx are not good enough, it just sounds like video game
upgrade sounds."**
Countable, not a vibe: **24 of 41 cues came from one chiptune pack** (`c_1up`,
`c_coin`, `c_collect`, `c_grow`, `c_fanfare`, `c_powerbig`, `c_bump`, `c_clear`,
`c_stomp`, `c_hit`, `c_break`, `c_warp`, `c_boss`, `c_unlock`). Every one passed
`sfx_audit`, because that tool gates HISS, AIR, OVER-RING and SLAP and has no gate
for *"this is a Mario sound"*. ⭐ **The bank has to belong to the WORLD, not just
pass the gates.** Rebuilt on measured mechanical foley — `gear_shift` for a swarm
changing gear, `spotlight_snap` for a lamp, `can_bong` for a block into a metal
drawer, `knife_switch` for the breaker, `slate_whump` for a parcel into a crate,
`chair_knock` for a failing test, `bell_ring` for the overflow — plus the low
cinematic impacts that were already right. **Zero `c_*` cues remain**, and the
greppable gate is `grep -oE 'src: .c_[a-z0-9_]+' | wc -l → 0`.

### Round 3 — the hook rebuilt as a LIFT, and marks in five more scenes

**"The beginning hook scene needs to be completely reworked to be a lot more
interesting. Maybe just have one Claude sprite in the middle lifting weights,
super hierarchical, to show that he's the most powerful."**

The old hook was a 3am desk: a repo card, a terminal, a queue, a meter and a
hero, five objects competing across the frame. It measured 17.68 and it was
still a ROOM rather than an IMAGE — `feedback_hook_simplicity` says the bar
outright: **ONE dominant object, empty stage; striking = SCALE plus real brand
colour.** Replaced with **THE PLATFORM**: one Claude dead centre in a hard hat,
arms locked out, pressing a barbell.

⭐ **What keeps it from being a borrowed gym** — the failure that has now burned
three reels — is that the weights ARE the subject. The GitHub mark is cast into
one 344px plate at 176px, the Claude mark into the other, and
`ruvnet/ruflo ★68,132 MIT` is struck into the platform he is standing on. He is
not lifting "power"; he is lifting the repo, and when it lets go at 0.70s the
swarm is what comes out of it — the same hand-off into S1 the old hook had.

Three things this cost, each a rule:

1. **The rig already had arms and I had not read it.** `SlopKit.Mascot` draws two
   26×26 clay arm rects, and `cheer` both raises them (`armY = 86 − cheer*26`)
   and rotates them out. v1 floated a bar over a normal standing mascot and it
   read as a man *standing under* two discs. The only drawn geometry is two
   FOREARMS from his own arm rects up to the bar — not the reel-108 mistake,
   which was a limb hung off the body edge swinging at nothing.
2. **⛔⛔ `HOOK_PLATE` MEASURES CONTIGUITY, AND IT CAUGHT ME TWICE.** The barbell
   is 22% of the panel by area and scored **8.4%**, because the shaft was painted
   BEFORE the discs, so each disc's 11px dark border cut across it and the gate
   saw one cream ring. Drawing the shaft LAST bridges the two rings: **8.4% →
   18.7%** with no size change. Same trap as the repo card's black header strip
   two rounds earlier.
3. **A khaki hall cannot be bright and saturated at once.** Lifting the room to
   reach the ≥140 frame-0 law took saturation to 17.9%, which is the ten-reel
   washout in one edit. The brightness comes from a lit **clerestory** with warm
   gold panes instead — high windows over a lifting hall — plus a floor bounce
   that falls off, so the black point is untouched. **143.9 luma at p10 21.9.**

**"Try to have logos wherever possible."** Five scenes gained real marks, and
every one of them is something the source names:
- **S0** GitHub and Claude cast into the weight plates at 176px, plus a rack wall
  carrying `github`, `npm`, `claude` and `anthropic` — a GitHub repo, installed
  with npx, MIT licensed, running Claude.
- **S2** the **npm** mark on the command plate, because `npx ruflo init` is an npm
  install (fetched in brand red `#CB3837` on build day).
- **S3** the Claude mark cast into the workshop wall at 190px.
- **S4** a `RUFLO MEMORY` mark plate on the bank's own header.
- **S6** ⭐ the **provider rack**: `Claude · GPT · Gemini · Cohere · Ollama`, which
  is the README's multi-provider line verbatim. ⛔ **Cohere 404s on the Simple
  Icons CDN, so it ships as a WORDMARK and never a faked glyph.**
- **S7** the Claude mark over the workstation.

### Round 4 — the lift made obvious, and the plates made into weights

**"Make it more obvious he's lifting the weight, make it more weight coloured,
and have steam coming out of his ears."**

Three separate defects, three fixes:

1. **The lift was a nudge, not a travel.** He started at 0.86 of lockout and
   drove the last 0.14 — a state change the eye cannot read as an action. He now
   starts genuinely short at **0.55** with the bar low and bent, and covers the
   remaining 45% in six frames, so the lift is a DISTANCE. Added with it: **bar
   whip** (a loaded bar never sits straight — it bends and oscillates, and it is
   the clearest "this is heavy" signal in the image), plates that **wobble** on
   their sleeves, a bigger tremble, and **chalk puffing off the hands** on the
   drive. HOOK **15.18 → 17.12**, hold 17%.
2. **"More weight coloured" is really about STRUCTURE, not hue.** A cream circle
   reads as a disc. What makes a plate read as a WEIGHT is a **thick dark cast
   rim**, **six grip holes**, a machined hub and a **stamped face** — so the
   plates got all four, in charcoal and oxblood, and the stamp carries the number
   this thing is genuinely heavy with: `★68,132` on one and `MIT` on the other.
   ⛔ The faces stay bone because they are also the reel's claim plate, and every
   dark element is sized so the bright annulus survives.
3. **Steam out of the ears** — two jets, nine puffs each, on their own phases,
   drifting outward and up and fading as they expand, scaled by strain. It is the
   one gag that says EFFORT with no narration, it reads at thumbnail size, and it
   gives the head — the stillest part of a pressing sprite — something
   continuously moving.

⛔⛔ **AND THE MARK WENT ON THE HUB, WHICH IS WHERE THE SHAFT IS PAINTED.** Two
correct fixes fighting each other: the shaft must be drawn LAST to keep the claim
plate contiguous, and the hub is at the plate centre, so the marks were
half-covered on every frame. They moved to the **upper face** on their own white
tiles at 104px.

⛔ Both frame-0 gates are carried by the barbell, so its size is not a taste
call: at D=344 the encoded file read **139.4** luma and **16.7%** plate, both just
short. D=372 fixed the pair in one edit, because both scale with the plate's area.

### Round 5 — why the lift still did not read, measured

**"It's still not that clear that it's lifting weights, and I don't really like
that it explodes, it doesn't make sense for this hook scene either."**

The first note had a cause I could measure rather than argue about:

```
plate 372px      = 47% of the panel HEIGHT and 113% of the lifter's whole body
a real 45cm plate against a 175cm lifter is 26% of his height  ->  4.3x too big
barbell overall  = 982px = 97% of the panel WIDTH  ->  no air on either side
```

A barbell is recognised by its **silhouette** — a long shaft, a weight at each
end, a person under it, and space around the whole thing. At 97% of the panel
width that silhouette can never form, and the plates were so large they read as
two machine wheels rather than as weights. On top of it the **VALUE was
backwards**: a cream bar on a lit hall has no silhouette at all, where every
readable reference image is a DARK bar against something brighter behind it.

⭐⭐⭐ **THE ROOT CAUSE: A GATE CARRIED BY THE WRONG OBJECT DEFORMS THAT OBJECT.**
The barbell was carrying BOTH frame-0 gates — `HOOK_LUMA >= 140` and
`HOOK_PLATE >= 18%` — which is *why* it had to be huge and pale. Moving them onto
a **MEET BOARD** on the wall behind him (a lifting hall has one, and it is where
the receipts belong anyway) freed the weights to be what they should have been
all along: **152px cast-iron plates on a 560px shaft, 70% of the panel width
with air on both sides, dark against a lit board.**

⛔⛔ And the board immediately hit the same contiguity trap in a new form: both it
and the shared `HookHeader` pill are cream, the board's top edge sat at y64 and
the pill owns panel y0..96, so `HOOK_PLATE` found ONE region touching y0 and
discounted the whole thing as chassis — **26.3% reported, none of it usable.** A
dark truss rail between them separates the two: **19.0% at y141.**

**The explosion is gone.** It was a link I forced — nothing about lifting a weight
makes it detonate, and the reel already had a burst elsewhere. What the next line
actually says is *"60 agents working together simultaneously"*, so the last beat
of the hook is now **four more Claudes running in to take the bar with him**, two
per side, spread across the whole scene, and the shaft **GROWS by 58px each time
one joins**. Five of them under one bar cuts straight into sixty on the floor.
The hand-off is the sentence itself rather than a special effect.
⛔ Growth is capped at 58px a join because at 90 the shaft outgrew the panel by
the fourth one and the plates left the frame — a bar with no ends is a pole.
⛔ And the joiners were at 242 pitch for 288px bodies, under
`spacing >= 0.85 * size`; they merged into one mass at the end of the shot, the
same law the swarm ranks obey.

### The gates, measured on the DELIVERED `yuv420p` file

```
motion median 14.35 · 0/10 scenes under bar · 0 dead runs anywhere
  HOOK 14.35 · SWARM 15.33 · NAME 16.12 · BENCH 10.02 · BANK 9.72
  METER 9.78 · ROUTER 17.02 · PAYOFF 22.74 · STARS 11.13 · CTA 13.55
weakest scene: BANK 9.72
⭐ HOOK fell 17.12 -> 14.35 when the explosion came out. That is a trade taken on
purpose: the shatter was cheap motion for a beat that did not mean anything, and
14.35 is still well over the 9.00 bar with zero dead frames.

HOOK_LUMA   143.4   (bar 140, frame 0 only)
BODY_SAT     58.0%  (bar 34% — 94 AGENCY, the reference, is 57.9%)
BODY_BLACK   p10 21.9 (bar <=35 — AGENCY is 25.0)
HOOK_PLATE   19.0% at y141  (bar 18%)
BODY_LUMA    89.3   (target 70-105)

verify_reel  7/8, all blocking checks pass · ENDS_TIGHT 0.02s dead
sfx_audit    clean — no hiss beds, no air swells, no named air, no slaps
             40 cues / 31.36s = 1.28 per second, ZERO from the chiptune pack
glow grep 0 · banned-claim grep 0 · chiptune grep 0
delivered mp4 re-transcribed: 0 flubs survived
```

⭐ `BODY_SAT 59.7%` and `p10 21.9` are the first numbers since 94 AGENCY to beat
the reel the look gate was calibrated on.
