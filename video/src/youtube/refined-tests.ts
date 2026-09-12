import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { refinedState, REFINED_SECONDS } from "./refined-motion";
const cues = JSON.parse(
  readFileSync(
    "../youtube-video-editing-system/refined-sound-cues.json",
    "utf8",
  ),
);
assert.equal(cues.duration, REFINED_SECONDS);
for (const fps of [24, 30, 60])
  for (let f = 0; f < fps * REFINED_SECONDS; f++) {
    const t = f / fps,
      s = refinedState(t),
      n = refinedState(t + 1e-6);
    assert.deepEqual(s, refinedState(t), "deterministic seek");
    assert.ok(
      s.record.x >= 260 && s.record.x + s.record.w + 22 <= 1660,
      "record + tab within safe stage",
    );
    assert.ok(s.source.x >= 260 && s.source.x + s.source.w <= 1660);
    assert.ok(s.sprite.x >= 260 && s.sprite.x + 200 <= 1660);
    assert.ok(
      s.sprite.y + 184 <= 930 && s.sprite.y - s.sprite.pose.lift >= 170,
    );
    assert.ok(s.sprite.walk >= 0 && s.sprite.walk <= 1);
    assert.ok(
      !s.saved || s.filled === 1,
      "finish cannot precede supplied email",
    );
    assert.ok(Math.abs(s.record.x - n.record.x) < 0.01);
    assert.ok(Math.abs(s.sprite.x - n.sprite.x) < 0.01);
    if (t >= 4.1 && t < 12.1)
      assert.ok(
        s.record.x - (s.source.x + s.source.w) >= 80,
        "aligned panel gutter",
      );
    if (s.reply.opacity > 0.01) {
      assert.ok(
        s.reply.x - 95 * s.reply.scale >= 260 &&
          s.reply.x + 95 * s.reply.scale <= 1660,
      );
      assert.ok(s.reply.y - 52 * s.reply.scale >= 170);
    }
  }
const landed = refinedState(6.65);
assert.ok(Math.abs(landed.sprite.y + 184 - 858 - landed.press) < 1e-8);
assert.equal(cues.cues.find((c: any) => c.sound === "land").at, 6.65);
assert.equal(refinedState(10.25).filled, 0);
assert.ok(Math.abs(refinedState(10.25).reply.x - 916) < 1e-8);
assert.ok(Math.abs(refinedState(10.25).reply.y - 539) < 1e-8);
assert.equal(refinedState(16).record.x + refinedState(16).record.w / 2, 960);
for (const c of cues.cues) {
  assert.ok(c.at >= 0 && c.at < REFINED_SECONDS && c.gain > 0 && c.gain <= 1);
  assert.ok(Math.abs(c.pan) <= 0.3 && Math.abs(c.panEnd ?? 0) <= 0.3);
  assert.ok(c.purpose.length > 10);
}
console.log(
  "Refined safe area, panel gutter, causal state, landing/audio timing and seek checks passed.",
);
