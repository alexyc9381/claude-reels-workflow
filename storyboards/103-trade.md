# STORYBOARD — REEL 103 TRADE (Stage 6)

> **Logline:** Anthropic shipped ten named finance agents; three of them read the earnings call,
> track your whole portfolio, and build the valuation model — and the work lands on your desk for
> your sign-off before the bell.
> Format:   single dark panel · clone the **102 SEO** chassis (`Scene`/`Cam`/`Hall`/`BackWall`/`Lamp`, `ClaudeOsReel.Mascot`)
> Arc:      **value-first build-a-system, INTERNAL enemy, NO VILLAIN SCENE**
> Villain:  **NONE — deliberately.** [[feedback_outlier_lift_is_within_creator_only]] is measured:
>           *"External villains: rel-median 1.00 vs 1.00. Every breakout has NO villain."* The enemy
>           this reel runs on is the one the VO already states — an **ignorance gap**: *"ten new
>           agents that everyone's using incorrectly."* The pressure object is the **wall clock**
>           before the open; it is furniture, never a character, and it never wins a scene.
> Hero cast: one Claude per scene, **11 sprites / 11 distinct costume levers, zero repeats**
> ⛔ NUMBER SPINE:   `10 AGENTS` · `34,211★` · `APACHE-2.0` · `64.37%` (Vals AI Finance Agent, Opus 4.7) · `MAY 5, 2026`
> ⛔ HERO ARTIFACT:  **the OUT tray** — finished analyst work product, stamped `FOR REVIEW`, waiting on a human signature.

---

## 0. THE FACT-CHECK — what the picture may assert, and where it stops

Source of truth: `anthropic.com/news/finance-agents` (May 5, 2026, read live 2026-08-13) and
`github.com/anthropics/financial-services` (GitHub API: **34,211★**, **Apache-2.0**, Python,
created 2026-02-23, pushed 2026-08-04).

**VERIFIED — the picture may state these outright.**
- Exactly **ten** agent templates. Anthropic's own names, in its own two groups:
  *Research and client coverage* — Pitch builder · Meeting preparer · **Earnings reviewer** ·
  **Model builder** · **Market researcher**;
  *Finance and operations* — Valuation reviewer · General ledger reconciler · Month-end closer ·
  Statement auditor · KYC screener.
  ⭐ **The VO's three agents are Anthropic's own names, verbatim.** [[feedback_real_marks_are_the_props]]
  is satisfied for free — nothing on this reel needs translating.
- Earnings reviewer *"reads transcripts and filings, updates models, and flags thesis-relevant changes."*
- Market researcher *"tracks sector and issuer developments, synthesizes news, filings, and broker research."*
- Model builder *"creates and maintains financial models from filings, data feeds, and analyst inputs."*
- Two ways to run it: a **plugin** in Claude Cowork / Claude Code, or a **Claude Managed Agent**.
- **Claude Opus 4.7** *"leads the industry on Vals AI's Finance Agent benchmark, at **64.37%**."*
- Real connectors: FactSet · S&P Capital IQ · MSCI · PitchBook · Morningstar · Chronograph · LSEG · Daloopa.
- *"users stay firmly in the loop — reviewing, iterating on, and approving Claude's work before it
  goes to a client, gets filed, or is acted on."*

**⛔⛔ THREE VO CLAIMS THE PICTURE DELIBERATELY UNDER-STATES.** The recorded line stays as recorded
([[recording-beats-script]]); the PICTURE is what stops at the edge — the SEO precedent, where *"a
page reading 'analysis plugin' under a VO saying 'it fixes your website' would disprove the line in
the frame that speaks it."*

1. **"their most advanced trading model"** → there is no trading model. ⭐ But there IS a real model
   with a real finance credential, and the announcement names it: **Opus 4.7 at 64.37% on Vals AI's
   Finance Agent benchmark.** S0 shot C prints that, not a trading model. Nothing anywhere in the
   reel is drawn placing, routing or executing a trade.
2. **"everyone's using incorrectly"** → unbackable, and it is also the reel's internal enemy, so it
   stays in the AUDIO and is drawn as an *ignorance* picture (seven nameplates dark, three lit), never
   as anyone getting it wrong.
3. **"building trading bots ... making massive profits"** → ⛔ **the hard stop.** The repo's own README
   says these agents *"do not make investment recommendations, execute transactions ... every output
   is staged for human sign-off."* A P&L curve, a profit figure, a money prop or a bot placing orders
   would disprove the reel inside the frame that speaks it — and [[feedback_outlier_lift_is_within_creator_only]]
   independently forbids it: *"his numbers are FABRICATED ... Alex can steal the FORMAT but must make
   the number REAL/backable. That honesty IS the wedge."*
   ⭐ **So the peak spends its scale on the honest "massive": 34,211★, ten desks running at once,
   Apache-2.0, free to install.** Adoption is the real number; profit is not ours to print.
   ⛔ And no named firm (Citadel, BNY, Mizuho … are on Anthropic's page) appears anywhere near that
   line — putting a real company under a profit claim attributes it to them.

---

## 1. THE MAPPING TABLE (docs/THE-OPEN.md — every row must fill in)

| on screen | what it actually is |
|---|---|
| the announcement sheet, pinned, real | Anthropic's **real** May 5 2026 post — its own hero SVG, headline and date |
| ten brass nameplates over ten desks | the ten agent templates, under their real names |
| a bound transcript dropped into a slot | an earnings call transcript (Earnings reviewer's input) |
| a spike of clippings + a tape running | news, filings and broker research (Market researcher's input) |
| a ledger being ruled in cell by cell | the financial model in Excel (Model builder's output) |
| a HOLD / SELL paddle the viewer turns | *"so you can decide whether to hold the stock or not"* — the viewer decides, not the agent |
| the OUT tray, stamped FOR REVIEW | *"users stay firmly in the loop … approving Claude's work"* |
| the clock reading 9:2x | the time before the open the work has to beat |

No row reads "stands for". ⛔ **The instinct this world exists to refuse:** the subject is a trading
floor, so the default is neon-on-black with green candles — REEL-BUILD-LEARNINGS §1's single
most-reflagged failure. **THE MORNING DESK is a warm painted interior**: oak, green banker's glass,
paper, brass. Every lit surface is paper-toned. There is no glowing terminal in this reel.
⭐ Anthropic's own announcement art is `#D97757` on `#FAF9F5` — the house clay and cream already.
The real asset drops into this palette without a fight.

---

## 2. SCENE CARDS

⛔ Every `at` below is a **measured word onset** from `src/words_trade.json`, minus a 4-frame picture
lead. Stage is the measured panel band **y 118..726** (header pill owns 0..112, slug owns 730..792).

---

**SCENE 0 — 0.00 to 5.23s (157f) · FOUR HARD SHOTS · BEAT: HOOK**
  VO:       "So, Anthropic just updated their most advanced trading model this year, the update includes ten new agents that everyone's using incorrectly."
  SET:      **THE MORNING DESK.** Oak desk across the bottom third, green-shaded banker's lamp, a brass
            wall clock at 9:24, tall windows with the city still dark behind. 5 depth planes: window
            wall → panelled back → pinned announcement → desk top → foreground desk lip.
  CAMERA:   locked in all four shots; the mandatory in-panel push only. ⛔ each shot's `push` range
            starts on ITS OWN CUT — `Scene` reads `useCurrentFrame()`, which restarts per Sequence.
  BLOCKING: **A (f0-29) — THE ANNOUNCEMENT, REAL.** Alex's direct instruction: frame 0 carries the
            actual Anthropic post. Rendered from Anthropic's **own** assets — the real 1000×1000 hero
            SVG (`public/trade/anthropic_finance_hero.svg`), the real `ANTHROP\C` wordmark, the real
            kicker/headline/date, `#D97757` at 24px radius on `#FAF9F5` — so it is crisp at panel
            scale instead of an 800px screengrab blown up. Settled and complete at f0. One Claude
            reads it at the desk edge.
            **B (f30-55) — TEN.** Hard cut in. Ten brass nameplates drop onto the rail in a run, the
            real ten names, and the count plate hits `10`.
            **C (f56-82) — THE MODEL.** Hard cut. `OPUS 4.7` and the honest credential:
            `64.37% · VALS AI FINANCE AGENT`, the one number in Fraunces ≥74px.
            **D (f83-156) — WHO IS USING THEM.** Hard cut wide: ten desks, **seven dark, three lit** —
            the ignorance gap as a picture. Claude turns to camera on the lit three.
  LIGHT:    warm key from the lamp at frame left, cool fill from the windows; hero reads by LIGHTNESS
            (cream sheet on a mid-tone panelled wall).
  SFX:      f0 heaviest stack in the reel (impact + sub + slate); nameplate run ×10 pitched up;
            f56 stamp; f83 lights-on + thunk.
  TAKEAWAY: Anthropic shipped ten named finance agents, and almost nobody knows which three matter.

---

**SCENE 1 — 5.23 to 7.40s (65f) · WIDE · BEAT: SETUP**
  VO:       "But let me break down the only ones you need to know."
  SET:      **THE FLOOR**, seen whole for the first time — ten desks in two banks of five under a
            slatted ceiling, morning light through the window wall, the clock at 9:26.
  CAMERA:   locked wide, continuous push.
  BLOCKING: the ten nameplates hold; **three brass plates travel forward out of the rank** and set
            down large across the front — Earnings reviewer, Market researcher, Model builder. The
            other seven stay in rank and dim. ONE subject moves: the three plates.
  LIGHT:    even cool morning, the three lit desks warmer than the seven.
  SFX:      whoosh under the travel, three stamps on 5.36 / 5.9 / 6.4 pitched up the run.
  TAKEAWAY: three of the ten, by name, chosen for you.

---

**SCENE 2 — 7.40 to 8.17s (23f) · CLOSE · BEAT: ITEM 1 TITLE**
  VO:       "The first is the earnings reviewer."
  SET:      **BAY 1** — one desk, green lamp, a bound transcript squared on the blotter.
  CAMERA:   locked close, push.
  BLOCKING: the brass nameplate **EARNINGS REVIEWER** slams into its holder and rocks
            (`sin(lf/3.1)·exp(-lf/26)` — nothing lands and stops).
  LIGHT:    single warm lamp pool, everything outside it falls away.
  SFX:      layered brass strike (stamp + clank).
  TAKEAWAY: agent one has a name.

---

**SCENE 3 — 8.17 to 11.70s (106f) · MEDIUM · BEAT: ITEM 1 MECHANISM**
  VO:       "Paste in any earnings call and we'll break down exactly what executives said"
  SET:      **BAY 1**, tighter. The transcript, the slot, the marked-up output.
  CAMERA:   locked, push.
  BLOCKING: continuous arc, state A → state B the whole way — the transcript **feeds through**, and
            as it travels, quoted lines light up on it one at a time and pull out sideways as marked
            cards (`GUIDANCE RAISED`, `MARGIN`, `CAPEX`, `BUYBACK` — categories, not results for any
            real company). ⛔ The output is the tool's read of what was SAID; nothing recommends.
  LIGHT:    warm lamp pool; the lit quotes are the brightest thing in frame.
  SFX:      paper feed bed, four pickups on measured onsets 8.94 / 10.45 / 10.69 / 11.2.
  TAKEAWAY: it reads the primary source and tells you what was actually said.

---

**SCENE 4 — 11.70 to 13.70s (60f) · CLOSE · BEAT: ITEM 1 PAYOFF**
  VO:       "so you can decide whether to hold the stock or not."
  SET:      **THE DECISION** — hard top light, the marked cards fanned, a two-sided paddle on the desk.
  CAMERA:   locked, push.
  BLOCKING: **the viewer decides.** Claude sets the read down and steps back; the paddle turns to
            `HOLD` and holds. ⛔ The agent never chooses — the repo's disclaimer is explicit that it
            makes no recommendation, so the hand on the paddle is not Claude's.
  LIGHT:    the cleanest frame so far, hard key from above.
  SFX:      card fan, then one soft wooden turn on 12.08.
  TAKEAWAY: the call stays yours; the reading is done for you.

---

**SCENE 5 — 13.70 to 15.03s (40f) · CLOSE · BEAT: ITEM 2 TITLE**
  VO:       "The second is a market researcher."
  SET:      **BAY 2** — the wire desk. A tape running out of a machine, a spike of clippings.
  CAMERA:   locked, push.
  BLOCKING: nameplate **MARKET RESEARCHER** strikes and rocks; the tape keeps running behind it
            (the background process that stops this being one gesture in an empty shot).
  LIGHT:    cooler than bay 1 — a different room, not the same room re-lit.
  SFX:      brass strike + a ticker bed.
  TAKEAWAY: agent two has a name.

---

**SCENE 6 — 15.03 to 19.37s (130f) · WIDE · BEAT: ITEM 2 MECHANISM**
  VO:       "Give it your stock portfolio and it will give you every announcement, news story, and analyst rating on those stocks."
  SET:      **THE WIRE WALL** — a full-height board, the busiest frame in the reel.
  CAMERA:   locked, push.
  BLOCKING: a portfolio card of six holdings goes UP on the left; then three columns fill across the
            board in the VO's own order — **ANNOUNCEMENTS** (16.71) → **NEWS** (17.2) → **RATINGS**
            (17.72) — large cards travelling, not small ones appearing
            ([[feedback_scene_needs_an_arc]]: only LARGE × BRIGHT × FAST registers). The real
            connector names run along the foot as a source strip: FactSet · S&P Capital IQ · LSEG ·
            Daloopa · Morningstar · PitchBook.
  LIGHT:    cool overhead, warm rim from the desk lamp bottom-left so the board has a direction.
  SFX:      three column arrivals on their measured onsets, pitched up; tape bed underneath.
  TAKEAWAY: one card in, your whole coverage universe back.

---

**SCENE 7 — 19.37 to 20.43s (32f) · CLOSE · BEAT: ITEM 3 TITLE**
  VO:       "The third is a model builder."
  SET:      **BAY 3** — the modelling desk. A ruled ledger sheet, a mechanical pencil, a calculator.
  CAMERA:   locked, push.
  BLOCKING: nameplate **MODEL BUILDER** strikes and rocks; the ledger's first column is already ruling
            itself in behind it.
  LIGHT:    ledger-green shade over cream paper.
  SFX:      brass strike + one pencil tick.
  TAKEAWAY: agent three has a name.

---

**SCENE 8 — 20.43 to 24.53s (123f) · MEDIUM → FULL PANEL · BEAT: ITEM 3 MECHANISM**
  VO:       "Give it any stock and it will build you a full model based on what it's worth plus any risk it may have."
  SET:      **THE GRID** — the model becomes the whole panel ([[feedback_scene_needs_an_arc]]: making
            the hero output full-panel, not a window, measured 3.18 → 4.25).
  CAMERA:   locked, push.
  BLOCKING: the grid **builds cell by cell in a continuous sweep** — rows label themselves
            (`REVENUE`, `EBITDA`, `FREE CASH FLOW`, `WACC`, `TERMINAL`), the columns fill left to
            right, and at 22.97 the **VALUE** block lands, at 23.42 the **RISK** block lands beside
            it as a sensitivity square shading in. Real skill nouns (`dcf-model`, `comps-analysis`)
            on the tab strip.
  LIGHT:    brightest working scene; paper white against ledger green.
  SFX:      a run of eight ticks as the columns fill (ONE gesture), then two layered landings.
  TAKEAWAY: worth **and** risk, both, in one artifact.

---

**SCENE 9 — 24.53 to 27.67s (94f) · WIDE · BEAT: PEAK**
  VO:       "People are already building trading bots with these tools and making massive profits."
  SET:      **THE FLOOR, ALL TEN LIT** — the S1 room at its brightest; the peak must beat the hook.
  CAMERA:   locked, push.
  BLOCKING: every one of the ten desks strikes on in a run, each with its real nameplate and its own
            costumed Claude, output travelling down the line into **THE OUT TRAY** — the hero
            artifact — where it stacks and is stamped `FOR REVIEW`. The star plate climbs to
            **34,211★** and `APACHE-2.0` sets beside it.
  ⛔ NO profit figure, no chart going up, no money, no bot. The scale on screen is adoption and
    licence, both verified this morning. The header carries the honest claim.
  LIGHT:    every lamp on, warmest and brightest frame in the reel.
  SFX:      riser pre-rolled through S8's last second so its peak lands ON the cut, then the layered
            hero hit at 24.68 and a ten-step lamp run.
  TAKEAWAY: it is public, free, and already in production — and it still stops at your signature.

---

**SCENE 10 — 27.67 to 31.02s (101f) · CLOSE · BEAT: CTA**
  VO:       "If you want a full breakdown, just comment trade and I'll send it over."
  SET:      **THE OUT TRAY**, close. The stacked work product, the desk, the tray.
  CAMERA:   locked, push.
  BLOCKING: Claude sets the finished pack into the tray and slides it toward camera; the keyword
            plate **TRADE** strikes at 28.81 (comment) / 29.19 (trade) — ⛔ the HARD CUT lands ON the
            keyword ([[project_ai_niche_shortform]] script rules).
  LIGHT:    warm, low, close.
  SFX:      four beats, one cue each — never two cues and a hold.
  TAKEAWAY: comment TRADE, get the breakdown.

---

## 3. THE THREE FLOORS

1. **Every scene is a real place.** Eleven named locations, each with ≥4 depth planes, one light
   direction and real world props. `BackWall` carries a different STRUCTURE per scene — window,
   panel, slat, pegboard, shelf, tile, girder, brick — because reel 102 shipped ten scenes that were
   one room re-lit ten times, and no palette work fixes that.
2. **The camera is disciplined.** Move budget **zero**. Every scene locked; the only motion is the
   mandatory continuous in-panel push. One subject moves at a time.
3. **The arc has a shape and the peak beats the hook.**
   `HOOK 8 → SETUP 5 → 6 → 7 → 6 → 6 → 8 → 6 → 8 → PEAK 10 → CTA 7`. No belly sag: the two title
   beats (S2, S7) are the only dips and each is under 1.1s and immediately answered.

## 4. ADVERSARIAL CRITIC PASS

- *"S2, S5 and S7 are the same beat three times — a nameplate strikes."* **Held, with the fix:** they
  are three different DESKS with three different jobs on them (a transcript / a running tape / a
  ruling ledger), each already in motion behind the plate, and each in a different light. The
  repetition is the reel's spine — it is how a listicle counts — but the ROOM changes every time.
- *"The peak has no number, so it cannot beat the hook."* **It has three:** 34,211★, ten desks, and
  Apache-2.0, and it is the brightest and busiest frame in the reel. What it does not have is a
  fabricated one.
- *"Frame 0 is a screenshot, and Alex has rejected UI opens (reels 68, 85, 86)."* **Overruled by an
  explicit instruction on this reel** — *"use a real image of the anthropic article announcement"* —
  and it is also this subject's own object. The mitigation is staging: the post is a physical sheet
  pinned above a real desk in a real room with a Claude reading it, not a floating rectangle.
- *"Nothing is at stake."* Correct, and deliberate: the measured data says every breakout has no
  villain. The tension is the clock and the ignorance gap, both of which the VO already carries.
- *"The out tray is an anticlimax under 'massive profits'."* It is the **honest** climax, and it is
  Anthropic's own published mechanism. The energy comes from the ten desks striking, not from the tray.
