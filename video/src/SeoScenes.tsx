import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { inter, fraunces } from "./fonts";
import { MONO } from "./SlopKit";
/* the rich copy, same one SeoProps uses, so costumes match across the reel */
import { Mascot } from "./ClaudeOsReel";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, mxh, dkh, SH, SH_D, rnd,
  CLAY, GOLD, GREEN, RED, SKY, PAPER, INK, OAK, OAKD, STEEL, STEELD,
  BRASS, BRASSD, CARD, CARDD, CARDL, TAGR, LAMPC,
  Hall, Spot, Lamp, Bench, RackEdge, BackWall, Scene, Cam, Beam, Motes, Chip, Slug,
  Plate, BigNum, Contact, Mark, MarkCast, usePlace, idle,
  AGENTS, DOMAINS, PLAN, REPO, shortAgent, SCENE_COSTUME, SPRITE_COSTUME,
} from "./SeoWorld";
import {
  Sheen, sway, RepoCard, AgentChip, IconBurst, IconStorm, PageSheet, SitePage, SerpCard, Flag, Rack, DomainIcon,
  PlanLadder, ScoreDial, TermBox, DomainPlate, AnswerCard, MapCard, EditorPane,
  GuideBook, Press, Station, WallClock, Auditor, CountPlate, FactChip, SweepBar,
  Mug, Magnifier, FlagTray,
} from "./SeoProps";

/* ===========================================================================
   REEL 102 "SEO" · THE BODY.  Board: storyboards/102-seo.md.

   ⛔⛔ EVERY EVENT FRAME BELOW IS A MEASURED WORD ONSET from
      src/data/words_seo.json, converted to LOCAL Sequence frames, with the
      PICTURE LEADING THE ONSET BY 4 FRAMES so the crossover — not the start —
      lands on the syllable.
      root onsets (s):  I 0.00 · It-will-audit 4.00 · even-geo 6.16 ·
                        Then 7.94 · and-even-fixes 9.94 · And-it-comes 11.88 ·
                        all-trained 14.64 · So-rather 17.14 · try-this 19.30 ·
                        Comment 20.02
      scene `at` (frames, lead-4): 0 / 116 / 181 / 234 / 294 / 352 / 435 /
                        510 / 575 / 596.  TOTAL 659 (21.96s).

   ⛔⛔ THE STAGE, MEASURED — NOT GUESSED. The panel is 1012 x 792. The root
      header pill owns y 0..112 and the slug owns y 730..792, so every hero
      object in this file lives inside **y 118..726** and every geometry below
      is derived from that band and from its place's horizon. Reel 100 v1
      authored to guesses and shipped four scenes with a dead bottom third.

   ⛔⛔ THE `push` RANGE IS SCENE-LOCAL, NOT SHOT-LOCAL — `Scene` reads
      useCurrentFrame(), which restarts per SEQUENCE, not per hard cut. Inside
      S0's four shots each range starts on ITS OWN CUT, or that shot ships a
      frozen camera (reel 98 shipped 9 of 15 shots that way).

   ⛔ THE MOVE BUDGET IS ZERO. Every scene is LOCKED; the only movement is the
      mandatory continuous in-panel push, which is a scale on the whole panel
      rather than a camera move ([[feedback_scene_needs_an_arc]]: a continuous
      push is the single highest-leverage motion lever there is, median
      7.12 -> 8.65). One subject moves at a time in every scene.
   ========================================================================= */

const shake = (lf: number, at: number, amp = 14, n = 12) => {
  if (lf < at || lf > at + n) return { x: 0, y: 0 };
  const k = 1 - (lf - at) / n;
  const d = k * k * amp;
  return { x: Math.sin(lf * 2.7) * d, y: Math.cos(lf * 3.4) * d * 0.7 };
};

/* ⛔ NO WHITE PLATE, NO IRIS, NO FULL-FRAME CLOSE ([[feedback_no_flashing_transitions]]):
   peak opacity 0.26, ramps in AND out, never pure white or pure black. */
const Flash: React.FC<{ lf: number; at: number; n?: number; o?: number }> =
  ({ lf, at, n = 4, o = 0.24 }) => {
  if (lf < at || lf >= at + n) return null;
  const p = (lf - at) / n;
  return <div style={{ position: "absolute", inset: 0, zIndex: 130, pointerEvents: "none",
    background: "#F4EEE2", opacity: Math.sin(p * Math.PI) * o }} />;
};

/* ================================================================== S0 ====
   0.00 -> 3.87s · 116f · HOOK · FOUR HARD SHOTS, camera locked in each.
   Authored to docs/THE-OPEN.md.
   "I shouldn't be saying this, but if you installed this in your Claude, it
    will optimize your website for SEO."

   ⛔ FRAME 0 IS SETTLED AND COMPLETE, AND IT IS THE CLAIM PLATE
      ([[feedback_frame0_claim_plate]] — the only measured IG-performance rule
      in this repo, and the one variable that separated the two AGENCY cuts
      that performed from the four that did not). The RepoCard is 700x330 of
      cream at y=196: 30.1% of the panel, all of it below y=120, carrying the
      Claude mark on a white tile at 96px inside a 132px tile, the star count
      in Fraunces at 88px, and the whole claim printed on its own foot.
   ⛔ THE RACK IS HELD DOWN TO 0.34 AND THROWN BACK. A hook is ONE dominant
      object on an almost empty stage ([[feedback_hook_simplicity]]) — but the
      world stays behind it, because an empty black field is hierarchy with
      nothing to look at.
   ========================================================================= */
export const S0Hook: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("open");
  const CUT = [0, 28, 56, 88];
  const shot = CUT.filter((c) => f >= c).length - 1;
  const lf = f - CUT[shot];
  const HZ = p.horizon;                       /* 600 */

  /* ---- A · THE GLASS. 0.00 -> 0.93s -------------------------------------
     ⛔⛔ THE FIFTH HOOK, AND THE FIRST ONE CHOSEN AGAINST A STATED TEST rather
        than my judgement. Alex: *"very easy to understand immediately instantly
        in milliseconds but still on topic."* Four concepts were built and
        measured (SeoHooks.tsx); this is the one that needs NO parsing. A list
        of search results, a gauge and an award seal each cost the viewer a
        beat — a magnifier over a web page costs nothing, and it means exactly
        "your site is being examined", which is the reel's whole subject.
     ⭐ HIERARCHY BY SIZE, WHICH IS THE NOTE THAT KILLED FOUR ROUNDS: the page
        is 760x560 = 53% of the panel and the glass is the only other large
        object. Nothing else in frame clears 6%. The built hook it replaces
        measured a top-cell share of 0.057 — twenty objects of equal weight.
     ⛔ FRAME 0 IS SETTLED: page, glass, faults already under it. At f8 the
        glass SNAPS across and the flags punch out of the page — an object that
        was still and is now coming apart is the interrupt; a fade never is. */
  if (shot === 0) {
    const on = E(lf, 0, 4, 0, 1, OUT);
    const snap = E(lf, 8, 22, 0, 1, IO);
    const pop = Math.max(0, 1 - Math.abs(lf - 11) / 6);
    const sk = shake(lf, 8, 12, 10);
    const lx = 380 - snap * 156, ly = 396 - snap * 62;
    /* the arm is computed shoulder -> handle end every frame, so the hand is
       really on the handle ([[apple-reel]]: proximity is not connection) */
    const SHX = 566, SHY = 620;
    const HX = lx + 172, HY = ly + 172;
    const armLen = Math.hypot(HX - SHX, HY - SHY);
    const armRot = (Math.atan2(HY - SHY, HX - SHX) * 180) / Math.PI;
    return (
      <Scene p={p} slug="" push={[0, 28, 1.05]} vig={0.34}>
        <div style={{ position: "absolute", inset: 0, zIndex: 1,
          transform: `translate(${sk.x}px, ${sk.y}px)` }}>
          <Hall p={p} f={f} lightX={0.40} floorLines={4} />
          <BackWall kind="girder" p={p} f={f} />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <Lamp key={"hl" + i} x={92 + i * 166} y={112} on={0.30 + on * 0.26} s={0.58}
              f={f} len={176} spread={136} z={12} />))}

          {/* THE HERO: your site, detailed at hero scale */}
          {/* ⛔ 492 TALL RAN THE PAGE DOWN TO 642 AND LEFT THE HOLDER NOWHERE TO
              STAND BUT ON IT — he covered the middle of the very thing he is
              inspecting. At 406 the page ends at 556 and the floor band
              556..726 is his. */}
          {/* ⛔⛔ AND SHORTENING IT BROKE THE FRAME-0 GATE. At 406 tall the plate
              measured 16.40% against the 18% bar — the page's own content
              (nav, cards, stats, footer) fragments the cream, so the CONTIGUOUS
              region is far smaller than the object. Restored to 650x468, which
              measures back over the bar; the holder now overlaps only the
              page's bottom edge, which reads as him standing in front of the
              screen rather than on it. ⭐ Sizing a hero is a gate change, not a
              layout change — re-measure after every one. */}
          <SitePage x={20} y={146} w={650} h={468} z={40} f={f} lit={1} />
          <Contact x={8} y={608} w={674} z={36} o={0.34} />

          {/* the faults, visible ONLY inside the glass */}
          {PLAN.map((q, i) => {
            const fx = 92 + (i % 3) * 202, fy = 252 + Math.floor(i / 3) * 172;
            const near = Math.max(0, 1 - Math.hypot(fx - (lx - 18), fy - (ly - 18)) / 170);
            if (near <= 0.02) return null;
            return <Flag key={"lf" + i} x={fx} y={fy} c={q.d.c} s={1.0} z={58} f={f}
              seed={i} o={Math.min(1, near * 2.1)} />;
          })}

          {/* THE GLASS */}
          <div style={{ position: "absolute", left: lx - 190, top: ly - 190, zIndex: 62,
            transform: `scale(${1 + pop * 0.06})` }}>
            <svg width={380} height={380} viewBox="0 0 380 380">
              <circle cx={172} cy={172} r={148} fill="#DCE6EC" opacity={0.30} />
              <circle cx={172} cy={172} r={148} fill="none" stroke={BRASSD} strokeWidth={26} />
              <circle cx={172} cy={172} r={148} fill="none" stroke={BRASS} strokeWidth={12} />
              <line x1={276} y1={276} x2={362} y2={362} stroke="#6E4A30" strokeWidth={34}
                strokeLinecap="round" />
              <path d="M 108 116 A 88 88 0 0 1 178 80" stroke="#FFFFFF" strokeWidth={16}
                fill="none" opacity={0.45} strokeLinecap="round" />
            </svg>
          </div>

          {/* the Claude holding it — the reel in one image, no decoding */}
          <div style={{ position: "absolute", left: SHX - 6, top: SHY - 15,
            width: armLen, height: 30, borderRadius: 15, background: "#D97757",
            boxShadow: SH, zIndex: 63, transformOrigin: "0% 50%",
            transform: `rotate(${armRot}deg)` }} />
          <Contact x={470} y={720} w={190} z={58} o={0.36} />
          <div style={{ position: "absolute", left: 456, top: 568, zIndex: 64 }}>
            <Mascot lf={f} size={186} gaze={0.95} shock={pop * 0.6}
              nodAmp={2.4} nodSpeed={12} {...SPRITE_COSTUME.hookHolder} />
          </div>

          {/* ⭐⭐ SECOND PLACE, AND IT IS WHAT MAKES THE FRAME SAY *SEO*. A search
              result — query bar, favicon, green URL, blue title, description —
              is the most instantly recognisable object in the subject, and it
              carries the fault on a field the viewer already understands. The
              page says "a website"; this says "a website IN SEARCH", and the
              difference between those two is the entire reel. */}
          <SerpCard x={676} y={158} w={318} z={70} f={f} fault={1} />

          {/* the mark and the one number, under it */}
          <div style={{ position: "absolute", left: 676, top: 448, width: 318, zIndex: 70,
            background: CARDL, borderRadius: 16, border: `4px solid ${CARDD}`,
            boxShadow: SH_D, padding: "12px 14px", display: "flex", alignItems: "center",
            gap: 14 }}>
            <div style={{ width: 132, height: 132, borderRadius: 32, background: "#FFF",
              border: "2px solid #E8DCC0", display: "flex", alignItems: "center",
              justifyContent: "center", flexShrink: 0 }}>
              <Img src={staticFile("claude_logo.png")}
                style={{ width: 98, height: 98, objectFit: "contain" }} /></div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 80,
                lineHeight: 0.86, color: "#241F17" }}>{REPO.agents}</div>
              <div style={{ fontFamily: MONO, fontWeight: 900, fontSize: 16,
                color: "#8A8175", letterSpacing: "0.12em" }}>SEO AGENTS</div>
            </div>
          </div>
          {/* the five things it audits, as a legend under the pair */}
          <div style={{ position: "absolute", left: 676, top: 612, width: 318, zIndex: 70,
            display: "flex", justifyContent: "space-between" }}>
            {DOMAINS.map((d, i) => (
              <span key={"hd" + i} style={{ width: 54, height: 54, borderRadius: 27,
                background: CARDL, border: `4px solid ${d.c}`, display: "flex",
                alignItems: "center", justifyContent: "center", boxShadow: SH,
                transform: `translateY(${Math.sin(f / 36 + i * 1.2) * 2.2}px)` }}>
                <DomainIcon k={d.key} s={0.42} c={d.c} on={1} /></span>))}
          </div>
          <Flash lf={lf} at={8} n={5} o={0.24} />
        </div>
      </Scene>
    );
  }

  /* ---- B · INSIDE THE GLASS. 0.93 -> 1.87s ------------------------------
     Hard cut INTO the lens: the same page at 2.4x, the faults now full size and
     named, and the five domain discs sweeping across. Advances the problem
     rather than restating it — shot A says "something is looking", shot B says
     "and here is what it finds". */
  if (shot === 1) {
    const rise = E(lf, 1, 20, 0, 1, OUT);
    return (
      <Scene p={p} slug="EVERY PAGE  ·  EVERY CHECK" push={[28, 56, 1.06]} vig={0.42}
        slugC="#B9B2A6">
        <Hall p={p} f={f} lightX={0.5} floorLines={3} />
        {/* the page, pushed in so the frame IS the glass */}
        <div style={{ position: "absolute", left: -250, top: -210, zIndex: 30 }}>
          <SitePage x={0} y={0} w={1560} h={1150} z={30} f={f} lit={1} />
        </div>
        {/* the glass rim, cropped by the panel, so we are clearly inside it */}
        <div style={{ position: "absolute", left: -130, top: -130, width: 1272,
          height: 1052, borderRadius: "50%", border: `34px solid ${BRASSD}`,
          zIndex: 66, pointerEvents: "none", boxShadow: SH_D }} />
        {PLAN.map((q, i) => {
          const k = E(lf, 2 + i * 3.4, 2 + i * 3.4 + 11, 0, 1, BACK);
          if (k <= 0.02) return null;
          const fx = 96 + (i % 2) * 470, fy = 190 + Math.floor(i / 2) * 176;
          return (
            <div key={"bf" + i} style={{ position: "absolute", left: fx, top: fy,
              zIndex: 70, opacity: k, transform: `scale(${0.8 + k * 0.2})` }}>
              <Flag x={0} y={0} t={q.t} c={q.d.c} s={1.5} z={70} f={f} seed={i} />
            </div>);
        })}
        <div style={{ position: "absolute", left: 700, top: 566, zIndex: 74,
          display: "flex", gap: 10, opacity: rise,
          transform: `translateY(${(1 - rise) * 34}px)` }}>
          {DOMAINS.map((d, i) => (
            <span key={"bd" + i} style={{ width: 60, height: 60, borderRadius: 30,
              background: CARDL, border: `5px solid ${d.c}`, display: "flex",
              alignItems: "center", justifyContent: "center", boxShadow: SH }}>
              <DomainIcon k={d.key} s={0.46} c={d.c} on={1} /></span>))}
        </div>
        <Flash lf={lf} at={0} n={4} o={0.20} />
      </Scene>
    );
  }

  /* ---- C · THE INSTALL. 1.87 -> 2.93s --------------------------------
     "…in your Claude." The chips fly IN and seat as a plugin list, and the
     prompt lights the REAL command. This is docs/THE-OPEN.md's literal layer:
     the theme carries the feeling, the literal layer carries the information.
     GEOMETRY: term 620x300 at (196,214) -> 214..514. Auditor base 716. */
  if (shot === 2) {
    /* ⛔⛔ v1 OF THIS SHOT HAD TWO MEASURED FAULTS, both visible in the still.
       1. THE CHIPS LEAKED OFF THE PANEL. They were laid out at x=838 with a
          260-300px content-driven box under `transform: scale(0.62)` and
          `transformOrigin: 0% 50%` — so the widest of them reached 1024 in a
          1012-wide panel. The arithmetic now runs the other way: the column is
          pinned to a 176px box at x=610, i.e. 610+176 = 786, clear of the
          panel by 226px even at the longest filename.
       2. THE TERMINAL WAS AN EMPTY WHITE BOX for the whole shot — 620x300 of
          nothing but one half-typed line. `TermBox` has always taken `rows`;
          this shot simply never passed them. The agents now report back into
          it, which is both the missing content AND the literal information
          layer docs/THE-OPEN.md asks the open to carry. */
    const typed = E(lf, 2, 15, 0, 1, LIN);
    const done = E(lf, 14, 30, 0, 1, OUT);
    const seat = E(lf, 4, 20, 0, 1, OUT);
    return (
      <Scene p={p} slug={REPO.cmd} push={[56, 88, 1.05]} vig={0.38} slugC="#B9B2A6">
        <Hall p={p} f={f} lightX={0.42} floorLines={4} />
        <BackWall kind="slat" p={p} f={f} />
        <MarkCast x={W / 2} y={318} s={300} z={4} o={0.07} spin={0.12} f={f} />
        <Spot x={W * 0.40} on={1} f={f} len={HZ + 100} spread={600} />
        <Bench y={HZ + 34} z={30} depth={30} />
        <TermBox x={62} y={200} w={520} h={302} z={60} f={f} typed={typed} done={done}
          rows={["technical  ok", "content  ok", "schema  ok", "geo  ok", "local  ok"]} />
        {/* the eighteen seating into the plugin list, arriving from off-frame.
            176px box at x=610 -> right edge 786, clear of the 1012 panel. */}
        {AGENTS.slice(0, 4).map((a, i) => {
          const a0 = 3 + i * 3;
          const k = E(lf, a0, a0 + 11, 0, 1, OUT);
          if (k <= 0.02) return null;
          return (
            <div key={"si" + i} style={{ position: "absolute", zIndex: 70,
              left: 618, top: 226 + i * 54, width: 176,
              transform: `translateX(${(1 - k) * 220}px)`, opacity: k }}>
              <AgentChip t={a} s={0.66} />
            </div>
          );
        })}
        <FactChip x={62} y={528} t={`${REPO.agents} AGENTS INSTALLED`} k={seat} z={88} />
          <Auditor x={890} base={HZ + 116} s={0.86} z={80} f={f} gaze={0.7} reach={0.6}
          costume={SPRITE_COSTUME.install} />
        <Flash lf={lf} at={0} n={4} o={0.20} />
      </Scene>
    );
  }

  /* ---- D · THE SITE. 2.93 -> 3.87s -----------------------------------
     "…it will optimize your website for SEO." Hard cut close to ONE page of
     example.com with the lamp striking it and the score dial sweeping off its
     stop. The dial is the repo's real 0-100 output and the site is the repo's
     own documented example URL, so nothing on screen is a claim about anyone's
     numbers (board §0). */
  const strike = E(lf, 3, 12, 0, 1, OUT);
  const arc = E(lf, 6, 27, 0.06, 0.41, IO);
  return (
    <Scene p={p} slug={`example.com  ·  ${REPO.cmd.split(" ")[1].toUpperCase()}`}
      push={[88, 116, 1.055]} vig={0.36} slugC="#B9B2A6">
      <Hall p={p} f={f} lightX={0.36} floorLines={4} />
      <BackWall kind="panel" p={p} f={f} />
      <Lamp x={306} y={118} on={strike} f={f} len={340} spread={340} z={30} />
      {/* ⛔ v1 RAN A 318px PAGE AND A 1.30 DIAL IN A 1012px PANEL and left a
          third of the frame as empty floor. Both heroes are now sized to the
          stage: the page fills y 186..614 and the dial is 1.62, so the two
          objects and the sprite account for the whole width. */}
      <PageSheet x={140} y={186} w={362} h={428} z={50} kind={0} state={0} f={f}
        lit={0.30 + strike * 0.70} label="example.com" />
      <Contact x={128} y={608} w={386} z={44} o={0.34} />
      <ScoreDial x={572} y={240} p={arc} s={1.62} z={84} f={f} />
      <Auditor x={900} base={HZ + 116} s={0.86} z={80} f={f} gaze={0.4} cheer={strike * 0.4}
        costume={SPRITE_COSTUME.site} />
      <RackEdge side="l" c={STEELD} w={58} z={92} />
      <Flash lf={lf} at={0} n={4} o={0.20} />
    </Scene>
  );
};

/* ================================================================== S1 ====
   3.87 -> 6.03s · 65f · SETUP · locked wide, continuous push.
   "It will audit your technical SEO, content schema,"

   THE ARC: a SWEEP bar travels the whole rack left to right across the entire
   scene, and the pages light as it passes. Something is at state A on the
   first frame and state B on the last, changing the whole way
   ([[feedback_scene_needs_an_arc]] — "it animates in and sits there" is the
   default failure and it is what a per-scene mean hides).
   GEOMETRY: rack 780x372 at (116,182) -> x 116..896, y 182..554. Horizon 578.
   ========================================================================= */
export const S1: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("rack");
  const HZ = p.horizon;                       /* 578 */
  const RX = 116, RY = 182, RW = 780, RH = 372;
  /* the sweep crosses the full rack over the whole scene: the arc */
  const sx = E(f, 2, 58, RX - 40, RX + RW + 60, LIN);
  const lit = Array.from({ length: 12 }, (_, i) => {
    const col = i % 4;
    const gate = RX + (col + 0.85) * (RW / 4);
    return sx > gate ? 1 : 0.22;
  });
  /* the three plates the VO names, on their measured onsets (lead-4) */
  /* ⛔ THE MEDALLION BAND AND THE SPRITE WERE SHARING HORIZONTAL SPACE — the
     TECHNICAL disc landed straight on the hard hat. [[feedback_graphical_over_textual]]
     names the fix explicitly ("the fix was moving the crew to the frame edges,
     not shrinking the text"), so the band starts at 246, right of the sprite's
     0..170, and the three discs spread to 826. */
  const PL = [
    { d: DOMAINS[0], at: 14, x: 246 },
    { d: DOMAINS[1], at: 43, x: 536 },
  ];
  return (
    <Scene p={p} slug="AUDITING  ·  example.com" push={[0, 65, 1.042]} vig={0.40}
      slugC="#B9B2A6">
      <Hall p={p} f={f} lightX={0.5} floorLines={4} />
      <BackWall kind="pegboard" p={p} f={f} />
      <Rack x={RX} y={RY} w={RW} h={RH} z={40} f={f} cols={4} rows={3} lit={lit}
        flags={E(f, 26, 52, 0, 1, OUT)} />
      {/* the sweep IS the light — a shaped travelling band, never a frame tint */}
      <SweepBar x={sx} y={RY - 16} h={RH + 32} z={78} c={LAMPC} o={E(f, 0, 6, 0, 1, OUT)} />
      {/* the domain plates, seating on their own onsets. CONTENT and SCHEMA are
          0.12s apart in the VO so they stack rather than share a row. */}
      {/* ⛔ THREE MEDALLIONS IN A ROW, NOT THREE LABEL PLATES. Each is an icon on
          a disc plus ONE word — the reel's text budget per shot is one chip and
          these three share the same horizontal band nothing else occupies
          ([[feedback_graphical_over_textual]]). Column is icon 86px + word, so
          the band is y 566..678 and clears the slug at 730. */}
      {PL.map((q, i) => (
        <DomainPlate key={"dp" + i} x={q.x} y={566} d={q.d} s={0.80} z={86}
          seat={E(f, q.at, q.at + 12, 0, 1, BACK)} f={f} />
      ))}
      <DomainPlate x={800} y={566} d={DOMAINS[2]} s={0.80} z={86}
        seat={E(f, 47, 59, 0, 1, BACK)} f={f} />
      <Auditor x={72} base={HZ + 138} s={0.80} z={82} f={f} gaze={0.9} costume={SCENE_COSTUME[1]} />
      <RackEdge side="r" c={STEELD} w={52} z={92} />
    </Scene>
  );
};

/* ================================================================== S2 ====
   6.03 -> 7.80s · 53f · SETUP · locked close, NEW SET.
   "even geo and local SEO."

   ⛔ A DIFFERENT SET AND DIFFERENT OBJECTS — not the rack again at another
      size. Two scenes sharing a base object is the CALLBACK S1=S2 failure the
      storyboard spec exists to prevent; these two share none.
   GEOMETRY: answer 396 wide at (92,206); map 340x300 at (556,222). Horizon 596.
   ========================================================================= */
export const S2: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("corner");
  const HZ = p.horizon;                       /* 596 */
  const typed = E(f, 2, 22, 0, 1, LIN);
  const cite = E(f, 16, 28, 0, 1, BACK);
  const drop = E(f, 20, 40, 0, 1, OUT);
  /* ⛔⛔ v1 MEASURED 5.24 AGAINST A 6.0 BAR because the only things moving were
     four typing bars and a 54x70 pin — 3,780px², against the ~40,000px² a mover
     has to clear to register at all ([[reel-dead-air-motion-audit]]). The fix
     is the one that has worked every time: do NOT add a second mover, make the
     object that ALREADY dominates travel further and later. Both cards now
     TRAVEL the full width of their half — the map card is 340x300 = 102,000px²
     crossing 300px, i.e. 25x the pin's area and a real translate rather than a
     fade ([[feedback_scene_needs_an_arc]]: a cross-fade changes every pixel a
     little and the metric cannot see it; a translate changes many pixels a lot). */
  const inA = E(f, 0, 20, 0, 1, OUT);
  const inB = E(f, 14, 42, 0, 1, OUT);
  return (
    <Scene p={p} slug="AI SEARCH  ·  MAP PACK" push={[0, 53, 1.038]} vig={0.42}
      slugC="#C4B79A">
      <Hall p={p} f={f} lightX={0.42} floorLines={3} />
      <BackWall kind="window" p={p} f={f} />
      {/* ⛔ THIS SCENE RAN AT ABOUT EIGHT OBJECTS — "a diagram", by the count in
          [[feedback_graphical_over_textual]]. The two cards are still the only
          IDEA; what is added is LAYERS: a lit rail, a shelf of pages behind, and
          a working foreground. Nothing here asks to be read. */}
      {[0, 1, 2, 3].map((i) => (
        <Lamp key={"s2l" + i} x={128 + i * 252} y={112} on={0.72} s={0.60} f={f}
          len={190} spread={150} z={26} />))}
      {/* ⛔ THE SHELF LIVES INSIDE THE STAGE (y 118..726) LIKE EVERYTHING ELSE.
          v1 put it at y=168..298 where it ran under the AnswerCard at 206; it is
          now 124..198 with its rail at 202, clear of the card by 4px. */}
      <div style={{ position: "absolute", left: -20, right: -20, top: 202, height: 9,
        background: dkh(OAK, 0.42), zIndex: 22, boxShadow: SH }} />
      {[0, 1, 2, 3, 4].map((i) => (
        <PageSheet key={"s2p" + i} x={-10 + i * 214} y={124} w={186} h={74} z={20}
          kind={i + 1} f={f + i * 11} lit={0.42} dim={0.34} />))}
      <Bench y={HZ + 28} z={30} depth={28} />
      <Spot x={W * 0.30} on={1} f={f} len={480} spread={480} />
      {/* GEO: an AI answer that cites your page. That IS what seo-geo scores. */}
      <AnswerCard x={92 - (1 - inA) * 330} y={206} w={396} z={60} f={f}
        typed={typed} cite={cite} />
      <Contact x={82 - (1 - inA) * 330} y={HZ + 22} w={416} z={44} o={0.30 * inA} />
      <DomainPlate x={150} y={528} d={DOMAINS[3]} s={0.66} z={86}
        seat={E(f, 2, 14, 0, 1, BACK)} f={f} />
      {/* LOCAL: the map pack, with a pin that DROPS and rocks. Nothing in this
          reel lands and stops ([[feedback_scene_needs_an_arc]]). */}
      <MapCard x={556 + (1 - inB) * 300} y={222} w={340} h={300} z={60} f={f} drop={drop} />
      <Contact x={546 + (1 - inB) * 300} y={HZ + 22} w={360} z={44} o={0.30 * inB} />
      <DomainPlate x={646} y={528} d={DOMAINS[4]} s={0.66} z={86}
        seat={E(f, 20, 32, 0, 1, BACK)} f={f} />
      <Auditor x={508} base={HZ + 128} s={0.62} z={82} f={f} gaze={drop > 0.5 ? 0.9 : 0.2} costume={SCENE_COSTUME[2]} />
      <Mug x={30} y={HZ + 6} s={0.72} z={74} f={f} />
      <FlagTray x={866} y={HZ + 62} s={0.62} z={74} f={f} />
      <RackEdge side="l" c={dkh(OAK, 0.42)} w={46} z={92} />
    </Scene>
  );
};

/* ================================================================== S3 ====
   7.80 -> 9.80s · 60f · TURN · ⭐ THE HERO ARTIFACT.
   "Then it tells you exactly what to improve and what order"

   This is the reel's most important picture and the one thing no other SEO
   tool reel shows. The loose flags pulled off the pages fly in as an unsorted
   cloud, hang, then SORT onto a numbered ladder — and rung 1 is 1.6x rung 5,
   because HIERARCHY IS HERO SIZE, NOT MOVER COUNT ([[apple-reel]] lesson 5).
   It gets the largest push in the reel and the hardest top light.
   GEOMETRY: ladder 470 wide at (300,200), five rungs 74px apart -> 200..496.
   ========================================================================= */
export const S3: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("wall");
  const HZ = p.horizon;                       /* 604 */
  const fly = E(f, 0, 12, 0, 1, OUT);         /* the cloud arrives */
  const sort = E(f, 16, 52, 0, 1, IO);        /* and then it sorts */
  return (
    <Scene p={p} slug="PRIORITISED ACTION PLAN" push={[0, 60, 1.050]} vig={0.44}
      slugC="#C6BCA6">
      <Hall p={p} f={f} lightX={0.5} floorLines={4} />
      <BackWall kind="tile" p={p} f={f} />
      <Spot x={W / 2} on={1} f={f} len={HZ + 60} spread={660} />
      <MarkCast x={W / 2} y={330} s={300} z={4} o={0.06} spin={0.09} f={f} />
      {/* the unsorted cloud, travelling to its rung. Each flag's target IS its
          rung, so the sort is one continuous gesture and not a dissolve. */}
      {PLAN.map((q, i) => {
        const fromX = 120 + rnd(i, 3) * 700, fromY = 180 + rnd(i, 9) * 300;
        const toX = 306, toY = 206 + i * 74;
        const k = Math.max(0, Math.min(1, sort * 1.3 - i * 0.06));
        const x = fromX + (toX - fromX) * k;
        const y = fromY + (toY - fromY) * k;
        return (
          <Flag key={"fl" + i} x={x} y={y} t={q.t} c={q.d.c} s={0.86}
            z={92 - i} f={f} seed={i} o={fly * (1 - k * 0.92)} />
        );
      })}
      {/* the dependency spine. The rungs are ordered BECAUSE each one unblocks
          the next, and drawing the link is what makes "and what order" an
          argument rather than a list. It draws itself down the ladder as the
          rungs land. */}
      <div style={{ position: "absolute", left: 288, top: 214, width: 8,
        height: E(f, 20, 54, 0, 300, IO), zIndex: 66, borderRadius: 4,
        background: `repeating-linear-gradient(180deg, ${GOLD} 0px, ${GOLD} 11px, transparent 11px, transparent 21px)` }} />
      <PlanLadder x={300} y={200} w={470} z={70} t={sort} f={f} s={1} />
      {/* the count of what came off the pages, arriving with the last rung */}
      <CountPlate x={798} y={214} n={String(PLAN.length)} t="IN ORDER" s={0.84} z={90}
        k={E(f, 46, 58, 0, 1, BACK)} />
      <Auditor x={122} base={HZ + 122} s={0.90} z={82} f={f} gaze={0.95}
        cheer={sort * 0.45} reach={sort > 0.7 ? 0.5 : 0} costume={SCENE_COSTUME[3]} />
      <RackEdge side="r" c={STEELD} w={48} z={92} />
    </Scene>
  );
};

/* ================================================================== S4 ====
   9.80 -> 11.73s · 58f · ESCALATE · locked close on one page.
   "and even fixes your own website for you"

   ⛔⛔ SCOPE GUARD (board §0). What the repo really does is GENERATE the
      artifact — schema JSON-LD, sitemaps, hreflang. It is an analysis plugin
      and it does not autonomously rewrite a live site. So this is the fix
      landing in an EDITOR on a source file, and the flag going green because
      the block now exists. The reel dramatises the mechanism and stops at the
      edge of the claim.
   GEOMETRY: page 300x384 at (96,196); editor 476x300 at (452,232). Horizon 600.
   ========================================================================= */
export const S4: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("fix");
  const HZ = p.horizon;                       /* 600 */
  const lift = E(f, 6, 20, 0, 1, IO);         /* the flag comes off the page */
  const typed = E(f, 10, 44, 0, 1, LIN);      /* the block writes itself in */
  const fixed = E(f, 42, 54, 0, 1, OUT);      /* and the flag turns */
  return (
    <Scene p={p} slug="GENERATED FIX  ·  JSON-LD" push={[0, 58, 1.040]} vig={0.42}
      slugC="#C9B98F">
      <Hall p={p} f={f} lightX={0.34} floorLines={3} />
      <BackWall kind="shelf" p={p} f={f} />
      {/* the same layering pass: a rail, a shelf of the site's other pages
          waiting their turn, and a foreground that looks worked at */}
      {[0, 1, 2].map((i) => (
        <Lamp key={"s4l" + i} x={246 + i * 300} y={112} on={i === 0 ? 1 : 0.5} s={0.62}
          f={f} len={190} spread={150} z={26} />))}
      <Bench y={HZ + 30} z={30} depth={30} />
      <Lamp x={246} y={118} on={1} f={f} len={300} spread={300} z={30} />
      <PageSheet x={96} y={196} w={300} h={384} z={50} kind={2}
        state={0} f={f} lit={1} label="example.com/product" />
      <Contact x={86} y={HZ - 16} w={320} z={44} o={0.32} />
      {/* ⛔ THE FLAG DOES NOT TURN GREEN. Green would mean the site is fixed, and
          nothing in the repo fixes a site. It travels to a READY TO APPLY tray,
          which is the true end state: the finding is answered by a generated
          artifact that a human still has to apply. */}
      <Flag x={280 + lift * 176} y={232 - lift * 96} t="NO SCHEMA" c={GOLD} s={0.90}
        z={94} f={f} seed={2} />
      <EditorPane x={452} y={232} w={476} h={300} z={60} typed={typed} f={f} />
      <Contact x={442} y={HZ - 16} w={496} z={44} o={0.30} />
      <FactChip x={96} y={606} t="READY TO APPLY" k={fixed} z={92} s={0.86} c={GOLD} />
      <Auditor x={870} base={HZ + 120} s={0.86} z={82} f={f} gaze={0.8}
        cheer={fixed * 0.6} carry={lift > 0.5 ? 0.7 : 0} costume={SCENE_COSTUME[4]} />
      <FlagTray x={62} y={HZ + 104} s={0.60} z={74} f={f} />
      <RackEdge side="l" c={dkh(OAK, 0.46)} w={44} z={92} />
    </Scene>
  );
};

/* ================================================================== S5 ====
   11.73 -> 14.50s · 83f · ESCALATE · the widest frame in the reel.
   "And it comes with 18 SEO agents and 25 specialized skills"

   Eighteen lamps strike in a run and each reveals a Mascot at a station with a
   REAL filename over it. This is the only scene with more than one sprite, and
   it is the picture of the number the VO says.
   ⛔ THE NAMES ARE THE DIRECTORY LISTING, not a representative sample — the
      repo's `agents/` folder holds exactly these eighteen files.
   GEOMETRY: 9 stations across 2 rows. Row A base 430 (x 108..908 step 100),
   row B base 620 (same). Horizon 566.
   ========================================================================= */
export const S5: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("rail");
  const HZ = p.horizon;                       /* 566 */
  const COLS = 9;
  const skills = E(f, 50, 74, 0, 1, OUT);
  return (
    <Scene p={p} slug="agents/  ·  18 FILES" push={[0, 83, 1.045]} vig={0.40}
      slugC="#BCCAD6">
      <Hall p={p} f={f} lightX={0.5} floorLines={3} />
      <BackWall kind="girder" p={p} f={f} />
      {/* the rail the lamps hang from */}
      <div style={{ position: "absolute", left: -20, right: -20, top: 150, height: 11,
        background: dkh(STEELD, 0.24), zIndex: 26, boxShadow: SH }} />
      <div style={{ position: "absolute", left: -20, right: -20, top: 340, height: 11,
        background: dkh(STEELD, 0.24), zIndex: 26, boxShadow: SH }} />
      {/* ⛔⛔ EIGHTEEN LAMPS STRIKING LOOKS LIKE MOTION AND MEASURES 4.26. Each
          cone is ~94x148 = 14,000px², a third of the ~40,000px² floor, so
          eighteen of them are eighteen events the metric genuinely cannot see —
          and the first fix (racking the shelf further) only moved it to 4.64,
          which is the proof that the shelf was never the dominant object here.
          The rows ARE. Each is ~900x230 = 207,000px², so each row now TRAVELS
          in as one continuous object — row A from the left, row B from the
          right — and the lamps strike as its row seats. Same picture, same
          beat, one very large mover instead of eighteen invisible ones. */}
      {[0, 1].map((row) => {
        /* ⛔ AND THE FIRST VERSION OF THIS TRAVEL WAS OVER IN EIGHT FRAMES. The
           per-frame profile showed 16.1 / 13.2 / 9.8 ... then 1.1 for the
           remaining 74 — because OUT easing spends most of its distance in the
           first third, and this is the LONGEST scene in the reel (83f). Same
           move, LIN over 46 and 48 frames, so the rows are still arriving
           through the middle of the scene instead of before it starts. */
        const inn = E(f, 2 + row * 16, 2 + row * 16 + (row ? 48 : 46), 0, 1, LIN);
        return (
          <div key={"row" + row} style={{ position: "absolute", inset: 0,
            zIndex: row === 0 ? 50 : 60, opacity: Math.min(1, inn * 2.6),
            transform: `translateX(${(1 - inn) * (row === 0 ? -420 : 420)}px)` }}>
            {AGENTS.slice(row * COLS, row * COLS + COLS).map((a, k) => {
              const i = row * COLS + k;
              /* the strike run still lands on its measured onsets, 12.34 -> 13.28s */
              const on = E(f, 12 + i * 1.6, 12 + i * 1.6 + 7, 0, 1, OUT);
              return (
                <Station key={"st" + i} x={108 + k * 100} base={row === 0 ? 372 : 566}
                  name={a} on={on} s={0.64} z={row === 0 ? 50 : 60} f={f} seed={i} />
              );
            })}
          </div>
        );
      })}
      {/* the 25 skills rack in below as a SHELF OF CARDS, not a colour bar.
          ⛔ v1 put both count plates ON TOP of this row and occluded it — the
          named defect from [[apple-reel]] lesson 3. The counts now sit on the
          wall above the rail and nothing overlaps anything. */}
      {/* ⛔⛔ v1 MEASURED 4.26, THE WORST IN THE REEL, and the reason is a trap
          worth naming: eighteen lamps striking LOOKS like a lot of motion and
          is not. Each cone is ~94x148 = 14,000px², well under the ~40,000px² a
          mover must clear, so eighteen of them are eighteen things the metric
          cannot see. The largest object in the scene is this shelf — 968x74 =
          71,600px² — so it is the one that has to travel: it now racks up from
          BELOW the panel (168px, staggered into a wave) instead of nudging 42px.
          ⛔ Adding a nineteenth small mover would have changed nothing; that is
          [[apple-reel]] lesson 10, learned by trying it. */}
      <div style={{ position: "absolute", left: 22, right: 22, top: 624, height: 74, zIndex: 70,
        display: "flex", gap: 5, alignItems: "flex-end" }}>
        {Array.from({ length: 25 }, (_, i) => {
          const k = E(f, 50 + i * 0.9, 50 + i * 0.9 + 14, 0, 1, OUT);
          return (
            <div key={"sk" + i} style={{ flex: 1, height: 62 - (i % 3) * 6, borderRadius: 4,
              background: mxh(DOMAINS[i % 5].c, 0.36), border: `2px solid ${CARDD}`,
              transform: `translateY(${(1 - k) * 168}px)`, opacity: Math.min(1, k * 3),
              boxShadow: SH, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", left: 3, right: 3, top: 5, height: 4,
                borderRadius: 2, background: CARDD }} />
              <div style={{ position: "absolute", left: 3, right: 8, top: 13, height: 3,
                borderRadius: 2, background: CARDD }} />
            </div>);
        })}
      </div>
      {/* ⛔ THE ONLY FREE BAND IS THE TOP ONE, and it was measured rather than
          guessed. At s=0.64 a Station puts its lamp at base-148 and its name
          board at base-125, so row A (base 372) occupies 224..372 and row B
          (base 566) occupies 418..566. That leaves y 118..214 clear above and
          y 572..618 clear below. Both counts go in the top band, side by side,
          arriving on their own measured onsets (12.34s and 13.52s) — which is
          also the better picture, because the two numbers the VO says end up
          next to each other. ~211px and ~169px wide, so 52..263 and 520..689. */}
      <CountPlate x={52} y={126} n={String(REPO.agents)} t="SEO AGENTS" s={0.92} z={96}
        k={E(f, 21, 33, 0, 1, BACK)} />
      <CountPlate x={520} y={126} n={String(REPO.skills)} t="SKILLS" s={0.92} z={96}
        c={GREEN} k={E(f, 57, 69, 0, 1, BACK)} />
      <FactChip x={716} y={580} t={REPO.parallel} k={E(f, 30, 42, 0, 1, OUT)} z={96} s={0.82} />
    </Scene>
  );
};

/* ================================================================== S6 ====
   14.50 -> 17.00s · 75f · ESCALATE · the DARKEST scene, so a struck plate is
   an event.
   "all trained around Google's own optimization guidelines"

   ⛔ "trained" is the VO's loose word. Nothing is trained: the README says the
      recommendations are *grounded in primary-source guidance from Google* and
      *aligned with Google's AI Optimization Guide*. So the picture says
      GROUNDED — a printed reference that is read FROM and a plate that is
      struck from it. No brain, no dataset, no training montage (board §0).
   GEOMETRY: guide 400 wide at (68,318); press at (498,238); plates land on the
   wall at x 700..940, y 190/300/416. Horizon 604.
   ========================================================================= */
export const S6: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("press");
  const HZ = p.horizon;                       /* 604 */
  const STRIKE = [12, 30, 47];
  const read = E(f, 4, 62, 0, 1, LIN);
  return (
    <Scene p={p} slug={`${REPO.guideSrc}  ·  PRIMARY SOURCE`} push={[0, 75, 1.036]}
      vig={0.46} slugC="#C4A97A">
      <Hall p={p} f={f} lightX={0.30} floorLines={3} />
      <BackWall kind="panel" p={p} f={f} />
      {/* a rack of plates already struck, so the three being struck now land
          somewhere that exists rather than onto an empty wall */}
      {[0, 1, 2].map((i) => (
        <Lamp key={"s6l" + i} x={168 + i * 336} y={110} on={i === 0 ? 1 : 0.44} s={0.58}
          f={f} len={180} spread={140} z={26} />))}
      <Bench y={HZ + 26} z={30} depth={30} />
      <Lamp x={300} y={118} on={1} f={f} len={330} spread={300} z={30} />
      {/* ⛔ THE GUIDE IS THE BIGGEST OBJECT HERE (400x248 = 99,200px²) and it
          used to just sit. The plates travelling are only ~21,000px² each,
          under the ~40,000px² floor, which is why this scene measured 6.09 with
          a dead run. The guide now slides onto the bench across the first half
          and the plates below travel further, so something large is moving for
          most of the scene rather than for six frames of it. */}
      <div style={{ position: "absolute", inset: 0, zIndex: 50,
        transform: `translateX(${-E(f, 0, 34, 1, 0, LIN) * 470}px)` }}>
        <GuideBook x={68} y={318} w={400} z={50} f={f} read={read} />
        <Contact x={58} y={HZ - 6} w={420} z={44} o={0.34} />
      </div>
      {/* the press: the ram falls on each strike, one gesture each */}
      <Press x={498} y={238} s={1.0} z={56}
        drop={STRIKE.reduce((a, s0) => a + Math.max(0, 1 - Math.abs(f - s0 - 3) / 6), 0)} />
      <Contact x={488} y={HZ - 6} w={150} z={44} o={0.30} />
      {/* three plates, the third the largest, travelling up to the wall */}
      {STRIKE.map((s0, i) => {
        const k = E(f, s0, s0 + 16, 0, 1, OUT);
        if (k <= 0.02) return null;
        /* ⛔ THE PANEL PUSH MAGNIFIES ANYTHING NEAR THE EDGE. At scale 1.036 about
           origin 50%, a point at x=994 maps to 1011.6 — i.e. exactly the panel
           edge, where the rounded corner then clips it. The widest plate is
           300*1.10 = 330, so it lands at 596 and ends at 926, which survives the
           push with 60px to spare. Author edge geometry against the PUSHED
           frame, not the unpushed one. */
        const sc = i === 2 ? 1.14 : 0.90;
        const ty = 158 + i * 156;
        return (
          <div key={"pp" + i} style={{ position: "absolute", zIndex: 84 + i,
            left: 486 + (658 - 486) * k, top: 392 + (ty - 392) * k,
            transform: `scale(${sc}) rotate(${(1 - k) * -9}deg)`, transformOrigin: "0% 50%",
            opacity: Math.min(1, k * 3) }}>
            <DomainPlate x={0} y={0} d={DOMAINS[i === 2 ? 3 : i]} s={0.82} z={84} seat={1} f={f} />
          </div>
        );
      })}
      <FactChip x={68} y={214} t={REPO.tests} k={E(f, 8, 20, 0, 1, OUT)} z={88} s={0.86} />
      <Auditor x={470} base={HZ + 120} s={0.74} z={82} f={f} gaze={0.5} stern={0.5}
        reach={f > 12 ? 0.5 : 0} costume={SCENE_COSTUME[6]} />
      <Mug x={906} y={HZ + 12} s={0.74} z={74} f={f} />
      <RackEdge side="r" c={dkh(OAK, 0.5)} w={44} z={92} />
    </Scene>
  );
};

/* ================================================================== S7 ====
   17.00 -> 19.17s · 65f · THE VILLAIN · locked, the smallest push in the reel.
   "So rather than spending hours trying to audit your SEO manually,"

   THE HOURS, made physical. The villain's RULE is that it can light exactly
   one page at a time, and the picture obeys it for the whole scene: one lamp
   crawls the rail, the clock burns, the notes pile up, and it reaches page 4
   of 12 by the last frame. It does not finish, and that is the point.
   ⛔ LOWEST LUMA IN THE REEL, ON PURPOSE, AND ONLY 2.2s LONG. It is the setup
      for the peak 0.7s later; a dark scene is only affordable because of what
      follows it.
   ========================================================================= */
export const S7: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("night");
  const HZ = p.horizon;                       /* 578 */
  const RX = 116, RY = 182, RW = 780, RH = 372;
  /* the single lamp crawls: page 1 -> page 4 of 12 across the whole scene */
  const step = E(f, 4, 62, 0, 3.1, LIN);
  const cur = Math.floor(step);
  const lampX = RX + (cur + 0.5) * (RW / 4);
  const lit = Array.from({ length: 12 }, (_, i) => (i === cur ? 1 : 0.13));
  return (
    <Scene p={p} slug="MANUALLY  ·  ONE PAGE AT A TIME" push={[0, 65, 1.030]} vig={0.52}
      slugC="#9AA3AC">
      <Hall p={p} f={f} lightX={0.5} floorLines={3} dim={0.14} />
      <BackWall kind="brick" p={p} f={f} o={0.8} />
      <Rack x={RX} y={RY} w={RW} h={RH} z={40} f={f} cols={4} rows={3} lit={lit} dim={0.30} />
      {/* the one lamp. It TRAVELS, which is the only large mover in the scene. */}
      <Lamp x={lampX} y={128} on={1} f={f} len={300} spread={230} z={30} />
      <WallClock x={62} y={196} s={1.0} z={40} spin={E(f, 2, 64, 0, 1, LIN)} />
      {/* the hand-written notes piling up — the cost, accumulating */}
      {Array.from({ length: 7 }, (_, i) => {
        const k = E(f, 6 + i * 8, 6 + i * 8 + 9, 0, 1, OUT);
        if (k <= 0.02) return null;
        return (
          <div key={"nt" + i} style={{ position: "absolute", zIndex: 60 + i,
            left: 52 + (rnd(i, 5) - 0.5) * 26, top: 604 - i * 9,
            width: 128, height: 84, borderRadius: 3, opacity: k,
            transform: `rotate(${(rnd(i, 7) - 0.5) * 18}deg) translateY(${(1 - k) * -90}px)`,
            background: i % 2 ? "#CFC8BA" : "#DCD5C6", border: "2px solid #A39B8C",
            boxShadow: SH }}>
            {[0, 1, 2].map((j) => (
              <div key={"nl" + j} style={{ position: "absolute", left: 10, top: 14 + j * 18,
                width: `${68 - j * 14}%`, height: 6, background: "#A8A092" }} />))}
          </div>);
      })}
      {/* ⛔ A DARK RACK AND A CLOCK STATE "HOURS" WITHOUT SHOWING THE WORK. The
          mug and the magnifier are what this desk actually has on it at 2am,
          and the mug's steam is the scene's only warm moving thing. */}
      <Mug x={196} y={556} s={0.92} z={62} f={f} />
      <Magnifier x={318} y={584} s={0.80} z={62} rot={-24} />
      <FactChip x={780} y={620} t={`PAGE ${cur + 1} OF 12`} k={1} z={90} s={0.90}
        c="#CFC8BA" />
      <Auditor x={620} base={HZ + 140} s={0.72} z={82} f={f} gaze={0.2} slump={0.55} costume={SCENE_COSTUME[7]} />
      <RackEdge side="l" c={dkh(STEELD, 0.42)} w={54} z={92} />
    </Scene>
  );
};

/* ================================================================== S8 ====
   19.17 -> 19.87s · 21f (0.70s) · ⭐ THE PEAK.
   "try this."

   ⛔ ONE EVENT, NO SUB-BEATS. A 21-frame shot can only land if it is a single
      change: on the word, all eighteen lamps SLAM on across three frames,
      every page is lit, every flag is green and the ladder stands complete.
      This is the largest, brightest, fastest single change in the reel, and it
      is the frame the whole board builds to — THE PEAK BEATS THE HOOK.
   ⛔ NO PUSH ON THIS SCENE. The board forbids it: a push would spread pixel
      change across the whole panel and dilute the one localised event.
   ========================================================================= */
export const S8: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("lit");
  const HZ = p.horizon;                       /* 586 */
  const RX = 96, RY = 168, RW = 700, RH = 340;
  const slam = E(f, 4, 7, 0, 1, OUT);         /* three frames, on the word */
  const sk = shake(f, 4, 12, 9);
  const lit = Array.from({ length: 12 }, () => 0.16 + slam * 0.84);
  const state = Array.from({ length: 12 }, () => (slam > 0.6 ? 2 : 0));
  return (
    <Scene p={p} slug="EVERY PAGE  ·  AT ONCE" push={[0, 21, 1.0]} vig={0.30}
      slugC="#8A7048">
      <div style={{ position: "absolute", inset: 0, zIndex: 1,
        transform: `translate(${sk.x}px, ${sk.y}px)` }}>
        <Hall p={p} f={f} lightX={0.5} floorLines={4} />
        {/* ⭐ pegboard again, ON PURPOSE: S1 and S8 are the same room, before
            and after, and the wall is what says so. */}
        <BackWall kind="pegboard" p={p} f={f} />
        {/* the eighteen, striking together — the villain's rule, broken */}
        {Array.from({ length: 9 }, (_, i) => (
          <Lamp key={"lp" + i} x={68 + i * 108} y={116} on={slam} f={f} s={0.72}
            len={250} spread={190} z={28} />))}
        <Rack x={RX} y={RY} w={RW} h={RH} z={40} f={f} cols={4} rows={3} lit={lit}
          state={state} flags={slam} named={false} />
        {/* ⛔⛔ THE LADDER CALLBACK USED TO BE A 168px-WIDE PlanLadder AT s=0.62,
            which rendered `INDEXABLE` / `CITABILITY` at about 10px — text too
            small to read is the worst of both worlds, because it costs the
            space of information while delivering none. The callback is the same
            five items in the same order, said with the icons and a tick each:
            watched, not read, and legible at thumb size. */}
        <div style={{ position: "absolute", left: 828, top: 186, zIndex: 70,
          display: "flex", flexDirection: "column", gap: 10 }}>
          {PLAN.map((q, i) => {
            const k = Math.max(0, Math.min(1, slam * 4 - i * 0.5));
            return (
              <div key={"pk" + i} style={{ display: "flex", alignItems: "center", gap: 9,
                opacity: k, transform: `translateX(${(1 - k) * 34}px)` }}>
                <span style={{ width: 60, height: 60, borderRadius: 30, background: CARDL,
                  border: `4px solid ${q.d.c}`, boxShadow: SH,
                  display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <DomainIcon k={q.d.key} s={0.50} c={q.d.c} on={k} />
                </span>
                <span style={{ width: 30, height: 30, borderRadius: 15, background: GREEN,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transform: `scale(${0.5 + k * 0.5})` }}>
                  <svg width={17} height={17} viewBox="0 0 17 17">
                    <path d="M 3.6 8.8 L 7 12 L 13.4 4.8" stroke="#FFF" strokeWidth={3}
                      fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>);
          })}
        </div>
        <ScoreDial x={818} y={512} p={0.12 + slam * 0.80} s={0.86} z={90} f={f} />
        <Auditor x={112} base={HZ + 130} s={0.74} z={82} f={f} gaze={0.9} cheer={slam} costume={SCENE_COSTUME[8]} />
      </div>
      <Flash lf={f} at={4} n={5} o={0.26} />
    </Scene>
  );
};

/* ================================================================== S9 ====
   19.87 -> 21.97s · 63f · CTA.
   "Comment SEO below and I'll send a guide immediately."

   ⛔ FOUR BEATS, ONE CUE EACH, NEVER ONE BEAT AND A HOLD. Reel 100's CTA v1
      spent every beat by f26 and then held for 28 frames. Here: the card lands
      f4, SENT stamps f13, the keyword sets f25, the rack behind lights through
      to the last frame from f38 — so the scene is still changing on its final
      frame.
   ========================================================================= */
export const S9Cta: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("lit");
  const HZ = p.horizon;                       /* 586 */
  const land = E(f, 4, 18, 0, 1, BACK);
  const sent = E(f, 13, 24, 0, 1, BACK);
  const key = E(f, 25, 37, 0, 1, BACK);
  const glow = E(f, 38, 62, 0, 1, IO);
  /* ⛔⛔ THE RACK WAS MOVING AND MEASURING NOTHING. dim 0.18 + lit 0.24 darkens
     a page by 56%, and at 0.68 opacity over this scene's bright warm wall the
     result was a mid-grey block travelling across a mid-cream ground — which is
     verbatim the "cream tiles on a WHITE window -> ~0" row in
     [[feedback_scene_needs_an_arc]]'s measured table. Area was never the
     problem; CONTRAST was. These are the FINISHED pages, so they are now lit
     properly, which is both the correct picture and what makes the travel
     register at all. */
  const lit = Array.from({ length: 12 }, () => 1);
  return (
    <Scene p={p} slug="COMMENT  ·  SEO" push={[0, 63, 1.032]} vig={0.34} slugC="#8A7048">
      <Hall p={p} f={f} lightX={0.5} floorLines={4} />
      <BackWall kind="tile" p={p} f={f} />
      {[0, 1, 2, 3, 4].map((i) => (
        <Lamp key={"s9l" + i} x={104 + i * 202} y={110} on={0.62 + glow * 0.38} s={0.58}
          f={f} len={180} spread={145} z={26} />))}
      {/* the site, finished — and RACKING ITSELF IN across the whole scene, so
          the reel's last 2.5s has its biggest object travelling rather than a
          backdrop quietly brightening. Runs to f74, past the 12-frame endHold. */}
      <div style={{ position: "absolute", inset: 0, zIndex: 3, opacity: 0.95 }}>
        <Rack x={158} y={158} w={700} h={300} z={4} f={f} cols={4} rows={3} lit={lit}
          state={Array.from({ length: 12 }, () => 2)} dim={0.04} named={false}
          rise={E(f, 2, 80, 0, 1, LIN)} spread={11} />
      </div>
      <Spot x={W / 2} on={1} f={f} len={HZ + 60} spread={600} />
      {/* THE CARD */}
      <div style={{ position: "absolute", left: W / 2 - 316, top: 348, width: 632, zIndex: 80,
        opacity: Math.min(1, land * 2),
        transform: `translateY(${(1 - land) * 54}px) scale(${0.94 + land * 0.06})`,
        background: CARDL, borderRadius: 20, border: `4px solid ${CARDD}`,
        boxShadow: SH_D, overflow: "hidden", padding: "26px 30px 30px" }}>
        <Sheen f={f} phase={3} z={4} o={0.05} />
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
          <div style={{ position: "relative", width: 62, height: 62, borderRadius: 15,
            background: "#FFFFFF", border: `2px solid #E8DCC0`, display: "flex",
            alignItems: "center", justifyContent: "center", boxShadow: SH, flexShrink: 0 }}>
            <Img src={staticFile("claude_logo.png")}
              style={{ width: 44, height: 44, objectFit: "contain" }} />
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: MONO, fontWeight: 900, fontSize: 17, color: "#8A8175",
              letterSpacing: "0.10em" }}>THE SETUP GUIDE</div>
            <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 30,
              color: "#241F17", whiteSpace: "nowrap", overflow: "hidden",
              textOverflow: "ellipsis" }}>25 skills, 18 agents</div>
          </div>
          {/* the SENT stamp */}
          <div style={{ marginLeft: "auto", opacity: sent, flexShrink: 0,
            transform: `rotate(-7deg) scale(${0.8 + sent * 0.2})`,
            border: `5px solid ${GREEN}`, borderRadius: 9, padding: "3px 13px",
            fontFamily: MONO, fontWeight: 900, fontSize: 25, color: GREEN,
            letterSpacing: "0.08em" }}>SENT</div>
        </div>
        {/* THE KEYWORD — the biggest thing on the card */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 6,
          background: INK, borderRadius: 14, padding: "14px 22px",
          transform: `scale(${0.92 + key * 0.08})`, transformOrigin: "0% 50%" }}>
          <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 21, color: "#B4AC9C",
            letterSpacing: "0.10em", flexShrink: 0 }}>COMMENT</span>
          <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 62,
            color: GOLD, lineHeight: 1, opacity: Math.min(1, key * 1.6) }}>SEO</span>
        </div>
      </div>
      {/* ⛔⛔ v1 ENDED ON A 12-FRAME DEAD RUN and measured 5.16, because the last
          third's only event was the rack behind LIGHTING — and a cross-fade
          changes every pixel a little, which the metric cannot see, while a
          translate changes many pixels a lot ([[apple-reel]] lesson 10). Reel
          100 hit this exact fault on its own final scene and the fix that
          worked was a WALK, so this is that fix: he crosses 384px over f34..62
          at ~13px/frame, and a 206px sprite is 42,400px² — just over the
          ~40,000px² floor a mover has to clear. The scene is now still changing
          on its final frame, which is the actual requirement. */}
      {/* ⛔⛔ AND THE FIRST WALK STILL LEFT THE DEAD RUN, for a reason that was
          arithmetic rather than craft: THIS SCENE IS NOT 63 FRAMES. It is the
          LAST scene, so the assembly gives it `to = TOTAL`, and TOTAL is
          SEO_TOTAL + endHold = 659 + 12 = 671 — i.e. 75 frames, not the 63 the
          scene index registers for the still gate. The walk ran f34..62 and the
          remaining 13 frames were exactly the 12-frame dead run the audit kept
          reporting. It now runs to f72 and clears the longest endHold. */}
      {/* ⛔ THE WALK IS GONE, AND ITS REASON WENT WITH IT. It was added when this
          scene's only "mover" was the rack quietly brightening — but the rack
          now RISES into place across the whole scene, which is a 210,000px²
          travel and carries the motion on its own (S9 measures 7.42 against a
          6.0 bar). The walk started him at x=1000, so a 206px sprite sat
          half-past the 1012 panel edge for the first ~15 frames, which reads as
          a clipping bug rather than as someone entering. He now stands fully
          inside at 777..983, clear to the right of the card. ⭐ When the reason
          for a fix disappears, remove the fix. */}
      <Auditor x={880} base={726} s={0.86} z={90} f={f}
        gaze={0.85} cheer={0.4 + key * 0.5} reach={land > 0.6 ? 0.55 : 0} costume={SCENE_COSTUME[9]} />
      <FlagTray x={40} y={HZ + 118} s={0.72} z={74} f={f} />
      <Mug x={636} y={HZ + 96} s={0.70} z={74} f={f} />
      <RackEdge side="l" c={dkh(OAK, 0.42)} w={44} z={92} />
    </Scene>
  );
};
