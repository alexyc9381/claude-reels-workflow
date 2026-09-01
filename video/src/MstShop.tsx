import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { inter } from "./fonts";
import { Bg, HookHeader, AssemblyCtx } from "./SlopKit";
import {
  E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, mix3, rnd,
  Scene, Cam, Puff, Hero, Forearm, settle, Tile, CamCtx,
  GOLD, RED, STEEL, BRASS, EMBER, BONE, PAPER,
} from "./MstWorld";
import type { Place } from "./MstWorld";
import { PALETTES, Surface, Occluder, Cone, StreetLamp, Contact } from "./WorldKit";
import type { World } from "./WorldKit";
import { LEVELS, db } from "./SoundKit";

/* ===========================================================================
   TIP 1 — THE SHOP WINDOW.  (ninth concept)

   ⛔⛔⛔ THE LAST THREE BUILDS HAD NO SET AT ALL. The case, the band and the
      balloon were all staged against a flat gradient in a grey box, and the note
      was exactly right: *"wheres the background why is it just a plain black
      colour boring."* Every scene in this reel that has ever been accepted opens
      with `<Surface w={w} />` — sky, glow disc, stars, three parallax bands of
      lit buildings, ground, lip, grit, kerb, bins — about twenty-four objects
      before a single prop lands. I built three concepts in a vacuum instead.
      [[feedback_reel_house_chassis]], and WorldKit's own set checklist: something
      BEHIND the subject and something IN FRONT of it cropped by the frame edge.

   ⭐⭐⭐ AND THE CONCEPT IS NOW A PLACE, NOT A DIAGRAM. Your context window is a
      SHOP WINDOW. The shop is open, warm, and you can see the goods on the
      shelves. Then the persona goes up over the glass: WORLD-CLASS, 20 YEARS,
      AWARD-WINNING, board after board nailed across the front until no light
      gets out and nobody can see in. Nothing about that needs decoding — it is
      what those words literally are. A sign is not a skill.

   ⭐⭐ THE PAYOFF IS LIGHT. He tears the boards off and the window floods back
      out over the pavement, which is the largest luma swing available anywhere
      in this reel — and the real sources are what is on the shelves inside.
   ========================================================================= */

const SAFE_C = "#3E9A72";
const asPlace = (w: World): Place => ({
  back: w.sky, back2: w.sky2, floor: w.ground, floor2: w.ground2,
  lip: w.lip, key: w.key, horizon: w.horizon, grit: w.grit,
} as Place);

/* ⛔ crop bound at push 1.05 x cam 1.02: 52 .. 960 */
const SHX = 288, SHR = 934, SHT = 150, SHB = 662;   /* the shopfront */
const GX = 336, GY = 244, GW = 560, GH = 330;       /* the glass */
const HERO_X = 200, HERO_Y = 704, HERO_S = 292;     /* ⭐ was 212 — he was a bystander */
/* ⛔⛔ EIGHT IDENTICAL PLANKS SLIDING IN IS ONE BEAT PLAYED EIGHT TIMES. *"they
   just keep coming on and stuff, useless."* Correct: the boards had no
   progression — plank 7 told you nothing plank 2 had not. One MECHANISM instead,
   with a destination: he hauls a rope and a printed banner unrolls down over the
   glass, a credential at a time, until no light gets out.
   [[feedback_motion_needs_a_destination]] */
const PULL = [4, 24, 46, 70, 96];      /* five bigger reveals, not six small ones */
const STAR_CLIP = "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)";
const SRC = ["googledocs", "notion", "github", "googledrive", "cat-pdf"];
const WARM = "#F0C77E";

/* ---- what is inside, on the shelves ------------------------------------ */
const Interior: React.FC<{ f: number; lit: number; stock: number; check: number }> =
  ({ f, lit, stock, check }) => (
  <>
    <div style={{ position: "absolute", zIndex: 20, left: GX, top: GY, width: GW, height: GH,
      background: `linear-gradient(180deg, ${mix3("#171226", "#6B4E2A", lit)} 0%,
        ${mix3("#0E0B18", "#382814", lit)} 100%)` }} />
    {/* the two shelves */}
    {[0, 1].map((k) => (
      <div key={"sf" + k} style={{ position: "absolute", zIndex: 24, left: GX + 26,
        top: GY + 132 + k * 116, width: GW - 52, height: 13, borderRadius: 4,
        background: mix3("#2A2036", "#A9834A", lit) }} />
    ))}
    {/* the real stock */}
    {SRC.map((id, i) => {
      if (i >= stock) return null;
      const row = i < 3 ? 0 : 1, col = i < 3 ? i : i - 3;
      const x = GX + 52 + col * 168 + (row ? 84 : 0);
      const y = GY + 132 + row * 116 - 86;
      const on = check >= 0 && Math.abs(check * 5 - i) < 0.7;
      return (
        <div key={"st" + i} style={{ position: "absolute", zIndex: 26, left: x,
          top: y - (on ? 12 : 0) + Math.sin(f / 14 + i) * 3 }}>
          <Tile id={id} x={0} y={0} s={86} z={26} r={14} />
          {on && (
            <div style={{ position: "absolute", right: -8, top: -8, width: 28, height: 28,
              borderRadius: 14, background: SAFE_C, color: "#0B1410", zIndex: 30,
              fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 18,
              textAlign: "center", lineHeight: "28px" }}>✓</div>
          )}
        </div>
      );
    })}
    {/* the self-check pass, sweeping the stock */}
    {check >= 0 && (
      <div style={{ position: "absolute", zIndex: 28, top: GY, height: GH, width: 78,
        left: GX + check * (GW + 78) - 78,
        background: `linear-gradient(90deg, transparent 0%, ${hexa("#B6F5D6", 0.7)} 50%, transparent 100%)` }} />
    )}
    {/* ⭐ light raking through the shop — the interior is ~30% of the panel and
        a flat warm rectangle that size is a dead half all on its own */}
    {lit > 0.25 && Array.from({ length: 6 }, (_, i) => {
      const px = ((f * 9 + i * 128) % (GW + 240)) - 200;
      return (
        <div key={"ry" + i} style={{ position: "absolute", zIndex: 25, top: GY,
          left: GX + px, width: 74, height: GH, transform: "skewX(-19deg)",
          background: `linear-gradient(90deg, transparent 0%, ${hexa("#FFE6B8", 0.3 * lit)} 50%, transparent 100%)` }} />
      );
    })}
    <div style={{ position: "absolute", zIndex: 40, left: GX - 10, top: GY - 10,
      width: GW + 20, height: GH + 20, border: `10px solid ${dkh(BRASS, 0.28)}`,
      boxSizing: "border-box", borderRadius: 4 }} />
  </>
);

/* ---- the shopfront shell ------------------------------------------------ */
const Front: React.FC<{ f: number; w: World; lit: number }> = ({ f, w, lit }) => (
  <>
    <div style={{ position: "absolute", zIndex: 18, left: SHX, top: SHT,
      width: SHR - SHX, height: SHB - SHT,
      background: `linear-gradient(180deg, ${dkh(w.b1, 0.14)} 0%, ${dkh(w.b2, 0.3)} 100%)` }} />
    {/* the fascia */}
    <div style={{ position: "absolute", zIndex: 70, left: SHX - 12, top: SHT + 14,
      width: SHR - SHX + 24, height: 74, borderRadius: 6,
      background: `linear-gradient(180deg, ${dkh(BRASS, 0.2)} 0%, ${dkh(BRASS, 0.44)} 100%)` }} />
    <div style={{ position: "absolute", zIndex: 71, left: SHX, top: SHT + 30, width: SHR - SHX,
      textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 32,
      letterSpacing: "0.22em", color: mix3(hexa(BONE, 0.5), WARM, lit) }}>
      YOUR CONTEXT WINDOW
    </div>
    {/* the door, and the step */}
    <div style={{ position: "absolute", zIndex: 22, left: SHR - 74, top: GY + 34,
      width: 62, height: SHB - GY - 34, borderRadius: "6px 6px 0 0",
      background: mix3(dkh(w.b3, 0.2), WARM, lit * 0.4) }} />
    <div style={{ position: "absolute", zIndex: 23, left: SHR - 64, top: GY + 150,
      width: 14, height: 14, borderRadius: 7, background: mxh(BRASS, 0.2) }} />
    <div style={{ position: "absolute", zIndex: 44, left: SHX - 20, top: SHB,
      width: SHR - SHX + 40, height: 20, borderRadius: 4, background: dkh(STEEL, 0.4) }} />
  </>
);

/** a proper award rosette: a scalloped gold disc, a ribbed inner, a star, and
    two ribbon tails. ⛔ not a circle with a dot in it — [[feedback_props_need_real_drawing]] */
const Rosette: React.FC<{ x: number; s: number; f: number; ph: number }> = ({ x, s, f, ph }) => (
  <div style={{ position: "absolute", left: x - s / 2, top: 0, width: s, height: s * 1.4,
    transform: `rotate(${Math.sin(f / 9 + ph) * 6}deg)`, transformOrigin: "50% 30%" }}>
    {/* the ribbon tails, swinging */}
    {[0, 1].map((k) => (
      <div key={"tl" + k} style={{ position: "absolute", left: s * (k ? 0.46 : 0.19),
        top: s * 0.66, width: s * 0.35, height: s * 0.58, transformOrigin: "50% 0%",
        transform: `rotate(${(k ? 24 : -24) + Math.sin(f / 8 + ph + k) * 6}deg)`,
        clipPath: "polygon(0 0, 100% 0, 100% 72%, 50% 100%, 0 72%)",
        background: k ? "#A62B22" : "#C4392A" }} />
    ))}
    {/* the scalloped edge */}
    {Array.from({ length: 12 }, (_, k) => {
      const a = (k / 12) * Math.PI * 2;
      return (
        <div key={"pt" + k} style={{ position: "absolute",
          left: s / 2 + Math.cos(a) * s * 0.4 - s * 0.13,
          top: s / 2 + Math.sin(a) * s * 0.4 - s * 0.13,
          width: s * 0.26, height: s * 0.26, borderRadius: "50%", background: "#C9962F" }} />
      );
    })}
    <div style={{ position: "absolute", left: s * 0.09, top: s * 0.09, width: s * 0.82,
      height: s * 0.82, borderRadius: "50%",
      background: `radial-gradient(60% 60% at 38% 30%, #F5D577 0%, #D9A93C 52%, #A87C22 100%)` }} />
    <div style={{ position: "absolute", left: s * 0.2, top: s * 0.2, width: s * 0.6,
      height: s * 0.6, borderRadius: "50%", background: "#8B2E2E" }} />
    <div style={{ position: "absolute", left: s * 0.31, top: s * 0.31, width: s * 0.38,
      height: s * 0.38, clipPath: STAR_CLIP, background: "#F5D577" }} />
  </div>
);

const RosetteRow: React.FC<{ i: number; f: number }> = ({ i, f }) => (
  <>
    <Rosette x={(GW + 28) / 2} s={64} f={f} ph={i} />
    <Rosette x={(GW + 28) / 2 - 186} s={50} f={f} ph={i + 1.4} />
    <Rosette x={(GW + 28) / 2 + 186} s={50} f={f} ph={i + 2.8} />
    {/* laurel sprigs either side of the big one */}
    {[0, 1].map((k) => (
      <div key={"lr" + k} style={{ position: "absolute", top: 10,
        left: (GW + 28) / 2 + (k ? 44 : -96), width: 52, height: 46,
        transform: `scaleX(${k ? 1 : -1})` }}>
        {Array.from({ length: 4 }, (_, j) => (
          <div key={j} style={{ position: "absolute", left: 6 + j * 11, top: 22 - j * 5,
            width: 19, height: 11, borderRadius: "50%", background: "#8A7A3C",
            transform: `rotate(${-28 - j * 8}deg)` }} />
        ))}
      </div>
    ))}
  </>
);

const StarRow: React.FC<{ i: number; f: number }> = ({ i, f }) => (
  <>
    {Array.from({ length: 5 }, (_, k) => (
      <div key={"sr" + k} style={{ position: "absolute", top: 10,
        left: (GW + 28) / 2 - 158 + k * 76, width: 58, height: 58,
        clipPath: STAR_CLIP, background: "#D9A93C",
        transform: `scale(${1 + Math.sin(f / 4.2 + i + k * 0.5) * 0.19}) rotate(${Math.sin(f / 7 + k) * 9}deg)` }} />
    ))}
    {/* the rule under the rating, so the row reads as a printed panel */}
    <div style={{ position: "absolute", top: 34, left: (GW + 28) / 2 - 214, width: 38, height: 6,
      borderRadius: 3, background: hexa("#6B4A2C", 0.35) }} />
    <div style={{ position: "absolute", top: 34, left: (GW + 28) / 2 + 176, width: 38, height: 6,
      borderRadius: 3, background: hexa("#6B4A2C", 0.35) }} />
  </>
);

/** a fat gold trophy — cup, handles, stepped plinth, and a star on the belly */
const Trophy: React.FC<{ f: number }> = ({ f }) => (
  <div style={{ position: "relative", width: 300, height: 300,
    transform: `rotate(${Math.sin(f / 12) * 2}deg)` }}>
    {[0, 1].map((k) => (
      <div key={"hd" + k} style={{ position: "absolute", top: 46, left: k ? 214 : 26,
        width: 62, height: 96, borderRadius: "50%",
        border: `20px solid #D9A93C`, boxSizing: "border-box" }} />
    ))}
    <div style={{ position: "absolute", left: 62, top: 26, width: 176, height: 150,
      borderRadius: "14px 14px 84px 84px",
      background: `linear-gradient(160deg, #F5D577 0%, #D9A93C 46%, #A87C22 100%)` }} />
    <div style={{ position: "absolute", left: 118, top: 74, width: 64, height: 64,
      clipPath: STAR_CLIP, background: "#8B2E2E" }} />
    <div style={{ position: "absolute", left: 132, top: 172, width: 36, height: 46,
      background: "#C9962F" }} />
    <div style={{ position: "absolute", left: 84, top: 216, width: 132, height: 26,
      borderRadius: 6, background: "#C9962F" }} />
    <div style={{ position: "absolute", left: 62, top: 240, width: 176, height: 34,
      borderRadius: 6, background: "#8A6E2A" }} />
  </div>
);

/** the sandwich board that lands on the kerb */
const Board: React.FC<{ f: number; at: number }> = ({ f, at }) => {
  const t = E(f, at, at + 13, 0, 1, BACK);
  if (f < at) return null;
  return (
    <div style={{ position: "absolute", zIndex: 90, left: 470, top: -180 + t * 800,
      transform: `rotate(${(1 - t) * -40 + Math.sin(f / 11) * 2}deg)` }}>
      <div style={{ width: 168, height: 196, borderRadius: 8, background: "#E9DCC0",
        border: `10px solid #6B4A2C`, boxSizing: "border-box" }}>
        <Rosette x={84} s={72} f={f} ph={3} />
        {Array.from({ length: 3 }, (_, k) => (
          <div key={"bs" + k} style={{ position: "absolute", top: 140, left: 22 + k * 42,
            width: 36, height: 36, clipPath: STAR_CLIP, background: "#D9A93C" }} />
        ))}
      </div>
    </div>
  );
};

/** a framed certificate, slapped onto the glass */
const Cert: React.FC<{ f: number; i: number; at: number }> = ({ f, i, at }) => {
  if (f < at) return null;
  const t = E(f, at, at + 6, 0, 1, OUT);
  const SEATS: Array<[number, number, number]> = [
    [GX - 10, GY + 168, -7], [GX + 148, GY + 226, 5], [GX + 356, GY + 190, -4],
    [GX + 62, GY + 30, 6], [GX + 262, GY + 44, -6], [GX + 424, GY + 262, 8],
    [GX - 6, GY + 46, -9], [GX + 400, GY + 46, 7],
  ];
  const [x, y, r] = SEATS[i];
  return (
    <div style={{ position: "absolute", zIndex: 72, left: x, top: y,
      width: 176, height: 126, borderRadius: 6,
      transform: `scale(${0.4 + t * 0.6}) rotate(${r + (1 - t) * 40}deg)`,
      opacity: t, background: "#EFE4CA", border: `9px solid #8A6E2A`, boxSizing: "border-box" }}>
      <div style={{ position: "absolute", left: 12, top: 12, width: 40, height: 40,
        borderRadius: "50%", background: "#D9A93C" }} />
      {[0, 1, 2].map((k) => (
        <div key={"cl" + k} style={{ position: "absolute", left: 62, top: 16 + k * 16,
          width: k === 2 ? 32 : 68, height: 7, borderRadius: 4, background: hexa("#6B4A2C", 0.5) }} />
      ))}
      <div style={{ position: "absolute", left: 12, top: 66, width: 118, height: 7,
        borderRadius: 4, background: hexa("#6B4A2C", 0.32) }} />
    </div>
  );
};

/* ---- the banner of credentials ----------------------------------------
   ⭐ drawn as twelve horizontal strips that each slide on their own phase, so a
   560x330 cloth is never a still rectangle — the same trick as the boiling
   surface, and it is also what hanging fabric does. */
const Banner: React.FC<{ f: number; drop: number; tear: number }> =
  ({ f, drop, tear }) => {
  if (drop <= 2) return null;
  const away = tear > 0 ? tear : 0;
  return (
    <div style={{ position: "absolute", zIndex: 62, left: GX - 14, top: GY - 16,
      width: GW + 28, height: drop, overflow: "hidden",
      transformOrigin: "50% 0%",
      transform: `translateY(${-away * (drop + 420)}px) rotate(${away * 9}deg)`,
      opacity: 1 - away * 0.3 }}>
      {Array.from({ length: 14 }, (_, i) => (
        <div key={"sp" + i} style={{ position: "absolute", left: Math.sin(f / 5.2 + i * 0.55) * 17,
          top: (i * (GH + 30)) / 14, width: GW + 28, height: (GH + 30) / 14 + 2,
          background: `linear-gradient(90deg, ${dkh("#E9DCC0", 0.04 + Math.abs(Math.sin(f / 6 + i * 0.5)) * 0.24)} 0%,
            #F2E7CE 42%, ${dkh("#E9DCC0", 0.06 + Math.abs(Math.cos(f / 7 + i * 0.4)) * 0.2)} 100%)` }} />
      ))}
      {/* ⭐ six rows of decoration, alternating rosettes and star ratings */}
      {Array.from({ length: 5 }, (_, i) => {
        const cy = 10 + i * ((GH + 30) / 5);
        const wob = Math.sin(f / 5.2 + i * 1.1) * 13;
        return (
          <div key={"dc" + i} style={{ position: "absolute", left: 0, top: cy,
            width: GW + 28, height: (GH + 30) / 5,
            transform: `translateX(${wob}px)` }}>
            {i % 2 === 0 ? <RosetteRow i={i} f={f} /> : <StarRow i={i} f={f} />}
          </div>
        );
      })}
      {/* the sheen crossing the satin */}
      <div style={{ position: "absolute", top: -40, height: drop + 80, width: 170,
        left: ((f * 13) % (GW + 460)) - 230, transform: "skewX(-17deg)",
        background: `linear-gradient(90deg, transparent 0%, ${hexa("#5A4526", 0.4)} 50%, transparent 100%)` }} />
      {/* a second fold, running the other way, so the cloth never sits still */}
      <div style={{ position: "absolute", top: -40, height: drop + 80, width: 120,
        left: GW + 300 - ((f * 9) % (GW + 420)), transform: "skewX(13deg)",
        background: `linear-gradient(90deg, transparent 0%, ${hexa("#5A4526", 0.26)} 50%, transparent 100%)` }} />
      {/* the weighted hem, swinging */}
      <div style={{ position: "absolute", left: 0, bottom: 0, width: GW + 28, height: 20,
        background: dkh(BRASS, 0.3),
        transform: `rotate(${Math.sin(f / 7) * 0.8}deg)` }} />
    </div>
  );
};

/** the roller the banner comes off, and it TURNS */
const Roller: React.FC<{ f: number; spin: number }> = ({ f, spin }) => (
  <div style={{ position: "absolute", zIndex: 66, left: GX - 26, top: GY - 42,
    width: GW + 52, height: 34, borderRadius: 17,
    background: `linear-gradient(180deg, ${mxh(BRASS, 0.2)} 0%, ${dkh(BRASS, 0.34)} 100%)` }}>
    {Array.from({ length: 16 }, (_, i) => (
      <div key={"rb" + i} style={{ position: "absolute", top: 4, height: 26, width: 7,
        left: 14 + (((i * 40 + spin) % (GW + 24))), borderRadius: 4,
        background: hexa("#2A2016", 0.34) }} />
    ))}
  </div>
);

/* =========================================================================
   S2 — THE PERSONA GOES UP OVER THE GLASS.
   ========================================================================= */
export const ShopA: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const w = PALETTES.corner;
  /* ⛔⛔⛔ FOUR SECONDS OF A CURTAIN COMING DOWN IS ONE EVENT AND YOU CAN SEE THE
     END OF IT HALF A SECOND IN. *"too boring, they would leave the video."* The
     defect is SHOT COUNT, not the curtain: one shot, one action, 124 frames, no
     escalation and no surprise. [[feedback_shot_count_is_a_floor]] wants roughly
     five beats in that time, so the persona now ARRIVES AS A CREW and buries the
     shopfront — a different object, from a different direction, every 0.8s, each
     one more ridiculous than the last. The joke escalates instead of descending.
       B1 banner rolls down     B2 giant rosette swings in and SLAMS
       B3 bunting whips across  B4 a trophy is winched up from below
       B5 certificates plastered over every last gap */
  const B = [0, 24, 48, 72, 96];
  const beat = B.filter((b) => f >= b).length;
  const at = (i: number, a: number, b: number, ez: any = OUT) => E(f, B[i] + a, B[i] + b, 0, 1, ez);

  const drop = at(0, 0, 15, OUT) * 132;                 /* the banner */
  const swing = at(1, 0, 13, BACK);                     /* the rosette */
  const whip = at(2, 0, 12, OUT);                       /* the bunting */
  const winch = at(3, 0, 17, OUT);                      /* the trophy */
  const CERT = [96, 100, 104, 108, 111, 114, 117, 120];
  const certs = CERT.filter((c) => f >= c + 6).length;

  const lit = Math.max(0.02, 1 - (beat - 1) * 0.19 - certs * 0.05);
  const slam = B.concat(CERT).reduce((a, b) =>
    f >= b + 11 && f < b + 22 ? Math.max(a, Math.abs(settle(f - b - 11, 9, 2.5, 6))) : a, 0);

  /* ⭐ THE SHOT CHANGES WITH THE BEAT — a punch in on the glass for the rosette,
     back out for the bunting, in again for the trophy. ⛔ crop bound: cam 1.12 x
     push 1.05 leaves 108..904, so each punch centres on the thing it is about. */
  const cs = [1.0, 1.12, 1.02, 1.1, 1.0][Math.max(0, beat - 1)];
  const cxs = [0, -46, 0, 40, 0][Math.max(0, beat - 1)];
  const cys = [0, 26, 0, -34, 0][Math.max(0, beat - 1)];
  const ease = E(f, B[Math.max(0, beat - 1)], B[Math.max(0, beat - 1)] + 16, 0, 1, IO);
  const pcs = [1.0, 1.0, 1.12, 1.02, 1.1][Math.max(0, beat - 1)];
  const pcx = [0, 0, -46, 0, 40][Math.max(0, beat - 1)];
  const pcy = [0, 0, 26, 0, -34][Math.max(0, beat - 1)];

  return (
    <Scene p={asPlace(w)} slug="" push={[-30, dur, 1.04]} vig={0.58} glow={hexa(w.key, 0.2)}>
      <Cam s={pcs + (cs - pcs) * ease}
        x={pcx + (cxs - pcx) * ease + slam * 0.6}
        y={pcy + (cys - pcy) * ease + slam} z={16}>
        <Surface w={w} t={f * 1.6} stars overhead lampsOn litFar={0.34} />
        <StreetLamp x={78} y={678} h={330} c={w.key} s={1.02} z={34} />
        <Front f={f} w={w} lit={lit} />
        <Interior f={f} lit={lit} stock={5} check={-1} />
        <Cone x={GX + GW / 2} y={GY + GH} top={GW * 0.8} bot={GW * 1.5} len={190}
          c={WARM} o={0.44 * lit} z={46} f={f} sway={0} />

        {/* B1 — the banner */}
        <Banner f={f} drop={drop} tear={0} />
        <Roller f={f} spin={drop * 1.4} />

        {/* B4 — the trophy, winched up from below the sill */}
        {beat >= 4 && (
          <div style={{ position: "absolute", zIndex: 63, left: GX + 296,
            top: GY + GH + 30 - winch * 322 }}>
            <Trophy f={f} />
            <div style={{ position: "absolute", left: 148, top: -260, width: 8,
              height: 300, background: dkh(BRASS, 0.2) }} />
          </div>
        )}

        {/* B2 — the giant rosette, swung in on a rope from the right */}
        {beat >= 2 && (
          <div style={{ position: "absolute", zIndex: 65,
            left: 1180 - swing * 780, top: GY + 74,
            transform: `rotate(${(1 - swing) * 52 + Math.sin(f / 9) * 3 * swing}deg)`,
            transformOrigin: "50% -90px" }}>
            <Rosette x={130} s={228} f={f} ph={0} />
          </div>
        )}

        {/* B3 — bunting whipped across the whole front, and a board on the kerb */}
        {beat >= 3 && <>
          {Array.from({ length: 11 }, (_, i) => {
            const t = Math.max(0, Math.min(1, whip * 1.5 - i * 0.045));
            const bx = SHX - 30 + i * 66;
            const sag = Math.sin((i / 10) * Math.PI) * 34;
            return (
              <div key={"bt" + i} style={{ position: "absolute", zIndex: 67,
                left: bx, top: GY - 78 + sag + Math.sin(f / 6 + i * 0.7) * 7,
                width: 54, height: 66 * t, transformOrigin: "50% 0%",
                transform: `rotate(${Math.sin(f / 7 + i) * 9}deg)`,
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                background: ["#C4392A", "#D9A93C", "#3E9A72"][i % 3] }} />
            );
          })}
          <div style={{ position: "absolute", zIndex: 68, left: SHX - 30, top: GY - 82,
            width: SHR - SHX + 60, height: 6, borderRadius: 3, background: dkh(BRASS, 0.24),
            transform: `rotate(${Math.sin(f / 21) * 0.5}deg)` }} />
          <Board f={f} at={B[2] + 4} />
        </>}

        {/* B5 — certificates slapped over every remaining gap */}
        {CERT.map((c, i) => <Cert key={"ct" + i} f={f} i={i} at={c} />)}

        <Contact x={HERO_X - 124} y={HERO_Y - 16} w={248} z={30} o={0.34} />
        <Hero f={f} x={HERO_X} y={HERO_Y} size={HERO_S} z={56} costume={{ constr: 1 }}
          gaze={0.6} act={3} drive={0.24} strain={0.2 + (beat / 5) * 0.6}
          stern={beat > 2 ? 1 : 0} shock={Math.min(1, slam * 0.08)}
          tint={mix3("#D97757", "#C4392A", (beat / 5) * 0.6)} />
        {/* ⭐ the crew who keep bringing more of it */}
        {beat >= 2 && (
          <Hero f={f + 40} x={702} y={706} size={168} z={54} costume={{ glasses: 1 }}
            gaze={0.4} act={1} drive={0.4} ph={1.3} flip />
        )}
        {beat >= 3 && (
          <Hero f={f + 90} x={856} y={700} size={156} z={54} costume={{ suit: 1 }}
            gaze={0.5} act={2} drive={0.3} ph={2.6} />
        )}

        {B.concat(CERT).map((b, i) => (
          <Puff key={"sp" + i} x={GX + 90 + (i % 4) * 150} y={GY + 60 + (i % 3) * 90}
            f={f} at={b + 11} n={10} s={1.1} z={86} c="#CFC0A2" />
        ))}
        {beat > 1 && Array.from({ length: 10 }, (_, i) => (
          <div key={"dk" + i} style={{ position: "absolute", zIndex: 88, borderRadius: 3,
            left: GX + 16 + ((i * 83 + f * 7) % (GW - 24)),
            top: GY + 40 + ((i * 29 + f * 13) % (GH - 20)), width: 12, height: 7,
            background: hexa(mix3(EMBER, GOLD, rnd(i, 4)), 0.55) }} />
        ))}
        <Occluder side="l" c={dkh(w.b3, 0.34)} kind="pole" z={92} />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S3 — HE TEARS IT DOWN AND THE REAL STOCK IS LIT.

   ⛔ The answer cards streaming out of the window are GONE. *"remove the random
      green papers flying out."* They were there to hold the tail's motion up and
      they read as litter — a generic prop doing a metric's job.
   ⭐⭐ The stock carries it instead, at 128px rather than 86, and each one is LIT
      like stock in a window: a plinth, a halo that breathes, a spotlight from the
      rail above, and a glint that crosses the face on its own cycle. A beam
      sweeps the shelf behind them, which is the large moving area the papers
      were standing in for. ⛔ matte only — radial-gradients and cones, no
      `boxShadow: 0 0 Npx` anywhere.
   ========================================================================= */
const STOCK_AT = [34, 44, 54, 64, 74];
const SEAT: Array<[number, number]> = [
  [GX + 28, GY + 34], [GX + 216, GY + 34], [GX + 404, GY + 34],
  [GX + 122, GY + 180], [GX + 310, GY + 180],
];
const TS = 128;

const LogoFx: React.FC<{ f: number; i: number; at: number; id: string; check: number }> =
  ({ f, i, at, id, check }) => {
  if (f < at) return null;
  const t = E(f, at, at + 12, 0, 1, OUT);
  const flying = f < at + 12;
  const [tx, ty] = SEAT[i];
  const sx = i % 2 ? 1320 : -240, sy = 110 + (i % 3) * 140;
  const x = flying ? sx + (tx - sx) * t : tx;
  const y = flying ? sy + (ty - sy) * t : ty + Math.sin(f / 13 + i) * 4;
  const lf = f - at - 12;
  const on = check >= 0 && Math.abs(check * 5 - i) < 0.75;
  /* ⭐ the glint: a bar crossing the face at 15px/frame, each logo on its own phase */
  const gl = ((f + i * 23) % 38) / 38;
  const halo = 1 + Math.sin(f / 5.5 + i * 1.3) * 0.26;
  return (
    <>
      {!flying && <>
        {/* the halo, breathing */}
        <div style={{ position: "absolute", zIndex: 25,
          left: x + TS / 2 - TS * 0.95 * halo, top: y + TS / 2 - TS * 0.95 * halo,
          width: TS * 1.9 * halo, height: TS * 1.9 * halo, borderRadius: "50%",
          background: `radial-gradient(50% 50% at 50% 50%, ${hexa("#FFE9BE", 0.62)} 0%,
            ${hexa(WARM, 0.24)} 46%, transparent 72%)` }} />
        {/* the spotlight off the rail above */}
        <Cone x={x + TS / 2} y={GY + 2} top={26} bot={TS + 54} len={y - GY + TS}
          c="#FFE9BE" o={0.5} z={26} f={f + i * 30} sway={0.5} />
        {/* rays turning behind it */}
        {Array.from({ length: 8 }, (_, k) => (
          <div key={"rk" + k} style={{ position: "absolute", zIndex: 24,
            left: x + TS / 2 - 9, top: y + TS / 2 - 132, width: 18, height: 264,
            transformOrigin: "50% 50%",
            transform: `rotate(${f * 1.9 + k * 45 + i * 11}deg)`,
            background: `linear-gradient(180deg, transparent 0%, ${hexa("#FFEECB", 0.42)} 46%,
              ${hexa("#FFEECB", 0.42)} 54%, transparent 100%)` }} />
        ))}
        {/* the plinth */}
        <div style={{ position: "absolute", zIndex: 27, left: x - 12, top: y + TS - 4,
          width: TS + 24, height: 16, borderRadius: 5,
          background: `linear-gradient(180deg, ${mxh(BRASS, 0.26)} 0%, ${dkh(BRASS, 0.3)} 100%)` }} />
      </>}
      <div style={{ position: "absolute", zIndex: 30, left: x, top: y,
        transform: `rotate(${flying ? (1 - t) * (i % 2 ? 210 : -210) : 0}deg) scale(${on ? 1.07 : 1})` }}>
        <Tile id={id} x={0} y={0} s={TS} z={30} r={20} />
        {/* the glint crossing the face */}
        {!flying && (
          <div style={{ position: "absolute", left: 0, top: 0, width: TS, height: TS,
            borderRadius: 20, overflow: "hidden", zIndex: 32 }}>
            <div style={{ position: "absolute", top: -20, height: TS + 40, width: 40,
              left: gl * (TS + 80) - 60, transform: "skewX(-22deg)",
              background: `linear-gradient(90deg, transparent 0%, ${hexa("#FFFFFF", 0.62)} 50%, transparent 100%)` }} />
          </div>
        )}
        {on && (
          <div style={{ position: "absolute", right: -10, top: -10, width: 34, height: 34,
            borderRadius: 17, background: SAFE_C, color: "#0B1410", zIndex: 34,
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 22,
            textAlign: "center", lineHeight: "34px" }}>✓</div>
        )}
      </div>
      {/* the landing flare */}
      {lf >= 0 && lf < 16 && Array.from({ length: 10 }, (_, k) => {
        const a = (k / 10) * Math.PI * 2;
        const d = 30 + lf * 11;
        return (
          <div key={"fr" + k} style={{ position: "absolute", zIndex: 33,
            left: x + TS / 2 + Math.cos(a) * d - 5, top: y + TS / 2 + Math.sin(a) * d - 14,
            width: 10, height: 28, borderRadius: 5, opacity: 1 - lf / 16,
            transform: `rotate(${(a * 180) / Math.PI + 90}deg)`, background: hexa(GOLD, 0.85) }} />
        );
      })}
    </>
  );
};

export const ShopB: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const w = PALETTES.corner;
  const RIP = 10;
  const tear = E(f, RIP, RIP + 18, 0, 1, IN_Q);
  const lit = E(f, RIP + 2, RIP + 26, 0.05, 1, OUT);
  const check = f > 92 ? ((f - 92) % 26) / 26 : -1;
  const jolt = f >= RIP && f < RIP + 16 ? settle(f - RIP, 14, 2.5, 6) : 0;
  /* ⭐ the beam that sweeps the shelf — the big moving area, in place of the papers */
  const sweep = ((f * 7.4) % 360) - 180;

  return (
    <Scene p={asPlace(w)} slug="" push={[-30, dur, 1.05]} vig={0.56}
      glow={hexa(mix3(w.key, WARM, lit), 0.18 + lit * 0.16)}>
      <Cam s={1} x={jolt} y={jolt * 0.7} z={16}>
        <Surface w={w} t={f * 1.6} stars overhead lampsOn litFar={0.34} />
        <StreetLamp x={78} y={678} h={330} c={w.key} s={1.02} z={34} />
        <Front f={f} w={w} lit={lit} />
        <Interior f={f} lit={lit} stock={0} check={check} />
        {/* the shelf beam */}
        {lit > 0.4 && (
          <div style={{ position: "absolute", zIndex: 24, left: GX + GW / 2 - 30,
            top: GY + GH - 20, width: 60, height: GH + 40, transformOrigin: "50% 100%",
            transform: `rotate(${sweep * 0.34}deg)`,
            background: `linear-gradient(0deg, ${hexa('#FFE9BE', 0.55 * lit)} 0%, ${hexa(WARM, 0.03)} 100%)`,
            clipPath: "polygon(42% 100%, 58% 100%, 100% 0, 0 0)" }} />
        )}
        <Cone x={GX + GW / 2} y={GY + GH} top={GW * 0.8} bot={GW * 1.5} len={230}
          c={WARM} o={0.5 * lit} z={46} f={f} sway={0} />
        <Banner f={f} drop={GH + 30} tear={tear} />
        <Roller f={f} spin={-f * 6} />
        {SRC.map((id, i) => (
          <LogoFx key={"lg" + i} f={f} i={i} at={STOCK_AT[i]} id={id} check={check} />
        ))}
        <Contact x={HERO_X - 124} y={HERO_Y - 16} w={248} z={30} o={0.34} />
        <Hero f={f} x={HERO_X} y={HERO_Y} size={HERO_S} z={56} costume={{ constr: 1 }}
          gaze={0.4} act={3} drive={f > RIP + 22 ? 0.42 : 0.14}
          strain={f < RIP ? 0.8 : 0.08} cheer={f > RIP + 18 && f < RIP + 44 ? 1 : 0}
          stern={f < RIP ? 1 : 0} shock={Math.min(1, Math.abs(jolt) * 0.07)} />
        {f < RIP + 16 && (
          <Forearm x0={HERO_X + 92} y0={HERO_Y - HERO_S * 0.52}
            x1={GX - 30} y1={GY + 90} w={28} c="#C4674A" z={58} />
        )}
        <Puff x={GX + GW / 2} y={GY + 60} f={f} at={RIP} n={22} s={1.8} z={88} c="#CFC0A2" />
        <Occluder side="l" c={dkh(w.b3, 0.34)} kind="pole" z={92} />
      </Cam>
    </Scene>
  );
};

export const ShopPair: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Bg />
      <Audio src={staticFile("mistake_vo_tight.wav")} volume={LEVELS.DIALOGUE} startFrom={245} />
      <Audio src={staticFile("121mistake_bed.wav")} volume={LEVELS.MUSIC * db(7.4)} startFrom={245} />
      <CamCtx.Provider value={{ dx: 0, dy: 8, s: 1.02, rot: 0 }}>
        <AssemblyCtx.Provider value={true}>
          <Sequence from={0} durationInFrames={124}><ShopA dur={124} /></Sequence>
          <Sequence from={124} durationInFrames={150}><ShopB dur={150} /></Sequence>
        </AssemblyCtx.Provider>
      </CamCtx.Provider>
      <HookHeader big={f < 124 ? "1 · DROP THE PERSONA" : "SEND SOURCES INSTEAD"}
        hot={f < 124 ? "FREES YOUR WINDOW" : "+ MAKE IT SELF-CHECK"} f={f + 12} />
    </AbsoluteFill>
  );
};
