---
name: matchtern-static-ad-pipeline
description: Working HTML→PNG render pipeline + format for Matchtern static FB/IG image ads
metadata: 
  node_type: memory
  type: reference
  originSessionId: 9007e26d-ed27-4294-bdbf-43a014859521
---

Static image ads for Matchtern live at `~/Downloads/matchtern-fb-ads/` (`ad-*.html`, `render.sh`, `AD-COPY-AND-PLAYBOOK.md`, `logo-mark.png` copied from the design system).

**Formats (verified vs 2026 Meta specs):** feed = `ad-*.html` → 1080×1350 (4:5); stories/reels = `story-*.html` → 1080×1920 (9:16). Both rendered at 2× (2160×2700 / 2160×3840). 4:5 feed + 9:16 stories ≈ 90% of mobile impressions. 1:1 (1080×1080) is the never-cropped fallback; 3:4 (1080×1440) is IG's newest feed max. `render.sh` renders both patterns at the right size. Pull 9:16 photo crops with `&w=1080&h=1920&fit=crop&dpr=2`. Keep story text/CTA in the safe zone (clear of top profile UI ~150px and bottom CTA bar ~260px). Messaging follows [[matchtern-primary-messaging]] ("stand out", not "10 days guaranteed").

**Render path (no python playwright on this Mac):** headless Google Chrome. `render.sh` loops every `ad-*.html` →
`"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu --allow-file-access-from-files --hide-scrollbars --force-device-scale-factor=2 --window-size=1080,1350 --virtual-time-budget=6000 --default-background-color=ffffffff --screenshot=out.png file://abs/path.html`.
The `--allow-file-access-from-files` flag lets the HTML reference `logo-mark.png` by relative path (so no base64 embedding). Google Fonts (Playfair Display + Inter) load over network in headless Chrome — confirmed working.

Built on the official [[matchtern-design-system]] tokens and ad copy from the matchtern-meta-deception skill. The 5 active angles (photo-led): (1) hero curiosity-gap, (2) premium campus observation, (3) stand-out "real work beats a perfect transcript", (4) us-vs-them comparison (vs free simulations / pay-to-play camps), (5) qualifier split. Founder-note ad is RESERVED (`reserved-founder-ad.html` / `reserved-founder-story.html`, won't auto-render) until Alex can add founder **Bret**'s real photo + credentials — a founder ad without the founder's face has no credibility. Biggest un-built opportunity (needs real data): a "Placed at:" logo-wall credibility ad. Square (1:1) set is sample-only so far (`sq-1-hero`); offer to complete all 5 squares.

**Real imagery sourcing (no API key):** Alex wants real photos in ads, not flat editorial slides. Pexels CDN serves commercial-safe images (Pexels License: commercial, no attribution) directly + crops server-side: `https://images.pexels.com/photos/<ID>/pexels-photo-<ID>.jpeg?auto=compress&cs=tinysrgb&w=1080&h=1350&fit=crop&dpr=2` → exact 2160×2700 4:5. Get good `<ID>`s via WebSearch `allowed_domains:["pexels.com"]` (IDs are the trailing number in pexels.com/photo/<slug>-<id>/). Unsplash is now behind an Anubis bot wall (curl + headless Chrome both blocked); Openverse API (`api.openverse.org/v1/images/?q=...&license=cc0,pdm`) is a no-key fallback (CC0 from StockSnap, caps ~960w). Use stock as ATMOSPHERE only, never captioned as a real student (brand rule: real outcomes only). macOS `sips` reads/crops images (no PIL on this Mac). To review many images cheaply: build an HTML grid of them and screenshot once with headless Chrome.

**Final delivery step (always):** after rendering, import the PNGs to Alex's iPhone camera roll via `~/Downloads/import_to_photos.sh <out-dir> "Matchtern Ads"`. See [[social-assets-to-camera-roll]].

**Google Drive delivery:** Google Drive for Desktop is now mounted at `~/Library/CloudStorage/GoogleDrive-alex@matchtern.org/`. To put assets in Drive, just `cp` into the mount (no base64/API needed — the MCP `create_file` can't practically bulk-upload large binaries). Matchtern social assets live under `My Drive/Matchtern/05_Marketing/Social Media/`; the paid-ad creatives are in `05_Matchtern Paid Ads (FB + IG)` (Drive folder id `13OYt1QT_l872DA-GQhmBkehthLee3vwU`) alongside `01_Matchtern Posts` / `04_Matchtern IG Posts`. The copy/captions/competitor playbook is also there as a Google Doc.
