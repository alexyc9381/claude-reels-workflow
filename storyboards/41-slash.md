# Storyboard — Reel 41 SLASH (lower your bills)

Worked example of STAGE 6 (see `../SPLIT-SCREEN-FORMAT.md` + memory `reel-storyboard-process`). Split-screen, so every card has a **STORY (top)** and **PROOF (bottom)** column. The **WHY** lines are the point — they are the design decision made on paper before any Remotion.

**Number spine (locked, identical everywhere):** bill `$89.99` · new-customer `$49.99` · gap `$40/mo` · chips $40/$25/$8 = `$73/mo` = `$876/yr` · hook claim `$500/yr` (deliberately UNDER the receipts so it reads honest).

**Beat map** (from `L = [0, 2.71, 10.87, 19.13, 22.81, 28.27, 33.37]`, VO 36s):

---

### S0 · HOOK · 0–2.7s · "Claude can help you lower your bills by $500 a year"
- **Takeaway:** your bill is silently overcharging you and Claude kills it. (Plus: stop the scroll.)
- **STORY:** a **villain bill** (angry face, $89.99) *eats your money* → a **ninja Claude mascot dashes in and katana-slashes it** in half → coins burst back out → `−$500/yr` slams.
  - **WHY:** the hook has to be a pattern interrupt with instant stakes. Rejected (a) a bill sitting there getting a red ✗ — no motion, no stakes, boring; (b) a calm "here's a tip" open — no scroll-stop. Chose the villain-slash because it delivers all three in <1s: **stakes** (it's robbing you = coins sucked in), a **hero + satisfying payoff** (ninja slash + money returns), and **motion at frame 0** (lunge). Ninja+katana makes the "SLASH" keyword literal and fun.
- **PROOF:** the real xfinity bill, `$89.99` circled red + "$40/mo TOO HIGH" sticker. **WHY:** the claim needs one real receipt on frame 0 so it's not just cartoon — the ramitsethi money-lane only transfers with a real dollar on screen.
- **Escalation:** n/a (opener) — but the max-energy frame (the slash flash) fires ~0.8s AFTER the claim reads, per CLAIM-BEFORE-SPECTACLE.
- **Gag/SFX:** lunge = boing; slash = `slash.wav` + **vine boom** + flash + shake.
- **Mute check:** ✅ circled $89.99 + "$500/yr" + a bill getting sliced = "cut my bill by $500."

### S1 · THE GAP · 2.7–10.9s · "Give it your last three bills… it digs up what each company gives new customers for the same thing, side by side"
- **Takeaway:** Claude finds the gap between what YOU pay and what NEW customers pay.
- **STORY:** 3 bill sprites (internet/phone/insurance) fly in → a **balance scale** weighs `$89` (heavy, sinks) vs `$49` (light) → "same plan 🤨".
  - **WHY:** the idea is a *comparison / imbalance*. A scale is the universal symbol for "these should be equal but aren't" — glanceable on mute, and it's a **distinct base object** (not reused anywhere else). Rejected two bars side-by-side (reads as a chart, less characterful) and a tug-of-war (unclear who's who).
- **PROOF:** real **claude.ai chat** — 3 PDFs dropped in, the gated prompt typing, then the `$89.99` vs `$49.99` side-by-side card + "you overpay $40/mo". **WHY:** this is the "pretend prompting" credibility beat; the side-by-side lands exactly on the word "like this."
- **Escalation:** from one bill (hook) → all three + a mechanism.
- **Gag/SFX:** file-drop whooshes; reveal ding; magnifier scan glow (detective mascot).
- **Mute check:** ✅ scale tipping $89 vs $49 = "you overpay."

### S2 · IT CREEPS UP · 10.9–19.1s · "Prices creep up each year… you pay $89 for the plan they sell new customers for $49. Your insurance renewal does the same thing."
- **Takeaway:** the gap is on purpose — loyalty tax that grows every year, across every bill.
- **STORY:** the WIFI bill sprite **grows into a bloated red villain** year by year (2022→2026, +$10 ticks) while a happy mint "$49 NEW GUY" watches; a purple **GEKKO villain** joins for insurance.
  - **WHY:** the idea is *growth over time = getting worse*. A literally-growing monster is the clearest mute metaphor for "creeps up," and turning the bills into **colorful named villains** (knockoff GEKKO) makes an abstract "loyalty tax" into characters you root against. Rejected a rising line-chart on top (too clinical — that's the PROOF job) and stacking coins (doesn't show "same plan, more money").
- **PROOF:** the price-creep **line graph drawn on the real bill** ($49→$89) + a GEKKO **renewal card** ticking $118→$143. **WHY:** the graph is the sober receipt for the fun monster above it; the two screens say the same thing in two registers.
- **Escalation:** biggest, longest beat — the villain literally gets huge; the counter climbs; a pixel-hero cameo flies by.
- **Gag/SFX:** boings on each growth step; **vine boom** when GEKKO lands.
- **Mute check:** ✅ bill monster ballooning next to a happy $49 = "it keeps growing."

### S3 · WORST FIRST · 19.1–22.8s · "So it ranks your bills, biggest gap first, and tells you which call to make tonight"
- **Takeaway:** Claude triages — attack the biggest overcharge first, tonight.
- **STORY:** a **podium**: WIFI (crown, worst) on #1, insurance #2, phone #3; a **judge mascot** with a gavel.
  - **WHY:** the idea is *ranking / worst-first*. A podium is the instant visual for "ranked," and a crown on the worst offender + a referee makes it playful and clear. Distinct base object. Rejected a sorted list on top (that's the bottom screen's job — top must be symbolic).
- **PROOF:** the ranked list, "total leak $73/mo · $876 a year" + "CALL TONIGHT" flag on #1.
- **Escalation:** from "there's a gap" → "here's the plan of attack," a call to make TODAY (urgency).
- **Gag/SFX:** podium hops (pops); **vine boom** on the crown; paparazzi flashes + crowd cheer.
- **Mute check:** ✅ crowned bill on a #1 podium = "the worst one."

### S4 · THE MAGIC WORDS · 22.8–28.3s · "It writes the word-for-word call, down to the threaten-to-cancel line that gets the price dropped. You just read it out loud."
- **Takeaway:** Claude hands you the exact script; you just read it and the price drops.
- **STORY:** the mascot (in a **suit**) reads a glowing **CALL-SCRIPT scroll** at a sweating **XFINITY HQ** tower whose price tag flips `$89.99 → $49.99`.
  - **WHY:** the idea is *negotiation with a script that wins*. A negotiator + the opponent's building visibly caving (price tag drops, HQ sweats) dramatizes "gets the price dropped" as a win you can see. Rejected showing the raw script text on top (text-heavy; and we GATE the actual words) — the scroll is a prop, the words stay blurred.
- **PROOF:** gated call-script chat, the "threaten-to-cancel" magic line **blurred** behind the comment gate.
- **Escalation:** the payoff of the plan — the number actually drops on screen.
- **Gag/SFX:** typing; **cash-register** on the drop; speech-wave arcs hitting the HQ.
- **Mute check:** ✅ price tag flipping 89→49 = "it gets the price dropped."

### S5 · EVERY MONTH · 28.3–33.4s · "And the best part, it rechecks every bill every month, because these prices always creep back up"
- **Takeaway:** it's not one-and-done — an agent guards you forever.
- **STORY:** a **cop mascot** in a **radar/calendar ring** sweeps, a price tries to creep back up and gets **zapped** (+ "ow!").
  - **WHY:** the idea is *ongoing patrol*. A radar/sentry is the clean symbol for "watches continuously," and catching a sneaky creep-back is a satisfying loop-closer. Distinct base object. Rejected a looping arrow/refresh icon (too abstract, low-craving).
- **PROOF:** the monthly re-check panel — Vorizon creep caught → re-filed ✓.
- **Escalation:** from a one-time fix → a permanent guardian (the "best part" peak).
- **Gag/SFX:** bonk + boing on the zap; radar sweep beeps.
- **Mute check:** ✅ a cop radar zapping a creeping bill = "it keeps watching."

### S6 · CTA · 33.4–35.9s · "Want all four prompts word for word? Follow and comment SLASH."
- **Takeaway:** the ask — comment SLASH for the guide.
- **STORY/PROOF (single panel):** giant **SLASH** wordmark + gold slash strike, the guide card (3 checks tick), "save this" + "comment SLASH" pills, mascot cheering; the progress-bar gift **opens into the guide**.
  - **WHY:** keep it simple (Alex's rule) — one clear ask, the reward gift paying off the stay-to-end promise. The 4 `PROMPT n/4` chips ticked through the reel earn the "all four prompts."
- **SFX:** **vine boom** on the wordmark slam + sparkle.
- **Mute check:** ✅ "comment SLASH" pill unmissable.

---

## Board-level continuity checks (run before building)
- **Number spine:** ✅ 89.99 / 49.99 / 40 / 73-mo / 876-yr identical top & bottom; $500 hook under-claims (honest).
- **No repeated base metaphor:** ✅ slash / scale / monster / podium / negotiation-tower / radar / wordmark = 7 distinct heroes.
- **Escalation curve:** hook spike → gap (mechanism) → creep (biggest, villain balloons) → rank (plan) → script (payoff drops) → monthly (permanent guardian = peak) → CTA. Rises, no mid-sag.
- **Hook = pattern interrupt:** ✅ frame-0 lunge + money-eaten + fast ninja slash.
- **Top = symbols, bottom = real UI:** ✅ enforced.
