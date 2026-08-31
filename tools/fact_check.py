#!/usr/bin/env python3
"""
fact_check.py — cross-check what the VO SAYS against what the GRAPHICS SHOW,
and both against one verified facts file.

Born from reel AUTO v2 (2026-08-29), which shipped with FIVE numeric contradictions
between its VO and its own graphics, plus a false claim ("Stripe") that reel AUTO v1
had already caught and worked around in the BUILD instead of fixing in the SCRIPT.

    python3 tools/fact_check.py \
        --vo video/src/data/words_auto.json \
        --scenes 'video/src/Auto*.tsx' \
        --facts storyboards/85-auto.facts.json

Exit 1 if anything fails. ⛔ Zero findings on zero inputs is NOT a pass — the tool
prints what it actually scanned and fails loudly if either side came back empty.
"""
import argparse, glob, json, re, sys

NUM = re.compile(r'\b\d{1,3}(?:,\d{3})+\b|\b\d+(?:\.\d+)?\b')
# CSS / code noise we must never treat as on-screen copy.
# Any string carrying a function call — polygon(), rgba(), calc(), translate() — is CSS,
# never a chip: on-screen copy in this chassis has no parentheses.
NOISE = re.compile(r'^#|\w\s*\(|[:{}]|px|em$|^-?\d+(\.\d+)?$|^[a-z-]+$')
STOP = {'there','your','you','everyone','comment','the','and','but','this','that','all',
        'every','most','one','someone','somebody','here','now','when','what','why','how'}

def vo_text(path):
    w = json.load(open(path))
    return ''.join(x['word'] for x in w).strip()

def screen_strings(patterns):
    out = []
    for pat in patterns:
        for f in glob.glob(pat):
            src = open(f, encoding='utf8', errors='ignore').read()
            for s in re.findall(r'"([^"\n]{2,60})"', src):
                s = s.strip()
                if not s or NOISE.search(s):
                    continue
                # real on-screen copy always carries a word. "50% 54%" is a CSS
                # transform-origin; "280 AUTOMATIONS, FREE" is a chip.
                if not re.search(r'[A-Za-z]{2}', s):
                    continue
                # on-screen copy in this chassis is upper-case or Title Case chips
                if s.upper() == s or NUM.search(s):
                    out.append((f.split('/')[-1], s))
    return out

def nums(s):
    return {n.replace(',', '') for n in NUM.findall(s)}

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--vo', required=True)
    ap.add_argument('--scenes', required=True, nargs='+')
    ap.add_argument('--facts', required=True)
    a = ap.parse_args()

    facts = json.load(open(a.facts))
    verified = {k: str(v) for k, v in facts.get('verified', {}).items()}
    allowed_entities = {e.lower() for e in facts.get('entities', [])}
    allow_nums = {str(n) for n in facts.get('allow_numbers', [])}

    vo = vo_text(a.vo)
    screen = screen_strings(a.scenes)

    print(f'VO      : {a.vo} — {len(vo.split())} words')
    print(f'GRAPHICS: {len(screen)} on-screen strings from {len(set(f for f,_ in screen))} file(s)')
    if not vo.strip():
        sys.exit('⛔ VO transcript is EMPTY — nothing was checked.')
    if not screen:
        sys.exit('⛔ ZERO on-screen strings matched — the scene glob is wrong. This is a BUG, not a pass.')

    ok_nums = set(verified.values()) | allow_nums
    fails, warns = [], []

    # 1. every CLAIM-SIZED number the VO says must be a verified number.
    #    Single digits are incidental ("one file", "3 AM") — they are not claims.
    for n in sorted(x for x in nums(vo) if len(x) >= 2):
        if n not in ok_nums:
            near = [f'{k}={v}' for k, v in verified.items() if abs(len(v) - len(n)) <= 1]
            fails.append(f'VO SAYS "{n}" — not a verified value. Verified: {", ".join(near) or verified}')

    # 2. every number on screen must be a verified number
    for f, s in screen:
        for n in (x for x in nums(s) if len(x) >= 2):
            if n not in ok_nums:
                fails.append(f'SCREEN "{s}" ({f}) shows "{n}" — not a verified value.')

    # 3. every capitalised entity the VO names must be verified, or explicitly acknowledged.
    #    ⛔ This is a FAIL, not a warning. Reel AUTO said "Stripe" twice — v1 worked around it
    #    in the build and left the script alone, so the re-read reimported it.
    acked = {e.lower() for e in facts.get('acknowledged_entities', [])}
    for w in dict.fromkeys(re.findall(r"\b[A-Z][a-zA-Z]{2,}\b", vo)):
        lw = w.lower()
        if lw in STOP or lw in allowed_entities:
            continue
        if lw in acked:
            warns.append(f'VO NAMES "{w}" — acknowledged as deliberate.')
        else:
            fails.append(f'VO NAMES "{w}" — NOT in the source. Fix the SCRIPT, or add it to '
                         f'acknowledged_entities with a reason. Do not fix it in the build only.')

    print()
    for w in dict.fromkeys(warns):
        print(f'  ⚠  {w}')
    for f in dict.fromkeys(fails):
        print(f'  ⛔ {f}')
    n = len(set(fails))
    print(f'\n{"⛔ FAIL" if n else "✅ PASS"} — {n} contradiction(s), {len(set(warns))} unverified entity warning(s)')
    sys.exit(1 if n else 0)

main()
