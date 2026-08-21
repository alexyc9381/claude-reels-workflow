import React from "react";
import { AbsoluteFill, Composition, registerRoot, useCurrentFrame } from "remotion";
import { Bg, AssemblyCtx, HookHeader } from "./SlopKit";
import { CamCtx } from "./BillWorld";
import { CAM, GRADE, S0, S2 } from "./BillScenes";
import { GoogleSprite, SparkGuy, Spark, G_TOOLS, ToolTile, G_TINTS } from "./BillGoogle";
import { SetFor } from "./BillSets";
import { CHARACTERS, GemBot, Beaker } from "./BillChars";

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


/* ⭐ THE SIZE TEST. A character sheet is a lie about scale: these appear at
   90-280px on a 1012px panel, not at 300px on a white card. Alex likes Gembot
   and Beaker, so both are rendered at every size the reel actually uses, on the
   reel's own dark ground, plus a crowd — because the hook has one and S15 has
   nine. A design that only works big is not a design. */
const SizeTest: React.FC = () => {
  const f = useCurrentFrame();
  const SIZES = [280, 190, 130, 90];
  const ROWS = [
    { name: "GEMBOT", C: GemBot },
    { name: "BEAKER", C: Beaker },
  ];
  return (
    <AbsoluteFill style={{ background: "#ECE9E2" }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 54, textAlign: "center",
        fontFamily: "Inter, system-ui", fontWeight: 900, fontSize: 48, color: "#1A1813" }}>
        AT THE SIZES THE REEL ACTUALLY USES
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 112, textAlign: "center",
        fontFamily: "ui-monospace, Menlo", fontWeight: 700, fontSize: 20, color: "#8C877D" }}>
        280px hook · 190px scene · 130px crowd · 90px back rank — on the reel's own dark panel
      </div>
      {ROWS.map((r, ri) => {
        const top = 200 + ri * 520;
        const C = r.C;
        return (
          <React.Fragment key={r.name}>
            <div style={{ position: "absolute", left: 40, top, width: 1000, height: 440,
              borderRadius: 22, background: "#26313C" }} />
            <div style={{ position: "absolute", left: 56, top: top + 12,
              fontFamily: "Inter, system-ui", fontWeight: 900, fontSize: 30, color: "#F2EDE0" }}>
              {r.name}
            </div>
            {SIZES.map((sz, j) => (
              <C key={j} f={f} x={220 + j * 230} y={top + 400} size={sz} i={j} z={40} at={2} loop={j} />
            ))}
            {SIZES.map((sz, j) => (
              <div key={"l" + j} style={{ position: "absolute", left: 220 + j * 230 - 60, top: top + 406,
                width: 120, textAlign: "center", fontFamily: "ui-monospace, Menlo",
                fontWeight: 700, fontSize: 17, color: "#8FA0B0" }}>{sz}px</div>
            ))}
          </React.Fragment>
        );
      })}
      {/* the crowd test — S15 puts nine of them in one frame */}
      <div style={{ position: "absolute", left: 40, top: 1246, width: 1000, height: 380,
        borderRadius: 22, background: "#1E2A34" }} />
      <div style={{ position: "absolute", left: 56, top: 1258, fontFamily: "Inter, system-ui",
        fontWeight: 900, fontSize: 26, color: "#F2EDE0" }}>A CROWD OF NINE — the S15 test</div>
      {Array.from({ length: 9 }, (_, i) => {
        const rank = Math.floor(i / 3);
        const C = i % 2 ? Beaker : GemBot;
        return (
          <C key={"c" + i} f={f} x={200 + (i % 3) * 260 + rank * 70} y={1470 + rank * 62}
            size={150 - rank * 24} i={i} z={40 - rank} at={2 + i * 3} loop={i % 4} />
        );
      })}
      <div style={{ position: "absolute", left: 56, top: 1580, fontFamily: "ui-monospace, Menlo",
        fontWeight: 700, fontSize: 17, color: "#8FA0B0" }}>alternating, so the two read against each other in a mass</div>
      {/* ⭐ THE LIQUID IS A STATE — the reason this one wins. Four levels, which
          is the reel's own 5 -> 0 spine, drawn on the character. */}
      <div style={{ position: "absolute", left: 40, top: 1660, width: 1000, height: 210,
        borderRadius: 22, background: "#26313C" }} />
      <div style={{ position: "absolute", left: 56, top: 1672, fontFamily: "Inter, system-ui",
        fontWeight: 900, fontSize: 24, color: "#F2EDE0" }}>THE LIQUID IS A STATE — 5 charges down to 0</div>
      {[0.95, 0.62, 0.32, 0.08].map((lv, j) => (
        <Beaker key={"lv" + j} f={f} x={190 + j * 148} y={1856} size={128} i={j} z={50} at={2}
          loop={3} fill={lv} liquid={["#4C7BEA", "#34A853", "#FBBC05", "#EA4335"][j]} />
      ))}
      {/* the thumbnail test — how it survives a feed */}
      {/* the thumbnail test rides along the level row — 56px, silhouette only */}
      {[0, 1, 2, 3].map(i => (
        <React.Fragment key={"t" + i}>
          {i % 2 === 0
            ? <GemBot f={f} x={704 + i * 62} y={1712} size={52} i={i} z={52} at={2} loop={0} />
            : <Beaker f={f} x={704 + i * 62} y={1712} size={52} i={i} z={52} at={2} loop={0} />}
        </React.Fragment>
      ))}
      <div style={{ position: "absolute", left: 640, top: 1720, width: 340, textAlign: "center",
        fontFamily: "ui-monospace, Menlo", fontWeight: 700, fontSize: 14, color: "#8FA0B0" }}>
        52px silhouette test
      </div>
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
  <Composition id="p-size"    component={SizeTest}   durationInFrames={90}  {...V} />
</>);

registerRoot(Root);
