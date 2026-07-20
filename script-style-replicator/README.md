# script-style-replicator — replicate an elite AI creator's SCRIPT voice, hook, and structure

Turn the proven scriptwriting DNA of top AI creators into new Alex reel scripts on demand: give it a topic (and optionally a creator), get back a script in that creator's voice/hook/structure, already run through Alex's hard rules. This is the **SCRIPT lane** (spoken words, hooks, beats). The **EDIT lane** is [`../packs/`](../packs/) — do not confuse them.

## Start here
Open [`SKILL.md`](SKILL.md) — it's the entry point and routes everything. Then, for the signature repeatable series ("I turned Claude into ___"), [`SERIES-PLAYBOOK.md`](SERIES-PLAYBOOK.md); for a one-off script, [`GENERATE.md`](GENERATE.md); to pick a voice, the CREATOR ROUTER in [`CREATOR-MATRIX.md`](CREATOR-MATRIX.md).

## Layout
| path | what |
|---|---|
| `SKILL.md` | entry point — router, 3-layer fidelity model (DNA → hook → teardown), how-to-use |
| `SERIES-PLAYBOOK.md` | ⭐ Alex's signature repeatable series + episode lineup |
| `GENERATE.md` | the repeatable topic → shipped-script process |
| `SHARED-CONTEXT.md` | standards: Alex's rules + the DNA schema every profile follows |
| `CREATOR-MATRIX.md` | comparison table · universal spine · FUSION PROTOCOL · CREATOR ROUTER |
| `creators/<name>-dna.md` | per-creator aggregate Script DNA (hook formula, beats, phrase bank, gen template) |
| `teardowns/` | forensic per-video autopsies → fill-in-the-blank formulas ([README](teardowns/README.md)) |
| `workflows/` | the buildable AI machine behind each mega-hit ([README](workflows/README.md)) |
| `topic-ideas/<name>.md` | 12–15 Stage-0 topic candidates in that creator's lane × Alex's niche |
| `HOOK-BANK.md` | swipe file of proven opener lines, tagged by family + ranked by views |
| `KILL-LIST.md` | angles that flopped or are banned — checked before any topic enters |
| `PERFORMANCE-LOG.md` | feedback loop: shipped reels' retention → what performs for Alex |
| `perf/` | `compute_transfer_scores.py` + `log_reel.py` — roll the log into router signal |
| `ingest/` | free yt-dlp + whisper toolkit to add a NEW creator ([README](ingest/README.md)) |
| `transcripts/<creator>/` | source transcripts each profile is extracted from (not eyeballed) |
| `OUTLIER-RANKING.md` | creators/videos ranked by outlier performance |

## Conventions
- Per-creator files share a stem: `creators/<name>-dna.md`, `teardowns/<name>.md`, `workflows/<name>.md`, `topic-ideas/<name>.md`, `transcripts/<name>/`. Covered creators: raycfu, mavgpt, nateherk, nicksaraev, cindiezhu, gregisenberg, rileybrown, sabrinaramonov.
- Every profile is extracted from **real transcripts**, following the DNA schema in `SHARED-CONTEXT.md`. Fire a DNA file's Section 11 generation template to produce a script.
- Three fidelity layers: DNA = the *voice*, HOOK-BANK = a proven *opener*, teardown = a whole *proven video* refitted to your topic.

## Gotchas
- Always apply Alex's HARD RULES after generation (the FUSION PROTOCOL in `CREATOR-MATRIX.md`): no em-dashes · no first-person anecdote · gate the how · value noun by ~word 12 · zero jargon · cut hard on the keyword.
- `ingest/` calls yt-dlp as the module form `python3 -m yt_dlp` (not on PATH as `yt-dlp`); TikTok has no caption files, so it needs whisper ASR.
- Generated scripts are not shipped — gate them through the Script Factory (Stage-1 kill-gate, Stage-3 hook gate, Stage-4 adversarial critics).

## Related
- [`../packs/`](../packs/) — the paired EDIT lane (how a creator cuts, not how they script).
- [`../winner-lab/`](../winner-lab/) — winner decomposition that feeds the workflow/teardown analysis.
- memory: `script-factory-pipeline`, `claude-reel-hook-library`, `creator-lane-ceilings`, `raycfu-lane-preferred`, `style-cloning-pipeline`; plus per-creator style notes (`cindiezhu`, `mavgpt`, `nick-saraev-style-reference`, `nateherk`, `greg-isenberg-reel-style`).
