# Verification — saraev-v1

An adversarial pass over the 12 chapters, tasked with **falsifying** them: hunting uncited claims, re-deriving numeric claims from the raw artifacts, and catching single-video generalisation and cross-chapter contradictions. Its verdict is reproduced verbatim.

---

I re-derived numbers from the raw artifacts rather than reading the prose. Verdict below.

---

# ADVERSARIAL VERIFICATION — VERDICT

## 0. Headline

This book is **unusually well-evidenced**. I re-derived 20 numeric claim clusters and the great majority reproduced *exactly* — several to six decimal places. Chapters 10, 3, 6 and 9 are the strongest; I could not break them. The real damage is concentrated in **four places**: (1) an unreproducible cut count that Ch.4 and Ch.11 both build on and Ch.11 falsely claims matches the brief; (2) an irreconcilable TH→TH jump-cut count between Ch.4 (n=10) and Ch.6 (n=3); (3) Ch.1 laundering one video's browser-tab card into a corpus-wide "the graphics package is a browser tab"; (4) two wrong reproduction specs in Ch.8 that a compiler would build against.

---

## 1. SPOT-CHECK RESULTS (20 re-derivations)

| # | Claim checked | Chapter | Result |
|---|---|---|---|
| 1 | Integrated loudness −15.7/−16.3/−16.5/−15.8/−15.8/−15.9, LRA 6.1/7.0/6.4/5.5/5.6/5.7 | 1, 10, 11 | **HELD — exact, all 12 values** |
| 2 | YDIF>20 / collapse≤3 event counts | 12 | **HELD — 90/107/136/26/20/17, exact** |
| 3 | Raw event counts "94 / 113 / 136 / 30 / 20 / 17" | **4, 11** | **FAILED — not reproducible at collapse=1,2,3,4 or 5, nor from `cut_times.txt` (66/75/136/19/20/16)** |
| 4 | wps 3.93/3.94/3.37/3.41/3.71/3.83; speech density 87.2/85.1/83.9/90.1/89.0/86.3%; max gap 6.18/2.14/2.86/0.98/0.94/1.64; gaps>1s 1/8/78/0/0/3; silent% 12.7/14.9/16.1/9.9/11.0/13.7 | 1, 10, 11 | **HELD — every value exact** |
| 5 | Audio onsets 0.066 / 0.066 / 0.069 / 0.098 / 0.126 / 0.141s | 3 | **HELD — exact, 6/6** |
| 6 | Limiter table: file peak, 10s-window p50/p90/max, n windows, %>−2 dBFS | 10 | **HELD — all 36 cells exact (−0.97/−0.95/−0.96/−0.95/−0.94/−0.95; n=63/121/59/90/116/276)** |
| 7 | Dual-mono L/R RMS −18.974100 vs −18.973992 | 10 | **HELD — reproduced to 6 decimals** |
| 8 | silencedetect −32dB longest silences 0.77/0.82/1.47/1.97/2.41/4.44 | 12 | **HELD — exact** |
| 9 | `sol-ads` carousel intervals 1.50 1.50 1.50 1.47 3.00 3.00 1.50 1.50 1.53 | 3 | **HELD — exact** |
| 10 | YDIF neighbourhoods: `agw@48.70` peak 118.9 (pre 0.73/0.92/0.03, post 0.01/0.26/0.24); `ft@53.37` 147.2; `kimi@76.63` 11.3; `kimi@542.97` 17.6; `agw@1129.5` `[0.3,0.5,0.3,0.3,22.6,6.0,4.3,0.1,4.7]` | 3, 6 | **HELD — every value exact, including the full 9-frame array** |
| 11 | Retention lexicon: 6 hits / 26,401 words, 18 of 22 phrases at 0 | 11 | **HELD — exact** |
| 12 | CTA onsets 1042 / 1157 / 863 / 615 / none | 11 | **HELD — exact** |
| 13 | Card onsets vs sentence-start (n=15, median +0.05s) | 7 | **14/15 HELD exact. 1 FAILED — see §3** |
| 14 | Sentence-boundary inversion: solo aligned ≫ chance, interview = chance | 4 | **HELD directionally (interview 0.8x reproduced exactly). Baselines understated — see §3** |
| 15 | Ch.1 cuts-in-gap 19/136, 22/90, 27/107 | 1 | **HELD ±1 (I get 20/21/26)** |
| 16 | Ch.9's 22 claim quotes ("$400,000 this month", "$20,354. Exactly.", "over 10,000 people", "1.3x the output tokens… nine turns", the dwell sentence) | 9 | **HELD — verbatim** |
| 17 | `fable-websites` "five" = 1.20–1.80s, cut at 1.667s inside it | 12 | **HELD** |
| 18 | Visual: `ft@5` ($2,409.88 spent / Resets Aug 1 / cyan ellipse / 8-swatch toolbar / BL landscape PIP); `fw@409` (excalidraw.com, 203% chip, arrows to Higgsfield MCP + Pinterest, ~14 tabs, Ask Gemini); `aw@799` ("3. Evals" at x460–705 y322–378, cursor ~(475,530)); `sa@202` | 3, 7, 8, 9, 12 | **HELD — I read all four frames** |
| 19 | Rig-A backdrop TL `[65,53,70]` TR `[54,68,82]`; plate x25..1254 y15..706; bitrates 181–397 kb/s; contact 540x304; 7,266 frames | 5, 8 | **HELD — except "byte-identical", see §3** |
| 20 | Rig-B plate `1248 x 667` at (16,16), y 16..682 | **8** | **FAILED — measured white plate y 17..701 (h≈685). Ch.12 independently says y 17–701. Ch.8's spec is ~19px short** |

---

## 2. PER-CHAPTER STATUS

| Chapter | Status |
|---|---|
| **Ch.1 — Editorial Thesis** | **NEEDS-HEDGING** — every number holds; two rhetorical over-reaches |
| **Ch.3 — The Hook** | **SOLID** — the best-verified chapter in the book |
| **Ch.4 — Cut Grammar** | **NEEDS-HEDGING** — central finding survives, but its cut list is unreproducible and it contradicts Ch.6 |
| **Ch.5 — Framing** | **SOLID (unverified core)** — everything I could check held; the eyeline itself I could not independently re-derive |
| **Ch.6 — Camera Motion** | **SOLID** — the validated-instrument approach plus the disclosed bug is exemplary |
| **Ch.7 — Captions** | **SOLID** — one row to fix, one label to fix |
| **Ch.8 — Screen Recordings** | **NEEDS-HEDGING** — two reproduction specs are wrong |
| **Ch.9 — Receipts** | **SOLID** — every quote verbatim; the conditional 93%/0% split is the book's best analytic move |
| **Ch.10 — Sound & Mix** | **SOLID** — reproduced to six decimals; the two self-caught errors are disclosed correctly |
| **Ch.11 — Retention** | **NEEDS-HEDGING** — one false reproduction claim, one contradiction with Ch.7 |
| **Ch.12 — Moves Library** | **NEEDS-HEDGING** — sound, but transcription sloppiness and a silence number that fights the rest of the book |

---

## 3. CLAIMS TO STRIKE OR HEDGE (exact text)

### ⛔ STRIKE — Ch.11, §11.1
> "My event counts reproduce the brief's exactly (94 / 113 / 136 / 30 / 20 / 17), so the bins below sit on the calibrated detector."

**This is false and it is the load-bearing sentence of the chapter's method.** The brief's counts are **90 / 107 / 136 / 26 / 20 / 17**. I get exactly those with the house calibration. I could not produce 94/113/30 at *any* collapse window from 1 to 5 frames, nor from `cut_times.txt`. The chapter claims verification it did not perform, and does so *while restating the wrong numbers*. Ch.4 uses the same 94/113/30. Either the two chapters share an undisclosed detector variant — in which case it must be specified — or the counts are wrong. **Ch.11's pacing bins, its "410 events", and its CV table all sit on this.** Ch.4's §4.1 table is honest (it labels the numbers "raw YDIF events" without claiming a match), so Ch.4 needs a method note; Ch.11 needs the sentence struck.

### ⛔ STRIKE / RECONCILE — Ch.4 vs Ch.6, TH→TH jump cuts
- Ch.4 §4.3: "**TH → TH | 10 | 14.5% | jump cut**", §4.2: "Every one of the **10 TH→TH jump cuts** in the corpus…", §4.8: "**0/10 TH→TH cuts reframed**"
- Ch.6 §6.2: "**The three real TH→TH jump cuts** … These are rare — nearly every face-on cut is a segment boundary." (table lists exactly 3, all six videos)

Both used a face-crop detector. **10 ≠ 3.** Compounding it: Ch.4 credits `agent-workflow` with **27 edit cuts against 17 raw YDIF events** — i.e. ten face-crop-only cuts — while Ch.6, running the same class of detector over 100% of face-on time in the same video, finds **one** (`@1129.5s`). One of these is wrong. This is not cosmetic: Ch.4's §4.4 class table ("COMPRESSION 69.6%"), its 66.7/33.3 motivation split, and its 207-event census all depend on the 27.

### ⛔ STRIKE — Ch.4, §4.2
> "the 7 wider events are not dissolves — I pulled 13-frame bursts around all three ≥5-frame cases and every one is a single-frame hard cut with camera or on-screen motion inflating the shoulder (… `agent-workflow @ 1107.53s` TH→TH …)"

`agent-workflow @1107.53` reads `[0.2, 0.3, 0.4, 0.5, **14.5**, 7.5, 9.0, 13.2, 7.6]`. **Peak 14.5 — below the house threshold of 20.** It is not an event under the book's own calibration, and a 14.5 peak against a 13.2 neighbour is not a "single-frame hard cut" signature; it is sustained motion. Calling it a verified hard cut is unsupported. Strike the example.

### ⚠️ HEDGE — Ch.4, §4.4 baselines
Ch.4's random baselines are **systematically ~4pp low** against my independent 4,000-draw computation over the speech span:

| video | Ch.4 baseline | mine | Ch.4 lift | corrected lift |
|---|---|---|---|---|
| `fable-tokens` | 8.3% | **11.3%** | 10.5x | ~7x |
| `agent-workflow` | 11.4% | **13.8%** | 6.2x | ~5x |
| `sol-ads` | 15.3% | **20.8%** | 3.9x | ~2.9x |
| `kimi-k3` | 9.4% | **12.2%** | 5.8x | ~4.5x |
| `fable-websites` | 10.8% | **15.6%** | 3.7x | ~2.5x |

**The finding survives — every solo video is still well above chance, and I reproduced the interview inversion to the decimal (my 14.7% vs 18.4% baseline = 0.8x; Ch.4's 11.0% vs 14.0% = 0.8x).** But "**5.7x**" should be hedged to "~4x, baseline method-sensitive". `fable-websites` at 2.5x is thin.

Also: §4.4's per-video rows sum to **71** while the pooled row is labelled **n=69**, and the TH→TH row is admittedly computed on n=11 with an n=10 label. Clean up.

### ⛔ STRIKE — Ch.8, §8.2 "byte-identical"
> "The rig-A backdrop corner pixels are **byte-identical across three different videos** (`sol_202.png`, `fw_336.png`, `ft_626.png` all read `[65,53,70]` at (2,2)…)"

`sol-ads @202` reads `[65,53,70]` exactly. **`fable-tokens @5` reads `[63,52,69]`.** Same video, different frame, not byte-identical — AV1 quantisation moves it. Ch.8's own rig-B row concedes ranges (`[26-28,110,91]`). "Byte-identical" is a claim about a lossy codec that cannot survive frame choice. Hedge to "within ±2 levels across three videos — a saved preset". The *conclusion* (saved preset) is fine; the word is not.

### ⛔ FIX — Ch.8, §8.2 / §8.8 rig-B plate geometry
> "Rig B … Plate extent x 16..1263, y 16..682 | Plate size **1248 x 667**"
> recipe: "rig B: plate 1248x667 @ (16,16)"

Measured on `agent-workflow @799`: white plate spans **y 17..701, h ≈ 685**. Ch.12 §12.6 independently reports "**y 17–701**" for the same frame. **Ch.8's spec is ~19px short and it ships as an ffmpeg recipe.** A compiler building to it gets a visibly wrong plate. Fix to ~1248 x 686 at (16,16), and note that Ch.12 and Ch.8 disagree.

### ⚠️ HEDGE — Ch.1, §1.6 "It is not designed"
> "**The graphics package is a browser tab.** An editor who reproduces the look in After Effects has reproduced the wrong object."

I read `fable-websites @409` (excalidraw.com, 203% chip, tab bar, live arrows — **fully confirmed**), and also `sol-ads @202` and `agent-workflow @799`. **Neither of the latter two shows any browser chrome, tab bar, toolbar, zoom chip or annotation** — they are clean full-bleed white plates with one line of Helvetica-class bold, indistinguishable from a rendered slide. Ch.7 gets this right ("Card medium | **format variable** | Figma slide / FigJam / excalidraw") and Ch.12 gets it right ("`agent-workflow` runs the same move as a **clean full-bleed slide**"). **Ch.1 generalises 1 of 3 carded videos to "the graphics package" and puts it in the thesis chapter as "the single most load-bearing fact about this style."** That is exactly the single-video generalisation the brief warns against. Hedge to: *the card is live in `fable-websites`; the mechanism is a browser tab in at least one video, and indistinguishable from a slide in the others.*

### ⚠️ HEDGE — Ch.1, §1.2 and §1.5 conflating instruments
Ch.1's "chance rate (= silence % of runtime)" reads 15.7 / 12.3 / 14.5% where I measure **16.1 / 12.7 / 14.9%** from the same `words.json`. A consistent −0.4pp offset (probably head/tail exclusion) — harmless, but the solo-20k comparison is stated as "**at exactly chance (14.0% vs 15.7%)**", and with the corrected baseline it's 14.7% vs 16.1%. Same conclusion, drop "exactly".

### ⚠️ HEDGE — Ch.7, §7.5 card #5 (the one bad row in a great table)
> "| 5. Prompt in English | 440.90 | **440.84 "The next is…"** | **−0.06** |"

**There is no sentence boundary at 440.84.** The transcript reads `…'99'(439.94) '%'(440.2) 'of'(440.6) 'that'(440.74) 'the'(440.84) 'next'(441.02) 'is'(441.14) 'pretty'(441.32) 'simple.'(441.46)` — the word at 440.84 is "the", and the preceding word carries no terminal punctuation. Under the same `[.!?]` rule that generated the other 14 rows, the nearest sentence start is **441.78 ("And most of you will…"), offset −0.88s**. The row was scored by a looser (semantic) rule than the rest, undisclosed. **14/15 reproduce exactly — that is still an excellent result** — but the reported "range −0.26…+0.14, σ 0.12s" must widen or the row must be marked as excluded (Whisper dropped the period).

### ⚠️ RELABEL — Ch.7, §7.4 "cap-height"
Measuring `sol-ads @202` ("Let the model prompt itself."): the "L" cap runs y≈322→378 = **~56px**, not 67. The ink bounding box *including the descender of "p"* runs ~322→390 = **~68px** — which is where their 67px comes from. So the quantity is **ink-bbox height, not cap-height**. This matters because the recipe ships `fontSize: "9.3vh"` with the comment `/* cap-height ≈ 9.3% of frame H */` — a compiler setting `font-size` to 9.3vh gets glyphs meaningfully larger than his. Relabel, and restate the CSS in terms of the measured bbox.

### ⚠️ RECONCILE — "the longest silence in the corpus" (Ch.1/10/11 vs Ch.12)
- Ch.1 §1.1/§1.2, Ch.10 §10.6, Ch.11 §11.6: **6.18s @530.72s**, and "the only gap ≥1.0s in the whole file"
- Ch.12 §12.5: "**`fable-websites @ 531.05s`, duration 4.44s** — **the longest silence in the corpus**"
- Ch.12 anti-pattern table: "Longest silence: 0.77 / 0.82 / 1.47 / 1.97 / 2.41s" vs Ch.10's "max gap 0.94 / 0.98 / 1.64 / 2.86 / 2.14s"

**Both are correct within their own instrument** — I reproduced *both* sets exactly (word-gap vs `silencedetect -32dB`). But the book never says so, and two chapters assert a different "longest silence in the corpus" for the same event. Ch.12 also narrates the 6.2s version ("resumes… and cuts back at ~537s" — 530.72+6.18 = 536.90) while printing 4.44s. Add one footnote reconciling the instruments, and pick one number for the named event.

### ⚠️ NOTE — "Boyo boyo boy" is an ASR artifact, quoted as verbatim
Ch.1 §1.5, Ch.3 (first-word table), Ch.11 §11.4 and Ch.12 §12.1 all quote `kimi-k3`'s opening as the literal word "**Boyo**". The corpus's own `saraev-kimi-k3/vo_metrics.json` flags it:
```json
"head_check": "MISMATCH - RETIME BEFORE DECOMPOSITION",
"head_isolated": ["Boy,","oh","boy,","oh"],
"head_full": ["Boyo","boyo","boy","has"]
```
The real line is "**Boy, oh boy, oh boy** has a lot changed…". No conclusion changes (t=0.000 still holds), but a book that prides itself on citation should not quote a transcription error as speech — especially when the artifact directory flags it.

### ⚠️ NOTE — Ch.11's 6 lexicon hits are all substring false positives
I checked them: `subscribe` = "**unsubscribe**, stop" (a guest anecdote); all three `hit the` = idioms ("you **hit the** big bench press", "**hit the** thing"); `coming up` / `make sure to` likewise incidental. Ch.11 tabulates them as hits without noting this. **The finding is stronger than reported** — the true count is effectively 0/26,401. Worth one line, because a reader re-deriving will find them and wonder.

### ⚠️ NOTE — Ch.7 vs Ch.11 on `kimi-k3`'s CTA
- Ch.7 §7.3: "`kimi-k3` and `solo-20k` contain **zero CTA words at all**"
- Ch.11 §11.6: "The **only mid-roll mention** in the corpus is `kimi-k3 @109.5s` (18.5%), which then has no end CTA at all."

My scan of `kimi-k3` returns **zero** hits on community/subscribe/description/below/link. What's at ~109.5s is "*a lot of people in **maker school**, a lot of people in the companies that I consult with…*" — a product mention inside an argument, not a CTA. Both chapters are defensible under different definitions, but as printed they contradict. Define "CTA" once.

---

## 4. THINGS THE ARTIFACTS CANNOT SHOW (confident claims about intent/tooling)

Mostly well-policed — Ch.5's `NOT MEASURABLE` rows and Ch.10's refusal to invent ratio/attack are model behaviour. Remaining offenders:

- **Ch.8, §8.3:** "which is where you put it if you know what you're doing" (Ch.10's HPF) and Ch.8's *"He does not solve that with the edit. He solves it in the apps"* — the second is measured (two font scales in one frame ✓), the framing as a deliberate solution is intent. Minor.
- **Ch.8, §8.8:** "Recording tool class: **Single Screen-Studio-style composite** | **CONSTANT**". The composite is measured; the *tool* is not. "Screen-Studio-style" is doing work in a spec table where every other row is a measurement. Mark it inferred.
- **Ch.5, §5.3:** "**He also re-mounts the camera by eye** and gets within 1%." The 0.93 correlation is measured; "by eye" is invented. And "**Nobody checked**" (§5.5, `kimi-k3`'s mis-centred crop) — the geometry is measured, the inattention is a story.
- **Ch.9, §9.4:** "A cut that lands on a number is an admission the number needed defending." Rhetoric, fine — but it sits inside "**The claim-receipt gate, stated for the compiler**" as if derived. Also §9.6 already hedges the annotation-lifetime rule to n=1, correctly; keep that hedge, it's the right instinct.
- **Ch.1, §1.1:** "**The only thing this editor will ever shut up for is the artifact working**" — n=1 (one dwell, one video). Ch.12 §12.5 correctly labels it "**n=1 in strength**". Ch.1 does not. Align them.

---

## 5. GLOBAL-vs-CONDITIONAL AUDIT

The brief's central discipline is **well honoured**. Ch.9's 93%/0%/0% split with "pooled 59% — **do not use**" is the best instance of it in the book. Ch.4's refusal to pool 36.2% and 82.4%, Ch.11's "peak position: 3%, 7%, 51%, 80%, 81%, 85% — **do not author**", and Ch.10's separation of solo/conversational loudness are all correct.

Two residual unconditioned numbers:

1. **Ch.4, §4.6:** "**TH shot median length | CREATOR CONSTANT | 22.7s pooled, 1.51x spread (n=36, 5 videos)**" — this is fine, but it rests on the same disputed edit-cut list as §3 above. If `agent-workflow`'s 27 collapses toward Ch.6's count, the n=36 TH shots and the 22.7s median move. **Flag as contingent on resolving Ch.4/Ch.6.**
2. **Ch.5, §5.2:** eyeline "**41.6% ±2.8**" pooled across 5 videos is presented as *the* number while `kimi-k3` sits at 42.9 and `fable-websites` at 39.5 — a 1.09x spread that genuinely justifies the constant label. **No objection; this one is earned** (and the 70cm-on-a-borrowed-webcam cross-check is a genuinely strong falsification test). I flag only that I could not independently re-derive the YuNet landmarks, so §5.2 is the largest *unverified* claim in the book.

---

## 6. WHAT IS GENUINELY GOOD (not manufactured praise)

- **Ch.10 §10.3** is the single best-evidenced section here. All 36 cells of the limiter table reproduced exactly; the dual-mono figure reproduced to **six decimal places**. The −1.0 dBFS ceiling inference is airtight.
- **Ch.10 §10.1's** disclosure of the circular noise-floor measurement, and **Ch.6 §6.1's** disclosure of the shipped-and-caught scale-estimator bug ("*it was luck, not rigour, that the first answer happened to be right*"), are the two most credibility-generating paragraphs in the book. Keep both verbatim.
- **Ch.6's** injected-scale validation table is the correct way to earn an n=0. The `agw@1129.5` YDIF array reproduced value-for-value.
- **Ch.3** reproduced on every check I threw at it: onsets, carousel intervals, YDIF neighbourhoods, opening words. `sol-ads`'s 5 "cuts" being an `animation-duration` is real and is the book's best single insight.
- **Ch.9's** 22 quoted claims are verbatim, and the "**he receipts what the machine did, he never receipts what he earned**" conditional is the finding most worth the price of the book.
- **Ch.7's** positive-control caption detector (65x separation) is the right instrument design, and 14/15 of its card-onset table is exact.
