import assert from "node:assert/strict";
import { stageState, STAGE_SECONDS } from "./stage-motion";
assert.equal(stageState(0).sprite.x, 140);
assert.equal(stageState(2).sprite.x, 630);
assert.equal(stageState(6.5).sprite.x, 1030);
assert.equal(stageState(14).sprite.x, 1210);
assert.equal(stageState(17).sprite.x, 1580);
assert.equal(stageState(9.6).replied, false);
assert.equal(stageState(9.7).replied, true);
assert.equal(stageState(16).saved, false);
assert.equal(stageState(16.2).saved, true);
for (const fps of [24, 30, 60])
  for (let f = 0; f < fps * STAGE_SECONDS; f++) {
    const t = f / fps,
      s = stageState(t),
      n = stageState(t + 1e-6);
    assert.ok(s.sprite.x >= 140 && s.sprite.x <= 1580);
    assert.ok(s.sprite.walk >= 0 && s.sprite.walk <= 1);
    assert.ok(s.sprite.pose.sy > 0 && s.sprite.pose.sx > 0);
    assert.ok(!s.saved || s.replied);
    assert.ok(Math.abs(s.sprite.x - n.sprite.x) < 0.01);
    assert.ok(Math.abs(s.email.x - n.email.x) < 0.01);
    assert.deepEqual(s, stageState(t));
    if (t >= 5 && t <= 6.2) {
      // Push contact: the field and actor move by exactly the same displacement.
      assert.ok(Math.abs(s.email.x - s.sprite.x - 530) < 1e-8);
    }
  }
const final = stageState(19);
assert.ok(
  final.name.x - (1080 * final.name.scale) / 2 > 960,
  "name clear of book spine",
);
assert.ok(
  final.email.x - (1000 * final.email.scale) / 2 > 960,
  "email clear of book spine",
);
assert.ok(
  final.email.x + (1000 * final.email.scale) / 2 < 1830,
  "email within book page",
);
assert.ok(
  Math.abs(stageState(1.75).sprite.y + 240 * 0.92 - 870) < 1,
  "first foot contact on control",
);
assert.ok(
  Math.abs(stageState(15.9).sprite.y + 240 * 0.92 - 870) < 1,
  "save foot contact on control",
);
console.log(
  "Stage timing, causal contact, bounds, spine clearance and seek checks passed.",
);
