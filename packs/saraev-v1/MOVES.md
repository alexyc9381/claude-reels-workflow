# MOVES — saraev-v1

Named, reproducible moves lifted from the corpus. Every move cites at least one exact timestamp. Parameters
are given concretely so a compositor can execute without watching the source.

Companion to [`THE-MEASURED-SPINE.md`](THE-MEASURED-SPINE.md) (the evidence) and
[`HOUSE-NUMBERS.json`](HOUSE-NUMBERS.json) (the machine-readable targets).

---

## M1 · Circle-Then-Say ⭐

**Where:** `fable-tokens` @3.2–10.4s (the $1,400 claim). Recurs as live underlines in `agent-workflow` @73.2s
(under "AI" and "Human").

**What:** The artifact is already on screen. He hand-draws a freehand ellipse around the figure with an
annotation tool, **finishing before he says the number**, holds it, then erases.

**Timing (measured by cyan-stroke pixel count):**

| beat | t | note |
|---|---|---|
| stroke begins | 3.2s | 2.2s **before** the word |
| ellipse complete | 4.7s | ~1.5s draw duration |
| **word spoken** | **5.4s** | 0.7s **after** the circle lands |
| erased | 10.4s | lifetime ≈ 7.1s |

**Why it works:** the eye is parked on the number *before* the claim arrives, so the claim reads as
confirmation rather than assertion. This is the one place in the entire style where picture is tightly synced
to voice — and it **leads**, never follows.

**Recipe:** freehand stroke (not a shape primitive, not a lower-third), 3–4px, high-chroma cyan on a dark UI.
Draw over ~1.5s with a slight overshoot/wobble — it must look hand-drawn. Complete **0.7s before** the word.
Hold ~5s. Erase instantly, not with a fade.

> ⛔ Do **not** substitute a graphic, a highlight box, or a zoom. The freehand-on-live-screen quality is the
> move.

---

## M2 · The Payoff Montage ⭐

**Where:** `fable-websites` @536.6–555s — the largest burst in the corpus (18.5s, **14 shots**), at the **84%**
mark.

**What:** The results reel. Rapid-cut through the finished artifacts one at a time — a grid index, then each
built site in turn (NOCTURNE, THE CRATES, NOSTALGIA PRESSED TO WAX) — narrated continuously, face PIP unmoved.

**Recipe:** at **~85% of runtime**, hold **~2s per artifact**, **8–14 shots**, **~18s total**. VO narrates each
one as a single continuous take (*"This one here is where you fly through a procedurally 3D generated
cityscape… I really like this website here"*). Do not cut on the sentence boundaries — cut when the next thing
is ready to be seen.

**Why it works:** the video's whole promise ("build 25 websites") is discharged in one accelerating burst. It
is the only place the cut rate approaches conventional fast-cutting, and it lands exactly where the payoff is.

---

## M3 · The No-Runway Open ⭐

**Where:** all six. `fable-tokens` is the purest case.

**What:** Speech begins at **0.00s**. No cold open, no title card, no music, no settling breath. Four of six
open on the literal word **"So"** — *"So given that…"*, *"So to test…"*, *"So as you know…"*, *"So the way…"* —
as though the conversation started before you arrived.

**Two valid first frames:**
- **His face, already gesturing** (`fable-websites` opens mid-hand-raise, `agent-workflow`, `solo-20k`)
- **The finished artifact** (`sol-ads` → the candle ad; `kimi-k3` → the benchmark chart; `fable-tokens` → a
  bill reading **$2,409.88**)

**Recipe:** first audio sample = first phoneme of a sentence already in progress. First video frame = motion or
artifact, never a static card. When the video's subject is a number, **the number is the first frame** and the
claim arrives 5s later (see M1).

---

## M4 · Source-Switch, Never Scale ⭐

**Where:** `agent-workflow` — 17 cuts across 1161s, all of them source switches.

**What:** A cut always changes **what is shown** (face → slide → app → diagram → app). It **never** changes
scale on the same subject. Punch-ins, zooms, reframes: **n=0 across 121 minutes.** The camera is locked.

**Recipe:** to sustain a long talking-head, do not punch in. Cut to a different *thing*. If you have nothing
to cut to, **hold the take** — he sustains single shots up to **188s**.

---

## M5 · The Burst

**Where:** `fable-websites` (8), `sol-ads` (8), `kimi-k3` (1). Absent from the interview format.

**What:** ≥3 consecutive shots each under 4s, in a run. Cuts cluster at **3.2–3.5× a Poisson null** — bursts
are the unit, not a cut rate.

**Shape is a creator constant:** **~7s long, 5–6 shots** (measured 7.4 / 7.2 / 6.8s across three unrelated
videos). **Count is a format variable** (0–8 per video).

**Placement is narrative, not metronomic:** opening cluster (`sol-ads`: 5 of 8 bursts inside the first 11%)
and payoff cluster (`fable-websites`: 3 in the final 20%).

**Recipe:** hold long takes. ~8 times per video, drop a ~7s / 5–6 shot burst — at the open, and at the payoff.

> ⛔ **Never** target a median shot length. 63% of his shots run under 4s but hold only 15% of the runtime;
> 10% run over 16s and hold 50%. Building to the median produces a metronomic edit resembling none of his work.

---

## M6 · The Uncut Glitch

**Where:** `fable-websites` @~549s, mid-payoff-montage: *"Sorry, this is just my Chrome DevTools MCP making
that pop up."*

**What:** A tool misfires on screen and he **leaves it in**, apologises in passing, and continues. There is no
cleanup pass anywhere in the corpus.

**Why it works:** it is load-bearing proof the demo is live. A montage this polished would read as pre-rendered
without it.

**Recipe:** keep one real, minor, self-acknowledged failure per demo. Do not stage it — but do not cut it.

---

## M7 · The Designed Insert

**Where:** `agent-workflow` @73.2s (numbered slide card), @249.9s (concept diagram); `sol-ads` (the PLATFORMS
card).

**What:** Purpose-built assets in a consistent **hand-drawn / sketch language on white ground**: sketch icons,
hand-arrows, a serif caption. E.g. WORKSPACE CONTEXT / KNOWLEDGE BASE / CREDENTIALS → FABLE 5 → WORK DONE,
captioned *"ONE TRIGGER. FULL CONTEXT. REAL OUTPUT."* Also numbered section cards (*"1. Shared AI & Human
Workspace"*), which get annotated live (M1).

**Why it matters:** this is where the production budget goes. The edit is bare; the *artifacts* are made. A
pack that copies only the restraint and skips the diagrams misses the style as badly as one that adds
captions.

---

## ⛔ ANTI-PATTERNS — what he never does (n=0 across 121 minutes)

| Anti-pattern | Evidence |
|---|---|
| **Burned captions** | zero in every sampled frame, all videos |
| **Music bed** | gaps are bass-poor and broadband; spectral test with a validated speech control |
| **Punch-ins / zooms / camera motion** | every cut is a source switch; camera locked |
| **Cutting on the pause** | median cut lands **1–3s** from the nearest pause, at 0.8–3.5× chance |
| **Cleaning up mistakes** | the DevTools glitch survives into the final cut |
| **Cold open / title card / music runway** | speech at 0.00s in all six |
| **Receipts for credential claims** | *"over $400,000 this month"* gets 16 unbroken seconds of face, no graphic |
| **A fixed PIP corner** | four different corners across five videos — per-video choice, held within a video |

**The compositor's trap:** absence is cheap to reproduce and easy to overdo. Each element added from this
table moves the output measurably *away* from the style — but so does stripping the M7 assets. The style is
**bare edit + made artifacts**, and both halves are load-bearing.
