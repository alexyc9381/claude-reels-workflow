import React from "react";
import { useCurrentFrame } from "remotion";
import { inter, fraunces } from "./fonts";
import { MONO, Mascot } from "./SlopKit";
import {
  W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mxh, dkh, SH, SH_D, rnd,
  CLAY, GOLD, GREEN, RED, PAPER, INK, STEEL, STEELD, STEELL, CONC, CONCD,
  SHEET, SHEETD, AMBER, AMBERD, CARD, CARDD, LIME,
  Hall, Spot, Belt, SheetEdge, Scene, Cam, Beam, Strip, Motes, Chip, Plate,
  BigNum, Contact, Edge, Mark, MarkPlate, usePlace, idle, Sheen, breathe, drift,
} from "./CmpWorld";
import {
  Sheet, Ingot, Meter, DoorWay, Press, HEADS, Column, WorkRow, Balance,
  AnswerChip, RepoPlate, Arch, Cabinet, CtaCard, Torrent, Mass, Debris, ProviderTile, Fraction,
  SafetyBoard, Duck, NodeModules, Mug, Sticky, AgentRack, AGENTS,
} from "./CmpProps";

/* ===========================================================================
   REEL 101 "COMPRESS" · THE BODY.  Board: storyboards/101-compress.md.

   ═══ ROUND 2 — ALEX'S NOTES, AND WHAT EACH ONE CHANGED ═════════════════════
   1. *"quite some long pauses near the beginning"* -> the VO was RE-CUT to the
      five natural takes with every take trimmed to its own measured speech
      edges. 24.40s -> 21.14s. Three of v1's inserted gaps sat at points where
      he never paused ("95%|fewer", "everything|your", "providers|so") — they
      existed only to satisfy R1's 5s window, and his standing "tighten the VO"
      rule outranks it. Where the picture still needs a beat it CUTS ON THE
      WORD instead of buying air. ⚠️ R1 now reads hook 4.60 / worst-5s 5.40,
      over gate, and that is a logged, deliberate trade — not an oversight.
   2. *"each of the scenes arent interesting enough too boring"* +
      *"too boring and dull animations throughout"* -> two fixes, because the
      motion audit says these are two different faults:
        · STATIC scenes (S2 5.77, S8 5.17 in v1) got COMPONENT IDLES — Sheen,
          breathe, drift on every prop. That is the change that took reel 100
          from 8.26 to 9.80, and none of these props had it.
        · scenes that ARRIVED AND HELD got SUB-SHOTS. Seven scenes are now two
          framings instead of one long take ([[reel-multishot-structure]]:
          "too long / boring" is answered with more SHOTS, never more jitter).
   3. *"not enough claude sprites"* -> the clay Mascot is now in ELEVEN of the
      thirteen scenes, working: loading the belt, reading the bench, running
      the press, catching the answer, opening the drawer. He is sized 118-158
      so he never outranks the scene's hero.
   4. *"not enough logos and stuff"* -> the mark is in EVERY scene and it is
      big. Five land inside the first three seconds (wall, crew badge, door
      lintel, arch, plate). ⛔ It is never on his face, never on the press and
      never on the ingot — headroom is not an Anthropic product.
   ═══════════════════════════════════════════════════════════════════════════

   ⛔ EVERY EVENT FRAME IS A MEASURED WORD ONSET from src/data/words_compress.json
      converted to LOCAL Sequence frames, with the PICTURE LEADING BY 4 FRAMES
      so the crossover — not the start — lands on the syllable.
      root onsets (s): Stop 0.00 · So-this 2.14 · can-help 3.11 · for-the-same
        5.22 · And-the-trick 7.44 · your-AI 8.74 · before 9.62 · So-you-get
        11.36 · for-a-fraction 12.33 · And-the-best 13.92 · it-plugs 14.48 ·
        so-you-never 16.12 · hitting 17.22 · Comment 19.61
      scene `at` (frames, lead-4): 0 / 60 / 89 / 153 / 219 / 258 / 285 / 337 /
        366 / 414 / 480 / 513 / 584   (end 634)

   ⛔⛔ THE STAGE: the panel is 1012 x 792. The root header pill owns y 0..112,
      the slug owns y 730..792, so every hero lives in **y 118..726**. v1 put
      the hook's meter at y=0 and clipped the villain's face off the frame.

   ⛔ THE MOVE BUDGET IS THREE, each motivated: S0-C pulls BACK onto the queue,
      S6 TRUCKS alongside the ingot, S11 TILTS up the limit column. Everything
      else is locked with the mandatory slow in-panel push. Component idles are
      NOT camera moves and do not count against the budget.
   ⛔ ONE SUBJECT MOVES AT A TIME. An idle is not a subject.
   ⛔⛔ A TRANSFORMED WRAPPER NEEDS AN EXPLICIT zIndex or it makes a stacking
      context at auto and drops BEHIND the Hall — v1 lost S8's entire payoff,
      S3's balance and S7's chip to exactly that.
   ========================================================================= */

const shake = (lf: number, at: number, amp = 12, n = 10) => {
  if (lf < at || lf > at + n) return { x: 0, y: 0 };
  const k = 1 - (lf - at) / n;
  const d = k * k * amp;
  return { x: Math.sin(lf * 2.7) * d, y: Math.cos(lf * 3.4) * d * 0.7 };
};

/* ⭐ THE CREW — a clay Claude with a BIG mark over him. Alex: "not enough
   claude sprites", "not enough logos". ⛔ The mark goes ABOVE him, never on
   the body rect, which IS his face ([[reel 94 landed a badge on the eyes]]).
   ⛔ The contact shadow is WIDER than the sprite or it is invisible. */
const COSTUME: Record<string, Record<string, number>> = {
  /* ⛔ ROUND 9 — ALEX: *"need more different claude sprites outfits"*. Every
     Crew in v8 passed glasses={1}, so the same Claude stood in all thirteen
     scenes. Each set now casts him for the JOB he is doing in it, using the
     costume flags the house Mascot already ships
     ([[project_ai_niche_shortform]] — costumes are additive pixel-rect blocks,
     the body is never restyled). */
  dock:    { constr: 1 },                    /* hard hat — the intake floor */
  hand:    { constr: 1, beard: 1 },          /* the press bay veteran */
  analyst: { prof: 1, glasses: 1 },          /* the bench, reading numbers */
  judge:   { suit: 1, glasses: 1 },          /* the test rig, adjudicating */
  eng:     { constr: 1, glasses: 1 },        /* running the compressor */
  runner:  { glasses: 1 },                   /* following the line */
  boss:    { suit: 1, beard: 1 },            /* the provider hall */
  hype:    { fro: 1 },                       /* the payoff */
  host:    { chef: 0, suit: 1, capeC: 0 },   /* the CTA */
};

/* ⭐ THE CREW — a clay Claude with a BIG mark over him, cast per scene.
   ⛔ The mark goes ABOVE him, never on the body rect, which IS his face.
   ⛔ The contact shadow is WIDER than the sprite or it is invisible. */
const Crew: React.FC<{ lf: number; x: number; ground: number; size?: number; z?: number;
  gaze?: number; stern?: number; cheer?: number; shock?: number; seed?: number;
  mark?: number; markS?: number; flip?: boolean; fit?: string }> =
  ({ lf, x, ground, size = 140, z = 66, gaze = 0, stern = 0, cheer = 0, shock = 0,
     seed = 1, mark = 1, markS = 56, flip = false, fit = "runner" }) => {
  const id = idle(lf, seed);
  const bob = cheer > 0.5 ? Math.abs(Math.sin(lf / 7)) * 7 : 0;
  const kit = COSTUME[fit] ?? COSTUME.runner;
  return (<>
    <Contact x={x} y={ground - 6} w={size * 1.34} z={z - 1} o={0.42} />
    {mark > 0.02 && (
      <div style={{ position: "absolute", left: x - markS * 0.65,
        top: ground - size - markS * 1.16 + id.dy * 0.6 - bob, zIndex: z + 1,
        opacity: mark, transform: `scale(${breathe(lf, seed, 0.035)})` }}>
        <Mark x={0} y={0} s={markS} z={z + 1} />
      </div>
    )}
    {/* ⭐ ROUND 12 — ALEX: *"exaggerated animations"*. The bob now carries real
        SQUASH AND STRETCH: he compresses on the way down and stretches at the
        top, which is what separates a bouncing rectangle from a character. */}
    <div style={{ position: "absolute", left: x - size / 2, top: ground - size + id.dy - bob,
      zIndex: z, transform: `rotate(${id.rot}deg) ${flip ? "scaleX(-1)" : ""} scale(${1 - bob * 0.010}, ${1 + bob * 0.016})`,
      transformOrigin: "50% 100%" }}>
      <Mascot lf={lf} size={size} gaze={gaze} stern={stern} cheer={cheer} shock={shock}
        {...kit} />
    </div>
  </>);
};

/* =========================================================================
   S0 · THE OPEN — f0..60. THREE HARD CUTS, authored to docs/THE-OPEN.md.
   ⛔ FRAME 0 IS ALREADY SETTLED: the jam has happened before the reel starts
      and the alarm is already lit. Recognition beats motion.
   ====================================================================== */
export const S0Hook: React.FC = () => {
  const lf = useCurrentFrame();
  const p = usePlace("door");
  const HZ = p.horizon;                                   /* 596 */
  /* ⛔⛔ ROUND 4 — ALEX: *"way too boring and way too plain like just papers and
     stuff … the first 10 seconds needs to be a lot more stimulating"*.
     v3's hook was ONE sheet stuck in a doorway. The premise is "everything your
     agent reads", which is a VOLUME, and volume was never on screen. It is now
     a TORRENT — dozens of slabs on four depth planes pouring at the door, the
     near ones ripping past camera — hitting a doorway that cannot take them,
     piling into a wall, with the meter spinning and debris coming off the
     impact. Still ONE continuous move (round 3's note): the camera rides
     backwards ahead of the flood. */
  const dev = E(lf, 0, 58, 0, 1, IO);
  const sc  = 1.54 - dev * 0.62;
  const dy  = 176 - dev * 232;
  const hit = E(lf, 6, 15, 0, 1, OUT);       /* the pile slams the jamb */
  const fall = ((lf * 0.22) % 1);
  return (
    <Scene p={p} slug="THE INTAKE" push={[0, 1, 1]} vig={0.50} slugC="#8C939B">
      <Cam s={sc} y={dy} z={2}>
        <Hall p={p} f={lf} lightX={0.5} floorLines={5} live bleed={320} />
        <Spot x={506} y={-28} on={breathe(lf, 0, 0.06)} c={p.key} f={lf} len={470}
          spread={470} z={22} />
        <Beam x={170} y={30} top={30} bot={320} len={360} c="#8FA0B2" o={0.11} z={4} f={lf} />
        <Belt y={HZ - 40} f={lf} x0={-520} x1={W + 260} z={26} speed={3.4} />
        {/* ⭐ THE FLOOD, far planes — behind the door frame */}
        <Torrent f={lf} n={18} z={16} seed={11} speed={1.15} cy={HZ - 190} spread={0.9} />
        {/* ⭐ GAG: the one slab every developer recognises, and it is taller than
            everything else on the line by a mile. */}
        <NodeModules x={-330} ground={HZ - 40} h={470} z={22} f={lf} />
        <SafetyBoard x={-166} y={182} s={1.0} z={34} f={lf} />
        <Mark x={62} y={166} s={142} z={36} />
        <div style={{ position: "absolute", left: 32, top: 332, width: 202, zIndex: 36,
          textAlign: "center", fontFamily: MONO, fontWeight: 900, fontSize: 16,
          letterSpacing: "0.05em", color: "#9BA5B0" }}>EVERY TURN</div>
        <DoorWay x={326} y={HZ - 268} w={360} h={268} z={30} mark={0} />
        {/* the pile jamming the opening — many slabs, not one sheet */}
        {Array.from({ length: 9 }, (_, i) => {
          const r1 = rnd(i, 1), r2 = rnd(i, 2);
          const land = E(lf, 2 + i * 1.6, 12 + i * 1.6, 0, 1, OUT);
          return (
            <div key={"pl" + i} style={{ position: "absolute", inset: 0, zIndex: 46 + (i % 3),
              transform: `translateY(${(1 - land) * -520}px) rotate(${Math.sin(lf / 15 + i) * 0.7}deg)`,
              transformOrigin: "50% 100%" }}>
              <Sheet x={352 + r1 * 210} y={214 + r2 * 120} w={128 + r2 * 74}
                h={244 + r1 * 130} lit={1.02 + r2 * 0.16}
                kind="logo" seed={i * 5 + 1}
                rot={-22 + r1 * 46} z={46} tok={i === 3 ? "29,412" : undefined} />
            </div>
          );
        })}
        <Debris x={506} y={HZ - 200} k={hit} n={26} z={72} seed={4} spread={420} />
        {/* ⭐ THE FLOOD, near planes — ripping past camera, in front of it all */}
        <Torrent f={lf} n={16} z={78} seed={31} speed={1.9} cy={HZ - 120} spread={1.25} />
        <Meter x={352} y={132} s={1.06} v="029412" fall={fall} hot={1} z={60} />
        <Column x={756} y={166} w={78} h={390} fill={0.845} line={0.86}
          alarm={breathe(lf, 1, 0.12)} z={40} />
        <Crew lf={lf} x={-262} ground={HZ + 96} size={214} z={70} shock={1} gaze={0.8}
          seed={2} markS={82} fit="dock" />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S1 · f60..89 (29f) — the repo lands. "So this open source GitHub repo…"
   ====================================================================== */
export const S1: React.FC = () => {
  const lf = useCurrentFrame();
  const p = usePlace("press");
  const HZ = p.horizon;                                   /* 600 */
  const on = E(lf, 1, 9, 0, 1, BACK);
  const stars = Math.round(E(lf, 3, 20, 0, 66006, OUT));
  return (
    <Scene p={p} slug="THE PRESS BAY" push={[0, 29, 1.04]} vig={0.50} slugC="#A0846C">
      <Hall p={p} f={lf} lightX={0.40} floorLines={4} live />
      <Spot x={330} y={-30} on={0.85 * breathe(lf, 0, 0.05)} c={p.key} f={lf} len={430}
        spread={380} z={22} />
      <Belt y={HZ - 40} f={lf} x0={-60} x1={W + 60} z={26} speed={2.0} />
      {/* asleep: no heads lit, no iris — but the steel still catches the key */}
      <Press x={104} y={HZ - 486} w={806} h={406} z={42} wake={0} heads={[0, 0, 0]}
        iris={0} labels={false} ram={0.08} f={lf} />
      <div style={{ position: "absolute", left: 126, top: HZ - 452, width: 760, height: 372,
        zIndex: 43 }}><Sheen f={lf} w={760} h={372} o={0.10} period={132} /></div>
      {/* ⭐ AI-NICHE MESSAGING: the agents it wraps, as real marks. Every one is
          named in headroom's own README wrap list. */}
      <AgentRack x={288} y={352} s={1.06} z={64} f={lf}
        on={[0, 1, 2, 3].map((i) => E(lf, 6 + i * 4, 15 + i * 4, 0, 1, BACK))} />
      <Sticky x={868} y={218} t="DO NOT TOUCH THE RAM" s={0.94} z={66} rot={-7} />
      <RepoPlate x={228} y={150} stars={stars.toLocaleString()} on={on} z={72} s={1.52} />
      <Crew lf={lf} x={866} ground={HZ + 96} size={206} z={66} gaze={-0.6} seed={5}
        markS={80} />
      <SheetEdge side="l" c={SHEETD} w={70} z={90} />
    </Scene>
  );
};

/* =========================================================================
   S2 · f89..153 (64f) — the measured workloads. TWO SHOTS.
   ⛔ v1 was the reel's most STATIC scene (5.77 vs a 9.00 bar): four rows
      landed and then 40 frames of nothing. It is now rows-landing, then a
      hard cut to a PUSH on the best row.
   ⛔ THE BAND IS SCOPE-LABELLED ON THE ROWS IT MEASURES AND IS NEVER THE
      HEADLINE (board: HONESTY LINE).
   ====================================================================== */
const ROWS: [string, string, string, number, string, string | undefined][] = [
  ["CODE SEARCH",      "17,765", "1,408",  0.079, "92%", "JSON · 60-95%"],
  ["SRE DEBUG",        "65,694", "5,118",  0.078, "92%", "TOOL OUTPUT"],
  ["ISSUE TRIAGE",     "54,174", "14,761", 0.272, "73%", undefined],
  ["CODEBASE EXPLORE", "78,502", "41,254", 0.525, "47%", undefined],
];
export const S2: React.FC = () => {
  const lf = useCurrentFrame();
  const p = usePlace("bench");
  const HZ = p.horizon;                                   /* 604 */
  /* ⛔⛔ ROUND 15 — ALEX: *"the scene at 4 seconds is too weak, it doesnt really
     show whats being spoken about"*. The VO here is "save 60 to 95% fewer
     tokens", and v13 answered it with four abstract masses collapsing — a bar
     chart wearing a costume. It now shows ONE workload literally: a stack of
     17,765 tokens on the bench, the overwhelming majority of it swept away, and
     the small remainder left standing next to the number you actually pay.
     ⛔ Still the repo's real code-search figures, unchanged. */
  const cut  = E(lf, 5, 30, 0, 1, IN_Q);
  const num  = E(lf, 24, 36, 0, 1, BACK);
  const dev  = E(lf, 2, 60, 0, 1, IO);
  const N = 44;                                            /* the stack */
  return (
    <Scene p={p} slug="17,765 → 1,408" push={[0, 1, 1]} vig={0.44} slugC="#8A6E44">
      <Cam s={1.0 + dev * 0.16} y={-dev * 30} z={2}>
        <Hall p={p} f={lf} lightX={0.30} floorLines={4} live bleed={200} />
        <Spot x={220} y={-30} on={0.9 * breathe(lf, 2, 0.05)} c={p.key} f={lf} len={420}
          spread={400} z={22} />
        <div style={{ position: "absolute", left: 40, top: HZ - 22, width: 932, height: 26,
          zIndex: 30, background: mxh("#4C3B27", 0.14), boxShadow: SH_D }} />
        {/* the whole read, as a wall of branded slabs. Most of it LEAVES. */}
        {Array.from({ length: N }, (_, i) => {
          const col = i % 11, row = Math.floor(i / 11);
          const keep = i % 11 === 0;                       /* ~1 in 11 stays: 9% */
          const go = keep ? 0 : E(lf, 5 + (i % 11) * 1.7, 26 + (i % 11) * 1.7, 0, 1, IN_Q);
          return (
            <div key={i} style={{ position: "absolute", inset: 0, zIndex: 40 - row,
              transform: `translate(${go * (col - 5) * 190}px, ${go * -560}px) rotate(${go * (col - 5) * 22}deg)`,
              opacity: 1 - go * 0.9 }}>
              <Sheet x={104 + col * 74} y={HZ - 196 - row * 34} w={66} h={172} z={40 - row}
                lit={keep ? 1.12 : 0.86} kind="logo" seed={i * 2} />
            </div>
          );
        })}
        {/* what you sent, and what you actually pay for */}
        <div style={{ position: "absolute", left: 96, top: 180, zIndex: 66,
          fontFamily: MONO, fontWeight: 900, fontSize: 44, color: hexa("#EDE6D4", 0.5) }}>
          <span style={{ position: "relative" }}>17,765
            <span style={{ position: "absolute", left: -4, right: -4, top: "52%", height: 6,
              background: RED, transform: `scaleX(${cut})`, transformOrigin: "0% 50%" }} /></span>
        </div>
        <div style={{ position: "absolute", left: 96, top: 250, zIndex: 66, opacity: num,
          transform: `scale(${0.8 + num * 0.2})`, transformOrigin: "0% 50%" }}>
          <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 78,
            color: mxh(GREEN, 0.20) }}>1,408</span>
          <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 30, marginLeft: 14,
            color: mxh(GREEN, 0.44) }}>92% OFF</span>
        </div>
        <div style={{ position: "absolute", left: 100, top: 352, zIndex: 66, opacity: num,
          fontFamily: MONO, fontWeight: 800, fontSize: 15, letterSpacing: "0.06em",
          color: mxh(CARDD, 0.20) }}>ONE CODE SEARCH · 100 RESULTS</div>
        <Debris x={506} y={HZ - 210} k={E(lf, 8, 30, 0, 1, LIN)} n={22} z={68} seed={3}
          spread={340} />
        <Crew lf={lf} x={942} ground={HZ + 100} size={192} z={66} shock={cut} gaze={-0.8}
          seed={7} markS={76} fit="analyst" />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S3 · f153..219 (66f) — the accuracy receipt. TWO SHOTS.
   ⛔ This is the ONLY place the accuracy half of the claim is proved, so it
      gets its own place, its own (coldest) light, and its own two framings.
   ====================================================================== */
export const S3: React.FC = () => {
  const lf = useCurrentFrame();
  const p = usePlace("alcove");
  const HZ = p.horizon;                                   /* 588 */
  /* ⛔⛔ ROUND 7 — ALEX: *"the answer delta animation is too complicated to
     understand, needs to be replaced with something way simpler"*. He is right:
     a hunting needle on a signed-delta scale asks the viewer to know what zero
     delta MEANS before the shot pays off. The simplest statement of "the same
     answer" is an EQUALS SIGN. Two identical answer cards slide in, a giant
     green = lands between them, done. Nothing to decode. */
  const slide = E(lf, 0, 13, 0, 1, OUT);
  const eq    = E(lf, 16, 26, 0, 1, BACK);
  const seal  = E(lf, 30, 42, 0, 1, OUT);
  const sk    = shake(lf, 16, 12, 9);
  const Card: React.FC<{ x: number; tag: string }> = ({ x, tag }) => (
    <div style={{ position: "absolute", left: x, top: 250, width: 274, height: 300, zIndex: 46,
      background: CARD, border: `5px solid ${CARDD}`, boxSizing: "border-box",
      boxShadow: SH_D, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 40,
        background: dkh(CARD, 0.12), display: "flex", alignItems: "center",
        justifyContent: "center", fontFamily: MONO, fontWeight: 900, fontSize: 16,
        letterSpacing: "0.10em", color: "#6E665B" }}>{tag}</div>
      {/* ⛔ the two cards are IDENTICAL — that is the entire point of the shot */}
      <svg width="150" height="150" viewBox="0 0 100 100"
        style={{ position: "absolute", left: 62, top: 66 }}>
        <path d="M50 8 L96 88 L4 88 Z" fill={dkh(RED, 0.06)} stroke={dkh(RED, 0.34)} strokeWidth="6" />
        <rect x="44" y="34" width="12" height="30" rx="4" fill={mxh(RED, 0.72)} />
        <circle cx="50" cy="74" r="7" fill={mxh(RED, 0.72)} />
      </svg>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 22, textAlign: "center",
        fontFamily: MONO, fontWeight: 900, fontSize: 24, letterSpacing: "0.08em",
        color: dkh(RED, 0.20) }}>FATAL</div>
    </div>
  );
  return (
    <Scene p={p} slug="THE SAME ANSWER" push={[0, 1, 1]} vig={0.52} slugC="#93A8B8">
      <Cam s={1.0 + E(lf, 6, 62, 0, 0.12, IO)} z={2}>
        <Hall p={p} f={lf} lightX={0.5} floorLines={4} live bleed={200} />
        <Torrent f={lf} n={9} z={12} seed={71} speed={0.8} cy={220} spread={0.7}
          tint="#7E8C9A" />
        <div style={{ position: "absolute", left: 96, top: 566, width: 820, height: 26,
          zIndex: 30, background: mxh(p.floor, 0.22), boxShadow: SH_D }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 46,
          transform: `translateX(${(1 - slide) * -420}px)` }}><Card x={78} tag="BASELINE" /></div>
        <div style={{ position: "absolute", inset: 0, zIndex: 46,
          transform: `translateX(${(1 - slide) * 420}px)` }}><Card x={660} tag="HEADROOM" /></div>
        {/* ⭐ THE EQUALS SIGN — the whole claim, in one symbol */}
        <div style={{ position: "absolute", left: 418, top: 340, width: 176, height: 130,
          zIndex: 70, opacity: eq, transform: `translate(${sk.x}px, ${sk.y}px) scale(${0.5 + eq * 0.5})`,
          transformOrigin: "50% 50%" }}>
          {[0, 1].map((i) => (
            <div key={i} style={{ position: "absolute", left: 0, right: 0, top: i ? 82 : 12,
              height: 36, borderRadius: 6, background: mxh(GREEN, 0.10),
              border: `4px solid ${dkh(GREEN, 0.24)}`, boxSizing: "border-box", boxShadow: SH }} />
          ))}
        </div>
        <Debris x={506} y={400} k={E(lf, 16, 34, 0, 1, LIN)} n={18} z={72} seed={21}
          spread={330} c="#BFD4BE" />
        {seal > 0.04 && (
          <div style={{ position: "absolute", left: 246, top: 630, width: 520, zIndex: 66,
            opacity: seal, textAlign: "center", fontFamily: MONO, fontWeight: 900,
            fontSize: 19, letterSpacing: "0.03em", color: mxh(p.key, 0.22) }}>
            GSM8K 0.870 → 0.870</div>
        )}
        <Crew lf={lf} x={-16} ground={HZ + 122} size={190} z={66} cheer={eq} gaze={0.7}
          seed={9} markS={74} fit="judge" />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S4 · f219..258 (39f) — the press wakes. "And the trick is that it compresses…"
   ====================================================================== */
export const S4: React.FC = () => {
  const lf = useCurrentFrame();
  const p = usePlace("press");
  const HZ = p.horizon;                                   /* 600 */
  const iris = E(lf, 1, 12, 0, 1, OUT);
  const heads = [0, 1, 2].map((i) => E(lf, 9 + i * 7, 16 + i * 7, 0, 1, OUT));
  return (
    <Scene p={p} slug="THREE COMPRESSORS" push={[0, 40, 1.05]} vig={0.50} slugC="#A0846C">
      <Hall p={p} f={lf} lightX={0.5} floorLines={2} live />
      <div style={{ position: "absolute", left: 250, top: 250, width: 520, height: 380,
        borderRadius: "50%", background: hexa(AMBER, (0.10 + iris * 0.14) * breathe(lf, 0, 0.10)),
        zIndex: 6 }} />
      <Belt y={HZ - 34} f={lf} x0={-60} x1={W + 60} z={26} speed={2.4} />
      <Torrent f={lf} n={16} z={12} seed={91} speed={1.5} cy={250} spread={0.9} />
      <Press x={26} y={122} w={960} h={510} z={42} wake={1} heads={heads} iris={iris} labels
        ram={E(lf, 18, 32, 0, 0.70, IN_Q)} f={lf} crush={E(lf, 30, 39, 0, 1, OUT)} />
      <Debris x={506} y={540} k={E(lf, 30, 39, 0, 1, LIN)} n={20} z={72} seed={33} spread={380} />
      <div style={{ position: "absolute", left: 26, top: 122, width: 960, height: 510,
        zIndex: 43 }}><Sheen f={lf} w={960} h={510} o={0.10} period={90} /></div>
      <Crew lf={lf} x={906} ground={HZ + 100} size={196} z={66} gaze={-0.8} seed={10}
        markS={76} fit="eng" />
      <SheetEdge side="l" c={SHEETD} w={58} z={90} />
    </Scene>
  );
};

/* =========================================================================
   S5 · f258..285 (27f) — the material goes in. "…your AI agent reads…"
   ⛔ ONE subject moves: the sheet. The camera is dead still.
   ====================================================================== */
export const S5: React.FC = () => {
  const lf = useCurrentFrame();
  const p = usePlace("press");
  const HZ = p.horizon;
  /* ⛔⛔ ROUND 8 — ALEX: *"the compressor machines need to be way better"* +
     *"make the animations way more elevated"*. v7 slid a slab in and scaled it
     to nothing. This is now a staged MACHINE CYCLE with the beats a real press
     has, each with its own frame:
       f0-8   FEED     the slab rides in, the iris opens to take it
       f8-13  CONTACT  the ram touches — the slab BULGES before it yields
       f13-18 STROKE   full compaction, the whole rig RECOILS and dust blows
       f18-27 EJECT    the ingot is pushed out, a fraction of the height
     The recoil is the part that sells mass: nothing heavy stops without
     kicking back. */
  const feed    = E(lf, 0, 9, -300, 0, OUT);
  const contact = E(lf, 8, 13, 0, 1, OUT);
  const stroke  = E(lf, 13, 18, 0, 1, IN_Q);
  const eject   = E(lf, 18, 27, 0, 1, BACK);
  const recoil  = shake(lf, 17, 17, 8);              /* the whole rig kicks */
  const slabH   = 296 * (1 - stroke * 0.80) * (1 - contact * 0.05);
  const slabW   = 186 * (1 + contact * 0.14 + stroke * 0.20);   /* it bulges out */
  return (
    <Scene p={p} slug="THE COMPACTION STROKE" push={[0, 1, 1]} vig={0.52} slugC="#A0846C">
      <Cam x={recoil.x} y={recoil.y} s={1.0 + E(lf, 0, 27, 0, 0.10, IO)} z={2}>
        <Hall p={p} f={lf} lightX={0.56} floorLines={3} live />
        <Belt y={HZ - 34} f={lf} x0={-60} x1={W + 60} z={26} speed={4.2 * (1 - stroke)} />
        <Torrent f={lf} n={10} z={14} seed={101} speed={2.0} cy={HZ - 300} spread={0.8} />
        <Press x={300} y={HZ - 520} w={760} h={486} z={52} wake={1}
          heads={[1, 0.18, 0.18]} iris={1 - stroke * 0.94} labels={false}
          ram={0.10 + contact * 0.46 + stroke * 0.30} f={lf}
          crush={E(lf, 16, 26, 0, 1, OUT)} />
        <div style={{ position: "absolute", left: 352, top: HZ - 554, zIndex: 62,
          fontFamily: MONO, fontWeight: 900, fontSize: 16, letterSpacing: "0.04em",
          color: mxh(AMBER, 0.46), opacity: breathe(lf, 1, 0.08) }}>SmartCrusher · JSON</div>
        {/* the slab: rides in, bulges under contact, yields on the stroke */}
        {stroke < 0.96 && (
          <div style={{ position: "absolute", inset: 0, zIndex: 44,
            transform: `translateX(${feed}px)` }}>
            <Sheet x={520 - slabW / 2} y={HZ - 34 - slabH} w={slabW} h={slabH}
              tok={stroke < 0.4 ? "10,144" : undefined} lit={1.08} kind="braces"
              label={stroke < 0.4 ? "file_read" : undefined} z={44} />
          </div>
        )}
        {/* the ingot, pushed out the far side */}
        {eject > 0.02 && (
          <div style={{ position: "absolute", inset: 0, zIndex: 46,
            transform: `translateX(${(1 - eject) * -150}px)`, opacity: eject }}>
            <Ingot x={620} y={HZ - 96} w={192} h={62} ref_="REF:a91f" tok="1,260"
              lit={1.1} z={46} seed={0} f={lf} />
          </div>
        )}
        {/* ⭐ GAG: somebody left a mug on the press. It jumps on the stroke. */}
        <Mug x={352} y={HZ - 72} s={1.15} z={56} hit={E(lf, 16, 27, 0, 1, LIN)} />
        <Debris x={520} y={HZ - 190} k={E(lf, 15, 27, 0, 1, LIN)} n={26} z={72} seed={7}
          spread={460} />
        <Crew lf={lf} x={116} ground={HZ + 96} size={198} z={66} shock={contact}
          gaze={-0.9} seed={11} markS={78} fit="eng" />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S6 · f285..337 (52f) — the ingot clears the door. TWO SHOTS.
   ⛔ MOVE 2 OF 3: the camera TRUCKS alongside the ingot, matched to its speed.
   ⛔ THE METER DOES NOT LOSE HERE. It ticks up slightly. The villain is intact
      until S8, and this is the scene most likely to break that by accident.
   ⭐ The CCR beat lives here now: the ORIGINAL stays on a rack behind the
      press, tagged to the ingot's [REF:id]. v1 spent a whole scene on it in a
      VO pause that the re-cut deleted.
   ====================================================================== */
export const S6: React.FC = () => {
  const lf = useCurrentFrame();
  const p = usePlace("run");
  const HZ = p.horizon;                                   /* 606 */
  /* ⛔ ROUND 3: v2 trucked, then CUT to a locked framing at f30. It is now one
     continuous move — the truck decelerates into the doorway and settles, so
     the "room to spare" reveal happens in the same shot. */
  const truck = E(lf, 1, 40, 0, -412, IO);
  const sc = 1.0 + E(lf, 26, 50, 0, 0.16, IO);
  const th = E(lf, 30, 44, 0, 1, OUT);
  return (
    <Scene p={p} slug="COMPRESSED BEFORE THE CALL" push={[0, 1, 1]} vig={0.54} slugC="#A99878">
      <Cam x={truck} s={sc} z={2}>
        <Hall p={p} f={lf} lightX={0.66} floorLines={5} live bleed={520} />
        <Spot x={300} y={-34} on={0.55} c={p.key} f={lf} len={400} spread={330} z={22} />
        <Spot x={760} y={-34} on={0.8} c={p.key} f={lf} len={420} spread={360} z={22} />
        <Belt y={HZ - 30} f={lf} x0={-560} x1={W + 560} z={26} speed={4.2} />
        <Press x={-430} y={HZ - 430} w={660} h={400} z={30} wake={1} heads={[1, 0.2, 0.2]}
          iris={0.85} labels={false} f={lf} ram={0.5} />
        {/* ⭐ CCR: the ORIGINAL stays behind, whole, tagged to the ingot */}
        <div style={{ position: "absolute", left: 262, top: HZ - 268, zIndex: 32 }}>
          <Sheet x={0} y={0} w={124} h={238} lit={0.62} dense={0.7} kind="json" z={32} />
          <div style={{ position: "absolute", left: -8, top: 244, width: 140, textAlign: "center",
            fontFamily: MONO, fontWeight: 900, fontSize: 11, letterSpacing: "0.03em",
            color: mxh("#8FA0B2", 0.16) }}>KEPT · REF:a91f</div>
        </div>
        <DoorWay x={742} y={HZ - 300} w={330} h={300} z={34} mark={1} />
        <div style={{ position: "absolute", left: 770, top: HZ - 268, width: 274, height: 238,
          zIndex: 28, background: hexa("#F3E4BE", 0.15 * breathe(lf, 0, 0.12)) }} />
        {/* the gap the ingot does NOT fill — the whole point of the shot */}
        <div style={{ position: "absolute", left: 792, top: HZ - 250, width: 232, height: 4,
          background: hexa(LIME, 0.55), zIndex: 52, opacity: th }} />
        <div style={{ position: "absolute", left: 792, top: HZ - 242, width: 232, zIndex: 52,
          textAlign: "center", fontFamily: MONO, fontWeight: 900, fontSize: 14,
          letterSpacing: "0.08em", color: mxh(LIME, 0.34), opacity: th }}>ROOM TO SPARE</div>
        <div style={{ position: "absolute", inset: 0, zIndex: 46,
          transform: `translateX(${E(lf, 1, 40, 0, 690, IO)}px)` }}>
          <Ingot x={186} y={HZ - 106} w={196} h={76} ref_="REF:a91f" lit={1.08} z={46} seed={0} f={lf} />
        </div>
        <Meter x={790} y={HZ - 412} s={0.86} v="001260" fall={(lf * 0.10) % 1} hot={0.18} z={60} />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S7 · f337..366 (29f) — the answer comes back. "So you get the same answers…"
   ====================================================================== */
export const S7: React.FC = () => {
  const lf = useCurrentFrame();
  const p = usePlace("alcove");
  const HZ = p.horizon;                                   /* 588 */
  const land = E(lf, 0, 8, 0, 1, BACK);
  const sk = shake(lf, 6, 9, 8);
  return (
    <Scene p={p} slug="THE SAME FINDING" push={[0, 29, 1.05]} vig={0.56} slugC="#93A8B8">
      <Hall p={p} f={lf} lightX={0.44} floorLines={3} live />
      <DoorWay x={92} y={HZ - 250} w={228} h={250} z={30} mark={1} lintel="/v1/messages" />
      <div style={{ position: "absolute", left: 396, top: HZ - 44, width: 540, height: 26,
        background: mxh(p.floor, 0.20), zIndex: 33, boxShadow: SH }} />
      <div style={{ position: "absolute", left: 396, top: HZ - 20, width: 540, height: 8,
        background: dkh(p.floor2, 0.20), zIndex: 34 }} />
      {/* it flies out of the door and lands — a LARGE bright fast mover */}
      <div style={{ position: "absolute", inset: 0, zIndex: 62,
        transform: `translate(${sk.x + E(lf, 0, 8, -240, 0, OUT)}px, ${sk.y}px)` }}>
        <AnswerChip x={556} y={HZ - 140} s={1.42} z={62} on={land} />
      </div>
      <div style={{ position: "absolute", left: 452, top: HZ + 4, width: 430, zIndex: 60,
        textAlign: "center", fontFamily: MONO, fontWeight: 900, fontSize: 15,
        letterSpacing: "0.06em", color: mxh(p.key, 0.16),
        opacity: E(lf, 10, 17, 0, 1, OUT) }}>SAME ERROR FOUND</div>
      <Crew lf={lf} x={892} ground={HZ + 98} size={202} z={66} cheer={0.8} gaze={-0.6}
        seed={12} markS={78} fit="runner" />
    </Scene>
  );
};

/* =========================================================================
   S8 · f366..414 (48f) — ⭐ THE PEAK. TWO SHOTS. "…for a fraction of the tokens."
   ⛔ THE HERO ARTIFACT RESOLVES, and this is the ONLY place the villain loses.
      It does NOT roll backward — a bill does not un-charge. It settles on a
      smaller number with the one it was going to charge struck above it.
   ⛔ v1 scored 5.17 (STATIC): the number landed at f32 and then held for 29
      frames. It now lands earlier and hard-cuts to the meter losing.
   ====================================================================== */
export const S8: React.FC = () => {
  const lf = useCurrentFrame();
  const p = usePlace("macro");
  /* ⛔ ROUND 7 — ALEX: *"the scenes explaining FRACTION should show a better
     animation"*. v6 struck one number out and faded another in, which STATES a
     fraction. The shot now SHOWS it: the full send stays as a hollow ghost and
     the thing you actually pay for shrinks to its true relative size inside it
     — 1,260 of 10,144 is 12.4%, and that is exactly how tall it ends up. The
     empty space is the saving, and it is labelled. */
  const k    = E(lf, 3, 24, 0, 1, IN_Q);
  const chip = E(lf, 26, 34, 0, 1, BACK);
  const set  = E(lf, 30, 42, 0, 1, OUT);
  const dev  = E(lf, 24, 46, 0, 1, IO);
  const sk   = shake(lf, 22, 12, 9);
  return (
    <Scene p={p} slug="A FRACTION OF THE TOKENS" push={[0, 1, 1]} vig={0.60} slugC="#B39A6E">
      <Cam s={1.14 - dev * 0.20} y={-20 + dev * 62} z={2}>
        <Hall p={p} f={lf} lightX={0.42} floorLines={3} live bleed={240} />
        <Spot x={330} y={-40} on={breathe(lf, 0, 0.05)} c={p.key} f={lf} len={430}
          spread={330} z={22} />
        <div style={{ position: "absolute", left: -240, right: -240, top: 620, height: 30,
          zIndex: 30, background: mxh(p.floor, 0.22), boxShadow: SH_D }} />
        <Meter x={318} y={-96} s={1.22} v="001260" fall={(1 - set) * 0.9} hot={0.10}
          strike={k > 0.4 ? "10,144" : undefined} z={64} />
        <div style={{ position: "absolute", inset: 0, zIndex: 46,
          transform: `translate(${sk.x}px, ${sk.y}px)` }}>
          <Fraction x={296} y={186} w={420} h={434} z={46} k={k} big="10,144"
            small="1,260" f={lf} />
        </div>
        <Debris x={506} y={470} k={E(lf, 20, 38, 0, 1, LIN)} n={22} z={72} seed={5}
          spread={380} c="#CBD8B4" />
        <AnswerChip x={412} y={636} s={1.4} z={70} on={chip} />
        <Crew lf={lf} x={906} ground={708} size={194} z={66} cheer={1} seed={13} markS={0} fit="hype" />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S9 · f414..480 (66f) — "And the best part, it plugs straight into your
   favorite AI providers…"  TWO SHOTS.
   ⛔ The Claude arch lights FIRST and is the largest: the mark is the audience
      filter, not decoration.
   ====================================================================== */
export const S9: React.FC = () => {
  const lf = useCurrentFrame();
  const p = usePlace("arch");
  const HZ = p.horizon;                                   /* 590 */
  /* ⛔ ROUND 7 — ALEX: *"when it talks about best ai providers then show like
     logos of actual ai provider companies"*. v6 had three empty stone arches
     with typeset names. They now carry the REAL marks from public/logos.
     ⛔ All three are named in headroom's own README — it forwards to Anthropic
     and OpenAI-compatible endpoints, and its cost calculator lists Gemini — so
     nothing here is invented ([[feedback_real_marks_are_the_props]]). */
  const P: [string, string][] = [["anthropic.svg", "ANTHROPIC"], ["openai.png", "OPENAI"],
                                 ["googlegemini.svg", "GEMINI"]];
  const a = [0, 1, 2].map((i) => E(lf, 2 + i * 8, 12 + i * 8, 0, 1, BACK));
  const dev = E(lf, 26, 62, 0, 1, IO);
  const wrap = E(lf, 34, 44, 0, 1, OUT);
  const typed = Math.min(20, Math.round(E(lf, 36, 56, 0, 20, LIN)));
  return (
    <Scene p={p} slug="A DROP-IN PROXY" push={[0, 1, 1]} vig={0.48} slugC="#9A9BA8">
      <Cam s={1.0 + dev * 0.16} y={-dev * 54} z={2}>
        <Hall p={p} f={lf} lightX={0.5} floorLines={4} live bleed={180} />
        <Belt y={HZ - 26} f={lf} x0={-160} x1={W + 160} z={26} speed={3.6} />
        {[214, 506, 798].map((x, i) => (
          <div key={i} style={{ position: "absolute", left: Math.min(x, 506) - 4,
            width: Math.abs(x - 506) + 8, top: HZ - 26, height: 9, zIndex: 25,
            background: dkh(STEELD, 0.24), opacity: 0.7 }} />
        ))}
        {/* the belt forks, and each fork ends at a REAL provider */}
        {P.map(([file, name], i) => (
          <React.Fragment key={name}>
            <div style={{ position: "absolute", left: 214 + i * 292 - 4, top: HZ - 214,
              width: 9, height: 190, zIndex: 24, background: dkh(STEELD, 0.24), opacity: 0.6 }} />
            <ProviderTile x={214 + i * 292 - 75} y={HZ - 386} s={1.0} z={60}
              file={file} name={name} on={a[i]} />
          </React.Fragment>
        ))}
        {[0, 1, 2].map((i) => (
          <Ingot key={"g" + i} x={214 + i * 292 - 64 + Math.sin(lf / 9 + i) * 5}
            y={HZ - 74 - E(lf, 8 + i * 8, 24 + i * 8, 0, 24, OUT)} w={128} h={46} z={44}
            lit={0.7 + a[i] * 0.36} ref_={`REF:${["a91f", "b04c", "c3d2"][i]}`} />
        ))}
        {wrap > 0.02 && (
          <div style={{ position: "absolute", left: 214, top: 620, width: 584, zIndex: 70,
            opacity: wrap, transform: `translateY(${(1 - wrap) * 14}px)` }}>
            <div style={{ background: "#12161B", border: `4px solid ${dkh(STEELD, 0.34)}`,
              borderRadius: 6, padding: "18px 24px", boxShadow: SH_D, display: "flex",
              alignItems: "center", gap: 12, position: "relative", overflow: "hidden" }}>
              <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 23, color: LIME }}>$</span>
              <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 25, color: "#E2E8EE",
                whiteSpace: "pre" }}>{"headroom wrap claude".slice(0, typed)}
                <span style={{ opacity: Math.sin(lf / 3) > 0 ? 1 : 0.15 }}>▌</span></span>
              <Sheen f={lf} w={584} h={78} o={0.10} period={66} />
            </div>
          </div>
        )}
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S10 · f480..513 (33f) — "…so you never have to worry about…"
   ⛔ THE ONLY DELIBERATE SET RETURN IN THE REEL: this is S0-C's belt head with
      the alarm OFF and every item on the line now an ingot. Same place, new
      state, new light. Flagged so it is not "fixed" by redressing.
   ====================================================================== */
export const S10: React.FC = () => {
  const lf = useCurrentFrame();
  const p = usePlace("belt");
  const HZ = p.horizon;                                   /* 570 */
  return (
    <Scene p={p} slug="THE QUEUE CLEARS" push={[0, 32, 1.04]} vig={0.48} slugC="#8FA6B6">
      <Hall p={p} f={lf} lightX={0.58} floorLines={5} live />
      <Spot x={640} y={-40} on={breathe(lf, 0, 0.05)} c="#CFE2EE" f={lf} len={430}
        spread={400} z={22} />
      <Belt y={HZ - 40} f={lf} x0={-260} x1={W + 260} z={26} speed={4.6} />
      {Array.from({ length: 9 }, (_, i) => {
        const k = i / 8;
        const w = 158 - k * 106, h = 58 - k * 34;
        const x = (-140 + i * 128 + k * k * 80) + E(lf, 0, 33, 0, 150, LIN);
        return <Ingot key={i} x={x} y={HZ - 40 - h} w={w} h={h} z={44 - i}
          lit={1.02 - k * 0.5}
          ref_={`REF:${["a91f","a920","b04c","b117","c3d2","c4e8","d55a","d61b","e77f"][i]}`} seed={i * 2} f={lf} />;
      })}
      {/* ⭐ GAG: rubber-duck debugging, riding the belt with everything else. */}
      <Duck x={((lf * 5 + 120) % 900) - 40} y={HZ - 92} s={1.25} z={50} f={lf} />
      <DoorWay x={806} y={HZ - 214} w={214} h={214} z={30} mark={1} />
      <Crew lf={lf} x={210} ground={HZ + 104} size={210} z={70} gaze={0.4} cheer={0.4}
        seed={2} markS={80} fit="dock" />
      <SheetEdge side="r" c={SHEETD} w={60} z={90} />
    </Scene>
  );
};

/* =========================================================================
   S11 · f513..584 (71f) — "…hitting your usage limits ever again." TWO SHOTS.
   ⛔ MOVE 3 OF 3: a slow TILT UP the column, motivated by following the fill.
   ⛔ NO NUMBER ON THE COLUMN. The repo publishes no usage-limit figure, so this
      is a STATE, never a claim. The red line does not move; your distance does.
   ====================================================================== */
export const S11: React.FC = () => {
  const lf = useCurrentFrame();
  const p = usePlace("col");
  const HZ = p.horizon;                                   /* 610 */
  /* ⛔ ROUND 3: v2 tilted, then CUT to a wide at f42. It is now one continuous
     move — the tilt up the column eases into a pull-back that reveals the belt
     still running under it, all in one shot. */
  const tilt = E(lf, 2, 40, 96, -46, IO);
  const sc = 1.14 - E(lf, 34, 68, 0, 0.22, IO);
  const fill = E(lf, 6, 42, 0.845, 0.235, IO);
  const alarm = E(lf, 6, 28, 1, 0, LIN);
  return (
    <Scene p={p} slug="THE CEILING DID NOT MOVE" push={[0, 1, 1]} vig={0.50} slugC="#8FB79A">
      <Cam y={tilt} s={sc} z={2}>
        <Hall p={p} f={lf} lightX={0.36} floorLines={5} live bleed={300} />
        <Belt y={HZ - 26} f={lf} x0={-260} x1={W + 260} z={26} speed={4.0} />
        <div style={{ position: "absolute", left: 380, top: 60, width: 500, height: 480,
          borderRadius: "50%", background: hexa(AMBER, 0.16 * alarm), zIndex: 5 }} />
        <Column x={556} y={116} w={98} h={498} fill={fill} line={0.86} alarm={alarm} z={40} />
        <Sticky x={662} y={214} t="WE DO NOT TALK ABOUT THE RED LINE" s={0.94} z={66} rot={5} />
        <DoorWay x={158} y={HZ - 250} w={252} h={250} z={30} mark={1} />
        {[0, 1, 2, 3].map((i) => (
          <Ingot key={i} x={-60 + ((lf * 9 + i * 200) % 780)} y={HZ - 88} w={148} h={54}
            z={44} lit={0.98} ref_={`REF:${["c3d2", "c4e8", "d55a", "e77f"][i]}`} seed={i * 3} f={lf} />
        ))}
        {/* ⛔ ROUND 9: this is the reel's LONGEST scene (2.37s) and had one
            sprite and a draining bar. It now has a working crew of two and a
            live headroom readout counting up as the level falls, so there is
            always a second thing happening. */}
        <Crew lf={lf} x={806} ground={HZ + 110} size={200} z={66} cheer={1} seed={16}
          markS={78} fit="boss" />
        <Crew lf={lf} x={276} ground={HZ + 96} size={158} z={64} gaze={-0.8} seed={23}
          markS={0} fit="dock" flip />
        {/* ⛔ NO MULTIPLIER HERE. v13 counted up to "3.1x", which is PARITOK's
            published figure, not headroom's — headroom publishes no turns-per-
            window number at all. The scene states the STATE, not an invented
            claim (board: THE HONESTY LINE). */}
        <div style={{ position: "absolute", left: 682, top: 196, zIndex: 66,
          padding: "10px 16px", background: dkh(GREEN, 0.08),
          border: `4px solid ${mxh(GREEN, 0.14)}`, borderRadius: 6, boxShadow: SH_D,
          opacity: E(lf, 22, 34, 0, 1, OUT) }}>
          <div style={{ fontFamily: MONO, fontWeight: 900, fontSize: 21,
            lineHeight: 1.2, color: mxh(GREEN, 0.62) }}>ROOM<br />TO WORK</div>
        </div>
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S12 · f584..634 (50f) — the CTA. "Comment COMPRESS and I'll send you…"
   ⛔ The card gets its OWN column with nothing crossing it (reel 82 shipped a
      seal with a shadow across it and the ship gate passed it happily).
   ⛔ HARD CUT ON THE KEYWORD — nothing after "immediately."
   ====================================================================== */
export const S12Cta: React.FC = () => {
  const lf = useCurrentFrame();
  const p = usePlace("press");
  const HZ = p.horizon;                                   /* 600 */
  const card = E(lf, 0, 10, 0, 1, BACK);
  const kw = E(lf, 10, 17, 0, 1, OUT);                    /* "COMPRESS" at 19.98 */
  return (
    <Scene p={p} slug="COMMENT COMPRESS" push={[0, 50, 1.04]} vig={0.50} slugC="#A0846C">
      <Hall p={p} f={lf} lightX={0.5} floorLines={4} live />
      <Spot x={200} y={-30} on={0.7 * breathe(lf, 0, 0.06)} c={p.key} f={lf} len={420}
        spread={360} z={22} />
      <Spot x={820} y={-30} on={0.7 * breathe(lf, 2, 0.06)} c={p.key} f={lf} len={420}
        spread={360} z={22} />
      <Belt y={HZ - 30} f={lf} x0={-60} x1={W + 60} z={20} speed={3.0} />
      <Press x={-170} y={HZ - 392} w={520} h={362} z={24} wake={1} heads={[1, 1, 1]}
        iris={0.9} labels={false} f={lf} ram={0.35 + Math.sin(lf / 11) * 0.2} />
      <ProviderTile x={828} y={196} s={0.86} z={26} file="anthropic.svg" name="ANTHROPIC" on={0.75} />
      {[0, 1].map((i) => (
        <Ingot key={i} x={-30 + ((lf * 7 + i * 210) % 300)} y={HZ - 84} w={132} h={48}
          z={26} lit={0.8} ref_="REF:a91f" seed={i * 7} f={lf} />
      ))}
      {/* ⛔ THE CARD'S COLUMN: x 280..732. Nothing above is inside it. */}
      <CtaCard x={196} y={158} z={80} s={1.28} on={card} kw={kw} />
      <AgentRack x={228} y={604} s={0.68} z={72} f={lf} label="WORKS WITH"
        on={[0, 1, 2, 3].map((i) => E(lf, 14 + i * 3, 22 + i * 3, 0, 1, BACK))} />
      <Crew lf={lf} x={906} ground={HZ + 116} size={196} z={70} cheer={1} seed={3}
        markS={0} fit="host" />
      <Crew lf={lf} x={104} ground={HZ + 100} size={150} z={68} cheer={0.8} seed={27}
        markS={0} fit="dock" flip />
    </Scene>
  );
};
