import React from "react";
import { useCurrentFrame } from "remotion";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D,
  Scene, Cam, Chip, Contact, Mark, MarkPlate,
  R, PLACES, asPlace, vivid, mono, ui, Rake, Ring, Puff, Pool, Steam, Fall, Motes,
  Crew, Hero, Forearm, costumeFor, squash, rock, shake, lerpHex, Runner, Sweat,
  Drum, Token, PipeRun, Collar, TOK, TOKD, TOKL, TOKX,
  CLAY, CLAYD, GOLD, GREEN, RED, SKY, PAPER, CREAMB, INK, MUTE, TEAL, STEEL,
  BRASS, SODIUM, VIOLET, EMBER, OXIDE, SLATE, PCB, COPPER,
} from "./UsgWorld";
import { PayHatch, JobCrate, MeterWall, MeterDial, RepoDisc, Dispenser } from "./UsgProps";
import { Room } from "./HwSets";

/* ===========================================================================
   REEL 126 · "USAGE" — THE HOOK CANDIDATES.

   ⛔⛔⛔ THE-OPEN STEP 1: three genuinely different WORLDS, each rendered at
   FULL CHASSIS QUALITY as its own composition, and one picked before the body
   is polished. Not one world in three colourways — if one sentence describes
   all three, there is one concept.

   ⛔⛔ AND "FULL CHASSIS" MEANS THE CHASSIS (reel 124). The preview comps mount
   the cream `Bg`, the `HookHeader` pill, the progress rail and the caption
   band, because three of the largest bright objects in the real frame are
   chrome — a preview that is not what ships is worse than no preview.

   ⭐ THE THREE, AND WHY THEY ARE DIFFERENT PICTURES:
     A · RATION — the SAME payment buying more. WIDE, a man and a machine.
     B · BRAKE  — the meter running away with him. TIGHT, one huge object.
     C · COLUMN — the weight of what a session spends. MEDIUM, vertical, comic.
   Different SHOT SIZES as well as different worlds: `docs/TRIAL-CUTS.md`
   measured a 12%-zoom "variant" spread as one shot three times, and
   `feedback_variants_need_shot_sizes` is that the tight cut sets the crop bound
   for the whole reel.

   ⛔ ALL THREE OBEY THE FOUR LAWS OF FRAME 0: bright (`hatch` and `drum` are
   the two rooms built for the >=140 mean at f0), the subject is a Claude and it
   is ON SCREEN at f0, the dreaded thing is recognisable with no narration, and
   the one big string is mute-readable at thumb distance.
   ⛔ A CUT IS NOT AN EVENT: each is ONE locked framing with ONE thing happening
   — a before state, a trigger, travel, and an arrival that costs something.

   ⛔⛔ THE GEOMETRY IS WORKED OUT, NOT EYEBALLED. Panel is 1012x792 panel-local
   with the cast on GY=706. The crop bound is `left >= 506 - 486/(push*cam.s)`,
   and at this reel's worst case (push 1.075 x cam.s 1.050 = 1.129) that is
   x 76..936 — every object below is inside it. The hero and the machine do not
   share x, and the claim board is on the opposite side of the frame from both.
   ========================================================================= */

export type HookId = "crew" | "ration" | "brake" | "column";
export const PICKED: HookId = "crew";

type HP = { v: "house" | "amber" | "steel"; dur: number };

/** the ground line the whole reel stands on */
const GY = 706;

/* =========================================================================
   ⭐ THE PICKED HOOK · CREW — "so you can now 10x your Claude usage for
   completely free with these three GitHub repos."

   ⛔⛔⛔ THE THING THAT WAS ACTUALLY WRONG, AND IT WAS MEASURABLE ALL ALONG.
   Alex: *"it needs to get to the actual eye-catching component much earlier
   on... each part needs to be way more animated even at zero... and it has to
   have a reasonable build up."*

   Pulled the word onsets out of the caption JSON, which is the check §10 exists
   for and which I had not run on this scene:

       f  0  So        f 18  your        f 46  free        f 72  GitHub
       f  7  now       f 22  Claude      f 55  with        f 78  repos
       f 10  10x       f 24  usage       f 65  3

   **"10x" is spoken at frame 10. The flood of Claudes it promises was arriving
   at frame 72.** Two and a third seconds of a three-and-a-half second hook went
   by before the picture caught up with the word. No amount of extra motion in
   those frames fixes that — the beat was simply on the wrong word.

   ⭐⭐ EVERY BEAT NOW LANDS ON ITS OWN WORD:
     f0-9              the machine is ALREADY STRAINING — steaming, juddering,
                       rotor turning, one lone Claude beside him. The camera
                       pushes in 8% over the first 20 frames.
     f10  "10x"        IT ERUPTS. Flap slams, steam blasts, and the first Claude
                       is fired out ON the word.
     f12-52 "your Claude usage"  ten of them pour out, one every four frames,
                       the counter climbing 1 -> 10 as they land.
     f65  "3"          mark one slams into its socket
     f72  "GitHub"     mark two
     f78  "repos"      mark three, and on that beat the machine goes to maximum:
                       the rotor doubles its rate, the shake peaks, and the whole
                       cast cheers.
   Two escalations, both on words, and the eye-catching thing at 0.33s.

   ⛔ AND THE COIN IS GONE. There is no payment in this sentence — I invented it
   from "completely free", which is about the REPOS being free, not about buying
   anything. A whole second of hook was spent on a mechanic the line does not
   contain, and that second is what the flood needed.
   ⛔ ZERO WORDS DRAWN. The counter's two digits are a number moving to its
   value, which is the house's own distinction.
   ====================================================================== */
export const HookCrew: React.FC<HP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("hatch");
  /* ⛔⛔⛔ ALL THREE CUTS OPEN ON THIS HOOK. `usage-amber` and `usage-steel` were
     wired to HookBrake and HookColumn, and every revision in this build went
     into HookCrew — 338 lines against their 110 and 101. Delivering them as
     they stood would have shipped two cuts opening on a version that predates
     the whole review (`feedback_trial_cuts_fall_behind`).
     ⭐ The variant lever becomes SHOT SIZE, which is what `docs/TRIAL-CUTS.md`
     measures as the strongest geometric axis (~21 bits of dHash) — wide, medium
     and tight on the same picture — on top of the per-cut rake pitch, grade,
     bed passage and caption band the chassis already varies. */
  const VC: Record<string, [number, number]> =
    { house: [1.00, 0], amber: [1.13, -18], steel: [1.27, -34] };
  const [vs, vy] = VC[v] ?? [1, 0];

  const HX = 172;                                   /* the actor, stage left */
  const MX = 506;                                   /* the machine, DEAD CENTRE */
  const MW = 780, MH = 430, MBASE = 640;            /* wide, SHORT, on legs */
  const MTOP = MBASE - MH;                          /* = 90 */
  /* every one of these is READ OFF the machine's own layout rather than typed,
     so a change to the housing cannot leave the discs seating into thin air */
  const SOCK_D = 216;
  const SOCK_Y = MTOP + 150 + SOCK_D / 2;           /* ⛔ MIRRORED in Dispenser */
  const SOCK_X = [MX - 232, MX, MX + 232];
  /* every beat is a WORD, not a guess. See the table above. */
  const ERUPT = 10, SEAT = [65, 72, 78];

  /* ⭐ THE CAMERA PUSHES IN over the first 20 frames, on top of the scene's own
     slow push. Asked for directly: *"start off the scene with the camera zooming
     in slightly."* It is a move INTO the machine, so it also makes the eruption
     feel like it is coming at you. */
  const zoom = E(f, 0, 20, 0, 0.085, OUT);

  const seated = SEAT.filter((t) => f >= t).length;
  /* ⛔ 0.0-0.5s WAS A STILL MACHINE. The camera crept, the wheel turned, and the
     other 96% of the frame did nothing. Two power surges sweep the cabinet — one
     on the open, one on the eruption — and the shut hatches STRAIN against
     whatever is behind them, hardest in the beat before they blow. */
  const surge = f < ERUPT ? E(f, 0, 11, 0, 1, IO) : E(f, ERUPT, ERUPT + 13, 0, 1, IO);
  /* ⭐ THE START JOLT. A machine coming under load kicks, and a decaying kick is
     the one event that moves the WHOLE frame — which is what 0.0-0.3s needed. */
  const jolt = f < 1 ? 0 : Math.exp(-(f - 1) / 3.0) * Math.sin((f - 1) * 1.45);
  const dstrain = 0.62 + E(f, 0, ERUPT, 0, 0.80, IO) - E(f, ERUPT + 4, ERUPT + 18, 0, 0.50, IO);
  /* the rotor: turning at f0, faster on the eruption, faster again per mark */
  const rate = 1.4 + E(f, 0, 16, 0, 10.2, OUT) + E(f, ERUPT, ERUPT + 8, 0, 5.0, OUT)
             + seated * 3.4;
  const spinDeg = -140 + f * rate + E(f, 0, 14, 0, 220, OUT);
  const boot = E(f, 0, 11, 0, 1, OUT);

  /* ⭐ THE MACHINE IS ALIVE FROM FRAME 0 and it gets worse. `strain` drives the
     judder, the steam rate and the flap, so there is one number to author and
     the parts cannot disagree with each other. */
  const strain = 0.34 + E(f, 0, 12, 0, 0.20, OUT)
               + E(f, ERUPT - 3, ERUPT + 6, 0, 0.42, OUT)
               + seated * 0.10
               - E(f, 92, 106, 0, 0.30, IO);
  const jx = Math.sin(f * 1.9) * strain * 7 + jolt * 9;
  const jy = Math.cos(f * 2.6) * strain * 4.4 - jolt * 16;

  const flap = E(f, ERUPT, ERUPT + 4, 0, 1, OUT);

  /* ⭐⭐ THE TEN, POURING FROM THE WORD "10x". One every four frames across
     "your Claude usage", four ranks receding, the nearest 232px and partly
     cropped by the panel edge. */
  const RANK = [
    { dy: 30, size: 208, z: 74, tint: undefined as string | undefined },
    { dy: -2, size: 176, z: 60, tint: undefined as string | undefined },
    { dy: -36, size: 148, z: 52, tint: "#C4603A" },
    { dy: -66, size: 124, z: 46, tint: CLAYD },
  ];
  const CREWN = [
    { x: 506, r: 0 }, { x: 806, r: 1 }, { x: 214, r: 1 }, { x: 660, r: 2 },
    { x: 356, r: 2 }, { x: 128, r: 2 }, { x: 900, r: 3 }, { x: 748, r: 3 },
    { x: 268, r: 3 }, { x: 116, r: 3 },
  ].map((c, i) => ({ ...c, at: ERUPT + 2 + i * 4.0 }));
  const out = CREWN.filter((c) => f >= c.at + 16).length;

  const CHUTE = { x: MX, y: MBASE + 20 };
  const peak = E(f, SEAT[2], SEAT[2] + 10, 0, 1, OUT);

  return (
    <Scene p={p} slug="" push={[0, dur, 1.045]} vig={0.30} glow={hexa(p.key, 0.30)}>
      <Cam s={(1 + zoom + jolt * 0.014) * vs} y={-zoom * 26 + jolt * 11 + vy} z={5}>
      <Room p={p} f={f} bands={1} kind="rack" overhead="lampbar" rake={0.10}
        rakeRate={5.0} rakeN={7} floorKind="slab" grit={0.5}
        lamp={{ x: MX, y: 250, r: 430 }} />
      <MeterWall y={132} f={f} z={20} cols={11} rows={2} live={1} c="#CCAA6E" />

      {/* ⛔ THE OCCLUDER — the mass cropped by the panel edge, IN FRONT. */}
      <div style={{ position: "absolute", left: -54, top: 196, width: 110, height: 660,
        zIndex: 76, borderRadius: 6,
        background: `linear-gradient(96deg, #1C2126 0%, #0B0E11 62%, #04060A 100%)` }} />
      <Collar x={46} y={442} s={1.3} z={77} />

      <PipeRun y={310} f={f} z={24} h={62} rate={16 + seated * 4} pitch={108} c={COPPER} />
      <Pool x={506} y={GY - 16} w={1010} c={p.key} o={0.98} />
      {/* ⭐ THE MACHINE STANDS IN ITS OWN LIGHT. The luma has to come from BRIGHT
          AREA, and a wide floor pool under a dark cabinet is the one place it can
          come from without lifting the iron back off its dark stop. */}
      <div style={{ position: "absolute", left: 506 - 470, top: GY - 118, width: 940, height: 210,
        zIndex: 3, borderRadius: "50%", filter: "blur(26px)",
        background: `radial-gradient(ellipse, ${hexa("#FFD9A2", 0.50)} 0%, ${hexa("#FFD9A2", 0.16)} 52%, ${hexa("#FFD9A2", 0)} 76%)` }} />

      {/* ⭐ THE MACHINE, JUDDERING. The whole cabinet rides a shake wrapper so
             every part of it moves together — a machine whose face shakes and
             whose feet do not is a graphic, not an object. */}
      <div style={{ position: "absolute", inset: 0, zIndex: 36,
        transform: `translate(${jx}px, ${jy}px)` }}>
        <Dispenser x={MX} y={MBASE} w={MW} h={MH} z={36} f={f}
          filled={seated} lit={0.34 + seated * 0.20} open={flap} seatAt={SEAT}
          portOpen={SEAT.map((at) => E(f, at - 11, at - 2, 0, 1, OUT))}
          surge={surge} strain={dstrain}
          boot={boot} spin={spinDeg} />
      </div>

      {/* ⭐ AND IT STEAMS, FROM FRAME 0. Three vents along its head, rate tied to
             the same `strain` that drives the judder. */}
      {[MX - 300, MX, MX + 300].map((sx, i) => (
        <Steam key={"st" + i} x={sx} y={MTOP + 30} f={f} at={i * 3}
          n={5} z={38} s={0.9 + strain * 0.5} rate={0.7 + strain * 1.6} />
      ))}
      {/* the eruption blast — one big vent burst ON the word "10x" */}
      {f >= ERUPT && f < ERUPT + 26 && (<>
        <Steam x={MX - 396} y={MTOP + 250} f={f} at={1} n={7} z={70} s={1.35} rate={2.0} />
        <Steam x={MX + 396} y={MTOP + 250} f={f} at={5} n={7} z={70} s={1.35} rate={2.0} />
        <Steam x={MX - 350} y={MTOP + 190} f={f} at={ERUPT} n={9} z={70} s={1.6} rate={2.2} />
        <Steam x={MX + 350} y={MTOP + 190} f={f} at={ERUPT} n={9} z={70} s={1.6} rate={2.2} />
        <Ring x={MX} y={CHUTE.y} f={f} at={ERUPT} c={GOLD} z={72} />
      </>)}

      {/* the three marks, ON "3 / GitHub / repos" */}
      {SEAT.map((at, i) => {
        /* ⛔ THE PAUSE. These launched at `at - 18` from 600px off the panel, so
           they spent 14 of their 18 frames invisible: the crowd finished erupting
           at f48 and NOTHING moved until f56. The seats cannot move — f65/72/78
           land exactly on "3" / "GitHub" / "repos" — so the APPROACH is what had
           to change. They now launch during the eruption, enter frame small and
           far off, CRUISE (55% of the distance across 72% of the time), then
           cover the last 45% in the final 28% — which is the slam, and which is
           where the blur comes from. */
        const LAUNCH = [22, 30, 38][i];
        if (f < LAUNCH) return null;
        const span = at - LAUNCH;
        const kOf = (ff: number) => {
          const t = Math.max(0, Math.min(1, (ff - LAUNCH) / span));
          return t < 0.72 ? (t / 0.72) * 0.55
                          : 0.55 + ((t - 0.72) / 0.28) ** 2 * 0.45;
        };
        const k = kOf(f);
        /* ⛔ THEY WERE STILL INVISIBLE FOR HALF THE FLIGHT. Launching from just
           off the panel edge is not enough — the hook pushes to Cam s=1.085, so
           the visible window is only x 40..972 and a disc at x=-60 is nowhere
           near it (`feedback_the_crop_bound_includes_cam`). They now launch
           INSIDE the frame, high and small, and come forward out of the room's
           depth: 52px at the back wall, 216px in the socket. */
        const from: [number, number] = [[168, 182], [506, 132], [846, 190]][i] as [number, number];
        const ARC = [40, 0, 40][i];
        const TO: [number, number] = [SOCK_X[i], SOCK_Y] as [number, number];
        const ptAt = (kk: number): [number, number] =>
          [from[0] + (TO[0] - from[0]) * kk,
           from[1] + (TO[1] - from[1]) * kk - ARC * Math.sin(Math.PI * kk)];
        const [px, py] = ptAt(k);
        const [qx, qy] = ptAt(kOf(f - 1));
        /* it arrives OUT OF DEPTH — 42% size at launch, full size in the socket.
           A disc that only translates reads as a sticker sliding; one that grows
           reads as a thing crossing a room. */
        const dep = 0.40 + 0.60 * k;
        /* ⛔ `seat` IS RepoDisc's OPACITY. It was written for an 18-frame flight
           where the travel fraction doubled as a reveal ramp; on a 43-frame
           approach the same value renders the disc at 6-30% opaque for the whole
           cruise — drawn, in frame, and invisible. The reveal is its own short
           ramp at launch; the flight is fully opaque. */
        const vis = E(f, LAUNCH, LAUNCH + 5, 0.15, 1, OUT);
        const vx = px - qx, vy = py - qy;
        const spd = Math.hypot(vx, vy);                 /* px travelled last frame */
        const blur = Math.min(22, spd * 0.12);
        const rec = squash(f - at, 6, 0.22, 3, 11);
        const LOGO = ["deepseek.svg", undefined, "github.svg"][i];
        const ROT = (1 - k) * (i === 1 ? 170 : (i ? -150 : 150));
        return (<React.Fragment key={"rd" + i}>
          {/* the approach halo — a disc at 40% size against a wall of brass
              counters has no edge of its own to be seen by; this gives it one,
              and it fades out as the disc gets big enough to carry itself */}
          {k < 0.72 && (
            <div style={{ position: "absolute", left: px - SOCK_D * dep * 0.86,
              top: py - SOCK_D * dep * 0.86, width: SOCK_D * dep * 1.72,
              height: SOCK_D * dep * 1.72, borderRadius: "50%", zIndex: 63,
              filter: "blur(14px)", opacity: 0.30 + (1 - k / 0.72) * 0.52,
              background: `radial-gradient(circle, ${hexa(GOLD, 0.52)} 0%, ${hexa(GOLD, 0.16)} 46%, ${hexa(GOLD, 0)} 72%)` }} />
          )}
          {/* ⭐ THE STREAK. These discs cross ~900px in 18 frames, so the last one
              covers ~120px — at 30fps that IS a smear, and drawing it sharp is what
              made the arrival read as a paste instead of a throw. Three ghosts laid
              back along the travel vector, each blurred harder than the one in
              front, plus a speed-driven blur on the disc itself. Both fall to zero
              on the seating frame, so the logo lands crisp. */}
          {blur > 0.6 && [0, 1, 2].map((gi) => {
            const b = (gi + 1) / 4;
            const [gx, gy] = [px - vx * b * 1.2, py - vy * b * 1.2];
            return (
              <div key={"gh" + gi} style={{ position: "absolute", inset: 0, zIndex: 64,
                opacity: (1 - b) * 0.50 * Math.min(1, blur / 4.5),
                filter: `blur(${blur * (0.8 + b * 1.6)}px)` }}>
                <RepoDisc x={gx} y={gy} d={SOCK_D * dep} z={64} f={f} seat={vis}
                  logo={LOGO} rock={i === 1} c={[SLATE, OXIDE, PCB][i]} rot={ROT} />
              </div>
            );
          })}
          <div style={{ position: "absolute", inset: 0, zIndex: 66,
            transform: `scale(${rec})`, transformOrigin: `${px}px ${py}px`,
            filter: blur > 0.6 ? `blur(${blur * 0.40}px)` : undefined }}>
            <RepoDisc x={px} y={py} d={SOCK_D * dep} z={66} f={f} seat={vis}
              logo={LOGO} rock={i === 1} c={[SLATE, OXIDE, PCB][i]} rot={ROT} />
          </div>
          {/* ⭐ THE RING THAT RIMS THE LOGO. The collar's glow lives BEHIND the
              disc, so once a 216px logo seats into a 276px collar only a 30px
              annulus of it is left — the halo reads, the RING does not. This one
              sits ON TOP of the seated disc at its own edge, so each logo is
              actually ringed in light rather than merely lit from behind. */}
          {f >= at && (() => {
            const sf = f - at;
            const pop = Math.max(0, 1 - sf / 20) ** 1.4;        /* the seat flare */
            const idle = 0.5 + 0.5 * Math.sin(f * 0.24 - i * 1.15);
            const gg = 0.42 + idle * 0.24 + pop * 1.1;
            return (
              <div style={{ position: "absolute", left: TO[0] - SOCK_D / 2 - 7,
                top: TO[1] - SOCK_D / 2 - 7, width: SOCK_D + 14, height: SOCK_D + 14,
                borderRadius: "50%", zIndex: 68, pointerEvents: "none",
                border: `${6 + pop * 8}px solid ${hexa(GOLD, Math.min(0.95, 0.34 + gg * 0.44))}`,
                boxShadow: `0 0 ${18 + gg * 46}px ${hexa(GOLD, Math.min(0.85, 0.22 + gg * 0.46))}, `
                  + `inset 0 0 ${12 + gg * 26}px ${hexa(SODIUM, 0.20 + gg * 0.34)}` }} />
            );
          })()}
          {f >= at && f < at + 22 && <Ring x={TO[0]} y={TO[1]} f={f} at={at} c={GOLD} z={70} />}
          {f >= at && f < at + 24 && <Puff x={TO[0]} y={TO[1] + 96} f={f} at={at}
            c="#E4CE9E" z={71} n={9} s={1.2} />}
        </React.Fragment>);
      })}

      {/* the ONE he had before it erupted — he is not starting from nothing */}
      {f < ERUPT + 14 && (
        <Crew f={f} x={HX + 176} y={GY + 4} i={2} size={162} z={58} at={0} loop={1} />
      )}

      {/* ⭐⭐ THE TEN. Each fires out of the chute on a real arc, lands with a
             squash and a puff, and immediately runs one of the four action
             loops — an arrival that just appears is a state change, not an
             event. */}
      {CREWN.map((c, i) => {
        if (f < c.at) return null;
        const R2 = RANK[c.r];
        const fly = E(f, c.at, c.at + 16, 0, 1, OUT);
        const x = CHUTE.x + (c.x - CHUTE.x) * fly;
        const hop = Math.sin(fly * Math.PI) * (186 - c.r * 26);
        const y = GY + 4 + R2.dy - hop;
        return (<React.Fragment key={"cw" + i}>
          <Crew f={f} x={x} y={y} i={i + 3} size={R2.size} z={R2.z}
            at={c.at} loop={i % 4} tint={R2.tint}
            cheer={Math.max(f > c.at + 20 ? 0.5 : 0, peak * 0.9)} />
          {f >= c.at + 16 && f < c.at + 34 &&
            <Puff x={c.x} y={GY + 6 + R2.dy} f={f} at={c.at + 16} c={p.grit}
              z={R2.z - 1} n={7} s={0.8 + (3 - c.r) * 0.16} />}
        </React.Fragment>);
      })}
      {CREWN.filter((c) => f >= c.at + 16).map((c, i) => (
        <Contact key={"cc" + i} x={c.x - RANK[c.r].size * 0.40} y={GY + 6 + RANK[c.r].dy}
          w={RANK[c.r].size * 0.80} o={0.40 - c.r * 0.06} z={RANK[c.r].z - 2} />
      ))}
      {/* the chute firing — the machine is visibly the SOURCE */}
      {CREWN.filter((c) => f >= c.at && f < c.at + 12).map((c, i) => (
        <Puff key={"mz" + i} x={CHUTE.x} y={CHUTE.y + 30} f={f} at={c.at} c="#F0E0B8"
          z={60} n={6} s={1.0} />
      ))}

      {/* THE HERO — what he DOES is stand in a machine going off around him. */}
      <Hero f={f} x={HX} y={GY} size={252} z={62}
        costume={{ constr: 1 }} act={3} ph={0.3}
        strain={strain * 0.30}
        shock={E(f, ERUPT, ERUPT + 6, 0, 1, OUT) * (1 - E(f, ERUPT + 16, ERUPT + 34, 0, 1, IO))}
        cheer={Math.max(E(f, 30, 56, 0, 0.9, IO), peak)}
        gaze={f < ERUPT ? 0.5 : 0.15}
        stern={f < ERUPT ? 0.6 : 0} />
      <Contact x={HX - 94} y={GY + 4} w={188} o={0.44} z={41} />
        {/* ⛔ THE TAIL WENT STILL. All three seat by f78 and the last 19 frames
            were three logos sitting in a machine — the weakest band in the hook
            by a wide margin. A loaded machine RUNS: it delivers, and what it
            delivers is the thing the whole reel is about. */}
        {f > SEAT[2] + 2 && Array.from({ length: 26 }, (_, i) => {
          const at = SEAT[2] + 3 + i * 0.9;
          if (f < at) return null;
          const t = ((f - at) / 15) % 1;
          const lane = (i % 7 - 3) * 74;
          return (
            <div key={"dl" + i} style={{ position: "absolute", inset: 0, zIndex: 78,
              opacity: t < 0.8 ? Math.min(1, t * 5) : (1 - t) / 0.2 }}>
              <Token x={MX + lane + lane * t * 0.9} y={MBASE - 10 + t * t * 96}
                s={0.72 + t * 0.44} z={78} f={f} spin={t * 340 + i * 29} />
            </div>
          );
        })}
        {f > SEAT[2] + 2 && [MX - 210, MX, MX + 210].map((sx, i) => (
          <Puff key={"dp" + i} x={sx} y={MBASE + 26} f={f} at={SEAT[2] + 4 + i * 3}
            c="#E4CE9E" z={77} n={8} s={1.25} />
        ))}
        {/* and the machine itself finally at full chat */}
        {f > SEAT[2] && [MX - 330, MX + 330].map((sx, i) => (
          <Steam key={"ds" + i} x={sx} y={MTOP + 120} f={f} at={SEAT[2] + 1 + i * 2}
            n={10} z={72} s={1.7} rate={2.6} />
        ))}
        {/* ⭐ THE ROOM DIMS AS THE MACHINE LOADS. Three bright discs seating into
            a bright cabinet left nothing in frame darker than mid-grey (p10 71) —
            the exact pale drift the look gate exists to catch. The machine drawing
            power is the motivation, and it makes the discs POP instead of merging
            with the wall. */}
        <div style={{ position: "absolute", inset: 0, zIndex: 92, pointerEvents: "none",
          background: `radial-gradient(ellipse 76% 58% at 50% 46%, ${hexa("#000", 0)} 0%, ${hexa("#000", seated * 0.075)} 54%, ${hexa("#000", seated * 0.155)} 100%)` }} />
        <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 168,
          zIndex: 91, pointerEvents: "none",
          background: `linear-gradient(180deg, ${hexa("#000", seated * 0.13)} 0%, ${hexa("#000", 0)} 100%)` }} />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   A · RATION — THE PICKED HOOK.
   VO: "So you can now 10x your Claude usage for completely free with these
        three GitHub repos."

   ⭐ §3, THE TEST THAT PICKED IT: write the VO line beside the shot and ask what
   the picture ADDS. The sentence's promise is MORE USAGE FOR THE SAME MONEY —
   not a smaller bill. A falling number cannot show that. One coin buying almost
   nothing, then the SAME coin burying him, shows it and needs no narration.

   THE EVENT, in four parts:
     BEFORE   f0-10   one hero at the machine holding ONE brass token up at the
                      slot. Nothing else stands on the floor.
     TRIGGER  f10-22  he posts it. The mouth flaps and pays out ONE small crate.
                      He looks at it and scowls. The dread lands by ~0.7s.
     TRAVEL   f28-62  three repo plates fire in from off-frame across real
                      distance and SEAT into the rail above the hatch, one two
                      three, each with a recoil, a ring and a credit lamp.
     ARRIVAL  f68-end the SAME token goes back in and the hatch dumps eleven
                      crates that bury him to the shoulders. The arrival costs
                      something: he is driven down 30px and the floor puffs.

   GEOMETRY (panel-local): hero x 430 +-134 · hatch face x 452..820 · plate rail
   y 214 across x 400..884 · tariff board x 214 +-151, clear of both.
   ====================================================================== */
export const HookRation: React.FC<HP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("hatch");

  /* ⛔⛔⛔ REBUILT AFTER THE FIRST CUT. Alex: *"there shouldn't be any text
     inside of this animation... it's at the hook. And it's not hierarchical
     enough, it's too much text, and it's also too small."*
     Counted on the rejected frame: TARIFF · 3 FREE REPOS · ONE SESSION ·
     1 TOKEN · $ SPENT · 01 · 02 · 03 · three repo names · three star counts ·
     three licences · eleven DONE dockets. **Twenty-plus strings, none over 40px,
     in a shot whose whole job is ONE image.**

     ⭐ WHAT REPLACED THEM, and it is one substitution repeated:
       the tariff board (4 strings)      -> A GIANT DIAL. A needle in the red is
                                            read in 200ms by anyone, in any
                                            language, at thumbnail size. That is
                                            what THE-OPEN law 4 is actually for.
       three repo plates (9 strings)     -> THREE REAL MARKS at 232px, no names.
                                            At half a second a viewer RECOGNISES
                                            a mark; they do not read a name.
       the token's stamped "C"           -> the REAL Claude mark.
       the hatch sign, the bay stencils,
       the drum unit, the crate dockets  -> deleted outright.
     ⛔ ZERO WORDS ARE DRAWN INSIDE THIS PANEL. The only type in frame is the
     chassis: the HookHeader pill and the caption band, both outside the scene.

     ⭐ AND THE HIERARCHY IS NOW ARITHMETIC, not taste. Hero 540px = 53% of the
     panel width against 31.6% before; the dial is 470px = 46%; the token 250px.
     Three objects, in a 3:2.7:1.4 size ladder, on an otherwise empty floor. */

  const HX = 236;                                   /* the actor, stage left */
  const DIAL = { x: 506, y: 296, d: 440 };          /* the villain, dead centre */
  const RAIL = 850;                                 /* the cartridge rail, right */
  const POST1 = 6, PAY1 = 17;
  const SEAT = [24, 36, 48];
  const POST2 = 64, BURST = 72;

  const post1 = E(f, POST1, POST1 + 9, 0, 1, IO);
  const crate1 = E(f, PAY1 + 2, PAY1 + 12, 0, 1, OUT);
  const seated = SEAT.filter((t) => f >= t).length;
  const post2 = E(f, POST2, POST2 + 8, 0, 1, IO);
  const flap = E(f, PAY1, PAY1 + 5, 0, 1, OUT) - E(f, PAY1 + 14, PAY1 + 21, 0, 1, IO)
             + E(f, BURST, BURST + 4, 0, 1, OUT);

  /* the needle: pegged in the red, and each disc that locks on drags it back.
     ⛔ IT NEVER REACHES ZERO — the villain's rule holds in its own hook. */
  const needle = 0.93 - seated * 0.24 - E(f, BURST, BURST + 14, 0, 0.06, IO);

  /* the burial — eleven crates in four ranks, six of them IN FRONT of him,
     arrivals spread across the whole tail */
  const HEAP = [
    { x: 792, r: 0, s: 0.86, fr: false }, { x: 636, r: 1, s: 0.80, fr: true },
    { x: 890, r: 0, s: 0.74, fr: false }, { x: 500, r: 0, s: 0.90, fr: true },
    { x: 724, r: 1, s: 0.78, fr: false }, { x: 372, r: 0, s: 0.88, fr: true },
    { x: 852, r: 1, s: 0.70, fr: false }, { x: 566, r: 2, s: 0.76, fr: true },
    { x: 258, r: 0, s: 0.80, fr: true },  { x: 434, r: 1, s: 0.74, fr: true },
    { x: 668, r: 3, s: 0.68, fr: true },
  ].map((c, i) => ({ ...c, at: BURST + 2 + i * 2.2,
                     rest: GY + 8 - c.r * 78, rot: (rnd(i, 3) - 0.5) * 30 }));
  const buried = E(f, BURST + 6, BURST + 28, 0, 1, OUT);
  const sink = buried * 36;
  const shockV = E(f, BURST + 2, BURST + 7, 0, 1, OUT)
    * (1 - E(f, BURST + 15, BURST + 34, 0, 1, IO));

  /* the token's path — held overhead, then posted into the mouth at the base */
  const HAND = { x: 470, y: 448 };                  /* held out at the slot, clear of him */
  const THROAT = { x: 440, y: 554 };
  const MOUTH = { x: 556, y: 600 };
  const tokX = (k: number) => HAND.x + (THROAT.x - HAND.x) * k;
  const tokY = (k: number) => HAND.y + (THROAT.y - HAND.y) * k;

  return (
    <Scene p={p} slug="" push={[0, dur, 1.050]} vig={0.34} glow={hexa(p.key, 0.30)}>
      <Room p={p} f={f} bands={1} kind="rack" overhead="lampbar" rake={0.10}
        rakeRate={5.0} rakeN={7} floorKind="slab" grit={0.5}
        lamp={{ x: 506, y: 258, r: 430 }} />

      {/* ⛔ THE OCCLUDER — the mass cropped by the panel edge, IN FRONT. */}
      <div style={{ position: "absolute", left: -54, top: 200, width: 112, height: 660,
        zIndex: 74, borderRadius: 6,
        background: `linear-gradient(96deg, #1C2126 0%, #0B0E11 62%, #04060A 100%)` }} />
      <Collar x={48} y={446} s={1.35} z={75} />

      {/* the supply belt — the room's background process, and the reel's biggest
          single motion lever. It runs behind the machine, not across the hero. */}
      <PipeRun y={190} f={f} z={16} h={70} rate={15} pitch={112} c={COPPER} />

      <Pool x={506} y={GY - 12} w={1010} c={p.key} o={0.76} />

      {/* ⭐⭐ THE ONE DOMINANT OBJECT. 470px of gauge, dead centre, with the
          needle pegged in the red on frame 0 and nothing to read. */}
      <MeterDial x={DIAL.x} y={DIAL.y} d={DIAL.d} z={34} f={f} v={needle}
        lugs={3} filled={seated} />

      {/* the machine's BASE: a plinth under the dial with a coin throat and a
          delivery mouth. No sign, no words — a slot and a hole. */}
      <div style={{ position: "absolute", left: 300, top: 512, width: 412, height: 204,
        zIndex: 30, borderRadius: 8, boxShadow: SH_D,
        background: `linear-gradient(168deg, #4A535E 0%, #2C333B 46%, #161B21 100%)`,
        border: `4px solid #0A0E12` }}>
        {/* a louvred cooling grille and its rivets — a machine has a face */}
        {Array.from({ length: 7 }, (_, i) => (
          <div key={"lv" + i} style={{ position: "absolute", left: 26, top: 22 + i * 15,
            width: 118, height: 7, borderRadius: 3, background: hexa("#000", 0.46),
            borderTop: `2px solid ${hexa("#7A848E", 0.30)}` }} />
        ))}
        {[[14, 14], [394, 14], [14, 186], [394, 186]].map(([bx, by], i) => (
          <div key={"rv" + i} style={{ position: "absolute", left: bx - 7, top: by - 7,
            width: 14, height: 14, borderRadius: 7,
            background: `radial-gradient(circle at 34% 30%, #78828C, #20262C)` }} />
        ))}
      </div>
      {/* the coin throat */}
      <div style={{ position: "absolute", left: 382, top: 534, width: 116, height: 40,
        zIndex: 32, borderRadius: 5,
        background: `linear-gradient(180deg, ${mxh(BRASS, 0.56)} 0%, ${mxh(BRASS, 0.04)} 100%)`,
        border: `3px solid ${dkh(BRASS, 0.56)}` }}>
        <div style={{ position: "absolute", left: 18, top: 13, width: 80, height: 14,
          borderRadius: 7, background: "#04060A" }} />
      </div>
      {/* the delivery mouth — a real hole: full depth, square corners, light on
          the lip below it rather than inside it */}
      <div style={{ position: "absolute", left: 430, top: 596, width: 254, height: 112,
        zIndex: 31, background: "#03050A", borderRadius: 3,
        boxShadow: `inset 0 10px 20px ${hexa("#000", 0.96)}` }} />
      <div style={{ position: "absolute", left: 424, top: 588, width: 266, height: 12,
        zIndex: 32, background: `linear-gradient(180deg, #5A6470 0%, #1C2228 100%)` }} />
      <div style={{ position: "absolute", left: 438, top: 600, width: 238, height: 62,
        zIndex: 33, transformOrigin: "50% 0%",
        transform: `rotateX(${Math.max(0, Math.min(1, flap)) * 78}deg)`,
        background: `linear-gradient(180deg, #333B44 0%, #1A1F25 100%)` }} />
      <div style={{ position: "absolute", left: 424, top: 700, width: 266, height: 14,
        zIndex: 32, borderRadius: 3,
        background: `linear-gradient(180deg, ${mxh(SODIUM, 0.62)} 0%, ${mxh(SODIUM, 0.02)} 100%)` }} />

      {/* the rail the cartridges clip onto */}
      <div style={{ position: "absolute", left: RAIL - 12, top: 150, width: 24, height: 448,
        zIndex: 32, borderRadius: 6,
        background: `linear-gradient(96deg, ${mxh(STEEL, 0.26)} 0%, ${dkh(STEEL, 0.52)} 100%)` }} />
      {[210, 372, 534].map((ry) => (
        <div key={ry} style={{ position: "absolute", left: RAIL - 34, top: ry - 12, width: 68,
          height: 24, zIndex: 33, borderRadius: 4,
          background: `linear-gradient(180deg, ${mxh(STEEL, 0.20)} 0%, ${dkh(STEEL, 0.56)} 100%)` }} />
      ))}

      {/* ⭐ THREE REAL MARKS, 170px, arriving from three directions and locking
          into the dial's own sockets. No names, no star counts, no licences —
          those move to the body, where the header band carries them and the
          viewer has already committed. */}
      {SEAT.map((at, i) => {
        if (f < at - 20) return null;
        const k = E(f, at - 20, at, 0, 1, IN_Q);
        const from: [number, number] = [[1520, 200], [1520, 372], [1520, 544]][i] as [number, number];
        /* ⭐ their own vertical RAIL down the right of the gauge: three cartridges
           clipping on, clear of the hero, clear of the token, never overlapping
           each other. Each one that seats drags the needle back a third. */
        const TO: [number, number] = [[RAIL, 210], [RAIL, 372], [RAIL, 534]][i] as [number, number];
        const px = from[0] + (TO[0] - from[0]) * k;
        const py = from[1] + (TO[1] - from[1]) * k;
        const rec = squash(f - at, 6, 0.20, 3, 11);
        return (<React.Fragment key={"rd" + i}>
          <div style={{ position: "absolute", inset: 0, zIndex: 64,
            transform: `scale(${rec})`, transformOrigin: `${px}px ${py}px` }}>
            <RepoDisc x={px} y={py} d={170} z={64} f={f} seat={Math.max(0.06, k)}
              logo={["deepseek.svg", undefined, "github.svg"][i]}
              rock={i === 1} c={[SLATE, OXIDE, PCB][i]}
              rot={(1 - k) * (i === 1 ? 180 : (i ? -140 : 140))} />
          </div>
          {f >= at && f < at + 22 && <Ring x={TO[0]} y={TO[1]} f={f} at={at} c={GOLD} z={68} />}
          {f >= at && f < at + 24 && <Puff x={TO[0]} y={TO[1] + 46} f={f} at={at}
            c="#E4CE9E" z={69} n={8} />}
        </React.Fragment>);
      })}

      {/* THE TOKEN — held OVERHEAD at 250px, posted, and posted again. The same
          coin twice is the whole argument, so it is the same object both times,
          and it carries the real Claude mark rather than a letter. */}
      {f < PAY1 + 1 && (<>
        <Forearm x0={HX + 96} y0={GY - 186} x1={tokX(post1)} y1={tokY(post1) + 42}
          c={CLAY} z={69} />
        <Token x={tokX(post1)} y={tokY(post1)} s={2.1} z={70} f={f} spin={f * 0.12} />
      </>)}
      {f >= POST2 - 1 && f < BURST + 2 && (<>
        <Forearm x0={HX + 96} y0={GY - 186} x1={tokX(post2)} y1={tokY(post2) + 42}
          c={CLAY} z={69} />
        <Token x={tokX(post2)} y={tokY(post2)} s={2.1} z={70} f={f} spin={f * 0.18} />
      </>)}

      {/* the FIRST payout — ONE small crate, and it is small on purpose. The
          absence of anything else is the joke, and the sound design agrees. */}
      {f >= PAY1 + 2 && f < BURST && (
        <JobCrate x={556} y={GY + 6 - (1 - crate1) * 90} s={0.52} z={58} f={f}
          rot={-4 + crate1 * 6} />
      )}
      {f >= PAY1 + 11 && f < PAY1 + 30 && (
        <Puff x={556} y={GY + 6} f={f} at={PAY1 + 11} c={p.grit} z={60} n={6} />
      )}

      {/* the BURIAL */}
      {HEAP.map((c, i) => {
        if (f < c.at) return null;
        const fall = E(f, c.at, c.at + 9, 0, 1, IN_Q);
        const settle = E(f, c.at + 9, c.at + 16, 0, 1, OUT);
        const y = MOUTH.y + (c.rest - MOUTH.y) * fall;
        return (
          <JobCrate key={"cr" + i} x={c.x} y={y} s={c.s} z={c.fr ? 66 : 55 + (i % 3)} f={f}
            rot={c.rot * (0.35 + fall * 0.65) + settle * 3} />
        );
      })}
      {HEAP.filter((c) => f >= c.at + 8 && f < c.at + 26).map((c, i) => (
        <Puff key={"pf" + i} x={c.x} y={c.rest + 2} f={f} at={c.at + 8} c={p.grit} z={67} n={7} />
      ))}

      {/* ⭐ THE HERO AT 540px — 53% of the panel against 31.6% in the rejected
          cut. One figure, one machine, three marks, and nothing else standing on
          the floor. */}
      <Hero f={f} x={HX} y={GY + sink} size={340} z={62}
        costume={{ constr: 1 }} act={3} ph={0.3}
        drive={post1 * 0.45 + post2 * 0.45}
        reach={(f < PAY1) || (f >= POST2 && f < BURST) ? 186 : 108}
        shock={shockV}
        cheer={buried * 0.92}
        gaze={f > PAY1 + 3 && f < SEAT[0] ? 0.85 : (f > BURST + 8 ? 0.15 : 0)}
        stern={f > PAY1 + 5 && f < SEAT[0] ? 0.85 : 0} />
      <Contact x={HX - 125} y={GY + 4 + sink} w={250} o={0.44} z={41} />
    </Scene>
  );
};

/* =========================================================================
   B · BRAKE — the meter running away with him. TIGHT, one huge object.
   The dreaded thing is the number climbing while you cannot stop it, and it
   needs no narration at all.
   EVENT: before, the drum blurring at full rate with him hanging off the brake
   handle and losing · trigger, three plates slam into the housing · travel, the
   handle comes down 62 degrees under his whole body weight · arrival, the
   wheels visibly slow to single digits, the housing stops shuddering, dust.
   ⛔ IT DOES NOT STOP. The villain's rule holds even inside its own hook, and
   `Drum` clamps its own rate floor so it cannot be made to.
   ====================================================================== */
export const HookBrake: React.FC<HP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  /* ⛔ NOT `drum` — that is the BODY's version of this room and it was dropped
     to a dark iron to hold the black point. A hook opens on the >=140 bar. */
  const p = asPlace("drumhook");
  const SLAM = [24, 36, 48];
  const hit = SLAM.filter((t) => f >= t).length;
  const pull = E(f, 54, 74, 0, 1, IO);
  /* the rate IS the story: 26/s while he loses, three steps down, never zero */
  const rate = 26 - hit * 6.4 - pull * 4.2;
  const strain = 0.35 + E(f, 8, 24, 0, 0.5, IO) + pull * 0.5 - E(f, 78, 96, 0, 0.6, IO);
  const LX = 812;                                  /* the lever pivot x */

  return (
    <Scene p={p} slug="" push={[0, dur, 1.070]} vig={0.16} glow={hexa(p.key, 0.34)}>
      {/* ⛔ THE TRIAL CUTS SHARE THE WORLD, NOT THE PICTURE. This is the same
          meter house as the picked hook — the same wall of counters, the same
          supply belt, the same tariff board — because a cut that changes worlds
          is a different reel, not a variant. What varies is the SHOT: this one
          is TIGHT on one huge object where the picked one is a man and a
          machine, and the belt runs LOW here where it runs mid there. */}
      <Room p={p} f={f} bands={1} kind="rack" overhead="duct" rake={0.15}
        rakeRate={7.4} rakeN={5} floorKind="tile" grit={0.7}
        lamp={{ x: 470, y: 250, r: 420 }} />
      <MeterWall y={128} f={f} z={20} cols={11} rows={3} live={1} c="#CCAA6E" />
      <PipeRun y={648} f={f} z={22} h={92} rate={16} pitch={104} c={EMBER} />

      {/* the occluder: the housing's own bracket, cropped by the frame */}
      <div style={{ position: "absolute", left: 944, top: 196, width: 150, height: 660,
        zIndex: 74, borderRadius: 8,
        background: `linear-gradient(266deg, #2C1708 0%, #150A02 66%, #090400 100%)` }} />

      <Pool x={470} y={GY - 16} w={1010} c={p.key} o={0.80} />

      {/* THE DRUM, hero-sized: five 92px wheels is 460px of digits, 45% of the
          panel width, with air on both sides so the silhouette can form
          (reel 110: an object over ~85% of panel width stops reading as itself) */}
      <Drum x={470} y={GY - 258} f={f} s={1.0} z={46} hero rate={rate}
        unit="$ SPENT" strain={strain} />

      {/* the brake LEVER he is hanging off: a pivot, a quadrant and a
          counterweight, so the pull has a visible mechanism rather than being a
          pose. ⛔ A limb that terminates in mid-air is the banned shape, so his
          forearms end ON the grip. */}
      <div style={{ position: "absolute", left: LX - 41, top: GY - 34, width: 82, height: 82,
        borderRadius: 41, zIndex: 49,
        background: `radial-gradient(circle at 36% 30%, ${mxh(BRASS, 0.40)}, ${dkh(BRASS, 0.56)})`,
        border: `4px solid ${dkh(BRASS, 0.66)}` }} />
      <div style={{ position: "absolute", left: LX - 128, top: GY - 262, width: 128, height: 262,
        zIndex: 52, borderRadius: "128px 0 0 0", border: `12px solid ${dkh(BRASS, 0.44)}`,
        borderRight: "none", borderBottom: "none" }} />
      {/* the quadrant's teeth, so the lever has something to ratchet against */}
      {Array.from({ length: 7 }, (_, i) => (
        <div key={"tt" + i} style={{ position: "absolute", left: LX - 6, top: GY - 262,
          width: 12, height: 26, zIndex: 51, background: dkh(BRASS, 0.56),
          transformOrigin: "50% 262px", transform: `rotate(${-8 - i * 9}deg)` }} />
      ))}
      {/* the pedestal it is bolted to */}
      <div style={{ position: "absolute", left: LX - 66, top: GY - 16, width: 132, height: 30,
        zIndex: 48, borderRadius: 5,
        background: `linear-gradient(180deg, ${mxh(STEEL, 0.24)} 0%, ${dkh(STEEL, 0.52)} 100%)` }} />
      <div style={{ position: "absolute", left: LX - 15, top: GY - 300, width: 30, height: 300,
        zIndex: 50, transformOrigin: "50% 100%", transform: `rotate(${-46 + pull * 62}deg)`,
        borderRadius: 15,
        background: `linear-gradient(96deg, ${mxh(STEEL, 0.34)} 0%, ${dkh(STEEL, 0.50)} 100%)` }}>
        <div style={{ position: "absolute", left: -16, top: -26, width: 62, height: 44,
          borderRadius: 9,
          background: `linear-gradient(168deg, ${mxh(OXIDE, 0.36)}, ${dkh(OXIDE, 0.44)})` }} />
      </div>

      {/* the three plates slamming into the housing, from three directions */}
      {SLAM.map((at, i) => {
        if (f < at - 18) return null;
        const k = E(f, at - 18, at, 0, 1, IN_Q);
        const from: [number, number] = [[-520, 560], [1540, 640], [470, -460]][i] as [number, number];
        const to: [number, number] = [[196, 236], [790, 250], [470, 176]][i] as [number, number];
        const px = from[0] + (to[0] - from[0]) * k, py = from[1] + (to[1] - from[1]) * k;
        return (<React.Fragment key={"pl" + i}>
          <RepoDisc x={px} y={py} d={196} z={66} f={f} seat={Math.max(0.06, k)}
            logo={["deepseek.svg", undefined, "github.svg"][i]}
            rock={i === 1} c={[SLATE, OXIDE, PCB][i]} rot={(1 - k) * 150} />
          {f >= at && f < at + 20 && <Ring x={to[0]} y={to[1]} f={f} at={at} c={GOLD} z={68} />}
        </React.Fragment>);
      })}
      {SLAM.map((at, i) => f >= at && f < at + 22 ? (
        <Puff key={"pf" + i} x={[196, 790, 470][i]} y={[236, 250, 176][i]} f={f} at={at}
          c="#E0C89A" z={67} n={8} />
      ) : null)}

      <Hero f={f} x={LX} y={GY} size={264} z={60} costume={{ constr: 1 }} act={1}
        strain={0.5 + pull * 0.5} drive={pull * 0.7} lift={pull}
        heat={Math.max(0, 0.74 - hit * 0.20 - pull * 0.30)}
        stern={0.8 - pull * 0.4} reach={126} flip />
      <Contact x={LX - 96} y={GY + 4} w={192} o={0.42} z={41} />
      {f > 6 && f < 62 && <Steam x={LX} y={GY - 238} f={f} at={6} n={5} z={64} />}

      <MeterDial x={244} y={588} d={268} z={30} f={f} v={0.86 - hit * 0.22} lugs={0} />
    </Scene>
  );
};

/* =========================================================================
   C · COLUMN — the weight of what a session spends. MEDIUM, vertical, comic.
   One Claude under a column of stacked brass tokens being fed from above faster
   than he can hold it. Three shears take it down to ankle height.
   EVENT: before, the column already towering and him buckling · trigger, three
   shear blades cross the frame at three heights · travel, each top FALLS OFF
   and clears the frame entirely · arrival, he springs up PAST his own standing
   height — the overshoot is the whole reason a release reads.
   ====================================================================== */
export const HookColumn: React.FC<HP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("hatch");
  const CX = 566;                                  /* the column x */
  const CUT = [26, 40, 54];
  const cuts = CUT.filter((t) => f >= t).length;
  const N = 10 - cuts * 3;                         /* tokens still stacked */
  const rel = E(f, CUT[2] + 4, CUT[2] + 13, 0, 1, BACK);
  const buckle = (1 - rel) * 0.86;
  /* the cut heights, in stack index, so the blade and the falling top agree */
  const CUTAT = [7, 4, 1];

  return (
    <Scene p={p} slug="" push={[0, dur, 1.045]} vig={0.44} glow={hexa(p.key, 0.26)}>
      {/* the same meter house, a THIRD shot: medium and VERTICAL, with the belt
          running OVERHEAD as the feed rather than mid-frame or low. Three cuts,
          one world, three pictures. */}
      <Room p={p} f={f} bands={1} kind="rack" overhead="gantry" rake={0.12}
        rakeRate={5.6} rakeN={9} floorKind="slab" grit={0.5}
        lamp={{ x: 470, y: 262, r: 400 }} />
      <MeterWall y={150} f={f} z={20} cols={11} rows={3} live={1} c="#A98A52" />
      <PipeRun y={128} f={f} z={22} h={72} rate={13} pitch={120} c={BRASS} />

      <div style={{ position: "absolute", left: -44, top: 288, width: 116, height: 590,
        zIndex: 74, borderRadius: 5,
        background: `linear-gradient(96deg, #1E2228 0%, #0C0F13 100%)` }} />

      <Pool x={CX + 40} y={GY - 4} w={920} c={p.key} o={0.58} />

      {/* the FEED — tokens dropping out of the overhead run, so the column is a
          PROCESS and not a prop. This is the shot's background process. */}
      {Array.from({ length: 5 }, (_, i) => {
        const t = (f * 1.8 + i * 22) % 110;
        if (cuts >= 3 && t > 36) return null;
        return <Token key={"fd" + i} x={CX + (rnd(i, 5) - 0.5) * 44} y={168 + t * 2.2}
          s={0.52} z={38} f={f} spin={f * 0.3 + i} />;
      })}

      {/* THE COLUMN — every element a real struck disc, never a stack of circles */}
      {Array.from({ length: Math.max(0, N) }, (_, i) => (
        <Token key={"tk" + i} x={CX + Math.sin(i * 0.8) * 7} y={GY - 30 - i * 48}
          s={1.04} z={44 + (i % 2)} f={f} spin={0.02 * i + f * 0.012} />
      ))}
      {/* the tops that FALL OFF — travel that leaves the frame entirely */}
      {CUT.map((at, i) => {
        if (f < at || f > at + 34) return null;
        const g = E(f, at, at + 26, 0, 1, IN_Q);
        return Array.from({ length: 4 }, (_, j) => (
          <Token key={`fo${i}_${j}`} x={CX + (i % 2 ? 1 : -1) * g * (280 + j * 46)}
            y={GY - 30 - (CUTAT[i] + j) * 48 + g * 440} s={1.04} z={70}
            f={f} spin={f * 0.34 + j} />
        ));
      })}
      {/* the shears — a blade crossing the frame, never a flash
          (`feedback_no_flashing_transitions` is standing) */}
      {CUT.map((at, i) => {
        if (f < at - 4 || f > at + 8) return null;
        const k = E(f, at - 4, at + 6, 0, 1, LIN);
        return (
          <div key={"sh" + i} style={{ position: "absolute", left: -320 + k * 1700,
            top: GY - 52 - CUTAT[i] * 48, width: 300, height: 26, zIndex: 76,
            borderRadius: 4, transform: "skewX(-22deg)",
            background: `linear-gradient(90deg, transparent, ${mxh(STEEL, 0.60)} 40%, ${TOKL} 62%, transparent)` }} />
        );
      })}
      {CUT.map((at, i) => f >= at && f < at + 18 ? (
        <Ring key={"rg" + i} x={CX} y={GY - 52 - CUTAT[i] * 48} f={f} at={at} c={GOLD} z={74} />
      ) : null)}
      {/* the three plates are what DOES the cutting here — each shear is a repo
          arriving, so the marks are on screen for the same reason they are in
          the other two cuts */}
      {CUT.map((at, i) => {
        if (f < at - 14) return null;
        const k = E(f, at - 14, at, 0, 1, IN_Q);
        const to: [number, number] = [[858, 232], [858, 350], [858, 468]][i] as [number, number];
        const px = 1480 + (to[0] - 1480) * k, py = to[1];
        return (<RepoDisc key={"pl" + i} x={px} y={py} d={182} z={66} f={f}
          seat={Math.max(0.06, k)}
          logo={["deepseek.svg", undefined, "github.svg"][i]}
          rock={i === 1} c={[SLATE, OXIDE, PCB][i]} rot={(1 - k) * 140} />);
      })}

      <Hero f={f} x={CX} y={GY} size={244 + rel * 24} z={60} costume={{ constr: 1 }}
        act={2} strain={buckle} lift={rel} cheer={rel * 0.9}
        heat={buckle * 0.68}
        shock={E(f, CUT[2], CUT[2] + 5, 0, 1, OUT) * (1 - E(f, CUT[2] + 12, CUT[2] + 26, 0, 1, IO))}
        reach={150} />
      <Contact x={CX - 93} y={GY + 4} w={186} o={0.42} z={41} />
      {f > 4 && cuts < 3 && <Sweat x={CX} y={GY - 208} f={f} at={4} n={4} z={64} />}

      <MeterDial x={236} y={548} d={292} z={30} f={f} v={0.90 - cuts * 0.24} lugs={0} />
    </Scene>
  );
};

export const HOOKS: Record<HookId, React.FC<HP>> = {
  crew: HookCrew,
  ration: HookRation,
  brake: HookBrake,
  column: HookColumn,
};
