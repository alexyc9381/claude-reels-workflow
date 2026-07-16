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

Note: the mini had TWO simultaneous problems that felt like one — this Wi-Fi issue (network) and 158 MB mega-chats freezing the app (see [[claude-code-freeze-transcript-bloat]]). Keep them separate when diagnosing.
