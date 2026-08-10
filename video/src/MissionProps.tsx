import React from "react";
import { Img, OffthreadVideo, staticFile } from "remotion";
import { inter } from "./fonts";
import { E, osc, rnd, OUT, IO, BACK, SH, SH_D, RED, RED_D, AMBER, GO, GO_L, CARD } from "./MissionWorld";

/* =========================================================================
   MISSION PROPS — the objects the SCRIPT actually names.

   ⛔ Why this file exists. The nine worlds were right but the things in them
   were not: "make the scenes more related to whats being spoken about in the
   script since right now its tooo abstract." The line says "he deleted 80% of
   the SYSTEM PROMPT" and the frame showed anonymous supply crates. The line says
   "written to babysit an OLDER MODEL" and the frame showed a derelict rover.

   So each prop here is the literal noun from its line:

     "80% of the system prompt"        -> SheetStack  (prompt pages, struck out)
     "rules to babysit an older model" -> Rulebook + Rails on an OLD unit
     "a task that feels too hard"      -> TaskCard    (difficulty past comfortable)
     "check its own work"              -> Checklist   (ticks itself)
     "watch where it actually breaks"  -> StepChain   (a numbered step snaps)
     "the wording of the prompt"       -> Sheet struck
     "rewrite an app in a language"    -> AppBuild    (blocks convert, left to right)

   Manufactured flat objects (pages, cards, books, plates) read fine as stacked
   divs; nothing organic is attempted here. House palette: solid matte paints,
   dark drop shadows, no glow.
   ========================================================================= */

const SHADOW = "drop-shadow(0 7px 7px rgba(26,30,40,0.34))";

/** one page of instructions. `struck` scores it out in red. */
export const Sheet: React.FC<{
  x: number; y: number; w?: number; h?: number; lines?: number; mark?: boolean;
  struck?: number; title?: string; c?: string; z?: number; rot?: number;
}> = ({ x, y, w = 190, h = 240, lines = 6, mark = false, struck = 0, title, c = RED, z = 14, rot = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
    transform: `rotate(${rot}deg)`, filter: SHADOW }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: 6, background: CARD }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: h * 0.16,
      borderRadius: "6px 6px 0 0", background: c }} />
    {title && (
      <div style={{ position: "absolute", left: 0, right: 0, top: h * 0.028, textAlign: "center",
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: h * 0.092,
        letterSpacing: "0.04em", color: "#FFF6F2" }}>{title}</div>
    )}
    {Array.from({ length: lines }, (_, i) => (
      <div key={i} style={{ position: "absolute", left: w * 0.1, top: h * (0.26 + i * 0.108),
        width: w * (0.8 - (i % 3) * 0.16), height: Math.max(5, h * 0.036), borderRadius: 3,
        background: "#CFC8BC" }} />
    ))}
    {mark && (
      <div style={{ position: "absolute", left: w * 0.72, top: h * 0.72, width: w * 0.2, height: w * 0.2 }}>
        <Img src={staticFile("claude_logo.png")}
          style={{ width: "100%", height: "100%", objectFit: "contain",
            filter: "brightness(0) saturate(100%) invert(28%) sepia(58%) saturate(2200%) hue-rotate(343deg)" }} />
      </div>
    )}
    {struck > 0 && (
      <svg viewBox="0 0 100 100" width={w} height={h} preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, overflow: "visible" }}>
        <path d="M8 14 L92 88" stroke={RED_D} strokeWidth={7} strokeLinecap="round"
          pathLength={100} strokeDasharray={100} strokeDashoffset={100 * (1 - Math.min(1, struck * 2))} />
        <path d="M92 14 L8 88" stroke={RED_D} strokeWidth={7} strokeLinecap="round"
          pathLength={100} strokeDasharray={100} strokeDashoffset={100 * (1 - Math.max(0, struck * 2 - 1))} />
      </svg>
    )}
  </div>
);

/** THE SYSTEM PROMPT as a physical stack of pages. `gone` strips it from the top. */
export const SheetStack: React.FC<{
  f: number; x: number; y: number; cols?: number; rows?: number; cw?: number; ch?: number;
  gone?: number; at?: number; every?: number; z?: number;
}> = ({ f, x, y, cols = 3, rows = 5, cw = 78, ch = 76, gone = 0, at = 6, every = 1, z = 12 }) => {
  const total = cols * rows, lift = Math.round(total * gone);
  return (
    <div style={{ position: "absolute", left: x, top: y, width: cols * cw, height: rows * ch, zIndex: z }}>
      {Array.from({ length: total }, (_, i) => {
        const r = Math.floor(i / cols), col = i % cols;
        const up = i < lift;                                   // strip from the TOP row down
        const t = E(f, at + i * every, at + 22 + i * every, 0, 1, OUT);
        const dy = up ? -t * (430 + i * 22) : 0;
        return (
          <div key={i} style={{ position: "absolute", left: col * cw, top: r * ch + dy,
            width: cw - 7, height: ch - 7, borderRadius: 4, opacity: up ? 1 - t * 0.85 : 1,
            background: CARD, boxShadow: SH,
            transform: up ? `rotate(${(rnd(i, 2) - 0.5) * 26 * t}deg)` : undefined }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 12,
              borderRadius: "4px 4px 0 0", background: (r + col) % 2 ? RED : RED_D }} />
            {[0, 1, 2].map((k) => (
              <div key={k} style={{ position: "absolute", left: 9, top: 22 + k * 13,
                width: (cw - 7) * (0.72 - k * 0.14), height: 5, borderRadius: 2, background: "#CFC8BC" }} />
            ))}
          </div>
        );
      })}
    </div>
  );
};

/** the RULEBOOK that was written to babysit the old model — thick, bound, strapped on */
export const Rulebook: React.FC<{ x: number; y: number; s?: number; z?: number; rot?: number }> =
  ({ x, y, s = 1, z = 16, rot = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 148 * s, height: 178 * s, zIndex: z,
    transform: `rotate(${rot}deg)`, filter: SHADOW }}>
    <svg viewBox="0 0 148 178" width={148 * s} height={178 * s} style={{ overflow: "visible" }}>
      <rect x={10} y={8} width={130} height={162} rx={7} fill="#7A5A38" />
      <rect x={22} y={14} width={118} height={150} rx={5} fill={CARD} />
      <rect x={10} y={8} width={26} height={162} rx={7} fill="#5E4429" />
      <rect x={44} y={34} width={78} height={11} rx={4} fill={RED} />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={44} y={60 + i * 19} width={78 - (i % 3) * 20} height={8} rx={3} fill="#CFC8BC" />
      ))}
      {/* the strap that holds it onto the old unit */}
      <rect x={0} y={62} width={148} height={17} fill="#4E5A68" />
      <rect x={62} y={56} width={26} height={30} rx={5} fill="#8E9AA6" />
    </svg>
  </div>
);

/** training rails — the babysitting, made physical */
export const Rails: React.FC<{ x: number; y: number; w?: number; h?: number; c?: string; z?: number }> =
  ({ x, y, w = 300, h = 158, c = "#8A6A48", z = 12 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z, filter: SHADOW }}>
    <div style={{ position: "absolute", left: 0, top: 0, width: w, height: 18, borderRadius: 8, background: c }} />
    <div style={{ position: "absolute", left: 0, top: 0, width: 22, height: h, borderRadius: 8, background: c }} />
    <div style={{ position: "absolute", left: w - 22, top: 0, width: 22, height: h, borderRadius: 8, background: c }} />
    {[0.32, 0.66].map((t, i) => (
      <div key={i} style={{ position: "absolute", left: 22, top: h * t, width: w - 44, height: 12,
        borderRadius: 6, background: c, opacity: 0.9 }} />
    ))}
  </div>
);

/** A TASK, with a difficulty dial. `hard` pushes the needle past COMFORTABLE. */
export const TaskCard: React.FC<{
  f: number; x: number; y: number; s?: number; title?: string; hard?: number; at?: number; z?: number;
}> = ({ f, x, y, s = 1, title = "TASK", hard = 0, at = 6, z = 18 }) => {
  const v = E(f, at, at + 24, 0, hard, OUT);
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 300 * s, height: 196 * s, zIndex: z, filter: SHADOW }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 9, background: CARD }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 46 * s, borderRadius: "9px 9px 0 0",
        background: AMBER, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 25 * s,
        letterSpacing: "0.14em", color: "#3A2410", textAlign: "center", lineHeight: `${46 * s}px` }}>{title}</div>
      {/* the difficulty scale: easy -> comfortable -> too hard */}
      <div style={{ position: "absolute", left: 24 * s, top: 78 * s, width: 252 * s, height: 20 * s,
        borderRadius: 10 * s, background: "#DED8CC" }} />
      <div style={{ position: "absolute", left: 24 * s, top: 78 * s, width: 252 * s * Math.min(1, v),
        height: 20 * s, borderRadius: 10 * s, background: v > 0.72 ? RED : GO }} />
      <div style={{ position: "absolute", left: 24 * s + 252 * s * 0.72, top: 66 * s, width: 5 * s,
        height: 44 * s, background: "#4E5A68" }} />
      <div style={{ position: "absolute", left: 24 * s, top: 122 * s, width: 252 * s, textAlign: "center",
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 21 * s, letterSpacing: "0.1em",
        color: v > 0.72 ? RED : "#6B625A" }}>{v > 0.72 ? "TOO HARD" : "COMFORTABLE"}</div>
    </div>
  );
};

/** a checklist the model runs on ITSELF — items tick one at a time */
export const Checklist: React.FC<{
  f: number; x: number; y: number; s?: number; n?: number; at?: number; every?: number; z?: number;
}> = ({ f, x, y, s = 1, n = 4, at = 10, every = 9, z = 18 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 300 * s, height: (52 + n * 46) * s,
    zIndex: z, filter: SHADOW }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: 9, background: CARD }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 44 * s, borderRadius: "9px 9px 0 0",
      background: GO, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 23 * s,
      letterSpacing: "0.12em", color: "#04301F", textAlign: "center", lineHeight: `${44 * s}px` }}>SELF CHECK</div>
    {Array.from({ length: n }, (_, i) => {
      const on = f >= at + i * every;
      const t = on ? E(f, at + i * every, at + 10 + i * every, 0, 1, BACK) : 0;
      return (
        <React.Fragment key={i}>
          <div style={{ position: "absolute", left: 22 * s, top: (60 + i * 46) * s, width: 30 * s, height: 30 * s,
            borderRadius: 6 * s, background: on ? GO : "#DED8CC" }} />
          {on && (
            <svg viewBox="0 0 30 30" width={30 * s} height={30 * s}
              style={{ position: "absolute", left: 22 * s, top: (60 + i * 46) * s }}>
              <path d="M7 16 L13 22 L24 8" stroke="#FFF6F2" strokeWidth={5} fill="none"
                strokeLinecap="round" strokeLinejoin="round"
                pathLength={100} strokeDasharray={100} strokeDashoffset={100 * (1 - t)} />
            </svg>
          )}
          <div style={{ position: "absolute", left: 64 * s, top: (70 + i * 46) * s,
            width: (190 - (i % 3) * 40) * s, height: 11 * s, borderRadius: 5, background: "#CFC8BC" }} />
        </React.Fragment>
      );
    })}
  </div>
);

/** THE RUN, as numbered steps. Step `breakAt` is where it actually breaks. */
export const StepChain: React.FC<{
  f: number; x: number; y: number; n?: number; breakAt: number; at?: number; every?: number;
  s?: number; z?: number;
}> = ({ f, x, y, n = 5, breakAt, at = 6, every = 7, s = 1, z = 16 }) => {
  const w = 104 * s, gap = 24 * s;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: n * (w + gap), height: 130 * s, zIndex: z }}>
      {Array.from({ length: n }, (_, i) => {
        const on = f >= at + i * every;
        const isBreak = i === breakAt;
        const bt = isBreak && f >= at + i * every ? E(f, at + i * every, at + i * every + 12, 0, 1, OUT) : 0;
        if (!on) return null;
        const pop = E(f, at + i * every, at + i * every + 8, 0, 1, BACK);
        return (
          <React.Fragment key={i}>
            {i > 0 && (
              <div style={{ position: "absolute", left: i * (w + gap) - gap - 2, top: 46 * s,
                width: gap + 4, height: 10 * s, background: i <= breakAt ? "#8E9AA6" : "#DED8CC",
                opacity: i === breakAt ? 1 - bt : 1 }} />
            )}
            <div style={{ position: "absolute", left: i * (w + gap), top: bt * 44 * s,
              width: w, height: 102 * s, borderRadius: 8, filter: SHADOW,
              transform: `scale(${pop}) rotate(${bt * 26}deg)`, transformOrigin: "50% 100%",
              background: isBreak ? RED : CARD }}>
              <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 30 * s,
                borderRadius: "8px 8px 0 0", background: isBreak ? RED_D : GO }} />
              <div style={{ position: "absolute", left: 0, right: 0, top: 34 * s, textAlign: "center",
                fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 42 * s,
                color: isBreak ? "#FFF6F2" : "#3A4048" }}>{i + 1}</div>
            </div>
            {/* the crack, drawn where it lets go */}
            {isBreak && bt > 0.15 && (
              <svg viewBox="0 0 60 60" width={60 * s} height={60 * s}
                style={{ position: "absolute", left: i * (w + gap) + w * 0.3, top: 10 * s, overflow: "visible" }}>
                <path d="M30 0 L18 22 L34 26 L20 60" stroke={RED_D} strokeWidth={7} fill="none"
                  strokeLinecap="round" pathLength={100} strokeDasharray={100}
                  strokeDashoffset={100 * (1 - bt)} />
              </svg>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

/** AN ENTIRE APP, rewritten in a different language — blocks convert left to right */
export const AppBuild: React.FC<{
  f: number; x: number; y: number; cols?: number; rows?: number; cw?: number;
  at?: number; dur?: number; from?: string; to?: string; z?: number;
}> = ({ f, x, y, cols = 6, rows = 4, cw = 54, at = 20, dur = 120, from = "#7E74A0", to = GO, z = 14 }) => {
  const p = E(f, at, at + dur, 0, 1, IO);
  return (
    <div style={{ position: "absolute", left: x, top: y, width: cols * cw, height: rows * cw, zIndex: z,
      filter: SHADOW }}>
      {Array.from({ length: cols * rows }, (_, i) => {
        const col = i % cols, r = Math.floor(i / cols);
        const done = (col + 0.5) / cols <= p;
        const t = done ? Math.min(1, (p - col / cols) * cols * 1.6) : 0;
        return (
          <div key={i} style={{ position: "absolute", left: col * cw, top: r * cw,
            width: cw - 6, height: cw - 6, borderRadius: 5,
            background: done ? to : from,
            transform: `rotateY(${(1 - t) * 70}deg)`,
            opacity: 0.55 + 0.45 * (done ? 1 : 0.6) }} />
        );
      })}
    </div>
  );
};

/** the single instruction that started it — one card, fed in */
export const OneInstruction: React.FC<{ f: number; x: number; y: number; s?: number; at?: number; z?: number }> =
  ({ f, x, y, s = 1, at = 4, z = 20 }) => {
  const t = E(f, at, at + 20, 0, 1, OUT);
  return (
    <div style={{ position: "absolute", left: x, top: y - (1 - t) * 90, width: 262 * s, height: 96 * s,
      zIndex: z, opacity: Math.min(1, t * 2), filter: SHADOW }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 8, background: CARD }} />
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 14 * s,
        borderRadius: "8px 0 0 8px", background: GO }} />
      <div style={{ position: "absolute", left: 30 * s, top: 20 * s, width: 200 * s, height: 12 * s,
        borderRadius: 6, background: "#CFC8BC" }} />
      <div style={{ position: "absolute", left: 30 * s, top: 44 * s, width: 150 * s, height: 12 * s,
        borderRadius: 6, background: "#CFC8BC" }} />
      <div style={{ position: "absolute", left: 30 * s, top: 68 * s, width: 176 * s, height: 12 * s,
        borderRadius: 6, background: "#CFC8BC" }} />
    </div>
  );
};

/** THE STAGE — the real Y Combinator recording, framed as a mission monitor.
 *
 *  Reel 81 put this footage on a dojo screen; the ask here was for "a spot
 *  showing Boris Cherny on the stage like we had in the DELETE video". The
 *  nameplate matters as much as the face: the claim only lands if the viewer
 *  knows WHO is making it, so the plate states the attribution outright. */
export const StageScreen: React.FC<{
  f: number; x: number; y: number; w: number; h: number; from?: number;
  plate?: boolean; z?: number;
}> = ({ f, x, y, w, h, from = 40, plate = true, z = 16 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z }}>
    {/* the bezel + its mount */}
    <div style={{ position: "absolute", left: -14, top: -16, width: w + 28, height: h + 32,
      borderRadius: 14, background: "#2C3846", boxShadow: SH_D }} />
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", borderRadius: 6, background: "#1A222C" }}>
      <OffthreadVideo src={staticFile("boris_clip.mp4")} muted startFrom={from}
        style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      {/* a scan bar, so the screen reads as a live feed rather than a photo */}
      <div style={{ position: "absolute", left: 0, right: 0, top: `${((f * 1.8) % 100)}%`, height: 3,
        background: "rgba(255,255,255,0.16)" }} />
    </div>
    {/* the record pip */}
    <div style={{ position: "absolute", left: 14, top: 12, width: 16, height: 16, borderRadius: "50%",
      background: f % 30 < 18 ? RED : "#6E4038" }} />
    <div style={{ position: "absolute", left: 38, top: 13, fontFamily: inter.fontFamily, fontWeight: 900,
      fontSize: 15, letterSpacing: "0.2em", color: "rgba(255,255,255,0.82)" }}>Y COMBINATOR</div>
    {plate && (
      <div style={{ position: "absolute", left: 0, top: h + 20, width: w, borderRadius: 8,
        background: CARD, boxShadow: SH_D, padding: "10px 18px 12px" }}>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 34, lineHeight: 1.05,
          letterSpacing: "-0.01em", color: "#26211C" }}>BORIS CHERNY</div>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 20, letterSpacing: "0.12em",
          color: RED }}>HE BUILT CLAUDE CODE</div>
      </div>
    )}
  </div>
);
