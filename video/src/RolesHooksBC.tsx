import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { inter } from "./fonts";
import { Bg, Panel, ProgressBar, HookHeader, Caption, AssemblyCtx, hexA } from "./SlopKit";
import { Worker } from "./RolesWorld";
import {
  Arena, Lamp, Spot, BigBoard, Podium, PickCard, Lower, DChip, Confetti, Crowd, Ribbon,
  PICKS, DEPTS, PW, PH, CARD, INKD, MUTE, RED, RED_D, AMBER, GO, BLUE, PLUM, TEAL,
} from "./DraftWorld";
import { RepoPage, Jumbotron, Octocat } from "./RolesGitHub";
import { ChatCompose, BriefEditor, ToolLogo, TOOLS } from "./RolesUI";
import { E, osc, rnd, OUT, IO, BACK, IN_Q } from "./MissionWorld";

/* =========================================================================
   REEL 84 "ROLES" · ALTERNATE HOOKS B AND C.

   ⛔ IG suppresses near-duplicate uploads, so a trial set must differ where it
   is measured (memory `feedback_trial_reel_variants`): HOOK, bed, per-scene
   camera offset, transition kit, caption band. The hook carries the delta; the
   shared body is the weak half. So these are different OPENS, not recolours.

     A (shipped) · THE REPO   — the GitHub page first, arena revealed third.
     B · ON THE CLOCK         — the draft clock first, the repo lands LAST.
     C · THE EMPTY CHAT       — villain first: the compose box you stare at daily.

   All three still clear the 140 luma bar at frame 0, which constrains what an
   open can be: B opens on a cream scoreboard, C on a white chat UI. A dark open
   would fail outright (docs/THE-OPEN.md).
   ========================================================================= */

const SoloCap: React.FC<{ words: string[]; hot?: number }> = (p) =>
  React.useContext(AssemblyCtx) ? null : <Caption {...p} />;

export const ROLES_HOOK_LEN = 148;          // 4.94s, the measured onset of "An engineer…"

const Shot: React.FC<{ f: number; a: number; b: number; k?: number; children: React.ReactNode }> =
  ({ f, a, b, k = 0, children }) => {
  if (f < a || f >= b) return null;
  const t = Math.min(1, (f - a) / 22), e = t * t * (3 - 2 * t);
  const z = [1.08 - e * 0.07, 1.02 + e * 0.06, 1.05 - e * 0.04, 1.01 + e * 0.05][k % 4];
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden",
      transform: `scale(${z})`, transformOrigin: "50% 56%" }}>{children}</div>
  );
};

const Flash: React.FC<{ f: number; cuts: number[] }> = ({ f, cuts }) => (<>
  {cuts.map((cf) => {
    const k = f - cf;
    if (k < 0 || k > 2) return null;
    return <div key={cf} style={{ position: "absolute", inset: 0, background: "#FFF8ED",
      opacity: (1 - k / 2) * 0.3, zIndex: 44 }} />;
  })}
</>);

/* ======================================================= B · ON THE CLOCK ==
   Clock first, repo LAST. Slower cuts than A so the two do not share a rhythm.
   ========================================================================= */
export const ROLES_B_CUTS = [26, 52, 80, 106, 128];

/**
 * A cream scoreboard face — bright enough to OPEN on, unlike the rack clock.
 * ⛔ Sized deliberately: the first pass covered 44% of the panel and measured a
 * frame-0 luma of 131.7 against the 140 bar. It now covers ~66%, which is what
 * actually carries the gate — the board's own brightness never changed.
 */
const BoardClock: React.FC<{ f: number; secs: number; round?: string }> =
  ({ f, secs, round = "ROUND 1 · PICK 01" }) => (
  <div style={{ position: "absolute", left: 34, top: 112, width: 944, height: 572, zIndex: 22,
    borderRadius: 20, background: CARD, boxShadow: "0 20px 30px rgba(6,10,16,0.6)",
    fontFamily: inter.fontFamily, overflow: "hidden" }}>
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 88, background: RED_D,
      textAlign: "center", lineHeight: "88px", fontWeight: 900, fontSize: 34,
      letterSpacing: "0.2em", color: "#FFF6F2" }}>{round}</div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 116, textAlign: "center",
      fontWeight: 900, fontSize: 268, lineHeight: 1, letterSpacing: "-0.05em",
      color: secs <= 1 ? RED : INKD }}>
      {`0:${String(Math.max(0, Math.ceil(secs))).padStart(2, "0")}`}
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 424, textAlign: "center",
      fontWeight: 900, fontSize: 32, letterSpacing: "0.22em", color: "#9A9280" }}>ON THE CLOCK</div>
    {/* the bar draining, so the time is the GRAPHIC and not just a numeral */}
    <div style={{ position: "absolute", left: 0, bottom: 0, height: 30, background: "#E0D8C6",
      width: 944 }} />
    <div style={{ position: "absolute", left: 0, bottom: 0, height: 30, background: RED,
      width: 944 * Math.max(0, Math.min(1, secs / 5)) }} />
  </div>
);

export const RolesHookB: React.FC = () => {
  const f = useCurrentFrame();
  const [C1, C2, C3, C4, C5] = ROLES_B_CUTS;
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <HookHeader f={f + 10} big="268 EXPERTS, FREE" hot="ONE GITHUB REPO" />
      <Panel glow={hexA(RED, 0.24)}>

        {/* 1 · THE CLOCK. Bright board face, five seconds draining. */}
        <Shot f={f} a={0} b={C1} k={0}>
          <Arena f={f} horizon={686} detail={false} truss={false} />
          <Crowd f={f} y={596} rows={2} per={30} scale={0.8} phones={9} z={3} />
          <BoardClock f={f} secs={5 - (f / C1) * 5} />
        </Shot>

        {/* 2 · 0:00. The podium, the announcement. */}
        <Shot f={f} a={C1} b={C2} k={1}>
          <Arena f={f} horizon={598} detail cams={false}
                 banners={[DEPTS[0], DEPTS[1], DEPTS[2], DEPTS[3]]}
                 ribbon="ON THE CLOCK · ROUND 1 · " />
          <Lamp x={488} y={96} on z={12} />
          <Spot cx={506} top={126} floor={598} w={430} spread={0.16} z={10} />
          <Worker f={f} x={396} y={266} size={228} prop="suit" gaze={0} stern={0.4}
                  nodAmp={2.4} nodSpeed={12} z={18} />
          <Podium f={f} x={382} y={452} s={1} c={RED_D} z={20} />
          <DChip y={706} text="WITH THE FIRST PICK" c={AMBER} size={36} />
        </Shot>

        {/* 3 · THE CARD. */}
        <Shot f={f} a={C2} b={C3} k={2}>
          <Arena f={f} horizon={640} detail cams
                 banners={[DEPTS[4], DEPTS[5], DEPTS[6], DEPTS[7]]} />
          <Spot cx={506} top={110} floor={640} w={620} spread={0.22} z={10} />
          <PickCard x={226} y={222 - (1 - E(f, C2 + 1, C2 + 18, 0, 1, BACK)) * 380}
                    w={560} h={300} no="01" name="DESIGNER" dept="DESIGN" c={PLUM} tilt={-1.5} z={26} />
        </Shot>

        {/* 4 · 268 DEEP. The board is context; the number is the subject. */}
        <Shot f={f} a={C3} b={C4} k={3}>
          <Arena f={f} horizon={664} detail cams={false}
                 banners={[DEPTS[8], DEPTS[9], DEPTS[10], DEPTS[11]]} />
          <BigBoard f={f} x={110} y={158} w={792} h={286} cols={20} rows={8} dim
                    lit={[41, 82, 123]} z={9} />
          <div style={{ position: "absolute", left: 0, right: 0, top: 468, textAlign: "center",
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 168, lineHeight: 1,
            letterSpacing: "-0.05em", color: CARD, zIndex: 26,
            transform: `scale(${E(f, C3 + 1, C3 + 16, 0.7, 1, BACK)})` }}>268</div>
          <DChip y={676} text="ACROSS 20 DIVISIONS" c={PLUM} size={34} />
        </Shot>

        {/* 5 · THEY WALK OUT. */}
        <Shot f={f} a={C4} b={C5} k={0}>
          <Arena f={f} horizon={604} detail cams={false}
                 banners={[DEPTS[1], DEPTS[0], DEPTS[2], DEPTS[3]]} />
          {[0, 1, 2].map((i) => <Lamp key={i} x={172 + i * 306} y={96} on z={12} />)}
          {[0, 1, 2].map((i) => (
            <Spot key={i} cx={190 + i * 306} top={126} floor={604} w={272} spread={0.16} z={10} />
          ))}
          {[PICKS[0], PICKS[1], PICKS[2]].map((r, i) => {
            const t = E(f, C4 + 1 + i * 4, C4 + 14 + i * 4, 0, 1, BACK);
            return (
              <React.Fragment key={r.name}>
                <Worker f={f + i * 9} x={82 + i * 306} y={368 + (1 - t) * 250} size={222}
                        prop={r.prop} gaze={0} cheer={0.75} nodAmp={3} nodSpeed={10 + i} z={20 + i} />
                <Lower x={62 + i * 306} y={638} w={252} name={r.name} c={r.c}
                       t={E(f, C4 + 7 + i * 3, C4 + 13 + i * 3, 0, 1, OUT)} z={30} />
              </React.Fragment>
            );
          })}
          <Confetti f={f} at={C4 + 8} n={36} z={38} />
        </Shot>

        {/* 6 · AND IT IS A REPO. The payoff A opened with lands LAST here. */}
        <Shot f={f} a={C5} b={9999} k={1}>
          <Arena f={f} horizon={628} detail cams
                 banners={[DEPTS[12], DEPTS[13], DEPTS[14], DEPTS[15]]} />
          <Jumbotron f={f} x={196} y={E(f, C5, C5 + 16, -290, 186, OUT)} w={620} h={300}
                     starA={C5} starB={C5 + 15} z={16} />
          <DChip y={706} text="ALL OF IT, FREE" c={GO} size={38} />
        </Shot>

        <Flash f={f} cuts={ROLES_B_CUTS} />
      </Panel>
      <SoloCap words={["There", "is", "a", "GitHub"]} hot={3} />
    </AbsoluteFill>
  );
};

/* ====================================================== C · THE EMPTY CHAT ==
   Villain first: the compose box the viewer stares at every day. Fastest open
   of the three.
   ========================================================================= */
export const ROLES_C_CUTS = [22, 46, 72, 98, 124];

export const RolesHookC: React.FC = () => {
  const f = useCurrentFrame();
  const [C1, C2, C3, C4, C5] = ROLES_C_CUTS;
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <HookHeader f={f + 10} big="268 EXPERTS, FREE" hot="ONE GITHUB REPO" />
      <Panel glow={hexA(PLUM, 0.24)}>

        {/* 1 · THE BLANK BOX. Full frame, white, nothing else. */}
        <Shot f={f} a={0} b={C1} k={0}>
          <div style={{ position: "absolute", inset: 0, background: "#F2EFE8" }} />
          <ChatCompose f={f} x={66} y={252} w={880} z={22} />
          <DChip y={640} text="WHO AM I TALKING TO?" c={RED} size={38} />
        </Shot>

        {/* 2 · THE TAX. The persona brief nobody wants to write, again. */}
        <Shot f={f} a={C1} b={C2} k={1}>
          <div style={{ position: "absolute", inset: 0, background: "#F2EFE8" }} />
          <BriefEditor f={f} x={76} y={186} w={860} h={430} at={C1 + 1} z={22} />
          <DChip y={666} text="FIVE MINUTES. EVERY TIME." c={RED} size={34} />
        </Shot>

        {/* 3 · HARD CUT TO THE DARK. The spotlight snaps on. */}
        <Shot f={f} a={C2} b={C3} k={2}>
          <Arena f={f} horizon={598} detail cams
                 banners={[DEPTS[0], DEPTS[1], DEPTS[2], DEPTS[3]]}
                 ribbon="268 AGENTS · 20 DIVISIONS · " />
          <Lamp x={488} y={96} on z={12} />
          <Spot cx={506} top={126} floor={598} w={E(f, C2, C2 + 12, 60, 430, OUT)} spread={0.16} z={10} />
          <Worker f={f} x={396} y={266} size={228} prop="suit" gaze={0} stern={0.4}
                  nodAmp={2.4} nodSpeed={12} z={18} />
          <Podium f={f} x={382} y={452} s={1} c={RED_D} z={20} />
          <DChip y={706} text="OR: ALREADY DRAFTED" c={GO} size={36} />
        </Shot>

        {/* 4 · THE CARD. */}
        <Shot f={f} a={C3} b={C4} k={3}>
          <Arena f={f} horizon={640} detail cams={false}
                 banners={[DEPTS[4], DEPTS[5], DEPTS[6], DEPTS[7]]} />
          <Spot cx={506} top={110} floor={640} w={620} spread={0.22} z={10} />
          <PickCard x={226} y={222 - (1 - E(f, C3 + 1, C3 + 16, 0, 1, BACK)) * 380}
                    w={560} h={300} no="01" name="DESIGNER" dept="DESIGN" c={PLUM} tilt={-1.5} z={26} />
        </Shot>

        {/* 5 · THREE OF THEM. */}
        <Shot f={f} a={C4} b={C5} k={0}>
          <Arena f={f} horizon={604} detail cams={false}
                 banners={[DEPTS[1], DEPTS[0], DEPTS[2], DEPTS[3]]} />
          {[0, 1, 2].map((i) => <Lamp key={i} x={172 + i * 306} y={96} on z={12} />)}
          {[0, 1, 2].map((i) => (
            <Spot key={i} cx={190 + i * 306} top={126} floor={604} w={272} spread={0.16} z={10} />
          ))}
          {[PICKS[0], PICKS[1], PICKS[2]].map((r, i) => {
            const t = E(f, C4 + 1 + i * 4, C4 + 14 + i * 4, 0, 1, BACK);
            return (
              <React.Fragment key={r.name}>
                <Worker f={f + i * 9} x={82 + i * 306} y={368 + (1 - t) * 250} size={222}
                        prop={r.prop} gaze={0} cheer={0.75} nodAmp={3} nodSpeed={10 + i} z={20 + i} />
                <Lower x={62 + i * 306} y={638} w={252} name={r.name} c={r.c}
                       t={E(f, C4 + 7 + i * 3, C4 + 13 + i * 3, 0, 1, OUT)} z={30} />
              </React.Fragment>
            );
          })}
          <DChip y={132} text="NO BRIEF NEEDED" c={GO} size={36} />
        </Shot>

        {/* 6 · THE SOURCE. */}
        <Shot f={f} a={C5} b={9999} k={1}>
          <Arena f={f} horizon={628} detail cams
                 banners={[DEPTS[16], DEPTS[17], DEPTS[18], DEPTS[19]]} />
          <Jumbotron f={f} x={196} y={E(f, C5, C5 + 14, -290, 176, OUT)} w={620} h={300}
                     starA={C5} starB={C5 + 14} z={16} />
          <DChip y={700} text="ONE GITHUB REPO" c={AMBER} size={38} />
        </Shot>

        <Flash f={f} cuts={ROLES_C_CUTS} />
      </Panel>
      <SoloCap words={["There", "is", "a", "GitHub"]} hot={3} />
    </AbsoluteFill>
  );
};
