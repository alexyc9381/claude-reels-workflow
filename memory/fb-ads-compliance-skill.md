---
name: fb-ads-compliance-skill
description: "Standing rule — invoke the fb-ads-compliance skill before any Meta/FB ad copy, creative, targeting, or campaign work"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 9007e26d-ed27-4294-bdbf-43a014859521
---

Standing rule (set 2026-06-20): before producing or editing ANY Facebook/Instagram (Meta) ad — copy, creative, targeting, or campaign/API build — invoke the **`fb-ads-compliance`** skill (personal skill at `~/.claude/skills/fb-ads-compliance/`, also `/fb-ads-compliance`). It's the compliance gate that keeps ads from being rejected and the account from being banned.

**Why:** Alex asked for a reusable skill so all future Matchtern ad work is Meta-compliant by default, after research found his shipped campaign config had a real ban-risk setting.

**How to apply:** Run its pre-flight checklist on every ad. Key load-bearing facts it encodes:
- **Matchtern's Special Ad Category = OPEN gray-area call** (Alex is sitting with it, leaning "program, not placement"). Hinges on framing: ad/LP promoting **internship placement** → **Employment** (career placement is in scope); ad/LP promoting a genuine **program/admissions outcome** → likely **NONE**. Determination follows what the *ad* says, not intent. (Corrects an earlier flat assumption either way.)
- Declaring Employment removes targeting levers (age/gender/ZIP/lookalikes/some interests) — reach parents via creative + broad geo, not an age gate; can't age-gate out under-18s.
- Copy rules: no personal-attribute or financial-status implications, no sensational/fear hooks ("found out too late"), no guaranteed-outcome claims.
- Automating via the **official Marketing API is fine** (not a ban trigger); bot-driving the UI / scraping / multi-account is what's risky.

Affects [[matchtern-meta-campaign-builder]] (its `special_ad_categories` stays `[]` until the gray-area call is made; → EMPLOYMENT + targeting refit only if placement-framed) and [[matchtern-primary-messaging]] (copy rules). The skill now also bundles post-Andromeda PERFORMANCE playbooks: `references/roas-best-practices.md` (expert/blog consensus) and `references/creator-video-playbook.md` (what top VIDEO creators say — Ben Heath, Nick Theriot, Chase Chappell, Sam Piliero, Jordan Platten, Savannah Sanchez, Dara Denney, Charley Tichenor, Jon Loomer, etc.: settings on/off table, campaign types, money-wasters). Both fact-checked + post-Andromeda. Plus `references/competitor-ad-teardown.md` (HS-internship/admissions competitor ad teardown + how-to-research-with-Ad-Library/Foreplay). **Key OBSERVED finding (live Meta Ad Library, 2026-06-21):** the internship-placement rivals (Ladder, Leangap) and research leader (Polygence) run **NO** US Meta ads; the heavy Meta advertisers are admissions *consultancies* — **Crimson** (video, "1,800+ Ivy/Stanford, 7x", CTA "Book a free consultation", a creative live since Oct 2025) and **Empowerly** ("98% into top US colleges", static → site). So Meta is **white space for the real-internship-placement angle to parents**; model Crimson's free-consult funnel. The Meta **Ad Library is readable via a full browser (Playwright)** even though plain WebFetch gets 403 — use the browser for primary checks; no Foreplay connector exists in this env (Foreplay has its own paid API; free Ad Library API is the no-cost path). Verbatim policy + sources in `references/policy-details.md`.
