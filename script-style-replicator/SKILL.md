---
name: script-style-replicator
description: Replicate any elite AI creator's script voice, hook, and structure for a new Alex reel. Load when Alex says "write this in <creator> style", "make a <creator>-style script", or "what would <creator> post". Derived from real transcripts of raycfu, mavgpt, nateherk, nicksaraev, cindiezhu.
---

# Script Style Replicator

Turn the proven scriptwriting DNA of top AI creators into new scripts on demand: give it a topic
(and optionally a creator), get back a script in that creator's **voice, hook, and structure**,
already run through Alex's hard rules. Every profile is extracted from the creator's **real video
transcripts**, not eyeballed. This is script craft only (spoken words, hooks, beats) — the visual/
edit layer is handled elsewhere ([[style-cloning-pipeline]], CLAUDE-REELS-PLAYBOOK §6).

## What's in here
**▶ Alex's SIGNATURE repeatable series is `SERIES-PLAYBOOK.md` — "I turned Claude into ___" (the persona
series). Run it on repeat. To make a one-off script, follow `GENERATE.md`.** Everything below is the library.

```
script-style-replicator/
  SERIES-PLAYBOOK.md       # ⭐⭐ the signature repeatable series ("I turned Claude into ___") + episode lineup
  GENERATE.md              # ▶ the repeatable viral-script process (topic → shipped script)
  SHARED-CONTEXT.md        # standards: Alex's rules + the DNA schema every profile follows
  CREATOR-MATRIX.md        # ⭐ comparison table · universal spine · FUSION PROTOCOL · CREATOR ROUTER
  creators/<name>-dna.md   # per-creator Script DNA (aggregate: hook formula, beats, phrase bank, gen template)
  teardowns/<name>.md      # ⭐ forensic per-video autopsies of each creator's biggest hits (line + word level)
  workflows/<name>.md      # ⭐ the buildable AI WORKFLOWS behind the mega-hits (what you gate + deliver for real)
  topic-ideas/<name>.md    # 12–15 topic ideas in that creator's lane × Alex's niche (Stage-0 candidates)
  HOOK-BANK.md             # ⭐ swipe file: 65 proven opener lines, tagged by family + ranked by views
  KILL-LIST.md             # angles that flopped or are banned — checked before any topic enters
  PERFORMANCE-LOG.md       # feedback loop: log shipped reels' retention → learn what performs for Alex
  perf/                    # compute_transfer_scores.py + log_reel.py (roll the log into router signal)
  ingest/                  # the free toolkit to add a NEW creator (yt-dlp + whisper + compilation)
```
Creators covered (8): **raycfu · mavgpt · nateherk · nicksaraev · cindiezhu · gregisenberg ·
rileybrown · sabrinaramonov** (source transcripts live in `transcripts/<creator>/` here, and in
`~/Downloads/<creator>-transcripts/`, each with a `<creator>-top-transcripts.md` compilation).

## HOW TO USE — replicate a creator's script for a new video
1. **Pick the creator.** If Alex named one, use it. Otherwise use the **CREATOR ROUTER** in
   `CREATOR-MATRIX.md` to match the topic's shape to the right voice:
   - spoken-prompt consumer follow-along ("ask AI to do [scary thing]") → **mavgpt**
   - named-module money/system build ("The Scanner. The Surgeon.") → **raycfu**
   - frontier capability / news-reaction / "N things every Claude user needs" → **nateherk**
   - receipts-first $-result build ("$15K sites", "kills n8n") → **nicksaraev**
   - persona + plain-English outcome, no jargon ("the diagnoser reads 1,000 job posts") → **cindiezhu**
   - numbered-promise setup / "N things that [outcome]" listicle → **gregisenberg**
   - live vibe-coding awe-demo ("oh my, this shouldn't be possible") → **rileybrown**
   - make-money-with-AI sequence / business playbook → **sabrinaramonov**
2. **Load that creator's DNA** (`creators/<name>-dna.md`) and fire its **Section 11 generation
   template**, filling the slots with the topic. For the opening line, pull a proven shape from
   `HOOK-BANK.md` (65 real openers ranked by views, tagged by family) and refit it to the topic.
   - **To clone a SPECIFIC proven viral video** (not just the aggregate style), open
     `teardowns/<name>.md`, find the target hit, and copy its **extracted fill-in-the-blank formula** +
     its exact transitional phrases. Three layers, increasing fidelity: DNA = the creator's *voice*,
     hook bank = a proven *opener*, teardown = an entire *proven video* refitted to your topic.
3. **Apply Alex's HARD RULES** (the FUSION PROTOCOL in CREATOR-MATRIX.md spells out each transform):
   no em-dashes · no first-person anecdote (swap to a third-person receipt) · gate the how ·
   cut hard on the keyword · value noun by ~word 12 · zero jargon.
4. **Gate it** through the Script Factory ([[script-factory-pipeline]]): Stage-1 kill-gate,
   Stage-3 hook gate ([[claude-reel-hook-library]]), then the adversarial Stage-4 critics.
5. Output the finished 35–45s script (listicles 55–70s).
6. **After it posts,** log it to `PERFORMANCE-LOG.md` (`python3 perf/log_reel.py …`) and fill the
   retention numbers 48–72h later. Run `perf/compute_transfer_scores.py` to update which creator
   style actually performs for Alex's audience — that measured signal tie-breaks the router (step 1).

## HOW TO PLUG INTO THE SCRIPT FACTORY
- **Stage 0 (source):** `topic-ideas/<name>.md` are ranked Door-C candidates. They are HYPOTHESES —
  each still passes the Stage-1 kill-gate + a freshness check, and pairs with an Outlier Engine hit
  (`~/Downloads/outlier-engine/`) before it becomes a real topic.
- **Stage 2 (structure):** the creator's DNA beat map is the `structure_comp` to inherit.
- **Stage 3 (draft/hook):** the DNA phrase bank + generation template drive voice and hooks; Alex's
  hard rules are enforced here and again at the render-side gates.

## HOW TO ADD A NEW CREATOR (the whole point — this stays fresh)
Everything runs on free tools (`yt-dlp` + `faster-whisper`, ffmpeg via the repo's `tools/` bundle).
See `ingest/README.md` for exact commands. Short version:
1. Find their channel, list the catalog by views, pick their ~8–10 outliers.
2. **YouTube** creators → download official auto-captions (`ingest/fetch_yt_loop.sh` + `clean_json3.py`).
   **TikTok** creators → download mp4 + transcribe (`ingest/fetch_tiktok.sh` + `transcribe_whisper.py`).
3. Build the compilation with view counts (`ingest/build_compilations.py`).
4. Run the DNA extraction on the new compilation (re-use the `script-style-dna-extraction` workflow,
   or one high-effort agent following `SHARED-CONTEXT.md`) → drops `creators/<name>-dna.md` +
   `topic-ideas/<name>.md`.
5. Add the creator to `CREATOR-MATRIX.md` and the router.

## Provenance
Profiles built 2026-07-12 from 65 real transcripts across 8 creators (raycfu 8 · mavgpt 7 · nateherk 11
· nicksaraev 7 · cindiezhu 8 · gregisenberg 8 · rileybrown 7 · sabrinaramonov 9). YouTube = official
auto-captions; TikTok = faster-whisper base.en ASR. Where a prior hand-written
`memory/<creator>-style-reference.md` ref existed it was reconciled and upgraded with the transcript
evidence (transcripts win on conflict); greg/riley/sabrina are transcript-only first profiles.
