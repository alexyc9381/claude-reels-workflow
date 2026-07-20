#!/usr/bin/env python3
"""
build_repo_index.py — regenerate the repo's navigation indexes from the filesystem.

WHY THIS EXISTS
    A reel is scattered across three directories under three naming schemes:
        code       video/src/Claude<Name>Reel.tsx
        log        memory/reels/<name>-factory-log.md
        storyboard storyboards/<number>-<name>.md
    plus captions in video/src/data/. No file joined them, so you could not tell what
    a given reel actually has — and the README's hand-typed counts drifted (it said
    "62 reels / 83 memory files" when the truth was 49 / 143). Hand-maintained indexes
    rot. Generated ones do not.

WHAT IT WRITES
    REELS.md              the reel registry — one row per reel, unioned across all three
                          sources, so "what exists for reel X" is answerable at a glance.
    reel_index.json       the same data, machine-readable.
    CLAUDE.md, README.md  live counts injected between <!-- INDEX:AUTO --> ... <!-- /INDEX:AUTO -->
                          markers (only the marked block is touched; prose is left alone).

USAGE
    python3 tools/build_repo_index.py            # regenerate everything
    python3 tools/build_repo_index.py --check    # exit 1 if anything is stale (for CI / pre-commit)

No dependencies beyond the stdlib. Run from the repo root (or anywhere; paths resolve to the repo).
"""
import json, os, re, sys, argparse

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
def rp(*a): return os.path.join(ROOT, *a)

# The index mirrors the COMMITTED repo, not the dirty worktree — so every link in REELS.md
# resolves on GitHub. Files staged (git add) or committed count as "in"; untracked ones don't.
# When someone commits a new reel/log/storyboard, re-running the generator picks it up.
import subprocess
def _tracked():
    try:
        out = subprocess.check_output(["git", "-C", ROOT, "ls-files"], text=True,
                                      stderr=subprocess.DEVNULL)
        return set(out.split("\n")) - {""}
    except Exception:
        return None  # not a git repo / no git — fall back to filesystem
TRACKED = _tracked()
def keep(relpath):
    """True if this repo-relative path should be indexed (tracked/staged, or git unavailable)."""
    return TRACKED is None or relpath in TRACKED

# ---- name normalization ------------------------------------------------------
def norm(s):
    """A reel's identity key: lowercase, strip non-alphanumerics. 'Callback' == 'callback'."""
    return re.sub(r"[^a-z0-9]", "", s.lower())

# ---- gather the three scattered sources --------------------------------------
def scan_reels():
    reels = {}   # key -> dict

    def touch(key, **kw):
        r = reels.setdefault(key, {"key": key, "name": key, "number": None,
                                   "code": None, "log": None, "storyboard": None, "captions": []})
        for k, v in kw.items():
            if v is not None:
                r[k] = v
        return r

    # code: video/src/Claude<Name>Reel.tsx  (skip the malformed variant files)
    d = rp("video", "src")
    if os.path.isdir(d):
        for f in sorted(os.listdir(d)):
            m = re.fullmatch(r"Claude(.+?)Reel\.tsx", f)
            if not m or not keep(f"video/src/{f}"):
                continue
            disp = m.group(1)
            touch(norm(disp), code=f"video/src/{f}", name=disp)

    # log: memory/reels/<name>-factory-log.md
    d = rp("memory", "reels")
    if os.path.isdir(d):
        for f in sorted(os.listdir(d)):
            m = re.fullmatch(r"(.+?)-factory-log\.md", f)
            if not m or not keep(f"memory/reels/{f}"):
                continue
            touch(norm(m.group(1)), log=f"memory/reels/{f}", name=m.group(1))

    # storyboard: storyboards/<number>-<name>.md   (number is the reel's canonical id)
    d = rp("storyboards")
    if os.path.isdir(d):
        for f in sorted(os.listdir(d)):
            m = re.fullmatch(r"(\d+)-(.+?)\.md", f)
            if not m or not keep(f"storyboards/{f}"):
                continue
            num, name = int(m.group(1)), m.group(2)
            r = touch(norm(name), storyboard=f"storyboards/{f}", name=name)
            # a storyboard's number is the best id we have; keep the highest (part2 > part1 etc.)
            if r["number"] is None or num >= r["number"]:
                r["number"] = num

    # captions: join ONLY when the data filename literally names the reel (e.g. words_roots.json).
    # Generic files (words.json / captions.json) belong to no single reel — never force-join them.
    GENERIC = {"words", "captions", "timeline"}
    d = rp("video", "src", "data")
    if os.path.isdir(d):
        datafiles = [f for f in sorted(os.listdir(d)) if f.endswith(".json")]
        for key, r in reels.items():
            if not key:
                continue
            for f in datafiles:
                stem = f[:-5]  # drop .json
                if norm(stem) in GENERIC or not keep(f"video/src/data/{f}"):
                    continue
                if key in norm(stem):
                    r["captions"].append(f"video/src/data/{f}")

    return reels

# ---- repo-wide live counts ---------------------------------------------------
def count(glob_dir, pattern):
    d = rp(*glob_dir)
    if not os.path.isdir(d):
        return 0
    rx = re.compile(pattern)
    n = 0
    for base, _, files in os.walk(d):
        if ".git" in base:
            continue
        for f in files:
            if rx.fullmatch(f) and keep(os.path.relpath(os.path.join(base, f), ROOT)):
                n += 1
    return n

def gather_counts(reels):
    # counts reflect CONTENT, not the subsystem READMEs — exclude README.md everywhere
    NOT_README = r"(?!README\.md$).+"
    return {
        "reels_with_code":    sum(1 for r in reels.values() if r["code"]),
        "reels_total":        len(reels),
        "factory_logs":       sum(1 for r in reels.values() if r["log"]),
        "storyboards":        count(("storyboards",), r"\d+-.+\.md"),   # only <number>-<name>.md
        "caption_jsons":      count(("video", "src", "data"), r".+\.json"),
        "memory_md":          count(("memory",), NOT_README + r"\.md"),
        "creators":           count(("script-style-replicator", "creators"), r".+-dna\.md"),
        "packs":              sum(1 for x in os.listdir(rp("packs")) if os.path.isdir(rp("packs", x))) if os.path.isdir(rp("packs")) else 0,
    }

# ---- render REELS.md ---------------------------------------------------------
def render_reels_md(reels, counts):
    rows = sorted(reels.values(), key=lambda r: (r["number"] is None, -(r["number"] or 0), r["name"].lower()))
    def cell(path, label="✓"):
        return f"[{label}]({path})" if path else "·"
    def status(r):
        if r["code"] and r["log"]:
            return "built"
        if r["log"] and not r["code"]:
            return "log-only *(code in Drive / sibling project)*"
        if r["storyboard"] and not r["code"] and not r["log"]:
            return "storyboard-only"
        if r["code"] and not r["log"]:
            return "code, no log"
        return "—"

    out = []
    out.append("<!-- GENERATED by tools/build_repo_index.py — do not edit by hand; run the script -->")
    out.append("# REELS — the registry\n")
    out.append("Every reel unioned across its three scattered homes (code / factory log / storyboard) plus "
               "captions, so *what exists for a given reel* is answerable at a glance. **Generated** — never "
               "hand-edit; run `python3 tools/build_repo_index.py`.\n")
    out.append(f"**In this repo:** {counts['reels_with_code']} reels with code · {counts['factory_logs']} "
               f"factory logs · {counts['storyboards']} storyboards · {counts['caption_jsons']} caption files. "
               "Reel code and finished media for older reels live in the Drive zip / the sibling "
               "`matchtern-longform` project — a `log-only` row is normal, not missing data.\n")
    out.append("| # | Reel | Code | Captions | Factory log | Storyboard | Status |")
    out.append("|---|------|------|----------|-------------|------------|--------|")
    for r in rows:
        num = str(r["number"]) if r["number"] is not None else "·"
        caps = cell(r["captions"][0], f"{len(r['captions'])}") if r["captions"] else "·"
        # reels are referred to by UPPERCASE keyword everywhere (ROOTS, CALLBACK); normalize display to match
        disp = re.sub(r"[-_]", " ", r["name"]).upper()
        out.append(f"| {num} | **{disp}** | {cell(r['code'])} | {caps} | "
                   f"{cell(r['log'])} | {cell(r['storyboard'])} | {status(r)} |")
    out.append("")
    out.append("**Legend** · `built` = code + log present · `log-only` = decision record here, code in Drive "
               "· `storyboard-only` = planned/boarded, not yet built here. Reel **numbers** come from the "
               "storyboard filename (the canonical id); reels without a storyboard show `·`.\n")
    return "\n".join(out)

# ---- inject counts into a marked block ---------------------------------------
AUTO_RX = re.compile(r"(<!-- INDEX:AUTO -->)(.*?)(<!-- /INDEX:AUTO -->)", re.S)
def inject(path, block):
    if not os.path.exists(path):
        return False
    t = open(path).read()
    if not AUTO_RX.search(t):
        return False
    new = AUTO_RX.sub(lambda m: m.group(1) + "\n" + block + "\n" + m.group(3), t)
    if new != t:
        open(path, "w").write(new)
        return True
    return False

def broken_links():
    """Every relative markdown link in the nav docs must resolve. Returns a list of 'file → href' misses."""
    import glob
    docs = ["CLAUDE.md", "README.md", "REELS.md", "docs/CONVENTIONS.md"] + \
           [p for p in glob.glob(rp("*", "README.md"))]
    link = re.compile(r"\[[^\]]+\]\(([^)]+)\)")
    out = []
    for d in docs:
        path = d if os.path.isabs(d) else rp(d)
        if not os.path.exists(path):
            continue
        base = os.path.dirname(path)
        for m in link.finditer(open(path).read()):
            h = m.group(1).split("#")[0].strip()
            if not h or h.startswith(("http", "mailto:")) or "<" in h or ">" in h:
                continue
            if not os.path.exists(os.path.normpath(os.path.join(base, h))):
                out.append(f"{os.path.relpath(path, ROOT)} → {h}")
    return out

def counts_block(c):
    return (f"| reels (code in-repo) | **{c['reels_with_code']}** | factory logs | **{c['factory_logs']}** |\n"
            f"|---|---|---|---|\n"
            f"| storyboards | {c['storyboards']} | caption files | {c['caption_jsons']} |\n"
            f"| memory `.md` | {c['memory_md']} | creator packs | {c['packs']} |\n"
            f"| script-DNA creators | {c['creators']} | | |")

# ---- main --------------------------------------------------------------------
def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--check", action="store_true", help="exit 1 if any generated file is stale")
    args = ap.parse_args()

    reels = scan_reels()
    counts = gather_counts(reels)
    reels_md = render_reels_md(reels, counts)
    manifest = json.dumps({"counts": counts, "reels": sorted(reels.values(),
                          key=lambda r: (r["number"] or 0, r["name"]))}, indent=2)

    targets = {rp("REELS.md"): reels_md, rp("tools", "reel_index.json"): manifest}

    if args.check:
        stale = [os.path.relpath(p, ROOT) for p, want in targets.items()
                 if not os.path.exists(p) or open(p).read().rstrip() != want.rstrip()]
        links = broken_links()
        if stale or links:
            if stale:
                print("STALE (run tools/build_repo_index.py): " + ", ".join(stale))
            for b in links:
                print("BROKEN LINK: " + b)
            sys.exit(1)
        print("indexes up to date · all nav links valid"); sys.exit(0)

    for p, content in targets.items():
        open(p, "w").write(content.rstrip() + "\n")
        print("wrote", os.path.relpath(p, ROOT))
    for f in ("CLAUDE.md", "README.md"):
        if inject(rp(f), counts_block(counts)):
            print("injected counts into", f)
    print("\ncounts:", json.dumps(counts))

if __name__ == "__main__":
    main()
