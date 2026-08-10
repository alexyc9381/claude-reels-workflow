import React from "react";
import { AbsoluteFill, useCurrentFrame, Img, staticFile } from "remotion";
import { inter } from "./fonts";
import { Bg, Panel, ProgressBar, Caption, AssemblyCtx, hexA, Mascot } from "./SlopKit";
import {
  BackLot, SoundStage, PaidTower, CameraRig, WordTile, LogoTile, RepoCard, Slate,
  KeyCard, OChip, BigNum, Roll, Icon, STATS, STUDIOS, NAMED, Atmos, Searchlight, GripTruck, HF_LIME, HF_INK, FounderCard,
  NIGHT, WALL, STEEL, STEEL_D, STEEL_L, LAMP, CARD, INKD, MUTE,
  CLAY, GO, GOLD, RED, BLUE, PLUM, SH_D,
} from "./LotWorld";
import { E, osc, rnd, OUT, IO, BACK, IN_Q } from "./MissionWorld";

/* =========================================================================
   REEL 90 "OPEN" · SCENES (the BACKLOT).

   Scenes render CHASSIS-FREE under AssemblyCtx: ROOT owns bg, rail, captions.

   ⛔ EVERY CUT SITS ON A MEASURED WORD ONSET from the spliced VO (34.31s, 142
      words, three "cut cut" restarts removed). Frames, not estimates:
        killed 20 · Higgsfield 29 · sourced 134 · talking 172 · Anil 212
        "Open Generative AI" 236-256 · 10,000 282 · stars 299 · four 347
        studios 356 · app 382 · Image 400 · video 404 · lip sync 416
        Cinema Studio 443 · mirror 469 · camera 497 · 200 554 · models 571
        Seedance 628 · Kling 641 · Veo 653 · subscription 707 · API key 746
        generate 801 · credit 840 · bills 872 · paying 910 · optional 973
        Comment OPEN 993 · link 1017
   ========================================================================= */

export const LotCamCtx = React.createContext<{ z: number; dx: number; dy: number }>(
  { z: 1, dx: 0, dy: 0 });

const Chassis: React.FC<{ children: React.ReactNode; cap?: string[]; hot?: number }> =
  ({ children, cap, hot }) => {
  const f = useCurrentFrame();
  const solo = !React.useContext(AssemblyCtx);
  const cam = React.useContext(LotCamCtx);
  return (
    <AbsoluteFill>
      {solo && <><Bg /><ProgressBar /></>}
      <Panel glow={hexA(CLAY, 0.28)}>
        {/* ⛔ A LOT IS ARCHITECTURE, AND ARCHITECTURE HOLDS STILL. Adding moving
               PARTS (crew, haze, searchlights, a walking hero, a 520px blackout)
               only took S1 from 2.06 to 3.71, because each part is a small
               fraction of the frame. A continuous camera push moves EVERY EDGE
               at once, which is the only thing that scales with frame density.
               `f` restarts per Sequence, so each scene gets its own slow push. */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1,
          /* ⛔ at 0.00095/frame a 140-frame scene ended at 1.13 and pushed the
                 repo card and the key card clean out of frame. Start slightly
                 WIDE and finish just past 1.05, so the push is free motion and
                 never costs a composition. */
          transform: `scale(${cam.z * (0.975 + f * 0.00062)}) translate(${cam.dx - f * 0.05}px, ${cam.dy - f * 0.018}px)`,
          transformOrigin: "50% 54%" }}>{children}</div>
      </Panel>
      {solo && cap && <Caption words={cap} hot={hot} />}
    </AbsoluteFill>
  );
};

/** an in-scene shot. ⛔ zIndex is load-bearing: a transformed div is a stacking
    context pinned at 0, so a sibling BackLot (z 2..11) paints over it otherwise.
    That bug shipped two EMPTY scenes on reel 88 before it was caught. */
const Sh: React.FC<{
  f: number; a: number; b: number; k?: number; z?: number; children: React.ReactNode;
}> = ({ f, a, b, k = 0, z = 14, children }) => {
  if (f < a || f >= b) return null;
  const t = Math.min(1, (f - a) / 28), e = t * t * (3 - 2 * t);
  const s = [1.06 - e * 0.05, 1.01 + e * 0.055, 1.05 - e * 0.04, 1.02 + e * 0.045][k % 4];
  const dx = [0, -9, 8, -6][k % 4] * (1 - e);
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: z,
      transform: `scale(${s}) translateX(${dx}px)`, transformOrigin: "50% 55%" }}>{children}</div>
  );
};

const Guy: React.FC<{
  f: number; x: number; y: number; size?: number; prop?: string; cheer?: number;
  shock?: number; z?: number;
}> = ({ f, x, y, size = 200, prop, cheer = 0, shock = 0, z = 30 }) => {
  const p: any = { lf: f, size, cheer, shock, nodAmp: 3, nodSpeed: 10 };
  if (prop) p[prop] = 1;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      filter: `drop-shadow(0 ${Math.round(size * 0.05)}px ${Math.round(size * 0.07)}px rgba(0,0,0,0.6))` }}>
      <Mascot {...p} />
    </div>
  );
};

/* ====================================================================== S1 ==
   THE KILL. The paid tower owns the frame, lit and huge, one small figure in
   front of it. On "killed" (20) the lights go out floor by floor.
   ============================================================================ */
export const S1Kill: React.FC = () => {
  const f = useCurrentFrame();
  /* ⛔ ONE 125-FRAME HOLD MEASURED 2.06. Shot count is a FLOOR, not a ceiling:
        this is two shots now, wide then close, and the cut between them is
        itself the largest delta in the scene. */
  const CUT = 58;
  const dark = Math.min(1,
    E(f, 20, 30, 0, 0.34, OUT) + E(f, 42, 52, 0, 0.33, OUT) + E(f, 64, 76, 0, 0.34, OUT));
  return (
    <Chassis cap={["One guy", "just killed", "Higgsfield"]} hot={1}>
      <BackLot f={f} lamps={1 - dark * 0.6} />
      <Atmos f={f} n={6} z={10} />
      <Searchlight f={f} x={188} n={2} z={13} />
      <Searchlight f={f + 40} x={660} n={2} z={13} />
      <GripTruck f={f} y={556} s={0.72} z={31} speed={5.2} dir={1} at={2} />
      <GripTruck f={f} y={608} s={0.94} z={33} speed={7.0} dir={-1} at={16} />
      <GripTruck f={f} y={672} s={1.24} z={39} speed={9.2} dir={1} at={46} />

      {/* 1 · WIDE. The lot, and the tower that owns it. */}
      <Sh f={f} a={0} b={CUT} k={0}>
        {/* ⛔ THE HOOK HAD THE EMPTIEST FRAME IN THE REEL — two stages mostly
               off-panel and a lot of black. A camera push only helps where
               there are EDGES to move, so the lot is dressed properly here. */}
        <SoundStage f={f} x={-42} y={342} w={214} h={262} s={0.94} label="IMAGE" num="01"
                    c={BLUE} icon="image" who="glasses" open={0} lit={0} z={16} />
        <SoundStage f={f} x={186} y={392} w={214} h={230} s={0.72} label="AUDIO" num="03"
                    c={PLUM} icon="lips" who="chef" open={0} lit={0} z={15} />
        <SoundStage f={f} x={648} y={392} w={214} h={230} s={0.72} label="LIP SYNC" num="05"
                    c={GO} icon="lips" who="chef" open={0} lit={0} z={15} />
        <SoundStage f={f} x={834} y={342} w={214} h={262} s={0.94} label="VIDEO" num="02"
                    c={GO} icon="video" who="constr" open={0} lit={0} z={16} />
        {/* parked kit along the front, so the bottom third is not bare tarmac */}
        {Array.from({ length: 5 }, (_, i) => (
          <React.Fragment key={"kit" + i}>
            <div style={{ position: "absolute", left: -20 + i * 232, top: 636,
              width: 152, height: 62, borderRadius: 7, background: "#27374A",
              border: "3px solid #3B5169", zIndex: 17 }} />
            <div style={{ position: "absolute", left: 10 + i * 232, top: 616,
              width: 88, height: 24, borderRadius: 5, background: "#33475C", zIndex: 17 }} />
          </React.Fragment>
        ))}
        <PaidTower f={f} x={324} y={150} s={1.3} dark={dark}
                   price="$129/mo" name="HIGGSFIELD" z={22} />
        <div style={{ position: "absolute", left: 324, top: 150,
          width: 236 * 1.3, height: dark * 520, overflow: "hidden", zIndex: 26 }}>
          <div style={{ position: "absolute", inset: 0, background: "#0C1219", opacity: 0.82 }} />
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 7,
            background: LAMP, opacity: 0.9 }} />
        </div>
        <Guy f={f} x={44 + E(f, 6, 56, 0, 268, IO)} y={534} size={158} prop="constr"
             shock={E(f, 20, 36, 0, 0.35, OUT)} z={34} />
      </Sh>

      {/* 2 · ⛔ THE BLACKOUT EMPTIED THE PICTURE. Blowing the dead tower up to
             1.86 left 67 frames of a near-black rectangle (S1 measured 4.17).
             The dark tower moves to one third of the frame, the LOT fills the
             rest, and its lamps start coming on — which is the actual turn. */}
      <Sh f={f} a={CUT} b={9999} k={1}>
        <PaidTower f={f} x={-16 + E(f, CUT, 120, 0, 56, IO)} y={188} s={1.16} dark={1}
                   price="$129/mo" name="HIGGSFIELD" z={22} />
        <SoundStage f={f} x={362} y={330} w={214} h={272} s={0.98} label="IMAGE" num="01"
                    c={BLUE} icon="image" who="glasses" open={0}
                    lit={f > 96 ? 1 : 0} z={18} />
        <SoundStage f={f} x={620} y={352} w={214} h={252} s={0.88} label="VIDEO" num="02"
                    c={GO} icon="video" who="constr" open={0} lit={f > 106 ? 1 : 0} z={17} />
        <SoundStage f={f} x={846} y={372} w={214} h={236} s={0.78} label="LIP SYNC" num="03"
                    c={PLUM} icon="lips" who="chef" open={0} lit={f > 114 ? 1 : 0} z={16} />
        {Array.from({ length: 5 }, (_, i) => (
          <React.Fragment key={"kit2" + i}>
            <div style={{ position: "absolute", left: -60 + i * 248, top: 648,
              width: 178, height: 74, borderRadius: 8, background: "#27374A",
              border: "3px solid #3B5169", zIndex: 19 }} />
            <div style={{ position: "absolute", left: -20 + i * 248, top: 622,
              width: 104, height: 28, borderRadius: 5, background: "#33475C", zIndex: 19 }} />
          </React.Fragment>
        ))}
        <Guy f={f} x={168 + E(f, CUT + 2, 120, 0, 268, IO)} y={512} size={176}
             prop="constr" cheer={E(f, 92, 118, 0, 0.9, OUT)} z={34} />
      </Sh>

      <OChip y={716} text="ONE GUY. ONE REPO." c={RED} />
    </Chassis>
  );
};

/* ====================================================================== S2 ==
   OPEN SOURCED. Same lot, but every door rolls up and the light spills out.
   sourced@134 · talking@172
   ============================================================================ */
export const S2Sourced: React.FC = () => {
  const f = useCurrentFrame();
  const A = 125;
  const roll = E(f, 134 - A, 178 - A, 0, 1, OUT);
  return (
    <Chassis cap={["he built", "the same thing,", "open sourced it"]} hot={2}>
      <BackLot f={f} />
      <Atmos f={f} n={6} z={10} />
      <Searchlight f={f} x={188} n={2} z={13} />
      <Searchlight f={f + 40} x={660} n={2} z={13} />
      <PaidTower f={f} x={742} y={252} s={0.74} dark={1}
                 price="$129/mo" name="HIGGSFIELD" z={16} />
      {/* ⛔ the doors finished by frame 53 and the scene held. They now roll for
             the WHOLE shot, one after another, so the lot is still opening when
             the cut comes. */}
      {/* ⛔ a 125x121 doorway opening is 1.9% of the panel. Bigger stages mean the
             lit doorway is a LARGE bright reveal, which is what actually reads. */}
      {STUDIOS.slice(0, 3).map((st, i) => (
        <SoundStage key={st.name} f={f} x={-46 + i * 348}
                    y={228 + (1 - E(f, 4 + i * 15, 40 + i * 15, 0, 1, OUT)) * 340}
                    w={300} h={286} s={1.0}
                    label={st.name} num={`0${i + 1}`} c={st.c} icon={st.icon} who={st.who}
                    open={E(f, 14 + i * 15, 58 + i * 15, 0, 1, OUT)}
                    lit={f > 17 + i * 15 ? 1 : 0} z={20 + i} />
      ))}
      {/* the crowd it drew, rising on "talking" — ⛔ "needs to have stuff over
             their heads": each one pops a reaction, staggered, because the line
             is "everyone's TALKING about it". */}
      {[0, 1, 2, 3].map((i) => {
        const up = E(f, 166 - A + i * 8, 190 - A + i * 8, 0, 1, BACK);
        const gy = 570 + (1 - up) * 230;
        const bub = E(f, 176 - A + i * 8, 194 - A + i * 8, 0, 1, BACK);
        const glyph = ["★", "!", "♥", "★"][i];
        const bc = [GOLD, CLAY, RED, GO][i];
        return (
          <React.Fragment key={i}>
            {bub > 0.02 && (
              <div style={{ position: "absolute", left: 52 + i * 236,
                top: gy - 70 - Math.sin(f / 9 + i) * 6, width: 74, height: 62,
                borderRadius: 16, background: CARD, boxShadow: SH_D, zIndex: 40 + i,
                display: "flex", alignItems: "center", justifyContent: "center",
                transform: `scale(${bub})`,
                fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 34, color: bc }}>
                {glyph}
                <div style={{ position: "absolute", left: 28, bottom: -9, width: 0, height: 0,
                  borderLeft: "9px solid transparent", borderRight: "9px solid transparent",
                  borderTop: `11px solid ${CARD}` }} />
              </div>
            )}
            <Guy f={f + i * 13} x={34 + i * 236} y={gy}
                 size={128} prop={["glasses", "cop", "suit", "prof"][i]} cheer={0.9} z={34 + i} />
          </React.Fragment>
        );
      })}
      <OChip y={716} text="SAME THING. OPEN SOURCE." c={GO} size={35} />
    </Chassis>
  );
};

/* ====================================================================== S3 ==
   THE NAME. Anil@212 · "Open Generative AI" 236-256
   ============================================================================ */
export const S3Name: React.FC = () => {
  const f = useCurrentFrame();
  const A = 200;
  /* ⛔ THE OLD VERSION WAS THREE TEXT BLOCKS FIGHTING. A founder card, a repo
        card overlapping it (the star badge sat ON the repo name), a mascot AND a
        chip that just repeated the header. Now: his FACE is the subject, one
        plate names the repo, and nothing overlaps anything. */
  return (
    <Chassis cap={["His name is Anil,", "and he calls it", "Open Generative AI"]} hot={2}>
      <BackLot f={f} dim={0.5} />
      <Atmos f={f} n={5} z={10} />

      {/* the portrait, big, and lit like a headshot */}
      <div style={{ position: "absolute", left: 48 - (1 - E(f, 208 - A, 236 - A, 0, 1, OUT)) * 280,
        top: 232, width: 336, height: 336, borderRadius: 30, overflow: "hidden",
        border: `6px solid ${CARD}`, boxShadow: SH_D, zIndex: 40 }}>
        <Img src={staticFile("logos/anil.jpg")}
             style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div style={{ position: "absolute", left: 48, top: 588, zIndex: 42,
        transform: `scale(${E(f, 216 - A, 234 - A, 0, 1, BACK)})`, transformOrigin: "0% 50%" }}>
        <div style={{ padding: "12px 26px", borderRadius: 14, background: CARD,
          boxShadow: SH_D, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 36,
          letterSpacing: "-0.03em", color: INKD, whiteSpace: "nowrap" }}>Anil Matcha</div>
      </div>

      {/* what he made — one plate, well clear of the portrait */}
      {/* ⛔ "contents not overlapping" — the plate sits BELOW the portrait's
             right edge now, with clear air between them. */}
      <div style={{ position: "absolute", left: 448,
        top: 300 + (1 - E(f, 236 - A, 262 - A, 0, 1, OUT)) * 300, width: 508, height: 248,
        borderRadius: 24, background: CARD, boxShadow: SH_D, zIndex: 40 }}>
        <Img src={staticFile("logos/github.svg")}
             style={{ position: "absolute", left: 30, top: 28, width: 68, height: 68 }} />
        <div style={{ position: "absolute", left: 30, top: 116, fontFamily: inter.fontFamily,
          fontWeight: 900, fontSize: 40, lineHeight: 1.05, letterSpacing: "-0.035em",
          color: INKD }}>Open<br />Generative AI</div>
        <div style={{ position: "absolute", right: 26, bottom: 24, display: "flex", gap: 10 }}>
          <div style={{ padding: "10px 16px", borderRadius: 10, background: INKD,
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 26, color: GOLD }}>
            ★ <Roll f={f} at={228 - A} to={STATS.stars} dur={38} />
          </div>
          <div style={{ padding: "10px 16px", borderRadius: 10, background: GO,
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 26, color: CARD }}>MIT</div>
        </div>
      </div>

      <Guy f={f} x={834} y={572} size={150} prop="cop" cheer={0.9} z={34} />
    </Chassis>
  );
};

/* ====================================================================== S4 ==
   THE STARS. 10,000@282 · stars@299.
   ⛔ The real count is 25,503 — BIGGER than the VO says, so the true number can
      go on screen without fighting the audio. "First week" is UNVERIFIABLE
      (first commit 2026-02-09) and appears nowhere.
   ============================================================================ */
export const S4Stars: React.FC = () => {
  const f = useCurrentFrame();
  const A = 275;
  /* ⛔ "needs to be way better built, i also dont like how the star is hollow".
        Solid stars now, and the count sits ON a plate rather than floating on the
        lot, with a real burst behind it and a rank badge to give it meaning. */
  const pop = E(f, 282 - A, 320 - A, 0, 1, OUT);
  return (
    <Chassis cap={["It already has", "over 10,000 stars"]} hot={1}>
      <BackLot f={f} dim={0.28} />
      <Atmos f={f} n={4} z={10} dim={0.5} />

      {/* the burst: solid stars, tumbling outward the whole scene */}
      {Array.from({ length: 18 }, (_, i) => {
        const t = ((f + i * 7) % 46) / 46;
        const ang = -Math.PI + (i / 18) * Math.PI * 2;
        const d = 150 + t * 470;
        const sz = 22 + rnd(i, 7) * 40;
        return (
          <div key={i} style={{ position: "absolute",
            left: 506 + Math.cos(ang) * d - sz / 2,
            top: 388 + Math.sin(ang) * d * 0.7 - sz / 2,
            zIndex: 20, opacity: 1 - t * 0.55,
            transform: `rotate(${t * 210 + i * 20}deg)` }}>
            <Icon n="star" s={sz} c={GOLD} w={2} solid />
          </div>
        );
      })}

      {/* the count, on a plate so it reads as a stat and not as floating type */}
      <div style={{ position: "absolute", left: 96, top: 258, width: 820, height: 244,
        borderRadius: 30, background: INKD, boxShadow: SH_D, zIndex: 40,
        border: `5px solid ${GOLD}`,
        transform: `scale(${0.9 + pop * 0.1})` }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 34, display: "flex",
          justifyContent: "center", alignItems: "center", gap: 20 }}>
          <Icon n="star" s={96} c={GOLD} w={2} solid />
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 128,
            lineHeight: 1, letterSpacing: "-0.05em", color: CARD }}>
            <Roll f={f} at={282 - A} to={STATS.stars} dur={46} />
          </div>
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 30, display: "flex",
          justifyContent: "center", fontFamily: inter.fontFamily, fontWeight: 900,
          fontSize: 34, letterSpacing: "0.1em", color: GOLD }}>STARS ON GITHUB</div>
      </div>

      {/* what it means, arriving after the number lands */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 540, display: "flex",
        justifyContent: "center", gap: 14, zIndex: 44 }}>
        {[["MIT", GO], ["FREE FOREVER", CLAY]].map(([t, c], i) => (
          <div key={t as string} style={{ padding: "12px 26px", borderRadius: 14,
            background: c as string, boxShadow: SH_D, fontFamily: inter.fontFamily,
            fontWeight: 900, fontSize: 30, color: CARD,
            transform: `scale(${E(f, 306 - A + i * 6, 324 - A + i * 6, 0, 1, BACK)})` }}>{t}</div>
        ))}
      </div>

      <Guy f={f} x={826} y={556} size={158} prop="cop" cheer={0.92} z={34} />
    </Chassis>
  );
};

/* ====================================================================== S5 ==
   FOUR STUDIOS, ONE APP. four@347 · studios@356 · app@382
   ⛔ The README lists 14 studios. The graphic shows the FOUR he names and never
      claims four is the total.
   ============================================================================ */
export const S5Four: React.FC = () => {
  const f = useCurrentFrame();
  const A = 333;
  return (
    <Chassis cap={["You've got", "four studios", "in one free app"]} hot={1}>
      <BackLot f={f} dim={0.88} />
      <Atmos f={f} n={6} z={10} />
      {STUDIOS.map((st, i) => (
        <SoundStage key={st.name} f={f} x={12 + i * 244}
                    y={320 + (1 - E(f, 344 - A + i * 6, 380 - A + i * 6, 0, 1, OUT)) * 330}
                    w={214} h={272} s={0.92}
                    label={st.name} num={`0${i + 1}`} c={st.c} icon={st.icon} who={st.who}
                    open={E(f, 350 - A + i * 8, 386 - A + i * 8, 0, 1, OUT)}
                    lit={f > 352 - A + i * 8 ? 1 : 0}
                    t={E(f, 344 - A + i * 5, 362 - A + i * 5, 0, 1, BACK)} z={20 + i} />
      ))}
      <BigNum f={f} at={347 - A} to={4} dur={40} x={58} y={172} size={126} c={CARD} z={46} />
      <div style={{ position: "absolute", left: 158, top: 224, fontFamily: inter.fontFamily,
        fontWeight: 900, fontSize: 42, letterSpacing: "-0.02em", color: GOLD, zIndex: 46 }}>
        STUDIOS
      </div>
      <OChip y={716} text="ONE FREE APP" c={CLAY} />
    </Chassis>
  );
};

/* ====================================================================== S6 ==
   THREE DOORS. Image@400 · video@406 · lip sync@416, each on its own word.
   ============================================================================ */
export const S6Doors: React.FC = () => {
  const f = useCurrentFrame();
  const ON = [6, 13, 20];
  return (
    <Chassis cap={["Image,", "video,", "lip sync"]} hot={0}>
      <BackLot f={f} dim={0.8} />
      <Atmos f={f} n={5} z={10} />

      {STUDIOS.slice(0, 3).map((st, i) => {
        const open = E(f, ON[i], ON[i] + 18, 0, 1, OUT);
        const work = E(f, ON[i] + 2, ON[i] + 24, 0, 1, OUT);
        const x = 14 + i * 336;
        return (
          <React.Fragment key={st.name}>
            <SoundStage f={f} x={x} y={200} w={300} h={286} s={1.0}
                        label={st.name} num={`0${i + 1}`} c={st.c} icon={st.icon}
                        who={st.who} open={open} lit={open > 0.12 ? 1 : 0} z={20 + i} />
            {/* ⛔ WHAT THIS STUDIO ACTUALLY MAKES, running on a screen under it */}
            <div style={{ position: "absolute", left: x + 10, top: 500, width: 280,
              height: 168, borderRadius: 14, background: "#0E1620",
              border: `5px solid ${st.c}`, overflow: "hidden", zIndex: 30 + i,
              transform: `scale(${E(f, ON[i] + 1, ON[i] + 15, 0, 1, BACK)})`,
              transformOrigin: "50% 0%" }}>
              {i === 0 && (<>
                {/* IMAGE — a real picture underneath, revealed by a render pass */}
                <div style={{ position: "absolute", inset: 0, background: "#3E7AB8" }} />
                <div style={{ position: "absolute", left: 176, top: 24, width: 58,
                  height: 58, borderRadius: "50%", background: GOLD }} />
                <div style={{ position: "absolute", left: -30, top: 84, width: 190,
                  height: 190, borderRadius: "50%", background: "#128463" }} />
                <div style={{ position: "absolute", left: 108, top: 100, width: 230,
                  height: 200, borderRadius: "50%", background: "#17A87C" }} />
                <div style={{ position: "absolute", left: 0, right: 0, bottom: 0,
                  height: 34, background: "#0F6B50" }} />
                {/* the unrendered part, retreating down the frame */}
                <div style={{ position: "absolute", left: 0, right: 0, bottom: 0,
                  top: Math.min(168, work * 172), background: "#0E1620" }}>
                  {Array.from({ length: 9 }, (_, k) => (
                    <div key={k} style={{ position: "absolute", left: 0, right: 0,
                      top: k * 19, height: 8, background: "#17222E" }} />
                  ))}
                </div>
                <div style={{ position: "absolute", left: 0, right: 0,
                  top: Math.min(163, work * 172), height: 5, background: CARD,
                  opacity: work < 0.98 ? 0.95 : 0 }} />
              </>)}
              {i === 1 && (<>
                {/* VIDEO — frames running past, sprocket holes and all */}
                {Array.from({ length: 9 }, (_, k) => (
                  <div key={k} style={{ position: "absolute",
                    left: ((k * 82 - f * 6.2) % 738) - 82, top: 34,
                    width: 70, height: 106, borderRadius: 6,
                    background: ["#17A87C", "#1FC994", "#128463"][k % 3],
                    opacity: work }} />
                ))}
                <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 22,
                  background: "#0B1017" }} />
                {Array.from({ length: 13 }, (_, k) => (
                  <div key={"s" + k} style={{ position: "absolute",
                    left: ((k * 22 - f * 6.2) % 286) - 22, top: 6,
                    width: 11, height: 10, borderRadius: 2, background: "#5B7590" }} />
                ))}
              </>)}
              {i === 2 && (<>
                {/* LIP SYNC — a waveform driving a mouth that moves with it */}
                {Array.from({ length: 15 }, (_, k) => {
                  const h = 10 + Math.abs(Math.sin(f / 3.4 + k * 0.8)) * 68 * work;
                  return (
                    <div key={k} style={{ position: "absolute", left: 14 + k * 18,
                      top: 62 - h / 2, width: 10, height: h, borderRadius: 5,
                      background: PLUM }} />
                  );
                })}
                <div style={{ position: "absolute", left: "50%", bottom: 16,
                  transform: "translateX(-50%)", width: 86,
                  height: (14 + Math.abs(Math.sin(f / 3.4)) * 30) * work,
                  borderRadius: 22, background: CARD }} />
              </>)}
            </div>
          </React.Fragment>
        );
      })}
      <OChip y={718} text="THREE MORE, ALL OPEN" c={GO} size={35} />
    </Chassis>
  );
};

/* ====================================================================== S7 ==
   CINEMA STUDIO. Cinema Studio@443 · mirror@469 · camera@497.
   ⛔ The README's own words are "pro camera controls (Lens, Focal Length,
      Aperture)". The readout shows exactly those three. Nothing invented.
   ============================================================================ */
const CTRL: [string, string][] = [["LENS", "35mm"], ["FOCAL LENGTH", "85mm"], ["APERTURE", "f/1.8"]];

export const S7Cinema: React.FC = () => {
  const f = useCurrentFrame();
  const A = 433;
  /* ⛔ FOURTH ATTEMPT AT THIS SCENE, and the first three all failed the same way:
        everything happened inside a 632px viewfinder, so nothing had the AREA to
        register (3.18 -> 2.78 -> 3.39). The camera's output is now the WHOLE
        PANEL — you are looking through the lens — so the tracking subject and the
        raking lamp bank are full-size objects, not thumbnails. */
  const k = E(f, 6, 94, 0, 1, IO);
  const focal = 35 + k * 50;
  const stop = 8 - k * 6.2;
  return (
    <Chassis cap={["Cinema Studio,", "a straight mirror", "of Higgsfield's camera"]} hot={1}>
      {/* the shot, full frame, background parallaxing one way */}
      <div style={{ position: "absolute", inset: 0, background: "#141F2A", zIndex: 2 }} />
      {/* ⛔ "needs to be elevated, more interesting stuff behind him" — he is
             standing on a real set now: flats at the back, a lighting rig on
             stands, cable drums and flight cases along the floor, and a crew
             Claude working behind him. Each layer parallaxes at its own rate,
             so depth reads as motion rather than as a flat backdrop. */}
      <div style={{ position: "absolute", inset: 0, zIndex: 3, filter: `blur(${k * 8}px)` }}>
        {Array.from({ length: 7 }, (_, i) => (
          <div key={i} style={{ position: "absolute", left: -60 + i * 196 - k * 300,
            top: 210, width: 158, height: 340, borderRadius: 10,
            background: i % 2 ? "#2C3E53" : "#26374A",
            border: `4px solid ${STEEL_D}` }} />
        ))}
      </div>
      {/* the lighting rig, closer in, moving faster than the flats */}
      <div style={{ position: "absolute", inset: 0, zIndex: 4, filter: `blur(${k * 5}px)` }}>
        {Array.from({ length: 4 }, (_, i) => (
          <React.Fragment key={"st" + i}>
            <div style={{ position: "absolute", left: 96 + i * 292 - k * 430, top: 322,
              width: 11, height: 268, background: "#1B2733" }} />
            <div style={{ position: "absolute", left: 58 + i * 292 - k * 430, top: 358,
              width: 88, height: 9, background: "#22303E",
              transform: "rotate(28deg)", transformOrigin: "100% 50%" }} />
            <div style={{ position: "absolute", left: 62 + i * 292 - k * 430, top: 278,
              width: 80, height: 46, borderRadius: 7, background: "#16202B",
              border: `4px solid ${STEEL_L}` }} />
            <div style={{ position: "absolute", left: 71 + i * 292 - k * 430, top: 287,
              width: 62, height: 28, borderRadius: 4, background: LAMP }} />
          </React.Fragment>
        ))}
      </div>
      {/* crew on the floor behind him, dark and soft so the lit hero reads in front */}
      {[[210, 0, "constr"], [760, 37, "glasses"]].map(([x0, ph, who], i) => (
        <div key={i} style={{ position: "absolute", left: (x0 as number) - k * 330,
          top: 436, zIndex: 5,
          filter: `brightness(0.24) saturate(0.3) blur(${4 + k * 5}px)` }}>
          <Mascot lf={f + (ph as number)} size={168} nodAmp={4} nodSpeed={9} cheer={0.35}
                  {...({ [who as string]: 1 } as any)} />
        </div>
      ))}
      {/* cable drums and flight cases along the floor — nearest, fastest */}
      {Array.from({ length: 5 }, (_, i) => (
        <React.Fragment key={"c" + i}>
          <div style={{ position: "absolute", left: 40 + i * 268 - k * 620, top: 524,
            width: 84, height: 84, borderRadius: "50%", background: "#243545",
            border: `8px solid ${STEEL_D}`, zIndex: 9 }} />
          <div style={{ position: "absolute", left: 148 + i * 268 - k * 620, top: 552,
            width: 132, height: 56, borderRadius: 7, background: "#2A3B4C",
            border: `4px solid ${STEEL_D}`, zIndex: 9 }} />
        </React.Fragment>
      ))}
      {/* the boom, swinging down from the top of frame so the mic hangs over him */}
      {(() => {
        const rot = 15 + Math.sin(f / 24) * 2.4;
        const L = 540 - k * 150;
        const rad = (rot * Math.PI) / 180;
        return (<>
          <div style={{ position: "absolute", left: L, top: 190, width: 400, height: 15,
            borderRadius: 8, background: "#1B2733", zIndex: 10,
            transform: `rotate(${rot}deg)`, transformOrigin: "0% 50%" }} />
          <div style={{ position: "absolute",
            left: L + 388 * Math.cos(rad) - 42,
            top: 197 + 388 * Math.sin(rad) - 16,
            width: 84, height: 32, borderRadius: 16, background: "#16202B",
            border: `4px solid ${STEEL_L}`, zIndex: 10,
            transform: `rotate(${rot}deg)` }} />
        </>);
      })()}
      {/* the lamp bank raking across the top — big bright blocks, 4px a frame */}
      {Array.from({ length: 9 }, (_, i) => (
        <div key={"l" + i} style={{ position: "absolute",
          left: ((i * 132 - f * 4.2) % 1200) - 120, top: 150,
          width: 96, height: 34, borderRadius: 6, background: LAMP, zIndex: 6 }} />
      ))}
      {/* the subject, full size, tracking the width of the panel */}
      <div style={{ position: "absolute", left: -60 + k * 690, top: 300,
        transform: `scale(${0.9 + k * 0.5})`, transformOrigin: "50% 100%", zIndex: 12,
        filter: "drop-shadow(0 16px 24px rgba(0,0,0,0.6))" }}>
        <Mascot lf={f} size={300} prof={1} cheer={0.55} nodAmp={3} nodSpeed={11} />
      </div>

      {/* the frame furniture, so you know you are inside the lens */}
      {[0, 1, 2, 3].map((i) => (
        <div key={i} style={{ position: "absolute", zIndex: 40,
          [i < 2 ? "top" : "bottom"]: i < 2 ? 200 : 150,
          [i % 2 ? "right" : "left"]: 26, width: 54, height: 54,
          borderTop: i < 2 ? `6px solid ${CARD}` : undefined,
          borderBottom: i >= 2 ? `6px solid ${CARD}` : undefined,
          borderLeft: i % 2 === 0 ? `6px solid ${CARD}` : undefined,
          borderRight: i % 2 ? `6px solid ${CARD}` : undefined, opacity: 0.85 }} />
      ))}
      <div style={{ position: "absolute", left: 30, top: 200, display: "flex",
        alignItems: "center", gap: 9, zIndex: 42, padding: "7px 16px", borderRadius: 10,
        background: "rgba(10,14,20,0.7)" }}>
        <div style={{ width: 15, height: 15, borderRadius: "50%",
          background: Math.floor(f / 10) % 2 ? RED : "#3A2A28" }} />
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 19,
          letterSpacing: "0.15em", color: CARD }}>REC</div>
      </div>

      {/* the rig, in shot at the edge */}
      <CameraRig f={f} x={790 - k * 70} y={272} s={0.76} pan={osc(f, 80)}
                 t={E(f, 4, 24, 0, 1, BACK)} z={6} />

      {/* the three controls the README names, rolling with the move */}
      {[["FOCAL", `${Math.round(focal)}mm`], ["APERTURE", `f/${stop.toFixed(1)}`],
        ["LENS", k > 0.5 ? "PRIME" : "ZOOM"]].map(([lab, val], i) => (
        <div key={lab} style={{ position: "absolute", left: 34 + i * 212, top: 612,
          width: 196, height: 82, borderRadius: 13, background: CARD, boxShadow: SH_D,
          zIndex: 46, transform: `scale(${E(f, 12 + i * 6, 30 + i * 6, 0, 1, BACK)})`,
          display: "flex", flexDirection: "column", justifyContent: "center",
          paddingLeft: 18 }}>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 13,
            letterSpacing: "0.13em", color: MUTE }}>{lab}</div>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 34,
            letterSpacing: "-0.02em", color: INKD,
            fontVariantNumeric: "tabular-nums" }}>{val}</div>
        </div>
      ))}
      <OChip y={716} text="REAL CAMERA CONTROLS" c={CLAY} size={35} />
    </Chassis>
  );
};

/* ====================================================================== S8 ==
   THE MODEL WALL. 200@554 · models@571.
   ⛔ On screen: "200+". The README claims 400+, so 200+ is true and does not
      fight the audio.
   ============================================================================ */
const WALL_LOGOS = ["openai.png", "googlegemini.svg", "claude.svg", "meta.svg",
                    "mistralai.svg", "deepseek.svg", "qwen.svg", "freepik.svg",
                    "bytedance.svg", "huggingface.svg", "x.svg", "perplexity.svg"];

export const S8Models: React.FC = () => {
  const f = useCurrentFrame();
  const A = 533;
  return (
    <Chassis cap={["There's 200", "AI models"]} hot={0}>
      <BackLot f={f} dim={0.48} />
      <Atmos f={f} n={6} z={10} />
      {/* ⛔ 24 tiles landed by frame 40 and the scene then held. Each ROW now
             scrolls at its own rate for the whole scene, so the catalogue reads
             as something you are moving through rather than a static grid. */}
      {[0, 1, 2, 3].map((r) => {
        const s = 0.84 - r * 0.12;
        const step = 158 + r * 6;
        const dir = r % 2 ? -1 : 1;
        const speed = 1.5 + r * 0.7;
        return Array.from({ length: 9 }, (_, c) => {
          const i = r * 9 + c;
          const t = E(f, 547 - A + i * 0.8, 561 - A + i * 0.8, 0, 1, BACK);
          if (t <= 0.02) return null;
          const span = step * 9;
          const raw = (c * step + f * speed * dir + span * 4) % span;
          return (
            <LogoTile key={i} src={WALL_LOGOS[i % WALL_LOGOS.length]}
                      x={raw - 120 + r * 22} y={286 + r * 100} s={s} t={t}
                      r={Math.sin(f / 11 + i) * 3} z={26 - r} />
          );
        });
      })}
      <div style={{ position: "absolute", left: 0, right: 0, top: 152, display: "flex",
        justifyContent: "center", alignItems: "baseline", gap: 12, zIndex: 46 }}>
        <BigNum f={f} at={554 - A} to={STATS.models} dur={40} x={0} y={0} size={128} c={CARD} z={46} />
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 92,
          color: GOLD, lineHeight: 1 }}>+</div>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 38,
          letterSpacing: "0.04em", color: GOLD }}>MODELS</div>
      </div>
      <OChip y={716} text="ALL IN ONE APP" c={BLUE} />
    </Chassis>
  );
};

/* ====================================================================== S9 ==
   THE NAMES. Seedance@628 · Kling@641 · Veo@653.
   ⛔ None of the three has a Simple Icons entry, so these are WORDMARKS. A logo
      is never invented (`reel-brand-logo-sourcing`).
   ============================================================================ */
export const S9Named: React.FC = () => {
  const f = useCurrentFrame();
  const A = 613;
  const ON = [628 - A, 641 - A, 653 - A];
  return (
    <Chassis cap={["Seedance,", "Kling,", "Veo"]} hot={0}>
      <BackLot f={f} dim={0.6} />
      <Atmos f={f} n={6} z={10} />
      {/* ⛔ the catalogue behind was s=0.5 — unreadable texture. Six tiles at
             0.82 instead of twelve at 0.5: fewer, bigger, actually legible. */}
      {/* the rest of the catalogue streaming past behind the three named ones,
          continuously, so the frame is never still */}
      {Array.from({ length: 8 }, (_, i) => {
        const col = i % 2, row = Math.floor(i / 2);
        const span = 4 * 196;
        const y = ((row * 196 + f * (1.3 + col * 0.6)) % span) + 156;
        return (
          /* ⛔ "the logos on the right need to be bigger, way too small rn" */
          <LogoTile key={i} src={WALL_LOGOS[(i + 3) % WALL_LOGOS.length]}
                    x={654 + col * 186} y={y} s={1.28}
                    t={0.8} r={Math.sin(f / 10 + i) * 3} z={18} />
        );
      })}
      {NAMED.map((m, i) => (
        <WordTile key={m.name} name={m.name} c={m.c} logo={m.logo} by={m.by}
                  x={58} y={252 + i * 132} s={1.5}
                  t={E(f, ON[i], ON[i] + 18, 0, 1, BACK)}
                  r={-2 + i * 2} z={40 + i} />
      ))}
      <OChip y={716} text="THEY'RE ALL IN THERE" c={GO} size={35} />
    </Chassis>
  );
};

/* ===================================================================== S10 ==
   NO SUBSCRIPTION → YOUR OWN KEY. subscription@707 · API key@746 · generate@801
   ============================================================================ */
export const S10Key: React.FC = () => {
  const f = useCurrentFrame();
  const A = 683;
  const CUT = 738 - A;
  return (
    <Chassis cap={["no monthly", "subscription"]} hot={1}>
      <BackLot f={f} dim={0.58} />
      <Atmos f={f} n={6} z={10} />
      <GripTruck f={f} y={646} s={1.06} z={33} speed={7.4} dir={-1} at={8} />

      {/* 1 · the subscription, struck through on its own word */}
      <Sh f={f} a={0} b={CUT} k={0}>
        <div style={{ position: "absolute", left: 228, top: 306, width: 556, height: 180,
          borderRadius: 20, background: CARD, boxShadow: SH_D, zIndex: 40,
          transform: `scale(${E(f, 2, 18, 0, 1, BACK)})`, display: "flex",
          flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ position: "absolute", left: 22, top: 22, width: 56, height: 56,
            borderRadius: 14, overflow: "hidden" }}>
            <Img src={staticFile("logos/higgsfield.png")}
                 style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 78,
            letterSpacing: "-0.04em", color: INKD }}>$129 / mo</div>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 21,
            letterSpacing: "0.08em", color: MUTE, marginTop: 6 }}>EVERY MONTH, FOREVER</div>
        </div>
        <div style={{ position: "absolute", left: 176, top: 384, height: 26, borderRadius: 13,
          background: RED, zIndex: 46, transformOrigin: "0% 50%",
          width: E(f, 703 - A, 742 - A, 0, 664, OUT), transform: "rotate(-4deg)" }} />
        {/* the card itself is dragged off as the strike lands */}
        <div style={{ position: "absolute", inset: 0, zIndex: 39,
          transform: `translateX(${-E(f, 720 - A, 754 - A, 0, 240, IN_Q)}px) rotate(${-E(f, 720 - A, 754 - A, 0, 7, IN_Q)}deg)` }} />
        <Guy f={f} x={12} y={484} size={168} prop="cop" shock={0.4} z={34} />
      </Sh>

      {/* 2 · ⛔ "26 seconds animation needs to be way better". It was a card
             scaling in beside three static lines of type. The key now TRAVELS
             down into a slot and drives a meter that fills only as far as what
             you actually generated. */}
      <Sh f={f} a={CUT} b={9999} k={1}>
        <div style={{ position: "absolute", left: 92, top: 300, width: 400, height: 236,
          borderRadius: 20, background: "#1B2733", border: `5px solid ${STEEL_L}`,
          zIndex: 38, transform: `scale(${E(f, 740 - A, 758 - A, 0, 1, BACK)})` }}>
          <div style={{ position: "absolute", left: 24, right: 24, top: 22, height: 12,
            borderRadius: 6, background: "#16212C" }} />
        </div>
        <KeyCard f={f} x={118}
                 y={-250 + E(f, 746 - A, 784 - A, 0, 578, IO)
                    + Math.sin(Math.max(0, f - (784 - A)) / 3) * 4}
                 s={1.0} t={1} z={42} />
        <div style={{ position: "absolute", left: 548, top: 336, width: 404, height: 32,
          borderRadius: 16, background: "#1B2733", border: `4px solid ${STEEL_L}`,
          overflow: "hidden", zIndex: 40, opacity: E(f, 786 - A, 800 - A, 0, 1, OUT) }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0,
            width: `${E(f, 796 - A, 848 - A, 0, 38, OUT)}%`, background: GO }} />
        </div>
        <div style={{ position: "absolute", left: 548, top: 382, zIndex: 44,
          opacity: E(f, 790 - A, 804 - A, 0, 1, OUT) }}>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 64,
            lineHeight: 1, letterSpacing: "-0.04em", color: CARD }}>
            $<Roll f={f} at={796 - A} to={6} dur={52} />.40
          </div>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 25,
            letterSpacing: "0.05em", color: GOLD, marginTop: 8 }}>WHAT YOU GENERATED</div>
        </div>
        <Guy f={f} x={758} y={556} size={156} prop="constr"
             cheer={E(f, 800 - A, 824 - A, 0, 0.92, OUT)} z={34} />
      </Sh>
    </Chassis>
  );
};

/* ===================================================================== S11 ==
   NO CREDIT LIMIT, NO RECURRING BILLS. credit@840 · bills@872
   ============================================================================ */
export const S11NoLimit: React.FC = () => {
  const f = useCurrentFrame();
  const A = 823;
  const ROWS: [string, number, string][] = [
    ["NO CREDIT LIMIT", 840 - A, GO],
    ["NO RECURRING BILLS", 867 - A, BLUE],
  ];
  return (
    <Chassis cap={["no credit limit", "and no", "recurring bills"]} hot={0}>
      <BackLot f={f} dim={0.74} />
      <Atmos f={f} n={6} z={10} />
      {ROWS.map(([label, at, c], i) => (
        <div key={label} style={{ position: "absolute", left: 48, top: 306 + i * 158,
          display: "flex", alignItems: "center", gap: 24, zIndex: 40,
          transform: `scale(${E(f, at, at + 18, 0, 1, BACK)})`, transformOrigin: "0% 50%" }}>
          <div style={{ width: 104, height: 104, borderRadius: 26, background: c,
            boxShadow: SH_D, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width={56} height={56} viewBox="0 0 24 24">
              <path d="M4 12.5 L9.5 18 L20 6.5" fill="none" stroke={CARD} strokeWidth={3.4}
                    strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div style={{ padding: "18px 30px", borderRadius: 17, background: CARD,
            boxShadow: SH_D, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 44,
            letterSpacing: "-0.03em", color: INKD, whiteSpace: "nowrap" }}>{label}</div>
        </div>
      ))}
      {/* ⛔ two ticks landing was the whole scene. A credit bar now runs the full
             width for the whole shot and simply never hits a wall — which is
             literally what "no credit limit" means. */}
      <div style={{ position: "absolute", left: 46, right: 46, top: 570, height: 88,
        borderRadius: 20, background: "#1B2733", border: `5px solid ${STEEL_L}`,
        overflow: "hidden", zIndex: 40 }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0,
          width: `${E(f, 2, 68, 5, 100, IO)}%`, background: GO }} />
        {/* the fill is striped, so the EDGE is not the only thing that changes */}
        {Array.from({ length: 22 }, (_, i) => (
          <div key={i} style={{ position: "absolute", top: 0, bottom: 0,
            left: ((i * 58 - f * 4.6) % 1276) - 60, width: 22,
            background: "rgba(255,255,255,0.13)", transform: "skewX(-22deg)" }} />
        ))}
        {/* where the cap used to be, sailing past */}
        <div style={{ position: "absolute", top: 0, bottom: 0, left: "62%", width: 5,
          background: RED, opacity: 1 - E(f, 40, 56, 0, 1, OUT) }} />
      </div>
      <div style={{ position: "absolute", left: 46, top: 668, fontFamily: inter.fontFamily,
        fontWeight: 900, fontSize: 24, letterSpacing: "0.06em", color: GOLD, zIndex: 42,
        opacity: E(f, 44, 58, 0, 1, OUT) }}>NO CAP TO HIT</div>
      <KeyCard f={f} x={664} y={534 - E(f, 880 - A, 916 - A, 0, 108, OUT)} s={0.74}
               t={E(f, 878 - A, 894 - A, 0, 1, BACK)} z={38} />
      <Guy f={f} x={806} y={584} size={158} prop="suit" cheer={0.9} z={34} />
      <OChip y={716} text="YOU OWN THE BILL" c={GO} size={35} />
    </Chassis>
  );
};

/* ===================================================================== S12 ==
   OPTIONAL. paying@910 · optional@973. The tower is dark; he walks past it.
   ============================================================================ */
export const S12Optional: React.FC = () => {
  const f = useCurrentFrame();
  const A = 893;
  const MONTHS = 12;
  const blast = E(f, 962 - A, 1000 - A, 0, 1, IN_Q);   // the pile goes
  const land  = E(f, 956 - A, 972 - A, 0, 1, IN_Q);    // the free card lands
  return (
    <Chassis cap={["this guy just", "made it optional"]} hot={1}>
      <BackLot f={f} dim={0.8} />
      <Atmos f={f} n={5} z={10} />
      <Searchlight f={f} x={210} n={2} z={13} />

      {/* the months, stacking one at a time and leaning as they go */}
      {Array.from({ length: MONTHS }, (_, i) => {
        const at = 4 + i * 3.6;
        const t = E(f, at, at + 13, 0, 1, BACK);
        if (t <= 0.01) return null;
        const lean = Math.sin(i * 1.7) * (2 + i * 0.7);
        const bx = blast * (i % 2 ? 1 : -1) * (240 + i * 46);
        const by = blast * blast * (300 + i * 30) - blast * 190;
        return (
          <div key={i} style={{ position: "absolute",
            left: 250 + Math.sin(i * 2.3) * 9 + bx,
            top: 566 - i * 34 - (1 - t) * 260 + by,
            width: 300, height: 62, borderRadius: 10, zIndex: 22 + i,
            background: CARD, boxShadow: SH_D,
            transform: `rotate(${lean + blast * (i % 2 ? 34 : -34)}deg) scale(${t})`,
            opacity: 1 - E(f, 984 - A, 1000 - A, 0, 1, OUT) }}>
            <div style={{ position: "absolute", left: 14, top: 14, width: 34, height: 34,
              borderRadius: 9, overflow: "hidden", background: HF_LIME }}>
              <Img src={staticFile("logos/higgsfield.png")}
                   style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ position: "absolute", left: 60, top: 15,
              fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 30,
              letterSpacing: "-0.02em", color: INKD }}>$129</div>
            <div style={{ position: "absolute", right: 16, top: 21,
              fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 17,
              color: MUTE }}>{["JAN","FEB","MAR","APR","MAY","JUN",
                               "JUL","AUG","SEP","OCT","NOV","DEC"][i]}</div>
          </div>
        );
      })}

      {/* what it adds up to, climbing the whole time the pile grows */}
      <div style={{ position: "absolute", left: 62, top: 218, zIndex: 44,
        opacity: 1 - E(f, 960 - A, 974 - A, 0, 1, OUT) }}>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 92,
          lineHeight: 1, letterSpacing: "-0.05em", color: CARD }}>
          $<Roll f={f} at={6} to={1548} dur={54} />
        </div>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 26,
          letterSpacing: "0.06em", color: HF_LIME, marginTop: 8 }}>A YEAR OF IT</div>
      </div>

      {/* the free card drops in and blows the pile apart */}
      <div style={{ position: "absolute", left: 566, top: -300 + land * 690, zIndex: 46,
        transform: `rotate(${(1 - land) * -14}deg) scale(${0.8 + land * 0.2})` }}>
        <div style={{ width: 366, height: 214, borderRadius: 22, background: GO,
          boxShadow: SH_D, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 6 }}>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 84,
            lineHeight: 1, letterSpacing: "-0.05em", color: CARD }}>$0</div>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 22,
            letterSpacing: "0.08em", color: "#D8F2E6" }}>OPEN SOURCE</div>
        </div>
      </div>

      <Guy f={f} x={806} y={556} size={162} prop="constr"
           shock={E(f, 956 - A, 968 - A, 0, 0.4, OUT)}
           cheer={E(f, 980 - A, 1002 - A, 0, 0.92, OUT)} z={36} />

      <div style={{ position: "absolute", left: 0, right: 0, top: 172, display: "flex",
        justifyContent: "center", zIndex: 48,
        transform: `scale(${E(f, 973 - A, 991 - A, 2.2, 1, OUT)}) rotate(${E(f, 973 - A, 991 - A, -12, -3, OUT)}deg)`,
        opacity: E(f, 973 - A, 983 - A, 0, 1, OUT) }}>
        <div style={{ padding: "16px 38px", borderRadius: 18, background: INKD,
          border: `5px solid ${GOLD}`, boxShadow: SH_D, fontFamily: inter.fontFamily,
          fontWeight: 900, fontSize: 78, lineHeight: 1, letterSpacing: "-0.05em",
          color: GOLD }}>OPTIONAL</div>
      </div>
      <OChip y={716} text="PAYING IS NOW A CHOICE" c={CLAY} size={35} />
    </Chassis>
  );
};

/* ===================================================================== S13 ==
   THE CTA. Comment OPEN@993 · link@1017
   ============================================================================ */
export const S13Cta: React.FC = () => {
  const f = useCurrentFrame();
  const A = 978;
  /* ⛔ "34 seconds needs to be more hierarchical". A repo plate, a clapperboard
        and two mascots all weighed the same. In a CTA the KEYWORD is the only
        thing that matters, so it is 3x anything else and the rest is support. */
  return (
    <Chassis cap={["Comment OPEN", "and I'll send", "you the link"]} hot={0}>
      <BackLot f={f} dim={0.66} />
      <Atmos f={f} n={5} z={10} />
      <Searchlight f={f} x={240} n={2} z={13} />

      <RepoCard f={f} x={286} y={182} s={0.7} at={2}
                t={E(f, 2, 18, 0, 1, BACK)} z={36} />

      {/* the rings that say "type this" */}
      {[0, 1, 2, 3].map((i) => {
        const r = ((f + i * 11) % 34) / 34;
        if (r <= 0.01) return null;
        const g = 440 + r * 420;
        return (
          <div key={i} style={{ position: "absolute", left: 506 - g / 2, top: 404 - g * 0.31,
            width: g, height: g * 0.62, borderRadius: 70,
            border: `${Math.max(1, 7 - r * 5)}px solid ${CLAY}`,
            opacity: (1 - r) * 0.5, zIndex: 30 }} />
        );
      })}

      <div style={{ position: "absolute", left: 0, right: 0, top: 316, display: "flex",
        justifyContent: "center", zIndex: 46,
        transform: `scale(${E(f, 986 - A, 1006 - A, 0, 1, BACK) * (1 + Math.sin(f / 6) * 0.035)})` }}>
        <div style={{ padding: "26px 76px", borderRadius: 26, background: CLAY,
          boxShadow: SH_D, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 136,
          lineHeight: 1, letterSpacing: "-0.05em", color: CARD }}>OPEN</div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 504, display: "flex",
        justifyContent: "center", zIndex: 46,
        transform: `scale(${E(f, 1006 - A, 1022 - A, 0, 1, BACK)})` }}>
        <div style={{ padding: "12px 30px", borderRadius: 14, background: INKD,
          fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 34,
          color: CARD }}>COMMENT IT BELOW</div>
      </div>

      <Guy f={f} x={22} y={556} size={164} prop="glasses" cheer={0.92} z={34} />
      <Guy f={f + 12} x={840} y={562} size={156} prop="cop" cheer={0.9} z={34} />
    </Chassis>
  );
};
