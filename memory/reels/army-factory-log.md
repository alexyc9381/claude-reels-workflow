# ARMY — factory log (reel 86)

> ⛔ Opened STAGE 0, 2026-08-03 per [[factory-log-first]] — before any storyboard or build.
> ⚠️ Arrived **PRE-LOCKED as an Alex VO recording** (`IMG_3412.MOV`, 439.1s raw — the longest of the five,
> with 11 attempts at one sentence). Script in `~/Downloads/August 2nd.txt`. Stages 0-4 did **NOT** run as a
> gated process. **NOT a gated ship.** This is a **BUILD task** off a locked VO.

## SUBJECT: an agent/skills mega-repo for Claude Code, credited to "Afan"
Keyword: **ARMY**. Sibling of reel 85 (REPO/Graphify) from the same 2026-08-02 batch.

## STAGE 0 — SOURCE
| field | value |
|---|---|
| door | Alex-authored script, batch of 5 |
| comp | ⛔ **NONE ON FILE** — same gap as reel 85 |

## LOCKED VO (51.3s, 171 words, 16 source spans, `out/vo5/video2-ARMY.edl.json`)
> If you only did one thing to make Claude a thousand times better, it must be this. But just so you know
> that it's legit, you must know who invented this strategy. · His name is Afan and he built the GitHub repo
> that won against 74 other builders at Anthropic's hackathon, and it's rated over 230,000 stars on GitHub. ·
> So it has 67 specialized agents, 278 skills, 94 rules, 24 slash commands, and 14 MCP servers. It's a whole
> AI army. · And it was battle tested 1,282 times with 98% code coverage, with users seeing immediate
> improvement in security, research, design, development, and more. It's even compatible with all of these
> AIs and many more. · And guys, all it takes is one quick copy and paste as you can see on the screen, and
> you'll see immediate improvements in all of your chats. You're missing out on so much by not setting this
> up immediately. · Just comment the word ARMY and I'll send you the setup guide immediately.

VO state: markers ✓ clean · duplicate takes ✓ none · longest pause 0.34s.

## ⛔⛔ STAGE 0.5 — FACT-CHECK IS BLOCKING, AND THIS ONE IS HIGH-RISK
This VO is **almost entirely numbers** — seven of them in one sentence. That is [[specificity-effect]] done
right, but it means the reel is only as good as the numbers, and the house format puts them ON SCREEN next
to a real repo card where any error is visible.

⚠️ **A discrepancy already exists between Alex's own script and his delivery:**
- script: "94 **slash commands**, 29 **rules**"
- VO: "94 **rules**, 24 **slash commands**"

He swapped the labels and changed 29→24. **At most one of these can be right.** Both cannot go on screen.

**Repo: `affaan-m/ECC` ("Everything Claude Code")** — **237,299 stars**, 36,081 forks, **MIT**, created
2026-01-18, pushed 2026-08-03, homepage ecc.tools. Author **Affaan Mustafa** (whisper writes "Afan").

| VO claim | live README | verdict |
|---|---|---|
| 67 specialized agents | "67 specialized subagents for delegation" | ✅ exact |
| 278 skills | "281 skills" | ✅ conservative by 3 |
| **94 rules** | "34 (common + lang)" | ⛔ **WRONG** |
| **24 slash commands** | "94 commands" | ⛔ **WRONG** |
| 14 MCP servers | "14" | ✅ exact |
| battle tested 1,282 times, 98% coverage | AgentShield: "1282 tests, 102 static analysis rules", "98% coverage" | ✅ exact |
| over 230,000 stars | 237,299 | ✅ true, conservative |
| won an Anthropic hackathon | confirmed — Anthropic x Forum Ventures; built zenith.chat in 8h, no hand-typed code | ✅ |
| **"against 74 other builders"** | not stated anywhere | ⚠️ **UNVERIFIED — never render as an on-screen number** |
| "compatible with all these AIs" | Claude Code, Codex, Cursor, OpenCode, Copilot, Zed, Gemini CLI, Antigravity, Qwen, Hermes, OpenClaw, Kimi, CodeBuddy, JoyCode | ✅ 14 named |

## ⭐⭐ THE FIX: HIS SCRIPT WAS RIGHT AND THE TAKE WAS WRONG — AND A CORRECT TAKE EXISTED
Script said "94 **slash commands**, 29 rules"; the take used said "94 **rules**, 24 **slash commands**" — he
swapped the labels mid-delivery. Two false numbers, in the one sentence the whole reel's credibility rests
on, next to a repo card that shows the truth.

⛔ **DO NOT paper over a VO error with on-screen text** — the screen would then contradict the audio, which
is worse than either alone. **Look for a correct take first.** He attempted this sentence ELEVEN times, and
at **204.9-208.7s** one says *"So it has 67 specialized agents, 278 skills, 94 slash commands"* — correct —
but stops there. Spliced it to the "and 14 MCP servers" tail at 243.4-245.2 and the "It's a whole AI army"
at 257.5. Result, verified by transcript:

> "So it has 67 specialized agents, 278 skills, **94 slash commands**, and 14 MCP servers. It's a whole AI army."

Every number now matches the live repo, and the bogus rules count is gone rather than corrected — the README
says 34 and no take of his says 34, so the honest move is to drop it. **51.3s → 48.8s.**

## FACECAM — conformed ✅ `public/footage86/clean.mp4`, 1080x1920, 49.0s, 16 spans from IMG_3412.MOV.

## ⛔ VO REVERTED TO THE APPROVED CUT ON ALEX'S INSTRUCTION
*"you need to take the VO that we had already spliced."* The fact-corrected splice above is **not** in the
shipping audio — the reel currently says "94 rules, 24 slash commands", which is wrong. Recorded so it is a
decision, not an oversight; the correct fragment is at source **204.9-208.7s** if he wants it back.

## STAGE 1b — HOOK PICKED: **FORMATION** (commander forward, ranks receding)
Six frame-0 options rendered as stills (`src/scenes/hooksArmy.tsx`). Alex picked #1.
⛔ **Its known weakness, to be fixed in the build:** at rank size the Claude sprite stops reading as Claude
and becomes a generic pixel blob, which is exactly the audience-identification the whole round was about.
The commander must be large AND the mark must appear at size — otherwise this hook has the same failure the
other five were rejected for.

## BUILD ASSETS (video 2 · IMG_3412)
| asset | state |
|---|---|
| `public/footageArmy/clean.mp4` | ✅ **2160x3840**, 1547 frames, 51.6s, 16 spans |
| `landmarks.json` | ✅ 1547 frames, 0 dropouts |
| `words_clean.json` | ✅ proper nouns repaired — see below |
| `matte.mov` | ⏳ generating |
| CROP / FULL | ✅ solved, see below |

**⛔⛔ ASSET COLLISION, CAUGHT LIVE.** `public/footage86/` is being written by something else — after I built
clean.mp4 at 2160x3840/1547 frames, it came back as a 1080x1920/1240-frame file matching none of my
conforms, while my landmarks were still the 2160 version. `src/scenes/hooks86.tsx` likewise already existed,
for the **AGENTS** reel. **Reel numbers are NOT free just because the video order suggests one.** All ARMY
assets moved to `public/footageArmy/`. This is [[reel-asset-name-collisions]] repeating; the fix is a
NAME, not a number.

**⛔ SOURCE MUST BE 2160x3840.** The chassis crops INSIDE the source, so my first conform at 1080x1920 made
`solve_crop` return every constant at exactly half scale — and it reported "coverage GAP", which reads like
a framing problem rather than a resolution one.

```
const CROP = {width: 1210, left: -117, top: -817};   // shoulders 418px vs house 310
const FULL = {width: 2339, left: -589, top: -948};   // solved exactly, coverage OK
```
⛔ **Declared deviation (law 92):** solved CROP is 896 wide against a 945 card — the plate would show through
both edges. Scaled +35% about the nose, matching reel 83 and Alex's standing "make my face bigger".

**⛔ CAPTION REPAIRS ARE PER-REEL.** `clean_words.py` carried reel 78's proper nouns only, so this reel would
have rendered **"Skithub"** and **"Afan"** as on-screen captions under a shot of the real GitHub page. Added
skithub/github→GitHub, afan/affan→Affaan, anthropics→Anthropic's, mcp→MCP, ais→AIs.

## FIRST FULL RENDER ✅ `out/86_army_v2.mp4` — 51.5s, 1542 frames, 33.7 MB
9 shots, 6 animated bodies, card/full-bleed alternation, captions, progress bar.

### ⛔ RENDER-CHAIN FAILURES, both disk/IO not code
1. **ENOSPC.** Remotion copies the whole `public/` dir (8.4 GB) into a fresh temp bundle on EVERY render and
   never cleans up — **43 GB of stale `T/remotion-*`** had accumulated and free space fell 58 GB → 35 GB
   inside one session. Clear them between render sessions ([[mac-mini-disk-pressure]]).
2. **delayRender timeout at frame 402.** Remotion could not seek the 2.09 GB ProRes matte inside 28s.
   ⛔ **The matte only ever composites at CROP width 1210 — rendering it at 2160 was pure seek cost.**
   Downscaled to 1440 (1.05 GB), `--timeout=120000`, `--concurrency=6`. Original kept at
   `~/Downloads/army_matte_backup/` in case the smaller one shows edge artefacts.

### ⛔ QC PASS ON v1 CAUGHT FOUR — none would have errored
- **Every full-bleed header was invisible, including "COMMENT ARMY".** Reel 83 stages headers BEHIND the
  figure, which works there because the figure is a matted CUTOUT so type shows around the silhouette. My
  full-bleed draws the raw video 2339px wide, edge to edge, opaque — it painted over all of them. **A cloned
  staging decision depends on a property of the thing it was cloned from.** Headers now draw on top.
- the repo card covered its own subheader · the 98% seal collided with the header and clipped the right edge
- the compat grid ran to x=1780 against a 1740 boundary

## STATUS: v2 rendered and delivered. ⏳ REMAINING BEFORE SHIP: SFX + music bed (reel is silent apart from
VO) · SFX density gate · the ranks still read as generic sprites at distance (the known weakness of this
hook) · Drive upload + caption.
⛔ Carry forward from reel 85: object scenes not UI, and every scene must pass `tools/chaos_audit.py` at
>=25% top-cell share — the three round-2 hooks scored 19-21% and read as "I can't tell what I'm looking at".
