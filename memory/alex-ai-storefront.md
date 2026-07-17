---
name: alex-ai-storefront
description: Alex AI low-ticket storefront (The Creator Vault) at ~/Downloads/alex-ai-site/index.html — dark reel-chassis theme; checkout links + form endpoint still placeholders; product files not yet built
metadata: 
  node_type: memory
  type: project
  originSessionId: 5649dcbd-c107-4a33-9c51-020637a8c738
---

Built 2026-07-16: a single-file storefront for the Alex AI brand selling low-ticket packs, at `~/Downloads/alex-ai-site/index.html` (self-contained HTML/CSS/JS, README alongside).

**Products/prices shipped on the page:** The Prompt Stack $9 · The Hook Vault $17 (flagship, "127 hooks across the 6 families + the 10-check gate") · The Script Factory $27 (Stage 0-7 pipeline + 10 kill-rules) · The Creator OS bundle $37 (anchor $53). Copy follows the house rules: named artifacts, exact numbers, no emoji, no em dashes, no fabricated testimonials/view counts.

**Theme = the reel chassis translated to web** (from `ClaudeFactoryReel.tsx`/`GptSolReel.tsx`): ink black `#151312`, gold `#E7B24C`, clay `#D97757`/`#C7541F`, cream `#F4EEE2`, green `#3F9E74`; Fraunces 900 + Inter + JetBrains Mono; scroll progress bar ending in a gold reward seal; grain + vignette; glint sweeps. ⛔ no live `backdrop-filter` (the headless/pane renderer rule holds on web too).

**Still placeholder (why: launch blockers):**
- `CHECKOUT` object in index.html is empty — needs Stripe Payment Links (or Gumroad) per product. Until filled, buy buttons intentionally route to the email capture with a "doors open soon" toast.
- `FORM_ENDPOINT` empty — signups only go to localStorage until a Formspree/ConvertKit/ManyChat URL is pasted.
- The actual deliverable files (127 hooks, Stage 0-7 doc, 50 prompts) do NOT exist yet — build them to match the page numbers or edit the numbers.
- Footer Instagram link is a placeholder.

Verified 2026-07-16 via Playwright at 1280px and 375px: no horizontal overflow, burger menu, FAQ accordion, buy-button fallback, email success state all working. NOTE: the in-app Browser pane on this Mac reported `visibilityState: hidden` and suspended painting (black screenshots) — verify sites with the Playwright MCP over localhost instead.

Related: [[script-factory-pipeline]] · [[claude-reel-hook-library]] · [[lead-magnet-docs]] (the comment-keyword funnel these products should plug into).
