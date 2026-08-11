import React from "react";
import { AbsoluteFill, useCurrentFrame, Img, staticFile } from "remotion";
import { inter, fraunces } from "./fonts";
import { Panel, hexA, MONO } from "./SlopKit";
import {
  Stage, Room, Cone, Post, MarkTile, Stand, Drape, Escape, Rail, Chip, CARD_W, CARD_H,
  useTheme, ThemeCtx, THEMES, Hoplite,
  PAIRS, ROOMS, REMAIN, TOTAL, useRoom, W, H, SH, SH_D, SAFE, RED, GO, AMB,
  Claudie, CLAY, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark,
} from "./TagWorld";

/* =========================================================================
   REEL 97 "FREE" · THE BODY.  Board: storyboards/97-free.md.

   ⛔ TEN BEATS OF THE SAME SENTENCE. Every retention rule in the repo points at
      the same failure — reel 93 (*a GRID has no moment*), reel 96 (*four of nine
      scenes were the same grid; "it will not retain our viewers"*). Three things
      carry the load, and all three are needed:
        1. a DIFFERENT DOMINANT OBJECT per beat (TagProps: what each tool does)
        2. a DIFFERENT ROOM per beat (TagWorld.ROOMS, no two neighbours share a
           temperature family)
        3. an ARC inside every beat — build, then the price SLAMS, then it FLIPS
      What repeats on purpose is the RHYTHM, because the rhythm is the script.

   ⛔ EVERY SCENE CARRIES A SLOW IN-PANEL PUSH. Reel 96 boarded "locked camera"
      literally and measured median motion 5.91 against a bar of 9.0, 7 of 9
      scenes failing; reel 95, praised as "very elevated", carries twelve pushes
      and measures 9.92. CAMERA-GRAMMAR's "locked by default" is about
      RE-FRAMING, not about the push.

   ⛔ ONE HERO OBJECT PER SCENE. The mark and the price are ONE composite — a
      tile bolted to an enamel plate — not three things competing for rank. The
      first layout had a paid tile, a free tile and a plate all fighting, which
      is the clutter `decluttering, never adding` exists to stop.
   ========================================================================= */

/* the hero composite's geometry, identical in all ten scenes. It lands ON the
   lower edge of the work surface on purpose — a price plate slamming onto the
   tool is the beat, and a tag parked in clear air below it is a caption. */
const TAG_Y = 592, TILE_X = 367, PLATE_X = 586;

/* ⛔ THE TEN PRODUCT SURFACES ARE NO LONGER MOUNTED. `TagProps.tsx` still holds
   them (a render window, a citation fan, an NLE, a week queue) and they are good
   drawings, but they were the wrong answer to this script. Alex, round 1:
   *"each of the scenes needs to be way more hierarchical and just have like two
   panels to show paid vs free. I don't need whole scenes, just two simple scenes
   hierarchically showing each and nothing else basically, and the header should
   just be the category. Way simpler, way more hierarchical."*

   The diagnosis behind that note: a mock of Midjourney's UI beside a price is
   INFORMATION, and what a ten-times-repeated comparison needs is a RANKING. Ten
   different app windows also made the one thing that repeats — the comparison —
   the smallest thing on screen. The file is kept, unmounted, because the drawing
   work is reusable the moment a script actually wants "what the tool does". */

/** ONE BEAT: two EQUAL cards, and the free one is under a drape that comes off.

    ⛔⛔ ROUNDS 2-6 RANKED THE TWO CARDS BY SIZE — winner 470 tall on paper, loser
    340 and dark. Alex, round 7: *"don't make one smaller one bigger, just make
    both the same size, and the other side is like a curtain that says FREE then
    it gets pulled off."*

    ⭐ THE RANK DID NOT GO AWAY, IT MOVED. Concealment outranks size: before the
    pull the paid card is the only thing in the room you can actually see, and
    the right side is a question rather than an answer. That is a better version
    of the same job, because it turns all ten beats into REVEALS — you know it is
    free, you do not know what it IS, and the word "free" is what shows you. */
export const Beat: React.FC<{ i: number; paidAt: number; freeAt: number;
  hook?: boolean; push?: [number, number, number] }> =
  ({ i, paidAt, freeAt, hook, push }) => {
  const f = useCurrentFrame();
  const P = PAIRS[i];
  const R = useRoom(i);
  const T = useTheme();

  /* ⛔⛔ HITS COME FROM THE ONSET-ANCHORED CAPTION JSON, AND THE PICTURE LEADS
     THE WORD BY 4 FRAMES so its midpoint, not its start, lands on the syllable.
     See ClaudeFreeReel.PAID/FREE for the measurement that produced this. */
  const LEAD_V = 4;
  const pf = f - (paidAt - LEAD_V), ff = f - (freeAt - LEAD_V);

  /* ⛔⛔ THE FLOOR OF THE COMPOSITION IS SET BY THE STRONGEST PUSH, NOT BY THE
     PANEL. Once each world got its own camera, the same rail at y706 landed
     between 784 and 817 depending on the origin — clipped in all six, worst in
     the coin-op (scale 1.17 about 50%). Everything moved UP so the deepest push
     still clears 792: stands to 608, rail to 668, the figures to 718/726. */
  const BASE = 608, LX = 300, RX = 712;
  const pull = ff < 0 ? 0 : E(ff, 0, 13, 0, 1, IO);
  const punch = pf < 0 ? 1 : 1 + Math.sin(Math.min(1, pf / 9) * Math.PI) * 0.22;
  const strike = ff < 0 ? 0 : E(ff, 2, 11, 0, 1, OUT);
  const rise = hook ? 1 : E(f, 0, 9, 0, 1, OUT);
  /* the puller dips into it, then the cloth goes */
  const dip = ff < 0 ? 0 : Math.max(0, Math.sin(Math.min(1, ff / 7) * Math.PI) * 7);
  /* ⭐ THE RUMBLE. A small idle tremble all the way through (there is something
     under there), ramping to full over the 20 frames BEFORE the pull and
     decaying over the 6 after it. ⛔ The build has to finish ON the pull, not
     start there — anticipation that arrives with the payoff is not
     anticipation. */
  const build = ff < 0 ? Math.max(0, 1 + ff / 20) : Math.max(0, 1 - ff / 6);
  /* ⭐ THE HOOK SHAKES HARDER AND FOR LONGER. Round 9: *"shake more at the hook
     beginning scene."*  Scene 0 is the only part of the reel guaranteed to be
     seen, so its curtain is straining from frame 0 rather than picking up in the
     last two thirds of a second: a 40-frame ramp instead of 20, and 1.75x the
     amplitude. Frame 0 stays settled and readable — a tremble is not a move. */
  const hookBuild = hook ? Math.max(0, 0.35 + 0.65 * Math.min(1, (f + 6) / 40)) : 0;
  const shake = Math.min(1.75, (hook ? 1.75 : 1) * Math.min(1, 0.16 + Math.max(build, hookBuild) * 0.88));
  /* ⭐ AND THE LIGHT LOOKS AT IT BEFORE IT GOES. This is why the curtain was not
     popping: the spot sat on the PAID side through the whole rumble, so the
     thing being shaken was the one thing in the room that was unlit. The head
     swings 85% of the way across during the build and completes on the pull. */
  const attention = ff < 0 ? Math.max(0, (ff + 20) / 20) * 0.85 : Math.max(0.85, pull);
  /* ⭐ THE COLOUR COMING OUT. It grows on the same curve as the shake, so the
     rumble and the light are one event, and it PEAKS at the pull rather than
     after it. The hook starts leaking from frame 0 like its shake does. */
  /* ⛔ AND IT DECAYS ONCE THE CLOTH IS OFF. Held at full it drew rays straight
     across "Nano Banana" and the mark — the light was obscuring the reveal it
     existed to build up to. There is nothing left to escape FROM once the
     curtain is gone, so it falls back to a rim and fades. */
  const escT = Math.min(1, ff < 0
    ? Math.max(hook ? Math.min(0.86, 0.20 + f / 62) : 0, Math.max(0, (ff + 26) / 26))
    : Math.max(0.24, 1 - ff / 26));
  const burst = ff < 0 ? 0 : Math.max(0, 1 - ff / 14);
  const spot = LX + (RX - LX) * Math.max(pull, attention);

  return (
    <Stage i={i} push={push ?? T.cam} origin={T.origin} dust vig={T.vig}>
      <T.Dress p={R} f={f} />
      <Post side="l" c={dark(R.wall, 0.42)} w={54} />
      <Post side="r" c={dark(R.wall, 0.48)} w={48} />
      <T.Fixture x={spot} c={R.key} />
      <Cone x={spot} y={44} top={70} bot={520} len={700} c={R.key} o={0.30} z={19} f={f} />
      <div style={{ position: "absolute", left: spot - 200, top: 630, width: 400, height: 54,
        borderRadius: "50%", background: R.key, opacity: 0.16, zIndex: 20 }} />
      {/* the free side's own floor shadow jitters with the rumble, so the shake
          reads as the ROOM reacting rather than as one prop wobbling */}
      <div style={{ position: "absolute", left: RX - 190 + Math.sin(f * 2.1) * 2.4 * shake,
        top: 636, width: 380, height: 26, borderRadius: "50%", background: "#05070B",
        opacity: 0.30 + 0.10 * shake, zIndex: 21 }} />

      <div style={{ position: "absolute", inset: 0, zIndex: 60,
        transform: `translateY(${(1 - rise) * 70}px)`, opacity: rise }}>
        <Stand cx={LX} base={BASE} win={1 - pull} logo={P.pLogo} name={P.paid}
          price={P.price} tier={P.tier} note={P.note} punch={punch} strike={strike} z={62} />
        {/* ⛔ THE BARRIER IS THE PAID SIDE'S ALONE. It is the permanent half of
            the argument; the drape is the momentary half. */}
        <T.Barrier cx={LX} base={BASE} w={CARD_W} h={CARD_H} dim={pull} />

        <Stand cx={RX} base={BASE} win={pull} logo={P.fLogo} name={P.free}
          price={0} free
          punch={ff < 0 ? 1 : 1 + Math.sin(Math.min(1, ff / 13) * Math.PI) * 0.24} z={61} />
        {/* ⛔ z 58: BEHIND BOTH CARDS and behind the cloth, so the rays only ever
            show where they clear a rim. In front of the card (z 74) they read as
            a decal painted on the reveal instead of as light coming from behind
            it, and after the pull they crossed the brand mark and the name. */}
        <Escape cx={RX} base={BASE} w={CARD_W + 34} h={CARD_H + 34}
          t={escT} c={T.cloth} burst={burst} f={f} z={58} />
        <Drape cx={RX} base={BASE} pull={pull} cloth={T.cloth} f={f} shake={shake}
          fabric={T.fabric} reveal={T.reveal} z={78} />
      </div>

      {/* ⭐ THE PULLER. Odyssey cut only: one hoplite in the near-right
          foreground with the drape's hem in his hands, who leans back and hauls
          it off on the word.
          ⛔ HE SITS ENTIRELY BELOW THE CARD. At s 0.78 he is 148px and the gap
          between the card's foot (640) and the panel floor (792) is 152 — the
          only size that fits a full figure under it without covering the price
          the card exists to show. */}
      {T.crew && (
        <div style={{ position: "absolute", inset: 0, zIndex: 84 }}>
          <Hoplite x={845} y={726 + dip} s={0.78} f={f} z={84}
            cheer={ff < 0 ? 0 : Math.min(1, Math.max(0, ff / 12))}
            reach={ff < 0 ? 42 : 42 - E(ff, 0, 14, 0, 32, OUT)}
            lean={ff < 0 ? 0 : E(ff, 0, 12, 0, 1, OUT)} />
        </div>
      )}

      {/* the visitor: every cut but the odyssey one, where the hoplite is the
          figure and a second Claude would just be crowding. */}
      <div style={{ position: "absolute", inset: 0, zIndex: 84,
        display: T.crew ? "none" : undefined }}>
        <div style={{ position: "absolute", left: 82, top: 710, width: 104, height: 18,
          borderRadius: "50%", background: "#05070B", opacity: 0.44 }} />
        <Claudie x={132} y={718 - (ff < 0 ? 0 : Math.max(0, Math.sin(Math.min(1, ff / 14) * Math.PI) * 22))}
          s={0.66} f={f} z={85} face={1}
          costume={{ ...T.who, cheer: pull > 0.55 ? 1 : 0 }} />
      </div>

      <Rail idx={i} pf={pf} ff={ff} />
    </Stage>
  );
};

/* ============================================================== S1 · HOOK ==
   0.00 -> 2.48s · 74f · IMAGE CREATION.

   ⛔ THERE IS NO HOOK LINE IN THIS VO. It opens cold on beat 1 at 0.00s, so the
      open is built INSIDE image creation rather than in front of it.
   ⛔ THE REJECTED VERSION: cascade all ten marks and rip the counter across the
      first second. Better picture, wrong frame — the voice is saying "for image
      creation" while the screen argues about ten tools, and THE-OPEN is explicit
      that a theme the viewer cannot connect to the audio works against the hook.
   ⭐ WHAT FRAME 0 CARRIES INSTEAD, all of it settled and readable: a picture
      already half-rendered with its prompt typed, the real Midjourney mark, and
      a rail that already reads $136/mo with ten red pips and "1 OF 10". The
      promise ("there are nine more of these") and the dread ("this is your
      bill") are both made before a word lands, and both are made by OBJECTS
      rather than by a title card.
   ========================================================================= */
export const S1Hook: React.FC = () => <Beat i={0} paidAt={26} freeAt={51} hook push={[0, 65, 1.14]} />;

export const S2: React.FC = () => <Beat i={1} paidAt={33} freeAt={55} />;
export const S3: React.FC = () => <Beat i={2} paidAt={36} freeAt={46} />;
export const S4: React.FC = () => <Beat i={3} paidAt={38} freeAt={56} />;
export const S5: React.FC = () => <Beat i={4} paidAt={29} freeAt={51} />;
export const S6: React.FC = () => <Beat i={5} paidAt={32} freeAt={55} />;
export const S7: React.FC = () => <Beat i={6} paidAt={35} freeAt={54} />;
export const S8: React.FC = () => <Beat i={7} paidAt={34} freeAt={46} />;
export const S9: React.FC = () => <Beat i={8} paidAt={32} freeAt={55} />;
export const S10: React.FC = () => <Beat i={9} paidAt={43} freeAt={64} push={[0, 81, 1.15]} />;

/* ============================================================== S11 · CTA ==
   23.64 -> 26.02s · 72f · THE WALL.

   ⛔ THE CTA MOUNTS OUTSIDE THE PANEL and uses SCREEN coordinates — the one
      exception to panel-local coords in the house chassis.
   ⛔ HARD-CUT ON THE KEYWORD: the comment posts on the measured onset of the
      word "free" at 25.34s (local f51), not on a round number near it.
   ========================================================================= */
export const S11Cta: React.FC = () => {
  const f = useCurrentFrame();
  const T = useTheme();
  const R = useRoom(10);
  /* ⛔ the SPOKEN keyword "comment FREE" is at root f709 = local f10; the closing
     "every free tool" is at f756 = local f57. The word STAMPS on the first and
     the comment SENDS on the second, so what the viewer sees typed is what they
     are hearing asked for. */
  const kw = f - 10, post = f - 57;
  return (
    <AbsoluteFill>
      <Panel glow={hexA(R.key, 0.20)}>
        <div style={{ position: "absolute", inset: 0, zIndex: 1, transformOrigin: "50% 56%",
          transform: `scale(${E(f, 0, 68, 1, 1.16, LIN)})` }}>
          <Room i={10} f={f} vig={0.50}>
            <T.Dress p={R} f={f} />
            <Post side="l" c={dark(R.wall, 0.44)} w={58} />
            <Post side="r" c={dark(R.wall, 0.50)} w={58} />
            <Cone x={506} y={-40} bot={700} len={520} c={R.key} o={0.16} z={18} f={f} />

            {/* the ten FREE marks, lighting up in the order the reel met them.
                ⛔ they keep breathing after they land — ten tiles that arrive in
                the first second and then sit still is the CTA arriving and
                holding, which is what took this scene to 6.76 against a bar of
                9.00 while every body scene cleared it. */}
            {PAIRS.map((p, i) => {
              const cx = 164 + (i % 5) * 178, cy = 262 + Math.floor(i / 5) * 204;
              const a = E(f, 2 + i * 2.4, 14 + i * 2.4, 0, 1, BACK);
              const bob = Math.sin(f / 14 + i * 0.62) * 7;
              return (
                <div key={p.free} style={{ position: "absolute", inset: 0, zIndex: 60,
                  opacity: a, transform: `translateY(${(1 - a) * 26 + bob}px)` }}>
                  <MarkTile x={cx} y={cy} s={1.06} logo={p.fLogo} plate="#FFFFFF" z={60} />
                  <div style={{ position: "absolute", left: cx - 89, top: cy + 78, width: 178,
                    textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 900,
                    fontSize: 22, color: "#F2F5EC", whiteSpace: "nowrap",
                    textShadow: "0 2px 7px rgba(0,0,0,0.85)" }}>{p.free}</div>
                </div>
              );
            })}

            <Rail idx={9} pf={-1} ff={99} done />
          </Room>
        </div>
      </Panel>

      {/* ── SCREEN COORDS from here down ──────────────────────────────── */}
      {/* the comment field: the CTA drawn as the thing the viewer has to do */}
      {/* ⛔ BELOW THE CAPTION BAND, NOT THROUGH IT. At top 1246 the card sat
          exactly where the karaoke captions run (capTop 1268) and the words
          "FREE for the list" printed straight through it. */}
      <div style={{ position: "absolute", left: 96, right: 96, top: 1414, height: 128, zIndex: 150,
        borderRadius: 30, background: "#FFFFFF", border: "4px solid #E4DED0",
        boxShadow: "0 26px 56px -14px rgba(20,26,45,0.55)",
        transform: `scale(${E(f, 6, 20, 0.9, 1, BACK)})`, opacity: E(f, 6, 16, 0, 1, OUT) }}>
        <div style={{ position: "absolute", left: 26, top: 26, width: 76, height: 76,
          borderRadius: 22, background: "#F2EFE6", border: "3px solid #E4DED0", overflow: "hidden",
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Img src={staticFile("claude_logo.png")} style={{ width: 52, height: 52, objectFit: "contain" }} />
        </div>
        <div style={{ position: "absolute", left: 124, top: 22, fontFamily: inter.fontFamily,
          fontWeight: 900, fontSize: 34, color: "#8C877D" }}>Add a comment…</div>
        <div style={{ position: "absolute", left: 124, top: 64, fontFamily: fraunces.fontFamily,
          fontWeight: 900, fontSize: 52, letterSpacing: "0.04em",
          color: post >= 0 ? "#2C7D5C" : "#1A1813" }}>
          <span style={{ display: "inline-block",
            transform: `scale(${kw < 0 ? 0 : E(kw, 0, 7, 1.5, 1, BACK)})`,
            opacity: kw < 0 ? 0 : 1 }}>FREE</span>
          {post < 0 && kw >= 0 && Math.floor(f / 8) % 2 === 0 && <span style={{ color: "#C4756C" }}>|</span>}
        </div>
        <div style={{ position: "absolute", right: 26, top: 34, padding: "16px 34px",
          borderRadius: 18, background: post >= 0 ? "#2C7D5C" : "#D2724E",
          fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 32, color: "#FFF8F0",
          transform: `scale(${post >= 0 ? E(post, 0, 8, 1.18, 1, OUT) : 1})` }}>
          {post >= 0 ? "SENT" : "POST"}
        </div>
      </div>

      {/* The mascot only ever appears twice in this reel: on the rail, and here.
          ⛔ BELOW the comment card, not beside it — at x906/y1252 it landed on
          the card's top-right corner AND across the panel's "$0/mo", so the one
          number the whole reel builds to was behind a sprite's head. */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 1920, zIndex: 148 }}>
        <Claudie x={912} y={1760} s={0.94} f={f} hero
          costume={{ cheer: post >= 0 ? 1 : 0.3 }} badge={0.9} />
      </div>
    </AbsoluteFill>
  );
};
