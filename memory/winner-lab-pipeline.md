---
name: winner-lab-pipeline
description: "⛔ STANDING: the Winner Lab at ~/Downloads/winner-lab — decompose viral winners frame-by-frame into EDLs, moves + house numbers; gate our renders against winner metrics"
metadata: 
  node_type: memory
  type: project
  originSessionId: fd2a64f7-8d2a-4a40-a1dc-da7f726a2785
---

**The Winner Lab** (built 2026-07-09, Alex: "a much better more proven system to edit viral winner videos… maybe frame by frame screenshots of winner animations"). Lives at `~/Downloads/winner-lab/` (README = the process). Purpose: winners are decomposed into **numbers + frame-accurate animation grammar**, and our renders get measured against the same numbers — motion/edit craft made objective, complementing [[style-cloning-pipeline]] (static look) and [[script-factory-pipeline]] (topics/scripts, feeds its Stage 0 comps).

**Per winner:** (1) acquire via `yt-dlp --cookies-from-browser chrome` (works for IG; login-walled posts need the cookies flag); (2) `INGEST.sh <mp4> <slug>` → cut times + shot lengths, **hook burst (first 3.5s @12fps)**, **cut bursts (0.9s @12fps around first 8 cuts)**, 1fps contact sheet, **motion-energy curve** (signalstats YDIF per 0.5s), loudness, transcript; (3) decomposition workflow (3 agents: hook anatomist / cut anatomist / EDL builder → merged WINNER-EDL.md + MOVES.md + HOUSE-NUMBERS.md); (4) after 3+ winners, mine cross-winner house numbers; (5) **edit-metrics gate**: run the same extraction on OUR render and diff vs house numbers before ship.

**Corpus (4 videos):** `erase-footprint` (external, the XRAY structure comp — cuts median 3.6s, opens ON a motion peak, biggest spike on "here's the trick" @28.5s), plus **Alex's own lane: CLONE + BLUEPRINT (viral) vs vault-FAILED (negative control)** — his style is unique so HIS winners are the edit reference, external winners inform structure/script only.

**⛔ HOUSE NUMBERS from his own winners** (`corpus/HOUSE-NUMBERS.md`): length 35-39s · scene change every 4.5-7.2s median · **no segment >8.5s without a scene change**, and any scene >7s needs ≥3 sub-beats + never sits under ~0.7 avg motion (VAULT's two 10.8-10.9s holds were also its two CALMEST scenes = the killer combo LONG × CALM × CEREBRAL) · motion peaks AT transitions (style constant) · CTA-on-cream = engineered video-max luma spike, floor ~3s (VAULT gave it 2.0s).

**⭐ HOOK DOCTRINE (v2, refined by full frame-level decomposition — `corpus/HOOK-DOCTRINE.md`): CLAIM BEFORE SPECTACLE.** The discriminator is **readable-claim latency**, not raw motion: CLONE 0.0s (claim at frame 0, 0.57x calm), BLUEPRINT 0.0s (won even at 2.79 hook motion because its 7.49 spike fired at 1.5s AFTER the claim read for 1.4s), VAULT ~1.3s latency with its 9.97 video-max spike at 1.0s = spectacle before claim → died at 5s avg. Gate: claim fully readable at frame 0 · 0-2s motion ≤~2.8 · no pre-claim frame >7. Also MEASURED-FALSIFIED: "pause floor in the hook" (CLONE has zero first-10s gaps ≥0.35s; hooks run continuous-but-≤4.0wps — pace is the audio lever, pauses are a body-only style constant).

**Corpus artifacts now on disk:** `WINNER-EDLS.md` (frame-accurate CLONE/BLUEPRINT/VAULT EDLs), `MOVES.md` (20 named house moves w/ frame timing + Remotion recipes), `HOOK-DOCTRINE.md` (9 gateable rules), `vault-FAILED/RETENTION-FORENSIC.md`. ⛔ DATA FIX: `corpus/clone/words.json` is +1.45s offset w/ hallucinated head phrase — INGEST v1.2 now emits words.json + head cross-check + vo_metrics.json (wps/gaps) per winner; readable-claim latency recorded per reel as claim_latency.txt.

**Key rule this system enforces:** never imitate a winner from memory or a static screenshot — pull its EDL + moves from the corpus, build to its numbers, then measure the render against them. And: in-house winners outrank external comps for EDIT decisions; external comps rank for TOPIC/STRUCTURE decisions.
