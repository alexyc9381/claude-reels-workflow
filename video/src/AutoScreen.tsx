import React from "react";
import { AbsoluteFill, useCurrentFrame, Img, staticFile, Audio } from "remotion";
import { inter } from "./fonts";
import { Bg, Panel, ProgressBar, HookHeader, hexA } from "./SlopKit";
import { Dev } from "./KeyWorld";
import { AChip, RED, GO, A1, A3 } from "./AutoWorld";
import { E, BACK } from "./MissionWorld";
import { Shot, Flash } from "./AutoHookQueue";
import { Wedges, Satellites, Shutter, lin, C1, VAR_LEN } from "./AutoVariants";

/* =========================================================================
   REEL 125 "AUTO" — THE SCREEN REGISTER. The repo itself, not a picture of it.

   ⛔ Five concepts rejected in a row: a queue, a tipping tower, an office of
   understudies, a city of lights, a flatpack crate, a piñata. Every one was a
   SYMBOL standing in for the claim, and
   [[approved-is-the-real-thing-not-a-symbol]] measures that at **0 for 30**:
   "every APPROVED body shows a REAL SPECIFIC THING; every rejected one was an
   abstract symbol standing in for it." [[reel-escalation-ladder]] says the same
   thing from the other end: "prefer the LITERAL thing over a metaphor — show
   the tool doing it (the SCREEN register); a drawn machine is one abstraction
   away from something we can just show."

   ⭐ EVERY STRING AND NUMBER BELOW IS REAL, pulled from the GitHub API on
   2026-08-30 — folder names verbatim, per-folder .json counts counted from the
   full tree, 25,023 stars, 19 folders, 350 files (349 in folders + 1 at root).
   ⛔ No licence badge: the API returns NOASSERTION / "Other" for this repo.
   ========================================================================= */

export const SCREEN_LEN = VAR_LEN;

const FOLDERS: [string, number][] = [
  ["OpenAI_and_LLMs", 92],
  ["Other_Integrations_and_Use_Cases", 45],
  ["AI_Research_RAG_and_Data_Analysis", 44],
  ["Gmail_and_Email_Automation", 26],
  ["Telegram", 26],
  ["Google_Drive_and_Google_Sheets", 21],
  ["PDF_and_Document_Processing", 18],
  ["Instagram_Twitter_Social_Media", 15],
  ["Notion", 10],
  ["Slack", 9],
  ["WhatsApp", 8],
  ["WordPress", 6],
  ["devops", 6],
  ["Airtable", 5],
  ["Database_and_Storage", 5],
  ["Discord", 4],
  ["Forms_and_Surveys", 4],
  ["HR_and_Recruitment", 4],
  ["Other", 1],
];

const GH = { bg: "#0D1117", row: "#161B22", line: "#30363D", txt: "#C9D1D9",
             link: "#58A6FF", dim: "#8B949E", gold: "#E3B341" };

const FolderIcon: React.FC<{ s?: number }> = ({ s = 1 }) => (
  <svg width={20 * s} height={20 * s} viewBox="0 0 16 16" style={{ display: "block", flexShrink: 0 }}>
    <path fill="#54AEFF" d="M1.75 1h4.5a.75.75 0 0 1 .6.3L8.2 3h6.05A1.75 1.75 0 0 1 16 4.75v8.5A1.75
      1.75 0 0 1 14.25 15H1.75A1.75 1.75 0 0 1 0 13.25V2.75C0 1.784.784 1 1.75 1z" />
  </svg>
);

/* the repo page, drawn as the page it is — GitHub's own dark chrome */
const RepoPage: React.FC<{ f: number; scroll: number; tight?: boolean }> =
  ({ f, scroll, tight = true }) => (
  <div style={{ position: "absolute", left: 30, top: 118, width: 952, height: 496,
    borderRadius: 12, background: GH.bg, border: `2px solid ${GH.line}`, overflow: "hidden",
    zIndex: 22, boxShadow: "0 22px 30px rgba(0,0,0,0.75)", fontFamily: inter.fontFamily }}>
    {/* browser chrome + the real URL */}
    <div style={{ height: 54, background: "#161B22", borderBottom: `2px solid ${GH.line}`,
      display: "flex", alignItems: "center", paddingLeft: 16, gap: 9 }}>
      {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
        <div key={c} style={{ width: 14, height: 14, borderRadius: "50%", background: c }} />
      ))}
      <div style={{ marginLeft: 16, background: "#0D1117", border: `1px solid ${GH.line}`,
        borderRadius: 7, padding: "6px 16px", fontSize: 19, color: GH.dim }}>
        github.com/enescingoz/awesome-n8n-templates
      </div>
    </div>
    {/* repo header: name + the live star count */}
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px",
      borderBottom: `2px solid ${GH.line}` }}>
      <Img src={staticFile("logos/github.svg")}
           style={{ width: 26, height: 26, objectFit: "contain", display: "block",
             filter: "invert(1)" }} />
      <span style={{ fontSize: 30, color: GH.dim }}>enescingoz /</span>
      <span style={{ fontSize: 30, fontWeight: 900, color: GH.link }}>awesome-n8n-templates</span>
      <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 7,
        border: `1px solid ${GH.line}`, borderRadius: 7, padding: "5px 12px", background: "#21262D" }}>
        <span style={{ color: GH.gold, fontSize: 30 }}>★</span>
        <span style={{ color: GH.txt, fontSize: 30, fontWeight: 900 }}>25,023</span>
      </span>
    </div>
    {/* the tree — real folder names, real per-folder counts, scrolling */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 132, bottom: 0, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: -scroll }}>
        {FOLDERS.concat(FOLDERS).map(([name, n], i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 18,
            padding: "0 22px", height: 96, borderBottom: `2px solid ${GH.line}`,
            background: i % 2 ? "transparent" : "rgba(255,255,255,0.02)" }}>
            <FolderIcon s={2.1} />
            <span style={{ fontSize: 33, fontWeight: 700, color: GH.link, whiteSpace: "nowrap",
              overflow: "hidden", textOverflow: "ellipsis" }}>{name.replace(/_/g, " ")}</span>
            <span style={{ marginLeft: "auto", display: "flex", alignItems: "baseline", gap: 8 }}>
              <span style={{ fontSize: 46, fontWeight: 900, color: GH.txt }}>{n}</span>
              <span style={{ fontSize: 19, color: GH.dim }}>files</span>
            </span>
          </div>
        ))}
      </div>
    </div>
    {/* the scrollbar that shows how much is below */}
    <div style={{ position: "absolute", right: 5, top: 116, bottom: 8, width: 7,
      borderRadius: 4, background: "#161B22" }}>
      <div style={{ position: "absolute", left: 0, width: 7, borderRadius: 4, background: "#3D444D",
        height: 62, top: (scroll % 1824) / 1824 * 280 }} />
    </div>
  </div>
);

export const AutoScreenHook: React.FC = () => {
  const f = useCurrentFrame();
  /* L3: the scroll starts at 0.93s, ACCELERATES, and never reaches the end.
     Nothing on this page resolves before the cut. */
  const scroll = Math.pow(Math.max(0, f - 28) / 30, 1.7) * 420;
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <HookHeader f={f + 12} big="350 AUTOMATIONS, FREE" hot="ONE GITHUB REPO" />
      <Panel glow={hexA(RED, 0.3)}>
        <Shot f={f} a={0} b={C1} k={0} len={SCREEN_LEN}>
          <div style={{ position: "absolute", inset: 0, background: "#080C12" }} />
          <Wedges f={f} z={4} /><Satellites f={f} n={5} z={5} />
          {/* the screen's own glow on the room */}
          <div style={{ position: "absolute", inset: 0, zIndex: 6, pointerEvents: "none",
            background: "radial-gradient(ellipse at 50% 42%, rgba(88,166,255,0.20), rgba(8,12,18,0) 68%)" }} />
          <RepoPage f={f} scroll={scroll} />
          <Dev f={f} x={790} y={556} size={172} gaze={2} shock={f > 28 ? 0.75 : 0.25}
               nodAmp={2.2} nodSpeed={f > 28 ? 15 : 8} z={40} />
          <AChip y={706} text="350 FILES. ALL FINISHED." c={RED} size={30} />
        </Shot>

        <Shot f={f} a={C1} b={9999} k={1} len={SCREEN_LEN}>
          <div style={{ position: "absolute", inset: 0, background: "#080C12" }} />
          <Wedges f={f} z={4} /><Satellites f={f} n={6} z={5} />
          <div style={{ position: "absolute", inset: 0, zIndex: 6, pointerEvents: "none",
            background: "radial-gradient(ellipse at 50% 40%, rgba(88,166,255,0.22), rgba(8,12,18,0) 66%)" }} />
          {/* pulled back: it is not one screenful, it is nineteen folders deep */}
          {[0, 1, 2].map((band) => (
            <div key={band} style={{ position: "absolute", inset: 0, zIndex: 20 - band,
              transform: `scale(${0.60 - band * 0.06}) translateY(${band * 700 - 120}px)`,
              transformOrigin: "50% 34%", opacity: 1 - band * 0.28 }}>
              <RepoPage f={f} scroll={scroll + band * 470} />
            </div>
          ))}
          <div style={{ position: "absolute", left: 300, top: 556, width: 420, height: 106,
            borderRadius: 16, background: "#0B1017", border: `5px solid ${A3}`, zIndex: 62,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 14,
            transform: `scale(${E(f, C1 + 8, C1 + 18, 0.4, 1, BACK)})` }}>
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 60, color: A1 }}>
              {Math.round(19 * lin(f, C1 + 8, SCREEN_LEN - 4))}</span>
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 17,
              letterSpacing: "0.14em", color: A3 }}>FOLDERS · 350 FILES</span>
          </div>
          <Dev f={f} x={64} y={556} size={168} gaze={1} cheer={0.9} nodAmp={3} nodSpeed={10} z={40} />
          <AChip y={706} text="NOBODY BUILT THESE" c={GO} size={32} />
        </Shot>
        <Flash f={f} cuts={[C1]} /><Shutter f={f} />
      </Panel>
      <Audio src={staticFile("auto85_vo_v2.wav")} />
    </AbsoluteFill>
  );
};
