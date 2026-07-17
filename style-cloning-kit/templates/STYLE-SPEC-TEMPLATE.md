# STYLE SPEC — <name>
<!-- Every field REQUIRED. Concrete numbers only (hex, px, frames@30fps). If a field truly doesn't apply, write "n/a — <why>". Source: <example video filename + link/handle>. -->

## 0. Identity
- Format: <9:16 1080×1920 / 16:9 …>, <fps>, typical length <s>
- One-line character of the style: <e.g. "cream editorial serif + framed dark UI panel + clay accents">
- What must NEVER appear: <e.g. neon, stock footage, em dashes…>

## 1. Layout & composition
- Canvas zones: <top bar y0-y1 = what, hero zone, caption zone, safe margins px>
- Content container: <full-bleed / framed card (exact geometry + radius + border)>
- Density rule: <how full a frame is; what fills negative space>

## 2. Typography & captions
- Families (Google-Fonts match): display=<>, body=<>, mono=<>
- Sizes/weights: headline <px/weight>, captions <px/weight>, labels <px/weight>
- Colors + treatment: <hex, stroke px, shadow, letter-spacing>
- Caption engine: <words per line, grouping rule, active-word highlight behavior, lead s, position y>
- Text animation: in=<transform+frames+easing>, out=<>

## 3. Color, texture & light
- Palette (hex, roles): bg=<>, ink=<>, accent1=<>, accent2=<>, success=<>, danger=<>
- Gradients: <exact stops + angle>
- Texture/atmosphere: <grain %, vignette, glow radius/colors, dust/particles>
- Lighting logic: <where light comes from, how heroes are lit>

## 4. Motion grammar
- Easing character: <e.g. Easing.out(back(1.4)) pops; cubic in-outs; frames counts>
- Standard duration: element-in <fr>, scene transition <fr + type>
- Transition inventory: <cut/whip/flash/riser-boom… with exact recipe>
- Physics: <squash-stretch %, shake amp+decay, particle recipes, parallax layers>
- Camera: <push-in %, when>

## 5. Pacing & retention
- Hook (0-3s) beat-by-beat: <what's on frame 1, when title lands, first motion>
- Cut cadence: median shot <s>, longest allowed hold <s>
- Escalation rule: <how scenes top each other>
- Retention devices: <progress bars/counters/loops/rewards + where>
- CTA treatment: <exact end-screen recipe>

## 6. Audio
- Music bed: <genre/feel, level vs VO (e.g. 0.11), fade in/out s>
- SFX map: <event → file/type + level, e.g. transition → riser 1.8s early v0.8 + boom>
- VO: <pace (wpm or ×speedup), processing chain>

## 7. Recurring components (build these in the clone-base)
<list every reusable element seen ≥2×: e.g. mascot, badge chip, progress rail, panel header — with geometry>

## 8. Reference frames
<for each lens above, list 2-3 example frame filenames that best show it — the match-gate uses these>
