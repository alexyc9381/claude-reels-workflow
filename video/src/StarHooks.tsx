import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D,
  Scene, Cam, Mark, R, asPlace, mono, Ring, Puff, Pool, Steam,
  RepoIcon, BRAND_DROPS, PriceTag, SplitFlap, Gantry, Hero, Forearm,
  rock, squash, lerpHex, GOLD,
} from "./StarWorld";
import { SetFor } from "./StarSets";

/* ===========================================================================
   REEL 115 · "STAR" — THE HOOK EXPERIMENT.

   ⭐⭐⭐ THREE CUTS, ONE BODY, THREE HOOKS. Alex: *"you can make the hooks more
   interesting — run hook experiments to see if different hook ideas would be
   better."*

   `THE-OPEN.md` generates 3-5 hook concepts and picks ONE before building. That
   is a build-time filter and it throws away four ideas on a guess. **Trial cuts
   are where they get tested** — same scenes, same VO, same everything after
   ~3.4s, differing exactly where a viewer decides whether to stay. Reel 94 is
   the only evidence in this repo about what makes an open work and it came from
   six cuts where ONLY the hook varied; every grade-only variant set since has
   produced no information at all.

   ⛔ THEY MUST BE THREE IDEAS, NOT ONE IDEA THREE WAYS. THE-OPEN's own test: if
   one sentence describes all of them, you have one concept. These are three
   different answers to *"you're missing out on $10,000 of software"*:

     A  THE PRICE WALL   (market, in StarScenes S0) — a BARRIER. Five brands are
                          behind a gate and get priced one at a time.
     B  THE RECEIPT      (amber, below)             — a BILL. One colossal
                          receipt unspools at you and does not stop.
     C  THE LOAD         (steel, below)             — a BURDEN. The cost is
                          stacked on his back and it keeps growing.

   ⛔ Each one still has to pass THE-OPEN's four frame-0 laws ON ITS OWN: bright
   and saturated, the subject in it, recognition over motion, and a settled
   readable frame 0. A weak second hook is a wasted upload, not an experiment.
   ⛔ And no hook may recolour the mascot ([[feedback_trial_cut_variants]]).
   ========================================================================= */

const TAG = ["$49", "$99", "$300", "$59", "$79"] as const;

/* -------------------------------------------------------------------------
   HOOK B · THE RECEIPT — the cost as a BILL that will not stop coming.

   The recognition is universal and instant: a receipt longer than the thing you
   bought. It is one dominant bright object on a dark street, which is the
   silhouette rule the barrier hook needs a whole gate to achieve.

   ⭐ The unspool is STEPPED because a printer IS stepped — §1's "N discrete
   pops beat one long tween" applied where it is also literally true, and §13's
   choppiness warning does not bite because the paper CONCERTINAS at the bottom
   (a second thing moving) rather than the whole sheet jumping.
   ---------------------------------------------------------------------- */
export const HookReceipt: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("street");
  const CUT = 54, B = f >= CUT;
  /* ⛔ THE FIRST TWO LINES ARE ALREADY PRINTED AT FRAME 0. An accumulating
     subject must be pre-seeded or the open is an empty room — THE-OPEN law 4,
     and it is the one an animated hook breaks most easily. */
  const FEED = [-40, -20, 14, 28, 42];            /* five printer advances */
  const PUNCH = [58, 64, 70, 76, 82];             /* five plates come through */
  const SHRED = 86;
  const surge = E(f, 88, 101, 0, 1, OUT);
  const gy = p.horizon + 186;

  /* the paper's length advances in hard steps, and rings out after each */
  const fed = FEED.filter(a => f >= a).length;
  const len = 168 + fed * 104 + (f >= FEED[0] ? rock(f, FEED[Math.max(0, fed - 1)], 9, 13) : 0);
  const load = Math.min(1, fed / 5);

  return (
    <Scene p={p} slug="" push={[0, dur, 1.055]} vig={0.34}>
      <Cam z={5} s={B ? 1.24 : 1.0} y={B ? -38 : 0} x={B ? 10 : 0}>
        <SetFor k="street" f={f} t={f * 1.5} rakeRate={6.6} />

        {/* the printer head the bill comes out of — a real machine, cropped by
            the top edge so it reads as bigger than frame */}
        <div style={{ position: "absolute", left: 236, top: 40, width: 500, height: 156,
          zIndex: 70, borderRadius: 14,
          background: "linear-gradient(178deg, #59616B 0%, #23282F 100%)",
          border: "8px solid #12161B" }}>
          <div style={{ position: "absolute", left: 40, bottom: -10, right: 40, height: 20,
            borderRadius: 4, background: "#0E1116" }} />
          {[0, 1, 2].map(i => (
            <div key={"pl" + i} style={{ position: "absolute", left: 40 + i * 40, top: 44,
              width: 22, height: 22, borderRadius: "50%",
              background: i === 0 ? "#4FBF8B" : "#39424E" }} />
          ))}
          <div style={{ position: "absolute", right: 44, top: 40, ...mono(26, 900),
            color: "#8E9AA6", letterSpacing: "0.12em" }}>BILLING</div>
        </div>

        {/* ⭐ THE RECEIPT. Real line items with real marks, a rule between each,
            a torn zig-zag foot, and the running total in the biggest type in
            the frame. It is the brightest object on a night street. */}
        <div style={{ position: "absolute", left: 286, top: 196, width: 400, height: len,
          zIndex: 66, background: "linear-gradient(178deg, #FFFDF6 0%, #EFE9DA 100%)",
          borderLeft: "3px solid #C9BE9F", borderRight: "3px solid #C9BE9F",
          transform: `rotate(${Math.sin(f / 29) * 0.5}deg)`, transformOrigin: "50% 0%",
          overflow: "hidden" }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 14, textAlign: "center",
            ...mono(23, 900), color: "#3A342A", letterSpacing: "0.14em" }}>MONTHLY</div>
          <div style={{ position: "absolute", left: 22, right: 22, top: 48, height: 3,
            background: "#C9BE9F" }} />
          {BRAND_DROPS.map((b, i) => {
            if (f < FEED[i]) return null;
            const lf = f - FEED[i];
            return (
              <div key={"li" + i} style={{ position: "absolute", left: 20, right: 20,
                top: 66 + i * 100, height: 88, display: "flex", alignItems: "center", gap: 14,
                opacity: E(lf, 0, 3, 0, 1, LIN),
                transform: `translateY(${E(lf, 0, 4, -22, 0, OUT)}px)` }}>
                <div style={{ width: 62, height: 62, borderRadius: 10, background: "#FFFFFF",
                  border: "3px solid #E4DECE", display: "flex", alignItems: "center",
                  justifyContent: "center" }}>
                  <Img src={staticFile("logos/" + b.src)}
                    style={{ width: 42, height: 42, objectFit: "contain" }} />
                </div>
                <span style={{ ...mono(21, 800), color: "#5B5346", flex: 1,
                  whiteSpace: "nowrap", overflow: "hidden" }}>{b.name}</span>
                <span style={{ ...mono(30, 900), color: "#8E2F22" }}>{TAG[i]}</span>
              </div>
            );
          })}
          {/* the torn foot */}
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 18,
            background: `repeating-linear-gradient(135deg, #EFE9DA 0px, #EFE9DA 12px, transparent 12px, transparent 24px)` }} />
        </div>

        {/* the running total, on the gantry, in the biggest type in the frame */}
        <Gantry y={112} f={f} z={72} span={[40, 300]}>
          <div style={{ position: "absolute", left: 24, top: 168, zIndex: 76,
            borderRadius: 16, background: "linear-gradient(178deg, #FBF6E8 0%, #E6DCC4 100%)",
            border: "7px solid #241F17", padding: "10px 16px 14px", boxShadow: SH_D }}>
            <div style={{ ...mono(20, 900), color: "#241F17", letterSpacing: "0.14em",
              paddingBottom: 6 }}>YOU PAY</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ ...mono(40, 900), color: "#8E2F22" }}>$</span>
              <SplitFlap inline x={0} y={0} text={fed < 2 ? "01,200" : fed < 4 ? "04,800" : "10,000"}
                f={f} at={fed < 2 ? -26 : fed < 4 ? FEED[1] : FEED[3]} s={1} z={77} cell={36} />
            </div>
          </div>
        </Gantry>

        {/* ⭐ THE PAPER PILES ON HIM. Each advance concertinas another fold at
            his feet, so the load is visible as a QUANTITY, not as a number. */}
        {Array.from({ length: fed * 3 }, (_, i) => (
          <div key={"fold" + i} style={{ position: "absolute",
            left: 300 + (i % 3) * 46 - (i % 2) * 22, top: gy - 46 - ((i / 3) | 0) * 17,
            width: 300 - (i % 3) * 26, height: 22, borderRadius: 3, zIndex: 64,
            background: i % 2 ? "#FFFDF6" : "#E4DCCA", border: "2px solid #C9BE9F",
            transform: `rotate(${-3 + (i % 5) * 1.5}deg)` }} />
        ))}

        {/* the hero, sinking under it — his body carries the cost */}
        <Hero f={f} x={252 + surge * 120} y={gy} size={330} z={82}
          drive={B ? E(f, 56, 72, 0, 1, OUT) : 0}
          strain={B ? E(f, 56, 66, 0.85, 0.15, OUT) : 0.25 + load * 0.55}
          reach={70} costume={{ constr: 1 }} act={1} ph={0.3}
          stern={B ? 0 : load * 0.9} cheer={surge > 0.5 ? 1 : 0}
          tint={B ? lerpHex("#D97757", "#A8331F", E(f, 56, 74, 1, 0, OUT) * load)
                  : lerpHex("#D97757", "#A8331F", load)} />
        {!B && f >= FEED[2] && <Steam x={252} y={gy - 326} f={f} at={FEED[2]} n={5} s={1} z={86} />}

        {/* shot B: the five plates PUNCH THROUGH the bill */}
        {B && PUNCH.map((at, i) => {
          if (f < at) return null;
          const lf = f - at;
          const t = E(lf, 0, 8, 0, 1, BACK);
          return (
            <React.Fragment key={"pk" + i}>
              <RepoIcon x={486} y={258 + i * 104} i={i} s={0.62 * t} z={88} f={f}
                rot={-16 + i * 8} />
              <Ring x={486} y={258 + i * 104} f={f} at={at} r={190} z={87} c="#FFE7BE" w={8} />
              {/* the tear the plate made */}
              <div style={{ position: "absolute", left: 286, top: 218 + i * 104, width: 400,
                height: 26, zIndex: 84,
                background: `repeating-linear-gradient(112deg, ${hexa("#8E877A", 0.6)} 0px, ${hexa("#8E877A", 0.6)} 10px, transparent 10px, transparent 22px)` }} />
            </React.Fragment>
          );
        })}
        {B && f >= SHRED && <>
          <Puff x={506} y={gy - 200} f={f} at={SHRED} n={18} s={1.3} z={90} c="#EFE9DA" />
          <Ring x={506} y={gy - 200} f={f} at={SHRED} r={320} z={89} w={10} />
        </>}
      </Cam>
    </Scene>
  );
};

/* -------------------------------------------------------------------------
   HOOK C · THE LOAD — the cost as a BURDEN, stacked on his back.

   ⭐ This one exists because of a MEASUREMENT, not a mood: §12's table says the
   highest-scoring hero action in this project is **"loaded and crushed under a
   growing pile" at 14.09**, against 8.94 for the same hero standing in a busy
   room. It is also the only one of the three hooks where the SPRITE is the
   subject rather than a witness — which is what "characters stop scrolls" means.
   ---------------------------------------------------------------------- */
export const HookLoad: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("street");
  const CUT = 54, B = f >= CUT;
  /* ⛔ TWO CRATES ARE ALREADY ON HIS BACK AT FRAME 0, same reason. */
  const DROP = [-40, -20, 15, 28, 41];            /* five crates land on him */
  const LIFT = 60;                                 /* the plates take the weight */
  const gy = p.horizon + 156;
  const HERO = 296, PITCH = 76;

  const landed = DROP.filter(a => f >= a + 7).length;
  /* each impact drives him DOWN and spreads him — the body changes shape */
  const hit = Math.max(...DROP.map(a =>
    E(f, a + 7, a + 10, 0, 1, OUT) - E(f, a + 10, a + 22, 0, 1, IO)));
  const sink = B ? E(f, LIFT, LIFT + 12, landed * 12, -22, BACK) : landed * 12 + hit * 18;
  const load = Math.min(1, landed / 5);
  const lifted = B ? E(f, LIFT, LIFT + 14, 0, 1, OUT) : 0;

  return (
    <Scene p={p} slug="" push={[0, dur, 1.058]} vig={0.34}>
      <Cam z={5} s={B ? 1.22 : 1.0} y={B ? -30 : 0} x={B ? -12 : 0}>
        <SetFor k="street" f={f} t={f * 1.5} rakeRate={5.4} />

        {/* the running total overhead */}
        <Gantry y={110} f={f} z={70} span={[540, 976]}>
          <div style={{ position: "absolute", left: 566, top: 160, zIndex: 74,
            borderRadius: 16, background: "linear-gradient(178deg, #FBF6E8 0%, #E6DCC4 100%)",
            border: "7px solid #241F17", padding: "10px 16px 14px", boxShadow: SH_D }}>
            <div style={{ ...mono(20, 900), color: "#241F17", letterSpacing: "0.14em",
              paddingBottom: 6 }}>ON YOUR BACK</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ ...mono(40, 900), color: "#8E2F22" }}>$</span>
              <SplitFlap inline x={0} y={0}
                text={landed < 2 ? "01,200" : landed < 4 ? "04,800" : "10,000"}
                f={f} at={landed < 2 ? -26 : landed < 4 ? -40 : DROP[3] + 7}
                s={1} z={75} cell={36} />
            </div>
          </div>
        </Gantry>

        {/* ⭐ THE STACK. Each crate carries a real mark and a price tag, and the
            whole column TEETERS on its own clock — a stack that is perfectly
            still is a wall. */}
        {BRAND_DROPS.map((b, i) => {
          const at = DROP[i];
          if (f < at) return null;
          const lf = f - at;
          const fall = E(lf, 0, 7, -560, 0, IN_Q);
          const fallOffset = 0;
          const seat = squash(lf, 7, 0.22, 3, 12);
          const teeter = Math.sin(f / 21 + i * 0.7) * (2.2 + i * 0.5) * (1 - lifted);
          /* ⛔⛔ THE STACK SITS ON HIS HEAD, AND THE HEAD IS NOT WHERE THE DIV
             SAYS IT IS. `SlopKit.Mascot` leaves transparent padding above the
             drawn head — the real head top is **y - size * 0.451**, not
             y - size. Stacking on the div left a 162px gap and the load floated
             beside him instead of crushing him. This is the same trap that once
             put a crown 38px above a mascot's head: READ THE PIXELS, DO NOT
             TRUST THE CONTAINER. */
          const headTop = gy + sink - HERO * 0.451;
          const yBase = headTop - 96 + fallOffset - i * PITCH;
          return (
            <React.Fragment key={"cr" + i}>
              <div style={{ position: "absolute", left: 380 - 86 + Math.sin(f / 19 + i) * 5,
                top: yBase + fall - lifted * (150 + i * 34), width: 172, height: 74,
                zIndex: 90 + i, borderRadius: 9,
                transform: `rotate(${teeter + (i % 2 ? 1.5 : -1.5)}deg) scale(${seat})`,
                background: `linear-gradient(170deg, ${mxh(b.c, 0.24)} 0%, ${b.c} 50%, ${dkh(b.c, 0.34)} 100%)`,
                border: `6px solid ${dkh(b.c, 0.54)}`, boxShadow: SH_D,
                display: "flex", alignItems: "center", gap: 12, padding: "0 12px" }}>
                <div style={{ width: 50, height: 50, borderRadius: 9, background: "#FFFFFF",
                  border: "3px solid #E8E2D2", display: "flex", alignItems: "center",
                  justifyContent: "center" }}>
                  <Img src={staticFile("logos/" + b.src)}
                    style={{ width: 34, height: 34, objectFit: "contain" }} />
                </div>
                <span style={{ ...mono(15, 900), color: "#F4EFE1", whiteSpace: "nowrap" }}>
                  {b.name}</span>
              </div>
              {!B && (
                <div style={{ position: "absolute", left: 380 + 64,
                  top: yBase + fall + 6, zIndex: 95 }}>
                  <PriceTag x={0} y={0} t={TAG[i]} s={0.72} rot={-10} />
                </div>
              )}
              {f >= at + 7 && <Puff x={380} y={yBase + 66} f={f} at={at + 7} n={8} s={0.8}
                z={79} c="#C0A882" />}
            </React.Fragment>
          );
        })}

        {/* ⭐⭐ THE HERO IS THE SUBJECT. Each impact compresses him (scaleY via
            strain), spreads him, and drives him down; past halfway a fast small
            tremble says effort. On the LIFT he springs up and OVERSHOOTS his
            own standing height — the overshoot is the whole reason it reads. */}
        <Hero f={f} x={380} y={gy + sink - lifted * 34} size={HERO} z={82}
          drive={0} strain={B ? E(f, LIFT, LIFT + 12, 0.9, 0.1, OUT) : 0.3 + load * 0.6 + hit * 0.3}
          reach={0} costume={{ constr: 1 }} act={1} ph={1.4}
          stern={B ? 0 : load} cheer={lifted > 0.6 ? 1 : 0}
          tint={lerpHex("#D97757", "#A8331F", B ? load * (1 - lifted) : load)} />
        {!B && f >= DROP[2] && <Steam x={380} y={gy - HERO - 6 + sink} f={f} at={DROP[2]} n={6} s={1.05} z={86} />}

        {/* shot B: the five FREE plates slide under and take the weight */}
        {B && BRAND_DROPS.map((b, i) => {
          const at = LIFT - 4 + i * 3;
          if (f < at) return null;
          const t = E(f - at, 0, 12, 0, 1, OUT);
          return (
            <div key={"lp" + i} style={{ position: "absolute",
              left: 760 - t * 280 + i * 6, top: gy - 230 - i * 28, zIndex: 84,
              opacity: Math.min(1, t * 2),
              padding: "8px 16px", borderRadius: 10, background: "#F4EFE1",
              border: "5px solid #1E5C42", transform: `rotate(${-8 + i * 3}deg)` }}>
              <span style={{ ...mono(28, 900), color: "#1E5C42", letterSpacing: "0.10em" }}>
                FREE</span>
            </div>
          );
        })}
        {B && f >= LIFT && <>
          <Ring x={380} y={gy - 200} f={f} at={LIFT} r={340} z={86} c="#9CF0C4" w={10} />
          <Pool x={380} y={gy - 30} w={E(f, LIFT, LIFT + 14, 120, 700, OUT)} c="#FFD9A8"
            o={0.26} z={20} />
        </>}
      </Cam>
    </Scene>
  );
};
