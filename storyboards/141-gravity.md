# STORYBOARD — REEL 141 GRAVITY (Stage 6) · **REV 2**

> ⛔⛔ **REV 1 WAS REJECTED ON TWO NOTES AND THIS BOARD IS THE ANSWER TO BOTH.**
> Alex: *"there is too long of a pause in between sentences here and the animations
> are not good like when i see antigravity in VS Code i should see like an actual
> super realistic browser etc here and the hook animation needs to be way way way
> more interesting here concept scrap it and redo."*
>
> **1. The pauses.** Rev 1's joins carried 0.26 / 0.33 / 0.25 / 0.18 / 0.52s of
> dead air. Rev 2 rebuilt the VO in one pass from the raw against MEASURED
> audible-speech bounds (55ms head, 75ms tail), then trimmed the three runs that
> were still long **from their middle** — the head of a gap is the previous word's
> decay and the tail is the next word's breath, so cutting either clips a word.
> Joins are now ~0.13-0.14s and the reel is **21.24s**.
>
> **2. The product was never on screen.** Rev 1 drew the subject SYMBOLICALLY:
> drawer units with a VS Code sticker standing in for "your setup", a wooden sign
> standing in for the Marketplace, gas canisters standing in for the model list.
> That is [[feedback_illustrating_the_noun_is_the_trap]] wearing a workshop
> costume. Rev 2 adds `GvtCode.tsx`, a real VS Code window drawn to the actual
> Dark+ theme — activity bar, explorer tree with indent guides, tab strip with its
> active-tab top border, line-number gutter, syntax-coloured TypeScript, minimap,
> blue status bar with branch and Ln/Col — and the Extensions view, the Install
> button, the Antigravity side panel and the model picker are all the real thing.
>
> **3. The hook was scrapped.** Rev 1's mechanism was INVERSION and its object was
> a drawer unit. Rev 2's mechanism is **TAKEOVER** and its object is the editor:
> a wall of VS Code windows, the Antigravity mark strikes onto the hero's activity
> bar, its panel splits open and a diff rips down the file, and the same thing then
> ripples across all eight on the wall.

# STORYBOARD — REEL 141 GRAVITY (rev 1 record below)
> **Logline:** the editor you already use grows a second, upside-down half, and Google's Antigravity moves into it — so the thing everyone said would replace VS Code now hangs from its ceiling.
> **Format:** single dark panel · clone the 137 REPOS chassis (`SlopKit` chrome, `WorldKit` depth primitives, `SoundKit`). Prefix **`Gvt`**.
> **Arc:** TRANSFORMATION (rivalry → coexistence). The room itself is what transforms: it starts with one floor and ends with two.
> **Villain:** ONE, named and physical — **THE MOVE**. Its RULE: *it makes you carry everything you own into another building.* Crates, a dolly, a tape gun, a far door. Undefeated until S6, where the crates go back down and the other building comes to you instead.
> **Hero cast:** **YOUR CLAUDE** (house clay, never tinted, always planted on the DOWNSIDE floor — he never flies) · **THE RIGGERS** (crew Claudes in `constr` hard hats, on the floor) · **THE HANGERS** (small Claudes working inverted on the UPSIDE, feet on the ceiling).
> ⛔ **NUMBER SPINE:** Antigravity · VS Code · Google · Aug 20 2026 · 5 IDEs (VS Code · Visual Studio · Zed · JetBrains · Xcode) · v1.2.0 · **208,494 installs** · **$0** · Gemini 3.8 Flash · Gemini 3.1 Pro · Claude Sonnet 4.6 · Claude Opus 4.6 · gpt-oss-120b · unlimited tab completions · GRAVITY.
> ⛔ **HERO ARTIFACT:** **THE DOUBLE-DECKER EDITOR** — one window carrying BOTH marks on its title bar, floor content below and Antigravity's agent panel hanging above it, with the model list lit. Withheld until S11, held through S12. Everything before it is the road to it.

**VO** `~/Downloads/GRAVITY sep 6.m4a` (78.81s raw) → `video/public/gravity141_vo.wav` **23.18s / 695 frames**.
Fifteen `cut cut` flubs removed — the take is six keeper sentences buried in eleven false starts, four of which begin with the same three words. ⛔ A whole-file pass reads clean; the raw was chunked at every measured silence and each chunk transcribed alone, which is the only thing that shows a retake as a duplicate opening. Every join sits in measured room tone (all 12 window edges below −42 dB, ~0.26s at each sentence boundary), lead trimmed to 0.045s so word 1 is frame 1.
⚠️ **Tempo is a SLOW-DOWN, not the house ×1.10.** Alex delivered this one at 4.29 wps against a 3.96 house anchor, so it is piecewise ×0.92 with the two dense lines pulled further back (the model list ×0.856, the "few months ago" line ×0.835). Result: **hook 0-10s 3.60 wps · worst 5s window 4.40 · overall 3.72 · 23.18s**, inside the 22-29s house range.

---

## THE NUMBER SPINE — verified live 2026-09-06

| figure | value | source |
|---|---|---|
| **what launched** | Antigravity **IDE Extensions** — VS Code, Visual Studio, Zed, JetBrains, Xcode | antigravity.google/blog/antigravity-ide-extensions |
| **launch date** | **August 20, 2026** | same |
| **marketplace id** | `Google.google-antigravity`, publisher **Google** | VS Marketplace |
| **installs** | **208,494** · **v1.2.0** · updated **Aug 31 2026** · 3.5★ (32 reviews) · listed **Free** | VS Marketplace |
| **free plan models** | "Gemini 3.8 Flash, Gemini 3.7 Flash, Gemini 3.6 Flash, Gemini 3.1 Pro, **Claude Sonnet & Opus 4.6**, **gpt-oss-120b**" | antigravity.google/pricing |
| **free plan allowance** | "Unlimited Tab completions", "Unlimited Command requests", "Basic weekly rate limits" | same |
| **what the panel does** | side-panel agents, **inline diffs**, **interactive plans**, multi-step tasks without leaving the editor | antigravity.google/docs/ide/extensions/vscode |
| **install path** | `Cmd+Shift+X` → search "Google Antigravity" → Install → Activity Bar icon; auto-installs the local **`agy`** backend | same |

**Spoken vs shown.** The VO says *"models like Gemini, Claude Opus, Claude Sonnet, and GPT."* The frame shows the pricing page's own strings — `GEMINI 3.8 FLASH`, `GEMINI 3.1 PRO`, `CLAUDE SONNET 4.6`, `CLAUDE OPUS 4.6`, `GPT-OSS-120B` — and never a bare "GPT", because the free-tier entry is the open-weights one. The VO says *"official"*; the frame shows the publisher row **`Google`** and the verified tick that the marketplace actually renders. No claim about speed, quality or rate limits is spoken or drawn; the only allowance shown is the one the pricing page prints.

**Real marks, all in `video/public/logos/`:** `vscode.svg` (fetched 2026-09-06, simple-icons) · `antigravity.png` (512² RGBA, the org avatar, already used on reel 116) · `google.svg` · `googlegemini.svg` · `claude.svg` · `openai.png` · `jetbrains.svg` · `zed.svg` · `visualstudio.svg` · `xcode.svg`. ⛔ No invented glyph anywhere. VS Code's monochrome path is filled house-blue; Antigravity's PNG is used as-is on a white tile.

---

## THE WORLD: **THE DOUBLE FLOOR** — one workshop with two gravities

The script turns on the word **INSIDE**. The place where "inside" is the whole event is a room that grows a second half. So: a working bay with a floor you stand on and a *ceiling you can also stand on*, and one wall shared between them.

| | **DOWNSIDE** = VS CODE | **UPSIDE** = ANTIGRAVITY |
|---|---|---|
| ground | gridded steel deck, everything bolted | the same deck, inverted, overhead |
| light | cold key from the left, deep navy shadow | warm amber wash, it is the lit board of the frame |
| colour | `VSC #3E7FC1` on gunmetal `#2A3340` | `AGV #E7B24C` on bone `#EDE4D2` |
| who is there | YOUR CLAUDE + the riggers, feet down | the hangers, feet UP, working upside down |
| what hangs | cable trays, chain hoists | agent panels, plan cards, diff sheets |
| its mark | `vscode.svg`, on the floor-side wall plate | `antigravity.png`, on the ceiling-side wall plate |

**Every element maps. No row is decoration.**

| on screen | what it actually is |
|---|---|
| the DOWNSIDE deck with everything bolted to it | your existing VS Code setup |
| the UPSIDE deck overhead, lit, out of reach at f0 | Antigravity — a real place, but a different building |
| thirty drawer units letting go of the floor and rising | the extension: the second gravity now works *in here* |
| the crates, the dolly, the tape gun, the far door | **THE MOVE** — switching editors |
| the crates set back down, unopened | you do not have to switch |
| the whole UPSIDE rig descending on cables and DOCKING onto the shared wall | "bring Antigravity's AI coding experience into VS Code" |
| the socket unit clicking into the wall rail | the extension install |
| the counter rolling to 208,494 | how many people already did it |
| the price plate cutting to `$0` | the free plan |
| five canisters seating into the manifold, each a real model mark | the free-tier model list |
| two buildings across a gap, one dark and one lit, a wrecking line between | "people were saying VS Code was getting replaced" |
| the two buildings sharing one wall, both lit, one skyline | "they're basically sitting together now" |
| the double-decker editor window with both marks on its bar | the CTA payoff |

⛔ **Rejected worlds, and why:** a tuning garage (**137 REPOS owns it**, three weeks old) · a build line (134) · a playhouse (135) · a night street (94/133) · a courtroom (132) · a toll row (131) · an arcade (124) · a gym (110) · an armory (69) · a factory (37) · **a rocket launch pad** (antigravity's obvious metaphor, and [[feedback_the_obvious_metaphor_is_often_wrong]] — a launch is about LEAVING, and this whole reel is about NOT leaving) · **a laptop on a desk** (a container, not a place).

⚠️⚠️ **THE PARALLEL BUILD HAPPENED, AND IT TOOK THE NUMBER.** A second VO, `INTENT Sep 6.m4a`, landed three minutes after this one, and a second session started building from it. Both sessions took **140**. Checked at delivery time, `video/src/ClaudeIntent140Reel.tsx` was written at **19:14:39** and this reel's index at **19:22:07**, so INTENT registered first and keeps 140 per [[feedback_reel_number_is_not_a_lock]]. **GRAVITY is 141**, re-verified free in all three places (Drive folder list, `video/src/Claude*141*.tsx`, `chenmedialabs/tools/manifest.json`) before the rename.
⭐ **The picture check passed.** The worse half of a number collision is two reels that look the same (AGENTS 134 and AGENCY 135 measured fine alone and were one reel posted twice). INTENT is about `intent.md`, a spec file written before anyone designs or codes; its world is a hall and a slab of section headings. This reel is a two-gravity workshop about an IDE extension. No shared object, no shared mechanism, no shared arc.

---

## THE DENSITY DEVICE — `GvtSets.RigWall`, built before any scene

A **10×3 grid of FOUR different hand-drawn objects** on rails, dressed into every body scene, taking their hues from the one colour table. Deliberately different silhouettes:

| # | object | silhouette | why it belongs here |
|---|---|---|---|
| 1 | a coiled cable loop on a peg | **CIRCLE** | a workshop wall |
| 2 | a strut brace, hung at a slant | **DIAGONAL** | the only diagonal in a room of right angles |
| 3 | a toothed clamp rack | **FINE REPEATED TEETH** | the detail band |
| 4 | a rigger Claude on a hook, legs dangling | **SMALL CHARACTER** | population without a second idea |

⭐ **The world-specific twist:** in this room the wall's sway is a **FLOAT** — each object bobs on its own clock and hangs a beat too long at the top, because gravity here is unreliable. That is the one motion that says ANTIGRAVITY without a caption saying it.
⛔ Per [[feedback_the_density_device]]: lighter and shorter in the frame-0 scene only (it must not drag f0 luma under 140), and **a different seed AND row count per cut** so an identical wall does not eat the dHash separation.

---

## THE HOOK — mechanism word: **INVERSION**

Checked against every word already shipped (RELEASE · DEMOLITION · POSSESSION · SUMMONS · REVELATION · ACCUMULATION · EXCHANGE · MULTIPLICATION · SUBTRACTION) — **INVERSION is new**, and it is not "something comes toward you", which is the verb nine rejected hooks shared.

**Why it is the right word:** the product is called *Antigravity*. Its own name is a force. The hook does not illustrate a noun (an editor, a panel, a logo); it runs the force, on the viewer's own room, with the product's real mark already in frame.

**The four-part event, in one framing:**

| part | what happens |
|---|---|
| **BEFORE** | the DOWNSIDE bay, thirty drawer units bolted to the deck, each stencilled with the VS Code mark. Overhead, the lit UPSIDE deck and the Antigravity mark, out of reach. The units **tremble**, climbing 1.2 → 6.5 px across the shot — settled means AT REST, NOT INERT |
| **TRIGGER** | the deck clamps throw, all thirty at once — one hard metal release |
| **TRAVEL** | thirty units let go of the floor and **rise past the hero in one wave**. He does not move. All the motion in the frame is thirty copies of ONE object |
| **ARRIVAL** | they seat into the UPSIDE deck in an inverted grid, and the room now reads with a floor AND a ceiling of the same thing |

**Hierarchy, to the house definition:** YOUR CLAUDE is dead centre, **still**, at **3.6× a drawer unit**, and carries no motion of his own beyond a breath and a head tilt as the wave passes. The motion is 100% the repeated object. Twenty copies of one object is one idea, so the frame never splits.

**Frame 0 is the claim plate and the thumbnail.** The lit UPSIDE deck is the LIT BOARD that carries the mean (≥140 luma), the gunmetal DOWNSIDE mass carries the saturated body, and the open drawer voids carry the near-black spread. The Antigravity mark is **in frame at f0** — this is not a reveal hook, so the cover IS its subject ([[feedback_a_reveal_hook_must_not_hide_its_own_subject]]).

**Three cuts = three hook COMPONENTS, never three grades** ([[feedback_three_cuts_three_hooks_fix_all_three]]):

| cut | word | what changes |
|---|---|---|
| **house** `rise` | **INVERSION** | the floor lets go and thirty units rise past a planted hero |
| **amber** `drop` | **DESCENT** | the UPSIDE deck comes DOWN on cables onto a bay that has to make room — the hero braces under it |
| **steel** `split` | **CLEAVE** | one deck **splits along its middle seam** into two decks that separate, and the crew is suddenly working on both faces |

Each gets its OWN cue bank keyed to its OWN beat frames. ⛔ Never one shared bank — the beats do not line up across three different events.

---

## THE SCENE CARDS

⛔ Every boundary below sits in a **measured** gap after the sentence-final word's **true** end, not on a stored word end (stored ends run 11-20 frames early here; S0's "Code." stores at f55 and really ends at f66). Safe windows measured off the mix: S0 f68-71 · S1 f171-176 · S2 f307-309 · S3 f455-456 · S4 f640-651.

| # | frames | dur | shot | beat |
|---|---|---|---|---|
| S0 | 0-38 | 1.27s | WIDE, locked | HOOK A |
| S1 | 38-70 | 1.07s | LOW 3/4, locked | HOOK B |
| S2 | 70-128 | 1.93s | MID, slow push | SETUP |
| S3 | 128-173 | 1.50s | CLOSE on the socket | SETUP |
| S4 | 173-214 | 1.37s | WIDE, locked | TURN — the villain |
| S5 | 214-248 | 1.13s | LOW, tilt up | TURN |
| S6 | 248-308 | 2.00s | WIDE, locked | TURN — the dock |
| S7 | 308-357 | 1.63s | MID, locked | ESCALATE |
| S8 | 357-456 | 3.30s | WIDE, locked | ESCALATE — 4 arrivals |
| S9 | 456-517 | 2.03s | LONG, locked | FLASHBACK |
| S10 | 517-583 | 2.20s | MID, locked | FLASHBACK |
| S11 | 583-645 | 2.07s | WIDE, slow pull | PAYOFF |
| S12 | 645-695 | 1.67s | MID, locked | CTA |

Shot sizes never repeat adjacently. Only **three** scenes move (S2 push, S5 tilt, S11 pull) and every one is motivated. Minimum shot 1.07s, floor is 0.7s.

---

### SCENE 0 — 0.00 to 1.27s (38f) · WIDE, LOCKED · HOOK
- **VO:** "So you can now use Antigravity"
- **SET:** THE DOUBLE FLOOR, downside. Six depth planes: (1) near-camera crew band, two riggers cropped by the bottom edge · (2) the thirty bolted drawer units, 10×3, VS Code mark stencilled on each · (3) YOUR CLAUDE, centre, planted · (4) the `RigWall` on the back wall, short row count here · (5) the shared wall with both plates · (6) the lit UPSIDE deck overhead, amber, with the Antigravity mark. Cold key from the left, one warm bounce from above.
- **CAMERA:** locked wide. No move. The event is the room's, not the lens's.
- **BLOCKING:** everything still except the tremor. Units shiver 1.2 → 6.5 px. At f22 the clamps throw; f24-38 the first rank lifts off. He does not move — a breath and a 4° head tilt as the wave starts.
- **LIGHT:** the amber ceiling is the LIT BOARD (carries the ≥140 mean); the gunmetal deck is the saturated mass; the drawer voids are the near-black holes.
- **SFX:** `stage_hum` bed from f0 · a rising tick per tremor step f6/f12/f18 at TEXTURE · **the clamp release f22** `mech_clank` at HERO + `sub` · the lift-off wave f24-38, `metal_ping` ×3 pitched up.
- **TAKEAWAY:** the force is real, it is in *this* room, and it is called Antigravity.

### SCENE 1 — 1.27 to 2.33s (32f) · LOW 3/4, LOCKED · HOOK
- **VO:** "inside VS Code."
- **SET:** same bay, camera dropped to deck height and swung 30°, so the shared **wall plate** fills the upper third: `vscode.svg` on the floor side, `antigravity.png` on the ceiling side, **touching**. The rising units stream through the frame behind.
- **CAMERA:** locked. The change of framing IS the cut.
- **BLOCKING:** the last rank of units seats into the UPSIDE deck at f52-60. The hero, still planted, is now a silhouette against the lit ceiling. A hanger Claude walks upside down across the top edge, f44-70 — the first time a body reads the second gravity.
- **LIGHT:** rim from above; the hero goes near-black against the amber and carries the value spread.
- **SFX:** three seat-clicks f52/f56/f60, `thock` pitched down, MID → TEXTURE.
- **TAKEAWAY:** the two marks are on one wall. That is the claim, stated as an image.

### SCENE 2 — 2.33 to 4.27s (58f) · MID, SLOW PUSH · SETUP
- **VO:** "Google just launched its official Antigravity"
- **SET:** the shared wall, closer. A marketplace **listing board** bolted to it, drawn as shop signage, not a screenshot: the Antigravity tile, the publisher row `Google` with the verified tick the marketplace really renders, `v1.2.0`, `Aug 31 2026`. The `RigWall` floats behind at full row count.
- **CAMERA:** slow push, 1.00 → 1.06 over the scene. Motivated: we are reading a plate.
- **BLOCKING:** two riggers hoist the board into its bracket f70-86; it **lands and settles** f88. The `google.svg` mark strikes into the publisher row f96-104. The verified tick snaps on f108.
- **LIGHT:** the board is the brightest thing; the bay falls off behind it.
- **SFX:** hoist ratchet f70-86 at TEXTURE · the board seating f88 `mech_clank` HERO · the mark strike f96 `metal_ping` MID · the tick f108 `c_1up` TEXTURE.
- **TAKEAWAY:** this is Google's own, not a community port.

### SCENE 3 — 4.27 to 5.77s (45f) · CLOSE ON THE SOCKET · SETUP
- **VO:** "extension for VS Code."
- **SET:** hard close on the wall **rail and socket** — the extension made physical. A cartridge carrying the Antigravity mark, a keyed slot, four contact pins, the install counter on a mechanical split-flap beside it.
- **CAMERA:** locked close. First close of the reel; it lands because the object is small and specific.
- **BLOCKING:** the cartridge travels in from the right f128-146, keys, and **seats** at f148 with a quarter-turn. Contacts light in sequence f150/f153/f156/f159. The split-flap counter rolls and stops on **208,494** at f164-171.
- **LIGHT:** one hot pool on the socket, everything else falls to near-black — this is the frame that carries the reel's black point.
- **SFX:** the travel f128-146 is silent except the bed · **the seat f148** `mech_clank` HERO + `sub` · four contact ticks f150-159 TEXTURE · the flap counter f164-171, a short mechanical flutter at MID, landing on the number.
- **TAKEAWAY:** it installs like a part, and 208,494 people already fitted it.

### SCENE 4 — f149-188 (39f) · WIDE, LOCKED · TURN (the villain)
> ⛔ **REV 7 — REBUILT.** Alex: *"even at 5 seconds when I say switching to another
> editor it should show like diff logos switching between."* The dolly-of-crates was
> a picture of MOVING HOUSE; the sentence is about the ACT OF SWITCHING.
- **VO:** "And instead of switching to another editor,"
- **SET:** the bay, with an editor picker mounted on the wall — a rail of **five real marks** from `public/logos/`: VS CODE · CURSOR · WINDSURF · ZED · JETBRAINS. ⛔ Antigravity is deliberately **not** in the rail: the line is "*instead of* switching", so the rail is the alternatives.
- **CAMERA:** locked wide on the rail, push 1.03.
- **BLOCKING:** the selection **steps on the words** — f163 "switching" leaves VS Code, f168 "to", f172 "another", f175 — and then on f179 "editor," it **snaps back to VS Code**. An aborted switch, which is what "instead" means. Your setup is dragged after it on a 4-crate stack and **topples** on the snap.
- **LIGHT:** the picker is the only lit object; the crowd behind it is in the bay's ambient.
- **SFX:** four selection ticks at TEXTURE, pitch rising · **the snap-back f179** `thock` HERO, dead stop.
- **TAKEAWAY:** the cost of the other editor is the move, and you never actually make it.

### SCENE 5 — 7.13 to 8.27s (34f) · LOW, TILT UP · TURN
- **VO:** "you can bring Antigravity's"
- **SET:** back inside, low on the deck. The crates are being set DOWN, unopened, tape still on. Above them the shared wall runs up out of frame toward cables that go taut.
- **CAMERA:** the reel's one tilt — from the crates on the floor up the wall to the cables. Motivated: we are following a load that has changed direction.
- **BLOCKING:** f214-226 crates land, three of them, staggered. f226-248 the cables above snap taut one after another and the frame gives up its top edge to something large arriving.
- **LIGHT:** the amber from above grows across the tilt as the UPSIDE enters frame.
- **SFX:** three crate-downs f214/f219/f224, `thock` MID, pitch falling · cable snap-taut f230/f236/f242, `metal_ping` MID rising.
- **TAKEAWAY:** nobody is carrying anything out. Something is coming in.

### SCENE 6 — 8.27 to 10.27s (60f) · WIDE, LOCKED · TURN (the dock)
- **VO:** "AI coding experience into VS Code."
- **SET:** the full bay, both decks in frame. The entire UPSIDE rig — inverted bench, hanging agent panels, plan cards, diff sheets — descends on four cables and **docks** onto the shared wall.
- **CAMERA:** locked wide. The biggest event in the reel gets the stillest camera.
- **BLOCKING:** the rig descends f248-282 with real weight (it decelerates, overshoots 9 px, settles). **Dock at f284.** Then the three things the panel actually does arrive one per beat: an **agent panel** lights f288, an **inline diff** slides open f294 (red/green gutter, real), an **interactive plan card** unfolds f300. Hangers walk on the new ceiling. YOUR CLAUDE, still on his own floor, looks up.
- **LIGHT:** at f284 the bay's key changes — the amber now falls *inside* the room. The whole set re-lights on the beat.
- **SFX:** cable strain f248-282 at BED, rising · **the dock f284** `mech_clank` HERO + `sub` at full · three arrivals f288/f294/f300, `metal_ping` → `chrome_shine` → `thock`, MID and falling so the sentence-final "Code." is clear.
- **TAKEAWAY:** you did not move. The other editor's whole rig is now hanging in yours.

### SCENE 7 — 10.27 to 11.90s (49f) · MID, LOCKED · ESCALATE
- **VO:** "And the crazy part, the free plan gives you access"
- **SET:** the bay's **price plate** — a mechanical board on the shared wall, the kind a dock uses for tonnage. Beside it the two allowance strips the pricing page actually prints: `UNLIMITED TAB COMPLETIONS`, `UNLIMITED COMMAND REQUESTS`.
- **CAMERA:** locked mid.
- **BLOCKING:** the plate's digits are spinning at f308, still resolving. At f330 they **stop on `$0`** and the two strips snap in beneath, f338 and f346. A rigger looks at the plate and then at camera.
- **LIGHT:** the plate is lit green (`GREEN #3F9E74`) against the amber room — the reel's one green, spent here.
- **SFX:** digit flutter f308-330 at TEXTURE · **the stop f330** `thock` HERO · two strip snaps f338/f346 MID.
- **TAKEAWAY:** the number is zero, and it is the page's own number.

### SCENE 8 — 11.90 to 15.20s (99f) · WIDE, LOCKED · ESCALATE (four arrivals)
- **VO:** "to models like Gemini, Claude Opus, Claude Sonnet, and GPT."
- **SET:** the **MANIFOLD** — a five-socket rack on the docked rig, each socket keyed for one canister. Every canister is a **real mark on a white tile**: `googlegemini.svg`, `claude.svg` ×2, `openai.png`. The line above each socket lights as it seats.
- **CAMERA:** locked wide. ⭐ This is a HOLD, and a hold needs **arrivals, not travel** — four of them, scored against the scene's own floor.
- **BLOCKING:** four canisters swing in and seat, each on its own spoken word, each with a different entry so the beat never repeats: **GEMINI 3.8 FLASH** drops from above f374-383 · **CLAUDE OPUS 4.6** slides in from the left f391-406 · **CLAUDE SONNET 4.6** rises from the deck f417-432 · **GPT-OSS-120B** swings in on a boom f438-448. The fifth socket stays open and lit — the list is longer than the sentence.
- **LIGHT:** each socket adds its own lamp, so the frame gets measurably brighter with every arrival. The room's value climbs across the shot.
- **SFX:** four seats at f383/f406/f432/f448 — `mech_clank` HERO, pitched **down** each time so four identical events do not read as one repeated event · a token-drop `c_1up` at TEXTURE on the fourth only.
- **TAKEAWAY:** four rival labs' models, in one rack, on the free plan.

### SCENE 9 — f420-477 (57f) · LONG, LOCKED · FLASHBACK
- **VO:** "So it's crazy how a few months ago people were saying"
> ⛔ **REV 7 — REBUILT TWICE.** Alex: *"even at 15 seconds it's not interesting
> enough either."* Two lit towers and a crowd on a gantry was a **poster of** a
> rivalry, not the rivalry happening. The sentence is "people were SAYING X", i.e.
> an OPINION MOVING, so it is now a **balance** and the crowd is the load.
> ⛔ The first rebuild hung the pans in the air and walked the crowd along the deck
> *underneath* them — the tip then had no visible cause. The pans now hang at deck
> height and the crowd walks **out of one pan and into the other**: the mechanism
> and the load are the same object, which is the only way an action reads.
- **SET:** exterior, dusk yard. A balance on a knife-edge fulcrum, the **real VS CODE mark** on the left pan and the **real ANTIGRAVITY mark** on the right, four lamps on the line behind, and the density wall at 2 rows.
- **CAMERA:** locked long, push 1.03.
- **BLOCKING:** six bodies commit at f424/431/438/445/452/459, each crossing over 15f. The beam starts tipped **VS Code's way** (−2°) and ends **16°** the other way. ⛔ No date and no duration is drawn anywhere: "a few months ago" could not be sourced, so nothing on screen claims one.
- **LIGHT:** dusk sky over a sodium wash off the deck — lit, not the near-black the rev-5 version was.
- **SFX:** crowd murmur at BED · six footfalls at TEXTURE, pitch falling as the pan drops.
- **TAKEAWAY:** the opinion moved; it was never a fact.

### SCENE 10 — 17.23 to 19.43s (66f) · MID, LOCKED · FLASHBACK
- **VO:** "VS Code was getting replaced by Antigravity,"
- **SET:** closer on the VS Code parapet: its mark, and a **REPLACED** banner being hauled across it by the crowd. The wrecking ball fills the right edge, near-camera, cropped by the frame — the `Occluder` mass.
- **CAMERA:** locked mid.
- **BLOCKING:** the banner hauls across f517-556 and reaches the far post. At f562 the ball **arrives** — and stops dead a hand's width from the wall, held. It never lands. ⛔ The claim being dramatised is what people *said*, so the destruction is staged and withheld; nothing in the reel shows VS Code damaged, because nothing did.
- **LIGHT:** hard blue key, the ball black against it.
- **SFX:** banner haul f517-556, rope at TEXTURE · **the ball's stop f562** `sub` HERO with no impact layer — weight without a hit.
- **TAKEAWAY:** the replacement was the story everyone told.

### SCENE 11 — 19.43 to 21.50s (62f) · WIDE, SLOW PULL · PAYOFF
- **VO:** "and they're basically sitting together now."
- **SET:** the same exterior, but the gap is **gone**: the two buildings share one wall, both lit, one skyline. The wrecking ball is being winched away, small, at the top edge. And in the near ground, big, the **HERO ARTIFACT** — the double-decker editor window, both marks on its title bar, floor content below and the Antigravity panel hanging above, the model list lit down its side.
- **CAMERA:** the reel's one pull-back, 1.06 → 1.00, opening onto the joined skyline. Motivated: the payoff is that there is MORE in frame than there was.
- **BLOCKING:** f583-604 the two façades slide together and meet; f606 the shared wall lights through. f610-630 the artifact settles into the near ground and its title bar takes both marks. The crowd on the gantry has put the placards down.
- **LIGHT:** blue on the left half, amber on the right, one continuous top rim across both — the value proof that they are now one building.
- **SFX:** the façades meeting f604 `mech_clank` MID (not HERO — the payoff is quiet, the dock at f284 was the loud one) · the wall lighting f606 `chrome_shine` TEXTURE · nothing after f612, so "together now." lands clean.
- **TAKEAWAY:** it was never replacement. It is one building with two floors.

### SCENE 12 — 21.50 to 23.17s (50f) · MID, LOCKED · CTA
- **VO:** "For access, comment GRAVITY."
- **SET:** back in the bay, on the double-decker editor. Below it the shared wall plate, both marks. The `RigWall` floats behind, lowest row count of the reel so the word owns the frame.
- **CAMERA:** locked mid.
- **BLOCKING:** YOUR CLAUDE, planted, reaches up and the letters **G R A V I T Y** strike into the wall plate one at a time f652-678, in the house comment-plate grammar. ⛔ **HARD CUT on the last letter** — the word's true end is f692 and the reel ends at f695.
- **LIGHT:** the plate is the brightest thing in the frame; the room is at its warmest.
- **SFX:** seven letter strikes f652-678 at MID, pitch stepping up · a single `c_clear` at f680 TEXTURE. ⛔ Nothing over 0.35s after f652 — the last word must be clear.
- **TAKEAWAY:** GRAVITY.

---

## THE INVARIANTS (locked before authoring)

- **ONE HERO ARTIFACT:** the double-decker editor. Withheld until S11, held at S12. The hook shows the two decks and the two marks but never the joined window.
- **DISTINCT BASE OBJECT PER SCENE:** the bolted deck · the shared wall plate · the listing board · the socket and cartridge · the dolly and the door · the cables · the descending rig · the price plate · the manifold · two buildings and a ball · the parapet banner · the joined skyline · the comment plate. Nothing is the base object twice.
- **THE HERO IS NEVER TINTED**, and **he never flies.** He is the one body in the reel that stays on the floor, in a reel where everything else changes which way is down. Colour goes on the crew, the decks, the canisters and the lamps.
- **PLATE BAND y 112-210 reserved.** `HookHeader` owns 0..96. The cast owns `GY = 706`. Nothing lands on the hero's face on a beat frame.
- **REAL MARKS ONLY**, on white tiles. No invented glyphs. VS Code's path filled `#3E7FC1`; Antigravity's PNG untouched.
- **EVERY BODY SCENE:** a near-camera crew band cropped by the bottom edge · countable `RigWall` content · one background process (a chain hoist trolley, a hanger walking the ceiling, the crane) · one event with before / trigger / travel / arrival · one accumulator named in the card · and the hero DOING something named in the card.
- **SHOT SIZES vary every cut**, written per card; only three scenes move, each motivated.
- **GATES:** motion median ≥ 9, 0 scenes under 6 · HOLD read per scene · TAIL Q4/mean ≥ 0.75 · HOOK_LUMA ≥ 140 (frame 0 only) · BODY_SAT ≥ 34% · BODY_BLACK p10 ≤ 35 · cue rate 1.0-1.5/s · no riser, no banned air · `boxShadow: "0 0 Npx"` count 0 · dHash mean ≥ 14 / min ≥ 10 across three cuts that differ by HOOK · delivered mp4 re-transcribed to prove no flub survived.

## ⭐ THE THREE FLOORS, STATED

1. **Every scene is a real place.** Thirteen cards, each with a named location and 4-6 depth planes. Two of them (S4, S9-S11) deliberately leave the bay so the reel is not one room thirteen times.
2. **The camera is disciplined.** Ten locked scenes, three moves, each motivated by what the shot is doing (reading a plate · following a load that changed direction · opening onto a bigger frame).
3. **The set re-flows on the beat.** At f284 the room's gravity, light direction and population all change at once. That is the elite marker — the SET transforms, not just the props in it.
