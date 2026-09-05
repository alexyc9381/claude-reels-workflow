#!/usr/bin/env python3
"""rps_cue_collisions.py — every SFX cue against every sentence-final word (feedback_cues_land_on_sentence_ends).
A stored word end is early by up to ~200ms, so a word is treated as running to end+0.20, and a cue landing within
250ms AFTER it counts too (a hit that close reads as the word being chopped). Texture-level cues under 0.15s are listed
but not counted as collisions. Exit 1 on any collision."""
import json, re, sys, os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
words = json.load(open(os.path.join(ROOT, "video/src/data/words_repos137.json")))
src = open(os.path.join(ROOT, "video/src/ClaudeRepos137Reel.tsx")).read()
blk = re.search(r'export const L = \{(.*?)\} as const;', src, re.S).group(1)
L = {m.group(1): int(m.group(2)) for m in re.finditer(r'\b(S\d+):\s*(\d+)', blk)}
sfx = re.search(r'export const SFX: Cue\[\] = \[(.*?)\n\];', src, re.S).group(1)
# ⛔ the hook's cues live in HOOK_SFX, one bank per hook (rev 5). The house cut plays `lift`, so that
#    is the bank these gates read — otherwise they grade a reel whose first 3.4s has no cues at all.
_hb = re.search(r'export const HOOK_SFX: Record<HookId, Cue\[\]> = \{(.*?)\n\};', src, re.S)
if _hb:
    _lift = re.search(r'\n  lift: \[(.*?)\n  \],', _hb.group(1), re.S)
    if _lift:
        sfx = sfx + "\n" + re.sub(r'at: S\((\d+)\)', r'at: S(L.S0 + \1)', _lift.group(1))
cues = []
for m in re.finditer(r'\.\.\.\[([\d,\s]+)\]\.map\(\(a2, i\) => \(\{ at: S\(L\.(S\d+) \+ a2\), src: "([^"]+)", v: ([^,]+), dur: ([\d.]+)', sfx):
    for a in m.group(1).split(","):
        cues.append(((L[m.group(2)] + int(a)) / 30, m.group(3), m.group(4), float(m.group(5))))
for m in re.finditer(r'\{ at: S\(L\.(S\d+) \+ (\d+)\),\s*src: "([^"]+)",\s*v: ([^,]+),\s*dur: ([\d.]+)([^}]*)\}', sfx):
    lead0 = "lead: 0" in m.group(6)
    cues.append(((L[m.group(1)] + int(m.group(2))) / 30 + (0.1 if lead0 else 0), m.group(3), m.group(4), float(m.group(5))))
finals = [w for w in words if re.search(r"[.!?]$", w["word"].strip())]
bad = 0
for w in finals:
    ws, we = w["start"], w["end"] + 0.05      # ends are MEASURED (word_caption_audit --fix), so only a small pad
    for at, src_, v, dur in sorted(cues):
        t0 = at - 0.1                     # the J-cut lead
        if t0 < we + 0.25 and t0 + dur > ws:
            tex = ("TEXTURE" in v and dur < 0.15) or "SFX_BED" in v
            print(f"  {'·' if tex else '⛔'} {w['word'].strip():14s} {ws:6.2f}-{we:6.2f}   cue {src_:18s} {t0:6.2f}+{dur:.2f}  {v.strip()}")
            if not tex: bad += 1
print(f"{len(cues)} cues · {len(finals)} sentence-final words · {bad} collisions")
sys.exit(1 if bad else 0)
