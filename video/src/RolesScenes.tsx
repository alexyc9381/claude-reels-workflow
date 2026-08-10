import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { inter } from "./fonts";
import { Bg, Panel, ProgressBar, Caption, AssemblyCtx, hexA } from "./SlopKit";
import { Worker } from "./RolesWorld";
import {
  Arena, Lamp, Spot, BigBoard, Podium, PickCard, Lower, DChip, Confetti, Crowd, Ribbon,
  Banner, BCam, PICKS, DEPTS, PW, PH,
  NIGHT, NIGHT_D, NIGHT_L, DECK, DECK_L, DECK_D, POOL, BOARD_L, BOARDC, CARD, INKD, MUTE,
  RED, RED_D, AMBER, GO, BLUE, PLUM, TEAL, TRUSS, TRUSS_D,
} from "./DraftWorld";
import { RepoPage, Jumbotron, Octocat, CloneCard, CopilotUI, REPO_NAME, REPO_OWNER } from "./RolesGitHub";
import { CursorUI, ClaudeCodeUI } from "./KeyEditors";
import { TOOLS, ToolLogo, ToolTile, ChatCompose, LandingPage, ShotClock, BriefEditor } from "./RolesUI";
import { E, osc, rnd, OUT, IO, BACK, IN_Q, SH, SH_D } from "./MissionWorld";

/* =========================================================================
   REEL 84 "ROLES" · THE BODY.

   One location per beat — a themed room reused for a whole reel reads as
   boring and gets rejected (memory `feedback_reel_vary_the_locations`):

     S1 the stage, four picks called      S5 the tunnel interview position
     S2 the green room, kit already packed S6 the arena AFTER, house lights dead
     S3 the press row, three tool booths   S7 the stage, confetti
     S4 centre deck, the build

   Every figure is a costumed Claude mascot. Every scene keeps the dark world
   so the spotlight can rank the frame — the thing the roster-wall version
   could not do (1.27 measured, vs 2.4+ here).

   Scenes render CHASSIS-FREE under AssemblyCtx: ROOT owns the bg, the rail and
   the one karaoke caption track.
   ========================================================================= */

/**
 * Per-variant camera, applied INSIDE the Panel.
 *
 * ⛔ The first attempt transformed the whole composition. That scaled the cream
 * background and moved the Panel off its fixed chassis position, and it
 * measurably wrecked the motion audit (KEY S4split: 8.12 at scale 1.0, 3.72 at
 * 1.038) by changing how much static background sat in frame. Transforming the
 * panel CONTENTS varies the picture the viewer sees while the chassis — bg,
 * rail, panel rect — stays byte-identical across variants, which is the point.
 */
export const CamCtx = React.createContext<{ z: number; dx: number; dy: number }>(
  { z: 1, dx: 0, dy: 0 });

const Chassis: React.FC<{ children: React.ReactNode; cap?: string[]; hot?: number }> =
  ({ children, cap, hot }) => {
  const solo = !React.useContext(AssemblyCtx);
  const cam = React.useContext(CamCtx);
  return (
    <AbsoluteFill>
      {solo && <><Bg /><ProgressBar /></>}
      <Panel glow={hexA(AMBER, 0.2)}>
        <div style={{ position: "absolute", inset: 0,
          transform: `scale(${cam.z}) translate(${cam.dx}px, ${cam.dy}px)`,
          transformOrigin: "50% 54%" }}>{children}</div>
      </Panel>
      {solo && cap && <Caption words={cap} hot={hot} />}
    </AbsoluteFill>
  );
};

/**
 * An internal shot. `a`/`b` are frames INSIDE the scene.
 * `pan` (px) + `len` add a CONTINUOUS camera truck across the shot's whole
 * length. The entrance zoom eases out by frame 30 and then holds, which is why
 * a long shot still reads as frozen — the audit measured S6 at 3.66 with the
 * zoom already in place.
 */
const Sh: React.FC<{ f: number; a: number; b: number; k?: number; pan?: number; len?: number;
  children: React.ReactNode }> = ({ f, a, b, k = 0, pan = 0, len, children }) => {
  if (f < a || f >= b) return null;
  const t = Math.min(1, (f - a) / 30), e = t * t * (3 - 2 * t);
  const z = [1.06 - e * 0.05, 1.01 + e * 0.05, 1.04 - e * 0.035, 1.02 + e * 0.045][k % 4];
  const dx = [0, -8, 7, -5][k % 4] * (1 - e);
  const prog = len ? Math.min(1, (f - a) / len) : 0;
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden",
      transform: `scale(${z + (pan ? 0.07 : 0)}) translateX(${dx + pan * prog}px)`,
      transformOrigin: "50% 56%" }}>{children}</div>
  );
};

/* ============================================================ S1 · ROSTER ==
   "An engineer, a designer, a marketer, a lawyer — 20 different departments."
   The four are CALLED, one pool at a time, then the camera finds all 20 banners.
   ========================================================================== */
export const S1Roster: React.FC = () => {
  const f = useCurrentFrame();
  const A = 64;
  /* ⛔ MEASURED onsets, not an even stagger. "engineer / designer / marketer /
     lawyer" is spoken across 1.68s; a flat i*9 landed all four inside 0.9s and
     the last two lit before the VO named them. */
  const CALL = [5, 22, 36, 50];
  return (
    <Chassis cap={["An", "engineer,", "a", "designer"]} hot={1}>
      {/* 1 · four pools light in sequence, one per name in the VO */}
      <Sh f={f} a={0} b={A} k={0}>
        <Arena f={f} horizon={604} detail cams
               banners={[DEPTS[0], DEPTS[1], DEPTS[2], DEPTS[3]]}
               ribbon="ON THE CLOCK · ROUND 1 · " />
        {PICKS.map((r, i) => {
          const on = f > CALL[i];
          const t = E(f, CALL[i], CALL[i] + 13, 0, 1, BACK);
          return (
            <React.Fragment key={r.name}>
              <Lamp x={116 + i * 240} y={96} on={on} z={12} />
              {on && <Spot cx={134 + i * 240} top={126} floor={604} w={216} spread={0.16} z={10} />}
              {on && (
                <Worker f={f + i * 8} x={44 + i * 240} y={392 + (1 - t) * 230} size={182}
                        prop={r.prop} gaze={0} cheer={0.7} nodAmp={3} nodSpeed={10 + i} z={20 + i} />
              )}
              {on && (
                <Lower x={30 + i * 240} y={628} w={210} name={r.name} c={r.c}
                       t={E(f, CALL[i] + 5, CALL[i] + 12, 0, 1, OUT)} z={30} />
              )}
            </React.Fragment>
          );
        })}
      </Sh>

      {/* 2 · pull wide — twenty banners, the whole roof of the bowl */}
      <Sh f={f} a={A} b={9999} k={1}>
        <Arena f={f} horizon={660} detail={false} truss={false} />
        <Crowd f={f} y={286} rows={4} per={44} scale={0.62} phones={8} z={3} />
        <Ribbon f={f} y={396} text="20 DIVISIONS · 268 AGENTS · " z={5} />
        <Crowd f={f} y={430} rows={2} per={32} scale={0.9} phones={10} z={3} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 42, height: 14,
          background: TRUSS, zIndex: 8 }} />
        {DEPTS.map((d, i) => {
          const col = i % 10, row = Math.floor(i / 10);
          const t = E(f, A + 1 + (i % 10) * 1.4, A + 11 + (i % 10) * 1.4, 0, 1, OUT);
          return (
            <div key={d} style={{ position: "absolute", left: 12 + col * 100, top: 56 + row * 122,
              zIndex: 9, transformOrigin: "50% 0%",
              transform: `scaleY(${Math.max(0.02, t)})` }}>
              <Banner f={f} x={0} y={0} h={112} text={d} c={[BLUE, PLUM, AMBER, GO, TEAL][i % 5]}
                      s={1.02} z={9} />
            </div>
          );
        })}
        <DChip y={620} text="20 DEPARTMENTS" c={PLUM} size={40} />
      </Sh>
    </Chassis>
  );
};

/* ========================================================= S2 · GREEN ROOM ==
   "Each one already knows its job and what it should give back to you."
   Backstage: every locker is already packed. Nobody is being briefed.
   ========================================================================== */
export const S2Ready: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Chassis cap={["Each", "one", "already", "knows"]} hot={2}>
      <div style={{ position: "absolute", inset: 0, background: "#1A2430" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 150, background: "#121A24" }} />
      {/* strip lights down the corridor */}
      {[0, 1, 2, 3].map((i) => (
        <div key={i} style={{ position: "absolute", left: 40 + i * 250, top: 34, width: 170, height: 13,
          borderRadius: 7, background: "#F3E4BE", zIndex: 4 }} />
      ))}
      {/* the deck */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 596, bottom: 0,
        background: "#232F3B", zIndex: 4 }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 596, height: 7,
        background: "#2E3D4B", zIndex: 5 }} />
      {/* a wall of open lockers, each already kitted */}
      {Array.from({ length: 5 }, (_, i) => {
        const r = PICKS[i % 4];
        const open = E(f, 4 + i * 5, 22 + i * 5, 0, 1, OUT);
        return (
          <div key={i} style={{ position: "absolute", left: 22 + i * 196, top: 176, width: 168,
            height: 400, zIndex: 8 }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: 7, background: "#2B3947" }} />
            <div style={{ position: "absolute", left: 14, top: 16, right: 14, height: 250,
              borderRadius: 5, background: "#1B2732" }} />
            {/* the kit inside: a brief, a tool, a badge — already there */}
            <div style={{ position: "absolute", left: 30, top: 34, width: 60, height: 78,
              borderRadius: 4, background: CARD, opacity: open }} />
            <div style={{ position: "absolute", left: 100, top: 34, width: 42, height: 42,
              borderRadius: 4, background: r.c, opacity: open }} />
            <div style={{ position: "absolute", left: 30, top: 126, width: 112, height: 12,
              borderRadius: 3, background: "#3E4E5F", opacity: open }} />
            <div style={{ position: "absolute", left: 30, top: 148, width: 78, height: 12,
              borderRadius: 3, background: "#3E4E5F", opacity: open }} />
            <div style={{ position: "absolute", left: 30, top: 186, width: 112, height: 54,
              borderRadius: 5, background: r.c, opacity: open }} />
            {/* the door, swinging open */}
            <div style={{ position: "absolute", left: 14, top: 16, width: 140, height: 250,
              borderRadius: 5, background: "#38485A", transformOrigin: "0% 50%",
              transform: `perspective(420px) rotateY(${-open * 78}deg)` }}>
              <div style={{ position: "absolute", left: 12, top: 18, right: 12, height: 6,
                background: "#2B3947" }} />
              <div style={{ position: "absolute", left: 12, top: 34, right: 12, height: 6,
                background: "#2B3947" }} />
              <div style={{ position: "absolute", right: 12, top: 118, width: 12, height: 12,
                borderRadius: "50%", background: "#4E5F71" }} />
            </div>
            {/* the name plate */}
            <div style={{ position: "absolute", left: 14, top: 284, width: 140, height: 34,
              borderRadius: 5, background: r.c, fontFamily: inter.fontFamily, fontWeight: 900,
              fontSize: 15, letterSpacing: "0.08em", color: "#FFF8ED", textAlign: "center",
              lineHeight: "34px" }}>{r.name}</div>
            {/* the tick — it is ALREADY ready */}
            <div style={{ position: "absolute", left: 62, top: 332, width: 44, height: 44,
              borderRadius: "50%", background: GO,
              transform: `scale(${E(f, 16 + i * 5, 26 + i * 5, 0, 1, BACK)})`,
              fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 26, color: "#EAFBF3",
              textAlign: "center", lineHeight: "44px" }}>✓</div>
          </div>
        );
      })}
      {/* the hero walks the corridor the whole scene — nobody needs briefing */}
      <Worker f={f} x={-210 + f * 16} y={396} size={196} prop="suit" gaze={0} cheer={0.5}
              nodAmp={5.5} nodSpeed={6} z={24} />
      <DChip y={636} text="ALREADY BRIEFED" c={GO} size={40} />
    </Chassis>
  );
};

/* ============================================================== S3 · TOOLS ==
   "It works in Claude Code, Cursor, Copilot — 18 tools in total."
   The press row: three booth monitors, each running the real product's UI.
   ========================================================================== */
export const S3Tools: React.FC = () => {
  const f = useCurrentFrame();
  const A = 52;
  const Booth: React.FC<{ x: number; label: string; logo: string; c: string; t: number;
    children: React.ReactNode }> = ({ x, label, logo, c, t, children }) => (
    <div style={{ position: "absolute", left: x, top: 216 + (1 - t) * 260, width: 300, zIndex: 16,
      opacity: t }}>
      <div style={{ position: "absolute", left: -10, top: -10, width: 320, height: 240,
        borderRadius: 10, background: "#2A3644" }} />
      <div style={{ position: "absolute", left: 0, top: 0, width: 300, height: 220,
        borderRadius: 6, overflow: "hidden", background: "#0E1620" }}>{children}</div>
      {/* the OFFICIAL mark rides the label plate — a coloured bar naming a product
          is not the same as showing the product (memory `reel-brand-logo-sourcing`) */}
      <div style={{ position: "absolute", left: 30, top: 244, width: 240, height: 44, borderRadius: 7,
        background: CARD, boxShadow: SH_D, display: "flex", alignItems: "center",
        justifyContent: "center", gap: 10 }}>
        <ToolLogo slug={logo} s={24} />
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 18,
          letterSpacing: "0.06em", color: INKD, whiteSpace: "nowrap" }}>{label}</div>
      </div>
      <div style={{ position: "absolute", left: 30, top: 244, width: 240, height: 5,
        borderRadius: "7px 7px 0 0", background: c }} />
      <div style={{ position: "absolute", left: 142, top: 232, width: 16, height: 14, background: "#2A3644" }} />
    </div>
  );
  return (
    <Chassis cap={["It", "works", "in", "Claude Code"]} hot={3}>
      {/* 1 · three booths drop in, one per product named */}
      <Sh f={f} a={0} b={A} k={2}>
        <Arena f={f} horizon={640} detail cams
               banners={[DEPTS[12], DEPTS[13], DEPTS[14], DEPTS[15]]}
               ribbon="WORKS IN 18 TOOLS · " />
        <Booth x={22}  label="CLAUDE CODE" logo="claude" c={AMBER} t={E(f, 1, 16, 0, 1, BACK)}>
          <ClaudeCodeUI f={f} w={300} h={220} at={2} />
        </Booth>
        <Booth x={356} label="CURSOR" logo="cursor" c={BLUE} t={E(f, 7, 22, 0, 1, BACK)}>
          <CursorUI f={f} w={300} h={220} at={8} />
        </Booth>
        <Booth x={690} label="COPILOT" logo="githubcopilot" c={PLUM} t={E(f, 13, 28, 0, 1, BACK)}>
          <CopilotUI f={f} w={300} h={220} at={14} />
        </Booth>
        {/* the same roster reaches all three: a card flies out of each booth and
            stacks at centre. Real travel (~330px), not a settle-and-hold. */}
        {[0, 1, 2].map((i) => {
          const t = E(f, 30 + i * 4, 48 + i * 4, 0, 1, OUT);
          if (t <= 0) return null;
          return (
            <div key={i} style={{ position: "absolute",
              left: 78 + i * 334 + (426 - (78 + i * 334)) * t,
              top: 300 + 268 * t, width: 148, height: 96, borderRadius: 9, zIndex: 30,
              background: CARD, boxShadow: SH_D,
              transform: `rotate(${(i - 1) * 9 * (1 - t)}deg)` }}>
              <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 24,
                borderRadius: "8px 8px 0 0", background: [AMBER, BLUE, PLUM][i] }} />
              <div style={{ position: "absolute", left: 0, right: 0, top: 38, textAlign: "center",
                fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 26, color: INKD }}>268</div>
            </div>
          );
        })}
      </Sh>

      {/* 2 · the 18 — a rack of tool tiles filling, the number moving to its value */}
      <Sh f={f} a={A} b={9999} k={3}>
        <Arena f={f} horizon={648} detail={false} truss={false} />
        <Crowd f={f} y={216} rows={3} per={40} scale={0.66} phones={7} z={3} />
        <Ribbon f={f} y={232} text="18 TOOLS · ONE ROSTER · " z={5} />
        {/* eighteen REAL brand marks, from the local pack — never coloured squares */}
        <div style={{ position: "absolute", left: 44, top: 344, width: 924, height: 366, zIndex: 14 }}>
          {TOOLS.map((tool, i) => (
            <ToolTile key={tool.slug} x={(i % 6) * 154} y={Math.floor(i / 6) * 122}
                      w={140} h={110} slug={tool.slug} name={tool.name}
                      c={[AMBER, BLUE, PLUM, GO, TEAL, RED][i % 6]}
                      t={E(f, A + 1 + i * 1.1, A + 11 + i * 1.1, 0, 1, BACK)} z={20} />
          ))}
        </div>
        <DChip y={282} text="18 TOOLS" c={AMBER} size={44} />
      </Sh>
    </Chassis>
  );
};

/* ================================================================ S4 · JOB ==
   "Ask it for something like a landing page and the designer, the writer and
    the engineer all show up and split the work between them."
   Centre deck: the job lands, three pools fire, the page gets built in thirds.
   ========================================================================== */
export const S4Job: React.FC = () => {
  const f = useCurrentFrame();
  const A = 50, B = 100;
  return (
    <Chassis cap={["Ask", "it", "for", "a landing page"]} hot={3}>
      {/* 1 · the job lands on the podium */}
      <Sh f={f} a={0} b={A} k={0}>
        <Arena f={f} horizon={598} detail cams
               banners={[DEPTS[4], DEPTS[16], DEPTS[17], DEPTS[18]]}
               ribbon="NOW ON THE CLOCK · " />
        <Lamp x={488} y={96} on z={12} />
        <Spot cx={506} top={126} floor={598} w={440} spread={0.16} z={10} />
        <Podium f={f} x={382} y={430} s={1} c={RED_D} z={20} />
        <div style={{ position: "absolute", left: 236, top: 214 - (1 - E(f, 2, 20, 0, 1, BACK)) * 340,
          width: 540, height: 158, borderRadius: 14, background: CARD, boxShadow: SH_D, zIndex: 26 }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 18, textAlign: "center",
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 21, letterSpacing: "0.2em",
            color: MUTE }}>THE JOB</div>
          <div style={{ position: "absolute", left: 0, right: 0, top: 58, textAlign: "center",
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 56, letterSpacing: "-0.03em",
            color: INKD }}>a landing page</div>
        </div>
      </Sh>

      {/* 2 · three pools fire — the roster picks itself */}
      <Sh f={f} a={A} b={B} k={1}>
        <Arena f={f} horizon={604} detail cams={false}
               banners={[DEPTS[1], DEPTS[13], DEPTS[0], DEPTS[5]]} />
        {[0, 1, 2].map((i) => {
          const on = f > A + 2 + i * 8;
          const t = E(f, A + 2 + i * 8, A + 18 + i * 8, 0, 1, BACK);
          const r = [PICKS[1], PICKS[0], PICKS[2]][i];
          return (
            <React.Fragment key={i}>
              <Lamp x={172 + i * 306} y={96} on={on} z={12} />
              {on && <Spot cx={190 + i * 306} top={126} floor={604} w={272} spread={0.16} z={10} />}
              {on && (
                <Worker f={f + i * 9} x={82 + i * 306} y={368 + (1 - t) * 240} size={222}
                        prop={r.prop} gaze={0} cheer={0.75} nodAmp={3} nodSpeed={10 + i} z={20 + i} />
              )}
              {on && (
                <Lower x={62 + i * 306} y={638} w={252} name={i === 1 ? "WRITER" : r.name}
                       c={r.c} t={E(f, A + 9 + i * 8, A + 16 + i * 8, 0, 1, OUT)} z={30} />
              )}
            </React.Fragment>
          );
        })}
        <DChip y={132} text="THREE SHOW UP" c={GO} size={38} />
      </Sh>

      {/* 3 · they SPLIT it — the page assembles in three labelled bands */}
      <Sh f={f} a={B} b={9999} k={2}>
        <Arena f={f} horizon={664} detail={false} truss={false} />
        <Crowd f={f} y={158} rows={2} per={36} scale={0.6} phones={6} z={3} />
        <Ribbon f={f} y={232} text="SPLIT BETWEEN THEM · " z={5} />
        <LandingPage f={f} x={196} y={286} w={620} h={400} at={B} z={20} />
        <DChip y={706} text="ONE PAGE, THREE HANDS" c={GO} size={36} />
      </Sh>
    </Chassis>
  );
};

/* ========================================================== S5 · NO BRIEF ==
   "You never have to explain what a good designer would do — one is already
    in there."  The tunnel interview position: the lower third answers first.
   ========================================================================== */
export const S5NoBrief: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Chassis cap={["You", "never", "have", "to explain"]} hot={3}>
      {/* a tunnel, not the bowl — new light, new geometry */}
      <div style={{ position: "absolute", inset: 0, background: "#131C26" }} />
      {Array.from({ length: 8 }, (_, i) => {
        const ph = ((f / 52) + i / 8) % 1;            // sweeps outward, then recycles
        const sc = 0.24 + ph * 1.55;
        const w = 470 * sc, h = 430 * sc;
        return (
          <div key={i} style={{ position: "absolute", left: PW / 2 - w / 2, top: 356 - h / 2,
            width: w, height: h, borderRadius: 14 * sc,
            border: `${8 * sc}px solid ${i % 2 ? "#1B2733" : "#20303E"}`, zIndex: 3 }} />
        );
      })}
      <div style={{ position: "absolute", left: 0, right: 0, top: 604, bottom: 0,
        background: "#1E2A36", zIndex: 4 }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 604, height: 6,
        background: "#293846", zIndex: 5 }} />
      {/* the camera light on the subject */}
      <Spot cx={620} top={130} floor={604} w={380} spread={0.2} z={6} />
      <BCam f={f} x={22} y={430} s={1.05} z={14} />

      {/* the brief someone STARTS to type, in a real editor — and abandons */}
      <div style={{ position: "absolute", left: 46, top: 200 + E(f, 54, 84, 0, 780, IN_Q),
        zIndex: 18, transform: `rotate(${E(f, 54, 84, 0, 22, IN_Q)}deg)`,
        transformOrigin: "50% 0%" }}>
        <BriefEditor f={f} x={0} y={0} w={430} h={252} at={2} z={18} />
      </div>
      {/* struck through — the brief was never needed */}
      <div style={{ position: "absolute", left: 62, top: 314 + E(f, 54, 84, 0, 780, IN_Q),
        height: 9, background: RED, zIndex: 26, borderRadius: 4,
        width: E(f, 40, 54, 0, 400, OUT) }} />

      <Worker f={f} x={506 - E(f, 56, 88, 0, 130, OUT)} y={314 - E(f, 56, 88, 0, 34, OUT)}
              size={268 + E(f, 56, 88, 0, 64, OUT)} prop="glasses" gaze={0} cheer={0.55}
              nodAmp={3} nodSpeed={10} z={20} />
      <Lower x={496} y={646} w={310} name="DESIGNER" dept="ALREADY IN THERE" c={PLUM}
             t={E(f, 12, 22, 0, 1, OUT)} z={30} />
      <DChip y={130} text="NO BRIEF NEEDED" c={GO} size={40} />
    </Chassis>
  );
};

/* ====================================================== S6 · EVERYONE ELSE ==
   "While everyone else opens an empty chat and burns five minutes describing
    the person they wish they were talking to, you already have all of the
    experts in one place."
   The arena AFTER: house lights dead, stands empty, one figure alone.
   ========================================================================== */
export const S6Alone: React.FC = () => {
  const f = useCurrentFrame();
  const A = 56, B = 112;
  return (
    <Chassis cap={["While", "everyone", "else", "opens an empty chat"]} hot={3}>
      {/* 1 · the empty bowl. Every seat visible, nobody in it. */}
      <Sh f={f} a={0} b={A} k={0} pan={-104} len={A}>
        <div style={{ position: "absolute", inset: 0, background: "#0F161F" }} />
        {/* empty seat rows — the crowd's negative */}
        {Array.from({ length: 5 }, (_, r) => (
          <React.Fragment key={r}>
            {Array.from({ length: 30 }, (_, i) => (
              <div key={i} style={{ position: "absolute", left: i * 34 + (r % 2 ? 12 : 0),
                top: 132 + r * 42, width: 24, height: 18, borderRadius: "5px 5px 0 0",
                background: r < 2 ? "#182430" : "#1C2836", zIndex: 3 }} />
            ))}
            <div style={{ position: "absolute", left: 0, right: 0, top: 150 + r * 42, height: 4,
              background: "#141E28", zIndex: 3 }} />
          </React.Fragment>
        ))}
        {/* the ribbon, dead — no scroll, no colour */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 396, height: 30,
          background: "#101A24", borderTop: "2px solid #1A2632", borderBottom: "2px solid #1A2632",
          zIndex: 5 }} />
        {Array.from({ length: 26 }, (_, i) => (
          <div key={`rb${i}`} style={{ position: "absolute", left: 8 + i * 39, top: 406, width: 22,
            height: 10, background: "#18242F", zIndex: 6 }} />
        ))}
        {/* the rail, then the deck */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 470, height: 6,
          background: "#1B2632", zIndex: 5 }} />
        {Array.from({ length: 18 }, (_, i) => (
          <div key={`p${i}`} style={{ position: "absolute", left: i * 58, top: 470, width: 4,
            height: 22, background: "#16202B", zIndex: 5 }} />
        ))}
        <div style={{ position: "absolute", left: 0, right: 0, top: 540, bottom: 0,
          background: "#16202B", zIndex: 4 }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 540, height: 5,
          background: "#1D2833", zIndex: 5 }} />
        {/* dead lamps on a dead truss */}
        {[0, 1, 2, 3].map((i) => <Lamp key={i} x={96 + i * 236} y={78} on={false} z={12} />)}
        <div style={{ position: "absolute", left: 0, right: 0, top: 44, height: 13,
          background: "#212C38", zIndex: 8 }} />
        {/* the jumbotron, powered down — the repo is not on it for THEM */}
        <div style={{ position: "absolute", left: 704, top: 118, width: 268, height: 140, zIndex: 9,
          background: "#0A1119", borderRadius: 7, border: "6px solid #1D2833" }} />
        {/* the podium nobody is standing at, and the paper left on the deck */}
        <Podium f={f} x={64} y={478} s={0.72} c={"#2A2A2A"} z={14} />
        {Array.from({ length: 9 }, (_, i) => (
          <div key={`sh${i}`} style={{ position: "absolute", left: 190 + rnd(i, 3) * 700,
            top: 596 + rnd(i, 8) * 150, width: 34, height: 24, borderRadius: 2,
            background: "#26313C", transform: `rotate(${(rnd(i, 5) - 0.5) * 60}deg)`, zIndex: 9 }} />
        ))}
        {/* one figure, alone — he crosses the whole empty deck (610px of travel) */}
        <Worker f={f} x={168 + E(f, 0, 56, 0, 610, IO)} y={396} size={158} prop="glasses" gaze={0}
                stern={0.5} nodAmp={4.5} nodSpeed={7} z={20} />
        {/* the paper he left behind, blowing across */}
        {Array.from({ length: 5 }, (_, i) => (
          <div key={`bw${i}`} style={{ position: "absolute",
            left: 1040 - ((f * (7 + i * 2) + i * 260) % 1300), top: 520 + rnd(i, 4) * 200,
            width: 30, height: 22, borderRadius: 2, background: "#2C3844",
            transform: `rotate(${f * (3 + i)}deg)`, zIndex: 10 }} />
        ))}
        <ChatCompose f={f} x={286 + E(f, 0, 56, 0, 300, IO)} y={216} w={430} dead z={18} />
        <DChip y={648} text="EVERYONE ELSE" c={RED} size={40} />
      </Sh>

      {/* 2 · five minutes BURN — the clock is the graphic, not the caption */}
      <Sh f={f} a={A} b={B} k={1} pan={92} len={B - A}>
        <div style={{ position: "absolute", inset: 0, background: "#0F161F" }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 560, bottom: 0,
          background: "#16202B", zIndex: 4 }} />
        <ShotClock f={f} x={62} y={126} s={1.05} z={20}
                   secs={300 - E(f, A, B - 6, 0, 300, IO)} />
        <BriefEditor f={f} x={344} y={112} w={520} h={318} at={A + 2} z={20} />
        {(() => {
          const k = (f - A) / 56, tri = k < 0.5 ? k * 2 : 2 - k * 2;   // paces there and back
          return (
            <Worker f={f} x={40 + tri * 560} y={442} size={168} prop="glasses" gaze={0} stern={0.7}
                    nodAmp={5} nodSpeed={6} flip={k >= 0.5} z={20} />
          );
        })()}
        {/* the five minutes draining — full panel width, so the time is the GRAPHIC */}
        <div style={{ position: "absolute", left: 0, top: 704, width: PW, height: 26,
          background: "#1A2430", zIndex: 16 }} />
        <div style={{ position: "absolute", left: 0, top: 704, height: 26, zIndex: 17,
          width: PW * (1 - Math.min(1, (f - A) / (B - A - 6))), background: RED }} />
        <DChip y={640} text="FIVE MINUTES, EVERY TIME" c={RED} size={34} />
      </Sh>

      {/* 3 · you, meanwhile. The bowl is full and lit again. */}
      <Sh f={f} a={B} b={9999} k={2}>
        <Arena f={f} horizon={604} detail cams
               banners={[DEPTS[1], DEPTS[0], DEPTS[2], DEPTS[3]]}
               ribbon="ALL OF THEM · ONE PLACE · " />
        {[0, 1, 2].map((i) => <Lamp key={i} x={172 + i * 306} y={96} on z={12} />)}
        {[0, 1, 2].map((i) => (
          <Spot key={i} cx={190 + i * 306} top={126} floor={604} w={272} spread={0.16} z={10} />
        ))}
        {[PICKS[1], PICKS[0], PICKS[2]].map((r, i) => (
          <React.Fragment key={r.name}>
            <Worker f={f + i * 9} x={82 + i * 306}
                    y={368 + (1 - E(f, B + 1 + i * 6, B + 20 + i * 6, 0, 1, BACK)) * 270}
                    size={222} prop={r.prop} gaze={0}
                    cheer={0.85} nodAmp={3.4} nodSpeed={9 + i} z={20 + i} />
            <Lower x={62 + i * 306} y={638} w={252} name={r.name} c={r.c}
                   t={E(f, B + 2 + i * 4, B + 10 + i * 4, 0, 1, OUT)} z={30} />
          </React.Fragment>
        ))}
        <Confetti f={f} at={B + 14} n={38} z={38} />
        <DChip y={132} text="YOU: ALL 268, WAITING" c={GO} size={36} />
      </Sh>
    </Chassis>
  );
};

/* ================================================================ S7 · CTA ==
   "Comment ROLES and I'll send you the repo."
   ========================================================================== */
export const S7Cta: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Chassis cap={["Comment", "ROLES"]} hot={1}>
      <Arena f={f} horizon={646} detail cams
             banners={[DEPTS[0], DEPTS[1], DEPTS[2], DEPTS[3]]}
             ribbon="COMMENT ROLES · COMMENT ROLES · " />
      <Spot cx={506} top={120} floor={646} w={620} spread={0.2} z={10} />
      {/* the CTA gets its OWN column — a buried CTA passes the gate and dies */}
      <div style={{ position: "absolute", left: 156, top: 188, width: 700, height: 210, zIndex: 26,
        borderRadius: 16, background: CARD, boxShadow: "0 18px 26px rgba(6,10,16,0.6)" }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 56,
          borderRadius: "14px 14px 0 0", background: GO, fontFamily: inter.fontFamily,
          fontWeight: 900, fontSize: 24, letterSpacing: "0.2em", color: "#EAFBF3",
          textAlign: "center", lineHeight: "56px" }}>COMMENT</div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 74, textAlign: "center",
          fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 108, letterSpacing: "-0.04em",
          color: INKD, transform: `scale(${E(f, 2, 16, 0.6, 1, BACK)})` }}>ROLES</div>
      </div>
      <CloneCard f={f} x={186} y={428} w={640} at={10} z={26} />
      <Worker f={f} x={64} y={432} size={196} prop="suit" gaze={0} cheer={0.9}
              nodAmp={4} nodSpeed={8} z={20} />
      <Worker f={f} x={790} y={438} size={188} prop="glasses" gaze={0} cheer={0.9}
              nodAmp={4} nodSpeed={9} z={20} />
      <Confetti f={f} at={3} n={52} z={38} />
    </Chassis>
  );
};
