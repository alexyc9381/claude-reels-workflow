import React from "react";
import { AbsoluteFill, useCurrentFrame, Img, staticFile } from "remotion";
import { inter, fraunces } from "./fonts";
import { Panel, Mascot, Confetti, hexA, MONO } from "./SlopKit";
import { E, OUT, IO, BACK, IN_Q } from "./MissionWorld";
import {
  Set, Room, ROOM, Tile, Card, Shred, BOARDS, Cone, Pendant, Sconce, Furnace, Glass, BigNum, Bar, Pill,
  Title, LivePill, Slug, Plate, Panelled, Doc, Vault, Pool, Dress, Embers, GoldEnv, Marker, Scale, Block, panAt, Burst,
} from "./JobsWorld";
import { Slot, Env, Heap, Poster, Scroll, Letter, PAPER_W } from "./JobsProps";

/* =========================================================================
   REEL 92 "JOBS" · THE BODY — ROUND 2, REBUILT AS DARK INTERIORS.

   ⛔ ROUND 1 WAS BUILT ON THE WRONG ENGINE and Alex rejected it: "the quality
      is nowhere near as good as the callback one." It used reel 91's `Site` —
      pastel DAYLIGHT EXTERIORS, flat colour bands, about eight objects a scene,
      and the white `SectionHeader` pill sitting on top of the picture. CALLBACK
      is none of those things. The measured differences are at the head of
      JobsWorld.tsx. This file is the rebuild: ten dark interiors, a practical
      light with a visible cone in every one, a built riveted hero, dark-glass
      readouts, and the title as display type INSIDE the panel.

   Board: storyboards/92-jobs.md. Story, cast, number spine, villain and hero
   artifact are UNCHANGED — the board was approved, only the construction was
   wrong.

   ⛔ ONE KNOCKOFF BRAND — APPLYVAULT — undefeated until S7, and it loses once.
   ⛔ THE HERO ARTIFACT IS S8's STRIKE-THROUGH AND RAISE.
   ✅ Every on-screen fact is sourced to github.com/santifer/career-ops, read
      2026-08-06. The count reads 62,000 because the VO says 62,000. No salary
      figure anywhere.
   ========================================================================= */

/* ⛔ THERE IS NO CAMERA MOVE IN THIS REEL.

   The house rule says a per-scene push is the highest-measuring motion lever,
   and measured on its own it is. But Alex watched round 3 and said "the camera
   keeps zooming in for not much reason which i dont like", and he is right on
   both counts: it was not motivated by anything in the shot, and the scale ramp
   is what pushed props past the panel edge and cropped them.

   So the camera is LOCKED, `Panel` gets no `pushIn`, and every scene earns its
   motion from the ACTION instead: a card travels, a jaw closes, a stamp lands,
   a bar is struck through and overtaken. That is also the other note he gave
   in the same breath — "this all needs to tell a story through the animations".
   ------------------------------------------------------------------------ */

/** Every body scene is the same shell: a dark room, the title set INTO the
    panel, the live pill, and a mono slug along the floor. Camera locked. */
const Scene: React.FC<{ k: Room; l1: string; hot: string; slug: string; slow?: boolean;
  dust?: boolean; slugC?: string; children: React.ReactNode }> =
  ({ k, l1, hot, slug, dust, slugC, children }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Panel glow={hexA(ROOM[k].key, 0.22)}>
        <Set k={k} dust={dust} f={f}>{children}</Set>
        <Title l1={l1} hot={hot} f={f} />
        <LivePill f={f} />
        <Slug t={slug} c={slugC} />
      </Panel>
    </AbsoluteFill>
  );
};

/** the row of doors down the hall — the recurring backdrop, in the dark */
const DoorRow: React.FC<{ n?: number; y?: number; x0?: number; z?: number; s0?: number }> =
  ({ n = 4, y = 470, x0 = 20, z = 12, s0 = 0.62 }) => (<>
  {Array.from({ length: n }, (_, i) => {
    const s = s0 - i * 0.07, w = 150 * s, h = 268 * s;
    return (
      <div key={i} style={{ position: "absolute", left: x0 + i * 178, top: y - h, width: w,
        height: h, zIndex: z + (n - i), borderRadius: 5,
        background: "linear-gradient(174deg,#4A3626 0%,#2A1D14 100%)",
        boxShadow: "0 12px 24px rgba(0,0,0,0.5)", border: "5px solid #241A12" }}>
        <div style={{ position: "absolute", left: 10, top: 14, right: 10, height: h * 0.3,
          background: "#20160F", opacity: 0.6, borderRadius: 3 }} />
        <div style={{ position: "absolute", right: 12, top: h * 0.5, width: 10, height: 10,
          borderRadius: 999, background: "#8E7448" }} />
        <div style={{ position: "absolute", left: 16, top: h * 0.44, width: w - 32, height: 13,
          borderRadius: 3, background: "#5B6675" }} />
      </div>
    );
  })}
</>);

/** the queue readout, carried by both hook shots so it is the same object twice */
const Queue: React.FC<{ x: number; y: number; sent: number; f: number }> = ({ x, y, sent, f }) => (
  <Glass f={f} x={x} y={y} w={334} h={150} label="APPLYVAULT · QUEUE" c="#F08A7E">
    <BigNum x={22} y={54} v={Math.round(sent).toLocaleString()} c="#F6F1E6" size={70} />
    <div style={{ position: "absolute", left: 200, top: 58, fontFamily: MONO, fontWeight: 800,
      fontSize: 18, letterSpacing: "0.14em", color: "#8D97A6" }}>SENT</div>
    <div style={{ position: "absolute", left: 200, top: 84, fontFamily: inter.fontFamily,
      fontWeight: 900, fontSize: 46, lineHeight: 1, color: "#F08A7E" }}>0</div>
    <div style={{ position: "absolute", left: 200, top: 126, fontFamily: MONO, fontWeight: 800,
      fontSize: 18, letterSpacing: "0.14em", color: "#8D97A6" }}>REPLIES</div>
  </Glass>
);

/* ------------------------------------------------------------------ S0 ----
   0.00 -> 4.51 · THE OPEN. Three hard cuts, camera locked in each.
     A 0.00  the APPLYVAULT machine, close, eating one more application
     B 1.43  the flap CLACKS, a NO REPLY stamp lands, 740 -> 741, replies stay 0
     C 2.90  the wide: the hall of doors, and one gold light at the far end
   ⛔ Nothing here reveals that a door is fake. That is S5's payload, and
      spending it now is the exact failure reel 52's first board was killed for.
   ------------------------------------------------------------------------- */
export const S0Open: React.FC = () => {
  const f = useCurrentFrame();
  /* ⛔ THREE SHOTS, NOT FIVE. Alex: "too much flipping through screens at the
     beginning." Round 5 cut five times in 4.5s, which reads as channel-hopping
     rather than escalation. The fix is not fewer events, it is fewer CUTS with
     MORE happening inside each one. Each shot now runs ~1.5s and carries three
     or four simultaneous moves.

     ⛔ THE HEADER IS THE PAYOFF, AND THE PAYOFF IS WHY THEY SHOULD CARE.
     "THE 4TH STEP IS THE ONE THAT PAYS" described the video's STRUCTURE. This
     one names what the viewer gets: a machine that negotiates their offer. It
     is the most valuable thing the system does and the voice does not reach it
     for another twenty-nine seconds. */
  const CUT = [0, 43, 87];
  const shot = CUT.filter((c) => f >= c).length - 1;
  const lf = f - CUT[shot];
  /* ⛔ THE HOOK HEADER. Three rounds of ranking got here (2026-08-06).
       R1 "IT NEGOTIATES YOUR OFFER FOR YOU" -> a CAPABILITY, not a wound.
       R2 "MAKE YOUR JOB SEARCH UNGHOSTABLE" -> copied CALLBACK's shape without
          checking the ROOT survives it; "ghost" does not take -able cleanly.
       R3 "STOP GETTING GHOSTED. START GETTING PAID." -> plain, but carries NO
          NUMBER, and Alex wants the "3x your interviews" shape: a quantity that
          implies leverage.
     ⛔⛔ "AUTO APPLY TO 740 JOBS DAILY" CANNOT SHIP. Alex asked for it and it is
        FALSE ABOUT THE PRODUCT: career-ops "never sends, submits, or clicks
        anything". This reel's own S3 header says IT NEVER APPLIES FOR YOU, so an
        auto-apply hook is contradicted by the video twelve seconds later and by
        the repo the moment anyone installs it. "Daily" is unbacked too: the 740
        is one person's entire search, not a day's run. The shipped line keeps
        the SHAPE he wanted (auto + the number + the leverage) and puts it on the
        thing the tool actually automates, which is the SCREENING.
     ⛔ 3X IS NOT SOURCEABLE. career-ops publishes 740 listings evaluated, 100+
        CVs and one role landed. It publishes NO multiplier, so we do not invent
        one. This gets the same leverage FEEL out of numbers that are real:
        740 go in, the A grades come out.
     The other nine, for the next hook round (⚠️ = would be an invented claim):
       2  740 JOBS SCREENED / BEFORE YOU APPLY TO ONE
       3  740 JOBS. 100 CVs. / 1 OFFER.
       4  10 CHECKS PER JOB / BEFORE YOU WASTE A NIGHT
       5  1 GUY. 740 JOBS. / 1 DREAM ROLE.
       6  63,000 STARS. / STILL $0.
       7  SKIP THE PORTAL. / EMAIL THE MANAGER.
       8  ⚠️ 3X YOUR INTERVIEWS
       9  ⚠️ HALF THESE JOBS / ARE NOT REAL
      10  ⚠️ STOP APPLYING TO 90% / OF WHAT YOU SEE */
  /* ⚠️ ALEX'S CALL, MADE TWICE. I flagged that career-ops "never sends, submits,
     or clicks anything" and that "daily" is unbacked (the 740 is one person's
     whole search, not a day's run). He reaffirmed the exact wording, so it ships
     as he wrote it.
     ⛔ CONSEQUENCE HANDLED: S3's header used to read "IT NEVER APPLIES FOR YOU",
     which would have contradicted this hook twelve seconds into the same video.
     It now carries a different sourced fact instead. */
  const H = { l1: "AUTO APPLY TO", hot: "740 JOBS DAILY" };

  /* ---- A · 0.00-1.43 · THE HIERARCHY, and it never stops moving:
       the gold one rises and breathes · grey ones keep dropping onto the pile ·
       the beam sweeps across · the counter sits under it all. */
  if (shot === 0) {
    const rise = E(lf, 0, 26, 0, 1, OUT);
    const crack = E(lf, 13, 24, 0, 1, BACK);   // the seal goes at ~0.45s
    return (
      <Scene k="hall" l1={H.l1} hot={H.hot} slug="ELEVEN MONTHS OF THIS" dust>
        <Dress items={[["pipe", 6, 194, 0.9], ["vent", 146, 230, 0.8], ["valve", 942, 252, 0.9],
                       ["ladder", 964, 244, 0.72]]} c="#33456A" />
        <Sconce x={52} y={244} s={1.05} />
        <Cone f={f} x={94} y={288} top={64} bot={280} len={280} c="#F3CE79" o={0.18} />
        {/* 2nd in the rank: the mass of everything else you sent, still growing */}
        <Heap x={506} y={782} n={50} s={1.48} w={620} z={40} />
        {Array.from({ length: 5 }, (_, i) => {
          const drop = ((lf + i * 8) % 40) / 40;
          return (
            <Env key={i} x={190 + i * 156} y={-80 + drop * 800} s={1.15} z={42}
                 rot={-26 + drop * 150 + i * 34} />
          );
        })}
        <Pool x={506} y={646} w={720} c="#8FB4E8" o={0.16} z={38} />
        {/* 1st in the rank: the only warm object in a cold room, and at ~0.5s it
            CRACKS OPEN. The flash is the pattern interrupt; the question it
            leaves behind is the hook. */}
        <Cone f={f} x={506} y={172} top={70} bot={340} len={290} c="#F3CE79" o={0.22 * rise}
              z={39} />
        <Burst x={506} y={442} f={f} t={crack} s={1.15} z={68} />
        <GoldEnv x={432} y={392 - rise * 26 - crack * 34 + Math.sin(f / 16) * 7}
                 s={1.08 + crack * 0.14} z={72} f={f}
                 rot={-6 + Math.sin(f / 21) * 3 - crack * 5} />
        {/* the flap lifting off the seam as it goes */}
        <div style={{ position: "absolute", left: 432, top: 358 - rise * 26 - crack * 66,
          width: 160, height: 58, zIndex: 73, opacity: crack,
          transformOrigin: "50% 100%", transform: `rotate(${-crack * 34}deg)`,
          background: "#E8C063", clipPath: "polygon(0 100%, 100% 100%, 50% 0)" }} />
        {/* 3rd in the rank: the explanation */}
        <Queue f={f} x={28} y={528} sent={740} />
      </Scene>
    );
  }

  /* ---- B · 1.43-2.90 · THE MACHINE. One posting rides in, the jaw SNAPS,
       shred sprays, the stamp SLAMS, the count goes up and the replies do not.
       Four moves, one shot, no cut. */
  if (shot === 1) {
    const ride = E(lf, 0, 15, 0, 1, IO);
    const bite = E(lf, 14, 18, 0, 1, IN_Q) * (1 - E(lf, 19, 27, 0, 1, OUT));
    const stamp = E(lf, 24, 34, 0, 1, BACK);
    return (
      <Scene k="hall" l1={H.l1} hot={H.hot} slug="NO HUMAN EVER SEES IT" slugC="#F08A7E" dust>
        <Sconce x={52} y={244} s={1.05} />
        <Cone f={f} x={94} y={288} top={64} bot={270} len={260} c="#F3CE79" o={0.2} />
        <Panelled x={430} y={248} w={524} h={344} z={40} a="#5A6478" b="#2A3140">
          <div style={{ position: "absolute", left: 34, top: 28, right: 34, height: 54,
            borderRadius: 8, background: "#101722", border: "2px solid #6E7A90",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 32,
            letterSpacing: "0.1em", color: "#9FC0F0" }}>APPLYVAULT</div>
          <div style={{ position: "absolute", left: 34, top: 102, right: 34, bottom: 28,
            borderRadius: 8, background: "linear-gradient(180deg,#0A0E15,#05080C)",
            overflow: "hidden", boxShadow: "inset 0 8px 22px rgba(0,0,0,0.85)" }}>
            {Array.from({ length: 12 }, (_, i) => (
              <div key={`t${i}`} style={{ position: "absolute", left: 4 + i * 37,
                top: -6 + bite * 34, width: 0, height: 0, borderLeft: "18px solid transparent",
                borderRight: "18px solid transparent", borderTop: "38px solid #C9D2DE" }} />
            ))}
            {Array.from({ length: 12 }, (_, i) => (
              <div key={`b${i}`} style={{ position: "absolute", left: 4 + i * 37,
                bottom: -6 + bite * 34, width: 0, height: 0, borderLeft: "18px solid transparent",
                borderRight: "18px solid transparent", borderBottom: "38px solid #A7B2C2" }} />
            ))}
            {[0, 1].map((r) => (
              <div key={r} style={{ position: "absolute", left: 12, right: 12, top: 90 + r * 58,
                height: 24, borderRadius: 6, background: "#39424F", overflow: "hidden" }}>
                {Array.from({ length: 20 }, (_, i) => (
                  <div key={i} style={{ position: "absolute",
                    left: ((i * 26 + f * 4.2 * (r ? -1 : 1)) % 520 + 520) % 520,
                    top: 0, width: 11, height: 24, background: "#5D6878",
                    transform: "skewX(-22deg)" }} />
                ))}
              </div>
            ))}
          </div>
        </Panelled>
        <Vault x={186} y={314} f={f} s={0.64} z={52} chew={0.7} look={0.5} />
        <Panelled x={-40} y={604} w={1100} h={50} z={58} a="#3E4757" b="#212836" r={6}
                  rivets={false} />
        {Array.from({ length: 9 }, (_, i) => (
          <div key={i} style={{ position: "absolute", left: -8 + i * 124, top: 614, width: 36,
            height: 36, borderRadius: 999, background: "#59637A", zIndex: 59,
            boxShadow: "inset -4px -4px 0 rgba(0,0,0,0.35)" }} />
        ))}
        <Card x={80 + ride * 396} y={490} s={0.84} z={62} logo="si_indeed.svg"
              title="Applied AI Eng." rot={-4 + ride * 8} t={lf > 17 ? 0 : 1} />
        <Shred x={694} y={584} f={f} start={CUT[1] + 17} n={38} z={60} />
        <div style={{ position: "absolute", left: 268, top: 634, zIndex: 74, opacity: stamp,
          transform: `rotate(${-12 + (1 - stamp) * 28}deg) scale(${0.6 + stamp * 0.6})` }}>
          <div style={{ padding: "12px 30px", border: "9px solid #E0443E", borderRadius: 8,
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 66, color: "#E0443E",
            background: "rgba(12,16,22,0.62)",
            textShadow: "0 3px 10px rgba(0,0,0,0.8)" }}>NO REPLY</div>
        </div>
        <Queue f={f} x={28} y={246} sent={740 + E(lf, 24, 30, 0, 1, OUT)} />
      </Scene>
    );
  }

  /* ---- C · 2.90-4.51 · the gold one LIFTS out of the pile and TRAVELS the
       hall, lighting 1-2-3-4 as it passes, into a door that opens for it. */
  const fly = E(lf, 4, 46, 0, 1, IO);
  const doorOpen = E(lf, 34, 48, 0, 1, OUT);
  return (
    <Scene k="hall" l1={H.l1} hot={H.hot} slug="FOUR STEPS · ONE DOOR" dust>
      <Pendant f={f} x={286} y={162} c="#9FC0F0" s={0.78} z={36} bulbs={4} />
      <Cone f={f} x={286} y={222} top={120} bot={380} len={270} c="#9FC0F0" o={0.15} />
      <DoorRow n={4} y={528} x0={12} z={14} s0={0.7} />
      {[1, 2, 3, 4].map((n, i) => (
        <Marker key={n} x={132 + i * 176} y={318} n={n}
                on={E(fly, i * 0.2, i * 0.2 + 0.16, 0, 1, OUT)} s={1.0} z={46} />
      ))}
      <div style={{ position: "absolute", left: 792, top: 268, width: 190, height: 272, zIndex: 26,
        borderRadius: 6, background: "#2A1D14", border: "14px solid #3E2C1C",
        boxShadow: `0 0 ${54 * doorOpen}px rgba(243,206,121,0.5)` }} />
      <div style={{ position: "absolute", left: 806, top: 282, width: 162, height: 244, zIndex: 27,
        background: "linear-gradient(180deg,#FBE9BD,#DFA44A)", opacity: doorOpen }} />
      <Cone f={f} x={887} y={526} top={170} bot={310} len={240} c="#F3CE79" o={0.28 * doorOpen}
            z={28} />
      {/* it comes UP out of the heap first, then crosses the whole frame */}
      <Heap x={130} y={780} n={16} s={1.2} w={280} z={30} />
      <GoldEnv x={-20 + fly * 790} y={470 - E(lf, 0, 14, 0, 1, OUT) * 90
               - Math.sin(fly * Math.PI) * 64} s={1.0} z={74} f={f} rot={-10 + fly * 20} />
      <div style={{ position: "absolute", left: 60, top: 486, zIndex: 60 }}>
        <Mascot lf={f} size={192} glasses={1} gaze={3} nodAmp={2.6} nodSpeed={7} />
      </div>
    </Scene>
  );
};

/* ------------------------------------------------------------------ S1 ----
   4.51 -> 9.99 · "A guy ran 740 job postings through this system he built,
   landed a Head of Applied AI role, then made the whole thing free."
   AMBER WORKSHOP. A furnace for colour, a bench of listings going from unread
   to read, the role plate landing, then FREE / MIT bolted up.
   ------------------------------------------------------------------------- */
export const S1Guy: React.FC = () => {
  const f = useCurrentFrame();
  const run = E(f, -18, 132, 0, 1, IO);
  const role = E(f, 74, 96, 0, 1, BACK);
  const free = E(f, 104, 134, 0, 1, BACK);
  return (
    <Scene k="shop" l1="AND 100+ CVs" hot="WRITTEN FOR THEM" slug="ONE PERSON · ONE PASS" dust>
      <Dress items={[["shelf", 232, 230, 0.9], ["crate", 940, 398, 0.8], ["board", 826, 214, 0.7],
                     ["pipe", 970, 202, 0.7]]} c="#6B4A2B" />
      <Furnace x={36} y={302} f={f} s={0.98} z={26} />
      <Embers x={128} y={318} f={f} n={18} z={30} />
      <Cone f={f} x={128} y={334} top={150} bot={320} len={260} c="#F0A44A" o={0.2} z={27} />
      <Pendant f={f} x={598} y={168} c="#F3CE79" s={0.84} z={36} />
      <Cone f={f} x={598} y={228} top={110} bot={380} len={300} c="#F3CE79" o={0.2} z={27} />
      {/* the bench */}
      <Panelled x={262} y={556} w={690} h={36} z={44} a="#6B4A2B" b="#3A2617" r={6}
                rivets={false} />
      {/* ⛔ THE STORY: four REAL boards fly in one after another, land on the
          bench and get stamped READ. Every one is a posting he actually read. */}
      {[...BOARDS, ...BOARDS].map(([logo, name], i) => {
        const inAt = i * 19 - 22;
        const fly = E(f, inAt, inAt + 16, 0, 1, OUT);
        const stamp = E(f, inAt + 15, inAt + 23, 0, 1, BACK);
        return (
          <Card key={`${logo}-${i}`} x={188 + (i % 4) * 194 - (1 - fly) * 620}
                y={392 + (i % 2) * 22 + Math.floor(i / 4) * 30}
                s={0.72} z={46 + i} logo={logo} title={name} rot={-5 + (i % 4) * 3}
                t={fly} stamp="READ" stampC="#6FD79A" stampT={stamp} />
        );
      })}
      <Glass f={f} x={628} y={264} w={320} h={136} label="LISTINGS EVALUATED" c="#E8B96A" dot="#F3CE79">
        <BigNum x={22} y={48} v={String(Math.round(740 * run))} c="#F3CE79" size={70} />
        <Bar x={22} y={110} w={278} v={run} c="#E8B96A" />
      </Glass>
      <Plate x={112} y={266} w={430} t="HEAD OF" hot="APPLIED AI" size={40} t2={role} />
      {/* and then he gives the machine away: the real repo, on a real tile */}
      <div style={{ position: "absolute", left: 96, top: 604, zIndex: 66, opacity: free,
        transform: `scale(${0.7 + free * 0.3})`, transformOrigin: "0% 50%", display: "flex",
        alignItems: "center", gap: 16 }}>
        <div style={{ width: 74, height: 74, borderRadius: 18, background: "#FFFFFF",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 10px 20px rgba(0,0,0,0.5)" }}>
          <Img src={staticFile("logos/github.svg")}
               style={{ width: 46, height: 46, objectFit: "contain" }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 26px",
          borderRadius: 14, background: "linear-gradient(178deg,#2FA96F,#177A4B)",
          border: "3px solid #6FD79A", boxShadow: "0 12px 24px rgba(0,0,0,0.5)" }}>
          <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 42,
            color: "#EBFFF4", whiteSpace: "nowrap" }}>FREE</span>
          <span style={{ padding: "6px 14px", borderRadius: 8, background: "rgba(0,0,0,0.25)",
            fontFamily: MONO, fontWeight: 800, fontSize: 22, letterSpacing: "0.1em",
            color: "#EBFFF4", whiteSpace: "nowrap" }}>MIT</span>
        </div>
      </div>
      <Pool x={880} y={630} w={320} c="#F0B45E" o={0.24} z={40} />
      <div style={{ position: "absolute", left: 792, top: 460, zIndex: 62 }}>
        <Mascot lf={f} size={196} glasses={1} cheer={role * 0.6} nodAmp={3} nodSpeed={8} />
      </div>
    </Scene>
  );
};

/* ------------------------------------------------------------------ S2 ----
   9.99 -> 12.11 · "Now it has 62,000 stars on GitHub."  GREEN ARCHIVE.
   ⛔ 62,000 because that is what the VO says. It reads 63.0k today.
   ------------------------------------------------------------------------- */
export const S2Stars: React.FC = () => {
  const f = useCurrentFrame();
  const up = E(f, 0, 13, 0, 1, BACK);
  const n = E(f, 4, 44, 0, 1, OUT);
  return (
    <Scene k="vault" l1="IT RUNS LOCALLY," hot="NOT IN A CLOUD" slug="MIT · FREE FOREVER" dust>
      <Pendant f={f} x={506} y={162} c="#6FD79A" s={0.9} z={36} />
      <Cone f={f} x={506} y={224} top={130} bot={600} len={330} c="#6FD79A" o={0.14} />
      {/* shelving, so the archive is a place */}
      {Array.from({ length: 3 }, (_, r) => (
        <div key={r} style={{ position: "absolute", left: 0, right: 0, top: 276 + r * 74,
          height: 12, background: "#1C4429", zIndex: 14, opacity: 0.85 }} />
      ))}
      {Array.from({ length: 30 }, (_, i) => {
        const r = Math.floor(i / 10);
        return (
          <div key={`bk${i}`} style={{ position: "absolute", left: 18 + (i % 10) * 99,
            top: 276 + r * 74 - 46 - (i % 3) * 8, width: 26 + (i % 4) * 9,
            height: 48 + (i % 3) * 10, background: ["#1F5233", "#2A6B44", "#174527"][i % 3],
            zIndex: 15, borderRadius: 2 }} />
        );
      })}
      {/* the stars keep falling for the whole beat */}
      {Array.from({ length: 34 }, (_, i) => {
        const r = (k: number) => { const v = Math.sin(i * 71.3 + k * 19.7) * 4371.7; return v - Math.floor(v); };
        const t = ((f + i * 5) % 44) / 44;
        return (
          <div key={i} style={{ position: "absolute", left: 26 + r(1) * 940, top: -60 + t * 640,
            zIndex: 30, fontSize: 18 + r(3) * 26, lineHeight: 1, color: "#8FE9B4",
            opacity: t < 0.9 ? 0.45 + r(2) * 0.5 : 0,
            textShadow: "0 0 12px rgba(111,215,154,0.6)" }}>{"★"}</div>
        );
      })}
      <Glass f={f} x={192} y={330} w={628} h={210} label="CAREER-OPS · OPEN SOURCE" c="#6FD79A" t={up}>
        {/* the real mark, on a white tile so it survives the dark set */}
        <div style={{ position: "absolute", left: 24, top: 52, width: 84, height: 84,
          borderRadius: 20, background: "#FFFFFF", display: "flex", alignItems: "center",
          justifyContent: "center", boxShadow: "0 8px 18px rgba(0,0,0,0.45)" }}>
          <Img src={staticFile("logos/github.svg")}
               style={{ width: 54, height: 54, objectFit: "contain" }} />
        </div>
        <div style={{ position: "absolute", left: 124, top: 66, fontSize: 58, lineHeight: 1,
          color: "#F3CE79" }}>{"★"}</div>
        <BigNum x={192} y={58} v={Math.round(62000 * n).toLocaleString()} c="#B7F2D0" size={90} />
        <Pill x={26} y={162} t="MIT" c="#6FD79A" s={0.86} />
        <Pill x={136} y={162} t="OPEN SOURCE" c="#8D97A6" s={0.86} />
      </Glass>
    </Scene>
  );
};

/* ------------------------------------------------------------------ S3 ----
   12.11 -> 13.34 · "It does four things for you."  PLUM CONTROL ROOM.
   Four bays strike on, one per beat to come. 1.2s, one event, no clutter.
   ------------------------------------------------------------------------- */
export const S3Four: React.FC = () => {
  const f = useCurrentFrame();
  const NAME = ["READ", "VERIFY", "REACH", "NEGOTIATE"];
  return (
    <Scene k="control" l1="NO ACCOUNT." hot="NO SUBSCRIPTION." slug="THE WHOLE LOOP">
      <Dress items={[["pipe", 2, 218, 0.8], ["vent", 936, 232, 0.7]]} c="#573465" />
      {[0, 1, 2, 3].map((i) => {
        const on = E(f, 1 + i * 6, 10 + i * 6, 0, 1, BACK);
        const x = 46 + i * 242;
        return (
          <div key={i}>
            <Pendant f={f} x={x + 108} y={204} c="#D79BE8" s={0.5} z={34} bulbs={3} on={on} />
            <Cone f={f} x={x + 108} y={242} top={70} bot={220} len={310} c="#D79BE8" o={0.26 * on} z={20} />
            <Panelled x={x} y={332} w={216} h={226} z={40}
                      a={on > 0.5 ? "#5A3A66" : "#332040"} b={on > 0.5 ? "#301D3A" : "#1B1122"} />
            <div style={{ position: "absolute", left: x + 62, top: 366, width: 92, height: 92,
              borderRadius: 999, zIndex: 44, background: on > 0.5 ? "#E8926A" : "#3A2545",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 58, color: "#1B1122",
              transform: `scale(${0.4 + on * 0.6})`,
              boxShadow: on > 0.5 ? "0 0 26px rgba(232,146,106,0.55)" : undefined }}>{i + 1}</div>
            <div style={{ position: "absolute", left: x, top: 486, width: 216, textAlign: "center",
              zIndex: 45, fontFamily: MONO, fontWeight: 800, fontSize: 21, letterSpacing: "0.12em",
              color: on > 0.5 ? "#EBD3F4" : "#4A3355" }}>{NAME[i]}</div>
            <Bar x={x + 28} y={524} w={160} v={on} c="#D79BE8" z={45} h={10} />
            <Pool x={x + 108} y={566} w={220} c="#D79BE8" o={0.2 * on} z={38} />
          </div>
        );
      })}
    </Scene>
  );
};

/* ------------------------------------------------------------------ S4 ----
   13.34 -> 17.58 · ONE. "It reads every posting before you do and scores it,
   so you know which ones are actually worth your time."  TEAL SCANNING BAY.
   A lamp over a table, the posting under it, a scan line sweeping down it, and
   three graded readouts landing beside it.
   ⛔ The grade is the system marking its own read: supporting, never the hero.
   ------------------------------------------------------------------------- */
export const S4Score: React.FC = () => {
  const f = useCurrentFrame();
  /* the chain: cards slide in -> the bar sweeps -> grades stamp -> the F is
     swept off the table. Four events, in order, all visible. */
  const slide = E(f, 2, 20, 0, 1, OUT);
  const scan = E(f, 20, 74, 0, 1, IO);
  const bin = E(f, 78, 122, 0, 1, IN_Q);
  const CARDS: [string, string, string, string, string][] = [
    ["si_indeed.svg",    "Applied AI Eng.", "A", "4.6", "#6FD79A"],
    ["si_glassdoor.svg", "Generalist",      "C", "2.9", "#E8B96A"],
    ["si_upwork.svg",    "Rockstar ninja",  "F", "1.2", "#F08A7E"],
  ];
  return (
    <Scene k="bay" l1="TEN WEIGHTED" hot="CRITERIA" slug="A-F · 1.0 TO 5.0 RUBRIC" dust>
      <Dress items={[["vent", 10, 228, 0.8], ["valve", 948, 240, 0.8],
                     ["pipe", 970, 206, 0.7]]} c="#276169" />
      <Pendant f={f} x={506} y={172} c="#CFF3F5" s={0.88} z={36} />
      <Cone f={f} x={506} y={234} top={120} bot={520} len={330} c="#CFF3F5" o={0.2} />
      {/* the table the cards land on */}
      <Panelled x={68} y={556} w={880} h={30} z={44} a="#2A5A5E" b="#123033" r={5}
                rivets={false} />
      {/* the bin the F ends up in */}
      <Panelled x={846} y={598} w={148} h={128} z={42} a="#1E4448" b="#0C2427" r={8} />
      <div style={{ position: "absolute", left: 862, top: 612, width: 116, textAlign: "center",
        zIndex: 46, fontFamily: MONO, fontWeight: 800, fontSize: 16, letterSpacing: "0.12em",
        color: "#5E8C90" }}>SCREENED<br />OUT</div>
      {CARDS.map(([logo, title, g, v, c], i) => {
        const stamp = E(f, 40 + i * 14, 54 + i * 14, 0, 1, BACK);
        const isF = g === "F";
        const bx = isF ? bin * 590 : 0;
        const by = isF ? bin * 190 : 0;
        return (
          <div key={g}>
            <Card x={44 + i * 306 - (1 - slide) * 440 + bx} y={368 + by} s={0.92}
                  z={50 + i} logo={logo} title={title} rot={-3 + i * 3 + bin * (isF ? 26 : 0)}
                  t={slide} dim={isF && bin > 0.5} />
            {/* the grade, stamped ON the card it belongs to */}
            <div style={{ position: "absolute", left: 186 + i * 306 + bx, top: 300 + by, zIndex: 64,
              opacity: stamp * (isF ? 1 - bin : 1),
              transform: `scale(${0.6 + stamp * 0.4}) rotate(${(1 - stamp) * -18}deg)` }}>
              <div style={{ width: 96, height: 96, borderRadius: 14, background: "#F6F1E4",
                border: `6px solid ${c}`, boxShadow: "0 10px 20px rgba(0,0,0,0.5)",
                display: "flex", flexDirection: "column", alignItems: "center",
                justifyContent: "center", lineHeight: 1 }}>
                <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 46,
                  color: c }}>{g}</span>
                <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 21,
                  color: "#4A4038" }}>{v}</span>
              </div>
            </div>
          </div>
        );
      })}
      {/* the scan bar sweeping across all three */}
      <div style={{ position: "absolute", left: 30, top: 352 + scan * 168, width: 820, height: 5,
        background: "#8FF0F5", zIndex: 66, boxShadow: "0 0 24px rgba(143,240,245,0.95)",
        opacity: scan > 0.02 && scan < 0.99 ? 1 : 0 }} />
      {/* the bot reads it over your shoulder */}
      <Vault x={22} y={286} f={f} s={0.6} z={58} chew={0.18} look={0.5} />
      <Pool x={480} y={572} w={620} c="#6FD3D7" o={0.22} z={38} />
    </Scene>
  );
};

/* ------------------------------------------------------------------ S5 ----
   17.58 -> 21.06 · TWO. "It catches the fake listings. Some of the jobs you got
   rejected from were never real."  OXBLOOD BACK ROOM.
   He knuckles it, it rings hollow, and the whole front FALLS FLAT. Behind it:
   a bricked-up wall. That is the entire idea, in one action.
   ------------------------------------------------------------------------- */
export const S5Fake: React.FC = () => {
  const f = useCurrentFrame();
  const knock = E(f, 6, 12, 0, 1, OUT) * (1 - E(f, 12, 20, 0, 1, OUT));
  const fall = E(f, 22, 62, 0, 1, IN_Q);
  const dust = E(f, 58, 100, 0, 1, OUT);
  return (
    <Scene k="back" l1="IT FLAGS SCAMS" hot="AND GHOST JOBS" slug="POSTING LEGITIMACY CHECK"
           slugC="#F08A7E">
      <Dress items={[["pipe", 6, 226, 0.9], ["board", 900, 250, 0.7],
                     ["crate", 44, 560, 0.8], ["valve", 962, 268, 0.7]]} c="#6E2C31" />
      <Sconce x={62} y={252} c="#F08A7E" s={1.0} />
      <Cone f={f} x={104} y={294} top={70} bot={290} len={290} c="#F08A7E" o={0.18} />
      {/* what is really behind it: bricked up */}
      <div style={{ position: "absolute", left: 322, top: 250, width: 356, height: 320, zIndex: 18,
        background: "#2A1416", opacity: fall, overflow: "hidden" }}>
        {Array.from({ length: 24 }, (_, i) => (
          <div key={i} style={{ position: "absolute",
            left: (i % 4) * 88 + (Math.floor(i / 4) % 2) * 22, top: Math.floor(i / 4) * 62,
            width: 80, height: 54, background: "#3E1D20", border: "2px solid #240F11",
            borderRadius: 2 }} />
        ))}
      </div>
      {/* the frame stays */}
      <div style={{ position: "absolute", left: 304, top: 232, width: 392, height: 356, zIndex: 22,
        border: "18px solid #5A2A2C", borderRadius: 5,
        boxShadow: "0 18px 32px rgba(0,0,0,0.5)" }} />
      {/* the face, going over */}
      <div style={{ position: "absolute", left: 322, top: 250, width: 356, height: 320, zIndex: 44,
        transformOrigin: "50% 100%",
        transform: `perspective(900px) rotateX(${fall * 66}deg) translateY(${fall * 168}px)`,
        borderRadius: 5, background: "linear-gradient(174deg,#7E4B33 0%,#3E2317 100%)",
        boxShadow: "0 20px 38px rgba(0,0,0,0.6)" }}>
        <div style={{ position: "absolute", left: 22, top: 26, right: 22, height: 62,
          background: PAPER_W, borderRadius: 4, display: "flex", alignItems: "center",
          justifyContent: "center", fontFamily: inter.fontFamily, fontWeight: 900,
          fontSize: 26, color: "#20190F" }}>URGENT HIRING</div>
        <Slot x={96} y={192} s={1.0} z={6} />
        {/* it was fixed to the facade, so it goes over with it */}
        <Vault x={78} y={-118} f={f} s={0.86} z={8} chew={0.3} angry={fall} />
      </div>
      {/* the dust it kicks up when it lands */}
      {Array.from({ length: 10 }, (_, i) => (
        <div key={`d${i}`} style={{ position: "absolute", left: 222 + i * 66,
          top: 616 - dust * (36 + (i % 3) * 30), width: 72 + (i % 4) * 26, height: 26,
          borderRadius: 999, background: "#8A5A52", zIndex: 56,
          opacity: dust * (1 - dust) * 2.6 }} />
      ))}
      <Glass f={f} x={674} y={268} w={306} h={168} label="LEGITIMACY · FAIL" c="#F08A7E"
             t={E(f, 52, 62, 0, 1, BACK)}>
        <div style={{ position: "absolute", left: 20, top: 50, fontFamily: inter.fontFamily,
          fontWeight: 900, fontSize: 34, lineHeight: 1.1, color: "#F08A7E" }}>
          NOTHING<br />BEHIND IT
        </div>
        <Pill x={20} y={128} t="GHOST LISTING" c="#F08A7E" s={0.8} />
      </Glass>
      <Pool x={500} y={608} w={460} c="#F08A7E" o={0.2} z={38} />
      <div style={{ position: "absolute", left: 62, top: 452 - knock * 10, zIndex: 60 }}>
        <Mascot lf={f} size={200} stern={1} gaze={3} nodAmp={2.4} nodSpeed={7} />
      </div>
    </Scene>
  );
};

/* ------------------------------------------------------------------ S6 ----
   21.06 -> 23.31 · "They get reposted forever and nobody is hiring."
   COLD SLATE RECORDS ROOM. The SAME listing re-filed eleven times, each with
   its own date, the newest still wet. The last one lands on the cut.
   ------------------------------------------------------------------------- */
export const S6Repost: React.FC = () => {
  const f = useCurrentFrame();
  const D = ["SEP", "OCT", "NOV", "DEC", "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL"];
  return (
    <Scene k="records" l1="THE TELL IS" hot="THE REPOST DATE" slug="11 MONTHS · 0 HIRES">
      <Dress items={[["ladder", 2, 232, 0.72], ["vent", 938, 226, 0.7]]} c="#454D5A" />
      <Pendant f={f} x={506} y={156} c="#AEB8C6" s={0.76} z={36} bulbs={4} />
      <Cone f={f} x={506} y={208} top={110} bot={660} len={340} c="#AEB8C6" o={0.12} />
      {/* the board it keeps going back up on */}
      <Panelled x={18} y={240} w={976} h={412} z={20} a="#39404C" b="#1E232B" r={8} />
      {/* ⛔ THE STORY IS THE REPETITION: the SAME listing, from the SAME board,
          pinned again and again with a new date each time. Eleven identical
          cards is the point — it is one job, not eleven. */}
      {D.map((d, i) => {
        const t = E(f, i * 4, 10 + i * 4, 0, 1, OUT);
        const col = i % 6, row = Math.floor(i / 6);
        return (
          <div key={d}>
            <Card x={34 + col * 160} y={266 + row * 190 - (1 - t) * 200} s={0.58}
                  z={30 + i} logo="si_glassdoor.svg" title="Applied AI Eng."
                  rot={(i % 4) * 2.6 - 3.9} t={t} dim={i < D.length - 1} />
            {/* the pin, and the date it went back up */}
            <div style={{ position: "absolute", left: 44 + col * 160, top: 256 + row * 190,
              width: 18, height: 18, borderRadius: 999, background: "#8D97A6", zIndex: 46,
              opacity: t, boxShadow: "0 3px 6px rgba(0,0,0,0.5)" }} />
            <div style={{ position: "absolute", left: 70 + col * 160, top: 252 + row * 190,
              zIndex: 47, opacity: t, padding: "3px 9px", borderRadius: 4,
              border: "2px solid #E0443E", fontFamily: MONO, fontWeight: 800, fontSize: 15,
              color: "#F08A7E", whiteSpace: "nowrap",
              background: "rgba(12,16,22,0.65)" }}>{d}</div>
          </div>
        );
      })}
      <Glass f={f} x={636} y={648} w={338} h={112} label="SAME LISTING" c="#AEB8C6"
             t={E(f, 34, 46, 0, 1, BACK)}>
        <BigNum x={20} y={44} v="11" c="#DDE4EC" size={54} />
        <div style={{ position: "absolute", left: 74, top: 60, fontFamily: MONO, fontWeight: 800,
          fontSize: 19, letterSpacing: "0.12em", color: "#8D97A6", whiteSpace: "nowrap" }}>MONTHS</div>
        <div style={{ position: "absolute", left: 214, top: 40, fontFamily: inter.fontFamily,
          fontWeight: 900, fontSize: 52, lineHeight: 1, color: "#F08A7E" }}>0</div>
        <div style={{ position: "absolute", left: 252, top: 60, fontFamily: MONO, fontWeight: 800,
          fontSize: 19, letterSpacing: "0.12em", color: "#8D97A6", whiteSpace: "nowrap" }}>HIRES</div>
      </Glass>
    </Scene>
  );
};

/* ------------------------------------------------------------------ S7 ----
   23.31 -> 29.19 · THREE. "It finds the real person to contact instead of the
   application portal, and writes the email for you to send them."  ⛔ THE PEAK.
   WARM GOLD CORRIDOR. He walks past the lit APPLYVAULT slot and KNOCKS. The
   door opens on a person. The letter is already written, and then it goes.
   ⛔ THE ONLY PLACE APPLYVAULT LOSES. Its lamp dies on the knock.
   ⛔ GATE THE HOW: the subject line is legible, the body never is.
   ------------------------------------------------------------------------- */
export const S7Human: React.FC = () => {
  const f = useCurrentFrame();
  const walk = E(f, 0, 42, 0, 1, IO);
  const knock = f >= 44;
  const open = E(f, 48, 110, 0, 1, OUT);
  const hand = E(f, 96, 138, 0, 1, BACK);
  const send = E(f, 140, 174, 0, 1, IO);
  return (
    <Scene k="office" l1="IT WRITES IT." hot="YOU SEND IT." slug="THE HIRING MANAGER" dust>
      <Dress items={[["board", 2, 250, 0.72], ["pipe", 962, 214, 0.8],
                     ["clock", 856, 244, 0.7]]} c="#63482F" />
      <Sconce x={44} y={250} c="#F3CE79" s={0.95} />
      <Cone f={f} x={86} y={292} top={64} bot={250} len={250} c="#F3CE79" o={0.16} />
      <DoorRow n={2} y={444} x0={18} z={12} s0={0.5} />
      {/* the doorway, and the warm room behind it */}
      <div style={{ position: "absolute", left: 380, top: 236, width: 344, height: 336, zIndex: 24,
        borderRadius: 5, background: "#1A130C", border: "16px solid #4A3520", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: open,
          background: "linear-gradient(180deg,#F8DCA0,#C98F3E)" }} />
      </div>
      <Cone f={f} x={548} y={570} top={230} bot={400} len={215} c="#F3CE79" o={0.3 * open} z={26} />
      {/* the person who was behind it the whole time */}
      <div style={{ position: "absolute", left: 492, top: 372, zIndex: 44, opacity: open,
        transform: `translateY(${(1 - open) * 22}px)` }}>
        <Mascot lf={f} size={196} suit={1} gaze={-2} nodAmp={2.4} nodSpeed={7} />
      </div>
      {/* the leaf, swinging away to the left */}
      <div style={{ position: "absolute", left: 380, top: 236, width: 344, height: 336, zIndex: 46,
        transformOrigin: "0% 50%", transform: `perspective(880px) rotateY(${-open * 68}deg)`,
        borderRadius: 5, background: "linear-gradient(174deg,#7E5A33 0%,#3A2917 100%)",
        boxShadow: "0 18px 34px rgba(0,0,0,0.55)" }}>
        <Slot x={96} y={188} s={1.06} z={6} live={!knock} />
      </div>
      <Glass f={f} x={706} y={262} w={276} h={108} label="CONTACT FOUND" c="#6FD79A" t={open}>
        <div style={{ position: "absolute", left: 20, top: 52, fontFamily: inter.fontFamily,
          fontWeight: 900, fontSize: 27, color: "#B7F2D0" }}>HIRING MANAGER</div>
      </Glass>
      {/* the courier */}
      <div style={{ position: "absolute", left: 42 + walk * 176, top: 430, zIndex: 52 }}>
        <Mascot lf={f} size={200} suit={1} gaze={2} nodAmp={knock ? 1 : 3} nodSpeed={9} />
      </div>
      {/* ⛔ THE LETTER IS WRITTEN, THEN IT TRAVELS. A camera push alone could not
          carry this tail: at 5.9s it is the longest scene in the reel. It goes UP
          AND RIGHT, above the manager's head, never across him. */}
      <Letter x={62 + send * 330} y={590 - send * 410} s={0.78 - send * 0.14} z={70} t={hand} />
      {/* ⛔ THE VILLAIN, IN FRAME, LOSING. Lit and chewing until the knock, then
          dark and tipped over. This is the ONLY place APPLYVAULT loses. */}
      <Vault x={196} y={318} f={f} s={0.62} z={40} chew={knock ? 0 : 0.55}
             dead={knock} angry={knock ? 1 : 0} look={0.3} />
      <Pool x={548} y={604} w={420} c="#F3CE79" o={0.26 * open} z={38} />
      {/* the portal, struck off — the one place it loses */}
      <div style={{ position: "absolute", left: 296, top: 688, zIndex: 66,
        opacity: knock ? 0.55 : 1 }}>
        <div style={{ padding: "9px 18px", borderRadius: 9,
          background: knock ? "#2B313A" : "#0F131A",
          border: `2px solid ${knock ? "#5A6474" : "#F08A7E"}`, fontFamily: MONO, fontWeight: 800,
          fontSize: 22, letterSpacing: "0.14em", color: knock ? "#8D97A6" : "#F08A7E",
          textDecoration: knock ? "line-through" : "none" }}>APPLYVAULT</div>
      </div>
    </Scene>
  );
};

/* ------------------------------------------------------------------ S8 ----
   29.19 -> 34.35 · FOUR. "When the offer actually comes, it writes your
   negotiation, including what to say when they lowball you."
   ⛔⛔ THE REEL'S HERO ARTIFACT. Their figure goes up, is STRUCK THROUGH, and a
   taller gold one goes up over it. Nothing else moves while it happens, and the
   camera is on `slow` so it cannot eat the moment.
   ⛔ NO CURRENCY FIGURE — nothing sourced backs one, so the raise is a BAR.
   ------------------------------------------------------------------------- */
export const S8Offer: React.FC = () => {
  const f = useCurrentFrame();
  /* THE STORY, in four moves you can see:
       f 0-20   their slab DROPS on their pan and the beam goes their way
       f 26-48  the GEOGRAPHIC DISCOUNT weight is lifted off your pan and thrown
       f 54-128 three gold blocks land on yours, one at a time, each with a thud
       f 128+   the beam has swung, their side is up, COUNTER SENT lands
     ⛔ This replaces a bar chart. 29s is the beat the hook has been promising
        since frame 0, and it was the only readout left in the reel. */
  const drop = E(f, 2, 20, 0, 1, IN_Q);
  const lift = E(f, 26, 48, 0, 1, OUT);
  const toss = E(f, 44, 74, 0, 1, IN_Q);
  const B = [E(f, 54, 76, 0, 1, IN_Q), E(f, 80, 102, 0, 1, IN_Q), E(f, 106, 128, 0, 1, IN_Q)];
  const landed = B.filter((x) => x > 0.98).length;
  const sent = E(f, 132, 152, 0, 1, BACK);

  const SX = 506, SY = 268, SS = 0.82;
  const ang = drop * 11 - landed * 7.5 - (1 - lift) * 3 + Math.sin(f / 7) * (landed >= 3 ? 0.5 : 1.1);
  const theirs = panAt(SX, SY, -1, ang, SS);
  const yours = panAt(SX, SY, 1, ang, SS);

  return (
    <Scene k="table" l1="AND THE COMPETING" hot="OFFER PLAY"
           slug="GEOGRAPHIC DISCOUNT · REFUSED" dust>
      <Dress items={[["board", 4, 244, 0.7], ["vent", 930, 248, 0.62],
                     ["pipe", 972, 214, 0.7]]} c="#2E3F63" />
      <Pendant f={f} x={506} y={158} c="#CFE0FF" s={0.8} z={34} />
      <Cone f={f} x={506} y={214} top={110} bot={620} len={330} c="#CFE0FF" o={0.16} z={18} />

      <Scale x={SX} y={SY} s={SS} z={44} tipTheirs={drop} liftOff={lift} blocks={landed} f={f} />

      {/* THEIR opening offer, dropping in from their side */}
      <Block x={theirs.x} y={theirs.y - 50 * SS - (1 - drop) * 230} t="THEIR OFFER"
             s={SS} z={62} o={drop > 0.02 ? 1 : 0} rot={-2} />

      {/* the weight THEY put on YOUR pan, and Claude taking it off */}
      <Block x={yours.x + (toss > 0 ? toss * 320 : 0)}
             y={yours.y - 50 * SS - lift * 160 + toss * 470}
             t="GEOGRAPHIC DISCOUNT" s={SS * 0.92} z={64}
             o={toss > 0.9 ? 0 : 1} rot={-3 + toss * 62} />

      {/* what it writes back, stacked on yours: reasons, not numbers */}
      {["MARKET RATE", "COMPETING OFFER", "SCOPE OF ROLE"].map((t, i) => (
        <Block key={t} x={yours.x} y={yours.y - 50 * SS - i * 50 * SS - (1 - B[i]) * 330}
               t={t} gold s={SS} z={66 + i} o={B[i] > 0.02 ? 1 : 0} rot={-2 + i * 2} />
      ))}

      {/* the bot is the party on the other side, and it sours as it loses */}
      <Vault x={36} y={648} f={f} s={0.6} z={58} chew={0.2} angry={lift} look={0.45} />
      <Pool x={100} y={640} w={280} c="#8FA8E8" o={0.16} z={38} />
      <div style={{ position: "absolute", left: 828, top: 452, zIndex: 60 }}>
        <Mascot lf={f} size={176} suit={1} cheer={landed >= 2 ? 0.7 : 0} nodAmp={2.6} nodSpeed={8} />
      </div>
      <Pool x={900} y={640} w={280} c="#F3CE79" o={0.2 * (landed / 3)} z={38} />

      <div style={{ position: "absolute", left: 342 + (1 - sent) * 460, top: 690, zIndex: 70,
        opacity: sent }}>
        <div style={{ padding: "11px 24px", borderRadius: 10, border: "3px solid #6FD79A",
          background: "rgba(18,60,40,0.92)", fontFamily: inter.fontFamily, fontWeight: 900,
          fontSize: 30, color: "#B7F2D0", whiteSpace: "nowrap" }}>COUNTER SENT</div>
      </div>
    </Scene>
  );
};

/* ------------------------------------------------------------------ S9 ----
   34.35 -> 36.70 · "Then it reads your contract clause by clause before you
   sign."  SEPIA STUDY. One lamp, the scroll, a marker walking down it, a tick
   per cleared clause and ONE flag, because a reader that approves everything is
   not reading.
   ------------------------------------------------------------------------- */
export const S9Contract: React.FC = () => {
  const f = useCurrentFrame();
  const open = E(f, 0, 16, 0.1, 1, OUT);
  const walk = E(f, 12, 62, 0, 1, IO);
  return (
    <Scene k="study" l1="PLUS THE QUESTIONS" hot="FOR A LAWYER"
           slug="CLAUSE WALK · LAWYER QUESTIONS" dust>
      <Dress items={[["shelf", 20, 240, 0.86], ["clock", 900, 244, 0.72],
                     ["crate", 940, 452, 0.7]]} c="#63532F" />
      <Pendant f={f} x={382} y={162} c="#F8E3AF" s={0.8} z={36} />
      <Cone f={f} x={382} y={216} top={110} bot={500} len={356} c="#F8E3AF" o={0.22} />
      <Panelled x={104} y={562} w={716} h={34} z={44} a="#63532F" b="#332A1C" r={5} rivets={false} />
      <Scroll x={176} y={258} s={1.02} z={54} open={open} walk={walk} rows={8} flagAt={5} />
      <Glass f={f} x={678} y={272} w={294} h={168} label="OFFER-PREP" c="#E8C97F"
             t={E(f, 16, 28, 0, 1, BACK)}>
        <BigNum x={20} y={52} v={String(Math.round(walk * 8))} c="#F8E3AF" size={62} />
        <div style={{ position: "absolute", left: 80, top: 70, fontFamily: MONO, fontWeight: 800,
          fontSize: 19, letterSpacing: "0.12em", color: "#8D97A6" }}>/ 8 CLAUSES</div>
        <Bar x={20} y={130} w={254} v={walk} c="#E8C97F" />
      </Glass>
      <Pool x={392} y={596} w={480} c="#E8C97F" o={0.24} z={38} />
      <div style={{ position: "absolute", left: 828, top: 468, zIndex: 60 }}>
        <Mascot lf={f} size={182} prof={1} gaze={-3} nodAmp={2.2} nodSpeed={6} />
      </div>
    </Scene>
  );
};

/* ----------------------------------------------------------------- S10 ----
   36.70 -> 38.63 · "Comment JOBS and I'll send you the whole system for free."
   ⛔ HARD CUT ON THE KEYWORD. Nothing after it.
   ⚠️ The take says "DROPS". Alex's call was to keep JOBS on screen and in the
      written caption; the audio is untouched.
   ------------------------------------------------------------------------- */
export const S10Cta: React.FC = () => {
  const f = useCurrentFrame();
  const pop = E(f, 0, 13, 0.84, 1, BACK);
  const seal = E(f, 7, 24, 0, 1, BACK);
  return (
    <Scene k="vault" l1="COMMENT" hot="JOBS" slug="AND IT IS YOURS">
      <Pendant f={f} x={506} y={158} c="#6FD79A" s={0.9} />
      <Cone f={f} x={506} y={218} top={130} bot={680} len={360} c="#6FD79A" o={0.14} />
      <Confetti f={f} x={506} y={140} start={2} n={54} />
      <div style={{ position: "absolute", left: -300 + ((f * 26) % 1500), top: 200, width: 220,
        height: 420, zIndex: 61, transform: "skewX(-18deg)", pointerEvents: "none",
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.10), transparent)" }} />
      {/* the villain, finally down and dark */}
      <Vault x={726} y={744} f={f} s={0.72} z={30} dead />
      <div style={{ position: "absolute", left: 138, top: 268, width: 736, height: 276, zIndex: 60,
        borderRadius: 30, background: "linear-gradient(176deg,#D2724E,#A8482A)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        gap: 6, boxShadow: "0 26px 48px rgba(0,0,0,0.6)",
        transform: `scale(${pop * (1 + Math.sin(f / 9) * 0.013)})` }}>
        <div style={{ width: 82, height: 82, borderRadius: 999, border: "5px solid #F6E4A0",
          background: "linear-gradient(180deg,#F0CB63,#D39A2A)", display: "flex",
          alignItems: "center", justifyContent: "center", fontSize: 40, color: "#3a2a05",
          transform: `scale(${seal})` }}>{"✓"}</div>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 28,
          letterSpacing: "0.22em", color: "#F8DFD3" }}>COMMENT</div>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 146,
          lineHeight: 1, letterSpacing: "-0.03em", color: "#FCF7EF" }}>JOBS</div>
      </div>
      <div style={{ position: "absolute", left: 140, top: 552, zIndex: 62, display: "flex",
        alignItems: "center", gap: 12, padding: "12px 20px", borderRadius: 999,
        background: "#F8F4EC", boxShadow: "0 12px 24px rgba(0,0,0,0.45)" }}>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 30,
          color: "#8C8377" }}>JOBS</div>
        <div style={{ width: 46, height: 46, borderRadius: 999, background: "#D2724E",
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24,
          color: "#FCF7EF" }}>{"➤"}</div>
      </div>
      <Pool x={506} y={716} w={420} c="#6FD79A" o={0.24} z={38} />
      <div style={{ position: "absolute", left: 412, top: 542, zIndex: 62 }}>
        <Mascot lf={f} size={214} cheer={0.9} nodAmp={5} nodSpeed={8} glasses={1} />
      </div>
    </Scene>
  );
};
