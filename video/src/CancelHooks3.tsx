import React from "react";
import { useCurrentFrame, Img, staticFile } from "remotion";
import { inter } from "./fonts";
import {
  PAID, TOTAL, PAPER, PAPER2, INKD, RED, RED_D, GO, GO_L, AMB, AMB_L, AMB_D,
  STEEL, STEEL_L, STEEL_D, SH, SH_S, mix,
} from "./CancelWorld";
import {
  wrap, sfxFor, sharedTail, Shot, Hall, Pool, Subject, Chip, Cl, PAIRS, CUTS2,
} from "./CancelHooks2";
import { E, rnd, OUT, IO, BACK } from "./MissionWorld";

/* =========================================================================
   REEL 86 "CANCEL" · HOOK SET 3 — SCENE 1 ONLY.

   ⛔ THE NOTE on set 2 (F-J): "still the initial scene options arent
   interesting or creative enough concepts."

   Both previous sets failed at opposite ends of the same axis:

     SET 1  five GENRE WORLDS (toll plaza, subway, billing plant). Interesting,
            but they ranked nothing and the topic arrived late.
     SET 2  five RANKING OBJECTS (bar chart, scale, slab, board, star field).
            They rank perfectly and say the topic instantly — and they are
            DIAGRAMS. A chart has no moment. Nothing is about to happen in it.

   Reel 84 already wrote the answer down and I did not apply it:

     > "Every rejected concept across reels 83 and 84 was a UI or a system
     >  (cards, walls, grids, toll booths, vaults, factories). What works is
     >  A GENRE WORLD WITH A MOMENT OF TENSION. Pitch concepts by naming the
     >  hierarchy mechanism for each, not the theme. Draft night won because
     >  its mechanism is a spotlight."

   So each concept below is a RITUAL everyone recognises, one whose whole
   purpose is to rank something, caught at the instant before the result is
   known. Frame 0 is the held breath; f12 is the release.

     K · THE HIGH STRIKER   carnival    the puck is one ring short of the bell
     L · THE TITLE FIGHT    boxing      five belts, and the challenger is up
     M · THE AUCTION        saleroom    the gavel is at the top of its swing
     N · THE DEMOLITION     night site  the plunger is down, nothing has fallen
     O · THE PAWN SHOP      night desk  five subscriptions on the counter, valued

   Everything else is unchanged and shared: beats 2-4, the palette, the SFX,
   the Subject badge, the slam at f12. Scene 1 is the ONLY variable.
   ========================================================================= */

const MAXS = PAIRS[0].stars;

/* ############################################################ K · HIGH STRIKER
   RITUAL: test your strength. HIERARCHY: a calibrated tower — the whole point
   of a high striker is that it is a ranked scale with a bell on top.
   TENSION: the puck is one notch under the bell and still travelling.
   ######################################################################### */
export const CancelHookK: React.FC = () => {
  const f = useCurrentFrame();
  const C1 = CUTS2[0];
  const ring = E(f, 12, 18, 0, 1, OUT);                    // it connects at f12
  const puck = 596 - (0.86 + ring * 0.14) * 430;           // and finishes the climb
  return wrap(f, AMB, sfxFor({ src: "coin-spin.wav", dur: 1.20, rate: 0.9 }), (<>
    <Shot f={f} a={0} b={C1} k={0} slamAt={12}>
      <Hall f={f} tint="#241A2C" floor="#150E1A" />
      <Pool x={286} w={440} c={AMB_L} o={0.17} floor="#150E1A" />
      {/* the midway behind — bulbs on a string, the world this happens in */}
      {Array.from({ length: 15 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: 24 + i * 68,
          top: 148 + Math.sin(i / 2.1) * 15, width: 15, height: 15, borderRadius: "50%",
          background: i % 3 ? AMB : AMB_L, zIndex: 6 }} />
      ))}
      {/* the tower: a graduated scale with a bell on top */}
      <div style={{ position: "absolute", left: 422, top: 196, width: 168, height: 400,
        background: "#2A2036", boxShadow: SH, zIndex: 14 }} />
      <div style={{ position: "absolute", left: 422, top: 196, width: 22, height: 400,
        background: "#382B48", zIndex: 15 }} />
      {/* ⛔ THE LABELS COLLIDE ON A HONEST SCALE. 44,388 and 43,792 are 596
          apart out of 74,690, so their rungs land ~3px apart and two of the
          five marks vanished under each other. The RUNG stays at its true
          height (the data is the picture); only the LABEL is pushed down to
          the next free slot, which is a legend problem, not a data one. */}
      {(() => {
        let last = -999;
        return PAIRS.map((p, i) => {
          const y = 596 - (p.stars / MAXS) * 400;
          const ly = Math.max(y, last + 40); last = ly;
          return (
            <React.Fragment key={i}>
              <div style={{ position: "absolute", left: 408, top: y, width: 196, height: 8,
                background: mix("#2A2036", AMB, 0.85), zIndex: 16 }} />
              <div style={{ position: "absolute", left: 624, top: ly - 19, zIndex: 18,
                fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 30, color: AMB_L,
                textShadow: "0 3px 0 rgba(4,6,10,0.85)" }}>
                ★ {p.stars.toLocaleString("en-US")}
              </div>
            </React.Fragment>
          );
        });
      })()}
      {/* the puck, still travelling */}
      <div style={{ position: "absolute", left: 416, top: puck, width: 180, height: 36,
        background: GO, boxShadow: SH, zIndex: 24 }} />
      <div style={{ position: "absolute", left: 416, top: puck, width: 180, height: 8,
        background: GO_L, zIndex: 25 }} />
      {/* the bell — it rings at f12 */}
      <div style={{ position: "absolute", left: 448, top: 126, width: 116, height: 84,
        borderRadius: "58px 58px 10px 10px", background: ring > 0.1 ? AMB_L : AMB_D,
        boxShadow: SH, zIndex: 26 }} />
      <div style={{ position: "absolute", left: 496, top: 196, width: 20, height: 24,
        borderRadius: 10, background: ring > 0.1 ? AMB : AMB_D, zIndex: 27 }} />
      {ring > 0.1 && [0, 1, 2].map((k) => (
        <div key={k} style={{ position: "absolute", left: 418 - k * 20, top: 136 - k * 8,
          width: 7, height: 28 + k * 10, background: AMB_L, zIndex: 25,
          transform: `rotate(${-26 - k * 12}deg)`, opacity: 1 - k * 0.28 }} />
      ))}
      {/* the base, and the five who paid to play, in ONE clear row on it */}
      <div style={{ position: "absolute", left: 388, top: 596, width: 236, height: 36,
        background: "#3A2C48", boxShadow: SH, zIndex: 22 }} />
      {PAIRS.map((p, i) => (
        <div key={`m${i}`} style={{ position: "absolute", left: 36 + i * 74, top: 508, zIndex: 30 }}>
          <div style={{ width: 68, height: 68, background: PAPER, boxShadow: SH_S,
            display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Img src={staticFile(p.paid.file)} style={{ width: 44, height: 44,
              objectFit: "contain", filter: "none" }} />
          </div>
          <div style={{ position: "absolute", left: 40, top: -13, padding: "2px 7px",
            background: RED, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 18,
            color: "#FFF8ED", transform: `scale(${E(f, 10 + i * 3, 19 + i * 3, 0, 1, BACK)})`,
            transformOrigin: "0% 100%" }}>/mo</div>
        </div>
      ))}
      {/* the hammer, and whoever just swung it */}
      <div style={{ position: "absolute", left: 806, top: 476, width: 28, height: 140,
        background: "#6B563E", zIndex: 22, transform: "rotate(18deg)" }} />
      <div style={{ position: "absolute", left: 780, top: 454, width: 80, height: 42,
        background: STEEL_D, zIndex: 23, transform: "rotate(18deg)" }} />
      <Subject x={36} y={330} s={0.78} />
      <Cl f={f} x={812} y={444} size={150} gaze={1} cheer={0.85} nodAmp={3} nodSpeed={10} z={30} />
      <Chip text="ONE SWING. ALL FIVE FREE." c={AMB} size={32} />
    </Shot>
    {sharedTail(f)}
  </>));
};

/* ############################################################# L · TITLE FIGHT
   RITUAL: the belt changing hands. HIERARCHY: who is standing and who is on the
   canvas, and who is holding the belts. TENSION: the count is in progress.
   ######################################################################### */
export const CancelHookL: React.FC = () => {
  const f = useCurrentFrame();
  const C1 = CUTS2[0];
  const cnt = Math.min(10, 6 + Math.floor(E(f, 12, 30, 0, 4.4, OUT)));
  return wrap(f, GO, sfxFor({ src: "gear-mech.wav", dur: 1.05, rate: 0.8 }), (<>
    <Shot f={f} a={0} b={C1} k={0} slamAt={12}>
      <Hall f={f} tint="#1C202E" floor="#0C0F16" />
      <Pool x={230} w={560} c={PAPER} o={0.16} floor="#0C0F16" />
      {/* the ring: posts, ropes, canvas */}
      <div style={{ position: "absolute", left: 40, top: 470, width: 932, height: 26,
        background: "#4A5468", zIndex: 12 }} />
      {[0, 1, 2].map((k) => (
        <div key={k} style={{ position: "absolute", left: 40, top: 300 + k * 58, width: 932,
          height: 9, background: k === 1 ? RED : PAPER2, zIndex: 22 }} />
      ))}
      {[40, 964].map((x, k) => (
        <div key={k} style={{ position: "absolute", left: x - 14, top: 268, width: 28, height: 230,
          background: STEEL_D, zIndex: 24 }} />
      ))}
      {/* the five former champions, down on the canvas */}
      {PAIRS.map((p, i) => (
        <div key={i} style={{ position: "absolute", left: 74 + i * 168, top: 504, width: 96,
          height: 96, background: "#8E8A82", boxShadow: SH, zIndex: 20, display: "flex",
          alignItems: "center", justifyContent: "center",
          transform: `rotate(${(rnd(i, 5) - 0.5) * 22}deg)` }}>
          <Img src={staticFile(p.paid.file)} style={{ width: 62, height: 62,
            objectFit: "contain", filter: "none" }} />
        </div>
      ))}
      {/* the challenger, arm up, all five belts over the shoulder */}
      <div style={{ position: "absolute", left: 402, top: 176, width: 214, height: 34,
        background: GO, boxShadow: SH, zIndex: 30, display: "flex", alignItems: "center",
        justifyContent: "center", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 22,
        color: "#EAF7F0", letterSpacing: "0.1em" }}>★ {TOTAL.toLocaleString("en-US")}</div>
      {PAIRS.map((_, i) => (
        <div key={`belt${i}`} style={{ position: "absolute", left: 384 + i * 12, top: 220 + i * 26,
          width: 250 - i * 10, height: 22, background: i % 2 ? AMB : AMB_D, boxShadow: SH_S,
          zIndex: 28 }}>
          <div style={{ position: "absolute", left: (250 - i * 10) / 2 - 17, top: -5, width: 34,
            height: 32, background: AMB_L }} />
        </div>
      ))}
      {/* the referee's count, which is the tension */}
      <div style={{ position: "absolute", left: 748, top: 232, width: 176, height: 176,
        background: "#0A0E14", border: `8px solid ${RED}`, zIndex: 34, display: "flex",
        alignItems: "center", justifyContent: "center", fontFamily: inter.fontFamily,
        fontWeight: 900, fontSize: 108, color: RED }}>{cnt}</div>
      <Cl f={f} x={168} y={318} size={178} gaze={2} cheer={0.95} nodAmp={4} nodSpeed={8} z={32} />
      <Subject x={62} y={172} s={0.86} />
      <Chip text="ALL FIVE BELTS. $0." c={GO} size={32} />
    </Shot>
    {sharedTail(f)}
  </>));
};

/* ################################################################ M · AUCTION
   RITUAL: the hammer falling. HIERARCHY: the lot board — an auction room is a
   ranking machine. TENSION: the gavel is up and the room has gone quiet.
   ######################################################################### */
export const CancelHookM: React.FC = () => {
  const f = useCurrentFrame();
  const C1 = CUTS2[0];
  const drop = E(f, 12, 17, 0, 1, IO);
  return wrap(f, AMB, sfxFor({ src: "gear-stutter.wav", dur: 1.10 }), (<>
    <Shot f={f} a={0} b={C1} k={0} slamAt={12}>
      <Hall f={f} tint="#2A2118" floor="#160F0A" />
      <Pool x={250} w={520} c={AMB_L} o={0.16} floor="#160F0A" />
      {/* the rostrum */}
      <div style={{ position: "absolute", left: 316, top: 452, width: 380, height: 148,
        background: "#4A3524", boxShadow: SH, zIndex: 20 }} />
      <div style={{ position: "absolute", left: 300, top: 436, width: 412, height: 22,
        background: "#5E4530", zIndex: 21 }} />
      {/* the lot board — five lots, ranked, every hammer price zero */}
      <div style={{ position: "absolute", left: 88, top: 120, width: 588, height: 212, zIndex: 18,
        background: "#0D1016", border: `7px solid ${AMB_D}`, boxShadow: SH }} />
      {PAIRS.map((p, i) => (
        <div key={i} style={{ position: "absolute", left: 106, top: 134 + i * 40, width: 552,
          height: 36, zIndex: 20, display: "flex", alignItems: "center", gap: 12,
          padding: "0 12px", fontFamily: inter.fontFamily, background: "#141922" }}>
          <span style={{ fontWeight: 900, fontSize: 19, color: AMB_L, width: 62 }}>LOT {i + 1}</span>
          <Img src={staticFile(p.paid.file)} style={{ width: 28, height: 28, objectFit: "contain",
            filter: "none" }} />
          <span style={{ flex: 1, fontWeight: 900, fontSize: 19, color: PAPER2 }}>{p.paid.short}</span>
          <span style={{ fontWeight: 900, fontSize: 19, color: AMB_L }}>
            ★ {p.stars.toLocaleString("en-US")}
          </span>
          <span style={{ fontWeight: 900, fontSize: 22, color: GO_L, width: 52,
            textAlign: "right", opacity: E(f, 13 + i * 3, 20 + i * 3, 0, 1, OUT) }}>$0</span>
        </div>
      ))}
      {/* the gavel, at the top of its swing */}
      <div style={{ position: "absolute", left: 742, top: 300 + drop * 128, width: 28, height: 132,
        background: "#6B563E", zIndex: 30, transform: "rotate(20deg)" }} />
      <div style={{ position: "absolute", left: 706, top: 276 + drop * 128, width: 116, height: 54,
        background: "#4A3524", boxShadow: SH, zIndex: 31, transform: "rotate(20deg)" }} />
      <div style={{ position: "absolute", left: 716, top: 436, width: 108, height: 22,
        background: "#5E4530", zIndex: 24 }} />
      {/* no Subject badge here: the lot board already carries GitHub-grade
          star counts AND the $0 hammer prices, so a second one is clutter */}
      {/* the auctioneer AT the rostrum: head above it, body hidden behind it,
          and clear of the lot board, which the first cut had it standing on */}
      <Cl f={f} x={430} y={338} size={152} gaze={1} stern={0.5} nodAmp={2.6} nodSpeed={12} z={19} />
      <Chip text="SOLD. FOR NOTHING." c={AMB} size={34} />
    </Shot>
    {sharedTail(f)}
  </>));
};

/* ############################################################# N · DEMOLITION
   RITUAL: the countdown and the plunger. HIERARCHY: five towers of different
   heights coming down and one that does not. TENSION: the charges are lit.
   ######################################################################### */
export const CancelHookN: React.FC = () => {
  const f = useCurrentFrame();
  const C1 = CUTS2[0];
  const blow = E(f, 12, 22, 0, 1, IO);
  return wrap(f, RED, sfxFor({ src: "hit-boom.wav", dur: 2.10, rate: 0.62 }), (<>
    <Shot f={f} a={0} b={C1} k={0} slamAt={12}>
      <Hall f={f} tint="#26191A" floor="#130C0C" />
      <Pool x={60} w={700} c={AMB_L} o={0.12} floor="#130C0C" />
      {/* the five paid towers, mid-collapse from f12 */}
      {PAIRS.map((p, i) => {
        const h = 210 + i * 26, sink = blow * (h * 0.55);
        return (
          <React.Fragment key={i}>
            <div style={{ position: "absolute", left: 56 + i * 128, top: 596 - h + sink,
              width: 104, height: h - sink, background: "#4A3A3C", boxShadow: SH, zIndex: 18,
              transform: `rotate(${blow * (i % 2 ? 13 : -13)}deg)`, transformOrigin: "50% 100%" }} />
            <div style={{ position: "absolute", left: 68 + i * 128, top: 620 - h + sink,
              width: 80, height: 80, background: PAPER, boxShadow: SH_S, zIndex: 20,
              display: "flex", alignItems: "center", justifyContent: "center",
              transform: `rotate(${blow * (i % 2 ? 13 : -13)}deg)` }}>
              <Img src={staticFile(p.paid.file)} style={{ width: 52, height: 52,
                objectFit: "contain", filter: "none" }} />
            </div>
            {blow > 0.05 && (
              <div style={{ position: "absolute", left: 30 + i * 128, top: 540, width: 156,
                height: 66, background: mix("#130C0C", "#6A5A56", blow), zIndex: 24,
                opacity: blow }} />
            )}
          </React.Fragment>
        );
      })}
      {/* the one that stays up */}
      <div style={{ position: "absolute", left: 748, top: 128, width: 190, height: 468,
        background: "#1F5142", boxShadow: SH, zIndex: 22 }} />
      <Img src={staticFile("logos/github.svg")} style={{ position: "absolute", left: 795, top: 176,
        width: 96, height: 96, objectFit: "contain", filter: "invert(1)", zIndex: 24 }} />
      <div style={{ position: "absolute", left: 748, top: 300, width: 190, textAlign: "center",
        zIndex: 24, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 33, color: AMB_L,
        letterSpacing: "-0.03em" }}>{TOTAL.toLocaleString("en-US")}</div>
      <div style={{ position: "absolute", left: 748, top: 344, width: 190, textAlign: "center",
        zIndex: 24, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 21, color: GO_L,
        letterSpacing: "0.2em" }}>★ FREE</div>
      {/* the plunger — down already, which is why it is happening */}
      <div style={{ position: "absolute", left: 292, top: 606, width: 148, height: 74,
        background: "#5A2A22", boxShadow: SH, zIndex: 30 }} />
      <div style={{ position: "absolute", left: 350, top: 566 + blow * 34, width: 32, height: 48,
        background: RED, zIndex: 31 }} />
      <div style={{ position: "absolute", left: 314, top: 556 + blow * 34, width: 104, height: 18,
        background: RED_D, zIndex: 31 }} />
      <Cl f={f} x={176} y={560} size={158} gaze={1} shock={0.7} nodAmp={2.4} nodSpeed={14} z={32} />
      <Chip text="FIVE DOWN. ONE FREE." c={RED} size={34} />
    </Shot>
    {sharedTail(f)}
  </>));
};

/* ############################################################## O · PAWN SHOP
   RITUAL: sliding something across a counter and being told what it is worth.
   HIERARCHY: the counter (what you brought) against the wall behind the broker
   (what it is actually worth). TENSION: the valuation slip is being written.
   ######################################################################### */
export const CancelHookO: React.FC = () => {
  const f = useCurrentFrame();
  const C1 = CUTS2[0];
  const stamp = E(f, 12, 19, 0, 1, BACK);
  return wrap(f, GO, sfxFor({ src: "coin-drop.wav", dur: 0.70, rate: 1.15 }), (<>
    <Shot f={f} a={0} b={C1} k={0} slamAt={12}>
      <Hall f={f} tint="#20232E" floor="#0E1016" />
      <Pool x={120} w={780} c={AMB_L} o={0.15} floor="#0E1016" />
      {/* the wall behind the broker — the same five, hanging, tagged FREE */}
      <div style={{ position: "absolute", left: 56, top: 138, width: 900, height: 268, zIndex: 12,
        background: "#171B24", boxShadow: SH }} />
      {PAIRS.map((p, i) => (
        <div key={i} style={{ position: "absolute", left: 88 + i * 176, top: 176, zIndex: 18 }}>
          <div style={{ width: 118, height: 118, background: PAPER, boxShadow: SH_S,
            display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Img src={staticFile(p.paid.file)} style={{ width: 74, height: 74,
              objectFit: "contain", filter: "none" }} />
          </div>
          <div style={{ width: 118, marginTop: 7, textAlign: "center", background: GO,
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 21, color: "#EAF7F0",
            padding: "3px 0" }}>FREE</div>
          <div style={{ width: 118, marginTop: 4, textAlign: "center", fontFamily: inter.fontFamily,
            fontWeight: 900, fontSize: 17, color: AMB_L }}>
            ★ {p.stars.toLocaleString("en-US")}
          </div>
        </div>
      ))}
      {/* the counter, and the five cards you slid across it */}
      <div style={{ position: "absolute", left: 0, top: 500, width: 1012, height: 96,
        background: "#4A3524", boxShadow: SH, zIndex: 24 }} />
      <div style={{ position: "absolute", left: 0, top: 500, width: 1012, height: 14,
        background: "#63492C", zIndex: 25 }} />
      {PAIRS.map((p, i) => (
        <div key={`c${i}`} style={{ position: "absolute", left: 96 + i * 128, top: 524, width: 108,
          height: 66, background: "#2A3543", boxShadow: SH_S, zIndex: 26,
          transform: `rotate(${(rnd(i, 9) - 0.5) * 12}deg)`, display: "flex", alignItems: "center",
          justifyContent: "center", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 17,
          color: PAPER2 }}>{p.paid.short}</div>
      ))}
      {/* the verdict slip, stamped */}
      <div style={{ position: "absolute", left: 690, top: 430, width: 268, height: 128,
        background: PAPER, boxShadow: SH, zIndex: 34, transform: `rotate(-6deg) scale(${0.9 + stamp * 0.1})` }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 16, textAlign: "center",
          fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 20, color: INKD,
          letterSpacing: "0.14em" }}>VALUATION</div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 48, textAlign: "center",
          fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 60, color: RED,
          transform: `scale(${stamp})` }}>$0</div>
      </div>
      {/* the wall already states GitHub + ★ + FREE five times over */}
      <Cl f={f} x={62} y={392} size={152} gaze={1} stern={0.55} nodAmp={2.4} nodSpeed={12} z={30} />
      <Chip text="YOU ALREADY OWN THEM" c={GO} size={32} />
    </Shot>
    {sharedTail(f)}
  </>));
};
