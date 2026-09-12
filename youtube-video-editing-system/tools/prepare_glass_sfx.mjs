// Adapt existing bundled recordings, never synthesize replacement source effects.
// node prepare_glass_sfx.mjs /absolute/resolved-sfx /absolute/public/sfx-premium
// Needs ffmpeg on PATH. Input IDs are recorded by media-use's asset ledger.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
const [src, dest, specPath] = process.argv.slice(2);
if (!src || !dest)
  throw new Error("Supply resolved SFX directory and output directory");
const out = resolve(dest);
mkdirSync(out, { recursive: true });
const spec = JSON.parse(
  readFileSync(
    specPath
      ? resolve(specPath)
      : join(
          dirname(fileURLToPath(import.meta.url)),
          "../glass-sound-cues.json",
        ),
    "utf8",
  ),
);
const sr = spec.sampleRate;
const decode = (file) => {
  const r = spawnSync(
    "ffmpeg",
    [
      "-v",
      "error",
      "-i",
      file,
      "-ac",
      "1",
      "-ar",
      String(sr),
      "-c:a",
      "pcm_s16le",
      "-f",
      "wav",
      "pipe:1",
    ],
    { maxBuffer: 10e6 },
  );
  if (r.status !== 0) throw new Error(r.stderr.toString());
  const b = r.stdout;
  let pos = 12;
  while (pos + 8 < b.length) {
    const id = b.toString("ascii", pos, pos + 4),
      n = b.readUInt32LE(pos + 4);
    if (id === "data") {
      const pcm = b.subarray(pos + 8);
      return Float64Array.from(
        { length: Math.floor(pcm.length / 2) },
        (_, i) => pcm.readInt16LE(i * 2) / 32768,
      );
    }
    pos += 8 + n + (n % 2);
  }
  throw new Error("No PCM data");
};
const wav = (channels, file) => {
  const count = channels.length,
    n = channels[0].length,
    b = Buffer.alloc(44 + n * count * 2);
  b.write("RIFF");
  b.writeUInt32LE(b.length - 8, 4);
  b.write("WAVEfmt ", 8);
  b.writeUInt32LE(16, 16);
  b.writeUInt16LE(1, 20);
  b.writeUInt16LE(count, 22);
  b.writeUInt32LE(sr, 24);
  b.writeUInt32LE(sr * count * 2, 28);
  b.writeUInt16LE(count * 2, 32);
  b.writeUInt16LE(16, 34);
  b.write("data", 36);
  b.writeUInt32LE(n * count * 2, 40);
  for (let i = 0; i < n; i++)
    for (let c = 0; c < count; c++)
      b.writeInt16LE(
        Math.round(Math.max(-0.999, Math.min(0.999, channels[c][i])) * 32767),
        44 + (i * count + c) * 2,
      );
  writeFileSync(file, b);
};
const configs = {
  glide: {
    source: "sfx_001.mp3",
    speed: 0.9,
    max: 0.72,
    cutoff: 3600,
    peak: 0.25,
  },
  tap: {
    source: "sfx_002.mp3",
    speed: 0.93,
    max: 0.24,
    cutoff: 4200,
    peak: 0.15,
  },
  glass: {
    source: "sfx_003.mp3",
    speed: 1,
    max: 1.8,
    cutoff: 5400,
    peak: 0.21,
  },
  land: {
    source: "sfx_004.mp3",
    speed: 0.68,
    max: 0.36,
    cutoff: 1400,
    peak: 0.23,
  },
};
const assets = {},
  report = {
    source: "media-use bundled effects, resolved locally",
    sampleRate: sr,
    assets: {},
  };
for (const [name, cfg] of Object.entries(configs)) {
  Object.assign(cfg, spec.assets?.[name] ?? {});
  const source = join(src, cfg.source),
    input = decode(source);
  // Remove only leading near-silence, preserving the recorded attack.
  let start = 0;
  while (start < input.length && Math.abs(input[start]) < 0.003) start++;
  start = Math.max(0, start - Math.round(sr * 0.008));
  const n = Math.min(
    Math.floor((input.length - start) / cfg.speed),
    Math.round(cfg.max * sr),
  );
  const data = new Float64Array(n);
  let low = 0,
    dc = 0,
    peak = 0;
  const alpha = 1 - Math.exp((-2 * Math.PI * cfg.cutoff) / sr),
    highpass = 1 - Math.exp((-2 * Math.PI * (cfg.highpass ?? 70)) / sr);
  for (let i = 0; i < n; i++) {
    const p = start + i * cfg.speed,
      j = Math.floor(p),
      f = p - j,
      x = (input[j] ?? 0) * (1 - f) + (input[j + 1] ?? 0) * f;
    dc += highpass * (x - dc);
    low += alpha * (x - dc - low);
    const attack = Math.min(1, i / (sr * (cfg.attack ?? 0.008))),
      release = Math.min(
        1,
        (n - 1 - i) / (sr * (cfg.release ?? (name === "glass" ? 0.25 : 0.07))),
      );
    data[i] =
      low *
      Math.sin((attack * Math.PI) / 2) ** 2 *
      Math.sin((release * Math.PI) / 2) ** 2;
    peak = Math.max(peak, Math.abs(data[i]));
  }
  if (peak < 1e-6) throw new Error(`Empty effect: ${name}`);
  for (let i = 0; i < n; i++) data[i] *= cfg.peak / peak;
  assets[name] = data;
  wav([data], join(out, `${name}.wav`));
  report.assets[name] = {
    ...cfg,
    duration: n / sr,
    sourceSha256: createHash("sha256")
      .update(readFileSync(source))
      .digest("hex"),
  };
}
const mix = [
  new Float64Array(sr * spec.duration),
  new Float64Array(sr * spec.duration),
];
for (const cue of spec.cues) {
  const data = assets[cue.sound],
    at = Math.round(cue.at * sr);
  if (!data || at < 0 || at >= mix[0].length)
    throw new Error("Invalid sound cue");
  for (let i = 0; i < data.length && at + i < mix[0].length; i++) {
    const u = Math.max(
      0,
      Math.min(1, i / (sr * (cue.panDuration ?? data.length / sr))),
    );
    const ease = u ** 3 * (u * (6 * u - 15) + 10);
    const pan = cue.pan + ((cue.panEnd ?? cue.pan) - cue.pan) * ease;
    const p = ((pan + 1) * Math.PI) / 4;
    const sample = data[i] * cue.gain;
    mix[0][at + i] += sample * Math.cos(p);
    mix[1][at + i] += sample * Math.sin(p);
    // One low-level, symmetric room reflection: depth without Haas widening.
    const delay = Math.round(((cue.reflectionMs ?? 0) * sr) / 1000);
    if (delay > 0 && at + i + delay < mix[0].length) {
      mix[0][at + i + delay] +=
        sample * (cue.reflectionGain ?? 0) * Math.cos(p);
      mix[1][at + i + delay] +=
        sample * (cue.reflectionGain ?? 0) * Math.sin(p);
    }
  }
}
// Audition gain: no voice in this review. Reduce this bus for narrated edits.
const masterGain = spec.masterGain ?? 2;
let peak = 0,
  sum = 0;
for (const c of mix)
  for (let i = 0; i < c.length; i++) {
    c[i] *= masterGain;
    const x = c[i];
    peak = Math.max(peak, Math.abs(x));
    sum += x * x;
  }
if (peak > 0.85) throw new Error(`Mix too hot: ${peak}`);
report.mix = {
  duration: spec.duration,
  masterGain,
  peakDbfs: 20 * Math.log10(peak),
  rmsDbfs: 20 * Math.log10(Math.sqrt(sum / (2 * mix[0].length))),
  cues: spec.cues,
};
wav(mix, join(out, "glass-mix.wav"));
writeFileSync(
  join(out, "sound-report.json"),
  JSON.stringify(report, null, 2) + "\n",
);
console.log(JSON.stringify(report.mix, null, 2));
