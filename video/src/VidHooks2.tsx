import React from "react";
import { AbsoluteFill, Audio, staticFile, useCurrentFrame } from "remotion";
import { inter } from "./fonts";
import { Bg, Panel, ProgressBar, KaraokeCaption, AssemblyCtx, hexA, HookHeader, Mascot } from "./SlopKit";
import WORDS from "./data/words_video.json";
import {
  Stage, Film, Clapper, LogoTile, FreeTile, Band, TOOLS, NAMED,
  INK, CLAY, RED, GO, SH, SH_D,
} from "./VidWorld";
import { Surface, Occluder, Plinth, WORLDS } from "./VidSurfaces";
import { E, OUT, BACK, IN_Q } from "./MissionWorld";
import { Cue, SfxTrack, LEVELS, layer } from "./SoundKit";

/* =========================================================================
   REEL 93 "VIDEO" · ROUND 2 OPENS, round-3 pass.

   ⛔ ROUND 1 (VidHooks.tsx — video store / jukebox / forecourt / toll plaza /
      weigh-stall) IS DEAD. It passed every gate and was rejected on the thing
      no gate measures. Alex: "way more hierarchical super easy to understand and
      so simple and basic · very eye catching as well as coloring easy to see and
      striking vs the background · ideally using real logos · and lots of moving
      parts but still focusing on the main focal part".

   What R1 got wrong, so it does not come back:
     · it built five WORLDS when the brief is five MECHANISMS. A rental counter,
       a jukebox and a toll plaza are places; the viewer has to read the place
       before the idea, and that is one beat too many at frame 0.
     · it was beige on beige. Cream props on a cream ground is the opposite of
       "striking vs the background", however correct the luma reading is.
     · the real logos were 104px chips inside the scenery instead of the subject.

   ROUND-3 PASS, from Alex on the R2 payoff frame: "try to incorporate claude
   sprites into this video and make sure stuff isnt overlapping and stuff in the
   video like in this photo here and try to have a video theme as well".
     · ⛔ R2 SHIPPED WITH NO MASCOT AT ALL. feedback_reel_house_chassis makes a
       costumed Claude mandatory; R1 had them and the R2 rewrite dropped every
       one. A chassis element is not optional because the new concept is tidier.
     · ⛔ The payoff card was 96..656 and the free tile inside it ran 452..683,
       so the hero artefact hung out of the bottom of its own card. Every shot is
       laid out against SAFE now and checked on the render.
     · the VIDEO theme is the `Film` furniture: sprocket rails, a perforated
       foot, and a live scrubber. It also helps the still-hero problem, because
       the playhead crosses the frame in every shot.

   R2 rule, unchanged: a FLAT SATURATED GROUND · ONE hero at 3-4x everything
   else · every supporting element is the SAME repeated object, so many moving
   parts still read as one idea · every mark on screen is real and sourced.

     id          mechanism            the hero            frame 0 is frozen on
     ----------  -------------------  ------------------  ---------------------
     vidPull     ABSORPTION           the priced tile     the giant Sora tile, $/MO
     vidWall     DESTRUCTION          the wall            the wall closing up
     vidCount    A NUMBER CLIMBING    the numeral         4, with the four marks
     vidLock     LOCKED -> OPEN       the padlock         the $ lock on the grid
     vidStamp    MASS STATE CHANGE    the stamp head      the belt of $/MO tags

   ⛔ THE CAMERA NEVER MOVES. Every change is a hard cut; the only camera event
      is a decaying impact tick on the cut.
   ✅ These previews carry the REAL cut VO and the REAL karaoke captions.

   ⛔ THE WORD ON A TILE IS THE WORD THAT REPEATS. Alex: "i dont lik ehow it says
      paid ... it should say free or something like that rather than 'paid'". The
      grid said PAID fourteen times, which makes the negative the loudest string
      in the frame. Cost is now carried by "$/MO", which is instant and needs no
      word, and FREE is the ONLY word a tile ever wears — it arrives at the turn.
   ========================================================================= */

/** to the MEASURED onset of "It has over 10,000 stars" — 5.84s after the VO was
    re-cut TWICE. ⛔⛔ THE FIRST RE-CUT SLICED WORD TAILS: it took its boundaries
    from whisper's word `end` times, and feedback_vo_cut_to_silence_not_whisper
    says in as many words that those run 150-200ms EARLY, so `end + 0.11` is still
    INSIDE the word. Alex: "the ends of the words at the ends of sentences
    sometimes are cut off, it sounds so bad". The rule had already shipped four
    times before being written down and I walked into it anyway.
    The correct pass measures a 20ms PEAK ENERGY ENVELOPE, treats runs under
    -26 dB lasting >=0.28s as removable (a breath sits near -30 dB and a -40 dB
    gate misses it), cuts only the MIDDLE of each run keeping 0.11s of air at both
    ends, and ASSERTS no cut window holds a frame above -22 dB. It recovered 6.80s,
    not the 7.60s the word-gap method claimed — that 0.80s overclaim WAS the
    clipped speech. 38.23s -> 31.45s, and captions went 45/49 anchored to 49/49. */
export const HOOK_LEN = 188;
/** phrase boundaries re-read out of the RE-CUT caption JSON: "Someone" -> f38 ·
    "including" -> f88 · "into" -> f146. f163 splits turn from payoff.
    ⛔ RE-DERIVED AGAIN after the VO was re-cut a SECOND time — see the note on
    HOOK_LEN. Never hand-shift these. */
export const CUTS = [38, 88, 146, 163];
const HEAD = { big: "STOP PAYING FOR AI VIDEO", hot: "400+ MODELS, FREE" };

/* ⛔ In the assembly, ROOT owns the VO and the one continuous karaoke track, so a
   solo preview has to mount them itself or the round is a mute wireframe. The
   words are the REAL cut, `words_video.json`, and the audio is the REAL cut VO —
   the comp is 205 frames so it simply stops at 6.83s. */
const SoloAV: React.FC = () => React.useContext(AssemblyCtx) ? null : (<>
  <Audio src={staticFile("video_vo.wav")} />
  <KaraokeCaption words={WORDS as any} />
</>);

const shot = (f: number) =>
  f < CUTS[0] ? 0 : f < CUTS[1] ? 1 : f < CUTS[2] ? 2 : f < CUTS[3] ? 3 : 4;
const local = (f: number) => f - [0, ...CUTS][shot(f)];

const Flash: React.FC<{ f: number }> = ({ f }) => (<>
  {CUTS.map((c) => {
    const k = f - c;
    if (k < 0 || k > 2) return null;
    return <div key={c} style={{ position: "absolute", inset: 0, background: "#FFFFFF",
      opacity: (1 - k / 2) * 0.26, zIndex: 96 }} />;
  })}
</>);

const Shake: React.FC<{ f: number; children: React.ReactNode }> = ({ f, children }) => {
  const k = local(f);
  const d = Math.max(0, 1 - k / 7) ** 2;
  return (
    <div style={{ position: "absolute", inset: 0,
      transform: `translate(${Math.sin(k * 2.1) * 5 * d}px, ${Math.cos(k * 2.6) * 3.5 * d}px)` }}>
      {children}
    </div>
  );
};

const Wrapped: React.FC<{ cues?: Cue[]; children: React.ReactNode }> = ({ cues, children }) => {
  const f = useCurrentFrame();
  const solo = !React.useContext(AssemblyCtx);
  return (
    <AbsoluteFill>
      {cues && <SfxTrack cues={cues} />}
      {solo && <><Bg /><ProgressBar />
        <HookHeader f={f + 14} big={HEAD.big} hot={HEAD.hot} /></>}
      <Panel glow={hexA(CLAY, 0.3)}>
        <Shake f={f}>{children}<Film f={f} /></Shake>
        <Flash f={f} />
      </Panel>
      <SoloAV />
    </AbsoluteFill>
  );
};
const wrap = (kids: React.ReactNode, cues?: Cue[]) => <Wrapped cues={cues}>{kids}</Wrapped>;

const A_ = "am/";
const cues = (open: string, c1: string, c2: string, c3: string, c4: string): Cue[] => [
  { at: 0, src: A_ + "hit-boom.wav", v: LEVELS.SFX_HERO, dur: 1.6, lead: 0 },
  { at: 0, src: A_ + open, v: LEVELS.SFX_HERO, dur: 1.4, lead: 0 },
  { at: 0.03, src: A_ + "punch.wav", v: LEVELS.SFX_MID, dur: 0.9, lead: 0 },
  { at: 0.06, src: A_ + "paper-slide.wav", v: LEVELS.SFX_TEXTURE, dur: 0.9, lead: 0 },
  ...layer(CUTS[0] / 30, { src: A_ + "whoosh-swoosh.wav", v: LEVELS.SFX_MID, dur: 1.0 },
                         { src: A_ + c1, v: LEVELS.SFX_MID, dur: 1.2 }),
  ...layer(CUTS[1] / 30, { src: A_ + "whoosh-choppy.wav", v: LEVELS.SFX_MID, dur: 0.9 },
                         { src: A_ + c2, v: LEVELS.SFX_MID, dur: 1.2 }),
  ...layer(CUTS[2] / 30, { src: A_ + "whoosh-fast.wav", v: LEVELS.SFX_MID, dur: 0.8 },
                         { src: A_ + c3, v: LEVELS.SFX_HERO, dur: 1.4 }),
  ...layer(CUTS[3] / 30, { src: A_ + "whoosh-flyby.wav", v: LEVELS.SFX_MID, dur: 0.9 },
                         { src: A_ + c4, v: LEVELS.SFX_HERO, dur: 1.4 }),
  { at: CUTS[3] / 30 + 0.20, src: A_ + "positive-chime.wav", v: LEVELS.SFX_MID, dur: 1.4, lead: 0 },
];

/* ---- the sprite. ⛔ NOT in every shot: reel 90's note is that walking Claudes
       through all thirteen scenes made the reel read as a screensaver. He is in
       the shot the story puts him in — reacting to the dread, and holding the
       payoff. B and C are pure information and stay clean. ------------------- */
export const Sprite: React.FC<{ f: number; x: number; y: number; s?: number; z?: number;
  mood?: "stern" | "shock" | "cheer"; clap?: number; ghost?: boolean }> =
  ({ f, x, y, s = 200, z = 78, mood = "stern", clap, ghost }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    filter: ghost ? "brightness(0.26) saturate(0.3) blur(5px)" : undefined }}>
    <Mascot lf={f} size={s} nodAmp={mood === "cheer" ? 4.2 : 2.4}
            nodSpeed={mood === "cheer" ? 12 : 9}
            stern={mood === "stern" ? 0.55 : 0} shock={mood === "shock" ? 0.7 : 0}
            cheer={mood === "cheer" ? 0.62 : 0} prof={1} />
    {clap !== undefined && (
      <div style={{ position: "absolute", left: s * 0.58, top: s * 0.42 }}>
        <Clapper s={s / 300} open={clap} />
      </div>
    )}
  </div>
);

/* ---- shared beats, so all five stay comparable ------------------------- */

/** shot C: the four the VO names, at hero scale, each with its credit line. The
    ONE place a product name sits next to somebody else's mark, and big enough to
    carry the "by X". Laid out inside SAFE: 179/596 x, 66/386 y. */
const NamedFour: React.FC<{ k: number }> = ({ k }) => (<>
  {NAMED.map((t, i) => {
    /* the last of the four lands at k=54 of a 55-frame shot, so the shot never
       has a static tail. At 22+i*6 it finished at k=40 and held for 15. */
    const p = E(k, i * 7, 16 + i * 7, 0, 1, BACK);
    return (
      <div key={t.name} style={{ position: "absolute", left: 179 + (i % 2) * 417,
        top: 66 + Math.floor(i / 2) * 320 + Math.sin(k * 0.5 + i * 1.6) * 6,
        zIndex: 60 + i, opacity: p,
        transform: `scale(${0.82 + p * 0.18 + Math.sin(k * 0.42 + i) * 0.012})` }}>
        <LogoTile t={t} s={1.58} named />
      </div>
    );
  })}
</>);

/** shot E: the payoff. ⛔ Every element is inside the card and inside SAFE now —
    the free tile used to run 27px past the bottom of the card it sits on. */
const Payoff: React.FC<{ f: number; k: number }> = ({ f, k }) => (<>
  <div style={{ position: "absolute", left: 60, top: 58, width: 892, height: 614,
    borderRadius: 34, background: "#EAF3EC", boxShadow: SH_D, zIndex: 60,
    border: "7px solid rgba(12,14,20,0.16)", transform: `scale(${E(k, 0, 12, 0.88, 1, BACK)})` }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: 104, display: "flex",
    justifyContent: "center", zIndex: 70, transform: `scale(${E(k, 2, 15, 0.7, 1, BACK)})` }}>
    <div style={{ padding: "16px 62px", borderRadius: 26, background: GO, boxShadow: SH_D,
      fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 164, lineHeight: 1,
      letterSpacing: "-0.045em", color: "#F6FBF7" }}>FREE</div>
  </div>
  <div style={{ position: "absolute", left: 0, right: 0, top: 336, textAlign: "center", zIndex: 70,
    fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 52, letterSpacing: "-0.02em",
    color: INK, opacity: E(k, 8, 20, 0, 1, OUT) }}>400+ MODELS, ONE APP</div>
  <div style={{ position: "absolute", left: 296, top: 418, zIndex: 72,
    opacity: E(k, 12, 24, 0, 1, OUT),
    transform: `scale(${E(k, 12, 26, 0.8, 1, BACK)})`, transformOrigin: "50% 100%" }}>
    <FreeTile s={1.1} />
  </div>
  <Sprite f={f} x={528} y={432} s={186} z={74} mood="cheer" clap={E(k, 16, 24, 0, 1, BACK)} />
</>);

/* ============================================================== CONCEPT A ==
   ABSORPTION · many become one.
   The simplest sentence in the set: all of these, in one free thing. Frame 0 is
   one paid tile at 3.2x everything else; the ring is copies of the SAME object,
   so the frame never stops being one idea.
   ========================================================================= */
export const HookPull: React.FC = () => {
  const f = useCurrentFrame(); const sh = shot(f); const k = local(f);
  const orbit = (i: number, n: number, r: number, kk: number, spin = 0.030) => {
    const a = (i / n) * Math.PI * 2 + kk * spin;
    /* y-radius trimmed and the centre dropped: the top of the ring used to sit at
       y 61 and the HookHeader covers panel-local 0..118, so it was half-hidden. */
    return { x: 506 + Math.cos(a) * r - 62, y: 382 + Math.sin(a) * r * 0.56 - 62 };
  };
  return wrap(<>
    <Stage c="#5E7FA8" c2="#43608A" floor="#334A6B" pool="#7A9AC0" horizon={648} />

    {/* A · ONE paid tile, its banner UNDER it, the ring turning behind it. */}
    {sh === 0 && (<>
      {TOOLS.slice(4, 14).map((t, i) => { const p = orbit(i, 10, 366, k);
        return (
          <div key={t.name} style={{ position: "absolute", left: p.x, top: p.y, zIndex: 30,
            opacity: 0.66 }}>
            <LogoTile t={t} s={0.84} />
          </div>
        ); })}
      {/* ⛔ NO BANNER. Alex: "i dont need you to have the text that says '$ every
          month' on the front cover part here thats unnecessary." The header and
          the VO both already say it, so the sentence was the third copy of one
          idea. Cost survives as the SAME $/MO chip the grid uses in shot B, so
          it is a signal rather than a caption. */}
      <div style={{ position: "absolute", left: 326, top: 138, zIndex: 62 }}>
        <LogoTile t={TOOLS[0]} s={2.4} named tag="cost" />
      </div>
      <Sprite f={f} x={58} y={462} s={200} z={80} mood="stern" />
    </>)}

    {/* B · hard cut: it is not one, it is all of them. Fourteen real marks. */}
    {sh === 1 && (<>
      {TOOLS.map((t, i) => {
        const p = E(k, i, 14 + i, 0, 1, BACK);
        return (
          <div key={t.name} style={{ position: "absolute", left: 46 + (i % 5) * 186,
            top: 60 + Math.floor(i / 5) * 190 + (1 - p) * 90, zIndex: 40 + i, opacity: p }}>
            <LogoTile t={t} s={1.08} tag="cost" />
          </div>
        ); })}
      <Band t="ALL OF THEM, EVERY MONTH" y={624} c={RED} s={1.02} />
    </>)}

    {/* C · the four the VO names */}
    {sh === 2 && <NamedFour k={k} />}

    {/* D · the turn — every mark is pulled into one tile at the centre */}
    {sh === 3 && (<>
      {TOOLS.map((t, i) => {
        const p = E(k, i % 5, 20 + (i % 5), 0, 1, IN_Q);
        const x0 = 46 + (i % 5) * 186, y0 = 60 + Math.floor(i / 5) * 190;
        return (
          <div key={t.name} style={{ position: "absolute",
            left: x0 + (425 - x0) * p, top: y0 + (286 - y0) * p, zIndex: 40 + i,
            opacity: 1 - E(k, 14, 26, 0, 1, OUT),
            transform: `scale(${1.08 * (1 - p * 0.72)})`, transformOrigin: "50% 50%" }}>
            <LogoTile t={t} s={1.08} tag="free" />
          </div>
        ); })}
      <div style={{ position: "absolute", left: 340, top: 132, zIndex: 80,
        opacity: E(k, 12, 22, 0, 1, OUT), transform: `scale(${E(k, 12, 26, 0.5, 1, BACK)})`,
        transformOrigin: "50% 50%" }}>
        <FreeTile s={1.84} />
      </div>
      <Sprite f={f} x={64} y={470} s={182} z={82} mood="cheer" />
    </>)}

    {/* E · the payoff */}
    {sh === 4 && <Payoff f={f} k={k} />}
  </>, cues("snap.wav", "paper-rustle.wav", "whoosh-flyby.wav", "riser-sharp.wav", "success-jingle.wav"));
};

/* ============================================================== CONCEPT B ==
   DESTRUCTION · the wall comes down.
   Frame 0 is a wall built out of real marks, one brick per tool you pay for,
   closing its last gap. Then it is blown apart.
   ========================================================================= */
export const HookWall: React.FC = () => {
  const f = useCurrentFrame(); const sh = shot(f); const k = local(f);
  const BRICK = TOOLS.slice(0, 12);
  /* ⛔ pitch must be >= the tile size (150*1.30 = 195), and the whole grid has to
     finish above SAFE.y1 = 684. 46+3*234+195 = 943 · 62+2*205+195 = 667. */
  const bx = (i: number) => 46 + (i % 4) * 234;
  const by = (i: number) => 62 + Math.floor(i / 4) * 205;
  return wrap(<>
    <Stage c="#4A5364" c2="#333B49" floor="#272D38" pool="#6C7889" horizon={676} />

    {/* A · the wall, closing. The last brick comes in from OFF THE RIGHT EDGE —
        flying it down from above parked it on top of the brick in the row over. */}
    {sh === 0 && (<>
      {BRICK.slice(0, 11).map((t, i) => (i === 5 && k >= 18 ? null :
        <div key={t.name} style={{ position: "absolute",
          left: bx(i) + (i === 7 ? (1 - E(k, 3, 16, 0, 1, BACK)) * 520 : 0)
                + Math.sin(k * 0.42 + i * 1.3) * 2.5,
          top: by(i) + Math.cos(k * 0.5 + i * 0.7) * 2, zIndex: 40 + i }}>
          <LogoTile t={t} s={1.30} />
        </div>
      ))}
      {/* ⛔ NO TEXT IN SHOT A AT ALL. Alex: "dont even say no paywall or whatever
          here thats unnecessary, just need a better pattern interrupt." The
          interrupt is now PHYSICAL and lands on f18 = 0.60s, which is the beat he
          asked for: one brick is blasted out of the wall toward camera, and a
          fissure forks across the gap it leaves. The header and the VO already
          carry the claim; the frame carries the event. */}
      {k >= 18 && (<>
        {/* the hole the brick came out of */}
        <div style={{ position: "absolute", left: bx(5), top: by(5), width: 195, height: 195,
          borderRadius: 39, background: "rgba(10,12,20,0.62)", zIndex: 38,
          boxShadow: "inset 0 10px 26px rgba(0,0,0,0.6)" }} />
        {/* the fissure, forking out of the hole across the wall */}
        {[[-1, -1], [1, -1], [-1, 1], [1, 1], [1, 0], [-1, 0]].map(([sx, sy], j) => (
          <div key={j} style={{ position: "absolute", left: bx(5) + 97, top: by(5) + 97,
            width: E(k, 18 + j, 30 + j, 0, 210 + j * 46, OUT), height: 7,
            background: "#0B0E16", zIndex: 60, transformOrigin: "0% 50%",
            transform: `rotate(${Math.atan2(sy, sx) * 57.3 + (j % 2 ? 9 : -9)}deg)` }} />
        ))}
        {/* the brick itself, thrown at the lens */}
        <div style={{ position: "absolute", left: bx(5) - E(k, 18, 40, 0, 150, OUT),
          top: by(5) - E(k, 18, 40, 0, 120, OUT), zIndex: 88,
          transform: `scale(${E(k, 18, 40, 1, 3.1, OUT)}) rotate(${E(k, 18, 40, 0, -26, OUT)}deg)`,
          opacity: 1 - E(k, 30, 41, 0, 1, OUT) }}>
          <LogoTile t={BRICK[5]} s={1.30} tag="cost" />
        </div>
        {/* shards */}
        {Array.from({ length: 9 }, (_, j) => {
          const a = (j / 9) * Math.PI * 2, p = E(k, 18, 34, 0, 1, OUT);
          return (
            <div key={j} style={{ position: "absolute",
              left: bx(5) + 90 + Math.cos(a) * 320 * p, top: by(5) + 90 + Math.sin(a) * 260 * p,
              width: 26, height: 26, borderRadius: 6, background: "#E7E2D6", zIndex: 84,
              opacity: 1 - p, transform: `rotate(${p * 300}deg)` }} />
          );
        })}
      </>)}
      <Sprite f={f} x={764} y={486} s={172} z={82} mood="shock" />
    </>)}

    {/* B · hard cut wider: every brick wears its tag */}
    {sh === 1 && (<>
      {TOOLS.map((t, i) => {
        const p = E(k, i * 2.0, 12 + i * 2.0, 0, 1, BACK);
        return (
          <div key={t.name} style={{ position: "absolute",
            left: 46 + (i % 5) * 186 + Math.sin(k * 0.42 + i * 1.3) * 2.5,
            top: 60 + Math.floor(i / 5) * 190 + Math.cos(k * 0.5 + i * 0.7) * 2,
            zIndex: 40 + i, opacity: p, transform: `scale(${0.8 + p * 0.2})` }}>
            <LogoTile t={t} s={1.08} tag="cost" />
          </div>
        ); })}
      <Band t="EVERY ONE, EVERY MONTH" y={624} c={RED} s={1.02} />
    </>)}

    {/* C · the four the VO names */}
    {sh === 2 && <NamedFour k={k} />}

    {/* D · the turn — the wall detonates outward */}
    {sh === 3 && (<>
      {BRICK.map((t, i) => {
        const ang = (i / BRICK.length) * Math.PI * 2 + 0.4;
        const p = E(k, (i % 4) * 2, 24 + (i % 4) * 2, 0, 1, IN_Q);
        return (
          <div key={t.name} style={{ position: "absolute",
            left: bx(i) + Math.cos(ang) * 760 * p, top: by(i) + Math.sin(ang) * 620 * p,
            zIndex: 40 + i, opacity: 1 - E(k, 16, 30, 0, 1, OUT),
            transform: `rotate(${p * (i % 2 ? 66 : -66)}deg)` }}>
            <LogoTile t={t} s={1.30} tag="free" />
          </div>
        ); })}
      <div style={{ position: "absolute", left: 340, top: 132, zIndex: 82,
        opacity: E(k, 10, 20, 0, 1, OUT), transform: `scale(${E(k, 10, 24, 0.5, 1, BACK)})`,
        transformOrigin: "50% 50%" }}>
        <FreeTile s={1.84} />
      </div>
      <Sprite f={f} x={64} y={470} s={182} z={84} mood="cheer" />
    </>)}

    {/* E · the payoff */}
    {sh === 4 && <Payoff f={f} k={k} />}
  </>, cues("hit-boom.wav", "paper-rustle.wav", "gear-mech.wav", "hit-up.wav", "crowd-wow.wav"));
};

/* ============================================================== CONCEPT C ==
   A NUMBER CLIMBING · 4 becomes 400+.
   The most hierarchical frame available: one numeral at 420px and nothing else
   anywhere near its size. Both ends are sourced — four is what the VO names,
   400+ is the README's own figure.
   ========================================================================= */
export const HookCount: React.FC = () => {
  const f = useCurrentFrame(); const sh = shot(f); const k = local(f);
  const Num: React.FC<{ t: string; s?: number; c?: string; top?: number }> =
    ({ t, s = 1, c = "#FFFDF8", top = 64 }) => (
    <div style={{ position: "absolute", left: 0, right: 0, top, textAlign: "center", zIndex: 70,
      fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 420 * s, lineHeight: 0.86,
      letterSpacing: "-0.06em", color: c, textShadow: "0 22px 44px rgba(12,14,20,0.5)" }}>{t}</div>
  );
  return wrap(<>
    <Stage c="#CE6E45" c2="#A94D2B" floor="#8A3C1D" pool="#E58A5F" horizon={664} />

    {/* A · ONE numeral, the four real marks under it at a third its height, and
        renewal tags raining behind. The numeral never moves; the rain does. */}
    {sh === 0 && (<>
      {Array.from({ length: 16 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: 58 + (i % 8) * 112,
          top: ((i * 97 + k * 13) % 740) - 60, width: 96, height: 42, borderRadius: 9,
          background: "#A8331F", zIndex: 34, display: "flex", alignItems: "center",
          justifyContent: "center", transform: `rotate(${(i % 3) * 7 - 7}deg)`,
          fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 22, letterSpacing: "0.06em",
          color: "#F3C7BC" }}>$/MO</div>
      ))}
      <Num t="4" s={0.94} top={64} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 404, textAlign: "center",
        zIndex: 74, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 52,
        letterSpacing: "0.04em", color: "#FFF3EF" }}>SUBSCRIPTIONS</div>
      {NAMED.map((t, i) => { const d = 2 + i * 7;
        return (
        <div key={t.name} style={{ position: "absolute", left: 246 + i * 186, top: 486, zIndex: 60 }}>
          <LogoTile t={t} s={0.82} />
          <div style={{ position: "absolute", left: -4, top: 82, padding: "6px 14px", borderRadius: 9,
            background: RED, boxShadow: SH, zIndex: 66, opacity: k >= d ? 1 : 0,
            transform: `rotate(-8deg) scale(${E(k, d, d + 6, 2.2, 1, BACK)})`,
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 24, letterSpacing: "0.06em",
            color: "#FFF3EF" }}>$/MO</div>
        </div>
        ); })}
      <Sprite f={f} x={46} y={482} s={168} z={80} mood="stern" />
    </>)}

    {/* B · hard cut: the count runs, marks multiplying under it */}
    {sh === 1 && (<>
      <Num t={String(Math.round(E(k, 0, 40, 4, 218, OUT)))} s={0.72} top={62} />
      {TOOLS.map((t, i) => {
        const p = E(k, i * 2, 12 + i * 2, 0, 1, BACK);
        return (
          <div key={t.name} style={{ position: "absolute", left: 50 + (i % 7) * 132,
            top: 386 + Math.floor(i / 7) * 138, zIndex: 50 + i, opacity: p,
            transform: `scale(${0.7 + p * 0.3})` }}>
            <LogoTile t={t} s={0.82} />
          </div>
        ); })}
      <Band t="AND CLIMBING" y={634} c={INK} s={0.92} />
    </>)}

    {/* C · the four the VO names */}
    {sh === 2 && <NamedFour k={k} />}

    {/* D · the turn — it slams to the real figure and goes green */}
    {sh === 3 && (<>
      <Num t={k < 8 ? String(Math.round(E(k, 0, 8, 218, 400, OUT))) : "400+"} s={0.84} top={72}
           c={k < 8 ? "#FFFDF8" : "#DFF3E6"} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 396, display: "flex",
        justifyContent: "center", zIndex: 74, opacity: E(k, 8, 16, 0, 1, OUT),
        transform: `scale(${E(k, 8, 20, 0.7, 1, BACK)})` }}>
        <div style={{ padding: "14px 42px", borderRadius: 20, background: GO, boxShadow: SH_D,
          fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 60, letterSpacing: "-0.02em",
          color: "#F6FBF7" }}>IN ONE FREE APP</div>
      </div>
      <div style={{ position: "absolute", left: 288, top: 486, zIndex: 74,
        opacity: E(k, 14, 24, 0, 1, OUT) }}>
        <FreeTile s={0.92} />
      </div>
      <Sprite f={f} x={540} y={492} s={168} z={76} mood="cheer" />
    </>)}

    {/* E · the payoff */}
    {sh === 4 && <Payoff f={f} k={k} />}
  </>, cues("counter-tick.wav", "wheel-spin.wav", "gear-mech.wav", "hit-up.wav", "success-jingle.wav"));
};

/* ============================================================== CONCEPT D ==
   LOCKED -> OPEN · the padlock pops. "Open sourced" made literal.
   ========================================================================= */
export const HookLock: React.FC = () => {
  const f = useCurrentFrame(); const sh = shot(f); const k = local(f);
  /* ⛔ the body was `linear-gradient(RED, rgba(12,14,20,0.42))`. A translucent
     stop makes the whole lock see-through, so it read as a ghost over the grid
     rather than the thing standing in front of it. Solid stops only. */
  const Lock: React.FC<{ x: number; y: number; s?: number; z?: number; open?: number;
    c?: string; label?: string }> = ({ x, y, s = 1, z = 70, open = 0, c = RED, label }) => (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
      <div style={{ position: "absolute", left: 42 * s, top: -84 * s - open * 90 * s,
        width: 116 * s, height: 132 * s, borderRadius: `${58 * s}px ${58 * s}px 0 0`,
        border: `${26 * s}px solid #AEB8C4`, borderBottom: "none",
        transform: `rotate(${open * 22}deg)`, transformOrigin: "10% 100%",
        boxShadow: "0 10px 0 rgba(12,14,20,0.3)" }} />
      <div style={{ position: "absolute", left: 0, top: 0, width: 200 * s, height: 164 * s,
        borderRadius: 26 * s, background: `linear-gradient(160deg, ${c}, #8A2A1C)`,
        boxShadow: SH_D, display: "flex", alignItems: "center", justifyContent: "center",
        border: `${5 * s}px solid rgba(255,255,255,0.28)` }}>
        {label
          ? <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 84 * s,
              letterSpacing: "-0.03em", color: "#FFF3EF" }}>{label}</span>
          : <div style={{ width: 40 * s, height: 40 * s, borderRadius: "50%", background: "#2A2018" }} />}
      </div>
    </div>
  );
  const gx = (i: number) => 46 + (i % 4) * 234;
  const gy = (i: number) => 62 + Math.floor(i / 4) * 205;
  return wrap(<>
    <Stage c="#9DAAB7" c2="#7E8B98" floor="#68737F" pool="#BAC4CF" horizon={676} />

    {/* A · the grid at full strength, ONE lock over it at 2.2x any tile. The bars
        run across the grid so the still hero is not the only thing on screen. */}
    {sh === 0 && (<>
      {TOOLS.slice(0, 11).map((t, i) => (
        <div key={t.name} style={{ position: "absolute", left: gx(i), top: gy(i), zIndex: 30 }}>
          <LogoTile t={t} s={1.30} />
        </div>
      ))}
      {Array.from({ length: 11 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: gx(i), top: gy(i) + 150,
          width: 195, padding: "6px 0", borderRadius: 8, background: RED, textAlign: "center",
          zIndex: 36, opacity: (k * 1.6 - i * 3) % 34 < 17 ? 1 : 0.18,
          fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 24, letterSpacing: "0.08em",
          color: "#FFF3EF" }}>$/MO</div>
      ))}
      <div style={{ position: "absolute", left: Math.sin(k * 1.3) * 9, top: Math.cos(k * 1.7) * 7,
        right: 0, bottom: 0 }}>
        <Lock x={286} y={294} s={2.2} z={70} open={0} label="$" />
      </div>
      <Sprite f={f} x={764} y={486} s={172} z={82} mood="shock" />
    </>)}

    {/* B · hard cut: every one of them has its own lock */}
    {sh === 1 && (<>
      {TOOLS.map((t, i) => {
        const p = E(k, (i % 5) * 2, 16 + (i % 5) * 2, 0, 1, BACK);
        return (
          <div key={t.name} style={{ position: "absolute", left: 46 + (i % 5) * 186,
            top: 60 + Math.floor(i / 5) * 190, zIndex: 40 + i, opacity: p,
            transform: `scale(${0.8 + p * 0.2})` }}>
            <LogoTile t={t} s={1.08} />
            <div style={{ position: "absolute", left: 108, top: 8 }}>
              <Lock x={0} y={0} s={0.32} z={60 + i} />
            </div>
          </div>
        ); })}
      <Band t="LOCKED, EVERY ONE" y={624} c={RED} s={1.02} />
    </>)}

    {/* C · the four the VO names */}
    {sh === 2 && <NamedFour k={k} />}

    {/* D · the turn — the shackle flies and every small lock goes with it */}
    {sh === 3 && (<>
      {TOOLS.slice(0, 12).map((t, i) => (
        <div key={t.name} style={{ position: "absolute", left: gx(i), top: gy(i), zIndex: 30 }}>
          <LogoTile t={t} s={1.30} />
        </div>
      ))}
      {Array.from({ length: 8 }, (_, i) => {
        const ang = (i / 8) * Math.PI * 2 + 0.3;
        const p = E(k, i % 4, 20 + (i % 4), 0, 1, IN_Q);
        return (
          <Lock key={i} x={452 + Math.cos(ang) * 780 * p} y={320 + Math.sin(ang) * 600 * p}
                s={0.56} z={60 + i} open={1} />
        ); })}
      <div style={{ position: "absolute", left: 286, top: 294 - E(k, 0, 18, 0, 1010, IN_Q),
        zIndex: 78, opacity: 1 - E(k, 12, 20, 0, 1, OUT) }}>
        <Lock x={0} y={0} s={2.2} z={78} open={E(k, 0, 10, 0, 1, BACK)} label="$" />
      </div>
      <div style={{ position: "absolute", left: 340, top: 132, zIndex: 84,
        opacity: E(k, 12, 22, 0, 1, OUT), transform: `scale(${E(k, 12, 26, 0.5, 1, BACK)})`,
        transformOrigin: "50% 50%" }}>
        <FreeTile s={1.84} />
      </div>
      <Sprite f={f} x={64} y={470} s={182} z={86} mood="cheer" />
    </>)}

    {/* E · the payoff */}
    {sh === 4 && <Payoff f={f} k={k} />}
  </>, cues("click-hard.wav", "gear-stutter.wav", "gear-mech.wav", "unlock.wav", "success-jingle.wav"));
};

/* ============================================================== CONCEPT E ==
   MASS STATE CHANGE · one stamp changes all of them.
   ⛔ The belt runs BEHIND the sprocket rails on purpose — that is what film
      passing a gate looks like, and it is the one thing allowed outside SAFE.
   ========================================================================= */
export const HookStamp: React.FC = () => {
  const f = useCurrentFrame(); const sh = shot(f); const k = local(f);
  const Press: React.FC<{ drop: number; label: string; c: string }> = ({ drop, label, c }) => (<>
    <div style={{ position: "absolute", left: 452, top: -60 + drop, width: 108, height: 268,
      background: "linear-gradient(160deg,#C8D0D8,#8D97A2)", boxShadow: SH_D, zIndex: 80 }} />
    <div style={{ position: "absolute", left: 246, top: 208 + drop, width: 520, height: 150,
      borderRadius: 22, background: c, boxShadow: SH_D, zIndex: 82, display: "flex",
      alignItems: "center", justifyContent: "center", border: "8px solid rgba(255,255,255,0.5)",
      fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 106, letterSpacing: "-0.03em",
      color: "#FFF6F2" }}>{label}</div>
  </>);
  const Rig: React.FC<{ y: number }> = ({ y }) => (<>
    <div style={{ position: "absolute", left: 0, right: 0, top: y, height: 28,
      background: "#4B4438", zIndex: 44 }} />
    {[110, 336, 562, 788].map((x) => (
      <div key={x} style={{ position: "absolute", left: x - 22, top: y + 28, width: 44, height: 44,
        borderRadius: "50%", background: "#3A342A", zIndex: 42 }} />
    ))}
  </>);
  const belt = (kk: number, speed: number, y: number, s: number, paid: boolean, z = 50) =>
    Array.from({ length: 8 }, (_, i) => {
      const span = 8 * 196;
      const x = (((i * 196 - kk * speed) % span) + span) % span - 196;
      return (
        <div key={`${y}-${i}`} style={{ position: "absolute", left: x, top: y, zIndex: z }}>
          <LogoTile t={TOOLS[(i + (y % 3)) % TOOLS.length]} s={s} tag={paid ? "cost" : "free"} />
        </div>
      );
    });
  return wrap(<>
    <Stage c="#C9A874" c2="#A9854F" floor="#7E6134" pool="#DEC094" horizon={690} />

    {/* A · the belt running, every tag $/MO, the press resting on the line */}
    {sh === 0 && (<>
      <Rig y={540} />
      {belt(k, 5.2, 360, 1.2, true, 50)}
      <Press drop={0} label="$ / MO" c={RED} />
      <Sprite f={f} x={34} y={528} s={158} z={84} mood="stern" />
    </>)}

    {/* B · hard cut: two lines of it, running opposite ways */}
    {sh === 1 && (<>
      <Rig y={310} /><Rig y={612} />
      {belt(k, 6.4, 142, 1.0, true, 50)}
      {belt(-k, 6.4, 444, 1.0, true, 52)}
    </>)}

    {/* C · the four the VO names */}
    {sh === 2 && <NamedFour k={k} />}

    {/* D · the turn — the press lands and the whole line flips */}
    {sh === 3 && (<>
      <Rig y={540} />
      {belt(k, 5.2, 360, 1.2, k < 11, 50)}
      <Press drop={E(k, 0, 9, -320, 0, IN_Q) + E(k, 25, 33, 0, -260, OUT)}
             label={k < 11 ? "$ / MO" : "FREE"} c={k < 11 ? RED : GO} />
      <Sprite f={f} x={34} y={528} s={158} z={84} mood={k < 11 ? "stern" : "cheer"} />
    </>)}

    {/* E · the payoff */}
    {sh === 4 && <Payoff f={f} k={k} />}
  </>, cues("gear-mech.wav", "loading-loop.wav", "gear-stutter.wav", "hit-boom.wav", "success-jingle.wav"));
};

/* ============================================== CONCEPT F · THE BLOCK PULL ==
   ⛔ THE WALL HOOK IS DEAD. Alex: "the hook scene here is still boring, like it's
      just a big wall of stuff, it's not interesting, doesn't grab attention."
      He is right and the repo had already written why, twice:

        REEL-BUILD-LEARNINGS §2 — "the fix for 'not hierarchical' is not a chart.
        It is a RITUAL ... A CHART HAS NO MOMENT. Nothing in a bar chart is about
        to happen, so there is nothing to stay for."
        Reel 84 — "Every rejected concept across reels 83 and 84 was a UI or a
        SYSTEM (cards, WALLS, GRIDS, toll booths, vaults, factories). What works
        is A GENRE WORLD WITH A MOMENT OF TENSION."

      A 4x3 grid of logo tiles is a grid. It scored well on hierarchy and on the
      motion audit and it still had nothing about to happen, which is reel 86's
      set-2 failure committed again in a new costume. Dressing it, cracking it and
      blowing a brick out of it were all treatments of the wrong frame.

   The doc's prescription is a RITUAL WHOSE PURPOSE IS TO DECIDE SOMETHING,
   FROZEN ONE BEAT BEFORE THE RESULT IS KNOWN. Filling its three columns:

     RITUAL              the block pull — a tower you take pieces out of
     HIERARCHY MECHANISM STABILITY. A tower ranks its own pieces by which one is
                         load-bearing; that needs no chart and no label.
     FRAME 0 IS FROZEN   both hands on the brick at the base, the tower already
                         leaning, one beat before it goes.

   Reel 86's rituals are off-limits (high striker, title fight, auction,
   demolition, pawn shop) and so is reel 84's draft night.
   ========================================================================= */
export const HookTower: React.FC = () => {
  const f = useCurrentFrame(); const sh = shot(f); const k = local(f);
  const BR = TOOLS.slice(0, 12);
  /* four courses of three. The tower is NARROW on purpose — a wall fills the
     frame and reads as a layout; a tower leaves sky around it and reads as a
     thing that can fall. */
  const cx = (c: number) => 320 + c * 132, cy = (r: number) => 492 - r * 126;
  const lean = E(k, 0, 17, 1.4, 3.2, OUT) + (k >= 18 ? E(k, 18, 38, 0, 26, IN_Q) : 0);
  const drop = k >= 18 ? E(k, 18, 38, 0, 300, IN_Q) : 0;
  return wrap(<>
    <Surface w={WORLDS.paywall} t={f} />

    {/* A · the held breath. Ground level, the tower towering, both hands on the
        brick that is holding it up — then at f18 = 0.60s he pulls. */}
    {sh === 0 && (<>
      <Plinth x={252} y={584} w={480} h={30} />
      {/* ⛔ A `transform` CREATES A STACKING CONTEXT, so everything inside this
          wrapper paints at the WRAPPER's z-index, not its own. Without the
          explicit zIndex the whole tower rendered at z-auto and the Surface's
          ridge bands (z 8-12) and ground (z 14) painted straight over it — only
          the two courses above the hill line survived. Same family as the jukebox
          z-auto bug, arriving through a different door. */}
      <div style={{ position: "absolute", left: 0, top: 0, right: 0, bottom: 0, zIndex: 44,
        transformOrigin: "506px 596px", transform: `rotate(${lean}deg)` }}>
        {BR.map((t, i) => {
          const c = i % 3, r = Math.floor(i / 3);
          if (i === 0 && k >= 18) return null;
          return (
            <div key={t.name} style={{ position: "absolute",
              left: cx(c) - (i === 0 ? E(k, 0, 17, 26, 64, OUT) : 0),
              top: cy(r) + drop * (r + 1) * 0.34,
              zIndex: 40 + i, transform: `rotate(${(i % 3 - 1) * 0.7}deg)` }}>
              <LogoTile t={t} s={0.88} tag={r === 0 ? "cost" : undefined} />
            </div>
          );
        })}
      </div>
      {/* the pulled brick, in his hands and coming free */}
      {k >= 18 && (
        <div style={{ position: "absolute", left: 262 - E(k, 18, 40, 0, 216, OUT),
          top: 492 + E(k, 18, 40, 0, 84, IN_Q), zIndex: 86,
          transform: `rotate(${E(k, 18, 40, -3, -42, OUT)}deg) scale(${E(k, 18, 40, 1, 1.5, OUT)})`,
          opacity: 1 - E(k, 32, 41, 0, 1, OUT) }}>
          <LogoTile t={BR[0]} s={0.88} tag="cost" />
        </div>
      )}
      {/* dust kicked off the plinth as the courses shift */}
      {k >= 18 && Array.from({ length: 10 }, (_, j) => {
        const p = E(k, 18 + (j % 4), 36 + (j % 4), 0, 1, OUT);
        return <div key={j} style={{ position: "absolute", left: 300 + j * 44 - p * 60,
          top: 584 - p * 46, width: 26 + (j % 3) * 12, height: 12, borderRadius: 6,
          background: "rgba(232,238,236,0.68)", zIndex: 60, opacity: 1 - p }} />;
      })}
      <Sprite f={f} x={182} y={496} s={152} z={84}
              mood={k >= 18 ? "shock" : "stern"} />
      <Occluder side="r" c="#42525F" w={112} />
    </>)}

    {/* B · hard cut: it comes down. Twelve large bright bricks tumbling is the
        highest-scoring motion shape measured anywhere in this repo. */}
    {sh === 1 && (<>
      {TOOLS.map((t, i) => {
        const a = (i / TOOLS.length) * Math.PI * 2 + 0.5;
        const p = E(k, (i % 5) * 2, 30 + (i % 5) * 2, 0, 1, IN_Q);
        return (
          <div key={t.name} style={{ position: "absolute",
            left: 430 + Math.cos(a) * 620 * p, top: 250 + Math.sin(a) * 430 * p + p * p * 210,
            zIndex: 40 + i, transform: `rotate(${p * (i % 2 ? 128 : -128)}deg)` }}>
            <LogoTile t={t} s={0.94} tag="cost" />
          </div>
        );
      })}
      <Sprite f={f} x={150} y={484} s={148} z={84} mood="cheer" />
      <Band t="ALL OF THEM, EVERY MONTH" y={626} c={RED} s={1.0} />
      <Occluder side="l" c="#42525F" w={110} />
    </>)}

    {/* C · the four the VO names */}
    {sh === 2 && <NamedFour k={k} />}

    {/* D · the turn — one tile stands where the tower was */}
    {sh === 3 && (<>
      <Plinth x={252} y={584} w={480} h={30} />
      {Array.from({ length: 9 }, (_, j) => (
        <div key={j} style={{ position: "absolute", left: 262 + j * 52,
          top: 556 - (j % 3) * 14, width: 44, height: 26, borderRadius: 6,
          background: "#6E7C86", zIndex: 38, transform: `rotate(${(j % 5) * 14 - 28}deg)` }} />
      ))}
      <div style={{ position: "absolute", left: 340, top: 150, zIndex: 80,
        transform: `scale(${E(k, 0, 14, 0.4, 1, BACK)})`, transformOrigin: "50% 100%" }}>
        <FreeTile s={1.84} />
      </div>
      <Sprite f={f} x={150} y={484} s={152} z={84} mood="cheer" />
      <Occluder side="r" c="#42525F" w={112} />
    </>)}

    {/* E · the payoff */}
    {sh === 4 && (<>
      <div style={{ position: "absolute", left: 60, top: 58, width: 892, height: 600,
        borderRadius: 34, background: "#EAF3EC", boxShadow: SH_D, zIndex: 60,
        border: "7px solid rgba(12,14,20,0.16)",
        transform: `scale(${E(k, 0, 12, 0.88, 1, BACK)})` }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 116, display: "flex",
        justifyContent: "center", zIndex: 70,
        transform: `scale(${E(k, 2, 15, 0.7, 1, BACK)})` }}>
        <div style={{ padding: "16px 62px", borderRadius: 26, background: GO, boxShadow: SH_D,
          fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 164, lineHeight: 1,
          letterSpacing: "-0.045em", color: "#F6FBF7" }}>FREE</div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 352, textAlign: "center",
        zIndex: 70, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 52,
        letterSpacing: "-0.02em", color: INK,
        opacity: E(k, 8, 20, 0, 1, OUT) }}>400+ MODELS, ONE APP</div>
      <div style={{ position: "absolute", left: 300, top: 428, zIndex: 72,
        opacity: E(k, 12, 24, 0, 1, OUT),
        transform: `scale(${E(k, 12, 26, 0.8, 1, BACK)})`, transformOrigin: "50% 100%" }}>
        <FreeTile s={1.1} />
      </div>
      <Sprite f={f} x={532} y={440} s={186} z={74} mood="cheer"
              clap={E(k, 16, 24, 0, 1, BACK)} />
    </>)}
  </>, cues("gear-stutter.wav", "hit-boom.wav", "paper-rustle.wav", "hit-up.wav", "success-jingle.wav"));
};
