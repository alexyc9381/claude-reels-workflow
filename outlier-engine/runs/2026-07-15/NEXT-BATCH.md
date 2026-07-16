# Outlier sweep — 2026-07-15 (reel 59 sourcing)

**Trigger:** Alex killed SKETCH (reel 59 candidate) on instinct as "outdated." He was right — see
`memory/premise-staleness-rerun-test.md`. SKETCH had **no comp** (it came from a self-graded HYPOTHESES file and won
an arena against other hypotheses) and its reveal was **GPT-4V's March 2023 launch demo**. Re-sourced from scratch.

**Method change (Alex, this session):** *"is there a way to get the data thru an api instead of using browseruse"*
→ built **`outlier-engine/ig_scan.py`** — the private IG JSON API, **no browser**. This changed the outcome, not just
the ergonomics. See `memory/outlier-transcript-tooling.md`.

---

## ⛔ THE SWEEP'S BIGGEST FINDING IS A SOURCING BUG, NOT A REEL

**`mavgpt` was missing from `watchlist.txt`.** We have had `mavgpt-dna.md` the entire time — **DROP-49 and SKILLS-51
are built on his named-skill formula** — but the sweeps could not see him. He is, by a wide margin, the richest vein
we have:

| | followers | median | best Door-A hit |
|---|---|---|---|
| **mavgpt** | **1,042,324** | **253,761** | **4,660,856 (18.84x)** |
| raycfu | 217,211 | 50,320 | 297,583 (6.18x) |
| gregisenberg | 136,437 | 19,738 | 1,765,057 (89.46x — but a share-driven news viral, auto-reject) |
| cindiezhu | 80,749 | 76,284 | 518,181 (6.81x) |

**Every one of mavgpt's six Door-A hits is a comment-keyword lead-magnet — our exact mechanic.** And his vein maps
almost 1:1 onto our shipped catalogue, which is precisely why he predicts what to build next:

| his keyword | views | mult | age | our reel |
|---|---|---|---|---|
| Photo | 4,660,856 | 18.84x | 7.1d | **— OPEN —** |
| Human | 2,735,190 | 11.06x | 12.2d | **— OPEN —** (⛔ ethics flag, see below) |
| Identity | 2,169,650 | 8.77x | 11.2d | ERASE 40 ✅ shipped |
| Resume | 1,119,842 | 4.53x | 6.2d | CALLBACK 58 ✅ shipped |
| Finance | 525,758 | 2.13x | 8.0d | SLASH 41 / MONEY (killed) |
| Stack | 517,470 | 2.09x | 14.0d | STACK 30 ✅ shipped |

⭐ **His "Resume" reel independently validates CALLBACK.** Different creator, different audience, same fortnight, same
lane — and his caption names *"the Google XYZ formula: Accomplish X as measured by Y by doing Z"* and *"act as an
applicant tracking system."* CALLBACK converged on his winning formula without ever seeing it. That is the strongest
external evidence we have that the resume lane was real and that the factory's instincts are calibrated.

⛔ **Handles that returned ~0 and are BUGS, not findings** (fixed in `watchlist.txt`): `rileybrown` (224 followers),
`nicksaraev` (445), `nateherk` (6,291 — IG dormant, YT-only), `sabrinaramonov` (unresolvable). **A handle returning
zero videos is a sourcing bug. Verify before concluding "no comps."**

---

## Door-A hits (≤14d AND ≥2x candidate-excluded median), exact integers

### cindiezhu — 41 videos, median 76,284
- **DasLm6opzIO — 518,181 · 6.81x · 3.4d · 12,259 comments · 425 shares · keyword "scroll"**
  Apple-style scroll animations in 4 steps, zero code (Google Flow → EZGif → an AI coding tool).
  ⭐ **A true TOPIC outlier:** her seven other reels that fortnight ALL landed below her median (0.94x, 0.77x, 0.48x,
  0.40x, 0.37x, 0.32x, 0.28x). The topic carried it, not her momentum.
  ⚠️ The 7/12 sweep saw this at 213K on day zero and killed it as a "SWIPE-50 dup." It has since done 518K.

### raycfu — 135 videos, median 50,320
- Daq51yAz64H — 297,583 · 6.18x · 3.9d · **15 comments** — "Everything OpenAI just launched in 2 minutes."
  ⛔ **AUTO-REJECT: news-reaction** (does not transfer to a faceless mascot reel), OpenAI-topic (off-brand), and the
  15 comments on 297K views (0.005%) prove there is **no keyword lead-magnet** — it is a roundup.
  ⭐ *Use the comment rate to detect the CTA mechanic. This is a signal the DOM scrape never gave us.*
- **DamEcWuPvX0 — 280,228 · 5.82x · 5.8d · 6,809 comments** — "How to build an Agentic OS using Fable 5 part 1."
  **= FOREMAN's comp (reel 52), and it has STRENGTHENED from the 240K/3.7x originally cited.**
- Daegy2UP_tW — 210,033 · 4.36x · 8.7d — "one person company using Claude Cowork" (killed 7/12, business lane)
- DahCoW1Pfyo — 161,290 · 3.35x · 7.8d — "Quants use Loop Engineering / trading bot" (killed 7/12, business lane)

### gregisenberg — 128 videos, median 19,738
- Dal9I7KRA1L — 1,765,057 · **89.46x** · 5.9d · 888 comments · **6,214 shares** — "Giant robots are coming?"
  ⛔ **AUTO-REJECT.** The 89x is a trap: shares (6,214) dwarf comments (888) = share-driven news virality, not a
  keyword lead-magnet. Wins on novelty-of-news, which does not transfer.
- DaeRUg6xJZ0 — 88,312 · 4.48x — "that robot that looked human?" (same class, reject)
- DaiHmBJxlPP — 42,104 · 2.13x — "3 Claude code plugins to save you tokens" (builder lane, low ceiling)

---

## mavgpt's structural formula (from the transcripts — worth stealing, it is doing the work)
1. **"What happens when you ask [tool] to [outcome]?"** — the hook is a QUESTION, not a claim.
2. **"I tried this and [specific, alarming result]"** — an anchored receipt by ~word 15 ("0% AI generated";
   "found me in photos I didn't even know existed"; "landed 6 job interviews in 24 hours").
3. Prompt → result → **"Now here's the trick."** ← the pivot to the NON-OBVIOUS step (L4 payoff)
4. Bigger result → **"The results were actually terrifying."**
5. **"Comment [KEYWORD] and I'll shoot them over to you."**
- Runs **4.6–4.9 wps** with a **5.0 wps hook** — that is his on-camera energy and it does NOT transfer. Our R1 bar
  stays ≤4.0 wps in the hook (CLONE anchor 3.96).
- ⛔ He speaks every prompt verbatim — he gates only "the full guide." Under our GATE-THE-HOW rule we cannot copy that.

## Status
Candidates PHOTO / HUMAN / SCROLL / FOREMAN sent to the reel-59 kill-gate (10 rules incl. the new rule-10 rerun test)
+ 3 adversarial lenses each (audience / provability / staleness) + a forced-comparison head judge.
⛔ **HUMAN carries an ethics flag:** "make your text pass every AI detector / 0% AI detected" is aimed primarily at
passing AI work off as one's own (mostly academic dishonesty). Flagged to the gate as binding, not scored on
mechanics alone. It ALSO collides structurally with CALLBACK-58 (hostile bot + score flip), which just shipped.
