# REPO — factory log (reel 85)

> ⛔ Opened STAGE 0, 2026-08-03 per [[factory-log-first]] — before any storyboard or build.
> ⚠️ Arrived **PRE-LOCKED as an Alex VO recording** (`IMG_3411.MOV`, 233.8s raw, 14 "cut cut" retakes),
> script supplied in `~/Downloads/August 2nd.txt`. So Stages 0-4 (source / kill-gate / draft / Gate A) did
> **NOT** run as a gated process. **NOT a gated ship** — same status as SERENA/TOOL/POSTS/ARSENAL.
> This is a **BUILD task** off a locked VO.

## SUBJECT: Graphify — codebase knowledge graph for Claude Code
Keyword: **REPO**. Alex's brief: run the GitHub video editing workflow on video 1 of the five recorded 2026-08-02.

## STAGE 0 — SOURCE
| field | value |
|---|---|
| door | Alex-authored script, batch of 5 recorded 2026-08-02 |
| comp | ⛔ **NONE ON FILE.** No comp URL / views / multiple / age was logged before recording. |
| transfer hypothesis | n/a — not sourced from an outlier |

⛔ **This violates "no comp = no entry"** ([[factory-log-first]], [[vault-reel-premise-autopsy]]). Recording it
already happened, so the premise decision is made and is Alex's; flagging it here rather than pretending the
stage ran. **The consequence to watch:** an unsourced premise is exactly the door VAULT-38 came through, and
VAULT is the anti-example in the catalogue. If this one underperforms, the absent comp is the first suspect,
not the build.

## STAGE 0.5 — ⭐ FACT-CHECK (done 2026-08-03, live GitHub API + raw README)
**Repo: `Graphify-Labs/graphify`** · **101,743 stars** · 9,879 forks · **Apache-2.0** · Python / tree-sitter ·
created **2026-04-03**, last push 2026-08-01 · homepage graphify.com · topics incl. claude-code, mcp,
knowledge-graph, graphrag, ast.

| VO claim | verdict | evidence |
|---|---|---|
| "a free tool" | ✅ | Apache-2.0, runs on-device, PyPI `graphifyy` |
| "runs one time, scans your entire codebase" | ✅ | emits `graph.json`, SHA256 cache so re-runs "only process changed files" |
| "builds one full knowledge graph... every connection, every relationship" | ✅ | typed edges — calls, imports, definitions, references — from deterministic AST parsing |
| "next session Claude navigates the graph instead of rereading" | ✅ | graph is "persistent across sessions", "query weeks later without re-reading" |
| "$20 plan becomes your $200 plan" (≈10x) | ✅ **conservative** | README: **"71.5x fewer tokens per query vs reading raw files"** (52-file mixed corpus) |
| "every Claude Code developer is cancelling their $200 max plan" | ⚠️ **hyperbole** | no evidence. Hook framing only — ⛔ **never render this as an on-screen stat** |
| "Anthropic is so pissed right now" | ⚠️ framing | ditto — VO only, never a card |

⚠️ **Honest caveat on 71.5x:** it scales with corpus size — the README's own smaller runs show 5.4x (4 files)
and ~1x (6-file synthetic). True for a real project, not universal. Fine to show as the measured headline
because it is the README's own framing, but do not generalise it in on-screen copy.

⭐ **THE VO UNDERSELLS ITS OWN STORY — and this is the build's biggest lever.** It never says the number.
**101,743 stars in four months** is extraordinary, verifiable, and screenshot-able; **71.5x** is far more
specific than "your $200 plan for free" ([[specificity-effect]]). The VO is locked, so these cannot enter the
audio — but the house GitHub format puts them **on screen**, where they become the second info layer the
ship-gate demands (on-screen text must never repeat the VO). That is where this reel's credibility comes from.

## LOCKED VO (cut 2026-08-03, 37.5s, 12 source spans, EDL `out/vo5/video1-REPO.edl.json`)
> Anthropic is so pissed right now, and why wouldn't they be? Because every Claude Code developer is
> cancelling their $200 max plan. All because one developer dropped a free tool that killed the token problem.
> · It's called Graphify, and here's the problem it solves. So every new Claude Code session, Claude has to
> reread your entire codebase. Every single file, every function, and that's thousands of tokens burned before
> you ask a single question. · Graphify solves that. It runs one time, scans your entire codebase, and builds
> one full knowledge graph of everything inside. Every connection, every relationship. Then the next session,
> Claude just navigates the graph files instead of rereading your entire codebase. · So now your $20 plan
> becomes your $200 plan for free. Comment REPO for the full guide.

VO state: markers ✓ clean · duplicate takes ✓ none · longest pause 0.68s · verified on the word-level
transcript of the finished audio, not the raw ([[vo-take-cutting-pipeline]]).

## STAGE 2 — STRUCTURE (VO 37.36s, 134 words, timings measured off the finished audio)
| # | in | out | dur | beat | VO |
|---|---|---|---|---|---|
| S1 | 0.00 | 6.10 | 6.1 | HOOK | "Anthropic is so pissed... every Claude Code developer is cancelling their $200 max plan" |
| S2 | 6.16 | 9.60 | 3.4 | THE DROP | "one developer dropped a free tool that killed the token problem" |
| S3 | 9.72 | 12.05 | 2.3 | NAME | "It's called Graphify, and here's the problem it solves" |
| S4 | 12.14 | 20.30 | 8.2 | PROBLEM | "every new session Claude rereads your entire codebase... thousands of tokens burned" |
| S5 | 20.48 | 26.40 | 5.9 | MECHANISM | "runs one time, scans your entire codebase, builds one full knowledge graph" |
| S6 | 26.58 | 32.60 | 6.0 | THE GRAPH | "every connection, every relationship... navigates the graph instead of rereading" |
| S7 | 32.72 | 37.50 | 4.8 | PAYOFF + CTA | "$20 plan becomes your $200 plan for free. Comment REPO" |

⛔ **S1 (6.1s) and S4 (8.2s) exceed the one-take limit** — both get internal hard-cut shots per
[[reel-multishot-structure]] / [[reel-one-animation-per-shot]]. S1 → 3 shots, S4 → 2 shots. 10 shots total.

## FACECAM — conformed 2026-08-03 ✅
`public/footage85/clean.mp4`, 1080x1920, 37.7s, cut from `IMG_3411.MOV` with the VO's own 11 source spans via
`out/vo5/video1-REPO.edl.json`. **This is what the EDL was built for** ([[vo-take-cutting-pipeline]]).
⛔ **CROP IS PER-SHOOT** (law 92): this is a NEW shoot — seated in a low armchair, loose 4K frame, face in the
middle third with chair+legs eating the bottom half. KEY's (reel 83) constants will NOT transfer; solve from
landmarks on THIS footage. Face needs to be much bigger than the raw frame gives ([[reel-winning-formula]],
Alex on KEY: *"make my face bigger"*).

## STAGE 1b — HOOK IDEATION (5 concepts, ranked)
Criterion that decides it (Alex on KEY/PACK): **the first frame must show what the viewer RECEIVES, not the
product** — *"its not eye catching enough to show like what they receive"*. Payoff here = a $20 plan doing a
$200 plan's work.

1. ⭐ **THE BILL THAT CUTS ITSELF** — a long invoice printing down the frame, "$200 / MONTH" huge at its head;
   at f0 it is already printing (motion at frame 0). Mid-shot the paper is severed and the head re-reads
   **$20**. Mute-reads as the payoff in one second, is the literal last line of the VO, and no other reel in
   the catalogue has used it. **PICK.**
2. **THE CANCELLATION WALL** — a grid of $200 subscription cards flipping to CANCELLED in a sweep. Matches VO
   line 1 literally and is a strong crowd-drama interrupt, but it shows *other people's* outcome, not the
   viewer's, and edges toward rendering the unverified "everyone is cancelling" claim as if it were data.
3. **FILE MOUNTAIN COLLAPSES TO A GRAPH** — better material, wrong slot: it is the MECHANISM. Moved to S5/S6.
4. **THE 101,743 STAR COUNTER** — spinning up over the real repo card. Credibility, not payoff. Moved to S3.
5. **TOKEN METER REDLINING** — ⛔ SERENA (reel 69) already opened on a redlining meter. Repeat. Killed.

## STAGE 6 — STORYBOARD (10 shots)
⛔ Every scene a real PLACE, distinct dominant colour, ONE hero object that transforms, ONE animation per
shot, sprite-driven never UI-mockup ([[reel-chassis-cinematic-not-abstract]], [[reel-scene-one-object-transforms]]).

| shot | place / dominant colour | hero object + its transform | on-screen (never repeats VO) |
|---|---|---|---|
| S1a | accounts office, amber | invoice printing, "$200/MONTH" at its head | header: **$20 = $200** / "the plan hack" |
| S1b | same, push in | the paper is severed | — |
| S1c | same | head re-reads **$20** | — |
| S2 | dev's desk at night, teal | a single file lands and the token meter drops | "FREE · APACHE-2.0" |
| S3 | GitHub card on a plinth, violet | real repo card; star counter spins to **101,743** | "101,743 ★ · 4 MONTHS OLD" |
| S4a | library of identical books, cold blue | Claude sprite hauls the WHOLE shelf to the desk | "EVERY SESSION" |
| S4b | same, wider | the shelf burns into a token counter climbing | "THOUSANDS OF TOKENS · BEFORE YOU ASK" |
| S5 | scanner bay, warm orange | the book-mountain passes a scanner ONCE | "RUNS ONCE" |
| S6 | constellation room, indigo | the mountain resolves into a lit node graph, edges snapping | "71.5x FEWER TOKENS" |
| S7 | payoff stage, cream | the $20 card slots into the $200 socket; guide card + pill | "COMMENT **REPO**" |

Real assets required: Graphify repo card screenshot (101,743 ★), Graphify logo, `graph.json` glimpse.

## STAGE 1b REDO — ⛔ THE FIRST HOOK SHORTLIST WAS KILLED ON THE RIGHT GROUND
Alex: *"it needs to be clear to our target audience that this video is for them through the visuals in the
hook immediately, it cant be too abstract or unrelated."* My pick — an invoice cutting itself from $200 to
$20 — reads as the PAYOFF but says nothing about **who the video is for**. An invoice is any bill from any
product; a Claude Code developer scrolling past has no reason to stop. **Mute-readable ≠ audience-identifying,
and I had been optimising only the first.** Every replacement is built from an artefact only this audience
owns. Built as real 3.5s animations, not cards — `src/scenes/hooks85.tsx`, `out/hook85_*.mp4`.

| | hook | what frame 0 says to a Claude Code user | risk |
|---|---|---|---|
| **H1** | usage-limit banner slams over streaming file-reads | "that message ends my day" — most recognisable object they own | frame 0 is only a terminal; the recognisable beat lands at ~1s. Negative framing |
| **H2** | context meter eats 87% on 1,247 files, prompt still empty | "that is my session, and I haven't typed yet" — the sharpest statement of the problem | the meter needs ~2s to fill, so frame 0 is quiet |
| **H3** | PRO $20 / MAX $200, MAX gets CANCELLED, $20 lights | clearest money read, and it IS the VO's last line | it is a PRICING PAGE — closest to an ad card, least about the work. Leans on the unverified "everyone is cancelling" |
| **H4** | the same file tower hauled in 3x, tokens 41k→123k | best pure motion, escalates, teal breaks the palette | slowest to say "Claude Code" — the label is small terminal type. Weakest on the actual criterion |

⛔ **Three self-caught fails before delivery** (would each have been an Alex revision): all four floated small
in dead space (hero not filling the band); H4's tower landed ON the terminal and buried the only line naming
the session; H3's CANCELLED stamp buried the $200 it was cancelling. Also H2's payoff line ran 990px against
a 964px visible band at z 1.12 and clipped at both edges — **world coordinates were centred, the BAND was
narrower** (visible width is 1080/z, not 1080).

## STAGE 1b ROUND 3 — ⛔⛔ ROUND 2 WAS THE MINT MISTAKE, MADE AGAIN
Alex: *"not text visual animation, graphic heavy and interesting not just something simple way more creative
objects and stuff."* All four round-2 hooks were literal terminal / pricing-screen mockups — **and I wrote
"dark uniform screen / lines-and-boxes is WRONG" in my own review of them before sending anyway.** Knowing
the rule and citing the rule is not applying it. [[reel-chassis-cinematic-not-abstract]] + the MINT lesson in
[[mint-reel]] both say it outright: a UI screen shows the audience a PICTURE OF THEIR TOOL; an object scene
makes them watch something happen TO them.

⭐ **Reconciling the two briefs:** "must identify the audience" does NOT mean "show their screen". Identity
rides on the **MARK on the machine** and on what the objects ARE — codebase as freight, tokens as coins,
cost as a machine you can hear. `src/scenes/hooks85b.tsx`, `out/hook85_H{A,B,C}*.mp4`.

| | hook | hero + transform | why it might win |
|---|---|---|---|
| **A** | THE FURNACE — boiler room, conveyor feeds filing cabinets into a furnace wearing the Claude mark, gauge sweeps into the red, coins leave up the flue | the furnace, idle → redlining | most visceral cost. "Your money is on fire" needs no label |
| **B** | THE HAUL — sprite carries the whole codebase up a staircase that returns to its own bottom step | the tower it carries; RUN n OF ∞ | the only one that shows it happens EVERY session, which is the actual problem |
| **C** | THE HOURGLASS — top bulb full of coins, a chute keeps tipping the codebase in, coins drain to ash | the hourglass, full → nearly empty | reads fastest on mute; clearest single image |

⛔ **Self-caught before delivery:** A's furnace body sat at x 570 against a band starting at 660 — half the
hero off-frame (**the visible band is 1080/z about CAM_X, not the world width**); A and B both left the bottom
half of frame empty (floor at 1330 in a 190-2110 view); B's tower floated 154px above the sprite's head so it
read as hovering, not carried — and the whole shot is about WEIGHT.

## ⛔⛔ THE REAL FAILURE — THREE ROUNDS OF HOOKS WERE BUILT AT THE WRONG GEOMETRY
Alex: *"did you even follow the face github video editing workflow???"* **No.** Stages 0-2 and the
fact-check ran properly, and the facecam was conformed — then I built every hook as a **standalone
1080x1920 composition** and judged it full-frame.

But 82/83/84 are FACE reels. The card is `{x: 68, w: 945, y: 1180}` — his face owns y1180-1920 — and the
animation lives in a **570px band between HEAD_CLEAR 560 and BASELINE 1130**. Every hook I showed put its
action at **y1150-1660: underneath the face card**, where not one frame of it would ever have been seen.
Three rounds of critique, ranking and measurement on animations that could not be used.

⛔ **The lesson is not "check the geometry".** It is that I never CLONED THE CHASSIS
([[reel-clone-chassis-verbatim]] — chrome byte-identical, swap only scene bodies/VO/keyword). Starting from
a blank composition instead of the shipped reel is what let the geometry be wrong at all, and it also
skipped the crop, the header, the progress border, the captions and the audio runs in one go.

## STAGE 4.5 — CHASSIS BUILT (`src/scenes/Repo.tsx`, cloned from Key.tsx)
- **CROP solved for THIS shoot** (law 92) via `tools/extract_landmarks.py` + `tools/solve_crop.py`:
  nose (0.5411, 0.4190), shoulders 0.3522, 1131 frames, 0 no-detections →
  `CROP = {width: 945, left: -22, top: -607}`, nose at (489, 97). Solver returned 882 for a shoulder match
  but flagged **"coverage GAP — the plate will show through"**; widened to 945 exactly as reel 83 did,
  shoulders 333px against the house 310.
- ⛔ **The facecam had to be re-conformed at native 2160x3840.** My first conform downscaled to 1080x1920,
  which makes a 945px card crop impossible — reel 83's clean.mp4 is 4K for exactly this reason.
- Header structure P, progress-border, VO wired. Hook rebuilt to stand on BASELINE.

⛔ **Still open on the render:** the furnace occupies ~40% of the band with dead brick above it — it was
sized for a full frame and is now under-scaled for the band it actually gets.

## STATUS: hook rendered IN the chassis (out/85_repo_hook.mp4). Next = scale the furnace to fill the band,
then build S2-S7, captions, SFX.

---

# SESSION 2026-08-03 (pickup from repo-HANDOFF.md)

## ⛔ THE HANDOFF WAS STALE IN FOUR PLACES — VERIFY STATE, DO NOT TRUST THE DOC
The handoff said the shot gate passed "16 laws". It did not:

```
✗ LAW 102  camera keyframe y=900 at z=1.0 looks 60px off the TOP of the World
```

...and that failure was **in the hook itself**, the one thing awaiting sign-off. Also stale: SFX listed as
"not started" (38 cues already wired), the companion listed as unverified (correctly on `LANDMARKS85` with
`xform={CROP}` passed in), and `out/85_repo_hook.mp4` is the **rejected furnace hook**, not the ShotRing one
— it still carries the dual-screen webcam-box layout and his lap in frame.

⛔ **The lesson: re-run the gates at pickup before reading any status table.** Four claimed states, three
wrong. Cost here was ~0 because the gates are a second; trusting the doc would have shipped law 102.

## ⛔⭐ FIXING A CAMERA MUST NOT MOVE THE COMPOSITION YOU ARE ASKING TO APPROVE
`camY(900, 1.0)` clamps to 968 — a **+68px** shift. Applied alone it slides the mark row up into the header
band, i.e. the fix silently redesigns the thing under review. The ring's own `CY` was raised by the *same*
68px (640 → 708) so view-top moves 0 → 8 and the tiles land at an identical screen height.

**Verified by measurement, not by arithmetic:** rendered f45 before and after, tracked the green Graphify
tile — centre 620 → 619, a 1px delta inside detector noise. [[patch-render-not-full-render]]

## ⛔⛔ LAW 12 IS NOT GATED, AND THE HOOK WAS BREAKING IT
`tools/lint_shots.py` checks 16 laws; **law 12 (the IG dead zone) is not one of them.** Measured on a real
render at 1:1 (world CX 1200 → screen 540), the authored row spanned x883-1028, so **68px of the Gemini
mark — about half of it — sat under Instagram's right-side chrome** (`SAFE.right = 120`, nothing may cross
x=960). The hook's entire payload is "it works with all five" and the fifth was the one being eaten.

Five tiles do not fit at the authored size: a row centred at 540 clearing x=960 can be **840px** wide; the
authored row was **978**. So the whole rig scales by `K = 0.85` — plate padding included, or the tiles
fatten as they shrink and spend the clearance. Measured after: row x124-955, all five clear, gaps ~32px.

⛔ **A gate passing is not the same as the laws passing.** 16 of 89 are enforced.

## ⛔ A TWO-LINE `TEXT-OK` JUSTIFICATION IS INVISIBLE TO THE LINTER
`tools/lint_text.mjs` looks for `TEXT-OK` on the same line or **exactly one** line above. Both justifications
in `bodies85.tsx` were two-line JSX block comments with the token on the *first* line, so both read as
unjustified. Fixed by moving the token to the last line of each comment — **not** by relaxing the linter,
which four sibling reels were mid-build against.

## HOOK — SIGNED OFF (header changed)
Alex rejected `NO LIMIT WALL` ("need other ideas... like maybe UNLIMITED FREE CLAUDE"). Two constraints
made that exact phrase impossible and the direction risky:
- **Width.** No auto-fit; `fontSize` is used raw. Measured "NO LIMIT WALL" at size 104 = 741px for 13 chars
  ≈ 57px/char, against 888px usable → **~15 chars max**. "UNLIMITED FREE CLAUDE" is 21.
- **Truth.** "Unlimited free Claude" is an on-screen overclaim — Graphify cuts tokens per query (README
  71.5x), it does not uncap Claude. The fact-check rule is that hyperbole stays in VO and never becomes an
  on-screen stat.

Shipped: **`10x YOUR LIMIT` / `same $20 plan`** — his own VO's 10x, conservative against the README's 71.5x,
lands a number matching the concrete register of the other 12 headers. Measured 764px, fits.

## ⭐ SHOT REVIEW — findings on bodies85 (shots 1-12 had never been looked at)
- ⛔ **Shot 10 `ShotNav` is ~49% dead.** `at(f, 6, 70)` finishes the route at frame 70 of **137** — after
  that only `breathe()` moves, so **~2.2s of static** on the 71.5x proof beat. Biggest quality risk found.
- ⛔ **Shot 9 → 10 pops.** Geometry is a genuinely well-built continuation (ShotGraph's ring at pull=1 is
  *exactly* ShotNav's: `CAM_X + cos(a)*250`, `FLOOR-120 + sin(a)*180`, node w=70 both sides) — but the edges
  switch **`O.core` orange → `N.silver` at 0.3** across the cut, so a seamless continuation flashes colour.
- ⛔ **Both graph shots draw K11 — all 55 pairs of 11 nodes.** A complete graph is a hairball, and it is the
  wrong picture for the claim: a knowledge graph's whole point is *typed, sparse* edges (calls, imports,
  definitions, references). All-to-all says "everything touches everything", which is the *problem* Graphify
  solves. Also uses opacity 0.16 → [[reel-no-emoji-no-lowopacity]].
- Shot 7 wired `len=1.06` against a planned `dur=1.42` — the only shot shorter than its own speech. Verify
  against the render transcript at START-HERE step 12.
- `plans/repo.ts` `dur` values are speech-only and drift from wired `len` by +0.04..+0.28s (absorbed dead
  air, by design). Shot 10 drifts **+1.21s**, which is the dead air above, not absorbed gap.
- ✅ Not defects, checked and cleared: `REPOS.GRAPHIFY` is correct (law 65, no inherited assets — all 7
  footage refs are `footage85`); `marks85/gemini.png` is a Google G rather than the Gemini spark, but it is
  the **owner-avatar convention `repocard.tsx` documents and reel 83 shipped with**, not an error; the bed's
  0.31s shortfall is inside the gate's 0.5s tolerance and lands on the CTA tail.

## STATUS: hook signed off + gates green. Next = the three ShotNav/ShotGraph findings, escalation ladder
## (RECIPE step 3, still never run for this reel), captions, then full render (~4.4h) + transcribe-and-diff.

---

# SESSION 2026-08-03, ROUND 2 — "the coming in animation isnt interesting enough
# and not good enough sfx here either"

## ⛔⛔⭐ THE REEL HAD NO SOUND AT ALL. NOT THIN — NONE.
`const Sfx: React.FC = () => null;` — the component was stubbed. The 38-cue `CUES`
array was **dead data that nothing rendered**, `MUSIC_BED` was declared and never used, and
`public/footage85/bed_pocket.wav` did not exist. The reel was voice-only.

⛔ **I had told Alex the opposite one round earlier** — "SFX is done (38 cues)" — after reading
the array and a green gate. The handoff's "SFX ⛔ not started" was right and I overrode it with a
worse source. **Reading a data structure is not evidence that anything consumes it.**

⛔ **THE MEASUREMENT THAT SETTLED IT** — rewrite the cue list, re-render, diff the audio:
byte-identical, **0 of 55 RMS windows changed**. A cue list you can rewrite with no audible
effect is not wired up. After wiring: every window differs, and the isolated (new − old) track
peaks at −31.8 dB with visible peaks on each cue. Do this diff on any reel whose sound is
questioned — it is decisive in one render.

## ⛔⛔ THREE SEPARATE CHECKS REPORTED FINE ON A SILENT REEL
1. **law 53's gate regex was key-order sensitive.** It read `{f: '...', at: N}`; this reel writes
   `{at: N, f: '...'}`. It matched **0 of 38**, so `if cues:` was False, no `sfx:` line printed,
   and 53 was still listed in the `✓ laws … pass` line. Fixed in `tools/lint_shots.py`: matches
   either key order, **and now FAILS LOUDLY when it parses no cues at all**. With it fixed it
   immediately caught the real defect — last cue 15.6s of a 37.5s reel, **22.0s silent**.
2. **the bed check reads the SHARED `public/sfx/bed_pocket.wav`**, which exists — so
   "bed: 37.2s covers 37.5s" was reporting a *different reel's* file. Now 37.4s, reel 85's own.
3. **nothing checks that `Sfx` renders anything.** All three are array/asset checks; none asserts
   the component is not a stub. [[lint-shots-covers-16-of-89-laws]]

## FIXED — sound now exists
- `Sfx` **cloned verbatim from `Key.tsx`** (reel 83, shipped), not rewritten: cue mounts in its own
  `<Sequence>` at a ROOT frame, and **no `dur` trim** (truncating a tail is worse than a ring-out).
- `public/footage85/bed_pocket.wav` built by `tools/make_bed.py` against **this** VO
  (−5.5 dB pocket 300–4200 Hz, −6 dB duck). A shared bed carries another reel's duck envelope.
- `tools/shot_table.py` had never been run for this reel — no `shots.json` existed, which is what
  `make_bed.py` reads for length. Generated: timeline 36.35s, min gap 0.00s.
- Hook cues rewritten against the real beats. ⛔ The old ones were titled "$0 CARDS ARRIVING" and
  two were the **game-UI family law 34 bans outright** — `synth/coin_get`, `synth/sparkle_get`.

## ⭐ ESCALATION LADDER, RUN PROPERLY ON THE HOOK (law 15, RECIPE step 3)
**Level 1, written down and crossed out:** five tiles slide from a clump into a row, wires fade up.
The ladder's own test — describe it without the move: *"five AI-tool logos with Graphify in the
middle, wired together."* Nothing is lost. It also broke **law 44** (the wires FADED) and **law 16**
(`form` finished at frame 40 of 81, so the payoff sat on the midpoint and the back half was dead).

**Level 3 — the noun changes:** *"a chain with a link missing"* → *"a powered chain"*.
Frame 0 is now an image with a question in it (four DEAD grey marks around a visible gap) rather
than the emptiest frame in the shot — law 36, frame zero decides whether anyone watches. Then:
`f6-20` hub drops into the gap and rings out · `f20-50` wire **drawn** outward via strokeDashoffset ·
`f34-66` marks **light** as it reaches them, inner pair then outer · `f66-81` settle.
Payoff now lands in the last third, and every beat is a nameable EVENT — which is exactly what the
sound needed (law 58). ⭐ The two requirements solved each other.

## ⭐ FACE SHRUNK (Alex: "a bit smaller")
`CROP` 1800 → **1490**, shoulders 628 → 525px. `tools/solve_crop.py` **is broken** (its own header
says it cannot reproduce reel 84) — used the 4-line derivation that header prescribes, re-measured
off `landmarks.json`, and **validated it by reproducing the previous crop to within 1px first**.
⛔ `FRAMING_NOTE` said "shoulders 451px" while the crop carried 628 — the gate PRINTS that string
verbatim and never checks it. A declared deviation that misreports its own number is worse than none.

## ⭐ RENDER COST — the handoff's 4.4h was wrong
Measured: **81 frames in 3m40s at concurrency 6 = 2.7s/frame → ~51 min for the full 1126.**
A full render is a coffee break, not an overnight job. Re-price before planning around the old number.

## STATUS: hook has real sound + a level-3 animation. ⛔ LAW 53 IS HONESTLY RED — 12 shots still
## carry the other reel's cues and the last one fires at 15.6s. Full SFX pass is the next job, and
## it belongs AFTER the shot 9/10 fixes, or the cues drift again.

---

# SESSION 2026-08-03, ROUND 3 — THE HOOK, SEVEN CONCEPTS LATER

## ⛔⛔⭐ SIX CONCEPTS DIED THE SAME DEATH, AND THE ANSWER WAS IN plans/repo.ts
Rejected in order: **ring** (5 client marks wired to Graphify), **meter**, **till**, **bill**,
**building**, **room**, **archive**. Alex: *"these just dont look good enough and someone looking at
frame 0 our target aduiecne woudlnt know this is for them."*

Two distinct faults, both mine, both already written down somewhere I had read:
1. **The ring was law 134** — the hook shows what they GET, not what the product IS. A compatibility
   list is a picture of the product. Alex rejected that exact shape 4x on PACK and 1x on KEY.
2. **The five that followed were the SAME IDEA IN COSTUMES.** A gauge, a till and a receipt are all
   "the meter of what you spend". [[reel-idea-generic-diagnosis]]: *vary the interaction PARADIGM,
   not the noun.* I varied the noun three times and called it three concepts. And none was a PLACE
   — flat objects on a flat backdrop, which is what "doesn't look good enough" meant.

⭐ **The answer was in this reel's own plan the whole time:** *"'Clear to our target audience that
this video is for them' IS the SCREEN register — their own tool, running, is the fastest possible
identification."* Metaphors cannot self-select; a Claude Code window does it in under half a second.

## SHIPPED HOOK — `ShotDeal` in `src/scenes/hook85splits.tsx`
ONE Claude Code window throws copies of itself into twelve. Each flies an **arc** (perpendicular
bulge, not a straight line), **spins**, **overshoots** its slot and rings out (law 32). Three of the
twelve **SMASH** on impact — cracks DRAWN on a dash offset, shards flying out under gravity and
leaving frame (law 44: nothing fades; a shard that fades reads as a bug, one that exits reads as
force). Every pane carries a **spinning Claude mark** as its content.

⛔ **The first split was a straight lerp and that is exactly why it was dull** — position and scale,
linearly, twelve panes doing one thing with an offset. Nothing accelerated, overshot, or was CAUSED.
The fix was to change the MECHANIC, not the easing; three eases on one lerp is the noun again.

⛔ **Code-bars were replaced by the spinning mark on Alex's note.** Better than asked for: at pane
size the bars were a grey shimmer reading as noise, and twelve shimmering competed with the split.
One shape per pane is the law-135 read — recognised, never parsed. Marks are detuned (own rate AND
phase) or twelve in sync read as one object stamped twelve times.

## ⛔⛔ A BODY THE GATE CANNOT SEE EXEMPTS ITSELF FROM EVERY BODY LAW
`tools/lint_shots.py` finds bodies with `/<(Shot[0-9A-Za-z]+)\s*\/>/`. Mine were named `Split*`, so
law 119 fired **"shot 0 has no body — frame 0 is an empty panel"** on a shot that had one — and,
worse, laws 47/48/49/50 all key off body identity, so an unseen body is silently exempt from all of
them. **Renamed `Split*` → `Shot*`.** Do not loosen the regex; it would blind the gate for the four
sibling reels in this checkout.

## ⭐ SOUND — "some like mad sound effect"
16 cues in 2.7s = **~5.5 cues/sec against the house 2.0**, and it only works because the classes stay
separated: twelve landings are TEXTURE ticks (0.1259, rate-rising) under everything, and only the
three breaks are impacts (0.38 — `shatter.mp3`, `am/gemcrack.wav`). Making the ticks LOUDER instead
of more numerous would have been mush. ⛔ No game-UI family (law 34) — the coin/sparkle set is gone.

⭐ **Cue times are DERIVED from the animation's arithmetic, not placed by ear:** pane i is thrown at
frame `6 + i*3.4` and lands at `+19`, so the smashers (panes 3, 7, 10) hit at 1.17s / 1.63s / 1.97s.

⭐ **MEASURED THE MIX RATHER THAN GUESSING:** peak −3.3 dB, **0 clipped samples**, and during the 13
windows of real speech the SFX **never exceeds the voice by more than 4.2 dB** (0 windows over 6 dB).
The −16 dB peaks land in the gaps between words, so no sidechain duck was needed. Method: subtract
the silent-SFX render from the new one to isolate the added track — same diff that proved the reel
was silent in round 2.

## STATUS: hook LOCKED (`ShotDeal`). ⛔ Still open: sub-header sits ~40px too close to the top row;
## law 53 still honestly red — 12 shots carry the other reel's cues, last one fires at 15.6s of 37.5s.

## ⛔⛔⭐ THE SFX LIBRARY IS NOT NORMALISED, SO THE HOUSE GAIN CLASSES LIE
Alex said the smashes were "way too loud" **twice**. Both times I lowered the class number
(0.38 → 0.16) and both times the loudest thing stayed loud, because the class was never the problem.

**MEASURED RMS of the files actually used in one shot:**

| file | RMS | at one shared 0.16 "impact" gain |
|---|---|---|
| `am/gemcrack.wav` | **−12.2 dBFS** | 18.9 dB louder than shatter |
| `am/punch.wav` | −26.3 | |
| `clank.mp3` | −27.9 | |
| `shatter.mp3` | −29.8 | |
| `am/click-hard.wav` | −34.1 | |

`gemcrack` peaks at **0.0 dBFS** — it is a fully normalised, dense file sitting in the same class
constant as a file 22 dB quieter in RMS. **Derive the gain PER FILE from measured RMS to hit a class
target** (texture −53, event −49, impact −47 dBFS effective), never copy the class table.
Net on this shot: gemcrack −18.9 dB, riser −10.0, punch −9.7, shatter −1.3.
Result: isolated SFX peak **−16.1 → −35.3 dB**, and over the voice during speech **+4.2 → +0.1 dB**.

## ⭐ "IMPROVE FRAME 0 FOR RETENTION" IS MEASURABLE — AND THE FIRST DIAGNOSIS WAS WRONG
`tools/verify_render.py` measures frame-0 ink (threshold 10%). The hook was already at **64.4%**, so
it was NOT the "there's nothing at 0 seconds" failure PACK had at 4.4%. Breaking the histogram down
found the real gap:

| | darks p3 | brights p97 | spread |
|---|---|---|---|
| hook, before | 9.0 | 154.0 | 145.0 |
| hook, now | 8.7 | **167.0** | **158.3** |
| PACK shipped | 24.3 | **238.3** | 214.0 |

⛔ **My DARKS were already better than PACK's. The gap is BRIGHTS** — nothing in the band is near
white. The first spill attempt moved the spread 145.0 → 145.3 (i.e. nothing) because it was drawn
BEHIND an opaque pane; it has to reach well past the pane edge to be visible at all.
⛔ **Still 158 vs 214, and closing it fully conflicts with the dark-terminal look** — PACK's 238 came
from white artefacts. Worth noting MCP shipped at a spread of **37.7**, so this is not a hard gate.
Also applied from STYLE.md's own frame-0 rule — *"start lit, start moving, start large"*: seed window
700→760 wide, dropped 596→600 (which also bought the sub-header its missing clearance), and a wind-up
so **no frame of the shot is static**, including frame 0.

## ⛔ TWO TRAPS THAT COST RENDERS THIS ROUND
1. **macOS is CASE-INSENSITIVE.** `out/85_HOOK_v3.mp4` collided with `out/85_hook_v3.mp4` from hours
   earlier, so a size-based wait loop matched the STALE file instantly and I measured it — reporting
   an SFX peak of −99 dB (i.e. "silent") on a render that had not finished. **Wait on the render
   PROCESS, not on a file size, and never reuse a name that differs only in case.**
2. **Remotion copies the whole 5.4 GB `public/` on every bundle**, which is most of the ~6 min render
   time — and a file touched mid-copy kills the render with a bare ENOENT (`shots.json` here). It is
   transient; retry. It also means the render cost is dominated by asset copying, not by frames.

---

# SESSION 2026-08-04 — HOOK LOCKED, REEL BUILT OUT

## HOOK — `ShotOverflow` (src/scenes/hook85overflow.tsx). NINE CONCEPTS TO GET HERE.
One session deals LARGE copies of itself out; every copy runs off a frame edge, so the set is never
fully on screen. **10x reads as OVERFLOW, not as a headcount.** Two of the five break red and die,
their marks stopping dead. Frame 0: one window, already winding up — no static frame in the shot.

The nine, and why each died:
| # | concept | why it died |
|---|---|---|
| 1 | ring of 5 client marks | **law 134** — a compatibility list is a picture of the PRODUCT |
| 2-4 | meter / till / receipt | **one mechanic in three costumes** — all "the meter of what you spend"; and none was a PLACE |
| 5-7 | building / room / archive | still metaphors — *"at frame 0 our target audience wouldnt know this is for them"* |
| 8 | file tree | right register, but never showed the **10x** |
| 9 | 12-pane grid | *"i dont like seeing all of the screens"* — a grid can only say HOW MANY (law 63) |

⛔ **THE ANSWER WAS IN `plans/repo.ts` FROM THE START:** *"'Clear to our target audience that this
video is for them' IS the SCREEN register — their own tool, running, is the fastest identification."*

## ⛔⛔⭐ A MOCKUP THAT DOES NOT USE THE REAL DRAW ORDER IS NOT A PREVIEW OF ANYTHING
The CORRIDOR read beautifully as a hand-posed still and **failed completely when animated**: copies
receding toward a vanishing point are centred behind the near pane, so with correct depth order the
front pane occludes every one of them. *A receding stack centred on its own vanishing point is
invisible by construction.* The still only worked because I posed it near-first/far-last — i.e. the
small distant copies painted ON TOP, which is backwards. I recommended it off that still.

## ⛔ MARKS MUST BE INTERLEAVED PER PANE
A Claude mark has to mount as a positioned `<Img>` (inside the SVG it kills the render on a
delayRender timeout), so "draw all panes, then all marks" puts EVERY mark above EVERY pane. Invisible
on a grid, glaring the moment panes overlap. Each pane is now its own layer.

## ⛔ A BODY THE GATE CANNOT SEE, PART 2
Shared consts placed BETWEEN two bodies get attributed to the earlier one — `lint_shots.py` captures
a body's source up to the next `export const`. Putting `GRAPH_EDGES` before `ShotGraph` made law 96
report ShotScan→ShotGraph as sharing geometry. **Shared definitions go above ALL bodies.**

## SHOTS 9/10 FIXED (the findings from 2026-08-03)
- **`ShotNav` was 49% dead** — one route finished at frame 70 of 137, on the reel's strongest proof
  beat. Fixed with a **SECOND query** down a different path (f74-126), not by slowing the first —
  slowing it would make one query look SLOW, the opposite of the claim.
- **The mesh popped orange→silver across a continuation cut.** Shots 9 and 10 each declared their own
  edges. Now ONE shared `GRAPH_EDGES`/`graphNode`, and shot 9's mesh SETTLES to silver inside itself,
  so the cut is seamless. Defining the graph once removes the class of bug, not the instance.
- **Both drew K11 — all 55 pairs.** A hairball, and the wrong picture: a knowledge graph is TYPED and
  SPARSE. All-to-all says "everything touches everything", which is the PROBLEM Graphify solves. Now
  a ring plus four chords — structure at a glance, and it survives law 63.

## ⭐ FULL SFX PASS — 45 CUES, LAW 53 GREEN AT LAST
Every time derived from the body's own clock (`at(f,a,b)` → frame ÷ 30 + the shot's `src`), 0.07s
J-cut lead. **Gains per file from measured RMS**, never the class table — the library spans 30 dB
(`am/gemcrack` −12.2, `am/click-hard` −34.1, `servo` −42.7). Targets texture −53 / event −49 /
impact −47 dBFS. The sound names the object (law 58): sonar on the scan, paper on the fan, boom on a
landing stack, unlock when the graph sets. Last cue 36.1s of 37.5s — was 15.6s.

## STATUS: all 16 gate laws pass, tsc + text lint clean. Full render running (REPO-V1).
## Next: `verify_render.py out/REPO-V1.mp4 85`, then transcribe the render and diff against the script.

## ⭐ REPO-V1 RENDERED AND VERIFIED (2026-08-04)
`out/REPO-V1.mp4`, 60.3 MB, 1125 frames. `verify_render.py` passes: frames 1125/1125, audio 37.55s vs
video 37.50s, **frame-0 ink 92.8%**, sync -45 ms against a -44 ms baseline with **0 ms spread**,
3 notches below -46 dB none at a run mount ("pauses in a de-noised track, not dropouts").

## ⛔⛔ FOUR SESSIONS RENDERING IN ONE CHECKOUT — THE FAILURE LOOKS LIKE A CODE BUG
Two full renders died on `delayRender() ... not cleared after 298000ms` naming `marks85/claude.png`,
and one earlier died on a bare `ENOENT` for `shots.json` mid public-dir copy. **None was a code
defect.** `ps` showed three OTHER sessions rendering `86_bl_2`, `89_SMART_v4` and `CODE_v1` in the
same checkout; mine was the fourth. Four renders each serving a 5.4 GB `public/` and pulling a 1.6 GB
ProRes matte starves the asset fetch.
- ⛔ **Check `ps aux | grep "[.]bin/remotion render"` BEFORE diagnosing a delayRender timeout.**
- ⛔ Prove the asset is fine first: `claude.png` was present in the newest bundle at the correct
  15,359 bytes, and the same comp had rendered clean an hour earlier.
- ⛔ **DO NOT pkill or sweep temp** — those are other sessions' live renders.
- Concurrency **8 fails, 6 works alone, 3 survives alongside three neighbours.** The 5.4 GB public
  copy is also most of the ~6 min per render, not the frames.
- ⭐ The real fix for the setup is a render lock, or per-reel `--public-dir` (the CODE session already
  does this).

## ⭐⭐ WHISPER MIS-TRANSCRIBED THE CTA KEYWORD — AND THE ISOLATION TEST SETTLED IT
The full-render transcript read **"Comment and rebuild for the full guide"** where the script says
**"Comment a REPO"** — the keyword the whole CTA depends on. Rather than trust either reading:
transcribe the CLEAN SOURCE clip and the RENDER clip of the same 1.6s in isolation.

    CLEAN SOURCE VO  -> "Comment, Rebo for the full guide."
    THE RENDER       -> "Comment, Rebo, for the full guide."

Identical. "Rebo" is whisper's phonetic REPO; the earlier "and rebuild" was whisper guessing from
CONTEXT across the whole file — the exact failure in [[listening-test-first]]. ⭐ **When a full-file
transcript disagrees with the script, re-transcribe the SEGMENT in isolation from BOTH the source and
the render before believing it.** Also structural: this reel has ONE audio run over all 13 shots, so
the render plays run00.wav straight through and cannot splice or drop a word by construction.

---

# SESSION 2026-08-04, ROUND 3 — THE ANIMATION BAR, AND WHY EVERY SHOT WAS BORING

## ⛔⛔⭐⭐ docs/ANIMATION-BAR.md EXISTS AND I HAD NOT READ IT
625 lines, and Alex had to say *"they don't follow the GitHub video editing repo — I'm talking about
what type of animations I want for each"* before I opened it. It diagnosed the entire reel in one
line: **THE OBJECT WAS A SYNONYM FOR THE SENTENCE.**

| shot | line | my object | |
|---|---|---|---|
| 4 | "rereads your **codebase**" | a stack of files | synonym |
| 6 | "tokens **burned**" | things burning | synonym + pun |
| 8 | "**scans** your codebase" | a scanner bar | synonym |
| 9 | "builds a **graph**" | a graph | synonym |
| 10 | "**navigates**" | navigating | synonym |

*"Name the object out loud and you have said the voiceover again... there is nothing to look at, only
something to confirm. That is what boring means here."* Six of eight post-hook shots failed it.

⭐ **The doc also mandates a PROCESS I had been running backwards: DRAFT FIRST, ONE FRAME, BEFORE ANY
RENDER.** Alex had already asked for this in writing — *"please push these adjustments to the github
repo process flow because you keep making these same mistakes."*

## ⛔⛔ THE THREE FAILURE BOXES, WALKED THROUGH IN ORDER
The doc's own grid is abstract/concrete x obvious/inventive. I hit three of the four boxes in a row:
1. **concrete + obvious** — code windows everywhere. Alex: *"all still screens, not interesting."*
   ⛔ CAUSED BY ME: after his "use real objects" note I unified the whole reel on ONE object, and
   that object was UI. Fixing variety by removing variety.
2. **abstract + inventive** — the jug of liquid. Alex: *"i dont understand."* The doc's own label for
   that box is *"incomprehensible: a clever thought nobody can read."*
3. **concrete + obvious again** — conveyors, fare meters, tanks, card catalogues, shadow boards.
   Alex: *"way too corporate."* ⭐ **A failure mode the doc does NOT name: they were all industrial
   equipment. Nothing in them was ALIVE — no one to root for, nothing at stake for anybody.**

## ⭐⭐ THE ANSWER: THE MASCOT WAS IN THE REPO THE WHOLE TIME
`src/character/Mascot.tsx` — the real Claude sprite, every part an axis-aligned rect,
`shapeRendering="crispEdges"`, with gaze/shock/cheer/stern built in, used across ~20 reels. Alex's
own steer: *"a robot that scans the codebase to find evil characters."* On-brand for free, and an
invented robot would not have been.

## SHIPPED — SHOT 4 IS `ShotSweep` (variants85b.tsx)
Claude walks the codebase with a torch. **Three big openings, all showing a drawn `?`**; the beam
travels and each one it reaches flips **? → gremlin** and stays revealed. Three beats, not one state.
⛔ The `?` is built from rects in the sprite's own grammar, NOT a font glyph — law 14 still binds.

⭐ **"SIMPLER AND MORE HIERARCHICAL" WAS ARITHMETIC.** It had 24 code blocks + 4 gremlins = 28 objects
of near-identical weight. *Twenty-eight things is not a hierarchy, it is TEXTURE — and texture reads
as SMALL no matter how large the hero is, because the eye has nowhere to rest after it.* Cut to SIX
objects: hero, beam, three openings, one gremlin.

## ⛔ THE BAND IS 1080 x 450 AND I KEPT COMPOSING FOR A SQUARE
Clear area is world x 660..1740, y 575..1015 — below that his head takes over. Three separate rounds
of "too small / cut off" were all this: the mascot placed at world y 310 (band starts at 570) so only
its legs rendered; a third opening at x 1940 (edge is 1740) so the shot showed two and claimed three.
⭐ **Measure the band before composing, and check the edge columns after: right-edge ink went
54% → 37% → 25% across the fixes.**

## ⛔ CHANGING A BODY CAN INVALIDATE A CONTINUATION DECLARATION
`CONTINUATION_CUTS` had cut 4 because ShotHaul and ShotFan were the same stack at two moments.
Swapping in ShotSweep made the declaration a LIE, and law 95 caught it — a suppressed carry between
shots sharing no geometry starts the next shot from a dead stop. **Re-check CONTINUATION_CUTS
whenever a body is replaced.**

## ⛔ AND ITS CUES DIED WITH IT (law 53, fourth time)
Shot 4's cues named stacks landing — an object no longer in the reel. Rewritten from the body's clock:
sonar under the sweep (law 58, the sound names the object), rising snap on each reveal at f24/48/72.

## ⭐ SMOOTHNESS IS MEASURABLE PER SHOT, AND IT WAS NOT THE FRAME RATE
Alex: *"too choppy."* `step_probe.py` reads the WHOLE frame and his facecam runs 30fps continuously,
so it can never see a held frame — it reported 0.0% held and was useless. Measuring the BAND alone:
30fps, 12% held, nothing stepped. The real cause was `cupX(floor(t))` — a STEP FUNCTION. The jug
drifted 40px then **teleported 130-170px** every 8.8 frames.
Three fixes, each measured: continuous path (170→140px), **linear traverse** (at() eases out with
derivative 2.6 at t=0, so the start ran 2.6x fast), and a **serpentine row** so the wrap is a 178px
drop instead of a 660px fly-back. Worst single-frame movement **170px → 20.2px**.
⭐ Peak-to-mean band change per shot is the diagnostic: hook 4.0, haul 1.7, **burn 9.4 (still jumpy)**,
scan 2.4, navigate 1.3, pour 2.4.

## ⭐ SOUND — 73 cues
Angry groan on the open (CC0), 0.18s AHEAD of "Anthropic is so pissed" so it reads as a reaction, not
a cue. Ten rising cup-pours + an XP tick per cup + a ramp on the tenth. ⛔ Those are the game-UI family
law 34 bans — Alex asked for XP/progress feel explicitly, so his call overrides it; kept at texture
level. Every gain still per-file from measured RMS.

## STATUS: REPO-V4.mp4 rendered + verified (1125/1125, sync 0ms spread, frame-0 ink 91.2%).
## ⛔ STILL THE OLD SYNONYM BODIES: shots 5, 6, 8, 9, 10. THE LEAK and THE BUILD are drafted and
## approved-in-principle but NOT built. Shot 11 is the pour; shot 4 is the sweep.
