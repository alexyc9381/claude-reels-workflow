---
name: reel-build-gotchas
description: ⛔ two HARD recurring traps when authoring Remotion reel scene bodies (panel-local coords + over() takes frames) — check BEFORE trusting stills
metadata: 
  node_type: memory
  type: reference
  originSessionId: fd2a64f7-8d2a-4a40-a1dc-da7f726a2785
---

Two traps that silently break scene layout/timing in the `matchtern-longform/video` Remotion reels ([[video-editing-toolchain]]). Both cost a full render+inspect cycle each on reel 38 ([[vault-reel]]) — check them BEFORE the first still.

**⛔ Scene bodies render INSIDE `<Panel>` → coordinates are PANEL-LOCAL (0..792), not screen (0..1920).** `Panel` is `position:absolute; left:34; right:34; top:384; height:792; overflow:hidden`. A scene body's `<AbsoluteFill>` fills the Panel, so every `top:` is measured from the panel top and anything `> ~792` is CLIPPED (invisible). Symptom: the top half of a scene renders, the Mascot/badges/lower rows just vanish. Usable vertical band ≈ 210–780 local (ScreenHead title occupies ~55–200). The CTA scene is the exception — `ClockCTA` renders OUTSIDE the Panel, so it uses true screen coords (top ~366–1050).

**⛔ `over(f, start, dur, ease?)` takes FRAMES, not seconds.** It's `interpolate(f,[start,start+dur],...)`. Writing `over(lf, 6.6, fr(0.7))` means start=6.6 FRAMES (0.22s), not 6.6s — so the element pops in almost immediately instead of at 6.6s. ALWAYS wrap the start in `fr()`: `over(lf, fr(6.6), fr(0.7))`. (The `dur` is usually already `fr(...)`; the bug is forgetting it on `start`.) Symptom: staggered reveals all fire at once / far too early. Grep the new body for `over(lf, <bare-number>,` before rendering.

Also: to make a header/hero element visible on FRAME 0 (mute scroll-stop), you cannot use a plain `over(lf,0,...)` for its opacity (that's 0 at f0) — render it solid and animate only a small translateY settle, or floor the opacity.

**⛔ CLONING A REEL CHASSIS carries the OLD reel's baked text in SHARED components (ERASE built off the VAULT chassis, 2026-07-10).** When you copy `ClaudeXReel.tsx` → `ClaudeYReel.tsx` and swap only audio/words/L/scene-bodies, the SHARED overlay components still render the previous reel's copy and MUST be grepped + swapped: (1) `ScreenHead`'s per-scene status pill (VAULT hard-coded "FABLE 5 · 3 DAYS FREE" / "NOW PAID" — a DEADLINE pill that reappeared on 5 scenes of a no-deadline privacy reel = auto-blocker); (2) the CTA guide card's 3-check contents (VAULT: "the good calls prompt / rule back-solver / vault file" showed up on ERASE's endcard); (3) the CTA keyword string (`const kw = "VAULT"`) + big clay keyword text + guide title. PRE-RENDER GREP after any chassis clone: `grep -niE "vault|days free|now paid|good calls|back-solve|<prev-keyword>"` on the new file and swap every non-comment hit. The adversarial ship-critic caught all three, but they're mechanical — grep them out before the first render.


**⛔ DELIVERY ENCODE (HARD, 2026-07-10):** Remotion's h264 output tags color as bt470bg and leaves moov at the end — QuickTime/Preview REFUSE to open it ("not compatible") even though ffmpeg decodes fine. EVERY delivery encode must include: `-colorspace bt709 -color_primaries bt709 -color_trc bt709 -movflags +faststart` (plus the usual libx264 high / yuv420p / crf 18 / AAC 256k). Verify with qlmanage -t (Quick Look thumbnail = macOS pipeline accepts it).

**⛔ SFX TRUNCATION CLICKS = 'metronome' (HARD, 2026-07-10):** any <Audio> whose FILE is longer than its <Sequence> window gets HARD-CUT at the window edge -> an audible click/pop; with many Sfx windows this reads as a metronome ticking through the whole reel (Alex flagged twice). The Sfx helper MUST apply a fade envelope: volume={(f)=>{const total=fr(dur); return v*Math.min(1,f/2)*Math.min(1,Math.max(0,(total-1-f)/6));}}. Same for looping OffthreadVideo audio (loop restarts pop every loop) — play ONE audio pass with a fade then mute. Check library mp3 durations (lib_typing=26s!, digital-loading=16s, sand-steps=10s) — never assume they are short.

**⛔ CLICKY MUSIC BEDS = 'metronome' pt.2 (HARD, 2026-07-10):** seo_music.wav (73 sharp transients/107s) and ados_bed_loud.wav (53/50s) both have percussive plucks; at bed volume under VO only the TRANSIENTS stay audible -> reads as a bare ticking metronome (Alex flagged 3x; lowpass does NOT fix it, the hits are low-freq). Fix = transient-free synthesized bed: public/bed_pad.wav (4 detuned sines lowpass 900 + pink-noise wave-wash lowpass 420, slow sin-volume swells, loudnorm I=-30; play at volume ~0.9 ducked to 0.5 at CTA). Transient-check any new bed before use (25ms peak-envelope, spike>1.6x local median).


**⛔ METRONOME/CLICK — REAL CAUSE (Alex, 2026-07-11, RESOLVED): it was BAKED INTO ALEX'S VOICEOVER RECORDING (a click in his mic/room), NOT the SFX or the music bed.** The v10-v15 theories (SFX truncation, clicky music transients, synth-bed) were RED HERRINGS — do NOT strip SFX or swap the music to chase a perceived tick again. Alex has fixed it at the recording source. KEEP the fade-envelope Sfx helper (good hygiene) but ADD SFX GENEROUSLY.
**⭐ MORE SFX = MORE ENGAGEMENT (Alex standing preference, 2026-07-11):** layer MANY varied SFX from ~/Downloads/sfx-library, especially DENSER TYPING (stack multiple mac-type/keyboard hits per typing moment, not one), plus pops/dings/whooshes/sparkles/shutters/cash-register/etc on every state change. Under-scoring reads as cheap; a busy, content-matched soundscape is the goal. Pull fresh variety each reel; don't reuse the same 5.

- **⛔ ramp() is NOT a lerp (XRAY remake, 2026-07-11):** parallel scene-author agents read `ramp(f, a, b)` as "animate f from a to b" — it actually maps f FROM input range [a,b] TO 0..1, so a>b throws `inputRange must be strictly monotonically increasing` at RENDER time (compiles fine; stills on that scene crash). When briefing scene agents, state it explicitly or tell them to use plain lerps (`a + t * (b - a)`); after any splice, still-render EVERY scene, not just one.
