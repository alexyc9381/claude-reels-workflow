import React from "react";
import { Img, staticFile } from "remotion";
import { inter } from "./fonts";
import { Mascot } from "./SlopKit";

/* =========================================================================
   REEL 91 "ROWBOAT" · THE WORLD — AN AGENCY FLOOR, LIT.

   ⛔ THE HARBOUR WAS THROWN AWAY. It failed the mapping table in
      docs/THE-OPEN.md: a rowboat, a tanker and a buoy are not anything in the
      subject — they are the product's NAME, which the audience has never heard.
      It also lost the feed on brightness: frame 0 measured 64-90 luma against
      a bar of 140.

   The mapping that replaces it, every row filled:

     on screen                          what it actually is
     ---------------------------------  ------------------------------------
     a quote: 1 x AI AGENT, $40,000     what building an agent costs today
     a floor of billable desks          the agency or dev shop you would hire
     the meter climbing                 the stakes
     one prompt line                    the copilot
     a crew of agents at one desk       "multiple agents working together"
     the real repo, Apache-2.0, free    the alternative

   Frame 0 is the quote itself, because that is the thing this audience already
   dreads and recognises with no narration.
   ========================================================================= */

export const PAPER = "#F7F3EA", CREAM = "#EFE7D8", DESK = "#DFD3BC";
export const WALL = "#F2ECE0", WALL_D = "#E4DAC6", FLOOR = "#D6C9B2";
export const INK = "#1B1712", INK_L = "#4A4038", MUTE = "#8C8377";
export const CLAY = "#C96442", GO = "#12A870", RED = "#C0392B", GOLD = "#D9A227";
export const BLUE = "#3D6FB4", PLUM = "#7A5EA8";
export const SH = "0 14px 26px rgba(60,44,28,0.22)";
export const SH_D = "0 20px 38px rgba(60,44,28,0.30)";

export const RB_MARK = "logos/rowboat.png";
export const TOOLS = ["slack", "linear", "jira", "github"];
export const STATS = { stars: 16974, forks: 1687, license: "APACHE-2.0" };

/** a lit office wall: warm, high-key, and never dimmed to make a card pop */
export const Room: React.FC<{ f: number; floorY?: number; z?: number }> =
  ({ f, floorY = 604, z = 1 }) => (<>
  <div style={{ position: "absolute", inset: 0, background: WALL, zIndex: z }} />
  {/* a run of daylight windows — the brightness the feed is competing on */}
  {[0, 1, 2].map((i) => (
    <React.Fragment key={i}>
      <div style={{ position: "absolute", left: 46 + i * 336, top: 96, width: 250, height: 268,
        background: "#FFFDF6", border: `9px solid ${WALL_D}`, zIndex: z + 1 }} />
      <div style={{ position: "absolute", left: 165 + i * 336, top: 96, width: 9, height: 268,
        background: WALL_D, zIndex: z + 2 }} />
    </React.Fragment>
  ))}
  <div style={{ position: "absolute", left: 0, right: 0, top: floorY - 12, height: 12,
    background: WALL_D, zIndex: z + 1 }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: floorY, bottom: 0,
    background: FLOOR, zIndex: z + 1 }} />
  {Array.from({ length: 9 }, (_, i) => (
    <div key={`fl${i}`} style={{ position: "absolute", left: -40 + i * 132, top: floorY,
      width: 6, bottom: 0, background: "#C9BCA4", zIndex: z + 2 }} />
  ))}
</>);

/** the quote. The one string that has to be mute-readable at thumb distance. */
export const Quote: React.FC<{
  x: number; y: number; w?: number; s?: number; z?: number; total?: string;
  weeks?: string; stamp?: number;
}> = ({ x, y, w = 840, s = 1, z = 30, total = "$40,000", weeks = "8 WEEKS", stamp = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, zIndex: z,
    borderRadius: 22 * s, background: PAPER, boxShadow: SH_D, overflow: "hidden",
    paddingBottom: 30 * s }}>
    <div style={{ height: 74 * s, background: INK, display: "flex", alignItems: "center",
      paddingLeft: 30 * s, fontFamily: inter.fontFamily, fontWeight: 900,
      fontSize: 30 * s, letterSpacing: "0.14em", color: PAPER }}>QUOTE</div>
    <div style={{ display: "flex", alignItems: "baseline", gap: 16 * s,
      padding: `${26 * s}px ${30 * s}px 0` }}>
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 46 * s,
        letterSpacing: "-0.02em", color: INK }}>1 &times; AI AGENT</div>
    </div>
    <div style={{ padding: `${4 * s}px ${30 * s}px 0`, fontFamily: inter.fontFamily,
      fontWeight: 900, fontSize: 150 * s, lineHeight: 1.05, letterSpacing: "-0.06em",
      color: INK }}>{total}</div>
    <div style={{ padding: `0 ${30 * s}px`, fontFamily: inter.fontFamily, fontWeight: 900,
      fontSize: 28 * s, letterSpacing: "0.12em", color: MUTE }}>{weeks}</div>
    {stamp > 0 && (
      <div style={{ position: "absolute", left: w * 0.5 - 190 * s, top: 150 * s,
        padding: `${10 * s}px ${26 * s}px`, border: `${8 * s}px solid ${RED}`,
        borderRadius: 12 * s, transform: `rotate(-13deg) scale(${stamp})`,
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 66 * s,
        letterSpacing: "0.06em", color: RED, opacity: 0.94 }}>DECLINED</div>
    )}
  </div>
);

/** a billable desk on the agency floor. Many of these = the wide shot. */
export const Desk: React.FC<{ f: number; x: number; y: number; s?: number; z?: number;
  lit?: number; who?: string }> = ({ f, x, y, s = 1, z = 20, lit = 1, who = "suit" }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
    <div style={{ position: "absolute", left: 22 * s, top: -108 * s }}>
      <Mascot lf={f} size={126 * s} nodAmp={2.4} nodSpeed={12} stern={0.4}
              {...({ [who]: 1 } as any)} />
    </div>
    {/* monitor with a running meter on it — what "billable" looks like */}
    <div style={{ position: "absolute", left: 0, top: 6 * s, width: 172 * s, height: 104 * s,
      borderRadius: 9 * s, background: INK, boxShadow: SH }}>
      <div style={{ position: "absolute", left: 12 * s, top: 14 * s, right: 12 * s,
        height: 13 * s, borderRadius: 7 * s, background: "#3A322A", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, width: `${40 + ((f * 1.6) % 60)}%`,
          background: lit > 0.5 ? RED : "#5A5048" }} />
      </div>
      <div style={{ position: "absolute", left: 12 * s, top: 40 * s,
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 34 * s,
        letterSpacing: "-0.02em", color: lit > 0.5 ? GOLD : "#6A6058",
        fontVariantNumeric: "tabular-nums" }}>
        ${(180 + Math.floor(f * 2.4)).toLocaleString()}
      </div>
    </div>
    <div style={{ position: "absolute", left: -12 * s, top: 112 * s, width: 200 * s,
      height: 15 * s, borderRadius: 4 * s, background: DESK }} />
    <div style={{ position: "absolute", left: 4 * s, top: 127 * s, width: 12 * s,
      height: 62 * s, background: "#C4B79F" }} />
    <div style={{ position: "absolute", left: 160 * s, top: 127 * s, width: 12 * s,
      height: 62 * s, background: "#C4B79F" }} />
  </div>
);

/** the agent, wired to the real tools the README names */
export const Agent: React.FC<{
  f: number; x: number; y: number; s?: number; z?: number; t?: number; who?: string;
}> = ({ f, x, y, s = 1, z = 30, t = 1, who = "glasses" }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 268 * s, height: 320 * s,
    zIndex: z, transform: `scale(${Math.max(0.02, t)})`, transformOrigin: "50% 100%" }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: 24 * s, background: PAPER,
      boxShadow: SH_D, border: `5px solid ${CREAM}` }} />
    <div style={{ position: "absolute", left: 44 * s, top: 20 * s }}>
      <Mascot lf={f} size={180 * s} cheer={0.55} nodAmp={3} nodSpeed={11}
              {...({ [who]: 1 } as any)} />
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 212 * s, textAlign: "center",
      fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 36 * s,
      letterSpacing: "-0.02em", color: INK }}>AI AGENT</div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 258 * s, display: "flex",
      justifyContent: "center", gap: 9 * s }}>
      {TOOLS.map((n, i) => (
        <div key={n} style={{ width: 46 * s, height: 46 * s, borderRadius: 12 * s,
          background: CREAM, display: "flex", alignItems: "center", justifyContent: "center",
          transform: `translateY(${Math.sin(f / 13 + i) * 3 * s}px)` }}>
          <Img src={staticFile(`logos/${n}.svg`)}
               style={{ width: 28 * s, height: 28 * s, objectFit: "contain" }} />
        </div>
      ))}
    </div>
  </div>
);

/** the real mark and wordmark, dark on light so it reads on a bright frame */
export const Mark: React.FC<{ x: number; y: number; s?: number; z?: number; t?: number }> =
  ({ x, y, s = 1, z = 50, t = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z, display: "flex",
    alignItems: "center", gap: 15 * s,
    transform: `scale(${Math.max(0.02, t)})`, transformOrigin: "0% 50%" }}>
    <div style={{ width: 92 * s, height: 92 * s, borderRadius: 21 * s, overflow: "hidden",
      background: "#FFFFFF", boxShadow: SH }}>
      <Img src={staticFile(RB_MARK)}
           style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </div>
    <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 60 * s,
      letterSpacing: "-0.03em", color: INK }}>rowboat</div>
  </div>
);
