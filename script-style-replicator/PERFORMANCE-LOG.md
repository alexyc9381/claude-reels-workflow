# PERFORMANCE LOG — which creator style actually performs for Alex's audience

The replicator's **feedback loop**. Every reel Alex ships that borrowed a creator's DNA gets one row
here, and 48-72h after posting the real retention numbers get filled in (same cadence as the Script
Factory POST autopsy). Then `perf/compute_transfer_scores.py` rolls it up into a **transfer score**
per creator and per hook family, so the CREATOR ROUTER stops guessing and starts using measured signal:
*which creator's voice keeps YOUR audience watching, not just which one matches the topic.*

This is the missing half of style-cloning. A creator's style working for THEM (raw views) is a
hypothesis; it working for Alex's faceless mascot account is the thing we actually optimize.

## How it works
1. When you ship a replicated reel, append a row below (or run `python3 perf/log_reel.py`). Fill
   everything except the POST columns.
2. 48-72h later, fill `s3_hold_pct` (3-second hold %), `avg_watch_s` (average watch seconds),
   `saves`, `comments` from the platform. This is the same data the reel's factory log records in
   its `POST{...}` block — copy it across.
3. Run `python3 perf/compute_transfer_scores.py` → writes `perf/TRANSFER-SCORES.md`: creators and
   hook families ranked by measured retention, with sample sizes.
4. The router (CREATOR-MATRIX §5) reads TRANSFER-SCORES as a tie-breaker: when two creators fit a
   topic, prefer the one with the higher measured transfer for Alex once n≥3 for that creator.

## Seeding
Historical reels can be partially seeded: the `POST{3s_hold, avg_watch}` blocks already logged in
`memory/reels/*-factory-log.md` + the hook family in `memory/reel-lever-ledger.md` give you
`hook_family` + retention for past reels. You can't retro-tag `creator_dna` for reels built before
the replicator existed, so leave that `-` for legacy rows; family-level scores still accrue.

## The log
Columns: `reel` (number/slug) · `date` (posted) · `creator_dna` (which profile, or `-`) ·
`hook_family` (one of the 6) · `keyword` · `topic` · `pred` (Stage-4 predicted /8) ·
`s3_hold_pct` · `avg_watch_s` · `saves` · `comments` · `notes`.
Leave a cell `-` when unknown. Rows tagged `EXAMPLE` are ignored by the compute script.

| reel | date | creator_dna | hook_family | keyword | topic | pred | s3_hold_pct | avg_watch_s | saves | comments | notes |
|------|------|-------------|-------------|---------|-------|------|-------------|-------------|-------|----------|-------|
| EXAMPLE-48 | 2026-07-11 | mavgpt | Open-Loop Question | INBOX | 3 agents run your inbox | 8 | 62 | 18.4 | 210 | 340 | example row, ignored by the script |
| EXAMPLE-49 | 2026-07-12 | raycfu | Curiosity-Gap | COUNCIL | AI council prices your product | 8 | 55 | 15.1 | 180 | 260 | example row, ignored by the script |
