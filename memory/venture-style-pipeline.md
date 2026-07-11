---
name: venture-style-pipeline
description: "Faceless founder-story video pipeline replicating @theventure's TikTok style (~/Downloads/venture-style)"
metadata: 
  node_type: memory
  type: project
  originSessionId: 787e0cd5-f1dc-40fd-8c05-e172a2eef0b6
---

Built 2026-06-16. Alex wants a **new faceless business-origin-story TikTok channel** in the exact editing style of **@theventure**. Repeatable pipeline at `~/Downloads/venture-style/`.

**Initial version constraint (Alex's call): NO API keys.** So:
- VO = macOS `say` (voice "Daniel"). Upgrade path = drop ElevenLabs/own recording into `video/public/vo.wav`, re-run align+build-props.
- B-roll = **Wikimedia Commons** auto-fetch (YouTube was 403/PO-token blocked via yt-dlp; pivoted). Hybrid: manual clips via `{ "file": "broll/x.mp4", "type":"video" }` in the script, dropped into `video/public/broll/`.
- Captions timing = whisper.cpp word-level. Render = Remotion 1080×1920 H264.

Reuses the [[video-editing-toolchain]] (ffmpeg-static, whisper.cpp, Remotion) from `~/Downloads/matchtern-longform/tools`; `venture-style/video/node_modules` was copied from the matchtern video project.

**Run:** `node pipeline/run.mjs scripts/<name>.json`. Stages: `fetch-commons` → `tts` → `align` → `build-props` → remotion render. Author new videos by copying `scripts/sara-blakely.json` (narration[0] = hook; `stats[].afterWord` = spoken cue word that triggers the big number; `founder` drives the name+arrow). Full usage in `venture-style/README.md`.

Gotcha: Commons search can return a mistagged file (it returned the wrong "Sara Blakely.jpg"); the real one was the Shankbone portrait. Eyeball `video/public/img/*` after fetch. Also: run `say`/node TTS in the FOREGROUND — backgrounding it hung. Style spec in [[theventure-style-teardown]].

**v2 (2026-06-16): motion-graphics overhaul** after Alex said v1 was "just images, repetitive, not engaging" and to reference **@thirdnetwork** (TikTok handle is `@thirdnetwork`, study clips in `~/Downloads/thirdnetwork-study/`; their "video" feel is motion DESIGN over stills, not stock clips). Added Remotion components: KineticCaptions (word-by-word, active word in accent), Cards.tsx (BrandCard logo/section/outro, Collage founder reveal, animated Chart), Stage.tsx (scene timeline w/ punch/slide/whip transitions), Overlays.tsx (count-up stat). Accent = bright blue `#2F7BFF`. build-props v2 interleaves cards with no-repeat media. Output: `video/out/sara-blakely-v2.mp4`.

Key learnings: (1) Whisper mishears brand words ("Spanx"→"Spanks") — script `corrections` map fixes captions+matching. (2) Commons API: video `duration` rides in the `size` iiprop group, NOT a standalone `duration` iiprop (that errors). (3) Commons rate-limits hard (429) — space requests ~1.4s. (4) Commons VP9 webm: download fully then trim; ffmpeg HTTP-seeking corrupts refs. (5) YouTube needs `yt-dlp --cookies-from-browser chrome` but macOS keychain gates cookie decryption behind an interactive prompt — flaky from automated runs (worked once, then "0 cookies decrypted"). Real founder video still best via manual drop into `video/public/broll/` + `{file,type:video}` in script visuals.

**v3 (2026-06-16): ElevenLabs VO + heavily-video/no-repeat.** Alex gave an ElevenLabs key (TTS-scoped: works for synthesis, lacks voices_read/user_read — use known voice IDs, default "Adam" pNInz6obpgDQGcFmaJgB). `tts-eleven.mjs` uses the `/with-timestamps` endpoint → vo.mp3 + exact word timing on the real text (NO whisper, no mishearings). Key in `venture-style/.env` (loaded by config.mjs). Requirements Alex set: clips never repeat, B-roll heavily VIDEO + extremely relevant, and stills shown AS motion graphics (framed ImageCard over branded bg, not full-bleed). build-props v3 = video-first no-repeat queue (each asset once), stills→imageCard. New: `fetch-pexels.mjs` (relevant stock video, needs PEXELS_API_KEY) and `fetch-footage.mjs` v2 (YouTube multi-segment: one interview→several unique cuts). Script `videoSource` = "youtube"|"pexels"|"commons" branches run.mjs.

**YouTube is CONCLUSIVELY dead here (2026-06-16):** Chrome cookies DO decrypt now (3155 extracted, non-interactive), but every media download returns 403 Forbidden from the googlevideo CDN — tested ranged DASH AND full progressive (fmt 18), multiple queries. It's YouTube's n-signature/SABR throttling rejecting the bytes regardless of auth. yt-dlp gets metadata, not media. Don't waste more time on it; cookies are NOT the problem.

**YouTube tooling fully installed (2026-06-16):** latest yt-dlp + Deno (`~/.deno/bin`) + **bgutil PO-token provider** (server at `~/Downloads/bgutil-ytdlp-pot-provider/server`, run `node build/main.js` → :4416; yt-dlp plugin `bgutil-ytdlp-pot-provider` pip-installed). The PO-token server WORKS (mints valid IntegrityToken+poToken). But YouTube STILL 403s every byte — even a no-auth request for an unrelated video — so it's an **IP-level block** on this Comcast IP (67.188.x) from the day's request volume, not a token/cookie/client issue. No tool fixes an IP block. Alex said wait for the IP to cool off. Background waiter `pipeline/youtube-retry.sh` (launched, first check ~2h, safe: only swaps in youtube footage if clips>0, else restores Commons; renders to `out/sara-blakely-youtube.mp4`). On waiter exit: if STILL_BLOCKED, relaunch it; if RENDERED, deliver. To retry manually: start bgutil server, then `node pipeline/fetch-footage.mjs scripts/sara-blakely.json`.

**Current working deliverable: `videoSource:"commons"` via `fetch-commons-video.mjs`** (no key). Method that works: search `iiprop=url|mime|size` (duration in `size` group), download full webm with `curl -A <descriptive UA>` (node fetch/urlretrieve drop the UA → 403 from upload.wikimedia), trim locally, ~2.2s between requests. Got 13 relevant unique clips (sewing, city traffic, department store, shopping mall, factory, NYC, warehouse). build-props v3 → 13 video + 11 image-cards + 5 graphic cards, no repeats. Pexels (`fetch-pexels.mjs`, needs free PEXELS_API_KEY) remains the higher-relevance option if Alex provides a key. Output: `video/out/sara-blakely.mp4`.

**Final delivery step (always):** after rendering, import the finished `.mp4` to Alex's iPhone camera roll via `~/Downloads/import_to_photos.sh video/out "Matchtern Video"`. See [[social-assets-to-camera-roll]].
