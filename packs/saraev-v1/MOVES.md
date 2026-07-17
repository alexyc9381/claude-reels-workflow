# MOVES — saraev-v1

Named, reproducible moves lifted from the corpus. Every move cites at least one exact timestamp, and every
move here **survived the inset test** (see [`THE-MEASURED-SPINE.md`](THE-MEASURED-SPINE.md)) — i.e. it is a
thing the *editor* does, not a thing the *browser* does.

> ⛔ **Two moves in this file's first draft were browser behaviour, not edits.** They are listed at the
> bottom under RETRACTED rather than deleted, because the failure mode is the most useful thing in the pack.

> **This is the short list.** [`GUIDEBOOK.md` Chapter 12 — The Moves Library](GUIDEBOOK.md#chapter-12) is the
> fuller treatment (13 moves, independently derived): the Zero-Frame Cold Open, the Receipt Cut, the Hard Cut
> Always, **the Gap Cut** (dead-air excision — invisible to a full-frame detector), the Artifact Dwell, the
> Live Whiteboard Card, **the Tab Rack**, the One-Camera Rhythm, the Permanent Inset, the Frozen Frame, the
> Naked Audio, the Cliff Ending, and the Two-Shot Home Base. The two files were derived independently and
> agree — the Live Whiteboard Card (M2 here) was found by both.

---

## M1 · Circle-Then-Say ⭐

**Where:** `fable-tokens` @3.2–10.4s (the $1,400 claim). Recurs as live underlines in `agent-workflow` @73.2s
(under "AI" and "Human") and as labels appearing on a card in `fable-websites` ("Higgsfield", then "Pinterest").

**What:** The artifact is already on screen. He hand-draws a freehand ellipse around the figure with an
annotation tool, **finishing before he says the number**, holds it, then erases.

| beat | t | note |
|---|---|---|
| stroke begins | 3.2s | 2.2s **before** the word |
| ellipse complete | 4.7s | ~1.5s draw |
| **word spoken** | **5.4s** | 0.7s **after** the circle lands |
| erased | 10.4s | lifetime ≈7.1s |

Measured by cyan-stroke pixel count (baseline ~400px is UI chrome; the annotation adds ~200px).

**Why it works:** the eye is parked on the number *before* the claim arrives, so the claim reads as
confirmation rather than assertion.

**Recipe:** freehand stroke (not a shape primitive), 3–4px, high-chroma cyan on dark UI. Draw over ~1.5s with
slight wobble — it must look hand-drawn. Complete **0.7s before** the word. Hold ~5s. Erase instantly.

> ⛔ Never substitute a graphic, a highlight box, or a zoom. Freehand-on-live-screen **is** the move.

---

## M2 · The Live Whiteboard Card ⭐

**Where:** `fable-tokens` @626s (FigJam, document titled *"Nick Saraev Scratch Sheet"*, 135% zoom);
`fable-websites` @336s (excalidraw.com, handwriting font, 203% zoom, **tab bar visible**); `agent-workflow`
@73s, @249s (full-bleed slides with pagination dots).

**What:** His "title cards" and "concept diagrams" look post-produced. **In at least two videos they are
not** — they are a browser tab, a live whiteboard, captured inside the same screen recording, carrying the
same webcam inset in the same corner. He types and draws on them live.

> ⚠️ **Scope, corrected by the adversarial verifier.** The live-whiteboard mechanism is *proven* in
> `fable-websites` (excalidraw.com — tab bar, 203% zoom chip, live arrows) and `fable-tokens` (FigJam,
> *"Nick Saraev Scratch Sheet"*, 135% zoom). **`sol-ads` @202s and `agent-workflow` @799s show no chrome at
> all** — clean full-bleed plates, indistinguishable from a rendered slide (`agent-workflow`'s has pagination
> dots, suggesting a live presentation app, but that is inference). **Card medium is a format variable.**
> Do not build a compiler that assumes excalidraw.

**Why it matters:** this is the move most likely to be mis-copied. Building these as designed assets in After
Effects produces something that looks *more* polished and is *less* like him. The visible tab bar is not
sloppiness; it is the same commitment as the uncut glitch (M5) — everything on screen is a real thing on a
real machine.

**The grammar (near-deterministic): CARD → SCREEN, 91% (20/22).** A card is never a destination. It names the
claim; the screen immediately pays it off. A card that cuts to a face is a shape he made **twice in 121
minutes**.

**Recipe:** open excalidraw or FigJam in a real tab. Handwriting font. Zoom 135–203% so strokes read at 720p.
Keep the chrome. Annotate live (M1). Then cut to the screen that proves it.

---

## M3 · The No-Runway Open ⭐

**Where:** all six.

**What:** Speech begins at **0.00s**. No cold open, title card, music, or settling breath. Four of six open on
the literal word **"So"** — *"So given that…"*, *"So to test…"*, *"So as you know…"*, *"So the way…"* — as
though the conversation started before you arrived.

**Two valid first frames:**
- **His face, already gesturing** (`fable-websites` opens mid-hand-raise; `agent-workflow`; `solo-20k`)
- **The artifact, cold** (`sol-ads` → the candle ad; `kimi-k3` → the benchmark; `fable-tokens` → a bill
  reading **$2,409.88**) — 20s / 13s / 26s before the first face appears

**Recipe:** first audio sample = first phoneme of a sentence already in progress. First video frame = motion
or artifact, never a static card. When the subject is a number, **the number is the first frame** and the
claim arrives ~5s later (M1).

---

## M4 · Source-Switch, Never Scale ⭐

**Where:** `agent-workflow` — 17 raw / 26 true cuts across 1161s, all source switches.

**What:** A cut changes **what is shown** (face → card → screen → face). It **never** changes scale on the
same subject. Punch-ins, zooms, reframes: **n=0 across 121 minutes** (`agent-workflow` background correlation
between 950s and 1130s = **0.9975** — the camera has not moved). The camera is locked.

**Recipe:** to sustain a long talking-head, do not punch in. Cut to a different *thing*. If you have nothing
to cut to, **hold the take** — every video ends on a full-frame talking-head, and those final takes run 33s,
78s, **245s**, 63s, **220s**.

**Rate:** in talking-head, **1 edit cut per 25.5s** (spread 1.64× across 5 videos — a creator constant).

---

## M5 · The Uncut Glitch ⭐

**Where:** `fable-websites` @~549s: *"Sorry, this is just my Chrome DevTools MCP making that pop up."*

**What:** A tool misfires on screen and he **leaves it in**, apologises in passing, continues. There is no
cleanup pass anywhere in the corpus.

**Why it works:** it is load-bearing proof the demo is live — and it is only possible *because* that stretch
is one continuous screen recording with no edit in it at all.

**Recipe:** keep one real, minor, self-acknowledged failure per demo. Don't stage it. Don't cut it.

---

## M6 · Shut Up For The Artifact ⭐

**Where:** `fable-websites` @530.7s.

**What:** The longest silence in the video — **6.18s, the only gap ≥1.0s in the entire 636s** — lands
immediately after *"it'll actually change the audio vis preview"*, so the generated site can perform without
narration over it.

Set against a speech density of **83.9–90.1%** (in `kimi-k3` and `fable-tokens`, 25 minutes with not one
second of silence), this is extraordinary. He never stops talking — except here.

**Recipe:** the *only* sanctioned silence is the artifact performing. Cut the VO for 4–6s and let it run.

---

## ⛔ ANTI-PATTERNS — n=0 across 121 minutes

| Anti-pattern | Evidence |
|---|---|
| **Burned captions** | zero in 120 random contact frames + 252 hook frames |
| **Lower thirds** | zero — he doesn't even name the interview guest on screen |
| **Music bed** | `sol-ads` longest gap = **−54.3 dBFS** vs −19.8 speech; gaps are bass-poor and broadband |
| **Dissolves / wipes / fades** | **136/136** events in `solo-20k` are *exactly 1 frame wide* |
| **Punch-ins / zooms / camera motion** | background correlation 0.9975 across 3 minutes |
| **B-roll / stock / memes / reaction cutaways / chart inserts** | no third source exists — camera + screen only |
| **Intro animation / title card / logo sting** | speech at 0.00s in all six |
| **End card / subscribe screen** | final frame is his face (4/6) or 1–7 frames of flat black |
| **Cleaning up mistakes** | the DevTools glitch survives to air |
| **Receipts for credential claims** | *"over $400,000 this month"* gets 16 unbroken seconds of face, no graphic |
| **A fixed PIP corner** | four corners across five videos — per-video choice, held within a video |

**The compositor's trap:** absence is cheap to reproduce and easy to overdo. Every element added from this
table moves the output measurably *away* from the style.

---

## ⛔ RETRACTED MOVES — kept so the failure mode stays legible

### ~~The Burst~~ — REFUTED

Claimed: *≥3 consecutive sub-4s shots, ~7s long, 5–6 shots, clustered at 3.2–3.5× a Poisson null; shape a
creator constant (7.4 / 7.2 / 6.8s across three videos); placed at the open and the payoff.*

**Reality: all 8 "bursts" in `fable-websites` come from browser churn. Zero come from real edit cuts.** The
clustering is real — but it clusters *browsing*. The "burst" was him clicking through finished websites while
the camera rolled. The beautiful cross-video constant (7.4/7.2/6.8s) was measuring **how long he spends
looking at a web page**.

### ~~The Payoff Montage~~ — REFUTED

Claimed: *the largest burst in the corpus (`fable-websites` @536.6–555s, 18.5s, 14 shots at the 84% mark) —
rapid-cut the finished artifacts, ~2s each, narrated continuously.*

**Reality: not a montage.** One continuous screen recording of him scrolling through the sites. The "14 shots"
were page loads. The tell was in the data all along — the uncut DevTools glitch (M5) sits *inside* this
stretch, which is only possible if there is no edit there.

### Why they died

Both came from treating `YDIF > 20` as an *edit* signal. It is a **discontinuity** signal, and ~90% of the
discontinuities in this corpus are a browser, not an editor. Every number in both moves was accurately
measured. The interpretation was invented.

> **Before calling a signal an edit, ask what physically produced the pixels.**
