import React from "react";
import { useCurrentFrame } from "remotion";
import { E, OUT, IO, BACK, IN_Q, LIN, W, H, hexa, dkh, mxh, rnd, mono, SH,
  Scene, Cam, MarkCast, Hero, Crew, Contact, squash, GY,
  CLAY, GOLD, DIFFG, DIFFR, INK, TEAL, VIOLET, FileSlab, R } from "./IntWorld";
import { Link, Sparks } from "./IntShop";
/* ⭐⭐⭐ THE ARCHITECTURE LAYER. `feedback_rooms_need_an_architecture_layer`:
   "'background more detailed, more polished' = ONE component, not fifteen sets."
   `Fitout` draws a cornice in three members, a clerestory of lit openings with
   mullions and transoms, pilasters with caps, a panelled dado and a skirting —
   and takes its ENTIRE palette from the room's own `Place`, so each scene keeps
   its hue and value and simply gains structure.
   ⛔ `seed` drives the ARCHITECTURE, not a hue, so fifteen rooms are not one
   room repainted. ⭐ On reel 132 it paid for itself in motion (10.16 -> 11.01)
   because built architecture parallaxes with the push and a flat gradient does
   not. ⛔ Everything it draws sits in a narrow band around the wall's own value,
   so the props and sprites keep every hard edge in the frame. */
import { Fitout } from "./JudgeWorld";
import { HitPlate } from "./IntBays";
/* ⭐⭐⭐ THE MEASURED CLASS DEFECT. Shipped scenes compose 17-23 DISTINCT drawn
   components; mine composed 8-9, i.e. a third of the content. Every note in this
   build — "shape heavy", "same scene over and over", "why am I looking at a ring
   so much", "not interesting" — is that one number, because with 8 slots and no
   library the same prop has to fill them all.
   ⛔ AND FIXING IT BY DRAWING MORE <div>s IS THE SAME MISTAKE: shipped scenes
   compose NAMED OBJECTS, so the eye finds a toolbox, a drum, a stack of tyres —
   things it can name — not more rectangles. These are the house's own drawn
   props, already approved on shipped reels. */
import { Toolbox, Drum, TyreStack, Bench, Hook, Chain } from "./RpsSets";
import { Gallery, Alcove, Folder, ExhibitWall, AppShell, PageSlab } from "./JudgeProps";
import { BayLamp, LightColumn, Lift } from "./RpsSets";
import { Cracks, Shards, Flurry, Gauge, Station, JobCan, TickDisc, Spinner,
         BigGauge, CodeLines, PipRow } from "./AdhProps";
/* ⛔ THE OTHER HALF OF THE DEFECT: "cluttered" is a REPEAT count, not an object
   count. So the assignment below is deliberate — NO prop appears in more than
   two of the three rooms, and the five that carry each room's own event
   (Cracks/Shards/Flurry on the site, Station/JobCan/Lift on the line) appear in
   exactly one. Density without repetition. */
import type { Place } from "./IntWorld";

/* ===========================================================================
   REEL 140 · "INTENT" — THE ROOMS.

   ⛔⛔⛔ THE DEFECT THIS FILE EXISTS TO FIX. Alex: *"why do you keep going to the
   animation scene with him hammering… it's just the same scene over and over
   again… no different backgrounds, no different scenes, so boring."*

   He is describing `feedback_reel_vary_the_locations` word for word — *"a new
   light + colour every 2-4s; INTERIORS ALL COUNT AS ONE PLACE"* — and I had
   built fifteen beats inside a single workshop. Then, when scenes measured
   static, I dressed the SAME `BgForge` into eight of them: the fix I reached for
   was "play the identical animation eight more times"
   (`feedback_one_shot_nineteen_times`).

   ⭐ So each beat now gets its OWN ARCHITECTURE, not the same wall re-tinted.
   Different structure, different light direction, different verb, and the
   hammer appears exactly once in the whole reel — in the hook.

   ⛔ NEIGHBOURING ROOMS DIFFER BY HUE **AND** LIGHTNESS, so no two consecutive
   beats sit in the same value band.
   ========================================================================= */

type SP = { v?: unknown; dur: number; at?: number };

const pl = (back: string, back2: string, floor: string, floor2: string,
            lip: string, key: string, grit: string, horizon = 480): Place =>
  ({ back, back2, floor, floor2, lip, key, horizon, grit });

/* =========================================================================
   S1 · THE ATRIUM.  "And even the creator of Claude Code said that this will
   change vibe coding forever."
   A cold glass hall: full-height glazing, a mezzanine rail, daylight from
   above. Nothing is forged here and there is no anvil in frame.
   ⛔ NO name, NO quote, NO face — the room ARRIVING is the whole beat.
   ====================================================================== */
export const R_ATRIUM: React.FC<SP> = ({ dur }) => {
  const f = useCurrentFrame();
  const P = pl("#1E3A5C", "#9FC6E4", "#7E96AC", "#3E5468", "#16222E", "#DCEEFA", "#101A24", 466);
  const N = 8;
  return (
    <Scene p={P} slug="" push={[0, dur, 1.07]} vig={0.24}>
      <Cam x={Math.sin(f / 30) * 4} s={1} z={12}>
        <Fitout p={P} f={f} seed={2} lift={0.9} arch z={5} />
        {/* full-height glazing — vertical mullions, a bright sky behind */}
        <div style={{ position: "absolute", left: 0, top: 0, width: W, height: 560, zIndex: 8,
          background: "linear-gradient(178deg, #CFE6F6 0%, #9CC2DE 62%, #6E90AC 100%)" }} />
        {Array.from({ length: 9 }, (_, i) => (
          <React.Fragment key={"ml" + i}>
            <div style={{ position: "absolute", left: i * (W / 8) - 7, top: 0, width: 14,
              height: 560, zIndex: 10, background: "#3E5468" }} />
            {/* the light that falls through each bay */}
            <div style={{ position: "absolute", left: i * (W / 8) - 52, top: 40, width: 104,
              height: 520, zIndex: 9, opacity: 0.20 + (i % 3) * 0.06,
              background: `linear-gradient(184deg, ${hexa("#FFFFFF", 0.9)}, transparent 78%)` }} />
          </React.Fragment>
        ))}
        <div style={{ position: "absolute", left: 0, top: 250, width: W, height: 12, zIndex: 11,
          background: "#3E5468" }} />
        {/* the mezzanine rail — the room has a storey above it */}
        <div style={{ position: "absolute", left: 0, top: 300, width: W, height: 34, zIndex: 24,
          background: "linear-gradient(180deg, #6E8CA4, #35485A)" }} />
        {Array.from({ length: 22 }, (_, i) => (
          <div key={"bl" + i} style={{ position: "absolute", left: 14 + i * 46, top: 334,
            width: 7, height: 62, zIndex: 23, background: hexa("#35485A", 0.8) }} />
        ))}
        <div style={{ position: "absolute", left: 0, top: 396, width: W, height: 16, zIndex: 24,
          background: "#2A3A48" }} />
        {/* the polished floor */}
        <div style={{ position: "absolute", left: 0, top: 560, width: W, height: H - 560, zIndex: 20,
          background: "linear-gradient(180deg, #8FA8BC, #3E5468)" }} />
        <div style={{ position: "absolute", left: 0, top: 560, width: W, height: 190, zIndex: 21,
          opacity: 0.22, background: `linear-gradient(180deg, ${hexa("#FFFFFF", 0.9)}, transparent)` }} />

        {/* ⭐ the one lit thing in a cold room */}
        <div style={{ position: "absolute", left: W / 2 - 200, top: 596, width: 400, height: 104,
          zIndex: 52, borderRadius: 8,
          background: "linear-gradient(180deg, #E6EEF6, #A8BECE)", border: "5px solid #6E8CA4" }} />
        {/* ⛔⛔⛔ THE RING WAS THE WHOLE NOTE. "why am i just looking a ring so
            much" was not about this scene — the forged link was the hero of
            THIRTEEN OF FIFTEEN scenes, because I picked a chain as the reel's
            metaphor and then had nothing else to put on screen. It also read as
            a TYRE at 286px. The subject of this reel is a FILE, and the house
            rule is already written down: use the subject's OWN object, never an
            invented one. So the ring survives in exactly two places — the hook,
            which forges it, and the loop, which closes it — and everywhere else
            the hero is the artifact the script is actually about. */}
        <MarkCast x={W / 2} y={412} s={640} z={48} f={f} spin={1.1} pulse={0.45} o={0.30} />
        <FileSlab x={W / 2} y={412} w={456} h={604} z={60} f={f} name={R.hero}
          fields={R.fields} fieldsIn={E(f, 16, 52, 0, 1, OUT)}
          glowK={E(f, 8, 26, 0, 1, OUT)} />
        <Contact x={W / 2 - 210} y={590} w={420} z={50} o={0.34} />

        {/* the room is a PLACE, not a backdrop: lit alcoves along the wall, a
            board, a gallery above the rail, papers left on the floor */}
        <LightColumn x={250} on={0.5} w={210} c="#DCEEFA" z={12} top={0} />
        <LightColumn x={W - 250} on={0.38} w={210} c="#DCEEFA" z={12} top={0} />
        <PipRow lit={Math.min(1, f / 40)} y={64} z={70} d={13} f={f} at={6} />
        <AppShell x={W - 196} y={470} f={f} k={Math.min(1, Math.max(0, (f - 14) / 26))} z={44} s={0.62} />
        <PageSlab x={168} y={478} f={f} k={Math.min(1, Math.max(0, (f - 22) / 26))} z={44} s={0.58} />
        <CodeLines x={352} y={214} w={330} n={7} h={9} gap={15} c="#9FC4DE" o={0.5}
          seed={4} f={f} scroll={0.5} syntax={0.5} z={18} />
        <Alcove x={112} y={168} w={200} h={210} z={16} c="#DCEEFA" on={0.8} t="PROBLEM" />
        <Alcove x={W - 112} y={168} w={200} h={210} z={16} c="#DCEEFA" on={0.6} t="CONSTRAINTS" />
        <ExhibitWall x={300} y={150} w={420} h={150} z={15} f={f} cols={5} />
        <Gallery f={f} x0={60} x1={W - 60} y={334} n={9} ranks={1} />
        <Folder x={140} y={GY + 6} rot={-8} c="#C4D8E8" s={0.9} z={54} />
        <Folder x={W - 150} y={GY + 12} rot={6} c="#B4CCE0" s={0.85} z={54} />
        {/* the crowd floods IN and stays — the population only grows */}
        {Array.from({ length: N }, (_, i) => {
          const left = i % 2 === 0, slot = Math.floor(i / 2);
          const t0 = 1 + i * 4;
          const k = E(f, t0, t0 + 11, 0, 1, OUT);
          const dest = left ? 96 + slot * 84 : W - 96 - slot * 84;
          const from = left ? -150 : W + 150;
          return <Crew key={i} f={f} x={from + (dest - from) * k} y={GY + 28 + (slot % 2) * 14}
            i={i} size={128} z={70 + (i % 3)} at={t0} flip={!left}
            tint={i % 4 === 0 ? CLAY : i % 4 === 2 ? TEAL : undefined} />;
        })}
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S2 · THE SITE.  "the biggest problem with AI coding isn't getting to write
   code, it's getting to actually understand what you're trying to build."
   A construction site at dusk: scaffold, a crane, floodlights, spoil. A tower
   goes up FAST and CROOKED, then comes down. No anvil, no hammer.
   ====================================================================== */
export const R_SITE: React.FC<SP> = ({ dur }) => {
  const f = useCurrentFrame();
  const P = pl("#4A1E0E", "#C4602A", "#7E4020", "#2E1608", "#160A04", "#FFB472", "#120704", 500);
  const NB = 22, FALL = 96;
  const fall = Math.max(0, (f - FALL) / 34);
  return (
    <Scene p={P} slug="" push={[0, dur, 1.045]} vig={0.42}>
      <Cam x={Math.sin(f / 26) * 5 + (f >= FALL && f < FALL + 16 ? Math.sin(f * 8) * 10 : 0)}
        y={f >= FALL && f < FALL + 16 ? 6 : 0} s={1} z={12}>
        <Fitout p={P} f={f} seed={7} lift={0.72} arch={false} z={5} />
        {/* dusk sky and the city line behind the site */}
        <div style={{ position: "absolute", inset: 0, zIndex: 6,
          background: "linear-gradient(178deg, #C4602A 0%, #7A3316 46%, #2E1608 100%)" }} />
        {Array.from({ length: 11 }, (_, i) => (
          <div key={"sk" + i} style={{ position: "absolute", left: i * 100 - 20,
            top: 300 + (i % 4) * 46, width: 84, height: 300, zIndex: 7,
            background: hexa("#241008", 0.72) }} />
        ))}
        {/* the crane — a real arm across the top of frame */}
        <div style={{ position: "absolute", left: 120, top: 60, width: 34, height: 520, zIndex: 16,
          background: "linear-gradient(90deg, #6E3A18, #C4802A, #6E3A18)" }} />
        <div style={{ position: "absolute", left: 120, top: 96, width: W - 200, height: 24, zIndex: 17,
          background: "linear-gradient(180deg, #C4802A, #6E3A18)" }} />
        {/* the crane hoists a course in, swinging, on its own clock */}
        {(() => {
          const t = (f % 34) / 34;
          const hx = 300 + t * 520;
          const hy = 120 + 130 + Math.sin(t * Math.PI) * 90;
          return (<>
            <div style={{ position: "absolute", left: hx, top: 120, width: 6, height: hy - 120,
              zIndex: 17, background: "#3A1E0A" }} />
            <div style={{ position: "absolute", left: hx - 62, top: hy, width: 124, height: 26,
              zIndex: 18, borderRadius: 4, transform: `rotate(${Math.sin(t * 6.2) * 7}deg)`,
              background: "linear-gradient(168deg, #C9BFA6, #7E7160)", border: "3px solid #4A4034" }} />
          </>);
        })()}
        {/* scaffold on the right */}
        {Array.from({ length: 5 }, (_, i) => (
          <div key={"sc" + i} style={{ position: "absolute", left: 860, top: 250 + i * 80,
            width: 190, height: 8, zIndex: 18, background: hexa("#C4802A", 0.7) }} />
        ))}
        {/* floodlights */}
        {[70, W - 70].map((x, i) => (
          <React.Fragment key={"fl" + i}>
            <div style={{ position: "absolute", left: x - 34, top: 160, width: 68, height: 40,
              zIndex: 30, borderRadius: 6, background: "#FFD9A0", border: "4px solid #6E3A18" }} />
            <div style={{ position: "absolute", left: x - 190, top: 196, width: 380, height: 520,
              zIndex: 12, opacity: 0.22,
              background: `linear-gradient(180deg, ${hexa("#FFD9A0", 0.9)}, transparent 76%)`,
              clipPath: "polygon(44% 0%, 56% 0%, 100% 100%, 0% 100%)" }} />
          </React.Fragment>
        ))}
        {/* the ground and the spoil */}
        <div style={{ position: "absolute", left: 0, top: GY - 10, width: W, height: H - GY + 40,
          zIndex: 22, background: "linear-gradient(180deg, #7E4020, #2E1608)" }} />
        {/* the pad the tower actually stands on — without it the stack floats */}
        <div style={{ position: "absolute", left: 380, top: GY - 30, width: 440, height: 30,
          zIndex: 24, borderRadius: 5, background: "linear-gradient(180deg, #9E8A6E, #5A4A34)",
          border: "4px solid #3A2E1E" }} />
        {/* ⭐ THE TOWER — it goes up FAST and CROOKED, then it comes down */}
        {Array.from({ length: NB }, (_, i) => {
          const t0 = 3 + i * 3.4;
          const on = E(f, t0, t0 + 5, 0, 1, OUT);
          if (on <= 0.01) return null;
          const lean = (i - NB / 2) * 5.5;                 /* it is never straight */
          const bw = 300 - (i % 3) * 38;
          const bx = 596 + lean * 2.6;
          const by = GY - 26 - i * 36;
          const fx = fall * fall * (150 + rnd(i, 3) * 340) * (i % 2 ? 1 : -1);
          const fy = fall * fall * 470 - fall * (90 + rnd(i, 7) * 70);
          return (
            <div key={"bk" + i} style={{ position: "absolute", left: bx - bw / 2 + fx,
              top: by + fy - (1 - on) * 46, width: bw, height: 30, zIndex: 50 + i,
              opacity: on * (1 - fall * 0.2), borderRadius: 5,
              transform: `rotate(${lean * 0.5 + fall * (i % 2 ? 210 : -180)}deg) scaleY(${on})`,
              background: `linear-gradient(168deg, #C9BFA6, #7E7160)`,
              border: "3px solid #4A4034" }} />
          );
        })}
        {fall > 0 && Array.from({ length: 5 }, (_, k) => (
          <Sparks key={"ds" + k} f={f} at={FALL + k * 3} x={430 + k * 120} y={GY - 60}
            n={26} z={86} spread={1.4} up={0.4} floorY={GY + 20} power={0.7} />
        ))}
        {/* the site is dressed: tools, drums, tyres, a hoist hook, spoil */}
        <BayLamp x={214} y={128} c="#FFCE7A" on={0.9} f={f} z={14} s={0.9} />
        <BayLamp x={W - 214} y={128} c="#FFCE7A" on={0.75} f={f} z={14} s={0.9} />
        <Gauge x={W - 150} y={GY - 96} s={0.8} z={50} k={Math.min(1, f / 90)} f={f}
          fail={f > 96 ? 1 : 0} />
        {/* the collapse is a SEQUENCE, not a cut: it cracks, it goes, the dust
            climbs, and the ground plate takes the weight */}
        <Cracks x={556} y={302} d={300} k={Math.min(1, Math.max(0, (f - 84) / 12))} z={62} seed={3} />
        <Shards x={556} y={330} f={f} at={96} n={16} z={64} s={1.15} c="#C8B49A" />
        <Flurry x={556} y={GY - 10} f={f} at={99} n={22} z={63} s={1.3} spread={340} />
        <HitPlate x={556} y={GY + 4} w={330} hit={f >= 99 ? 1 : 0} z={43} />
        <Toolbox x={92} y={GY + 6} s={0.95} z={48} c="#B8402E" />
        <Drum x={318} y={GY + 10} s={0.9} z={46} c="#C4802A" />
        <Drum x={392} y={GY + 16} s={0.75} z={45} c="#7E5A20" />
        <TyreStack x={932} n={4} s={0.8} z={46} bottom={GY + 20} />
        <Bench x={210} y={GY + 30} w={300} s={0.7} z={44} />
        <Chain x={840} top={120} len={220} z={30} swing={Math.sin(f / 26) * 4} w={14} />
        <Hook x={840} y={336} s={1.2} z={31} swing={Math.sin(f / 26) * 4} />
        <Hero f={f} x={186} y={GY + 30} size={300} z={70} costume={{ constr: 1 }}
          gaze={0.8} shock={fall > 0.05 && fall < 1 ? 1 : 0} strain={fall > 0 ? 0 : 0.4} act={1} />
        {Array.from({ length: 2 }, (_, i) => (
          <Crew key={i} f={f} x={936 + i * 76} y={GY + 20} i={i + 3} size={104} z={64} at={-14} />
        ))}
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S9 · THE LINE.  "Claude can turn it into a full spec, then an implementation
   plan, and actually build and test the feature automatically."
   A production line: a belt running the full width, four gantry stations, and
   the artifact travelling through them. THREE ARRIVALS on three clauses.
   ====================================================================== */
export const R_LINE: React.FC<SP> = ({ dur }) => {
  const f = useCurrentFrame();
  const P = pl("#2A1848", "#8C6CC8", "#4A3078", "#1A1030", "#0A0614", "#DCC4F4", "#0C0718", 470);
  const AT = [8, 44, 82];
  const BX = [156, 402, 648, 894];
  const stage = AT.filter((a) => f >= a).length;
  const prog = stage === 0 ? Math.min(1, f / 8) : Math.min(1, (f - AT[stage - 1]) / 16);
  const x = BX[stage] * prog + BX[Math.max(0, stage - 1)] * (1 - prog);
  const BELT = 560;
  return (
    <Scene p={P} slug="" push={[0, dur, 1.04]} vig={0.34}>
      <Cam x={Math.sin(f / 30) * 4} s={1} z={12}>
        <Fitout p={P} f={f} seed={11} lift={0.85} arch z={5} />
        {/* the hall */}
        <div style={{ position: "absolute", inset: 0, zIndex: 6,
          background: "linear-gradient(178deg, #6E52A8 0%, #2A1848 58%, #150C28 100%)" }} />
        {/* four gantry stations — real structure, each with its own lamp */}
        {BX.map((bx, i) => {
          const lit = i === 0 ? 1 : f >= AT[i - 1] ? Math.min(1, (f - AT[i - 1]) / 7) : 0.12;
          const c = [GOLD, TEAL, VIOLET, DIFFG][i];
          return (
            <React.Fragment key={"st" + i}>
              <div style={{ position: "absolute", left: bx - 96, top: 120, width: 14, height: 380,
                zIndex: 14, background: "#3A2A5E" }} />
              <div style={{ position: "absolute", left: bx + 82, top: 120, width: 14, height: 380,
                zIndex: 14, background: "#3A2A5E" }} />
              <div style={{ position: "absolute", left: bx - 100, top: 120, width: 200, height: 26,
                zIndex: 15, borderRadius: 5, background: "linear-gradient(180deg, #6E52A8, #2E1E52)" }} />
              <div style={{ position: "absolute", left: bx - 34, top: 146, width: 68, height: 22,
                zIndex: 16, borderRadius: 5,
                background: lit > 0.2 ? `linear-gradient(180deg, ${mxh(c, 0.5)}, ${c})` : "#3A2A5E" }} />
              {lit > 0.2 && (
                <div style={{ position: "absolute", left: bx - 116, top: 168, width: 232, height: 400,
                  zIndex: 13, opacity: 0.30 * lit,
                  background: `linear-gradient(180deg, ${hexa(c, 0.9)}, transparent 74%)`,
                  clipPath: "polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)" }} />
              )}
            </React.Fragment>
          );
        })}
        {/* ⭐ THE BELT — a full-width travelling band, light against shadow */}
        <div style={{ position: "absolute", left: -40, top: BELT, width: W + 80, height: 16,
          zIndex: 26, background: hexa("#B9A6E0", 0.72) }} />
        <div style={{ position: "absolute", left: -40, top: BELT + 16, width: W + 80, height: 44,
          zIndex: 26, background: "#2A1C4A" }} />
        {Array.from({ length: 12 }, (_, i) => {
          const off = ((f * 4.2) % 112 + 112) % 112;
          const bx = i * 112 - off - 112;
          return <div key={"bt" + i} style={{ position: "absolute", left: bx, top: BELT + 16,
            width: 56, height: 44, zIndex: 27, background: hexa("#0E0820", 0.7) }} />;
        })}
        {/* the artifact travelling the line */}
        {/* ⭐ "a full spec, then an implementation plan, and actually build and
            test" is FOUR NAMED ARTIFACTS, so the line hands over four — each one
            finished at its own station, on its own beat. The count IS the
            information (`feedback_graphical_over_textual`). */}
        <MarkCast x={x} y={BELT - 210} s={300} z={60} f={f} spin={2.2} pulse={0.5} o={0.34} />
        {R.chain.map((nm, i) => {
          const born = 8 + i * 30;
          const k = E(f, born, born + 14, 0, 1, BACK);
          if (k <= 0.01) return null;
          return <FileSlab key={nm} x={186 + i * 236} y={BELT - 210 + (1 - k) * -70}
            w={188} h={252} z={64 + i} f={f} name={nm} pale={i > 0} o={k}
            glowK={i === 0 ? 1 : 0} />;
        })}
        {stage > 0 && f - AT[stage - 1] < 18 && (
          <Sparks f={f} at={AT[stage - 1]} x={BX[stage]} y={BELT - 236} n={46} z={92}
            floorY={BELT + 10} />
        )}
        {/* the four gantry stations become STATIONS — each finishing its own
            part, each on its own phase, so the line reads as four events */}
        {[212, 428, 644, 860].map((sx, i) => (
          <Station key={`st${i}`} x={sx} y={GY - 118} s={0.82} z={40} f={f}
            done={Math.min(1, Math.max(0, (f - 18 - i * 13) / 22))} hue="#B48CE8" seed={i * 3} />
        ))}
        {[188, 404, 620, 836].map((jx, i) => (
          <JobCan key={`jc${i}`} x={((jx + f * 3.4) % (W + 120)) - 60} y={GY - 26} s={0.7}
            z={52} hue="#9E72D8" capped={f > 30 + i * 10 ? 1 : 0} rot={i * 7 - 10}
            f={f} seed={i} />
        ))}
        <TickDisc x={W - 118} y={214} d={64} z={58} spin={0.5} hue="#C9A6F2"
          off={Math.max(0, 1 - Math.max(0, f - 44) / 16)} />
        <Spinner x={332} yTop={252} h={120} f={f} life={0.8} hue="#B48CE8" z={41} s={0.8} />
        <BigGauge x={W / 2} y={228} d={128} z={39} f={f} truth={Math.min(1, f / 70)} />
        <Lift x={W - 96} y={GY} rise={Math.min(1, Math.max(0, (f - 60) / 30))} f={f} w={150} z={44} />
        <Alcove x={140} y={190} w={240} h={190} z={16} c="#DCC4F4" on={0.7} t="AFFECTED USERS" />
        <Alcove x={W - 140} y={190} w={240} h={190} z={16} c="#DCC4F4" on={0.55} t="OPEN QUESTIONS" />
        <Drum x={112} y={GY + 12} s={0.85} z={46} c="#6E52A8" />
        <TyreStack x={W - 96} n={3} s={0.7} z={46} bottom={GY + 18} />
        <Toolbox x={220} y={GY + 8} s={0.8} z={48} c="#8C6CC8" />
        <Gallery f={f} x0={60} x1={W - 60} y={196} n={7} ranks={1} />
        {/* the floor and the crew watching the line run */}
        <div style={{ position: "absolute", left: 0, top: GY - 6, width: W, height: H - GY + 40,
          zIndex: 22, background: "linear-gradient(180deg, #4A3078, #1A1030)" }} />
        {Array.from({ length: 4 }, (_, i) => (
          <Crew key={i} f={f} x={132 + i * 258} y={GY + 40} i={i + 2} size={112} z={60} at={-14}
            flip={i > 1} tint={i === 1 ? CLAY : undefined} />
        ))}
      </Cam>
    </Scene>
  );
};
