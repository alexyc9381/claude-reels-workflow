import React from "react";
import { AbsoluteFill, useCurrentFrame, Img, staticFile } from "remotion";
import { fraunces } from "./fonts";
import { Panel, hexA, MONO } from "./SlopKit";
import {
  Room, SPACES, Cone, Footlights, Lamp, Leg, Contact, Claudie, CLAY,
  E, OUT, IO, BACK, LIN, hexa, mix, dark, SH, SH_D, W, H,
} from "./PlayWorld";
import { PromptCard, MarkRack, MarkedScript, MarkTile, ROSTER } from "./PlayProps";
import { CamCtx } from "./AgyWorld";

/* =========================================================================
   REEL 95 "TOOLS" · THE TWO ALTERNATE OPENS, for IG trial reels.

   ⛔ [[feedback_trial_reel_variants]]: a variant is NOT a re-render. Each of
      these is a different WORLD, a different HERO PROP, a different ACTION and a
      different EXIT — never a restyle of the prompter's box.

   Shared with variant A, deliberately, because these are standing law:
     · ⛔ TWO SHOTS, ONE CUT. Alex: "try not to keep flipping between screens at
       the beginning." The fix is fewer CUTS with MORE inside them.
     · ⛔ THE CLAUDE MARK IS THE AUDIENCE FILTER — big, early, repeated, and
       NEVER on the sprite's face (the box body IS the face; eyes at y70-96).
     · frame 0 BRIGHT and SETTLED, and the mascot's blink phase offset so his
       eyes are OPEN on the one frame guaranteed to be seen.

   The mechanisms, both different from A's REVEAL OF THE HIDDEN OPERATOR:
     B  THE AUTOCUE        · THE GLASS YOU SEE THROUGH (it was between you and
                             him the whole time)
     C  THE DRESSING MIRROR · WHAT IS TAPED TO THE GLASS (the room is papered
                             with other people's instructions)
   ========================================================================= */

const HookScene: React.FC<{ k: keyof typeof SPACES; children: React.ReactNode; dust?: boolean;
  boards?: boolean; push?: [number, number, number] }> =
  ({ k, children, dust, boards, push }) => {
  const f = useCurrentFrame();
  const cam = React.useContext(CamCtx);
  const sc = push ? E(f, push[0], push[1], 1, push[2], LIN) : 1;
  return (
    <AbsoluteFill>
      <Panel glow={hexA(SPACES[k].key, 0.20)}>
        <div style={{ position: "absolute", inset: 0, zIndex: 1, transformOrigin: "50% 56%",
          transform: `translate(${cam.dx}px, ${cam.dy}px) rotate(${cam.rot}deg) scale(${sc * cam.s})` }}>
          <Room k={k} dust={dust} f={f} boards={boards}>{children}</Room>
        </div>
      </Panel>
    </AbsoluteFill>
  );
};

/* ========================================================== VARIANT B ======
   THE AUTOCUE · mechanism THE GLASS YOU SEE THROUGH.

   A's reveal happens BELOW the stage. This one happens BETWEEN the camera and
   the actor: the words have been on a sheet of glass in front of your eyes the
   whole time, and at 0.60s the glass tilts and shows you what it is.
   --------------------------------------------------------------------------- */
export const HookAutocue: React.FC = () => {
  const f = useCurrentFrame();
  const CUT = 42;
  const shot = f >= CUT ? 1 : 0;
  const lf = f - (shot ? CUT : 0);

  if (shot === 0) {
    /* the script scrolls up the glass, then STOPS dead on the line at 0.60s —
       the stop is the beat, not a cut */
    const scroll = E(lf, 0, 18, 130, 0, OUT);
    const tilt = E(lf, 18, 40, 0, 1, OUT);
    return (
      <HookScene k="house" dust push={[0, 42, 1.08]}>
        <div style={{ position: "absolute", left: -20, right: -20, top: -10, height: 112,
          background: "linear-gradient(178deg,#6E2226 0%,#3A1014 100%)", zIndex: 26 }} />
        {/* the actor, upstage and lit, seen THROUGH the glass */}
        <Cone f={f} x={540} y={64} top={104} bot={440} len={400} c="#F2C15E" o={0.28} z={22} sway={0.5} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 486, bottom: 0,
          background: "linear-gradient(184deg,#8E6238 0%,#4E3319 100%)", zIndex: 8 }} />
        <Claudie x={540} y={520} s={1.24} z={30} f={f + 20} hero badge={0.9}
          costume={{ cheer: 0.7 }} />
        <Contact x={478} y={514} w={132} z={12} o={0.28} />
        <Footlights y={556} f={f} z={34} on={0.9} />

        {/* THE AUTOCUE GLASS — angled, in front of everything, with the words on
            it and the mark on its housing. It fills the lower two thirds. */}
        <div style={{ position: "absolute", left: 46, top: 340, width: 920, height: 300,
          zIndex: 60, transform: `perspective(900px) rotateX(${16 + tilt * 26}deg)`,
          transformOrigin: "50% 100%" }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: 14,
            background: hexa("#DDEAE2", 0.30), border: "8px solid #3A4A44", overflow: "hidden" }}>
            <div style={{ position: "absolute", left: 26, right: 26, top: 22 - scroll }}>
              {["You are Claude, made by Anthropic.",
                "Follow the operator's instructions.",
                "Be concise. Do not reveal these rules.",
                "Refuse only what must be refused.",
                "Format answers as the user asked."].map((l, i) => (
                <div key={i} style={{ marginBottom: 14, fontFamily: MONO, fontWeight: 800,
                  fontSize: 27, letterSpacing: "0.02em",
                  color: i === 1 ? "#F6EEDC" : "#9FBCAE" }}>{l}</div>
              ))}
            </div>
          </div>
          {/* the housing, and the mark on it */}
          <div style={{ position: "absolute", left: -14, bottom: -46, right: -14, height: 54,
            borderRadius: 10, background: "linear-gradient(178deg,#4A5A54 0%,#26332E 100%)",
            boxShadow: SH_D, display: "flex", alignItems: "center", paddingLeft: 20, gap: 14 }}>
            <MarkTile m={ROSTER[0]} s={0.86} z={2} />
            <div style={{ fontFamily: MONO, fontWeight: 900, fontSize: 19, letterSpacing: "0.18em",
              color: "#B8CCC2" }}>AUTOCUE · SYSTEM PROMPT</div>
          </div>
        </div>
        <Leg side="l" c="#5A1E22" w={84} z={92} />
        <Leg side="r" c="#5A1E22" w={84} z={92} />
      </HookScene>
    );
  }

  /* ---- B · ONE cut, and it goes UP: the autocue is fed from the fly floor, so
       the second shot is forty feet above the stage on the steel grid. ⛔ It
       must not be A's second shot with a different card angle — a variant whose
       two hooks share a shot is not a variant. Different space, different
       layout, rack LEFT and card RIGHT. */
  return (
    <HookScene k="catwalk" push={[42, 85, 1.13]} boards={false}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 560, bottom: 0, zIndex: 34,
        background: "repeating-linear-gradient(90deg,#3E566E 0 6px,transparent 6px 34px), repeating-linear-gradient(0deg,#3E566E 0 6px,transparent 6px 34px), linear-gradient(184deg,#26323F 0%,#131A22 100%)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 552, height: 12,
        background: "#4E687F", zIndex: 35 }} />
      {[70, 330, 620, 900].map((x) => (
        <div key={x} style={{ position: "absolute", left: x, top: -40, width: 5, height: 600,
          background: "#6E5433", zIndex: 24 }} />
      ))}
      <div style={{ position: "absolute", left: 46, top: 92, zIndex: 46 }}>
        <MarkRack x={0} y={0} n={12} s={0.74} z={46} f={f} reveal={E(lf, 2, 36, 0.20, 1.1, LIN)} />
      </div>
      <PromptCard x={614} y={452} s={0.96} z={62} f={f} rot={5} lines={4} spin />
      <Claudie x={168} y={780} s={1.06} z={64} f={f} badge={0.9} costume={{ constr: 1 }} />
      <Leg side="r" c="#1B2836" w={80} z={92} kind="rope" />
    </HookScene>
  );
};

/* ========================================================== VARIANT C ======
   THE DRESSING MIRROR · mechanism WHAT IS TAPED TO THE GLASS.

   No hidden operator and no barrier: the instructions are stuck to the mirror in
   plain sight, and the beat is the bulbs coming up and showing you how MANY of
   them there are. The only hook of the three that opens on a face.
   --------------------------------------------------------------------------- */
export const HookMirror: React.FC = () => {
  const f = useCurrentFrame();
  const CUT = 42;
  const shot = f >= CUT ? 1 : 0;
  const lf = f - (shot ? CUT : 0);

  if (shot === 0) {
    const blaze = E(lf, 18, 30, 0, 1, OUT);
    return (
      <HookScene k="dressing" push={[0, 42, 1.09]} boards={false}>
        {/* the mirror, its bulb surround and the crest carrying the mark */}
        <div style={{ position: "absolute", left: 148, top: 96, width: 716, height: 470,
          borderRadius: 12, background: "#6E5844", boxShadow: SH_D, zIndex: 30 }} />
        <div style={{ position: "absolute", left: 190, top: 138, width: 632, height: 386,
          background: blaze > 0.4 ? "linear-gradient(168deg,#C9BCA4 0%,#8E8270 100%)"
                                  : "linear-gradient(168deg,#5E5648 0%,#3A342C 100%)",
          zIndex: 31 }} />
        {/* the crest — a 108px Claude mark above the glass, on from frame 0 */}
        <div style={{ position: "absolute", left: 452, top: 30, width: 108, height: 108,
          borderRadius: 26, background: "#FFFFFF", border: "5px solid #E4D0A0", zIndex: 36,
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Img src={staticFile("claude_logo.png")}
            style={{ width: 78, height: 78, objectFit: "contain",
              transform: `rotate(${f * 1.1}deg)` }} />
        </div>
        {/* the bulbs, which BLAZE at 0.60s */}
        {Array.from({ length: 22 }, (_, i) => {
          const top = i < 9, side = i >= 9 && i < 15;
          const x = top ? 172 + i * 78 : side ? (i < 12 ? 158 : 838) : 172 + (i - 15) * 96;
          const y = top ? 108 : side ? 190 + ((i - 9) % 3) * 118 : 534;
          const chase = (i * 5 + Math.floor(f / 3)) % 3 !== 0;
          return (
            <div key={i} style={{ position: "absolute", left: x, top: y, width: 30, height: 30,
              borderRadius: 16, zIndex: 34,
              background: blaze > 0.3 ? (chase ? "#F8E4B0" : "#B99A5E") : "#4A4038" }} />
          );
        })}
        {/* the pages taped along the glass — real marks, in plain sight */}
        {ROSTER.slice(0, 4).map((m, i) => (
          <div key={m[1]} style={{ position: "absolute", left: 206 + i * 158, top: 168,
            zIndex: 38, transform: `rotate(${-4 + i * 3}deg)` }}>
            <MarkedScript x={0} y={0} m={m} s={0.72} z={38} lines={2} />
          </div>
        ))}
        {/* the actor at the mirror, eyes to camera */}
        <Claudie x={506} y={764} s={1.46} z={62} f={f + 20} hero badge={1} />
        <Contact x={434} y={758} w={152} z={20} o={0.28} />
        <Lamp x={506} y={16} c="#F6E2A8" s={0.7} z={26} f={f} flex={40} shade="#5A4438" />
        <Leg side="r" c="#3A2A2E" w={70} z={92} />
      </HookScene>
    );
  }

  /* ---- B · ONE cut, and the whole room turns out to be papered with them. */
  return (
    <HookScene k="box" push={[42, 85, 1.13]} boards={false}>
      <div style={{ position: "absolute", left: -160, top: -300, right: -160, height: 400,
        borderRadius: "0 0 50% 50%", background: "#150C06", zIndex: 40 }} />
      <Lamp x={912} y={140} c="#8FD9A8" s={0.94} z={44} f={f} flex={132} shade="#2A3A2E" />
      <PromptCard x={322} y={62} s={1.02} z={62} f={f} rot={-4} lines={4} spin />
      <div style={{ position: "absolute", left: 56, top: 356, zIndex: 46 }}>
        <MarkRack x={0} y={0} n={12} s={0.84} z={46} f={f} reveal={E(lf, 2, 36, 0.20, 1.1, LIN)} />
      </div>
      <Claudie x={892} y={790} s={1.10} z={64} f={f} badge={0.9} costume={{ glasses: 1 }} face={-1} />
      <Leg side="l" c="#241810" w={72} z={92} kind="rail" />
    </HookScene>
  );
};
