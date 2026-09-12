# Explainer previews

## v11 — fast dispatch action (APPROVED baseline)

Alex approved this version on September 10, 2026 and asked to save it into the YouTube workflow. [APPROVED-ANIMATION-SYSTEM.md](APPROVED-ANIMATION-SYSTEM.md) is the standing contract. Older pending/rejected review notes below remain historical. Approval covers the animation direction, not a final mix under actual narration.

Alex asks for faster pacing, more happening and more interesting objects rather than just shapes. `DispatchExplainerSound` / silent `DispatchExplainer` is now 7 seconds (210 frames), versus 10 seconds before. Action-clock rate changes 1.3→1.7; the late hold is trimmed. No VO is sped up because none exists in this study.

New code-native, recognizable working props in `DispatchProps.tsx`:

- A wood-handled rubber stamp enters, presses and withdraws while a matching postmark stays on the same letter. The courier's lean responds to this beat. The tool is letter-local, not claimed as hand-tracked to the sprite. Its handle approaches diagonally to clear the email text.
- A metallic intake deploys below the email field; both wheels and roller ribs turn during feeding, then retract before the Saved label appears. No unrelated gears floating in the background.
- A golden mail bookmark drops into the finished folio and settles. It replaces the redundant Contact label rather than covering it.

The same large letter, colorful role costumes, original Claude silhouette, clean oval stage, white glass and source → handoff → result hierarchy remain. Animation/creative skills informed tactile prop action and internal moving parts. New activity is object-specific, not added abstract decor or camera motion.

`dispatch-sound-cues.json` retimes existing quiet sources to the 1.7 clock and adds low-level stamp/bookmark contacts. 12 cues; same filter settings and 0.65 master gain. Source sample peak about −24.36dBFS; no real-VO listening or mix approval implied.

```sh
# video/:
npx remotion render src/youtube-explainer-preview.tsx DispatchExplainerSound /absolute/output/dispatch-action-v11.mp4 --concurrency=2 --crf=17 --public-dir=/absolute/media
npx esbuild src/youtube/dispatch-tests.ts --bundle --platform=node --outfile=out/dispatch-tests.cjs
node out/dispatch-tests.cjs
```

## v10 — larger motion + expanded color

Alex requests bigger moving components, more exaggerated/engaging motion and more colors, while retaining the prior hierarchy. `BoldExplainerSound` / silent `BoldExplainer` keeps source → handoff → result and introduces:

- Courier 190→230px, archivist 220→260px, operator 130→170px; actor centers and floor contact are preserved.
- Letter scale during carry/toss 0.75→1.10 (~47% larger), raised 95px above the old carry track and with an extra 65px flight arc. It returns to the existing docking point/scale on the same frame.
- Stronger landing squash/stretch, 35% more primary hop height, doubled receiver recoil deviations, larger gesture follow-through, a short damped envelope reaction, folio hinge overshoot, more visible divider fanning and a field response at docking. The envelope's parent transform settles before the letter changes draw layers, preventing an extraction jump.
- Opt-in teal, deep blue, mint and golden-yellow accents on costumes, portrait, dividers, seal, envelope flap and letter/field edges. Orange remains the original sprite identity; cream canvas and white glass remain. Original brand tokens and previous compositions are not globally recolored. Actors are fully opaque again; hierarchy comes mainly from timing and motion priority, with moderate source/destination contrast changes.

Animation/creative skills informed exaggerated primary reactions, coupled secondary motion and video-scale color contrast, adapted to Remotion. No abstract background returns, new text, confetti, CGI replacement or camera-only motion. Existing quieter v9 sound mix and cue timing are unchanged. This is a review candidate, not a permanently approved expanded palette.

Checks: deterministic state, positive/bounded body scales, bounded letter flight, larger dimensions, preserved source/handoff/result timing, return to exact docking coordinates/scale and source-parent settle before extraction. Shared and hierarchy regressions pass. Carry, flight and result frames inspected for face/text clearance.

```sh
# video/:
npx remotion render src/youtube-explainer-preview.tsx BoldExplainerSound /absolute/output/bold-color-motion-v10.mp4 --concurrency=2 --crf=17 --public-dir=/absolute/media
npx esbuild src/youtube/bold-tests.ts --bundle --platform=node --outfile=out/bold-tests.cjs
node out/bold-tests.cjs
```

## v9 — hierarchical focus

Alex wants a hierarchy of motion rather than scattered equal-weight activity. `HierarchyExplainerSound` / silent `HierarchyExplainer` preserves the 10-second example, original 2D costumes and primary letter path, but changes which activity leads each beat:

1. **Source:** the envelope and courier lead. The destination remains quieter context; no flying portrait/name, opening book or operator jump competes with extraction.
2. **Handoff:** the letter's unchanged carry/toss/catch leads. The archivist becomes more visually present before receiving it; unrelated operator work is held until the catch.
3. **Result:** the book unfolds after the catch (5.85 action-clock seconds / 4.5 video seconds), then portrait/name assemble inside the destination while the email files. Source recedes; supporting gestures stay smaller, and the three late celebration jumps are removed so the result remains primary.

`hierarchy-motion.ts` keeps primary and secondary motion explicit. Coupled operator/divider movement continues at reduced amplitude during destination preparation; costumes, faces and soft recovery remain. No camera chase, new background shapes, blur, extra labels or black glass. Animation/creative skills informed temporal priority, stable actor zones and supporting motion intensity, adapted to Remotion rather than framework migration.

`hierarchy-sound-cues.json` reduces 20 cues to 10, retimes the book opening and removes sounds for deleted identity flights/operator jumps/late celebration landings. Retains the existing sources, filters and quiet master gain; no actual VO has been provided and no listening approval is claimed.

Verification: hierarchy tests pass (focus progression, delayed identity/folio, unchanged payload path, no competing operator/late hops, cue alignment), alongside shared/cast/kinetic tests, TypeScript and whitespace checks. Source, mid-handoff and resolved-contact frames inspected from the rendered MP4. Source audio mix sample peak −24.81dBFS. This confirms technical checks, not creative approval.

```sh
# video/:
npx remotion render src/youtube-explainer-preview.tsx HierarchyExplainerSound /absolute/output/hierarchical-focus-v9.mp4 --concurrency=2 --crf=17 --public-dir=/absolute/media
npx esbuild src/youtube/hierarchy-tests.ts --bundle --platform=node --outfile=out/hierarchy-tests.cjs
node out/hierarchy-tests.cjs
```

## v8 — character ensemble

Alex requested more animated aspects throughout, individual character and possible outfits. `CastExplainerSound` / silent `CastExplainer` adds opt-in costumes to the original 2D silhouette: courier cap/scarf/satchel, archivist glasses/vest/tie, operator hard hat/overalls/handheld tool. Four legs, original eyes and side stubs remain; no replacement CGI character. Costumes follow the body's existing transforms, with separate scarf, bag, cap, tie and glasses motion.

`cast-motion.ts` adds staggered inspection/blink/gaze schedules, delivery gestures, catch anticipation, filing lean, operator work strokes and different celebration gestures. The operator/tool and divider flutter share one working driver; the courier's closing gesture shares the seal press driver. The envelope's small mail glyph opens, the seal turns/compresses, an edge highlight traces the envelope and a single localized glass sheen crosses the finished field. Text itself stays anchored and the clean cream backdrop/oval floor remain unchanged.

Animation-skill coupling and internal-part enrichment informed this pass, adapted to deterministic Remotion frame functions. No ambient background shapes, new explanatory labels, VO, audio sources or louder mix. Existing quieter v6 audio reused; not every new supporting gesture has a sound. Previous versions remain available. This is a new review candidate, not approval of the style.

QA: cast tests cover seek determinism, continuous gesture controls, facial ranges, distinct roles and final settling; shared and kinetic motion regressions pass. TypeScript and whitespace checks pass. Working and final rendered frames were inspected; the overlapping moving-name/permanent-title handoff was corrected to avoid double lettering. No claim of listening against actual VO.

```sh
# video/:
npx remotion render src/youtube-explainer-preview.tsx CastExplainerSound /absolute/output/character-ensemble-v8.mp4 --concurrency=2 --crf=17 --public-dir=/absolute/media
npx esbuild src/youtube/cast-tests.ts --bundle --platform=node --outfile=out/cast-tests.cjs
node out/cast-tests.cjs
```

## v7 — clear ensemble stage

Alex rejected the abstract backdrop in v6, while explicitly allowing the oval platform and requesting better visual readability. `ClearExplainerSound` / silent `ClearExplainer` keeps the exact v6 choreography, 10-second timing, three Claudes and quiet audio asset. It removes the pleated clay slab, curved white ribbon and washout glow. The oval platform remains on a clean brand-cream canvas; no replacement decorative shape is added.

White translucent envelope faces have stronger warm edges and seams. The contact folio uses lighter reading surfaces, darker structural edges, a stronger Email label and larger/heavier final email text. No black glass, extra copy, camera changes or CGI asset edits. Previous compositions remain available for comparison. The visual-design clarity pass changes hierarchy and contrast, not the motion system.

Verification: isolated TypeScript check, shared YouTube motion tests, kinetic state tests and whitespace checks pass. Rendered H.264 at 1920×1080/30fps with AAC 48kHz; busy identity-transfer and finished-record frames inspected for background removal, separation and text fit. The audio source is unchanged; no actual VO listening/mix approval is implied.

Render from `video/` with the same public media directory:

```sh
npx remotion render src/youtube-explainer-preview.tsx ClearExplainerSound /absolute/output/clear-ensemble-v7.mp4 --concurrency=2 --crf=17 --public-dir=/absolute/media
```

## v6 — overlapping ensemble motion (background superseded)

Alex found v5 too static and sequential; explicitly requested more moving parts **at the same time** and more fluidity. This overrides an overly strict interpretation of one-action-at-a-time. Retain focal hierarchy and legibility, but keep supporting jobs visibly progressing while the primary action happens.

`KineticExplainerSound` / silent `KineticExplainer`: 10 seconds, 1080p30. The original `DuetExplainer` v5 remains available without the active mode. `kinetic-motion.ts` adds new concurrent blocking and maps the 13-second action clock to 10 seconds (1.3× animation clock only, **no VO speed change**).

- While the source reply lifts, the receiver walks into place, a third Claude opens the book, and portrait/name pieces travel into their corresponding record positions.
- During the email carry, the small operator moves along the filing edge and the dividers fan further apart, then settle back during the toss/catch.
- The email carrier returns to close and settle the source envelope while the receiver files the email and the operator closes the dividers.
- All three have staggered follow-through/celebration; the final readable hold is short. The cream/clay set receives a soft moving light and broader material movement, not a camera-only activity fix.

The shared-control motion principle informs coupled operator/page and carrier/payload motion. The user-requested concurrency is deliberate: several related jobs overlap; existing text and the actual email remain readable. A sampled-frame check caught the name chip behind the email, so its path was moved to a separate upper lane. Name and portrait settle into matching content instead of adding unrelated labels.

`kinetic-tests.ts` checks deterministic seeking, actor spacing, name/email separation, payload attachment, source/result order, sound timing and specific overlapping state changes. Shared motion tests and isolated TypeScript checks pass. These are technical checks, not proof of creative approval or retention.

`kinetic-sound-cues.json` retains the quieter source processing/master gain, retimes the original cues to the new animation clock and adds restrained identity/divider/closure contacts. No new source audio, music or VO. Source SFX sample peak approximately −24.84dBFS; listening against actual narration remains pending.

```sh
# Repo root, ffmpeg on PATH:
node youtube-video-editing-system/tools/prepare_glass_sfx.mjs /absolute/media/.media/audio/sfx /absolute/media/sfx-kinetic youtube-video-editing-system/kinetic-sound-cues.json
# video/:
npx remotion render src/youtube-explainer-preview.tsx KineticExplainerSound /absolute/output/fluid-ensemble-v6.mp4 --concurrency=2 --crf=17 --public-dir=/absolute/media
npx esbuild src/youtube/kinetic-tests.ts --bundle --platform=node --outfile=out/kinetic-tests.cjs
node out/kinetic-tests.cjs
```

## v5 — two-Claude dispatch studio (superseded pacing)

Alex rejected v4 as too basic: too many lines, squares and simple panels; wanted richer scene/background design and more character, including interactions between Claudes. Preserve its clarity, margins, brand and quiet sound direction, not its card-based staging.

`DuetExplainerSound` / silent `DuetExplainer`: 13 seconds, 1920×1080 at 30fps. Source is `video/src/youtube/DuetExplainer.tsx`, with pure state in `duet-motion.ts` and checks in `duet-tests.ts`. A new code-native paper/glass studio replaces the panel layout: a curved, softly pleated clay backdrop, raised presentation floor, freestanding translucent envelope and a contact folio with a hinged identity leaf. No raster environment generation, Three.js character substitute, background ring, extra header or flowchart copy.

Rhythm: reveal → retrieve → carry → toss/catch → file/unfold → staggered reaction → hold. The two existing 2D Claudes have different scales and roles, partner-directed gaze and complementary reactions. Their original anatomy is preserved. One letter is passed through the whole event; there are no independently animated duplicate payloads.

| Beat | Scene action and causal purpose |
|---|---|
| 0–3.1s | Retriever anticipates and hops; contact opens Sam's envelope, the supplied email lifts fully clear of the pocket and settles into the carry position |
| 3.2–4.45s | Retriever walks toward the receiver; payload follows the same position driver |
| 4.9–5.7s | Ballistic toss between partners; receiver braces, catches and absorbs momentum with damped body/letter recoil |
| 6.65–8.9s | Receiver feeds the same reply into the email field; only then does the contact fill and unfold its identity leaf |
| 9.3–13s | Short staggered celebration with separate landing times and natural recovery; readable finished result |

The ensemble-motion reference informed clear actor zones, interleaved focal actions and coupled payload movement. The physical-reaction reference informed catch/settle. These are craft inputs adapted to Remotion, not copied scene templates. This is a new review candidate, **not approved creative or retention-proven output**.

`duet-sound-cues.json` retimes the existing quieter v4 palette to retrieval, toss, catch, docking and landings. Same master 0.65 and envelope/filter treatment; no new source effects, music or voiceover. Source SFX mix sample peak is approximately −24.50dBFS. Real narration balance and listening approval remain pending. All prior previews, the original CGI asset and the shared character rig remain intact.

```sh
# Repo root, ffmpeg on PATH:
node youtube-video-editing-system/tools/prepare_glass_sfx.mjs /absolute/media/.media/audio/sfx /absolute/media/sfx-duet youtube-video-editing-system/duet-sound-cues.json
# video/:
npx remotion render src/youtube-explainer-preview.tsx DuetExplainerSound /absolute/output/character-studio-v5.mp4 --concurrency=2 --crf=17 --public-dir=/absolute/media
npx esbuild src/youtube/duet-tests.ts --bundle --platform=node --outfile=out/duet-tests.cjs
node out/duet-tests.cjs
```

The physical exchange illustrates supplied data moving through a workflow; it is not evidence that multiple actual Claude agents operate a contact application or infer Sam's personal data.

## v4 — centered, structured request/reply (superseded visual direction)

Alex found v3 unstructured and too close to the frame edges. The response is a new composition, not a global scale-down: a persistent record expands into two aligned areas, then reunites. Important foreground content stays inside x=260–1660 and y=170–930 at 1920×1080. The widest active layout is 1300px, with an 80px gutter. No background ring or explanatory headers return.

17 seconds, 1080p30, with restrained SFX and no real VO. `RefinedExplainerSound` is the current audible composition; `RefinedExplainer` is its silent counterpart. v1–v3 remain intact for comparison.

| Time | Information-bearing action | Motion / hierarchy |
|---|---|---|
| 0–2.8s | One record shows Sam and the empty email field | Fast entrance decelerates into a reading hold; field gets the only emphasis |
| 2.8–5.8s | Source compartment opens beside the same record | Shared top/bottom alignment; slow quintic layout move; Claude approaches the control |
| 5.8–8.9s | Claude presses; Sam's envelope opens and the supplied reply lifts | Anticipation, ballistic hop, contact, absorption and follow-through; physical flap and layered pocket |
| 9.15–11.9s | Reply travels from Sam into the actual email socket | One short arc; the address appears only after docking; then a quiet comprehension hold |
| 12.1–17s | Source closes behind the record; the same fields become a filed contact | Centered reunion, layered page edges and filing tab; final held result rather than a giant checkmark |

The motion-design skills informed purposeful verbs, hierarchy, build/hold/resolve pacing, separate easing for UI and character physics, and clear source/destination relationships. Alex's request for centered safe margins overrides generic edge-anchoring suggestions. The design is pending creative approval, not claimed as objectively elite or retention-proven.

The sound pass applies Alex's supplied nine-fundamentals reference through [SOUND-DESIGN-PRINCIPLES.md](SOUND-DESIGN-PRINCIPLES.md). It reuses the existing sources, reshapes envelopes/tone, layers only two meaningful contacts, uses restrained positional movement and lowers the bus. The old audition is unchanged. The CGI file is untouched; this preview uses the existing 2D sprite.

From `video/`:

```sh
npx remotion render src/youtube-explainer-preview.tsx RefinedExplainerSound /absolute/output/structured-v4.mp4 --concurrency=2 --crf=17 --public-dir=/absolute/media
npx esbuild src/youtube/refined-tests.ts --bundle --platform=node --outfile=out/refined-tests.cjs
node out/refined-tests.cjs
```

Rebuild audio from repository root:

```sh
node youtube-video-editing-system/tools/prepare_glass_sfx.mjs /absolute/media/.media/audio/sfx /absolute/media/sfx-refined youtube-video-editing-system/refined-sound-cues.json
```

## v3 — full-stage interaction (superseded)

Alex found v2 somewhat better but too centered, too small, too limited in component variety, and too passive in its use of Claude. This revision expands the staging rather than adding explanatory text or decorative camera motion.

21 seconds, 1920×1080, 30fps; silent visual prototype. `ExplainerStage` in `video/src/youtube-explainer-preview.tsx` is the current composition. Earlier exports/compositions are preserved for revision history, not removed.

| Beat | Components and action | Claude's role |
|---|---|---|
| 0–3.3s | A 1770px-wide form separates into avatar, name, and email pieces | Anticipates, jumps onto the opening control, compresses and recovers |
| 3.3–6.2s | Pieces occupy different screen regions; the incomplete email shifts right | Walks to the field, leans into it, pushes with a shared displacement clock |
| 6.2–11.8s | An envelope opens; a supplied reply crosses the frame and fills the empty field | Watches the reply and reacts to the resolved field |
| 11.8–15s | Two 870px pages unfold; existing fields assemble into a full-width contact folio with spine, page edges and tabs | Walks to the save control |
| 15–21s | Save press drives a traveling clasp/embossed Saved seal, then a settled result | Jumps onto the control, absorbs contact, recovers and holds a pleased expression |

Original 2D anatomy is retained. `Claude2D` and `SpriteActor` accept an optional gait: the four existing legs alternate lift/stride with smooth amplitude ramps. Existing callers without gait preserve their old appearance. No new arms, external limbs, or original-CGI edits.

`stage-motion.ts` owns timed layout and actor state. `stage-tests.ts` covers phase order, exact push displacement coupling, control landing positions, page/spine clearance, motion bounds and deterministic seeking at 24/30/60fps. Shared YouTube tests and isolated TypeScript checks also pass. Sampled reviews include opening, push, reply flight, book spread and save; review caught and fixed text crossing the spine and a seal behind Claude. Technical checks are not evidence of creative approval or retention.

From `video/`:

```sh
npx remotion render src/youtube-explainer-preview.tsx ExplainerStage /absolute/output/full-stage-v3.mp4 --concurrency=2 --crf=17
npx esbuild src/youtube/stage-tests.ts --bundle --platform=node --outfile=out/stage-tests.cjs
node out/stage-tests.cjs
```

No title/header/footer, background ring, persistent flowchart, or standalone checkmark payoff. The physical actions remain schematic illustrations, not product UI or claims that Claude supplies missing personal data. Real VO and a VO-balanced sound pass are still needed for production.

## v2 — visual-first revision

Alex rejected v1's text-heavy, linear flowchart, unnecessary headers, production labels, and background ring interfering with text. Those elements are removed from the current `VisualExplainer` composition. The v1 composition/export is preserved only for revision history.

19 seconds, 1920×1080, 30fps. Still a silent visual prototype, not synchronized to recorded VO. No new audio or mix changes.

Reference work: `memory/alex-claude-motion-and-voice.md`, `memory/alex-abstract-animation-and-audible-sfx.md`, and selected patterns in `video/src/ClaudeCrewReel.tsx` (S2's inspection lens, S4's held item, S5's meaningful handoff). This borrows mechanisms and performance principles, not entire scenes or the short-form title/caption layout. A previous render's existence is not evidence of Alex's approval.

- Form arrives with purposeful travel; a send press produces rejection and recoil.
- A lens inspects the actual missing email, rather than displaying a separate explanation.
- The email field lifts out; a person replies and the supplied value travels into it.
- Field returns to its original slot, check confirms, send produces the result.
- The form resolves into a contact-book entry, followed by Claude's natural celebratory hop.

Only essential labels/value text remains: Sam, Email, the supplied address, a brief Wait/Email? reaction, and Saved. No persistent heading, brand header, footer narration, step numbers, exception-path label, schematic label, or decorative ring. White glass, original 2D anatomy, face reactions, and cream/clay branding remain. The confirmed original CGI file is not changed.

Source: `video/src/youtube/VisualExplainer.tsx`. Preview registration retains both versions. Render from `video/`:

```sh
npx remotion render src/youtube-explainer-preview.tsx VisualExplainer /absolute/output/visual-explainer-v2.mp4 --concurrency=2 --crf=17
```

Review includes opening, extracted-field and resolved-result frames; inspect through travel/contact in playback before creative approval. Type checking and shared motion tests are technical checks, not proof of retention or taste approval.

## v1 — superseded direction

28 seconds, 1920×1080, 30fps. A schematic automation example, not captured product UI. Silent visual animatic with timed narration text; no synthetic voice, real VO synchronization, music, or new sound mix is claimed.

## Direction

Build → inspect → detour → repair → recheck → resolve. One persistent form, one model, one illustrative exception. White glass uses the existing optical primitives, cream/clay palette, and Fraunces/Inter. Lines trace meaningful routes. Field state and the check result share a deterministic clock. Claude observes, reacts, and makes one small celebration with the existing landing follow-through; the original CGI is untouched.

| Seconds | Teaching beat | Visible change |
|---|---|---|
| 0–4.4 | An input may be incomplete | Introduce form 001 with an empty email |
| 4.4–9.2 | Validate before acting | Same form moves into the check; missing email is marked |
| 9.2–14 | Handle the exception | Repair branch draws and receives the form |
| 14–19.5 | Repair does not bypass validation | Email is supplied, form returns, check passes |
| 19.5–23 | Proceed after the check | Form reaches create-contact and is marked saved |
| 23–28 | Read the complete mechanism | Hold the resulting diagram and takeaway |

## Files and reproduction

- `video/src/youtube/VoiceoverExplainer.tsx`: authored example composition.
- `video/src/youtube/explainer-motion.ts`: beat copy and pure document state.
- `video/src/youtube/explainer-tests.ts`: narrative order, bounds, continuity, deterministic seeking.
- `video/src/youtube-explainer-preview.tsx`: isolated registration, avoiding the unrelated legacy root imports.

From `video/`:

```sh
npx remotion render src/youtube-explainer-preview.tsx VoiceoverExplainer /absolute/output/explainer.mp4 --concurrency=2 --crf=17
npx esbuild src/youtube/explainer-tests.ts --bundle --platform=node --outfile=out/explainer-tests.cjs
node out/explainer-tests.cjs
```

This is a working concept-specific specimen, not an automatic transcript-to-animation system. For production, replace the provisional beat timings with an approved actual narration edit, remove review labels/on-screen narration if inappropriate, and mix restrained effects against that VO. The earlier no-dialogue SFX audition remains unchanged.
