# Sound design: purposeful, tactile, voice-first

Requested by Alex on September 10, 2026. Reference: the user-supplied text of Rob Mayzes, **The 9 Fundamentals of Sound Design**, Mastering.com, April 15, 2020. These are adaptations to No Code Alex motion graphics, not copied kick-drum settings or universal psychoacoustic rules.

## First define the target

Before selecting a sound, name its physical or narrative job: glass sliding, soft body contact, a control engaging, a reply docking, or a record finishing. Specify material, apparent size, screen location and relationship to the voice. If removing the cue improves comprehension, remove it. White glass should feel light and tactile, not like a heavy cinematic impact.

| Principle | No Code Alex application |
|---|---|
| Amplitude envelope | Match attack and decay to the event. Brief, softened attacks for contact; slower ramps for glides; finite releases that leave the next spoken phrase clear. One-shot cues usually need no sustained plateau. |
| Pitch | Lower the body/contact layer modestly; keep glass resonance lighter. Pitch is a material and size decision, not a rising tone on every success. Check rate-based changes because they also change duration. |
| Layering | Usually one source; at most two or three when each has a job. Combine body + contact detail within a small, intentional offset. Do not treat the article's 35ms example as a universal fusion threshold. |
| Simplicity | One foreground event at a time. Silence during reading holds. No automatic sound on blinks, labels, every footstep or every component. |
| Cleaning | Trim leading dead air, fade ends, remove unnecessary bass and harsh high end. Keep layers from occupying the same space without a reason. Recheck consonants against the actual VO. |
| Tone | Warm, rounded and precise. Avoid abrasive clicks, brittle bells, sub-heavy impacts and obvious cartoon boings. Distortion is optional, not a premium-quality requirement. |
| Size | Small on-screen controls get narrow, small sounds. Reserve wider movement for a real spatial handoff. Do not enlarge every cue with chorus or Haas delay; preserve mono compatibility. |
| Movement | Automate modest pan and gain to support the visible trajectory. Start/contact times share the animation clock. Do not add pitch sweeps unless the action calls for them. |
| Depth | Keep important tactile contact mostly dry. Use a low-level, short tail for glass resonance if useful. Long reverbs and slapback are not default dialogue-video treatments. |

Bus compression is optional: use it only if layers need cohesion or peak control. Compare level-matched bypass. The article's fast-attack and 2–4dB reduction examples are not mandatory targets; excessive compression can erase the tactile transient. Leave it off when the mix does not need it.

## Implemented in refined explainer v4

`refined-sound-cues.json` records purpose, timeline position, gain, pan and optional reflection for every event. `tools/prepare_glass_sfx.mjs` accepts this optional third argument; omitting it preserves the earlier v6 behavior and cue sheet.

- Reuses the four frozen, ledger-identified recordings: whoosh-short, click-soft, chime and pop. No new paid sources, synthesized replacement sounds or music.
- Per-material attack/release and frequency limits; existing modest pitch/rate treatment retained.
- Landing at 6.65s uses body + a click 10ms later. Filing uses tap + quiet glass 15ms later. Other actions remain single-source.
- Equal-power, quintic pan ramps, limited to small offsets. A single 45ms/6% symmetric reflection on the final glass tail; no Haas widening.
- SFX master 0.65 rather than v6's 2 (9.76dB lower bus gain before cue-specific changes). The rendered source mix measures about −23.02dBFS sample peak. That is **not** a dialogue-relative loudness target or listening approval.
- Quiet holds, no continuous music bed, no automatic ducking and no bus compression added.

## Narrated production gate

1. Lock and level the real VO before finalizing effect gain.
2. Review each cue with the voice, not just in solo. Reduce, shorten, filter or omit effects that obscure words; automate ducking only where needed.
3. Review on headphones, small speakers and in mono, especially around transients and tails. Check true peak and delivery loudness of the final combined export, not only the SFX stem.
4. A/B at matched loudness. Preserve intelligibility and intentional silence over apparent excitement.
5. Record Alex's listening feedback. No LUFS or peak measurement alone certifies that the mix sounds premium or fits speech.

The current 17-second v4 render contains SFX but no actual voiceover. Its source processing and levels are measured; subjective listening approval is pending. The prior v6 audition and confirmed original glowing CGI remain unchanged.
