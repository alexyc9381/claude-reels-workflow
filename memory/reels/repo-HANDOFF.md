# HANDOFF — REEL 85 "REPO" (Graphify)

**Video 1 of the five recorded 2026-08-02.** This file covers ONLY this reel.
Written 2026-08-03. Read this before touching anything; the traps at the bottom
each cost a rebuild.

---

## 1 · WHAT IT IS

| | |
|---|---|
| keyword | **REPO** |
| subject | **Graphify** — a codebase knowledge graph for Claude Code |
| source recording | `~/Downloads/IMG_3411.MOV` (233.8s raw, 2160x3840, 14 "cut cut" retakes) |
| script | `~/Downloads/August 2nd.txt`, Script 1 |
| final VO | **37.51s**, 134 words |
| repo id | reel **85** (82=MCP, 83=KEY, 84=PACK all shipped) |

⛔ **NO COMP ON FILE.** This premise was written and recorded directly, not
sourced from an outlier. That breaks "no comp = no entry" and it is the same
door VAULT-38 came through. If it underperforms, the missing comp is the first
suspect, not the build.

---

## 2 · FACT-CHECK — done, all claims verified live 2026-08-03

**`Graphify-Labs/graphify`** · **101,743 stars** · 9,879 forks · **Apache-2.0** ·
Python/tree-sitter · created **2026-04-03** · homepage graphify.com

| VO claim | verdict |
|---|---|
| "a free tool" | ✅ Apache-2.0, on-device, PyPI `graphifyy` |
| "runs one time, scans your entire codebase" | ✅ emits `graph.json`; SHA256 cache re-runs only changed files |
| "every connection, every relationship" | ✅ typed edges — calls, imports, definitions, references |
| "navigates the graph instead of rereading" | ✅ "persistent across sessions", "query weeks later without re-reading" |
| "$20 plan becomes your $200 plan" (~10x) | ✅ **conservative** — README claims **71.5x fewer tokens per query** |
| "everyone is cancelling their $200 max plan" | ⚠️ **hyperbole, no evidence — VO only, NEVER an on-screen stat** |
| "Anthropic is so pissed" | ⚠️ framing only |

⚠️ **Caveat on 71.5x:** measured on a 52-file mixed corpus. The README's own
smaller runs show 5.4x (4 files) and ~1x (6-file synthetic). True for a real
project, not universal. Fine to show — it is their own headline — but do not
generalise it in on-screen copy.

⭐ **The VO never says 101,743 or 71.5x.** The audio is locked, so these can only
live on screen. That is where this reel's credibility comes from.

⭐ **Compatibility is a FACT, quote it:** the repo description reads *"A
/graphify skill for Claude Code, Cursor, Codex, and Gemini CLI."* That is what
justifies the five-mark row in the hook.

---

## 3 · STATE OF EACH STAGE

| stage | state |
|---|---|
| VO cut | ✅ done, verified |
| facecam conform | ✅ done |
| landmarks | ✅ 1131 frames, 0 dropouts |
| matte | ✅ generated (1.5 GB ProRes 4444) |
| crop solved | ✅ waist-up, per-shoot |
| plan | ✅ **validates, 0 findings** |
| chassis | ✅ cloned from `Key.tsx` |
| shot gate | ✅ **16 laws pass** |
| hook | 🔶 **built, awaiting Alex's sign-off** |
| shots 1-12 bodies | ⛔ **drafted but NOT reviewed — this is the real remaining work** |
| SFX | ⛔ not started (law 53: cue list belongs to THIS reel) |
| captions | ⛔ not verified |
| full render | ⛔ never run. Priced at **~4.4 h** for 1126 frames |

---

## 4 · ASSETS — every path

```
public/footage85/clean.mp4         2160x3840, 37.7s  ← conformed facecam
public/footage85/landmarks.json    1131 frames, 0 no-detections
public/footage85/matte.mov         ProRes 4444 alpha cutout (1.5 GB)
public/footage85/words_clean.json  134 words, proper nouns fixed
public/footage85/vo/run00.wav      the VO, normalised to -16 dBFS
public/footage85/vo/index.json     ONE run covering all 13 shots
public/marks85/graphify.png        real GitHub org avatar
public/marks85/{claude,cursor,openai,gemini}.png   RGBA-normalised

out/vo5/video1-REPO-VO.wav         the finished VO
out/vo5/video1-REPO.edl.json       ⭐ the EDL — source-time spans

src/scenes/Repo.tsx                the reel (clone of Key.tsx)
src/scenes/bodies85.tsx            shot bodies incl. ShotRing (the hook)
plans/repo.ts                      the validated plan
```

⭐ **The EDL is the important one.** It maps every cut back to `IMG_3411.MOV`
time, which is how the facecam was conformed and how any re-cut must be done.
Never trim the wav directly — subtract from the EDL and re-render, or the
picture desyncs silently.

---

## 5 · LOCKED DECISIONS

**CROP (per-shoot, law 92 — does NOT transfer):**
```ts
const CROP = {width: 1800, left: -521, top: -1316};
```
Solved from this shoot's landmarks: crown 0.3736, shoulders 0.5150, hips 0.7768,
centre x 0.5517. Lands crown at **1060** (120px above the card top, so the head
breaks out), shoulders 1512, **hips 2350 — off frame, so no lap and no pants.**
⛔ The arithmetic is **card-relative**: `page y = CARD.y + (px + top)`. Doing it
page-relative puts the figure 1100px out.

**PLAN — 13 shots, validated 0 findings, 1 cut per 2.89s.**
Registers come from the CLAIM: 4 FACE, 3 SCREEN, 3 OBJECT, 2 BOARD, 1 TYPE.
Three SCREEN shots because this reel's strongest claims are PROOF.

**HOOK — `ShotRing`.** Five marks in a ROW: Claude · Cursor · **Graphify** ·
Codex · Gemini, wired left to right. Header currently **"NO LIMIT WALL / stop
getting cut off"** — 🔶 awaiting Alex's confirmation.

---

## 6 · ⛔ TRAPS — each of these cost a rebuild

1. **Read the repo's own docs before anything.** `docs/START-HERE.md` →
   `RECIPE-NEW-REEL.md` → `LAWS.md`. I worked from memory notes for most of a
   session and built three rounds of unusable work.
2. **Look at what the SIBLING reels are doing.** Videos 2-5 are being built in
   this same checkout (`Agents.tsx`, `Army.tsx`, `Smart89.tsx`,
   `hooksCodeFace.tsx`). `hooksCodeFace.tsx` had already solved the face-reel
   hook format after making my exact mistake.
3. **CLONE the chassis, never hand-roll it.** The chassis draws the figure
   TWICE — `<Plate fit="card">` puts a studio plate in the card, and `matte.mov`
   is drawn OVER it so the head breaks above the top edge. Hand-rolling gave a
   clipped head and his real bedroom in the card.
4. **Register from the claim, not for variety.** The recipe names the exact
   error: reaching for OBJECT because an animation would look good, when the
   claim is proof and wants SCREEN.
5. **Animations are TEXTLESS** (laws 1, 14). Only a mark, or a number that IS
   the shot's subject — and each needs a `// TEXT-OK:` justification.
6. **A mark is a positioned `<Img>`, never `<Img>` inside `<foreignObject>`.**
   The latter renders in the browser and then kills the render with a
   `delayRender` timeout.
7. **Never clip the animation layer** (law 27). No `overflow`, no `clipPath` —
   keep objects clear of the type by where the camera points.
8. **A cross layout puts a mark under his head.** His HAIR sits well above the
   crown landmark, so the arithmetic clears when the picture does not. A row at
   one height cannot collide.
9. **Run the gates.** `npx tsx plans/repo.ts` · `python3 tools/lint_shots.py
   src/scenes/Repo.tsx` · `node tools/lint_text.mjs`. The shot gate found 13
   real defects on its first run, including inherited reel-83 audio runs and a
   one-frame coverage hole.
10. **Price before rendering** (laws 85, 88). 20 frames first. Full render is
    ~4.4 h; reel 83 benchmarks *slower* per frame on this machine, so that is
    normal cost, not a defect.

---

## 7 · NEXT ACTIONS, in order

1. Get Alex's sign-off on the hook (ring + header).
2. **Review shots 1-12.** They are drafted in `bodies85.tsx` but have never been
   looked at in the chassis — only the hook has. Expect placement problems of
   the same kind (objects colliding with his head, band overflow).
3. Run the escalation ladder on each (RECIPE step 3) — that is where quality is
   decided, and it has not been done for this reel.
4. SFX pass against THIS reel's beats.
5. Verify captions.
6. Full render, then **transcribe the render and diff against the script**
   (START-HERE step 12, not optional).
