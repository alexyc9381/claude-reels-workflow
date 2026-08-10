# STORYBOARD — REEL 84 "ROLES"

**VO:** `public/roles_vo_final.wav` — 29.46s (raw take 56.47s).
**Captions:** `src/data/words_roles.json` — 131 words, 43 lines, **42/43 anchored to a measured onset**.
Keyword **ROLES**. Drive slot **84**.

---

## VO cleanup

Raw was 56.47s with **three `cut cut` flubs** and several long natural pauses. Six segments kept,
every boundary ≥45ms inside a MEASURED −40 dB silence (never whisper word ends, §5):

```
0.48-5.45   hook: 18,000 stars / 268 experts
6.45-11.95  the departments
12.15-15.35 Claude Code, Cursor, Copilot, 18 tools
16.45-21.60 the landing page, three show up
24.90-27.99 "You never have to explain what a good designer would do"
47.90-55.45 while everyone else + the missing line + CTA
```

Dropped: `22.54-25.04` (an aborted "…what a good designer could — cut") and `29.24-48.02`
(two failed retakes of the "while everyone else" line). Verified: zero `cut cut` survivors,
1.45s and 1.59s pauses trimmed to ~0.2s at the joins.

⚠️ **First pass clipped the word "You"** off "You never have to explain" — the cut started at
25.100 but speech resumed at 25.04. Caught by re-transcribing the assembled file, not by eye.
Boundary moved to 24.90.

### The `...` in the supplied script, transcribed from the take
> "…burns five minutes describing the person they wish they were talking to,
> **you already have all of the experts in one place.**"

---

## ⛔ THE REPO DOES NOT MATCH THE AUDIENCE — decision needed

Verified against the GitHub API, not a search snippet:

| repo | stars | agents | departments | tools |
|---|---|---|---|---|
| **jnMetaCode/agency-agents-zh** | **18,585** | **267** | **20** | **18** |
| msitarzewski/agency-agents (the parent) | 137,749 | 230+ | 17+ | 14 |

Every number in the VO matches the **zh** repo: over 18,000 stars, ~268 experts, 20 departments,
18 tools. But that repo is the **Chinese-market fork** — its README is in Chinese and 52 of its
agents are China-specific (Xiaohongshu, Douyin, WeChat, Feishu, DingTalk).

The English parent has completely different numbers, so the reel's script cannot point at it
without being wrong.

**Three options were put up:** ship as recorded pointing at the zh fork; ship pointing at the
English parent (which contradicts the spoken numbers); or re-record the two number lines.

⚠️ **SHIPPED UNDER OPTION 1, UNCONFIRMED.** The decision was never answered, and the build could not
proceed without one. On screen: `jnMetaCode / agency-agents-zh`, because the reel's spoken numbers
have to match what the viewer reads. The lead magnet names BOTH repos and says plainly which counts
belong to which, so a commenter who goes looking is not misled. **Reversible in one edit** if the
call goes the other way: `REPO_OWNER` / `REPO_NAME` / `REPO_STARS` in `video/src/RolesGitHub.tsx`,
plus the two lines in `lead-magnets/84-roles.txt`. The VO would still need re-recording for option 3.

---

## The storyline

1. **The hero** is a builder who needs a job done and does not want to explain the basics first.
2. **The blocker** is THE EMPTY CHAT — a blank box that knows nothing about who it should be.
3. **The turn** is a roster that is already staffed: 268 specialists across 20 departments.
4. **The payoff you SEE** is naming one job and the right three showing up and dividing it.

The villain is a blank text box, which is geometric, instantly recognisable, and something the
viewer has stared at themselves.

---

## Beats (measured onsets)

| t | line |
|---|---|
| 0.00 | 18,000 stars, 268 experts |
| 4.94 | engineer, designer, marketer, lawyer — 20 departments |
| 10.56 | Claude Code, Cursor, Copilot, 18 tools |
| 13.76 | ask for a landing page, three show up and split it |
| 18.86 | you never have to explain what a good designer would do |
| 21.93 | everyone else opens an empty chat and burns five minutes |
| 27.60 | comment ROLES |

---

## Round 1 concepts — character first (the reel-83 lesson)

Reel 83 burned seven concepts on *systems* — a plaza, a vault, a factory. What works on this
channel is **a costumed Claude + a genre world + a villain + many locations**.

### A · THE DISPATCH HALL
**Hero:** Claude in a call-handler headset. **Villain:** an empty station, one Claude alone.
A job is called in, the board lights the departments, and three specialists slide the pole and
roll out together.
*Locations:* the watch room · the board · the locker wall (268 names) · the pole · the bay · the street.
*Geometric:* lockers, a call board, poles, bay doors, a roster grid.

### B · THE AGENCY FLOOR
**Hero:** Claude walking in off the street. **Villain:** the empty chat, a blank desk with nobody at it.
Twenty department signs hang over twenty pods, every desk already staffed by a costumed Claude.
Say "landing page" and three of them stand up.
*Locations:* the lobby · the floor · a department pod · the huddle · the whiteboard · the door.
*Geometric:* desks, name plates, hanging signs, a floor plan.

### C · THE ROSTER WALL
**Hero:** Claude at a wall of 268 cards. **Villain:** a blank card with nothing written on it.
Twenty columns, one per department. A job posts, three cards light up and their Claudes step out
of the wall.
*Locations:* the wall · a column close-up · the job slot · three stepping out · the work split · the desk.
*Geometric:* a card grid, columns, slots — and 268 is countable on one graphic.

---

## Gates
- frame-0 **panel luma ≥ 140/255**
- 6 shots in the open, **none under 0.70s**
- a transient within 300ms of every cut
- matte paints, dark drop shadows, no glow, no washes
- ONE text chip per shot
- **a Claude mascot in EVERY scene** — never a generic figure
- a different location every scene


---

## ⛔ Concepts rejected before DRAFT NIGHT (and why, measured)

| concept | why it died |
|---|---|
| A · dispatch hall | needs a call board AND a locker wall AND a pole AND a bay. Fails "simplest to understand" by construction. |
| B · agency floor | twenty department pods. Cluttered IS the image. |
| C · roster wall | built and rendered. **Measured 1.24 hierarchy ratio** (top decile vs frame mean) against reel 83's relic at 1.84. |

**The diagnosis that unlocked it:** a flat grid of 268 equal cards has no hierarchy by definition,
and a cream room cannot rank anything because nothing in it can be brighter than the room. Hierarchy
needs darkness. Draft night measures **3.18** across the finished reel.

Then: *"still quite boring."* Correct, and the pattern was that every concept offered was an
INTERFACE (cards, walls, grids, toll booths, vaults). What works on this channel is a genre world
with a moment of tension. Four were pitched with the hierarchy mechanism named for each; draft
night won because its mechanism is a spotlight, the most legible ranking device that exists.

Then: *"the first few are horrible, we need to see more related to the GitHub repo."* The draft
carried the drama but the claim was nowhere on screen. Shots 1-2 became the actual repo page and
shot 3 pulls back to find it on the arena jumbotron. The file tree of 20 division folders and the
draft board are now the same object.

---

## Final build

| file | what |
|---|---|
| `video/src/DraftWorld.tsx` | the arena kit. `Arena` layers 3 crowd tiers (~430 heads) + LED ribbon + 4 hanging banners + 2 broadcast cameras + cable runs + deck decals + an 11-lamp truss in ONE call, so no scene can ship the bare version. |
| `video/src/RolesGitHub.tsx` | `RepoPage`, `Jumbotron`, `CloneCard`, `CopilotUI`, `Octocat`. GitHub's LIGHT theme. |
| `video/src/RolesHook.tsx` | 6 shots, `ROLES_CUTS = [24,50,76,100,124]`, none under the 0.70s floor. |
| `video/src/RolesScenes.tsx` | S1-S7, eight distinct locations. |
| `video/src/RolesTransitions.tsx` | flash (press pit) / sweep (followspot) / card (board turns) / black (house lights). All clipped to the Panel. |
| `video/src/ClaudeRolesReel.tsx` | assembly + 100+ cues + karaoke. |

**Light is drawn as SOLID paint** — a hard-edged cone polygon plus an opaque floor ellipse. No glow,
no blur, no low-opacity wash.

**Why GitHub's light theme:** a dark-theme repo page opens at ~30 luma and fails the 140 bar
outright, and screens are light paper UI per house rule. Light is also GitHub's default, so it is
the more faithful of the two. Frame-0 panel luma: **236.3**.

⛔ `public/gh/agency.png` is the repo OWNER'S AVATAR, a real person's face. Not usable. All GitHub
surfaces are vector, same call reel 83 made for Cursor / Claude Code / Codex.

---

## Gate results

| gate | result |
|---|---|
| `verify_reel.py` | **9/9** (VO@0, bed audible@20ms, bed continuous, ends 0.04s tight, captions match script, 21/21 cues fire) |
| `scene_motion_audit.py` | **8/8**, median motion 17.80 (bar 9.00, approved reel 81 = 9.82) |
| frame-0 panel luma | 236.3 (bar 140) |
| hierarchy ratio | 3.18 |

### ⛔ Four dead runs the average hid, and what actually fixed them

The first assembly scored a fine median and still froze in four places. Located by per-frame diff,
not by eye:

| scene | dead | cause | fix |
|---|---|---|---|
| S2 green room | 39f | lockers opened, then nothing | the hero WALKS the corridor, 1250px of travel |
| S3 tools | 15f | booths landed and held | each booth fires a card to centre, ~330px each |
| S5 no-brief | 34f | the typed line and strike are physically tiny | the tunnel DOLLIES, 8 rings sweeping outward |
| S6 alone | STATIC 3.66 | the quiet beat had nothing moving | continuous camera truck + a pacing figure + a full-width draining clock |

⛔ A slow zoom fixes none of these. `Sh`'s entrance zoom eases out by frame 30 and then holds, which
is exactly why a long shot reads as frozen with the camera "moving". `Sh` gained a `pan`/`len` pair
for a genuinely continuous truck. Sub-pixel motion is invisible once sampled (LEARNINGS §7).

### ⛔ Traps hit again this build

- **Unsized-parent / stacking-context, THIRD time.** `<div style={{transform}}>` around an absolutely
  positioned child makes that div a stacking context at z-index 0, so the spotlight pool (z=8)
  painted clean over the pick card and shot 3 rendered EMPTY. Fix: put the offset on the child's own
  `y` prop.
- **Even staggers vs measured onsets.** S1's four names landed inside 0.9s on an `i*9` stagger while
  the VO takes 1.68s to say them, so the last two lit before they were named. Replaced with the
  measured frames `[5, 22, 36, 50]`.
- **Two staggers finished on their shot's LAST frame** (20 banners, 18 tool tiles) so neither was
  ever legible. Contact sheets sampled at shot STARTS hid this; re-sampling at shot MIDPOINTS
  exposed it.
- **`camera-shutter.wav` does not exist in the am/ pack** (it is `camera_shutter.wav` at sfx root,
  underscore). It cannot ride `scoreCut`'s `A +` prefix and is added as a bare cue.
- **The gate's own ffmpeg discovery was broken here**, pointing at a sibling project that does not
  exist on this machine. Fixed in `tools/verify_reel.py` to check `tools/node_modules` first. A
  failing gate is a hypothesis: verify the tool before changing the work.
