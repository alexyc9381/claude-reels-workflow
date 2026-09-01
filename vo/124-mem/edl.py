# REEL 123 MEM — the cut list. Every boundary is a MEASURED silence (10ms RMS scan),
# never a whisper word time. Raw source: vo/123-mem/MEM_raw48k.wav (159.01s).
# ⛔ TIGHTENED AFTER REVIEW (*"the pauses in between the sections are a bit too
# long sometimes"*). Measured on the delivered cut, only TWO gaps were over
# 0.30s and both were mine: the hook hand-off at 3.73s and the catch beat at
# 29.40s. Everything else already sat at 0.13-0.17s. So the two deliberate
# beats come down and the house hold goes with them — `TIGHTEN THE VO. ALWAYS`
# is standing, and a beat you have to defend is a beat that is too long.
HOLD = 0.13          # house hold at a sentence boundary
HOOK_HOLD = 0.20     # the hook gets a beat before the body lands, not a pause
# ⛔ R1: the densest 5s in the whole recording is 6.00 wps and it straddles the
# B7 -> B8 junction ("...before you turn this on." / "If you set your tasks..."),
# so no tempo choice can fix it - it is in the take. A 0.34s beat there splits the
# run AND is dramatically right: a catch wants air in front of it.
CATCH_HOLD = 0.22

# ⭐ THREE HOOK TAKES, ONE PER TRIAL CUT. Alex recorded three and labelled them
# "Hook 1 / Hook 2 / Hook 3"; the first build treated them as alternative takes
# for one cut, and he confirmed they are meant to be three cuts. Each is a
# different length, so each cut gets its own VO, caption file and scene table.
# ⛔ EVERY ONE VERIFIED IN ISOLATION before use, per the rule that caught the
# `cut cut` at 22s. H2 has two clean takes (23.60 and 30.30); the later one
# ships. H3's wording was settled with large-v3: "drops an update", not
# medium.en's "dropped an object".
HOOKS = {
  "h1": (2.70,  6.41, "Delete Obsidian because Claude just solved its biggest problem and built itself a second brain."),
  "h2": (30.30, 33.40, "Most people don't realize that Anthropic just released an official second brain for Claude."),
  "h3": (35.79, 39.10, "So Anthropic just quietly drops an update that turns Claude into a literal second brain."),
}

# (start, speech_end, label)  — tail hold added per-line below
LINES = [
  ("H1", 2.70,   6.41, "Delete Obsidian because Claude just solved its biggest problem and built itself a second brain."),
  ("B1", 49.13,  53.47, "This is insane because it now automatically remembers your projects and preferences across every single conversation."),
  ("B2", 56.50,  60.44, "If you use Claude you know how annoying it is when it keeps forgetting important details every time you switch chats."),
  ("B3", 73.24,  75.43, "Now Claude saves details dynamically in the background."),
  ("B4", 76.72,  79.87, "So you can go into your settings and literally see your memories categorized by topic."),
  ("B5", 88.50,  91.58, "You can click on any file to edit the details or delete anything you want it to forget."),
  ("B6", None,   None,  "It even works in your browser across the desktop app and even on mobile for all users."),
  ("B7", 122.60, 126.56, "Now this completely changes how you use Claude but there's one major catch you need to know before you turn this on."),
  ("B8", 150.34, 154.10, "If you set your tasks to run locally on your machine the memory won't sync because it only works in the cloud."),
  ("B9", 156.10, 157.25, "Comment MEM for the free setup."),
]
# ⛔⛔⛔ B6 WAS NOT ONE HALTING SENTENCE. IT WAS FOUR RETAKES.
# v1 read the four "internal gaps" at 99.76/100.38/101.36/101.92 as a halting
# delivery inside one sentence and trimmed them to 0.14s, keeping all five
# bursts. Transcribing that range IN ISOLATION says what it actually is:
#
#     mobile for... | CUT CUT | even... | CUT CUT | even works... | CUT CUT |
#     even works in your browser across the desktop app and even on mobile...
#
# So the shipped cut kept TWO "cut cut" markers and TWO false starts, and they
# are audible at 22s. The whole-file whisper pass had collapsed the whole region
# into a single "Cut cut. It even works in your browser..." line and I believed
# it — which is exactly [[compress-reel]]'s standing rule: A WHOLE-FILE WHISPER
# PASS HIDES FLUBS. VERIFY EACH KEPT RANGE SEPARATELY.
# ⭐ /tmp/verify_spans.py now transcribes every span in this list on its own;
#    only the last burst survives, as one contiguous take with no internal cut.
B6 = [(102.38, 105.69)]

def spans(hook="h1"):
    out = []
    for i, (k, s, e, _txt) in enumerate(LINES):
        if k == "H1":
            s, e = HOOKS[hook][0], HOOKS[hook][1]
        hold = HOOK_HOLD if k == "H1" else (CATCH_HOLD if k == "B7" else HOLD)
        if k == "B6":
            for j, (a, b) in enumerate(B6):
                out.append((a, b + (hold if j == len(B6) - 1 else 0.0)))
        else:
            out.append((s, e + (hold if k != "B9" else 0.10)))
    return out

def script(hook="h1"):
    """the CANON caption text for this cut — only the hook line differs"""
    return "\n".join(HOOKS[hook][2] if k == "H1" else t for k, _s, _e, t in LINES) + "\n"


if __name__ == "__main__":
    import sys
    hk = sys.argv[1] if len(sys.argv) > 1 else "h1"
    if "--script" in sys.argv:
        print(script(hk), end=""); raise SystemExit
    sp = spans(hk)
    tot = sum(b - a for a, b in sp)
    print("aselect=" + "+".join(f"between(t,{a:.3f},{b:.3f})" for a, b in sp))
    print(f"\n[{hk}] {len(sp)} spans, raw cut length {tot:.2f}s "
          f"(removed {159.01-tot:.2f}s of flubs, retakes and dead air)")
