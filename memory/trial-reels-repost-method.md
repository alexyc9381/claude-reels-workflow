---
name: trial-reels-repost-method
description: reposting winners as IG trial reels — the anti-fingerprint ffmpeg tweak recipe + the Trial Reels folders
metadata: 
  node_type: memory
  type: project
  originSessionId: fd2a64f7-8d2a-4a40-a1dc-da7f726a2785
---

Alex reposts his most successful reels as **IG trial reels** (tested on non-followers for new reach/angles). First batch 2026-07-09: ATTACK (25), CLONE (28), BLUEPRINT (31).

**Folders:** `~/Downloads/Claude-Reels-Final/Trial Reels/` + Drive `Claude Reels/Trial Reels/` (deliver to both). Filenames `TRIAL_<slug>.mp4`.

**The tweak recipe (imperceptible to viewers, new asset to IG duplicate detection) — vary values per video so the batch doesn't share one signature:**
```
ffmpeg -i src.mp4 \
 -vf "scale=trunc(iw*Z/2)*2:trunc(ih*Z/2)*2,crop=1080:1920,eq=saturation=S:contrast=C:brightness=0.008,setpts=PTS/P" \
 -af "atempo=P,volume=V" \
 -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 18 -r 30 -c:a aac -b:a 256k -ar 48000 -ac 2 -movflags +faststart out.mp4
```
Ranges used: Z(zoom) 1.022–1.028, P(speed) 1.018–1.022 (pitch preserved via atempo; duration shifts ~2%), S(saturation) 1.035–1.05, C(contrast) 1.015–1.025, V(volume) 0.98–0.99. NEVER mirror/flip (on-screen text). After the zoom-crop, spot-check a frame — content must stay inside the IG safe zones.

**⚠️ zsh gotcha:** in `-vf "...saturation=$sat:contrast=$con..."` zsh eats the `:c` after a bare `$var` — always brace: `${sat}:contrast=${con}`.

New angles are tested via the trial CAPTION/hook text on IG, not by re-editing the video. Related: [[reel-winning-formula]], [[attack-reel]], [[clone-reel-script]], [[midnight-reel-script]].
