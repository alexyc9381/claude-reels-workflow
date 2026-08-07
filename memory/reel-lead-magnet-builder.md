# Lead-magnet .docx builder — `tools/make_lead_magnet.py`

The reel-81 lead magnet was built by an ad-hoc OOXML writer that lived in a scratchpad and was gone
by reel 82. It is now a repo tool. **Zero dependencies** — writes the OOXML package directly, so it
runs on a stock `python3` with no `python-docx` (which is NOT installed on this machine).

```bash
python3 tools/make_lead_magnet.py SPEC.txt "BORIS - The 3 Things 99 Percent Get Wrong.docx"
```

Spec is one directive per line: `TITLE` · `SUB` · `H` · `P` · `B` (bullet) · `NUM` (auto-counted per
heading) · `QUOTE` · `RULE` · `KEY` (the reel keyword line).

**It fails hard, not warns, on the two house rules that have shipped wrong before:**
- any em-dash → exit 1 ([[feedback-no-em-dashes]])
- "Powered by Matchtern" → exit 1 (reel magnets are the OWN-channel case, opposite of collegeresultslist)
- no `KEY` line → exit 1, the keyword must be in the doc

**General rule: if you write a generator twice, it belongs in `tools/`.**
