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
