import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { inter, fraunces } from "./fonts";
import { MONO, Mascot, Bg, HookHeader, ProgressBar } from "./SlopKit";
import { SetFor, PAL } from "./SklSets";
import { Vol, VolStack, OpenVol, Sheets, Sticky, Mug, Pot, Bubble } from "./SklProps";
import type { SetKey } from "./SklSets";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, SH, SH_D, rnd, dkh, mxh,
  CLAY, GOLD, GREEN, RED, SKY, PAPER, INK, MUTE,
  Scene, Cam, Mark, Contact, Edge, Motes, Beam, PLACES,
  BookTower, PromptCard, Room, Lamp, Chair, Pinboard, ClaimPlate, GreyBook, Ring,
  rock, shake, drift, squash,
} from "./SklWorld";

/* ===========================================================================
   REEL 106 "SKILL" · THREE HOOK CONCEPTS, for the variants round.

   docs/THE-OPEN.md step 1: *"The first build step of any reel is not scene 0.
   It is N concepts for scene 0."* Reel 78 skipped this, built a complete Mad
   Max open, and had the whole scene thrown out on THEME — not on craft. The
   cost of a wrong theme is the whole reel; the cost of three stills is an
   afternoon.

   ⛔ THESE ARE PREVIEW ARTIFACTS ([[feedback_label_preview_artifacts]]): a solo
      hook comp has NO VO, NO bed and NO real caption track BY CONSTRUCTION.
      Judge composition, hierarchy and the event only.

   The three are deliberately different THEORIES of the open, not one world in
   three colourways:

     A · THE COLLAPSING STACK — open on the CLAIM.     one object, empty stage
     B · THE EMPTY CHAIR      — open on the ENEMY.     recognition, no setup
     C · THE SEAT TAKEN       — open on the MECHANISM. character, instant event

   All three carry the same VO, the same header and the same claim plate, so
   the only variable is the picture.
   ========================================================================= */

/* ⛔ THE HEADER STATES THE CLAIM, in the words the reel actually turns on
   ([[feedback_headers_state_the_claim]]). Reel 105 shipped three rounds with a
   header that contained neither of its own two key words. On a muted feed this
   is the only line that gets read, and "4 HOURS" / "6 MONTHS" is the hook. The
   Claude mark on the header badge carries the audience filter, so the header
   itself does not have to spend words on it. */
/* ⭐ Alex's wording, 2026-08-15. It is also the stronger line by the house rule,
   because it carries BOTH filters at once: the product noun (CLAUDE) and the
   number the reel turns on (4 HOURS). The previous cut named neither Claude nor
   the mechanism. Split 15/22 chars so HookHeader's auto-fit keeps it at 56px. */
export const HEAD: [string, string] = ["LEARN ANY SKILL", "WITH CLAUDE IN 4 HOURS"];

/* The hook's own words, at the house 4-frame picture lead. Measured onsets from
   src/words_106skill.json:
     Claude 0.00 · hidden 0.33 · replace 1.02 · platform 1.68 · master 2.64 ·
     skill 3.14 · "4" 3.48 · hours 3.64 · "6" 4.49 · months 4.70            */
export const HK = {
  hidden: Math.round(0.33 * 30) - 4,     /* f6  */
  replace: Math.round(1.02 * 30) - 4,    /* f27 */
  platform: Math.round(1.68 * 30) - 4,   /* f46 */
  master: Math.round(2.64 * 30) - 4,     /* f75 */
  fourH: Math.round(3.48 * 30) - 4,      /* f100 */
  sixM: Math.round(4.49 * 30) - 4,       /* f131 */
} as const;

/* ─────────────────────────────────────────────────────────────────────────
   A · THE COLLAPSING STACK  — open on the CLAIM.

   [[feedback_hook_simplicity]]: ONE dominant object, empty stage; striking =
   SCALE + real colour. And reel 105 round 3's diagnosis, which cost three
   rejections: the hook failed for NESTING DEPTH — a browser containing a page
   containing a plate containing tiles, so the biggest, highest-contrast thing
   on screen was CHROME. Here the ground plane carries the objects directly.

   THE EVENT (ANIMATION-QUALITY §2 — before / trigger / travel / arrival):
     before  · a 560px tower of six volumes stands beside one small card
     trigger · "4 hours" — the card floods to clay and rises
     travel  · "6 months" — six volumes concertina DOWN, upper ones lagging
     arrival · the stack lands at exactly the card's height, dust, ring, rock
   ──────────────────────────────────────────────────────────────────────── */
export const HookA: React.FC = () => {
  const f = useCurrentFrame();
  const p = PLACES.stage;
  /* ⭐⭐⭐ FOUR FRAMINGS, NOT ONE — the defect Alex named on v7 and the one the
     board asked for and never got. The storyboard specifies a HARD CUT at f78
     to a low 3/4 "the tower now fills frame, oppressive"; the built hook was a
     single `push={[0,162,1.17]}` from f0 to f162, i.e. ONE locked setup with a
     slow 17% zoom, for 5.4s. Measured consequence: HOOK 6.36 motion against a
     body median of 10.76 — the weakest scene in the reel, clearing the STATIC
     floor (6.0) by 0.36, in the five seconds that decide retention.

     ⛔ EVERY CUT LANDS ON CONTENT, none of them is metric-bait:
       A f0..37   the approved wide — the claim, both objects, the ratio
       B f38..74  low on the tower base, cropping it — fires ON the lurch
       C f75..99  the shear plane: upper volumes + the sheet stream, "master"
       D f100..162 back wide for "4 hours" rise -> "6 months" collapse
     ⛔ SHOT A IS EXACTLY IDENTITY (s=1, d=0) so FRAME 0 IS BYTE-FOR-BYTE THE
     APPROVED POSTER. Both of this hook's gates — THE-OPEN law 1 (luma >= 140)
     and HOOK_PLATE (contiguous cream >= 18%) — are frame-0-only, and the last
     rebuild broke the poster while both still passed. Nothing here touches f0. */
  const SHOTS = [
    { at: 0, s: 1.00, fx: 506, fy: 396 },
    { at: 38, s: 1.65, fx: 350, fy: 505 },
    { at: 75, s: 1.75, fx: 420, fy: 380 },
    { at: 100, s: 1.00, fx: 506, fy: 396 },
  ];
  let sh = SHOTS[0];
  for (const s of SHOTS) if (f >= s.at) sh = s;
  /* translate(d) scale(s) about the panel centre puts `(fx,fy)` dead centre */
  const camX = -(sh.fx - W / 2) * sh.s;
  const camY = -(sh.fy - H / 2) * sh.s;

  /* ⭐⭐ THE EARLY EVENT, at f38 = 1.27s. The old hook's first real motion was
     the collapse at f131 — 4.49s into a 5.40s hook, i.e. 83% of the way
     through, with nothing but a linear shed ramp before it. The pile now
     SETTLES HARD a second in: 7% of the concertina in nine frames, a dust
     burst at the base and a camera kick. It is the same object doing the same
     physics as the payoff, so it telegraphs the collapse instead of spoiling
     it, and it gives the cut to shot B something to cut ON. */
  const slump = E(f, 38, 47, 0, 0.07, OUT);
  const lurch = E(f, 38, 52, 0, 1, OUT);
  const buckle = E(f, 119, HK.sixM, 0, 0.16, IO);
  /* the fall is scaled so slump + buckle + fall lands on exactly 1.00 */
  const k = slump + buckle + E(f, HK.sixM, HK.sixM + 18, 0, 0.77, OUT);
  /* the sway grows as the months bleed off — see BookTower's `strain` */
  const strain = E(f, 22, 119, 0, 1, LIN);
  const land = E(f, HK.sixM + 12, HK.sixM + 20, 0, 1, OUT);
  const cardUp = E(f, HK.fourH, HK.fourH + 10, 0, 1, BACK);
  const cardLit = E(f, HK.fourH, HK.fourH + 7, 0, 1, OUT);
  const kick = shake(f, HK.sixM + 14, 11, 9);
  /* the settle's own kick — smaller than the collapse's, so the payoff is
     still the biggest impact in the hook */
  const kick2 = shake(f, 38, 6, 8);
  /* ⭐ THE CARD TAKES THE SPACE THE STACK GIVES UP. Without this the
     post-collapse frame was 60% empty cream — the same "dull" fault as v1, just
     arriving five seconds later. ANIMATION-QUALITY §5: a scene must not arrive
     and then hold, and an EMPTIED frame is the worst version of holding. The
     card grows 32% and walks left into the vacated half, so the hook resolves
     ON its hero object rather than on a gap — and it is the literal claim,
     because the six months BECAME this one card. */
  const take = E(f, HK.sixM + 6, HK.sixM + 26, 0, 1, OUT);
  /* ⭐⭐ THE MONTHS BLEEDING OFF THE STACK — what fills the hold.
     Measured: the hook held a FLAT 3.8 for its first 43 samples, spiked to
     13.48 on the collapse, then died to 1.74. 4.3s of poster before anything
     happens is ANIMATION-QUALITY §2 in its purest form — *"it's just cuts and
     then nothing happens"* — and it is the note Alex gave.
     ⛔ WHY IT COULD NOT BE FIXED FROM BEHIND: the ClaimPlate is 900x556 = 62%
     of the panel, so a background band only ever paints the 15.6% margin around
     it. The motion has to happen INSIDE the plate, on the hero object.
     ⛔ AND WHY THE SHEETS ARE NOT CREAM: on a cream plate, cream is invisible —
     §1 measures "cream tiles on a white window" at ~0, the same nothing as the
     old 0.42-opacity ruled lines. These carry the SIX VOLUME COLOURS, so what
     comes off the stack is legibly the months themselves, countable by hue
     exactly as the tower is.
     ⛔ IT STARTS AT f22, NOT f0. Frame 0 must stay the settled poster the whole
     open is built on: THE-OPEN law 1 (luma >= 140) and HOOK_PLATE (>= 18%
     contiguous cream) are both measured at frame 0 ONLY, and the SFX bank
     deliberately scores frame 0 with low-band weight because nothing has
     happened yet. Nothing here touches that frame. */
  const shed = E(f, 22, HK.sixM + 10, 0, 1, LIN);
  /* the outward throw, running past the buckle to the hook's last frame */
  const blast = E(f, HK.sixM + 2, HK.sixM + 30, 0, 1, OUT);
  /* ⛔ AND ITS LINEAR TAIL, WHICH IS NOT DECORATION. `blast` is eased OUT, so
     by design it has spent almost all its travel by f150 and the hook's final
     twelve frames measured **1.80** — decelerating to a standstill on the last
     thing the viewer sees before the cut to LIBRARY. Blown paper does not stop
     in mid-air; `coast` keeps it moving at a constant rate right through the
     cut, which is both the physics and §5's "nothing lands and stops". */
  const coast = E(f, HK.sixM + 2, 162, 0, 1, LIN);
  /* ⛔ THE PLATE IS THE STAGE, exactly as the approved 105 hook does it —
     900x456 at y168 = 51.2% of the panel, with the hero objects INSIDE it.
     Two nested levels (plate > object), not four. */
  /* ⛔ 900x556 at y132: the panel's hero band is y118..726, the header owns
     y0..112 and the slug y730..792, so this is the tallest the stage can be
     without either clipping. GND is plate-local. */
  const PL = { x: 56, y: 132, w: 900, h: 556 };
  const GND = 502;                          /* the plate-local ground line */
  const TOWER_H = 372;                      /* leaves the top strip for mark + rules */

  return (
    <Scene p={p} slug="6 MONTHS OF THE WAY YOU LEARN NOW" push={[0, 162, 1.17]} vig={0.40}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1, transformOrigin: "50% 50%",
        transform: `translate(${camX + kick.x + kick2.x}px, ${camY + kick.y + kick2.y}px) `
          + `scale(${sh.s})` }}>
        {/* the deep slate wall — the plate's contrast, and the room the body
            lives in, so f162 is a camera move not a change of universe */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1,
          background: `linear-gradient(176deg, ${p.back} 0%, ${p.back2} 72%)` }} />
        <div style={{ position: "absolute", left: -60, top: p.horizon + 190, width: W + 120,
          height: H, zIndex: 2, background: `linear-gradient(180deg, ${p.floor}, ${p.floor2})`,
          borderTop: `5px solid ${p.lip}` }} />
        {/* the one committed practical, falling straight onto the plate */}
        <Lamp x={506} on={1} f={f} y={-30} z={6} />

        {/* ⛔⛔ THE STAGE IS NEVER STILL — AND THIS BAND IS WHY IT LOOKED IT.
            v1 ran these at 0.42 in the ground's OWN tone, which is the same as
            not drawing them. v6 gave them real hue and they were STILL worth
            nothing, for a reason that took a measurement to see: at zIndex 4
            they sit BEHIND the 900x556 ClaimPlate, which covers 62% of the
            panel. Five sixths of every bar was painted under an opaque object.
            The visible surface is only the 37.6% margin around the plate, so
            that is where the band now lives, at a size that reads there:
            164x15 at 0.34 alpha -> full-height bars at 0.42, nearly 3x faster.

            ⛔⛔ AND IT MUST NOT CROSS THE PLATE. `look_audit.plate_at_f0` scores
            the largest CONTIGUOUS cream region at frame 0 (38.2% here, bar 18%)
            — raking dark bands over the plate would cut that field into strips
            and collapse the hook's own gate. THE-OPEN law 1 is a frame-0 law and
            this is the object it is about. Behind, never across. */}
        <div style={{ position: "absolute", left: 0, top: 96, width: W, height: 640, zIndex: 4,
          overflow: "hidden" }}>
          {Array.from({ length: 10 }, (_, i) => (
            <div key={"ln" + i} style={{ position: "absolute", top: -40, height: 720,
              left: ((f * 19 + i * 214) % (W + 428)) - 428, width: 132,
              transform: "skewX(-17deg)",
              background: hexa([CLAY, GOLD, GREEN, SKY, RED, "#7C6BD0"][i % 6], 0.38) }} />
          ))}
        </div>

        <ClaimPlate x={PL.x} y={PL.y} w={PL.w} h={PL.h} f={f} z={30}
          hotK={E(f, HK.fourH, HK.fourH + 7, 0, 1, OUT)}>
          {/* ---- THE HERO: six volumes, a solid 300x310 mass, LEFT --------- */}
          <div style={{ position: "absolute", left: 0, top: 0, right: 0, bottom: 0,
            overflow: "hidden", borderRadius: 26, zIndex: 20 }}>
            <BookTower x={266} y={GND} k={k} f={f} h={TOWER_H} w={252} z={22}
              strain={strain} />

            {/* the settle's dust, at the base where the load went in */}
            {lurch > 0.01 && lurch < 0.999 && (
              <div style={{ position: "absolute", left: 266 - 168, top: GND - 26, width: 336,
                height: 54, zIndex: 21, borderRadius: "50%", opacity: (1 - lurch) * 0.7,
                background: `radial-gradient(ellipse, ${hexa("#CFC2A6", 0.85)}, transparent 70%)`,
                transform: `scale(${0.45 + lurch * 1.25})` }} />
            )}

            {/* the sheets, peeling off the pile and crossing the stage. LARGE
                (up to 128x92) and fully saturated, because §1 only ever rewards
                LARGE x BRIGHT x FAST — 30 small pale ones would measure the
                same as none. They keep coming right up to the buckle, so the
                collapse reads as the pile finally giving way rather than as an
                unmotivated event on a still frame. */}
            {Array.from({ length: 22 }, (_, i) => {
              /* ⛔⛔ EACH SHEET OWNS ITS LAUNCH — DO NOT GO BACK TO A MODULO.
                 v1 wrote `t = ((shed * 150 + i * 11) % 150) / 150` and gated it
                 on `shed`, which starts at f22. That is WRONG and the render
                 proved it: the `i * 11` stagger is non-zero at f0, so with
                 shed = 0 all sixteen sheets were already strewn across the
                 stage ON FRAME 0. It cost the open its approved poster —
                 HOOK_PLATE fell 38.2% -> 30.0% because the scattered cards cut
                 the contiguous cream field, and frame-0 luma fell 178.7 ->
                 170.3. A modulo has no zero state; a per-sheet ramp does. */
              const launch = 22 + i * 6;
              const t = E(f, launch, launch + 44, 0, 1, LIN);
              if (t <= 0.001) return null;
              const c = [CLAY, GOLD, GREEN, SKY, RED, "#7C6BD0"][i % 6];
              /* ⭐ THE COLLAPSE BLOWS THE REST OUT, it does not delete them.
                 v1 faded the sheets by `(1 - k)`, so they vanished on the exact
                 frame the stack gave way and the hook's LAST 12 FRAMES measured
                 1.74 — the deadest stretch in the reel, sitting immediately
                 before a hard cut. §1's second-best measured row is "12 large
                 cards stacking then BLOWN APART, 3.57 -> 7.61"; throwing them
                 outward costs nothing and it is what a collapsing pile does. */
              const px = 250 + t * (300 + rnd(i, 2) * 330)
                + blast * (rnd(i, 4) - 0.42) * 620
                + coast * (rnd(i, 4) - 0.42) * 300;
              const py = 300 - rnd(i, 5) * 170 - t * (120 + rnd(i, 7) * 150)
                + Math.sin(t * 3.1 + i) * 26 - blast * (90 + rnd(i, 6) * 210)
                - coast * (40 + rnd(i, 6) * 120);
              return (
                /* ⛔⛔ SOLID STOCK, NOT TISSUE. These read as drifting glass on
                   v7 and it is arithmetic, not taste: the old ramp was
                   `0.35 + (1-t)*0.6`, so a sheet hit 0.35 alpha exactly when it
                   was largest and moving fastest. A 35%-opaque object over a
                   cream plate changes the pixels under it by almost nothing, so
                   the frames where they should have paid measured as if they
                   were not there — 22 sheets bought only 2.82 -> 6.36. They now
                   hold 0.96 and only the blast thins them, and they are ~30%
                   bigger, because §1 rewards LARGE x BRIGHT x FAST and they were
                   failing two of the three. */
                <div key={"pg" + i} style={{ position: "absolute", left: px, top: py,
                  width: 118 + rnd(i, 7) * 46, height: 84 + rnd(i, 9) * 34, zIndex: 24,
                  borderRadius: 6, background: c, border: `3px solid ${dkh(c, 0.3)}`,
                  opacity: (0.96 - t * 0.10) * (1 - blast * 0.55),
                  transform: `rotate(${(rnd(i, 3) - 0.5) * 160 * t
                    + blast * (rnd(i, 8) - 0.5) * 300}deg)`, boxShadow: SH }} />
              );
            })}
            {land > 0.01 && (
              <div style={{ position: "absolute", left: 266 - 200, top: GND - 30, width: 400,
                height: 62, zIndex: 21, borderRadius: "50%", opacity: (1 - land) * 0.85,
                background: `radial-gradient(ellipse, ${hexa("#CFC2A6", 0.9)}, transparent 70%)`,
                transform: `scale(${0.5 + land * 1.5})` }} />
            )}
            {/* the ground line the two objects share, so the RATIO is readable */}
            <div style={{ position: "absolute", left: 40, top: GND, width: 820, height: 5,
              borderRadius: 3, background: "#DCD3BF", zIndex: 18 }} />

            {/* ---- THE CLAIM: one card, RIGHT, on the same ground --------- */}
            <div style={{ position: "absolute", left: 592 - take * 172,
              top: GND - 320 - cardUp * 22 - take * 30,
              zIndex: 26,
              transform: `scale(${squash(f, HK.fourH, 0.15) * (1 + take * 0.32)}) rotate(${take * -2.2}deg)`,
              transformOrigin: "50% 100%" }}>
              <Contact x={-16} y={324} w={272} z={-1} o={0.32} />
              {/* ⛔ FULL COLOUR AT FRAME 0. v1 held it at lit=0.30 so it would "flood" on
                  "4 hours" — but with only ONE card there is nothing to compare the dim
                  state against, so it just read as a dead brown slab for the first 3.3s
                  of the reel. The reveal is now the RISE and the ratio rule lighting;
                  the artifact itself is saturated from the frame the viewer meets it. */}
              <PromptCard x={0} y={0} w={240} z={26} lit={1} />
            </div>
          </div>
        </ClaimPlate>

        {/* the student, on the plate's lip, looking UP at what they signed up for */}
        <Cam z={46}>
          <div style={{ position: "absolute", left: 812, top: 636 }}>
            <Mascot lf={f} size={158} gaze={0.55} nodAmp={4.6} nodSpeed={11}
              glasses={1} shock={E(f, HK.sixM, HK.sixM + 8, 0, 0.7, OUT)} />
          </div>
        </Cam>
      </div>
    </Scene>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
   B · THE EMPTY CHAIR — open on the ENEMY.

   THE-OPEN law 3: the strongest interrupt is the viewer seeing a thing they
   personally dread, instantly, with no narration. The dread here is not a UI
   error — it is *studying alone with nobody checking your work*, and the VO
   names it at 8.20s ("nobody's teaching them correctly"). This concept puts
   the reel's enemy in frame 0 and spends the whole hook on it.

   ⛔ Alex ruled 2026-08-03 that the dreaded thing is a drawn OBJECT, never a
      UI screenshot, so it is a CHAIR, shot from behind its own back.

   THE EVENT: before · the far side of the table is buried and working ·
   trigger · "replace every tech platform" the lamp widens · travel · the pile
   grows a volume at a time · arrival · "6 months" the last volume lands and
   the near chair is still empty.
   ──────────────────────────────────────────────────────────────────────── */
export const HookB: React.FC = () => {
  const f = useCurrentFrame();
  const p = PLACES.klass;
  const grow = E(f, HK.master, HK.sixM + 14, 0, 1, LIN);
  const kick = shake(f, HK.sixM + 10, 8, 8);
  return (
    <Scene p={p} slug="NOBODY IS CHECKING YOUR WORK" push={[0, 162, 1.10]} vig={0.52}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1,
        transform: `translate(${kick.x}px, ${kick.y}px)` }}>
        <Room p={p} f={f} lampX={704} lampOn={1} cool={1} />
        <Motes x={704} y={190} w={330} h={430} n={16} f={f} z={22} />

        {/* the far side of the table: the student, buried, working hard and
            getting nowhere. Pushed RIGHT and small so the near chair owns the
            frame — the enemy is the hero of this concept, not the victim. */}
        <Cam z={30}>
          <div style={{ position: "absolute", left: 636, top: 392 }}>
            <Mascot lf={f} size={124} gaze={-0.25} nodAmp={5.0} nodSpeed={13} glasses={1} />
          </div>
        </Cam>
        <BookTower x={856} y={566} k={0} f={f} h={196} w={128} z={34} />
        <BookTower x={572} y={566} k={0} f={f} h={128} w={104} z={33} />
        <GreyBook x={716} y={560} s={0.78} z={36} open={1} />

        {/* the stuck ring, on the table, big enough to read */}
        <Ring x={452} y={506} k={0.17 + Math.sin(f / 19) * 0.012} s={0.60} c={CLAY} f={f} z={44} />

        {/* ---- THE ENEMY: the near chair, BACK to camera, cropping the frame.
            ⛔ It is the LARGEST object in the panel by a wide margin and it sits
            on the near side of the table, so the shot reads as "this is your
            seat, and the one opposite you is the only one being used." */}
        <Chair x={268} y={648} s={2.05} face={1} c="#5A4A3A" />
        {/* the lamp's spill catching the empty seat — light is what says EMPTY */}
        <div style={{ position: "absolute", left: 74, top: 640, width: 392, height: 40, zIndex: 29,
          borderRadius: "50%", background: `radial-gradient(ellipse, ${hexa(GOLD, 0.30)}, transparent 72%)` }} />

        {/* ⛔ small, mark + ratio only. In a ROOM scene the plate cannot be the
            stage, so it shrinks to the measured minimum the rule asks for:
            the Claude mark on a white tile, in the eye's landing zone, plus
            the 6-months/4-hours ratio as two rules. No headline (that is the
            HookHeader's job and duplicating it is reel 105 round 2's defect). */}
        <ClaimPlate x={52} y={128} w={404} h={150} f={f} z={70}
          hotK={E(f, HK.fourH, HK.fourH + 7, 0, 1, OUT)} />
      </div>
    </Scene>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
   C · THE SEAT TAKEN — open on the MECHANISM.

   A different retention theory: do not spend the hook on the problem at all.
   THE-OPEN law 2 is that characters stop scrolls, so put TWO on screen and let
   the reel's central gesture happen inside the first two seconds.

   ⚠️ THE KNOWN COST, and the board's critic pass flags it: this spends the S2
      TURN at f0. If the payoff of the whole reel is "somebody finally sits
      down opposite you", doing it in the hook means S2 has to find a new beat.

   THE EVENT: before · an empty chair under a cold lamp · trigger · "replace"
   the tutor enters frame left · travel · the full table length · arrival ·
   "4 hours" he DROPS into the seat, the lamp snaps to full, the room warms.
   ──────────────────────────────────────────────────────────────────────── */
export const HookC: React.FC = () => {
  const f = useCurrentFrame();
  const p = PLACES.klass;
  const walk = E(f, HK.replace, HK.fourH, 0, 1, IO);          /* the travel */
  const sit = E(f, HK.fourH, HK.fourH + 9, 0, 1, OUT);        /* the drop    */
  const warm = E(f, HK.fourH + 2, HK.fourH + 16, 0, 1, OUT);  /* lamp to full */
  const kick = shake(f, HK.fourH + 4, 13, 10);
  /* ⛔ THE LANDING IS DERIVED FROM THE CHAIR, NOT TYPED. v1 dropped him at a
     hand-picked y that put him at the TOP of the chair back, so the reel's
     central gesture read as "standing behind a chair" rather than sitting in
     it. Seat top = CH.y + 14*CH.s; his feet land just inside it. */
  const CH = { x: 300, y: 568, s: 1.16, size: 150 };
  const seatTop = CH.y + 14 * CH.s;
  const tx = -320 + walk * (CH.x - CH.size / 2 + 320);
  const ty = seatTop - CH.size + 22 + (1 - sit) * -26;
  return (
    <Scene p={p} slug="SOMEBODY FINALLY SITS DOWN" push={[0, 162, 1.09]} vig={0.46}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1,
        transform: `translate(${kick.x}px, ${kick.y}px)` }}>
        <Room p={p} f={f} lampX={506} lampOn={0.42 + warm * 0.58} cool={1 - warm * 0.4} />
        <Motes x={506} y={160} w={360} h={430} n={15} f={f} z={22} />

        {/* the student, right, mid-slog */}
        <Cam z={30}>
          <div style={{ position: "absolute", left: 700, top: 386 }}>
            <Mascot lf={f} size={134} gaze={-0.35} nodAmp={4.8} nodSpeed={12} glasses={1}
              cheer={E(f, HK.fourH + 6, HK.fourH + 18, 0, 0.6, OUT)} />
          </div>
        </Cam>
        <BookTower x={880} y={560} k={0} f={f} h={186} w={128} z={32} />

        {/* the chair, and the tutor arriving into it */}
        <Chair x={CH.x} y={CH.y} s={CH.s} face={-1} c="#6B5A48" />
        <Cam z={44}>
          <div style={{ position: "absolute", left: tx, top: ty,
            transform: `scale(${squash(f, HK.fourH, 0.16)})`, transformOrigin: "50% 100%" }}>
            <Mascot lf={f} size={CH.size} gaze={0.4} nodAmp={4.4} nodSpeed={10} beard={1}
              stern={0.4} />
          </div>
        </Cam>
        {sit > 0.02 && (
          <div style={{ position: "absolute", left: CH.x - 150, top: seatTop + 96, width: 300, height: 52, zIndex: 43,
            borderRadius: "50%", opacity: (1 - sit) * 0.85,
            background: `radial-gradient(ellipse, ${hexa("#C9BCA0", 0.8)}, transparent 70%)`,
            transform: `scale(${0.5 + sit * 1.4})` }} />
        )}

        <ClaimPlate x={556} y={128} w={404} h={150} f={f} z={70}
          hotK={E(f, HK.fourH, HK.fourH + 7, 0, 1, OUT)} />
      </div>
    </Scene>
  );
};

/* ===========================================================================
   ⭐⭐⭐ VARIANTS ROUND 2 — D · E · G.  Alex on v8: *"the beginning scene needs
   to be redone completely, its way too boring and not interesting whatsoever"*.
   Third rejection of the hook, so the concept/staging is wrong, not the frame
   count. THE MEASUREMENT THAT SETTLED IT, same panel crop as look_audit:

     |        | luma    | saturation |
     | HOOK   | 172-190 | 28-49%     |
     | body   |  76-117 | 37-65%     |

   ⛔⛔ THE HOOK IS ~80 LUMA POINTS BRIGHTER AND LESS SATURATED THAN ITS OWN
   REEL. It is the pale run preserved in the first five seconds: the body was
   rebuilt to the AGENCY profile and the hook was never brought along. And it
   has NO SET — all ten body scenes run `SetFor` with WorldKit depth planes,
   while the hook is a bare gradient with every object staged inside a cream
   `ClaimPlate` covering 62% of the panel. A diagram on a card, not a place.

   ⛔ THE-OPEN law 1 (>=140 panel luma) is FRAME 0 ONLY and the hook sits at
   178 — 38 points of headroom, against AGENCY's own hook at 154. **Bright does
   not mean pale cream; it means a LARGE SATURATED LIT MASS.** That is the whole
   brief for all three below: keep >=140 by filling frame 0 with big saturated
   lit stock, in the real dark world, with a person in it.
   ======================================================================== */
const setPlace = (k: SetKey) => ({ back: PAL[k].sky, back2: PAL[k].sky2,
  floor: PAL[k].ground, floor2: PAL[k].ground2, lip: PAL[k].lip, key: PAL[k].key,
  horizon: PAL[k].horizon, grit: PAL[k].grit });

/* ⛔⛔ AND THE FIRST CUT OF ALL THREE FAILED THE LAW — D 102.0 · E 94.9 · G 88.3
   against the >=140 bar, with saturation up at 45-75% (v8 was 30.5%). Staging
   them in the body's world gave them the body's BRIGHTNESS, which is the same
   mistake as v6 in the opposite direction: the sets are built for luma ~99 and
   a hook needs ~150.

   ⛔ THE FIX IS NOT A WASH. A translucent light layer over the set is "fixing it
   by lifting the shading" — the exact move `ANIMATION-QUALITY` §8 bans, and it
   would give back the saturation these concepts just won. The sanctioned move
   (`skill-reel`, the night-class room 129.6 -> 145.0) is to REPAINT WITH BRIGHT
   SATURATED STOCK and to make the lit plane a bigger SHARE of the panel:
     1. a large warm wall of solid saturated colour behind the action
     2. a bright table plane, raised so it owns more of the frame
     3. one committed practical, blazing, so the brightness is MOTIVATED
   AGENCY did exactly this — hook 154 against its own body at 83. A hook is
   allowed to be the lit moment; it is not allowed to be pale. */
/* ⛔⛔⛔ AND THE LIFT OVER `SetFor` STILL FAILED — D 113 · E 105 · G 99. The row
   and column profile of D said exactly why, and it is structural, not a
   colour-picking problem:

     COL x909-1110   51.7 / 60.4   the Occluder — a 124px DARK column at z=90,
                                   painted over everything, ~12% of the panel
     ROW y704-791    47.6          the slug band under the vignette floor
     ROW y352-703    ~100          my "bright" 176-luma wall, measured at 100,
                                   because the Rake's SHADOW bands cross it at
                                   z=23 and the props sit on top

   ⭐⭐⭐ **THE BODY SETS CANNOT CARRY A HOOK, AND THAT IS NOT A BUG IN THEM.**
   They are built for body scenes at luma ~99, and the occluder, the deep
   vignette and the Rake's dark half are exactly what makes the body rank. A
   frame-0 law of >=140 is a different job. Every "fix" from inside `SetFor` is
   either fighting its own furniture or the banned wash.

   So the hook gets ITS OWN ROOM: same night class, same warm-practical-against-
   cool logic, built bright and saturated from the start — no occluder, no
   raking shadow band, a shallow vignette, and the lit planes sized to own the
   frame. Depth still comes from four real planes (ceiling spill · back wall +
   window bank · shelf · table), so it is a PLACE, not the gradient stage that
   v8's hook floated its cream plate on. */
const ClassRoom: React.FC<{ f: number; gnd: number; wall: string; wall2: string;
  table: string; table2: string; lip: string; pane: string }> =
  ({ f, gnd, wall, wall2, table, table2, lip, pane }) => (<>
    {/* 1 · the back wall, solid saturated stock — the biggest single mass */}
    <div style={{ position: "absolute", left: 0, top: 0, width: W, height: gnd,
      zIndex: 4, background: `linear-gradient(172deg, ${wall} 0%, ${wall2} 100%)` }} />
    {/* 2 · the ceiling taking the lamp's spill — the brightest band in frame */}
    <div style={{ position: "absolute", left: 0, top: 0, width: W, height: 150, zIndex: 5,
      background: `linear-gradient(180deg, #FBEAC4 0%, ${hexa("#FBEAC4", 0)} 100%)` }} />
    {/* 3 · the window bank — six lit panes, big bright saturated rectangles */}
    {Array.from({ length: 6 }, (_, i) => (
      <div key={"pn" + i} style={{ position: "absolute", left: 26 + i * 164, top: 176,
        width: 138, height: 188, zIndex: 6, borderRadius: 8, background: pane,
        border: `7px solid ${dkh(pane, 0.28)}`, boxShadow: SH,
        opacity: 0.92 + Math.sin(f / 23 + i) * 0.06 }} />
    ))}
    {/* 4 · the shelf — depth plane 3, and where the room's colour accents live */}
    <div style={{ position: "absolute", left: 0, top: 402, width: W, height: 22, zIndex: 7,
      background: dkh(wall2, 0.20), borderTop: `4px solid ${mxh(wall, 0.22)}` }} />
    {Array.from({ length: 8 }, (_, i) => {
      const c = [CLAY, GOLD, GREEN, SKY, RED, "#7C6BD0"][i % 6];
      return (
        <div key={"sb" + i} style={{ position: "absolute", left: 18 + i * 62,
          top: 402 - 72 - rnd(i, 3) * 34, width: 52, height: 72 + rnd(i, 3) * 34,
          zIndex: 7, borderRadius: 3, background: c,
          border: `3px solid ${dkh(c, 0.3)}` }} />
      );
    })}
    {/* 5 · the table — bright, warm, and it owns the bottom third */}
    <div style={{ position: "absolute", left: -30, top: gnd, width: W + 60, height: H - gnd,
      zIndex: 12, background: `linear-gradient(180deg, ${table} 0%, ${table2} 100%)`,
      borderTop: `8px solid ${lip}` }} />
  </>);

/* ─────────────────────────────────────────────────────────────────────────
   D · BURIED — open on the DREAD, in the room, with the person inside it.
   The student walled in at the table: eleven piles of saturated spines filling
   the lower two thirds, head barely clearing the front row, one lamp. On
   "4 hours" a single card lights in the gap; on "6 months" THE ENTIRE WALL
   GOES, and the card is alone on an empty table.
   ⛔ The books are the subject's own object (the reel is about learning) and
   the dread is one everybody has actually felt — `feedback_real_marks_are_the_props`.
   ──────────────────────────────────────────────────────────────────────── */
export const HookD: React.FC = () => {
  const f = useCurrentFrame();
  const GND = 656;
  /* the wall gives way on "6 months", with a pre-slump so it is already losing */
  const slump = E(f, 40, 50, 0, 0.08, OUT);
  const k = slump + E(f, HK.sixM, HK.sixM + 22, 0, 0.92, OUT);
  const strain = E(f, 20, HK.sixM, 0, 1, LIN);
  const cardUp = E(f, HK.fourH, HK.fourH + 12, 0, 1, BACK);
  const kick = shake(f, HK.sixM + 4, 13, 11);
  const kick2 = shake(f, 40, 6, 8);
  const dust = E(f, HK.sixM + 8, HK.sixM + 30, 0, 1, OUT);
  /* ⛔⛔ D WAS A CONCEPT, NOT A SHOT — and cutting it into the reel measured
     **4.09, STATIC**, against the built-out HookA's 9.63. A variants-round
     comp only has to answer "is this the right picture"; it has one framing and
     one event, which is exactly the profile the motion arithmetic calls dead.
     Everything below is the same treatment HookA already earned:
       · four framings, each cutting on content
       · an event at 1.27s so the collapse is not the first thing that moves
       · something running continuously between the beats
     ⛔ Shot A is identity, so frame 0 stays the poster that measured 160.4. */
  const SHOTS = [
    { at: 0, s: 1.00, fx: 506, fy: 396 },
    { at: 38, s: 1.72, fx: 392, fy: 386 },   /* into the plates — logos fill frame */
    { at: 75, s: 1.86, fx: 214, fy: 548 },   /* low on him, dwarfed by the pile   */
    { at: 100, s: 1.00, fx: 506, fy: 396 },  /* wide for the rise and the fall    */
  ];
  let sh = SHOTS[0];
  for (const s of SHOTS) if (f >= s.at) sh = s;
  const camX = -(sh.fx - W / 2) * sh.s;
  const camY = -(sh.fy - H / 2) * sh.s;
  /* ⭐⭐⭐ THE HOOK NEEDS A STORY, NOT A SETTLED PILE. Alex on v18: *"the
     beginning 5 seconds still dont have enough motion but not even that, like
     theres nothing going on actually as part of the story here"*. Exactly
     right, and it is a narrative fault rather than a motion one: he sat buried
     and UNCHANGED for 100 of 162 frames, so the picture asserted "this is
     hopeless" instead of showing it becoming hopeless. The collapse then
     arrived as the first thing that had ever happened.

     THE ARC, now: it KEEPS GETTING WORSE (five more volumes land on him, one
     every ~19 frames, each with an impact and a flinch) -> he sinks under it
     and gives up -> "4 hours" the card arrives and he looks up -> "6 months"
     the whole wall goes and he is FREE. Five beats in 5.4s, and every one of
     them is the subject, not a layer on top of him. */
  const DROPS = [14, 33, 52, 71, 90];
  const dropK = (a: number) => E(f, a, a + 11, 0, 1, IN_Q);
  /* he takes each one — flinch on impact, and he sinks as they accumulate */
  const flinch = DROPS.reduce((n, a) =>
    n + E(f, a + 9, a + 14, 0, 0.7, OUT) - E(f, a + 14, a + 30, 0, 0.7, IO), 0);
  const buried = E(f, 14, 100, 0, 1, LIN);            /* he sinks under it   */
  const lookUp = E(f, HK.fourH, HK.fourH + 12, 0, 1, OUT);  /* "4 hours"     */
  const freed = E(f, HK.sixM + 16, HK.sixM + 34, 0, 1, OUT);
  /* ⛔ declared AFTER `DROPS`, not beside the other kicks — it reads the array,
     and a const is in the temporal dead zone until its own line. */
  const kick3 = DROPS.reduce((o, a) => {
    const k = shake(f, a + 10, 7, 8); return { x: o.x + k.x, y: o.y + k.y };
  }, { x: 0, y: 0 });
  /* the early event — the top volume gives up and goes over, at 1.27s */
  const topple = E(f, 38, 62, 0, 1, IN_Q);
  /* and the pile sheds loose leaves the whole way, so nothing is ever still */
  const shed = E(f, 16, HK.sixM + 8, 0, 1, LIN);
  /* ⛔⛔ AND THE FIRST PASS WITH THE NEW PROPS WAS STILL WRONG, FOR THE OPPOSITE
     REASON. Forty richly-drawn volumes wall to wall is *still* "a whole lot of
     nothing", because NOTHING RANKS — I fixed the drawing and broke the
     hierarchy in the same move. `feedback_hook_simplicity` is explicit: ONE
     dominant object, empty stage, striking = SCALE. Detail per object and
     count of objects are different dials and only one of them was ever low.
     Now: one hero pile at 560px where every band, title plate and leaf reads,
     one supporting pile, and the desk kept clear so the student is legible. */
  const BACKR = [[392, 566, 336], [736, 322, 248]];
  const FRONTR = [[352, 168, 224]];
  return (
    <Scene p={setPlace("bench")} slug="6 MONTHS OF THE WAY YOU LEARN NOW"
      push={[0, 162, 1.14]} vig={0.26}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1, transformOrigin: "50% 50%",
        transform: `translate(${camX + kick.x + kick2.x + kick3.x}px, ${camY + kick.y + kick2.y + kick3.y}px) `
          + `scale(${sh.s})` }}>
        <ClassRoom f={f} gnd={GND} wall="#E8B978" wall2="#CB9450"
          table="#F5D9A6" table2="#D0A268" lip="#FFEDC8" pane="#FFE0A2" />
        <Lamp x={506} on={1} f={f} y={-46} z={14} />

        {/* ⭐ THE BACK WALL OF THE PILE — VolStack, not BookTower. Same
            silhouette budget, ~22 drawn elements per volume instead of 4:
            overhanging boards, raised spine bands with lit and shadowed edges,
            a title plate, gilt rules, a head-band, and a fore-edge block of
            individual leaves. This is the whole answer to "not interesting
            graphics" — the eye now has something to find at every scale. */}
        {/* ⭐ THE LAMP POOL — the lit mass that carries frame 0 AND the thing
            that makes one object rank. `hierarchy needs DARKNESS`: the surround
            falls off, the hero pile sits in the light. */}
        <div style={{ position: "absolute", left: 96, top: 150, width: 830, height: 610,
          zIndex: 13, borderRadius: "48% 48% 12% 12%", filter: "blur(54px)",
          background: `radial-gradient(58% 56% at 46% 42%, ${hexa("#FFEBBE", 0.72)}, transparent 74%)` }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 15, pointerEvents: "none",
          background: `radial-gradient(72% 60% at 44% 50%, transparent 34%, ${hexa("#3A2410", 0.52)} 100%)` }} />

        {/* the hero pile — 7 volumes at 560px, where the craft actually reads */}
        {BACKR.map(([x, h, w], i) => (
          <VolStack key={"bk" + i} x={x} y={GND} n={i === 0 ? 4 : 3} w={w} hMax={h}
            f={f} k={k} z={26 + i * 2} seed={i * 7} strain={strain} />
        ))}
        {/* the one non-rectangular silhouette, big enough to read as open */}
        <OpenVol x={556} y={GND - 128} w={268} c={GREEN} z={40} rot={-6} />

        {/* HE IS IN IT — not a sprite beside the prop, a person inside the pile */}
        {/* ⛔ z=80, NOT 40 — at 40 he sat UNDER the front pile (z=52) whose
            footprint overlaps his, and the frame rendered with no person in it
            at all. The hero of a "buried" hook cannot be occluded by the thing
            burying him; he has to be the silhouette you read first. */}
        <Cam z={80}>
          <div style={{ position: "absolute", left: 58,
            top: 506 + buried * 30 - freed * 22,
            transform: `rotate(${buried * 7 - freed * 7}deg)`,
            transformOrigin: "50% 100%" }}>
            <Mascot lf={f} size={184}
              gaze={0.62 - lookUp * 0.5}
              nodAmp={4.6 * (1 - buried * 0.6)} nodSpeed={11} glasses={1}
              shock={Math.min(1, flinch + E(f, HK.sixM, HK.sixM + 10, 0, 0.8, OUT))}
              cheer={E(f, HK.sixM + 22, HK.sixM + 40, 0, 0.9, OUT)} />
          </div>
        </Cam>

        {FRONTR.map(([x, h, w], i) => (
          <VolStack key={"fk" + i} x={x} y={GND + 96} n={2} w={w} hMax={h}
            f={f} k={k} z={52 + i * 2} seed={40 + i * 5} strain={strain} />
        ))}
        {/* ⭐ THE DESK ITSELF — scale hierarchy and a CURVED silhouette, so the
            frame is not made entirely of one shape at one size. */}
        <Sheets x={880} y={GND + 58} w={124} n={8} z={64} />
        <Sticky x={706} y={GND + 30} s={58} c={GOLD} z={66} rot={9} f={f} />
        <Mug x={498} y={GND + 46} s={86} c={CLAY} z={68} />
        <Pot x={800} y={GND - 30} s={74} z={68} />

        {/* ⭐ IT KEEPS GETTING WORSE — five more volumes land on the pile, one
            every ~19 frames across the whole hook. This is the scene's motion
            AND its story at once: each is a real object doing a real thing to
            the character, which is what `Cross` never was. */}
        {DROPS.map((a, i) => {
          const k = dropK(a);
          if (k <= 0.001) return null;
          const c = [SKY, GOLD, GREEN, RED, "#7C6BD0"][i];
          const x = [300, 442, 352, 410, 268][i];
          const land = GND - 300 - i * 26;
          return (
            <React.Fragment key={"dr" + i}>
              <Vol x={x} y={-260 + k * (land + 260)} w={252 - i * 12} h={104 - i * 6}
                c={c} z={70 + i} rot={(1 - k) * (i % 2 ? 26 : -22)}
                ribbon={i === 1 ? 0.45 : 0} />
              {k > 0.98 && (
                <div style={{ position: "absolute", left: x - 60, top: land + 60,
                  width: 372, height: 56, zIndex: 69, borderRadius: "50%",
                  opacity: Math.max(0, 1 - (f - a - 11) / 14) * 0.6,
                  background: `radial-gradient(ellipse, ${hexa("#E4CFA4", 0.9)}, transparent 70%)`,
                  transform: `scale(${0.5 + Math.min(1, (f - a - 11) / 14) * 1.2})` }} />
              )}
            </React.Fragment>
          );
        })}

        {/* THE TOPPLE — one volume slides off the hero pile and goes to the
            desk. Same object, same physics as the payoff, 3.1s earlier, so the
            collapse reads as the pile finally losing rather than as an event
            arriving on a still frame. */}
        {topple > 0.002 && (
          <Vol x={392 - 176 + topple * 128} y={104 + topple * 512} w={286}
            h={116} c={SKY} z={78} rot={topple * 104} ribbon={0.4} />
        )}
        {/* the loose leaves, coming off the pile the whole time. Solid stock at
            0.94, never the 0.35 tissue that made v7's sheets measure as absent. */}
        {/* ⛔ EIGHT, NOT FOURTEEN, AND OPAQUE. Same defect as the thrown
            volumes: translucent stock stacked several deep reads as mud. */}
        {Array.from({ length: 8 }, (_, i) => {
          const launch = 16 + i * 14;
          const tt = E(f, launch, launch + 46, 0, 1, LIN);
          if (tt <= 0.001) return null;
          const cc = [CLAY, GOLD, GREEN, SKY, RED, "#7C6BD0"][i % 6];
          return (
            <div key={"lv" + i} style={{ position: "absolute", zIndex: 74,
              left: 300 + rnd(i, 2) * 280 + tt * (240 + rnd(i, 4) * 300),
              top: 200 + rnd(i, 5) * 300 - tt * (120 + rnd(i, 7) * 170),
              width: 116 + rnd(i, 7) * 40, height: 82 + rnd(i, 9) * 28,
              borderRadius: 5, background: cc, border: `3px solid ${dkh(cc, 0.3)}`,
              opacity: 1, boxShadow: SH,
              transform: `rotate(${(rnd(i, 3) - 0.5) * 240 * tt}deg)` }} />
          );
        })}

        {/* "4 hours" — one card lights in the gap the wall leaves */}
        {/* ⛔⛔ z=96, ABOVE EVERY PIECE OF DEBRIS. Alex: *"the vertical orange
            paper thing is covered by the other papers above here"*. The card is
            the hook's entire payoff — it IS "4 hours" — and it was sitting at
            z=64 under the shed leaves (74) and the thrown volumes (70), so the
            one object the open exists to deliver was being buried by its own
            confetti at the exact moment it arrives. Debris never occludes the
            hero; if the frame has to choose, it chooses the subject. */}
        <div style={{ position: "absolute", left: 448, top: GND - 268 - cardUp * 26,
          zIndex: 96, opacity: cardUp,
          transform: `scale(${squash(f, HK.fourH, 0.16) * (0.86 + cardUp * 0.14)})`,
          transformOrigin: "50% 100%" }}>
          <Contact x={-14} y={272} w={228} z={-1} o={0.34} />
          <PromptCard x={0} y={0} w={210} z={64} lit={1} />
        </div>

        {/* the wall going down throws its own stock outward */}
        {/* ⛔⛔ THE RESOLVE WAS A MUDDLE OF TRANSLUCENT RECTANGLES. Alex on the
            ~5s frame: *"this animation here has stuff overlapping"*. Twenty of
            these, thrown only ~±210px and fading to 0.57 alpha, sat in a
            cluster over the card and over each other — semi-transparent objects
            stacked three and four deep read as mud, not as debris.
            They are SOLID VOLUMES coming off a collapsing pile, so: half as
            many, FULLY OPAQUE, and thrown far enough (760-1500px, alternating
            sides) that they actually LEAVE. That is what makes the hook's last
            frame a clean read of the one card instead of a pile-up. */}
        {Array.from({ length: 10 }, (_, i) => {
          const t = E(f, HK.sixM + 2 + (i % 5) * 2, HK.sixM + 30, 0, 1, OUT);
          if (t <= 0.001) return null;
          const c = [CLAY, GOLD, GREEN, SKY, RED, "#7C6BD0"][i % 6];
          const dir = i % 2 ? 1 : -1;
          return (
            <div key={"th" + i} style={{ position: "absolute", zIndex: 70,
              left: 210 + rnd(i, 2) * 240 + t * dir * (820 + rnd(i, 4) * 740),
              top: GND - 160 - rnd(i, 5) * 180 - t * (300 + rnd(i, 7) * 340),
              width: 132 + rnd(i, 7) * 48, height: 94 + rnd(i, 9) * 32, borderRadius: 6,
              background: c, border: `3px solid ${dkh(c, 0.3)}`, boxShadow: SH,
              opacity: 1,
              transform: `rotate(${(rnd(i, 3) - 0.5) * 340 * t}deg)` }} />
          );
        })}
        {dust > 0.01 && dust < 0.999 && (
          <div style={{ position: "absolute", left: 60, top: GND - 70, width: 900, height: 130,
            zIndex: 68, borderRadius: "50%", opacity: (1 - dust) * 0.6,
            background: `radial-gradient(ellipse, ${hexa("#E4CFA4", 0.9)}, transparent 70%)`,
            transform: `scale(${0.5 + dust * 1.3})` }} />
        )}
      </div>
    </Scene>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
   E · THE WALL OF DAYS — the claim, drawn literally and countably.
   180 lit day-cards = six months, dense and geometric
   (`feedback_reel_geometric_references` wants Matrix-rain/factory density, not
   a blob). On "4 hours" a sweep EXTINGUISHES the wall down to four lit cells.
   ⭐ A 180-cell wholesale colour change is the highest-scoring row in
   [[reference_motion_arithmetic]] — the whole cell area repaints, no travel
   needed. It is also the only concept where the number IS the picture.
   ──────────────────────────────────────────────────────────────────────── */
export const HookE: React.FC = () => {
  const f = useCurrentFrame();
  const COLS = 20, ROWS = 10, CW = 46, CH = 34, GAP = 4;
  const X0 = 6, Y0 = 132;
  /* the four that survive — dead centre of the wall so the eye is already there */
  const KEEP = [5 * COLS + 8, 5 * COLS + 9, 5 * COLS + 10, 5 * COLS + 11];
  /* the sweep runs left→right on "4 hours"; the ghost pulse lands on "6 months" */
  const wipe = E(f, HK.fourH, HK.fourH + 26, 0, 1, IO);
  const ghost = E(f, HK.sixM, HK.sixM + 10, 0, 1, OUT)
              - E(f, HK.sixM + 10, HK.sixM + 30, 0, 1, IO);
  const kick = shake(f, HK.fourH + 2, 8, 9);
  const lift = E(f, HK.fourH + 6, HK.fourH + 26, 0, 1, OUT);
  return (
    <Scene p={setPlace("exam")} slug="6 MONTHS. 180 DAYS OF IT."
      push={[0, 162, 1.15]} vig={0.26}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1, transformOrigin: "50% 50%",
        transform: `translate(${kick.x}px, ${kick.y}px)` }}>
        <ClassRoom f={f} gnd={606} wall="#E0A985" wall2="#C07E58"
          table="#F0CDA0" table2="#C79765" lip="#FFE4BC" pane="#FFD9A8" />

        {/* the board the days are pinned to */}
        <div style={{ position: "absolute", left: X0 - 24, top: Y0 - 26, zIndex: 18,
          width: COLS * (CW + GAP) + 42, height: ROWS * (CH + GAP) + 48, borderRadius: 14,
          background: "#2A2118", border: "6px solid #3D3226", boxShadow: SH_D }} />

        {Array.from({ length: COLS * ROWS }, (_, i) => {
          const cx = i % COLS, cy = Math.floor(i / COLS);
          const keep = KEEP.indexOf(i) >= 0;
          /* each column dies as the sweep passes it */
          const w = Math.max(0, Math.min(1, (wipe * (COLS + 4) - cx) / 3));
          const dead = keep ? 0 : w;
          const c = keep ? CLAY : GOLD;
          return (
            <div key={"d" + i} style={{ position: "absolute", zIndex: 22,
              left: X0 + cx * (CW + GAP), top: Y0 + cy * (CH + GAP) - (keep ? lift * 10 : 0),
              width: CW, height: CH, borderRadius: 4,
              background: dead > 0.5
                ? mxh("#2A2118", 0.06 + ghost * 0.30)
                : mxh(c, keep ? 0.10 * lift : 0),
              border: `2px solid ${dead > 0.5 ? "#3A2F22" : dkh(c, 0.34)}`,
              boxShadow: dead > 0.5 ? undefined : SH,
              transform: keep ? `scale(${1 + lift * 0.5})` : `scale(${1 - dead * 0.12})` }} />
          );
        })}

        {/* the student, small under the size of it, looking up */}
        <Cam z={44}>
          <div style={{ position: "absolute", left: 448, top: 560 }}>
            <Mascot lf={f} size={152} gaze={-0.35} nodAmp={4.6} nodSpeed={11} glasses={1}
              shock={E(f, HK.fourH, HK.fourH + 10, 0, 0.7, OUT)}
              cheer={E(f, HK.fourH + 20, HK.fourH + 40, 0, 0.8, OUT)} />
          </div>
        </Cam>

        {/* the four that are left, restated as the artifact he now holds */}
        <div style={{ position: "absolute", left: 700, top: 556, zIndex: 60, opacity: lift,
          transform: `scale(${squash(f, HK.fourH + 6, 0.16) * (0.8 + lift * 0.2)})`,
          transformOrigin: "50% 100%" }}>
          <Contact x={-12} y={246} w={200} z={-1} o={0.32} />
          <PromptCard x={0} y={0} w={182} z={60} lit={1} />
        </div>
      </div>
    </Scene>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
   G · THE COLLAPSING STACK, RE-STAGED — the CONTROL.
   Identical event to the approved-then-rejected A (six volumes concertina, the
   card takes the vacated space), but on the real table in the real dark set at
   ~2.4x the size, with NO ClaimPlate. It exists to answer one question and only
   one: was the CONCEPT fine and the cream-plate staging the whole defect?
   ⛔ Do not "improve" it — a control that has been improved measures nothing.
   ──────────────────────────────────────────────────────────────────────── */
export const HookG: React.FC = () => {
  const f = useCurrentFrame();
  const GND = 664;
  const slump = E(f, 38, 47, 0, 0.07, OUT);
  const buckle = E(f, 119, HK.sixM, 0, 0.16, IO);
  const k = slump + buckle + E(f, HK.sixM, HK.sixM + 18, 0, 0.77, OUT);
  const strain = E(f, 22, 119, 0, 1, LIN);
  const cardUp = E(f, HK.fourH, HK.fourH + 10, 0, 1, BACK);
  const take = E(f, HK.sixM + 6, HK.sixM + 26, 0, 1, OUT);
  const kick = shake(f, HK.sixM + 14, 12, 9);
  const land = E(f, HK.sixM + 12, HK.sixM + 20, 0, 1, OUT);
  return (
    <Scene p={setPlace("hall")} slug="6 MONTHS OF THE WAY YOU LEARN NOW"
      push={[0, 162, 1.15]} vig={0.26}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1, transformOrigin: "50% 50%",
        transform: `translate(${kick.x}px, ${kick.y}px)` }}>
        <ClassRoom f={f} gnd={GND} wall="#E4AE7C" wall2="#C1834F"
          table="#F2D2A0" table2="#CA9C66" lip="#FFE8C2" pane="#FFDCA6" />
        <Lamp x={430} on={1} f={f} y={-40} z={14} />

        {/* the hero at 2.4x its plate-bound size — 470px, on a real table */}
        <BookTower x={352} y={GND} k={k} f={f} h={470} w={214} z={30} strain={strain} />
        {land > 0.01 && (
          <div style={{ position: "absolute", left: 352 - 250, top: GND - 34, width: 500,
            height: 74, zIndex: 28, borderRadius: "50%", opacity: (1 - land) * 0.85,
            background: `radial-gradient(ellipse, ${hexa("#E0C79C", 0.9)}, transparent 70%)`,
            transform: `scale(${0.5 + land * 1.5})` }} />
        )}

        {/* the card, taking the space the stack gives up */}
        <div style={{ position: "absolute", left: 706 - take * 210,
          top: GND - 330 - cardUp * 24 - take * 26, zIndex: 60,
          transform: `scale(${squash(f, HK.fourH, 0.15) * (1 + take * 0.34)}) rotate(${take * -2.4}deg)`,
          transformOrigin: "50% 100%" }}>
          <Contact x={-16} y={318} w={252} z={-1} o={0.32} />
          <PromptCard x={0} y={0} w={228} z={60} lit={1} />
        </div>

        <Cam z={46}>
          <div style={{ position: "absolute", left: 108, top: 486 }}>
            <Mascot lf={f} size={150} gaze={0.5} nodAmp={4.6} nodSpeed={11} glasses={1}
              shock={E(f, HK.sixM, HK.sixM + 8, 0, 0.7, OUT)} />
          </div>
        </Cam>
      </div>
    </Scene>
  );
};

/* ── the preview shell: real chassis + real header, so the still is honest ── */
const Shell: React.FC<{ C: React.FC }> = ({ C }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Bg />
      <C />
      {/* ⛔ HookHeader eases in from its `f`, so at frame 0 it is INVISIBLE.
          The hook passes f+12 to satisfy THE-OPEN's frame-0 law. */}
      <HookHeader f={f + 12} big={HEAD[0]} hot={HEAD[1]} />
      <ProgressBar />
    </AbsoluteFill>
  );
};

export const PrevA: React.FC = () => <Shell C={HookA} />;
export const PrevB: React.FC = () => <Shell C={HookB} />;
export const PrevC: React.FC = () => <Shell C={HookC} />;
export const PrevD: React.FC = () => <Shell C={HookD} />;
export const PrevE: React.FC = () => <Shell C={HookE} />;
export const PrevG: React.FC = () => <Shell C={HookG} />;

/* ===========================================================================
   VARIANTS ROUND 3 — P · Q · R.  Alex: *"no text should be the hero image"*,
   then *"just genuinely interesting ideas that represent the concept really
   well"*.

   ⛔⛔ WHAT ROUND 3 THREW OUT AND WHY. My first answer to "new concepts" was a
   giant number, which is a title card, not a hook. My second was a staircase, an
   hourglass and a door — and those are the exact trap
   [[feedback_real_marks_are_the_props]] documents: CORRECT MAPPINGS THE VIEWER
   HAS TO TRANSLATE. Four worlds across reels 99/104 were rejected for it. A
   metaphor the audience must decode is a dead prop no matter how apt it is.

   ⭐ THE QUESTION THAT PRODUCED THESE: what is actually NOVEL here? Not that
   learning takes a long time — everyone knows that, and every metaphor above
   only restates it. It is that **you paste four blocks of text and a teacher
   exists**. So the hook should DEMONSTRATE the mechanism, not set it up.
   ======================================================================== */

/* ─────────────────────────────────────────────────────────────────────────
   P · THE PROMPT BECOMES THE TUTOR — the mechanism, performed.
   A page of prompt fills the frame; its lines detach, arc up, and CONDENSE
   into a seated figure who settles and looks at you. Words become a person.
   ⭐ One object the whole way through, so hierarchy is structural rather than
   something to police — there is never a second thing at the same scale.
   ──────────────────────────────────────────────────────────────────────── */
export const HookP: React.FC = () => {
  const f = useCurrentFrame();
  const GND = 648;
  /* ⛔ 26 COLUMNS, 9 LINES — and that is a HARD BOX, not a preference. Alex:
     *"the text goes outside of the box"*. v1 ran 12 lines at 31px leading from
     y236, i.e. y236..577 inside a page whose bottom edge is y500, so the last
     three lines hung in mid-air below the card. Page inner box is x84..470 /
     y200..470; every line below fits it. */
  const TEXT = [
    "You are my personal tutor",
    "for [SKILL]. I am starting",
    "at [MY LEVEL].",
    "How you teach me:",
    "1. Ask me five questions",
    "   first, to find out what",
    "   I already know.",
    "2. Teach in the order that",
    "   makes me useful fastest.",
  ];
  /* ⭐⭐ IT BUILDS. Alex: *"start building up to the actual interesting
     component in the hook, which is becoming the wise one"*. v1 launched the
     lines on an even 4-frame cadence and the whole thing read flat. The gaps
     now COLLAPSE — 16, 13, 11, 9, 7, 6, 5, 4, 4 — so it starts as one word
     coming loose and ends as the page tearing itself apart, which is what
     makes the arrival feel earned rather than scheduled. */
  const LAUNCH = [14, 30, 43, 54, 63, 70, 76, 81, 85];
  const lift = (i: number) => E(f, LAUNCH[i], LAUNCH[i] + 46, 0, 1, IO);
  const swirl = E(f, 92, 116, 0, 1, IO);        /* they orbit before landing */
  const form = E(f, 112, 132, 0, 1, OUT);
  const settle = E(f, 130, 146, 0, 1, BACK);
  const turn = E(f, HK.sixM, HK.sixM + 14, 0, 1, OUT);
  /* ⭐ THE ENLIGHTENMENT. Alex: *"maybe make that enlightened one glow after he
     comes in"*. ⛔ NOT a neon glow — `feedback_reel_matte_palette` and
     REEL-BUILD-LEARNINGS §1 ban `boxShadow: 0 0 Npx` outright and the grep gate
     on it is 0. Solid radiating rays plus a warm light pool read as radiance,
     are matte by construction, and the room's own practical lifts with him so
     the light has a source. */
  const halo = E(f, 132, 152, 0, 1, OUT);
  const pageGo = E(f, 30, 100, 0, 1, IO);
  const pageOut = E(f, 96, 120, 0, 1, IN_Q);
  const sag = E(f, 8, 92, 0, 1, LIN);
  const tear = LAUNCH.slice(0, 5).reduce((n, a) =>
    n + E(f, a, a + 5, 0, 0.5, OUT) - E(f, a + 5, a + 18, 0, 0.5, IO), 0);
  const track = E(f, 40, 112, 0, 1, IO);
  const up = E(f, 134, 152, 0, 1, OUT);
  /* ⛔⛔ P HAD NO SHOT STRUCTURE, AND THAT IS WHY IT MEASURED 4.68 THEN 4.97
     STATIC WITH TWELVE THINGS MOVING. Accelerating the build, growing the words
     and adding the radiance together bought **0.29**. D went 4.09 -> 7.89 and
     the bulk of it was FOUR FRAMINGS — whole-frame transforms repaint every
     edge at once, which is the second-highest row in the measured table, and no
     amount of small-object motion substitutes for it.
     ⛔ Shot A is identity so frame 0 is untouched. Every cut lands on a beat:
       A f0..40   wide — the page, him, the problem
       B f41..85  into the page as the words tear off
       C f86..118 the swirl, where they orbit before landing
       D f119..162 out to him condensing, and the radiance */
  const SHOTS = [
    { at: 0, s: 1.00, fx: 506, fy: 396 },
    { at: 41, s: 1.58, fx: 296, fy: 330 },
    { at: 86, s: 1.52, fx: 648, fy: 344 },
    { at: 119, s: 1.14, fx: 636, fy: 372 },
  ];
  let sh = SHOTS[0];
  for (const q of SHOTS) if (f >= q.at) sh = q;
  const camX = -(sh.fx - W / 2) * sh.s;
  const camY = -(sh.fy - H / 2) * sh.s;
  const kick = shake(f, 130, 12, 10);
  /* the page tearing shakes the room on its last, fastest launches */
  const kick2 = [63, 70, 76, 81, 85].reduce((o, a) => {
    const k = shake(f, a, 5, 7); return { x: o.x + k.x, y: o.y + k.y };
  }, { x: 0, y: 0 });
  const TX = 700, TY = 292;
  return (
    <Scene p={setPlace("bench")} slug="THE PROMPT BECOMES THE TUTOR"
      push={[0, 162, 1.12]} vig={0.28}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1, transformOrigin: "50% 50%",
        transform: `translate(${camX + kick.x + kick2.x}px, ${camY + kick.y + kick2.y}px) `
          + `scale(${sh.s})` }}>
        <ClassRoom f={f} gnd={GND} wall="#E3B075" wall2="#C68C4E"
          table="#F2D6A2" table2="#CC9E66" lip="#FFEAC4" pane="#FFDDA0" />
        <Lamp x={396} on={1 + halo * 0.4} f={f} y={-44} z={14} />

        {/* ⭐ THE ROOM IS NOT STILL BEFORE THE FIRST WORD LEAVES. Six failed
            pages he has already been through, drifting on the desk, so f0..14
            is a room somebody is working in rather than a poster. */}
        {Array.from({ length: 6 }, (_, i) => {
          const d = drift(f, i * 2.7, 1.15);
          return (
            <div key={"fp" + i} style={{ position: "absolute",
              left: 92 + i * 26 + d.x, top: GND + 22 + (i % 3) * 12 + d.y,
              width: 132, height: 96, zIndex: 30 + i, borderRadius: 5,
              background: "#EFE6CE", border: "3px solid #CDBF9F",
              transform: `rotate(${(rnd(i, 3) - 0.5) * 22 + d.r}deg)` }} />
          );
        })}

        {/* THE PAGE — the hero at frame 0, and its text stays INSIDE it */}
        <div style={{ position: "absolute", left: 56, top: 126, width: 448, height: 374,
          zIndex: 40, borderRadius: 16, background: "#F8F3E5",
          border: "7px solid #D6C6A4", boxShadow: SH_D, overflow: "hidden",
          opacity: 1 - pageOut,
          transform: `rotate(${-2 + pageGo * -4 + pageOut * 24}deg) `
            + `translateY(${pageOut * 640}px) scale(${1 - pageGo * 0.04 - pageOut * 0.3})`,
          transformOrigin: "50% 100%" }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 58,
            background: "#EBE2CB", borderBottom: "3px solid #D6C6A4",
            display: "flex", alignItems: "center", gap: 11, padding: "0 16px" }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: "#FFFFFF",
              border: "3px solid #E2D6B8", display: "flex", alignItems: "center",
              justifyContent: "center" }}>
              <Img src={staticFile("claude_logo.png")}
                style={{ width: 24, height: 24, objectFit: "contain" }} />
            </div>
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 15,
              letterSpacing: "0.10em", color: "#3A3226" }}>PROJECT INSTRUCTIONS</span>
          </div>
        </div>

        {/* ⭐ THE WORDS LEAVE AND GROW. v1 shrank them to 45% as they travelled,
            which is backwards twice over: the payoff object should get BIGGER on
            approach, and small fast objects sweep almost no area, which is why
            the hook measured 4.68 STATIC with twelve things moving. */}
        {TEXT.map((line, i) => {
          const t = lift(i);
          const x0 = 84, y0 = 200 + i * 30;
          const ang = -1.05 + (i / TEXT.length) * 2.1 + swirl * 2.4;
          const rad = 150 - swirl * 66;
          const x1 = TX - 70 + Math.cos(ang) * rad;
          const y1 = TY + 60 + Math.sin(ang) * rad * 0.82;
          const arc = Math.sin(t * Math.PI) * -170;
          const c = [CLAY, GOLD, GREEN, SKY, RED, "#7C6BD0"][i % 6];
          return (
            <div key={"tx" + i} style={{ position: "absolute", zIndex: 62,
              left: x0 + t * (x1 - x0), top: y0 + t * (y1 - y0) + arc,
              whiteSpace: "pre", fontFamily: MONO, fontWeight: 800,
              fontSize: 22 * (1 + t * 0.55), lineHeight: 1,
              color: t < 0.04 ? "#3A3226" : c,
              opacity: 1 - form * 0.95,
              transform: `rotate(${t * (rnd(i, 2) - 0.5) * 170}deg)`,
              textShadow: t > 0.1 ? "0 3px 7px rgba(0,0,0,0.30)" : undefined }}>
              {line}
            </div>
          );
        })}

        {/* ⭐⭐ "REPLACE EVERY TECH PLATFORM" — the line had no picture at all.
            Seven real platforms ring the empty space at f27, and the tutor
            condenses INSIDE that ring and puts them all out. The ring is the
            staging: they surround the seat he is about to take, so replacement
            is spatial rather than asserted.

            ⚠️ THE HONEST NARROWING, and it is deliberate. The VO says "every
            tech platform", which is hype — Claude does not replace Photoshop or
            a bank. What a tutor plausibly substitutes for is the LEARNING
            platforms, so those are the only logos here. It keeps the beat
            truthful while still reading as "the things you were using".
            ⛔ They DIM and drop; nothing is crossed out, smashed or binned. The
            reel dramatises the mechanism and stops at the edge of the claim
            (board §0), and "superseded" is a claim we can make where
            "destroyed" is not. */}
        {["si_duolingo", "si_coursera", "si_udemy", "si_khanacademy",
          "si_skillshare", "si_udacity", "youtube"].map((slug, i) => {
          const a = HK.replace + i * 2;
          const k = E(f, a, a + 9, 0, 1, BACK);
          if (k <= 0.01) return null;
          const out = E(f, 118 + i * 3, 136 + i * 3, 0, 1, IN_Q);
          const ang = -Math.PI / 2 + (i / 7) * Math.PI * 2;
          const d = drift(f, i * 1.7, 0.9);
          return (
            <div key={"pf" + i} style={{ position: "absolute", zIndex: 56,
              left: 706 + Math.cos(ang) * 196 - 60 + d.x,
              top: 318 + Math.sin(ang) * 190 - 60 + d.y + out * 520,
              width: 120, height: 120, borderRadius: 27, background: "#FFFFFF",
              border: "4px solid #E4D8BC", boxShadow: SH,
              display: "flex", alignItems: "center", justifyContent: "center",
              opacity: Math.min(1, k * 1.6) * (1 - out),
              filter: out > 0.02 ? `grayscale(${out}) brightness(${1 - out * 0.5})` : undefined,
              transform: `scale(${(0.5 + k * 0.5) * (1 - out * 0.3)}) `
                + `rotate(${d.r * 0.8 + out * 26}deg)` }}>
              <Img src={staticFile(`logos/${slug}.svg`)}
                style={{ width: 74, height: 74, objectFit: "contain" }} />
            </div>
          );
        })}

        {/* ⭐ THE RADIANCE — solid rays, not a neon halo */}
        {halo > 0.01 && Array.from({ length: 12 }, (_, i) => (
          <div key={"ry" + i} style={{ position: "absolute",
            left: TX - 6, top: TY + 40, width: 12 + halo * 10,
            height: 190 + halo * 190, zIndex: 58,
            background: `linear-gradient(180deg, ${hexa(GOLD, 0.46 * halo)}, transparent)`,
            transformOrigin: "50% 0%",
            transform: `rotate(${i * 30 + f * 0.5}deg) scaleY(${0.4 + halo * 0.6})` }} />
        ))}
        {halo > 0.01 && (
          <div style={{ position: "absolute", left: TX - 250, top: TY - 130,
            width: 500, height: 500, zIndex: 57, borderRadius: "50%",
            background: `radial-gradient(circle, ${hexa("#FFE7B4", 0.44 * halo)}, transparent 68%)` }} />
        )}

        {form > 0.01 && (
          <Cam z={80}>
            <div style={{ position: "absolute", left: TX - 156, top: TY - 92,
              opacity: Math.min(1, form * 1.7),
              transform: `scale(${(0.3 + form * 0.7) * squash(f, 130, 0.28)}) `
                + `rotate(${rock(f, 132, 5.5, 22)}deg)`,
              transformOrigin: "50% 100%" }}>
              <Mascot lf={f} size={322} gaze={-0.55 + turn * 0.9} nodAmp={5.2}
                nodSpeed={11} beard={1} stern={0.3}
                cheer={E(f, HK.sixM + 14, HK.sixM + 34, 0, 0.85, OUT)} />
            </div>
          </Cam>
        )}
        <Bubble x={300} y={182} w={300} t="LET'S BEGIN."
          k={E(f, HK.sixM + 6, HK.sixM + 18, 0, 1, BACK)} f={f} at={HK.sixM + 6}
          flip z={98} />
        <Chair x={TX} y={GND + 10} s={1.56} face={1} c="#5A4A3A" />
        {settle > 0.01 && settle < 1 && (
          <div style={{ position: "absolute", left: TX - 196, top: GND - 28, width: 392,
            height: 60, zIndex: 70, borderRadius: "50%", opacity: (1 - settle) * 0.8,
            background: `radial-gradient(ellipse, ${hexa("#E8D2A6", 0.9)}, transparent 70%)`,
            transform: `scale(${0.5 + settle * 1.3})` }} />
        )}

        <Cam z={46}>
          <div style={{ position: "absolute", left: 88,
            top: 486 + sag * 30 - up * 26,
            transform: `rotate(${sag * 7 - up * 7}deg)`, transformOrigin: "50% 100%" }}>
            <Mascot lf={f} size={244}
              gaze={0.55 - track * 1.05}
              nodAmp={4.8 * (1 - sag * 0.55)} nodSpeed={12} glasses={1}
              shock={Math.min(1, tear + E(f, 128, 137, 0, 0.9, OUT)
                - E(f, 137, 152, 0, 0.9, IO))}
              cheer={E(f, 140, 160, 0, 0.9, OUT)} />
          </div>
        </Cam>
        <Bubble x={342} y={506} w={272} t="STILL STUCK."
          k={E(f, 12, 24, 0, 1, BACK) - E(f, 74, 86, 0, 1, IO)}
          f={f} at={12} z={97} />
      </div>
    </Scene>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
   Q · THE CHAIR THAT FILLS ITSELF — the enemy is an EMPTY SEAT.
   He is buried; the seat opposite stays empty while he struggles, which is the
   thing everyone who has taught themselves anything recognises. A card lands
   and the chair FILLS — someone is already mid-sentence, pointing at his work.
   ──────────────────────────────────────────────────────────────────────── */
export const HookQ: React.FC = () => {
  const f = useCurrentFrame();
  const GND = 656;
  const DROPS = [18, 44, 70];
  const dropK = (a: number) => E(f, a, a + 11, 0, 1, IN_Q);
  const flinch = DROPS.reduce((n, a) =>
    n + E(f, a + 9, a + 14, 0, 0.7, OUT) - E(f, a + 14, a + 30, 0, 0.7, IO), 0);
  const sink = E(f, 16, 96, 0, 1, LIN);
  const card = E(f, HK.fourH, HK.fourH + 10, 0, 1, BACK);
  const fill = E(f, 118, 130, 0, 1, BACK);        /* ⭐ the seat FILLS      */
  const warm = E(f, 118, 140, 0, 1, OUT);
  const kick = shake(f, 118, 12, 10);
  const CX = 690;
  return (
    <Scene p={setPlace("hall")} slug="THE SEAT NOBODY WAS IN"
      push={[0, 162, 1.13]} vig={0.30}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1,
        transform: `translate(${kick.x}px, ${kick.y}px)` }}>
        <ClassRoom f={f} gnd={GND} wall={`#${warm > 0.5 ? "E8B87C" : "C99A6C"}`}
          wall2="#A97448" table="#EFCE9C" table2="#C3925E" lip="#FFE6BE"
          pane={warm > 0.5 ? "#FFE2A6" : "#E8C08A"} />
        <Lamp x={470} on={0.55 + warm * 0.45} f={f} y={-42} z={14} />

        {/* his side: buried, and getting worse */}
        <VolStack x={250} y={GND} n={4} w={296} hMax={430} f={f} z={30} seed={3} />
        {DROPS.map((a, i) => {
          const k = dropK(a);
          if (k <= 0.001) return null;
          const c = [SKY, GOLD, RED][i];
          return (
            <Vol key={"d" + i} x={[196, 316, 250][i]} y={-240 + k * (GND - 470 + 240)}
              w={244} h={104} c={c} z={64 + i} rot={(1 - k) * (i % 2 ? 24 : -20)} />
          );
        })}
        <Cam z={70}>
          <div style={{ position: "absolute", left: 74, top: 500 + sink * 26,
            transform: `rotate(${sink * 6}deg)`, transformOrigin: "50% 100%" }}>
            <Mascot lf={f} size={178} gaze={0.55} nodAmp={4.6 * (1 - sink * 0.6)}
              nodSpeed={11} glasses={1}
              shock={Math.min(1, flinch + E(f, 118, 126, 0, 0.8, OUT))}
              cheer={E(f, 132, 152, 0, 0.85, OUT)} />
          </div>
        </Cam>

        {/* ⭐⭐ THE EMPTY SEAT — the biggest single object in frame, and it stays
            EMPTY for 118 of 162 frames. The absence is the subject. */}
        <Chair x={CX} y={GND + 10} s={1.9} face={-1} c="#5A4A3A" />
        {fill > 0.01 && (
          <Cam z={78}>
            <div style={{ position: "absolute", left: CX - 118, top: GND - 300,
              opacity: Math.min(1, fill * 1.8),
              transform: `scale(${(0.5 + fill * 0.5) * squash(f, 118, 0.24)})`,
              transformOrigin: "50% 100%" }}>
              <Mascot lf={f} size={244} gaze={-0.6} nodAmp={4.4} nodSpeed={10}
                beard={1} stern={0.35} />
            </div>
          </Cam>
        )}
        {/* the card that put him there */}
        <div style={{ position: "absolute", left: 486, top: GND - 236 - card * 22,
          zIndex: 96, opacity: card,
          transform: `scale(${squash(f, HK.fourH, 0.18) * (0.9 + card * 0.1)})`,
          transformOrigin: "50% 100%" }}>
          <Contact x={-12} y={244} w={200} z={-1} o={0.32} />
          <PromptCard x={0} y={0} w={182} z={96} lit={1} />
        </div>
      </div>
    </Scene>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
   R · WHAT YOU MADE, TWICE — the RESULT, not the process.
   Two attempts at the same piece of work on one bench. The six-month one is
   wobbling, crossed out, unfinished. The four-hour one assembles clean and
   takes the seal. ⛔ Deliberately abstract work (a made THING, ruled and
   pieced) because the VO says "any skill" and picking one narrows the reel.
   ──────────────────────────────────────────────────────────────────────── */
export const HookR: React.FC = () => {
  const f = useCurrentFrame();
  const GND = 660;
  const wob = Math.sin(f / 7) * 2.4;
  const build = (i: number) => E(f, 96 + i * 6, 116 + i * 5, 0, 1, BACK);
  const seal = E(f, HK.sixM + 4, HK.sixM + 12, 0, 1, IN_Q);
  const bin = E(f, HK.sixM + 10, HK.sixM + 30, 0, 1, IN_Q);  /* the bad one goes */
  const kick = shake(f, HK.sixM + 6, 12, 10);
  return (
    <Scene p={setPlace("exam")} slug="SIX MONTHS OF IT vs FOUR HOURS"
      push={[0, 162, 1.13]} vig={0.28}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1,
        transform: `translate(${kick.x}px, ${kick.y}px)` }}>
        <ClassRoom f={f} gnd={GND} wall="#DFA87E" wall2="#B87A52"
          table="#EFCDA0" table2="#C69465" lip="#FFE3BA" pane="#FFD9A4" />

        {/* LEFT — six months of trying. It never stops wobbling. */}
        <div style={{ position: "absolute", left: 78, top: 224, width: 372, height: 386,
          zIndex: 44, borderRadius: 14, background: "#EFE6CE",
          border: "7px solid #C9B892", boxShadow: SH,
          opacity: 1 - bin, transform: `rotate(${-3 + wob + bin * 26}deg) `
            + `translateY(${bin * 520}px)`, transformOrigin: "50% 100%" }}>
          {/* ⛔ REAL WORK, NOT BARS. Alex: *"dont just have basic colored lines
              thats too boring"*. This is the same document as the four-hour one,
              written badly — crooked, struck through, and never settling. You
              can READ that it is wrong, which a grey rectangle can never say. */}
          {["def learn(skill):", "  step = ???", "  # try again", "  for i in range:",
            "    guess()", "  return maybe", "  # still broken"].map((ln, i) => (
            <div key={"w" + i} style={{ position: "absolute", left: 28,
              top: 44 + i * 44, whiteSpace: "pre", fontFamily: MONO, fontWeight: 700,
              fontSize: 22, lineHeight: 1, color: "#8A7F68",
              textDecoration: i % 3 === 1 ? "line-through" : undefined,
              transform: `rotate(${(rnd(i, 5) - 0.5) * 7 + Math.sin(f / 9 + i) * 1.5}deg)` }}>
              {ln}
            </div>
          ))}
          {Array.from({ length: 4 }, (_, i) => (
            <div key={"x" + i} style={{ position: "absolute", left: 60 + i * 78,
              top: 96 + (i % 2) * 150, width: 62, height: 10, borderRadius: 5,
              background: RED, transform: `rotate(${i % 2 ? 34 : -34}deg)` }} />
          ))}
        </div>

        {/* RIGHT — four hours. It ASSEMBLES, piece by piece, then is sealed. */}
        <div style={{ position: "absolute", left: 562, top: 224, width: 372, height: 386,
          zIndex: 44, borderRadius: 14, background: "#F9F3E3",
          border: "7px solid #D8C9A6", boxShadow: SH_D }}>
          {/* the same document, written by the tutor — legible, and it SHIPS */}
          {["def learn(skill):", "  ask(5, questions)", "  drill(real_cases)",
            "  plan(7, days)", "  test(no_hints)", "  return skill",
            "  # shipped"].map((ln, i) => {
            const k = build(i);
            if (k <= 0.01) return null;
            const c = [CLAY, GOLD, GREEN, SKY, "#7C6BD0", RED, GREEN][i];
            return (
              <div key={"b" + i} style={{ position: "absolute",
                left: 28 - (1 - k) * (i % 2 ? 430 : -430), top: 44 + i * 44,
                whiteSpace: "pre", fontFamily: MONO, fontWeight: 800, fontSize: 22,
                lineHeight: 1, color: c, opacity: Math.min(1, k * 1.6),
                transform: `scale(${0.8 + k * 0.2})` }}>
                {ln}
              </div>
            );
          })}
          {seal > 0.01 && (
            <div style={{ position: "absolute", left: 246, top: 284, width: 96, height: 96,
              borderRadius: "50%", background: hexa(GREEN, 0.18),
              border: `8px solid ${GREEN}`, opacity: seal,
              transform: `scale(${1.9 - seal * 0.9}) rotate(${-14 + seal * 14}deg)` }}>
              <div style={{ position: "absolute", left: 26, top: 34, width: 38, height: 20,
                borderLeft: `9px solid ${GREEN}`, borderBottom: `9px solid ${GREEN}`,
                transform: "rotate(-45deg)" }} />
            </div>
          )}
        </div>

        <Cam z={70}>
          <div style={{ position: "absolute", left: 452, top: 556 }}>
            <Mascot lf={f} size={168} gaze={0.1} nodAmp={4.6} nodSpeed={11} glasses={1}
              shock={E(f, 96, 104, 0, 0.6, OUT) - E(f, 104, 118, 0, 0.6, IO)}
              cheer={E(f, HK.sixM + 8, HK.sixM + 28, 0, 0.9, OUT)} />
          </div>
        </Cam>
      </div>
    </Scene>
  );
};

export const PrevP: React.FC = () => <Shell C={HookP} />;
export const PrevQ: React.FC = () => <Shell C={HookQ} />;
export const PrevR: React.FC = () => <Shell C={HookR} />;
