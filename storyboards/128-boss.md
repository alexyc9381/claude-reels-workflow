# STORYBOARD — REEL 128 BOSS (Stage 6) · v2, THE BOSS ROOM

> **Logline:** a team of Claudes throws everything it has at a boss who refuses all of it,
> over and over, until the one that finally lands scores PERFECT.
> Format:   single dark panel · chassis cloned from reel 122/125 (`HwWorld` primitives)
> Arc:      UNDERDOG — a party that cannot beat the thing above it, until the loop makes it
>           good enough
> Villain:  **THE BOSS**. RULE: he never leaves the dais and he refuses everything. He is
>           beaten exactly once, at S10, the peak.
> Hero cast: **THE LEAD** (constr) up to 314px · **THE BOSS** (suit/stern, `BOSSC` clay) at
>            470-560px, three to four times the party · a PARTY of eight cycling all 12
>            costume levers deterministically · a CROWD of 36 in the stands, three value ranks
> ⛔ NUMBER SPINE: `THE TASK` → `SPAWN THE PARTY` → `ASSIGN A STRICT BOSS` → the rail
>    climbing → **PERFECT** → the token stack draining
> ⛔ HERO ARTIFACT: **THE RAIL** — ten segments on the wall behind the boss. It does not move
>    when they hit him, and it is full when they finally do.

---

## ⛔⛔⛔ v1 WAS BUILT, GATED GREEN, AND REJECTED ON THE METAPHOR

v1 was **THE OVERLOOK**: a machine hall, a hoist, a chute, a boss behind glass, and a hero
artifact called `Unit` — a brass frame with a hopper, a gear train and a spout, standing in
for "an app". It measured motion median **10.44 · 0/15 under bar · 0/15 dying into a cut ·
HOOK_LUMA 144.4 · BODY_SAT 88% · verify 8/8**, and came back:

> *"the hook concept is too boring. I don't really understand what the big box of tools going
> up and then falling out is. I'm not exactly sure what's going on... a lot of these animation
> concepts just need to be completely redone because it's way too boring. I don't like the
> machinery concepts."*

⭐ **THE DIAGNOSIS IN ONE SENTENCE: the hero object was one I invented.** An invented machine
is a CONTAINER one layer up (§3) — a viewer cannot name it, so at half a second it reads as
exactly what he called it. §15 is the law it broke: *at half a second a viewer RECOGNISES a
thing; they do not decode a silhouette.* Craft on that object was never the axis, and three
rounds of making it bigger, brighter and better lit did not move the note.

⛔ **AND EVERY GATE IN THIS REPO SAID IT WAS FINE.** That is `feedback_hook_simplicity`
verbatim: the gates check whether an open is BUILT right, never whether the IDEA is good.

---

## THE WORLD — **THE BOSS ROOM**

⭐⭐⭐ **The replacement is not a nicer metaphor, it is the subject's own vocabulary.**
"The boss loop" is a GAMING term: a boss is a thing you fight, lose to, and run again until
you beat it — which is the mechanic, exactly, and the reason the technique is called that.
Every line of the VO already has a word waiting for it:

| the VO says | the world already calls it |
|---|---|
| "a strict AI boss" | **THE BOSS** |
| "loop and fix errors" | the **RETRY** — die, respawn, run it again |
| "a perfect score" | **PERFECT** |
| "burns through **tokens** fast" | **TOKENS.** ⭐ The same word. A slot eating arcade tokens is not a metaphor, it is literally true |
| "spawn a team of worker sub-agents" | **THE PARTY**, out of spawn pads |

⛔⛔ **AND THERE IS NO INVENTED OBJECT IN IT.** The cast is Claudes, the villain is a Claude,
and everything else is impact, light and a token stack. Nothing has to be decoded, only seen.

⛔ **WORLDS CHECKED AND RULED OUT FIRST:** reel 57 RAMSAY is a KITCHEN *and* the same
two-Claude-adversarial-reviewer concept, so a head chef at a pass was unavailable at any
price. Reel 80 OPEN used an arcade CLAW MACHINE as one hook variant, never as a world.

### The eight places (a new light + colour every 1.0 – 2.8s)

| # | place | light | key hue | used by |
|---|---|---|---|---|
| 1 | `arena` — the floor, house lights UP | bright rig, brightest frame | ice blue / neon | S0, S3, S7, S14 |
| 2 | `arena2` — the same room, lights DOWN | one board, one sweep | deep teal | S2, S6 |
| 3 | `spawn` — the pads | cold columns from below | teal / cyan | S1, S5 |
| 4 | `gate` — the way in, cramped | one violet wash | violet | S4 |
| 5 | `slam` — his block | hard red | red / oxide | S8 |
| 6 | `retry` — the CONTINUE | ember from the slot | ember / gold | S9, S11 |
| 7 | `perfect` — the win | jade, the only green | jade / gold | S10, S13 |
| 8 | `prep` — the practice room | one warm lamp | amber | S12 |

---

## THE RECEIPTS (verified live 2026-08-29) — unchanged from v1, the facts did not move

| claim in the VO | what backs it |
|---|---|
| "new prompting technique" | the published practice is **loop engineering** / **agent loops** |
| "even the creators of Claude think this is the future" | **Boris Cherny**, creator of Claude Code: *"I don't prompt Claude anymore. I have loops running that prompt Claude and figure out what to do."* |
| "spawn a team of worker sub-agents" | Cherny: *"armies of agents, with agents prompting agents in trees of thousands"*; he shipped nested subagent support |
| "assign a strict AI boss" | the Claude Code team's own **maker/checker split** |
| "the boss tears it apart" | Cherny on real verification: *"can the agent run the thing?"* |
| "burns through tokens fast" | token costs in autonomous loops compound faster than developers expect |

### ⛔ HONESTY LEDGER
1. **"THE BOSS LOOP" IS OUR NAME.** Nothing on screen calls it an industry term; the caption
   says so outright.
2. **NO MONEY FIGURE ANYWHERE.** The VO names none, and a number under the token slot reads
   as the price of the run just watched. It is a stack that empties.
3. **NO PORTRAIT OF A REAL PERSON.** The Cherny receipt is six quoted words on the arena board
   with a name strip under it.
4. **THE RAIL IS AN EVENT COUNT, NOT A BENCHMARK.** It is the boss's own verdict on a thing
   the viewer watches being refused three times and then landing.
5. **The boss is the SAME CLAY as the party**, two stops down. Scale, height and light do the
   villainy — he is not a different species, because the point is that the thing grading the
   work is the same kind of thing that made it.

---

## SCENE CARDS
*(every onset is `round(word_onset × 30) − 4` from `src/data/words_128boss.json`)*

```
S0   0.00→2.63s (79f) · LOCKED WIDE · HOOK        ⭐ ONE HOOK PER CUT (rev 4)
     "There's a new prompting technique that's been blowing people's minds this week."
     Each cut opens on a different argument about the same technique, so a viewer served
     two of them never sees the same 2.6s twice. TRIAL-CUTS.md measures per-cut LAYOUT as
     the strongest dHash lever there is — stronger than grade or bed.

     house  G · SENT BACK DOWN THE LINE   motion 14.67 · open 13.71
            Three workers pass the build up the line; the boss at the end HURLS it back to
            the start. Better, thrown back again. Third time he holds it up: green.
            ⭐ The only cut that shows the TEAM, i.e. the sub-agent fan-out the VO names.
     amber  F · THE COUNTER                motion 11.91 · open 12.18
            A stamp the size of your head COMES DOWN on your work and knocks it off the
            counter. Twice. The third stamp is GREEN and it goes through.
     steel  B · THE VERDICT LOOP           motion 17.70 · open 10.43
            Two Claudes carry a build up to a giant boss; he BACKHANDS it back down.

     ⛔ Each hook's first event is a BODY DOING SOMETHING PHYSICAL TO AN OBJECT, at f3-f4.
       Two earlier concepts (a tick that faded in; a Claude walking away) were rejected as
       "I don't understand them immediately" — see feedback_the_first_event_is_a_body_hitting_an_object.
     ⛔ Each cut carries its OWN hook SFX bank: G on f4/30/58, F on f3/30/60, B on
       f4/20/36/52/68. Audit cue rate PER VARIANT, never over the whole file.

S1   2.63→4.87s (67f) · WIDE · SETUP                                     motion  9.24
     "You can build entire apps and websites in a single prompt,"
     One token into the slot, and the arena ANSWERS: six pads fire, six Claudes land out of
     six columns of light. He is thrown backwards by what he started.

S2   4.87→7.70s (85f) · MED · SETUP                                      motion  7.01
     "and even the creators of Claude think this is the future of AI."
     THE BOSS WALKS THE LENGTH OF THE ARENA at 560px while the party parts in front of him.
     Cherny's six words land cell by cell on the board above. ⛔ REBUILT TWICE: a bigger text
     board is still a text board (`feedback_dressing_the_words_is_not_redoing_it`).

S3   7.70→8.73s (31f) · WIDEST · TURN                                    motion 18.64
     "It's called the boss loop."  The whole arena, first seen, lights in three banks.

S4   8.73→10.33s (48f) · CLOSE · CONTRAST                                motion 10.90
     "Instead of doing the normal back and forth chats,"
     ONE Claude walks up to the boss alone, four times, and is flicked back every time — the
     same two feet, slower each go. ⛔ The only repetitive scene in the reel, on purpose.

S5   10.33→13.17s (85f) · WIDE · ESCALATE           ⭐ DENSITY PEAK 1     motion  7.78
     "you give Claude a task and tell it to spawn a team of worker sub-agents."
     Eight pads fire four frames apart; two ranks of four, back rank value-ramped. They form
     up and CHARGE on f62, still crossing when it cuts.

S6   13.17→15.10s (58f) · CLOSE · TURN                                   motion  8.94
     "But the secret sauce is the third line of the prompt"
     Two loadout slots fill; the third is an EMPTY, LIT SOCKET and the shot holds it.

S7   15.10→16.63s (46f) · LOW · VILLAIN IN                               motion 16.01
     "where you assign a strict AI boss."
     The slot fills and THE BOSS RISES OUT OF THE FLOOR on a BACK overshoot. The party backs
     away; he raises his arm into the cut.

S8   16.63→19.13s (75f) · MED · ESCALATE                                 motion 12.33
     "The worker agents write the code and the boss tears it apart."
     Three volleys. He blocks all of them, the party is knocked flat, and THE RAIL DOES NOT
     MOVE — the story of the scene in one object.

S9   19.13→20.47s (40f) · WIDE · ESCALATE                                motion 12.89
     "And they automatically loop and fix errors"
     THE RETRY, three laps, accelerating on an integrated rate. Tokens go on every lap.

S10  20.47→22.40s (58f) · MED→WIDE · PAYOFF             ⭐ THE PEAK       motion 13.25
     "until the boss gives it a perfect score."
     The volley GOES THROUGH. The rail fills, PERFECT lands, the boss goes down on one knee
     and nine of the crowd flood out of the stands onto the floor.

S11  22.40→23.73s (40f) · TIGHT · COST                                   motion 10.06
     "This burns through tokens fast,"  The slot, close, eating. Still eating at the cut.

S12  23.73→25.30s (47f) · CLOSE · ADVICE                                 motion  7.30
     "so you should only build your basic prototype first,"
     One Claude alone on a training dummy, four honest hits, with ARENA · OFF behind him.

S13  25.30→27.47s (65f) · WIDEST · CLIMAX OF SCALE                       motion 12.54
     "then trigger the boss loop to polish the final product."
     He slams the token in and the whole arena comes up at once — eight pads, four volleys,
     the crowd, the rail climbing to PERFECT.

S14  27.47→29.00s (46f) · MED · CTA                                      motion 11.52
     "Comment BOSS for the free guide."  ⛔ HARD CUT ON THE KEYWORD at local f4. The boss is
     down behind them and the crowd has not stopped.
```

---

## THE HEADER

**CLAUDE NEEDS / A STRICT BOSS**  *(was: ONE PROMPT / A WHOLE BUILD)*

Alex, round 9: *"the header text needs to be way better there as well, like more interesting."*
The old header restated the first line of the VO and said nothing a scroller could not guess. The
replacement does three jobs at once, which is what `feedback_headers_state_the_claim` asks for:

- it **names Claude in the largest type on screen** — the audience filter doing its job, per
  Alex's standing note that the first 3 seconds must signal to a Claude audience and let
  everyone else scroll past;
- it states a **counterintuitive claim** rather than a description — "needs a strict boss" is an
  argument you have to watch the reel to resolve;
- it **describes the picture you are looking at**, so the words and the image reinforce rather
  than compete.

## THE HOOK: THREE CONCEPTS, MEASURED

| concept | mechanism | MOTION | 0-1s FLOOR | HOLD | PRE-CUT | LUMA |
|---|---|---|---|---|---|---|
| A THE SWAT | IMPACT — one body launched the width of the frame | 4.55 | 1.84 | 76.9% | 0.21 | 106.1 |
| **B THE WIPE** | **a WAVE — the whole party off its feet at once** | **5.81 → 10.20** | **2.63 → 6.4** | **61.5% → 19%** | **0.53 → 0.83** | **105 → 144.4** |
| C THE BLOCK | a REFUSED ATTACK — the volley bursts on his hand | 5.23 | 2.00 | 61.5% | 0.52 | 108.9 |

B was rebuilt four times against its own gates. The four findings:
1. **A 528px boss on a y=588 ground line is a FLOATING HEAD** — the scene push cropped his
   top. 476px at y=700 puts the whole giant in frame, and the SCALE against a 226px worker
   is what does the work.
2. **THE STANDS ARE THE TOP HALF.** TOP/BOT measured 0.24 — every body was in the lower-left
   quadrant. A crowd that REACTS fills it and is what makes the room read as an arena.
3. **THE LUMA MISS WAS TWO MEASURED BANDS**, not a palette: a black ceiling strip (mean 36.8)
   and a dark near floor. Lighting the truss and the stands took frame 0 from 105 to 144.4
   and no dark stop was touched — the boss is still the darkest mass in the frame.
4. **THE TAIL NEEDED A THIRD WAVE.** The last body left at f58 of 79; three more now go at
   f66-76, so the shot is still throwing bodies on the frame it cuts.

---

## THE ADVERSARIAL CRITIC PASS

| check | verdict |
|---|---|
| **Swipe points 0–5s** | 0–2.6s the wipe · 2.6s hard cut to six spawn columns firing · 4.9s hard cut to a 560px boss walking straight down the frame. Three framings, three mechanisms. **PASS** |
| **Repeated base-object** | `arena` 4× and `spawn`/`retry`/`perfect` 2× each, but no two NEIGHBOURS share a set and every return changes the light (S2/S6 are the arena with the house lights down). **PASS** |
| **Payoff spent early** | the rail never rises above 3 of 10 before S10, and the volley is blocked every time until then. **PASS** |
| **Villain integrity** | he refuses at S0, S4, S8 and S9 and is beaten exactly once, at S10. **PASS** |
| **Intensity curve** | 9 · 6 · 7 · 8 · 5 · 8.5 · 6.5 · 9 · 8.5 · 8 · **10** · 6 · 5 · 9.5 · 7 — two deliberate troughs (S4, S12), no belly sag, peak beats the hook. **PASS** |
| **§3 container test, per scene** | run on all fifteen. The one that failed twice was S2 — a board of words is a rectangle arriving. Fixed by making the SCENE the boss's walk and shrinking the receipt to a strip. |

## Related
`docs/THE-OPEN.md` · `docs/ANIMATION-QUALITY.md` (§3 containers · §15 recognition · §24
split-half · §23 pre-cut · §26 rate) · `storyboards/118-loop.md` (**the reel this must not
resemble — same script**) · `memory/boss128-reel.md` · `memory/loop118-reel.md`
