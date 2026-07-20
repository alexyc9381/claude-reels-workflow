# Story arcs — pick one when the script has a story, and its beat shape

A menu of arc STYLES, plus a SELECTOR that decides *whether the script even wants one*. Many of our best
reels have no character arc at all and forcing one on them is a mistake. This library is an EXECUTION FLOOR:
it fixes the BEAT SHAPE (where intensity sits, when the payoff fires, when the villain loses), and nothing
else. The SET, the villain's identity, the hero artifact, the places, the gags — all come from the script.
Two reels on the same arc must look nothing alike; if this file ever makes two boards rhyme, it is being
used wrong. Pick the arc the script's own logic already implies. Never bolt one on.

Every card still uses the shared per-scene skeleton (`SCENE n · <shot> · <beat function>`). An arc just tells
you which `beat function` each scene carries and how hard it should hit. Beat functions:
`HOOK · SETUP · TURN · ESCALATE · PAYOFF · CTA`.

---

## STEP 1 — THE SELECTOR (run before you pick anything)

Read the locked script and answer, in order. First match wins; if nothing matches, you have a **value-first
reel and take NO arc** (jump to the last section).

| If the script has… | signal in the VO/premise | arc |
|---|---|---|
| an **embodied enemy that can lose** | a bot, a competitor, a gatekeeper, the manual grind personified — something with a face that can be beaten | **VILLAIN / HERO** |
| a visible **before → after** on one artifact, no enemy | messy→clean, blank→built, slow→fast, "responsible for sales" → "grew revenue 34%" | **TRANSFORMATION** |
| a **mismatch** — small vs big, free vs expensive, solo vs team | "you don't need the $5k agency / the senior dev / the whole team" | **UNDERDOG** |
| **taking something hidden or gated** | an answer key, a locked capability, a shortcut nobody uses | **HEIST / CAPER** |
| **one non-obvious thing you didn't know exists** | "Claude can now ___" — a single capability reveal | **DISCOVERY / REVEAL** |
| a **multi-stage journey to a goal** | a pipeline, a build, milestones toward one finish line | **QUEST** |
| **none of the above — it just teaches value** | a list of tips/steps/settings, no enemy, no transformation, no character | **NO ARC → value-ladder** |

**Selector rules**
- **Only embody a villain if it can plausibly LOSE at the end.** A void, a black-hole inbox, "the algorithm"
  cannot be punished — no antagonist left to turn = arc collapses (CALLBACK rejected a falling-into-the-void
  open for exactly this).
- **Do not upgrade a tips reel into a story.** If the value is "here are 4 settings," a fake villain is
  filler and reads as gimmick (see `no-anecdote-value-first-scripts`). Ship the value-ladder.
- **One arc per reel.** A heist can live *inside* a villain/hero reel as a single scene (CALLBACK S4 is a
  mini-heist), but the reel's spine is ONE shape.
- Adjacent picks: if you have a before→after AND an enemy, the enemy wins the pick (villain/hero) and the
  before→after rides the bottom-screen artifact. If you have a reveal AND stages, ask what the PEAK is — the
  single reveal (discovery) or the arrival (quest).

---

## STEP 2 — THE ARC LIBRARY

Each arc gives a **beat template** mapped onto a 6–8 scene / 30–45s reel, its **intensity-curve shape**, and
its **rules**. Timecodes are illustrative; hold the *slot order*, not the seconds.

### VILLAIN / HERO — *the exemplar; see [`52-callback.md`](52-callback.md)*
**Fits when:** an antagonist can be cast, commit a crime on camera, and be beaten/turned at the end. The
strongest scroll-stop we have — it gives the viewer's grievance a face and a weapon.

| slot | fn | job |
|---|---|---|
| S1 | HOOK | Villain commits the crime on camera, at **full power, undefeated**. Viewer is the victim. Pose the question, don't answer it. |
| S2 | TURN | Hero(es) arrive; the method is NAMED. Villain **STOPS but takes zero damage** (a reaction, not a wound). |
| S3–S(n-2) | ESCALATE | One counter-attack beat per scene, each lands one piece of the method, each escalates. Villain stays intact — robbed, outsmarted off-screen, spectating — but **never wounded**. |
| S(n-2) | ESCALATE→EXHALE | The last rung, then a short deliberate breath. Payoff still owed (stamp still red). |
| S(peak) | PAYOFF | Villain **loses / is TURNED — once, here only**. The single crest, above the hook. |
| S(last) | CTA | Keyword. Hard cut. |

**Curve shape:** rising staircase with ONE dip immediately before the crest. Open under the ceiling so the
peak can clear it.
**Rules:**
- ⛔ **Villain UNDEFEATED in the cold open; loses ONLY at the peak.** CALLBACK's round-1 critic killed a board
  where the villain lost **eight times** and the payoff was spent at **3.5s** — "by the time the revenge frame
  arrives, we're executing a corpse. A villain that loses seven times before the peak has no threat, so the
  peak has no release."
- ⛔ **Do not spend the ending in S1.** CALLBACK S1 originally showed the resume surviving onto the human's
  desk at 3.5s — the whole promise, delivered before the hero existed. Cut entirely.
- **No damage in the middle.** Reactions, thefts, being ignored — yes. Bent stamps, snapped blades — no. The
  villain's signature must be intact so it can die at the peak.
- **Payoff = a TURN, not just a defeat.** The gatekeeper doesn't break; it now has to let you in.

### TRANSFORMATION — *before → after on one artifact*
**Fits when:** the spine is a state change and there's a concrete, painful BEFORE but no enemy to embody.

| slot | fn | job |
|---|---|---|
| S1 | HOOK | The BEFORE at its worst — specific, on camera (not "a bad resume," the exact dead line). |
| S2 | SETUP | The tool/method enters and is named. |
| S3–S(n-2) | ESCALATE | Each beat converts one piece; the **artifact visibly changes state** on screen; each conversion bigger than the last. |
| S(peak) | PAYOFF | The AFTER revealed whole — and **escalated past** the before. The reveal is the crest. |
| S(last) | CTA | Keyword. |

**Curve shape:** clean climb; the AFTER is the peak.
**Rules:**
- ⛔ **The AFTER must escalate past the BEFORE, never restate it** (`reel-motion-hierarchy`: "the payoff must
  escalate past the setup — never restate it").
- **The change happens ON the artifact**, not in the VO. If the viewer can't see it flip state, it didn't
  transform.
- Keep the BEFORE stunning via `specificity-effect` — a vague before makes a flat hook.

### UNDERDOG — *outmatched until the flip*
**Fits when:** the subject is small vs a big incumbent (solo builder vs agency, free vs $200 tool, normal user
vs experts). Same engine as villain/hero, but the antagonist is a **status gap**, not a body.

| slot | fn | job |
|---|---|---|
| S1 | HOOK | Establish the mismatch — small thing dwarfed by the big thing. |
| S2 | SETUP | The underdog's one secret weapon (the method). |
| S3–S(n-2) | ESCALATE | Reps where the gap visibly closes, one step per scene. |
| S(peak) | PAYOFF | The underdog **matches or beats** the big player. Crest above the hook. |
| S(last) | CTA | Keyword. |

**Curve shape:** low-framed mismatch → climbing → the flip at peak.
**Rules:**
- ⛔ **Keep the underdog OUTMATCHED until the peak.** If they look like they're winning at 3s, the flip has no
  release (same discipline as the undefeated villain).
- **The win is EARNED by the shown method, not luck** (see the heist's rejected freeze-and-shrug below).

### HEIST / CAPER — *take the thing that was gated*
**Fits when:** the value is unlocking/taking something hidden — an answer key, a locked capability, a
shortcut. Lives well as one scene inside a bigger arc (CALLBACK S4).

| slot | fn | job |
|---|---|---|
| S1 | HOOK | The vault/target — what's locked and why it matters. |
| S2 | SETUP | The crew/tool assembles. |
| S3–S(n-2) | ESCALATE | The steps of the grab, tension climbing. |
| S(peak) | PAYOFF | The score revealed AND used — its effect is the crest. |
| S(last) | CTA | Keyword. |

**Curve shape:** caper build to the grab; crest = reveal of what was taken + its effect.
**Rules:**
- ⛔ **The take must be NON-OBVIOUS** (dopamine-ladder L4). The best twist is "it was self-service the whole
  time" — CALLBACK's published answer key (the job description IS the rubric, bolted in public, unread).
- ⛔ **Avoid the worn freeze-and-shrug** (guard swivels, hero freezes, guard passes). CALLBACK rejected it:
  seen 200 times, predicted a second early = death at the swipe window, and it makes the win LUCK not insight.
- Don't show the copy-pasteable HOW on screen or in VO (`gate-the-how-in-scripts`).

### DISCOVERY / REVEAL — *one thing you didn't know*
**Fits when:** the reel is a single non-obvious capability ("Claude can now ___"). Value-first-adjacent, but
it carries ONE loop.

| slot | fn | job |
|---|---|---|
| S1 | HOOK | Plant the loop — the RESULT/effect on frame 0, the METHOD withheld. |
| S2 | SETUP | The room/context; raise what's at stake in the reveal. |
| S3–S(n-2) | ESCALATE | Tease closer, keep them guessing, never spoil. |
| S(peak) | PAYOFF | The reveal — **non-obvious** — the crest. |
| S(last) | CTA | Keyword. |

**Curve shape:** withhold-and-build; the reveal is the peak.
**Rules:**
- ⛔ **Never pay off mid-video** (dopamine-ladder L3; `reel-storytelling-playbook` closes the loop at the END).
- **Front-loading the RESULT/number is correct** (receipts-first) — withhold only the METHOD. Showing the
  number early is not a spoil; showing the how is.
- ⛔ **The reveal must be non-obvious** or L4 doesn't release and the reel should have been killed at topic
  stage (`reel-winning-formula` innovation bar).

### QUEST — *stages toward a goal*
**Fits when:** a multi-step journey with milestones — a pipeline, a build, a path with a visible finish line.

| slot | fn | job |
|---|---|---|
| S1 | HOOK | The goal + the distance to it (finish line visible, far). |
| S2–S(n-2) | ESCALATE | One STAGE per scene, **each a different place/composition**, each advancing the progress. |
| S(n-2) | ESCALATE | A milestone/boss stage — the hardest step, right before arrival. |
| S(peak) | PAYOFF | Arrival at the goal. Crest above the hook. |
| S(last) | CTA | Keyword. |

**Curve shape:** progress-bar climb with a spike at the final stage (`reel-progress-bar-reward`).
**Rules:**
- **Every stage is a distinct place and shot scale** (`reel-multishot-structure`) — never re-dress one set.
- ⛔ **Guard against episodic sag** — "and then, and then" plateaus. Each stage must escalate on the last; the
  final stage is visibly the hardest.
- Keep the goal withheld/visible the whole way so the loop stays open.

---

## STEP 3 — NO ARC: the value-ladder (the common case)

Most tips/settings/steps reels take **no character arc**. Structure them as an escalating ladder of value,
not a story — `no-anecdote-value-first-scripts` + `dopamine-ladder`. Say this out loud on the board so nobody
bolts a villain on later.

| rung | job |
|---|---|
| **L1 stun-gun** | Result/claim mute-readable on frame 0. |
| **L2 open loop** | The HOW withheld — a distinct question the value-noun alone doesn't answer. |
| **value beats** | Each tip/step its own scene; **biggest/most surprising LAST**; loop held, never spoiled early. |
| **L4 payoff** | The non-obvious artifact named on screen; the copy-pasteable HOW goes to the comment. |
| **CTA** | Keyword. |

Value-first ≠ visually boring. A no-arc reel still gets the full cinematic floor — real places, depth,
multishot editing (`reel-multishot-structure`), one-mover-at-a-time hierarchy. It just doesn't invent a
character to carry it. Order the rungs by ASCENDING value, not by chronology.

---

## STEP 4 — THE INTENSITY-CURVE GATE (run on EVERY board, arc or value-ladder)

Plot every scene's intensity 1–10, in order, and check all five:

1. **No belly sag.** No middle scene more than ~1.5 below the hook, and **never two deflate scenes
   back-to-back** — CALLBACK's critic flagged the "compound exit": two consecutive quiet analysis beats =
   "this reel is slow" and they're gone.
2. **The PEAK beats the hook.** The crest scene must be strictly greater than the opening scene. A peak that
   only *ties* the hook has nothing to release.
3. **The payoff is never spent early.** The villain-loss / AFTER / reveal / arrival appears ONLY at the peak.
   If the hook already contains the ending, cut it (CALLBACK S1's 3.5s promise-delivery).
4. **The villain (if any) is undefeated until the peak.**
5. **One dip, and it's late.** A controlled drop is allowed ONLY as a single exhale immediately before the
   crest. Open strong but **under the ceiling** (~8–8.5), so the peak has room to clear it.

**The anti-pattern to memorize — CALLBACK's rejected draft, plotted as built:**

```
S1  S2  S3   S4   S5  S6   S7  S8  S9
 9   8  6.5  6.5   8  8.5   6   9   8
```

Hook-high, **belly-low**, late-recover — and the peak (S8=9) only **ties** the hook (S1=9). "That is the exact
profile of a reel that dies at 12s." Two failures at once: the 11–25s trough (two slow scenes back-to-back),
and a peak that never beats the opening. The fix that shipped merged the two-hooks-in-a-row open into one
scene (recovering ~6s, hero lands at 6s not 11s), pulled the payoff forward to a single unspent crest, and
kept the villain intact until S8.

**Good shape, by contrast:** a rising staircase — ~8–8.5 hook, climbing rungs through the middle with no two
adjacent drops, ONE exhale before the crest, the crest clearly the highest point of the reel, CTA a step down.
