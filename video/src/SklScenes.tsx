import React from "react";
import { useCurrentFrame } from "remotion";
import { inter, fraunces } from "./fonts";
import { MONO, Mascot } from "./SlopKit";
import { SetFor, Extra, PAL } from "./SklSets";
/* ⛔⛔ `Cross` IS GONE FROM EVERY SCENE, 2026-08-15. I added it to raise a
   motion number and it did — and it buried the subject in the process. It hid
   the drawn route in ROOF on the first render, and at 8s it was covering the
   student with 286px cards in the one scene whose job is showing him stuck.
   Alex: *"the claude sprites arent doing anything… bro they are still not doing
   anything"* — partly because you could not SEE them.
   ⭐ THE RULE: motion that is not the subject competes with the subject. If a
   scene feels dead, animate what it is ABOUT — the characters, the mechanism —
   never a layer of generic travel on top. Kept in SklProps for reference; do
   not wire it back in. */
import { Bubble, Roadmap } from "./SklProps";
import type { SetKey } from "./SklSets";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, SH, SH_D, rnd, dkh, mxh,
  CLAY, GOLD, GREEN, RED, SKY, PAPER, INK, MUTE,
  Scene, Cam, Mark, Contact, Edge, Motes, Beam, PLACES,
  BookTower, PromptCard, PromptUI, Room, Lamp, Chair, Pinboard, GreyBook, Ring, Clamp,
  fillsAt, SLOT_KIND, PROJECT_FIELD, CARD_C,
  rock, shake, drift, squash,
} from "./SklWorld";

/* ===========================================================================
   REEL 106 "SKILL" · THE BODY.  Board: storyboards/106-skill.md.

   ⛔⛔ EVERY EVENT FRAME BELOW IS A MEASURED WORD ONSET from
      src/words_106skill.json, converted to LOCAL frames, with the PICTURE
      LEADING THE ONSET BY 4 FRAMES so the crossover — not the start — lands on
      the syllable. The scene `at` values (root frames):
        0 HOOK · 162 PROBLEM · 291 TURN · 384 STEP1 · 522 ACTIVATED ·
        582 STEP2 · 673 THROWN · 776 STEP3 · 829 ROADMAP · 947 STEP4 ·
        1084 CTA.   TOTAL 1172 (39.07s).

   ⛔⛔ THE `push` RANGE IS SCENE-LOCAL, NOT ROOT — `Scene` reads
      useCurrentFrame(), which restarts per Sequence. Reel 98 shipped 9 of 15
      shots with a frozen camera this way and reel 103 repeated it AFTER
      writing the warning into its own header, so every `push` below ends at or
      past its own scene's last local frame.

   ⛔⛔ THE STAGE, MEASURED. The panel is 1012 x 792. The root header pill owns
      y 0..112 and the slug owns y 730..792, so every hero object lives inside
      **y 118..726**.

   ⛔ THE ENEMY IS INTERNAL AND IT IS NEVER PERSONIFIED. No villain, no rival
      product, nobody to beat — [[feedback_outlier_lift_is_within_creator_only]]
      measured external villains at rel-median 1.00, never above 1.38x. The
      enemy here is an EMPTY CHAIR, and it is defeated by being SAT IN.

   ⛔ HONESTY (board §0): nothing in this file renders a Claude UI element
      labelled "Personal Tutor" — no such feature exists. The tutor is a
      CHARACTER. The one real product string allowed is PROJECT_FIELD.
   ========================================================================= */

/* ⛔⛔ ONE LOCATION PER SCENE — the whole point of this rewrite.
   `memory/reel-locations-library-vs-used.md` gives a MECHANICAL check: take
   len(set(location per shot)); if it is not close to the shot count the
   sequence is REDRESSED, not varied. v1 ran 10 scenes over 2 values that were
   the same room, which that memory scores as ONE. This table is the check —
   ten scenes, ten keys, and the palettes deliberately run through different
   hue families so every cut is a COLOUR change as well as a place change.
     S1 library   cold green fluoro   INT   stuck at 2am
     S2 door      gold flood on cold  INT   the turn (biggest colour jump)
     S3 bench     warm oak            INT   setting the project up
     S4 rehearsal teal + white flare  INT   the lights coming on
     S5 hall      dusk amber          INT   the textbook leaves
     S6 yard      wet slate, rain     EXT   thrown in
     S7 platform  cold night blue     EXT   the deadline
     S8 roof      dawn gold           EXT   the roadmap (brightest set)
     S9 exam      pale skylight       INT   graded
     S10 board    saturated night     EXT   the CTA                          */
export const LOC: SetKey[] = ["library", "door", "bench", "rehearsal", "hall",
  "yard", "platform", "roof", "exam", "board"];

/* the pinboard travels WITH the reel rather than living on one wall — it is
   the accumulator, so it has to be readable in ten different places. */
const BOARD = { x: 528, y: 132 };

/* ⭐⭐ THE SPRITE IS IN EVERY SCENE (THE-OPEN law 2 — characters stop scrolls).
   ⛔ NEVER a mark on his face: the body rect IS the face. */
/* ⛔⛔ THE SPRITES WERE NOT ACTING. Alex, at 8s: *"the claude sprites arent
   doing anything… bro they are still not doing anything"*. He was right and it
   was literal — S1 passed NO shock and NO cheer, so the student stood in place
   with only `Mascot`'s built-in hop for 129 frames while the scene's whole
   argument (he is stuck) played out around him.
   `Mascot` already animates arms on `cheer` and a jump + wide eyes on `shock`;
   the scenes were feeding it CONSTANTS. `rot` and `dy` are added here so a
   sprite can also carry POSTURE — slump, lean, recoil — because a character
   who reacts only with his face is still furniture with a face. */
const Student: React.FC<{ f: number; x?: number; y?: number; s?: number;
  gaze?: number; shock?: number; cheer?: number; rot?: number; dy?: number }> =
  ({ f, x = 176, y = 470, s = 150, gaze = 0.2, shock = 0, cheer = 0, rot = 0, dy = 0 }) => (
  <Cam z={46}>
    <div style={{ position: "absolute", left: x, top: y + dy,
      transform: `rotate(${rot}deg)`, transformOrigin: "50% 100%" }}>
      <Mascot lf={f} size={s} gaze={gaze} nodAmp={4.8} nodSpeed={12} glasses={1}
        shock={shock} cheer={cheer} />
    </div>
  </Cam>
);
const Tutor: React.FC<{ f: number; x?: number; y?: number; s?: number;
  gaze?: number; stern?: number; cheer?: number; rot?: number; dy?: number }> =
  ({ f, x = 736, y = 452, s = 162, gaze = -0.3, stern = 0.3, cheer = 0,
     rot = 0, dy = 0 }) => (
  <Cam z={45}>
    <div style={{ position: "absolute", left: x, top: y + dy,
      transform: `rotate(${rot}deg)`, transformOrigin: "50% 100%" }}>
      <Mascot lf={f} size={s} gaze={gaze} nodAmp={4.4} nodSpeed={10} beard={1}
        stern={stern} cheer={cheer} />
    </div>
  </Cam>
);

/** the per-scene shell: ITS OWN set, and the standing accumulator. `rf` is the
    ROOT frame so the pinboard's fill is derived, never typed per scene. */
const Body: React.FC<{ f: number; rf: number; k: SetKey; lightK?: number;
  board?: boolean; children?: React.ReactNode }> =
  ({ f, rf, k, lightK = 1, board = true, children }) => (<>
    <SetFor k={k} f={f} lightK={lightK} />
    {board && <Pinboard x={BOARD.x} y={BOARD.y} fill={fillsAt(rf)} f={f} s={0.80} z={30} w={392} />}
    {children}
  </>);


/* `Scene` still wants a Place for its glow/vignette tint; derive it from the
   location's own palette so the panel glow changes colour with the set too. */
const asPlace = (k: SetKey) => ({ back: PAL[k].sky, back2: PAL[k].sky2,
  floor: PAL[k].ground, floor2: PAL[k].ground2, lip: PAL[k].lip, key: PAL[k].key,
  horizon: PAL[k].horizon, grit: PAL[k].grit });

/* ─────────────────────────────────────────────────────────────────────────
   S1 · PROBLEM — f162..291 (129f).  THE INTERNAL ENEMY.
   VO: "Most people spend months learning a skill and still feel stuck, not
        because they're slow, but because nobody's teaching them correctly."
   local onsets (-4 lead): months 8 · stuck 42 · slow 66 · nobody's 80 ·
                           teaching 93 · correctly 110
   EVENT: the pages blizzard off the book and the ring keeps slipping back,
          then the lamp widens and the EMPTY CHAIR is revealed.
   §3 test — the picture adds the CAUSE, which the words only assert.
   ──────────────────────────────────────────────────────────────────────── */
export const S1: React.FC = () => {
  const f = useCurrentFrame(), rf = 162 + f;
  const blitz = E(f, 8, 120, 0, 1, LIN);
  /* ⛔ the ring TICKS AND FALLS BACK three times — it never passes a third.
     A bar that only fills reads as progress; this has to read as stuck. */
  /* ⛔ 0.09 of a ring is invisible — the scene's whole argument is that he
     keeps almost getting there and sliding back, and at that amplitude the
     audience cannot see it happen. 0.22, and a fourth attempt, so the struggle
     runs the full 129 frames instead of humming under a light band. */
  const slip = (a: number) => E(f, a, a + 9, 0, 0.22, OUT) - E(f, a + 9, a + 19, 0, 0.22, IO);
  const ring = 0.14 + slip(12) + slip(46) + slip(80) + slip(112);
  const reveal = E(f, 80, 96, 0, 1, OUT);       /* "nobody's teaching them" */
  /* ⭐ HE REACTS TO HIS OWN SCENE. A pulse on each of the four times the ring
     slips back, so the character is visibly the one it is happening to — the
     slip stops being a graphic and becomes his problem. */
  const react = (a: number) => E(f, a + 6, a + 11, 0, 0.75, OUT) - E(f, a + 11, a + 26, 0, 0.75, IO);
  const jolt = react(12) + react(46) + react(80) + react(112);
  /* and he sinks over the 129 frames — four months of this */
  const slump = E(f, 10, 120, 0, 1, LIN);
  /* the moment he looks up: "nobody's teaching them correctly" */
  const lookUp = E(f, 82, 94, 0, 1, OUT);
  return (
    <Scene p={asPlace("library")} slug="MONTHS IN. STILL STUCK." push={[0, 129, 1.16]} vig={0.50}>
      <Body f={f} rf={rf} k="library">
        {/* ⭐ THE SPRITES SPEAK. The whole body carried ONE bubble; a
            character who never says anything is a prop with a face. */}
        <Bubble x={236} y={264} w={330} t="NOBODY IS TEACHING ME."
          k={E(f, 80, 92, 0, 1, BACK) - E(f, 112, 124, 0, 1, IO)}
          f={f} at={80} z={95} />
        {/* the place is POPULATED: a librarian shelving, on her own clock */}
        <Extra f={f} x={806} y={392} s={112} kind="librarian" flip />
        {/* the student, working hard, going nowhere */}
        {/* ⭐⭐⭐ THE LINE IS TWO QUANTITIES IN TENSION, SO DRAW BOTH.
            Alex: *"at 6 secs there isnt something going on that shows 'most
            people still spend months learning a skill and still feel stuck' —
            the animation doesnt show that, and that needs to apply to each
            animation throughout this entire video"*.
            The VO states a CONTRAST — months go up, progress does not — and the
            scene was showing a man at a desk with some paper moving. Neither
            quantity was on screen, so the picture asserted nothing and the words
            carried the whole beat.
            Now: six month-cards fill one at a time across the 129 frames, while
            the progress ring beside them keeps slipping back to where it began.
            THE GAP BETWEEN THE TWO IS THE SENTENCE. Nothing here is a label —
            the months are countable, the ring is measurable, and the viewer
            reads "six months in, no further on" without being told.
            ⛔ x starts at 100: S1's push is 1.16, so anything left of
            506-486/1.16 = 87 walks off-frame by the scene's last frame. */}
        {/* ⛔ AND THEY HAVE TO SIT ON THEIR OWN GROUND. First cut drew the six
            cards straight onto a bookshelf packed with similarly-sized coloured
            books and they vanished into it — a counter camouflaged against its
            own background counts as not drawn. A dark backing plate turns the
            row into ONE INSTRUMENT you read as a tally, and separates it from
            the set behind. */}
        <div style={{ position: "absolute", left: 84, top: 218, width: 476, height: 122,
          zIndex: 56, borderRadius: 14, background: hexa("#15130F", 0.86),
          border: `4px solid ${hexa("#3A352C", 0.9)}`, boxShadow: SH_D }} />
        {Array.from({ length: 6 }, (_, i) => {
          const a = 10 + i * 19;
          const on = E(f, a, a + 9, 0, 1, BACK);
          const c = [CLAY, GOLD, GREEN, SKY, RED, "#7C6BD0"][i];
          const dd = drift(f, i * 2.3, on * 0.8);
          return (
            <div key={"mo" + i} style={{ position: "absolute",
              left: 100 + i * 76 + dd.x, top: 238 + (1 - on) * 30 + dd.y, zIndex: 58,
              width: 68, height: 86, borderRadius: 8, overflow: "hidden",
              opacity: 0.30 + on * 0.70,
              background: on > 0.5 ? mxh(c, 0.04) : "#3A3730",
              border: `3px solid ${on > 0.5 ? dkh(c, 0.34) : "#2C2A25"}`,
              boxShadow: on > 0.5 ? SH : undefined,
              transform: `scale(${0.72 + on * 0.28}) rotate(${dd.r * 0.7}deg)` }}>
              {/* a torn-off month, not a coloured tile */}
              <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 20,
                background: on > 0.5 ? dkh(c, 0.30) : "#2C2A25" }} />
              {Array.from({ length: 9 }, (_, j) => (
                <div key={j} style={{ position: "absolute",
                  left: 9 + (j % 3) * 17, top: 32 + Math.floor(j / 3) * 16,
                  width: 10, height: 10, borderRadius: 2,
                  background: hexa("#FBF6EA", on > 0.5 ? 0.52 : 0.14) }} />
              ))}
            </div>
          );
        })}

        {/* ⛔ 152px behind a pale ring and a flying card is not a character.
            190px, moved clear, and z-lifted so the thing that is stuck is the
            thing you look at. */}
        <Student f={f} x={196} y={430} s={214}
          gaze={-0.15 + lookUp * 0.75} shock={jolt}
          dy={slump * 26 - lookUp * 10} rot={slump * 5 - lookUp * 5} />
        <GreyBook x={352} y={604} s={0.86} z={38} open={1} />
        <BookTower x={862} y={618} k={0} f={f} h={196} w={132} z={34} />

        {/* ⭐ ~30 large sheets crossing frame on a curve — the scene's motion
            engine. Measured: many large bright objects travelling, 3.77->5.67. */}
        {/* ⛔⛔ "JUST A COUPLE COLORED PAPERS AND STUFF — TOO BORING". Thirty
            sheets in ONE 74-108px band, all the same pale cream, all fading to
            0.30 alpha: uniform, small and half-transparent, which is every
            defect this reel has produced in one object. Sixteen now, OPAQUE,
            across a 3.2x size range, and they carry the six house accents so
            what comes off the book is countable rather than a beige smear. */}
        {Array.from({ length: 16 }, (_, i) => {
          const t = ((blitz * 130 + i * 28) % 150) / 150;
          if (t <= 0.01) return null;
          const px = 352 + t * (250 + rnd(i, 2) * 340);
          const py = 596 - t * (340 + rnd(i, 5) * 190) + Math.sin(t * 3.1 + i) * 26;
          const TIER = [186, 78, 128, 64, 152, 96, 112, 70];
          const w = TIER[i % TIER.length];
          const c = [CLAY, GOLD, GREEN, SKY, RED, "#7C6BD0"][i % 6];
          return (
            <div key={"sh" + i} style={{ position: "absolute", left: px, top: py,
              width: w, height: w * 0.72, zIndex: 42,
              borderRadius: 5, background: i % 3 === 0 ? "#F4EEDD" : c,
              border: `3px solid ${i % 3 === 0 ? "#D8CDB4" : dkh(c, 0.3)}`,
              opacity: 1,
              transform: `rotate(${(rnd(i, 3) - 0.5) * 150 * t}deg)`, boxShadow: SH }} />
          );
        })}

        {/* ⭐⭐ AND THEY LAND SOMEWHERE — a pile of read pages that CLIMBS for
            the whole 129 frames, one every 8 frames. The scene's claim is that
            he puts the months in and gets nowhere, so the effort has to be
            visible as a QUANTITY too: this stack grows all the way up while the
            ring beside it never advances and the six months fill above. Three
            counters, one of them stuck — that is the sentence, drawn. */}
        {Array.from({ length: 14 }, (_, i) => {
          const a = 12 + i * 8;
          const k = E(f, a, a + 7, 0, 1, OUT);
          if (k <= 0.01) return null;
          const c = [CLAY, GOLD, GREEN, SKY, RED, "#7C6BD0"][i % 6];
          return (
            <div key={"rp" + i} style={{ position: "absolute",
              left: 628 + (rnd(i, 3) - 0.5) * 26, top: 652 - i * 15 - (1 - k) * 90,
              width: 150 + rnd(i, 7) * 26, height: 15, zIndex: 43 + i,
              borderRadius: 3, background: i % 3 === 0 ? "#EFE6CE" : c,
              border: `2px solid ${i % 3 === 0 ? "#CDBF9F" : dkh(c, 0.32)}`,
              opacity: Math.min(1, k * 1.6), boxShadow: SH,
              transform: `rotate(${(rnd(i, 5) - 0.5) * 7}deg) scale(${0.7 + k * 0.3})`,
              transformOrigin: "50% 100%" }} />
          );
        })}

        {/* the stuck ring, 220px, not a small prop */}
        <Ring x={470} y={520} k={ring} s={0.72} c={CLAY} f={f} z={44} />

        {/* ⛔ THE ENEMY. The lamp WIDENS onto it — the room is not dimmed to
            make it read (THE-OPEN law 1); the chair is LIT brighter. */}
        <div style={{ position: "absolute", left: 0, top: 0, right: 0, bottom: 0, zIndex: 26,
          opacity: reveal }}>
          <Beam x={196} y={40} top={150} bot={560} len={520} c="#F2DCA6" o={0.28} z={26} f={f} />
        </div>
        <Chair x={196} y={664} s={1.34} face={1} c="#5A4A3A" />
        <div style={{ position: "absolute", left: 62, top: 656, width: 272, height: 34, zIndex: 27,
          borderRadius: "50%", opacity: reveal,
          background: `radial-gradient(ellipse, ${hexa(GOLD, 0.34)}, transparent 72%)` }} />
      </Body>
    </Scene>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
   S2 · TURN — f291..384 (93f).  THE SEAT IS TAKEN.
   VO: "But this one hidden mode in Claude called a personal tutor changes
        everything."
   local: But 0 · hidden 5 · mode 12 · Claude 22 · called 27 · personal 40 ·
          tutor 49 · changes 58 · everything 67
   EVENT: the blizzard FREEZES mid-air, the tutor crosses the full table and
          DROPS into the chair; every suspended sheet falls on the impact.
   ⛔ Nothing here is labelled. No badge, no toggle. A character sat down.
   ──────────────────────────────────────────────────────────────────────── */
export const S2: React.FC = () => {
  const f = useCurrentFrame(), rf = 291 + f;
  const SIT = 40;                                   /* on "personal" */
  const walk = E(f, 14, SIT, 0, 1, IO);
  const sit = E(f, SIT, SIT + 9, 0, 1, OUT);
  /* the drop now runs SIT+4 .. 90 rather than dying at SIT+26 and leaving 27
     frames of hold behind it */
  const fall = E(f, SIT + 4, 90, 0, 1, IN_Q);      /* the frozen sheets drop */
  const kick = shake(f, SIT + 3, 13, 10);
  /* ⭐ THIS IS THE REEL'S TURN — somebody finally sits down — and the tutor
     was 158px against a 148px student, i.e. tied for third-largest thing on
     screen. The one event the scene exists for has to be the one the eye lands
     on. 216px, and the chair grows with him so the seat still reads. */
  const CH = { x: 300, y: 664, s: 1.62, size: 216 };
  const seatTop = CH.y - 128 * CH.s + 14 * CH.s;
  return (
    <Scene p={asPlace("door")} slug="SOMEBODY FINALLY SITS DOWN" push={[0, 93, 1.15]} vig={0.46}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1,
        transform: `translate(${kick.x}px, ${kick.y}px)` }}>
        <Body f={f} rf={rf} k="door">
          <Student f={f} x={700} y={452} s={182} gaze={0.4 - E(f, SIT, SIT + 8, 0, 0.7, OUT)}
            shock={E(f, SIT, SIT + 7, 0, 0.8, OUT) - E(f, SIT + 7, SIT + 20, 0, 0.8, IO)}
            cheer={E(f, SIT + 16, SIT + 30, 0, 0.85, OUT)}
            rot={-E(f, SIT, SIT + 6, 0, 5, OUT) + E(f, SIT + 6, SIT + 22, 0, 5, IO)} />
          <GreyBook x={820} y={604} s={0.8} z={38} open={1} />

          {/* the sheets held mid-air from f0, then dropped by the impact */}
          {/* ⛔⛔ 22 SHEETS AT 78x56 WAS A FIELD OF CONFETTI. Alex at 11s:
              *"more hierarchical animations so its easy to understand rather
              than just complex scenes where everything seems the same size"*.
              Twenty-two identical pale squares give the eye nowhere to land and
              carry no information — count is not detail and it is not
              hierarchy. NINE, across a 3.4x size range (64..218), so there is a
              readable big / medium / small instead of one uniform band. */}
          {Array.from({ length: 9 }, (_, i) => {
            const hx = 430 + rnd(i, 2) * 440, hy = 196 + rnd(i, 5) * 300;
            const w = [218, 82, 148, 64, 190, 104, 168, 74, 126][i];
            return (
              <div key={"fz" + i} style={{ position: "absolute", left: hx,
                top: hy + fall * (700 - hy + 40), width: w, height: w * 0.72, zIndex: 42,
                borderRadius: 6, background: "#F4EEDD", border: "3px solid #D8CDB4",
                opacity: 0.9 - fall * 0.35, boxShadow: SH,
                transform: `rotate(${(rnd(i, 3) - 0.5) * 120 + fall * 90}deg)` }} />
            );
          })}

          <Chair x={CH.x} y={CH.y} s={CH.s} face={1} c="#5A4A3A" />
          {/* ⛔ THE ARRIVAL COSTS SOMETHING: squash, dust ring, and the chair
              itself recoils. Nothing in a reel lands and simply stops. */}
          <Cam z={48}>
            <div style={{ position: "absolute", left: -340 + walk * (CH.x - CH.size / 2 + 340),
              top: seatTop - CH.size + 30 + (1 - sit) * -34,
              transform: `scale(${squash(f, SIT, 0.28)})`, transformOrigin: "50% 100%" }}>
              <Mascot lf={f} size={CH.size} gaze={-0.35} nodAmp={4.4} nodSpeed={10}
                beard={1} stern={0.35} />
            </div>
          </Cam>
          {/* ⭐ HE ACTS. The scene's whole event was a sprite changing position;
              a character who arrives and then does nothing is furniture with a
              face. The line is the mechanism, not a product label — prompt 1
              literally instructs Claude to find out what you already know
              before it teaches anything, so this is the tutor doing the thing
              the reel is selling. ⛔ NOT "Personal Tutor" — that is not a
              feature and `TUTOR_LABEL_BANNED` exists to keep it off screen. */}
          <Bubble x={352} y={196} w={352} t="WHAT DO YOU ALREADY KNOW?"
            k={E(f, SIT + 9, SIT + 19, 0, 1, BACK)} f={f} at={SIT + 9} z={92} />

          {sit > 0.02 && sit < 1 && (
            <div style={{ position: "absolute", left: CH.x - 170, top: seatTop + 104, width: 340,
              height: 54, zIndex: 47, borderRadius: "50%", opacity: (1 - sit) * 0.9,
              background: `radial-gradient(ellipse, ${hexa("#D6C8A8", 0.9)}, transparent 70%)`,
              transform: `scale(${0.45 + sit * 1.5})` }} />
          )}
        </Body>
      </div>
    </Scene>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
   S3 · STEP 1 — f384..522 (138f).  THE PROJECT, AND THE FIRST PROMPT.
   VO: "To activate it, first go to Claude, open a new project and paste this
        prompt along with the skill you want to learn in the instructions."
   local: go 15 · Claude 22 · open 27 · project 46 · paste 61 · skill 83 ·
          instructions 109
   EVENT: the project folder UNFOLDS (this scene's event) and card 1 arcs in
          and slots into the instructions panel — the slot is the SECOND beat,
          never the scene, or S3/S5/S7/S9 become the same shot four times.
   ✅ REAL: Claude Projects have a project instructions field. One text chip.
   ──────────────────────────────────────────────────────────────────────── */
export const S3: React.FC = () => {
  const f = useCurrentFrame(), rf = 384 + f;
  const open = E(f, 27, 46, 0, 1, BACK);            /* "open a new project" */
  const fly = E(f, 61, 78, 0, 1, IO);               /* "paste this prompt"  */
  const slot = E(f, 74, 82, 0, 1, OUT);
  const namePlate = E(f, 83, 94, 0, 1, BACK);       /* "the skill you want" */
  /* ⭐ the field fills once the card is in — card causes folder causes text */
  const rise = E(f, 80, 92, 0, 1, BACK);
  const typ = E(f, 88, 134, 0, 1, LIN);
  return (
    <Scene p={asPlace("bench")} slug={`CLAUDE PROJECT · ${PROJECT_FIELD}`} push={[0, 138, 1.17]} vig={0.46}>
      <Body f={f} rf={rf} k="bench">
        {/* ⭐ THE SPRITES SPEAK. The whole body carried ONE bubble; a
            character who never says anything is a prop with a face. */}
        <Bubble x={452} y={244} w={300} t="PASTE IT HERE."
          k={E(f, 61, 73, 0, 1, BACK) - E(f, 112, 124, 0, 1, IO)}
          f={f} at={61} flip z={95} />
        <Tutor f={f} x={782} y={470} s={216} gaze={-0.4} stern={0.2}
            dy={-E(f, 61, 71, 0, 12, OUT)} rot={E(f, 61, 69, 0, -5, OUT) - E(f, 69, 84, 0, -5, IO)}
            cheer={E(f, 74, 92, 0, 0.8, OUT)} />
        <Student f={f} x={104} y={498} s={182} gaze={0.45 - E(f, 61, 74, 0, 0.5, OUT)}
            shock={E(f, 74, 82, 0, 0.7, OUT) - E(f, 82, 96, 0, 0.7, IO)}
            cheer={E(f, 96, 116, 0, 0.8, OUT)} />

        {/* the Claude mark lands on the table — audience filter, big and early */}
        <div style={{ position: "absolute", left: 250, top: 430, zIndex: 52,
          transform: `scale(${squash(f, 22, 0.16)})`, opacity: E(f, 18, 26, 0, 1, OUT) }}>
          <Mark x={0} y={0} s={74} z={52} />
        </div>

        {/* ---- THE EVENT: the project folder unfolds open on the table ---- */}
        <div style={{ position: "absolute", left: 236, top: 486, zIndex: 50,
          transform: `scale(${0.9 + open * 0.1})`, transformOrigin: "50% 100%" }}>
          <Contact x={-6} y={228} w={438} z={-1} o={0.34} />
          {/* the back leaf, opening */}
          <div style={{ position: "absolute", left: 0, top: 8, width: 424,
            height: 214 * open, borderRadius: 10, background: "#E9DFC6",
            border: "4px solid #C6B896", boxShadow: SH, overflow: "hidden" }}>
            {/* ⛔ ONE text chip in the whole shot, and it is now PromptUI's own
                header — this folder used to carry a second `PROJECT
                INSTRUCTIONS` chip, which put the identical string twice in one
                frame the moment the panel arrived. That is reel 105 round 2's
                "duplicate of the header" defect. The recess keeps the shape,
                the panel keeps the words. */}
            {/* the empty instructions recess — the gap the card fills */}
            <div style={{ position: "absolute", left: 16, top: 56, width: 392, height: 142,
              borderRadius: 9, background: hexa("#B9A883", 0.5),
              border: `3px dashed ${hexa("#6E5F44", 0.55)}`, opacity: open }} />
          </div>
          {/* the front cover, laid flat */}
          <div style={{ position: "absolute", left: 0, top: 216, width: 424, height: 30,
            borderRadius: 8, background: "#D6C7A4", border: "4px solid #B8A882", boxShadow: SH }} />
        </div>

        {/* ---- card 1 arcs in and SLOTS into the instructions ---- */}
        <div style={{ position: "absolute",
          left: 1010 - fly * 738, top: 300 + Math.sin(fly * Math.PI) * -84 + fly * 250,
          zIndex: 58, opacity: open,
          transform: `rotate(${(1 - fly) * 26}deg) scale(${1 - slot * 0.10 + squash(f, 74, 0.14) - 1})`,
          transformOrigin: "50% 50%" }}>
          <PromptCard x={drift(f, 4, 0.95).x} y={drift(f, 4, 0.95).y} n={1} w={168} z={58} rot={drift(f, 4, 0.95).r} />
        </div>

        {/* ⭐⭐ THE PROMPT, VISIBLE. The VO says "paste THIS prompt" and until
            now the picture answered with a blank card. It rises out of the
            folder the card just went into, and the text types. Left of x520 so
            it never covers the Pinboard accumulator at BOARD.x = 528. */}
        <div style={{ position: "absolute", left: 52, top: 250, zIndex: 76,
          opacity: Math.min(1, rise * 1.4) }}>
          <PromptUI x={0} y={0} n={1} f={f} t={typ} s={0.86 * (0.92 + rise * 0.08)} z={76} />
        </div>

        {/* the blank name plate — the viewer's own skill; we do not pick one */}
        <div style={{ position: "absolute", left: 268, top: 700, width: 208, height: 44,
          zIndex: 60, borderRadius: 8, background: "#F2EAD6", border: "3px solid #C6B896",
          boxShadow: SH, opacity: namePlate,
          transform: `scale(${0.8 + namePlate * 0.2})` }}>
          <div style={{ position: "absolute", left: 14, top: 18, right: 14, height: 7,
            borderRadius: 4, background: "#CFC0A0" }} />
        </div>
      </Body>
    </Scene>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
   S4 · ACTIVATED — f522..582 (60f).  THE PAYOFF OF STEP 1.
   VO: "Instantly your personal tutor mode will get activated."
   local: Instantly 0 · tutor 15 · get 36 · activated 40
   ⛔ "Activated" is depicted as LIGHT and POSTURE, never as a status label.
   ──────────────────────────────────────────────────────────────────────── */
export const S4: React.FC = () => {
  const f = useCurrentFrame(), rf = 522 + f;
  const snap = E(f, 0, 3, 0.34, 1, OUT);            /* the lamp SNAPS to full */
  const warm = E(f, 2, 12, 0, 1, OUT);
  const tick = E(f, 40, 54, 0, 1, OUT);             /* the ring finally moves */
  return (
    <Scene p={asPlace("rehearsal")} slug="THE LAMP COMES ON" push={[0, 60, 1.15]} vig={0.42}>
      <Body f={f} rf={rf} k="rehearsal" lightK={snap}>
        {/* ⭐ THE SPRITES SPEAK. The whole body carried ONE bubble; a
            character who never says anything is a prop with a face. */}
        <Bubble x={322} y={212} w={320} t="READY WHEN YOU ARE."
          k={E(f, 12, 24, 0, 1, BACK) - E(f, 46, 58, 0, 1, IO)}
          f={f} at={12} flip z={95} />
        {/* the table floods from cool to warm as the cone lands */}
        <div style={{ position: "absolute", left: 0, top: 392, right: 0, bottom: 0, zIndex: 14,
          background: `linear-gradient(180deg, ${hexa(GOLD, 0.30 * warm)}, ${hexa(GOLD, 0.04 * warm)})` }} />
        {/* ⛔⛔ THE SCENE ALEX POINTED AT, AND HE WAS EXACTLY RIGHT. At 18s both
            sprites held a static pose with one late `cheer` between them, at
            172 and 146px — the smallest pair in the reel, in the scene where
            the tutor is supposed to COME ALIVE. This is the beat the whole
            first half is building to and nobody in it moved. */}
        <Tutor f={f} x={598} y={424} s={228} gaze={0.35} stern={0.1}
          dy={-E(f, 10, 20, 0, 16, OUT)}
          rot={E(f, 10, 18, 0, 7, OUT) - E(f, 18, 36, 0, 7, IO)}
          cheer={E(f, 15, 34, 0, 0.85, OUT)} />
        <Chair x={640} y={676} s={1.30} face={1} c="#5A4A3A" />
        <Student f={f} x={168} y={462} s={196}
          gaze={0.5 - E(f, 12, 24, 0, 0.85, OUT)}
          shock={E(f, 12, 20, 0, 0.8, OUT) - E(f, 20, 34, 0, 0.8, IO)}
          rot={-E(f, 12, 20, 0, 6, OUT) + E(f, 20, 36, 0, 6, IO)}
          cheer={E(f, 40, 58, 0, 0.9, OUT)} />
        {/* the ring from S1, stuck all reel, ticks FORWARD for the first time */}
        <Ring x={356} y={556} k={0.14 + tick * 0.13} s={0.62} c={GREEN} f={f} z={44} />
      </Body>
    </Scene>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
   S5 · STEP 2 — f582..673 (91f).  THE TEXTBOOK LEAVES THE TABLE.
   VO: "Second, paste this prompt and instead of explaining concepts like a
        boring textbook,"
   local: Second 0 · paste 4 · prompt 16 · explaining 37 · concepts 46 ·
          boring 60 · textbook 66
   EVENT: the grey book emits flat grey rules that pile up — then the tutor
          SHOVES it off the table edge. The slot is the second beat.
   ⛔ The textbook and its rules are the ONLY desaturated objects in the reel.
      The contrast IS the argument.
   ──────────────────────────────────────────────────────────────────────── */
export const S5: React.FC = () => {
  const f = useCurrentFrame(), rf = 582 + f;
  const fly = E(f, 4, 18, 0, 1, IO);
  const emit = E(f, 28, 72, 0, 1, LIN);
  const shove = E(f, 66, 86, 0, 1, IN_Q);           /* "boring textbook" */
  const kick = shake(f, 66, 9, 8);
  const rise = E(f, 18, 28, 0, 1, BACK);
  const typ = E(f, 24, 76, 0, 1, LIN);
  return (
    <Scene p={asPlace("hall")} slug="NOT A TEXTBOOK" push={[0, 91, 1.16]} vig={0.48}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1,
        transform: `translate(${kick.x}px, ${kick.y}px)` }}>
        <Body f={f} rf={rf} k="hall">
        {/* ⭐ THE SPRITES SPEAK. The whole body carried ONE bubble; a
            character who never says anything is a prop with a face. */}
        <Bubble x={392} y={238} w={330} t="FORGET THE TEXTBOOK."
          k={E(f, 28, 40, 0, 1, BACK) - E(f, 74, 86, 0, 1, IO)}
          f={f} at={28} flip z={95} />
          <Extra f={f} x={62} y={430} s={104} kind="runner" />
          <Tutor f={f} x={716} y={436} s={218} gaze={-0.45} stern={0.55}
            rot={E(f, 62, 68, 0, 7, OUT) - E(f, 68, 84, 0, 7, IO)}
            dy={-E(f, 62, 68, 0, 12, OUT) + E(f, 68, 84, 0, 12, IO)} />
          <Student f={f} x={82} y={498} s={178} gaze={0.4 - shove * 0.5}
            shock={E(f, 66, 73, 0, 0.85, OUT) - E(f, 73, 88, 0, 0.85, IO)}
            rot={E(f, 66, 72, 0, -6, OUT) - E(f, 72, 88, 0, -6, IO)} />

          {/* card 2 arcs in and slots */}
          <div style={{ position: "absolute", left: 1010 - fly * 470,
            top: 300 - Math.sin(fly * Math.PI) * 70, zIndex: 58,
            transform: `rotate(${(1 - fly) * 24}deg)` }}>
            <PromptCard x={drift(f, 9, 0.95).x} y={drift(f, 9, 0.95).y} n={2} w={150} z={58} rot={drift(f, 9, 0.95).r} />
          </div>

          {/* the prompt that replaces the textbook — it types WHILE the grey
              book is being shoved off, so the swap is one continuous idea */}
          <div style={{ position: "absolute", left: 42, top: 250, zIndex: 76,
            opacity: Math.min(1, rise * 1.4) }}>
            <PromptUI x={0} y={0} n={2} f={f} t={typ} s={0.84 * (0.92 + rise * 0.08)} z={76} />
          </div>

          {/* the grey book emitting flat grey rules that pile up, inert */}
          <div style={{ position: "absolute", left: shove * 620, top: shove * 300, zIndex: 50,
            transform: `rotate(${shove * 62}deg)`, opacity: 1 - shove * 0.15 }}>
            <GreyBook x={330} y={600} s={1.20} z={50} open={1} />
            {Array.from({ length: 9 }, (_, i) => {
              const t = E(emit, i * 0.09, i * 0.09 + 0.30, 0, 1, OUT);
              return (
                <div key={"gl" + i} style={{ position: "absolute",
                  left: 226 + t * 8, top: 556 - i * 20 * t, width: 208 * t, height: 12,
                  borderRadius: 6, background: "#9C9A93", opacity: 0.30 + t * 0.44, zIndex: 49 }} />
              );
            })}
          </div>
        </Body>
      </div>
    </Scene>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
   S6 · THROWN — f673..776 (103f).  THE BEST EVENT IN THE REEL.
   VO: "Claude will throw you into real situations until making mistakes
        becomes impossible."
   local: throw 2 · you 5 · into 7 · real 17 · situations 25 · until 39 ·
          mistakes 48 · becomes 59 · impossible 71
   ⭐ THE VO HANDS US THE VERB: **THROW**. ANIMATION-QUALITY §3 — draw the noun
      and the verb the sentence actually uses.
   ⛔ The mistake count is the number of MARKS, never a numeral: 5 -> 3 -> 1 -> 0.
   ──────────────────────────────────────────────────────────────────────── */
export const S6: React.FC = () => {
  const f = useCurrentFrame(), rf = 673 + f;
  const wind = E(f, -2, 2, 0, 1, OUT);              /* the 4f anticipation */
  const toss = E(f, 2, 22, 0, 1, IO);               /* the throw + travel   */
  const boxUp = E(f, 17, 27, 0, 1, BACK);           /* "real situations"    */
  const kick = shake(f, 22, 14, 10);
  /* four reps, marks falling 5 -> 3 -> 1 -> 0 */
  /* ⭐ the four reps ARE the plot of this scene — mistakes going 5 -> 3 -> 1
     -> 0. Bunched into f39..71 they read as one event; spread across f26..81
     they read as somebody getting better, which is the point. */
  const REPS = [26, 45, 63, 81];
  const marks = REPS.reduce((n, a) => (f >= a ? n : n), 5);
  const left = f < REPS[0] ? 5 : f < REPS[1] ? 3 : f < REPS[2] ? 1 : 0;
  const sealed = E(f, REPS[3], REPS[3] + 8, 0, 1, OUT);
  return (
    <Scene p={asPlace("yard")} slug="THROWN IN. FOUR TIMES." push={[0, 103, 1.17]} vig={0.44}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1,
        transform: `translate(${kick.x}px, ${kick.y}px)` }}>
        <Body f={f} rf={rf} k="yard">
        {/* ⭐ THE SPRITES SPEAK. The whole body carried ONE bubble; a
            character who never says anything is a prop with a face. */}
        <Bubble x={146} y={242} w={310} t="TRY IT FOR REAL."
          k={E(f, 24, 36, 0, 1, BACK) - E(f, 84, 96, 0, 1, IO)}
          f={f} at={24} z={95} />
          {/* a sparring partner — you are thrown in AT somebody, not at a box */}
          <Extra f={f} x={806} y={470} s={128} kind="sparrer" flip />
          <Tutor f={f} x={96} y={444} s={218} gaze={0.5} stern={0.5}
              dy={-E(f, 26, 36, 0, 12, OUT)}
              rot={E(f, 26, 34, 0, 5, OUT) - E(f, 34, 50, 0, 5, IO)}
              cheer={E(f, 82, 100, 0, 0.85, OUT)} />

          {/* ---- THE SITUATION BOX: a real lit practice set, 3x desk scale.
              ⛔ Not a wireframe, not a labelled card — reel 105 round 12:
              "a correct mapping rendered in boxes is still boxes." */}
          <div style={{ position: "absolute", left: 386, top: 700 - boxUp * 396,
            width: 470, height: 396, zIndex: 40, opacity: boxUp,
            transform: `scale(${0.86 + boxUp * 0.14})`, transformOrigin: "50% 100%" }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: 18,
              background: `linear-gradient(172deg, #F4E9CE 0%, #DCC79C 100%)`,
              border: `6px solid ${sealed > 0.5 ? GREEN : "#B79A66"}`, boxShadow: SH_D }} />
            {/* the set inside it — furniture, colour, depth */}
            <div style={{ position: "absolute", left: 22, top: 190, right: 22, height: 180,
              borderRadius: 12, background: `linear-gradient(180deg, #C9A87A, #A9885E)` }} />
            {[CLAY, GOLD, GREEN, SKY].map((c, i) => (
              <div key={"pr" + i} style={{ position: "absolute", left: 40 + i * 106, top: 96,
                width: 86, height: 108, borderRadius: 10, background: c,
                border: `4px solid ${dkh(c, 0.28)}`, boxShadow: SH,
                transform: `translateY(${Math.sin(f / 9 + i * 1.6) * 7}px)` }} />
            ))}
            {/* the student, running the situation */}
            <div style={{ position: "absolute", left: 178 + Math.sin(f / 7) * 46, top: 214 }}>
              <Mascot lf={f} size={112} gaze={Math.sin(f / 7) * 0.6} nodAmp={6} nodSpeed={7}
                glasses={1} />
            </div>
            {/* ⛔ THE MISTAKES ARE MARKS ON THE RIM, NEVER A NUMBER */}
            {Array.from({ length: 5 }, (_, i) => (
              <div key={"x" + i} style={{ position: "absolute", left: 34 + i * 84, top: -22,
                width: 46, height: 46, borderRadius: 10, zIndex: 6,
                background: i < left ? RED : hexa("#8C8272", 0.22),
                border: `4px solid ${i < left ? dkh(RED, 0.3) : hexa("#6E6455", 0.3)}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 24,
                color: i < left ? "#FBF3E4" : hexa("#F0E8D6", 0.3),
                transform: `scale(${i < left ? 1 : 0.72})` }}>x</div>
            ))}
          </div>

          {/* the throw: the student travels the arc into the box */}
          {toss < 1 && (
            <Cam z={54}>
              <div style={{ position: "absolute",
                left: 214 + toss * 342, top: 470 - Math.sin(toss * Math.PI) * 250 + toss * 96,
                transform: `rotate(${toss * 300}deg) scale(${1 + wind * 0.12 - toss * 0.22})`,
                transformOrigin: "50% 50%" }}>
                <Mascot lf={f} size={132} gaze={0.3} nodAmp={3} nodSpeed={9}
                  glasses={1} shock={1} />
              </div>
            </Cam>
          )}
        </Body>
      </div>
    </Scene>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
   S7 · STEP 3 — f776..829 (53f).  THE DEADLINE BITES.
   VO: "Third, to finish any goal, you must have a deadline."
   local: Third 0 · finish 6 · goal 10 · must 17 · deadline 36
   EVENT: card 3 slots, then a heavy date clamp DROPS and bites the table —
          the table jolts and every loose object hops once.
   Shortest scene in the reel and it is one hit.
   ──────────────────────────────────────────────────────────────────────── */
export const S7: React.FC = () => {
  const f = useCurrentFrame(), rf = 776 + f;
  const fly = E(f, 6, 16, 0, 1, IO);
  const drop = E(f, 28, 36, 0, 1, IN_Q);            /* "a deadline" */
  const kick = shake(f, 36, 17, 12);
  const hop = E(f, 36, 40, 0, 1, OUT) - E(f, 40, 48, 0, 1, IO);
  /* ⛔ 53f is the shortest scene in the reel, so this types FAST and is still
     going when the clamp bites — which is the point: the deadline lands on a
     prompt mid-flight, not on a finished one. */
  const rise = E(f, 14, 22, 0, 1, BACK);
  const typ = E(f, 18, 50, 0, 1, LIN);
  return (
    <Scene p={asPlace("platform")} slug="A DATE THAT DOES NOT MOVE" push={[0, 53, 1.08]} vig={0.46}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1,
        transform: `translate(${kick.x}px, ${kick.y}px)` }}>
        <Body f={f} rf={rf} k="platform">
        {/* ⭐ THE SPRITES SPEAK. The whole body carried ONE bubble; a
            character who never says anything is a prop with a face. */}
        <Bubble x={446} y={234} w={290} t="PICK A DATE."
          k={E(f, 12, 22, 0, 1, BACK) - E(f, 42, 51, 0, 1, IO)}
          f={f} at={12} flip z={95} />
          <Extra f={f} x={62} y={452} s={112} kind="guard" />
          <Tutor f={f} x={768} y={446} s={212} gaze={-0.4} stern={0.5}
            dy={hop * 14} rot={hop * -4} />
          <Student f={f} x={112} y={472 - hop * 18} s={186} gaze={0.3} shock={hop} />

          <div style={{ position: "absolute", left: 1010 - fly * 500, top: 288, zIndex: 58,
            transform: `rotate(${(1 - fly) * 20}deg)` }}>
            <PromptCard x={drift(f, 14, 0.95).x} y={drift(f, 14, 0.95).y} n={3} w={148} z={58} rot={drift(f, 14, 0.95).r} />
          </div>

          <div style={{ position: "absolute", left: 14, top: 250, zIndex: 76,
            opacity: Math.min(1, rise * 1.4) }}>
            <PromptUI x={0} y={0} n={3} f={f} t={typ} s={0.82 * (0.92 + rise * 0.08)} z={76} />
          </div>

          {/* the clamp, dropping from above the frame */}
          <Clamp x={472} y={596} k={drop} s={1.3} z={72} />
          {drop > 0.98 && (
            <div style={{ position: "absolute", left: 300, top: 600, width: 344, height: 40,
              zIndex: 68, borderRadius: "50%", opacity: 1 - hop,
              background: `radial-gradient(ellipse, ${hexa("#D6C8A8", 0.85)}, transparent 70%)`,
              transform: `scale(${0.5 + hop * 1.4})` }} />
          )}
        </Body>
      </div>
    </Scene>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
   S8 · ROADMAP — f829..947 (118f).  THE PEAK, AND THE HERO ARTIFACT.
   VO: "Paste this and Claude will build a precise 7 day roadmap with just 45
        minutes of focused work per day."
   local: Paste 0 · build 22 · precise 27 · 7 29 · day 35 · roadmap 39 ·
          just 52 · 45 56 · minutes 70 · focused 83 · day 99
   ⭐ SEVEN blocks LAND ONE AT A TIME. Real content arriving one row at a time
      is the best motion in the measured house table (a stuck second: 6.3-6.9
      -> 8.0-8.5) and it is the only motion that also means something.
   ⛔ Countable at a glance. NO "7" typeset anywhere — a number MOVES to its
      value. The bar length under each block carries the 45 minutes; ONE text
      chip in the shot names the unit.
   ⛔ 7-day, NOT 70-day: small.en mis-heard it; medium.en and large-v3 agree.
   ──────────────────────────────────────────────────────────────────────── */
export const S8: React.FC = () => {
  const f = useCurrentFrame(), rf = 829 + f;
  const LAND = 29;                                   /* "7" */
  const sweep = E(f, 83, 116, 0, 1, IO);             /* "focused per day" */
  /* ⭐⭐ THE BACK HALF USED TO BE DEAD AND THAT IS WHY THIS SCENE SCORED 2.69.
     The seven blocks all landed inside f29..61 and then NOTHING moved for the
     remaining 57 frames — ANIMATION-QUALITY §5 "spread arrivals across the
     whole scene", the exact failure it records (5.94 -> 7.28 when fixed).
     The old back half was a 27px bar filling under each block (§1 measures a
     filling bar at **+0.11**, i.e. nothing) plus a 5px line.
     ⛔ THE FIX IS NOT A NEW IDEA, IT IS THE SAME NUMBER DRAWN BIG: the day's
     work is now a gold column rising INSIDE its own day-block, one day at a
     time across f56..114, so the whole second half is real content arriving —
     the top row of the measured table. Still 31% of the block, so "45 minutes
     is a modest slice of a day" is unchanged, and still NO numeral: the
     quantity is the geometry ([[feedback_graphical_over_textual]]). */
  const dayFill = (i: number) => E(f, 56 + i * 8, 56 + i * 8 + 12, 0, 1, OUT);
  const anyFill = dayFill(0);
  return (
    <Scene p={asPlace("roof")} slug="7 DAYS · 45 MINUTES A DAY" push={[0, 118, 1.17]} vig={0.42}>
      <Body f={f} rf={rf} k="roof" board={false}>
        {/* ⭐ THE SPRITES SPEAK. The whole body carried ONE bubble; a
            character who never says anything is a prop with a face. */}
        <Bubble x={524} y={204} w={320} t="45 MINUTES A DAY."
          k={E(f, 22, 34, 0, 1, BACK) - E(f, 100, 112, 0, 1, IO)}
          f={f} at={22} flip z={95} />
        {/* ⛔ NO `Cross` HERE. The roadmap below is this scene's motion and its
            subject at once; a sweep of large cards on top of it literally
            buried the route on the first render. When a scene has a real
            depiction, it does not also need generic travel. */}
        <Tutor f={f} x={848} y={462} s={210} gaze={-0.5}
          cheer={E(f, 92, 112, 0, 0.85, OUT)} stern={0}
          dy={-E(f, 92, 104, 0, 10, OUT)} />
        {/* his gaze TRACKS the route as it draws — he is watching the plan
            being written, which is the only reason he is in this shot */}
        <Student f={f} x={58} y={504} s={180}
          gaze={0.5 - E(f, 16, 104, 0, 0.95, LIN)}
          cheer={E(f, 96, 116, 0, 0.9, OUT)}
          dy={-E(f, 96, 108, 0, 12, OUT)} />

        {/* ⭐⭐⭐ AN ACTUAL ROADMAP, because the VO says the word "roadmap".
            Alex: *"each of the scenes seem way too similar like its just text
            boxes and stuff, its not actually relating to whats being spoken,
            like roadmap should be a roadmap animation"*. Seven labelled blocks
            standing in a row is a BAR CHART wearing the word "day" — it depicts
            nothing the line says. This draws a route across the panel, pops
            each of the seven stops as the road reaches it, tags every stop with
            its real 45 MIN, and walks a marker along the line. Same seven
            numbers, now depicting a PLAN THROUGH TIME instead of a column
            count. It also spreads the beat over the full scene by construction,
            which is what the retiming was trying to buy by hand. */}
        <Roadmap f={f} a={16} b={104} z={46} stops={7} />
      </Body>
    </Scene>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
   S9 · STEP 4 — f947..1084 (137f).  THE PAYOFF. THE BOARD FILLS.
   VO: "Fourth, now to test if you actually learned the new skills correctly,
        paste this prompt and Claude will evaluate your learnings."
   local: Fourth 0 · test 9 · learned 32 · skills 51 · correctly 57 ·
          paste 72 · prompt 77 · Claude 90 · evaluate 98 · learnings 113
   ⛔ THE SEAL IS A SEAL. Never a score, a percentage or a grade letter — the
      VO claims evaluation, not a result, and the frame stops at the claim.
   ──────────────────────────────────────────────────────────────────────── */
export const S9: React.FC = () => {
  const f = useCurrentFrame(), rf = 947 + f;
  const slide = E(f, 9, 34, 0, 1, IO);              /* the work crosses over */
  const fly = E(f, 72, 84, 0, 1, IO);               /* card 4 slots — 4 of 4 */
  const press = E(f, 98, 104, 0, 1, IN_Q);          /* the seal comes down   */
  const lift = E(f, 106, 118, 0, 1, OUT);
  const ring = E(f, 113, 132, 0, 1, OUT);           /* the S1 ring completes */
  const kick = shake(f, 104, 10, 8);
  const rise = E(f, 84, 94, 0, 1, BACK);
  const typ = E(f, 90, 134, 0, 1, LIN);
  return (
    <Scene p={asPlace("exam")} slug="MARKED BY THE TUTOR" push={[0, 137, 1.16]} vig={0.44}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1,
        transform: `translate(${kick.x}px, ${kick.y}px)` }}>
        <Body f={f} rf={rf} k="exam">
        {/* ⭐ THE SPRITES SPEAK. The whole body carried ONE bubble; a
            character who never says anything is a prop with a face. */}
        <Bubble x={458} y={224} w={306} t="LET US SEE IT."
          k={E(f, 94, 106, 0, 1, BACK) - E(f, 126, 136, 0, 1, IO)}
          f={f} at={94} flip z={95} />
          {/* an invigilator, so the grading has a witness */}
          <Extra f={f} x={454} y={392} s={106} kind="examiner" />
          <Student f={f} x={86} y={476} s={186} gaze={0.5}
            shock={E(f, 98, 105, 0, 0.7, OUT) - E(f, 105, 116, 0, 0.7, IO)}
            cheer={E(f, 106, 126, 0, 0.9, OUT)}
            dy={-E(f, 106, 118, 0, 14, OUT)} />
          <Tutor f={f} x={790} y={438} s={216} gaze={-0.45} stern={0.35}
            dy={-E(f, 98, 106, 0, 10, OUT)}
            rot={E(f, 98, 105, 0, -5, OUT) - E(f, 105, 120, 0, -5, IO)}
            cheer={E(f, 112, 132, 0, 0.8, OUT)} />

          {/* card 4 arcs in — the board is FULL, and it has been filling
              visibly since f162. This is the accumulation paying out. */}
          <div style={{ position: "absolute", left: 20 + fly * 380, top: 300 - fly * 120,
            zIndex: 58, transform: `rotate(${(1 - fly) * -22}deg)` }}>
            <PromptCard x={drift(f, 19, 0.95).x} y={drift(f, 19, 0.95).y} n={4} w={146} z={58} rot={drift(f, 19, 0.95).r} />
          </div>

          {/* the fourth prompt types while the seal comes down on the work */}
          <div style={{ position: "absolute", left: 42, top: 250, zIndex: 76,
            opacity: Math.min(1, rise * 1.4) }}>
            <PromptUI x={0} y={0} n={4} f={f} t={typ} s={0.82 * (0.92 + rise * 0.08)} z={76} />
          </div>

          {/* the student's work slides across the table to the tutor */}
          <div style={{ position: "absolute", left: 256 + slide * 300, top: 596, zIndex: 52,
            transform: `rotate(${slide * 4}deg)` }}>
            <Contact x={-8} y={166} w={216} z={-1} o={0.30} />
            <div style={{ width: 200, height: 158, borderRadius: 10, background: "#F4EEDD",
              border: "4px solid #D2C6A8", boxShadow: SH }}>
              {Array.from({ length: 5 }, (_, i) => (
                <div key={i} style={{ position: "absolute", left: 18, top: 22 + i * 24,
                  width: 150 - (i % 2) * 44, height: 9, borderRadius: 5, background: "#D6C9A8" }} />
              ))}
              {/* ⛔ A SEAL. Not a score, not a grade, not a percentage. */}
              {press > 0.01 && (
                <div style={{ position: "absolute", left: 116, top: 92, width: 76, height: 76,
                  borderRadius: "50%", background: hexa(GREEN, 0.16),
                  border: `6px solid ${GREEN}`, opacity: press,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transform: `scale(${0.7 + press * 0.3})` }}>
                  <div style={{ width: 30, height: 16, borderLeft: `7px solid ${GREEN}`,
                    borderBottom: `7px solid ${GREEN}`, transform: "rotate(-45deg)",
                    marginTop: -8 }} />
                </div>
              )}
            </div>
          </div>

          {/* the tutor's seal press coming down and lifting away */}
          <div style={{ position: "absolute", left: 588, top: 380 + press * 210 - lift * 190,
            zIndex: 66, opacity: E(f, 90, 98, 0, 1, OUT) }}>
            <div style={{ width: 108, height: 74, borderRadius: 10,
              background: `linear-gradient(172deg, #6E7480, #454A55)`,
              border: "4px solid #33373F", boxShadow: SH_D }} />
            <div style={{ position: "absolute", left: 36, top: -34, width: 34, height: 38,
              borderRadius: 6, background: "#3C414A" }} />
          </div>

          {/* the ring from S1, stuck the whole reel, completes and locks */}
          <Ring x={880} y={628} k={0.27 + ring * 0.73} s={0.56}
            c={ring > 0.96 ? GREEN : GOLD} f={f} z={44} />
        </Body>
      </div>
    </Scene>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
   S10 · CTA — f1084..1172 (88f).
   VO: "If you want to get all of these prompts, comment SKILL and I'll share
        it to you via DM."
   local: If 0 · prompts 14 · comment 30 · SKILL 35 · DM 64
   ⛔ THE CARDS ARE SATURATED AND CARRY THE MARK. Reel 105 shipped a black and
      white CTA for ten rounds because the hook got fixed and the ending never
      got brought in line — when one end of a reel gets a treatment, check the
      other end. These four are the hook's card, four times over.
   ⛔ The fan must not still be ARRIVING at the hard cut.
   ──────────────────────────────────────────────────────────────────────── */
export const S10Cta: React.FC = () => {
  const f = useCurrentFrame(), rf = 1084 + f;
  const key = E(f, 48, 58, 0, 1, BACK);            /* after the cards, not over them */
  /* and the tail no longer holds: the assembled cards keep rising into the
     cone for the rest of the scene (HOLD was 69%) */
  const lift = E(f, 58, 88, 0, 1, LIN);
  return (
    <Scene p={asPlace("board")} slug="COMMENT SKILL" push={[0, 88, 1.16]} vig={0.40}>
      <Body f={f} rf={rf} k="board" board={false}>
        {/* ⭐ the last word in the reel is spoken by a character, not a plate */}
        <Bubble x={510} y={294} w={286} t="GO GET IT."
          k={E(f, 22, 34, 0, 1, BACK) - E(f, 72, 84, 0, 1, IO)}
          f={f} at={22} flip z={95} />
        <Student f={f} x={64} y={546} s={182} gaze={0.5}
          cheer={E(f, 18, 34, 0, 0.9, OUT)}
          dy={-E(f, 18, 30, 0, 14, OUT)} />
        <Tutor f={f} x={838} y={538} s={196} gaze={-0.4} stern={0}
          cheer={E(f, 26, 42, 0, 0.85, OUT)}
          dy={-E(f, 26, 38, 0, 12, OUT)} />

        {/* the four cards fan up off the table into the cone */}
        {[0, 1, 2, 3].map((i) => {
          /* the four cards arrive ONE AT A TIME (f6..33) instead of all four
             inside 19 frames — the payoff is the board completing, so it has
             to be watchable as a sequence, not a single fan */
          const a = 6 + i * 9;
          const k = E(f, a, a + 10, 0, 1, OUT);
          const rot = (i - 1.5) * 13;
          return (
            <div key={"c" + i} style={{ position: "absolute",
              left: 296 + i * 116 + (1 - k) * (i % 2 ? 880 : -880),
              top: 300 + (1 - k) * 40 - lift * (34 + i * 9) + rock(f, a + 6, 5, 24),
              zIndex: 50 + i, opacity: k,
              transform: `rotate(${rot * k}deg) scale(${0.86 + k * 0.14})`,
              transformOrigin: "50% 100%" }}>
              <PromptCard x={0} y={0} n={i + 1} w={152} z={50 + i} />
            </div>
          );
        })}

        {/* the keyword, huge, on its own plate, in the display face */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 566, textAlign: "center",
          zIndex: 70, opacity: key, transform: `scale(${0.82 + key * 0.18})` }}>
          <span style={{ padding: "16px 46px", borderRadius: 20, background: "#F6F2E7",
            border: "5px solid #E0D5BB", boxShadow: SH_D,
            fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 76, color: INK,
            letterSpacing: "-0.01em" }}>
            COMMENT <span style={{ color: CLAY }}>SKILL</span>
          </span>
        </div>
      </Body>
    </Scene>
  );
};
