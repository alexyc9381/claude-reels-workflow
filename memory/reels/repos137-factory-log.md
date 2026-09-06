# 137 · REPOS — THE SHOP (factory log)

**Keyword** REPOS · **VO** `~/Downloads/REPOS Sep 5.m4a` (81.78s raw) · **prefix** `Rps` ·
**Board** `storyboards/137-repos.md` · **Lead magnet** `lead-magnets/137-repos.txt` ·
**Built** 2026-09-05, overnight, unattended (Alex asleep; kickoff prompt verbatim from `docs/KICKOFF-PROMPT.md`).

## STAGE 0 — the number, and the parallel session

Two VOs landed within a minute (`REPOS Sep 5`, `ADHD Sep 5`), so per [[feedback_reel_number_is_not_a_lock]]
the number was checked in three places before claiming it. `ls Faceless/` said 136 was free; **it was
not** — the ADHD session created `136 - ADHD` seconds before this one looked, and neither the tsx
tree nor the site manifest had caught up yet. REPOS is **137**, claimed in the Drive folder, in
`video/src/ClaudeRepos137Reel.tsx` and in `storyboards/137-repos.md` inside two minutes of finding out.
⭐ The Drive folder is the fastest of the three registers and the one the other session actually read.

## STAGE 1 — the subject, verified live

The VO names four repos by ear: "AnyDoc", "herder", "the deep sea", "Omnirout". Resolved against the
GitHub API and each README on 2026-09-05:

| spoken | repo | ★ | licence | what the frame may assert |
|---|---|---|---|---|
| AnyDoc | `firecrawl/anydoc` | 20,397 | MIT | Word/PowerPoint/Excel/PDF/EPUB/CSV → GitHub-Flavored Markdown, single-digit ms |
| herder | `herdrdev/herdr` | 35,522 | Apache-2.0 | one pane per agent, WORKING / BLOCKED / IDLE, workspaces + splits |
| the deep sea | `deepseek-ai/deepseek-harness` | 213,060 | MIT | "Everything is a Plugin", the model adapter included |
| Omnirout | `diegosouzapw/OmniRoute` | 61,564 | MIT | 352 providers · 150+ free · quota-aware fallback · ~1.47B free tokens/mo |

⛔ The VO says "millions of free tokens every single day". The frame shows the README's own
`~1.47B FREE TOKENS / MO` and never a per-day figure, which would be derived.

## STAGE 2 — the VO: six flubs a whole-file pass called clean

`faster-whisper medium.en` over the whole take reported ONE `cut cut`. Chunking the raw at every
measured silence ([[feedback_whole_file_transcription_hides_flubs]]) found **six**:

1. `0.13-3.84  These four brand new cut cut.` — a false start at the HEAD
2. `18.50-21.94  …simple text format that I- cut cut` — inside the anydoc sentence
3. `31.59-34.14  Managing multiple agents in a normal coding window, cut cut.`
4. `39.42-42.54  So this tool upgrades your screen with dedicated workspaces and s- cut cut.`
5. `47.56-50.53  Then check out Coco. / Bent. Cut, cut.`
6. `55.72-57.07  so if your agent starts cut cut` — inside the DeepSeek sentence

plus 19.9s of dead air (3.5s and 3.3s inside the anydoc line alone) and two hallucinated
"Thank you"s that whisper wrote over noise blips.

**The cut:** 14 keep-windows, every edge in measured silence (all 14 below −46 dB on a 10ms RMS
scan), 0.16s of the take's own tail after each sentence and 0.10s before each onset → **0.26s at
sentence boundaries**, 0.22s at the one mid-sentence join. Spliced in numpy with 4ms crossfades,
then `highpass 75 · alimiter 0.93 · loudnorm I=-16 TP=-1.5 LRA=11`.

**Tempo is piecewise** (R1 is binding): hook windows capped at 3.95 wps, every other window at
4.45, ×1.10 wherever that leaves room. K1 (the hook line) runs at ×1.0 — it is already 4.10 wps in
the recording. K10 ("so if your agent starts getting dumb…") is 4.50 wps raw and runs at ×1.0. K13
(the OmniRoute sentence, 26 words) at ×1.003. Result: **41.18s / 1236 frames**, overall 4.03 wps,
hook 0-10s 3.9, worst 5s window 4.45.

⚠️ **41.18s is outside the 22-29s house range.** Four repos need it. Flagged, not trimmed.

Re-transcribed the CUT file chunk by chunk: `CUT count: 0`, 165 words heard of 166.
`tools/build_captions.py` (medium.en): 166 words, 58 lines, 58 anchored to a measured onset.

## STAGE 6 — the board

World = **THE SHOP**, a tuning garage for Claudes (the word the script turns on is UPGRADE, spoken
twice). Four bays, one repo each, one villain each (THE JAM · THE CRAM · THE DIM CORE · THE EMPTY
TANK), each beaten once in its own bay. Hero artifact = the upgraded Claude (dome + HUD boom + tank +
intake + cape), withheld until S10. Full cards in `storyboards/137-repos.md`.

Rejected worlds, with the reel that already owns each: armory/loadout (69), assembly line (37), a
laptop on a desk (135's hook), a tower or any climb (134), an arcade (124), a playhouse (135), a
night street (94/133), a courtroom (132), a toll row (131), a gym (110).

## STAGE 7 — the build

Files: `RpsWorld.tsx` (palette, ledger `R`, the `REPOS` colour table, seven places, the `Rig` — Hero's
math with the four parts drawn INSIDE its transform so a part rides his squash) · `RpsSets.tsx`
(`ShopWall`, `BayLamp`, `TyreStack`, `Toolbox`, `Drum`, `Bench`, `Lift` with scissors that open,
`Chain`/`Hook`/`Tag`/`HangPart`/`Hoist`, `CrewBand`, `LightColumn`) · `RpsProps.tsx` (`FileCard`,
`Chute`, `Debris`, `Press`, `MdSheet`, `SheetBelt`, `Monitor`, `Rack`/`Cartridge`, `Claw`, `Core`,
`Manifold`/`Canister`/`BigGauge`/`ErrorLamp`, `TokenHopper`, `Tally`, `Composer`) · `RpsScenes.tsx`
(14 scenes, `CAM`/`GRADE`/`shotsFor`/`punch`) · `RpsHooks.tsx` (three hooks) ·
`ClaudeRepos137Reel.tsx` · `rps-137-index.tsx`.

⛔⛔ THREE CUTS = THREE HOOKS: `lift` ELEVATION (house) · `drop` LOAD (amber) · `pit` SWARM (steel).

### Build notes worth keeping
- ⛔ **`Hero` is a closed component, so a part drawn as a sibling floats off him the moment he
  squashes under a load** — exactly the beat where a part lands. `Rig` copies Hero's math and draws
  the parts in the same transform. Mascot geometry read off the SVG, not assumed: head top at 22% of
  the box, eyes at 35-48%, hip line at 64%, feet at 92%.
- ⛔ **The Mascot blinks at `lf` 0-4 of every 84**, so frame 0 of every scene — and the reel's
  thumbnail — caught the hero with his eyes shut. `Rig` offsets `lf` by 31.
- ⛔ **A hanging part's box offset has to put the part's TOP under the hook**: the HUD boom starts at
  −46 rig units and the dome at −20, so both hung ABOVE the hook (behind the header pill) until the
  offsets went negative. Found on a frame strip, invisible in the code.
- ⛔ **zsh does not word-split an unquoted variable**: `set -- $spec` in a probe loop passed the whole
  line as the composition id and eighteen stills silently rendered nothing. `read -r a b c` instead.
- ⛔ **`afade … st=` is STREAM time**: on an `-ss`-seeked input the fade-out sat 80s in the past and
  silenced the whole bed (−91 dB, `I = -inf`). Cut first with `asetpts=PTS-STARTPTS`, then filter.
- Beds: three passages from the two house tracks (ados @122.1s, ebm @44.4s, ados @174.3s), scored
  `head*1.2 + mid*1.4 - max(0,tail-mid)*2 + floor*1.5` over a 1s RMS envelope, the spectrum chain
  from [[feedback_bed_spectrum_not_level]], loudnorm −18, onset 0.00s on all three.
- SFX: first bank flagged `coin_slide` (noise bed + air), `glitch_counter` (hiss), `resolve` (176ms
  attack = air), `ratchet` (6 uses at 67% bright = SLAP). Each replaced by the object's own sound;
  ratchet held at 2 uses. 99 cues / 41.2s = 2.4/sec — above the 1.0-1.5 band, on the 135 precedent
  (Alex asked for more), every cue on an action.
- Headers carry a fact the VO does not say: `ALSO PDF · EPUB · CSV`, `SEE WHO IS BLOCKED`,
  `★213,060 · MODEL IS A PLUGIN`, `352 PROVIDERS · 150+ FREE`.

### The first probe pass (18 stills) — what a contact sheet found before any render
- the feed chute was a 140px grey slab across the pegboard → 92px, warm oxide
- the bench cut across the hero's chest in the jam → gone from that scene
- the debris scattered 600px and never piled → half the velocity, bigger fragments
- the press was a grey slab on a teal wall → a yellow machine with ink trim
- the markdown sheet was held over the hero's face → beside him, he looks left at it
- the "crammed" agents were 180px apart → 118px sprites on a 110px spread, ribbons 11px
- the tally sat on top of the canister rack → under it

## STAGE 8 — render → gates → fix, four times (all on `tools/rps_gates.sh`, run SERIALLY)

| pass | what failed | what changed |
|---|---|---|
| v1 | motion: LIFT 4.01 · SPLIT 5.70 · SWAP 3.16 · MANIFOLD 4.74 (bar 9 on the median, 4 per scene) | LIFT: a two-stage rise + a tracking push · SPLIT: printing lines in every working pane + a 6% push · SWAP: hiccup JUMPS (the Mascot's own `shock`, driven periodically) not a sway, a 2× claw, a punch to the face on the lock · MANIFOLD: 40px beads, 56px tokens, a push per shot |
| v2 | tails stalling: TAG1/2/4, JAM, ROLLOUT | star counters run to the cut + a push · JAM: hiccups after the third hit and a late fourth cough · ROLLOUT: the tag wave + puffs after SEND |
| v2 | 23 cue / sentence-final collisions | BEATS retimed onto the action words (PowerPoint · Word · breaks · MODEL on "a" · lock on "brain" · SEND at f56); fanfare + bell cut; tag beats texture-only |
| v3 | 5 scene-opening hits 0.18-0.25s after a sentence end (measured ends) | moved 2-3 frames later; the checker learned `lead: 0` |
| v3 | ⛔ dHash across the three cuts: mean 17.9 but **MIN 6** (house/amber at the SWAP CU; 8 at PRESS; 9 at CRAM) | the generic per-cut offsets (±5% · ±50px) were a NUDGE. Each cut now has its own SHOT SIZE in JAM · PRESS · CRAM · SWAP · GOD TIER (table in the storyboard) — [[feedback_variants_need_shot_sizes]] confirmed again |
| v4 | house: all green (verify 9/9 · motion median 9.68, 0/14 · tails 0/14 · luma 150.3 · sat 62.0% · p10 30.4 · hook 150.1 / 11.52 · captions ok) · dHash **mean 20.2 MIN 11 PASS** | — |
| v4 | ⛔ the two TRIAL hooks were STATIC: drop 3.58 · pit 3.88 (the house lift: 9.35). Both ran on a LOCKED camera; the 5s open gate still passed on the mean (8.39 / 7.84) because seconds 4-5 belong to the tag beat and the jam | drop: the camera TILTS with each falling part and settles, pushes 1.10→1.18, the platform DIPS under each landing, each hook LOWERS 24px before it lets go · pit: the camera PANS with the dolly, JOLTS on the lurch, pushes 1.14→1.22; each runner drags a dust trail |

⭐ **A 5-second mean hides a 3-second hook.** The open gate's buckets for the drop cut read 3.0 · 3.6 · 3.9 · 17.7 · 13.8 —
PASS on the mean, and the hook itself was a third of the house's. Read the per-scene row for the hook, not the open mean.

⭐ **Every hook that measured well here has a camera that MOVES with the event** (lift: tracks the rise · drop: tilts with
the fall · pit: pans with the dolly). A locked camera on a 250px moving object is 8% of the panel repainting; a 1px/frame
track is every edge in the set.

⭐ The bay-lamp label read `DEEPSEEK-HA` on a frame strip: `repo.name` is 16 characters, the label box 180px. Labels now use
`tagName`. Found on a strip, invisible in the code (the fourth time this reel).

## STAGE 9 — the delivered files, measured where they ship (2026-09-05 05:35)

E1 encode on all three cuts (`libx264 high · yuv420p · crf 18 · bt709/tv · aac 256k 48k · faststart`), then
every gate re-run on the ENCODED house file ([[feedback_delivery_encode_pixfmt]]: the encode moves the numbers):

| | house `137_REPOS.mp4` (lift) | amber `_drop` | steel `_pit` |
|---|---|---|---|
| verify_reel | 9/9 | 9/9 | 9/9 |
| motion median · failing | 9.68 · 0/14 | 10.64 · 0/14 | 9.71 · 0/14 |
| the HOOK's own row | 9.35 | 15.94 (was 3.58) | 7.15 (was 3.88) |
| tails stalling | 0/14 | 0/14 | 0/14 |
| HOOK_LUMA raw → encoded | 150.3 → 148.4 | 156.6 | 149.3 |
| BODY_SAT · BODY_BLACK p10 | 64.0% · 26.5 (encoded) | 61.3% · 26.4 | 60.7% · 28.3 |
| open gate (5s mean · buckets) | 11.55 · 8.7 12.8 8.2 15.7 12.3 | 16.57 · 12.7 17.9 15.8 22.7 13.8 | 10.02 · 10.0 6.9 5.2 16.0 12.0 |
| captions (word_caption_audit --cuts) | ✅ every line outlives its word | — | — |
| cue collisions (`rps_cue_collisions.py`) | 100 cues · 0 | same bank | same bank |

**dHash on the three DELIVERED encodes: mean 20.4 · MIN 10 → PASS** (the one 10 is lift/pit at f1184, the
wide CTA shot; the raw renders read 12 there — the encode costs a bit or two, so leave headroom above 10 next time).

**Delivered to `Faceless/137 - REPOS/`** via `tools/rps_deliver.sh` (delete → settle → create → item-id + size
loop): `137_REPOS.mp4` (21,225,245) · `137_REPOS_drop.mp4` (21,668,118) · `137_REPOS_pit.mp4` (21,537,236) ·
three caption files (1,851 each) · `137_REPOS_sheet.png` — **7/7 with real Drive item-ids and matching sizes.**
No .docx delivered ([[feedback_reel_deliverable_is_the_article]]).

**The article is built and committed but NOT LIVE.** `source-docs/REPOS - Four Repos That Upgrade Your Claude
Setup.docx` + the manifest entry are committed on `judge-132-guide` (c9b0611, pushed); `npm run content` built
31 blocks / 1,321 words, slug `four-repos-that-upgrade-your-claude-setup-anydoc-herdr-deepseek-harness-and-omniroute`.
⛔ `vercel --prod` was blocked by the session's permission classifier, so the deploy is Alex's step. Also found
while checking: `chenmedialabs.com/guides/*` 308-redirects to `chen.media`, and `chen.media` + `www.chen.media`
are ALIASED TO AN 8-DAY-OLD DEPLOYMENT, so the 132 / 134 / 135 guides are **404 today** too
([[risk_vercel_alias_pinned]]). One `--prod` + two `alias set` calls fix all four.

**Known and accepted:** 41.18s (outside 22-29s; four repos need it) · number 137 not 136 (ADHD took 136 in
parallel) · the VO says "millions of free tokens every single day", the frame shows the README's `~1.47B / MO` ·
word_audible cannot transcribe herdr / deepseek-harness / omniroute in isolation (proper nouns) · cue rate
2.4/sec, above the 1.0-1.5 band on the 135 precedent, every cue on an action · HOLD high on TAG2 75% / SPLIT
72% (reported, not gated) · `REELS.md` does not list 137 until the files are committed.

## STAGE 10 — REV 2: "more on brand with what's being spoken" (Alex, after delivery)

> *"the animations especially the hook scene here needs to be more interesting and more on brand with like
> whats going on with the animation github themed ig moreso and more detailed and more on brand yeah with
> whats being spoken since its a bit off topic here at times"*

**Diagnosed in one pass, not by generating concepts:** a short script printed the VO words falling under
every scene onset, and the two columns were read against each other.

| scene | the sentence under it | what the frame held | verdict |
|---|---|---|---|
| **LIFT (hook)** | "These four brand new open source **GitHub repos** will completely **upgrade** your **Claude setup**" | four anonymous machine parts on chains | ⛔ **the word GitHub is spoken in the first four words of the reel and was nowhere in the picture** |
| JAM | Office files "break the formatting" | files down a chute, he chokes, debris piles | ✅ |
| PRESS | "strips all the junk … in milliseconds" | the anydoc press stripping files | ✅ |
| READ | "turns them into clean markdown" | a markdown sheet going green line by line | ✅ |
| CRAM / SPLIT | "gets really messy" → "dedicated workspaces and split panels" | crammed agents → a wall of panels | ✅ |
| PLUGS / SWAP | "everything is literally a plugin" → "replace its brain" | plugboard → a claw swapping his core | ✅ |
| MANIFOLD | "runs out of credits … swaps to another model" | gauge to E, manifold, refill, tally | ✅ |

Eleven of fourteen were already staging their own line. **The hook was the outlier and it was the one Alex
named.** The MUTE TEST said it outright: with the sound off a viewer says "car parts", never "repos".

### What was built
- **`RepoCard`** — GitHub's own object: repo octicon, `owner/name` (owner muted, name in the real link blue
  `#0969DA`), the Public pill, the repo's real one-line description, and the footer every repo page has:
  language dot in the real linguist colour, star count, licence. Every string from the GitHub API,
  re-queried 2026-09-05 (which also refreshed the stars: 20,397 · 35,522 · 213,060 · 61,564).
- **The verb, drawn.** The card's install bar fills as it closes on the hero, a green tick stamps at the
  landing, the card is consumed and the hardware it carried seats on his body. Card in the air, hardware on
  the body.
- **`GhSign`** — the real GitHub mark at 286px on the shop wall, lit, diegetic.
- **`GhFitout`** in all fourteen rooms — the contribution graph in each room's own value ramp with cells
  filling as the reel plays, a commit rail whose branch forks and merges back, octicon stencils. One
  component, palette from the `Place`.
- **The three title beats are repo pages**, not luggage tags with a badge; **the CTA wall carries the four
  repo cards** under `ALL 4 LINKS · FREE`.

### Caught on probe stills, before any render
- ⛔ **Four legible cards at once was an unreadable pile.** ONE dominant card; the rest hang as hardware; the
  second card is still installing at the cut.
- ⛔ **`diegosouzapw/OmniRoute` rendered as `diegosouzapw/On`** — `nowrap + overflow:hidden` truncating a real
  repo name. The line now scales to its own length and the Public pill yields to it.
- ⛔ **The contribution graph was invisible**, drawn at z16 under `ShopWall`'s brick courses at z18 → z19.

## STAGE 11 — the rev-2 numbers, and a delivery bug that ate the live files

All three cuts, gates re-run on the **encoded** deliverables:

| | lift (house) | drop (amber) | pit (steel) |
|---|---|---|---|
| verify_reel | 9/9 | 9/9 | 9/9 |
| motion median · failing | 9.97 · 0/14 | 10.63 · 0/14 | 9.84 · 0/14 |
| **the HOOK's own row** | **11.59** (was 9.35) | **20.31** (was 3.58) | **9.43** (was 3.88) |
| tails stalling | 0/14 | 0/14 | 0/14 |
| HOOK_LUMA (encoded) | 151.3 | 153.4 | 144.3 |
| BODY_SAT · p10 | 61.5% · 26.5 | 57.5% · 26.3 | 58.9% · 27.9 |
| open gate mean | 15.03 (was 11.55) | 21.26 | 13.39 |

dHash on the delivered encodes **mean 20.6 · MIN 11 · PASS**. sfx_audit clean. Cue collisions 0/100.
JAM tail 0.62 → 0.84 (house), 0.52 → 0.72 (amber), 0.60 → 0.81 (steel) once the front-loaded slump
was replaced by a continuous in-panel push.

### ⛔⛔⛔ DELETE-THEN-CREATE DESTROYED A LIVE DELIVERY — the name is what gets stuck, not the folder

`rps_deliver.sh` deleted the morning's seven verified files and re-copied the rev-2 ones under the
**same names**. Result: **0/7 ingested after 18 minutes**, and the Drive API showed *nothing* named
`137_REPOS` on the server — the old set was gone and the new set had never arrived. Three probes
found the actual rule:

| probe | result |
|---|---|
| a 14-byte file under a **brand-new** name in the same folder | item-id in **25s** |
| a **22MB** mp4 under a **brand-new** name in the same folder | item-id in **30s** |
| the seven **reused** names | **never**, 18 min |

So it is not size, not the folder, not the mount. ⭐ **A name that DriveFS has a pending delete for
will not accept a new file.** Delete-then-create ([[feedback_drive_overwrite_never_ingests]]) is still
right for the *overwrite* failure it was written for, but it must not be the last step.

⭐ **THE FIX, now in `tools/rps_deliver.sh`: stage under a unique name, WAIT for the real item-id,
then `mv` onto the final name.** A rename inside DriveFS keeps the id the staged file already earned
(verified: `1KJLW2ywWHtt…` survived the rename byte-for-byte). The script also skips any file already
live with a matching id and size, because re-uploading re-poisons the name.

## STAGE 12 — REV 3: nine notes off the delivered cut (Alex, 2026-09-05)

| # | note | what was done |
|---|---|---|
| 1 | *"the background music sounds like it's near the END of the soundtrack, whereas it should be the BEGINNING"* | ⛔ the v1 picks were `ados@121s`, `ebm@44s`, `ados@175s` — chosen by an energy heuristic that never asked WHERE in the track a passage came from. All three re-cut off the front: `ados@0.75` · `ebm@4.61` (its first full downbeat, after a 4.5s fade-in intro) · `ados@11.99`. Onsets 0.015 / 0.000 / 0.030s. |
| 2 | *"at 4s the Claude sprite is way too small"* (THE JAM) | hero 236 → **330**, camera 1.0 → 1.06, crew band 4 → 3 at 170 so it does not crowd him |
| 3 | *"too much text on those cards, I wanna see more graphics heavy"* | `RepoCard` rebuilt: the repo's **mark is the biggest thing on it** (92u), the name is 31u, the star count 23u, the description paragraph and the owner/name line are gone (owner survives as a 12u caption). |
| 4 | *"at 10s I don't want the focus to be the machine — I want the DOCUMENT, how they transform"* | new `DocMorph`: a 310px page crosses the frame and **sheds its Office junk** — the coloured header band, the pie chart, the shape block and the tinted table each **peel off and fly** on their own clock, while ragged proportional lines snap to aligned monospace and pick up `#` and `-`. The press is the aperture it passes through, at 0.86 scale behind it. |
| 5 | *"at 21s each of the screens needs to be way more interesting, better detailed, not just lines"* | every split pane is a workspace now: agent name + live **WORKING / BLOCKED / IDLE** chip, a file tree, **syntax-coloured** code printing a line every six frames, a per-pane progress bar, and `waiting on input` on the blocked one. |
| 6 | *"at 26s I want a BIG PINK BRAIN transplanted on the guy's head, not that little dot"* | new `Brain`: a two-lobe silhouette with a central fissure, five gyri a side, a cerebellum lump and a stem, `lit` running dead grey-mauve → live pink. The dome comes OFF for S9 — the dead brain sits on his head, the claw tears it out and carries it up-left, the **live pink one swings in from the right at 1.14×** and lands on his head. It is also what lives under the dome everywhere else. |
| 7 | *"it needs to end right when it says the last word"* | 1236 → **1222 frames** (41.18s → 40.73s). "links." ends at 40.31s, so the tail went from 0.87s to 0.42s — just the SEND stamp, which moved to f1212 (40.40s, 0.09s clear of the word). |
| 8 | *"the Claude sprite in the middle at the beginning, bigger"* | hook hero 262 → **336**, and the rise cut 296 → 190 because a taller hero puts his head into the reserved plate band. |
| 9 | *"the hook isn't that interesting — I want four GLOWING GEMS that come to the front middle of the screen"* | new `Gem`: a cut stone with a table, crown facets, a pavilion, a specular and a soft light pool, carrying that repo's real mark and its star count. Four of them fly in from off-frame to a **shallow arc across the front of the panel**, landing on the three texture ticks already in the bank (f24 · f36 · f48); the first docks into him on the hero clank at f58 and its hardware seats on his hip; the second lifts off at f78 and is still travelling at the cut. All three hooks carry gems, each with its own delivery (flown in · dropped · run in by the pit crew). |

### Caught on probes, before the render
- ⛔ **frame-0 luma fell to 138.4** — the white repo cards had been carrying ~10 luma of the opening frame and saturated gems read brighter while measuring darker. The `floor` place itself was lifted (`#C6BBA8` → `#D2C7B2`) and the first gem now enters before f0: **144.0**.
- ⛔ **a 17-frame doc morph read as a JUMP.** 0.57s is not enough for a viewer to watch junk leave a page — widened to 30 frames and the pieces now travel 400px instead of 240.
- ⛔ **the enriched panes were behind the reserved plate band**: the monitor stood 470px tall with its top at y −6. Shorter (300) and lower (GY−108).
- ⛔ `mix()` takes two arguments and `lerpHex` is the three-argument one; and a local `const dark` shadowed the imported helper of the same name.

## STAGE 13 — rev 3 delivered (2026-09-05)

All three cuts, gates on the **encoded** deliverables:

| | lift (house) | drop (amber) | pit (steel) |
|---|---|---|---|
| verify_reel | 9/9 | 9/9 | 9/9 |
| motion median · failing | 10.74 · 0/14 | 12.54 · 0/14 | 10.96 · 0/14 |
| tails stalling | 0/14 | 0/14 | 0/14 |
| HOOK_LUMA (encoded) | 152.7 | 158.0 | 148.5 |
| BODY_SAT · p10 | 54.0% · 25.6 | 56.4% · 25.9 | 57.5% · 28.4 |
| open gate mean | 11.51 | 19.51 | 12.29 |
| ENDS_TIGHT | 0.14s | 0.12s | 0.14s |

**dHash on the delivered encodes: mean 23.8 · MIN 12 · PASS.** sfx_audit clean. 94 cues, 0 collisions.
Delivered 40.79s each, `yuv420p` / `bt709` / `tv`, 1222 frames.

### Three gates that only failed after the rev-3 edits
- ⛔ **SFX_CUES: a DEAD cue at 40.87s in all three cuts.** The source had already been fixed (SEND moved to
  f42) — `verify_reel` reads `video/137_repos.intent.json`, which is GENERATED from the source by
  `tools/rps_intent.py` and had not been regenerated. ⭐ **A manifest built from the code is only true at
  the moment you build it: regenerate it in the same breath as any beat or length change**, or the ship
  gate grades the reel you used to have ([[feedback_the_audit_scene_list_drifted]] in a new costume).
- ⛔ **dHash MIN collapsed 11 → 4**, at f255 (PRESS, house/steel 4) and f356 (READ, amber/steel 8). Two
  causes, both the same mistake: steel's new PRESS shot framed the same centre at 1.0 against house's 1.12,
  and READ was still on the generic `shotsFor` nudge, which gave amber 1.56 and steel 1.52. Explicit sizes
  on explicit centres fixed both. Then **the encode cost three more bits** and exposed JAM at 8 (1.06 vs
  1.20 on one centre) → three real sizes: the bay, a CU on the choke, a medium down on the pile. **12.**
- ⛔ **ROLLOUT stalled in all three** after the trim: Q1 is the lift lowering and the composer sliding in,
  so the scene mean is high and four install ticks in Q4 could not lift the ratio. A continuous in-panel
  push from f8 fixed it, the same lever as JAM.

⭐ **Every dHash failure this reel has had was the same shape**: two cuts framing the SAME CENTRE at scales
within ~15% of each other. The fix is never a regrade or a nudge; it is a different SHOT SIZE on a different
POINT ([[feedback_variants_need_shot_sizes]]). Measure it on the ENCODE, never the raw render.

## STAGE 14 — REV 4: thirteen notes, and a VO re-time (Alex, 2026-09-05)

| # | note | what was done |
|---|---|---|
| 1 | *"the pauses in between scenes are too long"* | ⛔ Measured: 4.28s of gaps, four over 0.4s. The 13 gaps were tightened IN THE CUT (never re-spliced from raw — the 14 keep-windows already removed six flubs), cutting only from the longest sub −45 dB run inside each gap and always leaving 45ms of it, because **the stored word END runs early and the head of a "gap" is the word's RELEASE**. 7 gaps tightened, **1.072s removed**, reel 1222 → **1190 frames**. The tightened take was re-transcribed and diffed: 163 of 166 words, differences only the known proper-noun mishears. |
| 2 | hook gems *"moving or shaking or glowing, more interesting"* | the `Gem` now breathes (halo + scale), jitters on its own clock, sweeps a **glint** across the facets every 46 frames, throws three orbiting sparks, and **shakes** on arrival |
| 3 | *"the Claude sprite needs to be bigger in the hook. When it eats the gem it should change colour and look upgraded, with SFX"* | hook hero 336 → **372**; on the dock a full-body **flash** in the repo's colour decays over 10 frames, a soft aura stays for the rest of the hook, motes rise off him, and `c_power.wav` layers under the existing clank. ⛔ The flash is a FLASH — the hero is never permanently tinted, that is what makes him Claude |
| 4 | *"at 5 seconds the Claude sprite is quite small"* | JAM hero 330 → **402** and the camera pulled back to hold him |
| 5 | *"the cards need better design — no Rust or MIT, just the name and the stars; more Claude sprites around; not that long"* | the language dot and licence are gone and the **star count owns the row at 30u**; three crew Claudes now POP UP around the card on staggered beats; the card is home by f7 instead of f9-18 so the second half of the beat belongs to the reaction |
| 6 | *"at 8 seconds have a SLIDER that swipes on the documents showing how it does that"* | `DocMorph` rebuilt as a **two-layer wipe**: the Office original ahead of a bright scan head, the finished Markdown behind it, junk flying off as the head reaches each column, sparks trailing. PRESS motion **9.2 → 26.3** |
| 7 | *"at 14 seconds the anydoc doc going green needs to be a lot more elevated"* | the same scan head runs DOWN the sheet, each of eleven lines lands its own green tick, and the finished sheet sails out of frame |
| 8 | *"at 19 seconds the messy coding agents window needs to be way more interesting"* | eleven half-overlapping terminal windows, each jittering, three throwing error dots, **arriving one at a time** across the scene |
| 9 | *"at 21 seconds the split panels need to be more interesting"* | the mess windows **fly into the four panes**, so the split is the payoff of the mess and not a separate idea; panes print longer |
| 10 | *"at 24 seconds more elevated"* | every plugboard seat now jolts the whole rack, fires a ring and dust at its own socket, and the MODEL lands last with the bay flaring |
| 11 | *"at 28 seconds the new brain should GLOW, yellow, and the room gets darker"* | a gold halo on the live brain, motes, and a scrim at z50 — **under** the hero and the brain — so the room dims and the two things the sentence is about are the only lit objects |
| 12 | *"at 33 seconds the sprite is so small, scrap the concept and completely redo"* | MANIFOLD rebuilt: hero 240 → **430**, centre frame, carrying all three beats himself (his gauge falls to E → a real model canister flies off the shelf and SLAMS into his tank → tokens pour in and the counter runs). The manifold is the machine behind him now |
| 13 | *"more SFX design and better SFX design"* | 100 → **104 cues** (2.52/sec): a collect per gem landing, a power-up on the absorb, a shine per scan head, blips on the lines going green, a collect on the MODEL seating. ⛔ `c_unlock.wav` measured as **AIR** and was replaced |

### Rev 4 delivered (2026-09-05) — 1190 frames / 39.67s

| | lift (house) | drop (amber) | pit (steel) |
|---|---|---|---|
| verify_reel | 9/9 | 9/9 | 9/9 |
| motion median · failing | 11.59 · 0/14 | 14.24 · 0/14 | 11.53 · 0/14 |
| tails stalling | 0/14 | 0/14 | 0/14 |
| open gate mean | 12.49 | 20.47 | 13.39 |

Encoded house: HOOK_LUMA 152.7 · BODY_SAT 53.2% · p10 28.2 · look holds · 9/9.
**dHash on the delivered encodes: mean 22.4 · MIN 10 · PASS.** sfx_audit clean, 0 cue collisions.

⭐ **PRESS 9.2 → 26.3 from one prop change.** The scan-head wipe is the single biggest motion jump any
scene in this reel has had, because a bright bar crossing a 310px page repaints a quarter of the panel
every frame while ALSO being the clearest statement of what the tool does. When a note and a metric point
the same way, build the object that satisfies both.

⛔ **Tightening the VO moved every scene after S4 earlier, and four hero cues that had been safe landed on
the next sentence's first word.** A re-time is never just an audio edit: re-run the cue-collision map, the
intent manifest and every in-scene beat that was written as an absolute frame. READ lost 6 frames and its
tick at f130 simply never fired.

## STAGE 15 — REV 5: the article, a 1.4s hole, and three cuts sharing one hook bank

### 1. The article is LIVE
`vercel --prod` from `~/Downloads/chenmedialabs`, then all four domains re-aliased to the new
deployment. Verified 200 WITH the headline on `chen.media`, `www.chen.media` and `chenmedialabs.com`:
`/guides/four-repos-that-upgrade-your-claude-setup-anydoc-herdr-deepseek-harness-and-omniroute`.
⭐ The same re-alias fixed **132 JUDGE, 134 AGENTS and 135 AGENCY**, all of which were 404 because
`chen.media` had been pinned to an 8-day-old deployment ([[risk_vercel_alias_pinned]] again).
⚠️ The guide is committed on `judge-132-guide` (c9b0611, pushed) and NOT on `main`; a cherry-pick
conflicted because main is 79 commits behind, and it was aborted rather than resolved in a working
copy other sessions share. Live today; at risk only if someone deploys from `main`.

### 2. *"at 32 seconds it literally goes still and nothing happens, it just stays there staring"*
⛔ **A per-frame trace proved it exactly: frames 964-1006 ran at motion 0.8-1.4 — 43 consecutive
frames, 1.4 seconds, of a held picture.** The scene mean was 8.2 and the tail ratio 1.33, both green.
⭐ **A scene average cannot see a HOLE any more than it can see a tail** — when a note names a
MOMENT, trace the frames ([[feedback_a_scene_average_cannot_see_a_tail]]).

Three fixes, in the order they were tried, and what each was worth:

| fix | frames under 2.0 |
|---|---|
| (start) a needle sweeping and nothing else | **43 of 89** |
| a CREDITS counter falling to zero, the feed dying, a LOW BALANCE strobe | 39 of 89 |
| + the 430px hero PACES and the camera pushes 0.26 | 17 of 105 |
| + a **700px feed line whose fluid recedes across the frame** in 30 frames | **0 of 105**, floor 2.18 |

⛔ **A big object is not enough — the TRAVEL has to survive the downsample.** A 430px sprite pacing
±86px over a 17-frame cycle moves ~5px/frame, which is **1px** after the audit's 1012→240 reduction.
The 40px floor is about how far a thing MOVES, not how big it is ([[reference_motion_arithmetic]]).

### 3. *"trial version 3, the SFX are not aligned with the animation"*
⛔⛔ **One `SFX` bank was played over three different hooks.** The cues were written for LIFT — gems
landing at f14/24/36/48, the absorb at f58 — while DROP lands its parts at 28/52/76 and PIT at
30/48/66. Every hero hit in two of the three cuts fired against nothing.
⭐ **Three cuts are three hook COMPONENTS, so they are three cue banks**
([[feedback_three_cuts_three_hooks_fix_all_three]]). `HOOK_SFX: Record<HookId, Cue[]>`, and the
reel plays `[...HOOK_SFX[hook], ...SFX]`. ⛔ `tools/rps_intent.py` and `tools/rps_cue_collisions.py`
had to be taught to read the `lift` bank too, or they grade a reel whose first 3.4s declares no cues.
⛔ The split pushed `c_collect` to 5 uses at 66% bright and `tick` to 7 at 81% — both **SLAP**. The
mechanical half of each landing moved to `thock` (1.3% bright).

### Rev 5 delivered (2026-09-05)
verify 9/9 ×3 · motion 11.59 / 14.24 / 11.53, 0/14 failing, 0/14 stalls · encoded house
HOOK_LUMA 152.7 · BODY_SAT 53.2% · p10 28.6 · **dHash mean 23.2 · MIN 11 · PASS** · sfx clean ·
110 cues, 0 collisions. The 32s window: **0 frames under motion 2.0** (floor 2.18, was 0.82).

## STAGE 16 — REV 6: the hook was one concept in three costumes

Alex: *"the first 5 seconds are not interesting enough whatsoever, people scrolled away hard within
the first even 3 seconds."* Third hook on this reel.

⛔ **Measured first, against three reels that shipped** (panel crop, 0-6s): mean frame-to-frame Δ
**5.26** against FREE 4.87 / JUDGE 6.79 / BUILD 5.14, f0 subject **9.86%** against 8.95 / 27.99 /
14.61. **Dead centre of the band.** Not churn, not a pale frame 0 — so no measurement could have
found it, and the only tool that could was the column:

| round | the hook |
|---|---|
| 1 | four PARTS on chains · a Claude on a lift RISES · one LOCKS on |
| 2 | four REPO CARDS descend · a Claude on a lift RISES · one INSTALLS |
| 3 | four GEMS fly to the front · a Claude on a lift RISES · one is ABSORBED |

> *in all of these, objects come to a Claude who is standing still, and one attaches to him.*

**PASSIVE ACCRETION**, three costumes. Written up as
[[feedback_passive_accretion_is_the_hook_trap]]. Against the winning-hook checklist it failed five of
eight: no body working, f0 not already the joke, the event spread over 58 frames, the hero barely
travelling while the props did, and a wait in the last third.

### All three cuts rebuilt as ONE BODY AGAINST A LOAD
New prop `Sled`: a flatbed on wheels that **roll off distance, not off `f`**, carrying the reel's own
four villains — the Office files, the tangled agent window, a dead core and a dry drum.

| cut | mechanism | travel |
|---|---|---|
| house | **HAUL** — drags it left to right; each repo slams into him and he gets further | 560px / **1.7 body widths** |
| amber | **PRESS** — the load is ON him; he pushes it back up, and it sheds at the cut | 338px / 0.88 |
| steel | **TEAM HAUL** — crew on the tailgate, travelling right to left | 392px / 1.06 |

| | the accretion hooks | the haul |
|---|---|---|
| mean Δ 0-3.4s | 5.26 | **5.82** |
| min Δ | 1.14 | **1.50** |
| frames under Δ2.0 | — | **9** (FREE 15 · JUDGE 14 · BUILD 19) |
| min subject share | 2.10% | **7.94%** (winners 2.25-6.44%) |

⭐ **A hero who receives is only as interesting as the thing arriving. A hero who WORKS is interesting
between the arrivals** — which is the stretch a viewer actually scrolls in.

Delivered: verify 9/9 ×3 · motion 11.59 / 12.16 / 11.53, 0/14 failing, 0/14 stalls · encoded house
HOOK_LUMA 151.3 · sat 53.2% · p10 28.5 · **dHash 23.5 / 11** · sfx clean · 104 cues, 0 collisions.
⛔ Two more full-width characters inside hex colours (`#55４C40`, after `#C05türk` in rev 3); there is
now an ASCII scan over every `Rps*.tsx` hex token.

## STAGE 17 — REV 7: the black edge, the card as a badge, and the press pose

| note | cause | fix |
|---|---|---|
| *"the far right of the screen is just black, cuts 1 and 3"* | ⛔ `Cam` is **scale-then-translate**, so the `x={-0.45 * dist}` I used to follow the haul slid the 1012-wide set and left bare stage at the panel edge. Covering a 252px translate would have needed s ≥ 1.99 ([[feedback_the_crop_bound_includes_cam]]). | **no camera translate at all.** The travel happens inside the frame: house 560 → 420px, steel 392 → 340px, both still ≥ 1.0 body widths |
| *"they need to be way more elevated"* | — | dust off BOTH wheels restruck on every surge, the load breaking loose and shedding cargo on the last surge, camera push 0.06 → 0.10/0.11 |
| *"I don't want to see just an animation for a GitHub repo card — let's see the next animation and the card can be at the top"* | the three title beats were whole scenes whose only content was a card | the beats stop being scenes: `JAM`, `CRAM` and `MANIFOLD` take a **`lead`** and start that many frames early, every internal beat offset by it, with `CardTop` riding the card in at the top of the panel and out again. ⛔ Every SFX cue is anchored to the LATER `L` key, so **not one cue moved.** |
| *"trial cut 2 doesn't look like it's pushing it up"* | the Mascot has no arms-overhead pose, so a bed floating above him read as a bed floating above him | two `Forearm`s locked on the underside plus drawn hand pads, and they shorten as he presses so the push has a distance |

### ⛔ AND THE AUDIT'S SCENE LIST DRIFTED THE MOMENT THE BEATS MERGED
With the title beats hosted, `TAG1` and `TAG2` were still in the scene list, so the audit graded two
29- and 24-frame windows **whose first quarter is the scene cut itself** — Q1 42 and 53 against Q4 1.5
and 2.2, reported as STALLS. Filling the windows with real action lifted Q2-Q4 (1.26 → 4.28) but could
never fix a ratio whose numerator is a cut. ⭐ **The list, not the reel, was wrong.** A key whose
comment name now starts with `x` is a CUE ANCHOR, not a scene, and `tools/rps_scenes.sh` skips it:
14 slices → **11**, and stalls 2/14 → **0/11** ([[feedback_the_audit_scene_list_drifted]]).

### Delivered
verify 9/9 ×3 · motion 10.45 / 11.54 / 10.54, 0/11 failing, **0/11 stalls** · encoded house
HOOK_LUMA 151.1 · sat 52.1% · p10 28.8 · **dHash 23.8 / 11** · sfx clean · 104 cues, 0 collisions.
⛔ A third full-width character in a hex colour (`#55４C40`); the ASCII scan over `Rps*.tsx` now runs
as part of the edit pass.

## STAGE 18 — REV 8: the hook is the Claude mark

> *"I don't really understand the concept of the gem coming in and he's wheeling the thing — wtf is he
> even wheeling, it looks so odd and out of place, it doesn't even seem on topic with Claude. Maybe it
> should be a big logo of Claude with white background idk."* · *"trial reel concept 2 doesn't really
> make much sense either."*

⛔⛔ **Round 4 had the right SHAPE and the wrong OBJECT.** The haul was one body against a load,
travelling 1.7 body widths, and measured at or above three shipped reels on every axis — and a sled
piled with villains is still a thing a viewer has to *work out*, which costs the three seconds the
reel is buying. **No gate can measure recognisability.** Written up as
[[feedback_an_invented_object_costs_the_open]].

⭐ The half-formed image was the answer, and two standing rules had already said it: *"a single logo at
416px in the product's own colour beats six props"* and *"the hero scene carries the Claude mark at
200px+."* So the hook IS the mark — the real `claude.svg`, dead grey at f0, going full colour as four
GitHub repos dock into it, on a near-white bay. Nothing to decode.

**Three cuts = three VERBS on one object**, which also separates them on geometry alone:

| cut | verb | first render | after |
|---|---|---|---|
| house | **SPIN-UP** — a stalled rotor; each repo slots into the rim and it turns faster (0.3 → 10.4 °/frame) | 13.79 | 13.79 |
| amber | **CHARGE** — the mark fills with colour a quarter-turn per repo, behind a turning collar | **5.21 STATIC** | 7.96 |
| steel | **GROW** — 246 → 566px, a size jump per repo, docked repos orbiting it | **4.62 STATIC** | 8.15 |

⛔ **A state change on a logo is not motion.** A colour fill changes no geometry and a scale step is
followed by a hold; both measured STATIC first time. Fixed with something turning the whole time and
something crossing the frame between beats — only a moving EDGE repaints.

⛔ A first pass split the mark into four quadrants and flew them in. On the probe **a quadrant of a
sunburst reads as a grey ARROW**, not as a piece of the Claude logo — the same legibility failure one
round later. The mark is never cut up.

### Delivered
verify 9/9 ×3 · motion 10.59 / 11.19 / 10.54, 0/11 failing, **0/11 stalls** · encoded house
HOOK_LUMA 182.9 · sat 52.0% · p10 28.8 · **dHash 24.3 / 11** · sfx clean · 104 cues, 0 collisions.

## STAGE 19 — REV 9: cut 3 is the reference, so lift 1 and 2 to it

> *"the third one is pretty good here, the first one should be elevated and improve significantly way
> more here and the last one here."*

⭐ **An approved cut is a specification.** Rather than guess at "elevated", the GROW cut was read for
what made it work and each of those levers was checked against the other two:

| lever | grow (approved) | spin-up (before) | charge (before) |
|---|---|---|---|
| how big the mark gets | **566px** | 248px, inside a heavy ring | 486px, fixed |
| does it change SIZE | yes, four steps | no | no |
| is the progress STATED | yes, plinth sockets fill L→R | only the socket colour | only the fill angle |
| something crossing frame between beats | orbiting repos | rotation only | collar only |

So both were given the missing levers, not a new idea:
- **the mark itself** 46% → **65%** of the rotor face, and the ring slimmed 0.115 → 0.095
- **SPEED ARCS** off the rim whose LENGTH is the live degrees-per-frame, so the eye reads acceleration
  rather than "it is spinning"
- an **RPM readout** climbing 144 → 4,992 and an **UPGRADED %** climbing 0 → 77 — a real number moving
  is the top of the motion table and it states the claim
- both assemblies **grow and rise** as they come up, so the beat has scale as well as its own verb

⭐⭐ **AND THE BAY ITSELF WAS THE FLOOR UNDER ALL THREE.** `Cyc` was a flat gradient sheet: no floor,
no horizon, no key, so the mark floated on paper. It is now a real cyclorama — wall, floor plane with
a horizon seam, a warming overhead key, corner falloff for value structure, and the shop's gantry
cropped by the top edge — plus `Contact2`, the shadow the mark drops on the floor. That one change
lifts every cut, including the one that was already approved
([[feedback_rooms_need_an_architecture_layer]]).

| hook motion | before | after |
|---|---|---|
| spin-up (house) | 13.79 | **19.91** |
| charge (amber) | 7.96 | **10.27** |
| grow (steel) | 8.15 | 6.74 (mechanism untouched, new bay) |

⛔ Both rings first grew past the panel and lost their housing to the crop — capped at 638 and 574.

### Delivered
verify 9/9 ×3 · motion 10.59 / 11.19 / 10.54, 0/11 failing, **0/11 stalls** · encoded house
HOOK_LUMA 170.8 · sat 52.0% · p10 28.8 · **dHash 23.9 / 11** · sfx clean · 104 cues, 0 collisions.

## STAGE 20 — REV 10: the gems glow, and cut 2 gets a moving point of interest

> *"the first and second ones here … also the final note on the gem in the beginning scene here is not
> good and it should be glowing and stuff here glowing neon."*

### ⛔⛔ A STANDING RULE WAS OVERRIDDEN ON PURPOSE — and the override is bounded

`feedback_reel_matte_palette` says, in Alex's own words from reels 46, 79 and 124:
**"⛔ NO COLOURED GLOW. Kill every `boxShadow: 0 0 Npx <colour>` … never emissive bloom."** He then
asked for glowing neon by name. Both are real, so the question is what the rule is actually
protecting against, and its own text answers it: **neon-on-BLACK** — "dark navy/near-black
backgrounds with glowing accents are the #1 'looks coded' tell."

So the glow was built and **fenced**:
- it exists **only on the four `Gem`s in the hook**, behind a `glow` prop that defaults on for them
  and is never passed by a body scene;
- the ground under it is the near-white `Cyc` bay, not a dark set, so nothing reads as a screen;
- every body scene keeps the matte palette, solid paints and dark drop-shadows, untouched.

⭐ The general lesson: **when a note collides with a standing rule, read the rule for its FAILURE
MODE, not its wording.** A ban on emissive bloom written from three neon-on-black rejections is not a
ban on a lit stone on white paper. Say so out loud to Alex either way — an unflagged override is how
a rule quietly dies.

### What "glowing" is made of

A halo alone measured as a brighter shape, not a lit one. Five layers, all driven by the existing
`pulse` so they breathe on the gem's own clock:

| layer | size | what it does |
|---|---|---|
| wide pool | `s * 2.44` | the light it throws on the bay |
| hot core halo | `s * 1.40` | white at the centre, so there is a source not a wash |
| 8 light rays | `0.62–0.88 s`, rotating `f * 0.7` | length modulated per-ray on `sin(f/5 + i·0.9)` |
| comet trail | `s * 2.6 * trail` | only while `k < 1`, i.e. while it is still flying in |
| emissive core | inside the stone, clipped to `CUT` | ⭐ what makes it read as LIT rather than bright |

Gem sizes went up with it (132→140 house, 128→136 amber, 126→134 steel) — a halo on a small stone
just looks like blur.

### Cut 2: a boundary that exists is not a boundary that MOVES

The charge sweep was a conic gradient whose edge advanced. That is an edge, and an edge repaints —
but it has no point of interest, so the eye has nothing to track. Added:
- a **charge head**: a 10px bar riding the leading edge of the sweep, white at the tip falling to
  transparent at the hub, so the fill has something to *watch*;
- **burst spokes**: 7 rays per landed quarter, thrown outward over 20 frames in that repo's colour,
  so the beat has a consequence outside the disc.

### ⛔ THE JSX MULTI-LINE COMMENT BUG, THIRD OCCURRENCE

`{/* … */` instead of `{/* … */}` for the third time this reel — TS1005 reported at a line far from
the cause every time. It is now a permanent pre-render scan alongside the full-width-unicode-in-hex
scan:

```bash
grep -Pzo '\{/\*(?:(?!\*/).)*\*/(?!\})' video/src/Rps*.tsx   # must be empty
```

### Delivered
verify 9/9 ×3 · motion 10.59 / 11.19 / 10.54, 0/11 failing, **0/11 stalls** · hook motion
19.89 / 10.41 / 6.81 · encoded house HOOK_LUMA 170.8 · sat 52.0% · p10 28.8 · **dHash 23.9 / 11** ·
sfx clean · 104 cues, 0 collisions · 7 files live in `Faceless/137 - REPOS/` with real item-ids.

## STAGE 21 — REV 11: the hero's body is the status bar

> *"after it feeds the last file at 6 seconds, make the claude start turning red with each file and
> like steaming etc becuase its dying / like add more interesting stuff like that here throughout
> the animation."*

⭐⭐⭐ **THE NOTE NAMED ONE BEAT AND THE FIX IS A DEVICE.** "Throughout" is the operative word: the
answer is not a red Claude at 6s, it is a rule the whole reel obeys, so the viewer learns to read his
paint. Every pain beat in this reel already happens TO him — he is the one the files jam, the one
watching four agents fight over a window, the one whose model goes dumb, the one whose tank runs
dry — and in all four he was standing there in stock clay. Two states on `Rig` carry all of it:

| state | what it means | where it fires |
|---|---|---|
| `heat` 0→1 | OVERLOADED — clay → `#C44A3A` → scorched `#8E2A19`, he boils and hops slower | JAM (up), PRESS + READ (down), CRAM (up), SPLIT (down) |
| `drain` 0→1 | STARVED / DUMB — the colour goes OUT of him to ash `#A9A096` | SWAP's dumb model, MANIFOLD's empty tank |

⭐ This is the ACTOR mapping the metric rule keeps asking for
([[feedback_the_metric_makes_paper]]): the state is on the WORKER, never on a gauge. And it is one
table, one call — `Mascot` already takes a `tint`, so the sprite is coloured, not the plate
([[feedback_colour_the_sprite_not_the_plate]]).

### The named beat
The three files arrive at f42 / f53 / f91 of the merged scene = 4.80s / 5.17s / **6.43s**. Each takes
him a third of the way over. On the third: the fault lamp snaps on, `motor_sag` pitched to 0.72 lands
under the same punch, he goes scorched, and then he sinks and dies with the steam still coming off.

### ⛔ THREE BUGS, ALL MINE, ALL CAUGHT ON THE PROBE

1. **THE STEAM RENDERED BLACK.** `hexa(lerpHex(a, b, t), α)` — `lerpHex` emits `rgb(...)` and `hexa`
   parses HEX, so the alpha was NaN and every wisp painted black. Dark circles all over the pegboard.
   Exactly [[feedback_nested_colour_helpers_go_black]], written down and walked into anyway. The prop
   mixes its channels as NUMBERS now and emits one `rgba`.
2. **THE PLUME DETACHED FROM THE BODY.** A `sin(t·π)` fade is ZERO at t=0, so no wisp was ever visible
   at the emitter and the steam floated as a cloud further up the wall with a gap under it. It ramps
   in over the first sixth of the life now, which is what puts a wisp actually ON him.
3. **THE DEBRIS DID NOT SINK WITH HIM.** Once the slump was deepened, the late fourth cough hung over
   the face doing the dying. It rides the same offset as the hero.

⛔ And a fourth, in the drawing rather than the code: equal blobs with hard edges read as BUBBLES, not
as steam — a string of balloons up the pegboard. Per-wisp size off `rnd` plus a radial FALLOFF fixed
it ([[feedback_props_need_real_drawing]]).

### Delivered
verify 9/9 ×3 · motion **10.59 / 11.54 / 10.70**, 0/11 failing, 0/11 stalls · hook 17.42 / 11.99 /
8.46 · encoded house HOOK_LUMA 170.8 · sat 49.2% · p10 28.7 · look holds · **dHash 24.5 / 11** ·
sfx clean (`motor_sag` 86.6% <250Hz, nowhere near AIR) · 105 cues, 0 collisions · 7/7 item-ids.

## STAGE 22 — REV 12: the game completion sound, and where it is actually allowed to go

> *"have like a game completion sound at the final gem of the hook animation here."*

The fourth repo docks at f92 / f92 / f94 — **on top of "setup."**, the hook's sentence-final word —
and the hook's VO runs WALL TO WALL, 0.00 to 3.09s, with not one gap in it. On top of that every cue
in this reel plays **0.1s EARLY** on the J-cut lead (`rps_cue_collisions` models it), so a cue asked
for "at the gem" actually starts 123ms before that word has finished. Split it the way a game does:

| | frame | cue | job |
|---|---|---|---|
| on the gem | 92 / 92 / 94 | `c_1up` 0.09s @ TEXTURE | the collect BLIP, on the landing frame |
| on the cut | 105 | `c_powerbig` 0.28s @ MID−2 + `c_clear` @ TEXTURE+3 | the stage-clear FLOURISH, blooming across the hook→TAG cut |

### ⛔⛔⛔ THE SAFE WINDOW IS MEASURED ON THE MIX, NOT READ OFF THE CAPTION FILE

This cost two full renders and it is the whole lesson of the round.

| source | where "setup." is |
|---|---|
| `words_repos137.json` (the caption file) | 2.79 – **3.09** |
| whisper, on the delivered MIX | 3.02 – **3.26** |

A first pass put the fanfare at 3.20s believing that was 110ms of clear air after the word. It was
**180ms INSIDE it**, and `word_audible` heard the isolated slice as **'concept.'** — the word gone.
A second pass at f92 with a louder ping read as **'Clutch.'** Fix 3 of
[[feedback_cues_land_on_sentence_ends]] says *"use the MEASURED end of the word, not the word file's"*
in those words, and I read the rule, quoted it, and then used the word file anyway.

⭐ The other half of the lesson: **a collision checker passing is not the word surviving.**
`rps_cue_collisions` reported **0 collisions** for the 3.20s placement, because it grades against the
caption file too. The only test that found it was re-transcribing the slice off the render
([[feedback_transcribe_the_deliverable]]). A probe that renders `--frames=0-150` is useless here as
well: whisper needs the sentence around the word to place it, so the loop is a FULL render each time.

Measured clean on the delivered encode: `setup. -> 'Cloud setup.' ok`, and the remaining NOT-AUDIBLE
list is byte-identical to the shipped v25 (`Anydoc.` `with.` `Herr.` `AmiRoute.` `links.` — the
standing proper-noun false positives).

### Delivered
verify 9/9 ×3 · motion 10.59 / 11.54 / 10.70, 0/11 failing · hook 17.42 / 11.99 / 8.46 · encoded
HOOK_LUMA 170.8 · sat 49.2% · p10 28.7 · look holds · dHash 24.5 / 11 · sfx clean (`c_1up` 4ms
attack, `c_clear` 6ms, `c_powerbig` 4ms) · **108 cues, 0 collisions** · item-ids on all three.
