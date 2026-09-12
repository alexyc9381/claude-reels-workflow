import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { kineticState, KINETIC_RATE, KINETIC_SECONDS } from "./kinetic-motion";
const cues = JSON.parse(
  readFileSync(
    "../youtube-video-editing-system/kinetic-sound-cues.json",
    "utf8",
  ),
);
assert.equal(cues.duration, KINETIC_SECONDS);
for (const fps of [24, 30, 60])
  for (let f = 0; f < KINETIC_SECONDS * fps; f++) {
    const t = (f / fps) * KINETIC_RATE,
      s = kineticState(t),
      n = kineticState(t + 1e-7);
    assert.deepEqual(s, kineticState(t));
    assert.ok(s.ax >= 260 && s.bx + 220 < 1660 && s.third.x + 130 < 1660);
    assert.ok(
      s.ax + 190 < s.bx - 60 && s.bx + 220 < s.third.x - 40,
      "clear actor zones",
    );
    assert.ok(
      Math.abs(s.ax - n.ax) < 0.001 && Math.abs(s.third.x - n.third.x) < 0.001,
    );
    if (t >= 3.1 && t < 4.9)
      assert.ok(
        Math.abs(s.letter.x - s.ax - 95) < 1e-8,
        "same carried payload",
      );
    assert.ok(
      s.aWalk >= 0 && s.aWalk <= 1 && s.third.walk >= 0 && s.third.walk <= 1,
    );
    if (s.name.opacity > 0.05 && s.letter.opacity > 0.05) {
      const separated =
        s.name.x - 80 > s.letter.x + 145 * s.letter.scale ||
        s.name.y + 35 < s.letter.y - 80 * s.letter.scale;
      assert.ok(separated, "name transfer does not obscure email payload");
    }
    if (t < 7.65) assert.equal(s.filled, 0, "no premature email");
  }
for (const oldTime of [
  1.25, 1.45, 2.85, 3.5, 5.7, 6.85, 7.3, 7.65, 9.95, 10.25, 10.3,
])
  assert.ok(
    cues.cues.some((c: any) => Math.abs(c.at - oldTime / KINETIC_RATE) < 1e-9),
    "cue shares visual clock",
  );
// Explicit evidence of overlapping jobs, not a generic camera-motion score.
const at = kineticState(2.5),
  next = kineticState(2.55);
assert.notEqual(at.portrait.x, next.portrait.x);
assert.notEqual(at.name.x, next.name.x);
assert.notEqual(at.letter.y, next.letter.y);
assert.notEqual(at.book, next.book);
assert.notEqual(kineticState(6.1).ax, kineticState(6.2).ax);
assert.notEqual(kineticState(6.1).third.x, kineticState(6.2).third.x);
console.log(
  "Kinetic overlap, actor spacing, payload readability, safe area and synchronized cue checks passed.",
);
