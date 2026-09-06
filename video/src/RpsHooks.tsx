import React from "react";
import { useCurrentFrame, Img, staticFile } from "remotion";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D,
  Scene, Cam, Contact, Ring, Puff, Steam, Fall, Crew, Forearm, Rig, anchors, Motes,
  CLAY, GOLD, GREEN, RED, INK, IRON, CHROME, BONE, BRASS,
  REPOS, repoBy, asPlace, GY, mono, ui, lerpHex,
} from "./RpsWorld";
import type { Kit, Repo } from "./RpsWorld";
import { Room } from "./HwSets";
import { ShopWall, BayLamp, TyreStack, Toolbox, Drum, Lift, Chain, Hook, Tag, HangPart, Hoist, CrewBand, GhFitout } from "./RpsSets";
import { RepoCard, GhSign, Gem, Sled, Rotor, Cyc, Contact2 } from "./RpsProps";
import { LAY, RAKE_K, RAKE_X, RAKE_N, punch } from "./RpsScenes";
import type { Variant, SP } from "./RpsScenes";

/* ===========================================================================
   REEL 137 · "REPOS" — THE HOOK CANDIDATES.

   ⛔⛔ docs/THE-OPEN.md STEP 1: the first build step is N concepts for scene 0,
   each rendered at full quality on the real chassis, and THREE CUTS = THREE
   HOOKS, NOT THREE GRADES. Each candidate is a different one-word MECHANISM
   on the same set, the same subject and the same line:

     lift   ELEVATION   the scissor lift raises him INTO the four hanging parts
     drop   LOAD        the four parts come DOWN onto him one by one; he takes
                        each with his whole body (a body against a load)
     pit    SWARM       he skids in on a dolly and a pit crew sprints in from
                        both edges carrying the parts, slamming them on

   ⭐ ALL THREE OBEY THE WINNERS' CHECKLIST (feedback_read_the_winning_hook):
   one body, f0 already mid-action, the event inside ~30 frames, travel over a
   third of the body, an arrival that COSTS, the last third a body action, and
   it does NOT resolve — the fourth part is still coming when the cut lands.

   ⭐ FRAME 0 LUMA rides the pale brick wall and the lit floor of `floor`, never
   the hero, so the hero can stay saturated clay against a pale ground and
   hold the biggest value spread in the frame.
   ========================================================================= */

export type HookId = "lift" | "drop" | "pit";

/** the four hoists across the gantry, in repo order, with the part hanging */
const HOIST_X = [396, 650, 506, 800];
const HOIST_LEN = [112, 122, 40, 96];

/* ---- a mixed crew band: the four bay crews, one colour each -------------- */
const ShopCrew: React.FC<{ f: number; v: Variant; cheer?: number; y?: number }> = ({ f, v, cheer = 0, y = H + 62 }) => {
  const L = LAY[v];
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 84 }}>
      {REPOS.map((r, i) => (
        <Crew key={r.key} f={f} x={126 + i * 254 + (rnd(i + 3, 2) - 0.5) * 34 + L.c * 0.3} y={y - (i % 2) * 12}
          i={r.cos[1] + i * 5} size={184 - (i % 3) * 8} z={84 + (i % 2)} at={-40} loop={i % 2 === 0 ? 0 : 2} tint={r.c}
          flip={i % 2 === 1} cheer={cheer} />
      ))}
    </div>
  );
};

/* =========================================================================
   lift · ELEVATION
   BEFORE  f0: he stands braced on the lift at floor level, the ram hissing,
           four parts hanging above him on the hoists, the first already
           lowering. Settled, mid-action, the joke already legible.
   TRIGGER f6 / f12: the lift JOLTS twice and fails to rise.
   TRAVEL  f14-58: the scissors open and he rises 300px toward the parts while
           the parts come down 60px to meet him.
   ARRIVAL f58: the INTAKE meets his hip and LOCKS — clank, recoil, sparks, a
           ring; he squashes and recovers; the tag on that hoist lights.
   ⛔ f66-102: the HUD swings in toward his shoulder and is still swinging when
           the cut lands. It does not resolve.
   ====================================================================== */
export const LIFTHOOK: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("floor");
  const L = LAY[v];
  /* ⭐⭐⭐ MECHANISM: SPIN-UP. The Claude mark IS the hook.
     ⛔ Round 4 (a Claude dragging a loaded sled) fixed the SHAPE but broke legibility: *"wtf is he
     even wheeling ... it doesn't even seem on topic with Claude — maybe it should be a big logo of
     Claude with white background."* An invented object costs the viewer the three seconds the reel
     has. So the object is the one thing nobody has to decode.

     BEFORE   f0 the mark is DEAD GREY in a stalled rotor: it judders, strains against the lock and
              does not turn. Sparks off the rim. Legible with the sound off — this Claude is stock.
     TRIGGER  f10 the first repo SLOTS into the rim. It costs: a clank, a ring, sparks, a kick.
     TRAVEL   the rotor TURNS. 96° after the first, 300° after the second, 700° after the third —
              a 540px wheel, so the rim travels ~2,900px in the hook.
     ARRIVAL  each socket fills, its quadrant lights, the mark gains colour and the ground warms.
     ⛔ IT DOES NOT RESOLVE — the fourth repo is still flying in at the cut, one socket still dark. */
  const SLOT = [10, 32, 58, 92];
  const SPD  = [0.30, 2.6, 6.0, 10.4];                 /* degrees per frame after each repo */
  let angle = 0, sp = SPD[0];
  for (let i = 0; i < Math.min(f, 102); i++) {
    const stage = SLOT.filter((t) => i >= t).length;
    sp = SPD[Math.min(3, stage)];
    angle += sp + (i < SLOT[0] ? Math.sin(i / 2.6) * 1.6 : 0);
  }
  const hit = SLOT.slice(0, 3).reduce((m, at) => { const d = f - at; return d >= 0 && d < 12 ? Math.max(m, Math.exp(-d / 3.2)) : m; }, 0);
  const filled = SLOT.filter((t) => f >= t).length;
  const lit = Math.min(1, filled / 3.2) * (0.72 + 0.28 * Math.min(1, f / 60));
  const judder = f < SLOT[0] ? 1 : Math.max(0, 1 - (f - SLOT[0]) / 8);
  /* ⭐ it also COMES UP as it spins up: the whole assembly grows 560 → 700 and rises, so the beat
     has scale as well as rotation — the lever that made cut 3 read ([[feedback_make_an_action_read]]). */
  const grow = 520 + 118 * Math.min(1, filled / 3);
  const RX = 506 + L.a * 0.3, RY = 448 - (grow - 520) * 0.20;
  const camS = 1.0 + 0.085 * E(f, 0, dur, 0, 1, LIN);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.0]} vig={0.30}>
      <Cam s={camS} x={0} y={0} z={12}>
      {/* the bright test bay: the near-white ground the note asked for, warming as it spins up */}
      <Cyc z={20} warm={Math.min(1, filled / 3)} f={f} />
      <GhFitout p={p} f={f} seed={0} z={22} graphX={54} graphY={196} cols={8} rail={false} lift={0.34} />
      {/* the shop is still under it: the hazard lip and the crew keep it in the world */}
      <div style={{ position: "absolute", left: -20, top: GY - 4, width: W + 40, height: 16, zIndex: 30,
        background: `repeating-linear-gradient(-45deg, ${GOLD} 0 22px, ${INK} 22px 44px)`, opacity: 0.9 }} />
      <GhSign x={190} y={214} w={244} z={26} on={E(f, 2, 8, 0.5, 1, OUT)} f={f} />
      {/* the mount the rotor turns in */}
      <div style={{ position: "absolute", left: RX - 34, top: RY, width: 68, height: Math.max(0, GY - RY), zIndex: 40,
        background: `linear-gradient(90deg, ${dkh(IRON, 0.34)}, ${mxh(IRON, 0.12)} 45%, ${dkh(IRON, 0.42)})` }} />
      <div style={{ position: "absolute", left: RX - 150, top: GY - 26, width: 300, height: 30, zIndex: 40,
        borderRadius: 8, background: `linear-gradient(180deg, ${mxh(IRON, 0.1)}, ${dkh(IRON, 0.44)})`, boxShadow: SH_D }} />
      <Contact2 x={RX} y={GY - 10} w={grow * 0.86} o={0.30 + 0.12 * lit} z={44} />
      <Rotor x={RX} y={RY} f={f} d={grow} z={60} angle={angle} lit={lit} filled={filled} judder={judder} hit={hit} rate={sp} />
      {/* ⭐ the tacho: a real number climbing with the rotor, the shop's own way of saying FASTER */}
      <div style={{ position: "absolute", left: 214, top: 536, zIndex: 96, display: "flex",
        flexDirection: "column", alignItems: "flex-start", gap: 4 }}>
        <div style={{ ...mono(17, 800), letterSpacing: "0.18em", color: hexa("#5C5346", 0.8) }}>RPM</div>
        <div style={{ ...ui(88, 900), letterSpacing: "-0.04em", lineHeight: 0.92,
          color: lerpHex("#7A7266", "#C7502B", lit) }}>{Math.round(sp * 480).toLocaleString("en-US")}</div>
        <div style={{ width: 190, height: 9, borderRadius: 5, background: hexa("#7A7266", 0.24), overflow: "hidden" }}>
          <div style={{ position: "absolute", width: `${Math.min(100, (sp / 10.4) * 100) * 1.9}px`, height: 9,
            borderRadius: 5, background: `linear-gradient(90deg, ${GOLD}, ${CLAY})` }} />
        </div>
      </div>
      {/* it fights the lock before the first repo: sparks off the rim and smoke off the mount */}
      {f < SLOT[0] + 6 && (<>
        <Fall x={RX - 40} y={RY + 250} w={180} f={f} at={0} n={12} z={72} c={mxh(GOLD, 0.3)} rate={2.2} s={1.0} />
        <Steam x={RX + 210} y={RY + 210} f={f} at={0} n={8} z={72} s={1.2} c="#CFC9BC" rate={1.6} />
      </>)}
      {/* ⭐ the repos fly in from the four corners and SLOT into the rim */}
      {REPOS.map((r, i) => {
        const at = SLOT[i], t0 = at - 17;
        if (f < t0 || (i < 3 && f > at + 5)) return null;
        const k = E(f, t0, at, 0, 1, IN_Q);
        const FROM = [{ x: -180, y: 120 }, { x: 1190, y: 150 }, { x: -160, y: 700 }, { x: 1200, y: 660 }][i];
        const TO = [{ x: RX, y: RY - 232 }, { x: RX + 232, y: RY }, { x: RX, y: RY + 232 }, { x: RX - 232, y: RY }][i];
        return <Gem key={r.key} repo={r} x={FROM.x + (TO.x - FROM.x) * k} y={FROM.y + (TO.y - FROM.y) * k}
          s={140 + 40 * k} z={92} f={f} lit={Math.min(1, k * 1.7)} spin={(1 - k) * 40} stars={1}
          label={false} shake={i === 3 ? 0.6 : 0} glow={1} trail={Math.max(0, 1 - k) * 0.9} />;
      })}
      {SLOT.slice(0, 3).map((at, i) => (f >= at && f < at + 26 ? (
        <React.Fragment key={"sm" + at}>
          <Ring x={RX} y={RY} f={f} at={at} c={mxh(REPOS[i].c, 0.4)} z={94} s={2.6 + i * 0.4} dur={22} />
          <Fall x={RX - 130} y={RY - 190} w={260} f={f} at={at} n={16} z={94} c={mxh(GOLD, 0.3)} rate={2.0} s={1.2} />
          <Puff x={RX} y={GY - 26} f={f} at={at} c="#E4DCC8" z={58} n={12} s={1.3} up={0.14} />
        </React.Fragment>
      ) : null))}
      {/* the crew watching it come up */}
      <ShopCrew f={f} v={v} />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   drop · LOAD — a body against a load (the OX / UNLAZY / BOSS class).
   BEFORE  f0: he stands on the floor under four parts already lowering.
   TRIGGER f14: the first part lets go of its hook.
   TRAVEL  each part falls ~260px onto him.
   ARRIVAL f28 / f52 / f76: he SINKS and SPREADS under each, dust off the
           floor, a ring, the tag lights; the strain baseline climbs.
   ⛔ f86: the TANK lets go and is 40px above his head at the cut.
   ====================================================================== */
export const DROPHOOK: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("floor");
  const L = LAY[v];
  /* ⭐⭐⭐ MECHANISM: CHARGE. The mark stays WHOLE and fills with colour.
     ⛔ The first attempt split the mark into four quarters and flew them in. On the probe a quadrant
     of a sunburst reads as a grey ARROW, not as a piece of the Claude logo — the same legibility
     failure that killed the sled, one round later. The mark is never cut up: it is there, entire and
     dead grey, from frame 0, and each repo charges a quarter turn of it.
     BEFORE   f0 the whole logo, unmistakable, DEAD GREY, flickering, with an empty charge ring.
     TRIGGER  f11 a repo slams into the ring at 12 o'clock. It costs: ring, sparks, a kick.
     TRAVEL   the charge sweeps 90° round the mark, colour chasing it.
     ⛔ f92 the fourth repo is still incoming and a quarter of the logo is still grey at the cut. */
  const SLAM = [11, 34, 60, 92];
  const hit = SLAM.slice(0, 3).reduce((m, at) => { const d = f - at; return d >= 0 && d < 12 ? Math.max(m, Math.exp(-d / 3.2)) : m; }, 0);
  /* the charge angle: each repo sweeps another quarter, and it eases so the sweep is watchable */
  /* ⛔ a colour fill changes no geometry: the first render measured 5.21 = STATIC. The charge now
     CREEPS between slams as well as jumping on them, and the housing carries a toothed ring that
     turns the whole time — motion is repaint, and only a moving EDGE repaints
     ([[reference_motion_arithmetic]]). */
  let deg0 = Math.min(26, f * 0.30);
  SLAM.forEach((at, i) => { if (i < 3) deg0 += 84 * E(f, at, at + 17, 0, 1, OUT); });
  const deg = deg0;
  const teeth = f * 1.9;
  /* ⛔ Alex, rev 9: cut 2 needs elevating too. The mark grows with the charge (486 → 642) so the
     beat has scale as well as colour, and the progress is stated as a real number. */
  const D = 470 + 104 * Math.min(1, deg0 / 270);
  const CX = 506 + L.a * 0.3, CY = 446 - (D - 470) * 0.18;
  const warm = Math.min(1, deg / 270);
  const flick = f < SLAM[0] ? (Math.sin(f / 1.7) > 0.4 ? 1 : 0.72) : 1;
  const camS = 1.06 + 0.11 * E(f, 0, dur, 0, 1, LIN);
  const MASK = `conic-gradient(#000 0deg, #000 ${deg}deg, transparent ${deg}deg, transparent 360deg)`;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.0]} vig={0.30}>
      <Cam s={camS} x={0} y={0} z={12}>
      <Cyc z={20} warm={warm} f={f} />
      <GhFitout p={p} f={f} seed={2} z={22} graphX={62} graphY={188} cols={8} rail={false} lift={0.34} />
      <div style={{ position: "absolute", left: -20, top: GY - 4, width: W + 40, height: 16, zIndex: 30,
        background: `repeating-linear-gradient(-45deg, ${GOLD} 0 22px, ${INK} 22px 44px)`, opacity: 0.9 }} />
      <GhSign x={818} y={210} w={244} z={26} on={E(f, 2, 8, 0.5, 1, OUT)} f={f} />
      <Contact2 x={CX} y={GY - 10} w={D * 0.94} o={0.30 + 0.12 * warm} z={36} />
      {/* ⭐ the charge, stated: a real percentage climbing with the sweep */}
      <div style={{ position: "absolute", left: 214, top: 534, zIndex: 96, display: "flex",
        flexDirection: "column", alignItems: "flex-start", gap: 4 }}>
        <div style={{ ...mono(17, 800), letterSpacing: "0.18em", color: hexa("#5C5346", 0.8) }}>UPGRADED</div>
        <div style={{ ...ui(88, 900), letterSpacing: "-0.04em", lineHeight: 0.92,
          color: lerpHex("#7A7266", "#C7502B", warm) }}>{Math.round((deg0 / 360) * 100)}%</div>
        <div style={{ width: 196, height: 9, borderRadius: 5, background: hexa("#7A7266", 0.24), overflow: "hidden" }}>
          <div style={{ position: "absolute", width: `${(deg0 / 360) * 196}px`, height: 9, borderRadius: 5,
            background: `linear-gradient(90deg, ${GOLD}, ${CLAY})` }} />
        </div>
      </div>
      {/* the housing: a white face inside a near-black rim, so the white bay keeps its value structure */}
      {/* the toothed collar, turning the whole time */}
      <div style={{ position: "absolute", left: CX - D * 0.68, top: CY - D * 0.68, width: D * 1.36, height: D * 1.36,
        zIndex: 38, borderRadius: "50%", overflow: "hidden", background: "#1B1814",
        transform: `rotate(${teeth}deg)`, boxShadow: SH_D }}>
        {Array.from({ length: 30 }, (_, i) => (
          <div key={"tt" + i} style={{ position: "absolute", left: "50%", top: 0, width: D * 0.022,
            height: D * 0.09, marginLeft: -D * 0.011, transformOrigin: `50% ${D * 0.68}px`,
            transform: `rotate(${i * 12}deg)`, borderRadius: 2,
            background: i % 3 === 0 ? mxh(BRASS, 0.1) : hexa("#6E655A", 0.8) }} />
        ))}
      </div>
      <div style={{ position: "absolute", left: CX - D * 0.60, top: CY - D * 0.60, width: D * 1.20, height: D * 1.20,
        zIndex: 40, borderRadius: "50%", boxShadow: SH_D,
        background: `radial-gradient(circle at 44% 36%, #FFFFFF 0%, #F2ECE1 60%, #DCD4C4 100%)`,
        border: `${D * 0.030}px solid #262119` }} />
      <div style={{ position: "absolute", left: CX - 32, top: CY + D * 0.54, width: 64, height: GY - CY - D * 0.54, zIndex: 39,
        background: `linear-gradient(90deg, ${dkh(IRON, 0.34)}, ${mxh(IRON, 0.12)} 45%, ${dkh(IRON, 0.42)})` }} />
      {/* ⭐ THE CHARGE RING — it fills as the repos land, the one graphic that says "loading" */}
      <div style={{ position: "absolute", left: CX - D * 0.545, top: CY - D * 0.545, width: D * 1.09, height: D * 1.09,
        zIndex: 44, borderRadius: "50%", background: `conic-gradient(${CLAY} 0deg, ${mxh(CLAY, 0.3)} ${deg}deg, transparent ${deg}deg)`,
        WebkitMaskImage: "radial-gradient(circle, transparent 0 88%, #000 88.5%)",
        maskImage: "radial-gradient(circle, transparent 0 88%, #000 88.5%)" }} />
      {/* ⭐ the charge HEAD: a bright bar riding the leading edge of the sweep, so the fill has a
          moving point of interest instead of a boundary that merely exists */}
      {deg0 > 2 && deg0 < 358 && (
        <div style={{ position: "absolute", left: CX - 5, top: CY - D * 0.56, width: 10, height: D * 0.56,
          zIndex: 48, transformOrigin: "50% 100%", transform: `rotate(${deg0}deg)`, borderRadius: 5,
          background: `linear-gradient(180deg, ${hexa("#FFF6E2", 0.95)}, ${hexa(CLAY, 0.55)} 55%, ${hexa(CLAY, 0)})` }} />
      )}
      {/* light spokes bursting outward on each quarter that lands */}
      {SLAM.slice(0, 3).map((at, i) => {
        const t = f - at;
        if (t < 0 || t > 20) return null;
        const e = 1 - t / 20;
        return Array.from({ length: 7 }, (_, r2) => (
          <div key={"sp" + at + r2} style={{ position: "absolute", left: CX, top: CY - 3, width: D * (0.5 + 0.5 * (1 - e)),
            height: 6, zIndex: 49, transformOrigin: "0% 50%", borderRadius: 3, opacity: 0.55 * e,
            transform: `rotate(${-90 + i * 90 + (r2 - 3) * 11}deg)`,
            background: `linear-gradient(90deg, ${hexa(mxh(REPOS[i].c, 0.5), 0.9)}, ${hexa(REPOS[i].c, 0)})` }} />
        ));
      })}
      {/* the mark, dead grey underneath and full colour above, revealed by the charge */}
      <div style={{ position: "absolute", left: CX - D / 2, top: CY - D / 2, width: D, height: D, zIndex: 46,
        opacity: flick, filter: `grayscale(1) brightness(0.62) contrast(0.9)`,
        transform: `scale(${1 + hit * 0.03})` }}>
        <Img src={staticFile("logos/claude.svg")} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      </div>
      {deg > 0.5 && (
        <div style={{ position: "absolute", left: CX - D / 2, top: CY - D / 2, width: D, height: D, zIndex: 47,
          WebkitMaskImage: MASK, maskImage: MASK, transform: `scale(${1 + hit * 0.03})` }}>
          <Img src={staticFile("logos/claude.svg")} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>
      )}
      {warm > 0.05 && (
        <div style={{ position: "absolute", left: CX - D * 0.9, top: CY - D * 0.9, width: D * 1.8, height: D * 1.8,
          zIndex: 41, borderRadius: "50%", opacity: 0.4 * warm,
          background: `radial-gradient(circle, ${hexa("#FFD9A8", 0.85)} 0%, ${hexa(CLAY, 0.3)} 40%, ${hexa(CLAY, 0)} 70%)` }} />
      )}
      {/* it is not running yet: sparks off the rim while it is grey */}
      {f < SLAM[0] + 6 && (
        <Fall x={CX - 60} y={CY + D * 0.5} w={200} f={f} at={0} n={12} z={72} c={mxh(GOLD, 0.3)} rate={2.2} s={1.0} />
      )}
      {/* the repos, each slamming into the ring where its quarter begins */}
      {REPOS.map((r, i) => {
        const at = SLAM[i], t0 = at - 17;
        if (f < t0 || (i < 3 && f > at + 5)) return null;
        const k = E(f, t0, at, 0, 1, IN_Q);
        const ang = (-90 + i * 90) * Math.PI / 180;
        const tx = CX + Math.cos(ang) * D * 0.55, ty = CY + Math.sin(ang) * D * 0.55;
        const fx = CX + Math.cos(ang) * 1180, fy = CY + Math.sin(ang) * 1180;
        return <Gem key={r.key} repo={r} x={fx + (tx - fx) * k} y={fy + (ty - fy) * k}
          s={136 + 36 * k} z={92} f={f} lit={Math.min(1, k * 1.7)} spin={(1 - k) * 36} stars={1}
          label={false} shake={i === 3 ? 0.6 : 0} glow={1} trail={Math.max(0, 1 - k) * 0.9} />;
      })}
      {SLAM.slice(0, 3).map((at, i) => (f >= at && f < at + 26 ? (
        <React.Fragment key={"cm" + at}>
          <Ring x={CX} y={CY} f={f} at={at} c={mxh(REPOS[i].c, 0.4)} z={94} s={2.5 + i * 0.4} dur={22} />
          <Fall x={CX - 140} y={CY - 150} w={280} f={f} at={at} n={16} z={94} c={mxh(GOLD, 0.3)} rate={2.0} s={1.2} />
          <Puff x={CX} y={GY - 26} f={f} at={at} c="#E4DCC8" z={58} n={12} s={1.3} up={0.14} />
        </React.Fragment>
      ) : null))}
      <ShopCrew f={f} v={v} />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   pit · SWARM
   BEFORE  f0: he is already sliding in on a dolly from the left, tyre smoke.
   TRIGGER f16: the dolly stops dead on the lift plate; he lurches.
   TRAVEL  f12 / f30 / f48 / f84: four crew Claudes sprint in from both
           edges carrying the parts (each crosses ~560px in 14 frames).
   ARRIVAL each slams a part on with a puff and a ring; the tag lights.
   ⛔ the fourth runner reaches him at f98 and is still raising the TANK at
      the cut.
   ====================================================================== */
export const PITHOOK: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("floor");
  const L = LAY[v];
  /* ⭐⭐⭐ MECHANISM: SCALE-UP. The same mark, upgraded by getting BIGGER.
     Three cuts, three verbs on one object nobody has to decode: the house SPINS it up, the amber
     CHARGES it, and this one GROWS it. Geometry differs on every axis, which is also what keeps the
     three cuts apart on the dHash.
     BEFORE   f0 the mark is small, grey and low in a big empty white bay — a stock setup, dwarfed.
     TRIGGER  f12 a repo docks under it and it JUMPS a size. It costs: ring, sparks, floor kick.
     TRAVEL   150 → 250 → 380 → 520px across the hook, and it rises as it grows.
     ⛔ f94 the fourth repo is still on its way in and it is not full size at the cut. */
  const SLAM = [12, 36, 62, 94];
  /* ⛔ 150px at f0 put the subject at ~2% of the panel — winners never open under 8.9%
     ([[feedback_frame0_is_the_thumbnail_measure_it_against_winners]]). It starts readable and still
     more than doubles. */
  const SZ = [246, 330, 434, 566];
  let d = SZ[0];
  SLAM.forEach((at, i) => { if (i < 3) d += (SZ[i + 1] - SZ[i]) * E(f, at, at + 15, 0, 1, BACK); });
  const stage = SLAM.filter((t) => f >= t).length;
  const lit = Math.min(1, stage / 3);
  const hit = SLAM.slice(0, 3).reduce((m, at) => { const dd = f - at; return dd >= 0 && dd < 12 ? Math.max(m, Math.exp(-dd / 3.2)) : m; }, 0);
  const CX = 506 + L.a * 0.3;
  const CY = 566 - (d - SZ[0]) * 0.34;
  const camS = 1.0 + 0.09 * E(f, 0, dur, 0, 1, LIN);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.0]} vig={0.30}>
      <Cam s={camS} x={0} y={0} z={12}>
      <Cyc z={20} warm={lit} />
      <GhFitout p={p} f={f} seed={5} z={22} graphX={58} graphY={192} cols={8} rail={false} lift={0.34} />
      <div style={{ position: "absolute", left: -20, top: GY - 4, width: W + 40, height: 16, zIndex: 30,
        background: `repeating-linear-gradient(-45deg, ${GOLD} 0 22px, ${INK} 22px 44px)`, opacity: 0.9 }} />
      <GhSign x={200} y={228} w={252} z={26} on={E(f, 2, 8, 0.5, 1, OUT)} f={f} />
      {/* the plinth it stands on, which never changes size — so the mark's growth has a reference */}
      <div style={{ position: "absolute", left: CX - 150, top: GY - 34, width: 300, height: 34, zIndex: 40,
        borderRadius: 8, background: `linear-gradient(180deg, ${mxh(IRON, 0.12)}, ${dkh(IRON, 0.44)})`, boxShadow: SH_D }} />
      {/* the four sockets in the plinth face, filling left to right */}
      {[0, 1, 2, 3].map((i) => (
        <div key={"pk" + i} style={{ position: "absolute", left: CX - 122 + i * 66, top: GY - 26, width: 46, height: 18,
          zIndex: 42, borderRadius: 4,
          background: i < stage ? `linear-gradient(180deg, ${mxh(REPOS[i].c, 0.3)}, ${REPOS[i].c})` : "#141210",
          border: `2px solid ${i < stage ? dkh(REPOS[i].c2, 0.4) : "#0C0B09"}` }} />
      ))}
      {lit > 0.05 && (
        <div style={{ position: "absolute", left: CX - d * 0.9, top: CY - d * 0.9, width: d * 1.8, height: d * 1.8,
          zIndex: 41, borderRadius: "50%", opacity: 0.4 * lit,
          background: `radial-gradient(circle, ${hexa("#FFD9A8", 0.85)} 0%, ${hexa(CLAY, 0.3)} 40%, ${hexa(CLAY, 0)} 70%)` }} />
      )}
      {/* ⭐ THE MARK, growing a size on every repo */}
      {/* ⛔ a scale STEP then a hold measured 4.62 = STATIC. The mark turns the whole time — it is a
          symmetric sunburst, so rotation reads as running, not as a spinning logo — and the repos
          already docked ORBIT it, so something is always crossing the frame. */}
      {[0, 1, 2, 3].map((i) => {
        if (i >= stage) return null;
        const a2 = f / 22 + i * 1.57;
        const rr = d * 0.62 + 40;
        return <Gem key={"orb" + i} repo={REPOS[i]} x={CX + Math.cos(a2) * rr} y={CY + Math.sin(a2) * rr * 0.42}
          s={84} z={Math.sin(a2) > 0 ? 62 : 58} f={f} lit={0.9} spin={0} stars={1} label={false} />;
      })}
      <div style={{ position: "absolute", left: CX - d / 2, top: CY - d / 2, width: d, height: d, zIndex: 60,
        transform: `scale(${1 + hit * 0.05}) rotate(${f * 1.15 + hit * 4}deg)`,
        filter: `grayscale(${(1 - lit) * 0.92}) brightness(${0.68 + 0.44 * lit}) contrast(${0.88 + 0.3 * lit})` }}>
        <Img src={staticFile("logos/claude.svg")} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      </div>
      {f < SLAM[0] + 6 && (
        <Fall x={CX - 60} y={GY - 60} w={180} f={f} at={0} n={10} z={72} c={mxh(GOLD, 0.3)} rate={2.2} s={0.9} />
      )}
      {/* the repos, coming in low and docking into the plinth */}
      {REPOS.map((r, i) => {
        const at = SLAM[i], t0 = at - 17;
        if (f < t0 || (i < 3 && f > at + 5)) return null;
        const k = E(f, t0, at, 0, 1, IN_Q);
        const fx = i % 2 === 0 ? -190 : 1200, fy = 250 + i * 90;
        const tx = CX - 100 + i * 66, ty = GY - 74;
        return <Gem key={r.key} repo={r} x={fx + (tx - fx) * k} y={fy + (ty - fy) * k}
          s={134 + 34 * k} z={92} f={f} lit={Math.min(1, k * 1.7)} spin={(1 - k) * 34} stars={1}
          label={false} shake={i === 3 ? 0.6 : 0} glow={1} trail={Math.max(0, 1 - k) * 0.9} />;
      })}
      {SLAM.slice(0, 3).map((at, i) => (f >= at && f < at + 26 ? (
        <React.Fragment key={"gm" + at}>
          <Ring x={CX} y={GY - 30} f={f} at={at} c={mxh(REPOS[i].c, 0.4)} z={94} s={2.2 + i * 0.5} dur={22} />
          <Fall x={CX - 150} y={GY - 90} w={300} f={f} at={at} n={16} z={94} c={mxh(GOLD, 0.3)} rate={2.0} s={1.2} />
          <Puff x={CX} y={GY - 20} f={f} at={at} c="#E4DCC8" z={58} n={14} s={1.4} up={0.14} />
        </React.Fragment>
      ) : null))}
      <ShopCrew f={f} v={v} />
      </Cam>
    </Scene>
  );
};

export const HOOKS: Record<HookId, React.FC<SP>> = { lift: LIFTHOOK, drop: DROPHOOK, pit: PITHOOK };

/** a standalone preview of one candidate at full quality, for the pick.
    ⛔ Labelled in the filename, never burned into the frame. */
export const HookCut = (id: HookId): React.FC => () => {
  const C = HOOKS[id];
  return <C v="house" dur={102} />;
};
