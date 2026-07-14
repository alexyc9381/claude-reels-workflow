# OUTLIER RANKING — modeled videos by lift over each creator's own median
> Selection rule (SHARED-CONTEXT): model/teardown/mine ONLY genuine outliers (lift ≥ ~2x the creator's median), not raw views. Lift = video views ÷ that creator's recent-catalog median (per platform). Medians from ~45 recent uploads pulled 2026-07-12; recompute when re-fetched.

## Creator outlier tiers (who's worth modeling)
- **🔥 Outlier machines (model freely):** mavgpt (ERASE 106x, PHOTO 60x), cindiezhu (creative-studio 143x), raycfu (dev-team 60x), rileybrown (1M = 21x). Their hits run 20-140x their own median = pure signal.
- **✅ Moderate (model their TOP 3-4 only):** nateherk, nicksaraev, gregisenberg — biggest are 3-14x, but their lower picks sit at baseline (flagged ⚠️ below), so don't copy those topics.
- **⚠️ Weak (deprioritize):** sabrinaramonov — only ONE real outlier (66.6K TikTok, 7x "free prompts daily"); her other 8 videos are 1.0-1.9x median (baseline). She was added on raw-ish views, not lift. Use only her 7x hit, or drop her.


## mavgpt
Median(s): tiktok=12,300

| lift | views | platform | video |
|---|---|---|---|
| 105.7x 🔥 | 1,300,000 | tiktok | ERASE |
| 59.8x 🔥 | 735,000 | tiktok | PHOTO |
| 35.9x 🔥 | 442,000 | tiktok | IDENTITY |
| 32.4x 🔥 | 398,000 | tiktok | COLORS |
| 28.4x 🔥 | 349,000 | tiktok | STACK |
| 20.0x 🔥 | 246,000 | tiktok | HUMAN |
| 17.8x 🔥 | 219,000 | tiktok | DESIGN |

## raycfu
Median(s): tiktok=6,887, youtube=8,500

| lift | views | platform | video |
|---|---|---|---|
| 60.5x 🔥 | 417,000 | tiktok | Dev team with 4 AI Agents in Claude |
| 8.9x 🔥 | 61,000 | tiktok | Build a $80k/month AI Agency with Kimi |
| 7.9x 🔥 | 54,500 | tiktok | Make your resume unrejectable with Claude |
| 5.9x 🔥 | 50,000 | youtube | 8 Claude Skills that actually matter |
| 5.3x 🔥 | 36,400 | tiktok | Quants use Loop Engineering to build a trading bot |
| 4.7x ✅ | 40,000 | youtube | Free AI Certification from Claude |
| 3.5x ✅ | 30,000 | youtube | They made $3M from one Claude System |
| 3.4x ✅ | 29,000 | youtube | 5 Claude prompts to make you $500/day |

## nateherk
Median(s): youtube=48,500

| lift | views | platform | video |
|---|---|---|---|
| 3.3x ✅ | 161,000 | youtube | Google's New Tool Just Solved A Major Claude Code Pr |
| 3.1x ✅ | 148,000 | youtube | How I Build $10,000 Apple-Style Websites with Claude |
| 3.0x ✅ | 146,000 | youtube | Claude Fable 5 Made This Entire Video By Itself |
| 2.4x ✅ | 116,000 | youtube | How Claude is Creating a New Generation of Millionai |
| 2.4x ✅ | 115,000 | youtube | The Skill That 10x'd My Claude Code Projects |
| 2.2x ✅ | 105,000 | youtube | How to Use Claude Code for 99% CHEAPER |
| 2.1x ✅ | 100,000 | youtube | Claude Mythos is Finally Here |
| 1.4x ⚠️ weak | 67,000 | youtube | 5 Claude Code Hacks to Build Beautiful Websites |
| 1.3x ⚠️ weak | 65,000 | youtube | Claude Code Builds n8n Workflows INSTANTLY... and Be |
| 1.3x ⚠️ weak | 64,000 | youtube | Andrej Karpathy Just 10x'd Everyone's Claude Code |
| 1.3x ⚠️ weak | 61,000 | youtube | Seedance 2.0 + Claude Code = Beautiful $10k Websites |

## nicksaraev
Median(s): youtube=66,000

| lift | views | platform | video |
|---|---|---|---|
| 4.8x ✅ | 314,000 | youtube | Claude Code + Nano Banana 2 + Kling = $15K Animated  |
| 3.8x ✅ | 254,000 | youtube | Gemini 3.1 Pro + Antigravity Destroys Every Site Des |
| 3.2x ✅ | 210,000 | youtube | Claude Routines Just Dropped, And It's Perfect |
| 2.9x ✅ | 194,000 | youtube | Clawdbot Sucks, Actually |
| 2.7x ✅ | 176,000 | youtube | Claude Managed Agents Just Dropped, And It Kills n8n |
| 2.5x ✅ | 168,000 | youtube | Claude Code + Karpathy Autoresearch = The New Meta |
| 2.5x ✅ | 162,000 | youtube | Stop Fixing Your Claude Skills. Autoresearch Does It |

## cindiezhu
Median(s): tiktok=2,051

| lift | views | platform | video |
|---|---|---|---|
| 142.5x 🔥 | 292,400 | tiktok | 7 Claude skills to run an entire creative studio |
| 12.5x 🔥 | 25,600 | tiktok | The 4 Skills that make your resume unrejectable |
| 6.0x 🔥 | 12,300 | tiktok | Claude x Nanobanana can redesign your entire house n |
| 3.7x ✅ | 7,564 | tiktok | How people are creating these 10/10 carousels |
| 2.8x ✅ | 5,828 | tiktok | Build a $10k-looking website with no coding |
| 2.8x ✅ | 5,645 | tiktok | I let Claude run overnight and woke up to 50 studio- |
| 1.3x ⚠️ weak | 2,693 | tiktok | How to turn Claude into an actual intellectual sparr |
| 1.1x ⚠️ weak | 2,280 | tiktok | How to recreate any site you love with Claude Code |

## gregisenberg
Median(s): youtube=54,000

| lift | views | platform | video |
|---|---|---|---|
| 13.6x 🔥 | 734,000 | youtube | How to 10x your Claude with 4 .md files |
| 11.1x 🔥 | 597,000 | youtube | Claude Code + Obsidian in under 1 minute |
| 7.8x 🔥 | 419,000 | youtube | Claude Code Clearly Explained |
| 5.6x 🔥 | 300,000 | youtube | The future of building startups is building micro-st |
| 1.9x ⚠️ weak | 102,000 | youtube | Claude Cowork Explained |
| 1.7x ⚠️ weak | 90,000 | youtube | How to use Claude Code to launch 100+ Facebook ads |
| 1.6x ⚠️ weak | 86,000 | youtube | Hermes Agent Explained |
| 1.5x ⚠️ weak | 82,000 | youtube | How to make $$ with OpenClaw |

## rileybrown
Median(s): youtube=23,000, tiktok=48,200

| lift | views | platform | video |
|---|---|---|---|
| 20.7x 🔥 | 1,000,000 | tiktok | Oh my.. this shouldn't be possible (Tinder/Hinge pro |
| 14.6x 🔥 | 704,700 | tiktok | What happens when you give OpenClaw access to Blende |
| 8.0x 🔥 | 183,000 | youtube | Claude is so much better when you use MCP |
| 7.4x 🔥 | 357,200 | tiktok | Claude Code is now my video editor |
| 6.2x 🔥 | 142,000 | youtube | With Codex and GPT 5.5 you can just do things |
| 5.0x 🔥 | 116,000 | youtube | OpenClaw Blender part 2 |
| 3.2x ✅ | 154,300 | tiktok | You need to learn OpenClaw |

## sabrinaramonov
Median(s): tiktok=9,455, youtube=14,000

| lift | views | platform | video |
|---|---|---|---|
| 7.0x 🔥 | 66,600 | tiktok | I asked ChatGPT (free prompts daily) |
| 1.9x ⚠️ weak | 18,000 | tiktok | ChatGPT erases your digital identity from the intern |
| 1.7x ⚠️ weak | 24,000 | youtube | How I'd Become an AI Millionaire in 2026 |
| 1.7x ⚠️ weak | 16,200 | tiktok | Vibe coding tiers |
| 1.6x ⚠️ weak | 22,000 | youtube | 12 Ways to Make Money in 2026 (with AI) |
| 1.2x ⚠️ weak | 11,400 | tiktok | Claude routines |
| 1.0x ⚠️ weak | 14,000 | youtube | You're Not Behind on AI Yet. Here's How to Catch Up |
| 1.0x ⚠️ weak | 14,000 | youtube | The AI Playbook Every Business Owner Needs |
| 0.9x ⚠️ weak | 12,000 | youtube | Claude Built Him a Faceless Video Factory (Full Brea |

## ⚠️ Modeled videos that are NOT strong outliers (deprioritize / don't copy the topic)
- nateherk: "5 Claude Code Hacks to Build Beautiful W" only 1.4x median — NOT a strong outlier
- nateherk: "Claude Code Builds n8n Workflows INSTANT" only 1.3x median — NOT a strong outlier
- nateherk: "Andrej Karpathy Just 10x'd Everyone's Cl" only 1.3x median — NOT a strong outlier
- nateherk: "Seedance 2.0 + Claude Code = Beautiful $" only 1.3x median — NOT a strong outlier
- cindiezhu: "How to turn Claude into an actual intell" only 1.3x median — NOT a strong outlier
- cindiezhu: "How to recreate any site you love with C" only 1.1x median — NOT a strong outlier
- gregisenberg: "Claude Cowork Explained" only 1.9x median — NOT a strong outlier
- gregisenberg: "How to use Claude Code to launch 100+ Fa" only 1.7x median — NOT a strong outlier
- gregisenberg: "Hermes Agent Explained" only 1.6x median — NOT a strong outlier
- gregisenberg: "How to make $$ with OpenClaw" only 1.5x median — NOT a strong outlier
- sabrinaramonov: "ChatGPT erases your digital identity fro" only 1.9x median — NOT a strong outlier
- sabrinaramonov: "How I'd Become an AI Millionaire in 2026" only 1.7x median — NOT a strong outlier
- sabrinaramonov: "Vibe coding tiers" only 1.7x median — NOT a strong outlier
- sabrinaramonov: "12 Ways to Make Money in 2026 (with AI)" only 1.6x median — NOT a strong outlier
- sabrinaramonov: "Claude routines" only 1.2x median — NOT a strong outlier
- sabrinaramonov: "You're Not Behind on AI Yet. Here's How " only 1.0x median — NOT a strong outlier
- sabrinaramonov: "The AI Playbook Every Business Owner Nee" only 1.0x median — NOT a strong outlier
- sabrinaramonov: "Claude Built Him a Faceless Video Factor" only 0.9x median — NOT a strong outlier
