#!/usr/bin/env python3
"""REEL 130 — the SFX cue RATE and per-sample repeat count, PER PLAYABLE CUT.

⛔ A SOURCE AUDIT CANNOT SEE A BRANCH ([[feedback_a_source_audit_overcounts_branches]]).
`s0Cues` holds three mutually exclusive banks in one function, so a whole-file
count both over-reports the total and hides which sample is repeated inside a cut
that actually plays — that produced two false SLAPs on reel 127.
"""
import re, sys
src = open("video/src/ClaudeLibrary130Reel.tsx").read()
DUR = 890 / 30.0

def cues(block):
    """⛔ A `...[a,b,c].map(...)` IS N CUES WITH ONE `src:` LITERAL. The first
    version of this counter regexed for `src:` and reported 25 cues at 0.84/sec
    for a bank that actually holds 43 — every ascending run counted once. Each
    spread's array length is what multiplies it."""
    out = []
    for m in re.finditer(r'\.\.\.\[([0-9,\s]+)\]\.map\((.*?)\}\)\),', block, re.S):
        n = len([x for x in m.group(1).split(",") if x.strip()])
        for s_ in re.findall(r'src:\s*"([a-z0-9_]+\.wav)"', m.group(2)):
            out += [s_] * n
    stripped = re.sub(r'\.\.\.\[[0-9,\s]+\]\.map\(.*?\}\)\),', "", block, flags=re.S)
    out += re.findall(r'src:\s*"([a-z0-9_]+\.wav)"', stripped)
    return out

hook_blk = src[src.index("const s0Cues"):src.index("const makeSFX")]
body_blk = src[src.index("const makeSFX"):src.index("/* ---- THE MIX")]

# the three exclusive hook banks, split on their own guards
parts = re.split(r'if \(hook === "(\w+)"\) return \[', hook_blk)
banks = {}
for i in range(1, len(parts), 2):
    banks[parts[i]] = cues(parts[i + 1].split("];")[0])
banks["drawer"] = cues(hook_blk[hook_blk.rindex("return ["):])

body = cues(body_blk)
BEDS = {"machine_bed.wav", "stage_hum.wav"}

print(f"  reel {DUR:.2f}s · house ceiling 1.0-1.5 cues/sec (95 = 0.98 · 105 = 1.13 · 127 = 1.38 · a rejected 107 = 3.82)\n")
bad = 0
for name in ("haul", "slot", "drawer"):
    all_c = banks[name] + body
    nonbed = [c for c in all_c if c not in BEDS]
    rate = len(nonbed) / DUR
    print(f"  {name.upper():8s} {len(nonbed):3d} non-bed · {len(all_c) - len(nonbed)} beds · {rate:.2f}/sec"
          + ("  ⛔ OVER" if rate > 1.5 else "  ok"))
    if rate > 1.5: bad += 1
    from collections import Counter
    for s_, n in Counter(nonbed).most_common():
        if n > 3:
            print(f"       ⚠ {s_} x{n} — allowed ONLY as an ASCENDING RUN (music, not repetition)")
print(f"\n  {'⛔ ' + str(bad) + ' cut(s) over the ceiling' if bad else '✅ every playable cut is inside the ceiling'}")
