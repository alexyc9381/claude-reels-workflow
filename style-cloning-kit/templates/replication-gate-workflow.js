// TEMPLATE — Phase 3 match-gate. Critics see EXAMPLE frame + REPLICA frame side by side and score the match.
// Loop: render replica stills at matched timestamps -> run this -> fix confirmed diffs -> repeat until >=9/10 every lens.
export const meta = {
  name: 'style-match-gate-NAME',
  description: 'Adversarial side-by-side gate: does the replica match the example style exactly?',
  phases: [{ title: 'Compare' }],
}

const NAME = 'STYLE_NAME'
// Pairs of (example frame, replica frame) at MATCHED moments (hook, mid-scene, transition, caption-heavy, CTA)
const PAIRS = [
  // { ex: '/Users/.../style-packs/NAME/example/frames/uniform/f002.png', rep: '/Users/.../video/out/replica_stills/hook.png', moment: 'hook ~1.5s' },
]
const SPEC = '/Users/alexchensmacmini/Downloads/style-packs/STYLE_NAME/STYLE-SPEC.md'

const LENSES = ['layout & composition', 'typography & captions', 'color/texture/light', 'motion grammar (as frozen)', 'density & retention devices', 'overall gestalt — would a fan of the original mistake the replica for it?']

const SCHEMA = { type: 'object', properties: {
  scores: { type: 'array', items: { type: 'object', properties: { lens: { type: 'string' }, score: { type: 'number', description: '1-10 match; 10 = indistinguishable' }, diffs: { type: 'array', items: { type: 'string' }, description: 'concrete, fixable differences: element + measured delta + exact fix' } }, required: ['lens', 'score', 'diffs'] } },
}, required: ['scores'] }

phase('Compare')
const results = await parallel([0, 1].map(pass => () =>
  agent(`You are a ruthless style-match critic for style "${NAME}". Read the STYLE-SPEC at ${SPEC}. Then for EACH pair below, read BOTH images (example first, then replica) and judge how exactly the replica matches the example on every lens: ${LENSES.join('; ')}.\n\nPAIRS:\n${PAIRS.map(p => `- moment "${p.moment}": EXAMPLE ${p.ex} | REPLICA ${p.rep}`).join('\n')}\n\nScore each lens 1-10 across all pairs (worst pair dominates). For every score <10, list concrete measured diffs with exact fixes ("caption stroke 3px, example uses ~6px", "replica bg #0E1626, example reads warmer ~#141020"). ${pass === 1 ? 'Second reviewer: be MORE demanding; hunt subtle mismatches (spacing rhythm, easing character, texture).' : ''} Do not invent diffs — only what you can see.`,
    { label: `critic-${pass}`, phase: 'Compare', schema: SCHEMA })))

const valid = results.filter(Boolean)
const byLens = {}
valid.forEach(r => r.scores.forEach(s => { (byLens[s.lens] = byLens[s.lens] || []).push(s) }))
const merged = Object.entries(byLens).map(([lens, arr]) => ({ lens, score: Math.min(...arr.map(s => s.score)), diffs: [...new Set(arr.flatMap(s => s.diffs))] }))
const pass = merged.every(m => m.score >= 9)
log(pass ? 'MATCH-GATE PASSED (all lenses >=9)' : `not yet: ${merged.filter(m => m.score < 9).map(m => `${m.lens}=${m.score}`).join(', ')}`)
return { pass, merged }
