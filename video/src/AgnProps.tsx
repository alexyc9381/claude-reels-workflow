import React from "react";
import { Img, staticFile } from "remotion";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D,
  mono, ui, vivid, lerpHex, Crew, Puff, Ring, Contact,
  CLAY, CLAYD, GOLD, GREEN, RED, SKY, PAPER, CREAMB, INK, MUTE, TEAL, STEEL,
  BRASS, SODIUM, VIOLET, EMBER, OXIDE, SLATE, COPPER, BONE, INDIGO, PLUM, OXBLOOD,
  R, SAFE3, DIVS, GY,
} from "./AgnWorld";

/* ===========================================================================
   REEL 135 · "AGENCY" — THE PROPS.  Board: storyboards/135-agency.md.

   ⛔⛔ EVERY OBJECT IN HERE IS DRAWN, NOT STACKED. Manufactured faces (a door,
   a call board, a lamp housing, a split-flap) are stacked divs because that is
   what they physically are; anything organic or tapered (the key's bow and
   bit, the curtain, the lever's throw) is ONE inline <svg> with real paths.
   Both kinds are checked against the SILHOUETTE TEST: flat black on white,
   nameable from the outline alone.

   ⛔⛔ VALUE SEPARATION, NOT HUE. Every object that HOLDS, CARRIES or RECEIVES
   something differs from its room in BOTH hue AND value, and reads while it is
   still EMPTY — empty is the promise (docs/ANIMATION-QUALITY §11).

   ⛔⛔ CATEGORY IS STRUCTURE, NOT HUE. Before an object was painted, the four or
   five features a viewer actually uses to name that category were listed and
   drawn. A key is not a grey rectangle with a notch: it is a BOW, a COLLAR, a
   SHANK and a BIT with two wards, and the fob hangs off the bow on a ring.
   ========================================================================= */

/* ---- a real mark on a white tile ---------------------------------------- */
export const RealMark: React.FC<{ src: string; s?: number; z?: number; x?: number; y?: number;
  bg?: string; inv?: boolean }> =
  ({ src, s = 64, z = 80, x, y, bg = "#FFFFFF", inv = false }) => (
  <div style={{ position: x === undefined ? "relative" : "absolute", left: x, top: y,
    width: s * 1.32, height: s * 1.32, borderRadius: s * 0.26, zIndex: z, background: bg,
    border: `${Math.max(2, s * 0.05)}px solid #E8DCC0`, display: "flex", alignItems: "center",
    justifyContent: "center", boxShadow: SH, flexShrink: 0 }}>
    <Img src={staticFile("logos/" + src)}
      style={{ width: s, height: s, objectFit: "contain", filter: inv ? "invert(1)" : undefined }} />
  </div>
);

/* =========================================================================
   S0 · THE STAGE DOOR
   ====================================================================== */

/** The stone facade the door sits in. Pale, cold and LIT — it is what carries
    frame 0's mean luma so the key and the door can stay near-black and hold the
    reel's biggest value spread. Rusticated courses, a moulded architrave, a
    canopy on two brackets. */
export const Facade: React.FC<{ x: number; y: number; s?: number; z?: number; lamp?: number }> =
  ({ x, y, s = 1, z = 22, lamp = 1 }) => {
  const WD = 640 * s, HT = 560 * s;
  return (
    <div style={{ position: "absolute", left: x - WD / 2, top: y - HT, width: WD, height: HT, zIndex: z }}>
      {/* rusticated stone courses — each one a slightly different value so the
          wall has grain instead of being a flat fill */}
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} style={{ position: "absolute", left: 0, top: (HT / 9) * i, width: WD,
          height: HT / 9 - 2 * s,
          background: lerpHex("#D9D6CC", "#AEB0AC", (rnd(i * 7 + 3, 1) * 0.5 + (i / 9) * 0.5)),
          borderBottom: `${2 * s}px solid ${hexa("#6E7276", 0.5)}` }} />
      ))}
      {/* the door reveal — a deep cut, not a painted rectangle */}
      <div style={{ position: "absolute", left: WD / 2 - 158 * s, top: HT - 452 * s,
        width: 316 * s, height: 452 * s, background: "#0C0F14",
        boxShadow: `inset ${10 * s}px 0 ${18 * s}px ${hexa("#000000", 0.6)}` }} />
      {/* moulded architrave around the reveal */}
      <div style={{ position: "absolute", left: WD / 2 - 178 * s, top: HT - 474 * s,
        width: 356 * s, height: 24 * s, background: "#EDE9DE",
        borderBottom: `${4 * s}px solid ${hexa("#8A8C88", 0.7)}` }} />
      {[-1, 1].map((k) => (
        <div key={k} style={{ position: "absolute", left: WD / 2 + k * 166 * s - 11 * s,
          top: HT - 474 * s, width: 22 * s, height: 474 * s, background: "#E2DED2",
          borderRight: `${3 * s}px solid ${hexa("#8A8C88", 0.55)}` }} />
      ))}
      {/* the canopy and its two iron brackets */}
      <div style={{ position: "absolute", left: WD / 2 - 236 * s, top: HT - 512 * s,
        width: 472 * s, height: 26 * s, background: "#2A2E36", borderRadius: 4 * s }} />
      {[-1, 1].map((k) => (
        <svg key={k} width={70 * s} height={72 * s} viewBox="0 0 70 72"
          style={{ position: "absolute", left: WD / 2 + k * 200 * s - 35 * s, top: HT - 486 * s }}>
          <path d={k < 0 ? "M62 2 L62 12 L18 66 L8 66 Z" : "M8 2 L8 12 L52 66 L62 66 Z"}
            fill="#2A2E36" />
        </svg>
      ))}
      {/* the canopy lamp — a practical, so the light in frame is motivated */}
      <div style={{ position: "absolute", left: WD / 2 - 26 * s, top: HT - 500 * s,
        width: 52 * s, height: 30 * s, background: "#3A3E46",
        borderRadius: `${26 * s}px ${26 * s}px 0 0` }} />
      <div style={{ position: "absolute", left: WD / 2 - 17 * s, top: HT - 476 * s,
        width: 34 * s, height: 16 * s, borderRadius: 8 * s,
        background: lerpHex("#5A5E66", "#FFF3D8", lamp), opacity: 0.35 + 0.65 * lamp }} />
    </div>
  );
};

/** ⭐ THE DOOR ITSELF. Near-black, six panels, a heavy lock plate at the strike
    line and a kick plate at the foot. `open` swings it inward and lets a wedge
    of warm light out past its edge — the hand-off out of the hook. */
export const StageDoor: React.FC<{ x: number; y: number; s?: number; z?: number;
  open?: number; shake?: number }> =
  ({ x, y, s = 1, z = 34, open = 0, shake = 0 }) => {
  const WD = 300 * s, HT = 436 * s;
  return (
    <>
      {/* the light behind it, painted FIRST so the door can occlude it */}
      {open > 0.01 && (
        <div style={{ position: "absolute", left: x - WD / 2, top: y - HT, width: WD, height: HT,
          zIndex: z - 1, background: `linear-gradient(264deg, ${hexa("#FFDFA4", 0.94)} 0%, ${hexa("#E7A94C", 0.5)} 48%, transparent 84%)` }} />
      )}
      <div style={{ position: "absolute", left: x - WD / 2, top: y - HT, width: WD, height: HT,
        zIndex: z, transformOrigin: "0% 50%",
        transform: `perspective(1400px) rotateY(${open * 46}deg) translateX(${shake}px)`,
        background: "linear-gradient(100deg, #14161C 0%, #1E222A 52%, #0E1014 100%)",
        borderRight: `${3 * s}px solid ${hexa("#3A4048", 0.8)}` }}>
        {/* six sunk panels, each with a bevel so the door has relief */}
        {[0, 1, 2].map((r) => [0, 1].map((c) => (
          <div key={`${r}${c}`} style={{ position: "absolute", left: 26 * s + c * 134 * s,
            top: 30 * s + r * 134 * s, width: 114 * s, height: 112 * s, background: "#0A0C10",
            borderTop: `${3 * s}px solid ${hexa("#000000", 0.7)}`,
            borderLeft: `${3 * s}px solid ${hexa("#000000", 0.6)}`,
            borderBottom: `${3 * s}px solid ${hexa("#454C56", 0.55)}`,
            borderRight: `${3 * s}px solid ${hexa("#454C56", 0.45)}` }} />
        )))}
        {/* ⛔ NO SECOND LOCK. `Escutcheon` is this door's lock and it is mounted
            by the scene; drawing a small one here too would be two locks on one
            door, which is the same defect as five identical tiles in reel 115. */}
        {/* the kick plate at the foot */}
        <div style={{ position: "absolute", left: 12 * s, bottom: 10 * s, width: WD - 24 * s,
          height: 34 * s, background: dkh(BRASS, 0.52), opacity: 0.7 }} />
      </div>
    </>
  );
};

/** ⭐⭐⭐ THE HERO OF THE HOOK. A colossal brass key, drawn as a key actually is:
    a BOW (the ring you hold), a COLLAR, a SHANK and a BIT with two wards cut
    into it. The fob hangs off the bow on its own ring and carries the receipt.

    ⛔ `turn` is the beat that makes the hook land — THE REVEAL IS THE ROTATION,
    NOT THE TRAVEL. The fob starts edge-on and unreadable and swings flat into
    the frame as the key falls, so the viewer decodes it at the same instant it
    arrives (docs/ANIMATION-QUALITY §12).
    ⛔ Kept to 66% of panel width with air on both sides: past ~85% a silhouette
    cannot form and the thing stops reading as itself (THE-OPEN, reel 110). */
export const BigKey: React.FC<{ x: number; y: number; s?: number; z?: number;
  turn?: number; tilt?: number; fob?: number }> =
  ({ x, y, s = 1, z = 56, turn = 0, tilt = 0, fob = 1 }) => {
  /* anchored at the BOW CENTRE (x, y); the bit points RIGHT, at x + 524s */
  return (
    <div style={{ position: "absolute", left: x - 96 * s, top: y - 100 * s,
      width: 640 * s, height: 230 * s, zIndex: z,
      transformOrigin: `${96 * s}px ${100 * s}px`, transform: `rotate(${tilt}deg)` }}>
      <svg width={640 * s} height={230 * s} viewBox="0 0 640 230"
        style={{ position: "absolute", left: 0, top: -15 * s, overflow: "visible" }}>
        {/* the BOW — a heavy ring with four pierced lobes. This is the feature
            that makes a key silhouette read as a key and not as a spanner. */}
        <circle cx="96" cy="115" r="90" fill="#1A1B20" />
        <circle cx="96" cy="113" r="84" fill="#8A6A2E" />
        <circle cx="80" cy="88" r="42" fill="#E6CE96" opacity="0.42" />
        <circle cx="96" cy="115" r="45" fill="#1A1813" />
        <circle cx="96" cy="112" r="41" fill="#3A2F1C" />
        {[0, 90, 180, 270].map((a2) => (
          <ellipse key={a2} cx={96 + Math.cos((a2 * Math.PI) / 180) * 63}
            cy={112 + Math.sin((a2 * Math.PI) / 180) * 63} rx="13" ry="13" fill="#8A6A2E" />
        ))}
        {/* the COLLAR — brass, and the last brass on the way out to the bit */}
        <rect x="176" y="76" width="40" height="78" rx="9" fill="#D8B573" />
        <rect x="176" y="76" width="40" height="20" rx="9" fill="#EBD4A2" />
        {/* ⭐⭐ THE SHANK AND BIT ARE NEAR-BLACK IRON, NOT BRASS.
            `feedback_eyecatch_is_value_structure`: OX and BOSS both run a pale
            COOL ground with a NEAR-BLACK MASS THAT ARRIVES, and the mass that
            arrives here is this key. A brass key on pale stone is warm mid-tone
            on warm mid-tone — monochrome mush at thumbnail size. Dark iron
            against lit stone is the biggest value gap in the frame, and the bow
            keeps enough brass to say "key" rather than "bar".
            ⛔ AND THE SHANK IS 68 UNITS DEEP, NOT 40: a 37px bar is 9px after
            the audit's 1012->240 downsample and reads as a scratch. */}
        <path d="M212 78 L488 84 L488 148 L212 152 Z" fill="#22242C" />
        <path d="M212 78 L488 84 L488 100 L212 96 Z" fill="#565B68" />
        <path d="M212 142 L488 138 L488 148 L212 152 Z" fill="#0C0D12" />
        {/* the BIT — two wards cut into it, the feature that says "key" */}
        <path d="M462 148 L568 148 L568 224 L524 224 L524 190 L500 190 L500 218 L462 218 Z"
          fill="#22242C" />
        <path d="M462 148 L568 148 L568 164 L462 164 Z" fill="#565B68" />
        <path d="M462 206 L500 206 L500 218 L462 218 Z" fill="#0C0D12" />
        {/* the tip chamfer — the part that enters the ward first */}
        <path d="M568 148 L594 170 L594 202 L568 224 Z" fill="#14161C" />
      </svg>

      {/* ⭐ THE FOB — hangs off the bow on its own ring and ROTATES INTO
          READABILITY. At turn=0 it is edge-on (scaleX 0.06) and says nothing;
          at turn=1 it is flat and carries the name and the licence. THE REVEAL
          IS THE ROTATION, NOT THE TRAVEL (docs/ANIMATION-QUALITY §12). */}
      <div style={{ position: "absolute", left: 78 * s, top: -28 * s, width: 34 * s,
        height: 34 * s, borderRadius: "50%", border: `${7 * s}px solid ${dkh(BRASS, 0.5)}`,
        zIndex: 2 }} />
      <div style={{ position: "absolute", left: 4 * s, top: -146 * s, width: 200 * s,
        height: 104 * s, zIndex: 3, opacity: fob,
        transformOrigin: "46% 100%",
        transform: `rotate(${-7 + turn * 7}deg) scaleX(${0.06 + 0.94 * turn})`,
        background: `linear-gradient(158deg, ${BONE}, #D8CFB6)`,
        borderRadius: 9 * s, border: `${4 * s}px solid ${dkh(BRASS, 0.42)}`,
        boxShadow: SH, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 5 * s }}>
        <div style={{ ...ui(25 * s, 900), color: INK, letterSpacing: 1.2 * s }}>{R.name}</div>
        <div style={{ ...mono(16 * s, 700), color: dkh(CLAYD, 0.1) }}>{R.lic} · FREE</div>
      </div>
    </div>
  );
};

/** ⭐ THE ESCUTCHEON — a colossal brass keyhole plate dead centre of the door.
    It is the SOCKET the key is promised to, and it is drawn EMPTY and legible
    from frame 0, because empty is the promise. A viewer who sees a giant
    keyhole and a giant key above it knows what is about to happen with no
    narration, which is the whole job of the open. */
export const Escutcheon: React.FC<{ x: number; y: number; s?: number; z?: number;
  seat?: number }> = ({ x, y, s = 1, z = 44, seat = 0 }) => {
  const WD = 176 * s, HT = 244 * s;
  return (
    <div style={{ position: "absolute", left: x - WD / 2, top: y - HT / 2, width: WD, height: HT,
      zIndex: z, transform: `scale(${1 + seat * 0.05})` }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 12 * s,
        background: `linear-gradient(152deg, ${mxh(BRASS, 0.26)}, ${dkh(BRASS, 0.5)})`,
        border: `${6 * s}px solid ${dkh(BRASS, 0.66)}`, boxShadow: SH_D }} />
      {/* four countersunk screws, which is what tells you it is BOLTED ON */}
      {[[26, 30], [WD - 42, 30], [26, HT - 46], [WD - 42, HT - 46]].map(([sx, sy], i) => (
        <div key={i} style={{ position: "absolute", left: sx * (s / s), top: sy,
          width: 16 * s, height: 16 * s, borderRadius: "50%", background: dkh(BRASS, 0.62),
          borderTop: `${2 * s}px solid ${hexa("#FFFFFF", 0.3)}` }}>
          <div style={{ position: "absolute", left: 2 * s, top: 6 * s, width: 12 * s,
            height: 3 * s, background: dkh(BRASS, 0.8) }} />
        </div>
      ))}
      {/* the keyhole itself — a round ward over a tapered slot */}
      <div style={{ position: "absolute", left: WD / 2 - 30 * s, top: 62 * s, width: 60 * s,
        height: 60 * s, borderRadius: "50%", background: "#08090C",
        boxShadow: `inset 0 ${4 * s}px ${8 * s}px ${hexa("#000000", 0.9)}` }} />
      <svg width={64 * s} height={110 * s} viewBox="0 0 64 110"
        style={{ position: "absolute", left: WD / 2 - 32 * s, top: 108 * s }}>
        <path d="M22 0 L42 0 L54 100 L10 100 Z" fill="#08090C" />
      </svg>
      {/* the seat flare — a contained brass flash on the drive, never a screen
          flash (docs/ANIMATION-QUALITY §16) */}
      {seat > 0.02 && (
        <div style={{ position: "absolute", inset: -10 * s, borderRadius: 16 * s,
          background: `radial-gradient(circle at 50% 42%, ${hexa("#FFE9B0", 0.34 * seat)} 0%, transparent 66%)` }} />
      )}
    </div>
  );
};

/** The lit playbill over the canopy. ⭐ IT CARRIES THE FRAME-0 GATES so the key
    does not have to — `HOOK_LUMA >= 140` and the claim plate both ride this
    board, which is what lets the key stay dark, 66% of panel width and legible
    (THE-OPEN: a gate carried by the wrong object deforms that object). */
export const Playbill: React.FC<{ x: number; y: number; s?: number; z?: number;
  price?: number; f?: number }> =
  ({ x, y, s = 1, z = 70, price = 0, f = 0 }) => {
  /* ⭐⭐ ONE OBJECT, TWO GATE RESULTS. At 800x96 this board was 8.4% of the panel
     and frame 0 measured 138.1 luma against a 140 bar, with HOOK_PLATE warning
     at 6.9%. Reel 109 hit exactly this and the fix is the same: three small
     bright objects are never the largest one, so make the ONE object carry the
     name, the counts and the price together. At 900x172 it is 19.3% of the
     panel and it lifts the mean at the same time. ⛔ The answer is never to
     brighten the shading (docs/ANIMATION-QUALITY §8). */
  const WD = 900 * s, HT = 172 * s;
  return (
    <div style={{ position: "absolute", left: x - WD / 2, top: y, width: WD, height: HT, zIndex: z,
      background: `linear-gradient(168deg, #FBF6E8 0%, ${CREAMB} 62%, #E4DCC4 100%)`,
      border: `${7 * s}px solid ${dkh(BRASS, 0.3)}`, borderRadius: 8 * s, boxShadow: SH_D,
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", gap: 9 * s }}>
      {/* the bulb run along the top — a theatre board has bulbs, and they are
          also the only thing on this prop that moves before the price lands */}
      <div style={{ position: "absolute", left: 0, top: -13 * s, width: WD, height: 15 * s,
        display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
        {Array.from({ length: 17 }).map((_, i) => (
          <div key={i} style={{ width: 13 * s, height: 13 * s, borderRadius: "50%",
            background: lerpHex("#8A7A52", "#FFF6DA", 0.55 + 0.45 * Math.sin(f / 7 + i * 1.1)) }} />
        ))}
      </div>
      <div style={{ ...ui(52 * s, 900), color: INK, letterSpacing: 2.4 * s, lineHeight: 1 }}>
        {R.name}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 11 * s }}>
        <div style={{ ...mono(21 * s, 700), color: dkh(OXIDE, 0.05), background: hexa("#FFFFFF", 0.7),
          padding: `${4 * s}px ${10 * s}px`, borderRadius: 4 * s }}>{R.agents} SPECIALISTS</div>
        <div style={{ ...mono(21 * s, 700), color: dkh(INDIGO, 0.05), background: hexa("#FFFFFF", 0.7),
          padding: `${4 * s}px ${10 * s}px`, borderRadius: 4 * s }}>{R.divisions} DIVISIONS</div>
        {/* the price panel — empty for the first 52 frames, which is the second
            withheld resolution in the hook */}
        <SplitPrice s={s * 0.82} on={price} />
      </div>
    </div>
  );
};

/** A three-cell split-flap that lands on `$0`. Cells flip on their own clock
    and are pushed back far enough to be SETTLED at their start, never caught
    mid-roll (THE-OPEN: a pre-seeded counter has to have finished, not started). */
export const SplitPrice: React.FC<{ s?: number; on?: number }> = ({ s = 1, on = 0 }) => {
  const chars = ["$", "0", ""];
  return (
    <div style={{ display: "flex", gap: 5 * s, marginTop: 2 * s }}>
      {chars.slice(0, 2).map((c, i) => {
        const k = E(on, i * 0.16, i * 0.16 + 0.5, 0, 1, OUT);
        const mid = k < 0.5;
        const showing = k < 0.16 ? "" : c;
        return (
          <div key={i} style={{ width: 52 * s, height: 62 * s,
            background: k < 0.16 ? "#3A3C42" : "#15171C",
            borderRadius: 5 * s, border: `${2 * s}px solid ${hexa("#000", 0.5)}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            transformOrigin: "50% 50%", transform: `rotateX(${mid ? (1 - k * 2) * 76 : 0}deg)`,
            ...mono(40 * s, 800), color: "#F6E9C6" }}>{showing}</div>
        );
      })}
      <div style={{ ...ui(17 * s, 800), alignSelf: "flex-end", paddingBottom: 8 * s,
        color: dkh(GREEN, 0.05), opacity: E(on, 0.55, 0.9, 0, 1, OUT) }}>TO OWN</div>
    </div>
  );
};

/* =========================================================================
   S1 · THE CALL BOARD
   ====================================================================== */

/** The oak call board just inside the door. Carries the REAL GitHub mark at
    size, the real owner/name strip, the licence and a counter the arriving
    stars drive. ⛔ Not a UI screenshot — a physical board, framed, with a rail
    and pinned cards (Alex, standing: *"object scenes not UI"*). */
export const CallBoard: React.FC<{ x: number; y: number; s?: number; z?: number;
  count?: number; lic?: number; f?: number }> =
  ({ x, y, s = 1, z = 46, count = 0, lic = 0, f = 0 }) => {
  const WD = 620 * s, HT = 468 * s;
  const shown = Math.round(R.stars * count);
  return (
    <div style={{ position: "absolute", left: x - WD / 2, top: y - HT, width: WD, height: HT, zIndex: z }}>
      {/* the frame — quartered oak with a moulded lip and two brass rails */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 8 * s, boxShadow: SH_D,
        background: `linear-gradient(150deg, ${dkh(OXIDE, 0.18)}, ${dkh(OXIDE, 0.55)})`,
        border: `${12 * s}px solid ${dkh(OXIDE, 0.44)}` }} />
      <div style={{ position: "absolute", left: 12 * s, top: 12 * s, right: 12 * s, bottom: 12 * s,
        background: `linear-gradient(168deg, #33220F, #1C1208)` }} />
      {/* the felt, with its ticking */}
      {Array.from({ length: 7 }).map((_, i) => (
        <div key={i} style={{ position: "absolute", left: 14 * s, top: 16 * s + i * 54 * s,
          width: WD - 28 * s, height: 2 * s, background: hexa("#000000", 0.25) }} />
      ))}
      {/* the repo card, pinned */}
      <div style={{ position: "absolute", left: 30 * s, top: 30 * s, display: "flex",
        alignItems: "center", gap: 14 * s }}>
        <RealMark src="github.svg" s={68 * s} z={4} />
        <div>
          <div style={{ ...mono(21 * s, 700), color: "#EFE4C8" }}>{R.repo}</div>
          <div style={{ ...ui(15 * s, 800), color: hexa("#EFE4C8", 0.62), letterSpacing: 1 * s }}>
            OPEN SOURCE
          </div>
        </div>
      </div>
      {/* ⭐ THE COUNTER. A number MOVES to its value; it is never typeset at it.
          The digits ride a lit brass strip so the count is the brightest thing
          on the board, which is what the arriving stars are driving. */}
      <div style={{ position: "absolute", left: 30 * s, top: 146 * s, width: WD - 60 * s,
        height: 118 * s, borderRadius: 6 * s, display: "flex", alignItems: "center",
        justifyContent: "center", gap: 10 * s,
        background: `linear-gradient(170deg, ${BONE}, #D6CDB2)`,
        border: `${4 * s}px solid ${dkh(BRASS, 0.34)}`, boxShadow: SH }}>
        <svg width={44 * s} height={44 * s} viewBox="0 0 24 24">
          <path d="M12 2.6l2.9 5.9 6.5.95-4.7 4.6 1.1 6.5L12 17.5 6.2 20.5l1.1-6.5L2.6 9.45l6.5-.95z"
            fill={GOLD} stroke={dkh(GOLD, 0.4)} strokeWidth="1" />
        </svg>
        <div style={{ ...mono(58 * s, 800), color: INK, letterSpacing: -1 * s }}>
          {shown.toLocaleString("en-US")}
        </div>
      </div>
      {/* ⭐⭐ THE BOARD'S OWN CONTENT ARRIVES. §12's calculator: the right lever
          at 6.5% of the panel bought +0.4, and the identical change took another
          scene 7.16 -> 12.50 because its content was 31%. This board IS 31% of
          the panel and nothing inside it was changing — the counter digits are
          a rounding error by area. Ten seated star tokens at 104x62 each, each
          one landing as its disc is consumed, repaint the biggest object in the
          frame across the FULL duration. */}
      {Array.from({ length: 10 }).map((_, i) => {
        const on = E(count, i / 10 - 0.03, i / 10 + 0.05, 0, 1, OUT);
        const cx = 26 * s + (i % 5) * 116 * s;
        const cy = 280 * s + Math.floor(i / 5) * 84 * s;
        return (
          <div key={"seat" + i} style={{ position: "absolute", left: cx, top: cy,
            width: 110 * s, height: 74 * s, borderRadius: 5 * s, zIndex: 3,
            background: on > 0.03
              ? `linear-gradient(158deg, ${GOLD}, ${dkh(GOLD, 0.44)})`
              : hexa("#000000", 0.34),
            border: `${3 * s}px solid ${on > 0.03 ? dkh(GOLD, 0.6) : hexa("#000000", 0.5)}`,
            transform: `translateY(${(1 - on) * -46}px) scale(${0.62 + 0.38 * on})`,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 4 * s }}>
            <svg width={26 * s} height={26 * s} viewBox="0 0 24 24" style={{ opacity: on }}>
              <path d="M12 2.6l2.9 5.9 6.5.95-4.7 4.6 1.1 6.5L12 17.5 6.2 20.5l1.1-6.5L2.6 9.45l6.5-.95z"
                fill="#3A2B0C" />
            </svg>
            <div style={{ ...mono(15 * s, 800), color: "#3A2B0C", opacity: on }}>15K</div>
          </div>
        );
      })}

      {/* the licence card — swings down on a pin and latches on the last beat */}
      <div style={{ position: "absolute", left: WD - 200 * s, top: 384 * s, width: 176 * s,
        height: 62 * s, transformOrigin: "14% 10%",
        transform: `rotate(${-72 + 72 * lic}deg)`, opacity: lic > 0.02 ? 1 : 0,
        background: `linear-gradient(160deg, #F4EFE0, #DCD3BC)`, borderRadius: 5 * s,
        border: `${3 * s}px solid ${dkh(GREEN, 0.3)}`, boxShadow: SH,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ ...ui(27 * s, 900), color: dkh(GREEN, 0.2) }}>{R.lic}</div>
        <div style={{ ...mono(13 * s, 700), color: hexa(INK, 0.6) }}>LICENSE</div>
      </div>
      <div style={{ position: "absolute", left: WD - 200 * s + 22 * s, top: 390 * s,
        width: 12 * s, height: 12 * s, borderRadius: "50%", background: dkh(BRASS, 0.2) }} />
    </div>
  );
};

/** A brass star disc that flies in and DRIVES the counter. Large enough to
    survive the audit's 1012->240 downsample (74px, not 30). */
export const StarDisc: React.FC<{ x: number; y: number; f: number; at: number;
  from?: [number, number]; s?: number; z?: number }> =
  ({ x, y, f, at, from = [-260, -180], s = 1, z = 62 }) => {
  if (f < at - 1 || f > at + 26) return null;
  const k = E(f, at, at + 13, 0, 1, IN_Q);
  /* ⛔ it is CONSUMED on arrival — it does not land and sit there. A disc that
     stays is a container; a disc that goes INTO the counter is the mechanism. */
  const eat = E(f, at + 13, at + 20, 0, 1, OUT);
  const D = 78 * s;
  return (
    <div style={{ position: "absolute", left: x - D / 2 + (1 - k) * from[0],
      top: y - D / 2 + (1 - k) * from[1], width: D, height: D, zIndex: z,
      transform: `rotate(${(1 - k) * -240}deg) scale(${(1 - eat * 0.85)})`,
      opacity: 1 - eat,
      borderRadius: "50%", background: `linear-gradient(160deg, ${GOLD}, ${dkh(GOLD, 0.44)})`,
      border: `${4 * s}px solid ${dkh(GOLD, 0.58)}`, boxShadow: SH,
      display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width={D * 0.58} height={D * 0.58} viewBox="0 0 24 24">
        <path d="M12 2.6l2.9 5.9 6.5.95-4.7 4.6 1.1 6.5L12 17.5 6.2 20.5l1.1-6.5L2.6 9.45l6.5-.95z"
          fill="#3A2B0C" />
      </svg>
    </div>
  );
};

/* =========================================================================
   S2 · THE WARDROBE
   ====================================================================== */

/** ⭐⭐⭐ THE BIGGEST PER-SCENE MOTION LEVER IN THE REPO: a full-width, high
    contrast travelling band. This is the wardrobe rail, and it is built to the
    measured rule that made it work — **it must alternate LIGHT AND SHADOW**.
    A light-only band scores lower AND lifts the black point, which is the one
    fix docs/ANIMATION-QUALITY §8 exists to ban. Every costume is separated by a
    dark gap, so each boundary is a luma edge and the swept area pays twice.

    ⛔ Each costume is >= 88px wide: a 52px object is 12px after the audit's
    1012->240 downsample and is worth nothing to the metric or to the eye. */
export const CostumeRail: React.FC<{ y: number; f: number; rate?: number; z?: number;
  s?: number; div?: string[] }> =
  ({ y, f, rate = 5.4, z = 40, s = 1, div = [] }) => {
  const PITCH = 148 * s, N = 12;
  const off = ((f * rate) % PITCH);
  const HANG = 178 * s;
  return (
    <>
      {/* the rail itself — a polished tube with its own bright top edge */}
      <div style={{ position: "absolute", left: -60, top: y - 12 * s, width: W + 120,
        height: 18 * s, zIndex: z + 6, borderRadius: 9 * s,
        background: `linear-gradient(180deg, #E8DCBA 0%, ${BRASS} 42%, ${dkh(BRASS, 0.55)} 100%)` }} />
      {Array.from({ length: N }).map((_, i) => {
        const x = -PITCH + i * PITCH - off;
        const seed = Math.floor((f * rate) / PITCH) + i;
        const hue = [CLAY, SKY, GOLD, GREEN, VIOLET, TEAL, EMBER, COPPER][(seed * 3 + i) % 8];
        const dk = 0.10 + rnd(seed * 5 + 1, 2) * 0.24;
        const hh = HANG * (0.82 + rnd(seed * 9 + 4, 3) * 0.3);
        return (
          <React.Fragment key={i}>
            {/* the hanger hook, on the rail */}
            <div style={{ position: "absolute", left: x + 44 * s, top: y - 26 * s, width: 5 * s,
              height: 26 * s, background: dkh(BRASS, 0.32), zIndex: z + 7 }} />
            {/* the garment — a real shoulder line and a taper, not a rectangle */}
            <svg width={96 * s} height={hh} viewBox="0 0 96 200" preserveAspectRatio="none"
              style={{ position: "absolute", left: x, top: y + 4 * s, zIndex: z + 4 }}>
              <path d="M14 0 L46 12 L82 0 L96 34 L78 44 L82 200 L14 200 L18 44 L0 34 Z"
                fill={dkh(hue, dk)} />
              <path d="M46 12 L82 0 L96 34 L78 44 L80 120 L46 120 Z" fill={vivid(hue, 0.14)} opacity="0.5" />
              <path d="M14 0 L46 12 L46 120 L16 120 L18 44 L0 34 Z" fill={dkh(hue, dk + 0.22)} />
            </svg>
            {/* ⭐ THE DARK GAP — this is what makes the band alternate light and
                shadow instead of reading as a light-only stripe */}
            <div style={{ position: "absolute", left: x + 96 * s, top: y + 4 * s,
              width: PITCH - 96 * s, height: hh * 0.98, zIndex: z + 3,
              background: `linear-gradient(90deg, ${hexa("#02090C", 0.72)}, ${hexa("#02090C", 0.30)})` }} />
            {/* a division tag on every third hanger, so the 18 are countable */}
            {i % 3 === 0 && div.length > 0 && (
              <div style={{ position: "absolute", left: x + 6 * s, top: y + 20 * s,
                zIndex: z + 8, background: BONE, borderRadius: 3 * s,
                padding: `${2 * s}px ${6 * s}px`, ...mono(12 * s, 700), color: INK,
                whiteSpace: "nowrap" }}>
                {div[(seed + i) % div.length]}
              </div>
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};

/* =========================================================================
   S3 · THE DRESSING ROOMS
   ====================================================================== */

/** One dressing-room door with its REAL star card. ⛔ Not three identical boxes
    with different labels — the door's colour, its number and the card's
    division strip all differ, because identity comes from shape AND colour and
    a shared treatment is the container defect one layer up (§15). */
export const RoomDoor: React.FC<{ x: number; y: number; i: number; open?: number;
  s?: number; z?: number; lampOn?: number; showCard?: boolean }> =
  ({ x, y, i, open = 0, s = 1, z = 40, lampOn = 0, showCard = true }) => {
  const c = R.cast[i];
  const WD = 214 * s, HT = 356 * s;
  return (
    <div style={{ position: "absolute", left: x - WD / 2, top: y - HT, width: WD, height: HT, zIndex: z }}>
      {/* the lit room behind the door, painted first so the door occludes it */}
      <div style={{ position: "absolute", inset: 0,
        background: `linear-gradient(180deg, ${vivid(c.c, 0.1)}, ${dkh(c.c, 0.5)})` }} />
      {/* the mirror bulbs inside — the background process in this room */}
      <div style={{ position: "absolute", left: 20 * s, top: 40 * s, display: "flex", gap: 10 * s }}>
        {[0, 1, 2, 3].map((b2) => (
          <div key={b2} style={{ width: 15 * s, height: 15 * s, borderRadius: "50%",
            background: lerpHex("#6A6250", "#FFF4D4", lampOn) }} />
        ))}
      </div>
      {/* the door leaf */}
      <div style={{ position: "absolute", inset: 0, transformOrigin: "0% 50%",
        transform: `perspective(1200px) rotateY(${open * 74}deg)`,
        background: `linear-gradient(104deg, #5E3A1E 0%, #74492A 52%, #432914 100%)`,
        borderRight: `${4 * s}px solid ${hexa("#000", 0.5)}`, boxShadow: SH_D }}>
        <div style={{ position: "absolute", left: 18 * s, top: 22 * s, right: 18 * s,
          height: 150 * s, background: "#3C2410",
          borderTop: `${3 * s}px solid ${hexa("#000000", 0.45)}`,
          borderBottom: `${3 * s}px solid ${hexa("#D8A868", 0.42)}` }} />
        <div style={{ position: "absolute", left: 18 * s, top: 190 * s, right: 18 * s,
          height: 100 * s, background: "#3C2410",
          borderTop: `${3 * s}px solid ${hexa("#000000", 0.45)}`,
          borderBottom: `${3 * s}px solid ${hexa("#D8A868", 0.42)}` }} />
        <div style={{ position: "absolute", left: WD - 34 * s, top: HT / 2 - 8 * s,
          width: 16 * s, height: 16 * s, borderRadius: "50%", background: BRASS }} />
      </div>

      {/* ⭐⭐ THE STAR CARD IS BOLTED TO THE JAMB, NOT TO THE LEAF.
          It used to ride the door, so the one receipt this scene exists to show
          swung edge-on and became unreadable at exactly the frame the door
          opened. A receipt has to survive the event that reveals it. */}
      {showCard && <div style={{ position: "absolute", left: WD / 2 - 92 * s, top: -84 * s, width: 184 * s,
        zIndex: 6, background: BONE, borderRadius: 5 * s, boxShadow: SH,
        border: `${3 * s}px solid ${dkh(c.c, 0.3)}`, overflow: "hidden" }}>
        <div style={{ background: dkh(c.c, 0.18), ...mono(12 * s, 700), color: "#FFF8E8",
          padding: `${3 * s}px 0`, textAlign: "center", letterSpacing: 1 * s }}>{c.div}</div>
        <div style={{ ...ui(15 * s, 900), color: INK, padding: `${7 * s}px ${6 * s}px`,
          textAlign: "center", lineHeight: 1.12 }}>{c.role}</div>
      </div>}
      {/* the room number, cast in brass, on the jamb beside the card */}
      <div style={{ position: "absolute", left: WD / 2 - 20 * s, top: 296 * s, width: 40 * s,
        height: 40 * s, borderRadius: "50%", background: dkh(BRASS, 0.22), zIndex: 6,
        border: `${3 * s}px solid ${dkh(BRASS, 0.52)}`, display: "flex",
        alignItems: "center", justifyContent: "center", ...mono(20 * s, 800), color: "#FFF3D0" }}>
        {i + 1}
      </div>
    </div>
  );
};

/** What each specialist is CARRYING when the door opens — the job, not a label.
    Three different objects, three different silhouettes: a laid-out screen, a
    pasted-up ad, a thread of posts. ⛔ Containers are what this replaces. */
export const JobObject: React.FC<{ x: number; y: number; i: number; f: number; at: number;
  s?: number; z?: number }> = ({ x, y, i, f, at, s = 1, z = 66 }) => {
  const k = E(f, at, at + 10, 0, 1, BACK);
  if (k <= 0.01) return null;
  /* ⭐⭐ THE JOB PROGRESSES. The old version popped a finished artefact and held
     it for the rest of the scene, so three specialists "doing their jobs" were
     three static props. Real content ARRIVING is the strongest honest motion
     lever there is (§1), and here it also says what each specialist actually
     DOES — a sprite running an action loop is only ever BUSY. */
  const g = E(f, at + 8, at + 46, 0, 1, OUT);
  const c = R.cast[i].c;
  const box = { position: "absolute" as const, left: x, top: y, zIndex: z,
    transform: `scale(${k}) rotate(${(1 - k) * -12}deg)`, transformOrigin: "50% 100%",
    boxShadow: SH };
  if (i === 0) {
    /* the FRONTEND DEVELOPER: a page assembles block by block */
    const blocks = [
      { l: 8, t: 24, w: 152, h: 34 },
      { l: 8, t: 64, w: 72, h: 46 },
      { l: 86, t: 64, w: 74, h: 46 },
      { l: 8, t: 116, w: 152, h: 16 },
    ];
    return (
      <div style={{ ...box, width: 168 * s, height: 146 * s, background: PAPER,
        borderRadius: 6 * s, border: `${3 * s}px solid ${dkh(c, 0.34)}`, overflow: "hidden" }}>
        <div style={{ height: 18 * s, background: dkh(c, 0.22), display: "flex",
          alignItems: "center", gap: 4 * s, paddingLeft: 6 * s }}>
          {[0, 1, 2].map((d) => (<div key={d} style={{ width: 6 * s, height: 6 * s,
            borderRadius: "50%", background: hexa("#FFF", 0.7) }} />))}
        </div>
        {blocks.map((bk, j) => {
          const on = E(g, j / blocks.length, j / blocks.length + 0.2, 0, 1, BACK);
          return (
            <div key={j} style={{ position: "absolute", left: bk.l * s, top: bk.t * s,
              width: bk.w * s, height: bk.h * s, borderRadius: 3 * s,
              background: j === 0 ? vivid(c, 0.16) : hexa(INK, 0.16),
              transform: `translateY(${(1 - on) * -26}px) scaleY(${on})`,
              transformOrigin: "50% 0%", opacity: on }} />
          );
        })}
      </div>
    );
  }
  if (i === 1) {
    /* the AD CREATIVE STRATEGIST: a headline lands and the board gets stamped */
    const stamp = E(g, 0.62, 0.82, 0, 1, BACK);
    return (
      <div style={{ ...box, width: 152 * s, height: 138 * s, background: CREAMB,
        borderRadius: 4 * s, border: `${3 * s}px solid ${dkh(c, 0.36)}`, padding: 10 * s }}>
        <div style={{ height: 30 * s, background: dkh(c, 0.1), borderRadius: 3 * s,
          transform: `scaleX(${E(g, 0, 0.3, 0.2, 1, OUT)})`, transformOrigin: "0% 50%" }} />
        {[0, 1].map((j) => (
          <div key={j} style={{ height: 5 * s, background: hexa(INK, 0.3 - j * 0.1),
            marginTop: (j ? 6 : 9) * s, width: `${(78 - j * 22) * E(g, 0.25 + j * 0.14, 0.5 + j * 0.14, 0, 1, OUT)}%` }} />
        ))}
        <div style={{ marginTop: 12 * s, width: 62 * s, height: 24 * s,
          background: vivid(c, 0.2), borderRadius: 12 * s,
          transform: `scale(${E(g, 0.45, 0.65, 0, 1, BACK)})` }} />
        {stamp > 0.02 && (
          <div style={{ position: "absolute", right: 6 * s, top: 8 * s, width: 56 * s,
            height: 56 * s, borderRadius: "50%", border: `${5 * s}px solid ${dkh(RED, 0.1)}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            transform: `rotate(-14deg) scale(${2 - stamp})`, opacity: stamp,
            ...ui(13 * s, 900), color: dkh(RED, 0.1) }}>LIVE</div>
        )}
      </div>
    );
  }
  /* the REDDIT COMMUNITY BUILDER: posts stack and the votes climb */
  const votes = Math.round(g * 412);
  return (
    <div style={{ ...box, width: 154 * s, height: 134 * s }}>
      {[0, 1, 2].map((d) => {
        const on = E(g, d * 0.22, d * 0.22 + 0.24, 0, 1, BACK);
        return (
          <div key={d} style={{ position: "absolute", left: d * 7 * s, top: d * 44 * s,
            width: 140 * s, height: 40 * s, background: PAPER, borderRadius: 5 * s,
            border: `${3 * s}px solid ${dkh(c, 0.3)}`, display: "flex", alignItems: "center",
            gap: 6 * s, paddingLeft: 7 * s, boxShadow: SH,
            transform: `translateX(${(1 - on) * 40}px)`, opacity: on }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: 0, height: 0, borderLeft: `${7 * s}px solid transparent`,
                borderRight: `${7 * s}px solid transparent`,
                borderBottom: `${11 * s}px solid ${vivid(c, 0.2)}` }} />
              <div style={{ ...mono(10 * s, 800), color: dkh(c, 0.2) }}>
                {d === 0 ? votes : Math.round(votes * (d === 1 ? 0.6 : 0.3))}
              </div>
            </div>
            <div>
              <div style={{ width: 74 * s, height: 5 * s, background: hexa(INK, 0.3) }} />
              <div style={{ width: 52 * s, height: 5 * s, background: hexa(INK, 0.18), marginTop: 4 * s }} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

/* =========================================================================
   S4 · THE GREEN ROOM — the two halves of the claim, drawn APART
   ====================================================================== */

/** THE PERSONALITY HALF. A character card: a face plate, a temperament dial
    with a needle that swings, and a spoken line. It is a PORTRAIT, which is
    what a personality looks like as an object. */
export const TraitCard: React.FC<{ x: number; y: number; i: number; f: number; at: number;
  s?: number; z?: number }> = ({ x, y, i, f, at, s = 1, z = 64 }) => {
  const k = E(f, at, at + 11, 0, 1, BACK);
  if (k <= 0.01) return null;
  const c = R.cast[i];
  const swing = Math.sin((f - at) / 6.2) * (1 - E(f, at + 30, at + 54, 0, 1, IO)) * 26;
  const WD = 224 * s, HT = 150 * s;
  return (
    <div style={{ position: "absolute", left: x - WD / 2, top: y - HT, width: WD, height: HT,
      zIndex: z, transformOrigin: "50% 100%", transform: `scale(${k}) rotate(${(1 - k) * 8}deg)`,
      background: `linear-gradient(160deg, ${BONE}, #DED5BC)`, borderRadius: 7 * s,
      border: `${4 * s}px solid ${dkh(c.c, 0.28)}`, boxShadow: SH_D, overflow: "hidden" }}>
      <div style={{ background: dkh(c.c, 0.16), ...mono(12 * s, 700), color: "#FFF8E8",
        padding: `${3 * s}px 0`, textAlign: "center", letterSpacing: 1.4 * s }}>
        {R.halves[0]}
      </div>
      <div style={{ display: "flex", padding: 9 * s, gap: 9 * s, alignItems: "center" }}>
        {/* the face plate — a drawn portrait, not an emoji */}
        <svg width={54 * s} height={58 * s} viewBox="0 0 54 58">
          <rect x="6" y="8" width="42" height="44" rx="12" fill={vivid(c.c, 0.06)} />
          <rect x="6" y="8" width="42" height="16" rx="12" fill={dkh(c.c, 0.24)} />
          <circle cx="19" cy="32" r="4.4" fill="#1A1813" />
          <circle cx="35" cy="32" r="4.4" fill="#1A1813" />
          <path d={i === 2 ? "M17 42 Q27 50 37 42" : i === 1 ? "M17 44 L37 44" : "M17 43 Q27 48 37 43"}
            stroke="#1A1813" strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
        {/* the temperament dial — a needle that actually swings and settles */}
        <div style={{ flex: 1 }}>
          <svg width={112 * s} height={58 * s} viewBox="0 0 112 58">
            <path d="M8 50 A48 48 0 0 1 104 50" fill="none" stroke={hexa(INK, 0.18)} strokeWidth="9" />
            <path d="M8 50 A48 48 0 0 1 104 50" fill="none" stroke={vivid(c.c, 0.1)}
              strokeWidth="9" strokeDasharray="150" strokeDashoffset={150 - 44 - i * 26} />
            <g transform={`rotate(${-46 + i * 30 + swing} 56 50)`}>
              <path d="M56 50 L56 14" stroke="#1A1813" strokeWidth="4" strokeLinecap="round" />
            </g>
            <circle cx="56" cy="50" r="6" fill="#1A1813" />
          </svg>
        </div>
      </div>
    </div>
  );
};

/** THE PROCESS HALF. A running order that unrolls and TICKS its steps one by
    one. Numbered steps arriving IS the motion, and it is motion that also
    means something (§1: real content arriving). */
export const RunOrder: React.FC<{ x: number; y: number; i: number; f: number; at: number;
  s?: number; z?: number }> = ({ x, y, i, f, at, s = 1, z = 64 }) => {
  const roll = E(f, at, at + 14, 0, 1, OUT);
  if (roll <= 0.01) return null;
  const c = R.cast[i];
  const STEPS = [["BRIEF", "DRAFT", "SHIP"], ["HOOK", "TEST", "SCALE"], ["LISTEN", "REPLY", "GROW"]][i];
  const WD = 224 * s;
  return (
    <div style={{ position: "absolute", left: x - WD / 2, top: y, width: WD, zIndex: z,
      transformOrigin: "50% 0%", transform: `scaleY(${roll})`,
      background: `linear-gradient(180deg, ${PAPER}, #E6E0CE)`, borderRadius: 6 * s,
      border: `${3 * s}px solid ${dkh(c.c, 0.3)}`, boxShadow: SH, overflow: "hidden" }}>
      <div style={{ background: hexa(INK, 0.82), ...mono(12 * s, 700), color: "#F2E7CB",
        padding: `${3 * s}px 0`, textAlign: "center", letterSpacing: 1.4 * s }}>
        {R.halves[1]}
      </div>
      {STEPS.map((t, j) => {
        const on = E(f, at + 14 + j * 7, at + 21 + j * 7, 0, 1, OUT);
        return (
          <div key={t} style={{ display: "flex", alignItems: "center", gap: 8 * s,
            padding: `${5 * s}px ${10 * s}px`, borderBottom: `${2 * s}px solid ${hexa(INK, 0.08)}` }}>
            <div style={{ width: 20 * s, height: 20 * s, borderRadius: 4 * s, flexShrink: 0,
              background: on > 0.5 ? vivid(c.c, 0.12) : hexa(INK, 0.14),
              display: "flex", alignItems: "center", justifyContent: "center",
              ...mono(12 * s, 800), color: on > 0.5 ? "#FFF8E8" : hexa(INK, 0.5) }}>{j + 1}</div>
            <div style={{ ...ui(15 * s, 800), color: INK, opacity: 0.4 + 0.6 * on }}>{t}</div>
            {/* the tick that lands when the step completes */}
            <svg width={18 * s} height={18 * s} viewBox="0 0 18 18"
              style={{ marginLeft: "auto", opacity: on, transform: `scale(${on})` }}>
              <path d="M3 9.5 L7 13.5 L15 4.5" stroke={dkh(GREEN, 0.05)} strokeWidth="3.2"
                fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        );
      })}
    </div>
  );
};

/* =========================================================================
   S5 · THE PROMPT CORNER — the hero artifact
   ====================================================================== */

/** The knife lever the hero throws on "one click". Heavy: a cast base, a
    quadrant with detents, a laminated handle. It RESISTS, then goes over. */
export const KnifeLever: React.FC<{ x: number; y: number; throwK?: number; s?: number; z?: number }> =
  ({ x, y, throwK = 0, s = 1, z = 58 }) => (
  <div style={{ position: "absolute", left: x - 84 * s, top: y - 210 * s, width: 168 * s,
    height: 214 * s, zIndex: z }}>
    {/* the quadrant plate with its detents */}
    <svg width={168 * s} height={214 * s} viewBox="0 0 168 214" style={{ position: "absolute" }}>
      <path d="M84 200 L20 60 A72 72 0 0 1 148 60 Z" fill={dkh(SLATE, 0.4)} opacity="0.85" />
      {[0, 1, 2, 3, 4].map((i) => (
        <circle key={i} cx={34 + i * 25} cy={72 + Math.abs(i - 2) * 9} r="4.5" fill={dkh(BRASS, 0.5)} />
      ))}
      {/* the cast base */}
      <rect x="30" y="182" width="108" height="30" rx="7" fill={dkh(SLATE, 0.24)} />
      <rect x="30" y="182" width="108" height="9" rx="4" fill={mxh(SLATE, 0.22)} />
    </svg>
    {/* the handle — laminated, with a brass ferrule and a turned knob */}
    <div style={{ position: "absolute", left: 76 * s, top: 22 * s, width: 16 * s, height: 172 * s,
      transformOrigin: "50% 96%", transform: `rotate(${-38 + throwK * 76}deg)` }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 8 * s,
        background: `linear-gradient(94deg, ${mxh(OXIDE, 0.3)}, ${dkh(OXIDE, 0.45)})` }} />
      <div style={{ position: "absolute", left: -4 * s, top: 30 * s, width: 24 * s, height: 16 * s,
        borderRadius: 3 * s, background: `linear-gradient(160deg, ${BRASS}, ${dkh(BRASS, 0.45)})` }} />
      <div style={{ position: "absolute", left: -13 * s, top: -22 * s, width: 42 * s, height: 42 * s,
        borderRadius: "50%", background: `radial-gradient(circle at 34% 30%, ${mxh(BRASS, 0.4)}, ${dkh(BRASS, 0.5)})`,
        border: `${3 * s}px solid ${dkh(BRASS, 0.62)}` }} />
    </div>
  </div>
);

/** A house lamp carrying ONE real tool mark. Seven of these snap on in a run
    when the lever goes over — the seven tools the app installs into, every one
    named in the repo's own README. Claude is first and biggest. */
export const HouseLamp: React.FC<{ x: number; y: number; i: number; on?: number; s?: number; z?: number }> =
  ({ x, y, i, on = 0, s = 1, z = 60 }) => {
  const t = R.tools[i];
  const sc = s * t.s;
  const D = 106 * sc;
  return (
    <div style={{ position: "absolute", left: x - D / 2, top: y - D / 2, width: D, height: D, zIndex: z }}>
      {/* the shade and its stem, drawn above the fitting */}
      <div style={{ position: "absolute", left: D / 2 - 4 * sc, top: -44 * sc, width: 8 * sc,
        height: 46 * sc, background: dkh(BRASS, 0.5) }} />
      <svg width={D * 1.16} height={38 * sc} viewBox="0 0 116 38"
        style={{ position: "absolute", left: -D * 0.08, top: -12 * sc }}>
        <path d="M14 36 L34 2 L82 2 L102 36 Z" fill={dkh(BRASS, 0.34)} />
        <path d="M14 36 L34 2 L46 2 L28 36 Z" fill={mxh(BRASS, 0.24)} />
      </svg>
      {/* ⛔ the lit pool is CONTAINED to the fitting — never a screen flash
          (docs/ANIMATION-QUALITY §16, and `feedback_no_flashing_transitions`) */}
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%",
        background: `radial-gradient(circle at 50% 44%, ${hexa(t.c, 0.5 * on)} 0%, transparent 72%)`,
        transform: `scale(${1 + on * 0.5})` }} />
      <div style={{ position: "absolute", left: D * 0.14, top: D * 0.14, width: D * 0.72,
        height: D * 0.72, borderRadius: 14 * sc,
        background: lerpHex("#5A5648", "#FFFFFF", 0.25 + 0.75 * on),
        border: `${4 * sc}px solid ${lerpHex("#3A3830", dkh(t.c, 0.2), on)}`,
        display: "flex", alignItems: "center", justifyContent: "center", boxShadow: SH,
        opacity: 0.55 + 0.45 * on }}>
        <Img src={staticFile("logos/" + t.logo)}
          style={{ width: D * 0.46, height: D * 0.46, objectFit: "contain",
            filter: on < 0.5 ? "grayscale(1) brightness(0.7)" : undefined }} />
      </div>
      <div style={{ position: "absolute", left: -20 * sc, top: D + 6 * sc, width: D + 40 * sc,
        textAlign: "center", ...mono(13 * sc, 700), color: lerpHex("#6E6A5C", "#FFF2CE", on) }}>
        {t.n}
      </div>
    </div>
  );
};

/** ⭐⭐⭐ THE HERO ARTIFACT. The roster board that fills in ONE pass when the
    lever goes over — 273 agents installing themselves. Name strips arrive rank
    by rank with a value ramp, the counter climbs to 273, and the whole thing is
    mute-legible in under two seconds: this is the thing you get.

    ⛔ It is a physical BOARD with slotted strips, not a UI screenshot. */
export const RosterBoard: React.FC<{ x: number; y: number; fill?: number; s?: number;
  z?: number; f?: number }> = ({ x, y, fill = 0, s = 1, z = 52, f = 0 }) => {
  const WD = 640 * s, HT = 316 * s;
  const COLS = 6, ROWS = 7, N = COLS * ROWS;
  const shown = Math.round(R.agents * fill);
  /* ⭐ EACH ROLE CARRIES ITS DIVISION'S COLOUR — the same colour that role's
     sprite wore in the hook rings and walked out of its door wearing. 42 clay
     chips said "a lot of roles"; 42 chips in six colours says "18 DIVISIONS",
     which is the claim the scene is actually making. */
  const NAMES: Array<[string, number]> = [
    ["FRONTEND", 0], ["BACKEND", 0], ["DEVOPS", 0], ["AD BUY", 3], ["REDDIT", 2],
    ["SEO", 2], ["QA", 5], ["SECURITY", 4], ["UX", 1], ["COPY", 2], ["DATA", 0],
    ["SALES", 3], ["SUPPORT", 2], ["GIS", 0], ["GAME", 1], ["FINANCE", 3],
    ["3D", 1], ["RESEARCH", 5]];
  return (
    <div style={{ position: "absolute", left: x - WD / 2, top: y - HT, width: WD, height: HT,
      zIndex: z, background: `linear-gradient(166deg, ${dkh(SLATE, 0.34)}, ${dkh(SLATE, 0.62)})`,
      borderRadius: 8 * s, border: `${7 * s}px solid ${dkh(BRASS, 0.4)}`, boxShadow: SH_D,
      padding: 12 * s, overflow: "hidden" }}>
      {/* the header rail: the mark, the name, the live count */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 * s, marginBottom: 9 * s }}>
        <RealMark src="claude.svg" s={30 * s} z={3} />
        <div style={{ ...ui(19 * s, 900), color: "#F6EFDC", letterSpacing: 1 * s }}>
          INSTALLED
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "baseline", gap: 6 * s,
          background: hexa("#000", 0.42), borderRadius: 5 * s, padding: `${2 * s}px ${10 * s}px` }}>
          <div style={{ ...mono(30 * s, 800), color: GOLD }}>{shown}</div>
          <div style={{ ...mono(14 * s, 700), color: hexa("#F6EFDC", 0.66) }}>AGENTS</div>
        </div>
      </div>
      {/* the slotted strips — arriving in a diagonal sweep, with a VALUE RAMP by
          row so the board reads as depth and not as texture */}
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${COLS}, 1fr)`,
        gap: 5 * s }}>
        {Array.from({ length: N }).map((_, i) => {
          const r = Math.floor(i / COLS), c = i % COLS;
          const t = (r * 0.7 + c * 0.3) / (ROWS * 0.7 + COLS * 0.3);
          const on = E(fill, t * 0.86, t * 0.86 + 0.2, 0, 1, OUT);
          const tone = 1 - r / (ROWS + 2);
          const [nm, di] = NAMES[i % NAMES.length];
          const dc = DIVS[di].c;
          return (
            <div key={i} style={{ height: 30 * s, borderRadius: 3 * s, overflow: "hidden",
              background: on > 0.02
                ? lerpHex(dkh(dc, 0.54), vivid(dc, 0.04), tone)
                : hexa("#000", 0.34),
              transform: `translateX(${(1 - on) * -34}px) scaleX(${0.3 + 0.7 * on})`,
              transformOrigin: "0% 50%", opacity: 0.35 + 0.65 * on,
              display: "flex", alignItems: "center", paddingLeft: 6 * s, gap: 4 * s }}>
              <div style={{ width: 5 * s, height: 16 * s, borderRadius: 2 * s,
                background: on > 0.5 ? mxh(dc, 0.46) : hexa("#FFF", 0.14) }} />
              <div style={{ ...mono(11 * s, 700), color: hexa("#FFF6E2", 0.86 * on),
                whiteSpace: "nowrap" }}>{nm}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* =========================================================================
   S6 · THE STAGE
   ====================================================================== */

/** The house curtain, drawn with real gathers and a valance so it reads as
    heavy velvet rather than a red rectangle. `out` flies it. */
export const Curtain: React.FC<{ out?: number; s?: number; z?: number }> =
  ({ out = 0, s = 1, z = 78 }) => (
  <>
    {[-1, 1].map((k) => (
      <div key={k} style={{ position: "absolute", top: -20, height: H + 40,
        width: W * 0.56, zIndex: z,
        left: k < 0 ? -out * W * 0.5 : undefined,
        right: k > 0 ? -out * W * 0.5 : undefined,
        transform: k < 0 ? `translateX(${-out * 40}px)` : `translateX(${out * 40}px)` }}>
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} style={{ position: "absolute", top: 0, bottom: 0,
            left: `${i * 11.6}%`, width: "12.4%",
            background: `linear-gradient(90deg, ${dkh(OXBLOOD, 0.3)} 0%, ${vivid(OXBLOOD, 0.16)} 44%, ${dkh(OXBLOOD, 0.5)} 100%)`,
            borderRadius: "0 0 30% 30%" }} />
        ))}
      </div>
    ))}
    {/* the valance stays put — it is what tells you the curtain went OUT */}
    <div style={{ position: "absolute", left: -20, top: -20, width: W + 40, height: 96 * s,
      zIndex: z + 1, background: `linear-gradient(180deg, ${dkh(OXBLOOD, 0.16)}, ${dkh(OXBLOOD, 0.46)})`,
      borderBottom: `${6 * s}px solid ${dkh(GOLD, 0.24)}` }}>
      {Array.from({ length: 13 }).map((_, i) => (
        <div key={i} style={{ position: "absolute", top: 74 * s, left: `${i * 7.9}%`,
          width: 16 * s, height: 26 * s, borderRadius: "0 0 50% 50%", background: dkh(GOLD, 0.3) }} />
      ))}
    </div>
  </>
);

/** The owner's nameplate, rising into the board on two chains. Brass, engraved,
    with a bevelled edge — and it arrives EMPTY-legible, because empty is the
    promise, then the word cuts in. */
export const OwnerPlate: React.FC<{ x: number; y: number; rise?: number; cut?: number;
  s?: number; z?: number }> = ({ x, y, rise = 0, cut = 0, s = 1, z = 74 }) => {
  const WD = 330 * s, HT = 96 * s;
  const yy = y + (1 - rise) * 170 * s;
  return (
    <>
      {[-1, 1].map((k) => (
        <div key={k} style={{ position: "absolute", left: x + k * 128 * s - 3 * s, top: y - 240 * s,
          width: 6 * s, height: Math.max(0, yy - (y - 240 * s)), zIndex: z - 1,
          background: `repeating-linear-gradient(180deg, ${dkh(BRASS, 0.34)} 0 7px, ${dkh(BRASS, 0.62)} 7px 13px)` }} />
      ))}
      <div style={{ position: "absolute", left: x - WD / 2, top: yy, width: WD, height: HT,
        zIndex: z, borderRadius: 6 * s, boxShadow: SH_D,
        background: `linear-gradient(162deg, ${mxh(BRASS, 0.34)}, ${dkh(BRASS, 0.42)})`,
        border: `${5 * s}px solid ${dkh(BRASS, 0.6)}`,
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ ...ui(44 * s, 900), color: "#241B08", letterSpacing: 4 * s,
          clipPath: `inset(0 ${(1 - cut) * 100}% 0 0)` }}>OWNER</div>
      </div>
    </>
  );
};

/** The CTA plate. ⛔ Lands hard ON the spoken keyword and nothing follows it. */
export const KeywordPlate: React.FC<{ x: number; y: number; k?: number; s?: number; z?: number }> =
  ({ x, y, k = 0, s = 1, z = 92 }) => {
  const WD = 560 * s, HT = 128 * s;
  const pop = E(k, 0, 0.5, 0, 1, BACK);
  if (pop <= 0.01) return null;
  return (
    <div style={{ position: "absolute", left: x - WD / 2, top: y, width: WD, height: HT, zIndex: z,
      transform: `scale(${pop})`, transformOrigin: "50% 50%",
      background: `linear-gradient(160deg, ${CREAMB}, #E2D9C0)`, borderRadius: 12 * s,
      border: `${6 * s}px solid ${dkh(CLAYD, 0.1)}`, boxShadow: SH_D,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      gap: 2 * s }}>
      <div style={{ ...ui(23 * s, 800), color: hexa(INK, 0.62), letterSpacing: 2 * s }}>COMMENT</div>
      <div style={{ ...ui(60 * s, 900), color: dkh(CLAYD, 0.06), letterSpacing: 5 * s }}>
        {R.keyword}
      </div>
    </div>
  );
};

/** ⛔⛔⛔ THIS PROP EXISTS BECAUSE I DID THE BANNED THING.
    The motion audit rewards LARGE BRIGHT OBJECTS TRAVELLING, so when four
    scenes measured low I ran a generic `Runner` of cream `BONE` cards across
    them. The median went 5.41 -> 10.03 and the reel turned into **flying
    stationery** — the exact defect docs/ANIMATION-QUALITY §9 names, in the
    exact words it uses: *"way too many paper animations, this is like paper
    boxes and stuff."* A metric satisfiable the wrong way WILL be satisfied the
    wrong way.

    ⭐ The honest replacement is the object a playhouse actually flies overhead:
    a bar of stage lanterns. It alternates light and shadow the way the measured
    rule wants (a dark barrel against a bright lens is a luma edge on both
    sides), it is a real thing in this world rather than an anonymous rectangle,
    and it is drawn — barrel, yoke, colour frame, lens, safety chain. */
export const FlyBar: React.FC<{ y: number; f: number; rate?: number; z?: number;
  pitch?: number; s?: number; c?: string; on?: number }> =
  ({ y, f, rate = 8, z = 26, pitch = 196, s = 1, c = "#FFE9B0", on = 1 }) => {
  const N = Math.ceil((W + pitch * 2) / pitch);
  const off = ((f * rate) % pitch + pitch) % pitch;
  return (
    <>
      {/* the bar itself, and its two suspension lines */}
      <div style={{ position: "absolute", left: -40, top: y, width: W + 80, height: 11 * s,
        zIndex: z + 1, background: `linear-gradient(180deg, #4A4E56, #1C1F25)` }} />
      {Array.from({ length: N }).map((_, i) => {
        const x = -pitch + i * pitch - off;
        const lit = 0.45 + 0.55 * Math.abs(Math.sin((i + Math.floor((f * rate) / pitch)) * 1.7));
        return (
          <React.Fragment key={i}>
            {/* safety chain + yoke */}
            <div style={{ position: "absolute", left: x + 46 * s, top: y + 8 * s, width: 4 * s,
              height: 26 * s, zIndex: z, background: "#2A2E36" }} />
            <div style={{ position: "absolute", left: x + 24 * s, top: y + 30 * s, width: 48 * s,
              height: 5 * s, zIndex: z, background: "#3A3F48", borderRadius: 3 * s }} />
            {/* the barrel — a dark mass, which is the half that makes the edge */}
            <div style={{ position: "absolute", left: x + 14 * s, top: y + 34 * s, width: 68 * s,
              height: 62 * s, zIndex: z, borderRadius: `${8 * s}px ${8 * s}px ${5 * s}px ${5 * s}px`,
              background: `linear-gradient(168deg, #3C424C, #14171C)` }} />
            {/* the colour frame and the lens — the bright half */}
            <div style={{ position: "absolute", left: x + 8 * s, top: y + 90 * s, width: 80 * s,
              height: 12 * s, zIndex: z + 2, borderRadius: 3 * s, background: "#22262E" }} />
            <div style={{ position: "absolute", left: x + 16 * s, top: y + 96 * s, width: 64 * s,
              height: 22 * s, zIndex: z + 2, borderRadius: `0 0 ${18 * s}px ${18 * s}px`,
              background: lerpHex("#5A5648", c, lit * on), opacity: 0.5 + 0.5 * on }} />
          </React.Fragment>
        );
      })}
    </>
  );
};

/* =========================================================================
   ⭐⭐⭐ THE HOOK'S PAYLOAD: THE GRAVITY OF 273.
   Alex: *"the hook scene is not interesting enough, it has to represent the
   GRAVITY of having this many people in an AI agency, like my original AI
   agency video."* The original is reel 94, whose hook rolls a shutter up to
   reveal A FLOOR OF CLAUDES — one dominant object, and what its removal
   uncovers is the scale.

   ⛔ My key-in-a-lock said OWNERSHIP and said nothing about HOW MANY. A viewer
   cannot feel 273 from one sprite and a door. So the door now bursts and what
   is behind it is this: a hall receding to a vanishing point, packed rank on
   rank, each rank smaller and painted in progressively darker clay.

   ⛔ SIZE ALONE IS A TEXTURE. The VALUE RAMP is what makes it read as depth
   rather than as wallpaper, and it is the axis the greyscale audit can see.
   ⛔ Pitch is arithmetic per rank: `pitch = usableWidth / (n + 1)` against
   `spacing >= 0.85 x size`, computed below, never eyeballed.
   ====================================================================== */
export const AgencyHall: React.FC<{ x: number; y: number; w: number; f: number;
  open?: number; z?: number; c?: string }> =
  ({ x, y, w: WW, f, open = 0, z = 26, c = CLAY }) => {
  if (open <= 0.01) return null;
  /* six ranks, near to far. Each is smaller, darker, and higher up the frame. */
  const RANKS = [
    { n: 5, size: 132, dy: 0, tone: 0.02 },
    { n: 6, size: 108, dy: -58, tone: 0.20 },
    { n: 8, size: 88, dy: -104, tone: 0.36 },
    { n: 10, size: 70, dy: -142, tone: 0.50 },
    { n: 13, size: 55, dy: -174, tone: 0.62 },
    { n: 17, size: 43, dy: -200, tone: 0.72 },
  ];
  return (
    <div style={{ position: "absolute", left: x - WW / 2, top: y - 560, width: WW, height: 560,
      zIndex: z, overflow: "hidden", opacity: Math.min(1, open * 2.2) }}>
      {/* the hall itself: a lit vanishing corridor, brightest at the far end so
          the crowd reads as silhouettes against it */}
      <div style={{ position: "absolute", inset: 0,
        background: `radial-gradient(ellipse 62% 54% at 50% 26%, #FFE3A6 0%, #C98A46 34%, #6E4526 62%, #2A1A0E 100%)` }} />
      {/* the coffered ceiling, receding — countable, and it sells the depth */}
      {Array.from({ length: 7 }).map((_, i) => {
        const t = i / 7, inset = t * 0.34;
        return (
          <div key={"cf" + i} style={{ position: "absolute", left: `${inset * 100}%`,
            right: `${inset * 100}%`, top: 18 + i * 22, height: 7,
            background: hexa("#3A2410", 0.5 + t * 0.3) }} />
        );
      })}
      {RANKS.map((r, ri) => {
        const usable = WW * (1 - ri * 0.055);
        const pitch = usable / (r.n + 1);
        const arrive = E(open, ri * 0.06, ri * 0.06 + 0.5, 0, 1, OUT);
        return Array.from({ length: r.n }).map((_, i) => (
          <Crew key={`h${ri}-${i}`} f={f + ri * 11 + i * 5}
            x={(WW - usable) / 2 + pitch * (i + 1)}
            y={560 + r.dy - (1 - arrive) * 26}
            i={(i * 3 + ri * 5) % 12} size={r.size} z={z + 40 - ri * 4}
            at={0} loop={(i + ri) % 2 === 0 ? 0 : 2}
            tint={lerpHex(c, dkh(c, 0.74), r.tone)} />
        ));
      })}
      {/* the count, struck into the lintel inside the hall */}
      <div style={{ position: "absolute", left: "50%", top: 8, transform: "translateX(-50%)",
        ...ui(30, 900), color: "#3A2410", letterSpacing: 3,
        opacity: E(open, 0.35, 0.7, 0, 1, OUT) }}>
        {R.agents} SPECIALISTS
      </div>
    </div>
  );
};

/** The double stage doors. ⛔ Two leaves, because ONE leaf swinging aside is a
    door opening and TWO bursting apart is a reveal — and what is behind them is
    the whole point of the shot. */
export const DoubleDoor: React.FC<{ x: number; y: number; s?: number; z?: number;
  open?: number; shake?: number }> = ({ x, y, s = 1, z = 34, open = 0, shake = 0 }) => {
  const WD = 300 * s, HT = 436 * s;
  return (
    <>
      {[-1, 1].map((k) => (
        <div key={k} style={{ position: "absolute",
          left: x + (k < 0 ? -WD : 0), top: y - HT, width: WD, height: HT,
          zIndex: z, transformOrigin: k < 0 ? "0% 50%" : "100% 50%",
          transform: `perspective(1500px) rotateY(${k * open * 96}deg) translateX(${shake * k}px)`,
          background: "linear-gradient(100deg, #14161C 0%, #1E222A 52%, #0E1014 100%)",
          borderRight: k < 0 ? `${3 * s}px solid ${hexa("#3A4048", 0.8)}` : undefined,
          borderLeft: k > 0 ? `${3 * s}px solid ${hexa("#3A4048", 0.8)}` : undefined,
          boxShadow: SH_D }}>
          {[0, 1, 2].map((r) => (
            <div key={r} style={{ position: "absolute", left: 24 * s, right: 24 * s,
              top: 28 * s + r * 134 * s, height: 112 * s, background: "#0A0C10",
              borderTop: `${3 * s}px solid ${hexa("#000000", 0.7)}`,
              borderBottom: `${3 * s}px solid ${hexa("#454C56", 0.55)}` }} />
          ))}
          <div style={{ position: "absolute", bottom: 10 * s, left: 12 * s, right: 12 * s,
            height: 34 * s, background: dkh(BRASS, 0.52), opacity: 0.7 }} />
        </div>
      ))}
    </>
  );
};

/** ⭐⭐⭐ THE GRAVITY BEAT. A hall receding behind a doorway put the scale in a
    318px sliver at the edge of frame, which is the opposite of weight. They
    have to come AT the viewer instead: the doors burst and the company FLOODS
    OUT, each one emerging small at the threshold and growing as it crosses the
    frame, until the near ones are cropped by the bottom edge.

    ⛔ This is the near-camera crowd band from [[feedback_the_crowd_is_a_near_band]]
    given a SOURCE, so it is not a band parked in the foreground — it is a band
    being PRODUCED by the thing the hook just opened. Each member has its own
    departure frame, its own path and its own action loop; a rank that moves as
    one object repaints nothing. */
export const Flood: React.FC<{ x: number; y: number; f: number; at: number;
  n?: number; z?: number; c?: string; spread?: number }> =
  ({ x, y, f, at, n = 9, z = 66, c = CLAY, spread = 760 }) => (
  <>{Array.from({ length: n }).map((_, i) => {
    const start = at + i * 4.2;
    const k = E(f, start, start + 46, 0, 1, OUT);
    if (k <= 0.005) return null;
    /* ⭐ A DEPTH WEDGE, NOT A ROW. Each member runs its own path from the
       threshold to near-camera: it grows, it DROPS down the frame, and it fans
       sideways — so the shape the crowd makes is a wedge coming forward rather
       than a band sliding across, which is what read as a smear.
       ⛔ PITCH IS ARITHMETIC. Nine members over 46 frames of stagger at
       `0.85 x size` minimum separation; more than this and they merge into one
       unreadable mass, which is `reel-sprite-grounding-law` exactly. */
    const lane = ((i % 3) - 1);                       /* -1, 0, 1 */
    const d = k;                                      /* 0 at the door, 1 near */
    const size = 46 + d * d * 208;                    /* small until it is close */
    const px = x - 62 - d * (spread * (0.30 + (i % 5) * 0.13)) + lane * d * 96;
    /* the near end sits BELOW the panel floor, so the front rank is cropped by
       the bottom edge — the depth cue the look audit asks for, and the shape
       BOSS runs in every body frame */
    const py = (y - 104) + d * (196 + (i % 3) * 26);
    return (
      <Crew key={"fl" + i} f={f + i * 9} x={px} y={py} i={(i * 5 + 3) % 12}
        size={size} z={z + Math.round(d * 26) + (i % 2)}
        at={start} loop={i % 2 === 0 ? 0 : 2}
        tint={lerpHex(dkh(c, 0.5), c, 0.25 + 0.75 * d)} />
    );
  })}</>
);

/* =========================================================================
   ⭐⭐⭐ THE ASSEMBLY — the hook's real subject.

   Alex: *"the hook scene is not interesting enough, it has to represent the
   GRAVITY of having this many people in an AI agency, like my original AI
   agency video."*

   The key-in-a-lock said OWNERSHIP and said nothing about HOW MANY, and a
   doorway parked at the right edge could only ever show the scale through a
   318px slot. This is the image the line actually describes: ONE Claude alone
   at the front, and behind him the whole company, rank on rank, filling the
   frame to the back wall. He owns all of it and it costs nothing.

   ⛔ SEVEN RANKS, AND EVERY PITCH IS COMPUTED, NOT EYEBALLED.
   `pitch = usable / (n + 1)` must clear `0.85 x size` per rank, or the rank
   renders as one continuous clay band — which is what reel 107 shipped and got
   told about. Solved per row below; the sizes are the largest each count allows.

   ⛔ AND THE VALUE RAMP IS THE DEPTH CUE, not the size. Size alone is texture.
   Back ranks are painted in progressively darker clay, which is also the only
   axis the greyscale motion audit can see.

   ⭐ THE EVENT IS LIGHT. The ranks are pre-seeded and SETTLED at frame 0 but
   sit in shadow, so frame 0 already contains the subject; the house lamps then
   snap up in a run and each one hands another rank to the viewer. N discrete
   pops, not one long fade (§1), and each pop is a withheld resolution
   resolving — you do not know how far back it goes until the last one fires.
   ====================================================================== */
export const Assembly: React.FC<{ f: number; lit: number; z?: number; dx?: number;
  c?: string; back?: boolean }> = ({ f, lit, z = 30, dx = 0, c = CLAY, back = false }) => {
  /* ⛔ THE VALUE RAMP RUNS 0 -> 0.5, NOT 0 -> 0.76. The first build ramped to
     0.80 and the company rendered as a near-black blob: it stopped reading as
     Claudes at all, which fails the house rule that every Claude is the one
     clay. A ramp is a DEPTH cue, not a dimmer.
     ⛔ AND THE ROWS ARE SPACED SO THEY DO NOT STACK. Vertical gap per rank is
     at least 0.55 x the front rank's size, or the ranks merge top to bottom
     however correct the horizontal pitch is. */
  const RANKS = [
    { n: 20, size: 46, y: 448, tone: 0.50, lamp: 0.86 },
    { n: 16, size: 60, y: 496, tone: 0.42, lamp: 0.70 },
    { n: 13, size: 78, y: 552, tone: 0.33, lamp: 0.55 },
    { n: 10, size: 100, y: 618, tone: 0.24, lamp: 0.40 },
    { n: 8,  size: 128, y: 696, tone: 0.15, lamp: 0.26 },
    { n: 6,  size: 164, y: 784, tone: 0.07, lamp: 0.14 },
    /* the near rank sits BELOW the panel floor so it is cropped by the bottom
       edge — the depth cue the look audit asks for by eye, and the shape BOSS
       runs in every body frame */
    { n: 4,  size: 218, y: 872, tone: 0.00, lamp: 0.04 },
  ];
  return (
    <>{RANKS.map((r, ri) => {
      const usable = 920 - ri * 8;
      const pitch = usable / (r.n + 1);
      /* each rank is handed to the viewer by its own lamp coming up */
      /* `back` inverts the order the ranks arrive in: the deepest lights first
         and the house fills toward camera, which is a different EVENT rather
         than the same one at a different exposure */
      const lampAt = back ? 0.90 - r.lamp : r.lamp;
      const on = E(lit, lampAt, lampAt + 0.16, 0, 1, OUT);
      /* ⛔⛔ COSTUME CHOICE IS A LEGIBILITY DECISION AT THIS SIZE, NOT VARIETY.
         Cycling all twelve put navy suits, blue uniforms and purple robes on a
         46px sprite, and the costume then IS the sprite — the company rendered
         as a speckled black mass and stopped reading as Claudes at all. The far
         ranks are restricted to the four levers that leave the clay body
         showing (glasses, stern, beard, hard hat); only the two nearest ranks,
         where a costume is actually legible, get the full spread. */
      const FAR = [1, 11, 3, 0];
      const NEAR = [0, 1, 2, 3, 5, 6, 8, 11];
      return Array.from({ length: r.n }).map((_, i2) => (
        <Crew key={`as${ri}-${i2}`} f={f + ri * 13 + i2 * 6}
          x={(1012 - usable) / 2 + pitch * (i2 + 1) + dx * (1 - ri * 0.1)}
          y={r.y} i={ri >= 5 ? NEAR[(i2 * 3 + ri) % NEAR.length] : FAR[(i2 + ri) % FAR.length]}
          size={r.size}
          z={z + (6 - ri) * 3 + (i2 % 2)} at={0}
          loop={(i2 + ri) % 2 === 0 ? 0 : 2}
          /* ⛔⛔⛔ `lerpHex` IS HEX-IN AND rgb()-OUT, SO IT DOES NOT NEST.
             The first build wrote `lerpHex(dark, lerpHex(c, dark2, tone), on)`
             and the inner call returned "rgb(r,g,b)", which the outer one then
             parsed as hex -> NaN -> an invalid colour the browser drew BLACK.
             The company got DARKER as the lamps came up, which is exactly
             backwards, and nothing about the code looked wrong. `dkh` is
             hex-in/hex-out, so the rank's base value is computed with dkh alone
             and lerpHex is applied EXACTLY ONCE, last.
             This is the same trap AgnWorld's own header records for
             `dark()`/`mix()`; it applies to `lerpHex` too. */
          /* ⭐ THE UNLIT VALUE IS THE SUBJECT'S OWN, AND LIFTING IT IS THE
             SANCTIONED FIX. At dkh 0.72 the unlit company was 28% brightness
             and frame 0 measured 122 against a 140 bar; reel 109 hit the same
             wall and the answer there was to lift the silhouette's own value
             (0.19 -> 0.36), never the palette's dark stop. At dkh 0.46 the
             company still steps visibly as each lamp fires. */
          /* ⭐⭐ BRIGHTNESS IS THE MEAN, HIERARCHY IS THE SPREAD, AND THEY ONLY
             FIGHT IF YOU REACH FOR THE SUBJECT. Lifting the unlit company to
             dkh 0.46 bought frame-0 luma and flattened the reveal to nothing —
             the ten-reel regression in §8, reproduced in one shot. The crowd
             goes back to a real dark-to-light step and the MEAN is carried by
             the ROOM instead: the lit cornice, the marquee, the division boards
             and the lit floor. */
          tint={lerpHex(dkh(c, 0.66), dkh(c, r.tone * 0.42), 0.08 + 0.92 * on)} />
      ));
    })}</>
  );
};

/** The lamp bar that does the revealing. Seven fixtures, and each one snaps on
    hard rather than fading, because a stepped land is worth more than an ease
    to both the eye and the audit. */
export const LampRun: React.FC<{ y: number; lit: number; n?: number; z?: number;
  c?: string; rev?: boolean }> = ({ y, lit, n = 7, z = 88, c = "#FFE3A6", rev = false }) => (
  <>
    <div style={{ position: "absolute", left: -30, top: y, width: W + 60, height: 13,
      zIndex: z, background: "linear-gradient(180deg,#4A4E56,#191C22)" }} />
    {Array.from({ length: n }).map((_, i) => {
      const j = rev ? n - 1 - i : i;
      const on = E(lit, j / n * 0.92, j / n * 0.92 + 0.1, 0, 1, OUT);
      const x = 60 + i * ((W - 120) / (n - 1));
      return (
        <React.Fragment key={i}>
          <div style={{ position: "absolute", left: x - 4, top: y + 10, width: 8, height: 20,
            zIndex: z, background: "#2A2E36" }} />
          <div style={{ position: "absolute", left: x - 34, top: y + 28, width: 68, height: 46,
            zIndex: z, borderRadius: "9px 9px 5px 5px",
            background: "linear-gradient(168deg,#3C424C,#14171C)" }} />
          <div style={{ position: "absolute", left: x - 27, top: y + 70, width: 54, height: 17,
            zIndex: z + 1, borderRadius: "0 0 15px 15px",
            background: lerpHex("#5A5648", c, on) }} />
          {/* the shaped cone it throws. ⛔ A CONE, never a full-frame fill —
              light is always shaped (THE-OPEN, reel 78's third rejected draft) */}
          {on > 0.02 && (
            <div style={{ position: "absolute", left: x - 210, top: y + 84, width: 420, height: 560,
              zIndex: z - 60, opacity: on * 0.72, pointerEvents: "none",
              clipPath: "polygon(43% 0%, 57% 0%, 100% 100%, 0% 100%)",
              background: `linear-gradient(180deg, ${hexa(c, 0.55)}, transparent 78%)` }} />
          )}
        </React.Fragment>
      );
    })}
  </>
);

/* =========================================================================
   ⭐⭐⭐ THE SAFETY CURTAIN — the hook's moving object.

   Alex, round 2: *"we need to see like a GATE OPENING, need to see more
   animations, the animations are not interesting enough whatsoever especially
   the beginning. Reference the other hooks."*

   So I frame-stripped them instead of reasoning from memory, six frames each:
     94 AGENCY   a SEALED shutter fills the frame, then ROLLS UP across the
                 whole panel to reveal a floor of Claudes at desks
     119 OX      a pen with an ox behind bars; the ox WALKS OUT through the gate
     120 UNLAZY  a Claude inflates a DONE balloon until it fills half the frame
     135 MINE    six near-identical frames of a crowd standing still

   ⛔ THE GAP IS NOT DENSITY AND IT IS NOT POLISH. Every reference hook has ONE
   BIG OBJECT TRAVELLING A LONG DISTANCE. Mine had lights coming up on a static
   crowd, which is a STATE CHANGE, not an action — §11 exactly: an ACTION is a
   DISTANCE, and under about a third of its own size it does not read at all.

   This is a theatre's iron safety curtain: riveted plate, a bottom weight bar,
   side guides and counterweight chains. It fills the panel at frame 0 carrying
   the claim, and it LIFTS ~700px, which is the single largest swept area
   available in a 792px panel. ⛔ It is deliberately NOT reel 94's corrugated
   shop shutter — same proven mechanic, different object and different world,
   because a second corrugated shutter would read as a repost.
   ====================================================================== */
export const SafetyCurtain: React.FC<{ f: number; lift: number; z?: number;
  crack?: number }> = ({ f, lift, z = 74, crack = 0 }) => {
  const H0 = 812;
  /* ⛔ BOTTOM-HEAVY IS A COMPOSITION DEFECT, NOT A PROP SHORTAGE, and the fix is
     what hangs OVERHEAD. At a 96px pelmet the top two thirds of the revealed
     shot was dead beige wall; at 330px the raised iron stays in frame as a
     heavy dark mass that frames the company and gives the eye a ceiling. */
  const y = -lift * (H0 - 330);
  const judder = crack > 0 && lift < 0.02 ? Math.sin(f * 2.1) * 3 * crack : 0;
  return (
    <>
      {/* the counterweight lines running up either side, always visible */}
      {[36, 976].map((x, i) => (
        <div key={"cw" + i} style={{ position: "absolute", left: x - 5, top: -20,
          width: 10, height: 300 + lift * 420, zIndex: z + 2,
          background: `repeating-linear-gradient(180deg, ${dkh(BRASS, 0.34)} 0 8px, ${dkh(BRASS, 0.62)} 8px 15px)` }} />
      ))}
      {/* the side guides the curtain runs in — they stay put, which is what
          tells you the curtain is the thing that moved */}
      {[0, 966].map((x, i) => (
        <div key={"g" + i} style={{ position: "absolute", left: x, top: -20, width: 46,
          height: 832, zIndex: z + 3,
          background: `linear-gradient(${i ? 270 : 90}deg, #4A505C, #21252C)` }} />
      ))}

      <div style={{ position: "absolute", left: 0, top: y + judder, width: W, height: H0,
        zIndex: z, background: `linear-gradient(178deg, #C8CDD6 0%, #9AA2AE 42%, #6E7684 100%)`,
        boxShadow: "0 26px 44px rgba(10,12,20,0.5)" }}>
        {/* horizontal plate courses with rivet rows — this is what makes a big
            flat object read as IRON instead of as a grey rectangle */}
        {Array.from({ length: 9 }).map((_, r) => (
          <React.Fragment key={r}>
            <div style={{ position: "absolute", left: 0, top: 46 + r * 84, width: W, height: 5,
              background: hexa("#3A4049", 0.5) }} />
            {Array.from({ length: 17 }).map((_, c) => (
              <div key={c} style={{ position: "absolute", left: 26 + c * 58, top: 30 + r * 84,
                width: 11, height: 11, borderRadius: "50%",
                background: "radial-gradient(circle at 34% 30%, #E4E8EE, #6A727E)" }} />
            ))}
          </React.Fragment>
        ))}
        {/* the cast claim plate, bolted on, carrying the numbers and the seal */}
        <div style={{ position: "absolute", left: W / 2 - 330, top: 236, width: 660, height: 250,
          borderRadius: 10, background: `linear-gradient(166deg, #FBF6E8, ${CREAMB} 60%, #E0D6BC)`,
          border: `9px solid ${dkh(BRASS, 0.36)}`, boxShadow: SH_D,
          display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "center", gap: 8 }}>
          <div style={{ ...ui(58, 900), color: INK, letterSpacing: 2.6 }}>{R.name}</div>
          <div style={{ display: "flex", gap: 12 }}>
            <span style={{ ...ui(24, 800), color: dkh(OXIDE, 0.08), letterSpacing: 1 }}>
              {R.agents} SPECIALISTS
            </span>
            <span style={{ ...ui(24, 800), color: hexa(INK, 0.34) }}>·</span>
            <span style={{ ...ui(24, 800), color: dkh(INDIGO, 0.08), letterSpacing: 1 }}>
              {R.divisions} DIVISIONS
            </span>
          </div>
          {/* the SEAL — it BREAKS before the curtain moves, so the shot promises
              the lift a beat before it happens */}
          <div style={{ position: "relative", marginTop: 6, width: 250, height: 56 }}>
            {[-1, 1].map((k) => (
              <div key={k} style={{ position: "absolute", left: 0, top: 0, width: 250, height: 56,
                borderRadius: 8, background: `linear-gradient(160deg, ${RED}, ${dkh(RED, 0.4)})`,
                border: `4px solid ${dkh(RED, 0.55)}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                clipPath: k < 0 ? "inset(0 50% 0 0)" : "inset(0 0 0 50%)",
                transform: `translateX(${k * crack * 46}px) rotate(${k * crack * 7}deg)`,
                ...ui(26, 900), color: "#FFF2E2", letterSpacing: 3 }}>SEALED</div>
            ))}
          </div>
        </div>
        {/* the bottom weight bar — the heavy edge that sweeps the frame */}
        <div style={{ position: "absolute", left: -6, bottom: 0, width: W + 12, height: 54,
          background: `linear-gradient(180deg, #3A4049, #14171C)`,
          borderTop: `6px solid ${dkh(BRASS, 0.3)}` }}>
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} style={{ position: "absolute", left: 22 + i * 68, top: 18,
              width: 26, height: 18, borderRadius: 3, background: dkh(BRASS, 0.28) }} />
          ))}
        </div>
      </div>
    </>
  );
};

/* =========================================================================
   ⭐⭐⭐ S1 REBUILT — THE STAR FALL.

   Alex: *"scene 2 and scene 3 need to be redone to be way more interesting,
   way more motion and stuff going on."*

   The old scene was a wooden board with a counter ticking 0 -> 149,734 and a
   few gold tiles seating. Diagnosed off its own frame strip: the ONLY thing
   that changed in 4.8 seconds was a NUMERAL. That is §3's container and §4's
   "information delivered as type" at the same time, and the house rule is
   explicit — **a number MOVES to its value, it is never typeset at it.**

   The claim is that the world voted for this repo, enormously. So the stars
   arrive as OBJECTS: they rain in from above the frame, they PILE UP on the
   floor, and the pile buries the plate and rises past the hero's waist. The
   count is a CONSEQUENCE of the pile rather than a label on a board.

   ⛔ Every star is >= 44px so it survives the audit's 1012->240 downsample, and
   they fall on staggered clocks with their own drift and spin — a field that
   translates as one object repaints nothing. */
export const StarRain: React.FC<{ f: number; n?: number; z?: number; at?: number;
  rate?: number; y0?: number; y1?: number }> =
  ({ f, n = 26, z = 66, at = 0, rate = 1, y0 = -160, y1 = 700 }) => (
  <>{Array.from({ length: n }).map((_, i) => {
    const period = 42 + (i % 7) * 9;
    const t = ((f - at) * rate * 1.6 + i * 17) % period;
    if (t < 0) return null;
    const k = t / period;
    const x = 22 + ((i * 137) % 96) / 96 * 968;
    const sz = 44 + (i % 5) * 15;
    const yy = y0 + (y1 - y0) * k * k;                 /* gravity, not a drift */
    const spin = (f + i * 31) * (3.4 + (i % 3));
    return (
      <div key={"sr" + i} style={{ position: "absolute", left: x - sz / 2, top: yy,
        width: sz, height: sz, zIndex: z + (i % 3),
        transform: `rotate(${spin}deg)`, opacity: k > 0.94 ? 0 : 1 }}>
        <svg width={sz} height={sz} viewBox="0 0 24 24">
          <path d="M12 2.6l2.9 5.9 6.5.95-4.7 4.6 1.1 6.5L12 17.5 6.2 20.5l1.1-6.5L2.6 9.45l6.5-.95z"
            fill={GOLD} stroke={dkh(GOLD, 0.45)} strokeWidth="1.4" />
        </svg>
      </div>
    );
  })}</>
);

/** The pile the rain builds. It is drawn as real stars packed in rows, not a
    shaded mound, so a viewer can COUNT the near ones — countable real content
    is the other half of the density finding. */
export const StarPile: React.FC<{ y: number; fill: number; z?: number; f?: number;
  cx?: number; span0?: number }> =
  ({ y, fill, z = 70, f = 0, cx = 506, span0 = 1012 }) => {
  /* ⛔ THE PILE USED TO SPREAD THE FULL PANEL WIDTH, which turned the one thing
     the scene is about into a floor-wide texture. It is now a compact MOUND
     centred on the crate the stars came out of — so the arrival leaves
     something behind and it leaves it in the right place. */
  const ROWS = 5;
  return (
    <>{Array.from({ length: ROWS }).map((_, r) => {
      const on = E(fill, r / ROWS * 0.86, r / ROWS * 0.86 + 0.22, 0, 1, OUT);
      if (on <= 0.01) return null;
      const cnt = 13 - r * 2;
      const sz = 66 - r * 4;
      const span = 1012 - r * 108;
      return Array.from({ length: cnt }).map((_, i) => {
        const x = cx - span / 2 + (span / (cnt + 1)) * (i + 1);
        const jitter = ((i * 29 + r * 13) % 11) - 5;
        const settle = 1 - Math.exp(-(fill * 26 - r * 4)) ;
        return (
          <div key={`sp${r}-${i}`} style={{ position: "absolute",
            left: x - sz / 2 + jitter * 3, top: y - r * 46 - sz / 2 + (1 - on) * -70,
            width: sz, height: sz, zIndex: z + r, opacity: on,
            transform: `rotate(${((i * 47 + r * 23) % 60) - 30}deg) scale(${0.8 + 0.2 * on})` }}>
            <svg width={sz} height={sz} viewBox="0 0 24 24">
              <path d="M12 2.6l2.9 5.9 6.5.95-4.7 4.6 1.1 6.5L12 17.5 6.2 20.5l1.1-6.5L2.6 9.45l6.5-.95z"
                fill={r < 2 ? GOLD : dkh(GOLD, r * 0.13)} stroke={dkh(GOLD, 0.5)} strokeWidth="1.2" />
            </svg>
          </div>
        );
      });
    })}</>
  );
};

/* =========================================================================
   ⭐⭐⭐ S2 REBUILT — THE DELIVERY.

   The line is *"you GET a massive team of specialist agents"* and the old scene
   drew a rail of EMPTY SHIRTS. A garment is a container for the idea of a
   specialist; the noun is AGENTS and an agent is a Claude. I half-fixed this
   once by putting a crowd under the rail and leaving the shirts as the subject.

   ⛔ It also cannot just be "the whole company" again — the HOOK is already
   that image, and one prop in two scenes is one prop too many.

   So this is the verb instead: they are DELIVERED. A belt runs the full width
   overhead, Claudes ride in on it, and each one DROPS off the end into a
   formation that builds up on the floor. The counter climbs because the ranks
   are filling, not on its own. Full-width travelling band + many large objects
   arriving continuously + sprites over slabs, which is every row of §1's table
   at once. */
export const DropLine: React.FC<{ f: number; y: number; fill: number; z?: number;
  rate?: number; n?: number }> = ({ f, y, fill, z = 54, rate = 7.4, n = 7 }) => {
  const PITCH = 168;
  const off = ((f * rate) % PITCH + PITCH) % PITCH;
  return (
    <>
      {/* the belt: a full-width high-contrast band, light and shadow alternating
          so every boundary is a luma edge */}
      <div style={{ position: "absolute", left: -40, top: y, width: W + 80, height: 26,
        zIndex: z + 6, background: `linear-gradient(180deg, ${mxh(STEEL, 0.3)}, ${dkh(STEEL, 0.55)})` }} />
      {Array.from({ length: Math.ceil((W + PITCH * 2) / PITCH) }).map((_, i) => (
        <div key={"bt" + i} style={{ position: "absolute", left: -PITCH + i * PITCH - off,
          top: y + 4, width: PITCH * 0.46, height: 18, zIndex: z + 7,
          background: hexa("#0A0C10", 0.55) }} />
      ))}
      {/* the riders, each dropping off the end on its own clock */}
      {Array.from({ length: n }).map((_, i) => {
        const period = 30;
        const t = ((f * rate) / PITCH * 30 + i * (period / n)) % period;
        const ride = t / period;
        const x = W + 60 - ride * (W + 160);
        const dropping = x < 300;
        const dk = dropping ? Math.min(1, (300 - x) / 240) : 0;
        return (
          <Crew key={"rd" + i} f={f + i * 11} x={x} y={y - 8 + dk * dk * 300}
            i={[0, 1, 3, 5, 6, 8, 11][i % 7]} size={104} z={z + 9}
            at={0} loop={i % 2 === 0 ? 0 : 2} />
        );
      })}
    </>
  );
};

/** The formation the delivery builds: ranks that fill left to right as the
    count climbs, so the number on the plate is visibly the OUTPUT. */
export const Formation: React.FC<{ f: number; fill: number; z?: number }> =
  ({ f, fill, z = 60 }) => {
  const RANKS = [
    { n: 7, size: 118, y: 706, tone: 0.00 },
    { n: 9, size: 92, y: 640, tone: 0.20 },
    { n: 11, size: 74, y: 590, tone: 0.38 },
  ];
  return (
    <>{RANKS.map((r, ri) => {
      const span = 940 - ri * 40;
      const pitch = span / (r.n + 1);
      return Array.from({ length: r.n }).map((_, i) => {
        const at = (ri * 0.24 + (i / r.n) * 0.7) * 0.92;
        const on = E(fill, at, at + 0.14, 0, 1, BACK);
        if (on <= 0.02) return null;
        return (
          <Crew key={`fm${ri}-${i}`} f={f + ri * 9 + i * 5}
            x={(1012 - span) / 2 + pitch * (i + 1)} y={r.y - (1 - on) * 46}
            i={[1, 11, 3, 0, 6, 5][(i + ri) % 6]} size={r.size * (0.7 + 0.3 * on)}
            z={z + (3 - ri) * 4} at={0} loop={(i + ri) % 2 === 0 ? 0 : 2}
            tint={lerpHex(CLAY, dkh(CLAY, 0.5), r.tone)} />
        );
      });
    })}</>
  );
};

/* =========================================================================
   ⭐⭐⭐ THE MARCH — the hook, rebuilt again.

   Alex: *"the hook is not interesting whatsoever... it's just everyone like
   bouncing around, not interesting. It actually has to attract the attention."*

   Exactly right, and it is a named failure: **AN ACTION LOOP IS NOT A SCENE**
   (docs/ANIMATION-QUALITY §10). The curtain lift was a real event, but it was
   over by f50 and what it revealed was 85 sprites each running PACE or HOP in
   place. Everybody was busy and NOTHING WAS HAPPENING — the same note reel 110
   got on eight sprites, here on eighty-five.

   ⛔ AND IT WAS ALSO A ROOM, NOT AN IMAGE. 85 sprites + 18 division boards + a
   marquee + a curtain is four competing ideas; `feedback_hook_simplicity` wants
   ONE dominant thing on an empty stage. The boards are gone from the hook — that
   countable content belongs in the body, where a viewer has time to read it.

   ⭐ So the mass does ONE thing, in unison, toward camera: it MARCHES OUT. Four
   ranks, four synchronised STEPS, each step a discrete land with a stomp, a
   squash and dust — §1's "N discrete pops beat one long tween", at the scale of
   a whole company. Each step brings them closer and BIGGER, so the frame fills
   as they advance and the front rank ends cropped by the bottom edge.

   A crowd advancing on the viewer in step is a single legible image with real
   weight. A crowd bobbing in place is wallpaper made of characters. */
export const March: React.FC<{ f: number; go: number; z?: number; dx?: number;
  c?: string; steps?: number }> =
  ({ f, go, z = 40, dx = 0, c = CLAY, steps = 4 }) => {
  if (go <= 0.001) return null;
  /* the unison clock: a hard step, then a settle, then the next */
  const prog = go * steps;
  const k = Math.min(steps, Math.floor(prog));
  const frac = prog - k;
  const land = Math.exp(-frac * 9);                 /* the squash on each land */
  /* ⛔ FIVE RANKS AT FIVE VALUES WAS A CROWD OF INDIVIDUALS AND IT UNRANKED THE
     SHOT. Two ranks, painted close together, read as ONE MASS advancing — which
     is the single thing this beat is about. Hierarchy is a VALUE decision
     before it is a count decision. */
  /* ⛔⛔ HIERARCHY IS VALUE, NOT SIZE. The ranks were painted at tone 0.00 and
     0.16 — within a shade of the hero's own clay — so a 358px hero and a 168px
     marcher read as the SAME WEIGHT and the frame had no subject, just a hedge
     of heads. `feedback_eyecatch_is_value_structure`: the shape that works is a
     pale cool ground with a NEAR-BLACK MASS THAT ARRIVES. The company is now
     that mass — two ranks, deep in value, reading as one silhouette — and the
     hero is the only lit clay figure in the frame. */
  const RANKS = [
    { n: 5, size: 150, y: 690, tone: 0.52 },
    { n: 8, size: 112, y: 606, tone: 0.68 },
  ];

  /* ⛔ AT 78px PER STEP THE COMPANY MARCHED OUT OF FRAME and the shot EMPTIED at
     exactly the beat it should have peaked on. 46px advances them visibly while
     the last step still lands inside the panel, so the frame is fullest on the
     final beat. */
  const ADV = 46;                                   /* px gained per step */
  const GROW = 0.20;                                /* size gained per step */
  return (
    <>{RANKS.map((r, ri) => {
      const adv = k + frac * 0.35;                  /* mostly stepped, slight ease */
      /* ⛔ PITCH HAS TO GROW WITH SIZE. The first build grew each sprite 26% per
         step against a FIXED span, so by the last step the ranks were ~2x their
         starting size at their starting spacing and the whole company merged
         into one clay mass — `reel-sprite-grounding-law` broken by animation
         rather than by layout. The rank SPREADS as it advances, so
         `spacing >= 0.85 x size` holds at every step, and the ones pushed off
         the sides are simply cropped, which is what an advancing rank does. */
      const size = r.size * (1 + GROW * adv);
      const span = (940 - ri * 46) * (1 + GROW * adv);
      const pitch = span / (r.n + 1);
      const yy = r.y + ADV * adv;
      return Array.from({ length: r.n }).map((_, i) => (
        <div key={`mc${ri}-${i}`} style={{ position: "absolute", left: 0, top: 0,
          zIndex: z + (4 - ri) * 4 + (i % 2),
          transform: `scaleY(${1 - land * 0.09}) scaleX(${1 + land * 0.06})`,
          transformOrigin: `${(1012 - span) / 2 + pitch * (i + 1) + dx}px ${yy}px` }}>
          <Crew f={f + ri * 13 + i * 7}
            x={(1012 - span) / 2 + pitch * (i + 1) + dx}
            y={yy} i={[1, 11, 3, 0, 6, 8][(i + ri) % 6]} size={size}
            z={z + (4 - ri) * 4} at={0} loop={0}
            tint={lerpHex(c, dkh(c, 0.52), r.tone)} />
        </div>
      ));
    })}
    {/* the dust each step throws off the boards — an arrival that costs nothing
        is a state change, and eighty bodies landing costs a lot */}
    {Array.from({ length: steps }).map((_, si) => (
      <Puff key={"md" + si} x={506 + dx} y={690 + ADV * si + 40} f={f}
        at={Math.round((si / steps) * 82) + 2} c="#D8CDB4" z={z + 24} n={12} s={2.1} up={-0.2} />
    ))}
    </>
  );
};

/* =========================================================================
   ⭐⭐⭐ EVENTS, NOT PROCESSES.

   Alex: *"at 5 seconds that scene sucks... there's not actually a beginning and
   end part for each scene, it's literally just bouncing up and down doing
   nothing."*

   Correct, and it is §2's four-part test failing in a way a motion audit is
   blind to. My last pass gave the weak scenes CONTINUOUS AMBIENT PROCESSES —
   stars raining forever, a belt running forever — because continuous motion
   scores well. But a process has no before state, no trigger and no arrival, so
   nothing ever HAPPENS in it; it is weather. **A scene needs a beginning, a
   middle and an end.**

   `StarBurst` is the rain rebuilt as an EVENT: the stars are LAUNCHED from a
   single source at a single frame, they arc under gravity, and they LAND and
   STOP. The count locks when the last one lands. There is a before, a trigger,
   travel and an arrival that costs something. */
export const StarBurst: React.FC<{ f: number; at: number; x: number; y: number;
  n?: number; z?: number; land?: number }> =
  ({ f, at, x, y, n = 30, z = 66, land = 96 }) => (
  <>{Array.from({ length: n }).map((_, i) => {
    const t0 = at + (i % 6) * 2.2;                 /* the burst is a spray, not a pulse */
    const life = land - (i % 6) * 2.2;
    const t = f - t0;
    if (t < 0 || t > life) return null;
    const u = t / life;
    /* launched up and out, then gravity brings it down to the floor line */
    const ang = -Math.PI * (0.16 + ((i * 37) % 68) / 100);
    const spd = 320 + ((i * 53) % 60) * 7;
    const px = x + Math.cos(ang) * spd * u * (i % 2 ? 1 : -1) * 0.62;
    const py = y + Math.sin(ang) * spd * u + 1180 * u * u;
    const sz = 46 + (i % 5) * 16;
    const spin = t * (7 + (i % 4) * 3) * (i % 2 ? 1 : -1);
    return (
      <div key={"sb" + i} style={{ position: "absolute", left: px - sz / 2, top: py - sz / 2,
        width: sz, height: sz, zIndex: z + (i % 3), transform: `rotate(${spin}deg)` }}>
        <svg width={sz} height={sz} viewBox="0 0 24 24">
          <path d="M12 2.6l2.9 5.9 6.5.95-4.7 4.6 1.1 6.5L12 17.5 6.2 20.5l1.1-6.5L2.6 9.45l6.5-.95z"
            fill={GOLD} stroke={dkh(GOLD, 0.45)} strokeWidth="1.4" />
        </svg>
      </div>
    );
  })}</>
);

/** The source the burst comes OUT of, and the before state the scene opens on:
    a shut crate carrying the repo's own mark. It is drawn CLOSED and legible —
    empty is the promise — then its lid tears off on the trigger frame. */
export const RepoCrate: React.FC<{ x: number; y: number; f: number; open: number;
  s?: number; z?: number }> = ({ x, y, f, open, s = 1, z = 58 }) => {
  const WD = 300 * s, HT = 210 * s;
  const lid = E(open, 0, 1, 0, 1, OUT);
  return (
    <div style={{ position: "absolute", left: x - WD / 2, top: y - HT, width: WD, height: HT, zIndex: z }}>
      {/* the body: real boards, banded iron, and the mark on the face */}
      <div style={{ position: "absolute", left: 0, top: 34 * s, width: WD, height: HT - 34 * s,
        background: `linear-gradient(168deg, ${mxh(OXIDE, 0.24)}, ${dkh(OXIDE, 0.42)})`,
        borderRadius: 5 * s, boxShadow: SH_D }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ position: "absolute", left: 0, top: 16 * s + i * 46 * s,
            width: WD, height: 4 * s, background: hexa("#000", 0.28) }} />
        ))}
        {[10, WD - 34].map((bx, i) => (
          <div key={i} style={{ position: "absolute", left: bx * (s / s), top: 6 * s, width: 24 * s,
            height: HT - 52 * s, background: dkh(SLATE, 0.3), borderRadius: 3 * s }} />
        ))}
        <div style={{ position: "absolute", left: WD / 2 - 34 * s, top: 40 * s }}>
          <RealMark src="github.svg" s={62 * s} z={2} />
        </div>
      </div>
      {/* the lid — it TEARS OFF and flies, which is the trigger the burst needs */}
      <div style={{ position: "absolute", left: -6 * s + lid * -90 * s,
        top: 20 * s - lid * 190 * s, width: WD + 12 * s, height: 40 * s,
        background: `linear-gradient(180deg, ${mxh(OXIDE, 0.34)}, ${dkh(OXIDE, 0.3)})`,
        borderRadius: 5 * s, transform: `rotate(${-lid * 26}deg)`, boxShadow: SH,
        transformOrigin: "20% 100%" }} />
    </div>
  );
};

/** The crate that DELIVERS the team: it falls, it SLAMS, it bursts apart, and
    the formation is standing where it landed. A beginning, a middle and an end
    in 52 frames. */
export const DropCrate: React.FC<{ x: number; y: number; f: number; at: number;
  s?: number; z?: number }> = ({ x, y, f, at, s = 1, z = 70 }) => {
  const fall = E(f, at, at + 12, 0, 1, IN_Q);
  const burst = E(f, at + 12, at + 22, 0, 1, OUT);
  if (burst >= 1) return null;
  const WD = 340 * s, HT = 230 * s;
  return (
    <div style={{ position: "absolute", left: x - WD / 2, top: y - HT - (1 - fall) * 620,
      width: WD, height: HT, zIndex: z, opacity: 1 - burst }}>
      {[-1, 1].map((k) => (
        <div key={k} style={{ position: "absolute", left: k < 0 ? 0 : WD / 2, top: 0,
          width: WD / 2, height: HT, transformOrigin: k < 0 ? "100% 100%" : "0% 100%",
          transform: `translateX(${k * burst * 190}px) rotate(${k * burst * 34}deg)`,
          background: `linear-gradient(168deg, ${mxh(OXIDE, 0.22)}, ${dkh(OXIDE, 0.44)})`,
          borderTop: `${5 * s}px solid ${dkh(BRASS, 0.3)}` }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ position: "absolute", left: 0, top: 26 * s + i * 56 * s,
              width: "100%", height: 4 * s, background: hexa("#000", 0.26) }} />
          ))}
        </div>
      ))}
      <div style={{ position: "absolute", left: WD / 2 - 40 * s, top: HT / 2 - 40 * s,
        opacity: 1 - burst * 2 }}>
        <RealMark src="claude.svg" s={70 * s} z={2} />
      </div>
    </div>
  );
};

/* =========================================================================
   ⭐⭐⭐ THE HERO INTRO — the 0-10s rework.

   Alex: *"between 0-10 seconds a lot of these animations... needs to be so much
   revised and improved, to show like an agency, maybe kind of like a SUPERHERO
   INTRODUCTION, interesting stuff here."*

   That is a specific and very good register for this subject: the repo's whole
   pitch is 273 NAMED characters with personalities, and the character-select /
   team-assemble intro is the one film language that says "a roster of
   specialists" instantly. It also fixes the thing every previous round kept
   circling — a sprite standing in a crowd has no identity, and an intro gives
   each one a NAME, a POSE, a LIGHT and a BEAT OF ITS OWN.

   The beat is four parts, hard-cut, ~14 frames each:
     1. a hard SPOTLIGHT snaps down out of black
     2. the character DROPS in and lands in a power pose, with a squash
     3. a NAME PLATE slams in from the side carrying the real title + division
     4. a colour ring bursts and the light settles

   ⛔ The pose is `cheer` (both arms up, from the Mascot's own rig) — NOT a
   hand-drawn limb. Reel 110 spent two rounds hanging geometry off the body and
   it read as a tail; the rig already raises and rotates its own arms.
   ====================================================================== */
export const HeroIntro: React.FC<{ f: number; at: number; x: number; y: number;
  role: string; div: string; c: string; costume: number; size?: number;
  z?: number; flip?: boolean; showPlate?: boolean; plateW?: number;
  plateDy?: number; tint?: string; icon?: number }> =
  ({ f, at, x, y, role, div, c, costume, size = 210, z = 70, flip = false,
     showPlate = true, plateW = 264, plateDy = 0, tint, icon }) => {
  const t = f - at;
  if (t < -2) return null;
  const light = E(t, 0, 5, 0, 1, OUT);              /* the snap, not a fade */
  const drop = E(t, 3, 11, 0, 1, IN_Q);
  const land = Math.exp(-Math.max(0, t - 11) / 5);  /* the squash on the land */
  const plate = E(t, 12, 19, 0, 1, BACK);
  const pose = E(t, 11, 16, 0, 1, OUT);
  return (
    <>
      {/* the shaped cone. ⛔ A CONE, never a full-frame wash — light is always
          shaped (THE-OPEN, reel 78's third rejected draft). */}
      <div style={{ position: "absolute", left: x - 176, top: y - 560, width: 352, height: 560,
        zIndex: z - 6, opacity: light * 0.72, pointerEvents: "none",
        clipPath: "polygon(41% 0%, 59% 0%, 100% 100%, 0% 100%)",
        background: `linear-gradient(180deg, ${hexa(vivid(c, 0.2), 0.85)}, transparent 84%)` }} />
      {/* the pool it throws on the boards */}
      <div style={{ position: "absolute", left: x - 150, top: y - 46, width: 300, height: 92,
        zIndex: z - 5, borderRadius: "50%", opacity: light * 0.8,
        background: `radial-gradient(ellipse, ${hexa(vivid(c, 0.3), 0.6)} 0%, transparent 72%)` }} />

      <div style={{ position: "absolute", left: 0, top: 0, zIndex: z,
        transform: `scaleY(${1 - land * 0.16}) scaleX(${1 + land * 0.11})`,
        transformOrigin: `${x}px ${y}px` }}>
        {/* ⭐ THE SPRITE WEARS ITS DIVISION. Alex: *"have the diff colored
            claude sprites for each door section ... so its more obvious its
            distinguisehd"*. A coloured PLATE over a clay sprite makes the
            label the distinguishing mark; colouring the sprite makes the
            PERSON the distinguishing mark, which is what he is asking for. */}
        <Crew f={f} x={x} y={y - (1 - drop) * 420} i={costume} size={size} z={z}
          at={at + 3} loop={2} cheer={pose} flip={flip} tint={tint} />
      </div>

      {/* the impact the landing costs */}
      {t > 11 && t < 30 && (
        <>
          <Ring x={x} y={y} f={f} at={at + 11} c={vivid(c, 0.3)} z={z + 2} s={1.3} dur={15} />
          <Puff x={x} y={y + 6} f={f} at={at + 11} c="#D6CCB8" z={z + 1} n={9} s={1.3} />
        </>
      )}

      {/* ⭐ THE NAME PLATE, ABOVE the character. Below it fell off the bottom of
          the panel — the ground line is at y 706 and the panel ends at 792, so
          there is never room under a standing sprite. Above is also simply how
          a roster introduction is framed.
          ⛔ `showPlate` is off wherever the set already carries the name (the
          dressing-room lintels), because two plates for one character is the
          duplicate-receipt defect one layer up. */}
      {/* ⭐⭐⭐ AN ICON, NOT A NAME. Alex: *"instead of text above the sprites it
          should be like graphics icons that represent those things."* He is
          right and the VO agrees — the line here is *"you get a massive team of
          specialist agents"* and never names a role, so a 16px job title was
          asking the viewer to read five labels in 1.7 seconds. A drawn browser,
          a poster mid-burst, a shield, a knot of speech bubbles and an artboard
          say the same five things at a glance. */}
      {showPlate && icon !== undefined && (
        <div style={{ position: "absolute", left: x - 74, top: y - size - 150 + plateDy,
          width: 148, height: 148, zIndex: z + 6, opacity: plate, borderRadius: 14,
          transform: `translateY(${(1 - plate) * -34}px) scale(${0.7 + 0.3 * plate})`,
          background: `linear-gradient(168deg, ${dkh(c, 0.10)}, ${dkh(c, 0.42)})`,
          border: `6px solid ${mxh(c, 0.16)}`, boxShadow: SH_D, overflow: "hidden" }}>
          <RoleIcon i={icon} c={c} />
        </div>
      )}
      {showPlate && icon === undefined && (
      <div style={{ position: "absolute", left: x - plateW / 2, top: y - size - 84 + plateDy, width: plateW,
        zIndex: z + 6, opacity: plate,
        transform: `translateX(${(1 - plate) * (flip ? 150 : -150)}px) skewX(${(1 - plate) * -14}deg)`,
        background: BONE, borderRadius: 5, boxShadow: SH_D,
        border: `4px solid ${dkh(c, 0.3)}`, overflow: "hidden" }}>
        <div style={{ background: dkh(c, 0.16), ...mono(13, 700), color: "#FFF8E8",
          padding: "3px 0", textAlign: "center", letterSpacing: 1.4 }}>{div}</div>
        <div style={{ ...ui(16, 900), color: INK, padding: "6px 5px", textAlign: "center",
          lineHeight: 1.08 }}>{role}</div>
      </div>)}
    </>
  );
};

/* =========================================================================
   ⭐⭐⭐ THE MULTIPLICATION — the hook, scrapped and replaced.

   Alex: *"the animations for the first 5 seconds need to be scrapped and made
   so much more interesting concepts."*

   ⛔⛔⛔ AND THE REASON EVERY PREVIOUS HOOK FELT THE SAME IS THAT THEY WERE THE
   SAME SHAPE. Laid out, the four rejected concepts are one concept:

     a key driving into a lock        -> a container OPENS, the agency is inside
     lamps revealing a standing crowd -> a container OPENS (the dark), ditto
     an iron curtain lifting          -> a container OPENS, ditto
     a crate whose lid tears off      -> a container OPENS, ditto

   `feedback_repeated_note_means_wrong_object`: the second time a note lands on
   the same object you stop tuning it and replace the CONCEPT. The object here
   was never the curtain or the crate — it was REVEAL-BY-OPENING, and no amount
   of restaging a reveal makes it a different idea.

   ⭐ So nothing opens. The line is *"YOU can OWN a full AI agency"*, and the
   new mechanism is a TRANSFORMATION: one Claude becomes the agency. He splits,
   the two split, the four split, and five doublings later the frame is a
   company. It starts on ONE dominant figure on an empty stage — which is what
   `feedback_hook_simplicity` has asked for the whole time — and the scale
   arrives as an EVENT rather than as a curtain going up on a finished crowd.

   ⛔ THE ORIGINAL STAYS BIG AND CENTRAL THROUGHOUT. Hierarchy is not a
   casualty of the multiplication: every copy is smaller and painted deeper, so
   there is always exactly one subject.
   ====================================================================== */
export const Multiply: React.FC<{ f: number; steps: number[]; x: number; y: number;
  z?: number; c?: string; dx?: number }> =
  ({ f, steps, x, y, z = 60, c = CLAY, dx = 0 }) => {
  /* which doubling are we in, and how far through it */
  let k = 0;
  for (let i = 0; i < steps.length; i++) if (f >= steps[i]) k = i + 1;
  const RING = [
    { n: 0, size: 300, r: 0, tone: 0 },
    { n: 1, size: 252, r: 212, tone: 0.16 },
    { n: 2, size: 214, r: 330, tone: 0.30 },
    { n: 4, size: 176, r: 420, tone: 0.44 },
    { n: 8, size: 136, r: 470, tone: 0.56 },
    { n: 16, size: 100, r: 508, tone: 0.66 },
  ];
  const out: React.ReactNode[] = [];
  for (let ri = 1; ri <= Math.min(k, RING.length - 1); ri++) {
    const R0 = RING[ri];
    const born = steps[ri - 1];
    const grow = E(f, born, born + 9, 0, 1, BACK);
    const total = R0.n;
    for (let i = 0; i < total; i++) {
      /* fan out along an arc either side of the original, alternating */
      const side = i % 2 === 0 ? -1 : 1;
      const idx = Math.floor(i / 2);
      const spread = total <= 2 ? 1 : (idx + 1) / Math.ceil(total / 2);
      const ang = spread * 0.92;
      const px = x + dx + side * Math.sin(ang) * R0.r * grow;
      const py = y - Math.cos(ang) * R0.r * 0.20 * grow - ri * 8 * grow;
      out.push(
        <Crew key={`mu${ri}-${i}`} f={f + ri * 11 + i * 6} x={px} y={py}
          i={[1, 11, 3, 0, 6, 8, 5, 2][(i + ri) % 8]}
          size={R0.size * (0.35 + 0.65 * grow)} z={z + (6 - ri) * 3 + (i % 2)}
          at={born} loop={(i + ri) % 2 === 0 ? 0 : 2}
          tint={lerpHex(c, dkh(c, 0.62), R0.tone)} />
      );
    }
  }
  return <>{out}</>;
};

/* =========================================================================
   ⭐⭐⭐ THE OVATION — S1, scrapped and replaced.

   The line is *"it already has over 135,000 stars on GitHub"*, and a star count
   is not weather and not a crate of treasure: **it is a crowd of people who
   each chose to give one.** Drawing it as anything else loses the only fact
   that makes the number mean something.

   So the house is full and in the dark, facing a lit repo plate upstage, and
   every star in the storm is THROWN BY SOMEBODY — launched from a seat, arcing
   over the stalls and landing on the mark. The audience rows are silhouettes
   cropped by the bottom edge, which is also the near-camera crowd band the look
   audit asks for by eye.

   ⛔ It is deliberately not another container: nothing opens, nothing is
   revealed. A crowd gives something away and the thing it is given to fills up.
   ====================================================================== */
export const Ovation: React.FC<{ f: number; at: number; tx: number; ty: number;
  n?: number; z?: number; span?: number }> =
  ({ f, at, tx, ty, n = 58, z = 66, span = 128 }) => (
  <>{Array.from({ length: n }).map((_, i) => {
    const t0 = at + (i * 3.1) % span;
    const life = 34;
    const t = f - t0;
    if (t < 0 || t > life) return null;
    const u = t / life;
    /* launched from a seat somewhere in the house, arcing onto the plate */
    const sx = 40 + ((i * 61) % 100) / 100 * 932;
    const sy = 636 + ((i * 37) % 5) * 44;
    const px = sx + (tx - sx) * u;
    const py = sy + (ty - sy) * u - Math.sin(Math.PI * u) * (210 + (i % 4) * 46);
    const sz = 40 + (i % 4) * 14;
    const fade = u > 0.9 ? (1 - u) * 10 : 1;
    return (
      <div key={"ov" + i} style={{ position: "absolute", left: px - sz / 2, top: py - sz / 2,
        width: sz, height: sz, zIndex: z + (i % 3), opacity: fade,
        transform: `rotate(${t * (9 + (i % 3) * 4)}deg)` }}>
        <svg width={sz} height={sz} viewBox="0 0 24 24">
          <path d="M12 2.6l2.9 5.9 6.5.95-4.7 4.6 1.1 6.5L12 17.5 6.2 20.5l1.1-6.5L2.6 9.45l6.5-.95z"
            fill={GOLD} stroke={dkh(GOLD, 0.45)} strokeWidth="1.4" />
        </svg>
      </div>
    );
  })}</>
);

/** The house: rows of silhouetted heads facing away from camera, cropped by the
    bottom edge. ⛔ Near-black on purpose — they are the DARK MASS and the lit
    plate upstage is the subject. */
export const House: React.FC<{ f: number; z?: number; rows?: number; c?: string }> =
  ({ f, z = 80, rows = 3, c = CLAY }) => (
  <>{Array.from({ length: rows }).map((_, r) => {
    const n = 7 + r * 2;
    const y = 700 + r * 96;
    const size = 176 + r * 44;
    const span = 1060 + r * 60;
    const pitch = span / (n + 1);
    return Array.from({ length: n }).map((_, i) => (
      <React.Fragment key={`hs${r}-${i}`}>
        {/* shoulders, then a head — two shapes read as a person where one
            rounded rectangle reads as a blob */}
        <div style={{ position: "absolute",
          left: (1012 - span) / 2 + pitch * (i + 1) - size * 0.62,
          top: y + size * 0.34 + Math.sin(f / 21 + i * 1.3 + r) * 4,
          width: size * 1.24, height: size * 0.62, zIndex: z + r,
          borderRadius: `${size * 0.34}px ${size * 0.34}px 0 0`,
          background: lerpHex(dkh(c, 0.82), dkh(c, 0.70), (i % 3) / 3) }} />
        <div style={{ position: "absolute",
          left: (1012 - span) / 2 + pitch * (i + 1) - size * 0.29,
          top: y + Math.sin(f / 21 + i * 1.3 + r) * 4,
          width: size * 0.58, height: size * 0.46, zIndex: z + r,
          borderRadius: `${size * 0.2}px`,
          background: lerpHex(dkh(c, 0.80), dkh(c, 0.66), (i % 3) / 3) }} />
      </React.Fragment>
    ));
  })}</>
);

/* =========================================================================
   ⭐⭐⭐ THE CLIMB — 0-7s, rebuilt against the AGENTS bar.

   Alex: *"we have to see it like an actual good animation like AGENTS here, and
   also I want to see like the metal screen going up. Way more interesting
   concept. 0-7 seconds needs to be scrapped and redone."*

   So I frame-stripped AGENTS' first seven seconds instead of guessing, and what
   it does is specific and repeatable:

     1. a hazard-striped METAL SHUTTER lifts out of frame
     2. behind it is a building IN CUTAWAY — floors stacked vertically
     3. the camera CLIMBS, floor after floor, continuously
     4. every floor is a DIFFERENT COLOUR with its own DIVISION LABEL and its
        own crew of Claudes visibly working
     5. a counter climbs with the camera

   That is why it reads as dense and alive: the travel never stops, and every
   second of it brings a new colour, a new label and a new set of bodies. My
   version had one flat room and asked five doublings to carry seven seconds.

   ⚠️ AGENCY AND AGENTS MUST NOT BE THE SAME PICTURE (Alex has already pushed
   them apart once). The MECHANISM is shared because he asked for it; the WORLD
   is not — AGENTS climbs an office block of engineers at desks, this climbs a
   PLAYHOUSE in cutaway, tier by tier, and its labels are the repo's own 18
   divisions rather than job titles. Flagged to Alex either way.
   ====================================================================== */

/** The hazard-striped metal screen Alex asked for, back and doing the job it
    was doing before: it fills the panel, carries the claim, and LIFTS. ⛔ This
    is the same mechanism AGENTS opens on, at his explicit request. */
export const MetalScreen: React.FC<{ f: number; lift: number; z?: number }> =
  ({ f, lift, z = 84 }) => {
  const H0 = 830;
  const y = -lift * H0;
  return (
    <>
      {[0, 966].map((x, i) => (
        <div key={"g" + i} style={{ position: "absolute", left: x, top: -20, width: 46,
          height: 832, zIndex: z + 3,
          background: `linear-gradient(${i ? 270 : 90}deg, #4A505C, #21252C)` }} />
      ))}
      <div style={{ position: "absolute", left: 0, top: y, width: W, height: H0, zIndex: z,
        background: "linear-gradient(178deg, #CDD2DA 0%, #9EA6B2 44%, #737B88 100%)",
        boxShadow: "0 26px 44px rgba(10,12,20,0.5)" }}>
        {/* the corrugation: real slats with a lit top edge each */}
        {Array.from({ length: 15 }).map((_, r) => (
          <React.Fragment key={r}>
            <div style={{ position: "absolute", left: 0, top: r * 54, width: W, height: 54,
              background: `linear-gradient(180deg, ${hexa("#FFFFFF", 0.22)} 0%, transparent 34%, ${hexa("#000000", 0.20)} 100%)` }} />
            <div style={{ position: "absolute", left: 0, top: r * 54 + 52, width: W, height: 3,
              background: hexa("#39404B", 0.7) }} />
          </React.Fragment>
        ))}
        {/* ⭐ THE HAZARD BAND — the detail that makes a grey rectangle read as a
            SHUTTER rather than as a wall, and the thing AGENTS' screen has. */}
        {[96, H0 - 150].map((by, i) => (
          <div key={i} style={{ position: "absolute", left: 0, top: by, width: W, height: 46,
            background: "repeating-linear-gradient(115deg,#E8B22C 0 34px,#22252B 34px 68px)" }} />
        ))}
        {/* the claim, stencilled on the steel */}
        <div style={{ position: "absolute", left: W / 2 - 320, top: 214, width: 640, height: 214,
          borderRadius: 10, background: `linear-gradient(166deg, #FBF6E8, ${CREAMB} 60%, #E0D6BC)`,
          border: `9px solid ${dkh(BRASS, 0.36)}`, boxShadow: SH_D,
          display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "center", gap: 10 }}>
          {/* ⭐ THE CLAUDE MARK ON THE STEEL. It is the house brand and the only
              tool the VO names, so it belongs on the thing the viewer looks at
              for the whole first second. GitHub stays beside it, smaller —
              the repo is the source, Claude is the runtime. */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <RealMark src="claude.svg" s={64} z={3} />
            <div style={{ width: 3, height: 44, background: hexa(INK, 0.16) }} />
            <RealMark src="github.svg" s={44} z={3} />
          </div>
          <div style={{ ...ui(50, 900), color: INK, letterSpacing: 2.4 }}>{R.name}</div>
          <div style={{ ...ui(21, 800), color: dkh(OXIDE, 0.08), letterSpacing: 1 }}>
            {R.agents} SPECIALISTS · {R.divisions} DIVISIONS
          </div>
        </div>
        {/* the pull bar at the foot — the heavy edge that sweeps the frame */}
        <div style={{ position: "absolute", left: -6, bottom: 0, width: W + 12, height: 56,
          background: "linear-gradient(180deg,#3A4049,#14171C)",
          borderTop: `6px solid ${dkh(BRASS, 0.3)}` }} />
      </div>
    </>
  );
};


/* ---------------------------------------------------------------------------
   THE AGENCY ASSEMBLES AROUND YOU.

   ⭐⭐⭐ Alex, on the climb: *"i want to see a different more interesting
   concept as well here like instead of just a long building but like something
   else more interesting"*. The climb was right about the KIND of shot — a
   continuous travel, which has no moment to find boring — and wrong about the
   subject, because a building is architecture and the sentence is about PEOPLE.

   So the travel stays and the subject changes: you stand alone in a pool of
   light, and an entire agency ARRIVES AROUND YOU, ring after ring, each ring a
   division in its own colour, while the camera pulls back to keep up. The
   hierarchy is literal — one figure at the centre, everything else orbiting it
   — which is the "one main thing" note answered by the staging rather than by
   cropping something out.

   ⛔ THE RINGS OPEN TOWARDS CAMERA (a horseshoe, not a circle). A closed ring
   puts a third of the agency in FRONT of the hero, and the one main thing ends
   up behind the extras.
------------------------------------------------------------------------- */
export const AgencyRings: React.FC<{ f: number; grow: number; cx: number;
  cy: number; z?: number; dx?: number }> = ({ f, grow, cx, cy, z = 40, dx = 0 }) => {
  const RINGS = [
    { r: 210, n: 6,  d: 0 }, { r: 330, n: 9,  d: 1 },
    { r: 452, n: 12, d: 2 }, { r: 580, n: 14, d: 3 },
    { r: 712, n: 16, d: 4 },
  ];
  /* ⛔ 0.34 PUT THE WHOLE AGENCY IN THE BOTTOM THIRD and left two thirds of the
     panel empty. The ellipse has to be round enough that the far rings climb
     the frame — that is what makes it read as a crowd going back rather than a
     line standing along the footlights. */
  const SQUASH = 0.62;                       /* how flat the ellipse reads */
  const FAR = RINGS[RINGS.length - 1].r * SQUASH;
  return (
    <>{RINGS.map((ring, ri) => {
      const dv = DIVS[ring.d];
      return Array.from({ length: ring.n }).map((_, i) => {
        /* theta walks the BACK half only, so nobody stands in front of you */
        const th = Math.PI * ((i + 0.5) / ring.n);
        const y = cy - Math.sin(th) * ring.r * SQUASH;
        const x = cx + Math.cos(th) * ring.r + dx * (1 - ri * 0.14);
        /* each ring lands as a unit, and inside it the two ends land first —
           so the agency closes AROUND you rather than sweeping past */
        const seat = Math.abs(Math.cos(th));
        const at = ri * 0.168 + (1 - seat) * 0.11;
        const on = E(grow, at, at + 0.15, 0, 1, BACK);
        if (on <= 0.02) return null;
        const depth = (cy - y) / FAR;                      /* 0 near .. 1 far */
        const size = 168 * (1 - 0.50 * depth);
        return (
          <Crew key={`ar${ri}-${i}`} f={f + ri * 11 + i * 7}
            x={x} y={y + (1 - on) * 54} i={dv.cos[i % dv.cos.length]}
            size={size * (0.72 + 0.28 * on)} z={z + Math.round((1 - depth) * 22)}
            at={0} loop={(i + ri) % 3 === 0 ? 1 : (i % 2 ? 0 : 2)}
            tint={dkh(dv.c, depth * 0.44)} flip={Math.cos(th) > 0} />
        );
      });
    })}</>
  );
};

/* the division names, flicking on around the formation as each ring lands */
export const RingLabels: React.FC<{ grow: number; cx: number; cy: number;
  z?: number }> = ({ grow, cx, cy, z = 76 }) => {
  const SPOT = [
    { d: 0, x: -256, y: -26 }, { d: 1, x: 214, y: -104 }, { d: 2, x: -376, y: -184 },
    { d: 3, x: 268, y: -268 }, { d: 4, x: -150, y: -352 },
  ];
  return (
    <>{SPOT.map((sp, i) => {
      const on = E(grow, i * 0.168 + 0.12, i * 0.168 + 0.21, 0, 1, BACK);
      if (on <= 0.03) return null;
      const dv = DIVS[sp.d];
      return (
        <div key={dv.name} style={{ position: "absolute", left: cx + sp.x, top: cy + sp.y,
          zIndex: z, ...mono(17, 800), letterSpacing: 1.3, color: BONE,
          background: hexa(dkh(dv.c, 0.46), 0.94), borderRadius: 5,
          border: `3px solid ${mxh(dv.c, 0.22)}`, padding: "4px 10px",
          transform: `scale(${on})`, boxShadow: SH }}>{dv.name}</div>
      );
    })}</>
  );
};

/* ---------------------------------------------------------------------------
   THE FIELD OF STARS.

   ⭐⭐⭐ 149,734 stars drawn as 149,734 PEOPLE, because that is what they are.
   A dark house receding to the back wall, every seat a silhouette, and one by
   one they raise a lit star — scattered, never sweeping, so it fills the way a
   real crowd lights up. The count is the output of the field, not a ticker.

   ⛔ This is the third attempt at the beat and the first that gives the frame
   any CONTENT. A plate in an empty room measured well and looked like nothing;
   a pile of stars would have been treasure, which is the one reading that
   throws away the fact that somebody chose to give each one.
------------------------------------------------------------------------- */
export const StarField: React.FC<{ f: number; on: number; z?: number;
  dx?: number }> = ({ f, on, z = 40, dx = 0 }) => {
  const ROWS = [
    { y: 690, n: 9,  s: 1.00 }, { y: 612, n: 11, s: 0.86 },
    { y: 546, n: 13, s: 0.74 }, { y: 490, n: 15, s: 0.64 },
    { y: 442, n: 17, s: 0.55 }, { y: 402, n: 19, s: 0.47 },
    { y: 368, n: 21, s: 0.41 }, { y: 340, n: 23, s: 0.36 },
  ];
  const total = ROWS.reduce((a, r) => a + r.n, 0);
  let seen = 0;
  return (
    <>{ROWS.map((r, ri) => {
      const span = 1120 + ri * 60;
      const pitch = span / (r.n + 1);
      const base = seen; seen += r.n;
      return Array.from({ length: r.n }).map((_, i) => {
        /* scattered order — a sweep reads as a wipe, not as a crowd */
        const rank = (base + i) * 7919 % total;
        const lit = E(on, rank / total, rank / total + 0.10, 0, 1, OUT);
        const x = (W - span) / 2 + pitch * (i + 1) + dx * (1 - ri * 0.09);
        const hw = 26 * r.s, hh = 30 * r.s;
        return (
          <React.Fragment key={`sf${ri}-${i}`}>
            {/* the head and shoulders, always there, always dark */}
            <div style={{ position: "absolute", left: x - hw, top: r.y - hh, width: hw * 2,
              height: hh, zIndex: z + ri, borderRadius: `${hw}px ${hw}px 4px 4px`,
              background: lerpHex("#161B24", "#4A3A22", lit * 0.7) }} />
            <div style={{ position: "absolute", left: x - hw * 1.5, top: r.y - hh * 0.16,
              width: hw * 3, height: hh * 0.8, zIndex: z + ri, borderRadius: `${hw}px ${hw}px 0 0`,
              background: lerpHex("#10141B", "#3E3018", lit * 0.7) }} />
            {/* the star it raises */}
            {lit > 0.02 && (
              <>
                <div style={{ position: "absolute", left: x - 30 * r.s, top: r.y - hh - 42 * r.s,
                  width: 60 * r.s, height: 60 * r.s, zIndex: z + ri, borderRadius: "50%",
                  background: `radial-gradient(circle, ${hexa("#FFD98A", 0.62 * lit)} 0%, transparent 68%)` }} />
                <div style={{ position: "absolute", left: x - 8 * r.s, top: r.y - hh - 20 * r.s,
                  width: 16 * r.s, height: 16 * r.s, zIndex: z + ri + 1,
                  background: hexa("#FFE9B8", 0.55 + 0.45 * lit),
                  transform: `rotate(45deg) scale(${0.7 + 0.3 * lit})`,
                  clipPath: "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)" }} />
              </>
            )}
          </React.Fragment>
        );
      });
    })}</>
  );
};

/* ---------------------------------------------------------------------------
   THE ROLE SIGN — a DRAWN emblem over each dressing-room door.

   ⭐⭐⭐ Alex: *"on top of the doors i see like the graphics of the signs
   showing like the front end designers, back end the designers whatever. but in
   actuality i want to make it more interesting, like some graphic for that ...
   overall more interesting graphics above the doors and coming out and
   representing what's being spoken."*

   The old card was 15px type in a 184px box: at reel size, three grey smudges.
   This is a big lit sign carrying a DRAWN thing — a laid-out browser window, a
   headline poster mid-burst, a wizard's hat over the real Reddit mark — with
   the plain-English role the VO actually says in large type under it, and the
   repo's exact role name kept small beneath that so the honesty holds.
------------------------------------------------------------------------- */
export const RoleSign: React.FC<{ x: number; y: number; i: number; f: number;
  at: number; s?: number; z?: number }> = ({ x, y, i, f, at, s = 1, z = 64 }) => {
  const c = R.cast[i];
  const SAID = ["FRONT-END DESIGNER", "AD WRITER", "REDDIT WIZARD"][i];
  const k = E(f, at, at + 12, 0, 1, BACK);
  if (k <= 0.01) return null;
  const t = f - at;
  const WD = 270 * s, HT = 214 * s;
  const lit = E(t, 6, 16, 0, 1, OUT);
  return (
    <div style={{ position: "absolute", left: x - WD / 2, top: y - HT, width: WD, height: HT,
      zIndex: z, transform: `scale(${k}) translateY(${(1 - k) * -26}px)`,
      transformOrigin: "50% 100%" }}>
      {/* the sign box */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 9 * s, overflow: "hidden",
        background: `linear-gradient(168deg, ${BONE}, #D8CFB6)`,
        border: `${5 * s}px solid ${dkh(c.c, 0.30)}`, boxShadow: SH_D }}>
        {/* the emblem plate it sits on */}
        <div style={{ position: "absolute", left: 0, top: 0, width: WD, height: 128 * s,
          background: `linear-gradient(172deg, ${dkh(c.c, 0.12)}, ${dkh(c.c, 0.46)})`,
          overflow: "hidden" }}>
          {i === 0 && (
            /* a laid-out page: chrome bar, sidebar, two content blocks */
            <>
              <div style={{ position: "absolute", left: 40 * s, top: 20 * s, width: 190 * s,
                height: 90 * s, background: "#F3ECD8", borderRadius: 4 * s,
                border: `${3 * s}px solid ${dkh(c.c, 0.62)}` }} />
              <div style={{ position: "absolute", left: 40 * s, top: 20 * s, width: 190 * s,
                height: 18 * s, background: dkh(c.c, 0.55) }} />
              {[0, 1, 2].map((d) => (
                <div key={d} style={{ position: "absolute", left: (48 + d * 12) * s, top: 25 * s,
                  width: 7 * s, height: 7 * s, borderRadius: "50%", background: hexa("#FFF", 0.7) }} />
              ))}
              <div style={{ position: "absolute", left: 48 * s, top: 46 * s, width: 46 * s,
                height: 56 * s, background: hexa(c.c, 0.55), borderRadius: 3 * s }} />
              {[0, 1, 2].map((r2) => (
                <div key={r2} style={{ position: "absolute", left: 102 * s, top: (48 + r2 * 18) * s,
                  width: (120 - r2 * 28) * s, height: 10 * s, borderRadius: 3 * s,
                  background: hexa(dkh(c.c, 0.5), 0.5 + 0.3 * lit) }} />
              ))}
            </>
          )}
          {i === 1 && (
            /* a poster mid-burst: a headline slab, a rule, and rays going out */
            <>
              {Array.from({ length: 10 }).map((_, r2) => (
                <div key={r2} style={{ position: "absolute", left: WD / 2 - 2 * s, top: 64 * s,
                  width: 4 * s, height: 96 * s, transformOrigin: "50% 0%",
                  transform: `rotate(${r2 * 36}deg) scaleY(${0.5 + 0.5 * lit})`,
                  background: hexa("#FFE7B0", 0.30) }} />
              ))}
              <div style={{ position: "absolute", left: 52 * s, top: 30 * s, width: 166 * s,
                height: 68 * s, background: "#F3ECD8", borderRadius: 4 * s,
                border: `${3 * s}px solid ${dkh(c.c, 0.62)}`, padding: `${9 * s}px ${10 * s}px` }}>
                <div style={{ width: "100%", height: 15 * s, borderRadius: 3 * s,
                  background: dkh(c.c, 0.34) }} />
                <div style={{ width: "62%", height: 10 * s, borderRadius: 3 * s, marginTop: 7 * s,
                  background: hexa(dkh(c.c, 0.5), 0.6) }} />
                <div style={{ width: "42%", height: 10 * s, borderRadius: 3 * s, marginTop: 6 * s,
                  background: hexa(dkh(c.c, 0.5), 0.4) }} />
              </div>
            </>
          )}
          {i === 2 && (
            /* the REAL Reddit mark, under a drawn wizard's hat */
            <>
              {Array.from({ length: 7 }).map((_, st) => (
                <div key={st} style={{ position: "absolute",
                  left: (26 + st * 34) * s, top: (24 + ((st * 29) % 68)) * s,
                  width: 9 * s, height: 9 * s, background: hexa("#FFE9B8", 0.35 + 0.5 * lit),
                  clipPath: "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)" }} />
              ))}
              <div style={{ position: "absolute", left: WD / 2 - 34 * s, top: 52 * s,
                width: 68 * s, height: 68 * s, borderRadius: "50%", background: "#FFF",
                display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Img src={staticFile("logos/reddit.svg")}
                  style={{ width: 58 * s, height: 58 * s }} />
              </div>
              {/* the hat, drawn: a brim and a bent cone with a band */}
              <div style={{ position: "absolute", left: WD / 2 - 56 * s, top: 44 * s,
                width: 112 * s, height: 14 * s, borderRadius: 7 * s,
                background: `linear-gradient(180deg, ${mxh(VIOLET, 0.22)}, ${dkh(VIOLET, 0.5)})` }} />
              <div style={{ position: "absolute", left: WD / 2 - 34 * s, top: -6 * s,
                width: 68 * s, height: 56 * s,
                clipPath: "polygon(62% 0%, 100% 100%, 0% 100%)",
                background: `linear-gradient(160deg, ${mxh(VIOLET, 0.16)}, ${dkh(VIOLET, 0.42)})` }} />
              <div style={{ position: "absolute", left: WD / 2 - 30 * s, top: 34 * s,
                width: 60 * s, height: 11 * s, background: dkh(GOLD, 0.06) }} />
            </>
          )}
        </div>
        {/* what the VO calls it, big — then the repo's exact role, small */}
        <div style={{ position: "absolute", left: 0, top: 128 * s, width: WD, height: 86 * s,
          padding: `${9 * s}px ${8 * s}px`, textAlign: "center" }}>
          <div style={{ ...ui(25 * s, 900), color: INK, lineHeight: 1.04 }}>{SAID}</div>
          <div style={{ ...mono(12 * s, 700), color: hexa(INK, 0.52), marginTop: 5 * s,
            letterSpacing: 0.6 * s }}>{c.div} · {c.role}</div>
        </div>
      </div>
    </div>
  );
};

/* ---------------------------------------------------------------------------
   THE SPEC CARD — one specialist's PERSONALITY and PROCESS, at a size you can
   actually read.

   ⭐⭐⭐ Alex: *"the animation at twelve seconds ... it needs to be completely
   redone ... right now it's really hard to see what's going on, like the
   personality, stuff like that. this doesn't really represent the information
   that's being spoken."*

   The beat it replaces drew both halves correctly and drew them at 224px wide,
   twice, side by side, under a camera that then pushed in to 1.26 and cropped
   them. Three correct diagrams nobody can read is the same as no diagram.

   ⛔ SO THE CARD IS 540px WIDE AND ONLY ONE IS CENTRED AT A TIME. The row
   travels, each card dwells in the middle while its process ticks, and the two
   neighbours sit small and dim at the edges — which is what makes "they ALL
   have their OWN" a comparison rather than a claim.
------------------------------------------------------------------------- */
const SPEC = [
  { trait: "METHODICAL",     dial: 0.26, steps: ["BRIEF", "DRAFT", "SHIP"],   face: 0 },
  { trait: "PROVOCATIVE",    dial: 0.86, steps: ["HOOK", "TEST", "SCALE"],    face: 1 },
  { trait: "CONVERSATIONAL", dial: 0.58, steps: ["LISTEN", "REPLY", "GROW"],  face: 2 },
] as const;

export const SpecCard: React.FC<{ x: number; y: number; i: number; f: number;
  at: number; k: number; z?: number }> = ({ x, y, i, f, at, k, z = 60 }) => {
  const c = R.cast[i];
  const sp = SPEC[i];
  const WD = 540, HT = 392;
  const t = f - at;
  const dim = 0.42 + 0.58 * k;                   /* the edges sit back */
  const sc = 0.74 + 0.26 * k;
  /* the needle only swings while this card is the one being looked at */
  const swing = sp.dial + Math.sin(f / 9 + i * 2) * 0.05 * k;
  return (
    <div style={{ position: "absolute", left: x - WD / 2, top: y - HT, width: WD, height: HT,
      zIndex: z + Math.round(k * 10), transformOrigin: "50% 100%",
      transform: `scale(${sc})`, opacity: dim,
      background: `linear-gradient(162deg, ${BONE}, #DCD3BA)`, borderRadius: 12,
      border: `6px solid ${dkh(c.c, 0.28)}`, boxShadow: SH_D, overflow: "hidden" }}>
      {/* who it is */}
      <div style={{ background: `linear-gradient(90deg, ${dkh(c.c, 0.14)}, ${dkh(c.c, 0.40)})`,
        padding: "9px 16px", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 14, height: 14, borderRadius: 4, background: mxh(c.c, 0.42) }} />
        <div style={{ ...ui(23, 900), color: "#FFF8E8", letterSpacing: 0.6 }}>{c.role}</div>
        <div style={{ marginLeft: "auto", ...mono(13, 700), color: hexa("#FFF8E8", 0.66) }}>
          {c.div}
        </div>
      </div>

      <div style={{ display: "flex", padding: 16, gap: 16 }}>
        {/* PERSONALITY — a drawn face and a needle, and the word said BIG */}
        <div style={{ width: 232 }}>
          <div style={{ ...mono(14, 800), color: hexa(INK, 0.5), letterSpacing: 1.6 }}>
            {R.halves[0]}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8 }}>
            {/* ⛔ flexShrink:0. A flex child with explicit width still shrinks,
                and the 30px trait word squeezed this portrait down to a smudge. */}
            <svg width={70} height={74} viewBox="0 0 54 58" style={{ flexShrink: 0 }}>
              <rect x="6" y="8" width="42" height="44" rx="12" fill={vivid(c.c, 0.06)} />
              <rect x="6" y="8" width="42" height="16" rx="12" fill={dkh(c.c, 0.24)} />
              <circle cx="19" cy="32" r="4.4" fill="#1A1813" />
              <circle cx="35" cy="32" r="4.4" fill="#1A1813" />
              {/* the mouth is the temperament: flat, wide, or open */}
              {sp.face === 0 && <rect x="18" y="42" width="18" height="3.4" rx="1.7" fill="#1A1813" />}
              {sp.face === 1 && <path d="M17 40 Q27 50 37 40" stroke="#1A1813" strokeWidth="3.4" fill="none" strokeLinecap="round" />}
              {sp.face === 2 && <ellipse cx="27" cy="43" rx="7" ry="5" fill="#1A1813" />}
            </svg>
            <div style={{ ...ui(28, 900), color: dkh(c.c, 0.30), lineHeight: 1.02 }}>
              {sp.trait}
            </div>
          </div>
          {/* the needle, on a track, so the trait is a POSITION not a label */}
          <div style={{ marginTop: 12, height: 16, borderRadius: 8, position: "relative",
            background: `linear-gradient(90deg, ${dkh(TEAL, 0.34)}, ${dkh(GOLD, 0.20)}, ${dkh(RED, 0.30)})` }}>
            <div style={{ position: "absolute", left: `${swing * 100}%`, top: -7, width: 10,
              height: 30, borderRadius: 4, marginLeft: -5, background: BONE,
              border: `3px solid ${dkh(c.c, 0.4)}`, boxShadow: SH }} />
          </div>
        </div>

        {/* PROCESS — three steps that TICK while this card is centred */}
        <div style={{ flex: 1 }}>
          <div style={{ ...mono(14, 800), color: hexa(INK, 0.5), letterSpacing: 1.6 }}>
            {R.halves[1]}
          </div>
          {sp.steps.map((st, j) => {
            const on = E(t, 6 + j * 7, 13 + j * 7, 0, 1, OUT);
            return (
              <div key={st} style={{ display: "flex", alignItems: "center", gap: 9, marginTop: 9,
                background: hexa(dkh(c.c, 0.3), 0.10 + 0.16 * on), borderRadius: 6,
                padding: "6px 9px",
                borderLeft: `5px solid ${on > 0.5 ? mxh(c.c, 0.2) : hexa(INK, 0.14)}` }}>
                <div style={{ width: 22, height: 22, borderRadius: 5, ...mono(13, 800),
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: on > 0.5 ? dkh(c.c, 0.24) : hexa(INK, 0.12),
                  color: on > 0.5 ? "#FFF8E8" : hexa(INK, 0.4) }}>{j + 1}</div>
                <div style={{ ...ui(19, 800), color: hexa(INK, 0.35 + 0.6 * on) }}>{st}</div>
                <div style={{ marginLeft: "auto", ...ui(17, 900), color: dkh(GREEN, 0.14),
                  opacity: on, transform: `scale(${0.6 + 0.4 * on})` }}>✓</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* ---------------------------------------------------------------------------
   THE TOOL BOARD — the seven real marks, big enough to recognise.

   ⭐⭐⭐ Alex: *"for the animation at sixteen seconds i want to see logos of top
   companies instead of those text boxes — those text boxes are too small to be
   able to see."* He is right: the beat was carrying a 42-cell roster of 11px
   role chips, which at reel size is grey noise, while the seven marks that
   actually mean something sat in a 122px lamp rail behind it.

   So the marks become the hero artifact. Each one lands, rings, and ticks; the
   count the roster used to spell out in 42 pieces is one number underneath.
   ⛔ REAL LOGOS ONLY — never an invented glyph for a real company.
------------------------------------------------------------------------- */
export const ToolBoard: React.FC<{ x: number; y: number; fill: number; f: number;
  at: number; s?: number; z?: number; open?: number }> =
  ({ x, y, fill, f, at, s = 1, z = 56, open = 1 }) => {
  if (open <= 0.02) return null;
  const WD = 872 * s, HT = 396 * s;
  const shown = Math.round(R.agents * fill);
  const TH = 148 * s;
  return (
    <div style={{ position: "absolute", left: x - WD / 2, top: y - HT, width: WD, height: HT,
      zIndex: z, borderRadius: 12 * s, boxShadow: SH_D, padding: 14 * s,
      transformOrigin: "50% 100%", transform: `scaleY(${open})`,
      background: `linear-gradient(166deg, ${dkh(SLATE, 0.30)}, ${dkh(SLATE, 0.62)})`,
      border: `${7 * s}px solid ${dkh(BRASS, 0.4)}` }}>
      {/* the header rail */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 * s, marginBottom: 10 * s }}>
        <RealMark src="claude.svg" s={30 * s} z={3} />
        <div style={{ ...ui(21 * s, 900), color: "#F6EFDC", letterSpacing: 1 * s }}>
          WORKS IN
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "baseline", gap: 7 * s,
          background: hexa("#000", 0.42), borderRadius: 6 * s, padding: `${3 * s}px ${12 * s}px` }}>
          <div style={{ ...mono(30 * s, 800), color: GOLD }}>{shown}</div>
          <div style={{ ...mono(15 * s, 700), color: hexa("#F6EFDC", 0.66) }}>AGENTS INSTALLED</div>
        </div>
      </div>
      {/* the marks — four then three, Claude Code first because it is the only
          tool the VO names */}
      <div style={{ display: "grid", gridTemplateColumns: `repeat(4, 1fr)`, gap: 9 * s }}>
        {R.tools.map((t, i) => {
          const on = E(f, at + i * 5, at + 12 + i * 5, 0, 1, BACK);
          const lit = E(f, at + 6 + i * 5, at + 15 + i * 5, 0, 1, OUT);
          if (on <= 0.02) return <div key={t.n} style={{ height: TH }} />;
          return (
            <div key={t.n} style={{ height: TH, borderRadius: 8 * s, position: "relative",
              transform: `scale(${on})`, overflow: "hidden",
              background: `linear-gradient(168deg, ${hexa(t.c, 0.16 + 0.14 * lit)}, ${hexa("#000", 0.34)})`,
              border: `${4 * s}px solid ${hexa(t.c, 0.30 + 0.4 * lit)}`,
              display: "flex", flexDirection: "column", alignItems: "center",
              justifyContent: "center", gap: 7 * s }}>
              {/* ⛔ A LIGHT BACKING PLATE UNDER EVERY MARK. Copilot and Cursor
                  are near-black glyphs, so on a dark tile they rendered as
                  nothing at all while the coloured ones read fine — an accent
                  set is only as legible as its WORST member. */}
              <div style={{ width: 76 * s, height: 76 * s, borderRadius: 10 * s,
                background: `linear-gradient(168deg, #FBF6E8, ${hexa("#D8CFB6", 0.92)})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: SH, opacity: 0.72 + 0.28 * lit }}>
                <Img src={staticFile(`logos/${t.logo}`)}
                  style={{ width: 54 * s, height: 54 * s, objectFit: "contain",
                    filter: `saturate(${0.5 + 0.5 * lit})` }} />
              </div>
              <div style={{ ...ui(16 * s, 900), color: hexa("#FFF6E2", 0.62 + 0.38 * lit),
                letterSpacing: 0.5 * s, whiteSpace: "nowrap" }}>{t.n}</div>
              {/* the tick it earns when it is plugged in */}
              <div style={{ position: "absolute", right: 7 * s, top: 6 * s, width: 24 * s,
                height: 24 * s, borderRadius: "50%", background: dkh(GREEN, 0.10),
                ...ui(15 * s, 900), color: "#FFF8E8", display: "flex", alignItems: "center",
                justifyContent: "center", transform: `scale(${lit})` }}>✓</div>
            </div>
          );
        })}
        {/* the eighth cell states the claim the seven make together */}
        <div style={{ height: TH, borderRadius: 8 * s,
          background: `linear-gradient(168deg, ${hexa(GOLD, 0.18)}, ${hexa("#000", 0.34)})`,
          border: `${4 * s}px dashed ${hexa(GOLD, 0.42)}`, display: "flex",
          flexDirection: "column", alignItems: "center", justifyContent: "center",
          opacity: E(f, at + 34, at + 44, 0, 1, OUT), textAlign: "center" }}>
          <div style={{ ...ui(38 * s, 900), color: GOLD, lineHeight: 1 }}>1</div>
          <div style={{ ...mono(14 * s, 800), color: hexa("#FFF6E2", 0.78), letterSpacing: 0.6 * s }}>
            CLICK
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------------------------------------------------------------------------
   THE COMPOSER — the CTA as something being TYPED, and a repo parcel that is
   already half open.

   ⭐⭐⭐ Alex: *"near the end scene where we have like the comment agency, it
   needs to have more interesting stuff that leads to anticipation, so people
   don't just scroll away immediately."*

   A finished plate reading COMMENT AGENCY is a state. There is nothing left to
   wait for, so the frame gives permission to leave. A word being typed one
   letter at a time with a live caret is UNFINISHED, and an unfinished thing is
   the cheapest anticipation there is — you stay for the last letter. Then the
   send key lands, and the parcel it unlocks is already open a crack, showing
   the thing you get but not all of it.
------------------------------------------------------------------------- */
export const Composer: React.FC<{ x: number; y: number; f: number; at: number;
  s?: number; z?: number }> = ({ x, y, f, at, s = 1, z = 94 }) => {
  const WD = 660 * s, HT = 132 * s;
  const k = E(f, at, at + 10, 0, 1, BACK);
  if (k <= 0.01) return null;
  const t = f - at;
  const word = R.keyword;
  const n = Math.max(0, Math.min(word.length, Math.floor((t - 8) / 4)));
  const done = n >= word.length;
  const send = E(t, 8 + word.length * 4 + 6, 8 + word.length * 4 + 16, 0, 1, BACK);
  const caret = Math.floor(t / 7) % 2 === 0 ? 1 : 0.06;
  return (
    <div style={{ position: "absolute", left: x - WD / 2, top: y, width: WD, height: HT,
      zIndex: z, transform: `scale(${k})`, transformOrigin: "50% 50%",
      background: `linear-gradient(168deg, #FBF6E8, #DED5BC)`, borderRadius: 14 * s,
      border: `${6 * s}px solid ${dkh(BRASS, 0.34)}`, boxShadow: SH_D,
      display: "flex", alignItems: "center", gap: 12 * s, padding: `0 ${18 * s}px` }}>
      {/* ⭐ IT SAYS "COMMENT AGENCY", IN ONE PHRASE, AT ONE SIZE. Alex: *"I don't
          know exactly why it says like AGENCY, there's an Instagram icon — it
          should just say comment agency somewhere there."* The old plate put
          COMMENT in a 15px grey field label and AGENCY in 42px next to an app
          icon, so the two words read as a caption and a headline rather than as
          the instruction they are. The icon is gone; both words are the CTA;
          only the second one still types itself in. */}
      <div style={{ flex: 1, height: 86 * s, borderRadius: 10 * s, background: hexa(INK, 0.06),
        border: `${3 * s}px solid ${hexa(INK, 0.14)}`, display: "flex", alignItems: "center",
        justifyContent: "center", padding: `0 ${14 * s}px`, gap: 3 * s, overflow: "hidden" }}>
        <span style={{ ...ui(40 * s, 900), color: dkh(CLAYD, 0.02), letterSpacing: 0.5 * s,
          marginRight: 12 * s }}>COMMENT</span>
        {word.split("").map((ch, i) => (
          <span key={i} style={{ ...ui(40 * s, 900), color: mxh(CLAY, 0.02),
            opacity: i < n ? 1 : 0,
            transform: `translateY(${i < n ? 0 : 8 * s}px) scale(${i === n - 1 ? 1.14 : 1})`,
            display: "inline-block" }}>{ch}</span>
        ))}
        <span style={{ width: 5 * s, height: 46 * s, background: dkh(CLAYD, 0.02),
          opacity: done ? caret * 0.5 : caret, marginLeft: 3 * s }} />
      </div>
      <div style={{ width: 100 * s, height: 86 * s, borderRadius: 10 * s, flexShrink: 0,
        background: `linear-gradient(168deg, ${mxh(CLAY, 0.10)}, ${dkh(CLAY, 0.30)})`,
        border: `${4 * s}px solid ${dkh(CLAY, 0.46)}`, boxShadow: SH,
        display: "flex", alignItems: "center", justifyContent: "center",
        transform: `scale(${(done ? 1 + 0.05 * Math.sin(f / 4) : 1) - send * 0.10})`,
        opacity: 0.5 + 0.5 * (done ? 1 : 0.5) }}>
        <div style={{ ...ui(22 * s, 900), color: "#FFF6E4", letterSpacing: 0.8 * s }}>SEND</div>
      </div>
    </div>
  );
};

/* the parcel it unlocks — open a crack, never all the way */
export const RepoParcel: React.FC<{ x: number; y: number; f: number; at: number;
  s?: number; z?: number }> = ({ x, y, f, at, s = 1, z = 70 }) => {
  const k = E(f, at, at + 12, 0, 1, BACK);
  if (k <= 0.01) return null;
  const lid = E(f, at + 14, at + 30, 0, 1, OUT) * 0.34;   /* ⛔ a CRACK, not a lid */
  const WD = 230 * s, HT = 176 * s;
  return (
    <div style={{ position: "absolute", left: x - WD / 2, top: y - HT, width: WD, height: HT,
      zIndex: z, transform: `scale(${k})`, transformOrigin: "50% 100%" }}>
      {/* the light coming out of the gap, and what is inside it */}
      <div style={{ position: "absolute", left: 14 * s, top: -30 * s, width: WD - 28 * s,
        height: 74 * s, borderRadius: 6 * s, overflow: "hidden",
        background: `linear-gradient(180deg, ${hexa("#FFE7B0", 0.9 * lid * 3)}, ${hexa("#FFD98A", 0.3)})`,
        opacity: Math.min(1, lid * 3) }}>
        <div style={{ ...mono(21 * s, 800), color: dkh(BRASS, 0.52), textAlign: "center",
          paddingTop: 12 * s }}>{R.agents} AGENTS</div>
      </div>
      {/* the lid, tipped just far enough */}
      <div style={{ position: "absolute", left: 0, top: -12 * s, width: WD, height: 34 * s,
        borderRadius: 5 * s, transformOrigin: "10% 100%",
        transform: `rotate(${-lid * 26}deg)`,
        background: `linear-gradient(180deg, ${mxh(BRASS, 0.24)}, ${dkh(BRASS, 0.40)})`,
        boxShadow: SH }} />
      {/* the box */}
      <div style={{ position: "absolute", left: 0, top: 20 * s, width: WD, height: HT - 20 * s,
        borderRadius: 6 * s, boxShadow: SH_D,
        background: `linear-gradient(166deg, #7A5A32, #4A3620)` }}>
        <div style={{ position: "absolute", left: WD / 2 - 34 * s, top: 22 * s, width: 68 * s,
          height: 68 * s, borderRadius: 10 * s, background: "#F6EFDC",
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Img src={staticFile("logos/github.svg")} style={{ width: 52 * s, height: 52 * s }} />
        </div>
        <div style={{ position: "absolute", left: 0, bottom: 12 * s, width: "100%",
          ...mono(15 * s, 800), color: hexa("#FFF3D0", 0.86), textAlign: "center" }}>
          {R.lic} · {R.price}
        </div>
      </div>
    </div>
  );
};

/* ---------------------------------------------------------------------------
   THE SPEC LANE — one specialist, full height, unmissable.

   ⭐⭐⭐ Alex, on the carousel that replaced the cards: *"each of those scenes at
   twelve seconds is not nearly good enough, not interesting enough and not
   elevated enough whatsoever."* The carousel fixed legibility and stopped
   there — a 540px card sliding is still a card sliding, and only one of the
   three was ever readable at a time, so the sentence's actual claim ("they ALL
   have their own") was never on screen at once.

   Three full-height lanes, side by side, all three visible: its own colour, its
   own header, its own trait on a swinging dial, its own three-step chain
   lighting in sequence, and its own specialist working underneath at 190px. The
   comparison IS the picture.
------------------------------------------------------------------------- */
export const SpecLane: React.FC<{ x: number; w: number; i: number; f: number;
  at: number; z?: number; from?: number }> = ({ x, w, i, f, at, z = 50, from = 0 }) => {
  const c = R.cast[i];
  const sp = SPEC[i];
  const t = f - at;
  const k = E(t, 0, 12, 0, 1, BACK);
  if (k <= 0.01) return null;
  const TOP = 176, BOT = 706, HT = BOT - TOP;
  /* the needle sweeps its whole range and settles, so the trait is an ACT */
  const sweep = E(t, 10, 26, 0, 1, BACK);
  const dial = sp.dial * sweep;
  return (
    <div style={{ position: "absolute", left: x, top: TOP, width: w, height: HT, zIndex: z,
      /* ⛔ IT SLIDES IN ACROSS THE PANEL, NOT UP FROM THE FLOOR. A 190px rise
          repaints 190px; a 620px traverse repaints the width of the frame, and
          this scene measured the reel's floor at 8.40 until the bays travelled. */
      transformOrigin: "50% 100%",
      transform: `translate(${(1 - k) * from}px, ${(1 - k) * 54}px) scaleY(${0.9 + 0.1 * k})`,
      opacity: Math.min(1, k * 1.4), borderRadius: 12,
      background: `linear-gradient(178deg, ${dkh(c.c, 0.52)} 0%, ${dkh(c.c, 0.72)} 62%, ${dkh(c.c, 0.60)} 100%)`,
      border: `5px solid ${dkh(c.c, 0.34)}`, boxShadow: SH_D, overflow: "hidden" }}>
      {/* the lit strip along the top of the bay */}
      <div style={{ position: "absolute", left: 0, top: 0, width: w, height: 8,
        background: hexa("#FFF3D0", 0.5) }} />
      {/* who */}
      <div style={{ margin: "14px 12px 0", padding: "7px 9px", borderRadius: 7,
        background: `linear-gradient(90deg, ${mxh(c.c, 0.10)}, ${dkh(c.c, 0.22)})`,
        ...ui(19, 900), color: "#FFF8E8", textAlign: "center", lineHeight: 1.06 }}>
        {c.role}
      </div>

      {/* PERSONALITY — the word, big, and a needle that swings to find it */}
      <div style={{ margin: "14px 12px 0" }}>
        <div style={{ ...mono(12, 800), color: hexa("#FFF3D0", 0.56), letterSpacing: 1.4 }}>
          {R.halves[0]}
        </div>
        <div style={{ ...ui(28, 900), color: "#FFF8E8", lineHeight: 1.02, marginTop: 3 }}>
          {sp.trait}
        </div>
        <div style={{ marginTop: 9, height: 14, borderRadius: 7, position: "relative",
          background: `linear-gradient(90deg, ${dkh(TEAL, 0.28)}, ${dkh(GOLD, 0.16)}, ${dkh(RED, 0.24)})` }}>
          <div style={{ position: "absolute", left: `${dial * 100}%`, top: -7, width: 9,
            height: 28, borderRadius: 4, marginLeft: -4.5, background: BONE,
            border: `3px solid ${dkh(c.c, 0.44)}`, boxShadow: SH }} />
        </div>
      </div>

      {/* PROCESS — a chain, wired together, lighting one link at a time */}
      <div style={{ margin: "16px 12px 0", position: "relative" }}>
        <div style={{ ...mono(12, 800), color: hexa("#FFF3D0", 0.56), letterSpacing: 1.4 }}>
          {R.halves[1]}
        </div>
        {sp.steps.map((st, j) => {
          const on = E(t, 18 + j * 8, 26 + j * 8, 0, 1, BACK);
          return (
            <React.Fragment key={st}>
              {j > 0 && (
                <div style={{ position: "absolute", left: 17, top: 22 + j * 46 - 12, width: 4,
                  height: 14, background: hexa("#FFF3D0", 0.20 + 0.6 * on) }} />
              )}
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: j ? 12 : 7,
                background: hexa("#000", 0.18 + 0.12 * on), borderRadius: 7, padding: "6px 8px",
                transform: `translateX(${(1 - on) * -18}px)`, opacity: 0.4 + 0.6 * on }}>
                <div style={{ width: 24, height: 24, borderRadius: 6, flexShrink: 0,
                  ...mono(13, 800), display: "flex", alignItems: "center", justifyContent: "center",
                  background: on > 0.5 ? mxh(c.c, 0.24) : hexa("#FFF", 0.12),
                  color: on > 0.5 ? dkh(c.c, 0.62) : hexa("#FFF", 0.4) }}>{j + 1}</div>
                <div style={{ ...ui(17, 800), color: hexa("#FFF8E8", 0.5 + 0.5 * on),
                  whiteSpace: "nowrap" }}>{st}</div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

/* ---------------------------------------------------------------------------
   THE AGENCY FLOOR — six departments, six DIFFERENT jobs, all firing at once.

   ⭐⭐⭐ Alex, on the ring formation: *"the very first scene showing the AI
   agency needs to be scrapped and redone to show more about like AI agency.
   right now it just looks like there's just a lot of people crowding around a
   dude."* He is exactly right, and the reason is already written down: a sprite
   running an action loop is a person who is BUSY, and being busy never says
   what the JOB is. Two hundred and seventy-three busy bodies is a crowd. Six
   visibly DIFFERENT jobs producing six visibly different outputs is an agency.

   ⛔ AND IT IS PARALLEL, WHICH IS THE HALF AGENTS DOES NOT OWN. That reel is a
   build line: one job passing through hands, in sequence. This is one brief
   landing and six departments firing at the same instant.
------------------------------------------------------------------------- */
export const DeptGrid: React.FC<{ f: number; at: number; step?: number;
  z?: number; dx?: number }> = ({ f, at, step = 6, z = 40, dx = 0 }) => {
  const CW = 300, CH = 240, GAP = 16;
  const X0 = (W - (CW * 3 + GAP * 2)) / 2, Y0 = 214;
  return (
    <>{DIVS.map((d, i) => {
      const col = i % 3, row = Math.floor(i / 3);
      const x = X0 + col * (CW + GAP) + dx * (1 - row * 0.2);
      const y = Y0 + row * (CH + GAP);
      const a2 = at + i * step;
      const k = E(f, a2, a2 + 9, 0, 1, BACK);
      if (k <= 0.02) return null;
      const t = f - a2;
      const run = E(t, 8, 40, 0, 1, OUT);          /* the job doing itself */
      const done = E(t, 38, 46, 0, 1, BACK);
      /* ⛔ THEY SLIDE IN FROM THEIR OWN EDGE. Scaling up from 0.9 repaints only
         the station's own 300x240; sliding one in across ~440px repaints the
         path as well, and this scene measured 8.94 — the reel's floor — while
         it was popping them in place.
         ⛔ AND THIS IS A JS COMMENT, NOT A JSX ONE. A braced JSX comment as the
         first thing inside `return (` is an esbuild syntax error, and it has
         now cost this reel two builds. */
      return (
        <div key={d.name} style={{ position: "absolute", left: x, top: y, width: CW, height: CH,
          zIndex: z + i, borderRadius: 10, overflow: "hidden", transformOrigin: "50% 50%",
          transform: `translateX(${(1 - k) * (col === 1 ? 0 : col === 0 ? -440 : 440)}px) `
            + `translateY(${(1 - k) * (col === 1 ? 300 : 0)}px) scale(${0.94 + 0.06 * k})`,
          opacity: Math.min(1, k * 1.5),
          background: `linear-gradient(176deg, ${dkh(d.c, 0.50)}, ${dkh(d.c, 0.72)})`,
          border: `4px solid ${dkh(d.c, 0.32)}`, boxShadow: SH_D }}>
          {/* the department name, and the tick it earns when its job lands */}
          <div style={{ height: 34, background: `linear-gradient(90deg, ${mxh(d.c, 0.08)}, ${dkh(d.c, 0.24)})`,
            display: "flex", alignItems: "center", padding: "0 10px", gap: 8 }}>
            <div style={{ ...mono(15, 800), color: "#FFF8E8", letterSpacing: 1.1 }}>{d.name}</div>
            <div style={{ marginLeft: "auto", width: 22, height: 22, borderRadius: "50%",
              background: dkh(GREEN, 0.10), ...ui(14, 900), color: "#FFF8E8",
              display: "flex", alignItems: "center", justifyContent: "center",
              transform: `scale(${done})` }}>✓</div>
          </div>

          {/* ⭐ THE OUTPUT — a different drawn thing per department, building */}
          <div style={{ position: "absolute", left: 12, top: 44, width: CW - 24, height: 130 }}>
            {i === 0 && [0, 1, 2, 3].map((r2) => (
              /* ENGINEERING — a page assembling out of blocks */
              <div key={r2} style={{ position: "absolute", left: r2 === 0 ? 0 : (r2 - 1) * 92,
                top: r2 === 0 ? 0 : 34, width: r2 === 0 ? "100%" : 84,
                height: r2 === 0 ? 26 : 92, borderRadius: 4,
                background: hexa("#EFE7D2", 0.20 + 0.62 * E(run, r2 * 0.2, r2 * 0.2 + 0.26, 0, 1, OUT)),
                transform: `scaleY(${E(run, r2 * 0.2, r2 * 0.2 + 0.26, 0, 1, BACK)})`,
                transformOrigin: "50% 0%" }} />
            ))}
            {i === 1 && Array.from({ length: 12 }).map((_, s2) => (
              /* DESIGN — a swatch grid filling, then one shape composing on it */
              <div key={s2} style={{ position: "absolute", left: (s2 % 6) * 46, top: Math.floor(s2 / 6) * 46,
                width: 40, height: 40, borderRadius: s2 % 4 === 0 ? 20 : 5,
                background: hexa(lerpHex("#F2E9D4", vivid(d.c, 0.2), (s2 % 5) / 5),
                  0.16 + 0.74 * E(run, (s2 % 7) * 0.11, (s2 % 7) * 0.11 + 0.3, 0, 1, OUT)),
                transform: `rotate(${E(run, 0.3, 1, 0, s2 % 3 === 0 ? 45 : 0, OUT)}deg)` }} />
            ))}
            {i === 2 && [0, 1, 2].map((r2) => {
              /* MARKETING — a thread stacking, each row with its own score */
              const on = E(run, r2 * 0.26, r2 * 0.26 + 0.3, 0, 1, BACK);
              return (
                <div key={r2} style={{ position: "absolute", left: 0, top: r2 * 44, width: "100%",
                  height: 38, borderRadius: 5, background: hexa("#F2E9D4", 0.10 + 0.16 * on),
                  border: `2px solid ${hexa("#F2E9D4", 0.10 + 0.2 * on)}`,
                  transform: `translateX(${(1 - on) * -30}px)`, opacity: on,
                  display: "flex", alignItems: "center", gap: 8, padding: "0 8px" }}>
                  <div style={{ ...mono(13, 800), color: mxh(d.c, 0.5) }}>▲</div>
                  <div style={{ ...mono(14, 800), color: "#FFF8E8" }}>{[218, 94, 41][r2]}</div>
                  <div style={{ flex: 1, height: 7, borderRadius: 4, background: hexa("#FFF8E8", 0.26) }} />
                </div>
              );
            })}
            {i === 3 && (
              /* PAID MEDIA — a poster printing, headline first, then a burst */
              <>
                {Array.from({ length: 8 }).map((_, r2) => (
                  <div key={r2} style={{ position: "absolute", left: 138, top: 62, width: 3, height: 74,
                    transformOrigin: "50% 0%",
                    transform: `rotate(${r2 * 45}deg) scaleY(${E(run, 0.55, 1, 0, 1, BACK)})`,
                    background: hexa("#FFE7B0", 0.34) }} />
                ))}
                <div style={{ position: "absolute", left: 24, top: 12, width: 228, height: 100,
                  borderRadius: 5, background: hexa("#F7F0DC", 0.92), padding: 10,
                  transform: `scaleY(${E(run, 0, 0.34, 0, 1, BACK)})`, transformOrigin: "50% 0%" }}>
                  <div style={{ width: "88%", height: 20, borderRadius: 3, background: dkh(d.c, 0.30),
                    transform: `scaleX(${E(run, 0.16, 0.42, 0, 1, OUT)})`, transformOrigin: "0% 50%" }} />
                  {[0, 1].map((b2) => (
                    <div key={b2} style={{ width: `${64 - b2 * 22}%`, height: 11, borderRadius: 3,
                      marginTop: 9, background: hexa(dkh(d.c, 0.4), 0.55),
                      transform: `scaleX(${E(run, 0.34 + b2 * 0.14, 0.6 + b2 * 0.14, 0, 1, OUT)})`,
                      transformOrigin: "0% 50%" }} />
                  ))}
                </div>
              </>
            )}
            {i === 4 && (
              /* SECURITY — a scan head sweeping a shield, locks closing behind it */
              <>
                <div style={{ position: "absolute", left: 96, top: 6, width: 84, height: 116,
                  background: hexa("#EFE7D2", 0.22),
                  clipPath: "polygon(50% 0%, 100% 18%, 100% 62%, 50% 100%, 0% 62%, 0% 18%)" }} />
                <div style={{ position: "absolute", left: 0, top: 6 + run * 108, width: "100%", height: 5,
                  background: hexa(mxh(d.c, 0.5), 0.9),
                  boxShadow: `0 0 18px ${hexa(mxh(d.c, 0.5), 0.8)}` }} />
                {[0, 1, 2].map((r2) => (
                  <div key={r2} style={{ position: "absolute", left: 16 + r2 * 84, top: 96,
                    width: 22, height: 22, borderRadius: 5, ...ui(13, 900), color: "#FFF8E8",
                    background: dkh(GREEN, 0.10), display: "flex", alignItems: "center",
                    justifyContent: "center",
                    transform: `scale(${E(run, 0.3 + r2 * 0.2, 0.46 + r2 * 0.2, 0, 1, BACK)})` }}>✓</div>
                ))}
              </>
            )}
            {i === 5 && Array.from({ length: 15 }).map((_, s2) => {
              /* TESTING — a grid of cases going green one at a time */
              const on = E(run, (s2 % 9) * 0.09, (s2 % 9) * 0.09 + 0.22, 0, 1, BACK);
              return (
                <div key={s2} style={{ position: "absolute", left: (s2 % 5) * 55, top: Math.floor(s2 / 5) * 44,
                  width: 48, height: 38, borderRadius: 5,
                  background: on > 0.5 ? hexa(mxh(GREEN, 0.2), 0.34) : hexa("#EFE7D2", 0.10),
                  border: `2px solid ${on > 0.5 ? hexa(mxh(GREEN, 0.3), 0.7) : hexa("#EFE7D2", 0.14)}`,
                  ...ui(15, 900), color: hexa("#FFF8E8", 0.4 + 0.6 * on),
                  display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {on > 0.5 ? "✓" : ""}
                </div>
              );
            })}
          </div>

          {/* the specialist actually doing it, in its own colour */}
          <Crew f={f + i * 13} x={CW - 62} y={CH - 6} i={d.cos[i % d.cos.length]} size={124}
            z={4} at={0} loop={1} tint={d.c} />
        </div>
      );
    })}</>
  );
};

/* ---------------------------------------------------------------------------
   THE REPO BOARD — the actual thing the sentence is about.

   ⭐⭐⭐ *"It's an open source project called The Agency, and it already has over
   135,000 stars on GitHub."* Three beats have now been thrown at this line — a
   theatre ovation, a tower pull-back, a dark house of star-holders — and every
   one of them drew a METAPHOR for the stars. The line is not about a metaphor.
   It is about a repository, on GitHub, with a star count, and the repository is
   the subject's OWN object.

   So: the repo itself, on a board, with its agent files streaming past. The
   scroll is the continuous travel that keeps working, the rows are countable
   and coloured by division, and the star button is a thing the hero PRESSES.
------------------------------------------------------------------------- */
const AGENT_ROWS: Array<[string, number]> = [
  ["frontend-developer", 0], ["backend-architect", 0], ["devops-engineer", 0],
  ["ui-designer", 1], ["brand-designer", 1], ["motion-designer", 1],
  ["reddit-community-builder", 2], ["seo-strategist", 2], ["content-writer", 2],
  ["ad-creative-strategist", 3], ["media-buyer", 3], ["landing-optimizer", 3],
  ["security-auditor", 4], ["pen-tester", 4], ["compliance-checker", 4],
  ["qa-engineer", 5], ["load-tester", 5], ["regression-runner", 5],
];

export const RepoBoard: React.FC<{ f: number; scroll: number; stars: number;
  press: number; lock: number; z?: number; dx?: number }> =
  ({ f, scroll, stars, press, lock, z = 40, dx = 0 }) => {
  /* ⛔ 900 WIDE WAS TOO WIDE TO PUSH INTO. At a 1.17 shot on top of a 1.06
     scene push the visible width fell to ~778 and the star count — the one
     number this scene exists to show — went off the right edge. */
  const BW = 830, BH = 560, BX = (W - BW) / 2 + dx, BY = 156;
  const ROWH = 54, VIEW = 366;
  const N = AGENT_ROWS.length;
  const travel = scroll * (ROWH * N);
  return (
    <div style={{ position: "absolute", left: BX, top: BY, width: BW, height: BH, zIndex: z,
      borderRadius: 14, overflow: "hidden", boxShadow: SH_D,
      background: `linear-gradient(168deg, #1C2129, #12161C)`,
      border: `6px solid ${dkh(BRASS, 0.42)}` }}>
      {/* the repo header, exactly as the repo states it */}
      <div style={{ height: 76, background: "linear-gradient(90deg,#242B35,#171C23)",
        display: "flex", alignItems: "center", gap: 14, padding: "0 18px",
        borderBottom: `3px solid ${hexa("#FFF", 0.10)}` }}>
        <div style={{ width: 46, height: 46, borderRadius: 10, background: "#F6EFDC",
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Img src={staticFile("logos/github.svg")} style={{ width: 36, height: 36 }} />
        </div>
        <div style={{ lineHeight: 1.1 }}>
          <div style={{ ...mono(21, 800), color: "#F6EFDC" }}>{R.repo}</div>
          <div style={{ ...mono(14, 700), color: hexa("#F6EFDC", 0.5) }}>
            {R.agents} agents · {R.divisions} divisions
          </div>
        </div>
        {/* the STAR button, and the count it drives */}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "stretch", gap: 0 }}>
          <div style={{ ...ui(21, 900), color: press > 0.5 ? "#2A2118" : "#F6EFDC",
            background: press > 0.5
              ? `linear-gradient(168deg, ${GOLD}, ${dkh(GOLD, 0.24)})`
              : "linear-gradient(168deg,#2E3641,#20262E)",
            border: `3px solid ${press > 0.5 ? dkh(GOLD, 0.36) : hexa("#FFF", 0.18)}`,
            borderRadius: "8px 0 0 8px", padding: "10px 16px", display: "flex",
            alignItems: "center", gap: 8,
            transform: `scale(${1 - press * 0.06 + lock * 0.06})` }}>
            <span style={{ fontSize: 21 }}>★</span> {press > 0.5 ? "STARRED" : "STAR"}
          </div>
          <div style={{ ...mono(28, 800), color: GOLD, background: hexa("#000", 0.44),
            border: `3px solid ${hexa("#FFF", 0.14)}`, borderLeft: "none",
            borderRadius: "0 8px 8px 0", padding: "6px 14px", display: "flex",
            alignItems: "center", minWidth: 152, justifyContent: "center" }}>
            {stars.toLocaleString("en-US")}
          </div>
        </div>
      </div>

      {/* the agent files, streaming past — countable, and coloured by division */}
      <div style={{ position: "absolute", left: 0, top: 76, width: BW, height: VIEW,
        overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 0, top: -travel % (ROWH * N), width: BW }}>
          {[...AGENT_ROWS, ...AGENT_ROWS].map(([nm, di], r2) => {
            const d = DIVS[di];
            return (
              <div key={r2} style={{ height: ROWH, display: "flex", alignItems: "center",
                gap: 12, padding: "0 18px",
                background: r2 % 2 ? hexa("#FFF", 0.030) : "transparent",
                borderBottom: `1px solid ${hexa("#FFF", 0.06)}` }}>
                <div style={{ width: 10, height: 28, borderRadius: 3, background: d.c }} />
                <div style={{ ...mono(17, 700), color: hexa("#F6EFDC", 0.86) }}>
                  agents/{d.name.toLowerCase().replace(" ", "-")}/<span
                    style={{ color: mxh(d.c, 0.30) }}>{nm}</span>.md
                </div>
                <div style={{ marginLeft: "auto", ...mono(13, 700), color: hexa("#F6EFDC", 0.34) }}>
                  {R.lic}
                </div>
              </div>
            );
          })}
        </div>
        {/* the fade at both ends, so the list reads as endless */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
          background: `linear-gradient(180deg, #12161C 0%, transparent 12%, transparent 86%, #12161C 100%)` }} />
      </div>

      {/* the licence and the price, stamped on the foot when the star lands */}
      <div style={{ position: "absolute", left: 0, bottom: 0, width: BW, height: 108,
        borderTop: `3px solid ${hexa("#FFF", 0.10)}`, background: "linear-gradient(180deg,#181D25,#10141A)",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 22 }}>
        {[[R.lic, "LICENCE"], [R.price, "PRICE"], [`${R.forks}`, "FORKS"]].map(([v2, k2], i) => (
          <div key={k2} style={{ textAlign: "center",
            transform: `scale(${E(lock, i * 0.14, i * 0.14 + 0.4, 0, 1, BACK)})` }}>
            <div style={{ ...mono(30, 800), color: i === 1 ? mxh(GREEN, 0.3) : "#F6EFDC" }}>{v2}</div>
            <div style={{ ...mono(13, 700), color: hexa("#F6EFDC", 0.44), letterSpacing: 1.2 }}>{k2}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ---------------------------------------------------------------------------
   THE POUR — a laptop opens and an entire agency comes out of it.

   ⭐⭐⭐ NINE HOOKS HAVE NOW BEEN BUILT FOR THIS LINE and eight were rejected:
   a key into a lock · lamps revealing a crowd · a curtain lifting · a crate lid
   torn off · five doublings · a climb up a cutaway building · rings assembling
   around a hero · six department stations firing. Written in a column, the last
   four share a shape as clearly as the first four shared "reveal-by-opening":
   **they are all AN ARRANGEMENT OF THINGS APPEARING.** More of something, laid
   out. None of them is an IMAGE and none of them has a TURN.

   So: one object, filling the frame, doing one enormous thing. A laptop opens
   and 273 specialists pour out of the screen, arc across the panel and stack up
   on the floor in front of it. It is physical, it is absurd, it is a single
   picture, and it is the sentence — the agency is on your machine, right now.
------------------------------------------------------------------------- */
export const Laptop: React.FC<{ x: number; y: number; open: number; glow: number;
  s?: number; z?: number; boot?: number; f?: number; strain?: number }> =
  ({ x, y, open, glow, s = 1, z = 40, boot = 0, f = 0, strain = 0 }) => {
  const BW = 520 * s, BH = 40 * s, LH = 330 * s;
  /* ⭐⭐⭐ SOMETHING IS TRYING TO GET OUT. Alex: *"the beginning hook scene needs
     to be improved a lot, way more interesting and retentive."* The pour was
     right and its BEFORE was a photograph — a shut laptop sitting still. A shut
     laptop that is RATTLING, with light blazing out of the seam and the lid
     straining up and slamming back, is an unfinished action on frame 0, and an
     unfinished action is the only thing that makes anybody wait. */
  const sh = strain * (2 + Math.sin(f * 2.1) * 5.5);
  const shy = strain * Math.abs(Math.sin(f * 1.7)) * -7;
  return (
    <div style={{ position: "absolute", left: x - BW / 2, top: y - BH, width: BW, height: BH,
      zIndex: z, transform: `translate(${sh}px, ${shy}px) rotate(${sh * 0.16}deg)` }}>
      {/* the light forcing its way out of the seam */}
      {strain > 0.02 && (
        <>
          <div style={{ position: "absolute", left: 10 * s, bottom: BH - 4 * s,
            width: BW - 20 * s, height: 7 * s + strain * 9 * s, zIndex: 8, borderRadius: 4 * s,
            background: hexa("#FFE9B8", 0.5 + 0.5 * strain),
            boxShadow: `0 0 ${34 * s * strain}px ${hexa("#FFD98A", 0.95)}` }} />
          <div style={{ position: "absolute", left: BW / 2 - 190 * s, bottom: BH - 40 * s,
            width: 380 * s, height: 150 * s, zIndex: 7, borderRadius: "50%",
            pointerEvents: "none",
            background: `radial-gradient(ellipse, ${hexa("#FFD98A", 0.42 * strain)} 0%, transparent 70%)` }} />
        </>
      )}
      {/* the lid, hinged at the back edge */}
      <div style={{ position: "absolute", left: 12 * s, bottom: BH - 6 * s, width: BW - 24 * s,
        height: LH, transformOrigin: "50% 100%",
        /* ⛔ 86deg IS EDGE-ON. Frame 0 showed a thin grey bar with the mark
            floating above it: at 72 the closed lid's top face is foreshortened
            but visible, which is what a closed laptop looks like. */
        transform: `perspective(1400px) rotateX(${58 - open * 56 + strain * Math.sin(f * 2.4) * 5}deg)`,
        borderRadius: `${10 * s}px ${10 * s}px 0 0`, boxShadow: SH_D,
        background: `linear-gradient(176deg, #C9CFD8, #9AA2AD 62%, #7A828E)`,
        border: `${5 * s}px solid #6E7681`, overflow: "hidden" }}>
        {/* the screen, once it is far enough open to see into */}
        {/* ⭐ THE SCREEN IS DOING SOMETHING. Alex: *"the screen also needs to be
            sort of interesting."* It boots: the mark, then the roster loading
            line by line, then a bar filling — and the pour comes out of the
            frame the bar finishes in, so the burst has a cause. */}
        <div style={{ position: "absolute", inset: 10 * s, borderRadius: 5 * s, overflow: "hidden",
          background: `linear-gradient(180deg, ${lerpHex("#171C24", "#2A2419", glow * 0.5)}, ${lerpHex("#0F131A", "#1E1A12", glow * 0.5)})`,
          padding: 12 * s }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 * s, opacity: 0.4 + 0.6 * glow }}>
            <Img src={staticFile("logos/claude.svg")}
              style={{ width: 26 * s, height: 26 * s,
                filter: `drop-shadow(0 0 ${16 * s * glow}px ${hexa("#FFD98A", 0.9)})` }} />
            <div style={{ ...mono(13 * s, 800), color: hexa("#FFE9BE", 0.9) }}>CLAUDE CODE</div>
            <div style={{ marginLeft: "auto", ...mono(12 * s, 700), color: hexa("#FFE9BE", 0.5) }}>
              {Math.round(R.agents * boot)}/{R.agents}
            </div>
          </div>
          {DIVS.slice(0, 5).map((d, i) => {
            const on = E(boot, i * 0.15, i * 0.15 + 0.2, 0, 1, OUT);
            return (
              <div key={d.name} style={{ display: "flex", alignItems: "center", gap: 6 * s,
                marginTop: 7 * s, opacity: on }}>
                <div style={{ width: 6 * s, height: 13 * s, borderRadius: 2 * s, background: d.c }} />
                <div style={{ ...mono(11 * s, 700), color: hexa("#FFE9BE", 0.74) }}>
                  loading agents/{d.name.toLowerCase().replace(" ", "-")}
                </div>
                <div style={{ marginLeft: "auto", ...mono(11 * s, 800),
                  color: hexa(mxh(GREEN, 0.3), on) }}>OK</div>
              </div>
            );
          })}
          <div style={{ marginTop: 12 * s, height: 12 * s, borderRadius: 6 * s,
            background: hexa("#FFE9BE", 0.12), overflow: "hidden" }}>
            <div style={{ width: `${boot * 100}%`, height: "100%",
              background: `linear-gradient(90deg, ${dkh(GOLD, 0.1)}, ${mxh(GOLD, 0.4)})`,
              boxShadow: `0 0 ${18 * s * glow}px ${hexa("#FFD98A", 0.8)}` }} />
          </div>
        </div>
      </div>
      {/* the Claude mark on the OUTSIDE of the lid, which is what frame 0 shows */}
      {open < 0.34 && (
        <div style={{ position: "absolute", left: BW / 2 - 58 * s, bottom: BH + 44 * s,
          width: 116 * s, height: 116 * s, opacity: 1 - open * 2.9, zIndex: 3 }}>
          <Img src={staticFile("logos/claude.svg")} style={{ width: "100%", height: "100%" }} />
        </div>
      )}
      {/* the base */}
      <div style={{ position: "absolute", inset: 0, borderRadius: `${5 * s}px ${5 * s}px ${12 * s}px ${12 * s}px`,
        background: `linear-gradient(180deg, #B7BEC8, #868E99)`, boxShadow: SH_D,
        border: `${4 * s}px solid #6E7681` }}>
        <div style={{ position: "absolute", left: BW / 2 - 60 * s, bottom: 5 * s, width: 120 * s,
          height: 7 * s, borderRadius: 4 * s, background: hexa("#5C636D", 0.8) }} />
      </div>
    </div>
  );
};

/* the torrent itself — every specialist leaves the screen and LANDS somewhere */
export const Pour: React.FC<{ f: number; at: number; ox: number; oy: number;
  n?: number; z?: number; dx?: number }> =
  ({ f, at, ox, oy, n = 30, z = 60, dx = 0 }) => {
  /* ⛔ BIGGER AND MORE OF THEM. 30 sprites at 86-126px measured 6.48 on a
     1012x792 panel — a torrent has to actually cover the frame. */
  const RANKS = [{ y: 736, size: 186, k: 9 }, { y: 676, size: 152, k: 10 },
                 { y: 624, size: 122, k: 11 }];
  /* ⭐⭐⭐ AND SIX OF THEM COME PAST THE CAMERA. A torrent that only ever lands
     in ranks is a torrent seen from outside it. These arc out of the screen
     toward the lens, grow to 3x, and leave through the bottom of the frame —
     the single biggest repaint in the scene, and the thing that makes the
     laptop feel like it cannot hold them. */
  const NEAR = 6;
  let idx = 0;
  return (
    <>{RANKS.map((r, ri) => Array.from({ length: r.k }).map((_, i) => {
      const me = idx++;
      if (me >= n) return null;
      const t0 = at + me * 1.6;
      const p = E(f, t0, t0 + 20, 0, 1, IO);
      if (p <= 0.001) return null;
      const span = 960 - ri * 60;
      const tx = (W - span) / 2 + (span / (r.k + 1)) * (i + 1) + dx * (1 - ri * 0.2);
      /* a ballistic arc out of the screen and down onto the floor */
      const x = ox + (tx - ox) * p;
      const y = oy + (r.y - oy) * p - Math.sin(p * Math.PI) * (210 + ri * 54);
      const land = E(f, t0 + 18, t0 + 26, 0, 1, OUT);
      const d = DIVS[me % DIVS.length];
      return (
        <React.Fragment key={`p${ri}-${i}`}>
          <Crew f={f + me * 7} x={x} y={y} i={d.cos[me % d.cos.length]}
            size={r.size * (0.5 + 0.5 * p)} z={z + (2 - ri) * 6} at={0}
            loop={me % 3} tint={dkh(d.c, ri * 0.16)} flip={me % 2 === 0} />
          {land > 0.05 && land < 0.98 && (
            <Puff x={x} y={r.y + 8} f={f} at={t0 + 18} c="#E4DAC2" z={z + 14} n={5} s={0.8} />
          )}
        </React.Fragment>
      );
    }))}
    {Array.from({ length: NEAR }).map((_, j) => {
      const t0 = at + 4 + j * 7;
      const p = E(f, t0, t0 + 22, 0, 1, IN_Q);
      if (p <= 0.002 || p >= 0.999) return null;
      const d = DIVS[(j * 2 + 1) % DIVS.length];
      const side = j % 2 ? 1 : -1;
      const x = ox + side * (90 + j * 46) * p * 3.4 + dx * 0.4;
      const y = oy + (940 - oy) * p * p;
      return (
        <Crew key={`np${j}`} f={f + j * 11} x={x} y={y}
          i={d.cos[j % d.cos.length]} size={90 + 430 * p * p} z={z + 40 + j}
          at={0} loop={2} tint={d.c} flip={side > 0} />
      );
    })}</>
  );
};

/* ---------------------------------------------------------------------------
   THE GLOBE — 149,734 stars drawn as 149,734 places.

   ⭐⭐⭐ FOUR BEATS HAVE NOW BEEN BUILT FOR THIS ONE LINE: a theatre ovation, a
   tower pull-back, a dark house of star-holders, a repo board. The first three
   were metaphors for the number; the fourth was the literal artifact and read
   as a screenshot. What none of them said is the only thing that makes 149,734
   mean anything — **that they are not in one room.** They are everywhere.

   So the number becomes a map: a turning world, dark, and one light for every
   place somebody starred it, igniting in surges until the whole thing is lit.
   One image, one action, and a scale you cannot draw with a counter.
------------------------------------------------------------------------- */
export const StarGlobe: React.FC<{ f: number; on: number; x: number; y: number;
  r: number; z?: number; seed?: number }> = ({ f, on, x, y, r, z = 40, seed = 0 }) => {
  /* ⛔ 132 DOTS ON A 552px DISC MEASURED 5.34 — a STATIC failure. The lights
     have to be the size of the picture, not decoration on it. */
  const N = 190;
  /* ⛔ A CENTRED SYMMETRIC DISC DEFEATS A CAMERA LEVER. house/amber measured 8
     bits at f182 — below the 10 floor — because a gradient hash cannot see a
     reframe on a round object. What the cuts differ in has to be WHICH LIGHTS
     ARE ON, so the scatter and the spin phase are seeded per cut. */
  const spin = f * 0.22 + seed * 41;
  return (
    <div style={{ position: "absolute", left: x - r, top: y - r, width: r * 2, height: r * 2,
      zIndex: z, borderRadius: "50%", overflow: "hidden", boxShadow: SH_D,
      background: `radial-gradient(circle at 34% 28%, #24405E 0%, #142338 52%, #070D16 100%)`,
      border: `5px solid ${hexa("#8FB4E0", 0.24)}` }}>
      {/* latitudes and longitudes, so it reads as a sphere and not a disc */}
      {[-0.66, -0.34, 0, 0.34, 0.66].map((la) => (
        <div key={`la${la}`} style={{ position: "absolute", left: 0, top: r + la * r - 1,
          width: r * 2, height: 2, background: hexa("#8FB4E0", 0.16),
          transform: `scaleX(${Math.sqrt(Math.max(0.05, 1 - la * la))})` }} />
      ))}
      {[0, 1, 2, 3].map((lo) => (
        <div key={`lo${lo}`} style={{ position: "absolute", left: r - 1, top: 0, width: 2,
          height: r * 2, background: hexa("#8FB4E0", 0.14),
          transform: `scaleX(${Math.abs(Math.cos(spin / 57 + lo * 0.785))})` }} />
      ))}
      {/* the lights. Each one is a place, and they come on in scattered order —
          a sweep would read as a wipe, and a crowd does not light like a wipe. */}
      {Array.from({ length: N }).map((_, i) => {
        const rank = (i * 7919 + seed * 2311) % N;
        const lit = E(on, rank / N, rank / N + 0.09, 0, 1, OUT);
        /* an even-ish spread over the sphere, turning with it */
        const la = Math.acos(1 - 2 * ((i + 0.5) / N));
        const lo = (i * 2.39996 + spin / 22) % (Math.PI * 2);
        const sx = Math.sin(la) * Math.sin(lo), sz = Math.sin(la) * Math.cos(lo);
        if (sz < -0.06) return null;                     /* the far side */
        const cy2 = r - Math.cos(la) * r * 0.94;
        const cx2 = r + sx * r * 0.94;
        const near = 0.42 + 0.58 * Math.max(0, sz);
        const sz2 = (7 + 11 * near) * (0.45 + 0.55 * lit);
        return (
          <React.Fragment key={i}>
            {lit > 0.05 && (
              <div style={{ position: "absolute", left: cx2 - sz2 * 2.4, top: cy2 - sz2 * 2.4,
                width: sz2 * 4.8, height: sz2 * 4.8, borderRadius: "50%",
                background: `radial-gradient(circle, ${hexa("#FFD98A", 0.55 * lit * near)} 0%, transparent 70%)` }} />
            )}
            <div style={{ position: "absolute", left: cx2 - sz2 / 2, top: cy2 - sz2 / 2,
              width: sz2, height: sz2, borderRadius: "50%",
              background: lit > 0.04
                ? hexa("#FFE9B8", (0.45 + 0.55 * lit) * near)
                : "transparent" }} />
          </React.Fragment>
        );
      })}
      {/* ⭐ the terminator PULLS BACK as the world fills — a 680px gradient
          moving is the largest single repaint this scene has */}
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", pointerEvents: "none",
        background: `radial-gradient(circle at ${32 + on * 16}% ${26 + on * 18}%, transparent ${34 + on * 30}%, ${hexa("#04070C", 0.66 - on * 0.28)} 100%)` }} />
    </div>
  );
};


/* ---------------------------------------------------------------------------
   THE DESK SET — the hook's room, built rather than washed.

   ⭐⭐ Alex: *"the background needs to be more detailed and interesting, not
   just a plain thing."* The body scenes get `Fitout`; the hook does not use a
   `Room`, so it gets its own: a window with real daylight and a sill, a shelf
   run carrying drawn things, a pinboard, a clock, a plant, and the cable and
   mug that say somebody works here.
------------------------------------------------------------------------- */
export const DeskSet: React.FC<{ f: number; z?: number; dx?: number }> =
  ({ f, z = 16, dx = 0 }) => (
  <>
    {/* the wall, and the panelled dado that gives it a horizon */}
    <div style={{ position: "absolute", left: -60, top: 0, width: W + 120, height: 306,
      zIndex: z, background: `linear-gradient(180deg, #D6C49C 0%, #BCA87E 74%, #A8946A 100%)` }} />
    {Array.from({ length: 7 }).map((_, i) => (
      <div key={`pl${i}`} style={{ position: "absolute", left: -40 + i * 158 + dx * 0.3, top: 168,
        width: 118, height: 132, zIndex: z + 1, borderRadius: 3,
        background: hexa("#C0AC82", 0.5), border: `3px solid ${hexa("#9B885F", 0.6)}` }} />
    ))}
    <div style={{ position: "absolute", left: -60, top: 150, width: W + 120, height: 12,
      zIndex: z + 2, background: `linear-gradient(180deg, #E2D2AA, #A8946A)` }} />

    {/* the window — the only cool light in the frame, so the desk reads warm */}
    <div style={{ position: "absolute", left: 62 + dx * 0.4, top: 22, width: 236, height: 128,
      zIndex: z + 3, borderRadius: 4, background: "#8E7C55", padding: 7 }}>
      <div style={{ width: "100%", height: "100%", borderRadius: 2, overflow: "hidden",
        background: "linear-gradient(178deg,#CFE3F4,#9FC4E4)", position: "relative" }}>
        <div style={{ position: "absolute", left: "48%", top: 0, width: 5, height: "100%",
          background: "#8E7C55" }} />
        <div style={{ position: "absolute", left: 0, top: "46%", width: "100%", height: 5,
          background: "#8E7C55" }} />
        <div style={{ position: "absolute", left: 14, bottom: 10, width: 74, height: 30,
          borderRadius: "16px 16px 0 0", background: hexa("#FFF", 0.42) }} />
      </div>
    </div>
    <div style={{ position: "absolute", left: 52 + dx * 0.4, top: 150, width: 256, height: 11,
      zIndex: z + 4, background: "#B9A57C", borderRadius: 2 }} />

    {/* the shelf run, with things actually on it */}
    <div style={{ position: "absolute", left: 706 + dx * 0.4, top: 262, width: 272, height: 9,
      zIndex: z + 4, background: "#8E7C55", borderRadius: 2 }} />
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <div key={`bk${i}`} style={{ position: "absolute", left: 866 + i * 19 + dx * 0.4,
        top: 262 - (26 + (i % 3) * 9), width: 15, height: 26 + (i % 3) * 9, zIndex: z + 4,
        borderRadius: 2, background: [CLAY, SKY, GOLD, VIOLET, TEAL, GREEN][i],
        filter: "saturate(0.66) brightness(0.82)" }} />
    ))}
    <div style={{ position: "absolute", left: 796 + dx * 0.4, top: 46, width: 58, height: 50,
      zIndex: z + 4, borderRadius: "6px 6px 3px 3px", background: "#9E8A61" }} />
    {[0, 1, 2].map((i) => (
      <div key={`lf${i}`} style={{ position: "absolute", left: 872 + dx * 0.4 + i * 18,
        top: 60 - i * 8, width: 30, height: 34, zIndex: z + 4, borderRadius: "16px 3px 16px 3px",
        background: dkh(GREEN, 0.18 + i * 0.06), transform: `rotate(${-18 + i * 20}deg)` }} />
    ))}
    <div style={{ position: "absolute", left: 878 + dx * 0.4, top: 88, width: 46, height: 24,
      zIndex: z + 4, borderRadius: "3px 3px 8px 8px", background: "#A8724A" }} />

    {/* ⭐⭐⭐ THE ROOM HAS TO SAY "AGENCY". Alex: *"have more agency elements to
        signal that this is about the agency in the animation."* A desk with a
        laptop is anybody's desk. A brass house sign, an org chart of the actual
        divisions, and division-labelled box files make it an AGENCY's desk. */}
    <div style={{ position: "absolute", left: 706 + dx * 0.4, top: 112, width: 268, height: 58,
      zIndex: z + 5, borderRadius: 5, boxShadow: SH_D,
      background: `linear-gradient(168deg, ${mxh(BRASS, 0.44)}, ${dkh(BRASS, 0.18)})`,
      border: `4px solid ${dkh(BRASS, 0.44)}`,
      display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
      <Img src={staticFile("logos/claude.svg")} style={{ width: 26, height: 26, opacity: 0.85 }} />
      <div style={{ ...ui(24, 900), color: "#3A2A10", letterSpacing: 1.4 }}>{R.name}</div>
    </div>
    <div style={{ position: "absolute", left: 712 + dx * 0.4, top: 172, width: 256, height: 22,
      zIndex: z + 5, borderRadius: 3, background: hexa("#8E7C55", 0.5),
      ...mono(13, 800), color: "#4A3A1E", letterSpacing: 1, textAlign: "center",
      paddingTop: 3 }}>{R.agents} SPECIALISTS · {R.divisions} DIVISIONS</div>

    {/* the org chart — the six divisions, drawn as the tree they are */}
    <div style={{ position: "absolute", left: 46 + dx * 0.4, top: 140, width: 226, height: 116,
      zIndex: z + 5, borderRadius: 4, background: "#F1E7CE",
      border: `5px solid #8E7C55`, boxShadow: SH }}>
      <div style={{ ...mono(10, 800), color: hexa(INK, 0.62), textAlign: "center", paddingTop: 5,
        letterSpacing: 1 }}>ORG CHART</div>
      <div style={{ position: "absolute", left: 110, top: 26, width: 20, height: 12,
        borderRadius: 3, background: dkh(CLAY, 0.16) }} />
      <div style={{ position: "absolute", left: 119, top: 38, width: 3, height: 12,
        background: hexa(INK, 0.3) }} />
      <div style={{ position: "absolute", left: 30, top: 50, width: 180, height: 3,
        background: hexa(INK, 0.3) }} />
      {DIVS.map((d, i) => (
        <React.Fragment key={d.name}>
          <div style={{ position: "absolute", left: 32 + i * 29, top: 50, width: 3, height: 10,
            background: hexa(INK, 0.3) }} />
          <div style={{ position: "absolute", left: 25 + i * 29, top: 60, width: 18, height: 28,
            borderRadius: 3, background: d.c }} />
          {[0, 1].map((k) => (
            <div key={k} style={{ position: "absolute", left: 27 + i * 29 + k * 7, top: 92,
              width: 5, height: 9, borderRadius: 2, background: hexa(d.c, 0.6) }} />
          ))}
        </React.Fragment>
      ))}
    </div>

    {/* division box files on the shelf, labelled */}
    {DIVS.slice(0, 4).map((d, i) => (
      <div key={`bf${i}`} style={{ position: "absolute", left: 716 + i * 36 + dx * 0.4,
        top: 204, width: 30, height: 58, zIndex: z + 5, borderRadius: 2,
        background: `linear-gradient(180deg, ${dkh(d.c, 0.22)}, ${dkh(d.c, 0.46)})`,
        borderTop: `4px solid ${mxh(d.c, 0.2)}` }}>
        <div style={{ position: "absolute", left: 3, top: 18, width: 24, height: 11,
          borderRadius: 1, background: hexa("#F1E7CE", 0.82) }} />
      </div>
    ))}

    {/* the clock */}
    <div style={{ position: "absolute", left: 300 + dx * 0.4, top: 196, width: 50, height: 50,
      zIndex: z + 4, borderRadius: "50%", background: BONE, border: "5px solid #8E7C55",
      boxShadow: SH }}>
      <div style={{ position: "absolute", left: 23, top: 8, width: 4, height: 20,
        background: INK, borderRadius: 2 }} />
      <div style={{ position: "absolute", left: 23, top: 22, width: 14, height: 4,
        background: INK, borderRadius: 2, transformOrigin: "0% 50%",
        transform: `rotate(${(f * 1.6) % 360}deg)` }} />
    </div>

    {/* the desk, with the things on a desk */}
    <div style={{ position: "absolute", left: -60, top: 300, width: W + 120, height: 520,
      zIndex: z + 5, background: `linear-gradient(180deg, #D9C79A 0%, #C4AF7E 26%, #A8946A 100%)` }} />
    <div style={{ position: "absolute", left: -60, top: 296, width: W + 120, height: 8,
      zIndex: z + 6, background: hexa("#FFF3D0", 0.62) }} />
    <div style={{ position: "absolute", left: 148 + dx * 0.5, top: 500, width: 56, height: 62,
      zIndex: z + 7, borderRadius: "5px 5px 12px 12px", background: BONE,
      border: `4px solid ${dkh(CLAY, 0.2)}`, boxShadow: SH }} />
    <div style={{ position: "absolute", left: 200 + dx * 0.5, top: 516, width: 22, height: 26,
      zIndex: z + 7, borderRadius: "0 12px 12px 0", border: `5px solid ${dkh(CLAY, 0.2)}`,
      borderLeft: "none" }} />
    <div style={{ position: "absolute", left: 806 + dx * 0.5, top: 512, width: 132, height: 68,
      zIndex: z + 7, borderRadius: 4, background: BONE, boxShadow: SH,
      transform: "rotate(-5deg)" }}>
      {[0, 1, 2].map((i) => (
        <div key={`ln${i}`} style={{ position: "absolute", left: 12, top: 14 + i * 16,
          width: 108 - i * 26, height: 6, borderRadius: 3, background: hexa(INK, 0.2) }} />
      ))}
    </div>
  </>
);

/* ---------------------------------------------------------------------------
   THE EXCHANGE — copies go OUT, stars come IN.

   ⭐⭐⭐ Alex, on the globe: *"at three seconds on the GitHub stars it needs to
   be more interesting — it's kind of too long on that scene."* He is right on
   both counts and the second one explains the first: this is the longest beat
   in the reel (4.8s) and every version of it has been ONE image held for the
   whole of it. A globe, a tower, a house, a board.

   So it stops being one image. The line has two facts and the beat gets two
   movements, in opposite directions: the agency is OPEN, so copies peel off it
   and fly away — 24,135 of them — and in return the stars come back in.
------------------------------------------------------------------------- */
export const RepoCard: React.FC<{ x: number; y: number; s?: number; z?: number;
  ghost?: boolean }> = ({ x, y, s = 1, z = 60, ghost = false }) => {
  const WD = 380 * s, HT = 188 * s;
  return (
    <div style={{ position: "absolute", left: x - WD / 2, top: y - HT / 2, width: WD, height: HT,
      zIndex: z, borderRadius: 12 * s, boxShadow: ghost ? "none" : SH_D,
      background: ghost
        ? `linear-gradient(168deg, ${hexa("#FBF6E8", 0.5)}, ${hexa("#D8CFB6", 0.42)})`
        : `linear-gradient(168deg, #FBF6E8, ${CREAMB} 60%, #E0D6BC)`,
      border: `${6 * s}px solid ${hexa(dkh(BRASS, 0.34), ghost ? 0.5 : 1)}`,
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", gap: 6 * s }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 * s }}>
        <Img src={staticFile("logos/github.svg")}
          style={{ width: 40 * s, height: 40 * s, opacity: ghost ? 0.5 : 1 }} />
        <div style={{ ...ui(34 * s, 900), color: hexa(INK, ghost ? 0.5 : 1) }}>{R.name}</div>
      </div>
      <div style={{ ...mono(15 * s, 700), color: hexa(INK, ghost ? 0.34 : 0.6) }}>{R.repo}</div>
      <div style={{ ...mono(17 * s, 800), color: hexa(dkh(GREEN, 0.14), ghost ? 0.5 : 1) }}>
        {R.agents} AGENTS · {R.lic} · {R.price}
      </div>
    </div>
  );
};

/* the copies peeling off it — one, two, four, then a stream */
export const ForkBurst: React.FC<{ f: number; at: number; x: number; y: number;
  n?: number; z?: number }> = ({ f, at, x, y, n = 22, z = 54 }) => (
  <>{Array.from({ length: n }).map((_, i) => {
    const t0 = at + (i < 1 ? 0 : i < 3 ? 5 + i * 4 : 12 + i * 1.5);
    const p = E(f, t0, t0 + 24, 0, 1, OUT);
    if (p <= 0.002 || p >= 0.999) return null;
    const th = -Math.PI * 0.14 + (i * 2.39996) % (Math.PI * 1.28);
    const dist = (400 + (i % 5) * 150) * p;
    return (
      <div key={i} style={{ position: "absolute", left: 0, top: 0, zIndex: z + (i % 4),
        transform: `translate(${Math.cos(th) * dist}px, ${-Math.sin(th) * dist * 0.8}px) `
          + `rotate(${(i % 2 ? 1 : -1) * p * 26}deg)`,
        opacity: 1 - E(p, 0.62, 1, 0, 1, LIN) }}>
        {/* ⛔ 0.44 REPAINTS NOTHING. 22 cards at 167px on a 1012 panel measured
            7.11 — a burst has to be the size of the picture. */}
        <RepoCard x={x} y={y} s={0.62 * (1 - p * 0.28)} z={z} ghost />
      </div>
    );
  })}</>
);

/* ---------------------------------------------------------------------------
   THE COUNTER — the star beat, in the reel's own world.

   ⭐⭐⭐ Alex: *"keep it on theme and don't just make it like its own sort of
   style with the GitHub logo etc — it doesn't look good in that case."* Every
   version of this beat has been an OBJECT IN A STYLE OF ITS OWN: a repo page, a
   globe, a cream card with a logo on it floating in a room. The rest of the
   reel is drawn props and Claude sprites in an agency, and this beat kept
   arriving as a piece of interface.

   So it becomes the thing the sentence actually describes, staged the way the
   rest of the reel is staged: a counter in the agency, a clerk handing out
   copies, and a queue of people coming through to take one — because it is open
   — each dropping a star on the counter on the way out. The pile grows. That is
   what 149,734 looks like when it is made of the same stuff as everything else.
------------------------------------------------------------------------- */
export const Counter: React.FC<{ f: number; take: number; z?: number; dx?: number;
  signX?: number; stackX?: number }> =
  ({ f, take, z = 40, dx = 0, signX = 272, stackX = 176 }) => {
  const TOP = 470;
  return (
    <>
      {/* the counter itself — boards, a brass rail, a lit front */}
      <div style={{ position: "absolute", left: -60, top: TOP, width: W + 120, height: 130,
        zIndex: z, background: `linear-gradient(180deg, #8A6A3C 0%, #6A5029 46%, #4C3A1E 100%)`,
        borderTop: `7px solid ${mxh(BRASS, 0.36)}`, boxShadow: SH_D }} />
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={`pn${i}`} style={{ position: "absolute", left: -40 + i * 128 + dx * 0.4,
          top: TOP + 34, width: 104, height: 74, zIndex: z + 1, borderRadius: 3,
          background: hexa("#3C2C15", 0.5), border: `3px solid ${hexa("#A8865A", 0.34)}` }} />
      ))}
      {/* ⭐ THE STACK RESTOCKS ITSELF. Nine visitors empty a seven-box pile, and
          a counter that runs out is the opposite of what "open source" means —
          so a fresh copy drops in from above on a cycle, which is also three
          more moving objects in a scene that was one line of walkers. */}
      {Array.from({ length: 7 }).map((_, i) => {
        const cyc = (take * 2.6 + i * 0.14) % 1;
        const gone = E(cyc, 0, 0.10, 0, 1, OUT) * (1 - E(cyc, 0.62, 0.78, 0, 1, OUT));
        const drop = E(cyc, 0.62, 0.80, 0, 1, BACK);
        if (gone > 0.96) return null;
        return (
          <div key={`bx${i}`} style={{ position: "absolute", left: stackX + dx * 0.4,
            top: TOP - 40 - i * 31, width: 180, height: 36, zIndex: z + 3 + i,
            borderRadius: 4, opacity: Math.min(1 - gone, drop > 0 ? drop : 1),
            transform: `translate(${gone * -90}px, ${gone * -40 - (1 - drop) * (drop > 0 ? 260 : 0)}px) `
              + `rotate(${gone * -16}deg)`,
            background: `linear-gradient(178deg, #B78B52, #7E5C31)`,
            border: `3px solid ${dkh(BRASS, 0.5)}`, boxShadow: SH,
            display: "flex", alignItems: "center", gap: 7, padding: "0 8px" }}>
            <Img src={staticFile("logos/github.svg")}
              style={{ width: 21, height: 21, opacity: 0.78 }} />
            <div style={{ ...mono(14, 800), color: hexa("#FFF3D0", 0.9) }}>{R.name}</div>
            <div style={{ marginLeft: "auto", ...mono(13, 800), color: mxh(GREEN, 0.32) }}>{R.price}</div>
          </div>
        );
      })}
      {/* the sign over the counter, hand-painted, not a UI plate */}
      <div style={{ position: "absolute", left: signX + dx * 0.3, top: 196, width: 480, height: 116,
        zIndex: z + 6, borderRadius: 6,
        background: `linear-gradient(172deg, #F3E6C4, #D9C79A)`,
        border: `6px solid ${dkh(BRASS, 0.42)}`, boxShadow: SH_D,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ ...ui(40, 900), color: dkh(CLAYD, 0.04), letterSpacing: 1 }}>TAKE ONE</div>
        <div style={{ ...mono(19, 800), color: hexa(INK, 0.6), letterSpacing: 1.4 }}>
          {R.lic} · {R.price} · OPEN SOURCE
        </div>
      </div>
      {[signX + 96, signX + 384].map((hx) => (
        <div key={hx} style={{ position: "absolute", left: hx + dx * 0.3, top: 150, width: 6,
          height: 66, zIndex: z + 5, background: dkh(BRASS, 0.46) }} />
      ))}
    </>
  );
};

/* the pile of stars left on the counter, growing as people come through */
export const StarMound: React.FC<{ fill: number; x: number; y: number; z?: number }> =
  ({ fill, x, y, z = 58 }) => (
  <>{Array.from({ length: 40 }).map((_, i) => {
    const on = E(fill, (i * 13 % 40) / 40, (i * 13 % 40) / 40 + 0.1, 0, 1, BACK);
    if (on <= 0.03) return null;
    const row = Math.floor(i / 10), col = i % 10;
    const sp = 40 - row * 4;
    /* ⛔⛔ `rnd(seed, k)` TAKES TWO ARGUMENTS. Called with one, `k * 17.71` is
       NaN, `Math.sin(NaN)` is NaN, and every star's left/top/rotate came out
       NaN — so the whole mound was in the tree and painted nothing. Same arity
       trap as the colour helpers, and just as silent. */
    const sx = x + (col - 4.5) * sp + (row % 2 ? sp / 2 : 0) + rnd(i, 1) * 9;
    const sy = y - row * 26 - rnd(i, 2) * 6;
    const sz = (44 - row * 3.4) * on;
    return (
      <div key={i} style={{ position: "absolute", left: sx - sz / 2, top: sy - sz / 2,
        width: sz, height: sz, zIndex: z + row,
        background: lerpHex("#FFE9B8", "#E8B22C", (i % 4) / 4),
        filter: `drop-shadow(0 2px 2px ${hexa("#3A2A10", 0.5)})`,
        transform: `rotate(${rnd(i, 3) * 60 - 30}deg)`,
        clipPath: "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)" }} />
    );
  })}</>
);

/* ---------------------------------------------------------------------------
   THE QUEUE — and every one of them actually DOES something.

   ⭐⭐⭐ Alex: *"elevate it even more, more animated, not just them walking
   across."* Right: they were walking past a counter with a star appearing over
   their head at the midpoint. Nobody took anything and nobody gave anything —
   the exchange the scene is ABOUT was not being performed.

   Each visitor now runs a four-part action: walk in · reach across the counter
   and take a copy off the stack (it slides to them, and they squash under it) ·
   put a star down, which ARCS onto the pile and lands with an impact · walk out
   still carrying the box. Two lanes, so it reads as a crowd rather than a line.
------------------------------------------------------------------------- */
export const Queue: React.FC<{ f: number; at: number; n?: number; z?: number;
  dx?: number; stackX?: number; pileX?: number; seed?: number }> =
  ({ f, at, n = 11, z = 66, dx = 0, stackX = 176, pileX = 636, seed = 0 }) => (
  <>{Array.from({ length: n }).map((_, i) => {
    /* ⛔ A WIDE SYMMETRIC SET DEFEATS A CAMERA LEVER, exactly as the round disc
       did — amber/steel measured 9 bits at f182. What the cuts differ in has to
       be the CONTENT: who is in which lane, in what order, and how far along. */
    /* ⛔⛔ THEY ALL STOPPED AT THE SAME x. With a 17-frame hold and an 8-frame
       stagger, three visitors were standing in one spot with their bodies and
       their boxes interpenetrating — which is what Alex is looking at at 4s.
       ⭐ Each one now has its OWN SLOT along the counter, and same-slot reuse is
       24 frames apart against a 17-frame occupancy, so no two are ever in one
       place. The middle slot is the NEAR lane and the outer two are FAR, so the
       row reads as depth rather than as a collision. */
    const SLOTS = [318, 542, 766];
    const slot = (i + seed) % 3;
    const lane = slot === 1 ? 0 : 1;                  /* 0 near · 1 far */
    /* ⭐ and they arrive from the side their slot is on, so nobody has to walk
       THROUGH the people already at the counter to reach theirs */
    const side = slot === 0 ? -1 : 1;
    const OFFX = side > 0 ? 1200 : -200;
    /* ⛔ THE HOLD AT THE COUNTER IS THE POINT AND IT COSTS REPAINT — 9.21 -> 7.76
       when the walk-through became a real handover. The fix is not to remove the
       hold, it is to OVERLAP more of them, so at any frame somebody is walking
       in, somebody is taking, somebody is paying and somebody is leaving. */
    /* ⛔ AND THE STAGGER MUST BE THE CYCLE DIVIDED BY THE SLOT COUNT. At 8
       frames against a 52-frame cycle and three slots, visitor i was still
       walking OUT of a slot while i+3 was walking in — so the collision moved
       from the counter into the corridor. 52/3 = 17.3, so 18. */
    const t0 = at + i * 18 + seed * 6;
    const p = E(f, t0, t0 + 52, 0, 1, LIN);
    if (p <= 0.001 || p >= 0.999) return null;
    const d = DIVS[(i + seed * 2) % DIVS.length];
    const STOP = SLOTS[slot] + dx * 0.3;
    /* ⛔ *"too much boring stuff, too small."* Every object here was sized for a
       frame nobody is watching from two feet away. Sprites, boxes, stars, the
       sign and the tally all go up ~20-40%, and the visitor count comes DOWN —
       fewer, bigger, clearer beats more of them. */
    const size = lane ? 198 : 240;
    const gy = GY + (lane ? -26 : 14);

    /* ⭐ the three legs of the move, with a real HOLD at the counter */
    const IN = 0.30, OUT2 = 0.62;
    const x = p < IN ? OFFX + (STOP - OFFX) * E(p, 0, IN, 0, 1, IO)
            : p < OUT2 ? STOP
            : STOP + (OFFX - STOP) * E(p, OUT2, 1, 0, 1, IO);
    const atDesk = p >= IN && p < OUT2;
    /* the take: the box slides off the stack into their hands */
    const take = E(p, IN + 0.04, IN + 0.16, 0, 1, OUT);
    /* the pay: the star arcs from their hand onto the pile */
    const pay = E(p, IN + 0.20, IN + 0.30, 0, 1, IO);
    const squash = Math.exp(-Math.max(0, (p - (IN + 0.16)) * 26)) * (take > 0.5 ? 1 : 0);
    const carried = take > 0.02;
    const bx = stackX + dx * 0.4 + (x - stackX - dx * 0.4) * take;
    /* ⛔ IT HAS TO END UP IN THEIR HANDS. Held at counter height the box slid
       across and stopped ABOVE their heads, which reads as a box on a shelf,
       not as a handover. It travels along the counter and then DOWN to chest. */
    const by = 436 + (gy - 148 - 436) * E(take, 0.42, 1, 0, 1, IO) - (lane ? 18 : 0);
    const sx = x + (pileX + dx * 0.4 - x) * pay;
    const sy = gy - 190 - Math.sin(pay * Math.PI) * 120 + pay * 44;

    return (
      <React.Fragment key={i}>
        <Contact x={x} y={gy + 8} w={size * 0.76} o={0.28} />
        <div style={{ position: "absolute", inset: 0, zIndex: z + (lane ? 0 : 6),
          transform: `scaleY(${1 - squash * 0.13}) scaleX(${1 + squash * 0.09})`,
          transformOrigin: `${x}px ${gy + 10}px` }}>
          <Crew f={f + i * 9} x={x} y={gy + 12} i={d.cos[i % d.cos.length]} size={size}
            z={z + (lane ? 0 : 6)} at={0} loop={atDesk ? 1 : 0}
            tint={lane ? dkh(d.c, 0.22) : d.c} flip={side > 0}
            cheer={E(p, OUT2, OUT2 + 0.1, 0, 1, BACK)} />
        </div>
        {/* the copy they are taking — it slides off the stack and goes with them */}
        {carried && (
          <div style={{ position: "absolute", left: bx - 85, top: by, width: 170, height: 38,
            zIndex: z + (lane ? 3 : 9), borderRadius: 4,
            transform: `rotate(${-6 + take * 6}deg)`,
            background: `linear-gradient(178deg, #B78B52, #7E5C31)`,
            border: `3px solid ${dkh(BRASS, 0.5)}`, boxShadow: SH,
            display: "flex", alignItems: "center", gap: 5, padding: "0 6px" }}>
            <Img src={staticFile("logos/github.svg")}
              style={{ width: 19, height: 19, opacity: 0.78 }} />
            <div style={{ ...mono(13, 800), color: hexa("#FFF3D0", 0.9) }}>{R.name}</div>
          </div>
        )}
        {/* the star they leave, arcing onto the pile */}
        {pay > 0.01 && pay < 0.99 && (
          <div style={{ position: "absolute", left: sx - 32, top: sy - 32, width: 64, height: 64,
            zIndex: z + 10, background: "#FFE9B8",
            filter: `drop-shadow(0 0 16px ${hexa("#FFD98A", 0.85)})`,
            transform: `rotate(${pay * 260}deg) scale(${0.6 + 0.4 * Math.sin(pay * Math.PI)})`,
            clipPath: "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)" }} />
        )}
        {pay > 0.94 && pay < 0.999 && (
          <>
            <Ring x={pileX + dx * 0.4} y={452} f={f} at={f} c={mxh(GOLD, 0.4)} z={z + 9}
              s={0.9} dur={12} />
            <div style={{ position: "absolute", left: pileX + dx * 0.4 - 130, top: 452 - 90,
              width: 260, height: 180, zIndex: z + 8, borderRadius: "50%", pointerEvents: "none",
              background: `radial-gradient(ellipse, ${hexa("#FFD98A", 0.5)} 0%, transparent 68%)` }} />
          </>
        )}
      </React.Fragment>
    );
  })}</>
);


/* ---------------------------------------------------------------------------
   THE ROLE ICONS — five drawn emblems, one per lead in the line-up.
   ⛔ DRAWN, not glyphs and not type. Each one is the thing that specialist
   actually makes, so it reads without being read.
------------------------------------------------------------------------- */
export const RoleIcon: React.FC<{ i: number; c: string }> = ({ i, c }) => {
  const P = "#F6EFDC";
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {i === 0 && (/* FRONT-END — a laid-out page */
        <>
          <div style={{ position: "absolute", left: 20, top: 24, width: 96, height: 88,
            borderRadius: 5, background: P, border: `4px solid ${dkh(c, 0.56)}` }} />
          <div style={{ position: "absolute", left: 20, top: 24, width: 96, height: 20,
            background: dkh(c, 0.46) }} />
          {[0, 1, 2].map((d) => (
            <div key={d} style={{ position: "absolute", left: 28 + d * 11, top: 30, width: 6,
              height: 6, borderRadius: 3, background: hexa("#FFF", 0.72) }} />
          ))}
          <div style={{ position: "absolute", left: 28, top: 52, width: 24, height: 52,
            borderRadius: 3, background: hexa(c, 0.6) }} />
          {[0, 1, 2].map((r) => (
            <div key={r} style={{ position: "absolute", left: 58, top: 54 + r * 16,
              width: 50 - r * 12, height: 8, borderRadius: 3, background: hexa(dkh(c, 0.5), 0.5) }} />
          ))}
        </>
      )}
      {i === 1 && (/* AD — a poster mid-burst */
        <>
          {Array.from({ length: 10 }).map((_, r) => (
            <div key={r} style={{ position: "absolute", left: 66, top: 66, width: 4, height: 62,
              transformOrigin: "50% 0%", transform: `rotate(${r * 36}deg)`,
              background: hexa("#FFE7B0", 0.34) }} />
          ))}
          <div style={{ position: "absolute", left: 26, top: 30, width: 84, height: 62,
            borderRadius: 5, background: P, border: `4px solid ${dkh(c, 0.56)}`, padding: 9 }}>
            <div style={{ width: "86%", height: 13, borderRadius: 3, background: dkh(c, 0.32) }} />
            <div style={{ width: "58%", height: 8, borderRadius: 3, marginTop: 7,
              background: hexa(dkh(c, 0.5), 0.55) }} />
          </div>
        </>
      )}
      {i === 2 && (/* SECURITY — a shield with a keyhole */
        <>
          <div style={{ position: "absolute", left: 34, top: 20, width: 68, height: 96,
            background: P, clipPath: "polygon(50% 0%,100% 16%,100% 62%,50% 100%,0% 62%,0% 16%)" }} />
          <div style={{ position: "absolute", left: 40, top: 26, width: 56, height: 84,
            background: dkh(c, 0.40),
            clipPath: "polygon(50% 0%,100% 16%,100% 62%,50% 100%,0% 62%,0% 16%)" }} />
          <div style={{ position: "absolute", left: 60, top: 48, width: 16, height: 16,
            borderRadius: "50%", background: P }} />
          <div style={{ position: "absolute", left: 64, top: 60, width: 8, height: 20,
            borderRadius: 2, background: P }} />
        </>
      )}
      {i === 3 && (/* COMMUNITY — a knot of speech bubbles */
        <>
          {[[18, 30, 62, 44], [56, 58, 62, 44], [34, 82, 52, 34]].map((b, k) => (
            <div key={k} style={{ position: "absolute", left: b[0], top: b[1], width: b[2],
              height: b[3], borderRadius: 10,
              background: k === 1 ? P : hexa(P, 0.72),
              border: `4px solid ${dkh(c, 0.5)}` }} />
          ))}
          {[[28, 72], [66, 100], [46, 114]].map((t, k) => (
            <div key={`t${k}`} style={{ position: "absolute", left: t[0], top: t[1], width: 12,
              height: 12, background: k === 1 ? P : hexa(P, 0.72),
              clipPath: "polygon(0 0, 100% 0, 0 100%)" }} />
          ))}
        </>
      )}
      {i === 4 && (/* DESIGN — an artboard and a nib */
        <>
          <div style={{ position: "absolute", left: 22, top: 24, width: 92, height: 88,
            borderRadius: 5, background: P, border: `4px solid ${dkh(c, 0.56)}` }} />
          <div style={{ position: "absolute", left: 34, top: 40, width: 34, height: 34,
            borderRadius: "50%", background: hexa(c, 0.66) }} />
          <div style={{ position: "absolute", left: 68, top: 62, width: 36, height: 32,
            background: dkh(c, 0.42), clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }} />
          <div style={{ position: "absolute", left: 82, top: 20, width: 16, height: 40,
            background: dkh(c, 0.6), clipPath: "polygon(50% 100%, 0 0, 100% 0)",
            transform: "rotate(24deg)" }} />
        </>
      )}
    </div>
  );
};

/* ---------------------------------------------------------------------------
   THE GATE THE LEVER OPENS.

   ⭐⭐⭐ Alex: *"at 9 seconds with the switch, we should see like a Claude logo
   or something like a gate then the lever opens that, or a light and the lever
   lights it up."* Right — the lever was throwing and a wall of light simply
   appeared. A switch with nothing visibly attached to it is a switch that does
   not read. Now it lifts a real gate with the Claude mark stamped on it, and
   the light is what comes THROUGH the opening.
------------------------------------------------------------------------- */
export const LeverGate: React.FC<{ f: number; open: number; x: number; y: number;
  w?: number; h?: number; z?: number; pulse?: number }> =
  ({ f, open, x, y, w = 560, h = 300, z = 52, pulse = 0 }) => {
  const lift = open * (h + 24);
  /* ⭐⭐⭐ THE MARK DOES NOT LEAVE WITH THE DOOR. Alex: *"the new animation at 10
     seconds with the Claude logo... looks kind of odd, please fix and make the
     Claude logo like spin."* The defect was real and I had built it in: the only
     Claude mark was painted ON the shutter, so it rode up and vanished after
     about 0.4s and what was left was a generic bright rectangle. The door now
     opens ONTO the mark — a second, larger one lives in the opening, spins up as
     the shutter clears it, settles into a slow idle, and flares on the click. */
  const rev = E(open, 0.10, 1, 0, 1, OUT);
  const spin = rev * 500 + f * 1.15 * rev + pulse * 40;
  const held = E(open, 0.12, 0.42, 0, 1, OUT);
  return (
    <>
      {/* the opening, and the light coming out of it */}
      <div style={{ position: "absolute", left: x - w / 2, top: y - h, width: w, height: h,
        zIndex: z, overflow: "hidden", borderRadius: 6,
        background: `linear-gradient(180deg, ${hexa("#FFE7B0", 0.10 + 0.62 * open)}, ${hexa("#FFC96A", 0.06 + 0.42 * open)})`,
        boxShadow: open > 0.05 ? `0 0 ${90 * open}px ${hexa("#FFD98A", 0.62 * open)}` : "none" }}>
        {open > 0.06 && Array.from({ length: 11 }).map((_, i) => (
          <div key={i} style={{ position: "absolute", left: (i - 5) * 52 + w / 2 - 19, top: 0,
            width: 38, height: h, transformOrigin: "50% 0%",
            transform: `scaleY(${open}) skewX(${(i - 5) * 6}deg)`,
            background: `linear-gradient(180deg, ${hexa("#FFF6DA", 0.52 * open)}, transparent 78%)` }} />
        ))}
        {/* ⭐ THE MARK THE DOOR OPENS ONTO. It sits at 0.34 of the opening's height,
            not the middle — the crowd's heads reach y~534 and a mark centred in the
            gate was half buried in them. And it spins inside a STATIC medallion: a
            rotating disc with a rotating rim shows no rotation at all, so the rim
            is fixed and only the mark turns, which is what makes the spin read. */}
        {held > 0.02 && (
          <>
            <div style={{ position: "absolute", left: w / 2 - 128, top: h * 0.34 - 128,
              width: 256, height: 256, borderRadius: "50%", pointerEvents: "none",
              transform: `scale(${0.62 + 0.38 * held + pulse * 0.22})`,
              background: `radial-gradient(circle, ${hexa("#FFF6E2", 0.94 * held)} 0%, ${hexa("#F6EBD2", 0.90 * held)} 52%, ${hexa("#FFD98A", 0.34 * held)} 66%, transparent 78%)`,
              boxShadow: `0 0 ${40 + 70 * pulse}px ${hexa("#FFD98A", 0.55 + 0.4 * pulse)}` }} />
            <div style={{ position: "absolute", left: w / 2 - 106, top: h * 0.34 - 106,
              width: 212, height: 212, borderRadius: "50%", pointerEvents: "none",
              transform: `scale(${0.62 + 0.38 * held + pulse * 0.22})`,
              border: `7px solid ${hexa(dkh(BRASS, 0.34), 0.85 * held)}` }} />
            <Img src={staticFile("logos/claude.svg")}
              style={{ position: "absolute", left: w / 2 - 78, top: h * 0.34 - 78,
                width: 156, height: 156,
                transform: `rotate(${spin}deg) scale(${(0.42 + 0.58 * held + pulse * 0.16)})`,
                filter: `drop-shadow(0 2px 5px ${hexa("#8A4A22", 0.45)})` }} />
          </>
        )}
      </div>
      {open > 0.10 && (
        <div style={{ position: "absolute", left: x - w / 2 - 130, top: y - h - 90, width: w + 260,
          height: h + 150, zIndex: z - 1, pointerEvents: "none", borderRadius: "50%",
          background: `radial-gradient(ellipse, ${hexa("#FFE7B0", 0.34 * open)} 0%, transparent 66%)` }} />
      )}
      {/* the jamb */}
      {[-1, 1].map((s2) => (
        <div key={s2} style={{ position: "absolute", left: x + s2 * (w / 2) - (s2 < 0 ? 20 : 0),
          top: y - h - 16, width: 20, height: h + 16, zIndex: z + 3,
          background: `linear-gradient(90deg, ${mxh(BRASS, 0.22)}, ${dkh(BRASS, 0.5)})` }} />
      ))}
      <div style={{ position: "absolute", left: x - w / 2 - 20, top: y - h - 30, width: w + 40,
        height: 22, zIndex: z + 4,
        background: `linear-gradient(180deg, ${mxh(BRASS, 0.3)}, ${dkh(BRASS, 0.46)})` }} />
      {/* the gate itself — corrugated, with the mark on it, riding up */}
      <div style={{ position: "absolute", left: x - w / 2, top: y - h - lift, width: w, height: h,
        zIndex: z + 2, overflow: "hidden", borderRadius: 4,
        background: "linear-gradient(178deg,#8D95A2 0%,#666E7B 46%,#454C57 100%)",
        boxShadow: "0 16px 30px rgba(10,12,20,0.45)" }}>
        {Array.from({ length: 8 }).map((_, r) => (
          <div key={r} style={{ position: "absolute", left: 0, top: r * 38, width: w, height: 38,
            background: `linear-gradient(180deg, ${hexa("#FFFFFF", 0.20)} 0%, transparent 36%, ${hexa("#000000", 0.18)} 100%)`,
            borderBottom: `2px solid ${hexa("#39404B", 0.6)}` }} />
        ))}
        <div style={{ position: "absolute", left: w / 2 - 84, top: h / 2 - 84, width: 168,
          height: 168, borderRadius: 20, background: "#F8F2E2",
          border: `6px solid ${dkh(BRASS, 0.30)}`, boxShadow: SH_D,
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Img src={staticFile("logos/claude.svg")} style={{ width: 128, height: 128 }} />
        </div>
        <div style={{ position: "absolute", left: -6, bottom: 0, width: w + 12, height: 22,
          background: "linear-gradient(180deg,#3A4049,#14171C)" }} />
      </div>
    </>
  );
};

/* ---------------------------------------------------------------------------
   ONE CLICK — a cursor, because that is the word.
   ⭐ Alex: *"at 11/12 seconds when it says one click, it should show that like
   a big cursor then clicking."* The line says "one click" and the frame was
   showing a light sweep. Draw the noun.
------------------------------------------------------------------------- */
export const BigCursor: React.FC<{ f: number; at: number; x: number; y: number;
  from?: [number, number]; z?: number }> =
  ({ f, at, x, y, from = [1180, 900], z = 96 }) => {
  const t = f - at;
  if (t < -2) return null;
  const travel = E(t, 0, 13, 0, 1, IO);
  const press = E(t, 14, 17, 0, 1, OUT) - E(t, 17, 24, 0, 1, IO);
  const cx = from[0] + (x - from[0]) * travel;
  const cy = from[1] + (y - from[1]) * travel;
  return (
    <>
      {/* ⛔ IT WAS A WEB BUTTON FLOATING IN A ROOM. Alex: *"the one click install
          looks kind of odd."* Right — every other object in this reel is a built
          thing with a housing, and this was a rounded rectangle with a label,
          hanging in mid-air over a crowd. It is now a MACHINE: a brass-framed
          console plate with the button inset in it, so pressing it is a physical
          act in the same world as the lever and the gate. */}
      <div style={{ position: "absolute", left: x - 206, top: y - 82, width: 412, height: 164,
        zIndex: z - 3, borderRadius: 14, boxShadow: SH_D, opacity: E(t, -6, 2, 0, 1, OUT),
        background: `linear-gradient(168deg, ${mxh(BRASS, 0.20)}, ${dkh(BRASS, 0.46)})`,
        border: `6px solid ${dkh(BRASS, 0.56)}` }}>
        <div style={{ position: "absolute", inset: 8, borderRadius: 9,
          background: `linear-gradient(178deg, ${dkh(INK, 0.02)}, #14161E)` }} />
        {[16, 380].map((bx) => [16, 132].map((by) => (
          <div key={`${bx}-${by}`} style={{ position: "absolute", left: bx, top: by, width: 15,
            height: 15, borderRadius: "50%", background: mxh(BRASS, 0.42),
            border: `3px solid ${dkh(BRASS, 0.6)}` }} />
        )))}
        <div style={{ position: "absolute", left: 32, top: 22, ...ui(15, 900),
          color: hexa("#F0E4C6", 0.72), letterSpacing: 2 }}>ONE CLICK</div>
        {/* the live lamp, wired to the same current as the gate */}
        <div style={{ position: "absolute", right: 30, top: 22, width: 17, height: 17,
          borderRadius: "50%", background: press > 0.05 ? "#8FE0A6" : mxh(GOLD, 0.2),
          boxShadow: `0 0 ${10 + press * 20}px ${hexa(press > 0.05 ? "#8FE0A6" : GOLD, 0.9)}` }} />
      </div>
      <div style={{ position: "absolute", left: x - 148, top: y - 24, width: 296, height: 84,
        zIndex: z - 2, borderRadius: 9, boxShadow: SH_D,
        background: `linear-gradient(168deg, ${mxh(CLAY, 0.14)}, ${dkh(CLAY, 0.32)})`,
        border: `5px solid ${dkh(CLAY, 0.50)}`,
        transform: `translateY(${press * 9}px) scale(${1 - press * 0.03})`,
        display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
        opacity: E(t, -6, 2, 0, 1, OUT) }}>
        <Img src={staticFile("logos/claude.svg")} style={{ width: 40, height: 40,
          transform: `rotate(${press * 180}deg)` }} />
        <div style={{ ...ui(36, 900), color: "#FFF6E4", letterSpacing: 1.5 }}>INSTALL</div>
      </div>
      {/* the ripple the click makes */}
      {press > 0.02 && [0, 1].map((k) => {
        const q = Math.max(0, press - k * 0.22);
        return q <= 0 ? null : (
          <div key={k} style={{ position: "absolute", left: x - 180 - q * 130, top: y - 74 - q * 60,
            width: 360 + q * 260, height: 148 + q * 120, zIndex: z - 1,
            borderRadius: "50%", pointerEvents: "none",
            border: `${7 * (1 - q)}px solid ${hexa("#FFE7B0", 0.85 * (1 - q))}` }} />
        );
      })}
      {/* the cursor — drawn, not a glyph */}
      <svg width={124} height={148} viewBox="0 0 46 55" style={{ position: "absolute",
        left: cx, top: cy + press * 8, zIndex: z,
        filter: `drop-shadow(0 5px 6px ${hexa("#2A1E0C", 0.5)})`,
        transform: `scale(${1 - press * 0.12})`, transformOrigin: "8px 5px" }}>
        <path d="M4 2 L4 40 L13 31 L19 45 L27 41 L21 28 L33 27 Z"
          fill="#FBF6E8" stroke="#2A2118" strokeWidth="3" strokeLinejoin="round" />
      </svg>
    </>
  );
};

/* ---------------------------------------------------------------------------
   "FOR EXACTLY $0" — THE STAMP.

   ⭐⭐⭐ Alex: *"in the beginning hook animation when it says 'for exactly $0'
   it's still the same repetitive animation, there's not an interesting other
   animation here."* He is right and the reason is structural: that beat was a
   plate running `scale(lock)` — the SAME entrance shape as the count plate
   above it and as four other plates in the reel. §"the villain is SAMENESS".

   ⛔⛔ AND IT CANNOT BE FIXED WITH A NUMBER. The obvious replacement — a price
   counting DOWN from what an agency costs to nothing — is barred by the EARN
   guard in AgnWorld: the VO states no figure about money except "zero dollars",
   so `$0` is the only currency string the reel is allowed to draw. The turn has
   to come from the ACTION, not from a second number.

   So it is stamped. Anticipation (the stamp rises and hangs), crash, impact
   (squash, ring, chips, the plate takes the hit), recoil — and the "$0" is
   left behind in ink. Four parts, none of them a scale-in.
------------------------------------------------------------------------- */
export const PriceStamp: React.FC<{ f: number; at: number; x: number; y: number;
  z?: number }> = ({ f, at, x, y, z = 96 }) => {
  const t = f - at;
  if (t < -2) return null;
  const arrive = E(t, 0, 9, 0, 1, BACK);          /* the blank plate slides in  */
  const rise   = E(t, 0, 8, 0, 1, OUT);           /* the stamp draws back       */
  const crash  = E(t, 8, 14, 0, 1, IN_Q);         /* and comes down hard        */
  const impact = t < 14 ? 0 : Math.exp(-(t - 14) / 3.4);
  const lift   = E(t, 16, 30, 0, 1, OUT);
  const inked  = E(t, 15, 24, 0, 1, OUT);
  const up = 150 + rise * 110;
  const sy = -up + crash * up - lift * (up + 70);
  const PW = 344, PH = 116;
  return (
    <>
      {/* the plate that takes the stamp */}
      <div style={{ position: "absolute", left: x - PW / 2, top: y, width: PW, height: PH,
        zIndex: z, borderRadius: 10, boxShadow: SH_D, overflow: "hidden",
        transformOrigin: "50% 100%",
        transform: `translateY(${(1 - arrive) * 54}px) scaleY(${1 - impact * 0.11}) scaleX(${1 + impact * 0.05})`,
        background: `linear-gradient(168deg, ${BONE}, #D8CFB6)`,
        border: `5px solid ${dkh(GREEN, 0.30)}`, opacity: arrive,
        display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
        {/* the paper's own tooth, so the ink has something to sit in */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.16,
          background: `repeating-linear-gradient(92deg, transparent 0 5px, ${hexa("#8A7A58", 0.5)} 5px 6px)` }} />
        <div style={{ ...ui(52, 900), color: dkh(GREEN, 0.14), position: "relative",
          opacity: inked, letterSpacing: 1,
          transform: `scale(${0.86 + 0.14 * inked + impact * 0.10}) rotate(${-2.2 * (1 - inked)}deg)`,
          filter: `blur(${(1 - inked) * 2.4}px)` }}>{R.price}</div>
        <div style={{ ...ui(19, 900), color: hexa(INK, 0.62), lineHeight: 1.04,
          position: "relative", opacity: inked }}>TO<br />OWN</div>
      </div>

      {/* what the impact throws off */}
      {impact > 0.04 && (
        <>
          <Ring x={x} y={y + PH / 2} f={f} at={at + 14} c={mxh(GREEN, 0.42)} z={z + 1} s={1.9} dur={16} />
          {Array.from({ length: 9 }).map((_, i) => {
            const a = -Math.PI + rnd(i, 3) * Math.PI;
            const d2 = (1 - impact) * (54 + rnd(i, 9) * 74);
            return (
              <div key={i} style={{ position: "absolute",
                left: x + Math.cos(a) * (d2 + PW * 0.28), top: y + PH * 0.6 + Math.sin(a) * d2 * 0.5,
                width: 7 + rnd(i, 5) * 7, height: 5, zIndex: z + 2, borderRadius: 2,
                opacity: impact, background: hexa("#6E6247", 0.8),
                transform: `rotate(${d2 * 3}deg)` }} />
            );
          })}
        </>
      )}

      {/* the stamp itself. ⛔ THE FIRST DRAW READ AS A FUNNEL: the knob was
          widest at its BASE, which is a lamp or a tree, not a stamp. A stamp's
          silhouette is a MUSHROOM — widest near the top, pinched to a waist,
          flaring back out to the mount. Category is structure (§11). */}
      <div style={{ position: "absolute", left: x - 134, top: y - 168 + sy, width: 268, height: 250,
        zIndex: z + 6, transformOrigin: "50% 100%",
        transform: `rotate(${-3 + crash * 3 - lift * 5}deg) scaleY(${1 - impact * 0.09}) scaleX(${1 + impact * 0.07})`,
        opacity: 1 - E(t, 26, 34, 0, 1, IO), filter: `drop-shadow(0 12px 14px ${hexa("#2A1E0C", 0.5)})` }}>
        <svg width={268} height={250} viewBox="0 0 268 250">
          <path d="M134 6 C196 6 222 40 218 66 C214 88 186 92 166 98 C158 100 156 108 156 118
                   L112 118 C112 108 110 100 102 98 C82 92 54 88 50 66 C46 40 72 6 134 6 Z"
            fill="#B07C3E" stroke="#4A3216" strokeWidth="6" strokeLinejoin="round" />
          <path d="M76 34 C90 16 116 11 136 13 C112 21 92 32 84 50 Z" fill={hexa("#FFF0CE", 0.42)} />
          <rect x="32" y="112" width="204" height="32" rx="11" fill="#C98F4C"
            stroke="#4A3216" strokeWidth="6" />
          <rect x="46" y="141" width="176" height="14" rx="4" fill="#7C5324" />
          <rect x="22" y="150" width="224" height="78" rx="9" fill="#2C2822"
            stroke="#14110C" strokeWidth="6" />
          <rect x="34" y="162" width="200" height="52" rx="5" fill="#45403A" />
          <text x="134" y="205" textAnchor="middle" fontFamily="Inter, system-ui, sans-serif"
            fontWeight="900" fontSize="46" fill="#F6EFDC">$0</text>
          <rect x="24" y="215" width="220" height="13" rx="5" fill="#1E6B44" opacity="0.92" />
        </svg>
      </div>
    </>
  );
};

/* ---------------------------------------------------------------------------
   THE SURGE — what happens ON the words "zero dollars".

   ⭐⭐⭐ Alex: *"still needs to have more motion and more interesting here when
   it says zero dollars, like it's not good right now."* Measured before
   touching anything, per-frame across the hook:

       f70-75  8.1 -> 5.9      the pour's last ranks land
       f76-94  5.0 -> 1.4      NINETEEN FRAMES against a hook mean of 10.27
       f95     92.9            the cut

   The hook's own p10 floor is 2.01 and eighteen consecutive frames sit on it.
   The scene audit says BURST 14.83 / DEADRUN 0 because the first sixty frames
   carry the average — §"THE TAIL GOES STILL", and it went still exactly under
   the sentence's last and biggest word.

   Everything had simply FINISHED: the ranked pour lands by f81, the six NEAR
   sprites are gone by f76, the stamp lifts out by f79, the last ring fired at
   f64. A shot where every entrance has completed is a photograph.

   ⭐ So the machine does not stop. The price reads zero and the thing keeps
   giving: a second, bigger wave comes straight past the lens, staggered so the
   LAST ONES ARE STILL IN FLIGHT WHEN THE SHOT CUTS. A tail that is interrupted
   never has to be filled.
------------------------------------------------------------------------- */
export const Surge: React.FC<{ f: number; at: number; ox: number; oy: number;
  n?: number; z?: number; dx?: number; step?: number }> =
  ({ f, at, ox, oy, n = 9, z = 100, dx = 0, step = 2.4 }) => (
  <>{Array.from({ length: n }).map((_, j) => {
    const t0 = at + j * step;
    const p = E(f, t0, t0 + 26, 0, 1, IN_Q);
    if (p <= 0.002 || p >= 0.999) return null;
    const d = DIVS[(j * 3 + 2) % DIVS.length];
    const side = j % 2 ? 1 : -1;
    /* wider than the pour's NEAR pass, and it leaves through the bottom corners
       rather than straight down, so the two waves are not the same gesture */
    const x = ox + side * (64 + j * 52) * p * 4.2 + dx * 0.5;
    const y = oy + (1010 - oy) * p * p - Math.sin(p * Math.PI) * 118;
    return (
      <Crew key={`sg${j}`} f={f + j * 9} x={x} y={y} i={d.cos[j % d.cos.length]}
        size={84 + 510 * p * p} z={z + j} at={0} loop={j % 3}
        tint={d.c} flip={side > 0} />
    );
  })}</>
);
