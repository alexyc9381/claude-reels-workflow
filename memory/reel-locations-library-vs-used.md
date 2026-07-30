# ⛔⛔ A location LIBRARY is not location VARIETY — count the distinct ones

**Feedback (reel 82):** *"it doesn't flip through new scenes it's just them standing and the tv changes."*

`MissionWorld.tsx` shipped with **nine** locations. Then all six hook shots used **one** of them, the
control room, changing only what was on the screen. Having the sets built is not the same as cutting
between them, and I had already written the rule ([[reel-multishot-structure]]) before breaking it
with the library sitting right there.

**The check is mechanical, so run it before rendering:** list each shot's location component and take
`len(set(...))`. If that number is not close to the shot count, the sequence is *redressed*, not varied.
Six shots in one room scores as **one** location no matter how many props change.

**Each location also needs its own palette**, so every cut is a colour change as well as a place change:

> pale grey-blue (control room) → amber + smoke (launch) → violet (nebula) → teal (gas giant) →
> orange dust (rust world) → gold (ring world) → pale again

⛔⛔ **And it governs the BODY, not just the hook.** Reel 82 fixed the hook's locations in round 3
and came back in round 9 with *"they look like theyre on the ship... most of the scenes are just them
with a screen with waves on the wall."* **7 of the 9 body scenes were interiors**, two locations were
used twice back to back, and the median object count was 9 against a 12-18 target.

**Differently-named interiors are ONE location.** A plan bay, a creche bay, a test stand and a shake
bay are four names for "inside the ship". **The default for a body scene is EXTERIOR with the
character doing something physical in it** — walking, hauling, drilling, shimming, watching a thing
break. A screen on a wall is not an event.

Build one parameterized `Surface` (see `video/src/MissionSurfaces.tsx`) rather than nine bespoke
backdrops: it supplies sky, sun, three parallax ridge bands, ground and grit, which is 6-9 objects
before a single prop lands.

See `REEL-BUILD-LEARNINGS.md` §2 and [[reel-graphical-not-textual]].
