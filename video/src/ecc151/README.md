# ECC · reel 151 · final revision source

This is the delivered September 12, 2026 revision, preserved independently of the shared SlopKit. Internal EC150 names are historical: the final reel was numbered 151 because 150 was occupied. Render `ECC151` through `../ecc-151-index.tsx`; do not register the unused early scene exports in EC150Scenes or EC150Revision.

## Find the decisions

- [Standing feedback](../../../memory/alex-ecc-continuous-action-and-reveal-gating.md)
- [Revision record](../../../memory/reels/ecc-revision-record.md)
- [Final storyboard](../../../storyboards/151-ecc.md)

## Rebuild

Download [ECC - Editable Source.zip](https://drive.google.com/file/d/1xZvbn-TS0pvoA23IUHQs-XiZ5XOuqnOi/view). Media remains in Drive; only source and text evidence are in Git. The archive contains pinned dependencies, the four audio stems, creator imagery and original logo assets.

From the repository root:

```sh
python3 tools/restore_ecc151_assets.py '/path/to/ECC - Editable Source.zip'
cd video
npm ci
npx remotion render src/ecc-151-index.tsx ECC151 ecc151-native.mp4 --concurrency=3 --crf=16
cd ..
python3 tools/finalize_ecc151.py video/ecc151-native.mp4 --output video/out/151_Claude-ECC.mp4
```

The asset adapter scopes all public paths to `ecc151/`. The rest of the copied component choreography is unchanged. The original aligned transcript is `../data/ecc151-timing.json`; only the early displayed ECC word is masked as three dots. VO still says the name. Scene headers change with the narrated moment. No source code is imported into the shared Root automatically.

`EC150ActionPass.tsx` owns the phone, installer, design, containment assistant and page binding. `EC150Revision.tsx` owns the snap, working background crew, build, test and CTA. `EC150Kit.tsx` wraps the original mascot; SlopKit and fonts are a frozen local copy to avoid changing other reels. Some earlier, unused scenes remain for provenance and the gauntlet import; they are not the delivered scene sequence. Read the scene mapping in EC150.tsx.

The existing soundtrack source window and glow-eye treatment are ECC choices, not defaults for other videos. The final guide is [live on chen.media](https://chen.media/guides/ecc-installation-guide). [Delivery and measured evidence](../../../memory/reels/evidence/ecc151/) record the export; passing diagnostics does not establish user approval or retention.


## Two additional hooks: MAGNET and ZIPPER

September 12 follow-up: two new full-length versions with distinct visual opening mechanisms, independent SFX and the same revised body from 3.4 seconds. `ECC151` remains the original SNAP default; `ECC151B` is MAGNET and `ECC151C` is ZIPPER.

- [MAGNET video](https://drive.google.com/file/d/1jy2-ydBSNvT_XI2H4L6jq89KhA0BZMuY/view)
- [ZIPPER video](https://drive.google.com/file/d/1-rk4h8rfpd4v3O8KMryyTwifHv2pTqJD/view)
- [Both hooks: editable source and media](https://drive.google.com/file/d/1tdHkRIm_WrfQY3W7tdwsJQpG-ijEmH6l/view)
- [Storyboard, iteration record and system references](../../../memory/reels/evidence/ecc151/hooks/STORYBOARD.md)
- [Export and comparison evidence](../../../memory/reels/evidence/ecc151/hooks/delivery.json)

Restore the new archive with `python3 tools/restore_ecc151_assets.py '/path/to/ECC - Two Hook Variants - Editable Source.zip' --hooks`. It includes the unchanged base assets and additional masters/stems, all checksum verified into the same isolated directory. Render via `src/ecc-151-index.tsx` with composition `ECC151B` or `ECC151C`, then finalize using `tools/finalize_ecc151.py NATIVE.mp4 --output OUTPUT.mp4 --hook magnet` (or `--hook zipper`).

`EC151Hooks.tsx` owns the new choreography. The master audio is sample-identical to the original from 3.4 seconds; the opening uses clean voice/music/effect stems and matched contact cues. Hook-only and full-reel hash differences are reported separately; the shared body is intentional and no retention claim is made.


The latest hook revision makes Claude explicit from frame zero: both primary props carry an enlarged, centered official Claude mark, with no CLAUDE text label. See the frame-zero audience signal section of the hook storyboard and standing feedback section 9. The same video and source Drive links serve this revision.
