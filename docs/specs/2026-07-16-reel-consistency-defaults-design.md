# Reel consistency — the defaults fix (design)

**Date:** 2026-07-16
**Status:** awaiting Alex sign-off
**Problem:** reel visual quality is wildly inconsistent — "some unbelievably good, others horrible."

## Diagnosis (verified, n=24)

The complaint is *variance*, so the cause must be a *variable*. Five plausible causes
(no shared kit, unenforced gates, no analytics ground-truth, rule overload, self-certification)
were each refuted 3/3 by adversarial critics: all are **constants** — present equally in the
good reels and the bad — so none can explain variance. The real mechanism, derived from the
measurements and re-verified on disk:

> **Every quality floor enforced by a function signature passes. Every floor enforced by memory random-walks.**

The proof is a natural experiment with a control:

| Floor | Enforced by | Passes | Range |
|---|---|---|---|
| Motion easing | `over(f,s,d, ease = Easing.out(cubic))` — a **default param** | **23 / 24** | — |
| Alive backgrounds | (floor set at 3, min observed 4) | 24 / 24 | 4→46 — *floor too low to bind* |
| Sprite outfits | remembering `sherlock={1}` | 16 / 24 | 0→100% bare |
| Pop-culture | remembering `<PCProp/>` | 9 / 24 | 0→31 |
| Matte colour | hand-typed `boxShadow` string (no helper exists in 78 files) | **4 / 24** | 2→99 (50×) |

- **Control:** `ClaudeGlmReel.tsx` is cloned from a lineage whose `over()` has **no ease param**
  (`over = (f, sF, d=12)`). It calls linear `ramp()` 26× vs `over()` 13×, fails the motion floor
  (24 linear tweens), and is the **only** reel graded wireframe-grade. One dropped default parameter
  produced the worst reel.
- **Same mechanism, `Mascot`:** every costume flag defaults to `0`, so `<Mascot lf={lf}/>` renders
  a naked critter and is the *ergonomic* path. `ClaudeFactoryReel.tsx` — the chassis the rules
  mandate cloning — renders **4 of 6** sprites naked. `ClaudeSkills2Reel.tsx` renders **0 of 9**.
- **Not the cause (deprioritised):** more critic loops (DROP ran 9 → mid; CALLBACK is the only
  "clean gated ship" and was never built); extracting a shared kit (the library is already in-file
  and *never mounted* — MINT ships a 48-component library that is 100% dead code); dead-code cleanup
  (both premium reels carry 45–54 dead components). These raise the ceiling, not the floor.

## Aggravating factor

`reel-never-dual-screen.md` mandates cloning Factory/GptSol byte-identical. Those parents ship
**38–53 neon halos + ~65 dead components before scene one**. The `ProgressBar` chrome alone carries
7–15 halos into all 24 reels. Clone-verbatim is therefore not the disease — it is the **only
distribution mechanism**: fix the parent once, every future child inherits the fix for free. That
is exactly how `over()`'s eased default reached 23 files.

## The fix — four mechanical changes, ~1 day

### 1. Canonical chassis: `ClaudeSkills2Reel.tsx` → the parent every reel 53+ clones
Chosen because it is the only premium reel with a portable kit (15 scoped neon, **0 bare mascots**).
Three signature edits so the correct thing is the lazy thing:

```ts
// a. Matte depth as the ergonomic path — the over() of shadows.
const lift = (n = 1) =>
  `0 ${2*n}px ${6*n}px rgba(20,16,12,0.28), 0 ${8*n}px ${22*n}px rgba(20,16,12,0.20)`;

// b. Diegetic glow must name a source and is counted; raw "0 0 Npx <color>" becomes lint-visible.
const glow = (c: string, r: number, source:'torch'|'coin'|'screen'|'reactor'|'seal') => `0 0 ${r}px ${c}`;

// c. Bare Mascot becomes a TYPE ERROR, not a memory failure. `costume:"none"` is the explicit escape.
type Costume = 'glasses'|'sherlock'|'wizard'|'judge'|'cop'|'mario'|'suit'|'chef'|/*…*/|'none';
const Mascot: React.FC<{ lf:number; costume: Costume; size?:number; /*…*/ }> = …
```

Then strip the 7–15 halos out of `ProgressBar`, replace with `lift()`.
**Migrate all 9 Skills2 `<Mascot>` call sites** from `sherlock={1}` → `costume="sherlock"`.
**Verify by rendering** Skills2 at half-res and diffing frames vs the current render (tsc is a decoy
on this box per PRODUCTION-LOOP.md — pixels are the only gate). Costumes must be byte-identical
on screen.

### 2. `tools/reel-floors.js` — the checker
Counts per reel: neon halos, bare vs dressed mascots, pop-culture items, scene count, median
animated layers. Prototype already runs all 24 reels in 0.125s and independently reproduced FLIP's
exact blocker (7/8 bare). **Counts file-wide, not scene-scoped** (Alex-approved): the inherited dead
clone payload counts against the score, so deleting it is the cheapest way to pass — dead code
solves itself with no rule about dead code.
- Budgets: `bareMascots == 0` (block); `neon ≤ 2 × sceneCount`; `popCulture ≥ sceneCount`;
  `medianLayers ≥ 4`.
- **Scope of blocking (Alex-approved):** existing reels (≤52) **warn**; the canonical chassis and
  reels **53+ block**. Every current reel fails file-wide neon today, so blocking all would stop
  tomorrow's ship.

### 3. Delivery hook — fires on the act of shipping, not on render
`~/.claude/settings.json` has **no `hooks` key** — surface is empty. Add `PreToolUse`/Bash →
`node tools/deliver-gate.js`. The gate reads the command from stdin; if it writes to
`~/Downloads/Claude-Reels-Final` **or** `~/Library/CloudStorage/GoogleDrive-alex@matchtern.org`,
it runs the floor check on the reel's `.tsx` and **exits 2** with the failures. Renders stay free
(they *should* be wireframes); delivering a wireframe becomes impossible.

### 4. git — done
`matchtern-longform/` initialised (was 7.1G untracked, `.bak_ov2` files as the only history).
`.gitignore` excludes renders/deps/media per the existing convention. Baseline committed; work
proceeds on branch `chassis-floors`.

## Floor vs ceiling (be clear-eyed)
This makes *horrible* structurally unavailable. It does **not** make a reel great. Pop-culture
*authoring* stays a judgment call — the one floor that is real creative work and can't be defaulted;
it's where the critic budget should go once neon and outfits stop consuming it.

## Out of scope
Backfilling reels ≤52 (sunk cost); extracting `components/` into a shared import (refactor, zero
floor impact — dead-in-file just becomes dead-as-import); analytics backfill.
