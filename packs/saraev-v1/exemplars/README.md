# Exemplars — saraev-v1

Frame evidence for the load-bearing claims, so a reader can **verify rather than trust**. Each is extracted
from `~/Downloads/winner-lab/corpus/<slug>/source.mp4` at the timestamps named below (the corpus mp4s are
gitignored — 337MB — but every frame here is reproducible with the ffmpeg command given).

---

### `01-no-runway-open.png` — frame 0 of all six

Reading order: `fable-websites`, `sol-ads`, `kimi-k3`, `fable-tokens`, `agent-workflow`, `solo-20k`.

Speech begins at **0.00s in all six** — no cold open, no title card, no music runway, no settling breath.
Three open full-frame on his face **already mid-gesture** (note the raised finger, top-left). Three open
**cold on the artifact**: the finished candle ad, the benchmark chart, and a billing page reading
**$2,409.88**. Nobody has said anything yet and the receipt is already on screen.

```bash
for s in fable-websites sol-ads kimi-k3 fable-tokens agent-workflow solo-20k; do
  ffmpeg -ss 0 -i saraev-$s/source.mp4 -frames:v 1 $s-f0.png; done
```

---

### `02-circle-then-say.png` — the annotation leads the voice

`fable-tokens` @ 2.5 / 3.6 / 4.7 / 5.4 / 8.0 / 11.0s.

The bill is on screen from frame 0. The cyan ellipse **begins at 3.2s**, **completes at 4.7s** — and he only
says *"I spent over $1,400"* at **5.4s**, 0.7s later. Erased by 10.4s. The eye is parked on the number before
the claim arrives, so the claim reads as confirmation rather than assertion.

This is the one place in the style where picture is tightly synced to voice, and it **leads**.

---

### `03-400k-claim-no-receipt.png` — the biggest number in the corpus has no receipt

`agent-workflow` @ 24 / 27 / 29 / 34s.

*"My business is gonna do over **$400,000** this month"* (@27.44s), delivered straight to camera across
**16 unbroken seconds** with no cutaway, no graphic, no dashboard.

He is sold as the receipts guy. **Coverage is 93% or 0%, decided by who produced the figure**: a number the
on-screen artifact made this session is already visible when he says it; a number about *him* gets nothing.
Never encode "stage a receipt for every numeric claim."

---

### `04-live-whiteboard-cards.png` ⭐ — the retraction, in one image

Top: `fable-websites` @336s. Bottom: `fable-tokens` @626s.

His "designed title cards" and "concept diagrams" are **live browser tabs**:

- **Top** — the URL bar reads **`excalidraw.com`**. ~15 tabs across the top, the excalidraw toolbar, the zoom
  control, the "Excalidraw+ / Share" buttons. The copy (*"Then just let it iterate + test."*) is in
  excalidraw's handwriting font. Face PIP bottom-right.
- **Bottom** — **FigJam**, the document titled **"Nick Saraev Scratch Sheet"** in the top-left. FigJam's
  toolbar down the left edge, zoom control and Share button. Face PIP bottom-**left**.

Every pixel of chrome is visible. Nothing here was made in an editor — he types and draws on them live, and
**CARD → SCREEN follows 91% of the time (20/22)**: a card names the claim, the screen pays it off.

> This image is why an earlier draft of the pack was wrong. It claimed these were purpose-built assets and
> concluded *"the production value is in the artifacts, not the edit."* Both are false. Build these in After
> Effects and you get something more polished and **less** like him. The visible tab bar is not sloppiness —
> it is the same commitment as the uncut DevTools glitch: everything on screen is a real thing on a real
> machine.
