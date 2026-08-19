#!/usr/bin/env python3
"""Reel 108 MARKETING — VO cut list.

Every boundary below lands INSIDE a silence measured by
`silencedetect=noise=-40dB:d=0.045`, never on a whisper word time
(whisper word `end` runs 150-200ms early — see feedback_vo_cut_to_silence_not_whisper).
"""
import subprocess, os, sys

FF = "/Users/allyy/Downloads/claude-reels-workflow/tools/node_modules/ffmpeg-static/ffmpeg"
SRC = "/Users/allyy/Downloads/claude-reels-workflow/vo/108-marketing/marketing_raw48.wav"
OUT = "/Users/allyy/Downloads/claude-reels-workflow/vo/108-marketing"

# (start, end, why) — KEEP ranges, in raw seconds
KEEP = [
    (1.150, 13.500, "hook + item1 head-of-content"),
    (14.600, 19.900, "item2 ai-seo, head"),          # pause 13.2-14.76 tightened
    (22.500, 25.600, "item2 retake tail"),           # FLUB cut: 'and this is what' + cut cut
    (26.300, 27.720, "item3 brand-guidelines head"), # pause tightened
    (30.950, 36.280, "item3 retake + item4 head"),   # FLUB cut: abandoned 'so you' take
    (41.040, 45.500, "item4 retake, full HubSpot/Slack/Canva/Klaviyo"),  # FLUB cut: truncated take
    (46.800, 52.800, "item5 marketing-council"),     # pause tightened
    (52.950, 55.000, "item6 Lessie name"),
    (57.700, 63.350, "item6 tail"),                  # 3.07s dead gap tightened
    (66.840, 72.550, "item7 campaign-launcher-oss retake"),  # FLUB cut: 'at OSS' take
    (82.960, 86.550, "CTA retake, comment MARKETING"),  # 7.25s dead gap + CTA flub cut
]

parts = []
for i, (a, b, why) in enumerate(KEEP):
    p = f"{OUT}/seg{i:02d}.wav"
    subprocess.run([FF, "-y", "-v", "error", "-i", SRC, "-ss", str(a), "-to", str(b),
                    "-c:a", "pcm_s16le", p], check=True)
    parts.append(p)
    print(f"  seg{i:02d} {a:7.3f}->{b:7.3f} = {b-a:6.3f}s  {why}")

kept = sum(b - a for a, b, _ in KEEP)
print(f"\nRAW 89.211s -> KEPT {kept:.3f}s (removed {89.211-kept:.3f}s)")

with open(f"{OUT}/concat.txt", "w") as f:
    for p in parts:
        f.write(f"file '{p}'\n")

subprocess.run([FF, "-y", "-v", "error", "-f", "concat", "-safe", "0",
                "-i", f"{OUT}/concat.txt", "-c:a", "pcm_s16le",
                f"{OUT}/marketing_cut_raw.wav"], check=True)
print("wrote marketing_cut_raw.wav")
