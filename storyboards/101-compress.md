# STORYBOARD — REEL 101 COMPRESS (Stage 6)

> **Logline:** Everything your coding agent reads has to fit through one doorway and you are billed
> for every inch of it; a 66,006-star proxy presses that material to a fraction of its size before
> it reaches the door, and the answer that comes back is the same one.
>
> Format:   single dark panel · clone `ClaudeAppleReel.tsx` (reel 100) chrome verbatim — `Bg`,
>           `Panel`, `KaraokeCaption`, `ProgressBar`, `HookHeader`, clay `Mascot` from `SlopKit`,
>           `Scene`/`Cam`/`Room`/`Beam`/`Plate`/`Contact`/`Mark` from `AppWorld`.
> Arc:      TRANSFORMATION with an inanimate antagonist.
> Villain:  **THE METER** — the split-flap token counter over the door. Its RULE:
>           *it charges by volume and cannot read.* It has no opinion about what the text
>           means, only how much of it there is. That rule is literally true and it is the
>           whole reason compression costs nothing in accuracy. It is undefeated through S7
>           because everything that reaches the door is full size. It loses ONCE, at S8.
> Hero cast: the clay `Mascot` as the dock hand (glasses costume; `stern` S0-S3, `gaze` S4-S7,
>           `cheer` S12-S13). No second character. The material on the belt is the co-star.
>
> ⛔ **NUMBER SPINE** — in order, every one a real figure from the repo (verified live 2026-08-12):
>   `66,006 ★` / Apache-2.0 → `60-95%` (JSON & tool output) → `17,765 → 1,408 · 92%` →
>   `GSM8K 0.870 → 0.870 · ±0.000` → `10,144 → 1,260` + `same FATAL found` →
>   `ANTHROPIC · OPENAI · BEDROCK` → `headroom wrap claude` → `COMPRESS`.
>
> ⛔ **HERO ARTIFACT** — the **INGOT**: a pressed block stamped `[REF:id]` carrying `10,144 → 1,260`
>   on its face and the surviving answer chip `FATAL` beneath it. It must carry BOTH halves of the
>   promise in one object, because "smaller" alone is not the claim. It is what S8 lands and what
>   the CTA hands over. Everything else on screen is staging.

---

## THE SUBJECT, AND WHAT IS SOURCEABLE

**`headroomlabs-ai/headroom`** — 66,006 ★ · 5,041 forks · Apache-2.0 · Python · created 2026-01-07 ·
pushed 2026-08-12. Verified against the GitHub API today, not remembered.

The VO is quoting the repo's own tagline almost verbatim, which is how the subject was identified:

> README: *"Headroom compresses everything your AI agent reads — tool outputs, logs, RAG chunks,
> files, and conversation history — before it reaches the LLM. Same answers, fraction of the tokens."*
>
> VO: *"it compresses everything your AI agent reads before it reaches the LLM … so you get the same
> answers for a fraction of the tokens."*

## ⚠️ THE HONESTY LINE (settled before a pixel is drawn)

**The VO's "60 to 95%" is real, but it is not a Claude Code number.** The repo's own description
splits it: **60-95% fewer tokens for JSON**, **15-20% fewer tokens for coding agents**. The VO
attaches the 60-95% to "the same answers you're getting from Claude", which merges the two.

Per `docs/KICKOFF-PROMPT.md` §1 — dramatise the MECHANISM, stop at the edge of the claim. So:

1. **`60-95%` never appears on screen as a bare Claude Code figure.** Where the band appears (S2) it
   is drawn on the material it actually measures: a JSON blob and a tool-output dump, labelled as such.
2. **The screen leads with the repo's measured workload table instead**, which is both honest and
   stronger than the range: `17,765 → 1,408` (code search, 92%), `65,694 → 5,118` (SRE debugging,
   92%), `54,174 → 14,761` (issue triage, 73%), `78,502 → 41,254` (codebase exploration, 47%).
3. **"Same answers" gets a real receipt, not an assertion** — `GSM8K 0.870 → 0.870, ±0.000` and
   `TruthfulQA 0.530 → 0.560, +0.030` are the repo's published benchmark deltas. S3 puts the ±0.000
   on screen because that number, not the VO, is what proves the accuracy half of the claim.
4. **No invented pricing, no invented per-user savings, no "usage limit" figure.** The VO's "never
   hit your usage limits" is drawn as the limit column draining, with no number attached, because
   the repo publishes no such number.

**Nothing on screen claims Anthropic built, endorses or is connected to headroom.** The Claude mark
is on the DOOR (the API you are calling), never on the press and never on the ingot.

---

## The theme mapping table (`reel-theme-must-map-to-mechanic`)

Every row fills in and nothing has to be translated before it means something. A file read IS a
file read; a token count IS a token count; a doorway of fixed size IS a context window.

| on screen | what it actually is |
|---|---|
| the belt feeding the hall | your agent's context, rebuilt and re-sent every turn |
| the tall lit sheets on it, each showing real content | tool outputs, logs, file reads, RAG chunks |
| the token count printed in each sheet's corner | the tokens you are billed for |
| the doorway at the end, fixed size, Claude mark on the lintel | the API call / the context window |
| the split-flap counter above the door | your token bill |
| the red line up the column beside it | your usage limit |
| a sheet too tall to fit, jammed across the frame | hitting the wall |
| the press straddling the belt | headroom, the compression layer |
| its three heads, lighting one at a time | SmartCrusher (JSON) · CodeCompressor (AST) · Kompress-v2-base (text) |
| the ingot stamped `[REF:id]` | a compressed segment |
| the cabinet behind the press with a pull-out drawer | CCR: the originals kept locally, retrievable |
| the three plates over the far arches | ANTHROPIC · OPENAI · BEDROCK |

---

## Invariants locked before authoring (B2)

- ⛔ **ONE knockoff brand:** none. The subject is a real repo, so the marks are real: the Claude mark
  on the door lintel, the GitHub mark on the S1 plate. **No fictional company anywhere.**
- ⛔ **DISTINCT base object per scene** (no two scenes share a hero):
  S0 the jammed sheet · S1 the repo plate · S2 the workload table · S3 the accuracy pair ·
  S4 the press waking · S5 the sheet entering · S6 the ingot clearing the door · S7 the answer chip ·
  S8 the ingot face (HERO) · S9 the drawer of originals · S10 the three arches · S11 the wrap line ·
  S12 the limit column · S13 the CTA card.
- ⛔ **Camera:** locked by default. Exactly THREE scenes move, all motivated: S0-C the pull-back that
  reveals the queue, S6 the truck alongside the ingot as it clears the door, S12 the tilt up the
  limit column. Every other scene is a locked frame with a slow in-panel push (≤1.02×).
- ⛔ **The Mascot never touches the press.** He loads the belt and watches. The tool does the work;
  he is the viewer.

---

## SCENE CARDS

Frames are 30fps against `words_compress.json`. **Every cut frame is a measured word onset minus 4**
— the picture LEADS the syllable by 4 frames so its crossover, not its start, lands on the word.

`L = [0.0, 2.66, 8.48, 12.89, 15.80, 22.66]` · `CUT = 24.40` · `durationInFrames = 732`

---

### SCENE 0 — f0-76 (2.53s) · THREE HARD CUTS · BEAT: HOOK
  **VO:** "Stop using Claude Code without this one tool."

  ⛔ Authored to `docs/THE-OPEN.md`: three locked shots, each advancing the problem, a transient on
  every cut frame, and frame 0 already settled — the jam has ALREADY happened when the reel starts.

  **S0-A · f0-25 · LOCKED WIDE-TIGHT on the door.**
  SET: the intake hall, night. Concrete floor with a wet sheen, one hard overhead spot in a visible
  cone, the doorway dead centre at mid-depth with the Claude mark cast into its lintel. Depth planes:
  belt rail (fg) → jammed sheet (hero) → door frame → meter and column (bg) → hall wall with a second
  cone far back.
  BLOCKING: **frame 0 is complete.** A single monstrous sheet is wedged across the doorway, far too
  tall for it, lit from inside, `29,412 tokens` printed in its corner. The meter above reads a high
  number and its bottom flap is mid-fall. The red limit line is already lit. Nothing animates in for
  the first 8 frames except the flap and a slow amber pulse on the column.
  LIGHT: one direction, hard, from above-front. Hero sheet reads pale against a near-black hall.
  SFX: `impact_deep` + `sub` layered on f0 (the loudest hit of the reel) + a low amber hum bed.
  TAKEAWAY: *the thing you send is too big for the door you send it through.*

  **S0-B · f25-50 · HARD CUT, LOCKED CLOSE on the meter.**
  BLOCKING: the split-flaps run UP fast, four columns tumbling; the number climbs; the red line takes.
  A hard amber wash flickers across the flap faces. This is the villain's face, established once.
  SFX: `repeat(9)` flap ticks pitched up + `metal_riser` (RISER 1 of 2).
  TAKEAWAY: *you are billed for every inch of it.*

  **S0-C · f50-76 · HARD CUT, the reel's ONE pull-back.**
  CAMERA: dolly back and slightly up over 26 frames, revealing what was off-screen.
  BLOCKING: the belt runs away from camera stacked with sheet after sheet after sheet, no end in the
  frame. The Mascot stands small at the belt-side in the near-third, `stern`, looking up at the jam.
  TAKEAWAY: *and there is a queue behind it.*
  HOOK→NEXT: the queue has no end, so something has to change.

---

### SCENE 1 — f76-107 (1.03s) · LOCKED MEDIUM · BEAT: SETUP
  **VO:** "So this open source GitHub repo…"
  SET: same hall, camera turned 30° to the press bay — a steel machine straddling the belt, dark and
  asleep. Planes: belt (fg) → press body (hero) → door beyond → hall.
  BLOCKING: a plate drops into the light on the press flank and seats: the GitHub mark, `headroom`,
  `66,006 ★`, `Apache-2.0`. The star figure counts up over 9 frames and settles. Nothing else moves.
  LIGHT: the spot rakes across the press flank so the plate reads bright against dark steel.
  SFX: `slate_whump` + `pneu_thunk` layered on the seat; `counter-tick` ×4 under the count-up.
  TAKEAWAY: *there is a real, open, extremely popular thing that does this.*

---

### SCENE 2 — f107-174 (2.23s) · LOCKED, SLOW PUSH 1.02× · BEAT: SETUP
  **VO:** "…can help you save 60 to 95% fewer tokens…"
  SET: the rule bench along the hall wall, lit by a lower warm bounce — a different light and colour
  from S1 so the cut reads as a move, not a redress.
  BLOCKING: **the workload table builds as four physical bars**, not as typeset text. Each row is a
  sheet laid flat with its before-length in pale grey and its after-length in bright clay, the bright
  part visibly a stub:
  `CODE SEARCH 17,765 → 1,408` · `SRE DEBUG 65,694 → 5,118` · `ISSUE TRIAGE 54,174 → 14,761` ·
  `CODEBASE EXPLORE 78,502 → 41,254`. Rows land one at a time, 12 frames apart, each with its own hit.
  ⛔ The `60-95%` band is printed ON the two JSON/tool-output rows it actually measures, small, as
  their scope label. It is never a headline.
  LIGHT: warm bounce from below-left; the clay stubs are the brightest thing in frame.
  SFX: four `gold_stamp` + `metal_ping` pairs pitched up across the run.
  TAKEAWAY: *the saving is measured, per workload, and it is large.*

---

### SCENE 3 — f174-250 (2.53s) · LOCKED · BEAT: SETUP
  **VO:** "…for the same answers you're getting from Claude."
  SET: the accuracy alcove — a shallow niche off the hall, cool blue-grey key, the coldest scene in
  the reel. Distinct palette so it reads as a separate place.
  BLOCKING: two identical answer sheets hang side by side on a balance beam, one labelled `BASELINE`
  and one `HEADROOM`. The beam does not tip. Between them a plate settles: `GSM8K 0.870 → 0.870`
  with `±0.000` stamping in last and hard. A second, smaller plate follows: `TruthfulQA +0.030`.
  ⛔ This is the receipt for the accuracy half of the claim. It is the only place it is proved, so it
  gets its own scene and its own light.
  SFX: `temper_chime` ×2 on the two sheets, then a hard `gold_stamp` + `sub` on `±0.000`.
  TAKEAWAY: *the answer does not get worse. That is measured too.*

---

### SCENE 4 — f250-293 (1.43s) · LOCKED CLOSE · BEAT: TURN
  **VO:** "And the trick is that it compresses everything…"
  SET: inside the press bay, tight on the machine's intake mouth. Hot amber rim from within the press,
  the hall going black behind. The warmest scene so far.
  BLOCKING: the press WAKES — the intake iris opens, three heads light in sequence along its spine,
  each with its own label plate: `SmartCrusher · JSON`, `CodeCompressor · AST`, `Kompress-v2-base`.
  One head, then the next, then the next, 9 frames apart. Nothing enters yet.
  SFX: `pneu_thunk` on the iris, then three `mech_clank` pitched up on the heads.
  TAKEAWAY: *it is not one trick, it is a router with a press per content type.*

---

### SCENE 5 — f293-325 (1.07s) · LOCKED SIDE-ON · BEAT: TURN
  **VO:** "…your AI agent reads…"
  SET: side elevation of the belt at the press mouth, so height is readable against the door beyond.
  BLOCKING: a tall sheet rides in — its face carries REAL content, a stack trace over a JSON blob,
  `10,144 tokens` in the corner. The router head above it lights the JSON lamp and swings to meet it.
  The sheet enters the mouth and the frame holds one beat on the empty belt.
  ⛔ ONE subject moves: the sheet. The camera is dead still.
  SFX: belt hum bed + a `lib_whoosh` as the sheet passes camera.
  TAKEAWAY: *the thing being pressed is your actual file read.*

---

### SCENE 6 — f325-383 (1.93s) · TRUCK ALONGSIDE · BEAT: ESCALATE
  **VO:** "…before it reaches the LLM."
  SET: the run from press to door, shot along the belt. The door fills the far end, Claude mark lit.
  CAMERA: the reel's second and last lateral move — truck right alongside the ingot, matched to its
  speed so the ingot is pinned in frame and the hall streaks past. Motivated: we are following it.
  BLOCKING: the INGOT emerges — a dense bright block a fraction of the sheet's height, stamped
  `[REF:id]`. It travels, reaches the doorway, and **passes through with clear air above it.**
  ⛔ The meter above ticks up only slightly and does NOT lose here. The villain is intact.
  LIGHT: the door throws a hard bar of light across the belt that the ingot crosses.
  SFX: `lib_whoosh` under the truck, `pneu_thunk` on the press ejecting, `arrive_chime` as it clears.
  TAKEAWAY: *it is compressed BEFORE the API call, not after.*

---

### SCENE 7 — f383-409 (0.87s) · LOCKED CLOSE · BEAT: PAYOFF
  **VO:** "So you get the same answers…"
  SET: the return side of the door, a narrow shot, cool key returning after S6's warmth.
  BLOCKING: the reply comes back through the door as a single small chip and lands on the bench:
  `FATAL` — the same finding the uncompressed run produced. It seats with a hard stamp.
  SFX: `gold_stamp` + `sub` layered. One gesture, no run.
  TAKEAWAY: *the answer is the same answer.*

---

### SCENE 8 — f409-470 (2.03s) · LOCKED MACRO · BEAT: **THE PEAK** ⭐
  **VO:** "…for a fraction of the tokens."
  SET: macro on the ingot's face on the bench, the hall thrown fully out behind it. The brightest,
  highest-contrast frame in the reel.
  BLOCKING: **THE HERO ARTIFACT RESOLVES.** The ingot face carries, in order, each landing on its own
  frame: `10,144` ghosted and struck through → `1,260` settling in bright clay beneath it → the
  `FATAL` chip seating below both. Above, the meter's flaps STOP and settle on the smaller figure,
  the number it was going to charge still visible above it, struck.
  ⛔ **This is the only place the villain loses, and it loses exactly once.** It does not roll
  backward — a bill does not un-charge. It settles on a smaller number, which is the honest defeat.
  LIGHT: a hard key from front-left, deep shadow behind; the ingot is the only bright object.
  SFX: `metal_riser` (RISER 2 of 2, the reel's last) into a layered `lib_cinematic_hit` + `sub` on
  the settle, then `temper_chime` on the `FATAL` chip.
  TAKEAWAY: *a fraction of the tokens, and the same finding. Both, in one object.*

---

### SCENE 9 — f470-512 (1.40s) · LOCKED · BEAT: SETUP (the reveal beat)
  **VO:** "And the best part,"
  ⛔ The VO has a deliberate 0.68s pause after "part," (widened in the cut for R1). **That pause is
  this scene**, so the scene must carry a silent reveal or it will read as dead air.
  SET: behind the press — the CCR cabinet, a low steel unit in a pool of cooler light.
  BLOCKING: a drawer slides open on its own and the ORIGINALS are inside, whole and uncompressed,
  each tagged with the `[REF:id]` that matches an ingot. A single sheet lifts a few inches, showing
  it can be pulled back exactly. The plate on the drawer face reads `headroom_retrieve`.
  ⛔ This is the non-obvious beat and it belongs in the pause: nothing was thrown away.
  SFX: a slow drawer slide, then `pickup_chime` as the sheet lifts. Otherwise near-silence.
  TAKEAWAY: *nothing is lost. The originals are still here.*

---

### SCENE 10 — f512-558 (1.53s) · LOCKED WIDE · BEAT: ESCALATE
  **VO:** "…it plugs straight into your favorite AI providers…"
  SET: the far end of the hall opens out — **three arches side by side**, not one door. Widest frame
  since S0-C, and the first time the hall is shown to have more than one exit.
  BLOCKING: the three arches light one after another, 8 frames apart, each with its plate:
  `ANTHROPIC` · `OPENAI` · `BEDROCK`. The same belt forks and feeds all three. A mono line settles on
  the floor plate in the foreground: `headroom wrap claude`.
  ⛔ The Claude/Anthropic arch lights FIRST and is the largest — the mark is the audience filter.
  SFX: three `arrive_chime` pitched up, then a `am/paper-slide` as the wrap line sets.
  TAKEAWAY: *it is a drop-in proxy, not a rewrite, and it is not Claude-only.*

---

### SCENE 11 — f558-600 (1.40s) · LOCKED · BEAT: ESCALATE
  **VO:** "…so you never have to worry about…"
  SET: back at the belt head, but the light has changed — the amber alarm is off for the first time
  and the hall is lit cool and even. Same place, new state. **This is the only intentional set
  return in the reel, and it is a state change, not a repeat.**
  BLOCKING: the queue from S0-C runs again — but every item on it is now an ingot, and they pass the
  door in a steady rhythm with clear air above each one. The Mascot loads the belt, `gaze`, calm.
  SFX: a steady `pneu_thunk` run, 4 hits, evenly spaced. Rhythm is the point.
  TAKEAWAY: *the queue that had no end now clears.*

---

### SCENE 12 — f600-676 (2.53s) · TILT UP · BEAT: ESCALATE
  **VO:** "…hitting your usage limits ever again."
  CAMERA: the reel's third and final move — a slow tilt UP the limit column, motivated by following
  the fill.
  SET: the column beside the door, floor to ceiling, red line near the top.
  BLOCKING: the fill in the column DRAINS from just under the red line down to a low steady level and
  holds there while more ingots pass. The amber wash on the wall dies out as it drops.
  ⛔ **No number on the column.** The repo publishes no usage-limit figure, so the column is drawn
  as a state, never as a claim (see the honesty line).
  LIGHT: the red line stays lit the whole time — the limit does not move, your distance from it does.
  SFX: a descending drain texture, then `am/positive-chime` as it settles low.
  TAKEAWAY: *the ceiling did not move. You stopped running into it.*

---

### SCENE 13 — f676-732 (1.87s) · LOCKED · BEAT: CTA
  **VO:** "Comment COMPRESS and I'll send you the guide immediately."
  SET: the press bay, front on, the hall warm and working behind — deepest depth in the reel, with
  the arches lit far back so the CTA sits in a place, not on a plate.
  BLOCKING: a cream card seats front-and-centre in its OWN column with nothing crossing it
  (`reel-graphical-not-textual` — reel 82 shipped a CTA with a shadow across it). It carries the
  Claude mark, `COMPRESS`, and `THE GUIDE`. The Mascot steps in at the left third, `cheer`, and the
  keyword sets hard on the word. The `ProgressBar` reward unlocks here.
  ⛔ **HARD CUT ON THE KEYWORD.** Nothing after `immediately.` — f732 and out.
  SFX: `gold_stamp` + `lib_cinematic_hit` on the card, `stamp_press` on the keyword, `positive-chime`.
  TAKEAWAY: *comment COMPRESS.*

---

## THE ADVERSARIAL CRITIC PASS (§3 — run before build)

**Swipe points, second by second, 0-5s.**
- 0.0-0.8: the jam is already on screen, complete, with a red alarm. Nothing to decode. HOLD.
- 0.8-1.7: hard cut to the meter running up. New object, new scale. HOLD.
- 1.7-2.5: pull-back reveals an endless queue — the problem got bigger, not repeated. HOLD.
- 2.5-3.6: the repo plate + `66,006 ★` counting. First promise of a way out. HOLD.
- 3.6-5.0: the workload bars start landing with real before/after figures. HOLD.
  No second in the first five repeats a composition or a base object.

**Repeated base object.** Checked: fourteen scenes, fourteen distinct heroes (listed under Invariants).
The only set REPEAT is S11 returning to the belt head from S0-C, and it is deliberate — same place,
inverted state, different light. Flagged so a builder does not "fix" it by redressing.

**Payoff spent early?** No. The ingot's face is withheld until S8. S6 shows the ingot's SILHOUETTE
clearing the door but never its face, so the artifact is not spent before it is earned.

**Villain integrity.** The meter is on screen in S0-A, S0-B, S6 and S8. It wins in S0 (spiking), is
neutral in S6 (ticks up slightly), and loses exactly once, at S8. It never loses twice.

**Intensity curve.**
`S0 9.0 → S1 7.0 → S2 8.0 → S3 7.5 → S4 8.0 → S5 8.5 → S6 9.0 → S7 8.0 → S8 9.5 → S9 8.0 →
S10 8.5 → S11 8.5 → S12 9.0 → S13 8.5`
Peak **9.5 at S8** beats the hook's 9.0, and it lands at 63% through — late enough to be earned,
early enough that S10-S12 can escalate the consequence rather than restate the payoff. The shallowest
point is S1/S3 at 7.0-7.5, which is a dip and not a sag: it is 1.0s and 2.5s long respectively and
both are carrying the two receipts the whole reel depends on.

**The one soft spot, named.** S9 is a near-silent scene sitting in a VO pause. If the drawer reveal
does not read in under a second on a muted phone, the scene is dead air at the worst possible moment
— just before the last escalation. **Build note: the drawer must be open and the originals visible by
f484 (14 frames in), not at the end of the scene.** Re-check this on the first contact sheet.

## The three floors (§2)

1. **Every scene is a real place.** All fourteen name a floor, a light direction and 4-6 depth planes;
   six distinct locations (door mouth · press bay · rule bench · accuracy alcove · CCR cabinet ·
   the three arches) plus the belt head used twice by design, each with its own palette.
2. **Camera disciplined.** 3 moves in 14 scenes (S0-C pull-back, S6 truck, S12 tilt), all motivated;
   the other eleven are locked with a ≤1.02× in-panel push. One subject moves at a time throughout.
3. **The arc has a shape.** Transformation; villain undefeated until the peak; peak beats the hook;
   no belly sag.

## Related
`storyboards/STORYBOARD-SPEC.md` · `docs/THE-OPEN.md` · `docs/KICKOFF-PROMPT.md` ·
`memory/reel-theme-must-map-to-mechanic.md` · `memory/reel-motion-hierarchy.md`
