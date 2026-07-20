# transcripts — raw VSL reference transcripts

Whisper.cpp transcription output of a *target* long-form video (the Matchtern / "Madsen" admissions VSL) — the raw source text that a hand-corrected caption track was built from. Rarely touched; it exists so an agent can re-derive or re-time captions for that VSL.

## Start here
Open [`target_sent.txt`](target_sent.txt) for the human-readable script. The machine-usable pair is `target_sent.json` (sentence segments, 6s windows) and `target_words.json` (word-level segments with ms `offsets`). The corrected, ship-ready version of this text lives inlined as `SENTS` in [`../build_captions.py`](../build_captions.py), which is the real manual for turning it into caption lines.

## Layout
| path | what |
|---|---|
| `target_sent.txt` | plain-text transcript, one line per whisper sentence segment |
| `target_sent.json` | same, as JSON with `timestamps`/`offsets` per sentence (+ whisper model header) |
| `target_words.json` | word-level segments with millisecond `offsets` — for fine caption timing |

## Conventions
- These are raw whisper output: mis-hears ("Madsen"/"higher scholar", "child essay") are **expected** and are corrected downstream in `build_captions.py`'s `SENTS`, never edited in place here.
- `offsets.from/to` are **milliseconds**; `timestamps` are SRT `HH:MM:SS,mmm` strings.
- Filenames describe the source (`target_*`), not a reel keyword — this is VSL/Matchtern content, unrelated to the numbered reel `words_*.json` under `../video/src/data/`.

## Gotchas
- **Not a reel asset and not the caption source of record.** `build_captions.py` hand-encodes corrected sentences + audio-derived timings and writes `../video/src/data/captions.json`; it does **not** read these files. Editing a transcript here changes nothing downstream.
- Whisper sentence boundaries drift from the real audio — that's why timings were re-authored by hand in `SENTS` rather than trusted from `target_sent.json`.

## Related
- [`../build_captions.py`](../build_captions.py) — consumer/corrector; emits `../video/src/data/captions.json`.
- The reel caption pipeline (faster-whisper onset-anchored) is a separate path — memory: `caption-sync-gate`, `caption-structure`.
- Matchtern long-form context — memory: `matchtern-longform-video-style`.
