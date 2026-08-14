import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { inter, fraunces } from "./fonts";
import { MONO } from "./SlopKit";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, mxh, dkh, SH, SH_D, rnd,
  CLAY, GOLD, GREEN, RED, SKY, PAPER, INK, MUTE,
  STEEL, STEELD, STEELL, CREAMP, CREAMD, CREAML, HAZARD, COPPER, PEG, PEGD, LAMPC, BOLT,
  Hall, Spot, BackWall, Scene, Cam, Beam, Motes, Chip, Plate, BigNum, Contact,
  Mark, MarkCast, usePlace, Bench, BayLine, Pegboard, Gantry, Tile, RepoPlate,
  MODULES, APIS, TOOLS, PROVIDERS, ADD_CMD, TRAYS, TOTAL_STARS, SPRITE_COSTUME, modOf,
} from "./PlgWorld";
import { ThemeSet, HeroRig, usePlaceT, useTheme, ClaimBoard } from "./PlgThemes";
import { ProviderGrid, RollCount, CapacityBar, MissingIcons, MemoryThread, PluginCard,
         NamedProviders, FreeTierIcons, alarmLevel, AlarmOverlay, ConfigSlot } from "./PlgDepict";
import {
  rock, sway, shake, Guy, Sheen, NumPlate, BayPlate, CapabilityBank, Gauge,
  KeyWall, KeyHook, FreeTag, Loom, Socket, SpineWall, SearchBeam, RankRail,
  HandCard, Spool, Press, Wafer, TrayRack, JobCard, Receipt, ScanBar, Trolley, TravelBand,
} from "./PlgProps";

/* ===========================================================================
   REEL 104 "PLUGIN" · THE BODY.  Board: storyboards/104-plugin.md.

   ⛔⛔ EVERY EVENT FRAME BELOW IS A MEASURED WORD ONSET from
      src/words_plugin.json, converted to LOCAL frames, with the PICTURE LEADING
      THE ONSET BY 4 FRAMES so the crossover — not the start — lands on the
      syllable ([[free-reel]]).
      root onsets (s): Stop 0.00 · If 2.69 · First 6.81 · Gemini 11.37 ·
                       One 13.70 · Second 17.78 · And 22.29 · so 23.94 ·
                       To 27.36 · comment 28.55
      scene `at` (frames, lead-4): 0 / 77 / 200 / 337 / 407 / 529 / 665 / 714 /
                       817 / 868.   TOTAL 920 (30.67s).

   ⛔⛔ THE STAGE, MEASURED — NOT GUESSED. The panel is 1012 x 792. The root
      header pill owns y 0..112 and the slug owns y 730..792, so every hero
      object in this file lives inside **y 118..726**, and every geometry is
      derived from that band and from its place's horizon.

   ⛔⛔ THE `push` RANGE IS SCENE-LOCAL, NOT SHOT-LOCAL — `Scene` reads
      useCurrentFrame(), which restarts per SEQUENCE, not per hard cut. S0's
      three shots therefore share ONE continuous push across the whole scene, so
      no shot inherits a completed range and ships a frozen camera (reel 98
      shipped 9 of 15 shots that way, and reel 103 did it again after writing
      the warning into its own file header).
   ⛔ RAISING THE PUSH RE-CROPS EVERY SCENE ([[trade-reel]]: 1012/k visible). The
      values below were set once and every scene's framing re-checked after.

   ⛔ THE MOVE BUDGET IS THREE. S1 pushes into the bank, S5 pushes onto the rank
      rail, S8 pulls back on the reveal. Every other scene is LOCKED with only
      the mandatory continuous in-panel push. One subject moves at a time.
   ========================================================================= */

/* ⛔ NO WHITE PLATE, NO IRIS, NO FULL-FRAME FLASH
   ([[feedback_no_flashing_transitions]]): peak opacity 0.26, ramps in AND out,
   never pure white and never pure black. */
const Flash: React.FC<{ lf: number; at: number; n?: number; o?: number; c?: string }> =
  ({ lf, at, n = 9, o = 0.26, c = "#F6E8CE" }) => {
  const k = E(lf, at, at + 3, 0, 1, OUT) - E(lf, at + 3, at + n, 0, 1, IO);
  if (k <= 0.01) return null;
  return <div style={{ position: "absolute", inset: 0, zIndex: 96, pointerEvents: "none",
    background: hexa(c, o * k) }} />;
};

/* ==================================================================== S0 ===
   0.00 -> 2.57s · 77f · ONE CONTINUOUS SHOT · HOOK
   "Stop using Claude Code until you've installed these three plugins."

   ⛔⛔ THIS SCENE WAS THREE HARD CUTS AND IT WAS REJECTED. Alex: *"the first few
      scenes are way too boring, it's just cuts and then nothing happens. It
      should just be ONE scene but then something actually interesting HAPPENS."*

   ⭐⭐ AND THAT IS A REAL CORRECTION TO docs/THE-OPEN.md, WHICH SAYS "three to
      four shots, never one". The doc is right that a single establishing wide is
      a poster — but it does not cover the failure it caused here: FOUR framings
      in which nothing happens is just four posters in a row. A cut is not an
      event. The doc's rule optimises the thing that is easy to count (shots) and
      misses the thing that matters (does anything HAPPEN).
      ⛔ So this open deliberately departs from that doc: ONE locked framing,
      2.57s, with a real event that has a beginning, a middle and an end.

   THE EVENT: the wall is full of Claude Code plugins and the rig below it has
   three empty bays. Three boxes EJECT from the wall, arc across the frame and
   SLAM down onto the counter one-two-three, and each lands showing its real
   name and its real star count.
   ⛔ THE PAYOFF IS STILL NOT SPENT: they land ON the counter, not IN the bays.
      The bays are empty at frame 0 and still empty at 2.57s. Nothing is
      installed until 13.7s and all three only at 27.4s.
   ⭐ It is also the answer to *"has to be clear we are a vid about plugins"*:
      by 1.4s the frame holds a wall of plugin boxes, a CLAUDE CODE fascia, three
      named plugins with star counts, and three visibly empty bays.
   ========================================================================= */
export const S0Hook: React.FC = () => {
  const f = useCurrentFrame();
  const theme = useTheme();
  const p = usePlaceT("hero");
  const HZ = p.horizon;
  /* the three ejections, staggered. Each: leave the wall -> arc -> SLAM -> rock */
  /* every arrival pulled forward: first lands at 0.50s, all three by 1.10s,
     and frame 0 itself now opens on a hit rather than on a still life. */
  const OUT_AT = [2, 8, 14];
  const LAND = [15, 24, 33];
  const LX = [78, 386, 694];
  const sk0 = shake(f, 0, 13, 9);          /* ⭐ the reel opens ON an impact */
  const sk = shake(f, LAND[0], 7, 6);
  const sk2 = shake(f, LAND[1], 8, 6);
  const sk3 = shake(f, LAND[2], 11, 9);
  return (
    <Scene p={p} slug="" push={[0, 77, 1.115]} vig={0.42}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1,
        transform: `translate(${sk0.x + sk.x + sk2.x + sk3.x}px, ${sk0.y + sk.y + sk2.y + sk3.y}px)` }}>
        <ThemeSet role="hero" p={p} f={f} lightX={0.44} />

        {/* ⭐ FRAME 0 IS AN EVENT, NOT A POSE. A shockwave leaves the wall on the
            first frame and the three plugins come out of it — so the most-watched
            second of the reel opens mid-action instead of on a still life. */}
        {f < 22 && (() => {
          const r = f / 22;
          return (<>
            <div style={{ position: "absolute", left: 506 - 900 * r, top: 300 - 380 * r,
              width: 1800 * r, height: 760 * r, borderRadius: "50%", zIndex: 58,
              border: `${Math.max(1, 14 * (1 - r))}px solid ${hexa("#FFFFFF", 0.46 * (1 - r))}` }} />
            <div style={{ position: "absolute", left: 506 - 640 * r, top: 300 - 270 * r,
              width: 1280 * r, height: 540 * r, borderRadius: "50%", zIndex: 57,
              border: `${Math.max(1, 9 * (1 - r))}px solid ${hexa(GOLD, 0.40 * (1 - r))}` }} />
          </>);
        })()}

        {/* the rig, front and low — three bays, EMPTY, and they stay empty */}
        <HeroRig x={theme === "mkt" ? 172 : theme === "mch" ? 296 : 186}
          y={theme === "mkt" ? 428 : 214}
          f={f} s={theme === "mkt" ? 0.88 : theme === "mch" ? 0.66 : 0.76}
          z={60} seat={[0, 0, 0]} lit={[0, 0, 0]} label="NOTHING INSTALLED" />
        {theme !== "mkt" && (
          <ClaimBoard f={f} y={508}
            sub={theme === "mch" ? "THREE BAYS, ALL EMPTY" : "THREE SLOTS, ALL EMPTY"} />
        )}

        {/* ⭐ THE EVENT — three plugins come off the wall and land on the counter */}
        {MODULES.map((m, i) => {
          const outk = E(f, OUT_AT[i], LAND[i], 0, 1, IN_Q);        /* the travel  */
          const land = f >= LAND[i];
          const rk = rock(f, LAND[i], 7.5, 20);                     /* it never parks */
          const sx = 300 + i * 190, sy = 214;                       /* where it sat  */
          const x = sx + (LX[i] - sx) * outk;
          const LANDY = theme === "mkt" ? 290 : 336;
          const y = sy + (LANDY - sy) * outk * outk;                  /* falls, not floats */
          const squash = land ? 1 + Math.sin(Math.max(0, f - LAND[i]) / 2.6)
            * 0.13 * Math.exp(-Math.max(0, f - LAND[i]) / 9) : 1;
          if (f < OUT_AT[i]) return null;
          return (
            <div key={"ev" + i} style={{ position: "absolute", left: x, top: y, zIndex: 76,
              transform: `rotate(${(1 - outk) * -16 + rk * 0.6}deg) scaleY(${2 - squash}) scaleX(${squash})`,
              transformOrigin: "50% 100%" }}>
              {/* ⭐ each card's FACE is a miniature of what that plugin does — a
                  provider list, a search returning a ranked result, a session
                  carrying into the next chat. Three identical rectangles carried
                  one bit of information; these carry the whole premise. */}
              <PluginCard i={i} w={250} h={150} f={f} />
              {/* the dust puff AND an expanding shockwave ring — an arrival has
                  to read as an arrival, not as an appearance */}
              {land && f < LAND[i] + 12 && (
                <div style={{ position: "absolute", left: -26, top: 126, width: 290, height: 34,
                  borderRadius: "50%", background: hexa("#FFFFFF", 0.22 * (1 - (f - LAND[i]) / 12)) }} />
              )}
              {land && f < LAND[i] + 18 && (() => {
                const r = (f - LAND[i]) / 18;
                return (
                  <div style={{ position: "absolute", left: 125 - 200 * r, top: 138 - 56 * r,
                    width: 400 * r, height: 112 * r, borderRadius: "50%",
                    border: `${Math.max(1, 7 * (1 - r))}px solid ${hexa("#FFFFFF", 0.42 * (1 - r))}` }} />
                );
              })()}
            </div>
          );
        })}

        {/* ⭐⭐ THREE CLAUDES WORKING THE EMPTY BAYS. Each has a job and its own
            rhythm — one bobs up out of the slot, one paces the lip, one keeps
            ducking in and out — and all three look UP and flinch when a plugin
            lands above them. Frame 0 now has three characters in it doing
            something, not three dark rectangles. */}
        {[0, 1, 2].map((i) => {
          const BX = theme === "mkt" ? 226 + i * 180 : theme === "mch" ? 320 + i * 90 : 250 + i * 200;
          const BY = theme === "mkt" ? 556 : theme === "mch" ? 292 : 300;
          /* each one moves on its own clock so they never look synchronised */
          const bob = Math.sin((f + i * 19) / (11 + i * 2.4)) * (i === 1 ? 5 : 13);
          const duck = i === 2 ? Math.max(0, Math.sin((f + 8) / 15)) * 26 : 0;
          const pace = i === 1 ? Math.sin(f / 17) * 26 : 0;
          /* they flinch when the plugin above them lands */
          const landed = f >= LAND[i];
          const flinch = landed ? E(f, LAND[i], LAND[i] + 5, 0, 1, OUT)
            * (1 - E(f, LAND[i] + 5, LAND[i] + 20, 0, 1, OUT)) : 0;
          return (
            <div key={"bg" + i} style={{ position: "absolute", left: BX + pace,
              top: BY + bob + duck - flinch * 12, zIndex: 68 }}>
              <Guy x={0} y={0} s={0.42} z={2} f={f + i * 23}
                costume={[{ constr: 1 }, { glasses: 1 }, { chef: 1 }][i]}
                gaze={i === 1 ? 0.7 : -0.7} nodAmp={5.4} nodSpeed={8 + i}
                shock={flinch * 0.9} cheer={landed && !flinch ? 0.35 : 0} />
            </div>
          );
        })}

        {/* ⭐ the empty bays pulse in turn once the plugins are down — the beat
            that carries 1.1s-2.6s, and it points at where they still have to go */}
        {f > 34 && [0, 1, 2].map((i) => {
          const ph = ((f - 34) * 2.1 - i * 12) % 54;
          const k = Math.max(0, 1 - Math.abs(ph - 10) / 12);
          if (k <= 0.02) return null;
          const BX = theme === "mkt" ? 214 + i * 180 : theme === "mch" ? 322 + i * 108 : 214 + i * 196;
          const BY = theme === "mkt" ? 566 : 350;
          return (
            <div key={"bp" + i} style={{ position: "absolute", left: BX, top: BY, width: 150,
              height: 104, borderRadius: 11, zIndex: 66, pointerEvents: "none",
              border: `4px solid ${hexa(GOLD, 0.72 * k)}`, background: hexa(GOLD, 0.14 * k) }} />
          );
        })}

        {/* the counter they land on */}
        <div style={{ position: "absolute", left: -40, right: -40,
          top: theme === "mkt" ? 428 : 474, height: 14, zIndex: 70,
          background: mxh(CREAMD, 0.22), opacity: 0.92 }} />

        <Guy x={theme === "mch" ? 876 : 866} y={theme === "mkt" ? 214 : 168} s={0.58} z={80}
          f={f} costume={SPRITE_COSTUME.hook}
          gaze={-0.9} shock={E(f, LAND[0], LAND[0] + 8, 0, 0.55, OUT) * (1 - E(f, 56, 70, 0, 1, OUT))} />
        <Motes x={320} y={220} w={400} h={280} n={9} f={f} z={26} />
      </div>
    </Scene>
  );
};

/* ==================================================================== S1 ===
   2.57 -> 6.67s · 123f · WIDE, ONE MOTIVATED PUSH · SETUP (the internal enemy)
   "If you don't have these installed, you're only using about 40% of what
    Claude is actually capable of."

   ⛔⛔ AN ABSENCE CANNOT BE INTERESTING IF YOU DRAW THE LOGIC INSTEAD OF THE
      PICTURE ([[apple-reel]]: six blank sheets were the CORRECT logic and a
      dead shot). So the lit twelve PULSE IN SEQUENCE and the dark eighteen
      never answer — the shot is never static and what it shows is an absence
      that is behaving.
   ⛔ NO VILLAIN. The bank is furniture; nobody is drawn getting it wrong.
   ARC: the bank fills the frame as the camera pushes; the needle arrives and
      ROCKS rather than parking; three bay lamps stay dark throughout.
   ========================================================================= */
export const S1: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlaceT("state");
  const HZ = p.horizon;
  /* local onsets: only 46 (root 4.22) · 40% 60 (root 4.69) · capable 100 */
  /* ⛔⛔ TWO SHOTS, NOT ONE. Held as a single 123f framing this scene produced
     the open gate's two weakest seconds (6.8 and 6.4) and they land inside the
     five that decide whether the reel gets watched. The cut is on "40%". */
  const CUT_E = 61;
  const shotE = f >= CUT_E;
  const AL = alarmLevel(f, 2);            /* one alarm clock for the whole scene */
  return (
    <Scene p={p} slug="" push={[0, 123, 1.190]} vig={0.46}
      overlay={<AlarmOverlay level={AL} f={f} z={120} />}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        <ThemeSet role="state" p={p} f={f} lightX={shotE ? 0.28 : 0.50} />
        {/* the bank dominates: 30 cells, 12 lit, and the dark ones never answer */}
        {/* ⛔⛔ WAS A 6x5 GRID OF ANONYMOUS LAMPS. A lamp grid is a container:
            it says "some things are off" and nothing else, so the viewer learns
            nothing in four seconds. This is the same claim drawn as a READABLE
            LIST — three stock abilities ticked, and the three the reel is about
            sitting dark and NAMED, which also sets up the rest of the video. */}
        <div style={{ position: "absolute", inset: 0, zIndex: 34,
          transform: `translate(${shake(f, 74, 11, 12).x}px, ${shake(f, 74, 11, 12).y}px)` }}>
          {!shotE && (<>
            <CapacityBar x={70} y={224} w={872} h={132} f={f} at={2} lit={4} total={10} z={62} />
            <MissingIcons x={280} y={422} f={f} at={22} z={70} s={1.06} alarm={AL} />
          </>)}
        </div>
        <ScanBar y={144} h={382} f={f} period={78} z={37} c="#DCEFE9" o={0.30} w={330} />
        <ScanBar y={144} h={382} f={f} period={78} z={36} c="#FFFFFF" o={0.16} w={210} phase={39} />
        <Trolley y={116} f={f} period={168} z={38} w={182} h={62} c="#8FB6AE" hang={54} />
        <TravelBand y={556} h={22} f={f} speed={3.2} z={31} a="#7FB3A8" b="#3E7A72" pitch={40} />

        {/* ⭐ shot E cuts IN on the number and names the three that are off —
            the same information as shot D, at the scale the line deserves. */}
        {/* ⛔ NO "40%" ANYWHERE. Four of ten segments lit, a red stop where the
            fill dies, and six empty cells filling the frame. Counted, not read,
            and it still works muted ([[feedback_graphical_over_textual]]). */}
        {shotE && (<>
          <CapacityBar x={54} y={210} w={904} h={192} f={f} at={2} lit={4} total={10} z={62} />
          <MissingIcons x={268} y={452} f={f} at={4} z={70} s={1.24} alarm={AL} />
        </>)}
        <Flash lf={f} at={CUT_E} n={8} o={0.22} />
        {/* ⛔ the three bay lamps sit ON the bench, not floating at the sprite's
            head height where v1 put them — they read as two stray dark squares
            beside his face. They are the object the reel resolves, so they stay
            in frame, dark, for the whole scene. */}
        <div style={{ position: "absolute", left: 214, top: 630, zIndex: 60, display: "flex", gap: 22 }}>
          {[0, 1, 2].map((i) => (
            <div key={"bl" + i} style={{ width: 62, height: 46, borderRadius: 9,
              background: dkh(STEELD, 0.50), border: `4px solid ${dkh(STEELD, 0.30)}` }} />
          ))}
        </div>
        <Mark x={470} y={620} s={96} z={88} />
        <Guy x={806} y={438} s={0.86} z={78} f={f} costume={SPRITE_COSTUME.bank}
          gaze={-0.9} stern={0.8} shock={AL * 0.5} />

        <Motes x={300} y={230} w={420} h={300} n={10} f={f} z={24} />
      </div>
    </Scene>
  );
};

/* ==================================================================== S2 ===
   6.67 -> 11.23s · 137f · MEDIUM, LOCKED · ESCALATE 1a — the module arrives
   "First is Awesome APIs, which lists over 134 plus free AI APIs from over 40
    providers…"

   ⛔ THE CASCADE CROSSES THE FULL PANEL WIDTH. LARGE x BRIGHT x FAST is the only
      motion that registers; a bar filling scored +0.11 and 36 tiles crossing the
      frame scored +1.90 ([[feedback_scene_needs_an_arc]]).
   ARC: module lands and rocks -> the key wall fills left to right -> the
      counter rolls 0 -> 134+.
   ========================================================================= */
export const S2: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlaceT("one");
  const HZ = p.horizon;
  const m = modOf("apis");
  /* local: which 12 · lists 22 · 134 40 · providers 96 */
  const land = E(f, 0, 8, 0, 1, IN_Q);
  const rk = rock(f, 8, 6.2, 22);
  const sk = shake(f, 8, 11, 9);
  const fill = E(f, 26, 104, 0, 1, LIN);
  const n = Math.round(E(f, 34, 100, 0, 134, OUT));
  return (
    <Scene p={p} slug="" push={[0, 137, 1.170]} vig={0.44}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1,
        transform: `translate(${sk.x}px, ${sk.y}px)` }}>
        <ThemeSet role="one" p={p} f={f} lightX={0.36} />
        {/* the key wall — the background process, and the scene's real motion */}
        {/* ⭐⭐ THE VO'S VERB IS "LISTS": *"which LISTS over 134 free AI APIs
            from over 40 providers"*. v1 drew keys on hooks — a container for the
            idea of an API key. This is the repo's OWN provider table, real names
            and real free-model counts, scrolling. A viewer who pauses here
            learns which providers actually have a free tier. */}
        {/* ⭐⭐ "OVER 40 PROVIDERS", drawn as FORTY TILES LANDING. You count
            them. Each carries a real mark and a bar whose LENGTH is that
            provider's real free-model count — the table's information with
            every numeral removed. */}
        <ProviderGrid x={44} y={168} w={924} h={352} f={f} at={8} z={60} cols={8} rows={5} />
        <ScanBar y={160} h={368} f={f} period={84} z={62} c="#E4EAFB" o={0.14} w={300} />
        <TravelBand y={534} h={22} f={f} speed={3.3} z={26} a="#8894C6" b="#464F86" pitch={40} />
        <Bench y={HZ + 84} z={30} depth={38} />
        {/* the module lands on the bench with weight */}
        <div style={{ position: "absolute", left: 700, top: 574 - (1 - land) * 210, zIndex: 62,
          opacity: Math.min(1, land * 2.2), transformOrigin: "50% 100%",
          transform: `rotate(${rk * 0.6}deg)` }}>
          <div style={{ width: 250, height: 152, borderRadius: 12, background:
            `linear-gradient(166deg, ${mxh(m.accent, 0.26)} 0%, ${m.accent} 60%, ${dkh(m.accent, 0.28)} 100%)`,
            border: `5px solid ${dkh(m.accent, 0.40)}`, boxShadow: SH_D }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 20, textAlign: "center",
              fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 27, letterSpacing: "0.04em",
              color: "#FFFFFF" }}>{m.spoken}</div>
            <div style={{ position: "absolute", left: 24, right: 24, bottom: 20, height: 26,
              display: "flex", gap: 7 }}>
              {Array.from({ length: 6 }, (_, k) => (
                <div key={"r" + k} style={{ flex: 1, borderRadius: 3,
                  background: dkh(m.accent, 0.30), opacity: 0.85 }} />
              ))}
            </div>
          </div>
          <Mark x={62} y={-116} s={92} z={8} />
        </div>
        
        {/* the counter — one value, rolling to the repo's own figure */}
        {/* ⛔ THE COUNTER COUNTS PROVIDERS, NEVER THE SUM OF THE ROWS. 134+ is
            the repo's headline for APIs; the rows are per-provider MODEL counts
            and visibly add to more than that. Printing 134 over them would be a
            contradiction inside one frame. */}
        {/* the ONE numeral in the scene, and it rolls to its value */}
        <RollCount x={352} y={528} f={f} at={10} to={40} z={88} s={1.0} />
        {(() => {   /* the grid completing is an EVENT, so it gets a ring */
          const done = 96; const r = (f - done) / 22;
          if (f < done || r > 1) return null;
          return (
            <div style={{ position: "absolute", left: 506 - 620 * r, top: 344 - 250 * r,
              width: 1240 * r, height: 500 * r, borderRadius: "50%", zIndex: 64,
              border: `${Math.max(1, 9 * (1 - r))}px solid ${hexa("#FFFFFF", 0.34 * (1 - r))}` }} />
          );
        })()}
        <Guy x={786} y={392} s={0.84} z={78} f={f} costume={SPRITE_COSTUME.vault} gaze={-0.7} />
        <Motes x={400} y={200} w={380} h={260} n={8} f={f} z={26} />
      </div>
    </Scene>
  );
};

/* ==================================================================== S3 ===
   11.23 -> 13.57s · 70f · CLOSE, LOCKED · ESCALATE 1b — the real marks
   "…Gemini, Groq, and NVIDIA, all with a permanent free tier."

   ⭐ THE VO'S THREE PROVIDERS ARE THE REPO'S OWN DESCRIPTION, WORD FOR WORD, so
      [[feedback_real_marks_are_the_props]] is satisfied for free: three REAL
      marks on white tiles at 112px, nothing translated.
   ⛔ `PERMANENT FREE TIER` and `NO CREDIT CARD` are the README's own phrases.
   ARC: three keys swing forward one per onset, then the brass tag drops and
      keeps swinging — the shot never parks.
   ========================================================================= */
export const S3: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlaceT("oneb");
  const HZ = p.horizon;
  /* local (lead-4): Gemini 0 · Groq 12 · NVIDIA 22 · permanent 44 */
  const AT = [0, 12, 22];
  return (
    <Scene p={p} slug="" push={[0, 70, 1.130]} vig={0.42}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        <ThemeSet role="oneb" p={p} f={f} lightX={0.50} />
        {/* ⭐⭐ WAS THREE KEYS ON HOOKS — a container for the idea of an API
            key, carrying no information. The three real marks now come in at
            scale with their real free-model counts as BAR LENGTHS, and the
            free-tier claim lands as two icons: an open padlock (permanent) and
            a struck-through card (no card needed). No numerals, no labels. */}
        <TravelBand y={620} h={22} f={f} speed={3.2} z={26} a="#8894C6" b="#464F86" pitch={42} />
        <ScanBar y={150} h={400} f={f} period={78} z={64} c="#EAF0FF" o={0.20} w={310} />
        <NamedProviders x={116} y={162} f={f} at={2} z={70} />
        <FreeTierIcons x={330} y={462} f={f} at={40} z={88} s={1.10} />
        <Motes x={340} y={250} w={360} h={240} n={7} f={f} z={26} />
      </div>
    </Scene>
  );
};

/* ==================================================================== S4 ===
   13.57 -> 17.63s · 122f · MEDIUM, LOCKED · TURN 1 — bay one seats
   "One click setup in your Cursor, Claude Code, or Codex, and you never hit
    your paid limits ever again."

   ⛔ WHAT "ONE CLICK SETUP" HONESTLY LOOKS LIKE. The repo ships "ready-to-copy
      snippets for Claude Code, Cursor, Codex" — so the picture is the config
      LANDING IN THREE TOOLS, not an installer running. The three names are the
      repo's own list, on their real marks.
   ⛔ THE CONTACT LIGHT IS A SHAPED CONE, never a full-frame tint (reel 78 was
      rejected twice for a full-panel tint pulse).
   ARC: the module drives home -> bay 1 lights -> the loom whips across the full
      panel and three sockets take, one per onset.
   ========================================================================= */
export const S4: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlaceT("seat");
  const HZ = p.horizon;
  /* local (lead-4): One 0 · Cursor 24 · Claude-Code 36 · Codex 50 · never 74 */
  const seat = E(f, 4, 20, 0, 1, IN_Q);
  const lit = E(f, 19, 27, 0, 1, OUT);
  const sk = shake(f, 19, 12, 10);
  const TARGETS = [{ x: 214, y: 236 }, { x: 470, y: 200 }, { x: 742, y: 240 }];
  return (
    <Scene p={p} slug="" push={[0, 122, 1.175]} vig={0.44}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1,
        transform: `translate(${sk.x}px, ${sk.y}px)` }}>
        <ThemeSet role="seat" p={p} f={f} lightX={0.46} />
        <TravelBand y={640} h={20} f={f} speed={2.9} z={27} a="#C08560" b="#7E4A2E" pitch={38} />
        {/* the three tool sockets the loom plugs */}
        {TOOLS.map((t, i) => (
          <Socket key={t.t} x={TARGETS[i].x - 46} y={TARGETS[i].y - 46} f={f}
            at={30 + i * 28} tool={t} s={1.0} z={84} />
        ))}
        {/* ⭐ THREE CONFIG CARDS, THREE HOLES, SPREAD ACROSS THE WHOLE SCENE.
            at f26 / f54 / f82 — so 16-17s, which was dead air, now carries the
            third insertion and its seat ring. */}
        {TARGETS.map((t, i) => (
          <ConfigSlot key={"cfg" + i} from={{ x: 506, y: 470 }} to={{ x: t.x, y: t.y + 82 }}
            f={f} at={26 + i * 28} accent={MODULES[0].accent} z={82} />
        ))}
        {/* the loom whips out of the seated module across the full panel, and
            at f86 the config LOCKS — a second pulse runs back down every line so
            the scene's last third is not dead air. */}
        <Loom x={506} y={470} f={f} at={22} s={1} z={56} targets={TARGETS} />
        {f > 82 && TARGETS.map((t, i) => {
          const k = E(f, 86 + i * 4, 104 + i * 4, 0, 1, OUT);
          return (
            <div key={"lk" + i} style={{ position: "absolute", left: t.x - 76 * k, top: t.y - 76 * k,
              width: 152 * k, height: 152 * k, borderRadius: "50%", zIndex: 58,
              border: `${5 * (1 - k)}px solid ${hexa(GOLD, 0.72 * (1 - k))}` }} />
          );
        })}
        {/* the rig, three-quarter, at bay-plate height */}
        <div style={{ position: "absolute", left: 168, top: 396, width: 676, height: 214,
          borderRadius: 20, zIndex: 40, background:
            `linear-gradient(172deg, ${mxh(STEEL, 0.12)} 0%, ${dkh(STEEL, 0.28)} 100%)`,
          border: `6px solid ${dkh(STEEL, 0.44)}`, boxShadow: SH_D }} />
        <HeroRig x={196} y={392} f={f} s={0.90} z={60} seat={[seat, 0, 0]} lit={[lit, 0, 0]} />
        <Guy x={858} y={452} s={0.80} z={78} f={f} costume={SPRITE_COSTUME.fit}
          gaze={-0.8} cheer={E(f, 22, 34, 0, 0.5, OUT)} />
        <Motes x={330} y={210} w={400} h={240} n={8} f={f} z={26} />
      </div>
    </Scene>
  );
};

/* ==================================================================== S5 ===
   17.63 -> 22.17s · 136f · WIDE -> RAIL, ONE MOTIVATED PUSH · ESCALATE 2
   "Second is Find Skills. Just tell Claude what you're building and it finds
    and installs the right skills for you automatically."

   ⛔⛔ THIS IS THE SCENE THAT STOPS AT THE EDGE OF THE CLAIM. find-skills
      SEARCHES and RECOMMENDS — its own docs say it "identifies skills rather
      than automatically deploying them", and installing is a separate
      `npx skills add`. A frame showing a skill installing itself would disprove
      the reel inside the frame that speaks it ([[feedback_real_marks_are_the_props]],
      and the reel-95 rule: dramatise the mechanism, stop at the edge).
   ⭐ AND THE HONEST MECHANISM IS THE BETTER PICTURE. "It installs it" is one
      motionless event. A beam sweeping a whole library, six candidates scored on
      their real ranking key (install count) and RE-ORDERING live, then the
      winner handed over, is a scene with an arc.
   ARC: the ask -> the beam sweeps the full shelf width -> six candidates fly to
      the rail and re-order by installs -> the winner slides out and is HANDED
      over as the real command.
   ========================================================================= */
export const S5: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlaceT("two");
  const HZ = p.horizon;
  const m = modOf("skills");
  /* local (lead-4): Second 0 · Just 27 · building 44 · finds 68 · installs 82 */
  const beam = E(f, 12, 96, 0, 1, IO);
  return (
    <Scene p={p} slug="" push={[0, 136, 1.200]} vig={0.46}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        <ThemeSet role="two" p={p} f={f} lightX={0.40} />
        {/* the stacks — hundreds of spines, and the beam lights each as it passes */}
        <SpineWall x={44} y={150} w={924} h={330} f={f} beam={beam} z={20} seed={13} />
        <SearchBeam x={44} y={140} w={924} h={350} pos={beam} z={58}
          o={E(f, 10, 20, 0, 1, OUT) - E(f, 104, 126, 0, 1, OUT) * 0.55} />
        <Trolley y={188} f={f} period={150} z={42} w={176} h={58} c="#B07A56" hang={232} />
        <TravelBand y={496} h={24} f={f} speed={3.3} z={26} a="#B4685E" b="#6B2F34" pitch={42} />
        <Bench y={HZ + 106} z={26} depth={30} />
        {/* what the Claude asked for — the real trigger for this tool */}
        <div style={{ position: "absolute", left: 60, top: 508, zIndex: 86,
          opacity: E(f, 24, 34, 0, 1, OUT), padding: "12px 18px", borderRadius: 12,
          background: CREAMP, border: `3px solid ${CREAMD}`, boxShadow: SH }}>
          <div style={{ fontFamily: MONO, fontWeight: 800, fontSize: 13, letterSpacing: "0.18em",
            color: "#8A8071" }}>YOU SAY</div>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 25,
            color: "#221E17" }}>"I'm building a REST API"</div>
        </div>
        {/* the rank rail — ranked by the tool's OWN quality signal */}
        <RankRail x={62} y={196} f={f} at={66} s={1.0} z={86} />
        {/* ⛔ the install is HANDED OVER and taken by hand. Nothing self-installs. */}
        <HandCard x={536} y={520} f={f} at={92} s={1.0} z={94} />
        <div style={{ position: "absolute", left: 700, top: 168, zIndex: 84,
          opacity: E(f, 8, 20, 0, 1, OUT) }}>
          <Tile x={0} y={0} src="logos/vercel.svg" s={120} z={2} label="VERCEL-LABS" pad={0.24} />
        </div>
        <RepoPlate x={700} y={330} m={m} s={0.80} z={84} showOwner={false} />
        <Guy x={862} y={470} s={0.78} z={78} f={f} costume={SPRITE_COSTUME.stacks}
          gaze={-0.9} cheer={E(f, 96, 110, 0, 0.6, OUT)} />
        <Motes x={280} y={220} w={420} h={260} n={9} f={f} z={26} />
      </div>
    </Scene>
  );
};

/* ==================================================================== S6 ===
   22.17 -> 23.80s · 49f · MEDIUM, LOCKED · ESCALATE 3a — the press
   "And the third is Claude Mem, which gives Claude actual memory…"

   ⭐ THE REPO'S OWN THREE VERBS: captures what the session did, COMPRESSES it
      with AI, injects it into future sessions. This scene is the middle verb,
      drawn literally — spools go in, one wafer comes out.
   ARC: the belt runs (background process) -> the ram comes down with weight ->
      the wafer slides out warm.
   ========================================================================= */
export const S6: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlaceT("three");
  const HZ = p.horizon;                                        /* 592 */
  const m = modOf("mem");
  /* local (lead-4): And 0 · Claude-Mem 14 · memory 34 */
  const out = E(f, 30, 46, 0, 1, OUT);
  const sk = shake(f, 16, 10, 8);
  /* ⛔⛔ v1 OF THIS SCENE FLOATED. The belt sat at y=470 with the floor at 592,
     so a conveyor hung in mid-air over 120px of blank wall; the press was at
     y=188 with its anvil at 378, nowhere near the belt it was supposed to be
     pressing onto; the spools rode at 410 above both; and the module the whole
     scene is about was never drawn at all — only its plate. Rebuilt off ONE
     datum: BELT = 505, the press's anvil lands exactly on it (anvil top is
     press.y + 190), the conveyor stands on legs into the floor, and the spools
     ride the surface. */
  const BELT = 505;
  return (
    <Scene p={p} slug="" push={[0, 49, 1.105]} vig={0.44}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1,
        transform: `translate(${sk.x}px, ${sk.y}px)` }}>
        <ThemeSet role="three" p={p} f={f} lightX={0.54} />

        {/* the conveyor: legs into the floor so it is standing, not hovering */}
        {Array.from({ length: 5 }, (_, i) => (
          <div key={"lg" + i} style={{ position: "absolute", left: 60 + i * 220, top: BELT + 26,
            width: 20, height: HZ - BELT + 74, zIndex: 24,
            background: `linear-gradient(180deg, ${dkh(STEELD, 0.24)} 0%, ${dkh(STEELD, 0.46)} 100%)` }} />
        ))}
        {/* the belt — the background process; it runs for the whole scene */}
        <div style={{ position: "absolute", left: -40, right: -40, top: BELT, height: 26, zIndex: 28,
          background: `repeating-linear-gradient(90deg, ${dkh(STEELD, 0.22)} 0 22px, ${dkh(STEELD, 0.38)} 22px 44px)`,
          transform: `translateX(${-(f * 2.6) % 44}px)` }} />
        <div style={{ position: "absolute", left: -40, right: -40, top: BELT - 7, height: 8, zIndex: 29,
          background: mxh(STEEL, 0.10) }} />
        <div style={{ position: "absolute", left: -40, right: -40, top: BELT + 26, height: 9, zIndex: 29,
          background: dkh(STEELD, 0.50) }} />

        {/* four session spools ride IN on the belt surface */}
        {[0, 1, 2, 3].map((i) => (
          <Spool key={"sp" + i} x={34 + i * 88 - ((f * 2.6) % 44)} y={BELT - 62} f={f} s={0.90}
            z={50} spin={1} c="#DCEFDF" />
        ))}

        {/* the press straddles the belt; its anvil IS the belt line */}
        <Press x={392} y={BELT - 190} f={f} at={16} s={1.0} z={46} />

        {/* ⭐ THE MODULE ITSELF — the thing the scene is about, which v1 omitted.
            The wafer slides out of the press and travels into its face. */}
        <div style={{ position: "absolute", left: 742, top: BELT - 146, zIndex: 62 }}>
          <div style={{ width: 218, height: 146, borderRadius: 12, background:
            `linear-gradient(166deg, ${mxh(m.accent, 0.26)} 0%, ${m.accent} 60%, ${dkh(m.accent, 0.28)} 100%)`,
            border: `5px solid ${dkh(m.accent, 0.40)}`, boxShadow: SH_D }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 18, textAlign: "center",
              fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 25, letterSpacing: "0.04em",
              color: "#FFFFFF" }}>{m.spoken}</div>
            <div style={{ position: "absolute", left: 0, right: 0, top: 50, textAlign: "center",
              fontFamily: MONO, fontWeight: 700, fontSize: 15, color: "#FFFFFF", opacity: 0.85 }}>
              ★ {m.stars}
            </div>
            <div style={{ position: "absolute", left: 22, right: 22, bottom: 16, height: 24,
              display: "flex", gap: 6 }}>
              {Array.from({ length: 6 }, (_, k) => (
                <div key={"r" + k} style={{ flex: 1, borderRadius: 3,
                  background: dkh(m.accent, 0.30), opacity: 0.85 }} />
              ))}
            </div>
          </div>
        </div>

        {/* the wafer slides out warm — the one warm object in a cold room */}
        <div style={{ position: "absolute", left: 0, top: 0, zIndex: 88, opacity: out }}>
          <Wafer x={618 + out * 108} y={BELT - 34} f={f} s={1.10} z={88} />
        </div>

        <RepoPlate x={92} y={628} m={m} s={0.82} z={84} />
        <Mark x={96} y={186} s={104} z={88} />
        <Guy x={846} y={230} s={0.70} z={78} f={f} costume={SPRITE_COSTUME.press} gaze={-0.85} />
        <Motes x={300} y={210} w={340} h={230} n={7} f={f} z={26} />
      </div>
    </Scene>
  );
};

/* ==================================================================== S7 ===
   23.80 -> 27.23s · 103f · CLOSE, LOCKED · ESCALATE 3b — it survives the session
   "…so it stops forgetting your project, your preferences, and the decisions
    you make across your different chats."

   ⭐ THE THREE TRAYS ARE THE VO'S OWN THREE WORDS, and the fourth is the repo's
      own verb: it INJECTS context into FUTURE sessions. The three earlier trays
      stay lit rather than going dark — nothing is forgotten, which is the whole
      claim.
   ⛔ BAY 3 LIGHTS AT THE END OF THIS SCENE, not in S8: the payoff BEGINS here
      and COMPLETES across the cut, so the peak is an arrival rather than a
      reveal from nothing.
   ========================================================================= */
export const S7: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlaceT("threeb");
  const HZ = p.horizon;
  /* local (lead-4): so 0 · project 14 · preferences 30 · decisions 56 · chats 92 */
  const nextLit = E(f, 74, 86, 0, 1, OUT);
  const drop = E(f, 62, 76, 0, 1, IN_Q);
  return (
    <Scene p={p} slug="" push={[0, 103, 1.115]} vig={0.44}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        <ThemeSet role="threeb" p={p} f={f} lightX={0.34} />
        {/* ⭐⭐ "ACROSS YOUR DIFFERENT CHATS" — so the picture is actual CHATS.
            Three sessions in a row; what chat 1 learned is already in chat 2 and
            chat 3, with the boundary being crossed drawn explicitly. Labelled
            trays were a container for "storage"; they never showed the SESSION
            BOUNDARY, which is the only thing that makes the claim mean anything. */}
        <MemoryThread x={68} y={214} f={f} at={6} z={70} cw={268} />
        {/* the wafer travels down the rack and drops into tomorrow's tray */}
        <div style={{ position: "absolute", left: 0, top: 0, zIndex: 90 }}>
          <Wafer x={196} y={182 + drop * 372} f={f} s={1.0} z={90}
            o={1 - E(f, 76, 84, 0, 1, OUT) * 0.35} />
        </div>
        {/* ⭐ the cold room's belt runs on behind the rack, and the spools it
            carries are the large travelling objects this scene had none of. */}
        <div style={{ position: "absolute", left: -40, right: -40, top: 268, height: 22, zIndex: 30,
          background: `repeating-linear-gradient(90deg, ${dkh(STEELD, 0.22)} 0 20px, ${dkh(STEELD, 0.38)} 20px 40px)`,
          transform: `translateX(${-(f * 3.1) % 40}px)` }} />
        {[0, 1, 2, 3, 4].map((i) => (
          <Spool key={"s7sp" + i} x={-70 + i * 232 + ((f * 3.1) % 232)} y={206} f={f} s={0.86}
            z={40} spin={0.8} />
        ))}
        <ScanBar y={150} h={420} f={f} period={82} z={33} c="#DCF0E2" o={0.26} w={310} />
        <TravelBand y={604} h={22} f={f} speed={2.7} z={31} a="#5FA383" b="#2C6049" pitch={40} />

        <Guy x={782} y={534} s={0.76} z={78} f={f} costume={SPRITE_COSTUME.trays} gaze={-0.7} />
        <Motes x={320} y={230} w={340} h={250} n={8} f={f} z={26} />
      </div>
    </Scene>
  );
};

/* ==================================================================== S8 ===
   27.23 -> 28.93s · 51f · WIDE, THE ONE PULL-BACK · PAYOFF
   "To try these for yourself…"

   ⭐⭐ THE HERO ARTIFACT RESOLVES. The same object as frame 0, in its opposite
      state: three modules seated, three bays lit. This is the ONLY frame in the
      reel where the plate is full.
   ⛔ THE RECEIPT IS THE HONEST ONE. `121,174★` is 1,697 + 28,826 + 90,651, all
      read from the GitHub API on build day, and `MIT · MIT · APACHE-2.0` is the
      three real licences. ⛔ NO "100%", no "unlocked", no invented multiplier —
      the 40% from S1 is never answered with a number, because there isn't one.
   ⛔ THE BRIGHTEST FRAME IN THE REEL. The peak must beat the hook and brightness
      is half of how it does that (docs/THE-OPEN.md law 1).
   ========================================================================= */
export const S8: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlaceT("peak");
  const HZ = p.horizon;
  const lit = E(f, 0, 12, 0.55, 1, OUT);
  return (
    /* ⛔ the one PULL-BACK in the reel: 1.16 -> 1.00, motivated by the reveal */
    <Scene p={p} slug="" push={[0, 51, 0.845]} vig={0.36}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        <ThemeSet role="peak" p={p} f={f} lightX={0.52} wide />
        {/* the roller door, fully open — the reel's warmest light */}
        <div style={{ position: "absolute", left: 636, top: 118, width: 356, height: 330, zIndex: 10,
          borderRadius: 8, background: `linear-gradient(178deg, ${mxh(GOLD, 0.52)} 0%, ${mxh(GOLD, 0.22)} 100%)`,
          opacity: 0.72 }} />
        {/* the mark painted into the bay floor, in perspective, as PAINT */}
        <MarkCast x={506} y={648} s={300} z={17} o={0.34} f={f} />
        <Bench y={HZ + 62} z={26} depth={40} />
        <BayLine y={HZ + 150} z={18} o={0.5} />
        <div style={{ position: "absolute", left: 150, top: 214, width: 712, height: 366,
          borderRadius: 24, zIndex: 40, background:
            `linear-gradient(172deg, ${mxh(STEEL, 0.20)} 0%, ${dkh(STEEL, 0.18)} 100%)`,
          border: `6px solid ${dkh(STEEL, 0.36)}`, boxShadow: SH_D }} />
        {/* ⭐ all three seated, all three lit — frame 0's object, resolved */}
        <HeroRig x={180} y={236} f={f} s={0.96} z={60} seat={[1, 1, 1]} lit={[lit, lit, lit]}
          label="ALL THREE INSTALLED" />
        {(() => {   /* ⭐ the payoff ring — the biggest single gesture in the reel */
          const r = (f - 8) / 26;
          if (f < 8 || r > 1) return null;
          return (
            <div style={{ position: "absolute", left: 506 - 760 * r, top: 400 - 330 * r,
              width: 1520 * r, height: 660 * r, borderRadius: "50%", zIndex: 58,
              border: `${Math.max(1, 12 * (1 - r))}px solid ${hexa(GOLD, 0.52 * (1 - r))}` }} />
          );
        })()}
        <Receipt x={318} y={606} f={f} at={10} s={0.94} z={90} />
        <Guy x={846} y={470} s={0.80} z={78} f={f} costume={SPRITE_COSTUME.full}
          gaze={-0.6} cheer={1} nodAmp={5.0} nodSpeed={9} />
        <Motes x={330} y={200} w={400} h={280} n={10} f={f} z={24} />
      </div>
    </Scene>
  );
};

/* ==================================================================== S9 ===
   28.93 -> 30.67s · 52f · CLOSE, LOCKED · CTA
   "…comment PLUGIN down below and I'll send you the link immediately."

   ⛔ THE KEYWORD IS A STAMPED OBJECT, never a caption
      ([[feedback_graphical_over_textual]]).
   ⛔ THE REEL HARD-CUTS ON THE LAST WORD — no held tail (see PLUGIN_TOTAL).
   ========================================================================= */
export const S9Cta: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlaceT("cta");
  const HZ = p.horizon;
  /* local (lead-4): comment 0 · PLUGIN 16 · link 50 */
  const sk = shake(f, 16, 9, 8);
  return (
    <Scene p={p} slug="" push={[0, 52, 1.130]} vig={0.44}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1,
        transform: `translate(${sk.x}px, ${sk.y}px)` }}>
        <ThemeSet role="cta" p={p} f={f} lightX={0.44} />
        <div style={{ position: "absolute", left: -40, right: -40, top: 214, height: 18, zIndex: 26,
          background: `repeating-linear-gradient(90deg, ${dkh(STEEL, 0.20)} 0 18px, ${dkh(STEEL, 0.34)} 18px 36px)`,
          transform: `translateX(${-(f * 3.4) % 36}px)` }} />
        {[0, 1, 2, 3].map((i) => (
          <div key={"jc" + i} style={{ position: "absolute", zIndex: 28,
            left: -150 + i * 296 + ((f * 3.4) % 296), top: 232,
            width: 196, height: 116, borderRadius: 10, background: mxh(CREAMD, 0.24),
            border: `3px solid ${dkh(CREAMD, 0.22)}`, opacity: 0.78, boxShadow: SH }} />
        ))}
        <ScanBar y={180} h={400} f={f} period={78} z={31} c="#F3E2BB" o={0.27} w={310} />
        <TravelBand y={614} h={22} f={f} speed={3.1} z={30} a="#D8AC6C" b="#8E6634" pitch={40} />
        <JobCard x={246} y={286} f={f} at={16} s={1.0} z={92} word="PLUGIN" />
        <Mark x={104} y={190} s={110} z={90} />
        <Guy x={812} y={330} s={0.84} z={78} f={f} costume={SPRITE_COSTUME.cta}
          gaze={-0.8} cheer={0.6} />
        <Motes x={340} y={220} w={330} h={230} n={7} f={f} z={26} />
      </div>
    </Scene>
  );
};
