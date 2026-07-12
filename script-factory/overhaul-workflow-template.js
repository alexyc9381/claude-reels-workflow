// ===================================================================
// OVERHAUL WORKFLOW TEMPLATE  (Stage 7 — see CLAUDE-REELS-PLAYBOOK §6.I2)
// The first full render of a reel is a WIREFRAME. This workflow turns it
// into a premium, delivered reel by (1) building/reusing a shared visual
// kit, then (2) rebuilding every scene against Gate A (hook pattern-
// interrupt) + Gate B (per-scene visual overhaul). Proven on reel 46 FLIP.
//
// HOW TO RUN (from Claude Code, ultracode on):
//   Workflow({ scriptPath: ".../script-factory/overhaul-workflow-template.js",
//              args: { file: "<abs path to Claude<Name>Reel.tsx>",
//                      reuseFoundation: false,   // true = skip authoring the
//                                                //   kit, scenes reuse the
//                                                //   already-spliced Bg/PCProp/UI
//                      scenes: [ { id:"F0", lines:"270-560",
//                                  brief:"<what this scene depicts + its polish>" },
//                                ... ] } })
// Then splice the returned {bg, props, uikit, scenes{...}} into the file
// (see scratchpad splice_overhaul.py), re-render, re-grid, re-review, loop.
// ===================================================================

export const meta = {
  name: 'reel-overhaul',
  description: 'Overhaul a rendered reel to premium: shared visual kit + per-scene rebuild against the hook pattern-interrupt gate and the visual overhaul gate',
  phases: [
    { title: 'Foundation', detail: 'vibrant background + shaded pop-culture prop library + realistic iOS UI kit (author, or reuse)' },
    { title: 'Scenes', detail: 'rebuild every scene against Gate A (hook pattern-interrupt) + Gate B (visual overhaul)' },
  ],
}

const cfg = args || {}
const FILE = cfg.file
const SCENES = cfg.scenes || []
const REUSE = !!cfg.reuseFoundation
// EVERY scene passes through the overhaul; exactly one must be flagged hook:true (Gate A).
if (!FILE || !SCENES.length) { return { error: 'pass args { file, scenes:[{id,lines,brief,hook?}], reuseFoundation? }' } }
if (!SCENES.some((s) => s.hook)) { return { error: 'no scene flagged hook:true — the hook MUST be overhauled against Gate A. Flag the opening scene {hook:true}.' } }
// reuseFoundation is valid ONLY when the vibrant kit ALREADY exists in the file (the FIRST overhaul of any reel must author it).
// The workflow env has no fs access, so the caller must confirm by having grepped the file for the vibrant Bg + PCProp + PhoneUI kit.
if (REUSE && !cfg.kitConfirmed) { return { error: 'reuseFoundation:true requires kitConfirmed:true — first grep the file for `const Bg`(vibrant), `PCProp`, `PhoneUI`. If absent, set reuseFoundation:false so the foundation is authored.' } }

// ---- shared conventions (kept in sync with the reel chassis) ----
const CONV = [
  'PROJECT: Remotion 4 (React + TSX) vertical 1080x1920 30fps reel. File: ' + FILE,
  'You are UPGRADING an existing premium animated reel to App-Store-feature-graphic quality. READ the file for exact context before writing.',
  '',
  'MODULE-SCOPE HELPERS EXIST — use, NEVER redefine/import: over(f,start,dur,ease?) eased 0..1; ramp(f,a,b) maps f from [a,b] to 0..1 (a<b; NOT a lerp; lerp = a+t*(b-a)); seed(n); fr(sec); grad(a,b); interpolate, Easing, useCurrentFrame.',
  'COLORS: CREAM #ECE9E2, INK #1A1813, SLATE #3A5C84, CLAY #D2724E, AMBER #CF9544, GOLD #E7B24C, GREEN #3F9E74, RED #C44A3A, TERM #0E1626, TERM2 #0A1120, PAPER #F7F3EA. FONTS: fraunces.fontFamily (serif display), inter.fontFamily (sans), mono. Claude clay = #D97757.',
  'COMPONENTS: Panel, Mascot (clay Claude critter + costumes), Firework, Tag, Burst2, Bubble, InputBar, Dots, Pill, Chip.',
  'BRAND/LOOK: warm cream world + dark navy glass "terminal" panels + Claude clay-orange + resale green. Editorial, premium, tactile clay + flat-illustration with soft depth. Every shape = subtle gradient + rim/inner highlight + soft layered drop-shadow + rounded corners. NO flat single-tone shapes. Depth via scale/parallax/z-layering. Rich vibrant-but-tasteful color. Smooth eased motion, subtle overshoot.',
  'COORD SYSTEM inside <Panel>: panel-local px, 0..1012 wide by 0..792 tall. Top ~72px is chrome; keep content y ~90..770; anything below 792 is clipped.',
  'RETURN: ONLY raw module-scope code (no imports, no markdown fences, no prose).',
].join('\n')

// ---- Gate A + Gate B, baked into every scene brief (the non-negotiables) ----
const GATES = '\n\nUNIVERSAL GATES (apply to THIS scene, hard floors — no escape hatches):\n'
  + 'GATE B (visual overhaul): vibrant LAYERED background (never flat); MORE GOING ON = at least 3-4 CONCURRENTLY ANIMATED layers (living background + primary subject motion + a secondary element + ongoing micro-motion), never one static graphic; shaded premium props (gradient+highlight+shadow+rounded); phones = real iOS device frames; camera/photo beats = a real viewfinder (corner brackets, focus reticle, REC/ISO/f-stop, shutter flash); >=1 recognizable + funny POP-CULTURE comment-bait item ON SCREEN in this scene (Messi/Argentina jersey, early Haaland, moai, Shrek, Grogu, Doge, retro toys - pick the most viral) - if nothing natural fits, INVENT a reason to add one (poster, mascot cameo, prop); the scene ESCALATES (motion + reveal), respects depth/parallax/occlusion.'

const HOOKGATE = '\n\nGATE A (this IS the hook/first scene): a pattern interrupt MUST land by ~frame 15-30 (0.5-1s) - something unexpected + physically surprising (object bursts/crashes/drops into frame, a first-person POV rush at the lens, a hard slam/stamp, a character invasion, a fake-out). Earned by the topic. Mute-readable in <2s. 1-5s escalates with a 2nd beat by ~3s. NO dead/empty frames, EVER. Professional eased motion with depth + motion blur. Auto-fail: title fade-in, slow zoom on a static graphic, a lone graphic on an empty panel, a dead first ~0.5s. The hook is EXEMPT from "only upgrade visuals": you MAY add or replace ACTION to create the interrupt (a real interrupt is new action, not a re-skin); preserve only the VO/SFX sync points.'

const HARD = '\n\nHARD CONSTRAINTS: keep the EXACT signature `const <ID>: React.FC<{ lf: number }> = ({ lf }) => {...}` returning a <Panel .../>. lf = panel-local frames (0 at scene start), 30fps. PRESERVE the major beat TIMINGS + the VO/SFX sync points. For non-hook scenes, keep the semantic content/wording and only upgrade visuals. Use module helpers + the shared APIs. Return ONLY the component code.'

// ---- Phase 1: FOUNDATION (author the shared kit, unless reusing) ----
phase('Foundation')
let API = ''
let BG = null, PROPS = null, UIKIT = null
if (REUSE) {
  API = 'The shared kit is ALREADY in the file: use `Bg`, `PCProp` (PC_KEYS = retro toys + pop-culture faces/jerseys/memes), `PhoneUI`, `ListingCard`, `SoldStamp`, `Toast`. Read them in the file, do not redefine them.'
} else {
  const FS = { type:'object', properties:{ code:{type:'string'}, api:{type:'string', description:'exact exported names + prop keys' } }, required:['code','api'] }
  const bgBrief = CONV + '\n\nTASK: Replace `const Bg: React.FC = () => {...}` with a VIBRANT, premium, LIGHT+warm layered background (so dark panels pop): warm-cream gradient mesh base + corner clay/teal/gold glows + soft drifting bokeh with parallax + faint film-grain + soft vignette. Keep signature `const Bg: React.FC = () => {...}`.'
  const propsBrief = CONV + '\n\nTASK: Author `const PCProp: React.FC<{k:string;sz:number}> = ({k,sz}) => {...}` (viewBox 0 0 100 100, sized sz) + `const PC_KEYS: string[]`. App-Store-icon quality (gradients, highlight, soft occlusion, rounded, readable at ~120px, soft contact shadow). RETRO: furby, tamagotchi, gameboy, nokia, rubik, disco, lava, crt, polaroid, walkman, ipod. POP-CULTURE (recognizable + funny comment-bait): messi_jersey (Argentina albiceleste stripes, black 10), haaland (Man City sky-blue jersey OR blonde-headband bobble), moai, shrek, grogu, minion, duck, doge. api = ALL keys.'
  const uikitBrief = CONV + '\n\nTASK: Author the UI kit (the phone/UI graphics must look premium): `PhoneUI` (realistic iOS frame: rounded ~46px corners, dark bezel w/ rim highlight, dynamic-island, status bar time+signal+wifi+battery, home indicator, screen gloss; renders children); `ListingCard` (premium dark-glass marketplace card: PCProp thumbnail on a light tile, title, green price, condition chips, source chip, optional SOLD); `SoldStamp` (crisp red rubber SOLD stamp); `Toast` (marketplace notification: money/check glyph + title + sub). Assume PCProp exists. api = exact names + prop signatures.'
  const found = await parallel([
    () => agent(bgBrief, { label:'foundation:bg', phase:'Foundation', schema:FS, effort:'high' }),
    () => agent(propsBrief, { label:'foundation:props', phase:'Foundation', schema:FS, effort:'high' }),
    () => agent(uikitBrief, { label:'foundation:uikit', phase:'Foundation', schema:FS, effort:'high' }),
  ])
  ;[BG, PROPS, UIKIT] = found
  if (!BG || !PROPS || !UIKIT) { return { error:'foundation failed', found } }
  API = 'NEW SHARED APIS (spliced above the scenes) — you MUST use them:\n\n[BG]\n' + BG.api + '\n\n[PROPS]\n' + PROPS.api + '\n\n[UIKIT]\n' + UIKIT.api
    + '\n\nUse PCProp for every physical item; PhoneUI/ListingCard/SoldStamp/Toast for phone + UI graphics; prefer pop-culture prop keys.'
}

// ---- Phase 2: SCENES (rebuild each against the gates) ----
phase('Scenes')
const SS = { type:'object', properties:{ code:{type:'string'}, notes:{type:'string'} }, required:['code'] }
const results = await parallel(SCENES.map((s) => () =>
  agent(
    CONV + '\n\n' + API + '\n\nSCENE ' + s.id + ' — READ lines ' + s.lines + ' of ' + FILE + ', then rewrite it.\n\nBRIEF: ' + s.brief + GATES + (s.hook ? HOOKGATE : '') + HARD,
    { label: 'scene:' + s.id + (s.hook ? '(HOOK)' : ''), phase: 'Scenes', schema: SS, effort: (s.hook ? 'high' : 'medium') }
  ).then((r) => ({ id: s.id, code: r && r.code, notes: r && r.notes }))
))

const out = { scenes: {} }
if (!REUSE) { out.bg = BG.code; out.props = PROPS.code; out.uikit = UIKIT.code; out.propsApi = PROPS.api; out.uikitApi = UIKIT.api }
for (const r of results.filter(Boolean)) { if (r.code) out.scenes[r.id] = r.code }
const got = Object.keys(out.scenes)
log('overhaul done; scenes returned: ' + got.join(', '))
return { ...out, sceneIds: got, missing: SCENES.map((s) => s.id).filter((id) => !got.includes(id)) }
