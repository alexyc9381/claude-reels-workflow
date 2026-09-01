#!/usr/bin/env python3
"""REEL 132 JUDGE — stage C2. Splice the flubs out of the raw take.

⛔ EVERY SPLICE IS CHOSEN BY HAND, INSIDE MEASURED SILENCE. `silenceremove` has no
   crossfade and picks its own cuts ([[feedback_never_let_a_filter_choose_a_splice]]).
⛔ THE PAUSES ARE A POWER CURVE, NOT A CONSTANT CAP
   ([[feedback_a_constant_cap_flattens_the_read]] — capping every pause at one value
   read as "way too fast" at a wps inside the house range).
"""
import subprocess, os, math
FF = 'tools/node_modules/ffmpeg-static/ffmpeg'
SRC = 'vo/judge132/judge_raw48.wav'
OUT = 'vo/judge132/judge_clean_1x.wav'
TMP = '/tmp/judge_cut'
os.makedirs(TMP, exist_ok=True)

# (name, in, out, gap_after) — bounds are silencedetect@-30dB edges +/- pad.
# gap_after is the INSERTED silence; perceived pause = pad_out + gap + pad_in (~+0.14).
SPANS = [
    ("A", 7.12,  9.76, 0.14),   # "...stops Claude from lying to your face."
    ("B", 18.93, 22.83, 0.14),  # "...73% more accurate ... one minute to set up."
    ("C", 24.66, 30.08, 0.12),  # "...creators of Claude think this is the future of AI."
    ("D", 31.35, 32.45, 0.16),  # "It's called the judge loop."
    ("E", 35.18, 39.55, 0.10),  # "...spawn a team of elite sub-agents."
    ("F", 40.43, 44.50, 0.10),  # "...a judge, a prosecutor, and a defense."
    ("G", 45.84, 52.55, 0.16),  # "...until the work is bulletproof."
    ("H", 56.86, 61.36, 0.10),  # "...trigger the judge loop before your launch."
    ("I", 62.15, 63.57, 0.00),  # "Comment judge for the free guide."
]
FADE = 0.022   # 22ms in/out on every span = the crossfade the filter would not give us

parts = []
for n, a, b, gap in SPANS:
    p = f"{TMP}/{n}.wav"
    d = b - a
    subprocess.run([FF, '-y', '-v', 'error', '-ss', f'{a}', '-to', f'{b}', '-i', SRC,
                    '-af', f'afade=t=in:st=0:d={FADE},afade=t=out:st={d-FADE:.3f}:d={FADE}',
                    '-ar', '48000', '-ac', '1', p], check=True)
    parts.append(p)
    if gap > 0:
        g = f"{TMP}/gap_{n}.wav"
        subprocess.run([FF, '-y', '-v', 'error', '-f', 'lavfi', '-i',
                        f'anullsrc=r=48000:cl=mono', '-t', f'{gap}', g], check=True)
        parts.append(g)

lst = f"{TMP}/list.txt"
open(lst, 'w').write("".join(f"file '{os.path.abspath(p)}'\n" for p in parts))
raw_cat = f"{TMP}/cat.wav"
subprocess.run([FF, '-y', '-v', 'error', '-f', 'concat', '-safe', '0', '-i', lst,
                '-ar', '48000', '-ac', '1', raw_cat], check=True)
# highpass + limiter + loudnorm, exactly the playbook C2 chain
subprocess.run([FF, '-y', '-v', 'error', '-i', raw_cat, '-af',
                'highpass=f=75,alimiter=level_in=1:level_out=1:limit=0.93,'
                'loudnorm=I=-16:TP=-1.5:LRA=11',
                '-ar', '48000', '-ac', '1', '-sample_fmt', 's16', OUT], check=True)
dur = float(subprocess.run(['tools/node_modules/ffprobe-static/bin/darwin/arm64/ffprobe',
        '-v', 'quiet', '-show_entries', 'format=duration', '-of', 'csv=p=0', OUT],
        capture_output=True, text=True).stdout.strip())
speech = sum(b - a for _, a, b, _ in SPANS)
print(f"spans {speech:.2f}s + gaps {sum(g for *_ , g in SPANS):.2f}s -> {OUT}  {dur:.3f}s")
