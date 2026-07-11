// VO for the "Claude loops" reel — premade narrator voice + word-level timings.
import fs from "fs"; import path from "path"; import os from "os"; import { execFileSync } from "child_process";
const HOME = os.homedir();
const VIDEO = path.join(HOME, "Downloads", "matchtern-longform", "video");
const PUBLIC = path.join(VIDEO, "public"); const DATA = path.join(VIDEO, "src", "data");
const TOOLS = path.join(HOME, "Downloads", "matchtern-longform", "tools");
const FFMPEG = path.join(TOOLS, "node_modules", "ffmpeg-static", "ffmpeg");
const FFPROBE = path.join(TOOLS, "node_modules", "ffprobe-static", "bin", "darwin", "arm64", "ffprobe");
const ENV_FILE = path.join(HOME, "Downloads", "venture-style", ".env");
for (const line of fs.readFileSync(ENV_FILE, "utf8").split("\n")) { const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/); if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, ""); }
const key = process.env.ELEVENLABS_API_KEY; if (!key) throw new Error("ELEVENLABS_API_KEY missing");
const VOICE_CANDIDATES = ["XgpN3wpaGUkiLj9kaZJG", "nPczCjzI2devNBz1zQrb"]; // Alex (personal clone) first, Brian fallback
const narration = [
  "You're not supposed to prompt Claude.",
  "You're supposed to build a system that prompts itself.",
  "It's called a loop — and most people build it wrong.",
  "First, a memory file, so it never starts from zero.",
  "Then subagents that split the work in parallel.",
  "And a stop condition, so it doesn't run all night billing you.",
  "Typing one prompt at a time is the slowest way to use Claude.",
  "Build the system once. Let it run itself.",
  "Comment LOOP and I'll send you my setup.",
];
const text = narration.join(" ");
function wordsFromAlignment(al) { const chars = al.characters, starts = al.character_start_times_seconds, ends = al.character_end_times_seconds; const words = []; let cur = "", s = null, e = null; for (let i = 0; i < chars.length; i++) { const c = chars[i]; if (/\s/.test(c)) { if (cur) { words.push({ word: cur, start: s, end: e }); cur = ""; s = null; } continue; } if (s == null) s = starts[i]; e = ends[i]; cur += c; } if (cur) words.push({ word: cur, start: s, end: e }); return words; }
async function tts(v) { return fetch(`https://api.elevenlabs.io/v1/text-to-speech/${v}/with-timestamps`, { method: "POST", headers: { "xi-api-key": key, "Content-Type": "application/json" }, body: JSON.stringify({ text, model_id: "eleven_multilingual_v2", voice_settings: { stability: 0.45, similarity_boost: 0.8, style: 0.18, use_speaker_boost: true } }) }); }
let data = null, used = null;
for (const v of VOICE_CANDIDATES) { console.log(`TTS voice ${v}…`); const r = await tts(v); if (r.ok) { data = await r.json(); used = v; break; } console.log(`  ${v} failed ${r.status} ${(await r.text()).slice(0,100)}`); }
if (!data) throw new Error("all voices failed");
fs.writeFileSync(path.join(PUBLIC, "vo_loops.mp3"), Buffer.from(data.audio_base64, "base64"));
const words = wordsFromAlignment(data.alignment || data.normalized_alignment);
const counts = narration.map((l) => l.trim().split(/\s+/).length); let wi = 0;
for (let li = 0; li < counts.length; li++) for (let k = 0; k < counts[li] && wi < words.length; k++, wi++) words[wi].line = li;
fs.writeFileSync(path.join(DATA, "words_loops.json"), JSON.stringify(words, null, 2));
const dur = parseFloat(execFileSync(FFPROBE, ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", path.join(PUBLIC, "vo_loops.mp3")]).toString().trim());
console.log(`vo_loops.mp3 ${dur.toFixed(2)}s (voice ${used}), ${words.length} words across ${narration.length} lines`);
const byLine = {}; for (const w of words) (byLine[w.line] ||= []).push(w);
for (const li of Object.keys(byLine)) { const ws = byLine[li]; console.log(`L${li} ${ws[0].start.toFixed(2)}-${ws[ws.length-1].end.toFixed(2)} | ${ws.map(w=>w.word).join(' ')}`); }
