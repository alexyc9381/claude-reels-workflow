import React from "react";
import { AbsoluteFill, useCurrentFrame, Img, staticFile } from "remotion";
import { inter } from "./fonts";
import { Bg, Panel, ProgressBar, Caption, AssemblyCtx, hexA } from "./SlopKit";
import { Dev } from "./KeyWorld";
import {
  NodeGraph, BrandTile, AChip, BrandStack, RepoCard, CardTowerV, HeroCard,
  SkylineNight, RackHall, ShadowFloor, NotifWall, FileRelic, Conveyor, WallClock,
  BRAND_TASKS, AUTO_BRANDS, AUTO_CATS, AUTO_CAT_ICONS, DoneCard, LogoWall,
  A1, A2, A3, A4, CARD, INKD, MUTE, RED, RED_D, GO, BLUE, STEEL, STEEL_L, STEEL_D,
  N8N_ACCENT, N8N_BG, N8N_GRID,
} from "./AutoWorld";
import { E, osc, rnd, OUT, IO, BACK, IN_Q } from "./MissionWorld";

/* =========================================================================
   REEL 85 "AUTO" · THE BODY.

   World: THE NIGHT TOWER. A city at night, and a column of branded work that
   leaves the top of frame. Chosen after seven candidates across three rounds;
   the winning mechanism is DEPTH — cards shrink with height, so the nearest are
   readable and the far ones recede into mass.

   ⛔ The two notes that shaped it, both correct:
     "not just the same kind of podium idea each time"  — a concept is the
        MECHANISM, not the prop. Five plinths were one idea in five costumes.
     "the logos are hard to see, so they'd just scroll" — marks went 23px -> 40px.
        A mark under ~32px on a 1012-wide panel is texture, not information.

   One location per beat (memory `feedback_reel_vary_the_locations`):
     S1 the three rooms · S2 the brand hall + 18 doors · S3 the import
     S4 the dawn yard   · S5 the CTA

   Scenes render CHASSIS-FREE under AssemblyCtx: ROOT owns bg, rail and captions.
   ========================================================================= */

/** per-variant camera, applied INSIDE the Panel so the chassis never moves */
export const AutoCamCtx = React.createContext<{ z: number; dx: number; dy: number }>(
  { z: 1, dx: 0, dy: 0 });

const Chassis: React.FC<{ children: React.ReactNode; cap?: string[]; hot?: number }> =
  ({ children, cap, hot }) => {
  const solo = !React.useContext(AssemblyCtx);
  const cam = React.useContext(AutoCamCtx);
  return (
    <AbsoluteFill>
      {solo && <><Bg /><ProgressBar /></>}
      <Panel glow={hexA(A3, 0.28)}>
        <div style={{ position: "absolute", inset: 0,
          transform: `scale(${cam.z}) translate(${cam.dx}px, ${cam.dy}px)`,
          transformOrigin: "50% 54%" }}>{children}</div>
      </Panel>
      {solo && cap && <Caption words={cap} hot={hot} />}
    </AbsoluteFill>
  );
};

const Sh: React.FC<{ f: number; a: number; b: number; k?: number; pan?: number; len?: number;
  children: React.ReactNode }> = ({ f, a, b, k = 0, pan = 0, len, children }) => {
  if (f < a || f >= b) return null;
  const t = Math.min(1, (f - a) / 30), e = t * t * (3 - 2 * t);
  const z = [1.06 - e * 0.05, 1.01 + e * 0.05, 1.04 - e * 0.035, 1.02 + e * 0.045][k % 4];
  const dx = [0, -8, 7, -5][k % 4] * (1 - e);
  const prog = len ? Math.min(1, (f - a) / len) : 0;
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden",
      transform: `scale(${z + (pan ? 0.07 : 0)}) translateX(${dx + pan * prog}px)`,
      transformOrigin: "50% 56%" }}>{children}</div>
  );
};

/** a lit room panel — the "your X does Y" beats each get their own */
const RoomPanel: React.FC<{
  f: number; x: number; y: number; w?: number; h?: number; slug: string; title: string;
  t?: number; done?: number; z?: number;
}> = ({ f, x, y, w = 296, h = 330, slug, title, t = 1, done = 0, z = 20 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
    borderRadius: 14, background: CARD, overflow: "hidden", fontFamily: inter.fontFamily,
    transform: `scale(${Math.max(0.02, t)})`, boxShadow: "0 14px 22px rgba(0,0,0,0.66)" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 11, padding: "14px 15px",
      borderBottom: "2px solid #E4DED0" }}>
      <Img src={staticFile(`logos/${slug}`)}
           style={{ width: 32, height: 32, objectFit: "contain", display: "block" }} />
      <div style={{ fontWeight: 900, fontSize: 21, color: INKD }}>{title}</div>
    </div>
    {/* rows that tick themselves off, top down */}
    {Array.from({ length: 6 }, (_, i) => {
      const on = done > (i + 0.5) / 6;
      return (
        <div key={i} style={{ position: "absolute", left: 15, right: 15, top: 80 + i * 40,
          height: 32, borderRadius: 7, background: on ? "#E4F5EE" : "#EFEAE0",
          display: "flex", alignItems: "center", paddingLeft: 11, gap: 10 }}>
          <div style={{ width: 20, height: 20, borderRadius: "50%",
            background: on ? GO : "#CFC7B8", display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: 13, fontWeight: 900, color: "#EAFBF3" }}>
            {on ? "✓" : ""}
          </div>
          <div style={{ width: [120, 92, 138, 104, 126, 86][i], height: 8, borderRadius: 4,
            background: on ? "#9CC9B8" : "#CFC7B8" }} />
        </div>
      );
    })}
  </div>
);

/* ================================================== S1 · THE THREE ROOMS ====
   5.56-10.46 · "Your inbox sorts itself, your leads get followed up on while
   you sleep, your content gets posted to every social media platform."
   Each clause lands on its OWN measured onset. Scene starts at 5.46.

   ⛔ MEASURED: the back half of this scene ran at 0.94 motion — the three panels
   filled and then simply held for ~1.3s, which is exactly the 9-second mark.
   Each panel now EMITS its finished work: branded cards fly out and away, a DONE
   stamp lands, and a counter climbs. The story is the same, the frame is alive.
   ========================================================================== */
export const S1Rooms: React.FC = () => {
  const f = useCurrentFrame();
  /* measured onsets, scene-relative: inbox 5.56 · leads 6.52 · content 7.90 */
  const LANES = [
    { at: 3,  x: 26,  slug: "gmail.svg",    title: "Inbox" },
    { at: 32, x: 358, slug: "whatsapp.svg", title: "Leads" },
    { at: 73, x: 690, slug: "notion.svg",   title: "Content" },
  ];
  /* every job that has flown out by now, across all three lanes */
  const shipped = LANES.reduce((n, L) =>
    n + Math.max(0, Math.floor((f - (L.at + 34)) / 9)), 0);
  return (
    <Chassis cap={["Your", "inbox", "sorts", "itself"]} hot={1}>
      <Sh f={f} a={0} b={9999} k={0} pan={-70} len={147}>
        <SkylineNight f={f} z={3} />
        {LANES.map((L, li) => {
          const done = E(f, L.at + 6, L.at + 40, 0, 1, IO);
          return (
            <React.Fragment key={L.title}>
              <RoomPanel f={f} x={L.x} y={196} slug={L.slug} title={L.title}
                         t={E(f, L.at, L.at + 14, 0, 1, BACK)} done={done} z={20 + li} />
              {/* the DONE stamp, landing hard once the panel clears */}
              {f > L.at + 36 && (
                <div style={{ position: "absolute", left: L.x + 58, top: 300,
                  padding: "10px 22px", borderRadius: 9, background: GO, zIndex: 34,
                  fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 30,
                  letterSpacing: "0.16em", color: "#EAFBF3",
                  transform: `rotate(-7deg) scale(${E(f, L.at + 36, L.at + 46, 1.9, 1, OUT)})`,
                  boxShadow: "0 8px 14px rgba(0,0,0,0.6)" }}>DONE</div>
              )}
              {/* finished work leaving the room, one card at a time, to the end */}
              {Array.from({ length: 7 }, (_, i) => {
                const born = L.at + 34 + i * 9;
                const t = E(f, born, born + 34, 0, 1, OUT);
                if (t <= 0.02 || t >= 1) return null;
                const b = BRAND_TASKS[(li * 3 + i) % BRAND_TASKS.length];
                return (
                  <DoneCard key={`e${li}-${i}`} slug={b.slug} s={0.6}
                            x={L.x + 84 + t * (i % 2 ? 150 : -130)}
                            y={330 - t * 300}
                            rot={t * (i % 2 ? 40 : -40)} op={1 - t * 0.8} z={32} />
                );
              })}
            </React.Fragment>
          );
        })}
        {/* the count of work shipped while he sleeps — a number that MOVES */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 566, textAlign: "center",
          fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 46, letterSpacing: "-0.02em",
          color: A1, zIndex: 30 }}>{shipped} DONE</div>
        <Dev f={f} x={396} y={598} size={190} gaze={0} nodAmp={1.3} nodSpeed={28} z={26} />
        <div style={{ position: "absolute", left: 590, top: 614, fontFamily: inter.fontFamily,
          fontWeight: 900, fontSize: 38, color: "#4A5866", zIndex: 26,
          opacity: 0.45 + 0.45 * Math.sin(f / 20) }}>z z z</div>
        <AChip y={712} text="WHILE YOU SLEEP" c={GO} size={34} />
      </Sh>
    </Chassis>
  );
};

/* ============================================ S2 · THE HALL + 18 DOORS ======
   10.46-14.26 · "Gmail, Slack, WhatsApp, Notion, Stripe, 18 categories."

   ⛔ STRIPE IS NOT IN THE REPO — verified against the full 374-file tree: zero
   files, zero README mentions. The four real marks land on their own measured
   onsets, and on "Stripe" (11.80) the graphic CUTS to the 18-category wall,
   which the VO names 0.5s later. No false logo is ever drawn and no gap opens.
   ========================================================================== */
export const S2Hall: React.FC = () => {
  const f = useCurrentFrame();
  /* scene starts 10.36 · Gmail 10.46 Slack 10.60 WhatsApp 11.24 Notion 11.48 */
  const ON = [3, 7, 26, 34];
  const A = 44;                                   // "Stripe" at 11.80 -> frame 43
  return (
    <Chassis cap={["Gmail,", "Slack,", "WhatsApp,", "Notion"]} hot={0}>
      {/* 1 · the four REAL marks, each on its own word */}
      <Sh f={f} a={0} b={A} k={1}>
        <div style={{ position: "absolute", inset: 0, background: "#080C12" }} />
        {AUTO_BRANDS.map((b, i) => (
          <BrandTile key={b.slug} x={62 + i * 226} y={288} s={1.02} slug={b.slug} name={b.name}
                     t={E(f, ON[i], ON[i] + 12, 0, 1, BACK)} z={26} />
        ))}
      </Sh>

      {/* 2 · the 18 categories, as a wall that fills */}
      <Sh f={f} a={A} b={9999} k={2} pan={26} len={70}>
        <div style={{ position: "absolute", inset: 0, background: "#080C12" }} />
        {/* ⛔ was a numbered tile with a text caption — a list, not a graphic.
               Every category now shows its real mark (PDF and HR get drawn
               glyphs, since neither has a brand). */}
        {AUTO_CAT_ICONS.map((c, i) => {
          const t = E(f, A + 1 + i * 1.4, A + 12 + i * 1.4, 0, 1, BACK);
          return (
            <div key={c.name} style={{ position: "absolute", left: 24 + (i % 6) * 156,
              top: 178 + Math.floor(i / 6) * 128, width: 140, height: 108, borderRadius: 11,
              background: CARD, transform: `scale(${Math.max(0.02, t)})`, zIndex: 20,
              boxShadow: "0 8px 12px rgba(0,0,0,0.6)" }}>
              <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 6,
                background: [A3, GO, BLUE, N8N_ACCENT, A4, RED][i % 6] }} />
              <div style={{ position: "absolute", left: 0, right: 0, top: 24,
                display: "flex", justifyContent: "center" }}>
                <Img src={staticFile(`logos/${c.slug}`)}
                     style={{ width: 48, height: 48, objectFit: "contain", display: "block" }} />
              </div>
              <div style={{ position: "absolute", left: 0, right: 0, bottom: 10, textAlign: "center",
                fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 13, letterSpacing: "0.04em",
                color: "#8E8677", padding: "0 5px", whiteSpace: "nowrap", overflow: "hidden" }}>
                {c.name}</div>
            </div>
          );
        })}
        <AChip y={694} text="18 CATEGORIES" c={A3} size={42} />
      </Sh>
    </Chassis>
  );
};

/* ================================================== S3 · THE IMPORT ========
   14.26-18.20 · "You don't have to build any of them. You just have to grab one
   file, click import, and it starts running."
   ========================================================================== */
export const S3Import: React.FC = () => {
  const f = useCurrentFrame();
  /* scene starts 14.16 · grab 15.98 -> f55 · import 16.80 -> f79 · running 17.49 -> f100 */
  const GRAB = 52, CLICK = 79, RUN = 98;
  return (
    <Chassis cap={["You", "grab", "one", "file"]} hot={1}>
      <Sh f={f} a={0} b={9999} k={3} pan={-76} len={118}>
        <div style={{ position: "absolute", inset: 0, background: "#080C12" }} />
        {/* an n8n canvas, empty, waiting */}
        <div style={{ position: "absolute", left: 70, top: 214, width: 872, height: 396,
          borderRadius: 16, background: N8N_BG, zIndex: 10, overflow: "hidden",
          boxShadow: "0 18px 28px rgba(0,0,0,0.7)" }}>
          {Array.from({ length: 16 }, (_, r) =>
            Array.from({ length: 34 }, (_, c) => (
              <div key={`${r}-${c}`} style={{ position: "absolute", left: c * 26, top: r * 26,
                width: 3, height: 3, borderRadius: "50%", background: N8N_GRID }} />
            ))
          )}
          {/* the drop zone, until the file lands */}
          {f < CLICK && (
            <div style={{ position: "absolute", left: 240, top: 130, width: 392, height: 136,
              borderRadius: 14, border: `4px dashed #C3C6D2`, display: "flex", alignItems: "center",
              justifyContent: "center", fontFamily: inter.fontFamily, fontWeight: 900,
              fontSize: 26, letterSpacing: "0.06em", color: "#A8ACBA" }}>DROP A FILE</div>
          )}
          {/* it runs */}
          {f >= CLICK && <NodeGraph f={f} x={0} y={-16} w={872} h={396} at={CLICK + 2} z={14} />}
        </div>
        {/* ⛔ frames 0-52 were dead waiting for the grab (which is pinned to the
               measured onset of "grab" and must not move). Filled with the thing
               you are actually choosing FROM: the repo's file list, scrolling. */}
        {f < GRAB + 14 && (
          <div style={{ position: "absolute", left: 700, top: 226, width: 290, height: 372,
            borderRadius: 12, background: CARD, overflow: "hidden", zIndex: 26,
            opacity: 1 - E(f, GRAB, GRAB + 14, 0, 1, IO),
            boxShadow: "0 12px 20px rgba(0,0,0,0.66)" }}>
            <div style={{ padding: "12px 14px", borderBottom: "2px solid #E4DED0",
              fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 17, color: INKD }}>
              280 workflows
            </div>
            {Array.from({ length: 9 }, (_, i) => {
              const b2 = BRAND_TASKS[(i + Math.floor(f / 9)) % BRAND_TASKS.length];
              return (
                <div key={i} style={{ position: "absolute", left: 10, right: 10,
                  top: 54 + ((i * 42 - f * 1.6) % 378), height: 36, borderRadius: 7,
                  background: "#F1ECE2", display: "flex", alignItems: "center", gap: 9,
                  paddingLeft: 10 }}>
                  <Img src={staticFile(`logos/${b2.slug}`)}
                       style={{ width: 20, height: 20, objectFit: "contain", display: "block" }} />
                  <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 14,
                    color: "#5A5346", whiteSpace: "nowrap" }}>{b2.task}.json</div>
                </div>
              );
            })}
          </div>
        )}
        {/* a signal travelling the wires once it runs — the back half was static */}
        {f >= CLICK + 8 && (<>
          {Array.from({ length: 3 }, (_, i) => {
            const t = ((f - CLICK - 8) * 0.022 + i / 3) % 1;
            return (
              <div key={`sig${i}`} style={{ position: "absolute",
                left: 110 + t * 770, top: 366 + Math.sin(t * Math.PI * 2) * 100,
                width: 26, height: 26, borderRadius: "50%", background: N8N_ACCENT, zIndex: 28 }} />
            );
          })}
          {/* each node FIRES as the signal reaches it — a 168x92 block changing
              state moves far more pixels than a 26px dot travelling past it */}
          {[0, 1, 2, 3].map((i) => {
            const ph = ((f - CLICK - 8) * 0.022 * 4 + 4 - i) % 4;
            const hot = ph < 0.9 ? 1 - ph / 0.9 : 0;
            if (hot <= 0.02) return null;
            const px = [96, 316, 536, 756][i], py = [316, 434, 316, 434][i];
            return (
              <div key={`nf${i}`} style={{ position: "absolute", left: px, top: py,
                width: 176, height: 100, borderRadius: 12, zIndex: 27,
                background: N8N_ACCENT, opacity: hot * 0.85,
                transform: `scale(${1 + hot * 0.09})` }} />
            );
          })}
        </>)}
        {/* the file, carried in and dropped */}
        {f < CLICK + 6 && (
          <div style={{ position: "absolute",
            left: E(f, GRAB, CLICK, 812, 396, IO),
            top: E(f, GRAB, CLICK, 470, 268, IO),
            transform: `scale(${E(f, GRAB, CLICK, 1, 0.56, IO)})`, zIndex: 30 }}>
            <FileRelic f={f} x={0} y={0} s={1.0} z={30} />
          </div>
        )}
        {/* the IMPORT button, pressed */}
        <div style={{ position: "absolute", left: 366, top: 648, width: 280, height: 66,
          borderRadius: 12, zIndex: 32, background: f >= CLICK ? GO : N8N_ACCENT,
          transform: `scale(${f >= CLICK && f < CLICK + 8 ? 0.93 : 1})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 27, letterSpacing: "0.14em",
          color: "#FFF8ED", boxShadow: "0 8px 14px rgba(0,0,0,0.6)" }}>
          {f >= CLICK ? "RUNNING" : "IMPORT"}
        </div>
        <Dev f={f} x={20} y={506} size={196} gaze={1} cheer={f > RUN ? 0.9 : 0.3}
             nodAmp={f > RUN ? 3.6 : 2} nodSpeed={f > RUN ? 9 : 14} z={28} />
        <AChip y={140} text={f >= CLICK ? "AND IT JUST RUNS" : "YOU BUILD NOTHING"}
               c={f >= CLICK ? GO : RED} size={36} />
      </Sh>
    </Chassis>
  );
};

/* ================================================ S4 · THE DAWN YARD =======
   18.20-20.50 · "Everyone else is still doing all of this by hand every morning."

   ⛔ REBUILT. v1 put three equal towers and three figures across 1012px: the
   cards cut through the mascots' heads, the right tower clipped the panel edge
   and the hand-carried card landed on top of a figure. Three of everything at
   the same size is not composition, it is congestion.

   Now the scene uses the reel's own mechanism — DEPTH. One figure and one
   readable tower in the foreground, and the "everyone else" reads from two
   towers receding into the dark behind, smaller and dimmer. Nothing overlaps.
   ========================================================================== */
export const S4Everyone: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Chassis cap={["Everyone", "else", "is", "still doing"]} hot={0}>
      <Sh f={f} a={0} b={9999} k={0} pan={44} len={69}>
        <RackHall f={f} z={3} />

        {/* ⛔ the two behind are SILHOUETTES now, not shrunken copies. They were
               overlapping each other and carrying unreadable text at 34-52%
               opacity, which reads as a smudge. Separated, de-typed, and only
               lightly dimmed — detail does the receding, opacity assists. */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.5, zIndex: 8 }}>
          <CardTowerV f={f + 40} x={128} base={430} n={5} w={132} h={30} persp={0.05} far z={8} />
        </div>
        <div style={{ position: "absolute", inset: 0, opacity: 0.68, zIndex: 10 }}>
          <CardTowerV f={f + 18} x={352} base={492} n={6} w={172} h={38} persp={0.05} far z={10} />
        </div>
        {/* the hero: ONE figure, ONE readable tower, and clear space between */}
        <CardTowerV f={f} x={716} base={648} n={10} w={356} h={74} persp={0.045} z={18} />
        <Dev f={f} x={62} y={452} size={206} gaze={2} stern={0.75} nodAmp={1.8} nodSpeed={18} z={26} />

        {/* one card carried across the gap, by hand, for the whole scene */}
        {/* ⛔ was a second "Sort inbox" with the same Gmail mark as the tower's
               bottom card, so the label read twice in one frame. Different task,
               and the path starts clear of the stack. */}
        <div style={{ position: "absolute", left: E(f, 6, 64, 548, 286, IO),
          top: 588 - E(f, 6, 64, 0, 40, IO), width: 250, height: 52, borderRadius: 9,
          background: CARD, zIndex: 30, boxShadow: "0 7px 12px rgba(0,0,0,0.66)",
          display: "flex", alignItems: "center", gap: 12, paddingLeft: 14,
          transform: `rotate(${E(f, 6, 64, 4, -9, IO)}deg)` }}>
          <Img src={staticFile("logos/whatsapp.svg")}
               style={{ width: 26, height: 26, objectFit: "contain", display: "block" }} />
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 19,
            color: INKD }}>Reply to lead</div>
        </div>

        <AChip y={706} text="EVERY MORNING. FOREVER." c={RED} size={34} />
      </Sh>
    </Chassis>
  );
};

/* ======================================================== S5 · THE CTA =====
   20.50-21.98 · "Comment AUTO and I'll send you the repo."
   ========================================================================== */
export const S5Cta: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Chassis cap={["Comment", "AUTO"]} hot={1}>
      <Sh f={f} a={0} b={9999} k={1}>
        <SkylineNight f={f} z={3} />
        {/* the CTA gets its OWN column — a buried CTA passes the gate and dies */}
        <div style={{ position: "absolute", left: 146, top: 176, width: 720, height: 214,
          borderRadius: 18, background: CARD, zIndex: 30,
          boxShadow: "0 18px 28px rgba(0,0,0,0.7)" }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 58,
            borderRadius: "16px 16px 0 0", background: GO, fontFamily: inter.fontFamily,
            fontWeight: 900, fontSize: 25, letterSpacing: "0.2em", color: "#EAFBF3",
            textAlign: "center", lineHeight: "58px" }}>COMMENT</div>
          <div style={{ position: "absolute", left: 0, right: 0, top: 76, textAlign: "center",
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 112, letterSpacing: "-0.04em",
            color: INKD, transform: `scale(${E(f, 2, 16, 0.6, 1, BACK)})` }}>AUTO</div>
        </div>
        <RepoCard f={f} x={272} y={428} s={1.0} t={E(f, 8, 22, 0, 1, BACK)} z={32} />
        <Dev f={f} x={40} y={520} size={200} gaze={1} cheer={0.95} nodAmp={4} nodSpeed={8} z={26} />
        <Dev f={f + 14} x={798} y={526} size={188} gaze={-1} cheer={0.95} nodAmp={4} nodSpeed={9} z={26} />
      </Sh>
    </Chassis>
  );
};

/* =========================================================================
   VARIANT BODY SCENES.

   ⛔ In reels 83/84 the variants shared one body and the measured body delta
   collapsed to ~5 — roughly 85% of each cut was identical. The hook carries the
   delta, but the hook is only a quarter of the runtime. These give cuts B and C
   a genuinely different middle as well, on the SAME measured onsets.
   ========================================================================= */

/** B's S1 — the three jobs arrive on belts instead of in room panels.
    Same three measured onsets: inbox 5.56 · leads 6.52 · content 7.90 */
export const S1Belts: React.FC = () => {
  const f = useCurrentFrame();
  const ON = [3, 32, 73];
  const LANES = [
    { slug: "gmail.svg",    label: "Inbox" },
    { slug: "whatsapp.svg", label: "Leads" },
    { slug: "notion.svg",   label: "Content" },
  ];
  return (
    <Chassis cap={["Your", "inbox", "sorts", "itself"]} hot={1}>
      <Sh f={f} a={0} b={9999} k={2} pan={34} len={147}>
        <div style={{ position: "absolute", inset: 0, background: "#080C12" }} />
        {LANES.map((ln, r) => {
          const live = f > ON[r];
          const y = 152 + r * 186;
          return (
            <React.Fragment key={ln.label}>
              <Conveyor f={f - ON[r]} y={y} speed={2.6 + r * 0.6} s={1.15} z={10 + r} />
              {/* the lane's own mark, parked at the head of the belt */}
              <div style={{ position: "absolute", left: 52, top: y - 62, width: 104, height: 104,
                borderRadius: 12, background: CARD, zIndex: 24,
                transform: `scale(${E(f, ON[r], ON[r] + 12, 0, 1, BACK)})`,
                boxShadow: "0 8px 12px rgba(0,0,0,0.6)" }}>
                <div style={{ position: "absolute", left: 0, right: 0, top: 16,
                  display: "flex", justifyContent: "center" }}>
                  <Img src={staticFile(`logos/${ln.slug}`)}
                       style={{ width: 42, height: 42, objectFit: "contain", display: "block" }} />
                </div>
                <div style={{ position: "absolute", left: 0, right: 0, bottom: 9, textAlign: "center",
                  fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 13,
                  color: "#8E8677" }}>{ln.label.toUpperCase()}</div>
              </div>
              {/* raw in on the left, ticked on the right */}
              {/* ⛔ these were 66x48 blanks that became bare green squares. The card
                     keeps its mark and TAKES a tick, and it is big enough to read. */}
              {live && Array.from({ length: 5 }, (_, i) => {
                const x = ((i * 214 - (f - ON[r]) * (2.6 + r * 0.6)) % 1200) - 60;
                const done = x > 540;
                const b2 = BRAND_TASKS[(r * 3 + i) % BRAND_TASKS.length];
                return done
                  ? <DoneCard key={i} x={x + 130} y={y - 74} s={0.72} slug={b2.slug} z={22} />
                  : (
                    <div key={i} style={{ position: "absolute", left: x + 130, top: y - 74,
                      width: 95, height: 66, borderRadius: 10, zIndex: 22, background: CARD,
                      boxShadow: "0 5px 9px rgba(0,0,0,0.55)", display: "flex",
                      alignItems: "center", justifyContent: "center" }}>
                      <Img src={staticFile(`logos/${b2.slug}`)}
                           style={{ width: 44, height: 44, objectFit: "contain", display: "block" }} />
                    </div>
                  );
              })}
            </React.Fragment>
          );
        })}
        <Dev f={f} x={824} y={556} size={172} gaze={0} nodAmp={1.3} nodSpeed={28} z={26} />
        <div style={{ position: "absolute", left: 762, top: 570, fontFamily: inter.fontFamily,
          fontWeight: 900, fontSize: 34, color: "#4A5866", zIndex: 26,
          opacity: 0.45 + 0.45 * Math.sin(f / 20) }}>z z z</div>
        <AChip y={706} text="WHILE YOU SLEEP" c={GO} size={36} />
      </Sh>
    </Chassis>
  );
};

/** C's S4 — everyone else, seen as a clock running out at dawn instead of a yard */
export const S4Dawn: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Chassis cap={["Everyone", "else", "is", "still doing"]} hot={0}>
      <Sh f={f} a={0} b={9999} k={3} pan={-52} len={69}>
        <div style={{ position: "absolute", inset: 0, background: "#080C12" }} />
        {/* the hours burning away while the pile does not move */}
        <WallClock f={f} cx={278} cy={318} r={168} hours={E(f, 2, 66, 6, 8.4, IO)} z={22} />
        <div style={{ position: "absolute", left: 128, top: 500, width: 300, textAlign: "center",
          fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 40, letterSpacing: "0.14em",
          color: "#5D6B79", zIndex: 24 }}>6 AM</div>
        {/* their pile, untouched, one card lifted by hand the whole scene */}
        <CardTowerV f={f} x={734} base={648} n={9} w={330} h={70} persp={0.05} z={18} />
        <Dev f={f} x={470} y={480} size={182} gaze={1} stern={0.75} nodAmp={1.8} nodSpeed={18} z={26} />
        <div style={{ position: "absolute", left: E(f, 6, 64, 596, 402, IO),
          top: 574 - E(f, 6, 64, 0, 30, IO), width: 236, height: 50, borderRadius: 9,
          background: CARD, zIndex: 30, boxShadow: "0 7px 12px rgba(0,0,0,0.66)",
          display: "flex", alignItems: "center", gap: 11, paddingLeft: 13,
          transform: `rotate(${E(f, 6, 64, 4, -9, IO)}deg)` }}>
          <Img src={staticFile("logos/slack.svg")}
               style={{ width: 24, height: 24, objectFit: "contain", display: "block" }} />
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 18,
            color: INKD }}>Post update</div>
        </div>
        <AChip y={706} text="EVERY MORNING. FOREVER." c={RED} size={34} />
      </Sh>
    </Chassis>
  );
};
