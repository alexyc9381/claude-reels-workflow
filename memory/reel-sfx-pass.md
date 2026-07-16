---
name: reel-sfx-pass
description: "⛔ STANDING Phase-D SOUND DESIGN (not a cue-sprinkle): one designer agent per scene synced to PHYSICAL ACTION, hero hits layered 3-deep, ⛔ RISERS HARD-CAPPED AT 2 PER REEL (overrides the old every-transition rule), synthesize what the library lacks; + music bed rules (cut on the phrase onset, MEASURE the bed and compute the gain, duck the CTA)"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 09be9b49-efa9-49b2-9cf0-94de2619c452
---

⛔ STANDING — runs on EVERY reel as the last step of [[reel-overhaul-stage]], after the visuals are locked and before the delivery encode. Wire via `<Sfx at={sec} src="file.ext" v={vol} dur={sec} />`.

# ⛔⛔ THE RISER RULE CHANGED (Alex, reel 52) — THIS OVERRIDES THE OLD ONE

> *"dont have too many like riser sound effects it gets kind of annoying"*

**HARD CAP: 2 RISERS PER REEL.** One into the hook/first turn, one into the payoff. That is all.
- ❌ **RETIRED:** "the hook MUST have a riser, every reel" + "riser accents into any payoff". Those rules produced the spam.
- ⛔ The Factory/Sol chassis contains a `{/* metallic RISERS peaking into EVERY scene transition */}` map that fires **7**. **Grep and kill it on every clone.**
- A **suspense bed** (low drone + tremolo + accelerating heartbeat) is NOT a riser and does not count — use it where tension is needed instead.

# SOUND DESIGN PASS — a design pass, not a cue-sprinkle

> Alex, reel 52: *"i need to see better SFX sound design for this video throughout here to take it one level higher"*
> Reel 52 went **9 cues → 82**. That is the gap between a wireframe and a reel.

## The method
1. **INVENTORY FIRST.** `ls public/sfx/` + `find ~/Downloads/sfx-library`. Copy anything missing into `public/sfx/`.
   ⛔ **Grep for the specific sounds the action needs BEFORE designing.** Reel 52 needed zip / suspense / crying and **none of the three existed anywhere.**
2. **SYNTHESIZE WHAT DOESN'T EXIST** — numpy only, zero copyright (`video/tools/gen_missing_sfx.py`). Proven recipes:
   - **zipline** = descending whine + rattling band-passed noise + a doppler drop as it passes the lens
   - **suspense bed** = low drone + unease tremolo + an *accelerating heartbeat*
   - **cry** = descending pitch + sob wobble + 2nd harmonic (cartoon, never a real human sample)
3. **ONE DESIGNER AGENT PER SCENE** (parallel Workflow). Each gets: the scene's **on-screen physical action with relative timings**, its absolute window, the **exact filename list**, and the volume bands. Returns `{at, src, v, dur, why}` with ABSOLUTE times.
4. ⛔ **VALIDATE BEFORE SPLICING** — agents hallucinate filenames (reel 52: `glitch_counter.wav`; the real file is `.mp3`). Drop any cue whose file is missing, whose `at` is past the hard cut, or that adds a riser.
5. **Re-render, then MEASURE:** peak < 1.0 · transient density ~1-2.5/s (deliberate impacts, not popping).

## The rules the cues must obey
- ⛔ **SYNC TO THE PHYSICAL ACTION, NOT THE BEAT GRID.** A sound fires when an OBJECT does something (a stamp lands, a slug is struck, a glove connects). Silence is fine. Do not carpet the scene.
- ⛔ **LAYER THE HERO HIT 3 DEEP: attack + low-end body + texture.** One thin pop is the #1 thing that makes a reel read cheap. (Reel 52 layers the stamp SLAM = impact+boom+thock, the press SLAM, punch 4, the INTERVIEW flip.)
- **Every visible action gets its sound** — a zip for a zipline, typing for letters being struck, a per-item click for each thing igniting.
- **UI micro-interactions** — a click/tap on every interaction (item scanned, chip flipping, card sliding, keyword seating). Still the biggest retention lever. Low volume; they are texture.

## The mapping (menu — apply where the beat exists)
- **Impacts / slams / stamps:** `impact.wav · lib_boom.wav · boom.wav · thock.wav · hit.mp3 · cinematic-impact.mp3 · m_stomp.wav · m_bump.wav`
- **Movement:** `lib_whoosh.wav · lib_whoosh_fast.wav · whoosh-2-fast.mp3 · swish.wav · fling.wav · zipline.wav`
- **Typing:** `keyboard-typing.mp3 · mac-typing.mp3 · lib_mactype.wav` · **Confirm:** `lib_confirm.wav · lib_correct.wav · ding.wav`
- **Money:** `cash-register.mp3` + `chimehi.wav / chimelo.wav` · **Notifications:** `lib_notif.wav` · **Counters:** `glitch_counter.mp3 · data.wav`
- **Reveals:** `lib_magic_reveal.wav · sparkle.wav · shimmer.wav` · **Pattern interrupt:** `screech.wav`
- **Tension:** `suspense_approach.wav · heartbeat.mp3 · sub.wav` (⛔ use these instead of a riser)
- **Hurt/comedy:** `cry_whimper.wav · roblox-oof.mp3 · bonk.mp3 · downer.mp3`
- **MEME stingers (~1-3 per reel, only where earned):** `among_us.mp3` (sus reveal) · `bruh.mp3` (fail) · `vine_boom.wav` (shock) · `huh.mp3` (realization) · `boing.wav`
- **CTA:** `lib_magic_reveal.wav + lib_correct.wav + crash.wav + sparkle.wav` (+ `crowd_cheer.wav` low)

## Volume discipline (the VO is king)
UI clicks **0.13-0.18** · impacts **0.30-0.45** · ambience/crowd **0.10-0.16** · meme stingers **0.18-0.30** · music bed effective ~**0.011-0.022**.
All `at=` inside their scene bounds; recheck after any re-timing.

---

# MUSIC BED

- ⛔ **Check [[sfx-library]] `SOUNDTRACKS.md` FIRST.** Commercial tracks burned into the export routinely get the reel **muted or reach-capped**; adding the same song natively in IG's audio picker is licensed AND counts as trending-audio signal. Prefer that unless Alex directs otherwise (he did on reel 52: his own licensed file).
- ⛔ **CUT ON THE PHRASE ONSET, NEVER A ROUND NUMBER.** Find the peak, walk back to ~12% of it, cut there — so the music **lands on frame 0**.
  *Reel 52: cut at a round 8.0s → opened mid-decay of a dying note = fragment, gap, then the real phrase at 1.4s. Alex heard it instantly ("the music only comes in at 1 second"). It ALSO collided with the hook's stamp slam 0.7s earlier. Cutting at the measured onset (9.34s) fixed both.*
- ⛔ **AUDIBLE FROM FRAME 1.** IG autoplays; a thin first second makes the hook feel like it hasn't started.
- ⛔⛔ **MEASURE THE BED, COMPUTE THE GAIN. NEVER EYEBALL IT.** (Wrong twice on reel 52.) A song swings ~15x across a 45s window, so a flat gain = inaudible at the start, deafening at the end.
  ```
  bed_rms[t] = per-second RMS of the extracted bed
  gain[t]    = target_effective[t] / bed_rms[t]
  target: ~0.015 early → ~0.022 mid → ~0.011 at the CTA
  ```
  This **rides the gain AGAINST the song's own swell** — perceived level rises gently while the raw track explodes.
- ⛔ **DUCK HARD FOR THE CTA**; verify by measuring the composite at the keyword.
- **Pick the window that builds most** (scan per-second RMS for the best `end − start` delta). Don't guess.
- No suitable bed? Synthesize an original (`video/tools/gen_piano_bed.py`) — builds by adding voices over time, zero copyright.

Cross-links: [[sfx-library]] · [[reel-overhaul-stage]] (this is its final step) · [[reel-never-dual-screen]] · [[reel-vo-pacing]] · [[claude-ai-reel-workflow]] · CLAUDE-REELS-PLAYBOOK §D2/§D3.
