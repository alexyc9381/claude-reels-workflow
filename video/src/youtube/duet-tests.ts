import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { DUET_SECONDS, DUET_EVENTS, duetState } from "./duet-motion";
const cues = JSON.parse(
  readFileSync("../youtube-video-editing-system/duet-sound-cues.json", "utf8"),
);
assert.equal(cues.duration, DUET_SECONDS);
for (const fps of [24, 30, 60])
  for (let f = 0; f < fps * DUET_SECONDS; f++) {
    const t = f / fps,
      s = duetState(t),
      n = duetState(t + 1e-7);
    assert.deepEqual(s, duetState(t));
    assert.ok(s.ax >= 260 && s.bx + 220 <= 1660);
    assert.ok(s.bx - (s.ax + 190) > 65, "partner silhouettes never collide");
    assert.ok(
      s.letter.x - 145 * s.letter.scale > 260 &&
        s.letter.x + 145 * s.letter.scale < 1660,
    );
    assert.ok(
      s.letter.y - 80 * s.letter.scale >= 170,
      "letter remains inside top safe area",
    );
    assert.ok(
      Math.abs(s.letter.x - n.letter.x) < 0.001 &&
        Math.abs(s.letter.y - n.letter.y) < 0.001,
      "continuous payload",
    );
    assert.ok(s.aPose.sy > 0 && s.bPose.sy > 0);
    assert.ok(!s.filled || t >= DUET_EVENTS.file);
    if (t >= 3.1 && t < 4.9) {
      assert.ok(Math.abs(s.letter.x - (s.ax + 95)) < 1e-8);
      assert.equal(s.letter.y, 627);
    }
    if (t >= 5.7 && t < 6.65)
      assert.ok(
        Math.abs(s.letter.x - (s.bx + 110)) < 1e-8,
        "caught payload follows receiver recoil",
      );
  }
for (const at of [
  DUET_EVENTS.retrieve,
  DUET_EVENTS.catch,
  DUET_EVENTS.file,
  DUET_EVENTS.celebrateA,
  DUET_EVENTS.celebrateB,
])
  assert.ok(cues.cues.some((c: any) => c.at === at));
assert.ok(
  duetState(2.25).letter.y + 80 < 350,
  "paper fully clears pocket before foreground handoff",
);
assert.ok(Math.abs(duetState(7.65).letter.x - 1317) < 1e-8);
assert.ok(Math.abs(duetState(7.65).letter.y - 473) < 1e-8);
console.log(
  "Duet: deterministic motion, safe area, partner clearance, payload attachment and sound-contact checks passed.",
);
