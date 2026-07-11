---
name: style-cloning-pipeline
description: "⛔ STANDING: when Alex gives ONE example video + \"clone this style\", run the 5-phase style-cloning kit (ingest → teardown → scaffold → match-gate → package)"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: fd2a64f7-8d2a-4a40-a1dc-da7f726a2785
---

**When Alex drops an example video and asks to replicate its editing style** (any style, any creator), run the **Style Cloning Kit** at `~/Downloads/style-cloning-kit/` (also zipped in Claude-Reels-Final + Drive). Do NOT eyeball-imitate; run the phases.

**Why:** Alex wants one example video → an exact, permanent, reusable style. The two things that make "exact" possible: (1) a NUMBERS-ONLY spec (hex/px/frames — never adjectives), and (2) the **side-by-side match-gate**: critics score example-frame vs replica-frame per lens and iterate until ≥9/10 on all six lenses. This generalizes the reel-38 pipeline ([[reel-ship-gate-pipeline]]).

**How to apply — the 5 phases** (templates in the kit's `templates/`):
0. `INGEST.sh <video> <name>` → uniform frames (1fps) + scene-cut frames + cut_times + audio/loudness into `~/Downloads/style-packs/<name>/example/`
1. **Teardown workflow** (`style-teardown-workflow.js`): 6 parallel analysts (layout / typography+captions / color+texture / motion grammar / pacing+retention / audio) → synthesizer fills every field of `STYLE-SPEC-TEMPLATE.md`
2. **Scaffold**: build `<Name>Style.tsx` clone-base in the Remotion project implementing the spec's primitives (palette consts, caption engine, transition kit, recurring components)
3. **Match-gate loop** (`replication-gate-workflow.js`): render a test scene → stills at moments matched to example frames → 2 critics score each lens 1-10 side-by-side with measured diffs → fix → repeat until all ≥9
4. **Package**: memory pack from `memory-pack-template/` into this memory folder (+ MEMORY.md line), zip the style pack to Final + Drive

Existing hand-built precedents (pre-kit): [[theventure-style-teardown]], [[1609plus-style-replica]], [[greg-isenberg-reel-style]] — same idea, now systematized. The production pipeline (VO/captions/render/deliver) never changes per style — only the visual layer does ([[video-editing-toolchain]], CLAUDE-REELS-PLAYBOOK §6).
