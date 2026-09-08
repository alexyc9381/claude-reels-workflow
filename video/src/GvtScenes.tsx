import React from "react";
import { useCurrentFrame, Img, staticFile } from "remotion";
import {
  W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, SH, SH_D, mono, ui,
  Scene, Cam, Edge, Contact, Beam, Strip, Motes, Rake, Runner, Crew, Hero, Mark,
  asPlace, floatY, Deck, Tile, VscTile,
  INK, MUTE, CLAY, CLAYD, GOLD, GREEN, RED, SKY, BONE, BRASS, STEEL, IRON, CHROME,
  SLATE, EMBER, VSC, AGV, GUNMETAL, DECK, DECKL, G,
} from "./GvtWorld";
import {
  DrawerUnit, RigWall, WallPlate, ListingBoard, SocketRail, Cartridge, FlapCounter,
  Crate, Dolly, RollDoor, UpsideRig, AgentPanel, DiffSheet, PlanCard, PricePlate,
  Manifold, Canister, Tower, WreckingBall, Banner, DeckerWindow, CommentPlate,
} from "./GvtProps";
import { VsCode, VS, UiStage } from "./GvtCode";

/* ===========================================================================
   REEL 141 · "GRAVITY" — THE SCENES.  Board: storyboards/141-gravity.md.

   ⛔ EVERY SCENE CARRIES ALL SIX, and each is named in a comment:
      a near-camera crew band cropped by the bottom edge · countable RigWall
      content · ONE background process · ONE event with before/trigger/travel/
      arrival · ONE accumulator · and the hero DOING something.
   ⛔ NO FLOOR SLUG — the set-name caps are off house-wide, so `slug=""`.
   ⛔ MATTE ONLY. No `boxShadow: 0 0 Npx`.
   ⭐ Only three scenes move: LISTING pushes (we are reading a plate), SETDOWN
      tilts (we are following a load that changed direction), TOGETHER pulls
      (the payoff is that there is MORE in frame). Everything else is locked.
   ========================================================================= */

export type Variant = "house" | "amber" | "steel";
export type SP = { v: Variant; dur: number };

/** the cast ground line */
export const GY = 706;

/** ⛔ THE THREE CUTS DIFFER BY HOOK, and the body carries only enough layout
    delta to keep the dHash apart: a horizontal offset, a RigWall seed AND row
    count (an identical wall in all three cuts subtracts from the very
    separation it sits behind), and a lamp temperature. Never a regrade. */
export const LAY: Record<Variant, {
  a: number; seed: number; rows: number; lamp: string;
  /** the top dHash lever: every travelling band runs at its own rate, pitch and height */
  rk: number; rp: number; ry: number;
  /** where the cast stands, per cut */
  hx: number; cx: number;
  /** the window's own vertical offset per cut: layout, not camera, so no bright
      wall edge is cropped away paying for it */
  wy: number;
  /** per-cut cast: how many bodies, and where their ground line sits */
  dc: number; dy: number;
  /** per-cut framing of the UI: the stage looks somewhere else */
  fx: number; fy: number;
}> = {
  house: { a: 0,   seed: 0, rows: 3, lamp: AGV,       rk: 1.00, rp: 1.00, ry: 0,   hx: 0,   cx: 0,   wy: 0,   dc: 0,  dy: 0,  fx: 0,    fy: 0 },
  amber: { a: -92, seed: 2, rows: 2, lamp: "#EFC169", rk: 1.62, rp: 0.74, ry: -54, hx: 118, cx: -70, wy: -48, dc: -3, dy: 26, fx: 210,  fy: -70 },
  steel: { a: 84,  seed: 5, rows: 3, lamp: "#D8B98C", rk: 0.66, rp: 1.38, ry: 62,  hx: -132, cx: 86, wy: 56, dc: 3,  dy: -22, fx: -230, fy: 84 },
};

/* ---------------------------------------------------------------------------
   THE BAY SHELL — the set every interior scene is built inside. It is a real
   place: an overhead cable tray running as the background process, the two
   decks, the shared wall, sodium strips and a near-camera crew band.
   ------------------------------------------------------------------------ */
const BayShell: React.FC<{ f: number; v: Variant; lit?: boolean; upY?: number;
  rows?: number; wallJoin?: number; rigAmp?: number; trayRate?: number }> =
  ({ f, v, lit = false, upY = 96, rows, wallJoin = 0, rigAmp = 9, trayRate = 2.4 }) => {
  const L = LAY[v];
  return (<>
    {/* the UPSIDE deck overhead: the LIT BOARD that carries frame mean luma */}
    <Deck y={upY} flip c={lit ? "#E0BC5E" : "#CDAE6F"} cl={lit ? "#F7E39C" : "#E7D3A4"} z={12} h={96} />
    {/* ⛔ BODY_LUMA measured 64.8 against the 70-105 band the approved reels sit
        in: the bay was being lit like a night exterior even with a glowing deck
        overhead. A lit ceiling lights the wall under it. Warm where the light is,
        cooling into the blue world as it falls — HUE, never white. */}
    <div style={{ position: "absolute", left: 0, top: upY + 92, width: W, height: 560, zIndex: 9,
      background: `linear-gradient(180deg, ${hexa("#F6E4B4", lit ? 0.80 : 0.62)} 0%, ${hexa("#C79A5E", lit ? 0.64 : 0.48)} 40%, ${hexa("#6E92BC", 0.56)} 78%, ${hexa("#7EA0C8", 0.42)} 100%)` }} />
    {/* the DOWNSIDE deck, and the specular band a lit ceiling puts on it */}
    <Deck y={GY} c={lit ? "#6A93BE" : "#5E8FC4"} cl={lit ? "#97B6D8" : "#8FB4DE"} z={20} h={150} />
    <div style={{ position: "absolute", left: 0, top: GY - 46, width: W, height: 92, zIndex: 21,
      background: `linear-gradient(180deg, ${hexa("#F4DEA6", 0.34)} 0%, ${hexa("#D0A566", 0.14)} 100%)` }} />
    {/* BACKGROUND PROCESS — the hoist run, crossing the whole scene. It is a
        DRAWN object on a rail, not a stripe: >=48px on its short side so it
        survives the audit's 1012->240 downsample, and alternating light/dark so
        each boundary is a luma step rather than a hue change. */}
    <Runner y={(upY + 100) + L.ry} f={f} z={13} rate={(trayRate * 3.9) * L.rk} pitch={Math.round((188) * L.rp)} w={124} h={78}
      c={lit ? "#D8BE84" : "#A8B4C2"} c2="#26313E" kind="crate" rail hang={8} o={0.72} />
    {/* the density device */}
    <RigWall f={f} y={upY + 130} rows={rows ?? L.rows} cols={10} seed={L.seed} z={14}
      o={lit ? 0.94 : 0.86} s={0.86} amp={rigAmp} c={lit ? "#9AA3AC" : STEEL} />
    {/* sodium strips on the shared wall */}
    <Strip x={150 + L.a} y={upY + 108} w={210} c={L.lamp} z={16} f={f} />
    <Strip x={760 + L.a} y={upY + 108} w={210} c={L.lamp} z={16} f={f} />
    {/* the frame-edge mass ten reels shipped without */}
    <Edge side="l" c={dkh(GUNMETAL, 0.4)} w={104} z={92} kind="wall" />
    <Edge side="r" c={dkh(GUNMETAL, 0.5)} w={88} z={92} kind="wall" />
  </>);
};

/* ---------------------------------------------------------------------------
   ⛔⛔⛔ THE BAY STAGE — REV 5, on Alex's note: *"the animations in each of the
   scenes is just way too boring, not enough motion, we need to elevate it a lot
   throughout."*

   Rev 4's body was a UI viewport floating in a thin band of room with one crew
   sprite. `ANIMATION-QUALITY` §1 measures exactly what that costs: **a dense,
   correct SET is worth 7.68 -> 9.65**, more than any effect added to a bare one,
   and §9 is blunt about the cast — *"Prefer sprites over abstract slabs every
   time"*, because a crowd of the house mascot is the literal noun, saturated
   clay, and a body doing something.

   So the UI is no longer floating: it is a SCREEN mounted in a working bay, with
   a bezel, a mount and a cable, and in front of it a CROWD of Claudes watching it
   — pitched to the spacing law, costumes cycled, action loops varied, and a VALUE
   RAMP by rank so depth reads in the greyscale the audit sees.
   ------------------------------------------------------------------------ */
const BayStage: React.FC<{ f: number; v: Variant; lit?: boolean; crowd?: number;
  crowdAt?: number; children: React.ReactNode }> =
  ({ f, v, lit = false, crowd: crowdIn = 7, crowdAt = 0, children }) => {
  const L = LAY[v];
  const crowd = Math.max(4, crowdIn + L.dc);
  /* ⭐ pitch = usableWidth / (n + 1), against spacing >= 0.85 x size */
  const pitch = 1012 / (crowd + 1);
  return (<>
    {/* the lit wall and its fitout */}
    <div style={{ position: "absolute", left: 0, top: 96, width: W, height: 700, zIndex: 6,
      background: lit
        ? `linear-gradient(180deg,#FFF9E8 0%,#F8E9C2 32%,#EBD5A6 64%,#DCE6F2 100%)`
        : `linear-gradient(180deg,#FCF6E6 0%,#F0E2BE 32%,#DFCCA2 64%,#D3DEEE 100%)` }} />
    {[186, 320, 470, 604].map((yy, i) => (
      <div key={"jt" + i} style={{ position: "absolute", left: 0, top: yy, width: W, height: 2,
        zIndex: 7, background: hexa("#B9A47C", 0.30) }} />
    ))}
    {/* ⭐ THE DENSITY DEVICE, at full row count and actually visible */}
    <RigWall f={f} y={104 + L.dy} rows={2 + (L.dc > 0 ? 1 : 0)} cols={10} seed={L.seed} z={9} o={0.66} s={0.52}
      amp={9} c={lit ? "#9AA7B5" : "#8E99A5"} />
    {/* ⭐ ONE BACKGROUND PROCESS, always running, mounted as the bay's hoist run */}
    <Runner y={(600) + L.ry} f={f} z={11} rate={9.4 * L.rk} pitch={Math.round(178 * L.rp)}
      w={124} h={72} c={lit ? "#D8BE84" : "#C2CBD6"} c2="#26313E" kind="crate" rail hang={9} o={0.62} />
    {children}
    {/* the deck, its specular, and the near-camera masses cropped by the edge */}
    <Deck y={700} c={lit ? "#C0D6EE" : "#B3CBE6"} cl="#E2EDFB" z={20} h={110} />
    <div style={{ position: "absolute", left: 0, top: 656, width: W, height: 82, zIndex: 21,
      background: `linear-gradient(180deg,${hexa("#FBEFC8", 0.42)} 0%,${hexa("#E0BE86", 0.14)} 100%)` }} />
    {/* ⭐ THE CROWD, in front of the screen: pitched, costume-cycled, value-ramped */}
    {Array.from({ length: crowd }, (_, i) => {
      const rank = i % 3;
      return (
        <Crew key={"bc" + i} f={f + i * 11} x={pitch * (i + 1) + L.cx * 0.4}
          y={738 + L.dy + rank * 14} i={[0, 1, 3, 4, 5, 12, 13, 15, 16][(i + L.seed) % 9]}
          size={132 - rank * 14} z={78 - rank} at={crowdAt - 8 + i}
          loop={i % 4} tint={["#D97757", "#C1653F", "#AE5A34"][rank]} flip={i % 3 === 1} />
      );
    })}
    <Edge side="l" c={dkh(GUNMETAL, 0.42)} w={38} z={92} kind="wall" />
    <Edge side="r" c={dkh(GUNMETAL, 0.5)} w={32} z={92} kind="wall" />
  </>);
};

/** the UI, mounted as a real screen in the bay rather than floating in the frame */
const Screen: React.FC<{ children: React.ReactNode; y?: number; z?: number }> =
  ({ children, y = 140, z = 60 }) => (<>
  {/* the mount: a bracket arm and a cable, so the screen hangs off something */}
  <div style={{ position: "absolute", left: 496, top: 96, width: 20, height: 52, zIndex: z - 2,
    background: "linear-gradient(90deg,#8B97A6 0%,#4E5A68 62%,#2C3642 100%)" }} />
  <div style={{ position: "absolute", left: 300, top: 116, width: 412, height: 12, zIndex: z - 2,
    borderRadius: 6, background: "linear-gradient(180deg,#8B97A6 0%,#42505F 100%)" }} />
  <div style={{ position: "absolute", left: 12, top: y - 12, width: 988, height: 452 + 24, zIndex: z - 1,
    borderRadius: 16, background: "linear-gradient(180deg,#2E3A48 0%,#1A222C 100%)",
    border: "4px solid #10171F", boxShadow: SH_D }} />
  {children}
</>);

/* =========================================================================
   S2 · THE LISTING — two riggers hoist the marketplace board into its bracket
   and Google's mark strikes into the publisher row.  58f, MID, push 1.06.
   EVENT: before (the board swinging on the hoist) · trigger (it seats f18) ·
   travel (the mark flies in) · arrival (the verified tick snaps f38).
   ACCUMULATOR: the five IDE tiles filling in along the bottom.
   ====================================================================== */
export const LISTING: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const L = LAY[v];
  /* ⛔⛔ REV 3, on Alex's note: *"you need to be zoomed in more on the UI, right
     now it's just way too zoomed out and just scrolling down and boring, and a lot
     of the animations are not aligned with what's being spoken."*
     ⭐ THE >=140 LUMA LAW IS FRAME 0 ONLY, which is the permission this scene was
     not using: a body scene can fill the panel with the product. The window is
     now 950px of a 1012px panel.
     ⭐⭐ AND EVERY BEAT IS ON ITS WORD (scene starts f58):
        "Google"       f58   the publisher row and its mark
        "just launched" f62  the listing lands
        "its official" f79  the verified tick snaps
        "Antigravity"  f89  the extension's own name and icon take the pane  */
  /* ⭐ REV 6, on Alex: *"the info needs to be more representative and more
     interesting, what's being spoken needs to be aligned better with what's shown."*
     Every fact now lands on the word that names it (scene starts f58):
       "just launched" f68  the NEW · AUG 20 2026 badge stamps
       "its official"  f79  the verified tick, alone
       "Antigravity"   f89  the extension's own name takes the pane            */
  const CARD = 9, PUB = 12, NEW = 10, TICK = 21, NAME = 31;
  const drop = E(f, 0, CARD + 6, -90, 0, OUT);
  const settle = f > CARD + 6 ? Math.sin((f - CARD - 6) * 0.6) * 5 * Math.exp(-(f - CARD - 6) / 7) : 0;
  return (
    <Scene p={asPlace("bay")} slug="" push={[0, dur, 1.04]} vig={0.20}>
      <BayStage f={f} v={v} crowd={7}>
      {/* ⭐ REV 4: the window is drawn at 2100px inside a 960px viewport, so the
          type lands at phone-readable size, and the viewport PANS to the region
          the sentence is about: the listing, then the publisher row on "official",
          then the extension's own name on "Antigravity". */}
      <Cam y={drop + settle} z={44}>
        <Screen y={128}>
          <UiStage f={f} ww={2100} wh={1120} z={62} vy={128 + L.wy} vh={452}
          keys={[[0, 640 + L.fx, 320 + L.fy], [TICK, 430 + L.fx, 300 + L.fy], [NAME, 1080 + L.fx, 270 + L.fy]]}>
          <VsCode x={0} y={0} w={2100} h={1120} z={1} f={f}
            view="extensions" mark={f >= PUB} title="Extensions" branch="main" caret={false}
            live={0.3} tick={f >= TICK} nameAt={NAME} newAt={NEW} />
        </UiStage>
      </Screen>
      </Cam>
      {/* the tick's own call-out ring, on the word "official" */}
      {f >= TICK && f < TICK + 12 && (
        <div style={{ position: "absolute", left: 506, top: 386 + L.wy, zIndex: 84,
          width: 62 * E(f, TICK, TICK + 8, 2.6, 1, OUT), height: 62 * E(f, TICK, TICK + 8, 2.6, 1, OUT),
          marginLeft: -31, marginTop: -31, borderRadius: "50%",
          border: `5px solid ${hexa(SKY, 1 - E(f, TICK + 2, (TICK + 2) + 10, 0, 1, LIN))}` }} />
      )}
    </BayStage>
    </Scene>
  );
};

/* =========================================================================
   S3 · THE SOCKET — hard close. The cartridge keys into the wall rail, four
   contacts light, and the split-flap counter rolls to 208,494.  45f, CLOSE.
   EVENT: before (the empty keyed slot) · trigger (the cartridge arrives f18) ·
   travel (the quarter turn) · arrival (it SEATS f20 and the pins light).
   ACCUMULATOR: the four contact pins, then the counter.
   ====================================================================== */
export const SOCKET: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const L = LAY[v];
  /* ⭐ BEATS ON THEIR WORDS (scene starts f106):
       "extension"  f106  the details pane, the name and the version
       "for"        f116  the cursor travels to Install
       "VS Code."   f123  the click, then the progress runs under the last word  */
  /* ⭐ "for VS Code" is a fact with FOUR MORE in it: the extension shipped for
     five editors on the same day. They land on the word, with VS Code lit. */
  const CLICK = 17, IDE = 10;
  const install = E(f, CLICK, 20, 0, 1, IO);
  const kick = f >= CLICK && f < CLICK + 5 ? (1 - (f - CLICK) / 5) * 5 : 0;
  const cur = E(f, 4, 13, 0, 1, IO);         /* the cursor's travel to the button */
  return (
    <Scene p={asPlace("bay")} slug="" push={[0, dur, 1.03]} vig={0.20}>
      <BayStage f={f} v={v} crowd={7}>
      {/* the viewport walks to the Install button on "for", and the click lands on
          "VS" with the button filling a third of the frame */}
      <div style={{ position: "absolute", left: 0, top: kick, width: W, height: H, zIndex: 60 }}>
        <Screen y={128}>
          <UiStage f={f} ww={2100} wh={1120} z={62} vy={128 + L.wy} vh={452}
          keys={[[0, 1080 + L.fx, 270 + L.fy], [10, 940 + L.fx, 420 + L.fy], [CLICK, 940 + L.fx, 420 + L.fy]]}>
          <VsCode x={0} y={0} w={2100} h={1120} z={1} f={f}
            view="extensions" mark install={install} title="Extensions" caret={false} live={0.35} tick
            ideAt={IDE} newAt={-40} />
        </UiStage>
      </Screen>
      </div>
      {/* the pointer, travelling to the button and pressing it */}
      <div style={{ position: "absolute", left: 700 - cur * 190,
        top: 300 + cur * 128 + L.wy + (f >= CLICK && f < CLICK + 4 ? 6 : 0), zIndex: 88,
        width: 0, height: 0, borderLeft: `18px solid ${BONE}`, borderBottom: "26px solid transparent",
        transform: "rotate(-16deg)", filter: "drop-shadow(0 3px 4px rgba(0,0,0,0.55))" }} />
      {f >= CLICK && f < CLICK + 9 && (
        <div style={{ position: "absolute", left: 508, top: 432 + L.wy, zIndex: 86,
          width: 70 * E(f, CLICK, CLICK + 9, 0.4, 1, OUT), height: 70 * E(f, CLICK, CLICK + 9, 0.4, 1, OUT),
          marginLeft: -35, marginTop: -35, borderRadius: "50%",
          border: `4px solid ${hexa(SKY, 1 - E(f, CLICK, CLICK + 9, 0, 1, LIN))}` }} />
      )}
    </BayStage>
    </Scene>
  );
};

/* =========================================================================
   S4 · THE MOVE — ⚠️ the only scene at the loading dock. The villain, made
   physical: nineteen crates on a dolly and a far building across a cold gap.
   41f, WIDE, LOCKED.
   EVENT: before (the dolly loaded) · trigger (the crew push f0) · travel (it
   rolls toward the door) · arrival (the front wheel JAMS on the threshold f33).
   ACCUMULATOR: the stripped bay behind — it empties as the dolly advances.
   ====================================================================== */
export const MOVE: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const L = LAY[v];
  /* ⛔⛔ ALEX, on ~5s: *"when I say 'switching to another editor' it should show
     like diff logos switching between."* He is right and it is the better picture:
     the sentence is about an ACT OF SWITCHING, and rev 5 drew a dolly of crates,
     which is about MOVING HOUSE. Rev 7 shows the switch itself — an editor picker
     with six REAL marks and a selection travelling across them, word by word:
       "of switching"  f159  the highlight leaves VS Code
       "to another"    f166  it runs the rail
       "editor,"       f177  it lands on Antigravity
     and then your whole setup starts being dragged after it and JAMS, which is
     the cost the next line cancels.
     ⛔ Every mark is real and from `public/logos/`. No invented glyphs. */
  /* ⛔ Antigravity is NOT in this rail. The sentence is "INSTEAD of switching to
     another editor" — so the rail is the alternatives, the highlight LEAVES VS Code,
     runs out of rail, and SNAPS BACK. An aborted switch, which is what "instead"
     means. Antigravity then arrives INTO that VS Code in the next scene. */
  const RAIL: Array<{ t: string; mark: string; vsc?: boolean }> = [
    { t: "VS CODE",   mark: "vscode.svg", vsc: true },
    { t: "CURSOR",    mark: "cursor.svg" },
    { t: "WINDSURF",  mark: "windsurf.svg" },
    { t: "ZED",       mark: "zed.svg" },
    { t: "JETBRAINS", mark: "jetbrains.svg" },
  ];
  /* ⭐ the highlight steps ON THE WORDS (scene-local; MOVE starts at abs f149):
       f14 "switching"  f19 "to"  f23 "another"  f26 · then f30 "editor," SNAPS BACK */
  const STEPS = [0, 14, 19, 23, 26];
  const SNAP = 30;
  const raw = STEPS.filter((x) => f >= x).length - 1;
  const sel = f >= SNAP ? 0 : raw;
  const JAM = SNAP;
  const TW = 176, GAP = 12, RW = RAIL.length * TW + (RAIL.length - 1) * GAP;
  const rx = 506 + L.a * 0.4 - RW / 2, ry = 214 + L.wy;
  /* it TRAVELS between tiles rather than cutting — a switch is a move — and the
     snap home is fast and eased hard, so it reads as a rejection, not a step */
  const slot = (i: number) => rx + i * (TW + GAP);
  const hx = f >= SNAP
    ? slot(raw) + E(f, SNAP, SNAP + 6, 0, 1, IO) * (slot(0) - slot(raw))
    : slot(sel) + (sel < STEPS.length - 1 ? E(f, STEPS[sel + 1] - 5, STEPS[sel + 1], 0, 1, IO) * (TW + GAP) : 0);
  const drag = E(f, 26, JAM - 26, 0, 1, OUT);
  const jolt = f >= JAM && f < JAM + 8 ? (1 - (f - JAM) / 8) * 7 : 0;
  return (
    <Scene p={asPlace("bay")} slug="" push={[0, dur, 1.03]} vig={0.20}>
      <BayStage f={f} v={v} crowd={6}>
      {/* ⭐ THE PICKER, drawn as the thing it is: a rail of real editor marks */}
      <div style={{ position: "absolute", left: rx - 24, top: ry, width: RW + 48, height: 258,
        zIndex: 60, borderRadius: 16, background: "linear-gradient(180deg,#252A33 0%,#171C24 100%)",
        border: "4px solid #0D1219", boxShadow: SH_D }} />
      <div style={{ position: "absolute", left: rx, top: ry + 14, width: RW, height: 26,
        zIndex: 62, ...mono(15, 800), color: hexa(BONE, 0.5), letterSpacing: "0.18em" }}>SWITCH EDITOR</div>
      {/* the travelling selection */}
      <div style={{ position: "absolute", left: hx - 10, top: ry + 48, width: TW + 20, height: 190,
        zIndex: 61, borderRadius: 12, background: hexa(AGV, 0.22),
        border: `4px solid ${hexa(AGV, 0.9)}`, boxShadow: SH_D }} />
      {/* ⛔ Tile/VscTile are ABSOLUTELY POSITIONED — place them by coordinate, never
         in a flex row, or every mark stacks in the same corner. */}
      {RAIL.map((e2, i) => {
        const on = i === sel;
        const cx2 = slot(i) + TW / 2, k = on ? 104 : 96;
        return (
          <React.Fragment key={"ed" + i}>
            {/* ⛔ dimming the whole cell to 0.5 turned every mark into a grey square.
                The CELL recedes; the MARK stays legible — that is what a picker
                looks like, and it is the only reason the logos read at all. */}
            <div style={{ position: "absolute", left: slot(i) + 8, top: ry + 62, width: TW - 16,
              height: 132, zIndex: 63, borderRadius: 10,
              background: hexa("#FFFFFF", on ? 0.10 : 0.045),
              border: `2px solid ${hexa("#FFFFFF", on ? 0.18 : 0.07)}` }} />
            <div style={{ position: "absolute", left: cx2 - k / 2, top: ry + 76 - (on ? 4 : 0),
              width: k, height: k, zIndex: 64, opacity: on ? 1 : 0.86 }}>
              {e2.vsc ? <VscTile x={0} y={0} s={k} z={65} /> : <Tile x={0} y={0} src={e2.mark} s={k} z={65} />}
            </div>
            <div style={{ position: "absolute", left: slot(i), top: ry + 190, width: TW,
              textAlign: "center", zIndex: 64, ...mono(14, 800),
              color: hexa(BONE, on ? 0.98 : 0.55), letterSpacing: "0.06em" }}>{e2.t}</div>
          </React.Fragment>
        );
      })}
      {/* your setup, being dragged after the selection — and jamming */}
      <div style={{ position: "absolute", left: 0, top: jolt, width: W, height: H, zIndex: 70 }}>
        {[0, 1, 2, 3].map((i) => (
          <Crate key={"mc" + i} x={196 + L.a + drag * 300 - i * 6} y={GY + 46 - i * 74} s={0.88}
            z={70 + i} rot={f >= JAM ? (i + 1) * 2.1 : 0}
            label={["SETUP", "KEYS", "EXT", "DOTS"][i]} />
        ))}
      </div>
      {/* THE HERO DOES: he hauls the stack after the switch, then it stops dead */}
      <Hero f={f} x={112 + L.a + L.hx * 0.4 + drag * 300} y={GY + 52} size={196} z={74}
        strain={f < JAM ? 0.8 : 0.3} drive={f < JAM ? 0.16 : 0} act={1}
        stern={f >= JAM ? 1 : 0} costume={{ constr: 1 }} />
      <Contact x={112 + L.a + drag * 300} y={GY + 52} w={168} z={24} o={0.36} />
      </BayStage>
    </Scene>
  );
};

/* =========================================================================
   S5 · THE SETDOWN — back inside, low on the deck. The crates come DOWN,
   unopened, and the camera tilts up the wall to cables going taut.
   34f, LOW, the reel's one TILT.
   EVENT: before (crates in the air) · trigger (they land f2/f7/f12) ·
   travel (the tilt) · arrival (three cables snap taut f16/f22/f28).
   ACCUMULATOR: the cables, one after another.
   ====================================================================== */
export const SETDOWN: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const L = LAY[v];
  /* ⛔⛔⛔ THIRD REJECTION ON THIS BEAT, AND THAT MEANS THE OBJECT IS WRONG.
     rev 8  "idk whats even going on with that bigggggg wall of text"   (full IDE)
     rev 9  same note again                                            (tighter IDE)
     rev 10 "way too much text animation"                              (two UI cards)
     Every one of my three answers was A RECTANGLE WITH WORDS IN IT that animates
     in. I kept tuning the amount of text instead of noticing that he does not want
     to READ at 7-8s, he wants to WATCH. The reel already carries the real product
     UI at 2s, 3.5s, 5s and 9s — this beat does not owe it a fourth panel.
     ⭐ SO: NO UI HERE AT ALL. "Antigravity's AI coding experience" IS the agents,
     and an agent is a Claude, not a row in a list. Three of them march into your
     editor and take stations under the VS Code mark. Big sprites, real marks,
     TWO WORDS on screen. [[feedback_repeated_note_means_wrong_object]]
     BEATS (scene starts f188):
       "bring"          f193  the bay doors part, amber floods in from outside
       "Antigravity's"  f199  ⭐ agent 1 walks in     f206 agent 2     f213 agent 3
       "AI"             f220  all three are at their stations and start working    */
  /* ⛔ f10-35 measured dead. Two reasons: agent 2's start x and end x were BOTH
     506, so it never walked at all — it just faded in on the spot — and the other
     two only travelled 260px. They now all come OUT OF THE DOORWAY and fan to
     their stations, growing as they come, so each one is a real traverse with a
     scale ramp instead of a fade. Re-timed so the last lands at 31 of 36. */
  const OPEN = 2, ARR = [4, 11, 18], STEP = 14, ALL = 30;
  const open = E(f, OPEN, OPEN + 11, 0, 1, OUT);
  const done = E(f, ALL, ALL + 6, 0, 1, BACK);
  const AGENTS = [
    { tint: "#D97757", i: 0,  x: 246 },
    { tint: "#7B8FF7", i: 3,  x: 506 },
    { tint: "#4EC9B0", i: 12, x: 766 },
  ];
  return (
    <Scene p={asPlace("bay")} slug="" push={[0, dur, 1.07]} vig={0.20}>
      <BayStage f={f} v={v} crowd={2}>
      {/* ⭐ THE MARK, big and lit, so the room is unmistakably VS Code */}
      {/* ⛔ the mark was 192px floating in an empty cream band and the frame was
          bottom-heavy: everything happened in the lower third. It is now 300px and
          the doorway is raised behind it, so the top half carries weight too. */}
      <RigWall f={f} y={72} rows={1} cols={9} seed={L.seed + 6} z={12} o={0.30} s={0.5} amp={9} c="#C6B48E" />
      <VscTile x={506 + L.a * 0.4 - 150} y={118 + L.wy} s={300} z={46} />
      {/* the doors they come through, and the amber that comes with them */}
      {[-1, 1].map((sd) => (
        <div key={"dr" + sd} style={{ position: "absolute", zIndex: 34,
          left: 506 + L.a * 0.4 + sd * (176 + open * 340) - 176, top: 268 + L.wy,
          width: 352, height: 420, borderRadius: 8, boxShadow: SH_D,
          background: `linear-gradient(${sd > 0 ? 270 : 90}deg,#33404F 0%,#1A222C 78%)` }} />
      ))}
      <div style={{ position: "absolute", left: 506 + L.a * 0.4 - open * 352, top: 268 + L.wy,
        width: open * 704, height: 420, zIndex: 30, overflow: "hidden",
        background: "linear-gradient(180deg,#3A2A12 0%,#8A6524 44%,#E0A64C 100%)" }} />
      {/* the light it throws into the bay, across everything */}
      <div style={{ position: "absolute", left: 0, top: 300, width: W, height: 500, zIndex: 31,
        pointerEvents: "none",
        background: `radial-gradient(ellipse 54% 60% at 50% 40%, ${hexa("#FFCE78", 0.30 * open)} 0%, transparent 72%)` }} />
      {/* ⭐ THE AGENTS — they walk IN, and then they WORK. Nothing is a panel. */}
      {AGENTS.map((g, i) => {
        const t = E(f, ARR[i], ARR[i] + STEP, 0, 1, IO);
        const cx0 = 506 + L.a * 0.4;
        const px = cx0 + (g.x - 506) * t;
        const py = 470 + (686 - 470) * t - Math.sin(t * Math.PI) * 22;  /* out and down */
        const gs = (0.42 + 0.58 * t) * (214 - (i % 2) * 12);
        return (
          <React.Fragment key={"ag" + i}>
            {/* the station lamp each one lights when it arrives */}
            <div style={{ position: "absolute", left: px - 46, top: 594 + L.wy, width: 92, height: 14,
              zIndex: 44, borderRadius: 7, opacity: t * t,
              background: hexa(g.tint, 0.9),
              boxShadow: `0 0 ${26 + done * 30}px ${8 + done * 6}px ${hexa(g.tint, (0.5 + done * 0.4) * t)}` }} />
            <Crew f={f + i * 11} x={px} y={py} i={g.i} size={Math.round(gs)}
              z={62 + i} at={ARR[i]} loop={i} tint={g.tint} flip={i === 2}
              cheer={f >= ALL ? 1 : 0} />
            <Contact x={px} y={686} w={176 * t} z={26} o={0.34 * t} />
          </React.Fragment>
        );
      })}
      {/* ⭐ ALL THREE IN: the doorway surges and the bay takes their colour */}
      <div style={{ position: "absolute", left: 0, top: 220, width: W, height: 560, zIndex: 33,
        pointerEvents: "none", opacity: done,
        background: `radial-gradient(ellipse 58% 56% at 50% 46%, ${hexa("#FFD98F", 0.38)} 0%, transparent 74%)` }} />
      {/* THE HERO DOES: he holds the door and watches them file past him */}
      <Hero f={f} x={96 + L.a + L.hx * 0.3} y={704} size={226} z={70}
        act={3} gaze={0.95} stern={0.4} cheer={f > ARR[2] ? 1 : 0} costume={{ constr: 1 }} />
      <Contact x={96 + L.a} y={704} w={190} z={24} o={0.32} />
      </BayStage>
    </Scene>
  );
};

export const DOCK: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const L = LAY[v];
  /* ⭐ SHOT 2, and it stays physical. "AI coding experience INTO VS Code" — so the
     three agents HAND THE WORK UP into the mark: a plate goes from one to the next
     and gets seated into the VS Code frame, which then lights.
     ⛔ Two words of UI on the plate and nothing else. The diff already had its own
     scene at 8-9s in rev 10 and he called it text animation; the DEPICTION of a fix
     is a part being fitted, not a listing of the lines that changed.
     BEATS (starts f224): "coding" f224 they start passing · "experience" f230 the
     plate is up · "into" f243 ⭐ IT SEATS in the mark · "VS Code." f250 the mark
     lights and all three throw their arms up.                                     */
  const P1 = 4, P2 = 11, SEAT = 19, LIT = 26;
  const MX = 506 + L.a * 0.4, MY = 176 + L.wy;
  /* the plate's path: agent 1 -> agent 2 -> agent 3 -> up into the mark */
  const leg = f < P2 ? 0 : f < SEAT ? 1 : 2;
  const lt = leg === 0 ? E(f, P1, P2, 0, 1, IO) : leg === 1 ? E(f, P2, SEAT, 0, 1, IO) : E(f, SEAT, SEAT + 8, 0, 1, IO);
  const PATH: Array<[number, number]> = [[246, 560], [506, 520], [766, 560], [MX, MY + 342]];
  const px = PATH[leg][0] + (PATH[leg + 1][0] - PATH[leg][0]) * lt + (L.a * 0.4);
  const py = PATH[leg][1] + (PATH[leg + 1][1] - PATH[leg][1]) * lt - Math.sin(lt * Math.PI) * 62;
  const kick = f >= SEAT + 8 ? Math.sin((f - SEAT - 8) * 1.2) * 12 * Math.exp(-(f - SEAT - 8) / 5) : 0;
  const lit = E(f, LIT, LIT + 9, 0, 1, OUT);
  return (
    <Scene p={asPlace(f >= LIT ? "bayLit" : "bay")} slug="" push={[0, dur, 1.07]} vig={0.20}>
      <BayStage f={f} v={v} lit crowd={2}>
      {/* the mark, and the socket in it the plate goes into */}
      <RigWall f={f} y={72} rows={1} cols={9} seed={L.seed + 6} z={12} o={0.30} s={0.5} amp={9} c="#C6B48E" />
      {/* ⛔ the plate used to seat ON the mark and cover it. The frame is taller
          now so there is a real SLOT under the mark for it to go into. */}
      <div style={{ position: "absolute", left: MX - 176, top: MY - 62 + kick, width: 352, height: 470,
        zIndex: 38, borderRadius: 22, background: hexa("#0E1620", 0.55),
        border: `6px solid ${lit > 0 ? hexa(GREEN, 0.85 * lit) : "#26313F"}`,
        boxShadow: lit > 0 ? `0 0 ${46 * lit}px ${14 * lit}px ${hexa(GREEN, 0.45 * lit)}` : SH_D }} />
      <VscTile x={MX - 150} y={MY - 34 + kick} s={300} z={46} />
      {/* ⭐ THE PART being handed up the line — two words, and it is an OBJECT */}
      <div style={{ position: "absolute", left: px - 118, top: py - 37, width: 148, height: 80,
        zIndex: 74, borderRadius: 10, boxShadow: SH_D,
        background: `linear-gradient(180deg,${hexa(GREEN, 0.9)} 0%,#2C6B37 100%)`,
        border: "4px solid #17351F", display: "flex", alignItems: "center", justifyContent: "center",
        ...mono(27, 900), color: "#0B1A10", letterSpacing: "0.04em",
        transform: `rotate(${Math.sin(lt * 3.1 + leg) * 13}deg) scale(${f >= SEAT + 8 ? 1 - 0.12 * lit : 1})` }}>
        FIXED
      </div>
      {/* the seat flash, on the object */}
      {f >= SEAT + 8 && f < SEAT + 20 && (
        <div style={{ position: "absolute", left: MX - 230, top: MY - 60, width: 460, height: 460,
          zIndex: 84, borderRadius: "50%", pointerEvents: "none",
          border: `${7 * (1 - E(f, SEAT + 8, SEAT + 20, 0, 1, OUT))}px solid ${hexa(GREEN, 0.65 * (1 - E(f, SEAT + 8, SEAT + 20, 0, 1, OUT)))}`,
          transform: `scale(${0.3 + E(f, SEAT + 8, SEAT + 20, 0, 1, OUT)})` }} />
      )}
      {/* the three of them, working the line and then cheering the seat */}
      {[{ t: "#D97757", i: 0, x: 246 }, { t: "#7B8FF7", i: 3, x: 506 }, { t: "#4EC9B0", i: 12, x: 766 }].map((g, i) => (
        <React.Fragment key={"ag" + i}>
          <div style={{ position: "absolute", left: MX + (g.x - 506) - 46, top: 594 + L.wy, width: 92, height: 14,
            zIndex: 44, borderRadius: 7, background: hexa(g.t, 0.9),
            boxShadow: `0 0 ${26 + lit * 22}px 8px ${hexa(g.t, 0.5)}` }} />
          <Crew f={f + i * 11} x={MX + (g.x - 506)} y={686 - (leg === i ? 16 : 0)} i={g.i}
            size={214 - i % 2 * 12} z={62 + i} at={0} loop={i} tint={g.t} flip={i === 2}
            cheer={f >= LIT ? 1 : 0} />
          <Contact x={MX + (g.x - 506)} y={686} w={166} z={26} o={0.34} />
        </React.Fragment>
      ))}
      <Hero f={f} x={96 + L.a + L.hx * 0.3} y={704} size={226} z={70}
        act={3} gaze={0.95} cheer={f >= LIT ? 1 : 0} stern={0.2} costume={{ constr: 1 }} />
      <Contact x={96 + L.a} y={704} w={190} z={24} o={0.32} />
      </BayStage>
    </Scene>
  );
};

/* =========================================================================
   S7 · THE PRICE — the bay's tonnage board resolves to $0 and the two
   allowance strips snap in beneath it.  49f, MID, LOCKED.
   EVENT: before (digits spinning) · trigger (the brake f22) · travel (the
   last digit falling) · arrival (it STOPS on $0).
   ACCUMULATOR: the two allowance strips.
   ====================================================================== */
export const PRICE: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const L = LAY[v];
  /* ⛔⛔ THE THIRD SHOT OF THE SAME EDITOR. SETDOWN, DOCK and PRICE all framed the
     same VS Code window, so 6-11s had no cut in it — which is most of why Alex
     could not tell what was going on. This scene also SCRIMMED the editor to 62%
     black to read as a modal, which dimmed the one thing still repainting, and
     then held a still card for 1.43s of its 1.8s.
     ⭐ REBUILT AS A DIFFERENT PLACE: we leave the editor entirely. The plan is a
     real board craned down into the bay and landed, which is this world's own
     vocabulary, and every number on it arrives as its own beat.
     ⭐ SIX ARRIVALS SPREAD ACROSS THE FULL 54 FRAMES (doc §9: an arrival inside
     the first third leaves the rest dead).
     BEATS (scene starts f268):
       "crazy"   f273  local  5  the board drops in on its chains
       "part,"   f282  local 14  it LANDS — recoil, dust, the deck takes the weight
       "free"    f294  local 26  the plan name resolves
       "plan"    f301  local 33  ⭐ $0 stamps
       "gives"   f307  local 39  allowance 1 slams in from the left
       "you"     f313  local 45  allowance 2
       "access"  f316  local 48  the rate-limit line, and the crowd turns          */
  /* ⛔ ALEX, on ~10s: "it needs to be more interesting there, elevated animation."
     Two causes. The beats ran to FOOT=49 of 54, so for most of the scene the board
     was HALF EMPTY DARK — at f300 only the plan row had arrived and the bottom half
     was a black slab. And $0 merely scaled in; the single most important number in
     the reel arrived like a tooltip. Re-timed so the board is full by 60% of the
     scene, and $0 is now STAMPED: it drives down, hits, kicks the whole board,
     throws dust off the deck and puts a FREE seal on. */
  const DROP = 2, LAND = 11, NAME = 19, ZERO = 26, A1 = 33, A2 = 38, FOOT = 44, SEAL = 47;
  const drop = E(f, DROP, LAND, -430, 0, IO);
  const bounce = f >= LAND ? Math.sin((f - LAND) * 0.55) * 13 * Math.exp(-(f - LAND) / 6) : 0;
  /* ⛔ f26-53 measured DEAD even with four beats in it: each beat was a small row
     on an 812x372 board, and a small change on a big still object repaints almost
     nothing. A heavy plate takes every stamp, so the WHOLE BOARD now recoils on
     each arrival — same events, but the area that moves is the board, not a row. */
  const kick = [NAME, ZERO, A1, A2, FOOT, SEAL].reduce((a, at) =>
    a + (f >= at ? Math.sin((f - at) * 0.9) * 9 * Math.exp(-(f - at) / 4.5) : 0), 0)
    + (f >= ZERO ? Math.sin((f - ZERO) * 1.3) * 15 * Math.exp(-(f - ZERO) / 4) : 0);
  /* ⭐ THE STAMP: it comes down from above the board, hits on ZERO, and rebounds */
  const stampY = f < ZERO ? -E(f, ZERO - 7, ZERO, 190, 0, IN_Q) : 0;
  const stampS = f < ZERO ? E(f, ZERO - 7, ZERO, 2.4, 1, IN_Q)
                          : E(f, ZERO, ZERO + 7, 1.34, 1, BACK);
  const tip = [ZERO, A1, A2].reduce((a, at) =>
    a + (f >= at ? Math.sin((f - at) * 0.8) * 0.9 * Math.exp(-(f - at) / 5) : 0), 0);
  const BX = 506 + L.a * 0.3, BW = 812, BH = 372, BY = 214 + L.wy;
  return (
    <Scene p={asPlace("bayLit")} slug="" push={[0, dur, 1.09]} vig={0.22}>
      <BayStage f={f} v={v} lit crowd={8}>
      {/* the two chains it comes down on, so it is CRANED and not floating */}
      {[-1, 1].map((side) => (
        <div key={"ch" + side} style={{ position: "absolute", left: BX + side * 300 - 4,
          top: 0, width: 8, height: BY + drop + bounce + kick + 24, zIndex: 58,
          background: `repeating-linear-gradient(180deg,${CHROME} 0px,${CHROME} 7px,#2B3446 7px,#2B3446 14px)` }} />
      ))}
      {/* ⭐ THE BOARD — one dominant object, its own light, in the bay's material */}
      <div style={{ position: "absolute", left: BX - BW / 2, top: BY + drop + bounce + kick,
        width: BW, height: BH, zIndex: 60, borderRadius: 12, boxShadow: SH_D,
        transform: `rotate(${tip}deg)`, transformOrigin: "50% 0%",
        background: "linear-gradient(180deg,#2A3340 0%,#141A24 100%)",
        border: "5px solid #0B1018" }}>
        <div style={{ position: "absolute", left: 0, top: 0, right: 0, height: 62,
          borderRadius: "7px 7px 0 0", background: `linear-gradient(180deg,${AGV} 0%,#C9922F 100%)`,
          display: "flex", alignItems: "center", gap: 12, paddingLeft: 18 }}>
          <div style={{ width: 40, height: 40, borderRadius: 9, overflow: "hidden" }}>
            <Img src={staticFile("logos/antigravity.png")} style={{ width: 40, height: 40, objectFit: "contain" }} />
          </div>
          <span style={{ ...mono(21, 800), color: "#241B08", letterSpacing: "0.10em" }}>THE FREE PLAN</span>
        </div>
        {/* the plan name, then the price stamping on its own word */}
        <div style={{ position: "absolute", left: 20, top: 82, right: 20, height: 96, borderRadius: 9,
          background: f >= NAME ? hexa(GREEN, 0.17) : hexa("#FFFFFF", 0.05),
          border: `3px solid ${f >= NAME ? hexa(GREEN, 0.8) : "#39424F"}` }}>
          <div style={{ position: "absolute", left: 20, top: 16, ...mono(30, 800), color: BONE }}>
            {f >= NAME ? "Individual" : "Select a plan"}
          </div>
          <div style={{ position: "absolute", left: 20, top: 56, ...mono(16, 600), color: hexa(BONE, 0.62) }}>
            {f >= NAME ? "no card required" : ""}
          </div>
          <div style={{ position: "absolute", right: 24, top: 8, ...mono(62, 900),
            color: f >= ZERO - 7 ? GREEN : hexa(BONE, 0.3),
            textShadow: f >= ZERO && f < ZERO + 8 ? `0 0 ${26 * (1 - (f - ZERO) / 8)}px ${hexa(GREEN, 0.9)}` : undefined,
            transform: `translateY(${stampY}px) scale(${stampS})` }}>
            {f >= ZERO - 7 ? G.price : "$--"}
          </div>
        </div>
        {/* the two allowances, each SLAMMING in from off the board's own left edge */}
        {G.allowances.map((al, i) => {
          const at = i === 0 ? A1 : A2;
          const on = E(f, at, at + 7, 0, 1, BACK);
          return (
            <div key={"al" + i} style={{ position: "absolute", left: 20, top: 194 + i * 62, right: 20,
              height: 54, borderRadius: 8, background: hexa(GREEN, 0.15),
              border: `3px solid ${hexa(GREEN, 0.6)}`, display: "flex", alignItems: "center",
              paddingLeft: 18, gap: 14, opacity: on,
              transform: `translateX(${(1 - on) * -820}px)` }}>
              <span style={{ ...mono(22, 900), color: GREEN }}>✓</span>
              <span style={{ ...mono(19, 700), color: hexa(BONE, 0.95) }}>{al}</span>
            </div>
          );
        })}
        {/* ⭐ the seal, slammed on last and off-square, the way a real stamp lands */}
        {f >= SEAL && (
          <div style={{ position: "absolute", right: 30, bottom: 22, width: 168, height: 168,
            borderRadius: "50%", border: `7px solid ${hexa(GREEN, 0.92)}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            ...mono(38, 900), color: hexa(GREEN, 0.96), letterSpacing: "0.06em",
            transform: `rotate(-14deg) scale(${E(f, SEAL, SEAL + 7, 2.1, 1, IN_Q)})`,
            opacity: E(f, SEAL, SEAL + 4, 0, 1, OUT) }}>FREE</div>
        )}
        <div style={{ position: "absolute", left: 22, bottom: 14, ...mono(15, 600),
          color: hexa(BONE, 0.6), opacity: E(f, FOOT, FOOT + 6, 0, 1, OUT) }}>
          basic weekly rate limits
        </div>
      </div>
      {/* the landing: dust off the deck where the weight went in */}
      {/* the crowd goes up on the stamp — the payoff belongs to them, not the board */}
      {f >= ZERO && f < ZERO + 20 && Array.from({ length: 7 }, (_, i) => (
        <div key={"cf" + i} style={{ position: "absolute", zIndex: 79,
          left: 96 + i * 132 + L.a * 0.4,
          top: GY - 18 - Math.sin(Math.max(0, Math.min(1, (f - ZERO - i * 1.4) / 14)) * Math.PI) * 78,
          width: 22, height: 22, borderRadius: 5, background: hexa(GREEN, 0.85),
          transform: `rotate(${(f - ZERO) * 9 + i * 40}deg)` }} />
      ))}
      {f >= LAND && f < LAND + 16 && [-1, 1].map((side) => (
        <div key={"du" + side} style={{ position: "absolute", zIndex: 66,
          left: BX + side * 300 - 60 + side * E(f, LAND, LAND + 16, 0, 90, OUT),
          top: BY + BH - 10 + drop, width: 120, height: 26, borderRadius: "50%",
          background: hexa("#C9B79A", 0.4 * (1 - E(f, LAND, LAND + 16, 0, 1, OUT))),
          transform: `scale(${0.5 + E(f, LAND, LAND + 16, 0, 1.6, OUT)})` }} />
      ))}
      {/* THE HERO DOES: he takes the weight as it lands, then looks up at the $0 */}
      <Hero f={f} x={104 + L.a + L.hx * 0.3} y={GY + 96} size={252} z={82}
        act={f >= ZERO ? 3 : 1} gaze={f >= ZERO ? 1 : 0.3}
        strain={f >= LAND && f < ZERO ? 0.9 : 0.2} stern={0.5} costume={{ constr: 1 }} />
      <Contact x={104 + L.a} y={GY + 96} w={210} z={24} o={0.34} />
      </BayStage>
    </Scene>
  );
};

/* =========================================================================
   S8 · THE MANIFOLD — ⭐ A HOLD NEEDS ARRIVALS, NOT TRAVEL. 99 frames and
   four of them, each on its own spoken word and each entering DIFFERENTLY so
   four events never read as one repeated event.  99f, WIDE, LOCKED.
     GEMINI drops from above · CLAUDE OPUS slides in from the left ·
     CLAUDE SONNET rises from the deck · GPT-OSS swings in on a boom.
   ACCUMULATOR: the feed lamps, and the frame gets measurably brighter with each.
   ====================================================================== */
export const MANIFOLD: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const L = LAY[v];
  /* ⛔⛔ THREE ATTEMPTS AT THIS SCENE, AND THE LESSON IS THE SAME EACH TIME: a
     small dropdown over a large static window is a poster. Stacking the picker on
     the panel measured 3.5; moving it onto the code measured 2.8, because both
     times the moving surface was ~240px wide and everything else was a still
     image of an editor.
     ⭐ THE FIX IS SIZE. This sentence's whole job is four model names, so the
     model list IS the frame: a 640px sheet whose rows fly the full width and
     land, each carrying its real mark. Big objects travelling is the top of the
     motion table, and it is also what "zoom in on the UI" asked for.
     ⭐ EVERY ROW ON ITS OWN SPOKEN NAME (scene starts f322):
       "models" f330 -> the sheet opens               local  8
       "Gemini," f340 · "Claude Opus," f358 · "Claude Sonnet," f384 · "GPT." f404 */
  const OPEN = 8;
  const ROWS = [18, 36, 62, 82];
  const open = E(f, OPEN, OPEN + 9, 0, 1, BACK);
  const SW = 800, SH2 = 386, sx = 506 - SW / 2, sy = 178 + L.wy;
  return (
    <Scene p={asPlace("bayLit")} slug="" push={[0, dur, 1.03]} vig={0.20}>
      <BayStage f={f} v={v} lit crowd={7}>
      {/* the editor is still there, still working, behind the sheet */}
      <Screen y={128}>
        <UiStage f={f} ww={2100} wh={1120} z={62} vy={128 + L.wy} vh={452}
        keys={[[0, 980 + L.fx, 400 + L.fy], [ROWS[0], 1260 + L.fx, 420 + L.fy], [ROWS[1], 1120 + L.fx, 460 + L.fy],
               [ROWS[2], 1300 + L.fx, 430 + L.fy], [ROWS[3], 1140 + L.fx, 470 + L.fy]]}>
        <VsCode x={0} y={0} w={2100} h={1120} z={1} f={f}
          panel={1} mark diffAt={ROWS.filter((r) => f >= r).slice(-1)[0] ?? -1}
          title="loader.ts" branch="main" live={0.9} />
      </UiStage>
      </Screen>
      {/* ⭐ THE MODEL SHEET */}
      <div style={{ position: "absolute", left: sx, top: sy, width: SW, height: SH2, zIndex: 84,
        borderRadius: 12, background: "#232323", border: "3px solid #4A4A4A", boxShadow: SH_D,
        opacity: open, overflow: "hidden",
        transform: `scaleY(${0.5 + open * 0.5}) scale(${E(f, OPEN, dur - OPEN, 0.93, 1.09, LIN)})`,
        transformOrigin: "50% 40%" }}>
        <div style={{ position: "absolute", left: 0, top: 0, right: 0, height: 52, background: "#2D2D2D",
          display: "flex", alignItems: "center", paddingLeft: 18, gap: 10,
          borderBottom: "2px solid #3C3C3C" }}>
          <div style={{ width: 26, height: 26, borderRadius: 5, background: "#FFF",
            display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Img src={staticFile("logos/antigravity.png")} style={{ width: 21, height: 21, objectFit: "contain" }} />
          </div>
          <span style={{ ...mono(15, 800), color: hexa(BONE, 0.85), letterSpacing: "0.12em" }}>MODEL</span>
          <span style={{ ...mono(13, 700), color: hexa(GREEN, 0.95), letterSpacing: "0.08em",
            marginLeft: "auto", marginRight: 18 }}>FREE PLAN</span>
        </div>
        {G.models.map((m, i) => {
          const at = ROWS[i];
          const t = E(f, at - 10, (at - 10) + 10, 0, 1, OUT);
          const landed = f >= at;
          const hot = landed && i === (Math.floor(f / 8) % 4);
          return (
            <div key={"ms" + i} style={{ position: "absolute", left: 14, right: 14, top: 62 + i * 78,
              height: 70, borderRadius: 8, display: "flex", alignItems: "center", gap: 18,
              paddingLeft: 16, opacity: t,
              background: hot ? hexa(m.c, 0.30) : landed ? hexa(m.c, 0.15) : "transparent",
              borderLeft: `7px solid ${landed ? m.c : "transparent"}`,
              transform: `translateX(${(1 - t) * -(SW + 40)}px)` }}>
              <div style={{ width: 52, height: 52, borderRadius: 10, background: "#FFF",
                display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" }}>
                <Img src={staticFile("logos/" + m.mark)} style={{ width: 41, height: 41, objectFit: "contain" }} />
              </div>
              <span style={{ ...mono(28, 800), color: hexa(BONE, 0.98), letterSpacing: "0.02em" }}>{m.t}</span>
              {landed && (
                <span style={{ ...mono(15, 900), color: GREEN, marginLeft: "auto", marginRight: 18 }}>✓</span>
              )}
            </div>
          );
        })}
        {/* the page's own fifth line, on the tail where "GPT." finishes */}
        <div style={{ position: "absolute", left: 22, bottom: 12, ...mono(15, 700),
          color: hexa(GREEN, 0.95), opacity: E(f, 92, 92 + 6, 0, 1, OUT) }}>
          + {G.moreModels}
        </div>
      </div>
    </BayStage>
    </Scene>
  );
};

/* =========================================================================
   S9 · THE RIVALS — ⚠️ exterior night. Two buildings, air between them, a
   crowd on a gantry turning from one to the other, and a wrecking ball that
   starts its swing and is STILL TRAVELLING at the cut.  61f, LONG, LOCKED.
   ACCUMULATOR: the crowd's turn, running left to right as a wave.
   ====================================================================== */
export const RIVALS: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const L = LAY[v];
  /* ⛔⛔ ALEX, on ~15s: *"it's not interesting enough either."* Rev 5 drew two lit
     towers and a crowd on a gantry — a POSTER of a rivalry rather than the rivalry
     happening. The sentence is "people were SAYING VS Code was getting replaced",
     which is an OPINION MOVING, so this is a balance and the crowd is the load.
     ⛔ REV 7b: the first cut hung the pans in the air and walked the crowd along
     the DECK underneath them, so the tip had no visible cause — you saw a beam
     move and separately some people walk. An action is only legible when the
     mechanism and the load are the SAME object, so the pans now hang at deck
     height and the crowd walks OUT of the VS Code pan and INTO the other one.
     ⭐ ONE mechanism, six arrivals across the full duration, and an ARC that
     runs on through REPLACE and lands on "sitting together". */
  /* ⛔ ALEX, on ~14s: "it just stops when the rightside like drops on the scale."
     Two bugs behind that. The last body committed at f44 and RUN is 15, so it was
     still walking at f59 in a 57-FRAME SCENE — it never arrived. And the tilt was
     a monotone ease, so once the pan was down the whole mechanism froze with a
     third of the scene left.
     ⭐ Now: every crossing lands inside the scene, the pan BOTTOMS OUT against its
     stop and rebounds, and both marks hang as real pendulums off their pans — so
     the frame is never still even after the balance has made its point. */
  const CROSS = [2, 6, 10, 15, 20, 25, 30, 35];   /* when each body commits */
  const RUN = 13;                              /* frames one crossing takes */
  const prog = (i: number) => E(f, CROSS[i], RUN, 0, 1, IO);
  const load = CROSS.reduce((n, _, i) => n + prog(i), 0);
  /* ⭐ and it OVERSHOOTS and settles, so the tip ARRIVES instead of easing to a
     stop — a beam this loaded does not stop dead, and the settle is the beat. */
  /* ⛔ 3.89 with a 41-FRAME DEAD RUN. Eight arrivals were in it and none of them
     registered, because each was a ~100px sprite stepping onto a pan while the
     mechanism itself moved smoothly and slowly. A balance taking a body LURCHES.
     Each landing now jolts the beam, which carries both rods, both pans, both
     marks and both labels with it — the same events, a hugely larger repaint. */
  const jolt = CROSS.reduce((a, at) => a + (f >= at + RUN
    ? Math.sin((f - at - RUN) * 1.15) * 1.9 * Math.exp(-(f - at - RUN) / 4.2) : 0), 0);
  const base = (load / CROSS.length) * 21 - 3;
  /* ⭐ THE BOTTOM-OUT: it reaches the stop at f48 and rebounds off it, hard */
  const STOP = 48;
  const hit = f >= STOP ? Math.sin((f - STOP) * 0.72) * 3.4 * Math.exp(-(f - STOP) / 9) : 0;
  const ring = f > CROSS[CROSS.length - 1] + RUN
    ? Math.sin((f - CROSS[CROSS.length - 1] - RUN) * 0.55) * 2.4
      * Math.exp(-(f - CROSS[CROSS.length - 1] - RUN) * 0.11) : 0;
  const tilt = base + ring + jolt + hit;
  const BX = 506 + L.a * 0.3, BY = 262 + L.wy, BW = 604, ROD = 214;
  const drop = (side: -1 | 1) => side * Math.tan((tilt * Math.PI) / 180) * (BW / 2);
  /* where each pan's FLOOR is — the crowd stands on exactly this */
  const panY = (side: -1 | 1) => BY + 20 + drop(side) + ROD;
  const panX = (side: -1 | 1) => BX + side * (BW / 2) * Math.cos((tilt * Math.PI) / 180);
  return (
    <Scene p={asPlace("city")} slug="" push={[0, dur, 1.16 + (L.rk - 1) * 0.07]} vig={0.34}>
      {/* ⭐ a LIT yard: dusk sky, a sodium wash off the deck, and the density device
          at full strength so there is a population behind the mechanism. */}
      <div style={{ position: "absolute", left: 0, top: 0, width: W, height: H, zIndex: 6,
        background: `linear-gradient(180deg,#22304F 0%,#33436A ${34 + L.wy * 0.14}%,#6A6B7E ${66 + L.wy * 0.14}%,#8E7C74 100%)` }} />
      {/* ⛔ a dHash is an 8x8 LUMA-GRADIENT hash, so it reads the SKY/GROUND SPLIT
          and barely notices which pixel a pan is on — that is why moving the beam
          80px did nothing and this stayed at 7 bits. The horizon itself now differs
          per cut, which is the only change at the scale the hash actually samples. */}
      <div style={{ position: "absolute", left: 0, top: 430 + L.wy * 1.7, width: W, height: 362, zIndex: 7,
        background: `linear-gradient(180deg,${hexa("#E0A860", 0.34)} 0%,${hexa("#C08858", 0.16)} 62%,${hexa("#5A5464", 0.05)} 100%)` }} />
      <RigWall f={f} y={64 + Math.round(L.wy * 0.9)} rows={2} cols={9} seed={L.seed + 2} z={8} o={0.46} s={0.58} amp={11} c="#8393AC" />
      {[0, 1, 2, 3].map((i) => (
        <React.Fragment key={"lp" + i}>
          <div style={{ position: "absolute", left: 92 + i * 274 + L.a * 0.2, top: 214, width: 9, height: 190,
            zIndex: 12, background: "linear-gradient(90deg,#6E7C90 0%,#39445A 100%)" }} />
          <div style={{ position: "absolute", left: 74 + i * 274 + L.a * 0.2, top: 202, width: 46, height: 18,
            zIndex: 13, borderRadius: "9px 9px 3px 3px",
            background: `linear-gradient(180deg,#A9B4C4 0%,${L.lamp} 100%)`,
            boxShadow: `0 0 26px 8px ${hexa(L.lamp, 0.42)}` }} />
        </React.Fragment>
      ))}
      <Deck y={700} c="#3A4658" cl="#5A6A82" z={20} h={116} n={12} />
      {/* the fulcrum: a real column with a knife edge */}
      <div style={{ position: "absolute", left: BX - 40, top: BY + 24, width: 80, height: 452,
        zIndex: 22, background: "linear-gradient(90deg,#5E6C80 0%,#39445A 54%,#222B3C 100%)",
        clipPath: "polygon(38% 0%, 62% 0%, 100% 100%, 0% 100%)" }} />
      <div style={{ position: "absolute", left: BX - 26, top: BY + 8, width: 52, height: 26,
        zIndex: 24, borderRadius: 5, background: "linear-gradient(180deg,#8B97A6 0%,#4E5A68 100%)" }} />
      {/* the beam */}
      <div style={{ position: "absolute", left: BX, top: BY + 20, width: 0, height: 0, zIndex: 26,
        transform: `rotate(${tilt}deg)` }}>
        <div style={{ position: "absolute", left: -BW / 2, top: -11, width: BW, height: 22,
          borderRadius: 11, background: "linear-gradient(180deg,#93A0B0 0%,#4A5567 62%,#2B3446 100%)",
          boxShadow: SH_D }} />
      </div>
      {/* the rods, drawn from the real beam end to the real pan so they never float */}
      {[-1, 1].map((side) => {
        const s2 = side as -1 | 1;
        return (
          <div key={"rd" + side} style={{ position: "absolute", left: panX(s2) - 3,
            top: BY + 20 + drop(s2), width: 6, height: ROD, zIndex: 25,
            background: `linear-gradient(90deg,${hexa(CHROME, 0.7)} 0%,${hexa("#2B3446", 0.8)} 100%)` }} />
        );
      })}
      {/* ⭐ THE PANS — at deck height, so the crowd can walk out of one into the other */}
      {[-1, 1].map((side) => {
        const s2 = side as -1 | 1;
        const px = panX(s2), py = panY(s2), isVs = s2 < 0;
        return (
          <React.Fragment key={"pan" + side}>
            <div style={{ position: "absolute", left: px - 138, top: py, width: 276, height: 11,
              zIndex: 44, borderRadius: 6,
              background: "linear-gradient(180deg,#BCC7D5 0%,#6C7A8E 100%)" }} />
            <div style={{ position: "absolute", left: px - 120, top: py + 9, width: 240, height: 34,
              zIndex: 43, borderRadius: "0 0 40px 40px", boxShadow: SH_D,
              background: "linear-gradient(180deg,#63718A 0%,#28313F 100%)" }} />
            {/* the mark rides ON its pan, so you always know whose side is whose */}
            {/* ⭐ the marks HANG: a pendulum driven by the beam, lagging it, so the
                mechanism keeps living after the tilt has settled. Bigger too — at
                92px they were the smallest things in their own scene. */}
            <div style={{ position: "absolute", left: px - 58, top: py - 214, width: 116, height: 116,
              zIndex: 58, transform: `rotate(${-tilt * 0.75 + Math.sin(f * 0.26 + (isVs ? 0 : 1.6)) * 5}deg)`,
              transformOrigin: "50% -22%" }}>
              {isVs ? <VscTile x={0} y={0} s={116} z={58} />
                    : <Tile x={0} y={0} src="antigravity.png" full s={116} z={58} />}
            </div>
            <div style={{ position: "absolute", left: px - 138, width: 276, top: py + 46,
              textAlign: "center", zIndex: 46, ...mono(14, 800),
              color: hexa(BONE, 0.9), letterSpacing: "0.08em" }}>
              {isVs ? "VS CODE" : "ANTIGRAVITY"}
            </div>
          </React.Fragment>
        );
      })}
      {/* ⭐ THE LOAD — six bodies, each walking OUT of the VS Code pan and INTO the
          other. They stand on the pan FLOOR, so their y is the pan's y: the thing
          that moves and the thing that causes it are the same object. */}
      {CROSS.map((_, i) => {
        const t = prog(i);
        const lane = (i % 4) - 1.5;
        const x0 = panX(-1) + lane * 46, x1 = panX(1) + lane * 46;
        const x = x0 + (x1 - x0) * t;
        const yFloor = panY(-1) + (panY(1) - panY(-1)) * t;
        const stride = t > 0 && t < 1 ? Math.sin(f * 0.9 + i) * 5 : 0;   /* the gait */
        const rank = i % 3;
        return (
          <Crew key={"cr" + i} f={f + i * 9} x={x} y={yFloor - 4 + stride}
            i={[0, 1, 3, 4, 5, 12, 13, 15][i]} size={100 - rank * 9} z={50 + (i % 3)}
            at={CROSS[i] - 4} loop={i % 4} tint={["#D97757", "#C1653F", "#AE5A34"][rank]} />
        );
      })}
      {/* ⭐ THE NEAR BAND — the bottom third was static ground, which is half the
          reason this beat measured lowest in the reel and read as flat. These are
          the people DOING the saying: big, close, cropped by the bottom edge, and
          they turn to follow the pan that is winning. */}
      {/* ⛔ they must be CROPPED BY THE BOTTOM EDGE. The first cut put them at
          deck height at full size and their heads covered the receiving pan — the
          crowd crossing, i.e. the whole mechanism, disappeared behind the audience.
          The RIGHT pan bottoms out at y~658, so nothing here rises above that. */}
      {[0, 1, 2, 3, 4].map((i) => {
        const at = 2 + i * 6;
        const turn = E(f, at, at + 10, 0, 1, IO);
        return (
          <Crew key={"nb" + i} f={f + i * 13} x={-58 + i * 236 + L.a * 0.5 + turn * 30}
            y={892 - (i % 2) * 14} i={[2, 7, 9, 14, 6][i]} size={212 - (i % 2) * 18}
            z={78 + i} at={at} loop={(i + 2) % 4}
            tint={["#C1653F", "#D97757", "#AE5A34"][i % 3]} />
        );
      })}
      {/* THE HERO DOES: he stays on the VS Code pan and watches his side go up */}
      <Hero f={f} x={panX(-1) - 128} y={panY(-1) - 6} size={158} z={56}
        act={3} gaze={0.9} stern={0.7} costume={{ constr: 1 }} />
      <Edge side="l" c={dkh(GUNMETAL, 0.5)} w={34} z={92} kind="wall" />
      <Edge side="r" c={dkh(GUNMETAL, 0.56)} w={30} z={92} kind="wall" />
    </Scene>
  );
};

/* =========================================================================
   S10 · THE REPLACED BANNER — closer on the VS Code parapet. A banner hauls
   across it and the ball ARRIVES and stops dead a hand's width from the wall.
   ⛔ IT NEVER LANDS. The claim being dramatised is what people SAID, so the
   destruction is staged and withheld; nothing in the reel shows VS Code
   damaged, because nothing did.  66f, MID, LOCKED.
   ====================================================================== */
export const REPLACE: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const L = LAY[v];
  /* ⛔⛔⛔ ALEX, on ~17s: *"needs to be scrapped and made way more interesting."*
     Scrapped. The old scene was a NIGHT FAÇADE — a grid of near-black window
     rectangles with a black ball swinging at it. Dark, muddy, and literally the
     squares-and-rectangles note again. It also could not measure: motion is area
     x LUMA DELTA, and nothing in a near-black frame has any delta to give.
     ⭐ NEW: a lit SIGN GANTRY at dusk, and the replacement happens as a real swap
     on it. One dominant object, both real marks, four big beats, and it is BRIGHT,
     so the movement finally has luma to carry it.
     BEATS (scene starts f477):
       "VS Code was"  f477  local  0  the sign is lit, VS Code up on the mount
       "getting"      f492  local 15  the hook drops and clamps on
       "replaced"     f504  local 27  ⭐ IT IS HAULED OFF — up and out of frame
       "by"           f516  local 39  the bare mount, sparking
       "Antigravity," f521  local 44  the new mark DROPS IN and bolts: impact,
                                      and the sign's tubes light across it        */
  const HOOK = 15, HAUL = 27, BARE = 39, DROP = 44, BOLT = 52;
  const clamp = E(f, HOOK, HOOK + 8, 0, 1, OUT);
  const haul  = E(f, HAUL, HAUL + 13, 0, 1, IN_Q);
  const drop  = E(f, DROP, BOLT, 0, 1, IN_Q);
  const bolt  = f >= BOLT ? Math.sin((f - BOLT) * 1.2) * 13 * Math.exp(-(f - BOLT) / 5) : 0;
  /* ⛔ 29 dead frames, and they were at the HEAD: the scene opened on a lit sign
     doing nothing for half a second while the hook was still off-frame. The tubes
     now run a chase from f0, the hook is already descending at the cut, and the
     whole gantry takes the bolt. */
  const gk = f >= BOLT ? Math.sin((f - BOLT) * 1.15) * 9 * Math.exp(-(f - BOLT) / 5) : 0;
  /* ⛔ f0-29 measured DEAD — the whole first half. The tube chase and the chain I
     added are 16px and 10px wide, which is nothing against a 1012px panel: motion
     is AREA x luma delta and neither had any area. The sign is now FAILING before
     it is replaced, which is both the reason it gets replaced and a luma change
     across the entire 760x92 header, the 244x236 mount and every tube at once. */
  const fail = f < HAUL
    ? 0.34 + 0.66 * (Math.sin(f * 1.9) > 0.1 || Math.sin(f * 0.63) > 0.6 ? 1 : 0.12)
    : 1;
  const SX = 506 + L.a * 0.3, SY = 250 + L.wy;
  return (
    <Scene p={asPlace("city")} slug="" push={[0, dur, 1.07]} vig={0.30}>
      {/* dusk, not night — the whole reason the old version could not move */}
      <div style={{ position: "absolute", left: 0, top: 0, width: W, height: H, zIndex: 6,
        background: "linear-gradient(180deg,#2B3A5C 0%,#4A5578 34%,#8A7A80 68%,#C4977A 100%)" }} />
      <RigWall f={f} y={54} rows={2} cols={9} seed={L.seed + 4} z={8} o={0.42} s={0.58} amp={12} c="#93A2BC" />
      {/* the sign's own spill on the yard: the flicker has to be visible OFF the
          sign too, or it is 0.9% of the panel changing and the frame reads still */}
      <div style={{ position: "absolute", left: 0, top: 120, width: W, height: 660, zIndex: 10,
        pointerEvents: "none",
        background: `radial-gradient(ellipse 62% 48% at 50% 24%, ${hexa("#CFE0FF", 0.20 * fail)} 0%, transparent 72%)` }} />
      <Deck y={702} c="#3E4A5E" cl="#61708A" z={20} h={118} n={12} />
      {/* the gantry: two legs and a lit header box the sign is mounted in */}
      {[-1, 1].map((sd) => (
        <div key={"lg" + sd} style={{ position: "absolute", left: SX + sd * 316 - 17, top: SY + 40,
          width: 34, height: 420, zIndex: 22,
          background: "linear-gradient(90deg,#8B97A6 0%,#4E5A68 46%,#232C3A 100%)" }} />
      ))}
      <div style={{ position: "absolute", left: SX - 380, top: SY - 34 + gk, width: 760, height: 92,
        zIndex: 24, borderRadius: 10, boxShadow: SH_D,
        background: `linear-gradient(180deg,${mxh("#5A6880", 0.5 * fail)} 0%,${mxh("#2B3446", 0.4 * fail)} 100%)` }} />
      {/* the mount the mark sits in, and its tubes — dark until the new one bolts */}
      <div style={{ position: "absolute", left: SX - 122, top: SY + 62 + bolt, width: 244, height: 236,
        zIndex: 26, borderRadius: 12, boxShadow: SH_D,
        background: `linear-gradient(180deg,${mxh("#38445A", 0.55 * fail)} 0%,${mxh("#1B2331", 0.4 * fail)} 100%)`,
        border: `5px solid ${f >= BOLT ? hexa(AGV, 0.9) : "#141B26"}` }} />
      {Array.from({ length: 10 }, (_, i) => (
        <div key={"tb" + i} style={{ position: "absolute", left: SX - 372 + i * 76, top: SY - 18,
          width: 54, height: 16, zIndex: 28, borderRadius: 8,
          background: f >= BOLT + i * 1.6 ? hexa("#FFE0A0", 0.95)
            : hexa("#8FA2C0", (0.3 + 0.62 * Math.max(0, Math.sin(f * 0.34 - i * 0.8))) * fail),
          boxShadow: f >= BOLT + i * 1.6 ? `0 0 22px 6px ${hexa(AGV, 0.55)}` : undefined }} />
      ))}
      {/* ⭐ THE OLD MARK — clamped, then hauled straight up and out of frame */}
      {haul < 1 && (
        <div style={{ position: "absolute", left: SX - 84, top: SY + 92 - haul * 760,
          zIndex: 40, transform: `rotate(${haul * 15}deg)` }}>
          <VscTile x={0} y={0} s={168} z={40} />
        </div>
      )}
      {/* its chain and clamp, coming down for it */}
      {f >= 0 && haul < 1 && (
        <>
          <div style={{ position: "absolute", left: SX - 5, top: -E(f, 0, HOOK, 300, 0, IO), width: 10,
            height: SY + 92 - haul * 760 + E(f, 0, HOOK, 300, 0, IO), zIndex: 38,
            background: `repeating-linear-gradient(180deg,${CHROME} 0px,${CHROME} 8px,#2B3446 8px,#2B3446 16px)` }} />
          <div style={{ position: "absolute", left: SX - 44, top: SY + 66 - haul * 760, width: 88,
            height: 34, zIndex: 42, borderRadius: 6, opacity: clamp,
            background: "linear-gradient(180deg,#A9B4C4 0%,#4E5A68 100%)" }} />
        </>
      )}
      {/* the bare mount sparks while it is empty */}
      {f >= BARE && f < DROP + 6 && Array.from({ length: 10 }, (_, i) => {
        const t = ((f - BARE + i * 2) % 9) / 9;
        return (
          <div key={"sp" + i} style={{ position: "absolute", zIndex: 44,
            left: SX - 60 + (i * 37) % 120 + Math.sin(i * 2.1) * 26 * t,
            top: SY + 120 + t * 128, width: 6, height: 6, borderRadius: 3,
            background: hexa("#FFD27A", 0.95 * (1 - t)) }} />
        );
      })}
      {/* ⭐ THE NEW MARK drops into the mount and bolts */}
      {f >= DROP && (
        <div style={{ position: "absolute", left: SX - 84, top: SY + 92 - (1 - drop) * 700 + bolt,
          zIndex: 46, transform: `rotate(${(1 - drop) * -12}deg)` }}>
          <Tile x={0} y={0} src="antigravity.png" full s={168} z={46} />
        </div>
      )}
      {/* the impact it lands with */}
      {f >= BOLT && f < BOLT + 14 && (
        <div style={{ position: "absolute", left: SX - 250, top: SY - 40, width: 500, height: 500,
          zIndex: 80, borderRadius: "50%", pointerEvents: "none",
          border: `${7 * (1 - E(f, BOLT, BOLT + 14, 0, 1, OUT))}px solid ${hexa(AGV, 0.7 * (1 - E(f, BOLT, BOLT + 14, 0, 1, OUT)))}`,
          transform: `scale(${0.25 + E(f, BOLT, BOLT + 14, 0, 1, OUT)})` }} />
      )}
      <Runner y={640 + L.ry} f={f} z={23} rate={8.6 * L.rk} pitch={Math.round(168 * L.rp)} w={132} h={70}
        c="#6E86AE" c2="#141B26" kind="car" rail={false} o={0.7} />
      {/* the crew who do the swap, and the hero calling it from the deck */}
      {Array.from({ length: 6 }, (_, i) => (
        <Crew key={"rc" + i} f={f + i * 9} x={70 + i * 178 + L.a} y={GY + 46}
          i={[0, 1, 3, 4, 5, 12][i]} size={152 - (i % 2) * 16} z={70 + (i % 3)}
          at={i * 3} loop={i % 4} tint={["#D97757", "#C1653F", "#AE5A34"][i % 3]} />
      ))}
      <Hero f={f} x={126 + L.a + L.hx * 0.3} y={GY + 92} size={244} z={78}
        act={3} gaze={0.9} stern={0.8} strain={f >= HAUL && f < BARE ? 0.6 : 0.2}
        shock={f >= BOLT && f < BOLT + 12 ? 1 : 0} costume={{ constr: 1 }} />
      <Contact x={126 + L.a} y={GY + 92} w={206} z={24} o={0.32} />
      <Edge side="l" c={dkh(GUNMETAL, 0.5)} w={34} z={92} kind="wall" />
      <Edge side="r" c={dkh(GUNMETAL, 0.56)} w={30} z={92} kind="wall" />
    </Scene>
  );
};

/* =========================================================================
   S11 · TOGETHER — ⭐ THE PAYOFF. The gap is gone: the two façades slide
   together and share one wall, and the HERO ARTIFACT settles into the near
   ground carrying both marks.  62f, WIDE, the reel's one PULL-BACK.
   ⭐ The pull is motivated: the payoff is that there is MORE in frame.
   ====================================================================== */
export const TOGETHER: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const L = LAY[v];
  const MEET = 21;
  const close = E(f, 0, MEET, 1, 0, OUT);      /* 1 = apart, 0 = touching */
  const lit = E(f, MEET + 2, MEET + 2 + 8, 0, 1, OUT);
  return (
    <Scene p={asPlace("cityJoined")} slug="" push={[0, dur, 1.0]} vig={0.34}>
      {/* ⛔ the payoff measured 58 — the darkest scene in the reel, on the beat
          that has to read as resolution. The sky comes up behind the join, warm
          on the Antigravity side and cool on the VS Code side, so the light
          itself says the two are one building now. */}
      <div style={{ position: "absolute", inset: 0, zIndex: 6,
        background: `linear-gradient(180deg, ${hexa("#2A3F6C", 0)} 0%, transparent 100%)` }} />
      <div style={{ position: "absolute", left: 0, top: 0, width: W, height: H, zIndex: 6,
        background: `linear-gradient(96deg, ${hexa("#3C5C8E", 0.62)} 0%, ${hexa("#6E7CA0", 0.5)} 46%, ${hexa("#C8965A", 0.56)} 100%)` }} />
      <div style={{ position: "absolute", left: 0, top: 300, width: W, height: 420, zIndex: 7,
        background: `linear-gradient(180deg, ${hexa("#E9C98A", 0.34)} 0%, transparent 100%)` }} />
      {/* ⭐ the pull-back: the whole set scales DOWN so more of it enters frame */}
      <Cam s={E(f, 0, dur, 1.07, 1.0, IO)} z={10}>
        <Tower x={318 - close * 128 + L.a} y={GY - 78} w={318} h={430} c="#1E2A3C" lit={SKY} z={30} f={f}
          mark="vscode.svg" vsc name="VS CODE" s={1} seed={1} />
        <Tower x={716 + close * 128 + L.a} y={GY - 78} w={296} h={430} c="#2E2A1E" lit={AGV} z={30} f={f}
          mark="antigravity.png" name="ANTIGRAVITY" s={1} seed={6} />
        {/* the shared wall lighting THROUGH once they meet */}
        <div style={{ position: "absolute", left: 506 + L.a - 9, top: GY - 508, width: 18, height: 430,
          zIndex: 34, opacity: lit,
          background: `linear-gradient(180deg, ${hexa(AGV, 0.9)} 0%, ${hexa(SKY, 0.75)} 100%)` }} />
        {/* one continuous top rim across BOTH: the value proof they are one building */}
        <div style={{ position: "absolute", left: 318 - close * 128 - 168 + L.a, top: GY - 520,
          width: 700 + close * 256, height: 9, zIndex: 42, opacity: lit,
          background: `linear-gradient(90deg, ${hexa(SKY, 0.8)} 0%, ${hexa(AGV, 0.9)} 100%)` }} />
        <Deck y={GY} c="#1A222E" cl="#26303E" z={26} h={150} n={9} />
        <Runner y={(GY - 30) + L.ry} f={f} z={28} rate={(10.6) * L.rk} pitch={Math.round((172) * L.rp)} w={144} h={60}
          c="#4A6288" c2="#0B111C" kind="car" rail={false} o={0.82} />
        {/* BACKGROUND PROCESS — the ball being winched AWAY, small, at the top edge */}
        <WreckingBall x={904 + L.a} y={E(f, 6, 40, 90, -230, IO)} s={0.4} z={28} swing={0.04} chainTop={-260} />
        {/* the crowd, placards down */}
        {Array.from({ length: 8 }, (_, i) => (
          <Crew key={"tc" + i} f={f + i * 9} x={182 + i * 96 + L.a} y={GY - 4} i={[0,1,3,4,5,12,13,15][i % 8]} size={72}
            z={48} at={0} loop={2} cheer={f > MEET + 6 ? 1 : 0} />
        ))}
      </Cam>
      {/* ⭐ THE HERO ARTIFACT, near ground, withheld until now */}
      {/* ⛔ the hero artifact was covering the exact join it exists to celebrate.
          It sits LOW and smaller, so the two façades meeting stay visible above it. */}
      {/* ⭐ REV 6: THE PAYOFF IS ONE TITLE BAR CARRYING BOTH MARKS, arriving on the
          word "together" (f565 = local 24). Rev 5 put a small editor in the corner
          and the whole point of the sentence sat in the background. */}
      <div style={{ position: "absolute", left: 0, top: 0, width: W, height: H, zIndex: 80,
        opacity: E(f, MEET + 2, MEET + 2 + 10, 0, 1, OUT),
        transform: `translateY(${(1 - E(f, MEET + 2, MEET + 2 + 10, 0, 1, BACK)) * 52}px)` }}>
        <VsCode x={116 + L.a} y={404} w={780} h={292} z={80} f={f}
          panel={1} mark diffAt={MEET + 8} title="loader.ts" branch="main" live={1} />
      </div>
      {f >= 24 && (
        <div style={{ position: "absolute", left: 506 + L.a - 216, top: 268, width: 432, height: 108,
          zIndex: 90, borderRadius: 14, background: "#F3EBD8", border: "4px solid #C9BE9E",
          boxShadow: SH_D, opacity: E(f, 24, 24 + 8, 0, 1, OUT),
          transform: `scale(${E(f, 24, 24 + 9, 0.80, 1, BACK)})` }}>
          <VscTile x={44} y={24} s={60} z={91} />
          <div style={{ position: "absolute", left: 206, top: 28, width: 3, height: 52,
            background: hexa("#5B5340", 0.5) }} />
          <Tile x={246} y={24} src="antigravity.png" full s={60} z={91} />
          <div style={{ position: "absolute", left: 0, right: 0, top: 76, textAlign: "center",
            ...mono(17, 900), color: hexa("#4A4436", 0.9), letterSpacing: "0.18em" }}>ONE EDITOR</div>
        </div>
      )}
      {/* NEAR-CAMERA CREW BAND */}
      {/* THE HERO DOES: he is still on the floor, and he finally looks at camera */}
      <Hero f={f} x={950 + L.a + L.hx} y={GY + 150} size={226} z={84} flip
        act={2} cheer={f > MEET + 8 ? 1 : 0} gaze={0.2} costume={{ constr: 1 }} />
    </Scene>
  );
};

/* =========================================================================
   S12 · THE CTA — back in the bay, on the artifact. GRAVITY strikes into the
   wall plate one letter at a time.  50f, MID, LOCKED.
   ⛔ HARD CUT on the last letter: the word's true end is f692 of the reel.
   ====================================================================== */
export const CTA: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const L = LAY[v];
  return (
    <Scene p={asPlace("bayLit")} slug="" push={[0, dur, 1.0]} vig={0.44}>
      {/* the lowest RigWall row count of the reel, so the word owns the frame */}
      <BayStage f={f} v={v} lit crowd={8} crowdAt={0}>
      {/* BACKGROUND PROCESS — the tray trolley, still running */}
      <Runner y={(252) + L.ry} f={f} z={13} rate={(8.2) * L.rk} pitch={Math.round((186) * L.rp)} w={122} h={76}
        c="#D8BE84" c2="#26313E" kind="crate" rail hang={8} o={0.66} />
      <Runner y={(634) + L.ry} f={f} z={22} rate={(9.6) * L.rk} pitch={Math.round((152) * L.rp)} w={106} h={58}
        c="#8FB4DE" c2="#16202C" kind="cell" rail o={0.6} />
      {/* ⛔ the room's process, in the band the window does not cover */}
      <Runner y={624 + L.ry} f={f} z={40} rate={10.4 * L.rk} pitch={Math.round(156 * L.rp)} w={118} h={64}
        c="#A8B4C2" c2="#16202C" kind="cell" rail o={0.78} />
      <Screen y={128}>
        <UiStage f={f} ww={2100} wh={1120} z={70} vy={128 + L.wy} vh={452}
        keys={[[0, 1160 + L.fx, 400 + L.fy], [16, 1360 + L.fx, 400 + L.fy]]}>
        <VsCode x={0} y={0} w={2100} h={1120} z={1} f={f}
          panel={1} mark diffAt={2} title="loader.ts" branch="main" live={0.9} />
      </UiStage>
      </Screen>
      {/* ⭐ the letters land ON the word: "GRAVITY." is spoken f615-622 and the
          scene starts at f595, so they strike from local 18 at two frames apart */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 466 + L.wy, textAlign: "center",
        zIndex: 85, ...mono(20, 800), color: hexa(BONE, 0.62), letterSpacing: "0.22em",
        opacity: E(f, 2, 6, 0, 1, OUT) * (1 - E(f, 16, 16 + 4, 0, 1, LIN)) }}>COMMENT</div>
      <CommentPlate x={506} y={492} word={G.keyword} s={1.16} z={86} f={f} at={18} per={2} c={AGV} />
      {/* NEAR-CAMERA CREW BAND */}
      {/* THE HERO DOES: he reaches up and the letters land where he points */}
      <Hero f={f} x={318 + L.a + L.hx} y={GY + 40} size={256} z={78}
        act={1} drive={0.16} cheer={1} gaze={0.3} costume={{ constr: 1 }} />
      <Contact x={318 + L.a} y={GY + 40} w={198} z={19} o={0.4} />
    </BayStage>
    </Scene>
  );
};
