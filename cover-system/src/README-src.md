# src/ - the working Remotion source

These are the real files that produced all 23 shipped covers, copied verbatim from
`matchtern-longform/video/src/` on 2026-07-19. They are here so this system is
replicable rather than merely readable.

## What is in each file

| File | Contains |
|---|---|
| `ReelCovers.tsx` | **The chassis.** `SceneCover` and `Giant` (the locked header slot), `cropProof`, `SunSvg`, `BurstSvg`, plus the scenes for 52 BALL, 51 SKILLS and HERMES. Also the dark-variant `Cover52B`, kept as the rejected direction. |
| `ReelCovers3.tsx` | 7 scenes: OS, TAKES, CAROUSEL, DESIGN, CALLBACK, PURGE, PLUGINS. Imports `SceneCover` from `ReelCovers.tsx`. |
| `ReelCovers4.tsx` | 13 scenes: POWERS, EVOLVE, STACK, ARENA, VAULT, MINT, CREW, BLUEPRINT, CLONE, WORTHY, ATTACK, FACTORY, SOL. Also imports `SceneCover`. |
| `fonts.ts` | Fraunces + Inter loaded via `@remotion/google-fonts`. |

## The one rule that matters most here

**`SceneCover` is IMPORTED, never duplicated.** Three cover files share one definition
of where the headline sits. That is the entire consistency guarantee, and it survived
two sessions editing the same project concurrently.

If you copy `SceneCover` into a second file "just for this one cover", the slot will
drift and the set stops looking like a set. The client raised header consistency twice.

## Dependencies these files expect

They are not standalone. They import from two files that live in the parent project:

```ts
import { fraunces, inter } from "./fonts";                       // included here
import { CLAY, INK, mono, seed, Bloom, Dust, CreamBg, PaperGrain,
         CrewCard, Mascot as HouseMascot } from "./CarouselConcepts";
import { Mascot as PkMascot } from "./ClaudePokeballReel";
```

- **`CarouselConcepts.tsx`** - the house palette, atmosphere helpers (`Bloom`, `Dust`,
  `CreamBg`, `PaperGrain`), and the `Mascot` component with 16 costumes.
- **`ClaudePokeballReel.tsx`** - a second `Mascot` with a different costume set.

To run this elsewhere you need those two files, or you need to stub the handful of
symbols above. The palette constants and `seed` are trivial to reproduce; the two
`Mascot` components are the real dependency.

### The two mascots have DIFFERENT costume sets

This is a real trap. `constr` on `PkMascot` will not compile.

| | Costumes |
|---|---|
| `PkMascot` (ClaudePokeballReel) | `mario`, `trainer`, `brainHat`, `judge`, `beard`, `run`, `jump`, `rainbow` |
| `HouseMascot` (CarouselConcepts) | `suit`, `constr`, `chef`, `neo`, `crown`, `grad_`, `ironman`, `pirate`, `greek`, `spy`, `tux`, `wolf` |
| both | `glasses`, `wizard`, `sherlock`, `cop` |

Shared numeric props: `lf`, `size`, `gaze`, `cheer`, `stern`, `shock`.

`rainbow` drives body hue off `lf` as `hue = (lf * 15) % 360`, so **`lf={18} rainbow={1}`
renders a violet Claude** (270 degrees). That is how the POWERS hero is coloured; no
`hue-rotate` filter needed.

## Registering a composition

`Root.tsx` in the parent project has no `<Still>`; stills are 2-frame compositions.
Covers are registered through a tuple array so a new one is a one-line change:

```tsx
import { CoverPowers, CoverAttack /* ... */ } from "./ReelCovers4";

const reelCovers: [string, React.FC][] = [
  ["CoverPowers", CoverPowers],
  ["CoverAttack", CoverAttack],
  // ...
];

// inside the returned fragment:
{reelCovers.map(([id, Comp]) => (
  <Composition key={id} id={id} component={Comp}
    durationInFrames={2} fps={30} width={1080} height={1920} />
))}
```

## Rendering

```bash
cd <project>/video
npx remotion still src/index.ts CoverPowers /abs/path/POWERS_cover.png \
  --frame=0 --public-dir=/tmp/empty-dir
```

`--public-dir` pointing at an empty directory takes a render from **~90s to 5.5s**,
because the project's real `public/` is 845MB and Remotion copies it into the bundle
on every single render. These covers reference no `staticFile()` assets, so the empty
directory is safe. Output verified byte-identical (max pixel diff 0).

Two things that will bite you:

- **Always use an absolute output path**, or `cd` into the video root first. A `cd`
  earlier in the same shell leaves the cwd elsewhere and the render silently writes to
  `src/out/...` while you inspect the stale file and conclude nothing changed. This has
  cost a full debugging cycle three times.
- **`npx tsc` is a decoy on this machine** and exits 0 without checking anything. The
  only real validation gate is RENDERING. Remotion surfaces undefined references as
  per-frame errors at render time.

## Adding a new cover

1. Write the scene as `const FooScene: React.FC = () => (<>...</>)` in `ReelCovers4.tsx`
   (or a new `ReelCovers5.tsx` that imports `SceneCover`).
2. Export the cover:

```tsx
export const CoverFoo: React.FC = () => (
  <SceneCover
    scene={<FooScene />}
    line1={<>SETUP LINE WITH AN <span style={{ color: CLAY }}>ACCENT</span></>}
    giant={<>PAYOFF</>}
    // giantSize={103}   // only if the measured margin is under 110px
  />
);
```

3. Register it in `Root.tsx`, render, then run `tools/verify_cover.py` on the PNG.
4. If `giant margins` fails, set `giantSize = 158 * 840 / measured_width` and re-render.

See `../03-SCENE-CONTRACT.md` for the full authoring rules and `../04-VERIFICATION.md`
for what each check catches.

---
keywords: remotion source, SceneCover, Giant, header slot, mascot costumes, PkMascot,
HouseMascot, rainbow violet, register composition, public-dir render speed, cover setup
