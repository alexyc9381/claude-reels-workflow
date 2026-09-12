import {MagneticSelection,ToolRelay} from './Setup145TrialHooks';
import React from "react";
import {
  AbsoluteFill,
  Img,
  Audio,
  Composition,
  registerRoot,
  staticFile,
  useCurrentFrame,
} from "remotion";
import {
  Bg,
  Panel,
  HookHeader,
  KaraokeCaption,
  ProgressBar,
  SectionHeader,
} from "./SlopKit";
import words from "./data/words_setup145.json";
import fullWords from "./data/words_setup145_r8.json";
import {
  P,
  brands,
  L,
  E,
  S,
  H,
  pop,
  Svg,
  Stage,
  Actor,
  Title,
  Impact,
  Plug,
  Wrench,
  Clamp,
  Lens,
  Key,
  Prompt,
  Cursor,
  Mark,
  RankCrown,
  RankLaurel,
  ToolActivation,
  jingle,
} from "./Setup145FlatKit";
import { inter } from "./fonts";
import { FullBody, FullHeader } from "./Setup145Full2D";
import { HeadroomContinuation } from "./Setup145Headroom2D";
const ToolOverload: React.FC<{ f: number }> = ({ f }) => {
  const close = S(f, -3, 18),
    lift = S(f, 62, 22),
    bump = H(f, 16, 12),
    landing = H(f, 81, 9);
  const take = E(f, 67, 13),
    small = (1 - take * 0.4) * 1.12;
  const cx = 590 - 28 * close + take * 169,
    cy = 579 - 34 * close - 25 * lift + 7 * bump + take * 131;
  const rise = E(f, 69, 12),
    brace = H(f, 64, 9);
  const heroX = 114 + close * 18 + rise * 24;
  const heroY = 426 - 9 * close - rise * 66 + brace * 14 + landing * 10;
  const heroSize = 310 + rise * 58;
  const crown = E(f, 68, 13);
  const crownX = (1 - crown) * 814 + crown * (heroX + heroSize * 0.5);
  const crownY =
    (1 - crown) * 426 +
    crown * (heroY + heroSize * 0.22) -
    Math.sin(crown * Math.PI) * 194;
  return (
    <>
      <Stage variant={0} claudeRotation={f * 0.3} />
      <Svg>
        {f >= 76 && <RankLaurel f={f} x={340} y={518} />}
        <g
          transform={`translate(${cx} ${cy}) rotate(${-5 + close * 7 - lift * 3}) scale(${small})`}
        >
          {Array.from({ length: 17 }, (_, i) => {
            const a = -176 + i * 10.3;
            const settle = -5 + (i % 3) * 2;
            return (
              <g
                key={i}
                transform={`rotate(${a + (settle - a) * S(f, -3 + i * 0.2, 16)}) scale(${0.84 + (i % 4) * 0.09})`}
                opacity={1 - close}
              >
                <Wrench kind={i} color={i % 2 ? "#A6BAB0" : "#E1C68E"} />
              </g>
            );
          })}
          <g
            transform={`translate(-95 -20) rotate(${-4 - S(f, 14, 15) * 108 + jingle(f, 29)})`}
          >
            <ToolActivation f={f} at={29} color={P.mint} x={176} />
            <g
              style={{
                filter:
                  f >= 29 && f < 53
                    ? `drop-shadow(0 0 ${9 * (1 - L(f, 29, 24))}px ${P.mint})`
                    : undefined,
              }}
            >
              <Clamp open={1 - take * 0.55} />
            </g>
            <Mark kind="headroom" x={135} y={0} size={45} rotate={112} />
          </g>
          <g
            transform={`translate(16 -20) rotate(${-4 - S(f, 32, 16) * 73 + jingle(f, 48)})`}
          >
            <ToolActivation f={f} at={48} color={P.blue} x={185} />
            <g
              style={{
                filter:
                  f >= 48 && f < 70
                    ? `drop-shadow(0 0 ${10 * (1 - L(f, 48, 22))}px ${P.blue})`
                    : undefined,
              }}
            >
              <Lens reveal={S(f, 45, 13)} />
            </g>
            <Mark kind="hud" x={185} y={0} size={47} rotate={77} />
          </g>
          <g
            transform={`translate(122 -18) rotate(${-4 - S(f, 50, 16) * 33 + jingle(f, 66)})`}
          >
            <ToolActivation f={f} at={66} color={P.gold} x={181} />
            <g
              style={{
                filter:
                  f >= 66 && f < 86
                    ? `drop-shadow(0 0 ${11 * (1 - L(f, 66, 20))}px ${P.gold})`
                    : undefined,
              }}
            >
              <Key />
            </g>
            <Mark kind="aisa" x={181} y={0} size={48} rotate={37} />
          </g>
          <path
            d="M-227-37Q-214-65-164-61L203-44Q240-40 242-7Q245 29 207 47L-161 56Q-220 57-234 20Z"
            fill={P.red}
            stroke={P.ink}
            strokeWidth={8}
          />
          <path
            d="M-192-38Q-174-47-130-41L194-28"
            fill="none"
            stroke="#F89C69"
            strokeWidth={12}
            strokeLinecap="round"
          />
          <path
            d="M-177 32L199 23"
            stroke="#A93931"
            strokeWidth={9}
            strokeLinecap="round"
          />
          <circle
            cx={-173}
            cy={-2}
            r={21}
            fill={P.paper}
            stroke={P.ink}
            strokeWidth={6}
          />
          <path d="M-184-2h22" stroke={P.ink} strokeWidth={5} />
          <circle
            cx={199}
            cy={-1}
            r={16}
            fill={P.paper}
            stroke={P.ink}
            strokeWidth={5}
          />
          <text
            x={9}
            y={15}
            textAnchor="middle"
            fontSize={37}
            fontFamily={inter.fontFamily}
            fontWeight={900}
            fill="#FFF0C9"
          >
            {f < 19 ? "300+" : "THE USEFUL 3"}
          </text>
        </g>
        <Impact x={cx + 160} y={cy - 45} t={L(f, 17, 11)} size={72} />
        <Impact
          x={cx - 118}
          y={cy - 229}
          t={L(f, 29, 9)}
          color={P.mint}
          size={54}
        />
        <Impact
          x={cx + 45}
          y={cy - 225}
          t={L(f, 48, 9)}
          color={P.blue}
          size={50}
        />
        <Impact
          x={cx + 276}
          y={cy - 118}
          t={L(f, 66, 10)}
          color={P.gold}
          size={60}
        />
        {f >= 69 && (
          <g
            transform={`translate(${734 + (1 - E(f, 69, 6)) * 310} ${326 + H(f, 75, 8) * 8}) rotate(${-6 + E(f, 69, 6) * 6})`}
          >
            <text
              x={0}
              y={-54}
              textAnchor="middle"
              fontFamily={inter.fontFamily}
              fontWeight={900}
              fontSize={56}
              letterSpacing={5}
              fill={P.ink}
            >
              TOP
            </text>
            {f >= 73 && (
              <g
                transform={`scale(${1 + (1 - E(f, 73, 3)) * 0.65 + H(f, 76, 7) * 0.04})`}
                opacity={E(f, 73, 2)}
              >
                <text
                  x={0}
                  y={101}
                  textAnchor="middle"
                  fontFamily={inter.fontFamily}
                  fontWeight={900}
                  fontSize={178}
                  letterSpacing={-13}
                  fill={P.gold}
                  stroke={P.ink}
                  strokeWidth={9}
                  paintOrder="stroke"
                >
                  1%
                </text>
              </g>
            )}
          </g>
        )}
        <Impact x={734} y={359} t={L(f, 75, 10)} size={180} />
      </Svg>
      <Actor
        f={f}
        x={heroX}
        y={heroY}
        size={heroSize}
        angle={
          -17 +
          close * 15 +
          lift * 3 -
          brace * 9 +
          H(f, 69, 12) * 9 -
          landing * 3
        }
        sx={1 + 0.04 * bump + brace * 0.12 + landing * 0.07}
        sy={1 - 0.04 * bump - brace * 0.1 - landing * 0.07}
        shock={(1 - close) * 0.74}
        stern={close * (1 - rise) * 0.6}
        cheer={rise * (0.72 + 0.28 * E(f, 93, 12))}
        gaze={1 - rise}
      />
      <Svg>
        {f >= 68 && (
          <RankCrown
            x={crownX}
            y={crownY}
            scale={0.24 + crown * 0.76}
            angle={28 * (1 - crown) - landing * 5}
            shine={L(f, 93, 13)}
          />
        )}
        <Impact
          x={heroX + heroSize * 0.5}
          y={heroY + heroSize * 0.22 - 35}
          t={L(f, 81, 8)}
          size={138}
        />
      </Svg>
    </>
  );
};
const PullThree: React.FC<{ f: number }> = ({ f }) => {
  const pull = S(f, 0, 20),
    recoil = H(f, 22, 12),
    release = S(f, 24, 18),
    shrink = S(f, 53, 16),
    back = S(f, 80, 23);
  const equip = S(f, 70, 34);
  const marks = [
    { kind: "headroom", x: 510, y: 338, tx: 473, ty: 346 },
    { kind: "hud", x: 745, y: 343, tx: 684, ty: 310 },
    { kind: "aisa", x: 718, y: 546, tx: 846, ty: 412 },
  ];
  const badges = (
    <>
      {marks.map((m, i) => (
        <g
          key={m.kind}
          transform={`translate(${(m.x + (m.tx - m.x) * release) * (1 - S(f, 86, 18)) + (214 + i * 77) * S(f, 86, 18)} ${(m.y + (m.ty - m.y) * release - Math.sin(release * Math.PI) * 40) * (1 - S(f, 70, 16)) + 610 * S(f, 70, 16)}) rotate(${(1 - release) * (i - 1) * 7}) scale(${1 - equip * 0.48})`}
        >
          <path
            d="M-61-24Q-77-51-45-67L-12-63Q-23-88 4-88Q30-86 17-61L55-62Q77-58 63-24Q87-34 90-10Q86 16 64 7L66 47Q59 72 31 60L-6 64Q-37 91-44 62L-67 53L-65 16Q-91 27-92 0Q-91-26-61-24Z"
            fill={[P.mint, P.blue, P.gold][i]}
            stroke={P.ink}
            strokeWidth={6}
          />
          <Mark kind={m.kind} x={0} y={0} size={70} />
        </g>
      ))}
    </>
  );
  return (
    <>
      <Stage variant={1} />
      <Svg>
        <path
          d="M383 231Q640 131 864 235Q1004 344 934 552Q835 700 593 654Q400 636 351 468Q300 338 383 231Z"
          fill="#E0DCBB"
          stroke="#B8B9A4"
          strokeWidth={5}
          opacity={1 - pull}
        />
        {Array.from({ length: 39 }, (_, i) => {
          const a = i * 2.399;
          const r = 60 + Math.sqrt(i / 39) * 225;
          const p = S(f, 3 + (i % 5) * 1.5, 24);
          return (
            <g
              key={i}
              transform={`translate(${664 + Math.cos(a) * r + p * (500 + (i % 3) * 70)} ${443 + Math.sin(a) * r * 0.8 - p * 200 + (i % 2 ? 1 : -1) * Math.sin(p * Math.PI) * 60}) rotate(${i * 33 + p * 100})`}
              opacity={1 - S(f, 24, 12)}
            >
              <Plug
                scale={0.44 + (i % 3) * 0.1}
                color={
                  i % 3 === 0 ? "#BFC6AE" : i % 3 === 1 ? "#9EB8AD" : "#D7C592"
                }
              />
            </g>
          );
        })}
        <path
          d="M370 565Q345 432 406 315C480 210 773 183 886 317C1030 489 857 695 612 628C470 597 362 488 406 315"
          fill="none"
          stroke={P.ink}
          strokeWidth={13}
          strokeLinecap="round"
          strokeDasharray={1900}
          strokeDashoffset={1900 * (1 - E(f, -9, 23))}
          opacity={1 - S(f, 30, 12)}
        />
        <path
          d="M370 565Q345 432 406 315C480 210 773 183 886 317C1030 489 857 695 612 628C470 597 362 488 406 315"
          fill="none"
          stroke={P.blue}
          strokeWidth={7}
          strokeLinecap="round"
          strokeDasharray={1900}
          strokeDashoffset={1900 * (1 - E(f, -9, 23))}
          opacity={1 - S(f, 30, 12)}
        />
        {f < 70 && badges}
        <path
          opacity={1 - S(f, 65, 10)}
          d={`M${325 + pull * 27} ${595 - recoil * 16}Q360 589 ${374 + pull * 10} ${570 - recoil * 9}`}
          fill="none"
          stroke={P.ink}
          strokeWidth={7}
        />
        <g
          opacity={1 - S(f, 65, 10)}
          transform={`translate(${356 + pull * 28 - recoil * 12} ${603 - recoil * 17}) rotate(${-24 + pull * 18 - recoil * 10}) scale(.76)`}
        >
          <Cursor />
        </g>
        <Impact x={393} y={472} t={L(f, 22, 13)} size={66} color={P.blue} />
        {f >= 40 && (
          <>
            <Prompt
              x={339 + E(f, 40, 14) * 243 - back * 137}
              y={524 - H(f, 40, 26) * 45 + back * 7}
              compress={shrink}
              scale={0.77}
              angle={-16 + E(f, 40, 17) * 16}
            />
            {f > 52 && f < 69 && (
              <path
                d={`M439 440L${495 + shrink * 51} 457M509 429L${613 - shrink * 21} 455`}
                stroke={P.mint}
                strokeWidth={6}
                strokeLinecap="round"
              />
            )}
            <Impact x={591} y={486} t={L(f, 69, 10)} size={53} color={P.mint} />
          </>
        )}
      </Svg>
      <Actor
        f={f}
        x={69 + pull * 39 - recoil * 17 - equip * 28}
        y={426 - recoil * 20 - equip * 78}
        size={310 + equip * 80}
        angle={14 - pull * 21 + recoil * 7 + back * 5}
        shock={f < 18 ? 0.48 : 0}
        stern={f >= 18 && f < 40 ? 0.7 : 0}
        cheer={S(f, 77, 18) * 0.7}
        gaze={1}
      />
      {f >= 70 && <Svg>{badges}</Svg>}
      <Title s={43}>
        {f < 40
          ? "Find the useful three."
          : f < 73
            ? "Keep the tools that do the work."
            : "Same useful input. Less baggage."}
      </Title>
    </>
  );
};
const PromptRelay: React.FC<{ f: number }> = ({ f }) => {
  const throwP = E(f, 0, 19),
    compact = S(f, 20, 15),
    hud = S(f, 41, 14),
    research = S(f, 67, 21),
    returnP = S(f, 91, 17);
  const x = 403 + throwP * 203 + S(f, 36, 21) * 110 - returnP * 334,
    y =
      498 - H(f, 0, 20) * 80 - throwP * 62 - H(f, 36, 23) * 65 + returnP * 119;
  const swx = 850 - S(f, 63, 16) * 170,
    swy = 312 + H(f, 63, 16) * 30;
  const srx = 863 - S(f, 76, 16) * 170,
    sry = 521 + S(f, 76, 16) * 62;
  return (
    <>
      <Stage variant={2} />
      <Svg>
        <path
          d="M365 646Q559 623 838 651"
          fill="none"
          stroke="#6C9E8B"
          strokeWidth={4}
          strokeDasharray="8 17"
        />
        <g opacity={1 - S(f, 40, 8)}>
          <path
            d={`M${410 + compact * 73} 320Q${390 + compact * 73} 411 ${411 + compact * 73} 494M${797 - compact * 71} 320Q${817 - compact * 71} 411 ${797 - compact * 71} 494`}
            fill="none"
            stroke={P.ink}
            strokeWidth={18}
            strokeLinecap="round"
          />
          <path
            d={`M${410 + compact * 73} 320Q${390 + compact * 73} 411 ${411 + compact * 73} 494M${797 - compact * 71} 320Q${817 - compact * 71} 411 ${797 - compact * 71} 494`}
            fill="none"
            stroke={P.mint}
            strokeWidth={10}
            strokeLinecap="round"
          />
        </g>
        <g opacity={f < 41 ? 1 : 1 - S(f, 41, 11)}>
          <Mark kind="headroom" x={853} y={270} size={82} />
        </g>
        {f >= 38 && f < 71 && (
          <g opacity={S(f, 38, 7) * (1 - S(f, 63, 8))}>
            <Mark kind="hud" x={450} y={355} size={84} />
            <path
              d="M495 367Q545 501 670 510"
              fill="none"
              stroke={P.blue}
              strokeWidth={5}
            />
            <circle cx={685} cy={522} r={7} fill={P.blue} />
          </g>
        )}
        {f >= 60 && (
          <g opacity={E(f, 60, 9) * (1 - S(f, 95, 10))}>
            <Mark kind="aisa" x={520} y={616} size={70} />
            <Mark kind="similarweb" x={swx} y={swy} size={96} />
            <Mark kind="semrush" x={srx} y={sry} size={90} />
            <path
              d={`M${swx - 24} ${swy + 43}Q785 409 742 429M${srx - 28} ${sry - 33}Q780 486 742 456M520 567Q617 521 690 483`}
              fill="none"
              stroke={P.ink}
              strokeWidth={5}
              strokeDasharray={420}
              strokeDashoffset={420 * (1 - research)}
            />
            {[0, 1].map((i) => {
              const p = S(f, 68 + i * 12, 13);
              const ax = i ? 815 : 830,
                ay = i ? 521 : 357;
              return p > 0 && p < 1 ? (
                <g
                  key={i}
                  transform={`translate(${ax + (742 - ax) * p} ${ay + (447 - ay) * p - Math.sin(p * Math.PI) * 24})`}
                >
                  <path
                    d="M-20-11H20V11H-20Z"
                    fill={i ? P.orange : P.blue}
                    stroke={P.ink}
                    strokeWidth={4}
                  />
                  <path
                    d="M-9-1l6 5 11-11"
                    fill="none"
                    stroke="#fff8db"
                    strokeWidth={4}
                  />
                </g>
              ) : null;
            })}
          </g>
        )}
        <Prompt
          x={x}
          y={y}
          scale={1.43 - returnP * 0.42}
          compress={compact}
          hud={hud * (1 - returnP)}
          angle={-12 * (1 - throwP) + returnP * 9}
          result={f >= 92}
        />
        <Impact x={605} y={420} t={L(f, 34, 11)} color={P.mint} size={114} />
        <Impact x={662} y={480} t={L(f, 54, 9)} color={P.blue} size={65} />
        <Impact x={716} y={439} t={L(f, 91, 10)} color={P.gold} size={73} />
        <Impact x={390} y={562} t={L(f, 106, 9)} color={P.gold} size={55} />
      </Svg>
      <Actor
        f={f}
        x={
          65 + throwP * 9 + H(f, 0, 19) * 35 + S(f, 42, 18) * 92 - returnP * 72
        }
        y={426 - H(f, 0, 19) * 23 - H(f, 103, 9) * 13}
        size={306}
        angle={
          -13 + throwP * 15 + H(f, 0, 19) * 12 + H(f, 48, 21) * 14 - returnP * 5
        }
        shock={f < 8 ? 0.48 : 0}
        cheer={S(f, 92, 16) * 0.75}
        gaze={1}
        stern={f > 35 && f < 80 ? 0.35 : 0}
      />
      <Title s={f < 65 ? 44 : 39}>
        {f < 39
          ? "Lose the wasted input."
          : f < 65
            ? "See the work happening."
            : "Bring live sources into the answer."}
      </Title>
    </>
  );
};
export const FlatProbe: React.FC<{
  variant?: number;
  silent?: boolean;
  extended?: boolean;
  full?: boolean;
}> = ({ variant = 0, silent = false, extended = false, full = false }) => {
  const f = useCurrentFrame();
  const Scene = [ToolOverload, MagneticSelection, ToolRelay][variant];
  return (
    <AbsoluteFill>
      <Bg />
      <div style={{ position: "absolute", opacity: 0, pointerEvents: "none" }}>
        {Object.entries(brands).map(([k, path]) => (
          <Img key={k} src={staticFile(path)} width={1} height={1} />
        ))}
      </div>
      {!silent && (
        <Audio
          src={staticFile(
            full
              ? (variant === 0 ? "setup145-r8-full.wav" : `setup145-trial-${variant}.wav`)
              : extended
                ? "setup145-r7-opening.wav"
                : `setup145-r6-hook-${variant}.wav`,
          )}
        />
      )}
      <Panel>
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: `scale(${full && f >= 349 ? 1 : 1 + E(f, 0, 6) * 0.065})`,
            transformOrigin: "50% 55%",
          }}
        >
          {full && f >= 349 ? (
            <FullBody f={f} />
          ) : (extended || full) && f >= 109 ? (
            <HeadroomContinuation f={f - 109} variant={full ? 2 : 0} />
          ) : (
            <Scene f={f} />
          )}
        </div>
      </Panel>
      <ProgressBar />
      {full && f >= 349 ? (
        <FullHeader f={f} />
      ) : (extended || full) && f >= 109 ? (
        <SectionHeader
          f={15}
          hero
          size={48}
          badgeBg="#FFFFFF"
          badgeBorder="#EDE7DB"
          badge={
            <Img
              src={staticFile(brands.headroom)}
              style={{ width: 84, height: 84, objectFit: "contain" }}
            />
          }
          l1="HEADROOM"
          l2={
            <span style={{ color: "#D97757" }}>
              {f < 253 ? "SAME ANSWER. LESS INPUT." : "80% FEWER TOKENS."}
            </span>
          }
        />
      ) : (
        <HookHeader
          big="300+ CLAUDE PLUGINS"
          hot="YOU ONLY NEED THESE THREE"
          f={15}
        />
      )}
      <KaraokeCaption words={full ? fullWords : words} top={1268} />
    </AbsoluteFill>
  );
};
const Root = () => (
  <>
    {[1,2].map(v=><Composition key={v} id={`SetupTrial${v===1?"B":"C"}`} component={FlatProbe} defaultProps={{variant:v,silent:false,extended:true,full:true}} durationInFrames={848} fps={30} width={1080} height={1920}/>)}
    <Composition
      id="SetupFull2D"
      component={FlatProbe}
      defaultProps={{ variant: 0, silent: false, extended: true, full: true }}
      durationInFrames={848}
      fps={30}
      width={1080}
      height={1920}
    />
    <Composition
      id="SetupOpeningHeadroom"
      component={FlatProbe}
      defaultProps={{ variant: 0, silent: false, extended: true }}
      durationInFrames={848}
      fps={30}
      width={1080}
      height={1920}
    />
    {[0, 1, 2].map((v) => (
      <Composition
        key={v}
        id={`FlatHook${v + 1}`}
        component={FlatProbe}
        defaultProps={{ variant: v, silent: false }}
        durationInFrames={848}
        fps={30}
        width={1080}
        height={1920}
      />
    ))}
  </>
);
registerRoot(Root);
