import assert from "node:assert/strict";
import { castMotion, characterFace, dressedPose } from "./cast-motion";
import { kineticState } from "./kinetic-motion";
import { facePresets } from "./face-motion";

for (let frame = 0; frame <= 390; frame++) {
  const t = frame / 30,
    c = castMotion(t),
    k = kineticState(t);
  assert.deepEqual(c, castMotion(t), "seek deterministic");
  for (const v of Object.values(c)) assert(Number.isFinite(v));
  for (const role of [0, 1, 2]) {
    const gesture = [c.courier, c.archivist, c.operator][role];
    const pose = dressedPose(
      [k.aPose, k.bPose, k.third.pose][role],
      gesture,
      t,
      role,
    );
    assert(pose.sx > 0.7 && pose.sy > 0.7);
    const face = characterFace(facePresets.neutral, t, role);
    assert(face.leftOpen >= 0 && face.leftOpen <= 1);
    assert(face.rightOpen >= 0 && face.rightOpen <= 1);
  }
  const next = castMotion(t + 1 / 3000);
  for (const key of Object.keys(c) as (keyof typeof c)[])
    assert(Math.abs(c[key] - next[key]) < 0.1, `${key} continuity`);
}
assert.notEqual(castMotion(3.4).courier, castMotion(3.4).operator);
assert.notEqual(castMotion(3.3).crank, castMotion(3.5).crank);
assert.equal(Math.abs(castMotion(13).crank), 0);
assert.equal(castMotion(13).seal, 0);
assert.equal(castMotion(13).sheen, 1);
console.log(
  "Cast: deterministic gestures, continuous controls, face ranges, role differentiation and final settle passed.",
);
