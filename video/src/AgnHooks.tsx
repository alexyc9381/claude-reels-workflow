import React from "react";
import { useCurrentFrame } from "remotion";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D,
  Scene, Contact, Edge, R, asPlace, vivid, mono, ui, Ring, Puff, Steam, Sweat, Fall, Motes,
  Crew, Hero, GY, BAND_Y, SAFE3,
  CLAY, CLAYD, GOLD, GREEN, INK, BRASS, BONE, OXIDE, OXBLOOD, TEAL, SKY, VIOLET, STEEL, SLATE,
} from "./AgnWorld";
import { Facade, StageDoor, BigKey, Playbill, RealMark } from "./AgnProps";
import { Room } from "./HwSets";
import { DOOR } from "./AgnScenes";
import type { Variant } from "./AgnScenes";

/* ===========================================================================
   REEL 135 · "AGENCY" — THE HOOK CANDIDATES.

   ⛔⛔ docs/THE-OPEN.md STEP 1: **the first build step of any reel is not scene
   0, it is N concepts for scene 0.** Each is rendered at full quality on the
   real chassis with the real mascot and the real header, and one gets picked
   before the body is defended. Reel 78 built a whole Fury Road open before
   showing anything and threw all of it away.

   ⛔⛔ AND THREE CUTS = THREE HOOKS, NOT THREE GRADES
   (`memory/three-cuts-three-hooks`). Camera + contrast + rake + bed is a crop,
   a tilt, a tone curve and a bed — **nothing that HAPPENS is different**, and a
   dHash passes the whole time because it measures PIXELS, NOT EVENTS. So each
   candidate below is a different one-word MECHANISM, not a different colourway:

     key    POSSESSION    a key too heavy to hold drives into the lock
     bell   SUMMONS       one cord is pulled and eighteen bells call the house
     board  REVELATION    the letters strike into a blank board, price last
     roll   ACCUMULATION  the call sheet unrolls and will not stop

   ⭐ EVERY CANDIDATE OBEYS THE FOUR LAWS OF FRAME 0 the same way: the gates
   ride a LIT BOARD, never the hero prop, so the subject can stay near-black
   with air around it and hold the reel's biggest value spread.
   ========================================================================= */

export type HookId = "key" | "bell" | "board" | "roll";

/* =========================================================================
   bell · SUMMONS — one cord, eighteen bells, and the house answers.
   The 18 bells ARE the 18 divisions, and one pull is the one click.
   ====================================================================== */
export const BELL: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("board");

  /* the cord goes taut and the bells LEAN before any of them rings — the lean
     is the anticipation, and it is what the viewer does not yet know */
  const pull = E(f, 10, 20, 0, 1, OUT);
  const release = E(f, 20, 26, 0, 1, IN_Q);
  const ringT = (i: number) => E(f, 26 + i * 1.5, 34 + i * 1.5, 0, 1, OUT);
  const doors = E(f, 52, 70, 0, 1, OUT);

  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.46}>
      <Room p={p} f={f} bands={2} kind="shelf" overhead="joist" rake={0.08}
        rakeRate={3.0} floorKind="boards" grit={0.55}
        window={{ x: 840, y: 214, w: 190, h: 168 }} />

      {/* the bell board — a lit oak arc of eighteen brass bells on leaf springs */}
      <div style={{ position: "absolute", left: 506 - 380, top: 236, width: 760, height: 176,
        zIndex: 44, borderRadius: 10,
        background: `linear-gradient(168deg, ${dkh(OXIDE, 0.14)}, ${dkh(OXIDE, 0.5)})`,
        border: `9px solid ${dkh(OXIDE, 0.42)}`, boxShadow: SH_D }} />
      {Array.from({ length: 18 }).map((_, i) => {
        const col = i % 9, row = Math.floor(i / 9);
        const x = 506 - 340 + col * 84;
        const y = 274 + row * 74;
        const rt = ringT(i);
        const swing = Math.sin((f - 26 - i * 1.5) / 2.2) * Math.exp(-(f - 26 - i * 1.5) / 22) * 26 * rt
          + pull * (1 - release) * -7;
        return (
          <div key={i} style={{ position: "absolute", left: x, top: y, zIndex: 48,
            transformOrigin: "50% 0%", transform: `rotate(${swing}deg)` }}>
            <div style={{ width: 4, height: 18, background: dkh(BRASS, 0.5), marginLeft: 24 }} />
            <svg width={52} height={46} viewBox="0 0 52 46">
              <path d="M26 2 C10 2 4 18 3 42 L49 42 C48 18 42 2 26 2 Z"
                fill={rt > 0.2 ? mxh(BRASS, 0.24) : BRASS} />
              <path d="M26 2 C16 2 10 14 8 42 L18 42 C18 16 22 4 26 2 Z" fill={mxh(BRASS, 0.38)} />
              <ellipse cx="26" cy="43" rx="24" ry="4" fill={dkh(BRASS, 0.5)} />
            </svg>
            <div style={{ width: 5, height: 12 * (0.4 + rt), background: dkh(INK, 0.1),
              marginLeft: 23 }} />
          </div>
        );
      })}
      {/* the division count, once, in the plate band */}
      <Playbill x={506} y={BAND_Y - 26} s={0.92} z={70} price={E(f, 56, 70, 0, 1, OUT)} f={f} />

      {/* the cord the hero hauls on */}
      <div style={{ position: "absolute", left: 232, top: 412, width: 7,
        height: 150 + pull * 40 - release * 26, zIndex: 50,
        background: `repeating-linear-gradient(180deg, ${dkh(GOLD, 0.3)} 0 9px, ${dkh(GOLD, 0.5)} 9px 17px)` }} />
      <div style={{ position: "absolute", left: 218, top: 552 + pull * 40 - release * 26,
        width: 34, height: 46, borderRadius: "50% 50% 40% 40%", zIndex: 51,
        background: `linear-gradient(160deg, ${GOLD}, ${dkh(GOLD, 0.44)})` }} />

      <Contact x={236} y={GY - 10} w={168} o={0.34} />
      <Hero f={f} x={236} y={GY + release * 16} size={218} z={58} act={3} ph={0.5}
        strain={pull * 0.9 * (1 - release)} drive={-release * 0.8}
        reach={pull} gaze={0.4} cheer={E(f, 40, 54, 0, 1, BACK)} />
      <Steam x={236} y={GY - 198} f={f} at={12} n={7} z={62} s={1.1} />

      {/* the house answers: doors open along the back wall and the cast spills */}
      {doors > 0.1 && Array.from({ length: 5 }).map((_, i) => (
        <Crew key={i} f={f} x={430 + i * 118} y={GY - 4} i={i * 3 + 2} size={104}
          z={40} at={52 + i * 4} loop={i % 4} />
      ))}
      <Motes x={840} y={250} w={280} h={280} n={14} f={f} z={42} c="#FFE9B8" />
    </Scene>
  );
};

/* =========================================================================
   board · REVELATION — the letters strike into a blank board, price last.
   ⛔ The board arrives EMPTY and legible: empty is the promise.
   ====================================================================== */
export const BOARDHOOK: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("door");
  const WORD = "THE AGENCY";
  const AT = (i: number) => 8 + i * 3.4;
  const price = E(f, 54, 68, 0, 1, OUT);
  const lamps = E(f, 46, 60, 0, 1, OUT);

  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.44}>
      <Room p={p} f={f} bands={2} kind="column" overhead="none" rake={0.07}
        rakeRate={2.4} floorKind="slab" grit={0.5} window={null} />
      <Facade x={506} y={GY + 16} s={1.02} z={22} lamp={0.3 + 0.7 * lamps} />
      <StageDoor x={506} y={GY - 4} s={1.06} z={34} open={0} />

      {/* the blank board — a bright cream face with empty letter slots */}
      <div style={{ position: "absolute", left: 506 - 330, top: 246, width: 660, height: 168,
        zIndex: 68, borderRadius: 8, boxShadow: SH_D,
        background: `linear-gradient(168deg, #F6F1E2, #DFD6BC)`,
        border: `8px solid ${dkh(BRASS, 0.32)}`, display: "flex", alignItems: "center",
        justifyContent: "center", gap: 7 }}>
        {WORD.split("").map((ch, i) => {
          const k = E(f, AT(i), AT(i) + 6, 0, 1, IN_Q);
          const bounce = (E(f, AT(i) + 6, AT(i) + 9, 0, 1, OUT) - E(f, AT(i) + 9, AT(i) + 17, 0, 1, IO));
          if (ch === " ") return <div key={i} style={{ width: 16 }} />;
          return (
            <div key={i} style={{ width: 50, height: 74, borderRadius: 4,
              background: k > 0.02 ? INK : hexa("#000000", 0.14),
              display: "flex", alignItems: "center", justifyContent: "center",
              transform: `translateY(${(1 - k) * -220}px) scaleY(${1 - bounce * 0.2}) scaleX(${1 + bounce * 0.16})`,
              ...ui(44, 900), color: "#F6ECD2" }}>
              {k > 0.02 ? ch : ""}
            </div>
          );
        })}
      </div>
      {/* the price panel drops last, and it is the reveal */}
      <div style={{ position: "absolute", left: 506 - 118, top: 430, width: 236, height: 96,
        zIndex: 72, borderRadius: 8, transform: `translateY(${(1 - price) * -70}px) scale(${0.7 + 0.3 * price})`,
        opacity: price, background: `linear-gradient(160deg, ${BONE}, #D6CDB2)`,
        border: `6px solid ${dkh(GREEN, 0.24)}`, boxShadow: SH_D,
        display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
        <span style={{ ...mono(52, 800), color: dkh(GREEN, 0.16) }}>{R.price}</span>
        <span style={{ ...ui(19, 900), color: hexa(INK, 0.6), lineHeight: 1.05 }}>TO<br />OWN</span>
      </div>

      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
        <Fall key={i} x={506 - 300 + i * 66} y={330} w={44} f={f} at={AT(i) + 6} n={4}
          c="#E7D6A8" z={70} s={0.7} />
      ))}

      <Contact x={220} y={GY - 10} w={158} o={0.32} />
      <Hero f={f} x={220} y={GY} size={206} z={58} act={2} ph={1.1}
        gaze={0.5} shock={E(f, 10, 20, 0, 1, OUT) - E(f, 40, 54, 0, 1, IO)}
        cheer={E(f, 56, 70, 0, 1, BACK)} />
      <Motes x={506} y={220} w={520} h={320} n={16} f={f} z={44} c="#F6ECD2" />
    </Scene>
  );
};

/* =========================================================================
   roll · ACCUMULATION — the call sheet unrolls and will not stop.
   ⭐ The mechanism is that it KEEPS COMING: the sheet runs off the bottom of
   frame while the counter climbs, so the promise is "there is more of this
   than fits", which is the line's actual claim.
   ====================================================================== */
export const ROLL: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("wardrobe");
  const drop = E(f, 8, 62, 0, 1, OUT);
  const count = E(f, 12, 70, 0, 1, OUT);
  const ROWS = 26;

  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.56}>
      <Room p={p} f={f} bands={3} kind="rack" overhead="tray" rake={0.09}
        rakeRate={4.0} floorKind="tile" grit={0.55}
        lamp={{ x: 860, y: 280, r: 190 }} window={null} />

      {/* the roller at the top, and the sheet coming off it */}
      <div style={{ position: "absolute", left: 506 - 210, top: 176, width: 420, height: 26,
        zIndex: 62, borderRadius: 13,
        background: `linear-gradient(180deg, #E8DCBA, ${BRASS} 44%, ${dkh(BRASS, 0.55)})` }} />
      <div style={{ position: "absolute", left: 506 - 196, top: 200, width: 392,
        height: 20 + drop * 560, zIndex: 58, overflow: "hidden",
        background: `linear-gradient(180deg, ${BONE}, #E2D9C0)`, boxShadow: SH_D,
        borderLeft: `4px solid ${hexa(INK, 0.16)}`, borderRight: `4px solid ${hexa(INK, 0.16)}` }}>
        {Array.from({ length: ROWS }).map((_, i) => {
          const on = E(drop, i / ROWS - 0.04, i / ROWS + 0.02, 0, 1, LIN);
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8,
              padding: "5px 12px", opacity: on,
              borderBottom: `2px solid ${hexa(INK, 0.09)}` }}>
              <div style={{ width: 16, height: 16, borderRadius: 3,
                background: [CLAY, SKY, GOLD, GREEN, VIOLET, TEAL][i % 6] }} />
              <div style={{ height: 7, flex: 1, background: hexa(INK, 0.26) }} />
              <div style={{ height: 7, width: 44, background: hexa(INK, 0.14) }} />
            </div>
          );
        })}
      </div>

      <div style={{ position: "absolute", left: SAFE3.cx - 176, top: BAND_Y, width: 352,
        height: 90, zIndex: 86, borderRadius: 8,
        background: `linear-gradient(168deg, ${BONE}, #D8CFB6)`,
        border: `5px solid ${dkh(BRASS, 0.34)}`, boxShadow: SH_D,
        display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
        <div style={{ ...mono(52, 800), color: INK }}>{Math.round(R.agents * count)}</div>
        <div style={{ ...ui(19, 900), color: dkh(CLAYD, 0.06), lineHeight: 1.05 }}>
          SPECIALIST<br />AGENTS
        </div>
      </div>

      <Contact x={196} y={GY - 10} w={162} o={0.32} />
      <Hero f={f} x={196} y={GY} size={212} z={60} act={3} ph={0.8}
        gaze={0.55} shock={E(f, 16, 26, 0, 1, OUT) - E(f, 52, 66, 0, 1, IO)} />
      <Edge side="r" c={dkh(p.floor2, 0.4)} w={100} z={92} kind="rail" />
    </Scene>
  );
};

/** the four candidates, keyed. `key` IS S0 itself, so the candidate that gets
    chosen and the scene that ships are the same code and cannot drift apart. */
export const HOOKS: Record<HookId, React.FC<{ v: Variant; dur: number }>> = {
  key: DOOR,
  bell: BELL,
  board: BOARDHOOK,
  roll: ROLL,
};

/** a standalone 100-frame preview of one candidate, at full quality, for the
    pick. ⛔ Labelled in the filename, never burned into the frame. */
export const HookCut = (id: HookId): React.FC => () => {
  const C = HOOKS[id];
  return <C v="house" dur={82} />;
};
