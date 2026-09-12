# Voiceover explainer mode

Status: editorial specification, with a first concept-specific silent Remotion animatic in `EXPLAINER-PREVIEW.md`. Not an implemented automatic explainer generator or a real-VO-synchronized edit.

Alex wants voiceover sections that explain concepts clearly through animation. The existing workflow/context specimens and white-glass gallery are reusable visual ingredients, not a finished narration-led explainer system.

This is a visual/storytelling mode that can run inside any existing course, screen-demo, or talking-head project. It does not introduce a new `profile` enum into the edit manifest or change the assembly schema.

## Core rule: animate the explanation

Alex's visual correction: fewer words, fewer diagram labels, and stronger meaningful graphical actions. Do not burn in section headers, a persistent No Code Alex/How It Works header, production notes such as schematic example, or jargon such as exception path. Avoid an always-visible linear flowchart as the default. Reuse the short-form system's understandable inspection, held-item, handoff, reaction, and transformation patterns; keep real UI anchors where useful. Background graphics must not compete with content. The large decorative ring is removed from the current explainer. Narration carries explanation; on-screen text identifies only what the current action cannot communicate clearly by itself.

Start with what the viewer should understand, then map the approved voiceover to visible changes. Do not simply put each sentence in a glass card. The viewer should see the mechanism: what enters, what changes it, why that change happens, and what comes out.

Use a connected explanation rather than a carousel of unrelated scenes:

1. Establish the question or familiar example. Introduce only the objects needed now.
2. Reveal the mechanism in the order the voiceover explains it. Animate the relevant action, not everything on screen.
3. Demonstrate a concrete input passing through that mechanism. Preserve the same object's identity, color, and spatial relationship.
4. Show a contrast or failure branch when it resolves a likely misunderstanding.
5. Hold the resolved model and land one takeaway before returning to footage or the next concept.

These are optional teaching functions, not five mandatory shots. Duration follows the narration and reading needs, not the eight-second gallery slots. Preserve intentional thinking pauses.

## Visual vocabulary

Scale and performance correction: do not confine every explanation to one small centered card. Use the landscape frame deliberately, with distinct component families, distributed staging, separation/reassembly, and visible consequences. Claude should perform an actual task where appropriate—operate a control, move a relevant object, inspect or respond—not stand beside each graphic. Tie physical contact and component response to the same clock; preserve anticipation, follow-through, gait and readable resting poses. A simple checkmark is not a sufficient visual payoff by default. Keep low text density while varying the action; screen coverage alone does not prove the animation is interesting.

| Teaching need | Remotion treatment | What makes it explanatory |
|---|---|---|
| Process | Persistent input traveling through a diagram | Each stage visibly changes the same example |
| Hidden mechanism | Open an object into a labeled cutaway | Reveal the inside without losing the outside context |
| Comparison | Aligned before/after or two controlled branches | Change one meaningful variable and label the consequence |
| Abstract concept | Concrete example, then simplify into a model | Explicitly mark analogy limits; do not present a metaphor as product behavior |
| Software proof | Real UI crop, focus, then explanatory overlay | Show the actual result; authored UI is labeled schematic |
| Definition | Brief plain-language definition beside the active model | Define the term where it becomes necessary, then demonstrate it |

White optical glass, Fraunces/Inter, cream, and clay-orange remain the brand. Glass can contain a model, but not every object needs a card. Use open diagrams, large typography, connectors, selective depth, and empty space. Keep labels sharp and diagram contrast readable through the glass. Color reinforces meaning but never carries it alone.

## Structured staging and motion hierarchy

Alex's latest correction: keep substantial visual scale, but centralize the designed stage and leave generous margins. v3's edge-filling scatter is superseded. At 1920×1080, v4 uses a foreground safe area x=260–1660 / y=170–930, a 1300px-wide expanded layout and an 80px gutter. These are the reviewed prototype's implementation values, not a universal grid for every topic.

Group related objects, align shared edges, preserve the example across transformations and prioritize one focal action. Complexity belongs in an informative mechanism, not more labels or independent moving parts. Use decisive decelerating entrances, smooth in/out layout moves, longer weighted folds, natural character anticipation/contact/recovery, and clear reading holds. UI/glass does not inherit Claude's squash or bounce. Do not add camera motion to compensate for a mechanism that communicates nothing.

## Illustrative sequence: ask for a missing email

This is a schematic example, not a claim about a particular product or a supplied voiceover.

- “When someone submits the form…” One form arrives with visible name and email fields.
- “…the automation checks the required fields.” The same form enters a validation gate. Highlight the missing email.
- “If something is missing, ask for it before continuing.” Open the sender compartment beside the same record; a request triggers the envelope opening. No repair-branch jargon.
- “Once the information is complete, it can continue.” Show Sam's supplied reply moving into the exact missing field. Hold the now-complete record.
- Resolve into a filed contact using the same fields. Let the object transformation carry the takeaway, not a header or flowchart sentence.

Do not reset the entire canvas between these lines. The changing example is the explanation. Actual VO timings and factual behavior still require source-specific approval.

## Claude's role

Latest pacing correction: **one dominant action is not one moving object**. Alex explicitly wants concurrent activity. Let an operator prepare the destination while another retrieves data; let a carrier close/reset the source while the receiver finishes the task. Overlap anticipation and follow-through, allocate separate travel lanes, and hold the final result briefly. Avoid leaving every partner and prop frozen until their turn. Keep movements tied to a job, not aimless looping bobbing.

When an idea benefits from teamwork, use two original sprites with distinct jobs rather than decorative clones: one retrieves or prepares the real input, another receives and applies it. Assign non-overlapping zones, make the payload follow its carrier, show a visible release/catch, and let the receiver absorb momentum. One primary action at a time; the partner watches or prepares. Vary gait, gaze and timed facial reactions without adding custom limbs. The v5 dispatch studio is a review example, not a requirement to use mail or teamwork for every topic.

The existing 2D Claude can carry an input, point toward the active stage, inspect an exception, or acknowledge a resolved result. Use curious/focused/alert/pleased reactions to reinforce those beats, with smooth transitions and natural landing follow-through. Do not add a jump or sound to every sentence.

Claude must not cover labels, compete with the current teaching action, or imply that a deterministic automation is reasoning like a person. Let him become still or leave when the diagram needs full attention. The confirmed glowing CGI remains the original asset for applicable footage beats; this mode does not replace it or alter its baked facial animation.

## Narration-to-Remotion handoff

1. Lock the corrected narration and final audio edit first. Source claims and approve the explanation before animation polish.
2. Build the beat map in `PROJECT.template.md` using timestamps on the final edited timeline. If the VO changes, update the map and cue timings before export.
3. For each beat, specify the current visual state, the visible change, what persists into the next beat, the reading hold, and any justified sound or character action.
4. Convert approved times to frames at the composition FPS. Author deterministic, seek-safe Remotion motion from that clock; audio, captions, expressions, and graphics use the same timing reference.
5. Reuse the existing glass, brand, sprite, facial-pose, and landing primitives. Build concept-specific diagrams as needed; do not force every concept into the current three sample graphics.
6. Render one representative passage with the real VO before expanding into a full video. No fabricated narration or claim of automatic transcript-to-animation support.

Use quick orientation moves that ease into a quiet readable state. Keep text stable during the line it supports; stage reveals and selective highlights instead of constant camera movement. Preserve visual continuity across beats.

## Voice-first sound

Use [SOUND-DESIGN-PRINCIPLES.md](SOUND-DESIGN-PRINCIPLES.md), adapted from Alex's supplied nine-fundamentals reference: target, envelope, pitch, purposeful layers, simplicity, cleaning, tone, size, movement and depth. The v4 preview implements a quieter action-specific pass; no real-VO balance is claimed.

Alex's feedback: the v6 effects work as an audition but are too loud relative to voiceover. Keep that audition unchanged for reference. Do not reuse its master gain of 2 as a production default.

Level the actual narration first; audition a substantially reduced SFX bus underneath it, then adjust cue by cue. Omit nonessential cues during dense explanation. Shape or duck overlapping tails as needed and leave reading holds quiet. A low peak or integrated loudness value alone does not prove that consonants remain intelligible. No automatic ducking implementation is implied by this specification.

## Explainer review gate

- Can a viewer describe the mechanism and predict the next step after watching?
- Does each meaningful visual change correspond to the spoken explanation, without revealing the answer prematurely?
- Are objects, branch labels, colors, and relationships consistent across the sequence?
- Is the example accurate, sourced where necessary, and distinguished from analogy or schematic UI?
- Are labels readable at normal playback speed and on a smaller display?
- Do Claude, glass highlights, and sound support rather than interrupt the explanation?
- Is every word of the real VO clear with effects enabled, including on small speakers?

Before the first build, obtain a real voiceover passage or an approved script/topic. The current addition supplies the production plan; a narrated sample and reusable diagram implementations still need to be authored and reviewed.
