import React from "react";
import { AbsoluteFill, useCurrentFrame, Img, staticFile } from "remotion";
import { inter, fraunces } from "./fonts";
import { Panel, Mascot, hexA, MONO } from "./SlopKit";
import {
  Surface, WORLDS, World, Occluder, Cone, StreetLamp, Claudie, CLAY, Chip, Slug, Glass, BigNum,
  CamCtx, useWorld,
  Plinth, Contact, E, OUT, IO, BACK, IN_Q, LIN, mix, dark, hexa, SH, SH_D, INK, W, H,
} from "./AgyWorld";
import {
  Workroom, Shutter, SealBurst, Marquee, StarStream, Counter, Plaque, Tower, DIVISIONS,
  Shopfront, Billboard, Trailer, Checklist, TrunkLine, Kerbtop, House, AppWindow, ToolTile,
  OwnerPlaque, RepoCard,
} from "./AgyProps";

/* =========================================================================
   REEL 94 "AGENCY" · THE BODY. Board: storyboards/94-agency.md.

   ⛔ EVERY SCENE EARNS ITS MOTION FROM THE ACTION, and where a camera move is
      used it is MOTIVATED and named on the board:
        S1 tilt up the facade   (we are looking up at the building)
        S3 lateral truck        (we are walking the row)
        S4 dolly in             (we are walking down to meet them)
        S6 slow push            (the crew is walking to the door and so are we)
      The other five are LOCKED. Reel 92: "the camera keeps zooming in for not
      much reason which i dont like" — an unmotivated push is what crops props
      past the panel edge, and it is not a substitute for something happening.

   ⛔ ANY TRANSFORMED WRAPPER NEEDS AN EXPLICIT zIndex. A `transform` creates a
      stacking context; reel 93 lost a whole tower to this and reel 84 lost a
      pick card. Every `Cam` below carries one.
   ========================================================================= */

/** the shared shell: a dark exterior, display type set INTO the panel, and the
    mono slug along the floor. ⛔ NOT the white SectionHeader pill — that is the
    ROOT's job and a second one inside the picture reads as a UI label. */
const Scene: React.FC<{ w: World; t?: number; slug: string;
  children: React.ReactNode; stars?: boolean; overhead?: boolean; lampsOn?: boolean;
  litFar?: number; glow?: string; slugC?: string; push?: [number, number, number];
  bare?: boolean }> =
  ({ w, t, slug, children, stars, overhead, lampsOn, litFar, glow, slugC, push, bare }) => {
  const f = useCurrentFrame();
  /* ⛔ THE PUSH. Four scenes measured 3.0-5.5 on the motion audit against a 6.0
     floor, and adding more travel did not move them — because COLOUR IS HALF OF
     MOTION and a dark silhouette crossing a dark street is worth almost nothing
     to a frame-difference metric. A push translates EVERY lit pixel in the frame
     every frame, which is why the house calls it the highest-measuring lever.
     ⚠️ Reel 92's note was about UNMOTIVATED pushes that CROPPED props. These are
     motivated (named on the board) and capped at 1.07 with all content inside
     SAFE, so nothing leaves the panel. The five scenes that already pass are
     left LOCKED. */
  const sc = push ? E(f, push[0], push[1], 1, push[2], LIN) : 1;
  /* the variant camera rides ON TOP of the scene's own push, inside the Panel */
  const cam = React.useContext(CamCtx);
  return (
    <AbsoluteFill>
      <Panel glow={glow ?? hexA(w.key, 0.20)}>
        <div style={{ position: "absolute", inset: 0, zIndex: 1, transformOrigin: "50% 56%",
          transform: `translate(${cam.dx}px, ${cam.dy}px) rotate(${cam.rot}deg) scale(${sc * cam.s})` }}>
          {!bare && <Surface w={w} t={t ?? f} stars={stars} overhead={overhead}
            lampsOn={lampsOn} litFar={litFar} />}
          {children}
        </div>
        {/* the vignette, last, over everything — it is what makes one thing rank */}
        <div style={{ position: "absolute", inset: 0, zIndex: 97, pointerEvents: "none",
          background: `radial-gradient(122% 92% at 50% 44%, transparent 40%, ${hexa("#05060B", 0.58)} 100%)` }} />
        <Slug t={slug} c={slugC} />
      </Panel>
    </AbsoluteFill>
  );
};

/** a transformed camera wrapper WITH the explicit zIndex the stacking-context
    trap demands. Everything a scene moves as a unit goes inside one of these. */
const Cam: React.FC<{ x?: number; y?: number; s?: number; z?: number; children: React.ReactNode }> =
  ({ x = 0, y = 0, s = 1, z = 30, children }) => (
  <div style={{ position: "absolute", inset: 0, zIndex: z,
    transform: `translate(${x}px, ${y}px) scale(${s})`, transformOrigin: "50% 62%" }}>
    {children}
  </div>
);

/* ================================================================== S0 ====
   0.00 -> 2.76s · 83f · THE ROLL-UP · HOOK · camera LOCKED.

   Mechanism: REVEAL BY REMOVAL. Forty feet of steel leaves the frame and what
   it was hiding is the claim. One dominant object at frame 0, an empty stage
   around it, and a physical event at 0.60s.

   ⛔ NOT A TOWER. Reel 93 shipped `HookTower` nine days ago; a second tower
      silhouette at frame 0 reads as a repost however different the mechanism.
   ⛔ NOT A GRID OF DESKS AT FRAME 0. A grid is a system and a system has no
      moment. The desks exist only as the CONSEQUENCE of the shutter.
   ⛔ NO TEXT IN THE OPEN (reel 93 v4). The header and the VO carry the claim;
      the frame carries the event.
   ⛔ FRAME 0 IS SETTLED — everything at rest, one beat before it goes. Anything
      that must read at f0 gets a negative delay, never an entrance.
   ------------------------------------------------------------------------ */
export const S0Hook: React.FC = () => {
  const f = useCurrentFrame();
  const w = WORLDS.kerb;
  /* ⛔ THREE SHOTS, HARD CUTS, CAMERA LOCKED IN EACH — docs/THE-OPEN.md. The
     first cut of this reel was ONE 83-frame shot and Alex's note was "there
     needs to be more pattern interrupt at the beginning". The doc already had
     the answer and the number: reel 78's first-five-seconds motion went 2.0 (one
     wide) -> 6.23 (three shots) -> 6.85 (four) with NO new elements, purely from
     recutting. Nothing below is new material; it is the same event, cut. */
  const CUT = [0, 22, 54];
  const shot = CUT.filter((c) => f >= c).length - 1;
  const lf = f - CUT[shot];
  const up = E(f, 22, 46, 0, 1, IO);                  // 620px of steel in 0.8s
  const lit = E(f, 30, 54, 0, 1, LIN);               // the room keeps waking to the cut

  /* ---- A · 0.00-0.73s · CLOSE ON THE SEAL. The four laws of frame 0:
       BRIGHT (a cream plate and two white mark tiles fill the middle of a dark
       frame) · THE SUBJECT IS IN IT (the real Claude mark, at 96px, plus a
       Claude at the strap) · RECOGNITION NOT MOTION (a Claude Code user reads
       that mark in well under a second, and recognition is what buys the next
       four) · MUTE-READABLE.
     ⛔ Alex: "we have to signal more to our target audience that this video is
        for them, Claude logos and stuff in the beginning especially." Frame 0
        now carries the official mark bigger than anything else in the panel. */
  if (shot === 0) {
    /* ⛔ THE STRAIN BUILDS. Round 1 held the plate on a flat 2.6px tick and the
       audit found a 15-frame dead run in a 22-frame shot — "settled at frame 0"
       means AT REST, not INERT. The amplitude climbs 1.2 -> 6.5px across the
       shot because the thing is about to go, which is also the story. */
    const load = E(lf, 0, 22, 1.2, 6.5, IN_Q);
    const strain = Math.sin(lf / 2.0) * load;
    /* ⛔ `bare` — NO STREET SURFACE. Alex: "there shouldn't be the black objects
       at the bottom." This is a CLOSE-UP of the steel, but the shared Surface was
       still painting its kerb bins and hydrants at z 84-85, over the shutter at
       z 20 and over the owner. A close-up is not the wide's world at a different
       scale; it gets its own frame. */
    return (
      <Scene w={w} slug="" stars={false} overhead={false} glow={hexa("#E0925A", 0.26)}
        push={[0, 22, 1.07]} bare>
        {/* the shutter, but CLOSE — slats at 2.2x so we are inches off the steel */}
        <div style={{ position: "absolute", inset: 0, zIndex: 20, background: "#4A4456" }} />
        {Array.from({ length: 12 }, (_, i) => (
          <div key={"sl" + i} style={{ position: "absolute", left: 0, right: 0, top: i * 70,
            height: 70, background: i % 2 ? "#5F5870" : "#565068", zIndex: 21 }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 11,
              background: "#746D86" }} />
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 11,
              background: "#3E3A4A" }} />
          </div>
        ))}
        {[46, 940].map((x) => Array.from({ length: 6 }, (_, i) => (
          <div key={`rv${x}-${i}`} style={{ position: "absolute", left: x, top: 44 + i * 132,
            width: 19, height: 19, borderRadius: 10, background: "#8A82A0", zIndex: 22 }} />
        )))}

        {/* THE SEAL PLATE — a centred three-element STACK.
            ⛔ Round 5: "270 agents is out of the frame." The first layout set the
            number beside the logo with `whiteSpace: nowrap`, and at 88px Fraunces
            "270 AGENTS" needs ~546px against 508px of room, so the S was clipped
            by the plate's own border. A nowrap line inside a fixed box is a
            SILENT overflow — measure the string against the box, or centre it in
            the FULL inner width, which is what this does. */}
        <div style={{ position: "absolute", left: 96, top: 158, width: 820, height: 376,
          zIndex: 40, transform: `translateY(${strain}px) rotate(${strain * 0.08}deg)` }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: 26, background: "#EDE7D6",
            border: "12px solid #B3A98F", boxShadow: SH_D }} />

          {/* ⭐ THE MARK SPINS AND RADIATES. Alex, round 5: "the Claude logo
              should be spinning and glowing to attract attention."
              ⚠️ [[feedback_reel_matte_palette]] bans `boxShadow: 0 0 Npx <colour>`
              bloom, so the glow is drawn the way an animation film draws one:
              SOLID painted rays and SOLID rings that rotate and pulse. Same read,
              no neon, and the palette self-check still returns 0. */}
          {Array.from({ length: 22 }, (_, i) => {
            const a0 = i * (360 / 22) + f * 1.1;
            const len = 26 + Math.sin(f / 6.5 + i * 1.1) * 9;
            /* ⛔ the pivot has to BE the tile centre. `transformOrigin: 50% 106px`
               put it 106px BELOW the ray, so the halo swept a circle centred on
               the headline instead of the mark and ticked across the type. A
               zero-size wrapper at the centre with the ray offset outward cannot
               get this wrong. */
            return (
              <div key={"ray" + i} style={{ position: "absolute", left: 410, top: 112,
                width: 0, height: 0, transform: `rotate(${a0}deg)` }}>
                <div style={{ position: "absolute", left: -4, top: -(102 + len),
                  width: 8, height: len, borderRadius: 4, background: "#E0BE96" }} />
              </div>
            );
          })}
          {[0, 1, 2].map((i) => {
            const ph = ((f + i * 15) % 45) / 45;
            const d = 196 + ph * 112;
            return (
              <div key={"ring" + i} style={{ position: "absolute", left: 410 - d / 2,
                top: 112 - d / 2, width: d, height: d, borderRadius: "50%",
                border: `${Math.max(1, 6 - ph * 5)}px solid #D9BC9C`,
                opacity: 0.8 - ph * 0.8 }} />
            );
          })}
          <div style={{ position: "absolute", left: 324, top: 26, width: 172, height: 172,
            borderRadius: 38, background: "#FFFFFF", display: "flex", alignItems: "center",
            justifyContent: "center", boxShadow: SH,
            transform: `scale(${1 + Math.sin(f / 9) * 0.04})` }}>
            <Img src={staticFile("claude_logo.png")}
              style={{ width: 126, height: 126, objectFit: "contain",
                transform: `rotate(${f * 1.7}deg)` }} />
          </div>

          <div style={{ position: "absolute", left: 0, right: 0, top: 216, textAlign: "center",
            fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 88, lineHeight: 1,
            color: "#241E12" }}>270 AGENTS</div>
          <div style={{ position: "absolute", left: 0, right: 0, top: 312, textAlign: "center",
            fontFamily: MONO, fontWeight: 900, fontSize: 27, letterSpacing: "0.20em",
            color: "#6E6450" }}>17 DIVISIONS</div>
        </div>

        {/* the GitHub credit hangs UNDER the plate, so it cannot crowd the stack */}
        <div style={{ position: "absolute", left: 372, top: 556, zIndex: 41,
          display: "flex", alignItems: "center", gap: 14,
          transform: `translateY(${strain * 0.8}px)` }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: "#FFFFFF",
            display: "flex", alignItems: "center", justifyContent: "center", boxShadow: SH }}>
            <Img src={staticFile("logos/github.svg")}
              style={{ width: 38, height: 38, objectFit: "contain" }} />
          </div>
          <div style={{ fontFamily: MONO, fontWeight: 900, fontSize: 34, letterSpacing: "0.20em",
            color: "#C9C2B2" }}>SEALED</div>
        </div>

        {/* the two hasps holding it shut, straining WITH the plate */}
        {[264, 672].map((hx) => (
          <div key={hx} style={{ position: "absolute", left: hx, top: 122, width: 78, height: 92,
            borderRadius: "39px 39px 0 0", border: "20px solid #9A93AC", borderBottom: "none",
            zIndex: 41, transform: `translateY(${strain * 0.7}px)` }} />
        ))}

        {/* the owner in the NEAR foreground, cropped by the bottom edge, one hand
            up on the plate. Big enough to read as a character, not a chip. */}
        <Claudie x={190} y={930} s={1.9} z={62} f={f} hero costume={{ constr: 1, cheer: 0.35 }} />
        <Cone f={f} x={230} y={-40} top={120} bot={520} len={520} c="#E0925A" o={0.24} z={30} />
        {/* rust and paint flaking off the loaded plate, all through the shot */}
        {Array.from({ length: 16 }, (_, i) => {
          const r = (k: number) => { const v = Math.sin(i * 41.3 + k * 7.9) * 4371.7; return v - Math.floor(v); };
          const k = lf - i * 1.1;
          if (k < 0) return null;
          return (
            <div key={"fk" + i} style={{ position: "absolute", left: 120 + r(1) * 780,
              top: 546 + ((k * (2.4 + r(2) * 3.6)) % 260), width: 5 + (i % 2) * 2,
              height: 5, background: "#B3A98F", opacity: 0.7, zIndex: 50 }} />
          );
        })}
      </Scene>
    );
  }

  /* ---- B · 0.73-1.80s · HARD CUT TO THE WIDE, and the seal goes ON THE CUT.
       A big event landing on a cut is a bigger interrupt than the same event
       watched from one angle. */
  if (shot === 1) {
    return (
      <Scene w={w} slug="" stars={false} overhead={false} glow={hexa("#E0925A", 0.24)}
        push={[0, 54, 1.12]}>
        <Facade />
        <Workroom f={f} lit={lit} z={30} />
        <Shutter up={up} f={f} z={40} />
        <SealBurst k={lf} z={48} />
        {/* the lit sign over the door: the mark, so the wide still says CLAUDE */}
        <ClaudeSign lf={lf} />
        <StreetLamp x={26} y={646} h={392} c="#E0925A" z={86} />
        <Cone f={f} x={122} y={300} top={70} bot={330} len={356} c="#E0925A" o={0.28} z={20} />
        {/* he steps toward the opening across the back half of the shot — the
            last thing still moving once the steel is clear */}
        <Claudie x={196 + E(lf, 14, 32, 0, 118, IO)} y={676 + E(lf, 14, 32, 0, 26, IO)}
          s={0.95 + E(lf, 14, 32, 0, 0.18, IO)} z={62} f={f} hero walk={lf > 14 && lf < 32 ? 1 : 0}
          costume={{ constr: 1, shock: lf < 12 ? 0.8 : 0, cheer: lf > 16 ? 0.5 : 0 }} />
        <Contact x={128 + E(lf, 14, 32, 0, 118, IO)} y={666 + E(lf, 14, 32, 0, 26, IO)}
          w={150} z={61} o={0.40} />
        <Dust f={lf} />
        <Occluder side="r" c="#231D2A" w={104} z={92} />
      </Scene>
    );
  }

  /* ---- C · 1.80-2.77s · HARD CUT IN CLOSE. The consequence, and the audience
       signal: every one of them is a CLAUDE, they have division plates, the mark
       is on every screen, and two walk out past the lens. ⛔ This is a DIFFERENT
       FRAMING of the same room, never the same wide shot twice. */
  return (
    <Scene w={w} slug="" stars={false} overhead={false} glow={hexa("#E0925A", 0.24)}
      push={[0, 29, 1.09]} bare>
      {/* the room, close: back wall, a lit ceiling, a floor */}
      <div style={{ position: "absolute", inset: 0, zIndex: 20,
        background: "linear-gradient(178deg,#5A4A6C 0%,#2E2440 100%)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 96, zIndex: 21,
        background: "#453759" }} />
      {/* ⛔ a wall and a floor line is a DIAGRAM, not a place. Pinboards, a shelf
          of binders and a wall clock take this to the density floor. */}
      {[96, 428, 760].map((x, i) => (
        <div key={"pb" + x} style={{ position: "absolute", left: x, top: 128, width: 156,
          height: 116, background: "#7A6690", border: "6px solid #4E3F66", zIndex: 26 }}>
          {[0, 1, 2, 3].map((k) => (
            <div key={k} style={{ position: "absolute", left: 12 + (k % 2) * 66,
              top: 12 + Math.floor(k / 2) * 50, width: 54, height: 38,
              background: ["#EFE7D6", "#E7B24C", "#EFE7D6", "#8FC0A6"][(k + i) % 4] }} />
          ))}
        </div>
      ))}
      <div style={{ position: "absolute", left: 286, top: 148, width: 76, height: 76,
        borderRadius: 40, background: "#EDE4D2", border: "7px solid #4E3F66", zIndex: 26 }}>
        <div style={{ position: "absolute", left: 30, top: 14, width: 6, height: 26,
          background: "#3A2F4E" }} />
        <div style={{ position: "absolute", left: 32, top: 32, width: 22, height: 6,
          background: "#3A2F4E" }} />
      </div>
      {[606, 706].map((x, i) => (
        <div key={"sh" + x} style={{ position: "absolute", left: x, top: 176, width: 92, height: 68,
          zIndex: 26 }}>
          <div style={{ position: "absolute", left: 0, top: 62, width: 92, height: 8,
            background: "#5E4B78" }} />
          {[0, 1, 2, 3, 4].map((k) => (
            <div key={k} style={{ position: "absolute", left: 6 + k * 17, top: 62 - (30 + (k % 3) * 12),
              width: 13, height: 30 + (k % 3) * 12,
              background: ["#B85C42", "#C79A46", "#4E7F66", "#8A6E52", "#7A5A8E"][(k + i) % 5] }} />
          ))}
        </div>
      ))}
      {[120, 380, 640, 900].map((x) => (
        <div key={"cp" + x} style={{ position: "absolute", left: x, top: 0, zIndex: 22 }}>
          <div style={{ position: "absolute", left: 34, top: 0, width: 6, height: 46,
            background: "#3D3450" }} />
          <div style={{ position: "absolute", left: 0, top: 46, width: 76, height: 22,
            borderRadius: "0 0 38px 38px", background: "#6A5A84" }} />
          <div style={{ position: "absolute", left: 14, top: 64, width: 48, height: 10,
            borderRadius: 5, background: "#F0C979" }} />
        </div>
      ))}
      <div style={{ position: "absolute", left: 0, right: 0, top: 560, bottom: 0, zIndex: 23,
        background: "linear-gradient(184deg,#6A5680 0%,#3A2C4E 100%)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 552, height: 12, zIndex: 24,
        background: "#8A72A6" }} />
      {Array.from({ length: 7 }, (_, i) => (
        <div key={"fb" + i} style={{ position: "absolute", left: 0, right: 0,
          top: 596 + i * (26 + i * 10), height: 3, background: "#5A4478", zIndex: 25 }} />
      ))}

      {/* three desks across the frame, one CLAUDE at each, the mark on the screen */}
      {([["ENGINEERING", 176], ["DESIGN", 506], ["MARKETING", 836]] as const).map(([name, x], i) => (
        <React.Fragment key={name}>
          <div style={{ position: "absolute", left: x - 152, top: 470, width: 304, height: 28,
            background: "#8A6E52", zIndex: 46 }} />
          <div style={{ position: "absolute", left: x - 152, top: 498, width: 304, height: 9,
            background: "#6B5540", zIndex: 46 }} />
          <div style={{ position: "absolute", left: x - 128, top: 507, width: 20, height: 76,
            background: "#5E4B38", zIndex: 45 }} />
          <div style={{ position: "absolute", left: x + 108, top: 507, width: 20, height: 76,
            background: "#5E4B38", zIndex: 45 }} />
          {/* the monitor, carrying the official mark, standing ON the desk */}
          <div style={{ position: "absolute", left: x + 6, top: 342, width: 146, height: 114,
            borderRadius: 8, background: "#2A2436", border: "7px solid #6A5A84", zIndex: 47 }}>
            <div style={{ position: "absolute", inset: 6, background: "#F6E7BE",
              display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Img src={staticFile("claude_logo.png")}
                style={{ width: 58, height: 58, objectFit: "contain" }} />
            </div>
          </div>
          <div style={{ position: "absolute", left: x + 42, top: 456, width: 74, height: 16,
            background: "#4A3F5C", zIndex: 47 }} />
          {/* SEATED: the torso and head clear the desk line, the rest is behind it */}
          <Claudie x={x - 70} y={528} s={1.10} z={44} f={f + i * 11} tint={CLAY}
            costume={{ glasses: i === 1 ? 1 : 0, constr: i === 0 ? 1 : 0 }} />
          <div style={{ position: "absolute", left: x - 24, top: 282, width: 196, height: 38,
            borderRadius: 8, background: "#1C1526", border: "3px solid #8A72A6", zIndex: 52,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: MONO, fontWeight: 900, fontSize: 18, letterSpacing: "0.10em",
            color: "#F2DCA8" }}>{name}</div>
        </React.Fragment>
      ))}

      {/* two walk OUT past the lens, into the near foreground */}
      {[0, 1].map((i) => {
        const t0 = 1 + i * 7;
        const pw = E(f - CUT[2], t0, t0 + 30, 0, 1, LIN);
        if (pw <= 0) return null;
        return (
          <Claudie key={"o" + i} x={470 + pw * (i ? 560 : -540)} y={636 + pw * 268}
            s={0.72 + pw * 1.10} z={70 + i} f={f} walk={1} tint={CLAY}
            prop={(["board", "case"] as const)[i]} face={i ? 1 : -1} />
        );
      })}
      <Occluder side="l" c="#2A2038" w={72} z={92} />
    </Scene>
  );
};

/** the brick face the shutter is set into — shared by shots B and C so the two
    cuts are the same PLACE from two framings, never two places. */
const Facade: React.FC = () => (<>
  <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 618, zIndex: 26,
    background: "linear-gradient(178deg,#4A3E48 0%,#2E2632 100%)" }} />
  {Array.from({ length: 16 }, (_, i) => (
    <div key={"br" + i} style={{ position: "absolute", left: 0, right: 0, top: 22 + i * 38,
      height: 2, background: "#3A303A", zIndex: 27 }} />
  ))}
  <div style={{ position: "absolute", left: 0, right: 0, top: 92, height: 26, zIndex: 28,
    background: "#5A4A54" }} />
  <div style={{ position: "absolute", left: 0, top: 92, width: 62, height: 526, zIndex: 29,
    background: "#54464F" }} />
  <div style={{ position: "absolute", right: 0, top: 92, width: 62, height: 526, zIndex: 29,
    background: "#54464F" }} />
  <div style={{ position: "absolute", left: 84, top: 128, width: 844, height: 470, zIndex: 29,
    background: "#120E1A" }} />
</>);

/** the lit fascia sign over the door. ⛔ It exists so the WIDE still says CLAUDE
    — the audience signal cannot live only in the close-up. */
const ClaudeSign: React.FC<{ lf: number }> = ({ lf }) => {
  const on = E(lf, 8, 20, 0, 1, OUT);
  return (
    <div style={{ position: "absolute", left: 292, top: 20, width: 428, height: 68, zIndex: 44,
      opacity: 0.55 + on * 0.45 }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 12,
        background: on > 0.5 ? "#2E2436" : "#241C2C", border: "4px solid #6A5A84",
        boxShadow: SH_D }} />
      <div style={{ position: "absolute", left: 14, top: 10, width: 46, height: 46,
        borderRadius: 11, background: "#FFFFFF", display: "flex", alignItems: "center",
        justifyContent: "center" }}>
        <Img src={staticFile("claude_logo.png")}
          style={{ width: 32, height: 32, objectFit: "contain" }} />
      </div>
      <div style={{ position: "absolute", left: 74, top: 16, fontFamily: fraunces.fontFamily,
        fontWeight: 900, fontSize: 34, lineHeight: 1, color: on > 0.5 ? "#F4E8CC" : "#5A4C6E" }}>
        AGENTS FOR CLAUDE CODE
      </div>
    </div>
  );
};

/** dust through the sodium cone once the steel has gone */
const Dust: React.FC<{ f: number }> = ({ f }) => (<>
  {f > 6 && Array.from({ length: 22 }, (_, i) => {
    const r = (k: number) => { const v = Math.sin(i * 29.7 + k * 11.1) * 4371.7; return v - Math.floor(v); };
    const k = f - 6 - i * 1.4;
    if (k < 0) return null;
    return (
      <div key={"dt" + i} style={{ position: "absolute", left: 120 + r(1) * 780,
        top: 150 + ((k * (1.6 + r(2) * 2.4)) % 460), width: 4, height: 4, borderRadius: 2,
        background: "#D8B489", opacity: 0.55, zIndex: 70 }} />
    );
  })}
</>);

/* ================================================================== S1 ====
   2.76 -> 5.95s · 96f · THE FOREFRONT · SETUP · TILT UP.
   Mechanism: A NUMBER THAT ARRIVES. ⛔ The count is never typeset at its value
   — 38 stars fly in on staggered arcs and the digits roll on the same curve.
   ------------------------------------------------------------------------ */
export const S1Front: React.FC = () => {
  const f = useCurrentFrame();
  const w = useWorld("forefront");
  const tilt = E(f, 0, 96, -148, 16, LIN);            // the motivated move, ALL 96 frames
  const on = Math.max(0, Math.min(10, Math.floor((f - 5) / 3)));
  const nP = E(f, 20, 74, 0, 1, OUT);
  const n = Math.round(139604 * nP).toLocaleString();
  const hit = E(f, 74, 82, 1, 0, OUT);
  return (
    <Scene w={w} slug="msitarzewski / agency-agents" push={[0, 96, 1.07]}>
      <Cam y={tilt} z={30}>
        {/* the tower face, cropped by the top of frame */}
        <div style={{ position: "absolute", left: 118, top: -230, width: 780, height: 690,
          background: "linear-gradient(96deg,#31446C 0%,#1F2C48 100%)", zIndex: 30, boxShadow: SH_D }} />
        {Array.from({ length: 8 * 9 }, (_, i) => {
          const cx = i % 8, cy = Math.floor(i / 8);
          const q = Math.sin(i * 19.7) * 4371.7;
          const litW = (q - Math.floor(q)) < 0.42;
          return (
            <div key={"fw" + i} style={{ position: "absolute", left: 146 + cx * 92,
              top: -208 + cy * 54, width: 64, height: 30,
              background: litW ? "#D9B978" : "#26355A", zIndex: 31 }} />
          );
        })}
        {/* the canopy over the doors */}
        <div style={{ position: "absolute", left: 96, top: 442, width: 824, height: 34,
          borderRadius: 8, background: "#3A2F22", zIndex: 34, boxShadow: SH }} />
        {Array.from({ length: 14 }, (_, i) => (
          <div key={"cb" + i} style={{ position: "absolute", left: 116 + i * 58, top: 480,
            width: 12, height: 12, borderRadius: 6, background: on > 0 ? "#F2D28A" : "#4A4356",
            zIndex: 35 }} />
        ))}
        {/* the doors */}
        <div style={{ position: "absolute", left: 372, top: 476, width: 268, height: 176,
          background: "#1A2338", border: "6px solid #3C4C74", zIndex: 33 }} />
        <div style={{ position: "absolute", left: 506, top: 476, width: 5, height: 176,
          background: "#3C4C74", zIndex: 34 }} />
        {/* THE MARQUEE */}
        <Marquee x={192} y={318} text="THE AGENCY" on={on} f={f} s={1.42} z={60} />
      </Cam>

      {/* ⛔ THE ARC. The count lands at f74 and the last 22 frames were dead.
          The doors open and three of the staff come out under the marquee. */}
      {Array.from({ length: 3 }, (_, i) => {
        const t0 = 62 + i * 8;
        const pw = E(f, t0, t0 + 34, 0, 1, LIN);
        if (pw <= 0) return null;
        return (
          <Claudie key={"dr" + i} x={470 + pw * (i === 1 ? 300 : i === 0 ? -290 : 190)}
            y={654 + tilt * 0.5 + pw * 52} s={0.40 + pw * 0.30} z={54 + i}
            f={f} walk={1} tint={CLAY} prop={(["case", "board", "none"] as const)[i]}
            face={i === 0 ? -1 : 1} />
        );
      })}

      {/* the stars arriving, and the counter they land in */}
      <StarStream k={f - 14} tx={318} ty={606} n={44} z={66} />
      <Counter x={282} y={556} v={n} label="STARS ON GITHUB" f={f} s={0.98} z={70} hit={hit} />
      {f > 78 && (<>
        <Plaque x={286} y={716} t="22,798" hot="FORKS" s={0.82} z={72} />
        <Plaque x={470} y={716} t="MIT" hot="LICENCE" s={0.82} z={72} />
      </>)}

      <StreetLamp x={924} y={700} h={300} c="#E7B24C" z={86} flip />
      <Occluder side="l" c="#141C30" w={92} z={92} />
    </Scene>
  );
};

/* ================================================================== S2 ====
   5.95 -> 7.98s · 60f · THE PLAZA · ESCALATE · camera LOCKED WIDE.
   Mechanism: ONE TRAVELLING LIGHT. At any instant exactly one thing moves, and
   the lit set beneath it is the score. ⛔ A ladder, never a wall — the lit/unlit
   boundary is the hierarchy, and a flat grid of N equal cards has none.
   ------------------------------------------------------------------------ */
export const S2Roster: React.FC = () => {
  const f = useCurrentFrame();
  const w = useWorld("plaza");
  const car = E(f, 2, 56, 0, 1, IO);
  const n = Math.round(270 * car);
  return (
    <Scene w={w} slug="ENGINEERING TO HEALTHCARE" litFar={0.22} push={[0, 60, 1.06]}>
      <Tower x={92} y={612} h={434} w={214} car={car} f={f} z={40} body="#245063" body2="#16333F" />
      {/* the reflection: the whole thing again, upside down, in the flooded plaza */}
      <div style={{ position: "absolute", left: 92, top: 616, width: 214, height: 142, zIndex: 22,
        background: "linear-gradient(178deg,#1D4457 0%,#122C38 100%)", opacity: 0.62,
        transform: "scaleY(-1)", transformOrigin: "50% 0%" }} />
      <div style={{ position: "absolute", left: 258, top: 620 + (1 - car) * 128, width: 38, height: 24,
        background: "#B7D9CE", opacity: 0.5, zIndex: 23 }} />
      {Array.from({ length: 7 }, (_, i) => (
        <div key={"rp" + i} style={{ position: "absolute", left: 120, right: 120,
          top: 540 + i * 26 + Math.sin(f / 13 + i) * 2, height: 3,
          background: "#2E6274", opacity: 0.5, zIndex: 24 }} />
      ))}
      {/* the counter, climbing with the car */}
      <Glass x={640} y={188} w={318} h={176} label="ROSTER" c="#7FC0C9" f={f} z={70}>
        <BigNum x={24} y={50} v={String(n)} c="#F2E4C0" size={92} z={4} />
        <div style={{ position: "absolute", left: 26, top: 140, fontFamily: MONO, fontWeight: 800,
          fontSize: 16, letterSpacing: "0.16em", color: "#8FA6AE" }}>SPECIALIST AGENTS</div>
        <div style={{ position: "absolute", right: 22, top: 56, width: 14, height: 96,
          background: "#1B2733" }} />
        <div style={{ position: "absolute", right: 22, top: 56 + (1 - car) * 96, width: 14,
          height: car * 96, background: "#7FC0C9" }} />
      </Glass>
      {/* ⛔ THE ARC. One climbing car is the hierarchy but it is only 168px of
          travel in 60 frames. A TRAM crosses the whole plaza left to right —
          1240px, continuous, in front of everything, and it never competes for
          rank because it is a silhouette. */}
      {(() => {
        const tx = -300 + (f / 60) * 1420;
        return (
          <div style={{ position: "absolute", left: tx, top: 596, width: 300, height: 116,
            zIndex: 86 }}>
            <div style={{ position: "absolute", left: 0, top: 18, width: 300, height: 74,
              borderRadius: "16px 22px 6px 6px", background: "#0B1B23" }} />
            <div style={{ position: "absolute", left: 0, top: 4, width: 264, height: 20,
              borderRadius: "12px 12px 0 0", background: "#0B1B23" }} />
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} style={{ position: "absolute", left: 18 + i * 55, top: 30, width: 46,
                height: 38, background: "#E8F0DC" }} />
            ))}
            <div style={{ position: "absolute", left: 286, top: 44, width: 22, height: 12,
              borderRadius: 5, background: "#EFE3B8" }} />
            <div style={{ position: "absolute", left: 40, top: 88, width: 34, height: 34,
              borderRadius: 18, background: "#050E13" }} />
            <div style={{ position: "absolute", left: 224, top: 88, width: 34, height: 34,
              borderRadius: 18, background: "#050E13" }} />
            {/* the wire it runs under, and the pole that touches it */}
            <div style={{ position: "absolute", left: 130, top: -34, width: 6, height: 40,
              background: "#0B1B23", transform: "rotate(14deg)" }} />
          </div>
        );
      })()}

      {/* plaza furniture: benches and lamp posts as foreground silhouettes */}
      <StreetLamp x={340} y={738} h={196} c="#CBEAE4" z={84} />
      <Claudie x={420} y={742} s={0.46} z={85} f={f} tint={CLAY} walk={0.4} />
      <Claudie x={524} y={746} s={0.40} z={85} f={f} tint={CLAY} face={-1} />
      <Occluder side="l" c="#0B1B23" w={86} z={92} kind="pole" />
    </Scene>
  );
};

/* ================================================================== S3 ====
   7.98 -> 10.11s · 64f · AGENCY ROW · ESCALATE · LATERAL TRUCK.
   Mechanism: ENTRY INTO FRAME. ⛔ ONE CONTINUOUS SHOT. The three trades land
   0.77s and 0.50s apart; cutting on them would put a 15-frame shot in the reel,
   which reads as channel-hopping. Each shopfront ignites as it enters, at its
   own MEASURED onset, and the truck itself is the biggest motion in the reel.
   ------------------------------------------------------------------------ */
export const S3Row: React.FC = () => {
  const f = useCurrentFrame();
  const w = useWorld("row");
  const cam = -f * 18.4;                       // 1178px of world across 64 frames
  const A = E(f, 0, 9, 0, 1, OUT);             // 7.98s  front end designers
  const B = E(f, 23, 32, 0, 1, OUT);           // 8.73s  ad writers
  const C = E(f, 38, 47, 0, 1, OUT);           // 9.23s  reddit community
  return (
    <Scene w={w} slug="EVERY TRADE HAS A SHOP"
      t={-cam * 0.5} litFar={0.30}>
      {/* the row itself, moving as one body */}
      <Cam x={cam} z={30}>
        <Shopfront x={20} y={668} w={430} h={512} on={A} name="STUDIO" accent="#8E7BB8"
          f={f} kind="studio" z={40} />
        <Shopfront x={520} y={668} w={430} h={512} on={B} name="COPY DESK" accent="#E7B24C"
          f={f - 23} kind="copy" z={40} />
        <Billboard x={560} y={26} w={356} h={126} flip={B} accent="#E7B24C" z={46} />
        <Shopfront x={1020} y={668} w={430} h={512} on={C} name="THE CORNER" accent="#D2724E"
          f={f - 38} kind="corner" z={40} logo="reddit.svg" />

        {/* ⛔ ONE GIANT COSTUMED CLAUDE PER SHOP. Alex, round 4: "I want to see
            like a giant Claude sprite too representing each with the right
            outfit." The costume IS the trade, which is also the cheapest way to
            say "specialist" without a word of type:
              STUDIO      -> glasses   the designer
              COPY DESK   -> suit      the ad writer
              THE CORNER  -> wizard    and the VO literally says "Reddit
                                       community WIZARDS", so the hat is a
                                       direct hit on the spoken word
            Each ARRIVES on its own shop's measured onset — they are events, not
            scenery, and at ~340px they are the biggest thing on the street. */}
        {([[352, A, 0, { glasses: 1 }, "swatch"],
           [852, B, 23, { suit: 1 }, "roll"],
           [1352, C, 38, { wizard: 1 }, "mega"]] as const).map(([gx, on, t0, cos, pr], i) => {
          const pop = E(f, t0, t0 + 14, 0, 1, BACK);
          if (pop <= 0.01) return null;
          return (
            <React.Fragment key={"gc" + gx}>
              <Contact x={gx - 96} y={676} w={192} z={49} o={0.34} />
              <div style={{ position: "absolute", left: 0, top: 0, zIndex: 50,
                transform: `translateY(${(1 - pop) * 96}px)`, opacity: pop }}>
                <Claudie x={gx} y={690} s={1.82} z={50} f={f - t0 * 0.5}
                  costume={cos as any} prop={pr as any}
                  propC={["#8E7BB8", "#E7B24C", "#D2724E"][i]} face={i === 1 ? -1 : 1} />
              </div>
            </React.Fragment>
          );
        })}
        <Shopfront x={1520} y={668} w={400} h={512} on={0} name="TO LET" accent="#6B5A8E"
          f={f} kind="studio" z={40} />
        {/* the kerb the shops sit on */}
        <div style={{ position: "absolute", left: -200, top: 668, width: 2600, height: 18,
          background: "#6B5C7A", zIndex: 42 }} />
      </Cam>
      {/* three street lamps, also on the truck but at their own parallax */}
      <Cam x={cam * 1.24} z={80}>
        {[236, 756, 1276, 1796].map((x) => (
          <StreetLamp key={x} x={x} y={676} h={330} c="#E9C6A2" z={80} />
        ))}
      </Cam>
      {/* the foreground rank: parked cars wiping past at 2.2x, which is what
          makes this a TRUCK and not a pan */}
      <Cam x={cam * 2.2} z={88}>
        {[0, 520, 1040, 1560, 2080].map((x, i) => (
          <div key={"car" + x} style={{ position: "absolute", left: x, top: 622, width: 392,
            height: 130, zIndex: 88 }}>
            <div style={{ position: "absolute", left: 0, top: 34, width: 392, height: 76,
              borderRadius: "22px 26px 10px 10px", background: ["#3A2E42", "#42324A", "#332840"][i % 3] }} />
            <div style={{ position: "absolute", left: 86, top: 0, width: 208, height: 48,
              borderRadius: "26px 26px 0 0", background: ["#3A2E42", "#42324A", "#332840"][i % 3] }} />
            <div style={{ position: "absolute", left: 100, top: 10, width: 78, height: 32,
              borderRadius: "14px 4px 0 0", background: "#5B4A66" }} />
            <div style={{ position: "absolute", left: 190, top: 10, width: 90, height: 32,
              borderRadius: "4px 14px 0 0", background: "#5B4A66" }} />
            <div style={{ position: "absolute", left: 4, top: 52, width: 26, height: 14,
              borderRadius: 5, background: "#E9C6A2" }} />
            <div style={{ position: "absolute", left: 358, top: 52, width: 26, height: 14,
              borderRadius: 5, background: "#C4573E" }} />
            <div style={{ position: "absolute", left: 52, top: 92, width: 62, height: 62,
              borderRadius: 32, background: "#120E18" }} />
            <div style={{ position: "absolute", left: 268, top: 92, width: 62, height: 62,
              borderRadius: 32, background: "#120E18" }} />
          </div>
        ))}
      </Cam>
    </Scene>
  );
};

/* ================================================================== S4 ====
   10.11 -> 12.40s · 69f · THE BACK LOT · ESCALATE · SLOW DOLLY IN.
   Mechanism: DOORS OPENING IN SEQUENCE. Personality = three different bodies
   with three different props. Process = the written method unrolling in front
   of each and ticking itself green. Two nouns in the VO, two pictures.
   ------------------------------------------------------------------------ */
export const S4Crew: React.FC = () => {
  const f = useCurrentFrame();
  const w = useWorld("backlot");
  const push = E(f, 0, 69, 1, 1.07, LIN);
  /* ⛔ THE COSTUME IS THE TRADE. Alex, round 4: "the Claude sprites at 12 seconds
     each need their proper outfit." Same three costumes as the storefronts at 8s,
     deliberately — the viewer met the designer, the ad writer and the wizard on
     the row, and these are the SAME three characters at their trailers. */
  const CREW: [number, number, string, string, "swatch" | "roll" | "mega", number,
               Record<string, number>][] = [
    [16, 0.80, "UI DESIGNER", "#8E7BB8", "swatch", 8, { glasses: 1 }],
    [318, 0.94, "AD CREATIVE", "#E7B24C", "roll", 24, { suit: 1 }],
    [634, 1.08, "REDDIT BUILDER", "#D2724E", "mega", 40, { wizard: 1 }],
  ];
  return (
    <Scene w={w} slug="230+ AGENTS, EACH ONE WRITTEN BY HAND" litFar={0.16}>
      <Cam s={push} z={30}>
        {/* chain link along the back of the lot */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 386, height: 96, zIndex: 20,
          background: "repeating-linear-gradient(58deg, #5A4E34 0 2px, transparent 2px 15px), repeating-linear-gradient(-58deg, #5A4E34 0 2px, transparent 2px 15px)" }} />
        {[40, 300, 560, 820].map((x) => (
          <div key={"po" + x} style={{ position: "absolute", left: x, top: 372, width: 9, height: 112,
            background: "#6E5C3A", zIndex: 21 }} />
        ))}
        {/* the generator that powers the row */}
        <div style={{ position: "absolute", left: 880, top: 470, width: 108, height: 78,
          borderRadius: 8, background: "#5E4E30", zIndex: 30, boxShadow: SH }} />
        <div style={{ position: "absolute", left: 896, top: 452, width: 22, height: 22,
          borderRadius: 4, background: "#4A3D24", zIndex: 30 }} />

        {CREW.map(([x, s, name, accent, prop, t0, cos], i) => {
          const open = E(f, t0, t0 + 13, 0, 1, BACK);
          const step = E(f, t0 + 6, t0 + 20, 0, 1, OUT);
          const roll = E(f, t0 + 10, t0 + 26, 0, 1, OUT);
          const ticks = Math.max(0, Math.min(5, Math.floor((f - t0 - 16) / 4)));
          return (
            <React.Fragment key={name}>
              <Trailer x={x} y={548 + i * 6} s={s} z={38 + i * 4} name={name} accent={accent}
                open={open} f={f} />
              {/* the character who steps out — a silhouette, so the owner still ranks */}
              {step > 0.02 && (
                <Claudie x={x + 96 * s} y={548 + i * 6} s={s * 0.92} z={44 + i * 4}
                  f={f} walk={step < 1 ? 1 : 0.16} prop={prop} tint={CLAY}
                  costume={cos} propC={accent} />
              )}
              <Checklist x={x + 150 * s} y={540 + i * 6} open={roll} ticks={ticks} accent={accent}
                s={s * 0.9} z={60 + i * 2} />
              {/* the work lamp on its stand that lights this trailer */}
              <div style={{ position: "absolute", left: x + 268 * s, top: 400, width: 7, height: 150,
                background: "#4A3D24", zIndex: 36 }} />
              <div style={{ position: "absolute", left: x + 252 * s, top: 380, width: 42, height: 24,
                borderRadius: "12px 12px 0 0", background: "#6E5C3A", zIndex: 36 }} />
              <Cone f={f} x={x + 272 * s} y={402} top={40} bot={210} len={190} c="#F0C979" o={0.24}
                z={35} sway={0.4} />
            </React.Fragment>
          );
        })}
      </Cam>
      <Occluder side="r" c="#2A2216" w={96} z={92} />
    </Scene>
  );
};

/* ================================================================== S5 ====
   12.40 -> 14.20s · 54f · THE KERB · TURN · camera LOCKED LOW.
   Mechanism: A PHYSICAL CONNECTION. The whole beat is one object travelling
   300px and SEATING. ⛔ Every feature the VO names needs a picture of its
   OUTPUT — so the terminal actually prints the agent files.
   ------------------------------------------------------------------------ */
export const S5Plug: React.FC = () => {
  const f = useCurrentFrame();
  const w = useWorld("kerbside");
  const seat = E(f, 0, 18, 0, 1, OUT);
  const lines = Math.max(0, Math.min(8, Math.floor((f - 20) / 3.6)));
  const done = f >= 50;
  return (
    <Scene w={w} slug="./scripts/install.sh --tool claude-code" litFar={0.24} slugC="#8FC4AC"
      push={[0, 54, 1.08]}>
      {/* the building base the trunk line comes out of */}
      <div style={{ position: "absolute", left: -40, top: 20, width: 268, height: 610, zIndex: 26,
        background: "linear-gradient(96deg,#2C3D48 0%,#1B2830 100%)", boxShadow: SH_D }} />
      <div style={{ position: "absolute", left: 74, top: 434, width: 112, height: 196, zIndex: 27,
        background: "#101A21", border: "6px solid #3A4E5A" }} />
      {Array.from({ length: 6 }, (_, i) => (
        <div key={"bs" + i} style={{ position: "absolute", left: -20, top: 54 + i * 58,
          height: 30, background: i % 2 ? "#3A4E5A" : "#44606E", zIndex: 27, width: 218 }} />
      ))}
      <div style={{ position: "absolute", left: -40, top: 610, width: 268, height: 24, zIndex: 28,
        background: "#5A7684" }} />
      <TrunkLine seat={seat} f={f} z={66} />
      <Kerbtop x={500} y={766} lines={lines} done={done} f={f} s={1} z={60} />
      <Contact x={484} y={770} w={490} z={58} o={0.42} />
      {/* the owner, crouched at the kerb watching it land */}
      <div style={{ position: "absolute", left: 206, top: 508, zIndex: 62 }}>
        <Mascot lf={f} size={150} gaze={-1.4} cheer={done ? 0.8 : 0.15}
          shock={f > 16 && f < 28 ? 0.6 : 0} glasses={1} />
      </div>
      <Contact x={210} y={654} w={144} z={61} o={0.30} />
      {/* ⛔ THE ARC. The plug seats at f18 and the terminal finishes at f50; the
          gap between them measured as a dead run. A night bus crosses the road
          behind for the whole 54 frames — 1300px of continuous travel that is
          entirely subordinate (dark, small, at the horizon). */}
      {(() => {
        const bx = 1100 - (f / 54) * 1360;
        return (
          <div style={{ position: "absolute", left: bx, top: 388, width: 262, height: 96,
            zIndex: 30 }}>
            <div style={{ position: "absolute", left: 0, top: 10, width: 262, height: 66,
              borderRadius: "14px 8px 4px 4px", background: "#1B2932" }} />
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} style={{ position: "absolute", left: 16 + i * 48, top: 24, width: 34,
                height: 24, background: "#7EA79C" }} />
            ))}
            <div style={{ position: "absolute", left: -4, top: 44, width: 20, height: 10,
              borderRadius: 4, background: "#EFE3B8" }} />
            <div style={{ position: "absolute", left: 32, top: 72, width: 28, height: 28,
              borderRadius: 15, background: "#0D151B" }} />
            <div style={{ position: "absolute", left: 196, top: 72, width: 28, height: 28,
              borderRadius: 15, background: "#0D151B" }} />
          </div>
        );
      })()}

      {/* the green wash the screen throws on wet stone, as a SOLID painted patch */}
      <div style={{ position: "absolute", left: 440, top: 756, width: 560, height: 70,
        borderRadius: "50%", background: mix("#2A3740", 0.14), zIndex: 18 }} />
      
    </Scene>
  );
};

/* ================================================================== S6 ====
   14.20 -> 16.64s · 73f · YOUR DRIVEWAY · PAYOFF-1 · SLOW PUSH.
   Mechanism: ONE PRESS, MANY MOVE. The single loudest UI sound in the reel
   lands on f16 and fourteen people walk into your house because of it.
   ------------------------------------------------------------------------ */
export const S6Install: React.FC = () => {
  const f = useCurrentFrame();
  const w = useWorld("suburb");
  /* ⛔⛔ THE SCENE USED TO START WITH HALF A SECOND OF NOTHING. Alex, round 4:
     "at 14 seconds the animation needs to immediately start, not a pause where
     there's nothing for a while." Measured per-frame on v11, he is exactly
     right and it is worse than a pause: from local f6 the deltas sit at
     0.2-1.4 for the REST OF THE SCENE. The motion audit passed it at 8.97
     only because ONE frame at the cut scored 80.2 and carried the mean —
     which is [[feedback_scene_needs_an_arc]] in its purest form, "audit
     averages hide dead runs".

     The rebuild:
       · the cursor is ALREADY on the button at f0 and the press lands at f3,
         so the beat starts on the first frame of the scene
       · ⭐ the roster rows FLY OUT of the window and up the path — five big
         bright cards crossing ~640px each, which is the largest bright travel
         available in this frame and the reason the scene now reads
       · each card LANDS AS A CLAUDE who walks in, so the motion is the story
       · the crew is bigger (0.62 -> 0.92) and lit, because a small dark
         silhouette is worth nothing to the eye or to the metric
       · the windows keep lighting all the way to the cut */
  const push = E(f, 0, 73, 1, 1.09, LIN);
  const press = f >= 3 && f < 11 ? E(f, 3, 6, 0, 1, OUT) * E(f, 6, 11, 1, 0, OUT) : 0;
  const installed = Math.max(0, Math.min(5, Math.floor((f - 4) / 3.4)));
  const doorOpen = E(f, 8, 18, 0, 1, OUT);
  const litW = Math.max(0, Math.min(6, Math.floor((f - 12) / 9)));
  const TOOLS: [string, string, boolean][] = [
    ["claude.svg", "CLAUDE CODE", false], ["cursor.svg", "CURSOR", false],
    ["chatgpt_logo.png", "CODEX", true], ["googlegemini.svg", "GEMINI", false],
  ];
  const ROSTER: [string, Record<string, number>, "screen" | "swatch" | "roll" | "mega" | "case"][] = [
    ["Frontend Developer", { glasses: 1 }, "screen"],
    ["UI Designer", { glasses: 1 }, "swatch"],
    ["Ad Creative Strategist", { suit: 1 }, "roll"],
    ["Reddit Community Builder", { wizard: 1 }, "mega"],
    ["Reality Checker", { prof: 1 }, "case"],
  ];
  return (
    <Scene w={w} slug="macOS · WINDOWS · LINUX" litFar={0.20}>
      <Cam s={push} z={30}>
        <House x={452} y={560} s={0.92} z={30} lit={litW} doorOpen={doorOpen} />
        <div style={{ position: "absolute", left: 430, top: 556, width: 360, height: 232,
          background: "#5A6270", clipPath: "polygon(40% 0, 60% 0, 100% 100%, 0 100%)", zIndex: 24 }} />
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={"pv" + i} style={{ position: "absolute", left: 452 - i * 14, top: 578 + i * 42,
            width: 156 + i * 30, height: 5, background: "#4A525E", zIndex: 25 }} />
        ))}
        <div style={{ position: "absolute", left: 40, top: 556, width: 330, height: 74,
          borderRadius: "18px 18px 0 0", background: "#243A32", zIndex: 26 }} />
        <div style={{ position: "absolute", left: 866, top: 512, width: 76, height: 106,
          borderRadius: "8px 8px 4px 4px", background: "#2E3A46", zIndex: 26 }} />
        <div style={{ position: "absolute", left: 858, top: 500, width: 92, height: 18,
          borderRadius: 6, background: "#3C4854", zIndex: 27 }} />

        {/* THE CREW, bigger and lit, walking up the path from the moment a card
            lands. Nine of them, so the path is never empty. */}
        {Array.from({ length: 9 }, (_, i) => {
          const t0 = 12 + i * 5.4;
          const p = E(f, t0, t0 + 40, 0, 1, LIN);
          if (p <= 0 || p >= 1) return null;
          const s = 0.46 + p * 0.46;
          return (
            <Claudie key={"cw" + i} x={214 + p * 386} y={800 - p * 222} s={s}
              z={40 + i} f={f} walk={1} tint={CLAY}
              costume={ROSTER[i % 5][1]} prop={ROSTER[i % 5][2]} />
          );
        })}
      </Cam>

      {/* the app, foreground. The cursor is ALREADY on the button at frame 0. */}
      <AppWindow x={44} y={188} s={0.84} z={74} f={f} press={press} installed={installed} />

      {/* ⭐ THE ROSTER LEAVES THE WINDOW. Five bright cards, ~640px of travel
          each, on staggered arcs from the app to the front door. */}
      {ROSTER.map(([name], i) => {
        const t0 = 4 + i * 4.2;
        const p = E(f, t0, t0 + 30, 0, 1, IO);
        if (p <= 0 || p >= 1) return null;
        const sx = 300 + i * 22, sy = 296 + i * 42, tx = 700, ty = 548;
        const arc = Math.sin(p * Math.PI) * (186 + i * 42);
        return (
          <div key={"fly" + i} style={{ position: "absolute",
            left: sx + (tx - sx) * p, top: sy + (ty - sy) * p - arc,
            width: 300 * (1 - p * 0.62), height: 44 * (1 - p * 0.5), borderRadius: 9,
            background: "#F4F1E8", border: "3px solid #B4D3C1", zIndex: 82,
            transform: `rotate(${(1 - p) * -6 + p * 14}deg)`, opacity: 1 - p * p * 0.4,
            boxShadow: SH_D, display: "flex", alignItems: "center", paddingLeft: 10,
            overflow: "hidden", fontFamily: inter.fontFamily, fontWeight: 800,
            fontSize: 17 * (1 - p * 0.4), color: "#2B2824", whiteSpace: "nowrap" }}>
            <span style={{ color: "#3F9E74", marginRight: 7 }}>✓</span>{name}
          </div>
        );
      })}

      {TOOLS.map(([logo, name, png], i) => (
        <ToolTile key={name} x={470 + i * 128} y={64} logo={logo} name={name} png={png}
          on={E(f, 10 + i * 6, 18 + i * 6, 0, 1, BACK)} s={0.92} z={78} />
      ))}
      <StreetLamp x={16} y={760} h={330} c="#EFE7C6" z={86} />
    </Scene>
  );
};

/* ================================================================== S7 ====
   16.64 -> 18.50s · 56f · THE ROOFTOP AT DAWN · PAYOFF-2 · SMALL RISE.
   Mechanism: ELEVATION. The horizon drops, which is the cheapest way there is
   to make a character grow. ⛔ FREE appears exactly ONCE in the whole reel, and
   it is here, as a seal — never as a word repeated on tiles.
   ------------------------------------------------------------------------ */
export const S7Owner: React.FC = () => {
  const f = useCurrentFrame();
  const w = useWorld("dawnroof");
  const rise = E(f, 0, 56, -18, 96, LIN);
  const walk = E(f, 0, 16, 0, 1, IO);
  const land = E(f, 12, 26, 0, 1, BACK);
  const shine = E(f, 24, 52, 0, 1, LIN);
  const stamp = E(f, 24, 33, 0, 1, BACK);
  return (
    <Scene w={w} slug="YOU OWN THE WHOLE ROSTER"
      stars={false} overhead={false} litFar={0.42} push={[0, 56, 1.07]}>
      <Cam y={rise} z={30}>
        {/* the roof deck the camera is standing on */}
        <div style={{ position: "absolute", left: -60, right: -60, top: 596, height: 260,
          background: "linear-gradient(178deg,#6B5068 0%,#42304A 100%)", zIndex: 30 }} />
        <div style={{ position: "absolute", left: -60, right: -60, top: 560, height: 42,
          background: "#8B6478", zIndex: 31 }} />
        {Array.from({ length: 13 }, (_, i) => (
          <div key={"pp" + i} style={{ position: "absolute", left: -40 + i * 88, top: 560, width: 8,
            height: 42, background: "#6E4E62", zIndex: 32 }} />
        ))}
        {/* roof furniture: a water tank, masts, a vent bank */}
        <div style={{ position: "absolute", left: 782, top: 388, width: 128, height: 128,
          borderRadius: "12px 12px 6px 6px", background: "#5A4258", zIndex: 33, boxShadow: SH }} />
        {[792, 838, 884].map((x) => (
          <div key={"lg" + x} style={{ position: "absolute", left: x, top: 516, width: 11, height: 52,
            background: "#4C324B", zIndex: 33 }} />
        ))}
        {[96, 148].map((x, i) => (
          <div key={"ms" + x} style={{ position: "absolute", left: x, top: 330 + i * 40, width: 6,
            height: 232 - i * 40, background: "#4C324B", zIndex: 33 }} />
        ))}
        {Array.from({ length: 5 }, (_, i) => (
          <div key={"vt" + i} style={{ position: "absolute", left: 200 + i * 54, top: 522, width: 38,
            height: 44, borderRadius: "19px 19px 0 0", background: "#543950", zIndex: 33 }} />
        ))}
      </Cam>

      {/* the owner, on the parapet, in the suit */}
      <div style={{ position: "absolute", left: 96 + walk * 128, top: 386, zIndex: 62 }}>
        <Mascot lf={f} size={196} gaze={walk > 0.9 ? 0 : 1.2} cheer={0.85} suit={1} />
      </div>
      <Contact x={110 + walk * 128} y={568} w={186} z={61} o={0.30} />

      {/* THE HERO ARTIFACT */}
      <OwnerPlaque x={452} y={296} land={land} shine={shine} stamp={stamp} s={0.94} z={76} />

      {/* ⛔ THE ARC. The stamp lands at f33 and the last 23 frames were dead.
          The city finishes waking LEFT TO RIGHT across the back half: 34 window
          blocks the full width of the frame, each one arriving on a stagger.
          Large, wide, and subordinate — they are small and low-contrast. */}
      {Array.from({ length: 34 }, (_, i) => {
        const t0 = 26 + (i / 34) * 28;
        const p = E(f, t0, t0 + 6, 0, 1, OUT);
        if (p <= 0.02) return null;
        const r = (k: number) => { const v = Math.sin(i * 37.7 + k * 13.1) * 4371.7; return v - Math.floor(v); };
        return (
          <div key={"wk" + i} style={{ position: "absolute", left: 12 + i * 29,
            top: 300 + r(1) * 210 + rise, width: 17, height: 11 * p,
            background: "#FFE2A8", zIndex: 35 }} />
        );
      })}

      {/* birds, because a dawn skyline needs something alive in it */}
      {Array.from({ length: 6 }, (_, i) => {
        const p = ((f + i * 17) % 120) / 120;
        return (
          <div key={"bd" + i} style={{ position: "absolute", left: 60 + p * 940,
            top: 128 + ((i * 37) % 90) + Math.sin(f / 9 + i) * 7, width: 15, height: 7,
            borderTop: "3px solid #4C324B", borderRadius: "50% 50% 0 0", zIndex: 34,
            transform: `rotate(${Math.sin(f / 7 + i) * 12}deg)` }} />
        );
      })}
    </Scene>
  );
};

/* ================================================================== S8 ====
   18.50 -> 20.38s · 56f · THE FORECOURT AT DAWN · CTA · LOCKED, SYMMETRICAL.
   ⛔ THE CTA GRAPHIC GETS ITS OWN COLUMN — the gate will not catch a buried CTA.
   The keyword strikes on its own MEASURED onset, which is this scene's frame 0.
   ------------------------------------------------------------------------ */
export const S8Cta: React.FC = () => {
  const f = useCurrentFrame();
  const w = useWorld("forecourt");
  const on = Math.max(0, Math.min(16, Math.floor(f / 1.6)));
  const card = E(f, 16, 48, 0.54, 1.06, BACK);
  const lift = E(f, 16, 52, 168, -14, LIN);
  return (
    <Scene w={w} slug="msitarzewski / agency-agents"
      stars={false} litFar={0.12} slugC="#2E3B4C">
      {/* the facade and its doors */}
      <div style={{ position: "absolute", left: 96, top: 96, width: 820, height: 500, zIndex: 28,
        background: "linear-gradient(96deg,#5E7591 0%,#44586F 100%)", boxShadow: SH_D }} />
      {Array.from({ length: 6 * 8 }, (_, i) => {
        const cx = i % 8, cy = Math.floor(i / 8);
        return (
          <div key={"fw" + i} style={{ position: "absolute", left: 124 + cx * 98, top: 122 + cy * 58,
            width: 70, height: 34, background: cy < 2 ? "#7B8FA6" : "#3E5168", zIndex: 29 }} />
        );
      })}
      <div style={{ position: "absolute", left: 372, top: 452, width: 268, height: 190, zIndex: 32,
        background: "#F0CE8A", border: "8px solid #35455A" }} />
      <div style={{ position: "absolute", left: 506, top: 452, width: 6, height: 190, zIndex: 33,
        background: "#35455A" }} />
      <div style={{ position: "absolute", left: 300, top: 424, width: 412, height: 30, borderRadius: 8,
        background: "#33425A", zIndex: 33, boxShadow: SH }} />

      {/* THE MARQUEE re-strikes on the keyword */}
      <Marquee x={222} y={286} text={'COMMENT "AGENCY"'} on={on} f={f} s={0.98} z={60} c="#E7B24C" />

      {/* LEFT COLUMN: the owner handing it over. RIGHT: the card. */}
      <div style={{ position: "absolute", left: 44, top: 470, zIndex: 62 }}>
        <Mascot lf={f} size={186} gaze={0} cheer={0.9} suit={1} />
      </div>
      <Contact x={56} y={664} w={176} z={61} o={0.26} />
      <div style={{ position: "absolute", left: 316, top: 470 + lift, zIndex: 80,
        transform: `scale(${card})`, transformOrigin: "50% 50%" }}>
        <RepoCard x={0} y={0} s={1} z={80} f={f} />
      </div>
      <StreetLamp x={946} y={720} h={250} c="#E7B24C" z={86} on={0.25} flip />
      <Occluder side="l" c="#37465B" w={70} z={92} kind="pole" />
    </Scene>
  );
};
