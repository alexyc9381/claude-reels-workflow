# Claude Reels — Workflow (code + brain)

The version-controlled half of the Greg-Isenberg-style AI/Claude IG-reel system: all the
**code** (Remotion reel project), the **video-ideation** scripts, and the **memory "brain"**
(accumulated know-how). Clone this, `npm install`, and you're developing new reels.

> **Two-tier setup.** This repo is code + text only. The **heavy media** (voiceovers, music,
> finished reels, SFX, render outputs) is NOT in git — it lives in the Google Drive folder
> **`My Drive / Claude Reels`** (see `matchtern-longform-editing-engine.zip` there, which is
> this same project fully populated). Keep code here, media in Drive.

Read `CLAUDE-REELS-PLAYBOOK.md` — it is the complete production manual.

## What's here
- `video/` — the Remotion project. `src/` has 62 reel `.tsx` files + `Root.tsx` (registers
  every reel) + `data/` (46 word-timed caption JSONs). `public/` here holds only the small
  visual assets (images/svg); audio/video are gitignored.
- `tools/` — the ffmpeg/whisper toolchain manifest (`package.json`). `npm install` here pulls
  `ffmpeg-static` + `ffprobe-static`. (The 532 MB `whisper.cpp` checkout is excluded; the
  pipeline uses Python `faster-whisper` — see playbook §3.3.)
- `script-factory/` + `build_captions*.py` — the ideation/caption tooling.
- `memory/` — the AI brain: 82 `.md` rule/style/per-reel files + `MEMORY.md` index. Point
  Claude Code at this.
- `transcripts/` — reference VO transcripts.

## Setup on the new account
```bash
git clone <this-repo>
cd <repo>/video && npm install        # Remotion 4.0.370, React 19, three, etc.
cd ../tools     && npm install        # ffmpeg-static + ffprobe-static
pip3 install --user faster-whisper    # transcription (playbook §3.3)
```
Open in **Claude Code with `ultracode` on**, pointed at `memory/`. To render existing reels,
first restore media: unzip `video/public/` from the Drive `matchtern-longform-editing-engine.zip`
over this checkout. For brand-new reels you record fresh VOs, so you don't need the old media.

## Full pipeline
Idea/script → record VO → transcribe (faster-whisper) → splice/clean/×1.10 speed → aligned
captions → author scenes in a new `Claude<Name>Reel.tsx` → `remotion render` → deliver.
Every step with exact commands is in `CLAUDE-REELS-PLAYBOOK.md` §6.
