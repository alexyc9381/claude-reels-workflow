# Resuming this repo on another machine

⛔ **This repo is code + text only.** Every `.wav`, `.mp4`, `.m4a` and `.mov` is gitignored
(see `.gitignore`) and lives in Google Drive under **`My Drive / Claude Reels`**. A fresh clone
will typecheck and open in Remotion Studio but will **not render a reel with sound** until you
bring its media across.

## 1. Clone and install

```bash
git clone https://github.com/alexyc9381/claude-reels-workflow.git
cd claude-reels-workflow/video && npm install
cd ../tools && npm install
pip3 install --user faster-whisper
```

## 2. Bring the media across

Each reel's own Drive folder — `Claude Reels / Faceless / <number> - <NAME>/` — now carries its
**source audio** as well as the finished cuts, so a reel can be re-rendered from a clone without
the engine zip. Copy the reel's `*_vo.wav` and `*_bed*.wav` into `video/public/`:

```bash
D="$HOME/Library/CloudStorage/GoogleDrive-<you>@gmail.com/My Drive/Claude Reels/Faceless"
cp "$D/141 - GRAVITY"/gravity141_*.wav video/public/
```

⛔ The filename in `video/public/` must match what the reel's `.tsx` asks for exactly — the
Remotion composition references it by name and a missing file renders silence, not an error.

## 3. Verify before you trust it

```bash
cd video && npx remotion studio src/gvt-141-index.tsx
```

⛔ **`npx tsc` is a decoy in this repo** — it resolves to an unrelated npm package that prints a
banner and exits 0, so it "passes" while checking nothing. Typecheck with:

```bash
cd video && npx --yes -p typescript@5 tsc --noEmit --jsx react-jsx --esModuleInterop --skipLibCheck --target ES2020 --moduleResolution bundler --module ESNext src/<file>.tsx
```

## 4. The agent memory does NOT travel with this repo

The live rules the agent works from are in **`~/.claude/projects/-Users-allyy-Downloads/memory/`**
(indexed by its own `MEMORY.md`). That directory is **outside the repo and is deliberately not
committed — this repo is public and those notes contain business detail.** On a second machine
either copy that folder across by hand, or accept that the agent starts without those rules.

The `memory/` directory *inside* the repo is a separate, older, public set — do not assume the two
are mirrors of each other. They overlap by only 9 filenames out of 300.

## Per-reel resume notes

See each reel's factory log in `memory/reels/`, which records the render command, the gate sweep
and the exact numbers the last shipped revision measured.
