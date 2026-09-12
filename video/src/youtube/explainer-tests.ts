import assert from "node:assert/strict";
import {
  beats,
  EXPLAINER_SECONDS,
  formState,
  smooth,
} from "./explainer-motion";
assert.equal(beats[0].start, 0);
assert.equal(beats.at(-1)?.end, EXPLAINER_SECONDS);
beats.slice(1).forEach((beat, i) => assert.equal(beat.start, beats[i].end));
assert.equal(formState(0).x, 350);
assert.equal(formState(7).x, 960);
assert.equal(formState(12).y, 772);
assert.equal(formState(15).filled, false);
assert.equal(formState(16).filled, true);
assert.equal(formState(18.5).passed, false);
assert.equal(formState(19).passed, true);
assert.equal(formState(22).x, 1550);
assert.equal(formState(22).delivered, true);
assert.equal(smooth(-2, 0, 1), 0);
assert.equal(smooth(2, 0, 1), 1);
for (const fps of [24, 30, 60]) {
  for (let f = 0; f < EXPLAINER_SECONDS * fps; f++) {
    const t = f / fps,
      state = formState(t);
    assert.ok(state.x >= 350 && state.x <= 1550);
    assert.ok(state.y >= 490 && state.y <= 772);
    assert.ok(state.scale >= 0.8 && state.scale <= 1);
    assert.ok(!state.passed || state.filled);
    assert.ok(!state.delivered || state.passed);
    assert.deepEqual(formState(t), state, "seek independent");
    const next = formState(t + 1e-6);
    assert.ok(Math.abs(next.x - state.x) < 0.01);
    assert.ok(Math.abs(next.y - state.y) < 0.01);
  }
}
console.log(
  "Explainer narrative, state, bounds, and continuity checks passed.",
);
