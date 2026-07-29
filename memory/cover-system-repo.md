---
name: cover-system-repo
description: ⭐ The reel-cover design system is PUBLISHED at github.com/alexyc9381/claude-reels-workflow/tree/main/cover-system — 8 docs + standalone Remotion source + verify_cover.py. Read it before any cover work instead of re-deriving.
metadata: 
  node_type: memory
  type: reference
  originSessionId: 1f81264f-9182-4e86-b8e2-aa474c5df63e
---

# ⭐ The cover system lives in GitHub now

Published 2026-07-19 to **`github.com/alexyc9381/claude-reels-workflow/tree/main/cover-system`**
(the repo is PUBLIC, and Alex chose to publish the candid data including VAULT's ~10% watch,
the unshipped reels and the unverified-claim flags). Commit `4dfd631`.

⛔ **Read that directory before doing any cover work.** It supersedes re-deriving anything from
[[reel-grid-covers]], which remains the raw session record; the repo is the cleaned, verified,
reproducible version of the same knowledge.

## What is in it
- `README.md` — entry point, the five things that matter, honest status
- `01-SPEC` geometry · `02-COPY-SYSTEM` headlines · `03-SCENE-CONTRACT` (written to paste into an
  agent prompt) · `04-VERIFICATION` · `05-PIPELINE` · `06-FAILURE-MODES` (indexed by SYMPTOM, and
  contains a **client-feedback decoder** mapping Alex's phrasings to measurable defects) ·
  `07-CATALOG` all 23 covers with status flags and canonical filenames
- `src/` — **standalone and buildable**: ReelCovers{,2,3,4}.tsx + CarouselConcepts +
  ClaudePokeballReel + a minimal Root/index + package.json pinning remotion 4.0.370 / react 19.2.0.
  Proven: renders byte-identical output to the shipped covers (max pixel diff 0).
- `tools/verify_cover.py` — runnable gate, passes all 23 canonical covers.

## ⭐ How this was built, and the part worth repeating
7 section authors in parallel → **3 diverse-lens critics (reproducibility / accuracy /
completeness)** → 7 revisers. 17 agents, ~2M tokens. The critics are what made it real:
- ⛔ The reproducibility critic proved the first cut **could not build at all** — `src/` imported
  two modules I had not shipped, with no Root, no index, no package.json. I then actually rendered
  from the standalone tree and diffed against the shipped PNGs rather than asserting it worked.
- ⛔ The accuracy critic caught a contract that **rejected client-approved work** (a "gutter std
  < 65" gate, when MINT measures 67.9) and several numbers that did not reproduce.
- ⭐ It also caught my own README claiming "passes all 23" while the tool was being pointed at
  stale `*_FINAL.png` card-era renders. Those legitimately FAIL (quiet-zone 209..211 vs a 21..24
  floor) — they are the retired chassis, and they now serve as the repo's known-bad sample.

⭐ **Always run a reproducibility critic against a doc that claims to be reproducible.** "Trace
a fresh engineer from clone to first render and list every place they get stuck" found blockers
that no amount of proofreading would have.

Pairs with [[reel-grid-covers]] (the raw session record) · [[carousel-format-concepts]] (the
actual carousel system, which is a different thing) · [[factory-log-first]].
