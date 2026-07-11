---
name: mint-reel
description: Reel 34 MINT (Fable 5 takes over your BROWSER and does the clicks for you) + the reusable dark-mode browser-agent visual components + dark/dense/abstract style lessons
metadata: 
  node_type: memory
  type: project
  originSessionId: dc4535fe-9e5e-4442-8228-14b4f628f127
---

**Reel 34 MINT** (keyword MINT, ~33s, `src/ClaudeMintReel.tsx`, delivered `34_Claude-fable5-mint.mp4`). First reel of the universal Fable-power-move genre (see [[reel-winning-formula]] innovation-bar gate). VO recorded by Alex + spliced. Concept: **Fable 5 goes into your BROWSER and does your repetitive tasks itself, click by click** (apply to jobs, post content everywhere, scrape leads into a CRM) — you show it the task once, it does the clicks forever; the workflow carries to cheap models after July 12 (CLONE-style outlast). The one browser-agent idea that survived the "too basic" cut.

## VO / beats (L = [0, 6.68, 14.19, 17.93, 24.63, 31.48], CUT 33.3)
Hook (browser + cursor takeover) → UseCases (abstract automation hub) → Rehook (teach it once / recording) → Doing (it runs it itself) → Outlast (save workflow, cheap model replays for pennies) → CTA (comment MINT). ~33s, deadline-first, outcome-first, gated (the 3 setup prompts live in the guide).

## ⛔ Style lessons Alex enforced (now STANDING — see [[reel-ship-gate-pipeline]])
- **DARK-MODE SCREENS.** The browser/app UI must be dark-themed (dark navy screen, light text, warm clay/gold/green accent glows), NOT a light/cream screen. Only the SCREEN is dark; the reel background stays warm cream (premium contrast).
- **ABSTRACT DENSITY, not a static literal screen.** v1 (literal light browser + cursor) was flagged "way too boring." Fix = represent info abstractly + way busier: a central Fable "engine" pumping DATA STREAMS out to job-board/platform/CRM nodes, a TASK-SWARM grid of hundreds of cells lighting up (shows scale), notification pops, spawning tabs, ghost-window depth layers, a recording waveform. Mix literal browser (hero) with abstract layers.
- Outcome-first hook, deadline in line one, gate the payoff, comment at end — the standard formula.

## ⚠️ FINAL design = SPRITE-DRIVEN (the dark-UI-component concept below was SCRAPPED)
Alex rejected all the literal dark-browser-UI versions (see [[reel-ship-gate-pipeline]] "sprite-driven not UI screens"). The shipped reel is costumed-Mascot cartoon SCENES inside the Panel, one warm backdrop per scene:
- **Hook** (`HookScene`): dark night office → Fable **CRASHES from the sky** (motion streaks + double shock-ring + white papers knocked flying + squash) onto the LEFT of several **white busywork piles of varying height** → grabs the giant gold cursor and **SWEEPS left→right** clearing them (checkmarks rain) → green **CLEARED** badge (clean, no white stroke) → a dark **browser slides in and the cursor CLICKS the rows one-by-one** ("click by click"; blurred/gated rows → green checks) with onlooker sprites reacting. `BigCountdown` = **alarm-RED** 4-cell timer (DAYS/HRS/MIN/SEC, SEC ticks readably every ~4 frames) that pops in AFTER the crash. Header `ScreenHead` (chip suppressed in hook via `chip={false}`, big countdown instead).
- **UseCases** (`UseCasesScene`): 3 vignettes (jobs skyline / posts studio / leads vault→CRM) with a **CHANGING per-task title** timed to the VO — **APPLIES TO JOBS → POSTS YOUR CONTENT → FILLS YOUR CRM** — + one counter chip + LiveTag per vignette (kept clear of the title; the old redundant fraunces sub-labels were removed to fix overlap). Leads vignette warmed off teal/cyan to green/gold.
- Rehook/Doing/Outlast/CTA: teach-once desk, mission-control grid filling (3→240 on autopilot), save-it-once coins ($ saved), MINT setup card.
Shared Mascot/Sfx/ProgressBar/Captions/Panel infra cloned from `ClaudeCrewReel.tsx`. Hook SFX: metal_riser→whoosh→thock(crash) → swishes(sweep) → pop+ding(CLEARED) → 6 ticks(browser clicks).
- **Delivered at 1.05x** (Alex found 1.07x a touch fast): render at internal 1.07x timing, then ONE uniform ffmpeg pass `setpts=PTS/0.9813,fps=30` + `atempo=0.9813` (zero desync) → 28.8s. Per [[reel-vo-pacing]] whole-mp4 method.

## (scrapped) dark-UI browser-agent components — NOT in the final reel
`MBrowser/MCursor/CursorRig/MField/DataStream/TaskSwarm/NotifPop/WinGhost/MintAmbiance` were the rejected literal-screen build. Ignore unless building a genuine on-screen device/UI.

## Process notes
Built through the [[reel-ship-gate-pipeline]] (hook ideation: 5 concepts ranked → picked "ghost-cursor takeover"; then build → contact sheet → adversarial critic subagent → fix loop). Critic caught: empty cream space, cursor not reading as "moving" (added trail), mascot at edge. Then Alex's dark/dense/abstract note drove the full palette + hub rebuild.

## Guide doc — BUILT (2026-07-08)
`MINT - Automate Everything Setup.docx` in Final + Drive/Claude Reels (see [[lead-magnet-docs]]). Built by cloning the CREW docx zip and regenerating `word/document.xml` with the same styled XML blocks (gold F6EEDC/D8B65A boxes, clay F3ECDF/C2603A PASTE-THIS boxes w/ Consolas prompt body, Georgia title sz46, Aptos body) — the `docx` npm lib + original build scripts were NOT on disk, so the clone-template-and-regen-XML method is the reliable path (builder saved at scratchpad/build_mint_doc.py). Content: Read-this-first (teach once → save workflow is the asset) + 5-step one-time setup (Claude-for-Chrome/computer-use browser control, log in yourself, teach-once, save steps) + 3 PASTE-THIS workflow prompts (Apply to Jobs / Post Everywhere / Leads into CRM, each with approval-mode guardrails) + "keep it from misclicking" box + outlast + signoff. Zero em dashes (verified).

## Backlog
Other universal Fable power-moves in [[reel-winning-formula]] region (WORLDLOAD/REDFLAG rejected as cerebral/basic; PREMORTEM/ARENA/FORGE/DECODE/TASTE innovative alternates).
