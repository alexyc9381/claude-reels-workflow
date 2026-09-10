// Original deterministic, quiet Foley-like UI accents. No external assets.
// node make_character_sfx.mjs /absolute/public/sfx
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
const dest = process.argv[2];
if (!dest) throw new Error("Pass an output directory");
mkdirSync(dest, { recursive: true });
const rate = 48000,
  duration = 1.6;
const tone = (t, start, length, hz, end = hz, gain = 0.15) => {
  const x = t - start;
  if (x < 0 || x > length) return 0;
  const env = Math.sin((Math.PI * x) / length) ** 2;
  return (
    Math.sin(2 * Math.PI * (hz * x + ((end - hz) * x * x) / (2 * length))) *
    env *
    gain
  );
};
for (const name of ["hop", "surprised", "cheer"]) {
  const n = Math.round(rate * duration),
    wav = Buffer.alloc(44 + n * 2);
  wav.write("RIFF");
  wav.writeUInt32LE(wav.length - 8, 4);
  wav.write("WAVEfmt ", 8);
  wav.writeUInt32LE(16, 16);
  wav.writeUInt16LE(1, 20);
  wav.writeUInt16LE(1, 22);
  wav.writeUInt32LE(rate, 24);
  wav.writeUInt32LE(rate * 2, 28);
  wav.writeUInt16LE(2, 32);
  wav.writeUInt16LE(16, 34);
  wav.write("data", 36);
  wav.writeUInt32LE(n * 2, 40);
  for (let i = 0; i < n; i++) {
    const t = i / rate;
    const v =
      name === "hop"
        ? tone(t, 0.2, 0.24, 190, 550, 0.12) + tone(t, 0.9, 0.16, 105, 65, 0.24)
        : name === "surprised"
          ? tone(t, 0.15, 0.23, 460, 690, 0.1)
          : tone(t, 0.1, 0.35, 523, 523, 0.09) +
            tone(t, 0.28, 0.38, 659, 659, 0.08) +
            tone(t, 0.46, 0.5, 784, 784, 0.07);
    wav.writeInt16LE(
      Math.round(Math.max(-0.9, Math.min(0.9, v)) * 32767),
      44 + i * 2,
    );
  }
  writeFileSync(join(resolve(dest), `${name}.wav`), wav);
}
