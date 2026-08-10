import React from "react";
import { AbsoluteFill, useCurrentFrame, Img, Audio, staticFile } from "remotion";
import { inter } from "./fonts";
import { Bg, Panel, ProgressBar, HookHeader, KaraokeCaption, AssemblyCtx, Mascot, hexA } from "./SlopKit";
import WORDS from "./data/words_ai.json";
import { PAPER, PAPER2, INKD, RED, GO, GO_L, AMB, AMB_L, AMB_D, STEEL_D, SH, SH_S, mix } from "./CancelWorld";
import { SfxTrack, LEVELS, layer, repeat, db, type Cue } from "./SoundKit";
import { E, rnd, OUT, IO, BACK } from "./MissionWorld";

/* =========================================================================
   REEL 89 "AI" · FOUR CANDIDATE HOOKS.

   Hook VO 0.00-4.86s: "99% of Claude users don't know this exists. I just gave
   Claude infinite memory for basically zero tokens."

   Built on everything reel 86 cost to learn, applied up front instead of over
   six rounds:

     · ONE nameable object per hook, and the object IS the claim
     · the LITERAL layer carries the information — the real Claude and
       NotebookLM marks, on screen at frame 0, unfiltered
     · a rank you can see: one number, one bar, one stack
     · ⛔ TYPE SIZED FOR THE FEED. A reel plays at ~250px wide, so the one
       string a scene exists to deliver is ≥90px in the panel (~22px on a
       phone). Verified by downscaling the still, not by eye at 1080.
     · frame 0 is the SETTLED state; the break lands at f12 with a shake
     · four shots, cuts at 38 / 76 / 112, none under 1.13s
     · a warm lit stage, luma ≥140 — dark is for a ranking world, not frame 0

   ⛔ NO INVENTED FACTS. The VO's "99%" is Alex's rhetorical claim and is only
   ever spoken or set as the header, never dressed as a measured statistic. The
   token numbers on screen are illustrative of the MECHANIC (a context window
   refilling each session) and are labelled as a context bar, not as a bill.
   ========================================================================= */

export const AI_HOOK_LEN = 146;
export const AI_CUTS = [38, 76, 112];
const HEAD = { big: "GIVE CLAUDE", hot: "INFINITE MEMORY" };
const CHIP_Y = 690;
const W = 1012;

const CLAUDE = "claude_logo.png";
const NBLM = "logos/notebooklm.svg";

const Vo: React.FC = () =>
  React.useContext(AssemblyCtx) ? null : (
    <Audio src={staticFile("ai_vo_final.wav")} endAt={AI_HOOK_LEN} />
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
          opacity: (1 - (f - slamAt) / 3) * 0.22, zIndex: 58 }} />
      )}
    </div>
  );
};

const Flash: React.FC<{ f: number }> = ({ f }) => (<>
  {AI_CUTS.map((cf) => {
    const k = f - cf;
    if (k < 0 || k > 2) return null;
    return <div key={cf} style={{ position: "absolute", inset: 0, background: "#FFF6E2",
      opacity: (1 - k / 2) * 0.26, zIndex: 60 }} />;
  })}
</>);

const Chip: React.FC<{ y?: number; text: string; c?: string; size?: number }> =
  ({ y = CHIP_Y, text, c = AMB, size = 32 }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top: y, display: "flex",
    justifyContent: "center", zIndex: 48 }}>
    <div style={{ padding: "9px 26px", borderRadius: 9, background: c, boxShadow: SH_S,
      fontFamily: inter.fontFamily, fontWeight: 900, fontSize: size, letterSpacing: "-0.01em",
      color: c === AMB || c === AMB_L ? "#241A08" : "#FFF8ED", whiteSpace: "nowrap" }}>{text}</div>
  </div>
);

/** the warm lit stage the house approved on reel 86 */
const Studio: React.FC<{ tint?: string }> = ({ tint = "#8E897E" }) => (
  <svg viewBox={`0 0 ${W} 792`} width={W} height={792} shapeRendering="crispEdges"
    style={{ position: "absolute", left: 0, top: 0, zIndex: 2 }}>
    <rect x={0} y={0} width={W} height={792} fill={tint} />
    {Array.from({ length: 9 }, (_, i) => (
      <rect key={i} x={12 + i * 112} y={104} width={72} height={468} fill={mix(tint, "#FFFFFF", 0.1)} />
    ))}
    <rect x={0} y={104} width={W} height={14} fill={mix(tint, "#FFFFFF", 0.2)} />
    <polygon points="96,572 916,572 1012,792 0,792" fill={mix(tint, "#000000", 0.1)} />
    <polygon points="176,572 836,572 946,792 66,792" fill={mix(tint, "#FFFFFF", 0.05)} />
    <rect x={0} y={560} width={W} height={16} fill={mix(tint, "#000000", 0.34)} />
    <rect x={0} y={572} width={W} height={8} fill={mix(tint, "#000000", 0.5)} />
    {Array.from({ length: 9 }, (_, i) => {
      const x0 = -260 + i * 190;
      return <polygon key={`b${i}`} fill={mix(tint, "#000000", 0.16)}
        points={`${x0},792 ${x0 + 16},792 516,572 508,572`} />;
    })}
  </svg>
);

/** THE SUBJECT BADGE — both real marks and the claim, present on frame 0 so
    the topic never has to be inferred from the world. */
const Subject: React.FC<{ x: number; y: number; s?: number; z?: number }> =
  ({ x, y, s = 1, z = 46 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z, display: "flex",
    alignItems: "center", gap: 13 * s, padding: `${10 * s}px ${18 * s}px`,
    background: "#2A2118", border: `${3 * s}px solid ${AMB_D}`, borderRadius: 12 * s,
    boxShadow: SH, fontFamily: inter.fontFamily, whiteSpace: "nowrap" }}>
    <Img src={staticFile(CLAUDE)} style={{ width: 40 * s, height: 40 * s, objectFit: "contain" }} />
    <span style={{ fontWeight: 900, fontSize: 30 * s, color: PAPER2 }}>+</span>
    <Img src={staticFile(NBLM)} style={{ width: 40 * s, height: 40 * s, objectFit: "contain",
      filter: "invert(1)" }} />
    <span style={{ fontWeight: 900, fontSize: 26 * s, color: AMB_L, letterSpacing: "0.08em" }}>
      NOTEBOOKLM
    </span>
  </div>
);

/* the shared SFX shape from reel 86: heaviest stack on frame 0, a transient on
   every cut, only the primary action sounded */
const A = "am/";
const sfxFor = (sig: { src: string; dur: number; rate?: number }): Cue[] => [
  { at: 0, src: A + "room-tone.wav", v: LEVELS.SFX_BED, dur: 4.95, from: 2, lead: 0 },
  { at: 0, src: A + "hit-boom.wav", v: LEVELS.SFX_HERO, dur: 1.8, lead: 0 },
  { at: 0, src: A + "lights-on.wav", v: LEVELS.SFX_MID, dur: 0.80, lead: 0 },
  { at: 0, src: A + sig.src, v: LEVELS.SFX_TEXTURE, dur: sig.dur, rate: sig.rate, lead: 0 },
  ...layer(0.40, { src: A + "punch.wav", v: LEVELS.SFX_HERO, dur: 0.20 },
                 { src: A + "error-take.wav", v: LEVELS.SFX_TEXTURE, dur: 0.25 }),
  ...layer(1.267, { src: A + "whoosh-swoosh.wav", v: LEVELS.SFX_MID, dur: 0.80 },
                  { src: A + "punch.wav", v: LEVELS.SFX_TEXTURE, dur: 0.20 }),
  ...layer(2.533, { src: A + "whoosh-fast.wav", v: LEVELS.SFX_MID, dur: 0.45 },
                  { src: A + "hit-up.wav", v: LEVELS.SFX_TEXTURE, dur: 1.20 }),
  { at: 2.63, src: A + "counter-tick.wav", v: LEVELS.SFX_MID * db(-3), dur: 1.05 },
  ...layer(3.733, { src: A + "whoosh-choppy.wav", v: LEVELS.SFX_MID, dur: 0.80 },
                  { src: A + "positive-chime.wav", v: LEVELS.SFX_TEXTURE, dur: 1.10 }),
  ...repeat(4, 3.86, 0.14, { src: A + "check-pop.wav", v: LEVELS.SFX_TEXTURE, dur: 0.55 }, 0.06),
];

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

/* ============================================================ shared beats ==
   Beats 2-4 are identical in all four, so the pick is purely the OPENING
   OBJECT — the same discipline reel 86 landed on.
   ========================================================================= */
const SESSIONS = ["CHAT 1", "CHAT 2", "CHAT 3", "CHAT 4", "TODAY"];

const tail = (f: number) => {
  const [C1, C2, C3] = AI_CUTS;
  return (<>
    {/* 2 · WHAT IT COSTS — the same context re-sent every single session */}
    <Shot f={f} a={C1} b={C2} k={1}>
      <Studio tint="#8E8078" />
      <div style={{ position: "absolute", left: 0, right: 0, top: 150, textAlign: "center",
        zIndex: 40, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 46, color: RED }}>
        YOU RE-SEND IT EVERY TIME
      </div>
      {SESSIONS.map((s, i) => (
        <React.Fragment key={s}>
          <div style={{ position: "absolute", left: 52 + i * 186, top: 236, width: 160, height: 220,
            borderRadius: 12, background: PAPER, boxShadow: SH, zIndex: 24,
            transform: `scale(${E(f, C1 + 2 + i * 3, C1 + 14 + i * 3, 0, 1, BACK)})` }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: 160, height: 34,
              borderRadius: "12px 12px 0 0", background: "#2A2118", display: "flex",
              alignItems: "center", justifyContent: "center", fontFamily: inter.fontFamily,
              fontWeight: 900, fontSize: 15, color: PAPER2, letterSpacing: "0.1em" }}>{s}</div>
            <Img src={staticFile(CLAUDE)} style={{ position: "absolute", left: 54, top: 52,
              width: 52, height: 52, objectFit: "contain" }} />
            <div style={{ position: "absolute", left: 0, right: 0, top: 118, textAlign: "center",
              fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 34, color: RED }}>0</div>
            <div style={{ position: "absolute", left: 0, right: 0, top: 158, textAlign: "center",
              fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 14, color: "#8C877D",
              letterSpacing: "0.1em" }}>MEMORY</div>
          </div>
          <div style={{ position: "absolute", left: 72 + i * 186, top: 470, width: 120, height: 38,
            borderRadius: 8, background: RED, zIndex: 26, display: "flex", alignItems: "center",
            justifyContent: "center", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 19,
            color: "#FFF8ED", opacity: E(f, C1 + 12 + i * 3, C1 + 20 + i * 3, 0, 1, OUT) }}>
            RELOAD
          </div>
        </React.Fragment>
      ))}
      <Cl f={f} x={78} y={556} size={112} gaze={0} stern={0.6} nodAmp={2.2} nodSpeed={13} z={36} />
      <Chip text="SAME CONTEXT. EVERY SESSION." c={RED} size={31} />
    </Shot>

    {/* 3 · THE WIRE — Claude connected to one notebook that keeps all of it */}
    <Shot f={f} a={C2} b={C3} k={2}>
      <Studio tint="#7E8A86" />
      <div style={{ position: "absolute", left: 96, top: 214, width: 268, height: 268, zIndex: 26,
        borderRadius: 20, background: PAPER, boxShadow: SH, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 10 }}>
        <Img src={staticFile(CLAUDE)} style={{ width: 128, height: 128, objectFit: "contain" }} />
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 26, color: INKD,
          letterSpacing: "0.08em" }}>CLAUDE</span>
      </div>
      {/* the connection, drawn — proximity is not connection */}
      <div style={{ position: "absolute", left: 364, top: 336, width: 284 * E(f, C2 + 3, C2 + 20, 0, 1, OUT),
        height: 20, background: GO, zIndex: 24, borderRadius: 4 }} />
      {[0, 1, 2, 3].map((i) => {
        const q = ((f - C2 + i * 9) % 36) / 36;
        return <div key={i} style={{ position: "absolute", left: 372 + q * 260, top: 328,
          width: 34, height: 34, borderRadius: 8, background: GO_L, zIndex: 28,
          opacity: E(f, C2 + 6, C2 + 16, 0, 1, OUT) * (1 - Math.abs(q - 0.5) * 0.6) }} />;
      })}
      <div style={{ position: "absolute", left: 648, top: 214, width: 268, height: 268, zIndex: 26,
        borderRadius: 20, background: "#2A2118", boxShadow: SH, display: "flex",
        flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10,
        transform: `scale(${E(f, C2 + 1, C2 + 14, 0.6, 1, BACK)})` }}>
        <Img src={staticFile(NBLM)} style={{ width: 118, height: 118, objectFit: "contain",
          filter: "invert(1)" }} />
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 23, color: AMB_L,
          letterSpacing: "0.06em" }}>NOTEBOOKLM</span>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 520, textAlign: "center",
        zIndex: 40, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 52, color: "#2A2118" }}>
        A SECOND BRAIN
      </div>
      <Cl f={f} x={452} y={566} size={112} gaze={2} cheer={0.9} nodAmp={3.4} nodSpeed={9} z={36} />
      <Chip text="THAT NEVER FORGETS" c={GO} size={32} />
    </Shot>

    {/* 4 · THE RESULT — memory that carries, at a token cost of about nothing */}
    <Shot f={f} a={C3} b={9999} k={3}>
      <Studio tint="#7F8A82" />
      {[["MEMORY", "PERSISTENT", GO], ["TOKENS", "~ZERO", AMB], ["SETUP", "ONE SKILL", GO]].map(
        ([k, v, c], i) => (
        <div key={k as string} style={{ position: "absolute", left: 66, top: 190 + i * 132,
          width: 880, height: 116, borderRadius: 14, background: PAPER, boxShadow: SH, zIndex: 26,
          display: "flex", alignItems: "center", padding: "0 28px", fontFamily: inter.fontFamily,
          transform: `translateX(${(1 - E(f, C3 + 2 + i * 6, C3 + 18 + i * 6, 0, 1, OUT)) * -960}px)` }}>
          <span style={{ fontWeight: 900, fontSize: 30, color: "#8C877D", letterSpacing: "0.12em",
            width: 250 }}>{k as string}</span>
          <span style={{ flex: 1, fontWeight: 900, fontSize: 62, color: c as string,
            letterSpacing: "-0.02em" }}>{v as string}</span>
        </div>
      ))}
      <Cl f={f} x={806} y={556} size={126} gaze={2} cheer={0.95} nodAmp={3.6} nodSpeed={8}
          flip z={36} />
      <Chip text="ACROSS EVERY SESSION" c={GO} size={32} />
    </Shot>
  </>);
};

/* ################################################################ A · THE RESET
   THE OBJECT: the context bar. Every session it fills, and every session it is
   wiped back to empty. Rank by a bar you watch go to zero.
   ######################################################################### */
export const AiHookA: React.FC = () => {
  const f = useCurrentFrame();
  const C1 = AI_CUTS[0];
  const wipe = E(f, 12, 22, 0, 1, IO);
  return wrap(f, RED, sfxFor({ src: "gear-stutter.wav", dur: 1.10 }), (<>
    <Shot f={f} a={0} b={C1} k={0} slamAt={12}>
      <Studio tint="#8E897E" />
      <Subject x={286} y={132} s={0.92} />
      <div style={{ position: "absolute", left: 66, top: 232, width: 880, height: 124,
        borderRadius: 14, background: PAPER, boxShadow: SH, zIndex: 24 }} />
      <div style={{ position: "absolute", left: 82, top: 248, width: 848 * (1 - wipe), height: 92,
        borderRadius: 10, background: AMB, zIndex: 26 }} />
      <div style={{ position: "absolute", left: 82, top: 248, width: 848, height: 92,
        borderRadius: 10, border: `4px dashed ${wipe > 0.5 ? RED : "transparent"}`, zIndex: 27 }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 268, textAlign: "center",
        zIndex: 30, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 52,
        color: wipe > 0.5 ? RED : "#241A08", letterSpacing: "0.04em" }}>
        {wipe > 0.5 ? "CONTEXT WIPED" : "CONTEXT FULL"}
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 390, textAlign: "center",
        zIndex: 30, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 132, lineHeight: 1,
        color: RED, letterSpacing: "-0.04em" }}>0%</div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 534, textAlign: "center",
        zIndex: 30, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 34, color: "#3A342C",
        letterSpacing: "0.14em" }}>CARRIED INTO THE NEXT CHAT</div>
      <Cl f={f} x={800} y={560} size={118} gaze={1} shock={0.7} nodAmp={2.2} nodSpeed={14}
          flip z={36} />
      <Chip text="EVERY NEW CHAT STARTS EMPTY" c={RED} size={30} />
    </Shot>
    {tail(f)}
  </>));
};

/* ############################################################## B · THE LEDGER
   THE OBJECT: a row of past chats, each holding zero. The rank is the row —
   four sessions of nothing, and the one you are in is about to join them.
   ######################################################################### */
export const AiHookB: React.FC = () => {
  const f = useCurrentFrame();
  const C1 = AI_CUTS[0];
  return wrap(f, RED, sfxFor({ src: "page-turn.wav", dur: 0.90 }), (<>
    <Shot f={f} a={0} b={C1} k={0} slamAt={12}>
      <Studio tint="#8E8078" />
      <Subject x={286} y={132} s={0.92} />
      {SESSIONS.slice(0, 4).map((s, i) => (
        <React.Fragment key={s}>
          <div style={{ position: "absolute", left: 56 + i * 228, top: 224, width: 200, height: 268,
            borderRadius: 12, background: i === 3 ? "#2A2118" : PAPER, boxShadow: SH, zIndex: 24 }} />
          <div style={{ position: "absolute", left: 56 + i * 228, top: 224, width: 200, height: 40,
            borderRadius: "12px 12px 0 0", background: i === 3 ? AMB_D : "#2A2118", zIndex: 26,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 16,
            color: i === 3 ? "#241A08" : PAPER2, letterSpacing: "0.1em" }}>{s}</div>
          <Img src={staticFile(CLAUDE)} style={{ position: "absolute", left: 122 + i * 228, top: 282,
            width: 68, height: 68, objectFit: "contain", zIndex: 26 }} />
          <div style={{ position: "absolute", left: 56 + i * 228, top: 358, width: 200,
            textAlign: "center", zIndex: 26, fontFamily: inter.fontFamily, fontWeight: 900,
            fontSize: 96, lineHeight: 1, color: RED,
            transform: `scale(${E(f, 10 + i * 4, 22 + i * 4, 0.4, 1, BACK)})` }}>0</div>
          <div style={{ position: "absolute", left: 56 + i * 228, top: 456, width: 200,
            textAlign: "center", zIndex: 26, fontFamily: inter.fontFamily, fontWeight: 900,
            fontSize: 17, color: "#8C877D", letterSpacing: "0.1em" }}>
            REMEMBERED
          </div>
        </React.Fragment>
      ))}
      <div style={{ position: "absolute", left: 0, right: 0, top: 524, textAlign: "center",
        zIndex: 40, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 60, color: RED,
        letterSpacing: "0.02em" }}>FOUR CHATS. NOTHING KEPT.</div>
      <Cl f={f} x={78} y={566} size={112} gaze={0} stern={0.62} nodAmp={2.2} nodSpeed={13} z={36} />
      <Chip text="CLAUDE FORGETS EVERY ONE" c={RED} size={30} />
    </Shot>
    {tail(f)}
  </>));
};

/* ############################################################ C · THE COUNTER
   THE OBJECT: one number. The tokens you spend re-loading the same context,
   climbing, and the same figure with a notebook attached. One figure, huge.
   ######################################################################### */
export const AiHookC: React.FC = () => {
  const f = useCurrentFrame();
  const C1 = AI_CUTS[0];
  const burn = E(f, 0, 34, 0.66, 1, OUT);   // already climbing on frame 0, never 0
  return wrap(f, AMB, sfxFor({ src: "coin-spin.wav", dur: 1.20, rate: 0.9 }), (<>
    <Shot f={f} a={0} b={C1} k={0} slamAt={12}>
      <Studio tint="#8E897E" />
      <Subject x={286} y={130} s={0.92} />
      <div style={{ position: "absolute", left: 96, top: 224, width: 820, height: 300,
        borderRadius: 18, background: PAPER, border: `7px solid ${AMB_D}`, boxShadow: SH,
        zIndex: 24 }} />
      <div style={{ position: "absolute", left: 96, top: 250, width: 820, textAlign: "center",
        zIndex: 30, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 148, lineHeight: 1,
        color: "#8E5B12", letterSpacing: "-0.05em", fontVariantNumeric: "tabular-nums" }}>
        {Math.round(burn * 48000).toLocaleString("en-US")}
      </div>
      <div style={{ position: "absolute", left: 96, top: 418, width: 820, textAlign: "center",
        zIndex: 30, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 34, color: PAPER2,
        letterSpacing: "0.16em" }}>TOKENS, RE-SENT</div>
      <div style={{ position: "absolute", left: 96, top: 462, width: 820, textAlign: "center",
        zIndex: 30, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 24, color: "#9A8F7C",
        letterSpacing: "0.1em" }}>the same context, every session</div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 560, textAlign: "center",
        zIndex: 40, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 56, color: RED }}>
        FOR NOTHING NEW
      </div>
      <Cl f={f} x={800} y={572} size={112} gaze={1} shock={0.72} nodAmp={2.2} nodSpeed={14}
          flip z={36} />
      <Chip text="AND IT RESETS TOMORROW" c={RED} size={30} />
    </Shot>
    {tail(f)}
  </>));
};

/* ############################################################### D · THE GAP
   THE OBJECT: two containers side by side, one empty and one full, at a size
   you cannot miss. Rank by FULL vs EMPTY — the cheapest legible comparison.
   ######################################################################### */
export const AiHookD: React.FC = () => {
  const f = useCurrentFrame();
  const C1 = AI_CUTS[0];
  const fill = 1;                                        // right side settled at 47
  const tryFill = E(f, 12, 19, 0, 1, OUT) - E(f, 19, 25, 0, 1, IO);   // left side: up, then wiped
  return wrap(f, GO, sfxFor({ src: "gear-mech.wav", dur: 1.05, rate: 0.85 }), (<>
    <Shot f={f} a={0} b={C1} k={0} slamAt={12}>
      <Studio tint="#7E8A86" />
      <Subject x={286} y={128} s={0.92} />
      {/* left: Claude on its own */}
      <div style={{ position: "absolute", left: 66, top: 218, width: 392, height: 340, zIndex: 24,
        borderRadius: 18, background: PAPER, boxShadow: SH }} />
      <div style={{ position: "absolute", left: 66, top: 218, width: 392, height: 56, zIndex: 26,
        borderRadius: "18px 18px 0 0", background: "#2A2118", display: "flex", alignItems: "center",
        justifyContent: "center", gap: 10, fontFamily: inter.fontFamily, fontWeight: 900,
        fontSize: 24, color: PAPER2, letterSpacing: "0.08em" }}>
        <Img src={staticFile(CLAUDE)} style={{ width: 28, height: 28, objectFit: "contain" }} />
        CLAUDE ALONE
      </div>
      <div style={{ position: "absolute", left: 66, top: 296, width: 392, textAlign: "center",
        zIndex: 26, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 124, lineHeight: 1,
        color: RED, letterSpacing: "-0.04em" }}>0</div>
      <div style={{ position: "absolute", left: 66, top: 432, width: 392, textAlign: "center",
        zIndex: 26, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 27, color: "#8C877D",
        letterSpacing: "0.12em" }}>SESSIONS KEPT</div>
      <div style={{ position: "absolute", left: 106, top: 484, width: 312, height: 42, zIndex: 26,
        borderRadius: 9, background: "#F6E4E1", border: `3px solid ${RED}`, display: "flex",
        alignItems: "center", justifyContent: "center", fontFamily: inter.fontFamily,
        fontWeight: 900, fontSize: 21, color: "#8E2E22" }}>STARTS FROM ZERO</div>
      {/* right: with the notebook attached */}
      <div style={{ position: "absolute", left: 554, top: 218, width: 392, height: 340, zIndex: 24,
        borderRadius: 18, background: PAPER, boxShadow: SH }} />
      <div style={{ position: "absolute", left: 554, top: 218, width: 392, height: 56, zIndex: 26,
        borderRadius: "18px 18px 0 0", background: "#1F5142", display: "flex", alignItems: "center",
        justifyContent: "center", gap: 10, fontFamily: inter.fontFamily, fontWeight: 900,
        fontSize: 23, color: "#EAF7F0", letterSpacing: "0.06em" }}>
        <Img src={staticFile(NBLM)} style={{ width: 28, height: 28, objectFit: "contain",
          filter: "invert(1)" }} />
        + NOTEBOOKLM
      </div>
      <div style={{ position: "absolute", left: 554, top: 296, width: 392, textAlign: "center",
        zIndex: 26, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 124, lineHeight: 1,
        color: GO, letterSpacing: "-0.04em" }}>{Math.round(fill * 47)}</div>
      <div style={{ position: "absolute", left: 554, top: 432, width: 392, textAlign: "center",
        zIndex: 26, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 27, color: "#8C877D",
        letterSpacing: "0.12em" }}>SESSIONS KEPT</div>
      <div style={{ position: "absolute", left: 594, top: 484, width: 312, height: 42, zIndex: 26,
        borderRadius: 9, background: "#E7F5EC", border: `3px solid ${GO}`, display: "flex",
        alignItems: "center", justifyContent: "center", fontFamily: inter.fontFamily,
        fontWeight: 900, fontSize: 21, color: "#12522B" }}>REMEMBERS ALL OF IT</div>
      <Cl f={f} x={452} y={572} size={112} gaze={2} cheer={0.85} nodAmp={3} nodSpeed={10} z={36} />
      <Chip text="SAME MODEL. ONE CONNECTION." c={GO} size={30} />
    </Shot>
    {tail(f)}
  </>));
};
