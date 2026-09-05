#!/usr/bin/env python3
"""rps_intent.py — write reel 137's intent manifest STRAIGHT FROM THE CODE.

    python3 tools/rps_intent.py            -> video/137_repos.intent.json

The SFX cue times are parsed out of `SFX` in ClaudeRepos137Reel.tsx (both the
plain `{ at: S(L.S3 + 52)` entries and the `...[8, 40, 72].map((a2, i) => ({ at:
S(L.S3 + a2)` runs), so the manifest can never drift from the bank the way a
hand-typed list did on reel 122 (feedback_the_audit_scene_list_drifted).
"""
import json, re, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "video/src/ClaudeRepos137Reel.tsx")
FPS = 30

src = open(SRC).read()
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
# runs: ...[a, b, c].map((a2, i) => ({ at: S(L.S3 + a2)
for m in re.finditer(r'\.\.\.\[([\d,\s]+)\]\.map\(\(a2, i\) => \(\{ at: S\(L\.(S\d+) \+ a2\)', sfx):
    for a in m.group(1).split(","):
        cues.append((L[m.group(2)] + int(a.strip())) / FPS)
# singles: { at: S(L.S0 + 58)
for m in re.finditer(r'\{ at: S\(L\.(S\d+) \+ (\d+)\)', sfx):
    cues.append((L[m.group(1)] + int(m.group(2))) / FPS)
cues = sorted(set(round(c, 3) for c in cues))

script = open(os.path.join(ROOT, "video/public/repos137_script.txt")).read().strip()
intent = {
    "vo_onset_max_s": 0.15, "audio_onset_max_s": 0.15, "music_onset_max_s": 0.15,
    "ends_tight_max_s": 0.5, "max_short_word_s": 0.8, "caption_drift_tol_s": 0.12,
    "sfx_cues_s": cues,
    "music_bed": "public/137repos_bed.wav",
    "words_json": "src/data/words_repos137.json",
    "script": script,
    "L": {k: v for k, v in L.items()},
}
out = os.path.join(ROOT, "video/137_repos.intent.json")
json.dump(intent, open(out, "w"), indent=1)
total = 1236 / FPS
print(f"wrote {out}: {len(cues)} cues over {total:.2f}s = {len(cues)/total:.2f}/sec; L = {L}")
