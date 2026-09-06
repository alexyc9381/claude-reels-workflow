import React from "react";
import { AbsoluteFill } from "remotion";
import { fraunces, inter } from "./fonts";
import { Mascot } from "./ClaudeOsReel";

/* =========================================================================
   AI CREATORS GUILD — gallery stills, 1920x1080.

   Adapted from AiFoundersGuildCover, which was written for the OLD product
   name and was never registered in Root.tsx, so it had drifted:

     · "AI Founders Guild"      -> the product is AI CREATORS GUILD
     · "Turn AI into income"    -> superseded positioning
     · a LIME highlight slab    -> not in the Guild palette, and Alex called it

   ⛔ ONE PALETTE, TAKEN FROM THE LIVE SITE, not from the reel world. The reels
   run on clay #D2724E; school.chen.media runs on ember #FF6A00 with #C24C00 for
   anything carrying weight on cream. A gallery image sits ON that page, so it
   uses the page's colours. The mascots keep their own clay body, which is what
   makes them read as the same characters across both.
   ========================================================================= */

const PAPER = "#F4F3F1", PAPER2 = "#EAE7E2", INK = "#14120F";
const EMBER = "#FF6A00", DEEP = "#C24C00", MUTE = "#6E675E";

const seed = (n: number) => { const x = Math.sin(n * 127.1 + 43.7) * 43758.5453; return x - Math.floor(x); };

const Bg: React.FC = () => (
  <AbsoluteFill style={{ background: `linear-gradient(152deg, ${PAPER} 0%, ${PAPER2} 100%)` }}>
    <div style={{ position: "absolute", left: 820, top: 180, width: 1200, height: 1200, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,106,0,0.10), transparent 62%)", filter: "blur(16px)" }} />
    <div style={{ position: "absolute", left: -160, top: -200, width: 900, height: 900, background: "radial-gradient(circle at 34% 34%, rgba(255,255,255,0.7), transparent 60%)" }} />
    {Array.from({ length: 22 }, (_, i) => (
      <div key={i} style={{ position: "absolute", left: seed(i * 2.3) * 1920, top: seed(i * 1.7) * 1080, width: 2 + seed(i) * 3, height: 2 + seed(i) * 3, borderRadius: "50%", background: i % 2 ? "rgba(120,110,95,0.09)" : "rgba(255,255,255,0.55)" }} />
    ))}
    <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 300px rgba(60,50,38,0.10)" }} />
  </AbsoluteFill>
);

const Shadow: React.FC<{ cx: number; cy: number; w: number; op?: number }> = ({ cx, cy, w, op = 0.2 }) => (
  <div style={{ position: "absolute", left: cx - w / 2, top: cy, width: w, height: w * 0.2, borderRadius: "50%", background: `radial-gradient(ellipse, rgba(50,42,32,${op}), transparent 70%)`, filter: "blur(3px)" }} />
);

const Squiggle: React.FC<{ w: number; color?: string; sw?: number }> = ({ w, color = DEEP, sw = 6 }) => (
  <svg width={w} height={18} viewBox="0 0 160 13" preserveAspectRatio="none" style={{ display: "block", overflow: "visible" }}>
    <path d="M2 7 C 26 2, 52 11, 78 6 S 128 2, 158 7" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" />
  </svg>
);

type Member = { costume: Record<string, number>; size: number; cx: number; base: number; gaze: number; tint?: string; extra?: Record<string, number> };
const GuildMember: React.FC<{ m: Member; lf: number }> = ({ m, lf }) => (
  <div style={{ position: "absolute", left: m.cx - m.size / 2, top: m.base - m.size * 0.92, width: m.size, height: m.size }}>
    <Mascot lf={lf} size={m.size} gaze={m.gaze} nodAmp={0} nodSpeed={10} tint={m.tint} {...(m.costume as any)} {...(m.extra as any)} />
  </div>
);

export const GuildCover: React.FC = () => {
  const back: Member[] = [
    { costume: { wizard: 1 }, size: 268, cx: 1350, base: 800, gaze: 1, tint: "#C98A6E", extra: { cheer: 0.2 } },
    { costume: { beret: 1 }, size: 274, cx: 1596, base: 802, gaze: -1, tint: "#C98A6E" },
  ];
  const front: Member[] = [
    { costume: { capBack: 1 }, size: 292, cx: 1238, base: 902, gaze: 2, extra: { cheer: 0.26 } },
    { costume: { hardHat: 1 }, size: 380, cx: 1472, base: 910, gaze: 0, extra: { cheer: 0.13 } },
    { costume: { glasses: 1 }, size: 306, cx: 1722, base: 900, gaze: -2 },
  ];
  return (
    <AbsoluteFill style={{ fontFamily: inter.fontFamily }}>
      <Bg />
      <div style={{ position: "absolute", left: 1010, top: 300, width: 920, height: 760, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(255,252,248,0.75), transparent 66%)" }} />

      <div style={{ position: "absolute", left: 116, top: 0, height: 1080, width: 1010, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 600, color: INK, letterSpacing: "-0.035em", lineHeight: 0.9 }}>
          <div style={{ fontSize: 148 }}>AI Creators</div>
          {/* ⛔ NO HIGHLIGHT SLAB. The word carries itself at 196; a coloured block behind it
              was doing the job the size already does, in a colour the brand does not own. */}
          <div style={{ fontSize: 200, marginTop: 14, color: DEEP }}>Guild</div>
        </div>
        <div style={{ marginTop: 46 }}><Squiggle w={360} color={EMBER} sw={6} /></div>
        <div style={{ marginTop: 30, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 52, color: INK, letterSpacing: "-0.015em" }}>
          Go viral on purpose. <span style={{ color: DEEP }}>No camera.</span>
        </div>
      </div>

      <div style={{ position: "absolute", left: 120, bottom: 50, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 40, color: INK, opacity: 0.86, letterSpacing: "-0.01em" }}>@nocodealex</div>

      <Shadow cx={1482} cy={896} w={880} op={0.13} />
      {front.map((m, i) => (<Shadow key={`sf${i}`} cx={m.cx} cy={m.base - 6} w={m.size * 0.74} op={0.2} />))}
      {back.map((m, i) => (<GuildMember key={`b${i}`} m={m} lf={12 + i * 17} />))}
      {front.map((m, i) => (<GuildMember key={`f${i}`} m={m} lf={6 + i * 23} />))}
    </AbsoluteFill>
  );
};

/* ============================================================ the engine
   ⛔ A COVER IS NOT VALUE. The first still said the product's name and nothing
   else, which is a title card. A gallery slot is worth more when it shows what
   the member actually gets, so this one puts the weekly loop on screen: four
   stations, a mascot working each, and the same brief travelling through them.
   ========================================================================= */

const Card: React.FC<{ x: number; y: number; w: number; h: number; children?: React.ReactNode }> = ({ x, y, w, h, children }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, background: "#fff", borderRadius: 22,
                border: "1px solid #E3E1DD", boxShadow: "0 18px 40px rgba(40,32,24,0.10)" }}>{children}</div>
);
const Bar: React.FC<{ x: number; y: number; w: number; h?: number; c?: string; r?: number }> = ({ x, y, w, h = 12, c = "#E2DFDA", r = 6 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, background: c, borderRadius: r }} />
);
const Tag: React.FC<{ x: number; y: number; n: string }> = ({ x, y, n }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 52, height: 52, borderRadius: 15, background: DEEP,
                color: "#fff", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 26,
                display: "flex", alignItems: "center", justifyContent: "center" }}>{n}</div>
);

/* ---- the artefact each station is working ON --------------------------
   ⛔ A SPRITE IN A BOX IS A PORTRAIT, NOT A STATION. The first version put a
   costumed mascot in each card and called it a workflow, but a brain hat does
   not say "idea" and a hard hat does not say "edit". Each card now carries the
   thing being made, and the mascot stands BEHIND it, so the panel reads as a
   workstation the character is at rather than decoration beside them. */

const Hooks: React.FC<{ w: number; h: number }> = ({ w, h }) => (
  <>
    {[["the repo nobody uses", 0], ["202 agents, free", 1], ["why your edit dies", 0]].map(([t, on], i) => (
      <div key={i} style={{ position: "absolute", left: on ? -10 : 0, top: i * (h / 3), width: on ? w + 20 : w, height: h / 3 - 14,
        borderRadius: 12, background: on ? "#FFF1E6" : "#FAF9F8",
        border: `${on ? 3 : 1}px solid ${on ? EMBER : "#E7E4DF"}`,
        boxShadow: on ? "0 12px 26px rgba(194,76,0,0.18)" : "none",
        display: "flex", alignItems: "center", paddingLeft: 18, boxSizing: "border-box",
        fontWeight: on ? 900 : 600, fontSize: on ? 26 : 21, color: on ? DEEP : "#B3ACA3" }}>{t as string}</div>
    ))}
  </>
);
const Lines: React.FC<{ w: number; h: number }> = ({ w, h }) => (
  <div style={{ position: "absolute", inset: 0, background: "#FAF9F8", border: "1px solid #E7E4DF", borderRadius: 14, padding: 22, boxSizing: "border-box" }}>
    {[0.9, 0.72, 0.84, 0.55].map((f, i) => (
      <div key={i} style={{ position: "absolute", left: 22, top: 26 + i * 34, width: (w - 44) * f, height: 14, borderRadius: 7, background: "#E2DFDA" }} />
    ))}
    <div style={{ position: "absolute", left: 22, top: 26 + 4 * 34, width: (w - 44) * 0.46, height: 18, borderRadius: 9, background: EMBER }} />
    <div style={{ position: "absolute", left: 22 + (w - 44) * 0.46 + 10, top: 24 + 4 * 34, width: 4, height: 22, background: DEEP }} />
  </div>
);
const Timeline: React.FC<{ w: number; h: number }> = ({ w, h }) => {
  const tints = ["#F6D9C4", "#EFC9AE", "#F8E2D2", "#EBBE9E", "#F3D2BB"];
  const cuts: [number, number][] = [[0, .22], [.24, .48], [.5, .61], [.63, .84], [.86, 1]];
  return (
    <>
      {cuts.map(([a2, b2], i) => (
        <div key={i} style={{ position: "absolute", left: w * a2, top: 0, width: w * (b2 - a2), height: h * 0.52,
          borderRadius: 8, background: tints[i], border: "1px solid #E0B593", overflow: "hidden" }}>
          <div style={{ position: "absolute", left: "18%", top: "24%", width: "64%", height: "34%", borderRadius: 4, background: "rgba(255,255,255,0.55)" }} />
        </div>
      ))}
      {Array.from({ length: Math.floor(w / 8) }, (_, i) => (
        <div key={`w${i}`} style={{ position: "absolute", left: i * 8, top: h * 0.66 - (6 + (i * 41) % 22) / 2, width: 4, height: 6 + (i * 41) % 22, background: "#D8D3CC", borderRadius: 2 }} />
      ))}
      <div style={{ position: "absolute", left: w * 0.63 - 2, top: -8, width: 4, height: h * 0.86, background: DEEP, borderRadius: 2 }} />
    </>
  );
};
const Phone: React.FC<{ w: number; h: number }> = ({ w, h }) => (
  <div style={{ position: "absolute", left: w / 2 - h * 0.30, top: 0, width: h * 0.60, height: h, borderRadius: 22,
                background: "#fff", border: "3px solid #CFCAC3", boxShadow: "0 16px 34px rgba(40,32,24,0.14)", overflow: "hidden" }}>
    <div style={{ position: "absolute", inset: 10, borderRadius: 14, background: "linear-gradient(160deg,#F3E2D4,#E9CBB2)" }} />
    <svg style={{ position: "absolute", left: h * 0.30 - 22, top: h * 0.36 }} width={46} height={48}><path d="M4 2 L42 24 L4 46 Z" fill={DEEP} /></svg>
    <div style={{ position: "absolute", left: 22, right: 22, bottom: 34, height: 16, borderRadius: 5, background: EMBER }} />
    <div style={{ position: "absolute", left: 34, right: 34, bottom: 16, height: 10, borderRadius: 5, background: "rgba(20,18,15,0.18)" }} />
  </div>
);

export const GuildEngine: React.FC = () => {
  /* ⛔ ONE FOCUS PER CARD, AND ONE CHARACTER PER SLIDE. The previous pass put a mascot AND
     an artefact in every card, so each one had two things competing at the same weight and
     the same sprite appeared four times. The artefact is the hero now, drawn large, and a
     single mascot carries the whole slide from the footer. */
  const CW = 392, CH = 470, TOP = 286, GAP = 34, L = 96;
  // ⛔ ONE WORD PER CARD. The sublines repeated what the picture already showed, so four
  // cards carried nine lines of copy between them and the graphics had to shrink to fit.
  const stations = [{ n: "1", t: "Idea" }, { n: "2", t: "Script" }, { n: "3", t: "Edit" }, { n: "4", t: "Post" }];
  return (
    <AbsoluteFill style={{ fontFamily: inter.fontFamily }}>
      <Bg />
      <div style={{ position: "absolute", left: L, top: 92, fontWeight: 900, fontSize: 92, letterSpacing: "-0.03em", color: INK }}>
        THE CONTENT <span style={{ color: DEEP }}>ENGINE</span>
      </div>
      <div style={{ position: "absolute", left: L + 4, top: 206, fontWeight: 600, fontSize: 34, color: MUTE }}>
        One post going viral is luck. Doing it again next week is a system.
      </div>

      {stations.map((st, i) => {
        const x = L + i * (CW + GAP);
        const IW = CW - 88;
        return (
          <React.Fragment key={st.n}>
            <Card x={x} y={TOP} w={CW} h={CH} />
            <Tag x={x + 44} y={TOP + 32} n={st.n} />
            {/* the one hero, vertically centred in its own band */}
            <div style={{ position: "absolute", left: x + 44, top: TOP + 108, width: IW, height: 236 }}>
              {i === 0 && <Hooks w={IW} h={236} />}
              {i === 1 && <Lines w={IW} h={236} />}
              {i === 2 && <Timeline w={IW} h={236} />}
              {i === 3 && <Phone w={IW} h={236} />}
            </div>
            <div style={{ position: "absolute", left: x + 44, top: TOP + 378, fontWeight: 900, fontSize: 52, color: INK, letterSpacing: "-0.02em" }}>{st.t}</div>
            {i < 3 && (
              <svg style={{ position: "absolute", left: x + CW + 2, top: TOP + CH / 2 - 18 }} width={GAP - 4} height={36}>
                <path d={`M2 18 H ${GAP - 20}`} stroke={EMBER} strokeWidth={5} strokeLinecap="round" />
                <path d={`M${GAP - 22} 6 L ${GAP - 6} 18 L ${GAP - 22} 30 Z`} fill={EMBER} />
              </svg>
            )}
          </React.Fragment>
        );
      })}

      {/* the one character on the slide */}
      <div style={{ position: "absolute", left: L - 8, top: 806, width: 200, height: 200 }}>
        <Mascot lf={14} size={200} gaze={1} nodAmp={0} nodSpeed={10} hardHat={1} cheer={0.28} />
      </div>
      <div style={{ position: "absolute", left: L + 6, top: 972, width: 190, height: 20, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(50,42,32,0.16), transparent 70%)", filter: "blur(3px)" }} />

      <div style={{ position: "absolute", left: L + 250, top: 896, fontWeight: 900, fontSize: 44, color: INK, letterSpacing: "-0.02em" }}>
        Every week. <span style={{ color: DEEP }}>You pick, it makes.</span>
      </div>
    </AbsoluteFill>
  );
};

/* ======================================================= shared furniture */
const Head: React.FC<{ a: string; b: string; sub?: string; L?: number }> = ({ a, b, sub, L = 96 }) => (
  <>
    <div style={{ position: "absolute", left: L, top: 92, fontWeight: 900, fontSize: 92, letterSpacing: "-0.03em", color: INK }}>
      {a} <span style={{ color: DEEP }}>{b}</span>
    </div>
    {sub && <div style={{ position: "absolute", left: L + 4, top: 206, fontWeight: 600, fontSize: 34, color: MUTE }}>{sub}</div>}
  </>
);
const Foot: React.FC<{ a: string; b: string; costume?: Record<string, number>; L?: number }> = ({ a, b, costume = { hardHat: 1 }, L = 96 }) => (
  <>
    <div style={{ position: "absolute", left: L - 8, top: 806, width: 200, height: 200 }}>
      <Mascot lf={14} size={200} gaze={1} nodAmp={0} nodSpeed={10} cheer={0.28} {...(costume as any)} />
    </div>
    <div style={{ position: "absolute", left: L + 6, top: 972, width: 190, height: 20, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(50,42,32,0.16), transparent 70%)", filter: "blur(3px)" }} />
    <div style={{ position: "absolute", left: L + 250, top: 896, fontWeight: 900, fontSize: 44, color: INK, letterSpacing: "-0.02em" }}>
      {a} <span style={{ color: DEEP }}>{b}</span>
    </div>
  </>
);
const Row: React.FC<{ heroes: React.ReactNode[]; labels: string[]; arrows?: boolean }> = ({ heroes, labels, arrows = false }) => {
  const CW = 392, CH = 470, TOP = 286, GAP = 34, L = 96, IW = CW - 88;
  return (
    <>
      {labels.map((t, i) => {
        const x = L + i * (CW + GAP);
        return (
          <React.Fragment key={t}>
            <Card x={x} y={TOP} w={CW} h={CH} />
            <Tag x={x + 44} y={TOP + 32} n={String(i + 1)} />
            <div style={{ position: "absolute", left: x + 44, top: TOP + 108, width: IW, height: 236 }}>{heroes[i]}</div>
            <div style={{ position: "absolute", left: x + 44, top: TOP + 378, fontWeight: 900, fontSize: 52, color: INK, letterSpacing: "-0.02em" }}>{t}</div>
            {arrows && i < labels.length - 1 && (
              <svg style={{ position: "absolute", left: x + CW + 2, top: TOP + CH / 2 - 18 }} width={GAP - 4} height={36}>
                <path d={`M2 18 H ${GAP - 20}`} stroke={EMBER} strokeWidth={5} strokeLinecap="round" />
                <path d={`M${GAP - 22} 6 L ${GAP - 6} 18 L ${GAP - 22} 30 Z`} fill={EMBER} />
              </svg>
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};

/* ========================================================== FOUR WAYS */
const IW2 = 304;
const Views: React.FC = () => (
  <>
    {[0.30, 0.46, 0.62, 0.80, 1.0].map((f, i) => (
      <div key={i} style={{ position: "absolute", left: i * 62, bottom: 40, width: 46, height: 168 * f, borderRadius: 8,
        background: i === 4 ? EMBER : "#F0D9C6", border: `1px solid ${i === 4 ? DEEP : "#E3C4AC"}` }} />
    ))}
    <div style={{ position: "absolute", left: 0, bottom: 0, fontWeight: 900, fontSize: 30, color: DEEP }}>views</div>
  </>
);
const Brand: React.FC = () => (
  <div style={{ position: "absolute", inset: 0, borderRadius: 16, background: "#FAF9F8", border: "1px solid #E7E4DF", padding: 24, boxSizing: "border-box" }}>
    <div style={{ position: "absolute", left: 24, top: 24, width: 62, height: 62, borderRadius: 16, background: EMBER }} />
    <div style={{ position: "absolute", left: 102, top: 34, width: 120, height: 14, borderRadius: 7, background: "#DEDAD4" }} />
    <div style={{ position: "absolute", left: 102, top: 60, width: 76, height: 12, borderRadius: 6, background: "#E7E4DF" }} />
    <div style={{ position: "absolute", left: 24, top: 116, fontWeight: 900, fontSize: 58, color: INK }}>$2,000</div>
    <div style={{ position: "absolute", left: 24, top: 186, width: 150, height: 34, borderRadius: 17, background: "#FFF1E6", border: `2px solid ${EMBER}`, color: DEEP, fontWeight: 800, fontSize: 17, display: "flex", alignItems: "center", justifyContent: "center" }}>per post</div>
  </div>
);
const Cut: React.FC = () => (
  <>
    <div style={{ position: "absolute", left: 6, top: 46, width: 132, height: 132, borderRadius: "50%", border: `10px solid ${DEEP}` }} />
    <div style={{ position: "absolute", left: 108, top: 46, width: 132, height: 132, borderRadius: "50%", border: `10px solid ${EMBER}` }} />
    <div style={{ position: "absolute", left: 0, bottom: 6, fontWeight: 900, fontSize: 30, color: DEEP }}>a cut of it</div>
  </>
);
const Own: React.FC = () => (
  <div style={{ position: "absolute", left: 34, top: 0, width: IW2 - 68, height: 208, borderRadius: 18, background: "#fff",
                border: "1px solid #E3E1DD", boxShadow: "0 14px 30px rgba(40,32,24,0.12)" }}>
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 86, borderTopLeftRadius: 17, borderTopRightRadius: 17, background: "linear-gradient(150deg,#F3E2D4,#E9CBB2)" }} />
    <div style={{ position: "absolute", left: 22, top: 108, width: 120, height: 14, borderRadius: 7, background: "#DEDAD4" }} />
    <div style={{ position: "absolute", left: 22, top: 140, fontWeight: 900, fontSize: 42, color: DEEP }}>$49</div>
  </div>
);
export const GuildPaid: React.FC = () => (
  <AbsoluteFill style={{ fontFamily: inter.fontFamily }}>
    <Bg />
    <Head a="FOUR WAYS TO" b="GET PAID" sub="Every one of them is priced off the same thing." />
    <Row heroes={[<Views key="v" />, <Brand key="b" />, <Cut key="c" />, <Own key="o" />]}
         labels={["Views", "Brands", "Affiliate", "Your own"]} />
    <Foot a="People who actually watch." b="That is what the systems build." costume={{ glasses: 1 }} />
  </AbsoluteFill>
);

/* ========================================================== INSIDE */
const Num: React.FC<{ n: string; k: string }> = ({ n, k }) => (
  <>
    <div style={{ position: "absolute", left: 0, top: 18, fontWeight: 900, fontSize: 132, color: DEEP, letterSpacing: "-0.04em", lineHeight: 1 }}>{n}</div>
    <div style={{ position: "absolute", left: 0, top: 168, fontWeight: 700, fontSize: 26, color: MUTE }}>{k}</div>
  </>
);
export const GuildInside: React.FC = () => (
  <AbsoluteFill style={{ fontFamily: inter.fontFamily }}>
    <Bg />
    <Head a="EVERYTHING" b="INSIDE" sub="Live today, not coming soon." />
    <Row heroes={[<Num key="1" n="4" k="animations, avatars, ads, UI" />, <Num key="2" n="8" k="each ends in something real" />,
                  <Num key="3" n="18" k="installed into your setup" />, <Num key="4" n="12" k="one page each" />]}
         labels={["Courses", "Modules", "Skills", "Playbooks"]} />
    <Foot a="Plus Supereditor." b="Guild exclusive." costume={{ brainHat: 1 }} />
  </AbsoluteFill>
);
