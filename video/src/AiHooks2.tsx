import React from "react";
import { AbsoluteFill, useCurrentFrame, Img, Audio, staticFile } from "remotion";
import { inter } from "./fonts";
import { Bg, Panel, ProgressBar, HookHeader, KaraokeCaption, AssemblyCtx, Mascot, hexA } from "./SlopKit";
import WORDS from "./data/words_ai.json";
import { PAPER, PAPER2, INKD, RED, GO, GO_L, AMB, AMB_L, AMB_D, SH, SH_S, mix } from "./CancelWorld";
import { SfxTrack, LEVELS, layer, repeat, db, type Cue } from "./SoundKit";
import { E, rnd, OUT, IO, BACK } from "./MissionWorld";

/* =========================================================================
   REEL 89 "AI" · HOOK SET 2 — THE REDO.

   ⛔ THE NOTE on set 1: "wayyy too much text in these options, there shouldn't
   be much text to read or else people will scroll, these are horrible ideas,
   and I need completely different backgrounds so I can see each potential
   idea."

   Set 1 was four widgets on ONE warm stage. Counted, each frame carried SIX
   things to read — header, a Claude+NotebookLM badge, a state line, a hero
   figure, a sub-label and a chip — and the four backgrounds were the same room
   in four tints, so flipping between them showed one idea four times.

   This set inverts both:

     TEXT      the house header and the karaoke line, and NOTHING else. No
               badge, no chip, no in-scene labels. Brand MARKS stay (a mark is
               not something you read), the words go.
     WORLDS    five genuinely different places, each built as a place — an
               office, a records room, a plant room, a library, a tape studio —
               so the backgrounds are the thing being chosen between.
     ONE EVENT each hook is a single physical action everybody already
               understands: a board wiped, a page shredded, a tank drained, a
               shelf emptied, a tape erased. Nothing has to be explained.
   ========================================================================= */

export const AI2_LEN = 146;
export const AI2_CUTS = [38, 76, 112];
const HEAD = { big: "CLAUDE FORGETS", hot: "EVERY CHAT" };
const W = 1012, H = 792;
const CLAUDE = "claude_logo.png";
const NBLM = "logos/notebooklm.svg";

const Vo: React.FC = () =>
  React.useContext(AssemblyCtx) ? null : (
    <Audio src={staticFile("ai_vo_final.wav")} endAt={AI2_LEN} />
  );
const Cap: React.FC = () =>
  React.useContext(AssemblyCtx) ? null : <KaraokeCaption words={WORDS as any} />;

const Cl: React.FC<{
  f: number; x: number; y: number; size?: number; z?: number; gaze?: number; shock?: number;
  cheer?: number; stern?: number; nodAmp?: number; nodSpeed?: number; flip?: boolean;
}> = ({ f, x, y, size = 150, z = 30, gaze = 0, shock = 0, cheer = 0, stern = 0,
        nodAmp = 3, nodSpeed = 10, flip = false }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    transform: `scaleX(${flip ? -1 : 1})`, transformOrigin: "50% 90%",
    filter: `drop-shadow(0 ${Math.round(size * 0.05)}px ${Math.round(size * 0.07)}px rgba(6,9,14,0.5))` }}>
    <Mascot lf={f} size={size} gaze={gaze} shock={shock} cheer={cheer} stern={stern}
            nodAmp={nodAmp} nodSpeed={nodSpeed} />
  </div>
);

const Shot: React.FC<{ f: number; a: number; b: number; k?: number; slamAt?: number; children: React.ReactNode }> =
  ({ f, a, b, k = 0, slamAt, children }) => {
  if (f < a || f >= b) return null;
  const t = Math.min(1, (f - a) / 30), e = t * t * (3 - 2 * t);
  const z = [1.05 - e * 0.04, 1.02 + e * 0.05, 1.06 - e * 0.05, 1.02 + e * 0.04][k % 4];
  let dx = 0, dy = 0;
  if (slamAt !== undefined) {
    const k2 = f - slamAt;
    if (k2 >= 0 && k2 < 12) {
      const d = Math.pow(1 - k2 / 12, 2);
      dx = Math.sin(k2 * 2.3) * 16 * d; dy = Math.cos(k2 * 1.9) * 12 * d;
    }
  }
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden",
      transform: `scale(${z}) translate(${dx}px, ${dy}px)`, transformOrigin: "50% 54%" }}>
      {children}
      {slamAt !== undefined && f >= slamAt && f < slamAt + 3 && (
        <div style={{ position: "absolute", inset: 0, background: "#FFEBC2",
          opacity: (1 - (f - slamAt) / 3) * 0.2, zIndex: 58 }} />
      )}
    </div>
  );
};

const Flash: React.FC<{ f: number }> = ({ f }) => (<>
  {AI2_CUTS.map((cf) => {
    const k = f - cf;
    if (k < 0 || k > 2) return null;
    return <div key={cf} style={{ position: "absolute", inset: 0, background: "#FFF6E2",
      opacity: (1 - k / 2) * 0.26, zIndex: 60 }} />;
  })}
</>);

/* ====================================================================== worlds
   Each is a PLACE, not a backdrop tint: its own light, its own furniture, its
   own palette. This is the axis being chosen between, so they are built to be
   told apart at a glance with the sound off.
   ========================================================================= */

/** 1 · a meeting room, late afternoon */
const Office: React.FC = () => (
  <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} shapeRendering="crispEdges"
    style={{ position: "absolute", left: 0, top: 0, zIndex: 2 }}>
    <rect x={0} y={0} width={W} height={H} fill="#B6AE9E" />
    <rect x={0} y={0} width={W} height={92} fill="#C6BEAE" />
    {/* window with blinds, the light source */}
    <rect x={706} y={116} width={272} height={288} fill="#D8DCC8" />
    <rect x={694} y={104} width={296} height={16} fill="#8C8472" />
    {Array.from({ length: 11 }, (_, i) => (
      <rect key={i} x={706} y={124 + i * 26} width={272} height={9} fill="#AFB59F" />
    ))}
    {/* wall trim + a clock + a notice board */}
    <rect x={0} y={470} width={W} height={14} fill="#9A9280" />
    <circle cx={92} cy={168} r={44} fill="#E6E1D4" stroke="#8C8472" strokeWidth={7} />
    <rect x={90} y={136} width={6} height={34} fill="#4A4438" />
    <rect x={92} y={166} width={26} height={5} fill="#4A4438" />
    <rect x={168} y={126} width={132} height={96} fill="#8E7A5E" />
    {[0, 1, 2, 3].map((i) => (
      <rect key={`n${i}`} x={178 + (i % 2) * 62} y={136 + Math.floor(i / 2) * 44}
            width={52} height={34} fill={["#E8E2D2", "#DCCFA8", "#CFD8CB", "#E8E2D2"][i]} />
    ))}
    {/* floor + a table edge in the near foreground */}
    <rect x={0} y={484} width={W} height={H - 484} fill="#8A7F6C" />
    {Array.from({ length: 10 }, (_, i) => (
      <polygon key={`f${i}`} fill="#7E7462"
        points={`${-200 + i * 180},792 ${-182 + i * 180},792 516,484 508,484`} />
    ))}
    <rect x={0} y={686} width={W} height={106} fill="#6E5F49" />
    <rect x={0} y={686} width={W} height={12} fill="#8A7658" />
    {/* a chair back and a plant, so the room has furniture in it */}
    <rect x={94} y={508} width={120} height={122} rx={12} fill="#5E5648" />
    <rect x={136} y={624} width={16} height={70} fill="#4A4438" />
    <rect x={596} y={430} width={54} height={62} fill="#7A6A4E" />
    {[0, 1, 2, 3, 4].map((i) => (
      <ellipse key={`p${i}`} cx={623 + (i - 2) * 22} cy={404 - Math.abs(i - 2) * 12}
               rx={17} ry={34} fill="#5C7A54" />
    ))}
  </svg>
);

/** 2 · a records room, strip-lit */
const Records: React.FC = () => (
  <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} shapeRendering="crispEdges"
    style={{ position: "absolute", left: 0, top: 0, zIndex: 2 }}>
    <rect x={0} y={0} width={W} height={H} fill="#8E9AA2" />
    {/* strip lights */}
    {[0, 1, 2].map((i) => (
      <rect key={i} x={80 + i * 300} y={54} width={200} height={20} fill="#F2F5EE" />
    ))}
    <rect x={0} y={86} width={W} height={10} fill="#6E7A82" />
    {/* two rows of filing cabinets, receding */}
    {Array.from({ length: 6 }, (_, i) => (
      <React.Fragment key={`c${i}`}>
        <rect x={16 + i * 168} y={166} width={148} height={320} fill="#A2AEB6" />
        <rect x={16 + i * 168} y={166} width={148} height={12} fill="#B6C2C8" />
        {[0, 1, 2, 3].map((k) => (
          <React.Fragment key={k}>
            <rect x={26 + i * 168} y={186 + k * 76} width={128} height={64} fill="#8A96A0" />
            <rect x={70 + i * 168} y={212 + k * 76} width={40} height={9} fill="#C6D0D6" />
          </React.Fragment>
        ))}
      </React.Fragment>
    ))}
    <rect x={0} y={486} width={W} height={16} fill="#5E6A72" />
    {/* concrete floor */}
    <rect x={0} y={502} width={W} height={H - 502} fill="#79858D" />
    {Array.from({ length: 9 }, (_, i) => (
      <polygon key={`f${i}`} fill="#6E7A82"
        points={`${-220 + i * 200},792 ${-204 + i * 200},792 516,502 508,502`} />
    ))}
    <rect x={0} y={640} width={W} height={7} fill="#69757D" />
  </svg>
);

/** 3 · a plant room, one lamp */
const PlantRoom: React.FC = () => (
  <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} shapeRendering="crispEdges"
    style={{ position: "absolute", left: 0, top: 0, zIndex: 2 }}>
    <rect x={0} y={0} width={W} height={H} fill="#9AA093" />
    {/* pipe runs across the back wall */}
    {[0, 1, 2].map((i) => (
      <React.Fragment key={i}>
        <rect x={0} y={122 + i * 74} width={W} height={26} fill="#AAB0A2" />
        <rect x={0} y={122 + i * 74} width={W} height={6} fill="#A2A899" />
        {Array.from({ length: 5 }, (_, k) => (
          <rect key={k} x={64 + k * 208} y={116 + i * 74} width={26} height={38} fill="#8A9082" />
        ))}
      </React.Fragment>
    ))}
    {/* a valve wheel and a gauge on the wall */}
    <circle cx={866} cy={196} r={46} fill="none" stroke="#6E7468" strokeWidth={14} />
    {[0, 1, 2, 3].map((i) => (
      <rect key={`s${i}`} x={862} y={152} width={9} height={88} fill="#8A9082"
            transform={`rotate(${i * 45} 866 196)`} />
    ))}
    <circle cx={120} cy={202} r={38} fill="#E8E2D2" stroke="#5E6458" strokeWidth={8} />
    <rect x={118} y={176} width={5} height={28} fill="#B4402E" />
    {/* floor + a drain */}
    <rect x={0} y={452} width={W} height={16} fill="#5E6458" />
    <rect x={0} y={468} width={W} height={H - 468} fill="#8A9082" />
    {Array.from({ length: 9 }, (_, i) => (
      <polygon key={`f${i}`} fill="#7E8478"
        points={`${-220 + i * 200},792 ${-204 + i * 200},792 516,468 508,468`} />
    ))}
    <ellipse cx={506} cy={712} rx={92} ry={30} fill="#4E5448" />
    {Array.from({ length: 5 }, (_, i) => (
      <rect key={`g${i}`} x={432 + i * 30} y={694} width={14} height={36} fill="#3A4034" />
    ))}
  </svg>
);

/** 4 · a library, warm lamps */
const Library: React.FC = () => (
  <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} shapeRendering="crispEdges"
    style={{ position: "absolute", left: 0, top: 0, zIndex: 2 }}>
    <rect x={0} y={0} width={W} height={H} fill="#B89A78" />
    {/* two receding bays of shelving */}
    {[0, 1].map((row) => (
      <React.Fragment key={row}>
        <rect x={row ? -30 : 566} y={100} width={476} height={402} fill="#C6A87F" />
        {Array.from({ length: 5 }, (_, k) => (
          <rect key={k} x={row ? -30 : 566} y={112 + k * 80} width={476} height={13} fill="#A98A63" />
        ))}
      </React.Fragment>
    ))}
    {/* the books themselves, mostly missing on the near bay */}
    {Array.from({ length: 40 }, (_, i) => {
      const row = Math.floor(i / 20), k = i % 20;
      if (row === 1 && k % 3 === 0) return null;
      return <rect key={`b${i}`} x={(row ? -20 : 576) + k * 23} y={132 + (i % 4) * 80}
        width={17} height={44 + rnd(i, 3) * 18} fill={["#B4553E", "#C08A3E", "#5E7A5A", "#8A5E7A"][i % 4]} />;
    })}
    {/* a ladder against the far bay, and a lamp */}
    <rect x={498} y={128} width={13} height={378} fill="#856546" transform="rotate(6 504 300)" />
    <rect x={548} y={128} width={13} height={378} fill="#856546" transform="rotate(6 554 300)" />
    {Array.from({ length: 7 }, (_, i) => (
      <rect key={`r${i}`} x={498} y={166 + i * 50} width={64} height={9} fill="#96754F"
            transform="rotate(6 530 300)" />
    ))}
    <rect x={0} y={502} width={W} height={16} fill="#96764F" />
    <rect x={0} y={518} width={W} height={H - 518} fill="#A98A63" />
  </svg>
);

/** 5 · a tape studio, dim and acoustic */
const Studio: React.FC = () => (
  <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} shapeRendering="crispEdges"
    style={{ position: "absolute", left: 0, top: 0, zIndex: 2 }}>
    <rect x={0} y={0} width={W} height={H} fill="#A69FB4" />
    {/* acoustic foam wedges */}
    {Array.from({ length: 88 }, (_, i) => {
      const c = i % 11, r = Math.floor(i / 11);
      return <polygon key={i} fill={(c + r) % 2 ? "#5E5866" : "#766F7E"}
        points={`${c * 92},${r * 52} ${c * 92 + 92},${r * 52} ${c * 92 + 46},${r * 52 + 52}`} />;
    })}
    <rect x={0} y={430} width={W} height={18} fill="#8A8398" />
    {/* a monitor speaker on a stand, and a VU pair on the wall */}
    <rect x={44} y={222} width={124} height={168} fill="#6A6478" />
    <circle cx={106} cy={288} r={40} fill="#4E4860" />
    <circle cx={106} cy={288} r={16} fill="#8A8296" />
    <circle cx={106} cy={356} r={18} fill="#4E4860" />
    {[0, 1].map((i) => (
      <React.Fragment key={i}>
        <rect x={846} y={214 + i * 96} width={124} height={78} fill="#E4DED2" />
        <rect x={856} y={224 + i * 96} width={104} height={58} fill="#F4EFE2" />
        <rect x={906} y={244 + i * 96} width={4} height={38} fill="#B4402E"
              transform={`rotate(${-22 + i * 16} 908 282)`} />
      </React.Fragment>
    ))}
    {/* the desk edge in the near foreground */}
    <rect x={0} y={448} width={W} height={H - 448} fill="#A29CB6" />
    <rect x={0} y={618} width={W} height={174} fill="#8C86A2" />
    <rect x={0} y={618} width={W} height={12} fill="#8981A0" />
    {Array.from({ length: 16 }, (_, i) => (
      <rect key={`k${i}`} x={40 + i * 58} y={648} width={34} height={12} rx={4} fill="#9089A8" />
    ))}
    {Array.from({ length: 16 }, (_, i) => (
      <circle key={`d${i}`} cx={57 + i * 58} cy={702} r={13} fill="#8A8296" />
    ))}
  </svg>
);

/* the shared cue shape: heaviest stack on frame 0, a transient on every cut */
const A = "am/";
const sfxFor = (sig: { src: string; dur: number; rate?: number }): Cue[] => [
  { at: 0, src: A + "room-tone.wav", v: LEVELS.SFX_BED, dur: 4.95, from: 2, lead: 0 },
  { at: 0, src: A + "hit-boom.wav", v: LEVELS.SFX_HERO, dur: 1.8, lead: 0 },
  { at: 0, src: A + "lights-on.wav", v: LEVELS.SFX_MID, dur: 0.80, lead: 0 },
  { at: 0.40, src: A + sig.src, v: LEVELS.SFX_HERO, dur: sig.dur, rate: sig.rate, lead: 0 },
  ...layer(1.267, { src: A + "whoosh-swoosh.wav", v: LEVELS.SFX_MID, dur: 0.80 },
                  { src: A + "punch.wav", v: LEVELS.SFX_TEXTURE, dur: 0.20 }),
  ...layer(2.533, { src: A + "whoosh-fast.wav", v: LEVELS.SFX_MID, dur: 0.45 },
                  { src: A + "hit-up.wav", v: LEVELS.SFX_TEXTURE, dur: 1.20 }),
  ...layer(3.733, { src: A + "whoosh-choppy.wav", v: LEVELS.SFX_MID, dur: 0.80 },
                  { src: A + "positive-chime.wav", v: LEVELS.SFX_TEXTURE, dur: 1.10 }),
];

/* ⛔ the ONLY text in this set is the house header and the karaoke line. */
const wrap = (f: number, glow: string, cues: Cue[], children: React.ReactNode) => {
  const assembled = React.useContext(AssemblyCtx);
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar /><Vo />
      {!assembled && <SfxTrack cues={cues} />}
      <HookHeader f={f + 12} big={HEAD.big} hot={HEAD.hot} />
      <Panel glow={hexA(glow, 0.3)}>
        {children}
        <Flash f={f} />
      </Panel>
      <Cap />
    </AbsoluteFill>
  );
};

/** the shared beats 2-4, also wordless: it keeps happening · the wire · it keeps */
const tail = (f: number) => {
  const [C1, C2, C3] = AI2_CUTS;
  return (<>
    {/* 2 · it is not once. It is every session. Five blanked boards in a row. */}
    <Shot f={f} a={C1} b={C2} k={1}>
      <Office />
      {[0, 1, 2, 3, 4].map((i) => {
        const wiped = E(f, C1 + 2 + i * 5, C1 + 12 + i * 5, 0, 1, OUT);
        return (
          <React.Fragment key={i}>
            <div style={{ position: "absolute", left: 26 + i * 194, top: 196, width: 172,
              height: 220, background: "#EFEDE4", border: "9px solid #9A9280", zIndex: 22 }} />
            {Array.from({ length: 7 }, (_, k) => (
              <div key={k} style={{ position: "absolute", left: 44 + i * 194, top: 216 + k * 26,
                width: (60 + rnd(i * 7 + k, 3) * 92) * (1 - wiped), height: 11,
                background: ["#4A4438", "#B4553E", "#4A4438"][k % 3], zIndex: 24 }} />
            ))}
            <Img src={staticFile(CLAUDE)} style={{ position: "absolute", left: 92 + i * 194,
              top: 424, width: 40, height: 40, objectFit: "contain", zIndex: 24 }} />
          </React.Fragment>
        );
      })}
      <Cl f={f} x={430} y={556} size={134} gaze={0} stern={0.65} nodAmp={2.2} nodSpeed={13} z={30} />
    </Shot>

    {/* 3 · the wire. One cable, drawn, from the mark to the mark. */}
    <Shot f={f} a={C2} b={C3} k={2}>
      <Records />
      <div style={{ position: "absolute", left: 88, top: 236, width: 268, height: 268, zIndex: 26,
        borderRadius: 22, background: PAPER, boxShadow: SH, display: "flex", alignItems: "center",
        justifyContent: "center" }}>
        <Img src={staticFile(CLAUDE)} style={{ width: 150, height: 150, objectFit: "contain" }} />
      </div>
      <div style={{ position: "absolute", left: 356, top: 356, height: 26, zIndex: 24,
        width: 300 * E(f, C2 + 3, C2 + 20, 0, 1, OUT), background: GO, borderRadius: 6 }} />
      {[0, 1, 2, 3].map((i) => {
        const q = ((f - C2 + i * 9) % 36) / 36;
        return <div key={i} style={{ position: "absolute", left: 364 + q * 276, top: 346,
          width: 40, height: 40, borderRadius: 10, background: GO_L, zIndex: 28,
          opacity: E(f, C2 + 6, C2 + 16, 0, 1, OUT) * (1 - Math.abs(q - 0.5) * 0.6) }} />;
      })}
      <div style={{ position: "absolute", left: 656, top: 236, width: 268, height: 268, zIndex: 26,
        borderRadius: 22, background: "#2A2118", boxShadow: SH, display: "flex", alignItems: "center",
        justifyContent: "center", transform: `scale(${E(f, C2 + 1, C2 + 14, 0.6, 1, BACK)})` }}>
        <Img src={staticFile(NBLM)} style={{ width: 150, height: 150, objectFit: "contain",
          filter: "invert(1)" }} />
      </div>
      <Cl f={f} x={452} y={566} size={130} gaze={2} cheer={0.9} nodAmp={3.4} nodSpeed={9} z={30} />
    </Shot>

    {/* 4 · and now the shelf fills instead of emptying. */}
    <Shot f={f} a={C3} b={9999} k={3}>
      <Library />
      {Array.from({ length: 24 }, (_, i) => {
        const t = E(f, C3 + 2 + i * 2, C3 + 16 + i * 2, 0, 1, BACK);
        return <div key={i} style={{ position: "absolute", left: 96 + (i % 8) * 104,
          top: 236 + Math.floor(i / 8) * 108, width: 78, height: 92, borderRadius: 6,
          background: ["#E0B166", "#D9856C", "#8FB08A", "#B78FAC"][i % 4], zIndex: 24,
          boxShadow: SH_S, transform: `scale(${t})` }} />;
      })}
      <Img src={staticFile(NBLM)} style={{ position: "absolute", left: 452, top: 556, width: 108,
        height: 108, objectFit: "contain", filter: "invert(1)", zIndex: 30 }} />
      <Cl f={f} x={790} y={556} size={134} gaze={2} cheer={0.95} nodAmp={3.6} nodSpeed={8}
          flip z={30} />
    </Shot>
  </>);
};

/* ############################################################ A · THE WHITEBOARD
   A meeting room. A board covered in a session's work, and a squeegee takes it
   all off in one pass. Nothing to read; everybody has watched this happen.
   ######################################################################### */
export const AiHookA: React.FC = () => {
  const f = useCurrentFrame();
  const C1 = AI2_CUTS[0];
  const sweep = E(f, 12, 30, 0, 1, IO);
  return wrap(f, RED, sfxFor({ src: "paper-slide.wav", dur: 0.63, rate: 0.8 }), (<>
    <Shot f={f} a={0} b={C1} k={0} slamAt={12}>
      <Office />
      <div style={{ position: "absolute", left: 60, top: 150, width: 620, height: 330, zIndex: 22,
        background: "#EFEDE4", border: "14px solid #9A9280", boxShadow: SH }} />
      {Array.from({ length: 34 }, (_, i) => {
        const col = i % 3, row = Math.floor(i / 3);
        const x = 92 + col * 196, y = 178 + row * 26;
        const w = 60 + rnd(i, 3) * 118;
        return <div key={i} style={{ position: "absolute", left: x, top: y, width: w, height: 12,
          background: ["#4A4438", "#B4553E", "#3E6E8C"][i % 3], zIndex: 24,
          opacity: (x + w) / 700 > sweep ? 1 : 0 }} />;
      })}
      {/* a couple of boxes and an arrow, so it reads as WORK not lines */}
      {[[110, 300, 150, 74], [300, 300, 130, 74], [470, 300, 160, 74]].map(([x, y, w, h], i) => (
        <div key={`b${i}`} style={{ position: "absolute", left: x, top: y, width: w, height: h,
          border: `6px solid ${["#4A4438", "#B4553E", "#3E6E8C"][i]}`, zIndex: 24,
          opacity: (x + w) / 700 > sweep ? 1 : 0 }} />
      ))}
      <Img src={staticFile(CLAUDE)} style={{ position: "absolute", left: 596, top: 402, width: 56,
        height: 56, objectFit: "contain", zIndex: 25, opacity: 660 / 700 > sweep ? 1 : 0 }} />
      {/* the squeegee taking it off */}
      <div style={{ position: "absolute", left: 60 + sweep * 620, top: 150, width: 34, height: 330,
        background: "#3E4A56", zIndex: 30, boxShadow: SH }} />
      <div style={{ position: "absolute", left: 54 + sweep * 620, top: 150, width: 12, height: 330,
        background: "#8A96A0", zIndex: 31 }} />
      <Cl f={f} x={764} y={430} size={172} gaze={1} shock={0.75} nodAmp={2.2} nodSpeed={14}
          flip z={32} />
    </Shot>
    {tail(f)}
  </>));
};

/* ############################################################## B · THE SHREDDER
   A records room. The session goes in the top and comes out as confetti.
   ######################################################################### */
export const AiHookB: React.FC = () => {
  const f = useCurrentFrame();
  const C1 = AI2_CUTS[0];
  const feed = E(f, 10, 26, 0, 1, IO);
  return wrap(f, RED, sfxFor({ src: "gear-stutter.wav", dur: 1.10 }), (<>
    <Shot f={f} a={0} b={C1} k={0} slamAt={12}>
      <Records />
      {/* the page going in, with the Claude mark on it */}
      <div style={{ position: "absolute", left: 356, top: 122 + feed * 176, width: 300, height: 260,
        background: PAPER, boxShadow: SH, zIndex: 24 }}>
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} style={{ position: "absolute", left: 26, top: 84 + i * 20,
            width: 130 + rnd(i, 5) * 110, height: 9, background: "#B7B1A4" }} />
        ))}
        <Img src={staticFile(CLAUDE)} style={{ position: "absolute", left: 118, top: 20, width: 64,
          height: 64, objectFit: "contain" }} />
      </div>
      {/* the shredder */}
      <div style={{ position: "absolute", left: 296, top: 358, width: 420, height: 120, zIndex: 28,
        background: "#3E4A52", boxShadow: SH, borderRadius: 8 }} />
      <div style={{ position: "absolute", left: 326, top: 346, width: 360, height: 22, zIndex: 29,
        background: "#1E262C", borderRadius: 4 }} />
      <div style={{ position: "absolute", left: 296, top: 402, width: 420, height: 12, zIndex: 29,
        background: "#5E6A72" }} />
      {/* the bin, and the confetti in it */}
      <div style={{ position: "absolute", left: 336, top: 478, width: 340, height: 176, zIndex: 26,
        background: "#7E8A92", borderRadius: "6px 6px 20px 20px" }} />
      {Array.from({ length: 60 }, (_, i) => {
        const q = E(f, 14 + i * 0.7, 34 + i * 0.7, 0, 1, OUT);
        if (q <= 0.02) return null;
        return <div key={i} style={{ position: "absolute", left: 350 + rnd(i, 3) * 310,
          top: 470 + q * (110 + rnd(i, 7) * 60), width: 9, height: 22 + rnd(i, 11) * 16,
          background: i % 4 ? PAPER : "#DCD6C8", zIndex: 30,
          transform: `rotate(${(rnd(i, 13) - 0.5) * 80}deg)` }} />;
      })}
      <Cl f={f} x={790} y={470} size={168} gaze={1} shock={0.78} nodAmp={2.2} nodSpeed={14}
          flip z={32} />
    </Shot>
    {tail(f)}
  </>));
};

/* ############################################################### C · THE DRAIN
   A plant room. A tank full to the top, and the plug comes out.
   ######################################################################### */
export const AiHookC: React.FC = () => {
  const f = useCurrentFrame();
  const C1 = AI2_CUTS[0];
  const drain = E(f, 12, 34, 0, 1, IO);
  const top = 214 + drain * 250;
  return wrap(f, AMB, sfxFor({ src: "coin-drop.wav", dur: 0.70, rate: 0.7 }), (<>
    <Shot f={f} a={0} b={C1} k={0} slamAt={12}>
      <PlantRoom />
      {/* the tank */}
      <div style={{ position: "absolute", left: 296, top: 196, width: 420, height: 290, zIndex: 24,
        background: "#E4E8DE", borderRadius: 10 }} />
      {/* the empty part reads as empty because it is a different material */}
      <div style={{ position: "absolute", left: 308, top: 208, width: 396, height: 266, zIndex: 25,
        background: "#CFD6C9" }} />
      {[0, 1, 2, 3].map((i) => (
        <div key={`rib${i}`} style={{ position: "absolute", left: 308, top: 240 + i * 62,
          width: 396, height: 4, background: "#B8C0B2", zIndex: 26 }} />
      ))}
      <div style={{ position: "absolute", left: 308, top, width: 396, height: 474 - top, zIndex: 27,
        background: AMB }} />
      <div style={{ position: "absolute", left: 308, top: top - 6, width: 396, height: 16,
        zIndex: 28, background: AMB_L }} />
      <div style={{ position: "absolute", left: 296, top: 196, width: 420, height: 290, zIndex: 28,
        border: "12px solid #5E6458", borderRadius: 10 }} />
      <Img src={staticFile(CLAUDE)} style={{ position: "absolute", left: 460, top: 240, width: 92,
        height: 92, objectFit: "contain", zIndex: 29 }} />
      {/* the outlet under it, and what is pouring out of it */}
      <div style={{ position: "absolute", left: 470, top: 486, width: 72, height: 40, zIndex: 26,
        background: "#5E6458" }} />
      {drain > 0.05 && (
        <div style={{ position: "absolute", left: 484, top: 522, width: 44,
          height: 150 * Math.min(1, drain * 2), background: AMB, zIndex: 25 }} />
      )}
      {Array.from({ length: 22 }, (_, i) => {
        const q = ((f - 12 + i * 3) % 30) / 30;
        if (drain < 0.06) return null;
        return <div key={i} style={{ position: "absolute", left: 420 + rnd(i, 3) * 172,
          top: 660 + q * 60, width: 12, height: 12, borderRadius: 6, background: AMB_L,
          zIndex: 27, opacity: (1 - q) * 0.9 }} />;
      })}
      <Cl f={f} x={776} y={470} size={172} gaze={1} shock={0.75} nodAmp={2.2} nodSpeed={14}
          flip z={32} />
    </Shot>
    {tail(f)}
  </>));
};

/* ############################################################## D · THE SHELF
   A library. Every book on the near shelf goes, one after another, until the
   shelf is bare.
   ######################################################################### */
export const AiHookD: React.FC = () => {
  const f = useCurrentFrame();
  const C1 = AI2_CUTS[0];
  return wrap(f, RED, sfxFor({ src: "page-turn.wav", dur: 0.90 }), (<>
    <Shot f={f} a={0} b={C1} k={0} slamAt={12}>
      <Library />
      {/* one big shelf in the near foreground, emptying left to right */}
      <div style={{ position: "absolute", left: 46, top: 424, width: 920, height: 26, zIndex: 26,
        background: "#513B27", boxShadow: SH }} />
      <div style={{ position: "absolute", left: 46, top: 172, width: 920, height: 22, zIndex: 26,
        background: "#513B27" }} />
      {Array.from({ length: 22 }, (_, i) => {
        const gone = E(f, 10 + i * 2.6, 22 + i * 2.6, 0, 1, IO);
        return (
          <div key={i} style={{ position: "absolute", left: 62 + i * 40,
            top: 240 + rnd(i, 3) * 20 - gone * 190, width: 30,
            height: 180 - rnd(i, 5) * 26, zIndex: 24, opacity: 1 - gone,
            background: ["#E0B166", "#D9856C", "#8FB08A", "#B78FAC"][i % 4],
            transform: `rotate(${gone * (i % 2 ? 26 : -26)}deg)` }} />
        );
      })}
      <Img src={staticFile(CLAUDE)} style={{ position: "absolute", left: 466, top: 458, width: 76,
        height: 76, objectFit: "contain", zIndex: 28 }} />
      <Cl f={f} x={760} y={472} size={176} gaze={1} shock={0.72} nodAmp={2.2} nodSpeed={14}
          flip z={32} />
    </Shot>
    {tail(f)}
  </>));
};

/* ############################################################### E · THE ERASE
   A tape studio. The reel runs through the head and comes out blank.
   ######################################################################### */
export const AiHookE: React.FC = () => {
  const f = useCurrentFrame();
  const C1 = AI2_CUTS[0];
  const run = E(f, 10, 34, 0, 1, IO);
  const spin = f * 0.34;
  return wrap(f, AMB, sfxFor({ src: "film-roll.wav", dur: 1.20 }), (<>
    <Shot f={f} a={0} b={C1} k={0} slamAt={12}>
      <Studio />
      {/* two reels, turning */}
      {[[204, 250], [720, 250]].map(([cx, cy], i) => (
        <React.Fragment key={i}>
          <div style={{ position: "absolute", left: cx - 92, top: cy - 92, width: 184, height: 184,
            borderRadius: "50%", background: "#2A2530", zIndex: 24, boxShadow: SH }} />
          <div style={{ position: "absolute", left: cx - 74, top: cy - 74, width: 148, height: 148,
            borderRadius: "50%", background: i ? "#4E4756" : "#6E4A2E", zIndex: 25 }} />
          {[0, 1, 2].map((k) => (
            <div key={k} style={{ position: "absolute", left: cx - 6, top: cy - 74, width: 12,
              height: 148, background: "#8A8296", zIndex: 26,
              transform: `rotate(${spin * (i ? -1 : 1) * 57 + k * 60}deg)`,
              transformOrigin: "50% 50%" }} />
          ))}
          <div style={{ position: "absolute", left: cx - 18, top: cy - 18, width: 36, height: 36,
            borderRadius: "50%", background: "#B4402E", zIndex: 27 }} />
        </React.Fragment>
      ))}
      {/* the tape between them: written on the left, blank past the head */}
      <div style={{ position: "absolute", left: 204, top: 336, width: 516, height: 30, zIndex: 23,
        background: "#6E5A44" }} />
      {Array.from({ length: 30 }, (_, i) => {
        const x = 214 + i * 17;
        return <div key={i} style={{ position: "absolute", left: x, top: 342, width: 9,
          height: 6 + rnd(i, 3) * 14, background: AMB_L, zIndex: 25,
          opacity: (x - 204) / 516 > run ? 1 : 0 }} />;
      })}
      {/* the erase head */}
      <div style={{ position: "absolute", left: 190 + run * 516, top: 300, width: 46, height: 104,
        background: "#8A8296", zIndex: 28, boxShadow: SH }} />
      <div style={{ position: "absolute", left: 198 + run * 516, top: 312, width: 30, height: 40,
        background: "#B4402E", zIndex: 29 }} />
      <Img src={staticFile(CLAUDE)} style={{ position: "absolute", left: 428, top: 176, width: 72,
        height: 72, objectFit: "contain", zIndex: 27 }} />
      <Cl f={f} x={430} y={430} size={152} gaze={0} shock={0.75} nodAmp={2.2} nodSpeed={14} z={32} />
    </Shot>
    {tail(f)}
  </>));
};
