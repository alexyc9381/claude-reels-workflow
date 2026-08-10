import React from "react";
import { AbsoluteFill, useCurrentFrame, Img, staticFile } from "remotion";
import { inter } from "./fonts";
import { Bg, Panel, ProgressBar, Caption, AssemblyCtx, hexA, Mascot, HookHeader } from "./SlopKit";
import {
  OChip, Icon, STATS, STUDIOS, CARD, INKD, MUTE, CLAY, GO, GOLD, RED, BLUE, PLUM,
  STEEL, STEEL_D, STEEL_L, LAMP, NIGHT, SH_D, HF_LIME, HF_INK,
  BackLot, SoundStage,
} from "./LotWorld";
import { E, osc, rnd, OUT, IO, BACK, IN_Q } from "./MissionWorld";
import { Cue, SfxTrack, LEVELS, layer, repeat } from "./SoundKit";

/* =========================================================================
   REEL 90 "OPEN" · FIVE HOOKS, SECOND ROUND.

   ⛔ ROUND ONE WAS TOO BUSY. Alex: "concepts need to be simpler not so much
      stuff going on, very hierarchical but still visually appealing and
      striking". V1 had two cards PLUS a strike, a tick, a Claude, a grip truck,
      three sound stages, drifting haze and a chip. That is not hierarchy, that
      is a crowded frame with no first place.

   The rule this round: ONE dominant object, at most ONE supporting element, on
   an almost empty stage. Striking comes from SCALE and the real lime, not from
   quantity. Everything that was set dressing is gone — no backlot, no trucks,
   no haze, no crowd, no searchlights.

     S1 · THE PRICE   one number, struck, replaced       objects: 1
     S2 · TWO CARDS   the same product twice             objects: 2
     S3 · THE MARK    their logo out, GitHub in          objects: 1
     S4 · GOLIATH     one tower, one Claude              objects: 2
     S5 · THE TEAR    one subscription, torn in half     objects: 1 + actor
   ========================================================================= */

export const HOOK_LEN = 125;
const HEAD = { big: "ONE GUY KILLED", hot: "A PAID AI PLATFORM" };

const SoloCap: React.FC<{ words: string[]; hot?: number }> = (p) =>
  React.useContext(AssemblyCtx) ? null : <Caption {...p} />;

/* -------------------------------------------------------------- the stage --
   ⛔ ROUND TWO WENT TOO FAR THE OTHER WAY. Alex: "no it cant just be this basic,
      like i like our original backgrounds and stuff but just incorporate these
      kind of things". An empty black field is hierarchy with nothing to look at.

   The answer is not fewer LAYERS, it is fewer IDEAS. The backlot comes back as
   a proper background — stages receding, the truss, the lamps, the floor — but
   held DOWN (dim 0.5) and stripped of anything that competes: no trucks, no
   crowd, no haze, no searchlights. Rich world, one hero concept in front of it.
   ---------------------------------------------------------------------------- */
const Stage: React.FC<{ f: number; lit?: string; dim?: number }> =
  ({ f, lit = "#3A4C5E", dim = 0.52 }) => (<>
  <BackLot f={f} dim={dim} lamps={1} z={2} />
  {/* the four stages, well back and well down — depth, not subject matter */}
  {STUDIOS.map((st, i) => (
    <SoundStage key={st.name} f={f} x={-52 + i * 288} y={368} w={214} h={232} s={0.7}
                label={st.name} num={`0${i + 1}`} c={st.c} icon={st.icon}
                open={0.86} lit={1} z={11} />
  ))}
  {/* the pool the hero object stands in */}
  {[0, 1, 2].map((i) => (
    <div key={i} style={{ position: "absolute", left: 506 - (800 - i * 200) / 2,
      top: 566 + i * 24, width: 800 - i * 200, height: 158 - i * 36, borderRadius: "50%",
      background: ["#1B2733", "#22303E", "#2A3B4C"][i], zIndex: 13 + i }} />
  ))}
  <div style={{ position: "absolute", left: 0, right: 0, top: 640, height: 5,
    background: lit, zIndex: 17, opacity: 0.5 }} />
</>);

/** ⛔ Inside the reel, ROOT owns the bg, the rail, the header and the captions.
    A hook that renders its own would double every one of them. The SFX track
    stays either way — it is additive audio, and the reel's own cues sit around
    it rather than on top of it. */
const Wrapped: React.FC<{ cues?: Cue[]; children: React.ReactNode }> =
  ({ cues, children }) => {
  const f = useCurrentFrame();
  const solo = !React.useContext(AssemblyCtx);
  return (
    <AbsoluteFill>
      {cues && <SfxTrack cues={cues} />}
      {solo && <><Bg /><ProgressBar />
        <HookHeader f={f} big={HEAD.big} hot={HEAD.hot} /></>}
      <Panel glow={hexA(CLAY, 0.3)}>
        <div style={{ position: "absolute", inset: 0, zIndex: 1,
          transform: `scale(${0.984 + f * 0.0006}) translate(${-f * 0.05}px, ${-f * 0.018}px)`,
          transformOrigin: "50% 54%" }}>{children}</div>
      </Panel>
      {solo && <SoloCap words={["One guy", "just killed", "Higgsfield"]} hot={1} />}
    </AbsoluteFill>
  );
};

const wrap = (f: number, children: React.ReactNode, cues?: Cue[]) => (
  <Wrapped cues={cues}>{children}</Wrapped>
);

const Guy: React.FC<{
  f: number; x: number; y: number; size?: number; prop?: string; cheer?: number;
  shock?: number; z?: number;
}> = ({ f, x, y, size = 200, prop, cheer = 0, shock = 0, z = 34 }) => {
  const p: any = { lf: f, size, cheer, shock, nodAmp: 3, nodSpeed: 10 };
  if (prop) p[prop] = 1;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      filter: `drop-shadow(0 ${Math.round(size * 0.05)}px ${Math.round(size * 0.07)}px rgba(0,0,0,0.6))` }}>
      <Mascot {...p} />
    </div>
  );
};

/* ============================================================== S1 · PRICE ==
   ONE OBJECT. The price is the villain, so the price is the whole frame.
   ============================================================================ */
export const HookPrice: React.FC = () => {
  const f = useCurrentFrame();
  const strike = E(f, 44, 68, 0, 1, OUT);
  const drop = E(f, 72, 106, 0, 1, IN_Q);
  const rise = E(f, 82, 110, 0, 1, BACK);
  /* the bill CLIMBING is the first 40 frames — a 128px number changing every
     frame, not a held plate. Then it is struck, kicked out, and replaced. */
  const climb = E(f, 4, 42, 0, 1, OUT);
  const price = Math.round(climb * 129);
  const dread = climb > 0.98 ? Math.sin(f / 2.4) * (3 + strike * 5) : 0;
  return wrap(f, <>
    <Stage f={f} lit={HF_LIME} dim={0.62 - climb * 0.34 + rise * 0.4} />

    {/* their mark, arriving with the bill and thrown out with it */}
    <div style={{ position: "absolute", left: 436 + drop * 340, top: 178 - drop * 60,
      width: 148, height: 148,
      borderRadius: 36, overflow: "hidden", zIndex: 30, boxShadow: SH_D,
      background: rise > 0.4 ? "#2A2E22" : HF_LIME,
      transform: `scale(${E(f, 0, 14, 0.5, 1, BACK)}) rotate(${drop * 26}deg)`,
      opacity: (1 - rise * 0.55) * (1 - E(f, 96, 108, 0, 1, OUT)) }}>
      <Img src={staticFile("logos/higgsfield.png")}
           style={{ width: "100%", height: "100%", objectFit: "cover",
             opacity: rise > 0.4 ? 0.3 : 1 }} />
    </div>

    {/* the price, counting up, then kicked clean out of frame */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 384 + drop * 620,
      display: "flex", justifyContent: "center", zIndex: 32,
      transform: `translateX(${dread + drop * 300}px) rotate(${dread * 0.4 + drop * 24}deg)`,
      opacity: 1 - E(f, 98, 110, 0, 1, OUT) }}>
      <div style={{ padding: `${20 + climb * 30}px ${30 + climb * 60}px`, borderRadius: 22,
        background: HF_INK, boxShadow: SH_D, fontFamily: inter.fontFamily, fontWeight: 900,
        fontSize: 62 + climb * 96, lineHeight: 1, letterSpacing: "-0.05em", color: HF_LIME,
        fontVariantNumeric: "tabular-nums" }}>
        ${price}<span style={{ fontSize: 26 + climb * 40 }}>/mo</span>
      </div>
    </div>
    <div style={{ position: "absolute", left: 168, top: 458, height: 26, borderRadius: 13,
      background: RED, zIndex: 36, transformOrigin: "0% 50%",
      width: strike * 700, transform: "rotate(-7deg)",
      opacity: 1 - E(f, 82, 94, 0, 1, OUT) }} />

    {/* what replaces it — full size, arriving from below at speed */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 392, display: "flex",
      justifyContent: "center", zIndex: 34,
      transform: `scale(${0.5 + rise * 0.6}) translateY(${(1 - rise) * 560}px)` }}>
      <div style={{ padding: "26px 84px", borderRadius: 22, background: GO, boxShadow: SH_D,
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 168, lineHeight: 1,
        letterSpacing: "-0.05em", color: CARD }}>$0</div>
    </div>
    {/* the arrival punches rings outward, the one big bright event in the shot */}
    {rise > 0.05 && [0, 1, 2].map((i) => {
      const t = Math.max(0, Math.min(1, (f - (84 + i * 7)) / 22));
      if (t <= 0 || t >= 1) return null;
      const d = 220 + t * 520;
      return (
        <div key={i} style={{ position: "absolute", left: 506 - d / 2, top: 470 - d / 2,
          width: d, height: d, borderRadius: "50%", zIndex: 33,
          border: `${Math.round(16 * (1 - t))}px solid ${GO}`, opacity: 1 - t }} />
      );
    })}

    <OChip y={706} text="SAME TOOL. ZERO." c={GO} />
  </>);
};

/* =========================================================== S2 · TWO CARDS ==
   THE PICK, DEVELOPED. ⛔ Three notes from Alex, all applied:

     "sprites under them"          — a Claude stands under each card. The one on
                                     the left is smug, then shocked.
     "one sprite comes in with the — the right card starts FACE DOWN. It flips to
      mystery card that destroys    reveal FREE, then he KICKS the paid one clean
      it and kicks it away"         out of frame.
     "the right side visible even   — BOTH cards are up at frame 0. Nothing slides
      at 0 seconds"                  in from off-screen; the reveal is the flip.

   Sound is built for the kick: a wind-up whoosh, then punch + boom + a low ring
   layered on the same frame, then the card tumbling, then the win.
   ============================================================================ */
const KICK = 66;

const Face: React.FC<{
  paid?: boolean; mystery?: boolean; dead?: number; s?: number; f?: number;
  /** hide the identity: the mark and the name blur out, only FREE stays legible */
  veil?: number;
}> = ({ paid = false, mystery = false, dead = 0, s = 1, f = 0, veil = 0 }) => (
  <div style={{ position: "absolute", inset: 0, borderRadius: 24 * s,
    background: mystery ? "#1A2431" : (dead > 0.5 ? "#8C877E" : CARD),
    border: mystery ? `6px solid ${(Math.floor(f / 4) % 2) ? RED : "#5A2620"}` : "none",
    boxShadow: SH_D, backfaceVisibility: "hidden", overflow: "hidden",
    display: mystery ? "flex" : undefined,
    alignItems: "center", justifyContent: "center" }}>
    {mystery ? (<>
      {/* ⛔ THE RIGHT SIDE MUST BE ALIVE AT FRAME 0. Alarm bars, a red wash that
             blinks on a 4-frame cycle, and a ? that flickers with it. */}
      {Array.from({ length: 7 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: -60 + i * 68,
          top: -40, width: 30, height: 480 * s,
          background: (Math.floor(f / 4) % 2) ? "#3A1B18" : "#2A1512",
          transform: "rotate(20deg)" }} />
      ))}
      <div style={{ position: "absolute", inset: 0,
        background: RED, opacity: (Math.floor(f / 4) % 2) ? 0.18 : 0.04 }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 18 * s,
        textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 900,
        fontSize: 20 * s, letterSpacing: "0.2em",
        color: (Math.floor(f / 4) % 2) ? RED : "#6A3029" }}>? ? ?</div>
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 172 * s,
        lineHeight: 1, color: (Math.floor(f / 4) % 2) ? "#FF6B57" : RED,
        transform: `rotate(${Math.sin(f / 2.1) * 4}deg)` }}>?</div>
    </>) : (<>
      {/* ⛔ the mark was 96 units on a 372 card — about a quarter of the width,
             and unreadable at scroll speed. 148 now, and the glyph inside it
             scales with it. */}
      <div style={{ position: "absolute", left: 28 * s, top: 26 * s, width: 148 * s,
        height: 148 * s, borderRadius: 34 * s, overflow: "hidden",
        background: paid ? HF_LIME : INKD, opacity: dead > 0.5 ? 0.4 : 1,
        filter: `blur(${veil * 11}px)`,
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        {paid
          ? <Img src={staticFile("logos/higgsfield.png")}
                 style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          : <Img src={staticFile("logos/github.svg")}
                 style={{ width: 92 * s, height: 92 * s, filter: "invert(1)" }} />}
      </div>
      {/* ⛔ ONE LINE. Two lines stacked behind an 8px blur read as a glitch, not
             as hidden text — the descenders of the first line smear into the
             second. `nowrap` guarantees it can never re-wrap at any scale. */}
      <div style={{ position: "absolute", left: 28 * s, top: 196 * s,
        fontFamily: inter.fontFamily, fontWeight: 900,
        fontSize: (paid ? 44 : 38) * s, lineHeight: 1,
        letterSpacing: "-0.03em", color: dead > 0.5 ? "#5E574E" : INKD,
        whiteSpace: "nowrap", filter: `blur(${veil * 8}px)` }}>
        {paid ? "Higgsfield" : "Open Source"}
      </div>
      {/* ⛔ the one glow in the reel, and it is here on purpose: FREE is the
             only thing that stays legible, so it is the only thing that shines. */}
      <div style={{ position: "absolute", left: 30 * s, right: 30 * s, bottom: 30 * s,
        height: 90 * s, borderRadius: 16 * s, background: paid ? HF_INK : GO,
        display: "flex", alignItems: "center", justifyContent: "center", gap: 12 * s,
        opacity: dead > 0.5 ? 0.5 : 1,
        boxShadow: paid ? undefined
          : `0 0 ${(26 + Math.sin(f / 7) * 10) * s}px ${8 * s}px rgba(23,168,124,0.55)` }}>
        {paid && <Icon n="lock" s={32 * s} c={HF_LIME} w={2.5} />}
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 48 * s,
          letterSpacing: "-0.03em", color: paid ? HF_LIME : CARD,
          textShadow: paid ? undefined : "0 0 18px rgba(255,255,255,0.75)" }}>
          {paid ? "$129/mo" : "FREE"}
        </div>
      </div>
    </>)}
  </div>
);

const TWO_CARD_SFX: Cue[] = [
  { at: 0.00, src: "am/room-tone.wav",  v: LEVELS.SFX_BED, dur: 4.1, lead: 0 },
  { at: 0.00, src: "am/hit-up.wav",     v: LEVELS.SFX_MID, dur: 0.7, lead: 0 },
  /* ⛔ the card is flashing red from frame 0, so it has to SOUND like it too.
        Four blips on the same 4-frame cycle the red flash runs on, pitch
        climbing, so the alarm is rising rather than just repeating. */
  ...[0.00, 0.27, 0.54, 0.81].map((t, i) => ({
    at: t, src: "am/ping.wav", v: LEVELS.SFX_MID, dur: 0.24,
    rate: 1 + i * 0.09, lead: 0,
  })),
  { at: 0.06, src: "am/digital-countdown.wav", v: LEVELS.SFX_TEXTURE, dur: 1.2, lead: 0 },
  /* he picks the mystery card up */
  { at: 0.93, src: "am/paper-slide.wav", v: LEVELS.SFX_TEXTURE, dur: 0.5 },
  /* THE FLIP — a page turn plus a snap on the landing frame */
  ...layer(1.33, { src: "am/page-turn.wav", v: LEVELS.SFX_MID,     dur: 0.7 },
                 { src: "am/snap.wav",      v: LEVELS.SFX_TEXTURE, dur: 0.35 }),
  ...layer(1.60, { src: "am/unlock.wav",        v: LEVELS.SFX_MID, dur: 0.9 },
                 { src: "am/positive-chime.wav", v: LEVELS.SFX_TEXTURE, dur: 0.9 }),
  /* the wind-up, J-cut 4 frames ahead of the kick */
  { at: 1.87, src: "am/whoosh-fast.wav", v: LEVELS.SFX_MID, dur: 0.5 },
  /* ⛔ THE KICK IS THE HERO FRAME: three layers on the same beat, pitch-spread */
  ...layer(KICK / 30, { src: "am/punch.wav",    v: LEVELS.SFX_HERO, dur: 0.6 },
                      { src: "am/hit-boom.wav", v: LEVELS.SFX_HERO, dur: 1.2 }),
  { at: KICK / 30, src: "am/ring-low.wav", v: LEVELS.SFX_MID, dur: 1.4, rate: 0.84, lead: 0 },
  /* the card tumbling out of frame */
  { at: KICK / 30 + 0.05, src: "am/whoosh-flyby.wav", v: LEVELS.SFX_MID, dur: 0.9 },
  ...repeat(3, KICK / 30 + 0.12, 0.13,
            { src: "am/paper-rustle.wav", v: LEVELS.SFX_TEXTURE, dur: 0.4 }, 0.07),
  { at: KICK / 30 + 0.52, src: "am/error-take.wav", v: LEVELS.SFX_TEXTURE, dur: 0.7 },
  /* the card travelling into the middle */
  { at: 2.53, src: "am/riser-sharp.wav", v: LEVELS.SFX_MID, dur: 1.1 },
  /* ⛔ IT LANDS. A power hit plus a shine on the frame the aura punches out,
        so the arrival is its own beat and not just the tail of the kick. */
  ...layer(3.07, { src: "c_powerbig.wav", v: LEVELS.SFX_HERO, dur: 1.4 },
                 { src: "angelic.wav",    v: LEVELS.SFX_MID,  dur: 1.6 }),
  { at: 3.14, src: "chrome_shine.wav", v: LEVELS.SFX_TEXTURE, dur: 1.0, lead: 0 },
  ...layer(3.30, { src: "am/success-jingle.wav", v: LEVELS.SFX_MID, dur: 1.3 },
                 { src: "am/crowd-cheer.wav",    v: LEVELS.SFX_TEXTURE, dur: 1.5 }),
];

export const HookTwoCards: React.FC = () => {
  const f = useCurrentFrame();
  const flip = E(f, 34, 56, 0, 1, IO);          // 0..1 -> rotateY 0..180
  const wind = E(f, 56, KICK, 0, 1, IO);        // he draws his leg back
  const boot = E(f, KICK, KICK + 8, 0, 1, OUT); // the strike itself
  const fly = E(f, KICK, 118, 0, 1, IN_Q);      // the paid card leaves
  const settle = E(f, KICK + 10, 104, 0, 1, OUT);

  return wrap(f, <>
    <Stage f={f} />

    {/* the alarm reaching past the card, so frame 0 is loud */}
    {(Math.floor(f / 4) % 2) === 0 && flip < 0.1 && (
      <div style={{ position: "absolute", left: 600, top: 264, width: 412, height: 422,
        borderRadius: 32, border: `5px solid ${RED}`, opacity: 0.42, zIndex: 31 }} />
    )}

    {/* LEFT — the paid card OWNS the frame until it is kicked. ⛔ round one had
           both cards the same size, so there was no first place to look at. */}
    <div style={{ position: "absolute", left: 22 - fly * 1040, top: 146 + fly * 168,
      width: 506, height: 520, zIndex: 30,
      transform: `rotate(${-boot * 6 - fly * 44}deg) scale(${1 - fly * 0.22})`,
      opacity: 1 - E(f, 102, 120, 0, 1, OUT) }}>
      <Face paid dead={boot} f={f} s={1.36} />
    </div>
    {/* ⛔ he was BEHIND the enlarged card and invisible. He stands in front of
           its bottom edge now, the way you stand in front of a billboard. */}
    <Guy f={f} x={44 - fly * 130} y={606} size={158} prop="suit"
         cheer={f < KICK - 14 ? 0.5 : 0}
         shock={E(f, KICK - 12, KICK + 8, 0, 0.55, OUT)} z={34} />

    {/* RIGHT — face down and ALARMING at frame 0, then veiled and glowing.
           ⛔ the shake runs only while it is face down; once it flips it settles,
              so the turbulence reads as "this thing is about to go off" rather
              than as a wobble that never stops. */}
    <div style={{ position: "absolute",
      left: 638 - settle * 300 + (1 - flip) * Math.sin(f * 2.7) * 7,
      top: 300 - wind * 8 - settle * 74 + (1 - flip) * Math.cos(f * 3.3) * 6,
      width: 336, height: 350, zIndex: 32, perspective: 1400,
      /* ⛔ it does not just slide to the middle, it TAKES the middle: 1.44x by
             the time it lands, with the paid card already gone. */
      transform: `rotate(${(1 - flip) * Math.sin(f * 1.9) * 1.8}deg) scale(${1 + settle * 0.44})`,
      transformOrigin: "50% 50%" }}>
      <div style={{ position: "absolute", inset: 0,
        transformStyle: "preserve-3d",
        transform: `rotateY(${flip * 180}deg) scale(${1 + Math.sin(flip * Math.PI) * 0.06})` }}>
        {/* ⛔ backface-visibility has to sit on the ROTATED element, not on the
               face inside it — otherwise the reverse side shows through
               mirrored and the card reads "Open Source" backwards at frame 0. */}
        <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden" }}>
          <Face mystery f={f} s={0.9} />
        </div>
        <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
          {/* ⛔ the identity NEVER resolves in the hook. The mark and the name
                 stay fully blurred for the whole shot — FREE is the only thing
                 you can ever read, and the repo name is saved for scene 3. */}
          <Face f={f} veil={1} s={0.9} />
        </div>
      </div>
    </div>

    {/* ⛔ THE AURA. Rings punch outward on arrival and a halo breathes behind the
           card. Hard-edged rings, not a gradient wash — and it is the one place
           in this reel besides FREE where a glow is allowed. */}
    {settle > 0.04 && [0, 1, 2].map((i) => {
      const r = E(f, 92 + i * 7, 122 + i * 7, 0, 1, OUT);
      if (r <= 0.01) return null;
      const g = 340 + r * 430;
      return (
        <div key={i} style={{ position: "absolute", left: 506 - g / 2, top: 388 - g / 2,
          width: g, height: g, borderRadius: 56 + r * 40,
          border: `${Math.max(1, 9 - r * 7)}px solid ${GO}`,
          opacity: (1 - r) * 0.55, zIndex: 29 }} />
      );
    })}
    {settle > 0.04 && (
      <div style={{ position: "absolute", left: 506 - 300, top: 388 - 310,
        width: 600, height: 620, borderRadius: 60, zIndex: 28,
        boxShadow: `0 0 ${(70 + Math.sin(f / 8) * 22) * settle}px ${26 * settle}px rgba(23,168,124,0.42)`,
        opacity: settle }} />
    )}

    {/* the Claude who brought it, and does the kicking */}
    <Guy f={f} x={790 - settle * 300} y={634 - boot * 26} size={162} prop="constr"
         cheer={E(f, KICK + 6, KICK + 30, 0, 0.95, OUT)} z={36} />

    {/* the boot: a solid wedge that only exists on the strike frames */}
    {boot > 0.02 && boot < 0.98 && (
      <div style={{ position: "absolute", left: 556 + boot * 60, top: 646,
        width: 120, height: 30, borderRadius: 15, background: CLAY, zIndex: 38,
        transform: `rotate(${-18 + boot * 22}deg)`, opacity: 1 - boot * 0.4 }} />
    )}

    <OChip y={706} text="SAME APP. ONE IS FREE." c={GO} size={35} />
  </>, TWO_CARD_SFX);
};

/* =============================================================== S3 · MARK ==
   ONE OBJECT AT A TIME. Their logo owns the frame, dies, and GitHub takes the
   same spot. Nothing else is ever on screen.
   ============================================================================ */
export const HookMark: React.FC = () => {
  const f = useCurrentFrame();
  const die = E(f, 40, 74, 0, 1, OUT);
  const swap = E(f, 70, 100, 0, 1, BACK);
  return wrap(f, <>
    <Stage f={f} lit={swap > 0.4 ? GO : HF_LIME} />

    <div style={{ position: "absolute", left: 298, top: 208, width: 416, height: 416,
      borderRadius: 98, overflow: "hidden", zIndex: 30, boxShadow: SH_D,
      background: die > 0.5 ? "#2A2E22" : HF_LIME,
      transform: `scale(${1 - swap * 0.34}) rotate(${swap * -10}deg)`,
      opacity: 1 - E(f, 76, 94, 0, 1, OUT) }}>
      <Img src={staticFile("logos/higgsfield.png")}
           style={{ width: "100%", height: "100%", objectFit: "cover",
             opacity: die > 0.5 ? 0.26 : 1 }} />
    </div>

    <div style={{ position: "absolute", left: 298, top: 208, width: 416, height: 416,
      borderRadius: 98, background: INKD, zIndex: 32, boxShadow: SH_D,
      display: "flex", alignItems: "center", justifyContent: "center",
      transform: `scale(${swap})`, opacity: Math.min(1, swap * 1.6) }}>
      <Img src={staticFile("logos/github.svg")}
           style={{ width: 218, height: 218, filter: "invert(1)" }} />
    </div>

    <div style={{ position: "absolute", left: 0, right: 0, top: 664, display: "flex",
      justifyContent: "center", zIndex: 34,
      transform: `scale(${E(f, 96, 114, 0, 1, BACK)})` }}>
      <div style={{ padding: "13px 30px", borderRadius: 15, background: GO, boxShadow: SH_D,
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 40, color: CARD }}>
        FREE. MIT.
      </div>
    </div>
  </>);
};

/* ============================================================ S4 · GOLIATH ==
   TWO OBJECTS. One very large lime tower, one small Claude. The scale gap IS
   the hierarchy; nothing else is in the room.
   ============================================================================ */
export const HookGoliath: React.FC = () => {
  const f = useCurrentFrame();
  const dark = Math.min(1,
    E(f, 44, 56, 0, 0.34, OUT) + E(f, 66, 78, 0, 0.33, OUT) + E(f, 88, 104, 0, 0.34, OUT));
  return wrap(f, <>
    <Stage f={f} lit={HF_LIME} />

    <div style={{ position: "absolute", left: 296, top: 148, width: 424, height: 490,
      borderRadius: 12, zIndex: 30, background: dark > 0.5 ? "#1A1F24" : "#1C1C1C",
      border: `5px solid ${dark > 0.5 ? STEEL_D : "#6E7F3A"}`, boxShadow: SH_D }}>
      {Array.from({ length: 24 }, (_, i) => {
        const c = i % 4, r = Math.floor(i / 4);
        const on = dark < 0.5
          ? ((Math.floor(f / 15) + i) % 7 !== 0)
          : ((1 - dark) > (r / 5.5));
        return (
          <div key={i} style={{ position: "absolute", left: 30 + c * 93, top: 34 + r * 60,
            width: 64, height: 44, borderRadius: 5,
            background: on ? HF_LIME : "#1E2429" }} />
        );
      })}
      <div style={{ position: "absolute", left: 22, right: 22, bottom: 22, height: 64,
        borderRadius: 10, background: HF_INK, display: "flex", alignItems: "center",
        justifyContent: "center", gap: 12 }}>
        <Icon n="lock" s={28} c={dark > 0.5 ? "#4A5030" : HF_LIME} w={2.5} />
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 36,
          color: dark > 0.5 ? "#4A5030" : HF_LIME }}>$129/mo</div>
      </div>
    </div>

    <Guy f={f} x={56} y={486} size={176} prop="constr"
         cheer={E(f, 94, 118, 0, 0.9, OUT)} z={36} />
    <OChip y={706} text="ONE GUY. ONE REPO." c={RED} />
  </>);
};

/* =============================================================== S5 · TEAR ==
   ONE OBJECT AND ONE ACTOR. A single subscription, torn in half, and what was
   behind it all along.
   ============================================================================ */
export const HookTear: React.FC = () => {
  const f = useCurrentFrame();
  const tear = E(f, 42, 88, 0, 1, IN_Q);
  const show = E(f, 76, 104, 0, 1, BACK);
  const land = E(f, 0, 16, 0, 1, BACK);                      // it drops into frame
  const total = Math.round(E(f, 6, 38, 0, 1, OUT) * 129);    // the bill adds up
  const shake = f > 20 && f < 42 ? Math.sin(f / 1.7) * (f - 20) * 0.9 : 0;
  return wrap(f, <>
    <Stage f={f} lit={HF_LIME} />

    {/* what was behind it */}
    <div style={{ position: "absolute", left: 232, top: 252, width: 548, height: 312,
      borderRadius: 24, background: GO, boxShadow: SH_D, zIndex: 28,
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", gap: 10,
      transform: `scale(${0.62 + show * 0.38}) translateY(${(1 - show) * 300}px)`,
      opacity: E(f, 74, 84, 0, 1, OUT) }}>
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 120,
        lineHeight: 1, letterSpacing: "-0.05em", color: CARD }}>FREE</div>
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 30,
        letterSpacing: "0.08em", color: "#D8F2E6" }}>OPEN SOURCE · MIT</div>
    </div>

    {/* the subscription, in two halves. ⛔ it used to sit PERFECTLY STILL for 42
           frames before the rip — the whole reason this hook measured 5.46. It
           drops in, then shakes harder and harder until it tears. */}
    {[0, 1].map((i) => (
      <div key={i} style={{ position: "absolute",
        left: 232 + shake * (i ? 1 : -1), top: 252 - (1 - land) * 470, width: 548,
        height: 312, zIndex: 32, overflow: "hidden",
        clipPath: i ? "polygon(48% 0, 100% 0, 100% 100%, 56% 100%)"
                    : "polygon(0 0, 48% 0, 56% 100%, 0 100%)",
        transform: `translateX(${tear * (i ? 640 : -640)}px) `
                 + `translateY(${tear * tear * 300}px) `
                 + `rotate(${shake * 0.5 + tear * (i ? 26 : -26)}deg)`,
        opacity: 1 - E(f, 92, 108, 0, 1, OUT) }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: 24, background: CARD,
          boxShadow: SH_D, display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "center", gap: 10 }}>
          <div style={{ width: 96, height: 96, borderRadius: 24, overflow: "hidden",
            background: HF_LIME }}>
            <Img src={staticFile("logos/higgsfield.png")}
                 style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 76,
            lineHeight: 1, letterSpacing: "-0.04em", color: INKD,
            fontVariantNumeric: "tabular-nums" }}>${total}/mo</div>
        </div>
      </div>
    ))}

    {show > 0.05 && [0, 1, 2].map((i) => {
      const t = Math.max(0, Math.min(1, (f - (78 + i * 7)) / 22));
      if (t <= 0 || t >= 1) return null;
      const d = 240 + t * 540;
      return (
        <div key={i} style={{ position: "absolute", left: 506 - d / 2, top: 408 - d / 2,
          width: d, height: d, borderRadius: "50%", zIndex: 27,
          border: `${Math.round(16 * (1 - t))}px solid ${GO}`, opacity: 1 - t }} />
      );
    })}

    <Guy f={f} x={426} y={568} size={180} prop="constr"
         cheer={E(f, 76, 104, 0, 0.9, OUT)} z={36} />
    <OChip y={706} text="HE TORE UP THE BILL" c={CLAY} size={35} />
  </>);
};
