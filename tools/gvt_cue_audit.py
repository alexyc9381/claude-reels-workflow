#!/usr/bin/env python3
"""gvt_cue_audit.py — reel 141's standing SFX gate.

    python3 tools/gvt_cue_audit.py [--hook rise|drop|split]

⛔⛔⛔ THE DEFECT THIS EXISTS TO CATCH (memory `feedback_cues_land_on_sentence_ends`):
cues are keyed to SCENE ACTION and a scene ends where a SENTENCE ends, so the
loudest cue in every scene arrives exactly where the voice is quietest. On reel
135 six sentence-final words out of six had an effect on top of them, and the
note that came back was "that word is cut off" — the word was never clipped, it
was MASKED.

The audit:
  1. every sentence-final word, with its end measured FROM THE MIX (stored word
     ends run 11-20 frames early on this take) plus a 250ms shadow, because a
     percussive hit that close still reads as the word being chopped
  2. every cue as (start, duration), parsed out of the reel's own bank
  3. any overlap is a FAILURE

It also enforces the house cue RATE (1.0-1.5 per second; a rejected reel ran
3.82) and the BAN LIST.
"""
import re, sys, math, subprocess
import numpy as np

FPS = 30
REEL = "video/src/ClaudeGravity141Reel.tsx"
VO = "video/public/gravity141_vo.wav"
FF = "tools/node_modules/ffmpeg-static/ffmpeg"
HOOK = "takeover"
if "--hook" in sys.argv: HOOK = sys.argv[sys.argv.index("--hook") + 1]

BANNED = ("riser", "whoosh", "swoosh", "puff", "chain_clank", "water_fan", "am/")

# ---- 1. the sentence-final words, measured off the mix -----------------------
# ⛔ DERIVED FROM THE WORDS FILE, NOT HARDCODED. A hardcoded table silently goes
# stale the moment the VO is re-cut, and this reel was re-cut after rev 1 to
# tighten its pauses — a stale table would have kept passing against the old mix.
import json as _json
_W = _json.load(open("video/src/data/words_gravity141.json"))
_S, _cur = [], []
for _x in _W:
    _cur.append(_x)
    if _x["word"].strip().endswith((".", "!", "?")): _S.append(_cur); _cur = []
SENT_FINAL = []
for _i, _s in enumerate(_S):
    _nxt = _S[_i + 1][0]["start"] if _i + 1 < len(_S) else _W[-1]["end"] + 0.9
    SENT_FINAL.append((_s[-1]["word"].strip(), _s[-1]["start"], _s[-1]["end"], _nxt))
d = subprocess.run([FF, "-v", "error", "-nostdin", "-i", VO, "-ac", "1", "-ar", "48000",
                    "-f", "s16le", "-"], capture_output=True).stdout
a = np.frombuffer(d[: len(d) // 2 * 2], dtype="<i2").astype(np.float32) / 32768.0
H = 240; n = len(a) // H
rms = np.array([20 * math.log10(math.sqrt(float(np.mean(a[i*H:(i+1)*H] ** 2))) + 1e-12) for i in range(n)])
TH = float(np.percentile(rms, 5)) + 9

zones = []
for w, ws, we, nxt in SENT_FINAL:
    i0, i1 = int((we - 0.25) / 0.005), min(n - 1, int(nxt / 0.005))
    last = i0
    for i in range(i0, i1):
        if rms[i] > TH: last = i
    true_end = (last + 1) * 0.005
    zones.append((w, ws, true_end, true_end + 0.25))

# ---- 2. the cues, parsed out of the bank ------------------------------------
src = open(REEL).read()
def bank(name):
    """the HOOK_SFX entry for `name`, or the body SFX array"""
    if name == "SFX":
        i = src.index("export const SFX: Cue[] = [")
        j = src.index("\n];", i)
    else:
        i = src.index(f"  {name}: [")
        j = src.index("\n  ],", i)
    return src[i:j]

cues = []
for blk, label in ((bank(HOOK), f"hook:{HOOK}"), (bank("SFX"), "body")):
    # plain entries
    for m in re.finditer(r'\{\s*at:\s*S\((\d+)\)\s*,\s*src:\s*"([^"]+)"\s*,\s*v:\s*([^,]+),\s*dur:\s*([0-9.]+)', blk, re.S):
        cues.append((int(m.group(1)), m.group(2), float(m.group(4)), label, "SFX_BED" in m.group(3)))
    # ...[a, b, c].map((x, i) => ({ at: S(x), src: "...", ... dur: D
    for m in re.finditer(r'\.\.\.\[([0-9,\s]+)\]\.map\(\([^)]*\)\s*=>\s*\(\{\s*at:\s*S\([^)]*\)\s*,\s*src:\s*"([^"]+)".*?dur:\s*([0-9.]+)', blk, re.S):
        for fr in [int(x) for x in m.group(1).split(",") if x.strip()]:
            cues.append((fr, m.group(2), float(m.group(3)), label, False))
cues.sort()

# ---- 3. the three checks ----------------------------------------------------
fails = []
beds = [c for c in cues if c[4]]
hits = [c for c in cues if not c[4]]
for fr, s, dur, label, _ in hits:
    t0 = fr / FPS; t1 = t0 + dur
    for w, ws, we, wshadow in zones:
        if t0 < wshadow and t1 > ws:
            fails.append(f"  ⛔ {label:12} f{fr:<4} {s:18} {t0:6.2f}-{t1:5.2f}s  OVERLAPS {w!r} ({ws:.2f}-{we:.2f}, shadow {wshadow:.2f})")
for fr, s, dur, label, isbed in cues:
    if any(b in s for b in BANNED): fails.append(f"  ⛔ BANNED SOURCE: {s} at f{fr}")
    if dur > 0.35 and not isbed:
        fails.append(f"  ⛔ {s} at f{fr} is {dur}s — a cue over 0.35s on speech is a TEXTURE, not a transient")

print(f"REEL 141 CUE AUDIT · hook={HOOK}")
print(f"  sentence-final zones (measured, +250ms shadow):")
for w, ws, we, sh in zones: print(f"    {w:10} {ws:6.2f} → {we:6.2f}  shadow to {sh:6.2f}   f{round(ws*FPS)}-{round(sh*FPS)}")
dur_s = 637 / FPS
events = sorted({c[0] for c in hits})
rate = len(events) / dur_s
print(f"  {len(cues)} sources · {len(events)} audible EVENTS (layers on one frame are one cue) "
      f"· {len(beds)} bed-level, exempt and listed below")
for fr, s, dur, label, _ in beds: print(f"      bed  f{fr:<4} {s:18} {dur:.2f}s  ({label})")
print(f"  {len(events)} events over {dur_s:.2f}s = {rate:.2f}/s  (house 1.0-1.5)")
if rate < 1.0 or rate > 1.5:
    fails.append(f"  ⛔ CUE RATE {rate:.2f}/s is outside the house band 1.0-1.5")
if fails:
    print("\n".join(fails)); print("FAIL"); sys.exit(1)
print("  no cue touches a sentence-final word · no banned source · no texture on speech")
print("PASS")
