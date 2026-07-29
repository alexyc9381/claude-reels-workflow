#!/usr/bin/env node
/**
 * sfx-mcp — MCP server for sourcing reel SFX. Openverse by default (no key),
 * Freesound as an optional upgrade if a token ever exists.
 *
 * Why Openverse: it indexes Freesound's own catalog and serves the audio from
 * cdn.freesound.org with NO auth. Freesound's own API gates behind a login-walled
 * token form; Openverse gets the same sounds without one.
 *
 * Freesound backend activates only if ~/.config/freesound/api_key (or
 * $FREESOUND_API_KEY) exists. Absent that, everything runs through Openverse.
 *
 * Encoded lessons from the earlier fetch_sfx.py work:
 *   - Openverse reports duration in MILLISECONDS, and some records omit it.
 *     Records with no duration are skipped when a duration filter is set, never guessed.
 *   - Short clips rank low, so a duration cap needs pagination or most roles
 *     return nothing. The cap matters more than the query: a 4s whoosh ruins a
 *     3-frame transition.
 */
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { ListToolsRequestSchema, CallToolRequestSchema } from '@modelcontextprotocol/sdk/types.js'

const OV = 'https://api.openverse.org/v1/audio'
const FS_BASE = 'https://freesound.org/apiv2'
const KEY_FILE = path.join(os.homedir(), '.config', 'freesound', 'api_key')
const SFX_ROOT = path.join(os.homedir(), 'Downloads', 'sfx-library')
const CATEGORIES = ['whooshes-transitions', 'risers-cinematic', 'ui-tech', 'meme', 'foley-action']
const UA = 'sfx-mcp (local, claude-reels-workflow)'

function freesoundKey() {
  const env = process.env.FREESOUND_API_KEY
  if (env && env.trim()) return env.trim()
  try {
    const k = fs.readFileSync(KEY_FILE, 'utf8').trim()
    return k || null
  } catch {
    return null
  }
}

/** Reels are monetized, so NonCommercial is a hard block, not a caveat. */
function verdictFor(code) {
  const l = String(code || '').toLowerCase()
  if (/nc/.test(l)) return { safe_for_monetized_reels: false, verdict: 'BLOCKED — NonCommercial. Unusable in monetized reels or ads.' }
  if (/^(cc0|pdm|zero|public)/.test(l) || /creative commons 0/.test(l)) return { safe_for_monetized_reels: true, verdict: 'SAFE — CC0 / public domain. No attribution.' }
  if (/nd/.test(l)) return { safe_for_monetized_reels: false, verdict: 'BLOCKED — NoDerivatives. Cannot be trimmed, layered, or processed.' }
  if (/sampling/.test(l)) return { safe_for_monetized_reels: true, verdict: 'SAFE if transformed — Sampling+ permits commercial use only inside a derivative work.' }
  if (/by|attribution/.test(l)) return { safe_for_monetized_reels: true, verdict: 'SAFE with credit — Attribution required in caption or description.' }
  return { safe_for_monetized_reels: null, verdict: `UNKNOWN license (${code}) — verify before shipping.` }
}

const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 48) || 'sound'

async function getJSON(url) {
  const res = await fetch(url, { headers: { 'User-Agent': UA, Accept: 'application/json' } })
  if (res.status === 429) throw new Error('Rate limited (429). Wait a minute, or narrow the query.')
  if (!res.ok) throw new Error(`HTTP ${res.status} from ${new URL(url).host}: ${(await res.text()).slice(0, 160)}`)
  return res.json()
}

// ---------- Openverse (no key) ----------

function ovFmt(r) {
  const code = r.license_version ? `${r.license}-${r.license_version}` : r.license
  return {
    source: 'openverse',
    id: r.id,
    name: r.title,
    author: r.creator,
    // Openverse reports milliseconds; null when the record omits it.
    duration_s: typeof r.duration === 'number' ? Number((r.duration / 1000).toFixed(2)) : null,
    filetype: r.filetype,
    tags: Array.isArray(r.tags) ? r.tags.map((t) => t.name || t).slice(0, 10) : undefined,
    license: code,
    ...verdictFor(r.license),
    audio_url: r.url,
    page: r.foreign_landing_url,
  }
}

async function ovSearch({ query, limit, min_duration_s, max_duration_s, licensing }) {
  const want = Math.min(Math.max(Number(limit) || 15, 1), 50)
  const license = licensing === 'any' ? null : licensing === 'attribution_ok' ? 'cc0,by,by-sa' : 'cc0'
  const hasDurationFilter = min_duration_s != null || max_duration_s != null

  const kept = []
  let total = 0
  let skippedNoDuration = 0
  // Openverse caps page_size at 20 for anonymous (keyless) requests — exceeding it is a hard 401.
  const OV_ANON_PAGE_MAX = 20
  // Short clips rank low, so a duration cap needs several pages or most roles come back empty.
  // With the page cap at 20 we page deeper to keep the same candidate pool.
  const maxPages = hasDurationFilter ? 5 : 1

  for (let page = 1; page <= maxPages && kept.length < want; page++) {
    const u = new URL(OV)
    u.searchParams.set('q', query)
    u.searchParams.set('page_size', String(Math.min(want * (hasDurationFilter ? 4 : 1), OV_ANON_PAGE_MAX)))
    u.searchParams.set('page', String(page))
    if (license) u.searchParams.set('license', license)

    const data = await getJSON(u.toString())
    // Later pages can report result_count 0; keep the first real figure rather than zeroing it.
    if (data.result_count) total = data.result_count
    const results = data.results || []
    if (!results.length) break

    for (const r of results) {
      const s = ovFmt(r)
      if (hasDurationFilter) {
        // Never guess a missing duration — skip it.
        if (s.duration_s == null) { skippedNoDuration++; continue }
        if (min_duration_s != null && s.duration_s < Number(min_duration_s)) continue
        if (max_duration_s != null && s.duration_s > Number(max_duration_s)) continue
      }
      kept.push(s)
      if (kept.length >= want) break
    }
    if (!data.page_count || page >= data.page_count) break
  }

  return {
    backend: 'openverse (no API key required)',
    returned: kept.length,
    total_matches_before_duration_filter: total,
    pages_scanned: hasDurationFilter ? maxPages : 1,
    skipped_missing_duration: skippedNoDuration || undefined,
    note: kept.length === 0
      ? 'No hits inside the duration cap. Widen max_duration_s or try a different term — short clips rank low on Openverse.'
      : undefined,
    sounds: kept,
  }
}

// ---------- Freesound (optional, needs token) ----------

function fsFmt(s) {
  const p = s.previews || {}
  return {
    source: 'freesound',
    id: String(s.id),
    name: s.name,
    author: s.username,
    duration_s: s.duration != null ? Number(s.duration.toFixed(2)) : null,
    tags: Array.isArray(s.tags) ? s.tags.slice(0, 10) : undefined,
    license: s.license,
    ...verdictFor(s.license),
    audio_url: p['preview-hq-mp3'] || p['preview-lq-mp3'] || null,
    page: `https://freesound.org/s/${s.id}/`,
  }
}

async function fsSearch({ query, limit, min_duration_s, max_duration_s, licensing }) {
  const key = freesoundKey()
  if (!key) throw new Error('Freesound backend needs a token. Use source:"openverse" (the default) which needs none.')
  const filters = []
  if (licensing !== 'any') filters.push('-license:"Attribution NonCommercial"')
  if (min_duration_s != null || max_duration_s != null) filters.push(`duration:[${min_duration_s ?? 0} TO ${max_duration_s ?? '*'}]`)

  const u = new URL(`${FS_BASE}/search/text/`)
  u.searchParams.set('query', query)
  u.searchParams.set('fields', 'id,name,license,previews,username,duration,tags')
  u.searchParams.set('page_size', String(Math.min(Math.max(Number(limit) || 15, 1), 50)))
  if (filters.length) u.searchParams.set('filter', filters.join(' '))

  const res = await fetch(u, { headers: { Authorization: `Token ${key}`, 'User-Agent': UA } })
  if (res.status === 401) throw new Error('Freesound rejected the token (401). Fall back to source:"openverse".')
  if (!res.ok) throw new Error(`Freesound HTTP ${res.status}`)
  const data = await res.json()
  return { backend: 'freesound (token)', returned: (data.results || []).length, total_matches: data.count, sounds: (data.results || []).map(fsFmt) }
}

// ---------- local library (Sonniss et al) ----------

const INDEX_FILE = path.join(SFX_ROOT, '.sfx-index.json')
const AUDIO_EXT = new Set(['.wav', '.mp3', '.aif', '.aiff', '.flac', '.ogg'])

/**
 * Exact duration from a WAV header — no ffprobe needed, which matters because
 * ffmpeg is not on PATH on this machine. Reads only the header bytes, so
 * indexing thousands of multi-MB files stays fast.
 * Returns null for non-WAV or malformed files rather than guessing.
 */
function wavDuration(file) {
  let fd
  try {
    fd = fs.openSync(file, 'r')
    const buf = Buffer.alloc(4096)
    const read = fs.readSync(fd, buf, 0, 4096, 0)
    if (read < 44 || buf.toString('ascii', 0, 4) !== 'RIFF' || buf.toString('ascii', 8, 12) !== 'WAVE') return null

    let off = 12
    let byteRate = null
    while (off + 8 <= read) {
      const id = buf.toString('ascii', off, off + 4)
      const size = buf.readUInt32LE(off + 4)
      // fmt chunk layout: +8 audioFormat, +10 channels, +12 sampleRate, +16 byteRate
      if (id === 'fmt ' && off + 20 <= read) byteRate = buf.readUInt32LE(off + 16)
      if (id === 'data') {
        if (!byteRate) return null
        // data chunk size can be bogus in streamed files; fall back to real file size.
        const dataSize = size > 0 && size !== 0xffffffff ? size : fs.statSync(file).size - (off + 8)
        return Number((dataSize / byteRate).toFixed(3))
      }
      off += 8 + size + (size % 2)
      if (size <= 0) break
    }
    return null
  } catch {
    return null
  } finally {
    if (fd !== undefined) try { fs.closeSync(fd) } catch {}
  }
}

function walk(dir, out = [], depth = 0) {
  if (depth > 8) return out
  let entries
  try { entries = fs.readdirSync(dir, { withFileTypes: true }) } catch { return out }
  for (const e of entries) {
    if (e.name.startsWith('.') || e.name === 'node_modules') continue
    const full = path.join(dir, e.name)
    if (e.isDirectory()) walk(full, out, depth + 1)
    else if (AUDIO_EXT.has(path.extname(e.name).toLowerCase())) out.push(full)
  }
  return out
}

function buildIndex() {
  const files = walk(SFX_ROOT)
  const entries = files.map((f) => {
    let size = 0
    try { size = fs.statSync(f).size } catch {}
    const ext = path.extname(f).toLowerCase()
    return {
      path: f,
      rel: path.relative(SFX_ROOT, f),
      ext: ext.slice(1),
      bytes: size,
      duration_s: ext === '.wav' ? wavDuration(f) : null,
    }
  })
  const index = { built_at_epoch_ms: null, root: SFX_ROOT, count: entries.length, entries }
  fs.writeFileSync(INDEX_FILE, JSON.stringify(index))
  return index
}

function loadIndex() {
  try {
    const idx = JSON.parse(fs.readFileSync(INDEX_FILE, 'utf8'))
    if (idx && Array.isArray(idx.entries)) return idx
  } catch {}
  return buildIndex()
}

function localSearch({ query, limit, min_duration_s, max_duration_s, format }) {
  const idx = loadIndex()
  const terms = String(query || '').toLowerCase().split(/\s+/).filter(Boolean)
  const want = Math.min(Math.max(Number(limit) || 15, 1), 60)

  const scored = []
  for (const e of idx.entries) {
    if (format && e.ext !== String(format).toLowerCase()) continue
    // Only filter on duration when we actually know it — never guess.
    if (min_duration_s != null && (e.duration_s == null || e.duration_s < Number(min_duration_s))) continue
    if (max_duration_s != null && (e.duration_s == null || e.duration_s > Number(max_duration_s))) continue

    const hay = e.rel.toLowerCase()
    if (!terms.length) { scored.push({ ...e, score: 0 }); continue }
    let score = 0
    for (const t of terms) {
      if (path.basename(hay).includes(t)) score += 3
      else if (hay.includes(t)) score += 1
    }
    if (score > 0) scored.push({ ...e, score })
  }

  scored.sort((a, b) => b.score - a.score || (a.duration_s ?? 1e9) - (b.duration_s ?? 1e9))
  return {
    backend: 'local library (offline, no network)',
    library_root: SFX_ROOT,
    indexed_files: idx.count,
    matched: scored.length,
    returned: Math.min(scored.length, want),
    note: scored.length === 0
      ? `No match in ${idx.count} indexed files. Run sfx_index_rebuild if you just added files, or widen the query.`
      : undefined,
    sounds: scored.slice(0, want).map(({ score, ...s }) => s),
  }
}

// ---------- tools ----------

const TOOLS = [
  {
    name: 'sfx_search',
    description:
      'Search Creative Commons SFX. Defaults to Openverse, which needs no API key and indexes Freesound\'s catalog. ' +
      'Every result carries a license verdict; NonCommercial and NoDerivatives are flagged BLOCKED for monetized reels. ' +
      'Set max_duration_s for stings — the cap matters more than the query.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search terms, e.g. "metallic riser", "camera shutter", "gravel footsteps"' },
        limit: { type: 'number', description: 'Results to return, 1-50 (default 15)' },
        max_duration_s: { type: 'number', description: 'Max length in seconds. Transitions usually want <1.5s.' },
        min_duration_s: { type: 'number', description: 'Min length in seconds' },
        licensing: {
          type: 'string',
          enum: ['cc0_only', 'attribution_ok', 'any'],
          description: 'cc0_only (default, no attribution debt); attribution_ok adds CC-BY/BY-SA; any includes NonCommercial',
        },
        source: { type: 'string', enum: ['openverse', 'freesound'], description: 'Backend (default openverse). freesound needs a token.' },
      },
      required: ['query'],
    },
  },
  {
    name: 'sfx_download',
    description:
      `Download a sound into the SFX library at ${SFX_ROOT}. Pass the audio_url and name from sfx_search. ` +
      'Refuses NonCommercial and NoDerivatives sounds unless overridden, since reels are monetized.',
    inputSchema: {
      type: 'object',
      properties: {
        audio_url: { type: 'string', description: 'audio_url from an sfx_search result' },
        name: { type: 'string', description: 'Label for the filename, e.g. "deep-whoosh"' },
        license: { type: 'string', description: 'license from the search result, so the block can be enforced' },
        category: { type: 'string', enum: [...CATEGORIES, 'root'], description: `Folder under ${SFX_ROOT} (default ui-tech)` },
        dest_dir: { type: 'string', description: 'Absolute path override; wins over category' },
        allow_restricted: { type: 'boolean', description: 'Override the NC/ND block. Only for unmonetized use.' },
      },
      required: ['audio_url', 'name'],
    },
  },
  {
    name: 'sfx_local_search',
    description:
      `Search the LOCAL SFX library at ${SFX_ROOT} — offline, no network, no rate limit. ` +
      'Use this FIRST once a professional pack (e.g. the Sonniss GDC bundle) is installed: local WAVs beat ' +
      'compressed web previews for transient-heavy SFX like whooshes, clicks and pops. ' +
      'Durations come from real WAV headers; files whose duration is unknown are excluded when a duration filter is set.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Terms matched against folder + filename, e.g. "whoosh metal", "riser"' },
        limit: { type: 'number', description: 'Results to return, 1-60 (default 15)' },
        max_duration_s: { type: 'number', description: 'Max length in seconds (WAV only — duration is unknown for mp3 here)' },
        min_duration_s: { type: 'number', description: 'Min length in seconds' },
        format: { type: 'string', description: 'Restrict to an extension, e.g. "wav" to exclude compressed files' },
      },
      required: ['query'],
    },
  },
  {
    name: 'sfx_index_rebuild',
    description: `Rescan ${SFX_ROOT} and rebuild the local index. Run after adding a new pack.`,
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'sfx_backends',
    description: 'Report which backends are usable right now, local library stats, and whether a Freesound token is present.',
    inputSchema: { type: 'object', properties: {} },
  },
]

const server = new Server({ name: 'sfx', version: '1.0.0' }, { capabilities: { tools: {} } })
server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: TOOLS }))

async function download(args) {
  if (args.license) {
    const v = verdictFor(args.license)
    if (v.safe_for_monetized_reels === false && !args.allow_restricted) {
      throw new Error(`Refusing "${args.name}": ${v.verdict}\nPass allow_restricted:true only if this is not for monetized use.`)
    }
  }
  const res = await fetch(args.audio_url, { headers: { 'User-Agent': UA } })
  if (!res.ok) throw new Error(`Download failed: HTTP ${res.status}`)

  const dir = args.dest_dir || (args.category === 'root' ? SFX_ROOT : path.join(SFX_ROOT, args.category || 'ui-tech'))
  fs.mkdirSync(dir, { recursive: true })

  const urlExt = (args.audio_url.split('?')[0].match(/\.([a-z0-9]{2,4})$/i) || [, 'mp3'])[1]
  const file = path.join(dir, `${slug(args.name)}.${urlExt}`)
  fs.writeFileSync(file, Buffer.from(await res.arrayBuffer()))

  const v = args.license ? verdictFor(args.license) : {}
  return {
    saved_to: file,
    bytes: fs.statSync(file).size,
    license: args.license,
    verdict: v.verdict,
    attribution_required: v.safe_for_monetized_reels === true && !/^(cc0|pdm)/i.test(String(args.license || '')),
  }
}

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  const { name, arguments: args = {} } = req.params
  try {
    let result
    if (name === 'sfx_search') {
      if (!args.query) throw new Error('query is required')
      const licensing = args.licensing || 'cc0_only'
      result = args.source === 'freesound' ? await fsSearch({ ...args, licensing }) : await ovSearch({ ...args, licensing })
    } else if (name === 'sfx_download') {
      if (!args.audio_url || !args.name) throw new Error('audio_url and name are required')
      result = await download(args)
    } else if (name === 'sfx_local_search') {
      if (!args.query) throw new Error('query is required')
      result = localSearch(args)
    } else if (name === 'sfx_index_rebuild') {
      const idx = buildIndex()
      const wav = idx.entries.filter((e) => e.ext === 'wav').length
      const withDur = idx.entries.filter((e) => e.duration_s != null).length
      result = {
        rebuilt: true,
        index_file: INDEX_FILE,
        total_files: idx.count,
        wav_files: wav,
        compressed_files: idx.count - wav,
        durations_resolved: withDur,
        total_bytes: idx.entries.reduce((s, e) => s + e.bytes, 0),
      }
    } else if (name === 'sfx_backends') {
      let local = { indexed: 0 }
      try {
        const idx = loadIndex()
        const wav = idx.entries.filter((e) => e.ext === 'wav').length
        local = { indexed: idx.count, wav_files: wav, compressed_files: idx.count - wav, index_file: INDEX_FILE }
      } catch {}
      result = {
        local_library: { ...local, root: SFX_ROOT, note: 'Prefer this when it has WAV coverage — offline and higher fidelity.' },
        openverse: { available: true, needs_key: false, note: 'Default web backend. Indexes Freesound; audio served from cdn.freesound.org.' },
        freesound: { available: !!freesoundKey(), needs_key: true, key_file: KEY_FILE, note: freesoundKey() ? 'Token found.' : 'No token, and none obtainable — the apply page is login-walled. Not needed.' },
        categories: CATEGORIES,
      }
    } else {
      return { content: [{ type: 'text', text: `Unknown tool: ${name}` }], isError: true }
    }
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] }
  } catch (e) {
    return { content: [{ type: 'text', text: `Error: ${e?.message || String(e)}` }], isError: true }
  }
})

await server.connect(new StdioServerTransport())
console.error('[sfx-mcp] ready (stdio) — openverse default, freesound optional')
