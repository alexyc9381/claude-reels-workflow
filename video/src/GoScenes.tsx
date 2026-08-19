import React from "react";
import { useCurrentFrame } from "remotion";
import {
  W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D,
  Scene, Cam, Mark, MarkCast, MarkPlate, idle, rock, shake, drift, squash,
  R, CLAY, CLAYD, GOLD, GREEN, RED, TEAL, PAPER, CREAMB, INK, MUTE, STEEL, OXIDE, BRASS,
  ui, mono, vivid, Rake, Ring, Puff, Pool, Belt, Part, ScrapMound, Chute, Mill,
  SpecSheet, OrderSlip, SpecPress, Roll, TallyBoard, SpecPlate, Crew, costumeFor,
  Dial, Crate, SkillRack, FlagWall, CardRail, DoneRack, ShopCounter,
} from "./GoWorld";
import { SetFor, Stanchion, Flood, placeFor } from "./GoSets";

/* ===========================================================================
   REEL 113 · "GO" — THE SCENES.  Board: storyboards/113-go.md.

   ⛔⛔ A CUT IS NOT AN EVENT (ANIMATION-QUALITY §2). Reel 104's five-shot open
   scored better on every number THE-OPEN gives and was rejected anyway: *"it's
   just cuts and then nothing happens."* Every scene below names its EVENT in
   four parts — a BEFORE state legible on the first frame, a TRIGGER, TRAVEL
   across real distance, and an ARRIVAL THAT COSTS SOMETHING (squash, recoil,
   dust, a ring). Nothing in this reel lands and simply stops.

   ⛔ ARRIVALS ARE SPREAD ACROSS THE FULL DURATION. A rebuild that put every
   arrival in the first third measured 5.94 — UNDER the bar — despite being
   better in every other way.

   ⛔⛔ THE THREE LONG SCENES CARRY INTERNAL HARD CUTS (S2 f90, S3 f62+f124,
   S7 f58+f112). A 5-6s scene may not hold one framing. The cut is a
   discontinuous `Cam` change, never a tween.

   ⛔⛔⛔ MARKS AND NUMERALS, NOT SENTENCES. Reel 109 passed every gate and was
   rejected on 33 `<span>`s in its animation layer. The whole reel's text
   budget is: the REDO tally, 11,415, MIT, SKILL, the floor casts 1/2/3, the
   flag counter, 1:00, and GO. One chip per shot, and the words live in the
   header band and the captions.
   ========================================================================= */

export type Variant = "shop" | "amber" | "steel";

/** ⛔ THE CAMERA OFFSET GOES ON THE PANEL CONTENTS, NEVER THE WHOLE COMP.
    Scaling the comp moves the chassis and wrecks the motion audit — measured on
    reels 83/84: 8.12 at scale 1.0 vs 3.72 at 1.038 on identical content.
    ⛔⛔ AND THE OFFSETS HAVE TO BE BIG ENOUGH TO BEAT A PERCEPTUAL HASH. Reel
    110 measured 64-bit dHash Hamming distances of 3.4-7.0 between its cuts —
    every pair an IG duplicate risk — because a 14px dx moves almost nothing a
    9x8 luma-gradient hash samples. ⛔ And the BASE cut must carry its own
    offset too: three cuts have to be three POINTS, not two orbiting a baseline
    (reel 111 measured night-vs-steel at 8.1 when night sat unmodified). */
export const CAM: Record<Variant, { dx: number; dy: number; s: number; rot: number }> = {
  shop:  { dx: -22, dy: 30, s: 1.062, rot: -0.8 },
  amber: { dx: -58, dy: -44, s: 1.142, rot: 0.7 },
  steel: { dx: 44, dy: 10, s: 1.118, rot: 1.2 },
};

/** a global grade per cut, on the PANEL CONTENTS only. A dHash compares
    ADJACENT-PIXEL LUMA, so a brightness shift moves nothing — it is CONTRAST
    and GAMMA that flip gradient signs near flat areas. It is a CSS filter, so
    nothing moves and the motion audit is unaffected.
    ⭐ `saturate()` is also where BODY_SAT is bought: it costs no luma and
    touches no dark stop (reel 111 fixed a 34.2% failure this way). */
export const GRADE: Record<Variant, string> = {
  shop:  "contrast(1.010) saturate(1.24) brightness(1.000) hue-rotate(-2deg)",
  amber: "contrast(1.190) saturate(1.36) brightness(0.938) hue-rotate(-15deg)",
  steel: "contrast(0.874) saturate(1.06) brightness(1.062) hue-rotate(13deg)",
};

/** ⭐ a genuinely different HOOK ACTION per cut — the memory's #1 variant
    lever. The three wrong parts land in a different rhythm and the mound is
    fed from a different height, which is the stretch a hash samples hardest. */
export const HOOK_V: Record<Variant, { ej: number[]; land: number[] }> = {
  shop:  { ej: [8, 34, 60], land: [20, 46, 72] },
  amber: { ej: [5, 27, 52], land: [16, 39, 65] },
  steel: { ej: [12, 40, 66], land: [24, 52, 78] },
};

/** a different push per cut, so no two cuts share a camera move on the same beat */
const push = (v: Variant, dur: number, base: number): [number, number, number] =>
  [0, dur, base + (v === "amber" ? 0.036 : v === "steel" ? -0.024 : 0.011)];

/* ⛔ `Scene` push walks content off-frame: keep `left >= 506 - 486/push`. At
   the reel's steepest push (1.14) that is left >= 80, so nothing hero-sized
   sits outside 80..932. */

/* =========================================================================
   S0 — THE SCRAP MOUND.  f0-93 (3.10s).  BEAT: HOOK.  Intensity 8.
   VO: "The people who never hit their Claude limit aren't using it better
        than you."

   ⭐⭐⭐ ONE LOCKED FRAMING IN WHICH SOMETHING HAPPENS, not four posters
   (ANIMATION-QUALITY §2 — reel 104's open went 9.97 -> 12.10 with FEWER cuts).
   ⭐ ONE DOMINANT OBJECT ([[feedback_hook_simplicity]]): the mound. One
   supporting element: the foreman. The world is behind it and held DOWN.

     before  f0   the mound is ALREADY colossal and already lit; the foreman is
                  mid-swing at the mill; the cream REDO board reads x1. Settled,
                  bright, no fade-in.
     trigger f8   the mill's ejector kicks
     travel  f8-20, f34-46, f60-72   three ~150px wrong parts arc ~520px across
                  frame — large, bright, fast, the only combination that
                  registers
     arrival f20/46/72  SLAM into the mound: squash, oxide puff, ring, the whole
                  mound rocks on a damped oscillation, the tally pops

   ⛔ THE FRAME-0 GATE. Panel luma >= 140 is carried by the flood, the floor
   pool and the cream board — NOT by lifting the palette's dark stop. The
   mound's own value is lifted instead (reel 109's fix): a ~92-luma mound
   against a ~205-luma board is still the biggest spread in the reel.
   ⛔ HOOK_PLATE wants ONE CONTIGUOUS CREAM MASS. The TallyBoard is 300x168 =
   ~6.3% on its own, so it is backed by the mill's cream job-card panel
   immediately beside it, making one bright region rather than three cards
   (reel 109 warned at 8.4% doing exactly the wrong thing).
   ====================================================================== */
export const S0: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const H_ = HOOK_V[v];
  const p = placeFor("scrap");
  /* the frame shakes on each slam — a big mass landing costs the camera */
  const sh = H_.land.reduce((a, k) => {
    const s = shake(f, k, 9, 9); return { x: a.x + s.x, y: a.y + s.y };
  }, { x: 0, y: 0 });
  return (
    <Scene p={p} slug="THE JOB SHOP" push={push(v, dur, 1.055)} vig={0.28}>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${sh.x}px, ${sh.y}px)` }}>
        <SetFor k="scrap" f={f} lit={1} t={f * 0.5} rakeRate={6.6} />

        {/* THE MOUND — one colossal mass, cropped by both side edges and the
            floor. It grows as it is fed. */}
        <ScrapMound x={430} y={p.horizon + 250} w={1180} f={f} z={34} lit={1.05} c={mxh(OXIDE, 0.26)}
          grown={H_.land.filter(k => f >= k).length / 3}
          jolt={H_.land.filter(k => f >= k).slice(-1)[0]} />

        {/* the villain, already here, already open */}
        <Chute x={92} y={p.horizon - 74} s={0.86} f={f} z={40} rings={[H_.land[2]]} />

        {/* the mill that keeps making them */}
        <Mill x={846} y={p.horizon + 34} s={0.94} f={f} z={38} spin={0.8}
          head={Math.sin(f / 11) * 26} />

        {/* THE FOREMAN — the subject is in frame 0 (THE-OPEN law 2) */}
        <Crew f={f} x={846} y={p.horizon + 252} i={0} size={206} z={56} at={-12} loop={1} />

        <Crew f={f} x={142} y={p.horizon + 268} i={2} size={158} z={56} at={-18} loop={3} flip />

        {/* the three wrong parts, ejected and slammed */}
        {H_.ej.map((ej, i) => {
          const land = H_.land[i];
          const t = E(f, ej, land, 0, 1, LIN);
          if (f < ej) return null;
          if (f > land) return null;
          const x0 = 820, x1 = 392 + (i - 1) * 96;
          const x = x0 + (x1 - x0) * t;
          /* a real arc: up first, then down onto the pile */
          const arc = -300 * Math.sin(t * Math.PI) - 40;
          return (
            <Part key={"wp" + i} x={x} y={p.horizon - 56 + arc + t * t * 130} s={1.62}
              wrong rot={t * 460} z={64} c={OXIDE} kind={i} />
          );
        })}
        {H_.land.map((k, i) => (<React.Fragment key={"ar" + i}>
          <Puff x={392 + (i - 1) * 96} y={p.horizon - 108} f={f} at={k} n={16} s={1.5} z={66} />
          <Ring x={392 + (i - 1) * 96} y={p.horizon - 96} f={f} at={k} r={230} c={p.key} z={65} />
        </React.Fragment>))}

        {/* ⛔ ONE CONTIGUOUS CREAM MASS at frame 0 — the board plus the mill's
            job-card panel read as one bright region, not as three cards. */}
        <div style={{ position: "absolute", left: 512, top: 156, width: 236, height: 196,
          zIndex: 70, borderRadius: 10, background: mxh(CREAMB, 0.16),
          border: `5px solid ${dkh(CREAMB, 0.30)}` }}>
          {[0.30, 0.48, 0.66, 0.84].map((k, i) => (
            <div key={"jl" + i} style={{ position: "absolute", left: "8%", top: `${k * 100}%`,
              width: `${56 + (i % 3) * 14}%`, height: 12, borderRadius: 3,
              background: hexa(INK, 0.26) }} />
          ))}
          <div style={{ position: "absolute", left: "8%", top: "8%", width: 46, height: 46,
            borderRadius: 9, background: CLAY }} />
        </div>
        <TallyBoard x={730} y={258} w={442} f={f}
          steps={[[-1, "×1"], [H_.land[0], "×2"], [H_.land[1], "×3"], [H_.land[2], "×4"]]}
          z={78} rot={-2.6} />

        {/* the mark, big and early — the audience filter */}
        <MarkCast x={188} y={196} s={132} z={72} f={f} spin={0.55} o={0.94} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S1 — THE PRESS LANDS.  f93-210 (3.90s).  BEAT: HOOK-2.  Intensity 7.
   VO: "They just installed this one free skill that stops Claude from doing
        the wrong thing in the first place."

   ⭐ THE VERB IS **STOPS**, so something is visibly stopped: the fourth order
   slip is already travelling toward the mill's throat at f0, and the board
   lands in the gap and halts it dead. *In the first place* is the whole point
   of the blocking — the interception happens BEFORE the throat, not after.

   ⛔ THE CRITIC PASS FLAGGED THIS SCENE. The first draft printed the four
   CALLOUTS here, which spends the hero artifact at 3s and leaves S5 restating
   it. The board now prints MARKS ONLY; the callouts are S5's job.
   ====================================================================== */
export const S1: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("press");
  const LOCK = 30;
  const sh = shake(f, LOCK, 11, 10);
  /* the slip travels in from the right and is stopped by the board */
  const slipT = E(f, 0, LOCK, 0, 1, LIN);
  const slipX = 1010 - slipT * 372;
  return (
    <Scene p={p} slug="THE PRESS BAY" push={push(v, dur, 1.075)} vig={0.56}>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${sh.x}px, ${sh.y}px)` }}>
        <SetFor k="press" f={f} lit={1} t={f * 0.42} rakeRate={5.8} />

        {/* the scrap floor still visible through the bay opening — the villain
            does not leave the world just because we changed rooms */}
        <div style={{ position: "absolute", left: -10, top: 214, width: 210, height: 372, zIndex: 15,
          borderRadius: 6, background: `linear-gradient(96deg, ${dkh(OXIDE, 0.44)} 0%, ${dkh(OXIDE, 0.72)} 100%)` }} />
        <ScrapMound x={92} y={572} w={330} f={f} z={16} lit={0.55} />

        {/* the mill's intake throat, facing camera */}
        <Mill x={738} y={p.horizon + 58} s={0.88} f={f} z={30} spin={0.6} mark={false}
          head={Math.sin(f / 13) * 20} />

        {/* THE SLIP, travelling — and stopped */}
        <OrderSlip x={slipX} y={332} w={168} f={f} rot={-9 + slipT * 20} crumple={0.7}
          strokes={[-99, -99, -99]} z={54}
          s={f > LOCK ? 1 - E(f, LOCK, LOCK + 6, 0, 0.18, OUT) : 1} />

        {/* THE SPEC PRESS — 470px, the biggest bright mass in the frame */}
        <SpecPress x={452} y={392} w={470} f={f} drop={14} z={48}
          marks={[38, 54, 70, 88]} />

        <Puff x={452} y={604} f={f} at={LOCK} n={14} s={1.3} c={p.grit} z={62} />
        <Ring x={452} y={598} f={f} at={LOCK} r={250} c={p.key} z={61} />

        {/* the crew that installed it, working the bay */}
        <Crew f={f} x={218} y={p.horizon + 128} i={1} size={150} z={52} at={44} />
        <Crew f={f} x={882} y={p.horizon + 136} i={3} size={144} z={52} at={62} flip />

        <MarkCast x={452} y={230} s={104} z={70} f={f} spin={0.45} o={0.55} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S2 — THE SPEC PLATE.  f210-396 (6.20s).  BEAT: RECEIPT.  Intensity 6.5.
   VO: "It even has over 11,000 stars on GitHub, MIT licensed, and completely
        free."

   TWO FRAMINGS, HARD CUT AT f90 — a 6.2s scene may not hold one shot.
   ⭐⭐ A NUMBER MOVES TO ITS VALUE. Eleven real stars fly in and stamp
   themselves into the plate; the counter rolls in DISCRETE POPS, never one
   smooth tween (reel 104: an 82-frame ramp measured WORSE than what it
   replaced; four discrete pops beat it and read better).
   ⛔ HONESTY: 11,415 and MIT are the exact live values. No FREE badge, no
   price — there is no money anywhere in this world (MONEY_BANNED).
   ====================================================================== */
export const S2: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("yard");
  const CUT = 90;
  const A = f < CUT;
  const STARS = Array.from({ length: 11 }, (_, i) => 12 + i * 6);
  const DIE = CUT + 14;
  return (
    <Scene p={p} slug="★ 11,415 · MIT" push={push(v, dur, A ? 1.09 : 1.06)} vig={0.60}
      slugC={TEAL}>
      <div style={{ position: "absolute", inset: 0 }}>
        <SetFor k="yard" f={f} lit={A ? 1 : 1.1} t={f * 0.3} rakeRate={4.1} />

        {/* ⛔ THE HARD CUT is a discontinuous Cam change, never a tween */}
        <Cam x={A ? 0 : 26} y={A ? 0 : -30} s={A ? 1 : 1.14} z={30}>
          {/* the press housing, filling two thirds of frame */}
          <div style={{ position: "absolute", left: 214, top: 138, width: 610, height: 470,
            borderRadius: 14, zIndex: 24,
            background: `linear-gradient(160deg, ${mxh("#3E4956", 0.16)} 0%, ${dkh("#3E4956", 0.46)} 100%)`,
            border: `8px solid ${dkh("#3E4956", 0.56)}` }}>
            {/* eight cast ribs, so the housing is a casting and not a slab */}
            {Array.from({ length: 8 }, (_, i) => (
              <div key={"hr" + i} style={{ position: "absolute", left: 22 + i * 71, top: 26,
                width: 34, bottom: 26, borderRadius: 5, background: dkh("#3E4956", 0.16) }} />
            ))}
            {/* the inspection hatch */}
            <div style={{ position: "absolute", left: 40, top: 330, width: 150, height: 108,
              borderRadius: 6, background: dkh("#3E4956", 0.42),
              border: `5px solid ${dkh("#3E4956", 0.58)}` }} />
          </div>
          {/* the work lamp that strikes the plate at f10 — and then SWEEPS,
              because a lamp that only switches on repaints one frame */}
          <Flood x={758 - E(f, 14, 86, 0, 430, IO)} y={54} s={0.9}
            on={E(f, 10, 14, 0.15, 1, OUT)} len={470} spread={180} c={p.key} />

          <SpecPlate x={506} y={318} w={520} f={f} z={58}
            starsAt={STARS}
            count={[[18, "2,400"], [34, "5,800"], [52, "9,100"], [74, R.starsText]]}
            dieAt={DIE} />

          <Ring x={520} y={352} f={f} at={74} r={300} c={GOLD} z={60} />
          <Puff x={430} y={430} f={f} at={DIE} n={12} s={1.1} c={p.grit} z={62} />
        </Cam>

        {/* ⭐ THE GANTRY CRANE — a full-width high-contrast travelling mass, the
            single highest row in the measured motion table. It carries a slung
            casting across the whole yard behind the housing. */}
        <div style={{ position: "absolute", left: -60, right: -60, top: 118, height: 26, zIndex: 20,
          background: `linear-gradient(180deg, ${mxh(STEEL, 0.10)} 0%, ${dkh(STEEL, 0.48)} 100%)` }} />
        {(() => {
          const gx = ((f * 7.4) % 1320) - 200;
          return (<>
            <div style={{ position: "absolute", left: gx, top: 130, width: 172, height: 62,
              zIndex: 22, borderRadius: 6,
              background: `linear-gradient(168deg, ${mxh(STEEL, 0.22)} 0%, ${dkh(STEEL, 0.42)} 100%)`,
              border: `5px solid ${dkh(STEEL, 0.54)}` }} />
            <div style={{ position: "absolute", left: gx + 80, top: 190, width: 9, height: 96,
              zIndex: 21, background: dkh(STEEL, 0.36) }} />
            <Part x={gx + 84} y={318} s={1.45} z={23} c={mxh(OXIDE, 0.20)} kind={1}
              rot={Math.sin(f / 12) * 7} />
          </>);
        })()}

        {/* the yard's own background process — a plate line running under the
            housing, so the scene is not one static casting */}
        <Belt x={-60} y={p.horizon + 96} w={1180} f={f} rate={5.7} z={24}
          carry={[{ o: 0.1, s: 0.7 }, { o: 0.42, s: 0.7 }, { o: 0.76, s: 0.7 }]} />

        {/* ⭐ THE STAMPING LINE. Blank plates feed in from the right, the die
            strikes, stamped plates carry out to the left — many large bright
            objects travelling continuously, which is the only shape that
            measures above bar, and it is literally the beat: a licence is
            PRESSED INTO a product.
            ⛔ Built here because the band-off probe measured this scene at 4.88
            with the travelling band carrying 33% of its number — the highest
            share in the reel, i.e. the one place the metric was being propped
            up rather than earned. */}
        {!A && Array.from({ length: 6 }, (_, i) => {
          const px = ((f * 9.4 + i * 210) % 1300) - 190;
          const done = px < 430;
          return (
            <div key={"bp" + i} style={{ position: "absolute", left: px, top: 552,
              width: 168, height: 104, zIndex: 46, borderRadius: 8,
              background: `linear-gradient(160deg, ${mxh(CREAMB, done ? 0.14 : -0.10)} 0%, ${dkh(CREAMB, 0.24)} 100%)`,
              border: `5px solid ${dkh(CREAMB, 0.40)}`,
              transform: `rotate(${Math.sin(f / 13 + i) * 2.2}deg)` }}>
              {/* the stamped ones carry the mark; the blanks do not */}
              {done && (<>
                <div style={{ position: "absolute", left: 16, top: 20, width: 62, height: 30,
                  borderRadius: 5, background: hexa(CLAYD, 0.20), border: `3px solid ${CLAYD}` }} />
                <div style={{ position: "absolute", left: 92, top: 26, width: 58, height: 9,
                  borderRadius: 3, background: hexa(INK, 0.36) }} />
                <div style={{ position: "absolute", left: 92, top: 44, width: 42, height: 9,
                  borderRadius: 3, background: hexa(INK, 0.24) }} />
              </>)}
              <div style={{ position: "absolute", left: 16, top: 66, width: 136, height: 8,
                borderRadius: 3, background: dkh(CREAMB, 0.30) }} />
            </div>
          );
        })}
        {!A && <Belt x={-90} y={660} w={1200} f={f} rate={9.4} z={44} c="#4E5660" />}
        {/* the press ram that strikes the line, cycling every 34 frames */}
        {!A && (() => {
          const c = (f - CUT) % 34;
          const dy = c < 12 ? E(c, 0, 8, -240, 0, IN_Q) : E(c, 14, 30, 0, -240, OUT);
          return (<div style={{ position: "absolute", left: 790, top: 332 + dy, width: 232,
            height: 186, zIndex: 52, borderRadius: 8,
            background: `linear-gradient(180deg, ${dkh(STEEL, 0.04)} 0%, ${dkh(STEEL, 0.44)} 100%)`,
            border: `7px solid ${dkh(STEEL, 0.54)}` }}>
            {[0.16, 0.72].map((k, i) => (
              <div key={"rg" + i} style={{ position: "absolute", left: `${k * 100}%`, top: -240,
                width: 24, height: 250, background: dkh(STEEL, 0.34) }} />
            ))}
          </div>);
        })()}

        {/* the crew walking the plate line beneath — four costumes, four loops */}
        {!A && [0, 1, 2, 3].map(i => (
          <Crew key={"c2" + i} f={f} x={168 + i * 226} y={p.horizon + 168} i={i + 4}
            size={126} z={54} at={CUT + 6 + i * 5} />
        ))}
        {A && [0, 1].map(i => (
          <Crew key={"c2a" + i} f={f} x={132 + i * 760} y={p.horizon + 132} i={i + 2}
            size={132} z={54} at={20 + i * 12} flip={i === 1} />
        ))}

        <MarkCast x={880} y={196} s={112} z={70} f={f} spin={0.5} o={0.72} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S3 — THE TURN.  f396-580 (6.13s).  BEAT: TURN, the villain wins.  Int 7.5.
   VO: "Here's the problem. You type a rough prompt, Claude does exactly what
        you typed, and you burn three more messages explaining what you
        actually meant."

   ⭐⭐ ANIMATION-QUALITY §10: RUN THE §3 TEST PER SCENE, ON THE VERB, AND CUT
   TO THE MEASURED WORD ONSETS. Every one below is `round(onset*30) - 396`,
   read out of words_113go.json, not estimated:
       You=20  type=25  rough=33  Claude=60  does=65  exactly=67
       burn=103  three=106  messages=123
   THREE FRAMINGS, hard cuts at f58 and f100 — placed so "Claude" lands 2
   frames after the first cut and "burn" 3 frames after the second.

   ⛔ This is the reel's only repeated set, and that is deliberate: the RETURN
   is the beat (you did this again). It is relit from the opposite side, a stop
   down and colder, and the mound is demoted from subject to foreground mass.
   ====================================================================== */
export const S3: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("scrap2");
  const CUT1 = 58, CUT2 = 100;
  const A = f < CUT1, B = f >= CUT1 && f < CUT2, C = f >= CUT2;
  /* the three sweeps and the three bells — the villain goes 3-0 up */
  const SWEEP = [106, 120, 134], BELL = SWEEP.map(k => k + 6);
  const sh = BELL.reduce((a, k) => {
    const s = shake(f, k, 6, 7); return { x: a.x + s.x, y: a.y + s.y };
  }, { x: 0, y: 0 });
  return (
    <Scene p={p} slug="EXACTLY AS DRAWN" push={push(v, dur, A ? 1.06 : B ? 1.10 : 1.08)}
      vig={0.64} slugC={RED}>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${sh.x}px, ${sh.y}px)` }}>
        <SetFor k="scrap2" f={f} lit={B ? 1.5 : 1} t={f * 0.44} rakeRate={6.9} />
        {/* the mound, now a foreground mass rather than the subject */}
        <ScrapMound x={148} y={p.horizon + 250} w={720} f={f} z={20} lit={0.62} />

        {/* ---- SHOT A — "you type a rough prompt" ------------------------- */}
        {A && (<Cam x={0} y={0} s={1.34} z={32}>
          <Mill x={846} y={p.horizon + 30} s={0.92} f={f} z={22} mark={false}
            head={Math.sin(f / 10) * 30} />
          <Belt x={-80} y={676} w={1180} f={f} rate={6.4} z={20}
            carry={[{ o: 0.12, s: 0.8, wrong: true }, { o: 0.52, s: 0.8, wrong: true },
                    { o: 0.86, s: 0.8, wrong: true }]} />
          <OrderSlip x={470} y={392} w={296} f={f} z={54} rot={-6}
            strokes={[20, 25, 33, 40]} crumple={E(f, 46, 54, 0, 1, OUT)} />
          {/* the hand that writes it: the foreman leaning in over the slip */}
          <Crew f={f} x={866} y={p.horizon + 176} i={0} size={210} z={50} at={0} loop={1} flip />
          <Puff x={512} y={470} f={f} at={50} n={8} s={0.8} c={p.grit} z={60} />
        </Cam>)}

        {/* ---- SHOT B — "Claude does EXACTLY what you typed" -------------- */}
        {B && (<Cam x={0} y={-26} s={1.16} z={32}>
          {/* the mill traces the crumpled line STROKE FOR STROKE. It is
              obedient and it is useless — that is the whole beat. */}
          <Mill x={506} y={p.horizon + 46} s={1.16} f={f} z={30} mark={false}
            head={E(f, CUT1 + 4, CUT2 - 4, -150, 150, LIN)} />
          {/* the part being cut IS the scribble, in steel */}
          <Part x={506} y={p.horizon - 78} s={1.9} wrong z={44} c={mxh(STEEL, 0.24)} tag />
          {/* the cutter's sparks, landing where the head is */}
          {Array.from({ length: 10 }, (_, i) => {
            const hx = 506 + E(f, CUT1 + 4, CUT2 - 4, -150, 150, LIN);
            const a = rnd(i, 3) * Math.PI - Math.PI / 2;
            const d = ((f * 7 + i * 13) % 46);
            return (<div key={"sp" + i} style={{ position: "absolute",
              left: hx + Math.cos(a) * d * 1.6, top: p.horizon - 96 + Math.sin(a) * d * 0.8 + d * 0.5,
              width: 9, height: 9, borderRadius: 5, background: GOLD, zIndex: 52,
              opacity: Math.max(0, 0.9 - d / 46) }} />);
          })}
          <div style={{ position: "absolute", left: 646, top: 214, zIndex: 74 }}>
            <span style={{ ...ui(30, 900), color: hexa(CREAMB, 0.92), letterSpacing: "0.10em",
              background: hexa("#1A1207", 0.62), padding: "10px 18px", borderRadius: 8 }}>
              EXACTLY AS DRAWN
            </span>
          </div>
        </Cam>)}

        {/* ---- SHOT C — "you burn THREE more messages" -------------------- */}
        {C && (<Cam x={0} y={0} s={1.0} z={32}>
          <Chute x={190} y={p.horizon - 60} s={1.12} f={f} z={44} rings={BELL} />
          <Mill x={806} y={p.horizon + 40} s={0.86} f={f} z={30} spin={0.9} mark={false} />
          <Belt x={286} y={p.horizon - 104} w={440} f={f} rate={7.0} z={26} />
          {/* three wrong parts swept off the bed and into the chute */}
          {SWEEP.map((k, i) => {
            const t = E(f, k, k + 12, 0, 1, IN_Q);
            if (f < k || t >= 1) return null;
            return (<Part key={"sw" + i} x={740 - t * 550} y={p.horizon - 128 + t * t * 210}
              s={1.15} wrong rot={-t * 300} z={56} c={OXIDE} />);
          })}
          {/* the inspector's arm, swinging on each sweep */}
          <div style={{ position: "absolute", left: 620, top: p.horizon - 250, width: 190, height: 30,
            borderRadius: 8, background: dkh(STEEL, 0.26), zIndex: 50, transformOrigin: "100% 50%",
            transform: `rotate(${SWEEP.reduce((a, k) => a + (f >= k && f < k + 12 ? E(f, k, k + 5, 0, -52, OUT) + E(f, k + 5, k + 12, 0, 52, IO) : 0), 8)}deg)` }} />
          {BELL.map((k, i) => <Ring key={"br" + i} x={190} y={p.horizon - 30} f={f} at={k}
            r={190} c={RED} z={58} />)}
          <Crew f={f} x={906} y={p.horizon + 150} i={0} size={162} z={52} at={CUT2} loop={3} flip />
        </Cam>)}

        <MarkCast x={886} y={166} s={92} z={70} f={f} spin={0.4} o={0.48} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S4 — THE BRAIN DUMP.  f580-714 (4.47s).  BEAT: MECHANISM.  Int 8.
   VO: "Now you just brain dump what you want in a messy paragraph and it hands
        you back a beautiful prompt."

   Onsets (scene-local): brain=28 dump=37 messy=53 paragraph=60 hands=81
   back=89 beautiful=107 prompt=118.

   ⭐ *messy paragraph* is drawn as EIGHTEEN ragged scraps of different sizes
   and rotations, tumbling continuously across brain->paragraph. Many large
   bright objects arriving continuously is the ONLY shape that measures above
   bar (ANIMATION-QUALITY §9), and here it is also exactly what the line says.
   ⭐ *hands you back* — the press RETURNS it and the foreman receives it.
   ⛔ The sheet's callouts are NOT inked here beyond the first: S5 owns them.
   ====================================================================== */
export const S4: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("press");
  const TIP = 24, SLAM = 78, EJECT = 88;
  const sh = shake(f, SLAM, 15, 12);
  return (
    <Scene p={p} slug="THE PRESS BAY" push={push(v, dur, 1.09)} vig={0.58}>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${sh.x}px, ${sh.y}px)` }}>
        <SetFor k="press" f={f} lit={1.06} t={f * 0.46} rakeRate={6.1} />

        {/* two crew on the far bench, on their own action loops */}
        <Crew f={f} x={126} y={p.horizon + 120} i={5} size={128} z={30} at={0} />
        <Crew f={f} x={922} y={p.horizon + 126} i={7} size={124} z={30} at={8} flip />

        {/* THE HOPPER, tipping */}
        <div style={{ position: "absolute", left: 300, top: 128, width: 250, height: 150, zIndex: 46,
          transformOrigin: "88% 92%", transform: `rotate(${E(f, TIP, TIP + 12, 0, 62, OUT)}deg)`,
          borderRadius: "8px 8px 34px 34px",
          background: `linear-gradient(170deg, ${mxh("#5E5A52", 0.20)} 0%, ${dkh("#5E5A52", 0.44)} 100%)`,
          border: `6px solid ${dkh("#5E5A52", 0.56)}` }}>
          {[0.2, 0.5, 0.8].map((k, i) => (
            <div key={"hp" + i} style={{ position: "absolute", left: `${k * 100}%`, top: 12,
              width: 10, bottom: 30, background: dkh("#5E5A52", 0.24) }} />
          ))}
        </div>

        {/* THE PRESS, with its platen */}
        <SpecPress x={506} y={410} w={470} f={f} z={40} platen={66} />
        {/* the bay's overhead stock, crossing the full width */}
        {Array.from({ length: 4 }, (_, i) => (
          <Part key={"ov" + i} x={((f * 8.6 + i * 300) % 1400) - 190} y={188} s={0.90}
            z={20} kind={(i + 2) % 4} c={mxh(STEEL, 0.10)} rot={Math.sin(f / 15 + i) * 5} />
        ))}

        {/* EIGHTEEN ragged scraps tumbling onto the bed — the brain dump */}
        {Array.from({ length: 18 }, (_, i) => {
          const at = 26 + i * 2.6;
          const t = E(f, at, at + 16, 0, 1, IN_Q);
          if (f < at) return null;
          const gone = f >= SLAM;
          const tx = 506 + (rnd(i, 3) - 0.5) * 330;
          const ty = 470 + (rnd(i, 7) - 0.5) * 92;
          const w0 = 74 + rnd(i, 11) * 92;
          return (
            <OrderSlip key={"sc" + i} x={430 + (tx - 430) * t} y={210 + (ty - 210) * t}
              w={w0} f={f} z={44 + i} rot={-60 + rnd(i, 5) * 120 + (1 - t) * 200}
              crumple={0.9} strokes={[]} o={gone ? 1 - E(f, SLAM, SLAM + 4, 0, 1, OUT) : 1} />
          );
        })}

        {/* THE SLAM */}
        <Puff x={506} y={492} f={f} at={SLAM} n={20} s={1.9} c={p.grit} z={64} spread={1.4} />
        <Ring x={506} y={486} f={f} at={SLAM} r={340} c={p.key} z={63} />

        {/* THE SHEET — one clean sheet where eighteen ragged ones were */}
        {f >= EJECT - 2 && (<>
          <SpecSheet x={506} y={430 - E(f, EJECT, EJECT + 12, 0, 96, OUT)} w={252} f={f}
            z={70} ink={[96, -1, -1, -1]} s={squash(f, EJECT + 10, 0.14, 3, 12)} />
          <Ring x={506} y={430} f={f} at={EJECT} r={260} c={PAPER} z={69} />
        </>)}

        {/* the foreman receives it */}
        <Crew f={f} x={786} y={p.horizon + 168} i={0} size={196} z={72} at={0}
          loop={f >= EJECT ? 2 : 1} flip />

        <MarkCast x={162} y={214} s={100} z={68} f={f} spin={0.5} o={0.5} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S5 — THE THREE CALLOUTS.  f714-813 (3.30s).  BEAT: MECHANISM-2.  Int 8.5.
   VO: "What the output should look like, and what files Claude should touch,
        and when to stop."

   Onsets (scene-local): What=0 output=10 look=27 files=45 Claude=53 touch=67
   when=78 stop=87.

   ⭐⭐ EACH CALLOUT IS A MECHANISM WITH BOTH HALVES (ANIMATION-QUALITY §10),
   never a label:
     OUTPUT  a silhouette inks in AND the real part rises behind and REGISTERS
             into it (input and output)
     FILES   nine tags; three are pulled up and clamped AND a lock bar drops
             across the other six (scope is the six you may NOT touch)
     STOP    a stop block travels in and BOLTS DOWN, and the carriage that has
             been running the rail all scene HITS IT and recoils — the
             background process is the thing that gets stopped
   ⛔⛔ MARKS ONLY. This scene's text budget is ONE chip and it spends it on
   nothing: there is not a single word on screen.
   ====================================================================== */
export const S5: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("press2");
  const REG = 24, DRAWER = 42, CLAMP = [50, 55, 60], LOCK = 66, BLOCK = 76, BOLT = 87;
  const sh = shake(f, BOLT, 9, 9);
  /* the carriage that runs the rail all scene, and is stopped at BOLT */
  const carX = f < BOLT ? 92 + ((f * 9) % 700) : 92 + ((BOLT * 9) % 700) + rock(f, BOLT, 9, 16);
  return (
    <Scene p={p} slug="THE SPEC SHEET" push={push(v, dur, 1.075)} vig={0.70}>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${sh.x}px, ${sh.y}px)` }}>
        <SetFor k="press2" f={f} lit={1} t={f * 0.3} rakeRate={5.2} />
        {/* ⛔ EVERY SHOT NEEDS A BACKGROUND PROCESS and one 96px carriage was not
            it — this scene measured STATIC at 5.36 with 61% HOLD. A full-width
            belt is the single biggest cheap mover there is. */}
        <Belt x={-60} y={716} w={1140} f={f} rate={6.8} z={22}
          carry={[{ o: 0.15, s: 0.62 }, { o: 0.55, s: 0.62 }, { o: 0.88, s: 0.62 }]} />

        {/* the rail and its running carriage — the background process, and the
            thing the STOP block will halt */}
        <div style={{ position: "absolute", left: 60, right: 60, top: 682, height: 16, zIndex: 26,
          borderRadius: 4, background: `linear-gradient(180deg, ${mxh(STEEL, 0.16)} 0%, ${dkh(STEEL, 0.44)} 100%)` }} />
        <div style={{ position: "absolute", left: carX, top: 640, width: 96, height: 54, zIndex: 28,
          borderRadius: 6, background: `linear-gradient(170deg, ${mxh(STEEL, 0.24)} 0%, ${dkh(STEEL, 0.40)} 100%)`,
          border: `4px solid ${dkh(STEEL, 0.52)}` }}>
          {[0.2, 0.62].map((k, i) => (
            <div key={"cw" + i} style={{ position: "absolute", left: `${k * 100}%`, bottom: -12,
              width: 26, height: 26, borderRadius: "50%", background: dkh(STEEL, 0.48) }} />
          ))}
        </div>

        {/* THE SHEET, filling the frame */}
        <SpecSheet x={452} y={352 - E(f, 6, 92, 0, 76, IO)} w={392} f={f} z={50} ink={[4, DRAWER, BLOCK, -1]} />

        {/* the real part rising behind the sheet and REGISTERING into the
            silhouette — the OUTPUT callout's second half */}
        <Part x={452} y={236 - E(f, REG, REG + 14, 300, 0, OUT)} s={1.15} z={46}
          o={E(f, REG - 2, REG + 4, 0, 1, OUT)} />
        <Ring x={452} y={236} f={f} at={REG + 14} r={230} c={PAPER} z={62} />

        {/* THE FILE-TAG DRAWER, sliding open below the sheet. ⛔ It travels 150px,
            not 60: an ACTION IS A DISTANCE, and a lift that covers under a third
            of its own size reads as a state change, not a movement. */}
        <div style={{ position: "absolute", left: 210, top: 596 - E(f, DRAWER, DRAWER + 10, 150, 0, OUT),
          width: 540, height: 104, zIndex: 44, borderRadius: 6,
          opacity: E(f, DRAWER - 2, DRAWER + 4, 0, 1, OUT),
          background: `linear-gradient(180deg, ${mxh("#5E5A52", 0.18)} 0%, ${dkh("#5E5A52", 0.46)} 100%)`,
          border: `5px solid ${dkh("#5E5A52", 0.58)}` }}>
          {Array.from({ length: 9 }, (_, i) => (
            <div key={"tg" + i} style={{ position: "absolute", left: 14 + i * 57, top: 13,
              width: 48, height: 72, borderRadius: 4,
              background: i < 3 ? CLAY : dkh(CREAMB, 0.20),
              border: `3px solid ${i < 3 ? dkh(CLAY, 0.34) : dkh(CREAMB, 0.42)}`,
              transform: i < 3 && f >= CLAMP[i] ? `translateY(${E(f, CLAMP[i], CLAMP[i] + 7, 0, -186, OUT)}px)` : undefined }} />
          ))}
          {/* THE LOCK BAR across the six that may not be touched */}
          <div style={{ position: "absolute", left: 182, top: 34 - E(f, LOCK, LOCK + 6, 140, 0, IN_Q),
            width: 342, height: 30, borderRadius: 5, background: RED,
            border: `3px solid ${dkh(RED, 0.34)}`, opacity: f >= LOCK - 4 ? 1 : 0 }} />
        </div>
        {CLAMP.map((k, i) => <Ring key={"cr" + i} x={238 + i * 57} y={452} f={f} at={k + 7}
          r={90} c={CLAY} z={64} w={4} />)}

        {/* THE STOP BLOCK, travelling in along the rail and bolting down */}
        {f >= BLOCK - 4 && (
          <div style={{ position: "absolute", left: 1060 - E(f, BLOCK, BOLT, 0, 320, OUT), top: 626,
            width: 84, height: 82, zIndex: 60, borderRadius: 5, background: RED,
            border: `5px solid ${dkh(RED, 0.36)}`,
            transform: `scaleY(${squash(f, BOLT, 0.20, 3, 11)})`, transformOrigin: "50% 100%" }}>
            {[0.16, 0.62].map((k, i) => (
              <div key={"sb" + i} style={{ position: "absolute", left: `${k * 100}%`, top: "22%",
                width: 22, height: 22, borderRadius: "50%", background: dkh(RED, 0.46) }} />
            ))}
          </div>
        )}
        <Puff x={760} y={700} f={f} at={BOLT} n={12} s={1.1} c={p.grit} z={66} />
        <Ring x={760} y={694} f={f} at={BOLT} r={200} c={RED} z={65} />

        <MarkCast x={880} y={200} s={96} z={68} f={f} spin={0.5} o={0.42} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S6 — THE MINUTE.  f813-863 (1.67s).  BEAT: SETUP.  Int 7.
   VO: "And now the setup takes just one minute."

   The reel's only DAYLIGHT scene and its brightest frame — maximum separation
   from the gold on both sides. ⛔ The HAND moves to the value; the numeral is
   on the dial face, where a numeral belongs on a real instrument.
   ====================================================================== */
export const S6: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("dock");
  const DROP = 4, LAND = 22;
  const sh = shake(f, LAND, 12, 10);
  return (
    <Scene p={p} slug="ONE MINUTE" push={push(v, dur, 1.05)} vig={0.44} slugC={CLAYD}>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${sh.x}px, ${sh.y}px)` }}>
        <SetFor k="dock" f={f} lit={1} t={f * 0.3} rakeRate={3.6} />
        <Belt x={-60} y={p.horizon + 44} w={1140} f={f} rate={5.2} z={24} />
        <Dial x={506} y={392} s={360} f={f} drop={DROP} sweep={LAND + 2} z={54} />
        <Puff x={506} y={556} f={f} at={LAND} n={16} s={1.5} c={p.grit} z={62} />
        <Ring x={506} y={550} f={f} at={LAND} r={300} c="#FFFFFF" z={61} />
        <Crew f={f} x={168} y={p.horizon + 150} i={2} size={150} z={52} at={LAND + 4} />
        <Crew f={f} x={868} y={p.horizon + 154} i={9} size={146} z={52} at={LAND + 9} flip />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S7 — THE THREE MOVES.  f863-1029 (5.53s).  BEAT: SETUP-2.  Int 6.5.
   VO: "All you have to do is just download the repo, go to Claude, then
        customize and add skills, and that's absolutely it."

   Onsets (scene-local): download=44 repo=57 Claude=69 customize=78 skills=106
   absolutely=134.

   ⛔⛔ THE CRITIC PASS FLAGGED THIS SCENE. The first draft was three crates
   with three labels — the exact reel-104 CONTAINER failure (*"it's just three
   little cards… I'm not really getting anything from seeing the animations"*).
   It is now three different PHYSICAL ACTIONS in three framings, with a light
   change on the middle one, and the step numbers are CAST INTO THE FLOOR
   rather than typeset over the objects.

   THREE FRAMINGS, hard cuts at f44 and f100 — "download" lands on the first
   cut and "skills" 6 frames after the second.
   ====================================================================== */
export const S7: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("dock");
  const CUT1 = 44, CUT2 = 100;
  const A = f < CUT1, B = f >= CUT1 && f < CUT2, C = f >= CUT2;
  const LAND = 50, LID = 58, CROSS = 69;
  const SEATS = [106, 120, 134];
  const sh = shake(f, LAND, 12, 10);
  /* the floor cast: which step number is lit */
  const step = C ? "3" : B ? "2" : "1";
  return (
    <Scene p={p} slug="THE INTAKE DOCK" push={push(v, dur, A ? 1.05 : B ? 1.08 : 1.06)} vig={0.58}>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${sh.x}px, ${sh.y}px)` }}>
        <SetFor k="dock" f={f} lit={B ? 1.1 : 1} t={f * 0.34} rakeRate={3.9} />

        {/* THE STEP NUMBER, cast into the dock floor — not typeset over a card */}
        <div style={{ position: "absolute", left: 62, top: p.horizon + 96, zIndex: 22,
          transform: "rotate(-4deg) skewX(-19deg)" }}>
          <span style={{ ...ui(150, 900), color: hexa(INK, 0.20), letterSpacing: "-0.03em" }}>{step}</span>
        </div>

        {/* ---- SHOT A — the chute, and something is coming --------------- */}
        {A && (<Cam x={0} y={0} s={1.0} z={32}>
          <div style={{ position: "absolute", left: 590, top: -40, width: 300, height: 330, zIndex: 40,
            borderRadius: 8, transform: "rotate(15deg)",
            background: `linear-gradient(178deg, ${dkh(STEEL, 0.20)} 0%, ${dkh(STEEL, 0.48)} 100%)`,
            border: `6px solid ${dkh(STEEL, 0.56)}` }}>
            {Array.from({ length: 6 }, (_, i) => (
              <div key={"cr" + i} style={{ position: "absolute", left: 14, right: 14, top: 24 + i * 48,
                height: 10, borderRadius: 4, background: mxh(STEEL, 0.14) }} />
            ))}
          </div>
          <Belt x={-60} y={p.horizon + 40} w={1140} f={f} rate={7.4} z={24}
            carry={[{ o: 0.08, s: 0.82 }, { o: 0.34, s: 0.82 }, { o: 0.62, s: 0.82 },
                    { o: 0.88, s: 0.82 }]} />
          {/* the dock's waiting stock, so the opening shot is a working dock
              and not an empty room with one chute in it */}
          {[[96, 0], [268, 1], [438, 2]].map(([sx, k], i) => (
            <div key={"ws" + i} style={{ position: "absolute", left: sx, top: p.horizon - 44 - i * 8,
              width: 104, height: 128, zIndex: 30, borderRadius: 6,
              background: `linear-gradient(166deg, ${mxh("#9A7A4E", 0.14)} 0%, ${dkh("#9A7A4E", 0.36)} 100%)`,
              border: `5px solid ${dkh("#9A7A4E", 0.48)}`,
              transform: `rotate(${-2 + i * 2}deg)` }}>
              {[0.24, 0.52, 0.78].map((ky, j) => (
                <div key={"wl" + j} style={{ position: "absolute", left: 8, right: 8,
                  top: `${ky * 100}%`, height: 7, background: dkh("#9A7A4E", 0.24) }} />
              ))}
            </div>
          ))}
          <Crew f={f} x={620} y={p.horizon + 160} i={0} size={196} z={52} at={0} loop={1} />
          <Crew f={f} x={862} y={p.horizon + 148} i={6} size={140} z={52} at={10} loop={3} flip />
        </Cam>)}

        {/* ---- SHOT B — the crate lands, and is walked in to Claude ------ */}
        {B && (<Cam x={0} y={-16} s={1.10} z={32}>
          <Crate x={276} y={p.horizon + 96} w={300} f={f} drop={LAND - 15} lid={LID} z={50} />
          <Puff x={276} y={p.horizon + 100} f={f} at={LAND} n={16} s={1.5} c={p.grit} z={62} />
          <Ring x={276} y={p.horizon + 96} f={f} at={LAND} r={280} c="#FFFFFF" z={61} />
          {/* THE DOORWAY, with a 350px turning mark on its header — this is
              where the thing arrives AT CLAUDE, and the light changes on him
              as he crosses. That light change is the whole beat. */}
          {/* the doorway: a dark OPENING inside a clay frame, with a header
              beam and two jambs — a flat slab reads as nothing */}
          <div style={{ position: "absolute", left: 560, top: 120, width: 340, height: 476, zIndex: 32,
            borderRadius: 6, background: `linear-gradient(180deg, ${dkh("#3A1F12", 0.02)} 0%, ${dkh("#3A1F12", 0.42)} 100%)` }} />
          <div style={{ position: "absolute", left: 540, top: 104, width: 382, height: 54, zIndex: 34,
            borderRadius: 5, background: `linear-gradient(180deg, ${mxh(CLAY, 0.20)} 0%, ${dkh(CLAY, 0.28)} 100%)` }} />
          {[540, 866].map((jx, i) => (
            <div key={"jb" + i} style={{ position: "absolute", left: jx, top: 104, width: 44,
              height: 500, zIndex: 34, borderRadius: 4,
              background: `linear-gradient(90deg, ${mxh(CLAY, 0.14)} 0%, ${dkh(CLAY, 0.34)} 100%)` }} />
          ))}
          {/* the shop visible THROUGH it, so the opening has depth */}
          {[0, 1, 2].map(i => (
            <div key={"tg" + i} style={{ position: "absolute", left: 592 + i * 88, top: 300 + (i % 2) * 44,
              width: 74, height: 190, zIndex: 33, borderRadius: 4,
              background: hexa(mxh(CLAY, 0.26), 0.34 + i * 0.08) }} />
          ))}
          <MarkCast x={730} y={210} s={196} z={38} f={f} spin={0.9} o={0.95} />
          {/* the foreman crossing the threshold with the crate */}
          <Crew f={f} x={366 + E(f, CROSS, CROSS + 24, 0, 292, IO)} y={p.horizon + 168} i={0}
            size={190} z={52} at={CUT1} loop={0}
            tint={f >= CROSS + 12 ? mxh(CLAY, 0.14) : undefined} />
          {/* the light spilling out of the doorway onto the floor */}
          <Pool x={730} y={p.horizon + 108} w={520} c={CLAY} o={0.34} z={20} />
        </Cam>)}

        {/* ---- SHOT C — three skill blanks dealt and seated -------------- */}
        {C && (<Cam x={0} y={10} s={1.04} z={32}>
          {/* the bench */}
          <div style={{ position: "absolute", left: 96, top: p.horizon + 12, width: 820, height: 82,
            zIndex: 40, borderRadius: 6,
            background: `linear-gradient(180deg, ${mxh("#6A6259", 0.22)} 0%, ${dkh("#6A6259", 0.44)} 100%)`,
            border: `5px solid ${dkh("#6A6259", 0.54)}` }} />
          {/* the feed of blanks coming to the bench, running all shot */}
          {Array.from({ length: 4 }, (_, i) => (
            <div key={"fb" + i} style={{ position: "absolute", left: ((f * 8.8 + i * 296) % 1380) - 180,
              top: 206, width: 150, height: 92, zIndex: 24, borderRadius: 6,
              background: `linear-gradient(166deg, ${mxh(CLAY, 0.10)} 0%, ${dkh(CLAY, 0.34)} 100%)`,
              border: `4px solid ${dkh(CLAY, 0.46)}`,
              transform: `rotate(${Math.sin(f / 14 + i) * 3}deg)` }} />
          ))}
          <SkillRack x={470} y={392} w={620} f={f} seats={SEATS} z={46} />
          {SEATS.map((k, i) => <Ring key={"sr" + i} x={296 + i * 196} y={392} f={f} at={k + 8}
            r={160} c={CLAY} z={62} />)}
          {/* "and that's absolutely it" — palms up */}
          <Crew f={f} x={856} y={p.horizon + 170} i={0} size={192} z={52} at={CUT2}
            loop={f >= 134 ? 2 : 1} flip />
        </Cam>)}
      </div>
    </Scene>
  );
};

/* =========================================================================
   S8 — THE INSPECTION.  f1029-1132 (3.43s).  BEAT: ESCALATE.  Int 7.5.
   VO: "It checks against 30 plus unknown ways that prompts waste credits,"

   Onsets (scene-local): checks=2 against=7 30=10 plus=21 unknown=29 waste=60
   credits=71.

   ⭐⭐ ANIMATION-QUALITY §10: A BEAM WITH NO FINDINGS IS A PROGRESS BAR. The
   sweep is not the beat — what it FINDS is. 35 flags stab in across five
   volleys spread over the FULL duration, each >= 46px so it survives the
   audit's 1012->240 downsample AND reads to a human.
   ⛔ HONESTY: 35 is the repo's own published figure and the VO says "30 plus",
   so drawing the exact number is safe. No cost, no percentage, no "credits
   saved" — the flags are DEFECTS FOUND, which is all the repo claims.
   ⭐ This is the most saturated frame in the reel: BODY_SAT is bought back
   here after two pale sets.
   ====================================================================== */
export const S8: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("insp");
  const VOLLEYS = [10, 26, 42, 58, 74];
  const FLASH = 88;
  return (
    <Scene p={p} slug="35 FOUND" push={push(v, dur, 1.10)} vig={0.58} slugC={RED}>
      <div style={{ position: "absolute", inset: 0 }}>
        <SetFor k="insp" f={f} lit={1} t={f * 0.5} rakeRate={7.5} />

        {/* the whole wall flashes once under the lamp when the last volley lands */}
        <div style={{ position: "absolute", inset: 0, zIndex: 78, pointerEvents: "none",
          background: hexa("#FF9E7A", (E(f, FLASH, FLASH + 3, 0, 1, OUT) - E(f, FLASH + 3, FLASH + 16, 0, 1, IO)) * 0.30) }} />

        <FlagWall x={92} y={168} w={828} h={420} f={f} lamp={[6, 86]} volleys={VOLLEYS} z={30} />

        {/* the villain is still in the room — this is where it is being audited */}
        <Chute x={958} y={p.horizon - 40} s={0.72} f={f} z={42} />

        {/* the counter, rolling in discrete pops, one per volley */}
        <div style={{ position: "absolute", left: 96, top: 622, width: 320, height: 116, zIndex: 74,
          borderRadius: 10, background: mxh(CREAMB, 0.10), border: `5px solid ${dkh(CREAMB, 0.32)}`,
          display: "flex", alignItems: "center", paddingLeft: 26 }}>
          <Roll x={0} y={0} f={f} steps={[[VOLLEYS[0] + 12, "7"], [VOLLEYS[1] + 12, "14"],
            [VOLLEYS[2] + 12, "21"], [VOLLEYS[3] + 12, "28"], [VOLLEYS[4] + 12, "35"]]}
            size={62} z={4} c={CLAYD} />
        </div>

        {/* the inspector, working the wall */}
        <Crew f={f} x={620} y={p.horizon + 176} i={2} size={188} z={54} at={4} loop={1} />
        <Crew f={f} x={834} y={p.horizon + 168} i={10} size={150} z={54} at={22} loop={3} flip />

        <MarkCast x={880} y={168} s={104} z={70} f={f} spin={0.6} o={0.62} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S9 — THE CARD RAIL.  f1132-1249 (3.90s).  BEAT: ESCALATE-2.  Int 7.
   VO: "and it remembers your old thought process, so it even stops
        contradicting you on every chat."

   Onsets (scene-local): remembers=5 old=16 thought=25 process=27 stops=54
   contradicting=66 chat=106.

   ⭐ [[feedback_graphical_over_textual]]'s own worked case: *"it remembers
   across chats"* is drawn as BARS TRAVELLING ACROSS A SESSION BOUNDARY —
   never labelled trays, never key/value rows.
   ⭐⭐ AND §10's both-halves rule: the rail carries cards forward AND REFUSES
   one that contradicts them, on the word "stops". A hand-off with no refusal
   would be half the mechanism.
   ⭐ The reel's ONE lateral camera move (floor 2 allows 2-3; every other scene
   is a locked push).
   ====================================================================== */
export const S9: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("rail");
  const RUNS = [8, 16, 24, 32, 40, 48, 76, 88];
  const REJECT = 54;
  /* the one lateral track in the reel, motivated by the cards it follows */
  const track = E(f, 8, 108, 0, -96, IO);
  return (
    <Scene p={p} slug="CARRIED FORWARD" push={push(v, dur, 1.055)} vig={0.60} slugC={GREEN}>
      <div style={{ position: "absolute", inset: 0 }}>
        <SetFor k="rail" f={f} lit={1} t={f * 0.4} rakeRate={5.5} />
        <Cam x={track} y={0} s={1.06} z={32}>
          {/* the two bays the cards run between */}
          {[0, 1].map(i => (
            <div key={"by" + i} style={{ position: "absolute", left: 40 + i * 560, top: 384,
              width: 400, height: 300, borderRadius: 8, zIndex: 22,
              background: `linear-gradient(172deg, ${dkh("#1E4038", 0.14)} 0%, ${dkh("#1E4038", 0.48)} 100%)`,
              border: `5px solid ${dkh("#1E4038", 0.54)}` }}>
              {Array.from({ length: 3 }, (_, j) => (
                <div key={"bs" + j} style={{ position: "absolute", left: 20, right: 20, top: 40 + j * 82,
                  height: 12, borderRadius: 3, background: hexa("#8FE0BC", 0.20) }} />
              ))}
            </div>
          ))}
          <CardRail x={40} y={210} w={940} f={f} runs={RUNS} reject={REJECT} z={40} divide={0.52} />
        </Cam>

        <Ring x={640} y={296} f={f} at={REJECT + 8} r={230} c={RED} z={64} />
        <Crew f={f} x={200} y={p.horizon + 186} i={6} size={164} z={54} at={6} loop={3} />
        <Crew f={f} x={824} y={p.horizon + 180} i={8} size={158} z={54} at={30} loop={1} flip />

        <MarkCast x={506} y={640} s={116} z={70} f={f} spin={0.5} o={0.44} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S10 — THE CHUTE CLOSES.  f1249-1326 (2.57s).  BEAT: PAYOFF.  Int 9.5.
   VO: "So now you get the same work for way fewer retries,"

   Onsets (scene-local): same=21 work=30 fewer=58 retries=60.

   ⭐⭐⭐ THE PEAK, AND THE ONLY TIME THE VILLAIN LOSES. For the first time in
   the reel a part travels PAST the chute — the bell swings and does NOT ring
   (a soft wooden knock where a bell used to be) — and then the shutter DROPS
   and latches, with weight: a slam, a rocking oscillation, dust.
   ⭐⭐ THE HONEST RECEIPT. "Way fewer retries" is drawn as RETRIES: an OLD row
   that fills to four parts for one order against a NEW row that lands one.
   ⛔ Nothing here says money, percent or tokens (MONEY_BANNED, RATE_BANNED).
   ====================================================================== */
export const S10: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("out");
  const REL = 6, PASS = 24, LAND = 40, SHUT = 48;
  const sh = shake(f, SHUT, 16, 13);
  const OLD = [28, 40, 52, 62], NEW = [68];
  return (
    <Scene p={p} slug="ONE PASS" push={push(v, dur, 1.08)} vig={0.46} slugC={GREEN}>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${sh.x}px, ${sh.y}px)` }}>
        <SetFor k="out" f={f} lit={1} t={f * 0.36} rakeRate={5.0} />

        {/* the villain, open and hungry — for the last time */}
        <Chute x={126} y={p.horizon - 96} s={0.98} f={f} z={44} shut={SHUT} />

        <Mill x={870} y={p.horizon + 20} s={0.80} f={f} z={30} spin={0.7} mark={false} />
        <Belt x={-60} y={p.horizon - 46} w={1180} f={f} rate={6.8} z={26}
          carry={[{ o: 0.18, s: 0.8 }, { o: 0.62, s: 0.8 }]} />

        {/* THE PART, travelling the full panel width — AND PASSING THE CHUTE */}
        {f >= REL && (() => {
          const t = E(f, REL, LAND, 0, 1, IO);
          return (<Part x={806 - t * 570} y={p.horizon - 108 - Math.sin(t * Math.PI) * 96}
            s={1.25} z={58} rot={t * 26} />);
        })()}
        <Ring x={236} y={p.horizon - 96} f={f} at={LAND} r={250} c={p.key} z={60} />
        <Puff x={200} y={p.horizon + 30} f={f} at={SHUT} n={18} s={1.6} c={p.grit} z={62} />

        <DoneRack x={236} y={p.horizon + 6} w={330} f={f} lands={[LAND]} z={46} c={CLAYD} />
        {/* the finished stock building up behind him, spread across the FULL
            duration — an arrival inside the first third leaves the rest dead */}
        {[14, 30, 46, 58, 68].map((k, i) => (
          f >= k ? <Part key={"fs" + i} x={402 + i * 122} y={p.horizon - 178 + (i % 2) * 36}
            s={0.94} z={40} kind={i % 4}
            rot={E(f, k, k + 8, -28, 0, OUT) + Math.sin(f / 16 + i) * 2.4} /> : null
        ))}

        {/* THE RECEIPT — four passes for one order, against one. Countable,
            no numeral, nothing about money. */}
        <div style={{ position: "absolute", left: 520, top: 596, width: 420, height: 148, zIndex: 72,
          borderRadius: 10, background: mxh(CREAMB, 0.12), border: `5px solid ${dkh(CREAMB, 0.30)}` }}>
          <div style={{ position: "absolute", left: 18, top: 16, right: 18, height: 52,
            display: "flex", gap: 12, alignItems: "center" }}>
            {OLD.map((k, i) => (
              <div key={"ov" + i} style={{ width: 62, height: 46, borderRadius: 5,
                background: f >= k ? OXIDE : hexa(INK, 0.08),
                border: `3px solid ${f >= k ? dkh(OXIDE, 0.34) : hexa(INK, 0.14)}`,
                transform: `scale(${f >= k ? squash(f, k, 0.22, 3, 10) : 0.9})` }} />
            ))}
          </div>
          <div style={{ position: "absolute", left: 18, top: 82, right: 18, height: 52,
            display: "flex", gap: 12, alignItems: "center" }}>
            {NEW.map((k, i) => (
              <div key={"nv" + i} style={{ width: 62, height: 46, borderRadius: 5,
                background: f >= k ? GREEN : hexa(INK, 0.08),
                border: `3px solid ${f >= k ? dkh(GREEN, 0.30) : hexa(INK, 0.14)}`,
                transform: `scale(${f >= k ? squash(f, k, 0.28, 3, 11) : 0.9})` }} />
            ))}
          </div>
        </div>

        <Crew f={f} x={640} y={p.horizon + 176} i={0} size={196} z={54} at={0}
          loop={f >= LAND ? 2 : 1} />
        <MarkCast x={506} y={186} s={122} z={70} f={f} spin={0.6} o={0.58} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S11 — THE FOREIGN MACHINE.  f1326-1387 (2.03s).  BEAT: PAYOFF-2.  Int 8.
   VO: "and this even works on your ChatGPT prompts too."

   Onsets (scene-local): works=11 ChatGPT=32 prompts=38 too=48.

   The SAME sheet, unchanged, drives a visibly DIFFERENT machine to an
   identical result. ⛔ No competitor mark and no competitor logo: the point is
   portability, and putting another company's mark under "this works on your X"
   invites a claim about their product. The difference is drawn in the
   machine's own FORM — a different silhouette, a different body colour, a
   different-pitched spin-up.
   ====================================================================== */
export const S11: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("out");
  const FEED = 6, RUN = 12, LAND = 40;
  return (
    <Scene p={p} slug="ANY MACHINE" push={push(v, dur, 1.07)} vig={0.44}>
      <div style={{ position: "absolute", inset: 0 }}>
        <SetFor k="out" f={f} lit={1.06} t={f * 0.34} rakeRate={4.7} />

        <Belt x={-60} y={p.horizon - 70} w={1180} f={f} rate={6.2} z={24}
          carry={[{ o: 0.25, s: 0.78 }, { o: 0.72, s: 0.78 }]} />

        {/* the first machine's part, already on the rack from S10 */}
        <DoneRack x={286} y={p.horizon + 30} w={330} f={f} lands={[-1, LAND]} z={46} c={CLAYD} />
        <Part x={220} y={p.horizon - 4} s={0.92} z={52} />

        {/* THE FOREIGN MILL — a different make, and it has to READ as one.
            ⛔ No competitor mark anywhere: the point is portability, and putting
            another company's logo under "this works on your X" invites a claim
            about their product. The difference is drawn in the machine's own
            FORM — a squat two-column gantry in a cool body, against the house
            mill's single-column overarm. */}
        <div style={{ position: "absolute", left: 556, top: 232, width: 400, height: 92, zIndex: 33,
          borderRadius: 8, background: `linear-gradient(180deg, ${mxh("#5E7C96", 0.36)} 0%, ${dkh("#5E7C96", 0.22)} 100%)`,
          border: `6px solid ${dkh("#5E7C96", 0.44)}` }} />
        {[566, 878].map((cx, i) => (
          <div key={"fc" + i} style={{ position: "absolute", left: cx, top: 300, width: 76,
            height: 260, zIndex: 33, borderRadius: 6,
            background: `linear-gradient(94deg, ${mxh("#5E7C96", 0.30)} 0%, ${dkh("#5E7C96", 0.26)} 100%)`,
            border: `5px solid ${dkh("#5E7C96", 0.46)}` }} />
        ))}
        <Mill x={756} y={p.horizon + 14} s={0.86} f={f} z={34} mark={false} foreign
          head={E(f, RUN, LAND, -96, 96, IO)} />
        {/* the feed arm that carries the sheet INTO it */}
        <div style={{ position: "absolute", left: 400 + E(f, FEED, RUN + 6, 0, 150, OUT), top: 336,
          width: 190, height: 26, zIndex: 44, borderRadius: 5,
          background: `linear-gradient(180deg, ${mxh(STEEL, 0.24)} 0%, ${dkh(STEEL, 0.42)} 100%)` }} />

        {/* the SAME sheet, unchanged, fed to it */}
        <SpecSheet x={318 + E(f, FEED, RUN + 6, 0, 264, OUT)} y={300} w={214} f={f} z={60}
          ink={[0, 0, 0, 0]} rot={-8 + E(f, FEED, RUN + 6, 0, 8, OUT)}
          o={E(f, FEED - 2, FEED + 4, 0, 1, OUT)} />

        <Ring x={352} y={p.horizon - 24} f={f} at={LAND} r={220} c={p.key} z={62} />
        <Crew f={f} x={926} y={p.horizon + 168} i={11} size={162} z={54} at={2} loop={2} flip />
        <Crew f={f} x={112} y={p.horizon + 160} i={4} size={150} z={54} at={16} loop={0} />
        <MarkCast x={506} y={182} s={112} z={70} f={f} spin={0.6} o={0.50} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S12 — DOUBLE THE WORK.  f1387-1492 (3.50s).  BEAT: STAKES.  Int 7.5.
   VO: "If you're paying for Claude and still writing your own prompts, you're
        paying for double the tokens."

   Onsets (scene-local): paying=6 writing=33 own=45 prompts=52 double=77
   tokens=92.

   ⛔⛔ "DOUBLE THE TOKENS" IS THE ONE LINE THAT NAMES A COST, AND IT MUST NOT
   BECOME A MONEY GRAPHIC. It is drawn as WORK DONE TWICE: two identical lanes
   run to the same finished part, the left one looping through the mill four
   times while the right goes straight through, and both delivering the SAME
   part to the same counter. Nothing on screen states a price, a rate or a
   token count (MONEY_BANNED, RATE_BANNED).
   ====================================================================== */
export const S12: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("counter");
  const CUT = 56;
  const A = f < CUT;
  const PASSES = [20, 40, 60, 80], DONE = 92;
  return (
    <Scene p={p} slug="TWICE THE WORK" push={push(v, dur, A ? 1.06 : 1.09)} vig={0.46} slugC={GOLD}>
      <div style={{ position: "absolute", inset: 0 }}>
        <SetFor k="counter" f={f} lit={1} t={f * 0.3} rakeRate={4.4} />

        <Cam x={A ? 0 : 0} y={A ? 0 : -30} s={A ? 1.0 : 1.14} z={32}>
          {/* the two lanes, running side by side to the same counter */}
          {[0, 1].map(i => (
            <div key={"ln" + i} style={{ position: "absolute", left: 40, top: 252 + i * 176,
              width: 940, height: 62, borderRadius: 6, zIndex: 24, overflow: "hidden",
              background: `linear-gradient(180deg, ${mxh(STEEL, 0.22)} 0%, ${dkh(STEEL, 0.42)} 100%)`,
              border: `5px solid ${dkh(STEEL, 0.54)}` }}>
              {/* the roller bed's rollers — a lane you can see stock ride on */}
              {Array.from({ length: 17 }, (_, j) => (
                <div key={"rr" + j} style={{ position: "absolute", left: 8 + j * 55, top: 8,
                  width: 34, height: 42, borderRadius: 17, background: mxh(STEEL, 0.40),
                  border: `3px solid ${dkh(STEEL, 0.40)}` }} />
              ))}
            </div>
          ))}
          {/* the LEFT lane's loop: the same arc, run four times */}
          <div style={{ position: "absolute", left: 542, top: 152, width: 356, height: 250, zIndex: 22,
            borderRadius: "50%", border: `30px solid ${hexa(STEEL, 0.52)}` }} />
          {/* the loop's four station posts, so the circuit is a MACHINE and not a ring */}
          {[[542, 152], [872, 152], [542, 372], [872, 372]].map(([lx, ly], i) => (
            <div key={"lp" + i} style={{ position: "absolute", left: lx - 16, top: ly - 16,
              width: 56, height: 56, borderRadius: 8, zIndex: 23,
              background: `linear-gradient(160deg, ${mxh(STEEL, 0.22)} 0%, ${dkh(STEEL, 0.40)} 100%)`,
              border: `4px solid ${dkh(STEEL, 0.52)}` }} />
          ))}
          <Belt x={-60} y={620} w={1180} f={f} rate={6.0} z={20} />
          {(() => {
            const last = PASSES.filter(k => f >= k).length;
            const k = PASSES[Math.min(last, 3)];
            const t = E(f, k - 20, k, 0, 1, LIN);
            const a = -Math.PI / 2 + t * Math.PI * 2;
            return (<Part x={720 + Math.cos(a) * 178} y={283 + Math.sin(a) * 125} s={1.20}
              wrong z={50} rot={t * 360} />);
          })()}
          {/* the RIGHT lane: straight through, once — plus the stock behind it,
              so the lane is a RUNNING LINE and not a single object */}
          {(() => {
            const t = E(f, 8, DONE, 0, 1, IO);
            return (<Part x={110 + t * 760} y={450} s={1.20} z={50} />);
          })()}
          {Array.from({ length: 5 }, (_, i) => (
            <Part key={"rl" + i} x={((f * 8.2 + i * 236) % 1360) - 180} y={450} s={0.96}
              z={46} c={mxh(STEEL, 0.16)} kind={(i + 1) % 4} rot={Math.sin(f / 14 + i) * 4} />
          ))}
          {Array.from({ length: 4 }, (_, i) => (
            <Part key={"ll" + i} x={((f * 8.2 + i * 300) % 1420) - 200} y={283} s={0.92}
              z={26} wrong c={mxh(OXIDE, 0.18)} rot={-Math.sin(f / 15 + i) * 5} />
          ))}
          {/* the left lane's three discarded siblings, stacking as it loops */}
          {PASSES.slice(0, 3).map((k, i) => (
            f >= k + 6 ? <Part key={"ds" + i} x={330} y={620 - i * 34} s={0.78} wrong
              z={54 + i} c={OXIDE} rot={-6 + i * 5} /> : null
          ))}
        </Cam>

        {/* both parts land on the counter at once, and the left one lands on
            top of its own discarded stack */}
        <Ring x={330} y={596} f={f} at={DONE} r={230} c={p.key} z={64} />
        <Ring x={840} y={470} f={f} at={DONE} r={190} c={p.key} z={64} />
        <ShopCounter y={648} f={f} z={66} />
        <Crew f={f} x={132} y={720} i={3} size={150} z={70} at={CUT} loop={3} />
        <MarkCast x={506} y={168} s={104} z={72} f={f} spin={0.5} o={0.52} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S13 — THE HAND-OFF.  f1492-1558 (2.20s).  BEAT: CTA.  Int 7.
   VO: "Just comment GO and I'll send you the free setup."

   Onsets (scene-local): comment=3 GO=11 send=33 free=43 setup=49.

   *I'll send you* is a physical hand-off across a counter, TOWARD CAMERA. The
   word GO is cast into the counter face — the CTA's single permitted text
   object, in the display weight, mute-readable at thumb distance (THE-OPEN law
   4). ⛔ No confetti: the arrival IS the hand-off.
   ====================================================================== */
export const S13: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("counter");
  const SLIDE = 6, LAND = 28;
  return (
    <Scene p={p} slug="COMMENT GO" push={push(v, dur, 1.06)} vig={0.48} slugC={GOLD}>
      <div style={{ position: "absolute", inset: 0 }}>
        <SetFor k="counter" f={f} lit={1.06} t={f * 0.3} rakeRate={4.7} />

        {/* the crew stepping up behind the counter, each on its own loop */}
        {[0, 1, 2, 3].map(i => (
          <Crew key={"ct" + i} f={f} x={188 + i * 216} y={p.horizon + 150} i={i}
            size={172} z={40} at={34 + i * 6} />
        ))}

        {/* the dispatch line behind the counter — sleeves going out all scene,
            which is also what the CTA promises */}
        {Array.from({ length: 5 }, (_, i) => (
          <div key={"dp" + i} style={{ position: "absolute", left: ((f * 9.0 + i * 248) % 1360) - 180,
            top: 420, width: 156, height: 104, zIndex: 30, borderRadius: 7,
            background: `linear-gradient(162deg, ${mxh(CREAMB, 0.06)} 0%, ${dkh(CREAMB, 0.26)} 100%)`,
            border: `5px solid ${dkh(CREAMB, 0.40)}`,
            transform: `rotate(${Math.sin(f / 12 + i) * 2.6}deg)` }}>
            <div style={{ position: "absolute", left: 14, top: 18, width: 54, height: 26,
              borderRadius: 4, background: CLAY }} />
            {[0.48, 0.66, 0.82].map((k, j) => (
              <div key={"dl" + j} style={{ position: "absolute", left: 14, top: `${k * 100}%`,
                width: `${64 - j * 12}%`, height: 8, borderRadius: 3, background: hexa(INK, 0.26) }} />
            ))}
          </div>
        ))}
        <Belt x={-90} y={528} w={1200} f={f} rate={9.0} z={28} c="#5A4B3C" />

        <MarkCast x={506} y={192} s={300} z={44} f={f} spin={0.8} o={0.96} />

        <ShopCounter y={560} f={f} z={66} go goAt={11} />

        {/* THE SHEET, in a dispatch sleeve, pushed across the counter and
            handed to YOU — it grows as it comes */}
        {(() => {
          const t = E(f, SLIDE, LAND, 0, 1, OUT);
          return (<>
            <SpecSheet x={506} y={470 + t * 190} w={190 + t * 168} f={f} z={74}
              ink={[0, 0, 0, 0]} rot={(1 - t) * -7}
              s={f >= LAND ? squash(f, LAND, 0.12, 3, 12) : 1} />
            <Ring x={506} y={660} f={f} at={LAND} r={300} c={p.key} z={73} />
          </>);
        })()}
      </div>
    </Scene>
  );
};
