#!/usr/bin/env python3
"""Explicit, local-only SFX experiment. Never imported by the production renderer."""
import argparse
import hashlib
import json
import math
from pathlib import Path
import shutil
import subprocess

import numpy as np
from scipy.io import wavfile
from scipy.ndimage import minimum_filter1d, uniform_filter1d
from scipy.signal import butter, lfilter, resample_poly, sosfilt

ROOT = Path(__file__).resolve().parent
SR = 48000
SYNTH = 'single-dry-chime'


def load_json(path):
    return json.loads(Path(path).read_text())


def catalog():
    return {a['id']: a for a in load_json(ROOT / 'catalog.json')['assets']}


def digest(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def read_wav(path):
    sr, x = wavfile.read(path)
    if sr != SR or x.dtype != np.int16 or x.ndim != 2 or x.shape[1] != 2 or not len(x):
        raise ValueError(f'{Path(path).name}: expected nonempty 48 kHz stereo PCM16 WAV')
    return x.astype(np.float64) / 32768


def write_wav(path, x):
    if not np.isfinite(x).all() or np.abs(x).max() >= 1:
        raise ValueError('Refusing to write clipped or non-finite audio')
    wavfile.write(path, SR, np.clip(np.rint(x * 32768), -32768, 32767).astype(np.int16))


def db_rms(x):
    return float(20 * np.log10(np.sqrt(np.mean(x * x)) + 1e-12))


def db_peak(x):
    return float(20 * np.log10(np.abs(x).max() + 1e-12))


def fades(x, attack=.0015, release=.014):
    x = x.copy()
    a, b = min(len(x) // 3, round(attack * SR)), min(len(x) // 2, round(release * SR))
    if a:
        x[:a] *= np.linspace(0, 1, a)[:, None]
    if b:
        x[-b:] *= np.linspace(1, 0, b)[:, None]
    return x


def chime():
    t = np.arange(round(.155 * SR)) / SR
    y = np.sin(2*np.pi*1318.51*t)*np.exp(-t/.045)
    y += .23*np.sin(2*np.pi*2643.1*t)*np.exp(-t/.022)
    y += .07*np.sin(2*np.pi*3650*t)*np.exp(-t/.012)
    x = fades(np.column_stack([y, y]), .001, .025)
    return x / np.abs(x).max() * 10**(-6/20)


def finite(value, name, low, high):
    if isinstance(value, bool) or not isinstance(value, (int, float)) or not math.isfinite(value) or not low <= value <= high:
        raise ValueError(f'{name} must be a finite number in [{low}, {high}]')


def validate(plan, records):
    if plan.get('schema_version') != 1 or plan.get('experimental') is not True:
        raise ValueError('Plan must explicitly use schema_version 1 and experimental: true')
    duration = plan['duration_s']
    finite(duration, 'duration_s', .05, 600)
    finite(plan.get('opening_until_s', 2), 'opening_until_s', 0, duration)
    mix = plan.get('mix', {})
    for key, default in [('opening_margin_db', -9), ('body_margin_db', -14)]:
        finite(mix.get(key, default), key, -30, -6)
    clips = plan.get('cues')
    if not isinstance(clips, list) or not clips:
        raise ValueError('A nonempty cues array is required')
    for c in clips:
        if c['asset'] not in records and c['asset'] != SYNTH:
            raise ValueError(f"Unknown asset: {c['asset']}")
        if not c.get('reason', '').strip() or not c.get('gesture', '').strip():
            raise ValueError('Each cue needs a visual reason and gesture ID')
        finite(c['at_s'], 'at_s', 0, duration - 1/SR)
        finite(c['peak_dbfs'], 'peak_dbfs', -60, -6)
        finite(c.get('source_start_s', 0), 'source_start_s', 0, 600)
        finite(c['duration_s'], 'cue duration_s', .001, 30)
        finite(c.get('pan', 0), 'pan', -1, 1)
        if c.get('anchor', 'start') not in ('start', 'peak'):
            raise ValueError('anchor must be start or peak')
        if 'fit_s' in c:
            finite(c['fit_s'], 'fit_s', .01, 30)
        if 'band_hz' in c:
            lo, hi = c['band_hz']
            finite(lo, 'band low', 20, SR/2-2)
            finite(hi, 'band high', lo+1, SR/2-1)
    return plan


def prepare(palette, cache):
    """Import prepared media from the private local palette, checking provenance."""
    cache.mkdir(parents=True, exist_ok=True)
    records = catalog()
    # Validate every source before copying anything. Never silently accept a replacement.
    for a in records.values():
        p = palette / a['file']
        if not p.is_file() or digest(p) != a['sha256']:
            raise ValueError(f"Missing or changed source {a['id']}: restore the prepared palette")
        read_wav(p)
    for a in records.values():
        shutil.copyfile(palette / a['file'], cache / (a['id'] + '.wav'))
    write_wav(cache / (SYNTH + '.wav'), chime())
    print(f'Prepared {len(records)} sourced effects and one original chime in {cache}')


def tempo_fit(x, seconds, ffmpeg):
    speed = len(x) / (SR * seconds)
    filters = []
    while speed > 2:
        filters.append('atempo=2'); speed /= 2
    while speed < .5:
        filters.append('atempo=0.5'); speed /= .5
    filters.append(f'atempo={speed:.10f}')
    raw = subprocess.run([ffmpeg, '-v', 'error', '-f', 'f32le', '-ar', str(SR), '-ac', '2',
                          '-i', '-', '-af', ','.join(filters), '-f', 'f32le', '-'],
                         input=x.astype('<f4').tobytes(), capture_output=True, check=True).stdout
    y = np.frombuffer(raw, dtype='<f4').reshape(-1, 2).astype(float)
    n = round(seconds * SR)
    return np.pad(y, ((0, max(0, n-len(y))), (0, 0)))[:n]


def build_bus(plan, cache, records, ffmpeg):
    validate(plan, records)
    n = round(plan['duration_s'] * SR)
    bus = np.zeros((n, 2)); ledger = []; loaded = {}
    for c in plan['cues']:
        key = c['asset']
        if key not in loaded:
            p = cache / (key + '.wav')
            if key == SYNTH:
                # Deterministic source, no external file required.
                loaded[key] = chime()
            else:
                if not p.is_file() or digest(p) != records[key]['sha256']:
                    raise ValueError(f'{key}: missing/changed asset; run prepare with the private palette')
                loaded[key] = read_wav(p)
        source = loaded[key]
        start = round(c.get('source_start_s', 0) * SR)
        end = start + round(c['duration_s'] * SR)
        if start >= len(source) or end > len(source) + 2:
            raise ValueError(f'{key}: source crop exceeds the recording; inspect its actual duration')
        x = source[start:min(end, len(source))].copy()
        if 'fit_s' in c:
            x = tempo_fit(x, c['fit_s'], ffmpeg)
        x = fades(x)
        if 'band_hz' in c:
            x = sosfilt(butter(2, c['band_hz'], btype='bandpass', fs=SR, output='sos'), x, axis=0)
        peak = np.abs(x).max()
        if peak < 1e-8:
            raise ValueError(f'{key}: crop is silent')
        x *= 10**(c['peak_dbfs']/20) / peak
        i = round(c['at_s'] * SR)
        if c.get('anchor') == 'peak':
            i -= int(np.abs(x).max(axis=1).argmax())
        if i < 0:
            x = x[-i:]; i = 0
        pan = c.get('pan', 0)
        x *= np.array([1-max(pan, 0)*.3, 1+min(pan, 0)*.3])
        if i + len(x) > n:
            x = fades(x[:n-i])
        bus[i:i+len(x)] += x
        ledger.append({**c, 'actual_start_s': i/SR, 'actual_end_s': (i+len(x))/SR})
    # Mild fixed speech-band carve. Actual dialogue still determines the gain below.
    A = 10**(-3.7/40); w = 2*np.pi*2700/SR; alpha = np.sin(w)/(2*.85)
    b = np.array([1+alpha*A, -2*np.cos(w), 1-alpha*A])
    a = np.array([1+alpha/A, -2*np.cos(w), 1-alpha/A])
    return lfilter(b/a[0], a/a[0], bus, axis=0), ledger


def mix_bus(bus, voice, music, plan):
    n = len(bus)
    if len(voice) < n or len(music) < n:
        raise ValueError('Voice and music stems must cover the complete plan duration; pad explicitly if needed')
    voice, music = voice[:n], music[:n]
    base = voice + music
    ceiling = 10**(-1.7/20)
    if db_peak(resample_poly(base, 4, 1, axis=0)) > -1:
        raise ValueError('Voice + music leave no headroom below -1 dBFS true peak. Prepare separate stems with headroom first.')
    talk = np.sqrt(uniform_filter1d(np.mean(voice**2, axis=1), size=4800)+1e-14) > 10**(-38/20)
    opening_end = round(plan.get('opening_until_s', 2)*SR)
    settings = plan.get('mix', {})
    gain = np.ones(n); gains = {}
    for name, start, end, margin in [('opening', 0, opening_end, settings.get('opening_margin_db', -9)),
                                     ('body', opening_end, n, settings.get('body_margin_db', -14))]:
        mask = talk[start:end]
        # Never auto-boost a silent/missing voice or a nearly silent SFX segment.
        voiced_fx = bus[start:end][mask]
        trim = 0.
        if mask.any() and db_rms(voiced_fx) > -75:
            trim = float(np.clip(margin - (db_rms(voiced_fx)-db_rms(voice[start:end][mask])), -12, 7))
        gain[start:end] = 10**(trim/20); gains[name+'_trim_db'] = trim
    # Short gain transition avoids a discontinuity across a sustained boundary cue.
    left, right = max(0, opening_end-240), min(n, opening_end+240)
    if 0 < opening_end < n and right > left:
        gain[left:right] = np.linspace(gain[left], gain[right-1], right-left)
    fx = bus * gain[:, None]
    # Preserve existing base peaks above the SFX ceiling without allowing
    # same-direction SFX to push them higher. No gain change to voice/music.
    local_ceiling = np.maximum(ceiling, np.abs(base))
    room = np.where(fx >= 0, local_ceiling-base, local_ceiling+base)
    safe = np.minimum(1, np.maximum(0, room)/(np.abs(fx)+1e-12)).min(axis=1)
    shaped = uniform_filter1d(minimum_filter1d(safe, size=144), size=36)
    # Smoothing must never undo the instantaneous bound.
    fx *= np.minimum(safe, shaped)[:, None]
    fx[-min(480, n):] *= np.linspace(1, 0, min(480, n))[:, None]
    mix = base + fx
    peak = db_peak(resample_poly(mix, 4, 1, axis=0))
    if peak > -1:
        raise ValueError(f'Mix true peak {peak:.2f} dBFS: lower individual cue peaks and retry')
    metrics = {**gains, 'mix_sample_peak_dbfs': db_peak(mix), 'mix_true_peak_4x_dbfs': peak,
               'voice_gain_applied_db': 0, 'music_gain_applied_db': 0}
    for name, start, end in [('opening', 0, opening_end), ('body', opening_end, n)]:
        mask = talk[start:end]
        metrics[name+'_sfx_to_voice_rms_db'] = (db_rms(fx[start:end][mask])-db_rms(voice[start:end][mask])) if mask.any() else None
    return fx, mix, metrics


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    sub = parser.add_subparsers(dest='command', required=True)
    p = sub.add_parser('prepare'); p.add_argument('--palette', type=Path, required=True); p.add_argument('--cache', type=Path, default=ROOT/'.cache')
    v = sub.add_parser('validate'); v.add_argument('plan', type=Path)
    r = sub.add_parser('render')
    r.add_argument('plan', type=Path); r.add_argument('--cache', type=Path, default=ROOT/'.cache')
    r.add_argument('--voice', type=Path, required=True); r.add_argument('--music', type=Path, required=True)
    r.add_argument('--out', type=Path, required=True); r.add_argument('--experimental', action='store_true')
    args = parser.parse_args()
    try:
        if args.command == 'prepare':
            prepare(args.palette, args.cache); return
        records = catalog(); plan = validate(load_json(args.plan), records)
        if args.command == 'validate':
            print(f"Valid experimental plan: {len(plan['cues'])} layers"); return
        if not args.experimental:
            raise ValueError('Explicit --experimental is required for every render; this is not the house default')
        if args.out.exists() and any(args.out.iterdir()):
            raise ValueError('Output folder must be new or empty; preserve the existing comparison')
        import imageio_ffmpeg
        bus, ledger = build_bus(plan, args.cache, records, imageio_ffmpeg.get_ffmpeg_exe())
        voice, music = read_wav(args.voice), read_wav(args.music)
        fx, mix, metrics = mix_bus(bus, voice, music, plan)
        args.out.mkdir(parents=True, exist_ok=True)
        write_wav(args.out/'sfx.wav', fx); write_wav(args.out/'mix.wav', mix)
        report = {'status': 'experimental_unapproved', 'plan_sha256': digest(args.plan),
                  'voice_sha256': digest(args.voice), 'music_sha256': digest(args.music),
                  'duration_s': len(mix)/SR, 'layer_count': len(ledger),
                  'gesture_count': len({c['gesture'] for c in ledger}), **metrics,
                  'cues': ledger, 'review': 'Technical check only. Audition with speech; no retention result measured.'}
        (args.out/'report.json').write_text(json.dumps(report, indent=2)+'\n')
        print(json.dumps({k:v for k,v in report.items() if k!='cues'}, indent=2))
    except (ValueError, KeyError, OSError, subprocess.CalledProcessError) as exc:
        parser.exit(2, f'Error: {exc}\n')


if __name__ == '__main__':
    main()
