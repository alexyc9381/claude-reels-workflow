# STORYBOARD — REEL 99 REPO (Stage 6)

> **Logline:** every AI lab hands out a free tier that is useless on its own; one repo plumbs
> all twenty-nine of them into a single main, and switches feeds the instant one runs dry.
> Format:   single dark panel · clone the reel-98 NOMAD chassis (`ClaudeNomadReel` + `Nom*` kit)
> Arc:      DISCOVERY → the scarcity is a lie, the supply was already there, unstacked
> Villain:  THE COIN PUMP — a pay-per-drip meter. Rule: it is never beaten by argument,
>           only made irrelevant when the free main opens beside it (S4). Undefeated through S3.
> Hero cast: the clay Claude Mascot as THE VALVEMAN (works the wheel, reads the glass)
> ⛔ NUMBER SPINE: 800 MILLION (gauge, S0/S1) · 800,000 (the tin cup, S1) · 29 PROVIDERS (S2/S4)
>                  ★18,265 · MIT (maker's plate, S0 + S6) · 4B TOKENS/MO (main's rating plate, S4)
> ⛔ HERO ARTIFACT: **THE GAUGE GLASS** — a graduated column on the standpipe whose height IS the
>                  claim. It appears in S0, is the whole argument of S1, and is what refills in S5.

---

## THE FACTS (pulled 2026-08-11, GitHub API + README)

| fact | value | where it appears |
|---|---|---|
| repo | `tashfeenahmed/freellmapi` | S0 maker's plate, S6 |
| stars | **18,265** | S0, S6 |
| licence | **MIT** | S0, S6 |
| providers | **29 free LLM providers** | S2, S4 |
| endpoints | 358 free model endpoints / 251 model families | S4 |
| pooled capacity | **~4 billion tokens per month** | S4 main rating plate |
| failover | on 429/5xx the router cools that key and retries the next model in the chain | S5 |
| rate tracking | RPM/RPD/TPM/TPD per (platform, model, key) | S5 |
| client | Claude Code runs against the pool via `/v1/messages` | S0, S4, S6 |

**⚠️ TWO VO CLAIMS THE REPO DOES NOT SUPPORT — neither is ever drawn.**
1. *"800 million tokens"* — the README now says **4 billion**. The VO understates by 5x. The gauge is
   graduated to the VO's number so audio and picture agree; the main's rating plate in S4 carries the
   real 4B, so the receipt over-delivers rather than contradicts.
2. *"GPT-5 … all for free"* — **OpenAI is not a provider.** GPT-5 is not obtainable through this repo.
   No GPT or OpenAI mark appears anywhere in the reel. S2's taps carry only providers that are really
   in the README, and Claude appears as the **client** (Claude Code drinking from the pool), which is
   exactly what the repo supports.

---

## THE WORLD — A NIGHT WATERWORKS

A municipal pumping station and its reservoir yard, lamplit. Painted cast iron, brass fittings, wet
stone, lime-plaster walls. Chosen because the subject's three moves are all things a waterworks
already does physically, so nothing needs a diagram:

| the subject | the waterworks |
|---|---|
| free tiers, individually a toy | twenty-nine thin feeder pipes, each a dribble |
| pooled into one endpoint | one manifold, one main |
| capacity | **height of water in a graduated gauge glass** |
| a rate limit | a feeder coughs and runs dry |
| automatic failover | a rotary selector arm CLACKS to the next live feed |
| paying per request | a coin-fed meter on a spigot |

⛔ Matte, never neon. Warm practicals (`#E7B24C` lamp) against cold wet stone. The brightest value in
the reel is **water and lime plaster**, never a glow — which is what lets the gauge column rank without
a single `0 0 Npx` shadow.

---

## THE HOOK — three columns, filled

| RITUAL | HIERARCHY MECHANISM | THE MOMENT FRAME 0 IS FROZEN ON |
|---|---|---|
| opening the main valve at a standpipe | **HEIGHT** of the column in a graduated gauge glass | both hands on the wheel, gauge empty, one beat before it breaks free |

One object: **the standpipe**. Everything else in frame is bolted to it — the glass, the wheel, the
maker's plate, the twenty-nine feeders entering from the dark. The literal layer sits ON the object,
not beside it: the graduations are token counts, the plate is the real repo and its real star count,
the outlet tap carries the Claude mark.

---

## SCENE CARDS

### SCENE 0 — 0.00 to 3.67s (110f) · BEAT: HOOK
    VO:       "Someone just dropped a GitHub repo that gives you 800 million free AI tokens every month."
    SET:      THE PUMPHOUSE. Lime-plaster barrel vault (the bright plane, ~46% of frame), wet flagstone
              floor, the standpipe dead centre from floor to out-of-frame, 29 feeder pipes converging
              from the dark left and right, a hanging lamp camera-left. 6 depth planes:
              vault / far arch / feeder bundle / standpipe / valveman / foreground pipe crop.
    CAMERA:   LOCKED. Four hard cuts, each a different FRAMING of the same object, never a zoom pair.
              A slow in-panel push runs under every shot (scene-local, per REEL-BUILD §7).
    BLOCKING: f0   settled wide — valveman gripping the wheel, gauge EMPTY, plate legible. Nothing
                   animates in; only lamp sway and a drip.
              f12  THE WHEEL BREAKS FREE. Hard slam, camera shake, dust off the flange, water hammer
                   ripples down all 29 feeders.
              f22  CUT — extreme close on the gauge glass. The column ROCKETS, blowing past the
                   `800,000` graduation to `800 MILLION`.
              f56  CUT — low angle: the standpipe from the floor, maker's plate reading
                   `freellmapi · ★18,265 · MIT` filling the lower third.
              f82  CUT — the outlet tap, Claude mark on its handle, first water hitting the pail.
    LIGHT:    single warm key from the hanging lamp, camera-left, hard shadow right.
    SFX:      0.00 room+drip bed · 0.40 wheel ratchet · 0.55 HERO valve slam (layer clank+sub)
              0.73 water surge riser · 1.87 glass ping · 2.73 plate clunk
    TAKEAWAY: a supply this big was already sitting there, closed.
    ⛔ THE-OPEN: frame-0 panel luma target ≥150 (plaster + brass + glass carry it from INSIDE the
       world, no imported neutral card) · 4 shots in 3.67s, all ≥0.73s · transient on every cut ·
       5 Claude marks inside the first 3s (tap handle, plate, pail, feeder cap, valveman's badge).

### SCENE 1 — 3.67 to 5.93s (68f) · BEAT: SETUP · "the scale"
    VO:       "Not 800,000, but 800 million."
    SET:      THE GAUGE YARD. Exterior night, the standpipe seen at FULL HEIGHT against a smoke-blue
              sky, reservoir water flat behind, a stone kerb, distant lamp row.
    CAMERA:   LOCKED, framed so the top of the column is out of frame at the cut and lands at f40.
    BLOCKING: f0   a battered TIN CUP on the kerb, foreground, near-camera, filled to a scratch
                   marked `800,000`. It is the whole left third and it is pathetic.
              f14  rack to the standpipe: the column climbs the graduated glass...
              f40  ...and does not stop. `800 MILLION` band lands at the top. The cup does not move.
    LIGHT:    cold moon key on the water, warm lamp rim on the iron. Hero (glass) is the LIGHTEST thing.
    SFX:      3.71 whoosh · 3.90 cup tink (thin, deliberately cheap) · 4.30 rising water body
              5.05 HERO top-out clunk + brass chime
    TAKEAWAY: the two numbers are not neighbours. One is a scratch, one is a tower.

### SCENE 2 — 5.93 to 8.37s (73f) · BEAT: SETUP · "who is in the pool"
    VO:       "GPT-5, Claude, Gemini, Llama, all for free."
    SET:      THE FEEDER ROW. A long lamplit wall of the yard, 29 brass taps in a receding row, each on
              a cast nameplate. Warm amber, deepest depth in the reel (5 lamp pools receding).
    CAMERA:   LOCKED on the row; the push does the travelling.
    BLOCKING: taps light and spit in sequence, back to front, pitched up as they come forward.
              Marks that are REAL and in the README: Google (Gemini) · Mistral · Cloudflare · NVIDIA ·
              HuggingFace · OpenRouter. Providers with no public mark get a cast stencil nameplate:
              GROQ · CEREBRAS · COHERE · Z.AI. A `+19 MORE` plate closes the row at 29.
              ⛔ NO OPENAI / GPT MARK. The VO says it; the picture does not claim it.
    LIGHT:    five warm pools receding, each dimmer — the depth IS the count.
    SFX:      5.97 row wake · 6.10/6.26/6.42/6.58 four tap spits rising in pitch · 7.70 collect chime
    TAKEAWAY: these are real companies, and the row does not end where you can see.

### SCENE 3 — 8.37 to 12.03s (110f) · BEAT: ESCALATE · the villain
    VO:       "Most developers are paying hundreds of dollars a month just to access one of these tools."
    SET:      THE COIN PUMP. A roadside pay-spigot kiosk in the rain. COLD — slate blue, wet asphalt,
              one sour green meter lamp. The only cold-dominant scene in the reel; it is the villain's
              palette and it appears nowhere else.
    CAMERA:   LOCKED, slight low angle so the meter looms.
    BLOCKING: f0   a queue of three figures under the meter, coins already in hand.
              f18  coin drops → the meter dial spins → ONE THIN DRIBBLE into a cup. Repeat, faster,
                   three times: the price ratchets 3 stamps while the dribble stays identical.
              f74  pull to reveal the queue continues off-frame into the rain.
    LIGHT:    one sour green meter lamp, everything else wet and unlit. Hero (dribble) is the only warm.
    SFX:      8.55 rain bed in · 8.75/9.55/10.35 coin+ratchet+dribble ×3 rising · 11.30 dead-line thunk
    TAKEAWAY: the money buys ONE tap, and the queue is long.

### SCENE 4 — 12.03 to 16.50s (134f) · BEAT: TURN · the payoff
    VO:       "This repo routes your requests across the free tiers of every major AI company simultaneously."
    SET:      THE MANIFOLD HALL. The interior convergence: 29 feeders arcing down into one cast header
              and out one huge main. The warmest, biggest, most-populated frame in the reel.
    CAMERA:   the reel's ONE motivated move — a slow pull back as the main fills, so the frame keeps
              growing to hold what has arrived.
    BLOCKING: f0    close on the header, three feeders joining.
              f26   CUT wide: all 29 arcs land at once, the header shakes, the main charges.
              f70   the main's RATING PLATE swings into the light: `4,000,000,000 TOKENS / MO`,
                    `29 PROVIDERS · 358 ENDPOINTS`, and `ONE /v1 ENDPOINT` cast into the iron.
              f104  the valveman opens the outlet; the Claude-marked pail fills in one shot.
    LIGHT:    full warm wash, the only scene lit from BOTH sides — it is the relief beat.
    SFX:      12.21 single feed · 12.90 HERO all-29 impact (layer clank+sub+surge) · 14.50 plate swing
              15.60 fill + positive chime
    TAKEAWAY: one endpoint, and the pooled number is bigger than the one you were sold.

### SCENE 5 — 16.50 to 19.00s (75f) · BEAT: PAYOFF · the mechanism
    VO:       "Hit one model's rate limit, it automatically jumps to the next."
    SET:      THE SELECTOR. Extreme close on the rotary changeover gear on the header — a brass arm,
              a numbered dial, four feed ports. Tightest framing in the reel.
    CAMERA:   LOCKED, macro. This is the one scene where nothing but the mechanism is in frame.
    BLOCKING: f0   feed 07 flowing, dial steady.
              f16  feed 07 COUGHS — spits, browns out, a red `429` flag drops over its port.
              f24  the arm CLACKS one port clockwise. Total dead time: 8 frames.
              f34  feed 12 charges, flow restored at the same height. The gauge behind never dips.
              f56  the arm clacks again, unprompted — it is a loop, not a one-off.
    LIGHT:    hard warm key raking across brass so the arm's move is unmissable.
    SFX:      16.69 flow steady · 17.05 cough + dry rattle · 17.32 HERO selector clack (metal+ratchet)
              17.62 charge + restore chime
    TAKEAWAY: you never touch it. The switch happens under you.

### SCENE 6 — 19.00 to 20.93s (58f) · BEAT: CTA
    VO:       "Comment REPO and I'll send it immediately."
    SET:      THE TAP. Back to the pumphouse, but framed on the outlet only — brightest frame in the
              reel, water running full bore into a Claude-marked pail.
    CAMERA:   LOCKED, hard cut in on the keyword.
    BLOCKING: HARD CUT on "REPO". The word is cast into the brass tag on the tap chain, not floated
              over the picture. Maker's plate returns: `freellmapi · ★18,265 · MIT`.
    LIGHT:    full lamp, no vignette falloff — the reel ends on its highest value.
    SFX:      19.16 riser 2 of 2 · 19.30 HERO keyword hit · 19.75 magic reveal · 20.10 arrive chime
    TAKEAWAY: the keyword, on the brightest frame, with the receipt still on screen.

---

## THE THREE FLOORS

1. **Every scene is a real place.** 7 scenes, 7 named locations, each ≥5 depth planes, one committed
   light direction each. 3 exteriors (S1, S2, S3) / 4 interiors (S0, S4, S5, S6) — and the interiors
   are a vault, a hall, a macro on a gear and a tap, which read as four places, not one room.
2. **The camera is disciplined.** 6 of 7 scenes LOCKED; **one** motivated move (S4's pull-back as the
   main fills). The scene-local push runs under all 7 — that is the chassis, not a camera move.
3. **The arc has a shape.** Intensity: **9 · 7 · 6.5 · 8 · 10 · 8.5 · 9.5**. No belly sag (the S2 trough
   is 6.5 and immediately climbs). The peak (S4, 10) beats the hook (9). The villain (coin pump) is
   never argued with — it is simply made irrelevant at S4 and never seen again.

## THE ADVERSARIAL CRITIC PASS

| check | verdict |
|---|---|
| swipe points 0-5s | 4 cuts by 3.67s, each a new framing with a new hero object (wheel → glass → plate → tap). The gauge blows past `800,000` at f22, which is the reel's promise delivered as a *picture* before the VO says the number. |
| repeated base-object | S0 and S6 are both the pumphouse — **deliberate bookend**, and S6 is a framing S0 never used (outlet only, no wheel, no vault). S1/S2/S3 share no prop. |
| payoff spent early | ⚠️ FLAGGED: the gauge tops out in S0. Fixed by splitting the payoff — S0 shows the *height*, S4 shows the *mechanism and the real rating*. The hook promises scale; the turn delivers plumbing. |
| villain integrity | the coin pump never loses a beat on screen. It is not defeated, it is abandoned. |
| intensity curve | 9 · 7 · 6.5 · 8 · 10 · 8.5 · 9.5 — peak at S4 clears the hook by 1. |
| location count | `len(set(locations)) = 6` over 7 scenes (S0/S6 bookend). Above the ≥5 floor. |
| "is it a system?" | the hook is not a chart, a grid, a wall or a UI. It is a valve being opened. Column 3 of the ritual table is fillable: *"one beat before the wheel breaks free."* |
