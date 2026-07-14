# Claude Reels — Complete Production Playbook

Everything needed to make these premium 9:16 animated AI/Claude reels on a **new machine or account**, exactly as they're made now. Read top to bottom once, then use as reference.

> **The single most important thing to understand:** these videos are **AI‑authored in Claude Code**. The "engine" is not just the Remotion project — it's Claude Code driving the pipeline, guided by a folder of accumulated "memory" files. To transfer the capability you must move **four things** (see §1). Copying only the video project gets you the code but not the know‑how.

---

## 1. What to copy (the four pillars)

| # | What | Path on this Mac | Why |
|---|------|------------------|-----|
| 1 | **The Remotion project** | `~/Downloads/matchtern-longform/` (contains `video/` and `tools/`) | The actual animation code, all reels, assets |
| 2 | **The toolchain** | `~/Downloads/matchtern-longform/tools/` + a Node install + Python `faster-whisper` | ffmpeg/ffprobe + speech‑to‑text for VO editing |
| 3 | **The "brain" (memory)** | `~/.claude/projects/-Users-alexchensmacmini-Downloads/memory/` (70 `.md` files) | Every rule, style, gotcha, and per‑reel log learned so far. **This is what makes the output good.** |
| 4 | **Delivery folders** | `~/Downloads/Claude-Reels-Final/` and the Google Drive `Claude Reels` folder | Where finished reels + lead‑magnet docs land |

Zip `matchtern-longform/` and the `memory/` folder, move them, and re‑install the toolchain (§3).

---

## Editing styles (pick one per reel)

A reel's **script/VO/captions** are style-agnostic; the **look-and-feel + audio skin** is a selectable *editing style*. Pick one at build time — see [`editing-styles/STYLES.md`](editing-styles/STYLES.md) for the menu.

- **Default — Cinematic Blueprint** (house style): clay Claude mascot + dark game-screen panel + premium shaded props, warm brand palette, cinematic riser/boom SFX. Use for most reels, and always for credibility-first / money / serious topics.
- **Game-World Theme Remake** ([`editing-styles/game-world-remake.md`](editing-styles/game-world-remake.md), reference build = reel 51 SKILLS / Super Mario): re-skin the whole reel into a recognizable game world with a persistent game HUD as the retention spine + an original chiptune audio layer. Use for **listicle / count-up** and playful broad-consumer topics. Don't use it for somber topics.

---

## 2. Mental model of the pipeline

```
IDEA / SCRIPT  ──►  RECORD VO (phone/mic, .m4a)  ──►  TRANSCRIBE (faster-whisper)
     │                                                        │
     ▼                                                        ▼
  guidelines                                     SPLICE out flubs/"cut cut" retakes
  (memory)                                       CLEAN + LOUDNORM  ──►  ×1.10 speed‑up
                                                        │
                                                        ▼
                                          CAPTIONS (align script words to whisper
                                          timings, ÷ speed) ──► words_<reel>.json
                                                        │
                                                        ▼
   AUTHOR SCENES in a new <Name>Reel.tsx (clone an existing reel) ◄── L[] beats + CUT + durationInFrames
                                                        │
                                          remotion still (spot‑check frames)
                                                        │
                                          remotion render  ──►  ffmpeg delivery encode
                                                        │
                                          DELIVER to Final + Google Drive
                                                        │
                                          (optional) lead‑magnet .docx + IG caption
```

**Format of every reel:** 1080×1920, 30 fps, H.264. Length ≈ the VO (usually 30–50 s). Audio 48 kHz stereo AAC.

---

## 3. Machine setup (new Mac / Linux)

### 3.1 Node (the project pins Remotion 4.0.370 / React 19)
- Installed here as **Node v24.15.0** living in `~/.local/bin` (not brew). Any Node ≥ 20 works.
- npm global root here: `~/.local/lib/node_modules` (this is where the `docx` package for lead magnets lives — see §9).

```bash
# install node (nvm is easiest), then:
cd matchtern-longform/video && npm install     # installs Remotion 4.0.370, React 19, three, etc.
cd ../tools && npm install                     # installs ffmpeg-static + ffprobe-static
```

### 3.2 ffmpeg / ffprobe — **no Homebrew needed**
They come from npm packages in `tools/`:
- ffmpeg: `~/Downloads/matchtern-longform/tools/node_modules/ffmpeg-static/ffmpeg`
- ffprobe (pick your arch): `.../ffprobe-static/bin/darwin/arm64/ffprobe` (mac) or `.../darwin/x64/…` (intel) or `.../linux/x64/…`

Set convenient shell vars (put in the command each time, or export in your profile):
```bash
FF=~/Downloads/matchtern-longform/tools/node_modules/ffmpeg-static/ffmpeg
FP=~/Downloads/matchtern-longform/tools/node_modules/ffprobe-static/bin/darwin/arm64/ffprobe   # match your OS/arch
```
> ⚠️ Gotcha: on this Mac the ffprobe glob sometimes resolves to the *linux* binary first — always pick `darwin/arm64`. You can also just use `$FF -i file.mp4` to read duration/streams if ffprobe misbehaves.

### 3.3 Transcription — Python `faster-whisper`
```bash
pip3 install --user faster-whisper        # version 1.2.1 here
```
Save this as `/tmp/tx.py` (the exact script used):
```python
import sys, json
from faster_whisper import WhisperModel
wav, model_size, out = sys.argv[1], sys.argv[2], sys.argv[3]
m = WhisperModel(model_size, device="cpu", compute_type="int8")
segs, info = m.transcribe(wav, language="en", word_timestamps=True, vad_filter=False)
words=[]; full=[]
for s in segs:
    for w in s.words:
        words.append({"w":w.word.strip(),"start":round(w.start,3),"end":round(w.end,3)})
    full.append(s.text.strip())
json.dump(words, open(out,"w"), indent=0)
print("\n".join(full))
print("\n=== WORDCOUNT:", len(words))
```
Usage: `python3 /tmp/tx.py input_16k.wav base.en out_words.json` (first run downloads the `base.en` model).
> There's also a `whisper.cpp` build in `tools/whisper.cpp` (small.en model). `faster-whisper` is what the current pipeline uses.

### 3.4 The AI engine (this is what actually authors the reels)
- **Claude Code** (CLI/desktop). Everything below is done by prompting Claude Code, not by hand.
- **`ultracode` mode ON** → Claude uses the **Workflow tool** to run multi‑agent design panels + adversarial "ship‑gate" critics (see §8). This is why quality keeps climbing.
- **Skills** used: `fb-ads-compliance` (before any paid‑ads work), `artifact-design`, `brainstorming`, plus the memory‑recall system.
- **To transfer the AI side:** copy the `memory/` folder (§1‑③) into the new account's equivalent memory path and keep `MEMORY.md` as the index. Also carry over any project `CLAUDE.md` instructions.

---

## 4. Project structure

```
~/Downloads/matchtern-longform/
├── video/                         ← the Remotion project
│   ├── package.json               (remotion 4.0.370, react 19, @remotion/google-fonts, three)
│   ├── src/
│   │   ├── index.ts               registerRoot(RemotionRoot)
│   │   ├── Root.tsx               ← registers EVERY reel as a <Composition>
│   │   ├── fonts.ts               ← Google fonts: inter, fraunces, playfair, montserrat (+italics)
│   │   ├── data/                  ← words_<reel>.json (43 caption files; one per reel)
│   │   └── Claude<Name>Reel.tsx   ← ONE FILE PER REEL (44+ of them; e.g. ClaudeVaultReel.tsx, GptSolReel.tsx)
│   ├── public/                    ← staticFile() assets (VOs, music beds, sfx, images)
│   │   ├── vo_<reel>.wav / <reel>_vo.wav   the finished voice‑overs (48 kHz)
│   │   ├── seo_music.wav, music_bed.wav …  music beds (kept very low, ≤0.11)
│   │   ├── sfx/                    ← ~40 one‑shots: boom, thock, tick, ding, snap, swish,
│   │   │                             metal_riser, sparkle, shimmer, resolve, whoosh, crash…
│   │   ├── faces/ img/ refs/ fable/ leads/   images used in some reels
│   │   └── chatgpt_logo.png, logo-mark.png …
│   └── out/                       ← render output (git‑ignore this)
├── tools/                         ← ffmpeg-static + ffprobe-static (npm)
│   └── whisper.cpp/               ← optional native STT
└── CLAUDE-REELS-PLAYBOOK.md       ← this file
```

**Delivery destinations (final MP4 goes to BOTH):**
- `~/Downloads/Claude-Reels-Final/` — named `NN_Claude-fable5-<slug>.mp4` (NN = next reel number)
- `~/Library/CloudStorage/GoogleDrive-<acct>/My Drive/Claude Reels/` — same filename

---

## 5. Reel code architecture (how one `.tsx` reel is built)

Every reel is a single self‑contained component. **Clone the closest existing reel and rewrite the scenes** — don't start from scratch. Best clone bases: `ClaudeFactoryReel.tsx` / `GptSolReel.tsx` (latest infra) or `ClaudeVaultReel.tsx` (cinematic chamber + crash).

### 5.1 The skeleton (top of file → bottom)
```tsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing, Audio, staticFile, Img } from "remotion";
import { fraunces, inter } from "./fonts";
import words from "./data/words_vault.json";      // caption file for THIS reel

// palette + helpers
const CREAM="#ECE9E2", INK="#1A1813", CLAY="#D2724E", GOLD="#E7B24C", GREEN="#3F9E74", ...;
const FPS = 30;
const fr  = (s:number) => Math.round(s*FPS);                 // seconds → frames
const over=(f,start,dur,ease=Easing.out(Easing.cubic)) =>   // 0..1 ramp; START + DUR are in FRAMES
  interpolate(f,[start,start+dur],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp",easing:ease});
const grad=(a,b)=>`linear-gradient(158deg, ${a} 0%, ${b} 100%)`;
const seed=(n)=>{ const x=Math.sin(n*127.1+43.7)*43758.5453; return x-Math.floor(x); };  // deterministic "random"

// SCENE TIMELINE
const L  = [0.0, 4.07, 11.14, 22.02, 32.84, 40.58, 45.22];   // scene start times (sec), from VO beats
const Lf = L.map(fr);
const CUT = 47.18;                                            // total length (sec) = VO length

// components: Mascot (clay critter), VaultDoor, ScreenHead (title+chip), Panel (the framed "macbook"),
//             Captions, ProgressBar, Sfx, plus per‑scene bodies.

export const ClaudeVaultReel: React.FC = () => {
  const frame = useCurrentFrame();
  const scene = (i)=> frame>=Lf[i] && (i===Lf.length-1 || frame<Lf[i+1]);
  return (
    <AbsoluteFill style={{ backgroundColor: CREAM }}>
      <Audio src={staticFile("vault_vo.wav")} />
      <Audio loop src={staticFile("seo_music.wav")} volume={ff=>interpolate(ff,[0,fr(1.4),fr(CUT)],[0,0.11,0.11])} />
      {/* <Sfx> one‑shots at beats … */}
      <Bg />
      <AbsoluteFill style={{ transform:`scale(${zoom})` }}>
        {scene(0) ? <Crash  lf={frame-Lf[0]} /> : null}
        {scene(1) ? <Bank   lf={frame-Lf[1]} /> : null}
        {scene(2) ? <Ultra  lf={frame-Lf[2]} /> : null}
        {/* … one line per scene … */}
        <Captions />
      </AbsoluteFill>
      <ProgressBar />
    </AbsoluteFill>
  );
};
```

### 5.2 Key building blocks (all live inside the reel file)
- **`Panel`** — the dark "macbook" card the scenes live in. It is `position:absolute; left:34; right:34; top:384; height:792; overflow:hidden`.
- **Scene bodies** — `const XBody: React.FC<{lf:number}> = ({lf}) => { …; return (<AbsoluteFill>…</AbsoluteFill>); }` where `lf` = frame **local to that scene**.
- **`Mascot`** — the clay pixel "Claude" critter. Props: `lf, size, gaze, cheer, shock, stern, nodAmp, nodSpeed` + costumes (`brainHat, wizard, constr, glasses, beard, judge, …`). Sol‑family reels also have `SolMascot`/`LunaMascot`/`TerraMascot`.
- **`ScreenHead`** — the top title (`big`, `clay` two‑tone) + a status chip (`chip`, `paid`).
- **`Captions`** — reads `words_<reel>.json`, groups into 2‑3‑word lines, big Fraunces, word‑by‑word highlight, 0.12 s lead.
- **`ProgressBar`** — the top "game" rail (pellets, stars, a traveling mascot, a reward gift at the end). Retention device.
- **`Sfx`** — `<Sfx at={sec} src="thock.wav" v={0.4} dur={2.2} />` (a `<Sequence>` + `<Audio>`).

### 5.3 ⛔ The two build gotchas that WILL bite you
1. **Scene coordinates are PANEL‑LOCAL (0…792), not screen (0…1920).** A scene body renders inside `Panel` (`overflow:hidden`), so any `top:` value **> ~792 is clipped and invisible**. Usable band ≈ 210…780. (The CTA scene is the exception — it renders outside the panel and uses screen coords.)
2. **`over(f, start, dur)` takes FRAMES, not seconds.** Writing `over(lf, 6.6, fr(0.7))` means start = 6.6 *frames* (0.22 s). Always wrap the start: `over(lf, fr(6.6), fr(0.7))`. Grep new scene bodies for `over(lf, <bare number>,` before rendering.

*(These two are in `memory/reel-build-gotchas.md`.)*

---

## 6. The full pipeline, step by step (with exact commands)

Set `V=~/Downloads/matchtern-longform/video` and `FF=…/ffmpeg-static/ffmpeg` first.

### A. Script
Write the VO script following the guidelines (§7 + the memory scriptwriting files). Hook first, gate the "how," name the artifact, deadline in line 1 when relevant.

### B. Record the VO
Alex records straight through on a phone → an `.m4a` lands in `~/Downloads` (often named `Untitled - M:DD:YY, H.MM PM.m4a`, sometimes hand‑renamed). He says **"cut cut"** to kill a flubbed take and re‑does the line.
> The displayed time contains a narrow no‑break space (U+202F) — always find the file with a `*` glob, never a hand‑typed path: `ls ~/Downloads/VOICEOVER*.m4a`.

### C. Convert + transcribe
```bash
$FF -y -i "src.m4a" -ar 16000 -ac 1 vo_16k.wav          # for whisper
$FF -y -i "src.m4a" -ar 48000 -ac 1 vo_48k.wav          # keep a full‑quality copy for editing
python3 /tmp/tx.py vo_16k.wav base.en vo_words.json     # transcript + word times
```

### D. Find flubs + splice (the "cut cut" method)
- Read the transcript; find flubbed takes (they end near "cut cut") and any duplicate re‑takes.
- Find **exact** cut points inside SILENCE (not on words — whisper times drift around flubs):
```bash
$FF -i vo_48k.wav -af silencedetect=noise=-33dB:d=0.18 -f null - 2>&1 | grep silence_
```
- Keep only the good segments with `aselect` (cut points placed inside detected silences):
```bash
$FF -y -i vo_48k.wav -af \
"aselect='between(t,S1,E1)+between(t,S2,E2)+…',asetpts=N/SR/TB,\
highpass=f=75,alimiter=level_in=1:level_out=1:limit=0.93,loudnorm=I=-16:TP=-1.5:LRA=11" \
-ar 48000 -ac 1 -sample_fmt s16 clean_1x.wav
```
> If a retake region is messy, re‑transcribe just that slice (`-ss A -t N`) in isolation to find the real word boundaries.

### E. Speed up ~1.10× (pacing) → install VO
```bash
$FF -y -i clean_1x.wav -filter:a "atempo=1.10" -ar 48000 -ac 1 -sample_fmt s16 vo_<reel>.wav
cp vo_<reel>.wav $V/public/vo_<reel>.wav
```

### F. Captions (aligned, drift‑proof)
1. Transcribe the **clean 1.0× wav** (`clean_1x.wav`) → whisper word times.
2. Define `CANON` = the corrected caption text (fix whisper mishears/brand words).
3. Align CANON→whisper with `difflib.SequenceMatcher`, borrow each word's start/end, then **divide all times by 1.10** (the speed‑up). Write `$V/src/data/words_<reel>.json` = `[{start,end,word}]`.
4. Rule: never end a caption line on a dangling word (`i/a/the/to/of/and/you`). (`memory/caption-sync-gate.md`)

### G. Derive the timeline
- `L[]` = the start time (sec, in the **sped‑up** track) of each scene, taken from the onset of the first word of each beat in `words_<reel>.json`.
- `CUT` = VO length (sec). `durationInFrames` = `ceil(CUT*30)` (set in `Root.tsx`).

### H. Author the scenes
1. `cp ClaudeFactoryReel.tsx Claude<Name>Reel.tsx`
2. Rename the exported component; change the `words` import; set `L`, `CUT`.
3. Register it in `Root.tsx`: add `import { Claude<Name>Reel }` + a `<Composition id="Claude<Name>Reel" component={…} durationInFrames={…} fps={30} width={1080} height={1920}/>`.
4. Rewrite the scene bodies (respect the §5.3 gotchas). Add `<Sfx>` at the beats; put a `metal_riser.wav` ~1.8 s before every scene transition.

### I. Render (spot‑check, then full)
```bash
cd $V
npx remotion still  src/index.ts Claude<Name>Reel out/f.png --frame=120   # check individual frames FIRST
npx remotion render src/index.ts Claude<Name>Reel out/raw.mp4 --codec h264
```

### I2. OVERHAUL — mandatory, never deliver the first render ⛔
**The first full render is a WIREFRAME, not a deliverable.** It gets the structure right (beats, VO sync, captions); it is always visually under‑baked and its hook is always a placeholder. Every reel runs the overhaul before encode. (Full rule: `memory/reel-overhaul-stage.md`. Reusable workflow: `script-factory/overhaul-workflow-template.js`.)

Two gates, looped until both pass on every scene:

- **Gate A — HOOK PATTERN‑INTERRUPT (0–5 s).** Rebuild the first 1–5 s to contain a genuine pattern interrupt: something unexpected and physically surprising by ~frame 15–30 (object bursts/crashes/drops into frame, a first‑person POV rush at the lens, a hard slam/stamp, a character invasion, a fake‑out). Earned by the topic, mute‑readable in <2 s, escalates by ~3 s with no dead/empty frames, a recognizable/funny (pop‑culture) element on screen, professional eased motion with depth + motion blur. **Auto‑fail openers:** title fade‑in, slow zoom on a static graphic, a lone graphic on an empty panel, a dead first ~0.5 s.
- **Gate B — VISUAL OVERHAUL (every scene).** Upgrade each scene to App‑Store‑feature quality: vibrant layered backgrounds (never flat), *more going on* (multiple animated elements, not one static graphic), shaded premium props + real iOS device frames + a real camera viewfinder for capture beats (use the shared kit: `Bg` + `PCProp` + `PhoneUI`/`ListingCard`/`SoldStamp`/`Toast`), and pop‑culture comment‑bait woven throughout.

Loop:
```bash
# 1) render first draft (step I)  2) extract a frame grid, one per scene beat:
for t in 0.4 2 4.4 6.4 9.6 13.5 20 27 32.6 37.5 45.6; do \
  $FF -y -ss $t -i out/raw.mp4 -frames:v 1 out/grid/$t.jpg; done
# 3) montage + adversarial critic (is the hook a real pattern interrupt? which scene is flat/empty/static/cheap? where's the pop-culture?)
# 4) run the overhaul workflow (foundation: reuse shared Bg/PCProp/UI kit; then per-scene rebuild against Gate A/B) -> splice -> re-render
# 5) re-grid, re-review; LOOP until Gate A + Gate B pass everywhere.
# 6) SFX PASS (memory/reel-sfx-pass.md): densify library SFX everywhere a beat can carry one —
#    ALWAYS a hook RISER into the first slam + a click/tap on every UI interaction (biggest retention lever)
#    + impacts/money/notif/counter sounds + ~1-3 meme stingers (Among Us on a sus reveal, bruh on a fail) + CTA burst.
#    Copy any missing sound from ~/Downloads/sfx-library into public/sfx first. THEN encode (step J).
```

### J. Delivery encode (exact settings)
```bash
$FF -y -i out/raw.mp4 -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 18 -r 30 \
   -c:a aac -profile:a aac_low -b:a 256k -ar 48000 -ac 2 -movflags +faststart \
   ~/Downloads/Claude-Reels-Final/NN_Claude-fable5-<slug>.mp4
```

### K. Deliver to both spots
```bash
cp ~/Downloads/Claude-Reels-Final/NN_Claude-fable5-<slug>.mp4 \
   "$HOME/Library/CloudStorage/GoogleDrive-<acct>/My Drive/Claude Reels/"
```

### L. (optional) Lead‑magnet .docx + IG caption
- `.docx` built with the Node `docx` package (`~/.local/lib/node_modules/docx`); premium helpers (titleBlock/h1/promptBox/callout/bullet/footerCTA), Georgia serif, clay accents, **zero em/en dashes**. Delivered to Final + Drive.
- IG caption **opens with** `Comment "<KEYWORD>"` then `👇 READ BELOW`, then the value. (`memory/caption-structure.md`)

---

## 7. Standing rules ("my guidelines") — the non‑negotiables

These live in the `memory/` files and are applied to every reel:

- **Overhaul (mandatory, every reel):** the first full render is a WIREFRAME — never delivered. Auto‑run the overhaul (Gate A hook pattern‑interrupt + Gate B per‑scene visual overhaul), loop until both pass, then SFX/encode/deliver. Do not wait to be asked. (§6.I2 + `memory/reel-overhaul-stage.md`.)
- **Hook (first 1 s, on mute):** subject + promise legible instantly; deadline in line 1 when relevant; a single strong subject / cinematic moment beats a busy dashboard. Fill the panel with a rendered *environment*, never a hero floating in a black void. **After the first render the hook MUST carry a real pattern interrupt** (see §6.I2 Gate A) — a placeholder open never ships.
- **Retention:** top ProgressBar with a reward that unlocks at the CTA; escalate every scene; "save this for later" seal; open loops ("but here's the part everyone misses").
- **Gate the HOW:** the VO sells the *result* and *names the artifact*; the copy‑pasteable how‑to lives in the gated guide, not on screen. Never print the actual deliverable (e.g. real rules) uncredacted.
- **Character:** the clay **Claude Mascot** on Fable/Claude reels; the **Sol/Terra/Luna** sun/moon/earth mascots only on GPT‑5.6 reels.
- **Copy:** **ZERO em/en dashes** anywhere (grep before shipping). Post‑caption opens with `Comment "KEYWORD"`.
- **Audio:** VO at full level; music bed ≤ 0.11; `metal_riser.wav` into every transition (loud enough — v ≈ 0.7‑0.85); riser/boom on the hook.
- **Delivery:** to `Claude-Reels-Final/` **and** the Drive `Claude Reels/` folder; filename `NN_Claude-fable5-<slug>.mp4`.
- **Sourcing/style:** model each reel on a recent overperformer; keep the visual system consistent (cream bg + framed dark panel + clay/gold palette + Fraunces/Inter).

Full detail is in the memory files listed in §10.

---

## 8. The quality loop (ultracode / ship‑gate)

With `ultracode` on, Claude Code runs **multi‑agent Workflows**:
- **Design panels** — N independent concepts (e.g. hook ideas) generated + judged → a merged spec (used to design the VAULT crash hook).
- **Adversarial critic gate** — parallel critics read the rendered still frames and score/flag against a premium bar + the standing rules; confirmed blockers are fixed before delivery.
- **The Overhaul workflow** (`script-factory/overhaul-workflow-template.js`) — the muscle behind §6.I2. A FOUNDATION phase authors/reuses the shared kit (vibrant `Bg`, the `PCProp` pop‑culture library, the iOS `PhoneUI`/`ListingCard`/`SoldStamp`/`Toast`), then a per‑scene REBUILD phase rewrites each scene against Gate A (hook pattern‑interrupt) and Gate B (visual overhaul); agents return code, spliced deterministically, re‑rendered, re‑reviewed. Proven on reel 46 FLIP.
- **Iterate**: render → grid → critic → overhaul workflow → re‑render → loop until Gate A + Gate B pass → SFX → deliver. **Never ship on the first render.**

To reproduce on a new account: keep ultracode on and prompt Claude to "run the overhaul workflow" — it fills the foundation + rebuilds every scene against the hook pattern‑interrupt gate and the per‑scene visual overhaul gate, then loops the critic until both pass.

---

## 9. Assets inventory (what's in `public/`)

- **VOs:** `vo_<reel>.wav` / `<reel>_vo.wav` (48 kHz, the finished voice‑overs).
- **Music beds:** `seo_music.wav`, `music_bed.wav`, `music_ask.wav`, `music_night.wav`, `music_offer.wav`, `music_md.wav`, `ados_bed.wav` — used at ≤ 0.11 volume.
- **SFX one‑shots (`public/sfx/`):** `boom, thock, tick, ding, snap, swish, swooshup/dn, whoosh, sparkle, shimmer, resolve, pop, key, crash, impact, fling, metal_riser, riser, sub, twang, blip1‑5, chimehi/lo, crowd_cheer/run, construction, alarm, screech, angelic, data, office_chatter, zucc, rocket_explode`.
- **Images:** `chatgpt_logo.png`, `chatgpt_white.png`, `logo-mark.png`, plus `faces/ img/ refs/ fable/ leads/`.
- **Fonts (`src/fonts.ts`, via `@remotion/google-fonts`):** `inter`, `fraunces` (+italic), `playfair`, `montserrat`. No manual font install needed — Remotion loads them.
- **docx builder:** Node `docx` at `~/.local/lib/node_modules/docx` (for lead‑magnet guides).

---

## 10. The "brain" — the memory files (copy this whole folder)

`~/.claude/projects/-Users-alexchensmacmini-Downloads/memory/` — **70 markdown files**, indexed by `MEMORY.md`. Each encodes a rule, a style reference, a toolchain note, or a per‑reel build log. The most load‑bearing ones:

- **Toolchain/build:** `video-editing-toolchain.md`, `reel-build-gotchas.md`
- **Captions/audio:** `caption-sync-gate.md`, `caption-structure.md`, `reel-vo-pacing.md`
- **Standing style/retention:** `claude-ai-reel-workflow.md`, `reel-ship-gate-pipeline.md`, `reel-winning-formula.md`, `reel-retention-hook-teardown.md`, `reel-hook-header.md`, `reel-scene-motion-depth.md`, `reel-progress-bar-reward.md`, `reel-ig-feed-safezone.md`, `gate-the-how-in-scripts.md`, `no-anecdote-value-first-scripts.md`, `shortform-scripting-playbook.md`, `ig-reels-scriptwriting-principles.md`, `no-em-dashes-in-copy.md`
- **Creator style references:** `nateherk-style-reference.md`, `nick-saraev-style-reference.md`, `cindiezhu-style-reference.md`, `greg-isenberg-reel-style.md`, `creator-video-structure-templates.md`
- **Delivery/lead magnets:** `lead-magnet-docs.md`, `social-assets-to-gdrive.md`, `share-images-as-links.md`
- **Per‑reel build logs (clone bases + what worked):** `vault-reel.md`, `factory-reel.md`, `gpt-sol-reel.md`, `arena-reel.md`, `crew-reel.md`, `mint-reel.md`, … (one per shipped reel)

> Recreating this folder from scratch is the hard part — **copy it verbatim**. On the new account, drop it into that account's memory directory and keep `MEMORY.md` as the index Claude loads each session.

---

## 11. One‑glance command cheat‑sheet

```bash
V=~/Downloads/matchtern-longform/video
FF=~/Downloads/matchtern-longform/tools/node_modules/ffmpeg-static/ffmpeg

# transcribe
$FF -y -i src.m4a -ar 16000 -ac 1 vo16.wav
$FF -y -i src.m4a -ar 48000 -ac 1 vo48.wav
python3 /tmp/tx.py vo16.wav base.en words.json

# find silence for clean cut points
$FF -i vo48.wav -af silencedetect=noise=-33dB:d=0.18 -f null - 2>&1 | grep silence_

# splice + clean + speed
$FF -y -i vo48.wav -af "aselect='between(t,A,B)+between(t,C,D)',asetpts=N/SR/TB,highpass=f=75,alimiter=limit=0.93,loudnorm=I=-16:TP=-1.5:LRA=11" -ar 48000 -ac 1 -sample_fmt s16 clean1x.wav
$FF -y -i clean1x.wav -filter:a "atempo=1.10" -ar 48000 -ac 1 -sample_fmt s16 $V/public/vo_x.wav

# render (FIRST DRAFT = wireframe)
cd $V
npx remotion still  src/index.ts ClaudeXReel out/f.png --frame=120
npx remotion render src/index.ts ClaudeXReel out/raw.mp4 --codec h264

# ⛔ OVERHAUL — never ship the first render (§6.I2): grid + hook 0-2s burst → fresh critic →
#   overhaul workflow (Gate A hook pattern-interrupt + Gate B per-scene visual overhaul) → re-render → loop → THEN encode.

# deliver encode
$FF -y -i out/raw.mp4 -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 18 -r 30 -c:a aac -b:a 256k -ar 48000 -ac 2 -movflags +faststart ~/Downloads/Claude-Reels-Final/NN_Claude-fable5-x.mp4
```

---

### TL;DR to hand a new operator
1. Copy `matchtern-longform/` + the `memory/` folder + your Drive folder.
2. Install Node, `npm install` in `video/` and `tools/`, `pip install faster-whisper`, save `/tmp/tx.py`.
3. Open the project in **Claude Code with ultracode on**, point it at the `memory/` brain.
4. Record a VO → let the pipeline (§6) run → render first draft → **OVERHAUL (§6.I2 — never ship the first render)** → ship to Final + Drive.
5. Always: spot‑check stills before full render; **run the overhaul (hook pattern‑interrupt gate + per‑scene visual overhaul) — the first render is a wireframe, never delivered**; gate the how; zero em dashes; deliver to both folders.
