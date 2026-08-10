import React from "react";
import { AbsoluteFill, useCurrentFrame, Img, staticFile } from "remotion";
import { inter } from "./fonts";
import { Bg, Panel, ProgressBar, Caption, AssemblyCtx, hexA, HookHeader, Mascot } from "./SlopKit";
import {
  Band, Mark, Proof, ToolRow, Credential, Wreath,
  Field, Rope, Puller, Street, Case, FreeSign, Counter, Printer, Docket,
  Lawn, Stone, Pass, Ticket, Plate, Tone,
  PAPER, INK, CLAY, GO, RED, GOLD, STEEL_D, STONE, STONE_D, SH, SH_D, STATS,
} from "./RowRituals";
import { E, OUT, BACK, IN_Q } from "./MissionWorld";
import { Cue, SfxTrack, LEVELS, layer } from "./SoundKit";

/* =========================================================================
   REEL 91 "ROWBOAT" · ROUND 3 OPENS — FIVE RITUALS, ONE MECHANISM EACH.

   What round 2 got wrong, so it does not come back:
     · its three "concepts" shared frame 0 and the room. One concept, three
       endings. docs/THE-OPEN.md: if one sentence describes them all, it is one.
     · it was a SYSTEM — a floor of desks with a card on it. Reel 84 already
       wrote the verdict: every rejected concept across 83/84 was a UI or a
       system; what works is A GENRE WORLD WITH A MOMENT OF TENSION.
     · its hero number, $40,000, named no agency and could not be sourced.

   Each concept below fills reel 86's three columns — the RITUAL, its HIERARCHY
   MECHANISM, and the MOMENT frame 0 is frozen on — and nothing else about them
   is shared:

     id         ritual            mechanism        frame 0 is frozen on
     ---------  ----------------  ---------------  --------------------------
     rowPull    a tug of war      FORCE, 5 v 1     the rope already losing
     rowKerb    a kerb giveaway   WORTH v PRICE    the FREE sign just taped on
     rowDocket  a job docket      LENGTH           the estimate still printing
     rowWake    a funeral         ALIVE v DEAD     the flower above the stone
     rowPass    an order window   SPEED            the ticket just clipped

   ⛔ THE CAMERA NEVER MOVES. Every change is a hard cut to a new framing.
      The only camera event allowed is a decaying impact shake on the cut, which
      is what actually moves the motion metric (learnings §2) — a drift does not,
      and reads as one shot anyway.
   ⛔ A solo hook comp has PLACEHOLDER captions and NO audio by construction.
   ========================================================================= */

export const HOOK_LEN = 138;                // to the RETIMED onset of "Two guys" at 4.59s
/* dense at the front interrupts, settling at the back retains (reel 82).
   0.93s · 1.07s · 1.27s · 1.33s — nothing under the 0.7s floor.
   ⛔ Rescaled with HOOK_LEN when the VO's inter-sentence silences were cut; the
      shape is proportional to the old 30/64/104 so the pacing is unchanged. */
export const CUTS = [28, 60, 88];   // 0.93 · 2.00 · 2.93s
/* ⛔ the third cut was at f98 (3.27s) and Alex caught the cost: "I see it being
   blank graves for too long at around 2/3 seconds". The wave finished around
   k=30 of a 38-frame shot, so shot C ended on ~8 frames of nothing moving and
   the monument could not start until after it. Cut moved up 10 frames, the wave
   made faster, and the monument now lands at k=5 instead of k=9. */
const HEAD = { big: "SOLD THEIR LAST STARTUP", hot: "GAVE THIS ONE AWAY" };

/** one light per shot. Overcast noon -> the sky flattening -> the field under the
    monument's shadow. ⛔ Shot A stays the brightest because frame-0 luma has to
    clear 140 and that is measured on frame 0. */
const TONE: Tone[] = [
  { sky: "#EDF2F6", hedge: "#3F6B37", grass: "#78B061", gd: "#66A051" },
  { sky: "#E5EEF3", hedge: "#3A6432", grass: "#6FA659", gd: "#5D9248" },
  { sky: "#DBE3E6", hedge: "#33592D", grass: "#63914F", gd: "#548043" },
  { sky: "#C9D4D7", hedge: "#2C4D27", grass: "#547E44", gd: "#476A39" },
];
/** ⛔ shot D drops the camera to the ground so the monument towers OUT of frame.
    Four wides at the same eye level is what made the cuts read as prop swaps. */
const HZ = [352, 352, 340, 596];

const SoloCap: React.FC<{ words: string[]; hot?: number }> = (p) =>
  React.useContext(AssemblyCtx) ? null : <Caption {...p} />;

const shot = (f: number) => (f < CUTS[0] ? 0 : f < CUTS[1] ? 1 : f < CUTS[2] ? 2 : 3);
const local = (f: number) => f - [0, ...CUTS][shot(f)];

/** 2-frame white pop on every cut: sells the cut without moving the camera. */
const Flash: React.FC<{ f: number }> = ({ f }) => (<>
  {CUTS.map((c) => {
    const k = f - c;
    if (k < 0 || k > 2) return null;
    return <div key={c} style={{ position: "absolute", inset: 0, background: "#FFFFFF",
      opacity: (1 - k / 2) * 0.28, zIndex: 92 }} />;
  })}
</>);

/** a decaying impact tick on frame 0 and on every cut.
    ⛔ THIS WAS 15px OVER 11 FRAMES AT FOUR CUTS and Alex called it: "too much
    screen shaking". A shake is an accent, not a camera move — past about 6px it
    stops reading as impact and starts reading as a wobbly camera, and it fights
    the locked-off framing the whole open is built on. Now 5px over 7 frames, and
    the weight it used to fake is carried by things IN the world instead: the
    ground jolt, the fissure and the monument's shadow in shot D. */
const Shake: React.FC<{ f: number; children: React.ReactNode }> = ({ f, children }) => {
  const k = local(f);
  const d = Math.max(0, 1 - k / 7) ** 2;
  return (
    <div style={{ position: "absolute", inset: 0,
      transform: `translate(${Math.sin(k * 2.1) * 5 * d}px, ${Math.cos(k * 2.6) * 3.5 * d}px)` }}>
      {children}
    </div>
  );
};

const Wrapped: React.FC<{ cues?: Cue[]; children: React.ReactNode }> = ({ cues, children }) => {
  const f = useCurrentFrame();
  const solo = !React.useContext(AssemblyCtx);
  return (
    <AbsoluteFill>
      {cues && <SfxTrack cues={cues} />}
      {solo && <><Bg /><ProgressBar />
        <HookHeader f={f + 14} big={HEAD.big} hot={HEAD.hot} /></>}
      <Panel glow={hexA(CLAY, 0.3)}>
        <Shake f={f}>{children}</Shake>
        <Flash f={f} />
      </Panel>
      {solo && <SoloCap words={["Forget paying", "developers to", "build AI agents"]} hot={1} />}
    </AbsoluteFill>
  );
};
const wrap = (kids: React.ReactNode, cues?: Cue[]) => <Wrapped cues={cues}>{kids}</Wrapped>;

/* ---- sound. Frame 0 carries the heaviest stack; every cut gets a transient.
       ⛔ `at` is ROOT seconds and `dur` must be >= the file's true length. ---- */
const A_ = "am/";
const cues = (open: string, c1: string, c2: string, c3: string): Cue[] => [
  { at: 0, src: A_ + "hit-boom.wav", v: LEVELS.SFX_HERO, dur: 1.6, lead: 0 },
  { at: 0, src: A_ + open, v: LEVELS.SFX_HERO, dur: 1.4, lead: 0 },
  { at: 0.03, src: A_ + "punch.wav", v: LEVELS.SFX_MID, dur: 0.9, lead: 0 },
  { at: 0.06, src: A_ + "paper-slide.wav", v: LEVELS.SFX_TEXTURE, dur: 0.9, lead: 0 },
  ...layer(CUTS[0] / 30, { src: A_ + "whoosh-swoosh.wav", v: LEVELS.SFX_MID, dur: 1.0 },
                         { src: A_ + c1, v: LEVELS.SFX_MID, dur: 1.2 }),
  ...layer(CUTS[1] / 30, { src: A_ + "whoosh-choppy.wav", v: LEVELS.SFX_MID, dur: 0.9 },
                         { src: A_ + c2, v: LEVELS.SFX_HERO, dur: 1.4 }),
  ...layer(CUTS[2] / 30, { src: A_ + "whoosh-fast.wav", v: LEVELS.SFX_MID, dur: 0.8 },
                         { src: A_ + c3, v: LEVELS.SFX_HERO, dur: 1.2 }),
  { at: CUTS[2] / 30 + 0.22, src: A_ + "positive-chime.wav", v: LEVELS.SFX_MID, dur: 1.4, lead: 0 },
];

/* ============================================================== CONCEPT A ==
   THE TUG OF WAR · mechanism FORCE.
   A tug of war exists to settle which side is stronger, so the ranking needs no
   label at all. Five billable people dug into the turf, and the rope is already
   going the other way. Frame 0 is the beat before they lose it.
   ========================================================================= */
export const HookPull: React.FC = () => {
  const f = useCurrentFrame(); const sh = shot(f); const k = local(f);
  const WHO = ["suit", "glasses", "prof", "cop"];
  /* geometry, once: the Mascot's arms sit at viewBox y 86..112 of 200, so on a
     150*S box the rope has to land at y + 0.75*S*99 or it misses every hand.
     ⛔ That height is also the FACE, so the rope goes BEHIND the pullers (z 26)
        and the step is set wider than the arm span (0.75*S*184 = 179) so it
        stays visible in the gaps. Drawn in front it masks two faces outright. */
  const S = 1.3, ARM = 0.75 * S * 99, STEP = 200, TOP = 356, X0 = 58;
  return wrap(<>
    <Field f={f} horizon={340} />
    {/* A · the losing side, settled and complete on frame 0. The rope runs the
        full width BEHIND them so it reads as one rope going off to something. */}
    {sh === 0 && (<>
      <Rope x={0} y={TOP + ARM - 8} w={1012} z={26} />
      {WHO.map((w, i) => (
        <Puller key={w} f={f + i * 13} x={X0 + i * STEP} y={TOP - (i % 2) * 7} s={S}
                z={34 - i} who={w} />
      ))}
      <Band t="A TEAM, TO BUILD ONE AGENT" y={664} />
    </>)}
    {/* B · hard cut to the OTHER end of the same rope. This is the whole idea. */}
    {sh === 1 && (<>
      <Rope x={0} y={462} w={330} z={26} />
      <div style={{ position: "absolute", left: 324, top: 392, width: 396, height: 156,
        borderRadius: 26, background: PAPER, boxShadow: SH_D, zIndex: 34,
        display: "flex", alignItems: "center", paddingLeft: 28, gap: 18 }}>
        <div style={{ width: 100, height: 100, borderRadius: 23, overflow: "hidden",
          background: "#FFFFFF", boxShadow: SH }}>
          <Img src={staticFile("logos/rowboat.png")}
               style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 60,
          letterSpacing: "-0.03em", color: INK }}>rowboat</div>
      </div>
      <div style={{ position: "absolute", left: 756, top: 350, zIndex: 36 }}>
        <Mascot lf={f} size={216} cheer={0.5} nodAmp={3} nodSpeed={11} glasses={1} />
      </div>
      <Band t="THE OTHER END" y={664} />
    </>)}
    {/* C · the release — they come off the ground, the turf goes with them */}
    {sh === 2 && (<>
      <Rope x={0} y={TOP + ARM - 8 - E(k, 0, 14, 0, 34, OUT)} w={1012} z={26} />
      {WHO.map((w, i) => (
        <Puller key={w} f={f + i * 13} x={X0 + i * STEP} y={TOP - (i % 2) * 7} s={S}
                z={34 - i} who={w} slip={E(k, i * 3, 22 + i * 3, 0, 1, IN_Q)} />
      ))}
      {/* divots torn out of the line they were holding */}
      {Array.from({ length: 7 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: 30 + i * 78,
          top: 546 - E(k, 2 + i, 20 + i, 0, 74, OUT), width: 46, height: 22, borderRadius: 8,
          background: "#4C7B3E", transform: `rotate(${i * 27}deg)`, zIndex: 44,
          opacity: 1 - E(k, 14, 34, 0, 1, OUT) }} />
      ))}
      <Band t="IRRELEVANT OVERNIGHT" y={664} c={RED} />
    </>)}
    {/* D · the thing on the other end, and every figure on it is checkable.
        ⛔ Staged IN this world — still on the rope, still on the grass. Three
        concepts ended on the same floating card in the first pass, which is
        round 2's "one concept, three endings" failure coming back. */}
    {sh === 3 && (<>
      <Rope x={0} y={432} w={92} z={26} />
      <Proof x={84} y={300} w={800} s={0.94} z={60} t={E(k, 0, 15, 0.86, 1, BACK)} />
      <div style={{ position: "absolute", left: 782, top: 470, zIndex: 58 }}>
        <Mascot lf={f} size={214} cheer={0.72} nodAmp={4} nodSpeed={9} glasses={1} />
      </div>
    </>)}
  </>, cues("riser-metal.wav", "snap.wav", "hit-up.wav", "unlock.wav"));
};

/* ============================================================== CONCEPT B ==
   THE KERB · mechanism WORTH v PRICE.
   Putting something on the kerb with a hand-lettered FREE sign is a ritual whose
   entire content is "this is worth money and I am giving it away" — which is the
   VO's sentence, staged. Frame 0 is the sign going on.
   ========================================================================= */
export const HookKerb: React.FC = () => {
  const f = useCurrentFrame(); const sh = shot(f); const k = local(f);
  return wrap(<>
    <Street f={f} />
    {/* A · the case, the sign, and someone already stopping for it */}
    {sh === 0 && (<>
      <Case f={f} x={62} y={374} s={1.12} z={34} />
      <FreeSign x={552} y={330} s={1} z={50} rot={-7} />
      <div style={{ position: "absolute", left: 844, top: 404, zIndex: 46 }}>
        <Mascot lf={f} size={166} shock={E(f, 1, 12, 0.25, 0.8, OUT)} nodAmp={2}
                nodSpeed={13} suit={1} />
      </div>
    </>)}
    {/* B · hard cut wide: the queue it already has */}
    {sh === 1 && (<>
      <Case f={f} x={16} y={430} s={0.62} z={34} />
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: 292 + i * 92, top: 424 - i * 4,
          zIndex: 40 - i }}>
          <Mascot lf={f + i * 19} size={150 - i * 5} nodAmp={2.6} nodSpeed={12}
                  {...({ [["suit", "glasses", "prof", "chef", "cop", "girl", "beard", "fro"][i]]: 1 } as any)} />
        </div>
      ))}
      <Band t={"★ 16,974 STARS"} y={664} />
    </>)}
    {/* C · hard cut close: what is actually in the box */}
    {sh === 2 && (<>
      <Case f={f} x={62} y={408} s={1.12} z={30} open={E(k, 0, 13, 0, 0.66, OUT)} />
      {[0, 1, 2, 3].map((i) => (
        <div key={i} style={{ position: "absolute", left: 84 + i * 108, top: 320,
          zIndex: 44 + i, transform: `scale(${E(k, 5 + i * 4, 20 + i * 4, 0, 1, BACK)})`,
          transformOrigin: "50% 100%" }}>
          <Mascot lf={f + i * 17} size={134} cheer={0.5} nodAmp={3} nodSpeed={11}
                  {...({ [["glasses", "suit", "chef", "prof"][i]]: 1 } as any)} />
        </div>
      ))}
      <ToolRow x={604} y={430} s={1.6} z={50} f={f} />
      <Band t="WIRED TO YOUR TOOLS" y={664} />
    </>)}
    {/* D · held up over the pavement, by the queue that was already there */}
    {sh === 3 && (<>
      <Proof x={66} y={214} w={880} z={60} t={E(k, 0, 15, 0.86, 1, BACK)} />
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ position: "absolute", left: 92 + i * 306, top: 486, zIndex: 58 }}>
          <Mascot lf={f + i * 21} size={196} cheer={0.7} nodAmp={4} nodSpeed={9 + i}
                  {...({ [["suit", "girl", "chef"][i]]: 1 } as any)} />
        </div>
      ))}
    </>)}
  </>, cues("paper-slide.wav", "crowd-wow.wav", "unlock.wav", "positive-chime.wav"));
};

/* ============================================================== CONCEPT C ==
   THE DOCKET · mechanism LENGTH.
   A job docket is the ritual that turns a request into work, and its length IS
   the price without ever naming one. ⛔ This is deliberate: round 2 led on an
   unsourceable $40,000, and a line count is a claim the picture can carry
   honestly. Frame 0 is the estimate still coming out of the printer.
   ========================================================================= */
const JOB = ["SCOPE IT", "HIRE A DEV", "WRITE PROMPTS", "WIRE THE TOOLS",
             "TEST HANDOFFS", "FIX HANDOFFS", "DEPLOY IT", "MAINTAIN IT", "SCOPE V2"];
export const HookDocket: React.FC = () => {
  const f = useCurrentFrame(); const sh = shot(f); const k = local(f);
  return wrap(<>
    <Counter f={f} top={596} />
    {/* A · one docket, fed straight out of the printer and off the frame.
        The estimator sits BEHIND the slab (z < COUNTER_Z) so the counter crops
        him — otherwise he floats in the middle of the room. */}
    {sh === 0 && (<>
      <div style={{ position: "absolute", left: 686, top: 414, zIndex: 12 }}>
        <Mascot lf={f} size={262} stern={0.62} nodAmp={2.2} nodSpeed={14} glasses={1} />
      </div>
      <Printer f={f} x={54} y={140} s={1.16} z={36} />
      <Docket x={98} y={310} s={1.02} z={38} lines={JOB} feed={(f * 0.9) % 34} />
    </>)}
    {/* B · hard cut wide: the rail, and it is the same docket every time */}
    {sh === 1 && (<>
      <div style={{ position: "absolute", left: 0, right: 0, top: 158, height: 13,
        background: "#9A907C", zIndex: 30 }} />
      {Array.from({ length: 9 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: 18 + i * 112, top: 171, width: 96,
          height: 210 + (i % 3) * 42, background: PAPER, boxShadow: SH, zIndex: 32,
          transform: `rotate(${(i % 2 ? 1 : -1) * 1.6}deg)`, transformOrigin: "50% 0%" }}>
          {Array.from({ length: 6 }, (_, j) => (
            <div key={j} style={{ position: "absolute", left: 12, top: 20 + j * 26, width: 68,
              height: 8, borderRadius: 4, background: "#D6CCB6" }} />
          ))}
        </div>
      ))}
      <div style={{ position: "absolute", left: 396, top: 424, zIndex: 12 }}>
        <Mascot lf={f} size={230} stern={0.5} nodAmp={2.4} nodSpeed={13} prof={1} />
      </div>
      <Band t="EVERY SINGLE AGENT" y={664} />
    </>)}
    {/* C · the length itself, filling the frame */}
    {sh === 2 && (<>
      {[0, 1, 2].map((i) => (
        <Docket key={i} x={-8 + i * 348} y={116 - i * 44} s={0.78} z={34 + i}
                lines={JOB} feed={E(k, 0, 40, 0, 96 + i * 34, OUT)} />
      ))}
      <Band t="STILL PRINTING" y={664} c={RED} />
    </>)}
    {/* D · the same job, one line
        ⚠️ PIVOT-DEPENDENT. "describe it in English and it builds the system" is
        the ~Apr-2025 Rowboat. The shipping product is an AI coworker with memory.
        If the VO gets recut, this shot is the one that goes. */}
    {sh === 3 && (<>
      <Docket x={250} y={182} s={1.06} z={40} one lines={["“build me an agent”"]} />
      <Mark x={250} y={452} s={0.94} z={50} t={E(k, 4, 20, 0, 1, BACK)} />
      <div style={{ position: "absolute", left: 250, top: 534, padding: "14px 34px",
        borderRadius: 15, background: GO, boxShadow: SH_D, zIndex: 50,
        transform: `scale(${E(k, 12, 28, 0, 1, BACK)})`, transformOrigin: "0% 50%",
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 46, color: PAPER }}>
        {STATS.license} &middot; FREE
      </div>
      <div style={{ position: "absolute", left: 716, top: 366, zIndex: 12 }}>
        <Mascot lf={f} size={246} cheer={0.68} nodAmp={4} nodSpeed={9} glasses={1} />
      </div>
    </>)}
  </>, cues("gear-stutter.wav", "counter-tick.wav", "riser-sharp.wav", "success-jingle.wav"));
};

/* ============================================================== CONCEPT D ==
   THE FUNERAL · mechanism ALIVE v DEAD.
   The VO's biggest claim is "made every AI agency in the world irrelevant
   overnight", and this is that sentence with nothing decoded away.
   ⛔ Built at NOON on purpose. A graveyard renders itself as night if you let
      it, and a dark frame 0 loses the feed before it is read. White sky, mown
      grass, pale stone — the bright things this world already owns.
   ⚠️ The boldest of the five. If a headstone is off-brand, this is the one to cut.
   ========================================================================= */
/** the row of graves. A real MARK wherever one exists, a name where the thing is
    a category rather than a product. ⛔ Only marks already in public/logos.
    ⛔ ALEX'S CALL, MADE TWICE. I flagged that a headstone asserts the thing on it
    is dead — which Claude Code and Cursor are not — and he confirmed he wants
    them on the stones anyway. It plays as the VO's own first line rather than as
    an obituary, and it is the most recognisable frame 0 this audience could get. */
/** ⛔ FOUR, NOT FIVE, AND EVERY ONE OF THEM A MARK. Five stones put each one at
    197px with a 98px tile, which is where a logo stops being recognisable at feed
    size — and the fifth had to carry the word "AI AGENCY" because no mark exists
    for it, which is exactly the text Alex asked to remove. Four at 252px each. */
const GRAVES = ["claude", "cursor", "githubcopilot", "windsurf"];
/** the second rank, on the row behind — all real dev tools, all already in
    public/logos. ⛔ Nothing invented and nothing without a mark. */
const GRAVES2 = ["cline", "v0", "replit", "warp"];

/** the whole graveyard, far row first so the near row draws over it. Twenty-six
    stones in three depth bands — this is shot C's entire event. */
const FIELD = [2, 1, 0].flatMap((row) => {
  const n = [9, 8, 9][row];
  return Array.from({ length: n }, (_, j) => ({
    row,
    x: -46 + j * (1104 / n) + (row % 2) * 46 + ((j * 53) % 5) * 7,
    /* ⛔ the front row sat at 560 and its logo tiles were cut off by the panel
       floor — the four marks the shot exists for. Rows lifted and jittered so it
       reads as a graveyard rather than three tidy shelves. */
    y: [498, 430, 382][row] + ((j * 37) % 3) * 9,
    s: [0.34, 0.24, 0.17][row],
    /* ⛔ spread across BOTH near rows, and never at the centre — the monument
       lands there in shot D and would sit on top of them. More marks also fixes
       the second half of the note: a field of blank stones is a texture, a field
       of tools anyone watching actually uses is the claim. */
    logo: row === 0 ? GRAVES[[1, 2, 6, 7].indexOf(j)]
        : row === 1 ? GRAVES2[[0, 1, 6, 7].indexOf(j)] : undefined,
    /* ⛔ THIS WAS `(2 - row) * 2.4` — the FAR row led, so the cut landed on bare
       grass and the big near stones did not arrive for another 5 frames. Alex:
       "at 2 seconds there's nothing going on before the grave drops". The NEAR
       row leads now, and nothing waits more than ~4 frames. */
    d: j * 0.55 + row * 1.4,
  }));
});
/** ⛔ A SECOND WAVE, FOR SHOT D'S TAIL. Moving the cut up made shot D 49 frames
    long and the monument lands at k=5 — so 36 of those frames had nothing
    arriving in them, which is the same dwell Alex flagged, just moved later.
    These keep breaking ground BEHIND it for the whole shot, so "every one of
    them" is still happening while the monument stands there.
    ⚠️ MEASURED: this alone bought ONE frame (36 dead -> 35). At s 0.14-0.23 they
    are 59-97px on a 1012px panel, which is the documented "a small prop is a
    rounding error to a frame-difference metric" trap. Kept because it fills the
    picture, NOT because it fixed the dwell — the two changes below did that. */
const FIELD_D = Array.from({ length: 13 }, (_, i) => ({
  x: -70 + i * 92 + (i % 3) * 22,
  y: [352, 402, 444][i % 3] + ((i * 29) % 3) * 7,
  s: [0.14, 0.19, 0.23][i % 3],
  d: 8 + i * 2.4,
}));

/** ⛔ SHOT C WAS ALL HAPPENING IN THE BOTTOM THIRD. Every stone arrived below
    y=500 and the top 60% of the panel — sky, hedge, railing — never changed, so
    "at 2-2.5 seconds there's nothing still". Three things now fill the frame:
    a FOREGROUND RANK cropped by the panel floor (big shapes, arriving first),
    turf thrown high enough to cross the sky, and a flock going up out of it. */
const FORE = [-70, 236, 552, 846].map((x, i) => ({ x, s: 0.72, d: i * 1.2 }));

/** shot D's own field, re-laid for the ground-level camera: one shallow rank
    along the dropped horizon instead of three receding rows. */
const FIELD_LOW = FIELD.map((g) => ({ ...g, y: g.y + 212, s: g.s * 0.84 }));

/** it is still being driven in long after it lands — 150px of growth across the
    shot, on a 340px-wide object, which is the large-area motion the tail needed */
const GROW = (k: number) => E(k, 8, 46, 0, 150, OUT);

/** everything on the ground kicks when the monument lands at k=5 */
const JOLT = (k: number, i: number) =>
  Math.max(0, 1 - Math.abs(k - 5) / 6) ** 2 * Math.sin(k * 2.3 + i) * 13;
/** ⛔ a rigid box cannot lean, but it can WALK: swing the boots in opposition and
    bob the body on the plant. */
const Walk: React.FC<{ f: number; x: number; y: number; s?: number }> = ({ f, x, y, s = 1 }) => {
  const ph = f * 0.36;
  return (
    <div style={{ position: "absolute", left: x, top: y - Math.abs(Math.cos(ph)) * 6, zIndex: 42 }}>
      <Mascot lf={f} size={196 * s} stern={0.8} nodAmp={0} nodSpeed={40} suit={1} />
      {[0, 1].map((i) => (
        <div key={i} style={{ position: "absolute", left: (52 + i * 60) * s,
          top: (172 - Math.max(0, Math.sin(ph + i * Math.PI)) * 16) * s,
          width: 34 * s, height: 21 * s, borderRadius: 6 * s, background: "#4B3A2A" }} />
      ))}
    </div>
  );
};

export const HookWake: React.FC = () => {
  const f = useCurrentFrame(); const sh = shot(f); const k = local(f);
  return wrap(<>
    <Lawn f={f} horizon={HZ[sh]} tone={TONE[sh]} />
    {/* ------------------------------------------------------------------ A --
        0.00-0.93s · "Forget Claude Code or Cursor"
        ⛔ FRAME 0 IS COMPLETE — both stones fully there, both marks readable, no
        hero animates in. But complete is not the same as STILL, and this window
        measured 1.44 frame-delta against 3.2 at the cuts, which is Alex's note:
        "at frame 0 the graves don't have enough motion". The camera cannot move
        here (THE-OPEN locks it), so the motion has to be MANY LARGE OBJECTS
        TRAVELLING — the only other lever that registers.

        The fiction: they landed a heartbeat before frame 0. So at frame 0 the
        turf is still in the air, the dust has not cleared, the stones are still
        rocking off the impact, and the mourner is still walking in.
        ------------------------------------------------------------------- */}
    {sh === 0 && (<>
      {/* ⛔ THIS WAS A MID-WIDE OF TWO STONES, and so were B, C and D — four wides
          at one distance, which is the documented "it doesn't flip through new
          scenes" failure. It is now an EXTREME CLOSE: one stone at 2.35x, the
          Claude Code mark 490px across, the Cursor stone cropped at the right
          edge to tease the cut. Same world, completely different framing. */}
      {/* dust hanging at the base, close enough to be big */}
      {Array.from({ length: 12 }, (_, i) => {
        const a = Math.min(1, 0.22 + f / 30);
        const dir = i % 2 ? 1 : -1;
        return (
          <div key={`du${i}`} style={{ position: "absolute",
            left: 330 + dir * (60 + (i % 6) * 96) * (0.4 + a * 1.4),
            top: 690 - Math.sin(a * Math.PI) * (44 + (i % 4) * 34),
            width: (96 + (i % 4) * 54) * (0.6 + a), height: 48 + (i % 3) * 20,
            borderRadius: 26, background: "#CBBE9C", opacity: (1 - a) * 0.8, zIndex: 24 }} />
        );
      })}
      {/* the Cursor stone, cropped hard at the right edge */}
      <div style={{ position: "absolute", inset: 0, zIndex: 30 }}>
        <Stone f={f + 23} x={742} y={176} s={1.9} logo="cursor" />
      </div>
      {/* the hero, still rocking off the landing */}
      {(() => {
        const rock = Math.max(0, 1 - f / 15) ** 2 * Math.sin(f * 1.15) * 9;
        return (
          <div style={{ position: "absolute", inset: 0, zIndex: 36,
            transform: `translateY(${rock}px) rotate(${rock * 0.1}deg)`,
            transformOrigin: "300px 860px" }}>
            {/* ⛔ 2.35x cropped the arch AND the base off, so frame 0 read as "a
                white square on a pale shape" rather than a headstone — the one
                frame guaranteed to be seen has to be unambiguous. 1.9x keeps the
                whole arch and the plinth in, and the mark is still 395px. */}
            <Stone f={f} x={-120} y={176} s={1.9} logo="claude" />
          </div>
        );
      })()}
      {/* turf still in the air, behind the stones and big at this distance */}
      {Array.from({ length: 20 }, (_, i) => {
        const dir = i % 2 ? 1 : -1;
        const a = Math.min(1, 0.16 + f / (23 + (i % 5) * 4));
        return (
          <div key={`cl${i}`} style={{ position: "absolute",
            left: 330 + dir * (70 + (i % 10) * 86) * a,
            top: 700 - Math.sin(a * Math.PI) * (300 + (i % 6) * 96),
            width: 44 + (i % 5) * 28, height: 26 + (i % 3) * 13, borderRadius: 11,
            background: i % 3 ? "#5F9349" : "#6B5540", zIndex: 22,
            opacity: a > 0.9 ? (1 - a) * 10 : 1,
            transform: `rotate(${i * 37 + a * 340}deg)` }} />
        );
      })}
      {/* the mourner, cropped at the chest in the near corner — a character in
          frame 0 without breaking the close */}
      <div style={{ position: "absolute", left: 612, top: 604, zIndex: 44 }}>
        <Mascot lf={f} size={392} stern={0.85} nodAmp={1.4} nodSpeed={20} suit={1} />
      </div>
      <Wreath f={f} x={-40} y={636} s={1.9} z={46} />
    </>)}
    {/* B · hard cut wide: it is not one or two of them */}
    {sh === 1 && (<>
      {/* they break the ground in sequence, each one throwing turf */}
      {/* the wide. Same world, pulled back — this is the scale jump off the close. */}
      {GRAVES.map((logo, i) => (
        <Stone key={logo} f={f + i * 17} x={8 + i * 250} y={318 + (i % 2) * 28} s={0.6}
               z={30 + i} logo={logo} rise={E(k, 1 + i * 5, 16 + i * 5, 0, 1, BACK)} />
      ))}
      {GRAVES.map((logo, i) => (
        <Wreath key={logo} f={f + i * 9} x={64 + i * 250} y={528 + (i % 2) * 28} s={0.46}
                z={40 + i} t={E(k, 14 + i * 5, 26 + i * 5, 0, 1, BACK)} />
      ))}
      <div style={{ position: "absolute", left: 424, top: 596, zIndex: 48 }}>
        <Mascot lf={f} size={168} stern={0.7} nodAmp={1.8} nodSpeed={17} prof={1} />
      </div>
      <Band t="EVERY ONE OF THEM" y={694} />
    </>)}
    {/* ------------------------------------------------------------------ C --
        2.00-3.27s · "to build AI agents"
        ⛔ THIS WAS ONE STONE BEING CHISELLED and it was the slowest shot in the
        reel — a 116px word revealing across a static slab. The VO is escalating
        here, so the picture has to: the whole field goes under, a wave of graves
        breaking the ground from the front row to the horizon. Twenty-six objects
        arriving in 1.2s is the only kind of motion that registers.
        ------------------------------------------------------------------- */}
    {sh === 2 && (<>
      {/* ⛔ the four MARKED graves are already standing at k=0 — they were up in
          shot B and a hard cut must land on complete content, never on an empty
          set that then fills. Everything else erupts around them from frame 1. */}
      {FIELD.map((g, i) => (
        <Stone key={i} f={f + i * 7} x={g.x} y={g.y} s={g.s} z={20 + g.row * 10 + (i % 7)}
               logo={g.logo}
               rise={g.logo ? 1 : E(k, g.d, g.d + 9, 0, 1, BACK)} />
      ))}
      {/* the foreground rank, cropped by the panel floor — the biggest objects in
          the shot and the first to arrive */}
      {FORE.map((g, i) => (
        <Stone key={`fg${i}`} f={f + i * 13} x={g.x} y={674} s={g.s} z={58 + i}
               rise={E(k, g.d, g.d + 10, 0, 1, BACK)} />
      ))}
      {/* turf, thrown high enough to cross the sky rather than skim the grass */}
      {Array.from({ length: 26 }, (_, i) => {
        const a = E(k, i * 0.5, i * 0.5 + 17, 0, 1, OUT);
        return (
          <div key={`t${i}`} style={{ position: "absolute", left: -10 + i * 41,
            top: 600 - Math.sin(a * Math.PI) * (330 + (i % 6) * 96),
            width: 34 + (i % 5) * 20, height: 19 + (i % 3) * 9,
            borderRadius: 9, background: i % 3 ? "#5F9349" : "#6B5540",
            opacity: a > 0.88 ? (1 - a) * 8 : 1, zIndex: 62,
            transform: `rotate(${i * 47 + a * 300}deg)` }} />
        );
      })}
      {/* and the whole flock goes up out of the field, across the empty sky */}
      {Array.from({ length: 11 }, (_, i) => {
        const a = E(k, 1 + (i % 5) * 1.6, 26 + (i % 5) * 1.6, 0, 1, OUT);
        return (
          <div key={`bf${i}`} style={{ position: "absolute",
            left: 40 + i * 92 + (i - 5) * a * 168,
            top: 470 - a * (330 + (i % 4) * 62), width: 40, height: 14, zIndex: 64,
            opacity: a < 0.06 ? 0 : 1 - a * 0.3 }}>
            <div style={{ position: "absolute", left: 0, width: 20, height: 7,
              background: "#7E8C80", transform: `rotate(${-22 - Math.sin(f / 2.4 + i) * 16}deg)` }} />
            <div style={{ position: "absolute", left: 19, width: 20, height: 7,
              background: "#7E8C80", transform: `rotate(${22 + Math.sin(f / 2.4 + i) * 16}deg)` }} />
          </div>
        );
      })}
    </>)}
    {/* ------------------------------------------------------------------ D --
        3.27-4.59s · "because this is gonna hurt."
        ⛔ THIS WAS A CALM PROOF CARD — the reel's most violent line playing under
        a tidy stats panel. It is now the thing that did it, arriving: a monument
        SLAMS down over the whole graveyard, the ground jolts, dust goes across
        the full width and the birds scatter. Scale IS the punchline — every
        grave in shot C fits at its base.
        ------------------------------------------------------------------- */}
    {sh === 3 && (<>
      {/* ⛔ LOW ANGLE. Horizon dropped to 596 so the camera is on the ground and
          the monument runs out of the top of frame — the fourth distinct framing,
          and the reason it reads as towering rather than as another wide. */}
      {FIELD_LOW.map((g, i) => (
        <Stone key={i} f={f + i * 7} x={g.x} y={g.y + JOLT(k, i)} s={g.s}
               z={20 + g.row * 10 + (i % 7)} logo={g.logo}
               /* the two back rows go under as it grows — a large-area change the
                  metric can see AND the beat the shot wants: everything else is
                  gone and this is the only thing left standing. The marked front
                  row stays, because those four logos are why the shot exists. */
               rise={g.row === 0 ? 1 : 1 - E(k, 14 + (i % 9) * 2.2, 30 + (i % 9) * 2.2, 0, 1, IN_Q)} />
      ))}
      {/* and they keep coming, behind it, for as long as the shot runs */}
      {FIELD_D.map((g, i) => (
        <Stone key={`d${i}`} f={f + i * 11} x={g.x} y={g.y + 214} s={g.s * 0.8} z={12 + (i % 4)}
               rise={E(k, g.d, g.d + 9, 0, 1, BACK)} />
      ))}
      {/* the shadow it throws across the graveyard as it comes down — weight,
          without touching the camera */}
      <div style={{ position: "absolute", left: 200, top: 700, width: 612, height: 58,
        borderRadius: 26, background: "rgba(38,52,32,0.30)", zIndex: 24,
        transform: `scaleX(${0.34 + E(k, 0, 5, 0, 1, IN_Q) * 0.66})`,
        transformOrigin: "50% 50%" }} />
      {/* and the ground splitting under it */}
      {Array.from({ length: 12 }, (_, i) => {
        const dir = i % 2 ? 1 : -1, step = Math.floor(i / 2);
        const on = E(k, 5 + step * 1.3, 9 + step * 1.3, 0, 1, OUT);
        return (
          <div key={`cr${i}`} style={{ position: "absolute",
            left: 506 + dir * (46 + step * 78) - 40, top: 738 + (step % 2) * 11,
            width: 86 * on, height: 9, borderRadius: 4, background: "#4A5C3A",
            opacity: 0.75 * on, zIndex: 25,
            transform: `rotate(${dir * (step % 2 ? 5 : -4)}deg)` }} />
        );
      })}
      {/* the monument, dropping from above frame and landing at k=9 */}
      <div style={{ position: "absolute", left: 296, top: 34 - (1 - E(k, 0, 5, 0, 1, IN_Q)) * 1040 - GROW(k),
        zIndex: 70, transformOrigin: "50% 100%",
        transform: `scaleY(${1 - Math.max(0, 1 - Math.abs(k - 6) / 4) * 0.06})` }}>
        <div style={{ width: 420, height: 76, background: STONE_D,
          clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }} />
        <div style={{ width: 420, height: 560 + GROW(k), background: STONE,
          boxShadow: "0 26px 44px rgba(60,44,28,0.34)" }} />
        <div style={{ position: "absolute", left: 18, top: 76, width: 384,
          height: 560 + GROW(k), border: `6px solid ${STONE_D}` }} />
        {/* ⛔ the mark rides HALF the growth, not all of it. At full travel it
            slid to panel-y 74, which is under the header pill (it occludes y
            0..100 across x 96..881) — the one element that must never be
            covered would have been. Half-shift parks it at ~176. */}
        <div style={{ position: "absolute", left: 82, top: 236 + GROW(k) * 0.5,
          width: 256, height: 256,
          borderRadius: 46, background: "#FFFFFF", boxShadow: SH_D, overflow: "hidden",
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Img src={staticFile("logos/rowboat.png")}
               style={{ width: 188, height: 188, objectFit: "contain" }} />
          <div style={{ position: "absolute", top: -40, bottom: -40, width: 22,
            left: ((f * 3.1) % 460) - 90, background: "#FFFFFF", opacity: 0.22,
            transform: "rotate(18deg)" }} />
        </div>
        <div style={{ position: "absolute", left: -50, top: 636 + GROW(k), width: 520,
          height: 52, borderRadius: 8, background: STONE_D }} />
        <div style={{ position: "absolute", left: -88, top: 682 + GROW(k), width: 596,
          height: 34, borderRadius: "22px 22px 0 0", background: "#547E44" }} />
      </div>
      {/* the ground giving out under it — dust straight across the frame */}
      {Array.from({ length: 22 }, (_, i) => {
        const a = E(k, 5, 30, 0, 1, OUT);
        const dir = i < 11 ? -1 : 1;
        return (
          <div key={`d${i}`} style={{ position: "absolute",
            left: 470 + dir * (30 + (i % 11) * 52) * (0.3 + a * 1.9),
            top: 726 - Math.sin(a * Math.PI) * (48 + (i % 5) * 30),
            width: 40 + (i % 4) * 26, height: 20 + (i % 3) * 8, borderRadius: 12,
            background: "#CBBE9C", opacity: (1 - a) * 0.85, zIndex: 72 }} />
        );
      })}
      {/* birds going up and out */}
      {Array.from({ length: 5 }, (_, i) => {
        const a = E(k, 5, 26, 0, 1, OUT);
        return (
          <div key={`b${i}`} style={{ position: "absolute",
            left: 190 + i * 160 + (i - 2) * a * 190, top: 420 - a * 340,
            width: 34, height: 12, zIndex: 74, opacity: 1 - a * 0.4 }}>
            <div style={{ position: "absolute", left: 0, width: 17, height: 6,
              background: "#8E9A90", transform: `rotate(${-19 - Math.sin(f / 3 + i) * 12}deg)` }} />
            <div style={{ position: "absolute", left: 16, width: 17, height: 6,
              background: "#8E9A90", transform: `rotate(${19 + Math.sin(f / 3 + i) * 12}deg)` }} />
          </div>
        );
      })}
    </>)}
  </>, cues("ring-low.wav", "hit-up.wav", "gear-mech.wav", "positive-chime.wav"));
};

/* ============================================================== CONCEPT E ==
   THE ORDER WINDOW · mechanism SPEED.
   The VO says the tool "takes orders in English and delivers in seconds", so the
   ritual is the one that literally does that: a ticket goes up, a pass fills.
   Frame 0 is the ticket landing on the rail.
   ⚠️ PIVOT-DEPENDENT — this is the concept most tied to the multi-agent-builder
      Rowboat rather than the AI-coworker one that ships today.
   ========================================================================= */
export const HookPass: React.FC = () => {
  const f = useCurrentFrame(); const sh = shot(f); const k = local(f);
  return wrap(<>
    <Pass f={f} shelf={486} />
    {/* A · the order, in plain English, just clipped up */}
    {sh === 0 && (<>
      <div style={{ position: "absolute", left: 0, right: 0, top: 142, height: 15,
        background: STEEL_D, zIndex: 12 }} />
      <Ticket x={244} y={156} s={1.24} z={14} t="1&times; AI AGENT" sub="IN PLAIN ENGLISH"
              rot={-3} drop={E(f, 0, 8, -18, 0, BACK)} />
      {/* behind the pass (z < PASS_Z) so the shelf crops him and he is IN the room */}
      <div style={{ position: "absolute", left: 716, top: 336, zIndex: 12 }}>
        <Mascot lf={f} size={238} cheer={0.44} nodAmp={3} nodSpeed={11} chef={1} />
      </div>
    </>)}
    {/* B · hard cut: the pass fills — a crew, not a chatbot */}
    {sh === 1 && (<>
      {["slack", "linear", "jira", "github"].map((t, i) => (
        <Plate key={t} f={f + i * 15} x={44 + i * 238} y={306} s={1.06} z={40 + i}
               who={["glasses", "suit", "chef", "prof"][i]} tool={t}
               t={E(k, 1 + i * 5, 17 + i * 5, 0, 1, BACK)} />
      ))}
      <Band t="A WHOLE CREW, ONE ORDER" y={668} />
    </>)}
    {/* C · the number, in-world, on the specials board */}
    {sh === 2 && (<>
      <div style={{ position: "absolute", left: 74, top: 138, width: 864, height: 404,
        borderRadius: 18, background: "#2E2A24", boxShadow: SH_D, zIndex: 40 }} />
      <div style={{ position: "absolute", left: 100, top: 164, width: 812, height: 352,
        borderRadius: 12, border: "5px solid #6E6455", zIndex: 41 }} />
      <div style={{ position: "absolute", left: 74, width: 864, top: 208, textAlign: "center",
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 34, letterSpacing: "0.2em",
        color: "#CFC6B2", zIndex: 44 }}>ON GITHUB</div>
      <div style={{ position: "absolute", left: 74, width: 864, top: 262, textAlign: "center",
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 190, lineHeight: 1,
        letterSpacing: "-0.06em", color: "#F3EBD8", zIndex: 44,
        transform: `scale(${E(k, 0, 14, 0.84, 1, BACK)})` }}>
        &#9733; {STATS.stars}
      </div>
      <div style={{ position: "absolute", left: 74, width: 864, top: 456, textAlign: "center",
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 40, letterSpacing: "0.12em",
        color: "#B7AC96", zIndex: 44 }}>{STATS.license}</div>
    </>)}
    {/* D · who cooked it — the credential, and it is the header's own claim */}
    {sh === 3 && (<>
      <Credential x={186} y={214} s={1} z={60} t={E(k, 0, 15, 0.86, 1, BACK)} />
      <div style={{ position: "absolute", left: 372, top: 528, padding: "16px 42px",
        borderRadius: 17, background: GO, boxShadow: SH_D, zIndex: 62,
        transform: `scale(${E(k, 12, 28, 0, 1, BACK)})`,
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 62, color: PAPER }}>FREE</div>
    </>)}
  </>, cues("snap.wav", "ping.wav", "crowd-wow.wav", "cash-register.wav"));
};
