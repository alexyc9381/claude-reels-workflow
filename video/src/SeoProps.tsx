import React from "react";
import { Img, staticFile } from "remotion";
import { inter, fraunces } from "./fonts";
import { MONO } from "./SlopKit";
/* ⛔ NOT SlopKit's Mascot. That copy carries only `glasses` plus a few costumes
   that do not fit an audit floor, and this reel needs EIGHTEEN sprites to be
   visibly different people plus a main sprite that re-dresses every scene. The
   ClaudeOsReel copy is the house's richest: 17 independent costume levers
   (hardHat, hiVis, sherlock, judge, beret, brainHat, earpiece, suit, bowtie,
   shades, wrapShades, capBack, paint, freshEyes, wizard, heistMask, glasses)
   plus `tint`, and it is a pure component — no registerRoot, no Composition, no
   module side effects, so importing it costs nothing at render time. */
import { Mascot } from "./ClaudeOsReel";
import {
  W, H, E, OUT, IO, BACK, LIN, hexa, SH, SH_D, rnd, dkh, mxh, Contact,
  OAK, OAKD, OAKL, STEEL, STEELD, STEELL, BRASS, BRASSD, BRASSL,
  CARD, CARDD, CARDL, TAGR, TAGRD, GOLD, CLAY, GREEN, RED, SKY, INK, PAPER,
  LAMPC, AGENTS, AGENT_MAX, shortAgent, DOMAINS, PLAN, REPO, AGENT_COSTUME, FINDINGS, AGENT_DOMAIN, SPRITE_COSTUME,
} from "./SeoWorld";
import type { Domain, Costume } from "./SeoWorld";

/* ===========================================================================
   REEL 102 · "SEO" — THE PROPS.  Board: storyboards/102-seo.md.

   ⛔ DRAW, DON'T STACK ([[reel-draw-dont-stack]]). The split used here:
      · MANUFACTURED FACES — the page sheets, the repo card, the agent chips,
        the guide, the editor — really are flat rectangular objects, so they
        are built from divs and they read as themselves.
      · TOOLS AND TAGS — the flag, the lamp shade, the press, the clock, the
        map pin — are SHAPES, and stacked divs cannot draw a shape. Each is a
        single inline <svg> with real paths and each passes the SILHOUETTE
        TEST (nameable as flat black on white).
   ⛔ VALUE SEPARATION: every prop's face and its ground differ in LIGHTNESS,
      not just hue, and there is one light direction per scene.
   ⛔ Every grounded object gets a Contact shadow WIDER than itself.
   ⛔ NO COLOURED GLOW ANYWHERE. Depth is dark drop-shadow + inset highlight.
   ========================================================================= */

/* =========================================================================
   COMPONENT IDLES — the permanent low-contrast life every prop carries.
   ⭐ THIS IS THE HIGHEST-VALUE THING IN THIS FILE. On reel 100 adding a
      ceiling'd idle to every prop took the median motion 8.26 -> 9.80 and put
      it over the 9.00 bar for the first time. The trap it walks between is
      real: hero-only movement reads as a still with an animation pasted on
      it, everything-moving reads as chaos. The resolution is movement with a
      CEILING — every idle below is slow (period 40-110 frames), tiny (<= 3px
      or <= 0.06 opacity) and low-contrast, so nothing competes for rank.
   ====================================================================== */

/** a paper or glass surface's specular band, drifting down its face. */
export const Sheen: React.FC<{ f: number; phase?: number; z?: number; o?: number }> =
  ({ f, phase = 0, z = 6, o = 0.05 }) => {
  const p = ((f * 0.38 + phase * 41) % 200) / 200;
  return (
    <div style={{ position: "absolute", left: "-30%", right: "-30%", top: `${p * 152 - 30}%`,
      height: "24%", zIndex: z, pointerEvents: "none", transform: "rotate(-9deg)",
      background: `linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,${o}) 50%, rgba(255,255,255,0) 100%)` }} />
  );
};

/* ⛔⛔ THE AMPLITUDES BELOW ARE THE MEASURED ONES, NOT CAUTIOUS ONES. The first
   pass of this file used <=1.7deg and <=2.4px and moved the reel's median
   motion by 0.01 — which is precisely the trap [[feedback_scene_needs_an_arc]]
   already records: *"an idle wobble has to be VISIBLE to count: 1.15deg /
   1.7px measured as 'never static' and READ as static. 2.6deg / 4.6px with a
   second slower harmonic is the amplitude that actually reads."* An idle too
   small to see is not a safe idle, it is a wasted one. These are that number. */

/** a hanging object's pendulum SWAY, pivoted at its punched eye. ~2.6 deg peak,
    ~2.3s period, plus a slower second harmonic so it never looks like a loop. */
export const sway = (f: number, seed: number) =>
  Math.sin(f / 11.0 + seed * 2.3) * 1.75 + Math.sin(f / 27.0 + seed) * 0.85;

/** a seated object's permanent micro-drift. ~4.6px peak on x, ~4.1px on y, two
    incommensurate periods so it never reads as a loop, and slow enough (3-5s)
    that it cannot compete with any real beat. Applied to every plate, panel and
    card that would otherwise be frozen between its own gestures. */
export const drift = (f: number, seed: number, amp = 1) => ({
  x: (Math.sin(f / 47 + seed * 1.9) * 2.9 + Math.sin(f / 83 + seed) * 1.7) * amp,
  y: (Math.cos(f / 59 + seed * 2.7) * 2.6 + Math.sin(f / 91 + seed * 0.6) * 1.5) * amp,
});

/* =========================================================================
   THE REPO CARD — frame 0's claim plate, and the single most important object
   in the reel.

   ⛔⛔ WHY IT IS ALLOWED HERE AND WAS NOT ON REEL 100. The APPLE ruling was
      "the VO names no repo AND I could not source one" — several existed, none
      dominated, so no star or maker plate appeared anywhere. This VO also
      names no repo, but `AgriciDaniel/claude-seo` matches its figures EXACTLY
      ("25 sub-skills + 18 sub-agents" is the repo's own description and the
      VO says 25 skills and 18 agents), and `agents/` really does hold 18
      files. The identification is not ambiguous, so the card is a receipt
      rather than a guess.
   ⭐ AND IT IS WHAT MAKES FRAME 0 A CLAIM PLATE ([[feedback_frame0_claim_plate]]
      — the only measured IG-performance rule in this repo). 700x330 of cream
      at y=196 is 30.1% of the panel, all of it below y=120, with the Claude
      mark on a white tile at 132px and the star count in Fraunces at 88px.
   ====================================================================== */
export const RepoCard: React.FC<{ x: number; y: number; s?: number; z?: number;
  f?: number; claim?: number }> =
  ({ x, y, s = 1, z = 60, f = 0, claim = 1 }) => {
  const BW = 720 * s, BH = 344 * s;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: BW, height: BH, zIndex: z,
      background: CARDL, borderRadius: 20 * s, border: `${3 * s}px solid ${CARDD}`,
      boxShadow: SH_D, overflow: "hidden" }}>
      <Sheen f={f} phase={1} z={9} o={0.05} />

      {/* ---- THE MARK, BIG. [[feedback_real_marks_are_the_props]]: "the hero
           scene carries the Claude mark at 200px+". v1 ran it at 96px inside a
           head row that also carried a GitHub tile, an arrow, a kicker line and
           the repo path — five things competing in one band. It is now the
           single largest object on the card. */}
      <div style={{ position: "absolute", left: 30 * s, top: 34 * s,
        width: 196 * s, height: 196 * s, borderRadius: 42 * s, background: "#FFFFFF",
        border: `${3 * s}px solid #E8DCC0`, boxShadow: SH,
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Img src={staticFile("claude_logo.png")}
          style={{ width: 146 * s, height: 146 * s, objectFit: "contain" }} />
      </div>

      {/* ---- THE NUMBER, HUGE. The frame-0 gate wants a figure in the display
           face at 74px+; this is 104px and it is the only number on the card. */}
      <div style={{ position: "absolute", left: 250 * s, top: 44 * s, right: 26 * s,
        display: "flex", alignItems: "center", gap: 10 * s }}>
        <span style={{ color: BRASSD, fontSize: 74 * s, lineHeight: 1 }}>&#9733;</span>
        <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 104 * s,
          lineHeight: 0.9, color: "#241F17", letterSpacing: "-0.03em" }}>{REPO.stars}</span>
      </div>

      {/* ---- WHAT IT DOES, AS FIVE ICONS. This replaces the kicker line, the
           licence chip and the language chip — three strings that told you
           nothing about the subject — with the five things it actually audits,
           in the reel's own colour language. They are the SAME discs that burst
           out of the card two beats later, so the hook teaches its vocabulary
           in the first second. */}
      <div style={{ position: "absolute", left: 252 * s, top: 158 * s,
        display: "flex", gap: 11 * s, alignItems: "center" }}>
        {DOMAINS.map((d, i) => (
          <span key={"di" + i} style={{ width: 68 * s, height: 68 * s, borderRadius: 34 * s,
            background: CARDL, border: `${4 * s}px solid ${d.c}`, boxShadow: SH,
            display: "flex", alignItems: "center", justifyContent: "center",
            /* a ceiling'd stagger so the row breathes rather than sitting dead */
            transform: `translateY(${Math.sin(f / 34 + i * 1.15) * 2.2 * s}px)` }}>
            <DomainIcon k={d.key} s={s * 0.56} c={d.c} on={1} />
          </span>))}
      </div>

      {/* ---- THE RECEIPT, one small mono line. The repo path is the only prose
           left on the card, and it is the thing that makes the star count mean
           something. */}
      <div style={{ position: "absolute", left: 252 * s, top: 242 * s, right: 26 * s,
        display: "flex", alignItems: "center", gap: 9 * s }}>
        <Img src={staticFile("logos/github.svg")}
          style={{ width: 26 * s, height: 26 * s, objectFit: "contain", flexShrink: 0 }} />
        <span style={{ fontFamily: MONO, fontWeight: 800, fontSize: 21 * s, color: "#6E6558",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", minWidth: 0 }}>
          {REPO.full}</span>
      </div>

      {/* ---- THE CLAIM. Two NUMBERS in the display face with tiny labels, not a
           sentence: the figures are what the VO says out loud. */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 62 * s,
        background: INK, display: "flex", alignItems: "center", justifyContent: "center",
        gap: 30 * s, zIndex: 14, opacity: claim }}>
        {[[String(REPO.skills), "SKILLS"], [String(REPO.agents), "AGENTS"]].map(([n, l], i) => (
          <span key={"cn" + i} style={{ display: "flex", alignItems: "baseline", gap: 8 * s }}>
            <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 42 * s,
              color: i ? BRASSL : "#F6F1E6", lineHeight: 1 }}>{n}</span>
            <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 17 * s,
              color: "#B4AC9C", letterSpacing: "0.14em" }}>{l}</span>
          </span>))}
      </div>
    </div>
  );
};

/* =========================================================================
   THE AGENT CHIP — one real `.md` file out of `agents/`. These are the
   particles of the hook burst AND the labels on the eighteen stations, so the
   same object does both jobs and the viewer learns it once.
   ⛔ A CHIP IS A RECEIPT AS WELL AS A PARTICLE ([[apple-reel]] lesson 9), so
      the tumble is capped at +-34 deg — +-420 deg made half of reel 100's
      chips unreadable.
   ====================================================================== */
export const AgentChip: React.FC<{ t: string; s?: number; c?: string; dim?: number }> =
  ({ t, s = 1, c = CARD, dim = 0 }) => {
  const D = (x: string) => (dim > 0 ? dkh(x, dim) : x);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9 * s,
      /* 260*s inner: `seo-dataforseo.md` is 17 chars of mono-800 at 22px =
         225px, so the longest real name clears with 35px of air. */
      minWidth: 260 * s, maxWidth: 300 * s,
      background: D(c), border: `${3 * s}px solid ${D(CARDD)}`, borderRadius: 9 * s,
      padding: `${8 * s}px ${13 * s}px`, boxShadow: SH }}>
      <span style={{ width: 15 * s, height: 18 * s, borderRadius: 2 * s, flexShrink: 0,
        background: D("#B9AE95"), position: "relative" }}>
        <span style={{ position: "absolute", right: 0, top: 0, width: 6 * s, height: 6 * s,
          background: D(CARDL) }} /></span>
      <span style={{ fontFamily: MONO, fontWeight: 800, fontSize: 22 * s, color: D("#241F17"),
        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", minWidth: 0 }}>
        {t}</span>
    </div>
  );
};

/** ⛔⛔ THE BURST USED TO THROW EIGHTEEN FILENAME CHIPS, i.e. the interrupt in
    the reel's most important second was eighteen more text boxes flying at the
    camera. It now throws the eighteen AGENTS AS ICON DISCS, each badged to the
    domain it belongs to — the same discs sitting on the card's face, so the
    burst reads as "there are eighteen of these inside" without a word of type.
    ⛔ Rendered z-BELOW the hero so the discs emerge from BEHIND it. */
export const IconBurst: React.FC<{ x: number; y: number; t: number; z?: number;
  spread?: number; s?: number }> =
  ({ x, y, t, z = 50, spread = 660, s = 1 }) => {
  if (t <= 0.001) return null;
  return (<>
    {AGENTS.map((a, i) => {
      const key = AGENT_DOMAIN[a] ?? "technical";
      const c = (DOMAINS.find((d) => d.key === key) ?? DOMAINS[0]).c;
      const ang = (i / AGENTS.length) * Math.PI * 2 + rnd(i, 7) * 0.5;
      const d = (0.42 + rnd(i, 11) * 0.58) * spread * t;
      const spin = (rnd(i, 13) - 0.5) * 150 * t;
      const D = (58 + rnd(i, 17) * 26) * s;
      return (
        <div key={"ib" + i} style={{ position: "absolute", zIndex: z + (i % 3),
          left: x + Math.cos(ang) * d, top: y + Math.sin(ang) * d * 0.72,
          width: D, height: D, borderRadius: D / 2, background: CARDL,
          border: `${Math.max(3, D * 0.07)}px solid ${c}`, boxShadow: SH,
          display: "flex", alignItems: "center", justifyContent: "center",
          transform: `translate(-50%,-50%) rotate(${spin}deg) scale(${0.5 + t * 0.5})`,
          opacity: Math.min(1, t * 3.4) * (1 - Math.max(0, (t - 0.72) / 0.28) * 0.85) }}>
          <DomainIcon k={key} s={D / 118} c={c} on={1} />
        </div>
      );
    })}
  </>);
};

/** the storm: the inside of the burst, discs travelling past camera. */
export const IconStorm: React.FC<{ f: number; n?: number; z?: number; cx?: number;
  cy?: number }> = ({ f, n = 16, z = 60, cx = W / 2, cy = 400 }) => (<>
    {Array.from({ length: n }, (_, i) => {
      const a = AGENTS[i % AGENTS.length];
      const key = AGENT_DOMAIN[a] ?? "technical";
      const c = (DOMAINS.find((d) => d.key === key) ?? DOMAINS[0]).c;
      const ang = rnd(i, 3) * Math.PI * 2;
      const sp = 12 + rnd(i, 5) * 15;
      const k = ((f * sp + rnd(i, 9) * 900) % 900) / 900;
      const dd = 60 + k * 700;
      const D = (46 + rnd(i, 19) * 40) * (0.4 + k * 1.35);
      return (
        <div key={"is" + i} style={{ position: "absolute", zIndex: z + (i % 4),
          left: cx + Math.cos(ang) * dd, top: cy + Math.sin(ang) * dd * 0.68,
          width: D, height: D, borderRadius: D / 2, background: CARDL,
          border: `${Math.max(3, D * 0.07)}px solid ${c}`, boxShadow: SH,
          display: "flex", alignItems: "center", justifyContent: "center",
          transform: `translate(-50%,-50%) rotate(${(rnd(i, 15) - 0.5) * 90}deg)`,
          opacity: Math.min(1, k * 4) * (1 - Math.max(0, (k - 0.74) / 0.26)) }}>
          <DomainIcon k={key} s={D / 118} c={c} on={1} />
        </div>
      );
    })}
  </>);

/* =========================================================================
   THE PAGE SHEET — one page of the website, face-out on the rack. A website
   IS a set of pages, so this needs no translation: it is drawn as the page it
   is, with a nav, a hero block, body columns and a footer.
   `state`: 0 = unaudited, 1 = flagged, 2 = fixed.
   ====================================================================== */
export const PageSheet: React.FC<{ x: number; y: number; w: number; h: number; z?: number;
  kind?: number; state?: number; dim?: number; f?: number; lit?: number; label?: string }> =
  ({ x, y, w, h, z = 40, kind = 0, state = 0, dim = 0, f = 0, lit = 1, label }) => {
  const D = (c: string) => {
    const k = dim + (1 - lit) * 0.5;
    return k > 0 ? dkh(c, Math.min(0.86, k)) : c;
  };
  const u = w / 100;
  const ac = D([SKY, CLAY, GOLD, GREEN, RED, "#6B5A8E"][kind % 6]);
  const acs = D(mxh([SKY, CLAY, GOLD, GREEN, RED, "#6B5A8E"][kind % 6], 0.42));
  const dr = drift(f, kind + x * 0.013, 1);
  const TXT = D("#C6BFB1"), TXTD = D("#9C9384"), INKD = D("#3B342A"), BOX = D("#EBE5D8");
  /* a body line, so every archetype is built from the same primitive */
  const line = (k: string, l: number, tp: number, wd: string, ht = 0.032, c = TXT) => (
    <div key={k} style={{ position: "absolute", left: l, top: h * tp, width: wd,
      height: h * ht, borderRadius: h * 0.012, background: c,
      transform: `translateX(${dr.x * 0.4}px)` }} />
  );

  /* ⛔⛔ TWELVE COPIES OF ONE LAYOUT IS A TEXTURE, NOT A WEBSITE. v1 drew every
     page as hero-band + H1 + three rows and varied only the accent colour,
     which is the [[feedback_real_marks_are_the_props]] "one arrangement is not a
     visual language" trap — and this prop is on screen in FIVE scenes (the
     hook, the sweep, the villain, the peak and the CTA), so the repetition was
     compounding. A real site is a MIX of page types, and the audit's whole
     premise is that different page types fail differently, so the archetypes
     are also on-brief rather than decoration. */
  const body = () => {
    switch (kind % 6) {
      /* 0 · LANDING — centred hero, then a row of three feature cards */
      case 0: return (<>
        <div style={{ position: "absolute", left: u * 5, right: u * 5, top: h * 0.17,
          height: h * 0.19, borderRadius: u * 1.1, background: acs }} />
        {line("h1", u * 18, 0.41, `${64}%`, 0.05, INKD)}
        {[0, 1, 2].map((i) => (
          <div key={"fc" + i} style={{ position: "absolute", left: `${5 + i * 31}%`,
            top: h * 0.52, width: "28%", height: h * 0.30, borderRadius: u * 1.1,
            background: BOX, border: `${u * 0.6}px solid ${D("#D7CFBE")}`,
            transform: `translateY(${dr.y * 0.3}px)` }}>
            <div style={{ position: "absolute", left: "12%", right: "12%", top: "12%",
              height: "26%", borderRadius: u * 0.8, background: ac, opacity: 0.55 }} />
          </div>))}
      </>);
      /* 1 · ARTICLE — narrow column, byline, long copy. The classic blog page. */
      case 1: return (<>
        {line("k", u * 8, 0.16, "26%", 0.028, ac)}
        {line("t1", u * 8, 0.22, "84%", 0.052, INKD)}
        {line("t2", u * 8, 0.30, "56%", 0.052, INKD)}
        {line("by", u * 8, 0.39, "38%", 0.026, TXTD)}
        {[0, 1, 2, 3, 4, 5].map((i) =>
          line("b" + i, u * 8, 0.47 + i * 0.075, `${[88, 82, 90, 74, 86, 60][i]}%`))}
      </>);
      /* 2 · PRODUCT — image left, price and buy button right */
      case 2: return (<>
        <div style={{ position: "absolute", left: u * 6, top: h * 0.18, width: "44%",
          height: h * 0.44, borderRadius: u * 1.1, background: acs,
          border: `${u * 0.6}px solid ${D("#D7CFBE")}` }} />
        {line("pn", u * 54, 0.20, "38%", 0.048, INKD)}
        {line("pp", u * 54, 0.30, "22%", 0.062, ac)}
        {line("ps", u * 54, 0.41, "34%", 0.026, TXTD)}
        <div style={{ position: "absolute", left: `${54}%`, top: h * 0.48, width: "34%",
          height: h * 0.09, borderRadius: h * 0.045, background: ac }} />
        {[0, 1, 2].map((i) => line("pr" + i, u * 6, 0.68 + i * 0.07, `${[86, 78, 66][i]}%`))}
      </>);
      /* 3 · PRICING — three columns, the middle one raised */
      case 3: return (<>
        {line("ph", u * 22, 0.17, "56%", 0.046, INKD)}
        {[0, 1, 2].map((i) => (
          <div key={"pc" + i} style={{ position: "absolute", left: `${6 + i * 30.5}%`,
            top: h * (i === 1 ? 0.26 : 0.30), width: "27%",
            height: h * (i === 1 ? 0.56 : 0.48), borderRadius: u * 1.1,
            background: i === 1 ? acs : BOX,
            border: `${u * 0.7}px solid ${i === 1 ? ac : D("#D7CFBE")}`,
            transform: `translateY(${dr.y * (i === 1 ? 0.5 : 0.25)}px)` }}>
            <div style={{ position: "absolute", left: "14%", right: "14%", top: "12%",
              height: "12%", borderRadius: u * 0.6, background: TXTD }} />
            <div style={{ position: "absolute", left: "14%", right: "34%", top: "30%",
              height: "18%", borderRadius: u * 0.6, background: i === 1 ? ac : TXTD }} />
            {[0, 1, 2].map((k) => (
              <div key={"pl" + k} style={{ position: "absolute", left: "14%", right: "20%",
                top: `${56 + k * 12}%`, height: "6%", borderRadius: u * 0.5, background: TXT }} />))}
          </div>))}
      </>);
      /* 4 · DOCS — a left sidebar of nav links against a content column */
      case 4: return (<>
        <div style={{ position: "absolute", left: 0, top: h * 0.11, bottom: h * 0.08,
          width: "30%", background: BOX, borderRight: `${u * 0.7}px solid ${D("#D7CFBE")}` }}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={"nv" + i} style={{ position: "absolute", left: "12%", right: "16%",
              top: `${9 + i * 14}%`, height: "7%", borderRadius: u * 0.5,
              background: i === 1 ? ac : TXT }} />))}
        </div>
        {line("dt", u * 36, 0.18, "52%", 0.05, INKD)}
        {[0, 1, 2, 3].map((i) => line("dl" + i, u * 36, 0.29 + i * 0.075, `${[58, 54, 60, 44][i]}%`))}
        <div style={{ position: "absolute", left: "36%", right: u * 5, top: h * 0.62,
          height: h * 0.22, borderRadius: u * 0.9, background: D("#E7E1D3"),
          border: `${u * 0.6}px dashed ${D("#CFC6B3")}` }} />
      </>);
      /* 5 · CATEGORY — a grid of product tiles */
      default: return (<>
        {line("ct", u * 6, 0.16, "44%", 0.042, INKD)}
        {Array.from({ length: 6 }, (_, i) => (
          <div key={"tl" + i} style={{ position: "absolute",
            left: `${6 + (i % 3) * 30}%`, top: h * (0.26 + Math.floor(i / 3) * 0.30),
            width: "27%", height: h * 0.26, borderRadius: u * 0.9,
            background: BOX, border: `${u * 0.6}px solid ${D("#D7CFBE")}`,
            transform: `translateY(${dr.y * (0.2 + (i % 3) * 0.12)}px)` }}>
            <div style={{ position: "absolute", inset: `10% 10% 42% 10%`, borderRadius: u * 0.6,
              background: i % 2 ? acs : ac, opacity: 0.62 }} />
            <div style={{ position: "absolute", left: "10%", right: "34%", bottom: "14%",
              height: "14%", borderRadius: u * 0.5, background: TXTD }} />
          </div>))}
      </>);
    }
  };

  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
      background: D("#FBF9F4"), border: `${Math.max(2, u * 1.6)}px solid ${D("#B9B0A0")}`,
      borderRadius: u * 1.4, overflow: "hidden", boxShadow: SH }}>
      {/* the browser chrome — three dots and a URL bar. This is what makes it
          read as a WEB page rather than a sheet of paper. */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: h * 0.11,
        background: D("#E4DED1"), display: "flex", alignItems: "center", gap: u * 1.1,
        paddingLeft: u * 2.4, zIndex: 4 }}>
        {[0, 1, 2].map((i) => (
          <span key={"d" + i} style={{ width: u * 2.0, height: u * 2.0, borderRadius: u,
            background: D("#B0A794") }} />))}
        <span style={{ marginLeft: u * 1.6, height: h * 0.055, flex: 1, marginRight: u * 3,
          borderRadius: h * 0.03, background: D("#F3EFE5") }} />
      </div>
      {body()}
      {/* footer */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: h * 0.08,
        background: D("#E0D9CB"), zIndex: 4 }} />
      {label && (
        <div style={{ position: "absolute", left: 0, right: 0, bottom: h * 0.09, zIndex: 5,
          textAlign: "center", fontFamily: MONO, fontWeight: 800, fontSize: Math.max(9, u * 2.4),
          color: D("#6E6558"), whiteSpace: "nowrap", overflow: "hidden",
          textOverflow: "ellipsis" }}>{label}</div>)}
      <Sheen f={f} phase={kind + x * 0.01} z={8} o={lit > 0.5 ? 0.05 : 0.02} />
      {/* the fixed state gets a solid green corner, never a glow */}
      {state === 2 && (
        <div style={{ position: "absolute", right: 0, top: 0, width: 0, height: 0,
          borderTop: `${u * 9}px solid ${D(GREEN)}`,
          borderLeft: `${u * 9}px solid transparent`, zIndex: 12 }} />)}
    </div>
  );
};

/* =========================================================================
   THE FLAG — one audit finding, pinned to the page it was found on. Drawn as
   an SVG pennant so the silhouette is nameable, hung from a punched eye so it
   can really swing.
   ====================================================================== */
export const Flag: React.FC<{ x: number; y: number; t?: string; c?: string; s?: number;
  z?: number; f?: number; seed?: number; fixed?: number; o?: number }> =
  ({ x, y, t, c = TAGR, s = 1, z = 80, f = 0, seed = 0, fixed = 0, o = 1 }) => {
  const col = fixed > 0.5 ? GREEN : c;
  const rot = sway(f, seed);
  /* ⛔ WIDTH ARITHMETIC BEFORE THE BOX. The inner text box is FW-26*s wide and
     mono-900 advances ~0.60em, so at s=0.80 a 118*s pennant gave 73px = about
     10 characters and truncated `NO ALT TEXT`, `NOT CITABLE`, `NO NAP MATCH`.
     The longest real finding is 12 chars, which needs 12*0.60*15 = 108px of
     text plus the 26*s margin, so the pennant is 152. */
  const FW = t ? 152 * s : 42 * s;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z, opacity: o,
      transform: `rotate(${rot}deg)`, transformOrigin: `${9 * s}px ${5 * s}px` }}>
      <svg width={FW + 14 * s} height={46 * s} viewBox={`0 0 ${FW + 14 * s} ${46 * s}`}>
        {/* the pin through the punched eye */}
        <circle cx={9 * s} cy={6 * s} r={5 * s} fill={dkh(col, 0.42)} />
        <path d={`M ${9 * s} ${6 * s} L ${9 * s} ${16 * s}`} stroke={dkh(col, 0.42)}
          strokeWidth={2.6 * s} />
        {/* the pennant: a rectangle with a swallow tail cut into its end */}
        <path d={`M ${2 * s} ${16 * s} H ${FW} L ${FW - 11 * s} ${29 * s} L ${FW} ${42 * s}
                  H ${2 * s} Z`} fill={col} stroke={dkh(col, 0.34)} strokeWidth={2 * s} />
      </svg>
      {t && (
        <div style={{ position: "absolute", left: 12 * s, top: 19 * s, width: FW - 26 * s,
          fontFamily: MONO, fontWeight: 900, fontSize: 15 * s, color: "#FFF3EE",
          letterSpacing: "0.02em", whiteSpace: "nowrap", overflow: "hidden",
          textOverflow: "ellipsis", minWidth: 0 }}>{t}</div>)}
    </div>
  );
};

/* =========================================================================
   THE RACK — twelve pages of `example.com` in a steel frame, 4 across, 3 down.
   This is the reel's recurring object: it is the SITE, so it is the thing the
   villain crawls one page at a time (S7) and the thing that lights all at once
   (S8). Those two scenes are a before/after on ONE object, which is the only
   legitimate reason to repeat a set.
   ====================================================================== */
/** `rise` staggers every page in from below its own slot, so the rack itself
    becomes the scene's large mover instead of a backdrop that fades.
    ⛔ WHY THIS EXISTS: the CTA measured 5.39 with a 9-frame dead tail, and the
    reason was scale — a 206px sprite walking is 42,400px², ~5% of the panel,
    which tops out around 2.0 mean delta no matter how fast it goes. The rack is
    210,000px², 26% of the panel. Moving the thing that is already biggest is
    the only lever that has ever worked here ([[apple-reel]] lesson 10). */
export const Rack: React.FC<{ x: number; y: number; w: number; h: number; z?: number;
  f?: number; lit?: number[]; state?: number[]; dim?: number; cols?: number; rows?: number;
  flags?: number; rise?: number; spread?: number; named?: boolean }> =
  ({ x, y, w, h, z = 40, f = 0, lit, state, dim = 0, cols = 4, rows = 3, flags = 0,
     rise, spread = 7, named = true }) => {
  const GAP = w * 0.028;
  const cw = (w - GAP * (cols + 1)) / cols;
  const ch = (h - GAP * (rows + 1)) / rows;
  return (<>
    {/* the frame: uprights and shelves, drawn behind the sheets */}
    <div style={{ position: "absolute", left: x - 12, top: y - 12, width: w + 24, height: h + 24,
      zIndex: z - 3, background: dkh(STEELD, dim * 0.5), borderRadius: 8, boxShadow: SH_D }} />
    {Array.from({ length: rows }, (_, r) => (
      <div key={"sh" + r} style={{ position: "absolute", left: x - 12, width: w + 24,
        top: y + GAP + r * (ch + GAP) + ch, height: GAP * 0.62, zIndex: z + 20,
        background: dkh(STEEL, 0.24 + dim * 0.4) }} />
    ))}
    {Array.from({ length: rows * cols }, (_, i) => {
      const r = Math.floor(i / cols), k = i % cols;
      const px = x + GAP + k * (cw + GAP), py = y + GAP + r * (ch + GAP);
      const L = lit ? lit[i] ?? 0 : 1;
      const st = state ? state[i] ?? 0 : 0;
      /* the stagger runs column-major so the wave crosses the rack sideways
         rather than sweeping top-to-bottom, which keeps more pages in flight
         at once and therefore more area travelling per frame. */
      /* `spread` is how many pages are in flight at once. Wider = more area
         travelling per frame, which is the whole point of the prop. */
      const ord = k * rows + r;
      const ri = rise === undefined ? 1
        : Math.max(0, Math.min(1, (rise * (rows * cols + spread) - ord) / spread));
      if (ri <= 0.001) return null;
      return (
        <React.Fragment key={"pg" + i}>
          {/* ⛔⛔ `zIndex: z` IS LOAD-BEARING, NOT DECORATION. Without it this
              wrapper stacks at z-auto while the rack's own backing panel sits at
              `z-3` (=1) and its shelves at `z+20`, so every page rendered BEHIND
              the backing and the rack came out as an empty box — in ALL of S1,
              S8 and S9 at once, silently, the moment the wrapper was introduced.
              The tell was a scene whose motion did not move at all after a large
              change: 5.19 -> 5.15. A number that refuses to respond to a real
              edit means the edit is not reaching the picture. */}
          <div style={{ position: "absolute", inset: 0, zIndex: z,
            transform: `translateY(${(1 - ri) * 150}px)`, opacity: Math.min(1, ri * 2.4) }}>
            <PageSheet x={px} y={py} w={cw} h={ch} z={z} kind={i} state={st} dim={dim}
              f={f + i * 9} lit={L} />
              {/* a finding hangs off the page it was found on, and it CARRIES ITS
                REAL NAME. An unnamed red tag is decoration; `MISSING H1` is the
                audit speaking. `named` is off on the small racks where the text
                would be under ~11px and would only add noise. */}
            {/* ⛔ TWELVE LABELLED FLAGS IS A WALL OF TYPE. Every page still gets
                its pennant, in its domain colour, but only every THIRD one is
                named — enough for the audit's own vocabulary to be legible as a
                receipt, not so much that the rack becomes a list. */}
            {flags > 0 && L > 0.35 && (i % 2 === 0 || cw > 150) && (
              <Flag x={px + cw * (named && cw > 150 && i % 3 === 0 ? 0.40 : 0.62)} y={py + ch * 0.05}
                t={named && cw > 150 && i % 3 === 0 ? FINDINGS[i % FINDINGS.length][0] : undefined}
                c={DOMAINS[FINDINGS[i % FINDINGS.length][1]].c}
                s={cw > 150 ? 0.80 : 0.62} z={z + 24} f={f} seed={i}
                fixed={st === 2 ? 1 : 0} o={Math.min(1, flags * 2)} />)}
          </div>
        </React.Fragment>
      );
    })}
  </>);
};

/* =========================================================================
   THE PLAN LADDER — ⭐ THE HERO ARTIFACT. Five findings, pulled off the pages
   and re-hung in the order they have to be done. The VO's "and what order" is
   the one thing no other SEO tool reel shows, so this gets the reel's biggest
   push and its brightest light.

   ⛔ HIERARCHY IS HERO SIZE, NOT MOVER COUNT ([[apple-reel]] lesson 5). Rung 1
      is 1.6x rung 5, so the ladder reads as a RANK at a glance rather than as
      a list of five equal things.
   ====================================================================== */
export const PlanLadder: React.FC<{ x: number; y: number; w: number; z?: number;
  t?: number; f?: number; s?: number }> =
  ({ x, y, w, z = 70, t = 1, f = 0, s = 1 }) => (<>
    {/* the two stiles the rungs hang between */}
    {[0, 1].map((i) => (
      <div key={"st" + i} style={{ position: "absolute", left: x + i * (w - 13 * s), top: y - 16 * s,
        width: 13 * s, height: 420 * s, background: dkh(OAK, 0.18), zIndex: z - 2,
        borderRadius: 4 * s, boxShadow: SH }} />
    ))}
    {PLAN.map((p, i) => {
      const a0 = i * 5;
      const arrive = E(Math.max(0, t * 60 - a0), 0, 13, 0, 1, BACK);
      if (arrive <= 0.005) return null;
      /* rung 1 is 1.6x rung 5 — the rank is the SIZE, not the number */
      const k = 1.6 - (i / 4) * 0.6;
      const dr = drift(f, i * 2.3 + 1, 0.9);
      const rw = w * (0.62 + 0.38 * k / 1.6);
      const rh = 52 * s * k * 0.78;
      const ry = y + i * 74 * s;
      return (
        <div key={"rg" + p.n} style={{ position: "absolute", left: x + 6 * s,
          top: ry + (1 - arrive) * 40 * s, width: rw, height: rh, zIndex: z + (5 - i),
          opacity: arrive, display: "flex", alignItems: "center", gap: 12 * s,
          background: CARDL, border: `${3 * s}px solid ${dkh(p.d.c, 0.10)}`,
          borderLeft: `${11 * s}px solid ${p.d.c}`, borderRadius: 8 * s,
          padding: `0 ${13 * s}px`, boxShadow: SH_D, transformOrigin: "2% 50%",
          /* ⭐ a rung HANGS, so once it has arrived it keeps a <=0.5deg swing and
             a ~2px drift. Five rungs at five phases means the hero artifact is
             alive on every frame it is on screen without any of them competing. */
          transform: `translateX(${(1 - arrive) * -46 * s}px) translate(${dr.x}px, ${dr.y}px) rotate(${sway(f, i * 1.7) * 0.34 * arrive}deg)` }}>
          <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900,
            fontSize: 34 * s * k * 0.82, color: p.d.c, lineHeight: 1, flexShrink: 0 }}>{p.n}</span>
          <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 21 * s * k * 0.80,
            color: "#241F17", whiteSpace: "nowrap", overflow: "hidden",
            textOverflow: "ellipsis", minWidth: 0 }}>{p.t}</span>
          {/* ⛔ the domain WORD was the third string on every rung, i.e. five more
              text elements on the reel's most important picture. The icon says
              the same thing and is watched instead of read. */}
          <span style={{ marginLeft: "auto", flexShrink: 0, display: "flex" }}>
            <DomainIcon k={p.d.key} s={s * k * 0.30} c={p.d.c} on={arrive} />
          </span>
        </div>
      );
    })}
  </>);

/* =========================================================================
   THE SCORE DIAL — the repo really does emit a 0-100 score. The site under it
   is `example.com`, the repo's own documented example URL, which is what keeps
   a number on a receipt-shaped object from being a claim about anyone's site.
   ====================================================================== */
export const ScoreDial: React.FC<{ x: number; y: number; p: number; s?: number; z?: number;
  f?: number; show?: boolean }> =
  ({ x, y, p, s = 1, z = 84, f = 0, show = true }) => {
  const R = 62, C = 2 * Math.PI * R;
  /* ⛔⛔ THE NEEDLE WAS 90 DEGREES OUT OF PHASE WITH ITS OWN ARC and pointed
     straight DOWN through the printed number at low scores. Derived rather
     than nudged: the arc path starts at 3 o'clock and carries
     `rotate(150 84 84)`, so its start direction is 90+150 = 240 degrees
     clockwise from 12 and it sweeps 240 degrees to 480. The needle path points
     at 12 with zero rotation, so it must run 240 -> 480, i.e. -120 -> +120. */
  const ang = -120 + p * 240;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      transform: `scale(${s})`, transformOrigin: "50% 50%" }}>
      <svg width={168} height={168} viewBox="0 0 168 168">
        <circle cx={84} cy={84} r={74} fill={CARDL} stroke={CARDD} strokeWidth={4} />
        {/* the unlit arc */}
        <circle cx={84} cy={84} r={R} fill="none" stroke="#D9D0BC" strokeWidth={13}
          strokeDasharray={`${C * 0.667} ${C}`} strokeLinecap="round"
          transform="rotate(150 84 84)" />
        {/* the lit arc — solid paint, never a glow */}
        <circle cx={84} cy={84} r={R} fill="none" stroke={p > 0.72 ? GREEN : p > 0.4 ? GOLD : TAGR}
          strokeWidth={13} strokeDasharray={`${C * 0.667 * p} ${C}`} strokeLinecap="round"
          transform="rotate(150 84 84)" />
        {/* the needle */}
        <g transform={`rotate(${ang} 84 84)`}>
          <path d="M 84 84 L 84 32" stroke="#241F17" strokeWidth={5} strokeLinecap="round" />
        </g>
        <circle cx={84} cy={84} r={9} fill="#241F17" />
      </svg>
      {show && (<>
        <div style={{ position: "absolute", left: 0, right: 0, top: 96, textAlign: "center",
          fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 40, color: "#241F17",
          lineHeight: 1 }}>{Math.round(p * 100)}</div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 137, textAlign: "center",
          fontFamily: MONO, fontWeight: 800, fontSize: 13, color: "#8A8175",
          letterSpacing: "0.10em" }}>SEO SCORE</div>
      </>)}
    </div>
  );
};

/* =========================================================================
   THE TERMINAL — the real command, in the terminal face. This is the literal
   layer docs/THE-OPEN.md asks for: the theme carries the feeling, the literal
   layer carries the information.
   ⛔ PAPER-TONED, NOT A DARK GLOWING TERMINAL ([[feedback_reel_matte_palette]]
      — a screen-shaped subject is exactly where the neon instinct fires).
   ====================================================================== */
export const TermBox: React.FC<{ x: number; y: number; w: number; h: number; z?: number;
  f?: number; typed?: number; line?: string; rows?: string[]; done?: number }> =
  ({ x, y, w, h, z = 60, f = 0, typed = 1, line = REPO.cmd, rows = [], done = 0 }) => {
  const n = Math.round(line.length * Math.max(0, Math.min(1, typed)));
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
      background: "#F2EDE1", border: `4px solid ${CARDD}`, borderRadius: 12,
      boxShadow: SH_D, overflow: "hidden" }}>
      <Sheen f={f} phase={9} z={30} o={0.04} />
      {/* the title bar */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 34,
        background: "#E0D9C9", display: "flex", alignItems: "center", gap: 7, paddingLeft: 13 }}>
        {[0, 1, 2].map((i) => (
          <span key={"td" + i} style={{ width: 11, height: 11, borderRadius: 6,
            background: "#B0A794" }} />))}
        <span style={{ marginLeft: 12, fontFamily: MONO, fontWeight: 800, fontSize: 15,
          color: "#7C7365", letterSpacing: "0.06em" }}>claude code</span>
      </div>
      {/* the command */}
      <div style={{ position: "absolute", left: 16, top: 50, right: 16,
        fontFamily: MONO, fontWeight: 800, fontSize: 23, color: "#241F17",
        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>
        <span style={{ color: CLAY }}>&gt; </span>{line.slice(0, n)}
        {typed < 1 && (f % 18 < 9) && <span style={{ color: CLAY }}>&#9608;</span>}
      </div>
      {/* ⛔⛔ FIVE ROWS OF `technical  ok` IS FIVE MORE STRINGS. The agents are
          reporting back IN PARALLEL, and a bar that fills is a picture of that
          while a word `ok` is a caption for it ([[feedback_graphical_over_textual]]:
          "a percentage -> a segmented bar fills"). Each row is now the domain's
          own icon plus a bar that runs at its own rate and lands a tick, so the
          box shows fifteen agents working instead of listing five. */}
      {DOMAINS.map((d, i) => {
        const on = Math.max(0, Math.min(1, done * 3.2 - i * 0.28));
        if (on <= 0.02) return null;
        const fill = Math.max(0, Math.min(1, on * (1.25 - i * 0.06)));
        return (
          <div key={"tr" + i} style={{ position: "absolute", left: 20, top: 92 + i * 34,
            right: 18, display: "flex", alignItems: "center", gap: 11,
            opacity: Math.min(1, on * 2.4),
            transform: `translateX(${(1 - Math.min(1, on * 2)) * 20}px)` }}>
            <span style={{ flexShrink: 0, display: "flex", width: 24, height: 24,
              alignItems: "center", justifyContent: "center" }}>
              <DomainIcon k={d.key} s={0.30} c={d.c} on={1} />
            </span>
            {/* the segmented bar: 14 cells, filling left to right */}
            <span style={{ flex: 1, display: "flex", gap: 3, minWidth: 0 }}>
              {Array.from({ length: 14 }, (_, k) => (
                <span key={"sg" + k} style={{ flex: 1, height: 13, borderRadius: 2,
                  background: k / 14 < fill ? d.c : "#DED7C6" }} />))}
            </span>
            {/* the tick lands only when that agent's bar is full */}
            <span style={{ flexShrink: 0, width: 20, height: 20, borderRadius: 10,
              background: fill >= 0.98 ? GREEN : "#DED7C6",
              display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width={12} height={12} viewBox="0 0 12 12">
                <path d="M 2.5 6.2 L 5 8.6 L 9.5 3.4" stroke={fill >= 0.98 ? "#FFF" : "#C3BBA8"}
                  strokeWidth={2.4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        );
      })}
    </div>
  );
};

/* =========================================================================
   THE DOMAIN ICONS — ⛔⛔ THE REEL'S ANSWER TO "LESS TEXT, MORE GRAPHICS"
   ([[feedback_graphical_over_textual]], STANDING).

   v1 said each of the five domains with a PLATE carrying three lines of type:
   `TECHNICAL` / `/seo technical` / `9 CATEGORIES`. Five of those is fifteen
   text elements, and they appeared in S1, S2, S3 and S6 — so most of this reel
   was rectangles with words in them. Type is READ; graphics are WATCHED, and on
   a muted feed a drawn gear still works while a caption does not.

   Each icon below is a nameable silhouette that IS the thing:
     TECHNICAL -> a gear, the machinery under the page
     CONTENT   -> a page of copy with a nib on it
     SCHEMA    -> a node graph, which is literally what structured data is
     GEO       -> an answer bubble with a citation mark
     LOCAL     -> a map pin over a grid
   ⛔ Drawn as one <svg> each with real paths, so they pass the silhouette test.
   ====================================================================== */
export const DomainIcon: React.FC<{ k: string; s?: number; c: string; on?: number }> =
  ({ k, s = 1, c, on = 1 }) => {
  const S = 72 * s, dk = dkh(c, 0.30);
  const P: Record<string, React.ReactNode> = {
    /* a gear: eight teeth, a hub, a bite out of the middle */
    technical: (<g>
      {Array.from({ length: 8 }, (_, i) => (
        <rect key={i} x={33} y={2} width={12} height={16} rx={2.5} fill={c}
          transform={`rotate(${i * 45} 39 39)`} />))}
      <circle cx={39} cy={39} r={25} fill={c} />
      <circle cx={39} cy={39} r={11} fill={dk} />
    </g>),
    /* a page of copy with a nib laid across it */
    content: (<g>
      <path d="M 12 8 H 54 L 66 21 V 70 H 12 Z" fill={c} />
      <path d="M 54 8 V 21 H 66 Z" fill={dk} />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={20} y={30 + i * 9} width={i === 3 ? 20 : 38} height={4.5}
          rx={2.2} fill={dk} opacity={0.75} />))}
      <path d="M 50 62 L 62 44 L 68 48 L 56 66 Z" fill={dk} />
      <path d="M 50 62 L 56 66 L 49 69 Z" fill={c} />
    </g>),
    /* a node graph — four nodes and the edges between them */
    schema: (<g>
      <path d="M 39 16 L 16 46 M 39 16 L 62 46 M 16 46 L 62 46" stroke={c}
        strokeWidth={6} fill="none" strokeLinecap="round" />
      <circle cx={39} cy={16} r={11} fill={c} />
      <circle cx={16} cy={50} r={10} fill={c} />
      <circle cx={62} cy={50} r={10} fill={c} />
      <circle cx={39} cy={16} r={4.5} fill={dk} />
    </g>),
    /* an answer bubble carrying a citation mark */
    geo: (<g>
      <path d="M 10 16 H 68 V 52 H 34 L 20 66 V 52 H 10 Z" fill={c} />
      <rect x={20} y={26} width={38} height={5} rx={2.5} fill={dk} opacity={0.8} />
      <rect x={20} y={36} width={26} height={5} rx={2.5} fill={dk} opacity={0.8} />
      <path d="M 52 34 l 3.4 7 7.6 0.8 -5.7 5.2 1.6 7.5 -6.9 -3.8 -6.9 3.8 1.6 -7.5
               -5.7 -5.2 7.6 -0.8 Z" fill={dk} transform="translate(6 -2) scale(0.62)" />
    </g>),
    /* a map pin standing on a street grid */
    local: (<g>
      <path d="M 6 58 H 72 M 6 68 H 72 M 22 50 V 72 M 56 50 V 72" stroke={dk}
        strokeWidth={4} opacity={0.55} strokeLinecap="round" />
      <path d="M 39 70 C 39 52, 58 44, 58 28 A 19 19 0 1 0 20 28 C 20 44, 39 52, 39 70 Z"
        fill={c} />
      <circle cx={39} cy={28} r={7.5} fill={dk} />
    </g>),
  };
  return (
    <svg width={S} height={S} viewBox="0 0 78 78"
      style={{ display: "block", opacity: 0.25 + on * 0.75,
        transform: `scale(${0.86 + on * 0.14})`, transformOrigin: "50% 50%" }}>
      {P[k] ?? P.technical}
    </svg>
  );
};

/* =========================================================================
   THE DOMAIN PLATE — one of the five things the VO names, struck as a plate.
   ====================================================================== */
export const DomainPlate: React.FC<{ x: number; y: number; d: Domain; s?: number; z?: number;
  seat?: number; f?: number }> =
  ({ x, y, d, s = 1, z = 70, seat = 1, f = 0 }) => {
  const dr = drift(f, x * 0.02, 0.8);
  return (
    /* ⛔ ONE TEXT ELEMENT, NOT THREE. The `/seo <name>` command line and the
       `9 CATEGORIES` note were the second and third strings on a plate that
       appears five times in the reel; both are now carried by the ICON and by
       the colour, which the reel uses consistently enough to be a language. */
    <div style={{ position: "absolute", left: x, top: y - (1 - seat) * 62 * s, zIndex: z,
      opacity: Math.min(1, seat * 2.2),
      transform: `translate(${dr.x}px, ${dr.y}px) scale(${0.9 + seat * 0.1})`,
      transformOrigin: "50% 100%",
      display: "flex", flexDirection: "column", alignItems: "center", gap: 6 * s }}>
      {/* the medallion: a solid disc the icon sits on, so it reads at thumb size */}
      <div style={{ width: 108 * s, height: 108 * s, borderRadius: 54 * s,
        background: CARDL, border: `${5 * s}px solid ${d.c}`, boxShadow: SH_D,
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        <DomainIcon k={d.key} s={s * 0.86} c={d.c} on={seat} />
      </div>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 25 * s,
        color: "#241F17", letterSpacing: "0.01em", whiteSpace: "nowrap",
        textShadow: "0 2px 6px rgba(0,0,0,0.30)" }}>{d.label}</div>
    </div>
  );
};

/* =========================================================================
   S2's TWO OBJECTS — GEO and LOCAL are genuinely different surfaces from the
   rest of SEO, so the board gives them their own set rather than showing the
   rack a second time at another size (the CALLBACK S1=S2 failure).
   ====================================================================== */

/** GEO / AEO: an AI answer that CITES your page. That is literally what the
    `seo-geo` skill scores ("question-based citability"). */
export const AnswerCard: React.FC<{ x: number; y: number; w: number; z?: number; f?: number;
  typed?: number; cite?: number }> =
  ({ x, y, w, z = 60, f = 0, typed = 1, cite = 0 }) => {
  const lines = [92, 78, 86, 54];
  const dr = drift(f, 5.4, 0.9);
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, zIndex: z,
      transform: `translate(${dr.x}px, ${dr.y}px)`,
      background: CARDL, borderRadius: 14, border: `4px solid ${CARDD}`,
      padding: "18px 20px 20px", boxShadow: SH_D, overflow: "hidden" }}>
      <Sheen f={f} phase={2} z={3} o={0.045} />
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <span style={{ width: 26, height: 26, borderRadius: 7, background: GREEN }} />
        <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 17, color: "#6E6558",
          letterSpacing: "0.10em" }}>AI ANSWER</span>
      </div>
      {lines.map((L, i) => {
        const on = Math.max(0, Math.min(1, typed * lines.length - i));
        return (
          <div key={"al" + i} style={{ height: 13, borderRadius: 6, marginBottom: 11,
            width: `${L * on}%`, background: "#C6BFB1" }} />
        );
      })}
      {/* the citation — the whole point of the object */}
      <div style={{ display: "flex", alignItems: "center", gap: 9, marginTop: 16,
        opacity: cite, transform: `translateY(${(1 - cite) * 12}px)` }}>
        <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 16, color: GREEN }}>[1]</span>
        <span style={{ fontFamily: MONO, fontWeight: 800, fontSize: 18, color: "#241F17",
          borderBottom: `3px solid ${GREEN}`, paddingBottom: 2, whiteSpace: "nowrap",
          overflow: "hidden", textOverflow: "ellipsis", minWidth: 0 }}>{REPO.site}</span>
      </div>
    </div>
  );
};

/** LOCAL: the map pack. A map card with a real dropped pin that ROCKS on
    landing — nothing in this reel lands and stops. */
export const MapCard: React.FC<{ x: number; y: number; w: number; h: number; z?: number;
  f?: number; drop?: number }> =
  ({ x, y, w, h, z = 60, f = 0, drop = 1 }) => {
  /* a damped oscillation, so the pin never quite settles */
  const lf = Math.max(0, drop * 40 - 12);
  const rock = drop > 0.3 ? Math.sin(lf / 3.1) * Math.exp(-lf / 26) * 13 : 0;
  const fall = (1 - Math.min(1, drop * 1.6)) * -130;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
      background: "#E9E2D2", borderRadius: 14, border: `4px solid ${CARDD}`,
      boxShadow: SH_D, overflow: "hidden" }}>
      {/* the streets */}
      {[0.22, 0.52, 0.78].map((k, i) => (
        <div key={"hz" + i} style={{ position: "absolute", left: 0, right: 0, top: h * k,
          height: i === 1 ? 13 : 8, background: "#DAD2C0" }} />))}
      {[0.28, 0.63].map((k, i) => (
        <div key={"vt" + i} style={{ position: "absolute", top: 0, bottom: 0, left: w * k,
          width: i === 0 ? 13 : 8, background: "#DAD2C0" }} />))}
      {/* two blocks, so it reads as a town not a grid */}
      <div style={{ position: "absolute", left: w * 0.34, top: h * 0.58, width: w * 0.24,
        height: h * 0.16, background: "#D2CAB6", borderRadius: 3 }} />
      <div style={{ position: "absolute", left: w * 0.70, top: h * 0.28, width: w * 0.18,
        height: h * 0.20, background: "#D2CAB6", borderRadius: 3 }} />
      {/* THE PIN */}
      <div style={{ position: "absolute", left: w * 0.44, top: h * 0.20 + fall, zIndex: 20,
        transform: `rotate(${rock}deg)`, transformOrigin: "50% 100%" }}>
        <svg width={54} height={70} viewBox="0 0 54 70">
          <path d="M 27 68 C 27 50 48 42 48 25 A 21 21 0 1 0 6 25 C 6 42 27 50 27 68 Z"
            fill={RED} stroke={dkh(RED, 0.34)} strokeWidth={3} />
          <circle cx={27} cy={25} r={8.5} fill={CARDL} />
        </svg>
      </div>
      <Sheen f={f} phase={7} z={30} o={0.045} />
      {/* the map-pack rows under it, each with a REVIEW RATING — reviews are one
          of the real signals `/seo local` scores (GBP, citations, reviews, map
          pack), so the stars are information rather than decoration. */}
      <div style={{ position: "absolute", left: 14, right: 14, bottom: 12, display: "flex",
        flexDirection: "column", gap: 7, opacity: Math.max(0, drop * 1.4 - 0.4) }}>
        {[0, 1].map((i) => (
          <div key={"mp" + i} style={{ height: 26, borderRadius: 5, background: CARDL,
            border: `2px solid ${CARDD}`, display: "flex", alignItems: "center",
            paddingLeft: 8, paddingRight: 8, gap: 7 }}>
            <span style={{ width: 8, height: 8, borderRadius: 4, background: RED,
              flexShrink: 0 }} />
            <span style={{ height: 6, width: `${44 - i * 12}%`, background: "#C6BFB1",
              borderRadius: 3 }} />
            <span style={{ marginLeft: "auto", display: "flex", gap: 1.5, flexShrink: 0 }}>
              {[0, 1, 2, 3, 4].map((k) => (
                <span key={"sr" + k} style={{ fontSize: 11, lineHeight: 1,
                  color: k < 4 - i ? GOLD : "#CFC6B3" }}>&#9733;</span>))}
            </span>
          </div>))}
      </div>
    </div>
  );
};

/* =========================================================================
   THE EDITOR — where a generated fix actually lands.
   ⛔⛔ SCOPE GUARD, AND IT IS STRICTER THAN THIS BUILD FIRST DREW IT. The VO
      says "even fixes your own website for you". The FACE reel 14 factory log
      (memory/reels/seo-factory-log.md, Stage 3) already ran this claim to
      ground and its verdict is not "partly" — it is **FAILS**: there is no
      auto-fix anywhere in the repo, its README calls it an analysis plugin
      whose primary deliverable is markdown reports, and content WRITING lives
      in a separate companion repo (`claude-blog`). That log's ruling is the
      one to obey: *"a page reading 'analysis plugin' under a VO saying 'it
      fixes your website' would disprove the line in the frame that speaks
      it"*, so the picture must assert NO auto-edit mechanism.
      v1 of this prop drew the block typing itself into `index.html`, i.e. into
      the user's own site, which is exactly the mechanism that does not exist.
      It is now the tool's GENERATED OUTPUT — `schema.jsonld`, marked
      GENERATED — which is fully true (`/seo schema` is documented as "detect,
      validate, and generate"), and the applying is left to the human.
      ⛔ The recorded line stays as recorded ([[recording-beats-script]]); it is
      the PICTURE that stops at the edge of the claim, not the VO.
   ====================================================================== */
export const EditorPane: React.FC<{ x: number; y: number; w: number; h: number; z?: number;
  typed?: number; f?: number }> =
  ({ x, y, w, h, z = 60, typed = 1, f = 0 }) => {
  const CODE = [
    ['{', "#6E6558"],
    ['  "@context": "https://schema.org",', "#4A443A"],
    ['  "@type": "Product",', GOLD],
    ['  "name": "Example",', "#4A443A"],
    ['  "offers": { "@type": "Offer" }', "#4A443A"],
    ['}', "#6E6558"],
  ] as [string, string][];
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
      background: "#F5F0E4", border: `4px solid ${CARDD}`, borderRadius: 11,
      boxShadow: SH_D, overflow: "hidden" }}>
      <Sheen f={f} phase={4} z={30} o={0.045} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 32,
        background: "#E2DBCA", display: "flex", alignItems: "center", paddingLeft: 12, gap: 9 }}>
        <span style={{ width: 13, height: 15, background: "#B9AE95", borderRadius: 2 }} />
        <span style={{ fontFamily: MONO, fontWeight: 800, fontSize: 15, color: "#7C7365" }}>
          schema.jsonld</span>
        <span style={{ marginLeft: "auto", marginRight: 12, fontFamily: MONO, fontWeight: 900,
          fontSize: 13, color: GOLD, letterSpacing: "0.08em" }}>GENERATED</span>
      </div>
      {CODE.map(([t, c], i) => {
        const on = Math.max(0, Math.min(1, typed * CODE.length - i));
        if (on <= 0.02) return null;
        const n = Math.round(t.length * on);
        return (
          <div key={"cd" + i} style={{ position: "absolute", left: 14, top: 44 + i * 27,
            right: 12, fontFamily: MONO, fontWeight: 800, fontSize: 17, color: c,
            whiteSpace: "nowrap", overflow: "hidden" }}>
            <span style={{ color: "#B0A794", marginRight: 10 }}>{i + 1}</span>{t.slice(0, n)}
          </div>
        );
      })}
    </div>
  );
};

/* =========================================================================
   THE GUIDE — Google's own published guidance, as a printed reference on the
   bench. ⛔ The VO says the agents are "trained around" it; nothing is
   trained, so the picture says GROUNDED: a document that is read from and a
   plate that is struck from it. No brain, no dataset, no training montage.
   ====================================================================== */
export const GuideBook: React.FC<{ x: number; y: number; w: number; z?: number; f?: number;
  read?: number }> = ({ x, y, w, z = 50, f = 0, read = 0 }) => {
  const h = w * 0.62;
  const dr = drift(f, 3.1, 0.9);
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
      transform: `translate(${dr.x}px, ${dr.y}px)` }}>
      {/* the open spread: two leaves with a gutter, tilted in perspective */}
      <div style={{ position: "absolute", inset: 0, background: CARDL, borderRadius: 6,
        border: `3px solid ${CARDD}`, boxShadow: SH_D,
        clipPath: "polygon(2% 6%, 98% 0%, 100% 96%, 0% 100%)" }} />
      <div style={{ position: "absolute", left: "49.4%", top: "3%", bottom: "3%", width: 4,
        background: "#CFC5AE" }} />
      {/* the head: the real document name and where it comes from */}
      <div style={{ position: "absolute", left: "6%", top: "10%", right: "54%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 7 }}>
          <span style={{ width: 24, height: 24, borderRadius: 6, background: "#FFFFFF",
            border: `2px solid ${CARDD}`, display: "flex", alignItems: "center",
            justifyContent: "center" }}>
            <Img src={staticFile("logos/google.svg")}
              style={{ width: 16, height: 16, objectFit: "contain" }} /></span>
          <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 12, color: "#8A8175",
            letterSpacing: "0.06em", whiteSpace: "nowrap", overflow: "hidden",
            textOverflow: "ellipsis", minWidth: 0 }}>{REPO.guideSrc}</span>
        </div>
        {/* ⛔ 160px inner and `AI OPTIMIZATION GUIDE` sets to THREE lines at 19px,
            which ran to y118 while the first body rule starts at 44% = y109. The
            title overlapped its own page. 16px keeps it inside its band and the
            rules start lower. */}
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 16,
          color: "#241F17", lineHeight: 1.10 }}>{REPO.guide}</div>
      </div>
      {/* body rules on the left leaf, the one being READ highlighted */}
      {[0, 1, 2, 3].map((i) => {
        const hot = read > 0 && Math.floor(read * 4) === i;
        return (
          <div key={"gl" + i} style={{ position: "absolute", left: "6%", right: "54%",
            top: `${54 + i * 10}%`, height: "5%", borderRadius: 3,
            background: hot ? GOLD : "#D6CEBB" }} />);
      })}
      {/* right leaf */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={"gr" + i} style={{ position: "absolute", left: "53%", right: "6%",
          top: `${16 + i * 12}%`, height: "5%", borderRadius: 3, background: "#D6CEBB",
          width: undefined }} />))}
      <Sheen f={f} phase={5} z={9} o={0.04} />
    </div>
  );
};

/** the press that strikes a plate from a line of the guide. */
export const Press: React.FC<{ x: number; y: number; s?: number; z?: number; drop?: number }> =
  ({ x, y, s = 1, z = 56, drop = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
    <svg width={128 * s} height={190 * s} viewBox={`0 0 ${128 * s} ${190 * s}`}>
      {/* the frame */}
      <path d={`M ${14 * s} ${186 * s} V ${26 * s} H ${114 * s} V ${186 * s}`}
        fill="none" stroke={BRASSD} strokeWidth={11 * s} strokeLinecap="round" />
      <rect x={6 * s} y={12 * s} width={116 * s} height={20 * s} rx={5 * s} fill={BRASS} />
      {/* the ram, which is what moves */}
      <rect x={44 * s} y={(34 + drop * 62) * s} width={40 * s} height={54 * s} rx={4 * s}
        fill={BRASSL} stroke={BRASSD} strokeWidth={3 * s} />
      <rect x={30 * s} y={(84 + drop * 62) * s} width={68 * s} height={16 * s} rx={3 * s}
        fill={BRASSD} />
      {/* the anvil */}
      <rect x={22 * s} y={150 * s} width={84 * s} height={18 * s} rx={3 * s} fill={STEELD} />
    </svg>
  </div>
);

/* =========================================================================
   THE STATION — one lamp, one Mascot, one real filename. Eighteen of these is
   the picture of "18 SEO agents", and it is the only scene in the reel where
   more than one sprite is on screen.
   ====================================================================== */
export const Station: React.FC<{ x: number; base: number; name: string; on: number;
  s?: number; z?: number; f?: number; seed?: number }> =
  ({ x, base, name, on, s = 1, z = 60, f = 0, seed = 0 }) => {
  const SZ = 132 * s;
  /* every agent badges to the domain it belongs to, so eighteen stations still
     group into the five things the VO actually names */
  const badgeKey = AGENT_DOMAIN[name] ?? "technical";
  const badge = (DOMAINS.find((d) => d.key === badgeKey) ?? DOMAINS[0]).c;
  return (<>
    <Lampless x={x} y={base - 232 * s} on={on} s={s} f={f} />
    <Contact x={x - SZ * 0.36} y={base - 6 * s} w={SZ * 0.72} z={z - 2}
      o={0.16 + on * 0.22} />
    <div style={{ position: "absolute", left: x - SZ / 2, top: base - SZ, zIndex: z,
      opacity: 0.30 + on * 0.70 }}>
      {/* ⛔ EACH STATION WEARS ITS OWN AGENT'S JOB. Eighteen sprites in one
          costume is a texture; eighteen different ones is a roster you can
          actually read at a glance. */}
      <Mascot lf={f + seed * 13} size={SZ} gaze={0.4}
        nodAmp={2.4 + on * 1.2} nodSpeed={11 + (seed % 4)}
        {...(AGENT_COSTUME[name] ?? { glasses: 1 })} />
    </div>
    {/* ⛔⛔ EIGHTEEN LITTLE TEXT BOXES IS EIGHTEEN TEXT BOXES. v1 framed every
        name in a bordered cream card, which is exactly the "rectangles with
        words in them" this reel was pulled up on
        ([[feedback_graphical_over_textual]]). The BADGE now carries the read —
        a domain-coloured disc with the agent's own icon on it — and the
        filename survives as bare lit type under it, because the real filenames
        are the receipt and cannot be dropped. Box gone, receipt kept. */}
    <div style={{ position: "absolute", left: x - 26 * s, top: base - 236 * s,
      width: 52 * s, height: 52 * s, borderRadius: 26 * s, zIndex: z + 4, opacity: on,
      background: CARDL, border: `${3 * s}px solid ${badge}`, boxShadow: SH,
      display: "flex", alignItems: "center", justifyContent: "center" }}>
      <DomainIcon k={badgeKey} s={s * 0.44} c={badge} on={on} />
    </div>
    <div style={{ position: "absolute", left: x - 84 * s, top: base - 176 * s, width: 168 * s,
      zIndex: z + 4, opacity: on, textAlign: "center" }}>
      <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 15 * s, color: "#F2EADA",
        textShadow: "0 2px 6px rgba(0,0,0,0.75)",
        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", minWidth: 0,
        display: "block" }}>{shortAgent(name)}</span>
    </div>
  </>);
};

/** a station's lamp — smaller than the world Lamp and without the housing, so
    eighteen of them do not turn the frame into a chandelier. */
const Lampless: React.FC<{ x: number; y: number; on: number; s?: number; f?: number }> =
  ({ x, y, on, s = 1, f = 0 }) => (<>
    <div style={{ position: "absolute", left: x - 18 * s, top: y, width: 36 * s, height: 15 * s,
      borderRadius: `${3 * s}px ${3 * s}px ${13 * s}px ${13 * s}px`,
      background: on > 0.05 ? "#4A525C" : "#343A42", zIndex: 40, boxShadow: SH }} />
    <div style={{ position: "absolute", left: x - 12 * s, top: y + 13 * s, width: 24 * s,
      height: 5 * s, borderRadius: `0 0 ${10 * s}px ${10 * s}px`,
      background: on > 0.05 ? LAMPC : "#3A3F46",
      opacity: on > 0.05 ? 0.45 + on * 0.55 : 1, zIndex: 41 }} />
    {/* ⛔ THE CONE IS THE ONLY THING 18 STATIONS CAN CONTRIBUTE TO THE FRAME, and
        at 148x232*0.64 = 94x148 = 14,000px² it was a third of the ~40,000px²
        floor a mover has to clear — eighteen events the metric literally cannot
        see. Widened to 214x300 (137x192 at s=0.64 = 26,300px²) and brightened,
        which is also the better picture: the lamps now visibly pool on the
        floor between the stations instead of being eighteen thin slivers. */}
    {on > 0.05 && (
      <div style={{ position: "absolute", left: x - 107 * s, top: y + 18 * s, width: 214 * s,
        height: 300 * s, zIndex: 30, pointerEvents: "none",
        clipPath: "polygon(38% 0%, 62% 0%, 100% 100%, 0% 100%)",
        background: `linear-gradient(180deg, ${hexa(LAMPC, 0.42 * on)} 0%, ${hexa(LAMPC, 0)} 100%)` }} />)}
  </>);

/* =========================================================================
   THE CLOCK — the villain's instrument. The VO's "spending hours" is the only
   thing it says, and it says it without a word of narration.
   ====================================================================== */
export const WallClock: React.FC<{ x: number; y: number; s?: number; z?: number;
  spin?: number }> = ({ x, y, s = 1, z = 40, spin = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
    <svg width={110 * s} height={110 * s} viewBox="0 0 110 110">
      <circle cx={55} cy={55} r={50} fill="#E6DFCE" stroke={dkh(STEELD, 0.2)} strokeWidth={6} />
      {Array.from({ length: 12 }, (_, i) => (
        <rect key={"tk" + i} x={53.5} y={10} width={3} height={i % 3 === 0 ? 11 : 6}
          rx={1.5} fill="#8A8175" transform={`rotate(${i * 30} 55 55)`} />))}
      {/* the hour hand crawls, the minute hand races — that IS "hours" */}
      <path d="M 55 55 L 55 30" stroke="#241F17" strokeWidth={6} strokeLinecap="round"
        transform={`rotate(${spin * 220} 55 55)`} />
      <path d="M 55 55 L 55 18" stroke="#4A443A" strokeWidth={4} strokeLinecap="round"
        transform={`rotate(${spin * 2640} 55 55)`} />
      <circle cx={55} cy={55} r={5} fill="#241F17" />
    </svg>
  </div>
);

/* =========================================================================
   THE AUDITOR — the clay Claude Mascot, costumed for this world.
   ⛔ HE IS IN EVERY SCENE ([[feedback_real_marks_are_the_props]]: reel 99 v3
      shipped a reel of objects with nobody in it and was noted for it). He is
      the SCALE REFERENCE, the thing that REACTS, and the reason a frame is a
      scene rather than a diagram.
   ====================================================================== */
export const Auditor: React.FC<{ x: number; base: number; s?: number; z?: number; f: number;
  cheer?: number; shock?: number; stern?: number; gaze?: number; carry?: number;
  reach?: number; slump?: number; costume?: Costume }> =
  ({ x, base, s = 1, z = 70, f, cheer = 0, shock = 0, stern = 0, gaze = 0,
     carry = 0, reach = 0, slump = 0, costume }) => {
  const SZ = 240 * s;
  return (<>
    <Contact x={x - SZ * 0.34} y={base - 8 * s} w={SZ * 0.68} z={z - 2} o={0.38} />
    <div style={{ position: "absolute", left: x - SZ / 2, top: base - SZ + slump * 16 * s,
      zIndex: z, transform: slump ? `rotate(${slump * 4}deg)` : undefined,
      transformOrigin: "50% 100%" }}>
      {/* the costume is spread LAST so a scene can override any lever */}
      <Mascot lf={f} size={SZ} gaze={gaze} cheer={cheer} shock={shock}
        stern={stern} nodAmp={stern ? 1.6 : slump ? 1.2 : 3.0} nodSpeed={11}
        {...(costume ?? { glasses: 1 })} />
    </div>
    {/* ⛔ PROXIMITY IS NOT CONNECTION — when he holds or points at something the
        arm gets DRAWN, or the object reads as floating beside him. */}
    {(carry > 0 || reach > 0) && (
      <div style={{ position: "absolute", left: x + SZ * 0.28,
        top: base - SZ * (reach ? 0.70 : 0.58),
        width: SZ * (reach ? 0.42 : 0.30), height: SZ * 0.10, borderRadius: SZ * 0.05,
        background: "#D97757", zIndex: z + 1, boxShadow: SH,
        transform: reach ? `rotate(${-16 * reach}deg)` : undefined,
        transformOrigin: "0% 50%" }} />
    )}
  </>);
};

/* =========================================================================
   THE COUNT PLATE — a number that arrives on its own beat. Used for the two
   figures the VO actually says out loud.
   ====================================================================== */
export const CountPlate: React.FC<{ x: number; y: number; n: string; t: string; s?: number;
  z?: number; k?: number; c?: string }> =
  ({ x, y, n, t, s = 1, z = 90, k = 1, c = BRASSL }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z, opacity: Math.min(1, k * 2),
    transform: `scale(${0.86 + k * 0.14})`, transformOrigin: "0% 50%",
    display: "flex", alignItems: "baseline", gap: 12 * s, background: INK,
    borderRadius: 12 * s, padding: `${9 * s}px ${19 * s}px`, boxShadow: SH_D }}>
    <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 54 * s,
      color: c, lineHeight: 1 }}>{n}</span>
    <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 19 * s, color: "#E6DFCE",
      letterSpacing: "0.10em", whiteSpace: "nowrap" }}>{t}</span>
  </div>
);

/** a small mono chip for a real badge figure (410 tests, 15 in parallel). */
export const FactChip: React.FC<{ x: number; y: number; t: string; s?: number; z?: number;
  c?: string; k?: number }> = ({ x, y, t, s = 1, z = 88, c = CARD, k = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z, opacity: k,
    background: c, border: `${2 * s}px solid ${CARDD}`, borderRadius: 7 * s,
    padding: `${5 * s}px ${12 * s}px`, boxShadow: SH }}>
    <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 17 * s, color: "#241F17",
      letterSpacing: "0.06em", whiteSpace: "nowrap" }}>{t}</span>
  </div>
);

/* the travelling audit band. ⛔ A SHAPED band, never a full-frame tint. */
export const SweepBar: React.FC<{ x: number; y: number; h: number; z?: number; c?: string;
  o?: number }> = ({ x, y, h, z = 78, c = LAMPC, o = 1 }) => (<>
    <div style={{ position: "absolute", left: x, top: y, width: 5, height: h,
      background: c, opacity: 0.92 * o, zIndex: z }} />
    <div style={{ position: "absolute", left: x - 96, top: y, width: 96, height: h,
      zIndex: z - 1, opacity: o,
      background: `linear-gradient(90deg, ${hexa(c, 0)} 0%, ${hexa(c, 0.26)} 100%)` }} />
  </>);

/* =========================================================================
   THE VILLAIN'S BENCH PROPS. S7 is one person working by hand at night, and a
   dark rack plus a clock states that without ever showing the WORK. A mug and
   a magnifier are what that desk actually has on it, and both are SHAPES, so
   both are single SVGs that pass the silhouette test.
   ====================================================================== */
export const Mug: React.FC<{ x: number; y: number; s?: number; z?: number; f?: number }> =
  ({ x, y, s = 1, z = 60, f = 0 }) => {
  /* the steam is the only thing that moves, and it is a ceiling'd idle */
  const st = (k: number) => 0.16 + Math.sin(f / 23 + k * 2.1) * 0.06;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
      <svg width={70 * s} height={92 * s} viewBox="0 0 70 92">
        {[0, 1, 2].map((k) => (
          <path key={"sm" + k} d={`M ${22 + k * 12} 30 C ${18 + k * 12} 20, ${28 + k * 12} 16, ${23 + k * 12} 6`}
            stroke="#E8E0CE" strokeWidth={3} fill="none" strokeLinecap="round"
            opacity={st(k)} />))}
        <path d="M 14 40 H 52 L 48 84 H 18 Z" fill="#E4DED1" stroke="#A9A196" strokeWidth={3} />
        <path d="M 52 48 C 66 48, 66 68, 52 68" stroke="#A9A196" strokeWidth={5} fill="none" />
        <rect x={16} y={44} width={34} height={5} fill="#CFC6B3" />
      </svg>
    </div>
  );
};

export const Magnifier: React.FC<{ x: number; y: number; s?: number; z?: number; rot?: number }> =
  ({ x, y, s = 1, z = 60, rot = -24 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    transform: `rotate(${rot}deg)` }}>
    <svg width={104 * s} height={104 * s} viewBox="0 0 104 104">
      <line x1={62} y1={62} x2={96} y2={96} stroke="#6E4A30" strokeWidth={11}
        strokeLinecap="round" />
      <circle cx={42} cy={42} r={30} fill="#DCE6EC" opacity={0.55} />
      <circle cx={42} cy={42} r={30} fill="none" stroke={BRASSD} strokeWidth={8} />
      <path d="M 28 30 A 22 22 0 0 1 46 22" stroke="#FFFFFF" strokeWidth={5} fill="none"
        opacity={0.5} strokeLinecap="round" />
    </svg>
  </div>
);

/* =========================================================================
   THE FLAG TRAY — a crate of pennants waiting to be pinned. On-topic (these
   are the findings before they land on a page), pure graphic, and it gives the
   hook's foreground something to be made of.
   ====================================================================== */
export const FlagTray: React.FC<{ x: number; y: number; s?: number; z?: number; f?: number }> =
  ({ x, y, s = 1, z = 60, f = 0 }) => {
  const N = 7;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
      {/* the pennants, each on its own stick, each swaying at its own phase */}
      {Array.from({ length: N }, (_, i) => {
        const c = DOMAINS[i % 5].c;
        const hx = 16 + i * 26, hy = -62 - (i % 3) * 14;
        return (
          <div key={"ft" + i} style={{ position: "absolute", left: hx * s, top: hy * s,
            transform: `rotate(${sway(f, i * 1.9) * 0.8 - 4 + i * 1.4}deg)`,
            transformOrigin: "50% 100%" }}>
            <svg width={30 * s} height={92 * s} viewBox="0 0 30 92">
              <line x1={6} y1={12} x2={6} y2={90} stroke="#8A7B63" strokeWidth={4} />
              <path d="M 6 6 H 28 L 21 17 L 28 28 H 6 Z" fill={c}
                stroke={dkh(c, 0.32)} strokeWidth={2} />
            </svg>
          </div>);
      })}
      {/* the crate they stand in */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 206 * s, height: 60 * s,
        background: OAK, borderRadius: 5 * s, border: `${3 * s}px solid ${OAKD}`,
        boxShadow: SH }} />
      <div style={{ position: "absolute", left: 0, top: 0, width: 206 * s, height: 13 * s,
        background: mxh(OAK, 0.22), borderRadius: `${5 * s}px ${5 * s}px 0 0` }} />
      {[0, 1, 2].map((i) => (
        <div key={"sl" + i} style={{ position: "absolute", left: (16 + i * 62) * s,
          top: 22 * s, width: 44 * s, height: 6 * s, borderRadius: 3 * s,
          background: dkh(OAK, 0.34) }} />))}
    </div>
  );
};

/* =========================================================================
   THE SITE PAGE — the hero-scale web page.

   ⛔⛔ WHY THIS EXISTS AND `PageSheet` DOES NOT DO IT. `PageSheet` was authored
      for the RACK, where a page is ~180px wide and six blocks is exactly the
      right amount of information. The hook blows one up to 760px, and at that
      size the same six blocks are not a web page — they are six big empty
      rectangles. Alex: *"the screens at the beginning need to be more
      interesting and not so plain."* Detail has to scale with the object; a
      thumbnail prop enlarged is a thumbnail, enlarged.

   ⭐ AND IT IS WHERE THE SPRITES LIVE. *"moreso claude sprite there as well"* —
      the site's own hero illustration is a Claude, its team row is three more,
      and its logo is the Claude mark. That is four more sprites in the frame
      without adding a single object that is not part of the page.

   Designed at 760x560 and scaled by `u`, so it holds up both as the hook's
   hero and at 2.4x inside the magnifier.
   ====================================================================== */
export const SitePage: React.FC<{ x: number; y: number; w: number; h: number; z?: number;
  f?: number; lit?: number; dim?: number; label?: string; fixed?: boolean }> =
  ({ x, y, w, h, z = 40, f = 0, lit = 1, dim = 0, label, fixed = false }) => {
  const u = w / 760;                       /* everything below is design units */
  const D = (c: string) => {
    const k = dim + (1 - lit) * 0.5;
    return k > 0 ? dkh(c, Math.min(0.86, k)) : c;
  };
  const dr = drift(f, 2.4, 0.8);
  const INKD = D("#2E2A24"), TXT = D("#CFC7B8"), TXTD = D("#A79E8D");
  const PAPER2 = D("#FBF9F4"), SOFT = D("#EFEADD");
  const row = (k: string, l: number, tp: number, wd: number, ht = 7, c = TXT) => (
    <div key={k} style={{ position: "absolute", left: l * u, top: tp * u, width: wd * u,
      height: ht * u, borderRadius: 4 * u, background: c }} />
  );
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
      background: PAPER2, border: `${3 * u}px solid ${D("#B9B0A0")}`,
      borderRadius: 10 * u, overflow: "hidden", boxShadow: SH }}>

      {/* ---- browser chrome: tabs, dots, a real URL pill with a padlock ---- */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 54 * u,
        background: D("#E4DED1"), zIndex: 6 }}>
        {[0, 1, 2].map((i) => (
          <span key={"cd" + i} style={{ position: "absolute", left: (18 + i * 20) * u,
            top: 22 * u, width: 11 * u, height: 11 * u, borderRadius: 6 * u,
            background: D(["#D08C7A", "#DCC084", "#93B79A"][i]) }} />))}
        <div style={{ position: "absolute", left: 92 * u, top: 10 * u, width: 150 * u,
          height: 34 * u, borderRadius: `${7 * u}px ${7 * u}px 0 0`, background: PAPER2 }} />
        <div style={{ position: "absolute", left: 258 * u, top: 13 * u, right: 20 * u,
          height: 28 * u, borderRadius: 14 * u, background: D("#F5F1E6"),
          border: `${2 * u}px solid ${D("#D2CABA")}`, display: "flex",
          alignItems: "center", paddingLeft: 12 * u, gap: 8 * u }}>
          <svg width={13 * u} height={13 * u} viewBox="0 0 13 13">
            <rect x={2.5} y={5.5} width={8} height={6.5} rx={1.4} fill={TXTD} />
            <path d="M 4.4 5.5 V 3.9 a 2.1 2.1 0 0 1 4.2 0 V 5.5" fill="none"
              stroke={TXTD} strokeWidth={1.5} />
          </svg>
          <span style={{ fontFamily: MONO, fontWeight: 800, fontSize: 14 * u,
            color: D("#7C7365") }}>{label ?? REPO.site}</span>
        </div>
      </div>

      {/* ---- the site's own nav: mark, wordmark, four links, a CTA ---- */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 54 * u, height: 52 * u,
        background: SOFT, borderBottom: `${2 * u}px solid ${D("#DED6C6")}`, zIndex: 5 }}>
        <div style={{ position: "absolute", left: 22 * u, top: 10 * u, width: 32 * u,
          height: 32 * u, borderRadius: 9 * u, background: "#FFF",
          border: `${1.6 * u}px solid #E8DCC0`, display: "flex", alignItems: "center",
          justifyContent: "center" }}>
          <Img src={staticFile("claude_logo.png")}
            style={{ width: 23 * u, height: 23 * u, objectFit: "contain" }} /></div>
        {row("nw", 62, 20, 62, 12, INKD)}
        {[0, 1, 2, 3].map((i) => row("nl" + i, 200 + i * 74, 23, 52, 7, TXTD))}
        <div style={{ position: "absolute", right: 22 * u, top: 12 * u, width: 96 * u,
          height: 28 * u, borderRadius: 14 * u, background: D(CLAY) }} />
      </div>

      {/* ---- hero: headline, subhead, two buttons, and an illustration that is
           a Claude in a panel ---- */}
      {row("h1a", 40, 142, 300, 22, INKD)}
      {row("h1b", 40, 176, 210, 22, INKD)}
      {row("sub", 40, 218, 260, 9, TXTD)}
      {row("su2", 40, 234, 190, 9, TXTD)}
      <div style={{ position: "absolute", left: 40 * u, top: 262 * u, width: 118 * u,
        height: 34 * u, borderRadius: 17 * u, background: D(CLAY), zIndex: 4 }} />
      <div style={{ position: "absolute", left: 172 * u, top: 262 * u, width: 104 * u,
        height: 34 * u, borderRadius: 17 * u, border: `${2.5 * u}px solid ${D("#C3BBAA")}`,
        zIndex: 4 }} />
      <div style={{ position: "absolute", left: 420 * u, top: 132 * u, width: 300 * u,
        height: 176 * u, borderRadius: 12 * u, background: D(mxh(SKY, 0.40)),
        border: `${2 * u}px solid ${D("#C9C1B1")}`, overflow: "hidden", zIndex: 4 }}>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 34 * u,
          background: D(mxh(SKY, 0.24)) }} />
        <div style={{ position: "absolute", left: 96 * u, bottom: 6 * u,
          transform: `translateY(${dr.y * 0.5}px)` }}>
          {/* the SITE's own illustration — deliberately not one of ours, so it
              reads as the customer's mascot rather than a second auditor */}
          <Mascot lf={f} size={112 * u} gaze={0.4} nodAmp={2.2} nodSpeed={13}
            {...SPRITE_COSTUME.sitePage} />
        </div>
      </div>

      {/* ---- three feature cards, each with an icon, a title and two lines ---- */}
      {[0, 1, 2].map((i) => (
        <div key={"fc" + i} style={{ position: "absolute", left: (40 + i * 232) * u,
          top: 330 * u, width: 208 * u, height: 116 * u, borderRadius: 10 * u,
          background: SOFT, border: `${2 * u}px solid ${D("#DED6C6")}`, zIndex: 4,
          transform: `translateY(${Math.sin(f / 44 + i * 1.3) * 1.6 * u}px)` }}>
          <div style={{ position: "absolute", left: 16 * u, top: 14 * u, width: 34 * u,
            height: 34 * u, borderRadius: 17 * u, background: D(mxh(DOMAINS[i].c, 0.30)),
            border: `${2.4 * u}px solid ${D(DOMAINS[i].c)}`, display: "flex",
            alignItems: "center", justifyContent: "center" }}>
            <DomainIcon k={DOMAINS[i].key} s={u * 0.26} c={D(DOMAINS[i].c)} on={1} /></div>
          {row("ft" + i, 16, 60, 122, 10, INKD)}
          {row("fa" + i, 16, 80, 168, 6, TXT)}
          {row("fb" + i, 16, 93, 130, 6, TXT)}
        </div>))}

      {/* ---- a stats strip, because a real landing page has one ---- */}
      {[0, 1, 2].map((i) => (
        <div key={"st" + i} style={{ position: "absolute", left: (54 + i * 226) * u,
          top: 466 * u, zIndex: 4, textAlign: "center", width: 150 * u }}>
          <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900,
            fontSize: 30 * u, color: fixed ? D(GREEN) : INKD, lineHeight: 1 }}>
            {["4.9", "12k", "99%"][i]}</div>
          <div style={{ margin: `${7 * u}px auto 0`, width: 78 * u, height: 6 * u,
            borderRadius: 3 * u, background: TXT }} />
        </div>))}

      {/* ---- footer: three columns of links ---- */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 62 * u,
        background: D("#E0D9CB"), zIndex: 5 }}>
        {[0, 1, 2].map((c) => (
          <React.Fragment key={"fo" + c}>
            {[0, 1, 2].map((r) => (
              <div key={"fl" + c + r} style={{ position: "absolute",
                left: (40 + c * 176) * u, top: (14 + r * 15) * u,
                width: (88 - r * 18) * u, height: 6 * u, borderRadius: 3 * u,
                background: D("#BDB4A3") }} />))}
          </React.Fragment>))}
      </div>
      <Sheen f={f} phase={3} z={8} o={lit > 0.5 ? 0.05 : 0.02} />
      {fixed && (
        <div style={{ position: "absolute", right: 0, top: 0, width: 0, height: 0,
          borderTop: `${64 * u}px solid ${D(GREEN)}`,
          borderLeft: `${64 * u}px solid transparent`, zIndex: 12 }} />)}
    </div>
  );
};

/* =========================================================================
   THE SERP CARD — ⛔⛔ THE OBJECT THAT MAKES THE OPENING SAY "SEO".

   Alex: *"too much scenes in the beginning dont have enough stuff that alludes
   to SEO."* He is right and the diagnosis is precise: a magnifier over a web
   page reads as INSPECTION, not as SEO. It could be a design review, an
   accessibility pass, a bug hunt. The subject was legible in the terminal
   (`/seo audit`) and on the score dial, and NOT in the frame that matters most.

   ⭐ A search-result snippet is the most instantly recognisable object in the
   whole subject: a query bar, a blue title, a green URL, two grey description
   lines. Nobody has to be told what they are looking at, and it is literally
   the thing SEO optimises — the repo's own `/seo page` audits exactly these
   fields. It also lets the reel show a FAULT on the thing the viewer already
   understands (a missing title, a truncated description) rather than on an
   abstract page.
   ====================================================================== */
export const SerpCard: React.FC<{ x: number; y: number; w: number; z?: number; f?: number;
  fault?: number; fixed?: number }> =
  ({ x, y, w, z = 60, f = 0, fault = 1, fixed = 0 }) => {
  const u = w / 326;
  const dr = drift(f, 6.2, 0.7);
  const BLUE = "#3B5FA8", URLG = "#3F7A4A";
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, zIndex: z,
      transform: `translate(${dr.x}px, ${dr.y}px)`,
      background: CARDL, borderRadius: 16 * u, border: `${4 * u}px solid ${CARDD}`,
      boxShadow: SH_D, padding: `${16 * u}px ${16 * u}px ${18 * u}px`, overflow: "hidden" }}>
      <Sheen f={f} phase={6} z={2} o={0.045} />
      {/* the query bar — this is what says SEARCH in one glance */}
      <div style={{ height: 40 * u, borderRadius: 20 * u, background: "#EFE9DB",
        border: `${2.5 * u}px solid ${CARDD}`, display: "flex", alignItems: "center",
        paddingLeft: 14 * u, gap: 10 * u, marginBottom: 16 * u }}>
        <svg width={19 * u} height={19 * u} viewBox="0 0 19 19">
          <circle cx={8} cy={8} r={6} fill="none" stroke="#8A8175" strokeWidth={2.6} />
          <line x1={12.5} y1={12.5} x2={17} y2={17} stroke="#8A8175" strokeWidth={2.6}
            strokeLinecap="round" />
        </svg>
        <div style={{ height: 9 * u, width: "54%", borderRadius: 5 * u,
          background: "#C6BFB1" }} />
      </div>
      {/* the result: favicon + url, then the blue title, then the description */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 * u, marginBottom: 9 * u }}>
        <span style={{ width: 26 * u, height: 26 * u, borderRadius: 13 * u,
          background: "#FFF", border: `${1.6 * u}px solid #E8DCC0`, display: "flex",
          alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Img src={staticFile("claude_logo.png")}
            style={{ width: 18 * u, height: 18 * u, objectFit: "contain" }} /></span>
        <span style={{ fontFamily: MONO, fontWeight: 800, fontSize: 15 * u, color: URLG,
          whiteSpace: "nowrap" }}>{REPO.site}</span>
      </div>
      {/* ⛔ THE TITLE IS THE FAULT. When `fault` is up the blue title is short
          and stubbed; when `fixed` is up it runs the full width. That is a real
          `/seo page` finding drawn on the object it belongs to. */}
      <div style={{ height: 17 * u, borderRadius: 8 * u, background: BLUE,
        width: `${fixed > 0.5 ? 92 : 44 - fault * 8}%`, marginBottom: 7 * u }} />
      {fixed > 0.5 && (
        <div style={{ height: 17 * u, borderRadius: 8 * u, background: BLUE,
          width: "58%", marginBottom: 7 * u }} />)}
      <div style={{ height: 9 * u, borderRadius: 5 * u, background: "#C6BFB1",
        width: "94%", marginBottom: 6 * u }} />
      <div style={{ height: 9 * u, borderRadius: 5 * u, background: "#C6BFB1",
        width: fixed > 0.5 ? "86%" : "38%" }} />
      {/* the flag, on the snippet, naming the field that is wrong */}
      {fault > 0.02 && fixed < 0.5 && (
        <div style={{ position: "absolute", left: 150 * u, top: 92 * u, opacity: fault }}>
          <Flag x={0} y={0} t="MISSING TITLE" c={TAGR} s={u * 0.80} z={20} f={f} seed={4} />
        </div>)}
    </div>
  );
};
