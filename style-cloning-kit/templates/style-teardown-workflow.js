// TEMPLATE — Phase 1 style teardown. Fill FRAME_DIR/NAME, pass to the Workflow tool (ultracode on).
// Six parallel analysts (one lens each) -> synthesizer merges into a complete STYLE-SPEC.md body.
export const meta = {
  name: 'style-teardown-NAME',
  description: 'Multi-agent teardown of an example video into a concrete style spec',
  phases: [{ title: 'Analyze' }, { title: 'Synthesize' }],
}

const NAME = 'STYLE_NAME'
const FRAME_DIR = '/Users/alexchensmacmini/Downloads/style-packs/STYLE_NAME/example'
// List ~14 representative uniform frames + ~8 cut frames (Read tool paths). Keep under ~22 images per agent.
const FRAMES = [
  // `${FRAME_DIR}/frames/uniform/f001.png`, ...
]
const EXTRAS = `Also read ${FRAME_DIR}/probe.txt, ${FRAME_DIR}/cut_times.txt, ${FRAME_DIR}/loudness.txt (and words.json if present) for fps/duration, cut rhythm, and audio levels.`

const LENSES = [
  { k: 'layout', p: 'LAYOUT & COMPOSITION: canvas zones (px bands and what lives in each), content container geometry (framed card? full bleed? exact radius/border), margins/safe zones, density rule (how full frames are, what fills negative space).' },
  { k: 'type', p: 'TYPOGRAPHY & CAPTIONS: identify families (nearest Google-Fonts match), weights, EXACT px sizes at 1080-wide scale, colors hex, stroke/shadow treatment, caption engine behavior (words per line, grouping, active-word highlight, y position), text in/out animations w/ frame counts.' },
  { k: 'color', p: 'COLOR, TEXTURE & LIGHT: full palette as hex + role, gradient recipes (stops+angle), grain/vignette/glow/particles, lighting logic (source direction, how heroes are lit vs bg).' },
  { k: 'motion', p: 'MOTION GRAMMAR: easing character (map to Remotion Easing calls), standard in/out durations in frames@30, full transition inventory with recipes, physics (squash/stretch %, shake amp+decay, particles), camera moves (push-in %, when). Infer from frame-to-frame deltas + cut frames.' },
  { k: 'pacing', p: 'PACING & RETENTION: reconstruct the hook 0-3s beat-by-beat, median shot length from cut_times.txt, longest hold, escalation pattern, every retention device (bars/counters/loops/rewards) and where it sits, CTA end-screen recipe.' },
  { k: 'audio', p: 'AUDIO: music bed character + level vs VO (use loudness.txt), sfx inventory + what events trigger them, riser/transition audio pattern, VO pace + processing character. If words.json exists, compute wpm.' },
]

const SCHEMA = { type: 'object', properties: { findings: { type: 'string', description: 'the completed spec section for this lens — concrete numbers (hex/px/frames) only, no adjectives without a measurement' }, refFrames: { type: 'array', items: { type: 'string' }, description: '2-3 frame filenames that best evidence this lens (for the match-gate)' } }, required: ['findings', 'refFrames'] }

phase('Analyze')
const parts = await parallel(LENSES.map(L => () =>
  agent(`You are a forensic motion-design analyst rebuilding an editing style from stills. Lens: ${L.p}\n\nRead EVERY image:\n${FRAMES.map(f => '- ' + f).join('\n')}\n${EXTRAS}\n\nReturn the completed spec section. Numbers or it didn't happen — a future session must be able to RENDER from your words alone.`,
    { label: `lens:${L.k}`, phase: 'Analyze', schema: SCHEMA }).then(r => ({ lens: L.k, ...r }))))

phase('Synthesize')
const spec = await agent(
  `Merge these six lens analyses into ONE coherent STYLE-SPEC.md body for style "${NAME}" using exactly this template structure (fill every field):\n\n${'`'}${'`'}${'`'}\n(sections 0-8 of STYLE-SPEC-TEMPLATE.md)\n${'`'}${'`'}${'`'}\n\nResolve conflicts between lenses by re-reading the cited refFrames. Keep every number.\n\nANALYSES:\n${JSON.stringify(parts.filter(Boolean), null, 1)}`,
  { label: 'synthesize', phase: 'Synthesize', schema: { type: 'object', properties: { specMarkdown: { type: 'string' } }, required: ['specMarkdown'] } })
return spec
