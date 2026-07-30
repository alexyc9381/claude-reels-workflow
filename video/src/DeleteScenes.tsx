import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { inter, fraunces } from "./fonts";
import { Bg, Panel, ProgressBar, Mascot, INK, CLAY, CLAYD, GOLD, MUTE, MONO, hexA } from "./SlopKit";
import {
  Room, Binder, Strip, ClipSlot, Chyron, Card, Kicker, Meter,
  WALL, WALL_HI, WALL_LO, WALL_D, WOOD, WOOD_D, WOOD_L,
  PAPER, PAPER2, PAPER3, PAPER4, SH, SH_D,
  RED_M, RED_D, TEAL, PLUM, SLATE, OLIVE, MOSS, E, osc, OUT, IO, BACK,
  Shafts, LampPool, Bloom, Lamp,
} from "./DeleteWorld";

/* =========================================================================
   REEL 81 "DELETE" — scenes 1..8. One world (THE STUDY) so the news and the
   metaphor share a space. The clip monitor reappears in S3 so the real
   footage gets a second, longer look once he has been named.
   ========================================================================= */


/* a compact tag instead of the two-line header: a few words, never a sentence.
   The visual is supposed to carry the point; type is a label, not narration. */
const Tag: React.FC<{ f: number; icon: string; word: string; c?: string }> = ({ f, icon, word, c = CLAY }) => {
  const p = E(f, 0, 9, 0, 1, BACK);
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 322, display: "flex", justifyContent: "center", zIndex: 200, opacity: Math.min(1, p), transform: `translateY(${(1 - p) * -14}px) scale(${0.92 + p * 0.08})` }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 14, padding: "12px 30px 12px 14px", borderRadius: 30, background: "linear-gradient(180deg,#FFFFFF,#F4EEE2)", border: "4px solid #ECE5D6", boxShadow: "0 24px 52px -14px rgba(20,26,45,0.5)" }}>
        <span style={{ width: 74, height: 74, borderRadius: 20, background: c, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40 }}>{icon}</span>
        <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 50, color: INK, whiteSpace: "nowrap", letterSpacing: "-0.01em" }}>{word}</span>
      </div>
    </div>
  );
};

/* ============ S1 · every guide says build a BIGGER setup (4.98) ============ */
export const S1Bigger: React.FC = () => {
  const f = useCurrentFrame();
  const BLOCKS: [string, string][] = [
    ["MEMORY", MOSS], ["COMMANDS", CLAY], ["RULES", OLIVE], ["AGENTS", GOLD],
    ["MCP", SLATE], ["HOOKS", TEAL], ["SKILLS", PLUM], ["CLAUDE.md", RED_M],
  ];
  const BW = 300, BH = 46, GAP = 5, BASE = 566, CX = 372;
  const grow = E(f, 6, 46, 0, 1, OUT);
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <Tag f={f} icon="📚" word="BIGGER" />
      <Panel glow={hexA(GOLD, 0.26)}>
        <Room f={f} deskTop={BASE} shelf={false} />
        {/* the tower of everything the internet told you to add */}
        <div style={{ position: "absolute", inset: 0, transform: `rotate(${osc(f, 16, 1.3)}deg)`, transformOrigin: `${CX}px ${BASE}px` }}>
          {BLOCKS.map(([label, c], i) => {
            const k = BLOCKS.length - 1 - i;
            const on = E(f, 4 + k * 5, 16 + k * 5, 0, 1, BACK);
            return (
              <div key={label} style={{ position: "absolute", left: CX - BW / 2 + (k % 2 ? 15 : -15) + osc(f, 21, 3, k), top: BASE - (k + 1) * (BH + GAP), width: BW, height: BH, borderRadius: 6, background: c, boxShadow: SH, opacity: on, transform: `scale(${0.94 + on * 0.06})` }}>
                <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 9, borderRadius: "6px 6px 0 0", background: "rgba(247,245,240,0.24)" }} />
                <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 7, background: "rgba(26,24,19,0.26)" }} />
                <div style={{ position: "absolute", left: 0, right: 0, top: 12, textAlign: "center", fontFamily: MONO, fontWeight: 900, fontSize: 21, color: PAPER, letterSpacing: 1 }}>{label}</div>
              </div>
            );
          })}
        </div>
        {/* the guides telling you to do it, pinned on the wall */}
        {[[708, 176, -3], [826, 214, 4]].map(([gx, gy, gr], i) => (
          <Card key={i} x={gx as number} y={gy as number} w={220} h={150} rot={gr as number}>
            <div style={{ padding: 14 }}>
              <Kicker>{i ? "TOP 10 SKILLS" : "ULTIMATE SETUP"}</Kicker>
              {[0.9, 0.7, 0.82, 0.6].map((wd, k) => <div key={k} style={{ width: `${wd * 100}%`, height: 9, borderRadius: 4, background: PAPER3, marginTop: 9 }} />)}
              <div style={{ marginTop: 12, padding: "6px 12px", borderRadius: 6, background: CLAY, display: "inline-block", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 13, color: PAPER }}>ADD 6 MORE</div>
            </div>
          </Card>
        ))}
        <Meter x={712} y={402} w={244} label="SETUP SIZE" val={40 + grow * 54} c={RED_M} />
        {/* you, still stacking */}
        <div style={{ position: "absolute", left: 62, top: 350, filter: "drop-shadow(0 18px 24px rgba(26,24,19,0.5))" }}>
          <Mascot lf={f} size={228} cheer={0.4} gaze={2} nodAmp={2.4} nodSpeed={11} />
        </div>
      </Panel>
    </AbsoluteFill>
  );
};

/* ============ S2 · the guy who builds it says THROW IT OUT (7.54) ============ */
export const S2Throw: React.FC = () => {
  const f = useCurrentFrame();
  const jit = osc(f, 2.6, 3);
  const eaten = E(f, 10, 64, 0, 1, IO);
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <Tag f={f} icon="🗑️" word="SHRED IT" />
      <Panel glow={hexA(RED_M, 0.26)}>
        <Room f={f} deskTop={548} shelf={false} />
        <Shafts f={f} n={3} from={150} />
        <LampPool x={240} y={496} w={540} h={128} />
        <Lamp f={f} x={828} y={-18} s={0.82} />
        {/* the shredder */}
        <div style={{ position: "absolute", left: 236, top: 372 + jit * 0.4, width: 400, height: 190 }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: 12, background: RED_M, boxShadow: SH_D }} />
          <div style={{ position: "absolute", left: 8, top: 8, right: 8, height: 12, borderRadius: "8px 8px 0 0", background: "rgba(247,245,240,0.2)" }} />
          <div style={{ position: "absolute", left: 40, top: 34, right: 40, height: 32, borderRadius: 5, background: "#3A1F1C", boxShadow: "inset 0 5px 0 rgba(26,24,19,0.5)" }} />
          {Array.from({ length: 15 }, (_, i) => (
            <div key={i} style={{ position: "absolute", left: 48 + i * 21, top: 40, width: 12, height: 20, borderRadius: 2, background: PAPER4 }} />
          ))}
          <div style={{ position: "absolute", left: 40, top: 94, right: 40, height: 58, borderRadius: 6, background: RED_D }} />
          <div style={{ position: "absolute", left: 56, top: 110, width: 96, height: 28, borderRadius: 4, background: PAPER, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: MONO, fontWeight: 900, fontSize: 17, color: RED_D }}>SHRED</div>
          <div style={{ position: "absolute", right: 56, top: 104, width: 40, height: 40, borderRadius: "50%", background: TEAL, border: "4px solid rgba(26,24,19,0.35)" }} />
        </div>
        {/* the binder going in, sinking as it is eaten */}
        <div style={{ position: "absolute", left: 346, top: 200 + eaten * 150, transform: `rotate(${-4 + jit * 0.6}deg)` }}>
          <Binder x={0} y={0} label="CLAUDE.md" c={RED_M} tabs={3} />
        </div>
        {/* strips out, pile below */}
        {Array.from({ length: 26 }, (_, i) => {
          const t = ((f * 3 + i * 17) % 120) / 120;
          return <Strip key={i} x={252 + (i * 37) % 372} y={556 + t * 190} h={60 + (i % 4) * 22} rot={(i % 2 ? 1 : -1) * (6 + (i % 5) * 5)} c={i % 5 === 0 ? PAPER2 : PAPER} />;
        })}
        {Array.from({ length: 22 }, (_, i) => (
          <Strip key={`p${i}`} x={228 + (i * 41) % 404} y={690 + (i % 3) * 17} h={48 + (i % 3) * 14} rot={70 + (i % 7) * 14} c={i % 4 === 0 ? PAPER2 : PAPER} />
        ))}
        {/* the queue still to go */}
        <div style={{ position: "absolute", left: 726, top: 452 }}><Binder x={0} y={0} label="SKILLS" c={PLUM} s={0.6} rot={-7} tabs={2} /></div>
        <div style={{ position: "absolute", left: 838, top: 468 }}><Binder x={0} y={0} label="HOOKS" c={TEAL} s={0.56} rot={5} tabs={2} /></div>
        <div style={{ position: "absolute", left: 62, top: 340, filter: "drop-shadow(0 18px 24px rgba(26,24,19,0.5))" }}>
          <Mascot lf={f} size={236} shock={0.5} gaze={2} nodAmp={2.2} nodSpeed={11} />
        </div>
      </Panel>
    </AbsoluteFill>
  );
};

/* ============ S3 · who he is — the clip gets a second, longer look (10.10) ============ */
export const S3Who: React.FC = () => {
  const f = useCurrentFrame();
  const cred = (i: number) => E(f, 22 + i * 9, 36 + i * 9, 0, 1, BACK);
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <Tag f={f} icon="🎙️" word="HE BUILT IT" />
      <Panel glow={hexA(SLATE, 0.28)}>
        <div style={{ position: "absolute", inset: 0, background: WALL_D }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 30, height: 470, background: WALL }} />
        {Array.from({ length: 24 }, (_, i) => (
          <div key={i} style={{ position: "absolute", left: 8 + (i % 12) * 85, top: 44 + Math.floor(i / 12) * 152, width: 66, height: 132, borderRadius: 5, background: WALL_HI, boxShadow: "inset 0 -4px 0 rgba(26,24,19,0.16)" }} />
        ))}
        <div style={{ position: "absolute", left: 0, right: 0, top: 500, height: 16, background: WOOD_L }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 514, bottom: 0, background: WOOD }} />

        {/* THE CLIP, hero again now that he has a name */}
        <ClipSlot f={f} x={64} y={112} w={606} h={340} />
        <Chyron x={64} y={478} s={0.94} />

        {/* his credentials, stacked to the right — the authority column */}
        {[["LEAD ENGINEER", "Claude Code"], ["AT", "Anthropic"], ["ON STAGE AT", "Y Combinator"]].map(([k, v], i) => (
          <div key={k} style={{ position: "absolute", left: 700, top: 118 + i * 112, width: 256, opacity: cred(i), transform: `translateX(${(1 - cred(i)) * 24}px)` }}>
            <Card x={0} y={0} w={256} h={94} accent={i === 2 ? TEAL : WOOD}>
              <div style={{ padding: "13px 16px" }}>
                <Kicker c={MUTE}>{k}</Kicker>
                <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 27, color: INK, marginTop: 4 }}>{v}</div>
              </div>
            </Card>
          </div>
        ))}
        <div style={{ position: "absolute", left: 742, top: 462, width: 214, padding: "12px 16px", borderRadius: 10, background: PAPER2, border: `5px solid ${TEAL}`, boxShadow: SH }}>
          <div style={{ fontFamily: MONO, fontWeight: 900, fontSize: 34, color: TEAL, lineHeight: 1 }}>-80%</div>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 13, color: INK, marginTop: 3, lineHeight: 1.25 }}>of Claude Code's system<br />prompts, cut for Opus 5</div>
        </div>
        <div style={{ position: "absolute", left: 396, top: 566, filter: "drop-shadow(0 18px 24px rgba(26,24,19,0.5))" }}>
          <Mascot lf={f} size={224} shock={0.4} gaze={0} nodAmp={2.2} nodSpeed={11} />
        </div>
      </Panel>
    </AbsoluteFill>
  );
};

/* ============ S4 · your rules were written for an OLDER model (14.40) ============ */
export const S4Older: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <Tag f={f} icon="🚲" word="OLD MODEL" />
      <Panel glow={hexA(OLIVE, 0.26)}>
        <Room f={f} deskTop={572} shelf={false} />
        <Shafts f={f} n={3} from={150} />
        <LampPool x={240} y={520} w={540} h={128} />
        <Lamp f={f} x={828} y={-18} s={0.82} />
        {/* LEFT: the old model, propped up by everything */}
        <div style={{ position: "absolute", left: 42, top: 214, width: 424, height: 340 }}>
          <Card x={0} y={0} w={424} h={72} accent={OLIVE}>
            <div style={{ padding: "13px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 28, color: INK }}>The old model</span>
              <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 15, color: OLIVE }}>NEEDED IT</span>
            </div>
          </Card>
        </div>
        <div style={{ position: "absolute", left: 148, top: 336, filter: "drop-shadow(0 18px 24px rgba(26,24,19,0.5))" }}>
          <Mascot lf={f} size={216} tint="#8A8A72" shock={0.3} nodAmp={1.6} nodSpeed={13} />
        </div>
        {/* crutches / props holding it up: training wheels made of binders */}
        {[[74, 470, -24, "RULES"], [352, 470, 24, "HOOKS"]].map(([px, py, pr, lb], i) => (
          <div key={i} style={{ position: "absolute", left: px as number, top: py as number, transform: `rotate(${pr as number}deg)` }}>
            <Binder x={0} y={0} label={lb as string} c={i ? OLIVE : PLUM} s={0.52} tabs={2} />
          </div>
        ))}
        <div style={{ position: "absolute", left: 96, top: 556, width: 320, height: 14, borderRadius: 7, background: WOOD_D }} />

        {/* RIGHT: Opus 5, standing on its own */}
        <div style={{ position: "absolute", left: 546, top: 214, width: 424 }}>
          <Card x={0} y={0} w={424} h={72} accent={TEAL}>
            <div style={{ padding: "13px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 28, color: INK }}>Opus 5</span>
              <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 15, color: TEAL }}>DOES NOT</span>
            </div>
          </Card>
        </div>
        <div style={{ position: "absolute", left: 654, top: 330, filter: "drop-shadow(0 18px 24px rgba(26,24,19,0.5))" }}>
          <Mascot lf={f} size={232} cheer={0.55} nodAmp={2.6} nodSpeed={10} />
        </div>
        {/* the discarded props, struck out */}
        {[[566, 470, -12], [812, 486, 9]].map(([px, py, pr], i) => (
          <div key={i} style={{ position: "absolute", left: px as number, top: py as number, transform: `rotate(${pr as number}deg)` }}>
            <Binder x={0} y={0} label={i ? "SKILLS" : "RULES"} c={i ? PLUM : OLIVE} s={0.46} tabs={2} struck />
          </div>
        ))}
        {/* the divider */}
        <div style={{ position: "absolute", left: 502, top: 196, width: 8, height: 376, borderRadius: 4, background: WALL_LO }} />
      </Panel>
    </AbsoluteFill>
  );
};

/* ============ S5 · so they just sit there GETTING IN THE WAY (18.88) ============ */
export const S5InTheWay: React.FC = () => {
  const f = useCurrentFrame();
  const bump = Math.abs(osc(f, 9, 1)) > 0.86 ? 6 : 0;
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <Tag f={f} icon="🧱" word="IN THE WAY" />
      <Panel glow={hexA(RED_M, 0.24)}>
        <Room f={f} deskTop={600} shelf={false} />
        <Shafts f={f} n={3} from={150} />
        <LampPool x={240} y={548} w={540} h={128} />
        <Lamp f={f} x={828} y={-18} s={0.82} />
        {/* a wall of binders blocking the path to the finished work */}
        {Array.from({ length: 12 }, (_, i) => {
          const col = i % 4, row = Math.floor(i / 4);
          const L = ["CLAUDE.md", "SKILLS", "HOOKS", "MCP", "AGENTS", "RULES", "COMMANDS", "MEMORY", "STYLE", "TESTS", "LINT", "DOCS"];
          const C = [RED_M, PLUM, TEAL, SLATE, GOLD, OLIVE, CLAY, MOSS, PLUM, SLATE, TEAL, OLIVE];
          return (
            <div key={i} style={{ position: "absolute", left: 322 + col * 92, top: 214 + row * 132 }}>
              <Binder x={0} y={0} label={L[i]} c={C[i]} s={0.62} rot={(i % 3 - 1) * 3} tabs={2} />
            </div>
          );
        })}
        {/* the goal on the far side, unreachable */}
        <Card x={758} y={286} w={214} h={162} accent={TEAL}>
          <div style={{ padding: 16 }}>
            <Kicker c={TEAL}>WHAT YOU WANTED</Kicker>
            <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 30, color: INK, marginTop: 6, lineHeight: 1.05 }}>The work,<br />shipped</div>
            <div style={{ marginTop: 12, width: 46, height: 6, background: TEAL }} />
          </div>
        </Card>
        {/* you, bumping into the wall */}
        <div style={{ position: "absolute", left: 62 + bump, top: 356, filter: "drop-shadow(0 18px 24px rgba(26,24,19,0.5))" }}>
          <Mascot lf={f} size={244} shock={0.62} gaze={2} nodAmp={2} nodSpeed={12} />
        </div>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ position: "absolute", left: 288, top: 300 + i * 70, width: 22, height: 22, borderRadius: "50%", background: PAPER3, opacity: Math.abs(osc(f, 9, 1)) > 0.86 ? 1 : 0.5 }} />
        ))}
      </Panel>
    </AbsoluteFill>
  );
};

/* ============ S6 · the rule: delete it every six months (21.82) ============ */
export const S6Rule: React.FC = () => {
  const f = useCurrentFrame();
  const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN"];
  const tick = (i: number) => f > 20 + i * 8;
  const gone = E(f, 78, 104, 0, 1, IO);
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <Tag f={f} icon="🗓️" word="EVERY 6 MONTHS" />
      <Panel glow={hexA(TEAL, 0.26)}>
        <Room f={f} deskTop={588} shelf={false} />
        <Shafts f={f} n={3} from={150} />
        <LampPool x={240} y={536} w={540} h={128} />
        <Lamp f={f} x={828} y={-18} s={0.82} />
        {/* the six-month calendar */}
        <Card x={48} y={196} w={480} h={306} accent={WOOD}>
          <div style={{ padding: "14px 18px" }}>
            <Kicker>EVERY SIX MONTHS</Kicker>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 12 }}>
              {MONTHS.map((m, i) => (
                <div key={m} style={{ width: 138, height: 92, borderRadius: 8, background: tick(i) ? PAPER2 : PAPER, border: `4px solid ${i === 5 ? CLAY : PAPER3}` }}>
                  <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 17, color: i === 5 ? CLAY : MUTE, padding: "7px 0 0 10px" }}>{m}</div>
                  {i === 5
                    ? <div style={{ margin: "6px 10px 0", padding: "5px 0", borderRadius: 5, background: CLAY, textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 15, color: PAPER }}>DELETE</div>
                    : <div style={{ margin: "10px 10px 0", height: 8, borderRadius: 4, background: PAPER3 }} />}
                </div>
              ))}
            </div>
          </div>
        </Card>
        {/* the file being emptied, then the model working alone */}
        <Card x={568} y={196} w={402} h={214} accent={gone > 0.5 ? TEAL : RED_M}>
          <div style={{ padding: "13px 16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 19, color: INK }}>CLAUDE.md</span>
              <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 16, color: gone > 0.5 ? TEAL : RED_M }}>{gone > 0.5 ? "0 lines" : `${Math.round((1 - gone) * 412)} lines`}</span>
            </div>
            {Array.from({ length: 7 }, (_, i) => (
              <div key={i} style={{ width: `${[92, 74, 86, 62, 80, 56, 70][i]}%`, height: 11, borderRadius: 5, background: PAPER3, marginTop: 10, opacity: gone > i / 7 ? 0 : 1 }} />
            ))}
            {gone > 0.86 && (
              <div style={{ position: "absolute", left: 16, top: 62, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 30, color: TEAL }}>empty. and it still<br />knew what to do.</div>
            )}
          </div>
        </Card>
        <div style={{ position: "absolute", left: 596, top: 424, filter: "drop-shadow(0 18px 24px rgba(26,24,19,0.5))" }}>
          <Mascot lf={f} size={240} cheer={gone > 0.6 ? 0.85 : 0.2} nodAmp={2.6} nodSpeed={10} />
        </div>
        {/* the shredded remains on the desk */}
        {Array.from({ length: 14 }, (_, i) => (
          <Strip key={i} x={72 + (i * 33) % 420} y={620 + (i % 3) * 18} h={44 + (i % 3) * 12} rot={68 + (i % 6) * 16} c={i % 4 === 0 ? PAPER2 : PAPER} />
        ))}
      </Panel>
    </AbsoluteFill>
  );
};

/* ============ S7 · before you spend another weekend installing (28.44) ============ */
export const S7Weekend: React.FC = () => {
  const f = useCurrentFrame();
  const belt = (f * 3.2) % 116;
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <Tag f={f} icon="🔁" word="JUST DELETE" />
      <Panel glow={hexA(PLUM, 0.26)}>
        <Room f={f} deskTop={596} shelf={false} />
        <Shafts f={f} n={3} from={150} />
        <LampPool x={240} y={544} w={540} h={128} />
        <Lamp f={f} x={828} y={-18} s={0.82} />
        {/* the treadmill of installs, running forever */}
        <div style={{ position: "absolute", left: 48, top: 262, width: 560, height: 150, borderRadius: 10, background: WALL_LO, boxShadow: SH_D, overflow: "hidden" }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 30, background: WALL_HI, display: "flex", alignItems: "center", padding: "0 12px" }}>
            <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 15, color: PAPER2 }}>installing skill 6 of 6...</span>
          </div>
          {Array.from({ length: 7 }, (_, i) => (
            <div key={i} style={{ position: "absolute", left: -116 + i * 116 + belt, top: 46, width: 96, height: 86, borderRadius: 7, background: [PLUM, TEAL, GOLD, SLATE][i % 4], boxShadow: SH }}>
              <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 8, borderRadius: "7px 7px 0 0", background: "rgba(247,245,240,0.24)" }} />
              <div style={{ position: "absolute", left: 10, top: 20, right: 10, height: 8, borderRadius: 4, background: "rgba(247,245,240,0.6)" }} />
              <div style={{ position: "absolute", left: 10, top: 36, right: 26, height: 8, borderRadius: 4, background: "rgba(247,245,240,0.4)" }} />
            </div>
          ))}
          {Array.from({ length: 12 }, (_, i) => (
            <div key={`t${i}`} style={{ position: "absolute", left: ((i * 52 + belt) % 590) - 20, top: 136, width: 18, height: 10, borderRadius: 2, background: WALL }} />
          ))}
        </div>
        <div style={{ position: "absolute", left: 48, top: 428, width: 560, height: 16, borderRadius: 8, background: WOOD_D }} />
        {/* the weekend gone */}
        <Card x={48} y={462} w={272} h={104} accent={RED_M}>
          <div style={{ padding: "12px 16px" }}>
            <Kicker c={RED_M}>ANOTHER WEEKEND</Kicker>
            <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 32, color: INK, marginTop: 4 }}>gone</div>
          </div>
        </Card>
        {/* the alternative, one word */}
        <Card x={648} y={252} w={318} h={190} accent={TEAL}>
          <div style={{ padding: 18 }}>
            <Kicker c={TEAL}>OR, FIRST</Kicker>
            <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 58, color: CLAYD, marginTop: 6, lineHeight: 1 }}>Delete<br />them.</div>
          </div>
        </Card>
        <div style={{ position: "absolute", left: 690, top: 452, filter: "drop-shadow(0 18px 24px rgba(26,24,19,0.5))" }}>
          <Mascot lf={f} size={236} cheer={0.6} gaze={-1} nodAmp={2.4} nodSpeed={11} />
        </div>
        <div style={{ position: "absolute", left: 352, top: 470, filter: "drop-shadow(0 18px 24px rgba(26,24,19,0.5))" }}>
          <Mascot lf={f + 40} size={200} tint="#8A8A72" shock={0.5} nodAmp={1.6} nodSpeed={14} />
        </div>
      </Panel>
    </AbsoluteFill>
  );
};

/* ============ S8 · CTA — comment DELETE (33.14) ============ */
export const S8Cta: React.FC = () => {
  const f = useCurrentFrame();
  const doc = E(f, 6, 28, 0, 1, BACK);
  const KEEP = ["what actually earns its place", "the 3 lines worth keeping", "when to re-add"];
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <Tag f={f} icon="🎟️" word="COMMENT DELETE" />
      <Panel glow={hexA(TEAL, 0.3)}>
        <Room f={f} deskTop={572} shelf={false} />
        <Shafts f={f} n={3} from={150} />
        <LampPool x={240} y={520} w={540} h={128} />
        <Lamp f={f} x={828} y={-18} s={0.82} />
        {/* the guide: two columns, the KEEP side redacted because that is the trade */}
        <div style={{ transform: `scale(${doc}) translateY(${(1 - doc) * 34}px)`, transformOrigin: "50% 100%" }}>
          <Card x={112} y={184} w={788} h={356} accent={WOOD}>
            <div style={{ padding: "16px 20px" }}>
              <Kicker>THE DELETE LIST</Kicker>
              <div style={{ display: "flex", gap: 18, marginTop: 12 }}>
                {/* DELETE column, shown */}
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 17, color: RED_D, letterSpacing: 1.4, marginBottom: 9 }}>DELETE</div>
                  {["CLAUDE.md", "skills", "hooks", "stale rules"].map((t, i) => (
                    <div key={t} style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 9 }}>
                      <span style={{ width: 22, height: 22, borderRadius: 5, background: RED_M, color: PAPER, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>×</span>
                      <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 19, color: INK }}>{t}</span>
                    </div>
                  ))}
                </div>
                {/* KEEP column, gated — this is what the comment buys */}
                <div style={{ flex: 1.15, borderLeft: `4px solid ${PAPER3}`, paddingLeft: 18 }}>
                  <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 17, color: TEAL, letterSpacing: 1.4, marginBottom: 9 }}>KEEP</div>
                  {KEEP.map((t, i) => (
                    <div key={t} style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 9 }}>
                      <span style={{ fontSize: 17 }}>🔒</span>
                      {[62, 44, 54].map((wd, k) => <span key={k} style={{ width: wd, height: 13, borderRadius: 4, background: PAPER3 }} />)}
                    </div>
                  ))}
                  <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 14, color: MUTE, marginTop: 4 }}>3 more inside</div>
                </div>
              </div>
              <div style={{ position: "absolute", left: 20, right: 20, bottom: 16, padding: "13px 0", borderRadius: 9, background: CLAY, textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 26, color: PAPER, letterSpacing: 1 }}>COMMENT "DELETE"</div>
            </div>
          </Card>
        </div>
        <div style={{ position: "absolute", left: 96, top: 552, filter: "drop-shadow(0 18px 24px rgba(26,24,19,0.5))" }}>
          <Mascot lf={f} size={224} cheer={1} nodAmp={3} nodSpeed={9} />
        </div>
        {Array.from({ length: 16 }, (_, i) => (
          <Strip key={i} x={520 + (i * 31) % 420} y={620 + (i % 3) * 20} h={44 + (i % 3) * 12} rot={66 + (i % 6) * 18} c={i % 4 === 0 ? PAPER2 : PAPER} />
        ))}
      </Panel>
    </AbsoluteFill>
  );
};
