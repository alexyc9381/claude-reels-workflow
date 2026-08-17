import React from "react";
import { inter, fraunces } from "./fonts";
import { MONO, Mascot } from "./SlopKit";
import { Surface, Occluder, Cone, StreetLamp, PALETTES, W as WKW, H as WKH } from "./WorldKit";
import type { World } from "./WorldKit";
import {
  W, H, E, OUT, IO, LIN, hexa, SH, SH_D, rnd, dkh, mxh,
  CLAY, GOLD, GREEN, RED, SKY, INK, Beam, Motes, Contact, Cam,
} from "./SklWorld";

/* ===========================================================================
   REEL 106 · THE TEN LOCATIONS, REBUILT ON `WorldKit`.

   ⛔⛔⛔ THIS FILE WAS REWRITTEN TWICE AND THE SECOND REWRITE IS THE IMPORTANT
   ONE. Alex: *"the animations are not interesting enough nor meeting the
   quality bar, especially motion and quality of animation."* Then the repo's
   own gate said the same thing in numbers — `tools/look_audit.py` on v5:

       ✓ HOOK_LUMA   177.1        (frame 0 — passes)
       ✗ BODY_SAT     27.8%       needs >= 34%   (AGENCY 57.9)
       ✗ BODY_BLACK   p10 42.3    needs <= 35    (AGENCY 25.0)

   `docs/ANIMATION-QUALITY.md` §8 has the whole diagnosis: across reels 93->105
   saturated pixels fell **47%** and the black point rose **95%** while MOTION
   moved +2.6% — every one of those reels passed its motion audit while the
   picture went pale, because motion was the only thing gated. The mechanism was
   THE-OPEN's frame-0 luma law leaking outward into a whole-reel minimum, after
   which the sanctioned fix for any dim frame was lifting the shadows — which is
   exactly what kills the black point and washes saturated paint out.

   ⛔ THE GATE'S OWN INSTRUCTION, FOLLOWED HERE: *"Do NOT fix BODY_SAT or
      BODY_BLACK by lifting the shading. Repaint with saturated stock and let
      the shadows go dark."* My hand-rolled palettes did the banned thing — I
      lifted every sky toward white to chase a luma floor that does not apply to
      body scenes. They are gone.

   ⭐ So the sets are now built on **`WorldKit`**, the depth engine promoted out
      of reel 94 AGENCY — the only delivered reel that passes this gate:
        `Surface`   sky · haze · THREE parallax bands with lit windows · ground
                    · kerb · grit · overhead wires   (the 12-18 objects, free)
        `Occluder`  the mass cropped by the frame edge that ten reels shipped
                    without — this is what makes it a PLACE and not a backdrop
        `Cone` / `StreetLamp`  practical lights: the sanctioned way to lift a
                    dim set WITHOUT touching the palette's dark stop
      and its ten `PALETTES`, every one of which KEEPS ITS SHADOWS by design.

   ⛔ One palette per scene, so the location check still passes at 10/10, and the
      hue families still run through a full sequence.
   ========================================================================= */

export type SetKey = "library" | "door" | "bench" | "rehearsal" | "hall"
  | "yard" | "platform" | "roof" | "exam" | "board";

/* ⛔ ONE WorldKit PALETTE PER SCENE. Chosen so the hue sequence still swings —
   deep blue-green · gold marquee · tungsten · cold teal · plum · wet green ·
   sodium · DAWN · violet · warm depot — and so the beat's own light motivates
   the palette rather than the other way round. */
export const WORLD: Record<SetKey, World> = {
  library:   PALETTES.depot,      /* 2am stacks, cold and deep            */
  door:      PALETTES.marquee,    /* the gold flood — the reel's big jump */
  bench:     PALETTES.backlot,    /* tungsten on the workshop            */
  rehearsal: PALETTES.plaza,      /* coldest frame in the kit            */
  hall:      PALETTES.row,        /* plum lecture hall at dusk           */
  yard:      PALETTES.kerbside,   /* wet slate, green wash, rain         */
  platform:  PALETTES.kerb,       /* one sodium lamp                     */
  roof:      PALETTES.dawnroof,   /* the only warm-bright set            */
  exam:      PALETTES.corner,     /* violet, one skylight                */
  board:     PALETTES.suburb,     /* the notice board at night           */
};
/** kept so callers that still read PAL.*.horizon keep working */
export const PAL = WORLD;

/** ⭐ SOLID saturated rectangles of light — AGENCY's engine, and the sanctioned
    way to raise BODY_SAT: repaint with saturated stock, never lift the shading.
    ⛔ Matte fill only, no glow. */
const LitBank: React.FC<{ f: number; rows: number; cols: number; x: number; y: number;
  w: number; h: number; gapX: number; gapY: number; cols4?: string[]; z?: number;
  seed?: number }> =
  ({ f, rows, cols, x, y, w, h, gapX, gapY, cols4 = [GOLD, CLAY, "#F0C878", "#E8A45E"], z = 9, seed = 0 }) => (
  <>{Array.from({ length: rows * cols }, (_, i) => {
    const r = Math.floor(i / cols), c = i % cols;
    const on = rnd(i + seed, 3) > 0.18 ? 1 : 0.22;
    const flick = 0.90 + Math.sin(f / (9 + rnd(i + seed, 6) * 22) + i) * 0.10;
    return (
      <div key={"lb" + seed + i} style={{ position: "absolute", left: x + c * (w + gapX),
        top: y + r * (h + gapY), width: w, height: h, zIndex: z,
        background: cols4[i % cols4.length], opacity: on * flick, borderRadius: 3 }} />
    );
  })}</>
);

/* =========================================================================
   ⭐⭐⭐ `Rake` — THE TRAVELLING LIGHT SHAFTS. The one lever that actually
   moves a dead scene, and the arithmetic for why.

   `tools/scene_motion_audit.py` crops the panel, scales it 1012->240 (a 0.237
   factor) and means the ABSOLUTE LUMA DIFFERENCE between 10fps samples. So a
   scene's score is, near enough:

         motion  ~=  (fraction of the panel repainted per 0.1s) x (luma delta)

   That single line explains every row of ANIMATION-QUALITY §1 and it is what I
   got wrong on the first pass at reel 106's ROOF. Measured on this reel:

     seven 88x66 gold columns rising, one per day   0.18% of panel   -> +0.16
     a 5px sweep line                               0.06% of panel   -> ~0
     46 rain streaks 3px wide (they downsample to
       0.7px and vanish before differencing)                         -> ~0
     THREE 150px shafts crossing full panel height  12.5% of panel   -> +5.6

   ⛔ THIS IS WHY "ADD A BACKGROUND PROCESS" IS NOT ENOUGH ON ITS OWN. YARD
      already HAD one — rain, on every frame — and still scored 4.96, because
      3px of 34%-alpha drizzle survives neither the downsample nor a viewer's
      attention. §1's "LARGE x BRIGHT x FAST" is not three adjectives, it is
      the three terms of the product above, and dropping any one zeroes it.

   ⛔ HARD EDGES, NEVER A SOFT GRADIENT. A blurred band smears its delta across
      three samples and reads as haze; §1 measures a smooth blur/scale sweep as
      making a scene WORSE (3.18 -> 2.78). These are solid paint with a hard
      boundary, which is also the house matte rule — no `0 0 Npx` glow.
   ⛔ IT MUST BE MOTIVATED BY THE SET, never bolted on. A shaft is a practical
      light — the sanctioned way to lift a set without touching the palette's
      dark stop — so it costs the hierarchy nothing and it is furniture, exactly
      as §5 asks. Every caller below names its own source (dawn between towers,
      a floodlight, a shop light, the board's lamp).

   ⛔⛔ IT ALTERNATES LIGHT AND SHADOW, AND THAT IS NOT A STYLE CHOICE — IT IS
      THE WHOLE REASON THIS IS SAFE TO SHIP. The first version was light bands
      only, and measured on ROOF it did the exact thing §8 bans:

                        SAT      p10 (black point)   luma
        v6 ROOF        49.6         47.4            109.5
        light-only     45.8         56.1  (+8.7)    125.5

      A wash of light over 65% of the frame IS "fixing it by lifting the
      shading" — the move that cost ten reels their picture — and I reached for
      it without noticing, which is how it happens. Interleaving a DARK band
      between the light ones fixes both halves at once: every boundary becomes
      light-against-shadow instead of light-against-ambient, so each swept pixel
      carries MORE luma delta (more motion per unit area), while the shadow
      bands hold the black point DOWN instead of pushing it up.
      ⭐ It is also just what raking light looks like: you cannot have shafts
      without the dark between them.
   ====================================================================== */
/* ⛔⛔ RAKE OPACITY CUT 45% ACROSS EVERY SET, 2026-08-15, AND THE REASON IS
   DYNAMIC RANGE, NOT TASTE. Measured on 3.5s windows against delivered reels:

     105 FREE (delivered)   floor 3.1   mean 13.0   worst window HOLD 34%
     94 AGENCY (delivered)  floor 2.7   mean  9.2   worst window HOLD 57%
     106 v11 (mine)         floor 3.8   mean 10.3   worst window HOLD 80%

   A travelling band running under every frame raises the FLOOR, so nothing in
   the reel is ever quiet, and against that raised floor a real event has to be
   enormous to register at all. It also inflated the motion mean enough for the
   scene gate to pass while Alex was watching it pause. The band earned its
   place fixing ROOF 4.93 -> 9.92, but at full strength it became the reel's
   motion instead of its lighting. It stays as LIGHT; it stops being the motion.
   ⛔ Keep the alternating light AND shadow bands — the dark half is what
   protects the black point (light-only lifted p10 47.4 -> 56.1). */
export const Rake: React.FC<{ f: number; c: string; n?: number; w?: number;
  gap?: number; o?: number; speed?: number; skew?: number; z?: number;
  top?: number; h?: number; shade?: number }> =
  ({ f, c, n = 6, w: sw = 150, gap = 180, o = 0.26, speed = 7, skew = -14,
     z = 24, top = 0, h = H, shade = 0.85 }) => (
  <div style={{ position: "absolute", left: 0, top, width: W, height: h, zIndex: z,
    overflow: "hidden", pointerEvents: "none" }}>
    {Array.from({ length: n }, (_, i) => (
      <div key={"rk" + i} style={{ position: "absolute", top: -60, height: h + 120,
        left: ((f * speed + i * gap) % (W + gap)) - gap / 2, width: sw,
        background: i % 2 ? hexa("#05060B", o * shade) : hexa(c, o),
        transform: `skewX(${skew}deg)` }} />
    ))}
  </div>
);

/* =========================================================================
   THE TEN SETS. `Surface` supplies the depth engine; each set adds its own
   place props, its own practical, and its own frame-edge Occluder.
   ⛔ NOTHING here lifts a palette's dark stop. When a set reads dim the fix is
      a PRACTICAL (Cone / StreetLamp) or a brighter SUBJECT.
   ====================================================================== */
export const SetFor: React.FC<{ k: SetKey; f: number; lightK?: number }> =
  ({ k, f, lightK = 1 }) => {
  const w = WORLD[k];
  const p = w;
  const common = (<>
    <Surface w={w} t={f} stars={k !== "bench" && k !== "rehearsal" && k !== "exam"}
      overhead={k === "platform" || k === "board" || k === "yard"}
      lampsOn litFar={0.42} />
  </>);
  const occ = <Occluder side={k === "bench" || k === "hall" || k === "platform" ? "r" : "l"}
    c={w.sky2} w={124} z={90} kind={k === "platform" || k === "board" ? "pole" : "wall"} />;
  const lamp = <StreetLamp x={k === "door" ? 848 : 132} y={w.horizon + 96} h={318}
    c={w.key} on={lightK} z={34} flip={k === "door"} />;
  const cone = <Cone x={w.glowX} y={w.glowY + 40} top={110} bot={520} len={430}
    c={w.key} o={0.234 * lightK} z={22} f={f} />;

  if (k === "library") return (<>{common}{cone}
    {/* stacks: five tall shelves receding, each packed with spines */}
    {Array.from({ length: 5 }, (_, s) => (
      <div key={"sh" + s} style={{ position: "absolute", left: 40 + s * 200, top: 150,
        width: 168, height: 300, zIndex: 6 + s, background: dkh(w.sky2, 0.14),
        border: `4px solid ${dkh(w.sky2, 0.26)}`, borderRadius: 4, boxShadow: SH_D }}>
        {Array.from({ length: 3 }, (_, r) => (
          <div key={r} style={{ position: "absolute", left: 8, right: 8, top: 12 + r * 96, height: 78 }}>
            {Array.from({ length: 11 }, (_, b) => (
              <div key={b} style={{ position: "absolute", left: b * 13,
                top: rnd(b + s * 3 + r, 4) * 12, width: 11, height: 78 - rnd(b + r, 6) * 16,
                background: [CLAY, GOLD, GREEN, SKY, "#7C6BD0", RED][b % 6],
                opacity: 0.62, borderRadius: 2 }} />
            ))}
          </div>
        ))}
      </div>
    ))}
    <LitBank f={f} rows={2} cols={9} x={54} y={168} w={70} h={54} gapX={38} gapY={140}
      cols4={["#BFD9A8", GOLD, "#8FD08A", "#E7C46C"]} z={8} seed={4} />
    {/* the one fluorescent strip, buzzing */}
    <div style={{ position: "absolute", left: 210, top: 88, width: 600, height: 14, zIndex: 20,
      background: hexa(w.key, 0.5 + Math.sin(f / 3.1) * 0.16 * (Math.sin(f / 17) > 0.7 ? 1 : 0.2)),
      borderRadius: 4, boxShadow: SH }} />
    <Beam x={510} y={102} top={480} bot={860} len={430} c={w.key} o={0.125 * lightK} z={19} f={f} />
    <Motes x={510} y={160} w={420} h={340} n={13} f={f} z={21} c="#DCEAC8" />
    {/* light falling BETWEEN the stacks — steep, slow, cold */}
    <Rake f={f} c={w.key} n={7} w={132} gap={168} o={0.234 * lightK} speed={-9}
      skew={-27} z={23} />
    {lamp}{occ}
  </>);

  if (k === "door") return (<>{common}
    {/* the cold room, and the DOOR flooding gold */}
    {Array.from({ length: 4 }, (_, i) => (
      <div key={"lk" + i} style={{ position: "absolute", left: 44 + i * 92, top: 236, width: 74,
        height: 214, zIndex: 6, background: dkh(w.sky2, 0.12), borderRadius: 5,
        border: `3px solid ${dkh(w.sky2, 0.24)}`, boxShadow: SH_D }} />
    ))}
    <LitBank f={f} rows={3} cols={4} x={44} y={250} w={74} h={40} gapX={18} gapY={58}
      cols4={[GOLD, "#E8A45E", CLAY, "#F0C878"]} z={7} seed={11} />
    <div style={{ position: "absolute", left: 560, top: 120, width: 300, height: 400, zIndex: 8,
      background: dkh(w.sky2, 0.28), borderRadius: 6, border: `8px solid ${dkh(w.sky2, 0.4)}` }} />
    {/* the opening — the reel's biggest colour jump */}
    <div style={{ position: "absolute", left: 588, top: 148, width: 244 * lightK, height: 372,
      zIndex: 9, background: `linear-gradient(180deg, ${mxh(w.key, 0.4)}, ${w.key})`,
      boxShadow: `0 0 0 0 transparent` }} />
    <Beam x={710} y={150} top={220} bot={760} len={470} c={w.key} o={0.234 * lightK} z={10} f={f} />
    <Motes x={710} y={200} w={380} h={360} n={14} f={f} z={11} c="#FBEBC4" />
    {/* the gold flood spilling OUT of the opening — wide, warm, unhurried */}
    <Rake f={f} c={w.key} n={6} w={186} gap={210} o={0.234 * lightK} speed={10}
      skew={-9} z={23} />
    {lamp}{occ}
  </>);

  if (k === "bench") return (<>{common}
    {/* pegboard wall with hanging tools — dense by construction */}
    <div style={{ position: "absolute", left: 96, top: 120, width: 820, height: 290, zIndex: 6,
      background: dkh(w.sky2, 0.08), borderRadius: 6, border: `5px solid ${dkh(w.sky2, 0.22)}` }}>
      {Array.from({ length: 88 }, (_, i) => (
        <div key={"pg" + i} style={{ position: "absolute", left: 22 + (i % 22) * 36,
          top: 22 + Math.floor(i / 22) * 66, width: 7, height: 7, borderRadius: 4,
          background: hexa("#000", 0.22) }} />
      ))}
      {Array.from({ length: 11 }, (_, i) => (
        <div key={"tl" + i} style={{ position: "absolute", left: 44 + i * 70, top: 40,
          width: 30, height: 60 + rnd(i, 3) * 90, borderRadius: 5,
          background: [CLAY, GOLD, GREEN, SKY, RED][i % 5], opacity: 0.9,
          border: `3px solid ${dkh([CLAY, GOLD, GREEN, SKY, RED][i % 5], 0.3)}`, boxShadow: SH }} />
      ))}
    </div>
    <div style={{ position: "absolute", left: -20, top: w.horizon - 26, width: W + 40, height: 34,
      zIndex: 13, background: `linear-gradient(180deg, ${mxh(w.ground, 0.12)}, ${w.ground})`,
      borderTop: `4px solid ${dkh(w.ground, 0.22)}` }} />
    <Beam x={506} y={96} top={260} bot={800} len={430} c={w.key} o={0.156 * lightK} z={14} f={f} />
    {/* the shop light raking the pegboard — shallow and quick */}
    <Rake f={f} c={w.key} n={7} w={150} gap={166} o={0.250 * lightK} speed={14}
      skew={-38} z={23} />
    {occ}
  </>);

  if (k === "rehearsal") return (<>{common}
    {/* mirrored wall + barre + the bank of lights that fires on */}
    <div style={{ position: "absolute", left: 60, top: 132, width: 892, height: 300, zIndex: 6,
      background: `linear-gradient(168deg, ${mxh(w.sky, 0.22)}, ${dkh(w.sky, 0.10)})`,
      border: `7px solid ${dkh(w.sky2, 0.24)}`, borderRadius: 4, boxShadow: SH_D }}>
      {Array.from({ length: 4 }, (_, i) => (
        <div key={"mv" + i} style={{ position: "absolute", left: 214 * i + 4, top: 0, bottom: 0,
          width: 6, background: dkh(w.sky2, 0.28) }} />
      ))}
    </div>
    {Array.from({ length: 8 }, (_, i) => (
      <div key={"lb" + i} style={{ position: "absolute", left: 92 + i * 108, top: 96, width: 76,
        height: 26, borderRadius: 6, zIndex: 20,
        background: lightK > i / 8 ? w.key : dkh(w.sky2, 0.2),
        border: `3px solid ${dkh(w.sky2, 0.34)}` }} />
    ))}
    <LitBank f={f} rows={1} cols={12} x={68} y={196} w={54} h={128} gapX={22} gapY={0}
      cols4={["#7FE3D8", "#EAF6F2", "#5AD0C4", "#B8F0E8"]} z={7} seed={21} />
    <div style={{ position: "absolute", left: 40, top: 404, width: 932, height: 12, zIndex: 16,
      borderRadius: 6, background: mxh(w.ground, 0.2), boxShadow: SH }} />
    <Beam x={506} y={120} top={640} bot={980} len={430} c={w.key} o={0.172 * lightK} z={18} f={f} />
    <Motes x={506} y={180} w={460} h={330} n={12} f={f} z={19} c="#E8F6F2" />
    {/* the rig above the mirror throwing hard teal bars — the fastest in the reel */}
    <Rake f={f} c={w.key} n={7} w={124} gap={158} o={0.266 * lightK} speed={-16}
      skew={-20} z={23} />
    {lamp}{occ}
  </>);

  if (k === "hall") return (<>{common}
    {/* raked seating receding + a lectern; dusk through high windows */}
    {Array.from({ length: 6 }, (_, r) => (
      <div key={"rw" + r} style={{ position: "absolute", left: 30 - r * 6, top: 216 + r * 42,
        width: W - 60 + r * 12, height: 30, zIndex: 6 + r, borderRadius: 5,
        background: dkh(w.sky2, 0.06 + r * 0.03), boxShadow: SH }}>
        {Array.from({ length: 12 }, (_, s) => (
          <div key={s} style={{ position: "absolute", left: 18 + s * 80, top: -12, width: 54,
            height: 22, borderRadius: 4, background: dkh(w.sky2, 0.22) }} />
        ))}
      </div>
    ))}
    {Array.from({ length: 3 }, (_, i) => (
      <div key={"wd" + i} style={{ position: "absolute", left: 110 + i * 320, top: 92, width: 180,
        height: 110, zIndex: 5, borderRadius: 4,
        background: `linear-gradient(180deg, ${w.key}, ${mxh(w.sky, 0.3)})`,
        border: `7px solid ${dkh(w.sky2, 0.26)}` }} />
    ))}
    <Beam x={330} y={200} top={200} bot={640} len={420} c={w.key} o={0.156 * lightK} z={16} f={f} />
    {/* dusk coming through the high windows, across the raked seating */}
    <Rake f={f} c={w.key} n={6} w={178} gap={196} o={0.243 * lightK} speed={-11}
      skew={-13} z={23} />
    {occ}
  </>);

  if (k === "yard") return (<>{common}
    {/* EXTERIOR. wet mat, fence, floodlight, and rain */}
    <div style={{ position: "absolute", left: 0, top: w.horizon - 150, width: W, height: 150,
      zIndex: 6, opacity: 0.9 }}>
      {Array.from({ length: 26 }, (_, i) => (
        <div key={"fc" + i} style={{ position: "absolute", left: i * 40, top: 0, width: 5,
          height: 150, background: hexa(w.lip, 0.5) }} />
      ))}
      <div style={{ position: "absolute", left: 0, top: 8, width: W, height: 5,
        background: hexa(w.lip, 0.7) }} />
    </div>
    {/* the mat */}
    <div style={{ position: "absolute", left: 120, top: w.horizon + 44, width: 780, height: 190,
      zIndex: 15, borderRadius: 14, background: `linear-gradient(178deg, ${CLAY}, ${dkh(CLAY, 0.3)})`,
      border: `6px solid ${dkh(CLAY, 0.4)}`, boxShadow: SH_D }} />
    {/* floodlight */}
    <div style={{ position: "absolute", left: 848, top: 60, width: 108, height: 70, zIndex: 20,
      borderRadius: 8, background: dkh(w.sky2, 0.3), border: `5px solid ${dkh(w.sky2, 0.44)}` }} />
    <Beam x={880} y={128} top={140} bot={720} len={480} c={w.key} o={0.172 * lightK} z={19} f={f} />
    {/* rain — the set's own running process.
        ⛔⛔ THIS RAIN WAS THE PROOF THAT "HAS A BACKGROUND PROCESS" IS NOT THE
        TEST. v6 YARD ran 46 streaks on every single frame and still scored
        **4.96 · STATIC**, because at 3px wide and 34% alpha each streak
        downsamples to 0.7px before the metric differences it — and a viewer
        loses it just as completely. It was drizzle behind a floodlit set.
        Now 6px x 62px at 0.62, i.e. ~4x the painted area and twice the
        contrast, and it falls nearly twice as fast. Same object, same idea,
        finally at a size that exists. §1: LARGE x BRIGHT x FAST. */}
    {Array.from({ length: 40 }, (_, i) => (
      <div key={"rn" + i} style={{ position: "absolute",
        left: (rnd(i, 3) * (W + 200) - 100 + f * 2.2) % (W + 200) - 60,
        top: ((rnd(i, 8) * H + f * 46) % (H + 120)) - 60,
        width: 6, height: 62, borderRadius: 3, background: hexa("#DDEAF0", 0.62), zIndex: 26,
        transform: "rotate(11deg)" }} />
    ))}
    {/* the floodlight cutting through the weather — steep and driving */}
    <Rake f={f} c={w.key} n={7} w={130} gap={160} o={0.234 * lightK} speed={16}
      skew={-30} z={23} />
    {lamp}{occ}
  </>);

  if (k === "platform") return (<>{common}
    {/* EXTERIOR night station: canopy posts, rails, a departure board */}
    {Array.from({ length: 5 }, (_, i) => (
      <div key={"po" + i} style={{ position: "absolute", left: 64 + i * 220, top: 120, width: 22,
        height: 340, zIndex: 7, background: dkh(w.sky2, 0.3), boxShadow: SH_D }} />
    ))}
    <div style={{ position: "absolute", left: 0, top: 116, width: W, height: 26, zIndex: 8,
      background: dkh(w.sky2, 0.38) }} />
    {/* the rails, catching the platform light */}
    {[0, 1].map((i) => (
      <div key={"rl" + i} style={{ position: "absolute", left: -40, top: w.horizon + 96 + i * 46,
        width: W + 80, height: 8, zIndex: 14, background: hexa(w.lip, 0.85), borderRadius: 3 }} />
    ))}
    {/* the departure board — the deadline, as the place's own object */}
    <div style={{ position: "absolute", left: 300, top: 150, width: 420, height: 128, zIndex: 22,
      background: "#14161E", border: `6px solid ${dkh(w.sky2, 0.4)}`, borderRadius: 6, boxShadow: SH_D }}>
      {Array.from({ length: 3 }, (_, r) => (
        <div key={r} style={{ position: "absolute", left: 18, top: 16 + r * 34, right: 18, height: 22 }}>
          {Array.from({ length: 14 }, (_, c) => (
            <div key={c} style={{ position: "absolute", left: c * 27, top: 0, width: 22, height: 22,
              borderRadius: 3, background: hexa(GOLD, 0.20 + rnd(c + r * 7 + Math.floor(f / 9), 5) * 0.7) }} />
          ))}
        </div>
      ))}
    </div>
    <LitBank f={f} rows={1} cols={11} x={40} y={306} w={68} h={62} gapX={22} gapY={0}
      cols4={[GOLD, "#FFC97A", "#E8A45E", GOLD]} z={11} seed={31} />
    <Beam x={506} y={140} top={300} bot={880} len={430} c={w.key} o={0.125 * lightK} z={16} f={f} />
    {occ}
  </>);

  if (k === "roof") return (<>{common}
    {/* EXTERIOR dawn rooftop: the city below, vents, a parapet */}
    {/* ⭐⭐ THE CITY WAKES — this set's BACKGROUND PROCESS, and it is the single
        biggest motion lever in the reel. v6 scored **2.69, the worst scene**,
        for one structural reason: ROOF was the ONLY set with nothing running.
        Every other set has one (library a buzzing tube, yard rain, platform the
        departure board) and PLATFORM — the same reel, same push — scored 13.89.
        ⛔ WHY THE WINDOWS WERE WORTH NOTHING BEFORE: `rnd(i*3+w2, 6)` has NO `f`
        in it, so all 112 were frame-CONSTANT. They were painted, not animated.
        ⛔ AND WHY THEY MUST BE THIS BIG: scene_motion_audit downsamples the
        panel 1012->240 (a 0.237 factor) before differencing, so the old 12x16
        window became 2.8x3.8px and could not register even once lit. At 20x24
        it survives the downsample — which is the same reason it registers on a
        phone. §1: LARGE x BRIGHT x FAST, or it counts for nothing.
        ⛔ EACH WINDOW GETS ITS OWN STEPPED CLOCK, never one shared one. The
        departure board flips in unison because a flip-board really does; a city
        whose every window switched on the same frame would read as a strobe.
        The `+ i*13 + w2*7` phase offset is what makes it a city waking up. */}
    {Array.from({ length: 14 }, (_, i) => (
      <div key={"bl" + i} style={{ position: "absolute", left: i * 82 - 20,
        top: w.horizon - 60 - rnd(i, 4) * 150, width: 74, height: 200 + rnd(i, 9) * 130,
        zIndex: 5, background: hexa(dkh(w.sky2, 0.18), 0.72), borderRadius: 2 }}>
        {Array.from({ length: 9 }, (_, w2) => {
          /* a per-window clock, stepped (not eased) so the change lands inside
             one 10fps sample instead of being smeared across three */
          const tick = Math.floor((f + i * 13 + w2 * 7) / 11);
          const lit = rnd(i * 5 + w2 * 3 + tick, 7);
          return (
            <div key={w2} style={{ position: "absolute", left: 8 + (w2 % 3) * 22,
              top: 14 + Math.floor(w2 / 3) * 30, width: 20, height: 24, borderRadius: 2,
              background: hexa(GOLD, lit > 0.42 ? 0.22 + lit * 0.72 : 0.10) }} />
          );
        })}
      </div>
    ))}
    <div style={{ position: "absolute", left: -40, top: w.horizon - 34, width: W + 80, height: 40,
      zIndex: 13, background: mxh(w.ground, 0.1), borderTop: `5px solid ${w.lip}`, boxShadow: SH }} />
    {Array.from({ length: 3 }, (_, i) => (
      <div key={"vt" + i} style={{ position: "absolute", left: 60 + i * 360, top: w.horizon + 62,
        width: 96, height: 74, zIndex: 16, borderRadius: 8, background: dkh(w.ground2, 0.16),
        border: `4px solid ${dkh(w.ground2, 0.3)}`, boxShadow: SH }} />
    ))}
    <div style={{ position: "absolute", left: 0, top: 0, width: W, height: 260, zIndex: 4,
      background: `linear-gradient(180deg, ${hexa(w.key, 0.42 * lightK)}, transparent)` }} />
    {/* ⭐ DAWN BETWEEN THE TOWERS — this set's motivated practical, and the
        scene's real motion. The roof is the reel's brightest, earliest-light
        set, so raking sun through the gaps in the skyline is the one thing
        that belongs here AND is 12% of the panel wide. */}
    <Rake f={f} c={w.key} n={7} w={158} gap={172} o={0.281 * lightK} speed={13}
      skew={-15} z={24} />
    {lamp}{occ}
  </>);

  if (k === "exam") return (<>{common}
    {/* pale hall, a grid of empty desks, ONE skylight shaft */}
    {Array.from({ length: 12 }, (_, i) => {
      const r = Math.floor(i / 4), c = i % 4;
      return (
        <div key={"dk" + i} style={{ position: "absolute", left: 96 + c * 216 + r * 26,
          top: 250 + r * 74, width: 168 - r * 12, height: 44, zIndex: 6 + r, borderRadius: 5,
          background: dkh(w.sky2, 0.04 + r * 0.05), boxShadow: SH }} />
      );
    })}
    <div style={{ position: "absolute", left: 300, top: 0, width: 400, height: 90, zIndex: 5,
      background: `linear-gradient(180deg, ${w.key}, ${mxh(w.sky, 0.4)})`, borderRadius: 4,
      border: `6px solid ${dkh(w.sky2, 0.2)}` }} />
    <LitBank f={f} rows={1} cols={8} x={52} y={128} w={90} h={64} gapX={30} gapY={0}
      cols4={["#EEF2F6", "#BFD8F0", "#EEF2F6", "#A8C8E8"]} z={7} seed={41} />
    <Beam x={500} y={88} top={300} bot={700} len={470} c={w.key} o={0.203 * lightK} z={18} f={f} />
    <Motes x={500} y={140} w={420} h={380} n={14} f={f} z={19} c="#F2F6FA" />
    {/* the skylight tracking across the desks — the calmest rake in the reel */}
    <Rake f={f} c={w.key} n={6} w={192} gap={214} o={0.219 * lightK} speed={-8}
      skew={-11} z={23} />
    {occ}
  </>);

  /* board — EXTERIOR night notice board, the CTA's own place */
  return (<>{common}
    {Array.from({ length: 6 }, (_, i) => (
      <div key={"tr" + i} style={{ position: "absolute", left: 20 + i * 190,
        top: w.horizon - 210, width: 24, height: 210, zIndex: 5,
        background: hexa(dkh(w.sky2, 0.2), 0.8) }} />
    ))}
    <div style={{ position: "absolute", left: 130, top: 150, width: 760, height: 330, zIndex: 8,
      background: `linear-gradient(168deg, #A98A62, #7E6446)`, borderRadius: 8,
      border: `10px solid #5E4A33`, boxShadow: SH_D }}>
      {Array.from({ length: 16 }, (_, i) => (
        <div key={"nt" + i} style={{ position: "absolute", left: 24 + (i % 8) * 90,
          top: 22 + Math.floor(i / 8) * 150, width: 66, height: 88, borderRadius: 4,
          background: hexa("#F2EAD6", 0.30 + rnd(i, 3) * 0.24),
          transform: `rotate(${(rnd(i, 5) - 0.5) * 8}deg)` }} />
      ))}
    </div>
    {[220, 800].map((x, i) => (
      <div key={"lp" + i} style={{ position: "absolute", left: x, top: 90, width: 16, height: 90,
        zIndex: 18, background: dkh(w.sky2, 0.34) }} />
    ))}
    <Beam x={510} y={104} top={300} bot={900} len={420} c={w.key} o={0.187 * lightK} z={16} f={f} />
    {/* the two lamps sweeping the notice board — warm, wide, and the last
        thing moving before the hard cut */}
    <Rake f={f} c={w.key} n={7} w={144} gap={164} o={0.258 * lightK} speed={12}
      skew={-24} z={23} />
    {lamp}{occ}
  </>);
};

/* =========================================================================
   ⭐ THE CAST. Alex: *"different characters."* v1 used TWO costumes for the
   whole reel (glasses, beard). The house Mascot's costumes are additive pixel
   blocks and the body is NEVER restyled, so a new character is a costume prop
   plus a scale and a posture — cheap, and it is what makes each location feel
   populated rather than redressed.
   ⛔ NEVER a mark on the face: the body rect IS the face.
   ====================================================================== */
export const Extra: React.FC<{ f: number; x: number; y: number; s?: number;
  kind: "librarian" | "sparrer" | "guard" | "examiner" | "runner"; flip?: boolean }> =
  ({ f, x, y, s = 120, kind, flip }) => {
  /* ⛔ `judge` is NOT a Mascot costume — the real set is beard/chef/constr/cop/
     fro/girl/glasses/prof/samurai/suit/wizard. An unknown prop is silently
     ignored by the component, so the examiner would have rendered as a bare
     body and nothing would have errored. Checked against SlopKit before wiring. */
  const cos: any = { librarian: { prof: 1 }, sparrer: { samurai: 1 },
    guard: { cop: 1 }, examiner: { suit: 1, glasses: 1 }, runner: { constr: 1 } };
  return (
    <Cam z={42}>
      <div style={{ position: "absolute", left: x, top: y,
        transform: flip ? "scaleX(-1)" : undefined }}>
        <Mascot lf={f} size={s} gaze={flip ? -0.3 : 0.3} nodAmp={4.6} nodSpeed={11}
          {...(cos[kind] ?? {})} />
      </div>
    </Cam>
  );
};
