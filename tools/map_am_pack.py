#!/usr/bin/env python3
"""
map_am_pack.py — map the AM Creator SFX Collection onto the Vox cheat-sheet.

Two things are produced, because they serve different jobs:

  1. THE FULL PACK, in its own professional 14-category structure. It is already
     better organised than anything I would impose, so it ships untouched — that
     is the library to browse while editing.

  2. THE VOX SUBFOLDERS, filled with TRUE MATCHES ONLY. Same discipline applied
     to the Sonniss pass: a file goes in only if it genuinely IS the sound named.
     Anything that would need a "close enough" caveat is left out, and listed at
     the bottom of the manifest instead — because a mislabelled SFX costs more
     time at the edit than a missing one.

Nothing is renamed inside the full pack; the Vox copies are renamed to the
cheat-sheet label so they drop straight into a timeline.
"""
import json, pathlib, shutil, struct, sys

SRC = pathlib.Path("/tmp/amx/AM Creator SFX Collection")
OUT = pathlib.Path.home() / "Downloads" / "sfx-library" / "vox-pack-AM"

# (section, cheat-sheet label, exact source file) — TRUE MATCHES ONLY
PICKS = [
 # ---- Tactile ----------------------------------------------------------
 ("Tactile Sounds", "paper movement",  "10 - Paper/Paper 07 - Paper Rustle.wav"),
 ("Tactile Sounds", "paper shuffle",   "10 - Paper/Paper 08 - Paper Slide.wav"),
 ("Tactile Sounds", "page turn",       "10 - Paper/Paper 05 - Page Turn.wav"),
 ("Tactile Sounds", "pencil writing",  "10 - Paper/Paper 09 - Pencil Writing.wav"),
 ("Tactile Sounds", "marker stroke",   "10 - Paper/Paper 02 - Marker Stroke.wav"),
 # ---- Mechanical -------------------------------------------------------
 ("Mechanical Sounds", "stopwatch tick",            "06 - UI/UI 07 - Counter Tick.wav"),
 ("Mechanical Sounds", "mechanical click",          "04 - Clicks/Click 05 - Hard.wav"),
 ("Mechanical Sounds", "rotary dial turn",          "06 - UI/UI 28 - Wheel Spin.wav"),
 ("Mechanical Sounds", "camera shutter mechanical", "03 - Camera/Camera 17 - Simple Shutter.wav"),
 ("Mechanical Sounds", "gear turn",                 "09 - Gears/Gear 03 - Mechanism.wav"),
 # ---- Whooshes ---------------------------------------------------------
 ("Whooshes", "soft whoosh",  "01 - Whooshes/Whoosh 07 - Simple.wav"),
 ("Whooshes", "low whoosh",   "01 - Whooshes/Whoosh 04 - Slow Thick.wav"),
 ("Whooshes", "air movement", "01 - Whooshes/Whoosh 01 - Wind Fly-by.wav"),
 # ---- Tech -------------------------------------------------------------
 ("Tech Sounds", "keyboard typing",          "05 - Keyboards/Keyboard 05 - Membrane.wav"),
 ("Tech Sounds", "laptop keyboard typing",   "05 - Keyboards/Keyboard 03 - MacBook.wav"),
 ("Tech Sounds", "mechanical keyboard click","05 - Keyboards/Keyboard 04 - Mechanical.wav"),
 ("Tech Sounds", "mouse click",              "04 - Clicks/Click 10 - Mouse Click.wav"),
 ("Tech Sounds", "mouse button press",       "04 - Clicks/Click 11 - Mouse Deep.wav"),
 ("Tech Sounds", "trackpad click",           "04 - Clicks/Click 03 - Mouse Light.wav"),
 ("Tech Sounds", "computer button press",    "06 - UI/UI 26 - Clean Click.wav"),
 ("Tech Sounds", "subtle ui click",          "06 - UI/UI 13 - Button Hover.wav"),
 ("Tech Sounds", "electronic click",         "06 - UI/UI 11 - Futuristic Click.wav"),
 ("Tech Sounds", "electrical hum",           "06 - UI/UI 04 - Computer Hum.wav"),
 # ---- Ambience ---------------------------------------------------------
 ("Ambience (Analog Only)", "analog noise",          "14 - Misc/SFX 08 - Radio Static.wav"),
 ("Ambience (Analog Only)", "projector hum",         "03 - Camera/Camera 09 - Film Projector.wav"),
 ("Ambience (Analog Only)", "film projector",        "03 - Camera/Camera 09 - Film Projector.wav"),
 ("Ambience (Analog Only)", "room tone",             "07 - Ambience/Ambience 08 - Room Tone.wav"),
 ("Ambience (Analog Only)", "quiet office room tone","07 - Ambience/Ambience 06 - Office.wav"),
]

# Deliberately NOT auto-filled — the pack has something adjacent, but it is not the
# thing, and a wrong label costs more at the edit than an empty slot.
NEAR_MISSES = [
 ("Tactile Sounds", "book slide on desk", "closest: Paper 08 - Paper Slide (paper, not a book)"),
 ("Tactile Sounds", "notebook handling",  "closest: Paper 06 - Page Flip"),
 ("Tactile Sounds", "pen writing",        "closest: Paper 01 - Highlighter / Paper 04 - Marker Lines"),
 ("Mechanical Sounds", "mechanical stopwatch", "closest: Gear 03 - Mechanism (mechanism, not a stopwatch)"),
 ("Mechanical Sounds", "toggle switch click",  "closest: Click 05 - Hard"),
 ("Mechanical Sounds", "lever click",          "closest: Click 01 - Single Snap"),
 ("Mechanical Sounds", "light switch click",   "closest: SFX 06 - Lights Flicker On (flicker, not the switch)"),
 ("Mechanical Sounds", "circuit breaker",      "closest: SFX 06 - Lights Flicker On"),
 ("Mechanical Sounds", "kill switch",          "closest: Click 05 - Hard"),
 ("Whooshes", "fabric whoosh",  "closest: Whoosh 05 - Fast Airy (airy, not fabric)"),
 ("Whooshes", "cloth movement", "closest: Whoosh 08 - Choppy"),
 ("Tech Sounds", "single key press", "closest: Keyboard 01 - iPhone Tap (a phone, not a key)"),
 ("Ambience (Analog Only)", "vinyl crackle", "closest: SFX 11 - Vinyl Scratch Stop (a scratch, not a crackle bed)"),
 ("Ambience (Analog Only)", "tape hiss",     "closest: SFX 08 - Radio Static / UI 10 - Static Glitch"),
]

def dur(p):
    """WAV header parse — ffprobe is not on PATH, and Python's `wave` rejects
    WAVE_FORMAT_EXTENSIBLE (fmt 65534) that pro packs often use."""
    try:
        with open(p, "rb") as f:
            if f.read(4) != b"RIFF": return None
            f.read(4)
            if f.read(4) != b"WAVE": return None
            rate = ch = bits = None
            while True:
                h = f.read(8)
                if len(h) < 8: return None
                cid, sz = struct.unpack("<4sI", h)
                if cid == b"fmt ":
                    d = f.read(sz); ch, rate = struct.unpack("<HI", d[2:8]); bits = struct.unpack("<H", d[14:16])[0]
                elif cid == b"data":
                    return sz / (rate * ch * max(1, bits // 8)) if rate else None
                else: f.seek(sz + (sz & 1), 1)
    except Exception: return None

def main():
    if not SRC.exists(): print(f"✗ {SRC} missing"); return 1
    if OUT.exists(): shutil.rmtree(OUT)
    rows, fails = [], []
    for section, label, rel in PICKS:
        s = SRC / rel
        if not s.exists(): fails.append(f"{label} → {rel}"); continue
        d = OUT / section; d.mkdir(parents=True, exist_ok=True)
        dst = d / (label.replace(" ", "-") + ".wav")
        shutil.copy2(s, dst)
        t = dur(s)
        rows.append({"section": section, "label": label, "file": dst.name,
                     "duration_s": round(t, 2) if t else None, "source": rel})
        print(f"  ✓ {section[:22]:<24} {label:<26} {t and round(t,2)}s  ← {pathlib.Path(rel).name}")
    if fails:
        print("\n⚠️ source files not found:"); [print("   ", f) for f in fails]

    L = ["# 🎧 Vox-Style Sound Design Pack — AM Creator SFX Collection", "",
         "**True matches only.** A file appears here only if it genuinely *is* the sound named.",
         "Near-misses are listed at the bottom rather than dropped in with a caveat — a",
         "mislabelled SFX costs more at the edit than a missing one.", "",
         "The **full pack** sits alongside this in its own 14-category structure; browse that",
         "for anything not covered here.", ""]
    for sec in ["Tactile Sounds","Mechanical Sounds","Whooshes","Tech Sounds","Ambience (Analog Only)"]:
        r = [x for x in rows if x["section"] == sec]
        if not r: continue
        L += [f"## {sec}", "", "| sound | file | length | from |", "|---|---|---|---|"]
        L += [f"| {x['label']} | `{x['file']}` | {x['duration_s']}s | {pathlib.Path(x['source']).name} |" for x in r]
        L.append("")
    L += ["---", "", "## Left empty on purpose (14)", "",
          "The pack has something adjacent for each, but not the actual sound. Pull these",
          "by hand from the full pack if the near-miss works for your shot.", "",
          "| section | sound | nearest thing in the pack |", "|---|---|---|"]
    L += [f"| {s} | {l} | {n} |" for s, l, n in NEAR_MISSES]
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "MANIFEST.md").write_text("\n".join(L))
    (OUT / "manifest.json").write_text(json.dumps({"matches": rows, "near_misses": NEAR_MISSES}, indent=2))
    print(f"\n{len(rows)} true matches · {len(NEAR_MISSES)} left empty on purpose")
    return 0

if __name__ == "__main__":
    sys.exit(main())
