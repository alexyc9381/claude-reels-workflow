import React from "react";
import { AbsoluteFill, Composition, registerRoot, useCurrentFrame } from "remotion";
import { Bg, AssemblyCtx, HookHeader } from "./SlopKit";
import { CamCtx } from "./BillWorld";
import { CAM, GRADE, S0, S2 } from "./BillScenes";
import { GoogleSprite, SparkGuy, Spark, G_TOOLS, ToolTile, G_TINTS } from "./BillGoogle";
import { SetFor } from "./BillSets";
import { CHARACTERS } from "./BillChars";

/* Reel 116 · PREVIEW ONLY. Alex: *"for now dont need to render full video just
   hook scene and that 6 seconds scene."* These comps render one scene each so a
   round is ~8s instead of ~90s. ⛔ Nothing here ships — the delivered cuts are
   still built from `bill-116-index.tsx`, which owns the VO, the bed and the
   caption track. */
const V = { fps: 30, width: 1080, height: 1920 } as const;

const Solo: React.FC<{ children: React.ReactNode; big: string; hot: string }> =
  ({ children, big, hot }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Bg />
      <CamCtx.Provider value={{ ...CAM.bill }}>
        <AssemblyCtx.Provider value={true}>
          <div style={{ position: "absolute", inset: 0, filter: GRADE.bill }}>{children}</div>
        </AssemblyCtx.Provider>
      </CamCtx.Provider>
      <HookHeader big={big} hot={hot} f={f + 12} />
    </AbsoluteFill>
  );
};

const HookOnly: React.FC = () => (
  <Solo big="5 FREE GOOGLE TOOLS" hot="THAT KILL YOUR AI BILL"><S0 v="bill" dur={48} /></Solo>
);
const WallOnly: React.FC = () => (
  <Solo big="GOOGLE SHIPPED" hot="OVER 20 OF THESE QUIETLY"><S2 v="bill" dur={83} /></Solo>
);

/* ⭐ THE SPRITE BRAINSTORM, rendered rather than described. Four ways to say
   "Google AI" on the house clay chassis, side by side at the size they will
   actually appear, so the pick is made by looking. */
const SpriteBoard: React.FC = () => {
  const f = useCurrentFrame();
  const KINDS = ["spark", "four", "halo", "badge"] as const;
  const LABEL = ["A · GEMINI SPARK", "B · FOUR DOTS", "C · COLOUR HALO", "D · G BADGE"];
  return (
    <AbsoluteFill style={{ background: "#ECE9E2" }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 96, textAlign: "center",
        fontFamily: "Inter, system-ui", fontWeight: 900, fontSize: 54, color: "#1A1813" }}>
        GOOGLE AI SPRITE — FOUR OPTIONS
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 168, textAlign: "center",
        fontFamily: "ui-monospace, Menlo", fontWeight: 700, fontSize: 24, color: "#8C877D",
        letterSpacing: "0.06em" }}>
        SAME HOUSE CLAY BODY · GOOGLE TINTS · A DIFFERENT IDENTITY LAYER ABOVE THE HEAD
      </div>
      {/* ⭐ THE SPARK-BODIED CHARACTER, for the "not so Claude sprite shaped"
          note — its silhouette is the Gemini mark, not a box. */}
      {[0, 1, 2].map(j => (
        <SparkGuy key={"sg" + j} f={f} x={330 + j * 190} y={1770}
          size={j === 1 ? 230 : 186} i={j} z={60} at={j * 4} loop={j}
          a={["#4C8DFF", "#7C6CFF", "#3FA9F5"][j]} b={["#A48BFF", "#C08BFF", "#8ED6FF"][j]} />
      ))}
      <div style={{ position: "absolute", left: 0, right: 0, top: 1800, textAlign: "center",
        fontFamily: "ui-monospace, Menlo", fontWeight: 800, fontSize: 26, color: "#1A1813",
        letterSpacing: "0.04em" }}>E · SPARK BODY — the mark IS the character</div>
      {KINDS.map((k, i) => {
        const cx = 270 + (i % 2) * 540, cy = 700 + Math.floor(i / 2) * 620;
        return (
          <React.Fragment key={k}>
            <div style={{ position: "absolute", left: cx - 240, top: cy - 430, width: 480,
              height: 560, borderRadius: 28, background: "#20242C" }} />
            <div style={{ position: "absolute", left: cx - 240, top: cy - 476, width: 480,
              textAlign: "center", fontFamily: "ui-monospace, Menlo", fontWeight: 800,
              fontSize: 26, color: "#1A1813", letterSpacing: "0.04em" }}>{LABEL[i]}</div>
            {/* three of them, so a CROWD is what is being judged, not one figure */}
            {[0, 1, 2].map(j => (
              <GoogleSprite key={j} f={f} x={cx - 130 + j * 130} y={cy + 90}
                size={j === 1 ? 210 : 172} i={i * 3 + j} kind={k} z={40 + (j === 1 ? 2 : 0)}
                at={j * 4} loop={j} />
            ))}
          </React.Fragment>
        );
      })}
      {/* the real Gemini spark, for reference against option A */}

    </AbsoluteFill>
  );
};


/* ⭐ THE CHARACTER SHEET. Alex: *"just show me the different character design
   options by themselves as images here let me see."* One per card, big, on a
   neutral ground, with the same idle rig on every one so a design is judged on
   its DRAWING and not on whether it happens to move better than its neighbour. */
const CharBoard: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "#ECE9E2" }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 62, textAlign: "center",
        fontFamily: "Inter, system-ui", fontWeight: 900, fontSize: 52, color: "#1A1813" }}>
        GOOGLE AI CHARACTER — SIX DESIGNS
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 126, textAlign: "center",
        fontFamily: "ui-monospace, Menlo", fontWeight: 700, fontSize: 21, color: "#8C877D",
        letterSpacing: "0.05em" }}>
        head and body are different shapes · face on the head · house flat fill and slit eyes
      </div>
      {CHARACTERS.map((c, i) => {
        const cx = 270 + (i % 2) * 540;
        const cy = 480 + Math.floor(i / 2) * 470;
        const C = c.C;
        return (
          <React.Fragment key={c.key}>
            <div style={{ position: "absolute", left: cx - 246, top: cy - 330, width: 492,
              height: 400, borderRadius: 26, background: "#FFFFFF",
              border: "3px solid #DED9CE" }} />
            <C f={f} x={cx} y={cy + 20} size={300} i={i} z={40} at={2} loop={i % 4} />
            <div style={{ position: "absolute", left: cx - 246, top: cy + 82, width: 492,
              textAlign: "center", fontFamily: "Inter, system-ui", fontWeight: 900,
              fontSize: 27, color: "#1A1813" }}>{c.name}</div>
            <div style={{ position: "absolute", left: cx - 246, top: cy + 116, width: 492,
              textAlign: "center", fontFamily: "ui-monospace, Menlo", fontWeight: 700,
              fontSize: 18, color: "#8C877D" }}>{c.note}</div>
          </React.Fragment>
        );
      })}
    </AbsoluteFill>
  );
};

/* the 24-tool wall on its own, so the roster can be read */
const ToolBoard: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "#20242C" }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 90, textAlign: "center",
        fontFamily: "Inter, system-ui", fontWeight: 900, fontSize: 50, color: "#F2EDE0" }}>
        {G_TOOLS.length} REAL GOOGLE AI TOOLS
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 152, textAlign: "center",
        fontFamily: "ui-monospace, Menlo", fontWeight: 700, fontSize: 22, color: "#8C877D",
        letterSpacing: "0.05em" }}>
        every name read live from labs.google · icon where Google publishes one, real NAME where it does not
      </div>
      {G_TOOLS.map((t, i) => (
        <ToolTile key={i} x={150 + (i % 4) * 260} y={330 + Math.floor(i / 4) * 250} s={1.55}
          f={f} at={2 + i * 2} t={t} z={40} seed={i} />
      ))}
    </AbsoluteFill>
  );
};

const Root: React.FC = () => (<>
  <Composition id="p-hook"    component={HookOnly}   durationInFrames={48}  {...V} />
  <Composition id="p-wall"    component={WallOnly}   durationInFrames={83}  {...V} />
  <Composition id="p-sprites" component={SpriteBoard} durationInFrames={90} {...V} />
  <Composition id="p-tools"   component={ToolBoard}  durationInFrames={90}  {...V} />
  <Composition id="p-chars"   component={CharBoard}  durationInFrames={90}  {...V} />
</>);

registerRoot(Root);
