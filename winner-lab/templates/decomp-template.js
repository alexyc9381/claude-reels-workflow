export const meta = {
  name: 'winner-decomp',
  description: 'Decompose an INGESTed winner into WINNER-EDL + MOVES + house-number entries (3 analysts + merge)',
  whenToUse: 'After INGEST.sh <mp4> <slug> has populated ~/Downloads/winner-lab/corpus/<slug>/. Run via Workflow({scriptPath, args: {slug: "<slug>", context: "<1-line: creator, views, why it overperformed>"}}).',
  phases: [
    { title: 'Analyze', detail: 'hook anatomist / cut anatomist / EDL builder in parallel' },
    { title: 'Merge', detail: 'one writer merges into the corpus docs' },
  ],
}

// args: { slug: string, context?: string }
const slug = args && args.slug
if (!slug) throw new Error('pass args: {slug} — the corpus/<slug> folder name')
const ctx = (args && args.context) || 'no extra context provided'
const DIR = `/Users/alexchensmacmini/Downloads/winner-lab/corpus/${slug}`

const COMMON = `Winner folder: ${DIR} (context: ${ctx}).
Artifacts INGEST.sh left there: probe.txt, cut_times.txt, scdet.log, hook_burst/ (first 3.5s @12fps stills),
cut_bursts/ (0.9s @12fps around each of the first 8 cuts), contact/ (1fps whole video), motion_curve.csv
(YDIF per 0.5s), loudness.log, audio_16k.wav, and (INGEST >=1.2) words.json + vo_metrics.json + claim_latency.txt.
Read images with the Read tool. Cite frame filenames + timestamps for every claim. Numbers only — hex/px/frames/seconds,
never adjectives. If a needed artifact is missing, say so explicitly instead of guessing.`

phase('Analyze')
const [hook, cuts, edl] = await parallel([
  () => agent(`You are the HOOK ANATOMIST. ${COMMON}
Study hook_burst/ frame by frame (h001..): reconstruct the first 3.5 seconds exactly — what is readable at frame 0
(the claim text, verbatim), when each element enters/moves (frame-accurate), text size/position, first cut,
motion level per 0.5s (cross-check motion_curve.csv rows 0-7), and readable-claim latency (first frame where the
full claim is legible). Grade it against HOOK DOCTRINE v2 (claim readable at frame 0 · 0-2s motion <=~2.8 ·
no pre-claim frame >7 · pace <=4.0 wps from vo_metrics.json). Return markdown: HOOK GRAMMAR (frame table),
CLAIM LATENCY, DOCTRINE SCORECARD, and 2-4 STEAL-WORTHY HOOK MOVES (named, with a Remotion recipe each).`,
    { label: `hook:${slug}`, phase: 'Analyze' }),
  () => agent(`You are the CUT ANATOMIST. ${COMMON}
From cut_times.txt + cut_bursts/ + motion_curve.csv: compute shot lengths (median hook vs body), what CHANGES at
each cut (layout/scale/color/text — read the before/after stills in cut_bursts/), whether motion peaks AT
transitions (align cut times to motion_curve.csv), transition types, and any segment >7s (list its sub-beats or
flag it dead). Return markdown: CUT RHYTHM TABLE (per cut: t, shot_len, what changes), TRANSITION RULE (the
generalized pattern), MOTION-AT-CUTS verdict, and 2-4 STEAL-WORTHY CUT/TRANSITION MOVES (named, Remotion recipe each).`,
    { label: `cuts:${slug}`, phase: 'Analyze' }),
  () => agent(`You are the EDL BUILDER. ${COMMON}
Walk contact/ (1fps) + words.json end to end and produce the per-second edit map: a table with columns
[t_start, t_end, scene#, what is on screen, on-screen text (verbatim), VO words, motion 0-10, retention device].
Mark: time-to-first-text, time-to-first-real-screen, the biggest motion spike and what line it lands on, the CTA
segment (start, duration, background). Return markdown: the full EDL table + a SUMMARY block with those named numbers.`,
    { label: `edl:${slug}`, phase: 'Analyze' }),
])

phase('Merge')
const merged = await agent(`You are the CORPUS WRITER for the winner lab. Merge these three analyst reports for winner "${slug}" into the corpus.

HOOK ANATOMIST:\n${hook}\n\nCUT ANATOMIST:\n${cuts}\n\nEDL BUILDER:\n${edl}

Do ALL of the following with Edit/Write (read each file first):
1. Write ${DIR}/WINNER-EDL.md — the full merged EDL + hook grammar + cut rhythm for this winner.
2. APPEND this winner's section to /Users/alexchensmacmini/Downloads/winner-lab/corpus/WINNER-EDLS.md (keep existing content).
3. MERGE the named steal-worthy moves into /Users/alexchensmacmini/Downloads/winner-lab/corpus/MOVES.md — skip duplicates of moves already named there; keep each move's frame timing + Remotion recipe.
4. APPEND this winner's headline numbers (length, median shot hook/body, time-to-first-text, time-to-first-real-screen, claim latency, CTA duration) as a row/section in /Users/alexchensmacmini/Downloads/winner-lab/corpus/HOUSE-NUMBERS.md under a "per-winner data" area — do NOT rewrite the standing house rules; if 3+ winners now diverge from a standing number, add a NOTE flagging it for re-mining instead of editing the rule.
5. Add/refresh the winner's row in /Users/alexchensmacmini/Downloads/winner-lab/corpus/INDEX.md.
Return a one-paragraph summary of what changed in each file.`,
  { label: `merge:${slug}`, phase: 'Merge', effort: 'high' })

return { slug, merged }
