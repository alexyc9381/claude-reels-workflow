# lead-magnets/

## Purpose
The **source specs** for each reel's giveaway `.docx` — the thing the CTA promises ("comment BORIS and
I'll send you the guide"). One plain-text spec per reel, so a magnet can be rebuilt or edited without
reverse-engineering a Word file.

Before this existed, every magnet was produced by a throwaway build script in a scratchpad, which
meant the next reel started from nothing. See [`../memory/reel-lead-magnet-builder.md`](../memory/reel-lead-magnet-builder.md).

## Start here
```bash
python3 ../tools/make_lead_magnet.py 82-boris.txt "BORIS - The 3 Things 99 Percent Get Wrong.docx"
```
Zero dependencies — the builder writes the OOXML package directly, because `python-docx` is not
installed on this Mac.

## Layout
`<reel-number>-<keyword>.txt` — one spec per reel, lowercase keyword.

## Conventions
One directive per line, blank lines ignored:

| directive | renders as |
|---|---|
| `TITLE` / `SUB` | the cover line and its subtitle |
| `H` | a section heading (resets `NUM` counting) |
| `P` / `B` / `NUM` | paragraph · bullet · auto-numbered bullet |
| `QUOTE` / `RULE` | indented pull quote · horizontal divider |
| `KEY` | the reel keyword line, centred, last |

## Gotchas
The builder **exits 1**, it does not warn, on:
- any em-dash or en-dash (house rule: no em-dashes anywhere)
- a "Powered by Matchtern" footer — reel magnets are the own-channel case, the opposite of the
  collegeresultslist rule
- a missing `KEY` line — the keyword has to be in the doc or the CTA does not close

All three have shipped wrong before, which is why they are gates rather than notes.

## Related
[`../tools/make_lead_magnet.py`](../tools/make_lead_magnet.py) ·
[`../memory/lead-magnet-docs.md`](../memory/lead-magnet-docs.md) (what has been built so far) ·
[`../REEL-BUILD-LEARNINGS.md`](../REEL-BUILD-LEARNINGS.md) §11 delivery
