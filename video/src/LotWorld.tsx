import React from "react";
import { Img, staticFile } from "remotion";
import { inter } from "./fonts";
import { Mascot } from "./SlopKit";
import { E, osc, rnd, OUT, IO, BACK, IN_Q } from "./MissionWorld";

/* =========================================================================
   REEL 90 "OPEN" · SHARED KIT (the BACKLOT world).

   ⛔ Files use the `Lot` prefix: reel 79/80 already owns OpenWorld/OpenScenes/
      OpenReel/OpenArcade/OpenHooks and that reel is ALSO called "OPEN".

   Claim: one developer open-sourced a paid AI video studio. Four studios in one
   free app, 200+ models, and you bring your own API key instead of a subscription.

   ✅ VERIFIED against the GitHub API + README on 2026-08-03 (the reel-84 rule:
      verify BEFORE building, never after):

        Anil-matcha/Open-Generative-AI · MIT · JavaScript
        ★ 25,503 · 4,480 forks
        first commit 2026-02-09 "Scaffold Open-Higgsfield-ai with Vite"
        the repo was RENAMED from Open-Higgsfield-AI (the old URL still 301s)
        README: "400+ state-of-the-art models across 14 studios"
        Cinema Studio: "photorealistic cinematic shots with pro camera controls
                        (Lens, Focal Length, Aperture)"
        Image / Video / Audio / Lip Sync / Cinema / Workflow / Agent studios
        Seedance 2.0, Kling, Veo, Sora, Flux, Midjourney all listed
        bring your own Muapi key; no subscription enforced

   ⛔ WHERE THE VO AND THE FACTS DIVERGE, THE GRAPHIC SHOWS THE VERIFIED VERSION
      or shows nothing. Never put an unverifiable claim on screen:

        VO "over 10,000 stars"   → it is 25,503. The star plate rolls to the REAL
                                   number, which is bigger, so nothing conflicts.
        VO "in its first week"   → UNVERIFIABLE. First commit is 2026-02-09, six
                                   months ago, and the repo entity dates to 2023.
                                   NO "first week" anywhere in the graphics.
        VO "four studios"        → there are 14. The four he names are all real,
                                   so the graphic shows those four and never
                                   claims four is the total.
        VO "200 AI models"       → README says 400+. On screen: "200+", which is
                                   true and does not fight the audio.

   ✅ HIGGSFIELD PRICE VERIFIED 2026-08-03: **$129/mo** is the Ultra tier billed
      MONTHLY ($99/mo if you commit annually; Plus is $49 monthly / $39 annual).
      ⛔ The $29 in the first pass was a placeholder I invented. Never put an
         unverified price on screen — it is the one number a viewer can check.

   ⛔ Kling, Veo, Seedance and Higgsfield have NO Simple Icons entry. Per
      `reel-brand-logo-sourcing`, a logo is never invented — those get
      typographic wordmark tiles instead.
   ========================================================================= */

export const STATS = {
  repo: "Open-Generative-AI",
  owner: "Anil-matcha",
  author: "Anil Matcha",
  stars: 25503,
  forks: 4480,
  license: "MIT",
  models: 200,          // "200+" on screen; the README claims 400+
  studios: 4,           // the four he names; the README lists 14
};

/* matte paints only — solid fills + dark shadows, never a coloured glow */
/* ⛔ FIRST PALETTE WAS MUD. WALL #1E2A38 sat 15 luma off NIGHT #0B1017, so the
      stages, the tower and the roofline all dissolved into the background — the
      frame read as 80% empty black and NOTHING moving in it could register
      (S1 measured 2.06 with a walking hero, sweeping searchlights, drifting
      haze and a 520px blackout). Same rule reel 88 learned and this reel then
      ignored: a surface must sit WELL clear of the background it is drawn on.
      Every structural tone below is lifted 12-20 luma. */
export const NIGHT = "#0B1017", SKY = "#16222F";
export const WALL = "#2C3E53", WALL_D = "#1E2C3B", WALL_L = "#3B5169";
export const STEEL = "#41586F", STEEL_L = "#5B7590", STEEL_D = "#2E4053";
export const LAMP = "#A9BECF", LAMP_HOT = "#D2E0EA";
export const GROUND = "#1A252F", GROUND_L = "#24323F";
export const CARD = "#F7F3EA", INKD = "#241F1A", MUTE = "#8E8677";
export const CLAY = "#C96442", CLAY_D = "#A24E32";
export const GO = "#17A87C", GOLD = "#E9AE3E", RED = "#D63B27";
export const BLUE = "#3E7AB8", PLUM = "#7A5A9E";
/* ⛔ HIGGSFIELD'S REAL SCHEME, read out of their own apple-touch-icon on
      2026-08-03: acid lime #D1FE17 on near-black #131313. Not invented, not
      approximated — sampled from the mark itself (66% of its pixels are HF_LIME).
   ⛔ Their logo is black-on-lime, but a big black-on-lime TEXT block is exactly
      what Alex flagged on reel 88. The mark stays authentic; every wordmark is
      LIME ON BLACK instead. */
export const HF_LIME = "#D1FE17", HF_INK = "#131313", HF_DIM = "#6E7F3A";

export const SH = "0 10px 0 rgba(0,0,0,0.34)";
export const SH_D = "0 14px 26px rgba(0,0,0,0.6)";

/** the four studios he names. All four are real; the README lists 14 in total. */
export const STUDIOS: { name: string; c: string; icon: string; who: string }[] = [
  { name: "IMAGE",    c: BLUE, icon: "image", who: "glasses" },
  { name: "VIDEO",    c: GO,   icon: "video", who: "constr"  },
  { name: "LIP SYNC", c: PLUM, icon: "lips",  who: "chef"    },
  { name: "CINEMA",   c: CLAY, icon: "cam",   who: "prof"    },
];

/** The three models the VO names.
    ⛔ None of them publishes a distributable mark of its own, so the tile carries
       the REAL logo of the company that BUILDS it — ByteDance ships Seedance,
       Kuaishou ships Kling, Google DeepMind ships Veo. All three pulled from
       Simple Icons with their own brand colours. A logo is never invented; using
       the parent's real mark and crediting it is the honest version. */
export const NAMED = [
  { name: "SEEDANCE", c: "#3C8CFF", logo: "bytedance.svg", by: "ByteDance" },
  { name: "KLING",    c: "#FF4906", logo: "kuaishou.svg",  by: "Kuaishou"  },
  { name: "VEO",      c: "#4285F4", logo: "google.svg",    by: "Google"    },
];

export const Roll: React.FC<{ f: number; at: number; to: number; dur?: number }> =
  ({ f, at, to, dur = 24 }) => <>{Math.round(E(f, at, at + dur, 0, to, OUT)).toLocaleString()}</>;

/* ------------------------------------------------------------------ icons -- */
const P: Record<string, string> = {
  image: "M3 5h18v14H3z M3 15l5-5 4 4 3-3 6 6",
  video: "M3 6h13v12H3z M17 10l4-3v10l-4-3z",
  lips:  "M4 12c3-4 5-4 8-4s5 0 8 4c-3 4-5 4-8 4s-5 0-8-4z M4 12h16",
  cam:   "M4 7h11v10H4z M15 11l5-3v8l-5-3z M6 4h4v3H6z",
  lock:  "M6 11h12v9H6z M9 11V8a3 3 0 0 1 6 0v3",
  key:   "M14 7a4 4 0 1 1-3.4 6.1L4 20v-3h3v-3h3l0.6-0.6A4 4 0 0 1 14 7z",
  star:  "M12 3l2.9 6 6.6 0.9-4.8 4.6 1.2 6.5L12 18l-5.9 3 1.2-6.5L2.5 9.9 9.1 9z",
};
export const Icon: React.FC<{
  n: string; s?: number; c?: string; w?: number; solid?: boolean;
}> = ({ n, s = 26, c = CARD, w = 2, solid = false }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" style={{ display: "block" }}>
    <path d={P[n] ?? P.image} fill={solid ? c : "none"} stroke={c} strokeWidth={solid ? w * 0.7 : w}
          strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ---------------------------------------------------------------- the lot --
   THE BACKLOT AT NIGHT. Layered the way reel 84's arena and reel 88's circuit
   were: nothing back here competes, but the frame is never empty.

   122-142  overhead truss beam
   142-206  lamp heads hanging off it
   206-300  night sky, distant stage roofline, a water tower
   300-566  the sound stages
   566-600  the apron
   600-792  concrete: cable runs, C-stands, sandbags, a painted bay line
   ---------------------------------------------------------------------------- */
export const BackLot: React.FC<{
  f: number; dim?: number; lamps?: number; z?: number;
}> = ({ f, dim = 1, lamps = 1, z = 2 }) => {
  const TOP = 122;
  return (<>
    <div style={{ position: "absolute", inset: 0, background: NIGHT, zIndex: z }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: TOP + 84, height: 220,
      background: SKY, zIndex: z + 1, opacity: dim }} />

    {/* distant roofline + a water tower, so the lot has a horizon */}
    {Array.from({ length: 9 }, (_, i) => (
      <div key={`r${i}`} style={{ position: "absolute", left: -20 + i * 122,
        top: TOP + 150 + (i % 3) * 22, width: 116, height: 160,
        background: "#22303F", zIndex: z + 2, opacity: dim }} />
    ))}
    <div style={{ position: "absolute", left: 796, top: TOP + 92, zIndex: z + 3, opacity: dim }}>
      <div style={{ position: "absolute", left: 22, top: 0, width: 92, height: 44,
        borderRadius: 8, background: "#27374A", border: `3px solid ${STEEL_D}` }} />
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ position: "absolute", left: 26 + i * 30, top: 44, width: 9,
          height: 78, background: STEEL_D, transform: `skewX(${(i - 1) * 6}deg)` }} />
      ))}
    </div>

    {/* the truss and its lamp heads. ⛔ solid pale panels, never a glow. */}
    <div style={{ position: "absolute", left: -20, right: -20, top: TOP, height: 18,
      background: STEEL, zIndex: z + 12, opacity: dim }} />
    {Array.from({ length: 7 }, (_, i) => (
      <React.Fragment key={`l${i}`}>
        <div style={{ position: "absolute", left: 52 + i * 148, top: TOP + 18, width: 8,
          height: 26, background: STEEL_D, zIndex: z + 12, opacity: dim }} />
        <div style={{ position: "absolute", left: 26 + i * 148, top: TOP + 44, width: 62,
          height: 34, borderRadius: 6, background: "#27374A",
          border: `3px solid ${STEEL_L}`, zIndex: z + 12, opacity: dim }}>
          <div style={{ position: "absolute", left: 6, top: 5, right: 6, bottom: 5,
            borderRadius: 3,
            background: lamps > 0.5
              ? ((Math.floor(f / 11) + i) % 9 === 0 ? LAMP_HOT : LAMP)
              : "#33475C" }} />
        </div>
      </React.Fragment>
    ))}

    {/* the ground */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 600, bottom: 0,
      background: GROUND, zIndex: z + 6 }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 596, height: 6,
      background: STEEL_D, zIndex: z + 7, opacity: dim }} />
    {/* painted bay line */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 690, height: 5,
      background: "#26374A", zIndex: z + 7, opacity: 0.8 * dim }} />
    {/* cable runs snaking across the concrete */}
    {[0, 1, 2].map((i) => (
      <div key={`c${i}`} style={{ position: "absolute", left: -40, right: -40,
        top: 636 + i * 44, height: 7, borderRadius: 4,
        background: i % 2 ? "#27374A" : "#20303E", zIndex: z + 7,
        transform: `rotate(${(i - 1) * 0.6}deg)`, opacity: dim }} />
    ))}
    {/* C-stands and sandbags along the apron */}
    {Array.from({ length: 6 }, (_, i) => (
      <React.Fragment key={`cs${i}`}>
        <div style={{ position: "absolute", left: 44 + i * 176, top: 560, width: 6, height: 62,
          background: STEEL_D, zIndex: z + 8, opacity: dim }} />
        <div style={{ position: "absolute", left: 28 + i * 176, top: 620, width: 38, height: 8,
          borderRadius: 4, background: "#27374A", zIndex: z + 8, opacity: dim }} />
        <div style={{ position: "absolute", left: 76 + i * 176, top: 612, width: 30, height: 17,
          borderRadius: 4, background: "#27374A", zIndex: z + 8, opacity: dim }} />
      </React.Fragment>
    ))}
    {/* night air */}
    {Array.from({ length: 18 }, (_, i) => (
      <div key={`d${i}`} style={{ position: "absolute",
        left: 20 + rnd(i, 3) * 960,
        top: ((i * 71 + f * (0.4 + (i % 4) * 0.2)) % 560) + TOP + 60,
        width: 5, height: 5, background: STEEL, zIndex: z + 9, opacity: 0.45 * dim }} />
    ))}
  </>);
};

/* ------------------------------------------------------------ sound stage --
   A stage building with a roll-up door. `open` slides the door up; `lit` turns
   its lamp and doorway on. Depth comes from a lighter top face.
   ---------------------------------------------------------------------------- */
export const SoundStage: React.FC<{
  f: number; x: number; y: number; w?: number; h?: number; s?: number;
  label: string; num: string; c?: string; icon?: string;
  /** which costumed Claude works this stage */
  who?: string;
  open?: number; lit?: number; t?: number; z?: number;
}> = ({ f, x, y, w = 214, h = 262, s = 1, label, num, c = CLAY, icon = "image",
        who = "glasses", open = 0, lit = 0, t = 1, z = 20 }) => {
  const W = w * s, H = h * s;
  const DW = W * 0.62, DH = H * 0.46;              // the doorway
  const DX = (W - DW) / 2, DY = H - DH - 14 * s;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: W, height: H, zIndex: z,
      transform: `scale(${t})`, transformOrigin: "50% 100%",
      opacity: Math.min(1, t * 1.6) }}>

      {/* ⛔ FIRST VERSION READ AS A FLAT COLOURED CARD, not a building: the
             doorway filled most of the wall so the roof, ribs and number were
             invisible. The wall is the object; the door is a hole in it. */}
      <div style={{ position: "absolute", left: 6 * s, top: -15 * s, width: W - 12 * s,
        height: 16 * s, background: WALL_L, borderRadius: `${5 * s}px ${5 * s}px 0 0` }} />
      <div style={{ position: "absolute", left: 0, top: -3 * s, width: W, height: 9 * s,
        background: STEEL_L, borderRadius: 3 * s }} />
      <div style={{ position: "absolute", inset: 0, borderRadius: 5 * s,
        background: WALL, border: `${3 * s}px solid ${STEEL_D}`, overflow: "hidden" }}>
        {/* corrugated wall ribs */}
        {Array.from({ length: Math.round(W / (13 * s)) }, (_, i) => (
          <div key={i} style={{ position: "absolute", left: i * 13 * s, top: 0, bottom: 0,
            width: 5 * s, background: i % 2 ? WALL_D : "#33475C", opacity: 0.85 }} />
        ))}
        {/* the stencilled stage band */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 30 * s, height: 3 * s,
          background: STEEL_D }} />
      </div>

      {/* the number plate, and the lamp over the door */}
      <div style={{ position: "absolute", left: 10 * s, top: 8 * s, width: 46 * s,
        height: 34 * s, borderRadius: 5 * s, background: INKD, display: "flex",
        alignItems: "center", justifyContent: "center", fontFamily: inter.fontFamily,
        fontWeight: 900, fontSize: 22 * s, color: GOLD }}>{num}</div>
      <div style={{ position: "absolute", left: DX + DW / 2 - 30 * s, top: DY - 26 * s,
        width: 60 * s, height: 11 * s, borderRadius: 3 * s,
        background: lit > 0.5 ? LAMP : "#33475C" }} />
      <div style={{ position: "absolute", left: DX + DW / 2 - 20 * s, top: DY - 15 * s,
        width: 40 * s, height: 6 * s,
        background: lit > 0.5 ? "#8CA3B8" : "#27374A" }} />

      {/* the doorway — a hole in the wall, with the door rolled down over it */}
      <div style={{ position: "absolute", left: DX, top: DY, width: DW, height: DH,
        borderRadius: 3 * s, background: lit > 0.5 ? c : "#16212C",
        border: `${3 * s}px solid ${STEEL_D}`, overflow: "hidden" }}>
        {/* ⛔ AN ICON AND A CAPTION IS NOT A CHARACTER. Alex: "each of the images
               here need to be like claude characters designed characters not
               like text things". Each stage has a costumed Claude WORKING in it;
               the name shrinks to a plate at their feet. */}
        {lit > 0.5 && (<>
          <div style={{ position: "absolute", left: "50%", bottom: 26 * s,
            transform: `translateX(-50%)`,
            filter: `drop-shadow(0 ${5 * s}px ${7 * s}px rgba(0,0,0,0.5))` }}>
            <Mascot lf={f + (num.charCodeAt(1) * 7)} size={DH * 0.78}
              nodAmp={2.6} nodSpeed={11} cheer={0.55}
              {...({ [who]: 1 } as any)} />
          </div>
          <div style={{ position: "absolute", left: 8 * s, right: 8 * s, bottom: 7 * s,
            height: 20 * s, borderRadius: 5 * s, background: "rgba(20,16,12,0.55)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 13 * s,
            letterSpacing: "0.08em", color: CARD, whiteSpace: "nowrap" }}>{label}</div>
        </>)}
        {/* the slatted roll-up door */}
        <div style={{ position: "absolute", left: 0, right: 0, top: `${-open * 104}%`,
          height: "100%", background: "#354A61",
          borderBottom: `${4 * s}px solid ${STEEL_L}` }}>
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} style={{ position: "absolute", left: 0, right: 0,
              top: `${5 + i * 12}%`, height: 3 * s, background: "#22303F" }} />
          ))}
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------- paid tower --
   What it replaces: a tall building you have to pay to walk into. A turnstile,
   a price plate and a padlock. `dark` kills its lights.
   ---------------------------------------------------------------------------- */
export const PaidTower: React.FC<{
  f: number; x: number; y: number; s?: number; dark?: number; t?: number;
  price?: string; name?: string; z?: number;
}> = ({ f, x, y, s = 1, dark = 0, t = 1, price = "$129/mo", name = "HIGGSFIELD", z = 22 }) => {
  const W = 236 * s, H = 400 * s;
  const on = 1 - dark;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: W, height: H, zIndex: z,
      transform: `scale(${t})`, transformOrigin: "50% 100%",
      opacity: Math.min(1, t * 1.6) }}>
      <div style={{ position: "absolute", left: 10 * s, top: -14 * s, width: W - 20 * s,
        height: 15 * s, background: on > 0.5 ? HF_DIM : WALL_L,
        borderRadius: `${5 * s}px ${5 * s}px 0 0` }} />
      <div style={{ position: "absolute", inset: 0, borderRadius: 6 * s,
        background: on > 0.5 ? "#1C1C1C" : "#1A1F24",
        border: `${3 * s}px solid ${on > 0.5 ? HF_DIM : STEEL_D}` }} />

      {/* windows, in their lime when the lights are on */}
      {Array.from({ length: 24 }, (_, i) => {
        const c = i % 4, r = Math.floor(i / 4);
        const litW = on > 0.5 ? ((Math.floor(f / 15) + i) % 7 !== 0) : (i % 11 === 0);
        return (
          <div key={i} style={{ position: "absolute", left: (20 + c * 50) * s,
            top: (26 + r * 40) * s, width: 34 * s, height: 26 * s, borderRadius: 3 * s,
            background: litW ? (on > 0.5 ? HF_LIME : "#8CA3B8") : "#1E2429" }} />
        );
      })}

      {/* THE REAL MARK, on its own lime tile the way they use it */}
      <div style={{ position: "absolute", left: W / 2 - 34 * s, top: 268 * s,
        width: 68 * s, height: 68 * s, borderRadius: 16 * s,
        background: on > 0.5 ? HF_LIME : "#2A2E22", overflow: "hidden",
        boxShadow: on > 0.5 ? SH_D : "none" }}>
        <Img src={staticFile("logos/higgsfield.png")}
             style={{ width: "100%", height: "100%", objectFit: "cover",
               opacity: on > 0.5 ? 1 : 0.32 }} />
      </div>

      {/* ⛔ LIME ON BLACK, never black on lime */}
      <div style={{ position: "absolute", left: 12 * s, right: 12 * s, top: 344 * s,
        height: 34 * s, borderRadius: 6 * s, background: HF_INK,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 20 * s,
        letterSpacing: "0.04em", color: on > 0.5 ? HF_LIME : "#4A5030",
        whiteSpace: "nowrap" }}>{name}</div>
      <div style={{ position: "absolute", left: 12 * s, right: 12 * s, top: 382 * s,
        height: 32 * s, borderRadius: 6 * s, background: HF_INK, display: "flex",
        alignItems: "center", justifyContent: "center", gap: 8 * s }}>
        <Icon n="lock" s={19 * s} c={on > 0.5 ? HF_LIME : "#4A5030"} w={2.4} />
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 22 * s,
          color: on > 0.5 ? HF_LIME : "#4A5030" }}>{price}</div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------- camera rig --
   Cinema Studio, as the thing it actually is: a dolly, a crane arm and a head
   with real lens controls.
   ---------------------------------------------------------------------------- */
export const CameraRig: React.FC<{
  f: number; x: number; y: number; s?: number; t?: number; pan?: number; z?: number;
}> = ({ f, x, y, s = 1, t = 1, pan = 0, z = 30 }) => {
  const sway = Math.sin(f / 24) * 1.4;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      transform: `scale(${t})`, transformOrigin: "40% 100%",
      opacity: Math.min(1, t * 1.6) }}>
      {/* dolly base + track */}
      <div style={{ position: "absolute", left: -30 * s, top: 268 * s, width: 300 * s,
        height: 9 * s, borderRadius: 4 * s, background: STEEL_D }} />
      <div style={{ position: "absolute", left: 20 * s, top: 236 * s, width: 128 * s,
        height: 32 * s, borderRadius: 6 * s, background: WALL_L,
        border: `${3 * s}px solid ${STEEL}` }} />
      {[0, 1].map((i) => (
        <div key={i} style={{ position: "absolute", left: (34 + i * 78) * s, top: 262 * s,
          width: 22 * s, height: 22 * s, borderRadius: "50%", background: "#18232F",
          border: `${3 * s}px solid ${STEEL_L}` }} />
      ))}
      {/* the column and the arm */}
      <div style={{ position: "absolute", left: 74 * s, top: 128 * s, width: 16 * s,
        height: 112 * s, background: STEEL }} />
      <div style={{ position: "absolute", left: 40 * s, top: 112 * s, width: 190 * s,
        height: 14 * s, borderRadius: 7 * s, background: STEEL_L,
        transformOrigin: "22% 50%", transform: `rotate(${-6 + sway + pan * 9}deg)` }} />
      {/* the head */}
      <div style={{ position: "absolute", left: 168 * s, top: 56 * s,
        transformOrigin: "0% 100%", transform: `rotate(${sway + pan * 9}deg)` }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: 96 * s, height: 58 * s,
          borderRadius: 7 * s, background: "#27374A", border: `${3 * s}px solid ${STEEL_L}` }} />
        <div style={{ position: "absolute", left: 88 * s, top: 12 * s, width: 40 * s,
          height: 34 * s, borderRadius: 5 * s, background: "#33475C",
          border: `${3 * s}px solid ${STEEL_L}` }} />
        <div style={{ position: "absolute", left: 120 * s, top: 20 * s, width: 15 * s,
          height: 18 * s, borderRadius: 3 * s, background: LAMP }} />
        {/* the record tally */}
        <div style={{ position: "absolute", left: 12 * s, top: 12 * s, width: 11 * s,
          height: 11 * s, borderRadius: "50%",
          background: Math.floor(f / 12) % 2 ? RED : "#3A2A28" }} />
        {/* the matte box */}
        <div style={{ position: "absolute", left: 20 * s, top: 32 * s, width: 54 * s,
          height: 6 * s, borderRadius: 3 * s, background: STEEL_D }} />
      </div>
    </div>
  );
};

/* --------------------------------------------------------------- wordmark --
   ⛔ Kling, Veo, Seedance and Higgsfield have no Simple Icons entry, and a logo
      is never invented (`reel-brand-logo-sourcing`). Typographic tile instead.
   ---------------------------------------------------------------------------- */
export const WordTile: React.FC<{
  name: string; c: string; x: number; y: number; s?: number; t?: number;
  r?: number; z?: number; logo?: string; by?: string;
}> = ({ name, c, x, y, s = 1, t = 1, r = 0, z = 24, logo, by }) => (
  <div style={{ position: "absolute", left: x, top: y, height: 96 * s, borderRadius: 20 * s,
    background: CARD, boxShadow: SH_D, zIndex: z, display: "flex", alignItems: "center",
    padding: `0 ${26 * s}px 0 ${16 * s}px`, gap: 16 * s,
    transform: `scale(${t}) rotate(${r}deg)`, opacity: Math.min(1, t * 1.6) }}>
    {logo ? (
      <div style={{ width: 64 * s, height: 64 * s, borderRadius: 16 * s,
        background: "#F1ECE1", display: "flex", alignItems: "center",
        justifyContent: "center" }}>
        <Img src={staticFile(`logos/${logo}`)}
             style={{ width: 40 * s, height: 40 * s, objectFit: "contain" }} />
      </div>
    ) : (
      <div style={{ width: 16 * s, height: 16 * s, borderRadius: "50%", background: c }} />
    )}
    <div>
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 36 * s,
        lineHeight: 1, letterSpacing: "-0.03em", color: INKD, whiteSpace: "nowrap" }}>{name}</div>
      {by && <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 17 * s,
        color: c, marginTop: 4 * s, whiteSpace: "nowrap" }}>by {by}</div>}
    </div>
  </div>
);

export const LogoTile: React.FC<{
  src: string; x: number; y: number; s?: number; r?: number; t?: number; z?: number;
  bg?: string;
}> = ({ src, x, y, s = 1, r = 0, t = 1, z = 24, bg = CARD }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 96 * s, height: 96 * s,
    borderRadius: 20 * s, background: bg, zIndex: z, boxShadow: SH_D,
    display: "flex", alignItems: "center", justifyContent: "center",
    transform: `scale(${t}) rotate(${r}deg)`, opacity: Math.min(1, t * 1.6) }}>
    <Img src={staticFile(`logos/${src}`)}
         style={{ width: 56 * s, height: 56 * s, objectFit: "contain" }} />
  </div>
);

/* ------------------------------------------------------------- repo plate -- */
export const RepoCard: React.FC<{
  f: number; x: number; y: number; s?: number; t?: number; at?: number; z?: number;
}> = ({ f, x, y, s = 1, t = 1, at = 0, z = 40 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 560 * s, height: 138 * s,
    borderRadius: 20 * s, background: CARD, zIndex: z, boxShadow: SH_D,
    transform: `scale(${t})`, opacity: Math.min(1, t * 1.6) }}>
    <Img src={staticFile("logos/github.svg")}
         style={{ position: "absolute", left: 24 * s, top: 28 * s, width: 46 * s, height: 46 * s }} />
    <div style={{ position: "absolute", left: 84 * s, top: 24 * s, fontFamily: inter.fontFamily,
      fontWeight: 900, fontSize: 33 * s, letterSpacing: "-0.03em", color: INKD }}>
      {STATS.repo}
    </div>
    <div style={{ position: "absolute", left: 84 * s, top: 68 * s, fontFamily: inter.fontFamily,
      fontWeight: 700, fontSize: 21 * s, color: MUTE }}>{STATS.owner}</div>
    <div style={{ position: "absolute", right: 24 * s, top: 44 * s, display: "flex", gap: 9 * s }}>
      <div style={{ padding: `${9 * s}px ${15 * s}px`, borderRadius: 9 * s, background: INKD,
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 23 * s, color: GOLD }}>
        ★ <Roll f={f} at={at} to={STATS.stars} dur={26} />
      </div>
      <div style={{ padding: `${9 * s}px ${15 * s}px`, borderRadius: 9 * s, background: GO,
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 23 * s, color: CARD }}>
        {STATS.license}
      </div>
    </div>
  </div>
);

/* --------------------------------------------------------------- the slate --
   A clapperboard. Every scene on a real lot gets one, and it holds a claim
   better than a floating chip does.
   ---------------------------------------------------------------------------- */
export const Slate: React.FC<{
  f: number; x: number; y: number; s?: number; t?: number; clap?: number;
  l1: string; l2: string; z?: number;
}> = ({ f, x, y, s = 1, t = 1, clap = 0, l1, l2, z = 44 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 380 * s, height: 246 * s,
    zIndex: z, transform: `scale(${t}) rotate(${-3 + Math.sin(f / 30) * 1.2}deg)`,
    transformOrigin: "10% 100%", opacity: Math.min(1, t * 1.6) }}>
    {/* the clapper stick */}
    <div style={{ position: "absolute", left: 0, top: 0, width: 380 * s, height: 46 * s,
      transformOrigin: "3% 100%", transform: `rotate(${-clap * 22}deg)`,
      overflow: "hidden", borderRadius: 5 * s }}>
      {Array.from({ length: 9 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: i * 44 * s, top: 0, width: 44 * s,
          height: 46 * s, background: i % 2 ? INKD : CARD,
          transform: `skewX(-16deg)` }} />
      ))}
    </div>
    {/* the body */}
    <div style={{ position: "absolute", left: 0, top: 52 * s, width: 380 * s, height: 194 * s,
      borderRadius: 8 * s, background: INKD, boxShadow: SH_D, padding: `${18 * s}px ${22 * s}px` }}>
      {[["PROD.", l1], ["SCENE", l2]].map(([k, v], i) => (
        <div key={k} style={{ marginBottom: 14 * s }}>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 13 * s,
            letterSpacing: "0.16em", color: "#7E7568" }}>{k}</div>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 34 * s,
            letterSpacing: "-0.02em", color: i ? GOLD : CARD, whiteSpace: "nowrap" }}>{v}</div>
        </div>
      ))}
      <div style={{ position: "absolute", left: 22 * s, right: 22 * s, bottom: 16 * s,
        height: 3 * s, background: "#3A342B" }} />
    </div>
  </div>
);

/* ------------------------------------------------------------------ chips -- */
export const OChip: React.FC<{
  y: number; text: string; c?: string; size?: number; z?: number;
}> = ({ y, text, c = CLAY, size = 38, z = 46 }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top: y, display: "flex",
    justifyContent: "center", zIndex: z }}>
    <div style={{ padding: "12px 30px", borderRadius: 15, background: c, boxShadow: SH_D,
      fontFamily: inter.fontFamily, fontWeight: 900, fontSize: size, letterSpacing: "-0.02em",
      color: CARD, whiteSpace: "nowrap" }}>{text}</div>
  </div>
);

export const BigNum: React.FC<{
  f: number; at: number; to: number; x: number; y: number; size?: number;
  suffix?: string; c?: string; z?: number; dur?: number;
}> = ({ f, at, to, x, y, size = 150, suffix = "", c = CARD, z = 44, dur = 24 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    fontFamily: inter.fontFamily, fontWeight: 900, fontSize: size, lineHeight: 1,
    letterSpacing: "-0.05em", color: c, textShadow: "0 8px 16px rgba(0,0,0,0.6)" }}>
    <Roll f={f} at={at} to={to} dur={dur} />{suffix}
  </div>
);

/* -------------------------------------------------------------- key card -- */
export const KeyCard: React.FC<{
  f: number; x: number; y: number; s?: number; t?: number; z?: number;
}> = ({ f, x, y, s = 1, t = 1, z = 40 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 340 * s, height: 200 * s,
    borderRadius: 16 * s, background: CARD, boxShadow: SH_D, zIndex: z,
    transform: `scale(${t}) rotate(${Math.sin(f / 28) * 1.6}deg)`,
    opacity: Math.min(1, t * 1.6) }}>
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 46 * s,
      borderRadius: `${14 * s}px ${14 * s}px 0 0`, background: INKD, display: "flex",
      alignItems: "center", paddingLeft: 18 * s, gap: 10 * s }}>
      <Icon n="key" s={22 * s} c={GOLD} w={2.2} />
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 17 * s,
        letterSpacing: "0.1em", color: GOLD }}>YOUR API KEY</div>
    </div>
    {/* the magnetic strip and a masked key */}
    <div style={{ position: "absolute", left: 18 * s, right: 18 * s, top: 66 * s,
      height: 14 * s, borderRadius: 4 * s, background: "#DBD4C6" }} />
    <div style={{ position: "absolute", left: 18 * s, top: 96 * s,
      fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 25 * s,
      letterSpacing: "0.05em", color: INKD }}>sk-••••••••••••4f2a</div>
    <div style={{ position: "absolute", left: 18 * s, bottom: 16 * s, padding: `${7 * s}px ${13 * s}px`,
      borderRadius: 8 * s, background: GO, fontFamily: inter.fontFamily, fontWeight: 900,
      fontSize: 18 * s, color: CARD }}>PAY PER GENERATION</div>
  </div>
);

/* ------------------------------------------------------------------ atmos --
   ⛔ A LOT OF BUILDINGS IS A STILL LIFE. Reel 90's first pass animated each
      scene's entrance and then flatlined: per-15-frame motion read
      "6 0 0 1 9" — busy at the cut, dead in the middle, in all 13 scenes.

   Haze drifting across the lot is the cheap half of the fix: large, continuous,
   and it never competes because it carries no detail.
   ⛔ Lightened deliberately. Reel 88 shipped smoke at #2A3644 that was invisible
      against its own asphalt; anything drawn ON a dark layer must be LIGHTER
      than that layer or it is not there.
   ---------------------------------------------------------------------------- */
export const Atmos: React.FC<{ f: number; n?: number; z?: number; dim?: number }> =
  ({ f, n = 6, z = 10, dim = 1 }) => (<>
  {Array.from({ length: n }, (_, i) => {
    const speed = 0.5 + (i % 3) * 0.42;
    const w = 300 + (i % 4) * 190;
    const x = ((f * speed + i * 260) % (1012 + w + 260)) - w - 120;
    return (
      <div key={i} style={{ position: "absolute", left: x,
        top: 210 + (i % 5) * 92 + Math.sin(f / 40 + i) * 12,
        width: w, height: 54 + (i % 3) * 26, borderRadius: 40,
        background: ["#2E3F52", "#283747", "#34465C"][i % 3],
        opacity: (0.2 + (i % 3) * 0.07) * dim, zIndex: z }} />
    );
  })}
</>);

/* ⛔ THE SILHOUETTE CREW IS GONE. Alex: "why are there the people animations...
      instead of the human bodies it should be claude sprites instead bro". He is
      right twice over — generic bodies break house rule 3 (every figure is a
      costumed Claude Mascot), and having them stroll through all thirteen scenes
      made the lot feel like a screensaver. Figures now appear only where the
      story puts them: the founder, the crowd that showed up, and the CTA.
   ========================================================================= */

/* ----------------------------------------------------------- searchlights --
   Premiere searchlights raking the lot. On-world, and the only element here
   with enough AREA to move the motion gate on its own.
   ⛔ Matte rule: these are HARD-EDGED SOLID wedges, not radial glows. No blur,
      no gradient — just a clipped polygon at low alpha.
   ---------------------------------------------------------------------------- */
export const Searchlight: React.FC<{
  f: number; x: number; y?: number; n?: number; z?: number; speed?: number; dim?: number;
}> = ({ f, x, y = 700, n = 2, z = 13, speed = 1, dim = 1 }) => (<>
  {Array.from({ length: n }, (_, i) => {
    const a = Math.sin(f / (52 + i * 17) + i * 2.1) * (26 + i * 7) - (i ? 16 : -16);
    return (
      <div key={i} style={{ position: "absolute", left: x + i * 74, top: y - 660,
        width: 240, height: 680, zIndex: z,
        transformOrigin: "50% 100%", transform: `rotate(${a}deg)`,
        clipPath: "polygon(42% 100%, 58% 100%, 100% 0%, 0% 0%)",
        background: i ? "#37485C" : "#3E5266",
        opacity: (0.3 - i * 0.06) * dim }} />
    );
  })}
</>);

/* ------------------------------------------------------------------ truck --
   A grip truck crossing the lot. ⛔ The last resort the motion gate actually
   respects: reel 88 proved it is CONTRAST x AREA x TRAVEL, and small parts
   (crew, haze, lamps) never add up. This is one big solid mass moving 6px a
   frame across the foreground.
   ---------------------------------------------------------------------------- */
export const GripTruck: React.FC<{
  f: number; y?: number; s?: number; z?: number; speed?: number; dir?: number; at?: number;
}> = ({ f, y = 604, s = 1, z = 33, speed = 6, dir = 1, at = 0 }) => {
  const span = 1012 + 620 * s;
  const raw = ((f - at) * speed) % span;
  const x = dir > 0 ? raw - 580 * s : 1012 - raw + 40;
  if (f < at) return null;
  const bounce = Math.sin((f - at) / 4) * 2 * s;
  return (
    <div style={{ position: "absolute", left: x, top: y + bounce, zIndex: z,
      transform: dir > 0 ? undefined : "scaleX(-1)", transformOrigin: "50% 50%" }}>
      {/* ⛔ "trucks need to be more detailed and interesting" — it was a box, a cab
             and three wheels. Now it is a proper grip truck: a roller shutter with
             ribs, a loading rail, a lit cab, mirrors, a light bar and mudflaps. */}
      {/* chassis rail */}
      <div style={{ position: "absolute", left: 8 * s, top: 118 * s, width: 420 * s,
        height: 10 * s, borderRadius: 4 * s, background: "#22303E" }} />
      {/* box body */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 330 * s, height: 122 * s,
        borderRadius: 7 * s, background: "#33475C", border: `${4 * s}px solid ${STEEL_L}` }} />
      {/* the roller shutter, ribbed */}
      <div style={{ position: "absolute", left: 16 * s, top: 16 * s, width: 250 * s,
        height: 90 * s, borderRadius: 4 * s, background: "#2A3B4C", overflow: "hidden" }}>
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} style={{ position: "absolute", left: 0, right: 0,
            top: (4 + i * 11) * s, height: 3 * s, background: "#1E2C3B" }} />
        ))}
        <div style={{ position: "absolute", left: 96 * s, bottom: 8 * s, width: 58 * s,
          height: 7 * s, borderRadius: 3 * s, background: STEEL_L }} />
      </div>
      {/* the stripe and a stencil */}
      <div style={{ position: "absolute", left: 0, top: 106 * s, width: 330 * s,
        height: 14 * s, background: CLAY_D }} />
      <div style={{ position: "absolute", left: 278 * s, top: 26 * s, width: 34 * s,
        height: 26 * s, borderRadius: 4 * s, background: "#22303E" }} />
      <div style={{ position: "absolute", left: 278 * s, top: 58 * s, width: 34 * s,
        height: 8 * s, borderRadius: 3 * s, background: "#22303E" }} />
      {/* cab */}
      <div style={{ position: "absolute", left: 322 * s, top: 30 * s, width: 118 * s,
        height: 92 * s, borderRadius: `${6 * s}px ${18 * s}px ${6 * s}px ${6 * s}px`,
        background: "#3B5169", border: `${4 * s}px solid ${STEEL_L}` }} />
      <div style={{ position: "absolute", left: 350 * s, top: 42 * s, width: 66 * s,
        height: 36 * s, borderRadius: 4 * s, background: "#7E96AE" }} />
      {/* light bar, mirror, exhaust */}
      <div style={{ position: "absolute", left: 336 * s, top: 20 * s, width: 90 * s,
        height: 10 * s, borderRadius: 3 * s, background: "#22303E" }} />
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ position: "absolute", left: (344 + i * 28) * s, top: 22 * s,
          width: 18 * s, height: 6 * s, borderRadius: 2 * s,
          background: (Math.floor(f / 6) + i) % 3 === 0 ? GOLD : "#41586F" }} />
      ))}
      <div style={{ position: "absolute", left: 436 * s, top: 44 * s, width: 12 * s,
        height: 22 * s, borderRadius: 3 * s, background: "#22303E" }} />
      <div style={{ position: "absolute", left: 314 * s, top: -6 * s, width: 9 * s,
        height: 36 * s, borderRadius: 4 * s, background: "#2A3B4C" }} />
      {/* headlamp */}
      <div style={{ position: "absolute", left: 434 * s, top: 92 * s, width: 16 * s,
        height: 14 * s, borderRadius: 3 * s, background: LAMP }} />
      {/* wheels, with hubs and mudflaps */}
      {[46, 158, 380].map((wx, i) => (
        <React.Fragment key={i}>
          <div style={{ position: "absolute", left: wx * s, top: 108 * s,
            width: 52 * s, height: 52 * s, borderRadius: "50%", background: "#18232F",
            border: `${6 * s}px solid ${STEEL_L}` }} />
          <div style={{ position: "absolute", left: (wx + 18) * s, top: 126 * s,
            width: 16 * s, height: 16 * s, borderRadius: "50%", background: "#41586F",
            transform: `rotate(${(f - at) * 9 * (dir > 0 ? 1 : -1)}deg)` }} />
          <div style={{ position: "absolute", left: (wx - 6) * s, top: 152 * s,
            width: 22 * s, height: 16 * s, borderRadius: 2 * s, background: "#1E2C3B" }} />
        </React.Fragment>
      ))}
    </div>
  );
};

/* ------------------------------------------------------------ the founder --
   ⛔ Alex: "need to source real anil video". This is his OWN PUBLIC GITHUB
      AVATAR (github.com/Anil-matcha, user 4326215), pulled from the API — the
      picture he publishes on the platform he published the project on, used to
      credit him by name. No video of him exists that I could source, so this is
      a still; say so rather than fake footage.
   ---------------------------------------------------------------------------- */
export const FounderCard: React.FC<{
  f: number; x: number; y: number; s?: number; t?: number; z?: number;
}> = ({ f, x, y, s = 1, t = 1, z = 42 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 342 * s, height: 132 * s,
    borderRadius: 18 * s, background: CARD, boxShadow: SH_D, zIndex: z,
    transform: `scale(${t})`, opacity: Math.min(1, t * 1.6),
    display: "flex", alignItems: "center", paddingLeft: 16 * s, gap: 16 * s }}>
    <div style={{ width: 98 * s, height: 98 * s, borderRadius: 16 * s, overflow: "hidden",
      border: `${3 * s}px solid #E4DDCE` }}>
      <Img src={staticFile("logos/anil.jpg")}
           style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </div>
    <div>
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 30 * s,
        letterSpacing: "-0.03em", color: INKD, whiteSpace: "nowrap" }}>Anil Matcha</div>
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 19 * s,
        color: MUTE, marginTop: 3 * s }}>@Anil-matcha</div>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 6 * s,
        marginTop: 7 * s, padding: `${5 * s}px ${11 * s}px`, borderRadius: 8 * s,
        background: INKD, fontFamily: inter.fontFamily, fontWeight: 900,
        fontSize: 16 * s, color: GOLD }}>1,932 followers</div>
    </div>
  </div>
);
