import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { inter } from "./fonts";
import { Bg, Panel, ProgressBar, Caption, AssemblyCtx, hexA, HookHeader, Mascot } from "./SlopKit";
import {
  Room, Yard, Back, Band, Free, Boxart, Sticker, Plate, Coin, Wheel, BrandMark,
  BRANDS, PAPER, INK, CLAY, RED, GO, GOLD, BRASS, STEEL, STEEL_D, CHROME, SH, SH_D, SH_IN,
} from "./VidWorld";
import { E, OUT, BACK, IN_Q } from "./MissionWorld";
import { Cue, SfxTrack, LEVELS, layer } from "./SoundKit";

/* =========================================================================
   REEL 93 "VIDEO" · ROUND 1 OPENS — FIVE RITUALS, ONE MECHANISM EACH.

   Full reasoning + the per-concept mapping tables: docs/93-video-hooks.md.

     id          ritual           mechanism             frame 0 is frozen on
     ----------  ---------------  --------------------  ------------------------
     vidRental   a video store    RENT vs OWN           the sticker landing
     vidJukebox  a jukebox        ONE COIN = ONE PLAY   the last coin at the slot
     vidPump     a forecourt      A METER DRAINING      the wheels tumbling to 0
     vidToll     a toll plaza     BARRIER, down vs up   the gate across the lane
     vidScale    a weigh-stall    MASS                  the coin pan on the deck

   ⛔ THE CAMERA NEVER MOVES. Every change is a hard cut to a new framing; the
      only camera event is a decaying 5px impact tick on the cut.
   ⛔ ONE dominant object per shot. The world stays behind it, held DOWN — rich
      background, one idea in front of it (feedback_hook_simplicity).
   ⛔ NO PRICE ANYWHERE. The VO names none, and an invented figure is the one
      number a viewer can check in ten seconds (reel 90's $29).
   ⛔ A solo hook comp has PLACEHOLDER captions and NO audio by construction.
   ========================================================================= */

/** to the MEASURED onset of "It has over 10,000 stars" at 6.82s (words_video.json
    index 23). Not estimated. */
export const HOOK_LEN = 205;
/** every cut is a phrase boundary read out of the caption JSON:
    "Someone" 1.42 -> f43 · "including" 3.02 -> f90 · "into" 4.84 -> f145.
    f178 splits the turn from the payoff so no shot runs past 2s.
    1.43 · 1.57 · 1.83 · 1.10 · 0.90s — nothing under the 0.7s floor. */
export const CUTS = [43, 90, 145, 178];
const HEAD = { big: "STOP PAYING FOR AI VIDEO", hot: "400+ MODELS, FREE" };

const SoloCap: React.FC<{ words: string[]; hot?: number }> = (p) =>
  React.useContext(AssemblyCtx) ? null : <Caption {...p} />;

const shot = (f: number) =>
  f < CUTS[0] ? 0 : f < CUTS[1] ? 1 : f < CUTS[2] ? 2 : f < CUTS[3] ? 3 : 4;
const local = (f: number) => f - [0, ...CUTS][shot(f)];

/** 2-frame white pop on every cut: sells the cut without moving the camera. */
const Flash: React.FC<{ f: number }> = ({ f }) => (<>
  {CUTS.map((c) => {
    const k = f - c;
    if (k < 0 || k > 2) return null;
    return <div key={c} style={{ position: "absolute", inset: 0, background: "#FFFFFF",
      opacity: (1 - k / 2) * 0.26, zIndex: 96 }} />;
  })}
</>);

/** a decaying impact tick on frame 0 and every cut. 5px over 7 frames — past
    about 6px it stops reading as impact and starts reading as a wobbly camera
    (reel 91: "too much screen shaking"). */
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
        <Shake f={f}>{children}</Shake>
        <Flash f={f} />
      </Panel>
      {solo && <SoloCap words={["Stop paying for", "AI video tools"]} hot={1} />}
    </AbsoluteFill>
  );
};
const wrap = (kids: React.ReactNode, cues?: Cue[]) => <Wrapped cues={cues}>{kids}</Wrapped>;

/* ---- sound. Frame 0 carries the heaviest stack; every cut gets a transient.
       ⛔ `at` is ROOT seconds and `dur` must be >= the file's true length. ---- */
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

/* ---- the four names, laid out identically wherever they appear so the shot-C
       beat is comparable across all five concepts. ------------------------- */
const NameRow: React.FC<{ k: number; y: number; render: (b: typeof BRANDS[0], i: number, t: number) => React.ReactNode }> =
  ({ k, y, render }) => (<>
    {BRANDS.map((b, i) => (
      <React.Fragment key={b.name}>{render(b, i, E(k, 2 + i * 6, 20 + i * 6, 0, 1, BACK))}</React.Fragment>
    ))}
  </>);

/* ============================================================== CONCEPT A ==
   THE VIDEO STORE · mechanism RENT vs OWN.
   A rental sticker is the whole idea in one object: it says this is not yours
   and it is due back. Frame 0 is the beat the sticker lands, so the dread needs
   no setup at all. The turn tears it off and the licence is underneath.
   ========================================================================= */
export const HookRental: React.FC = () => {
  const f = useCurrentFrame(); const sh = shot(f); const k = local(f);
  return wrap(<>
    <Room wall="#F2E9D7" wall2="#E3D6BE" floor="#C6B79B" floor2="#AD9C7E"
          horizon={556} band="#FDF8EC" />
    {/* the shop, held down behind the hero: shelf runs receding to both sides */}
    <Back o={0.5}>
      {[0, 1, 2].map((r) => (
        <div key={r} style={{ position: "absolute", left: 0, right: 0, top: 150 + r * 128,
          height: 104, background: "#D8C9AC", boxShadow: "0 8px 0 rgba(26,24,19,0.16)" }}>
          {Array.from({ length: 14 }, (_, i) => (
            <div key={i} style={{ position: "absolute", left: 8 + i * 72, top: 8, width: 58,
              height: 88, borderRadius: 5, background: i % 3 ? "#EDE4D2" : "#DCCFB6",
              border: "2px solid rgba(26,24,19,0.18)" }} />
          ))}
        </div>
      ))}
    </Back>

    {/* A · the sticker is ALREADY ON — recognition needs no setup, so frame 0 is
        the landed sticker, legible. The ARC is that it keeps happening: three
        more renewals stamp on across the shot. */}
    {sh === 0 && (<>
      <Boxart x={330} y={148} s={1.36} z={40} b={BRANDS[0]} rot={-2} />
      {/* ⛔ the hero sticker sits LOW on the box. Centred it covered the mark and
          the name, so frame 0 said "a rental" but not "a rental of what". */}
      {[{ x: 290, y: 452, s: 1.18, r: -8, d: -6 }, { x: 386, y: 196, s: 0.66, r: 8, d: 2 },
        { x: 238, y: 596, s: 0.66, r: -6, d: 10 }, { x: 596, y: 384, s: 0.66, r: 11, d: 18 },
        { x: 122, y: 300, s: 0.66, r: -12, d: 27 },
      ].map((p, i) => (
        <div key={i} style={{ position: "absolute", left: 0, top: 0, zIndex: 62 + i,
          opacity: k >= p.d ? 1 : 0,
          transform: `scale(${E(k, p.d, p.d + 7, 2.6, 1, OUT)})`,
          transformOrigin: `${p.x + 150}px ${p.y + 50}px` }}>
          <Sticker x={p.x} y={p.y} s={p.s} z={62 + i} rot={p.r}
                   sub={i ? "AND AGAIN" : "DUE BACK EVERY MONTH"} />
        </div>
      ))}
      <div style={{ position: "absolute", left: 22, top: 396, zIndex: 30 }}>
        <Mascot lf={f} size={238} stern={0.5} nodAmp={2.4} nodSpeed={9} suit={1} />
      </div>
    </>)}

    {/* B · hard cut wide: the whole wall is stickered. The stack travels, which
        is the only kind of motion that registers (LARGE x BRIGHT x FAST). */}
    {sh === 1 && (<>
      {Array.from({ length: 18 }, (_, i) => {
        const c = i % 6, r = Math.floor(i / 6);
        return (
          <div key={i} style={{ position: "absolute", left: 22 + c * 166,
            top: 108 + r * 232 - E(k, 0, 26, 40, 0, OUT), width: 150, height: 208, borderRadius: 10,
            background: ["#E9E0CD", "#E2D8C3", "#EFE7D6"][i % 3], boxShadow: SH, zIndex: 40,
            border: "3px solid rgba(26,24,19,0.16)", opacity: E(k, i, 12 + i, 0, 1, OUT) }}>
            <div style={{ position: "absolute", left: 12, top: 58, right: 12, padding: "7px 0",
              borderRadius: 6, background: RED, textAlign: "center", boxShadow: SH,
              fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 25, color: "#FFF6F2",
              transform: `rotate(${-7 + (i % 4) * 3.5}deg)` }}>RENTAL</div>
          </div>
        );
      })}
      <Band t="EVERY ONE, EVERY MONTH" y={660} c={RED} />
    </>)}

    {/* C · the four the VO names, each still stickered */}
    {sh === 2 && (<>
      <NameRow k={k} y={0} render={(b, i, t) => (
        <div style={{ position: "absolute", left: 18 + i * 248, top: 168,
          transform: `translateY(${(1 - t) * 54}px) scale(${0.9 + t * 0.1})`, opacity: t }}>
          <Boxart x={0} y={0} s={0.96} z={40 + i} b={b} rot={i % 2 ? 2 : -2} />
          <div style={{ position: "absolute", left: 18, top: 132, padding: "8px 16px",
            borderRadius: 7, background: RED, boxShadow: SH, transform: "rotate(-7deg)",
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 28, color: "#FFF6F2",
            zIndex: 60 }}>RENTAL</div>
        </div>
      )} />
      <Band t="FOUR TAPES, FOUR BILLS" y={636} c={RED} />
    </>)}

    {/* D · the turn — the sticker is torn off and thrown out of frame */}
    {sh === 3 && (<>
      <Boxart x={330} y={120} s={1.42} z={40} b={BRANDS[0]}
              face={E(k, 6, 20, 0, 1, OUT) > 0.5 ? "#DCEDE2" : undefined} />
      <div style={{ position: "absolute", left: 310 + E(k, 0, 26, 0, 690, IN_Q),
        top: 300 - E(k, 0, 26, 0, 210, OUT), zIndex: 78,
        transform: `rotate(${E(k, 0, 26, -8, 128, OUT)}deg)`, opacity: 1 - E(k, 14, 28, 0, 1, OUT) }}>
        <Sticker x={0} y={0} s={1.34} z={78} rot={0} />
      </div>
      <div style={{ position: "absolute", left: 26, top: 372, zIndex: 30 }}>
        <Mascot lf={f} size={244} cheer={0.6} nodAmp={4} nodSpeed={12} suit={1} />
      </div>
      <Band t="OPEN SOURCED" y={660} c={GO} />
    </>)}

    {/* E · what was under it */}
    {sh === 4 && (<>
      <div style={{ position: "absolute", left: 96, top: 96, width: 820, height: 512,
        borderRadius: 26, background: "#E7F0E9", boxShadow: SH_D, zIndex: 44,
        border: "6px solid rgba(26,24,19,0.14)",
        transform: `scale(${E(k, 0, 12, 0.9, 1, BACK)})` }} />
      <Free y={196} s={1.24} sub="MIT LICENCE. KEEP IT." />
    </>)}
  </>, cues("snap.wav", "paper-rustle.wav", "page-turn.wav", "highlighter.wav", "cash-register.wav"));
};

/* ============================================================== CONCEPT B ==
   THE JUKEBOX · mechanism ONE COIN = ONE PLAY.
   A jukebox is a catalogue you can see and cannot reach without paying, one
   item at a time — which is exactly what a credit-metered model library is.
   Frame 0 is the last coin held at the slot.
   ========================================================================= */
export const HookJukebox: React.FC = () => {
  const f = useCurrentFrame(); const sh = shot(f); const k = local(f);
  /* ⛔ the strips MUST carry an explicit zIndex. Without one they are z-auto and
     the jukebox glass (z 36) paints straight over them — the first render came
     back with an empty black window and no catalogue at all. */
  const Strip: React.FC<{ x: number; y: number; w?: number; t: string; sub?: string; s?: number; z?: number }> =
    ({ x, y, w = 300, t, sub, s = 1, z = 46 }) => (
    <div style={{ position: "absolute", left: x, top: y, width: w, padding: `${9 * s}px ${14 * s}px`,
      borderRadius: 6, background: "#FBF6E9", boxShadow: "0 3px 0 rgba(26,24,19,0.18)", zIndex: z,
      borderLeft: `${7 * s}px solid ${CLAY}` }}>
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 28 * s,
        letterSpacing: "-0.02em", color: INK, whiteSpace: "nowrap", overflow: "hidden" }}>{t}</div>
      {sub && <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 15 * s,
        letterSpacing: "0.10em", color: "rgba(26,24,19,0.5)" }}>{sub}</div>}
    </div>
  );
  return wrap(<>
    <Room wall="#DEEAE2" wall2="#C7D8CD" floor="#B6A98F" floor2="#9C8E74" horizon={606}
          band="#F2F8F4" />
    <Back o={0.44}>
      {Array.from({ length: 40 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: (i % 10) * 104, top: 606 + Math.floor(i / 10) * 52,
          width: 100, height: 48, background: (i + Math.floor(i / 10)) % 2 ? "#C9BCA1" : "#A79A80" }} />
      ))}
    </Back>

    {/* A · the catalogue behind glass and the last coin at the slot. */}
    {sh === 0 && (<>
      <div style={{ position: "absolute", left: 214, top: 128, width: 584, height: 546,
        borderRadius: "170px 170px 30px 30px", background: `linear-gradient(168deg, ${CHROME}, #A9B4BE)`,
        boxShadow: SH_D, zIndex: 34, border: "8px solid #EDF2F6" }} />
      {/* a clay arch across the crown so the hero object is not a grey slab */}
      <div style={{ position: "absolute", left: 246, top: 158, width: 520, height: 110,
        borderRadius: "150px 150px 0 0", background: `linear-gradient(168deg, ${CLAY}, #A9532F)`,
        zIndex: 35 }} />
      {/* the catalogue RUNS behind the glass. A single travelling coin is ~9k px
          of a 190k panel and shot A measured 1.0; four strips cycling is ~87k of
          cream on black, which is the contrast x area the audit actually sees. */}
      <div style={{ position: "absolute", left: 268, top: 280, width: 476, height: 230,
        borderRadius: 18, background: "#2A2622", boxShadow: "inset 0 8px 20px rgba(0,0,0,0.6)",
        zIndex: 36, overflow: "hidden" }}>
        {["SORA", "KLING", "FLUX", "MIDJOURNEY", "VEO", "SEEDANCE", "WAN", "HUNYUAN"].map((t, i) => (
          <Strip key={t} x={20} y={((i * 56 - k * 2.6) % 448 + 448) % 448 - 56} w={436}
                 t={t} s={0.9} z={46} />
        ))}
      </div>
      {/* the slot + the last coin, held in the clear gap above it */}
      <div style={{ position: "absolute", left: 470, top: 608, width: 108, height: 26,
        borderRadius: 6, background: "#221F1A", boxShadow: "inset 0 4px 10px rgba(0,0,0,0.7)", zIndex: 44 }} />
      <div style={{ position: "absolute", left: 274, top: 600, padding: "8px 20px", borderRadius: 10,
        background: GOLD, boxShadow: SH, zIndex: 44, fontFamily: inter.fontFamily,
        fontWeight: 900, fontSize: 30, color: "#4A3608" }}>1 PLAY</div>
      {/* ⛔ the coin used to travel 72px and shot A measured 1.0 per-second motion,
          the weakest opening in the set. One large bright object crossing most of
          the panel is the cheapest fix the audit actually sees. */}
      <Coin x={478} y={152 + E(k, 0, 38, 0, 440, IN_Q)} s={1.7} z={62}
            rot={E(k, 0, 38, -30, 300, OUT)} />
      <div style={{ position: "absolute", left: 14, top: 436, zIndex: 30 }}>
        <Mascot lf={f} size={200} stern={0.45} nodAmp={2.6} nodSpeed={9} glasses={1} />
      </div>
    </>)}

    {/* B · hard cut wide: the coin drops and the counter goes to nothing */}
    {sh === 1 && (<>
      <div style={{ position: "absolute", left: 292, top: 60, width: 428, height: 640,
        borderRadius: "150px 150px 26px 26px", background: `linear-gradient(168deg, ${CHROME}, #9EAAB5)`,
        boxShadow: SH_D, zIndex: 34, border: "8px solid #EDF2F6" }} />
      <Coin x={478} y={E(k, 0, 15, 150, 466, IN_Q)} s={1.2} z={70} rot={E(k, 0, 15, 0, 220)} />
      <div style={{ position: "absolute", left: 322, top: 300, width: 368, padding: "22px 0",
        borderRadius: 16, background: "#221F1A", textAlign: "center", zIndex: 60,
        boxShadow: "inset 0 8px 18px rgba(0,0,0,0.6)" }}>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 26,
          letterSpacing: "0.20em", color: "#8E877A" }}>PLAYS LEFT</div>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 150, lineHeight: 1,
          color: k > 16 ? RED : "#F5EFE0", transform: `scale(${E(k, 15, 23, 1.3, 1, BACK)})` }}>
          {k > 16 ? "0" : "1"}
        </div>
      </div>
      <Band t="ONE COIN BUYS ONE" y={686} c={RED} />
    </>)}

    {/* C · the four names, each behind its own coin */}
    {sh === 2 && (<>
      <NameRow k={k} y={0} render={(b, i, t) => (
        <div style={{ position: "absolute", left: 42, top: 118 + i * 142, width: 928, height: 118,
          borderRadius: 16, background: "#FBF6E9", boxShadow: SH, zIndex: 40 + i,
          display: "flex", alignItems: "center", gap: 24, padding: "0 28px",
          borderLeft: `10px solid ${b.c}`, opacity: t,
          transform: `translateX(${(1 - t) * -70}px)` }}>
          <BrandMark b={b} s={0.86} />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 46,
              letterSpacing: "-0.02em", color: INK }}>{b.name}</div>
            <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 18,
              letterSpacing: "0.10em", color: "rgba(26,24,19,0.52)" }}>{b.by}</div>
          </div>
          {/* ⛔ Coin is position:absolute, so a flex slot does NOT place it —
              inside a flex row every coin collapses onto the row's top-left
              corner. Give it real coordinates in the row's own space. */}
          <Coin x={846} y={31} s={0.94} z={2} />
        </div>
      )} />
    </>)}

    {/* D · the turn — the coin mech is off and the rack runs */}
    {sh === 3 && (<>
      <div style={{ position: "absolute", left: 292, top: 60, width: 428, height: 640,
        borderRadius: "150px 150px 26px 26px", background: `linear-gradient(168deg, ${CHROME}, #9EAAB5)`,
        boxShadow: SH_D, zIndex: 34, border: "8px solid #EDF2F6" }} />
      <div style={{ position: "absolute", left: 322, top: 292, width: 368, padding: "26px 0",
        borderRadius: 16, background: GO, textAlign: "center", zIndex: 62, boxShadow: SH_D,
        transform: `scale(${E(k, 0, 12, 0.7, 1, BACK)})`,
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 74, color: "#F6FBF7" }}>FREE PLAY</div>
      {/* the coin mech thrown clear */}
      <Coin x={478 + E(k, 0, 24, 0, 520, IN_Q)} y={470 - E(k, 0, 24, 0, 260, OUT)} s={1.2} z={72}
            rot={E(k, 0, 24, 0, 300)} o={1 - E(k, 12, 26, 0, 1, OUT)} />
      <Band t="OPEN SOURCED" y={694} c={GO} />
    </>)}

    {/* E · the whole rack running free behind the payoff.
        ⛔ The first pass ran two columns on a 900px modulo inside a 792px panel,
           so strips bunched and overlapped and the sub-line was unreadable
           through them. Regular pitch per column, and FREE gets a solid card. */}
    {sh === 4 && (<>
      {[0, 1].map((col) => Array.from({ length: 13 }, (_, i) => (
        <Strip key={`${col}-${i}`} x={col ? 528 : 42}
               y={((i * 66 - k * 22 + col * 33) % 858 + 858) % 858 - 66} w={442}
               t={["SORA", "KLING", "FLUX", "MIDJOURNEY", "VEO", "SEEDANCE", "WAN", "HUNYUAN"][(i + col * 3) % 8]}
               s={0.92} z={40} />
      )))}
      <div style={{ position: "absolute", left: 96, top: 190, width: 820, height: 330,
        borderRadius: 26, background: "#E7F0E9", boxShadow: SH_D, zIndex: 62,
        border: "6px solid rgba(26,24,19,0.14)",
        transform: `scale(${E(k, 0, 12, 0.9, 1, BACK)})` }} />
      <Free y={244} s={1.2} sub="400+ MODELS, ONE APP" z={90} />
    </>)}
  </>, cues("coin-drop.wav", "coin-spin.wav", "gear-mech.wav", "unlock.wav", "success-jingle.wav"));
};

/* ============================================================== CONCEPT C ==
   THE FORECOURT · mechanism A METER DRAINING.
   The dread this audience actually has is not a monthly line item, it is the
   credit counter falling while a render runs. A pump is that, physical.
   ⛔ The wheels count CREDITS, not currency — a state, not a price claim.
   ========================================================================= */
export const HookPump: React.FC = () => {
  const f = useCurrentFrame(); const sh = shot(f); const k = local(f);
  /* the odometer falls the whole way through shot A: state A on the first frame,
     state B on the last, changing every frame — an arc, not an entrance. */
  const drain = (kk: number, from: number, dur: number) =>
    Math.max(0, Math.round(from * (1 - Math.min(1, kk / dur))));
  const digits = (n: number) => String(n).padStart(3, "0").split("");
  return wrap(<>
    <Yard sky="#DCE9F2" sky2="#C2D6E4" ground="#B4B2AC" ground2="#94938E" horizon={512}
          far="#8FA6B4" />
    {/* the canopy overhead + a second pump island, held down */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 104,
      background: "linear-gradient(180deg,#FBF8F1,#DCD7CB)", boxShadow: "0 10px 0 rgba(26,24,19,0.18)",
      zIndex: 20 }} />
    <Back o={0.5}>
      <div style={{ position: "absolute", left: 700, top: 300, width: 190, height: 250,
        borderRadius: 14, background: "#D4CFC2", boxShadow: SH }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 596, height: 12, background: "#E8E3D6" }} />
    </Back>

    {/* A · the pump face, and the number falling. */}
    {sh === 0 && (<>
      <div style={{ position: "absolute", left: 254, top: 128, width: 504, height: 560,
        borderRadius: 24, background: "linear-gradient(166deg,#FBF6E8,#DED6C3)", boxShadow: SH_D,
        zIndex: 36, border: "8px solid #C9BFA8" }} />
      <div style={{ position: "absolute", left: 296, top: 172, width: 420, padding: "10px 0",
        textAlign: "center", borderRadius: 10, background: "#2E2A24", zIndex: 40,
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 28, letterSpacing: "0.22em",
        color: "#CFC6B2" }}>CREDITS</div>
      {/* ⛔ TWO bugs in one line here. `roll` was `(k*0.34)%1`, which (a) pushed the
          glyph clean out of its own window whenever roll neared 1, and (b) advanced
          1.02 per audit sample at 10fps, so it ALIASED to a standstill and the shot
          measured 2.1 -> 1.2. A small bounded jitter reads as a mechanical wheel and
          keeps the digit on screen; the motion comes from the glyphs themselves,
          which is why they are now 1.9x rather than 1.32x. */}
      {digits(drain(k, 240, 38)).map((d, i) => (
        <Wheel key={i} x={300 + i * 152} y={236} d={d} s={1.9} z={44}
               roll={0.05 * Math.sin(k * 0.9 + i * 1.7)} />
      ))}
      {/* the lamp that is the actual dread — already lit on frame 0, blinking */}
      <div style={{ position: "absolute", left: 356, top: 486, display: "flex", alignItems: "center",
        gap: 16, zIndex: 44, padding: "12px 26px", borderRadius: 12,
        background: RED, boxShadow: SH }}>
        <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#FFE6E0",
          opacity: 0.35 + 0.65 * Math.abs(Math.sin(k / 4)) }} />
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 34,
          letterSpacing: "0.10em", color: "#FFF6F2" }}>LOW</span>
      </div>
      {/* ⛔ NO brand plate here. The wheels are a generic meter; bolting a named
          product to a specific figure would assert a credit allowance nobody
          sourced. The four names arrive in shots B and C instead. */}
      <div style={{ position: "absolute", left: 330, top: 574, padding: "12px 30px", borderRadius: 12,
        background: "#2E2A24", boxShadow: SH, zIndex: 46, fontFamily: inter.fontFamily,
        fontWeight: 900, fontSize: 32, letterSpacing: "0.10em", color: "#EFE7D2" }}>PAY PER RENDER</div>
      <div style={{ position: "absolute", left: 24, top: 414, zIndex: 30 }}>
        <Mascot lf={f} size={228} stern={0.5} nodAmp={2.4} nodSpeed={9} constr={1} />
      </div>
    </>)}

    {/* B · hard cut wide: four pumps, all of them draining */}
    {sh === 1 && (<>
      {BRANDS.map((b, i) => (
        <div key={b.name} style={{ position: "absolute", left: 22 + i * 248, top: 132, width: 224,
          height: 452, borderRadius: 18, background: "linear-gradient(166deg,#FBF6E8,#DED6C3)",
          boxShadow: SH_D, zIndex: 40, border: "6px solid #C9BFA8",
          transform: `translateY(${(1 - E(k, i * 4, 18 + i * 4, 0, 1, BACK)) * 60}px)` }}>
          {/* a draining BAR, not digits — a per-brand figure would be a credit
              allowance claim, and none of the four publishes one we sourced. */}
          <div style={{ position: "absolute", left: 20, top: 26, right: 20, height: 84,
            borderRadius: 10, background: "#2E2A24", overflow: "hidden" }}>
            <div style={{ position: "absolute", left: 0, bottom: 0, right: 0,
              height: `${100 - 100 * Math.min(1, (k + i * 3) / 30)}%`,
              background: `linear-gradient(180deg, ${GOLD}, #B07E22)` }} />
          </div>
          <div style={{ position: "absolute", left: 20, right: 20, top: 128, padding: "8px 0",
            borderRadius: 8, background: RED, textAlign: "center", fontFamily: inter.fontFamily,
            fontWeight: 900, fontSize: 24, color: "#FFF6F2" }}>LOW</div>
          <div style={{ position: "absolute", left: 0, right: 0, top: 200, display: "flex",
            justifyContent: "center" }}><BrandMark b={b} s={0.9} /></div>
          <div style={{ position: "absolute", left: 0, right: 0, top: 320, textAlign: "center",
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 30, color: INK }}>{b.name}</div>
        </div>
      ))}
      <Band t="EVERY TOOL, ITS OWN METER" y={636} c={RED} />
    </>)}

    {/* C · the four names on their plates, close */}
    {sh === 2 && (<>
      <NameRow k={k} y={0} render={(b, i, t) => (
        <div style={{ position: "absolute", left: 60 + (i % 2) * 470, top: 156 + Math.floor(i / 2) * 268,
          width: 424, height: 224, borderRadius: 20, background: "#FBF6E8", boxShadow: SH_D,
          zIndex: 40 + i, border: `7px solid ${b.c}`, opacity: t,
          transform: `scale(${0.86 + t * 0.14})`,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          gap: 12 }}>
          <BrandMark b={b} s={1.02} />
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 40,
            letterSpacing: "-0.02em", color: INK }}>{b.name}</div>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 18,
            letterSpacing: "0.10em", color: "rgba(26,24,19,0.52)" }}>{b.by}</div>
        </div>
      )} />
    </>)}

    {/* D · the turn — the supply is swapped and the meter stops metering */}
    {sh === 3 && (<>
      <div style={{ position: "absolute", left: 254, top: 128, width: 504, height: 560,
        borderRadius: 24, background: "linear-gradient(166deg,#FBF6E8,#DED6C3)", boxShadow: SH_D,
        zIndex: 36, border: "8px solid #C9BFA8" }} />
      <div style={{ position: "absolute", left: 296, top: 172, width: 420, padding: "10px 0",
        textAlign: "center", borderRadius: 10, background: GO, zIndex: 40,
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 28, letterSpacing: "0.22em",
        color: "#F6FBF7" }}>OPEN SOURCE</div>
      <div style={{ position: "absolute", left: 296, top: 240, width: 420, height: 190,
        borderRadius: 14, background: "#2E2A24", zIndex: 42, display: "flex",
        alignItems: "center", justifyContent: "center", fontFamily: inter.fontFamily,
        fontWeight: 900, fontSize: E(k, 2, 18, 60, 176, BACK), color: "#F5EFE0" }}>&#8734;</div>
      <div style={{ position: "absolute", left: 296, top: 452, width: 420, padding: "12px 0",
        borderRadius: 12, background: GO, textAlign: "center", boxShadow: SH, zIndex: 44,
        opacity: E(k, 8, 20, 0, 1, OUT), fontFamily: inter.fontFamily, fontWeight: 900,
        fontSize: 34, letterSpacing: "0.08em", color: "#F6FBF7" }}>NO METER</div>
      <div style={{ position: "absolute", left: 24, top: 414, zIndex: 30 }}>
        <Mascot lf={f} size={228} cheer={0.6} nodAmp={4} nodSpeed={12} constr={1} />
      </div>
    </>)}

    {/* E · the payoff */}
    {sh === 4 && (<>
      <div style={{ position: "absolute", left: 84, top: 104, width: 844, height: 500,
        borderRadius: 26, background: "#E7F0E9", boxShadow: SH_D, zIndex: 44,
        border: "6px solid rgba(26,24,19,0.14)",
        transform: `scale(${E(k, 0, 12, 0.9, 1, BACK)})` }} />
      <Free y={200} s={1.24} sub="400+ MODELS, ONE APP" />
    </>)}
  </>, cues("counter-tick.wav", "digital-countdown.wav", "gear-stutter.wav", "unlock.wav", "success-jingle.wav"));
};

/* ============================================================== CONCEPT D ==
   THE TOLL PLAZA · mechanism BARRIER.
   A barrier needs no label to establish a hierarchy: one side pays, the other
   side is stopped. Frame 0 is the arm already down in front of you, which is
   the most literal picture of a paywall there is.
   ========================================================================= */
export const HookToll: React.FC = () => {
  const f = useCurrentFrame(); const sh = shot(f); const k = local(f);
  const Arm: React.FC<{ x: number; y: number; w: number; deg: number; z?: number; s?: number }> =
    ({ x, y, w, deg, z = 50, s = 1 }) => (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: 30 * s, zIndex: z,
      transformOrigin: "0% 50%", transform: `rotate(${deg}deg)`, borderRadius: 8 * s,
      background: `repeating-linear-gradient(90deg, ${RED} 0 ${58 * s}px, #FBF6E8 ${58 * s}px ${116 * s}px)`,
      boxShadow: SH_D, border: `${3 * s}px solid rgba(26,24,19,0.22)` }} />
  );
  return wrap(<>
    <Yard sky="#D6E6F0" sky2="#BCD3E2" ground="#A9A7A2" ground2="#8A8984" horizon={430}
          far="#8DA3B1" />
    {/* the plaza, held down: booths and a gantry receding */}
    <Back o={0.5}>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ position: "absolute", left: 60 + i * 330, top: 300, width: 150,
          height: 150, borderRadius: 10, background: "#DAD5C8", boxShadow: SH }} />
      ))}
      <div style={{ position: "absolute", left: 0, right: 0, top: 240, height: 22, background: "#B7B2A5" }} />
    </Back>
    {/* the road, always: lane markings running to the horizon */}
    {Array.from({ length: 6 }, (_, i) => (
      <div key={i} style={{ position: "absolute", left: 486 - i * 4, top: 442 + i * 60,
        width: 40 + i * 12, height: 22 + i * 5, borderRadius: 4, background: "#EDE8DA",
        opacity: 0.8, zIndex: 22 }} />
    ))}

    {/* A · the arm, down, right in front of you. The ARC is the queue stacking
        up behind — three large objects travelling most of the panel height,
        which is the only kind of motion that registers. */}
    {sh === 0 && (<>
      <div style={{ position: "absolute", left: 40, top: 250, width: 92, height: 300,
        borderRadius: 12, background: "linear-gradient(166deg,#FBF6E8,#D5CDB9)", boxShadow: SH_D,
        zIndex: 44, border: "5px solid #B9AF97" }} />
      {/* the arm has just slammed and is still settling. ⛔ It may NOT start raised
          — a gate up on frame 0 says "open", the opposite of the recognition. */}
      <Arm x={128} y={356} w={860} deg={E(k, 0, 15, -9, 0, BACK)} z={54} s={1.3} />
      <div style={{ position: "absolute", left: 336, top: 226, padding: "16px 34px", borderRadius: 14,
        background: "#FBF6E8", boxShadow: SH_D, zIndex: 58, border: `6px solid ${RED}`,
        transform: `scale(${E(k, 1, 12, 0.84, 1, BACK)})`, textAlign: "center" }}>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 54, lineHeight: 1,
          letterSpacing: "-0.02em", color: RED }}>PAY PER TOOL</div>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 20,
          letterSpacing: "0.14em", color: "rgba(26,24,19,0.56)", marginTop: 6 }}>EVERY MONTH</div>
      </div>
      {/* the queue: rear-view cars sliding up from the bottom edge, nearest last */}
      {/* ⛔ the nearest car is ALREADY stopped at the arm on frame 0 — with every
          car on a positive delay the open began on an empty road, which is the
          opposite of the thing the viewer is meant to recognise. */}
      {/* ⛔ bright paints, not road-coloured ones. The first pass ran grey and tan
          cars over a grey road, so 88k px of travel registered as 1.8. */}
      {[{ w: 250, y: 452, c: "#F0E7D3", d: 3 }, { w: 300, y: 530, c: "#4E7FB5", d: -1 },
        { w: 360, y: 620, c: CLAY, d: -18 }].map((c, i) => (
        <div key={i} style={{ position: "absolute", left: 506 - c.w / 2,
          top: c.y + (1 - E(k, c.d, c.d + 18, 0, 1, OUT)) * 330, width: c.w, height: c.w * 0.4,
          borderRadius: `${c.w * 0.12}px ${c.w * 0.12}px ${c.w * 0.05}px ${c.w * 0.05}px`,
          background: `linear-gradient(166deg, ${c.c}, rgba(26,24,19,0.5))`, boxShadow: SH_D,
          zIndex: 60 + i }}>
          <div style={{ position: "absolute", left: "12%", top: "14%", width: "76%", height: "40%",
            borderRadius: 12, background: "#CFE0EC" }} />
          {[0.06, 0.78].map((lx) => (
            <div key={lx} style={{ position: "absolute", left: `${lx * 100}%`, top: "66%",
              width: "16%", height: "20%", borderRadius: 6, background: "#D9483A" }} />
          ))}
        </div>
      ))}
      <div style={{ position: "absolute", left: 428, top: 372, zIndex: 70 }}>
        <Mascot lf={f} size={188} stern={0.5} nodAmp={2.2} nodSpeed={9} cop={1} />
      </div>
    </>)}

    {/* B · hard cut wide: four lanes, four arms, all down */}
    {sh === 1 && (<>
      {BRANDS.map((b, i) => (
        <React.Fragment key={b.name}>
          <div style={{ position: "absolute", left: 12 + i * 250, top: 250, width: 62, height: 210,
            borderRadius: 10, background: "linear-gradient(166deg,#FBF6E8,#D5CDB9)", boxShadow: SH,
            zIndex: 44, border: "4px solid #B9AF97" }} />
          <Arm x={70 + i * 250} y={342 + E(k, i * 4, 16 + i * 4, -28, 0, BACK)} w={186} deg={0} z={48} s={0.86} />
          <div style={{ position: "absolute", left: 14 + i * 250, top: 486, zIndex: 52 }}>
            <Plate x={0} y={0} s={0.78} b={b} z={52} />
          </div>
        </React.Fragment>
      ))}
      <Band t="FOUR LANES, FOUR BILLS" y={648} c={RED} />
    </>)}

    {/* C · the four names on the gantry, close */}
    {sh === 2 && (<>
      <div style={{ position: "absolute", left: 30, top: 120, width: 952, height: 470,
        borderRadius: 18, background: "#2F3A34", boxShadow: SH_D, zIndex: 40,
        border: "8px solid #1F2721" }} />
      <NameRow k={k} y={0} render={(b, i, t) => (
        <div style={{ position: "absolute", left: 62, top: 152 + i * 108, width: 888, height: 92,
          borderRadius: 12, background: "#F7F2E4", boxShadow: SH, zIndex: 44 + i,
          display: "flex", alignItems: "center", gap: 22, padding: "0 26px", opacity: t,
          borderLeft: `10px solid ${b.c}`, transform: `translateX(${(1 - t) * 60}px)` }}>
          <BrandMark b={b} s={0.66} />
          <div style={{ flex: 1, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 42,
            letterSpacing: "-0.02em", color: INK }}>{b.name}</div>
          <div style={{ padding: "8px 20px", borderRadius: 8, background: RED,
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 26, color: "#FFF6F2" }}>CLOSED</div>
        </div>
      )} />
    </>)}

    {/* D · the turn — every arm goes vertical on the same frame. The biggest
        travel in the set, which is what actually moves the motion metric. */}
    {sh === 3 && (<>
      {BRANDS.map((b, i) => (
        <React.Fragment key={b.name}>
          <div style={{ position: "absolute", left: 12 + i * 250, top: 250, width: 62, height: 210,
            borderRadius: 10, background: "linear-gradient(166deg,#FBF6E8,#D5CDB9)", boxShadow: SH,
            zIndex: 44, border: "4px solid #B9AF97" }} />
          <Arm x={70 + i * 250} y={342} w={186} deg={-E(k, 1 + i * 2, 17 + i * 2, 0, 88, BACK)}
               z={48} s={0.86} />
        </React.Fragment>
      ))}
      <Band t="OPEN SOURCED" y={560} c={GO} />
      <div style={{ position: "absolute", left: 402, top: 618, zIndex: 60 }}>
        <Mascot lf={f} size={196} cheer={0.66} nodAmp={4.4} nodSpeed={12} cop={1} />
      </div>
    </>)}

    {/* E · the open road under a FREE gantry */}
    {sh === 4 && (<>
      <div style={{ position: "absolute", left: 30, top: 92, width: 952, height: 128,
        borderRadius: 16, background: "#2F3A34", boxShadow: SH_D, zIndex: 40,
        border: "8px solid #1F2721", display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 62, letterSpacing: "0.06em",
        color: "#EFE7D2" }}>ALL LANES OPEN</div>
      <Free y={286} s={1.24} sub="400+ MODELS, ONE APP" />
    </>)}
  </>, cues("hit-up.wav", "gear-mech.wav", "click-hard.wav", "lights-on.wav", "crowd-wow.wav"));
};

/* ============================================================== CONCEPT E ==
   THE WEIGH-STALL · mechanism MASS.
   A balance is a hierarchy you cannot argue with: the heavier side is down and
   that is the whole reading. Frame 0 is one box on the light pan and the coin
   pan already on the deck — what one model costs, with no figure written.
   ========================================================================= */
export const HookScale: React.FC = () => {
  const f = useCurrentFrame(); const sh = shot(f); const k = local(f);
  /* ⛔ the first pass hung the pans at FIXED y while the beam rotated, so the
     rods floated and the box speared through its own pan. Pan positions are
     derived from the beam angle now, and the frame is IRON on cream (brass on
     cream was beige-on-beige and the whole rig vanished). */
  /* ⛔ the rod has to be LONGER than whatever stands on the pan, or the load
     rises past the beam tip and covers the arm it is supposed to be hanging
     from — which is exactly what the 92px rod did. */
  const RIG = { px: 506, py: 300, hl: 318, rod: 226, pw: 268 };
  const IRON = "#3E362E";
  const ends = (deg: number) => {
    const t = (deg * Math.PI) / 180, c = Math.cos(t), s = Math.sin(t);
    return { L: { x: RIG.px - RIG.hl * c, y: RIG.py - RIG.hl * s },
             R: { x: RIG.px + RIG.hl * c, y: RIG.py + RIG.hl * s } };
  };
  const panTop = (e: { y: number }) => e.y + RIG.rod;
  const Pan: React.FC<{ e: { x: number; y: number }; z?: number }> = ({ e, z = 46 }) => (<>
    <div style={{ position: "absolute", left: e.x - 3, top: e.y, width: 6, height: RIG.rod,
      background: IRON, zIndex: z - 1 }} />
    <div style={{ position: "absolute", left: e.x - RIG.pw / 2, top: e.y + RIG.rod, width: RIG.pw,
      height: 22, borderRadius: 11, background: `linear-gradient(166deg, #EBD79B, ${BRASS})`,
      boxShadow: SH_D, zIndex: z }} />
  </>);
  const Beam: React.FC<{ deg: number }> = ({ deg }) => (<>
    <div style={{ position: "absolute", left: RIG.px - 22, top: RIG.py, width: 44, height: 340,
      background: `linear-gradient(166deg, #574C41, ${IRON})`, boxShadow: SH, zIndex: 40 }} />
    <div style={{ position: "absolute", left: RIG.px - 120, top: 636, width: 240, height: 26,
      borderRadius: 8, background: IRON, boxShadow: SH_D, zIndex: 41 }} />
    <div style={{ position: "absolute", left: RIG.px - RIG.hl, top: RIG.py - 11, width: RIG.hl * 2,
      height: 22, borderRadius: 11, background: `linear-gradient(166deg, #574C41, ${IRON})`,
      boxShadow: SH_D, zIndex: 44, transformOrigin: "50% 50%", transform: `rotate(${deg}deg)` }} />
  </>);
  return wrap(<>
    <Room wall="#F0E7D3" wall2="#DFD2B7" floor="#BCA986" floor2="#A08D6C" horizon={588}
          band="#FCF7E9" />
    {/* the stall, held down: an awning above, crates behind */}
    <Back o={0.5}>
      <div style={{ position: "absolute", left: -20, right: -20, top: 0, height: 84,
        background: `repeating-linear-gradient(90deg, ${CLAY} 0 76px, #F2E6CE 76px 152px)`,
        boxShadow: "0 10px 0 rgba(26,24,19,0.2)" }} />
      {[0, 1, 2, 3].map((i) => (
        <div key={i} style={{ position: "absolute", left: 30 + i * 250, top: 592, width: 200,
          height: 132, borderRadius: 8, background: "#C4B18C", boxShadow: SH }} />
      ))}
    </Back>

    {/* A · one box up, the coins on the deck. Frame 0 is already tipped — the
        ARC is that it keeps tipping as more coins land on the paying side. */}
    {sh === 0 && (() => {
      const deg = E(k, 0, 34, 3, 20, OUT), e = ends(deg);
      return (<>
        <Beam deg={deg} />
        <Pan e={e.L} z={46} /><Pan e={e.R} z={46} />
        {/* light pan: one box, standing ON the pan */}
        <div style={{ position: "absolute", left: e.L.x - 59, top: panTop(e.L) - 170, zIndex: 50 }}>
          <Boxart x={0} y={0} s={0.5} z={50} b={BRANDS[0]} rot={-3} />
        </div>
        {/* heavy pan: the coins. ⛔ The first pass gave EVERY coin a positive
            delay, so frame 0 was an empty pan tipped for no visible reason. The
            first row is already paid; the rest land through the shot. */}
        {Array.from({ length: 15 }, (_, i) => { const d = i * 2 - 16;
          return (
          <Coin key={i} x={e.R.x - 122 + (i % 5) * 50}
                y={panTop(e.R) - 34 - Math.floor(i / 5) * 28 - E(k, d, d + 14, 260, 0, OUT)}
                s={0.9} z={50 + i} rot={i * 27} o={E(k, d, d + 4, 0, 1, OUT)} />
          ); })}
        {/* ⛔ clear of the light pan's swing. At size 224 from y 452 his hat sat
            inside the pan and read as a head growing out of the scale. */}
        <div style={{ position: "absolute", left: 40, top: 522, zIndex: 30 }}>
          <Mascot lf={f} size={190} stern={0.5} nodAmp={2.4} nodSpeed={9} chef={1} />
        </div>
      </>);
    })()}

    {/* B · hard cut: the coin heap grows, one pile per month */}
    {sh === 1 && (<>
      <div style={{ position: "absolute", left: 0, right: 0, top: 528, height: 14,
        background: "#8E7C5C", zIndex: 34 }} />
      {Array.from({ length: 30 }, (_, i) => (
        <Coin key={i} x={70 + (i % 10) * 92} y={402 + Math.floor(i / 10) * 46 - E(k, i, 16 + i, 90, 0, OUT)}
              s={1.06} z={40 + i} rot={i * 31} o={E(k, i, 8 + i, 0, 1, OUT)} />
      ))}
      <div style={{ position: "absolute", left: 348, top: 156, zIndex: 60 }}>
        <Boxart x={0} y={0} s={0.68} z={60} b={BRANDS[0]} rot={2} />
      </div>
      <Band t="THAT, FOR ONE MODEL" y={664} c={RED} />
    </>)}

    {/* C · the four, weighed one at a time */}
    {sh === 2 && (<>
      <NameRow k={k} y={0} render={(b, i, t) => (
        <div style={{ position: "absolute", left: 24 + i * 246, top: 150, width: 220, height: 452,
          borderRadius: 18, background: "#FBF6E9", boxShadow: SH_D, zIndex: 40 + i,
          border: `6px solid ${b.c}`, opacity: t, transform: `translateY(${(1 - t) * 58}px)`,
          display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 26, gap: 14 }}>
          <BrandMark b={b} s={0.98} />
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 28,
            letterSpacing: "-0.02em", color: INK, textAlign: "center", padding: "0 8px" }}>{b.name}</div>
          {/* ⛔ same trap as the jukebox row: an absolutely positioned Coin ignores
              flex-wrap and stacks every one of the six at 0,0. Explicit grid. */}
          {Array.from({ length: 6 }, (_, j) => (
            <Coin key={j} x={26 + (j % 3) * 62} y={318 + Math.floor(j / 3) * 58} s={0.66}
                  z={2} rot={j * 40} />
          ))}
        </div>
      )} />
      <Band t="AND YOU PAY EACH ONE" y={628} c={RED} />
    </>)}

    {/* D · the turn — 400 land on the light pan and it slams, coins thrown clear */}
    {sh === 3 && (() => {
      const deg = E(k, 0, 18, 16, -14, BACK), e = ends(deg);
      return (<>
        <Beam deg={deg} />
        <Pan e={e.L} z={46} /><Pan e={e.R} z={46} />
        {/* the 400, dropping onto the light pan. Fewer and bigger — 24 chips at
            26x44 read as gravel rather than a load of models. */}
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} style={{ position: "absolute", left: e.L.x - 122 + (i % 4) * 64,
            top: panTop(e.L) - 84 - Math.floor(i / 4) * 88
                 - E(k, (i % 4) * 3, 15 + (i % 4) * 3, 330, 0, OUT),
            width: 54, height: 84, borderRadius: 7, background: ["#E9E0CD", "#DCEDE2", "#EFE7D6"][i % 3],
            border: "3px solid rgba(26,24,19,0.22)", boxShadow: SH, zIndex: 52 }} />
        ))}
        {/* the coins thrown off the heavy pan */}
        {Array.from({ length: 14 }, (_, i) => (
          <Coin key={i} x={e.R.x - 122 + (i % 5) * 50 + E(k, 3, 26, 0, 250 + i * 20, IN_Q)}
                y={panTop(e.R) - 34 - Math.floor(i / 5) * 28 - E(k, 3, 26, 0, 330 - i * 10, OUT)}
                s={0.9} z={60 + i} rot={i * 33 + k * 9} o={1 - E(k, 14, 28, 0, 1, OUT)} />
        ))}
        <Band t="OPEN SOURCED" y={700} c={GO} />
      </>);
    })()}

    {/* E · the payoff */}
    {sh === 4 && (<>
      <div style={{ position: "absolute", left: 84, top: 104, width: 844, height: 500,
        borderRadius: 26, background: "#E7F0E9", boxShadow: SH_D, zIndex: 44,
        border: "6px solid rgba(26,24,19,0.14)",
        transform: `scale(${E(k, 0, 12, 0.9, 1, BACK)})` }} />
      <Free y={200} s={1.24} sub="400+ MODELS, ONE APP" />
    </>)}
  </>, cues("hit-boom.wav", "coin-drop.wav", "coin-spin.wav", "ring-low.wav", "crowd-wow.wav"));
};
