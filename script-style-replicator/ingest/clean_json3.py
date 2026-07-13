import json, sys, re

def clean(path):
    data = json.load(open(path, encoding="utf-8"))
    events = data.get("events", [])
    lines = []
    for ev in events:
        segs = ev.get("segs")
        if not segs:
            continue
        text = "".join(s.get("utf8", "") for s in segs)
        text = text.replace("\n", " ").strip()
        if text:
            lines.append(text)
    # auto-captions duplicate: each cue often repeats prior. Join then collapse runs.
    full = " ".join(lines)
    full = re.sub(r"\s+", " ", full).strip()
    return full

if __name__ == "__main__":
    print(clean(sys.argv[1]))
