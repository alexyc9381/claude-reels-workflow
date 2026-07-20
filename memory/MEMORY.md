# Memory Index

- [📶 Mac mini "bad internet"](mac-mini-wifi-not-claude.md) — 2.4GHz Wi-Fi, NOT Claude. Fix: Ethernet → 5GHz SSID → DNS 1.1.1.1
- [🧊 Claude Code freeze = transcript bloat](claude-code-freeze-transcript-bloat.md) — reel sessions embed images → 150MB+ transcripts; archive them, stop using ~/Downloads as project root
- [💀 "Random crash" = macOS jetsam OOM](claude-crash-jetsam-oom.md) — not a crash: 8.9GB claude + 54 MCP procs on a 16GB mini. Trigger = xhigh + workflow fan-outs. Never conflate crash / freeze / wifi

## ⛔ Standing script/topic rules (load before any script work)
- [⛔⛔ NEVER browser agents on Instagram + RATE DISCIPLINE](no-browser-agents-instagram.md) — ABSOLUTE: no chrome/Playwright/computer-use on IG ever; use ig_scan.py or yt-dlp. + budget the handle list, STOP on first `feed failed`, exhaust on-disk data before any API call
- [⛔⛔ FACTORY LOG FIRST](factory-log-first.md) — open the reel log at STAGE 0, before the first idea. Never retroactive. No comp = no entry · CAPTURE BEFORE CLAIM
- [⛔⭐ SCRIPT FACTORY pipeline](script-factory-pipeline.md) — MASTER: load before any topic/hook/script/caption; Stages 0-7 + [lever ledger](reel-lever-ledger.md)
- [⛔⭐ Creator lane ceilings](creator-lane-ceilings.md) — ARTIFACT-FIRST wins; the artifact must BE the payoff. ⛔ breadth-cap PARTIALLY OVERRIDDEN → [[raycfu-lane-preferred]]
- [⛔ raycfu lane PREFERRED](raycfu-lane-preferred.md) — Alex LIKES the builder/power-user lane; "universal = too basic" is a KILL signal
- [⛔ VAULT premise autopsy](vault-reel-premise-autopsy.md) — the 9 pre-build kill-rules; run on EVERY premise
- [⛔ RERUN TEST = kill-rule 10](premise-staleness-rerun-test.md) — name the YEAR the audience first saw this reveal; >~12mo = KILL. Gate fails same beat 3x → re-open the PREMISE
- [⛔ Gate the HOW](gate-the-how-in-scripts.md) — VO sells the RESULT + names the ARTIFACT, never the copy-pasteable HOW
- [⭐ Reel winning formula](reel-winning-formula.md) — hot-model subject + viewer-hero + named artifact; comment at END; GATE THE PAYOFF
- [⛔ Dopamine Ladder](dopamine-ladder.md) — stun-gun frame-0 → curiosity loop → anticipation → NON-OBVIOUS payoff
- [⛔ Specificity Effect](specificity-effect.md) — anchor every value claim or it reads as SELLING
- [⛔ Hook library + HOOK GATE](claude-reel-hook-library.md) — 6 families + the 10-check gate
- [⛔ IG Reels scriptwriting principles](ig-reels-scriptwriting-principles.md) — script bible
- [⛔ No-anecdote value-first](no-anecdote-value-first-scripts.md) — value DIRECTLY; no invented characters
- [Short-form scripting playbook](shortform-scripting-playbook.md) · [Reel storytelling playbook](reel-storytelling-playbook.md) · [Retention + hook teardown](reel-retention-hook-teardown.md)
- [Claude reel topic engine](claude-reel-topic-engine.md) · [Fable idea backlog](fable-idea-backlog.md) — ranked next ideas + kill-list

## ⛔ Standing build/visual rules
- [⛔⛔ CINEMATIC not abstract](reel-chassis-cinematic-not-abstract.md) — reel 68 (Alex FURIOUS): every scene is a real PLACE (room+floor+light+depth+Claude sprites acting), like CALLBACK's shredder room, NOT nodes/objects floating on black. Clone CALLBACK/Factory/GptSol (Cinematic Blueprint = DEFAULT), never SimulateReel. When Alex names a reference reel, clone THAT. Read CLAUDE-REELS-PLAYBOOK phase-by-phase, don't self-invent the process
- [⛔⭐ Reel quality ENFORCED by gates](reel-quality-enforced-by-gates.md) — the 50/50 fix: consistency is enforced by CODE now, not remembering. RUN them: `tools/verify_reel.py` (ship-gate on the finished mp4 — VO/soundtrack actually-audible@0, cues fire, captions match) + `storyboards/STORYBOARD-SPEC.md` (mandatory board contract + camera/arc/set libraries). The floor is orthogonal to the idea — polices execution, never content
- [⛔ Claude/AI reel workflow](claude-ai-reel-workflow.md) — MANDATORY spec: load before any idea AND any edit/render
- [⛔ Reel ship-gate pipeline](reel-ship-gate-pipeline.md) · [⛔ OVERHAUL stage](reel-overhaul-stage.md) (first render = WIREFRAME, never delivered) · [⛔ Storyboard first](reel-storyboard-process.md)
- [⛔⛔ NEVER dual-screen + tighten the VO](reel-never-dual-screen.md) — ONE framed dark panel always; lead-in → 0.00s, cap gaps ≥0.32s, cut in silencedetect not word times
- [⛔⛔ Reel asset NAME COLLISIONS](reel-asset-name-collisions.md) — TWICE burned: `vo_<keyword>.wav` silently overwrites an older reel. Prefix every asset with the reel NUMBER; `public/` is gitignored = no backup
- [⛔ Clone reel chassis verbatim](reel-clone-chassis-verbatim.md) — chrome byte-identical; swap only scene bodies/VO/keyword
- [⛔⭐ Sprite grounding/sizing/spacing laws](reel-sprite-grounding-law.md) — use `<Actor>`; ⭐ a contact shadow must be WIDER than the sprite or it's invisible; door-height sizing (hero 210-300, floor 110); spacing ≥0.85×(rA+rB) or sprites MERGE; run vision critics on rendered frames
- [⛔ Reel build gotchas](reel-build-gotchas.md) — scene bodies are PANEL-LOCAL 0..792; over() start is FRAMES not seconds
- [⛔ Camera-scale off-panel bleed](camera-scale-offpanel-bleed.md) — text bleeding out is usually `scale(camScale)` throwing coords past the panel edge; sample at PEAK zoom
- [⛔ NO emoji / NO low-opacity](reel-no-emoji-no-lowopacity.md) · [⛔ Declutter / single hero](reel-declutter-single-hero.md) — "not up to par" = declutter, not more stuff
- [⛔⛔ SFX ROOT-TIMELINE TRAP](sfx-root-timeline-trap.md) — scene bodies are NOT Sequence-wrapped, so `<Sfx at={}>` is ROOT seconds; a scene-local `at` renders SILENT. Emit `L[i] + local`; delete a cloned chassis's root cue map
- [⛔⭐ Soundtrack must START at 0s](soundtrack-onset-at-zero.md) — THREE stacked causes: my fade-in envelope · ⭐ the TRACK's own ~4s fade-in intro (pre-trim to its first downbeat) · AAC priming ~43ms (irreducible). ⭐ A track title in Alex's message is a FILE to `find`, not a description
- [⛔ Music duck = counteract the SONG's build](music-duck-song-build.md) — shape the envelope inversely to measured bed rms; partial (~75%) or it sterilises the song
- [⛔ VO pauses: measure ENERGY not whisper](vo-pause-measure-energy-not-whisper.md) — whisper reports gap 0.000 across audible gaps; RMS-scan instead
- [⛔⭐ VO SIDECHAIN DUCK on SFX](sfx-voice-sidechain-duck.md) — VO is ALWAYS priority; bake a per-frame duck from the VO waveform, index on the ROOT frame. ⛔ never measure a stem as `mix − vo − music`
- [⛔⛔ SFX `dur` TRUNCATES tails](sfx-dur-truncates-tails.md) — MEASURE the library before briefing any dur cap; tails need dur ≥ ~90% of true length. ⭐ risers must be PRE-ROLLED by their full length or you play only the quiet intro
- [⛔ Fan-out can't see reel-wide patterns](fanout-blind-to-global-patterns.md) — always add a GLOBAL AUDIT stage after a per-item fan-out
- [⛔ Reel SFX pass](reel-sfx-pass.md) — densify SFX at overhaul's last step + vol discipline
- [⛔⛔⭐ DRAW, DON'T STACK](reel-draw-dont-stack.md) — ⭐ stacked CSS divs CANNOT draw a recognisable object (they render manufactured FACES fine — phone/counter/split-flap/postbox read; claw/plush/hopper were unidentifiable mush). Use ONE inline `<svg>` with real paths · the **SILHOUETTE TEST** (flat black on white — nameable from the outline alone?) · **VALUE separation** (hero vs ground must differ in LIGHTNESS, not just hue) · flat+one shade+one highlight, NOT six stacked gradients · one light direction. ⛔⛔ **And review frames at NATIVE 1012×792 — contact sheets at 300px hid this for FIVE versions**
- [⛔⛔⭐ HIERARCHY over density](reel-motion-hierarchy.md) — ⭐ ONE subject moves at a time; **camera STILL by default** (a continuous camera move destroys hierarchy by construction). The dead-air metric measures PIXEL CHANGE, not legibility — it scores one big hero and eight jittering things the SAME, so chasing it produces "too chaotic, I can't tell what's going on" (reel 66: median 15.3, zero dead buckets, still unwatchable). Gate with `chaos_audit.py`: top-cell share ≥0.20, active cells ≤6. Also: an INERT hero is boring however big, and the payoff must escalate past the setup, never restate it
- [⛔⭐ Dead air = MEASURE it + LARGE movers](reel-dead-air-motion-audit.md) — `tools/motion_audit.py`: crop to the PANEL, 10fps mean |frame delta| per 1s bucket; median ~2.1 = static, bar every bucket ≥4. ⭐ small motion (confetti/counters) does NOT register — need ≥40,000px² travelling ≥6px/frame
- [⛔⭐ MORE SCENES, not longer takes](reel-multishot-structure.md) — "too long / boring / needs storyline" = cut it into 3-4 distinct SHOTS with different compositions, each advancing the story
- [⛔ Scene motion + depth](reel-scene-motion-depth.md) · [⛔⭐ Cinematic leg-up](reel-cinematic-legup.md) — camera move + light + 4-6 parallax planes + rich bg; ground it in a REAL idea
- [⛔ Reel hook-header](reel-hook-header.md) — big top-third mute-readable header
- [Reel knockoff references](reel-knockoff-references.md) · [IG-feed safe zone](reel-ig-feed-safezone.md) (top ~250 / bottom ~340 / right ~120) · [Progress-bar reward](reel-progress-bar-reward.md)
- [⛔ Caption sync gate](caption-sync-gate.md) — anchor to WAV onset + 0.10s lead + drift-gate, never raw whisper times
- [⛔ Post caption structure](caption-structure.md) — OPEN with "Comment [KEYWORD]", then value
- [Reel VO pacing](reel-vo-pacing.md) — tighten every VO (~7% speedup + pause-trim)
- [⛔ Alex VO recordings](alex-vo-recordings.md) — transcribe attached m4a FULLY; NEVER clone/process his voice, RAW only

## Sourcing + creator styles
- [⛔ Outlier Engine](outlier-engine.md) — comp discovery (~/Downloads/outlier-engine): weekly scan.py → Door-A candidates
- [⛔ Outlier transcript tooling](outlier-transcript-tooling.md) — YouTube needs a PO token; IG lane via DOM extractor + yt-dlp + faster_whisper
- [⛔ Winner Lab pipeline](winner-lab-pipeline.md) — decompose winners → EDL + house numbers; gate our renders against them
- [⛔⭐ Creator edit-pack method](creator-edit-pack-method.md) — ⭐BUILD PACKS IN PAIRS (one format can't tell the person from the format) · ⭐declaring a confound ≠ controlling for it · ASK WHAT PRODUCED THE PIXELS · check fps · disclose your tails
- [⛔ Style cloning pipeline](style-cloning-pipeline.md) — one example video → reusable style pack
- [cindiezhu](cindiezhu-style-reference.md) · [mavgpt](mavgpt-style-reference.md) · [Nick Saraev](nick-saraev-style-reference.md) (⛔ model a ≤2wk-old overperformer) · [Nate Herk](nateherk-style-reference.md) · [Greg Isenberg](greg-isenberg-reel-style.md)
- [Creator structure templates](creator-video-structure-templates.md) · [theventure](theventure-style-teardown.md) · [1609plus](1609plus-style-replica.md) · [venture pipeline](venture-style-pipeline.md)

## Per-reel factory logs
- [ARSENAL](reels/arsenal-factory-log.md) — reel 69, FIRST PASS delivered 2026-07-19 (4 free GitHub repos that upgrade Claude: Code Router/Repomix/Graphiti/Task Master, all star-counts VERIFIED live; keyword ARSENAL). Cinematic "gear-up/loadout" arc cloned from CALLBACK; VO cut-cut spliced + dead-air trimmed + 1.04x → 38.5s; ELBM soundtrack at 0s. ⭐ motion-lift doubled median 0.55→1.02 but still calmer than target — if Alex wants more energy, split the 6-7s rooms into more SHOTS, not more jitter. Awaiting feedback; not on Drive
- [⛔⭐ CHART](reel-chassis-cinematic-not-abstract.md) — reel 68 SHIPPED 2026-07-19 to Drive `68 - CHART/` (mp4 + cover + caption + [agent-graph guide docx]). Adversarial agent graph: builder + attacker + rebuild loop → bulletproof work; keyword CHART. FIRST pass REJECTED (cloned SimulateReel = abstract nodes on black); rebuilt cinematic on the CALLBACK chassis (see the linked memory). Then a full LOGIC-FIX pass on Alex's punch-list: header z-order occlusion (→[[reel-build-gotchas]]), C1 reworked (lonely open → blast → decluttered, depth-correct walker), C4 builders grounded off the belt + work on the anvil, C5 BULLETPROOF stamp contained, C6 foundry reads behind the CTA w/ real mascot workers. Motion median 6.74, no dead air. Cover = standalone case-file (`CoverChart`), NOT a Boring Million episode (`CoverAgentEp3` is a different topic, the AI caller)
- [⭐ DESIGN (Street Fighter)](reels/design-sf-factory-log.md) — reel 68 built 2026-07-19: 5 AI design tools as ranked arcade fighters (tier badges + star scores + output-screen props), V0 champion + golden buzzer; keyword DESIGN. On a pre-recorded Alex "panel" VO (not premise-gated). ⛔ words_design.json name-collision broke the WHOLE bundle. STAGED, not yet on Drive
- [POSTS](reels/posts-factory-log.md) — reel 66 first pass 2026-07-18 (sell social posts to local shops, $20/post → $1,000/mo; MAPLE ST street-walk arc, 15 scenes). ⚠️ arrived PRE-LOCKED as an Alex VO so Stages 0-4 never ran — NOT a gated ship. ⭐ Four reusable lessons: **a mover you can't see is not a mover** (the "dead air" bucket was a 100%-occluded van; a blurred cloud gradient scores ~0.07 on a frame-delta metric) · **"looks blurry" can be over-magnification + coincident geometry + a blown highlight**, not a filter · ⛔ **`Easing.quint`/`quart` DO NOT EXIST in Remotion** — use `poly(5)`/`poly(4)`; two agents emitted them unprompted, so put it in every scene-authoring contract · **heavy DOF on the HERO is the recurring first-pass failure** (blur foreground/far planes, never the hero)
- [⭐ SIMULATE](reels/simulate-factory-log.md) — reel 65 SHIPPED 2026-07-18 (delivered to Drive as `65 - SIMULATE`; the log's old "reel 62" was stale, 62 is TAKES). Claude simulates your idea (corner-cafe story). ⭐ The heavily-iterated one: grounding/spacing laws, dead-air measurement, 6 takes → 19 SHOTS, de-glow + palette, wardrobe upgrade, VO 1.04x retime. Read before any visual-overhaul round
- [TOOL](reels/tool-factory-log.md) — reel 65 first pass 2026-07-18 (wireframe). ⚠️ arrived PRE-LOCKED as an Alex VO so Stages 0-4 never ran — NOT a gated ship. ⭐ per-cue SFX volumes do NOT transfer between reels
- [⭐ JARVIS](reels/jarvis-factory-log.md) — reel 62 candidate, Stage 0 only. Biggest keyword-gated comp ever sourced (32.43x); lives or dies on R10
- [⛔ CODES](reels/codes-factory-log.md) — KILLED at Stage 1 (rules 10+8). ⭐ salvaged 7 verified non-obvious Claude features for a future artifact-first reveal
- [CALLBACK](reels/callback-factory-log.md) — resume beats the ATS bot; CLEAN gated SHIP, the workflow's objective top script
- [⛔ FOREMAN](reels/foreman-factory-log.md) — KILLED: the worked example of a gate pass EXPIRING when a rule is added
- [BRAND](reels/brand-factory-log.md) — nicksaraev replica; caps at believability 7 · [BALL](reels/pokeball-factory-log.md) 52 · [SKILLS](reels/skills-mario-remake.md) 51 (+theme-remake method)
- [SWIPE](reels/swipe-factory-log.md) 50 · [DROP](reels/drop-factory-log.md) 49 · [RECALL](reels/recall-factory-log.md) 48 · [VAULT](vault-reel.md) 38 (FAILED, the anti-example)
- [FACTORY](factory-reel.md) 37 · [SOL](gpt-sol-reel.md) 36 · [ARENA](arena-reel.md) 35 · [MINT](mint-reel.md) 34 · [CREW](crew-reel.md) 33 · [AUTOPILOT](autopilot-reel-script.md) 32 · [BLUEPRINT](midnight-reel-script.md) 31 · [STACK](stack-reel-script.md) 30
- [MARATHON](marathon-reel-script.md) 29 · [CLONE](clone-reel-script.md) 28 · [WORTHY](worthy-reel-script.md) 27 · [STORE](store-reel-script.md) 26 · [ATTACK](attack-reel.md) 25 · [UNLOCK](unlock-reel.md) 24 · [SHARP](sharp-reel.md) 23 · [FABLE](fable-reel.md) 22
- [BOOKS](books-reel.md) 21 · [LEADS](leads-reel.md) 20 · [NIGHTSHIFT](nightshift-reel.md) 19 · [SWAP](glm-swap-reel-and-setup.md) 18 · [SCREEN](screen-reel-github-capture.md) 17 · [DESIGN](design-reel-real-samples.md) 16

## Assets, delivery + tooling
- [⭐ Reference images arrive via GOOGLE DRIVE](reel-assets-via-gdrive.md) — Alex drops screenshots in My Drive/Claude Reels/IMAGES, NOT on the Mac and NOT usable from a chat paste. ASK "Drive or local?" first; pull with the Drive connector via a SUBAGENT (base64 must never hit the main context); check whether the screenshot already contains its own title/caption before designing the card around it
- [⭐ Carousel formats](carousel-format-concepts.md) — 3 picked + 3 built (Brief/Receipts/Cards), routed per post. ⛔ RECEIPTS blocked (no real measured number). ⛔ read the factory log before recycling a reel
- [⭐⭐ COVER SYSTEM → GitHub](cover-system-repo.md) — PUBLISHED: `claude-reels-workflow/cover-system` (8 docs + standalone buildable source + verify_cover.py). ⛔ READ IT before any cover work
- [⭐ Reel GRID covers](reel-grid-covers.md) — the raw session record behind it. Crop math (1:1 band y420-1500) + at 130px detail is NOISE; src/ReelCovers.tsx
- [⭐⛔ House "builder" covers = RICH SCENE](house-builder-cover-rich-scene.md) — light POWERS/FACTORY/OS/DEV lane must be full-bleed illustrated scenes WITH DEPTH, never floating UI on cream; faces at neck-height (never buried), raise the hero to centre the 4:5 tile, fill the foreground to kill the void, calibrate vs approved covers
- [⛔ Trial Reels ≠ carousels](trial-reels-not-for-carousels.md) — Trial Reels are VIDEO ONLY; every carousel is permanent, cover must be right first time
- [Alex AI storefront](alex-ai-storefront.md) — ~/Downloads/alex-ai-site; Stripe links + deliverables still TODO
- [Video editing toolchain](video-editing-toolchain.md) — working ffmpeg/whisper/Remotion setup · [SFX library](sfx-library.md) — 55 labeled SFX + README
- [Lead-magnet docs](lead-magnet-docs.md) · [Trial reels repost method](trial-reels-repost-method.md) · [Behance real images](behance-real-images.md)
- [Social assets → Google Drive](social-assets-to-gdrive.md) · [→ camera roll](social-assets-to-camera-roll.md) (⛔ RETIRED for reels) · [Share images as links](share-images-as-links.md)
- [Claude Max spin giveaway](claude-max-spin-giveaway.md)

## Matchtern
- [Design system](matchtern-design-system.md) — brand colors, fonts, logo, copy rules
- [⛔ No em dashes](no-em-dashes-in-copy.md) — ZERO em dashes in ANY Matchtern copy + pre-ship grep
- [⛔ FB ads compliance](fb-ads-compliance-skill.md) — invoke /fb-ads-compliance before ANY Meta/FB ad work
- [Primary messaging](matchtern-primary-messaging.md) — "stand out in admissions" · [Ad imagery](matchtern-ad-imagery-representation.md) — South Asian + Asian people
- [Ad economics](matchtern-ad-economics.md) — Meta ~$50/opt-in; $2k cold offer ≈ 0.4x ROAS; needs a tripwire
- [Static ad pipeline](matchtern-static-ad-pipeline.md) · [Meta campaign builder](matchtern-meta-campaign-builder.md) (builds PAUSED) · [Apply landing page](matchtern-apply-landing-page.md)
- [Long-form video style](matchtern-longform-video-style.md) 16:9 · [Short-form](matchtern-shortform-video-style.md) 9:16 · [Ivy.insider pipeline](ivy-insider-pipeline.md)
