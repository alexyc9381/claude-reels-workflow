import React from "react";
import { useCurrentFrame } from "remotion";
import { inter, fraunces } from "./fonts";
import { MONO } from "./SlopKit";
import {
  W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  CLAY, GOLD, GREEN, RED, PAPER, INK, BRASS, BRASSD, BRASSL, IRON, IROND, IRONL,
  WATER, WATERD, WATERL,
  Vault, Outside, Rain, Puddle, Stream, Splash, Drip,
  Scene, Cam, Beam, Strip, Motes, Chip, Plate, BigNum, Contact, Edge,
  Mark, MarkPlate, MarkCast, Disc, Stencil, MakerPlate, PROVIDERS, usePlace, dkh, mxh,
} from "./RepWorld";
import {
  Gauge, Standpipe, Handwheel, SideWheel, Feeders, Tap, CoinPump, Coin, Manifold, RatingPlate,
  Selector, Lamp, Pail, TinCup, Valveman, Waiting, PipeMouth,
} from "./RepProps";

/* ===========================================================================
   REEL 99 "REPO" · THE BODY. Board: storyboards/99-repo.md.

   ⛔ EVERY EVENT FRAME BELOW IS A MEASURED WORD ONSET from
      src/data/words_repo.json, converted to LOCAL Sequence frames, with the
      PICTURE LEADING THE ONSET BY 4 FRAMES so the crossover — not the start —
      lands on the syllable. Never an estimate.

      root onsets:  Someone 0 · Not 114 · GPT-5 182 · Most 255 · This 365 ·
                    Hit 499 · Comment 574        (lead-4: 0/110/178/251/361/495/570)

   ⛔⛔ THE `push` RANGE IS SCENE-LOCAL, NOT SHOT-LOCAL. `Scene` reads
      useCurrentFrame(), which restarts per SEQUENCE and not per hard cut. A
      second shot given `push={[0, n, …]}` has its push already COMPLETE on its
      first frame and sits on a frozen camera. Every range below therefore
      starts on ITS OWN CUT, in scene-local frames.

   ⛔ THE MOVE BUDGET IS ONE. Only S4c re-frames (a motivated pull-back as the
      main charges). Everything else is LOCKED and gets only the house in-panel
      push, which CAMERA-GRAMMAR does not count as a re-framing.

   ⛔ ANY TRANSFORMED WRAPPER NEEDS AN EXPLICIT zIndex.
   ========================================================================= */

/** a decaying camera shake. ⛔ THIS IS THE ONLY THING THAT MOVES EVERY PIXEL —
    reel 86 proved a 30px prop landing is a rounding error to a frame-difference
    metric, while a shake takes the same frame from 1.7 to 8.7. */
const shake = (lf: number, at: number, amp = 14, n = 12) => {
  if (lf < at || lf > at + n) return { x: 0, y: 0 };
  const k = 1 - (lf - at) / n;
  const d = k * k * amp;
  return { x: Math.sin(lf * 2.7) * d, y: Math.cos(lf * 3.4) * d * 0.7 };
};

/** an impact flash — three frames, paper-white, never a colour. */
const Flash: React.FC<{ lf: number; at: number; n?: number; o?: number }> =
  ({ lf, at, n = 3, o = 0.34 }) => {
  if (lf < at || lf >= at + n) return null;
  return <div style={{ position: "absolute", inset: 0, zIndex: 96, pointerEvents: "none",
    background: "#F6F0E2", opacity: (1 - (lf - at) / n) * o }} />;
};

/* ================================================================== S0 ====
   0.00 -> 3.67s · 110f · HOOK · FOUR HARD CUTS, camera locked in each.

   docs/THE-OPEN.md: an establishing wide is a poster. So the open is CUT, not
   held — wheel / glass / plate / tap: four framings of ONE object, four sizes,
   four hero props, a transient on every cut.

   ⛔ FRAME 0 IS SETTLED AND BRIGHT. The plaster vault fills the upper half at
      full value on frame 0 and nothing that must read has an entrance. The only
      motion before the slam is the lamp sway and one drip — a baseline, so the
      f12 reversal has something to break.
   ⛔⛔ THE OPEN MUST SAY "AI" AND SAY "CLAUDE" IN THE FIRST THREE SECONDS
      (reel 95, round 3 — the mark is an AUDIENCE FILTER). Five marks land
      before 3.0s and they ride EXISTING props rather than being pasted on:
      the pail (0.0s), the tap tag (0.0s), the maker's plate github mark
      (1.87s), the wall cast (1.87s), the outlet pail again (2.73s).
   ========================================================================= */
export const S0Hook: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("pump");
  const CUT = [0, 22, 56, 82];
  const shot = CUT.filter((c) => f >= c).length - 1;
  const lf = f - CUT[shot];

  /* the grip geometry, derived once so the wheel cannot drift off the hands.
     The Mascot is a 200-unit viewBox drawn at `250 * s`; its arm blocks sit at
     y 86..112, so the arm centre is `base - 250*s + 99*s`. */
  const BASE = p.horizon + 176, VS = 0.80, VMX = W / 2 - 268;
  const ARMY = BASE - 250 * VS + 99 * VS;
  const WHX = VMX + 118;

  /* ---- A · WIDE · THE PUMPHOUSE. The wheel breaks free at f12. ---------- */
  if (shot === 0) {
    const brk = E(lf, 12, 22, 0, 1, OUT);              /* the wheel turning */
    const sk = shake(lf, 12, 15, 13);
    const surge = E(lf, 13, 21, 0, 1, OUT);            /* water hammer down the feeders */
    return (
      <Scene p={p} slug="ENGINE HOUSE  ·  THE MAIN" push={[0, 22, 1.045]} vig={0.40}>
        <div style={{ position: "absolute", inset: 0, zIndex: 1,
          transform: `translate(${sk.x}px, ${sk.y}px)` }}>
          <Vault p={p} f={f} ribs={5} />
          <Lamp x={838} y={128} s={0.98} z={26} f={f} on={1} />
          <Beam x={838} y={172} top={100} bot={430} len={430} c="#F2E2BC" o={0.22} z={22} f={f} />
          <PipeMouth x={W / 2} y={p.horizon - 150} s={0.86} z={16} />
          {/* the twenty-nine feeders, dark and dead — the baseline to break */}
          <Feeders x={W / 2} y={330} n={12} s={0.9} z={20} f={f} charge={surge * 12} />
          {/* THE OBJECT. Gauge empty at f0; it is the WHEEL that moves first. */}
          <Standpipe x={W / 2} base={BASE} top={92} s={0.86} z={38} f={f} fill={0} gauge />
          {/* ⛔ THE HANDS HAVE TO BE ON IT. The Mascot is a rigid box, so "grip"
              is staged, not posed: the wheel hub sits at the arm-block's exact
              centre height (body top + 86 + 13 of a 200 viewBox) and the spindle
              is drawn as a visible SPAN into the column — proximity alone never
              reads as connection (reel 81's chain). */}
          <SideWheel x={WHX} y={ARMY} toX={W / 2 - 56} s={0.74} z={66} rot={brk * 210} />
          <Valveman x={VMX} base={BASE} s={0.80} z={70} f={f}
            gaze={0.6} shock={brk * 0.45} />
          {/* the outlet spout and the pail — the Claude mark, in frame 0 */}
          <div style={{ position: "absolute", left: W / 2 + 236, top: p.horizon - 46,
            width: 40, height: 96, borderRadius: 5, background: BRASSD, zIndex: 72 }} />
          <div style={{ position: "absolute", left: W / 2 + 210, top: p.horizon - 60,
            width: 92, height: 26, borderRadius: 5, background: IRONL, zIndex: 73 }} />
          <Pail x={W / 2 + 256} y={p.horizon + 74} s={0.76} z={74} fill={0} />
          <Drip x={W / 2 + 256} y={p.horizon + 54} f={f} period={54} fall={22} z={73} />
          <Edge side="l" c={dkh(p.back, 0.42)} kind="post" z={93} />
          <Flash lf={lf} at={12} />
        </div>
      </Scene>
    );
  }

  /* ---- B · EXTREME CLOSE · THE GLASS. The column blows past 800,000. ---- */
  if (shot === 1) {
    const rise = E(lf, 2, 28, 0, 0.94, OUT);
    return (
      <Scene p={p} slug="GAUGE GLASS  ·  TOKENS / MONTH" push={[22, 56, 1.05]} vig={0.54}>
        <Vault p={p} f={f} ribs={3} arch={false} dim={0.1} />
        <Beam x={W / 2 - 120} y={0} top={140} bot={520} len={620} c="#F2E2BC" o={0.20} z={20} f={f} />
        {/* the column, big enough to read on mute */}
        <div style={{ position: "absolute", left: W / 2 - 260, top: 118, width: 224, height: 560,
          background: IRON, zIndex: 30, borderRadius: 6, boxShadow: SH_D }} />
        <div style={{ position: "absolute", left: W / 2 - 260, top: 118, width: 58, height: 560,
          background: IRONL, opacity: 0.6, zIndex: 31 }} />
        <Gauge x={W / 2 - 148} y={132} h={534} t={rise} w={104} z={40} f={f} big />
        <Motes x={W / 2 - 148} y={150} w={300} h={420} n={11} f={f} z={72} />
        <Flash lf={lf} at={0} n={2} o={0.22} />
      </Scene>
    );
  }

  /* ---- C · LOW ANGLE · THE MAKER'S PLATE. The receipt. ----------------- */
  if (shot === 2) {
    const set = E(lf, 0, 12, 0, 1, OUT);
    return (
      <Scene p={p} slug="CAST INTO THE COLUMN" push={[56, 82, 1.055]} vig={0.58}>
        <Vault p={p} f={f} ribs={4} />
        <Lamp x={806} y={92} s={0.94} z={26} f={f} on={1} />
        <Beam x={806} y={140} top={90} bot={400} len={470} c="#F2E2BC" o={0.22} z={22} f={f} />
        {/* the column from the floor, cropped by the top of frame */}
        <div style={{ position: "absolute", left: W / 2 - 132, top: -40, width: 264, height: 700,
          background: IRON, zIndex: 30, boxShadow: SH_D }} />
        <div style={{ position: "absolute", left: W / 2 - 132, top: -40, width: 66, height: 700,
          background: IRONL, opacity: 0.6, zIndex: 31 }} />
        {[210, 402].map((y, i) => (
          <div key={"fr" + i} style={{ position: "absolute", left: W / 2 - 176, top: y, width: 352,
            height: 40, borderRadius: 5, background: IRONL, zIndex: 33, boxShadow: SH }} />
        ))}
        <div style={{ position: "absolute", left: 0, right: 0, top: 660, height: 132,
          background: `linear-gradient(184deg, ${p.floor} 0%, ${p.floor2} 100%)`, zIndex: 34 }} />
        <Cam z={80} y={(1 - set) * 26} o={set}>
          <MakerPlate x={W / 2 - 178} y={470} s={1.28} z={86} />
        </Cam>
        {/* the mark cast into the plaster behind — mark 4 of 5 */}
        <MarkCast x={190} y={300} s={168} z={12} o={0.30} />
        <Edge side="r" c={dark(p.back, 0.44)} kind="wall" z={93} />
        <Flash lf={lf} at={0} n={2} o={0.2} />
      </Scene>
    );
  }

  /* ---- D · CLOSE · THE OUTLET. First water into the Claude pail. -------- */
  const run = E(lf, 3, 13, 0, 1, OUT);
  return (
    <Scene p={p} slug="OUTLET  ·  ONE ENDPOINT" push={[82, 110, 1.05]} vig={0.52}>
      <Vault p={p} f={f} ribs={3} arch={false} />
      <Lamp x={300} y={78} s={1.0} z={26} f={f} on={1} />
      <Beam x={300} y={124} top={110} bot={430} len={480} c="#F2E2BC" o={0.24} z={22} f={f} />
      {/* the outlet casting, big in frame */}
      <div style={{ position: "absolute", left: W / 2 - 46, top: -40, width: 92, height: 300,
        background: IRON, zIndex: 40, boxShadow: SH_D }} />
      <div style={{ position: "absolute", left: W / 2 - 104, top: 236, width: 208, height: 54,
        borderRadius: 7, background: IRONL, zIndex: 41, boxShadow: SH }} />
      <div style={{ position: "absolute", left: W / 2 - 34, top: 282, width: 68, height: 86,
        borderRadius: 6, background: BRASS, zIndex: 42 }} />
      <div style={{ position: "absolute", left: W / 2 - 34, top: 282, width: 20, height: 86,
        background: BRASSL, opacity: 0.8, zIndex: 43 }} />
      <Handwheel x={W / 2 + 118} y={250} s={0.62} z={44} rot={run * 96} />
      <Stream x={W / 2} y={366} len={196} w={30} t={run} f={f} z={60} />
      <Pail x={W / 2} y={556} s={1.16} z={70} fill={run * 0.62} />
      <Splash x={W / 2} y={566} f={f} s={1.05} z={78} on={run} />
      <Edge side="l" c={dark(p.back, 0.4)} kind="rail" z={93} />
      <Flash lf={lf} at={0} n={2} o={0.24} />
    </Scene>
  );
};

/* ================================================================== S1 ====
   3.67 -> 5.93s · 68f · SETUP · THE SCALE.
   "Not 800,000, but 800 million."

   ⛔ THE HIERARCHY IS THE WHOLE SCENE and it is carried by HEIGHT, honestly.
      800,000 is 0.1% of 800,000,000, so the cup is not a small version of the
      column — it is a scratch. That is the argument; it is not rescaled.
   ========================================================================= */
export const S1: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("yard");
  const CUT = [0, 30];
  const shot = CUT.filter((c) => f >= c).length - 1;
  const lf = f - CUT[shot];

  /* ---- A · FOREGROUND CUP against the base of the column ---------------- */
  if (shot === 0) {
    return (
      <Scene p={p} slug="RESERVOIR YARD  ·  0.1%" push={[0, 30, 1.05]} vig={0.56}>
        <Outside p={p} f={f} water lamps={6} />
        {/* the kerb the cup sits on */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 604, height: 34,
          background: mix(p.floor2, 0.10), zIndex: 40 }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 604, height: 8,
          background: mix(p.floor, 0.22), zIndex: 41 }} />
        {/* the column base, mid-ground, cropped — the thing being compared to */}
        <div style={{ position: "absolute", left: 640, top: 96, width: 176, height: 520,
          background: IROND, zIndex: 30, boxShadow: SH_D }} />
        <div style={{ position: "absolute", left: 640, top: 96, width: 44, height: 520,
          background: IRON, zIndex: 31 }} />
        <Gauge x={728} y={128} h={470} t={0.001} w={62} z={36} f={f} labels={false} />
        <TinCup x={266} y={476} s={1.18} z={70} f={f} />
        <Cam z={86} x={0} y={0}>
          <Plate x={168} y={630} t="800,000" sub="A DAY'S DRIBBLE" w={244} s={1.06} z={88} />
        </Cam>
        <Edge side="r" c={dark(p.back, 0.36)} kind="post" z={93} />
      </Scene>
    );
  }

  /* ---- B · FULL HEIGHT. The column tops out; the cup never moves. ------- */
  const rise = E(lf, 0, 22, 0.16, 0.94, OUT);
  const top = E(lf, 20, 27, 0, 1, OUT);
  const sk = shake(lf, 21, 9, 10);
  return (
    <Scene p={p} slug="THE SAME SCALE  ·  800 MILLION" push={[30, 68, 1.04]} vig={0.5}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1,
        transform: `translate(${sk.x}px, ${sk.y}px)` }}>
        <Outside p={p} f={f} water lamps={7} />
        {/* the standpipe at FULL height, out of frame at the top */}
        <div style={{ position: "absolute", left: W / 2 - 88, top: -40, width: 176, height: 700,
          background: IROND, zIndex: 30, boxShadow: SH_D }} />
        <div style={{ position: "absolute", left: W / 2 - 88, top: -40, width: 44, height: 700,
          background: IRON, zIndex: 31 }} />
        {[120, 300, 480].map((y, i) => (
          <div key={"fg" + i} style={{ position: "absolute", left: W / 2 - 118, top: y, width: 236,
            height: 26, borderRadius: 4, background: IRONL, zIndex: 33, boxShadow: SH }} />
        ))}
        <Gauge x={W / 2 - 4} y={124} h={496} t={rise} w={76} z={40} f={f} big />
        {/* the cup, still on the kerb, still a scratch */}
        <TinCup x={148} y={548} s={0.86} z={70} f={f} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 640, height: 30,
          background: mix(p.floor2, 0.10), zIndex: 60 }} />
        {top > 0 && <Splash x={W / 2 - 4} y={150} f={lf} s={0.9} z={78} on={top} />}
        <Flash lf={lf} at={21} n={3} o={0.28} />
      </div>
    </Scene>
  );
};

/* ================================================================== S2 ====
   5.93 -> 8.37s · 73f · SETUP · WHO IS IN THE POOL.
   "GPT-5, Claude, Gemini, Llama, all for free."

   ⛔⛔ NO OPENAI / GPT MARK APPEARS IN THIS REEL. The VO names GPT-5; OpenAI is
      NOT a provider in this repo's README and GPT-5 is not obtainable through
      it. Captions carry what was said — the PICTURE never makes the claim. Only
      providers really in the README are drawn, and the four with no public mark
      (Groq, Cerebras, Cohere, Z.ai) get a cast stencil rather than an invented
      logo (reel 86: never invent a mark, never darken a coloured one).
   ========================================================================= */
export const S2: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("row");
  const CUT = [0, 38];
  const shot = CUT.filter((c) => f >= c).length - 1;
  const lf = f - CUT[shot];

  /* ---- A · MID · four taps wake in sequence, back to front ------------- */
  if (shot === 0) {
    const T = [
      { x: 176, s: 1.06, at: 2,  k: 0 },
      { x: 402, s: 1.02, at: 7,  k: 3 },
      { x: 622, s: 0.98, at: 12, k: 4 },
      { x: 838, s: 0.94, at: 17, k: 6 },
    ];
    return (
      <Scene p={p} slug="FEEDER ROW  ·  FREE TIERS" push={[0, 38, 1.05]} vig={0.56}>
        <Outside p={p} f={f} lamps={0} />
        {/* the wall the taps are set into, plus its brick courses */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 118, height: 362,
          background: mix(p.back2, 0.06), zIndex: 6 }} />
        {Array.from({ length: 7 }, (_, r) => (
          <div key={"bc" + r} style={{ position: "absolute", left: 0, right: 0, top: 126 + r * 50,
            height: 3, background: dark(p.back2, 0.22), opacity: 0.6, zIndex: 7 }} />
        ))}
        {/* the run of main above the taps */}
        <div style={{ position: "absolute", left: -20, top: 168, width: W + 40, height: 30,
          background: IROND, zIndex: 20, boxShadow: SH }} />
        <div style={{ position: "absolute", left: -20, top: 168, width: W + 40, height: 8,
          background: IRONL, opacity: 0.7, zIndex: 21 }} />
        {T.map((t, i) => {
          const pr = PROVIDERS[t.k];
          const on = E(lf, t.at, t.at + 6, 0, 1, OUT);
          return (
            <React.Fragment key={"tp" + i}>
              <Strip x={t.x} y={128} w={150} on={on} z={14} f={f} />
              <Tap x={t.x} y={286} s={t.s} z={50 + i} f={f} on={on}
                label={pr.n} markKey={pr.k} hasMark={pr.mark} />
              {on > 0.5 && <Splash x={t.x} y={286 + 116 * t.s} f={f} s={0.6 * t.s} z={66} on={on} />}
            </React.Fragment>
          );
        })}
        <Motes x={506} y={200} w={640} h={300} n={12} f={f} z={80} />
        <Edge side="l" c={dark(p.back, 0.5)} kind="post" z={93} />
      </Scene>
    );
  }

  /* ---- B · WIDE · the row recedes, and does not end where you can see --- */
  const walk = E(lf, 0, 30, 0, 1, LIN);
  return (
    <Scene p={p} slug="29 PROVIDERS  ·  ONE POOL" push={[38, 73, 1.055]} vig={0.6}>
      <Outside p={p} f={f} lamps={0} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 108, height: 380,
        background: mix(p.back2, 0.05), zIndex: 6 }} />
      {/* five lamp pools receding — the DEPTH is the count */}
      {Array.from({ length: 5 }, (_, i) => {
        const k = i / 4;
        const x = 108 + k * 760, s = 1.02 - k * 0.5;
        return (<React.Fragment key={"lp" + i}>
          <Strip x={x} y={124 + k * 74} w={168 * s} on={1} z={12 + i} f={f} />
          <Tap x={x} y={272 + k * 96} s={s} z={40 + i} f={f} on={1}
            label={PROVIDERS[(i * 2) % PROVIDERS.length].n}
            markKey={PROVIDERS[(i * 2) % PROVIDERS.length].k}
            hasMark={PROVIDERS[(i * 2) % PROVIDERS.length].mark} />
        </React.Fragment>);
      })}
      {/* the row keeps going into the dark, and says by how much */}
      <div style={{ position: "absolute", left: 862, top: 300, width: 150, height: 250,
        background: dark(p.back2, 0.5), zIndex: 46 }} />
      <Cam z={88} o={E(lf, 8, 18, 0, 1, OUT)} y={(1 - E(lf, 8, 18, 0, 1, OUT)) * 16}>
        <Plate x={730} y={470} t="+19 MORE" sub="29 TOTAL" w={218} s={1.1} z={90} />
      </Cam>
      <MarkPlate x={92} y={606} t="CLAUDE CODE RUNS ON IT" s={0.86} z={90} />
      <Motes x={506} y={180} w={700} h={320} n={13} f={f} z={80} />
      <Edge side="r" c={dark(p.back, 0.52)} kind="wall" z={93} />
    </Scene>
  );
};

/* ================================================================== S3 ====
   8.37 -> 12.03s · 110f · ESCALATE · THE VILLAIN.
   "Most developers are paying hundreds of dollars a month just to access one
    of these tools."

   ⛔ THE ONLY COLD-DOMINANT SCENE IN THE REEL, and the only one with rain. The
      villain gets a palette nothing else shares, so the S4 cut back to warm IS
      the relief beat without a single word of explanation.
   ⛔ THE VILLAIN IS NEVER ARGUED WITH. The price ratchets three times and the
      dribble never changes — it wins every beat it is in, and is simply
      abandoned at S4.
   ========================================================================= */
export const S3: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("kiosk");
  const CUT = [0, 40, 78];
  const shot = CUT.filter((c) => f >= c).length - 1;
  const lf = f - CUT[shot];

  /* the three coin drops, at measured onsets: "paying" / "hundreds" / "month" */
  const DROPS = [4, 26, 48];
  const nDrop = DROPS.filter((d) => f >= d).length;
  const PRICE = ["$20", "$60", "$140", "$300"];

  /* ---- A · CLOSE · coin, dial, dribble --------------------------------- */
  if (shot === 0) {
    const dropT = (i: number) => E(f, DROPS[i], DROPS[i] + 9, 0, 1, IN_Q);
    return (
      <Scene p={p} slug="PAY SPIGOT  ·  PER REQUEST" push={[0, 40, 1.05]} vig={0.62}>
        <Outside p={p} f={f} lamps={3} />
        <Puddle x={470} y={646} w={420} f={f} c={dark(p.floor2, 0.14)} z={18} />
        <CoinPump x={470} base={666} s={1.24} z={40} f={f}
          price={PRICE[Math.min(3, nDrop)]} dial={nDrop * 118} flow={0.5} />
        {DROPS.map((d, i) => (
          <Coin key={"cn" + i} x={470 + 112} y={286} s={1.1} z={82} t={dropT(i)} />
        ))}
        {/* the cup it dribbles into — same tin cup as S1, deliberately */}
        <TinCup x={470} y={606} s={0.6} z={74} f={f} />
        <Rain f={f} n={44} z={90} />
        <Edge side="l" c="#20272C" kind="post" z={92} />
        <Flash lf={f} at={DROPS[0]} n={2} o={0.14} />
      </Scene>
    );
  }

  /* ---- B · the price head, big. Three stamps, one dribble. ------------- */
  if (shot === 1) {
    return (
      <Scene p={p} slug="THE METER  ·  ONE TAP" push={[40, 78, 1.06]} vig={0.64}>
        <Outside p={p} f={f} lamps={2} />
        <div style={{ position: "absolute", left: 132, top: 150, width: 748, height: 268,
          borderRadius: 10, background: "#DCD6C4", border: "7px solid #8C8676", zIndex: 40,
          boxShadow: SH_D, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 168, letterSpacing: "-0.03em",
            color: "#2A2A24" }}>{PRICE[Math.min(3, nDrop)]}</span>
        </div>
        <Chip t="PER MONTH  ·  ONE PROVIDER" y={452} z={96} c="#2A343B" />
        {/* the dribble, unchanged, right beside the price */}
        <div style={{ position: "absolute", left: 462, top: 522, width: 88, height: 74,
          borderRadius: 5, background: BRASSD, zIndex: 44 }} />
        <Stream x={506} y={594} len={64} w={7} t={1} f={f} z={60} c={WATERD} />
        <TinCup x={506} y={648} s={0.52} z={74} f={f} />
        <Rain f={f} n={40} z={90} />
        <Edge side="r" c="#20272C" kind="wall" z={92} />
      </Scene>
    );
  }

  /* ---- C · WIDE · the queue continues into the rain -------------------- */
  return (
    <Scene p={p} slug="AND THE QUEUE  ·  DOES NOT END" push={[78, 110, 1.05]} vig={0.66}>
      <Outside p={p} f={f} lamps={4} />
      <Puddle x={300} y={690} w={520} f={f} c={dark(p.floor2, 0.14)} z={18} />
      <CoinPump x={794} base={660} s={0.86} z={40} f={f} price="$300" dial={354} flow={0.42} />
      {[604, 466, 348, 250, 176].map((x, i) => (
        <Waiting key={"wt" + i} x={x} base={664 - i * 22} s={0.94 - i * 0.13} z={38 - i}
          c={dark("#2E373E", i * 0.06)} />
      ))}
      <Rain f={f} n={48} z={90} />
      <Edge side="l" c="#1C2226" kind="post" z={92} />
    </Scene>
  );
};

/* ================================================================== S4 ====
   12.03 -> 16.50s · 134f · TURN · THE PAYOFF.
   "This repo routes your requests across the free tiers of every major AI
    company simultaneously."

   ⛔ THE REEL'S ONE MOTIVATED CAMERA MOVE lives in shot C — a slow pull back as
      the main charges, so the frame keeps growing to hold what has arrived.
   ========================================================================= */
export const S4: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("hall");
  const CUT = [0, 26, 70];
  const shot = CUT.filter((c) => f >= c).length - 1;
  const lf = f - CUT[shot];

  /* ---- A · CLOSE · three feeds joining the header ---------------------- */
  if (shot === 0) {
    const ch = E(lf, 2, 18, 0, 1, OUT);
    return (
      <Scene p={p} slug="MANIFOLD HALL  ·  THE HEADER" push={[0, 26, 1.05]} vig={0.56}>
        <Vault p={p} f={f} ribs={4} arch={false} />
        <Lamp x={166} y={70} s={0.98} z={26} f={f} on={1} />
        <Lamp x={846} y={70} s={0.98} z={26} f={f} on={1} />
        <Beam x={166} y={116} top={90} bot={380} len={470} c="#F2E2BC" o={0.20} z={22} f={f} />
        <Beam x={846} y={116} top={90} bot={380} len={470} c="#F2E2BC" o={0.20} z={22} f={f} />
        <Manifold x={W / 2} y={430} n={5} s={1.5} z={30} f={f} charge={ch * 5} w={520} />
        {/* the main leaving frame bottom */}
        <div style={{ position: "absolute", left: W / 2 - 78, top: 526, width: 156, height: 300,
          background: IRON, zIndex: 80, boxShadow: SH_D }} />
        <div style={{ position: "absolute", left: W / 2 - 78, top: 526, width: 40, height: 300,
          background: IRONL, opacity: 0.6, zIndex: 81 }} />
        <Motes x={506} y={180} w={620} h={340} n={12} f={f} z={86} />
        <Flash lf={lf} at={0} n={2} o={0.2} />
      </Scene>
    );
  }

  /* ---- B · WIDE · all twenty-nine land at once ------------------------- */
  if (shot === 1) {
    const ch = E(lf, 0, 14, 0, 1, OUT);
    const sk = shake(lf, 2, 16, 14);
    return (
      <Scene p={p} slug="ALL 29  ·  SIMULTANEOUSLY" push={[26, 70, 1.05]} vig={0.5}>
        <div style={{ position: "absolute", inset: 0, zIndex: 1,
          transform: `translate(${sk.x}px, ${sk.y}px)` }}>
          <Vault p={p} f={f} ribs={5} arch={false} />
          <Lamp x={130} y={62} s={0.9} z={26} f={f} on={1} />
          <Lamp x={882} y={62} s={0.9} z={26} f={f} on={1} />
          <Beam x={130} y={104} top={80} bot={400} len={520} c="#F2E2BC" o={0.19} z={22} f={f} />
          <Beam x={882} y={104} top={80} bot={400} len={520} c="#F2E2BC" o={0.19} z={22} f={f} />
          <Manifold x={W / 2} y={468} n={15} s={1.02} z={30} f={f} charge={ch * 15} w={880} />
          <div style={{ position: "absolute", left: W / 2 - 66, top: 534, width: 132, height: 300,
            background: IRON, zIndex: 80, boxShadow: SH_D }} />
          <div style={{ position: "absolute", left: W / 2 - 66, top: 534, width: 34, height: 300,
            background: IRONL, opacity: 0.6, zIndex: 81 }} />
          {/* the charge running down the main */}
          {ch > 0.4 && (
            <div style={{ position: "absolute", left: W / 2 - 52, top: 546, width: 104, height: 280,
              background: WATERD, zIndex: 82, borderRadius: 4 }} />
          )}
          <Chip t="ONE  /v1  ENDPOINT" y={620} z={96} c="#2E2415" />
          <Flash lf={lf} at={2} n={3} o={0.3} />
        </div>
      </Scene>
    );
  }

  /* ---- C · THE RATING PLATE swings in, then the pail fills. THE ONE MOVE. */
  const swing = E(lf, 4, 20, 0, 1, BACK);
  const fill = E(lf, 34, 58, 0, 0.82, OUT);
  const pull = E(lf, 0, 62, 1.14, 1.0, IO);      /* motivated pull-back */
  return (
    <Scene p={p} slug="RATED CAPACITY  ·  4B / MONTH" push={[70, 134, 1.02]} vig={0.5}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1,
        transform: `scale(${pull})`, transformOrigin: "50% 46%" }}>
        <Vault p={p} f={f} ribs={4} arch={false} />
        <Lamp x={196} y={64} s={0.96} z={26} f={f} on={1} />
        <Beam x={196} y={110} top={90} bot={420} len={500} c="#F2E2BC" o={0.22} z={22} f={f} />
        {/* the main, horizontal across frame, with the outlet at the right */}
        <div style={{ position: "absolute", left: -40, top: 300, width: 800, height: 118,
          background: IRON, zIndex: 40, boxShadow: SH_D }} />
        <div style={{ position: "absolute", left: -40, top: 300, width: 800, height: 28,
          background: IRONL, opacity: 0.62, zIndex: 41 }} />
        <div style={{ position: "absolute", left: -40, top: 396, width: 800, height: 22,
          background: IROND, zIndex: 41 }} />
        {[120, 330, 540].map((x, i) => (
          <div key={"mr" + i} style={{ position: "absolute", left: x, top: 288, width: 34,
            height: 142, borderRadius: 4, background: IRONL, zIndex: 43, boxShadow: SH }} />
        ))}
        <div style={{ position: "absolute", left: 700, top: 288, width: 128, height: 142,
          borderRadius: 8, background: IRONL, zIndex: 44, boxShadow: SH_D }} />
        <div style={{ position: "absolute", left: 742, top: 414, width: 44, height: 96,
          background: BRASS, zIndex: 45 }} />
        <Handwheel x={764} y={268} s={0.56} z={46} rot={fill * 130} />
        <Stream x={764} y={506} len={120} w={26} t={fill / 0.82} f={f} z={60} />
        <Pail x={764} y={614} s={1.0} z={70} fill={fill} />
        <Splash x={764} y={624} f={f} s={0.92} z={78} on={fill > 0.05 ? 1 : 0} />
        {/* the plate swings into the light on its hinge */}
        <div style={{ position: "absolute", left: 96, top: 452, zIndex: 88,
          transform: `rotate(${(1 - swing) * -72}deg)`, transformOrigin: "6% 40%",
          opacity: swing > 0.02 ? 1 : 0 }}>
          <RatingPlate x={0} y={0} s={1.06} z={88} />
        </div>
        <Motes x={506} y={150} w={640} h={300} n={11} f={f} z={86} />
      </div>
    </Scene>
  );
};

/* ================================================================== S5 ====
   16.50 -> 19.00s · 75f · PAYOFF · THE MECHANISM.
   "Hit one model's rate limit, it automatically jumps to the next."

   ⛔ THE TIGHTEST FRAMING IN THE REEL, and the one scene where nothing but the
      mechanism is on screen. The failover is eight frames of dead time and
      then flow at the same height — the gauge behind never dips, which is the
      actual claim.
   ⛔ THE ARM CLACKS TWICE. Once on the VO's beat, once unprompted at the end,
      so the viewer reads a LOOP rather than a one-off trick.
   ========================================================================= */
export const S5: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("gear");
  const CUT = [0, 44];
  const shot = CUT.filter((c) => f >= c).length - 1;
  const lf = f - CUT[shot];

  /* the failover, in scene-local frames: 07 dies at 16, the arm moves at 24 */
  const dead = f >= 16 && f < 62 ? 0 : -1;
  const arm = f < 24 ? -90 : f < 30 ? E(f, 24, 30, -90, 0, OUT) : f < 62 ? 0
    : E(f, 62, 68, 0, 90, OUT);
  const live = f < 27 ? 0 : f < 65 ? 1 : 2;

  /* ---- A · MACRO · the selector, and only the selector ----------------- */
  if (shot === 0) {
    const cough = f >= 16 && f < 24 ? Math.sin((f - 16) * 2.4) : 0;
    return (
      <Scene p={p} slug="CHANGEOVER  ·  ON 429" push={[0, 44, 1.05]} vig={0.62}>
        <Vault p={p} f={f} ribs={3} arch={false} dim={0.16} />
        <Beam x={230} y={-30} top={120} bot={620} len={760} c="#F0DDB0" o={0.18} z={20} f={f} />
        <Selector x={W / 2} y={396} s={1.06} z={40} f={f} arm={arm} live={live} dead={dead} />
        {/* the feed that died, spitting */}
        {cough !== 0 && (
          <div style={{ position: "absolute", left: W / 2 - 8 + cough * 5, top: 150, width: 16,
            height: 34, borderRadius: 8, background: WATERD, opacity: 0.7, zIndex: 92 }} />
        )}
        <Flash lf={f} at={24} n={3} o={0.26} />
      </Scene>
    );
  }

  /* ---- B · the gauge behind it never dips ----------------------------- */
  return (
    <Scene p={p} slug="FLOW HELD  ·  NO DROP" push={[44, 75, 1.05]} vig={0.58}>
      <Vault p={p} f={f} ribs={4} arch={false} dim={0.1} />
      <Beam x={786} y={-30} top={130} bot={560} len={720} c="#F0DDB0" o={0.18} z={20} f={f} />
      <Selector x={286} y={430} s={0.72} z={40} f={f} arm={arm} live={live} dead={-1} />
      {/* the column, steady, at the same height it was before the switch */}
      <div style={{ position: "absolute", left: 680, top: 96, width: 176, height: 560,
        background: IROND, zIndex: 30, boxShadow: SH_D }} />
      <div style={{ position: "absolute", left: 680, top: 96, width: 44, height: 560,
        background: IRON, zIndex: 31 }} />
      <Gauge x={768} y={128} h={496} t={0.94} w={68} z={36} f={f} labels={false} chop={0.6} />
      <Cam z={90} o={E(lf, 4, 14, 0, 1, OUT)}>
        <Plate x={636} y={648} t="NO DROP" sub="AUTO FAILOVER" w={244} s={1.06} z={92} />
      </Cam>
      <Motes x={500} y={150} w={520} h={340} n={10} f={f} z={84} />
    </Scene>
  );
};

/* ================================================================== S6 ====
   19.00 -> 20.93s · 58f · CTA.
   "Comment REPO and I'll send it immediately."

   ⛔ HARD CUT ON THE KEYWORD, and the keyword is CAST INTO THE WORLD — a brass
      tag on the tap chain — not floated over the picture.
   ⛔ THE BRIGHTEST FRAME IN THE REEL, with the receipt still on screen.
   ========================================================================= */
export const S6Cta: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("tap");
  const pop = E(f, 0, 9, 0, 1, BACK);
  const run = E(f, 2, 12, 0, 1, OUT);
  const sk = shake(f, 0, 12, 10);
  return (
    <Scene p={p} slug="COMMENT THE KEYWORD" push={[0, 58, 1.05]} vig={0.44}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1,
        transform: `translate(${sk.x}px, ${sk.y}px)` }}>
        <Vault p={p} f={f} ribs={3} arch={false} />
        <Lamp x={262} y={62} s={1.02} z={26} f={f} on={1} />
        <Beam x={262} y={108} top={110} bot={470} len={520} c="#F6E8C6" o={0.24} z={22} f={f} />
        {/* the outlet, running full bore */}
        <div style={{ position: "absolute", left: W / 2 - 52, top: -40, width: 104, height: 268,
          background: IRON, zIndex: 40, boxShadow: SH_D }} />
        <div style={{ position: "absolute", left: W / 2 - 118, top: 204, width: 236, height: 58,
          borderRadius: 8, background: IRONL, zIndex: 41, boxShadow: SH }} />
        <div style={{ position: "absolute", left: W / 2 - 38, top: 254, width: 76, height: 92,
          borderRadius: 6, background: BRASS, zIndex: 42 }} />
        <div style={{ position: "absolute", left: W / 2 - 38, top: 254, width: 22, height: 92,
          background: BRASSL, opacity: 0.8, zIndex: 43 }} />
        <Handwheel x={W / 2 + 132} y={224} s={0.66} z={44} rot={128} />
        <Stream x={W / 2} y={344} len={190} w={34} t={run} f={f} z={60} />
        <Pail x={W / 2} y={528} s={1.2} z={70} fill={0.30 + run * 0.44} />
        <Splash x={W / 2} y={538} f={f} s={1.1} z={78} on={run} />
        {/* THE KEYWORD, cast into a brass tag hanging off the tap chain */}
        <div style={{ position: "absolute", left: W / 2 - 316, top: 300, zIndex: 92,
          transform: `scale(${0.7 + pop * 0.3}) rotate(${-4 + (1 - pop) * 7}deg)`,
          transformOrigin: "50% 0%", opacity: pop }}>
          {[0, 1, 2].map((i) => (
            <div key={"ch" + i} style={{ position: "absolute", left: 84, top: -34 + i * 13,
              width: 22, height: 15, borderRadius: 7, border: `4px solid ${BRASSD}`,
              boxSizing: "border-box" }} />
          ))}
          <div style={{ padding: "16px 30px", borderRadius: 10, background: BRASS,
            border: `6px solid ${BRASSD}`, boxShadow: SH_D }}>
            <div style={{ fontFamily: MONO, fontWeight: 800, fontSize: 21, letterSpacing: "0.24em",
              color: "#4A3410" }}>COMMENT</div>
            <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 82,
              lineHeight: 1.02, letterSpacing: "-0.02em", color: "#2A1D06" }}>REPO</div>
          </div>
        </div>
        <MakerPlate x={W / 2 + 128} y={556} s={0.94} z={92} />
        <Flash lf={f} at={0} n={4} o={0.34} />
      </div>
    </Scene>
  );
};
