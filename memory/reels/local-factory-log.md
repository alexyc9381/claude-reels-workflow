# LOCAL — factory log (**FACE reel 15**)
> ⛔⛔ THIS IS A **FACE** REEL — Alex's facecam is in it. Face and Faceless
> number SEPARATELY ([[video-assets-to-personal-gdrive]]). Delivery goes to
> `gdst:"Claude Reels/Face/*Videos/15 - LOCAL/"` — files `15 - LOCAL.mp4`,
> `caption.txt`, `LOCAL - <Title>.docx`. ⛔ NOT Faceless: 94 is already a
> different, live faceless reel there.
>
> ⛔ Opened STAGE 0 per [[factory-log-first]]. Source: `IMG_3532.MOV` (108.2s raw).
> Keyword **LOCAL** — verified in the recording at 97.72s. Pre-locked VO.

## STAGE 0.5 — ⛔⛔ BLOCKED: THE REPO DOES NOT PUBLICLY EXIST
The VO says *"I created this repo myself"* and the CTA promises to send it.

Checked `github.com/alexyc9381` on 2026-08-07 — **3 public repos, none of them a
leads tool**: `claude-reels-workflow`, `optimizely`, `yffportal`.

⛔ A comment gate cannot be fulfilled against a repo that does not exist publicly.
This is precisely the door [[vault-reel-premise-autopsy]] and [[factory-log-first]]
call banned: **never script a claim you have not watched happen on a real screen.**

Needed before ANY build:
1. Does the repo exist? Private, another account, or not built yet?
2. If not built — the reel is a promise, not a demo, and should not be made yet.
3. ⛔ **MY ERROR, CORRECTED.** I claimed this reel had no keyword. It does:
   **"Comment LOCAL for the free install guide"** at 97.72-99.22s. Two mistakes
   stacked: I printed only the first 520 chars of each transcript, and the
   `base` model garbled the word as "look up". The `small` model on an isolated
   92s+ window resolves it cleanly as **LOCAL** — which also fits the hook
   ("infinite free LOCAL leads"). ⭐ Isolate the window and raise the model
   before concluding a word is absent; see [[bed-wav-has-a-voice-in-it]] on
   whisper hiding things in whole-file passes.

⚠️ Claims that also need real evidence once the repo exists:
- "infinite free local leads" — scrapers hit rate limits; "infinite" is a stretch
- "gets their social media accounts as well"
- "zero token costs because it uses pre-built tools" — plausible for MCP/CLI
  tools, but it is the most technical claim in the batch and needs a real run
- ⛔ scraped personal data (email, phone, address) has GDPR/CAN-SPAM exposure —
  reel 20 LEADS shipped a compliance note; this one needs the same.

## STATUS: ⛔ HARD BLOCKED. Do not prep media until the repo question is answered.

## STAGE 1 — VO CUT ✅ (2026-08-07)

| | |
|---|---|
| voiceover | `brand-system/out/vo6/video5-LOCAL-VO.wav` — **15.5s** |
| EDL (source time) | `brand-system/out/vo6/video5-LOCAL.edl.json` — 8 spans |
| conformed facecam | `brand-system/out/vo6/deliver/VIDEO-5-LOCAL.mp4` |
| ⭐ **VO to mount** | `brand-system/out/vo6/deliver/VIDEO-5-LOCAL.wav` — **frame-aligned to the picture** |
| raw | `~/Downloads/IMG_3532.MOV` · 48k audio `brand-system/out/vo6/src/hi_3532.wav` |
| transcript | `brand-system/out/vo6/src/tx/IMG_3532.json` — energy-gated, do NOT regenerate casually |
| batch | **6** — every tool takes `--batch=6` or `VO_BATCH=6` |

⛔ **USE THE `deliver/` WAV, NOT `FINAL/`.** They are the same edit, but the
`FINAL/` one is cut on EDL times while the picture is quantised to whole source
frames — measured up to 2.5 frames of accumulating offset. `deliver/` is cut on
the frames themselves and matches the mp4 exactly.

Marker gate: **0 "cut cut" survive**. Every script sentence is covered by a take
except where noted below.

✅ clean, and the shortest of the five.
⚠️ Script sentence 5 ("I created this repo myself, so hopefully you guys enjoy it")
IS NOT IN THE RECORDING at all — he never said it. Not a defect; do not try to
restore it, and do not build a beat that depends on it.

### ⛔ HOW THIS BATCH DIFFERS FROM Aug-02, and why it matters here
The recordings restart **without** saying "cut cut" — often with no pause at all.
Marker-splitting therefore cannot find take boundaries, and `pick_takes.py` was
rewritten to pick takes by ALIGNMENT instead. Three things follow for the build:

1. ⛔ **Re-run nothing blindly.** `VO_BATCH=6` is mandatory; the named cuts in
   `build_vo5.py` are keyed by batch, and running without it applies Aug-02's
   cuts to this audio and still reports success.
2. ⛔ **The transcript is generated, not given.** `tools/transcribe_takes.py`
   re-reads any stretch of speech the transcript fails to account for. If you
   re-transcribe with a plain whisper call you WILL lose restarts and the cut
   will silently regress.
3. ⭐ **Verify by transcribing the finished WAV in short windows**, never the raw.
   Whisper smooths a restart away on a long file and spells it plainly on a
   5-second one.

### ⭐ FIRST THING TO RUN IN THE BUILD CHAT
The matte and landmarks are deliberately NOT pre-generated — they are per-reel and
take ~2 minutes, so they are made where they are used rather than staged.

```bash
cd ~/Downloads/brand-system && mkdir -p pub6/footage5 && \
  cp out/vo6/deliver/VIDEO-5-LOCAL.mp4 pub6/footage5/clean.mp4 && \
  python3 tools/extract_landmarks.py pub6/footage5/clean.mp4 pub6/footage5/landmarks.json && \
  python3 tools/make_matte.py pub6/footage5/clean.mp4 pub6/footage5/matte.mov
```

⛔ `matte` IS the cutout, not a mask — never draw `clean.mp4` over it
([[matte-is-the-cutout-not-a-mask]]). ⛔ CROP/FULL constants are PER-SHOOT; do not
reuse reel 89's ([[cloned-crop-constants-per-shoot]]). ⛔ Prefix every asset with
the reel number ([[reel-asset-name-collisions]]).

