---
name: script-style-replicator
description: "⛔ STANDING: when Alex says 'write this in <creator> style' / 'make a <creator>-style script' / 'what would <creator> post', load script-style-replicator/ — transcript-derived Script DNA for raycfu, mavgpt, nateherk, nicksaraev, cindiezhu + fusion protocol + creator router"
metadata:
  node_type: memory
  type: feedback
  originSessionId: fef06c7b-7d16-4946-9d58-ab81fdc68c7b
---

# Script Style Replicator (built 2026-07-12)

**When Alex wants a new script in a specific creator's voice/hook/structure**, load the module at
`script-style-replicator/` (repo root). It replicates the *script craft* of 5 elite AI creators from
their **real video transcripts** (not eyeballing). This is scriptwriting only; the visual/edit layer
is [[style-cloning-pipeline]] + the playbook. Feeds, does not replace, [[script-factory-pipeline]].

**The 8 creators + their voice (full router in `script-style-replicator/CREATOR-MATRIX.md`):**
- **mavgpt** — spoken-prompt consumer follow-along ("What happens when you ask Claude to [scary thing]?" → prompts → "here's the trick" → bonus).
- **raycfu** — named-module money system ("Most people don't realize…" → "The Scanner." "The Surgeon." each what→why→number).
- **nateherk** — frontier capability / news-react (result-first "Here's how to [outcome]…" → screen walkthrough).
- **nicksaraev** — receipts / $-result build (news-peg + skeptic-deflate + hard numbers "$8K→$2").
- **cindiezhu** — persona + no-jargon outcome ("Did you know Claude can now…?" → named personas + "which means…").
- **gregisenberg** — numbered-promise setup ("Why pay for Claude to use 10% of it? Here's the setup" / "N .md files that 10x it").
- **rileybrown** — live vibe-coding awe-demo ("Oh my… this shouldn't be possible" narrating a real build in minutes).
- **sabrinaramonov** — make-money-with-AI sequence/playbook ("If you've tried X and nothing stuck, you're doing the sequence wrong").

**How to use:** pick creator via the router (or Alex names one) → open `creators/<name>-dna.md` → fire
its §11 generation template on the topic + salt in §5 phrase-bank lines → run the **FUSION PROTOCOL**
(§4 of CREATOR-MATRIX: strip em-dashes, de-first-person → third-person receipt, gate-the-how, cut on
keyword, de-jargon, value-noun-by-word-12, breadth) → self-check against the Stage-1 kill-gate +
[[claude-reel-hook-library]] 10-point hook gate → hand off to the Stage-4 adversarial gate. Every
creator DNA doc ends with a **worked example** (a finished 35-45s Alex-niche script that passes the
hard rules) — use it as the pattern.

**Topic ideas:** `topic-ideas/<creator>.md` = 12-15 ideas in each creator's lane × Alex's niche
(frontier, outcome-framed, breadth-checked). These are Stage-0 **Door C** hypotheses — each still needs
Outlier Engine evidence + a fresh Stage-1 kill-gate pass before scripting (Door C is demoted, see
[[script-factory-pipeline]]).

**Viral video teardowns (forensic):** `teardowns/<creator>.md` dissects each creator's TOP viral
videos line-by-line AND word-by-word (33 videos across 8 creators): verbatim annotated beats, the exact
word/diction choices + why, an extracted fill-in-the-blank formula per video, virality mechanics, and a
hard-rule-clean "COPY IT" example. `teardowns/README.md` = the index + **11 UNIVERSAL VIRAL LAWS** that
repeat across all 33 hits. Three fidelity layers: DNA = the creator's *voice*, HOOK-BANK = a proven
*opener*, teardowns = an entire *proven video* to refit. Use teardowns to clone a SPECIFIC viral hit.

**Hook bank + feedback loop:** `HOOK-BANK.md` = a swipe file of all 65 real openers, tagged by hook
family + ranked by views (pull a proven shape for any hook). `PERFORMANCE-LOG.md` + `perf/` = the
feedback loop: log each shipped reel's retention (`perf/log_reel.py`), roll it into per-creator/per-family
**transfer scores** (`perf/compute_transfer_scores.py`) that tie-break the router by what actually
performs for Alex's audience, not just raw creator views.

**Add a new creator (stays fresh):** `script-style-replicator/ingest/` has the free toolkit
(`fetch_yt_loop.sh` + `clean_json3.py` for YouTube official captions; `fetch_tiktok.sh` +
`transcribe_whisper.py` for TikTok ASR via faster-whisper; `build_compilations.py`). Fetch their top
outliers → build the compilation → re-run the `script-style-dna-extraction` workflow. See `ingest/README.md`.

**⚠️ raycfu correction (transcript-derived):** the old folded-in note in [[nick-saraev-style-reference]]
/ [[nateherk-style-reference]] called raycfu "first-person / personal-story, conflicts with the
no-anecdote rule" — that was his MONTHS-OLD long-form. His actual viral SHORTS are value-first to "you"
on third-person receipts, first person only in the closing "I made a guide." His short-form already
obeys [[no-anecdote-value-first-scripts]] almost natively. `creators/raycfu-dna.md` is now his real
dedicated profile (he had none before). Pairs with [[mavgpt-style-reference]], [[cindiezhu-style-reference]],
[[claude-reel-topic-engine]], [[outlier-engine]], [[ig-reels-scriptwriting-principles]].
