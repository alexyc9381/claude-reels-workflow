# lead-magnets/

## Purpose
⛔⛔ **AS OF 2026-08-18 THE `.docx` IS NOT A DELIVERABLE.** Alex: *"from now on i dont want
the docx files anymore just the articles on the site"*. What the CTA promises is a **live
article on chen.media**; the `.docx` built here is now only the site's build input
and its gated download. Never ship one to Drive. See memory
`feedback_reel_deliverable_is_the_article`.

The **source specs** for each reel's guide — the thing the CTA promises ("comment BORIS and
I'll send you the guide"). One plain-text spec per reel, so a magnet can be rebuilt or edited without
reverse-engineering a Word file.

Before this existed, every magnet was produced by a throwaway build script in a scratchpad, which
meant the next reel started from nothing. See [`../memory/reel-lead-magnet-builder.md`](../memory/reel-lead-magnet-builder.md).

## Required final delivery check (OFFICE 164, September 22, 2026)

The OFFICE reel was delivered without its article. A video and caption alone do not complete the post. Before declaring a faceless reel delivered:

1. Find or publish the matching article on **https://chen.media**. Search by keyword and topic first to avoid duplicates. Fulfill the CTA with official links, verified setup requirements and useful instructions or copyable material.
2. Verify the live article returns HTTP 200, shows the correct title/content and is discoverable under its keyword. A local draft or successful Git push is not live verification. Preserve the site's email gate.
3. Save **Article-link.txt** with the live URL, title and keyword in the same canonical Drive folder as the final reel and caption. Verify the cloud file by readback or matching hash.
4. Ensure the caption's opening and repeated CTA promise that actual article. Do not substitute bare app links because article creation was skipped. If publication is blocked, report the missing deliverable explicitly.

The site repository is https://github.com/alexyc9381/chenmedialabs. Use a clean checkout; do not deploy unrelated dirty changes. Current native article sources use `source-docs/<slug>.json`, a `format: article-json` manifest entry and an internal site DOCX download. Build content, check coverage, typecheck and production-build before publication. **The DOCX stays internal to the site; do not upload it to Drive.**

OFFICE article: https://chen.media/guides/give-ai-agents-an-office-the-delegation

## Start here

**OC article and caption reference.**

[150 OC article text](150-oc-article.md) records the published article, including copyable command blocks. Its canonical publishing source lives in the chenmedialabs repo, not in this folder's plain-text builder. [150 OC caption](150-oc-caption.txt) is the corrected comment-first post copy. See the [revision log](../memory/reels/oc-factory-log.md) for the live article and verified Drive links.

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
