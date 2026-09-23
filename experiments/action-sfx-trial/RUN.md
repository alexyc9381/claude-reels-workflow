# Run an experimental sound pass

From the repository root:

```bash
python3 -m venv experiments/action-sfx-trial/.venv
experiments/action-sfx-trial/.venv/bin/python -m pip install -r experiments/action-sfx-trial/requirements.txt
```

Use that environment's Python for the commands below. The CLI works from any working directory; its default catalog/cache are relative to its own file. It never modifies the canonical reel or its defaults.

## Restore the working assets

On the machine used for the FILE auditions, the local prepared palette is the `outputs/alex-sound-palette` folder from that task. On another machine, restore a private copy of that folder. Do not commit the palette, the sound stems, the reference Instagram downloads or their excerpts.

```bash
python experiments/action-sfx-trial/sfx_trial.py prepare \
  --palette /path/to/alex-sound-palette
```

This verifies each prepared file against `catalog.json` before importing it into `.cache/`. The one short original chime is generated from code. Sourced audio is not downloaded or sent anywhere by the CLI. Missing/changed media fails visibly. [SOURCES.md](SOURCES.md) explains restoring from source if a prepared palette is unavailable.

## Plan and render

For each of the three selected videos, copy an example into an ignored `runs/<reel>/` work folder, retime cues to that video's animation, and remove cues without a visible reason. Set `duration_s` to the actual reel duration. The opening-only example is useful for fast first-two-second comparisons; the full FILE example is a scaffold, not a ready-made soundtrack for unrelated footage.

```bash
python experiments/action-sfx-trial/sfx_trial.py validate \
  experiments/action-sfx-trial/examples/file165-full-trial.json

python experiments/action-sfx-trial/sfx_trial.py render \
  experiments/action-sfx-trial/examples/file165-full-trial.json \
  --experimental \
  --voice /path/to/voice-mix.wav \
  --music /path/to/music.wav \
  --out experiments/action-sfx-trial/runs/FILE-SFX-TRIAL-A
```

Inputs must be prepared **48 kHz stereo PCM16 WAV** stems with the same timeline origin and enough samples for the complete plan. Pad legitimate trailing silence explicitly. The CLI leaves the voice/music gain at unity, applies a speech-band carve and matched-window SFX gain, and reduces only SFX for headroom. A voice+music base above -1 dBFS true peak fails instead of silently changing narration. Existing base peaks between -1.7 and -1 dBFS remain unchanged, with no extra same-direction SFX headroom. It never extracts a purported SFX stem by subtracting encoded audio.

Outputs are `sfx.wav`, `mix.wav`, and `report.json` (source hashes, actual cue times, gesture/layer counts and 4× oversampled true peak). A nonempty output directory is refused so an earlier audition is preserved. The renderer checks unencoded WAV headroom; check the final AAC export separately because encoding can add peak overshoot.

Use `mix.wav` as the one root-timeline audio track in an audition copy of the Remotion composition, or mux it onto the unchanged picture:

```bash
ffmpeg -i /path/to/existing-reel.mp4 \
  -i experiments/action-sfx-trial/runs/FILE-SFX-TRIAL-A/mix.wav \
  -map 0:v:0 -map 1:a:0 -c:v copy -c:a aac -b:a 256k \
  -shortest -movflags +faststart /path/to/FILE-SFX-TRIAL-A.mp4
```

Use a new output path. The command selects only the new mix, so the old baked SFX do not double. For future source integration, use the rendered SFX stem alongside the same isolated voice/music stems, with no extra SFX duck or additional copy of the full mix. Run the repository's applicable final export checks before delivering a reel; this experiment is not a bypass.

## Timeline fields

| field | meaning |
|---|---|
| `duration_s` | Complete output length, in seconds |
| `opening_until_s` | Boundary between opening and body gain calibration |
| `mix.opening_margin_db`, `mix.body_margin_db` | Speech-active RMS starting targets, with bounded gain adjustment; measured result is reported |
| `cues[].asset` | Catalog ID, or generated `single-dry-chime` |
| `at_s` | Root-timeline start or contact time, depending on `anchor` |
| `anchor` | `start`, or align the processed crop's strongest sample to `at_s` |
| `source_start_s`, `duration_s` | Native prepared-file crop, before optional fitting |
| `fit_s` | Optional pitch-preserving tempo fit, useful for riser buildup lengths |
| `peak_dbfs` | Processed cue peak before the shared mix gain; not a perceptual loudness claim |
| `band_hz` | Optional low/high bandpass edges for layer separation |
| `pan` | Subtle stereo balance in [-1, 1] |
| `gesture`, `role`, `reason` | Which visible event owns the sound, layer function and concrete rationale |

A riser starts before its named payoff and ends near it. `fit_s` adjusts its length while preserving pitch. A new video's payoff time takes priority over these example timestamps. Peak anchoring can start a cue earlier than `at_s`; negative starts are clipped to the first frame. Native crops are faded at their edges. SFX that run into the output endpoint are trimmed/faded; inspect tails in context.

## Checks

```bash
python -m unittest discover -s experiments/action-sfx-trial/tests -v
```

Automated tests use generated fixtures and do not require stock recordings. Prepare/render integration must also be checked with the real cache and intended voice/music. Technical checks cannot establish that a sound is engaging, well chosen or approved.
