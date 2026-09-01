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
