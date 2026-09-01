import React from "react";
import { inter } from "./fonts";
import { CLAY, GOLD, Bloom, Mascot as HouseMascot } from "./CarouselConcepts";
import { SceneCover, cropProof } from "./ReelCovers";
import { MARKS } from "./logoPaths";

/* ==========================================================================
   SET 5 — reel 128 BOSS.  Chassis imported, never duplicated (03 §A).

   THE REEL, IN ITS OWN WORDS (128_boss_script.txt / storyboards/128-boss.md):
     "you give Claude a task and tell it to spawn a team of worker sub-agents.
      But the secret sauce is the third line of the prompt where you assign a
      strict AI boss. The worker agents write the code and the boss tears it
      apart."   CTA keyword: BOSS.

   The reel's own on-screen header is `CLAUDE NEEDS / A STRICT BOSS`
   (ClaudeBoss128Reel.tsx, <HookHeader big=... hot=... />).  §2 of the copy
   system forbids a top line that DESCRIBES a situation, so the same nouns are
   turned into an offer addressed to the viewer — exactly the HERMES shape
   (`GIVE CLAUDE REAL / MEMORY`), which is a shipped, approved cover.

   WORLD = THE BOSS ROOM, the reel's own arena.  "The boss loop" is a gaming
   term and the storyboard leans on that on purpose: a boss is a thing you
   fight, lose to, and run again.  Nothing here is an invented machine — the
   v1 reel was rejected precisely for inventing one ("I don't really
   understand what the big box of tools is").  Cast is Claudes, the villain is
   a Claude, and the rest is impact, light and a segment rail.
   ========================================================================== */

/* ---------- geometry, stated once so every prop can be re-seated ---------- */
const FLOOR = 1150;          // drawn floor line, full-bleed band starts here
const GROUND = 1418;         // where THE BOSS stands — the FAR plane
const PARTY_GROUND = 1498;   // the party is NEAR camera, so it is lower in frame
const BOSS_SIZE = 600;
const BOSS_CX = 640;         // right edge 940, clear of the IG feed rail at x>956
const RAIL_Y = 836;          // > 780, so the quiet zone stays structurally empty

/* ⛔ The party is NEAR and the boss is FAR, which is what lets the workers be
   drawn big enough to read while still being dwarfed. v1 put them at size 152
   with a left edge at x36 and it was the documented ATTACK failure verbatim
   (03 §H: "edge-hugging plus a void is the looks-bad signature"). */
const PARTY_SIZE = 224;

/* ⛔ count element: ten segments, and the LIT ones need value separation from
   the unlit ones, not just hue (03 §C — POWERS' five gems read as four).
   Three of ten, which is where the reel holds it until the peak. */
const RAIL_LIT = 3;

/* ---------- one worker, drawn where it stands ---------- */
const Worker: React.FC<{ cx: number; size: number; lf: number }> = ({ cx, size, lf }) => (
  <>
    {/* contact shadow FIRST, and wider than the sprite or it reads as a smudge */}
    <div style={{
      position: "absolute", left: cx - size * 0.72, top: PARTY_GROUND - 16,
      width: size * 1.44, height: 38, borderRadius: "50%",
      background: "radial-gradient(ellipse, rgba(84,52,26,0.62) 0%, rgba(84,52,26,0) 72%)",
      filter: "blur(6px)",
    }} />
    <div style={{ position: "absolute", left: cx - size / 2, top: PARTY_GROUND - size * 0.92 }}>
      <HouseMascot size={size} lf={lf} constr={1} gaze={0.5} />
    </div>
  </>
);

/* ---------- a slab of work, thrown ----------
   Portrait rectangle + ruled lines reads as a DOCUMENT instantly (03 §E).
   A landscape capsule would read as a cotton swab, which is the documented
   silhouette failure. One inline <svg>, real paths, no stacked divs. */
const Slab: React.FC<{ x: number; y: number; w: number; rot: number; uid: string }> = ({ x, y, w, rot, uid }) => {
  const h = w * 1.28;
  return (
    <svg width={w} height={h} viewBox="0 0 100 128"
      style={{ position: "absolute", left: x, top: y, transform: `rotate(${rot}deg)`, overflow: "visible" }}>
      <defs>
        <linearGradient id={`sl${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F2DCB4" />
          <stop offset="100%" stopColor="#D9BC8A" />
        </linearGradient>
      </defs>
      <path d="M4 4 H84 L96 16 V124 H4 Z" fill={`url(#sl${uid})`} stroke="#8A6A3E" strokeWidth={3} strokeLinejoin="round" />
      <path d="M84 4 V16 H96 Z" fill="#C4A377" stroke="#8A6A3E" strokeWidth={3} strokeLinejoin="round" />
      <path d="M18 40 H74 M18 58 H80 M18 76 H62 M18 94 H72" stroke="#9A7C4E" strokeWidth={7} strokeLinecap="round" />
    </svg>
  );
};

/* ---------- the refusal ----------
   ⛔ v1 drew this as a crescent shield wedge and it read as a CROISSANT sitting
   over his face — 03 §E exactly: "silhouette carries meaning, and styling
   cannot rescue a wrong one."  A refused attack reads when the work is caught
   MID-BOUNCE off a spiked impact, which is the one shape nobody has to decode.
   Everything in motion is GOLD #E7B24C or darker (03 §C); pale trails are the
   same value as the cream ground and vanish. */
const Refusal: React.FC<{ cx: number; cy: number; r: number }> = ({ cx, cy, r }) => {
  const rad = (d: number) => (d * Math.PI) / 180;
  const pt = (a: number, rr: number) => `${(100 + rr * Math.cos(rad(a))).toFixed(1)} ${(100 + rr * Math.sin(rad(a))).toFixed(1)}`;
  let star = "";
  const N = 11;
  for (let i = 0; i < N; i++) {
    const a = (i * 360) / N - 90;
    const half = 360 / N / 2;
    star += `${i ? "L" : "M"}${pt(a, i % 2 ? 62 : 96)} L${pt(a + half, 40)} `;
  }
  return (
    <svg width={r * 2} height={r * 2} viewBox="0 0 200 200"
      style={{ position: "absolute", left: cx - r, top: cy - r, overflow: "visible" }}>
      <defs>
        <radialGradient id="rfg" cx="46%" cy="40%">
          <stop offset="0%" stopColor="#FFF1CC" />
          <stop offset="54%" stopColor="#E7B24C" />
          <stop offset="100%" stopColor="#C8762F" />
        </radialGradient>
      </defs>
      <path d={star + "Z"} fill="url(#rfg)" stroke="#8E4A1E" strokeWidth={5} strokeLinejoin="round" />
      <path d="M84 66 L112 96 L86 100 L108 134" fill="none" stroke="#8E4A1E" strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" opacity={0.85} />
    </svg>
  );
};

/* ================= THE SCENE ============================================ */

const BossRoomScene: React.FC = () => (
  <>
    {/* L0 · warm page gradient. The page is ALWAYS light and warm — dark
        covers were built, shown and rejected. Quiet above y780. */}
    <div style={{
      position: "absolute", left: 0, top: 0, width: 1080, height: 1200,
      background: "linear-gradient(180deg,#EFE3D0 0%,#F6EEDD 20%,#FBF3E4 44%,#EFE0C6 66%,#D8C6A6 86%,#BFAE92 100%)",
    }} />

    {/* L1 · atmosphere only in the quiet band: the house lights, no geometry */}
    <Bloom x={540} y={470} r={560} c="rgba(255,251,236,0.78)" />
    <Bloom x={196} y={706} r={330} c="rgba(255,244,214,0.40)" />
    <Bloom x={884} y={706} r={330} c="rgba(255,244,214,0.40)" />

    {/* L2 · THE STANDS — far plane, and deliberately COOL. v1 painted them the
        same tan as the floor and the whole tile read as one flat mud; the clay
        cast and the gold rail need a cold ground behind them to separate. */}
    <div style={{
      position: "absolute", left: -40, top: 892, width: 1160, height: 236,
      background: "linear-gradient(180deg,#8E9AAB 0%,#77839A 46%,#5D6980 100%)",
    }} />
    <div style={{ position: "absolute", left: -40, top: 892, width: 1160, height: 10, background: "#A8B3C2" }} />
    {[0, 1, 2].map((row) => {
      const y = 916 + row * 60;
      const sz = 32 - row * 3;
      const tone = ["#4E5972", "#434D64", "#3A4356"][row];
      return [...Array(18)].map((_, i) => (
        <div key={`c${row}-${i}`} style={{
          position: "absolute", left: 12 + i * 60 + (row % 2) * 26, top: y,
          width: sz, height: sz * 1.2, borderRadius: `${sz}px ${sz}px 5px 5px`,
          background: tone, opacity: 0.92 - row * 0.1,
        }} />
      ));
    })}

    {/* L2b · THE RAIL — the reel's hero artifact: ten segments above him, and
        it does not move when they hit him.  MOUNTED on two pylons that reach
        the stands, so it reads as arena signage rather than a floating widget
        (v1 had it hanging in clear air).  Unlabelled on purpose: a bare
        segment bar in an arcade frame is game fiction and cannot be misread
        as a benchmark receipt. */}
    {[300, 760].map((x) => (
      <div key={`py${x}`} style={{
        position: "absolute", left: x, top: RAIL_Y + 58, width: 22, height: 62,
        background: "linear-gradient(180deg,#4A3A26 0%,#33271A 100%)",
      }} />
    ))}
    <div style={{
      position: "absolute", left: 232, top: RAIL_Y - 18, width: 616, height: 80,
      borderRadius: 16, background: "linear-gradient(180deg,#5E4A30 0%,#3E2F1E 100%)",
      boxShadow: "0 14px 30px -10px rgba(46,32,14,0.6)", boxSizing: "border-box",
    }} />
    {[...Array(10)].map((_, i) => (
      <div key={`r${i}`} style={{
        position: "absolute", left: 250 + i * 59, top: RAIL_Y, width: 47, height: 44,
        borderRadius: 7, boxSizing: "border-box",
        background: i < RAIL_LIT
          ? "linear-gradient(180deg,#F7D98C 0%,#E7B24C 52%,#BE8724 100%)"
          : "linear-gradient(180deg,#2B2216 0%,#1F1810 100%)",
        border: i < RAIL_LIT ? "2px solid #A9781F" : "2px solid #171208",
        boxShadow: i < RAIL_LIT ? "0 0 18px rgba(231,178,76,0.6)" : "none",
      }} />
    ))}

    {/* L3 · the barrier wall — mid plane, occludes the stands' base */}
    <div style={{
      position: "absolute", left: -40, top: 1094, width: 1160, height: 96,
      background: "linear-gradient(180deg,#C2A87E 0%,#A98D62 60%,#8E7349 100%)",
    }} />
    <div style={{ position: "absolute", left: -40, top: 1094, width: 1160, height: 9, background: "#DCC69C" }} />

    {/* L4 · THE FLOOR — ONE solid full-width band. height = 1920 - top. */}
    <div style={{
      position: "absolute", left: 0, top: FLOOR, width: 1080, height: 1920 - FLOOR,
      background: "linear-gradient(180deg,#C9A26B 0%,#BE9459 30%,#A87C44 64%,#8A6234 100%)",
    }} />
    {/* the mark on the floor — the arena disc he stands on. It fills the lower
        third, which v1 left as a bare gradient. */}
    <div style={{
      position: "absolute", left: BOSS_CX - 470, top: GROUND - 128, width: 940, height: 300,
      borderRadius: "50%", border: "14px solid rgba(120,84,42,0.42)", boxSizing: "border-box",
    }} />
    <div style={{
      position: "absolute", left: BOSS_CX - 330, top: GROUND - 86, width: 660, height: 214,
      borderRadius: "50%", border: "9px solid rgba(120,84,42,0.3)", boxSizing: "border-box",
    }} />
    <div style={{
      position: "absolute", left: 0, top: FLOOR, width: 1080, height: 250,
      background: "radial-gradient(ellipse at 50% 0%, rgba(255,242,210,0.5) 0%, rgba(255,242,210,0) 70%)",
    }} />

    {/* L5 · THE BOSS — the subject named in the giant, and the largest element
        in the 4:5 crop. He stands on the FAR plane so the near party can be
        drawn big enough to read and still be dwarfed by him. */}
    <div style={{
      position: "absolute", left: BOSS_CX - BOSS_SIZE * 0.72, top: GROUND - 30,
      width: BOSS_SIZE * 1.44, height: 78, borderRadius: "50%",
      background: "radial-gradient(ellipse, rgba(62,38,14,0.85) 0%, rgba(62,38,14,0.52) 46%, rgba(62,38,14,0) 76%)",
      filter: "blur(8px)",
    }} />
    <div style={{ position: "absolute", left: BOSS_CX - BOSS_SIZE / 2, top: GROUND - BOSS_SIZE * 0.92 }}>
      <HouseMascot size={BOSS_SIZE} lf={20} suit={1} stern={1} gaze={-0.4} />
    </div>

    {/* the volley arriving, and the wall it does not get past */}
    <Slab x={286} y={1024} w={104} rot={-31} uid="a" />
    <Slab x={236} y={1230} w={94} rot={22} uid="b" />
    <Refusal cx={452} cy={1192} r={126} />

    {/* L6 · THE PARTY — NEAR plane, pulled in off the edge and up-scaled */}
    <Worker cx={196} size={PARTY_SIZE} lf={20} />
    <Worker cx={382} size={PARTY_SIZE - 26} lf={51} />

    {/* floor scuff — texture only, no load-bearing content below y1500 */}
    {[[150, 1548, 260], [520, 1596, 340], [830, 1536, 210]].map(([x, y, w], i) => (
      <div key={`sc${i}`} style={{
        position: "absolute", left: x, top: y, width: w, height: 15, borderRadius: "50%",
        background: "rgba(112,74,36,0.26)", filter: "blur(5px)",
      }} />
    ))}

    {/* foreground floor lip, blurred: depth without touching the hero */}
    <div style={{
      position: "absolute", left: -40, top: 1648, width: 1160, height: 272,
      background: "linear-gradient(180deg,rgba(108,72,36,0) 0%,rgba(100,66,32,0.52) 46%,rgba(84,54,26,0.75) 100%)",
      filter: "blur(3px)",
    }} />
  </>
);

/* ================= THE COVER ============================================
   line1 is an imperative addressed to the viewer and it NAMES THE SUBJECT
   (03 §2/§3). The giant is one word, it is the artifact, and it is also the
   CTA keyword the viewer has to type — so the keyword is the biggest thing
   on the tile. Exactly one CLAY accent, on the entice word.
   BOSS is 4 letters, so it takes SceneCover's default 158 and needs no fit. */
export const CoverBoss: React.FC = () => (
  <SceneCover
    scene={<BossRoomScene />}
    line1={<>GIVE CLAUDE A <span style={{ color: CLAY }}>STRICT</span></>}
    giant={<>BOSS</>}
  />
);

export const CoverBossProof = cropProof(CoverBoss);

/* keep the linter honest about the imports this file genuinely uses */
void inter; void GOLD;

/* ==========================================================================
   reel 131 FREE — "one free platform holds every premium AI model"

   THE REEL, IN ITS OWN WORDS (video/public/free131_script.txt):
     "Stop paying for multiple AI subscriptions. I just found one free platform
      that gives you access to every premium AI tool in one place... People are
      paying for 5 subscriptions while this one is completely free. Just comment
      FREE for the link."   CTA keyword: FREE.

   Frame-0 claim plate in the reel is `5 AI SUBSCRIPTIONS / ONE FREE PLATFORM`.

   WORLD = THE TOLL ROW vs THE FARE HALL (storyboards/131-free.md).  HERO
   ARTIFACT = **THE TURNSTILE**: at S0 it eats a coin and slams; at S11 the
   identical arm swings up, STAYS up, and the coin slot is plated over.  That
   payoff beat is the cover.

   ⛔ THE LEDGER TRAVELS TO THE COVER.  `FreeWorld.R` bans, and this scene
   contains, ZERO of: any currency figure, the platform's name, and the words
   UNLIMITED / FOREVER / BEST / FASTEST.  The seven counter plates carry NO
   marks and NO names — partly because listing the contents on a cover is a
   documented rejection ("those text things that shouldn't be there"), and
   partly because GROK has no logo in `public/logos` or on the Simple Icons CDN
   and a wrong mark is worse than none.
   ========================================================================== */

const F_FLOOR = 1318;
const F_GROUND = 1520;        // the walker's feet
const F_WALKER = 360;
const F_WALKER_CX = 770;   // right edge 950, clear of the IG feed rail at x>956

/* ⛔⛔⛔ THE MARKS ARE REAL, AND "WE DON'T HAVE IT" IS A CLAIM TO TEST.
   v1 drew flat colour plates (read as a SWATCH PALETTE); v2 replaced them with
   invented abstract glyphs, and Alex: *"you need to have logos like actual
   logos rather than just random stuff."*  He is right, and the repo already had
   the answer — `memory/reel-brand-logo-sourcing.md` carries a standing rule from
   reel 122 that checking a slug is one `curl`, and the local `logos/` directory
   is what has been NEEDED before, not what is available.  Re-tested 2026-08-31:

     openai      repo `logos_official/openai.svg`   (CDN `openai`/`chatgpt` 404)
     claude      CDN `claude`      #D97757
     gemini      CDN `googlegemini` #8E75B2
     perplexity  CDN `perplexity`  #1FB8CD
     kimi        CDN `kimi`        (near-black)
     deepseek    CDN `deepseek`    #5786FE
     grok        ⛔ NOTHING — `grok` and `xai` both 404, nothing in the repo

   ⛔ GROK therefore ships as a stencilled WORDMARK tile, which is exactly what
   the reel itself did for the same reason (`FreeWorld` ledger: "a wrong mark is
   worse than none").  Six real marks and one honest wordmark is still SEVEN.

   ⛔ Every mark rides a WHITE tile. Most Simple Icons glyphs are near-black, and
   reel 122 paid for light-on-light four separate times in one build. On a cream
   page a white tile needs its own dark edge and a real drop shadow or it
   dissolves into the ground, so each tile carries both. */
/* ⛔ The tile in FLIGHT is the one the eye lands on, so it must not be the one
   without a mark. v1 of this pass had GROK — the single wordmark — as the hero
   and the six real logos parked in the rack. CLAUDE flies instead: it is the
   house brand and its clay reads against the mascot. GROK sits in the rack,
   where a wordmark is unremarkable. */
const RACK = ["openai", "gemini", "perplexity", "kimi", "deepseek"] as const;
const FLYER = "claude";

const ToolTile: React.FC<{ x: number; y: number; s: number; slug?: string; word?: string }> = ({ x, y, s, slug, word }) => {
  const m = slug ? MARKS[slug] : undefined;
  const pad = s * 0.21;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: s, height: s }}>
      <div style={{
        position: "absolute", left: s * 0.05, top: s * 0.09, width: s * 0.9, height: s * 0.92,
        borderRadius: s * 0.24, background: "rgba(52,38,20,0.34)", filter: "blur(10px)",
      }} />
      <div style={{
        position: "absolute", inset: 0, borderRadius: s * 0.235, boxSizing: "border-box",
        background: "linear-gradient(168deg,#FFFFFF 0%,#F6F2EA 68%,#EBE5D9 100%)",
        border: `${Math.round(s * 0.035)}px solid #2E2519`,
      }} />
      {m ? (
        <svg width={s - pad * 2} height={s - pad * 2} viewBox={m.vb}
          style={{ position: "absolute", left: pad, top: pad }}>
          <path d={m.d} fill={m.c} />
        </svg>
      ) : (
        <div style={{
          position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: inter.fontFamily, fontWeight: 900, fontSize: s * 0.27,
          letterSpacing: "-0.02em", color: "#2E2519",
        }}>{word}</div>
      )}
    </div>
  );
};

const FareHallScene: React.FC = () => (
  <>
    {/* L0 · the hall, daylight — the storyboard's BRIGHTEST place. Quiet >780 */}
    <div style={{
      position: "absolute", left: 0, top: 0, width: 1080, height: 1380,
      background: "linear-gradient(180deg,#EFE9DA 0%,#F7F2E6 20%,#FCF8EE 44%,#F2EADA 66%,#E4D9C3 88%,#D2C5AA 100%)",
    }} />
    <Bloom x={540} y={430} r={600} c="rgba(255,253,246,0.82)" />
    <Bloom x={430} y={980} r={520} c="rgba(255,250,232,0.44)" />

    {/* L2 · THE ONE COUNTER — every tool on it. This is what the headline
        names, so it owns the frame (03 §K.1). Four over two, one slot empty. */}
    {RACK.slice(0, 3).map((t, i) => <ToolTile key={`a${i}`} x={158 + i * 196} y={812} s={172} slug={t} />)}
    {RACK.slice(3, 5).map((t, i) => <ToolTile key={`b${i}`} x={158 + i * 196} y={1002} s={172} slug={t} />)}
    <ToolTile x={158 + 2 * 196} y={1002} s={172} word="GROK" />
    {/* the slot the seventh came out of */}
    <div style={{
      position: "absolute", left: 746, top: 812, width: 172, height: 172,
      borderRadius: 41, boxSizing: "border-box",
      border: "7px dashed rgba(122,104,74,0.45)",
    }} />

    {/* the path it took — GOLD, so it survives the cream ground */}
    <svg width={1080} height={520} viewBox="0 0 1080 520" style={{ position: "absolute", left: 0, top: 1000, overflow: "visible" }}>
      <path d="M832 -16 Q812 168 616 258" fill="none" stroke="#CF9544" strokeWidth={32} strokeLinecap="round" opacity={0.26} />
      <path d="M832 -16 Q812 168 616 258" fill="none" stroke="#E7B24C" strokeWidth={13} strokeLinecap="round" opacity={0.6} />
    </svg>

    {/* L4 · THE FLOOR — one solid full-width band, height = 1920 - top */}
    <div style={{ position: "absolute", left: -40, top: F_FLOOR - 22, width: 1160, height: 22, background: "#D9CCB2" }} />
    <div style={{
      position: "absolute", left: 0, top: F_FLOOR, width: 1080, height: 1920 - F_FLOOR,
      background: "linear-gradient(180deg,#C7B698 0%,#B6A583 36%,#9C8B6A 70%,#83734F 100%)",
    }} />
    <div style={{
      position: "absolute", left: 0, top: F_FLOOR, width: 1080, height: 210,
      background: "radial-gradient(ellipse at 50% 0%, rgba(255,250,232,0.5) 0%, rgba(255,250,232,0) 70%)",
    }} />

    {/* L5 · the one collecting them */}
    <div style={{
      position: "absolute", left: F_WALKER_CX - F_WALKER * 0.72, top: F_GROUND - 26,
      width: F_WALKER * 1.44, height: 58, borderRadius: "50%",
      background: "radial-gradient(ellipse, rgba(66,50,24,0.76) 0%, rgba(66,50,24,0.44) 46%, rgba(66,50,24,0) 76%)",
      filter: "blur(7px)",
    }} />
    <div style={{ position: "absolute", left: F_WALKER_CX - F_WALKER / 2, top: F_GROUND - F_WALKER * 0.92 }}>
      <HouseMascot size={F_WALKER} lf={20} constr={1} cheer={0.8} gaze={-0.55} />
    </div>

    {/* the seventh, ARRIVING — drawn last of the cast so nothing paints over it
        (v3 put it under the shelf band and it vanished). It overlaps his raised
        arm, not his face: a tile across the eyes costs the sprite its read, and
        the face is the only part of a house mascot a viewer looks for. */}
    <div style={{ position: "absolute", left: 494, top: 1226, width: 152, height: 152, transform: "rotate(-14deg)" }}>
      <ToolTile x={0} y={0} s={152} slug={FLYER} />
    </div>

    {/* L6 · foreground lip, blurred: depth without touching the hero */}
    <div style={{
      position: "absolute", left: -40, top: 1668, width: 1160, height: 252,
      background: "linear-gradient(180deg,rgba(104,90,60,0) 0%,rgba(96,82,54,0.5) 46%,rgba(80,68,44,0.74) 100%)",
      filter: "blur(3px)",
    }} />
  </>
);

/* line1 is an imperative addressed to the viewer and names the subject; the
   giant is one word, it is the payoff AND the CTA keyword, so the word the
   viewer has to type is the biggest thing on the tile. 4 letters, so it takes
   SceneCover's default 158 and needs no optical fit. */
export const CoverFree131: React.FC = () => (
  <SceneCover
    scene={<FareHallScene />}
    line1={<>GET <span style={{ color: CLAY }}>EVERY</span> AI TOOL</>}
    giant={<>FREE</>}
  />
);

export const CoverFree131Proof = cropProof(CoverFree131);

/* ==========================================================================
   SET 6 — reel 132 JUDGE.  Chassis imported, never duplicated (03 §A).

   THE REEL, IN ITS OWN WORDS (132_judge_script.txt / storyboards/132-judge.md):
     "a new prompting technique that stops Claude from lying to your face...
      the secret sauce is in the third line of the prompt where you assign a
      judge, a prosecutor, and a defense... they loop and rebuild until the
      work is bulletproof."   CTA keyword: JUDGE.

   WORLD = THE COURT OF THE WORK, the reel's own set. The defendant is not a
   person, it is the output Claude swore was finished: a gilt, gold-sealed
   brief reading DONE, standing in the dock under a Claude in a wig.

   ⛔ THE VILLAIN IS NOT DRAWN UGLY. The brief is the handsomest object on the
   tile, because the claim the reel makes is that the output is DISHONEST, not
   that it is shabby (ANIMATION-QUALITY §23). Drawing it grey would make a dead
   frame AND a claim the viewer knows is untrue.
   ⛔ NOTHING STRUCTURAL ABOVE y780 — the quiet zone. The gallery starts at 812,
   the bench at 1156, and everything above that is lit air.
   ========================================================================== */

/* ⛔ THE QUIET ZONE IS A HARD LINE AND THE HERO IS WHAT BREAKS IT. v1 ran a
   620px judge off a bench at y1156, which put his head top at 623 and the wig
   at 561 — INSIDE the giant's own row (514..672). Both failing checks were the
   same object: `giant margins 267/80` was measuring the wig, not the type, and
   `quiet zone max step 115` was the wig's edge. The bench moved down and the
   judge shrank until his crown clears 780 with the wig ON the head rather than
   floating above it. */
const J_FLOOR = 1546;          // drawn floor line, full-bleed band starts here
const J_BENCH = 1300;          // the bench top — the judge is cut by it
const J_GROUND = 1620;         // where the brief and the dock stand, NEAR camera
const JUDGE_SIZE = 520;
const JUDGE_CX = 566;          // right edge 826, clear of the IG feed rail at x>956

/** the wig — the one silhouette feature that makes a Claude read as a JUDGE at
    150px. Hue does none of the work here; the shape does all of it. */
const CoverWig: React.FC<{ cx: number; top: number; w: number }> = ({ cx, top, w }) => (
  <svg viewBox="0 0 184 140" width={w} height={w * 0.76}
    style={{ position: "absolute", left: cx - w / 2, top }}>
    <path d="M 24 56 Q 24 6 92 6 Q 160 6 160 56 L 160 74 Q 150 66 138 74 L 138 56 Q 138 30 92 30 Q 46 30 46 56 L 46 74 Q 34 66 24 74 Z"
      fill="#EFEADC" />
    <path d="M 22 72 q -8 34 8 54 q 16 8 26 -4 q 8 -22 2 -50 z" fill="#EFEADC" />
    <path d="M 162 72 q 8 34 -8 54 q -16 8 -26 -4 q -8 -22 -2 -50 z" fill="#EFEADC" />
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <path key={i} d={`M ${30 + i * 26} 20 q 10 12 0 26`} fill="none" stroke="#CFC8B4" strokeWidth={3} />
    ))}
  </svg>
);

/** the gavel, raised. Drawn as a real object: a head with a banded face, a
    shaft with a collar, and the block it is about to meet. */
const CoverGavel: React.FC<{ x: number; y: number; s: number; rot: number }> = ({ x, y, s, rot }) => (
  <div style={{ position: "absolute", left: x, top: y, transform: `rotate(${rot}deg)`,
    transformOrigin: "10% 90%" }}>
    <svg viewBox="0 0 240 110" width={240 * s} height={110 * s}>
      <rect x={58} y={46} width={172} height={19} rx={9} fill="#6E4A24" />
      <rect x={58} y={46} width={172} height={6} rx={3} fill="#A97C46" />
      <rect x={212} y={36} width={26} height={38} rx={9} fill="#8A5E34" />
      <rect x={4} y={12} width={76} height={84} rx={11} fill="#5E3E1E" />
      <rect x={4} y={12} width={76} height={16} rx={8} fill="#8A5E34" />
      <rect x={4} y={12} width={15} height={84} fill="#4A2E14" />
      <rect x={0} y={22} width={12} height={64} rx={5} fill="#C9A15A" />
    </svg>
  </div>
);

/** the defendant: the gold-sealed brief that says DONE and is not */
const CoverBrief: React.FC<{ cx: number; bottom: number; w: number; rot: number }> =
  ({ cx, bottom, w, rot }) => (
  <div style={{ position: "absolute", left: cx - w / 2, top: bottom - w * 1.3, width: w,
    height: w * 1.3, transform: `rotate(${rot}deg)`, transformOrigin: "50% 100%" }}>
    <svg viewBox="0 0 200 260" width={w} height={w * 1.3}>
      <rect x={0} y={0} width={200} height={260} rx={4} fill="#5E2320" />
      <rect x={0} y={0} width={200} height={9} fill="#7A342E" />
      <rect x={12} y={12} width={176} height={236} fill="none" stroke={GOLD} strokeWidth={4} />
      <rect x={19} y={19} width={162} height={222} fill="none" stroke="rgba(231,178,76,0.55)" strokeWidth={2} />
      <text x={100} y={44} textAnchor="middle" fill="#F4E6C6"
        style={{ fontFamily: "ui-monospace,Menlo,monospace", fontWeight: 800, fontSize: 34,
          letterSpacing: 6 }}>DONE</text>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <rect key={i} x={32} y={68 + i * 16} rx={2}
          width={i === 7 ? 74 : 136 - (i % 3) * 18} height={7}
          fill={`rgba(232,220,200,${0.3 + (i % 3) * 0.1})`} />
      ))}
      <g transform="translate(100,206)">
        {[...Array(18)].map((_, i) => {
          const a = (i / 18) * Math.PI * 2;
          return <circle key={i} cx={Math.cos(a) * 30} cy={Math.sin(a) * 30} r={7.5} fill="#C08A2E" />;
        })}
        <circle cx={0} cy={0} r={30} fill={GOLD} />
        <circle cx={0} cy={0} r={30} fill="none" stroke="#8E6218" strokeWidth={2.6} />
        <circle cx={0} cy={0} r={21} fill="none" stroke="#8E6218" strokeWidth={2} />
        <path d="M -11 1 L -3 10 L 12 -8" fill="none" stroke="#4A3208" strokeWidth={6}
          strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <rect x={36} y={190} width={44} height={44} rx={9} fill="#3F9E74" />
      <path d="M 46 212 L 55 222 L 71 200" fill="none" stroke="#04241C" strokeWidth={6}
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

const CourtScene: React.FC = () => (
  <>
    {/* L0 · the hall: warm stone, lit from a clerestory the frame never shows */}
    {/* ⛔ AND NO GRADIENT STOP MAY LAND IN THE QUIET ZONE EITHER. A 40% stop on
        a 1920 canvas is y768, i.e. a luma step 12px above the line. The stops
        are pushed to 54/80% so the band the type sits on is dead flat. */}
    <div style={{ position: "absolute", inset: 0,
      background: "linear-gradient(180deg,#F2E7D2 0%,#EFE3CC 54%,#C9AE86 80%,#A98C62 100%)" }} />
    <Bloom x={540} y={1080} r={560} c="rgba(255,240,206,0.72)" />

    {/* L1 · the gallery, in silhouette, starting BELOW the quiet zone */}
    {[...Array(16)].map((_, i) => {
      const row = i < 9 ? 0 : 1;
      const j = i - row * 9;
      const y = 900 + row * 96;
      const sz = 86 - row * 12;
      return (
        <div key={`g${i}`} style={{
          position: "absolute", left: 18 + j * 122 + row * 58, top: y,
          width: sz, height: sz * 1.16, borderRadius: `${sz}px ${sz}px 6px 6px`,
          background: row === 0 ? "rgba(96,68,36,0.34)" : "rgba(96,68,36,0.24)",
        }} />
      );
    })}

    {/* L2 · the panelled back wall of the court, and the ruling lamp over the
        bench. The lamp is the only lit fitting and it is directly above him,
        which is what makes the whole tile point at one place. */}
    <div style={{ position: "absolute", left: -40, top: 1090, width: 1160, height: 190,
      background: "linear-gradient(180deg,#8A5E34 0%,#5E3C1E 100%)" }} />
    {[0, 1, 2, 3, 4].map((i) => (
      <div key={`pn${i}`} style={{ position: "absolute", left: 20 + i * 214, top: 1112,
        width: 178, height: 146, border: "7px solid #A87A46", boxSizing: "border-box" }} />
    ))}
    <div style={{ position: "absolute", left: JUDGE_CX - 92, top: 1002, width: 184, height: 34,
      borderRadius: 12, background: "linear-gradient(180deg,#FFF6DC 0%,#F0D89E 100%)" }} />
    <div style={{ position: "absolute", left: JUDGE_CX - 300, top: 1020, width: 600, height: 330,
      background: "radial-gradient(ellipse at 50% 0%, rgba(255,244,214,0.72) 0%, rgba(255,244,214,0) 72%)" }} />

    {/* L3 · THE JUDGE — the largest element in the 4:5 crop, cut by his bench */}
    <div style={{ position: "absolute", left: JUDGE_CX - JUDGE_SIZE / 2,
      top: J_BENCH - JUDGE_SIZE * 0.86 }}>
      <HouseMascot size={JUDGE_SIZE} lf={20} suit={1} stern={1} gaze={-0.35} />
    </div>
    {/* ⛔ AND THE WIG MUST BE WIDER THAN THE HEAD. At 318 its two side curls
        fell INSIDE the 343px face and landed straight over the eyes — the
        reel-124 note verbatim: the face is the surface the beat is read off,
        never a landing pad. At 430 the curls hang either side of the face, the
        cap sits on the crown, and the eyes are clear. */}
    <CoverWig cx={JUDGE_CX} top={J_BENCH - JUDGE_SIZE * 0.86 - 44} w={430} />
    <CoverGavel x={JUDGE_CX + 190} y={J_BENCH - 322} s={1.18} rot={-46} />

    {/* L4 · THE BENCH — one solid mass, full bleed, and it occludes him */}
    <div style={{ position: "absolute", left: -40, top: J_BENCH, width: 1160, height: 246,
      background: "linear-gradient(180deg,#A87A46 0%,#7A5230 46%,#4E3218 100%)" }} />
    <div style={{ position: "absolute", left: -40, top: J_BENCH, width: 1160, height: 18,
      background: "#C9964E" }} />
    {[0, 1, 2, 3].map((i) => (
      <div key={`bp${i}`} style={{ position: "absolute", left: 26 + i * 268, top: J_BENCH + 48,
        width: 226, height: 150, border: "8px solid #9E6C3A", boxSizing: "border-box" }} />
    ))}

    {/* L5 · THE FLOOR */}
    <div style={{ position: "absolute", left: 0, top: J_FLOOR, width: 1080, height: 1920 - J_FLOOR,
      background: "linear-gradient(180deg,#C9A26B 0%,#BE9459 30%,#A87C44 64%,#8A6234 100%)" }} />
    <div style={{ position: "absolute", left: 0, top: J_FLOOR, width: 1080, height: 230,
      background: "radial-gradient(ellipse at 50% 0%, rgba(255,242,210,0.5) 0%, rgba(255,242,210,0) 70%)" }} />

    {/* L6 · THE DEFENDANT — the work itself, in the dock, NEAR camera. It is the
        second-biggest thing on the tile and it is the one object carrying the
        premise: it looks finished and it is on trial. */}
    <div style={{ position: "absolute", left: 700, top: J_GROUND - 22, width: 316, height: 58,
      borderRadius: "50%", filter: "blur(8px)",
      background: "radial-gradient(ellipse, rgba(62,38,14,0.66) 0%, rgba(62,38,14,0) 72%)" }} />
    <CoverBrief cx={858} bottom={J_GROUND} w={252} rot={-7} />
    <div style={{ position: "absolute", left: 700, top: J_GROUND - 4, width: 320, height: 96,
      background: "linear-gradient(180deg,#7A5230 0%,#3E2812 100%)" }} />
    <div style={{ position: "absolute", left: 700, top: J_GROUND - 4, width: 320, height: 12,
      background: "#A87A46" }} />

    {/* foreground floor lip, blurred: depth without touching the hero */}
    <div style={{ position: "absolute", left: -40, top: 1690, width: 1160, height: 230,
      background: "linear-gradient(180deg,rgba(108,72,36,0) 0%,rgba(100,66,32,0.5) 46%,rgba(84,54,26,0.74) 100%)",
      filter: "blur(3px)" }} />
  </>
);

/* ================= THE COVER ============================================
   line1 states the dread in the viewer's own words and hands off to the giant,
   which is both the fix and the CTA keyword the viewer has to type — so the
   keyword is the biggest thing on the tile. Exactly one CLAY accent, on the
   word that does the enticing. JUDGE is 5 letters, so it takes SceneCover's
   default 158 and clears the >=110px margin without a fit. */
export const CoverJudge: React.FC = () => (
  <SceneCover
    scene={<CourtScene />}
    line1={<>CLAUDE <span style={{ color: CLAY }}>LIES</span>. ADD A</>}
    giant={<>JUDGE</>}
  />
);

export const CoverJudgeProof = cropProof(CoverJudge);

/* ==========================================================================
   SET 7 — reel 133 BUILD.  Chassis imported, never duplicated (03 §A).

   THE REEL, IN ITS OWN WORDS (133_build_script.txt / storyboards/133-build.md):
     "You can sell these three free Claude plugins on Fiverr and Upwork... and
      the best part, they take just five minutes to set up."   CTA keyword: BUILD.

   WORLD = THE TRADE ROW, the reel's own set. The hook is a Claude hauling the
   shutter up on his own unit and finding three machines already running behind
   it; the cover is that shop one beat later — open, lit, and with the first
   finished goods out on the kerb. Nothing here is invented: the awning, the
   three bays, the goods and the two marketplace marks are all objects the reel
   actually draws.

   ⛔ THE TWO MARKS ARE THE ONLY BRANDS ON THE TILE, and both are SPOKEN in the
   VO. Real simple-icons paths from `MARKS`, never an invented glyph. No
   retailer, no vendor, and NO MONEY FIGURE anywhere — Alex states no number
   about earnings, so the tile states none either. `$0` is what the tools cost.

   ⛔⛔ V1 FAILED `giant margins 0/1` AND WAS BOTTOM-HEAVY. line1 ran
   "3 FREE AI TOOLS TO" — 18 characters at size 78 spans the full 1080 canvas
   edge to edge — and the shop sat at y800..1500 with 340px of empty kerb under
   it. Both are the same mistake: the copy and the art were authored to the
   1080x1920 canvas instead of to the 4:5 tile (y285..1635) that the grid
   actually shows. line1 is 15 characters now and the set fills the tile.
   ========================================================================== */

/* ---------- geometry, stated once so every prop can be re-seated ----------
   Everything load-bearing lives inside the 1:1 band y420..1500, and the shop
   fills the tile rather than sitting at the bottom of it. */
const B_FASCIA = 812;        // > 780, the quiet-zone floor — the type sits on sky only
const B_OPEN_T = 996;
const B_OPEN_B = 1296;
const B_KERB = 1296;
const B_GROUND = 1478;       // the hero and the goods stand here, NEAR camera
const B_HERO = 292;
/* ⛔ x > 956 is eaten by the IG feed's like/comment/share rail. 794 + 146 = 940. */
const B_CX = 794;

/** one lit machine bay behind the raised shutter — three of them, three
    colours, and each one MID-CYCLE, which is the whole promise of the hook.
    ⛔ Drawn as a MACHINE (cabinet, lit port, spoked flywheel, output slot), not
    a coloured rectangle: v1's bays read as three flat swatches with wheels. */
const BuildBay: React.FC<{ x: number; c: string; phase: number }> = ({ x, c, phase }) => (
  <>
    {/* the cabinet */}
    <div style={{ position: "absolute", left: x, top: B_OPEN_T + 14, width: 236, height: 268,
      background: `linear-gradient(176deg, ${c} 0%, ${c}77 100%)`,
      border: "7px solid rgba(0,0,0,0.5)" }} />
    {/* the lit inspection port */}
    <div style={{ position: "absolute", left: x + 26, top: B_OPEN_T + 36, width: 184, height: 100,
      background: "#1A1208", border: "6px solid rgba(0,0,0,0.5)" }}>
      <div style={{ position: "absolute", left: 14, top: 38, width: 156, height: 12,
        background: `${c}DD` }} />
      <div style={{ position: "absolute", left: 14, top: 62, width: 96, height: 12,
        background: `${c}88` }} />
    </div>
    {/* the flywheel — real spokes and a hub, so it reads as machinery */}
    <div style={{ position: "absolute", left: x + 68, top: B_OPEN_T + 150, width: 100, height: 100,
      borderRadius: "50%", border: `15px solid ${c}` }}>
      {[0, 60, 120].map((a) => (
        <div key={`sp${x}${a}`} style={{ position: "absolute", left: "50%", top: "50%",
          width: 70, height: 10, margin: "-5px 0 0 -35px", background: c,
          transform: `rotate(${a + phase}deg)` }} />
      ))}
      <div style={{ position: "absolute", left: "50%", top: "50%", width: 30, height: 30,
        margin: "-15px 0 0 -15px", borderRadius: "50%", background: "#241A0E" }} />
    </div>
    {/* the output slot, lit */}
    <div style={{ position: "absolute", left: x + 16, top: B_OPEN_T + 258, width: 204, height: 20,
      background: `${c}EE` }} />
  </>
);

/** a finished good out on the kerb — one per bay, already made and already out */
const BuildGood: React.FC<{ cx: number; c: string; round?: boolean }> = ({ cx, c, round }) => (
  <>
    <div style={{ position: "absolute", left: cx - 92, top: B_GROUND - 20, width: 184, height: 42,
      borderRadius: "50%", filter: "blur(8px)",
      background: "radial-gradient(ellipse, rgba(30,20,10,0.62) 0%, rgba(30,20,10,0) 72%)" }} />
    <div style={{ position: "absolute", left: cx - 78, top: B_GROUND - 158, width: 156, height: 156,
      borderRadius: round ? "50%" : 12,
      background: `linear-gradient(172deg, ${c} 0%, ${c}88 100%)`,
      border: "7px solid rgba(0,0,0,0.5)" }}>
      <div style={{ position: "absolute", left: 20, top: 22, width: 58, height: 12,
        background: "rgba(255,255,255,0.32)" }} />
      {round && (
        <div style={{ position: "absolute", left: "50%", top: "50%", width: 34, height: 34,
          margin: "-17px 0 0 -17px", borderRadius: "50%", background: "rgba(0,0,0,0.4)" }} />
      )}
    </div>
  </>
);

const RowScene: React.FC = () => (
  <>
    {/* L1 · the sodium night sky — bleeds, and the type sits on it, on nothing else */}
    <div style={{ position: "absolute", inset: 0,
      background: "linear-gradient(180deg,#8E76A2 0%,#D6BCC6 16%,#F6E6CA 30%,#F2DCB2 42%,#DCAE82 60%,#B8845E 78%,#8E6448 100%)" }} />
    <Bloom x={540} y={1140} r={400} c="rgba(255,232,178,0.38)" />

    {/* L2 · the terrace opposite, in silhouette — depth, and it stays BELOW the type */}
    {[-40, 168, 878].map((x, i) => (
      <div key={`tr${i}`} style={{ position: "absolute", left: x, top: 846 + i * 30,
        width: 244, height: 520, background: "#6E5A80" }} />
    ))}
    {/* the sodium lamp on its bracket, the one practical */}
    <div style={{ position: "absolute", left: 62, top: 800, width: 116, height: 34,
      borderRadius: "6px 6px 26px 26px", background: "linear-gradient(176deg,#8E8672,#2E2A22)" }} />
    <div style={{ position: "absolute", left: 168, top: 808, width: 96, height: 13,
      background: "#2E2A22" }} />

    {/* L3 · the unit — fascia, awning board, and the rolled-up shutter box */}
    <div style={{ position: "absolute", left: 74, top: B_FASCIA, width: 932, height: 500,
      background: "linear-gradient(176deg,#E0CBA0 0%,#8E7856 100%)",
      border: "11px solid rgba(0,0,0,0.44)" }} />
    <div style={{ position: "absolute", left: 108, top: B_FASCIA + 24, width: 864, height: 96,
      borderRadius: 8, background: "linear-gradient(178deg,#FEFAEE 0%,#EADCBC 100%)",
      border: "7px solid #B8894A", display: "flex", alignItems: "center",
      justifyContent: "center", gap: 30 }}>
      {(["fiverr", "upwork"] as const).map((k) => (
        <div key={k} style={{ width: 68, height: 68, borderRadius: 16, background: "#FFFFFF",
          border: "4px solid #E8DCC0", display: "flex", alignItems: "center",
          justifyContent: "center" }}>
          <svg width="48" height="48" viewBox={MARKS[k].vb}>
            <path d={MARKS[k].d} fill={MARKS[k].c} />
          </svg>
        </div>
      ))}
      <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 50, color: "#1A1813",
        letterSpacing: "0.01em" }}>$0 · FREE</span>
    </div>
    {/* the curtain rolled into its box — the shutter is UP, which is the beat */}
    <div style={{ position: "absolute", left: 108, top: B_OPEN_T - 54, width: 864, height: 48,
      borderRadius: 6, background: "linear-gradient(178deg,#A99A78 0%,#3A342A 100%)",
      border: "5px solid rgba(0,0,0,0.5)" }} />

    {/* L4 · what is behind it — three lit bays, all three mid-cycle */}
    <div style={{ position: "absolute", left: 108, top: B_OPEN_T, width: 864, height: B_OPEN_B - B_OPEN_T,
      overflow: "hidden", background: "linear-gradient(178deg,#2A1E12 0%,#96702E 100%)" }} />
    <BuildBay x={134} c="#E7A94C" phase={0} />
    <BuildBay x={422} c="#8B72B0" phase={26} />
    <BuildBay x={710} c="#7FC0C9" phase={52} />

    {/* L5 · the kerb — full-bleed band, so no crop reveals a seam */}
    <div style={{ position: "absolute", left: 0, top: B_KERB, width: 1080, height: 1920 - B_KERB,
      background: "linear-gradient(180deg,#B8A078 0%,#9A8060 26%,#7A6448 62%,#54432E 100%)" }} />
    <div style={{ position: "absolute", left: 0, top: B_KERB, width: 1080, height: 200,
      background: "radial-gradient(ellipse at 46% 0%, rgba(255,232,178,0.5) 0%, rgba(255,232,178,0) 74%)" }} />

    {/* L6 · the goods already out on the kerb, and the hero who put them there */}
    <BuildGood cx={168} c="#E7A94C" />
    <BuildGood cx={356} c="#8B72B0" round />
    <BuildGood cx={544} c="#7FC0C9" />
    <div style={{ position: "absolute", left: B_CX - 132, top: B_GROUND - 24, width: 264, height: 52,
      borderRadius: "50%", filter: "blur(9px)",
      background: "radial-gradient(ellipse, rgba(30,20,10,0.64) 0%, rgba(30,20,10,0) 72%)" }} />
    <div style={{ position: "absolute", left: B_CX - B_HERO / 2, top: B_GROUND - B_HERO,
      width: B_HERO, height: B_HERO }}>
      <HouseMascot size={B_HERO} constr={1} cheer={1} />
    </div>

    {/* foreground kerb lip, blurred: depth without touching the hero */}
    <div style={{ position: "absolute", left: -40, top: 1690, width: 1160, height: 230,
      background: "linear-gradient(180deg,rgba(90,72,50,0) 0%,rgba(84,66,44,0.5) 46%,rgba(64,50,32,0.78) 100%)",
      filter: "blur(3px)" }} />
  </>
);

/* ================= THE COVER ============================================
   line1 hands off to the giant, which is the CTA keyword the viewer has to
   type, so the keyword is the biggest thing on the tile. Exactly one CLAY
   accent, on FREE — the word doing the enticing. BUILD is 5 letters, so it
   takes SceneCover's default 158 and clears the >=110px margin without a fit. */
export const CoverBuild: React.FC = () => (
  <SceneCover
    scene={<RowScene />}
    line1={<>3 <span style={{ color: CLAY }}>FREE</span> AI TOOLS</>}
    giant={<>BUILD</>}
  />
);

export const CoverBuildProof = cropProof(CoverBuild);
