# STORYBOARD — REEL 121 MISTAKE (Stage 6)

> **Logline:** you make the same trip to Claude every day, and three things you never asked for are
> riding along in the hold — so the stuff that would actually help you does not fit.
> **Format:** single dark panel · clone the 120 UNLAZY / 118 LOOP chassis (cream `Bg`, dark `Panel`,
> karaoke captions, progress rail, `HookHeader`, clay `Mascot` from `SlopKit`)
> **Arc:** SUBTRACTION. Every other reel in this repo ADDS a thing. This one takes three things OUT,
> and the payoff is measured by what fits once they are gone. The hold gets EMPTIER and the reel
> gets BETTER, which is the whole argument.
> **Villain:** **THE DEAD LOAD** — not a character, a WEIGHT. It is present at frame 0, it is never
> argued with, and it loses three times: once per tip, each time by being physically removed from
> the hold. ⛔ It does not shrink. It is CARRIED OUT.
> **Hero cast:** HERO Claude (constr, the driver) through all 11 scenes · a SORTER Claude (prof,
> S4-S6) who is the one actually confused by the DON'T board · five DEPOT Claudes at the lock-up
> (S9) · a CTA crew of ten on `costumeFor(i)` across all 12 levers.
> **⛔ NUMBER SPINE (in order):**
> `~55K TOKENS` (S0, Anthropic's own five-server figure) → `3` (S1) → `EXPERT` weighed at `0` (S2) →
> `SOURCES` + `CHECK` (S3) → `DON'T` (S4) → the wrong slot (S5) → `DO` (S6) → `5 CONNECTORS` (S7) →
> `× EVERY MESSAGE` (S8) → `LOAD TOOLS WHEN NEEDED` + `-85%` (S9) → `15` → `MISTAKE` (S10)
> **⛔ HERO ARTIFACT:** **THE HOLD** — the van's load space, stencilled with a capacity and painted
> with a LOAD LINE. It is on screen in all 11 scenes and it is the only thing that changes state.
> Everything else in the reel is staging for it.

---

## 0. Theme mapping — every row fills in, or the element is cut

⛔ `feedback_real_marks_are_the_props`: **two worlds have been rejected with correct mappings**, so
the set here is LIGHT AND DEPTH only, and the objects are the subject's own. The test applied to
every prop: *point at it and say what it is, in product nouns.*

| on screen | what it actually is |
|---|---|
| the van's **HOLD**, capacity stencilled on the door | your context window, for one message |
| the painted **LOAD LINE** inside it | the token limit |
| the **back door that bounces open** | hitting that limit |
| the trip he makes again, and again, and again | *"every time they open Claude"* |
| a velvet **EXPERT robe + mortarboard** on a hanger, filling a third of the hold | *"telling Claude to act like an expert"* |
| the robe on the depot scale reading **0** | *"you're just wasting your context window"* |
| a flat folded **SOURCE MAP** and a **CHECK BEFORE FINISHING** tag sliding into the space it left | *"spend those tokens telling Claude where to find the sources / check its own work"* |
| the red **DON'T** board bolted across the hold mouth | a negative instruction |
| the sorter reading it, stalling, and posting to the **wrong slot** | *"it gets confused"* |
| the green **DO** board that NAMES a destination, and the sorter walking straight to it | a positive command |
| **five toolboxes chained to the tow hitch**, dragged on every trip | your connectors, loaded into context with every message |
| the chain dropped and the boxes **racked in the lock-up with a call bell** | `Load tools when needed` |

**Also on screen, literal:** the real GitHub, Slack, Sentry, Grafana and Splunk marks on white
tiles (they are Anthropic's OWN five-server example, not a set dressed at random), the real UI
string `Load tools when needed`, and Anthropic's verbatim before/after pair. The street carries the
FEELING; these carry the INFORMATION.

---

## 0b. ⛔ THE HONESTY LEDGER — checked live 2026-08-24

| the VO says | what is actually sourced | so the picture draws |
|---|---|---|
| "wasting thousands of tokens" | **"A typical multiserver setup (GitHub, Slack, Sentry, Grafana, and Splunk) can consume ~55k tokens in definitions before Claude does any work."** — platform.claude.com, Manage tool context | `~55K` on the claim plate, with those five real marks |
| "this one **default** setting" | ⛔ the shipped default is **Auto**, NOT "always loaded". The help centre lists `Auto` / `Always available` / `On demand` | **the word DEFAULT never appears on a plate.** The picture draws the MECHANISM (schemas ride along on every message) and the FIX, and stops at the edge of the claim |
| "act like an expert … wasting your context window" | **"modern models are sophisticated enough that heavy-handed role prompting is often unnecessary"** — claude.com prompt-engineering best practices | the robe weighed at `0`. Not "harmful", not "banned" — WORTHLESS, which is what the source says |
| "negative instructions … write smooth flowing text paragraphs" | ⭐⭐⭐ this is Anthropic's OWN documented example, near verbatim: **"Tell the AI what TO do instead of what NOT to do. Instead of: 'Do not use markdown in your response' Try: 'Your response should be composed of smoothly flowing prose paragraphs'"** | S6 puts the REAL before/after pair on the boards. The receipt IS the prop |
| "switch tool access to load tools when needed" | **`Load tools when needed`** is the real in-product string (Settings → Connectors → Tool access) | the lock-up's lever plate reads it verbatim |
| "so you only pay for tools when they're actually used" | **"Tool search typically reduces this by over 85 percent, loading only the 3–5 tools Claude needs"** | `-85%` is the payoff number, and it is first-party |
| "15 mistakes … free guide" | Alex's own guide | CTA only |

⛔ Nothing outside this table goes on screen as an assertion.

---

## THE WORLD — **THE DAY RUN**

A bright morning street outside a depot. Not a hall, not a bay, not a workshop — this reel is
**outdoors**, because the last four worlds were interiors and because a sky is free luma that costs
no shadow (`ANIMATION-QUALITY` §8: brightness is the MEAN, hierarchy is the SPREAD).

One small van, dead centre, side-on. The same trip, every day. The camera never moves; every change
is a hard cut to a different framing of the same street.

**Depth planes** (`WorldKit.Surface`): sky → distant depot roofline and a water tower → the far
kerb, railings and a parked rank → **the van (hero plane)** → a foreground bollard-and-chain
`Occluder` cropped by the frame edge, in front of the action. ⛔ The §8 depth question — *is there a
mass cropped by the panel edge, in front of the action?* — is answered by that bollard in every
scene, or the camera is pointed at a backdrop.

**Light:** warm low morning key from frame-left, long shadows raking right. Neighbouring scenes
differ by **both hue and lightness** (§9): warm street → cool depot shade → warm again → the lock-up
interior is the one genuinely dark set, and it is dark ON PURPOSE so the payoff can be the only lit
thing in it.

---

## SCENE CARDS

Onsets are **measured word onsets** pulled out of `words_121mistake.json` by pattern-matching each
beat's opening words. ⛔ Never a hardcoded index, never whisper's raw starts.

### SCENE 0 — f0 to f175 · 0.00-5.82s (5.82s) · 3 HARD CUTS, LOCKED CAMERA EACH · BEAT: HOOK
**Mechanism word: OVERFLOW.** ⛔ **Does not resolve.** No fix, no setting, no lock-up in S0.

  VO:       "Most people are wasting thousands of tokens every time they open Claude, and it's all
            because of this one default setting you have not turned off yet."
  SET:      The street, world held DOWN (~0.5) per the hook rule — sky, the van, one light pool,
            the kerb line, grit. No crowd, no depot, no rank of vans yet.
  CAMERA:   Locked for all three shots. Slow in-panel push on each (1.05 → 1.11).
  BLOCKING:
    **A · f0-f66 (66f) — medium, THE SHOULDER.** ⭐ ONE dominant object: the van's **back door**,
      dark against a bright sky, its leaf ~52% of panel height. ONE supporting element: HERO Claude
      (constr) shoulder-first against it, braced, feet skidding.
      *Before state (legible on frame 0):* the door is already 30% open, a velvet **sleeve** and one
      **toolbox corner** jammed in the gap — so frame 0 already contains the load AND the subject.
      *Trigger:* he drops his weight into it at f8.
      *Travel:* the leaf closes across **0.55 of its own width** in 7 frames (§11 — an action is a
      DISTANCE; under a third is a state change).
      *Arrival that costs something:* the latch ALMOST catches at f15, then the load inside kicks
      and the door **bangs back open 0.62 of the way**, throwing him off his feet. Dust puff, the
      van rocks on its springs and rings out damped (`sin(lf/3.1) * exp(-lf/26)`), the chained
      toolboxes at the hitch jump and clatter.
      He gets up and goes again — **the same failure twice inside one shot**, faster the second
      time. ⭐ Overlapping action (§13), never a stepped move: the shoulder leads, the leaf follows
      on one C1 ease, the rock and the dust lag and ring out.
    **B · f66-f120 (54f) — hard cut TIGHT INTO THE HOLD.** The reveal, and the whole point. What is
      in there is not his: the **EXPERT robe** on a hanger taking a third of the space, the red
      **DON'T** board bolted across, and **five toolboxes** chained through the floor ring. Behind
      them, the painted **LOAD LINE** is completely buried. The door hammers shut and springs open
      again OFF-SCREEN (the frame jolts, grit hops) so the action continues **through** the cut.
    **C · f120-f175 (55f) — hard cut WIDE.** Scale: the whole rank. **Nine identical vans** down the
      kerb, every one of them with its door bouncing open on the same beat, one after another down
      the line. Hero is small in frame now, still shoving. The rank is the background process.
      ⛔ Still no fix on screen.
  ⭐ **FRAME 0 CLAIM PLATE — the one measured IG-performance rule** (`feedback_frame0_claim_plate`).
      The plate is not an overlay, it IS the van's stencilled side panel, in the middle third,
      **≥18% of the panel** (target ~26%): **`~55K`** in Fraunces ≥74px, label
      `TOKENS BEFORE YOU TYPE ANYTHING`, source chip `ANTHROPIC · MANAGE TOOL CONTEXT`, the five
      real marks on white tiles in a row beneath, and the Claude mark on a white tile ≥130px.
      ⭐ ONE object, TWO gate results: `HOOK_PLATE` and `HOOK_LUMA` both ride on the van flank, so
      neither is riding on the DOOR — `THE-OPEN` "a gate carried by the wrong object deforms that
      object" is avoided by construction, and the door stays a dark silhouette on a bright sky.
  LIGHT:    Warm key from high-left. ⛔ The door and its load are the **DARK** side of the contrast
            against a bright sky and a bright flank. Say it out loud: the subject is darker than the
            field. No light-on-light (reel 110's failure).
  SFX:      f0 is the heaviest stack of the reel: `clap_slam + boom + sub`, `chain_clank` under it.
            f15 `dead_thud` (the latch missing) → f19 `bang_on` (the kickback). Cut→B `slate_whump`.
            Cut→C `rebuild_thud` + the rank's nine doors as pitch-descending `dead_thud`s.
            A transient lands ON every cut frame.
  TAKEAWAY: The door is not the problem. What is already in there is.

### SCENE 1 — f175 to f258 · 5.82-8.60s (2.77s) · LOCKED, LOW 3/4 · BEAT: THE PROMISE
  VO:       "So here are three Claude mistakes you need to fix right now."
  SET:      The depot shade, one plane back from the street. **Cool** north light, different hue AND
            lightness from S0's warm kerb.
  CAMERA:   Locked, push 1.04 → 1.12.
  BLOCKING: *Before:* the hold, shut, seen head-on. *Trigger:* Hero throws the door wide.
            *Travel:* the three offenders are **hauled out and set down on the kerb one at a time**,
            arrivals spread across the FULL 2.77s (f10 / f36 / f62 — never bunched in the first
            third, which cost a reel-104 scene 5.94). Each lands with a squash, a dust ring and a
            damped rock.
            *Arrival:* they stand in a row, and a **hand-painted 1 / 2 / 3** is chalked on the kerb
            under each as it lands — the number ARRIVES with the object, it is not typeset waiting
            for it (§4).
            Background process: the rank of vans behind keeps its doors bouncing, out of sync.
  ⭐ HIERARCHY MECHANISM: **ranked by SIZE.** The robe is the tallest, the DON'T board mid, the
            toolbox chain lowest and widest. The eye reads 1-2-3 without reading a word.
  SFX:      `gear_shift` (J-cut 0.12s early) → three `rebuild_thud`s, pitch descending, one per
            landing.
  TAKEAWAY: Three objects. Three tips. The reel's shape is now visible.

### SCENE 2 — f258 to f386 · 8.60-12.88s (4.28s) · LOCKED, THE DEPOT SCALE · BEAT: TIP 1
  VO:       "First, stop telling Claude to act like an expert. With the newest models, you're just
            wasting your context window."
  SET:      The depot scale, warm again, a hotter floor than S1 and a different key angle.
  ⛔ §3 TEST, run on the VERB: the sentence's verbs are **TELLING** and **WASTING**. A shot of a robe
     sitting on a hanger depicts neither. So:
  BLOCKING: *Before:* Hero hangs the EXPERT robe on the depot scale hook. It is genuinely bulky —
            velvet, mortarboard, tassel — and it fills the pan.
            *Trigger:* he lets go.
            *Travel:* ⭐ **the needle SWEEPS to its value and the number COUNTS UP WITH IT** — the
            robe's BULK is huge, so the volume gauge runs `0 → 31%` of the hold across 22 frames in
            four discrete stepped pops (§9: N discrete events beat one long tween) — and then the
            **worth** needle, right beside it, travels the whole dial and lands on **`0`**.
            *Arrival that costs something:* the `0` seats with a hard clack, the scale pan drops and
            rings out, dust off the pan lip.
            **The two needles in one frame ARE the sentence**: it costs a third of your window, it
            is worth nothing.
            Background process: the depot's roller shutter behind, half up, rattling in the wind.
  ⭐ The `0` is the whole scene. It is ~40% of the panel height and it is the only bright thing on a
            shaded wall. Hierarchy is the SPREAD.
  SFX:      `ratchet` on the hang → four `lamp_clunk`s, pitch rising, one per stepped pop →
            `adv_strike` on the `0` seating → `dead_thud` on the pan drop.
  TAKEAWAY: It is not that the costume is wrong. It is that you paid a third of the hold for it.

### SCENE 3 — f386 to f541 · 12.88-18.02s (5.14s) · LOCKED, INSIDE THE HOLD · BEAT: TIP 1 PAYOFF
  VO:       "Instead, spend those tokens telling Claude exactly where to find the sources and tell
            it to check its own work before finishing."
  SET:      Inside the hold, looking out at the bright street — the frame within a frame. Cool
            interior, hot doorway. ⭐ This is the reel's biggest value gap and it is free depth.
  ⛔ §10 test — which half of the mechanism is missing? The robe coming OUT is the INPUT. The scene
     must show the OUTPUT: what fits **because** it left.
  BLOCKING: *Before:* the third of the hold the robe occupied, now bare boards, load line visible
            for the first time.
            *Trigger:* Hero slides two flat things in off the kerb.
            *Travel:* ⭐ **the SOURCE MAP unrolls across the hold floor** — a real folded route map
            that opens to four times its packed size, with actual pinned destinations on it (a repo,
            a docs URL, a folder path) — and it lies FLAT, taking almost no height. Then the
            **CHECK BEFORE FINISHING** tag clips to the inside of the door on a lanyard and swings.
            *Arrival:* the load line is now clear by a wide margin, and a small green fill bar along
            the hold wall **retreats** from the line — a number moving to its value, downward.
            Background process: street traffic crossing the bright doorway, silhouetted, one van
            every ~40 frames.
  ⭐ NOT A CONTAINER: the map is not a box labelled "sources", it is a map with places pinned on it.
            The tag is not a label saying "check", its face is a three-line checklist that ticks
            itself, one line per beat, as the VO says "check its own work before finishing".
  SFX:      `paper_unroll` (layered `slate_whump` + `card_land`) → `lamp_clunk` on the clip →
            three soft `blip` ticks on the checklist → `arrive_chime` low.
  TAKEAWAY: Same space, better cargo. That is the entire trade.

### SCENE 4 — f541 to f637 · 18.02-21.22s (3.20s) · LOCKED, THE HOLD MOUTH · BEAT: TIP 2
  VO:       "Second, stop writing negative instructions like don't include numbers."
  SET:      Back out on the street, warm, but a NEW framing: square-on at the hold mouth, the
            SORTER Claude (prof) working a wall of numbered slots inside.
  BLOCKING: *Before:* the sorter working smoothly, posting parcels into slots at a steady clip —
            the background process is established BEFORE it is broken.
            *Trigger:* Hero bolts the red **DON'T** board across the mouth. It is a real physical
            obstruction, bolted, with visible fixings.
            *Travel:* the board swings down across 9 frames and the bolts drive home in three
            discrete hits.
            *Arrival:* the sorter's next parcel hits the board and stops dead.
            ⭐ THE BOARD'S FACE IS THE RECEIPT: it reads **`DO NOT USE MARKDOWN IN YOUR RESPONSE`** —
            Anthropic's own documented bad example, verbatim. Not a made-up "don't include numbers"
            placeholder; the frame is where the receipts live.
  SFX:      `mech_clank` on the swing → three `wrench_clank`s for the bolts, pitch descending →
            `dead_thud` as the parcel stops.
  TAKEAWAY: A negative instruction is a thing bolted across the opening.

### SCENE 5 — f637 to f713 · 21.22-23.77s (2.53s) · LOCKED, TIGHT ON THE SORTER · BEAT: THE COST
  VO:       "When you tell the model what not to do, it gets confused."
  SET:      Tight on the slot wall. The one scene with a genuinely COOL, low key — this is the dip
            before the fix.
  ⛔ §11: confusion is not a state change, it is a DISTANCE. Do not tint him blue and call it done.
  BLOCKING: *Before:* the sorter, parcel in hand, board in his face.
            *Trigger:* he reads it.
            *Travel:* ⭐ **his head turns across the full slot wall and back** — a real 2.6°+ sweep,
            not a wobble — the parcel goes halfway to slot 3, pulls back, goes to slot 7, pulls
            back, and he takes a full step in the wrong direction. The `LOOK` action loop, escalated.
            *Arrival that costs something:* he posts it into the **wrong slot** and the slot spits
            it straight back out at him. It bounces off his chest and drops. He looks at it.
            Background process: behind him, the queue of unposted parcels visibly stacking up, one
            arriving every 8 frames for the whole scene.
  ⭐ This is the reel's one genuinely funny beat and it is also the argument. Keep it clean: ONE
            body, ONE mistake, nothing else moving above knee height.
  SFX:      `chair_knock` on the double-take → `bonk` on the wrong slot → `dead_thud` on the drop.
            ⛔ ≤3 cues, it is 2.53s.
  TAKEAWAY: You did not make it careful. You made it hesitate.

### SCENE 6 — f713 to f822 · 23.77-27.39s (3.63s) · LOCKED, THE HOLD MOUTH · BEAT: TIP 2 PAYOFF
  VO:       "So say everything as a positive command, like write smooth flowing text paragraphs."
  SET:      Same framing as S4 — deliberately, so the SWAP is the only thing that changes and the
            eye reads it instantly. Warm key restored and hotter than S4.
  BLOCKING: *Before:* the bolted DON'T board.
            *Trigger:* Hero puts a bar under it.
            *Travel:* the board is levered off and **falls out of frame bottom**, and a green **DO**
            board drops into the same fixings from above. One out, one in, on the same axis, 11
            frames apart — a real swap, not a crossfade.
            ⭐ THE GREEN BOARD'S FACE IS THE OTHER HALF OF ANTHROPIC'S OWN PAIR, verbatim:
            **`YOUR RESPONSE SHOULD BE COMPOSED OF SMOOTHLY FLOWING PROSE PARAGRAPHS`**.
            *Arrival:* and the board is not just a sign — it has an **ARROW** on it pointing at ONE
            slot. The sorter's head snaps to it and he walks the parcel straight in, no hesitation,
            and the backed-up queue behind him **drains** across the rest of the scene, one parcel
            every 5 frames, each one going straight to a slot.
  ⭐ §10, the missing half: S4 drew the obstruction, S5 drew the confusion, and the OUTPUT is the
            queue clearing. A fix that does not visibly produce anything is a progress bar.
  SFX:      `ratchet` on the lever → `bamboo_crack` as it gives → `clap_slam` on the DO board
            seating → a run of `blip` ticks as the queue drains, accelerating.
  TAKEAWAY: Same instruction, pointed forwards. The hesitation is gone.

### SCENE 7 — f822 to f908 · 27.39-30.27s (2.87s) · LOCKED, LOW AT THE TOW HITCH · BEAT: TIP 3
  VO:       "Third, turn off automatic tool access."
  SET:      Ground level at the back of the van, camera low. The chain is at eye height and it is
            the biggest thing in frame.
  BLOCKING: *Before:* the **five toolboxes** on the chain, at rest, in shade.
            *Trigger:* the van pulls forward one length.
            *Travel:* ⭐ the chain snaps taut and **all five boxes are dragged bodily across the
            frame**, scraping, throwing sparks and grit, from x≈820 to x≈120 — a full-panel traverse
            by five objects each well over the 40px floor. This is the reel's motion peak by
            construction: many large objects travelling, with a light/shadow alternation as each
            box crosses the kerb's raking shadow.
            *Arrival:* the van stops, the boxes pile into each other and clatter, and the chain
            rings out.
            Each box carries a **real mark on a white tile** — GitHub, Slack, Sentry, Grafana,
            Splunk. ⭐ These are not a random five: they are Anthropic's own worked example.
  ⛔ The boxes must be ≥40px on the short side after the 1012→240 downsample, i.e. ≥170px drawn.
  SFX:      `chain_clank` on the snap → `construction` scrape bed under the drag →
            five `can_bong`s on the pile-up, pitch descending.
  TAKEAWAY: They come with you whether you use them or not.

### SCENE 8 — f908 to f1069 · 30.27-35.63s (5.37s) · LOCKED WIDE, THE ROUND TRIP · BEAT: THE COST
  VO:       "Usually Claude loads all of your connectors into the context with every message, so it
            burns thousands of tokens per session."
  SET:      The widest shot in the reel. The full street, the depot, the rank, the sky. Warm, hot,
            and the most saturated frame of the eleven.
  ⛔ §3 test on the VERB: the verbs are **LOADS**, **EVERY MESSAGE** and **BURNS**. A van driving
     past depicts none of them. So the scene is built as a CYCLE, not a journey:
  BLOCKING: *Before:* the van at the depot mouth, boxes chained on.
            *Trigger:* it pulls out.
            *Travel:* ⭐ **the same trip runs FOUR TIMES inside the scene** — out of frame right, in
            from frame left, out again — at f0 / f38 / f76 / f114, each pass faster than the last,
            and **the five boxes are dragged along on every single pass**. The repetition IS the
            phrase "with every message"; one pass would depict a delivery.
            ⭐ **A full-width high-contrast travelling band**: the kerb's raking shadow bars sweep
            the opposite way as the van crosses, alternating LIGHT AND SHADOW (§1 — a light-only
            band scores worse AND lifts the black point).
            *Arrival that costs something:* on each return the **fuel/token gauge on the depot wall
            drops one big stepped notch** — 4 discrete pops, not a smooth drain — and by the fourth
            pass it is in the red. The gauge is ~34% of panel height and it is the brightest thing
            on the wall.
            Background process: three depot Claudes on the loading bank, each on a different
            `costumeFor(i)` and a different action loop (PACE / WORK / LOOK), flinching as the boxes
            scrape past.
  ⛔ HONESTY: the wall gauge is labelled `PER SESSION`, never `DEFAULT`. See §0b.
  SFX:      four `gear_shift` + `construction` drag pairs, pitch descending per pass; four
            `lamp_clunk` notches on the gauge; `alarm` low on the fourth.
  TAKEAWAY: It is not one trip. It is every trip, and it is the same chain every time.

### SCENE 9 — f1069 to f1223 · 35.63-40.76s (5.13s) · LOCKED, THE LOCK-UP · BEAT: THE FIX (PEAK)
  VO:       "Now go to your settings and switch tool access to load tools when needed so you only
            pay for tools when they're actually used."
  SET:      **The lock-up.** The one genuinely dark set in the reel, and it is dark on purpose so
            the payoff is the only lit thing in it — `ANIMATION-QUALITY` §8: hierarchy needs
            DARKNESS, and a bright hall containing one lit thing has the biggest spread in the reel.
            A `WorldKit.Cone` off the roller shutter is the practical. ⛔ The dark stop is not
            lifted anywhere.
  BLOCKING: *Before:* the five boxes still on the chain, hero holding the hook.
            *Trigger:* he throws a **lever on the wall** whose brass plate reads, verbatim,
            **`LOAD TOOLS WHEN NEEDED`** — with the alternative position plate reading
            `TOOLS ALREADY LOADED`. Both are real in-product strings.
            *Travel:* ⭐ the chain **drops** and the five boxes are lifted, one at a time, into
            five lit **pigeonholes** in the lock-up wall — arrivals spread across the FULL 5.13s
            (f18 / f42 / f66 / f90 / f114), each with a squash, a ring and its own lit lamp coming
            up as it seats. Five DEPOT Claudes (`costumeFor(i)`) receive them, one per hole, each on
            its own action loop.
            *Arrival that costs something:* Hero rings the **call bell**, ONE box slides back out on
            a runner into his hand, and the other four stay dark in the wall. That single frame is
            the entire feature.
            Then the hold gauge, which has been in the red since S8, **drops to 15%** in one hard
            stepped move and a small plate seats beside it reading **`-85%`**.
  ⭐ §10: the INPUT is the lever, the OUTPUT is the one box coming back, and the SOURCE is the wall
            of four that stayed put. All three halves are on screen.
  ⛔ This scene and S0 are the reel's two density PEAKS (§9 — density is a SHAPE). Everything
            between them runs thinner on purpose.
  SFX:      `gear_shift` heavy on the lever → `chain_clank` on the drop → five `mech_clank`s, pitch
            rising, one per pigeonhole → `bell_ring` on the call → `coin_slide` as the box runs out
            → `arrive_chime` on `-85%`.
  TAKEAWAY: The tools did not go away. They stopped riding along.

### SCENE 10 — f1223 to f1338 · 40.76-44.61s (3.85s) · LOCKED, THE STREET · BEAT: CTA
  VO:       "I made a list of 15 mistakes to avoid in a free guide. Comment MISTAKE for access."
  SET:      Back out on the bright street, warmest and most saturated frame after S8. Morning has
            turned to full day — the reel's light has travelled.
  BLOCKING: *Before:* the van, door shut and LATCHED for the first time in the reel, the load line
            clear.
            *Trigger:* it pulls away clean.
            *Travel:* ⭐ **a crew of ten Claudes** arrives on the kerb in an 8-frame stagger, five
            columns at a computed pitch of ≥190px (⛔ `spacing ≥ 0.85 × (rA + rB)` — compute before
            adding count; 18 sprites at s=148 across 600px rendered as one orange mass), each on
            `costumeFor(i)` cycling **all twelve** costume levers, each on one of the four action
            loops at its own phase.
            *Arrival:* they set down a **guide** — a real bound document, not a card — and its
            cover counts up **`3 → 15`** in stepped pops as twelve more chalk marks land on the
            kerb beside the original three.
            The keyword **`MISTAKE`** lands last, stencilled, with a squash and a ring.
  ⛔ The Claude mark on a white tile is large and present here as it is at frame 0 — it is the
            audience filter, not decoration, and it is never on a sprite's face.
  SFX:      ten `rebuild_thud`s under the crew arrival, pitch descending; `gold_stamp` on `15`;
            `bell_ring` on `MISTAKE`.
  TAKEAWAY: Three fixed here. Twelve more in the guide.

---

## THE GATES THIS BOARD IS BUILT AGAINST

```bash
python3 tools/verify_reel.py out/121mistake.mp4 --words video/src/data/words_121mistake.json \
  --script "$(cat video/public/mistake_script.txt)" --music video/public/121mistake_bed.wav
python3 tools/scene_motion_audit.py out/121mistake.mp4 --scenes 0,175,258,386,541,637,713,822,908,1069,1223
python3 tools/look_audit.py out/121mistake.mp4 --scenes video/121mistake.intent.json
python3 tools/sfx_audit.py ...
grep -hoE 'boxShadow: *"0 0 [0-9]+px' video/src/Mst*.tsx | wc -l    # must be 0
```

| gate | bar |
|---|---|
| motion median | ≥ 9.00, and the WEAKEST scene reported BY NAME |
| scenes under bar | 0 ideal, 1-2/11 shippable |
| `HOOK_LUMA` | ≥140, **frame 0 only** |
| `BODY_SAT` / `BODY_BLACK` | ≥34% · p10 ≤35 |
| `HOOK_PLATE` | ≥18% (warn) — the van flank, ~26% |
| SFX cue rate | 1.0-1.5/sec ceiling, density PEAKED on S0 and S9 |
| shot floor | no shot under 0.7s (shortest here: S5 at 2.53s) |
| glow grep | 0 |
| trial-cut dHash | mean ≥14, **min ≥10** |
| length | **44.61s — FLAGGED, not trimmed.** In family with 115 (46.93), 113 (49.90), 116 (56.18) |

## Related
`docs/ANIMATION-QUALITY.md` · `docs/THE-OPEN.md` · `docs/TRIAL-CUTS.md` · `docs/SOUND-DESIGN.md` ·
`storyboards/STORYBOARD-SPEC.md` · `memory/MEMORY.md`
