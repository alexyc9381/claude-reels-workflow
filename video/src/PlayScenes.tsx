import React from "react";
import { AbsoluteFill, useCurrentFrame, Img, staticFile } from "remotion";
import { inter, fraunces } from "./fonts";
import { Panel, hexA, MONO } from "./SlopKit";
import {
  Room, SPACES, Cone, Footlights, Lamp, Leg, Slug, Glass, BigNum, Plaque, Motes,
  Claudie, CLAY, Contact, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, W, H,
} from "./PlayWorld";
import {
  PromptCard, PrompterBox, Shelf, DressingDoor, ScriptStack, Marquee, StarStream, Counter,
  AlleyTerminal, FlyBar, CastCard, Seats, Cheer, PriceBoard, RepoCard,
  ROSTER, MarkTile, MarkedScript, MarkRack,
} from "./PlayProps";
import { CamCtx } from "./AgyWorld";

/* =========================================================================
   REEL 95 "TOOLS" · THE BODY. Board: storyboards/95-tools.md.

   ⛔ EVERY SCENE EARNS ITS MOTION FROM THE ACTION. Where a camera move is used
      it is MOTIVATED and named on the board (S1 dolly in, S4 tilt up, S8 push).
      The rest are LOCKED.
   ⛔ ANY TRANSFORMED WRAPPER NEEDS AN EXPLICIT zIndex — a `transform` creates a
      stacking context and reel 93 lost a whole tower to it.
   ⛔ ONE ORANGE. Every Claude is `#D97757`; rank is size, position and light.
   ⛔ NO DOLLAR FIGURE, NO BENCHMARK, NO INVENTED COMMAND anywhere in this file.
   ========================================================================= */

const Scene: React.FC<{ k: keyof typeof SPACES; slug: string; children: React.ReactNode;
  dust?: boolean; boards?: boolean; push?: [number, number, number]; slugC?: string;
  glow?: string }> =
  ({ k, slug, children, dust, boards, push, slugC, glow }) => {
  const f = useCurrentFrame();
  const cam = React.useContext(CamCtx);
  const sc = push ? E(f, push[0], push[1], 1, push[2], LIN) : 1;
  return (
    <AbsoluteFill>
      <Panel glow={glow ?? hexA(SPACES[k].key, 0.20)}>
        <div style={{ position: "absolute", inset: 0, zIndex: 1, transformOrigin: "50% 56%",
          transform: `translate(${cam.dx}px, ${cam.dy}px) rotate(${cam.rot}deg) scale(${sc * cam.s})` }}>
          <Room k={k} dust={dust} f={f} boards={boards}>{children}</Room>
        </div>
        <Slug t={slug} c={slugC} />
      </Panel>
    </AbsoluteFill>
  );
};

/* ================================================================== S0 ====
   0.00 -> 2.84s · 85f · THE STAGE + THE PROMPTER'S BOX · HOOK.

   Mechanism: REVEAL OF THE HIDDEN OPERATOR. You think you are watching a
   performance; you are watching someone read. Three hard cuts, camera locked in
   each (docs/THE-OPEN.md — reel 78 went 2.0 -> 6.23 -> 6.85 on first-five-second
   motion purely by recutting one wide into three shots).

   ⛔ NOT A SEALED THING THAT OPENS. Reel 94's hook was a sealed plate bursting
      on a cut nine days ago. This one reveals an operator who was there all
      along: different mechanism, different silhouette, different beat.
   ⛔ FRAME 0 IS SETTLED — he is HOLDING the pose, not arriving into it.
   ------------------------------------------------------------------------ */
export const S0Hook: React.FC = () => {
  const f = useCurrentFrame();
  /* ⛔ TWO SHOTS, NOT THREE. Alex, round 2: "try not to keep flipping between
     screens at the beginning, just keep it interesting and detailed." Reel 92
     got the same note and the repo already has the answer: *the fix is not fewer
     EVENTS, it is fewer CUTS with MORE happening inside each one.* Round 1 cut
     three times in 2.83s with shots of 0.73 / 0.90 / 1.20s, which reads as
     channel-hopping. This is ONE cut, two shots of 1.40s and 1.43s, and the
     REVEAL now happens INSIDE shot A rather than on a cut — the card lifts out
     of the box at 0.60s while the camera holds.
     ⛔ FRAME 0 IS SETTLED — he is holding the pose, not arriving into it. */
  const CUT = 42;
  const shot = f >= CUT ? 1 : 0;
  const lf = f - (shot ? CUT : 0);

  /* ---- A · 0.00-1.40s · the stage, and the reveal happens in-shot at 0.60s. */
  if (shot === 0) {
    const lift = E(lf, 18, 34, 0, 1, OUT);          // 0.60s — the house beat
    return (
      <Scene k="stage" slug="" dust push={[0, 42, 1.09]}>
        <div style={{ position: "absolute", left: -20, right: -20, top: -10, height: 120,
          background: "linear-gradient(178deg,#6E2226 0%,#3A1014 100%)", zIndex: 26 }} />
        {Array.from({ length: 9 }, (_, i) => (
          <div key={"sw" + i} style={{ position: "absolute", left: -20 + i * 128, top: 96,
            width: 128, height: 46, borderRadius: "0 0 64px 64px",
            background: "#3A1014", zIndex: 26 }} />
        ))}
        {/* ⭐ THE HOUSE EMBLEM over the proscenium — a 132px Claude mark in a
            brass cartouche, on screen from frame 0. This is the first thing a
            Claude user sees and the reason they stop. */}
        <div style={{ position: "absolute", left: 400, top: 22, width: 212, height: 116,
          borderRadius: "0 0 106px 106px", background: "linear-gradient(178deg,#C79A46 0%,#7C5D24 100%)",
          zIndex: 30, boxShadow: SH_D }} />
        <div style={{ position: "absolute", left: 440, top: 18, width: 132, height: 132,
          borderRadius: 32, background: "#FFFFFF", border: "5px solid #E4D0A0", zIndex: 31,
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Img src={staticFile("claude_logo.png")}
            style={{ width: 96, height: 96, objectFit: "contain",
              transform: `rotate(${f * 1.1}deg)` }} />
        </div>
        {Array.from({ length: 9 }, (_, i) => (
          <div key={"eb" + i} style={{ position: "absolute", left: 396 + i * 26, top: 142,
            width: 13, height: 13, borderRadius: 7, zIndex: 31,
            background: (i + Math.floor(f / 3)) % 3 ? "#F6DDA0" : "#8A6E34" }} />
        ))}
        {/* ⭐ THE BACKDROP MEDALLION — 340px of Claude mark on the back wall,
            BEHIND the actor (z=14 against his z=62) so it can never cover him.
            This is the "big behind him" Alex asked for, and it is the single
            most recognisable thing in the frame at 0.00s. */}
        <div style={{ position: "absolute", left: 336, top: 176, width: 340, height: 340,
          borderRadius: "50%", background: "#7A2A2E", border: "10px solid #A8763F",
          zIndex: 13 }} />
        <div style={{ position: "absolute", left: 366, top: 206, width: 280, height: 280,
          borderRadius: "50%", background: "#F2EADA", zIndex: 14, display: "flex",
          alignItems: "center", justifyContent: "center" }}>
          <Img src={staticFile("claude_logo.png")}
            style={{ width: 210, height: 210, objectFit: "contain",
              transform: `rotate(${f * 0.8}deg)` }} />
        </div>
        {Array.from({ length: 16 }, (_, i) => {
          const a = (i / 16) * Math.PI * 2;
          return (
            <div key={"md" + i} style={{ position: "absolute",
              left: 506 + Math.cos(a) * 186 - 8, top: 346 + Math.sin(a) * 186 - 8,
              width: 16, height: 16, borderRadius: 9, zIndex: 15,
              background: (i + Math.floor(f / 3)) % 3 ? "#F6DDA0" : "#8A6E34" }} />
          );
        })}
        <Leg side="l" c="#5A1E22" w={98} z={90} />
        <Leg side="r" c="#5A1E22" w={98} z={90} />
        <Cone f={f} x={560} y={70} top={110} bot={500} len={430} c="#F2C15E" o={0.30} z={22} sway={0.5} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 486, bottom: 0,
          background: "linear-gradient(184deg,#8E6238 0%,#4E3319 100%)", zIndex: 8 }} />
        <div style={{ position: "absolute", left: 300, top: 462, width: 520, height: 84,
          borderRadius: "50%", background: mix("#7A5334", 0.34), zIndex: 23 }} />
        {/* THE ACTOR, mid-line, holding the pose */}
        <Claudie x={562} y={556} s={1.62} z={62} f={f + 20} hero badge={1} costume={{ cheer: 0.8 }} />
        <Contact x={478} y={548} w={172} z={24} o={0.30} />

        {/* THE PROMPTER'S BOX, at the lip, with its rack of REAL MARKS already
            visible inside it — the audience signal lands in shot one. */}
        <PrompterBox x={214} y={606} s={0.86} z={60} f={f} />
        {ROSTER.slice(0, 3).map((m, i) => (
          <div key={m[1]} style={{ position: "absolute", left: 88 + i * 92, top: 452 - i * 10,
            zIndex: 50 + i, transform: `rotate(${-7 + i * 6}deg)` }}>
            <MarkedScript x={0} y={0} m={m} s={0.74} z={50 + i} lines={2} />
          </div>
        ))}
        {/* ⭐ THE REVEAL, IN-SHOT: the card rises out of the hatch into the light */}
        <div style={{ position: "absolute", left: 0, top: 0, zIndex: 68,
          transform: `translateY(${(1 - lift) * 150}px)`, opacity: Math.min(1, lift * 2.4) }}>
          <PromptCard x={104} y={276} s={0.86} z={68} f={f} rot={-5} lines={5} spin />
        </div>
        {/* the feed line from the hatch to the actor, running from 0.80s */}
        {Array.from({ length: 11 }, (_, i) => {
          const p = i / 11;
          const on = E(lf, 24 + i * 1.3, 31 + i * 1.3, 0, 1, OUT);
          return (
            <div key={"fd" + i} style={{ position: "absolute", left: 292 + p * 250,
              top: 566 - p * 74 - Math.sin(p * Math.PI) * 28, width: 13, height: 13,
              borderRadius: 7, background: "#F2EADA", opacity: on * 0.9, zIndex: 58 }} />
          );
        })}
        <Footlights y={604} f={f} z={88} />
        {/* the house we are sitting in — a rank of heads cropped by the bottom */}
        {Array.from({ length: 8 }, (_, i) => {
          const r = (k: number) => { const v = Math.sin(i * 29.7 + k * 13.1) * 4371.7; return v - Math.floor(v); };
          return (
            <div key={"au" + i} style={{ position: "absolute", left: -40 + i * 148,
              top: 716 + r(1) * 28 + Math.sin(f / 23 + i) * 2, width: 128, height: 150,
              borderRadius: "64px 64px 0 0", background: "#2A0F12", zIndex: 91 }} />
          );
        })}
      </Scene>
    );
  }

  /* ---- B · 1.40-2.83s · ONE cut, in to the hatch. The card, and behind it the
       whole rack of real marks — twelve companies, identified. */
  return (
    <Scene k="box" slug="" push={[42, 85, 1.12]} boards={false}>
      <div style={{ position: "absolute", left: -160, top: -300, right: -160, height: 400,
        borderRadius: "0 0 50% 50%", background: "#150C06", zIndex: 40 }} />
      <Lamp x={912} y={140} c="#8FD9A8" s={0.94} z={44} f={f} flex={132} shade="#2A3A2E" />
      <Cone f={f} x={912} y={164} top={64} bot={300} len={360} c="#8FD9A8" o={0.22} z={22} sway={0.5} />
      {/* ⭐ THE RACK. Twelve real marks, revealed left to right across the shot —
          this is the frame that tells an AI viewer the video is for them. */}
      <PromptCard x={322} y={62} s={1.02} z={62} f={f} rot={-3} lines={4} spin />
      <div style={{ position: "absolute", left: 56, top: 356, zIndex: 46 }}>
        <MarkRack x={0} y={0} n={12} s={0.84} z={46} f={f} reveal={E(lf, 2, 36, 0.20, 1.1, LIN)} />
      </div>
      <Claudie x={892} y={790} s={1.10} z={64} f={f} badge={0.9} costume={{ glasses: 1 }} face={-1} />
      <Leg side="l" c="#241810" w={72} z={92} kind="rail" />
    </Scene>
  );
};

/* ================================================================== S1 ====
   2.84 -> 4.61s · 53f · THE ARCHIVE · SETUP · SLOW DOLLY IN.
   Mechanism: EXTRACTION — one card leaves a mass, and the slot it left goes
   dark, so the eye has exactly one place to be.
   ------------------------------------------------------------------------ */
export const S1Archive: React.FC = () => {
  const f = useCurrentFrame();
  const pull = E(f, 12, 34, 0, 1, OUT);
  return (
    <Scene k="archive" slug="184 PROMPT FILES, 18 COMPANIES" dust push={[0, 53, 1.12]}>
      <Shelf x={-30} y={128} w={620} rows={4} gap={98} z={30} dark0={pull > 0.05 ? 108 : -1} />
      <Shelf x={640} y={104} w={420} rows={4} gap={98} z={30} />
      {/* the rolling ladder he is standing on */}
      <div style={{ position: "absolute", left: 372, top: 96, width: 15, height: 420,
        background: "#6E5433", zIndex: 42 }} />
      <div style={{ position: "absolute", left: 486, top: 96, width: 15, height: 420,
        background: "#6E5433", zIndex: 42 }} />
      {Array.from({ length: 6 }, (_, i) => (
        <div key={"rg" + i} style={{ position: "absolute", left: 372, top: 140 + i * 66,
          width: 129, height: 11, background: "#8E6E42", zIndex: 42 }} />
      ))}
      <Claudie x={438} y={432} s={0.98} z={46} f={f} hero badge={0.9} costume={{ glasses: 1 }} />
      {/* THE CARD COMES OUT and travels down to the reading desk */}
      <div style={{ position: "absolute", left: 0, top: 0, zIndex: 66,
        transform: `translate(${pull * 226}px, ${pull * 274}px) rotate(${pull * 14}deg)`,
        opacity: pull > 0.02 ? 1 : 0 }}>
        <PromptCard x={330} y={236} s={0.60} z={66} f={f} lines={6} />
      </div>
      {/* the reading desk it lands on */}
      <div style={{ position: "absolute", left: 512, top: 596, width: 420, height: 20,
        borderRadius: 4, background: "#5E4527", zIndex: 44 }} />
      <div style={{ position: "absolute", left: 540, top: 616, width: 18, height: 96,
        background: "#43331F", zIndex: 43 }} />
      <div style={{ position: "absolute", left: 890, top: 616, width: 18, height: 96,
        background: "#43331F", zIndex: 43 }} />
      {/* the shelf he is pulling from is MARKED, so the archive is legibly an
          archive OF SOMETHING rather than coloured spines */}
      {ROSTER.slice(0, 5).map((m, i) => (
        <div key={m[1]} style={{ position: "absolute", left: 44 + i * 108, top: 300, zIndex: 34,
          opacity: i === 1 ? 1 - pull : 1 }}>
          <MarkedScript x={0} y={0} m={m} s={0.62} z={34} lines={2} />
        </div>
      ))}
      <Lamp x={716} y={470} c="#7FCF9B" s={1.0} z={48} f={f} flex={140} shade="#2A3A2E" />
      <Cone f={f} x={716} y={496} top={64} bot={300} len={300} c="#7FCF9B" o={0.20} z={24} sway={0.4} />
      <Leg side="l" c="#241A12" w={80} z={92} kind="rail" />
    </Scene>
  );
};

/* ================================================================== S2 ====
   4.61 -> 7.05s · 74f · THE STAR DRESSING CORRIDOR · ESCALATE · LOCKED.
   Mechanism: TWO NAMED DOORS, each striking on its own MEASURED onset —
   f0 "Claude Fable 5", f24 "GPT 5.6 Sol".
   ------------------------------------------------------------------------ */
export const S2Doors: React.FC = () => {
  const f = useCurrentFrame();
  const A = E(f, 0, 10, 0, 1, OUT);
  const B = E(f, 24, 34, 0, 1, OUT);
  return (
    <Scene k="dressing" slug="THE TWO THICKEST SCRIPTS IN THE REPO" boards={false}
      push={[0, 74, 1.12]}>
      {/* the runner down the middle of the corridor */}
      <div style={{ position: "absolute", left: 236, right: 236, top: 508, bottom: 0,
        background: "linear-gradient(184deg,#8E3436 0%,#4A1A1C 100%)", zIndex: 12 }} />
      <DressingDoor x={62} y={640} name="CLAUDE FABLE 5" sub="ANTHROPIC" on={A} f={f}
        s={0.92} z={40} logo="logos/claude.svg" />
      <DressingDoor x={606} y={640} name="GPT-5.6 SOL" sub="OPENAI" on={B} f={f - 24}
        s={0.92} z={40} logo="chatgpt_logo.png" />
      {/* each door's script rack fills as its bulbs strike */}
      {A > 0.4 && <ScriptStack x={186} y={704} n={Math.round(E(f, 8, 62, 1, 13, LIN))}
        s={0.86} z={52} label="FABLE 5" />}
      {B > 0.4 && <ScriptStack x={730} y={704} n={Math.round(E(f, 30, 72, 1, 13, LIN))}
        s={0.86} z={52} label="GPT-5.6" />}
      <Claudie x={506} y={716} s={0.90} z={56} f={f} hero badge={0.9} />
      <Contact x={462} y={710} w={94} z={20} o={0.26} />
      <Leg side="r" c="#3A2A2E" w={72} z={92} />
    </Scene>
  );
};

/* ================================================================== S3 ====
   7.05 -> 8.64s · 47f · THE UNDERSTUDY'S CORRIDOR · TURN · LOCKED.
   Mechanism: TRANSFER. ⛔ The cold grey-green against S2's warm cream IS the
   beat — the same object crossing into a place it does not belong.
   ------------------------------------------------------------------------ */
export const S3Transfer: React.FC = () => {
  const f = useCurrentFrame();
  const fly = E(f, 0, 20, 0, 1, OUT);
  const carry = E(f, 24, 47, 0, 1, IO);
  const plate = E(f, 22, 32, 0, 1, BACK);
  return (
    <Scene k="under" slug="IT IS JUST MARKDOWN" push={[0, 47, 1.13]}>
      {/* one bare bulb on a flex, and the plain door */}
      <Lamp x={506} y={150} c="#EFE4C0" s={0.62} z={44} f={f} flex={130} shade="#2E362F" sway={1.6} />
      <Cone f={f} x={506} y={176} top={54} bot={330} len={370} c="#EFE4C0" o={0.20} z={22} sway={1.6} />
      <div style={{ position: "absolute", left: 336, top: 210, width: 240, height: 336,
        background: "linear-gradient(96deg,#6E7A70 0%,#49544C 100%)", border: "6px solid #3A443C",
        zIndex: 40 }}>
        <div style={{ position: "absolute", right: 18, top: 176, width: 15, height: 15,
          borderRadius: 8, background: "#93A398" }} />
      </div>
      {/* the taped paper card it has instead of a brass plate */}
      <div style={{ position: "absolute", left: 386, top: 250, width: 140, height: 54,
        background: "#E4E0D2", zIndex: 42, transform: "rotate(-2deg)",
        fontFamily: MONO, fontWeight: 800, fontSize: 15, color: "#5A6058",
        display: "flex", alignItems: "center", justifyContent: "center" }}>UNDERSTUDY</div>
      {/* THE BRASS PLATE lands over it */}
      {plate > 0.02 && (
        <div style={{ position: "absolute", left: 372, top: 240, width: 170, height: 66,
          borderRadius: 6, background: "linear-gradient(160deg,#E0BE72 0%,#A8801E 100%)",
          border: "4px solid #7C5D24", zIndex: 44, boxShadow: SH,
          transform: `scale(${plate}) rotate(${(1 - plate) * -12}deg)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 22, color: "#2E220A" }}>
          SAME SCRIPT
        </div>
      )}
      {/* the mop bucket, so the corridor is a place and not a wall */}
      <div style={{ position: "absolute", left: 92, top: 626, width: 82, height: 74,
        borderRadius: "8px 8px 16px 16px", background: "#3E4A42", zIndex: 46 }} />
      <div style={{ position: "absolute", left: 128, top: 470, width: 9, height: 170,
        background: "#5E6E62", zIndex: 46, transform: "rotate(9deg)" }} />
      {/* THE SCRIPT arrives from frame left and lands in his hands */}
      <div style={{ position: "absolute", left: 0, top: 0, zIndex: 60,
        transform: `translateX(${(1 - fly) * -560 - carry * 226}px) translateY(${Math.sin(fly * Math.PI) * -76 - carry * 104}px) scale(${1 - carry * 0.16})`,
        opacity: fly > 0.02 ? 1 : 0 }}>
        <ScriptStack x={648} y={640} n={11} s={0.90} z={60} />
        <MarkedScript x={636} y={556} m={ROSTER[0]} s={0.86} z={61} lines={3} />
      </div>
      {/* he CARRIES it to the door — 226px, across the whole back half, which is
          what the plate landing alone could never give the frame */}
      <Claudie x={772 - carry * 218} y={716} s={1.06} z={58} f={f} badge={0.9}
        walk={carry > 0 && carry < 1 ? 1 : 0} hero
        costume={{ shock: f > 14 && f < 26 ? 0.6 : 0, cheer: f > 40 ? 0.7 : 0 }} face={-1} />
      <Contact x={724 - carry * 218} y={710} w={110} z={20} o={0.26} />
      <Leg side="l" c="#232C26" w={70} z={92} kind="rail" />
    </Scene>
  );
};

/* ================================================================== S4 ====
   8.64 -> 11.07s · 73f · THE MARQUEE · EXTERIOR · TILT UP.
   Mechanism: A NUMBER THAT ARRIVES. ⛔ never typeset at its value.
   ------------------------------------------------------------------------ */
export const S4Marquee: React.FC = () => {
  const f = useCurrentFrame();
  const tilt = E(f, 0, 73, -318, 66, LIN);
  const on = Math.max(0, Math.min(11, Math.floor((f - 4) / 3)));
  const nP = E(f, 16, 62, 0, 1, OUT);
  const n = Math.round(62597 * nP).toLocaleString();
  const hit = E(f, 62, 70, 1, 0, OUT);
  return (
    <Scene k="marquee" slug="asgeirtj / system_prompts_leaks" boards={false}
      push={[0, 73, 1.22]}>
      <div style={{ position: "absolute", inset: 0, zIndex: 20,
        transform: `translateY(${tilt}px)` }}>
        {/* the building face above the canopy */}
        <div style={{ position: "absolute", left: 78, top: -250, width: 856, height: 470,
          background: "linear-gradient(96deg,#333B58 0%,#1D2438 100%)", boxShadow: SH_D }} />
        {Array.from({ length: 9 * 6 }, (_, i) => {
          const cx = i % 9, cy = Math.floor(i / 9);
          const q = Math.sin(i * 19.7 + Math.floor(f / 9) * 3.1) * 4371.7;
          return (
            <div key={"fw" + i} style={{ position: "absolute", left: 96 + cx * 92,
              top: -318 + cy * 62, width: 64, height: 36,
              background: (q - Math.floor(q)) < 0.46 ? "#F2CE86" : "#26304C" }} />
          );
        })}
        {/* the deep canopy, edged in bulbs */}
        <div style={{ position: "absolute", left: 40, top: 224, width: 932, height: 46,
          borderRadius: 8, background: "#3A2F22", boxShadow: SH_D }} />
        {Array.from({ length: 17 }, (_, i) => (
          <div key={"cb" + i} style={{ position: "absolute", left: 62 + i * 54, top: 276,
            width: 15, height: 15, borderRadius: 8,
            background: on > 0 ? ((i + Math.floor(f / 2)) % 2 ? "#FBE7B2" : "#6E5220") : "#4A4356" }} />
        ))}
        <Marquee x={186} y={94} text="SYSTEM PROMPTS" on={on} f={f} s={1.0} z={60} />
        {/* the poster case — it CYCLES, and each poster is a real mark */}
        <div style={{ position: "absolute", left: 366, top: 288, width: 280, height: 200,
          background: "#F2EADA", border: "9px solid #6E4A22", zIndex: 30, overflow: "hidden",
          display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "center", gap: 12 }}>
          {(() => {
            const m = ROSTER[Math.floor(f / 15) % 4];
            return (<>
              <MarkTile m={m} s={1.5} z={2} />
              <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 27,
                color: "#241E12" }}>{m[1]}</div>
              <div style={{ fontFamily: MONO, fontWeight: 900, fontSize: 14,
                letterSpacing: "0.14em", color: "#6E5F3E" }}>SYSTEM PROMPT</div>
            </>);
          })()}
        </div>
      </div>
      <StarStream k={f - 10} tx={302} ty={604} n={64} z={66} />
      <Counter x={280} y={556} v={n} label="STARS ON GITHUB" s={0.98} z={70} hit={hit} />
      {f > 66 && (<>
        <Plaque x={286} y={714} t="10,288" hot="FORKS" s={0.80} z={72} />
        <Plaque x={468} y={714} t="CC0" hot="PUBLIC DOMAIN" s={0.80} z={72} />
      </>)}
      <Claudie x={900} y={760} s={1.05} z={62} f={f} hero badge={0.9} />
      <Leg side="l" c="#171C2E" w={78} z={92} kind="rail" />
    </Scene>
  );
};

/* ================================================================== S5 ====
   11.07 -> 12.44s · 41f · THE STAGE DOOR ALLEY · EXTERIOR · LOCKED.
   ⛔ THE ONLY COMMAND THAT SHIPS IS A CLONE. The repo has no installer, no CLI
      and no skill, so a clone is what gets typed and nothing is invented.
   ------------------------------------------------------------------------ */
export const S5Clone: React.FC = () => {
  const f = useCurrentFrame();
  const typed = E(f, 3, 26, 0, 1, LIN);
  const files = Math.max(0, Math.min(6, Math.floor((f - 22) / 2.0)));
  const lean = E(f, 8, 34, 0, 1, IO);
  return (
    <Scene k="alley" slug="NO INSTALLER. NO CLI. A FOLDER." slugC="#9FD9BC"
      push={[0, 41, 1.13]}>
      {/* the steel stage door, and its caged lamp */}
      <div style={{ position: "absolute", left: 62, top: 132, width: 244, height: 342,
        background: "linear-gradient(96deg,#5A6068 0%,#3A3E44 100%)", border: "7px solid #2A2E34",
        zIndex: 34 }} />
      <div style={{ position: "absolute", left: 96, top: 174, width: 176, height: 42,
        background: "#22262A", zIndex: 35, display: "flex", alignItems: "center",
        justifyContent: "center", fontFamily: MONO, fontWeight: 900, fontSize: 17,
        letterSpacing: "0.18em", color: "#B2874A" }}>STAGE DOOR</div>
      <div style={{ position: "absolute", left: 158, top: 74, width: 52, height: 42,
        borderRadius: "26px 26px 0 0", background: "#2A2E34", zIndex: 36 }} />
      <div style={{ position: "absolute", left: 170, top: 100, width: 28, height: 14,
        borderRadius: 8, background: "#F0DCA0", zIndex: 36 }} />
      {Array.from({ length: 4 }, (_, i) => (
        <div key={"cg" + i} style={{ position: "absolute", left: 160 + i * 13, top: 74,
          width: 3, height: 42, background: "#1A1E22", zIndex: 37 }} />
      ))}
      <Cone f={f} x={184} y={112} top={44} bot={260} len={330} c="#F0DCA0" o={0.22} z={22} sway={0.6} />
      {/* the crate the laptop sits on */}
      <div style={{ position: "absolute", left: 452, top: 690, width: 470, height: 102,
        background: "#4A403A", border: "6px solid #342C28", zIndex: 44 }} />
      <AlleyTerminal x={480} y={690} typed={typed} files={files} done={f >= 38} f={f}
        s={0.96} z={60} />
      <Claudie x={344 + lean * 96} y={772 - lean * 22} s={1.16 + lean * 0.24} z={62} f={f}
        badge={0.9} walk={lean > 0 && lean < 1 ? 1 : 0} hero
        costume={{ glasses: 1, cheer: f > 36 ? 0.8 : 0 }} />
      <Contact x={300 + lean * 96} y={766 - lean * 22} w={116} z={20} o={0.30} />
      {/* the green wash the screen throws on wet brick, as a SOLID painted patch */}
      <div style={{ position: "absolute", left: 400, top: 756, width: 580, height: 68,
        borderRadius: "50%", background: mix("#33373C", 0.13), zIndex: 18 }} />
    </Scene>
  );
};

/* ================================================================== S6 ====
   12.44 -> 14.97s · 76f · THE FLY CATWALK · ESCALATE · LOCKED.
   Mechanism: A WALL OF SCRIPTS DROPS IN. Three ranks fly in on measured beats
   (f0 / f31 / f57 = "models like"), each 620px of travel.
   ------------------------------------------------------------------------ */
export const S6Fly: React.FC = () => {
  const f = useCurrentFrame();
  const b1 = E(f, 0, 24, 0, 1, OUT);
  const b2 = E(f, 31, 55, 0, 1, OUT);
  const b3 = E(f, 57, 76, 0, 1, OUT);
  const tally = (b1 > 0.6 ? 1 : 0) + (b2 > 0.6 ? 1 : 0) + (b3 > 0.6 ? 1 : 0);
  return (
    <Scene k="catwalk" slug="THE WHOLE RIG, NOT A HANDFUL" boards={false}
      push={[0, 76, 1.10]}>
      {/* the steel grid floor you can see through */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 560, bottom: 0, zIndex: 34,
        background: "repeating-linear-gradient(90deg,#3E566E 0 6px,transparent 6px 34px), repeating-linear-gradient(0deg,#3E566E 0 6px,transparent 6px 34px), linear-gradient(184deg,#26323F 0%,#131A22 100%)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 552, height: 12,
        background: "#4E687F", zIndex: 35 }} />
      {/* sandbags and the pin rail */}
      {[64, 208, 352].map((x, i) => (
        <div key={"sb" + x} style={{ position: "absolute", left: x, top: 470 + (i % 2) * 14,
          width: 62, height: 84, borderRadius: "10px 10px 18px 18px", background: "#3A4450",
          zIndex: 36 }} />
      ))}
      <div style={{ position: "absolute", left: 0, right: 0, top: 448, height: 15,
        background: "#4E687F", zIndex: 38 }} />
      {Array.from({ length: 14 }, (_, i) => (
        <div key={"pin" + i} style={{ position: "absolute", left: 30 + i * 70, top: 432,
          width: 11, height: 46, borderRadius: 5,
          background: i < tally * 5 ? "#8FB8E0" : "#2E3F52", zIndex: 39 }} />
      ))}
      <FlyBar y={92} drop={b1} n={6} z={40} label="ANTHROPIC · OPENAI" marks={ROSTER.slice(0, 6)} />
      <FlyBar y={236} drop={b2} n={6} z={42} label="GOOGLE · xAI · CURSOR" marks={ROSTER.slice(6, 12)} />
      <FlyBar y={380} drop={b3} n={6} z={44} label="18 COMPANIES · 184 PROMPTS"
        marks={[ROSTER[4], ROSTER[5], ROSTER[7], ROSTER[8], ROSTER[10], ROSTER[11]]} />
      <Claudie x={886} y={560} s={1.10} z={60} f={f} hero badge={0.9} costume={{ constr: 1 }} face={-1} />
      <Leg side="l" c="#1B2836" w={84} z={92} kind="rope" />
    </Scene>
  );
};

/* ================================================================== S7 ====
   14.97 -> 17.09s · 64f · THE CAST BOARD · ESCALATE · LOCKED.
   ⛔ A CARD MUST NEVER LIGHT BEFORE ITS NAME IS SPOKEN. The four onsets are
      449 / 458 / 472 / 486 measured, not an even stagger (reel 84 shipped that
      bug: four names on an i*9 stagger landed inside 0.9s of a 1.68s read).
   ------------------------------------------------------------------------ */
export const S7Cast: React.FC = () => {
  const f = useCurrentFrame();
  const CAST: [number, string, string, string, boolean][] = [
    [0,  "chatgpt_logo.png", "ChatGPT",  "gpt-5.6-sol.md",   true],
    [9,  "claude.svg",       "Claude",   "claude-fable-5.md", false],
    [23, "googlegemini.svg", "Gemini",   "gemini-3.1-pro.md", false],
    [37, "x.svg",            "Grok",     "grok-4.5.md",       false],
  ];
  return (
    <Scene k="green" slug="EVERY MODEL YOU ACTUALLY USE" push={[0, 64, 1.12]}>
      {/* the felt call-board */}
      <div style={{ position: "absolute", left: 38, top: 118, right: 38, height: 372,
        background: "linear-gradient(178deg,#3C5A49 0%,#25382C 100%)", border: "12px solid #6E5433",
        zIndex: 30, boxShadow: SH_D }} />
      {/* the green-room dressing: a kettle, mugs, a clock */}
      <div style={{ position: "absolute", left: 74, top: 560, width: 74, height: 86,
        borderRadius: "10px 10px 6px 6px", background: "#5E6E62", zIndex: 44 }} />
      <div style={{ position: "absolute", left: 168, top: 596, width: 44, height: 46,
        borderRadius: "4px 4px 18px 18px", background: "#C79A46", zIndex: 44 }} />
      <div style={{ position: "absolute", left: 232, top: 600, width: 44, height: 42,
        borderRadius: "4px 4px 18px 18px", background: "#8A6A32", zIndex: 44 }} />
      <div style={{ position: "absolute", left: 856, top: 548, width: 78, height: 78,
        borderRadius: 40, background: "#E4D6B4", border: "7px solid #6E5433", zIndex: 44 }} />
      <div style={{ position: "absolute", left: 890, top: 566, width: 6, height: 28,
        background: "#3B2E22", zIndex: 45 }} />
      <div style={{ position: "absolute", left: 892, top: 584, width: 24, height: 6,
        background: "#3B2E22", zIndex: 45 }} />
      {CAST.map(([t0, logo, name, file, png], i) => (
        <CastCard key={name} x={72 + i * 228} y={166} on={E(f, t0, t0 + 11, 0, 1, BACK)}
          logo={logo} name={name} file={file} png={png} s={1} z={60 + i} />
      ))}
      <Claudie x={506} y={780} s={1.0} z={58} f={f} hero badge={0.9} />
      <Lamp x={506} y={62} c="#F0D48A" s={0.9} z={40} f={f} flex={70} shade="#4A3A22" />
    </Scene>
  );
};

/* ================================================================== S8 ====
   17.09 -> 19.51s · 72f · THE STAGE, FROM THE WINGS · PAYOFF-1 · SLOW PUSH.

   ⛔⛔ THE FRAME MAKES NO CLAIM. The VO says the cheap models "perform just as
      well", and NOTHING published anywhere backs that, so there is no score, no
      meter, no tick and no comparison on screen. What the picture shows is an
      understudy holding the SAME CARD in front of the SAME HOUSE — the idea,
      not a result. Nothing here can be checked and found false.
   ------------------------------------------------------------------------ */
export const S8Same: React.FC = () => {
  const f = useCurrentFrame();
  const walk = E(f, 0, 26, 0, 1, IO);
  const lit = E(f, 22, 68, 0, 1, LIN);
  return (
    <Scene k="house" slug="THE SAME WORDS, A CHEAPER VOICE" push={[0, 72, 1.13]} boards={false}>
      {/* the house: six rows of CLAUDES, and the cheer wave travels back */}
      {/* the house lights come up as they rise, which is what makes forty clay
          sprites read against dark red plush */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 460, zIndex: 12,
        background: `linear-gradient(178deg, ${hexa("#F6D89A", 0.05 + lit * 0.16)} 0%, ${hexa("#F6D89A", 0)} 100%)` }} />
      {[128, 380, 632, 884].map((x, i) => (
        <div key={"hl" + x} style={{ position: "absolute", left: x, top: 34, zIndex: 16 }}>
          <div style={{ position: "absolute", left: 20, top: 0, width: 5, height: 34,
            background: "#5E3A20" }} />
          <div style={{ position: "absolute", left: 0, top: 34, width: 46, height: 20,
            borderRadius: "0 0 24px 24px", background: "#7A4A24" }} />
          <div style={{ position: "absolute", left: 10, top: 48, width: 26, height: 9,
            borderRadius: 5, background: "#F6D89A", opacity: 0.3 + lit * 0.7 }} />
        </div>
      ))}
      <Seats y={352} lit={lit} rows={6} z={20} f={f} wave={E(f, 22, 66, 0, 1, LIN)} />
      <Cheer f={f} start={28} n={30} z={86} />
      {/* the boards he walks out onto */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 452, bottom: 0,
        background: "linear-gradient(184deg,#7E5430 0%,#3A2410 100%)", zIndex: 30 }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 444, height: 12,
        background: "#9A6A36", zIndex: 31 }} />
      {Array.from({ length: 8 }, (_, i) => (
        <div key={"bd" + i} style={{ position: "absolute", left: 0, right: 0,
          top: 488 + i * (24 + i * 8), height: 3, background: "#5E3C1C", zIndex: 32 }} />
      ))}
      {/* the spot narrows onto him */}
      <Cone f={f} x={352 + walk * 176} y={-30} top={90} bot={620 - lit * 220} len={560}
        c="#F6D89A" o={0.24} z={26} sway={0.4} />
      {/* THE UNDERSTUDY, walking on with the SAME card from S0 */}
      <Claudie x={230 + walk * 292} y={706} s={1.06 + walk * 0.42} z={62} f={f} badge={1}
        walk={walk < 1 ? 1 : 0} hero costume={{ cheer: walk > 0.9 ? 0.7 : 0 }} />
      <div style={{ position: "absolute", left: 0, top: 0, zIndex: 64,
        transform: `translate(${290 + walk * 292}px, ${556 - walk * 26}px) rotate(-7deg)` }}>
        <PromptCard x={0} y={0} s={0.44} z={64} f={f} lines={5} />
      </div>
      <Contact x={176 + walk * 292} y={700} w={124 + walk * 46} z={28} o={0.30} />
      <Footlights y={430} f={f} z={36} on={0.7} />
      <Leg side="l" c="#3A1014" w={124} z={92} />
    </Scene>
  );
};

/* ================================================================== S9 ====
   19.51 -> 20.71s · 36f · THE BOX OFFICE · PAYOFF-2 · LOCKED.
   ⛔ NO CURRENCY AND NO FIGURE. Price is a BAR LENGTH; the payoff is the
      LICENCE, which is a verified fact.
   ------------------------------------------------------------------------ */
export const S9Price: React.FC = () => {
  const f = useCurrentFrame();
  const flip = E(f, 4, 34, 0, 1, IO);
  return (
    <Scene k="boxoff" slug="CC0 · NO LICENCE TERMS AT ALL" push={[0, 36, 1.11]}>
      {/* the brass grille and the marble sill */}
      <div style={{ position: "absolute", left: 46, top: 96, right: 46, height: 420,
        background: "#2E2418", border: "10px solid #B8973E", zIndex: 30, boxShadow: SH_D }} />
      {[0, 1, 2, 3].map((i) => (
        <React.Fragment key={"gr" + i}>
          <div style={{ position: "absolute", left: 66 + i * 46, top: 106, width: 9, height: 400,
            background: "#B8973E", zIndex: 40 }} />
          <div style={{ position: "absolute", right: 66 + i * 46, top: 106, width: 9, height: 400,
            background: "#B8973E", zIndex: 40 }} />
        </React.Fragment>
      ))}
      <div style={{ position: "absolute", left: 20, top: 516, right: 20, height: 40,
        borderRadius: 6, background: "linear-gradient(178deg,#D8CCB4 0%,#9E9280 100%)", zIndex: 44 }} />
      <PriceBoard x={252} y={132} flip={flip} s={1.12} z={60} />
      <Claudie x={854} y={782} s={1.16} z={62} f={f} hero badge={0.9} costume={{ cheer: flip > 0.8 ? 0.8 : 0 }} />
      <Lamp x={506} y={40} c="#FFEEC0" s={0.8} z={26} f={f} flex={54} shade="#5E4A2E" />
    </Scene>
  );
};

/* ================================================================= S10 ====
   20.71 -> 22.48s · 53f · THE FOYER · CTA · LOCKED, SYMMETRICAL.
   ⛔ THE CTA GRAPHIC GETS ITS OWN COLUMN — the gate will not catch a buried CTA.
      The keyword strikes on its own MEASURED onset, which is this scene's f0.
   ------------------------------------------------------------------------ */
export const S10Cta: React.FC = () => {
  const f = useCurrentFrame();
  const on = Math.max(0, Math.min(16, Math.floor(f / 1.5)));
  const card = E(f, 14, 44, 0.56, 1.04, BACK);
  const lift = E(f, 14, 48, 150, -10, LIN);
  return (
    <Scene k="foyer" slug="asgeirtj / system_prompts_leaks" push={[0, 53, 1.09]}>
      {/* the foyer wall, the rail and the rope */}
      <div style={{ position: "absolute", left: 62, top: 92, right: 62, height: 404,
        background: "linear-gradient(178deg,#6A3238 0%,#3A181C 100%)", zIndex: 28 }} />
      {[150, 902].map((x) => (
        <div key={"po" + x} style={{ position: "absolute", left: x, top: 500, width: 22,
          height: 150, background: "#B8973E", zIndex: 44 }} />
      ))}
      <div style={{ position: "absolute", left: 160, top: 512, width: 714, height: 13,
        borderRadius: 7, background: "#8E2E32", zIndex: 44,
        transform: `translateY(${18 + Math.sin(f / 22) * 3}px)` }} />
      <Marquee x={196} y={196} text={'COMMENT "TOOLS"'} on={on} f={f} s={0.96} z={60} />
      {/* LEFT COLUMN: the owner handing it over. RIGHT: the card. */}
      <div style={{ position: "absolute", left: 0, top: 0, zIndex: 62 }}>
        <Claudie x={128} y={786} s={1.16} z={62} f={f} hero badge={1} costume={{ cheer: 0.9 }} />
      </div>
      <Contact x={72} y={780} w={118} z={20} o={0.26} />
      <div style={{ position: "absolute", left: 322, top: 402 + lift, zIndex: 80,
        transform: `scale(${card})`, transformOrigin: "50% 50%" }}>
        <RepoCard x={0} y={0} s={1} z={80} />
      </div>
      <Lamp x={506} y={44} c="#F4D89C" s={0.86} z={26} f={f} flex={50} shade="#5A3A2A" />
    </Scene>
  );
};
