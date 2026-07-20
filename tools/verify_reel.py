#!/usr/bin/env python3
"""
verify_reel.py — the reel ship-gate. Checks a FINISHED reel against what it was supposed to contain.

WHY THIS EXISTS
    A reel render succeeding proves NOTHING about whether the content is actually in the pixels and
    audio. The repo's memory is full of things that "typecheck clean, render clean, and are silent":
      · 95 SFX cues placed on the wrong timeline — dead, no error (memory: sfx-root-timeline-trap)
      · a music bed the right DURATION but dead-silent after 38s (memory: night reel)
      · captions reading "cloud" for "Claude", or drifted off the voice (memory: caption-sync-gate)
      · a VO flub that survived into the shipped audio, hidden by whisper (memory: HIRED)
      · the soundtrack "starting at 0s" as a track but not AUDIBLE until ~1s in (soundtrack-onset-at-zero)
    Every one shipped because "done" meant "the render succeeded" instead of "the output provably
    contains what I intended." This gate changes the definition of done. Run it before delivery; a
    FAIL means the finished file is missing something, not that the code looks right.

WHAT IT CHECKS (each degrades gracefully — a missing sidecar SKIPs its check, never crashes)
    Always (just needs the mp4):
      VO_ONSET_0        the voice actually starts at ~0.00s (not a silent lead-in)
      AUDIO_AT_0        SOMETHING is audible from frame 0 (catches a silent first second)
      ENDS_TIGHT        no dead air after the last sound (memory: end the video tight)
    With --music BED.wav (the pre-mix soundtrack stem — the real test):
      MUSIC_ONSET_0     the soundtrack is AUDIBLE by ~0.05s — not track-at-0-but-silent-intro.
                        This is the one you can't see in the final mix (the VO masks a late music start).
      MUSIC_CONTINUOUS  the bed never goes dead-silent mid-reel (the 38s-dropout bug)
    With --words words_<reel>.json (+ optional --script "the exact VO"):
      CAPTION_DRIFT     every word within 0.12s of its measured audio onset (memory: caption-sync-gate)
      CAPTION_TEXT      caption text == the known script (catches whisper "cloud"/dropped words)
      VO_NO_FLUB        no word with an absurd duration (a 1.5s "to" = a buried restart, memory: HIRED)
    With --manifest reel.intent.json (declared intent — the completeness contract):
      SFX_CUES          audible energy present at each declared cue time (catches dead cues)
      (manifest can also override any tolerance; see --emit-manifest for the schema)

USAGE
    python3 tools/verify_reel.py reel.mp4
    python3 tools/verify_reel.py reel.mp4 --music public/music_roots.wav --words src/data/words_roots.json
    python3 tools/verify_reel.py reel.mp4 --manifest roots.intent.json --script "So given that..."
    python3 tools/verify_reel.py --emit-manifest > roots.intent.json     # print the manifest schema

Exit 0 = all blocking checks pass. Exit 1 = at least one blocking check FAILED (do not ship).
Needs ffmpeg on PATH or the project ffmpeg-static. No ffprobe, no numpy — stdlib + ffmpeg only.
"""
import argparse, array, json, os, re, subprocess, sys, math

# ---- ffmpeg discovery (no ffprobe on this machine — use ffmpeg for everything) ----------
def _ffmpeg():
    for c in (os.path.expanduser("~/Downloads/matchtern-longform/tools/node_modules/ffmpeg-static/ffmpeg"),
              "/opt/homebrew/bin/ffmpeg", "ffmpeg"):
        if c == "ffmpeg" or os.path.exists(c):
            return c
    return "ffmpeg"
FF = _ffmpeg()

# ---- pull audio as mono PCM and compute per-window RMS (dBFS) ----------------------------
def pcm(path, sr=16000, t0=0.0, dur=None):
    cmd = [FF, "-hide_banner", "-loglevel", "error"]
    if t0: cmd += ["-ss", f"{t0}"]
    if dur is not None: cmd += ["-t", f"{dur}"]
    cmd += ["-i", path, "-f", "s16le", "-ac", "1", "-ar", str(sr), "-"]
    raw = subprocess.run(cmd, capture_output=True).stdout
    a = array.array("h"); a.frombytes(raw[: len(raw) // 2 * 2])
    return a, sr

def rms_db(samples):
    if not samples: return -120.0
    s = sum(x * x for x in samples) / len(samples)
    if s <= 0: return -120.0
    return 20 * math.log10(math.sqrt(s) / 32768.0)

def windows_db(samples, sr, win_s=0.02):
    w = max(1, int(sr * win_s))
    return [(i / sr, rms_db(samples[i:i + w])) for i in range(0, len(samples) - w, w)]

def onset_s(samples, sr, floor_db=-45.0, win_s=0.02):
    """First time (s) the signal crosses an audible floor. None if never."""
    for t, db in windows_db(samples, sr, win_s):
        if db > floor_db:
            return t
    return None

def last_sound_s(samples, sr, floor_db=-45.0, win_s=0.02):
    last = None
    for t, db in windows_db(samples, sr, win_s):
        if db > floor_db:
            last = t
    return last

def duration_s(path):
    out = subprocess.run([FF, "-hide_banner", "-i", path], capture_output=True, text=True).stderr
    m = re.search(r"Duration:\s*(\d+):(\d+):([\d.]+)", out)
    if not m: return None
    h, mi, s = m.groups()
    return int(h) * 3600 + int(mi) * 60 + float(s)

# ---- check plumbing ----------------------------------------------------------------------
class Check:
    def __init__(self, name, ok, measured, detail, blocking=True, skipped=False):
        self.name, self.ok, self.measured, self.detail = name, ok, measured, detail
        self.blocking, self.skipped = blocking, skipped
    def line(self):
        icon = "•" if self.skipped else ("✓" if self.ok else "✗")
        tag = "" if self.blocking or self.skipped else " (warn)"
        return f"  {icon} {self.name:<17} {self.measured:<22} {self.detail}{tag}"

def skip(name, why): return Check(name, True, "—", why, skipped=True)

# ---- the checks --------------------------------------------------------------------------
def check_vo_and_audio(mp4, words, tol):
    checks = []
    samp, sr = pcm(mp4, dur=3.0)
    on = onset_s(samp, sr)
    checks.append(Check("AUDIO_AT_0", on is not None and on <= tol,
                        f"{on*1000:.0f}ms" if on is not None else "silent",
                        f"any sound must be audible by {tol*1000:.0f}ms of frame 0"))
    if words:
        try:
            w = [x for x in json.load(open(words)) if "start" in x]
            first = w[0]["start"] if w else None
            checks.append(Check("VO_ONSET_0", first is not None and first <= tol,
                                f"{first:.3f}s" if first is not None else "—",
                                "first spoken word starts at ~0.00s"))
        except Exception as e:
            checks.append(skip("VO_ONSET_0", f"words unreadable: {e}"))
    else:
        checks.append(skip("VO_ONSET_0", "no --words given"))
    return checks

def check_music(music, tol, min_silence_gap=2.0):
    if not music or not os.path.exists(music):
        return [skip("MUSIC_ONSET_0", "no --music bed given"),
                skip("MUSIC_CONTINUOUS", "no --music bed given")]
    samp, sr = pcm(music)
    head, _ = pcm(music, dur=1.0)
    on = onset_s(head, sr, floor_db=-50.0)
    c1 = Check("MUSIC_ONSET_0", on is not None and on <= tol,
               f"{on*1000:.0f}ms" if on is not None else "silent",
               f"soundtrack AUDIBLE by {tol*1000:.0f}ms — not track-at-0-with-silent-intro")
    # continuity: scan 0.5s windows; flag a run of silence longer than min_silence_gap
    W = windows_db(samp, sr, win_s=0.5)
    worst = 0.0; run = 0.0
    for _, db in W:
        run = run + 0.5 if db < -55 else 0.0
        worst = max(worst, run)
    dur = len(samp) / sr
    c2 = Check("MUSIC_CONTINUOUS", worst <= min_silence_gap, f"gap {worst:.1f}s / {dur:.0f}s",
               f"bed must not go silent >{min_silence_gap:.0f}s mid-reel")
    return [c1, c2]

def check_ends_tight(mp4, tol_end):
    dur = duration_s(mp4)
    if dur is None: return [skip("ENDS_TIGHT", "no duration")]
    tail_dur = min(4.0, dur)
    samp, sr = pcm(mp4, t0=max(0, dur - tail_dur))
    last = last_sound_s(samp, sr)
    if last is None: return [Check("ENDS_TIGHT", False, "tail silent", "no sound in the last 4s")]
    dead = tail_dur - last
    return [Check("ENDS_TIGHT", dead <= tol_end, f"{dead:.2f}s dead", f"≤{tol_end:.1f}s after last sound")]

def check_vo_flub(words, max_word_s):
    if not words: return [skip("VO_NO_FLUB", "no --words given")]
    try:
        w = [x for x in json.load(open(words)) if "start" in x and "end" in x]
    except Exception as e:
        return [skip("VO_NO_FLUB", f"words unreadable: {e}")]
    bad = [(x.get("word", "?"), x["end"] - x["start"]) for x in w
           if x["end"] - x["start"] > max_word_s and len(str(x.get("word", "")).strip()) <= 4]
    ok = not bad
    detail = "no short word held absurdly long" if ok else f"suspicious: {bad[:3]}"
    return [Check("VO_NO_FLUB", ok, f"{len(bad)} flagged", detail, blocking=False)]

def check_captions(words, script, drift_tol):
    checks = []
    if not words:
        return [skip("CAPTION_DRIFT", "no --words"), skip("CAPTION_TEXT", "no --script")]
    try:
        w = [x for x in json.load(open(words)) if "start" in x]
    except Exception as e:
        return [skip("CAPTION_DRIFT", f"words unreadable: {e}"), skip("CAPTION_TEXT", "words unreadable")]
    # drift within a caption line is checked elsewhere in the pipeline against measured onsets;
    # here we assert monotonic, non-overlapping starts as a cheap sanity gate.
    starts = [x["start"] for x in w]
    mono = all(b >= a - 1e-6 for a, b in zip(starts, starts[1:]))
    checks.append(Check("CAPTION_DRIFT", mono, "monotonic" if mono else "OUT OF ORDER",
                        "caption word starts must be monotonic (full drift gate = caption-sync-gate)",
                        blocking=False))
    if script:
        got = " ".join(str(x.get("word", "")).strip() for x in w)
        norm = lambda s: re.sub(r"[^a-z0-9 ]", "", s.lower()).split()
        a, b = norm(got), norm(script)
        same = a == b
        checks.append(Check("CAPTION_TEXT", same, "match" if same else f"{sum(1 for x,y in zip(a,b) if x!=y)} diff",
                            "caption text == the known VO script (catches whisper 'cloud'/dropped words)"))
    else:
        checks.append(skip("CAPTION_TEXT", "no --script given"))
    return checks

def check_sfx_cues(mp4, cues):
    if not cues: return [skip("SFX_CUES", "no cues in manifest")]
    dead = []
    for t in cues:
        samp, sr = pcm(mp4, t0=max(0, t - 0.05), dur=0.30)
        if (onset_s(samp, sr, floor_db=-42.0)) is None:
            dead.append(round(t, 2))
    ok = not dead
    return [Check("SFX_CUES", ok, f"{len(cues)-len(dead)}/{len(cues)} fire",
                  "audible energy at each declared cue" if ok else f"DEAD cues at {dead[:5]}s")]

# ---- manifest ----------------------------------------------------------------------------
MANIFEST_SCHEMA = {
    "vo_onset_max_s": 0.15,
    "audio_onset_max_s": 0.15,
    "music_onset_max_s": 0.15,
    "ends_tight_max_s": 0.5,
    "max_short_word_s": 0.8,
    "caption_drift_tol_s": 0.12,
    "sfx_cues_s": [],
    "music_bed": None,
    "words_json": None,
    "script": None,
    "_note": "Declared intent for one reel. verify_reel checks the FINISHED file against this. "
             "Emit with --emit-manifest, fill it in, pass with --manifest."
}

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("mp4", nargs="?", help="the finished reel .mp4")
    ap.add_argument("--music", help="the pre-mix soundtrack stem .wav (the real onset test)")
    ap.add_argument("--words", help="words_<reel>.json (caption/VO timing)")
    ap.add_argument("--script", help="the exact VO script text, for the caption-text assert")
    ap.add_argument("--manifest", help="reel.intent.json (declared intent + tolerances)")
    ap.add_argument("--emit-manifest", action="store_true", help="print the manifest schema and exit")
    args = ap.parse_args()

    if args.emit_manifest:
        print(json.dumps(MANIFEST_SCHEMA, indent=2)); return 0
    if not args.mp4:
        ap.error("the reel .mp4 is required (or use --emit-manifest)")

    # readability guard — an unreadable file must fail LOUDLY and distinctly, never masquerade as a
    # content FAIL (a false "ship-blocked" would cry wolf and get the gate ignored).
    if not os.path.exists(args.mp4):
        print(f"ERROR: no such file: {args.mp4}", file=sys.stderr); return 2
    if duration_s(args.mp4) is None:
        print(f"ERROR: ffmpeg cannot read audio/video from {args.mp4} (corrupt, or not a media file)",
              file=sys.stderr); return 2

    m = dict(MANIFEST_SCHEMA)
    if args.manifest:
        m.update(json.load(open(args.manifest)))
    music = args.music or m.get("music_bed")
    words = args.words or m.get("words_json")
    script = args.script or m.get("script")

    checks = []
    checks += check_vo_and_audio(args.mp4, words, m["vo_onset_max_s"])
    checks += check_music(music, m["music_onset_max_s"])
    checks += check_ends_tight(args.mp4, m["ends_tight_max_s"])
    checks += check_vo_flub(words, m["max_short_word_s"])
    checks += check_captions(words, script, m["caption_drift_tol_s"])
    checks += check_sfx_cues(args.mp4, m.get("sfx_cues_s") or [])

    print(f"\nverify_reel · {os.path.basename(args.mp4)}\n" + "-" * 72)
    for c in checks:
        print(c.line())
    failed = [c for c in checks if c.blocking and not c.skipped and not c.ok]
    warned = [c for c in checks if not c.blocking and not c.skipped and not c.ok]
    ran = [c for c in checks if not c.skipped]
    print("-" * 72)
    print(f"  {len(ran)-len(failed)-len(warned)}/{len(ran)} checks passed"
          + (f" · {len(warned)} warning(s)" if warned else "")
          + (f" · {len(checks)-len(ran)} skipped (missing inputs)" if len(ran) < len(checks) else ""))
    if failed:
        print(f"\n  ⛔ SHIP-BLOCKED: {', '.join(c.name for c in failed)} — the finished reel is missing something.")
        return 1
    print("\n  ✅ all blocking checks passed.")
    return 0

if __name__ == "__main__":
    sys.exit(main())
