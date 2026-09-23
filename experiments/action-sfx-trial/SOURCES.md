# Sources and local audio

This public repo stores code and source metadata, following its existing code/text-only policy. It contains no downloaded stock recordings, stems, audio previews, Instagram clips or finished videos.

`catalog.json` preserves prepared-file hashes, source pages, source download URLs, original hashes when recorded and license references from the local audition palette. Catalog descriptions and waveform analysis supported selection. These are candidate sounds and original arrangements, not verified exact matches to Cindy Zhu's reels.

## Restore

The supported exact restore is a private copy of the prepared `alex-sound-palette` folder. Run `prepare --palette /path/to/alex-sound-palette`; every sourced WAV must match its prepared-file SHA-256. The cache uses stable asset IDs as filenames, so cue sheets stay portable. The renderer checks used assets again before rendering. Generated original chime synthesis lives in `sfx_trial.py`.

If no prepared copy is available, retrieve the needed recordings from the source pages in the catalog, under the provider's current terms. Match the recorded source segment/processing, convert to 48 kHz stereo PCM16, and review the result. A new preparation may have a different hash; record that as a deliberate catalog revision with source provenance and audition it again. Do not disable the integrity check or claim a newly processed file is identical to the saved version. The CLI does not currently automate this reconstruction.

## Providers

- [Mixkit Sound Effects Free License](https://mixkit.co/license/#sfxFree): source/licensing reference for the Mixkit effects. Keep stock audio in the private working cache and use it in finished edits; this repository is not an audio-pack distribution channel.
- Freesound: individual source records include creator, source page, recorded CC0 license URL and HQ-preview origin. Those prepared files came from public HQ MP3 previews, not original lossless masters.
- [Echo SFX terms](https://www.echosfx.com/terms-and-conditions): source reference for the optional cash-register recording by Ed Thomas. The file is not included in Git or used by the supplied FILE examples.
- The fixed-pitch dry opening chime is original oscillator synthesis. It does not need a stock download.

Keep new source recordings and generated outputs in the ignored `.cache/` and `runs/` folders. Do not force-add audio around `.gitignore`. A source URL establishes provenance, not authorization to republish a standalone sound library.
