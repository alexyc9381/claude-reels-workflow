# The Split-Screen (Two-Screen Stacked) Format

A reel layout for **tutorial / guide / "how Claude does X" reels**, introduced on **reel 41 SLASH** (lower your bills). The frame is split into **two stacked screens** so every beat is told twice, in two registers, at once:

- **TOP screen = the STORY (abstract).** A bright, colorful, animation-palette panel where clay sprites act out the idea as characters — a villain bill getting slashed, bills on a balance scale, a podium, a radar sentry. Fun, kinetic, mute-legible, escalating.
- **BOTTOM screen = the PROOF (practical).** A dark, realistic UI panel — a real-looking provider bill, a real **claude.ai chat** typing the (gated) prompt, a ranked list, a call-script draft. This is the "pretend Claude prompting" / receipts half.

The two screens **complement, never compete**: abstract idea ↔ concrete receipt for the same sentence. The contrast (bright story vs dark real-UI) is what makes the format read as *"here's the fun version, and here's it actually happening."*

> **Reference implementation:** [`video/src/ClaudeSlashReel.tsx`](video/src/ClaudeSlashReel.tsx) (reel 41). Everything below is built there; read it alongside this doc.

---

## 1. When to use it

Use the split-screen for **SPOKEN-PROMPT FOLLOW-ALONG** reels (see the Script Factory, matrix branch 1): broad-consumer, doable-tonight, prompt-shaped topics where you want to (a) keep it fun/kinetic AND (b) show the real Claude UI + a real receipt for credibility. It is the standing template for tutorial-style reels.

Do NOT use it for single-hero narrative reels (one big visual per beat) — those want the full-frame editorial style. Split-screen is specifically for *idea + proof* pairing.

---

## 2. Frame geometry

1080×1920, 30fps. Three horizontal bands top→bottom:

| Band | Screen y (px) | What |
|---|---|---|
| Progress rail + reward gift | `top: 258`, h 60 | the pac-style progress bar; reward gift opens at the CTA |
| Hook header pill | `top: 330` (hook only) | mute-readable claim, clears at scene 1 |
| **TOP panel (STORY)** | `A_TOP = 360`, `PANEL_H = 420` | abstract sprite scenes |
| **BOTTOM panel (PROOF)** | `B_TOP = 806`, `PANEL_H = 420` | real-UI scenes |
| Captions | `top: 1256` | word-by-word, in the seam below the bottom panel, IG-safe |

```js
const PANEL_H = 420;
const A_TOP = 360, B_TOP = 806;
```

**⛔ Coordinates inside a scene body are PANEL-LOCAL: `0..1012` wide, `0..PANEL_H (420)` tall, center x = 506.** Each scene renders inside a clipped `<PanelShell>`, so anything with `top > ~400` is clipped. This is the single biggest gotcha — it is *half* the panel-local range of the full-frame reels (which are 0..792). Keep sprites/labels ≥ ~16px from every panel edge; price tags at `top:-16` and labels at `bottom:-14` extend past the sprite box, so leave headroom.

---

## 3. The two PanelShell modes

`PanelShell` renders both panels. It has a **`light`** flag:

- **`light` (top / STORY):** bright warm gradient `linear-gradient(158deg,#FFF6E6,#FCE9D6,#FBE2EC)` + 3 per-scene **colored drifting blobs** (pass `theme={[c1,c2,c3]}`) + sparkle motes + a light sweep. This is the "animation color palette" — vivid, not washed out. Blob alphas are `66/5A/4E` hex (~0.4/0.35/0.3); do **not** drop them lower or it reads muddy.
- **default (bottom / PROOF):** dark espresso `grad("#2A2118","#17110B")` — the real-UI backdrop.

```jsx
<PanelShell top={A_TOP} light theme={ATHEME[i]}>{React.createElement(As[i], {lf})}</PanelShell>
<PanelShell top={B_TOP} label={BLAB[i]} tint="rgba(120,150,210,0.28)">{React.createElement(Bs[i], {lf})}</PanelShell>
```

Per-scene themes (bright, playful — one array per scene):
```js
const CORAL="#F2895F", TEAL="#2FB79A", SKY="#5AA0DE", SUN="#F5BE47", GRAPE="#9E76CF", MINT="#6FD3AE", ROSE="#EE7E86";
const ATHEME = [[CORAL,SUN,TEAL],[TEAL,SKY,SUN],[ROSE,GRAPE,SUN],[SUN,AMBER,MINT],[GREEN,SUN,SKY],[TEAL,MINT,SKY]];
```

---

## 4. Scene architecture

Scenes are two parallel arrays, one entry per beat, driven by the `L[]` onset array (same as every reel):

```js
const As = [A0, A1, A2, A3, A4, A5];   // STORY bodies (top)
const Bs = [B0, B1, B2, B3, B4, B5];   // PROOF bodies (bottom)
// in render: for the active scene i, mount <PanelShell top=A_TOP light>{As[i]}</> and <PanelShell top=B_TOP>{Bs[i]}</>
```

SLASH's beat pairing (the model for "idea ↔ proof"):

| beat | TOP (story) | BOTTOM (proof) |
|---|---|---|
| hook | ninja mascot **slashes a villain bill** eating your money | real xfinity bill, `$89.99` circled + "$40/mo TOO HIGH" |
| gap | 3 bill sprites → **balance scale** `$89` vs `$49` | **claude.ai chat**: 3 PDFs + gated prompt → side-by-side |
| creep | bill **monsters grow** year by year, `$49` ghost | price-creep graph drawn on the bill + GEKKO renewal card |
| rank | **podium** + crown on the worst, referee mascot | ranked list, "total leak $73/mo · $876/yr" |
| script | mascot reads a **call-script scroll** vs XFINITY HQ | gated call-script chat, "magic line" blurred |
| monthly | **radar sentry** (cop mascot) zaps a creeping price | monthly re-check panel, Vorizon creep caught |
| CTA | full-frame SLASH wordmark + guide card + pills (single panel) | — |

Rule: **top is symbols/sprites (glanceable on mute); bottom may carry realistic UI text.** Never put sentences on the top screen.

---

## 5. Key components (all in the reel file)

- **`BillSprite`** — the recurring character: a dimensional-shaded bill with googly eyes + mood (`smug`/`scared`/`happy`) + **dress-up props** `horns`, `mustache`, `sweat`, `crown`, and any vivid `tone`. This is how the "boring bills" become colorful villains/victims.
- **`ChatWindow`** — the **claude.ai** mock: window dots + centered Claude wordmark + `Fable 5 ▾` model selector + right-aligned user bubble with a smooth blinking caret + gated-prompt blur + a **"Reply to Claude…" compose bar**. Keep this professional and smooth — it is the "pretend prompting" hero.
- **`Kicker`** — 1–3 word mute label, top-left of the STORY panel (per-scene tone).
- **`MoveChip`** — `PROMPT n/4` chip on the PROOF panel; the four ticks earn the CTA's "all four prompts".
- **`Mascot`** — the clay critter with per-scene **costumes**: hook = **ninja headband + katana**, gap = `sherlock`, creep = `glasses`+`shock`, rank = `judge`, script = `suit`, monthly = `cop`.
- **`PanelShell`, `Kicker`, `MoveChip`** are split-screen-specific; `BillSprite`, `ChatWindow`, `Mascot` are reusable.

---

## 6. The pattern-interrupt hook (first ~1s)

The opening must stop the scroll while keeping the `$500/yr` claim readable:

1. **Frame 0:** the villain bill **lunges** at the viewer (scale punch) while **eating your money** — coins get sucked into its chomping mouth = instant stakes ("this bill is robbing you"). Danger-glow pulse + menace vibrate. SFX: deep whoosh + **boing** + boom.
2. **~0.4s:** the **ninja mascot dashes in** from the right (motion streak) wielding a glowing **katana**.
3. **~0.62s:** **SLASH** — katana sweep + `slash.wav` + a full-screen white flash + radial burst + speed lines + screen shake + **vine boom**.
4. **~0.82s:** the bill **splits** with X_X dead eyes; the eaten coins **burst back out** (you get your money back); `−$500/yr` slams in.

The whole interrupt lands inside the first second, the claim reads the entire time, and the max-energy frame fires *after* ~0.8s of claim time (respects the CLAIM-BEFORE-SPECTACLE gate).

---

## 7. Audio: meme SFX + the click rule

- **Meme SFX** live in `public/sfx/`: `vine_boom.wav` (deep BWAAM on slashes/crown/CTA), `boing.wav` (bounces/growth), plus `slash.wav` (katana swipe), `cash-register.mp3`, `bonk.mp3`, `crash.wav`, `lib_cinematic_hit.wav`. Sprinkle boom/pop/sparkle/boing per beat — vary the palette, never the same whoosh twice.
- **⛔ THE CLICK RULE (why SLASH popped every second):** every `<Sfx>` inside a `<Sequence>` clicks at the clip boundary if the waveform ends non-zero. The `Sfx` primitive MUST ramp volume to 0 at both ends:
  ```jsx
  volume={(f)=>interpolate(f,[0,1,D-6,D-1],[0,v,v,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp"})}
  ```
  Then verify with a transient scan on the final mix (0 click events).

---

## 8. Build gotchas specific to split-screen

1. **Panel-local coords are 0..420 tall** (half the single-panel reels). Re-check every `top:` — clipping is the #1 bug.
2. **Two screens must COMPLEMENT.** Sample a frame per beat: the top and bottom must never show contradictory numbers, and neither should be empty while the other is busy. Keep the number spine identical across both ($89.99 / $49.99 / $40 / $73/mo / $876/yr).
3. **Edge safety:** fly-ins/bursts must stay in-bounds or be intentional off-panel motion (a cameo flyby). SLASH's "hidden gap" bills originally clipped the left edge — fan them across center instead.
4. **Bottom UI = professional + smooth.** Real claude.ai chrome (window dots, model selector, compose bar), eased entrances (translateY, not scale-pops), a real blinking caret. Alex flags jank here hard.
5. **VO / timing** is identical to every reel: splice out `cut cut` flubs, ~1.04–1.10× speed-up, cut pauses >0.5s, measured-onset captions, derive `L[]`, set `durationInFrames`. A re-record can flub the **very first words** too — word-transcribe + energy-scan the opening.

---

## 9. Delivery

Same as all reels: strip AAC priming (`atrim=start=0.0427`) → `libx264 -profile:v high -crf 18 -movflags +faststart -c:a aac -b:a 256k` → copy to `~/Downloads/Claude-Reels-Final/` **and** the Google Drive `Claude Reels` folder. File: `41_Claude-fable5-slash.mp4`.

See `CLAUDE-REELS-PLAYBOOK.md` for the full pipeline; this doc is the split-screen delta on top of it.
