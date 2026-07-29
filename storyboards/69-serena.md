# Reel 69 — SERENA · storyboard

**Format:** HYBRID (Alex's brief) = the house sprite chassis (pattern-interrupt hook + Claude mascot as a character,
single dark framed panel) **fused with** the Nick-Saraev real-screen annotation system from `ClaudeBrainReel.tsx`
(reel 17): a mac `Browser` frame wrapping **genuine, fact-checked screenshots of the real oraios/serena GitHub page**,
`Screen` slow push-in pan/zoom, `HiBox` highlight boxes that draw onto the exact thing the VO names, `Cursor`, `Term`.
Nick-Saraev editing = tight punchy captions, zoom-on-the-thing, money/token framing. "GitHub style" = show the repo,
the card, the stars, the logo, highlight + zoom.

**VO:** `public/69_serena_vo.wav` (52.49s, 6 retakes + 1 stumble spliced out, Claude>Cloud fixed in captions).
**Words:** `src/data/words_serena.json` (238 words, 7 scene lines). **Keyword:** SERENA.
**L = [0.0, 12.13, 21.25, 26.26, 34.03, 37.77, 42.18]  ·  CUT ≈ 52.2 (1575f @30)**
**Genuine assets (public/refs/, all fact-verified 2026-07-19):** serena_repo.png (card, 26.6k stars, topics, MIT) ·
serena_header.png (repo-name + Star 26.6k tight) · serena_readme.png (real Serena logo + "The IDE for Your Coding
Agent") · serena_diagram.png (real arch diagram: AI Client -> FindSymbolTool/FindReferencesTool -> Language
Intelligence) · serena_langs.png ("over 40 programming languages" + full list) · serena_install.png (Quick Start cmd).

---

## S1 · HOOK (0.0-12.13) — pattern interrupt + the money reveal
VO: "Most people don't realize that Claude Code reads your ENTIRE project every single time it does anything, even
the thousands of lines it never uses. That's why you keep running out of usage. But I added one free tool and the
same task suddenly used 80% FEWER TOKENS."
- **Frame 0 (pattern interrupt):** a Claude mascot (dev at a desk) watching a TOKEN METER redline — a big "TOKENS
  USED" gauge slamming toward LIMIT, a wall of code scrolling into the prompt, a red "USAGE LIMIT" warning. Mute-
  readable HOOK HEADER (raycfu, contains "Claude"): **"CLAUDE CODE IS BURNING YOUR TOKENS"** / clay accent.
- Beat 2 (~7s): the "one free tool" lands -> the meter DROPS and a big clay **"-80% TOKENS"** stamp hits. This is the
  L1 stun + the money number front-loaded (specificity-effect). Mascot reacts (shock -> relief).
- Captions lower-third.

## S2 · THE PROBLEM (12.13-21.25) — the whole codebase shoved in, most of it wasted
VO: "Every time Claude works, it shoves your entire codebase into the prompt and you get charged for every line,
including the huge chunk it never even looks at. On a real project, that's most of your usage burned for nothing."
- A `ClaudeWindow`/prompt panel: the ENTIRE project (a tall stack of file cards / a big code blob) being dumped in;
  a "PROMPT: 48,000 tokens" meter fills; then ~85% of it greys out / crosses out with **"NEVER READ"** + a burning-
  money / "$ WASTED" tag on the unused chunk. Mascot facepalm. Fast Saraev cut.

## S3 · THE CARD (21.25-26.26) — the GitHub card, stars, logo  ⭐ Alex's key ask
VO: "The free tool is called Serena. 26,000 developers already run it, and you only need to install it once."
- **Hard cut to the REAL GitHub page** in a mac `Browser` frame: `serena_repo.png` push-in on the header, then a
  `HiBox` draws around **"Star 26.6k"** (VO "26,000 developers") + a `HiBox` on the **oraios/serena** name; cut/dissolve
  to `serena_readme.png` with a `HiBox` on the real **SERENA logo** + tagline "The IDE for Your Coding Agent".
  A "MIT · FREE" chip. This is the credibility beat — genuine screenshot, zoomed + highlighted.

## S4 · MECHANISM (26.26-34.03) — ask for your code by name
VO: "Instead of loading your whole project every single chat, Serena lets Claude ask for your code by NAME. It says
'give me ONE function' and gets back exactly that function, not the whole file it's buried in."
- `serena_diagram.png` (the REAL architecture diagram) push-in, `HiBox` on **FindSymbolTool**. Then a `Term` beat:
  Claude types `find_symbol("processPayment")` -> returns just that ONE function (a single highlighted function card)
  while the rest of the 400-line file greys out. Contrast: WHOLE FILE (dimmed) vs ONE FUNCTION (clay glow). Fast.

## S5 · ANALOGY (34.03-37.77) — like search vs scroll
VO: "It's the same move you make when you search for one thing in your editor instead of scrolling through everything."
- Split micro-beat: LEFT a Claude sprite endlessly scrolling a giant file (blur, motion), RIGHT the same sprite
  hitting Cmd+F -> one result highlighted. A "⌘F" key graphic. Relatable, quick.

## S6 · SCALE (37.77-42.18) — 40 languages, 10 steps -> 1
VO: "It works across 40 different languages, and a change that used to take Claude 10 careful steps now happens in ONE."
- `serena_langs.png` push-in with a `HiBox` on **"over 40 programming languages"** + a fan of language chips
  (Python/Rust/Go/TS/Java...). Then a "10 STEPS" -> collapses to "1" counter animation (a 10-dot chain snapping to a
  single dot). Mascot nods.

## S7 · PAYOFF + CTA (42.18-52.2) — bill drops, faster, no limit + Comment SERENA
VO: "So it does the same job on a fraction of the tokens, which means your bill DROPS, it runs faster, and you stop
slamming into your limit halfway through the day. I put the full setup and the one config that makes it click in a
guide. Comment SERENA, I'll send it over."
- Three quick payoff stat cards climb/flip: **BILL ↓**, **FASTER ⚡**, **NO LIMIT ✓** (green). The mascot cheers.
- CTA money-shot (last ~2.5s): big clean **Comment "SERENA"** pill + the real Serena logo small + a comment bubble +
  the progress-bar reward seal unlocking. Mute-readable.

## Chrome / house invariants
Single dark framed panel, cream bg, Fraunces serif captions lower-third at the house y, progress bar with a reward
seal at the CTA, clay Claude accents, mascot recurs. Music bed (seo_music) + tailored SFX (riser on hook, keyboard
ticks on the Term, whoosh on cuts, cash-register on the payoff, slam on the CTA). No em dashes. First render =
wireframe, then overhaul per [[reel-overhaul-stage]] + motion/dead-air audits.
