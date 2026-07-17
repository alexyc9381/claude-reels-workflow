# Verification — saraev-shorts-v1

An adversarial pass over the chapters, tasked with **falsifying** them: re-deriving numbers from the raw artifacts, hunting the batch confound, the era confound, and any repeat of the browser trap. Verdict reproduced verbatim.

---

## ADVERSARIAL VERIFICATION — SHORT-FORM PACK

**Headline: this pack is unusually well-evidenced.** I re-derived 20 numeric claims from the raw artifacts. **16 held exactly, 2 held under a definition the chapter didn't state, 2 failed.** Nobody forgot the batch confound; nobody forgot the era confound; nobody repeated the browser trap. Chapters 3, 5 and 7 are the strongest measurement work in either pack. The real damage is concentrated in **one Ch6 section, one Ch1 recipe, and an undisclosed one-tailed test in Ch7.**

---

### PER-CHAPTER STATUS

| ch | status |
|---|---|
| 1 — What Is On Screen | **NEEDS-HEDGING** (one unsupported recipe, contradicted by frames + by Ch4) |
| 2 — Captions | **SOLID** |
| 3 — Cut Grammar | **SOLID** (two undocumented method details) |
| 4 — Framing & Camera | **SOLID** (contradicts Ch3, unreconciled) |
| 5 — The Hook | **SOLID** — every claim I checked reproduced |
| 6 — Sound & Mix | **NEEDS-HEDGING** (silence census unreproducible; music proof (a) is a file-tail artifact) |
| 7 — Transfer Table | **SOLID** — best chapter in the pack; one disclosure fix |

---

### SPOT-CHECKS (20 re-derived)

| # | claim | chapter | result |
|---|---|---|---|
| 1 | n=221 events, median **3.478** s/cut, range 1.31–16.98 | Ch3 | ✅ **exact** |
| 2 | corpus **13.15–58.77s, mean 36.58s** (brief's "21–59s, mean 37" wrong) | Ch7#4 | ✅ **exact** |
| 3 | `ydif_raw.txt` is native-fps; MTV=24, aIfl=60, On_DV=29.97 | Ch3/5/6/7 | ✅ held |
| 4 | long-form wps min is **3.37**, not the brief's 3.41 | Ch7#3 | ✅ **exact** (3.83/3.71/3.93/3.41/3.94/3.37) |
| 5 | LF LUFS −15.7…−16.5, mean **−16.00**, sd **0.32** | Ch6/7 | ✅ exact |
| 6 | stragglers mean **−15.93**, Δ **0.067 LU** | Ch6/7 | ✅ exact |
| 7 | shorts wps median **4.18**, **17/19** exceed 3.94 | Ch7 | ✅ exact |
| 8 | wps era-matched diff **+0.595** | Ch7 | ✅ exact |
| 9 | wps exact p = **0.0119** | Ch7 | ⚠️ **one-tailed, undisclosed** (two-tailed = 0.0238) |
| 10 | robustness: drop MTV → p=0.0357 | Ch7 | ⚠️ **one-tailed; two-tailed = 0.0714 — fails 0.05** |
| 11 | PCM onset **0.03–0.13s, median 0.05**, 19/19 | Ch5 | ✅ **exact** |
| 12 | 694 contact frames; LF = **7,266** | Ch1 | ✅ exact (1161+901+636+592+1212+2764) |
| 13 | gap enrichment obs **51/39/28/18**, lifts 2.5–3.3x, p<2e-4 | Ch3 | ✅ **numerators exact**, lifts 2.53/2.54/3.16/3.25, p=0.0005 @2k perms |
| 14 | transition widths 127 / 43 / 51, max **63** | Ch4 | ✅ exact (event-**span** method) |
| 15 | transition widths 142 / 67 / 12, max **32** | Ch3 | ✅ exact (**run-at-event-start** method) — **but ≠ #14** |
| 16 | density 79.6–98.0, median **89.0**; stragglers 90.6/84.7/90.1 | Ch7 | ✅ exact from `words.json` |
| 17 | total silence ≥0.15s = **1.83s**, **15/19** have none | Ch6 | ❌ **I get 7.17s and 10/19** |
| 18 | longest silence 0.68s @ N-CYWceoXUI | Ch6 | ✅ (I get 0.70s, same event) |
| 19 | floor: shorts median −45.5 vs LF −105…−212 | Ch6 | ✅ **separation total** (shorts −31.2…−92.9, med −43.7; LF −113.9…−240; zero overlap) |
| 20 | head ≈**75–80% of frame height, zero headroom, hair clipped** | Ch1 | ❌ **contradicted by the frames** |

Caption/transcript matches visually confirmed at full res: `4TY92yLmhN4/contact/f001.png` = "I RUN **TWO BUSINESSES**" (yellow keyword); `bz7EnmzYEAM/contact/f001.png` = "EVERY **BUSINESS** I"; `FRh_8qv8850/hook_burst/h035.png` = "THIS IS MORE OF / **MANEGERIAL THING**". Ch5's opener quotes all reproduce from `words.json`, including the mid-sentence splices (`FRh_8qv8850` = `['clearly','define','daily','accountability.']`; `N-CYWceoXUI` = `['The','other','business']`; `OWxvKcNahJE` ungrammatical). LF "So" = **4/6**, shorts **1/19** ✅.

---

### STRIKE / HEDGE — exact claims

**① Ch6 — STRIKE music proof (a).** Quote: *"**Two videos reach true digital silence.** N-CYWceoXUI @ 53.4s = **-inf dBFS** (absolute zero…); 6Q1KopZ4WTk @ 38.3s = -96.4 dBFS. **No bed can coexist with a -inf sample window.**"*
`N-CYWceoXUI` is **54.00s** long and `6Q1KopZ4WTk` is **38.33s** long. Both "digital silence" windows are the **last few hundred milliseconds of the file** — the trailing zeros of the encode (Ch2/Ch4 independently note N-CYWceoXUI *fades out* at the end). A music bed would also stop there. This is an end-of-file artifact, not evidence. **Ch6's own §(c) rule — "ask what physically produced the samples" — was not applied to its own headline proof.** Verdict survives on (b) side-channel collapse and (c) non-tonal static spectrum, which are sound. Strike (a).

**② Ch6 — HEDGE the silence census.** Quote: *"**total silence < -40 dBFS, ≥0.15s, across all 19 (11.6 min) — 1.83 s** … videos with **zero** such silence — **15 / 19**."* 10ms-RMS at −40 dBFS over `audio_16k.wav` gives **7.17s and 10/19**. The *longest* (0.70s @ N-CYWceoXUI) reproduces, so the instrument agrees on extremes but not on the census. The qualitative finding (he trims to the edge) is safe; the two specific figures are not reproducible without the exact `silencedetect` invocation. Re-derive or hedge.

**③ Ch1 — STRIKE the framing spec.** Quote: *"head ≈**75-80% of frame height**, zero headroom, hair clipped at top edge, eyes ≈40-50% down the frame"* (§1.5 and the §1.8 recipe). Measured on `nsshort-4TY92yLmhN4/contact/f001.png` and `nsshort-bz7EnmzYEAM/contact/f001.png`: hairline ≈ y 60–85/960, chin ≈ y 600/960 → **head ≈ 54–56% of frame height**, with visible headroom, hair **not** clipped, ears **well inside** the side edges (≈85 and ≈455 of 540 px width). **Ch4 explicitly rules this parameter UNRESOLVED** ("Reporting a number here would be inventing one"). Ch1 reports it anyway, uncited — no timestamp, no measurement, only a "smell" argument. This is the pack's one genuine **uncited claim**, and it is the load-bearing line of Ch1's reproduction recipe. Ch1's §1.4 crop inference rests on the same unmeasured geometry and should be hedged with it.

**④ Ch7 — DISCLOSE one-tailed.** Quote: *"the smallest achievable p is **1/84 = 0.0119** — perfect separation"* and *"drop `MTVpRn8nCP4` → **p=0.0357**"*. Both are **one-tailed**. Two-tailed: **0.0238** and **0.0714**. The direction was pre-specified by the brief, so one-tailed is defensible — but it must be labeled, and **the robustness check does not clear p<0.05 two-tailed.** Rewrite as: *"p=0.0119 one-tailed (0.0238 two-tailed); dropping the podcast repost leaves n=2 and p=0.0357 one-tailed / 0.0714 two-tailed — directionally intact, no longer significant."* Ch7's LUFS null (0.4405 one-tailed = 0.881 two-tailed) is unaffected.

**⑤ Ch3 — two undocumented method details.** (a) *"**49 of 221** raw events sit within 0.5s of a neighbour"* → I count **50**; their own merged total (171 = 221−50) proves 50 is the number they used. Off-by-one in the prose. (b) *"merged ≤0.5s → **171**, median **4.33 s/event**"* reproduces **only** if you drop each event within 0.5s of its **raw predecessor**. The natural chained rule (0.5s from the last *kept* event) gives **180 / median 3.87** — and Ch3 is elsewhere emphatic that "gap from last kept" vs "runs" is exactly the kind of distinction that over-counts. State the merge rule. (c) Ch3's gap-test denominators (212 / 203 / 159) don't reproduce — I get **220** at every threshold. Numerators are exact, so the verdict is untouched; the percentages are ~4% off.

---

### CROSS-CHAPTER CONTRADICTIONS

**⚠️ #1 — Transition widths. Ch3 and Ch4 report the same nominal quantity on the same n=221 and disagree, and Ch7 silently picks one.**

| | 1-frame | multi-frame | max |
|---|---|---|---|
| **Ch3** | 142 (**64.3%**) | **35.7%** | **32 frames** |
| **Ch4** | 127 (**57.5%**) | **42.5%** | **63 frames (2.1s)** |

**Both reproduce exactly — they measure different things.** Ch3 takes the contiguous run at each event's start frame; Ch4 takes the full span of the merged event *including* the ≤3-frame sub-gaps. Ch4's is arguably the better instrument for "how long is the transition," but Ch4's *"max 63 frames (2.1s)"* is an artifact of counting sub-threshold frames inside the span, so it overstates the longest transition. Ch7's transfer table quotes **"57.5% hard cut / 42.5% flash"** and the DISCARD row *"42.5% of short-form transitions are multi-frame flashes"* without acknowledging Ch3's 35.7%. **One reconciliation paragraph is needed; the true multi-frame share is 36–42% depending on definition, and neither chapter should quote a bare percentage without naming the rule.**

**⚠️ #2 — Ch1 vs Ch4 on framing.** Ch1 ships a head-size number; Ch4 measures the same thing, fails validation, and declares it UNRESOLVED. Ch7's table correctly carries Ch4's UNRESOLVED — so **Ch7 already contradicts Ch1's §1.8 recipe**. Delete the number from Ch1.

**⚠️ #3 — Ch6 vs Ch7 on speech density.** Ch6 restates the brief's *"81-99% (median 90%)"*; Ch7 re-derives **79.6–98.0%, median 89.0%** from `words.json` (I reproduce Ch7 exactly). Ch6 restated an unverified number where a verified one existed. Trivial, but it's the one place a chapter took the brief's word.

---

### CONFOUND AUDIT

- **Batch confound (16-of-19 = one session): nobody forgot it.** All seven chapters carry it, most as a governing caveat rather than a footnote. **Ch1 goes further and partially refutes it** — ≥4 wardrobe/set changes inside the burst, corroborated by clustering, plus the clean fps partition (all 16 batch videos exactly 30fps; all 3 stragglers 24/29.97/60). That raises the effective n to ~7 and is a real contribution, correctly hedged.
- **Era confound: nobody forgot it, and Ch7 is the only chapter that *does something about it***. The era-matched permutation on the 3 stragglers is the right test and it lands the pack's most important result: **the loudness "break" the brief flags is an era effect, not a format effect** (Δ0.07 LU, null). I confirm this. The brief itself is wrong to cite the 10 LU spread as a broken creator constant.
- **Browser trap: not repeated.** Ch3 hand-labelled 63 events and found **90% are an overlay layer**, then correctly refused to convert it into a talking-head cut rate. Ch4 traced five apparent zooms to stock pushes/Ken Burns/animated cards. Ch1 threw out three classifiers that agreed with each other and were wrong by 60 points. This is the discipline working.
- **One free correction nobody claimed:** `ydif_raw.txt` contains an explicit `pts_time:` line above every `YDIF=` line. Three chapters independently "discovered" the fps problem by inferring rate from line counts — **the true timestamp was in the file all along**. The correction is right; the derivation was harder than necessary, and the recipe should just say *parse `pts_time`, never divide by anything.*

---

### BOTTOM LINE

No fabricated numbers found. The two failures (#17, #20) are one unreproducible census and one uncited recipe line, not invention. The pack's central claims — **speech at frame 1 (25/25), locked camera, no music, no SFX, captions as the one true format demand, and loudness-as-era-not-format** — all survive re-derivation. Fix the four strikes, reconcile the width definitions, and label the tail on Ch7's permutations.
