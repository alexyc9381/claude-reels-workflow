#!/usr/bin/env python3
"""Build a deterministic frame EDL from voice activity and reviewed hard cuts.

Input JSON:
{
  "profile": "course",
  "source": "youtube/my-video/source.mp4",
  "source_fps": 60,
  "output_fps": 30,
  "source_duration_seconds": 880.35,
  "vad": [[13.04, 18.2], ...],
  "hard_cuts": [{"start": 0, "end": 13.04, "kind": "retake", "reason": "marker"}]
}

Voice activity provides candidates. Hard cuts remain explicit and auditable.
The output frame list is the single handoff consumed by Remotion.
"""
from __future__ import annotations

import argparse
import json
from pathlib import Path


DEFAULT_PAUSE_MAX = 0.50
DEFAULT_HEAD = 0.10
DEFAULT_TAIL = 0.18
MIN_SPAN = 0.12


def merge_ranges(ranges: list[list[float]], gap: float = 0.0) -> list[list[float]]:
    merged: list[list[float]] = []
    for start, end in sorted(ranges):
        if end <= start:
            continue
        if merged and start <= merged[-1][1] + gap:
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])
    return merged


def subtract_ranges(keep: list[list[float]], cuts: list[list[float]]) -> list[list[float]]:
    result: list[list[float]] = []
    for start, end in keep:
        cursor = start
        for cut_start, cut_end in cuts:
            if cut_end <= cursor or cut_start >= end:
                continue
            if cut_start > cursor:
                result.append([cursor, min(cut_start, end)])
            cursor = max(cursor, cut_end)
            if cursor >= end:
                break
        if cursor < end:
            result.append([cursor, end])
    return [span for span in result if span[1] - span[0] >= MIN_SPAN]


def build(payload: dict) -> dict:
    if payload["profile"] not in {"course", "screen-demo", "talking-head"}:
        raise ValueError("profile must be course, screen-demo, or talking-head")
    source_fps = float(payload["source_fps"])
    output_fps = float(payload.get("output_fps", 30))
    duration = float(payload["source_duration_seconds"])
    pause_max = float(payload.get("pause_max", DEFAULT_PAUSE_MAX))
    head = float(payload.get("head", DEFAULT_HEAD))
    tail = float(payload.get("tail", DEFAULT_TAIL))

    voice = merge_ranges([[float(a), float(b)] for a, b in payload["vad"]], pause_max)
    padded: list[list[float]] = []
    starts: list[float] = []
    for index, (start, _end) in enumerate(voice):
        previous_end = voice[index - 1][1] if index else 0.0
        starts.append(max(0.0, start - head, previous_end + 0.02 if index else 0.0))
    for index, (_start, end) in enumerate(voice):
        padded_end = min(duration, end + tail)
        if index + 1 < len(voice):
            padded_end = min(padded_end, starts[index + 1] - 0.02)
        padded.append([starts[index], max(starts[index] + MIN_SPAN, padded_end)])

    hard = payload.get("hard_cuts", [])
    hard_ranges = merge_ranges(
        [[float(item["start"]), float(item["end"])] for item in hard]
    )
    seconds = merge_ranges(subtract_ranges(padded, hard_ranges))

    segments = []
    for start, end in seconds:
        first = round(start * source_fps)
        last = round(end * source_fps)
        if last > first:
            segments.append({
                "sourceStartFrame": first,
                "sourceEndFrame": last,
                "reason": "voice-driven keep"
            })

    kept_seconds = sum(
        (item["sourceEndFrame"] - item["sourceStartFrame"]) / source_fps
        for item in segments
    )
    result = {
        "version": 1,
        "profile": payload["profile"],
        "source": payload["source"],
        "sourceFps": source_fps,
        "outputFps": output_fps,
        "segments": segments,
        "overlays": [],
        "analysis": {
            "sourceDurationSeconds": duration,
            "keptSeconds": round(kept_seconds, 3),
            "removedSeconds": round(duration - kept_seconds, 3),
            "pauseMax": pause_max,
            "head": head,
            "tail": tail,
            "hardCuts": hard
        }
    }
    for source_key, manifest_key in (
        ("source_width", "sourceWidth"),
        ("source_height", "sourceHeight"),
        ("chrome_crop", "chromeCrop"),
    ):
        if source_key in payload:
            result[manifest_key] = payload[source_key]
    return result


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("input", type=Path)
    parser.add_argument("output", type=Path, nargs="?", default=Path("edit.json"))
    args = parser.parse_args()
    payload = json.loads(args.input.read_text())
    result = build(payload)
    args.output.write_text(json.dumps(result, indent=2) + "\n")
    print(
        f"{len(result['segments'])} segments, "
        f"{result['analysis']['keptSeconds']:.1f}s kept, "
        f"{result['analysis']['removedSeconds']:.1f}s removed -> {args.output}"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
