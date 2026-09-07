import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { Bg, HookHeader } from "./SlopKit";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, SH, SH_D, mono, ui,
  Scene, Cam, Edge, Contact, Beam, Strip, Rake, Runner, Crew, Hero, Forearm,
  asPlace, floatY, Deck, Tile, VscTile,
  INK, MUTE, CLAY, GOLD, GREEN, RED, SKY, BONE, BRASS, STEEL, IRON, CHROME,
  VSC, AGV, GUNMETAL, G,
} from "./GvtWorld";

/* ===========================================================================
   REEL 141 · "GRAVITY" — THE HOOK, REV 5.

   ⛔⛔⛔ REV 4 WAS REJECTED: *"the hook scene needs to be way more interesting,
   it's just not good, it's not based on our hook guidelines."* He is right, and
   reading `docs/THE-OPEN.md` properly says exactly where it went wrong:

   1. **"THE HOOK IS AN IMAGE, NOT A ROOM."** Rev 4 was six wall editors, a hero
      editor, two crew and a set — five objects competing across a frame. The doc
      is explicit: ONE dominant object, dead centre, doing one thing, with nothing
      else standing on the floor. Reel 110 built that hook three times to learn it.
   2. **⛔ ALEX ALREADY RULED AGAINST A UI HOOK — 2026-08-03, and the doc says do
      not re-litigate it per reel.** *"not text visual animation… way more creative
      objects"*, *"object scenes not UI"*. Law 3 is about RECOGNITION; a screenshot
      is one way to get it and not the requirement. Rev 4's hook was ALL UI.
   3. **An ACTION is a DISTANCE.** Rev 4's event was a panel sliding open inside a
      window — a state change at a few percent of its own size.

   ⭐⭐⭐ REV 5'S MECHANISM WORD IS **PRISE**. Checked against every word already
   shipped (RELEASE · DEMOLITION · POSSESSION · SUMMONS · REVELATION · ACCUMULATION
   · EXCHANGE · MULTIPLICATION · SUBTRACTION) and against this reel's own dead
   INVERSION and TAKEOVER. It is new, and it is not "something comes toward you".

   THE IMAGE: **one Claude, dead centre, prising the VS Code mark open like a
   door.** It gives, the two halves swing a real distance, amber floods out of the
   seam, and a crowd of small Claudes pours through the gap. Nothing else stands
   on the floor.
     · ONE DOMINANT OBJECT   the mark, 704px = 70% of panel width, air both sides
     · SILHOUETTE            a DARK subject on a LIT hall — say which side you are on
     · CLAUDE AT FRAME 0     law 2, and he is the one doing the thing
     · THE GATES GO ELSEWHERE the lit board behind carries HOOK_LUMA and the claim
                             plate, so the mark is free to be dark and correctly sized
     · THE HAND-OFF IS A SENTENCE  the next line is "Google just launched its
                             official extension", so the last beat is Google's mark
                             stamping under the Antigravity one
   ========================================================================= */

export type HookId = "prise" | "haul" | "swarm";

export const HOOK_CUT = 999;      /* one shot: a cut is not an event */
export const HOOK_LEN = 58;

/* ⭐ BEATS ON THEIR WORDS. "So you can now use / Antigravity / inside / VS Code."
     f0-13   he strains: tremble, steam off the head, the seam already leaking
     f14     "use"          IT GIVES — the crack
     f16-34  "Antigravity"  the halves TRAVEL 190px each, amber floods out
     f34-52  "inside VS Code" the crowd pours through, the marks rise in the gap
   ⛔ "Code." starts f46: no cue fires after f42. */
export const HOOK_BEATS: Record<HookId, { trigger: number; wave: number[]; seat: number[] }> = {
  prise: { trigger: 14, wave: [18, 26, 34], seat: [34, 40, 46] },
  haul:  { trigger: 12, wave: [16, 24, 32], seat: [32, 38, 44] },
  swarm: { trigger: 15, wave: [19, 27, 35], seat: [35, 41, 47] },
};

/* ---------------------------------------------------------------------------
   THE HALL. Deliberately EMPTY at floor level — the doc's "nothing else standing
   on the floor" — and bright, because a feed is a brightness competition. The
   lit board on the back wall carries the >=140 mean AND the claim plate, so the
   hero prop never has to (reel 110: a gate carried by the wrong object deforms
   that object).
   ------------------------------------------------------------------------ */
const Hall: React.FC<{ f: number; a: number; lift: number; open: number }> =
  ({ f, a, lift, open }) => (<>
  {/* the lit wall */}
  <div style={{ position: "absolute", left: 0, top: 96, width: W, height: 700, zIndex: 6,
    background: `linear-gradient(180deg, #FFFCF4 0%, #FDF6E0 30%, #F6E9C6 62%, #E4EBF4 100%)` }} />
  {lift > 0 && (
    <div style={{ position: "absolute", left: 0, top: 96, width: W, height: 700, zIndex: 6,
      background: `linear-gradient(180deg, ${hexa("#FFFDF6", lift)} 0%, ${hexa("#F4F8FD", lift * 0.8)} 100%)` }} />
  )}
  {/* the hall's own architecture: pilasters and a cornice, low contrast */}
  {[0, 1, 2, 3, 4, 5].map((i) => (
    <div key={"pl" + i} style={{ position: "absolute", left: -24 + i * 208, top: 96, width: 34,
      height: 610, zIndex: 7,
      background: `linear-gradient(90deg, ${hexa("#C7B48A", 0)} 0%, ${hexa("#CBB78E", 0.30)} 50%, ${hexa("#C7B48A", 0)} 100%)` }} />
  ))}
  <div style={{ position: "absolute", left: 0, top: 158, width: W, height: 5, zIndex: 7,
    background: hexa("#BFAC82", 0.42) }} />
  {/* ⭐ THE LIT BOARD — carries HOOK_LUMA and HOOK_PLATE so the mark does not */}
  <div style={{ position: "absolute", left: 506 + a - 322, top: 132, width: 644, height: 116,
    zIndex: 12, borderRadius: 12, background: "linear-gradient(178deg,#FFFBEE 0%,#F3E4BC 100%)",
    border: "5px solid #D9C79A", boxShadow: SH_D, display: "flex", alignItems: "center",
    paddingLeft: 18, gap: 16 }}>
    <div style={{ width: 76, height: 76, borderRadius: 16, background: "#FFFFFF",
      border: "3px solid #E8DCC0", display: "flex", alignItems: "center",
      justifyContent: "center", flex: "0 0 auto" }}>
      <Img src={staticFile("logos/antigravity.png")} style={{ width: 58, height: 58, objectFit: "contain" }} />
    </div>
    <div>
      <div style={{ ...ui(38, 900), color: "#241F17", letterSpacing: "-0.01em" }}>ANTIGRAVITY</div>
      <div style={{ ...mono(17, 800), color: hexa("#241F17", 0.58), letterSpacing: "0.05em",
        marginTop: 3 }}>{G.publisher} · {G.installs} INSTALLS</div>
    </div>
  </div>
  {/* the light the seam throws onto the hall: a shaped CONE, never a full-frame fill */}
  {open > 0 && (
    <div style={{ position: "absolute", left: 506 + a - 300, top: 300, width: 600, height: 420,
      zIndex: 14, opacity: open * 0.75,
      background: `radial-gradient(58% 60% at 50% 46%, ${hexa("#FFDE9A", 0.9)} 0%, ${hexa("#F0BE62", 0.24)} 52%, transparent 78%)` }} />
  )}
  {/* the floor, and the near-camera mass cropped by the panel edge */}
  <Deck y={706} c="#BBD2ED" cl="#DFEBFA" z={20} h={110} />
  <div style={{ position: "absolute", left: 0, top: 660, width: W, height: 86, zIndex: 21,
    background: `linear-gradient(180deg, ${hexa("#FBEFC8", 0.44)} 0%, ${hexa("#E0BE86", 0.16)} 100%)` }} />
  <Edge side="l" c={dkh(GUNMETAL, 0.42)} w={40} z={92} kind="wall" />
  <Edge side="r" c={dkh(GUNMETAL, 0.5)} w={34} z={92} kind="wall" />
</>);

/* ---------------------------------------------------------------------------
   THE MARK, AS A DOOR. Half of the VS Code ribbon per leaf, drawn as a masked
   solid so the silhouette is the real one, hinged at the outer edge.
   ⛔ CATEGORY IS STRUCTURE: a slab with a logo on it reads as a sign. What makes
   this read as a DOOR is the structure a door has — a jamb, a hinge barrel, a
   handle, a shadowed reveal, and light in the crack.
   ------------------------------------------------------------------------ */
const Leaf: React.FC<{ side: -1 | 1; cx: number; y: number; w: number; h: number;
  swing: number; z?: number; axis?: "v" | "h" | "iris" }> =
  ({ side, cx, y, w, h, swing, z = 40, axis = "v" }) => {
  const hw = w / 2, hh = h / 2;
  /* ⭐ THE THREE BREAKS:
       v     side-hinged leaves swinging apart      (PRISE)
       h     the mark shears open top-and-bottom    (HAUL)
       iris  the halves slide bodily apart          (SWARM) */
  const box = axis === "h"
    ? { left: cx - hw, top: side < 0 ? y : y + hh, width: w, height: hh }
    : { left: side < 0 ? cx - hw : cx, top: y, width: hw, height: h };
  const tf = axis === "v"
    ? `perspective(1400px) rotateY(${side * swing * 64}deg)`
    : axis === "h"
      ? `perspective(1500px) rotateX(${-side * swing * 58}deg)`
      : `translateX(${side * swing * hw * 0.94}px) rotate(${side * swing * 5}deg)`;
  const org = axis === "h"
    ? (side < 0 ? "50% 0%" : "50% 100%")
    : (side < 0 ? "0% 50%" : "100% 50%");
  return (
    <div style={{ position: "absolute", left: box.left, top: box.top,
      width: box.width, height: box.height, zIndex: z,
      transformOrigin: org, transform: tf }}>
      {/* the leaf face: dark VS Code blue, cast, with a machined bevel */}
      <div style={{ position: "absolute", inset: 0,
        borderRadius: axis === "h"
          ? (side < 0 ? "12px 12px 0 0" : "0 0 12px 12px")
          : (side < 0 ? "12px 0 0 12px" : "0 12px 12px 0"),
        background: side < 0
          ? "linear-gradient(96deg,#173355 0%,#1E4272 62%,#15304F 100%)"
          : "linear-gradient(264deg,#173355 0%,#1E4272 62%,#15304F 100%)",
        border: "5px solid #0C1D33", boxSizing: "border-box", boxShadow: SH_D }} />
      {/* ⭐ ONE mark spanning BOTH leaves, clipped by each: the left leaf shows its
          left half and the right leaf its right half, so closed it is a single
          recognisable silhouette and opening it TEARS that silhouette in two. */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        <div style={{ position: "absolute",
          left: axis === "h" ? w * 0.13 : (side < 0 ? hw * 0.13 : -hw * 0.87),
          top: axis === "h" ? (side < 0 ? h * 0.15 : h * 0.15 - hh) : h * 0.15,
          width: axis === "h" ? w * 0.74 : hw * 1.74, height: h * 0.70,
          background: hexa("#8CC0F2", 0.95),
          WebkitMaskImage: `url(${staticFile("logos/vscode.svg")})`,
          maskImage: `url(${staticFile("logos/vscode.svg")})`,
          WebkitMaskSize: "contain", maskSize: "contain",
          WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat",
          WebkitMaskPosition: "center", maskPosition: "center" }} />
      </div>
      {/* hinge barrels on the outer edge, and a handle on the inner */}
      {axis === "v" && [0.22, 0.5, 0.78].map((p, i) => (
        <div key={"hg" + i} style={{ position: "absolute",
          left: side < 0 ? -9 : hw - 9, top: h * p - 26, width: 18, height: 52, borderRadius: 5,
          background: "linear-gradient(90deg,#8B97A6 0%,#4E5A68 60%,#2C3642 100%)" }} />
      ))}
      {axis !== "h" && (
        <div style={{ position: "absolute", left: side < 0 ? hw - 26 : 12, top: h * 0.5 - 44,
          width: 13, height: 88, borderRadius: 7,
          background: "linear-gradient(90deg,#D7DEE6 0%,#96A2B0 55%,#5A6572 100%)" }} />
      )}
      {/* the reveal: the dark inner return that says this is a leaf, not a poster */}
      {axis === "h"
        ? <div style={{ position: "absolute", left: 5, top: side < 0 ? hh - 7 : 0, width: w - 10, height: 7,
            background: "#08131F" }} />
        : <div style={{ position: "absolute", left: side < 0 ? hw - 7 : 0, top: 5, width: 7, height: h - 10,
            background: "#08131F" }} />}
    </div>
  );
};

/* ---------------------------------------------------------------------------
   SHOT — one locked framing. ONE thing happens, and it happens a long way.
   ------------------------------------------------------------------------ */
const Shot: React.FC<{ f: number; id: HookId; a: number; lift: number }> = ({ f, id, a, lift }) => {
  const B = HOOK_BEATS[id];
  const DY = { prise: 0, haul: -10, swarm: 18 }[id];
  const AXIS = ({ prise: "v", haul: "h", swarm: "iris" } as const)[id];
  const MW = 704, MH = 424;                       /* 70% of panel width, air both sides */
  const mx = 506 + a, my = 276 + DY;
  /* ⭐ AN ACTION IS A DISTANCE: the leaves go 0 -> 1 of a 64deg swing, and each
     one's free edge travels ~190px, which is 54% of its own width. Under a third
     and it would be a state change. */
  const swing0 = E(f, B.trigger, 22, 0, 1, OUT);
  /* ⭐ WEIGHT IS DEFORMATION: a heavy leaf does not ease to a stop, it overshoots
     its hinge and rebounds. 5deg of it, decaying over ~10 frames. */
  const rebound = f >= B.trigger + 18 ? Math.sin((f - B.trigger - 18) * 0.62) * 0.075 * Math.exp(-(f - B.trigger - 18) / 8) : 0;
  const swing = Math.max(0, swing0 + rebound);
  /* before the trigger he is STRAINING, and strain is deformation + a tremble */
  const strain = f < B.trigger ? E(f, 0, B.trigger, 0.35, 1, LIN) : Math.max(0, 1 - (f - B.trigger) / 10);
  const tremble = f < B.trigger ? Math.sin(f * 1.9) * 4.2 * strain : 0;
  /* the seam leaks before it gives: settled at frame 0 means AT REST, NOT INERT */
  const leak = f < B.trigger ? E(f, 0, B.trigger, 0.18, 0.62, LIN) : 1;
  const HX = mx, HY = 764, HS = 224;
  /* ⭐ THE CROWD: the repeated object that carries the motion, arriving across the
     FULL tail rather than bunched. Value ramp by rank so depth reads in greyscale. */
  const CROWD = Array.from({ length: 14 }, (_, i) => {
    const rank = i % 3;
    const at = B.seat[0] + Math.floor(i / 3) * 3 + rank;
    const t = E(f, at, 16, 0, 1, OUT);
    const dir = i % 2 ? 1 : -1;
    const spread = 92 + Math.floor(i / 2) * 74;
    return { i, rank, at, t, x: mx + dir * spread * t, y: 712 - rank * 24,
      size: 96 - rank * 16, tint: ["#D97757", "#C1653F", "#A9552F"][rank], z: 62 - rank * 2 };
  });
  return (
    <Scene p={asPlace("bay")} slug="" push={[24, 58, 1.11]} vig={0.10}>
      <Hall f={f} a={a} lift={lift} open={swing} />
      {/* the doorway's own jamb, so the leaves read as fitted into something */}
      <div style={{ position: "absolute", left: mx - MW / 2 - 18, top: my - 16, width: MW + 36,
        height: MH + 32, zIndex: 30, borderRadius: 16, background: "#0B1A2B",
        border: "5px solid #23364B", boxSizing: "border-box" }} />
      {/* what is BEHIND the door: the amber world, revealed as it opens */}
      <div style={{ position: "absolute", left: mx - MW / 2, top: my, width: MW, height: MH,
        zIndex: 32, overflow: "hidden", borderRadius: 10,
        background: "linear-gradient(180deg,#3A2A12 0%,#7A5A22 46%,#D9A64C 100%)" }}>
        <div style={{ position: "absolute", inset: 0,
          background: `radial-gradient(52% 62% at 50% 56%, ${hexa("#FFE7AE", 0.30 + leak * 0.66)} 0%, ${hexa("#E0A94C", 0.22)} 58%, transparent 84%)` }} />
        {/* the Antigravity mark rising in the gap on the last beat */}
        <div style={{ position: "absolute", left: MW / 2 - 62, top: MH * 0.30 + (1 - E(f, B.seat[1], 12, 0, 1, BACK)) * 120,
          width: 124, height: 124, borderRadius: 26, background: "#FFFFFF",
          border: "4px solid #E8DCC0", display: "flex", alignItems: "center", justifyContent: "center",
          opacity: E(f, B.seat[1], 10, 0, 1, OUT), boxShadow: SH_D }}>
          <Img src={staticFile("logos/antigravity.png")} style={{ width: 96, height: 96, objectFit: "contain" }} />
        </div>
        {/* ⭐ THE HAND-OFF IS A SENTENCE: the next line is "Google just launched its
            official extension", so the last beat of the hook is Google's mark. */}
        <div style={{ position: "absolute", left: MW / 2 - 84, top: MH * 0.30 + 148,
          width: 168, height: 44, borderRadius: 9, background: hexa("#FFFFFF", 0.94),
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          opacity: E(f, B.seat[2], 8, 0, 1, OUT),
          transform: `scale(${E(f, B.seat[2], 8, 1.3, 1, BACK)})` }}>
          <Img src={staticFile("logos/google.svg")} style={{ width: 24, height: 24, objectFit: "contain" }} />
          <span style={{ ...mono(17, 800), color: "#241F17", letterSpacing: "0.04em" }}>OFFICIAL</span>
        </div>
      </div>
      {/* the two leaves */}
      <Leaf side={-1} cx={mx} y={my} w={MW} h={MH} swing={swing} z={40} axis={AXIS} />
      <Leaf side={1}  cx={mx} y={my} w={MW} h={MH} swing={swing} z={40} axis={AXIS} />
      {/* the light in the crack, before it opens */}
      {f < B.trigger + 2 && (<>
        {AXIS === "h" ? (
          <div style={{ position: "absolute", left: mx - MW / 2 + 10, top: my + MH / 2 - 7,
            width: MW - 20, height: 14, zIndex: 46, borderRadius: 7,
            background: hexa("#FFE3A2", Math.min(1, leak + 0.25)) }} />
        ) : (
          <div style={{ position: "absolute", left: mx - 7, top: my + 10, width: 14, height: MH - 20,
            zIndex: 46, background: hexa("#FFE3A2", Math.min(1, leak + 0.25)), borderRadius: 7 }} />
        )}
      </>)}
      {/* ⭐ THE CROWD pours through the gap */}
      {CROWD.map((c) => c.t > 0 ? (
        <Crew key={"cw" + c.i} f={f} x={c.x} y={c.y} i={[0, 1, 3, 4, 5, 12, 13][c.i % 7]}
          size={c.size} z={c.z} at={c.at} loop={c.i % 4} tint={c.tint} flip={c.i % 2 === 0} />
      ) : null)}
      {/* ⭐⭐ THE HERO — one figure, dead centre, doing one thing. WEIGHT IS
          DEFORMATION: he squashes under strain and trembles before it gives. */}
      <div style={{ position: "absolute", left: tremble, top: 0, width: W, height: H, zIndex: 60 }}>
        <Hero f={f} x={HX} y={HY} size={HS} z={60}
          strain={strain} drive={0} act={1} costume={{ constr: 1 }}
          cheer={f > B.seat[1] ? 1 : 0} shock={f >= B.trigger && f < B.trigger + 10 ? 1 : 0} />
        {/* ⛔ READ THE RIG: `Mascot` draws its own arms, so the only safe geometry is
            two forearms that START on them and END on the handles — both on screen. */}
        {f < B.trigger + 10 && [-1, 1].map((s2) => (
          <Forearm key={"fa" + s2} x0={HX + s2 * 54} y0={HY - HS * 0.48}
            x1={mx + s2 * (34 + swing * 196)} y1={my + MH * 0.74}
            w={26} c="#C4674A" z={61} />
        ))}
      </div>
      {/* ⭐ EFFORT WANTS AN EMITTER ON THE STILLEST PART: steam off the head, which
          is the one part not acting while the arms and body do. */}
      {f < B.trigger + 12 && Array.from({ length: 7 }, (_, i) => {
        const p = ((f * 0.05 + i * 0.16) % 1);
        return (
          <div key={"st" + i} style={{ position: "absolute",
            left: HX - 70 + (i % 2 ? 112 : 0) + Math.sin(f / 7 + i) * 14,
            top: HY - HS - 4 - p * 92, width: 21 + p * 28, height: 21 + p * 28,
            borderRadius: "50%", zIndex: 66,
            background: hexa("#FFFFFF", (1 - p) * 0.82 * Math.min(1, strain + 0.35)) }} />
        );
      })}
      {/* the floor takes the load: dust off the base on the frame it gives */}
      {f >= B.trigger && f < B.trigger + 16 && Array.from({ length: 9 }, (_, i) => {
        const t = E(f, B.trigger, 16, 0, 1, OUT);
        const dir = i % 2 ? 1 : -1;
        return (
          <div key={"dz" + i} style={{ position: "absolute",
            left: mx + dir * (30 + i * 34) * t, top: 690 - t * (16 + (i % 3) * 12),
            width: 30 + i * 5, height: 30 + i * 5, borderRadius: "50%", zIndex: 26,
            background: hexa("#D8C9AC", (1 - t) * 0.5) }} />
        );
      })}
      <Contact x={HX} y={HY} w={214} z={24} o={0.42} />
    </Scene>
  );
};

const HookBody: React.FC<{ id: HookId; a: number; lift: number }> = ({ id, a, lift }) => {
  const f = useCurrentFrame();
  return <Shot f={f} id={id} a={a} lift={lift} />;
};

export const LIFT: Record<HookId, number> = { prise: 0.04, haul: 0.40, swarm: 0.26 };

export const HOOKS: Record<HookId, React.FC<{ a?: number; seed?: number; rows?: number }>> = {
  prise: ({ a = 0 })   => <HookBody id="prise" a={a} lift={LIFT.prise} />,
  haul:  ({ a = -34 }) => <HookBody id="haul"  a={a} lift={LIFT.haul} />,
  swarm: ({ a = 30 })  => <HookBody id="swarm" a={a} lift={LIFT.swarm} />,
};

export const HookCut = (id: HookId): React.FC => () => {
  const f = useCurrentFrame();
  const A = { prise: 0, haul: -34, swarm: 30 }[id];
  return (
    <AbsoluteFill>
      <Bg />
      <HookHeader big="ANTIGRAVITY IS NOW" hot="INSIDE VS CODE" f={f + 12} />
      <Shot f={f} id={id} a={A} lift={LIFT[id]} />
    </AbsoluteFill>
  );
};
