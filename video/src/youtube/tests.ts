import assert from "node:assert/strict";
import { characterPose } from "./character-motion";
import { editTimeline, openingScale, durationInOutputFrames } from "./timing";
import type { YouTubeEditManifest } from "./types";
import { hopFace, facePresets, relayFace } from "./face-motion";
import {
  easeOut,
  easeInOut,
  settle,
  relayPosition,
  naturalHop,
  restingSprite,
  footClearance,
} from "./glass-motion";
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
assert.equal(relayPosition(6.5).x, 1300);
assert.ok(Math.abs(relayPosition(6.5).y - 610) < 1e-8);
for (let frame = 0; frame < 240; frame++) {
  const a = relayPosition(frame / 30);
  assert.deepEqual(a, relayPosition(frame / 30));
  assert.ok(Object.values(a).every(Number.isFinite));
  assert.ok(a.x >= 290 && a.x <= 1308 && a.y >= 480 && a.y <= 610);
}
assert.deepEqual(naturalHop(0, 1, 1, 100), restingSprite());
assert.deepEqual(naturalHop(3.1, 1, 1, 100), restingSprite());
assert.ok(
  naturalHop(0.99, 1, 1, 100).sy < 0.92,
  "anticipation before lift-off",
);
assert.ok(
  naturalHop(2.11, 1, 1, 100).sy < 0.87,
  "absorb impact instead of freezing",
);
assert.ok(naturalHop(2.36, 1, 1, 100).sy > 1, "small recovery overshoot");
for (const boundary of [0.82, 1, 2, 2.11, 2.66, 2.96, 3.005]) {
  const a = naturalHop(boundary - 1e-6, 1, 1, 100),
    b = naturalHop(boundary + 1e-6, 1, 1, 100);
  for (const key of Object.keys(a) as (keyof typeof a)[])
    assert.ok(
      Math.abs(a[key] - b[key]) < 0.01,
      `continuous ${key} at ${boundary}`,
    );
}
for (const fps of [24, 30, 60])
  for (let frame = 0; frame < fps * 4; frame++) {
    const t = frame / fps,
      p = naturalHop(t, 1, 1, 100);
    assert.deepEqual(p, naturalHop(t, 1, 1, 100), "landing remains seek-safe");
    assert.ok(Object.values(p).every(Number.isFinite));
    assert.ok(p.sy >= 0.85 && p.sy <= 1.1 && p.sx > 0 && p.lift >= 0);
    const floor = footClearance(p.tilt, 160, p.sx);
    for (const footX of [52, 69, 77, 94, 124, 141, 149, 166]) {
      const bottom =
        (footX / 200 - 0.5) * 160 * p.sx * Math.sin((p.tilt * Math.PI) / 180) -
        floor -
        p.lift;
      assert.ok(
        bottom <= 1e-8,
        "tilted soles never penetrate the contact plane",
      );
    }
  }
assert.deepEqual(hopFace(0, 1, 1), facePresets.neutral);
assert.ok(hopFace(0.95, 1, 1).leftOpen < 0.7);
assert.ok(hopFace(1.4, 1, 1).leftOpen > 1.2);
assert.ok(hopFace(2.1, 1, 1).leftOpen < 0.2);
assert.ok(hopFace(2.6, 1, 1).happy > 0.95);
for (let f = 0; f < 480; f++) {
  const t = f / 60,
    a = relayFace(t),
    b = relayFace(t + 1e-5);
  assert.deepEqual(a, relayFace(t));
  for (const key of Object.keys(a) as (keyof typeof a)[]) {
    assert.ok(Number.isFinite(a[key]));
    assert.ok(Math.abs(a[key] - b[key]) < 0.005, "no facial hard-switch");
  }
  assert.ok(
    a.leftOpen >= 0.14 && a.rightOpen >= 0.14 && a.happy >= 0 && a.happy <= 1,
  );
}
console.log(
  "Passed: EDL timing, segment validation, opening zoom, character poses, glass easing, bounded sprite travel, landing continuity, impact/recovery, and seek determinism at 24/30/60fps.",
);
