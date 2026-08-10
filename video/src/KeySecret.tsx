import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { inter } from "./fonts";
import { Bg, Panel, ProgressBar, HookHeader, Caption, AssemblyCtx, hexA } from "./SlopKit";
import { Dev, Meter, Chip, PW, PH, CARD, INKD,
         RED, RED_D, AMBER, GO, GO_L, GOLD, E, osc, rnd, OUT, IO, BACK, SH, SH_D } from "./KeyWorld";

const SoloCap: React.FC<{ words: string[]; hot?: number }> = (p) =>
  React.useContext(AssemblyCtx) ? null : <Caption {...p} />;

/* =========================================================================
   REEL 83 "KEY" · THE SECRET MENU.

   ⛔ Rounds 1-3 all failed the same way. They were metaphors for CHEAP (a toll
   booth, a vault, a meter yard, a factory line). But the line that carries this
   reel is "one GitHub repo almost NOBODY KNOWS ABOUT" — the engine is not price,
   it is SECRECY. A viewer does not stop for a discount, they stop because there
   is something they have not been told.

   So this world is built around a REVEAL, and every beat withholds then gives:

     the lit price board everyone orders from   -> what everyone knows
     the hero leans in and says one word        -> the withhold
     a menu comes out from under the counter    -> the reveal
     it unfurls: 134 items, every price 0       -> the payoff

   The secret menu is real pop culture (In-N-Out, Starbucks) so it needs no
   explaining, and it is pure geometry: boards, counters, trays, receipts.

   House palette: solid matte paints + dark drop shadows. No glow, no washes.
   ========================================================================= */

/* a bright diner, so frame 0 clears the 140 luma bar by construction */
const TILE = "#EFE7D6", TILE_D = "#DCD2BC", WALLC = "#2F6E6C", WALL_L = "#3E8A86";
const CHROME = "#C8CFD6", CHROME_D = "#98A2AC", BOARD = "#22303A", BOARD_L = "#334654";
const MINT = "#7FC9B6", CHERRY = "#D6473A", CREAMY = "#FBF6E9";

/* ------------------------------------------------------------------ parts -- */

/** the lit price board: what everyone in the queue orders from */
const PriceBoard: React.FC<{ f: number; x: number; y: number; w?: number; rows?: number; climb?: boolean; z?: number }> =
  ({ f, x, y, w = 700, rows = 5, climb = true, z = 12 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: 60 + rows * 62, zIndex: z,
    filter: "drop-shadow(0 9px 9px rgba(26,30,40,0.36))" }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: 10, background: BOARD }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 52, borderRadius: "10px 10px 0 0",
      background: CHERRY, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 27,
      letterSpacing: "0.16em", color: CREAMY, textAlign: "center", lineHeight: "52px" }}>MENU</div>
    {Array.from({ length: rows }, (_, i) => {
      const price = climb ? (2 + i * 3 + Math.floor(f * 0.5) % 40) : 0;
      return (
        <React.Fragment key={i}>
          <div style={{ position: "absolute", left: 26, top: 74 + i * 62, width: w * 0.5, height: 22,
            borderRadius: 5, background: BOARD_L }} />
          <div style={{ position: "absolute", right: 26, top: 66 + i * 62, width: 128, height: 38,
            borderRadius: 6, background: CHERRY, fontFamily: inter.fontFamily, fontWeight: 900,
            fontSize: 25, color: CREAMY, textAlign: "center", lineHeight: "38px" }}>
            ${price}.00
          </div>
        </React.Fragment>
      );
    })}
  </div>
);

/** the counter: tiled front, chrome lip, a bell */
const Counter: React.FC<{ f: number; y?: number; z?: number }> = ({ f, y = 500, z = 16 }) => (<>
  <div style={{ position: "absolute", left: 0, right: 0, top: y, bottom: 0, background: TILE, zIndex: z }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: y, height: 26, background: CHROME, zIndex: z + 1 }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: y + 26, height: 10, background: CHROME_D, zIndex: z + 1 }} />
  {Array.from({ length: 14 }, (_, i) => (
    <div key={i} style={{ position: "absolute", left: i * 78 + 6, top: y + 48, width: 66, height: 66,
      borderRadius: 5, background: i % 2 ? TILE_D : "#F6F0E0", zIndex: z + 1 }} />
  ))}
  {Array.from({ length: 14 }, (_, i) => (
    <div key={`b${i}`} style={{ position: "absolute", left: i * 78 + 6, top: y + 126, width: 66, height: 66,
      borderRadius: 5, background: i % 2 ? "#F6F0E0" : TILE_D, zIndex: z + 1 }} />
  ))}
</>);

/** the diner shell behind the counter */
const Diner: React.FC<{ f: number; pan?: number }> = ({ f, pan = 0 }) => (<>
  <div style={{ position: "absolute", inset: 0, background: WALLC }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 190, background: WALL_L }} />
  {/* wall tiling */}
  {Array.from({ length: 8 }, (_, i) => (
    <div key={i} style={{ position: "absolute", left: i * 136 - pan * 0.3, top: 200, width: 122, height: 122,
      borderRadius: 6, background: "#357C78", zIndex: 2 }} />
  ))}
  {/* pendant lamps — solid shapes, no glow */}
  {[150, 500, 850].map((lx, i) => (
    <div key={`l${i}`} style={{ position: "absolute", left: lx - pan * 0.2, top: 0, zIndex: 4 }}>
      <div style={{ position: "absolute", left: 34, top: 0, width: 6, height: 74, background: "#1F4E4C" }} />
      <div style={{ position: "absolute", left: 0, top: 74, width: 74, height: 40,
        borderRadius: "0 0 37px 37px", background: GOLD }} />
      <div style={{ position: "absolute", left: 16, top: 108, width: 42, height: 14, borderRadius: 7,
        background: "#FFF3D2" }} />
    </div>
  ))}
</>);

/** THE REVEAL: a folded card that unfurls into a long list. `open` drives it. */
const SecretMenu: React.FC<{
  f: number; x: number; y: number; w?: number; open: number; rows?: number; labels?: string[]; z?: number;
}> = ({ f, x, y, w = 560, open, rows = 8, labels = [], z = 24 }) => {
  const h = 96 + rows * 58 * open;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
      filter: "drop-shadow(0 12px 14px rgba(26,30,40,0.42))" }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 10, background: CREAMY, overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 74, background: "#1D2B33",
          fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 32, letterSpacing: "0.2em",
          color: GOLD, textAlign: "center", lineHeight: "74px" }}>SECRET MENU</div>
        {Array.from({ length: rows }, (_, i) => {
          const on = open > (i + 0.4) / rows;
          if (!on) return null;
          return (
            <React.Fragment key={i}>
              <div style={{ position: "absolute", left: 26, top: 96 + i * 58, width: w - 190, height: 24,
                borderRadius: 5, background: labels[i] ? "transparent" : "#D8D0BE",
                fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 25, color: INKD }}>
                {labels[i] || ""}
              </div>
              <div style={{ position: "absolute", right: 24, top: 90 + i * 58, width: 96, height: 36,
                borderRadius: 6, background: GO, fontFamily: inter.fontFamily, fontWeight: 900,
                fontSize: 24, color: "#EAFBF3", textAlign: "center", lineHeight: "36px" }}>$0</div>
            </React.Fragment>
          );
        })}
      </div>
      {/* the fold lines it came out of */}
      {[0.34, 0.68].map((t, i) => open < 0.98 && (
        <div key={i} style={{ position: "absolute", left: 0, right: 0, top: h * t, height: 3,
          background: "#D8D0BE" }} />
      ))}
    </div>
  );
};

/** an ordering kiosk */
const Kiosk: React.FC<{ x: number; y: number; label: string; s?: number; on?: boolean; z?: number }> =
  ({ x, y, label, s = 1, on = true, z = 18 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 280 * s, height: 340 * s, zIndex: z,
    filter: "drop-shadow(0 9px 9px rgba(26,30,40,0.34))" }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: 14 * s, background: CHROME_D }} />
    <div style={{ position: "absolute", left: 16 * s, top: 16 * s, right: 16 * s, height: 210 * s,
      borderRadius: 8 * s, background: BOARD }} />
    <div style={{ position: "absolute", left: 36 * s, top: 40 * s, width: 208 * s, height: 26 * s,
      borderRadius: 5 * s, background: BOARD_L }} />
    <div style={{ position: "absolute", left: 36 * s, top: 80 * s, width: 150 * s, height: 26 * s,
      borderRadius: 5 * s, background: BOARD_L }} />
    <div style={{ position: "absolute", left: 36 * s, top: 132 * s, width: 208 * s, height: 58 * s,
      borderRadius: 8 * s, background: on ? GO : "#5C6674", fontFamily: inter.fontFamily,
      fontWeight: 900, fontSize: 30 * s, color: "#EAFBF3", textAlign: "center",
      lineHeight: `${58 * s}px` }}>{on ? "FREE" : "..."}</div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 246 * s, textAlign: "center",
      fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 27 * s, color: INKD }}>{label}</div>
  </div>
);

/** a speech bubble with the word withheld — the curiosity beat */
const Whisper: React.FC<{ x: number; y: number; text: string; s?: number; z?: number }> =
  ({ x, y, text, s = 1, z = 26 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    filter: "drop-shadow(0 8px 8px rgba(26,30,40,0.34))" }}>
    <div style={{ position: "relative", padding: `${14 * s}px ${26 * s}px`, borderRadius: 14 * s,
      background: CREAMY, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 44 * s,
      letterSpacing: "0.06em", color: INKD, whiteSpace: "nowrap" }}>{text}
      <div style={{ position: "absolute", left: 34 * s, bottom: -16 * s, width: 0, height: 0,
        borderLeft: `${18 * s}px solid transparent`, borderRight: `${18 * s}px solid transparent`,
        borderTop: `${18 * s}px solid ${CREAMY}` }} />
    </div>
  </div>
);

/* ---------------------------------------------------------------- the hook */

const HEAD = { big: "THE SECRET MENU", hot: "134 FREE AI APIS" };
const PROV = ["GEMINI", "GROK", "NVIDIA", "MISTRAL", "COHERE", "GROQ", "TOGETHER", "CEREBRAS"];

const Shot: React.FC<{ f: number; a: number; b: number; k?: number; children: React.ReactNode }> =
  ({ f, a, b, k = 0, children }) => {
  if (f < a || f >= b) return null;
  const t = Math.min(1, (f - a) / 20), e = t * t * (3 - 2 * t);
  const z = [1.09 - e * 0.08, 1.02 + e * 0.06, 1.06 - e * 0.05, 1.03 + e * 0.06][k % 4];
  const dx = [(1 - e) * 20, -(1 - e) * 24, (1 - e) * 14, -(1 - e) * 18][k % 4];
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden",
      transform: `scale(${z}) translateX(${dx}px)`, transformOrigin: "50% 58%" }}>{children}</div>
  );
};
const Flash: React.FC<{ f: number; cuts: number[] }> = ({ f, cuts }) => (<>
  {cuts.map((cf) => {
    const k = f - cf;
    if (k < 0 || k > 2) return null;
    return <div key={cf} style={{ position: "absolute", inset: 0, background: "#F6F1E6",
      opacity: (1 - k / 2) * 0.34, zIndex: 40 }} />;
  })}
</>);

/* 0.73 · 0.93 · 0.93 · 0.93 · 0.87 · 0.70 s */
export const KEY_SEC_CUTS = [22, 50, 78, 106, 132];

export const KeySecretHook: React.FC = () => {
  const f = useCurrentFrame();
  const [C1, C2, C3, C4, C5] = KEY_SEC_CUTS;
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <HookHeader f={f + 12} big={HEAD.big} hot={HEAD.hot} />
      <Panel glow={hexA(GOLD, 0.28)}>

        {/* 1 · THE BOARD EVERYONE ORDERS FROM. Prices climbing. */}
        <Shot f={f} a={0} b={C1} k={0}>
          <Diner f={f} />
          <PriceBoard f={f} x={156} y={54} w={700} rows={5} z={12} />
          <Counter f={f} y={506} z={16} />
          {[0, 1, 2].map((i) => (
            <Dev key={i} f={f + i * 17} x={40 + i * 178} y={330} size={198} gaze={2} stern={0.25}
                 nodAmp={1.8} nodSpeed={13 + i} z={20 + i} />
          ))}
          <Chip y={452} text="EVERYONE ORDERS FROM THIS" c={RED} size={33} />
        </Shot>

        {/* 2 · THE HERO LEANS IN. One word, withheld. */}
        <Shot f={f} a={C1} b={C2} k={1}>
          <Diner f={f} pan={(f - C1) * 2} />
          <Counter f={f} y={470} z={16} />
          <Dev f={f} x={80} y={252} size={280} gaze={2} cheer={0.3} nodAmp={2.2} nodSpeed={12} z={20} />
          <Dev f={f + 24} x={640} y={262} size={264} gaze={-2} shock={0.35} nodAmp={2} nodSpeed={14}
               z={20} tint="#C4A46A" />
          <div style={{ transform: `scale(${0.5 + E(f, C1 + 4, C1 + 18, 0, 0.5, BACK)})`,
            transformOrigin: "20% 100%" }}>
            <Whisper x={330} y={108} text={"“one word”"} s={1.0} z={26} />
          </div>
        </Shot>

        {/* 3 · IT COMES OUT FROM UNDER THE COUNTER. */}
        <Shot f={f} a={C2} b={C3} k={2}>
          <Diner f={f} />
          <Counter f={f} y={430} z={16} />
          {/* slid across the counter, face up — it SETTLES rather than flying through
              the frame, so the title reads instead of passing under the header */}
          <div style={{ transform: `translate(${(1 - E(f, C2 + 2, C2 + 20, 0, 1, OUT)) * -620}px, 0px) `
                        + `rotate(${-3 + (1 - E(f, C2 + 2, C2 + 22, 0, 1, OUT)) * 9}deg)`,
            transformOrigin: "50% 100%" }}>
            <SecretMenu f={f} x={196} y={212} w={620} open={0.38} rows={8} labels={PROV} z={24} />
          </div>
          <Dev f={f} x={-4} y={300} size={252} gaze={2} cheer={0.6} nodAmp={2.4} nodSpeed={11} z={26} />
          <Chip y={700} text="NOBODY KNOWS IT EXISTS" c={GO} size={34} />
        </Shot>

        {/* 4 · IT UNFURLS. 134 items, every price zero. */}
        <Shot f={f} a={C3} b={C4} k={3}>
          <Diner f={f} />
          <SecretMenu f={f} x={168} y={64} w={676} open={E(f, C3 + 1, C3 + 24, 0.14, 1, OUT)}
                      rows={8} labels={PROV} z={24} />
          <div style={{ position: "absolute", left: 26, top: 92, padding: "10px 20px", borderRadius: 8,
            background: CHERRY, zIndex: 30, fontFamily: inter.fontFamily, fontWeight: 900,
            fontSize: 52, letterSpacing: "-0.02em", color: CREAMY,
            transform: `rotate(-8deg) scale(${0.7 + E(f, C3 + 8, C3 + 22, 0, 0.3, BACK)})` }}>134</div>
        </Shot>

        {/* 5 · ORDER IT FROM ANY OF THE THREE. */}
        <Shot f={f} a={C4} b={C5} k={0}>
          <Diner f={f} />
          <Counter f={f} y={614} z={10} />
          {["CURSOR", "CLAUDE CODE", "CODEX"].map((t, i) => (
            <div key={t} style={{ transform: `translateY(${(1 - E(f, C4 + i * 5, C4 + 17 + i * 5, 0, 1, BACK)) * -520}px)` }}>
              <Kiosk x={26 + i * 330} y={214} label={t} s={1.06} on={f > C4 + 4 + i * 5} z={18} />
            </div>
          ))}
          <Chip y={128} text="ONE CLICK SETUP" c={AMBER} />
        </Shot>

        {/* 6 · HE WALKS. THEY QUEUE. */}
        <Shot f={f} a={C5} b={9999} k={1}>
          <Diner f={f} pan={(f - C5) * 7} />
          <PriceBoard f={f} x={430} y={48} w={560} rows={4} z={12} />
          <Counter f={f} y={512} z={16} />
          {[0, 1].map((i) => (
            <Dev key={i} f={f + i * 19} x={560 + i * 168} y={330} size={190} gaze={-2} stern={0.3}
                 nodAmp={1.8} nodSpeed={14} z={19 + i} />
          ))}
          <Meter f={f} x={40} y={54} s={0.62} stop label="YOUR BILL" z={22} />
          <Dev f={f} x={40 + (f - C5) * 6} y={300} size={262} step={11} gaze={2} cheer={0.9}
               nodAmp={3.4} nodSpeed={9} hold z={24} />
          <Chip y={452} text="SAME MODELS. ZERO." c={GO} />
        </Shot>

        <Flash f={f} cuts={KEY_SEC_CUTS} />
      </Panel>
      <SoloCap words={["Because", "of", "one", "GitHub"]} hot={2} />
    </AbsoluteFill>
  );
};
