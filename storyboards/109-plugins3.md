# STORYBOARD — REEL 109 PLUGINS3 (Stage 6)

> **Logline:** Claude Code alone hits three walls. Three free plugins knock each one down, on screen, as a mechanism you can watch.
> **Format:** single dark panel · clone the **108 MARKETING** chassis (`SlopKit` Bg/Panel/ProgressBar/KaraokeCaption/HookHeader/Mascot · `NomWorld` Scene/Cam/Mark/MarkPlate · `WorldKit` Surface/Occluder/Cone)
> **Arc:** **VILLAIN** — and there are two, each winning exactly once.
> **Villain:** **THE LIMIT**, a red shutter that slams across the road. Its RULE: it is never *removed*, only *routed around* — it is still standing, shut, at the end of S6. Second antagonist **THE WIPE** (session loss) wins at S8.
> **Hero cast:** the house clay `Mascot`. One LEAD Claude in all 11 scenes (the scale reference), plus crews of 3–10. All **12** costume levers cycled deterministically via `costumeFor(i)`.
> **World:** **THE ALL-NIGHT BUILD** — a machine hall where a build runs through the night. Every prop is one of the subject's own objects: repo cards, file crates with real filenames, plugin cartridges, provider logo tiles, token coins, session spools. Nothing on screen has to be translated before it means something.

**VO:** `video/public/vo_109plugins3.wav` — **31.65s**, 125 words, cut from a 37.73s raw take. Zero flubs in the raw (rare). Four boundaries, every one inside a silence MEASURED with `silencedetect=-40dB` — never a whisper word time. Cut file re-transcribed: clean. Captions `src/data/words_109plugins3.json`, 45 lines, 44 anchored to a measured RMS onset.

⚠️ **31.65s is over the 22–29s house range.** Flagged, not silently trimmed — every remaining second is speech, and the VO names three items so nothing can be dropped without a re-record. In line with recent deliveries (107 = 35.06s, 108 = 47.78s).

---

## ⛔ NUMBER SPINE — in order. Every value checked live **2026-08-18** against the GitHub API and each repo's own README.

| # | what the picture is allowed to print | source |
|---|---|---|
| 1 | `3 PLUGINS` | the VO |
| 2 | `anthropics/claude-plugins-official` · `★33,639` · `Apache-2.0` | GitHub API |
| 3 | `MCP · SKILLS · HOOKS · SUBAGENTS · COMMANDS` | the skill's own five scan categories |
| 4 | `RECOMMENDS · READ-ONLY` | the skill's own docs |
| 5 | `diegosouzapw/OmniRoute` · `★50,060` · `MIT` | GitHub API |
| 6 | `290 PROVIDERS · 90+ FREE` | README headline |
| 7 | `SUBSCRIPTION → API KEY → CHEAP → FREE` | README, the 4-tier cascade |
| 8 | `~1.53B FREE TOKENS / MO` + source plate `README · POOL-DEDUPED` | README |
| 9 | `thedotmack/claude-mem` · `★91,045` · `Apache-2.0` | GitHub API |
| 10 | `COMMENT CLAUDE` | the CTA |

Combined **★174,744**.

## ⛔ HERO ARTIFACT

**The three plugin cartridges seated in the rig's spine.** Three empty lit sockets at frame 0 of S0; three seated, lit and rolling at S10. It doubles as the frame-0 claim plate. Everything else is decoration.

---

## ⛔⛔ THE HONESTY LEDGER — three claims the picture must NOT print

| the VO says | what the source actually says | resolution on screen |
|---|---|---|
| *"to **10x** your productivity"* | nothing, anywhere, backs a multiplier | **UNBACKABLE — stays in AUDIO.** S3 draws the work ARRIVING (the ranked stack handed over, the bench lighting up, crew starting). **No `10×` plate, no multiplier, no numeral.** Guard: `MULTIPLIER_BANNED`. |
| *"literally gives Claude Code **unlimited** usage"* | the README never claims unlimited. Its own words are **"Never stop coding"** and **"never hit limits"**, delivered by a quota-aware **4-tier cascade** | **DRAMATISE THE MECHANISM.** S6 slams the limit shutter down and fires the cascade `SUBSCRIPTION ✗ → API KEY ✗ → CHEAP ✗ → FREE ✓`. **No `∞`, no "UNLIMITED" plate.** ⭐ The honest mechanism is also the better picture: "it's unlimited" is one motionless state; a shutter, a stall and a lane change is a scene with an arc. |
| *"you literally get **1.6 billion** tokens for free every month"* | README publishes **`~1.53B free tokens / month`** steady (up to ~2.15B in month one with signup credits), and says the figure is *re-audited every two weeks and moves both ways* | the receipt prints the repo's own **`~1.53B / MO`** with a `README · POOL-DEDUPED` source plate. **Audio and picture differ by ~5%** — flagged to Alex, fixable only by re-recording one word. |

✅ **`claude-setup` is accurate as spoken.** The skill genuinely scans the codebase and **recommends** across MCP servers / skills / hooks / subagents / slash commands, and its own docs say it is **read-only**. Printing `READ-ONLY` is both honest and the better picture (a scan + a ranking is an arc; "it installs it" is one event).

⛔ **OVERLAP FLAG:** `thedotmack/claude-mem` was plugin **#3 of reel 104 PLUGIN** (shipped 2026-08-13 at ★90,651). Same repo, five days apart. Not fixable without a re-record — build it, but S8/S9 must not reuse 104's staging.

---

## The eleven scenes

Onsets are **measured word starts** from `words_109plugins3.json`, with the picture leading by **4 frames** (0.133s) per house rule.

| S | t0 → t1 | dur | set | hue / lightness | beat |
|---|---|---|---|---|---|
| S0 | 0.00 → 1.73 | 1.73 | `bay` | indigo · **BRIGHT** (frame-0 law) | HOOK |
| S1 | 1.73 → 5.34 | 3.61 | `hold` | teal · mid-dark | SETUP |
| S2 | 5.34 → 8.90 | 3.56 | `shelf` | ochre · mid-bright | SETUP |
| S3 | 8.90 → 10.38 | 1.48 | `bench` | oxblood · dark | PAYOFF 1 |
| S4 | 10.38 → 13.52 | 3.14 | `lane` | steel-blue EXT · mid | TURN |
| S5 | 13.52 → 16.41 | 2.89 | `grid` | near-black · **DARKEST** | ESCALATE |
| S6 | 16.41 → 19.00 | 2.59 | `gate` | **RED** · dark | VILLAIN WINS |
| S7 | 19.00 → 22.33 | 3.33 | `mint` | gold · **BRIGHTEST body** | **PEAK** |
| S8 | 22.33 → 25.03 | 2.70 | `void` | cold grey · drained | VILLAIN 2 WINS |
| S9 | 25.03 → 28.16 | 3.13 | `drum` | green · mid-bright | PAYOFF 3 |
| S10 | 28.16 → 31.65 | 3.49 | `runlit` | amber · bright | CTA |

⛔ Every neighbouring pair differs in **both hue AND lightness** — the AGENCY bar. No shot under 0.7s. A new light + colour every 1.5–3.6s.

---

### SCENE 0 — 0.00 to 1.73s (1.73s) · LOCKED WIDE · **HOOK**
```
VO:       "Don't use Claude Code without these 3 plugins."
SET:      `bay` — a bright machine bay. Back wall = a lit board of spare cartridges.
          Deck = steel plate with three closed floor hatches. Gantry leg cropping
          the LEFT edge (the mass in front of the action). 5 depth planes.
CAMERA:   LOCKED. In-panel push 1.000 -> 1.055.
LIGHT:    hard overhead worklight from above-left + a warm practical on the rig.
          ⛔ The ONLY set built to the >=140 luma law. Target source ~146 so the
          delivered yuv420p file still clears 140.
BLOCKING: FRAME 0 IS THE WHOLE CLAIM, SETTLED — the RIG (430px dark spine) centre
          with THREE EMPTY LIT SOCKETS; LEAD Claude beside it at s=150 as the
          scale reference; a cream claim plate above reading CLAUDE CODE / 3
          PLUGINS with the Claude mark at 200px; three repo cards already floating
          in, each carrying its GitHub mark, owner/name, star count and licence.
          EVENT (before / trigger / travel / arrival):
            before  three empty sockets, three hatches shut
            trigger f6  the three floor hatches BANG open
            travel  f6-f20 three cartridges rise THROUGH the deck
            arrival f8 / f14 / f20 each LOCKS into the spine from below —
                    squash, expanding ring, dust puff, recoil; the spine lights
                    bottom-to-top like a fuse; LEAD flinches on every hit.
          ⛔ DELIBERATELY NOT reel 104's open (cartridges ejecting off a wall and
             slamming onto a counter). Different geometry (below, not across),
             different sound, and it plants the rig that pays off at S10.
SFX:      hatch clunk x3, pitched up the scale (LOW, never bright) + spine
          power-up + one sub on the third lock.
TAKEAWAY: three named, starred, licensed plugins — and a rig that is empty without them.
```

### SCENE 1 — 1.73 to 5.34s (3.61s) · LOCKED · **SETUP**
```
VO:       "First is Claude Setup, an official Anthropic plugin that scans your
           entire codebase"
SET:      `hold` — a teal cargo hold walled with ~70 FILE CRATES carrying REAL
          filenames: package.json · src/App.tsx · Dockerfile · tsconfig.json ·
          .env.example · api/routes.py · Cargo.toml · go.mod · README.md ...
          ⭐ The dense correct SET is the single biggest motion lever (7.68 -> 9.65).
CAMERA:   LOCKED. push 1.000 -> 1.070.
LIGHT:    teal key travelling WITH the gantry; the hold itself stays dark.
BLOCKING: EVENT — a SCAN GANTRY crosses the hold left to right across the full
          3.61s (the travelling band). ⛔ It alternates LIGHT AND SHADOW bands,
          never light-only: light-only scored 7.79 on reel 106 and lifted the
          black point 47.4 -> 56.1. As the beam passes each column the crates in
          that column FLIP OPEN and flare, and stay lit behind it.
          LEAD walks the aisle in front on a WORK loop, ducking as the gantry
          passes over. 3 crew on the mezzanine on PACE / HOP / LOOK.
          BACKGROUND PROCESS: a crate conveyor running along the floor, always on.
MARKS:    `anthropics/claude-plugins-official` MarkPlate at 190px; the Anthropic
          mark at 120px cast into the hold wall.
SFX:      gantry motor bed (low), a soft tick per column flip, no bright transient.
TAKEAWAY: it reads YOUR codebase, file by file — not a template.
```

### SCENE 2 — 5.34 to 8.90s (3.56s) · LOCKED · **SETUP**
```
VO:       "and recommends the best skills, subagents, and even MCP servers for
           your project"
SET:      `shelf` — an ochre sorting shelf with five labelled chutes, and the
          labels are the skill's OWN five categories:
              MCP · SKILLS · HOOKS · SUBAGENTS · COMMANDS
CAMERA:   LOCKED. push 1.000 -> 1.075.
LIGHT:    warm ochre from the shelf face; the aisle behind stays dark.
BLOCKING: EVENT — candidates FLY OUT of the scan and land in their chutes, twelve
          of them staggered across the FULL duration (⛔ never all inside the
          first third — that cost reel 104 a scene at 5.94). Real names, all from
          the plugin's own docs: context7 · Playwright · security-reviewer ·
          frontend-design · auto-format · /pr-review ...
          Then each chute's TOP TWO rise and take a lit bar — the ranking.
          LEAD receives at the shelf head; 4 crew loading.
TEXT:     ⛔ ONE chip only: `RECOMMENDS · READ-ONLY`. The chute labels are
          diegetic set dressing, not chips.
SHAPE:    this scene is a LIST/SORT. ⛔ S5 must be a CONVERGENCE so the two do
          not read as the same arrangement twice.
TAKEAWAY: it ranks the right ones for YOUR project, and hands them back.
```

### SCENE 3 — 8.90 to 10.38s (1.48s) · LOCKED · **PAYOFF 1**
```
VO:       "to 10x your productivity."
SET:      `bench` — dark oxblood bench, one hard practical overhead.
CAMERA:   LOCKED. push 1.000 -> 1.060 (short scene, faster ramp).
BLOCKING: EVENT — the ranked stack is HANDED to LEAD; it lands in his arms and he
          staggers under it; the bench light SNAPS on; three crew arrive in a
          stagger and start working (WORK loops with real swinging arms).
          ⛔⛔ NO `10x`. NO multiplier. NO numeral of any kind. The audio carries
             the claim; the picture carries the handoff. Guard: MULTIPLIER_BANNED.
SFX:      one low thud on the hand-off, light snap, tool loop starting.
TAKEAWAY: the setup work is already done when you sit down.
```

### SCENE 4 — 10.38 to 13.52s (3.14s) · LOCKED · **TURN**
```
VO:       "The second is OmniRoute, which literally gives Claude Code unlimited
           usage"
SET:      `lane` — EXTERIOR, steel-blue night, a raised roadway. Built on
          `WorldKit.Surface` (sky · haze · three parallax bands · ground · kerb ·
          grit · overhead) so it is a PLACE, not a backdrop. Gantry leg crops the
          LEFT edge in front of the action.
CAMERA:   LOCKED. push 1.000 -> 1.070.
LIGHT:    cold steel key + the rig's own warm headlights.
BLOCKING: EVENT — the RIG rolls on from the left carrying the three seated
          cartridges; the road stripes travel continuously beneath it (light AND
          shadow alternating); the repo card `diegosouzapw/OmniRoute ★50,060 MIT`
          SLAMS down as a lit hoarding beside the road at 250px.
          LEAD rides the cab; 3 crew aboard on different loops.
⛔ HONESTY: the header states the MECHANISM, never the word "unlimited".
TAKEAWAY: OmniRoute is a ROUTE. Its own noun is already a physical object — the
          free pass, and the reason this world needs no decoding.
```

### SCENE 5 — 13.52 to 16.41s (2.89s) · LOCKED · **ESCALATE**
```
VO:       "by connecting to over 200 AI providers to use for free."
SET:      `grid` — THE DARKEST SET IN THE REEL. A wall of provider tiles, lit
          only by the tiles themselves. ⛔ Never lift this palette; the light
          ARRIVES with the tiles.
CAMERA:   LOCKED. push 1.000 -> 1.075.
BLOCKING: EVENT — provider tiles light in a SWEEP across a 10x6 grid (60 tiles).
          TWELVE carry REAL marks at >=96px on white tiles: OpenAI · Gemini ·
          DeepSeek · Groq · Mistral · MiniMax · Qwen · xAI · Anthropic ·
          OpenRouter · HuggingFace · NVIDIA — all twelve named in OmniRoute's own
          README. The remaining tiles stay anonymous, because there are 290 and
          we can only name some: an honest picture, not a padded one.
          Then a cable from every lit tile CONVERGES into one endpoint plate `/v1`.
SHAPE:    CONVERGENCE — "many becoming one". ⛔ Distinct from S2's LIST/SORT.
RECEIPT:  `290 PROVIDERS · 90+ FREE`.
TAKEAWAY: 290 providers arrive behind one endpoint.
```

### SCENE 6 — 16.41 to 19.00s (2.59s) · LOCKED · **THE VILLAIN WINS**
```
VO:       "Then the moment you hit your limit, it swaps to the next best model."
SET:      `gate` — red-lit, dark, violent. The lane again but hostile.
CAMERA:   LOCKED. push 1.000 -> 1.080 (the hardest push in the reel).
BLOCKING: EVENT, in three moves:
            1  a red LIMIT SHUTTER SLAMS down across the lane. The rig's
               headlights die. The crew freeze. This is the thing every Claude
               Code user personally dreads — RECOGNITION, not motion
               (THE-OPEN law 3), placed where the VO puts it.
            2  the cascade fires, four tier plates in sequence:
                  SUBSCRIPTION x -> API KEY x -> CHEAP x -> FREE ✓
            3  the rig SWINGS hard into the free lane and blasts through.
          ⛔ THE SHUTTER IS LEFT STANDING, SHUT, BEHIND IT. The limit is never
             removed — it is routed around. That is the honest mechanism and the
             villain's integrity: it wins here, exactly once, and is never beaten
             twice.
SFX:      shutter slam (LOW, <250Hz), dead beat of near-silence, four tier ticks
          rising, then the engine catching. ⭐ Density PEAKS here and at S7.
TAKEAWAY: you hit the wall, and the route goes around it.
```

### SCENE 7 — 19.00 to 22.33s (3.33s) · LOCKED · **THE PEAK**
```
VO:       "You literally get 1.6 billion tokens for free every month."
SET:      `mint` — gold, the BRIGHTEST body set in the reel. The free lane opens
          into a minting hall.
CAMERA:   LOCKED. push 1.000 -> 1.075.
BLOCKING: EVENT — token coins POUR from 43 pool chutes, each chute faced with a
          provider logo, into a growing mound. A counter rolls UP and lands on
          `~1.53B FREE TOKENS / MO` with a small `README · POOL-DEDUPED` source
          plate under it. Beside the mound, a FOUR-COIN stack labelled
          `A HEAVY DAY` — same coin size, so the comparison is PROVED, not
          asserted (a pile does the arithmetic for you). Crew cheer on HOP loops.
⛔ HONESTY: the numeral is the repo's own audited figure, not the VO's rounded
   1.6B. The 5% gap is flagged in the honesty ledger above.
⛔ THE PEAK MUST BEAT THE HOOK — biggest, brightest, fastest scene in the reel.
TAKEAWAY: the number, sourced, with its scale proved.
```

### SCENE 8 — 22.33 to 25.03s (2.70s) · LOCKED · **VILLAIN 2 WINS**
```
VO:       "The third is Claude Mem. It gives Claude memory across all your
           sessions,"
SET:      `void` — cold blue-grey, drained. The build hall with the life taken out.
CAMERA:   LOCKED. push 1.000 -> 1.065.
BLOCKING: EVENT — the session ENDS: the crates, the ranked stack, the cards, the
          coins are all SUCKED off-frame in one fast sweep; the room goes cold and
          empty; LEAD is left alone in front of a blank board (⛔ he does not just
          stand — he turns, looks, and his shoulders drop). THEN a `claude-mem`
          spool drops in from above and starts turning.
RECEIPT:  `thedotmack/claude-mem ★91,045 Apache-2.0`.
⛔ Deliberately the quiet, dark beat before the last lift — motivated, in the last
   quarter, never in the belly. It still has to clear the motion floor, and the
   ERASE itself is a big fast event, so it does.
⛔ MUST NOT reuse reel 104's memory staging (labelled trays). This is an ERASE.
TAKEAWAY: without memory, every session starts from zero.
```

### SCENE 9 — 25.03 to 28.16s (3.13s) · LOCKED · **PAYOFF 3**
```
VO:       "so it remembers your projects and your files so you never re-explain
           anything again."
SET:      `drum` — green/mint, mid-bright. The spool room.
CAMERA:   LOCKED. push 1.000 -> 1.070.
BLOCKING: EVENT — the spool PLAYS BACK. Bars of context travel ACROSS a marked
          `SESSION 1 | SESSION 2` boundary (the house depiction for "it remembers
          across chats" — bars crossing a session boundary, never labelled trays)
          and REBUILD the board: the crates come back, the cards come back, the
          ranked stack lands again, staggered across the FULL 3.13s.
          LEAD opens his mouth to re-explain — a speech bubble rises and is
          CANCELLED with a struck-through line. He never says it.
TAKEAWAY: the room rebuilds itself and you brief nobody.
```

### SCENE 10 — 28.16 to 31.65s (3.49s) · LOCKED · **CTA**
```
VO:       "If you want to try these for free, comment CLAUDE for the full setup."
SET:      `runlit` — amber, bright, the payoff. The road at speed.
CAMERA:   LOCKED. push 1.000 -> 1.070.
BLOCKING: EVENT — the RIG RUNS with all three cartridges seated and lit, the road
          travelling under it; the whole crew aboard — 10 sprites, 5 columns,
          190px pitch (⛔ spacing >= 0.85 x (rA + rB), computed before the count);
          the three repo cards ride as hoardings; the `COMMENT CLAUDE` plate lands
          with a stamp, Claude mark at 260px.
TAKEAWAY: the keyword.
```

---

## The three floors (§2 of the spec) — stated, so they are checkable

1. **Every scene is a real place.** Eleven named sets, each with ≥4 depth planes, one committed light direction, world props and an `Occluder` mass cropped by the frame edge in front of the action. Two exteriors (`lane`, `gate`) use the promoted `WorldKit.Surface` depth engine rather than a hand-built gradient — the thing nine reels shipped without.
2. **The camera is disciplined.** Every scene is LOCKED with only the house in-panel push (1.00 → 1.055–1.080). Zero re-framing moves. One subject moves at a time; the background process is furniture.
3. **The arc has a shape and the payoff is not spent early.**
   `9 → 6 → 7.5 → 8 → 7 → 8.5 → 9 → 10 → 6.5 → 9 → 9.5`
   No belly sag (the middle third runs 7 → 8.5 → 9 → **10**). The peak (S7) beats the hook. Each villain wins exactly once.

## The adversarial critic pass (§3 — mandatory)

| check | result |
|---|---|
| **Swipe points 0–5s** | 0.00 claim settled · 0.20 hatches bang · 0.47 lock 1 · 0.67 lock 2 · 0.87 lock 3 + spine fuse · **1.73 hard cut to a different room** · 2.20 gantry enters · 3.00 first crate column flips. No "I've seen this" repeat. |
| **Repeated base-object** | ⚠️ CAUGHT: S2 (chutes of tiles) and S5 (a wall of tiles) were the same arrangement twice. **Rewritten** — S2 is a LIST/SORT that fans into five, S5 is a CONVERGENCE that collapses into one `/v1`. Different sentence, different shape. |
| **Payoff spent early** | No. The token mound is at 19.0–22.3s, 60–70% in. |
| **Villain integrity** | THE LIMIT appears once (S6) and wins. THE WIPE appears once (S8) and wins. Neither loses twice. |
| **Intensity curve** | plotted above; no sag, peak beats hook. |
| **Mirror violation** | n/a (not split-screen). |
| **⚠️ S0 vs S10 bookend** | Deliberate, not a repeat: empty sockets in a static bay → seated cartridges on a moving road. Different set, framing, light and action. |

## ⛔ The build-time traps this board is written against

- `Scene`'s push crops progressively — keep `left >= 506 - 486/push`.
- A transformed wrapper with **no `zIndex` vanishes** — use `Cam`, which carries an explicit z.
- Anything passed as `children` sits **under** the `z97` vignette; frame-wide effects go in the `overlay` slot.
- `HookHeader` and claim plates are **1080×1920 FRAME** coords, not the 1012×792 panel.
- `dark()` / `mix()` are hex-in/rgb-out and **do not nest** — use `dkh` / `mxh`.
- Object size floor **≥40px** on the short side, or it vanishes in the audit's 1012→240 downsample.
- Every timed effect converted to **root seconds** and checked against its own scene's length before it is called done.

## Related
`docs/ANIMATION-QUALITY.md` (the craft doc — §2 events, §3 containers, §5 action loops, §9 density) ·
`docs/THE-OPEN.md` (frame 0) · `docs/SOUND-DESIGN.md` (the SFX bank) ·
`memory/reels/plugin-factory-log.md` (reel 104 — same subject family, eleven rounds) ·
`STORYBOARD-SPEC.md` (this contract)
