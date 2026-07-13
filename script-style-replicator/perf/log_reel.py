#!/usr/bin/env python3
"""Append a reel row to PERFORMANCE-LOG.md (so you don't hand-edit the table).

Usage (fill POST metrics later by editing the row, then run compute_transfer_scores.py):
  python3 perf/log_reel.py --reel 50 --date 2026-07-14 --creator raycfu \
      --family Curiosity-Gap --keyword INBOX --topic "3 agents run your inbox" --pred 8
  # 48-72h later, optionally set metrics inline:
  python3 perf/log_reel.py --reel 50 ... --s3 61 --watch 17.2 --saves 190 --comments 300
"""
import argparse, os, re

HERE = os.path.dirname(os.path.abspath(__file__))
LOG = os.path.join(HERE, "..", "PERFORMANCE-LOG.md")


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--reel", required=True)
    p.add_argument("--date", default="-")
    p.add_argument("--creator", default="-")
    p.add_argument("--family", default="-")
    p.add_argument("--keyword", default="-")
    p.add_argument("--topic", default="-")
    p.add_argument("--pred", default="-")
    p.add_argument("--s3", default="-", help="3-second hold %")
    p.add_argument("--watch", default="-", help="avg watch seconds")
    p.add_argument("--saves", default="-")
    p.add_argument("--comments", default="-")
    p.add_argument("--notes", default="")
    a = p.parse_args()

    row = (f"| {a.reel} | {a.date} | {a.creator} | {a.family} | {a.keyword} | {a.topic} | "
           f"{a.pred} | {a.s3} | {a.watch} | {a.saves} | {a.comments} | {a.notes} |")

    lines = open(LOG, encoding="utf-8").read().splitlines()
    # insert after the last table row (last line starting with "|")
    last = max(i for i, l in enumerate(lines) if l.lstrip().startswith("|"))
    # if the last row is the trailing blank template row, replace it; else append after
    if re.match(r"^\|\s*(\|\s*)+$", lines[last]):
        lines[last] = row
    else:
        lines.insert(last + 1, row)
    open(LOG, "w", encoding="utf-8").write("\n".join(lines) + "\n")
    print(f"Logged reel {a.reel} ({a.creator} / {a.family}). "
          f"Fill retention later + run compute_transfer_scores.py.")


if __name__ == "__main__":
    main()
