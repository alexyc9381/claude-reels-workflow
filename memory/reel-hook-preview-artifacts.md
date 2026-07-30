# ⛔ Label the preview artifacts, or the review round is spent on non-defects

A **standalone hook composition** is not a small reel. Three things are wrong with it *by
construction*, and all three got reported as bugs on reel 82:

| the reviewer sees | why | say this |
|---|---|---|
| captions are four repeated words / gibberish | real caption data needs the VO, so the solo comp renders a hardcoded placeholder | "captions are placeholder" |
| the retention rail races to full in ~5s | `ProgressBar` sweeps across the **composition's** duration, and a hook comp is ~170 frames | "the rail is comp-length; the ROOT owns it in the assembly" |
| there is no audio at all | VO and bed are wired at the assembly level, under `AssemblyCtx` | "the hook comp is silent by design" |

Every one of those observations was **correct**. The failure was mine, for sending a preview without
the caveat line. Attach it every time you send a hook alone.

See [[caption-sync-gate]], `REEL-BUILD-LEARNINGS.md` §9.
