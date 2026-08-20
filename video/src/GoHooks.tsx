import React from "react";
import { useCurrentFrame } from "remotion";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd,
  Scene, Cam, MarkCast, rock, shake, squash,
  CLAY, CLAYD, GOLD, RED, PAPER, CREAMB, INK, STEEL, OXIDE, BRASS,
  ui, mono, Ring, Puff, Pool, Part, Chute, Mill, Crew, TallyBoard, ScrapMound,
} from "./GoWorld";
import { SetFor, Stanchion, Flood, placeFor } from "./GoSets";

/* ===========================================================================
   REEL 113 · "GO" — FOUR HOOK CONCEPTS, for the pick.

   ⛔⛔ THIS IS THE STEP I SKIPPED. docs/THE-OPEN.md: *"The first build step of
   any reel is not scene 0. It is N concepts for scene 0. Do not author an open
   and then defend it."* Reel 78 skipped it, built a complete Fury Road open,
   and had the whole scene thrown away on THEME rather than craft.

   THE DIAGNOSIS OF THE REJECTED HOOK, stated plainly so these do not repeat it:
   a mound of ~30 similar parts at similar size and similar value is a TEXTURE,
   and a texture cannot be hierarchical — there is no first place in it. Its
   event was ACCUMULATION (three more things land on a pile), which is an
   incremental change to that texture rather than a transformation. It measured
   10.27 and passed every gate, which is exactly ANIMATION-QUALITY §0's warning:
   the gates check that an open is BUILT correctly and cannot see whether
   anything interesting happens.

   THE RULES EVERY CONCEPT BELOW IS BUILT TO ([[feedback_hook_simplicity]]):
   · ONE dominant object, at most ONE supporting element. Count them.
   · Striking comes from SCALE and REAL BRAND COLOUR, never quantity.
   · ⛔ But do NOT strip the world out — keep the reel's set behind it, held
     DOWN (~0.45), with nothing in it competing. Rich background, one idea.
   · Each candidate is a different MECHANISM, never the same prop restyled.
   · Hierarchy is the SPREAD, not the mean: one colossal DARK mass against one
     small BRIGHT subject clears luma 140 and ranks at the same time.
   · A character is in frame 0 and is SETTLED there (⛔ `Crew` eases in over 8
     frames, so every sprite here is pre-rolled with a negative `at`).

   THE FOUR MECHANISMS
     A · THE TOWER     SCALE GAP    one tiny slip, one colossal stack it made
     B · THE THROAT    CONSUMPTION  the chute, huge, swallowing message after message
     C · THE WEIGH     MEASUREMENT  one prompt on one pan, four parts of cost on the other
     D · THE GIANT     CHARACTER    a colossal Claude handed a scribble, hurling the results away
   ========================================================================= */

const FPS = 30;
/** the hook window is 93 frames = 3.10s, the measured onset of "They just" */
export const HOOK_LEN = 93;

/* ---------------------------------------------------------------------------
   A · THE TOWER — the SCALE GAP.
   ONE colossal stack of wrong parts running off the top of frame, and at its
   foot one small lit order slip with one Claude beside it. The claim is the
   composition itself: this much came out of that.
   before  the tower is already colossal and already cropped by the frame top
   trigger the mill hurls another part in
   travel  it arcs the full width, high and fast
   arrival it SLAMS onto the top, the whole tower recoils down and rocks, dust
   ------------------------------------------------------------------------ */
export const HookTower: React.FC = () => {
  const f = useCurrentFrame();
  const p = placeFor("scrap");
  const THROW = [6, 32, 58], LAND = [18, 44, 70];
  const n = LAND.filter(k => f >= k).length;
  const last = LAND.filter(k => f >= k).slice(-1)[0];
  const sh = LAND.reduce((a, k) => { const s = shake(f, k, 12, 10); return { x: a.x + s.x, y: a.y + s.y }; }, { x: 0, y: 0 });
  /* the whole tower recoils DOWN on each landing and rocks back */
  const rk = last === undefined ? 0 : rock(f, last, 9, 24);
  const sink = last === undefined ? 0 : E(f, last, last + 5, 0, 14, OUT) - E(f, last + 5, last + 26, 0, 14, IO);
  const SEG = 12 + n;                          /* the stack grows a segment per hit */
  return (
    <Scene p={p} slug="THE JOB SHOP" push={[0, HOOK_LEN, 1.05]} vig={0.30}>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${sh.x}px, ${sh.y}px)` }}>
        {/* the world, held DOWN — rich background, nothing competing */}
        <SetFor k="scrap" f={f} lit={1.0} t={f * 0.4} rakeRate={4.0} />

        {/* THE ONE DOMINANT OBJECT — a stack 520 wide running off the top, so
            it reads as ENDLESS rather than as an object with a top on it */}
        <div style={{ position: "absolute", left: 246, top: -76 + sink, width: 520, height: 1080,
          zIndex: 40, transform: `rotate(${rk * 0.10}deg)`, transformOrigin: "50% 100%" }}>
          {Array.from({ length: SEG }, (_, i) => {
            const y = 1000 - i * 66;
            const wob = Math.sin(f / 21 + i * 0.7) * (1.0 + i * 0.20);
            /* ⛔ a TOWER is recognised by its vertical edge. Random 19deg
               rotations made this a wobbling pile; alternating ~5deg keeps the
               edge readable while still looking stacked by hand. */
            return (
              <Part key={"tw" + i} x={262 + wob * 2.0 + (i % 2 ? 11 : -11)} y={y}
                s={1.72} wrong={i % 4 !== 0} kind={i % 4} c={i % 3 === 0 ? STEEL : OXIDE}
                z={40 + i} rot={(i % 2 ? 4.5 : -4.5) + wob} lit={0.5 + (i / SEG) * 0.5} />
            );
          })}
        </div>
        {/* the tower's own shadow falling toward the viewer, which is what makes
            it read as tall rather than as a column pasted on a wall */}
        <div style={{ position: "absolute", left: 150, top: p.horizon + 96, width: 760, height: 120,
          borderRadius: "50%", zIndex: 20, background: hexa("#140E08", 0.42) }} />

        {/* THE ONE SUPPORTING ELEMENT — the input, lit, tiny, at its foot */}
        <Pool x={620} y={p.horizon + 140} w={1240} c={p.key} o={0.98} z={21} h={360} />
        <div style={{ position: "absolute", left: 690, top: p.horizon + 74, width: 150, height: 112,
          zIndex: 60, borderRadius: 5, background: CREAMB, transform: "rotate(-7deg)",
          border: `4px solid ${dkh(CREAMB, 0.28)}` }}>
          {[0.22, 0.40, 0.58, 0.76].map((k, i) => (
            <div key={"sl" + i} style={{ position: "absolute", left: 12, top: `${k * 100}%`,
              width: `${44 + ((i * 29) % 40)}%`, height: 7, borderRadius: 3, background: INK,
              opacity: 0.8, transform: `rotate(${-3 + i * 2}deg)` }} />
          ))}
        </div>
        <Crew f={f} x={880} y={p.horizon + 196} i={0} size={168} z={62} at={-14} loop={3} flip />

        {/* the three parts arriving at the top */}
        {THROW.map((t0, i) => {
          const t = E(f, t0, LAND[i], 0, 1, LIN);
          if (f < t0 || f > LAND[i]) return null;
          /* land ON the current top of the stack, which moves up as it grows */
          const topY = 1000 - (12 + i) * 66 - 76;
          const x = 1080 - t * 560, arc = -Math.sin(t * Math.PI) * 230;
          return <Part key={"in" + i} x={x} y={topY - 320 + t * 320 + arc} s={1.7} wrong
            rot={t * 430} z={80} c={OXIDE} kind={i} />;
        })}
        {LAND.map((k, i) => (<React.Fragment key={"ar" + i}>
          <Puff x={508} y={1000 - (12 + n) * 66 - 76 + sink} f={f} at={k} n={16} s={1.6} z={82} />
          <Ring x={508} y={994 - (12 + n) * 66 - 76 + sink} f={f} at={k} r={250} c={p.key} z={81} />
        </React.Fragment>))}

        <MarkCast x={168} y={210} s={128} z={70} f={f} spin={0.55} o={0.92} />
      </div>
    </Scene>
  );
};

/* ---------------------------------------------------------------------------
   B · THE THROAT — CONSUMPTION.
   The scrap chute at 3x the size it appears anywhere else, filling the frame,
   its mouth the only dark hole in a lit shop. Message after message goes in and
   the bell rings. ONE object, and the thing it does is eat.
   ------------------------------------------------------------------------ */
export const HookThroat: React.FC = () => {
  const f = useCurrentFrame();
  const p = placeFor("scrap");
  const FEED = [2, 24, 46, 68], GONE = FEED.map(k => k + 19);
  const sh = GONE.reduce((a, k) => { const s = shake(f, k, 8, 8); return { x: a.x + s.x, y: a.y + s.y }; }, { x: 0, y: 0 });
  return (
    <Scene p={p} slug="THE JOB SHOP" push={[0, HOOK_LEN, 1.07]} vig={0.30}>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${sh.x}px, ${sh.y}px)` }}>
        <SetFor k="scrap" f={f} lit={1.15} t={f * 0.4} rakeRate={4.2} />
        <Pool x={506} y={p.horizon + 156} w={1240} c={p.key} o={1.0} z={19} h={380} />

        {/* THE ONE DOMINANT OBJECT — the chute at 2.6x, cropped by the bottom
            of the panel, its mouth the only true black in a lit room. That
            single dark hole against a bright shop IS the hierarchy. */}
        {/* ⭐ reel 109's rule applied: when a DARK hero drags frame 0 under the
            bar, lift THE HERO'S OWN VALUE and add one bright settled thing —
            never the shading. The chute body goes to galvanised steel and the
            throat is lit from inside, which also reads better: a mouth with a
            fire down it is where things GO, where a flat black rectangle is
            just a hole. The mouth is still the darkest region in frame, so the
            spread that makes this concept work is untouched. */}
        {/* ⭐ THE CHOICE THIS CONCEPT FORCED, MADE DELIBERATELY. A black mouth
            gave the best hierarchy in the set (spread 232) and could not clear
            THE-OPEN law 1 at any size: 76 -> 104 -> 118 -> 124 -> 135 against a
            140 bar, and every point cost the concept. So the mouth becomes a
            FURNACE. Hierarchy does not have to be dark-on-light: one saturated
            hot mass among cool neutral steel ranks just as hard, it clears the
            brightness bar instead of fighting it, and it is on-topic in the
            VO's own word — this is where messages get BURNED. */}
        <div style={{ position: "absolute", left: 372, top: 372, width: 268, height: 232, zIndex: 47,
          borderRadius: 10,
          /* the furnace FLARES as each part goes in: the arrival costs something */
          transform: `scaleY(${1 + GONE.reduce((a, k) => a + (f >= k && f < k + 12 ? E(f, k, k + 3, 0, 0.16, OUT) - E(f, k + 3, k + 12, 0, 0.16, IO) : 0), 0)})`,
          transformOrigin: "50% 100%",
          background: `linear-gradient(180deg, ${dkh(CLAYD, 0.30)} 0%, ${CLAYD} 34%, ${CLAY} 66%, ${GOLD} 100%)` }} />
        {/* the heat haze coming off it */}
        <div style={{ position: "absolute", left: 300, top: 250, width: 412, height: 300, zIndex: 48,
          background: `radial-gradient(ellipse at 50% 88%, ${hexa(GOLD, 0.44)} 0%, ${hexa(CLAY, 0.16)} 44%, ${hexa(CLAY, 0)} 76%)` }} />
        {/* embers rising out of the throat, the background process */}
        {Array.from({ length: 14 }, (_, i) => {
          const t = ((f * 2.2 + i * 19) % 120) / 120;
          return (<div key={"em" + i} style={{ position: "absolute",
            left: 396 + ((i * 37) % 220) + Math.sin(f / 9 + i) * 14,
            top: 560 - t * 340, width: 9 + (i % 3) * 4, height: 9 + (i % 3) * 4,
            borderRadius: 6, zIndex: 49, background: i % 3 ? GOLD : CLAY,
            opacity: Math.max(0, 0.85 - t * 1.1) }} />);
        })}
        <Chute x={506} y={452} s={1.65} f={f} z={46} rings={GONE} c="#C6C1B6" />

        {/* the four wrong parts going in, each bigger and faster than the last */}
        {FEED.map((t0, i) => {
          const t = E(f, t0, GONE[i], 0, 1, IN_Q);
          if (f < t0 || f > GONE[i]) return null;
          return <Part key={"fd" + i} x={1060 - t * 500} y={110 + t * 300} s={2.0 + i * 0.24}
            wrong rot={-t * 330} z={44} c={OXIDE} kind={i} o={1 - Math.max(0, (t - 0.80) * 5.0)} />;
        })}
        {GONE.map((k, i) => <Ring key={"gr" + i} x={506} y={410} f={f} at={k} r={230 + i * 40}
          c={RED} z={70} />)}

        {/* ONE supporting element: the Claude that keeps feeding it */}
        <Crew f={f} x={892} y={p.horizon + 176} i={0} size={186} z={60} at={-14} loop={1} flip />

        <MarkCast x={160} y={214} s={132} z={70} f={f} spin={0.55} o={0.92} />
      </div>
    </Scene>
  );
};

/* ---------------------------------------------------------------------------
   C · THE WEIGH — MEASUREMENT.
   One colossal balance. One order slip on the left pan. Four scrapped parts
   crash onto the right, one at a time, and the beam tips further with each
   until the right pan hits the floor. The number is READ FROM THE TILT, which
   is [[feedback_graphical_over_textual]]'s rule exactly: a number moves to its
   value, it is never typeset at it.
   ------------------------------------------------------------------------ */
export const HookWeigh: React.FC = () => {
  const f = useCurrentFrame();
  const p = placeFor("scrap");
  const DROP = [6, 26, 46, 66], HIT = DROP.map(k => k + 10);
  const n = HIT.filter(k => f >= k).length;
  const last = HIT.filter(k => f >= k).slice(-1)[0];
  /* the beam tips one step per part and springs on each hit */
  const tilt = E(f, 0, 1, 0, 0, LIN) + [0, 6, 12, 18, 25][n] + (last === undefined ? 0 : rock(f, last, 3.4, 16));
  const sh = HIT.reduce((a, k) => { const s = shake(f, k, 9, 9); return { x: a.x + s.x, y: a.y + s.y }; }, { x: 0, y: 0 });
  const BX = 506, BY = 288, ARM = 352;
  const lx = BX - ARM * Math.cos(tilt * Math.PI / 180), ly = BY - ARM * Math.sin(tilt * Math.PI / 180);
  const rx = BX + ARM * Math.cos(tilt * Math.PI / 180), ry = BY + ARM * Math.sin(tilt * Math.PI / 180);
  return (
    <Scene p={p} slug="THE JOB SHOP" push={[0, HOOK_LEN, 1.05]} vig={0.30}>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${sh.x}px, ${sh.y}px)` }}>
        <SetFor k="scrap" f={f} lit={0.66} t={f * 0.4} rakeRate={4.0} />
        <Pool x={506} y={p.horizon + 140} w={1060} c={p.key} o={0.62} z={19} h={250} />

        {/* THE ONE DOMINANT OBJECT — the balance: column, beam, two pans */}
        <div style={{ position: "absolute", left: BX - 46, top: BY, width: 92, height: 420, zIndex: 40,
          background: `linear-gradient(94deg, ${mxh("#4A423A", 0.20)} 0%, ${dkh("#4A423A", 0.44)} 100%)`,
          border: `6px solid ${dkh("#4A423A", 0.56)}` }} />
        <div style={{ position: "absolute", left: BX - 150, top: BY + 400, width: 300, height: 54,
          borderRadius: 10, zIndex: 41,
          background: `linear-gradient(180deg, ${mxh("#4A423A", 0.14)} 0%, ${dkh("#4A423A", 0.50)} 100%)` }} />
        {/* the beam */}
        <div style={{ position: "absolute", left: BX - ARM, top: BY - 21, width: ARM * 2, height: 42,
          borderRadius: 8, zIndex: 44, transformOrigin: "50% 50%", transform: `rotate(${tilt}deg)`,
          background: `linear-gradient(180deg, ${mxh(BRASS, 0.22)} 0%, ${dkh(BRASS, 0.34)} 100%)`,
          border: `5px solid ${dkh(BRASS, 0.44)}` }} />
        <div style={{ position: "absolute", left: BX - 42, top: BY - 42, width: 84, height: 84,
          borderRadius: "50%", zIndex: 46, background: mxh(BRASS, 0.30),
          border: `6px solid ${dkh(BRASS, 0.42)}` }} />

        {/* LEFT PAN — one order slip. The whole input, and it is tiny. */}
        {[[lx, ly, "l"], [rx, ry, "r"]].map(([px, py, side]) => (
          <React.Fragment key={"pan" + side}>
            <div style={{ position: "absolute", left: (px as number) - 3, top: py as number, width: 6,
              height: 102, zIndex: 45, background: dkh(BRASS, 0.40) }} />
            <div style={{ position: "absolute", left: (px as number) - 150, top: (py as number) + 96,
              width: 300, height: 40, borderRadius: "0 0 22px 22px", zIndex: 45,
              background: `linear-gradient(180deg, ${mxh(BRASS, 0.12)} 0%, ${dkh(BRASS, 0.40)} 100%)`,
              border: `5px solid ${dkh(BRASS, 0.48)}` }} />
          </React.Fragment>
        ))}
        <div style={{ position: "absolute", left: lx - 68, top: ly + 24, width: 136, height: 100,
          zIndex: 60, borderRadius: 5, background: CREAMB, transform: "rotate(-5deg)",
          border: `4px solid ${dkh(CREAMB, 0.28)}` }}>
          {[0.24, 0.46, 0.68].map((k, i) => (
            <div key={"ws" + i} style={{ position: "absolute", left: 10, top: `${k * 100}%`,
              width: `${48 + ((i * 31) % 34)}%`, height: 6, borderRadius: 3, background: INK, opacity: 0.8 }} />
          ))}
        </div>

        {/* RIGHT PAN — the four parts, crashing in one at a time */}
        {HIT.map((k, i) => (
          f >= k ? <Part key={"wp" + i} x={rx - 66 + i * 44} y={ry + 44 - i * 26} s={1.05}
            wrong kind={i} c={OXIDE} z={62}
            rot={E(f, k, k + 8, -34, -4 + i * 3, OUT)} /> : null
        ))}
        {DROP.map((t0, i) => {
          const t = E(f, t0, HIT[i], 0, 1, IN_Q);
          if (f < t0 || f > HIT[i]) return null;
          return <Part key={"dr" + i} x={rx - 40 + i * 40} y={-120 + t * (ry + 150)} s={1.25}
            wrong kind={i} rot={t * 260} z={64} c={OXIDE} />;
        })}
        {HIT.map((k, i) => (<React.Fragment key={"hr" + i}>
          <Puff x={rx} y={ry + 70} f={f} at={k} n={12} s={1.2} z={66} />
          <Ring x={rx} y={ry + 64} f={f} at={k} r={190} c={p.key} z={65} />
        </React.Fragment>))}

        {/* ONE supporting element: the Claude watching the pan go down */}
        <Crew f={f} x={132} y={p.horizon + 192} i={0} size={172} z={60} at={-14} loop={3} />
        <MarkCast x={906} y={200} s={124} z={70} f={f} spin={0.55} o={0.90} />
      </div>
    </Scene>
  );
};

/* ---------------------------------------------------------------------------
   D · THE GIANT — CHARACTER.
   THE-OPEN law 2: characters stop scrolls, empty rooms do not. One colossal
   Claude, 420px, handed a scribble the size of a stamp, hurling the wrong part
   it produced off frame — three times, and the pile behind it grows each time.
   The hierarchy is a 420px figure against a 70px input.
   ------------------------------------------------------------------------ */
export const HookGiant: React.FC = () => {
  const f = useCurrentFrame();
  const p = placeFor("scrap");
  const HURL = [10, 36, 62], OUT_ = HURL.map(k => k + 10);
  const n = OUT_.filter(k => f >= k).length;
  const sh = OUT_.reduce((a, k) => { const s = shake(f, k, 7, 8); return { x: a.x + s.x, y: a.y + s.y }; }, { x: 0, y: 0 });
  /* the giant winds up and throws on each beat */
  const lean = HURL.reduce((a, k) => a + (f >= k - 6 && f < k + 12
    ? E(f, k - 6, k, 0, -9, OUT) + E(f, k, k + 12, 0, 9, IO) : 0), 0);
  return (
    <Scene p={p} slug="THE JOB SHOP" push={[0, HOOK_LEN, 1.06]} vig={0.30}>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${sh.x}px, ${sh.y}px)` }}>
        <SetFor k="scrap" f={f} lit={0.48} t={f * 0.4} rakeRate={4.0} />
        {/* the pile behind, in silhouette, GROWING — background, not subject */}
        <ScrapMound x={172} y={p.horizon + 206} w={620} f={f} z={22} lit={0.30}
          c={dkh(OXIDE, 0.30)} grown={n / 3} jolt={OUT_.filter(k => f >= k).slice(-1)[0]} />
        <Pool x={640} y={p.horizon + 140} w={860} c={p.key} o={0.60} z={19} h={220} />

        {/* THE ONE DOMINANT OBJECT — a 420px Claude, lit, front and centre */}
        <div style={{ position: "absolute", left: 0, top: 0, right: 0, bottom: 0, zIndex: 56,
          transform: `rotate(${lean * 0.4}deg)`, transformOrigin: "62% 88%" }}>
          <Crew f={f} x={648} y={p.horizon + 268} i={0} size={620} z={56} at={-16} loop={1} flip />
        </div>

        {/* the ONE supporting element — the scribble it is handed, tiny */}
        {/* the outstretched hand, and the scribble ON it — the claim, literal */}
        <div style={{ position: "absolute", left: 214, top: 470, width: 190, height: 62, zIndex: 68,
          borderRadius: 12, background: CLAY, border: `5px solid ${dkh(CLAY, 0.26)}`,
          transform: `rotate(${-3 + Math.sin(f / 15) * 2}deg)` }} />
        <div style={{ position: "absolute", left: 176, top: 356, width: 210, height: 158, zIndex: 70,
          borderRadius: 6, background: CREAMB,
          transform: `rotate(${-9 + Math.sin(f / 14) * 3}deg)`,
          border: `5px solid ${dkh(CREAMB, 0.30)}`, boxShadow: "0 14px 26px rgba(20,14,8,0.34)" }}>
          {[0.16, 0.32, 0.48, 0.64, 0.80].map((k, i) => (
            <div key={"gs" + i} style={{ position: "absolute", left: 16, top: `${k * 100}%`,
              width: `${44 + ((i * 27) % 40)}%`, height: 10, borderRadius: 5, background: INK,
              opacity: 0.84, transform: `rotate(${-3 + (i % 3) * 2.5}deg)` }} />
          ))}
          {[0, 1].map(i => (
            <div key={"gt" + i} style={{ position: "absolute", left: 132 + i * 26, top: 36 + i * 62,
              width: 40, height: 9, borderRadius: 5, background: INK, opacity: 0.7,
              transform: `rotate(${i ? 52 : -44}deg)` }} />
          ))}
        </div>

        {/* what it makes, thrown away — leaving frame each time */}
        {HURL.map((k, i) => {
          const t = E(f, k, k + 22, 0, 1, LIN);
          if (f < k || t >= 1) return null;
          return <Part key={"hv" + i} x={430 - t * 640} y={330 - Math.sin(t * Math.PI) * 210 + t * t * 130}
            s={1.5} wrong kind={i} rot={-t * 420} z={74} c={OXIDE} o={1 - Math.max(0, (t - 0.8) * 5)} />;
        })}
        {OUT_.map((k, i) => <Puff key={"gp" + i} x={250} y={p.horizon + 40} f={f} at={k + 12}
          n={12} s={1.3} z={30} />)}

        <MarkCast x={906} y={196} s={126} z={72} f={f} spin={0.55} o={0.92} />
      </div>
    </Scene>
  );
};
