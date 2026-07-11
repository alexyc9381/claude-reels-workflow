import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COLORS, FONT } from "../brand";
import researchPhrases from "./captions.json";

type Word = { text: string; t: number };
type Phrase = { from: number; to: number; words: Word[] };

// TikTok-style captions: FULL opacity, instant word-by-word appear, no fade/scale in or out.
const OUTLINE =
  "3px 0 0 #000, -3px 0 0 #000, 0 3px 0 #000, 0 -3px 0 #000, 3px 3px 0 #000, -3px -3px 0 #000, 3px -3px 0 #000, -3px 3px 0 #000, 0 6px 18px rgba(0,0,0,0.55)";

export const ShortCaptions: React.FC<{ data?: Phrase[] }> = ({ data }) => {
  const frame = useCurrentFrame();
  const list = (data ?? (researchPhrases as Phrase[])) as Phrase[];
  const active = list.find((p) => frame >= p.from && frame < p.to);
  if (!active) return null;
  // index of the most-recently-revealed word = the active (highlighted) one
  let activeIdx = -1;
  active.words.forEach((w, i) => {
    if (frame >= w.t) activeIdx = i;
  });

  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 470 }}>
      <div
        style={{
          maxWidth: 940,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "6px 14px",
          padding: "0 40px",
        }}
      >
        {active.words.map((w, i) => {
          if (frame < w.t) return null; // not spoken yet -> not shown (hard cut, no animation)
          const isActive = i === activeIdx;
          return (
            <span
              key={i}
              style={{
                fontFamily: FONT.sans,
                fontWeight: 900,
                fontSize: 76,
                lineHeight: 1.04,
                color: "#fff",
                textShadow: OUTLINE,
                background: isActive ? COLORS.logoBlue : "transparent",
                borderRadius: 12,
                padding: isActive ? "2px 14px" : "2px 0",
                WebkitTextStroke: isActive ? "0" : undefined,
              }}
            >
              {w.text}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
