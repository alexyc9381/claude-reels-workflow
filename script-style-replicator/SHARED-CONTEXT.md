# SHARED CONTEXT — Script Style Replicator (read this first)

You are extracting the **script-writing DNA** of a top AI creator from their real video
transcripts, so Alex can replicate that creator's *voice, hook, and structure* on demand for
his own faceless Claude/AI reels. This is analysis of **spoken script craft** — NOT editing,
visuals, or thumbnails.

## Who Alex is (the target account these get adapted for)
- Faceless short-form: a clay **Claude mascot** + real Claude/UI screen-recordings + burn-in
  captions. 9:16, ~30–45s (listicles earn 55–70s). No talking head, no personal face.
- Niche: **Claude / AI for founders, builders, solopreneurs, freelancers, agencies, creators.**
  Frontier-but-accessible: agents & agent teams, loops, MCP, Skills/slash commands, AI councils,
  Claude Code, autonomous/overnight agents, big-context. Outcome-framed (money / hours / customers).

## Alex's HARD RULES (the fusion constraints — every adaptation must honor these)
1. **No em-dashes.** Ever. Use commas, periods, colons.
2. **No first-person anecdote.** Value-first, spoken to "you". A creator's "I tried this and it…"
   becomes a tension line or a **third-person receipt** ("this makes people $X"). Third-person social
   proof is fine; invented first-person stories are not.
3. **Gate the how.** The VO names the artifact and sells the *result*; it never hands over a complete
   replicable method. The full prompts/system are gated behind the comment keyword. (Exception: rough,
   partial spoken prompts ARE the value in a follow-along; the full word-for-word set is still gated.)
4. **Cut on the keyword.** The script ends hard on the CTA keyword. No trailing "…and I'll shoot them
   over to you" tail after the keyword (trim any creator's tail).
5. **Value noun by ~word 12. Zero jargon (12-year-old parse test). Words ≤ target_seconds × 4.3.**
6. **Never fabricate.** Don't put invented quotes in a named person's mouth; don't claim a run you
   didn't do. Keep authority beats true and general.
7. **Breadth litmus:** could a freelance designer, a Shopify store owner, a coach, AND a founder all
   immediately use this? If only a technical founder can, it's too deep.

## ⛔ Video selection — OUTLIERS, not raw views (STANDING, Alex 2026-07-12)
When choosing which of a creator's videos to model / teardown / mine for workflows or topic ideas, rank
by **OUTLIER LIFT, not absolute views.** Lift = `video views ÷ that creator's recent median` (× a
recency boost, same math as `~/Downloads/outlier-engine/`). A video only qualifies as a source if it
**overperformed for THAT creator** (≥ ~2x their own median). A 300K view on a creator who averages 300K
is baseline noise; a 25K view on a creator who averages 3K is a real signal worth copying. Always report
the **lift multiple** next to raw views (e.g. "292K, 44x median"), and prefer the high-lift videos even
when their raw count is lower. Baseline medians live in `OUTLIER-RANKING.md`; recompute them when a
creator's catalog is re-fetched (medians drift as a creator grows).

## Source material
- Transcripts live in `~/Downloads/<creator>-transcripts/`. Each creator has a compiled
  `<creator>-top-transcripts.md` with **view counts + titles as section headers**. These were pulled as
  the creator's top videos; cross-check each against `OUTLIER-RANKING.md` and **weight by lift over the
  creator's median, not by raw views** (see the outlier rule above). Individual `<id>.txt` files are the
  raw verbatim transcripts.
- The repo already has hand-written style refs in `memory/<creator>-style-reference.md`. **Read yours
  as prior art to reconcile and UPGRADE with hard transcript evidence — do not just restate it.** If
  the transcripts contradict or sharpen the old ref, the transcripts win (say so).

## Quoting standard
- **Quote verbatim from the transcripts.** Every claimed pattern needs a real example line pulled from
  a named video (cite the title/view-count). Patterns must be counted ("7 of 8 openers use X"), not
  asserted. ASR has minor proper-noun noise (Claude/Remotion/Nanobanana/Sonnet) — normalize obvious
  ones silently.

## OUTPUT — the Script DNA doc schema (fill every section, in this order)
Write to `script-style-replicator/creators/<creator>-dna.md`:

```
# <Creator> — Script DNA
> one-line source stamp: N transcripts, view range, fetched 2026-07-12

## 0. Voiceprint  (ONE sentence that captures how they sound)
## 1. Opener / Hook Formula
   - Primary template (verbatim skeleton with [SLOTS]) + how many of N videos use it
   - Variant openers
   - The 3–5 rules that make the hook fire
   - 5 verbatim opener lines (cite video)
## 2. Structural Skeleton  (the beat map)
   - The section-label grammar (e.g. raycfu's "The Scanner." "The Surgeon.")
   - Ordered beats, each with its FUNCTION and a verbatim example
   - Target length / word budget
## 3. Per-Beat Micro-Templates  (fill-in-the-blank for each beat)
## 4. Sentence Rhythm & Mechanics
   - avg sentence length, opener length, imperative vs declarative mix, number/$ density,
     causal connectors (but/so), signature punctuation/cadence
## 5. Signature Phrase Bank  (verbatim, grouped: openers · transitions · intensifiers ·
     reaction beats · proof phrases · CTA phrases)
## 6. Retention / Escalation Devices  (reaction beats, continuity cues, "here's the trick",
     bonus beats, number-drops — what re-hooks mid-video)
## 7. Proof & Credibility Style  (what they show, the numbers they cite, name-drops)
## 8. CTA Formula  (verbatim template + keyword mechanics)
## 9. Why It Works  (the transferable mechanism in 3–5 bullets)
## 10. Adapting to Alex  (the fusion layer)
   - what transfers cleanly to faceless mascot + his rules
   - conflicts with Alex's HARD RULES and the exact resolution
   - gate-the-how mapping (what's shown vs gated for this creator's format)
## 11. Ready-to-Run Generation Template
   - a fill-in prompt Alex can fire: "Write a 35s Alex reel about [TOPIC] in <creator> style:
     [the skeleton with slots + the rules baked in]"
## 12. Worked Example  (one fresh Alex-niche topic fully scripted in this creator's voice,
     already run through Alex's HARD RULES — show the finished ~35–45s script)
```

Be exhaustive and concrete. This doc IS the reusable asset — someone should be able to write a
convincing <creator>-style script from it without ever seeing the transcripts.
