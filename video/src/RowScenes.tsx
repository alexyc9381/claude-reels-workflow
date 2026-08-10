import React from "react";
import { AbsoluteFill, useCurrentFrame, Img, staticFile } from "remotion";
import { inter } from "./fonts";
import { Panel, SectionHeader, Mascot, Confetti, hexA } from "./SlopKit";
import {
  Site, Chip, Walker, Crate, Placard, Shopfront, Brand, Unit, Repo, Badge, Slab,
  AppWindow, MCP, Founder, FOUNDERS,
  PAPER, INK, INK_L, MUTE, CLAY, GO, RED, GOLD, SH, SH_D, STATS,
} from "./RowSurfaces";
/* the wreath lives with the funeral world it was built for, not with the
   generic exteriors — the hook and S5 are the same graveside */
import { Wreath, Stone } from "./RowRituals";
import { E, OUT, IO, BACK, IN_Q } from "./MissionWorld";

/* =========================================================================
   REEL 91 "ROWBOAT" · THE BODY.

   Every scene start is a MEASURED word onset out of words_rowboat.json — see
   row.intent.json for the table and the reasoning.

   ⛔ FOURTEEN SCENES, THIRTEEN PLACES. `lawn` is used twice on purpose: the
      hook buries the AI agency and S5 comes back to the same grave for
      "irrelevant overnight". Everything else is its own world, and the kinds
      ALTERNATE WARM/COOL so every cut is a colour change as well as a place
      change. Nothing here is an interior except the pass, which is not in this
      cut at all.

   ⛔ THE HEADER STATES THE CLAIM, not the theme (reel 81). Product nouns:
      Coinbase, Y Combinator, Apache-2.0, 16,974, Slack/Linear/Jira.

   ⚠️ PIVOT. S8, S9, S12 draw "describe it in English and a copilot builds the
      multi-agent system". Verified 2026-08-04, rowboatlabs/rowboat now ships an
      open-source AI COWORKER WITH MEMORY and makes no such claim. Alex's call
      was to BUILD IT AS RECORDED, so these scenes match the VO. They are the
      shots to pull first if that ever gets revisited.
   ========================================================================= */

const W = 1012, H = 792;
const CLAUDE = "claude_logo.png";

/* ---------------------------------------------------------------------------
   FOUNDER PORTRAITS — one switch.

   Alex has asked three times for their real photos. Drop two files into
   public/founders/ (arjun.jpg, ramnique.jpg), flip this to true, re-render, and
   both S1 and S13 use the real headshots instead of the house mascots. See
   public/founders/README.md.

   ✅ ON as of 2026-08-05. ALEX SUPPLIED THE FILES himself, into the reel's own
      Drive folder (`Arjun.jpeg`, `Ramnique.avif`), converted to jpg here. The
      licensing call is his to make for his own channel; what this repo does not
      do is go and fetch them.
      ⛔ Sources are 400x400 and 256x256, so keep the card's portrait area at or
      under ~256px on the short side or ramnique.jpg starts to soften.
   ------------------------------------------------------------------------- */
const FOUNDER_PHOTOS = true;
const PHOTO = ["founders/arjun.jpg", "founders/ramnique.jpg"];

const Head: React.FC<{ f: number; l1: string; l2: string }> = ({ f, l1, l2 }) => {
  const longest = Math.max(l1.length, l2.length);
  const size = Math.round(Math.max(33, Math.min(50, (50 * 20) / longest)));
  return (
    <SectionHeader f={f} size={size} badgeBg="#FFFFFF" badgeBorder="#EDE7DB"
      badge={<Img src={staticFile(CLAUDE)} style={{ width: 60, height: 60, objectFit: "contain" }} />}
      l1={<span>{l1}</span>} l2={<span style={{ color: CLAY }}>{l2}</span>} />
  );
};

/** ⛔ THE CONTINUOUS PUSH IS NOT DECORATION — it is the scene's arc.
    First cut measured 9 of 15 scenes UNDER the 4.0 motion bar with static
    stretches up to 2.2s, which is exactly the standing failure: every scene
    arrives and then holds, and the per-scene averages hide it because the cut
    spike inflates them. Of every lever measured, a per-scene camera push is the
    highest (median 7.12 -> 8.65) because it moves EVERY edge; adding small
    props measures ~0 however much it reads. Panel's own `pushIn` only reaches
    ~1.03 in a 60-frame scene, so this rides on top of it. */
const Push: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const f = useCurrentFrame();
  const s = 1 + Math.min(f, 96) * 0.00118;
  return (
    <div style={{ position: "absolute", inset: 0, transformOrigin: "50% 52%",
      /* ⛔ 7px of drift here stacks on top of Panel's own 5px sway and on the cut
         shake — three wobbles at once, which is what "too much screen shaking"
         actually was. The push does the work; the drift only has to stop it
         feeling like a slide. */
      transform: `scale(${s}) translate(${Math.sin(f / 44) * 3.5}px, ${Math.cos(f / 58) * 2}px)` }}>
      {children}
    </div>
  );
};

/** every body scene is the same shell: header, panel, one place, one event */
const Scene: React.FC<{ l1: string; l2: string; glow?: string; children: React.ReactNode }> =
  ({ l1, l2, glow = CLAY, children }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Head f={f} l1={l1} l2={l2} />
      <Panel glow={hexA(glow, 0.28)} pushIn><Push>{children}</Push></Panel>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ S1 ----
   4.91s · "Two guys who already sold their startup to Coinbase"
   A CORPORATE PLAZA, cool. The company walks off the plaza in a crate and a
   SOLD placard lands on the monolith.
   ⛔ Coinbase bought AGARA in 2021 — their PREVIOUS company. The crate is
      labelled THEIR LAST COMPANY, never Rowboat.
   ------------------------------------------------------------------------- */
export const S1Sold: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Scene l1="COINBASE BOUGHT" l2="THEIR LAST COMPANY">
      <Site f={f} k="plaza">
        {/* ⛔ THIS BEAT USED TO BE TWO ANONYMOUS WALKERS. The VO names them —
            "two guys who already sold their startup to Coinbase" — so the scene
            names them too. Both verified on ycombinator.com/companies/rowboat-labs.
            The portraits take a `photo` prop the moment there is a licensed one
            to pass; see the note on Founder. */}
        <div style={{ position: "absolute", left: 60, top: 152, width: 342, height: 300,
          borderRadius: 14, background: "#2E3742", boxShadow: SH_D, zIndex: 20 }} />
        <div style={{ position: "absolute", left: 96, top: 190, width: 118, height: 118,
          borderRadius: 26, background: "#FFFFFF", boxShadow: SH, zIndex: 22,
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Img src={staticFile("logos/coinbase.svg")}
               style={{ width: 78, height: 78, objectFit: "contain" }} />
        </div>
        <div style={{ position: "absolute", left: 96, top: 330, width: 300,
          fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 34, lineHeight: 1.1,
          letterSpacing: "-0.02em", color: "#DCE3EA", zIndex: 22 }}>ACQUIRED<br />2021</div>
        <Placard x={128} y={392} t="SOLD" s={0.7} z={50}
                 drop={E(f, 6, 18, 0, 1, BACK)} rot={-9} />
        {/* the two of them, named */}
        {FOUNDERS.map((n, i) => (
          <Founder key={n} f={f + i * 13} x={452 + i * 274} y={182} name={n} s={0.78} z={60}
                   who={i ? "suit" : "glasses"} role="CO-FOUNDER"
                   photo={FOUNDER_PHOTOS ? PHOTO[i] : undefined}
                   t={E(f, 8 + i * 7, 24 + i * 7, 0, 1, BACK)} />
        ))}
        {/* and the company still walks off the plaza behind them */}
        <Walker f={f} x={E(f, 0, 71, 120, 300, IO)} y={556} s={0.82} z={40} who="suit"
                carry={<Crate x={0} y={0} s={0.44} z={2} label="THEIR CO." />} />
      </Site>
    </Scene>
  );
};

/* ------------------------------------------------------------------ S2 ----
   7.30s · "just quietly open sourced a tool that does it all in plain English"
   A YARD, warm. The next crate goes DOWN instead, and gets a FREE sign.
   ------------------------------------------------------------------------- */
export const S2Give: React.FC = () => {
  const f = useCurrentFrame();
  const down = E(f, 3, 20, 0, 1, OUT);          // it is set down
  const open = E(f, 24, 38, 0, 1, BACK);        // and then it comes OPEN
  return (
    <Scene l1="THIS ONE THEY" l2="OPEN SOURCED" glow={GO}>
      <Site f={f} k="yard">
        {/* ⛔ THIS WAS A BROWN BOX SITTING IN A YARD. "Quietly open sourced" is a
            moment, not an object: the crate lands, the lid BLOWS OFF, and what
            was inside is the repo and every tool it plugs into. Real marks doing
            the work instead of a label. */}
        <Crate x={252} y={330 + (1 - down) * 150} s={1.62} z={30} label="" c="#C39457" />
        {/* the lid, leaving */}
        <div style={{ position: "absolute", left: 244 - open * 108, top: 322 - open * 236,
          width: 420, height: 44, borderRadius: 8, background: "#A87A45", boxShadow: SH_D,
          zIndex: 52, transform: `rotate(${-open * 26}deg)`, opacity: 1 - E(f, 40, 54, 0, 1, OUT) }} />
        {/* what was in it: the repo, and the four MCPs it speaks */}
        <div style={{ position: "absolute", left: 250, top: 286, zIndex: 46,
          transform: `scale(${open}) translateY(${(1 - open) * 90}px)`,
          transformOrigin: "50% 100%" }}>
          <div style={{ width: 152, height: 152, borderRadius: 34, overflow: "hidden",
            background: "#FFFFFF", boxShadow: SH_D }}>
            <Img src={staticFile("logos/rowboat.png")}
                 style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>
        {MCP.map((m, i) => {
          const up = E(f, 28 + i * 4, 44 + i * 4, 0, 1, BACK);
          return (
            <div key={m} style={{ position: "absolute", left: 486 + i * 128,
              top: 344 - Math.sin((i + 1) / 5 * Math.PI) * 62, width: 104, height: 104,
              borderRadius: 24, background: "#FFFFFF", boxShadow: SH_D, zIndex: 46,
              display: "flex", alignItems: "center", justifyContent: "center",
              transform: `scale(${up}) translateY(${(1 - up) * 120}px)` }}>
              <Img src={staticFile(`logos/${m}.svg`)}
                   style={{ width: 62, height: 62, objectFit: "contain" }} />
            </div>
          );
        })}
        {/* and it is on GitHub, stencilled on the crate face */}
        <div style={{ position: "absolute", left: 296, top: 486 + (1 - down) * 150, width: 92,
          height: 92, borderRadius: 20, background: "#FFFFFF", boxShadow: SH, zIndex: 40,
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Img src={staticFile("logos/github.svg")}
               style={{ width: 60, height: 60, objectFit: "contain" }} />
        </div>
        <div style={{ position: "absolute", left: 406, top: 508 + (1 - down) * 150, zIndex: 40,
          padding: "9px 20px", borderRadius: 9, background: "#8E6B3C",
          fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 26,
          letterSpacing: "0.13em", color: "#F0E3CB" }}>{STATS.license}</div>
        <Placard x={62} y={252} t="FREE" s={0.86} z={60} c={GO}
                 drop={E(f, 42, 56, 0, 1, BACK)} rot={-8} />
        {/* people arriving to take a copy — many large objects travelling */}
        {[0, 1, 2].map((i) => (
          <Walker key={i} f={f + i * 17} x={E(f, 8 + i * 9, 74 + i * 9, 1040, 690 - i * 118, IO)}
                  y={498 - i * 14} s={0.82 - i * 0.06} z={44 - i} flip
                  who={["suit", "girl", "prof"][i]} />
        ))}
      </Site>
    </Scene>
  );
};

/* ------------------------------------------------------------------ S3 ----
   10.63s · "Y Combinator backed it, and it's completely free"
   A FORECOURT, cool. Two real marks and a price that is a zero.
   ------------------------------------------------------------------------- */
export const S3Yc: React.FC = () => {
  const f = useCurrentFrame();
  const drop = E(f, 0, 16, 0, 1, BACK);
  return (
    <Scene l1="Y COMBINATOR S24" l2="AND IT IS FREE" glow={GOLD}>
      <Site f={f} k="apron">
        {/* ⛔ THIS WAS TWO CARDS SITTING SIDE BY SIDE. The line is a credential and
            a price in one breath, so it is staged as one: a YC banner UNFURLS from
            above, and the ticket under it gets struck through to nothing. */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 118, height: 15,
          background: "#6E7B82", zIndex: 30 }} />
        <div style={{ position: "absolute", left: 128, top: 133, width: 300,
          height: drop * 296, background: "#F2F0EA", boxShadow: SH_D, zIndex: 32,
          overflow: "hidden" }}>
          <div style={{ position: "absolute", left: 62, top: 40, width: 176, height: 176,
            borderRadius: 34, background: "#FF6B00", display: "flex",
            alignItems: "center", justifyContent: "center" }}>
            <Img src={staticFile("logos/ycombinator.svg")}
                 style={{ width: 116, height: 116, objectFit: "contain",
                   filter: "brightness(0) invert(1)" }} />
          </div>
          <div style={{ position: "absolute", left: 0, right: 0, top: 236, textAlign: "center",
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 38,
            letterSpacing: "0.05em", color: INK }}>S24</div>
        </div>
        {/* the ticket, struck through */}
        <div style={{ position: "absolute", left: 512, top: 232, width: 396, height: 208,
          borderRadius: 20, background: PAPER, boxShadow: SH_D, zIndex: 40,
          transform: `scale(${E(f, 10, 26, 0.86, 1, BACK)})` }}>
          <div style={{ position: "absolute", left: 26, top: 24, fontFamily: inter.fontFamily,
            fontWeight: 900, fontSize: 24, letterSpacing: "0.15em", color: MUTE }}>PRICE</div>
          {/* the number gets the card to itself — see the note above */}
          <div style={{ position: "absolute", left: 26, top: 56, fontFamily: inter.fontFamily,
            fontWeight: 900, fontSize: 132, lineHeight: 1, letterSpacing: "-0.05em",
            color: INK, transform: `scale(${E(f, 22, 38, 0.7, 1, BACK)})`,
            transformOrigin: "0% 50%" }}>$0</div>
          <div style={{ position: "absolute", left: 26, top: 176, display: "flex", gap: 9 }}>
            {["github", "ycombinator"].map((m) => (
              <div key={m} style={{ width: 34, height: 34, borderRadius: 9, background: "#F0ECE2",
                display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Img src={staticFile(`logos/${m}.svg`)}
                     style={{ width: 21, height: 21, objectFit: "contain" }} />
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: "absolute", left: 232, top: 500, zIndex: 44 }}>
          <Mascot lf={f} size={214} cheer={E(f, 26, 40, 0.1, 0.8, OUT)} nodAmp={4}
                  nodSpeed={9} glasses={1} />
        </div>
      </Site>
    </Scene>
  );
};

/* ------------------------------------------------------------------ S4 ----
   12.45s · "And it's just made every AI agency in the world"
   A HIGH STREET, warm. Four shopfronts shutter in sequence — the mechanism is
   SUBTRACTION and it is legible with the sound off.
   ------------------------------------------------------------------------- */
const FRONTS = ["AI AGENCY", "DEV SHOP", "AGENT BUILDERS", "PROMPT STUDIO"];
/** S5 is the hook's graveside again, so it carries the hook's row of marks */
const GRAVES = ["claude", "cursor", "githubcopilot", "windsurf"];
export const S4Street: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Scene l1="EVERY AI AGENCY" l2="JUST GOT REPLACED" glow={RED}>
      <Site f={f} k="street">
        {/* ⛔ THEY READ AS STORAGE UNITS. Alex: "underneath the storage units needs
            to actually be stuff". A shutter is only a gut-punch if you SAW what it
            is closing over — so each unit now has a lit interior with a desk, a
            running meter and somebody at it, and the shutter comes down on that. */}
        {FRONTS.map((n, i) => (
          <Shopfront key={n} x={16 + i * 250} y={214} w={224} h={278} z={30 + i} name={n}
                     shut={E(f, 10 + i * 9, 30 + i * 9, 0, 1, IN_Q)}>
            <div style={{ position: "absolute", left: 22, top: 128, width: 180, height: 15,
              borderRadius: 4, background: "#B9A78C" }} />
            <div style={{ position: "absolute", left: 34, top: 46, width: 156, height: 86,
              borderRadius: 7, background: "#2C2822" }}>
              <div style={{ position: "absolute", left: 12, top: 13, right: 12, height: 12,
                borderRadius: 6, background: "#4A4136", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0,
                  width: `${45 + ((f * 2.1 + i * 30) % 55)}%`, background: RED }} />
              </div>
              <div style={{ position: "absolute", left: 12, top: 40, fontFamily: inter.fontFamily,
                fontWeight: 900, fontSize: 27, color: GOLD }}>BILLABLE</div>
            </div>
            <div style={{ position: "absolute", left: 62, top: 148 }}>
              <Mascot lf={f + i * 21} size={104} stern={0.6} nodAmp={2.2} nodSpeed={13}
                      {...({ [["suit", "glasses", "prof", "chef"][i]]: 1 } as any)} />
            </div>
            <div style={{ position: "absolute", left: 22, top: 250, width: 180, height: 12,
              background: "rgba(30,26,20,0.18)" }} />
          </Shopfront>
        ))}
        <Walker f={f} x={E(f, 0, 68, -180, 300, IO)} y={498} s={0.86} z={50} who="cop" />
      </Site>
    </Scene>
  );
};

/* ------------------------------------------------------------------ S5 ----
   14.72s · "irrelevant overnight"
   BACK TO THE LAWN. The one deliberate repeat in the reel: the hook buried the
   agency, and this is the same grave with the rest of the row beside it.
   ------------------------------------------------------------------------- */
export const S5Over: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Scene l1="IRRELEVANT" l2="OVERNIGHT" glow={RED}>
      <Site f={f} k="lawn">
        {GRAVES.map((logo, i) => (
          <Stone key={logo} f={f + i * 17} x={8 + i * 250} y={310 + (i % 2) * 28} s={0.6}
                 z={30 + i} logo={logo} rise={E(f, 1 + i * 4, 15 + i * 4, 0, 1, BACK)} />
        ))}
        {GRAVES.map((logo, i) => (
          <Wreath key={logo} f={f + i * 9} x={64 + i * 250} y={520 + (i % 2) * 28} s={0.46}
                  z={40 + i} />
        ))}
        <div style={{ position: "absolute", left: 424, top: 590, zIndex: 48 }}>
          <Mascot lf={f} size={172} stern={0.8} nodAmp={1.6} nodSpeed={18} suit={1} />
        </div>
        <Chip t="ALL OF THEM" y={700}
              t2={E(f, 20, 34, 0, 1, BACK)} />
      </Site>
    </Scene>
  );
};

/* ------------------------------------------------------------------ S6 ----
   16.72s · "The tool is called Rowboat"
   A CROSSROADS, teal. A sheet comes off a signboard.
   ⛔ Their brand is MONOCHROME — a black sail on a white tile. Do not tint it.
   ------------------------------------------------------------------------- */
export const S6Name: React.FC = () => {
  const f = useCurrentFrame();
  const pull = E(f, 6, 24, 0, 1, OUT);
  return (
    <Scene l1="THE TOOL IS" l2="CALLED ROWBOAT">
      <Site f={f} k="cross">
        {/* the post */}
        <div style={{ position: "absolute", left: 486, top: 452, width: 34, height: 300,
          background: "#5D6B66", zIndex: 20 }} />
        <div style={{ position: "absolute", left: 122, top: 198, width: 762, height: 260,
          borderRadius: 20, background: PAPER, boxShadow: SH_D, zIndex: 30 }} />
        {/* ⛔ CENTRED IN THE BOARD, NOT HUNG OFF ITS TOP EDGE. `Brand` positions by
            the TILE'S TOP, so y=328 (the board's centre line) actually pushed the
            125px tile down to 328..453 against a board that ends at 458 — it read
            as sitting on the bottom rail. Board 198..458, mark 125 tall, so the
            top is 198 + (260-125)/2 = 266. Same for x: the mark plus the wordmark
            is ~452 wide in a 762 board, so 122 + (762-452)/2 = 277. */}
        <Brand x={277} y={266} s={1.06} z={34} t={1} />
        {/* the sheet, sliding off to the right */}
        <div style={{ position: "absolute", left: 108 + pull * 900, top: 180, width: 790,
          height: 300, borderRadius: 16, background: "#DCE9E5", boxShadow: SH_D, zIndex: 50,
          transform: `rotate(${pull * 9}deg)`, transformOrigin: "0% 0%" }} />
        {/* who made the thing on the board — both marks are real and both claims
            are sourced (Coinbase bought AGARA in 2021; Rowboat is YC S24) */}
        <div style={{ position: "absolute", left: 146, top: 486, display: "flex", gap: 14,
          zIndex: 44, transform: `scale(${E(f, 26, 40, 0, 1, BACK)})`,
          transformOrigin: "0% 50%" }}>
          {["coinbase", "ycombinator"].map((m) => (
            <div key={m} style={{ width: 86, height: 86, borderRadius: 20, background: "#FFFFFF",
              boxShadow: SH, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Img src={staticFile(`logos/${m}.svg`)}
                   style={{ width: 54, height: 54, objectFit: "contain" }} />
            </div>
          ))}
        </div>
        <Walker f={f} x={846} y={452} s={0.9} z={54} who="constr" step={0.5} />
      </Site>
    </Scene>
  );
};

/* ------------------------------------------------------------------ S7 ----
   18.54s · "You just describe what you want your AI agent to do in normal words"
   A DOCK at golden hour. One line, said out loud, typed onto a board.
   ------------------------------------------------------------------------- */
const LINE = "build me an agent that answers my support email";
export const S7Say: React.FC = () => {
  const f = useCurrentFrame();
  const n = Math.max(0, Math.min(LINE.length, Math.floor((f - 5) / 1.28)));
  return (
    <Scene l1="DESCRIBE IT IN" l2="PLAIN ENGLISH" glow={GOLD}>
      <Site f={f} k="dock">
        {/* ⛔ THIS WAS A CREAM CARD WITH A CARET IN IT — a caption pretending to
            be software. This audience uses these tools daily, so the window has
            the parts they'd expect and the MCP marks are the real ones. */}
        {/* near full-panel on purpose: "making the subject full-frame rather than
            inside a window" is the third-biggest motion lever there is, and this
            IS the scene */}
        {/* ⛔ inset to 56..956, NOT 26..986: the scene push reaches 1.11 about the
            centre, which threw the right edge (and the status bar with it) past
            the panel. Anything full-bleed has to be sized for the END of the
            push, not the start. */}
        <AppWindow f={f} x={56} y={140} w={900} h={520} z={50}
                   typed={LINE.slice(0, n)} sent={E(f, 62, 74, 0, 1, OUT)}
                   t={E(f, 0, 12, 0.92, 1, BACK)} />
        <div style={{ position: "absolute", left: 806, top: 590, zIndex: 44 }}>
          <Mascot lf={f} size={168} cheer={0.4} nodAmp={3.4} nodSpeed={10} prof={1} />
        </div>
      </Site>
    </Scene>
  );
};

/* ------------------------------------------------------------------ S8 ----
   21.86s · "The copilot builds the entire multi-agent system for you"
   A DEPOT, cool slate. The frame goes up on its own.
   ⚠️ PIVOT-DEPENDENT — see the file header.
   ------------------------------------------------------------------------- */
export const S8Build: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Scene l1="THE COPILOT BUILDS" l2="THE WHOLE SYSTEM">
      <Site f={f} k="depot">
        {/* ⛔ THIS WAS A TABLE. Posts + beams + a deck is furniture, not a system
            being assembled. What the VO describes is a copilot PLACING agents,
            so a gantry lowers three of them onto a deck and then the links get
            drawn between them — proximity is not connection (learnings §2). */}
        {/* ⛔ the beam was #3E4A57 on the depot's own dark band and vanished.
            A structure has to be lighter than the sky it hangs in. */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 158, height: 34,
          background: "#E4D9C4", boxShadow: SH_D, zIndex: 26 }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 192, height: 11,
          background: "#C4B79C", zIndex: 26 }} />
        <div style={{ position: "absolute", left: 42, top: 132, width: 88, height: 88,
          borderRadius: 20, overflow: "hidden", background: "#FFFFFF", boxShadow: SH,
          zIndex: 30 }}>
          <Img src={staticFile("logos/rowboat.png")}
               style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        {[0, 1, 2].map((i) => {
          const drop = E(f, 3 + i * 8, 24 + i * 8, 0, 1, OUT);
          const y = 188 + drop * 246;
          return (<React.Fragment key={i}>
            <div style={{ position: "absolute", left: 216 + i * 292, top: 192, width: 9,
              height: Math.max(0, y - 192), background: "#EDE4D2", zIndex: 27 }} />
            <div style={{ position: "absolute", left: 140 + i * 292, top: y, zIndex: 30 + i }}>
              <Mascot lf={f + i * 15} size={162} cheer={0.45} nodAmp={3} nodSpeed={11}
                      {...({ [["glasses", "suit", "prof"][i]]: 1 } as any)} />
            </div>
          </React.Fragment>);
        })}
        {/* the deck they land on */}
        <div style={{ position: "absolute", left: 62, top: 592, right: 62, height: 26,
          borderRadius: 8, background: "#C9B79A", boxShadow: SH_D, zIndex: 24 }} />
        {/* and the links, drawn, once they are down */}
        {[0, 1].map((i) => (
          <div key={`l${i}`} style={{ position: "absolute", left: 220 + i * 292, top: 512,
            width: E(f, 34 + i * 6, 50 + i * 6, 0, 292, OUT), height: 10, borderRadius: 5,
            background: "#F0E4CC", zIndex: 40 }} />
        ))}
      </Site>
    </Scene>
  );
};

/* ------------------------------------------------------------------ S9 ----
   24.21s · "multiple agents working together, connected to your tools"
   A BUILD YARD, warm ochre. Four agents land, each with the REAL mark of an
   MCP the README names.
   ------------------------------------------------------------------------- */
export const S9Crew: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Scene l1="AGENTS WIRED TO" l2="SLACK, LINEAR, JIRA" glow={GOLD}>
      <Site f={f} k="build">
        {/* ⛔ THE MARKS ARE THE SCENE. Alex: "there needs to be more logos". They
            were 62px tiles hanging off each agent; now they are 132px boards on
            the gantry with a drawn cable down to the agent that owns each one.
            Real assets, real colour, on white — and ONLY the MCPs the README
            names, because an integration the product does not have is an
            invented on-screen fact. */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 176, height: 20,
          background: "#8B7550", zIndex: 26 }} />
        {MCP.map((t, i) => {
          const on = E(f, 4 + i * 5, 20 + i * 5, 0, 1, BACK);
          return (<React.Fragment key={t}>
            <div style={{ position: "absolute", left: 152 + i * 216, top: 196, width: 12,
              height: E(f, 12 + i * 5, 30 + i * 5, 0, 106, OUT), background: "#A08A64",
              zIndex: 27 }} />
            <div style={{ position: "absolute", left: 92 + i * 216, top: 196, width: 132,
              height: 132, borderRadius: 26, background: "#FFFFFF", boxShadow: SH_D,
              display: "flex", alignItems: "center", justifyContent: "center", zIndex: 34,
              transform: `scale(${on}) translateY(${(1 - on) * -40}px)`,
              transformOrigin: "50% 0%" }}>
              <Img src={staticFile(`logos/${t}.svg`)}
                   style={{ width: 84, height: 84, objectFit: "contain" }} />
            </div>
          </React.Fragment>);
        })}
        {MCP.map((t, i) => (
          <Unit key={t} f={f + i * 15} x={92 + i * 216} y={368} s={0.94} z={40 + i}
                who={["glasses", "suit", "chef", "prof"][i]}
                t={E(f, 14 + i * 5, 30 + i * 5, 0, 1, BACK)} />
        ))}
      </Site>
    </Scene>
  );
};

/* ------------------------------------------------------------------ S10 ---
   26.30s · "tested, and ready to deploy"
   A TERRACE, cool sage. A TESTED placard lands and the gate goes green.
   ------------------------------------------------------------------------- */
export const S10Ship: React.FC = () => {
  const f = useCurrentFrame();
  const open = E(f, 22, 44, 0, 1, OUT);
  return (
    <Scene l1="TESTED AND" l2="READY TO DEPLOY" glow={GO}>
      <Site f={f} k="terrace">
        {/* ⛔ THE FIRST GATE DID NOT READ. Two rectangles narrowing on a cream
            fill is a white board, not an opening. A gate needs POSTS, a LINTEL,
            and something visibly beyond it, or opening means nothing. */}
        <div style={{ position: "absolute", left: 258, top: 196, width: 496, height: 396,
          background: "#F4EEE0", zIndex: 22 }} />
        <div style={{ position: "absolute", left: 258, top: 452, width: 496, height: 140,
          background: "#D8CEB6", zIndex: 22 }} />
        {[0, 1].map((i) => (
          <div key={i} style={{ position: "absolute", top: 196, height: 396, overflow: "hidden",
            left: i ? 506 : 258, width: 248, zIndex: 30 }}>
            <div style={{ position: "absolute", top: 0, height: 396, width: 248,
              background: "#3F5C46", boxShadow: SH_D,
              left: i ? 248 * open : -248 * open }}>
              {Array.from({ length: 5 }, (_, j) => (
                <div key={j} style={{ position: "absolute", left: 14, right: 14,
                  top: 26 + j * 74, height: 15, background: "#334B39" }} />
              ))}
            </div>
          </div>
        ))}
        {/* posts + lintel, so the opening has a frame around it */}
        {[236, 738].map((x) => (
          <div key={x} style={{ position: "absolute", left: x, top: 176, width: 38,
            height: 430, background: "#4A4238", boxShadow: SH_D, zIndex: 34 }} />
        ))}
        <div style={{ position: "absolute", left: 220, top: 158, width: 572, height: 40,
          borderRadius: 6, background: "#5A5044", boxShadow: SH_D, zIndex: 34 }} />
        <Placard x={330} y={236} t="TESTED" s={0.82} z={60} c={GO}
                 drop={E(f, 4, 18, 0, 1, BACK)} rot={-7} />
        <Unit f={f} x={382} y={300} s={1.62} z={44} who="glasses"
              t={E(f, 30, 46, 0, 1, BACK)} />
      </Site>
    </Scene>
  );
};

/* ------------------------------------------------------------------ S11 ---
   28.41s · "Think of it like having an entire AI development team"
   A KERB, warm cream. The team is standing on it, at scale.
   ------------------------------------------------------------------------- */
export const S11Team: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Scene l1="AN ENTIRE" l2="AI DEV TEAM">
      <Site f={f} k="kerb">
        {/* staged on DEPTH, not as bookends: one large near, the rest receding */}
        <div style={{ position: "absolute", left: 42, top: 296, zIndex: 48 }}>
          <Mascot lf={f} size={276} cheer={0.6} nodAmp={4} nodSpeed={10} glasses={1} />
        </div>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{ position: "absolute", left: 336 + i * 168, top: 350 + i * 10,
            zIndex: 44 - i, transform: `scale(${E(f, 4 + i * 5, 20 + i * 5, 0, 1, BACK)})`,
            transformOrigin: "50% 100%" }}>
            <Mascot lf={f + i * 21} size={222 - i * 22} cheer={0.5} nodAmp={3.4} nodSpeed={11 + i}
                    {...({ [["suit", "prof", "chef", "cop"][i]]: 1 } as any)} />
          </div>
        ))}
        <Chip t="A WHOLE TEAM, FOR FREE" y={664} t2={E(f, 28, 42, 0, 1, BACK)} />
      </Site>
    </Scene>
  );
};

/* ------------------------------------------------------------------ S12 ---
   30.47s · "that takes orders in English and delivers in seconds"
   AN OPEN ROAD, cool. The order goes in, the build comes out, and the clock is
   the only number on screen.
   ⚠️ PIVOT-DEPENDENT — see the file header.
   ------------------------------------------------------------------------- */
export const S12Fast: React.FC = () => {
  const f = useCurrentFrame();
  const belt = (f * 5) % 46;
  const car = E(f, 4, 46, 0, 1, IO);            // the order riding the line
  return (
    <Scene l1="ORDERS IN ENGLISH" l2="DELIVERED IN SECONDS" glow={GO}>
      <Site f={f} k="road">
        {/* ⛔ THIS WAS A PROGRESS BAR FILLING. "Takes orders in English and delivers
            in seconds" is a PRODUCTION LINE, so build one: the order rides a belt,
            four presses stamp a real MCP onto it as it passes, and a finished agent
            comes off the end. No clock — the travel carries the speed. */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 190, height: 18,
          background: "#7C878E", zIndex: 30 }} />
        {MCP.map((m, i) => {
          const hit = Math.max(0, 1 - Math.abs(car * 4 - (i + 0.55)) * 3.4);
          return (<React.Fragment key={m}>
            <div style={{ position: "absolute", left: 152 + i * 208, top: 208, width: 18,
              height: 132 + hit * 62, background: "#6E7B82", zIndex: 30 }} />
            <div style={{ position: "absolute", left: 106 + i * 208, top: 332 + hit * 62,
              width: 110, height: 110, borderRadius: 24, background: "#FFFFFF",
              boxShadow: SH_D, zIndex: 34, display: "flex", alignItems: "center",
              justifyContent: "center" }}>
              <Img src={staticFile(`logos/${m}.svg`)}
                   style={{ width: 66, height: 66, objectFit: "contain" }} />
            </div>
          </React.Fragment>);
        })}
        {/* the belt */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 508, height: 46,
          background: "#5E686E", zIndex: 36 }} />
        {Array.from({ length: 24 }, (_, i) => (
          <div key={i} style={{ position: "absolute", left: -46 + i * 46 + belt, top: 508,
            width: 6, height: 46, background: "#4E585E", zIndex: 37 }} />
        ))}
        <div style={{ position: "absolute", left: 0, right: 0, top: 554, height: 16,
          background: "#48525833", zIndex: 37 }} />
        {/* the order, riding it */}
        {/* ⛔ ON the belt, not hovering 100px above it — the card's bottom edge has
            to meet the belt's top edge or the line does not read as carrying it. */}
        <div style={{ position: "absolute", left: -180 + car * 700, top: 406, width: 268,
          height: 102, borderRadius: 14, background: PAPER, boxShadow: SH_D, zIndex: 44,
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: 1 - E(f, 44, 54, 0, 1, OUT),
          fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 36, color: INK }}>
          &ldquo;build it&rdquo;
        </div>
        {/* and what comes off the end */}
        <Unit f={f} x={740} y={296} s={1.34} z={46} who="chef" tool="github"
              t={E(f, 46, 62, 0, 1, BACK)} />
      </Site>
    </Scene>
  );
};

/* ------------------------------------------------------------------ S13 ---
   33.52s · "It's open source, and the founders already proved they can build AI
   that works"
   AN OPEN GATE, green. Every figure on the card is checkable against the repo.
   ------------------------------------------------------------------------- */
export const S13Open: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Scene l1="APACHE-2.0" l2="16,974 STARS" glow={GO}>
      {/* ⛔ no foreground rank: the repo card is full-bleed and they cropped it */}
      <Site f={f} k="gate" fore={false}>
        <Repo x={74} y={150} w={864} s={0.86} z={62} t={E(f, 0, 15, 0.86, 1, BACK)}
              stars={E(f, 6, 40, 0, 1, OUT)} />
        {/* ⛔ the Coinbase and Y Combinator marks are NOT repeated here — they
            already carry their own beats in S1 and S6, and stacking them beside
            the founders crushed both. The close is the repo and the two people. */}
        {FOUNDERS.map((n, i) => (
          <Founder key={n} f={f + i * 13} x={148 + i * 380} y={464} name={n} s={0.88} z={60}
                   who={i ? "suit" : "glasses"} role="CO-FOUNDER"
                   photo={FOUNDER_PHOTOS ? PHOTO[i] : undefined}
                   t={E(f, 26 + i * 8, 42 + i * 8, 0, 1, BACK)} />
        ))}
      </Site>
    </Scene>
  );
};

/* ------------------------------------------------------------------ S14 ---
   36.95s · "Comment ROWBOAT and I'll send you the direct link"
   ⛔ HARD CUT on the keyword.
   ------------------------------------------------------------------------- */
export const S14Cta: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Scene l1="COMMENT" l2="ROWBOAT" glow={CLAY}>
      {/* ⛔ no foreground rank: they cropped the R and the T off ROWBOAT */}
      <Site f={f} k="gate" fore={false}>
        {/* ⛔ the CTA measured 1.00 against a 4.0 bar in the first cut — a card
            that scales in once and then sits there. Confetti is LARGE, BRIGHT
            and TRAVELLING, which is the only kind of motion that registers. */}
        <Confetti f={f} x={506} y={150} start={4} n={40} />
        <div style={{ position: "absolute", left: 112, top: 196, width: 788, height: 300,
          borderRadius: 28, background: CLAY, boxShadow: SH_D, zIndex: 60,
          display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "center", gap: 12,
          transform: `scale(${E(f, 0, 14, 0.84, 1, BACK) * (1 + Math.sin(f / 9) * 0.014)})` }}>
          <div style={{ width: 78, height: 78, borderRadius: 19, overflow: "hidden",
            background: "#FFFFFF", boxShadow: SH }}>
            <Img src={staticFile("logos/rowboat.png")}
                 style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 30,
            letterSpacing: "0.2em", color: "#F6DFD3" }}>COMMENT</div>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 138,
            lineHeight: 1, letterSpacing: "-0.04em", color: PAPER }}>ROWBOAT</div>
        </div>
        <div style={{ position: "absolute", left: 402, top: 500, zIndex: 46 }}>
          <Mascot lf={f} size={220} cheer={0.8} nodAmp={5} nodSpeed={8} glasses={1} />
        </div>
      </Site>
    </Scene>
  );
};
