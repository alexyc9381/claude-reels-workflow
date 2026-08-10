# STORYBOARD — REEL 85 "AUTO"

**VO:** `public/auto_vo_final.wav` — 21.98s (raw take 31.46s).
**Captions:** `src/data/words_auto.json` — 97 words, **33 lines, 33/33 anchored to a measured onset**.
Keyword **AUTO**. Drive slot **85**.

---

## VO cleanup

Raw was 31.46s with **two `cut cut` flubs** and a duplicated CTA. Six segments kept, every boundary
inside a MEASURED quiet window, never a whisper word end (those run 150-200ms early, §5):

```
1.100-6.690    hook: 24,000 stars / 280 pre-built automations
6.844-11.804   inbox sorts itself / leads / content
12.855-16.791  Gmail, Slack, WhatsApp, Notion, Stripe / 18 categories
17.333-21.047  you don't build them, you import one file
23.509-25.830  everyone else, by hand every morning
29.341-30.798  comment AUTO            <- the RETAKE, not the first pass
```

Dropped: a 1.10s lead-in, `21.265-23.033` (an aborted "Everyone else is still doing…" + "cut cut"),
`25.830-29.341` (the first CTA take + "cut cut"), and a 0.78s tail.

⚠️ **The join after "every morning" had no −40 dB gap.** `silencedetect` found nothing between
25.66 and 25.92 because the pause is only ~80ms, under its 0.10s floor. Used the documented
energy-envelope fallback instead: a 5ms RMS scan found the trough at **25.835s at −76 dBFS**, and the
cut went there. Verified by re-transcribing the assembled file — zero flub survivors, one CTA,
speech starts at 0.00.

---

## ✅ The repo, VERIFIED before anything was built

`enescingoz/awesome-n8n-templates` — checked against the GitHub API and the full 374-file tree, not
a search snippet.

| VO claim | reality | |
|---|---|---|
| "over 24,000 stars" | **24,302** | ✅ |
| "280 pre-built automations" | README: "**280+ automation templates**" | ✅ |
| "18 categories" | README: "across **18 categories**" | ✅ |
| Gmail | 29 files, its own category | ✅ |
| Slack | 10 files, its own category | ✅ |
| WhatsApp | 6 files, its own category | ✅ |
| Notion | 12 files, its own category | ✅ |
| **Stripe** | **0 files. 0 mentions in the README.** | ⛔ |

⛔ **"Stripe" is wrong.** It appears nowhere in the repo. Everything else in the script is accurate.

**How the build handles it, without re-recording and without putting a false claim on screen:**
the four real marks land on their own words (10.46 / 10.60 / 11.24 / 11.48), and on "Stripe" (11.80)
the graphic *transitions* to the 18-category wall, which the VO names 0.5s later at 12.31. No Stripe
logo is ever drawn, and no visual gap opens either, because the next beat arrives on top of it.

This is a script accuracy issue, not a design one. The lead magnet lists the real categories.
Unlike reel 84's provenance problem, nothing here ships unconfirmed.

---

## Beats (measured onsets)

| t | line |
|---|---|
| 0.00 | 24,000 stars, 280 pre-built automations |
| 5.56 | your inbox sorts itself, leads followed up while you sleep, content posted |
| 10.46 | Gmail, Slack, WhatsApp, Notion, [Stripe] |
| 12.31 | 18 categories of automations in total |
| 14.26 | you don't build any of them |
| 15.40 | you grab one file, click import, and it starts running |
| 18.20 | everyone else is still doing all of this by hand every morning |
| 20.50 | comment AUTO |

END 21.98 · last word ends 21.30

---

## The storyline

1. **The hero** wants the work done without doing it.
2. **The blocker** is DOING IT BY HAND, every morning, forever.
3. **The turn** is that you do not build the machine. You push ONE thing.
4. **The payoff you SEE** is a cascade you started and did not touch again.

---

## Concept · THE DOMINO RUN

**Why this world:** the product IS a cascade. "You grab one file, click import, and it just starts
running" is literally one tile pushed into 279 more. Nothing has to be explained.

- **280 automations** = 280 tiles
- **18 categories** = 18 rooms the run travels through
- **"while you sleep"** = the run continues through a dark house at night
- **the villain** = a Claude standing tiles up ONE AT A TIME by hand, at dawn, forever

**Hierarchy mechanism:** a dark world with a lit run. Your eye follows the one moving line of light.
Reel 84 measured a cream room at **1.24** and a dark one at **2.92** — hierarchy needs darkness, and
a cascade gives it direction as well as rank.

**Locations (one per beat, house rule):**
the desk at night · the hallway · the inbox room · the leads room · the socials room ·
the brand hall (Gmail/Slack/WhatsApp/Notion) · the 18-door gallery · the finger and the first tile ·
the by-hand yard at dawn · the CTA

**Geometric and countable:** tiles, doors, rooms, a single travelling line. Under ~8 objects per
shot reads as a diagram; the cascade gives density without clutter.

---

## Gates

- frame-0 **panel luma ≥ 140/255**
- 6 shots in the open, **none under 0.70s**
- a transient within 300ms of every cut
- matte paints, dark drop shadows, no glow, no washes
- ONE text chip per shot
- **a Claude mascot in EVERY scene** — never a generic figure
- REAL brand marks, saved locally, never coloured squares
- a different location every scene
- `verify_reel.py` 9/9 · `scene_motion_audit.py` no scene STATIC or DEAD
