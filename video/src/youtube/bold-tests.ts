import assert from "node:assert/strict";
import {
  boldState,
  boldFocus,
  boldGestures,
  BOLD_SIZES,
  settle,
  sourceResponse,
} from "./bold-motion";
import { hierarchyState } from "./hierarchy-motion";
for (let frame = 0; frame <= 390; frame++) {
  const t = frame / 30,
    k = boldState(t),
    prior = hierarchyState(t);
  assert.deepEqual(k, boldState(t));
  assert.equal(k.filled, prior.filled);
  assert.equal(k.letter.opacity, prior.letter.opacity);
  assert.equal(k.portrait.opacity, 0);
  assert.equal(k.name.opacity, 0);
  assert(
    k.aPose.sx > 0.7 &&
      k.aPose.sy > 0.7 &&
      k.bPose.sx > 0.7 &&
      k.bPose.sy > 0.7,
  );
  assert(k.book >= 0 && k.book < 1.11);
  for (const v of Object.values(boldFocus(t))) assert(v >= 0 && v <= 1);
  for (const v of Object.values(boldGestures(t))) assert(Number.isFinite(v));
  const rx = 145 * k.letter.scale,
    ry = 80 * k.letter.scale;
  assert(k.letter.x - rx > 100 && k.letter.x + rx < 1820);
  assert(k.letter.y - ry > 100 && k.letter.y + ry < 950);
  if (t < 5.7) assert.equal(k.book, 0, "hierarchy preserved before catch");
  if (t >= 8) {
    assert(Math.abs(k.letter.y - prior.letter.y) < 1e-8);
    assert(Math.abs(k.letter.scale - prior.letter.scale) < 1e-8);
  }
}
assert(boldState(4).letter.scale / hierarchyState(4).letter.scale > 1.45);
assert(
  BOLD_SIZES.courier > 190 &&
    BOLD_SIZES.archivist > 220 &&
    BOLD_SIZES.operator > 130,
);
assert.equal(Math.abs(settle(10, 7.65)), 0);
assert.equal(Math.abs(sourceResponse(2.25).rotation), 0);
assert.equal(Math.abs(sourceResponse(2.25).scaleOffset), 0);
console.log(
  "Bold: larger cast/payload, hierarchy and docking timing, bounded scale/flight, deterministic settle passed.",
);
