# FACTORY LOG — REEL 46 "FLIP" (2026-07-11)

CTA keyword: **FLIP** · comp lane: resale/money (raycfu-style hard-dollar). Shipped file: `~/Downloads/Claude-Reels-Final/46_Claude-fable5-flip.mp4` (46.55s) + Drive. Caption: `flip_caption.txt`.

## STAGE 0 — SOURCE
- door: **A (Outlier Engine / self-sourced money lane)**, pivoted from a killed premise (CLAIM — unclaimed-money via public MissingMoney.com search).
- transfer_hypothesis: raycfu's broad TAM comes from MONEY-outcome framing, not the mechanic. Resale-of-clutter is a first-order, pays-now task with a real gate-able Claude workflow (3 prompts: price / sell-this-week listing / agent auto-post). Fixes CLAIM's fatal flaw (public search = nothing to gate, funnel broken).

## STAGE 1 — TOPIC KILL-GATE
- frame-1 receipt: PASS — first-person closet avalanche + "$3,180 in your closet, Claude found it in one photo" (hard dollar, decodable sound-off).
- input-exists: PASS — everyone has a closet of clutter + a phone camera.
- gate-the-how: PASS — the exact pricing + listing prompts are the gated payoff (comment FLIP). VO sells RESULT + names artifact ("the Sell-This-Week Listing"), never the copy-pasteable prompt text.
- lever: none (concrete-astonishment). Zero deadline.
- audience-size: broad (declutter + side-hustle + reselling intersect). PASS.

## STAGE 2 — STRUCTURE
- structure_comp: **cloned XRAY chassis** (reel 45) verbatim — reveal-forward follow-along, money lane. Solo dark-terminal Panel chassis, 8 scenes, HeroHeader, ProgressBar reward, Captions.
- template: reveal-forward follow-along + FIRST-PERSON POV closet cold-open (new hook mechanic vs XRAY's heist-bust).

## STAGE 3 — DRAFT + HOOK
- VO = Alex's real recording (78.8s raw). He read the FLIP script but ADDED a new agentic "best part" ending (Claude auto-posts + auto-replies to buyers). Kept it.
- hook: "$3,180 in your closet — Claude found it in one photo" (hard-dollar receipt + specificity lever: exact figure $3,180, named artifact, one-photo input).
- ladder: L1 stun-gun (POV avalanche frame-0) · L2 curiosity ("worth THREE GRAND?!") · L3 anticipation (why most sit unsold) · L4 non-obvious payoff (keyword-title Sell-This-Week listing + agent auto-sells).

## STAGE 4 — ADVERSARIAL GATE (2 runs)
- run 1: believability 7 — "actually sold for this month" implied a live sales database → hedged to "estimates what each would sell for from recent listings" / "near what similar ones are going for."
- run 2: SHIP — believability 8; fixed CTA keyword not being final word → ended VO on "Comment FLIP and I'll send you the exact pricing and listing prompts." All six dims ≥8, 0 blockers.

## STAGE 5 — TRUTH / EVIDENCE
- claims hedged to estimate-language (no live-database claim). Numbers are illustrative in-UI ($3,180 total, per-item est. tags, $180 sale, $2,480 payout) — framed as estimates, not receipts.

## STAGE 6 — BUILD
- VO splice: removed one "but but cut cut" flub + all retakes (RMS-snap head=0.68, Aend=19.08, Bstart=21.94, Bend=38.04, Cstart=65.46, tail=77.38) → flip_vo.wav (46.69s). Captions aligned via difflib (176 words, LEAD 0.10).
- L = [0.0, 5.0, 7.88, 18.94, 21.30, 24.78, 35.34, 44.0], CUT 46.5, durationInFrames 1395.
- 8 scenes (pop-culture clutter throughout — Furby, Baby Yoda, Tamagotchi, Nokia brick, Rubik's, disco ball, lava lamp, retro console, CRT): F0 POV closet avalanche → F1 disbelief → F2 photograph+Claude writes listings (BAY/BOOK/DEPP chips) → F3 why-unsold (MONTH 2 / 0 views) → F4 lazy way ($400 paid + lazy line) → F5 Sell-This-Week listing (reprice→keyword title→SOLD) → F6 agent (auto-reply buyers + SOLD rain) → F7 CTA (FLIP + $2,480 payout).
- ⛔ HOOK REBUILD (Alex directive: "first-person POV looking into the closet, doors clapping, retentive in 1-3s"): original F0 had a DEAD empty panel for ~frames 12-30 (items started at frame 16 from far above panel, entered visible area too late). Fixed: door BURST 4-13f + pre-rattle bulge + light-seam flare + FIRST-PERSON POV spill layer (5 hero items rush the lens, small→huge, motion-blurred) + faster/earlier avalanche (start 8+seed·26, fallDur 26+seed·14, startY -130). No dead frames.
- FULL SFX sound design added (was placeholder): door thock+deep-whoosh, avalanche pops/rumble, tag snaps, total-slam boom+cash-register+sparkle, disbelief boing, camera-shutter, typing+confirms, F3 record-scratch (screech) pattern-interrupt, F4 zucc error, F5 magic-reveal+chime+SOLD register, F6 notif/confirm/register rain, F7 boom+cheer+coin chimes. All 24 files verified present in public/sfx.
- encode: ffmpeg-static, AAC-priming strip atrim=0.0427, libx264 high crf18 -r30, aac 256k, +faststart.

## STAGE 7 — OVERHAUL (2026-07-11) ✅
First render was structurally right but visually flat with a placeholder hook — the exact wireframe the [[reel-overhaul-stage]] exists to fix. Ran the overhaul workflow (foundation: vibrant Bg + shaded PCProp pop-culture library [Messi/Argentina, Haaland, moai, Shrek, Grogu, Doge, retro toys] + iOS PhoneUI/ListingCard/SoldStamp/Toast kit; then all 8 scenes rebuilt). Fresh INDEPENDENT critic verdict: **Gate A PASS** (closet-door burst + POV spill = real pattern interrupt, judged on a 0-2s motion burst; depth + motion blur + escalation, no dead frames). **Gate B: 3 blockers** — F2 "reads-every" sparse, F3 lonely unsold card, F5 sparse rewrite-title. Fix round filled them (F2 scanning photo-grid w/ detection brackets; F3 graveyard of faded unsold cards + dust; F5 title-types-in + keyword chips + "+$95 est"). Also fixed a shared-kit bug: `ListingCard` called `<PCProp itemKey=.../>` (wrong prop) → blank thumbnails everywhere → corrected to `k=/sz=`. Re-rendered, verified. Delivered v2 (16.7 MB) to Final + Drive.

## STAGE 7b — POLISH LOOP 2 + COLOR/THEME PASS (2026-07-11)
Alex feedback round: (1) items overflowed past the right closet door → F0 rebuilt with a HARD-CLIP boundary (OPEN_L 90 / OPEN_T 96 / OPEN_W 832 / OPEN_H 640) so clutter stays inside the opening, framed by the doors. (2) Header → descriptive Title Case, less text: "$3,000/Week Side Hustle / Selling Your Old Stuff 📸". (3) Added a Super Mario item (PCProp "mushroom" = Super Mushroom). (4) Added a `MarketLogo` component (real eBay / Facebook Marketplace / OfferUp / Depop logos) and wired them as the source chips in F2 + the F4 app-icon row (replacing BAY/BOOK/DEPP text). (5) Fixed F2 items-covering-components + F5 overlapping graphics.
- ⛔ COLOR/THEME PASS (Alex: "not neon + light-opacity, use a rich animation palette, interesting per-scene cinematic theme, no washes"): repainted all 8 scenes to a rich MATTE animation palette, killed neon glows + low-opacity washes, gave each scene a distinct cinematic theme — F0 warm walnut treasure-closet, F1 plum bold-pop, F2 warm studio, F3 cold graveyard, F4 drab cubicle, F5 emerald win, F6 indigo control-room, F7 gold payday. Rule baked into [[reel-overhaul-stage]] Gate B (color discipline) so it stops recurring.
- Delivered v3 to Final + Drive.

## STAGE 7c — FIX ROUND (2026-07-12)
Alex feedback: (1) $3,180 TOTAL slam needs a WHITE containerized card behind it → added (green number on a cream receipt card). (2) The drawn marketplace logos → use REAL logo PNGs: found `depop logo.png` / `offerup logo.png` / `marketplace logo.png` in ~/Downloads → copied to public/ as logo_depop/offerup/fbmarket.png; `MarketLogo` now renders them via `<Img>` (kept the drawn eBay — no file provided). (3) F5 reprice gauge: the $203/$231 value overlapped the gauge hub/needle → moved the value into its own clear band below the gauge (top 268), shifted comps (384) + eBay cameo (520) down. (4) ⛔ VO GAPS: Alex "there can't be gaps, it ruins the video" → sample-accurate gap trim (`trim_gaps.py`, 44.1k mono, 3ms de-click fades): mid-sentence gaps → 0.09s, sentence boundaries → 0.24s, lead/tail → 0.12s. VO 46.69s → 41.60s. Re-aligned captions to the tight audio (align_flip.py → words_flip.json, 176 words) + re-derived **L = [0.0, 4.46, 7.04, 16.64, 18.88, 22.18, 31.06, 39.04]**, CUT 41.6, durationInFrames 1395→1248. SFX + scene beats are L-relative so they shift correctly. Backup: flip_vo_ORIG.wav.
- Delivered v4 to Final + Drive.

## OWED / NEXT
- gated guide docx (pricing + sell-this-week listing + agent-post prompts) — build when Alex requests (matches XRAY's The-XRAY-Guide.docx pattern).
- [[reel-lever-ledger]] row appended (#46).
