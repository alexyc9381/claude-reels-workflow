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

Same rule for the body scenes, not just the hook. See `REEL-BUILD-LEARNINGS.md` §2.
