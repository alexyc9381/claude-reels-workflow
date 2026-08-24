# 120 · UNLAZY — factory log

**Delivered** 2026-08-22, then rebuilt across seven review rounds through 2026-08-24 ·
`Faceless/120 - UNLAZY/` (3 cuts + 3 captions, no docx)
**Subject** `github.com/Leonxlnx/unlazy`, ★973, MIT — Claude must PROVE "done" against a
`GATES.md` ledger. Verbatim: *"You do not promise you are done. You prove it against a ledger."*
**Board** `storyboards/120-unlazy.md` · **Code** `video/src/ClaudeUnlazyReel.tsx` +
`UnlazyWorld` / `UnlazyScenes` / `UnlazyHooks` / `unlazy-120-index`
**Article** LIVE at `chenmedialabs.com/guides/the-free-skill-that-stops-claude-saying-done-when-it-is-not`

**THE SIGN-OFF LINE** — a municipal workshop where a task is a station, "done" is a claim, and
proof is a gate that runs a real check. Villain **THE SKIPPER**, a Claude who vaults the row.

| gate | result (hall / amber / steel) |
|---|---|
| motion median | **10.13** · **0 / 11 scenes failing** |
| weakest scene, by name | **S6 THE PROOF 6.48** — was **4.90 on the delivered cut** |
| HOOK_LUMA | 141.2 / 143.6 / 147.9 (bar 140, frame 0 only) |
| BODY_SAT · BODY_BLACK p10 | 63 / 66 / 65 % · 30.0 / 25.4 / 16.5 |
| verify_reel | 7 / 7 |
| dHash across 3 cuts | mean 22.4 · **MIN 14** |
| sfx | clean · **74 cues, 2.10/sec** (above the 1.0-1.5 ceiling, requested) |
| hook_open_gate | PASS · 9.46 / 10.31 / 8.91 |

---

## The seven rounds, and what each one actually taught

### 1 · The hook took three rounds and only VIDEO settled it
Five candidates as stills → *"these all suck... just squares shapes sort of thing"*. Rebuilt →
*"let me see just the hook scenes for these"* → picked on sight. ⭐ **Show hook candidates as
rendered VIDEO, not contact sheets.** A still cannot show whether an idea moves.
⛔ One candidate was reel 110 FLOW's barbell with new plates — *"dont just directly copy the
other vidoe hook ideas"*. **Take the GRAMMAR, never the OBJECT.**

### 2 · The Pinocchio nose: three bugs, all about ATTACHMENT
- *"the nose isnt on his face correctly"* — I had guessed the rig. `Mascot` is a 200-unit
  viewBox with the face rect at `x=34 y=44 w=132 h=102`, so the face centre is
  `centre, base − 0.505·size`. **Read the rig, never estimate it.**
- *"the nose stays in place while the claude guy rocks"* — `Hero` puts every offset on its own
  transformed div, and the nose was a SIBLING. Added a `face` slot rendered INSIDE that div, in
  mascot-local coords. Anything welded to a character has to live there.
- My own verification was wrong before the fix was: an oak-colour detector matched the tan
  wainscot and reported the nose pinned at x=758 every frame. **A colour probe is not a
  position probe.**

### 3 · "Too boring at the end" was a TRANSCRIPT problem
*"near the end of 3 seconds after the balloon pops, its too boring."* The VO under those exact
frames is **"and lying to you about it"** (f68 / f76 / f85 / f93) — the point of the whole hook,
with a static sprite under it. ⭐ **When a stretch reads as boring, look up the WORDS under it
before inventing a beat.** The script usually names the beat already.

### 4 · Six "boring" notes, ONE cause
Alex returned six timestamps in one message. Laying all six frame strips side by side showed
the real defect in one look: **S3, S5, S6, S8, S9 and S10 were all built around the same grey
`LampBank` slab.** Half the reel was one rectangle in a different room.
→ [[one-prop-five-scenes]]

### 5 · S1 was rejected TWICE for the same reason
A rotating text card, then a cast plate riveted on. Both made the WORDS the subject and only
changed the substrate. → [[dressing-the-words-is-not-a-rebuild]]

### 6 · Three plateau bugs, one family
The press ram, the lever, the burst debris and the scan head all settled at a value and stayed.
→ [[authored-motion-needs-its-own-driver]]

### 7 · The three cuts were one shot regraded
dHash 26.2 / MIN 16 — nearly double the bar — and they still looked identical.
→ [[dhash-passes-while-cuts-are-identical]]

---

## ⛔⛔ Delivery findings worth more than the reel

- **TWO LIVE ARTICLES WERE NEVER COMMITTED.** `chenmedialabs` had reels 119 (OX) and 120 live on
  the domain with `guides.json`, `manifest.json` and four docx **uncommitted** — they existed
  only in the deployed build and one working tree, and `git log` still ended at reel 116. A
  deploy from a clean checkout would have dropped both. ⭐ **Check `git status` in the site repo
  at delivery, not just the URL.** A 200 proves the deploy landed; it says nothing about whether
  the source survived. (The inverse of reel 117's *"an UNCOMMITTED guide 404s"* — here it did
  not 404, which is worse, because nothing surfaced it.)
- **`tools/build_repo_index.py --check` was STALE at delivery.** Run it as part of shipping.
- **The reel number was claimed mid-build.** `119 - OX` was delivered by a different session at
  16:59 while this one was rendering. ⭐ Re-check the next free number AT DELIVERY, not only at
  kickoff.
- **Amber's black point is the gate this reel kept losing.** It failed HOOK_LUMA three times,
  was fixed with `brightness(1.082)`, and that brightness then failed BODY_BLACK at p10 35.5.
  ⭐ Both are the same lesson from opposite ends: **take amber's separation from CONTRAST, never
  brightness** — contrast pivots at mid-grey, so it lifts frame 0 AND drops the shadows.
- **The E1 encode costs 1.3-2.4 luma.** Gate the ENCODED file; a PNG at 141 lands under 140.

## The A/B hook set it shipped with
One concept per cut, IDENTICAL beats (`A 42 · B 54 · POP 68 · C 76 · D 85 · HIT 90 · JAM 93`),
same set, same nose / red flush / ear steam / column jam — so the per-reel SFX bank lands on
every event without a per-cut copy and the only variable is the object.

| cut | hook | the claim | the failure |
|---|---|---|---|
| hall | BALLOON | green `DONE` balloon | the nose punctures it |
| amber | BALLOON | **red** `DONE` balloon | the nose punctures it |
| steel | FILL COLUMN | a graduated column fills to `DONE` | the base splits, it drains |

⛔ I argued against the red balloon (green IS the false pass) and Alex asked for it anyway —
his call. ⭐ The risk I checked: `dhash_cuts` reads GEOMETRY, and hall/amber now run the same
concept at the same size in the same place. It came in at **15 at the f44 sample**, so the pan
plus red-vs-green luma carried it. Worth re-checking on any future colour-only variant.
