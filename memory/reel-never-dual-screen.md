---
name: reel-never-dual-screen
description: "⛔ ABSOLUTE (Alex, reel 52): NEVER build a dual-screen / split reel. ONE framed dark panel, always. Plus: always tighten the VO (zero lead-in, cap every gap) and let R1 govern speed."
metadata:
  node_type: feedback
  type: feedback
  originSessionId: 09be9b49-efa9-49b2-9cf0-94de2619c452
---

# ⛔⛔ NEVER DUAL-SCREEN. EVER. (Alex, 2026-07-15, absolute)

> "never do dual screen ever thats not good at all"

**ONE framed dark panel, always** (the Cinematic Blueprint house style: `Panel` = `left:34 right:34 top:384 height:792`).
- ⛔ Do NOT clone `ClaudeImprintReel.tsx` or any split / stacked "top story over bottom UI" layout.
- ⛔ Do NOT let a memory note, an older reel, or a storyboard talk you into it. This rule outranks them.
- Default clone bases: **`ClaudeFactoryReel.tsx` / `GptSolReel.tsx`** (per CLAUDE-REELS-PLAYBOOK §C6).

**Why it fails:** two panels halve the hero and the type size, and the frame reads as a *diagram* instead of a
*scene*. If a premise seems to "need" a second panel for the receipt, it does not: put the story in the panel and
show the receipt **inside the same scene** (reel 52 CALLBACK does exactly this: the operating theatre contains the
resume, the scan, and the 41% gauge in one panel).

**What went wrong on reel 52:** I picked the IMPRINT dual-screen chassis off a memory note instead of reading the
playbook, and authored a whole 9-card storyboard for it. Alex killed it. It also cost a wrong panel height (420 vs
the real **792**), which would have clipped every scene. The playbook was right; the improvising was wrong.

---

# ⛔ TIGHTEN THE VO. ALWAYS. (Alex, standing)

> "need to make sure to cut out pauses stuff like that and make VO tight"

Non-negotiable, every reel (CLAUDE-REELS-PLAYBOOK §C2/§C3):
1. **Leading silence → 0.00s.** `L[0] = 0.0`; his first word is frame 1. (Reel 52 arrived with **1.06s** of lead-in: "the beginning theres an extra long gap".)
2. **Cap every mid gap ≥0.32s to ~0.22s.** No dead air inside the video. (Reel 52 had **10** gaps, worst **1.26s**; trimming recovered **3.29s**.)
3. **Cut inside `silencedetect` silences, never on whisper word times** (times drift around flubs). On reel 52 this alone moved the hook **4.6 → 4.2 wps: an R1 fail into a pass**.
4. ⛔ **Tight ≠ fast.** Trimming raises words-per-second, so re-measure R1 after: if any 5s window >4.5 wps, the tempo must come **DOWN** (reel 52: ×1.10 → ×1.05, final overall 3.93 wps vs CLONE's 3.96 anchor).
5. **Speed is piecewise, not global** — protect the hook and any line Alex flags as a key moment (reel 52: "so you build four Claude agents to beat it" held at 1.0×).

Pairs with [[reel-vo-pacing]] · [[caption-sync-gate]] · [[alex-vo-recordings]] · [[reel-clone-chassis-verbatim]] · [[reel-build-gotchas]].
