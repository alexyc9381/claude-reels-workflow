import assert from "node:assert/strict";
import {
  hierarchyState,
  hierarchyFocus,
  hierarchyGestures,
} from "./hierarchy-motion";
import { kineticState } from "./kinetic-motion";
import cues from "../../../youtube-video-editing-system/hierarchy-sound-cues.json";

for (let frame = 0; frame <= 390; frame++) {
  const t = frame / 30,
    k = hierarchyState(t),
    f = hierarchyFocus(t),
    g = hierarchyGestures(t);
  assert.deepEqual(k, hierarchyState(t));
  assert.deepEqual(
    k.letter,
    kineticState(t).letter,
    "primary payload timing and path preserved",
  );
  assert.equal(k.portrait.opacity, 0);
  assert.equal(k.name.opacity, 0);
  for (const v of Object.values(f)) assert(v >= 0 && v <= 1);
  assert.equal(
    k.third.pose.lift,
    0,
    "operator cannot steal focus with unrelated jumps",
  );
  if (t < 5.7) {
    assert.equal(k.book, 0);
    assert.equal(f.portrait, 0);
    assert.equal(f.name, 0);
    assert.equal(Math.abs(g.crank), 0);
  }
  if (t >= 9) {
    assert.equal(k.aPose.lift, 0);
    assert.equal(k.bPose.lift, 0);
  }
  const f2 = hierarchyFocus(t + 0.001);
  for (const key of Object.keys(f) as (keyof typeof f)[])
    assert(Math.abs(f[key] - f2[key]) < 0.01);
}
assert(hierarchyFocus(2).source > hierarchyFocus(2).book);
assert(hierarchyFocus(8).book > hierarchyFocus(8).source);
assert.equal(hierarchyState(8).book, 1);
assert(Math.abs(hierarchyState(8).filled - 1) < 1e-9);
assert.equal(hierarchyFocus(8).name, 1);
assert.equal(cues.cues.length, 10);
assert(cues.cues.every((c) => c.at >= 0 && c.at < 10));
assert(
  cues.cues.some(
    (c) => Math.abs(c.at - 5.85 / 1.3) < 0.001 && c.purpose.includes("folio"),
  ),
);
console.log(
  "Hierarchy: source/handoff/result focus, delayed book/identity, unchanged payload, suppressed competing hops and cue alignment passed.",
);
