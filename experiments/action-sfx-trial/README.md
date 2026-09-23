# Action SFX trial — opt-in sound design for a few reels

An experimental sound system for Alex's automated reel workflow, based on the FILE sound auditions. Test it on three selected videos and review the results before deciding whether to adopt it. **Not an approved style, not a production default, and not a change to YouTube sound.**

## Start here

Read [TRIAL-GUIDE.md](TRIAL-GUIDE.md) for the feedback and trial procedure, then [RUN.md](RUN.md) to prepare the local cache and render. [trial.json](trial.json) records three empty trial slots; no future reel is enrolled automatically.

## Layout

| path | what |
|---|---|
| `sfx_trial.py` | Explicit CLI to import verified local assets, validate plans and render isolated SFX + mixed WAVs |
| `catalog.json` | Stable source IDs, source/license URLs, prepared-file hashes and cue-use notes |
| `examples/file165-opening.json` | Portable 0–2.12s Punchy action opening recipe |
| `examples/file165-full-trial.json` | Full-length FILE trial scaffold with later Foley and risers; not the historical mix verbatim |
| `reference/` | Historical opening cue ledger and technical verification; evidence of the audition, not creative approval |
| `trial.json` | Trial status, opt-in boundary and review slots |
| `RUN.md` | Setup, commands, timeline format and render integration |
| `TRIAL-GUIDE.md` | Sound selection, layering, feedback and evaluation procedure |
| `SOURCES.md` | Source handling and media restore policy |
| `tests/` | Timing, integrity, explicit opt-in and audio-headroom regression checks |
| `.cache/`, `runs/` | Local assets and render outputs; ignored by Git |

## Conventions

Every plan sets `experimental: true`; every render also requires `--experimental`. Plans carry seconds on the **root video timeline**, a visual reason per cue and a gesture ID shared by layers of the same event. Name drafts with `SFX-TRIAL`, never `FINAL`. Keep the previous mix for comparison.

No production composition, `SoundKit`, house sound guide or default gain has been changed. This directory is an optional trial and must be explicitly selected per video. Promotion requires a later decision from Alex; finishing three tests does not promote it automatically.

## Gotchas

The first-frame chime/crack/body is one designed hit, not three independent reasons to make noise. A source count is not an interest score. The -9 dB opening speech margin is a FILE trial setting, not a universal target. Existing house bans/defaults remain in force outside this explicit trial.

Import isolated voice/music stems, not the already mixed MP4 soundtrack. Use the rendered full mix once, or its SFX stem with the original stems once. Do not double up baked audio and live cues. Media are local; this public repository does not redistribute a stock sound pack.

## Related

[House sound design](../../docs/SOUND-DESIGN.md) · [Voice sidechain and stem measurement](../../memory/sfx-voice-sidechain-duck.md) · [Source handling](SOURCES.md) · [FILE visual context](../../memory/alex-file165-semantic-motion-and-cartoon-worlds.md)
