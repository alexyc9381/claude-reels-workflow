// One-off: generate VO in Alex's ElevenLabs voice + word-level timings for the Claude Design reel.
// Reuses the ELEVENLABS_API_KEY from ~/Downloads/venture-style/.env. Outputs into this project.
import fs from "fs";
import path from "path";
import os from "os";
import { execFileSync } from "child_process";

const HOME = os.homedir();
const VIDEO = path.join(HOME, "Downloads", "matchtern-longform", "video");
const PUBLIC = path.join(VIDEO, "public");
const DATA = path.join(VIDEO, "src", "data");
const TOOLS = path.join(HOME, "Downloads", "matchtern-longform", "tools");
const FFMPEG = path.join(TOOLS, "node_modules", "ffmpeg-static", "ffmpeg");
const FFPROBE = path.join(TOOLS, "node_modules", "ffprobe-static", "bin", "darwin", "arm64", "ffprobe");

// load key from venture-style/.env
const ENV_FILE = path.join(HOME, "Downloads", "venture-style", ".env");
for (const line of fs.readFileSync(ENV_FILE, "utf8").split("\n")) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}
const key = process.env.ELEVENLABS_API_KEY;
if (!key) throw new Error("ELEVENLABS_API_KEY missing in venture-style/.env");

// Instant-clone voice (XgpN3wpaGUkiLj9kaZJG) is blocked on the current plan, so use a
// premade narrator. Brian = natural American narration; Adam = fallback (confirmed working).
const VOICE_CANDIDATES = [
  process.env.VO_VOICE || "nPczCjzI2devNBz1zQrb", // Brian
  "pNInz6obpgDQGcFmaJgB", // Adam (fallback)
];
const narration = [
  "Anthropic just dropped something that should make Figma nervous.",
  "It's called Claude Design.",
  "You describe what you want — a landing page, a deck, a prototype —",
  "and Claude designs it. Polished, on-brand, in seconds.",
  "But here's the part nobody's ready for.",
  "You can import your entire design system — straight from GitHub or your design files —",
  "and Claude builds with your components, checks its own work, and fixes the mistakes before you ever see them.",
  "The question isn't \"can AI design\" anymore.",
  "It's what you'll do with all the time you just got back.",
];
const text = narration.join(" ");

function wordsFromAlignment(al) {
  const chars = al.characters;
  const starts = al.character_start_times_seconds;
  const ends = al.character_end_times_seconds;
  const words = [];
  let cur = "", s = null, e = null;
  for (let i = 0; i < chars.length; i++) {
    const c = chars[i];
    if (/\s/.test(c)) {
      if (cur) { words.push({ word: cur, start: s, end: e }); cur = ""; s = null; }
      continue;
    }
    if (s == null) s = starts[i];
    e = ends[i];
    cur += c;
  }
  if (cur) words.push({ word: cur, start: s, end: e });
  return words;
}

async function tts(voiceId) {
  return fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/with-timestamps`, {
    method: "POST",
    headers: { "xi-api-key": key, "Content-Type": "application/json" },
    body: JSON.stringify({
      text,
      model_id: "eleven_multilingual_v2",
      voice_settings: { stability: 0.45, similarity_boost: 0.8, style: 0.15, use_speaker_boost: true },
    }),
  });
}

let data = null, usedVoice = null;
for (const vid of VOICE_CANDIDATES) {
  console.log(`ElevenLabs TTS (voice ${vid}, ${text.length} chars)…`);
  const res = await tts(vid);
  if (res.ok) { data = await res.json(); usedVoice = vid; break; }
  console.log(`  voice ${vid} failed: HTTP ${res.status} ${(await res.text()).slice(0, 120)}`);
}
if (!data) throw new Error("All voice candidates failed.");

fs.mkdirSync(PUBLIC, { recursive: true });
fs.mkdirSync(DATA, { recursive: true });
const mp3 = path.join(PUBLIC, "vo.mp3");
fs.writeFileSync(mp3, Buffer.from(data.audio_base64, "base64"));

const al = data.alignment || data.normalized_alignment;
const words = wordsFromAlignment(al);

// tag each word with the narration line it belongs to (for scene mapping)
const lineWordCounts = narration.map((l) => l.trim().split(/\s+/).length);
let wi = 0;
for (let li = 0; li < lineWordCounts.length; li++) {
  for (let k = 0; k < lineWordCounts[li] && wi < words.length; k++, wi++) words[wi].line = li;
}
fs.writeFileSync(path.join(DATA, "words.json"), JSON.stringify(words, null, 2));

const dur = parseFloat(
  execFileSync(FFPROBE, ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", mp3]).toString().trim()
);
fs.writeFileSync(path.join(PUBLIC, "vo.meta.json"), JSON.stringify({ durationSec: dur, voice: usedVoice, narration }, null, 2));
console.log(`vo.mp3 ${dur.toFixed(2)}s (voice ${usedVoice}), ${words.length} words aligned across ${narration.length} lines.`);
console.log("last word ends at", words[words.length - 1]?.end);
