import React from "react";
import { Composition, registerRoot } from "remotion";
import { HookPull, HookKerb, HookDocket, HookWake, HookPass, HOOK_LEN } from "./RowHooks";
import { makeRowReel, VARIANTS, ROW_TOTAL } from "./ClaudeRowboatReel";

/* Reel 91 "ROWBOAT" · round 3 — five RITUAL opens, four hard-cut shots each.
   Rounds 1 (harbour) and 2 (agency office) are dead; see RowRituals.tsx. */
const V = { fps: 30, width: 1080, height: 1920 } as const;
const HOOKS = [
  ["rowPull", HookPull],       // tug of war      · FORCE, 5 v 1
  ["rowKerb", HookKerb],       // kerb giveaway   · WORTH v PRICE
  ["rowDocket", HookDocket],   // job docket      · LENGTH
  ["rowWake", HookWake],       // funeral         · ALIVE v DEAD
  ["rowPass", HookPass],       // order window    · SPEED
] as const;

const Root: React.FC = () => (<>
  {/* the picked cut, then four trial variants that each swap the whole open */}
  {Object.keys(VARIANTS).map((k) => (
    <Composition key={k} id={k === "A" ? "Rowboat" : `Rowboat${k}`}
      component={makeRowReel(k)} durationInFrames={ROW_TOTAL} {...V} />
  ))}
  {HOOKS.map(([id, C]) => (
    <Composition key={id} id={id} component={C} durationInFrames={HOOK_LEN} {...V} />
  ))}
</>);
registerRoot(Root);
