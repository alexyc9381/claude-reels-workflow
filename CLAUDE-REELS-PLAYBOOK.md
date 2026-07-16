# Claude Reels — Production Playbook

> **How to use this doc:** it is a **linear pipeline of 5 phases**. Each phase ends in a **GATE**.
> You may not enter the next phase until the gate passes. Run it top to bottom, every reel, no exceptions.
>
> ```
> PHASE A  DECIDE   what to build   → GATE A: script SHIPs (all six ≥8, 0 blockers)
> PHASE B  DESIGN   how it looks    → GATE B: board survives a fresh critic
> PHASE C  BUILD    the wireframe   → GATE C: compiles, R1 pacing passes, nothing clips
> PHASE D  OVERHAUL make it good    → GATE D: hook interrupt + every scene premium
> PHASE E  SHIP     deliver         → GATE E: encode + both destinations + caption
> ```

## ⛔ The one thing to understand before anything else

**The leverage is in what you refuse to build.** Reel 38 VAULT ran through this exact build pipeline with
this exact animation quality and averaged **5 seconds**. Reel 52 CALLBACK needed almost no revision. The
difference was not craft, it was that CALLBACK's premise was **gated to death first** (15 of 16 candidate
premises were killed before a single frame was drawn), and a premise that survives the gate hands you the
scenes for free: it has a villain, a universal input, and a legible artifact, so the animation has something
to hold onto.

**A weak premise cannot be rescued in PHASE D.** If you are revising endlessly, you failed PHASE A.

---

# PHASE A — DECIDE WHAT TO BUILD (highest leverage; ~most of the value)

> Nothing here touches code. Output = a script that passed a 3-critic gate.
> Everything in this phase is enforced by the memory brain (`memory/script-factory-pipeline.md` is the master).

## A1. Source the premise (3 doors only) → `memory/outlier-engine.md`
Topics enter through exactly three doors. **A brainstormed topic with no comp attached is BANNED** (that was VAULT's door).

| Door | What | Rule |
|---|---|---|
| **A — found comp** | An outlier: **≤14 days old AND ≥2× that creator's own median** | Run `~/Downloads/outlier-engine/scan.py` (YouTube). IG lane = the DOM scrape in `memory/outlier-transcript-tooling.md`. |
| **B — Alex sends one** | He hands you a video/hook | Transcribe it first; it becomes the `structure_comp`. No velocity check needed. |
| **C — backlog** | A queued idea | ⛔ DEMOTED: must ALSO attach outlier evidence + pass the harsh audience read. |

**Every candidate needs a one-sentence TRANSFER HYPOTHESIS:** why it overperformed AND why that mechanism
survives onto a faceless mascot reel. **Charisma / trend-audio / news-reaction wins do NOT transfer → reject.**

## ⛔ A1.5 — THE TWO PRE-CHECKS. RUN THESE IN THE SOURCING ROW, BEFORE ANY SCORECARD EXISTS.
*Added 2026-07-15. The reel-59 sweep sent 4 candidates (18.84x / 11.06x / 6.81x / 5.82x) through a full 3-critic gate
and killed all 4 — every one on something these two questions catch in about a minute. Cost: ~350k tokens to learn
what a 10-minute check knew. **A candidate that fails a pre-check never gets a scorecard.***

**1. THE RECAST PRE-CHECK — "does Claude actually do this, and will it?"**
Take the comp's **FIRST prompt** (not its hook — its first actual instruction) and ask: does it name a capability
**Claude has**, and will Claude **actually run it**? If the wow lives in a capability Claude lacks or refuses, there
is no reel, and no amount of clever recasting invents one.
- ⛔ **PHOTO** (18.84x, the biggest multiple we have ever sourced) died here: its first prompt asks the model to
  identify a person from their photo. **Claude declines by design, and Anthropic's Usage Policy independently
  prohibits facial recognition / tracking individuals.** It fails at step one, so the proof shot could only ever be
  faked — the first premise we have killed for being **UNCAPTURABLE** rather than unpersuasive. (Its CTA was also
  self-defeating: a face-finding prompt pack DMed to strangers works on *anyone's* face, i.e. it IS the harm.)
- ⛔ **SCROLL** (6.81x) died here: the wow is interpolating 2 stills into ~300 frames = **a video-gen model. Claude
  has no image or video gen.** Claude's only share was step 4's canvas boilerplate — the least magical beat AND the
  one that triggers the −3.
- The general form: **the number is real, the mechanism is welded to something we do not have.** Same class of error
  as accepting an on-camera-charisma win.

**2. THE R10 PRE-CHECK — name the year, in the sourcing row.**
Write the year the audience first saw the reveal **next to the comp's multiple, before scoring anything.**
⛔ **FOREMAN** and **HUMAN** both die here. Rule 10 in §A2 is the full test; this is just running it FIRST, where it
is free, instead of after three critic rounds.

⭐ **THE RULE THAT TIES BOTH TOGETHER — a comp's number vouches ONLY for the reveal the comp actually delivers.**
A fresh Door-A comp is freshness proof (§A2 rule 10), but *only for what it shipped*. Three of the reel-59 four
delivered a reveal we delete before we start: FOREMAN keeps raycfu's hook and amputates his payload (the
copy-pasteable build — forbidden by GATE THE HOW), then swaps his serialization engine for "Comment FOREMAN."
**A comp's number tells you an audience reacted. It does not tell you they reacted to the part you can keep.**

⭐ **AND: a fresh comp on a STALE reveal means the audience reacted to something OTHER than novelty. Ask what,
before you credit the multiple.** HUMAN's 14,142 comments were people raising a hand for contraband. PHOTO's 16:1
comment-to-share ratio was fear, not utility. **Transgression is not novelty; recognition is not discovery.**

⛔ **CITE THE COMP OR THE DOOR IS FAKE.** The factory log's Stage-0 line must name the **actual video + its views +
its multiple + its age**. A door letter with no comp behind it is a label, not a door.
- ⛔ **`script-style-replicator/topic-ideas/*.md` ARE NOT DOOR A.** Those files are self-graded HYPOTHESES (their own
  headers say so) — brainstorms wearing a creator's name. **They are the BANNED door.** They may only enter via
  **Door C**: attach real outlier evidence first, or they do not enter.
- ⛔ **An ARENA win is not a comp.** The arena ranks candidates against *each other*; a field of comp-less
  hypotheses still produces a confident winner. Rank has no evidentiary value — only the comp does.

> **Worked failure — reel 59 SKETCH.** Sourced from `topic-ideas/rileybrown.md` (header: *"HYPOTHESES"*), crowned by
> A3's arena 8.5 unanimous, logged by me as `door:A/replicator`. **It had no comp and never did.** The arena's
> confidence is what made the mislabel feel earned. It burned three GATE A rounds before Alex killed it on instinct.
> This is VAULT's door — the door that produced the 5s-average failure this entire kill-gate exists because of.

⛔ **Toolchain:** IG lane = **`outlier-engine/ig_scan.py`** (the private JSON API, **no browser**):
```bash
python3 ig_scan.py --json runs/ig_<date>.json cindiezhu raycfu
```
⛔ The **DOM-scroll scraper is RETIRED** — it silently mispaired every view count (tile spans are `[likes, comments, views]`)
and reported **zero** reels for a creator whose grid simply refused to hydrate, while the API returned his 135 videos and
4 comps. YouTube still hard-requires a PO token (run the bgutil server first). Full method + the transcript gotchas:
`memory/outlier-transcript-tooling.md`.

⭐ **Read the 14-day CONTEXT block, not just the winners.** `ig_scan.py` prints every recent reel so you can tell a **hot
topic** from a **hot creator**: a 6.8x hit surrounded by seven sub-median reels means the *topic* carried it (transfer
signal). A 6x hit with **15 comments** means there is no comment-gate — it's a news roundup, which does NOT transfer.

## A2. Kill-gate the premise → `memory/vault-reel-premise-autopsy.md` (the 9 rules, full text)
Run all 9 and **log pass/fail per rule with evidence.** Unlogged enforcement = no gate.

1. **FRAME-1 RECEIPT** — mock the artifact's screenshot. A stranger decodes it in 2s or KILL.
2. **CEREBRAL-PAYOFF (functional test)** — can the payoff be shown as an on-screen artifact **changing state in <2s, sound off**? Needs reading/explaining = KILL.
3. **INPUT-EXISTS** — the viewer already owns the input (a resume, photos, bills). Must assemble it first = KILL.
4. **ONE-BREATH RESTATE** — "you give it X (that you have) → it hands you Y (a noun you can screenshot)." ≤2 hops.
5. **PROOF-SHOT** — write the single shot that proves it. Generic text = unprovable = KILL.
6. **NO NEGATION** in the first breath; value noun by ~word 12.
7. **LEVER ROTATION** — read `memory/reel-lever-ledger.md` (last 2 entries), never memory. "none" is exempt.
8. **AUDIENCE-SIZE (computed, harsh reading binding)** — start 10; −2 per qualifier; −3 if it needs a business or dev tooling; −2 if the value noun isn't money/time/a screenshot-able thing. **<8 = Alex sign-off required.**
9. **FIRST-ORDER TASK** — it does a task with existing demand, pays NOW.
10. ⛔ **RERUN TEST (external staleness)** — *added after reel 59 SKETCH. Nothing downstream can catch this: GATE A has no novelty axis, so its six dimensions physically cannot fail a premise for being old. It dies HERE or it doesn't die.*
    **Name the year the audience first saw this exact REVEAL — from anyone, not from us.** (Rule 7 and the arena's "novelty vs shipped" both measure collision against *our* ledger. This measures it against *the feed*.) Reveal older than ~12 months = the hook's "no way" is a lie the viewer already caught, and no rewrite fixes it. **KILL.**
    - **The tell: a freshness note that passes via a caveat** — "genuinely frontier *and rarely shown end-to-end*", "everyone's seen X *but nobody does it with Y*". The caveat is doing all the work, which means the premise is old.
    - **Then ask where the wow rides.** Stale half carries the wow + caveat rides an afterthought beat = KILL. If you can rebuild so **the WOW *is* the caveat**, that is a different premise: re-enter at A1 with its own comp.

> **Worked kill — reel 59 SKETCH (2026-07-15).** "Photo of a napkin sketch → working app." Its topic file self-graded
> *"genuinely frontier and rarely shown end-to-end"* and put the weight on the hook — but sketch→app was **GPT-4V's
> March 2023 launch demo**, then tldraw "make it real" that November. The wow rode the 3-year-old half; the fresh
> half (deploy → a live link) was the afterthought. Three GATE A rounds kept reporting *"the hook has nothing left to
> reveal"* and I kept rewriting wording. **The critics were describing the symptom; the premise was the disease.**

> **The audience rule is the one that kills most things, and it's the one people cheat.** When two readings
> exist, **the harsher is binding.** CALLBACK cleared at 8 with no override; FOREMAN needed a builder-lane
> override at 6; BRAND capped at 6-7. The clean-8 is the one that shipped without a fight.

## A3. ARENA — rank candidates head-to-head (⚠️ UNVALIDATED: no shipped reel has come through it yet)
Never build the first idea that survives. Draft the top N candidates and run a **multi-judge tournament**:
each judge scores **all** candidates on 6 dimensions and **ranks them against each other** (forced comparison,
not isolated scoring), then a head judge aggregates by average rank + score.

- Judges: **cold-viewer** (would a normal scroller stop/believe/want it?), **factory-gate** (kill-rules, collisions), **growth-strategist** (TAM, save/share/comment intent, novelty vs shipped).
- ⛔ **The discriminator that decided reel 52:** *the artifact must BE the payoff.* Every losing script ended on a
  **proposition** (a score going DOWN, a picture of a badge, a subtraction, a counter at zero). The winner ended
  holding **a thing you want and can send to someone.**
- Reusable: model on the arena runs in this repo's history; the pattern is 8 drafts → 3 judges → head judge.

⛔ **THE ARENA ONLY RANKS. IT NEVER ADMITS.** Run it **after** A1 (comp cited) and A2 (all 10 rules logged) — never
as a way in. It scores candidates *relative to each other*, so a field of comp-less brainstorms still yields a
confident unanimous winner, and that confidence is **indistinguishable from evidence**. Rank is not a comp and it is
not a kill-gate pass.
> **Both of A3's shipped-evidence data points are strikes, not wins:**
> 1. **Reel 59 SKETCH** — arena crowned it **8.5 unanimous**; it had no comp, was 3 years stale, and burned 3 GATE A
>    rounds. Its trophy is precisely what made a Door-A mislabel feel earned.
> 2. **The same run** — the arena's winner then failed GATE A on a hidden audience qualifier, a 3rd hop, and four
>    unbacked claims. The judges compared **premises**; the gate **read the script**.
> The rule both point at: an arena verdict earns a candidate a **turn at the gate, nothing more.**

## A4. Route to a creator + respect the lane ceilings → `memory/creator-lane-ceilings.md`
Match the topic's shape to the creator whose proven formula fits (`script-style-replicator/CREATOR-MATRIX.md`),
then load `creators/<name>-dna.md` (§5 phrase bank) + `teardowns/<name>.md`.

⛔ **Arena-confirmed ceilings (do not fight these):**
- **THE FORMULA THAT WINS:** *point Claude at a thing anyone already has → a real artifact builds itself → hand over a shareable link.* Universal input, **additive** artifact, mute-legible <2s.
- **raycfu** caps on **BREADTH** — the insider-gap hook only fires on someone who already holds the wrong belief, so the ceiling is the in-group. **Mid-funnel only, never the reach play.**
- **nicksaraev** caps on **BELIEVABILITY** — his receipts are **subtractive** (a cancelled bill) and his claims are the most farmed sentences in AI content. **Spice, not spine:** borrow the number density, don't build the premise on the dollar sign.
- ⛔ **When replicating any creator: keep their STRUCTURE + number-density, STRIP their on-camera verbal tics.** (Nick's doubled "Clean. Actually clean.", vague words like "vibe"). They read as filler in a faceless VO.

## A5. Draft the script → `memory/script-factory-pipeline.md` Stage 3
- Words ≤ `target_seconds × 4.3`. Value noun by ~word 12. Zero jargon (12-year-old test). **Zero em dashes.** CTA at the very end, **hard cut on the keyword**.
- **GATE THE HOW** (`memory/gate-the-how-in-scripts.md`) — sell the RESULT + name the ARTIFACT; the copy-pasteable how lives behind the comment. Self-check: *could a viewer reproduce this without commenting?* Yes = re-gate.
- **SPECIFICITY** (`memory/specificity-effect.md`) — anchor every claim with an exact figure, a time dimension, **or a named/term-branded concept** ("Google's XYZ formula" counts). Never narrate before/after text the screen already shows.
- **DOPAMINE LADDER** (`memory/dopamine-ladder.md`) — L1 stun-gun claim, L2 loop by ~word 12, L3 held, **L4 NON-OBVIOUS payoff**.
- **HOOKS** — draft 10+, score against the 10-check HOOK GATE (`memory/claude-reel-hook-library.md`), keep the top 2-3 across ≥2 families.
- **Name the roles explicitly.** "the recruiter" appearing from nowhere is vague; "you build four Claude agents… Agent one, the Diagnoser" is not.

## ✅ GATE A — the 3-critic adversarial script gate
Run `script-factory/script-gate-template.js` via the Workflow tool. **Fresh contexts, no drafting history.**

| Critic | Owns | Gets |
|---|---|---|
| RULES LOGGER | gate-integrity, concreteness | script + factory log + full rule texts |
| COLD VIEWER | hook, believability, topic-breadth | **the script ONLY** (cold) |
| COMP FIDELITY | structure-fidelity | script + the structure_comp beat map |

**SHIP BAR: all six ≥8 + zero blockers + zero Stage-1 FAILs.** A logged Alex-override may pass a sub-8 dimension,
but it must be logged, never invisible. Re-runs: any hook or beat-order change forces a full 3-critic re-run.

⛔ **RE-GRADE THE HOOK YOU ACTUALLY SHIP.** If Alex overrides the hook, **every hook-dependent rule must be re-run
against the NEW hook** — R6 (no negation / value noun by ~word 12), L1, L2. *FOREMAN's log carries `R6: PASS — value
noun by ~word 10`, graded on the direct-promise line. Alex then picked raycfu's verbatim "Most people don't realize…"
hook, which warms up before its value noun. **The gate passed a hook the reel does not use**, and nobody noticed for
3 days.* An override swaps the artifact; it does not inherit the old artifact's grades.

⛔ **AN OVERRIDE MAY NOT MAKE A PENALTY CONDITIONAL.** *FOREMAN's log reached audience "6-7" by writing "−3 **if
read as** pure dev tooling" — holding the fatal penalty in suspense. The independent sweep scored the same premise
**3**, and the log itself records that. Harsh is binding: if the −3 is arguable, it applies.* Write the harsh number,
then override it out loud if you must — never arrive at a passing number by leaving the worst reading unresolved.

⛔ **A GATE PASS EXPIRES WHEN A RULE IS ADDED.** Rules are written *because* something got through. A script gated
before rule N exists has never faced rule N, and its old scorecard is not evidence against it — *"it already passed
GATE A at 8.5·8·8·8.5·6·9"* is the SKETCH symptom exactly, since GATE A has no novelty axis and a three-year-old
premise can score 8s across the board. **Re-run every unbuilt gated script against any newly added kill-rule.**

**No complete factory log (`memory/reels/<name>-factory-log.md`) = no recording.**

---

# PHASE B — DESIGN IT (storyboard before visuals) → `memory/reel-storyboard-process.md`

> **No approved storyboard = no visual build.** This exists because we used to author scenes, render, and only
> then discover the metaphor was boring/repeated/clipping. Design decisions belong on paper where they're cheap.

## B1. Beat-map + one card per scene
Split the final VO by its `L[]` onsets. One scene = one VO line = one idea. Per card:
**LINE+DUR · THE ONE TAKEAWAY · STORY metaphor + WHY (+ ≥1 rejected alternative) · PROOF (real UI + the number)
· ESCALATION · GAG · TRANSITION+SFX · MUTE CHECK · HOOK→NEXT.**
The **reasoning** is the deliverable. If you can't name the one takeaway, the scene is unfocused.

## B2. Lock the invariants before authoring (this is what makes N parallel agents cohere)
- ⛔ **NUMBER SPINE** — one set of numbers, identical everywhere. (CALLBACK: 41→58→72→96 · "Responsible for sales" → "Grew revenue 34% ($1.2M)" · $200 · 4 agents · AUTO-REJECTED→INTERVIEW.)
- ⛔ **ONE HERO ARTIFACT** — name the single <2s mute-legible payoff and protect it. (CALLBACK: the bullet reflow + the stamp flip. The % gauge is *decoration* — it's Claude grading its own homework, so it may never be the hero.)
- ⛔ **ONE knockoff brand** for the whole reel (CALLBACK: TALENTSIFT). Two names = continuity break.
- ⛔ **CAST at storyboard time** — the villain, the hero costumes, the pop-culture parody cameos.
- ⛔ **DISTINCT base object per scene** — list them; two scenes sharing a hero object = redesign.

## ⛔ B3. THE BOARD IS VOID IF THE FORMAT OR THE VO CHANGES
If the chassis/format changes, or the delivered VO differs from the paper script (different beat count, merged
beats), **the storyboard is void and GATE B re-runs.** Do not re-stage inline and feed agents from a broken board.
*(Reel 52 walked straight through this hole: the approved board was dual-screen and timed to a 9-beat script; the
build was single-panel on an 8-beat VO. The scenes came out well, but that was luck, not process.)*

## ✅ GATE B — a fresh adversarial critic must fail to break it
Feed the whole board to a **fresh-context** critic: *Is it one story? Plot the intensity curve 1-N — does it RISE
to a peak near the end or sag? Where exactly would a viewer swipe? Which scene is weakest/least funny? Do two
scenes share a base object? Is the number spine identical? Does the villain LOSE only at the peak?*
**Rewrite the flagged scenes and re-run.** Loop until every scene earns its place.

> Real example (reel 52): the first board was rejected — S1/S2 were *the same shot twice*, the payoff was spent at
> 3.5s so the villain lost eight times, curve `9→8→6.5→6.5→8→8.5→6→9→8` = *"the exact profile of a reel that dies
> at 12s."* All 9 scenes were rewritten **before any code existed.** That is why the final scenes have distinct
> settings (operating theatre → noir alley → press room → boxing gym → strip mall) instead of one table reused.

---

# PHASE C — BUILD THE WIREFRAME

> Set `V=~/Downloads/matchtern-longform/video` and `FF=$V/../tools/node_modules/ffmpeg-static/ffmpeg`.

## C1. Record the VO
Alex records straight through on a phone → `.m4a` in `~/Downloads`. He says **"cut cut"** to kill a flubbed take
and redoes the line. ⛔ Find it with a glob (`ls ~/Downloads/*.m4a`) — displayed times contain U+202F.
⛔ **Transcribe the m4a FULLY** — it's his real VO, not instructions (`memory/alex-vo-recordings.md`).

```bash
$FF -y -i src.m4a -ar 48000 -ac 1 vo48.wav      # editing copy
$FF -y -i src.m4a -ar 16000 -ac 1 vo16.wav      # for whisper
python3 /tmp/tx.py vo16.wav base.en words.json
```

## C2. Splice out the flubs — ⛔ CUT INSIDE SILENCE, NEVER ON WORD TIMES
```bash
$FF -i vo48.wav -af silencedetect=noise=-33dB:d=0.18 -f null - 2>&1 | grep silence_
$FF -y -i vo48.wav -af "aselect='between(t,A,B)+between(t,C,D)',asetpts=N/SR/TB,\
highpass=f=75,alimiter=level_in=1:level_out=1:limit=0.93,loudnorm=I=-16:TP=-1.5:LRA=11" \
-ar 48000 -ac 1 -sample_fmt s16 clean_1x.wav
```
> Whisper times drift around flubs. On reel 52, cutting in detected silence instead of on word times moved the
> hook from **4.6 → 4.2 wps — an R1 fail into a pass.** This step is not cosmetic.

### ⛔ TIGHTEN THE VO. ALWAYS. (Alex, standing)
The VO must be **tight** — no lead-in, no dead air, no drifting pauses. Non-negotiable:
- **Leading silence → 0.00s.** `L[0] = 0.0`; his first word is frame 1. (Reel 52 arrived with 1.06s of lead.)
- **Cap every mid gap ≥0.32s down to ~0.22s.** Reel 52 had 10 of them, worst 1.26s; trimming recovered **3.29s**.
- Re-measure after trimming: tightening raises words-per-second, so **R1 may now fail** and the tempo must come
  DOWN (reel 52: ×1.10 → ×1.05). Tight ≠ fast. Tight means no silence; R1 still governs speed.

## C3. Pacing → ⛔ GATE: R1
Default is **×1.10** (`memory/reel-vo-pacing.md`). But measure first — **R1 is binding:**

- **Hook window (0-10s) ≤ 4.0 wps** · **ANY 5s window > 4.5 wps = reduce the speedup or re-record.**
- Anchor: CLONE = 3.96 wps overall.

**Speed is piecewise, not global.** Protect any line Alex flags as a key moment, and protect the hook.
> Reel 52: hook + "so you build four Claude agents" held at **1.0×**; body at **×1.05** (1.10 failed at 4.6).
> Result: worst window 4.4, overall 3.93. When gap-trimming tightens density, the tempo must come DOWN.

## C4. Captions (drift-proof) → `memory/caption-sync-gate.md`
1. Define **CANON** = the corrected caption text (fix whisper mishears: "cloud"→"Claude", "week"→"weak", brand words).
2. Align CANON → whisper word times with `difflib.SequenceMatcher`, borrowing each word's start/end.
3. **If tempo was uniform**, divide times by the factor. **If tempo was piecewise, transcribe the FINAL wav and align to it** (self-consistent, no division assumption).
4. Write `$V/src/data/words_<reel>.json` = `[{start,end,word}]` (leading space on `word`).
5. Never end a caption line on a dangling word (i/a/the/to/of/and/you). **Never ship raw whisper text.**

## C5. Timeline
`L[]` = the onset of each beat's **first word**, read from the caption JSON by **pattern-matching the beat opener**
(never hardcoded indices — they drift). `CUT` = last word end + ~0.1s. `durationInFrames = round(CUT*30)` in `Root.tsx`.
⛔ Re-derive `L`, `CUT`, **and `durationInFrames` together** every time the VO changes, or you ship dead air.

## C6. Clone the chassis + author scenes → `memory/reel-clone-chassis-verbatim.md`
⛔ **Clone the closest existing reel; chrome (captions/progress-bar/mascot/fonts) stays byte-identical. Swap only scene bodies.**

| Style | Chassis | Use for |
|---|---|---|
| **Cinematic Blueprint** (default house style) | `ClaudeFactoryReel.tsx` / `GptSolReel.tsx` | most reels; **always** for credibility-first / money / serious topics |
| **Game-World Remake** | reel 51 SKILLS | listicle / count-up, playful broad-consumer |

> ## ⛔⛔ NEVER BUILD DUAL-SCREEN. EVER.
> (Alex, reel 52, absolute.) **ONE framed dark panel, always.** Do not clone `ClaudeImprintReel.tsx` or any
> split/stacked top-story-over-bottom-UI layout, and do not let a memory note or an old reel talk you into it.
> Two panels halve the hero, halve the type size, and read as a diagram instead of a scene. If a premise seems
> to "need" a second panel, it doesn't: put the story in the panel and the receipt **inside** the same scene.

**Author scenes in ONE parallel Workflow, one agent per scene, each with the hard contract** (see PHASE C gotchas
+ the locked invariants from B2). This is why 9 independent agents produce a coherent reel.

## ⛔ C7. The gotchas that WILL bite you → `memory/reel-build-gotchas.md`
1. **Scene coords are PANEL-LOCAL 0…792**, not screen 0…1920. `Panel` is `left:34 right:34 top:384 height:792 overflow:hidden`. Any `top:` > ~792 is **clipped and invisible**. Usable band ≈ 210…780. *(The CTA scene is the exception — it mounts outside the Panel and uses screen coords.)*
2. **`over(f, start, dur)` takes FRAMES.** `over(lf, 6.6, fr(0.7))` = start 6.6 *frames*. Always `over(lf, fr(6.6), fr(0.7))`.
3. **Renaming spliced components:** agents often prefix code with a comment line, so `re.sub(r'^const X', ...)` **without `re.M` silently fails** and you ship a phantom reference. Always verify every mounted component resolves.
4. **Inherited branding:** a cloned chassis carries the old reel's chip/keyword ("GPT-5.6 SOL · LIVE", `kw="FACTORY"`). Grep and kill.
5. **Headers must not touch the edges** — side padding + auto-fit the font size to the title length.

## ✅ GATE C
`npx remotion still <Reel> out/f.png --frame=N` **per beat** (compile + visual check) → then
`npx remotion render <Reel> out/raw.mp4 --codec h264`. Verify: compiles · R1 passes · nothing clips ·
duration == CUT · every mounted component resolves · zero em dashes.

---

# PHASE D — OVERHAUL (⛔ the first render is a WIREFRAME, never delivered) → `memory/reel-overhaul-stage.md`

The first render gets structure right (beats, VO sync, captions) and is always visually under-baked with a
placeholder hook. **Do not wait to be asked.** Reusable: `script-factory/overhaul-workflow-template.js`.

```bash
# grid one frame per beat, then hand it to a FRESH critic
for t in 0.4 2 4.4 6.4 9.6 13.5 20 27 32.6 37.5 45.6; do
  $FF -y -ss $t -i out/raw.mp4 -frames:v 1 out/grid/$t.jpg; done
```

- **GATE D-A — HOOK PATTERN-INTERRUPT (0-5s).** Something physically surprising by ~frame 15-30 (a crash/slam/stamp, a POV rush, a character invasion, a fake-out). Mute-readable <2s, escalating by ~3s, no dead frames.
  ⛔ **Auto-fail openers:** title fade-in · slow zoom on a static graphic · a lone graphic on an empty panel · a dead first 0.5s.
- **GATE D-B — VISUAL OVERHAUL (every scene).** Vibrant layered backgrounds (never flat) · *more going on* (multiple animated elements) · shaded premium props + real device frames · pop-culture comment-bait woven in.
  ⛔ **NO emoji pictographs** as on-screen content (draw shaded shapes) · **NO low-opacity content** (solid + readable; low opacity only for background depth) · **NO overlapping components** · **ONE cinematic hero per scene** — when a reel feels "off", the fix is **declutter + polish**, never *add more*.

**Loop:** grid → critic → overhaul workflow → splice → re-render → re-grid. Until D-A and D-B pass everywhere.

## D2. SOUND DESIGN PASS → `memory/reel-sfx-pass.md`
> Alex, reel 52: *"I need to see better SFX sound design throughout to take it one level higher."*
> This is a **design pass, not a cue-sprinkle**. Reel 52 went 9 cues → 82 and it is the difference.

### The method (run it, don't wing it)
1. **INVENTORY FIRST.** `ls public/sfx/` + `find ~/Downloads/sfx-library`. Copy anything missing into `public/sfx/`.
   **Grep for the specific sounds the action needs** before designing — reel 52 needed zip, suspense and crying, and **none of the three existed anywhere.**
2. **SYNTHESIZE WHAT DOESN'T EXIST** (numpy, zero copyright — see `video/tools/gen_missing_sfx.py`).
   Proven recipes: a **zipline** = descending whine + rattling band-passed noise + a doppler drop · a **suspense bed** = low drone + tremolo + an *accelerating heartbeat* (⛔ NOT a riser) · a **cry** = descending pitch + sob wobble + 2nd harmonic.
3. **ONE DESIGNER AGENT PER SCENE** (parallel Workflow). Give each: the scene's **on-screen physical action with relative timings**, the absolute scene window, the **exact filename list**, and the volume bands. It returns `{at, src, v, dur, why}` with **absolute** times.
4. ⛔ **VALIDATE BEFORE SPLICING** — agents hallucinate filenames (reel 52: `glitch_counter.wav`, real file is `.mp3`). Drop any cue whose file is missing, whose `at` is past the hard cut, or that adds a riser.
5. **Re-render, then measure**: peak < 1.0, and transient density ~1-2.5/s (that reads as deliberate impacts, not popping).

### The rules the cues must obey
- ⛔ **SYNC TO THE PHYSICAL ACTION, NOT THE BEAT GRID.** A sound fires when an **object does something** (a stamp lands, a slug is struck, a glove connects). Silence is fine. Do not carpet the scene.
- ⛔ **LAYER THE HERO HIT, 3 DEEP: attack + low-end body + texture.** One thin pop is the #1 thing that makes a reel feel cheap. Reel 52 layers the stamp SLAM (impact+boom+thock), the press SLAM, punch 4, and the INTERVIEW flip.
- ⛔ **RISERS: HARD CAP 2 PER REEL** (Alex: *"don't have too many riser sound effects, it gets kind of annoying"*). One into the hook or first turn, one into the payoff. **This overrides the old "riser into every transition" rule** — Factory's chassis fires 7 and that is exactly the annoyance.
- **Volume bands (the VO is king):** UI clicks 0.13-0.18 · impacts 0.30-0.45 · ambience/crowd 0.10-0.16 · meme stingers 0.18-0.30.
- **~1-3 meme stingers** across the reel at sus/fail/shock beats, only where the action earns it (reel 52: `bruh` when the bot swats the paper airplane without looking; `huh` when the detective sees the answer key was a public take-one pad).
- **Give every visible action its sound** — a zip for a zipline, typing for letters being struck, a per-item click for each thing igniting.

## D3. MUSIC BED
- ⛔ **Check `~/Downloads/sfx-library/SOUNDTRACKS.md` first.** Commercial tracks burned into the export routinely get the reel **muted or reach-capped**; adding the same song natively in IG's audio picker is licensed AND counts as trending-audio signal. Prefer that unless Alex directs otherwise.
- ⛔ **CUT ON THE PHRASE ONSET, NEVER ON A ROUND NUMBER.** Detect the attack (peak, then walk back to ~12% of it) and cut there, so the music **lands on frame 0**. Reel 52 was cut at a round 8.0s and opened mid-decay of a dying note: a fragment, a gap, then the real phrase at 1.4s — which read as "the music takes too long to start" AND collided with the hook's slam 0.7s earlier.
- ⛔ **THE BED MUST BE AUDIBLE FROM FRAME 1.** IG autoplays; a thin first second makes the hook feel like it hasn't started.
- ⛔ **MEASURE THE BED, COMPUTE THE GAIN. DO NOT EYEBALL IT.** (I got this wrong twice on reel 52.) Songs swing 15x across a window, so a flat gain means inaudible at the start and deafening at the end.
  ```
  measure the bed's own per-second RMS  ->  gain[t] = target_effective[t] / bed_rms[t]
  target: ~0.015 early, rising to ~0.022 mid, ducked to ~0.011 at the CTA
  ```
  This **rides the gain AGAINST the song's own swell**: the perceived level rises gently while the raw track explodes.
- ⛔ **DUCK HARD FOR THE CTA** so the keyword is clear. Verify by measuring the composite at the keyword.
- **Pick the window that builds most** (scan per-second RMS for the best `end - start` delta), don't guess.
- No suitable bed? Synthesize an original with numpy (`video/tools/gen_piano_bed.py`) — zero copyright.

---

# PHASE E — SHIP

```bash
# E1 delivery encode (exact settings)
$FF -y -i out/raw.mp4 -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 18 -r 30 \
  -c:a aac -profile:a aac_low -b:a 256k -ar 48000 -ac 2 -movflags +faststart \
  ~/Downloads/Claude-Reels-Final/NN_Claude-fable5-<slug>.mp4

# E2 deliver to BOTH
cp ~/Downloads/Claude-Reels-Final/NN_*.mp4 \
  "$HOME/Library/CloudStorage/GoogleDrive-<acct>/My Drive/Claude Reels/"
```

- **E3 caption** (`memory/caption-structure.md`) — ⛔ opens with `Comment "<KEYWORD>"`, then `👇 READ BELOW`, then the value. CTA first, never buried.
- **E4 lead magnet** (`memory/lead-magnet-docs.md`) — the gated `.docx`. ⛔ It must **over-deliver vs the video** (video shows N → guide holds >N) and contain the genuinely non-obvious how, not the thing the VO already said.
- **E5 log it** — append to `memory/reel-lever-ledger.md` (reel #, keyword, opening lever, hook family, structure, date) and finish the factory log.
- **E6 POST-PUBLISH AUTOPSY (48-72h)** — append the real 3-second hold, avg watch time, comment count next to the predicted scorecard. **This is what makes the rubric learn.** A bad miss triggers a postmortem + new kill-rules.

---

# REFERENCE

## R1. The four pillars (what to copy to a new machine)
| # | What | Path | Why |
|---|---|---|---|
| 1 | Remotion project | `~/Downloads/matchtern-longform/` (`video/` + `tools/`) | the animation code + all reels |
| 2 | Toolchain | `tools/` + Node ≥20 + `pip3 install --user faster-whisper` | ffmpeg/ffprobe + STT |
| 3 | **The brain (`memory/`)** | `~/.claude/projects/-Users-alexchensmacmini-Downloads/memory/` | **every rule/gate. This is what makes it good.** |
| 4 | Delivery | `~/Downloads/Claude-Reels-Final/` + Drive `Claude Reels/` | where finished reels land |

## R2. Setup
```bash
cd matchtern-longform/video && npm install     # Remotion 4.0.370, React 19
cd ../tools && npm install                     # ffmpeg-static + ffprobe-static
pip3 install --user faster-whisper
```
- ffmpeg: `tools/node_modules/ffmpeg-static/ffmpeg` · ffprobe: `ffprobe-static/bin/darwin/arm64/ffprobe` (⚠️ the glob can resolve to the linux binary — pick darwin/arm64).
- `/tmp/tx.py` = the faster-whisper word-timestamp script (see `memory/video-editing-toolchain.md`).
- ⛔ **Run Claude Code with `ultracode` ON** — the Workflow tool is what runs the gates, arenas, and per-scene agent fleets. It is the engine, not a nicety.

## R3. Reel architecture
One self-contained `.tsx` per reel: palette + helpers (`fr`, `over`, `ramp`, `grad`, `seed`) → components
(`Panel`, `Mascot` + costumes, `ScreenHead`, `Captions`, `ProgressBar`, `Sfx`) → `L[]`/`CUT` → scene bodies →
the export. Registered in `Root.tsx` as a `<Composition>`. Assets in `public/`. Format: 1080×1920, 30fps, H.264.

## R4. Standing non-negotiables (the short list)
- The first render is a **wireframe**, never delivered.
- **Gate the how.** Sell the result, name the artifact.
- **Zero em/en dashes** anywhere (grep before shipping).
- Clay **Claude mascot** on Claude/Fable reels; Sol/Terra/Luna **only** on GPT reels.
- Top **ProgressBar** with a reward that unlocks at the CTA; escalate every scene.
- **Hard cut on the CTA keyword** — nothing after it.
- IG safe zone: chrome eats top ~250 / bottom ~340 / right ~120.
- Deliver to **both** Final and Drive.

## R5. The brain — start here
`memory/MEMORY.md` is the index. Load order for a new reel:
`script-factory-pipeline` (master) → `creator-lane-ceilings` (routing) → `vault-reel-premise-autopsy` (kill-rules)
→ `reel-winning-formula` + `gate-the-how-in-scripts` + `dopamine-ladder` + `specificity-effect` (script)
→ `reel-storyboard-process` (design) → `reel-build-gotchas` + `caption-sync-gate` + `reel-vo-pacing` (build)
→ `reel-overhaul-stage` + `reel-sfx-pass` (polish) → `caption-structure` + `lead-magnet-docs` (ship).

> Recreating `memory/` from scratch is the hard part — **copy it verbatim.**

## R6. TL;DR for a new operator
1. Copy the four pillars (R1). Install (R2). Turn **ultracode** on.
2. **PHASE A** — source an outlier, kill-gate it, arena it, route it, draft, pass the 3-critic gate. *Most reels die here. That is the point.*
3. **PHASE B** — storyboard with reasoning, lock the invariants, let a fresh critic break it, rewrite.
4. **PHASE C** — record → splice in silence → R1 pacing → captions → `L[]`/`CUT` → clone chassis → parallel-author scenes → wireframe.
5. **PHASE D** — overhaul (hook interrupt + per-scene) until both gates pass → SFX (≤2 risers) → music.
6. **PHASE E** — encode → both folders → caption → lead magnet → ledger → autopsy at 48-72h.
</content>
