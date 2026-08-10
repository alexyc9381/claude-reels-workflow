import React from "react";
import { inter } from "./fonts";
import { E, osc, rnd, OUT, IO, BACK } from "./MissionWorld";
import { DEPTS, PW, PH, INKD, AMBER, PLUM, GO, BLUE, RED } from "./DraftWorld";

/* =========================================================================
   REEL 84 "ROLES" · THE GITHUB SURFACES.

   The note that produced this file: "the first few are horrible, we need to
   see more related to the GitHub repo." The draft world was carrying the
   drama but the claim — ONE REPO — was nowhere on screen.

   So the reel now OPENS on the repo itself and the arena grows out of it:
   the file tree of 20 division folders IS the draft board.

   ⛔ GitHub's LIGHT theme, not dark. Two reasons, both rules:
     · memory `feedback_reel_matte_palette` — screens are LIGHT paper UI, never
       neon-on-black.
     · docs/THE-OPEN.md — frame 0 must clear 140 luma. A dark-theme repo page
       opens at ~30 and fails the gate outright.
   Light is also GitHub's default, so it is the more faithful of the two.

   Built in vector rather than screenshotted: public/gh/agency.png turned out to
   be the repo OWNER'S AVATAR — a real person's face, which is not going in a
   reel. Same call reel 83 made for Cursor / Claude Code / Codex.
   ========================================================================= */

/* GitHub light-theme tokens */
export const GH_BG = "#FFFFFF", GH_SUBTLE = "#F6F8FA", GH_BORDER = "#D0D7DE";
export const GH_TEXT = "#1F2328", GH_MUTED = "#59636E", GH_LINK = "#0969DA";
export const GH_STAR = "#EAC54F", GH_GREEN = "#1F883D", GH_HEADER = "#24292F";
export const GH_FOLDER = "#54AEFF";

/** the repo the VO's numbers actually belong to (verified against the API) */
export const REPO_OWNER = "jnMetaCode";
export const REPO_NAME = "agency-agents-zh";
export const REPO_STARS = 18585;

/** the GitHub mark */
export const Octocat: React.FC<{ s?: number; c?: string }> = ({ s = 32, c = "#FFFFFF" }) => (
  <svg width={s} height={s} viewBox="0 0 16 16" fill={c}>
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

const Star: React.FC<{ s?: number; c?: string }> = ({ s = 20, c = GH_STAR }) => (
  <svg width={s} height={s} viewBox="0 0 16 16" fill={c}>
    <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25z" />
  </svg>
);

const FolderIcon: React.FC<{ s?: number }> = ({ s = 18 }) => (
  <svg width={s} height={s} viewBox="0 0 16 16" fill={GH_FOLDER}>
    <path d="M1.75 1A1.75 1.75 0 0 0 0 2.75v10.5C0 14.216.784 15 1.75 15h12.5A1.75 1.75 0 0 0 16 13.25v-8.5A1.75 1.75 0 0 0 14.25 3h-6.5a.25.25 0 0 1-.2-.1l-.9-1.2C6.32 1.26 5.884 1 5.42 1H1.75z" />
  </svg>
);

/** a counter that TICKS to its value — the number moves, it is never typeset at it */
export const StarCount: React.FC<{ f: number; a: number; b: number; to?: number }> =
  ({ f, a, b, to = REPO_STARS }) => {
  const v = Math.round(E(f, a, b, 0, to, OUT));
  return <>{v.toLocaleString("en-US")}</>;
};

/* ------------------------------------------------------------- the page -- */

/**
 * A GitHub repo page. `mode` picks what the page is doing:
 *   "head"   — the repo header, the star button ticking up
 *   "tree"   — the file tree, 20 division folders
 *   "single" — the tree with ONE folder pulled out and highlighted
 */
export const RepoPage: React.FC<{
  f: number; x?: number; y?: number; w?: number; h?: number;
  starA?: number; starB?: number; hi?: number; scroll?: number; pad?: number; z?: number;
}> = ({ f, x = 0, y = 0, w = 1012, h = 792, starA = 6, starB = 30, hi = -1, scroll = 0,
        pad = 0, z = 10 }) => {
  const k = w / 1012;                                     // one scale for the whole page
  const rowH = 46 * k;
  /* `pad` grows the app bar so the breadcrumb clears the house HookHeader. The
     repo name IS the claim of these shots — it cannot sit under the header. */
  const BAR = 62 * k + pad, CRUMB = BAR + 78 * k, TABS = CRUMB + 48 * k;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
      background: GH_BG, overflow: "hidden", fontFamily: inter.fontFamily }}>

      {/* ---- the dark app bar ---- */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: BAR,
        background: GH_HEADER, display: "flex", alignItems: "flex-end", gap: 14 * k,
        paddingLeft: 18 * k, paddingBottom: 15 * k, boxSizing: "border-box" }}>
        <Octocat s={34 * k} />
        <div style={{ width: 300 * k, height: 32 * k, borderRadius: 7 * k,
          border: `1px solid #4C525A`, background: "#2E343B" }}>
          <div style={{ padding: `${7 * k}px ${10 * k}px`, fontSize: 15 * k, color: "#8B949E" }}>
            Search or jump to…
          </div>
        </div>
        <div style={{ flex: 1 }} />
        {["Pull requests", "Issues"].map((t) => (
          <div key={t} style={{ fontSize: 15 * k, fontWeight: 600, color: "#E6EDF3" }}>{t}</div>
        ))}
        <div style={{ width: 30 * k, height: 30 * k, borderRadius: "50%", background: "#57606A",
          marginRight: 18 * k }} />
      </div>

      {/* ---- breadcrumb + star ---- */}
      <div style={{ position: "absolute", left: 0, right: 0, top: BAR, height: 78 * k,
        borderBottom: `1px solid ${GH_BORDER}`, display: "flex", alignItems: "center",
        paddingLeft: 22 * k, paddingRight: 22 * k, boxSizing: "border-box", gap: 10 * k }}>
        <div style={{ width: 26 * k, height: 26 * k, borderRadius: 5 * k, background: "#8250DF" }} />
        <div style={{ fontSize: 27 * k, color: GH_LINK, fontWeight: 500 }}>{REPO_OWNER}</div>
        <div style={{ fontSize: 27 * k, color: GH_MUTED }}>/</div>
        <div style={{ fontSize: 27 * k, color: GH_LINK, fontWeight: 800 }}>{REPO_NAME}</div>
        <div style={{ padding: `${3 * k}px ${11 * k}px`, borderRadius: 20 * k, fontSize: 14 * k,
          border: `1px solid ${GH_BORDER}`, color: GH_MUTED }}>Public</div>
        <div style={{ flex: 1 }} />
        {/* the star button — the claim, as a control the viewer has clicked before */}
        <div style={{ display: "flex", alignItems: "center", height: 40 * k, borderRadius: 7 * k,
          border: `1px solid ${GH_BORDER}`, background: GH_SUBTLE, overflow: "hidden",
          transform: `scale(${1 + Math.max(0, 1 - Math.abs(f - starB) / 8) * 0.09})`,
          transformOrigin: "100% 50%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7 * k, padding: `0 ${13 * k}px` }}>
            <Star s={19 * k} />
            <div style={{ fontSize: 16 * k, fontWeight: 700, color: GH_TEXT }}>Star</div>
          </div>
          <div style={{ width: 1, height: 40 * k, background: GH_BORDER }} />
          <div style={{ padding: `0 ${15 * k}px`, fontSize: 17 * k, fontWeight: 800, color: GH_TEXT }}>
            <StarCount f={f} a={starA} b={starB} />
          </div>
        </div>
      </div>

      {/* ---- tabs ---- */}
      <div style={{ position: "absolute", left: 0, right: 0, top: CRUMB, height: 48 * k,
        borderBottom: `1px solid ${GH_BORDER}`, display: "flex", alignItems: "flex-end",
        paddingLeft: 22 * k, gap: 24 * k, boxSizing: "border-box" }}>
        {["Code", "Issues", "Pull requests", "Actions", "Insights"].map((t, i) => (
          <div key={t} style={{ paddingBottom: 10 * k, fontSize: 16 * k,
            fontWeight: i === 0 ? 800 : 500, color: i === 0 ? GH_TEXT : GH_MUTED,
            borderBottom: i === 0 ? `3px solid #FD8C73` : "none" }}>{t}</div>
        ))}
      </div>

      {/* ---- the file-tree card: 20 DIVISION FOLDERS. this is the draft board. ---- */}
      <div style={{ position: "absolute", left: 22 * k, top: TABS + 20 * k, width: w - 44 * k,
        height: h - TABS - 44 * k, borderRadius: 9 * k, border: `1px solid ${GH_BORDER}`,
        overflow: "hidden", background: GH_BG }}>
        {/* the latest-commit strip */}
        <div style={{ height: 50 * k, background: GH_SUBTLE, borderBottom: `1px solid ${GH_BORDER}`,
          display: "flex", alignItems: "center", gap: 10 * k, paddingLeft: 14 * k }}>
          <div style={{ width: 22 * k, height: 22 * k, borderRadius: "50%", background: "#8250DF" }} />
          <div style={{ fontSize: 14 * k, fontWeight: 700, color: GH_TEXT }}>jnMetaCode</div>
          <div style={{ fontSize: 14 * k, color: GH_MUTED }}>add 268 agents across 20 divisions</div>
          <div style={{ flex: 1 }} />
          <div style={{ fontSize: 13 * k, color: GH_MUTED, paddingRight: 14 * k }}>268 commits</div>
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 50 * k, bottom: 0,
          overflow: "hidden" }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: -scroll }}>
            {DEPTS.map((d, i) => (
              <div key={d} style={{ height: rowH, display: "flex", alignItems: "center",
                gap: 11 * k, paddingLeft: 14 * k, boxSizing: "border-box",
                borderBottom: `1px solid ${GH_BORDER}`,
                background: i === hi ? "#DDF4FF" : GH_BG }}>
                <FolderIcon s={19 * k} />
                <div style={{ fontSize: 17 * k, fontWeight: i === hi ? 800 : 500,
                  color: i === hi ? GH_TEXT : GH_LINK }}>{d.toLowerCase()}</div>
                <div style={{ flex: 1 }} />
                <div style={{ fontSize: 13 * k, color: GH_MUTED }}>
                  {[13, 14, 12, 11, 15, 12, 13, 14, 12, 13, 15, 11, 14, 13, 12, 14, 13, 12, 15, 12][i]} agents
                </div>
                <div style={{ fontSize: 13 * k, color: GH_MUTED, paddingRight: 14 * k,
                  width: 92 * k, textAlign: "right" }}>2 days ago</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/** the repo shown on the arena jumbotron — the same claim, at stadium scale */
export const Jumbotron: React.FC<{
  f: number; x: number; y: number; w?: number; h?: number; starA?: number; starB?: number; z?: number;
}> = ({ f, x, y, w = 620, h = 300, starA = 0, starB = 24, z = 12 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
    background: "#0E1620", borderRadius: 10, border: "8px solid #2A3644",
    boxShadow: "0 16px 24px rgba(6,10,16,0.6)", overflow: "hidden",
    fontFamily: inter.fontFamily }}>
    {/* the rigging it hangs from */}
    <div style={{ position: "absolute", left: w / 2 - 40, top: -34, width: 6, height: 30,
      background: "#2A3644" }} />
    <div style={{ position: "absolute", left: w / 2 + 34, top: -34, width: 6, height: 30,
      background: "#2A3644" }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 52,
      background: "#182430", display: "flex", alignItems: "center", gap: 12, paddingLeft: 16 }}>
      <Octocat s={26} />
      <div style={{ fontSize: 20, fontWeight: 800, color: "#E6EDF3" }}>
        {REPO_OWNER} / {REPO_NAME}
      </div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 68, textAlign: "center",
      fontSize: 96, fontWeight: 900, letterSpacing: "-0.04em", color: "#FFF3D0" }}>
      <StarCount f={f} a={starA} b={starB} />
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 186, textAlign: "center",
      display: "flex", justifyContent: "center", alignItems: "center", gap: 10 }}>
      <Star s={26} />
      <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: "0.2em", color: "#9FB0C0" }}>
        STARS
      </div>
    </div>
    {/* the pixel-grid texture that makes it read as an LED wall, not a poster */}
    {Array.from({ length: 26 }, (_, i) => (
      <div key={i} style={{ position: "absolute", left: i * (w / 26), top: 52, width: 1, bottom: 0,
        background: "#16212C" }} />
    ))}
  </div>
);

/** a terminal card — `git clone`, the one action the viewer has to take */
export const CloneCard: React.FC<{
  f: number; x: number; y: number; w?: number; at?: number; z?: number;
}> = ({ f, x, y, w = 640, at = 0, z = 26 }) => {
  const cmd = `git clone github.com/${REPO_OWNER}/${REPO_NAME}`;
  const n = Math.max(0, Math.min(cmd.length, Math.round((f - at) * 1.5)));
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, borderRadius: 10, zIndex: z,
      background: "#0E1620", border: "2px solid #2A3644", overflow: "hidden",
      boxShadow: "0 14px 20px rgba(6,10,16,0.6)", fontFamily: inter.fontFamily }}>
      <div style={{ height: 34, background: "#182430", display: "flex", alignItems: "center", gap: 7,
        paddingLeft: 12 }}>
        {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
          <div key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c }} />
        ))}
      </div>
      <div style={{ padding: "16px 18px", fontSize: 21, fontWeight: 700, color: "#7EE787",
        whiteSpace: "nowrap" }}>
        <span style={{ color: "#58A6FF" }}>$ </span>{cmd.slice(0, n)}
        <span style={{ color: "#E6EDF3", opacity: (f % 20) < 11 ? 1 : 0 }}>▌</span>
      </div>
    </div>
  );
};

/**
 * GitHub Copilot in VS Code — the third of the three named tools. Written here
 * rather than in KeyEditors because Copilot IS a GitHub surface, and the reel's
 * whole claim is that one GitHub repo drives all of them.
 */
export const CopilotUI: React.FC<{ f: number; w?: number; h?: number; at?: number }> =
  ({ f, w = 300, h = 220, at = 0 }) => {
  const k = w / 300;
  const line = "build the landing page";
  const n = Math.max(0, Math.min(line.length, Math.round((f - at) * 1.1)));
  return (
    <div style={{ position: "absolute", inset: 0, background: "#FFFFFF", overflow: "hidden",
      fontFamily: inter.fontFamily }}>
      {/* VS Code activity rail */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 30 * k,
        background: "#F3F3F3", borderRight: `1px solid #E5E5E5` }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{ position: "absolute", left: 8 * k, top: (12 + i * 26) * k,
            width: 14 * k, height: 14 * k, borderRadius: 3 * k,
            background: i === 3 ? "#6E40C9" : "#B9B9B9" }} />
        ))}
      </div>
      {/* tab strip */}
      <div style={{ position: "absolute", left: 30 * k, right: 0, top: 0, height: 26 * k,
        background: "#F3F3F3", borderBottom: `1px solid #E5E5E5`, display: "flex" }}>
        <div style={{ padding: `${6 * k}px ${11 * k}px`, fontSize: 10 * k, fontWeight: 700,
          background: "#FFFFFF", color: "#1F2328" }}>index.tsx</div>
        <div style={{ padding: `${6 * k}px ${11 * k}px`, fontSize: 10 * k, color: "#6E7781" }}>
          hero.css
        </div>
      </div>
      {/* code with gutter */}
      {Array.from({ length: 7 }, (_, i) => (
        <React.Fragment key={i}>
          <div style={{ position: "absolute", left: 36 * k, top: (34 + i * 15) * k,
            fontSize: 9 * k, color: "#8C959F" }}>{i + 1}</div>
          <div style={{ position: "absolute", left: 52 * k, top: (37 + i * 15) * k,
            width: [92, 128, 74, 146, 104, 62, 118][i] * k, height: 6 * k, borderRadius: 2 * k,
            background: ["#CF222E", "#0550AE", "#8250DF", "#0A3069", "#0550AE", "#CF222E", "#0A3069"][i] }} />
        </React.Fragment>
      ))}
      {/* the Copilot chat panel */}
      <div style={{ position: "absolute", right: 0, top: 26 * k, bottom: 0, width: 118 * k,
        background: "#F6F8FA", borderLeft: `1px solid #D0D7DE` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5 * k,
          padding: `${7 * k}px ${8 * k}px` }}>
          <Octocat s={12 * k} c="#1F2328" />
          <div style={{ fontSize: 9 * k, fontWeight: 800, color: "#1F2328" }}>Copilot</div>
        </div>
        <div style={{ margin: `0 ${8 * k}px`, padding: `${6 * k}px`, borderRadius: 5 * k,
          background: "#FFFFFF", border: `1px solid ${GH_BORDER}`, fontSize: 8.5 * k,
          fontWeight: 600, color: GH_TEXT, minHeight: 26 * k }}>
          {line.slice(0, n)}
          <span style={{ opacity: (f % 20) < 11 ? 1 : 0 }}>▌</span>
        </div>
        {/* the roster answering, one division per row */}
        {["design", "content", "engineering"].map((d, i) => (
          <div key={d} style={{ position: "absolute", left: 8 * k, top: (72 + i * 22) * k,
            width: 102 * k, height: 17 * k, borderRadius: 4 * k,
            background: [PLUM, GO, AMBER][i],
            transform: `scaleX(${Math.max(0.02, E(f, at + 16 + i * 5, at + 26 + i * 5, 0, 1, OUT))})`,
            transformOrigin: "0% 50%" }}>
            <div style={{ padding: `${3.5 * k}px ${7 * k}px`, fontSize: 8.5 * k, fontWeight: 800,
              color: "#FFF8ED" }}>{d}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
