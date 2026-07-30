#!/usr/bin/env python3
"""
Build a reel's lead-magnet .docx from a plain-text spec. Zero dependencies:
writes the OOXML package directly, so it runs on a stock python3 with no
`pip install python-docx`.

    python3 tools/make_lead_magnet.py SPEC.txt "OUT.docx"

SPEC format — one directive per line, blank lines ignored:

    TITLE   the big cover line
    SUB     the line under it
    H       a section heading
    P       a paragraph
    B       a bullet
    NUM     a numbered-looking bullet (renders as "1." etc, auto-counted per H)
    QUOTE   an indented pull quote
    RULE    a horizontal divider
    KEY     the reel keyword line (goes last, styled)

HOUSE RULES enforced here so they cannot be forgotten:
  * NO em-dashes anywhere (memory `feedback_no_em_dashes`) — the script asserts.
  * NO "Powered by Matchtern" footer in REEL lead magnets
    (memory `feedback_reel_docs_no_matchtern_footer`) — the script asserts.
Both are hard failures, not warnings, because both have shipped wrong before.
"""
import re, sys, zipfile
from pathlib import Path
from xml.sax.saxutils import escape

CT = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
<Default Extension="xml" ContentType="application/xml"/>
<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
<Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
</Types>"""

RELS = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>"""

DRELS = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>"""

STYLES = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
<w:docDefaults><w:rPrDefault><w:rPr>
<w:rFonts w:ascii="Inter" w:hAnsi="Inter" w:cs="Inter"/><w:sz w:val="22"/>
<w:color w:val="26211C"/></w:rPr></w:rPrDefault></w:docDefaults>
</w:styles>"""

INK, HOT, MUTE = "26211C", "C4432B", "6B625A"


def run(t, sz=22, b=0, c=INK, caps=0, sp=0):
    p = f'<w:sz w:val="{sz}"/><w:szCs w:val="{sz}"/><w:color w:val="{c}"/>'
    if b:
        p += "<w:b/>"
    if caps:
        p += "<w:caps/>"
    if sp:
        p += f'<w:spacing w:val="{sp}"/>'
    return f'<w:r><w:rPr>{p}</w:rPr><w:t xml:space="preserve">{escape(t)}</w:t></w:r>'


def para(inner, before=0, after=140, ind=0, align=None, rule=False):
    pr = f'<w:spacing w:before="{before}" w:after="{after}"/>'
    if ind:
        pr += f'<w:ind w:left="{ind}"/>'
    if align:
        pr += f'<w:jc w:val="{align}"/>'
    if rule:
        pr += ('<w:pBdr><w:bottom w:val="single" w:sz="6" w:space="6" '
               f'w:color="D9D2C8"/></w:pBdr>')
    return f"<w:p><w:pPr>{pr}</w:pPr>{inner}</w:p>"


def build(spec: str) -> str:
    body, n = [], 0
    for raw in spec.splitlines():
        line = raw.rstrip()
        if not line.strip():
            continue
        kind, _, text = line.partition(" ")
        text = text.strip()
        if kind == "TITLE":
            body.append(para(run(text, 56, 1), after=60))
        elif kind == "SUB":
            body.append(para(run(text, 24, 0, MUTE), after=320))
        elif kind == "H":
            n = 0
            body.append(para(run(text, 30, 1, HOT), before=300, after=120))
        elif kind == "P":
            body.append(para(run(text, 22), after=160))
        elif kind == "B":
            body.append(para(run("•   " + text, 22), after=110, ind=200))
        elif kind == "NUM":
            n += 1
            body.append(para(run(f"{n}.   ", 22, 1, HOT) + run(text, 22),
                             after=110, ind=200))
        elif kind == "QUOTE":
            body.append(para(run(text, 24, 1, MUTE), before=140, after=200, ind=320))
        elif kind == "RULE":
            body.append(para(run(""), after=200, rule=True))
        elif kind == "KEY":
            body.append(para(run(text, 20, 1, HOT, caps=1, sp=30),
                             before=400, align="center"))
        else:
            sys.exit(f"unknown directive: {kind!r}")
    return ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">'
            f'<w:body>{"".join(body)}'
            '<w:sectPr><w:pgSz w:w="11906" w:h="16838"/>'
            '<w:pgMar w:top="1400" w:right="1300" w:bottom="1400" w:left="1300"/>'
            "</w:sectPr></w:body></w:document>")


def main():
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    spec = Path(sys.argv[1]).read_text()

    # --- house rules, as hard gates -------------------------------------
    if "—" in spec or "–" in spec:
        bad = [l for l in spec.splitlines() if "—" in l or "–" in l]
        sys.exit("EM-DASH in lead magnet (feedback_no_em_dashes):\n  " +
                 "\n  ".join(bad[:5]))
    if re.search(r"powered by matchtern", spec, re.I):
        sys.exit("Matchtern footer in a REEL lead magnet "
                 "(feedback_reel_docs_no_matchtern_footer)")
    if not any(l.startswith("KEY ") for l in spec.splitlines()):
        sys.exit("no KEY line — the reel keyword must be in the doc")

    out = Path(sys.argv[2])
    out.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as z:
        z.writestr("[Content_Types].xml", CT)
        z.writestr("_rels/.rels", RELS)
        z.writestr("word/_rels/document.xml.rels", DRELS)
        z.writestr("word/styles.xml", STYLES)
        z.writestr("word/document.xml", build(spec))
    print(f"wrote {out}  ({out.stat().st_size:,} bytes)")


if __name__ == "__main__":
    main()
