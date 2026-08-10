import React from "react";
import { AbsoluteFill, useCurrentFrame, Img, staticFile } from "remotion";
import { inter } from "./fonts";
import { Bg, Panel, ProgressBar, HookHeader, Caption, AssemblyCtx, hexA, Mascot } from "./SlopKit";
import { Dev, Meter, Chip, PW, PH, INKD, RED, RED_D, AMBER, GO, GO_L, GOLD,
         E, osc, rnd, OUT, IO, BACK, SH, SH_D } from "./KeyWorld";
import { Gem, Halo, Pedestal, Sparks, Room, Orbit, G1, G2, G3, KEY_BLUE } from "./KeyRelic";
import { CursorUI, ClaudeCodeUI, CodexUI } from "./KeyEditors";

/* =========================================================================
   REEL 83 "KEY" · SCENES S1..S5.

   The world, as agreed: a near-black room, ONE blue relic, cel-glow halo that
   breathes rather than spins, Claude mascots as the only figures, and slow cuts
   — a near-empty frame needs longer on screen than a busy one, because there is
   nothing to scan.

   Scene starts come from MEASURED word onsets in words_key.json, not guesses:
     4.69  "It lists 134 free APIs from over 40 providers..."
     9.29  "all with a permanent free tier."
    10.71  "One click setup, right inside Cursor, Claude Code or Codex."
    13.38  "Everyone else hits their paid limits while you run the same free."
    16.35  "Comment KEY and I'll send you the repo."
   ========================================================================= */

const CARD_D = "#12202E";

/** REAL brand marks, pulled from the Simple Icons CDN into public/logos/
 *  (memory `reel-brand-logo-sourcing`). They sit on LIGHT tiles because the
 *  marks keep their brand fill and several are black — on a dark tile they
 *  would vanish.
 *
 *  ⚠️ Simple Icons no longer serves an OpenAI mark (404 on every slug tried),
 *  so Codex gets a text plate. I am not going to fabricate a company's logo. */
const LogoTile: React.FC<{ x: number; y: number; d?: number; file?: string; text?: string; z?: number }> =
  ({ x, y, d = 118, file, text, z = 26 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: d, height: d, borderRadius: d * 0.22,
    background: "#F6FAFD", zIndex: z, filter: "drop-shadow(0 7px 8px rgba(0,0,0,0.55))" }}>
    {file
      ? <Img src={staticFile(`logos/${file}`)}
             style={{ position: "absolute", left: d * 0.19, top: d * 0.19, width: d * 0.62,
                      height: d * 0.62, objectFit: "contain" }} />
      : <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center",
          justifyContent: "center", fontFamily: inter.fontFamily, fontWeight: 900,
          fontSize: d * 0.2, letterSpacing: "-0.01em", color: "#1B2430" }}>{text}</div>}
  </div>
);

/** an editor window — a different SHAPE of animation from the gems, which is the
 *  point: three plinths after two plinth scenes was the same beat a third time */
const Editor: React.FC<{
  f: number; x: number; y: number; w?: number; h?: number; title: string; logo?: string;
  at: number; z?: number;
}> = ({ f, x, y, w = 300, h = 356, title, logo, at, z = 20 }) => {
  const t = E(f, at, at + 16, 0, 1, BACK);
  const rows = Math.max(0, Math.floor(E(f, at + 6, at + 44, 0, 6, OUT)));
  const done = f > at + 46;
  const caret = !done && rows > 0 && (f % 16) < 9;
  return (
    <div style={{ position: "absolute", left: x, top: y + (1 - t) * 460, width: w, height: h, zIndex: z,
      opacity: Math.min(1, t * 1.6), filter: "drop-shadow(0 10px 10px rgba(0,0,0,0.6))" }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 12, background: "#101A25" }} />
      {/* title bar */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 52,
        borderRadius: "12px 12px 0 0", background: "#1B2A3A" }} />
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ position: "absolute", left: 16 + i * 20, top: 20, width: 12, height: 12,
          borderRadius: "50%", background: ["#D66", "#DC9", "#6C9"][i] }} />
      ))}
      {logo
        ? <Img src={staticFile(`logos/${logo}`)}
               style={{ position: "absolute", right: 14, top: 12, width: 28, height: 28, objectFit: "contain",
                        filter: "brightness(0) invert(1)" }} />
        : null}
      <div style={{ position: "absolute", left: 0, right: 0, top: 62, textAlign: "center",
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 24, letterSpacing: "0.08em",
        color: G2 }}>{title}</div>
      {/* code lines typing in */}
      {Array.from({ length: 6 }, (_, i) => i < rows && (
        <div key={i} style={{ position: "absolute", left: 22, top: 108 + i * 30,
          width: (w - 60) * (0.5 + ((i * 37) % 50) / 100), height: 13, borderRadius: 6,
          background: i === rows - 1 ? G3 : "#28394C" }} />
      ))}
      {caret && (
        <div style={{ position: "absolute", left: 26 + (w - 60) * (0.5 + ((rows - 1) * 37 % 50) / 100),
          top: 104 + (rows - 1) * 30, width: 12, height: 21, background: G1, zIndex: 3 }} />
      )}
      {/* the install lands */}
      <div style={{ position: "absolute", left: 22, right: 22, top: h - 74, height: 52, borderRadius: 9,
        background: done ? GO : "#1B2A3A", zIndex: 2,
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 25, letterSpacing: "0.08em",
        color: done ? "#EAFBF3" : "#48586C", textAlign: "center", lineHeight: "52px" }}>
        {done ? "134 FREE" : "installing"}
      </div>
    </div>
  );
};

/** the label plate used on a black field — dark plate, cyan type */
const Plate: React.FC<{ x: number; y: number; text: string; s?: number; on?: boolean; z?: number }> =
  ({ x, y, text, s = 1, on = true, z = 28 }) => (
  <div style={{ position: "absolute", left: x, top: y, padding: `${9 * s}px ${18 * s}px`,
    borderRadius: 7 * s, background: on ? CARD_D : "#0C121A", zIndex: z,
    fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 25 * s, letterSpacing: "0.03em",
    color: on ? G2 : "#2A3644", whiteSpace: "nowrap",
    filter: "drop-shadow(0 5px 5px rgba(0,0,0,0.5))" }}>{text}</div>
);

/* ===== S1 · 134 FREE APIS, 40 PROVIDERS (4.69 -> 9.29, 4.60s) ============ */
/* Long enough to need two internal beats: the field fills, then the names land. */
/**
 * Per-variant camera, applied INSIDE the Panel.
 *
 * ⛔ NOT to the whole composition. That scales the cream background and moves
 * the Panel off its fixed chassis position, and it measurably wrecked the motion
 * audit (S4split scored 8.12 at scale 1.0 and 3.72 at 1.038) purely by changing
 * how much static background sat in frame. Transforming the panel CONTENTS keeps
 * bg / rail / panel rect identical across variants while the picture differs.
 */
export const KeyCamCtx = React.createContext<{ z: number; dx: number; dy: number }>(
  { z: 1, dx: 0, dy: 0 });

export const S1Many: React.FC = () => {
  const f = useCurrentFrame();
  const cam = React.useContext(KeyCamCtx);
  const CUT = 66;
  const COLS = 9, ROWS = 6, N = COLS * ROWS;
  const grown = Math.round(N * E(f, 4, 60, 0, 1, OUT));
  const count = Math.round(E(f, 4, 60, 1, 134, OUT));
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <HookHeader f={f} big="134 FREE AI APIS" hot="ONE REPO NOBODY KNOWS" />
      <Panel glow={hexA(KEY_BLUE, 0.34)}>

        {/* a · the one becomes many */}
        {f < CUT && (
          <div style={{ position: "absolute", inset: 0, overflow: "hidden",
          transform: `scale(${cam.z}) translate(${cam.dx}px, ${cam.dy}px)`,
          transformOrigin: "50% 54%" }}>
            <Room f={f} horizon={720} />
            <Halo f={f} cx={506} cy={368} r={430} z={5} />
            {Array.from({ length: N }, (_, i) => {
              if (i >= grown) return null;
              const c = i % COLS, r = Math.floor(i / COLS);
              const t = E(f, 4 + i * 0.8, 16 + i * 0.8, 0, 1, BACK);
              return <Gem key={i} f={f + i * 5} x={26 + c * 110} y={128 + r * 104} s={0.26 * t} z={14} />;
            })}
            <div style={{ position: "absolute", left: 0, right: 0, top: 306, textAlign: "center",
              fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 168, lineHeight: 1,
              letterSpacing: "-0.04em", color: G1, zIndex: 26,
              filter: "drop-shadow(0 8px 10px rgba(0,0,0,0.65))" }}>{count}</div>
            {/* the mascot recurs in EVERY scene — this one had none */}
            <Dev f={f} x={16} y={556} size={244} gaze={2} shock={0.35} nodAmp={2.4} nodSpeed={12} z={30} />
          </div>
        )}

        {/* b · whose they are */}
        {f >= CUT && (
          <div style={{ position: "absolute", inset: 0, overflow: "hidden",
          transform: `scale(${cam.z}) translate(${cam.dx}px, ${cam.dy}px)`,
          transformOrigin: "50% 54%" }}>
            <Room f={f} horizon={700} />
            <Halo f={f} cx={506} cy={356} r={360} z={5} />
            <Gem f={f} x={366} y={188} s={1.04} z={20} />
            <Sparks f={f} cx={506} cy={356} r={280} n={5} z={22} />
            {/* the REAL marks, not typeset names.
                Each one BOUNCES on the frame its brand is spoken. S1 starts at
                4.69s, and the measured onsets are Gemini 8.10, Grok 8.38,
                NVIDIA 8.72 — so scene-local frames 102, 111, 121. Keyed off the
                caption data, not eyeballed against the waveform. */}
            {[["googlegemini.svg", "GEMINI", 102], ["x.svg", "GROK", 111],
              ["nvidia.svg", "NVIDIA", 121]].map(([file, name, said], i) => {
              const t = E(f, CUT + 2 + i * 7, CUT + 20 + i * 7, 0, 1, BACK);
              const k = f - (said as number);
              const bp = k >= 0 && k < 15 ? Math.sin((k / 15) * Math.PI) : 0;
              const lift = bp * 40;
              return (
                <React.Fragment key={name as string}>
                  <div style={{ transform: `scale(${1 + bp * 0.16})`, transformOrigin: "50% 100%" }}>
                    <LogoTile x={272 + i * 240} y={568 - t * 26 - lift} d={122} file={file as string} z={28} />
                  </div>
                  <Plate x={266 + i * 240} y={708 - lift * 0.35} text={name as string} s={0.9}
                         on={f > CUT + 4 + i * 7} z={28} />
                </React.Fragment>
              );
            })}
            <Dev f={f} x={20} y={512} size={236} gaze={2} cheer={0.55} nodAmp={2.8} nodSpeed={11} z={30} />
            <Chip y={104} text="40+ PROVIDERS" c={GO} />
          </div>
        )}
      </Panel>
    </AbsoluteFill>
  );
};

/* ===== S2 · A PERMANENT FREE TIER (9.29 -> 10.71, 1.42s) ================= */
/* One shot, one idea: the lock comes OFF and never comes back. */
export const S2Forever: React.FC = () => {
  const f = useCurrentFrame();
  const cam = React.useContext(KeyCamCtx);
  const off = E(f, 4, 24, 0, 1, OUT);
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <HookHeader f={f} big="PERMANENT FREE TIER" hot="NOT A TRIAL" />
      <Panel glow={hexA(KEY_BLUE, 0.34)}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden",
          transform: `scale(${cam.z}) translate(${cam.dx}px, ${cam.dy}px)`,
          transformOrigin: "50% 54%" }}>
          <Room f={f} horizon={640} />
          <Halo f={f} cx={506} cy={344} r={330} z={5} />
          <Pedestal x={356} y={534} s={1.0} z={14} />
          <Gem f={f} x={366} y={200} s={1.1} z={20} />
          {/* the padlock falls away and the shackle stays open */}
          <div style={{ position: "absolute", left: 646, top: 268 + off * 420, zIndex: 26,
            opacity: 1 - off * 0.85, transform: `rotate(${off * 46}deg)` }}>
            <svg viewBox="0 0 120 150" width={120} height={150} style={{ overflow: "visible" }}>
              <path d="M32 62 V42 a28 28 0 0 1 56 0 V62" stroke="#5C6E80" strokeWidth={14} fill="none" />
              <rect x={16} y={62} width={88} height={72} rx={10} fill="#7C8B9C" />
              <circle cx={60} cy={96} r={12} fill="#3A4655" />
            </svg>
          </div>
          <Sparks f={f} cx={506} cy={344} r={260} n={5} z={22} />
          <Dev f={f} x={22} y={498} size={252} gaze={2} shock={off < 0.5 ? 0.4 : 0}
               cheer={off > 0.5 ? 0.85 : 0} nodAmp={off > 0.5 ? 3.2 : 2} nodSpeed={off > 0.5 ? 9 : 13} z={30} />
          <Chip y={708} text="NO EXPIRY" c={GO} />
        </div>
      </Panel>
    </AbsoluteFill>
  );
};

/* ===== S3 · ONE CLICK, THREE EDITORS (10.71 -> 13.38, 2.67s) =============
   ⛔ Twice wrong before this. First it was a third pedestal-and-gem shot in a
   row ("its just the same stuff with the gems"). Then it was three IDENTICAL
   dark boxes with a name on each — a label, not a UI.

   Now each surface is drawn as the product actually looks: Cursor as an IDE
   (activity rail, file tree, tabs, syntax colour, the Cmd-K bar), Claude Code as
   a TERMINAL (prompt, tool-use bullets, input box), Codex as a cloud task view
   (browser chrome, task rows, monochrome). Three shapes, three palettes.

   And Claude is IN it — the house rule is that the mascot recurs throughout, and
   S1, S2 and S3 had no Claude in them at all. */
export const S3Install: React.FC = () => {
  const f = useCurrentFrame();
  const cam = React.useContext(KeyCamCtx);
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <HookHeader f={f} big="ONE CLICK SETUP" hot="CURSOR · CLAUDE CODE · CODEX" />
      <Panel glow={hexA(KEY_BLUE, 0.34)}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden",
          transform: `scale(${cam.z}) translate(${cam.dx}px, ${cam.dy}px)`,
          transformOrigin: "50% 54%" }}>
          <Room f={f} horizon={730} />
          <Halo f={f} cx={506} cy={316} r={300} z={4} />

          {/* a staggered fan so all three read at once without stacking */}
          {/* ⛔ z-order matters more than it looks. With Cursor on top, the fan hid
              the LEFT edge of the other two — which is exactly where each product
              is identifiable (the terminal prompt, the browser URL pill). Stacking
              right-over-left instead means every window shows its own left side. */}
          {[
            { C: CursorUI,     x: 26,  y: 128, at: 2,  z: 20 },
            { C: ClaudeCodeUI, x: 300, y: 176, at: 16, z: 22 },
            { C: CodexUI,      x: 574, y: 224, at: 30, z: 24 },
          ].map(({ C, x, y, at, z }, i) => {
            const t = E(f, at, at + 18, 0, 1, BACK);
            return (
              <div key={i} style={{ position: "absolute",
                left: x + E(f, 52, 80, 0, [-24, 0, 24][i] * 4, OUT),
                top: y + (1 - t) * 420 - E(f, 52, 80, 0, [0, 26, 52][i], OUT),
                width: 400, height: 346, zIndex: z, opacity: Math.min(1, t * 1.7),
                filter: "drop-shadow(0 12px 12px rgba(0,0,0,0.62))" }}>
                <C f={f} w={400} h={346} at={at} />
                {/* the official mark, badged on the window it belongs to */}
                <div style={{ position: "absolute", left: 10, top: 10, height: 36, borderRadius: 8,
                  background: "#F7F3EA", display: "flex", alignItems: "center", gap: 8,
                  padding: "0 12px", boxShadow: "0 4px 8px rgba(6,10,16,0.5)" }}>
                  <Img src={staticFile(`logos/${["cursor.svg","claude.svg","openai.png"][i]}`)}
                       style={{ width: 20, height: 20, objectFit: "contain", display: "block" }} />
                  <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 15,
                    letterSpacing: "0.04em", color: "#241F1A", whiteSpace: "nowrap" }}>
                    {["CURSOR","CLAUDE CODE","CODEX"][i]}</div>
                </div>
              </div>
            );
          })}

          {/* ⛔ the fan landed by frame 48 and then held for 21 frames — measured,
                 not guessed. The three now SETTLE into a row (~120px each) and take
                 an INSTALLED tick in sequence, so the back half of the scene moves. */}
          {[0, 1, 2].map((i) => {
            const t = E(f, 52 + i * 6, 74 + i * 6, 0, 1, OUT);
            if (t <= 0) return null;
            return (
              <div key={`ok${i}`} style={{ position: "absolute", left: 300 + i * 232,
                top: 596 - t * 34, width: 196, height: 46, borderRadius: 9, zIndex: 34,
                background: GO, opacity: Math.min(1, t * 2),
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 20,
                letterSpacing: "0.1em", color: "#EAFBF3" }}>✓ INSTALLED</div>
            );
          })}
          {/* the mascot, in front, watching it land */}
          <Dev f={f} x={26 + E(f, 52, 78, 0, 150, OUT)} y={520} size={252} gaze={-1}
               cheer={f > 50 ? 0.9 : 0.3}
               nodAmp={f > 50 ? 4.6 : 2} nodSpeed={f > 50 ? 8 : 13} z={30} />
          <Chip y={716} text="DROP IT STRAIGHT IN" c={AMBER} size={35} />
        </div>
      </Panel>
    </AbsoluteFill>
  );
};

/* ===== S4 · THEY PAY, YOU DO NOT (13.38 -> 16.35, 2.97s) ================= */
/* The only two-figure scene in the reel, and both figures are Claude. */
export const S4Split: React.FC = () => {
  const f = useCurrentFrame();
  const cam = React.useContext(KeyCamCtx);
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <HookHeader f={f} big="THEY HIT THE LIMIT" hot="YOU DO NOT" />
      <Panel glow={hexA(KEY_BLUE, 0.32)}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden",
          transform: `scale(${cam.z}) translate(${cam.dx}px, ${cam.dy}px)`,
          transformOrigin: "50% 54%" }}>
          <Room f={f} horizon={636} />
          {/* the divider, so the comparison reads as one image not two scenes */}
          <div style={{ position: "absolute", left: 502, top: 92, width: 5, height: 560,
            background: "#1E2A38", zIndex: 8 }} />

          {/* ⛔ MEASURED: this scene ran 72 dead frames of 89 on the first cut and
              42 on the second. A 5px/frame bar and a 10px bob are SUB-PIXEL once
              sampled — invisible to the metric and to the eye. What follows is
              deliberately large: a stack of charges landing one at a time, and a
              figure that physically shakes. */}
          {Array.from({ length: 12 }, (_, i) => {
            const at = 4 + i * 5;
            if (f < at) return null;
            const t = E(f, at, at + 7, 0, 1, BACK);
            return (
              <div key={`ch${i}`} style={{ position: "absolute", left: 96 + (i % 4) * 76,
                top: 620 - Math.floor(i / 4) * 62, width: 64, height: 50, borderRadius: 7,
                background: i % 2 ? "#B85A3E" : RED_D, zIndex: 20,
                transform: `scale(${t}) translateY(${(1 - t) * -70}px)` }} />
            );
          })}
          <div style={{ position: "absolute", left: 118, top: 372, width: 244, height: 244, zIndex: 16,
            transform: `translateX(${f > 40 ? Math.sin(f * 1.9) * (f > 58 ? 11 : 5) : 0}px)`,
            filter: "drop-shadow(0 8px 8px rgba(0,0,0,0.5))" }}>
            <Mascot lf={f} size={244} tint="#5E6E80" gaze={1} shock={f > 58 ? 0.85 : 0.4}
                    nodAmp={f > 58 ? 4.2 : 1.8} nodSpeed={f > 58 ? 5 : 15} />
          </div>
          <Meter f={f} x={112} y={168} s={0.66} rate={3.4} label="THEIR BILL" z={22} />
          {/* a limit bar that visibly FILLS, then trips — the real motion in this half */}
          <div style={{ position: "absolute", left: 96, top: 306, width: 300, height: 34, borderRadius: 8,
            background: "#1A2430", zIndex: 22 }} />
          <div style={{ position: "absolute", left: 100, top: 310, width: 292 * E(f, 4, 62, 0, 1, IO),
            height: 26, borderRadius: 6, background: f > 58 ? RED : "#B85A3E", zIndex: 23 }} />
          {f > 58 && (
            <div style={{ position: "absolute", left: 108, top: 352, padding: "7px 15px", borderRadius: 6,
              background: RED, zIndex: 24, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 25,
              letterSpacing: "0.1em", color: "#FFF1EE",
              transform: `scale(${0.7 + E(f, 58, 68, 0, 0.3, BACK)})` }}>LIMIT HIT</div>
          )}

          {/* right: our Claude, the relic, zero */}
          <Halo f={f} cx={760} cy={352 - E(f, 46, 78, 0, 110, OUT)} r={170 + E(f, 46, 78, 0, 110, OUT)} z={5} />
          <Gem f={f} x={690} y={286 - E(f, 46, 78, 0, 128, OUT)} s={0.52 + E(f, 46, 78, 0, 0.32, OUT)} z={20} />
          <div style={{ position: "absolute", left: 636, top: 402, width: 252, height: 252, zIndex: 16,
            filter: "drop-shadow(0 8px 8px rgba(0,0,0,0.5))" }}>
            <Mascot lf={f} size={252} gaze={-1} cheer={0.8} nodAmp={3} nodSpeed={10} />
          </div>
          <Meter f={f} x={636} y={168} s={0.66} stop label="YOUR BILL" z={22} />
          <Chip y={702} text="SAME MODELS" c={GO} />
        </div>
      </Panel>
    </AbsoluteFill>
  );
};

/* ===== S5 · CTA (16.35 -> end) =========================================== */
export const S5Cta: React.FC = () => {
  const f = useCurrentFrame();
  const cam = React.useContext(KeyCamCtx);
  const land = E(f, 1, 20, 0, 1, BACK);
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <HookHeader f={f} big="COMMENT KEY" hot="AND I'LL SEND THE REPO" />
      <Panel glow={hexA(KEY_BLUE, 0.36)}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden",
          transform: `scale(${cam.z}) translate(${cam.dx}px, ${cam.dy}px)`,
          transformOrigin: "50% 54%" }}>
          <Room f={f} horizon={640} />
          <Halo f={f} cx={330} cy={352} r={300} z={5} />
          <Gem f={f} x={214} y={216} s={0.94} z={20} />
          <Sparks f={f} cx={330} cy={352} r={250} n={5} z={22} />
          {/* the CTA seal gets a column nothing else enters — the ship gate does
              not catch a buried CTA, and reel 82 shipped one 9/9 with a shadow
              across it before a contact sheet caught it */}
          <div style={{ position: "absolute", left: 596, top: 246, width: 344, height: 300, zIndex: 30,
            transform: `translateY(${(1 - land) * -520}px) rotate(${-5 + osc(f, 40, 1.4)}deg)`,
            filter: "drop-shadow(0 12px 14px rgba(0,0,0,0.6))" }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: 18, background: "#F2FAFF",
              border: `18px solid ${RED}` }} />
            <div style={{ position: "absolute", left: 0, right: 0, top: 62, textAlign: "center",
              fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 30, letterSpacing: "0.2em",
              color: RED }}>COMMENT</div>
            <div style={{ position: "absolute", left: 0, right: 0, top: 112, textAlign: "center",
              fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 86, letterSpacing: "-0.02em",
              color: RED }}>KEY</div>
          </div>
          <Dev f={f} x={286} y={402} size={252} gaze={-1} cheer={0.95} nodAmp={3.4} nodSpeed={9} z={26} />
        </div>
      </Panel>
    </AbsoluteFill>
  );
};
