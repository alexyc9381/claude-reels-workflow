# ⛔⛔⛔ Six "boring" notes can have ONE cause — strip them side by side first

Reel 120, in a single message: *"at 5 seconds its too much of a text animation... at 11 second
that animation needs to be redone... at 14 seconds needs to be redone... at 18 seconds needs to
be redone... at 27 seconds needs to be bigger... animation at 30 seconds needs to be redone."*

Six timestamps reads as six scene failures. It was not. Pulling a **six-frame strip per flagged
scene and laying them next to each other** showed the defect in one look: **S3, S5, S6, S8, S9
and S10 were all built around the same grey `LampBank` / `GatePane` slab.** Half the reel was one
rectangle in a different room. No single scene was wrong enough to notice on its own; the
repetition was.

⭐ **A SCENE NEEDS ITS OWN HERO OBJECT.** The rebuild gave each one a thing nothing else in the
reel has — a riveted maker's plate, a dropped crate, a slam gate, a rack erected from parts, a
queue at 250px, nine agents falling in. The shared board survives in exactly two scenes.

## ⛔ The motion audit will fight you on this

Two of the six went DOWN when they got better:

| scene | motion | HOLD |
|---|---|---|
| S1 text card → riveted plate | **10.54 → 8.65** | 61% → 35% |
| S3 slab descends → crate dropped | 9.51 → 9.61 | 62% → **29%** |
| S4 | 8.84 → 9.08 | 75% → 38% |
| S5 | 7.50 → 8.40 | 74% → 40% |
| S8 | 10.85 → **12.76** | 73% → 55% |
| S9 | 10.15 → **11.48** | 83% → **28%** |

S1's 10.54 was **a text card rotating on a prism** — a large slab sweeping is exactly what the
audit pays for, and it was the first shot Alex called out. ⭐ **When the note is "boring", read
HOLD, not MOTION.** Hold is the share of the scene that is not changing, and it fell on all six.

## ⭐⭐ The VO's VERB names the fix, every time

Each rebuild came straight off the line under it:
- *"**dropped** a fix"* → a crate that falls, slams, and bursts open
- *"it **stops** AI... by **forcing** it"* → a wall he hits flat, then a hook that hauls him back.
  v1 drew only the first verb, which is why the scene died after 0.6s of its 3.2
- *"**builds** a ledger"* → a rack erected from uprights, rails and slots, not a finished board

## ⛔ Two staging failures worth keeping

- **A barrier you can walk round does not read as "stopped."** A 356px gate mid-room read as a
  cabinet, and the sprite's run ended at a point *inside* it. The gate has to fill everything
  past its near face.
- **Ten of anything narrow is a FENCE.** Ten 80px roller shutters at 82px pitch rendered as a
  striped grey wall; widening the piers and lighting the openings did not help, because the
  defect was the silhouette. Nine Claudes **falling 620px into the bays** said "ten in parallel"
  instantly — sprites are the biggest lever and are never mistaken for wallpaper.

Related: [`docs/ANIMATION-QUALITY.md`](../docs/ANIMATION-QUALITY.md) ·
[[reels/unlazy-factory-log]]
