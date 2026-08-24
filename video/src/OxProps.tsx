import React from "react";
import { Img, staticFile } from "remotion";
import { MONO } from "./SlopKit";
import { inter, fraunces } from "./fonts";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D, squash,
  mono, ui, Contact, Ring, Puff, Pool, R,
  CLAY, CLAYD, GOLD, GREEN, RED, SKY, PAPER, CREAMB, INK, MUTE, TEAL, STEEL,
  BRASS, SODIUM, VIOLET, EMBER, OXIDE, SLATE,
} from "./OxWorld";

/* ===========================================================================
   REEL 119 · "OX" — THE PROPS.  Board: storyboards/119-ox.md.

   ⛔⛔ THE SUBJECT'S OWN OBJECTS, NEVER A BORROWED WORLD
   ([[feedback_real_marks_are_the_props]]). Two worlds have been rejected with
   CORRECT mappings, so the test applied to every object in here is: point at it
   and say what it is. "It's the model." "It's a token." "It's the price."
   "It's the clock." Nothing in this file needs a sentence to decode.

   ⛔⛔ AND A CONTAINER IS STILL A CONTAINER WHEN IT IS A NICE BOX (reel 112).
   `ModelCore` is not a black rectangle with a name on it — it is drawn with the
   fourteen structural features a viewer actually uses to identify the category
   (§11: CATEGORY is STRUCTURE, not hue):
     a cast chassis rim · a machined face plate · a struck name · a maker's
     plate · four plate bolts · a contact-pin comb · two guide rails · a grip
     notch · a cooling louvre stack · a price strip · a bevel highlight ·
     a seated-state contact glow · a serial tick · edge wear.

   ⛔ MATTE ONLY. No `boxShadow: "0 0 Npx"` anywhere (the grep gate returns 0).
      SH / SH_D are OFFSET drop shadows, which is a different thing.
   ⛔ THE 40px FLOOR APPLIES TO MOVING OBJECTS TOO — every travelling element in
      here is >= 46px on its short side, because the audit scales 1012 -> 240.
   ⛔ `dark()`/`mix()` are hex-in/rgb-out and DO NOT NEST. Use dkh/mxh.
   ========================================================================= */

/* the generic bench-floor furniture is the 118 chassis's, reused verbatim so
   the house look does not drift. Only the OX-specific objects are new. */
export { Bench, Belt, Hatch, BrowserWin, AppWin, GameView } from "./LoopProps";

/* ---------------------------------------------------------------------------
   ⭐⭐⭐ THE HERO ARTIFACT — the unsigned model core.
   This is the one object the whole reel is staging for. It is DARK against
   every set it appears in (§11: name which side of the contrast the subject is
   on — "light on light" is the usual answer to "I can't tell what it is").
   ------------------------------------------------------------------------- */
export const ModelCore: React.FC<{
  x: number; y: number; s?: number; z?: number; f: number;
  /** 0 = the maker's plate is a REDACTION BAR (ox-alpha). 1 = a real mark rides it. */
  redacted?: boolean;
  /** a real brand mark for the two rivals — drawn as a struck emblem, never a photo */
  rival?: "claude" | "gpt";
  /** the price strip. "$0" for ox-alpha. */
  price?: string;
  /** 0..1 — how far the contact pins are seated. Drives the contact glow. */
  seated?: number;
  rot?: number;
  /** the 7-day ribbon slapped across the lower corner */
  ribbon?: number;
  /** a REAL maker's mark from public/logos/ — what a signed core wears */
  logo?: string;
  /** the name struck into the face, when it is not ox-alpha */
  name?: string;
}> = ({ x, y, s = 1, z = 60, f, redacted = true, rival, price = "$0",
        seated = 0, rot = 0, ribbon = 0, logo, name }) => {
  const wC = 250 * s, hC = 430 * s;
  const body = redacted ? "#383E47" : rival === "claude" ? "#2A1810" : "#101C18";
  const rim = mxh(body, 0.20);
  return (
    <div style={{ position: "absolute", left: x - wC / 2, top: y - hC, width: wC, height: hC,
      zIndex: z, transform: `rotate(${rot}deg)`, transformOrigin: "50% 100%" }}>
      {/* 1 · the cast chassis, with a real rim and a bevel highlight */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 10 * s, background:
        `linear-gradient(126deg, ${mxh(body, 0.26)} 0%, ${body} 34%, ${dkh(body, 0.42)} 100%)`,
        border: `${5 * s}px solid ${dkh(body, 0.56)}` }} />
      <div style={{ position: "absolute", left: 7 * s, top: 7 * s, width: 12 * s,
        height: hC - 60 * s, borderRadius: 6 * s, background: hexa("#FFFFFF", 0.13) }} />
      {/* 2 · the machined face plate — a lighter inset the name is struck into */}
      <div style={{ position: "absolute", left: 24 * s, top: 30 * s, width: wC - 48 * s,
        height: 150 * s, borderRadius: 6 * s, background:
        `linear-gradient(180deg, ${mxh(body, 0.34)} 0%, ${mxh(body, 0.12)} 100%)`,
        border: `${3 * s}px solid ${dkh(body, 0.30)}` }} />
      {/* 3 · four plate bolts */}
      {[[34, 40], [wC - 46, 40], [34, 164], [wC - 46, 164]].map((p, i) => (
        <div key={"bo" + i} style={{ position: "absolute", left: p[0] * s, top: p[1] * s,
          width: 13 * s, height: 13 * s, borderRadius: 13 * s, background: dkh(body, 0.60),
          border: `${2 * s}px solid ${mxh(body, 0.30)}` }} />
      ))}
      {/* 4 · THE STRUCK NAME — the model's real id */}
      <div style={{ position: "absolute", left: 24 * s, top: 62 * s, width: wC - 48 * s,
        textAlign: "center" }}>
        <span style={{ ...mono(31 * s, 900), color: redacted ? "#E8E2D2" : "#F0E8D6",
          letterSpacing: 0.5 }}>
          {name ?? (redacted ? R.model.name : rival === "claude" ? "Fable 5" : "GPT-5.6")}
        </span>
      </div>
      {/* 5 · THE MAKER'S PLATE — the whole point of the reel.
             Every other core carries a mark here. This one carries a bar. */}
      <div style={{ position: "absolute", left: 44 * s, top: 108 * s, width: wC - 88 * s,
        height: 46 * s, borderRadius: 4 * s,
        background: redacted ? "#CFC8B8" : hexa(rival === "claude" ? CLAY : GREEN, 0.90),
        border: `${3 * s}px solid ${dkh(body, 0.40)}`,
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        {logo
          ? /* a SIGNED core: the maker's mark on a white tile, the way every
               other core in the room is labelled */
            <div style={{ position: "absolute", left: 6 * s, top: 5 * s, right: 6 * s,
              bottom: 5 * s, borderRadius: 4 * s, background: "#FFFFFF",
              display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Img src={staticFile(`logos/${logo}`)}
                style={{ width: 30 * s, height: 30 * s, objectFit: "contain" }} />
            </div>
          : redacted
          ? /* the redaction: a solid bar with the tooth of a struck-through plate */
            <div style={{ position: "absolute", left: 8 * s, top: 10 * s, right: 8 * s,
              bottom: 10 * s, background: "#000000", borderRadius: 2 * s,
              backgroundImage: `repeating-linear-gradient(90deg, #000 0px, #000 ${9 * s}px, #14161A ${9 * s}px, #14161A ${11 * s}px)` }} />
          : <span style={{ ...mono(20 * s, 900), color: "#1A0E06" }}>
              {rival === "claude" ? "ANTHROPIC" : "OPENAI"}</span>}
      </div>
      {/* 6 · the cooling louvre stack — eight real slots, not a texture */}
      {Array.from({ length: 8 }, (_, i) => (
        <div key={"lv" + i} style={{ position: "absolute", left: 40 * s,
          top: (196 + i * 15) * s, width: wC - 80 * s, height: 8 * s, borderRadius: 3 * s,
          background: dkh(body, 0.62), borderTop: `${2 * s}px solid ${mxh(body, 0.16)}` }} />
      ))}
      {/* 7 · the grip notch */}
      <div style={{ position: "absolute", left: wC / 2 - 44 * s, top: 322 * s, width: 88 * s,
        height: 20 * s, borderRadius: 10 * s, background: dkh(body, 0.66),
        border: `${3 * s}px solid ${mxh(body, 0.14)}` }} />
      {/* 8 · THE PRICE STRIP — the brightest thing on the object once seated */}
      <div style={{ position: "absolute", left: 24 * s, top: 352 * s, width: wC - 48 * s,
        height: 40 * s, borderRadius: 5 * s,
        background: `linear-gradient(180deg, ${GOLD} 0%, ${dkh(GOLD, 0.26)} 100%)`,
        border: `${3 * s}px solid ${dkh(GOLD, 0.48)}`,
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ ...mono(27 * s, 900), color: "#2A1D06" }}>{price}</span>
      </div>
      {/* 9 · the contact-pin comb along the bottom edge, and its seated glow */}
      <div style={{ position: "absolute", left: 30 * s, bottom: -3 * s, width: wC - 60 * s,
        height: 22 * s, display: "flex", gap: 5 * s }}>
        {Array.from({ length: 11 }, (_, i) => (
          <div key={"pn" + i} style={{ flex: 1, borderRadius: 2 * s,
            background: seated > 0.5
              ? mxh(GOLD, 0.10 + 0.5 * Math.max(0, Math.sin(f / 5 + i)) * seated)
              : BRASS, opacity: 0.55 + seated * 0.45 }} />
        ))}
      </div>
      {/* 10 · two guide rails down the flanks */}
      {[10, wC - 20].map((lx, i) => (
        <div key={"gr" + i} style={{ position: "absolute", left: lx * (s === 1 ? 1 : 1),
          top: 210 * s, width: 10 * s, height: 120 * s, borderRadius: 4 * s,
          background: dkh(body, 0.50) }} />
      ))}
      {/* 11 · a serial tick — a structural feature is free real estate for a real number */}
      <div style={{ position: "absolute", left: 30 * s, top: 402 * s }}>
        <span style={{ ...mono(11 * s, 700), color: hexa("#FFFFFF", 0.34) }}>
          {R.model.born}</span>
      </div>
      {/* 12 · THE 7-DAY RIBBON — slapped across the lower corner at the hook's end */}
      {ribbon > 0 && (
        <div style={{ position: "absolute", left: -18 * s, top: 268 * s, width: wC + 36 * s,
          height: 52 * s, background: RED, border: `${3 * s}px solid ${dkh(RED, 0.44)}`,
          transform: `rotate(-9deg) scaleX(${ribbon})`, transformOrigin: "0% 50%",
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ ...mono(25 * s, 900), color: "#2A0A06" }}>{R.clock.days}</span>
        </div>
      )}
    </div>
  );
};

/* ---------------------------------------------------------------------------
   THE SOCKET WALL — the rank of bays behind the bench. Every socket but one is
   filled with a marked core; the centre one is empty and dark. An EMPTY
   CONTAINER MUST STILL READ (§11) — so the empty bay is drawn as a lit recess
   with rails and a back plate, never as a black hole.
   ------------------------------------------------------------------------- */
export const Socket: React.FC<{ x: number; y: number; s?: number; z?: number; f: number;
  filled?: boolean; lit?: number; c?: string; mark?: string }> =
  ({ x, y, s = 1, z = 26, f, filled = true, lit = 0, c = STEEL, mark }) => {
  const wS = 120 * s, hS = 168 * s;
  return (
    <div style={{ position: "absolute", left: x - wS / 2, top: y - hS, width: wS, height: hS, zIndex: z }}>
      {/* the recess */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 5 * s,
        background: `linear-gradient(180deg, ${dkh(c, 0.66)} 0%, ${dkh(c, 0.50)} 100%)`,
        border: `${4 * s}px solid ${dkh(c, 0.40)}` }} />
      {/* ⭐ THE BACK PLATE — this is what makes an EMPTY bay read as a bay.
          §11: "an empty container must still read while it is still EMPTY,
          because empty is the promise", and it must differ from its room in
          BOTH hue and value. An empty bay is therefore a BRIGHT recess, not a
          black hole — which is also the frame-0 luma lever that is allowed
          (a lit surface), rather than the palette's dark stop, which is not. */}
      <div style={{ position: "absolute", left: 12 * s, top: 12 * s, right: 12 * s,
        bottom: 26 * s, borderRadius: 3 * s,
        background: filled ? mxh(dkh(c, 0.52), 0.10 + lit * 0.34)
                           : mxh(c, 0.46 + lit * 0.30) }} />
      {/* two guide rails */}
      {[8, wS - 20].map((lx, i) => (
        <div key={"sr" + i} style={{ position: "absolute", left: lx, top: 18 * s, width: 8 * s,
          height: hS - 52 * s, borderRadius: 3 * s, background: dkh(c, 0.30) }} />
      ))}
      {/* the contact bar at the foot */}
      <div style={{ position: "absolute", left: 16 * s, bottom: 10 * s, right: 16 * s,
        height: 10 * s, borderRadius: 3 * s,
        background: lit > 0.2 ? mxh(GOLD, lit * 0.4) : dkh(BRASS, 0.40) }} />
      {/* a filled bay carries a core stub with a mark plate on it */}
      {/* ⭐ A FILLED BAY CARRIES A CORE WITH A MAKER'S MARK ON IT — bright, and
          in a real colour. That is the whole comparison the hook rests on:
          every other bay in the room has somebody's name on it, and the one in
          the middle is empty and about to take a core that has none. A dark
          stub with a 55%-alpha bar read as the same object as an empty recess. */}
      {filled && (<>
        <div style={{ position: "absolute", left: 20 * s, top: 20 * s, right: 20 * s,
          bottom: 30 * s, borderRadius: 4 * s,
          background: `linear-gradient(140deg, #343A44 0%, #1E222A 100%)`,
          border: `${3 * s}px solid #0D1014` }} />
        <div style={{ position: "absolute", left: 28 * s, top: 40 * s, right: 28 * s,
          height: 38 * s, borderRadius: 3 * s, background: "#E4DCC8",
          border: `${2 * s}px solid #0D1014` }} />
        <div style={{ position: "absolute", left: 36 * s, top: 48 * s, right: 36 * s,
          height: 22 * s, borderRadius: 2 * s, background: mark ?? CLAY, opacity: 0.92 }} />
      </>)}
    </div>
  );
};

/* ---------------------------------------------------------------------------
   THE SPEC PLACARD — S1's naming beat. Rows PRINT one at a time (real content
   arriving is worth more than any effect: §1, 6.3-6.9 -> 8.0-8.5), and the row
   that should carry a maker's name lands BLANK.
   ------------------------------------------------------------------------- */
export const SpecCard: React.FC<{ x: number; y: number; s?: number; z?: number; f: number;
  rows: Array<{ k: string; v: string; blank?: boolean }>; at: number; step?: number }> =
  ({ x, y, s = 1, z = 54, f, rows, at, step = 13 }) => {
  const wC = 470 * s, rh = 58 * s;
  const hC = 40 * s + rows.length * rh + 18 * s;
  return (
    <div style={{ position: "absolute", left: x - wC / 2, top: y - hC, width: wC, height: hC,
      zIndex: z, borderRadius: 8 * s, background:
      `linear-gradient(180deg, ${PAPER} 0%, ${CREAMB} 100%)`,
      border: `${5 * s}px solid #4A3A24`, boxShadow: SH_D }}>
      {/* the rig's head rail and two hanging chains */}
      <div style={{ position: "absolute", left: 0, top: 0, width: wC, height: 30 * s,
        background: "#4A3A24", borderRadius: `${4 * s}px ${4 * s}px 0 0` }} />
      {rows.map((r, i) => {
        const k = E(f, at + i * step, at + i * step + 5, 0, 1, BACK);
        if (k <= 0) return null;
        return (
          <div key={"rw" + i} style={{ position: "absolute", left: 20 * s,
            top: (44 + i * 58) * s, width: wC - 40 * s, height: 46 * s,
            transform: `scaleY(${k})`, transformOrigin: "50% 0%",
            display: "flex", alignItems: "center", gap: 14 * s,
            borderBottom: `${3 * s}px solid ${hexa("#4A3A24", 0.30)}` }}>
            <span style={{ ...mono(19 * s, 800), color: "#7A6A4E", width: 128 * s }}>{r.k}</span>
            {r.blank
              ? <div style={{ flex: 1, height: 28 * s, background: "#07080A", borderRadius: 2 * s,
                  backgroundImage: `repeating-linear-gradient(90deg, #000 0px, #000 ${9 * s}px, #16181C ${9 * s}px, #16181C ${11 * s}px)` }} />
              : <span style={{ ...mono(25 * s, 900), color: "#2A2214" }}>{r.v}</span>}
          </div>
        );
      })}
    </div>
  );
};

/* ---------------------------------------------------------------------------
   THE PULL FLOOR — one named test, three lanes. The SLED is the mover: large,
   bright, travelling the full panel width (§1's highest-value shape).
   ⛔ The bar fills in DISCRETE SEGMENT POPS, never one tween (§1), and the
   winning lane OVERRUNS its end stop so the gap is a distance, not a number.
   ------------------------------------------------------------------------- */
export const Lane: React.FC<{ y: number; f: number; z?: number; k: number; n: number;
  who: string; c: string; win?: boolean; s?: number; over?: number }> =
  ({ y, f, z = 40, k, n, who, c, win = false, s = 1, over = 0 }) => {
  const x0 = 96, x1 = 900;
  const segs = 10, lit = Math.round(k * segs);
  return (
    <>
      {/* the lane bed */}
      <div style={{ position: "absolute", left: x0, top: y, width: x1 - x0, height: 74 * s,
        zIndex: z, borderRadius: 4, background: `linear-gradient(180deg, ${dkh(c, 0.62)} 0%, ${dkh(c, 0.74)} 100%)`,
        border: `3px solid ${dkh(c, 0.50)}` }} />
      {/* the segment bar — discrete pops */}
      {Array.from({ length: segs }, (_, i) => (
        i < lit && <div key={"sg" + i} style={{ position: "absolute", zIndex: z + 2,
          left: x0 + 6 + i * ((x1 - x0 - 12) / segs), top: y + 6,
          width: (x1 - x0 - 12) / segs - 5, height: 62 * s, borderRadius: 3,
          background: i === lit - 1 ? mxh(c, 0.30) : c }} />
      ))}
      {/* the end stop, and the overrun past it */}
      <div style={{ position: "absolute", left: x1 - 4, top: y - 10, width: 9, height: 94 * s,
        zIndex: z + 4, background: "#0D1014" }} />
      {over > 0 && (
        <div style={{ position: "absolute", left: x1 + 5, top: y + 6, width: 44 * over,
          height: 62 * s, zIndex: z + 5, borderRadius: 3, background: mxh(c, 0.42) }} />
      )}
      {/* THE SLED — the scene's mover, and the reason it measured weak when it
          was 119x70. Large x bright x fast is the only combination that
          registers (§1); it now sweeps a 176px body down the full lane. */}
      <div style={{ position: "absolute", left: x0 + 8 + k * (x1 - x0 - 190), top: y + 6,
        width: 176 * s, height: 62 * s, zIndex: z + 8, borderRadius: 5,
        background: `linear-gradient(160deg, #F4EEE0 0%, #C6BEAA 58%, #9C947F 100%)`,
        border: `4px solid #2A2620` }}>
        {[0, 1, 2].map(i => (
          <div key={"sr" + i} style={{ position: "absolute", left: 14, top: 11 + i * 15,
            width: 138 - i * 30, height: 10, borderRadius: 4,
            background: hexa("#000000", 0.46) }} />
        ))}
      </div>
      {/* the lane's own name plate and its number */}
      <div style={{ position: "absolute", left: x0 - 2, top: y - 44 * s, zIndex: z + 6,
        display: "flex", alignItems: "baseline", gap: 14 * s }}>
        <span style={{ ...mono(38 * s, 900), color: win ? mxh(c, 0.54) : hexa("#FFFFFF", 0.80) }}>{n}</span>
        <span style={{ ...mono(19 * s, 800), color: win ? mxh(c, 0.44) : hexa("#FFFFFF", 0.62) }}>{who}</span>
      </div>
    </>
  );
};

/* ---------------------------------------------------------------------------
   ⭐ THE VILLAIN. Present from frame 0 (unlit), lights at the end of the hook,
   takes the frame at S9. The ring EMPTIES one segment at a time — discrete
   pops — while the hand sweeps SMOOTHLY and a shadow bar lags behind it, so the
   composite keeps repainting without reading as choppy (§13: overlapping action
   beats both the long ease and the stepped move).
   ------------------------------------------------------------------------- */
export const WeekClock: React.FC<{ x: number; y: number; r?: number; z?: number; f: number;
  lit?: number; left?: number; date?: string; hand?: number }> =
  ({ x, y, r = 120, z = 50, f, lit = 0, left = 1, date, hand = 0 }) => {
  const segs = 7, on = Math.max(0, Math.ceil(left * segs));
  const body = lit > 0.5 ? RED : "#3A3E44";
  return (
    <div style={{ position: "absolute", left: x - r, top: y - r, width: r * 2, height: r * 2, zIndex: z }}>
      {/* the case */}
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%",
        background: `linear-gradient(160deg, ${mxh("#2A2E34", 0.18)} 0%, #16191E 100%)`,
        border: `${r * 0.09}px solid #0C0E12` }} />
      {/* the seven day segments, emptying */}
      {Array.from({ length: segs }, (_, i) => {
        const a0 = (i / segs) * 360 - 90;
        return (
          <div key={"cs" + i} style={{ position: "absolute", left: r - r * 0.10, top: r * 0.10,
            width: r * 0.20, height: r * 0.62, borderRadius: r * 0.10,
            transformOrigin: `50% ${r * 0.90}px`, transform: `rotate(${a0 + 90}deg)`,
            /* ⛔ a SPENT segment must differ from a live one in VALUE, not hue —
               live = hot red, spent = near black. That is the luma swing the
               drain is measured by, one hard step at a time. */
            background: i < on ? (lit > 0.5 ? "#F2543A" : "#4A5058") : "#150A08",
            opacity: i < on ? 0.62 + lit * 0.38 : 0.94 }} />
        );
      })}
      {/* ⭐⭐ THE FACE IS LIGHT, AND THAT IS THE WHOLE FIX FOR THIS SCENE.
          v1 painted a dark maroon face in a dark red room and hung a dark
          sweeping shadow on it. Every part of that moved correctly and the
          scene measured 2.9-5.6, because motion ~= (area repainted) x (LUMA
          DELTA) and dark-on-dark has no delta — §1: "a colour change at equal
          luma scores zero; contrast must be in VALUE." A bone face also just
          IS what a clock looks like, so the recognition improves with it. */}
      <div style={{ position: "absolute", left: r * 0.30, top: r * 0.30, width: r * 1.40,
        height: r * 1.40, borderRadius: "50%",
        background: lit > 0.5
          ? `radial-gradient(60% 60% at 42% 34%, #F4EADA 0%, #DCCEB6 62%, #B9A88C 100%)`
          : "#20242A",
        border: `${r * 0.045}px solid ${dkh(body, 0.36)}` }} />
      {/* the hour ticks — a clock face is recognised by these before anything else */}
      {lit > 0.5 && Array.from({ length: 12 }, (_, i) => (
        <div key={"tk" + i} style={{ position: "absolute", left: r - r * 0.022, top: r * 0.36,
          width: r * 0.044, height: i % 3 === 0 ? r * 0.16 : r * 0.09,
          background: "#3A2A22", transformOrigin: `50% ${r * 0.64}px`,
          transform: `rotate(${i * 30}deg)` }} />
      ))}
      {/* the lagging shadow bar — this is what pays for smoothing the hand */}
      <div style={{ position: "absolute", left: r - r * 0.035, top: r * 0.44, width: r * 0.07,
        height: r * 0.58, borderRadius: r * 0.04, background: hexa("#000000", 0.30),
        transformOrigin: "50% 100%", transform: `rotate(${hand * 360 - 26}deg)` }} />
      {/* the hand, smooth */}
      <div style={{ position: "absolute", left: r - r * 0.045, top: r * 0.40, width: r * 0.09,
        height: r * 0.62, borderRadius: r * 0.05,
        background: lit > 0.5 ? "#241A14" : "#6E747C",
        transformOrigin: "50% 100%", transform: `rotate(${hand * 360}deg)` }} />
      <div style={{ position: "absolute", left: r - r * 0.10, top: r - r * 0.10, width: r * 0.20,
        height: r * 0.20, borderRadius: "50%", background: lit > 0.5 ? "#241A14" : "#6E747C" }} />
      {/* the date plate — the real end date, only once it is lit */}
      {date && lit > 0.5 && (
        <div style={{ position: "absolute", left: r * 0.42, top: r * 1.24, width: r * 1.16,
          height: r * 0.34, borderRadius: r * 0.05, background: "#0C0E12",
          border: `${r * 0.03}px solid ${RED}`,
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ ...mono(r * 0.21, 900), color: "#F2A090" }}>{date}</span>
        </div>
      )}
    </div>
  );
};

/* ---------------------------------------------------------------------------
   THE CONTEXT DECK — a measuring bed. A SHORT STUB stays in frame beside the
   full run, so the comparison is PROVED by two objects at the same scale rather
   than asserted by a label (the reel-99 lesson: a pile does arithmetic for you).
   ------------------------------------------------------------------------- */
export const ContextDeck: React.FC<{ y: number; f: number; z?: number; k: number;
  stamp?: string; s?: number }> = ({ y, f, z = 40, k, stamp, s = 1 }) => {
  const x0 = 70, x1 = 946, run = (x1 - x0) * k;
  return (
    <>
      {/* the deck bed with its expansion joints */}
      <div style={{ position: "absolute", left: x0, top: y, width: x1 - x0, height: 76 * s,
        zIndex: z, borderRadius: 4, background: `linear-gradient(180deg, #2E2440 0%, #191228 100%)`,
        border: `3px solid #100B1C` }} />
      {Array.from({ length: 14 }, (_, i) => (
        <div key={"dj" + i} style={{ position: "absolute", left: x0 + 8 + i * 62, top: y + 4,
          width: 3, height: 68 * s, zIndex: z + 1, background: hexa("#000000", 0.34) }} />
      ))}
      {/* THE ORDINARY STUB — stays in frame the whole time. This is the control. */}
      <div style={{ position: "absolute", left: x0 + 6, top: y - 30 * s, width: 26,
        height: 30 * s, zIndex: z + 6, borderRadius: 3, background: dkh(GOLD, 0.30),
        border: `3px solid ${dkh(GOLD, 0.52)}` }} />
      {/* the travelling coin band — the full-width high-contrast mover */}
      <div style={{ position: "absolute", left: x0 + 6, top: y - 30 * s, width: Math.max(0, run),
        height: 30 * s, zIndex: z + 5, overflow: "hidden", borderRadius: 3 }}>
        {Array.from({ length: 60 }, (_, i) => (
          <div key={"cb" + i} style={{ position: "absolute", top: 0, height: 30 * s, width: 24,
            left: ((i * 30 + f * 5.2) % (x1 - x0 + 60)) - 30,
            background: i % 2 ? dkh(GOLD, 0.50) : GOLD, borderRadius: 3 }} />
        ))}
      </div>
      {/* the rule that extends with it, ticking */}
      <div style={{ position: "absolute", left: x0, top: y + 82 * s, width: Math.max(0, run),
        height: 12 * s, zIndex: z + 4, background: mxh(VIOLET, 0.24) }} />
      {Array.from({ length: 22 }, (_, i) => (
        x0 + i * 40 < x0 + run && <div key={"rt" + i} style={{ position: "absolute",
          left: x0 + i * 40, top: y + 82 * s, width: 3, height: (i % 5 === 0 ? 26 : 14) * s,
          zIndex: z + 5, background: "#E8DCF6" }} />
      ))}
      {/* the far stop and its stamp */}
      {stamp && k > 0.97 && (
        <div style={{ position: "absolute", left: x1 - 300, top: y - 96 * s, width: 300,
          height: 58 * s, zIndex: z + 10, borderRadius: 5, background: PAPER,
          border: `4px solid ${dkh(VIOLET, 0.30)}`, display: "flex", alignItems: "center",
          justifyContent: "center" }}>
          <span style={{ ...mono(31 * s, 900), color: "#2A1E3A" }}>{stamp}</span>
        </div>
      )}
    </>
  );
};

/* ---------------------------------------------------------------------------
   THE SOFTWARE BAY — S8. Three real surfaces, each wearing its own real name on
   a hoarding. ⛔ Identity comes from SHAPE **and** COLOUR (reel 115): the three
   bays do not share one tile.
   ------------------------------------------------------------------------- */
export const SoftwareBay: React.FC<{ x: number; y: number; s?: number; z?: number; f: number;
  name: string; c: string; on: number; seat: number; logo?: string; seatAt?: number }> =
  ({ x, y, s = 1, z = 40, f, name, c, on, seat, logo, seatAt }) => {
  const wB = 270 * s, hB = 300 * s;
  /* ⭐ ALEX: *"have those logos on top of the thing shake a bit too, and have
     glowing behind as well."* Two parts, and the KICK has to be a decay, not a
     state — `seat` is an ease that reaches 1 and STAYS there, so shaking off it
     directly would rattle for ever. `seatAt` lets the bay derive its own
     exp(-t/7) kick from the frame the core actually landed on.
     ⛔ And a decaying value is ON before its start frame, so `since >= 0` gates
     it (this reel has been bitten by that three times). */
  const since = seatAt == null ? 1e6 : f - seatAt;
  const kick = since >= 0 && since < 30 ? Math.exp(-since / 7) : 0;
  const idle = on > 0.4 ? 1 : 0.3;
  const sx = Math.sin(f / 2.1 + x * 0.011) * 2.4 * idle + Math.sin(since * 1.9) * 10 * kick;
  const sy = Math.cos(f / 2.6 + x * 0.013) * 1.9 * idle + Math.cos(since * 2.2) * 8 * kick;
  const srot = Math.sin(f / 3.1 + x * 0.02) * 0.55 * idle + Math.sin(since * 1.7) * 2.8 * kick;
  const pulse = 0.5 + Math.sin(f / 9 + x * 0.02) * 0.5;
  return (
    <div style={{ position: "absolute", left: x - wB / 2, top: y - hB, width: wB, height: hB, zIndex: z }}>
      {/* the bay carcass */}
      <div style={{ position: "absolute", left: 0, top: 40 * s, width: wB, height: hB - 40 * s,
        borderRadius: 6 * s, background: `linear-gradient(180deg, ${dkh(c, 0.56)} 0%, ${dkh(c, 0.72)} 100%)`,
        border: `${4 * s}px solid ${dkh(c, 0.44)}` }} />
      {/* ⭐ THE MARK, BIG — a 132px logo on a white tile above the bay, with the
          name on a coloured strip under it. Identity is SHAPE **and** COLOUR
          (reel 115), so the tile is shared and the strip never is. */}
      {logo && (
        <div style={{ position: "absolute", left: wB / 2 - 92 * s, top: -168 * s, width: 184 * s,
          height: 184 * s,
          transform: `translate(${sx}px, ${sy}px) rotate(${srot}deg)`,
          transformOrigin: "50% 100%" }}>
          {/* ⭐ THE GLOW, behind the tile, in the BAY'S OWN COLOUR — identity is
              shape AND colour, so the halo carries the colour the shared white
              tile cannot. Held to the matte palette: no neon, it is the same
              hue the name strip already uses. */}
          <div style={{ position: "absolute", left: -76 * s, top: -66 * s, width: 336 * s,
            height: 336 * s, borderRadius: "50%",
            background: `radial-gradient(circle, ${hexa(c, (0.24 + pulse * 0.16) * (0.5 + on * 0.5) + kick * 0.34)} 0%, ${hexa(c, 0.16 * (0.4 + on * 0.6))} 40%, ${hexa(c, 0)} 70%)`,
            transform: `scale(${0.92 + pulse * 0.06 + kick * 0.3})` }} />
          <div style={{ position: "absolute", left: 0, top: 0, width: 184 * s,
            height: 184 * s, borderRadius: 22 * s, background: "#FFFFFF",
            border: `${5 * s}px solid ${dkh(c, 0.34)}`,
            boxShadow: `${SH}, 0 0 ${(16 + kick * 40) * s}px ${hexa(c, 0.34 + kick * 0.4)}`,
            display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Img src={staticFile(`logos/${logo}`)}
              style={{ width: 132 * s, height: 132 * s, objectFit: "contain" }} />
          </div>
        </div>
      )}
      <div style={{ position: "absolute", left: 6 * s, top: 0, width: wB - 12 * s, height: 46 * s,
        borderRadius: 4 * s, background: c, border: `${3 * s}px solid ${dkh(c, 0.44)}`,
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ ...mono(21 * s, 900), color: "#141008" }}>{name}</span>
      </div>
      {/* the screen — wakes on seat */}
      <div style={{ position: "absolute", left: 24 * s, top: 66 * s, width: wB - 48 * s,
        height: 128 * s, borderRadius: 4 * s, background: on > 0.4 ? "#101A20" : "#0A0D10",
        border: `${3 * s}px solid #05070A`, overflow: "hidden" }}>
        {/* ⭐ REAL CONTENT ARRIVING — ten rows landing ONE AT A TIME on a hard
            step, not six thin lines cross-fading. A row that fades in repaints
            almost nothing; a row that LANDS repaints its whole area inside one
            audit sample. */}
        {on > 0.4 && Array.from({ length: 10 }, (_, i) => {
          const at = 3 + i * 2.4;
          const k = E(f % 46, at, at + 2, 0, 1, LIN);
          if (k <= 0) return null;
          return (
            <div key={"ln" + i} style={{ position: "absolute", left: 12 * s,
              top: (9 + i * 11.6) * s,
              width: (188 - (i % 4) * 44) * s * k, height: 9 * s, borderRadius: 3 * s,
              background: i % 5 === 4 ? GREEN : i % 3 === 0 ? "#F2E0B4" : hexa(c, 0.86) }} />
          );
        })}
        {/* the green run bar sweeping */}
        {on > 0.7 && (
          <div style={{ position: "absolute", left: 0, bottom: 0, height: 10 * s,
            width: `${Math.min(100, (f % 40) * 3)}%`, background: GREEN }} />
        )}
      </div>
      {/* THE SOCKET — contained pulse, 2.7% of the panel, never a screen flash */}
      <div style={{ position: "absolute", left: 66 * s, top: 210 * s, width: wB - 132 * s,
        height: 52 * s, borderRadius: 4 * s,
        background: seat > 0.5 ? mxh(GOLD, 0.22 + 0.30 * Math.max(0, Math.sin(f / 4))) : "#0D1014",
        border: `${4 * s}px solid ${dkh(c, 0.40)}` }} />
    </div>
  );
};

/* ---------------------------------------------------------------------------
   THE HOPPER — S4. The chute opens and does not stop. Coins are 46-66px, over
   the 40px floor AND over the "survives 1012 -> 240" floor.
   ------------------------------------------------------------------------- */
export const HopperChute: React.FC<{ x: number; y: number; f: number; at: number; z?: number;
  s?: number; rate?: number }> = ({ x, y, f, at, z = 44, s = 1, rate = 1 }) => {
  const lf = f - at, open = E(lf, 0, 7, 0, 1, OUT);
  return (
    <>
      {/* the silo throat, cropped by the top edge */}
      <div style={{ position: "absolute", left: x - 210 * s, top: -60, width: 420 * s,
        height: 250 * s, zIndex: z, background: `linear-gradient(180deg, #2A1E0C 0%, #4E3A14 100%)`,
        border: `5px solid #170F04`, borderRadius: `0 0 ${26 * s}px ${26 * s}px` }} />
      {/* its ribs */}
      {[0, 1, 2].map(i => (
        <div key={"hr" + i} style={{ position: "absolute", left: x - 210 * s, top: 20 + i * 54 * s,
          width: 420 * s, height: 11 * s, zIndex: z + 1, background: hexa("#000000", 0.30) }} />
      ))}
      {/* the gate doors, swinging open */}
      {[-1, 1].map(sgn => (
        <div key={"gd" + sgn} style={{ position: "absolute", left: x + (sgn < 0 ? -190 * s : 10 * s),
          top: 186 * s, width: 180 * s, height: 22 * s, zIndex: z + 3, borderRadius: 4,
          background: "#6E5420", border: "4px solid #2A1E0C",
          transformOrigin: sgn < 0 ? "0% 50%" : "100% 50%",
          transform: `rotate(${sgn * open * 62}deg)` }} />
      ))}
      {/* the falling column — 30 coins, 46-66px, continuous */}
      {open > 0.3 && Array.from({ length: 30 }, (_, i) => {
        const sp = 3.4 + rnd(i, 7) * 3.6;
        const yy = ((lf * sp * rate + i * 41) % 760);
        const sz = 46 + rnd(i, 8) * 20;
        return (
          <div key={"fc" + i} style={{ position: "absolute", zIndex: z + 6,
            left: x - 170 * s + rnd(i, 9) * 340 * s, top: 200 + yy,
            width: sz, height: sz, borderRadius: "50%",
            background: `linear-gradient(150deg, ${mxh(GOLD, 0.30)} 0%, ${GOLD} 42%, ${dkh(GOLD, 0.40)} 100%)`,
            border: `4px solid ${dkh(GOLD, 0.52)}`,
            transform: `rotate(${lf * 6 + i * 30}deg)` }}>
            <div style={{ position: "absolute", left: "26%", top: "26%", width: "48%", height: "48%",
              borderRadius: "50%", background: hexa("#7A5A14", 0.55) }} />
          </div>
        );
      })}
    </>
  );
};

/** the pile that grows past the hero's head and then past the frame */
export const CoinPile: React.FC<{ x: number; y: number; k: number; f: number; z?: number;
  w?: number }> = ({ x, y, k, f, z = 52, w: ww = 900 }) => {
  const rows = Math.round(k * 9);
  return (
    <>
      {Array.from({ length: rows }, (_, r) =>
        Array.from({ length: 11 - r }, (_, i) => {
          const sz = 52 + rnd(r * 13 + i, 3) * 16;
          return (
            <div key={`cp${r}_${i}`} style={{ position: "absolute", zIndex: z + r,
              left: x - ((11 - r) * 78) / 2 + i * 78 + rnd(r * 7 + i, 4) * 16,
              top: y - r * 56 - rnd(r + i, 5) * 8,
              width: sz, height: sz, borderRadius: "50%",
              background: `linear-gradient(150deg, ${mxh(GOLD, 0.26)} 0%, ${GOLD} 46%, ${dkh(GOLD, 0.42)} 100%)`,
              border: `4px solid ${dkh(GOLD, 0.50)}`,
              transform: `rotate(${rnd(r * 3 + i, 6) * 40 - 20}deg)` }}>
              <div style={{ position: "absolute", left: "27%", top: "27%", width: "46%",
                height: "46%", borderRadius: "50%", background: hexa("#7A5A14", 0.50) }} />
            </div>
          );
        })
      )}
    </>
  );
};

/* ---------------------------------------------------------------------------
   S7's OUT GATES — the four spoken nouns leave the yard as four DIFFERENT
   objects, cut to their measured word onsets.
   ------------------------------------------------------------------------- */
export const OutGate: React.FC<{ x: number; y: number; f: number; at: number; z?: number;
  c: string; label: string }> = ({ x, y, f, at, z = 40, c, label }) => {
  const lf = f - at, flap = E(lf, 0, 5, 0, 1, OUT) - E(lf, 8, 16, 0, 1, IO);
  return (
    <div style={{ position: "absolute", left: x - 96, top: y - 150, width: 192, height: 150, zIndex: z }}>
      <div style={{ position: "absolute", left: 0, top: 30, width: 192, height: 120, borderRadius: 5,
        background: `linear-gradient(180deg, ${dkh(c, 0.50)} 0%, ${dkh(c, 0.68)} 100%)`,
        border: `4px solid ${dkh(c, 0.40)}` }} />
      {/* the flap, hinged at the top */}
      <div style={{ position: "absolute", left: 8, top: 34, width: 176, height: 104, borderRadius: 4,
        background: c, border: `3px solid ${dkh(c, 0.44)}`, transformOrigin: "50% 0%",
        transform: `rotateX(${flap * 78}deg)` }} />
      <div style={{ position: "absolute", left: 0, top: 0, width: 192, height: 28, borderRadius: 4,
        background: dkh(c, 0.30), display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ ...mono(15, 900), color: hexa("#FFFFFF", 0.80) }}>{label}</span>
      </div>
    </div>
  );
};

/** the fourth output the 118 kit has no window for: a film reel + a player */
export const VideoView: React.FC<{ x: number; y: number; s?: number; z?: number; f: number }> =
  ({ x, y, s = 1, z = 54, f }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 300 * s, height: 206 * s, zIndex: z,
    borderRadius: 9 * s, overflow: "hidden", boxShadow: SH_D,
    background: "#14171C", border: `${4 * s}px solid #07090C` }}>
    {/* the picture — a moving bar chart of luma, i.e. a shot changing */}
    <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 150 * s,
      background: `linear-gradient(170deg, #3E4E62 0%, #6E5A48 58%, #241E1A 100%)` }}>
      {Array.from({ length: 5 }, (_, i) => (
        <div key={"vf" + i} style={{ position: "absolute", bottom: 0,
          left: (10 + i * 58) * s, width: 44 * s,
          height: (30 + Math.abs(Math.sin(f / 9 + i)) * 82) * s,
          background: hexa(i % 2 ? "#E7B24C" : "#7FC0C9", 0.72) }} />
      ))}
    </div>
    {/* the sprocket strips top and bottom — what says FILM */}
    {[0, 1].map(r => (
      <div key={"sp" + r} style={{ position: "absolute", left: 0, width: "100%", height: 18 * s,
        top: r ? 132 * s : 0, background: "#0A0C10", display: "flex", gap: 10 * s,
        alignItems: "center", paddingLeft: ((f * 2) % 28) * s }}>
        {Array.from({ length: 12 }, (_, i) => (
          <div key={"sh" + i} style={{ width: 14 * s, height: 10 * s, borderRadius: 2 * s,
            background: "#4A4E56" }} />
        ))}
      </div>
    ))}
    {/* the transport bar */}
    <div style={{ position: "absolute", left: 0, bottom: 0, width: "100%", height: 52 * s,
      background: "#1E232A", display: "flex", alignItems: "center", paddingLeft: 12 * s, gap: 10 * s }}>
      <div style={{ width: 0, height: 0, borderTop: `${11 * s}px solid transparent`,
        borderBottom: `${11 * s}px solid transparent`, borderLeft: `${18 * s}px solid ${GREEN}` }} />
      <div style={{ flex: 1, height: 10 * s, borderRadius: 5 * s, background: "#39404A",
        marginRight: 12 * s, overflow: "hidden" }}>
        <div style={{ width: `${(f * 2.4) % 100}%`, height: "100%", background: CLAY }} />
      </div>
    </div>
  </div>
);

/* ---------------------------------------------------------------------------
   THE CTA STENCIL — the keyword, once, huge, stamped on its own measured onset.
   ------------------------------------------------------------------------- */
export const Stencil: React.FC<{ x: number; y: number; f: number; at: number; z?: number;
  s?: number; word: string }> = ({ x, y, f, at, z = 70, s = 1, word }) => {
  const lf = f - at;
  const drop = E(lf, 0, 4, 0, 1, IN_Q);
  const hit = E(lf, 4, 8, 0, 1, OUT);
  if (lf < 0) return null;
  const wS = 420 * s, hS = 168 * s;
  return (
    <div style={{ position: "absolute", left: x - wS / 2, top: y - hS + (1 - drop) * -180,
      width: wS, height: hS, zIndex: z, transform: `scale(${1 + (1 - hit) * 0.16})`,
      transformOrigin: "50% 100%" }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 8 * s, background: "#1A1610",
        border: `${7 * s}px solid ${GOLD}` }} />
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center",
        justifyContent: "center" }}>
        <span style={{ ...mono(104 * s, 900), color: GOLD, letterSpacing: 6 * s }}>{word}</span>
      </div>
    </div>
  );
};

/* ---------------------------------------------------------------------------
   ⭐⭐⭐ THE RUN BAND — §1's highest-value per-scene shape, as one component.
   "A full-width high-contrast travelling band (a conveyor, a chain, a cable
   run)": one scene measured 10.44 against its neighbour's 2.83 at identical
   push. The reason is the formula — motion ~= (fraction of the panel repainted
   per 0.1s) x (luma delta) — and a band that crosses the whole panel sweeps
   more area per sample than anything else available.

   ⛔ IT MUST ALTERNATE LIGHT AND SHADOW. Reel 106's first attempt was light
   bands only: it scored 7.79 and lifted the black point 47.4 -> 56.1, which is
   the wash-out §8 exists to ban, reached for without noticing. Interleaving a
   DARK carrier between the light loads fixed both at once (9.92, black point
   back down) — and it is also just what a loaded conveyor looks like.
   ⛔ EVERY CARRIED LOAD IS >= 46px ON ITS SHORT SIDE, because the audit scales
   1012 -> 240 and a 40px object differences at 9px.
   ------------------------------------------------------------------------- */
export const RunBand: React.FC<{ y: number; f: number; z?: number; rate?: number;
  h?: number; c?: string; loads?: string[]; pitch?: number; hang?: boolean;
  loadH?: number; loadW?: number }> =
  ({ y, f, z = 27, rate = 5.4, h = 16, c = SLATE, loads = [CLAY, GREEN, GOLD, TEAL, VIOLET],
     pitch = 132, hang = false, loadH = 66, loadW = 88 }) => {
  const span = W + pitch * 2;
  return (
    <>
      {/* the carrier itself — a dark rail, so every load is light-against-shadow */}
      <div style={{ position: "absolute", left: 0, top: y, width: W, height: h, zIndex: z,
        background: `linear-gradient(180deg, ${mxh(c, 0.18)} 0%, ${dkh(c, 0.56)} 100%)` }} />
      {Array.from({ length: Math.ceil(W / pitch) + 2 }, (_, i) => {
        const gx = ((i * pitch + f * rate) % span + span) % span - pitch;
        const lc = loads[i % loads.length];
        const sway = hang ? Math.sin(f / 13 + i * 1.3) * 4.5 : 0;
        return (
          <React.Fragment key={"rb" + i}>
            {hang && (
              <div style={{ position: "absolute", left: gx + loadW / 2 - 3, top: y + h,
                width: 6, height: 40, zIndex: z + 1, background: dkh(c, 0.30),
                transformOrigin: "50% 0%", transform: `rotate(${sway}deg)` }} />
            )}
            {/* ⛔ NOT A COLOURED RECTANGLE WITH A STRIPE ON IT (Alex: "too much
                rectangle based and shape based"). A real eleven-part crate. */}
            <div style={{ position: "absolute", left: gx, top: hang ? y + h + 36 : y - loadH + 4,
              zIndex: z + 2, transformOrigin: hang ? "50% -90%" : "50% 100%",
              transform: `rotate(${sway}deg)` }}>
              <Crate x={0} y={0} w={loadW} h={loadH} c={lc} z={z + 2} mark={i % 2 === 0} />
            </div>
          </React.Fragment>
        );
      })}
    </>
  );
};


/* ---------------------------------------------------------------------------
   ⭐⭐⭐ THE LIMIT METER — the rebuilt hook's dominant object.
   Alex on v1: *"the initial hook graphic is not interesting enough… the hook
   scene is not interesting."* v1's mechanism was a SEAT: a slab slid into a
   slot, which is an installation, i.e. a progress bar in a different costume —
   you can predict the ending from frame 8.

   ⭐ The new mechanism is one different word: **BREAKING THE STOP.** Every
   Claude Code user knows the usage bar and knows what its end feels like. So
   the bar is the whole frame, it is pegged at a hard END STOP, and when the
   unmarked core goes in the fill does not politely reach 100% — it hits the
   stop, TEARS IT OFF, and keeps running out of the panel. "Unlimited" is said
   with no word for it, and the hook does not resolve: it never says HOW.
   ------------------------------------------------------------------------- */
export const LimitMeter: React.FC<{ x: number; y: number; w?: number; f: number;
  z?: number; fill: number; stopOff: number; hotTo?: number; label: string }> =
  ({ x, y, w: ww = 820, f, z = 44, fill, stopOff, hotTo = 0, label }) => {
  const h = 118, segs = 16;
  const lit = Math.round(Math.min(1, fill) * segs);
  const over = Math.max(0, fill - 1);
  return (
    <div style={{ position: "absolute", left: x - ww / 2, top: y - h, width: ww, height: h, zIndex: z }}>
      {/* the case — a real instrument: bezel, screw corners, a machined lip */}
      <div style={{ position: "absolute", left: -16, top: -18, width: ww + 32, height: h + 36,
        borderRadius: 12, background: `linear-gradient(180deg, #7E868F 0%, #3E444C 100%)`,
        border: "6px solid #14171C" }} />
      {[[-2, -4], [ww + 2, -4], [-2, h + 14], [ww + 2, h + 14]].map((c, i) => (
        <div key={"sc" + i} style={{ position: "absolute", left: c[0], top: c[1], width: 16, height: 16,
          borderRadius: 16, background: "#12151A", border: "3px solid #5A626C" }} />
      ))}
      {/* the track */}
      <div style={{ position: "absolute", left: 0, top: 0, width: ww, height: h, borderRadius: 6,
        background: `linear-gradient(180deg, #2A3038 0%, #171B21 100%)`, overflow: "visible" }} />
      {/* the graduated scale above it */}
      {Array.from({ length: segs + 1 }, (_, i) => (
        <div key={"gd" + i} style={{ position: "absolute", left: i * (ww / segs) - 2, top: -16,
          width: 4, height: i % 4 === 0 ? 16 : 9, background: "#8E96A2" }} />
      ))}
      {/* THE FILL — discrete segments, so each step lands inside one sample */}
      {Array.from({ length: segs }, (_, i) => {
        if (i >= lit) return null;
        const taken = (i + 1) / segs <= hotTo;          /* gold has reached this one */
        const edge = Math.abs((i + 1) / segs - hotTo) < 1 / segs;   /* the leading edge */
        return (
          <div key={"fl" + i} style={{ position: "absolute", zIndex: 3,
            left: 8 + i * ((ww - 16) / segs), top: 10,
            width: (ww - 16) / segs - 6, height: h - 20, borderRadius: 4,
            background: edge && hotTo > 0 ? "#FFF0C0"
              : taken ? `linear-gradient(180deg, ${GOLD} 0%, ${dkh(GOLD, 0.30)} 100%)`
              : `linear-gradient(180deg, #F2604A 0%, #B8341F 100%)` }} />
        );
      })}
      {/* the run that keeps going PAST the case once the stop is off */}
      {over > 0 && (
        <div style={{ position: "absolute", left: ww + 18, top: 10, width: over * 900,
          height: h - 20, borderRadius: 4, zIndex: 3,
          background: `linear-gradient(90deg, ${GOLD} 0%, ${mxh(GOLD, 0.30)} 100%)` }} />
      )}
      {/* ⭐ THE END STOP — the thing that gets torn off. Before: a heavy cast
          block bolted across the end of the track. After: gone, tumbling. */}
      <div style={{ position: "absolute", zIndex: 8,
        left: ww - 10 + stopOff * 300, top: -26 - stopOff * 210,
        width: 40, height: h + 46, borderRadius: 5,
        background: `linear-gradient(180deg, #C9CDD4 0%, #6E747C 52%, #3A3F46 100%)`,
        border: "5px solid #14171C",
        transform: `rotate(${stopOff * 190}deg)`, transformOrigin: "50% 100%" }}>
        {[0, 1].map(i => (
          <div key={"sb" + i} style={{ position: "absolute", left: 8, top: 18 + i * 96,
            width: 14, height: 14, borderRadius: 14, background: "#14171C" }} />
        ))}
      </div>
      {/* the label plate, bottom-left of the case — ONE string */}
      <div style={{ position: "absolute", left: 4, top: h + 20, zIndex: 9 }}>
        <span style={{ ...mono(21, 900), color: hotTo > 0.5 ? GOLD : hexa("#FFFFFF", 0.66) }}>{label}</span>
      </div>
    </div>
  );
};

/* ---------------------------------------------------------------------------
   ⭐⭐ THE BENCH CHART — Alex: *"try to find a benchmark image showing how the
   Ox Alpha is better."*
   ⛔ THERE IS NO REAL ONE TO FIND, and that is a fact worth writing down: the
   OpenRouter listing publishes NO scores ("no intelligence index, no coding
   leaderboard number"), so every figure in circulation is community-reported.
   Sourcing a "leaderboard screenshot" would mean fabricating one, which is
   [[feedback_real_marks_are_the_props]]'s "a made-up number on a receipt-shaped
   object is the most believable kind of wrong".
   ⭐ So this is a real CHART drawn in the recognisable form — title, named rows
   carrying each model's REAL mark, gridlines, an axis, scores — with the real
   numbers and the provenance printed ON it.
   ------------------------------------------------------------------------- */
export const BenchChart: React.FC<{ x: number; y: number; w?: number; f: number; z?: number;
  title: string; note: string;
  /** ⭐ each row carries its OWN arrival frame, so the chart ASSEMBLES to the
      words being spoken instead of sitting there complete. §1: real content
      arriving is worth more than any effect (a stuck second 6.3-6.9 -> 8.0-8.5),
      and a chart that is simply PRESENT is a poster with bars on it. */
  rows: Array<{ who: string; n: number; c: string; logo?: string; at: number }>;
  }> = ({ x, y, w: ww = 880, f, z = 44, title, note, rows }) => {
  const h = 78 + rows.length * 112 + 46;
  const plotX = 250, plotW = ww - plotX - 84;
  const frame = E(f, 0, 7, 0, 1, BACK);            /* the board itself drops in */
  return (
    <div style={{ position: "absolute", left: x - ww / 2, top: y - h, width: ww, height: h, zIndex: z,
      borderRadius: 10, background: `linear-gradient(180deg, #101A24 0%, #0A1118 100%)`,
      border: "6px solid #223040", boxShadow: SH_D,
      transform: `scaleY(${frame})`, transformOrigin: "50% 100%" }}>
      {/* the chart's head: title left, provenance right — a real chart says both */}
      <div style={{ position: "absolute", left: 22, top: 16 }}>
        <span style={{ ...mono(29, 900), color: "#DCE8F2" }}>{title}</span>
      </div>
      <div style={{ position: "absolute", right: 22, top: 24 }}>
        <span style={{ ...mono(15, 700), color: hexa("#9FC4E8", 0.72) }}>{note}</span>
      </div>
      <div style={{ position: "absolute", left: 22, top: 58, right: 22, height: 3,
        background: hexa("#9FC4E8", 0.26) }} />
      {/* gridlines + axis ticks at 0/25/50/75/100 */}
      {[0, 0.25, 0.5, 0.75, 1].map((g, i) => (
        <React.Fragment key={"gl" + i}>
          <div style={{ position: "absolute", left: plotX + g * plotW, top: 74,
            width: 2, height: h - 122, background: hexa("#9FC4E8", i === 0 ? 0.40 : 0.14) }} />
          <div style={{ position: "absolute", left: plotX + g * plotW - 14, top: h - 38, width: 32,
            textAlign: "center" }}>
            <span style={{ ...mono(14, 700), color: hexa("#9FC4E8", 0.56) }}>{g * 100}</span>
          </div>
        </React.Fragment>
      ))}
      {rows.map((r, i) => {
        const lf = f - r.at;
        const land = E(f, 2, 9, 0, 1, BACK);                 /* the row label is there from the start */
        const grown = lf < 0 ? 0 : E(lf, 0, 30, 0, 1, LIN);  /* the BAR arrives on the word */
        const stepped = Math.round(grown * 10) / 10;         /* discrete pops, not a tween */
        const bw = plotW * (r.n / 100) * stepped;
        const top = 88 + i * 112;
        return (
          <React.Fragment key={"br" + i}>
            {/* the leading edge — a bright cap on the growing bar, so the thing
                that moves is the highest-contrast thing in the row */}
            {stepped > 0.02 && stepped < 1 && (
              <div style={{ position: "absolute", left: plotX + bw - 10, top: top - 4,
                width: 20, height: 114, borderRadius: 3, background: "#FFF4D2" }} />
            )}
            {/* the row label carries the model's REAL mark on a white tile */}
            {r.logo && (
              <div style={{ position: "absolute", left: 24, top: top + 26, width: 54 * land, height: 54 * land,
                borderRadius: 12, background: "#FFFFFF", border: "3px solid #E8DCC0",
                display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Img src={staticFile(`logos/${r.logo}`)}
                  style={{ width: 38, height: 38, objectFit: "contain" }} />
              </div>
            )}
            <div style={{ position: "absolute", left: 90, top: top + 40, opacity: land }}>
              <span style={{ ...mono(21, 800), color: "#C8DCEE" }}>{r.who}</span>
            </div>
            {/* the bar — and the hatch running inside it, which is where this
                scene's motion actually lives */}
            <div style={{ position: "absolute", left: plotX, top: top, width: bw, height: 106,
              borderRadius: 4, overflow: "hidden",
              background: `linear-gradient(180deg, ${mxh(r.c, 0.22)} 0%, ${dkh(r.c, 0.20)} 100%)`,
              border: `3px solid ${dkh(r.c, 0.46)}` }}>
              {Array.from({ length: 26 }, (_, q) => (
                <div key={"hx" + q} style={{ position: "absolute", top: -30, height: 170, width: 34,
                  left: ((q * 68 + f * 6.4) % (plotW + 136)) - 68,
                  transform: "skewX(-22deg)",
                  background: q % 2 ? hexa("#000000", 0.26) : hexa("#FFFFFF", 0.24) }} />
              ))}
            </div>
            {/* the score, riding the bar's end */}
            {stepped > 0.05 && (
              <div style={{ position: "absolute", left: plotX + bw + 16, top: top + 26 }}>
                <span style={{ ...mono(44, 900), color: mxh(r.c, 0.38) }}>
                  {Math.round(r.n * stepped)}</span>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

/* ---------------------------------------------------------------------------
   ⭐ A REAL CRATE, because Alex: *"a lot of the animations is too much rectangle
   based and shape based when it should be more interesting scene based."*
   The `RunBand` loads were a coloured rect with two stripes on it — which is
   [[feedback_props_need_real_drawing]]'s "a book was 4 divs" and reel 112's "a
   container is still a container when it is a nice box", both at once.
   Eleven drawn parts: two end battens · three face slats · a diagonal brace ·
   four corner brackets · a strap with a buckle · a stencilled mark · a lid line.
   ------------------------------------------------------------------------- */
export const Crate: React.FC<{ x: number; y: number; w?: number; h?: number; c?: string;
  z?: number; rot?: number; mark?: boolean }> =
  ({ x, y, w: ww = 92, h: hh = 72, c = "#8A6A44", z = 40, rot = 0, mark }) => (
  <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z,
    transform: `rotate(${rot}deg)`, transformOrigin: "50% 0%" }}>
    {/* the body */}
    <div style={{ position: "absolute", inset: 0, borderRadius: 3,
      background: `linear-gradient(172deg, ${mxh(c, 0.20)} 0%, ${c} 46%, ${dkh(c, 0.30)} 100%)`,
      border: `${Math.max(3, ww * 0.045)}px solid ${dkh(c, 0.52)}` }} />
    {/* three face slats */}
    {[0.28, 0.54, 0.80].map((t, i) => (
      <div key={"sl" + i} style={{ position: "absolute", left: ww * 0.06, top: hh * t,
        width: ww * 0.88, height: Math.max(2, hh * 0.045), background: hexa("#000000", 0.26) }} />
    ))}
    {/* two end battens */}
    {[0.06, 0.80].map((l, i) => (
      <div key={"bt" + i} style={{ position: "absolute", left: ww * l, top: hh * 0.06,
        width: ww * 0.14, height: hh * 0.88, background: hexa(dkh(c, 0.22), 0.85) }} />
    ))}
    {/* the diagonal brace */}
    <div style={{ position: "absolute", left: ww * 0.18, top: hh * 0.48, width: ww * 0.66,
      height: Math.max(3, hh * 0.06), background: hexa(dkh(c, 0.30), 0.9),
      transform: "rotate(-19deg)", transformOrigin: "0% 50%" }} />
    {/* four corner brackets */}
    {[[0, 0], [1, 0], [0, 1], [1, 1]].map((q, i) => (
      <div key={"cb" + i} style={{ position: "absolute",
        left: q[0] ? ww * 0.78 : ww * 0.04, top: q[1] ? hh * 0.74 : hh * 0.04,
        width: ww * 0.18, height: hh * 0.22, background: "#5A5F66", borderRadius: 2 }} />
    ))}
    {/* the strap and its buckle */}
    <div style={{ position: "absolute", left: ww * 0.40, top: -2, width: ww * 0.16, height: hh + 4,
      background: hexa("#3A2E20", 0.86) }} />
    <div style={{ position: "absolute", left: ww * 0.36, top: hh * 0.40, width: ww * 0.24,
      height: hh * 0.20, borderRadius: 2, background: "#B9A87E", border: "2px solid #4A3E28" }} />
    {/* the stencil */}
    {mark && (
      <div style={{ position: "absolute", left: ww * 0.60, top: hh * 0.12, width: ww * 0.30,
        height: hh * 0.24, borderRadius: 2, background: hexa("#F2E6C6", 0.30) }} />
    )}
  </div>
);

/* ---------------------------------------------------------------------------
   ⭐ THE SCENE WIPE — Alex: *"there needs to be maybe more animations between
   the scenes."* ⛔ And [[feedback_no_flashing_transitions]] is standing: no
   iris, no white flash, no black plate. So the transition is a PHYSICAL one —
   a loaded carrier swings through the foreground on the cut and takes the join
   with it. It is the same overhead run the sets already have, brought to the
   front for eight frames, so it reads as the world moving rather than as an
   effect laid over it.
   ------------------------------------------------------------------------- */
export const SceneWipe: React.FC<{ f: number; dir?: 1 | -1; z?: number; c?: string;
  dur?: number; n?: number }> =
  ({ f, dir = 1, z = 88, c = "#5A4A34", dur = 11, n = 4 }) => {
  if (f > dur + 2) return null;
  const k = E(f, 0, dur, 0, 1, IO);
  const travel = 1500;
  return (
    <>
      {Array.from({ length: n }, (_, i) => {
        const base = dir > 0 ? -560 - i * 300 : W + 300 + i * 300;
        const x = base + dir * k * travel;
        const sway = Math.sin(f / 4 + i) * 5;
        return (
          <React.Fragment key={"sw" + i}>
            {/* the hanger, cropped by the top edge — this is what makes it a
                foreground MASS rather than a shape sliding past */}
            <div style={{ position: "absolute", left: x + 128, top: -40, width: 18,
              height: 250, zIndex: z, background: dkh(c, 0.76),
              transformOrigin: "50% 0%", transform: `rotate(${sway}deg)` }} />
            <div style={{ position: "absolute", left: x, top: 190, zIndex: z + 1,
              transformOrigin: "50% -60%", transform: `rotate(${sway}deg)` }}>
              <Crate x={0} y={0} w={272} h={214} c={dkh(c, 0.62)} z={z + 1} mark />
            </div>
          </React.Fragment>
        );
      })}
    </>
  );
};


/* ---------------------------------------------------------------------------
   ⭐⭐⭐ THE OX — Alex: *"the ox alpha should show like an ox… hierarchical ox
   like sprite character in the bullpen beating the other models. I like more
   interesting animations like this idea."*

   ⛔ This is NOT a borrowed world ([[feedback_real_marks_are_the_props]]): the
   model's own NAME is ox-alpha, so an ox IS the subject's own noun, the same
   way reel 118's gauntlet was. It carries the real name on its own blanket and
   the rivals keep their real marks, so nothing here needs translating.

   ⛔ AND IT IS DRAWN, NOT PRIMITIVED ([[feedback_props_need_real_drawing]] —
   "a book was 4 divs"). Twenty parts: body mass · shoulder hump · haunch ·
   neck · head · muzzle · two horns · two ears · two eyes · nose ring · four
   legs · two hooves · tail with a tuft · harness blanket · name plate.
   ------------------------------------------------------------------------- */
export const Ox: React.FC<{ x: number; y: number; s?: number; z?: number; f: number;
  /** 0..1 — head down, weight forward, legs braced. The pulling posture. */
  charge?: number;
  flip?: boolean; name?: string; rug?: boolean;
  /** 0..1 — strain: the body compresses and a fast tremble comes in */
  strain?: number }> =
  ({ x, y, s = 1, z = 60, f, charge = 0, flip = false, name, strain = 0, rug = true }) => {
  const W0 = 430 * s, H0 = 300 * s;
  const X = (k: number) => W0 * k, Y = (k: number) => H0 * k;
  /* ⛔ v1 OF THIS SPRITE WAS A BOX ON FOUR STICKS (Alex: *"the ox doesn't look
     good here"*): a rounded-rect body, a rounded-rect head with a grey pad for a
     muzzle, four straight bars for legs, and a gold slab covering the whole
     torso. Nothing about it was an ANIMAL.
     ⭐ Redrawn to the silhouette an ox is actually recognised by — and it is a
     SILHOUETTE problem, not a detail problem (§11: an object is recognised by
     its outline, and the outline needs room):
       a DEEP BRISKET that drops below the belly · a high SHOULDER HUMP · a back
       that SLOPES to the rump · a short thick neck carrying the head LOW · a
       wedge skull tapering to a broad muzzle · horns that sweep OUT then UP ·
       a DEWLAP hanging under the throat · legs in TWO segments with a knee and
       a tapered cannon · a tufted tail.
     The blanket is now a rug over the BACK, not a slab over the whole animal. */
  const HIDE = "#3A342B", HIDE2 = "#4E4638", DARK = "#1E1A15", BLACK = "#14110D";
  const breath = Math.sin(f / 11) * 2.6 * s;
  const bob = Math.sin(f / 13) * 3 * s * (1 - charge * 0.7);
  const trem = strain > 0.4 ? Math.sin(f * 1.9) * 2.4 * s * (strain - 0.4) * 2 : 0;
  const lean = charge * 9;
  const sink = charge * 10 * s + strain * 8 * s;
  /* the legs: front pair braced when charging, back pair driving */
  const leg = (i: number) => (1 - charge) * Math.sin(f / 9 + i * 1.7) * 5;
  const Leg = ({ lx, back, i }: { lx: number; back: boolean; i: number }) => (
    <div style={{ position: "absolute", left: X(lx), top: Y(0.66),
      width: 46 * s, height: Y(0.36), zIndex: back ? 1 : 6,
      transformOrigin: "50% 0%", transform: `rotate(${leg(i) + (back ? charge * 16 : -charge * 12)}deg)` }}>
      {/* upper — thick, tapering */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 46 * s, height: Y(0.20),
        borderRadius: `${16 * s}px ${16 * s}px ${8 * s}px ${8 * s}px`,
        background: back ? dkh(HIDE, 0.40) : HIDE }} />
      {/* the knee */}
      <div style={{ position: "absolute", left: 5 * s, top: Y(0.17), width: 36 * s, height: 22 * s,
        borderRadius: "50%", background: back ? dkh(HIDE, 0.50) : dkh(HIDE, 0.16) }} />
      {/* cannon — narrower */}
      <div style={{ position: "absolute", left: 10 * s, top: Y(0.21), width: 26 * s,
        height: Y(0.13), borderRadius: 6 * s, background: back ? dkh(HIDE, 0.46) : dkh(HIDE, 0.12) }} />
      {/* the hoof — a wedge, wider at the ground */}
      <div style={{ position: "absolute", left: 4 * s, top: Y(0.33), width: 38 * s, height: 24 * s,
        borderRadius: `${5 * s}px ${5 * s}px ${9 * s}px ${9 * s}px`, background: BLACK,
        clipPath: "polygon(14% 0, 86% 0, 100% 100%, 0% 100%)" }} />
    </div>
  );
  return (
    <div style={{ position: "absolute", left: x - W0 / 2, top: y - H0, width: W0, height: H0,
      zIndex: z, transform: `${flip ? "scaleX(-1)" : ""} translate(${trem}px, ${bob + sink}px) rotate(${flip ? -lean : lean}deg)`,
      transformOrigin: "50% 100%" }}>
      {/* ── back legs (behind the body) ───────────────────────────────────── */}
      <Leg lx={0.10} back i={0} /><Leg lx={0.21} back i={1} />

      {/* ── the tail, off the rump, with a real tuft ──────────────────────── */}
      <div style={{ position: "absolute", left: X(0.03), top: Y(0.30), width: 10 * s,
        height: Y(0.40), background: dkh(HIDE, 0.34), borderRadius: 6 * s, zIndex: 2,
        transformOrigin: "50% 0%", transform: `rotate(${Math.sin(f / 8) * 11 - 6}deg)` }}>
        <div style={{ position: "absolute", left: -9 * s, bottom: -14 * s, width: 28 * s,
          height: 40 * s, borderRadius: "44% 44% 50% 50%", background: BLACK }} />
      </div>

      {/* ── the RUMP: high at the hip, rounding down to the tail ──────────── */}
      <div style={{ position: "absolute", left: X(0.02), top: Y(0.30), width: X(0.34),
        height: Y(0.46), zIndex: 3, borderRadius: "52% 26% 22% 40%",
        background: `linear-gradient(196deg, ${HIDE2} 0%, ${HIDE} 58%, ${DARK} 100%)` }} />

      {/* ── the BARREL: the deep body, sloping up toward the shoulder ─────── */}
      <div style={{ position: "absolute", left: X(0.18), top: Y(0.32) - breath * 0.4,
        width: X(0.50), height: Y(0.44), zIndex: 4, borderRadius: "30% 34% 26% 26%",
        background: `linear-gradient(184deg, ${HIDE2} 0%, ${HIDE} 50%, ${DARK} 100%)` }} />

      {/* ── the BRISKET: the chest mass that drops BELOW the belly line. This
             one shape is most of what separates an ox from a rounded box. ──── */}
      <div style={{ position: "absolute", left: X(0.54), top: Y(0.38), width: X(0.24),
        height: Y(0.42), zIndex: 5, borderRadius: "36% 30% 46% 52%",
        background: `linear-gradient(200deg, ${HIDE} 0%, ${DARK} 100%)` }} />

      {/* ── the SHOULDER HUMP, above the front legs ───────────────────────── */}
      <div style={{ position: "absolute", left: X(0.52), top: Y(0.20) - breath, width: X(0.26),
        height: Y(0.26), zIndex: 5, borderRadius: "58% 52% 20% 20%",
        background: `linear-gradient(180deg, ${mxh(HIDE, 0.16)} 0%, ${HIDE} 100%)` }} />

      {/* ── the RUG over the back, strapped — not a slab over the whole animal ─
             ⛔ `rug={false}` clears the flank. The hook brands a 128px word onto
             this animal and cannot share the hide with a name plate. */}
      {rug && (<>
      <div style={{ position: "absolute", left: X(0.20), top: Y(0.30), width: X(0.32),
        height: Y(0.22), zIndex: 7, borderRadius: `${6 * s}px ${6 * s}px ${3 * s}px ${3 * s}px`,
        background: `linear-gradient(180deg, ${GOLD} 0%, ${dkh(GOLD, 0.34)} 100%)`,
        border: `${3 * s}px solid ${dkh(GOLD, 0.54)}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        transform: `skewX(-6deg)` }}>
        <span style={{ ...mono(17 * s, 900), color: "#2A1D06",
          transform: flip ? "scaleX(-1)" : undefined }}>{name ?? "ox-alpha"}</span>
      </div>
      <div style={{ position: "absolute", left: X(0.28), top: Y(0.30), width: 9 * s,
        height: Y(0.30), zIndex: 8, background: hexa("#3A2E20", 0.80) }} />
      </>)}

      {/* ── front legs ────────────────────────────────────────────────────── */}
      <Leg lx={0.56} back={false} i={2} /><Leg lx={0.68} back={false} i={3} />

      {/* ── NECK: short, thick, carrying the head LOW and forward ─────────── */}
      <div style={{ position: "absolute", left: X(0.68), top: Y(0.26) + charge * Y(0.10),
        width: X(0.20), height: Y(0.30), zIndex: 9, borderRadius: "40% 30% 30% 40%",
        background: `linear-gradient(160deg, ${HIDE} 0%, ${DARK} 100%)`,
        transformOrigin: "10% 20%", transform: `rotate(${charge * 16}deg)` }} />
      {/* the DEWLAP hanging under the throat */}
      <div style={{ position: "absolute", left: X(0.72), top: Y(0.48) + charge * Y(0.10),
        width: X(0.13), height: Y(0.20), zIndex: 9, borderRadius: "20% 20% 60% 40%",
        background: dkh(HIDE, 0.26), transformOrigin: "10% 0%",
        transform: `rotate(${charge * 14}deg)` }} />

      {/* ── THE HEAD: a wedge skull tapering into a broad muzzle ──────────── */}
      <div style={{ position: "absolute", left: X(0.76), top: Y(0.30) + charge * Y(0.13),
        width: X(0.24), height: Y(0.34), zIndex: 12,
        transformOrigin: "6% 20%", transform: `rotate(${charge * 18}deg)` }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: `${18 * s}px ${10 * s}px ${26 * s}px ${30 * s}px`,
          background: `linear-gradient(150deg, ${HIDE2} 0%, ${HIDE} 42%, ${DARK} 100%)`,
          clipPath: "polygon(0 6%, 74% 0, 100% 46%, 92% 92%, 34% 100%, 0 74%)" }} />
        {/* the muzzle — broad, paler, with two real nostrils */}
        <div style={{ position: "absolute", left: "30%", top: "56%", width: "74%", height: "44%",
          borderRadius: `${8 * s}px ${14 * s}px ${18 * s}px ${16 * s}px`, background: "#6E6252" }}>
          {[0.14, 0.56].map((nx, i) => (
            <div key={"nz" + i} style={{ position: "absolute", left: `${nx * 100}%`, top: "26%",
              width: 12 * s, height: 16 * s, borderRadius: "50% 50% 40% 40%", background: "#2A241C",
              transform: `rotate(${i ? 14 : -14}deg)` }} />
          ))}
        </div>
        {/* the eye, set high and to the side the way a grazing animal's is */}
        <div style={{ position: "absolute", left: "20%", top: "20%", width: 22 * s, height: 22 * s,
          borderRadius: "50%", background: "#0C0A08" }}>
          <div style={{ position: "absolute", left: "24%", top: "16%", width: "36%", height: "36%",
            borderRadius: "50%", background: hexa("#FFFFFF", 0.80) }} />
        </div>
        {/* the brass nose ring, hanging OFF the muzzle rather than over it */}
        <div style={{ position: "absolute", left: "52%", bottom: -18 * s, width: 34 * s,
          height: 34 * s, borderRadius: "50%", border: `${5 * s}px solid ${BRASS}` }} />
      </div>

      {/* ── the EARS, low and to the sides, under the horn line ───────────── */}
      {[[0.715, -44], [0.905, 16]].map((E2, i) => (
        <div key={"er" + i} style={{ position: "absolute", left: X(E2[0]),
          top: Y(0.345) + charge * Y(0.125), width: 34 * s, height: 18 * s, zIndex: 11,
          borderRadius: "60% 40% 50% 50%", background: dkh(HIDE, 0.22),
          transform: `rotate(${E2[1] + Math.sin(f / 7 + i) * 8}deg)` }} />
      ))}

      {/* ── THE HORNS: out, then UP. Tapered, bone at the base, dark at the
             tip — the one feature that carries the silhouette. ───────────── */}
      {[-1, 1].map((sgn, i) => (
        <div key={"hn" + i} style={{ position: "absolute", zIndex: 14,
          left: X(sgn < 0 ? 0.735 : 0.855), top: Y(0.155) + charge * Y(0.125),
          width: 62 * s, height: 96 * s,
          transformOrigin: "50% 100%",
          transform: `rotate(${sgn * (30 + charge * 5)}deg) scaleX(${sgn})` }}>
          {/* ⛔ a thin gradient wisp reads as ONE blob behind the head. A horn is
              a solid tapered CONE, and two of them only read as two when there
              is sky between them — so they are thicker, shorter, sprung from the
              crown, and splayed ~60 degrees apart. */}
          <div style={{ position: "absolute", inset: 0, background: "#E4DAC0",
            clipPath: "polygon(24% 100%, 76% 100%, 62% 46%, 54% 12%, 40% 0, 34% 34%)" }} />
          {/* the dark tip — the half a viewer actually uses to see the curve */}
          <div style={{ position: "absolute", left: "26%", top: 0, width: "44%", height: "46%",
            background: "#3A3226",
            clipPath: "polygon(56% 100%, 100% 78%, 62% 22%, 30% 0, 12% 26%, 30% 62%)" }} />
          {/* the growth ring at the base, so it joins the skull rather than sits on it */}
          <div style={{ position: "absolute", left: "18%", bottom: -3 * s, width: "64%",
            height: 11 * s, borderRadius: 6 * s, background: "#A89877" }} />
        </div>
      ))}

      {/* ── the breath, out of the nostrils, when it is working ───────────── */}
      {charge > 0.2 && Array.from({ length: 5 }, (_, i) => {
        const t = ((f / 3 + i * 5) % 20) / 20;
        return (
          <div key={"br" + i} style={{ position: "absolute", zIndex: 14,
            left: X(1.00) + t * 88 * s, top: Y(0.56) + charge * Y(0.13) + Math.sin(i * 2) * 12 * s,
            width: (16 + t * 42) * s, height: (13 + t * 34) * s, borderRadius: "50%",
            background: hexa("#E8E2D2", 0.36 * (1 - t)) }} />
        );
      })}
    </div>
  );
};

/* ---------------------------------------------------------------------------
   ⭐ A PENNED RIVAL — a stall with the model's REAL mark on a big plate above it.
   §15: at half a second a viewer RECOGNISES A MARK. The plates are 132px so the
   mark clears the 96px floor, and the OX beside them is 2.6x their height, which
   is what "hierarchical" means here — one dominant thing, ranked by SIZE.
   ------------------------------------------------------------------------- */
export const Stall: React.FC<{ x: number; y: number; s?: number; z?: number; f: number;
  logo: string; name: string; c: string; recoil?: number }> =
  ({ x, y, s = 1, z = 40, f, logo, name, c, recoil = 0 }) => {
  const wS = 168 * s;
  return (
    <div style={{ position: "absolute", left: x - wS / 2, top: y - 300 * s, width: wS,
      height: 300 * s, zIndex: z,
      transform: `translateX(${-recoil * 34}px) rotate(${-recoil * 5}deg)`,
      transformOrigin: "50% 100%" }}>
      {/* the post and the plate the mark rides on */}
      <div style={{ position: "absolute", left: wS / 2 - 9 * s, top: 120 * s, width: 18 * s,
        height: 180 * s, background: dkh(c, 0.52) }} />
      <div style={{ position: "absolute", left: 6 * s, top: 0, width: wS - 12 * s, height: 132 * s,
        borderRadius: 14 * s, background: "#FFFFFF", border: `${5 * s}px solid ${dkh(c, 0.40)}`,
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Img src={staticFile(`logos/${logo}`)}
          style={{ width: 92 * s, height: 92 * s, objectFit: "contain" }} />
      </div>
      {/* the name strip — identity is SHAPE and COLOUR, and the strip is the colour */}
      <div style={{ position: "absolute", left: 6 * s, top: 136 * s, width: wS - 12 * s,
        height: 34 * s, borderRadius: 5 * s, background: c,
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ ...mono(17 * s, 900), color: "#14100A" }}>{name}</span>
      </div>
      {/* the stall gate below it */}
      <div style={{ position: "absolute", left: 0, bottom: 0, width: wS, height: 92 * s }}>
        {[0, 1, 2].map(i => (
          <div key={"gr" + i} style={{ position: "absolute", left: 0, top: i * 32 * s,
            width: wS, height: 12 * s, borderRadius: 6 * s, background: dkh(c, 0.44) }} />
        ))}
      </div>
    </div>
  );
};


/* ---------------------------------------------------------------------------
   ⭐⭐ THE CONTEXT WINDOW — Alex on v2's deck: *"at 15 seconds the animation is
   too basic like it's just a line, it's not interesting and doesn't really
   represent what's being spoken well."* It was a horizontal bar of coins with a
   rule under it: a LINE, and a line cannot say "window".

   ⭐ The VO's own noun is WINDOW, so this draws one — a roller shutter over a
   lit opening, with the size stamped on the lintel. Two of them at wildly
   different scales is the whole sentence: everyone else's is a letterbox, this
   one is a hangar door you can put an entire codebase through. Hierarchy by
   SIZE, which is the only ranking that reads in half a second.
   ------------------------------------------------------------------------- */
export const ContextWindow: React.FC<{ x: number; y: number; w: number; h: number;
  f: number; z?: number; open: number; label: string; c?: string; jam?: number }> =
  ({ x, y, w: ww, h: hh, f, z = 40, open, label, c = VIOLET, jam = 0 }) => {
  const slats = Math.max(3, Math.round(hh / 26));
  const lift = open * (hh - 14);
  return (
    <div style={{ position: "absolute", left: x - ww / 2, top: y - hh, width: ww, height: hh,
      zIndex: z, transform: `translateX(${jam ? Math.sin(f * 1.6) * 5 * jam : 0}px)` }}>
      {/* the opening: a lit interior, so an OPEN window is bright and a shut one is not */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 4,
        background: `linear-gradient(180deg, ${mxh(c, 0.30)} 0%, ${dkh(c, 0.30)} 100%)` }} />
      <div style={{ position: "absolute", left: 8, top: 8, right: 8, bottom: 8, borderRadius: 3,
        overflow: "hidden", opacity: 0.34 + open * 0.66,
        background: `radial-gradient(72% 86% at 50% 100%, #FFF6DE 0%, ${mxh(c, 0.40)} 46%, ${dkh(c, 0.44)} 100%)` }}>
        {/* the inside of the opening: a floor and two receding walls, so the eye
            reads DEPTH and therefore a way through rather than a lit rectangle */}
        <div style={{ position: "absolute", left: "16%", top: 0, width: "68%", height: "100%",
          background: hexa("#000000", 0.16),
          clipPath: "polygon(0 0, 100% 0, 78% 100%, 22% 100%)" }} />
        {Array.from({ length: 5 }, (_, i) => (
          <div key={"dp" + i} style={{ position: "absolute", left: `${8 + i * 4}%`,
            right: `${8 + i * 4}%`, bottom: `${i * 15}%`, height: 3,
            background: hexa("#000000", 0.20) }} />
        ))}
      </div>
      {/* the roller shutter, rolling UP — slats, not one rectangle */}
      <div style={{ position: "absolute", left: 4, top: 4, right: 4, height: hh - 8 - lift,
        overflow: "hidden", borderRadius: 3 }}>
        {Array.from({ length: slats }, (_, i) => (
          <div key={"sl" + i} style={{ position: "absolute", left: 0, right: 0, top: i * 26,
            height: 23, borderRadius: 3,
            background: i % 2 ? dkh(c, 0.56) : dkh(c, 0.42),
            borderBottom: `2px solid ${dkh(c, 0.70)}` }} />
        ))}
      </div>
      {/* the rolled bundle at the head, which grows as the shutter goes up */}
      {open > 0.06 && (
        <div style={{ position: "absolute", left: -8, top: -10 - open * 12, right: -8,
          height: 18 + open * 22, borderRadius: 10, background: dkh(c, 0.62),
          border: `3px solid ${dkh(c, 0.76)}` }} />
      )}
      {/* the jambs and the lintel plate carrying the real figure */}
      {[-1, 1].map(s2 => (
        <div key={"jm" + s2} style={{ position: "absolute", top: -14,
          left: s2 < 0 ? -18 : ww, width: 18, height: hh + 26, background: dkh(c, 0.66) }} />
      ))}
      <div style={{ position: "absolute", left: -18, top: -58, width: ww + 36, height: 46,
        borderRadius: 4, background: "#12101A", border: `3px solid ${dkh(c, 0.60)}`,
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ ...mono(Math.min(28, ww * 0.075), 900), color: mxh(c, 0.52) }}>{label}</span>
      </div>
    </div>
  );
};

/** a real code sheet — what gets pushed through the window. ⛔ Not a rectangle:
    a page with a header bar, a rule column, six indented code lines and a fold. */
export const CodeSheet: React.FC<{ x: number; y: number; s?: number; z?: number;
  rot?: number; c?: string }> = ({ x, y, s = 1, z = 50, rot = 0, c = "#E8E2D2" }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 96 * s, height: 124 * s, zIndex: z,
    transform: `rotate(${rot}deg)`, transformOrigin: "50% 100%" }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: 4 * s, background: c,
      border: `${3 * s}px solid #6E6858` }} />
    <div style={{ position: "absolute", left: 5 * s, top: 5 * s, right: 5 * s, height: 16 * s,
      background: "#3E3A32", borderRadius: 2 * s }} />
    <div style={{ position: "absolute", left: 5 * s, top: 26 * s, width: 13 * s,
      bottom: 5 * s, background: hexa("#000000", 0.10) }} />
    {[0, 1, 2, 3, 4, 5].map(i => (
      <div key={"cl" + i} style={{ position: "absolute", left: (22 + (i % 3) * 8) * s,
        top: (30 + i * 14) * s, width: (56 - (i % 3) * 12) * s, height: 7 * s, borderRadius: 3 * s,
        background: i % 4 === 3 ? GREEN : i % 3 === 0 ? CLAY : "#8E8878" }} />
    ))}
    {/* the folded corner */}
    <div style={{ position: "absolute", right: 0, bottom: 0, width: 22 * s, height: 22 * s,
      background: dkh(c, 0.20), clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }} />
  </div>
);


/* ---------------------------------------------------------------------------
   ⭐⭐ THE RIG — your Claude Code machine, on skids, with a tow eye. Drawn with
   the parts a viewer uses to read "heavy machine that gets dragged": a riveted
   chassis · two skids turned up at the front · a tow eye · an exhaust stack
   with a cap · a usage dial in a bezel · a vent bank · the Claude mark plate.
   ------------------------------------------------------------------------- */
export const Rig: React.FC<{ x: number; y: number; s?: number; z?: number; f: number;
  dial: number; hot: boolean }> = ({ x, y, s = 1, z = 44, f, dial, hot }) => {
  const wR = 320 * s, hR = 250 * s;
  return (
    <div style={{ position: "absolute", left: x - wR / 2, top: y - hR, width: wR, height: hR, zIndex: z }}>
      {/* the skids, turned up at the front so it reads as something DRAGGED */}
      {[0, 1].map(i => (
        <div key={"sk" + i} style={{ position: "absolute", left: 6 * s + i * 12 * s,
          bottom: i * 10 * s, width: wR - 12 * s, height: 17 * s, borderRadius: 6 * s,
          background: i ? "#3E444C" : "#20252B" }} />
      ))}
      <div style={{ position: "absolute", left: wR - 34 * s, bottom: 6 * s, width: 46 * s,
        height: 17 * s, borderRadius: 8 * s, background: "#3E444C",
        transform: "rotate(-26deg)", transformOrigin: "0% 50%" }} />
      {/* the chassis */}
      <div style={{ position: "absolute", left: 14 * s, top: 46 * s, width: wR - 28 * s,
        height: hR - 74 * s, borderRadius: 8 * s,
        background: `linear-gradient(168deg, #6E767F 0%, #454C55 44%, #262C33 100%)`,
        border: `${5 * s}px solid #171B21` }} />
      {/* rivets */}
      {Array.from({ length: 8 }, (_, i) => (
        <div key={"rv" + i} style={{ position: "absolute", left: (26 + i * 34) * s, top: 58 * s,
          width: 11 * s, height: 11 * s, borderRadius: 11 * s, background: "#1A1E24" }} />
      ))}
      {/* the vent bank */}
      {Array.from({ length: 5 }, (_, i) => (
        <div key={"vt" + i} style={{ position: "absolute", left: 34 * s, top: (150 + i * 15) * s,
          width: 96 * s, height: 9 * s, borderRadius: 4 * s, background: "#1A1E24" }} />
      ))}
      {/* the exhaust stack, puffing when it is working */}
      <div style={{ position: "absolute", left: wR - 78 * s, top: 4 * s, width: 34 * s,
        height: 48 * s, borderRadius: 4 * s, background: "#2E343C" }} />
      <div style={{ position: "absolute", left: wR - 86 * s, top: -6 * s, width: 50 * s,
        height: 15 * s, borderRadius: 5 * s, background: "#454C55" }} />
      {hot && Array.from({ length: 4 }, (_, i) => {
        const t = ((f / 4 + i * 4) % 16) / 16;
        return (
          <div key={"pf" + i} style={{ position: "absolute", left: wR - 76 * s - t * 26 * s,
            top: -16 * s - t * 62 * s, width: (18 + t * 40) * s, height: (16 + t * 36) * s,
            borderRadius: "50%", background: hexa("#C8CDD4", 0.32 * (1 - t)) }} />
        );
      })}
      {/* THE CLAUDE MARK, on the flank, 118px — the audience filter */}
      <div style={{ position: "absolute", left: 158 * s, top: 92 * s, width: 132 * s,
        height: 132 * s, borderRadius: 18 * s, background: "#FFFFFF",
        border: `${4 * s}px solid #E8DCC0`, display: "flex", alignItems: "center",
        justifyContent: "center" }}>
        <Img src={staticFile("logos/claude.svg")}
          style={{ width: 96 * s, height: 96 * s, objectFit: "contain" }} />
      </div>
      {/* THE USAGE DIAL — pegged red, then spinning past its own stop */}
      <div style={{ position: "absolute", left: 30 * s, top: 74 * s, width: 104 * s,
        height: 104 * s, borderRadius: "50%", background: hot ? "#F4EEDC" : "#241014",
        border: `${7 * s}px solid #171B21` }}>
        {Array.from({ length: 10 }, (_, i) => (
          <div key={"tk" + i} style={{ position: "absolute", left: 46 * s, top: 5 * s,
            width: 4 * s, height: i % 3 === 0 ? 14 * s : 8 * s,
            background: hot ? "#3A3226" : "#6E3A34",
            transformOrigin: `50% ${47 * s}px`, transform: `rotate(${-120 + i * 27}deg)` }} />
        ))}
        {/* the red danger arc it starts pegged against */}
        <div style={{ position: "absolute", inset: 8 * s, borderRadius: "50%",
          background: `conic-gradient(from 130deg, ${hot ? hexa(GOLD, 0.42) : hexa(RED, 0.52)} 0deg, transparent 96deg)` }} />
        <div style={{ position: "absolute", left: 45 * s, top: 16 * s, width: 6 * s,
          height: 36 * s, borderRadius: 3 * s, background: hot ? "#241A14" : "#F2604A",
          transformOrigin: "50% 100%", transform: `rotate(${dial * 360 + 120}deg)` }} />
        <div style={{ position: "absolute", left: 42 * s, top: 42 * s, width: 18 * s,
          height: 18 * s, borderRadius: "50%", background: hot ? "#241A14" : "#F2604A" }} />
      </div>
      {/* the tow eye the chain hooks into */}
      <div style={{ position: "absolute", left: -16 * s, top: hR - 96 * s, width: 34 * s,
        height: 34 * s, borderRadius: "50%", border: `${8 * s}px solid #3E444C` }} />
    </div>
  );
};

/** the chain, drawn as real links along a catenary whose SAG goes to zero as it
    comes taut — the slack going out of it is the trigger the whole hook turns on */
export const Chain: React.FC<{ x0: number; y0: number; x1: number; y1: number;
  sag: number; z?: number; n?: number; s?: number }> =
  ({ x0, y0, x1, y1, sag, z = 50, n = 11, s = 1 }) => (
  <>
    {Array.from({ length: n }, (_, i) => {
      const t = i / (n - 1);
      const px = x0 + (x1 - x0) * t;
      const py = y0 + (y1 - y0) * t + Math.sin(t * Math.PI) * sag;
      const t2 = (i + 1) / (n - 1);
      const nx = x0 + (x1 - x0) * t2;
      const ny = y0 + (y1 - y0) * t2 + Math.sin(t2 * Math.PI) * sag;
      const ang = (Math.atan2(ny - py, nx - px) * 180) / Math.PI;
      return (
        <div key={"ch" + i} style={{ position: "absolute", left: px - 13 * s, top: py - 9 * s,
          width: 26 * s, height: 18 * s, borderRadius: "50%", zIndex: z,
          border: `${5 * s}px solid ${i % 2 ? "#6E767F" : "#454C55"}`,
          transform: `rotate(${ang}deg) ${i % 2 ? "scaleY(0.55)" : ""}` }} />
      );
    })}
  </>
);


/* ---------------------------------------------------------------------------
   ⭐⭐⭐ THE CODE FLOOR — third concept for the context-window beat.
   Rejected before it: a deck of coins with a rule under it (*"too basic, just a
   line"*), and a stack of paper going through a shutter (*"way too boring just
   papers"*). Both were about MOVING something through an opening, and both
   ended up being one prop repeated.

   ⭐ The reframe: a context window is not a door, it is HOW MUCH IT CAN SEE AT
   ONCE. So the codebase is a floor of lit blocks — a whole project laid out —
   and the comparison is two LIGHTS: a hand torch that finds one block, against
   a flood that takes the entire floor in one sweep. The wave of ~120 blocks
   coming up is the motion, and it is the same object doing the arithmetic
   (reel 99's "a pile does arithmetic FOR you") rather than a label claiming it.
   ------------------------------------------------------------------------- */
export const CodeFloor: React.FC<{ x: number; y: number; w: number; h: number;
  f: number; z?: number;
  /** 0..1 — how far the flood has swept across the floor */
  sweep: number;
  /** 0..1 — the torch's little pool, always on, always tiny */
  torchAt?: number }> =
  ({ x, y, w: ww, h: hh, f, z = 40, sweep, torchAt = 0.06 }) => {
  const COLS = 15, ROWS = 8;
  const cw = ww / COLS, ch = hh / ROWS;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z }}>
      {Array.from({ length: COLS * ROWS }, (_, i) => {
        const c = i % COLS, r = Math.floor(i / COLS);
        /* depth: back rows sit higher and darker, so the floor reads in perspective */
        const persp = 1 - r / (ROWS * 1.7);
        const bx = c * cw + (1 - persp) * ww * 0.09;
        const by = r * ch;
        const bw = cw * 0.82 * persp, bh = ch * (0.5 + rnd(i, 3) * 0.9);
        /* the flood arrives as a WAVE across the columns, not all at once */
        const edge = sweep * (COLS + 3) - c;
        const lit = Math.max(0, Math.min(1, edge / 1.6));
        const pop = Math.max(0, Math.min(1, edge)) * (edge < 2.2 ? 1 : 0);
        /* the torch only ever finds one column near the left */
        const inTorch = Math.abs(c / COLS - torchAt) < 0.055;
        const on = Math.max(lit, inTorch ? 0.72 : 0);
        const col = [CLAY, GREEN, GOLD, TEAL, VIOLET, SKY][i % 6];
        return (
          <div key={"bk" + i} style={{ position: "absolute",
            left: bx, top: by + ch - bh - pop * 34 - (on > 0.5 ? Math.abs(Math.sin(f / 7 + i * 0.9)) * 7 : 0),
            width: bw, height: bh + pop * 34,
            borderRadius: 3, zIndex: z + r,
            background: on > 0.05
              ? `linear-gradient(180deg, ${mxh(col, 0.22 * on)} 0%, ${dkh(col, 0.30)} 100%)`
              : "#161320",
            border: `2px solid ${on > 0.05 ? dkh(col, 0.52) : "#0C0A12"}`,
            opacity: 0.30 + on * 0.70 }}>
            {on > 0.4 && bh > 16 && (
              <div style={{ position: "absolute", left: "16%", top: "22%", width: "60%",
                height: 3, background: hexa("#FFFFFF", 0.44) }} />
            )}
          </div>
        );
      })}
    </div>
  );
};

/** a lamp that throws a real cone — the two of them ARE the comparison */
export const Lamp: React.FC<{ x: number; y: number; spread: number; reach: number;
  z?: number; c?: string; on?: number; body?: number }> =
  ({ x, y, spread, reach, z = 46, c = "#FFE6A8", on = 1, body = 1 }) => (
  <>
    {/* the housing */}
    <div style={{ position: "absolute", left: x - 34 * body, top: y - 30 * body,
      width: 68 * body, height: 42 * body, zIndex: z + 2, borderRadius: `${10 * body}px ${10 * body}px 4px 4px`,
      background: `linear-gradient(180deg, #6E767F 0%, #2E343C 100%)`,
      border: `${4 * body}px solid #171B21` }} />
    <div style={{ position: "absolute", left: x - 26 * body, top: y + 8 * body,
      width: 52 * body, height: 12 * body, zIndex: z + 3, borderRadius: 6 * body,
      background: on > 0.2 ? c : "#3A3F46" }} />
    {/* the cone */}
    {on > 0.05 && (
      <div style={{ position: "absolute", left: x - spread / 2, top: y + 16 * body,
        width: spread, height: reach, zIndex: z, pointerEvents: "none",
        clipPath: `polygon(${50 - 1400 / spread}% 0, ${50 + 1400 / spread}% 0, 100% 100%, 0% 100%)`,
        background: `linear-gradient(180deg, ${hexa(c, 0.46 * on)} 0%, ${hexa(c, 0.16 * on)} 54%, ${hexa(c, 0)} 100%)` }} />
    )}
  </>
);

/* ---------------------------------------------------------------------------
   ⭐ THE COUNTDOWN — Alex: *"at 25 seconds should be a big numbered timer
   counting down in the middle."* Seven-segment digits, drawn as real segments
   so each tick REPAINTS a bank of them rather than swapping a glyph.
   ------------------------------------------------------------------------- */
const SEG_ON: Record<string, number[]> = {
  "0": [1, 1, 1, 1, 1, 1, 0], "1": [0, 1, 1, 0, 0, 0, 0], "2": [1, 1, 0, 1, 1, 0, 1],
  "3": [1, 1, 1, 1, 0, 0, 1], "4": [0, 1, 1, 0, 0, 1, 1], "5": [1, 0, 1, 1, 0, 1, 1],
  "6": [1, 0, 1, 1, 1, 1, 1], "7": [1, 1, 1, 0, 0, 0, 0], "8": [1, 1, 1, 1, 1, 1, 1],
  "9": [1, 1, 1, 1, 0, 1, 1],
};
const Digit: React.FC<{ d: string; s: number; c: string; off: string }> = ({ d, s, c, off }) => {
  const on = SEG_ON[d] ?? SEG_ON["0"];
  const t = 13 * s, L = 62 * s, H = 150 * s;
  const bar = (i: number, st: React.CSSProperties) => (
    <div key={"sg" + i} style={{ position: "absolute", borderRadius: t / 2,
      background: on[i] ? c : off, ...st }} />
  );
  return (
    <div style={{ position: "relative", width: L + t, height: H + t }}>
      {bar(0, { left: t, top: 0, width: L, height: t })}
      {bar(1, { left: L + t / 2, top: t / 2, width: t, height: H / 2 })}
      {bar(2, { left: L + t / 2, top: H / 2 + t / 2, width: t, height: H / 2 })}
      {bar(3, { left: t, top: H, width: L, height: t })}
      {bar(4, { left: t / 2 - t / 2, top: H / 2 + t / 2, width: t, height: H / 2 })}
      {bar(5, { left: t / 2 - t / 2, top: t / 2, width: t, height: H / 2 })}
      {bar(6, { left: t, top: H / 2, width: L, height: t })}
    </div>
  );
};
export const Countdown: React.FC<{ x: number; y: number; s?: number; z?: number;
  value: string; c?: string; label?: string; shake?: number;
  /** the word beside the digits — "DAYS" */
  unit?: string;
  /** the strip along the bottom — the real end date */
  foot?: string }> =
  ({ x, y, s = 1, z = 70, value, c = "#FFC46A", label, shake = 0, unit, foot }) => {
  const chars = value.split("");
  const digW = chars.length * (75 * s) + (chars.length - 1) * 14 * s;
  const unitW = unit ? 236 * s : 0;
  const gap = unit ? 26 * s : 0;
  const wC = digW + gap + unitW;
  const hC = 163 * s;
  /* ⛔ v1 ANCHORED THE DAYS BLOCK TO `right: -8`, and the container had no width
     of its own — so it sized to the digit row and the block landed ON TOP of the
     numbers. The case now has an EXPLICIT width and the two halves sit in one
     row inside it. Read the box model before nudging offsets. */
  return (
    <div style={{ position: "absolute", left: x - wC / 2, top: y, width: wC, height: hC,
      zIndex: z, transform: `translate(${Math.sin(shake * 40) * 4 * shake}px, 0)` }}>
      {/* the case */}
      <div style={{ position: "absolute", left: -28 * s, top: -34 * s, right: -28 * s,
        bottom: foot ? -82 * s : -30 * s, borderRadius: 16 * s, background: "#140A08",
        border: `${8 * s}px solid ${dkh(c, 0.52)}` }} />
      {/* two alarm lamps on the shoulders, alternating */}
      {[0, 1].map(i => (
        <div key={"al" + i} style={{ position: "absolute", top: -24 * s,
          left: i ? undefined : -16 * s, right: i ? -16 * s : undefined,
          width: 28 * s, height: 28 * s, borderRadius: "50%", zIndex: 3,
          background: (Math.floor(shake * 60) + i) % 2 ? c : dkh(c, 0.62),
          border: `${3 * s}px solid ${dkh(c, 0.70)}` }} />
      ))}
      {/* the digits */}
      <div style={{ position: "absolute", left: 0, top: 0, display: "flex", gap: 14 * s, zIndex: 2 }}>
        {chars.map((ch, i) => ch === ":"
          ? <div key={"cl" + i} style={{ position: "relative", width: 22 * s, height: hC }}>
              {[0.28, 0.66].map((ty, k) => (
                <div key={"dt" + k} style={{ position: "absolute", left: 0, top: `${ty * 100}%`,
                  width: 18 * s, height: 18 * s, borderRadius: "50%", background: c }} />
              ))}
            </div>
          : <Digit key={"dg" + i} d={ch} s={s} c={c} off={hexa(c, 0.10)} />)}
      </div>
      {/* the DAYS block, beside them */}
      {unit && (
        <div style={{ position: "absolute", left: digW + gap, top: 6 * s, width: unitW,
          height: hC - 12 * s, borderRadius: 10 * s, background: hexa(c, 0.12), zIndex: 2,
          border: `${5 * s}px solid ${hexa(c, 0.44)}`,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <span style={{ ...mono(54 * s, 900), color: c, lineHeight: 1 }}>{unit}</span>
          {label && <span style={{ ...mono(19 * s, 800), color: hexa(c, 0.72),
            marginTop: 8 * s }}>{label}</span>}
        </div>
      )}
      {/* the end-date strip along the foot */}
      {foot && (
        <div style={{ position: "absolute", left: -18 * s, right: -18 * s, top: hC + 12 * s,
          height: 52 * s, borderRadius: 8 * s, background: dkh(c, 0.62), zIndex: 2,
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ ...mono(29 * s, 900), color: "#1A0E06" }}>{foot}</span>
        </div>
      )}
    </div>
  );
};

/* ---------------------------------------------------------------------------
   ⭐ THE STAR — Alex: *"when the box opens at 10 seconds, there should be a star
   or something coming out of the box."* A real eight-point star (a long pair of
   axes crossed with a short pair, plus a hub and a rim), so it reads as a struck
   metal star rather than a sparkle glyph.
   ------------------------------------------------------------------------- */
export const Star: React.FC<{ x: number; y: number; s?: number; z?: number;
  spin?: number; c?: string; o?: number }> =
  ({ x, y, s = 1, z = 70, spin = 0, c = GOLD, o = 1 }) => (
  <div style={{ position: "absolute", left: x - 60 * s, top: y - 60 * s, width: 120 * s,
    height: 120 * s, zIndex: z, opacity: o, transform: `rotate(${spin}deg)` }}>
    {[0, 45, 90, 135].map((a, i) => (
      <div key={"pt" + i} style={{ position: "absolute", left: "50%", top: "50%",
        width: i % 2 ? 82 * s : 120 * s, height: i % 2 ? 20 * s : 26 * s,
        marginLeft: i % 2 ? -41 * s : -60 * s, marginTop: i % 2 ? -10 * s : -13 * s,
        background: i % 2 ? dkh(c, 0.16) : c,
        clipPath: "polygon(0 50%, 26% 0, 74% 0, 100% 50%, 74% 100%, 26% 100%)",
        transform: `rotate(${a}deg)` }} />
    ))}
    <div style={{ position: "absolute", left: "50%", top: "50%", width: 34 * s, height: 34 * s,
      marginLeft: -17 * s, marginTop: -17 * s, borderRadius: "50%",
      background: mxh(c, 0.44), border: `${4 * s}px solid ${dkh(c, 0.40)}` }} />
  </div>
);

/* ---------------------------------------------------------------------------
   ⭐ THE AURA — Alex: *"after each of the websites appear at 20 seconds, there
   should be like an aura ring thing wrapping around them."* Two counter-rotating
   rings on the object's own footprint plus a soft halo, so it reads as something
   WRAPPING the window rather than a burst leaving it. ⛔ Matte only: these are
   bordered ellipses, never a `0 0 Npx` glow.
   ------------------------------------------------------------------------- */
export const Aura: React.FC<{ x: number; y: number; w: number; h: number; f: number;
  at: number; z?: number; c?: string }> =
  ({ x, y, w: ww, h: hh, f, at, z = 58, c = GOLD }) => {
  const lf = f - at;
  if (lf < 0) return null;
  const born = E(lf, 0, 9, 0, 1, BACK);
  const puff = E(lf, 0, 16, 0, 1, OUT);
  return (
    <>
      {/* the halo it sits inside */}
      <div style={{ position: "absolute", left: x - ww * 0.62, top: y - hh * 0.62,
        width: ww * 1.24, height: hh * 1.24, borderRadius: "50%", zIndex: z - 1,
        background: `radial-gradient(50% 50% at 50% 50%, ${hexa(c, 0.26 * born)} 0%, ${hexa(c, 0.08 * born)} 58%, ${hexa(c, 0)} 100%)` }} />
      {/* two rings, counter-rotating, tilted — they read as WRAPPING */}
      {[0, 1].map(i => (
        <div key={"ar" + i} style={{ position: "absolute",
          left: x - ww * (0.56 + i * 0.05), top: y - hh * (0.40 + i * 0.05),
          width: ww * (1.12 + i * 0.10), height: hh * (0.80 + i * 0.10),
          borderRadius: "50%", zIndex: z + (i ? 2 : 0),
          border: `${5 - i}px solid ${hexa(i ? mxh(c, 0.30) : c, (0.72 - i * 0.22) * born)}`,
          transform: `rotate(${(i ? -1 : 1) * (f * 1.7 + i * 40)}deg) scale(${born})`,
          transformOrigin: "50% 50%" }} />
      ))}
      {/* the one-shot ring that leaves on arrival */}
      {puff < 1 && (
        <div style={{ position: "absolute", left: x - ww * (0.5 + puff * 0.5),
          top: y - hh * (0.5 + puff * 0.5), width: ww * (1 + puff), height: hh * (1 + puff),
          borderRadius: "50%", zIndex: z + 3,
          border: `${Math.max(1, 7 * (1 - puff))}px solid ${hexa(c, 0.62 * (1 - puff))}` }} />
      )}
    </>
  );
};


/* ---------------------------------------------------------------------------
   ⭐⭐ TRIAL-CUT HOOK PROPS.
   Alex: *"the other two variants don't really look different from the main
   one."* The dHash PASSED (mean 24.2 / min 12 against 14 / 10) — but that gate
   only measures whether IG will flag two uploads as duplicates, and it is
   satisfied by a camera nudge a viewer cannot see. The standing rule is
   [[feedback_trial_cut_variants]]: **three cuts = ONE body, THREE HOOKS.**
   Same scenes, same VO after ~2.5s; they differ exactly where a viewer decides
   whether to stay. Reel 94's six cuts are the only evidence in this repo about
   what makes an open work, and every grade-only variant set since has produced
   no information at all.

   The three mechanisms, each one WORD and each a different word:
     unsigned  PULL      the ox drags the rig and the dial passes its stop
     amber     STRIP     the ox rips the price tag off and $0 is underneath
     steel     OUTWEIGH  the free core slams the beam and the paid stack flies
   ------------------------------------------------------------------------- */

/** a real swing tag: a punched hole, a knotted string, a chamfered corner and a
    stamped face. ⛔ It carries NO invented price — Claude Code is bundled with a
    subscription and a $/mo figure on screen would be a fabricated number. It
    says METERED, which is the true thing, and $0 is what is under it. */
export const PriceTag: React.FC<{ x: number; y: number; s?: number; z?: number;
  text: string; rot?: number; c?: string }> =
  ({ x, y, s = 1, z = 60, text, rot = 0, c = "#C9BFA6" }) => (
  <div style={{ position: "absolute", left: x - 140 * s, top: y, width: 280 * s, height: 178 * s,
    zIndex: z, transform: `rotate(${rot}deg)`, transformOrigin: "50% -18%" }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: 10 * s,
      background: `linear-gradient(166deg, ${mxh(c, 0.20)} 0%, ${c} 46%, ${dkh(c, 0.26)} 100%)`,
      border: `${5 * s}px solid ${dkh(c, 0.48)}`,
      clipPath: "polygon(0 14%, 22% 0, 100% 0, 100% 100%, 0 100%)" }} />
    {/* the punched eyelet */}
    <div style={{ position: "absolute", left: 34 * s, top: 22 * s, width: 34 * s, height: 34 * s,
      borderRadius: "50%", background: "#20242A", border: `${5 * s}px solid ${dkh(c, 0.54)}` }} />
    {/* the stamped face */}
    <div style={{ position: "absolute", left: 22 * s, top: 74 * s, right: 22 * s, height: 64 * s,
      display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ ...mono(44 * s, 900), color: "#2A241A" }}>{text}</span>
    </div>
    {/* two rule lines, the way a real tag is printed */}
    {[0.80, 0.88].map((ty, i) => (
      <div key={"rl" + i} style={{ position: "absolute", left: 30 * s, right: 30 * s,
        top: `${ty * 100}%`, height: 4 * s, background: hexa("#2A241A", 0.24) }} />
    ))}
  </div>
);

/** the string it hangs from — drawn as a real twisted cord, not a line */
export const TagCord: React.FC<{ x0: number; y0: number; x1: number; y1: number;
  z?: number; cut?: number }> = ({ x0, y0, x1, y1, z = 59, cut = 0 }) => {
  const len = Math.hypot(x1 - x0, y1 - y0) * (1 - cut);
  const ang = (Math.atan2(y1 - y0, x1 - x0) * 180) / Math.PI;
  return (
    <div style={{ position: "absolute", left: x0, top: y0 - 5, width: len, height: 10, zIndex: z,
      transformOrigin: "0% 50%", transform: `rotate(${ang}deg)`,
      background: `repeating-linear-gradient(74deg, #B9A87E 0px, #B9A87E 7px, #8A7A56 7px, #8A7A56 13px)`,
      borderRadius: 5 }} />
  );
};

/** a beam balance: a post, a fulcrum, a beam that swings, two chain-hung pans */
export const Balance: React.FC<{ x: number; y: number; s?: number; z?: number; f: number;
  tilt: number; children?: React.ReactNode }> =
  ({ x, y, s = 1, z = 40, f, tilt }) => {
  const beam = 720 * s, post = 300 * s;
  return (
    <>
      {/* the post and its foot */}
      <div style={{ position: "absolute", left: x - 26 * s, top: y - post, width: 52 * s,
        height: post, zIndex: z, borderRadius: 6 * s,
        background: `linear-gradient(96deg, #7E868F 0%, #3E444C 62%, #23272E 100%)` }} />
      <div style={{ position: "absolute", left: x - 116 * s, top: y - 26 * s, width: 232 * s,
        height: 30 * s, borderRadius: 8 * s, zIndex: z, background: "#2E343C" }} />
      {/* the beam, pivoting on the fulcrum */}
      <div style={{ position: "absolute", left: x - beam / 2, top: y - post - 18 * s,
        width: beam, height: 26 * s, zIndex: z + 4, borderRadius: 8 * s,
        background: `linear-gradient(180deg, #9AA2AB 0%, #4A515A 100%)`,
        border: `${4 * s}px solid #20242A`,
        transformOrigin: "50% 50%", transform: `rotate(${-tilt * 15}deg)` }} />
      {/* the fulcrum knuckle */}
      <div style={{ position: "absolute", left: x - 30 * s, top: y - post - 40 * s, width: 60 * s,
        height: 60 * s, borderRadius: "50%", zIndex: z + 6, background: "#5A626C",
        border: `${5 * s}px solid #20242A` }} />
    </>
  );
};

/** one pan of the balance, hung on two chains that stay VERTICAL as it rises */
export const Pan: React.FC<{ x: number; y: number; s?: number; z?: number;
  drop: number; c?: string; children?: React.ReactNode }> =
  ({ x, y, s = 1, z = 46, drop, c = "#6E767F", children }) => (
  <div style={{ position: "absolute", left: x - 170 * s, top: y + drop, width: 340 * s,
    zIndex: z }}>
    {/* the two hanging chains */}
    {[24, 316].map((cx, i) => (
      <div key={"pc" + i} style={{ position: "absolute", left: cx * s, top: -150 * s, width: 7 * s,
        height: 150 * s, background: `repeating-linear-gradient(180deg, #8E96A2 0px, #8E96A2 9px, #4A515A 9px, #4A515A 16px)` }} />
    ))}
    {/* the pan itself: a rim and a dished floor */}
    <div style={{ position: "absolute", left: 0, top: 0, width: 340 * s, height: 24 * s,
      borderRadius: 6 * s, background: mxh(c, 0.16), border: `${4 * s}px solid ${dkh(c, 0.46)}` }} />
    <div style={{ position: "absolute", left: 26 * s, top: 20 * s, width: 288 * s, height: 34 * s,
      borderRadius: `0 0 ${40 * s}px ${40 * s}px`, background: dkh(c, 0.34) }} />
    {children}
  </div>
);


/* ---------------------------------------------------------------------------
   ⭐⭐⭐ THE CLAIM PLATE — modelled directly on reel 94's `CallCard`.

   This is the ONLY measured IG-performance finding in the repo
   ([[feedback_frame0_claim_plate]]). AGENCY shipped six cuts; the two that
   performed opened with a cream plate in the eye's landing zone and the four
   that lost opened with nothing but the shared header pill:

     A ROLL-UP  WON   plate 32.66%  819x393 at y142
     B QUEUE    WON   plate 18.15%  429x411 at y161
     C/D/E/F    lost  plate 7.7-9.0%  ~900x105 at y0  <- that IS the header pill

   ⛔ And what did NOT separate them: MOTION (the highest-motion cut lost),
   LUMA (two losers out-lit a winner), and the MECHANISM (the two winners used
   opposite ones). So the brief is not "more movement" and not "brighter".

   THE BAR, all present at frame 0:
     · largest contiguous cream region >= 18% of the panel
     · starting BELOW y=120 (above that is the header pill and does not count)
     · the real Claude mark on a white tile >= 130px
     · the number in Fraunces >= 74px
   ------------------------------------------------------------------------- */
export const ClaimPlate: React.FC<{ x: number; y: number; w?: number; f: number;
  z?: number; num: string; line: string; s?: number; spin?: boolean }> =
  ({ x, y, w: ww = 660, f, z = 70, num, line, s = 1, spin = true }) => (
  <div style={{ position: "absolute", left: x - (ww * s) / 2, top: y, width: ww, zIndex: z,
    transform: `scale(${s})`, transformOrigin: "50% 0%" }}>
    <div style={{ position: "relative", borderRadius: 22, background: "#EDE7D6",
      border: "10px solid #B3A98F", boxShadow: SH_D, padding: "24px 28px 28px" }}>
      <div style={{ position: "relative", height: 148, display: "flex", alignItems: "center",
        justifyContent: "center" }}>
        {/* ⚠️ SOLID rays, never a coloured bloom — `0 0 Npx <colour>` is banned */}
        {spin && Array.from({ length: 20 }, (_, i) => {
          const len = 24 + Math.sin(f / 6.5 + i * 1.2) * 9;
          return (
            <div key={"ry" + i} style={{ position: "absolute", left: "50%", top: "50%",
              width: 0, height: 0, transform: `rotate(${i * 18 + f * 1.1}deg)` }}>
              <div style={{ position: "absolute", left: -4, top: -(92 + len), width: 8,
                height: len, borderRadius: 4, background: "#E0BE96" }} />
            </div>
          );
        })}
        <div style={{ width: 148, height: 148, borderRadius: 34, background: "#FFFFFF",
          display: "flex", alignItems: "center", justifyContent: "center", boxShadow: SH,
          transform: `scale(${1 + Math.sin(f / 9) * 0.04})` }}>
          <Img src={staticFile("logos/claude.svg")}
            style={{ width: 108, height: 108, objectFit: "contain" }} />
        </div>
      </div>
      <div style={{ marginTop: 16, textAlign: "center", fontFamily: fraunces.fontFamily,
        fontWeight: 900, fontSize: 96, lineHeight: 1, color: "#241E12" }}>{num}</div>
      <div style={{ marginTop: 14, textAlign: "center", fontFamily: MONO, fontWeight: 900,
        fontSize: 26, letterSpacing: "0.18em", color: "#6E6450" }}>{line}</div>
    </div>
  </div>
);
