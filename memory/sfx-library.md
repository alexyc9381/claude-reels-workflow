---
name: sfx-library
description: "Labeled SFX library at ~/Downloads/sfx-library from 7 'Tiktok Video Audio' IG reels — 55+ actual source sounds in 5 category folders (Mixkit/Freesound/Myinstants) + the whoosh/pop/click/riser/camera-shutter/magic-reveal WHEN-to-use cheat-sheet; staged into the reel project as lib_*.wav"
metadata: 
  node_type: memory
  type: reference
  originSessionId: fd2a64f7-8d2a-4a40-a1dc-da7f726a2785
---

**SFX library** at `~/Downloads/sfx-library/` (README.md = full index, built 2026-07-10 from the 7 reels Alex sent in the "Tiktok Video Audio" chat). Two passes coexist there and don't conflict:

**(A) The categorized SOURCE-SOUND library (primary):** the ACTUAL named sounds the 7 reels recommend, downloaded fresh from Mixkit / Freesound / Myinstants into 5 folders — `whooshes-transitions/` · `risers-cinematic/` · `ui-tech/` (clicks/typing/notifications/camera/glitch/snap/magic) · `meme/` (vine boom/bruh/oof/bonk/huh) · `foley-action/`. README maps every sound to the reel that named it + licensing (Mixkit = free commercial; Freesound = mixed CC; Myinstants memes = fine for reels, avoid in paid ads). `SOUNDTRACKS.md` = the background SONGS the two music reels recommend (cataloged w/ links, NOT downloaded — commercial tracks; use IG native audio: Timeless/Weeknd, Dragonfly/Dana&Alden, Thank You/Tyler, etc.).

**(B) Extracted-from-reel audio + cheat-sheet (used by reel 40 ERASE):** root-level `whoosh/pop/click/riser/camera-shutter/magic-reveal/cinematic-hit.mp3` (sliced from the reels' own audio), `clips/`, `_reels/` (the 7 source mp4s+transcripts), `bed-viral-dym77.wav` (viral bed from the DYM77 reel), `SFX-CHEAT-SHEET.md`. Staged into `matchtern-longform/video/public/sfx/` as `lib_*.wav` + `erase_bed.wav`.

**⛔ THE CHEAT-SHEET (from @seankuksinovich DY6uAxUoInB) — which sound for which moment (STANDING, apply to every reel's audio design):**
- **whoosh** → zoom-in / camera push
- **pop + click** → a pop-up / element appearing
- **riser** → build suspense (into a reveal)
- **camera shutter** → a transition / scene cut
- **magic reveal** → revealing elements on screen

Applied to ERASE ([[claude-ai-reel-workflow]] audio section): whoosh on scene-push, pop+click on card/row/window entrances, riser into every cut, camera-shutter ON each transition, magic-reveal on stamps/reveals/CTA. Complements the reel's existing `public/sfx/` set + the engagement-audio rules (opening zoom-punch + metallic riser + ducked music bed).


## ⛔ Remotion SFX click fix (2026-07-10, SLASH reel — Alex: "popping sound every second")
Every `<Sfx>`/`<Audio>` inside a `<Sequence>` that hard-cuts (the clip ends while the waveform is non-zero) produces a CLICK/POP at the boundary. With many stacked SFX this reads as popping ~every second. FIX (bake into the Sfx primitive): ramp volume to ZERO at both ends — `volume={(f)=>interpolate(f,[0,1,D-6,D-1],[0,v,v,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}` where D=durationInFrames. Also prune density (no per-second ticks/blips) and give short cuts enough dur to not end mid-transient. Verify with a transient scan on the final mix.
