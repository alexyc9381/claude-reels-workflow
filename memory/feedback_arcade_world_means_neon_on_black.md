---
name: feedback_arcade_world_means_neon_on_black
description: "⛔⛔⛔ STANDING: choosing a screen/tech/arcade/night-street WORLD is itself the bug that produces neon-on-black. The matte-palette rule names this trap by name and reel 124 walked into it anyway."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 2a75e6f9-7ea7-45ea-b8c7-8e10cba8cd1e
  modified: 2026-08-31T20:27:50.239Z
---

⛔⛔⛔ Alex on reel 124: *"the animations are covering the screen recording and the colors etc
throughout here are not good."*

[[feedback_reel_matte_palette]] has said since reel 46 that **neon-on-black is the #1 "looks
coded" tell**, and it names the cause outright:

> *"building a 'screen'/'tech'/'arcade' world pulls me toward neon-on-black by default. Treat
> that instinct as the bug."*

Reel 124's world was called **THE ARCADE**. Every palette was a dark navy/near-black ground with
electric teal, violet, plum, mint and lime accents, and then a global `saturate(1.48)` on top of
that to chase a saturation number. It passed every gate.

## ⭐⭐⭐ THE WORLD NAME IS THE EARLY WARNING

The palette failure was decided at the storyboard, not at the paint. Arcade, night street, lab,
server room, control room, cyber-anything: each one *is* a request for glowing accents on black,
and no amount of later colour correction rescues it. **When the world you picked is one of those,
either pick another or commit up front to painting it as a warm interior** — plaster, wood,
carpet, brass, canvas, iron.

The repaint that fixed it kept the sets and changed the register entirely: `#4A4436` plaster,
`#8A6242` wood, `#7A4A3E` carpet, slate `#3E4E5C`, with accents drawn only from the house list
(CLAY, GOLD, GREEN, RED, SKY) and pink/purple desaturated to `#C4708E` / `#6B5A8E`.

## ⛔ AND A SATURATION NUMBER IS NOT A COLOUR GOAL

`BODY_SAT` went 57.8% → 67.2% by cranking `saturate()`, which read as *worse* because the hues
underneath were wrong. After the matte repaint it sits at **55.9%** and looks far better. **The
gate says "is there colour in the frame", not "is the colour any good."** Never chase it with a
filter; fix the paints.

## ⛔⛔ NEVER PUT DRAWN ART ON TOP OF REAL FOOTAGE

The other half of the same note. Reel 124 stacked five drawn page-parts with the real screen
recording as the BACK plane, so the one genuinely valuable asset in the frame was covered for the
whole scene.

⭐ **THE FIX IS STRUCTURAL, NOT A TUNING.** "Flush at rest, clear when open" still overlaps at
every intermediate value. Put every drawn part at a **z BELOW the capture**, starting hidden
behind it, and let them emerge from behind its edges. Then it is impossible for one to cross the
footage on any frame, and the reveal is better than sliding rectangles over a picture.

⛔ Related: screens must be **LIGHT** (matte rule 4). A dark browser chrome on a near-black bezel
is neon-on-black in its most literal form; paper chrome in a wood bezel is the house look.

The self-check, run before every render — both must return 0:

```bash
grep -c "box[Ss]hadow[^,]*0 0 [0-9]*px" src/<reel>*.tsx      # coloured glow
grep -c "background: hexa([^,]*, 0\.[0-4]"  src/<reel>*.tsx  # washed fills
```

Related: [[web124-reel]] · [[feedback_reel_matte_palette]] · [[feedback_real_product_footage]] ·
[[feedback_reel_house_chassis]].
