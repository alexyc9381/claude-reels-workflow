# Memory Index

- [📶 Mac mini "bad internet"](mac-mini-wifi-not-claude.md) — it's 2.4GHz Wi-Fi (Ethernet unplugged), NOT Claude; chats use zero bandwidth. Fix: Ethernet → 5GHz split SSID → DNS 1.1.1.1
- [🧊 Claude Code freeze = transcript bloat](claude-code-freeze-transcript-bloat.md) — reel sessions embed images → 150MB+ transcripts. Fix: archive to ~/claude-transcript-archive; durable fix = stop using ~/Downloads as project root
- [💀 Claude "random crash" = macOS jetsam OOM](claude-crash-jetsam-oom.md) — NOT a crash (zero .ips files): one claude proc hit 8.9GB + 54 node MCP procs = 10.2GB on a 16GB mini → 126 procs jettisoned. Trigger = xhigh + workflow fan-outs. THREE separate faults — never conflate crash / freeze / wifi

## ⛔ Standing script/topic rules (load before any script work)
- [⛔⛔ NEVER browser agents on Instagram + RATE DISCIPLINE](no-browser-agents-instagram.md) — ABSOLUTE (Alex 2026-07-16): no claude-in-chrome / Browser pane / Playwright / computer-use on IG, ever, for anything; IG = ig_scan.py (JSON API) or yt-dlp CLI or ask Alex. ⛔ **+ the volume half**: ~16 scans in one night throttled Alex's session from INSIDE the legal lane — budget the handle list first, scan @nocodealex FIRST, STOP on the first `feed failed` (never retry), a starved scan is a BUG not a finding (it produced a confident false one), and **exhaust the data already on disk before any API call**
- [⛔⛔ FACTORY LOG FIRST](factory-log-first.md) — OPEN memory/reels/<name>-factory-log.md at STAGE 0, before the first idea is spoken. Writing it IS the work; never retroactive. No comp = no entry · not gated = not recorded · CAPTURE BEFORE CLAIM · calibrate the gate on the WHOLE shipped catalogue, never one winner
- [⛔⭐ SCRIPT FACTORY pipeline](script-factory-pipeline.md) — MASTER: load BEFORE any topic/hook/script/caption; Stages 0-7 + per-reel log in memory/reels/ + [lever ledger](reel-lever-ledger.md); no log = no recording
- [⛔⭐ Creator lane ceilings](creator-lane-ceilings.md) — ARENA-CONFIRMED routing: ARTIFACT-FIRST wins (universal input → real artifact builds itself → shareable link); the artifact must BE the payoff; raycfu caps on BREADTH (mid-funnel only), nicksaraev on BELIEVABILITY (spice not spine); strip creators' on-camera verbal tics
- [⛔ VAULT premise autopsy](vault-reel-premise-autopsy.md) — the 9 pre-build kill-rules from reel 38's 5s-avg failure; run on EVERY premise before scripting
- [⛔ RERUN TEST = kill-rule 10](premise-staleness-rerun-test.md) — name the YEAR the audience first saw this REVEAL (from ANYONE); >~12mo = KILL. GATE A has no novelty axis so it dies here or never; + when a gate fails the same beat 3 rounds running, re-open the PREMISE not the wording
- [⛔ Gate the HOW](gate-the-how-in-scripts.md) — VO sells the RESULT + names the ARTIFACT, never the copy-pasteable HOW
- [⭐ Reel winning formula](reel-winning-formula.md) — hot-model subject + viewer-hero + named artifact + outlasts-payoff; comment at END; GATE THE PAYOFF
- [⛔ Dopamine Ladder](dopamine-ladder.md) — L1 stun-gun frame-0 → L2 curiosity loop → L3 anticipation → L4 NON-OBVIOUS payoff
- [⛔ Specificity Effect](specificity-effect.md) — anchor every value claim (exact figure / time / named term) or it reads as SELLING
- [⛔ Hook library + HOOK GATE](claude-reel-hook-library.md) — 6 verified families + the 10-check gate (draft 10+, ship 2-3 across ≥2 families)
- [⛔ IG Reels scriptwriting principles](ig-reels-scriptwriting-principles.md) — script bible (hook rules, retention arc, GATE THE VALUE)
- [⛔ No-anecdote value-first](no-anecdote-value-first-scripts.md) — value DIRECTLY; no invented characters / "I did X" framing
- [Short-form scripting playbook](shortform-scripting-playbook.md) — hook-on-mute, but/so loops, peak-end, cut dead air
- [Reel storytelling playbook](reel-storytelling-playbook.md) — story structure as problem→tension→payoff
- [Reel retention + hook teardown](reel-retention-hook-teardown.md) — why reels drop @1-2s + the broad-stake/real-first-frame fix
- [Claude reel topic engine](claude-reel-topic-engine.md) — 5 repeatable series + trend angles
- [Fable idea backlog](fable-idea-backlog.md) — ranked next-reel ideas + the running kill-list

## ⛔ Standing build/visual rules
- [⛔ Claude/AI reel workflow](claude-ai-reel-workflow.md) — MANDATORY spec: load before any hook/script/idea AND any edit/render
- [⛔ Reel ship-gate pipeline](reel-ship-gate-pipeline.md) — self-gating pipeline + adversarial critic + ship-gate checklist
- [⛔ Reel OVERHAUL stage](reel-overhaul-stage.md) — Stage 7: first render = WIREFRAME, never delivered; Gate A (hook interrupt) + Gate B (per-scene visual overhaul) until both pass
- [⛔ Reel storyboard process](reel-storyboard-process.md) — Stage 6: storyboard BEFORE visuals; no approved board = no build
- [⛔⛔ NEVER dual-screen + tighten the VO](reel-never-dual-screen.md) — ABSOLUTE (Alex, reel 52): never build a split/dual-screen reel, ONE framed dark panel always (clone Factory/GptSol, never Imprint); + always tighten the VO (lead-in → 0.00s, cap every gap ≥0.32s, cut in silencedetect not word times, then let R1 pull the tempo DOWN — tight ≠ fast)
- [⛔ Clone reel chassis verbatim](reel-clone-chassis-verbatim.md) — clone the reference .tsx (chrome byte-identical), swap only scene bodies/VO/keyword; solo=BLUEPRINT, split=IMPRINT
- [⛔ Reel build gotchas](reel-build-gotchas.md) — scene bodies are PANEL-LOCAL 0..792; over() start is FRAMES not seconds
- [⛔ NO emoji / NO low-opacity](reel-no-emoji-no-lowopacity.md) — no emoji pictographs on screen, no low-opacity content, richer per-scene bgs, no overlapping components
- [⛔ Declutter / single hero](reel-declutter-single-hero.md) — "not up to par" = DECLUTTER to ONE cinematic hero per scene, not more stuff
- [⛔⛔ SFX ROOT-TIMELINE TRAP](sfx-root-timeline-trap.md) — scene bodies are NOT Sequence-wrapped, so `<Sfx at={}>` is ROOT seconds: a scene-local `at` in C2+ typechecks, renders, and is SILENT (95 dead cues on reel 59). Emit `L[i] + local`; DELETE a cloned chassis's root cue map (Factory's metronome was carpeting C4)
- [⛔ Reel SFX pass](reel-sfx-pass.md) — overhaul's last step: densify SFX (hook riser, clicks, impacts, meme stingers, CTA burst) + vol discipline
- [⛔ Scene motion + depth](reel-scene-motion-depth.md) — every scene ESCALATES + carries depth (z-layer/parallax/shadows)
- [⛔ Reel hook-header](reel-hook-header.md) — raycfu-style big top-third mute-readable header on every reel
- [Reel knockoff references](reel-knockoff-references.md) — knockoff brands/UIs/characters, cameos, living-world gags, meme slots
- [Reel IG-feed safe zone](reel-ig-feed-safezone.md) — IG chrome eats top ~250 / bottom ~340 / right ~120
- [Reel progress-bar reward](reel-progress-bar-reward.md) — progress bar ends in a REWARD seal at the CTA
- [⛔ Caption sync gate](caption-sync-gate.md) — anchor captions to WAV onset + 0.10s lead + drift-gate (never raw whisper times)
- [⛔ Post caption structure](caption-structure.md) — the POST caption OPENS with "Comment [KEYWORD]", then value
- [Reel VO pacing](reel-vo-pacing.md) — tighten every VO (~7% speedup + pause-trim)
- [⛔ Alex VO recordings](alex-vo-recordings.md) — transcribe attached m4a FULLY; NEVER clone/process his voice, RAW only

## Sourcing + creator styles
- [⛔ Outlier Engine](outlier-engine.md) — comp discovery (~/Downloads/outlier-engine): weekly scan.py → Door-A candidates
- [⛔ Outlier transcript tooling](outlier-transcript-tooling.md) — YouTube needs a PO token (bgutil server); IG lane via claude-in-chrome DOM extractor + yt-dlp + faster_whisper
- [⛔ Winner Lab pipeline](winner-lab-pipeline.md) — decompose winners frame-by-frame → EDL + moves + house numbers; gate our renders against them
- [⛔⭐ Creator edit-pack method](creator-edit-pack-method.md) — how to build packs/<creator>-v1 so the numbers are TRUE: ⭐ASK WHAT PRODUCED THE PIXELS — a scene detector on screen-recordings counts BROWSING (~90% false; the inset test separates them) · split CREATOR CONSTANTS from FORMAT VARIABLES · check the FILE before theorising about an outlier · say UNRESOLVED when it is · record failed tests + provenance-at-ingest
- [⛔ Style cloning pipeline](style-cloning-pipeline.md) — one example video → reusable style pack (~/Downloads/style-cloning-kit)
- [cindiezhu style](cindiezhu-style-reference.md) — no-jargon persona + plain-English outcome, real screen, one loop
- [mavgpt style](mavgpt-style-reference.md) — follow-along formula + visual formula + TikTok scrape method
- [Nick Saraev style](nick-saraev-style-reference.md) — money-receipts lane + ⛔ sourcing rule (model a ≤2wk-old overperformer)
- [Nate Herk style](nateherk-style-reference.md) — hook structures + topic lane + YT transcript scrape
- [Greg Isenberg reel style](greg-isenberg-reel-style.md) — his editing style + Remotion replica
- [Creator structure templates](creator-video-structure-templates.md) — beat-by-beat: Greg / Nate / Mino Lee
- [theventure teardown](theventure-style-teardown.md) · [1609plus replica](1609plus-style-replica.md) · [venture-style pipeline](venture-style-pipeline.md)

## Per-reel factory logs
- [⭐ JARVIS](reels/jarvis-factory-log.md) — reel 62 candidate, Stage 0 ONLY (opened 2026-07-16, NOT gated). ⭐ Biggest keyword-gated comp ever sourced (chandlerintelligence 3.14M/**32.43x**/0.837% + cindiezhu 2.30x cross-confirm); RECAST pre-check passes trivially (both comps are already Claude/MCP reels). ⛔ Lives or dies on **R10** — unresolved, Alex's call. Also logs: watchlist blindness (chandler was invisible), raycfu/mavgpt unscanned, and reels 55/57/61 shipped with NO logs or numbers
- [CALLBACK](reels/callback-factory-log.md) — resume beats the ATS bot (41%→96%); CLEAN gated SHIP (all six ≥8, audience 8, no override) — the workflow's objective top script
- [⛔ FOREMAN](reels/foreman-factory-log.md) — reel 52 KILLED 2026-07-15 (never built): rule 10 voided both overrides. The worked example of a gate pass EXPIRING when a rule is added + a hook the gate never graded + a penalty cheated by staying conditional
- [BRAND](reels/brand-factory-log.md) — nicksaraev replica ($4k brand kit from one free repo); Nick-fidelity 9.5 but caps at believability 7 / breadth 6-7; ⛔ pre-record cost check
- [BALL](reels/pokeball-factory-log.md) — reel 52 BALL (Pokemon, Alex-VO); v1 shipped. ⛔ TODO: Pokemon HUD re-theme + critic
- [SKILLS](reels/skills-mario-remake.md) — reel 51 full Mario remake (v6) + ⭐ theme-remake method + ⭐ numpy chiptune SFX synthesis
- [SWIPE](reels/swipe-factory-log.md) — reel 50 (screenshot a $10k site → clone the design); gated SHIP; capture contracts open
- [DROP](reels/drop-factory-log.md) — reel 49 SHIPPED (5 free "illegal" Claude skills; mavgpt named-skill formula)
- [RECALL](reels/recall-factory-log.md) — reel 48 (screenshot pile → second brain); gated SHIP; capture contracts open
- [VAULT](vault-reel.md) — reel 38 (FAILED, the anti-example) + style pivot + costumed-sprite roster
- [FACTORY](factory-reel.md) 37 · [SOL](gpt-sol-reel.md) 36 (+SolMascot/LunaMascot) · [ARENA](arena-reel.md) 35 (judge bracket) · [MINT](mint-reel.md) 34 (browser agent) · [CREW](crew-reel.md) 33 (6 AI execs + ExecScene)
- [AUTOPILOT](autopilot-reel-script.md) 32 · [BLUEPRINT](midnight-reel-script.md) 31 · [STACK](stack-reel-script.md) 30 · [MARATHON](marathon-reel-script.md) 29 · [CLONE](clone-reel-script.md) 28 · [WORTHY](worthy-reel-script.md) 27 · [STORE](store-reel-script.md) 26
- [ATTACK](attack-reel.md) 25 (+ reusable MASCOT) · [UNLOCK](unlock-reel.md) 24 · [SHARP](sharp-reel.md) 23 · [FABLE](fable-reel.md) 22 (+ OPEN-LOOP system) · [BOOKS](books-reel.md) 21 · [LEADS](leads-reel.md) 20 · [NIGHTSHIFT](nightshift-reel.md) 19 · [SWAP](glm-swap-reel-and-setup.md) 18 · [SCREEN](screen-reel-github-capture.md) 17 · [DESIGN](design-reel-real-samples.md) 16

## Assets, delivery + tooling
- [Alex AI storefront](alex-ai-storefront.md) — ~/Downloads/alex-ai-site (Creator Vault, $9-$37 packs, reel-chassis theme); Stripe links + form endpoint + deliverable files still TODO
- [Video editing toolchain](video-editing-toolchain.md) — working ffmpeg/whisper/Remotion setup on this Mac
- [SFX library](sfx-library.md) — ~/Downloads/sfx-library: 55 labeled SFX + README mapping + no-API-key sourcing
- [Lead-magnet docs](lead-magnet-docs.md) — per-reel "comment KEYWORD → setup" .docx + the clone-and-regen-XML build method
- [Trial reels repost method](trial-reels-repost-method.md) — anti-fingerprint ffmpeg recipe + Trial Reels folders
- [Behance real images](behance-real-images.md) — real behance screenshots + curl/crop/composite method
- [Social assets to Google Drive](social-assets-to-gdrive.md) — auto-copy social assets to the matching Drive folder
- [Social assets to camera roll](social-assets-to-camera-roll.md) — ⛔ RETIRED for reels; deliver Final + Drive only
- [Share images as links](share-images-as-links.md) — always include clickable file links when showing samples
- [Claude Max spin giveaway](claude-max-spin-giveaway.md) — spin-wheel email-capture app

## Matchtern
- [Design system](matchtern-design-system.md) — brand colors, fonts, logo, copy rules
- [⛔ No em dashes](no-em-dashes-in-copy.md) — ZERO em dashes in ANY Matchtern copy + pre-ship grep
- [⛔ FB ads compliance](fb-ads-compliance-skill.md) — invoke /fb-ads-compliance before ANY Meta/FB ad work
- [Primary messaging](matchtern-primary-messaging.md) — "stand out in admissions" ("10 days guaranteed" retired)
- [Ad imagery representation](matchtern-ad-imagery-representation.md) — feature South Asian + Asian people
- [Ad economics](matchtern-ad-economics.md) — Meta ~$50/opt-in; $2k cold offer ≈ 0.4x ROAS; needs a tripwire
- [Static ad pipeline](matchtern-static-ad-pipeline.md) — HTML→PNG headless-Chrome, 4:5 FB/IG ads
- [Meta campaign builder](matchtern-meta-campaign-builder.md) — no-publish Marketing-API script (builds PAUSED)
- [Apply landing page](matchtern-apply-landing-page.md) — apply.matchtern.org + Netlify + Cal.com
- [Long-form video style](matchtern-longform-video-style.md) 16:9 · [Short-form video style](matchtern-shortform-video-style.md) 9:16
- [Ivy.insider pipeline](ivy-insider-pipeline.md) — green CollegeTierList carousel generator
