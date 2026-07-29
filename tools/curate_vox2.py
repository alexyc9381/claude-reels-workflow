#!/usr/bin/env python3
"""
curate_vox2.py — HAND-PICKED mapping of the Vox cheat-sheet onto real Sonniss WAVs.

WHY v1 WAS THROWN AWAY
    v1 scored candidates by keyword and produced confident nonsense, because pro
    filenames are dense and substrings collide:
        "laptop keyboard typing" → Kawasaki Ninja MOTORCYCLE keys
        "single key press"       → SAXOPHONE key
        "projector hum"          → jungle night, "HUMid"
        "tape hiss"              → VELCRO squeeze
        "gear turn"              → climbing CARABINER
        "electrical hum"         → diesel BOAT engine
    Every one of those would have shipped silently as a correct-looking match. So
    this version names an exact file per sound, chosen by reading the library, and
    grades each pick honestly.

GRADES
    MATCH      the file genuinely is the requested sound
    SUBSTITUTE close enough to use, but it is NOT literally the thing — labelled in
               the manifest so nobody is misled at edit time
    (missing)  nothing honest fits; listed explicitly rather than padded with a
               near-miss. This bundle is GAME audio: strong on mechanical/UI/cloth/
               paper, empty on desk-writing foley and analog-media textures.
"""
import json, pathlib, shutil, struct, sys

SRC = pathlib.Path.home() / "Downloads" / "sfx-library" / "sonniss"
OUT = pathlib.Path.home() / "Downloads" / "sfx-library" / "vox-pack"

# section, label, unique-filename-fragment, grade, note
PICKS = [
 ("Tactile Sounds", "paper movement",   "A4 Printing Paper Rattle Page Turn Tail", "MATCH", ""),
 ("Tactile Sounds", "paper shuffle",    "Newspaper Static Foley Rummage", "MATCH", "newspaper rummage"),
 ("Tactile Sounds", "page turn",        "Encyclopedia Glossy Page Turn Muted", "MATCH", ""),
 ("Tactile Sounds", "book slide on desk","PAPRMisc_Pile Of Antique Books Falling Over", "SUBSTITUTE", "books moving, not a slide"),
 ("Tactile Sounds", "notebook handling","PAPRMisc_Antique Books Flicking Through Pages", "SUBSTITUTE", "book pages, not a notebook"),
 # pencil / pen / marker writing: NO writing foley in this bundle at all

 ("Mechanical Sounds", "stopwatch tick",      "CLOCKTick_Crooked Antique Clock", "MATCH", "antique clock tick"),
 ("Mechanical Sounds", "mechanical stopwatch","CLOCKTick_You're Running Late", "MATCH", "clock mechanism"),
 ("Mechanical Sounds", "mechanical click",    "MECHLtch_Click Deep Mechanism Latch Button", "MATCH", ""),
 ("Mechanical Sounds", "toggle switch click", "MECHClik_USALightSwitch_On05", "MATCH", ""),
 ("Mechanical Sounds", "rotary dial turn",    "COMTelph_Antique Telephone Rotary Dial", "MATCH", "real rotary phone"),
 ("Mechanical Sounds", "camera shutter mechanical","MECHClik_USALightSwitch_On05", "SUBSTITUTE", "no shutter in bundle; light-switch click is the closest transient"),
 ("Mechanical Sounds", "gear turn",           "MACHMech_Mechanism Counting Machine", "SUBSTITUTE", "mechanism, not toothed gears"),
 ("Mechanical Sounds", "lever click",         "MECHLtch_Click Deep Mechanism Latch Button", "MATCH", ""),
 ("Mechanical Sounds", "light switch click",  "MECHClik_USALightSwitch_On05", "MATCH", ""),
 ("Mechanical Sounds", "kill switch",         "MECHLtch_Click Deep Mechanism Latch Button", "SUBSTITUTE", "deep latch thunk stands in"),
 # circuit breaker: nothing honest

 ("Whooshes", "soft whoosh",   "WINDDsgn_Wind, Rush, Whoosh", "MATCH", "designed whoosh (x5 in one file)"),
 ("Whooshes", "low whoosh",    "FIREWhsh_Whoosh Fire Deep Growl", "SUBSTITUTE", "deep whoosh w/ fire texture"),
 ("Whooshes", "air movement",  "WINDInt_ChimneyWind05", "MATCH", "chimney wind"),
 ("Whooshes", "fabric whoosh", "CLOTHFlp_Action Inventory Open Flip Cloth", "MATCH", ""),
 ("Whooshes", "cloth movement","FOLYClth_ClothMovement29", "MATCH", "t-shirt foley"),

 ("Tech Sounds", "keyboard typing",     "COMType_Typewriter Carriage Movement", "SUBSTITUTE", "TYPEWRITER — no computer keyboard in bundle (fits an analog Vox look)"),
 ("Tech Sounds", "single key press",    "COMType_Typewriter Space Key", "SUBSTITUTE", "typewriter key"),
 ("Tech Sounds", "mechanical keyboard click","MECHClik_USALightSwitch_On05", "SUBSTITUTE", "clicky switch stands in"),
 ("Tech Sounds", "mouse click",         "UIClick_UI Button Analog Vintage Double Click", "MATCH", "analog vintage double click"),
 ("Tech Sounds", "mouse button press",  "Interface Percussion Snap", "MATCH", ""),
 ("Tech Sounds", "trackpad click",      "Interface Pop High Short", "SUBSTITUTE", "soft UI pop"),
 ("Tech Sounds", "computer button press","SBvr_Power Button", "MATCH", "real power button"),
 ("Tech Sounds", "subtle ui click",     "Interface Accept Glassy Snap", "MATCH", ""),
 ("Tech Sounds", "electronic click",    "MACHMed_Thermometer", "MATCH", "device button + beep"),
 ("Tech Sounds", "electrical hum",      "MACHAppl_Rhythmic Electric Fridge", "MATCH", "fridge hum/buzz/static"),
 # laptop keyboard typing: nothing honest (typewriter already used above)

 ("Ambience (Analog Only)", "analog noise", "COMStatic_Radio Ham Loop Static Hum", "MATCH", "radio static hum — the best analog texture here"),
 ("Ambience (Analog Only)", "room tone",    "AMBRoom_Factory Loop Heavy Machinery Tonal Roomtone", "SUBSTITUTE", "factory roomtone, not neutral"),
 ("Ambience (Analog Only)", "electrical hum","MACHAppl_Rhythmic Electric Fridge", "MATCH", "same fridge bed"),
 # vinyl crackle / tape hiss / projector hum / film projector / quiet office room tone:
 # genuinely absent — this is a game-audio bundle, not an analog-media library
]

MISSING = [
 ("Tactile Sounds", "pencil writing", "no writing foley in this bundle"),
 ("Tactile Sounds", "pen writing", "no writing foley in this bundle"),
 ("Tactile Sounds", "marker stroke", "no writing foley in this bundle"),
 ("Mechanical Sounds", "circuit breaker", "no breaker/heavy electrical switch"),
 ("Tech Sounds", "laptop keyboard typing", "only a typewriter exists here"),
 ("Ambience (Analog Only)", "vinyl crackle", "no turntable/vinyl content"),
 ("Ambience (Analog Only)", "tape hiss", "no tape/cassette content"),
 ("Ambience (Analog Only)", "projector hum", "no projector content"),
 ("Ambience (Analog Only)", "film projector", "no projector content"),
 ("Ambience (Analog Only)", "quiet office room tone", "only factory/spaceship roomtone"),
]

def wav_duration(p):
    """Parse the WAV header directly: ffprobe is not on PATH, and Python's `wave`
    module rejects WAVE_FORMAT_EXTENSIBLE (fmt 65534) which many pro files use."""
    try:
        with open(p, "rb") as f:
            if f.read(4) != b"RIFF": return None
            f.read(4)
            if f.read(4) != b"WAVE": return None
            rate = chan = bits = None
            while True:
                hdr = f.read(8)
                if len(hdr) < 8: return None
                cid, sz = struct.unpack("<4sI", hdr)
                if cid == b"fmt ":
                    d = f.read(sz); chan, rate = struct.unpack("<HI", d[2:8])
                    bits = struct.unpack("<H", d[14:16])[0]
                elif cid == b"data":
                    return sz / (rate * chan * max(1, bits // 8)) if rate else None
                else:
                    f.seek(sz + (sz & 1), 1)
    except Exception:
        return None

def main():
    if OUT.exists(): shutil.rmtree(OUT)      # rebuild clean — v1 left bad picks behind
    allw = list(SRC.rglob("*.wav"))
    print(f"library: {len(allw)} WAVs\n")
    rows, fails = [], []
    for section, label, frag, grade, note in PICKS:
        cands = [p for p in allw if frag.lower() in p.name.lower()]
        if not cands:
            fails.append(f"{section}/{label}: fragment not found → {frag}")
            continue
        src = sorted(cands, key=lambda p: len(p.name))[0]
        dur = wav_duration(src)
        d = OUT / section; d.mkdir(parents=True, exist_ok=True)
        dst = d / (label.replace(" ", "-") + ".wav")
        shutil.copy2(src, dst)
        rows.append({"section": section, "label": label, "file": dst.name, "grade": grade,
                     "duration_s": round(dur, 2) if dur else None, "note": note,
                     "source_file": src.name})
        # a "click"/"whoosh" that is 60s is a LOOP, not a one-shot — say so rather
        # than let an edit-time surprise happen
        ONESHOT = ("click","whoosh","turn","press","stroke","shutter","tick","movement","shuffle","slide","handling")
        kind = "BED" if (dur or 0) > 12 else "ONESHOT"
        want_oneshot = any(k in label for k in ONESHOT)
        if want_oneshot and kind == "BED":
            rows[-1]["note"] = (rows[-1]["note"] + " · " if rows[-1]["note"] else "") + f"LONG FILE ({round(dur)}s) — trim to taste"
        rows[-1]["kind"] = kind
        flag = "✓" if grade == "MATCH" else "≈"
        warn = "  ⚠ long" if (want_oneshot and kind == "BED") else ""
        print(f"  {flag} {section[:22]:<24} {label:<26} {dur and round(dur,2)}s  {grade}{warn}")
    if fails:
        print("\n⚠️ fragments that matched nothing:"); [print("   ", f) for f in fails]

    # manifest mirroring the cheat-sheet
    L = ["# 🎧 Vox-Style Sound Design Pack", "",
         "Real WAVs from the **Sonniss GDC bundle** — royalty-free, **no attribution**, unlimited",
         "commercial use. Durations read from WAV headers.", "",
         "`MATCH` = genuinely that sound · `SUBSTITUTE` = usable stand-in, but not literally the thing.", ""]
    for section in dict.fromkeys(s for s, *_ in PICKS):
        sec = [r for r in rows if r["section"] == section]
        if not sec: continue
        L += [f"## {section}", "", "| sound | file | length | grade | note |", "|---|---|---|---|---|"]
        L += [f"| {r['label']} | `{r['file']}` | {r['duration_s']}s | {r['grade']} | {r['note']} |" for r in sec]
        L.append("")
    L += ["## Not in this bundle", "",
          "The Sonniss GDC pack is **game audio** — excellent for mechanical/UI/cloth/paper,",
          "and genuinely empty on desk-writing foley and analog-media textures.", "",
          "| sound | why |", "|---|---|"]
    L += [f"| {lab} ({sec}) | {why} |" for sec, lab, why in MISSING]
    L += ["", "Best source for these: **Mixkit** or **Pixabay** (real WAVs, free, no attribution)."]
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "MANIFEST.md").write_text("\n".join(L))
    (OUT / "manifest.json").write_text(json.dumps({"picked": rows, "missing": MISSING}, indent=2))

    m = sum(1 for r in rows if r["grade"] == "MATCH")
    print(f"\n{len(rows)} files staged · {m} MATCH · {len(rows)-m} SUBSTITUTE · {len(MISSING)} missing")
    print(f"→ {OUT}")

if __name__ == "__main__":
    sys.exit(main())
