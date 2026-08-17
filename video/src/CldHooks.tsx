import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { inter, fraunces } from "./fonts";
import { MONO, Mascot, Bg, HookHeader } from "./SlopKit";
import { SetFor } from "./CldSets";
import {
  W, H, E, OUT, IO, BACK, LIN, hexa, SH, SH_D, rnd, dkh, mxh,
  CLAY, GOLD, GREEN, SKY, INK,
  Scene, Mark, MarkCast, Contact, asPlace,
  DeskTop, DeskFront, Tray, WorkCard, RepoCard, Flap, Cartridge, SubTile, CourseCard, EssayPlate,
  CourseDeck, TileBlock, NameChip,
  Ring, Puff, rock, shake, drift, squash, idle,
  R1, R2, R3, COURSES, ROLES,
} from "./CldWorld";

/* ===========================================================================
   REEL 107 "CLAUDE" · HOOK VARIANTS.  Board: storyboards/107-claude.md.

   ⛔⛔ THESE ARE `docs/THE-OPEN.md` STEP 1 — three concepts for scene 0, to be
      judged as STILLS and one picked BEFORE the body is authored. A solo hook
      comp has NO VO, NO bed and NO real caption track BY CONSTRUCTION
      ([[feedback_label_preview_artifacts]]), so judge composition, hierarchy
      and the EVENT here — never audio or sync.

   ⛔ "3 to 5 concepts, each a genuinely different WORLD — not one world in five
      colourways. If you can describe them all with the same sentence, you have
      one concept." These are three different sentences:
        A  two identical desks, one loaded and one bare, and his tray fills
        B  the three things sit free on a counter and someone else takes them
        C  one card holding all three bursts apart and they fly to their places

   ⛔⛔ AND THREE CONCEPTS ARE ALREADY DEAD BEFORE THIS FILE: a STAIRCASE, an
      HOURGLASS and a DOOR. `SklHooks.tsx` (reel 106 round 3) rejected exactly
      those by name as CORRECT MAPPINGS THE VIEWER HAS TO TRANSLATE, and
      [[feedback_real_marks_are_the_props]] has five lost builds behind it. Do
      not re-propose them. Everything below is the literal object.

   200 frames = 6.65s, the measured length of S0 (the TURN starts on "And" at
   6.65s in src/data/words_claude.json). Cuts at f71 (2.37s) and f127
   (4.24s), with the PICTURE LEADING each by 4 frames.
   ========================================================================= */

export const HEAD: [string, string] = ["3 FREE CLAUDE RESOURCES", "MOST PEOPLE NEVER OPEN"];

const CUT1 = 71, CUT2 = 127, END = 200;

/* the sprite always sits on a real contact shadow, WIDER than the sprite or it
   is invisible ([[reel-sprite-grounding-law]]) */
const Actor: React.FC<{ f: number; x: number; y: number; s?: number; z?: number;
  seed?: number; children?: never } & Record<string, any>> =
  ({ f, x, y, s = 210, z = 60, seed = 0, ...m }) => {
  const id = idle(f, seed, 1.9);   /* ⭐ 2.6deg/4.6px — below that it READS static */
  return (<>
    <Contact x={x - s * 0.30} y={y + s * 0.40} w={s * 0.86} z={z - 1} o={0.40} />
    <div style={{ position: "absolute", left: x - s / 2, top: y - s * 0.62 + id.dy, zIndex: z,
      transform: `rotate(${id.rot}deg)` }}>
      <Mascot lf={f} size={s} {...m} />
    </div>
  </>);
};

/* ===========================================================================
   HOOK A — THE TWO DESKS.  The board's concept.

   ⭐ Two IDENTICAL desks is what makes the comparison honest: the same object
      drawn twice, which is the reel-99 4-token-vs-800M-token-pile trick — a
      comparison PROVED, not asserted. Nothing on screen stands for anything.
   ⭐ FRAME 0 IS THE WHOLE CLAIM, SETTLED (the reel-99 v5 law). Both desks are
      already there, the far one already loaded, ours already bare. The event
      pushes PAST the claim rather than arriving at it.
   ======================================================================== */
export const HookA: React.FC = () => {
  const f = useCurrentFrame();

  /* ---- SHOT 1 · the two desks, locked wide ---- */
  if (f < CUT1) {
    const lf = f;
    /* his three finished cards eject, arc and land. Ours never does. */
    const EJ = [18, 36, 54];
    const sk = shake(lf, 22, 3);
    /* ⛔ vig 0.28, not the house 0.58. The vignette is a big dark multiply over
       the whole panel, so on a frame that must clear luma 140 it is the cheapest
       HONEST place to give ground — far better than lifting the palette's dark
       stop, which is the §8 move that cost ten reels their black point. The dark
       floor still carries p10 into the 40s. */
    return (
      <Scene p={asPlace("workhook")} slug="YOUR DESK vs THEIRS" push={[0, CUT1, 1.04]} vig={0.28}>
        <div style={{ position: "absolute", inset: 0, transform: `translate(${sk.x}px,${sk.y}px)` }}>
          <SetFor k="workhook" f={lf} lightK={1} />
          {/* ⛔ NO in-panel Mark in the hook shots. v1 ran MarkCast at o=0.15 on
              a dark wall (an unreadable brown smear), v2 put a white Mark plate
              at top-left — directly under the HookHeader's own 124px Claude
              badge, stacking two cream plates and two marks in one corner. The
              HEADER is the frame-0 audience filter; every body scene carries its
              own MarkCast on the set. */}

          {/* ⭐ THE CLAIM PLATE — 800x190 = 19% of the panel, top edge y130.
              `look_audit` HOOK_PLATE wants >=18% with its top below y120. It is
              also the only measured IG-performance rule in the repo (reel 94: the
              two cuts that performed opened with one, the four that did not had
              none), and it is what carries frame-0 luma HONESTLY — a big bright
              OBJECT, not a lifted shadow. */}
          <div style={{ position: "absolute", left: 62, top: 130, width: 916, zIndex: 80,
            borderRadius: 18, overflow: "hidden", background: "#F5F0E3",
            border: `6px solid ${dkh("#F5F0E3", 0.2)}`, boxShadow: SH_D,
            transform: `scale(${squash(lf, 2, 0.05)})`, transformOrigin: "50% 0%" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 16, padding: "16px 26px 6px" }}>
              <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 54,
                letterSpacing: "-0.02em", color: "#1E1A14" }}>3 FREE</span>
              <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 30,
                color: "#7A6B58" }}>CLAUDE RESOURCES</span>
              <span style={{ marginLeft: "auto", fontFamily: MONO, fontWeight: 900, fontSize: 26,
                letterSpacing: "0.12em", color: "#F6F2E8", background: "#3F6B4E",
                padding: "8px 15px", borderRadius: 8 }}>$0</span>
            </div>
            <div style={{ display: "flex", gap: 0, borderTop: `4px solid ${dkh("#F5F0E3", 0.12)}` }}>
              {[["ANTHROPIC ACADEMY", "22 COURSES"],
                ["anthropics/skills", "★169,585"],
                ["awesome-…-subagents", "★24,350 · 100+"]].map((r, i) => (
                <div key={"cp" + i} style={{ flex: 1, padding: "12px 16px",
                  borderLeft: i ? `4px solid ${dkh("#F5F0E3", 0.12)}` : undefined }}>
                  <div style={{ fontFamily: MONO, fontWeight: 800, fontSize: 17,
                    color: "#7A6B58", whiteSpace: "nowrap", overflow: "hidden",
                    textOverflow: "ellipsis" }}>{r[0]}</div>
                  <div style={{ fontFamily: MONO, fontWeight: 900, fontSize: 24, marginTop: 4,
                    color: "#241F17" }}>{r[1]}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ---------- OUR DESK (near, left): bare, and the tray stays empty --- */}
          <DeskTop x={30} y={540} w={430} lit={0.66} z={40} />
          <Actor f={lf} x={148} y={560} s={252} z={50} seed={1}
            gaze={E(lf, 18, 26, 0, 0.7, OUT) - E(lf, 44, 54, 0, 0.5, IO)} />
          {/* ⭐ THE EMPTY TRAY — the hook in one prop, same object and same scale
              as theirs, which is what makes the comparison PROVED not asserted. */}
          <Tray x={236} y={556} n={0} z={56} lit={0.6} f={lf} />
          <DeskFront x={30} y={582} w={430} lit={0.66} z={60} />
          <div style={{ position: "absolute", left: 236, top: 596, width: 214, textAlign: "center",
            zIndex: 62, fontFamily: MONO, fontWeight: 900, fontSize: 19, letterSpacing: "0.18em",
            color: "#EFE0BE" }}>EMPTY</div>

          {/* ---------- THEIR DESK (far, right): loaded, and filling ----------- */}
          {/* ⭐ THE LOADED-vs-BARE CONTRAST IS THE HOOK'S WHOLE ARGUMENT, and in
              v2 the only difference between the two desks was a laptop. The 22
              real course cards go back on the wall above theirs: it is the thing
              they HAVE, it is countable, and 22 cream tiles is also honest
              frame-0 luma — a bright OBJECT, never a lifted shadow. */}
          <div style={{ position: "absolute", left: 610, top: 322, width: 372, height: 148, zIndex: 8,
            borderRadius: 9, background: hexa("#241708", 0.34),
            border: `4px solid ${hexa("#F0D3A6", 0.30)}`, boxShadow: SH_D }}>
            {Array.from({ length: 22 }, (_, i) => (
              <div key={"cc" + i} style={{ position: "absolute", left: 10 + (i % 8) * 45,
                top: 10 + Math.floor(i / 8) * 44, width: 39, height: 38, borderRadius: 4,
                background: "#F6F1E4", opacity: 0.78 + rnd(i, 3) * 0.22 }} />
            ))}
          </div>
          <DeskTop x={566} y={498} w={410} lit={1} z={40} />
          <Actor f={lf} x={886} y={518} s={236} z={50} seed={5} suit={1} gaze={-0.4} />
          <Tray x={594} y={514} n={3} z={56} lit={1} f={lf} landAt={EJ.map((a) => a + 14)} />
          {EJ.map((a, i) => (
            <WorkCard key={"ej" + i} f={lf} at={a} x0={790} y0={430} x1={600} y1={490 - i * 15} z={64} />
          ))}
          <DeskFront x={566} y={540} w={410} lit={1} z={60} h={120} />
          {/* their terminal, the thing the cards come out of */}
          <div style={{ position: "absolute", left: 588, top: 396, width: 190, height: 108, zIndex: 44,
            borderRadius: 8, background: "#0E1626", border: `6px solid ${dkh("#2A2620", 0.06)}`,
            boxShadow: SH_D }}>
            <div style={{ position: "absolute", left: 12, top: 12, right: 12, height: 7, borderRadius: 3,
              background: hexa("#8FE0EC", 0.75) }} />
            <div style={{ position: "absolute", left: 12, top: 30, width: 120, height: 7, borderRadius: 3,
              background: hexa("#8FE0EC", 0.5) }} />
            <div style={{ position: "absolute", left: 12, top: 48, width: 152, height: 7, borderRadius: 3,
              background: hexa(GOLD, 0.7) }} />
          </div>
        </div>
      </Scene>
    );
  }

  /* ---- SHOT 2 · tight on the loaded desk, the receipts at size ---- */
  if (f < CUT2) {
    const lf = f - CUT1;
    return (
      <Scene p={asPlace("work")} slug="WHAT THEY HAVE ON" push={[0, CUT2 - CUT1, 1.06]} vig={0.5}>
        <SetFor k="work" f={lf} lightK={1} />
        <RepoCard x={78} y={196} s={1.02} owner="anthropics" name="skills" tag={R2.tag} z={60} />
        {/* ⛔ the number MOVES to its value — never typeset at it */}
        <Flap x={122} y={392} v={"169,585"} f={lf} at={8} per={3} size={46} c="#F6F1E6" z={72} />
        <div style={{ position: "absolute", left: 122, top: 356, zIndex: 72, fontFamily: MONO,
          fontWeight: 800, fontSize: 18, letterSpacing: "0.2em", color: GOLD }}>★ STARS</div>
        {/* the essay plate SLAMS in from the right — title only, no quote */}
        <div style={{ position: "absolute", left: 0, top: 0, right: 0, bottom: 0, zIndex: 78,
          transform: `translateX(${(1 - E(lf, 30, 37, 0, 1, OUT)) * 620}px)` }}>
          <EssayPlate x={520} y={520} s={1.02} z={78} />
        </div>
        <Ring x={700} y={556} f={lf} at={37} r={190} c={GOLD} z={77} />
        <Actor f={lf} x={846} y={430} s={186} z={60} seed={5} suit={1} gaze={-0.5} />
      </Scene>
    );
  }

  /* ---- SHOT 3 · back to the wide, and the far stack DOUBLES ---- */
  const lf = f - CUT2;
  const STREAM = Array.from({ length: 8 }, (_, i) => 4 + i * 5);
  /* ⭐ the camera GIVES GROUND — the stack outgrows the frame */
  const pull = E(lf, 0, END - CUT2, 1.09, 1.0, LIN);
  const sink = E(lf, 6, 60, 0, 1, IO);
  return (
    <Scene p={asPlace("work")} slug="THE GAP IS THE EQUIPMENT" push={[0, 1, 1]} vig={0.56}>
      <div style={{ position: "absolute", inset: 0, transform: `scale(${pull})`,
        transformOrigin: "50% 56%" }}>
        <SetFor k="work" f={lf} lightK={1} />
        <MarkCast x={506} y={68} s={230} z={6} o={0.13} f={lf} spin={0.18} />

        <DeskTop x={30} y={540} w={430} lit={0.66} z={40} />
        {/* ⭐ HE SINKS AND HIS IDLE DAMPS — the 106 lesson: give the hook an arc
            made of things happening TO the character, not a layer on top. */}
        <div style={{ position: "absolute", inset: 0, zIndex: 50,
          transform: `translateY(${sink * 26}px) rotate(${sink * 6}deg)`,
          transformOrigin: "148px 560px" }}>
          <Actor f={lf} x={148} y={560} s={252} z={50} seed={1} gaze={0.8} />
        </div>
        <Tray x={236} y={556} n={0} z={56} lit={0.6} f={lf} />
        <DeskFront x={30} y={582} w={430} lit={0.66} z={60} />

        <DeskTop x={566} y={498} w={410} lit={1} z={40} />
        {/* the stream: eight large bright objects travelling across a dark
            ground — the `12 cards stacking -> 7.61` row of the measured table */}
        <Tray x={594} y={514} n={11} z={56} lit={1} f={lf}
          landAt={[-99, -99, -99, ...STREAM.map((a) => a + 12)]} />
        {STREAM.map((a, i) => (
          <WorkCard key={"st" + i} f={lf} at={a} x0={790} y0={430} x1={600} y1={490 - i * 15} z={64} />
        ))}
        <Actor f={lf} x={886} y={518} s={236} z={50} seed={5} suit={1} gaze={-0.4} />
        <DeskFront x={566} y={540} w={410} lit={1} z={60} h={120} />
      </div>
    </Scene>
  );
};

/* ===========================================================================
   HOOK B — THE FREE COUNTER.

   The three things are sitting out on a lit counter with a $0 card in front of
   them, and nothing is stopping anyone taking them. Another Claude scoops all
   three and walks. Ours walks past without looking up.
   ⭐ The joke and the mapping are the same fact: FREE means they are just
      there. Nothing has to be decoded.
   ======================================================================== */
export const HookB: React.FC = () => {
  const f = useCurrentFrame();

  /* ---- SHOT 1 · the three things sit out, and somebody takes them --------
     ⭐ FOUR DISTINCT EVENTS, ONE MOVER AT A TIME ([[reel-motion-hierarchy]]:
     "the answer is neither many at once nor one forever. It is ONE AT A TIME,
     BUT THE ONE KEEPS CHANGING"). v1 was a static tableau with a text plate on
     it, which is the "not interesting enough" note. */
  if (f < CUT1) {
    const lf = f;
    const TAKE = [14, 32, 50];                 /* one object leaves, then the next */
    const lift = (at: number) => E(lf, at, at + 16, 0, 1, OUT);
    const gone = (at: number) => lf > at + 16;
    return (
      <Scene p={asPlace("counter")} slug="NOBODY IS GUARDING THESE" push={[0, CUT1, 1.035]} vig={0.34}>
        <SetFor k="counter" f={lf} lightK={1} />


        {/* ---- item 1 · the DECK. 22 cards you can count: the quantity is the
             picture, so no numeral has to say "22". ---- */}
        {!gone(TAKE[0]) && (
          <div style={{ position: "absolute", inset: 0, zIndex: 56,
            transform: `translate(${lift(TAKE[0]) * 520}px, ${-lift(TAKE[0]) * 300}px) rotate(${lift(TAKE[0]) * 16}deg)`,
            opacity: 1 - E(lf, TAKE[0] + 10, TAKE[0] + 16, 0, 1, LIN) }}>
            <CourseDeck x={248} y={546} n={22} s={1.3} z={56} lit={1} f={lf} />
            <NameChip x={120} y={648} t="ANTHROPIC ACADEMY" s={1} z={70} />
          </div>
        )}

        {/* ---- item 2 · the CARTRIDGE, drawn as one svg with real paths ---- */}
        {!gone(TAKE[1]) && (
          <div style={{ position: "absolute", inset: 0, zIndex: 57,
            transform: `translate(${lift(TAKE[1]) * 380}px, ${-lift(TAKE[1]) * 300}px) rotate(${lift(TAKE[1]) * -13}deg)`,
            opacity: 1 - E(lf, TAKE[1] + 10, TAKE[1] + 16, 0, 1, LIN) }}>
            <Cartridge x={430} y={330} s={0.94} z={57} lit={1}>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: 10 }}>
                <svg width={54} height={54} viewBox="0 0 16 16">
                  <path fill="#241F17" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
                    0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01
                    1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95
                    0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27
                    2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82
                    2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0
                    .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
                </svg>
                {/* ⛔ ONE mark per object. The star COUNT is not typeset here —
                    it arrives graphically in shot 2. */}
                <div style={{ display: "flex", gap: 5 }}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <svg key={i} width={22} height={22} viewBox="0 0 24 24">
                      <path fill={GOLD} d="M12 2.4l2.9 5.9 6.5.95-4.7 4.6 1.1 6.45L12 17.25 6.2 20.3l1.1-6.45-4.7-4.6 6.5-.95z" />
                    </svg>
                  ))}
                </div>
              </div>
            </Cartridge>
            <NameChip x={452} y={648} t="anthropics/skills" s={1} z={70} />
          </div>
        )}

        {/* ---- item 3 · the BLOCK of subagents, one countable mass ---- */}
        {!gone(TAKE[2]) && (
          <div style={{ position: "absolute", inset: 0, zIndex: 58,
            transform: `translate(${lift(TAKE[2]) * 190}px, ${-lift(TAKE[2]) * 300}px) rotate(${lift(TAKE[2]) * 11}deg)`,
            opacity: 1 - E(lf, TAKE[2] + 10, TAKE[2] + 16, 0, 1, LIN) }}>
            <TileBlock x={742} y={358} cols={5} rows={4} s={1.02} z={58} lit={1} />
            <NameChip x={742} y={648} t="…code-subagents" s={1} z={70} />
          </div>
        )}

        {/* ⭐ AND YOU WALK PAST. Our hero crosses the DARK foreground, never
            looking up — he is the only thing moving that is not the event, and
            he is dim, so he never competes with the lit band. */}
        <div style={{ position: "absolute", inset: 0, zIndex: 62,
          transform: `translateX(${E(lf, 0, CUT1, 0, 300, LIN)}px)` }}>
          <Actor f={lf} x={128} y={426} s={230} z={20} seed={2} gaze={-0.15} />
        </div>
      </Scene>
    );
  }

  /* ---- SHOT 2 · you get there and the pool is EMPTY --------------------- */
  if (f < CUT2) {
    const lf = f - CUT1;
    const look = E(lf, 8, 20, 0, 1, OUT);
    return (
      <Scene p={asPlace("counter")} slug="AND YOU GOT THERE LATE" push={[0, CUT2 - CUT1, 1.05]} vig={0.36}>
        <SetFor k="counter" f={lf} lightK={0.92} />
        {/* three empty outlines in the light, where they were. ⛔ This is the
            whole beat and it is drawn, not written. */}
        {[[150, 300], [396, 262], [690, 228]].map((pt, i) => (
          <div key={"gh" + i} style={{ position: "absolute", left: pt[0], top: pt[1],
            width: [270, 216, 236][i], height: [160, 168, 200][i], zIndex: 44,
            borderRadius: 12, border: `5px dashed ${hexa("#C9A86A", 0.34 + look * 0.24)}`,
            opacity: E(lf, 2 + i * 5, 12 + i * 5, 0, 1, OUT) }} />
        ))}
        {/* he leans in over the counter and finds nothing */}
        <div style={{ position: "absolute", inset: 0, zIndex: 60,
          transform: `translateY(${look * -26}px) rotate(${look * -5}deg)`,
          transformOrigin: "300px 640px" }}>
          <Actor f={lf} x={300} y={648} s={236} z={60} seed={2} shock={look * 0.85} gaze={0.5} />
        </div>
      </Scene>
    );
  }

  /* ---- SHOT 3 · the gap, as a physical height ---------------------------
     ⛔ NO ESSAY TEXT PLATE HERE. v1 slid a title card in on this beat, which is
     the "animations should not be text" note. The claim is DRAWN: his stack
     grows past the top of frame while ours is a bare lit circle. The Amodei
     receipt moves to the reel's body, where a chip can sit in a dead band. */
  const lf = f - CUT2;
  const STACK = Array.from({ length: 9 }, (_, i) => 4 + i * 6);
  return (
    <Scene p={asPlace("counter")} slug="THE GAP IS WHAT THEY PICKED UP" push={[0, END - CUT2, 1.05]} vig={0.40}>
      <SetFor k="counter" f={lf} lightK={0.86} />
      {/* ⭐ THE ESCALATION: his stack keeps growing across the whole shot, so
          the last second is visibly the most extreme (the diagnostic in
          [[reel-motion-hierarchy]]: if 20% and 80% look the same, it feels long). */}
      {STACK.map((at, i) => {
        const k = E(lf, at, at + 12, 0, 1, OUT);
        if (k <= 0) return null;
        return (
          <div key={"sk" + i} style={{ position: "absolute", left: 700 + (rnd(i, 5) - 0.5) * 26,
            top: 400 - i * 44 - (1 - k) * 220, width: 226, height: 40, zIndex: 40 + i,
            borderRadius: 8, background: mxh("#EDE6D6", 0.04),
            border: `3px solid ${dkh("#EDE6D6", 0.28)}`,
            transform: `rotate(${(rnd(i, 9) - 0.5) * 5}deg) scaleY(${squash(lf, at + 12, 0.24)})`,
            opacity: k, boxShadow: SH }} />
        );
      })}
      <Actor f={lf} x={892} y={430} s={240} z={20} seed={5} suit={1} gaze={-0.5} cheer={0.4} />
      {/* ours: alone in the empty pool, and he SINKS as it grows */}
      <div style={{ position: "absolute", inset: 0, zIndex: 60,
        transform: `translateY(${E(lf, 6, 62, 0, 24, IO)}px) rotate(${E(lf, 6, 62, 0, 5, IO)}deg)`,
        transformOrigin: "228px 660px" }}>
        <Actor f={lf} x={228} y={660} s={214} z={60} seed={2} gaze={0.85} />
      </div>
    </Scene>
  );
};

/* ===========================================================================
   HOOK C — THE CARD THAT BURSTS.

   ⭐ THE PROVEN SHAPE, from [[feedback_real_marks_are_the_props]] (reel 99 v5,
      the version that finally shipped after four rejections):
      *"For any repo/tool/product reel, the most obvious object available is the
      thing itself, rendered as one card... That single object is the whole
      sentence the VO is speaking."* and *"it doubles as the pattern interrupt.
      It sits settled and complete at f0, and at f10 it BURSTS."*
      Frame-0 luma on that build measured 183.5 and the first-scene motion
      floor went 1.83 -> 3.48.
   ======================================================================== */
export const HookC: React.FC = () => {
  const f = useCurrentFrame();

  if (f < CUT1) {
    const lf = f;
    const burst = E(lf, 12, 30, 0, 1, OUT);
    const sk = shake(lf, 12, 9);
    const flash = lf >= 12 && lf <= 14 ? 0.30 : 0;
    /* the three fly out to their places and the hero ducks under them */
    /* ⛔ the header occupies panel y < ~110 (it is authored in FRAME coords at
       top 322 and the panel starts at 384), so no burst destination may go above
       y 140 or it lands under the pill. v1 sent two of the three there. */
    const P = [{ dx: -278, dy: 6, r: -15 }, { dx: 10, dy: -104, r: 4 }, { dx: 296, dy: 20, r: 13 }];
    return (
      <Scene p={asPlace("stagehook")} slug="THREE. FREE. TODAY." push={[0, CUT1, 1.04]} vig={0.26}>
        <div style={{ position: "absolute", inset: 0, transform: `translate(${sk.x}px,${sk.y}px)` }}>
          <SetFor k="stagehook" f={lf} lightK={1} />
          {/* ⭐ FRAME 0 IS ONE OBJECT, SETTLED AND COMPLETE — and it is the
              brightest thing in the panel, which is what carries the luma. */}
          <div style={{ position: "absolute", left: 196, top: 150, width: 620, zIndex: 60,
            borderRadius: 20, overflow: "hidden", background: "#F3EEE1",
            border: `6px solid ${dkh("#F3EEE1", 0.22)}`, boxShadow: SH_D,
            opacity: 1 - burst, transform: `scale(${1 + burst * 0.5})` }}>
            <div style={{ padding: "20px 26px 8px", display: "flex", alignItems: "center", gap: 14 }}>
              <Mark x={0} y={0} s={0} plate={false} />
              <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 46,
                color: "#1E1A14", letterSpacing: "-0.02em" }}>3 FREE</span>
              <span style={{ marginLeft: "auto", fontFamily: MONO, fontWeight: 900, fontSize: 22,
                letterSpacing: "0.14em", color: "#F6F2E8", background: "#3F6B4E",
                padding: "7px 13px", borderRadius: 7 }}>$0</span>
            </div>
            {[[R1.name, `${R1.n} COURSES`], [R2.repo, `★${R2.stars}`],
              [`${R3.owner}/subagents`, `★${R3.stars} · ${R3.n}`]].map((row, i) => (
              <div key={"rw" + i} style={{ display: "flex", alignItems: "center",
                padding: "13px 26px", borderTop: `3px solid ${dkh("#F3EEE1", 0.12)}` }}>
                <span style={{ fontFamily: MONO, fontWeight: 800, fontSize: 25, color: "#2A241C" }}>{row[0]}</span>
                <span style={{ marginLeft: "auto", fontFamily: MONO, fontWeight: 900, fontSize: 25,
                  color: "#7A6B58" }}>{row[1]}</span>
              </div>
            ))}
          </div>
          {/* ...and it BURSTS into the three real cards */}
          {P.map((p, i) => (
            <div key={"bc" + i} style={{ position: "absolute", left: 300 + p.dx * burst,
              top: 268 + p.dy * burst, zIndex: 64, opacity: burst,
              transform: `rotate(${p.r * burst}deg) scale(${0.5 + burst * 0.5})` }}>
              <RepoCard x={0} y={0} s={0.56}
                owner={[undefined, "anthropics", "VoltAgent"][i]}
                name={["ANTHROPIC ACADEMY", "skills", "subagents"][i]}
                stars={[R1.n, R2.stars, R3.stars][i]}
                note={["COURSES · $0", undefined, R3.n][i]} z={64} />
            </div>
          ))}
          {flash > 0 && <div style={{ position: "absolute", inset: 0, zIndex: 88,
            background: hexa("#F6E9C8", flash) }} />}
          <Ring x={506} y={330} f={lf} at={12} r={420} c={GOLD} z={70} dur={26} />
          <Puff x={506} y={360} f={lf} at={12} n={12} s={1.7} z={68} />
          {/* he DUCKS as they go over him */}
          <div style={{ position: "absolute", inset: 0, zIndex: 66,
            transform: `translateY(${E(lf, 12, 20, 0, 40, OUT) - E(lf, 34, 50, 0, 40, IO)}px)` }}>
            <Actor f={lf} x={506} y={640} s={198} z={66} seed={2} shock={burst * 0.8} />
          </div>
        </div>
      </Scene>
    );
  }

  if (f < CUT2) {
    const lf = f - CUT1;
    return (
      <Scene p={asPlace("work")} slug="169,585 STARS. OFFICIAL." push={[0, CUT2 - CUT1, 1.06]} vig={0.48}>
        <SetFor k="work" f={lf} lightK={1} />
        <RepoCard x={86} y={192} s={1.04} owner="anthropics" name="skills" tag={R2.tag} z={60} />
        <Flap x={130} y={388} v={"169,585"} f={lf} at={8} per={3} size={46} z={72} />
        <div style={{ position: "absolute", left: 0, top: 0, right: 0, bottom: 0, zIndex: 78,
          transform: `translateX(${(1 - E(lf, 30, 37, 0, 1, OUT)) * 620}px)` }}>
          <EssayPlate x={520} y={520} s={1.02} z={78} />
        </div>
        <Ring x={700} y={556} f={lf} at={37} r={190} c={GOLD} z={77} />
        <Actor f={lf} x={848} y={426} s={186} z={60} seed={2} gaze={-0.5} />
      </Scene>
    );
  }

  /* the three, now docked around a working desk, and the count keeps climbing */
  const lf = f - CUT2;
  const STREAM = Array.from({ length: 8 }, (_, i) => 4 + i * 5);
  return (
    <Scene p={asPlace("worktop")} slug="THIS IS WHAT THEY RUN" push={[0, END - CUT2, 1.08]} vig={0.54}>
      <SetFor k="worktop" f={lf} lightK={1} />
      <MarkCast x={506} y={58} s={224} z={6} o={0.13} f={lf} spin={0.18} />
      <DeskTop x={250} y={498} w={470} lit={1} z={40} />
      <Actor f={lf} x={686} y={518} s={236} z={50} seed={5} suit={1} gaze={-0.4} />
      <Tray x={286} y={514} n={8} z={56} lit={1} f={lf} landAt={STREAM.map((a) => a + 12)} />
      {STREAM.map((a, i) => (
        <WorkCard key={"s3" + i} f={lf} at={a} x0={470} y0={412} x1={292} y1={490 - i * 15} z={64} />
      ))}
      <DeskFront x={250} y={540} w={470} lit={1} z={60} h={120} />
    </Scene>
  );
};

/* ---- the preview shells: Bg + Scene + the frame-coord header ---------------
   ⛔ HookHeader is authored in 1080x1920 FRAME coords. Rendered as a CHILD of
      Scene it resolves against the 1012x792 PANEL instead and lands across the
      middle of the hero (ANIMATION-QUALITY §6.3). It is a SIBLING, always. */
const Shell: React.FC<{ C: React.FC }> = ({ C }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Bg />
      <C />
      {/* ⛔⛔ THE HEADER IS ON THE WHOLE TIME, AND SETTLED AT FRAME 0.
          Alex: *"the header needs to be there the whole time"*. Two separate
          causes were behind that note:
          1. `SectionHeader` fades and scales in over `fr(0.34)` = 10 frames, so
             at frame 0 its opacity is literally 0 — every hook still I rendered
             for review had NO header in it, on the one frame THE-OPEN says is
             guaranteed to be seen.
          2. Past reels drop the hook header after S0 and switch to per-scene
             slugs, so it is not "there the whole time" in the assembly either.
          Fix for (1) is here — hold it settled by offsetting its own clock past
          the settle window. Fix for (2) is in the assembly: ROOT renders this
          for all 1052 frames, never per-scene. */}
      <HookHeader big={HEAD[0]} hot={HEAD[1]} f={f + 12} />
    </AbsoluteFill>
  );
};

export const PrevA: React.FC = () => <Shell C={HookA} />;
export const PrevB: React.FC = () => <Shell C={HookB} />;
export const PrevC: React.FC = () => <Shell C={HookC} />;
