import React from "react";
import { Img, staticFile } from "remotion";
import { fraunces, frauncesItalic, inter } from "./fonts";

// ===== cohesive premium brand "VERDE" (botanical skincare) — real design samples for the DESIGN reel =====
const GR = "#1E4035", DEEP = "#142A24", CR = "#F5F0E6", GOLD = "#BE9A45", SAGE = "#92A593", INKG = "#23201A";
const SER = fraunces.fontFamily, SERI = frauncesItalic.fontFamily, SAN = inter.fontFamily;
const grad = (a: string, b: string) => `linear-gradient(158deg, ${a} 0%, ${b} 100%)`;
const Leaf: React.FC<{ s: number; c: string }> = ({ s, c }) => (<svg width={s} height={s} viewBox="0 0 24 24" fill={c}><path d="M12 2C7 4 4 8 4 13c0 4 3 7 8 7 0-5 2-9 7-12-3 0-5 1-7 3 0-3 0-6 0-9z" /></svg>);
const Logo: React.FC<{ c: string; size: number }> = ({ c, size }) => (<div style={{ display: "flex", alignItems: "center", gap: size * 0.28 }}><Leaf s={size} c={c} /><span style={{ fontFamily: SER, fontWeight: 900, fontSize: size, letterSpacing: size * 0.06, color: c }}>VERDE</span></div>);
const Stars: React.FC<{ c: string; size: number }> = ({ c, size }) => (<span style={{ color: c, fontSize: size, letterSpacing: size * 0.1 }}>★★★★★</span>);

// 1080x1080 social posts
export const Post1: React.FC = () => (
  <div style={{ width: 1080, height: 1080, background: CR, padding: 90, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
    <Logo c={GR} size={44} />
    <div><div style={{ fontFamily: SER, fontWeight: 900, fontSize: 188, lineHeight: 0.94, color: GR, letterSpacing: "-0.03em" }}>Glow<br />from<br /><span style={{ position: "relative" }}>within.<span style={{ position: "absolute", left: 0, right: -10, bottom: 14, height: 12, background: GOLD, opacity: 0.7, zIndex: -1 }} /></span></div></div>
    <div style={{ fontFamily: SAN, fontWeight: 600, fontSize: 32, color: SAGE, letterSpacing: "0.04em" }}>Botanical skincare, made simple.</div>
  </div>);
export const Post2: React.FC = () => (
  <div style={{ width: 1080, height: 1080, background: GR, padding: 90, position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}><Logo c={CR} size={44} /><div style={{ width: 130, height: 130, borderRadius: "50%", background: GOLD, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: SER, fontWeight: 900, fontSize: 30, color: DEEP, transform: "rotate(12deg)" }}>NEW</div></div>
    <div style={{ fontFamily: SERI, fontStyle: "italic", fontWeight: 700, fontSize: 150, lineHeight: 0.98, color: CR, letterSpacing: "-0.02em" }}>The ritual<br />your skin<br />deserves.</div>
    <div style={{ fontFamily: SAN, fontWeight: 800, fontSize: 36, color: GOLD }}>Shop the collection →</div>
  </div>);
export const Post3: React.FC = () => (
  <div style={{ width: 1080, height: 1080, background: CR, padding: 90, position: "relative", display: "flex", flexDirection: "column", justifyContent: "center" }}>
    <div style={{ position: "absolute", top: 90, right: 90, width: 250, height: 250, borderRadius: "50%", background: GR, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", transform: "rotate(-10deg)" }}><span style={{ fontFamily: SER, fontWeight: 900, fontSize: 96, color: GOLD, lineHeight: 0.9 }}>20%</span><span style={{ fontFamily: SAN, fontWeight: 800, fontSize: 34, color: CR, letterSpacing: "0.1em" }}>OFF</span></div>
    <div style={{ fontFamily: SER, fontWeight: 900, fontSize: 160, lineHeight: 0.94, color: GR, letterSpacing: "-0.03em" }}>Your first<br />order.</div>
    <div style={{ marginTop: 44, fontFamily: SAN, fontWeight: 700, fontSize: 40, color: INKG }}>code <span style={{ background: GOLD, padding: "4px 18px", borderRadius: 10, color: DEEP, fontWeight: 900 }}>GLOW20</span></div>
    <div style={{ position: "absolute", bottom: 90, left: 90 }}><Logo c={GR} size={40} /></div>
  </div>);
export const Post4: React.FC = () => (
  <div style={{ width: 1080, height: 1080, background: DEEP, padding: 90, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
    <Logo c={CR} size={44} />
    <div><div style={{ fontFamily: SER, fontWeight: 900, fontSize: 320, lineHeight: 0.82, color: GOLD, letterSpacing: "-0.04em" }}>94%</div>
      <div style={{ fontFamily: SERI, fontStyle: "italic", fontWeight: 600, fontSize: 60, color: CR, marginTop: 18, lineHeight: 1.05 }}>saw visibly glowing skin in 4 weeks.</div></div>
    <Stars c={GOLD} size={50} />
  </div>);

// 1080x1350 ad
export const AdCreative: React.FC = () => (
  <div style={{ width: 1080, height: 1350, background: GR, padding: 84, display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden" }}>
    <div style={{ position: "absolute", right: -160, top: -160, width: 620, height: 620, borderRadius: "50%", background: "rgba(190,154,69,0.18)" }} />
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative" }}><Logo c={CR} size={48} /><span style={{ fontFamily: SAN, fontWeight: 800, fontSize: 28, color: GOLD, border: `2px solid ${GOLD}`, borderRadius: 999, padding: "8px 22px" }}>Bestseller</span></div>
    <div style={{ position: "relative" }}><div style={{ fontFamily: SER, fontWeight: 900, fontSize: 150, lineHeight: 0.96, color: CR, letterSpacing: "-0.03em" }}>Your skin's<br />new ritual.</div>
      <div style={{ marginTop: 28, fontFamily: SERI, fontStyle: "italic", fontWeight: 600, fontSize: 46, color: SAGE }}>One serum. Four weeks. Real glow.</div></div>
    <div style={{ position: "relative" }}><div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 30 }}><Stars c={GOLD} size={40} /><span style={{ fontFamily: SAN, fontWeight: 700, fontSize: 34, color: CR }}>12,000+ glowing reviews</span></div>
      <div style={{ background: GOLD, color: DEEP, fontFamily: SAN, fontWeight: 900, fontSize: 52, borderRadius: 999, padding: "30px 0", textAlign: "center", letterSpacing: "0.01em" }}>Shop now  →</div></div>
  </div>);

// 1280x720 youtube thumbnail
export const Thumb: React.FC = () => (
  <div style={{ width: 1280, height: 720, background: GR, position: "relative", overflow: "hidden", display: "flex", alignItems: "center", padding: "0 70px" }}>
    <div style={{ position: "absolute", right: -120, top: -120, width: 760, height: 960, borderRadius: 60, background: DEEP, transform: "rotate(16deg)" }} />
    <div style={{ position: "absolute", right: 96, top: "50%", marginTop: -150, width: 300, height: 300, borderRadius: "50%", background: GOLD, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: SER, fontWeight: 900, fontSize: 150, color: DEEP }}>▶</div>
    <div style={{ position: "relative", zIndex: 2 }}>
      <span style={{ fontFamily: SAN, fontWeight: 900, fontSize: 34, color: GOLD, letterSpacing: "0.1em" }}>SKINCARE</span>
      <div style={{ fontFamily: SER, fontWeight: 900, fontSize: 150, lineHeight: 0.9, color: CR, letterSpacing: "-0.03em", textShadow: "0 6px 0 rgba(0,0,0,0.18)" }}>MY 5-STEP<br /><span style={{ color: GOLD }}>GLOW</span> ROUTINE</div>
      <div style={{ marginTop: 22 }}><Logo c={CR} size={40} /></div>
    </div>
  </div>);

// 1280x820 one-pager / pitch
export const OnePager: React.FC = () => (
  <div style={{ width: 1280, height: 820, background: CR, display: "flex", flexDirection: "column", fontFamily: SAN }}>
    <div style={{ height: 96, background: GR, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 56px" }}><Logo c={CR} size={38} /><span style={{ fontFamily: SAN, fontWeight: 700, fontSize: 24, color: SAGE }}>Brand one-pager</span></div>
    <div style={{ padding: "52px 56px 0" }}><div style={{ fontFamily: SER, fontWeight: 900, fontSize: 90, lineHeight: 0.98, color: GR, letterSpacing: "-0.03em" }}>One brand.<br />Every asset.</div></div>
    <div style={{ display: "flex", gap: 28, padding: "44px 56px" }}>
      {[{ t: "On-brand", d: "Your exact style, every time.", e: "🎨" }, { t: "Fast", d: "A full set in minutes.", e: "⚡" }, { t: "Any format", d: "Posts, ads, decks and more.", e: "✦" }].map((c, i) => (
        <div key={i} style={{ flex: 1, background: "#fff", borderRadius: 22, padding: "30px 28px", boxShadow: "0 14px 30px rgba(30,64,53,0.12)" }}>
          <div style={{ fontSize: 44 }}>{c.e}</div><div style={{ fontFamily: SER, fontWeight: 900, fontSize: 42, color: GR, marginTop: 12 }}>{c.t}</div><div style={{ fontFamily: SAN, fontWeight: 500, fontSize: 26, color: INKG, marginTop: 8, lineHeight: 1.3 }}>{c.d}</div></div>))}
    </div>
    <div style={{ marginTop: "auto", padding: "0 56px 44px", display: "flex", alignItems: "center", justifyContent: "space-between" }}><span style={{ fontFamily: SERI, fontStyle: "italic", fontWeight: 600, fontSize: 30, color: SAGE }}>yourbrand.co</span><span style={{ background: GOLD, color: DEEP, fontFamily: SAN, fontWeight: 900, fontSize: 30, borderRadius: 999, padding: "16px 40px" }}>See the set →</span></div>
  </div>);

// leaf-motif pattern tile
const LeafPattern: React.FC<{ c: string; bg: string }> = ({ c, bg }) => (
  <div style={{ width: "100%", height: "100%", background: bg, position: "relative", overflow: "hidden" }}>
    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => { const r = Math.floor(i / 3), col = i % 3; return <div key={i} style={{ position: "absolute", left: 14 + col * 48, top: 12 + r * 44, opacity: 0.6 }}><Leaf s={26} c={c} /></div>; })}
  </div>);
const Lbl: React.FC<{ t: string }> = ({ t }) => (<div style={{ fontFamily: SAN, fontWeight: 800, fontSize: 22, letterSpacing: "0.16em", color: SAGE, marginBottom: 12 }}>{t}</div>);

// brand-guidelines board (the input) — rich, multi-section
export const BrandKit: React.FC = () => (
  <div style={{ width: 1080, height: 820, background: "#fff", fontFamily: SAN, display: "flex", flexDirection: "column", overflow: "hidden" }}>
    <div style={{ height: 104, background: GR, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 48px" }}><Logo c={CR} size={52} /><span style={{ fontFamily: SAN, fontWeight: 800, fontSize: 26, letterSpacing: "0.18em", color: SAGE }}>BRAND GUIDELINES</span></div>
    <div style={{ flex: 1, display: "flex", padding: 44, gap: 40 }}>
      {/* left column */}
      <div style={{ flex: 1.15, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div><Lbl t="COLOR PALETTE" />
          <div style={{ display: "flex", gap: 16 }}>{[["Forest", GR, "1E4035"], ["Cream", CR, "F5F0E6"], ["Gold", GOLD, "BE9A45"], ["Sage", SAGE, "92A593"]].map(([n, c, h], i) => (
            <div key={i} style={{ flex: 1 }}><div style={{ height: 116, borderRadius: 16, background: c as string, border: c === CR ? "2px solid #E6E0D2" : "none", boxShadow: "inset 0 2px 0 rgba(255,255,255,0.25), 0 8px 18px rgba(30,64,53,0.12)" }} /><div style={{ fontFamily: SAN, fontWeight: 800, fontSize: 24, color: INKG, marginTop: 12 }}>{n as string}</div><div style={{ fontFamily: SAN, fontWeight: 500, fontSize: 19, color: SAGE }}>#{h as string}</div></div>))}</div></div>
        <div><Lbl t="TYPOGRAPHY" />
          <div style={{ display: "flex", alignItems: "flex-end", gap: 26 }}>
            <span style={{ fontFamily: SER, fontWeight: 900, fontSize: 150, lineHeight: 0.72, color: GR }}>Aa</span>
            <div style={{ paddingBottom: 8 }}><div style={{ fontFamily: SER, fontWeight: 900, fontSize: 40, color: INKG }}>Fraunces <span style={{ fontFamily: SAN, fontWeight: 500, fontSize: 22, color: SAGE }}>· Display</span></div>
              <div style={{ fontFamily: SAN, fontWeight: 600, fontSize: 34, color: INKG, marginTop: 6 }}>Inter <span style={{ fontWeight: 500, fontSize: 22, color: SAGE }}>· Text</span></div></div></div></div>
      </div>
      {/* right column */}
      <div style={{ flex: 0.85, display: "flex", flexDirection: "column", gap: 22 }}>
        <div style={{ flex: 1 }}><Lbl t="IMAGERY" /><div style={{ height: 196, borderRadius: 16, overflow: "hidden", boxShadow: "0 8px 20px rgba(30,64,53,0.16)" }}><Img src={photo("gx_rouge")} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 42%" }} /></div></div>
        <div style={{ display: "flex", gap: 18 }}>
          <div style={{ flex: 1 }}><Lbl t="MARK" /><div style={{ height: 96, borderRadius: 16, background: DEEP, display: "flex", alignItems: "center", justifyContent: "center" }}><Leaf s={50} c={GOLD} /></div></div>
          <div style={{ flex: 1 }}><Lbl t="PATTERN" /><div style={{ height: 96, borderRadius: 16, overflow: "hidden" }}><LeafPattern c={SAGE} bg={CR} /></div></div>
        </div>
        <div><Lbl t="VOICE" /><div style={{ fontFamily: SERI, fontStyle: "italic", fontWeight: 600, fontSize: 30, color: GR, lineHeight: 1.05 }}>"Glow, simplified."</div><div style={{ fontFamily: SAN, fontWeight: 600, fontSize: 21, color: SAGE, marginTop: 4 }}>warm · botanical · honest</div></div>
      </div>
    </div>
  </div>);

export const VERDE_BRAND = { GR, DEEP, CR, GOLD, SAGE, INKG };

const Tile: React.FC<{ w: number; h: number; bw: number; bh: number; children: React.ReactNode }> = ({ w, h, bw, bh, children }) => (
  <div style={{ width: w, height: h, overflow: "hidden", borderRadius: 14, boxShadow: "0 10px 28px rgba(30,40,60,0.22)", background: "#fff" }}>
    <div style={{ width: bw, height: bh, transform: `scale(${w / bw})`, transformOrigin: "top left" }}>{children}</div></div>);
export const DesignBoard: React.FC = () => (
  <div style={{ width: 1600, height: 1000, background: "#ECE9E2", padding: 30, display: "flex", flexWrap: "wrap", gap: 20, alignContent: "flex-start" }}>
    <Tile w={220} h={220} bw={1080} bh={1080}><PostWellness /></Tile>
    <Tile w={220} h={220} bw={1080} bh={1080}><PostOhlala /></Tile>
    <Tile w={220} h={220} bw={1080} bh={1080}><PostPack /></Tile>
    <Tile w={220} h={220} bw={1080} bh={1080}><PostOhlala /></Tile>
    <Tile w={220} h={220} bw={1080} bh={1080}><PostBlooms /></Tile>
    <Tile w={220} h={220} bw={1080} bh={1080}><PostJar /></Tile>
    <Tile w={210} h={262} bw={1080} bh={1350}><AdReal /></Tile>
    <Tile w={392} h={220} bw={1280} bh={720}><ThumbReal /></Tile>
    <Tile w={520} h={395} bw={1080} bh={820}><BrandKit /></Tile>
    <Tile w={392} h={251} bw={1280} bh={820}><OnePager /></Tile>
  </div>);

// ===== REAL-PHOTO design samples: premium product/lifestyle photography + VERDE branding overlay =====
const photo = (n: string) => staticFile(`refs/${n}.jpg`);
const PhotoPost: React.FC<{ img: string; pos?: string; eyebrow: string; title: React.ReactNode; cta?: string }> = ({ img, pos = "center", eyebrow, title, cta }) => (
  <div style={{ width: 1080, height: 1080, position: "relative", overflow: "hidden", background: "#1A1613" }}>
    <Img src={photo(img)} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: pos }} />
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(14,11,9,0.22) 0%, rgba(14,11,9,0) 28%, rgba(14,11,9,0) 52%, rgba(14,11,9,0.62) 100%)" }} />
    <div style={{ position: "absolute", top: 56, left: 56, right: 56, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Logo c={CR} size={42} /><span style={{ fontFamily: SAN, fontWeight: 800, fontSize: 24, letterSpacing: "0.16em", color: CR, opacity: 0.92 }}>{eyebrow}</span></div>
    <div style={{ position: "absolute", left: 56, right: 56, bottom: 52 }}>
      <div style={{ fontFamily: SER, fontWeight: 900, fontSize: 104, lineHeight: 0.94, color: CR, letterSpacing: "-0.03em", textShadow: "0 6px 34px rgba(0,0,0,0.45)" }}>{title}</div>
      {cta && <div style={{ marginTop: 22, display: "inline-block", background: GOLD, color: DEEP, fontFamily: SAN, fontWeight: 900, fontSize: 30, borderRadius: 999, padding: "14px 34px" }}>{cta}</div>}</div>
  </div>);
export const PostSerum: React.FC = () => <PhotoPost img="dz_serum" pos="50% 42%" eyebrow="BOTANICAL" title={<>Bottled<br />glow.</>} />;
export const PostModel: React.FC = () => <PhotoPost img="dz_jar2" pos="56% 26%" eyebrow="THE RITUAL" title={<>Skin, renewed.</>} />;
export const PostTubes: React.FC = () => <PhotoPost img="dz_tubes" pos="center" eyebrow="NEW DROP" title={<>The daily<br />duo.</>} cta="Shop now →" />;
export const PostJar: React.FC = () => <PhotoPost img="dz_jar1" pos="center" eyebrow="HERO" title={<>One jar.<br />Real results.</>} />;
export const PostPack: React.FC = () => <PhotoPost img="dz_pack" pos="50% 38%" eyebrow="PACKAGING" title={<>Made to<br />be kept.</>} />;
export const PostOhlala: React.FC = () => <PhotoPost img="dz_ohlala" pos="center" eyebrow="THE EDIT" title={<>Your shelf,<br />upgraded.</>} cta="Discover →" />;
export const PostBlooms: React.FC = () => <PhotoPost img="dz_blooms" pos="50% 36%" eyebrow="LIMITED" title={<>In full<br />bloom.</>} />;

// ===== sourced premium PORTFOLIO graphics (diverse real brands) — replace the skincare bottle set =====
const GfxImg: React.FC<{ img: string; pos?: string }> = ({ img, pos = "center" }) => (
  <div style={{ width: 1080, height: 1080, background: "#15120E", overflow: "hidden" }}>
    <Img src={photo(img)} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: pos }} /></div>);
export const Gjibby: React.FC = () => <GfxImg img="gx_jibby" pos="44% 24%" />;
export const Grezo: React.FC = () => <GfxImg img="gx_rezo" pos="58% 44%" />;
export const Gspent: React.FC = () => <GfxImg img="gx_spent" pos="26% 50%" />;
export const Gathlevo: React.FC = () => <GfxImg img="gx_athlevo" pos="42% 40%" />;
export const Gmomento: React.FC = () => <GfxImg img="gx_momento" pos="center" />;
export const Gviva: React.FC = () => <GfxImg img="gx_viva" pos="center" />;
export const Gmentus: React.FC = () => <GfxImg img="gx_mentus" pos="center" />;
export const Gpiropo: React.FC = () => <GfxImg img="gx_piropo" pos="50% 52%" />;
export const Grouge: React.FC = () => <GfxImg img="gx_rouge" pos="50% 42%" />;
export const Gconverse: React.FC = () => <GfxImg img="gx_converse" pos="center" />;
export const Gcoinbase: React.FC = () => <GfxImg img="gx_coinbase" pos="center" />;

// designed WELLNESS/supplement product post (different category: ingestible, not skincare) — clean VERDE bottle illustration
export const PostWellness: React.FC = () => (
  <div style={{ width: 1080, height: 1080, position: "relative", overflow: "hidden", background: "radial-gradient(120% 100% at 50% 28%, #F3ECDD 0%, #EBE1CC 60%, #E1D4B9 100%)" }}>
    <div style={{ position: "absolute", top: 56, left: 56, right: 56, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Logo c={GR} size={42} /><span style={{ fontFamily: SAN, fontWeight: 800, fontSize: 24, letterSpacing: "0.16em", color: SAGE }}>WELLNESS</span></div>
    {/* bottle */}
    <div style={{ position: "absolute", left: 540, top: 540, transform: "translate(-50%,-50%)", width: 360, height: 540 }}>
      <div style={{ position: "absolute", left: "50%", bottom: 6, transform: "translateX(-50%)", width: 320, height: 64, borderRadius: "50%", background: "radial-gradient(circle, rgba(30,64,53,0.28) 0%, transparent 70%)" }} />
      <div style={{ position: "absolute", left: "50%", top: 0, transform: "translateX(-50%)", width: 150, height: 70, borderRadius: 14, background: grad("#D8B25C", "#B8923F") }} />
      <div style={{ position: "absolute", left: "50%", top: 60, transform: "translateX(-50%)", width: 110, height: 30, background: "#173027" }} />
      <div style={{ position: "absolute", left: "50%", top: 84, transform: "translateX(-50%)", width: 300, height: 430, borderRadius: "44px 44px 54px 54px", background: "linear-gradient(100deg, #2A5446 0%, #1E4035 52%, #163026 100%)", boxShadow: "inset 0 4px 0 rgba(255,255,255,0.12), 0 24px 50px rgba(20,40,30,0.35)", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 34, top: 0, width: 36, height: "100%", background: "linear-gradient(90deg, rgba(255,255,255,0.20), transparent)" }} />
        <div style={{ position: "absolute", left: "50%", top: 130, transform: "translateX(-50%)", width: 226, height: 230, borderRadius: 18, background: CR, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 16px rgba(0,0,0,0.18)" }}>
          <Leaf s={34} c={GOLD} /><div style={{ fontFamily: SER, fontWeight: 900, fontSize: 30, color: GR, letterSpacing: "0.04em", marginTop: 4 }}>VERDE</div>
          <div style={{ width: 130, height: 2, background: GOLD, margin: "10px 0" }} />
          <div style={{ fontFamily: SAN, fontWeight: 800, fontSize: 26, color: INKG, letterSpacing: "0.05em" }}>DAILY GLOW</div>
          <div style={{ fontFamily: SAN, fontWeight: 600, fontSize: 17, color: SAGE, marginTop: 4 }}>botanical supplement</div>
          <div style={{ fontFamily: SAN, fontWeight: 600, fontSize: 15, color: SAGE, marginTop: 10 }}>60 capsules</div>
        </div>
      </div>
      {/* capsules */}
      {[[-90, 528, -18], [-12, 540, 8], [70, 532, 22]].map(([x, y, r], i) => (
        <div key={i} style={{ position: "absolute", left: 180 + x, top: y, width: 78, height: 30, borderRadius: 15, background: grad("#E7C572", "#C9A24B"), transform: `rotate(${r}deg)`, boxShadow: "0 4px 10px rgba(40,32,20,0.2)" }}><div style={{ position: "absolute", left: 0, top: 0, width: "50%", height: "100%", borderRadius: "15px 0 0 15px", background: CR }} /></div>))}
    </div>
    <div style={{ position: "absolute", left: 56, right: 56, bottom: 54, textAlign: "center" }}>
      <div style={{ fontFamily: SER, fontWeight: 900, fontSize: 76, lineHeight: 0.94, color: GR, letterSpacing: "-0.03em" }}>Beauty, from within.</div></div>
  </div>);

// real-photo ad (1080x1350): photo hero on top, brand block below
export const AdReal: React.FC = () => (
  <div style={{ width: 1080, height: 1350, position: "relative", overflow: "hidden", background: "#241D16", display: "flex", flexDirection: "column" }}>
    <div style={{ height: 812, position: "relative" }}>
      <Img src={photo("gx_viva")} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(20,15,10,0.18) 0%, rgba(20,15,10,0) 44%, rgba(36,29,22,0.98) 100%)" }} />
      <div style={{ position: "absolute", top: 46, left: 46, right: 46, display: "flex", justifyContent: "space-between", alignItems: "center" }}><Logo c={CR} size={46} /><span style={{ fontFamily: SAN, fontWeight: 800, fontSize: 26, color: GOLD, border: `2px solid ${GOLD}`, borderRadius: 999, padding: "7px 20px" }}>Bestseller</span></div>
    </div>
    <div style={{ flex: 1, background: "#241D16", padding: "8px 56px 56px", display: "flex", flexDirection: "column", justifyContent: "space-between", marginTop: -2 }}>
      <div style={{ fontFamily: SER, fontWeight: 900, fontSize: 110, lineHeight: 0.94, color: CR, letterSpacing: "-0.03em" }}>Hydrate happy.</div>
      <div><div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 22 }}><Stars c={GOLD} size={36} /><span style={{ fontFamily: SAN, fontWeight: 700, fontSize: 30, color: CR }}>12,000+ 5-star reviews</span></div>
        <div style={{ background: GOLD, color: DEEP, fontFamily: SAN, fontWeight: 900, fontSize: 48, borderRadius: 999, padding: "26px 0", textAlign: "center" }}>Shop now  →</div></div></div>
  </div>);

// real-face youtube thumbnail (1280x720)
export const ThumbReal: React.FC = () => (
  <div style={{ width: 1280, height: 720, position: "relative", overflow: "hidden", background: "#211A13" }}>
    <Img src={photo("gx_rouge")} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "66% 42%" }} />
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(100deg, rgba(26,20,14,0.94) 0%, rgba(26,20,14,0.7) 42%, rgba(26,20,14,0.05) 72%)" }} />
    <div style={{ position: "absolute", left: 64, top: "50%", transform: "translateY(-50%)", width: 880 }}>
      <span style={{ fontFamily: SAN, fontWeight: 900, fontSize: 32, color: GOLD, letterSpacing: "0.12em" }}>THE LIST</span>
      <div style={{ fontFamily: SER, fontWeight: 900, fontSize: 122, lineHeight: 0.88, color: CR, letterSpacing: "-0.035em", textShadow: "0 6px 0 rgba(0,0,0,0.22)" }}>MY <span style={{ color: GOLD }}>TOP 5</span><br />PICKS</div>
      <div style={{ marginTop: 20 }}><Logo c={CR} size={38} /></div></div>
    <div style={{ position: "absolute", right: 52, bottom: 46, width: 108, height: 108, borderRadius: "50%", background: "rgba(245,240,230,0.94)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 50, color: "#211A13", boxShadow: "0 12px 40px rgba(0,0,0,0.4)" }}>▶</div>
  </div>);
