# STORYBOARD — REEL 126 USAGE (Stage 6)
> **Logline:** the same token buys ten times the work, because three free repos each cut a
> different part of what a Claude Code session actually costs — the RATE you pay, the VOLUME you
> send, and the tokens you pay for TWICE.
> Format:   single dark panel · chassis cloned from reel 124 MEM (`ClaudeMemReel` / `MemWorld` /
>           `HwWorld`). ⛔ ONE panel. Never dual-screen.
> Arc:      VILLAIN (`THE DRUM`) — undefeated. It is slowed three times and it never stops.
> Villain:  **THE DRUM** — the meter's counter drum. Its RULE: **it only turns one way.** It is
>           never argued with and never beaten; at S14 it is still turning, at a crawl. That is the
>           honest shape of this subject — these repos make a session cheaper, never free.
> Hero cast: one CLAY hero (`constr` in the supply room, `glasses` at the grille, `cop` at the
>           cradle); crews of 4-6 at S1 / S9 / S14, costumes cycled deterministically.
> ⛔ NUMBER SPINE:  `★2,254 · $0.87 vs $15` → `★101,494 · 65%` → `$9 · ★31 · 45%` → `USAGE`
> ⛔ HERO ARTIFACT: **THE TOKEN** — a stamped brass disc, ~76px, Claude mark on the face, milled
>                   edge. It is the unit of everything: the hook spends one, the supply room
>                   re-prices it, the grille stops most of them leaving, the cradle stops a
>                   thousand of them being spent twice, and the gate takes one at the end.

---

## THE HONESTY LEDGER (verified live 2026-08-28, before a frame was drawn)

Three repos, each fetched from GitHub's own API and README on the day of the build.

| on screen | what it actually is | sourced? |
|---|---|---|
| the feed main swung off the `$15` hopper onto the `$0.87` one | **deepclaude** sets `ANTHROPIC_BASE_URL` per session so Claude Code's own agent loop talks to DeepSeek instead of Anthropic. DeepSeek V4 Pro **$0.87/M output** against Anthropic **$15.00/M output** | ✅ repo README |
| `★2,254 · MIT` on that plate | github.com/aattaran/deepclaude, 2,254 stars, MIT | ✅ GitHub API |
| the grille that stops words and passes code | **caveman** — *"code, commands, and errors stay exact"* while the prose is compressed | ✅ verbatim |
| `65% FEWER OUTPUT TOKENS` | the repo's own benchmark table: **65% average** output-token reduction, per-task range 22-87% | ✅ repo README |
| `★101,494` on that plate | github.com/JuliusBrussee/caveman | ✅ GitHub API |
| the hot block that goes cold in the cradle, and the `$9` on the drum | **super-token-saver** — *"$9 silent cost spike: single cache expiry re-send at 900K tokens"*; the prompt cache TTL is 1 hour and Token Guardian trips at **3,590s** idle | ✅ repo README |
| `★31 · APACHE-2.0` on that plate | github.com/ww-w-ai/super-token-saver | ✅ GitHub API |

### ⛔ THE THREE THINGS THE VO SAYS THAT THE FRAME MUST NOT

1. **"10x your usage"** is the hook's rhetoric and no repo claims it. The picture shows the
   MECHANISM — one token in, more work out — and every plate carries that repo's **own** figure
   (17x on output price · 65% on output tokens · 45% on a measured day). Nothing on screen prints
   "10x" as a result.
2. **"cuts your token usage by 65%"** — 65% is **output tokens only**, on the repo's own benchmark.
   The repo says so itself: *"The skill only shrinks output tokens. Input and reasoning tokens are
   untouched... Whole-session savings run smaller than the output number."* So the plate reads
   `65% FEWER OUTPUT TOKENS · REPO BENCHMARK`, and the grille visibly lets the INPUT side through
   untouched — the honest caveat is drawn, not written.
3. **"only pay 75% less"** — no source anywhere for 75%. `R.caveOut` is 65% and that is the only
   figure the drum steps down by. ⛔ `75%` is on the banned-string list.

⛔ **"COMPLETELY FREE" IS TRUE OF THE REPOS, NOT OF THE USAGE.** All three are free and open
source; a session still costs money. That is exactly why THE DRUM is never beaten — the reel ends
on a drum turning slowly, not a drum stopped. The claim and the picture agree.

---

## THE WORLD — **THE METER HOUSE**

A hot, cramped brass-and-iron utility house where a Claude Code session is physically metered and
paid for in stamped brass tokens. Not a shop, not a bank, not a library: everything here is
**PLUMBING AND METERING**, and the whole reel is one continuous walk from the supply main at the
back of the house, along the run, to the drain under the floor.

⭐ **Why this world and not a bill.** Reel 116 BILL already did the paper-bill world, and a bill is
a RESULT. This subject is a MECHANISM with three distinct places in it — where the supply comes in
(rate), where the output leaves (volume), where it is lost (waste) — and a meter house is the one
building that has all three as separate rooms. Every scene is a different room of the same house,
which is also how the reel gets a new light every 2-4s without changing subject.

**Depth planes (every scene, `Surface`):** ceiling haze → far brick wall with its own pipework →
mid rank of standpipes/valve wheels → the working floor the hero stands on → **a foreground mass
cropped by the panel edge** (a riser, a valve body, the drum housing). ⛔ The last one is the check
for "is this a place or a backdrop".

**Light and colour, room by room** — neighbours differ in hue AND value:

| scenes | room | light |
|---|---|---|
| S0 | **the pay hatch** | bone wall, hard cold key, one lit disc — built for frame-0 luma ≥140 |
| S1 | **the rack** | teal, low raking |
| S2-S3 | **the drum housing** | hot sodium from below, black ceiling — the villain's room |
| S4-S5 | **the supply room** | cold steel-blue, one lamp over two hoppers |
| S6 | **the run** | brass + warm, the pipe going somewhere |
| S7-S9 | **the outlet / the grille** | cream-lit, brightest section in the reel |
| S10-S11 | **the cradle** | ember orange, the block glowing |
| S12 | **the cold cradle** | dead slate, the only near-monochrome scene |
| S13 | **the cradle, re-lit** | ember again, hotter |
| S14 | **the gate** | clay + gold |

---

## SCENE CARDS

*(timings are filled from the measured word onsets of the CUT VO — see `L` in
`video/src/ClaudeUsageReel.tsx`. Every onset is derived by `tools/usg_scenes.py`, never typed:
`feedback_the_audit_scene_list_drifted`.)*

### SCENE 0 — **HOOK** · LOCKED WIDE, ONE FRAMING
> ⛔ Authored to `docs/THE-OPEN.md`. **A CUT IS NOT AN EVENT** — ONE framing in which one thing
> happens, not four posters. Three hook worlds are rendered at full chassis quality and one is
> picked before the body is polished.

- **VO:** *"So you can now 10x your Claude usage for completely free with these three GitHub repos."*
- **THE EVENT (four parts):** **before** — one hero, dead centre on a lit disc, nothing else on the
  floor, holding ONE brass token at a pay hatch. **trigger** — he posts it; the hatch returns one
  small crate. **travel** — three plates fire in from off-frame and seat into the hatch face
  one-two-three, each with its own recoil. **arrival that costs something** — he posts the SAME
  token again and the hatch dumps a column of crates that buries him to the shoulders, arms out.
- **WHY THIS AND NOT A BILL:** the VO's promise is *more usage for the same money*, not *a smaller
  bill*. §3 says draw the noun and the verb the sentence uses — the noun is USAGE and the verb is
  10x, so the picture has to show the same coin buying more, which a falling number cannot.
- **CAMERA:** locked. In-panel push 1.00 → 1.055 only.
- **MUTE TEST:** with the sound off you see a man pay once, get almost nothing, three things get
  bolted on, and the same payment bury him. That is the whole reel.

### SCENE 1 — SETUP
- **VO:** *"They take seconds to install and can save you hundreds of dollars per month."*
- **SET:** the rack. **EVENT:** the three plates are seated into a rack rail by a crew, and a
  sweep-hand dial on the rack face crosses `0:03` while they do it — the "seconds" is the picture,
  not a caption.

### SCENE 2 — TITLE 1
- **VO:** *"Now first is the DeepSeek API plugin."*
- Plate 1 lands and lights: the real DeepSeek mark, `deepclaude`, `★2,254 · MIT`.

### SCENE 3 — THE PROBLEM · **THE DRUM**
- **VO:** *"Claude is amazing, but its API gets expensive fast."*
- **EVENT:** the drum housing. The counter drum spins up; the hero grabs the brake handle with both
  arms and is dragged around by it. Tokens pour out of the hopper above him and past him into the
  drum. **The villain is introduced by beating him.**

### SCENE 4 — THE FIX · THE SUPPLY
- **VO:** *"So you can install this one tool that points Claude Code directly at DeepSeek."*
- **EVENT:** the supply room, two hoppers side by side stamped `$15.00/M` and `$0.87/M`. He
  unbolts the feed main from the first and **swings the whole main across** onto the second; it
  drops, locks, and the line pressurises the other way. ⭐ the VERB in the line is *points*, so the
  picture is a pipe being AIMED at a different thing.

### SCENE 5 — THE PAYOFF
- **VO:** *"You get the power of Claude for pennies."*
- **EVENT:** same machine, same crate out, and the drum now ticking one digit where it was blurring.
  He catches the difference in his hands: a fistful of notes becomes three coins.

### SCENE 6 — TITLE 2
- **VO:** *"Second is the caveman plugin."*
- Plate 2 lands: `caveman`, `★101,494`, the repo's own rock mark.

### SCENE 7 — THE PROBLEM · THE OUTLET
- **VO:** *"This forces Claude to remove all the filler words that make the AI talk like a caveman"*
  (exact wording pinned from the isolated span).
- **EVENT:** the outlet chute vomits a torrent of loose word-blocks and a few solid CODE bars mixed
  in; everything goes over the meter and the drum climbs.

### SCENE 8 — THE FIX · THE GRILLE
- **VO:** *"…and it cuts your token usage by 65%."*
- **EVENT:** a heavy grille drops across the chute. The loose word-blocks pile up against it; the
  solid CODE bars pass straight through the slots untouched. ⛔ **The honest caveat is in the
  staging:** the INPUT line entering from the left is not touched by the grille at all, and it is
  visibly still running. Plate: `65% FEWER OUTPUT TOKENS · REPO BENCHMARK`.

### SCENE 9 — THE PROOF
- **VO:** *"And the output stays the exact same, only pay 75% less."*
- **EVENT:** the crate that comes out the far side is opened and it is identical to the one from
  S0 — same contents, same stamp. Plate: `CODE · COMMANDS · ERRORS STAY EXACT`.
  ⛔ **`75%` NEVER APPEARS.** The drum steps down by the sourced 65%.

### SCENE 10 — ESCALATE
- **VO:** *"But this third repo is the most powerful."*

### SCENE 11 — TITLE 3
- **VO:** *"Third is Token Saver."* — plate: `super-token-saver`, `★31 · APACHE-2.0`.

### SCENE 12 — THE PROBLEM · **THE COLD CRADLE** (the reel's darkest scene)
- **VO:** *"When you code with an expired cache it can cost you $9 in a single prompt."*
- **EVENT:** a huge glowing block sits in a cradle — this is the session context, kept hot. A dial
  on the cradle reaches `1:00:00`. The heat dies out of the block from the bottom up, it goes
  grey, and it **CRUMBLES to gravel**. The hero has to shovel every piece back in from scratch, and
  the drum rockets to **`$9.00`**.
- ⭐ **This is the scene the whole reel is built around** — it is the one mechanism a viewer has
  felt and cannot name.

### SCENE 13 — THE FIX
- **VO:** *"So this free repo runs in the background and finds when your cache expires, fixing it
  and saving you thousands of tokens each time."*
- **EVENT:** the same cradle. The dial climbs again; before it lands, a guard arm swings a shutter
  over the cradle mouth and **latches**. The block stays lit. The drum does not move.
  ⭐ The verb is *finds*, so the arm has to be seen HUNTING first — it tracks along the rail,
  stops over the cradle, then acts.

### SCENE 14 — CTA
- **VO:** *"Comment USAGE for the free guide."*
- Hard cut on the keyword. `USAGE` struck into a brass plate at the gate.

---

## THE ADVERSARIAL CRITIC PASS (mandatory)

| check | verdict |
|---|---|
| **Swipe points 0-5s** | 0-1s a man is paid-out almost nothing (recognition) · 1-2s three plates fire in (interrupt) · 2-4s the burial (payoff promise). No second re-states the one before it. |
| **Repeated base-object** | ⛔ CAUGHT: the drum appeared in S3, S5, S8, S9, S12 and S13 in the first draft — six scenes built on one prop is exactly reel 120's `LampBank` failure. **Fixed:** the drum is a full HERO object in only two (S3, S12); elsewhere it is a small dial at the frame edge, and each of S4/S8/S13 has its OWN hero object (the feed main, the grille, the shutter arm). |
| **Payoff spent early** | The hook shows the RESULT (buried in crates) with no mechanism; every mechanism is withheld to its own scene. |
| **Villain integrity** | THE DRUM loses zero times before the peak and is never beaten at all — slowed at S5, restricted at S8, denied at S13, still turning at S14. |
| **Intensity curve** | `9 · 5 · 6 · 8 · 7 · 8 · 5 · 7 · 8 · 7 · 6 · 6 · 9.5 · 9 · 7` — peak at S12/S13 clears the hook, no belly sag (the S6-S7 dip is 1.9s of title + setup and is followed immediately by the grille). |
| **Mirror violation** | n/a — single panel. |

---

## THE SHIPPED SCENE TABLE

⛔ **Derived, never typed** — `python3 tools/usg_scenes.py` reads the onsets out of the caption
JSON. On reel 122 the audit's scene list was a hand-typed copy of `L` and 7 of 19 entries were
wrong, one by 1.26s, so a whole round went into editing a scene that was not in the frame being
complained about.

| # | f | dur | room | shot | the EVENT |
|---|---|---|---|---|---|
| S0 | 0 | 3.57s | the pay hatch | med-wide 31.6% | one coin in, one crate out; three plates seat; the SAME coin buries him |
| S1 | 107 | 3.03s | the rack | **wide 24.7%** | three plates run in against a sweep hand crossing 0:03 |
| S2 | 198 | 1.93s | the plate bay | medium 31.4% | **DELIVERED** — wheeled in on a sack truck and stood up |
| S3 | 256 | 2.20s | the drum housing | **close 41.4%** | he grabs the brake and is DRAGGED 190px; the villain wins |
| S4 | 322 | 2.80s | the supply room | **wide 25.9%** | the feed main is unpinned and SWUNG 62° onto the $0.87 hopper |
| S5 | 406 | 1.77s | the supply room, re-lit green | **close 42.6%** | the same crate arrives; three coins go up beside it |
| S6 | 459 | 1.40s | the bench | medium 32.7% | **STRUCK** — the plate driven into a post with the stone mallet |
| S7 | 501 | 1.70s | the outlet | **wide 26.5%** | 26 movers cross the panel; he is blasted back 150px |
| S8 | 552 | 1.37s | the grille | med-wide 31.9% | he hauls the grille down; prose piles up, code passes, **the input line keeps running** |
| S9 | 593 | 2.13s | the run | **close 40.1%** | four mallet hits shorten four long sentences |
| S10 | 657 | 2.90s | the outlet | medium 29.0% | two crates opened side by side; identical contents; one tick |
| S11 | 744 | 2.17s | the drum housing | **close 38.8%** | the knife switch is thrown and the third act starts up |
| S12 | 809 | 1.40s | the plate bay | **wide 26.1%** | **LOWERED** — a hoist brings it down and the chains ring out |
| S13 | 851 | 3.20s | the cradle | **very close 45.8%** | the hour lands, the block cools, CRUMBLES, and he shovels it back by hand |
| S14 | 947 | 2.47s | the cold cradle | **wide 24.1%** | the arm HUNTS its rail while he works with his back turned |
| S15 | 1021 | 2.60s | the cradle, re-lit hot | medium 34.3% | the shutter latches, the block stays lit, the bin fills in three pours |
| S16 | 1099 | 1.27s | the gate | med-wide 31.4% | the keyword is struck; **the drum is still turning** |

**Shot list spread: 24.1% to 45.8% of panel width, 21.7pp.** Reel 122 was rejected with a 5.9pp
band, and the first pass of this reel produced 0.4pp before it was rebuilt as a sequence.

---

## WHAT THE ADVERSARIAL CRITIC ACTUALLY CAUGHT (post-build)

Recorded because the board's own critic pass predicted two of these and missed three.

| caught | by what | outcome |
|---|---|---|
| the three title scenes were ONE component in three colourways | the **contact sheet**, no gate | each repo got its own verb: DELIVERED / STRUCK / LOWERED |
| the whole reel sat in a 0.4pp shot band | `tools/frame_shot.py`'s own premise, measured | rebuilt as a 21.7pp sequence |
| the generic parallax bands rendered as a fitted KITCHEN | the contact sheet | replaced with `MeterWall`, the world's own object |
| the hook was the only failing scene | `scene_motion_audit`, then a **10fps trace** that named the exact 1.5s | a full-width travelling band + overlapping plate arrivals; 4.67 → 6.31 |
| the black point could not be fixed with the vignette | measuring per scene instead of per reel | seven rooms dropped their WALLS; 36.9 → 33.4 |
| the hero coin sound was flagged on **five** axes at once | `sfx_audit` | rebuilt from two clean cues, which is also what a coin actually sounds like |
