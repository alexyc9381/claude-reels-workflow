import React from "react";
import { useCurrentFrame } from "remotion";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D,
  Scene, Cam, Chip, Plate, Contact, Mark, MarkPlate,
  R, PLACES, asPlace, vivid, mono, ui, Rake, Ring, Puff, Pool, Steam, Fall, Motes,
  Crew, Hero, Forearm, costumeFor, squash, rock, shake, lerpHex, Runner, Sweat,
  Gap, FileRail,
  CLAY, CLAYD, GOLD, GREEN, RED, SKY, PAPER, CREAMB, INK, MUTE, TEAL, STEEL,
  BRASS, SODIUM, VIOLET, EMBER, OXIDE, SLATE, PCB, COPPER,
} from "./MemWorld";
import {
  TopicFile, Bay, Press, ChatPane, SwitchLever, BrowserWin, DeskMachine,
  PhoneDev, Barrier, CutEnd, Chute, Shutter, Incinerator,
  StampPlate, Junction, Laptop, TaskCard,
} from "./MemProps";
import { Room, Jamb, Stack, Overhead, Strip2 } from "./HwSets";

/* ===========================================================================
   REEL 124 · "MEM" — THE SCENES.  Board: storyboards/124-mem.md.

   ⛔⛔ EVERY SCENE HAS AN EVENT, NOT A COMPOSITION: a before state legible on
   frame 1, a visible TRIGGER, TRAVEL that crosses distance, and an arrival that
   COSTS something. Nothing here lands and simply stops.

   ⛔⛔ AND THE HERO ACTS. Asked of every scene before it was written — *what does
   the CLAUDE DO here?* — never "what is around him":
     S0  holds the hand-kept vault overhead, fails, drops it, staggers, looks up
     S1  tracks the intake past him and puts his hand out as it goes by
     S2  walks the crossing alongside a file, through the dividers
     S3  lunges after a falling file and CATCHES NOTHING
     S4  throws the switch himself, twice, and is knocked back by his own doing
     S5  TALKS — the ribbon pays out of him and the press works behind his back
     S6  walks in under the rising shutter, so the reveal is something he enters
     S7  PULLS a file out of the wall and it turns to face camera in his hands
     S8  feeds it into the incinerator and shuts the door
     S9  throws the junction and the three feeds go live under his hand
     S10 catches the stamped plate off the phone feed and holds it up
     S11 winds the works up a gear on a handwheel
     S12 RUNS INTO THE BARRIER FLAT and is stopped dead
     S13 throws the selector from CLOUD to LOCAL
     S14 stands at the severed end and cannot cross it
     S15 strikes the keyword plate

   ⛔ AN ACTION LOOP IS NOT A SCENE. `Crew`'s four loops are what the room does
   WHILE the scene happens. Every scene still owes its own four-part event.
   ⛔ ONE TEXT CHIP PER SHOT, in the reserved band (panel y 112..210). Plates
   never enter the ground line the cast stands on.
   ⛔ EVERY SCENE IS LOCKED. The reel has exactly THREE re-framings — S4 f18,
   S7 f0 and S12 f26 — and all three are CUTS, not drifts.
   ========================================================================= */

export type Variant = "house" | "amber" | "steel";

/** ⛔ the camera offset goes on the PANEL CONTENTS, never the whole comp, and it
    has to be big enough to beat a 64-bit dHash: targets mean >= 14, min >= 10. */
export const CAM: Record<Variant, { dx: number; dy: number; s: number; rot: number }> = {
  house: { dx: -6, dy: 10, s: 1.008, rot: -0.4 },
  amber: { dx: -52, dy: -30, s: 1.046, rot: 2.4 },
  steel: { dx: 54, dy: 28, s: 1.050, rot: -2.2 },
};

/** ⛔⛔⛔ HUE IS NOT A VARIANT LEVER (reel 115). `hue-rotate` / `saturate` are
    BANNED from GRADE — both move the clay, and a trial cut may never recolour
    the Claude. Only CONTRAST and BRIGHTNESS vary. */
export const GRADE: Record<Variant, string> = {
  house: "contrast(1.000) saturate(1.22) brightness(1.000)",
  amber: "contrast(1.140) saturate(1.22) brightness(0.958)",
  steel: "contrast(1.075) saturate(1.22) brightness(1.052)",
};

const PAR_X: Record<Variant, number> = { house: 0, amber: -44, steel: 42 };
/** ⛔⛔ A RAKE PHASE IS MODULO THE BAND PITCH — offsets inside one pitch collapse
    to nothing. Varying `n` changes the pitch itself, which is the only offset
    that cannot go inert. */
const RAKE_X: Record<Variant, number> = { house: 0, amber: 92, steel: 168 };
const RAKE_K: Record<Variant, number> = { house: 1, amber: 1.86, steel: 0.48 };
const RAKE_N: Record<Variant, number> = { house: 7, amber: 5, steel: 11 };
/** ⭐ PER-CUT LAYOUT on the three flattest scenes — one large object on a plain
    field is the hardest frame to differentiate and a grade has nothing to bite
    on there. At any sampled instant the subject is somewhere else. */
const LAY: Record<Variant, { press: number; shed: number; plate: number; beat: number }> = {
  house: { press: 0, shed: 0, plate: 0, beat: 0 },
  amber: { press: 88, shed: -70, plate: -58, beat: -5 },
  steel: { press: -96, shed: 84, plate: 92, beat: 8 },
};

export type SP = { v: Variant; dur: number };

/** the ground line the cast stands on, house-wide */
export const GY = 706;
/** the reserved plate band — ⛔ nothing else enters y 112..210 */
const BAND_Y = 138;

/* =========================================================================
   S1 · THE INTAKE LINE — 3.95 to 6.45s (76f)
   VO: "This is insane because it now automatically remembers your projects and
        preferences..."
   §3: the nouns are PROJECTS and PREFERENCES and the adverb is AUTOMATICALLY,
   so the picture is two NAMED chutes feeding a belt with NO HAND ON ANY OF IT.
   EVENT: before, two loaded chutes and an empty belt · trigger, the first drop
   at f6 · travel, each item crosses the full 1012px span · arrival, each one
   goes into the rack mouth with a latch.
   ====================================================================== */
export const S1: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("line");
  /* ⭐ ARRIVALS SPAN THE FULL DURATION. Six drops at 6..66 of 76 — bunching them
     in the first third is what leaves a tail dead. */
  const DROPS = [6, 18, 30, 42, 54, 66];
  return (
    <Scene p={p} slug="" push={[0, dur, 1.10]} vig={0.34} glow={hexa(p.key, 0.20)}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="rack" overhead="tray"
        rake={0.13} rakeX={RAKE_X[v]} rakeRate={6.6 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="slab" grit={0.6} lamp={{ x: 520, y: 150, r: 260 }} />

      {/* the BACKGROUND PROCESS this room owns: the overhead file rail, always
          running, nobody looking at it */}
      <FileRail y={196} f={f} z={24} rate={5.4} pitch={214} s={0.78} hang={30} />

      {/* the two NAMED chutes — the nouns in the line, stencilled at the size a
          hopper label actually is */}
      {R.intake.map((label, i) => (
        <Chute key={"ch" + i} x={266 + i * 480} y={196} w={306} h={172} z={34}
          label={label} c={i ? "#3A4E58" : SLATE} />
      ))}

      {/* the BELT — a full-width high-contrast travelling band, which is the
          highest-value shape in the measured motion table and here is also
          literally what the sentence describes */}
      <div style={{ position: "absolute", left: -40, top: GY - 96, width: W + 80, height: 30,
        zIndex: 30, background: `linear-gradient(180deg, ${mxh(SLATE, 0.18)} 0%, ${dkh(SLATE, 0.42)} 100%)` }} />
      {Array.from({ length: 15 }, (_, i) => (
        <div key={"rl" + i} style={{ position: "absolute", left: -38 + i * 74, top: GY - 92,
          width: 60, height: 22, borderRadius: 11, zIndex: 31,
          background: `linear-gradient(180deg, ${mxh(STEEL, 0.14)} 0%, ${dkh(STEEL, 0.36)} 100%)`,
          transform: `rotate(${f * 11}deg)` }}>
          <div style={{ position: "absolute", left: 26, top: 3, width: 8, height: 16, borderRadius: 2,
            background: hexa("#FFF", 0.16) }} />
        </div>
      ))}

      {/* ⭐ NO HAND TOUCHES ANY OF THEM. Each item drops out of its chute, lands
          on the belt with a squash, and rides right into the rack mouth. */}
      {DROPS.map((at, i) => {
        const src = i % 2;
        const x0 = 266 + src * 480;
        const drop = E(f, at, at + 9, 0, 1, IN_Q);
        const ride = E(f, at + 9, at + 44, 0, 1, LIN);
        if (f < at) return null;
        const x = x0 + ride * (980 - x0);
        const y = (196 + 172) + drop * (GY - 118 - 368);
        const land = f >= at + 9 && f < at + 14 ? 1 - (f - at - 9) / 5 : 0;
        return (
          <React.Fragment key={"it" + i}>
            <TopicFile x={x} y={y} s={1.02} z={38} f={f} topic={R.topics[i]}
              c={R.topicColour[i % R.topicColour.length]}
              rot={(1 - drop) * -16 + Math.sin(f / 9 + i) * 2.2 * ride} />
            {land > 0.02 && <Puff x={x} y={y + 6} f={f} at={at + 9} c={hexa("#CFE6EE", 0.6)} />}
          </React.Fragment>
        );
      })}
      {/* the rack MOUTH the belt runs into, so the items go somewhere */}
      <div style={{ position: "absolute", left: 926, top: GY - 250, width: 130, height: 170,
        zIndex: 36, borderRadius: 5,
        background: `linear-gradient(96deg, ${dkh(SLATE, 0.30)} 0%, #07090C 62%)` }} />
      <div style={{ position: "absolute", left: 918, top: GY - 258, width: 20, height: 186,
        zIndex: 37, background: dkh(BRASS, 0.24) }} />

      {/* HERO: he TRACKS the intake past him and puts a hand out as it goes by —
          he is not operating it, which is the point of "automatically". */}
      <Hero f={f} x={452 + LAY[v].beat * 4} y={GY} size={284} z={56} act={3} ph={0.4}
        costume={{ glasses: 1 }} gaze={Math.sin(f / 13) * 0.8}
        reach={70} drive={E(f, 30, 40, 0, 0.3, OUT) - E(f, 40, 52, 0, 0.3, IO)} />
      <Contact x={452} y={GY} w={228} z={40} o={0.32} />

      {/* the crew keeping the floor alive — an action loop is furniture, never
          the answer to "not enough motion" */}
      {[0, 1].map(i => (
        <Crew key={"cw" + i} f={f} x={128 + i * 774} y={GY} i={i + 3} size={132} z={44}
          at={i * 5} loop={i} />
      ))}

      <Chip t={R.live} y={BAND_Y} c={hexa(TEAL, 0.94)} fg="#08161C" />
      <Mark x={40} y={GY - 138} s={62} z={90} />
    </Scene>
  );
};

/* =========================================================================
   S2 · THE CROSSING — 6.45 to 8.00s (46f)
   VO: "...across every single conversation."
   §3: the word is ACROSS, so the picture is a CROSSING and nothing else — one
   continuous rail running THROUGH four chat panes' dividers.
   EVENT: before, three dividers standing between panes · trigger, the rail
   lights · travel, files cross all three · arrival, a latch on each crossing.
   ====================================================================== */
export const S2: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("cross");
  /* ⛔⛔ REBUILT — *"I'm kind of confused what I'm looking at."* v1 put four pale
     panes in a rank with four small cream files sliding along a thin rail, and
     a 214px hero half cut off by the panel floor. Nothing in it was big, the
     rail was 13px, and every file was the same colour as every other. So the
     CROSSING — the entire content of the line — was the least visible thing in
     the frame.
     ⭐ ONE FILE, BIG, CROSSING THREE CHATS, and each wall it passes through
     bursts as it goes. 1.57s is one beat: one object, one path, three impacts.
     ⭐ AND THE FILES ARE COLOURED FROM HERE ON (*"have diff colored papers"*) —
     it is also the reel's own code: this is the same colour it will have on the
     topic wall at 14s. */
  const WALLS = [356, 664];
  const k = E(f, 2, 40, 0, 1, LIN);
  const fx = -90 + k * 1200;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.12]} vig={0.36} glow={hexa(p.key, 0.18)}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="column" overhead="gantry"
        rake={0.12} rakeX={RAKE_X[v]} rakeRate={7.8 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="slab" grit={0.5} lamp={{ x: 506, y: 120, r: 260 }} />

      {/* three conversations, side by side, each already holding its own files */}
      {[36, 352, 668].map((px, i) => (
        <React.Fragment key={"cp" + i}>
          <ChatPane x={px} y={228} w={308} h={296} z={34} f={f}
            rows={4} title={`CHAT ${i + 1}`} dim={0.08 + i * 0.03} />
          {[0, 1].map(j => (
            <TopicFile key={j} x={px + 84 + j * 132} y={486} s={0.66} z={36} f={f}
              c={R.topicColour[(i * 2 + j + 3) % R.topicColour.length]}
              topic={R.topics[(i * 2 + j + 3) % R.topics.length]}
              rot={-4 + j * 7} />
          ))}
        </React.Fragment>
      ))}

      {/* ⛔ THE WALLS ARE THE POINT, so they are 30px of solid steel floor to
             ceiling — v1's 22px dividers read as gaps between cards */}
      {WALLS.map((wx, i) => {
        const hit = Math.abs(fx - wx) < 40;
        const blown = fx > wx;
        return (
          <React.Fragment key={"wl" + i}>
            <div style={{ position: "absolute", left: wx - 15, top: 186, width: 30, height: 400,
              zIndex: 40, background: blown
                ? `linear-gradient(96deg, ${mxh(GOLD, 0.30)} 0%, ${dkh(GOLD, 0.26)} 100%)`
                : `linear-gradient(96deg, ${mxh(SLATE, 0.24)} 0%, ${dkh(SLATE, 0.46)} 100%)` }}>
              {/* the port it goes through, which OPENS as it arrives */}
              <div style={{ position: "absolute", left: -6, top: 196, width: 42,
                height: blown ? 92 : 0, background: p.floor2,
                borderTop: `4px solid ${mxh(GOLD, 0.36)}`,
                borderBottom: `4px solid ${dkh(GOLD, 0.30)}` }} />
            </div>
            {hit && <Ring x={wx} y={336} f={f} at={f} c={hexa(GOLD, 0.92)} z={46} />}
          </React.Fragment>
        );
      })}

      {/* ⭐ THE ONE FILE, and it is the biggest object in the frame */}
      <TopicFile x={fx} y={366} s={1.62} z={48} f={f} c={R.topicColour[0]}
        topic={R.topics[0]} rot={Math.sin(f / 7) * 4} />

      <Hero f={f} x={196} y={GY - 8} size={330} z={56} act={3} ph={1.1}
        costume={{ suit: 1 }} gaze={0.9} cheer={E(f, 26, 38, 0, 0.7, OUT)} />
      <Contact x={196} y={GY - 8} w={262} z={44} o={0.30} />

      <Chip t="ONE MEMORY · EVERY CHAT" y={BAND_Y} c={hexa(CREAMB, 0.96)} fg={INK} />
    </Scene>
  );
};

/* =========================================================================
   S3 · THE OLD BENCH — 8.00 to 10.76s (83f) · THE VILLAIN PLANTED
   VO: "If you use Claude you know how annoying it is when it keeps forgetting
        important details..."
   EVENT: before, a loaded bench with a black slot at its lip · trigger, the
   first file slides · travel, each falls the full 250px of the shaft · arrival,
   nothing. No bounce, no sound of a bottom.
   ⛔ THE GAP MUST READ WHILE EMPTY — bright cream lip against pure black.
   ====================================================================== */
export const S3: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("bench");
  /* ⛔⛔ REBUILT — same note. v1 had a chat pane clipped by the frame edge, one
     file near his hands, a hazard strip and a black rectangle off to the right,
     and no way to tell what he was doing. The action was there in the code and
     invisible in the picture.
     ⭐ THE SHOT IS NOW ONE SENTENCE YOU CAN READ MUTED: he stands holding an
     armful of coloured files, and they fall THROUGH his arms into a trench
     directly in front of him. He is 340px and dead centre, the trench runs the
     full width with a hazard lip, and the files are six different colours so
     each loss is a separate, countable thing rather than more cream.
     ⛔ HE STANDS BEHIND THE TRENCH, not on it — his ground line moves up to 610
     so the hole is between him and the camera, which is the only staging where
     "it fell in front of him" reads. */
  const SPILL = [4, 16, 28, 40, 52, 64];
  const grab = (i: number) => E(f, SPILL[i] + 8, SPILL[i] + 13, 0, 1, OUT)
    - E(f, SPILL[i] + 15, SPILL[i] + 24, 0, 1, IO);
  const reach = SPILL.reduce((m, _, i) => Math.max(m, grab(i)), 0);
  const HX = 470, HY = 606;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.09]} vig={0.44} glow={hexa(p.key, 0.14)}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="shelf" overhead="joist"
        rake={0.08} rakeX={RAKE_X[v]} rakeRate={3.8 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="boards" grit={0.8} lamp={{ x: 470, y: 120, r: 300 }} />

      {/* the chat they are pouring out of, above and behind him */}
      <ChatPane x={286} y={108} w={392} h={196} z={30} f={f}
        rows={Math.max(1, 6 - Math.floor(f / 14))} title="THIS CHAT" dim={0.12} />

      {/* the bench he stands at */}
      <div style={{ position: "absolute", left: -40, top: HY - 2, width: W + 80, height: 26,
        zIndex: 30, background: `linear-gradient(180deg, ${mxh("#6E6250", 0.24)} 0%, ${dkh("#6E6250", 0.24)} 100%)` }} />

      {/* ⛔ THE TRENCH, FULL WIDTH AND IN FRONT OF HIM. A hole to one side reads
             as a dark corner; a hole across the whole frame between the subject
             and the camera reads as a hole. */}
      <Gap x={-40} y={GY - 44} w={W + 80} f={f} z={52} plate={0} depth={230} />

      {/* ⭐ SIX COLOURED DETAILS, EACH ONE THROUGH HIS ARMS AND GONE */}
      {SPILL.map((at, i) => {
        const fly = E(f, at, at + 12, 0, 1, IO);
        const held = E(f, at + 12, at + 17, 0, 1, LIN);
        const slip = E(f, at + 17, at + 40, 0, 1, IN_Q);
        if (f < at || slip >= 1) return null;
        const x = 300 + fly * 150 + held * 10 + slip * (40 + i * 26);
        const y = 300 + fly * 190 + slip * 300;
        return (
          <TopicFile key={"sp" + i} x={x} y={y} s={1.02} z={slip > 0.34 ? 44 : 58} f={f}
            c={R.topicColour[(i + 2) % R.topicColour.length]}
            topic={R.topics[(i + 2) % R.topics.length]}
            rot={-12 + fly * 10 + slip * -86} />
        );
      })}

      {/* HERO — 340px, centred, arms out, catching nothing */}
      <Hero f={f} x={HX} y={HY} size={340} z={56} act={1} ph={0.2}
        costume={{ constr: 1 }} drive={reach * 0.36} reach={120}
        stern={0.5 + reach * 0.5} gaze={0.9}
        heat={0.20 + 0.34 * E(f, 40, 70, 0, 1, OUT)} />
      <Contact x={HX} y={HY} w={264} z={40} o={0.28} />
      {reach > 0.12 && [-1, 1].map(sd => (
        <Forearm key={"fa" + sd} x0={HX + sd * 104} y0={HY - 238}
          x1={HX + sd * 52 + 90} y1={HY - 276} w={25} z={57} />
      ))}

      <Chip t="EVERY NEW CHAT STARTED EMPTY" y={BAND_Y} c={hexa(SLATE, 0.94)} fg="#E4EAF0" />
    </Scene>
  );
};

/* =========================================================================
   S4 · THE SWITCH — 10.76 to 12.13s (41f) · ESCALATE
   VO: "...every time you switch chats."
   §3: the verb is SWITCH, so it is a MECHANISM, not a fade. He throws it
   HIMSELF, twice, and is knocked back by his own doing.
   ⛔ RE-FRAMING at f18 — a CUT to a tighter framing, not a drift.
   ====================================================================== */
export const S4: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("bench");
  /* ⛔ REBUILT and SIMPLIFIED. 1.17s is ONE beat, and v1 tried to fit a lever
     throw, two panes leaving, a blank arriving and four files falling into it.
     ⭐ The beat is: HE THROWS IT, the loaded chat goes, its colour goes with it,
     and what lands is EMPTY. The colour leaving is the whole point — that is why
     the files are coloured and the replacement is bone white. */
  const thr = E(f, 2, 10, 0, 1, IO);
  const sweep = E(f, 8, 26, 0, 1, IO);
  const jolt = rock(f, 10, 14, 12);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.07]} vig={0.46} glow={hexa(RED, 0.14)}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={2} kind="shelf" overhead="joist"
        rake={0.08} rakeX={RAKE_X[v]} rakeRate={4.6 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="boards" grit={0.8} lamp={{ x: 560, y: 126, r: 260 }} />

      {/* the loaded chat, going — and its colour going with it */}
      <div style={{ position: "absolute", inset: 0, zIndex: 36,
        transform: `translateX(${sweep * 900}px) rotate(${sweep * 7}deg)` }}>
        <ChatPane x={300} y={164} w={420} h={286} z={36} f={f} rows={4}
          title="THIS CHAT" dim={0.06} />
        {[0, 1, 2].map(i => (
          <TopicFile key={"of" + i} x={368 + i * 132} y={400} s={0.78} z={38} f={f}
            c={R.topicColour[(i + 5) % R.topicColour.length]}
            topic={R.topics[(i + 5) % R.topics.length]} rot={-5 + i * 6} />
        ))}
      </div>
      {/* what lands: the same box, empty */}
      <ChatPane x={300 + (1 - sweep) * 940} y={164} w={420} h={286} z={35} f={f}
        rows={0} title="NEW CHAT" dim={0.02} blank />

      {/* the trench they go into, and three of them going */}
      <Gap x={-40} y={GY - 44} w={W + 80} f={f} z={52} plate={0} depth={220} />
      {[6, 12, 18].map((at, i) => {
        const fall = E(f, at, at + 22, 0, 1, IN_Q);
        if (f < at || fall >= 1) return null;
        return (
          <TopicFile key={"df" + i} x={470 + i * 110 + fall * 60} y={430 + fall * 300}
            s={0.86} z={46} f={f} c={R.topicColour[(i + 5) % R.topicColour.length]}
            rot={fall * -92 + i * 8} mark={false} />
        );
      })}

      <SwitchLever x={148} y={GY - 18} s={1.30} z={62} throw_={thr} />
      <Hero f={f} x={330} y={GY} size={318} z={56} act={1} ph={0.9}
        costume={{ constr: 1 }} drive={-0.30 * thr + jolt * 0.02} reach={130}
        strain={0.34 * thr} shock={E(f, 10, 16, 0, 1, OUT) * (1 - E(f, 24, 34, 0, 1, IO))}
        heat={0.34 + 0.42 * E(f, 8, 22, 0, 1, OUT)} stern={0.8} />
      <Contact x={330} y={GY} w={252} z={40} o={0.30} />
      {thr > 0.1 && <Forearm x0={330 - 116} y0={GY - 214} x1={216} y1={GY - 246 - thr * 44} w={25} z={58} />}

      <Chip t="AND THE COLOUR WENT WITH IT" y={BAND_Y} c={hexa(RED, 0.94)} fg="#FFF0EA" />
    </Scene>
  );
};

/* =========================================================================
   S5 · THE PRESS — 12.13 to 14.36s (67f) · THE TURN
   VO: "Now Claude saves details dynamically in the background."
   ⭐⭐⭐ THE SCENE IS ITS SIMULTANEITY. Anthropic's own wording is that Claude
   "adds topics to memory AS YOU CHAT, instead of summarizing conversations
   after they end", so the shot is two things happening AT ONCE in one frame:
   he talks in the foreground and NEVER LOOKS BEHIND HIM, and the press writes.
   ⭐ A SCENE IS ONLY AS ALIVE AS ITS DEADEST HALF — the talking half gets the
   ribbon, which travels continuously, so neither half ever holds.
   AND IN THE SAME BEAT the steel floor swings across THE GAP. Floored, not
   killed: S14 brings it back.
   ====================================================================== */
export const S5: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("press");
  /* ⛔⛔⛔ THE RIBBON IS GONE. It was noted three times ("a plank"), and I twice
     tried to fix it by changing its angle, its length and its rate. When a prop
     is wrong three rounds running the answer is not another parameter — the
     OBJECT is wrong. A long horizontal bar at head height is a plank at every
     angle and every length.
     ⭐ WHAT REPLACES IT IS THE LITERAL PICTURE OF THE LINE. He talks, and what
     he says leaves his head as WORD CHIPS. Each chip drops into a press, gets
     stamped into a COLOURED file, and the file is thrown up into a labelled bay
     — while he never once looks round. Speech in, filing out, at an
     accelerating rate, with the whole chain visible end to end in one frame.
     That acceleration is the word "dynamically" and it is the only part of the
     line a picture can carry. */
  const STAMPS = [6, 18, 28, 36, 43, 49, 54];
  const stroke = STAMPS.reduce((acc, at) =>
    Math.max(acc, E(f, at, at + 3, 0, 1, IN_Q) - E(f, at + 3, at + 9, 0, 1, OUT)), 0);
  const plate = E(f, 34, 60, 0, 1, IO);
  const PX = 806;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.11]} vig={0.34} glow={hexa(p.key, 0.24)}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="plant" overhead="gantry"
        rake={0.16} rakeX={RAKE_X[v]} rakeRate={6.2 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="slab" grit={0.6} lamp={{ x: 700, y: 130, r: 300 }} />

      <Gap x={64} y={GY - 26} w={250} f={f} z={26} plate={plate} depth={140} />

      {/* the three bays the output lands in */}
      {[0, 1, 2].map(i => (
        <Bay key={"b5" + i} x={168 + i * 250} y={128} w={228} h={104} z={30} f={f}
          n={4} c={R.topicColour[i]} label={R.topics[i]}
          fill={E(f, 12 + i * 12, 40 + i * 12, 0, 1, OUT)} labelOn={1} />
      ))}

      {/* the press, compact, unattended, running faster */}
      <Press x={PX} y={GY - 6} s={1.06} z={46} f={f} stroke={stroke} />

      {/* ⭐ WHAT HE SAYS, LEAVING HIS HEAD. Each chip arcs into the press hopper
             — this is the INPUT half, and without it the press is a machine
             making files out of nothing. */}
      {STAMPS.map((at, i) => {
        const k = E(f, at - 17, at, 0, 1, IO);
        if (f < at - 17 || k >= 1) return null;
        const x = 380 + k * (PX - 96 - 380);
        const y = 400 - Math.sin(k * Math.PI) * 104 + k * 104;
        return (
          <div key={"wc" + i} style={{ position: "absolute", left: x - 62, top: y - 28, width: 124,
            height: 56, zIndex: 50, borderRadius: 13, opacity: 1 - k * 0.12,
            transform: `rotate(${-8 + k * 16}deg)`,
            background: `linear-gradient(176deg, ${PAPER} 0%, ${dkh(PAPER, 0.14)} 100%)`,
            boxShadow: SH_D }}>
            {[0, 1, 2].map(j => (
              <div key={j} style={{ position: "absolute", left: 16, top: 13 + j * 13,
                width: 82 - j * 24, height: 6, borderRadius: 3, background: hexa(INK, 0.36) }} />
            ))}
          </div>
        );
      })}

      {/* the output, thrown up into the bays, coloured */}
      {STAMPS.map((at, i) => {
        const k = E(f, at + 2, at + 20, 0, 1, OUT);
        if (f < at + 2 || k >= 1) return null;
        const tx = 222 + (i % 3) * 250;
        return (
          <TopicFile key={"pf" + i} x={PX + k * (tx - PX)}
            y={GY - 150 - Math.sin(k * Math.PI) * 190 - k * 330}
            s={0.96 - k * 0.18} z={52} f={f} c={R.topicColour[i % 3]}
            topic={R.topics[i % 3]} rot={-k * 38} />
        );
      })}
      {STAMPS.map((at, i) => (
        <Ring key={"pr" + i} x={PX} y={GY - 168} f={f} at={at + 2} c={hexa(SODIUM, 0.8)} />
      ))}

      {/* HERO — talking, and never once looking round */}
      <Hero f={f} x={252 + LAY[v].beat * 3} y={GY} size={312} z={56} act={1} ph={1.4}
        costume={{ glasses: 1 }} gaze={-0.95} cheer={0.22} />
      <Contact x={252} y={GY} w={252} z={40} o={0.34} />

      <Chip t="WRITTEN WHILE YOU TALK" y={BAND_Y} c={hexa(SODIUM, 0.96)} fg="#241400" />
    </Scene>
  );
};

/* =========================================================================
   S6 · THE TOPIC WALL — 14.36 to 17.31s (88f) · PAYOFF
   VO: "So you can go into your settings and literally see your memories
        categorized by topic."
   §3: the verbs are GO INTO and SEE and the noun is TOPIC. So: a shutter he
   walks in under, then nine labelled bays whose labels SNAP ON one at a time.
   ⭐ NINE DISCRETE POPS across the FULL duration, never one long tween and
   never bunched into the first third.
   ====================================================================== */
export const S6: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("wall");
  const up = E(f, 2, 22, 0, 1, IO);
  const BAYW = 296, BAYH = 118;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.10]} vig={0.40} glow={hexa(p.key, 0.26)}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="shelf" overhead="lampbar"
        rake={0.10} rakeX={RAKE_X[v]} rakeRate={5.0 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="tile" grit={0.4} lamp={{ x: 506, y: 116, r: 300 }} />

      {/* the nine BAYS, three ranks of three */}
      {R.topics.map((tp, i) => {
        const col = i % 3, row = Math.floor(i / 3);
        /* ⭐ A RANK AT A TIME — three beats at f18, f42 and f66, with the three
           bays in each rank landing 2 frames apart so the rank has a sweep to
           it rather than being one hard pop. */
        const on = E(f, 18 + row * 24 + col * 2, 25 + row * 24 + col * 2, 0, 1, BACK);
        return (
          <Bay key={"by" + i} x={44 + col * (BAYW + 24)} y={228 + row * (BAYH + 46)}
            w={BAYW} h={BAYH} z={34 + row} f={f} label={tp} n={5} c={R.topicColour[i]}
            fill={E(f, 12 + row * 24 + col * 3, 30 + row * 24 + col * 3, 0, 1, OUT)} labelOn={on} />
        );
      })}

      {/* the crew working the walkway in front — costumes cycled deterministically */}
      {[0, 1, 2, 3, 4].map(i => (
        <Crew key={"c6" + i} f={f} x={116 + i * 196} y={GY} i={i} size={144} z={50}
          at={4 + i * 3} loop={i % 4} />
      ))}

      {/* HERO: he WALKS IN under the rising shutter, so the reveal is entered */}
      <Hero f={f} x={-40 + E(f, 6, 34, 0, 300, OUT)} y={GY} size={236} z={58} act={0} ph={0.3}
        costume={{ glasses: 1 }} gaze={-0.8} cheer={E(f, 60, 72, 0, 0.7, OUT)} />
      <Contact x={-40 + E(f, 6, 34, 0, 300, OUT)} y={GY} w={192} z={44} o={0.30} />

      {/* the SHUTTER, over everything, climbing out of frame */}
      <Shutter y={0} h={620} up={up} z={76} />

      <Chip t={R.section} y={BAND_Y} c={hexa(BRASS, 0.97)} fg="#2A1E08" />
      <Mark x={906} y={150} s={64} z={90} />
    </Scene>
  );
};

/* =========================================================================
   S7 · THE FILE, OPEN — 17.31 to 18.93s (49f) · PAYOFF
   VO: "You can click on any file to edit the details..."
   ⛔ A CURSOR IS NOT A PROP — a 30x38 travelling cursor measured ~0. He pulls
   the file out HIMSELF and it comes at camera.
   ⭐⭐ THE REVEAL IS THE ROTATION, NOT THE TRAVEL: it turns -18deg -> 0 as it
   arrives, so the viewer decodes it at the instant it lands.
   ⛔ Deliberately a DIFFERENT shot size and a DIFFERENT hero object from S6 and
   S8 — one wall in four scenes is how half a reel becomes one rectangle.
   ====================================================================== */
export const S7: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("desk");
  const pull = E(f, 3, 17, 0, 1, OUT);
  const open = E(f, 16, 26, 0, 1, OUT);
  /* the three rewrites, spread across the tail so the scene never parks */
  const struck = f > 24 ? 1 : 0;
  const added = (f > 30 ? 1 : 0) + (f > 38 ? 1 : 0);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.13]} vig={0.40} glow={hexa(p.key, 0.22)}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={2} kind="shelf" overhead="none"
        rake={0.07} rakeX={RAKE_X[v]} rakeRate={4.2 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="tile" grit={0.5} lamp={{ x: 620, y: 108, r: 280 }} />

      {/* the bench he brings it to, and the one lamp over it */}
      <div style={{ position: "absolute", left: -40, top: GY - 168, width: W + 80, height: 30,
        zIndex: 30, background: `linear-gradient(180deg, ${mxh("#3A4250", 0.24)} 0%, ${dkh("#3A4250", 0.26)} 100%)` }} />
      <div style={{ position: "absolute", left: -40, top: GY - 140, width: W + 80, height: 140,
        zIndex: 29, background: dkh("#3A4250", 0.52) }} />
      <div style={{ position: "absolute", left: 574, top: 60, width: 132, height: 42, zIndex: 31,
        borderRadius: 7, background: dkh(SLATE, 0.42) }} />
      <div style={{ position: "absolute", left: 452, top: 96, width: 376, height: 360, zIndex: 24,
        opacity: 0.62, clipPath: "polygon(34% 0, 66% 0, 100% 100%, 0 100%)",
        background: `linear-gradient(180deg, ${hexa("#FFEBC0", 0.52)} 0%, ${hexa("#FFEBC0", 0)} 100%)` }} />

      {/* the bays he took it FROM, dark and behind him — this is a different
          shot size and a different hero object from S6 and S8 on purpose */}
      <Bay x={22} y={196} w={280} h={126} z={26} f={f} label={R.topics[0]} n={5}
        c={R.topicColour[0]} fill={1 - pull * 0.24} lit={pull * 0.30} />
      <Bay x={710} y={196} w={280} h={126} z={26} f={f} label={R.topics[1]} n={5}
        c={R.topicColour[1]} fill={1} />

      {/* THE FILE, out of the wall and turning into readability as it arrives */}
      <div style={{ position: "absolute", inset: 0, zIndex: 62 }}>
        <TopicFile x={196 + pull * 322} y={306 + pull * 316} s={0.9 + pull * 2.0} z={62} f={f}
          topic={R.topics[0]} rot={-18 * (1 - pull)} open={open}
          lines={5} struck={struck} added={added} />
      </div>
      {/* the three controls, struck into the rig the file sits in front of —
          a structural feature you have to draw anyway is free real estate */}
      <div style={{ position: "absolute", left: 690, top: 470, zIndex: 66, display: "flex", gap: 10 }}>
        {R.controls.map((c, i) => (
          <div key={"ct" + i} style={{ padding: "7px 13px", borderRadius: 6,
            opacity: E(f, 20 + i * 6, 27 + i * 6, 0, 1, OUT),
            background: i === 1 ? hexa(GREEN, 0.92) : hexa(INK, 0.30),
            border: `2px solid ${hexa(i === 1 ? GREEN : MUTE, 0.5)}` }}>
            <span style={{ ...mono(15, 900), color: i === 1 ? "#08170F" : hexa(CREAMB, 0.86),
              letterSpacing: 1.2 }}>{c}</span>
          </div>
        ))}
      </div>

      {/* HERO: it is HIS hand the file came out on */}
      <Hero f={f} x={158} y={GY} size={240} z={56} act={3} ph={0.7}
        costume={{ glasses: 1 }} drive={pull * 0.34} reach={110} gaze={0.9}
        cheer={E(f, 34, 44, 0, 0.6, OUT)} />
      <Contact x={158} y={GY} w={194} z={40} o={0.28} />
      {pull > 0.06 && (
        <Forearm x0={158 + 88} y0={GY - 190} x1={196 + pull * 250} y1={330 + pull * 250} w={23} z={60} />
      )}

      <Chip t="OPEN ANY ONE OF THEM" y={BAND_Y} c={hexa(CREAMB, 0.96)} fg={INK} />
    </Scene>
  );
};

/* =========================================================================
   S8 · THE BURN — 18.93 to 21.08s (64f) · PAYOFF
   VO: "...or delete anything you want it to forget."
   EVENT: before, the file in his hands and a cold incinerator · trigger, the
   door swings up at f8 · travel, the file crosses 330px into the throat ·
   arrival, the door drops, ash goes up, AND THE BAY IT CAME FROM GOES EMPTY.
   ⛔ THE EMPTY BAY IS THE POINT, so it is lit cream from inside and is the
   brightest object left in the frame. An empty container that reads as a patch
   of wall is the standing defect.
   ====================================================================== */
export const S8: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("burn");
  /* ⭐ THREE files, not one, on a run that spans the WHOLE scene: fed at f6,
     f26 and f44 of 64, each with its own bay going dark behind him, each with
     its own door cycle. A repeated reward only reads as progress when it
     climbs, so each one goes in faster than the last. */
  const FEEDS = [6, 26, 44];
  const feedK = (i: number) => E(f, FEEDS[i], FEEDS[i] + 16 - i * 2, 0, 1, IO);
  const doorK = (i: number) => E(f, FEEDS[i] - 4, FEEDS[i] + 2, 0, 1, OUT)
    - E(f, FEEDS[i] + 14 - i * 2, FEEDS[i] + 20 - i * 2, 0, 1, IO);
  const door = Math.max(doorK(0), doorK(1), doorK(2));
  const hot = Math.max(...FEEDS.map((a, i) => E(f, a + 12 - i * 2, a + 18 - i * 2, 0, 1, OUT)
    * (1 - E(f, a + 26, a + 40, 0, 0.6, LIN))));
  const goneK = (i: number) => E(f, FEEDS[i] + 14 - i * 2, FEEDS[i] + 22 - i * 2, 0, 1, OUT);
  const gone = goneK(0);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.12]} vig={0.47} glow={hexa(p.key, 0.22)}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="shelf" overhead="duct"
        rake={0.12} rakeX={RAKE_X[v]} rakeRate={5.6 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="tile" grit={0.6} lamp={{ x: 780, y: 150, r: 250 }} />

      {/* the wall it came out of — and ⭐ THE SLOT GOES EMPTY AND BRIGHT */}
      {[0, 1, 2].map(i => (
        <Bay key={"bb" + i} x={38} y={186 + i * 176} w={306} h={140} z={34} f={f}
          label={R.topics[4 + i]} n={4} c={R.topicColour[4 + i]}
          fill={1 - goneK(i)} lit={goneK(i)} empty={goneK(i) > 0.9} />
      ))}

      {/* the incinerator */}
      <Incinerator x={742} y={GY - 30} s={1.44} z={48} f={f} open={door} hot={hot} />

      {/* three files crossing into the throat, each 330px of travel */}
      {[0, 1, 2].map(i => {
        const k = feedK(i);
        if (f < FEEDS[i] || k >= 1) return null;
        return (
          <TopicFile key={"ff" + i} x={392 + k * 320} y={GY - 150 - i * 66 - Math.sin(k * Math.PI) * 78}
            s={1.10 - k * 0.3} z={54} f={f} topic={R.topics[4 + i]}
            rot={k * 46} burn={Math.max(0, (k - 0.7) * 3)} />
        );
      })}
      {/* the ash going up the duct, big enough to survive the downsample */}
      {hot > 0.05 && Array.from({ length: 7 }, (_, i) => {
        const t = ((f * 0.026 + i * 0.14) % 1);
        return (
          <div key={"as" + i} style={{ position: "absolute", left: 656 + i * 22 + Math.sin(t * 7 + i) * 26,
            top: GY - 220 - t * 330, width: 44, height: 44, borderRadius: "50%", zIndex: 58,
            opacity: (1 - t) * hot * 0.6, filter: "blur(9px)",
            background: `radial-gradient(50% 50% at 50% 50%, ${hexa("#E8D0B0", 0.9)} 0%, ${hexa("#8A6A48", 0)} 100%)` }} />
        );
      })}
      {FEEDS.map((a, i) => (
        <Ring key={"br" + i} x={742} y={GY - 140} f={f} at={a + 14 - i * 2} c={hexa(EMBER, 0.85)} />
      ))}

      {/* HERO: he feeds it in and shuts the door on it */}
      <Hero f={f} x={402} y={GY} size={268} z={56} act={1} ph={1.9}
        costume={{ constr: 1 }} drive={E(f, 12, 22, 0, 0.42, OUT) - E(f, 34, 46, 0, 0.42, IO)}
        reach={130} gaze={0.8} stern={0.4} />
      <Contact x={402} y={GY} w={212} z={40} o={0.30} />

      <Chip t="DELETED FOR GOOD" y={BAND_Y} c={hexa(EMBER, 0.95)} fg="#1E0C02" />
    </Scene>
  );
};

/* =========================================================================
   S9 · THE THREE OUTLETS — 21.08 to 23.85s (84f) · ESCALATE
   VO: "It even works in your browser across the desktop app..."
   ⛔ Reel 115: five identical tiles carried one bit between them. These three
   share NO shape and NO colour — a wide browser with a chrome bar, a bezel on a
   neck and a foot, a tall phone with a notch.
   EVENT: one trunk climbs, a junction splits it, three feeds go live in an
   ASCENDING RUN across the full duration.
   ====================================================================== */
export const S9: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("feeds");
  /* ⛔⛔ REBUILT, and the FIRST thing removed was the expanding `Ring` on each
     device — Alex: *"remove the spinning oval hoop thing."* They were the reward
     rings from S15's vocabulary landing at device height, where they read as
     hoops thrown over the screens.
     ⭐ AND THE SCENE NOW DEPICTS ITS OWN SENTENCE. "It even works in your
     browser across the desktop app" is not three products existing side by side,
     it is the SAME memory being in all of them: he holds ONE file up, it SPLITS
     into three, and the three halves travel out and land in three screens that
     then show the identical thing. One object becoming three is the only picture
     that says "same memory everywhere" without a label. */
  const hold = E(f, 0, 8, 0, 1, BACK);
  const split = E(f, 10, 14, 0, 1, OUT);
  const XS = [176, 506, 852];
  const fly = (i: number) => E(f, 13 + i * 3, 30 + i * 3, 0, 1, IO);
  const lit = (i: number) => E(f, 28 + i * 3, 36 + i * 3, 0, 1, OUT);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.09]} vig={0.52} glow={hexa(p.key, 0.20)}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={2} kind="column" overhead="tray"
        rake={0.11} rakeX={RAKE_X[v]} rakeRate={6.0 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="slab" grit={0.4} lamp={{ x: 506, y: 108, r: 320 }} />

      {/* the three devices — three silhouettes, three colours, nothing shared */}
      <BrowserWin x={XS[0]} y={GY - 122} s={1.06} z={50} f={f} lit={lit(0)} />
      <DeskMachine x={XS[1]} y={GY - 108} s={1.06} z={50} f={f} lit={lit(1)} />
      <PhoneDev x={XS[2]} y={GY - 116} s={1.14} z={50} f={f} lit={lit(2)} />
      {XS.map((fx, i) => (
        <div key={"lb" + i} style={{ position: "absolute", left: fx - 84, top: GY - 92, width: 168,
          textAlign: "center", zIndex: 66, opacity: lit(i) }}>
          <span style={{ ...mono(17, 900), color: hexa("#EAF2FA", 0.92), letterSpacing: 1.8 }}>
            {R.surfaces[i]}</span>
        </div>
      ))}

      {/* ⭐ ONE FILE, HELD UP — then three, travelling out to the three screens */}
      {split < 0.98 && (
        <TopicFile x={506} y={352} s={1.35 * hold} z={62} f={f} c={R.topicColour[0]}
          topic={R.topics[0]} rot={-4} />
      )}
      {split > 0.02 && XS.map((fx, i) => {
        const k = fly(i);
        return (
          <TopicFile key={"cp" + i} x={506 + (fx - 506) * k} y={352 - Math.sin(k * Math.PI) * 96 + k * 96}
            s={1.35 - k * 0.62} z={60} f={f} c={R.topicColour[0]} topic={R.topics[0]}
            rot={-4 + (i - 1) * k * 16} />
        );
      })}

      {/* HERO: it is HIS file, held up, that becomes three */}
      <Hero f={f} x={506} y={GY} size={210} z={58} act={2} ph={0.5}
        costume={{ suit: 1 }} cheer={Math.max(hold * 0.6, lit(2))} gaze={0} />
      <Contact x={506} y={GY} w={170} z={44} o={0.26} />

      <Chip t="ONE FILE · THREE PLACES" y={BAND_Y} c={hexa("#0E1C30", 0.94)} fg="#DCE8F4" />
    </Scene>
  );
};

/* =========================================================================
   S10 · ALL THREE, SHOWING THE SAME THING — 22.06 to 23.67s (48f) · ESCALATE
   VO: "...and even on mobile for all users."
   ⛔⛔ THE VO SAYS "ALL USERS" AND THE FRAME MAY NOT. Memory is on by default on
   Free, Pro and Max; Team/Enterprise is admin-controlled and defaults OFF. The
   plate carries `R.plans`, which is the sourced version of the same idea.
   ====================================================================== */
export const S10: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("feeds");
  const hit = E(f, 16, 21, 0, 1, IN_Q) - E(f, 21, 32, 0, 1, OUT);
  const land = E(f, 20, 26, 0, 1, BACK);
  const XS = [176, 506, 852];
  return (
    <Scene p={p} slug="" push={[0, dur, 1.13]} vig={0.52} glow={hexa(p.key, 0.22)}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={2} kind="column" overhead="tray"
        rake={0.12} rakeX={RAKE_X[v]} rakeRate={7.4 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="slab" grit={0.4} lamp={{ x: 506, y: 112, r: 320 }} />

      {/* ⭐ THE PAYOFF OF S9: all three lit, and all three showing the IDENTICAL
             file. The proof is that the same coloured spine is in every screen. */}
      <BrowserWin x={XS[0]} y={GY - 122} s={1.06} z={50} f={f} lit={1} />
      <DeskMachine x={XS[1]} y={GY - 108} s={1.06} z={50} f={f} lit={1} />
      <PhoneDev x={XS[2]} y={GY - 116} s={1.14} z={50} f={f} lit={1} />
      {XS.map((fx, i) => (
        <TopicFile key={"sm" + i} x={fx} y={GY - 168 + (i === 2 ? 14 : 0)} s={0.62} z={58} f={f}
          c={R.topicColour[0]} topic={R.topics[0]}
          rot={Math.sin(f / 13 + i * 2) * 2.4} />
      ))}

      {/* the STAMP coming down on the plate */}
      <div style={{ position: "absolute", left: 296, top: 196 - 150 + hit * 150, width: 420,
        height: 76, zIndex: 62, borderRadius: 5,
        background: `linear-gradient(180deg, ${mxh(STEEL, 0.30)} 0%, ${dkh(STEEL, 0.40)} 100%)` }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 60,
        transform: `scale(${land})`, transformOrigin: "506px 300px" }}>
        <StampPlate x={506} y={300} s={1.04} z={60} t={R.plans} hit={hit} />
      </div>
      <Puff x={506} y={344} f={f} at={21} c={hexa("#F2E4C4", 0.7)} />

      {/* the floor, cheering the stamp — one frame, all of them */}
      {Array.from({ length: 7 }, (_, i) => (
        <Crew key={"c10" + i} f={f} x={104 + i * 138} y={GY} i={i} size={122} z={46}
          at={1 + i} loop={i % 4}
          cheer={E(f, 21 + (i % 4), 27 + (i % 4), 0, 1, OUT)} />
      ))}

      <Chip t="ON BY DEFAULT" y={BAND_Y} c={hexa(GREEN, 0.95)} fg="#07170F" />
    </Scene>
  );
};

/* =========================================================================
   S11 · FULL GEAR — 25.29 to 27.19s (57f) · ESCALATE
   VO: "Now this completely changes how you use Claude..."
   ⭐ MOTION NEEDS A DESTINATION. There are measurably MORE files at the end of
   this scene than at the start — the wall fills bay by bay while the rail runs
   at double rate. Oscillation repaints pixels and scores; accumulation reads.
   ====================================================================== */
export const S11: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("gear");
  const gear = E(f, 4, 22, 0, 1, OUT);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.13]} vig={0.50} glow={hexa(p.key, 0.26)}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="plant" overhead="gantry"
        rake={0.15} rakeX={RAKE_X[v]} rakeRate={(5.4 + gear * 7.0) * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="slab" grit={0.5} lamp={{ x: 506, y: 112, r: 320 }} />

      {/* the rail, running at double rate once he winds it up */}
      <FileRail y={180} f={f} z={30} rate={4.6 + gear * 9.0} pitch={186} s={0.86} hang={26} />
      <FileRail y={330} f={f} z={28} rate={-(3.4 + gear * 7.4)} pitch={210} s={0.72} hang={20} />

      {/* THE DESTINATION: six bays that FILL across the scene */}
      {Array.from({ length: 6 }, (_, i) => {
        const col = i % 3, row = Math.floor(i / 3);
        return (
          <Bay key={"gb" + i} x={56 + col * 312} y={430 + row * 108} w={276} h={92} z={36 + row}
            f={f} n={5} fill={E(f, 10 + i * 6, 30 + i * 6, 0, 1, OUT)} label={R.topics[i]}
            c={R.topicColour[i]} labelOn={1} />
        );
      })}

      {/* HERO: he WINDS IT UP on a handwheel — his body drives the gear change */}
      <div style={{ position: "absolute", left: 812, top: GY - 250, width: 120, height: 120,
        zIndex: 46, borderRadius: "50%", transform: `rotate(${f * (3 + gear * 16)}deg)`,
        background: `conic-gradient(${dkh(BRASS, 0.32)} 0deg, ${mxh(BRASS, 0.22)} 90deg, ${dkh(BRASS, 0.44)} 200deg, ${mxh(BRASS, 0.10)} 300deg, ${dkh(BRASS, 0.32)} 360deg)`,
        border: `6px solid ${dkh(BRASS, 0.50)}` }}>
        {[0, 72, 144].map(a => (
          <div key={a} style={{ position: "absolute", left: "50%", top: "50%", width: 100, height: 9,
            marginLeft: -50, marginTop: -4.5, background: dkh(BRASS, 0.46),
            transform: `rotate(${a}deg)` }} />
        ))}
      </div>
      <Hero f={f} x={716} y={GY} size={250} z={56} act={1} ph={0.6}
        costume={{ constr: 1 }} strain={0.42 * gear} drive={0.22 * gear} reach={90}
        cheer={E(f, 34, 46, 0, 0.8, OUT)} />
      <Contact x={716} y={GY} w={202} z={40} o={0.30} />
      <Forearm x0={716 + 92} y0={GY - 186} x1={846} y1={GY - 200} w={23} z={58} />

      {[0, 1, 2].map(i => (
        <Crew key={"c11" + i} f={f} x={116 + i * 200} y={GY} i={i + 4} size={136} z={44}
          at={i * 4} loop={2} />
      ))}

      <Chip t="THIS CHANGES THE WHOLE THING" y={BAND_Y} c={hexa(GOLD, 0.96)} fg="#2A1C00" />
    </Scene>
  );
};

/* =========================================================================
   S12 · THE BARRIER — 27.19 to 29.24s (61f) · PEAK
   VO: "...but there's one major catch you need to know before you turn this on."
   ⛔ A BARRIER YOU CAN WALK ROUND DOES NOT READ AS STOPPED. It fills the panel
   edge to edge and floor to ceiling, so there is nothing past its near face.
   EVENT: before, the works running · trigger, the gate lets go at f6 · travel,
   it falls a full 560px · arrival, it lands with a shockwave, the files pile
   against it, and HE RUNS INTO IT FLAT.
   ⛔ RE-FRAMING at f26 — a CUT in to the impact, not a drift.
   ====================================================================== */
export const S12: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("stop");
  const drop = E(f, 6, 15, 0, 1, IN_Q);
  const jolt = rock(f, 15, 16, 12);
  /* he is still running when it lands, and he hits it flat */
  const run = E(f, 0, 20, 0, 1, LIN);
  const bounce = E(f, 20, 26, 0, 1, OUT) - E(f, 26, 44, 0, 1, IO);
  const punch = f >= 26 ? 1.18 : 1.0;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.08]} vig={0.50} glow={hexa(RED, 0.26)}>
      <Cam s={punch} x={f >= 26 ? 40 : 0} y={f >= 26 ? 22 : 0} z={2}>
        <Room p={p} f={f} dx={PAR_X[v]} bands={2} kind="plant" overhead="gantry"
          rake={0.10} rakeX={RAKE_X[v]} rakeRate={5.0 * RAKE_K[v]} rakeN={RAKE_N[v]}
          floorKind="slab" grit={0.7} lamp={{ x: 506, y: 130, r: 230 }} />

        {/* ⭐ the works above the gate keeps running — the barrier stops the LINE,
               it does not stop the world, and a strip of the plant over the top
               is what keeps the shot from being a red rectangle */}
        <FileRail y={122} f={f} z={28} rate={-6.2} pitch={188} s={0.62} hang={18} />
        {/* the conveyor still trying to run, and the files piling against it */}
        <div style={{ position: "absolute", left: -40, top: GY - 88, width: W + 80, height: 26,
          zIndex: 30, background: `linear-gradient(180deg, ${mxh(SLATE, 0.14)} 0%, ${dkh(SLATE, 0.44)} 100%)` }} />
        {Array.from({ length: 8 }, (_, i) => {
          const at = 18 + i * 4;
          const k = E(f, at, at + 12, 0, 1, OUT);
          if (f < at) return null;
          const px = 40 + k * (300 - i * 26);
          return (
            <TopicFile key={"pf" + i} x={px} y={GY - 96 - (i % 3) * 40} s={0.76} z={52} f={f}
              rot={-14 + i * 7 + jolt * 0.4} mark={false} lines={3} />
          );
        })}

        {/* HERO: he RUNS INTO IT FLAT and is stopped dead */}
        <Hero f={f} x={168 + run * 236 - bounce * 78} y={GY} size={256} z={56} act={0} ph={0.2}
          costume={{ constr: 1 }} drive={0.34 - bounce * 0.9} reach={120}
          shock={E(f, 20, 26, 0, 1, OUT) * (1 - E(f, 40, 56, 0, 1, IO))}
          heat={0.55 + 0.35 * E(f, 24, 40, 0, 1, OUT)} stern={1} strain={bounce * 0.5} />
        <Contact x={168 + run * 236 - bounce * 78} y={GY} w={206} z={40} o={0.32} />

        {/* THE BARRIER, over everything */}
        <Barrier y={GY + 30} f={f} z={46} drop={drop} h={438} />
        <Ring x={506} y={GY - 40} f={f} at={15} c={hexa("#FF8A5A", 0.9)} z={60} />
        <Puff x={300} y={GY} f={f} at={15} c={hexa("#E0A080", 0.6)} />
        <Puff x={740} y={GY} f={f} at={16} c={hexa("#E0A080", 0.6)} />
      </Cam>

      <Chip t="ONE CATCH" y={BAND_Y} c={hexa("#FFE2D4", 0.97)} fg="#3A0C04" />
    </Scene>
  );
};

/* =========================================================================
   S13 · THE SELECTOR — 29.24 to 31.06s (55f) · TURN
   VO: "If you set your tasks to run locally on your machine..."
   §3: the verb is SET and the noun is YOUR MACHINE, so: a two-position selector
   he throws, and the second position REVEALS a place.
   EVENT: before, the cloud feed connected overhead · trigger, he throws it at
   f10 · travel, the feed lifts 240px and the shed comes up out of the dark ·
   arrival, the coupling breaks with a clank and the shed's window lights.
   ====================================================================== */
export const S13: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("shed");
  /* ⛔⛔ REBUILT. v1 drew "set your tasks to run locally on your machine" as a
     SHED being revealed by a lever, and Alex was right that it depicts none of
     it: a shed is a CONTAINER for "somewhere local". The line's verb is SET,
     its object is YOUR TASKS and its place is YOUR MACHINE — so the shot is a
     TASK CARD with a two-position selector on it, thrown from CLOUD to THIS
     MACHINE by hand, and carried down onto a LAPTOP that wakes up and runs it. */
  const thr = E(f, 10, 20, 0, 1, IO);          /* he throws the selector */
  const carry = E(f, 22, 42, 0, 1, IO);        /* the card travels to the deck */
  const wake = E(f, 40, 50, 0, 1, OUT);        /* the machine takes the job */
  const CX = 268 + carry * 452, CY = 176 + carry * 396;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.11]} vig={0.46} glow={hexa(p.key, 0.20)}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={1} kind="column" overhead="none"
        rake={0.09} rakeX={RAKE_X[v]} rakeRate={4.4 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="tarmac" grit={0.6} lamp={{ x: 700, y: 96, r: 300 }} />

      {/* the cloud the task is leaving, and the feed that was serving it */}
      <div style={{ position: "absolute", left: 74, top: 78, width: 420, height: 150, zIndex: 30,
        opacity: 1 - carry * 0.34 }}>
        {[[0, 32, 176, 112], [116, 0, 206, 146], [252, 36, 162, 108]].map(([cx, cy, cw, ch], i) => (
          <div key={"cl" + i} style={{ position: "absolute", left: cx, top: cy, width: cw, height: ch,
            borderRadius: "50%",
            background: `linear-gradient(176deg, #FFFFFF 0%, ${hexa("#D6E2F0", 0.96)} 58%, ${hexa("#9EB4CE", 0.92)} 100%)` }} />
        ))}
      </div>
      <div style={{ position: "absolute", left: 150, top: 122, width: 200, textAlign: "center", zIndex: 33 }}>
        <span style={{ ...mono(21, 900), color: hexa("#2A3A4E", 0.72), letterSpacing: 2.4 }}>
          {R.cloud}</span>
      </div>
      {/* the supply the cloud was running, and the frame it stops */}
      <div style={{ position: "absolute", left: -40, top: 244, width: 640, height: 13, zIndex: 31,
        opacity: 1 - carry * 0.7,
        background: `linear-gradient(180deg, ${mxh(SKY, 0.46)} 0%, ${dkh(SKY, 0.22)} 100%)` }} />
      {Array.from({ length: 6 }, (_, i) => {
        const run = Math.min(f, 22);
        const t = (((i * 0.17) + run * 0.030) % 1);
        return (
          <TopicFile key={"cf" + i} x={-70 + t * 700} y={242} s={0.72} z={33} f={f}
            c={R.topicColour[(i + 2) % R.topicColour.length]} mark={false} lines={3}
            rot={Math.sin(f / 9 + i) * 3} />
        );
      })}

      {/* the bench, and YOUR MACHINE standing on it */}
      <div style={{ position: "absolute", left: -40, top: GY - 66, width: W + 80, height: 26,
        zIndex: 30, background: `linear-gradient(180deg, ${mxh(SLATE, 0.20)} 0%, ${dkh(SLATE, 0.36)} 100%)` }} />
      <Laptop x={760 + LAY[v].shed * 0.2} y={GY - 56} s={1.30} z={44} f={f}
        lit={0.30 + wake * 0.70} running={wake} label="YOUR MACHINE" memEmpty={0} />

      {/* ⭐ THE TASK, AND THE SETTING ON IT. The selector slides under his hand
             and then the whole card is carried down onto the deck. */}
      <TaskCard x={CX} y={CY} s={1.42 - carry * 0.42} z={58} f={f}
        title="NIGHTLY REPORT" local={thr} rot={-8 + carry * 14} />
      <Ring x={720} y={GY - 168} f={f} at={44} c={hexa(SODIUM, 0.85)} />

      {/* HERO: he throws the switch, then follows the card down */}
      <Hero f={f} x={352} y={GY} size={330} z={56} act={3} ph={1.3}
        costume={{ suit: 1 }} drive={0.26 * thr + 0.20 * carry} reach={132}
        gaze={0.9} cheer={E(f, 46, 56, 0, 0.6, OUT)} />
      <Contact x={352} y={GY} w={264} z={40} o={0.30} />
      {thr > 0.06 && carry < 0.3 && (
        <Forearm x0={352 + 112} y0={GY - 258} x1={CX - 76} y1={CY + 18} w={25} z={57} />
      )}

      <Chip t="SET IT TO RUN ON YOUR MACHINE" y={BAND_Y} c={hexa(SODIUM, 0.95)} fg="#241400" />
    </Scene>
  );
};

/* =========================================================================
   S14 · THE LINE THAT DOES NOT REACH IT — 29.43 to 31.72s (69f) · VILLAIN WINS
   VO: "...the memory won't sync because it only works in the cloud."
   ⛔⛔ REBUILT with S13. The catch is not "there is a shed": it is that the
   MEMORY is in the cloud and the job is not, so the two are on opposite sides
   of a break. Two lanes in one frame — the cloud lane full and streaming, the
   line down to the laptop severed, the files falling into the same hazard-lipped
   hatch that ate them at S3 — and the machine's own MEMORY slot reading EMPTY
   in red while its task runs perfectly well without one.
   ⭐ THE VILLAIN IS NEVER BEATEN: same slot, same fall, same nothing.
   ====================================================================== */
export const S14: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("shed");
  const DROPS = [8, 22, 36, 50];
  return (
    <Scene p={p} slug="" push={[0, dur, 1.10]} vig={0.47} glow={hexa(p.key, 0.18)}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={1} kind="column" overhead="none"
        rake={0.08} rakeX={RAKE_X[v]} rakeRate={4.0 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="tarmac" grit={0.6} lamp={{ x: 300, y: 88, r: 280 }} />

      {/* ── THE UPPER LANE: the memory, in the cloud, full and running ── */}
      <div style={{ position: "absolute", left: 40, top: 60, width: 430, height: 152, zIndex: 30 }}>
        {[[0, 34, 180, 114], [120, 0, 210, 148], [258, 38, 166, 110]].map(([cx, cy, cw, ch], i) => (
          <div key={"c14" + i} style={{ position: "absolute", left: cx, top: cy, width: cw, height: ch,
            borderRadius: "50%",
            background: `linear-gradient(176deg, #FFFFFF 0%, ${hexa("#D6E2F0", 0.96)} 58%, ${hexa("#9EB4CE", 0.92)} 100%)` }} />
        ))}
      </div>
      <div style={{ position: "absolute", left: -40, top: 236, width: 560, height: 15, zIndex: 34,
        background: `linear-gradient(180deg, ${mxh(SKY, 0.52)} 0%, ${dkh(SKY, 0.20)} 100%)` }} />
      {/* ⛔⛔ THIS SCENE'S MIDDLE WAS DEAD IN ALL THREE CUTS (Q2 3.70 / 3.85 /
             3.9) and only the house cut cleared the bar, because its rake phase
             happened to be busier at the two ends. A metric that a per-variant
             rake can decide is not measuring the scene. The lane is the widest
             band in the frame and it was moving 0.72-scale files at 7.6px a
             frame: a two-row stream at 0.95 and 11.4px repaints the whole top
             third of the panel every sample, in every cut. */}
      {Array.from({ length: 10 }, (_, i) => {
        const row = i % 2;
        const x = (((i * 62 + f * (11.4 + row * 2.6)) % 600) + 600) % 600 - 96;
        return <TopicFile key={"cf" + i} x={x} y={row ? 214 : 250} s={0.95 - row * 0.16}
          z={row ? 35 : 37} f={f}
          c={R.topicColour[i % R.topicColour.length]} mark={false} lines={3}
          rot={Math.sin(f / 9 + i) * 3.4} />;
      })}

      {/* ⛔ THE BREAK, and the same hatch that ate them at S3 */}
      <CutEnd x={470} y={244} s={1.24} z={52} f={f} spark={0.85} />
      <Gap x={520} y={GY - 96} w={280} f={f} z={42} plate={0} depth={240} />

      {/* the memory arriving, reaching the cut, and going into the hole */}
      {DROPS.map((at, i) => {
        const run = E(f, at, at + 14, 0, 1, LIN);
        const fall = E(f, at + 14, at + 36, 0, 1, IN_Q);
        if (f < at || fall >= 1) return null;
        return (
          <TopicFile key={"df" + i} x={-60 + run * 560 + fall * 90} y={232 + fall * 420}
            s={1.14} z={fall > 0.05 ? 40 : 50} f={f} c={R.topicColour[(i + 3) % R.topicColour.length]}
            topic={R.topics[(i + 2) % R.topics.length]} rot={fall * -74} />
        );
      })}

      {/* what the hole throws back — nothing arrives, but something LEAVES */}
      {DROPS.map((at, i) => {
        const t = E(f, at + 30, at + 44, 0, 1, OUT);
        if (t <= 0 || t >= 1) return null;
        return Array.from({ length: 5 }, (_, j) => {
          const dir = j % 2 ? 1 : -1;
          return (
            <div key={`sp${i}_${j}`} style={{ position: "absolute",
              left: 612 + dir * t * (90 + j * 40) - 17,
              top: GY - 96 - Math.sin(t * Math.PI) * (120 + j * 24) + t * t * 130,
              width: 34, height: 42, borderRadius: 3, zIndex: 44, opacity: 1 - t * 0.6,
              transform: `rotate(${j * 53 + t * dir * 240}deg)`,
              background: `linear-gradient(180deg, ${PAPER} 0%, ${dkh(PAPER, 0.22)} 100%)` }} />
          );
        });
      })}

      {/* ── THE LOWER LANE: the machine, working, with nothing in its slot ── */}
      <div style={{ position: "absolute", left: -40, top: GY - 66, width: W + 80, height: 26,
        zIndex: 30, background: `linear-gradient(180deg, ${mxh(SLATE, 0.20)} 0%, ${dkh(SLATE, 0.36)} 100%)` }} />
      <Laptop x={800} y={GY - 60} s={1.18} z={44} f={f} lit={1} running={1}
        label="YOUR MACHINE" memEmpty={1} />

      {/* ⭐⭐ THE RIGHT HALF WAS 46% OF THE PANEL AND NOTHING IN IT MOVED. A
             scene is only as alive as its deadest half, and every accumulator
             here — the lane, the fall, the hatch — was left of centre. This is
             also the scene's actual sentence: the machine ASKS, three times, and
             each request climbs, stalls short of the severed end and drops back.
             It is the villain winning in the one place the eye had nothing. */}
      {[5, 25, 45].map((at, i) => {
        const out  = E(f, at, at + 9, 0, 1, OUT);
        const back = E(f, at + 14, at + 21, 0, 1, IN_Q);
        const k = out - back;
        if (k <= 0.002) return null;
        const len = 306 * k;
        return (
          <React.Fragment key={"rq" + i}>
            <div style={{ position: "absolute", left: 790, top: GY - 196 - len,
              width: 22, height: len, zIndex: 46, borderRadius: 11,
              background: `linear-gradient(0deg, ${hexa(RED, 0.18)} 0%, ${hexa("#FFD8C8", 0.95)} 100%)`,
              boxShadow: `0 0 34px ${hexa(RED, 0.62)}` }} />
            {/* the head of it, hunting sideways for a line that is not there */}
            <div style={{ position: "absolute",
              left: 762 + Math.sin((f - at) / 2.6) * 34 * out, top: GY - 214 - len,
              width: 78, height: 30, zIndex: 47, borderRadius: 15, opacity: k,
              background: `radial-gradient(50% 50% at 50% 50%, ${hexa("#FFF0E6", 0.95)} 0%, ${hexa(RED, 0)} 100%)` }} />
            {f >= at + 12 && f < at + 20 && (
              <Ring x={800} y={GY - 202 - len} f={f} at={at + 12} c={hexa(RED, 0.9)} />
            )}
          </React.Fragment>
        );
      })}

      {/* HERO: at the break, and he cannot reach across it */}
      <Hero f={f} x={286} y={GY} size={276} z={56} act={3} ph={0.8}
        costume={{ constr: 1 }} gaze={0.9} stern={0.85}
        /* ⛔ he was STANDING. In the scene where the villain wins, the hero has
           to try: two lunges at the break, each shorter than the last. */
        drive={E(f, 10, 20, 0, 1, IO) * 0.52 - E(f, 22, 34, 0, 1, IO) * 0.52
               + E(f, 38, 46, 0, 1, IO) * 0.34 - E(f, 48, 58, 0, 1, IO) * 0.34}
        reach={168}
        strain={0.30 + 0.34 * E(f, 12, 22, 0, 1, IO)}
        heat={0.32 * E(f, 30, 52, 0, 1, OUT)} />
      <Contact x={286} y={GY} w={224} z={40} o={0.30} />

      <Chip t="THE MEMORY STAYS IN THE CLOUD" y={BAND_Y} c={hexa(RED, 0.94)} fg="#FFEDE6" />
    </Scene>
  );
};

/* =========================================================================
   S15 · THE GATE — 33.34 to 34.60s (38f) · CTA
   VO: "Comment MEM for the free setup."
   ⛔ HARD CUT ON THE KEYWORD. The reel ends on the strike, with no tail.
   ====================================================================== */
export const S15: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("gate");
  const hit = E(f, 8, 13, 0, 1, IN_Q) - E(f, 13, 26, 0, 1, OUT);
  const land = E(f, 2, 12, 0, 1, BACK);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.15]} vig={0.30} glow={hexa(p.key, 0.28)}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={2} kind="rack" overhead="lampbar"
        rake={0.14} rakeX={RAKE_X[v]} rakeRate={7.0 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="slab" grit={0.5} lamp={{ x: 506, y: 120, r: 300 }} />
      <FileRail y={168} f={f} z={28} rate={7.6} pitch={190} s={0.80} hang={24} />

      {/* the drop hammer coming down on the plate */}
      <div style={{ position: "absolute", left: 336, top: 150 - 170 + hit * 170, width: 340,
        height: 96, zIndex: 76, borderRadius: 6,
        background: `linear-gradient(180deg, ${mxh(STEEL, 0.30)} 0%, ${dkh(STEEL, 0.42)} 100%)` }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 74,
        transform: `scale(${land})`, transformOrigin: "50% 42%" }}>
        <StampPlate x={506} y={332} s={1.12} z={74} t={R.keyword} hit={hit} />
      </div>
      <Ring x={506} y={332} f={f} at={13} c={hexa(GOLD, 0.92)} />
      <Puff x={506} y={392} f={f} at={13} c={hexa("#F6E6C0", 0.66)} />

      {/* the crew cheering the strike */}
      {Array.from({ length: 5 }, (_, i) => (
        <Crew key={"c15" + i} f={f} x={92 + i * 208} y={GY} i={i + 2} size={140} z={48}
          at={i} loop={2} cheer={E(f, 13 + i, 20 + i, 0, 1, OUT)} />
      ))}

      <Mark x={40} y={150} s={70} z={90} />
      <Chip t="COMMENT FOR THE FREE SETUP" y={BAND_Y} c={hexa(CREAMB, 0.97)} fg={INK} />
    </Scene>
  );
};
