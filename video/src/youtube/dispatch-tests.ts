import assert from "node:assert/strict";
import {
  dispatchMotion,
  DISPATCH_RATE,
  DISPATCH_SECONDS,
} from "./DispatchProps";
import { boldState } from "./bold-motion";
import cues from "../../../youtube-video-editing-system/dispatch-sound-cues.json";
assert.equal(DISPATCH_SECONDS, 7);
for (let f = 0; f < 210; f++) {
  const t = (f / 30) * DISPATCH_RATE,
    m = dispatchMotion(t);
  assert.deepEqual(m, dispatchMotion(t));
  for (const [k, v] of Object.entries(m)) {
    assert(Number.isFinite(v));
    if (k !== "roller") assert(v >= 0 && v <= 1);
  }
  if (t < 2.67) assert.equal(m.ink, 0);
  if (t < 5.95) assert.equal(m.intake, 0);
  if (t < 8.1) assert.equal(m.bookmark, 0);
}
assert.equal(dispatchMotion(2.7).stampIn, 1);
assert.equal(dispatchMotion(2.7).stampOut, 0);
assert.equal(dispatchMotion(9).intake, 0);
assert.equal(dispatchMotion(9).bookmark, 1);
assert(Math.abs(boldState(9).filled - 1) < 1e-9);
assert(cues.cues.every((c) => c.at >= 0 && c.at < DISPATCH_SECONDS));
assert(cues.cues.some((c) => Math.abs(c.at * DISPATCH_RATE - 2.67) < 1e-9));
assert(cues.cues.some((c) => Math.abs(c.at * DISPATCH_RATE - 7.65) < 1e-9));
console.log(
  "Dispatch: 7s clock, deterministic hardware, ink after contact, intake timing, final latch, sound alignment passed.",
);
