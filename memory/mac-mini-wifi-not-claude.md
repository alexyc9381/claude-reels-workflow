---
name: mac-mini-wifi-not-claude
description: "Alex's Mac mini \"bad internet\" is a 2.4GHz Wi-Fi problem (Ethernet unplugged) — NOT caused by Claude or big chat files"
metadata: 
  node_type: memory
  type: project
  originSessionId: 0cb72da5-f672-4f25-920d-831a9780511b
---

When Alex says the Mac mini "has such bad internet / doesn't even work" while his MacBook is fine, it is **not** Claude and **not** the big transcripts (transcript files sit on disk and use zero bandwidth — he has theorized otherwise; correct this gently).

Measured 2026-07-14 on the mini (Mac mini M4, 16 GB):
- **Ethernet `en0` = `status: inactive`** → the cable is simply NOT PLUGGED IN; it runs on Wi-Fi `en1` (192.168.1.37, gw 192.168.1.1)
- Wi-Fi is stuck on **2.4 GHz, channel 4, 20 MHz**, **Transmit Rate: 8 Mbps**, signal −65 dBm — on an 802.11ax radio
- Real throughput: **13.3 Mbps then 1.3 Mbps** on back-to-back tests (10x collapse = unstable link)
- Ping 1.1.1.1: 0% loss but 15→122 ms, stddev 31 ms (heavy jitter)
- DNS = the router (192.168.1.1); an `nslookup` took **2.0 s**
- The router DOES broadcast 5 GHz (ch 153, 80 MHz) — the MacBook is fine because it associates to 5 GHz

**Fixes, in order:** (1) plug an Ethernet cable into the mini — it's a stationary desktop, this solves it outright; (2) if Wi-Fi only, split the SSID so 5 GHz has its own name and join that; (3) set DNS to 1.1.1.1 / 8.8.8.8 instead of the router.

**Re-checked 2026-07-16 — STILL UNFIXED, none of the three applied.** `en0` still `status: inactive` (cable still not plugged in). Still 2.4 GHz ch 4 / 20 MHz, now **MCS Index 0** (the slowest modulation the radio can pick) at −67 dBm. Neighbours squat on ch 6 and ch 11, which overlap ch 4. Three 5 GHz networks visible (ch 48, 153, 157); the radio supports 5 **and** 6 GHz.

⭐ **Best single diagnostic — ping the gateway, not the internet:** `ping -c 10 192.168.1.1` → min 2.9 ms / **max 131 ms / stddev 46.6 ms**. That's one hop, same room. A healthy link is a flat 2–5 ms. A 45x spread to your OWN router proves the fault is the wireless hop — not the ISP, not Anthropic, not Claude. Use this instead of a speedtest; throughput can look fine (~29 Mbps, 0% loss) while the link is still unusable-jittery, so a speedtest alone will mislead. DNS latency had recovered by 07-16 (0.045 s), so fix (3) is now the least urgent.

Note: the mini has **THREE** simultaneous problems that feel like one — this Wi-Fi issue (network), mega-chats freezing the app ([[claude-code-freeze-transcript-bloat]]), and macOS jetsam OOM-killing Claude ([[claude-crash-jetsam-oom]]). Keep all three separate when diagnosing. This Wi-Fi fault causes stalls/timeouts but does NOT cause the "crashes."
