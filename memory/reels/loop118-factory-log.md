# REEL 118 "LOOP" — factory log

**Subject:** the GAUNTLET LOOP prompting technique. Three lines: set the task with a real
quality bar, fan the work out to builder subagents, and give each piece a SEPARATE critic with
fresh context that inspects the real output, names the biggest gap and sends it back.
**World:** THE GAUNTLET, a proving hall where work runs a line of judges and goes round again.
**Delivered:** 1022f / 34.11s · motion median 9.03, 0/15 under bar · look audit green ·
verify_reel 8/8 · sfx clean · dHash mean 25.4 / min 14.

## Sources, checked live 2026-08-21
- Named and popularised by **Matt Shumer**; the "Claude of Duty" demo is Claude Opus 5
  producing a playable browser shooter, ~**55,000 lines of Three.js**, from one prompt.
- **Boris Cherny**, creator of Claude Code: *"I don't prompt Claude anymore… My job is to
  write loops."*
- The mechanism: smallest independently judgeable pieces, a builder each, a separate critic
  each with fresh context, blind A/B against the bar where possible. The builder never grades
  itself.
- Reported cost: separate projects at $1,200 and $1,700. **NOT DRAWN** — see the ledger.

## The honesty ledger (lives in `LoopWorld.tsx`)
1. **No currency anywhere.** Two real figures exist but they belong to two *different*
   projects and the VO names no number, so a figure on screen would read as the cost of the
   build being watched. S11 draws the DRAIN and no money.
2. **No likeness of a real person.** The Cherny receipt is a split-flap board with six quoted
   words and a name plate.
3. `55,000` is the only big number and it is stamped on the game viewport, labelled as the demo's.
4. No speed/quality/"N× better" claim. `REJECT ×N → PASS` counts on-screen events.

## What the round-by-round actually cost

| round | the defect | the cause, measured | the fix |
|---|---|---|---|
| VO | 86.24s raw, **nine** `cut cut` markers and the last line run five times | — | eight keep ranges cut at 10ms-RMS silences (floor -61 dB), never whisper word times |
| VO | ×1.10 would have put the reel at 4.79 wps | 148 words / 34.05s = 4.35 already | **shipped at ×1.00**; in family with 116 BILL 4.38, 113 GO 4.23 |
| f0 | HOOK_LUMA 133.3 against 140 | wall + floor were the two large areas | lifted `intake`'s back2/floor only; `lip`/`grit` untouched, p10 held at 34 |
| sheet | **a black diagonal stick in ALL 15 scenes** | the occluder column was `dkh(c,0.64)` against a dark panel edge, so only its brace was visible | column 68→118px with a **lit face brighter than the wall**. Value, not geometry |
| sheet | the hook's build read as **shelving** | `tierH 46` vs `bw 150+22/tier` = square | tierH 64, base 116+15/tier → a 1:1.7 tower |
| sheet | the pulpits read as **mushrooms** | 68px column under a 148px box | 44px stem + a handrail across the front |
| sheet | **all 13 text chips restated their own header band** | S7's chip and S7's header were the same sentence | dropped every chip. Header + captions carry language, the picture carries marks and numerals |
| sheet | S6, a density PEAK, read empty | only 4/10 landed by mid-scene, no benches, crowd in the bottom fifth | arrivals finish by f54/80, ranks up, a bench per column |
| sheet | S10's build did not crest THE BAR | topped out at y319 under a bar at y274 | s 1.06 → 1.26, clears by ~62px |
| motion | median 5.82, 8/15 under bar | movers under the 1012→240 downsample floor | ticket 96→152, card 116→214, plug 122→196, MVP 236→306, guide 108→172 |
| motion | 6.99 | most scenes had no travelling band | the **return rail** added to every in-hall scene (14 total) |
| motion | 8.34 but **BODY_BLACK 35.3** | the rake's light side outweighed its shadow | dark band `o*0.72` → `o*1.16`, light → `o*0.86`. Motion up AND p10 back to 34.6 |
| sheet | the deepened rail read as **film sprocket holes** | a row of equal light/dark rectangles is a dashed line | loaded it: a thin chain plus 52×40 **carriers** every 136px |
| strip | the hook's tower was **cropped**, the punch cut "1 PROMPT", the arm was a **pole** | the frame strip found all three; the contact sheet had shown none of them | tower inboard, punch 1.26→1.12 with no translate, and the lever became a **PLUNGER** |

## ⭐ The three findings worth carrying forward
1. **⛔⛔⛔ A CONTACT SHEET AND A FRAME STRIP FIND DIFFERENT DEFECTS.** The sheet found the
   occluder, the container defects and the empty peak. It could not see that the hook's tower
   left the frame, that the punch cropped the claim, or that the connecting forearm was 216px
   of pole across the hero's chest — those need one scene at 10 frames.
2. **⭐ A THROW-LEVER CANNOT BE CONNECTED TO A SPRITE.** Its knob swings on a 136px radius, so
   the forearm is either ~190px long at one end of the throw or drawn through the body at the
   other. A **plunger** solves it geometrically (both arms come straight down) and reads its
   category better. Prefer props whose grip point stays near the hand.
3. **⭐⭐ THE RAKE'S SHADOW SIDE IS THE BLACK-POINT CONTROL.** Raising rake opacity to lift
   motion pushed p10 to 35.3 and failed the look gate. Weighting the DARK band above the light
   one raised motion further *and* put the black point back — the two are not a trade.

## ⛔⛔⛔ THE HOOK WAS REJECTED AFTER DELIVERY, AND THE GATES COULD NOT SEE IT

The shipped open passed everything: HOOK_LUMA 144.6, HOOK_PLATE 18.1%, motion
7.88 with no dead run, 0/15 scenes under bar. Alex: *"the hook scene is way too
boring here, it needs to be revised into more interesting concepts."*

⭐ **THE DIAGNOSIS HAS TO BE ONE SENTENCE ABOUT WHAT THE VIEWER WANTS TO LOOK AT**
(feedback_hook_simplicity's own test). Here it was: *a building getting taller is
a progress bar standing up.* You know the ending at frame 8, the tower and the
counter both say the single word "big", and nothing happens to anybody. No gate
in this repo can see that, and none should be expected to.

⭐⭐ **THE FIX IS A DIFFERENT MECHANISM, NOT A RESTYLED PROP.** The tower's
mechanism was GROWTH. Two candidates were built as full 96-frame cuts, each a
different mechanism from the tower AND from each other:

| | mechanism | image |
|---|---|---|
| A shipped | GROWTH | a tower rises, a counter rolls |
| **B chosen** | **a RETURN** | he hands work in and it comes back stamped, faster each time |
| C | a VERDICT | a press the size of the room refuses work that keeps getting better |

⭐ **AND THE SUBJECT WAS WRONG, NOT JUST THE STAGING.** The interesting thing
about the Gauntlet Loop is not that it builds something big, it is that **the AI
refuses its own work on purpose.** Both replacements open on the refusal and
leave "why is it doing that to itself" for the next line. Neither resolves to
PASS — a hook that resolves has spent the payoff at three seconds.
MEASURED: hook motion **7.88 → 12.14**, reel median **9.02 → 9.59**, and the
scene went from the weakest in the reel to the third strongest.

## ⛔ THREE THINGS THE HOOK REBUILD COST, ALL WORTH WRITING DOWN

1. **THE STAMP LANDED 82px BELOW THE PAPER.** *"the stamp doesnt land on the
   papers."* The paper sat at y386-574 and the stamp was authored independently
   at `top: 560 + slamK*96`. Two objects positioned from separate numbers and
   never checked against each other. ⭐ **The fix is an ANCHOR:** every
   coordinate in that scene now derives from `PX/PY`, the seated paper, so the
   tool cannot drift off the thing it strikes.
2. **A GATE CARRIED BY THE WRONG OBJECT, FOR THE THIRD TIME IN ONE REEL.** A
   claim plate was built into both hooks purely to hold up HOOK_LUMA, and it
   restated the header band directly above it. Alex: *"avoid having other text
   in the animation besides the header."* Removed; the brightness now comes from
   the ROOM and the bone-white work.
3. **THEN I WASHED IT OUT.** Replacing the plate's luma with a brighter room
   took the black point to p10 55 against a bar of 35 — §11 exactly: brightness
   is the MEAN, hierarchy is the SPREAD. ⭐ And the p10 panic was itself a
   misread: `BODY_BLACK` is a BODY gate. On the full reel the fourteen dark body
   scenes carry it and the delivered cuts measure **32.1 / 18.3 / 26.1**.
   ⛔ **Do not tune a body gate on a hook-only clip.**

⭐ **MEASURE ON THE ENCODED FILE.** The hook read 140.5 raw and 137.0 after the
E1 delivery encode — full-to-limited range costs 2-4 luma points, which is the
difference between passing and failing at the bar.

## Related
`storyboards/118-loop.md` · `docs/ANIMATION-QUALITY.md` §1 §5 §9 §11 §12 §13 ·
`docs/TRIAL-CUTS.md` · `memory/reels/star-factory-log.md` (the chassis this clones)
