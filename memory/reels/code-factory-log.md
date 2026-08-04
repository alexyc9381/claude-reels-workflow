# CODE — factory log (reel 86)

> ⛔ Opened STAGE 0, 2026-08-03 per [[factory-log-first]] — before any storyboard or build.
> ⚠️ Arrived **PRE-LOCKED as an Alex VO recording** (`IMG_3413.MOV`, 246.2s raw, 10 "cut cut" retakes),
> script supplied in `~/Downloads/August 2nd.txt`. Stages 0-4 did **NOT** run as a gated process.
> **NOT a gated ship** — same status as SERENA/TOOL/POSTS/ARSENAL/REPO. This is a **BUILD task**.

## SUBJECT: three Chinese Claude Code alternatives. Keyword **CODE**.

## STAGE 0 — SOURCE
| field | value |
|---|---|
| door | Alex-authored script, batch of 5 recorded 2026-08-02 |
| comp | ⛔ **NONE ON FILE** — same gap as REPO (reel 85). Flagged, not hidden. |

## LOCKED VO (cut 2026-08-03, 34.7s, EDL `out/vo5/video3-CODE.edl.json`)
> China has killed Claude Code with these three Claude Code alternatives. · First, MiMo Code by Xiaomi. It's
> completely free open source, plus you don't need to register an account to use it. It runs on MiMo v2.5,
> which is better than Claude Sonnet 4.5 on many benchmarks. · Second, Z Code. It uses GLM 5.2, which is
> better than Opus 5 on many benchmarks, plus you get millions of free tokens every single day. · Third, Qwen
> Code. It's a great alternative for those who use Claude Code in the terminal, and it comes with 2,000 free
> requests every single day. · And it's not just these three. There's Kimi Code CLI and CodeArts Snap by
> Huawei that come with generous free limits every single day. You need to try them all. · Comment CODE and
> I'll share the guide immediately.

VO state: markers ✓ clean · duplicate takes ✓ none · longest pause 0.34s (tightest of the five).

## ⛔⛔ STAGE 0.5 — FACT-CHECK IS THE WHOLE RISK ON THIS ONE
**This video names five products and makes eight checkable claims about benchmarks, pricing and limits.**
That is far more exposure than REPO (one product, one claim). The house format puts genuine screenshots on
screen, so a wrong claim becomes a wrong claim *the viewer can see*. And unlike REPO, a benchmark claim that
was true in July can be false in August.

Claims to verify, each blocking:
1. **MiMo Code / Xiaomi** — exists · free · open source · **no account needed** · runs MiMo v2.5 · "better than Claude Sonnet 4.5 on many benchmarks"
2. **Z Code** — exists · uses **GLM 5.2** · "better than Opus 5 in coding on several benchmarks" · "millions of free tokens every day"
3. **Qwen Code** — exists · terminal CLI · **2,000 free requests/day**
4. **Kimi Code CLI** — exists · generous free limits
5. **CodeArts Snap / Huawei** — exists · generous free limits
6. Framing: "China has killed Claude Code" — hyperbole, VO only, ⛔ never an on-screen stat

### RESULT (2026-08-03) — ⛔⛔ TWO CLAIMS ARE FALSE. THIS IS A BLOCKER.

| VO claim | verdict | evidence |
|---|---|---|
| MiMo Code exists, free, open source | ✅ | `github.com/XiaomiMiMo/MiMo-Code`, **MIT** |
| runs MiMo V2.5 (Pro) | ✅ | 1.02T-param MoE, 42B active, 1M context |
| "better than Claude Sonnet on many benchmarks" | ⚠️ **shaky** | beats **Claude Code** — SWE-bench Verified **82 vs 79**, SWE-bench Pro 62 vs 55, Terminal Bench 2 73 vs 69. But ⛔ **all self-reported by Xiaomi, zero independent verification**, and the comparison is against the *harness*, not "Sonnet 4.5" the model |
| "don't need to register a login" | ❓ unverified | could not confirm; do not put on screen |
| Z Code exists, uses GLM 5.2 | ✅ | Zhipu's official coding IDE; GLM 5.2 = 744B MoE, MIT open weights |
| "millions of free tokens every day" | ✅ **understated** | **3 million tokens/day** free |
| **"better than Opus 5 in coding on several benchmarks"** | ⛔ **FALSE** | GLM 5.2 is ~**1 point BEHIND** Opus 4.8 on FrontierSWE, and **62.1% vs 69.2%** on SWE-Bench Pro. It *rivals* Opus at **1/5 the cost** and beats GPT-5.5 on FrontierSWE — but it does not beat Opus. Also the VO says "Opus 5"; every published comparison is against **Opus 4.8** |
| Qwen Code, terminal, 2,000 free requests/day | ✅ | + 60 req/min, 1M context, qwen3-coder-plus/flash. Needs a qwen.ai OAuth login |
| **Kimi Code CLI "generous free limits"** | ⛔ **FALSE** | the free **Adagio** plan explicitly **excludes Kimi Code tools**; Kimi Code starts at **Moderato $19/mo** |
| CodeArts Snap (Huawei) "generous free limits" | ✅ | free **public beta**, PanGu-based |
| "China has killed Claude Code" | ⚠️ hyperbole | VO framing only — ⛔ never an on-screen stat |

⛔ **WHY THIS BLOCKS THE BUILD.** The house GitHub format puts genuine screenshots on screen, so a false
benchmark claim becomes a claim the viewer can check *in the same frame*. And this is the most
benchmark-literate audience on the platform — a wrong SWE-Bench number is the single fastest way to lose
them, and the comment section will carry the correction. **Reel 69 (SERENA) only worked because every claim
checked out first;** that is the precedent.

⭐ **The true numbers are BETTER than the false ones anyway.** "3 million free tokens a day", "MIT open
weights", "a fifth of the cost of Opus", "2,000 free requests a day", "82 vs 79 on SWE-bench Verified" are
all specific, verifiable and impressive ([[specificity-effect]]). The claim that had to be invented is the
only weak part of the script.

## FACECAM — conformed ✅
`public/footage86/clean.mp4`, 1080x1920, **34.9s**, cut from `IMG_3413.MOV` with the VO's own 11 source spans.
⛔ CROP IS PER-SHOOT (law 92) — same shoot day as REPO but solve from landmarks on THIS footage.

## STATUS: ⛔ BLOCKED at Stage 0.5 pending Alex's call on the two false claims. Facecam is conformed and
ready. Recommended fix = re-record two short lines (Z Code, Kimi), which keeps every other beat intact.
