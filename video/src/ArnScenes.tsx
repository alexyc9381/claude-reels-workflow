import React from "react";
import { useCurrentFrame, staticFile, Sequence, OffthreadVideo } from "remotion";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D, mono, ui,
  Scene, Cam, Ring, Puff, Motes, Contact, Crew, Hero, costumeFor, squash, rock,
  asPlace, R,
  Arena, Boss, Rail, TokenSlot, Volley, Stands, Pad, Board, Dummy, HP, BossBar, Hit,
  AppWin, SitePage, Brief,
  NEON, PERFECT, BOSSC, TOKEN,
  CLAY, CLAYD, GOLD, GREEN, RED, PAPER, CREAMB, INK, MUTE, TEAL, STEEL,
  BRASS, SODIUM, VIOLET, EMBER, OXIDE, SLATE, COPPER,
} from "./ArnWorld";
import { HookB, HookF, HookG } from "./ArnHooks";

/* ===========================================================================
   REEL 128 · "BOSS" — THE SCENES, v2: THE BOSS ROOM.

   ⛔⛔⛔ v1 (THE OVERLOOK) WAS REJECTED ON THE METAPHOR WITH EVERY GATE GREEN —
   motion median 10.44, 0/15 under bar, 0/15 dying into a cut, look audit green.
   *"I don't like the machinery concepts... a lot of these animation concepts
   just need to be completely redone because it's way too boring."* The cause is
   in `ArnWorld.tsx`: the hero artifact was a machine I invented, and an invented
   object is a container one layer up (§3) that nobody can name at half a second.

   ⭐⭐⭐ THE RULE THAT REPLACED IT: **every noun on screen is one the VO already
   uses.** A boss, a party, a retry, a perfect score, tokens. There is no object
   in this reel a viewer has to decode — only characters, impact and light.

   ⛔ EVERY SCENE STILL OWES ITS OWN EVENT (§2): a before state legible on frame
   1, a visible trigger, travel that crosses distance, an arrival that costs.
   ⛔ AND THE HERO ACTS (§12). Asked of every scene — what does the CLAUDE DO?
     S1  slams the token in and is thrown backwards by what comes out of the pad
     S2  stands under the board and cranes back to read it
     S3  is one of eight who walk out onto the floor for the first time
     S4  walks up to the boss ALONE, four times, and is flicked back every time
     S5  lands out of the spawn column and hauls the next one up
     S6  fills two slots on the loadout and stops dead at the third
     S7  backs away as the boss stands up out of the floor
     S8  throws everything he has and is knocked flat when it comes back
     S9  gets up, charges, is knocked down, gets up faster — three times
     S10 lands the hit that finally goes through, and is lifted by it
     S11 is not here. The slot is, and it is eating.
     S12 practises alone on a dummy, quietly, with the arena dark behind him
     S13 SLAMS the token in and the whole arena comes up around him
     S14 turns and faces out with the boss down behind him

   ⛔ ONE TEXT CHIP PER SHOT, in the reserved band (panel y 112..210).
   ⛔ EVERY ONSET IS `round(word_onset*30) - 4 - L[scene]` from words_128boss.json.
   ⛔ ANYTHING CROSSING A CUT IS `LIN` OR `IN` (§23).
   ========================================================================= */

export type Variant = "house" | "amber" | "steel";
type SP = { v: Variant; dur: number };

export const CAM: Record<Variant, { dx: number; dy: number; s: number; rot: number }> = {
  house: { dx: -6, dy: 5, s: 1.005, rot: 0 },
  amber: { dx: -56, dy: -22, s: 1.026, rot: 0 },
  steel: { dx: 58, dy: 20, s: 1.030, rot: 0 },
};
/** ⛔⛔⛔ HUE IS NOT A VARIANT LEVER (reel 115) — `hue-rotate`/`saturate` are
    banned from GRADE because both move the clay, and a trial cut may never
    recolour the Claude. Only CONTRAST and BRIGHTNESS vary. */
export const GRADE: Record<Variant, string> = {
  house: "contrast(1.000) saturate(1.18) brightness(1.000)",
  amber: "contrast(1.130) saturate(1.18) brightness(0.958)",
  steel: "contrast(1.072) saturate(1.18) brightness(1.052)",
};
const PAR_X: Record<Variant, number> = { house: 0, amber: -44, steel: 42 };
/** ⭐ PER-CUT LAYOUT, ON THE ONE SCENE A GRADE CANNOT SEPARATE. dHash across the
    three cuts measured mean 21.4 / MIN 10, and the MIN sat on f761 — S13, the
    full-arena surge, where the frame is one flood of the same green and a
    contrast/brightness grade has nothing to bite on. `feedback_trial_cut_
    variants`: the fix for a flat frame is not more camera, it is that the cut
    is genuinely LAID OUT differently. The pads fire in a different ORDER and
    the volleys run at different heights, so at any sampled instant the mass is
    somewhere else. ⛔ Nothing about the CONTENT changes — same eight pads, same
    four volleys, same beat on the same word. */
const SURGE_ORDER: Record<Variant, number[]> = {
  house: [0, 1, 2, 3, 4, 5, 6, 7],
  amber: [3, 7, 1, 5, 0, 4, 2, 6],
  steel: [6, 2, 4, 0, 5, 1, 7, 3],
};
const SURGE_Y: Record<Variant, number> = { house: 0, amber: -54, steel: 62 };

/* ⛔⛔⛔ THE SHOT LIST IS DESIGNED, NOT DEFAULTED. v1 measured its own cast's
   bounding box in every scene and found the ground line at mean 96.6% with a
   9.1pp spread across all fifteen — one shot, fifteen times, with every
   per-scene audit green. `Cam` may only scale UP (below 1.0 the panel's own
   background shows outside the painted room), so variety comes from scale AND a
   vertical offset together. ⛔ The crop bound is Scene push x SHOT.s: at 1.32 on
   a 1.07 push the visible width is 716px, so nothing that must READ sits outside
   the middle 700. */
/* ⛔⛔ ALEX: *"at the end and some scenes it's too zoomed in so we don't really
   see much of the screen and the stuff are cut off."* He is right and the
   arithmetic says so: `Shot.s` MULTIPLIES the Scene push, so S11's 1.34 on a
   1.06 push was an effective **1.42** — 712px of a 1012px panel visible, 150px
   gone off each side — and S14 stacked a 1.16 keyword punch on a 1.12 shot on a
   1.05 push for **1.36**. Every framing here is now computed as
   `Shot.s x push` and capped at **1.18**, which keeps 858px of the panel in
   frame. Variety comes from the vertical offset and the set, not from cropping.
   ⛔ THE CTA IS THE TIGHTEST BUDGET IN THE REEL because it carries the keyword
   AND the cast AND the boss: 1.02 x 1.05 = 1.07, with the punch cut to 1.06. */
const SHOT: Record<string, { s: number; y: number }> = {
  S0:  { s: 1.00, y:   0 },   S1:  { s: 1.03, y: -14 },  S2:  { s: 1.05, y:   4 },
  S3:  { s: 1.00, y:   0 },   S4:  { s: 1.10, y: -20 },  S5:  { s: 1.01, y:  10 },
  S6:  { s: 1.07, y:  10 },   S7:  { s: 1.03, y:  16 },  S8:  { s: 1.05, y:  14 },
  S9:  { s: 1.00, y:   0 },   S10: { s: 1.03, y:  10 },  S11: { s: 1.09, y: -22 },
  S12: { s: 1.06, y:   4 },   S13: { s: 1.00, y:   4 },  S14: { s: 1.02, y:  10 },
};
const Shot: React.FC<{ k: keyof typeof SHOT; children: React.ReactNode }> =
  ({ k, children }) => <Cam s={SHOT[k].s} y={SHOT[k].y} z={12}>{children}</Cam>;

/* ⛔⛔⛔ EVERY BODY IN v2 RAN A SINE TRANSLATE PLUS A SINE ROTATE, AND THAT IS
   LITERALLY BACK-AND-FORTH. Alex: *"there's just not interesting actions, it's
   just too much basic back and forth movement."* §12 names it: **A SWAY IS AN
   IDLE. A LIFT IS AN ARC.** A sway is a bob with a bigger amplitude — no
   beginning, no middle, no end — and I had one on all forty-plus sprites.

   ⭐ WHAT MAKES A BODY READ AS ALIVE INSTEAD IS THAT IT CHANGES SHAPE. The
   breath now COMPRESSES and EXTENDS from the ground line (scaleY up, scaleX
   down, volume roughly conserved) with a second slower harmonic. Nothing
   translates and nothing rotates, so no body in this reel oscillates in
   position any more — and a shape change at 3.4% is far more visible than the
   4.6px translate it replaced, because it moves the whole silhouette rather
   than sliding it.
   ⛔ AND `Crew` LOOP 0 IS `PACE`, WHICH WALKS SIDE TO SIDE. It is banned from
   this reel outright — `loopFor()` below cycles WORK / HOP / LOOK only. */
const breath = (f: number, ph: number) =>
  Math.sin(f / 13 + ph) * 0.034 + Math.sin(f / 31 + ph * 0.6) * 0.016;

/** ⛔ PACE (0) IS BANNED — it is the side-to-side loop. WORK / HOP / LOOK only. */
const loopFor = (i: number) => [1, 2, 3][i % 3];

/** an impact: 1 on the frame it lands, ringing out. §11 — WEIGHT is DEFORMATION,
    so it drives `strain`, never a position offset. ⛔ clamp: two summed tear the rig. */
const hit = (f: number, at: number, d = 14) =>
  f < at || f > at + d ? 0 : Math.exp(-(f - at) / (d * 0.36));
const cl = (v: number) => Math.max(0, Math.min(1, v));

/** ⭐ A LANDING THAT OVERSHOOTS. §12: *"the release overshoots past his standing
    height. The overshoot is the whole reason it reads."* Squash on contact,
    stretch past 1 on the recovery, settle. Returns a scaleY multiplier. */
const land = (f: number, at: number) => {
  const lf = f - at;
  if (lf < 0 || lf > 22) return 1;
  return 1 - 0.26 * Math.exp(-lf / 3.2) + 0.13 * Math.exp(-(lf - 6) * (lf - 6) / 18);
};

const Alive: React.FC<{ f: number; ax: number; ay: number; ph: number; z?: number;
  sq?: number; children: React.ReactNode }> = ({ f, ax, ay, ph, z = 52, sq = 1, children }) => {
  const b = breath(f, ph);
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: z,
      transform: `scale(${(1 - b * 0.55)}, ${(1 + b) * sq})`,
      transformOrigin: `${ax}px ${ay}px` }}>{children}</div>
  );
};

/* ============================ S0 · THE HOOK ============================= */
export const S0: React.FC<SP> = ({ v, dur }) =>
  v === "amber" ? <HookF dur={dur} /> : v === "steel" ? <HookB dur={dur} /> : <HookG dur={dur} />;

/* =========================================================================
   S1 — 2.63 -> 4.87s (67f) · WIDE · SETUP
   VO: "You can build entire apps and websites in a single prompt,"
   EVENT: one token goes into the slot and the arena ANSWERS — the pads fire,
   the rig comes up bank by bank, and a whole party lands out of the columns.
   ONE input, a whole thing. He is thrown backwards by what he started.
   ====================================================================== */
export const S1: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("spawn");
  /* ⛔⛔⛔ ALEX: *"when I mention apps and websites we need to see that."* §3, and
     I had not obeyed it: the line's nouns are APPS and WEBSITES and what was on
     screen was a crowd. ⭐ The measured onsets are "apps" 3.54s and "websites"
     3.96s — local f23 and f36 — so four APP WINDOWS come up out of the floor on
     the first and five WEB PAGES on the second, and by the end of the shot the
     frame is a wall of finished product. One token in, all of that out. */
  /* ⛔ OPENED AT 4.30 — the first app landed at f23 (0.77s of set). Two are
     ALREADY RISING at f0 (their clock starts negative), the token goes in at
     f2, and the scripted "apps"/"websites" bursts still land on their own
     measured words. A carry-in is a SECOND, earlier event, never a rescheduling
     of the scripted one. */
  const IN = 2, APPS = 23, SITES = 36, MORE = 50;
  const fired = f >= IN;
  const APP = [[92, APPS], [286, APPS + 3], [480, APPS + 6], [674, APPS + 9],
               [372, -6], [768, -3]] as const;
  const SITE = [[176, SITES], [352, SITES + 3], [528, SITES + 6], [704, SITES + 9],
                [860, SITES + 12]] as const;
  /* ⛔ 0.63 INTO THE CUT — the last panel landed at f62 of 67 and the wall then
     held. Four more are still RISING on the frame it cuts, so the shot hands
     over mid-build rather than finished. */
  const EXTRA = [[40, MORE], [610, MORE + 4], [808, MORE + 8], [250, MORE + 12],
                 [430, MORE + 15], [900, MORE + 17]] as const;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.07]} vig={0.50} glow={hexa(NEON, 0.26)}>
      <Shot k="S1">
        <Arena p={p} f={f} lit={fired ? 1 : 0.34} dais={false} rig dx={PAR_X[v]} />
        {/* ⭐ THE WHOLE WALL LIFTS. From f46 every app and page on screen rides
            up together on a LIN that finishes past the cut — the output has not
            stopped, it is stacking faster than the frame can hold it. It is the
            largest moving area the scene has and it is still travelling on the
            frame it cuts (§23). */}
        <Stands p={p} f={f} y={188} z={20} lit={fired ? 1 : 0.3}
          react={fired ? 0.3 + 0.5 * Math.abs(Math.sin(f / 8)) : 0} />
        <BossBar p={p} y={146} k={1} f={f} z={90} on={E(f, 0, 6, 0.25, 1, IN_Q)} />
        <TokenSlot p={p} x={-40} y={392} s={0.72} z={62} f={f} left={fired ? 0.72 : 1} />
        {f >= IN && <Ring x={92} y={476} f={f} at={IN} c={mxh(TOKEN, 0.3)} s={1.0} dur={16} />}

        {/* ⭐ THE APPS — they RISE out of the floor, land with a squash and a
            ring, and their buttons start pulsing the moment they arrive. */}
        <div style={{ position: "absolute", inset: 0, zIndex: 40,
          transform: `translateY(${-E(f, 46, dur + 12, 0, 300, LIN)}px)` }}>
        {APP.map(([ax, at], i) => {
          if (f < at) return null;
          const k = E(f, at, at + 8, 0, 1, BACK);
          return (
            <React.Fragment key={"ap" + i}>
              <div style={{ position: "absolute", inset: 0, zIndex: 60,
                transform: `translateY(${(1 - k) * 300}px) scaleY(${squash(f, at + 8, 0.16, 3, 10)})`,
                transformOrigin: `${ax + 110}px 640px` }}>
                <AppWin x={ax} y={392} w={222} z={60} f={f} rough={1}
                  hue={i % 2 ? NEON : PERFECT} tilt={(i % 2 ? 1 : -1) * 2.4} />
              </div>
              {f >= at + 8 && <Ring x={ax + 110} y={560} f={f} at={at + 8} c={mxh(NEON, 0.3)} s={0.9} dur={14} />}
            </React.Fragment>
          );
        })}
        {/* ⭐ THE WEBSITES — taller, behind the apps, on the next word */}
        {SITE.map(([sx, at], i) => {
          if (f < at) return null;
          const k = E(f, at, at + 8, 0, 1, BACK);
          return (
            <div key={"st" + i} style={{ position: "absolute", inset: 0, zIndex: 44,
              transform: `translateY(${(1 - k) * 340}px)` }}>
              <SitePage x={sx} y={252} w={150} z={44} f={f} rough={1}
                hue={i % 2 ? TOKEN : NEON} tilt={(i % 2 ? -1 : 1) * 2} />
            </div>
          );
        })}
        {EXTRA.map(([ex, at], i) => {
          if (f < at) return null;
          /* ⛔ LIN over a window that ENDS PAST THE CUT — the last two are still
             climbing when the scene changes (§23). */
          const k = E(f, at, at + 12, 0, 1, LIN);
          return (
            <div key={"ex" + i} style={{ position: "absolute", inset: 0, zIndex: 52,
              transform: `translateY(${(1 - k) * 340}px)` }}>
              <AppWin x={ex} y={520} w={176} z={52} f={f} rough={1}
                hue={i % 2 ? PERFECT : TOKEN} tilt={(i % 2 ? -1 : 1) * 3} />
            </div>
          );
        })}
        </div>
        {/* the crew who raised them, at the front, cropped by the panel foot */}
        {[150, 430, 760].map((bx, i) => (
          <Alive key={"c" + i} f={f} ax={bx} ay={800} ph={i * 1.7} z={70}>
            <Crew f={f} x={bx} y={806} i={i} size={222} z={70} at={-12} loop={loopFor(i)} cheer={0.4} />
          </Alive>
        ))}
        {/* he SLAMS the token in and is driven back by the scale of what answers */}
        <Alive f={f} ax={952} ay={792} ph={0.4} z={72}>
          <Hero f={f} x={952} y={792} size={236} z={72} costume={{ constr: 1 }} act={1}
            reach={100} drive={E(f, IN - 5, IN, 0, 1, IN_Q) - E(f, IN + 3, IN + 12, 0, 1, OUT)}
            strain={cl(hit(f, APPS, 18) + hit(f, SITES, 18))}
            flip gaze={-0.5} />
        </Alive>
      </Shot>
      <Motes x={506} y={220} w={820} h={440} n={18} f={f} z={80} c={mxh(p.key, 0.34)} />
    </Scene>
  );
};

/* =========================================================================
   S2 — 4.87 -> 7.70s (85f) · MED, LOOKING UP · SETUP
   VO: "and even the creators of Claude think this is the future of AI."
   EVENT: the arena board lights and six quoted words land on it cell by cell,
   with the crowd behind and one Claude under it craning back to read.
   ⛔ NO PORTRAIT OF A REAL PERSON — six quoted words and a name strip.
   ====================================================================== */
export const S2: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("arena2");
  const ON = 0, CLAUDE = 32, AI = 68;
  /* ⛔⛔⛔ THIS SCENE WAS DRAWN THREE TIMES AND THE THIRD TIME IT STOPPED BEING
     DRAWN AT ALL. v1 was a quote board; v2 was a BIGGER quote board; both are
     `feedback_dressing_the_words_is_not_redoing_it` — muted, a rectangle
     arrives. Alex: *"at 6 seconds, you have to use the same clip of the creator
     of Claude speaking as the Gauntlet Loop."*
     ⭐ HE IS RIGHT AND IT IS ALSO THE BIGGEST MOTION LEVER IN THE REPO: real
     footage took reel 107's median 6.36 -> 8.00 and one scene 6.30 -> 10.25.
     `boris_wide.mp4` / `boris_tight.mp4` are the real stage footage of Claude
     Code's creator, already cut and already used in reel 118 on this same
     script, so the receipt is verified and consistent across both reels.
     ⛔ AND B-ROLL DOES NOT GET TO HOLD: a seated interview held for a full
     sentence measured 3.23 with a 60-frame dead run. It is cut WIDE -> TIGHT on
     the word "Claude", which is the same treatment 118 used. */
  const punch = f >= CLAUDE ? 1.10 : 1;
  const SX = 96, SY = 232, SW = 820, SH = 300;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.055]} vig={0.50} glow={hexa(NEON, 0.22)}>
      <Shot k="S2">
        <Arena p={p} f={f} lit={0.5} dais={false} rig dx={PAR_X[v]} />
        <Stands p={p} f={f} y={176} z={20} lit={0.5}
          react={f >= CLAUDE ? 0.4 + 0.3 * Math.abs(Math.sin(f / 9)) : 0.15} />

        {/* the jumbotron: a real bezel, two mount arms and a status lamp */}
        <div style={{ position: "absolute", left: SX - 20, top: SY - 20, width: SW + 40,
          height: SH + 40, zIndex: 42, borderRadius: 14, boxShadow: SH_D,
          background: `linear-gradient(172deg, ${mxh(p.back2, 0.1)} 0%, ${dkh(p.back2, 0.5)} 100%)`,
          border: `7px solid ${dkh(p.back2, 0.3)}` }} />
        {[0.26, 0.74].map((k, i) => (
          <div key={"mt" + i} style={{ position: "absolute", left: SX + SW * k - 8, top: SY - 76,
            width: 16, height: 60, zIndex: 41, background: dkh(p.back2, 0.44) }} />
        ))}
        <div style={{ position: "absolute", left: SX + SW - 34, top: SY + SH + 6, width: 14,
          height: 14, borderRadius: 14, zIndex: 45, background: PERFECT }} />

        {/* ⭐ THE FOOTAGE, inside the frame, cut on the word */}
        <div style={{ position: "absolute", left: SX, top: SY, width: SW, height: SH, zIndex: 43,
          overflow: "hidden", borderRadius: 6, opacity: E(f, ON, ON + 4, 0, 1, IN_Q) }}>
          <div style={{ position: "absolute", inset: 0, transform: `scale(${punch})`,
            transformOrigin: "50% 42%" }}>
            {/* ⛔ A TALKING HEAD IS INHERENTLY LOW-MOTION — a seated interview
                measured 3.23 with a 60-frame dead run, and this scene opened at
                3.79 for exactly that reason. The doc's fix is not to add
                anything around it, it is to CUT INSIDE THE CLIP: tight for five
                frames, out to the wide, then back in hard on "Claude". Three
                framings in a shot that had one. */}
            <Sequence from={0} durationInFrames={5}>
              <OffthreadVideo src={staticFile("boris_tight.mp4")} muted
                style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </Sequence>
            <Sequence from={5} durationInFrames={CLAUDE - 5}>
              <OffthreadVideo src={staticFile("boris_wide.mp4")} muted
                style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </Sequence>
            <Sequence from={CLAUDE}>
              <OffthreadVideo src={staticFile("boris_tight.mp4")} muted
                style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </Sequence>
          </div>
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
            background: `linear-gradient(184deg, ${hexa("#BFD8F2", 0.10)} 0%, ${hexa("#BFD8F2", 0)} 46%)` }} />
        </div>
        {/* ⛔ THE NAME STRIP IS THE RECEIPT AND IT IS THE SIZE A RECEIPT SHOULD
            BE. No portrait is drawn, no words are put in his mouth — it is the
            real footage with his name under it. */}
        <div style={{ position: "absolute", left: SX, top: SY + SH + 22, width: SW, zIndex: 92,
          textAlign: "center", opacity: E(f, AI - 22, AI - 16, 0, 1, IN_Q),
          ...mono(24, 800), color: mxh(NEON, 0.4), letterSpacing: 4 }}>
          {R.futureWho}
        </div>

        {/* the crowd is watching the screen, and the boss walks under it — LIN,
            still crossing when the scene cuts (§23) */}
        <div style={{ position: "absolute", left: E(f, -20, dur + 4, 1180, 60, LIN), top: 0,
          bottom: 0, width: 620, zIndex: 76 }}>
          <Boss f={f} x={300} y={872} size={520} z={76} ph={2.2} />
        </div>
        {[212, 396, 660, 848].map((bx, i) => {
          const push = E(f, -10 + i * 4, dur + 14, 0, 1, LIN) * (i < 2 ? -122 : 140);
          return (
            <Alive key={"pp" + i} f={f} ax={bx + push} ay={806} ph={i * 1.7} z={54}>
              <Crew f={f} x={bx + push} y={806} i={i} size={206} z={54} at={-12} loop={3}
                tint={i % 2 ? dkh(CLAY, 0.22) : undefined} />
            </Alive>
          );
        })}
      </Shot>
      <Motes x={506} y={240} w={820} h={420} n={16} f={f} z={80} c={mxh(p.key, 0.3)} />
    </Scene>
  );
};

/* =========================================================================
   S3 — 7.70 -> 8.73s (31f) · WIDEST · TURN
   VO: "It's called the boss loop."
   EVENT: the whole arena is seen for the first time and the rig comes up in
   three banks, bottom to top, walking the eye UP to the boss on his dais.
   ====================================================================== */
export const S3: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("arena");
  const B = [0, 5, 10];
  const on = (i: number) => E(f, B[i], B[i] + 4, 0, 1, IN_Q);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.48} glow={hexa(NEON, 0.26)}>
      <Shot k="S3">
        <Arena p={p} f={f} lit={on(0)} dais rig dx={PAR_X[v]} />
        <Stands p={p} f={f} y={190} z={20} lit={on(1)}
          react={E(f, 12, 18, 0, 1, IN_Q) - E(f, 24, dur + 8, 0, 1, LIN)} />
        <Rail p={p} x={296} y={330} w={420} z={18} k={0.1} f={f} label="" />
        <Boss f={f} x={824} y={694} size={396} z={60} ph={0.7} />
        {/* ⛔⛔ 3.20 — "the lights come up in three banks" only ever touched the
            ACCENT pixels: `Arena`'s `lit` drives strip opacities and the spots,
            not the wall or the floor, so a beat that should be the biggest luma
            event in the reel changed almost no area. ⭐ The room is now genuinely
            DARK and three real bands of it retract, bottom to top, on f0/5/10 —
            the eye is walked up the building and the whole panel changes value
            doing it. ⛔ It is a scrim LIFTING, never a white flash
            (`feedback_no_flashing_transitions` is standing). */}
        {[0, 1, 2].map((i) => {
          const k = on(2 - i);
          const bandTop = [0, 264, 528][i];
          return (
            <div key={"scr" + i} style={{ position: "absolute", left: 0, top: bandTop,
              width: W, height: 264, zIndex: 86, opacity: 1 - k,
              background: "#05090E" }} />
          );
        })}
        {/* ⭐ AND THE MOMENT THE LIGHTS ARE UP THEY GO. Four bodies break for the
            boss from f14 on a LIN that finishes past the cut, so the shot that
            opens on a reveal closes on a charge — and it hands straight into
            the next scene. */}
        {[86, 232, 378, 512].map((bx, i) => {
          const run = E(f, 14 + i * 2, dur + 10, 0, 330, LIN);
          return (
            <Alive key={"c" + i} f={f} ax={bx + run} ay={734} ph={i * 1.7} z={50}>
              <Crew f={f} x={bx + run} y={734} i={i} size={172} z={50} at={-12} loop={1}
                tint={i > 1 ? dkh(CLAY, 0.22) : undefined} />
            </Alive>
          );
        })}
        {/* the ONE text chip this shot gets, in the reserved band */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 146, zIndex: 92,
          display: "flex", justifyContent: "center", opacity: E(f, 11, 16, 0, 1, IN_Q),
          transform: `translateY(${(1 - E(f, 11, 16, 0, 1, BACK)) * -20}px)` }}>
          <div style={{ padding: "12px 30px", borderRadius: 8, background: mxh(CREAMB, 0.05),
            border: `4px solid ${dkh(NEON, 0.2)}`, boxShadow: SH,
            ...mono(42, 800), color: INK, letterSpacing: 3 }}>{R.name}</div>
        </div>
      </Shot>
    </Scene>
  );
};

/* =========================================================================
   S4 — 8.73 -> 10.33s (48f) · CLOSE · CONTRAST
   VO: "Instead of doing the normal back and forth chats,"
   EVENT: ONE Claude walks up to the boss alone, four times, and is flicked back
   every time — the same two feet of progress, slower each go.
   ⛔ THE ONLY REPETITIVE SCENE IN THE REEL, ON PURPOSE. It is the "before".
   ====================================================================== */
export const S4: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("gate");
  /* ⛔⛔ v2 WAS FOUR IDENTICAL WALK-UPS AND FOUR IDENTICAL SLIDES BACK — the
     purest form of *"basic back and forth movement"*. §12: a sway has no
     beginning, middle or end, and repeating one four times does not give it one.
     ⭐ REBUILT AS AN ESCALATION WITH ARCS. Each rejection throws him FURTHER
     and HIGHER than the last, he TUMBLES through the air instead of sliding,
     and he LANDS with a squash that overshoots past his standing height. He
     also gets up slower every time — the cycle is the same, the COST is not. */
  const CY = [0, 13, 25, 36];
  const cycle = CY.reduce((a, c, i) => (f >= c ? i : a), 0);
  const lf = f - CY[cycle];
  const len = [11, 10, 9, 8][cycle];
  const OUT_AT = len * 0.5;
  /* approach: he closes on the boss, accelerating */
  const adv = E(lf, 0, OUT_AT, 0, 1, IN_Q);
  /* the throw: a ballistic arc, further and higher each cycle, still in the air
     when the next one starts — nothing in this scene decelerates to a stop */
  const tf = Math.max(0, lf - OUT_AT);
  const reach = [1, 1.34, 1.72, 2.2][cycle];
  const bx = 300 + adv * 150 - tf * 17 * reach;
  const by = 742 - Math.max(0, tf * 26 * reach - tf * tf * 3.1 * reach);
  const spin = -tf * 34 * reach;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.06]} vig={0.58} glow={hexa(p.key, 0.2)}>
      <Shot k="S4">
        <Arena p={p} f={f} lit={0.34} dais rig={false} dx={PAR_X[v]} mark={0.7} />
        {/* ⛔⛔ ALEX: *"even at ten seconds there's nothing there, people would
            scroll."* This is the reel's deliberate trough and a trough is still
            not allowed to be EMPTY — AUDIT-FIRST §C: *"too boring is often
            ABSENCE, not quality."* ⭐ What belongs in an empty frame about doing
            it alone is THE BACKLOG: eleven unbuilt, grey, wireframe jobs stacked
            up behind him that he is never going to clear one at a time, and the
            queue does not shrink while he works. It fills the frame AND it is
            the argument the line is making. */}
        {Array.from({ length: 11 }, (_, i) => {
          const col = i % 4, row = Math.floor(i / 4);
          const drift = ((f * 0.5 + i * 30) % 24) - 12;
          return (
            <div key={"bk" + i} style={{ position: "absolute", inset: 0, zIndex: 26 + row }}>
              {i % 3 === 0
                ? <SitePage x={-40 + col * 176} y={228 + row * 132 + drift * 0.3} w={124} z={26 + row}
                    f={f} rough={0} tilt={(i % 2 ? -1 : 1) * 3} />
                : <AppWin x={-40 + col * 176} y={252 + row * 132 + drift * 0.3} w={158} z={26 + row}
                    f={f} rough={0} tilt={(i % 2 ? 1 : -1) * 2.6} />}
            </div>
          );
        })}
        {/* the one he IS carrying — the only coloured thing in the queue */}
        <AppWin x={196} y={556} w={150} z={57} f={f} rough={1} hue={NEON} tilt={-4} />
        {/* ⭐⭐ THE WHOLE POINT OF THIS SCENE, IN ONE OBJECT. Alex: *"the scene at
            nine seconds is not interesting."* It is ONE fighter going at a boss
            alone, and with a bar you can SEE why that is hopeless: four hits
            land, and the boss's bar moves by a hundredth each time. The line is
            "instead of doing the normal back and forth chats" and this is what
            that costs, drawn as a quantity. */}
        <BossBar p={p} y={146} k={1 - cycle * 0.012} f={f} z={90}
          flash={cl(hit(f, CY[cycle] + OUT_AT, 8) * 0.6)} />
        {/* his own bar, and it empties a little further every cycle */}
        <HP x={bx} y={by - 300} w={128} f={f} z={94}
          k={Math.max(0.08, 1 - cycle * 0.26 - (tf > 0 ? 0.18 : 0))}
          flash={cl(hit(f, CY[cycle] + OUT_AT, 6))} />
        {tf > 0 && tf < 16 && <Hit x={bx + 150} y={by - 150} f={f} at={CY[cycle] + OUT_AT}
          s={0.8 + cycle * 0.16} z={93} dir={1} />}
        {/* the boss, only his mass and one flick of the hand in frame — he is
            not even looking at him, which is the joke and also the point */}
        <div style={{ position: "absolute", left: 520, top: -220, bottom: 0, width: 620, zIndex: 46 }}>
          <Boss f={f} x={300} y={880} size={640} z={46}
            swing={lf > OUT_AT - 2 && lf < OUT_AT + 4 ? 0.42 : 0} ph={1.6} />
        </div>
        {/* ⭐ HE TUMBLES. A body thrown across a frame rotating through 200
            degrees is an ARC with a destination; the same body sliding back to
            its mark is the thing that got flagged. */}
        <div style={{ position: "absolute", inset: 0, zIndex: 58,
          transform: `rotate(${spin}deg) scaleY(${land(f, CY[cycle] + len - 1)})`,
          transformOrigin: `${bx}px ${by}px` }}>
          <Hero f={f} x={bx} y={by} size={266} z={58} costume={{ glasses: 1 }}
            act={3} strain={cl(hit(f, CY[cycle] + OUT_AT, 12))}
            lift={-cycle * 6} gaze={0.4} shock={cl(hit(f, CY[cycle] + OUT_AT, 20))} />
        </div>
        <Contact x={bx} y={754} w={210} z={30} o={0.32 * (1 - Math.min(1, tf / 9))} />
        {tf > 0 && tf < 3 && <Ring x={bx + 90} y={by - 90} f={f} at={CY[cycle] + OUT_AT}
          c={mxh(RED, 0.3)} s={1.0} dur={12} />}
        {/* the dust he kicks up on each landing, bigger every time */}
        {lf > len - 3 && <Puff x={bx} y={754} f={f} at={CY[cycle] + len - 3} c={p.grit}
          n={8} s={0.7 + cycle * 0.3} up={30 + cycle * 20} />}
        {/* four tally marks accumulate — the ONE thing that changes */}
        {CY.map((c, i) => f >= c + 8 && (
          <div key={"tl" + i} style={{ position: "absolute", left: 92 + i * 30, top: 300,
            width: 10, height: 54, zIndex: 60, background: mxh(p.key, 0.24), opacity: 0.85,
            transform: `rotate(${(i % 2 ? 1 : -1) * 6}deg)` }} />
        ))}
      </Shot>
      <Motes x={420} y={260} w={520} h={420} n={14} f={f} z={80} c={mxh(p.key, 0.36)} />
    </Scene>
  );
};

/* =========================================================================
   S5 — 10.33 -> 13.17s (85f) · WIDE · ESCALATE          ⭐ DENSITY PEAK 1
   VO: "you give Claude a task and tell it to spawn a team of worker sub-agents."
   EVENT: on "spawn" eight pads fire and eight Claudes land out of eight columns
   of light, four frames apart, across the FULL duration.
   ⛔ PITCH IS ARITHMETIC: eight across 928 usable is 103px per rank against
   ~230px bodies. TWO RANKS OF FOUR at 232px pitch, back rank in darker clay —
   value is what makes depth readable and it is the axis a greyscale audit sees.
   ====================================================================== */
export const S5: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("spawn");
  /* ⛔⛔ 0.99 — THE WORST OPENER IN THE REEL. The pads fired at f31, so the
     first full second was an empty floor and a small token. The party from S1
     CARRIES IN — four of them already on the floor and already working at f0 —
     and the eight-pad burst still lands on the word "spawn". */
  const TASK = 8, SPAWN = 31;
  const PADS = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => SPAWN + i * 4);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.075]} vig={0.50} glow={hexa(NEON, 0.28)}>
      <Shot k="S5">
        <Arena p={p} f={f} lit={1} dais={false} rig dx={PAR_X[v]} />
        <Stands p={p} f={f} y={184} z={20} lit={1}
          react={E(f, SPAWN, SPAWN + 6, 0, 1, IN_Q) - E(f, dur - 14, dur + 10, 0, 1, LIN)} />
        {/* ⭐⭐ THE BRIEF, NOT A LABEL. It comes down out of frame on "task" and
            SLAMS onto the floor carrying a blueprint of the app they are being
            asked to build — the same `AppWin` at rough=0 that S12 builds by hand
            and S13 brings back coloured. "You give Claude a task" now has a
            picture of what was asked for instead of the word for it. */}
        <div style={{ position: "absolute", left: 306,
          top: 196 - (1 - E(f, 0, TASK, 0, 1, IN_Q)) * 560, zIndex: 66,
          transform: `scale(${squash(f, TASK, 0.20, 3, 12)})`, transformOrigin: "200px 300px" }}>
          <Brief p={p} x={0} y={0} s={1.0} z={66} f={f} open={E(f, TASK, TASK + 6, 0.2, 1, IN_Q)} />
        </div>
        {f >= TASK && <Ring x={506} y={480} f={f} at={TASK} c={mxh(NEON, 0.34)} s={1.4} dur={20} />}
        {f >= TASK && <Puff x={506} y={500} f={f} at={TASK} c={p.grit} n={12} s={1.2} up={70} />}

        {/* ⭐⭐ THE ANSWER TO *"the scene at eleven seconds, what's going on
            there"*: you had ONE fighter and now you have EIGHT, and the picture
            says so because eight bars pop in along the top as they land. The
            boss's bar is up there the whole time, untouched, so the scale of
            what they are about to take on is legible before they move. */}
        <BossBar p={p} y={146} k={1} f={f} z={90} on={1} />
        {/* the carry-in: four of the party are already here and already working */}
        {[96, 268, 748, 920].map((bx, i) => (
          <Alive key={"ci" + i} f={f} ax={bx} ay={796} ph={i * 1.9} z={46}>
            <Crew f={f} x={bx} y={796} i={i + 4} size={188} z={46} at={-20} loop={loopFor(i)} />
          </Alive>
        ))}
        {/* and the wall of work from S1 is still rising out of frame behind them */}
        {[40, 300, 620, 880].map((ax, i) => (
          <div key={"cw" + i} style={{ position: "absolute", inset: 0, zIndex: 30,
            transform: `translateY(${-E(f, -20, dur, 0, 620, LIN)}px)` }}>
            <AppWin x={ax} y={430} w={150} z={30} f={f} rough={1}
              hue={i % 2 ? NEON : PERFECT} tilt={(i % 2 ? 1 : -1) * 2} />
          </div>
        ))}
        {PADS.map((at, i) => {
          const back = i >= 4;
          const col = i % 4;
          const bx = 118 + col * 232 + (back ? 88 : 0);
          const by = back ? 568 : 776;
          const sz = back ? 152 : 262;
          const k = f >= at - 8 ? E(f, at - 8, at, 0, 1, IN_Q) - E(f, at + 5, at + 20, 0, 1, OUT) : 0;
          return (
            <React.Fragment key={"s" + i}>
              <Pad p={p} x={bx} y={by - 8} r={back ? 74 : 108} z={back ? 21 : 30} f={f} k={k} />
              {f >= at && (
                <Alive f={f} ax={bx} ay={by} ph={i * 1.7} z={back ? 38 : 52}>
                  <Crew f={f} x={bx} y={by} i={i} size={sz} z={back ? 38 : 52} at={at}
                    loop={loopFor(i)} tint={back ? dkh(CLAY, 0.30) : undefined} />
                </Alive>
              )}
              {f >= at && <Puff x={bx} y={by} f={f} at={at} c={p.grit} n={8} s={back ? 0.7 : 1.1} up={50} />}
              {f >= at && <Ring x={bx} y={by - 14} f={f} at={at} c={mxh(NEON, 0.3)} s={back ? 0.7 : 1.1} dur={15} />}
              {/* each fighter's bar SNAPS IN full as he lands — the party
                  arriving is a count you can read off the top of the frame */}
              {f >= at + 3 && (
                <HP x={bx} y={by - sz * 1.06} w={sz * 0.52} f={f} z={94} k={1}
                  flash={cl(hit(f, at + 3, 5))} />
              )}
            </React.Fragment>
          );
        })}
        {/* ⛔ 5.98 — the last pad fires at f59 of 85 and the party then STANDS for
            twenty-six frames. §19: a scene that arrives and parks shows a cliff.
            They FORM UP AND CHARGE on f62, LIN, and are still crossing the panel
            when it cuts — which is also the beat S6 opens on. */}
        {f >= 62 && Array.from({ length: 6 }, (_, i) => {
          const go = E(f, 62 + i * 2, dur + 18, 0, 1, LIN);
          return (
            <div key={"ch" + i} style={{ position: "absolute",
              left: 96 + i * 150 + go * 520, top: 560 + (i % 2) * 96, zIndex: 66 }}>
              <Crew f={f} x={0} y={0} i={i} size={196 + (i % 2) * 46} z={66} at={62 + i * 2}
                loop={1} />
            </div>
          );
        })}
      </Shot>
      <Motes x={506} y={230} w={840} h={440} n={18} f={f} z={80} c={mxh(NEON, 0.4)} />
    </Scene>
  );
};

/* =========================================================================
   S6 — 13.17 -> 15.10s (58f) · CLOSE ON THE BOARD · TURN
   VO: "But the secret sauce is the third line of the prompt"
   EVENT: two loadout slots fill fast and the frame settles on an EMPTY THIRD,
   lit, with nothing in it. ⛔ The empty container must read while empty (§11).
   ====================================================================== */
export const S6: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("arena2");
  const L1 = 1, L2 = 27, HOLD = 46;
  const rows = [
    { t: R.lines[0].t, lit: E(f, L1, L1 + 5, 0, 1, IN_Q) },
    { t: R.lines[1].t, lit: E(f, L2, L2 + 5, 0, 1, IN_Q) },
    { t: "", lit: 0 },
  ];
  return (
    <Scene p={p} slug="" push={[0, dur, 1.065]} vig={0.58} glow={hexa(NEON, 0.2)}>
      <Shot k="S6">
        <Arena p={p} f={f} lit={0.24} dais={false} rig dx={PAR_X[v]} />
        {/* ⛔ 4.94 — the board is the subject and the ROOM was empty. The party
            is on its pads behind it, waiting, lit from below, and the pads
            PULSE on their own clocks: a background process is furniture, it
            costs the hierarchy nothing, and it is the difference between a shot
            and a still. */}
        {[150, 356, 662, 868].map((px, i) => (
          <React.Fragment key={"pw" + i}>
            <Pad p={p} x={px} y={706} r={78} z={22} f={f}
              k={0.28 + 0.28 * Math.abs(Math.sin(f / 13 + i * 1.7))} />
            <Alive f={f} ax={px} ay={712} ph={i * 1.7} z={40}>
              <Crew f={f} x={px} y={712} i={i} size={168} z={40} at={-12} loop={loopFor(i)}
                tint={dkh(CLAY, 0.34)} />
            </Alive>
          </React.Fragment>
        ))}
        {/* ⛔ 2.56 — the board is the subject and a row filling is a tiny area.
            The party's finished work streams past behind it from frame 0, fast,
            which is both the biggest moving mass available and the reason the
            loadout matters. */}
        {Array.from({ length: 7 }, (_, i) => {
          const x = ((i * 168 + f * 16) % (W + 340)) - 170;
          return (
            <div key={"str" + i} style={{ position: "absolute", inset: 0, zIndex: 32 }}>
              <AppWin x={x} y={520} w={142} z={32} f={f} rough={1}
                hue={i % 2 ? NEON : PERFECT} tilt={(i % 2 ? 1 : -1) * 3} />
            </div>
          );
        })}
        <Board p={p} x={126} y={224} w={764} h={252} z={60} f={f} on={1} rows={rows}
          title="THE LOADOUT" />
        {/* ⭐ THE EMPTY THIRD SLOT — a socket, lit, waiting, and it PULSES once it
            is the only thing left. ⛔ contained, never a screen flash. */}
        {f >= HOLD && (
          <div style={{ position: "absolute", left: 148, top: 424, width: 720, height: 46,
            zIndex: 70, borderRadius: 6,
            opacity: 0.22 + 0.24 * (0.5 - 0.5 * Math.cos((f - HOLD) / 3.4)),
            background: hexa(NEON, 0.9) }} />
        )}
        <div style={{ position: "absolute", left: 148, top: 424, width: 720, height: 46, zIndex: 68,
          borderRadius: 6, border: `4px dashed ${hexa(NEON, 0.62)}` }} />
        {/* he fills two and stops dead at the third */}
        <Alive f={f} ax={820} ay={730} ph={0.9} z={58}>
          <Hero f={f} x={820} y={730} size={242} z={58} costume={{ constr: 1 }} act={1}
            reach={104} drive={f < HOLD ? 0.5 + 0.5 * Math.sin(f / 4) : 0}
            lift={f >= HOLD ? -E(f, HOLD, HOLD + 10, 0, 28, OUT) : 0}
            strain={cl(E(f, HOLD, HOLD + 8, 0, 0.42, OUT))}
            stern={f >= HOLD ? 0.85 : 0} gaze={-0.4} />
        </Alive>
        <Contact x={820} y={740} w={190} z={30} o={0.3} />
      </Shot>
      <Motes x={506} y={260} w={620} h={400} n={18} f={f} z={80} c={mxh(NEON, 0.4)} />
    </Scene>
  );
};

/* =========================================================================
   S7 — 15.10 -> 16.63s (46f) · LOW · VILLAIN IN
   VO: "where you assign a strict AI boss."
   EVENT: the third slot fills on "assign" and THE BOSS RISES out of the floor
   on "boss" — the crowd comes off its feet, the party backs away, the rig snaps
   to him. ⛔ He never comes down off the dais again.
   ====================================================================== */
export const S7: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("arena");
  const ASSIGN = 0, BOSS = 25;
  const rise = E(f, BOSS, BOSS + 9, 0, 1, BACK);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.06]} vig={0.52} glow={hexa(NEON, 0.26)}>
      <Shot k="S7">
        <Arena p={p} f={f} lit={0.5 + rise * 0.5} dais rig dx={PAR_X[v]} />
        {/* the stream from S6 carries straight through this cut — the work does
            not stop just because a boss is arriving */}
        {Array.from({ length: 6 }, (_, i) => {
          const x = ((i * 196 + f * (18 + E(f, 22, dur + 6, 0, 46, LIN))) % (W + 360)) - 180;
          return (
            <div key={"cs" + i} style={{ position: "absolute", inset: 0, zIndex: 30 }}>
              <AppWin x={x} y={556} w={136} z={30} f={f} rough={1}
                hue={i % 2 ? PERFECT : NEON} tilt={(i % 2 ? -1 : 1) * 3} />
            </div>
          );
        })}
        <Stands p={p} f={f} y={182} z={20} lit={0.6 + rise * 0.4}
          react={E(f, BOSS, BOSS + 5, 0, 1, IN_Q)} />
        {/* the slot fills */}
        <div style={{ position: "absolute", left: 168 + (1 - E(f, ASSIGN, ASSIGN + 10, 0, 1, IN_Q)) * 420,
          top: 258, zIndex: 66, opacity: E(f, ASSIGN, ASSIGN + 3, 0, 1, IN_Q),
          transform: `scale(${squash(f, ASSIGN + 10, 0.16, 3, 11)})`, transformOrigin: "336px 28px" }}>
          <div style={{ width: 672, height: 58, borderRadius: 6,
            background: `linear-gradient(178deg, ${mxh(TOKEN, 0.34)} 0%, ${dkh(TOKEN, 0.14)} 100%)`,
            border: `4px solid ${dkh(TOKEN, 0.4)}`, display: "flex", alignItems: "center",
            justifyContent: "center", ...mono(28, 800), color: INK, letterSpacing: 3 }}>
            {R.lines[2].t}
          </div>
        </div>
        {/* ⭐ HE RISES OUT OF THE FLOOR. `BACK` overshoots, so he arrives with a
            slam rather than sliding into position. */}
        <div style={{ position: "absolute", inset: 0, zIndex: 60,
          transform: `translateY(${(1 - rise) * 560}px)` }}>
          <Boss f={f} x={676} y={708} size={520} z={60} ph={0.9}
            swing={E(f, BOSS + 9, dur + 8, 0, 1, IN_Q)} />
        </div>
        {/* ⛔ 0.55 — he arrived at f34 of 46 and the shot held. He RAISES HIS ARM
            into the cut on an IN_Q: a 240px limb crossing 100 degrees in the
            last twelve frames, and it is the threat the next scene pays off. */}
        {f >= BOSS + 8 && <Ring x={676} y={690} f={f} at={BOSS + 8} c={mxh(NEON, 0.3)} s={2.2} dur={22} />}
        {f >= BOSS + 8 && <Puff x={676} y={706} f={f} at={BOSS + 8} c={p.grit} n={14} s={1.5} up={90} />}
        {/* the party backs away from him — LIN, still moving at the cut */}
        {[96, 262].map((bx, i) => {
          const away = f >= BOSS ? E(f, BOSS, dur + 8, 0, 1, LIN) * -250 : 0;
          return (
            <Alive key={"c" + i} f={f} ax={bx + away} ay={796} ph={i * 1.7} z={54}>
              <Crew f={f} x={bx + away} y={796} i={i + 2} size={230} z={54} at={-12}
                loop={f >= BOSS ? 3 : 1} />
            </Alive>
          );
        })}
      </Shot>
    </Scene>
  );
};

/* =========================================================================
   S8 — 16.63 -> 19.13s (75f) · MED · ESCALATE
   VO: "The worker agents write the code and the boss tears it apart."
   EVENT: the party throws EVERYTHING at him on "write"; he puts a hand up on
   "boss" and it all bursts against it; on "apart" they are knocked flat and the
   rail behind him does not move.
   ⛔ The volley is solid slabs with lit leading edges, never particles or beams
   — §10's trap is abstract light that satisfies the audit and depicts nothing.
   ====================================================================== */
export const S8: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("slam");
  /* ⛔ 2.80 — the first volley left at f11. One is already IN FLIGHT at f0
     (carried over from the party's last throw) and the scripted volleys still
     land on "write" and "code". */
  const WRITE = 11, CODE = 23, BOSS = 37, APART = 57, CARRY = -14;
  const guard = E(f, BOSS - 8, BOSS, 0, 1, IO);
  const shakeK = f >= BOSS && f < BOSS + 14
    ? Math.sin((f - BOSS) * 2.0) * 14 * Math.exp(-(f - BOSS) / 4.4) : 0;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.07]} vig={0.46} glow={hexa(RED, 0.24)}>
      <Shot k="S8">
        <div style={{ position: "absolute", inset: 0, transform: `translateX(${shakeK}px)` }}>
          <Arena p={p} f={f} lit={0.9} dais rig dx={PAR_X[v]} />
          <Stands p={p} f={f} y={186} z={20} lit={0.8}
            react={E(f, BOSS, BOSS + 5, 0, 1, IN_Q) - E(f, BOSS + 24, BOSS + 44, 0, 1, OUT)} />
          {/* ⭐ HIS BAR TAKES A CHIP AND HOLDS — the story of this scene as a
              quantity. Two volleys land, the bar moves 4%, and he blocks. */}
          <BossBar p={p} y={146} k={1 - E(f, WRITE, CODE + 6, 0, 0.04, IN_Q)} f={f} z={90}
            flash={cl(hit(f, WRITE, 6) * 0.7 + hit(f, CODE, 6) * 0.7)} />
          <Rail p={p} x={556} y={286} w={412} z={18} k={0.24} f={f} label="" />
          <Boss f={f} x={800} y={712} size={492} z={60} guard={guard} ph={0.8} />
          {/* two volleys — the second bigger, and neither gets through */}
          <Volley f={f} at={CARRY} n={8} x0={330} x1={700} y0={500} spread={200} z={70}
            c={NEON} s={1.05} life={22} />
          <Volley f={f} at={WRITE} n={9} x0={330} x1={690} y0={470} spread={210} z={70}
            c={NEON} s={1.1} life={20} />
          <Volley f={f} at={CODE} n={11} x0={310} x1={700} y0={440} spread={250} z={70}
            c={NEON} s={1.25} life={22} />
          {/* ⛔ 0.36, the worst tail in the reel — the knock-flat at f57 was the
              last thing authored in a 75-frame shot. A THIRD volley goes at f60
              and is still crossing the panel when it cuts, which is also the
              honest reading of the line: they do not stop throwing. */}
          <Volley f={f} at={60} n={12} x0={300} x1={720} y0={430} spread={270} z={70}
            c={NEON} s={1.3} life={26} />
          {f >= WRITE && <Hit x={690} y={470} f={f} at={WRITE} s={1.1} z={93} dir={1} />}
          {f >= CODE && <Hit x={704} y={440} f={f} at={CODE} s={1.2} z={93} dir={1} />}
          {f >= BOSS && (<>
            <Ring x={676} y={452} f={f} at={BOSS} c={mxh(RED, 0.3)} s={1.5} dur={20} />
            <Ring x={676} y={452} f={f} at={BOSS + 3} c={mxh(p.key, 0.34)} s={2.2} dur={26} />
            {Array.from({ length: 16 }, (_, i) => {
              const lf = f - BOSS, a = (i / 16) * 6.283;
              return lf > 28 ? null : (
                <div key={"sp" + i} style={{ position: "absolute",
                  left: 676 + Math.cos(a) * lf * 19, top: 452 + Math.sin(a) * lf * 13,
                  width: 40, height: 26, borderRadius: 6, zIndex: 78,
                  transform: `rotate(${a * 57 + lf * 8}deg)`, opacity: 1 - lf / 28,
                  background: mxh(NEON, 0.22) }} />
              );
            })}
          </>)}
          {/* the party throws, then is knocked FLAT on "apart" */}
          {[110, 268, 420].map((bx, i) => {
            const knock = f >= APART ? E(f, APART, dur + 14, 0, 1, LIN) : 0;
            const recoil = f >= BOSS ? E(f, BOSS, BOSS + 6, 0, 34, OUT) - E(f, BOSS + 10, BOSS + 24, 0, 34, OUT) : 0;
            return (
              <React.Fragment key={"c" + i}>
                <Alive f={f} ax={bx} ay={800} ph={i * 1.7} z={54}>
                  <div style={{ position: "absolute", inset: 0,
                    transform: `translate(${-recoil - knock * 190}px, ${knock * 60}px) rotate(${-knock * 78}deg)`,
                    transformOrigin: `${bx}px 800px` }}>
                    <Crew f={f} x={bx} y={800} i={i} size={228} z={54} at={-12}
                      loop={f >= APART ? 3 : 1} />
                  </div>
                </Alive>
                <HP x={bx - recoil - knock * 190} y={800 - 228 * 1.04 + knock * 60}
                  w={118} f={f} z={94}
                  k={f < APART ? 1 : Math.max(0, 1 - (f - APART) / 5)}
                  flash={cl(hit(f, APART, 6))} ko={f > APART + 5} />
              </React.Fragment>
            );
          })}
        </div>
      </Shot>
    </Scene>
  );
};

/* =========================================================================
   S9 — 19.13 -> 20.47s (40f) · WIDE · ESCALATE
   VO: "And they automatically loop and fix errors"
   EVENT: THE RETRY, three times inside 40 frames and ACCELERATING. They
   respawn, charge, get knocked back, respawn faster. Tokens drop on every lap.
   ⛔ The rate ITSELF rises — speed is a first-class parameter (§26).
   ====================================================================== */
export const S9: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("retry");
  /* an accelerating lap clock: integrate a rate, never repeat a ramp */
  /* ⛔ 3.74 — the lap clock started at zero so frame 0 was the slowest
     instant in the scene. It opens MID-LAP: the party is already charging. */
  const phase = 0.34 + 0.036 * f + 0.0013 * f * f;
  const lap = Math.floor(phase);
  const t = phase - lap;
  /* charge out on the first 62% of the lap, thrown back on the rest */
  const adv = t < 0.62 ? E(t, 0, 0.62, 0, 1, IN_Q) : 1 - E(t, 0.62, 1, 0, 1, LIN);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.06]} vig={0.44} glow={hexa(TOKEN, 0.26)}>
      <Shot k="S9">
        <Arena p={p} f={f} lit={0.9} dais rig dx={PAR_X[v]} />
        <Stands p={p} f={f} y={186} z={20} lit={0.8} react={t > 0.62 ? 1 : 0.2} />
        {/* ⭐⭐⭐ THIS IS WHERE THE BARS PAY FOR THEMSELVES. Every lap: the party's
            bars empty, a token goes in, they come back FULL, and the boss's bar
            loses a BIGGER chunk than last time (4% -> 11% -> 21%). That is
            "they automatically loop and fix errors" drawn as a quantity, and it
            is the one thing choreography alone could never say. */}
        <BossBar p={p} y={146} k={1 - [0.04, 0.11, 0.21, 0.30][Math.min(3, lap)]} f={f} z={90}
          flash={t > 0.55 && t < 0.66 ? 0.7 : 0} />
        <Boss f={f} x={806} y={706} size={470} z={60}
          swing={t > 0.58 && t < 0.78 ? 1 : 0} ph={1.4} />
        {/* ⭐ THREE OF THEM, AND EACH LAP THROWS THEM FURTHER. v2 slid them out
            and slid them back on one value — back and forth. Now the charge is
            an accelerating close and the rejection is a BALLISTIC TUMBLE whose
            reach grows with the lap, so the cycle repeats and the COST does
            not. §12: the body changes shape through it, and the landing
            overshoots. */}
        {[0, 1, 2].map((i) => {
          const ph = i * 0.12;
          const a = Math.max(0, Math.min(1, adv - ph));
          const thrown = t > 0.62;
          const tf = thrown ? (t - 0.62) / 0.38 : 0;
          const reach = 1 + lap * 0.5;
          const bx = 116 + i * 152 + a * 330 - tf * 210 * reach;
          const by = 792 - Math.max(0, tf * 190 * reach - tf * tf * 250 * reach);
          return (
            <div key={"c" + i} style={{ position: "absolute", inset: 0, zIndex: 54,
              transform: `rotate(${-tf * 260 * reach}deg) scaleY(${1 + breath(f, i * 1.7)})`,
              transformOrigin: `${bx}px ${by}px` }}>
              <Crew f={f} x={bx} y={by} i={i} size={226} z={54} at={-12}
                loop={thrown ? 3 : 1} />
            </div>
          );
        })}
        {/* their bars: full on the charge, empty on the throw, full again next
            lap — the RESPAWN is the whole mechanic and it is now visible */}
        {[0, 1, 2].map((i) => {
          const ph = i * 0.12;
          const a = Math.max(0, Math.min(1, adv - ph));
          const thrown = t > 0.62;
          const tf = thrown ? (t - 0.62) / 0.38 : 0;
          const reach = 1 + lap * 0.5;
          const bx = 116 + i * 152 + a * 330 - tf * 210 * reach;
          const by = 792 - Math.max(0, tf * 190 * reach - tf * tf * 250 * reach);
          return (
            <HP key={"hp" + i} x={bx} y={by - 236} w={118} f={f} z={94}
              k={thrown ? Math.max(0, 1 - tf * 3.4) : 1}
              flash={thrown && tf < 0.14 ? 1 - tf * 7 : 0} ko={tf > 0.3} />
          );
        })}
        {t > 0.55 && t < 0.7 && <Hit x={694} y={520} f={f}
          at={Math.floor(f) - 1} s={1.1 + lap * 0.2} z={93} dir={1} />}
        {/* the tokens go on every lap — the cost is running while they retry */}
        <TokenSlot p={p} x={-40} y={330} s={0.78} z={62} f={f} left={1 - Math.min(0.8, phase * 0.26)} />
        {/* the three lap lamps LIGHT — a count, not a numeral */}
        {[0, 1, 2].map((i) => (
          <div key={"lp" + i} style={{ position: "absolute", left: 452 + i * 64, top: 232,
            width: 48, height: 48, borderRadius: "50%", zIndex: 90,
            background: lap > i ? mxh(TOKEN, 0.24) : dkh(p.back2, 0.4),
            border: `5px solid ${dkh(p.back2, 0.24)}` }} />
        ))}
      </Shot>
    </Scene>
  );
};

/* =========================================================================
   S10 — 20.47 -> 22.40s (58f) · MED -> WIDE · PAYOFF          ⭐ THE PEAK
   VO: "until the boss gives it a perfect score."
   EVENT: the volley finally GOES THROUGH. The rail fills all the way, PERFECT
   lands, the boss goes down on one knee and the crowd comes off its feet.
   ⛔ THE REWARD IS CONTAINED, NEVER A SCREEN FLASH (§16, §29).
   ====================================================================== */
export const S10: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("perfect");
  const FIRE = -8, THROUGH = 18, PERF = 30, SCORE = 36;
  const railK = E(f, THROUGH, SCORE, 0.3, 1, IN_Q);
  const win = f >= SCORE;
  const down = E(f, THROUGH + 4, THROUGH + 16, 0, 1, BACK);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.075]} vig={0.48} glow={hexa(PERFECT, 0.3)}>
      <Shot k="S10">
        <Arena p={p} f={f} lit={1} dais rig dx={PAR_X[v]} />
        <Stands p={p} f={f} y={182} z={20} lit={1}
          react={E(f, THROUGH, THROUGH + 5, 0, 1, IN_Q)} />
        {/* ⭐ HIS BAR EMPTIES. Everything the reel has been counting arrives
            here as one length going to zero, and PERFECT lands on the frame it
            does. ⛔ It is a `LIN` drain that finishes ON the score word, not an
            ease that arrives already slowing (§23). */}
        <BossBar p={p} y={146} k={1 - E(f, THROUGH, SCORE, 0.30, 1, LIN)} f={f} z={90}
          flash={cl(hit(f, THROUGH, 8) + hit(f, SCORE, 10))}
          name={win ? "K.O." : "THE BOSS"} />
        {f >= THROUGH && <Hit x={716} y={480} f={f} at={THROUGH} s={1.9} z={93} dir={1} />}
        {f >= SCORE && <Hit x={760} y={540} f={f} at={SCORE} s={2.3} z={93} c={mxh(PERFECT, 0.4)} dir={1} />}
        <Rail p={p} x={286} y={252} w={452} z={18} k={railK} f={f} perfect={win}
          label={win ? R.perfect : ""} />
        {/* ⭐ HE GOES DOWN. The villain is beaten exactly once, at the peak. */}
        <Boss f={f} x={812} y={716} size={498} z={60} hurt={E(f, THROUGH, THROUGH + 6, 0, 1, IN_Q)}
          down={down} ph={0.5} />
        {/* the volley that lands — bigger than either of S8's, and it ARRIVES */}
        <Volley f={f} at={FIRE} n={14} x0={300} x1={740} y0={452} spread={280} z={70}
          c={PERFECT} s={1.5} life={22} />
        {f >= THROUGH && (<>
          <Ring x={720} y={470} f={f} at={THROUGH} c={mxh(PERFECT, 0.3)} s={1.9} dur={22} />
          <Ring x={720} y={470} f={f} at={THROUGH + 4} c={mxh(p.key, 0.34)} s={2.6} dur={28} />
          {Array.from({ length: 18 }, (_, i) => {
            const lf = f - THROUGH, a = (i / 18) * 6.283;
            return lf > 34 ? null : (
              <div key={"sk" + i} style={{ position: "absolute",
                left: 720 + Math.cos(a) * lf * 21, top: 470 + Math.sin(a) * lf * 15 + lf * lf * 0.4,
                width: 44, height: 30, borderRadius: 7, zIndex: 78,
                transform: `rotate(${a * 57 + lf * 7}deg)`, opacity: 1 - lf / 34,
                background: i % 2 ? mxh(PERFECT, 0.24) : mxh(TOKEN, 0.2) }} />
            );
          })}
        </>)}
        {/* ⛔ the bloom is CONTAINED — 6.3% of frame width, never a flash */}
        {win && (
          <div style={{ position: "absolute", left: 506 - 32, top: 262, width: 64, height: 64,
            borderRadius: "50%", zIndex: 94, opacity: 0.72 * (1 - Math.min(1, (f - SCORE) / 16)),
            background: `radial-gradient(circle, ${hexa(PERFECT, 0.9)} 0%, ${hexa(PERFECT, 0)} 70%)` }} />
        )}
        {/* ⛔ 0.49 — PERFECT landed at f36 of 58 and the shot coasted. The crowd
            FLOODS DOWN out of the stands onto the floor across the last twenty
            frames, LIN, still arriving at the cut. It is the biggest mass of
            moving bodies in the reel and it is what winning looks like. */}
        {Array.from({ length: 9 }, (_, i) => {
          const at = SCORE + 2 + i * 2;
          if (f < at) return null;
          const t = E(f, at, dur + 16, 0, 1, LIN);
          return (
            <div key={"fl" + i} style={{ position: "absolute",
              left: 60 + i * 104 + Math.sin(i * 2.1) * 26,
              top: 300 + t * 420, zIndex: 58, opacity: 1,
              transform: `rotate(${Math.sin(i + f / 8) * 12}deg)` }}>
              <Crew f={f} x={0} y={0} i={i} size={126 + (i % 3) * 34} z={58} at={at}
                loop={2} cheer={1} tint={i % 2 ? dkh(CLAY, 0.2) : undefined} />
            </div>
          );
        })}
        {/* the party — and the one who landed it is LIFTED by it */}
        <Alive f={f} ax={196} ay={800} ph={0.3} z={56}>
          <Hero f={f} x={196} y={800} size={264} z={56} costume={{ constr: 1 }} act={2}
            cheer={win ? 1 : 0.2} lift={win ? E(f, SCORE, SCORE + 8, 0, 92, BACK) : 0}
            gaze={-0.2} />
        </Alive>
        {[386, 548].map((bx, i) => (
          <Alive key={"c" + i} f={f} ax={bx} ay={796} ph={i * 2.1 + 1} z={54}>
            <Crew f={f} x={bx} y={796} i={i + 3} size={224} z={54} at={-12} loop={2}
              cheer={win ? 1 : 0.2} />
          </Alive>
        ))}
      </Shot>
    </Scene>
  );
};

/* =========================================================================
   S11 — 22.40 -> 23.73s (40f) · TIGHT · COST
   VO: "This burns through tokens fast,"
   EVENT: the slot, close, EATING. The stack drops and it is still dropping when
   the scene cuts.
   ⛔⛔ NO CURRENCY AND NO FIGURE — the VO names none, and a number here reads
   as the price of the run we just watched. ⭐ And the pun is not a pun: the
   word "tokens" is the same word in both halves of the sentence.
   ====================================================================== */
export const S11: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("retry");
  /* ⛔⛔ ALEX ON v2: *"the coin scene at twenty three seconds, it's just not good.
     Doesn't feel polished. Doesn't feel particularly that interesting. The world
     building around this entire scene is just not that good."*
     ⭐ THE DIAGNOSIS: it was a cabinet and a stack in an empty brown room, and
     it did not say what the tokens are FOR. Rebuilt as the CONTINUE SCREEN of
     the fight: the slot eats, and every token it eats REFILLS A FIGHTER'S BAR
     and stands him back up. That is the same object doing the reel's actual
     job — the cost and the thing it buys, in one frame — and it is the beat
     S9 has been spending without ever showing the price.
     ⛔ Still NO currency and NO figure. It is a stack that empties. */
  const left = E(f, 2, dur + 16, 0.94, 0.04, LIN);
  const REVIVE = [1, 14, 27];
  return (
    <Scene p={p} slug="" push={[0, dur, 1.06]} vig={0.50} glow={hexa(TOKEN, 0.3)}>
      <Shot k="S11">
        <Arena p={p} f={f} lit={0.62} dais={false} rig dx={PAR_X[v]} mark={1} />
        <Stands p={p} f={f} y={182} z={20} lit={0.5} react={0.2} />
        {/* the slot, off to one side now — it is the CAUSE, not the subject */}
        <TokenSlot p={p} x={-70} y={300} s={1.12} z={62} f={f} left={left} />
        {/* the stream of tokens going in, continuously */}
        {Array.from({ length: 10 }, (_, i) => {
          const t = ((f * 11.5 + i * 19) % 104) / 104;
          return (
            <div key={"in" + i} style={{ position: "absolute",
              left: 460 - t * 380, top: 250 + Math.sin(t * 3.1) * 46 + t * t * 150,
              width: 84, height: 24, borderRadius: "50%", zIndex: 70,
              transform: `rotate(${t * 300}deg)`, opacity: t > 0.9 ? 0 : 1,
              background: `linear-gradient(180deg, ${mxh(TOKEN, 0.32)} 0%, ${dkh(TOKEN, 0.18)} 100%)`,
              border: `4px solid ${dkh(TOKEN, 0.36)}` }} />
          );
        })}
        {/* ⭐ AND WHAT THE TOKENS BUY: three fighters stand back up, one per
            token, their bars refilling as they do. The scene now has a cast,
            an event per fighter, and a reason to exist. */}
        {[470, 664, 858].map((bx, i) => {
          const at = REVIVE[i];
          const up = f >= at ? E(f, at, at + 9, 0, 1, BACK) : 0;
          return (
            <React.Fragment key={"rv" + i}>
              <Pad p={p} x={bx} y={786} r={92} z={22} f={f}
                k={f >= at - 6 ? E(f, at - 6, at, 0, 1, IN_Q) - E(f, at + 6, at + 22, 0, 1, OUT) : 0} />
              <div style={{ position: "absolute", inset: 0, zIndex: 54,
                transform: `scaleY(${0.24 + up * 0.76}) scale(${1 + breath(f, i * 1.7)})`,
                transformOrigin: `${bx}px 792px` }}>
                <Crew f={f} x={bx} y={792} i={i + 2} size={216} z={54} at={-12}
                  loop={f >= at + 6 ? 2 : 3} cheer={up * 0.5} />
              </div>
              <HP x={bx} y={792 - 216 * 1.06} w={124} f={f} z={94}
                k={f >= at ? E(f, at, at + 10, 0, 1, IN_Q) : 0}
                flash={cl(hit(f, at, 6))} ko={f < at} />
              {f >= at && <Ring x={bx} y={772} f={f} at={at} c={mxh(TOKEN, 0.34)} s={1.1} dur={16} />}
              {f >= at && <Puff x={bx} y={790} f={f} at={at} c={p.grit} n={8} s={0.9} up={54} />}
            </React.Fragment>
          );
        })}
      </Shot>
      <Motes x={506} y={280} w={720} h={420} n={16} f={f} z={80} c={mxh(TOKEN, 0.4)} />
    </Scene>
  );
};

/* =========================================================================
   S12 — 23.73 -> 25.30s (47f) · CLOSE · ADVICE
   VO: "so you should only build your basic prototype first,"
   EVENT: one Claude alone in a side room, hitting a training dummy by hand, four
   honest hits. ⭐ THE ARENA IS DARK AND EMPTY BEHIND HIM, and that is the beat:
   the expensive thing is switched off.
   ====================================================================== */
export const S12: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("prep");
  /* ⛔⛔⛔ ALEX: *"the animation at twenty four seconds needs to be completely
     removed and replaced with a way better concept."* It was a Claude hitting a
     training dummy — a fight prop standing in for an idea, and the idea is not
     about fighting at all. The line is:
         "so you should only build your basic prototype first"
     ⭐ THE REPLACEMENT IS THE SUBJECT ITSELF: he builds the ROUGH VERSION of the
     very thing the arena has been throwing all reel — a grey wireframe app,
     assembled by hand, panel by panel, on a bench, alone, with the arena dark
     behind him. It is the SAME `AppWin` component at `rough={0}`, so the crude
     one is visibly the finished one before the loop ran, and S13 then sends
     exactly this object in and brings it back coloured. The prototype, the
     polish and the thing being polished are finally one object.
     ⛔ And it costs NOTHING: no token in the slot, no crowd, no boss bar. */
  /* ⛔ 0.58, THE SECOND WORST OPENER. He stood still until f8. The first panel
     lands on frame 1 and he is already mid-swing when the scene cuts in. */
  const PANEL = [1, 12, 23, 35];
  const built = PANEL.reduce((a, at) => a + (f >= at ? 1 : 0), 0);
  const hitAt = PANEL.reduce((a, at) => (f >= at && f < at + 5 ? at : a), -99);
  const strain = cl(PANEL.reduce((a, at) => a + hit(f, at, 11), 0));
  return (
    <Scene p={p} slug="" push={[0, dur, 1.06]} vig={0.56} glow={hexa(p.key, 0.22)}>
      <Shot k="S12">
        <Arena p={p} f={f} lit={0.14} dais={false} rig={false} dx={PAR_X[v]} mark={0.5} />
        {/* the arena beyond, visibly OFF */}
        <div style={{ position: "absolute", left: 636, top: 196, width: 440, height: 460, zIndex: 24,
          borderRadius: 10, background: `linear-gradient(180deg, ${dkh(p.back2, 0.66)} 0%, ${dkh(p.back2, 0.84)} 100%)`,
          border: `7px solid ${dkh(p.back2, 0.54)}` }}>
          <div style={{ position: "absolute", left: 24, top: 22, ...mono(20, 800),
            color: dkh(p.key, 0.6), letterSpacing: 4 }}>ARENA · OFF</div>
        </div>
        {/* the bench he works on */}
        <div style={{ position: "absolute", left: 40, top: 618, width: 520, height: 26, zIndex: 40,
          borderRadius: 4, background: `linear-gradient(180deg, ${mxh(OXIDE, 0.2)} 0%, ${dkh(OXIDE, 0.34)} 100%)` }} />
        <div style={{ position: "absolute", left: 66, top: 644, width: 20, height: 132, zIndex: 39,
          background: dkh(OXIDE, 0.44) }} />
        <div style={{ position: "absolute", left: 500, top: 644, width: 20, height: 132, zIndex: 39,
          background: dkh(OXIDE, 0.44) }} />

        {/* ⭐ THE PROTOTYPE, GOING TOGETHER PANEL BY PANEL. Each hit lands one
            more piece of the SAME object the arena throws — grey, crossed-out
            hero, no colour. It is finished and useless-looking by f36, which is
            exactly what a prototype is. */}
        <div style={{ position: "absolute", inset: 0, zIndex: 58,
          transform: `scaleY(${squash(f, hitAt, 0.10, 3, 9)})`, transformOrigin: "290px 618px" }}>
          {built >= 1 && <AppWin x={150} y={352} w={286} z={58} f={f} rough={0} tilt={-2} />}
          {/* the pieces that have not landed yet are literally not there */}
          {built < 4 && (
            <div style={{ position: "absolute", left: 150, top: 352,
              width: 286, height: 286 * 0.72 * (1 - built / 4), zIndex: 59,
              background: dkh(p.back2, 0.5), borderRadius: 6, opacity: 0.92 }} />
          )}
        </div>
        {PANEL.map((at, i) => f >= at && (
          <React.Fragment key={"pn" + i}>
            <Ring x={292} y={456} f={f} at={at} c={mxh(GOLD, 0.3)} s={0.8} dur={13} />
            <Puff x={292} y={470} f={f} at={at} c={p.grit} n={7} s={0.8} up={36} />
            {Array.from({ length: 5 }, (_, k) => {
              const lf = f - at;
              if (lf < 0 || lf > 22) return null;
              const a = (k / 5) * 3.14 - 1.57;
              return <div key={"sw" + k} style={{ position: "absolute",
                left: 292 + Math.cos(a) * lf * 8.4, top: 448 + Math.sin(a) * lf * 4.6 + lf * lf * 1.0,
                width: 22, height: 10, zIndex: 72, borderRadius: 5,
                transform: `rotate(${lf * 20}deg)`, opacity: 1 - lf / 22,
                background: mxh(GOLD, 0.24) }} />;
            })}
          </React.Fragment>
        ))}
        {/* he is BUILDING it, not fighting — act 1, a real swing, alone */}
        <Alive f={f} ax={612} ay={730} ph={0.6} z={62}>
          <Hero f={f} x={612} y={730} size={296} z={62} costume={{ constr: 1 }} act={1}
            reach={124} drive={hitAt > -50 ? 0.94 : 0.3} strain={strain}
            lift={-26 * strain} flip gaze={0.5} />
        </Alive>
        <Contact x={612} y={742} w={234} z={30} o={0.34} />
        {/* ⭐ AND HE PICKS IT UP AND CARRIES IT OUT. The last panel lands at f36
            of 47; from f39 the prototype LIFTS off the bench and travels toward
            the arena on a LIN that finishes past the cut — which is exactly the
            object S13 opens on. */}
        {f >= 39 && (
          <div style={{ position: "absolute", inset: 0, zIndex: 76,
            transform: `translate(${E(f, 39, dur + 14, 0, 300, LIN)}px, ${-E(f, 39, dur + 14, 0, 210, LIN)}px) rotate(${E(f, 39, dur + 14, 0, -12, LIN)}deg)` }}>
            <AppWin x={150} y={352} w={286} z={76} f={f} rough={0} tilt={-2} />
          </div>
        )}
      </Shot>
      <Motes x={380} y={280} w={520} h={400} n={14} f={f} z={80} c={mxh(p.key, 0.4)} />
    </Scene>
  );
};

/* =========================================================================
   S13 — 25.30 -> 27.47s (65f) · WIDEST · CLIMAX OF SCALE
   VO: "then trigger the boss loop to polish the final product."
   EVENT: he SLAMS the token in and the whole arena comes up at once — the rig,
   the crowd, eight pads firing, volleys crossing, the rail climbing.
   ⛔ EVERYTHING ON SCREEN MOVES (§27) — measure the FLOOR, not the mean.
   ====================================================================== */
export const S13: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("perfect");
  const TRIG = 1, POLISH = 34;
  const on = E(f, TRIG, TRIG + 4, 0, 1, IN_Q);
  const railK = E(f, POLISH, dur + 10, 0.3, 1, LIN);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.08]} vig={0.47} glow={hexa(PERFECT, 0.3)}>
      <Shot k="S13">
        <Arena p={p} f={f} lit={on} dais rig dx={PAR_X[v]} />
        <Stands p={p} f={f} y={182} z={20} lit={on}
          react={on * (0.4 + 0.6 * Math.abs(Math.sin(f / 7)))} />
        <Rail p={p} x={286} y={252} w={452} z={18} k={railK} f={f} perfect={railK > 0.94}
          label={railK > 0.94 ? R.perfect : ""} />
        <Boss f={f} x={824} y={716} size={470} z={60} guard={on * 0.5} ph={0.3} />
        {/* eight pads firing at once, staggered across the whole shot */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const at = TRIG + 4 + SURGE_ORDER[v][i] * 5;
          const back = i >= 4;
          const bx = 110 + (i % 4) * 168 + (back ? 74 : 0);
          const by = back ? 588 : 774;
          return (
            <React.Fragment key={"s" + i}>
              <Pad p={p} x={bx} y={by - 8} r={back ? 62 : 88} z={back ? 21 : 30} f={f}
                k={f >= at - 6 ? E(f, at - 6, at, 0, 1, IN_Q) - E(f, at + 5, at + 18, 0, 1, OUT) : 0} />
              {f >= at && (
                <Alive f={f} ax={bx} ay={by} ph={i * 1.7} z={back ? 38 : 52}>
                  <Crew f={f} x={bx} y={by} i={i} size={back ? 136 : 206} z={back ? 38 : 52}
                    at={at} loop={loopFor(i)} cheer={0.5}
                    tint={back ? dkh(CLAY, 0.28) : undefined} />
                </Alive>
              )}
            </React.Fragment>
          );
        })}
        {/* volleys crossing continuously, at rate */}
        {[TRIG + 10, TRIG + 24, TRIG + 38, TRIG + 50].map((at, i) => (
          <Volley key={"vy" + i} f={f} at={at} n={10} x0={280} x1={740}
            y0={440 + (i % 2) * 60 + SURGE_Y[v]} spread={230} z={70} c={PERFECT}
            s={1.3} life={20} />
        ))}
        {/* ⭐⭐ THE PROTOTYPE FROM S12 GOES IN GREY AND COMES BACK COLOURED. It is
            the same `AppWin` component, `rough` running 0 -> 1 across the
            polish word — so "then trigger the boss loop to polish the final
            product" is the literal thing on screen, and the two scenes are one
            object rather than two pictures. */}
        <div style={{ position: "absolute", inset: 0, zIndex: 74,
          transform: `translateY(${-E(f, POLISH - 14, dur + 6, 0, 190, LIN)}px)` }}>
          <AppWin x={378} y={470} w={268} z={74} f={f}
            rough={E(f, POLISH, POLISH + 12, 0, 1, IN_Q)}
            hue={PERFECT} tilt={-2} />
        </div>
        {f >= POLISH + 12 && <Ring x={512} y={568} f={f} at={POLISH + 12}
          c={mxh(PERFECT, 0.34)} s={1.5} dur={20} />}
        {/* he throws the switch */}
        <Alive f={f} ax={112} ay={790} ph={0.4} z={70}>
          <Hero f={f} x={112} y={790} size={252} z={70} costume={{ constr: 1 }} act={1}
            reach={118} drive={E(f, TRIG - 5, TRIG, 0, 1, IN_Q) - E(f, TRIG + 4, TRIG + 14, 0, 1, OUT)}
            strain={cl(E(f, TRIG - 5, TRIG + 1, 0, 1, IN_Q) - E(f, TRIG + 3, TRIG + 13, 0, 1, OUT))}
            lift={-E(f, TRIG - 5, TRIG + 1, 0, 40, IN_Q) + E(f, TRIG + 2, TRIG + 11, 0, 56, BACK)}
            cheer={railK} gaze={0.3} />
        </Alive>
        <TokenSlot p={p} x={-52} y={356} s={0.7} z={62} f={f} left={1 - on * 0.5} />
      </Shot>
    </Scene>
  );
};

/* =========================================================================
   S14 — 27.47 -> 29.00s (46f) · MED · CTA
   VO: "Comment BOSS for the free guide."
   ⛔ HARD CUT ON THE KEYWORD: shot A from f0, shot B punches in on "BOSS" at
   local f4. ⛔ The background process never stops — the crowd is still going.
   ====================================================================== */
export const S14: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("arena");
  const KW = 4;
  const punch = f >= KW ? 1.06 : 1;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.47} glow={hexa(NEON, 0.3)}>
      <Shot k="S14">
        <Cam s={punch} z={20}>
          <Arena p={p} f={f} lit={1} dais rig dx={PAR_X[v]} />
          <Stands p={p} f={f} y={182} z={20} lit={1}
            react={0.5 + 0.5 * Math.abs(Math.sin(f / 6))} />
          <Rail p={p} x={286} y={248} w={452} z={18} k={1} f={f} perfect label={R.perfect} />
          {/* the boss, down, behind them — beaten once and staying down */}
          <Boss f={f} x={840} y={724} size={430} z={40} down={1} ph={0.2} />
          {/* the party facing OUT for the first time in the reel */}
          {[136, 330, 524].map((bx, i) => (
            <Alive key={"c" + i} f={f} ax={bx} ay={796} ph={i * 1.7} z={54}>
              <Crew f={f} x={bx} y={796} i={i} size={232} z={54} at={-12} loop={2} cheer={0.85}
                tint={i > 1 ? dkh(CLAY, 0.2) : undefined} />
            </Alive>
          ))}
          {[136, 330, 524].map((bx, i) => <Contact key={"ct" + i} x={bx} y={806} w={186} z={30} o={0.34} />)}
        </Cam>
      </Shot>
      {/* the keyword, on its own onset, centred, in the reserved band */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 138, zIndex: 94,
        display: "flex", justifyContent: "center",
        transform: `scale(${squash(f, KW, 0.2, 3, 11)})` }}>
        {/* ⛔ ALEX: *"the boss thing at the end with the container part with the
            text needs to be bigger."* It is the KEYWORD — the one string the
            whole funnel depends on a viewer reading on a phone. 56px in a 34px
            box was sized like a chip; at 96px in a 56px box it is the largest
            piece of type in the reel, which is what a CTA keyword should be. */}
        <div style={{ padding: "26px 56px", borderRadius: 16, background: mxh(CREAMB, 0.04),
          border: `8px solid ${dkh(NEON, 0.2)}`, boxShadow: SH,
          ...mono(96, 800), color: INK, letterSpacing: 10 }}>{R.keyword}</div>
      </div>
      {f >= KW && <Ring x={506} y={176} f={f} at={KW} c={mxh(NEON, 0.3)} s={1.1} dur={18} />}
    </Scene>
  );
};
