import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { fraunces, inter } from "./fonts";
import {
  Bg, ProgressBar, Panel, CaptionLine, Mascot, Star, hexA, grad, over, CO, CLAY, GOLD, GREEN, SKY, MUTE, PINK, SectionHeader,
} from "./SlopKit";

/* =========================================================================
   S7 - the FORK IN THE ROAD (a NEW outdoor setting, not the studio)
   Dusk crossroads with a real STORY ARC so it never sits still:
     BEGINNING (f 0-34)  the clay hero ARRIVES, walking up to the fork.
     MIDDLE    (f 34-95) it hesitates & WEIGHS the two ways (a "?" thought
                         bubble, an impatient foot-tap wobble, head flicking
                         left<->right) while the grey AI-SLOP robot up the
                         rejected path eagerly WAVES it over ("pick me!").
     END       (f 96+)   it COMMITS, marching down the LEFT path with a
                         kicked-dust launch hop while the robot deflates,
                         glitches and fades with its path into cold fog.
   A slow cinematic CAMERA pushes + drifts across the whole diorama.
   The fork + the decision carry the whole meaning. No text stamps.
   ========================================================================= */
export const Scene7: React.FC = () => {
  const f = useCurrentFrame();
  const cl = (x: number) => Math.max(0, Math.min(1, x));

  // ambient dusk drivers
  const sway = Math.sin(f / 26);           // gentle grass / firefly drift
  const gust = Math.sin(f / 34) * 0.6 + Math.sin(f / 13) * 0.4; // wind gust envelope -1..1
  const sunPulse = 0.9 + 0.1 * Math.sin(f / 22);
  const armSway = Math.sin(f / 18) * 1.1;  // signpost arrow sway

  // ---- slow cinematic CAMERA (unchanged): a push-in + lateral drift across the scene ----
  const camPush = 1.12 + over(f, 0, 150) * 0.10;                 // 1.12 -> 1.22
  const camX = Math.sin(f / 58) * 15 + (12 - over(f, 0, 150) * 22);
  const camY = Math.cos(f / 76) * 8 + (4 - over(f, 0, 150) * 8);

  // ======================= the STORY ARC across the scene =======================
  const arrive = over(f, 0, 34);                             // BEGINNING: walk up to the fork
  const deliberate = over(f, 32, 8) * (1 - over(f, 92, 10)); // MIDDLE: the weighing window
  const commit = over(f, 96, 28);                            // END: 0 = at the fork, 1 = walked in
  const step = over(f, 100, 46);                             // physical stride down chosen path
  const hop = f >= 96 ? Math.sin(cl((f - 96) / 20) * Math.PI) * 24 : 0; // one decisive launch hop
  const dust = f >= 98 && f < 118 ? (f - 98) / 20 : -1;                 // first kicked dirt puff

  // WALK cycle (stride bounce/lean): ON during the arrival walk AND the final march, OFF while deciding
  const strideS = 4.4;
  const walkArr = over(f, 0, 6) * (1 - over(f, 26, 8));
  const walkCom = over(f, 96, 8);
  const moving = Math.max(walkArr, walkCom);
  const strideBounce = Math.abs(Math.sin(f / strideS)) * 9 * moving;
  const strideLean = Math.sin(f / strideS) * 3 * moving;

  // head/eyes: flick left<->right while weighing, then LOCK LEFT (the chosen way) on commit
  const weigh = Math.sin((f - 34) / 8.5) * 9;
  const gaze = weigh * deliberate * (1 - commit) + -9 * commit;
  // impatient hesitation: a small body wobble + foot-tap bob while deciding
  const wobble = Math.sin((f - 34) / 6.5) * 3.2 * deliberate * (1 - commit);
  const tap = Math.max(0, Math.sin(f / 3.1)) * 3.4 * deliberate * (1 - commit);

  // hero standing pose at the fork, then a march toward camera down the LEFT path
  const standX = 476, standY = 512, standSize = 166;
  const arrY = interpolate(arrive, [0, 1], [742, standY], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const arrSize = interpolate(arrive, [0, 1], [226, standSize], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const footX = standX - step * 182;
  const footY = arrY + step * 172 - hop - strideBounce + tap;
  const heroSize = arrSize + step * 62;

  // grey slop robot: eagerly WAVES the hero over in the middle, then is REJECTED (slumps/glitches/fades)
  const robotWave = over(f, 38, 10) * (1 - over(f, 90, 10));  // alive & beckoning during the middle
  const rej = commit;
  const glB = Math.abs(Math.sin(f / 2.7));
  const glitchOn = glB > 0.82 ? 1 : 0;
  const glitchX = glitchOn * Math.sin(f * 6) * 7;
  const robotFlick = 1 - rej * (0.12 + 0.32 * Math.pow(Math.abs(Math.sin(f / 3.3)), 6));
  const robotEager = robotWave * Math.abs(Math.sin(f / 5)) * 7;      // hops eagerly while beckoning
  const robotSink = rej * 20 + Math.sin(f / 40) * 2 - robotEager;

  // fork apex the paths share (panel-local)
  const APEX = 456;

  // the thought bubble (weighing the two paths) is visible only during the middle
  const tbOn = cl(deliberate * (1 - commit));

  // footprints pressed into the chosen path behind the hero
  const PRINTS: [number, number, number][] = [
    [470, 520, 0.5], [430, 558, 0.62], [388, 598, 0.74], [344, 640, 0.88], [300, 684, 1.0],
  ];

  return (
    <AbsoluteFill style={{ fontFamily: inter.fontFamily }}>
      <Bg />
      <ProgressBar />
      <SectionHeader f={f} badge="⚖️" l1={<>FORCE A</>} l2={<span style={{ color: CLAY }}>SIDE</span>} />

      <Panel glow={hexA(CO, 0.26)} pushIn>
        {/* ============ CAMERA RIG — everything but the vignette drifts inside here ============ */}
        <div style={{ position: "absolute", inset: 0, transformOrigin: "50% 50%", transform: `scale(${camPush}) translate(${camX}px, ${camY}px)` }}>
        {/* ================= FAR LAYER - dusk sky + low sun + hills ================= */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 356, overflow: "hidden", zIndex: 0 }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#201748 0%,#3E2E63 22%,#7A4E74 48%,#C56E5E 72%,#EA9C5C 90%,#F1B96C 100%)" }} />

          {/* faint first stars, upper sky (twinkle) */}
          {[[120, 40], [230, 70], [360, 34], [700, 52], [840, 82], [560, 30], [910, 46], [180, 108], [430, 96], [780, 118], [640, 74], [300, 132], [880, 148]].map(([x, y], i) => (
            <div key={i} style={{ position: "absolute", left: x, top: y, width: 3 + (i % 2), height: 3 + (i % 2), borderRadius: "50%", background: "#F4EED8", opacity: (0.28 + 0.4 * Math.abs(Math.sin(f / 8 + i * 1.3))) * cl((150 - y) / 150 + 0.4) }} />
          ))}

          {/* slow-drifting dusk clouds (bands lit warm underneath) */}
          {[[0.16, 60, 118, 0.32, "#8A5E70"], [0.06, 300, 92, 0.30, "#A56A6A"], [0.11, 560, 150, 0.26, "#6E4E72"], [0.09, 760, 108, 0.30, "#C77C64"], [0.14, 150, 190, 0.22, "#7A5878"]].map(([sp, bx, bw, o, c], i) => {
            const x = (((f * (sp as number)) + (bx as number)) % (1012 + 260)) - 200;
            return (
              <div key={i} style={{ position: "absolute", left: x, top: 150 + i * 16, width: bw as number, height: 34, borderRadius: 30, background: `linear-gradient(180deg, ${hexA(c as string, o as number)}, ${hexA(c as string, (o as number) * 0.4)})`, filter: "blur(5px)" }} />
            );
          })}

          {/* low sun sinking at the horizon */}
          <div style={{ position: "absolute", left: 566, top: 224, width: 132, height: 132, borderRadius: "50%", background: "radial-gradient(circle at 46% 42%, #FFE9B4, #F6B45C 52%, #E7803E)", boxShadow: `0 0 70px ${hexA(GOLD, 0.7 * sunPulse)}, 0 0 150px ${hexA("#E7803E", 0.5 * sunPulse)}`, opacity: sunPulse }} />
          {/* sun glare band on the sky */}
          <div style={{ position: "absolute", left: 300, top: 312, width: 440, height: 96, background: `radial-gradient(ellipse, ${hexA(GOLD, 0.38 * sunPulse)}, transparent 70%)`, mixBlendMode: "screen" }} />
          {/* volumetric light shafts fanning off the sun */}
          {[-26, -12, 4, 18, 32].map((a, i) => (
            <div key={i} style={{ position: "absolute", left: 632, top: 292, width: 8, height: 300, transformOrigin: "50% 0%", transform: `rotate(${a}deg)`, background: `linear-gradient(180deg, ${hexA(GOLD, (0.18 + 0.06 * Math.sin(f / 18 + i)) * sunPulse)}, transparent 78%)`, filter: "blur(4px)", mixBlendMode: "screen" }} />
          ))}

          {/* birds crossing the sky (V-shapes gliding left, wings flapping + gentle glide bob) */}
          {[[0.9, 120, 96, 1], [0.9, 210, 108, 0.9], [0.9, 60, 84, 0.8], [1.3, 700, 150, 0.7], [1.3, 800, 138, 0.6], [1.1, 460, 120, 0.85], [1.5, 900, 100, 0.5]].map(([sp, bx, by, sc], i) => {
            const x = 1080 - (((f * (sp as number)) + (bx as number)) % 1200);
            const y = (by as number) + Math.sin(f / 22 + i) * 6;
            const flap = Math.sin(f / 3.4 + i) * 7;
            return (
              <svg key={i} width={30 * (sc as number)} height={16 * (sc as number)} viewBox="0 0 30 16" style={{ position: "absolute", left: x, top: y, opacity: 0.55 * (sc as number) }}>
                <path d={`M2 ${10 - flap} Q9 2 15 8 Q21 2 28 ${10 - flap}`} fill="none" stroke="#22182F" strokeWidth={2.4} strokeLinecap="round" />
              </svg>
            );
          })}

          {/* banded distant hill silhouettes (deepest -> nearer, warmer rim on top) */}
          <div style={{ position: "absolute", left: -80, top: 236, width: 560, height: 130, borderRadius: "50% 50% 0 0 / 100% 100% 0 0", background: "#3C2C50" }} />
          <div style={{ position: "absolute", right: -100, top: 244, width: 660, height: 124, borderRadius: "50% 50% 0 0 / 100% 100% 0 0", background: "#342550" }} />
          <div style={{ position: "absolute", left: -40, top: 264, width: 620, height: 120, borderRadius: "50% 50% 0 0 / 100% 100% 0 0", background: "#2E2148" }} />
          <div style={{ position: "absolute", right: -60, top: 276, width: 700, height: 110, borderRadius: "50% 50% 0 0 / 100% 100% 0 0", background: "#281C42" }} />
          {/* warm rim catching the last light on the near ridge */}
          <div style={{ position: "absolute", left: -40, top: 262, width: 620, height: 14, borderRadius: "50% 50% 0 0 / 100% 100% 0 0", background: hexA("#E9A45C", 0.4), filter: "blur(2px)" }} />
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 64, background: "linear-gradient(180deg, transparent, #26361C)" }} />
        </div>

        {/* ================= MID LAYER - grass field ================= */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 320, bottom: 0, background: "linear-gradient(180deg,#5A7A4A 0%,#3E5836 34%,#243A1C 78%,#182811 100%)", zIndex: 1 }} />
        {/* warm horizon rim on the grass, catching the sunset */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 320, height: 44, background: `linear-gradient(180deg, ${hexA("#E9A45C", 0.45)}, transparent)`, zIndex: 1 }} />
        {/* rolling field texture bands for depth */}
        {[[336, 0.10], [372, 0.08], [420, 0.06]].map(([ty, o], i) => (
          <div key={i} style={{ position: "absolute", left: 0, right: 0, top: ty as number, height: 26, background: `linear-gradient(180deg, ${hexA("#7A9A5A", o as number)}, transparent)`, zIndex: 1 }} />
        ))}

        {/* silhouetted trees on the far ridge behind the fork (sway harder on wind gusts) */}
        {[[120, 322, 46, 74, "#22331A"], [210, 328, 30, 54, "#1E2E17"], [812, 320, 52, 82, "#22331A"], [896, 330, 34, 58, "#1E2E17"], [700, 330, 26, 46, "#1C2A15"]].map(([tx, ty, tw, th, c], i) => {
          const bob = Math.sin(f / 30 + i) * (1.6 + Math.abs(gust) * 1.4);
          return (
            <div key={i} style={{ position: "absolute", left: tx as number, top: (ty as number) - (th as number), zIndex: 2, transform: `rotate(${bob}deg)`, transformOrigin: "50% 100%" }}>
              <div style={{ position: "absolute", left: (tw as number) / 2 - 3, top: (th as number) - 16, width: 6, height: 20, background: "#1A2712" }} />
              <div style={{ width: tw as number, height: th as number, borderRadius: "50% 50% 46% 46% / 60% 60% 40% 40%", background: c as string }} />
            </div>
          );
        })}

        {/* ---- the two diverging dirt paths (share the fork apex) ---- */}
        {/* rejected RIGHT path: cool + dimming */}
        <div style={{ position: "absolute", inset: 0, zIndex: 3, clipPath: `polygon(500px ${APEX}px, 524px ${APEX}px, 946px 792px, 566px 792px)`, background: "linear-gradient(180deg,#6E5A44 0%,#4A3A28 100%)", filter: `saturate(${1 - rej * 0.7}) brightness(${1 - rej * 0.34})` }}>
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, ${hexA(SKY, 0.16 + rej * 0.14)}, ${hexA("#20304A", 0.28 * rej)})`, mixBlendMode: "multiply" }} />
          {/* wheel-rut texture on the rejected path */}
          {[0, 1, 2, 3, 4].map((r) => <div key={r} style={{ position: "absolute", left: `${52 + r * 3}%`, top: `${58 + r * 8}%`, width: `${3 + r}%`, height: 3, borderRadius: 3, background: hexA("#2A2018", 0.4), transform: `rotate(${34}deg)` }} />)}
        </div>
        {/* chosen LEFT path: warms + lights as the hero commits */}
        <div style={{ position: "absolute", inset: 0, zIndex: 3, clipPath: `polygon(500px ${APEX}px, 476px ${APEX}px, 62px 792px, 442px 792px)`, background: "linear-gradient(180deg,#8A6844 0%,#6A4E30 100%)" }}>
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, ${hexA(GOLD, 0.16 + commit * 0.4)}, ${hexA(CO, 0.24 * commit)})`, mixBlendMode: "screen" }} />
          {/* soft edge lights that switch on as the way is chosen */}
          <div style={{ position: "absolute", inset: 0, boxShadow: `inset 0 0 60px ${hexA(GOLD, 0.5 * commit)}` }} />
          {/* wheel-rut texture curving down the chosen path */}
          {[0, 1, 2, 3, 4].map((r) => <div key={r} style={{ position: "absolute", left: `${44 - r * 4}%`, top: `${58 + r * 8}%`, width: `${3 + r}%`, height: 3, borderRadius: 3, background: hexA("#3A2A18", 0.4 + commit * 0.2), transform: `rotate(${-34}deg)` }} />)}
        </div>

        {/* cold FOG rolling over the rejected path, thickening as it's abandoned */}
        {[0, 1, 2].map((k) => {
          const fx = 640 + Math.sin(f / 20 + k * 1.5) * 26 + k * 40;
          return <div key={k} style={{ position: "absolute", left: fx, top: 560 + k * 40, width: 300 - k * 30, height: 120, borderRadius: "50%", background: `radial-gradient(ellipse, ${hexA("#4A5A72", (0.16 + k * 0.06) * rej)}, transparent 72%)`, filter: "blur(10px)", zIndex: 5, mixBlendMode: "screen" }} />;
        })}

        {/* footprints pressed into the chosen path */}
        {PRINTS.map(([x, y, s], i) => {
          const on = cl((step - i * 0.15) / 0.18);
          return (
            <div key={i} style={{ position: "absolute", left: x, top: y, width: 46 * s, height: 24 * s, borderRadius: "50%", background: hexA("#2E1F12", 0.55), transform: "rotate(-24deg)", zIndex: 4, opacity: on * 0.85, boxShadow: `0 0 12px ${hexA(GOLD, 0.4 * on)}` }} />
          );
        })}

        {/* low wooden FENCE running along the field behind the fork */}
        <div style={{ position: "absolute", left: 0, top: 0, zIndex: 5 }}>
          {/* left-side fence receding */}
          {[[70, 372, 1], [128, 360, 0.94], [186, 350, 0.88], [244, 342, 0.82]].map(([px, py, sc], i) => (
            <div key={`fl${i}`} style={{ position: "absolute", left: px as number, top: py as number, width: 8 * (sc as number), height: 46 * (sc as number), background: grad("#6E4E30", "#3E2A18"), borderRadius: 2 }} />
          ))}
          <div style={{ position: "absolute", left: 74, top: 384, width: 178, height: 6, background: hexA("#5A3D22", 0.9), borderRadius: 3, transform: "rotate(-4deg)", transformOrigin: "0 50%" }} />
          <div style={{ position: "absolute", left: 74, top: 400, width: 178, height: 6, background: hexA("#4A3018", 0.9), borderRadius: 3, transform: "rotate(-4deg)", transformOrigin: "0 50%" }} />
          {/* right-side fence receding */}
          {[[760, 350, 0.88], [820, 358, 0.94], [882, 368, 1], [944, 380, 1.06]].map(([px, py, sc], i) => (
            <div key={`fr${i}`} style={{ position: "absolute", left: px as number, top: py as number, width: 8 * (sc as number), height: 46 * (sc as number), background: grad("#6E4E30", "#3E2A18"), borderRadius: 2 }} />
          ))}
          <div style={{ position: "absolute", left: 764, top: 366, width: 190, height: 6, background: hexA("#5A3D22", 0.9), borderRadius: 3, transform: "rotate(6deg)", transformOrigin: "0 50%" }} />
          <div style={{ position: "absolute", left: 764, top: 382, width: 190, height: 6, background: hexA("#4A3018", 0.9), borderRadius: 3, transform: "rotate(6deg)", transformOrigin: "0 50%" }} />
        </div>

        {/* shrubs / bushes lining the two paths (silhouettes, gently swaying with gusts) */}
        {[
          [286, 470, 60, 40, "#20331A", -1], [232, 520, 78, 50, "#1B2C16", -1],
          [176, 582, 96, 60, "#182611", -1], [104, 656, 118, 74, "#142009", -1],
          [636, 476, 56, 38, "#20331A", 1], [700, 522, 74, 48, "#1B2C16", 1],
          [770, 584, 92, 58, "#182611", 1], [846, 660, 112, 70, "#142009", 1],
        ].map(([bx, by, bw, bh, c, side], i) => {
          const swayB = Math.sin(f / 22 + i) * (2 + Math.abs(gust) * 3) * (side as number);
          return (
            <div key={i} style={{ position: "absolute", left: bx as number, top: by as number, zIndex: 6, transform: `rotate(${swayB}deg)`, transformOrigin: "50% 100%" }}>
              <div style={{ width: bw as number, height: bh as number, borderRadius: "50% 50% 44% 44% / 62% 62% 38% 38%", background: c as string, boxShadow: `inset 0 6px 10px ${hexA("#000000", 0.3)}` }} />
              {/* warm rim-light along the sun-facing top edge */}
              <div style={{ position: "absolute", left: (bw as number) * 0.1, top: -2, width: (bw as number) * 0.8, height: 6, borderRadius: 6, background: hexA("#E9A45C", 0.28), filter: "blur(2px)" }} />
            </div>
          );
        })}

        {/* ---- the wooden SIGNPOST at the fork (grain + bolts + two carved arrows that sway) ---- */}
        <div style={{ position: "absolute", left: 0, top: 0, zIndex: 8 }}>
          {/* post */}
          <div style={{ position: "absolute", left: 494, top: 300, width: 22, height: 168, background: grad("#6E4E30", "#3E2A18"), borderRadius: 4, boxShadow: "0 10px 20px rgba(0,0,0,0.4), inset 3px 0 4px rgba(255,255,255,0.14)" }}>
            {/* wood grain lines */}
            {[0, 1, 2].map((g) => <div key={g} style={{ position: "absolute", left: 6 + g * 5, top: 8, bottom: 8, width: 1.5, background: hexA("#2A1B0E", 0.4), borderRadius: 1 }} />)}
            {/* iron bolts */}
            {[24, 84, 140].map((by, i) => <div key={i} style={{ position: "absolute", left: 7, top: by, width: 8, height: 8, borderRadius: "50%", background: grad("#8A8A92", "#4A4A52"), boxShadow: "inset 0 1px 1px rgba(255,255,255,0.4)" }} />)}
          </div>
          {/* warm rim light down the sun side of the post */}
          <div style={{ position: "absolute", left: 512, top: 302, width: 3, height: 162, background: hexA("#F1B96C", 0.5), borderRadius: 2, filter: "blur(1px)" }} />
          <div style={{ position: "absolute", left: 470, top: 452, width: 70, height: 20, borderRadius: "50%", background: hexA("#12180C", 0.5), filter: "blur(4px)" }} />

          {/* LEFT arrow board = the way taken (warms + green tip as chosen, sways in the wind) */}
          <div style={{ position: "absolute", left: 320, top: 318, width: 172, height: 50, transformOrigin: "100% 50%", transform: `rotate(${armSway + gust * 0.7}deg)`, clipPath: "polygon(0 50%, 22px 0, 100% 0, 100% 100%, 22px 100%)", background: grad("#8A6238", "#5A3D20"), boxShadow: `0 8px 16px rgba(0,0,0,0.4)`, filter: `brightness(${0.9 + commit * 0.4})` }}>
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(90deg, ${hexA(GREEN, 0.5 * commit)}, transparent 60%)` }} />
            {/* board wood grain */}
            {[0, 1].map((g) => <div key={g} style={{ position: "absolute", left: 30, right: 8, top: 16 + g * 18, height: 1.5, background: hexA("#3A2612", 0.4) }} />)}
            {/* small warm clay spark badge (the hero's way), no words */}
            <div style={{ position: "absolute", left: 44, top: 13, width: 24, height: 24, borderRadius: "50%", background: grad(GOLD, CLAY), boxShadow: `0 0 ${8 + commit * 12}px ${hexA(CLAY, 0.8)}` }} />
            <div style={{ position: "absolute", left: 84, top: 20, width: 62, height: 8, borderRadius: 4, background: hexA("#F0E4CC", 0.8) }} />
          </div>

          {/* RIGHT arrow board = the rejected way (greys out, sways the opposite way) */}
          <div style={{ position: "absolute", left: 516, top: 372, width: 172, height: 50, transformOrigin: "0% 50%", transform: `rotate(${-armSway * 0.9 - gust * 0.7}deg)`, clipPath: "polygon(0 0, calc(100% - 22px) 0, 100% 50%, calc(100% - 22px) 100%, 0 100%)", background: grad("#5C5C64", "#34343C"), boxShadow: "0 8px 16px rgba(0,0,0,0.4)", filter: `saturate(${1 - rej * 0.8}) brightness(${1 - rej * 0.28})` }}>
            {/* board wood grain */}
            {[0, 1].map((g) => <div key={g} style={{ position: "absolute", left: 8, right: 30, top: 16 + g * 18, height: 1.5, background: hexA("#22222A", 0.5) }} />)}
            {/* tiny grey slop brick (the robot's way), no words */}
            <div style={{ position: "absolute", left: 22, top: 12, width: 34, height: 26, borderRadius: 5, background: "#26262E", border: "2px solid #3A3A44", overflow: "hidden" }}>
              {[0, 1, 2].map((r) => <div key={r} style={{ position: "absolute", left: 5, right: 5, top: 4 + r * 7, height: 3, borderRadius: 2, background: hexA(MUTE, 0.7) }} />)}
            </div>
            <div style={{ position: "absolute", left: 68, top: 20, width: 66, height: 8, borderRadius: 4, background: hexA("#B9BCC4", 0.5) }} />
          </div>
        </div>

        {/* ================= the cold grey AI-SLOP robot up the RIGHT path ================= */}
        {/* it WAVES the hero over in the middle, then slumps/glitches/fades once rejected */}
        <div style={{ position: "absolute", left: 656, top: 468 + rej * 16, zIndex: 9, transform: `translate(${glitchX}px, ${robotSink}px) scale(${0.62 - rej * 0.04}) rotate(${rej * 9}deg) skewX(${glitchOn * Math.sin(f * 7) * 4}deg)`, transformOrigin: "50% 100%", filter: `saturate(${0.36 - rej * 0.2 + robotWave * 0.3}) brightness(${0.86 - rej * 0.18 + robotWave * 0.1})`, opacity: robotFlick }}>
          <RobotSlop f={f} rej={rej} wave={robotWave} />
          {/* cool fog seeping over the rejected way */}
          <div style={{ position: "absolute", left: -40, top: 60, width: 240, height: 130, borderRadius: "50%", background: `radial-gradient(ellipse, ${hexA("#4A5A72", 0.4 * rej)}, transparent 70%)`, filter: "blur(8px)" }} />
        </div>

        {/* ================= NEAR LAYER - the clay hero at the fork / striding down the chosen path ================= */}
        {/* first decisive kicked-dirt puff at launch */}
        {dust >= 0 && [0, 1, 2, 3].map((k) => {
          const dir = k - 1.5;
          return <div key={k} style={{ position: "absolute", left: footX + dir * (16 + dust * 40), top: footY - 6 - dust * 20 - Math.abs(dir) * 5, width: 20 + dust * 22, height: 20 + dust * 22, borderRadius: "50%", background: hexA("#C9A878", 0.4 * (1 - dust)), filter: "blur(4px)", zIndex: 14 }} />;
        })}
        {/* rolling DUST TRAIL kicked up behind every footfall (grows as he nears camera) */}
        {commit > 0.04 && Array.from({ length: 6 }, (_, k) => {
          const cyc = 30;
          const ph = ((f * 1.0) + k * (cyc / 6)) % cyc;
          const life = ph / cyc;                                   // 0..1
          const bx = footX + 24 + life * 46 + k * 3;               // trails back up the path
          const by = footY - 8 - life * 40;
          const gsz = (10 + life * 34) * (heroSize / 180);
          return <div key={`dt${k}`} style={{ position: "absolute", left: bx, top: by, width: gsz, height: gsz, borderRadius: "50%", background: hexA("#C9A878", 0.32 * (1 - life) * commit), filter: "blur(4px)", zIndex: 13 }} />;
        })}
        {/* contact shadow under the hero (squashes with each stride) */}
        <div style={{ position: "absolute", left: footX - heroSize * 0.34, top: footY - 8, width: heroSize * (0.68 - strideBounce * 0.006), height: heroSize * 0.16, borderRadius: "50%", background: hexA("#0E1408", 0.5), filter: "blur(6px)", zIndex: 14 }} />
        {/* warm rim-glow behind the committed hero (sunlight on the chosen way) */}
        <div style={{ position: "absolute", left: footX, top: footY - heroSize * 0.5, transform: "translate(-50%,-50%)", width: heroSize * 1.2, height: heroSize * 1.2, borderRadius: "50%", background: `radial-gradient(circle, ${hexA(GOLD, 0.22 * commit)}, transparent 66%)`, zIndex: 13, mixBlendMode: "screen" }} />
        <div style={{ position: "absolute", left: footX, top: footY, transform: `translate(-50%,-100%) rotate(${strideLean + wobble - commit * 5}deg)`, transformOrigin: "50% 100%", zIndex: 16 }}>
          <Mascot lf={f} size={heroSize} gaze={gaze} nodSpeed={9} nodAmp={2.6} stern={commit * 0.7} />
        </div>

        {/* ---- the hero's "?" THOUGHT BUBBLE, weighing the two ways (middle beat only) ---- */}
        {tbOn > 0.01 && (
          <div style={{ position: "absolute", left: 352, top: 190, zIndex: 26, opacity: tbOn, transform: `translateY(${Math.sin(f / 12) * 3}px) scale(${0.72 + tbOn * 0.28})`, transformOrigin: "50% 130%" }}>
            {/* thought cloud */}
            <div style={{ position: "relative", width: 248, height: 116, borderRadius: 60, background: "linear-gradient(180deg,#FBF8F1,#EDE7DA)", boxShadow: "0 12px 26px rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
              {/* left option: the warm clay way (glows when the hero glances left) */}
              <div style={{ width: 42, height: 42, borderRadius: "50%", background: grad(GOLD, CLAY), boxShadow: `0 0 ${8 + Math.max(0, -weigh) * 1.5}px ${hexA(CLAY, 0.85)}`, transform: `scale(${1 + Math.max(0, -weigh / 9) * 0.18})` }} />
              {/* the ? */}
              <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 58, color: "#3A342C", transform: `scale(${1 + Math.abs(Math.sin(f / 7)) * 0.1})` }}>?</div>
              {/* right option: the grey slop way (glows when the hero glances right) */}
              <div style={{ position: "relative", width: 40, height: 32, borderRadius: 6, background: "#2A2E38", border: "2px solid #3A404C", overflow: "hidden", transform: `scale(${1 + Math.max(0, weigh / 9) * 0.18})`, boxShadow: `0 0 ${Math.max(0, weigh) * 1.4}px ${hexA(SKY, 0.5)}` }}>
                {[0, 1, 2].map((r) => <div key={r} style={{ position: "absolute", left: 6, right: 6, top: 5 + r * 8, height: 3, borderRadius: 2, background: hexA(MUTE, 0.8) }} />)}
              </div>
            </div>
            {/* thought-tail bubbles trailing down toward the hero */}
            <div style={{ position: "absolute", left: 128, top: 114, width: 20, height: 20, borderRadius: "50%", background: "#EDE7DA", boxShadow: "0 6px 12px rgba(0,0,0,0.22)" }} />
            <div style={{ position: "absolute", left: 138, top: 138, width: 12, height: 12, borderRadius: "50%", background: "#EDE7DA" }} />
          </div>
        )}

        {/* roadside WILDFLOWERS dotting the chosen path edge (bob in the wind gusts) */}
        {[[300, 566, GOLD], [252, 604, PINK], [340, 590, "#F0E4CC"], [214, 648, GOLD], [162, 692, PINK], [372, 636, "#F0E4CC"], [120, 726, GOLD]].map(([wx, wy, c], i) => {
          const bendF = Math.sin(f / 20 + i) * (3 + Math.abs(gust) * 4);
          const lit = 0.7 + 0.3 * commit;
          return (
            <div key={i} style={{ position: "absolute", left: wx as number, top: wy as number, zIndex: 18, transform: `rotate(${bendF}deg)`, transformOrigin: "50% 100%" }}>
              <div style={{ position: "absolute", left: 4, top: 8, width: 2.5, height: 26, background: "#2A3A18", borderRadius: 2 }} />
              {[0, 72, 144, 216, 288].map((a, p) => (
                <div key={p} style={{ position: "absolute", left: 5, top: 8, width: 7, height: 7, borderRadius: "50%", background: hexA(c as string, lit), transform: `rotate(${a}deg) translate(6px,0)`, transformOrigin: "0 50%" }} />
              ))}
              <div style={{ position: "absolute", left: 4, top: 7, width: 5, height: 5, borderRadius: "50%", background: hexA(GOLD, lit) }} />
            </div>
          );
        })}

        {/* foreground grass tufts framing the near edge (depth), blowing with the wind gusts */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 130, zIndex: 20, pointerEvents: "none" }}>
          {Array.from({ length: 30 }, (_, i) => {
            const gx = 8 + i * 34;
            const gh = 44 + (i % 5) * 20;
            const lean = Math.sin(f / 24 + i) * 6 + gust * 8;
            const shade = i % 3;
            return (
              <div key={i} style={{ position: "absolute", left: gx, bottom: -8, width: 9, height: gh, borderRadius: "50% 50% 0 0", background: grad(shade === 0 ? "#3A5424" : shade === 1 ? "#31491F" : "#284018", "#12200A"), transform: `rotate(${lean}deg)`, transformOrigin: "50% 100%" }} />
            );
          })}
        </div>

        {/* near out-of-focus foreground fronds framing the corners (bokeh depth, gusting) */}
        <div style={{ position: "absolute", left: -20, bottom: -20, width: 220, height: 260, zIndex: 24, pointerEvents: "none", filter: "blur(6px)", transform: `rotate(${-6 + gust * 4}deg)`, transformOrigin: "0 100%" }}>
          {[0, 1, 2].map((b) => <div key={b} style={{ position: "absolute", left: 10 + b * 40, bottom: 0, width: 26, height: 200 + b * 20, borderRadius: "50% 50% 0 0", background: grad("#1E3212", "#0C1607") }} />)}
        </div>
        <div style={{ position: "absolute", right: -30, bottom: -20, width: 220, height: 240, zIndex: 24, pointerEvents: "none", filter: "blur(6px)", transform: `rotate(${8 - gust * 4}deg)`, transformOrigin: "100% 100%" }}>
          {[0, 1, 2].map((b) => <div key={b} style={{ position: "absolute", right: 10 + b * 40, bottom: 0, width: 26, height: 190 + b * 20, borderRadius: "50% 50% 0 0", background: grad("#1E3212", "#0C1607") }} />)}
        </div>

        {/* drifting fireflies for the dusk mood (layered depth + blink) */}
        {[[210, 380, 0.5], [760, 340, 0.5], [340, 470, 0.6], [640, 430, 0.55], [120, 420, 0.5], [470, 400, 0.45], [560, 360, 0.4], [300, 540, 0.7], [700, 500, 0.6], [180, 600, 0.75], [430, 640, 0.55]].map(([x, y, s], i) => (
          <Star key={i} x={(x as number) + sway * (10 + i * 3)} y={(y as number) + Math.sin(f / 14 + i) * 14} s={s as number} c="#F6E4A0" o={0.22 + 0.42 * Math.abs(Math.sin(f / 9 + i * 1.7))} />
        ))}

        {/* fine drifting dust motes catching the low light */}
        {Array.from({ length: 16 }, (_, i) => {
          const mx = ((i * 67 + f * (0.5 + (i % 3) * 0.3)) % 1012);
          const my = 340 + ((i * 97) % 400) + Math.sin(f / 18 + i) * 10;
          return <div key={i} style={{ position: "absolute", left: mx, top: my, width: 3, height: 3, borderRadius: "50%", background: hexA("#F4E6C0", 0.28 + 0.2 * Math.abs(Math.sin(f / 11 + i))), zIndex: 22 }} />;
        })}
        </div>
        {/* ============ end CAMERA RIG — vignettes stay pinned OUTSIDE the drift ============ */}

        {/* warm foreground vignette to seat the depth */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 30, background: "radial-gradient(ellipse 92% 74% at 46% 50%, transparent 50%, rgba(8,10,4,0.52) 100%)" }} />
        {/* cool tint creeping in from the rejected (right) side */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 30, background: `linear-gradient(90deg, transparent 54%, ${hexA("#2A3A52", 0.22 * rej)} 100%)`, mixBlendMode: "multiply" }} />
      </Panel>

      <CaptionLine words={["PICK", "a", "side"]} hot={0} top={1240} />
    </AbsoluteFill>
  );
};

/* ---- the recurring cold grey AI-SLOP robot (compact, local; beckons, then glitches out) ---- */
const RobotSlop: React.FC<{ f: number; rej: number; wave: number }> = ({ f, rej, wave }) => {
  const flick = 0.3 + 0.12 * Math.abs(Math.sin(f / 6));
  const eyeA = (0.5 + wave * 0.4) * (1 - rej * 0.5);
  // a hard glitch beat: the head lines + a torn scan-slice jump every so often
  const gPulse = Math.abs(Math.sin(f / 2.1));
  const slice = gPulse > 0.88 ? 1 : 0;
  const sliceX = slice * Math.sin(f * 8) * 8;
  const headDroop = rej * 6 - wave * 4;                       // perks up while beckoning
  const waveArm = wave * (Math.sin(f / 3.2) * 46 - 30);       // big "come over here!" swing
  return (
    <div style={{ position: "relative", width: 128, height: 210 }}>
      {/* eager "pick me!" swoosh streaks off the waving hand */}
      {wave > 0.3 && [0, 1, 2].map((k) => {
        const o = (0.55 - k * 0.16) * wave * Math.abs(Math.sin(f / 4 - k * 0.8));
        return <div key={`sw${k}`} style={{ position: "absolute", right: -16 - k * 12, top: 90 - k * 4, width: 22, height: 4, borderRadius: 3, background: hexA("#8FC8FF", o), transform: `rotate(${-20 - k * 8}deg)` }} />;
      })}
      {/* teleprompter head with a dead grey slop screen (droops as it stalls, perks as it beckons) */}
      <div style={{ position: "absolute", left: 4, top: 0, width: 120, height: 88, borderRadius: 12, background: grad("#4A4E58", "#2C2F37"), border: "3px solid #565A64", boxShadow: "0 12px 22px rgba(0,0,0,0.5), inset 0 0 16px rgba(0,0,0,0.55)", overflow: "hidden", transform: `translateY(${headDroop}px) rotate(${rej * 3 - wave * 2}deg)`, transformOrigin: "50% 100%" }}>
        <div style={{ position: "absolute", inset: 8, borderRadius: 6, background: "#171A20" }} />
        {[0, 1, 2, 3, 4].map((r) => (
          <div key={r} style={{ position: "absolute", left: 15 + (slice && r % 2 ? sliceX : 0), top: 16 + r * 11, height: 5, width: r === 4 ? 40 : 90, borderRadius: 3, background: hexA(slice && r === 2 ? "#7FE8FF" : "#6C7078", flick) }} />
        ))}
        {/* a torn glitch scan-slice ripping across the screen */}
        {slice > 0 && <div style={{ position: "absolute", left: 8, right: 8, top: 26 + (f % 40), height: 6, background: hexA("#8FC8FF", 0.5), mixBlendMode: "screen" }} />}
        {/* cyan eyes brighten while beckoning, dim + flicker as the way is rejected */}
        <div style={{ position: "absolute", left: 30 + sliceX * 0.4, top: 30, width: 16, height: 16, borderRadius: "50%", background: hexA(SKY, eyeA * (slice ? 0.4 : 1)) }} />
        <div style={{ position: "absolute", right: 30 - sliceX * 0.4, top: 30, width: 16, height: 16, borderRadius: "50%", background: hexA(SKY, eyeA * (slice ? 0.4 : 1)) }} />
      </div>
      {/* neck + boxy body */}
      <div style={{ position: "absolute", left: 56, top: 84, width: 16, height: 20, background: "#3A3D45" }} />
      <div style={{ position: "absolute", left: 28, top: 100, width: 74, height: 56, borderRadius: 10, background: grad("#40434C", "#292C33"), border: "3px solid #4E525C" }}>
        <div style={{ position: "absolute", left: 12, top: 12, width: 22, height: 22, borderRadius: 4, background: "#23262D" }} />
        <div style={{ position: "absolute", right: 12, top: 14, width: 18, height: 8, borderRadius: 3, background: hexA(SKY, 0.22 * (slice ? 2 : 1)) }} />
      </div>
      {/* left arm hangs; right arm BECKONS while waving, then hangs lower + twitches as it stalls */}
      <div style={{ position: "absolute", left: 12, top: 108, width: 12, height: 42, borderRadius: 6, background: "#3A3D45", transform: `rotate(${8 + rej * 10 + slice * 4}deg)`, transformOrigin: "50% 0%" }} />
      <div style={{ position: "absolute", right: 12, top: 108, width: 12, height: 42, borderRadius: 6, background: "#3A3D45", transform: `rotate(${-8 - rej * 10 - slice * 4 + waveArm}deg)`, transformOrigin: "50% 0%" }} />
      {/* legs planted, not moving */}
      <div style={{ position: "absolute", left: 42, top: 154, width: 14, height: 40, borderRadius: 5, background: "#33363E" }} />
      <div style={{ position: "absolute", left: 72, top: 154, width: 14, height: 40, borderRadius: 5, background: "#33363E" }} />
    </div>
  );
};
