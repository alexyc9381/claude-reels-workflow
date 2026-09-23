import importlib.util
import json
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('sfx_trial', ROOT/'sfx_trial.py')
m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m)


def plan():
    return {'schema_version': 1, 'experimental': True, 'duration_s': 1,
            'opening_until_s': .5, 'cues': [
                {'asset': m.SYNTH, 'at_s': .25, 'duration_s': .13, 'peak_dbfs': -15,
                 'anchor': 'peak', 'gesture': 'reveal', 'reason': 'Visible reveal'}]}


class TrialTests(unittest.TestCase):
    def test_examples_validate_and_first_frame_has_three_layers(self):
        for p in (ROOT/'examples').glob('*.json'):
            m.validate(json.loads(p.read_text()), m.catalog())
        p = json.loads((ROOT/'examples/file165-opening.json').read_text())
        first = [c for c in p['cues'] if c['at_s'] == 0]
        self.assertEqual(len(first), 3)
        self.assertEqual({c['gesture'] for c in first}, {'frame-zero'})
        self.assertFalse(json.loads((ROOT/'trial.json').read_text())['enabled_by_default'])

    def test_peak_anchor_uses_root_timeline(self):
        with tempfile.TemporaryDirectory() as tmp:
            bus, ledger = m.build_bus(plan(), Path(tmp), {}, 'unused')
        # EQ changes the final bus peak slightly; the placement ledger is anchored
        # before the common EQ, and the audible peak must remain within one frame.
        peak = np.abs(bus).max(axis=1).argmax() / m.SR
        self.assertLess(abs(peak-.25), 1/30)
        self.assertLess(ledger[0]['actual_start_s'], .25)
        self.assertGreater(ledger[0]['actual_end_s'], .25)

    def test_invalid_timings_and_missing_reasons_fail(self):
        for change in [{'at_s': float('nan')}, {'at_s': -1}, {'duration_s': 0},
                       {'reason': ''}, {'asset': 'unknown'}, {'band_hz': [5000, 300]}]:
            p = plan(); p['cues'][0].update(change)
            with self.assertRaises(ValueError): m.validate(p, {})

    def test_source_crop_cannot_silently_overrun(self):
        p = plan(); p['cues'][0]['source_start_s'] = 1
        with tempfile.TemporaryDirectory() as tmp:
            with self.assertRaisesRegex(ValueError, 'crop exceeds'):
                m.build_bus(p, Path(tmp), {}, 'unused')

    def test_changed_asset_is_rejected(self):
        p = plan(); p['cues'][0]['asset'] = 'test'
        with tempfile.TemporaryDirectory() as tmp:
            cache = Path(tmp); (cache/'test.wav').write_bytes(b'changed')
            with self.assertRaisesRegex(ValueError, 'missing/changed asset'):
                m.build_bus(p, cache, {'test': {'sha256': '0'*64}}, 'unused')

    def test_mix_preserves_voice_music_and_bounds_effects(self):
        t = np.arange(m.SR)/m.SR
        v = np.column_stack([.1*np.sin(2*np.pi*220*t)]*2)
        music = np.column_stack([.02*np.sin(2*np.pi*110*t)]*2)
        before_v, before_music = v.copy(), music.copy()
        bus = np.zeros_like(v); bus[5000:5100] = 2
        fx, mix, report = m.mix_bus(bus, v, music, plan())
        np.testing.assert_array_equal(v, before_v)
        np.testing.assert_array_equal(music, before_music)
        np.testing.assert_allclose(mix, v+music+fx)
        self.assertLessEqual(report['mix_true_peak_4x_dbfs'], -1)
        self.assertLess(np.max(np.abs(mix)), 1)

    def test_hot_base_and_short_voice_fail(self):
        x = np.zeros((m.SR, 2))
        with self.assertRaisesRegex(ValueError, 'no headroom'):
            m.mix_bus(x, x+.9, x, plan())
        with self.assertRaisesRegex(ValueError, 'complete plan duration'):
            m.mix_bus(x, x[:-1], x, plan())

    def test_existing_safe_base_peak_above_sfx_ceiling_is_preserved(self):
        t = np.arange(m.SR)/m.SR
        v = np.column_stack([.832*np.sin(2*np.pi*220*t)]*2)
        zero = np.zeros_like(v)
        _, mix, report = m.mix_bus(zero, v, zero, plan())
        np.testing.assert_array_equal(mix, v)
        self.assertLess(report['mix_true_peak_4x_dbfs'], -1)

    def test_nonempty_output_is_not_overwritten(self):
        with tempfile.TemporaryDirectory() as tmp:
            out = Path(tmp); marker = out/'keep.txt'; marker.write_text('existing audition')
            result = subprocess.run([sys.executable, str(ROOT/'sfx_trial.py'), 'render',
                str(ROOT/'examples/file165-opening.json'), '--experimental', '--voice', 'missing.wav',
                '--music', 'missing.wav', '--out', str(out)], capture_output=True, text=True)
            self.assertNotEqual(result.returncode, 0)
            self.assertIn('new or empty', result.stderr)
            self.assertEqual(marker.read_text(), 'existing audition')

    def test_silent_voice_is_not_a_boost_trigger(self):
        v = np.zeros((m.SR, 2)); bus = v.copy(); bus[1000:2000] = .01
        _, mix, report = m.mix_bus(bus, v, v, plan())
        self.assertEqual(report['opening_trim_db'], 0)
        self.assertIsNone(report['opening_sfx_to_voice_rms_db'])
        self.assertTrue(np.isfinite(mix).all())

    def test_cli_requires_explicit_trial_opt_in_before_reading_stems(self):
        with tempfile.TemporaryDirectory() as tmp:
            out = Path(tmp)/'result'
            result = subprocess.run([sys.executable, str(ROOT/'sfx_trial.py'), 'render',
                str(ROOT/'examples/file165-opening.json'), '--voice', 'missing.wav',
                '--music', 'missing.wav', '--out', str(out)], capture_output=True, text=True)
            self.assertNotEqual(result.returncode, 0)
            self.assertIn('Explicit --experimental', result.stderr)
            self.assertFalse(out.exists())


if __name__ == '__main__': unittest.main()
