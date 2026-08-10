import React from "react";
import { AbsoluteFill, useCurrentFrame, Img, staticFile } from "remotion";
import { inter } from "./fonts";
import { Bg, Panel, ProgressBar, Caption, AssemblyCtx, hexA, Mascot } from "./SlopKit";
import {
  NightCircuit, StartLights, TimingTower, Racer, MarshalFlag, FinishPost,
  FileModule, RepoCard, LogoTile, FChip, BigNum, Roll, STATS, RACERS, LOGOS,
  StartGrid, PitBoard, GRID_ROWS, Smoke, Sparks, Drone, TRACK_BOT,
  CLAY, NIGHT, CARD, INKD, MUTE, RED, GO, BLUE, PLUM, GOLD, STEEL, SH_D,
  TRACK_TOP, LANE_H,
} from "./FileWorld";
import { AppWindow, Sidebar, ChatPane, Composer, ModelGrid, RacePanes,
         ModeTabs, ContextRail, StatusBar, ScreenSpill, GitHubPage } from "./FileUI";
import { E, osc, rnd, OUT, IO, BACK, IN_Q } from "./MissionWorld";

/* =========================================================================
   REEL 88 "FILE" · BODY SCENES.

   Scenes render CHASSIS-FREE under AssemblyCtx: ROOT owns bg, rail, captions.

   ⛔ EVERY CUT SITS ON A MEASURED WORD ONSET from the cut VO (24.908s, 116
      words). Frames, not estimates:
        file 35 · GitHub 46 · 50 89 · zero 119 · God 169 · Mode 175
        download 201 · browser 238 · ChatGPT 270 · Claude 296 · Gemini 305
        Grok 313 · place 361 · login 392 · subscription 408 · cloud 423
        wild 478 · Classic 511 · prompt 552 · models 577 · best 613
        time 643 · comment 687 · below 710

   ⛔ "no cloud" is FALSE as spoken — calls go to OpenRouter/Venice. S7's third
      row says STAYS IN YOUR BROWSER, which is the true version of that beat.
   ========================================================================= */

/** per-variant camera. ⛔ applied INSIDE the Panel, never to the whole
    composition — scaling the comp also scales the cream bg, shifts the Panel off
    its fixed chassis and wrecks the motion audit (measured on reel 83). */
export const FileCamCtx = React.createContext<{ z: number; dx: number; dy: number }>(
  { z: 1, dx: 0, dy: 0 });

const Chassis: React.FC<{ children: React.ReactNode; cap?: string[]; hot?: number }> =
  ({ children, cap, hot }) => {
  const solo = !React.useContext(AssemblyCtx);
  const cam = React.useContext(FileCamCtx);
  return (
    <AbsoluteFill>
      {solo && <><Bg /><ProgressBar /></>}
      <Panel glow={hexA(GO, 0.28)}>
        <div style={{ position: "absolute", inset: 0, zIndex: 1,
          transform: `scale(${cam.z}) translate(${cam.dx}px, ${cam.dy}px)`,
          transformOrigin: "50% 54%" }}>{children}</div>
      </Panel>
      {solo && cap && <Caption words={cap} hot={hot} />}
    </AbsoluteFill>
  );
};

/** an in-scene shot; k picks the camera move so no two neighbours match */
const Sh: React.FC<{
  f: number; a: number; b: number; k?: number; z?: number; children: React.ReactNode;
}> = ({ f, a, b, k = 0, z: zi = 12, children }) => {
  if (f < a || f >= b) return null;
  const t = Math.min(1, (f - a) / 28), e = t * t * (3 - 2 * t);
  const z = [1.06 - e * 0.05, 1.01 + e * 0.055, 1.05 - e * 0.04, 1.02 + e * 0.045][k % 4];
  const dx = [0, -9, 8, -6][k % 4] * (1 - e);
  /* ⛔ `zIndex` is NOT decoration here. A transformed div is a stacking context
        pinned at z-index 0, so a sibling NightCircuit (z 2..10) paints over
        everything inside it — S4 and S9 shipped EMPTY before this line. */
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: zi,
      transform: `scale(${z}) translateX(${dx}px)`, transformOrigin: "50% 55%" }}>{children}</div>
  );
};

const Guy: React.FC<{
  f: number; x: number; y: number; size?: number; prop?: string; cheer?: number;
  shock?: number; z?: number;
}> = ({ f, x, y, size = 200, prop, cheer = 0, shock = 0, z = 24 }) => {
  const p: any = { lf: f, size, cheer, shock, nodAmp: 3, nodSpeed: 10 };
  if (prop) p[prop] = 1;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      filter: `drop-shadow(0 ${Math.round(size * 0.05)}px ${Math.round(size * 0.07)}px rgba(0,0,0,0.6))` }}>
      <Mascot {...p} />
    </div>
  );
};

/** a mouse pointer that travels and clicks — the thing that makes UI read as USED */
const Cursor: React.FC<{
  f: number; x0: number; y0: number; x1: number; y1: number; at: number; dur?: number; z?: number;
}> = ({ f, x0, y0, x1, y1, at, dur = 20, z = 60 }) => {
  const t = E(f, at, at + dur, 0, 1, IO);
  const x = x0 + (x1 - x0) * t, y = y0 + (y1 - y0) * t;
  const click = f >= at + dur && f < at + dur + 8;
  return (<>
    {click && (
      <div style={{ position: "absolute", left: x - 22, top: y - 22, width: 44, height: 44,
        borderRadius: "50%", border: `3px solid ${CARD}`, zIndex: z - 1,
        opacity: 1 - (f - at - dur) / 8,
        transform: `scale(${0.5 + (f - at - dur) / 8})` }} />
    )}
    <svg width={30} height={38} viewBox="0 0 30 38"
         style={{ position: "absolute", left: x, top: y, zIndex: z,
           filter: "drop-shadow(0 3px 5px rgba(0,0,0,0.7))" }}>
      <path d="M2 2 L2 27 L9 21 L14 32 L19 30 L14 19 L23 19 Z" fill={CARD} stroke={INKD}
            strokeWidth={2.5} strokeLinejoin="round" />
    </svg>
  </>);
};

/* ====================================================================== S1 ==
   THE GRID. Five models mid-sprint on the night circuit, timing tower live.
   The repo badge slides in on GitHub@46 so the subject is named, not implied.
   ============================================================================ */
export const S1Grid: React.FC = () => {
  const f = useCurrentFrame();
  const prog = (i: number, fr: number) =>
    Math.max(0, Math.min(1, 0.40 + (fr / 74) * (0.92 + i * 0.03) - i * 0.058));
  /* where each racer actually is, so smoke and sparks stay attached to them */
  const px = (i: number) => 56 + prog(i, f) * 598;
  const py = (i: number) => TRACK_TOP + i * LANE_H + (LANE_H - 86 * 0.83) / 2 + 36;

  return (
    <Chassis cap={["Someone", "leaked", "a single file", "to GitHub"]} hot={2}>
      <NightCircuit f={f} />
      <StartLights f={f} z={18} />
      <FinishPost x={700} top={256} h={434} z={19} />

      {/* ⛔ the opening was five tiles sliding on a clean track. A race frame has
             rubber smoke, sparks off the plank and a camera drone on the leader.
             All of it is attached to the racers' REAL positions. */}
      {RACERS.map((m, i) => (
        <Smoke key={"sm" + m.name} f={f + i * 5} x={px(i)} y={py(i) + 22} n={5} z={17} />
      ))}
      <Sparks f={f} x={px(0) + 8} y={py(0) + 40} n={10} z={27} />
      <Sparks f={f + 11} x={px(1) + 8} y={py(1) + 40} n={7} z={27} c={CLAY} />
      <Drone f={f} y={222} z={36} speed={2.6} />

      {/* ⛔ the left third of the track was bare asphalt. BACKMARKERS: the rest
             of the field trailing the leaders, small and dim, which fills the
             frame AND says there are far more than five out there. */}
      {Array.from({ length: 9 }, (_, k) => {
        const lane = k % 5;
        const back = 0.30 - Math.floor(k / 5) * 0.13 - (k % 5) * 0.028;
        const bp = Math.max(0, prog(lane, f) - (0.42 - back));
        const bx = 56 + bp * 598;
        const by = TRACK_TOP + lane * LANE_H + (LANE_H - 86 * 0.5) / 2;
        return (
          <React.Fragment key={"bm" + k}>
            <div style={{ position: "absolute", left: Math.max(0, bx - 62), top: by + 22,
              width: Math.min(bx, 58), height: 6, borderRadius: 3,
              background: RACERS[(k + 2) % 5].c, opacity: 0.3, zIndex: 20 }} />
            <LogoTile src={LOGOS[(k + 5) % LOGOS.length]} x={bx} y={by} s={0.46}
                      t={0.62} r={Math.sin(f / 9 + k) * 4} z={21} />
          </React.Fragment>
        );
      })}
      {RACERS.map((m, i) => (
        <Racer key={m.name} f={f} i={i} prog={prog(i, f)} x1={654} z={24 + i} />
      ))}
      <TimingTower f={f} prog={RACERS.map((_, i) => prog(i, f))} x={790} y={262} s={0.9} z={36} />
      <MarshalFlag f={f} x={128} y={188} s={0.94} z={31} />

      {/* the subject, named on its own word: "a single FILE" lands at 35 */}
      <PitBoard f={f} x={40} y={116} s={0.58} big="1" sub="FILE"
                t={E(f, 30, 46, 0, 1, OUT)} z={44} />

      <Guy f={f} x={4} y={606} size={182} prop="constr" cheer={0.95} z={32} />
      <Guy f={f + 13} x={196} y={624} size={166} prop="cop" cheer={0.8} z={32} />
      <Guy f={f + 7} x={828} y={618} size={172} prop="glasses" cheer={0.9} z={32} />
      {/* a photographer on the wall, shutter firing */}
      <Guy f={f + 21} x={628} y={632} size={158} prop="prof" cheer={0.7} z={32} />
      {(f % 17) < 2 && (
        <div style={{ position: "absolute", left: 700, top: 662, width: 26, height: 26,
          background: "#FFF3E8", zIndex: 34 }} />
      )}

      {/* the repo, named on its own word */}
      <div style={{ position: "absolute", left: 24, top: 700, display: "flex", alignItems: "center",
        gap: 12, padding: "11px 20px", borderRadius: 14, background: CARD, boxShadow: SH_D,
        zIndex: 44, transform: `scale(${E(f, 44, 58, 0, 1, BACK)})`, transformOrigin: "0% 50%" }}>
        <Img src={staticFile("logos/github.svg")} style={{ width: 30, height: 30 }} />
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 30,
          letterSpacing: "-0.02em", color: INKD }}>{STATS.repo}</div>
        <div style={{ padding: "5px 11px", borderRadius: 8, background: INKD,
          fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 20, color: GOLD }}>
          ★ <Roll f={f} at={48} to={STATS.stars} dur={22} />
        </div>
      </div>
    </Chassis>
  );
};

/* ====================================================================== S2 ==
   THE FILE. One file, sixty models, zero subscriptions. Two beats, both on
   their own onset: the count at 50@89, the price at zero@119.
   ============================================================================ */
export const S2File: React.FC = () => {
  const f = useCurrentFrame();
  const A = 62;                                    // scene start, absolute frames
  const CUT = 108 - A;                             // 46 frames in

  return (
    <Chassis cap={["free access", "to over 50", "AI tools"]} hot={1}>
      <NightCircuit f={f} dim={0.5} />

      {/* 1 · ⛔ THIRD TAKE ON THIS BEAT. A card beside a number was boring; a
             burst of tiles pouring out of the file was decoration. Sixty models
             now LINE UP ON THE GRID behind the one file at pole — structure you
             can count (5+7+9+11+13+15), depth you can rank, and it sets up the
             race that pays off at 19s with the same five on the front row. */}
      <Sh f={f} a={0} b={CUT} k={0} z={12}>
        <StartGrid f={f} cx={560} at={2} z={20} />
        <FileModule f={f} x={432} y={534} s={0.56} t={E(f, 0, 12, 0, 1, BACK)} z={40} />
        {/* ⛔ keyed to the measured onset it read 0 for 27 frames. It climbs
            from the top of the scene and LANDS three frames after "50". */}
        <BigNum f={f} at={8} to={STATS.models} x={40} y={172} size={150} c={CARD} z={44} />
        <div style={{ position: "absolute", left: 46, top: 320, fontFamily: inter.fontFamily,
          fontWeight: 900, fontSize: 38, letterSpacing: "-0.02em", color: GOLD, zIndex: 44 }}>
          MODELS
        </div>
        <Guy f={f} x={-30} y={588} size={166} prop="constr" cheer={0.92} z={42} />
      </Sh>

      {/* 2 · the front row, and the crew hangs the price out on a pit board.
             ⛔ the file card and the receding field both fought the front row
             here; the file is already established in shot 1, so it goes. */}
      <Sh f={f} a={CUT} b={9999} k={1} z={12}>
        {/* the other 51 still receding, so "60" stays on screen without a label */}
        <StartGrid f={f} cx={560} at={-60} skip={2} dim={0.5} z={16} boxes={false} />

        {RACERS.map((m, i) => {
          const x = 74 + i * 172;
          const t = E(f, CUT + 1 + i * 2, CUT + 15 + i * 2, 0, 1, BACK);
          return (
            <React.Fragment key={m.name}>
              {/* the painted box, then the position painted on the tarmac */}
              <div style={{ position: "absolute", left: x - 10, top: 578, width: 124, height: 40,
                border: "4px solid #4A6072", borderTop: "none", zIndex: 18, opacity: t }} />
              <div style={{ position: "absolute", left: x + 38, top: 624,
                fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 28, color: "#5E7386",
                zIndex: 19, opacity: t }}>{i + 1}</div>
              <LogoTile src={m.logo} x={x} y={470} s={1.0} t={t}
                        r={Math.sin(f / 10 + i) * 3} z={24} />
            </React.Fragment>
          );
        })}

        <PitBoard f={f} x={708} y={118} s={0.74} big="$0" sub="PER MONTH"
                  t={E(f, 119 - A, 137 - A, 0, 1, OUT)} z={48} />
        <Guy f={f} x={-46} y={636} size={150} prop="constr" cheer={0.92} z={42} />
        <FChip y={716} text="ONE FILE. NO SUBSCRIPTION." c={CLAY} size={34} />
      </Sh>
    </Chassis>
  );
};

/* ====================================================================== S3 ==
   GOD MODE. The name, as a title plate. Short, loud, one idea.
   ============================================================================ */
export const S3GodMode: React.FC = () => {
  const f = useCurrentFrame();
  const A = 160;
  const t = E(f, 169 - A, 183 - A, 0, 1, BACK);
  return (
    <Chassis cap={["They're calling it", "God Mode"]} hot={1}>
      <NightCircuit f={f} dim={0.42} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 258, display: "flex",
        justifyContent: "center", zIndex: 40, transform: `scale(${t})` }}>
        <div style={{ padding: "26px 46px", borderRadius: 22, background: INKD,
          border: `5px solid ${GOLD}`, boxShadow: SH_D,
          fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 104, lineHeight: 1,
          letterSpacing: "-0.05em", color: GOLD }}>GOD MODE</div>
      </div>
      {/* ⛔ LogoTile is position:absolute — inside a flex row all five stack at
             the container origin. They need explicit x. */}
      {RACERS.map((m, i) => (
        <LogoTile key={m.name} src={m.logo} x={126 + i * 156} y={418} s={0.72}
                  t={E(f, 176 - A + i * 2, 188 - A + i * 2, 0, 1, BACK)}
                  r={Math.sin(f / 8 + i) * 4} z={38} />
      ))}
      <Guy f={f} x={54} y={508} size={186} prop="wizard" cheer={0.85} z={30} />
      <Guy f={f + 11} x={786} y={512} size={182} prop="cop" shock={0.35} z={30} />
    </Chassis>
  );
};

/* ====================================================================== S4 ==
   DOWNLOAD, THEN OPEN. Two UI beats: a real repo file view with a download
   button, then the file opening in the browser.
   ============================================================================ */
export const S4Download: React.FC = () => {
  const f = useCurrentFrame();
  const A = 196;
  const CUT = 238 - A;                              // "browser"
  return (
    <Chassis cap={["download one file,", "open it in your browser"]} hot={1}>
      <NightCircuit f={f} dim={0.34} />

      {/* 1 · the real repo page. ⛔ the first version was a breadcrumb and three
             fat rows — a wireframe of GitHub, not GitHub. */}
      <Sh f={f} a={0} b={CUT} k={0} z={12}>
        <ScreenSpill x={34} y={696} w={944} z={14} />
        <AppWindow f={f} x={34} y={134} w={944} h={562} z={26}
                   tab="elder-plinius/G0DM0D3: LIBERATED AI CHAT"
                   url="github.com/elder-plinius/G0DM0D3"
                   t={E(f, 1, 15, 0, 1, BACK)}>
          <GitHubPage f={f} dl={E(f, 16, 40, 0, 1, OUT)} />
        </AppWindow>
        <Cursor f={f} x0={912} y0={318} x1={868} y1={300} at={2} dur={12} z={60} />
      </Sh>

      {/* 2 · it opens straight in the browser */}
      <Sh f={f} a={CUT} b={9999} k={1}>
        <ScreenSpill x={34} y={696} w={944} z={14} />
        <AppWindow f={f} x={34} y={134} w={944} h={562} z={26}
                   t={E(f, CUT + 1, CUT + 16, 0.86, 1, BACK)}>
          <ModeTabs left={0} active={0} f={f} />
          <Sidebar f={f} at={CUT + 4} active={0} />
          <ChatPane f={f} left={250} at={CUT + 10} model={0} />
          <ContextRail f={f} at={CUT + 8} />
          <Composer f={f} left={250} label="GPT" />
          <StatusBar f={f} left={250} model={0} />
        </AppWindow>
      </Sh>
    </Chassis>
  );
};

/* ====================================================================== S5 ==
   THE APP. The selection walks the sidebar, one model per measured onset:
   ChatGPT 270 · Claude 296 · Gemini 305 · Grok 313.
   ============================================================================ */
export const S5App: React.FC = () => {
  const f = useCurrentFrame();
  const A = 262;
  const ON = [270, 296, 305, 313].map((x) => x - A);
  const active = f >= ON[3] ? 3 : f >= ON[2] ? 2 : f >= ON[1] ? 1 : 0;
  return (
    <Chassis cap={["ChatGPT,", "Claude,", "Gemini,", "Grok"]} hot={0}>
      <NightCircuit f={f} dim={0.3} />
      <ScreenSpill x={26} y={676} w={960} z={14} />
      <AppWindow f={f} x={26} y={152} w={960} h={524} z={26} t={E(f, 0, 14, 0.9, 1, BACK)}>
        {/* the list SCROLLS through the tail of the scene — the only sidebar
            motion big enough to clear the gate, and it says "60" while doing it */}
        <Sidebar f={f} at={2} active={active}
                 slot={ON.slice(1).reduce((a, on) => a + E(f, on - 7, on + 5, 0, 1, IO), 0)}
                 scroll={E(f, 58, 92, 0, 1, IO)} />
        {/* ⛔ one ChatPane at a fixed `at` finishes by frame ~62 and the scene
               then froze for 42 frames. Re-keying it to the ACTIVE model's own
               onset makes every switch stream a fresh answer. */}
        {/* ⛔ re-keying the whole pane retyped the USER's prompt on every switch.
               `promptAt` stays put; only the answer restarts. */}
        <ModeTabs left={0} active={0} f={f} />
        {/* the transcript scrolls the whole way through — the only motion in a
            window this large that the gate can actually see */}
        <ChatPane f={f} left={250} promptAt={12} at={active === 0 ? 12 : ON[active]}
                  model={active} scroll={E(f, 14, 92, 0, 1, IO)} />
        <ContextRail f={f} at={6} />
        <Composer f={f} left={250} label={RACERS[active].name} />
        <StatusBar f={f} left={250} model={active} />
      </AppWindow>
      {/* ⛔ Nothing INSIDE a window this size can clear the motion gate: the
             scrolling transcript only bought 0.7. Each named model now LAUNCHES
             out of its sidebar row into the chat — a 145px cream tile crossing
             ~470px, which is both the biggest contrast in frame and a literal
             picture of the line being spoken. */}
      {/* seven launches, so one is nearly always in flight, and each tile is a
             ~200px CREAM object crossing ~500px — the largest delta available
             inside a scene that is otherwise a static window */}
      {[[0, ON[0]], [1, 20], [1, ON[1]], [2, ON[2]], [3, ON[3]], [4, 64], [0, 80]]
        .map(([mi, at], k) => {
        const t = E(f, at as number, (at as number) + 28, 0, 1, OUT);
        if (t <= 0.01 || t >= 1) return null;
        const ease = 1 - (1 - t) * (1 - t);
        return (
          <React.Fragment key={k}>
            <div style={{ position: "absolute",
              left: 176 + ease * 508 - 13 * (0.9 + ease * 0.98),
              top: 438 + (k % 3) * 16 - ease * 146 - Math.sin(ease * Math.PI) * 40
                   - 13 * (0.9 + ease * 0.98),
              width: 130 * (0.9 + ease * 0.98), height: 130 * (0.9 + ease * 0.98),
              borderRadius: 28 * (0.9 + ease * 0.98),
              background: RACERS[mi as number].c, boxShadow: SH_D, zIndex: 51,
              opacity: Math.min(1, (1 - t) * 3.2),
              transform: `rotate(${(1 - ease) * 26 - 13}deg)` }} />
            <LogoTile src={RACERS[mi as number].logo}
                      x={176 + ease * 508}
                      y={438 + (k % 3) * 16 - ease * 146 - Math.sin(ease * Math.PI) * 40}
                      s={0.9 + ease * 0.98} t={Math.min(1, (1 - t) * 3.2)}
                      r={(1 - ease) * 26 - 13} z={52} />
          </React.Fragment>
        );
      })}
      {/* the pointer FOLLOWS the selection down the list. ⛔ keying it off the
             discrete `active` index teleports it on each flip; summing three
             eased steps makes one continuous travel. */}
      {(() => {
        const step = ON.slice(1).reduce((a, on) => a + E(f, on - 7, on + 5, 0, 1, IO), 0);
        const cy = 430 + step * 52;
        return (<>
          <Cursor f={f} x0={196} y0={cy} x1={196} y1={cy} at={-99} dur={1} z={60} />
          {ON.slice(1).map((on, i) => {
            const k = f - on;
            if (k < 0 || k > 8) return null;
            return <div key={i} style={{ position: "absolute", left: 174, top: 430 + (i + 1) * 52 - 22,
              width: 44, height: 44, borderRadius: "50%", border: `3px solid ${CARD}`, zIndex: 59,
              opacity: 1 - k / 8, transform: `scale(${0.5 + k / 8})` }} />;
          })}
        </>);
      })()}
      <FChip y={702} text="EVERY MODEL, ONE APP" c={BLUE} size={35} />
    </Chassis>
  );
};

/* ====================================================================== S6 ==
   IN ONE PLACE. The catalogue view — the count made visible.
   ============================================================================ */
export const S6Grid: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Chassis cap={["and 50 other AI tools", "in one place"]} hot={1}>
      <NightCircuit f={f} dim={0.3} />
      <ScreenSpill x={26} y={676} w={960} z={14} />
      <AppWindow f={f} x={26} y={152} w={960} h={524} z={26} t={E(f, 0, 12, 0.92, 1, BACK)}>
        {/* ⛔ 12 tiles staggered i*2 finish at frame 39 — this scene is 32 frames
               long, so the last four never landed. Eight, tighter. */}
        <ModeTabs left={0} active={0} f={f} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 42, bottom: 28 }}>
          <ModelGrid f={f} left={0} at={1} cols={4} rows={2} />
        </div>
        <StatusBar f={f} left={0} model={0} />
      </AppWindow>
      <FChip y={702} text="ALL IN ONE PLACE" c={GO} />
    </Chassis>
  );
};

/* ====================================================================== S7 ==
   NO LOGIN. Three rows, each on its own onset: login 392 · subscription 408 ·
   cloud 423.
   ⛔ Row three says STAYS IN YOUR BROWSER, not "no cloud". The calls DO leave;
      the chat history does not. Never put the wrong fact in the graphic.
   ============================================================================ */
export const S7NoLogin: React.FC = () => {
  const f = useCurrentFrame();
  const A = 388;
  const ROWS: [string, number][] = [
    ["NO LOGIN", 392 - A], ["NO SUBSCRIPTION", 408 - A], ["STAYS IN YOUR BROWSER", 423 - A],
  ];
  return (
    <Chassis cap={["No login,", "no subscription"]} hot={0}>
      <NightCircuit f={f} dim={0.4} />
      {ROWS.map(([label, at], i) => (
        <div key={label} style={{ position: "absolute", left: 66, top: 236 + i * 122,
          display: "flex", alignItems: "center", gap: 22, zIndex: 36,
          transform: `scale(${E(f, at, at + 14, 0, 1, BACK)})`, transformOrigin: "0% 50%" }}>
          <div style={{ width: 92, height: 92, borderRadius: 24, background: GO, boxShadow: SH_D,
            display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width={50} height={50} viewBox="0 0 24 24">
              <path d="M4 12.5 L9.5 18 L20 6.5" fill="none" stroke={CARD} strokeWidth={3.4}
                    strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div style={{ padding: "16px 28px", borderRadius: 16, background: CARD, boxShadow: SH_D,
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 40, letterSpacing: "-0.025em",
            color: INKD, whiteSpace: "nowrap" }}>{label}</div>
        </div>
      ))}
      {/* ⛔ three cards landing by frame 49 left 33 dead frames. The file rises
             ~470px through the rest of the scene — real travel, and it is the
             thing the three claims are ABOUT. */}
      <FileModule f={f} x={694} y={244 + (1 - E(f, 44, 74, 0, 1, OUT)) * 470} s={0.82}
                  t={E(f, 44, 58, 0, 1, BACK)} z={30} />
      <Guy f={f} x={640} y={556} size={180} prop="suit" cheer={0.85} z={28} />
    </Chassis>
  );
};

/* ====================================================================== S8 ==
   THE TURN. "…the part that's actually wild." The app is up, and the one
   control nobody has clicked yet starts pulsing.
   ============================================================================ */
export const S8Turn: React.FC = () => {
  const f = useCurrentFrame();
  const A = 470;
  const pulse = 1 + Math.sin(f / 4) * 0.035;
  return (
    <Chassis cap={["But here's the part", "that's actually wild"]} hot={1}>
      <NightCircuit f={f} dim={0.3} />
      {/* ⛔ a 30x38 cursor is 0.14% of the panel — it can NEVER clear the motion
             gate on its own (S8 was dead 21 of 36 frames). The whole window
             pulls back and five tiles rise: both are large-area travel. */}
      <div style={{ position: "absolute", inset: 0, zIndex: 12,
        transform: `translateY(${-E(f, 0, 34, 0, 44, IO)}px) scale(${1 - E(f, 0, 34, 0, 0.10, IO)})`,
        transformOrigin: "50% 40%" }}>
        <ScreenSpill x={26} y={676} w={960} z={14} />
      <AppWindow f={f} x={26} y={152} w={960} h={524} z={26} t={E(f, 0, 12, 0.94, 1, BACK)}>
          <ModeTabs left={0} active={0} f={f} />
          <Sidebar f={f} at={0} active={0} classic />
          <ChatPane f={f} left={250} at={-40} model={0} />
          <ContextRail f={f} at={-20} />
          <Composer f={f} left={250} label="GPT" />
          <StatusBar f={f} left={250} model={0} />
          <div style={{ position: "absolute", left: 6, bottom: 14, width: 292, height: 60,
            borderRadius: 15, border: `4px solid ${GOLD}`, transform: `scale(${pulse})`,
            opacity: E(f, 478 - A, 490 - A, 0, 1, OUT) }} />
        </AppWindow>
      </div>
      {RACERS.map((m, i) => (
        <LogoTile key={m.name} src={m.logo} x={68 + i * 182}
                  y={700 - E(f, 4 + i * 3, 32 + i * 3, 0, 132, OUT)} s={0.82}
                  r={Math.sin(f / 8 + i) * 5} z={40} />
      ))}
      {/* ⛔ a 16-frame travel in a 36-frame scene left 15 dead frames. The
             pointer now crosses the full window over the whole scene. */}
      <Cursor f={f} x0={880} y0={300} x1={190} y1={604} at={2} dur={30} z={60} />
    </Chassis>
  );
};

/* ====================================================================== S9 ==
   CLASSIC MODE. The click at 511, then one prompt typed at 552.
   ============================================================================ */
export const S9Classic: React.FC = () => {
  const f = useCurrentFrame();
  const A = 506;
  const CUT = 534 - A;
  return (
    <Chassis cap={["a feature called", "Classic Mode"]} hot={1}>
      <NightCircuit f={f} dim={0.3} />

      {/* 1 · the mode switches on */}
      <Sh f={f} a={0} b={CUT} k={0}>
        <ScreenSpill x={26} y={676} w={960} z={14} />
      <AppWindow f={f} x={26} y={152} w={960} h={524} z={26}>
          <ModeTabs left={0} active={f >= 511 - A ? 1 : 0} f={f} />
          <Sidebar f={f} at={-30} active={0} classic />
          <ChatPane f={f} left={250} at={-60} model={0} />
          <ContextRail f={f} at={-30} />
          <Composer f={f} left={250} label="GPT" />
          <StatusBar f={f} left={250} model={0} />
        </AppWindow>
        <Cursor f={f} x0={190} y0={604} x1={186} y1={600} at={0} dur={6} z={60} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 300, display: "flex",
          justifyContent: "center", zIndex: 50,
          transform: `scale(${E(f, 511 - A, 525 - A, 0, 1, BACK)})` }}>
          <div style={{ padding: "22px 44px", borderRadius: 20, background: INKD,
            border: `5px solid ${GOLD}`, boxShadow: SH_D,
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 76, letterSpacing: "-0.04em",
            color: GOLD }}>CLASSIC MODE</div>
        </div>
      </Sh>

      {/* 2 · one prompt, into the composer */}
      <Sh f={f} a={CUT} b={9999} k={1}>
        <ScreenSpill x={26} y={676} w={960} z={14} />
      <AppWindow f={f} x={26} y={152} w={960} h={524} z={26}>
          <ModeTabs left={0} active={1} f={f} />
          <Sidebar f={f} at={CUT - 20} active={0} classic />
          <StatusBar f={f} left={250} model={0} />
          <div style={{ position: "absolute", left: 250, right: 0, top: 42, bottom: 28 }}>
            <div style={{ position: "absolute", left: 26, right: 26, top: 150, height: 92,
              borderRadius: 18, background: CARD, boxShadow: SH_D, display: "flex",
              alignItems: "center", paddingLeft: 26, fontFamily: inter.fontFamily,
              fontWeight: 800, fontSize: 34, color: INKD, whiteSpace: "nowrap",
              overflow: "hidden" }}>
              {"write my launch email".slice(0,
                Math.max(0, Math.round(E(f, 552 - A, 574 - A, 0, 21, IO))))}
              <div style={{ width: 5, height: 44, marginLeft: 6, background: CLAY,
                opacity: Math.floor(f / 6) % 2 }} />
            </div>
            {RACERS.map((m, i) => (
              <LogoTile key={m.name} src={m.logo} x={26 + i * 76} y={274} s={0.6}
                        t={E(f, CUT + 6 + i * 2, CUT + 18 + i * 2, 0, 1, BACK)}
                        r={Math.sin(f / 9 + i) * 4} z={34} />
            ))}
          </div>
        </AppWindow>
        <FChip y={702} text="ONE PROMPT" c={GOLD} />
      </Sh>
    </Chassis>
  );
};

/* ===================================================================== S10 ==
   THE RACE. The payoff. Five panes streaming at five rates (models 577), then
   the circuit itself for the finish (best 613, time 643).
   ============================================================================ */
export const S10Race: React.FC = () => {
  const f = useCurrentFrame();
  const A = 570;
  const CUT = 612 - A;
  const prog = (i: number, fr: number) =>
    Math.max(0, Math.min(1, E(fr, CUT + 1 + i, CUT + 44, 0, 1, OUT) * (1 - i * 0.055)));
  return (
    <Chassis cap={["all the AI models", "race each other"]} hot={0}>
      {/* 1 · five panes, five rates, live latencies */}
      <Sh f={f} a={0} b={CUT} k={0}>
        <NightCircuit f={f} dim={0.28} />
        <ScreenSpill x={14} y={672} w={984} z={14} />
        <AppWindow f={f} x={14} y={152} w={984} h={520} z={26} t={E(f, 0, 12, 0.92, 1, BACK)}>
          <ModeTabs left={0} active={1} f={f} />
          <div style={{ position: "absolute", left: 0, right: 0, top: 42, bottom: 28 }}>
            <RacePanes f={f} left={0} w={984} h={340} at={577 - A} />
          </div>
          <StatusBar f={f} left={0} model={0} />
        </AppWindow>
        <FChip y={686} text="5 MODELS AT ONCE" c={GOLD} />
      </Sh>

      {/* 2 · the circuit finishes it — the board and the track agree */}
      <Sh f={f} a={CUT} b={9999} k={1}>
        <NightCircuit f={f} />
        <FinishPost x={700} top={256} h={434} z={19} />
        {RACERS.map((m, i) => (
          <Racer key={m.name} f={f} i={i} prog={prog(i, f)} x1={654} z={24 + i} />
        ))}
        <TimingTower f={f} prog={RACERS.map((_, i) => prog(i, f))} x={790} y={262} s={0.9} z={36} />
        <MarshalFlag f={f} x={132} y={190} s={0.95} z={31} />
        <Guy f={f} x={4} y={608} size={180} prop="constr" cheer={0.95} z={32} />
        <Guy f={f + 11} x={832} y={616} size={172} prop="cop" cheer={0.95} z={32} />
        <FChip y={712} text="BEST ANSWER WINS" c={GO} />
      </Sh>
    </Chassis>
  );
};

/* ===================================================================== S11 ==
   THE CTA. comment 687 · below 710.
   ============================================================================ */
export const S11Cta: React.FC = () => {
  const f = useCurrentFrame();
  const A = 664;
  return (
    <Chassis cap={["comment FILE", "down below"]} hot={0}>
      <NightCircuit f={f} dim={0.5} />
      <RepoCard f={f} x={246} y={214} s={1.02} at={4}
                t={E(f, 2, 16, 0, 1, BACK)} z={34} />
      {/* the keyword, as the biggest object on screen */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 372, display: "flex",
        justifyContent: "center", zIndex: 42,
        transform: `scale(${E(f, 687 - A, 703 - A, 0, 1, BACK)})` }}>
        <div style={{ padding: "24px 62px", borderRadius: 22, background: CLAY, boxShadow: SH_D,
          fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 112, lineHeight: 1,
          letterSpacing: "-0.05em", color: CARD }}>FILE</div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 528, display: "flex",
        justifyContent: "center", zIndex: 42,
        transform: `scale(${E(f, 710 - A, 724 - A, 0, 1, BACK)})` }}>
        <div style={{ padding: "12px 28px", borderRadius: 14, background: INKD,
          fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 34, color: CARD }}>
          COMMENT IT BELOW
        </div>
      </div>
      {/* ⛔ the CTA died from frame 30 on. A hoarding ribbon of real marks runs
             the full width for the whole scene — continuous, large, on-theme. */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 636, height: 92,
        overflow: "hidden", zIndex: 20 }}>
        {Array.from({ length: 10 }, (_, i) => (
          <LogoTile key={i} src={LOGOS[i % LOGOS.length]}
                    x={((i * 132 - f * 3.4) % 1320) - 154} y={0} s={0.78}
                    r={Math.sin(f / 9 + i) * 4} z={20} />
        ))}
      </div>
      <Guy f={f} x={38} y={556} size={190} prop="constr" cheer={0.9} z={26} />
      <Guy f={f + 12} x={790} y={560} size={186} prop="glasses" cheer={0.9} z={26} />
    </Chassis>
  );
};

/* =========================================================================
   VARIANT SCENES.

   ⛔ IG suppresses near-duplicates. Reels 83/84 varied only the hook and the
      body delta collapsed to ~5; reel 85 fixed it by swapping BODY scenes too.
      Each variant below swaps its OPENING and one body beat, on top of a
      different bed, camera, transition kit, caption band and retime.
   ========================================================================= */

/** B · STANDING START. Same grid, but we are on the line as the lights go out. */
export const S1Start: React.FC = () => {
  const f = useCurrentFrame();
  const GO_F = 20;                                   // lights out
  const launch = E(f, GO_F, 62, 0, 1, IN_Q);
  return (
    <Chassis cap={["Someone", "leaked", "a single file", "to GitHub"]} hot={2}>
      <NightCircuit f={f} />
      {/* the countdown actually runs: five columns lit, then out, then GO */}
      <StartLights f={f} out={Math.max(0, Math.floor((f - 2) / 3.4))}
                   live={f >= GO_F} z={18} />
      <Drone f={f} y={222} z={36} speed={2.2} />

      {RACERS.map((m, i) => {
        const x = 74 + i * 172 + launch * (150 + i * 26);
        return (
          <React.Fragment key={m.name}>
            <div style={{ position: "absolute", left: x - 10, top: 578, width: 124, height: 40,
              border: "4px solid #4A6072", borderTop: "none", zIndex: 18,
              opacity: 1 - launch }} />
            {launch > 0.02 && (
              <Smoke f={f + i * 4} x={x + 20} y={556} n={5} z={19} />
            )}
            <LogoTile src={m.logo} x={x} y={470 - launch * 40} s={1.0}
                      t={E(f, 1 + i * 2, 14 + i * 2, 0, 1, BACK)}
                      r={Math.sin(f / 9 + i) * 3 - launch * 5} z={24 + i} />
          </React.Fragment>
        );
      })}
      <StartGrid f={f} cx={560} at={2} skip={2} dim={0.5} z={16} boxes={false} />

      <PitBoard f={f} x={40} y={116} s={0.58} big="1" sub="FILE"
                t={E(f, 30, 46, 0, 1, OUT)} z={44} />
      <MarshalFlag f={f} x={880} y={188} s={0.9} z={31} />
      <Guy f={f} x={4} y={606} size={182} prop="cop" cheer={0.9} z={32} />
      <Guy f={f + 13} x={828} y={618} size={172} prop="constr" cheer={0.95} z={32} />

      <div style={{ position: "absolute", left: 24, top: 700, display: "flex", alignItems: "center",
        gap: 12, padding: "11px 20px", borderRadius: 14, background: CARD, boxShadow: SH_D,
        zIndex: 44, transform: `scale(${E(f, 44, 58, 0, 1, BACK)})`, transformOrigin: "0% 50%" }}>
        <Img src={staticFile("logos/github.svg")} style={{ width: 30, height: 30 }} />
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 30,
          letterSpacing: "-0.02em", color: INKD }}>{STATS.repo}</div>
        <div style={{ padding: "5px 11px", borderRadius: 8, background: INKD,
          fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 20, color: GOLD }}>
          ★ <Roll f={f} at={48} to={STATS.stars} dur={22} />
        </div>
      </div>
    </Chassis>
  );
};

/** C · THE BOARD. Opens on the timing tower with the field streaming past it. */
export const S1Tower: React.FC = () => {
  const f = useCurrentFrame();
  const prog = (i: number, fr: number) =>
    Math.max(0, Math.min(1, 0.16 + (fr / 62) * (0.96 + i * 0.03) - i * 0.05));
  const px = (i: number) => 40 + prog(i, f) * 470;
  const py = (i: number) => TRACK_TOP + i * LANE_H + (LANE_H - 86 * 0.83) / 2 + 36;
  return (
    <Chassis cap={["Someone", "leaked", "a single file", "to GitHub"]} hot={2}>
      <NightCircuit f={f} />
      <StartLights f={f} z={18} />
      <Drone f={f} y={222} z={36} speed={3.1} />
      {RACERS.map((m, i) => (
        <Smoke key={"s" + m.name} f={f + i * 6} x={px(i)} y={py(i) + 22} n={5} z={17} />
      ))}
      {RACERS.map((m, i) => (
        <Racer key={m.name} f={f} i={i} prog={prog(i, f)} x0={40} x1={510} s={0.86} z={24 + i} />
      ))}
      <Sparks f={f} x={px(0) + 8} y={py(0) + 40} n={10} z={27} />

      {/* the tower is the hero here: big, left of centre, ranking live */}
      <div style={{ position: "absolute", inset: 0, zIndex: 30,
        transform: `scale(${1.34 - E(f, 0, 60, 0, 0.12, IO)})`, transformOrigin: "78% 46%" }}>
        <TimingTower f={f} prog={RACERS.map((_, i) => prog(i, f))} x={606} y={250} s={1.0} z={36} />
      </div>

      <PitBoard f={f} x={30} y={116} s={0.54} big="1" sub="FILE"
                t={E(f, 30, 46, 0, 1, OUT)} z={44} />
      <Guy f={f} x={-10} y={612} size={176} prop="prof" cheer={0.9} z={32} />
      <Guy f={f + 15} x={186} y={628} size={162} prop="cop" cheer={0.85} z={32} />

      <div style={{ position: "absolute", left: 24, top: 700, display: "flex", alignItems: "center",
        gap: 12, padding: "11px 20px", borderRadius: 14, background: CARD, boxShadow: SH_D,
        zIndex: 44, transform: `scale(${E(f, 44, 58, 0, 1, BACK)})`, transformOrigin: "0% 50%" }}>
        <Img src={staticFile("logos/github.svg")} style={{ width: 30, height: 30 }} />
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 30,
          letterSpacing: "-0.02em", color: INKD }}>{STATS.repo}</div>
        <div style={{ padding: "5px 11px", borderRadius: 8, background: INKD,
          fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 20, color: GOLD }}>
          ★ <Roll f={f} at={48} to={STATS.stars} dur={22} />
        </div>
      </div>
    </Chassis>
  );
};

/** B · the three claims as trackside hoardings instead of checkmark rows */
export const S7Boards: React.FC = () => {
  const f = useCurrentFrame();
  const A = 388;
  const ROWS: [string, number, string][] = [
    ["NO LOGIN", 392 - A, GO], ["NO SUBSCRIPTION", 408 - A, BLUE],
    ["YOUR CHATS STAY WITH YOU", 423 - A, CLAY],
  ];
  return (
    <Chassis cap={["No login,", "no subscription"]} hot={0}>
      <NightCircuit f={f} dim={0.5} />
      {ROWS.map(([label, at, c], i) => {
        const t = E(f, at, at + 16, 0, 1, OUT);
        return (
          <div key={label} style={{ position: "absolute", left: 0, right: 0, top: 250 + i * 118,
            height: 92, zIndex: 34, overflow: "hidden" }}>
            <div style={{ position: "absolute", left: `${(1 - t) * (i % 2 ? 110 : -110)}%`,
              right: 0, width: "100%", height: 92, background: c, boxShadow: SH_D,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 46,
              letterSpacing: "-0.03em", color: CARD, whiteSpace: "nowrap" }}>{label}</div>
          </div>
        );
      })}
      <FileModule f={f} x={706} y={216 + (1 - E(f, 44, 74, 0, 1, OUT)) * 470} s={0.7}
                  t={E(f, 44, 58, 0, 1, BACK)} z={40} />
      <Guy f={f} x={-24} y={606} size={172} prop="suit" cheer={0.88} z={42} />
    </Chassis>
  );
};

/** C · GOD MODE painted across a trackside banner instead of a title plate */
export const S3Banner: React.FC = () => {
  const f = useCurrentFrame();
  const A = 160;
  const t = E(f, 169 - A, 185 - A, 0, 1, OUT);
  return (
    <Chassis cap={["They're calling it", "God Mode"]} hot={1}>
      <NightCircuit f={f} dim={0.44} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 246, height: 128,
        overflow: "hidden", zIndex: 40 }}>
        <div style={{ position: "absolute", left: `${(1 - t) * -104}%`, width: "100%",
          height: 128, background: INKD, borderTop: `6px solid ${GOLD}`,
          borderBottom: `6px solid ${GOLD}`, display: "flex", alignItems: "center",
          justifyContent: "center", fontFamily: inter.fontFamily, fontWeight: 900,
          fontSize: 92, letterSpacing: "-0.05em", color: GOLD }}>GOD MODE</div>
      </div>
      {RACERS.map((m, i) => (
        <LogoTile key={m.name} src={m.logo} x={126 + i * 156} y={432} s={0.74}
                  t={E(f, 178 - A + i * 2, 190 - A + i * 2, 0, 1, BACK)}
                  r={Math.sin(f / 8 + i) * 4} z={38} />
      ))}
      <Guy f={f} x={40} y={556} size={182} prop="wizard" cheer={0.85} z={30} />
      <Guy f={f + 11} x={790} y={560} size={178} prop="cop" shock={0.35} z={30} />
    </Chassis>
  );
};
