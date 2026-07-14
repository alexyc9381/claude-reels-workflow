# Editing Style — "Game-World Theme Remake"

> **Reference build:** reel 51 **SKILLS** — a Claude/AI reel fully re-skinned as **Super Mario Bros** (`video/src/ClaudeSkills2Reel.tsx`, comp `ClaudeSkills2Reel`, shipped `51_Claude-5-skills.mp4`).
> **What it is:** keep the reel's script/VO/scene-timings/captions **byte-identical**, then re-skin the entire video into a recognizable **video-game world** (Mario, Zelda, Pokémon, arcade, RPG, racing…). The world is not decoration — it *is* the retention engine: a persistent game HUD turns "watch the whole reel" into "beat the level."
> **When to pick this style:** a *listicle / count-up* reel ("5 skills", "3 mistakes", "top N"), or any reel that benefits from playful pop-culture familiarity + a strong stay-to-end lever. Broad-consumer topics only (a game world reads as fun, not technical). **Don't** pick it for somber/credibility-first money reels — use the default cinematic house style there.
> **Effort:** high. This is a full re-skin (foundation + prop kit + 7 re-authored scenes + chiptune audio). Budget a multi-agent overhaul pass.

This pack is a **complete, replicable recipe**. Every value below is lifted verbatim from the shipped source so a future build reproduces the look exactly, then §8 shows the *one block* you swap to re-theme Mario → any other game world.

---

## 0. The invariant chassis (stays across EVERY theme)

- **Canvas:** 1080×1920, 30 fps. `fr = s => Math.round(s*30)`. Scene starts live in `const L = [...]` (seconds); each scene body is a `React.FC<{lf:number}>` where **`lf` is panel-local frames** (0..dur·30), never the global frame.
- **Fonts (3 roles, never mixed)** — loaded once in `fonts.ts`:
  - **DISPLAY** = `fraunces.fontFamily` (chunky rounded serif), **always weight 900** → big numbers, title plates, CTA keyword, captions, brand burst.
  - **BODY** = `inter.fontFamily`, 600–800 → card titles, descriptions, UI chrome.
  - **HUD MONO** = `"ui-monospace,'SF Mono',Menlo,monospace"` (raw CSS stack, not a webfont), weight 800–900, `letterSpacing 2`, UPPERCASE → every HUD label/chip/tag. *Mono is what makes any panel read as "game UI."*
- **Base brand palette (fixed, never re-skinned):** `CREAM #ECE9E2` (root bg) · `INK #1A1813` · `SLATE #3A5C84` · `CLAY #D2724E` (caption/brand terracotta) · `AMBER #CF9544` · `GOLD #E7B24C` · `GREEN #3F9E74` · `MUTE #9A968B` · `RED #C44A3A` · `TERM #0E1626` / `TERM2 #0A1120` (dark UI) · `PAPER #F7F3EA` · `PURP #4B3E8E`.
- **The "game-screen" Panel:** every scene renders inside ONE dark rounded card floating over the world — `left:34 right:34 top:404 height:792 borderRadius:40 overflow:hidden`, fill `linear-gradient(158deg,#0E1626,#0A1120)`, `NAVYSH` shadow (`0 34px 66px -22px rgba(18,28,58,0.55), 0 10px 24px rgba(18,28,58,0.30)`), 2px border `rgba(63,158,116,0.34)`, inner `inset 0 2px 0 rgba(255,255,255,0.06), inset 0 0 130px rgba(0,0,0,0.45)`. Top-left traffic dots `[#C44A3A,#CF9544,#3F9E74]` 15px + a mono `label` = the level-moment nameplate ("WORLD 1-1").
- **Karaoke captions (unchanged across themes):** container `absolute left:44 right:44 top:1256 zIndex:90 textAlign:center`, words `inline-flex wrap gap:"0 16px"`. Each word `fraunces 900, 74px, lineHeight 1.12, letterSpacing -0.01em`, `textShadow:"0 2px 12px rgba(255,251,244,0.9), 0 1px 2px rgba(120,56,26,0.35)"` (cream halo so serif reads over any busy world). 3-state per word on `t+lead` (`lead=0.12s`): active `#B8501F` + `translateY(-3px) scale(1.04)`; settled `CLAY #D2724E`; upcoming `transparent`. Chunk ≤3 words / break on >0.34s gap / sentence-ender; leading-punct fragments merge into the prior word.

---

## 1. World & Background — nested two-tier parallax overworld

Render the game world **twice, nested**: an outer full-frame `Bg` shows in the ~404px strip above and ~570px below the Panel; a *richer* `MSky` overworld is the **first child inside every scene's Panel**. Read = "a handheld game running a level, sitting on a game-themed desktop." **This nesting + z-order is the load-bearing trick; re-theme by swapping only palette + dome/texture shapes.**

**Z-order (back→front):** `Bg` (AbsoluteFill) → `Panel` (dark card) → `MSky` (clipped inside) → scene content.

**Outer `Bg`:** sky `linear-gradient(180deg,#5C94FC 0%,#6EA2FC 46%,#8FBBFF 100%)`; 6 `MCloud` drifting `x=((x+f*0.35*(1/s))%1360)-160` (smaller/farther = faster = cheap parallax); 3 `MHill` at `bottom:150` scales `1.15/0.85/0.6`; ground band `height:150 #C4682C borderTop:9px #7E3F16`, top highlight `inset 0 8px 0 rgba(255,255,255,0.12)`, brick texture = two crossed `repeating-linear-gradient` @ `rgba(90,40,14,0.35)` (cols 60→64px, rows 44→48px).

**Inner `MSky` (+1 richness tier):** 4-stop sky `#4C8AFB→#69A0FC→#8FBBFF→#B9D7FF`; sun bloom `right:-70 top:-80 300×300 radial-gradient(circle,rgba(255,248,214,0.6),transparent 68%)`; 2 mountains (dome `borderRadius:"50% 50% 0 0 / 100% 100% 0 0"`, `#6FA3C9→#4E7EA3` + snow cap, slowest sway); 2 hills (`#5FB63C→#3C8A2C` + two `#3C8A2C` eye-dots = the SMB hill "eyes"); 3 bushes (`#63C24A`, fastest sway); grass lip `bottom:84 height:12 #7EC64F→#4E9E38`; brick band `bottom:0 height:90 #C4682C borderTop:7px #7E3F16`. Every layer sways `sway(spd,amp,ph)=sin(f/spd+ph)*amp` — mountains `spd46/52 amp7-8`, hills `spd58/50 amp6-7`, bushes `spd60 amp4`.

**Parallax law (any theme):** depth = size × speed × sway. Farther = bigger domes lower on screen, slowest sway/drift; nearest = small fast sway. Ground is always the anchor: a textured band pinned to the bottom with a bright top-edge highlight + crossed `repeating-linear-gradient` tile grid.

---

## 1b. Scene detail & density — the "detail budget"

**The one rule that resolves "make it richer" vs "it's too cluttered":** put the DETAIL in the **background**, keep the **foreground** disciplined. Richness lives in the always-alive world *behind* the message; the message itself is one loud, clean hero. Almost every "this scene is boring / this scene is a mess" note is really a violation of this split (boring = dead background; messy = crowded foreground).

Think of every scene as **three stacked layers**, each with its own detail budget:

| Layer | z | Detail budget | Contrast | Motion |
|---|---|---|---|---|
| **World (background)** | low | **6–10 concurrently animated elements** — parallax sky/clouds/hills/bushes/ground + *ambient life* (a distant Goomba walking, a bobbing `?`-block, drifting coins, floating particles, the running-HUD mascot). No corner is ever dead. | **muted / dimmed / soft** — it must recede | always moving (sway + drift), but slow & low-amplitude |
| **Hero + artifact (foreground)** | high | **≤4 things total: 1 mascot action + ≤1 premium artifact (RepoCard / HudBox / search bar / before→after panel) + 1 big number-or-label + 1 `MSlug` title plate.** That's the ceiling. | **full contrast, brightest accent** | escalates + climaxes on the payoff beat |
| **Persistent HUD** | top | the two global rows (§2) — **doesn't count** against the scene budget | full | steady (outside the zoom wrapper) |

**"Detailed" = DEPTH, not more objects.** You add richness by making each shape *deeper*, never by adding competing foreground things:
- Every shape gets the premium treatment — **gradient fill + rim/inner highlight + layered drop shadow + rounded corners** (the §4 shading recipe). NO flat single-tone shapes (they read cheap).
- Depth via **z-layering + parallax + stacked shadows + occlusion** (things correctly pass in front of / behind each other).
- Low opacity is allowed **only** for background depth washes (sun bloom, glow), **never** for foreground content — content is solid and readable (no ghosted 15%-opacity artifacts).
- **No emoji pictographs** on screen — draw the shape (a coin, a star, a checkmark glyph in the mono face), don't paste 🪙⭐✅.

**Escalation, not stasis.** A scene should *build*: elements enter/animate and the payoff (number, before→after, seal) lands on a riser→boom beat, not sit static for 6 seconds. If a scene is one still image the whole time, it's under-built.

**How much is too much? Four gate tests (run on the RENDERED frame, not the code):**
1. **Mute test** — a stranger decodes the payoff (the number / before→after) in **< 2s, sound off**. If your eye goes to the background before the hero number, the background is too loud → dim/blur it more.
2. **One-hero test** — you can point to the single thing the scene is about. If you can't, you've overloaded the *foreground* → move detail to the background layer or cut it (don't add a second hero).
3. **Zoning test** — every foreground element sits in its **own non-overlapping rectangle**; nothing overlaps text. If two touch, separate them or drop one. (§5.⛔2)
4. **Grounded test** — props sit on the world's floor line (~y700), not floating mid-panel. (§5.⛔3)

**Worked example (R3 "UI-UX Pro Max"):** *background* = the full alive Mario world (parallax layers + a twinkling Super Star) kept dim; *foreground* = exactly one before→after (the ugly `AI SLOP` panel slides **fully** out → a clean `PRO GRADE` app card locks in) + the mascot going rainbow-invincible + the `MSlug` title + one stat trio (`98 / A+ / 100`). Rich and alive, but the eye lands on the transform in under a second.

**Origin of the rule:** the DROP reel got flagged first for "backgrounds too boring" (→ push richness into the background) and then for "too much going on" (→ strip the foreground to one hero). Both notes are satisfied by the same split, which is why it's the budget for every scene.

---

## 2. The Level-HUD + step-tracker — the signature retention spine

**Two global overlay rows pinned to the top band, above every scene** (`zIndex 120` & `115`), driven purely off `f` and `L`. Together they turn watching into *progressing through a level*. **Both must be SOLID at frame 0** (thumbnail / mute scroll-stopper) — floor opacity to 1, animate only a translateY settle.

**Row 1 — `ProgressBar` (Mario level strip):** `absolute left:46 right:46 top:263 height:66`. A scrolling ground rail (`backgroundPositionX:-f*1.6px` endless-runner) + start pipe; a **running Claude-Mario** avatar `runX=15%→82%` on `p=f/(dur-1)` that hops+cheers at each milestone; **5 `?`-block→coin milestones** at the scene boundaries that swap to a spinning coin + collect-burst as the runner passes; and a **teased-and-LOCKED reward at the far right** (green flagpole with flag *raised but not celebrated* + a gray stone castle whose door carries a **gold padlock**) = the stay-to-end lever. Three dark-chrome chips: **COIN** `x0→x5` (`coins=markers.filter(m=>t>=m).length`), **WORLD** `1-1→1-6` (`worldN=min(6,1+coins)` — the scene counter as a level name), **TIME** `400→088` (`max(0,round(400-p*312))`, flips `RED` when `<130`).

**Row 2 — `SkillHeader` (topic banner + N-tracker):** `absolute left:40 right:40 top:334 height:62`, dark oxblood shell `linear-gradient(158deg,#20121A,#0E0A12)` + diagonal hazard stripes, a lightning-bolt SVG + two-tone Fraunces-900/37px title (`"TOP 5 "` cream `#F8ECE3` + `"CLAUDE SKILLS"` `#F27A54`). Right side = **N cells (N = list length)**: locked show the numeral (`#241319`/`#8A5C64`), unlocked flip to a **`✓` mono glyph** on green (`grad(#3F9E74,#2C7150)`), the just-unlocked cell pops `scale(1+pop*0.42)`. Banner runs a stronger glow + `scale 1+emph*0.06` for the first ~2.6s (`emph=(1-t/2.6)^2`) then settles.

**Why it works:** crossing each `L[n]` **simultaneously** advances the runner past a block, increments the coin counter, ticks `WORLD 1-(n+1)`, and flips tracker cell `n` → ✓. That triple-redundant "you just leveled up" beat is the retention engine.

**Reproduce it:** `ProgressBar` + `SkillHeader` are **cloned verbatim** from the reference reel — keep all geometry/animation constants (strip bands `SKYT=23/GRDT=48/GRDB=64`, runner `GX0=15%→GX1=82%`, `RSZ=36 feetY=56`, chip shells, flagpole+castle+padlock, collect-burst rings) and swap only the **noun layer**: coins→gems/keys/XP; `WORLD`→STAGE/FLOOR/ROUND; `?`-block→chest/lock; flag+castle→trophy/boss-door/vault; the N-tracker cell count = your list length. Don't re-derive the HUD from scratch — port the two components and re-skin their nouns/palette. (These two rows sit **outside** the whole-frame zoom wrapper — see §7 — so the HUD stays rock-steady while scene content breathes.)

---

## 3. Mascot costume law — "Claude-as-a-costume"

**⛔ The single most important character rule.** Dress the clay Claude mascot as the theme character, but **KEEP THE CLEAN BASE CLAUDE FACE UNTOUCHED** — its two simple dark eyes ARE the brand. **Never overlay fake eyes/whites, a nose, eyebrows, or a mustache** on the face (that reads as cluttered/overlapping and looks bad). The costume = props on the **HEAD-TOP and BODY only**. Character then reads as "Claude *wearing* a Mario outfit," instantly on-brand.

- **Mario costume** = red cap with a white **"C" roundel** (not an "M") + blue overalls + gloves + boots. Add via a `mario?:number` prop on the shared `Mascot`, the same slot mechanism as `glasses`/`wizard`/`judge`.
- **Overalls must FIT the body:** the base body spans x34–166, so the bib spans **x36–164, height ~42**, and sits **BELOW the face** (bib top y~108; eyes end y~96). Shoulder straps go on the **OUTER shoulders (x44–59 and x141–156)** so they clear the eyes (eyes at x70–131) — straps rising at the inner x cross the eyes and look "on his face" (a real bug that was caught). Buttons where straps meet the bib.
- **Motion props:** `run` (leg cycle), `jump` (airborne pose), `rainbow` (invincibility — body hue cycles `hsl((lf*15)%360,88%,60%)`).
- **General rule (any character):** costume = head-top prop (hat/helmet/crown/ears) + body prop (garment fitted to x34–166, below y~108) + optional held prop; **base face always stays**. Show a cropped close-up still and get approval before building the scenes when the character is new.

---

## 4. Theme Prop Kit — build this FIRST, before any scene

~16 tiny self-contained components at **module scope**, each rendering one iconic world object with premium shading, so every scene composes from the same vetted vocabulary (keeps scenes short + consistent + declutter-friendly).

**⛔ Load-bearing law — absolute-x, NEVER flex.** Every prop is `position:absolute` positioned by an explicit `x`/`y`. A `display:flex` parent *ignores* absolutely-positioned children, so a row dropped in a flexbox collapses onto one coordinate and piles into what looks like ONE object. Place multiplicity by computing coordinates: `x={base + i*step}` inside a plain positioned box; phase-offset each instance's idle animation (`phase`, or `+x*k` inside the trig) so clones don't move in lockstep.

**Shared shading recipe** (makes shapes read "premium," not clip-art): top `inset 0 3px 0 rgba(255,255,255,0.24–0.38)` highlight + bottom `inset 0 -4/-5px 0 rgba(dark)` + outer drop shadow + a hard `0 Npx 0` offset for the sticker look. Coins/stars add a `radial-gradient` specular + white blur dot. **Animation convention:** idle props take `lf` (drive own motion); event/burst props take a normalized `p` (0..1) and **must `return null` at `p<=0||p>=1`** so nothing lingers at low opacity.

**Inventory (Mario instantiation):**
- *Terrain/collectibles:* `QBlock` (glossy ?-block, `hit` bumps up, `used` → spent brown), `Brick`, `Coin` (spin `cos(lf*0.16+x*0.05)` phase-offset), `Pipe` (warp, `lit` brighten), `CloudPlatform` (stand-on cloud, doubles as Lakitu's).
- *Enemies:* `Goomba` (walk-cycle `sin(lf/5+phase)`, `squish` 0→1 flattens+dust, optional mono `label` = a buzzword), `KoopaShell` (green/red, spins), `PiranhaPlant` (`t` 0→1 rises from a pipe via `clipPath inset`, jaw `sin(lf*0.3)`), `BulletBill`.
- *Power-ups:* `Star` (SVG 5-point, drawn face, twinkles), `FireFlower`, `Mushroom`.
- *Event FX (take `p`, self-clear):* `BrickShatter` (6 chunks, gravity `p*p*sz*2.4`), `OneUp` ("1-UP" pill floats up + fades).
- *HUD/chrome:* `HudBox` (dark arcade stat plate, mono label + Fraunces-900 value), `MSlug` (per-scene gold ?-block **title plate**, `left:50% top:24`), `RepoCard` (dark GitHub card w/ octocat + `anthropic/<skill>` handle + animated ★ tick — the reusable **credibility artifact** slot, not theme-specific), `ClaudeLogo` (11-ray terracotta sunburst brand mark — the **brand anchor**).

Theme palette consts (swap this whole block to re-theme): `SKY #5C94FC · MBRICK/GRD #C4682C · QB #F2B21C · QBDK #C98A12 · PIPEG #41AD41 · PIPEDK #2E7A2E · MCOIN #F7CE3A · MCOINDK #D9A81E · HILLG #5FB63C · HILLDK #3C8A2C · BUSHG #63C24A · MTN #6FA3C9 · MTNDK #4E7EA3`. Universal outline browns: block/lip `#7E3F16` (3–4px), pipe body `#1E5E1E`, enemy `#4A2C10`.

---

## 5. Scene → "level moment" mapping — the heart of the method

Keep script/VO/`L`/captions identical; re-skin each beat as one self-contained "level." Label each beat by its **VO function**, not its words — the function maps to a **genre archetype** that exists in any game world.

| Beat | VO function | Mario level moment | Panel label | Hero pill | Payoff artifact |
|---|---|---|---|---|---|
| **R0 hook** | Abundance / big-number reveal | drop-from-sky slam → **headbutt ?-block → coin burst** | `WORLD 1-1` | (brand burst) | `50,000` gold number + `COINS x50,000` / `YOU'VE USED 1` |
| **R1** | Removes-a-flaw | **FIRE FLOWER** → stomp buzzword **Goombas**; clean note survives | `POWER-UP GET!` | `STOP-SLOP` | `SLOP K.O. x4`, RepoCard |
| **R2** | Saves / persists / no-loss | **CHECKPOINT FLAG**; sessions stamped SAVED | `CHECKPOINT` | `ClaudeMem` | `PROGRESS SAVED · NO RESTART` |
| **R3** | Transforms ugly→premium | **SUPER STAR** glow-up (rainbow); ugly panel sweeps fully out → clean | `SUPER STAR!` | `UI-UX Pro Max` | `PRO GRADE` + `98 / A+ / 100` |
| **R4** | Watches / monitors | **LAKITU** (Claude head on cloud) with a sightline over Mario | `LAKITU - OBSERVING` | `Task Observer` | `4 SKILLS +XP` leveling bars |
| **R5** | Finds / installs-many | **WARP PIPES** rising, each auto-installing | `WARP ZONE` | `Find Skills` | `3 found [3/3]`, `installing 100%` |
| **R6 CTA** | You win + do this | **FLAGPOLE slide → CASTLE, COURSE CLEAR** | `COURSE CLEAR!` | `SKILLS` stamp | `ALL 5 UNLOCKED` + collected cards + `comment SKILLS ↓ / + FOLLOW` |

**Reusable archetype vocabulary (swap the middle column for your world):** abundance→**loot source** (chest/jackpot) · removes-flaw→**power-up + destroy the personified problem** (pain point = an enemy) · saves→**save/checkpoint** (crystal/bonfire) · transforms→**invincible glow-up** (carries a built-in before→after; the ugly artifact must slide *fully off*) · watches→**overhead observer** (drone/sentry, draw a literal sightline) · finds→**portal spawn** (materialize N results w/ progress bars) · CTA→**victory gate** (finish line/boss-cleared; hold the keyword-comment + follow in a **center lane between the two big props**).

**⛔ Invariant staging rules (every scene, every theme):**
1. **Single hero per scene** — one mascot action + **≤1 premium artifact**. Never two heroes competing.
2. **Zone the panel into non-intersecting rectangles** — assign each element a rect, verify none overlap on the *rendered* frame (real fixes cost cycles: jump-peak crossing the number, banners on the flag, stamps under the castle).
3. **Scenery GROUNDED at the floor line** — in this world the ground surface ≈ **panel-y 700**. Every prop's base sits there (pipe bottom→700, castle bottom≈698, mascot feet≈698). Props at mid-panel (~y560) float in the sky and read as broken. Shorten a tall hero prop if it intrudes the text band.
4. **Character = costume-on-base** (§3), never a repainted face.
5. **Transitions clear fully** — a "before" artifact slides out (`Math.max(0,1-transform*1.5)`), never fades to 0.15 and sits there.

---

## 6. Typography & Color — the signature "big-number" move

**Hero payoff number** = Fraunces 900, coin-yellow fill, hard extrusion + soft drop, over a gold bloom:
`fontSize:128, color:#FFE04A, textShadow:"0 5px 0 #B4231B, 0 8px 0 #7E1610, 0 11px 14px rgba(0,0,0,0.32)"` over `radial-gradient(…rgba(255,224,74,0.42)…)`. Two `0 Npx 0` layers (theme dark-primary → darkest-primary) build a faux-outline extrusion; the blurred third is the ground shadow. **Reusable formula:** fill = theme's brightest accent, extrusion = theme dark→darkest, blur = black @0.32.

- **HUD-box value:** label `mono 800, 15px, letterSpacing 2, #C7C2D6`; value `fraunces 900, 34px, textShadow 0 2px 0 rgba(0,0,0,0.4)`, accent per box (coins `#FFE04A`, alarm `#F27A54`); plate `linear-gradient(180deg,#26263A,#141420) border:3px #000 + 0 7px 0` (NES score-plate).
- **Title/CTA plate (`MSlug`, CTA keyword):** Fraunces 900 (36px title / 72px CTA), **dark cocoa ink `#4A2A08` on the yellow ?-block gradient** `linear-gradient(180deg,#FBC744,#F2B21C 46%,#C98A12)`, `border:4–5px #7E3F16`, `textShadow 0 2px 0 rgba(255,255,255,0.32)`, chunky `0 7–9px 0` bottom shadow (pressable ?-block chrome).
- **Brand burst "CLAUDE":** Fraunces 900, 76px, cream `#FBEFE6`, same extrusion stack.
- **Persistent header:** Fraunces 900, 37px, two-tone (cream + `#F27A54`), animated coral glow.

**Re-theme rule:** keep `fonts.ts` + the base brand table verbatim; replace ONLY the ~14-const theme skin block (keep the const *names* so props resolve). Big numbers → `fill=brightest theme accent`, extrusion = theme dark/darkest primary. HUD everything `mono 800 letterSpacing 2 UPPERCASE`. Captions unchanged (terracotta ink, cream halo).

---

## 7. Motion, SFX & Music scoring — three-bus mix + clamped slam

**(a0) Whole-frame motion identity — beat-breathing + cross-punch cuts.** Two frame-level moves give the whole reel its snap; they wrap the scene layer (NOT the HUD rows, which stay steady):
- **Beat-synced zoom-punch "breathing":** the scene layer scales `zoom = interpolate(frame,[0,16,28],[1.0,1.02,1.0]) + punch*0.028`, where `punch` pulses on **every scene boundary** (decay window 9 frames) **and** on a hand-authored ~15-entry `KICKS` beat array (window 7 frames, ×0.7). This is a subtle pulse-on-the-beat throb — core to the "alive" feel. Re-use the exact formula; author `KICKS` to your VO's emphasis beats.
- **Scene transition = 8-frame CROSS-PUNCH + white flash:** at each boundary the incoming scene slides in from the right (`x 72→0`, `scale 0.86→1`) while the outgoing slides left (`x→−84`, `scale ×1.13`) with an opacity crossfade and **motion blur up to 6px**, plus a **5-frame `#FFF6E6` white flash**. Don't hard-cut — this snap is a signature trait.
- The two persistent **HUD rows render outside the zoom wrapper** so they never breathe/blur — only the scene content inside the Panel does.

**(a) Hook pattern-interrupt (DROP-SLAM), R0 0–~1s.** Mascot falls from the sky and slams in, **every impact effect clamped to fire only at the slam (~0.32s) so frame-0 (thumbnail) stays clean**: `dropY=(1-dropIn)*-420` (`dropIn=over(lf,0,fr(0.34),Easing.in(quad))`); white flash `openFlash = lf<fr(0.32)?0:max(0,1-(lf-fr(0.32))/9)` (the `?0:` guard is the thumbnail-clean rule); 14-ray comic starburst + shockwave ring + dust; screen shake `slamImp*10*sin(lf*3.8)`. SFX: `swooshdn v0.32` at 0.0 (whoosh leads) → `boom v0.42 + m_bump v0.3 + crash v0.22` at ~0.30 (boom lands) → `sparkle + chimehi` at 0.34.
**Transient CLAUDE brand burst (first ~1s):** so a costumed/IP-skinned reel doesn't read as the source game, slam in the `ClaudeLogo` sunburst + "CLAUDE" wordmark *with* the drop, hold ~1.2s, then clear before the number locks (`brandIn` back-overshoot → `brandOut` at fr(2.9)). **Rule: when a themed reel risks reading as the source IP, add a transient brand beat in the first second, then clear it.**

**(b) Original chiptune SFX (no copyright).** `tools/gen_mario_sfx.py` synthesizes the game's *sound shapes* as original square-wave waveforms (never sampled) → `public/sfx/m_*.wav`. **`numpy 2.0.2` present, `scipy` ABSENT — numpy + stdlib `wave` only.** `SR=44100`, mono, 16-bit, `np.tanh(y*1.1)` soft-clip, normalize `peak=0.72`. Nine cues: `m_coin` (988→1319 Hz two-tone) · `m_bump` · `m_jump` (360→720 sweep) · `m_powerup` (9-note arpeggio) · `m_1up` · `m_stomp` (noise+147 Hz) · `m_pipe` (880→180 glissando) · `m_flag` (12-note descending) · `m_clear` (fanfare). Layer at `v≈0.2–0.34` **on top of** the cinematic bed (don't replace it). Verify `volumedetect max_volume < 0 dB`. Reusable for any theme — swap the frequency tables (arcade blips, RPG level-up…).

**(c) Risers-throughout.** A short **`lib_riser`(v~0.30) + `metal_riser_smooth`(v~0.18) over ~1s → `boom`(v~0.30) release** builds into **EVERY scene's payoff**, not just hook/CTA (explicit retention lever). Hook release lands exactly on the big-number lock (~1.9s) with `boom+crash+chimehi+sparkle+lib_magic_reveal`. Scene-transition beats: each `L.slice(1)` gets `swish v0.4` at `tt-0.08` + `pop v0.22` at `tt+0.22`. Global SFX-bus trim `SFX_GAIN=0.6` (−40%) so VO sits on top.

**(d) Music scoring (three-bus mix).** VO `volume 1.28` (~+11 dB over bed, dominant). BG bed via a **frame-keyed volume envelope**: `0.14` normal, **ducked to `0.045`** during the hero-music beat, `0.17` at the CTA — a real-song bed is much hotter than a synth pad, so keep it **~0.13–0.16 under a boosted VO** (final mix mean ≈ −21.5 dB). **Hero-music beat (R3 star):** the bed ducks to 0.045 so a **12s invincibility theme** owns the moment (`invincibility.mp3` in a `Sequence from fr(L[3]+1.5) dur fr(8.4) volume 0.42` w/ fade env), fired **together with the rainbow mascot** (audio + visual invincibility in sync). **Delivery limiter:** final encode adds `alimiter=limit=0.91:release=60` (→ −0.4 dB, no clip). Re-check `volumedetect max_volume` after any audio change.

---

## 8. Re-theme template — Mario → any game world

The chassis (§0), the HUD structure (§2), the staging rules (§5.⛔), the type formula (§6), and the audio skeleton (§7) all stay. To ship a **different** world, swap exactly these:

1. **The ~14-const theme palette block** (§4) — new SKY gradient, GROUND base+border+texture, mid-layer fills. Keep the const *names*.
2. **The dome/texture shapes** in `Bg`/`MSky` (§1) — Sonic loops, Zelda rolling hills, arcade grid — nesting + z-order + parallax law unchanged.
3. **The ~16 prop-kit components** (§4) — same signatures (`x,y,sz,lf`/`p`), same shading recipe, new nouns.
4. **The costume** (§3) — new head-top + body props on the same base face.
5. **The archetype → asset mapping** (§5) — instantiate the reusable vocabulary into the new world's objects.
6. **The chiptune frequency tables + which cinematic samples fire** (§7) — regenerate `m_*.wav`; keep the riser/boom bed + envelope shape.
7. **HUD noun layer** (§2) — coins→gems/XP, WORLD→STAGE/FLOOR, `?`-block→chest, flag+castle→trophy/boss-door.

Everything else — 1080×1920, 3 fonts, base brand palette, the floating Panel, karaoke captions, frame-0-solid rule, single-hero declutter, grounded scenery, VO 1.28 / bed 0.14→0.045, `alimiter` — is constant.

---

## 9. Apply-to-a-new-video checklist

1. **Confirm fit:** listicle/count-up or playful broad-consumer topic (§ "when to pick"). If somber/credibility-first → use the default style instead.
2. **Segment the VO into 5–7 functional beats** (hook, N value beats, CTA); label each by *function* not words.
3. **Pick the world**; write the §8 palette block + fonts (reuse base brand table).
4. **Foundation FIRST, then verify, then scenes:** build the outer `Bg` + inner `MSky` + the costumed `Mascot` + the ~16-prop kit at module scope → **render one still and confirm it reads before authoring any scene.**
5. **Build the persistent Level-HUD + N-tracker** (§2), frame-locked to `L`; make it SOLID at frame 0.
6. **Author each scene** = Panel `label` + hero pill (`MSlug`) + one mascot action + ≤1 payoff artifact, composed from the kit; **zone into rects, ground all scenery, single-hero declutter.**
7. **Audio:** synth the chiptune cues (numpy); keep cinematic risers into every payoff; clamp the frame-0 slam; add the transient brand beat; score VO 1.28 / bed 0.14 ducked to 0.045 at the hero-music beat.
8. **Validate by RENDERING** (Remotion is the only real gate on this box — `npx tsc` hits a decoy and is meaningless): render a **dense ~30-frame sweep across all scenes**, then run an adversarial critic on the *rendered frames* for occlusions/overlaps/floating scenery. Fix, re-render.
9. **Encode** through the mac-safe recipe + `alimiter=limit=0.91`; audit `volumedetect max_volume < 0 dB` and audio onset 0.0s.

## ⛔ Gotchas (each cost a build cycle on the reference reel)
- **`npx tsc` is a decoy on this box** (prints "not the tsc command you are looking for", exits 0) — there is NO local typescript. The ONLY validation is rendering; undefined refs surface as per-frame `ReferenceError`. Grep agent-written files for JSX tags that aren't defined anywhere before rendering.
- **Absolute-x props in a flex row all stack at one point** (§4) — place via `x={base+i*step}`.
- **Frame-0 must be solid** — header/HUD/hero opacity floored to 1; animate only a translateY settle. The first frame is the thumbnail + mute scroll-stopper.
- **Scenery floating** — every base at the ground line (~y700), not mid-panel.
- **Face over-decoration** — never overlay eyes/nose/mustache on the base Claude face (§3).
- **Music bed too hot** — a real song is much louder than a synth pad; 0.13–0.16 under a 1.28 VO, duck to ~0.045 at the hero-music beat, `alimiter` on the final encode.
- **Parallel overhaul agents can't see each other** — earlier phases must stay backward-compatible; only later phases depend on earlier-phase APIs. Each agent writes its component to a scratch file (no source-file races); splice with an anchor-based region splicer.
