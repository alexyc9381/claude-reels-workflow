import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { fraunces } from "./fonts";
import { MONO } from "./SlopKit";
import {
  W, H, E, OUT, IO, BACK, LIN, SH, SH_D, rnd, mxh, dkh,
  CLAY, GOLD, GREEN, RED, SKY, INK, OAK, OAKD, STEEL, STEELD, BRASS, BRASSD,
  CARD, CARDD, CARDL, LAMPC, Hall, Spot, Lamp, Bench, RackEdge, Scene, Contact,
  MarkCast, usePlace, DOMAINS, REPO, PLAN,
} from "./SeoWorld";
import {
  Sheen, drift, sway, PageSheet, Flag, DomainIcon, Auditor, ScoreDial, FlagTray,
} from "./SeoProps";

/* ===========================================================================
   REEL 102 · FOUR HOOK CONCEPTS, for selection.

   ⛔⛔ WHY THIS FILE EXISTS. Alex, on the built hook: *"still not hierarchical
      whatsoever, too much little graphics, completely redo the first scene
      idea."* The measurement agreed and I had it on the sheet the whole time —
      S0's top-cell share was **0.057**, and [[apple-reel]] lesson 5 names that
      exact signature: *"six similar movers is by definition no hierarchy...
      HIERARCHY IS HERO SIZE, NOT MOVER COUNT."* Rounds 3-5 fixed text, then
      density, and never fixed RANK: the frame ended up as twenty objects of
      roughly equal visual weight.

   ⛔ AND THE PROCESS WAS THE REAL MISS. docs/THE-OPEN.md §1 is explicit: *"The
      first build step of any reel is not scene 0. It is N concepts for scene 0
      ... Do not author an open and then defend it."* I authored one and
      defended it through four rounds. This is that step, late.

   THE RULE EVERY CONCEPT BELOW IS BUILT TO: **one object owns 30-48% of the
   panel and nothing else clears 8%.** The world stays behind it, held down, so
   the frame is still a place rather than a shape on black
   ([[feedback_hook_simplicity]]) — but there is never any question what the
   first thing to look at is.

   Each still also has to clear the only measured performance rule we have
   ([[feedback_frame0_claim_plate]]): a contiguous cream plate >= 18% of the
   panel starting below y=120, the real Claude mark on a white tile, and a
   number in Fraunces >= 74px, all present at frame 0.
   ========================================================================= */

const HZ_STAGE = { top: 118, bot: 726 };

/** the world, held DOWN, shared by all four so the comparison is about the IDEA */
const Backdrop: React.FC<{ f: number; dim?: number }> = ({ f, dim = 1 }) => {
  const p = usePlace("open");
  return (<>
    <Hall p={p} f={f} lightX={0.5} floorLines={4} />
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <Lamp key={"bl" + i} x={92 + i * 166} y={112} on={0.30 * dim} s={0.58} f={f}
        len={170} spread={130} z={12} />))}
    <div style={{ position: "absolute", inset: 0, zIndex: 3, opacity: 0.34 * dim }}>
      {Array.from({ length: 8 }, (_, i) => (
        <PageSheet key={"bp" + i} x={14 + (i % 4) * 250} y={150 + Math.floor(i / 4) * 250}
          w={224} h={222} z={4} kind={i} f={f + i * 9} lit={0.5} dim={0.30} />))}
    </div>
  </>);
};

/* =========================================================================
   H1 · THE RANK — the object SEO is actually about. A search-results column
   fills the frame; your page sits at 9 and rockets to 1.
   ⭐ "A number MOVES to its value" ([[feedback_graphical_over_textual]]) — the
   rank is not typeset at 1, it TRAVELS there past the results it beat.
   HERO: the results panel, 820x486 = 49.7% of the panel.
   ====================================================================== */
export const H1Rank: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("open");
  const climb = E(f, 8, 30, 0, 1, IO);
  const ROWS = 6, RH = 66, TOP = 176;
  /* your card starts at row 5 and travels to row 0 */
  const yourY = TOP + (5 - climb * 5) * RH;
  return (
    <Scene p={p} slug="" push={[0, 60, 1.04]} vig={0.34}>
      <Backdrop f={f} dim={0.8} />
      {/* THE HERO: the results column */}
      <div style={{ position: "absolute", left: 96, top: 150, width: 820, height: 486,
        zIndex: 40, background: CARDL, borderRadius: 22, border: `4px solid ${CARDD}`,
        boxShadow: SH_D, overflow: "hidden" }}>
        <Sheen f={f} phase={2} z={30} o={0.045} />
        {/* the query bar */}
        <div style={{ position: "absolute", left: 26, top: 22, right: 26, height: 54,
          borderRadius: 27, background: "#EFE9DB", border: `3px solid ${CARDD}`,
          display: "flex", alignItems: "center", paddingLeft: 22, gap: 14 }}>
          <svg width={26} height={26} viewBox="0 0 26 26">
            <circle cx={11} cy={11} r={8} fill="none" stroke="#8A8175" strokeWidth={3.4} />
            <line x1={17} y1={17} x2={23} y2={23} stroke="#8A8175" strokeWidth={3.4}
              strokeLinecap="round" />
          </svg>
          <div style={{ height: 12, width: "46%", borderRadius: 6, background: "#C6BFB1" }} />
        </div>
        {/* the other results, all grey, all the same — so yours is the only event */}
        {Array.from({ length: ROWS }, (_, i) => (
          <div key={"rr" + i} style={{ position: "absolute", left: 26, right: 26,
            top: TOP - 150 + i * RH, height: RH - 14, borderRadius: 10,
            background: "#EAE4D6", display: "flex", alignItems: "center", gap: 14,
            paddingLeft: 18 }}>
            <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26,
              color: "#B0A794", width: 26 }}>{i + 1}</span>
            <div style={{ height: 11, width: `${52 - i * 5}%`, borderRadius: 6,
              background: "#CFC6B3" }} />
          </div>))}
        {/* YOUR RESULT — the only coloured thing in the panel */}
        <div style={{ position: "absolute", left: 26, right: 26, top: yourY - 150,
          height: RH - 14, borderRadius: 10, background: CARDL,
          border: `4px solid ${CLAY}`, boxShadow: SH_D, zIndex: 20,
          display: "flex", alignItems: "center", gap: 14, paddingLeft: 14 }}>
          <span style={{ width: 40, height: 40, borderRadius: 10, background: "#FFF",
            border: "2px solid #E8DCC0", display: "flex", alignItems: "center",
            justifyContent: "center", flexShrink: 0 }}>
            <Img src={staticFile("claude_logo.png")}
              style={{ width: 28, height: 28, objectFit: "contain" }} /></span>
          <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 22, color: "#241F17" }}>
            {REPO.site}</span>
          <span style={{ marginLeft: "auto", marginRight: 14, display: "flex", gap: 5 }}>
            {DOMAINS.map((d, i) => (
              <span key={"yd" + i} style={{ width: 26, height: 26, borderRadius: 13,
                border: `3px solid ${d.c}`, background: CARDL, display: "flex",
                alignItems: "center", justifyContent: "center" }}>
                <DomainIcon k={d.key} s={0.20} c={d.c} on={1} /></span>))}
          </span>
        </div>
        {/* THE RANK, huge, counting down as the card climbs */}
        <div style={{ position: "absolute", right: 30, bottom: 16, display: "flex",
          alignItems: "baseline", gap: 10, zIndex: 24 }}>
          <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 20, color: "#8A8175",
            letterSpacing: "0.14em" }}>RANK</span>
          <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 108,
            lineHeight: 0.86, color: climb > 0.7 ? GREEN : "#241F17" }}>
            {Math.max(1, Math.round(6 - climb * 5))}</span>
        </div>
      </div>
      <Auditor x={952} base={718} s={0.64} z={80} f={f} gaze={0.9} costume={{ glasses: 1 }} />
      <RackEdge side="l" c={dkh(STEELD, 0.34)} w={40} z={92} />
    </Scene>
  );
};

/* =========================================================================
   H2 · THE SCORE — one enormous 0-100 dial, the needle buried in the red,
   climbing. The repo's own output, at the scale of the whole frame.
   HERO: the dial face, 560px diameter = 30.7% of the panel.
   ====================================================================== */
export const H2Score: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("open");
  const v = E(f, 8, 40, 0.14, 0.92, IO);
  return (
    <Scene p={p} slug="" push={[0, 60, 1.04]} vig={0.34}>
      <Backdrop f={f} dim={0.8} />
      {/* THE HERO: the dial, drawn big enough to be the whole idea */}
      {/* ⛔ `ScoreDial` scales about its OWN CENTRE (transformOrigin 50% 50%), so
          a 168px base at s=3.34 is a 561px disc centred on (x+84, y+84) — placed
          naively at (118,152) it hung 78px past the left edge and 44px past the
          top. Positioned from the centre it should be: centre (400,364) means
          left = 400-84 = 316, top = 364-84 = 280. */}
      <div style={{ position: "absolute", left: 316, top: 280, zIndex: 40 }}>
        <ScoreDial x={0} y={0} p={v} s={3.34} z={40} f={f} show={false} />
      </div>
      {/* the number sits in the dial's lower half, below the needle hub */}
      <div style={{ position: "absolute", left: 120, top: 392, width: 560,
        textAlign: "center", zIndex: 50 }}>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 158,
          lineHeight: 0.84, color: v > 0.7 ? GREEN : v > 0.4 ? GOLD : RED }}>
          {Math.round(v * 100)}</div>
        <div style={{ fontFamily: MONO, fontWeight: 900, fontSize: 24, color: "#6E6558",
          letterSpacing: "0.22em", marginTop: 10 }}>SEO SCORE</div>
      </div>
      {/* second place, and clearly second: the site being scored */}
      <div style={{ position: "absolute", left: 726, top: 214, zIndex: 44 }}>
        <PageSheet x={0} y={0} w={214} h={272} z={44} kind={0} f={f} lit={1}
          label={REPO.site} />
      </div>
      <div style={{ position: "absolute", left: 726, top: 512, width: 214, zIndex: 46,
        display: "flex", gap: 7, justifyContent: "center" }}>
        {DOMAINS.map((d, i) => (
          <span key={"sd" + i} style={{ width: 36, height: 36, borderRadius: 18,
            background: CARDL, border: `3px solid ${d.c}`, display: "flex",
            alignItems: "center", justifyContent: "center" }}>
            <DomainIcon k={d.key} s={0.28} c={d.c} on={1} /></span>))}
      </div>
      <div style={{ position: "absolute", left: 748, top: 570, width: 170, height: 170,
        borderRadius: 40, background: "#FFF", border: "3px solid #E8DCC0", zIndex: 46,
        display: "flex", alignItems: "center", justifyContent: "center", boxShadow: SH }}>
        <Img src={staticFile("claude_logo.png")}
          style={{ width: 124, height: 124, objectFit: "contain" }} />
      </div>
      <Auditor x={64} base={722} s={0.58} z={80} f={f} gaze={0.9} costume={{ glasses: 1 }} />
    </Scene>
  );
};

/* =========================================================================
   H3 · THE LENS — one giant page fills the frame and a single enormous
   magnifier passes over it. Under the glass, the faults are visible; outside
   it, the page looks fine. That IS the reel's premise in one image.
   HERO: the page, 620x520 = 40.2% of the panel.
   ====================================================================== */
export const H3Lens: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("open");
  const sweep = E(f, 6, 46, 0, 1, IO);
  const lx = 180 + sweep * 470, ly = 300 + Math.sin(sweep * 3.1) * 60;
  return (
    <Scene p={p} slug="" push={[0, 60, 1.04]} vig={0.34}>
      <Backdrop f={f} dim={0.7} />
      {/* THE HERO: one page, big */}
      <div style={{ position: "absolute", left: 66, top: 146, zIndex: 40 }}>
        <PageSheet x={0} y={0} w={620} h={520} z={40} kind={0} f={f} lit={1}
          label={REPO.site} />
      </div>
      {/* the faults, only where the glass is */}
      {PLAN.map((q, i) => {
        const fx = 150 + (i % 3) * 210, fy = 250 + Math.floor(i / 3) * 190;
        const near = Math.max(0, 1 - Math.hypot(fx - lx, fy - ly) / 170);
        if (near <= 0.02) return null;
        return <Flag key={"lf" + i} x={fx} y={fy} c={q.d.c} s={0.9} z={58} f={f}
          seed={i} o={near} />;
      })}
      {/* THE GLASS — one object, and it is the second largest thing in frame */}
      <div style={{ position: "absolute", left: lx - 165, top: ly - 165, zIndex: 62 }}>
        <svg width={330} height={330} viewBox="0 0 330 330">
          <circle cx={150} cy={150} r={128} fill="#DCE6EC" opacity={0.30} />
          <circle cx={150} cy={150} r={128} fill="none" stroke={BRASSD} strokeWidth={22} />
          <circle cx={150} cy={150} r={128} fill="none" stroke={BRASS} strokeWidth={10} />
          <line x1={240} y1={240} x2={316} y2={316} stroke="#6E4A30" strokeWidth={30}
            strokeLinecap="round" />
          <path d="M 96 100 A 76 76 0 0 1 156 70" stroke="#FFFFFF" strokeWidth={14}
            fill="none" opacity={0.45} strokeLinecap="round" />
        </svg>
      </div>
      {/* the claim, small and to one side — third place, and it looks it */}
      <div style={{ position: "absolute", left: 726, top: 190, width: 240, zIndex: 70,
        background: CARDL, borderRadius: 18, border: `4px solid ${CARDD}`,
        boxShadow: SH_D, padding: "18px 16px", textAlign: "center" }}>
        <div style={{ width: 132, height: 132, borderRadius: 32, background: "#FFF",
          border: "2px solid #E8DCC0", margin: "0 auto 12px", display: "flex",
          alignItems: "center", justifyContent: "center" }}>
          <Img src={staticFile("claude_logo.png")}
            style={{ width: 98, height: 98, objectFit: "contain" }} /></div>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 76,
          lineHeight: 0.9, color: "#241F17" }}>18</div>
        <div style={{ fontFamily: MONO, fontWeight: 900, fontSize: 17, color: "#8A8175",
          letterSpacing: "0.14em" }}>AGENTS</div>
      </div>
      <Auditor x={866} base={722} s={0.60} z={80} f={f} gaze={0.9} costume={{ glasses: 1 }} />
    </Scene>
  );
};

/* =========================================================================
   H4 · THE STAMP — one colossal audit seal slams onto the site. A thing
   coming DOWN hard is the cleanest interrupt there is, and a seal is a single
   silhouette, so the hierarchy is not arguable.
   HERO: the seal, 520px diameter = 26.5%, plus the page under it.
   ====================================================================== */
export const H4Stamp: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("open");
  const drop = E(f, 4, 14, 0, 1, IO);
  const settle = E(f, 14, 30, 0, 1, OUT);
  const D = 566;   /* 520 measured 17.85% cream, under the 18% gate */
  return (
    <Scene p={p} slug="" push={[0, 60, 1.04]} vig={0.34}>
      <Backdrop f={f} dim={0.8} />
      {/* the site, being stamped */}
      <div style={{ position: "absolute", left: 300, top: 196, zIndex: 36 }}>
        <PageSheet x={0} y={0} w={412} h={430} z={36} kind={0} f={f} lit={1}
          label={REPO.site} />
      </div>
      {/* THE HERO: the seal, arriving from above and landing on the page */}
      <div style={{ position: "absolute", left: W / 2 - D / 2,
        top: 180 + (1 - drop) * -260, width: D, height: D, zIndex: 60,
        transform: `scale(${1.4 - drop * 0.4 + settle * 0.0}) rotate(${-8 + drop * 8}deg)`,
        opacity: Math.min(1, drop * 2.2) }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: D / 2,
          background: CARDL, border: `14px solid ${CLAY}`, boxShadow: SH_D }} />
        <div style={{ position: "absolute", inset: 22, borderRadius: D / 2,
          border: `5px solid ${mxh(CLAY, 0.42)}` }} />
        {/* the mark, centred and large */}
        <div style={{ position: "absolute", left: D / 2 - 96, top: 74, width: 192,
          height: 192, borderRadius: 46, background: "#FFF", border: "3px solid #E8DCC0",
          display: "flex", alignItems: "center", justifyContent: "center", boxShadow: SH }}>
          <Img src={staticFile("claude_logo.png")}
            style={{ width: 140, height: 140, objectFit: "contain" }} />
        </div>
        {/* the number, big, inside the seal */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 286, textAlign: "center" }}>
          <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 96,
            lineHeight: 0.9, color: "#241F17" }}>
            <span style={{ color: BRASSD, fontSize: 66 }}>&#9733;</span>{REPO.stars}</div>
        </div>
        {/* the five domains, set around the seal's foot like a stamp's legend */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 54,
          display: "flex", justifyContent: "center", gap: 10 }}>
          {DOMAINS.map((d, i) => (
            <span key={"td" + i} style={{ width: 48, height: 48, borderRadius: 24,
              background: CARDL, border: `4px solid ${d.c}`, display: "flex",
              alignItems: "center", justifyContent: "center" }}>
              <DomainIcon k={d.key} s={0.36} c={d.c} on={1} /></span>))}
        </div>
      </div>
      {/* the impact ring, only on the landing frames */}
      {drop > 0.9 && settle < 0.9 && (
        <div style={{ position: "absolute", left: W / 2 - 300 - settle * 120,
          top: 420 - settle * 60, width: 600 + settle * 240, height: 120 + settle * 120,
          borderRadius: "50%", border: `${9 - settle * 7}px solid ${CLAY}`,
          opacity: 0.5 - settle * 0.5, zIndex: 58 }} />)}
      <Auditor x={110} base={722} s={0.62} z={80} f={f} gaze={0.9}
        shock={drop > 0.9 && settle < 0.5 ? 0.8 : 0} costume={{ glasses: 1 }} />
      <FlagTray x={790} y={706} s={0.72} z={74} f={f} />
    </Scene>
  );
};
