# ⛔ Information goes in the GRAPHIC, not in type

**Feedback (reel 82):** *"the scenes need to be wayyyy more detailed, less text and more graphical
animation if that makes sense but also hierarchical and make sure stuff isnt covering on top of
each other."*

Shot A had **seven** text elements. The fix is never smaller type. It is moving the information out
of type entirely.

| instead of… | draw |
|---|---|
| a labelled value (`94%`) | **needle sweeps** to it, red danger arc (`Gauge`) |
| a headline | **split-flap cells flip**, letter by letter (`Flap`) |
| a percentage | a **segmented bar fills** (`BarMeter`) |
| an emphasis word | a **ring expands** from the thing (`Pulse`) |
| "it is running" | a **radar arm turns** (`Sweep`) |

**A number should MOVE to its value, not be typeset at it.** Three needles slamming into the red beat
three chips reading 94%.

**Budget: ONE text chip per shot**, parked in a horizontal band nothing else occupies. Reel 82's two
centred chips were landing on the crew's helmets — the fix was moving the crew to the frame edges so
text and figures never share horizontal space, not shrinking the text.

**"Not detailed enough" is measurable.** Render the still and count distinct objects. Under ~8 reads
as a diagram. The approved ninja scenes sit at **12 to 18**.

Reference implementation: `video/src/MissionWorld.tsx`. See also [[reel-draw-dont-stack]],
[[reel-motion-hierarchy]], `REEL-BUILD-LEARNINGS.md` §3.
