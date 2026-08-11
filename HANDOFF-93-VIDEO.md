# HANDOFF — reel 93 "VIDEO"

Everything a fresh session needs to pick this up. Written 2026-08-07.
Read `memory/MEMORY.md` and `CLAUDE-REELS-PLAYBOOK.md` first, then this.

---

## What this reel is

Keyword **VIDEO**. Subject: **Anil Matcha's Open Generative AI** — the open-source
desktop app that puts 400+ image/video models behind one free UI, and the
companion **Generative-Media-Skills** library that lets Claude Code and Codex
drive those models from the terminal.

⚠️ **THIS IS THE SAME PRODUCT AS REEL 90 "OPEN"**, which shipped 2026-08-03.
This script is a different angle on it — install steps and the Claude Code
pairing rather than the founder/Coinbase story. Alex was told and said build it.
Read `memory/open-lot-reel.md` before designing anything: it has the verified
figures, the honest-fact rules that reel already resolved, and the BACKLOT world
that must NOT be reused (a second reel in the same world would read as a repost).

Next free Drive number is **93** (`90 - OPEN`, `91 - ROWBOAT`, `92 - JOBS` taken).

---

## DONE already

| artefact | path | state |
|---|---|---|
| raw VO | `video/public/video_vo_raw.wav` | 55.35s, from Drive `Faceless/*VOs/VIDEO.m4a` |
| cut VO | `video/public/video_vo.wav` | **38.23s**, 5 restarts removed, head trimmed |
| script | `video/public/video_script.txt` | the canon words, mishears corrected |
| captions | `video/src/data/words_video.json` | 146 words, 49 lines, 48/49 anchored, span 0.0→37.94 |

### The VO cut, so it is not re-derived

⛔ The flub marker on this take is **"cut cut"** (5 of them), not "KitKat".
Keeper is always the take AFTER the marker. Kept ranges from the raw file,
every boundary on a measured trough (8 at −120 dBFS, 2 at −80/−90):

```
0.300– 8.350   open .. "one free tool."        cut: "It has..."
10.470–14.300   "It has over 10,000.." .. "yet."  cut: camera-controls false start
17.700–21.900   "..lens, focal length and aperture built in."
23.430–34.130   "So you just have to type.." .. "pick any model."
36.490–42.595   "After that, just type.." .. "200 plus models."
46.935–53.980   "And it even pairs with.." .. "immediately."
```
Then the head was trimmed by **1.70s** — the concatenated file opened on 1.75s of
silence and captions came out spanning 1.61→39.64, which would fail `VO_ONSET_0`.

⚠️ **38.2s is LONG** vs the 22-29s house range. Flagged to Alex, not trimmed
silently. Same call as reels 89, 90 and 91.

---

## Facts — verified 2026-08-07 unless noted

✅ `Anil-matcha/Open-Generative-AI` · **MIT** · ★25,503 and 4,480 forks as of
   2026-08-03 (re-check before drawing a number).
✅ README: **"400+ models across 14 studios"**, 15 studios enumerated (Image,
   Video, Audio, AI Clipping, Vibe Motion, Lip Sync, Recast, Cinema, Marketing,
   Workflow, Agent, Design Agent, Apps, AI Influencer, MCP & CLI).
✅ **Cinema Studio has real camera controls** — Lens, Focal Length, Aperture.
✅ **The skills library is real.** README verbatim: *"a library of skills that let
   agents like **Claude Code**, **Codex**, and other coding assistants drive 200+
   image/video models"* — the `Generative-Media-Skills` project. The VO's "200
   plus models" matches that line exactly, so use 200+ in the skills beat.
✅ **One-click install** — "Desktop app installers (one-click, no Node.js
   required)" for macOS, Windows, Linux. A web version exists at muapi.ai.

⛔ **"around two minutes" is NOT in the README** and could not be sourced.
   Do not put a duration on screen. Say "one click" and show the installer.
⛔ The VO's **"over 10,000 stars"** and **"200 plus models"** are both UNDER the
   real figures (25,503 / 400+). That is safe — show the real, bigger number and
   nothing contradicts the audio. Never show a number smaller than the truth.
⛔ **"nobody is using it yet"** is a rhetorical line, not a fact. Nothing on
   screen should quantify it.

### Logos — source, never invent (see `memory/reel-brand-logo-sourcing.md`)

Named in the VO: **Sora** (OpenAI), **Kling** (Kuaishou), **Flux** (Black Forest
Labs), **Midjourney**. Plus **Claude Code** and **Codex** for the skills beat.
- Simple Icons CDN `https://cdn.simpleicons.org/<slug>` → save to
  `video/public/logos/`. Already present from reel 90: `googlegemini.svg`,
  `nvidia.svg`, `x.svg`, `bytedance.svg`, `kuaishou.svg`, `google.svg`,
  `github.svg`, `slack.svg`, `linear.svg`, `jira.svg`, `notion.svg`, `gmail.svg`,
  `coinbase.svg`, `ycombinator.svg`, `rowboat.png`.
- ⛔ Kling and Sora have **no distributable mark**. Reel 90's precedent: use the
  REAL Simple Icons mark of the parent (Kuaishou for Kling, OpenAI for Sora) with
  a "by X" credit line. Honest and recognisable. Do not draw a fake logo.
- ⛔ `x.svg` and `openai.png` are black — never place them on a dark chip. Put
  them on a cream tile with a coloured plate behind.

---

## NOT done — the actual next steps

### 1. Hook concepts (Alex asked for these FIRST)

Build to **`docs/THE-OPEN.md`**, which is the doc I failed to follow on reel 91
and had to rebuild twice. The rules that bit hardest:
- **Frame-0 panel luma ≥ 140/255.** Reel 91's first round measured 64-90 and was
  binned for it. Measure with `tools/hook_open_gate.py` (written for reel 91).
- **≥3 hard-cut shots in the first 5s, camera LOCKED.** One framing with a push
  is "a poster" and will come back rejected as flat / not hierarchical.
- **Frame 0 must be RECOGNITION** — something this audience already dreads, no
  setup. Here that is *paying monthly for an AI video tool*.
- **The subject is in frame 0**, a Claude on screen, and the key string is
  mute-readable at thumb distance.
- **Write the theme→mechanic mapping table BEFORE any code.** Every row must
  fill in. Reel 91's harbour died on this: a rowboat was the product's NAME, not
  its mechanic, and three of four rows were empty.
- **Each concept is a different RITUAL with a different HIERARCHY MECHANISM**,
  per reel 86's three columns (ritual / mechanism / the moment frame 0 freezes).
  If one sentence describes them all, it is one concept, not five.
- ⛔ A genre world with a moment of tension. **Not a UI, not a system** — every
  rejected concept across reels 83/84/91-R2 was one of those.
- ⛔ Do NOT reuse reel 90's BACKLOT world.

Hook length = the measured onset of the beat after the hook. Read it out of
`words_video.json`; do not eyeball it.

### 2. Storyboard

`storyboards/STORYBOARD-SPEC.md` is a **mandatory contract**. Write
`storyboards/93-video.md` before building scenes. Scene starts come from the
measured word onsets in `words_video.json`, never from estimates.

Natural beats in this script: the hook · 200+ models / the named four · 10,000
stars · camera controls (lens/focal/aperture) · type a prompt, hit generate ·
step 1 GitHub · step 2 one-click install · step 3 pick a model · generate free ·
the skills library driving Claude Code and Codex · CTA "comment VIDEO".

### 3. Build, gate, deliver

- House chassis is mandatory (`memory/feedback_reel_house_chassis.md`): cream bg,
  dark Panel, karaoke captions, rail, HeroHeader, costumed Mascot. Clone an
  existing reel's assembly; never start full-bleed from scratch.
- ⛔ **Every scene needs an ARC, not an entrance.** The standing failure is a
  spike on the cut then 1-3 for the whole middle. The single most effective fix,
  measured on reels 90 and 91, is a **continuous per-scene camera push** inside
  the scene shell, on top of Panel's own `pushIn`.
- Gates before delivery: `tools/verify_reel.py` (all blocking checks) and
  `tools/scene_motion_audit.py` (0 scenes under bar; median ≥9 is the target).
- ⛔ `npx tsc` in `video/` is a DECOY package. Use
  `npx --yes -p typescript@5 tsc --noEmit --jsx react-jsx ...`
- Deliver to Drive `Claude Reels/Faceless/93 - VIDEO/` — mp4 + caption txt +
  lead-magnet docx. Verify the Drive copy **by hash**, not by listing it.
- Lead magnet: `lead-magnets/` + `tools/make_lead_magnet.py`. Keyword line only,
  no Matchtern footer, no em-dashes.

---

## File prefix

Use **`Vid`** (`VidWorld.tsx`, `VidScenes.tsx`, `ClaudeVideoReel.tsx`,
`vid-index.tsx`). ⛔ `Open*` belongs to reels 79/80, `Lot*` to reel 90, `Row*` to
reel 91. Check with `ls video/src/` before naming anything.
