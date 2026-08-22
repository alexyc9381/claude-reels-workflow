import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D,
  Scene, Cam, asPlace, mono, ui, Ring, Puff, Pool, Steam, Rake,
  Crew, Hero, Forearm, squash, lerpHex, R,
  CLAY, CLAYD, GOLD, GREEN, RED, PAPER, CREAMB, INK, MUTE, TEAL, STEEL,
  BRASS, SODIUM, VIOLET, EMBER, OXIDE, SLATE,
} from "./LoopWorld";
import { ReturnRail, Bench, Belt } from "./LoopProps";
import { Hall, Stanchion, SparePile } from "./LoopSets";
import { RAKE_K, RAKE_X0, PAR_X } from "./LoopScenes";
import type { Variant } from "./LoopScenes";

/* ===========================================================================
   REEL 118 · "LOOP" — THE HOOK EXPERIMENT.

   Alex, on the shipped open: *"the hook scene is way too boring here, it needs
   to be revised into more interesting concepts."*

   ⭐ THE DEFECT, IN ONE SENTENCE (feedback_hook_simplicity's own test):
   **a building getting taller is a progress bar standing up.** You know the
   ending at frame 8, the tower and the counter both say the single word "big",
   and nothing happens to anybody. It passed every gate — luma, plate, motion,
   hold — because the gates check that an open is BUILT right and cannot see
   whether the IDEA is good.

   ⛔ THE FIX IS A DIFFERENT MECHANISM, NOT A RESTYLED TOWER. The shipped hook's
   mechanism is GROWTH. Both candidates below drop it entirely, and they are two
   different mechanisms from each other as well — THE-OPEN's test is that one
   sentence must not describe both:

     A  THE VOLLEY  — a RETURN.  He hands work in and it comes straight back
                      stamped, faster every time, and the pile of rejects grows
                      taller than he is. Medium two-shot, comic, escalating.
     B  THE PRESS   — a VERDICT. Macro on a stamp head that slams REJECT onto
                      work which visibly gets BETTER each round and is refused
                      anyway. Near black, severe, percussive.

   ⭐ AND THE REAL SUBJECT IS THE COUNTERINTUITIVE HALF. The interesting thing
   about the Gauntlet Loop is not that it builds something big, it is that the
   AI REFUSES ITS OWN WORK ON PURPOSE. Both hooks open on the refusal and leave
   "why is it doing that to itself" unanswered, which is the question the next
   line answers. ⛔ Neither resolves to PASS — a hook that resolves has spent
   the payoff at three seconds.

   ⛔ ONE DOMINANT OBJECT, AT MOST ONE SUPPORTING (feedback_hook_simplicity).
      A: the work panel travelling · supporting: the reject pile.
      B: the stamp head · supporting: the platen.
   ⛔ THE WORLD STAYS, HELD DOWN. Reel 90: *"it cant just be this basic, i like
      our original backgrounds."* The hall is behind both, dimmed, with the
      crowds, belts and gantries stripped out so nothing competes.
   ⛔ NO MASCOT RECOLOURING, and each hook passes frame 0's four laws ON ITS OWN.
   ========================================================================= */


/** ⭐ THE HOOKS GET THEIR OWN, BRIGHTER FLOOR — and this is the fix the row
    profile actually pointed at. Frame 0's dark mass was y528-792 at 92-115,
    i.e. the FLOOR, which is why a bright tile on the WALL moved the mean by 0.8.
    ⛔ It is a per-scene lighting choice, not a palette change: `intake` itself
    is untouched (the body still uses it), and `lip` and `grit` — the dark stops
    §8 exists to protect — are carried across unchanged, so the black point is
    still held by the vignette and the shadows rather than lifted out of them. */
const LIT = (() => {
  const b = asPlace("intake");
  return { ...b, back: "#9C8C74", back2: "#F2E6CE", floor: "#DEC9A4", floor2: "#A48F72" };
})();

/** ⛔ NO TEXT IN THE ANIMATION LAYER BUT THE HEADER (Alex, on these hooks).
    A claim plate used to live here carrying CLAUDE CODE / 1 PROMPT / 3 LINES /
    55,000 LINES OUT — every word of which the header band already says, and it
    was only ever in the frame to carry HOOK_LUMA. That is reel 110's "a gate
    carried by the wrong object" for the third time in this reel. It is gone.
    The brightness now comes from the ROOM and from the bone-white work itself,
    and the only words left in either hook are the ones printed on a rubber
    stamp, which is not a caption but the object doing the acting. */

/** a finished-looking piece of work — the thing being handed in and refused.
    ⛔ IT MUST LOOK GOOD, and BETTER each round. The joke and the mechanism both
    die if the work being rejected looks like a blank slab. */
const WorkPanel: React.FC<{ x: number; y: number; s?: number; z?: number; lvl: number;
  rot?: number; stamped?: boolean; f: number }> =
  ({ x, y, s = 1, z = 60, lvl, rot = 0, stamped = false, f }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 210 * s, height: 152 * s,
    zIndex: z, borderRadius: 8 * s, overflow: "hidden", boxShadow: SH_D,
    transform: `rotate(${rot}deg)`, background: "#F6F3EC",
    border: `${5 * s}px solid #23262C` }}>
    <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 24 * s,
      background: `linear-gradient(90deg, ${CLAY} 0%, ${dkh(CLAY, 0.26)} 100%)`,
      display: "flex", alignItems: "center", gap: 5 * s, paddingLeft: 8 * s }}>
      {[0, 1, 2].map(i => (
        <div key={"d" + i} style={{ width: 8 * s, height: 8 * s, borderRadius: 8 * s,
          background: hexa("#FFFFFF", 0.66) }} />
      ))}
    </div>
    <div style={{ position: "absolute", left: 10 * s, top: 34 * s, right: 10 * s,
      display: "flex", gap: 6 * s }}>
      {Array.from({ length: Math.min(4, 1 + lvl) }, (_, i) => (
        <div key={"c" + i} style={{ flex: 1, height: 52 * s, borderRadius: 4 * s,
          background: [TEAL, GOLD, GREEN, CLAY][i % 4], opacity: 0.9 }} />
      ))}
    </div>
    {Array.from({ length: 2 + lvl }, (_, i) => (
      <div key={"r" + i} style={{ position: "absolute", left: 10 * s, top: (94 + i * 14) * s,
        width: (150 - i * 26) * s, height: 8 * s, borderRadius: 4 * s, background: "#B6AE9C" }} />
    ))}
    {stamped && (
      <div style={{ position: "absolute", left: 14 * s, top: 44 * s, width: 182 * s,
        height: 62 * s, borderRadius: 6 * s, transform: "rotate(-11deg)",
        background: hexa(RED, 0.90), border: `${5 * s}px solid ${dkh(RED, 0.44)}`,
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ ...mono(34 * s, 900), color: "#2A0A05", letterSpacing: "0.10em" }}>
          {R.verdicts.bad}</span>
      </div>
    )}
  </div>
);

/* =========================================================================
   HOOK A · THE VOLLEY — the mechanism is a RETURN.

   The image: a builder shoves finished work through a hatch and it comes
   straight back stamped, faster every single time, while the pile of refused
   drafts grows past his own head. You never see the critic. All you see is a
   hand coming out of the dark with a stamp, which is funnier, simpler and more
   unsettling than a second character would be.

   ⛔ AN ACTION IS A DISTANCE: the panel covers 300px in 8 frames going in and
   comes back on a real arc, not a fade. Four volleys, each one 4 frames faster
   than the last, so the escalation is in the CUTTING RATE as well as the pile.
   ====================================================================== */
export const HookVolley: React.FC<{ dur: number; v?: Variant }> = ({ dur, v = "gauntlet" }) => {
  const f = useCurrentFrame();
  const p = LIT;

  /* ⛔⛔ THE STAMP LANDED 82px BELOW THE PAPER. Alex: *"the stamp doesnt land on
     the papers, it lands below it."* He is right and it was arithmetic, not
     taste: the work seated at y 386..574 while the stamp block was authored at
     `top: 560 + slamK*96`, i.e. 656..740 at full travel. Two objects positioned
     independently, never checked against each other. Every coordinate in this
     scene is now derived from ONE anchor — `PX/PY`, the seated paper — so the
     tool cannot drift off the thing it is supposed to hit.

     ⭐ AND THE STAMPING IS NOW THE SHOT. Alex: *"it should be the main focal,
     restructure the scene to focus on that with the claude sprite to the
     side."* The paper sits dead centre and large, the hand comes down onto it
     from above, and the builder is a supporting figure at the left edge. What
     was a wide two-hander is now one object being struck. */
  const PW = 210 * 1.46, PH = 152 * 1.46;      /* the seated paper, 307 x 222 */
  const PX = 402, PY = 384;                    /* its ANCHOR — everything derives */
  const FACE_Y = PY + PH * 0.30;               /* where the stamp face must land */

  const V = [{ a: 6, len: 9 }, { a: 32, len: 8 }, { a: 54, len: 7 }, { a: 73, len: 6 }];
  const cur = V.filter(v => f >= v.a).slice(-1)[0];
  const ci = cur ? V.indexOf(cur) : -1;
  const stack = V.filter(v => f >= v.a + v.len + 16).length;

  let px = PX, py = PY, prot = 0, marked = false, show = true;
  let slamK = 0, lift = 0;
  if (ci >= 0) {
    const v = V[ci];
    const lf = f - v.a;
    const inK = E(lf, 0, v.len, 0, 1, IO);
    const slamAt = v.len + 2;
    const backA = slamAt + 8, backB = backA + 13;
    /* down onto the paper, hold two frames, then lift off it */
    slamK = E(lf, slamAt - 3, slamAt, 0, 1, IN_Q) - E(lf, slamAt + 3, slamAt + 9, 0, 1, OUT);
    lift = E(lf, slamAt + 3, slamAt + 8, 0, 1, OUT);
    /* ⭐ THE MARK APPEARS AS THE TOOL LIFTS, not as it lands — you see the stamp
       come down, and the REJECT is revealed underneath it. */
    marked = lf >= slamAt + 3;
    if (lf < backA) {
      px = PX - (1 - inK) * 300;
      py = PY + (1 - inK) * 26;
      prot = (1 - inK) * -5
        + (lf >= slamAt ? Math.sin((lf - slamAt) * 1.7) * Math.exp(-(lf - slamAt) / 3.2) * 5 : 0);
    } else {
      const k = E(lf, backA, backB, 0, 1, OUT);
      px = PX - k * 470;
      py = PY - Math.sin(k * Math.PI) * 150 + k * 300;
      prot = k * -290;
      if (k >= 1) show = false;
    }
  }

  /* the hand assembly, ALL of it hung off FACE_Y so the face lands on the paper */
  const HX = PX + PW * 0.5;                    /* centred on the paper */
  const SH_W = 250, SH_H = 104;
  const faceTop = FACE_Y - SH_H * 0.5;
  const rest = -300;                           /* how far up it waits */
  const hy = rest + slamK * (faceTop - rest);

  return (
    <Scene p={p} slug="" push={[0, dur, 1.064]} vig={0.68} glow={hexa(p.key, 0.22)}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 1 }}>
        <Hall p={p} f={f} dx={PAR_X[v]} overhead="truss" bands={3} kind="bay"
          rake={0.22} rakeX={RAKE_X0[v]} rakeRate={2.6 * RAKE_K[v]}
          lamp={{ x: 560, y: 300, r: 340 }} grit={0.8} />
      </div>
      <ReturnRail y={196} f={f} rate={4.6 * RAKE_K[v]} z={26} c={STEEL} hangers o={1} />
      {[0, 1, 2, 3, 4].map(i => (
        <div key={"lb" + i} style={{ position: "absolute", left: 44 + i * 190, top: 306,
          width: 196, height: 42, zIndex: 20, borderRadius: 7,
          background: `linear-gradient(180deg, #FFF6DC 0%, #F2E0B4 100%)` }} />
      ))}
      {[0, 1, 2, 3, 4].map(i => (
        <div key={"lc" + i} style={{ position: "absolute", left: -12 + i * 190, top: 338,
          width: 300, height: 360, zIndex: 19,
          background: `linear-gradient(180deg, ${hexa("#FFF2D2", 0.17)} 0%, ${hexa("#FFF2D2", 0)} 100%)` }} />
      ))}


      {/* THE COUNTER the work is presented on — derived from the paper anchor so
          the paper always SITS on it rather than floating over it */}
      <div style={{ position: "absolute", left: PX - 86, top: PY + PH - 6, width: PW + 172,
        height: 34, zIndex: 38, borderRadius: 5, boxShadow: SH,
        background: `linear-gradient(180deg, ${mxh(SLATE, 0.24)} 0%, ${dkh(SLATE, 0.52)} 100%)` }} />
      {[PX - 52, PX + PW + 14].map((x, i) => (
        <div key={"cl" + i} style={{ position: "absolute", left: x, top: PY + PH + 26,
          width: 30, height: 150, zIndex: 37, background: dkh(SLATE, 0.48) }} />
      ))}
      <Pool x={PX + PW * 0.5} y={PY + PH + 12} w={700} c={p.key} o={0.20} z={18} hh={200} />

      {/* the in-tray — work waiting to be presented, depleting as he submits */}
      {Array.from({ length: Math.max(0, 4 - (ci < 0 ? 0 : ci + 1)) }, (_, i) => (
        <div key={"in" + i} style={{ position: "absolute", left: 812 + i * 8, top: 566 - i * 22,
          zIndex: 34 + i, transform: `rotate(${(i % 2 ? 1 : -1) * 1.8}deg)` }}>
          <WorkPanel x={0} y={0} s={0.84} z={34 + i} lvl={0} f={f} />
        </div>
      ))}

      {/* ⭐ THE PAPER — dead centre, large, and the thing being struck */}
      {show && ci >= 0 && (
        <WorkPanel x={px} y={py} s={1.46} z={50} lvl={ci} rot={prot} stamped={marked} f={f} />
      )}
      {ci < 0 && <WorkPanel x={PX} y={PY} s={1.46} z={50} lvl={0} rot={0} stamped={false} f={f} />}

      {/* ⭐ THE HAND — the critic is never a face. Forearm, fist, grip, stamp:
          one assembly, all of it hung off `faceTop`, so the face lands exactly
          on the paper's upper third at every scale. */}
      {ci >= 0 && (
        <div style={{ position: "absolute", left: 0, top: hy, right: 0, height: 1, zIndex: 62 }}>
          {/* the forearm running up out of frame */}
          <div style={{ position: "absolute", left: HX - 58, top: -318, width: 116, height: 330,
            borderRadius: 16,
            background: `linear-gradient(96deg, ${mxh(CLAY, 0.20)} 0%, ${CLAY} 52%, ${dkh(CLAY, 0.32)} 100%)` }} />
          {/* the fist */}
          <div style={{ position: "absolute", left: HX - 84, top: -22, width: 168, height: 82,
            borderRadius: 22, background: `linear-gradient(96deg, ${mxh(CLAY, 0.10)} 0%, ${dkh(CLAY, 0.12)} 100%)` }} />
          {[0, 1, 2].map(i => (
            <div key={"kn" + i} style={{ position: "absolute", left: HX - 66 + i * 44, top: -14,
              width: 34, height: 26, borderRadius: 12, background: dkh(CLAY, 0.24) }} />
          ))}
          {/* the grip */}
          <div style={{ position: "absolute", left: HX - 26, top: 54, width: 52, height: 44,
            borderRadius: 8, background: dkh(BRASS, 0.22) }} />
          {/* the stamp face — its TOP is 0 here, i.e. exactly faceTop */}
          <div style={{ position: "absolute", left: HX - SH_W / 2, top: 92, width: SH_W,
            height: SH_H, borderRadius: 12, boxShadow: SH_D,
            background: `linear-gradient(176deg, ${mxh(RED, 0.30)} 0%, ${RED} 46%, ${dkh(RED, 0.40)} 100%)`,
            border: `8px solid ${dkh(RED, 0.54)}`, display: "flex", alignItems: "center",
            justifyContent: "center" }}>
            <span style={{ ...mono(44, 900), color: "#2A0A05", letterSpacing: "0.08em" }}>
              {R.verdicts.bad}</span>
          </div>
        </div>
      )}
      {ci >= 0 && (<>
        <Ring x={HX} y={FACE_Y + 30} f={f} at={V[ci].a + V[ci].len + 2} c={RED} s={1.3} z={64} />
        <Puff x={HX} y={FACE_Y + 40} f={f} at={V[ci].a + V[ci].len + 2} c="#9E5C4E" n={11}
          s={1.0} z={48} />
      </>)}

      {/* ⭐ THE PILE IS THE COUNTER, and it is behind him at the left so it can
          grow past his own head without ever crossing the paper. */}
      {Array.from({ length: stack }, (_, i) => (
        <div key={"pile" + i} style={{ position: "absolute", left: 24 + (i % 2) * 24,
          top: 592 - i * 76, zIndex: 40 + i,
          transform: `rotate(${(i % 2 ? 1 : -1) * (4 + i * 2.2)}deg)` }}>
          <WorkPanel x={0} y={0} s={0.96} z={40 + i} lvl={i} stamped f={f} />
        </div>
      ))}

      {/* ⛔ THE BUILDER IS NOW A SUPPORTING FIGURE, at the side, watching his
          work get refused. He still ACTS — he pushes each sheet on and flinches
          on every strike — but he is no longer competing with the event. */}
      <Hero f={f} x={222} y={790} size={334} z={56} act={1} ph={0.4}
        drive={ci >= 0 ? E(f - V[ci].a, 0, V[ci].len, 0, 1, IO) * 0.34 : 0} reach={92}
        strain={0.14 + stack * 0.16}
        shock={ci >= 0 ? E(f - V[ci].a, V[ci].len + 2, V[ci].len + 7, 0, 1, OUT) * 0.9 : 0}
        stern={stack >= 3 ? 0.6 : 0} gaze={0.5} costume={{ constr: 1 }} />
      <Steam x={222} y={512} f={f} at={38} n={8} s={1.25} z={58} rate={1.6} />

      <Stanchion side="r" c="#241F19" w={132} z={90} braceY={500} braceW={120} />
    </Scene>
  );
};

/* =========================================================================
   HOOK B · THE PRESS — the mechanism is a VERDICT.

   The image: a stamp head the size of the room comes down on work that is
   visibly BETTER every round, and refuses it anyway. Near black, one hard
   overhead cone, no colour but the red of the stamp and the warm of the work.

   ⭐ THE ESCALATION IS IN THE QUALITY OF WHAT IS REFUSED, not in the stamp.
   Round 1 is a rough draft, round 4 is genuinely good, and it still gets
   slammed. That is what makes the viewer ask the question the reel answers.
   ⛔ IT DOES NOT RESOLVE TO PASS. A hook that resolves has spent the payoff.
   ====================================================================== */
export const HookPress: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  /* ⛔ NOT THE DARK ROOM. v1 played this on `lectern` (near black) and a red
     press on navy is mud — you could not tell the head from the shadow, and
     frame 0 had nothing bright in it but the plate. On the bone hall the same
     press is a poster, and HOOK_LUMA comes from the ROOM instead of a slab. */
  const p = LIT;
  const S = [{ a: 4, d: 7 }, { a: 26, d: 6 }, { a: 46, d: 5 }, { a: 64, d: 4 }];
  const cur = S.filter(s2 => f >= s2.a).slice(-1)[0];
  const si = cur ? S.indexOf(cur) : -1;
  const head = si >= 0 ? (() => {
    const lf = f - S[si].a, d = S[si].d;
    return E(lf, 0, d, 0, 1, IN_Q) - E(lf, d + 7, d + 17, 0, 1, OUT);
  })() : 0;
  const hitAt = si >= 0 ? S[si].a + S[si].d : -99;
  const hit = f - hitAt;
  const shake = hit >= 0 && hit < 14 ? Math.sin(hit * 1.7) * Math.exp(-hit / 4.4) * 15 : 0;
  const stamped = si >= 0 && f >= hitAt;
  const slide = si >= 0 ? E(f - S[si].a, -13, 0, 1, 0, OUT) : 1;
  const sweep = si >= 0 && si < S.length - 1
    ? E(f, S[si].a + S[si].d + 13, S[si + 1].a - 2, 0, 1, IN_Q) : 0;

  return (
    <Scene p={p} slug="" push={[0, dur, 1.072]} vig={0.70} glow={hexa(RED, 0.20)}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 1 }}>
        <Hall p={p} f={f} dx={0} overhead="none" bands={3} kind="plant"
          rake={0.22} rakeX={300} rakeRate={2.4} lamp={{ x: 506, y: 320, r: 340 }} grit={0.8} />
      </div>
      <ReturnRail y={188} f={f} rate={4.2} z={22} c={STEEL} hangers o={1} />
      {/* one practical on the back wall — a lit lamp bank. Set dressing, not a
          slab: it carries no information and it is what a hall this size has. */}
      {[0, 1, 2, 3, 4].map(i => (
        <div key={"lb" + i} style={{ position: "absolute", left: 44 + i * 190, top: 306,
          width: 196, height: 42, zIndex: 20, borderRadius: 7,
          background: `linear-gradient(180deg, #FFF6DC 0%, #F2E0B4 100%)` }} />
      ))}
      {[0, 1, 2, 3, 4].map(i => (
        <div key={"lc" + i} style={{ position: "absolute", left: -12 + i * 190, top: 338,
          width: 300, height: 360, zIndex: 19,
          background: `linear-gradient(180deg, ${hexa("#FFF2D2", 0.17)} 0%, ${hexa("#FFF2D2", 0)} 100%)` }} />
      ))}

      <Pool x={506} y={622} w={720} c={p.key} o={0.18} z={18} hh={210} />

      {/* ⭐ ONE OBJECT, TWO GATE RESULTS (reel 109) — sized by the arithmetic
          rather than by feel. A row profile said the dark mass is the FLOOR and
          that a 260x260 tile on the wall was worth +0.8, not +12. At 400x250 =
          12.5% of the panel at luma ~240 against a ~130 wall it is worth ~+14,
          which is what the bar needs and no more. The 880x182 bar tried first
          was 20% and took the frame over; this sits in the corner the action
          does not use. */}
      {/* THE PLATEN — the one supporting object, dead centre under the ram */}
      <div style={{ position: "absolute", left: 268, top: 640 + shake * 0.35, width: 476,
        height: 44, zIndex: 40, borderRadius: 6, boxShadow: SH,
        background: `linear-gradient(180deg, ${mxh(SLATE, 0.44)} 0%, ${dkh(SLATE, 0.24)} 100%)` }} />
      {[300, 690].map((x, i) => (
        <div key={"leg" + i} style={{ position: "absolute", left: x, top: 678, width: 30,
          height: 96, zIndex: 39, background: mxh(SLATE, 0.10) }} />
      ))}

      {/* the work, better every round, swept off after each verdict */}
      {si >= 0 && sweep < 1 && (
        <WorkPanel x={378 - slide * 600 - sweep * 700} y={486 + shake * 0.45} s={1.26} z={50}
          lvl={si} rot={sweep * -16} stamped={stamped} f={f} />
      )}

      {/* the queue of work waiting for its verdict — bright, on the floor, and
          the reason frame 0 is not an empty room with a press in it */}
      {Array.from({ length: Math.max(0, 4 - Math.max(0, si + 1)) }, (_, i) => (
        <div key={"q" + i} style={{ position: "absolute", left: 636 + i * 9,
          top: 664 - i * 24, zIndex: 34 + i, transform: `rotate(${(i % 2 ? 1 : -1) * 1.8}deg)` }}>
          <WorkPanel x={0} y={0} s={1.02} z={34 + i} lvl={0} f={f} />
        </div>
      ))}
      {/* ⭐ THE STAMP HEAD — the dominant object, centred, fully in frame.
          ⛔ v1 sat it at x 262..750 UNDER a 470px claim plate in the same corner,
          so all a viewer ever saw was "ECT". Centred at 506 with the plate now a
          top bar, the whole word lands. */}
      {/* ⛔⛔ AND IT IS POISED AT REST, NOT PARKED OFF-SCREEN. v1 sat the head at
          top -300, i.e. entirely above the panel, so FRAME 0 — the one frame
          guaranteed to be seen — was an empty beige room with a caption bar.
          THE-OPEN law 2 is "the subject is in it". At rest the head now hangs in
          the top of frame with its full width visible, which is also the more
          frightening image: the thing is already there, waiting. */}
      <div style={{ position: "absolute", left: 262, top: 190 + head * 250 + shake, width: 488,
        zIndex: 62 }}>
        {[10, 446].map((rx, i) => (
          <div key={"gr" + i} style={{ position: "absolute", left: rx, top: -420, width: 34,
            height: 486, background: mxh(SLATE, 0.34) }} />
        ))}
        <div style={{ position: "absolute", left: 190, top: -420, width: 108, height: 486,
          background: `linear-gradient(90deg, #C2C9D4 0%, #8A919C 56%, #5A616B 100%)` }} />
        <div style={{ position: "absolute", left: 0, top: 56, width: 488, height: 214,
          borderRadius: 14, boxShadow: SH_D,
          background: `linear-gradient(176deg, ${mxh(RED, 0.42)} 0%, ${mxh(RED, 0.10)} 46%, ${dkh(RED, 0.30)} 100%)`,
          border: `11px solid ${dkh(RED, 0.46)}`, display: "flex", alignItems: "center",
          justifyContent: "center" }}>
          <span style={{ ...mono(88, 900), color: "#2A0A05", letterSpacing: "0.10em" }}>
            {R.verdicts.bad}</span>
        </div>
        {[[42, 88], [412, 88], [42, 208], [412, 208]].map((q, i) => (
          <div key={"rv" + i} style={{ position: "absolute", left: q[0], top: q[1], width: 20,
            height: 20, borderRadius: 20, background: dkh(RED, 0.64) }} />
        ))}
      </div>
      {si >= 0 && (<>
        <Ring x={506} y={640} f={f} at={hitAt} c={RED} s={1.8} z={66} />
        <Puff x={506} y={646} f={f} at={hitAt} c="#9E5C4E" n={14} s={1.4} z={64} up={72} />
      </>)}

      {/* the builder, watching his work get refused, flinching on every slam */}
      <Hero f={f} x={798} y={786} size={312} z={56} act={3} ph={1.3}
        shock={si >= 0 && hit < 16 ? E(hit, 0, 6, 0, 1, OUT) * 0.9 : 0}
        stern={si >= 2 ? 0.5 : 0} gaze={-0.7} flip costume={{ glasses: 1 }} />
      <Steam x={798} y={510} f={f} at={42} n={7} s={1.15} z={58} rate={1.4} />

      <Stanchion side="l" c="#241F19" w={128} z={90} braceY={510} braceW={116} />
    </Scene>
  );
};
