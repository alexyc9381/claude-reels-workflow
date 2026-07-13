import os, json

HOME = os.path.expanduser("~")
DL = os.path.join(HOME, "Downloads")

CREATORS = {
  "nateherk": {
    "who": "Nate Herk (@nateherk YouTube 820K / @nateherkai IG) — advanced Claude Code / AI-agent builder lane; short-form reels lead TOFU, depth gated in the DM",
    "src": "YouTube auto-captions (official), cleaned. Views/titles from channel listing 2026-07-12.",
    "items": [
      ("0A3NGrPlp_w",161000,"Google's New Tool Just Solved A Major Claude Code Problem","short"),
      ("AUoYldwt_sA",148000,"How I Build $10,000 Apple-Style Websites with Claude Code","short"),
      ("ONmaDdOBGig",146000,"Claude Fable 5 Made This Entire Video By Itself","6min"),
      ("pbrln2TVeh4",116000,"How Claude is Creating a New Generation of Millionaires","10min"),
      ("c0kaKxM2pHg",115000,"The Skill That 10x'd My Claude Code Projects","7min"),
      ("F3nYY3N2wgw",105000,"How to Use Claude Code for 99% CHEAPER","short"),
      ("dYrrEKXtttk",100000,"Claude Mythos is Finally Here","9min"),
      ("HF7eymL2-MM",67000,"5 Claude Code Hacks to Build Beautiful Websites","short"),
      ("4YJUHyfrTIw",65000,"Claude Code Builds n8n Workflows INSTANTLY... and Better Than Me","short"),
      ("p9mgmKhUz_4",64000,"Andrej Karpathy Just 10x'd Everyone's Claude Code","short"),
      ("EeY8wqJ5BOI",61000,"Seedance 2.0 + Claude Code = Beautiful $10k Websites","short"),
    ],
  },
  "nicksaraev": {
    "who": "Nick Saraev (@nicksaraev YouTube 457K) — Claude Code / Codex / n8n / money-receipts lane; specific $ result + 'I built it with Claude' + 'here's the exact system'",
    "src": "YouTube auto-captions (official), cleaned. Views/titles from channel listing 2026-07-12. (Multi-hour 'FULL COURSE' videos excluded — off short-form format.)",
    "items": [
      ("ZfYvv-0l9NA",314000,"Claude Code + Nano Banana 2 + Kling = $15K Animated Sites","14min"),
      ("czLrUyA_Bh4",254000,"Gemini 3.1 Pro + Antigravity Destroys Every Site Designer","10min"),
      ("j3aXJNu9804",210000,"Claude Routines Just Dropped, And It's Perfect","18min"),
      ("esXXuejofgk",194000,"Clawdbot Sucks, Actually","9min"),
      ("Ob5Vu-gD3mo",176000,"Claude Managed Agents Just Dropped, And It Kills n8n","17min"),
      ("4Cb_l2LJAW8",168000,"Claude Code + Karpathy Autoresearch = The New Meta","25min"),
      ("qKU-e0x2EmE",162000,"Stop Fixing Your Claude Skills. Autoresearch Does It For You","17min"),
    ],
  },
  "cindiezhu": {
    "who": "Cindy Zhu (@cindiezhu ~55K IG, TikTok mirror) — accessible no-jargon AI-for-non-technical lane; persona + plain-English outcome, show the real thing, friendly-friend voice, one-word comment gate",
    "src": "TikTok mirror @cindiezhu, downloaded no-login via yt-dlp, transcribed faster-whisper base.en (light ASR noise on proper nouns: Remotion/Nanobanana/Claude). Her median ~2-3K, so 292K/25K/12K are large outliers.",
    "items": [
      ("7636813735398575367",292400,"7 Claude skills to run an entire creative studio",""),
      ("7641300267593469202",25600,"The 4 Skills that make your resume unrejectable",""),
      ("7632761208482909448",12300,"Claude x Nanobanana can redesign your entire house now",""),
      ("7634806651534544136",7564,"How people are creating these 10/10 carousels",""),
      ("7656321897537293584",5828,"Build a $10k-looking website with no coding",""),
      ("7657682702983793927",5645,"I let Claude run overnight and woke up to 50 studio-level assets",""),
      ("7648954435200240914",2693,"How to turn Claude into an actual intellectual sparring partner",""),
      ("7659909192626605330",2280,"How to recreate any site you love with Claude Code",""),
    ],
  },
}

for name, cfg in CREATORS.items():
    d = os.path.join(DL, f"{name}-transcripts")
    # write metadata.json
    meta = {"creator": name, "who": cfg["who"], "source": cfg["src"],
            "videos": [{"id": i, "views": v, "title": t, "len": l} for (i,v,t,l) in cfg["items"]]}
    json.dump(meta, open(os.path.join(d, "metadata.json"), "w"), indent=2)
    # build compilation md, ordered by views desc
    out = [f"# {name} — top-outlier transcripts (fetched 2026-07-12)",
           cfg["who"], "", f"Source: {cfg['src']}", ""]
    got = 0
    for (i,v,t,l) in cfg["items"]:
        p = os.path.join(d, f"{i}.txt")
        if not os.path.exists(p): 
            out.append(f"## {t} — {v//1000}K views [{i}] — MISSING TRANSCRIPT\n"); continue
        txt = open(p, encoding="utf-8").read().strip()
        wc = len(txt.split())
        tag = f", {l}" if l else ""
        out.append(f"## {t} — {v:,} views ({wc} words{tag}) [{i}]\n\n{txt}\n")
        got += 1
    open(os.path.join(d, f"{name}-top-transcripts.md"), "w", encoding="utf-8").write("\n".join(out))
    print(f"{name}: compilation built, {got} transcripts, metadata.json written")
