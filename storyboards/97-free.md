# REEL 97 · "FREE" — storyboard

**Keyword:** FREE · **VO:** `public/free_vo.wav`, 26.09s, 101 words, ships at **1.0×**
**Board status:** Stage 6 deliverable to `storyboards/STORYBOARD-SPEC.md`.

---

## 0. THE VO, AS DELIVERED

Raw `FREE.m4a` is 37.15s and contains **two** "cut cut" flubs, not one:

| # | window (raw) | the bad take |
|---|---|---|
| 1 | 7.50 – 11.05 | "For avatar creation, this is **free**, cut cut" |
| 2 | 25.55 – 27.30 | "For **review**, cut cut" |

⛔ **Flub 2 is invisible to a full-context transcription.** `base.en` AND `small.en` both
transcribed the raw file as a clean "For video editing, this is paid, this is free" — whisper's
decoder smooths a false start away when it has the surrounding sentence to lean on. It only
appears when the region is transcribed **in isolation**. The first cut shipped it, and it showed up
as a 1.34s "editing," that no gate would have caught. **A sliding isolated-window scan over the
whole raw is now the flub-finding method**, not a single long-form transcript.

Edits, all taken **inside measured silence** (`silencedetect -40dB:d=0.045`), never on word times:
head trim to the first word · both flub windows dropped · every inter-island gap capped to
**0.24s** in the OUTPUT (recovered 6.27s) · 0.16s tail.

⛔ Capping a gap means **shortening the room tone on the tail of the earlier segment**. `atrim`+
`concat` butt segments with zero gap, so moving the *next* segment's start (the obvious
implementation, and the one that shipped first) does not shorten the pause — it eats the first
phoneme of the line.

**Result:** 26.09s · zero flubs on a 17-window isolated re-scan · R1 **passes at 1.0×**
(hook 0-10s **3.80** wps, worst 5s **4.20**, overall 3.90). No atempo. Length is inside the
22-29s house range.

### The beat spine (measured onsets, `src/data/words_free.json`)

Every line is the same three-part bar. `L` = the category, `PAID` and `FREE` are the two hits.

| # | category | L (f) | PAID (f) | FREE (f) | dur |
|---|---|---|---|---|---|
| 1 | image creation | 0 | 31 | 56 | 2.48 |
| 2 | AI research | 74 | 103 | 125 | 2.26 |
| 3 | avatar creation | 142 | 176 | 185 | 2.24 |
| 4 | code generation | 209 | 247 | 265 | 2.44 |
| 5 | videos | 283 | 308 | 329 | 2.10 |
| 6 | image editing | 346 | 375 | 398 | 2.26 |
| 7 | social scheduling | 413 | 446 | 466 | 2.40 |
| 8 | website builder | 485 | 518 | 529 | 2.34 |
| 9 | video editing | 556 | 585 | 609 | 2.32 |
| 10 | voice generation | 625 | 665 | 686 | 2.80 |
| 11 | CTA | 709 | keyword 713 | send 760 | 2.45 |

⛔⛔ **THESE ARE THE ONSET-ANCHORED FRAMES FROM `words_free.json`, NOT WHISPER'S RAW TIMES.** The
first build took them from the raw transcript and every hit landed 2 to 13 frames LATE (round 2,
§4b). The SFX fire on exactly these frames; the PICTURE leads them by 4.

`CUT` = 26.02s → **`durationInFrames` 781**.

---

## 1. THE PROBLEM THIS BOARD EXISTS TO SOLVE

**Ten beats, all the same sentence.** Every retention rule in the repo points at the same failure:
reel 93 (*a GRID has no moment*), reel 96 (*four of nine scenes were the same grid — "it will not
retain our viewers"*), `feedback_scene_needs_an_arc` (*every scene arrives then HOLDS*). This script
is that failure ten times over unless the design answers it directly.

⛔ **AND THE OBVIOUS ANSWER IS ALREADY A KNOWN DEAD END.** Reel 86 CANCEL is the same premise
(paid apps → free replacements). It burned **three hook sets, fifteen scenes** on genre worlds — a
toll plaza, a supermarket, a subway, a night city, a billing plant, then a carnival, a title fight,
an auction, a demolition, a pawn shop — and Alex killed all fifteen:

> *"in every ritual the app marks and the star count were set DRESSING inside somebody else's world."*

**So this reel does not get a genre world.** The conclusion reel 86 paid for, applied here:

> ⭐ **THE REAL BRAND MARKS ARE THE SET.** The mechanism is a RANK that flips on the word. The world
> is a gallery, whose props state the argument even when nothing is moving (§4, §4b).

---

## 2. LOCKED INVARIANTS (B2)

### 2.1 NUMBER SPINE — one set of numbers, identical everywhere

**$521/mo · $6,252/yr · 10 tools · $0.** ⚠️ REVISED IN ROUND 3, from $136/$1,632.

⭐ **THE TIER RULE.** *"Use the more expensive tiers for each option, for each choice."*  Applied as
one rule rather than ten judgement calls: **the SECOND paid tier, the plan you move to when the
entry plan stops being enough.** Every stand NAMES its plan, because once a reel quotes a tier that
is not the entry one, a bare number reads as "what the tool costs" and that is not what it is.

| category | plan quoted | $/mo | (entry) |
|---|---|---|---|
| image creation | Midjourney **STANDARD** | 30 | 10 |
| AI research | Perplexity **MAX** | 200 | 20 |
| avatar creation | HeyGen **PRO** | 99 | 29 |
| code generation | GitHub Copilot **PRO+** | 39 | 10 |
| videos | Higgsfield **PLUS** | 39 | 15 |
| image editing | Adobe Firefly **PRO** | 30 | 10 |
| social scheduling | Buffer **TEAM** | 12 per channel | 6 |
| website builder | Framer **PRO** | 30 | 10 |
| video editing | CapCut **PRO** | 20 | 20 |
| voice generation | ElevenLabs **CREATOR** | 22 | 5 |

⚠️ CapCut has one individual paid tier, so the rule cannot be applied to that row.
⚠️ Firefly Pro is $29.99 and CapCut Pro $19.99, both shown to the dollar; $521 rounds from $520.98.
⚠️ **Perplexity MAX at $200 is 38% of the total.** The rule produces it honestly, but the headline
number leans on one row.

### 2.2 THE TEN PAIRS — every price verified 2026-08-09

| # | category | PAID | $/mo | FREE | the free claim |
|---|---|---|---|---|---|
| 1 | IMAGE CREATION | Midjourney | 10 | **Nano Banana** (Gemini) | free in the Gemini app |
| 2 | AI RESEARCH | Perplexity Pro | 20 | **Consensus** | free tier, real papers |
| 3 | AVATAR CREATION | HeyGen | 29 | **Hedra** | free monthly credits |
| 4 | CODE GENERATION | GitHub Copilot Pro | 10 | **Cursor** | Hobby plan, $0, no card |
| 5 | VIDEOS | Higgsfield | 15 | **Hailuo** | free daily credits |
| 6 | IMAGE EDITING | Adobe Firefly | 10 | **Photoroom** | free plan, 250 exports/mo |
| 7 | SOCIAL SCHEDULING | Buffer | 6 | **Publer** | free plan, 3 accounts |
| 8 | WEBSITE BUILDER | Framer | 10 | **Lovable** | free plan, publishes live |
| 9 | VIDEO EDITING | CapCut Pro | 20 | **Edits** (Instagram) | free, no watermark |
| 10 | VOICE GENERATION | ElevenLabs | 6 | **MiniMax** | free TTS credits |

**Nine of ten are Alex's own published picks** from the `Free vs Paid AI Tools` carousel and its
`SWAPS` lead magnet, so the reel and the giveaway agree.

⚠️ **ONE ROW CHANGED, AND WHY.** The carousel's website-builder row is `Framer AI → Durable`, and
its own note says Durable is *"free to build, paid to publish."* **A website builder you cannot
publish from is not free** — that is the one row where the on-screen FREE would be untrue. Swapped
to **Lovable**, whose free plan (5 credits/day, 30/mo) deploys to a live `lovable.app` subdomain
with no card. Flagged to Alex rather than quietly kept.

⚠️ **THREE ROWS ARE TRUE BUT SOFT, and the frame must not overclaim on them.** Buffer (row 7),
GitHub Copilot (row 4) and CapCut (row 9) all have free tiers of their own, so the honest reading
is *"the plan people actually pay for"* vs *"a free plan that covers most people"* — which is
exactly how the lead magnet already words it. The price shown is the real paid plan; nothing on
screen says the paid tool has no free tier.

### 2.3 ONE HERO ARTIFACT ⚠️ REVISED IN ROUND 1

**THE PAIR OF STANDS, AND WHICH ONE IS WINNING.** Not the price plate: round 1 made the plate the
hero and Alex asked for the comparison itself to be the frame. The hero is now the RANK — one stand
tall and lit, one short and dark, and which is which changes on the word. The running total is a
*rail*, not the hero: it counts, it never performs. See §4.

### 2.4 CAST ⚠️ REVISED IN ROUND 2

No villain sprite. **The price is the antagonist** and the ten real paid marks are its face. The
clay `Claudie` is **the gallery visitor** — one figure, in every scene, in the near-left foreground,
who hops and cheers when the free exhibit takes the light. He is deliberately small (s 0.66): a
sprite competing with the exhibits for rank would undo the note that produced the layout. He also
rides the progress rail (chassis) and appears at the CTA.

### 2.5 DISTINCT DOMINANT OBJECT PER SCENE ⚠️ SUPERSEDED IN ROUND 1

The original plan was ten different product surfaces, one per tool, on the reel-96 rule that two
scenes sharing a base object is a redesign:

> a render tile · citation cards · a talking head · a code editor · a filmstrip · a background
> knockout · a week grid · page blocks · an NLE timeline · a spoken waveform

⛔ **They were built, and they were the wrong answer.** *"I don't need whole scenes, just two simple
scenes hierarchically showing each and nothing else basically."* The rule those ten satisfy —
*vary the base object* — was written for reels whose scenes each make a different POINT. Here every
scene makes the SAME point ten times, and the thing that has to survive repetition is not novelty of
object, it is **legibility of rank**. Variety now comes from the ten ROOMS (§2.6) and from the
content of the two stands, not from redrawing the set. `TagProps.tsx` keeps the ten surfaces,
unmounted, for a script that actually wants "what the tool does".

### 2.6 PALETTE ROTATION — the location changes every 2.3s

`feedback_reel_vary_the_locations` wants new light and colour every 2-4s, and here that is the only
thing standing between ten beats and one beat repeated. Ten rooms, deliberately alternated so no
two consecutive scenes share a temperature family:

`1 plum · 2 deep teal · 3 warm oxblood · 4 slate blue · 5 forest · 6 aubergine · 7 amber-brown ·
8 petrol · 9 burgundy · 10 pine`

⛔ Matte only. Solid paints and dark shadows, **no `0 0 Npx` bloom anywhere** — the grep is a gate.

---

## 3. THE OPEN (docs/THE-OPEN.md)

**There is no hook line.** The VO opens cold on beat 1 at 0.00s, so the open has to be built *inside*
image creation, and it has to make a viewer who arrived 40 milliseconds ago want beat 2.

⛔ The rejected version: cascade all ten marks and rip the counter to $136 across the first second.
It is the better *picture* and it is the wrong *frame* — the voice is saying "for image creation"
while the screen argues about ten tools, and THE-OPEN is explicit that a theme the viewer cannot
connect to the audio works against the hook.

**The version built:** the ten are the ROOM, the first pair is the SUBJECT.

| shot | f | dur | what |
|---|---|---|---|
| A | 0-36 | 1.20s | **Frame 0 is already the argument.** A giant Midjourney tile, lit, centre; the other nine paid marks racked behind it in shadow; the total rail reading **$136/mo** in red. The prompt line types and an image renders inside the tile. Anticipation is structural — the viewer can *count nine more* and has been shown the bill before a single claim is made. |
| B | 37-57 | 0.70s | **THE SLAM.** On the word *paid*: the `$10/mo` plate drops onto the tile, a lock lands, the render greys behind a paywall scrim. Total ticks `0 → 10`. Heaviest cue stack in the reel. |
| C | 58-73 | 0.53s | **THE FLIP.** On the word *free*: the plate spins to `FREE`, the lock bursts, Nano Banana's mark takes the tile and the same image comes back clean. |

Shot C is 0.53s, under the 0.7s floor — **deliberate and logged**: it is not a cut, it is the back
half of shot B's arc (same camera, same set, no re-frame). The floor governs CUTS. There are 3
hard cuts in the first 5s (0, 74, 142) and every one of them carries a transient.

⛔ Frame 0 must be **settled** — the header renders at `f+12` on scene 1 only.

---

## 4. THE SCENE, AND WHY IT IS NOT TEN DIFFERENT ONES

⛔⛔ **ROUND 1 REJECTED THE PRODUCT SURFACES.** The first build drew what each tool DOES: a
Midjourney render window, a citation fan, a talking avatar, a code editor, a filmstrip, a background
knockout, a week queue, a page publishing, an NLE, a TTS quota. Ten distinct dominant objects, all
of them decent drawings. Alex:

> *"each of the scenes needs to be way more hierarchical and just have like two panels to show paid
> vs free. I don't need whole scenes, just two simple scenes hierarchically showing each and nothing
> else basically, and the header should just be the category. Way simpler, way more hierarchical."*

**The diagnosis.** A mock of Midjourney's UI beside a price is INFORMATION. What a comparison
repeated ten times needs is a **RANKING**. Ten different app windows also had a second cost that the
first board never priced: they made the one thing that repeats — the comparison — the smallest thing
on screen, so the reel's argument was the least visible object in every frame.

⛔ **"HIERARCHICAL" DOES NOT MEAN DEPTH TIERS** (reel 86 settled this). It means the frame must
RANK. Two equal cards side by side have hierarchy **zero**, however well drawn.

### THE SCENE, as built

One dark room, one swinging spotlight, **two STANDS**, and a rank that flips on the word.

| | WINNING | LOSING |
|---|---|---|
| height | 512 | 372 |
| width | 398 | 306 |
| surface | paper, lit | near-black, unlit |
| mark tile | 158 | 92 |
| name | 44px ink | 28px grey |
| number | 92px | 50px, muted |
| light | the cone is on it | it is not |

- **f0 to the "paid" onset** — the PAID stand owns the frame with its real price already on it. The
  FREE stand is present, short and dark: the promise is visible, unranked.
- **on "paid"** — the price PUNCHES (scale 1.22) and the till fires.
- **on "free"** — the spotlight SWINGS right, the FREE stand grows past the paid one, the paid one
  sinks and greys, its price gets STRUCK, and the rail subtracts.

⛔ **ONE PANEL STILL.** Two objects inside the single house Panel. Not a dual-screen chassis
(reel 52, absolute).
⛔ **THE MARK TILE STAYS WHITE ON BOTH STANDS.** The loser recedes by its PLATE going dark, never by
a filter over a brand mark (reel 86 turned HiggsField's lime tile into a black square that way).
⛔ **THE STAND INTERIOR IS A FLEX COLUMN.** The first version hand-placed the name and the price from
the top, and on the SHORT stand they printed through each other. A card whose height animates cannot
have a hand-placed interior.
⛔ **512 IS A CEILING, NOT A TASTE.** With base 644, a 542-tall winner puts its top edge at
panel-local 102, and nothing may sit above y=120 or the HookHeader crops it.

### The header carries the category and the count. Nothing else.

⭐ **EXCEPT THE HOOK, WHICH NAMES THE REEL** (round 4). Scene 0 is the one frame guaranteed to be
seen, and it has to say what the whole thing IS before it says which row this is:
`FREE VS PAID AI` / `IMAGE CREATION`. Every other scene keeps `CATEGORY` / `N OF 10`.

Round 1's header was `MIDJOURNEY $10/MO` / `NANO BANANA IS FREE` — every fact, on the reasoning that
the VO names nothing. Once the stands carry the marks, the names and the prices at full size, that
header is a **second copy of the scene competing with the scene**. It is now `IMAGE CREATION` /
`1 OF 10`: the shelf label and the position in the run, which are the only two things on screen the
stands cannot say themselves.

### The rail is the smallest thing in the frame

The ten pips and the row counter are gone (the counter moved into the header; a pip strip beside two
ranked stands was a third thing competing for rank). What survives is `YOU PAY $136/mo`, counting
down to `$0`.

### What this bought, measured

| | round 1 | as built |
|---|---|---|
| hierarchy ratio (p90/p25 luma, panel) | 4.73 | **9.27** |
| median scene motion | 9.36 | **13.52** |
| full-frame luma, min | 163.8 | **176.9** |

⭐ **THE DARKENING IS WHY THE RATIO MOVED, AND IT RAISED THE LUMA TOO.** The bright side was already
maxed at p90 241 (the paper stand), so the only lever was the dark side: the rooms went down 44%,
the vignette 0.54 to 0.80, the losing stand to near-black. Full-frame luma went UP (164 to 177)
because contrast against the cream chassis increased. *Hierarchy needs darkness* and *frame 0 must be
bright* are not in conflict when the darkness is inside the panel.

## 4b. ROUND 2 — THE GALLERY, THE SYNC, THE VISITOR

> *"the free side pops out too late, it's not properly synced to my voice · the theme is too basic,
> I need a good interesting theme · and then I need maybe like a Claude sprite somewhere"*

### The sync, measured

Against `words_free.json` (lines anchored to RMS onsets taken off the wav) **every hit was late**:
mean **4.3 frames** on paid, 2 to **13** on free. Two stacked causes:

1. ⛔⛔ the hit frames were derived from the RAW whisper transcript, not from the caption JSON. The
   caption builder already measures true onsets; taking beat times from anywhere else inherits
   whisper's drift. **If a reel has captions, the beat times come from the caption file.**
2. ⭐ a flip that STARTS on the word is seen late. What registers is the moment the free stand
   OVERTAKES — the halfway point. The picture now leads the anchored onset by `LEAD_V = 4` so the
   crossover lands on the syllable; the **SFX still fire on the exact onset**. Flip 11f -> 8f.

Also: the CTA was posting on the CLOSING "free" (f760) when the word being asked for is the FIRST
(f713, *"comment FREE"*). The word stamps on 713, the comment sends on 760.

### THE GALLERY

⛔ The theme still cannot be a reel-86 genre world where the marks become dressing. **The test: does
the SET state the argument with nothing moving?** A gallery does — the paid tool is an exhibit
**behind glass, behind a velvet rope**, the free one is on an **open plinth**. The vitrine goes
AROUND the paid stand, so the ranking layout is untouched.

| on screen | what it is |
|---|---|
| the vitrine glass | the paywall |
| the velvet rope | the thing between you and it |
| the open plinth | the free tool, nothing in the way |
| the track spot | which of the two to look at |
| the wing colour | the category (ten wings) |
| the visitor | you |

⛔ **THE VITRINE SETS THE HEIGHT CEILING.** It adds 30px above whatever it encloses and nothing may
sit above panel-local y=120. A 512 winner put the glass at 102 and shipped clipped through the
header; 470 puts it at 144.

### The visitor

⛔ Centre does not exist: when the FREE stand wins it grows to 382 wide and lands on him, and the
rope runs through where he stood. He is in the **near-left foreground**, the one part of the room
nothing else occupies, which also gives the gallery depth. ⛔ At x=94 he sat behind the frame-edge
occluder (z 92 beats his 85); clear at 132. Small (s 0.66) on purpose. He hops and cheers on the turn.

### Round-2 gates

verify_reel **8/8** · motion **12.15 median, 0/11 failing, 0 dead runs** · hierarchy **8.31** (the
brass and glass are mid-tones, so the theme costs ~1.0 against round 1's 9.27) · full-frame luma
**min 176.6** · glow **0** · delivered mp4 re-scanned, **0 flubs**.

## 5. GATE B — the adversarial read

**Is it one story?** Yes: one bill, ten line items, every one struck.
**Intensity curve 1-11:** `8 · 6 · 7.5 · 6.5 · 6.5 · 6.5 · 6 · 7 · 8 · 9 · 9.5` — rises to the peak
at S10/S11, with S3 (the $29 spike) and S9 (the watermark) as interior lifts so the middle third
does not flatline. ⚠️ S5-S7 is the sag; that is where the palette rotation and the per-scene camera
push are doing load-bearing work, and it is the first place to look if the motion audit dips.
**Where would a viewer swipe?** ~f350 (S6), the sixth identical bar. Mitigation: S6 is the only
scene whose action *removes* rather than *makes*, and S7 is the only one with a per-unit price.
**Two scenes sharing a base object?** Checked in §2.5 — the two near-misses (1/6 and 5/9) are
separated by verb and by six seconds.
**Number spine identical?** One table, §2.2, and the code imports it — no scene carries a literal.
**Does the villain lose only at the peak?** No, and it must not: the VO strikes a price every 2.3s.
The villain that survives to the peak is the **total**, and it only dies at f740.

---

## 6. WHAT THE HEADERS CARRY

⛔ A header ADDS information, never echoes the VO. The voice never names a single tool or a single
price, so the header is where every fact in this reel lives:

`line 1 = the paid tool + its real price` · `line 2 = the free replacement`

That also makes the reel work muted and makes the Claude mark (the `HookHeader` badge) present in
every scene, which is the audience filter this topic otherwise has no room for.

---

## 7. FLAGS FOR ALEX

1. **Same family as reel 86 CANCEL** (paid → free) and the direct video of the `Free vs Paid AI
   Tools` carousel. Deliberate series; say so, then build.
2. **The website-builder row changed** from Durable to Lovable — see §2.2.
3. **Three soft rows** (Buffer, Copilot, CapCut) — the paid tools also have free tiers. Handled by
   showing the real paid plan and never claiming exclusivity.
4. **26.09s at 1.0×**, inside the house range, R1 clean. No tempo change.

---

## Related
`docs/THE-OPEN.md` · `storyboards/STORYBOARD-SPEC.md` · `memory/reels/` reel 86 CANCEL ·
`REEL-BUILD-LEARNINGS.md` §12 · `docs/SOUND-DESIGN.md`
