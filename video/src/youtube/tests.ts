import assert from "node:assert/strict";
import { characterPose } from "./character-motion";
import { editTimeline, openingScale, durationInOutputFrames } from "./timing";
import type { YouTubeEditManifest } from "./types";
import { easeOut, easeInOut, settle, relayPosition } from "./glass-motion";
const m: YouTubeEditManifest = {
  version: 1,
  profile: "screen-demo",
  source: "a.mp4",
  sourceFps: 24,
  outputFps: 30,
  segments: Array.from({ length: 100 }, (_, i) => ({
    sourceStartFrame: i * 10,
    sourceEndFrame: i * 10 + 1,
  })),
};
assert.equal(
  durationInOutputFrames(m),
  125,
  "cumulative quantization avoids drift",
);
const timeline = editTimeline(m);
timeline
  .slice(1)
  .forEach((s, i) =>
    assert.equal(s.from, timeline[i].from + timeline[i].duration),
  );
assert.throws(() =>
  editTimeline({
    ...m,
    segments: [{ sourceStartFrame: 3, sourceEndFrame: 3 }],
  }),
);
assert.equal(openingScale(0), 1);
assert.ok(openingScale(0.2) - 1 > openingScale(3.2) - openingScale(3));
assert.ok(openingScale(20) < 1.071);
const crouch = characterPose(6, 30, "hop"),
  apex = characterPose(17, 30, "hop"),
  land = characterPose(28, 30, "hop"),
  settled = characterPose(45, 30, "hop");
assert.ok(crouch.sy < 1 && apex.y > 0.5 && land.sy < 1);
assert.equal(settled.y, 0);
assert.equal(settled.sy, 1);
assert.deepEqual(
  characterPose(18, 30, "walk"),
  characterPose(18, 30, "walk"),
  "seek deterministic",
);
for (const action of ["idle", "walk", "hop", "cheer", "surprised"] as const)
  for (let frame = 0; frame < 150; frame++) {
    const pose = characterPose(frame, 30, action);
    assert.ok(Object.values(pose).every(Number.isFinite));
    assert.ok(pose.sy > 0 && pose.sx > 0);
  }
for (const ease of [easeOut, easeInOut, settle]) {
  assert.equal(ease(-1, 0, 1), 0);
  assert.equal(ease(2, 0, 1), 1);
}
assert.deepEqual(relayPosition(0), { x: 290, y: 610 });
assert.equal(relayPosition(6).x, 1300);
assert.ok(Math.abs(relayPosition(6).y - 610) < 1e-8);
for (let frame = 0; frame < 240; frame++) {
  const a = relayPosition(frame / 30);
  assert.deepEqual(a, relayPosition(frame / 30));
  assert.ok(Object.values(a).every(Number.isFinite));
  assert.ok(a.x >= 290 && a.x <= 1300 && a.y >= 480 && a.y <= 610);
}
console.log(
  "Passed: cumulative EDL timing, segment validation, opening zoom, deterministic character poses, hop phases, finite transforms, glass easing endpoints, and bounded seek-safe sprite hand-offs.",
);
