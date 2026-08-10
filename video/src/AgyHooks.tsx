import React from "react";
import { AbsoluteFill, useCurrentFrame, Img, staticFile } from "remotion";
import { fraunces } from "./fonts";
import { Panel, hexA, MONO } from "./SlopKit";
import {
  Surface, WORLDS, World, Occluder, Cone, StreetLamp, Claudie, CLAY, Slug, Contact,
  E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, W, H,
} from "./AgyWorld";

/* =========================================================================
   REEL 94 "AGENCY" · THE THREE ALTERNATE OPENS, for IG trial reels.

   ⛔ [[feedback_trial_reel_variants]]: *"it can't be too similar since Instagram
      is starting to flag."* A variant is NOT a re-render. The hook is where most
      of the signal is, so each of these is a different WORLD, a different HERO
      PROP, a different ACTION and a different EXIT — never a restyle of the
      shutter.

   Shared with variant A, deliberately, because these are house law and not
   variation surface:
     · three hard-cut shots, camera LOCKED in each          (docs/THE-OPEN.md)
     · frame 0 BRIGHT, SETTLED, and with a Claude in it
     · the official Claude mark large and early — Alex: "signal more to our
       target audience that this video is for them"
     · every person is the SlopKit Mascot, and every one is the SAME house clay

   The mechanisms, one per cut, all different from A's REVEAL BY REMOVAL:
     B  THE QUEUE   · DEPTH + a travelling ignition  (a line ranks by nearness)
     C  THE COACH   · ARRIVAL   (the object ENTERS frame instead of leaving it)
     D  THE SHADOW  · SCALE COLLAPSE (the promise on the wall becomes real)
   ========================================================================= */

/** the same shell the body uses, minus the slug — hooks carry no floor text. */
const HookScene: React.FC<{ w: World; children: React.ReactNode; bare?: boolean;
  stars?: boolean; overhead?: boolean; litFar?: number; push?: [number, number, number];
  t?: number }> =
  ({ w, children, bare, stars, overhead, litFar, push, t }) => {
  const f = useCurrentFrame();
  const sc = push ? E(f, push[0], push[1], 1, push[2], LIN) : 1;
  return (
    <AbsoluteFill>
      <Panel glow={hexA(w.key, 0.22)}>
        <div style={{ position: "absolute", inset: 0, zIndex: 1, transformOrigin: "50% 56%",
          transform: `scale(${sc})` }}>
          {!bare && <Surface w={w} t={t ?? f} stars={stars} overhead={overhead} litFar={litFar} />}
          {children}
        </div>
        <div style={{ position: "absolute", inset: 0, zIndex: 97, pointerEvents: "none",
          background: `radial-gradient(122% 92% at 50% 44%, transparent 40%, ${hexa("#05060B", 0.56)} 100%)` }} />
      </Panel>
    </AbsoluteFill>
  );
};

/** the cream call-card every alternate hook carries, so the mark and the number
    land inside the first second whichever cut a viewer gets served. */
const CallCard: React.FC<{ x: number; y: number; w: number; s?: number; f: number;
  z?: number; line: string; spin?: boolean }> =
  ({ x, y, w: ww, s = 1, f, z = 70, line, spin = true }) => (
  <div style={{ position: "absolute", left: x, top: y, width: ww, zIndex: z,
    transform: `scale(${s})`, transformOrigin: "50% 50%" }}>
    <div style={{ position: "relative", borderRadius: 22, background: "#EDE7D6",
      border: "10px solid #B3A98F", boxShadow: SH_D, padding: "22px 26px 26px" }}>
      <div style={{ position: "relative", height: 132, display: "flex", alignItems: "center",
        justifyContent: "center" }}>
        {/* ⚠️ the halo is SOLID rays + SOLID rings, never a coloured bloom —
            [[feedback_reel_matte_palette]] bans `0 0 Npx <colour>` outright. */}
        {spin && Array.from({ length: 20 }, (_, i) => {
          const len = 22 + Math.sin(f / 6.5 + i * 1.2) * 8;
          return (
            <div key={i} style={{ position: "absolute", left: "50%", top: "50%", width: 0, height: 0,
              transform: `rotate(${i * 18 + f * 1.1}deg)` }}>
              <div style={{ position: "absolute", left: -3.5, top: -(84 + len), width: 7,
                height: len, borderRadius: 4, background: "#E0BE96" }} />
            </div>
          );
        })}
        <div style={{ width: 132, height: 132, borderRadius: 30, background: "#FFFFFF",
          display: "flex", alignItems: "center", justifyContent: "center", boxShadow: SH,
          transform: `scale(${1 + Math.sin(f / 9) * 0.04})` }}>
          <Img src={staticFile("claude_logo.png")}
            style={{ width: 96, height: 96, objectFit: "contain",
              transform: spin ? `rotate(${f * 1.7}deg)` : undefined }} />
        </div>
      </div>
      <div style={{ marginTop: 14, textAlign: "center", fontFamily: fraunces.fontFamily,
        fontWeight: 900, fontSize: 74, lineHeight: 1, color: "#241E12" }}>270 AGENTS</div>
      <div style={{ marginTop: 12, textAlign: "center", fontFamily: MONO, fontWeight: 900,
        fontSize: 25, letterSpacing: "0.20em", color: "#6E6450" }}>{line}</div>
    </div>
  </div>
);

/* ========================================================== VARIANT B ======
   THE QUEUE · mechanism DEPTH + A TRAVELLING IGNITION.

   A line receding to a vanishing point ranks itself: the nearest is huge, the
   farthest is a dot, and no chart is needed to say "there are a lot of these".
   The moment is the ignition running down it. Nothing here resembles A — the
   hero object is a CROWD rather than a single mass, and it arrives by LIGHTING
   rather than by leaving.
   --------------------------------------------------------------------------- */
export const HookQueue: React.FC = () => {
  const f = useCurrentFrame();
  const w = WORLDS.casting;
  const CUT = [0, 26, 56];
  const shot = CUT.filter((c) => f >= c).length - 1;
  const lf = f - CUT[shot];
  const N = 15;

  /* ---- A · 0.00-0.87s · the head of the line, and the card he is holding. */
  if (shot === 0) {
    return (
      <HookScene w={w} litFar={0.16} push={[0, 26, 1.06]}>
        <StreetLamp x={26} y={708} h={430} c="#F0C87E" z={86} />
        <Cone f={f} x={124} y={272} top={90} bot={400} len={430} c="#F0C87E" o={0.26} z={20} />
        {/* the queue, already receding into the dark behind him */}
        {Array.from({ length: 7 }, (_, i) => {
          const p = i / 7;
          return (
            <Claudie key={"q" + i} x={606 + p * 370} y={720 - p * 190} s={1.30 - p * 0.94}
              z={30 - i} f={f + i * 13} tint={CLAY}
              costume={[{ glasses: 1 }, { suit: 1 }, { wizard: 1 }, { prof: 1 }][i % 4]} />
          );
        })}
        {/* a rope line, so it reads as a QUEUE and not a group */}
        {Array.from({ length: 6 }, (_, i) => {
          const p = i / 6;
          return (
            <div key={"rp" + i} style={{ position: "absolute", left: 580 + p * 380,
              top: 626 - p * 172, width: 10 - p * 4, height: 104 - p * 66,
              background: "#4A3E2E", zIndex: 34 }} />
          );
        })}
        <Claudie x={266} y={782} s={2.0} z={62} f={f} hero costume={{ suit: 1 }} />
        <CallCard x={512} y={168} w={430} s={1} f={f} z={70} line="CASTING TONIGHT" />
      </HookScene>
    );
  }

  /* ---- B · 0.87-1.87s · THE WIDE, and the ignition runs the whole line. */
  if (shot === 1) {
    const run = E(lf, 3, 26, 0, 1, LIN);
    return (
      <HookScene w={w} litFar={0.20} push={[0, 30, 1.05]}>
        {Array.from({ length: N }, (_, i) => {
          const p = i / N;
          const on = run * N > i;
          return (
            <React.Fragment key={"L" + i}>
              {/* one lamp per head, and they strike front to back */}
              {/* the lamp sits directly ABOVE its own head, so the ignition
                  reads as one thing lighting rather than two rows blinking */}
              <div style={{ position: "absolute", left: 74 + p * 830 + 4, top: 470 - p * 300,
                width: 7 - p * 3, height: 86 - p * 54, background: "#3E3428", zIndex: 28 }} />
              <div style={{ position: "absolute", left: 74 + p * 830 - 16 + p * 8,
                top: 458 - p * 300, width: 42 - p * 22, height: 15 - p * 8,
                borderRadius: "9px 9px 0 0", background: on ? "#F0C87E" : "#4A4032", zIndex: 29 }} />
              <Claudie x={74 + p * 830} y={764 - p * 292} s={1.42 - p * 1.16}
                z={30 + (N - i)} f={f + i * 9}
                tint={CLAY}
                costume={[{ glasses: 1 }, { suit: 1 }, { wizard: 1 }, { prof: 1 },
                          { beard: 1 }][i % 5]} />
            </React.Fragment>
          );
        })}
        <div style={{ position: "absolute", left: 560, top: 132, width: 400, zIndex: 80,
          textAlign: "center" }}>
          <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 150,
            lineHeight: 1, color: "#F8F0DE", textShadow: "0 8px 22px rgba(0,0,0,0.66)" }}>
            {Math.round(270 * run)}
          </div>
          <div style={{ marginTop: 4, fontFamily: MONO, fontWeight: 900, fontSize: 26,
            letterSpacing: "0.22em", color: "#E0BE96" }}>SPECIALISTS</div>
        </div>
        <Occluder side="l" c="#241C14" w={78} z={92} kind="pole" />
      </HookScene>
    );
  }

  /* ---- C · 1.87-2.77s · the far end lights and the whole line turns to camera. */
  return (
    <HookScene w={w} litFar={0.30} push={[0, 27, 1.08]}>
      {Array.from({ length: 9 }, (_, i) => {
        const p = i / 9;
        return (
          <Claudie key={"t" + i} x={72 + p * 880} y={784 - p * 264} s={1.52 - p * 1.04}
            z={30 + (9 - i)} f={f + i * 11} tint={CLAY} face={i % 2 ? -1 : 1}
            costume={[{ glasses: 1 }, { suit: 1 }, { wizard: 1 }, { prof: 1 }][i % 4]}
            prop={(["swatch", "roll", "mega", "board"] as const)[i % 4]} />
        );
      })}
      {[180, 470, 760].map((x, i) => (
        <React.Fragment key={x}>
          <StreetLamp x={x} y={716 - i * 40} h={330 - i * 60} c="#F0C87E" z={26} />
          <Cone f={f} x={x + 88} y={400 - i * 90} top={54} bot={230} len={300} c="#F0C87E"
            o={0.20} z={22} sway={0.4} />
        </React.Fragment>
      ))}
      <CallCard x={286} y={128} w={440} s={1} f={f} z={78} line="EVERY DIVISION" />
    </HookScene>
  );
};

/* ========================================================== VARIANT C ======
   THE COACH · mechanism ARRIVAL.

   A's hero object LEAVES the frame. This one ENTERS it, at 1120px across three
   shots, and unloads. Opposite direction, opposite silhouette, opposite sound.
   --------------------------------------------------------------------------- */
export const HookCoach: React.FC = () => {
  const f = useCurrentFrame();
  const w = WORLDS.depot;
  const CUT = [0, 20, 50];
  const shot = CUT.filter((c) => f >= c).length - 1;
  const lf = f - CUT[shot];

  /* ---- A · CLOSE on the destination blind. The mark, lit, filling the frame. */
  if (shot === 0) {
    const flick = 0.92 + Math.sin(f / 3.3) * 0.05;
    return (
      <HookScene w={w} bare push={[0, 20, 1.12]}>
        <div style={{ position: "absolute", inset: 0, zIndex: 10,
          background: "linear-gradient(178deg,#2E3A4E 0%,#171F2C 100%)" }} />
        {/* the coach front, close: roof, windscreen band, grille */}
        <div style={{ position: "absolute", left: -40, top: 78, right: -40, height: 96, zIndex: 20,
          background: "#37485E" }} />
        <div style={{ position: "absolute", left: -40, top: 174, right: -40, height: 250, zIndex: 20,
          background: "#22303F" }} />
        {/* the windscreen, with the driver behind it — a Claude, so even the
            close-up of a vehicle still says whose vehicle it is */}
        <div style={{ position: "absolute", left: -20, top: 12, right: -20, height: 78, zIndex: 22,
          background: "#3C5068", borderBottom: "8px solid #4E657F" }} />
        <div style={{ position: "absolute", left: 60, top: 20, width: 420, height: 62, zIndex: 23,
          background: "#8FA8BE" }} />
        <div style={{ position: "absolute", left: 560, top: 20, width: 420, height: 62, zIndex: 23,
          background: "#8FA8BE" }} />
        <div style={{ position: "absolute", left: 132, top: 24, width: 84, height: 58, zIndex: 24,
          background: "#A0522F" }} />
        {[0, 1].map((i) => (
          <div key={"wp" + i} style={{ position: "absolute", left: 210 + i * 500, top: 74,
            width: 250, height: 7, borderRadius: 4, background: "#1B2634", zIndex: 25,
            transformOrigin: "0% 50%",
            transform: `rotate(${-14 + Math.sin(f / 7 + i * 1.6) * 12}deg)` }} />
        ))}
        {/* the roller blind SCROLLS into place — a coach blind is a physical
            fabric roll, so this is free motion that the object justifies */}
        <div style={{ position: "absolute", left: 108, top: 200, width: 796, height: 196,
          zIndex: 30, borderRadius: 10, background: "#1A1206", border: "9px solid #45372A",
          boxShadow: SH_D, display: "flex", alignItems: "center", justifyContent: "center",
          gap: 26, opacity: flick, overflow: "hidden" }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 196,
            transform: `translateY(${E(f, 0, 13, -196, 0, OUT)}px)`, background: "#1A1206",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 26 }}>
          <div style={{ width: 118, height: 118, borderRadius: 26, background: "#FFFFFF",
            display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Img src={staticFile("claude_logo.png")}
              style={{ width: 84, height: 84, objectFit: "contain",
                transform: `rotate(${f * 1.5}deg)` }} />
          </div>
          <div>
            <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 68,
              lineHeight: 1, color: "#F2C463" }}>THE AGENCY</div>
            <div style={{ marginTop: 10, fontFamily: MONO, fontWeight: 900, fontSize: 26,
              letterSpacing: "0.20em", color: "#B08A3E" }}>270 · ALL DIVISIONS</div>
          </div>
          </div>
        </div>
        {/* headlights, low and hot */}
        {[112, 720].map((x) => (
          <React.Fragment key={x}>
            <div style={{ position: "absolute", left: x - 10, top: 448, width: 268, height: 106,
              borderRadius: 24, background: "#38495D", zIndex: 29 }} />
            <div style={{ position: "absolute", left: x, top: 458, width: 248, height: 86,
              borderRadius: 20, background: "#F8EDCC", zIndex: 30, opacity: flick }} />
          </React.Fragment>
        ))}
        <div style={{ position: "absolute", left: -40, top: 424, right: -40, height: 26,
          borderRadius: 6, background: "#4E657F", zIndex: 29 }} />
        <div style={{ position: "absolute", left: -40, top: 566, right: -40, height: 34,
          background: "#33465B", zIndex: 31 }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 560, bottom: 0, zIndex: 12,
          background: "linear-gradient(184deg,#2B3644 0%,#182029 100%)" }} />
        <Claudie x={870} y={806} s={1.62} z={62} f={f} hero costume={{ suit: 1 }} face={-1} />
      </HookScene>
    );
  }

  /* ---- B · the WIDE. It pulls in from the right, 1120px, and stops. */
  if (shot === 1) {
    const inx = E(lf, 0, 29, 1180, 74, OUT);
    return (
      <HookScene w={w} litFar={0.24} push={[0, 30, 1.09]}>
        <DepotRig f={f} />
        <Coach x={inx} f={f} door={0} z={44} />
        <Claudie x={104} y={764} s={1.52} z={62} f={f} hero costume={{ suit: 1 }} />
        <Contact x={38} y={752} w={176} z={61} o={0.34} />
        <Occluder side="r" c="#141C26" w={92} z={92} />
      </HookScene>
    );
  }

  /* ---- C · the door opens and they pile out past the lens. */
  const door = E(lf, 2, 12, 0, 1, OUT);
  return (
    <HookScene w={w} litFar={0.28} push={[0, 33, 1.07]}>
      <DepotRig f={f} />
      <Coach x={74} f={f} door={door} z={44} />
      {Array.from({ length: 8 }, (_, i) => {
        const t0 = 3 + i * 2.4;
        const p = E(f - CUT[2], t0, t0 + 26, 0, 1, LIN);
        if (p <= 0) return null;
        return (
          <Claudie key={"o" + i} x={318 + p * (i % 2 ? 500 : -318)} y={588 + p * 240}
            s={0.78 + p * 1.06} z={60 + i} f={f} walk={1} tint={CLAY}
            costume={[{ glasses: 1 }, { suit: 1 }, { wizard: 1 }, { prof: 1 }][i % 4]}
            prop={(["swatch", "roll", "mega", "case"] as const)[i % 4]}
            face={i % 2 ? 1 : -1} />
        );
      })}
      <Occluder side="l" c="#141C26" w={80} z={92} kind="pole" />
    </HookScene>
  );
};

/** the depot the coach pulls into: a gantry, its wires and a shelter. Without it
    the top 40% of the frame is empty sky, which is where "boring" starts. */
const DepotRig: React.FC<{ f: number }> = ({ f }) => (<>
  <div style={{ position: "absolute", left: -30, right: -30, top: 96, height: 20,
    background: "#2E3F52", zIndex: 24 }} />
  {[70, 330, 620, 900].map((x) => (
    <div key={x} style={{ position: "absolute", left: x, top: 116, width: 20, height: 190,
      background: "#26333F", zIndex: 23 }} />
  ))}
  {[0, 1, 2].map((i) => (
    <div key={"wire" + i} style={{ position: "absolute", left: -30, right: -30, top: 42 + i * 22,
      height: 4, background: "#22303F", zIndex: 24,
      transform: `rotate(${-0.7 + i * 0.5}deg)` }} />
  ))}
  {[190, 470, 760].map((x, i) => (
    <div key={"lm" + x} style={{ position: "absolute", left: x, top: 116, zIndex: 25 }}>
      <div style={{ position: "absolute", left: -30, top: 0, width: 60, height: 22,
        borderRadius: "0 0 30px 30px", background: "#33465B" }} />
      <div style={{ position: "absolute", left: -18, top: 18, width: 36, height: 9,
        borderRadius: 5, background: "#DCE8F2" }} />
    </div>
  ))}
  <div style={{ position: "absolute", left: 700, top: 300, width: 320, height: 210, zIndex: 22,
    background: "#202C39", borderTop: "10px solid #33465B" }} />
</>);

/** the coach itself: a built vehicle with a lit blind, windows, skirt and wheels. */
const Coach: React.FC<{ x: number; f: number; door: number; z?: number }> =
  ({ x, f, door, z = 44 }) => (
  <div style={{ position: "absolute", left: x, top: 258, width: 880, height: 330, zIndex: z }}>
    <div style={{ position: "absolute", left: 0, top: 0, width: 880, height: 250, borderRadius: 22,
      background: "linear-gradient(172deg,#3E5069 0%,#1F2B3A 100%)", boxShadow: SH_D }} />
    <div style={{ position: "absolute", left: 0, top: 14, width: 880, height: 12,
      background: "#546A87" }} />
    {/* the lit blind, carrying the mark so the WIDE still says CLAUDE */}
    <div style={{ position: "absolute", left: 40, top: 34, width: 330, height: 56, borderRadius: 7,
      background: "#1A1206", border: "5px solid #45372A", display: "flex", alignItems: "center",
      gap: 10, paddingLeft: 12 }}>
      <div style={{ width: 34, height: 34, borderRadius: 8, background: "#FFFFFF",
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Img src={staticFile("claude_logo.png")}
          style={{ width: 24, height: 24, objectFit: "contain" }} />
      </div>
      <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 30,
        color: "#F2C463" }}>THE AGENCY</span>
    </div>
    {/* windows, each with a Claude head behind it */}
    {Array.from({ length: 6 }, (_, i) => (
      <div key={i} style={{ position: "absolute", left: 400 + i * 76, top: 40, width: 62,
        height: 66, borderRadius: 6, background: "#E9D6A6", border: "4px solid #253243" }}>
        <div style={{ position: "absolute", left: 14, top: 22, width: 32, height: 40,
          borderRadius: "4px 4px 0 0", background: CLAY }} />
      </div>
    ))}
    {/* the door, folding open */}
    <div style={{ position: "absolute", left: 176, top: 118, width: 122, height: 132,
      background: "#16202C", borderRadius: 5, zIndex: 3 }} />
    {[0, 1].map((i) => (
      <div key={i} style={{ position: "absolute", left: 176 + i * 61, top: 118, width: 61,
        height: 132, background: "linear-gradient(96deg,#48607C 0%,#2B3A4C 100%)",
        border: "3px solid #1B2632", borderRadius: 4, zIndex: 4,
        transformOrigin: i ? "100% 50%" : "0% 50%",
        transform: `perspective(520px) rotateY(${(i ? 1 : -1) * door * 88}deg)` }} />
    ))}
    {/* the step they come down */}
    {door > 0.5 && (
      <div style={{ position: "absolute", left: 186, top: 250, width: 102, height: 18,
        borderRadius: 4, background: "#54687F", zIndex: 5 }} />
    )}
    <div style={{ position: "absolute", left: 10, top: 250, width: 860, height: 26,
      background: "#1A2431" }} />
    {[112, 664].map((wx) => (
      <div key={wx} style={{ position: "absolute", left: wx, top: 244, width: 108, height: 108,
        borderRadius: 56, background: "#12181F", border: "14px solid #2A3542" }} />
    ))}
  </div>
);

/* ========================================================== VARIANT D ======
   THE SHADOW · mechanism SCALE COLLAPSE.

   One small Claude at a folding desk, and a crew of fourteen thrown huge on the
   wall behind him. The moment is the shadow BECOMING REAL. Nothing enters, and
   nothing leaves; the frame's own contents change state, which is the one thing
   neither A nor B nor C does.
   --------------------------------------------------------------------------- */
export const HookShadow: React.FC = () => {
  const f = useCurrentFrame();
  const w = WORLDS.lot;
  const CUT = [0, 24, 52];
  const shot = CUT.filter((c) => f >= c).length - 1;
  const lf = f - CUT[shot];
  const HATS: Record<string, number>[] = [
    { wizard: 1 }, { suit: 1 }, { glasses: 1 }, { prof: 1 }, { constr: 1 },
    { beard: 1 }, { girl: 1 }, { cop: 1 },
  ];

  const Wall = () => (<>
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 596, zIndex: 22,
      background: "linear-gradient(178deg,#6E5A40 0%,#43361F 100%)" }} />
    {Array.from({ length: 15 }, (_, i) => (
      <div key={"c" + i} style={{ position: "absolute", left: 0, right: 0, top: 20 + i * 40,
        height: 3, background: "#584727", zIndex: 23 }} />
    ))}
    {Array.from({ length: 9 }, (_, i) => (
      <div key={"p" + i} style={{ position: "absolute", left: 30 + i * 118, top: 0, width: 4,
        height: 596, background: "#584727", zIndex: 23 }} />
    ))}
    {/* a few darker bricks so the wall is a surface, not a fill */}
    {Array.from({ length: 22 }, (_, i) => {
      const r = (k: number) => { const v = Math.sin(i * 43.1 + k * 9.7) * 4371.7; return v - Math.floor(v); };
      return (
        <div key={"bk" + i} style={{ position: "absolute", left: Math.round(r(1) * 940),
          top: 24 + Math.round(r(2) * 14) * 40, width: 112, height: 34,
          background: "#5F4C2C", zIndex: 23 }} />
      );
    })}
  </>);

  /* ---- A · the shadow is the whole promise, and it is already on the wall. */
  if (shot === 0) {
    return (
      <HookScene w={w} bare push={[0, 24, 1.12]}>
        <Wall />
        {/* THE CREW, thrown huge on the lit brick. ⛔ THE ROW GROWS across the
            shot — a light source moving in enlarges a cast shadow, so this is
            both the physics and the only large-area change available on a wall. */}
        {Array.from({ length: 8 }, (_, i) => {
          const g = E(lf, 0, 24, 1, 1.16, LIN);
          return (
            <div key={"sh" + i} style={{ position: "absolute",
              left: -20 + (i - 3.5) * 132 * g + 462, top: 96 - (g - 1) * 190,
              zIndex: 26, opacity: 0.94 }}>
              <Claudie x={90 + Math.sin(f / 11 + i * 1.7) * 13} y={470 + (i % 3) * 14}
                s={(1.55 + (i % 3) * 0.16) * g + Math.sin(f / 17 + i) * 0.03} f={f + i * 19}
                z={26} tint={CLAY} costume={HATS[i]} />
            </div>
          );
        })}
        <div style={{ position: "absolute", left: 0, right: 0, top: 596, bottom: 0, zIndex: 30,
          background: "linear-gradient(184deg,#6E5A3C 0%,#42351F 100%)" }} />
        {/* the desk, the lamp and the one who is actually there */}
        <div style={{ position: "absolute", left: 316, top: 636, width: 386, height: 20,
          borderRadius: 5, background: "#8A6E52", zIndex: 44 }} />
        <div style={{ position: "absolute", left: 336, top: 656, width: 16, height: 96,
          background: "#5E4B38", zIndex: 43 }} />
        <div style={{ position: "absolute", left: 666, top: 656, width: 16, height: 96,
          background: "#5E4B38", zIndex: 43 }} />
        <div style={{ position: "absolute", left: 396, top: 556, width: 224, height: 84,
          borderRadius: 9, background: "#EDE7D6", border: "7px solid #B3A98F", zIndex: 46,
          display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
          boxShadow: SH }}>
          <div style={{ width: 52, height: 52, borderRadius: 12, background: "#FFFFFF",
            display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Img src={staticFile("claude_logo.png")}
              style={{ width: 38, height: 38, objectFit: "contain",
                transform: `rotate(${f * 1.7}deg)` }} />
          </div>
          <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 40,
            color: "#241E12" }}>270</span>
        </div>
        <Claudie x={506} y={758} s={0.86} z={48} f={f} hero />
        <StreetLamp x={40} y={790} h={470} c="#F0C979" z={86} />
        <Cone f={f} x={190} y={200} top={120} bot={560} len={620} c="#F0C979" o={0.26} z={40} sway={3.4} />
      </HookScene>
    );
  }

  /* ---- B · they STEP OUT of the wall, one at a time, into full colour. */
  if (shot === 1) {
    return (
      <HookScene w={w} bare push={[0, 28, 1.13]}>
        <Wall />
        <div style={{ position: "absolute", left: 0, right: 0, top: 596, bottom: 0, zIndex: 30,
          background: "linear-gradient(184deg,#6E5A3C 0%,#42351F 100%)" }} />
        {Array.from({ length: 8 }, (_, i) => {
          const t0 = 1 + i * 3;
          const p = E(lf, t0, t0 + 15, 0, 1, OUT);
          return (
            <React.Fragment key={"s" + i}>
              {/* what is left on the wall, fading as its owner detaches */}
              <div style={{ position: "absolute", left: -20 + i * 132, top: 96, zIndex: 26,
                opacity: 0.94 * (1 - p) }}>
                <Claudie x={90} y={470 + (i % 3) * 14} s={1.55 + (i % 3) * 0.16}
                  f={f + i * 19} z={26} tint={CLAY} costume={HATS[i]} />
              </div>
              {p > 0.02 && (
                <Claudie x={62 + i * 132 + p * (i % 2 ? 46 : -34)}
                  y={618 + p * 194 + (i % 3) * 10}
                  s={0.95 + p * 0.67} z={40 + i} f={f + i * 19} walk={p < 1 ? 1 : 0}
                  tint={CLAY} costume={HATS[i]} />
              )}
            </React.Fragment>
          );
        })}
        <Cone f={f} x={190} y={200} top={120} bot={560} len={620} c="#F0C979" o={0.22} z={38} sway={3.4} />
      </HookScene>
    );
  }

  /* ---- C · the lot is full, and the small one is no longer alone. */
  return (
    <HookScene w={w} bare push={[0, 31, 1.09]}>
      <Wall />
      <div style={{ position: "absolute", left: 0, right: 0, top: 596, bottom: 0, zIndex: 30,
        background: "linear-gradient(184deg,#6E5A3C 0%,#42351F 100%)" }} />
      {Array.from({ length: 8 }, (_, i) => {
        const p = E(lf, i * 2, i * 2 + 24, 0, 1, IO);
        return (
          <Claudie key={"c" + i} x={86 + i * 132 + p * (i % 2 ? 96 : -84)}
            y={766 + (i % 3) * 10} s={1.16 + (i % 3) * 0.12} z={40 + i} f={f + i * 19}
            walk={1} tint={CLAY} costume={HATS[i]}
            prop={(["swatch", "roll", "mega", "board"] as const)[i % 4]}
            face={i % 2 ? 1 : -1} />
        );
      })}
      <Claudie x={506} y={664} s={1.02} z={62} f={f} hero costume={{ cheer: 1 } as any} />
      <CallCard x={286} y={104} w={440} s={0.94} f={f} z={80} line="ALL 17 DIVISIONS" />
      <Cone f={f} x={190} y={200} top={120} bot={560} len={620} c="#F0C979" o={0.20} z={38} sway={3.4} />
    </HookScene>
  );
};
