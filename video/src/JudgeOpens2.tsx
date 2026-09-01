import React from "react";
import { useCurrentFrame } from "remotion";
import {
  W, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D,
  Scene, Cam, Chip, Contact, Edge, Ring, Puff, Steam, Sweat, Fall, Motes, Pool, Beam,
  Hero, Forearm, mono,
  R, asPlace, GY, BAND_Y, SAFE3,
  CLAY, CLAYD, GOLD, GREEN, RED, PAPER, INK, MUTE, SODIUM, EMBER, OXBLOOD,
} from "./JudgeWorld";
import { BigCert, DoneBeam, Facade, Brief } from "./JudgeProps";
import { Room } from "./HwSets";

/* ===========================================================================
   REEL 132 · "JUDGE" — ROUND 4 OPENS.  BARE STAGE, ONE OBJECT EACH.

   ⛔⛔⛔ WHAT ROUND 3 GOT WRONG, AND IT IS A RULE I ALREADY HAD IN WRITING.
   `feedback_hook_simplicity` is a STANDING rule: *"concepts need to be simpler,
   not so much stuff going on, very hierarchical but still visually appealing and
   striking"* — **a hook is ONE dominant object and at most ONE supporting
   element.** Round 3 put a seven-sprite crowd band, a twenty-seven-file archive
   wall, a running overhead gantry AND hazard stripes in the hook, because I took
   the BODY density finding and applied it to the one scene where the opposite
   rule holds. That is a crowded frame with no first place.

   ⛔ AND ALL FOUR WERE THE SAME PROP RESTYLED. The same rule: *"each candidate
   is a different MECHANISM, never the same prop restyled."* A gold seal growing,
   a gold seal falling, a gold seal rising and a gold seal charging is one idea
   in four costumes.

   ⛔ BUT DO NOT STRIP THE WORLD OUT EITHER — the correction to the correction,
   same memory: *"no it cant just be this basic, i like our original backgrounds,
   just incorporate these kind of things."* **Reduce IDEAS, not LAYERS.** The
   court is still here behind every one of these: panelling, a floor line, one
   light pool, motes. It is just held DOWN so nothing competes with the idea.

   ⭐⭐ AND THE ONE-WORD TEST (reel 118): name the mechanism as a single word and
   make the candidates DIFFERENT WORDS. These are TEAR / COLLAPSE / FACADE /
   SCALE, and the object is different in every one.

   ⚠️ A bare hook MEASURES LOW — reel 90's shipped set ran 0.86-2.15 against a
   6.0 bar. That is the price of hierarchy and it is the right trade. Motion is
   bought back with the SCALE of the one object travelling far, never by putting
   the props back in.
   ========================================================================= */

type SP = { v: any; dur: number };
export type Open2Id = "tear" | "beam" | "facade" | "scale";

export const OPEN2_BANDS: Record<Open2Id, { big: string; hot: string }> = {
  tear:   { big: "CLAUDE SAYS IT'S DONE", hot: "IT ISN'T" },
  beam:   { big: "CLAUDE SAYS IT'S DONE", hot: "IT ISN'T" },
  facade: { big: "CLAUDE SAYS IT'S DONE", hot: "IT ISN'T" },
  scale:  { big: "CLAUDE SAYS IT'S DONE", hot: "IT ISN'T" },
};

/* ---- THE HELD-DOWN STAGE. The reel's own court, at about half strength: back
   panelling, a floor line, ONE pool of light and a few motes. No crowd, no
   archive, no gantry, no stripes. --------------------------------------- */
const Stage: React.FC<{ children: React.ReactNode; dur: number; f: number; poolX?: number }> =
  ({ children, dur, f, poolX = 506 }) => {
  const p = asPlace("stand");
  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.44} glow={hexa(p.key, 0.14)}>
      <Cam s={1.0} z={1}>
        <Room p={p} f={f} bands={2} kind="column" overhead="none"
          rake={0.05} rakeRate={1.7} rakeN={5} floorKind="boards" grit={0.4}
          lamp={null} window={null} />
        {/* the court behind, HELD DOWN: panelling and a dado, nothing else */}
        <div style={{ position: "absolute", left: -40, top: 300, width: 1100, height: 250,
          zIndex: 8, background: `linear-gradient(180deg, #6E4A26 0%, #3E2812 100%)`, opacity: 0.52 }} />
        {[0, 1, 2, 3, 4, 5].map(i => (
          <div key={"pn" + i} style={{ position: "absolute", left: 6 + i * 172, top: 322,
            width: 140, height: 202, zIndex: 9, opacity: 0.42,
            border: "7px solid #8A5E34", boxSizing: "border-box" }} />
        ))}
        <div style={{ position: "absolute", left: -40, top: 544, width: 1100, height: 22,
          zIndex: 10, opacity: 0.6,
          background: `linear-gradient(180deg, #A87A46 0%, #5E3C1E 100%)` }} />
        <Beam x={poolX} y={110} top={150} bot={620} len={430} c="#FFE4B0" o={0.22} z={11} f={f} />
        <Pool x={poolX} y={640} w={620} c="#FFD8A0" o={0.26} z={12} />
        <Motes x={poolX} y={260} w={520} h={420} n={13} f={f} z={13} c="#F3E6C6" />
        {children}
        <Edge side="r" c="#2E1C0C" w={76} z={90} top={190} />
      </Cam>
      <Chip t={R.lie} y={BAND_Y} x={SAFE3.cx} c={GREEN} fg="#04241C" s={0.94} z={94} />
    </Scene>
  );
};

/* =========================================================================
   A · `tear` — DESTRUCTION.  ONE object: a 620px gold-sealed DONE certificate
   filling the frame. Two small Claudes grip its edges and pull; it stretches,
   a crack opens, and it TEARS clean in half — and between the halves there is
   nothing but a few loose fixings.
   ⭐ This is reel 90's shipped THE TEAR shape with this reel's own object.
   ====================================================================== */
export const Open2Tear: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const grip = E(f, 0, 6, 0, 1, OUT);
  const pull = E(f, 6, 34, 0, 1, IO);
  const rip = E(f, 36, 52, 0, 1, OUT);
  const recoil = f > 36 ? Math.sin((f - 36) * 1.1) * Math.exp(-(f - 36) / 8) * 22 : 0;
  const CX = 506, CY = GY - 40;
  return (
    <Stage dur={dur} f={f}>
      <BigCert x={CX} y={CY} h={620} z={54} split={rip} strain={pull} f={f} />
      {/* what was between the halves: nothing, and four loose fixings */}
      {rip > 0.3 && [0, 1, 2, 3].map(i => (
        <div key={"fx" + i} style={{ position: "absolute", left: CX - 12 + (rnd(i, 3) - 0.5) * 40,
          top: CY - 500 + i * 122 + rip * (60 + i * 40), width: 22, height: 22, borderRadius: 11,
          zIndex: 56, opacity: Math.max(0, 1 - rip * 0.9), background: "#8E6218" }} />
      ))}
      {[-1, 1].map(side => (
        <React.Fragment key={side}>
          <Contact x={CX + side * 320 - 84} y={GY} w={168} z={41} o={0.34} />
          <Hero f={f} x={CX + side * (330 + rip * 120)} y={GY} size={182} z={62}
            act={1} ph={side < 0 ? 0.2 : 1.4} flip={side > 0}
            costume={side < 0 ? { suit: 1 } : { glasses: 1 }}
            strain={pull * (1 - rip * 0.7)} drive={side * (pull * 0.16 + rip * 0.22)}
            stern={pull} shock={rip} />
          <Forearm x0={CX + side * (330 + rip * 120) - side * 182 * 0.34}
            y0={GY - 182 * 0.50}
            x1={CX + side * (232 + rip * 150) + recoil * side}
            y1={CY - 300} w={22} c={CLAYD} z={63} />
        </React.Fragment>
      ))}
      <Steam x={CX - 330} y={GY - 196} f={f} at={10} n={7} z={66} s={0.95} />
      <Steam x={CX + 330} y={GY - 196} f={f} at={16} n={7} z={66} s={0.95} />
      {rip > 0.1 && <Fall x={CX} y={CY - 380} w={300} f={f} at={36} n={13} z={64} c="#C9B48C" rate={1.4} />}
    </Stage>
  );
};

/* =========================================================================
   B · `beam` — COLLAPSE UNDER LOAD.  ONE object: an 800px gleaming DONE beam
   spanning a black gap. ONE Claude walks out onto it, it BOWS further with
   every step, and it snaps under him mid-span.
   ⭐ The most literal reading of the line there is: it told you it was finished
   and it did not hold your weight.
   ====================================================================== */
export const Open2Beam: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const walk = E(f, 4, 36, 0, 1, IO);
  const snap = E(f, 40, 54, 0, 1, IN_Q);
  const bow = walk * (1 - snap * 0.4);
  const BX = 506, BY = 512;
  const HX = 176 + walk * 300;
  const HY = BY - 34 + bow * 46 + snap * 420;
  return (
    <Stage dur={dur} f={f} poolX={506}>
      {/* the gap. ⛔ It is the ONE supporting element and it is drawn as a real
          edge with a lip, not as a black rectangle. */}
      {/* ⛔ A BLACK RECTANGLE IS NOT A GAP — it is the grey-and-rectangular
          shape the house bans, in black. The drop has a far wall receding into
          it, a lit lip and courses of stone, so it reads as DEPTH. */}
      <div style={{ position: "absolute", left: 150, top: 574, width: 712, height: 240, zIndex: 20,
        overflow: "hidden", background: `linear-gradient(180deg, #2A2118 0%, #060504 100%)` }}>
        {[0, 1, 2, 3].map(i => (
          <div key={"cs" + i} style={{ position: "absolute", left: 40 + i * 12, top: i * 34,
            width: 632 - i * 24, height: 22, background: hexa("#4A3A26", 0.5 - i * 0.11) }} />
        ))}
        <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 30,
          background: `linear-gradient(180deg, ${hexa("#000", 0.72)} 0%, ${hexa("#000", 0)} 100%)` }} />
      </div>
      {[138, 850].map((lx, i) => (
        <div key={i} style={{ position: "absolute", left: lx - (i ? 0 : 12), top: 560, width: 24,
          height: 26, zIndex: 21, background: "#8A6A3E" }} />
      ))}
      <div style={{ position: "absolute", left: -40, top: 556, width: 200, height: 28, zIndex: 22,
        background: `linear-gradient(180deg, #A87A46 0%, #5E3C1E 100%)` }} />
      <div style={{ position: "absolute", left: 852, top: 556, width: 200, height: 28, zIndex: 22,
        background: `linear-gradient(180deg, #A87A46 0%, #5E3C1E 100%)` }} />

      <DoneBeam x={BX} y={BY} w={800} z={50} bow={bow} snap={snap} />
      <Contact x={HX - 74} y={HY + 26} w={148} z={49} o={0.30 * (1 - snap)} />
      <Hero f={f} x={HX} y={HY} size={196} z={60} act={0} ph={0.3}
        costume={{ constr: 1 }} drive={walk * 0.12}
        shock={E(f, 38, 44, 0, 1, OUT)} cheer={walk > 0.2 && snap < 0.05 ? 0.4 : 0}
        stern={0} />
      {snap > 0.05 && <Fall x={BX} y={BY + 40} w={420} f={f} at={40} n={16} z={58} c="#E7B24C" rate={1.7} />}
      {snap > 0.05 && <Puff x={BX} y={BY + 30} f={f} at={41} c="#C8B896" z={57} n={13} />}
    </Stage>
  );
};

/* =========================================================================
   C · `facade` — THE FRONT.  ONE object: a handsome finished product front,
   propped by ONE stick. He polishes it, oblivious; the prop bends, snaps, and
   the whole 760px front goes over flat — and behind it are two scaffold poles
   and air.
   ⛔ IT IS THE BEST-LOOKING OBJECT IN THE REEL until it goes over. The claim is
   that it is a FRONT, not that the work is shabby.
   ====================================================================== */
export const Open2Facade: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const bend = E(f, 2, 30, 0, 1, IO);
  const fall = E(f, 32, 46, 0, 1, IN_Q);
  const dust = f >= 44;
  const FX = 466, FY = 612;
  return (
    <Stage dur={dur} f={f} poolX={466}>
      <Facade x={FX} y={FY} w={760} z={50} fall={fall} propBend={bend} f={f} />
      <Contact x={846} y={GY} w={190} z={41} o={0.32} />
      {/* he polishes it, and keeps polishing right up to the moment it goes */}
      <Hero f={f} x={892} y={GY} size={206} z={62} act={1} ph={0.4} flip
        costume={{ constr: 1 }} drive={-0.08}
        cheer={fall < 0.1 ? 0.45 : 0} shock={E(f, 34, 40, 0, 1, OUT)}
        stern={E(f, 56, 68, 0, 1, OUT)} />
      <Forearm x0={892 - 206 * 0.34} y0={GY - 206 * 0.50} x1={806}
        y1={GY - 236 + Math.sin(f / 4) * 16} w={23} c={CLAYD} z={63} />
      {dust && <Puff x={FX} y={FY} f={f} at={44} c="#CFC0A0" z={70} n={23} s={1.3} />}
      {dust && <Ring x={FX} y={FY - 10} f={f} at={44} c="#FFE8B0" z={71} s={2.6} dur={24} />}
      {dust && <Fall x={FX} y={FY - 120} w={620} f={f} at={44} n={14} z={69} c="#C8B896" rate={1.2} />}
    </Stage>
  );
};

/* =========================================================================
   D · `scale` — THE SCALE GAP.  TWO objects and nothing else: one colossal
   stern Claude leaning over one small Claude who is holding his gold DONE
   brief up at him. The big one jabs a finger at it and the brief punches full
   of holes.
   ⭐ Reel 90's shipped GOLIATH shape, and it is deliberately the same silhouette
   family as reel 128 BOSS — this reel is its sequel and the big one has swapped
   sides: there it was the boss you add, here it is the prosecutor.
   ====================================================================== */
export const Open2Scale: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  /* ⭐⭐ MOTION WITHOUT PUTTING THE PROPS BACK IN. `feedback_hook_simplicity` is
     explicit that a bare hook measures low and that the answer is *the SCALE of
     the one object travelling far*, never more objects. So everything that moves
     here is one of the three things already in frame:
       the GIANT   strides 168px toward camera and grows 404 -> 548 (a 548px mass
                   crossing a sixth of the panel is the biggest swept area
                   available in a two-figure frame)
       the BRIEF   is knocked clean out of the small one's hands and crosses
                   520px up and out of frame, shedding fourteen pages
       the SMALL   is driven 190px backwards with his heels dug in
     Three travels, no new props, and the frame still holds exactly two figures
     and one object. */
  /* ⛔ AND THE TIMING WAS THE OTHER HALF OF "NEEDS MORE MOTION". v1 spent its
     first 34 frames — 1.1s of an 80-frame open — on a man walking slowly, and
     put its ONE event at the end. The stride now finishes at f14 and there are
     TWO strikes, at f16 and f46, so something lands inside the first half second
     and again before the tail. Front-load the events; do not add objects. */
  const stride = E(f, 0, 14, 0, 1, OUT);
  const lean = E(f, 8, 18, 0, 1, IO);
  const jab = E(f, 12, 16, 0, 1, IN_Q) - E(f, 24, 34, 0, 0.9, IO)
            + E(f, 42, 46, 0, 0.9, IN_Q) - E(f, 56, 68, 0, 0.8, IO);
  const strike = f >= 16;
  const strike2 = f >= 46;
  const fly = E(f, 16, 62, 0, 1, OUT);
  const drivenBack = E(f, 16, 34, 0, 1, OUT) + E(f, 46, 62, 0, 0.42, OUT);
  const holes = strike ? (strike2 ? 11 : 6) : 0;
  const jolt = (strike && f < 26 ? Math.sin((f - 16) * 1.5) * Math.exp(-(f - 16) / 5) * 15 : 0)
             + (strike2 && f < 56 ? Math.sin((f - 46) * 1.5) * Math.exp(-(f - 46) / 5) * 12 : 0);
  /* the giant's footfalls, so 168px of travel reads as WEIGHT and not a slide */
  const step = Math.abs(Math.sin(stride * Math.PI * 2.5));
  /* ⛔ THE GIANT HAD NO CEILING AND ATE THE FRAME. At 548 his head sat under
     the header and the small one became a corner detail — hierarchy so extreme
     there was nothing left to look at but a torso. 470 keeps his crown 126px
     clear and keeps the scale gap at 2.1x, which is what BOSS actually runs. */
  /* ⭐ THE GAP IS THE MECHANISM, so it is the thing that grows: 2.0x at frame 0
     and 2.9x by the jab. And the travel is the only place motion can come from
     in a two-figure frame, so all three of them are pushed as far as the panel
     allows — 240px of stride, 250px of driven-back, 520px of brief. */
  /* ⛔ AND THEN THE TRAVELS RAN OFF THE PANEL. Pushed to 250px of driven-back
     and 520px of brief, BOTH the small Claude and the object left the frame by
     f50 and the tail was a big empty suit. Swept area only counts while it is
     ON SCREEN: the travels are now sized to the panel, not to the metric. */
  const BIGX = 148 + stride * 196;
  const BIGS = 380 + stride * 120;
  const SMX = 700 + Math.min(1, drivenBack) * 138;
  const BX0 = 530, BY0 = GY - 200;
  return (
    <Stage dur={dur} f={f} poolX={620}>
      {/* his shadow arrives before he does */}
      {/* ⭐⭐ THE CAST SHADOW IS THE MOTION. `motion ~= (fraction of the panel
          repainted per 0.1s) x (luma DELTA)`, and a mid-brown suit crossing
          mid-brown boards has almost no delta however far it travels. A hard
          near-black shadow sweeping the lit floor with him does: it is 300px
          wide, it reaches 640px across as he closes, and it is the darkest thing
          in a bright frame. No new object — it is his own shadow. */}
      <div style={{ position: "absolute", left: BIGX - 120, top: 596,
        width: 300 + lean * 380 + jab * 90, height: 116, zIndex: 39,
        transform: "skewX(-34deg)",
        background: `linear-gradient(90deg, rgba(16,11,6,${0.52 + lean * 0.20}) 0%, rgba(16,11,6,${0.34 + lean * 0.18}) 62%, rgba(16,11,6,0) 100%)` }} />
      <div style={{ position: "absolute", left: BIGX - 190, top: 688,
        width: 380 + lean * 220, height: 58, borderRadius: "50%", zIndex: 40, filter: "blur(11px)",
        background: `radial-gradient(ellipse, rgba(20,14,8,${0.44 + lean * 0.20}) 0%, rgba(20,14,8,0) 74%)` }} />
      <Contact x={BIGX - BIGS * 0.36} y={GY} w={BIGS * 0.72} z={41} o={0.42} />
      <Hero f={f} x={BIGX} y={GY - step * 9} size={BIGS} z={54} act={0} ph={0.9}
        costume={{ suit: 1 }} stern={1} drive={lean * 0.14 + Math.max(0, jab) * 0.12}
        gaze={0.55} tint="#8E4A2E" />
      {/* ⛔ THE JAB LANDS ON THE THING. A forearm that starts on his own arm rect
          and ends on the brief is the only limb geometry that cannot be misread. */}
      {/* ⛔ AND IT RETRACTS. A forearm parked at full extension for forty frames
          reads as a bar bolted to his side. */}
      {jab > 0.04 && (
        <Forearm x0={BIGX + BIGS * 0.30} y0={GY - BIGS * 0.44}
          x1={BX0 + 60 - (1 - jab) * 170} y1={BY0 - 46} w={26 + BIGS * 0.022}
          c="#7A3A22" z={56} />
      )}
      {stride < 1 && step > 0.8 && (
        <Puff x={BIGX - 40} y={GY} f={f} at={f} c="#CFC0A0" z={44} n={7} s={0.8} />
      )}

      {/* the small one, driven back, heels dug in */}
      {drivenBack > 0.04 && (
        <div style={{ position: "absolute", left: 700, top: GY - 12, width: Math.min(1, drivenBack) * 150,
          height: 15, zIndex: 43, background: hexa("#2A2016", 0.38) }} />
      )}
      <Contact x={SMX - 90} y={GY} w={180} z={41} o={0.30} />
      <Hero f={f} x={SMX} y={GY} size={200} z={60} act={1} ph={0.2} flip
        costume={{ constr: 1 }} strain={Math.min(1, drivenBack * 0.85)}
        shock={E(f, 14, 20, 0, 1, OUT) - E(f, 34, 42, 0, 0.7, IO) + E(f, 44, 50, 0, 0.7, OUT) - E(f, 68, 80, 0, 1, IO)}
        drive={Math.min(1, drivenBack) * 0.26} stern={E(f, 68, 80, 0, 1, OUT)}
        lift={-E(f, 46, 54, 0, 22, OUT)} />
      {!strike && (
        <Forearm x0={SMX - 200 * 0.34} y0={GY - 200 * 0.50} x1={BX0 + 74} y1={BY0 - 40}
          w={24} c={CLAYD} z={61} />
      )}

      {/* ⭐ THE OBJECT TRAVELS **ACROSS** THE FRAME, NOT OUT OF IT. v1 knocked it
          up and out of the top in ten frames, which spends the travel where the
          panel cannot see it. It now goes the other way — 450px LEFT past the
          giant's legs, tumbling, then hits the boards and skids to a stop at his
          feet, which also says who took it. The three travels now oppose each
          other: brief left, small one right, giant forward. */}
      <Brief x={BX0 - fly * 400} y={BY0 - Math.sin(fly * Math.PI) * 168 + fly * 206 + jolt * 0.4}
        w={182} z={62} f={f} s={0} rot={-9 - fly * 380} holes={holes}
        lit={strike ? E(f, 34, 60, 0, 0.55, OUT) : 0} />
      {fly > 0.72 && (
        <div style={{ position: "absolute", left: BX0 - fly * 400 - 110, top: GY - 14,
          width: 220, height: 14, zIndex: 43, background: hexa("#2A2016", 0.30) }} />
      )}
      {/* the pages it sheds, fourteen of them, across the whole width */}
      {strike && Array.from({ length: 20 }, (_, i) => {
        const k = E(f, 16 + i * 0.8, 16 + i * 0.8 + 42, 0, 1, OUT);
        /* ⛔ AND THEY WENT ACROSS HIS FACE. Sent low and wide instead, so the
           twenty of them sweep the FLOOR — which is the lit half of the frame
           and therefore where a cream page has any luma delta at all. */
        const dx = -60 - rnd(i, 3) * 620 + (i % 3) * 90;
        const dy = -60 - rnd(i, 7) * 130 + k * k * 620;
        return (
          <div key={"pg" + i} style={{ position: "absolute", left: BX0 + dx * k - 50,
            top: BY0 - 110 + dy * k, width: 132, height: 168, zIndex: 63,
            opacity: Math.max(0, 1 - k * 0.5),
            transform: `rotate(${i * 37 + k * 420}deg)`, background: "#EFE7D6",
            boxShadow: SH }}>
            {[0, 1, 2, 3].map(j => (
              <div key={j} style={{ position: "absolute", left: 16, top: 24 + j * 26, width: 94 - j * 20,
                height: 8, background: hexa("#8C8578", 0.42) }} />
            ))}
          </div>
        );
      })}
      {strike && <Ring x={BX0} y={BY0 - 90} f={f} at={16} c="#FFE8B0" z={70} s={2.1} dur={22} />}
      {strike && <Puff x={BX0} y={BY0 - 60} f={f} at={16} c="#D8C8A4" z={69} n={17} />}
      {strike2 && <Ring x={SMX - 60} y={GY - 190} f={f} at={46} c="#FFE8B0" z={70} s={1.7} dur={20} />}
      {strike2 && <Puff x={SMX - 40} y={GY - 20} f={f} at={46} c="#D8C8A4" z={69} n={13} />}
      {/* ⭐ A SECOND BEAT, because one jab in eighty frames leaves a long tail.
          He presses in again at f56 and the small one drops to one knee — more
          body travel from the two figures already in frame. */}
      <Steam x={SMX} y={GY - 210} f={f} at={18} n={9} z={66} s={1.0} />
    </Stage>
  );
};

export const OPENS2: Record<Open2Id, React.FC<SP>> = {
  tear: Open2Tear, beam: Open2Beam, facade: Open2Facade, scale: Open2Scale,
};
