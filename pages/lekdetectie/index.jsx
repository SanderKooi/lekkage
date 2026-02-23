

import Head from 'next/head'
import { steden } from '../../data'

const provincies = [...new Set(steden.map(s => s.provincie))].sort()

export default function LekdetectieIndex() {
  return (
    <>
      <Head>
        <title>Lekdetectie – Lek opsporen zonder sloopwerk | LekkageFix</title>
        <meta name="description" content="Professionele lekdetectie door heel Nederland. Wij vinden het lek zonder hak- en breekwerk met thermische camera, akoestische detectie en tracergas. Bel direct." />
        <link rel="canonical" href="https://lekkagefix.nl/lekdetectie" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>

      <nav>
        <a href="/" className="logo"><span className="logo-icon">💧</span>Lekkage<b>Fix</b></a>
        <div className="nav-right">
          <a href="/lekdetectie" className="nav-link">Lekdetectie</a>
          <a href="/lekkage" className="nav-link">Lekkage</a>
          <a href="/blog" className="nav-link">Blog</a>
          <a href="tel:0800-1234" className="nav-phone">📞 0800-1234</a>
        </div>
      </nav>

      <div className="breadcrumb-bar">
        <div className="breadcrumb">
          <a href="/">Home</a><span className="breadcrumb-sep">›</span>
          <span>Lekdetectie</span>
        </div>
      </div>

      <section className="hero">
        <div className="hero-dots" />
        <div className="hero-inner" style={{gridTemplateColumns:'1fr',maxWidth:'780px',margin:'0 auto',textAlign:'center'}}>
          <div>
            <div className="hero-badge"><span className="pulse" /> Zonder sloopwerk · heel Nederland</div>
            <h1>Lekdetectie door heel <em>Nederland</em></h1>
            <p className="hero-sub" style={{margin:'0 auto 2rem'}}>Wij vinden de exacte locatie van uw lekkage met geavanceerde detectieapparatuur — thermische camera, akoestische detectie en tracergas. Zonder hak- en breekwerk.</p>
            <div className="hero-stats">
              <div className="stat-item"><div className="stat-val">95<sup>%</sup></div><div className="stat-key">Zonder sloop</div></div>
              <div className="stat-item"><div className="stat-val">4.9<sup>★</sup></div><div className="stat-key">Beoordeling</div></div>
              <div className="stat-item"><div className="stat-val">46<sup>+</sup></div><div className="stat-key">Steden</div></div>
              <div className="stat-item"><div className="stat-val">24<sup>/7</sup></div><div className="stat-key">Bereikbaar</div></div>
            </div>
            <div className="hero-actions" style={{justifyContent:'center'}}>
              <a href="tel:0800-1234" className="btn-call">📞 Bel direct: 0800-1234</a>
              <a href="#steden" className="btn-ghost">Kies jouw stad →</a>
            </div>
          </div>
        </div>
      </section>

      <div className="trust-bar">
        <div className="trust-inner">
          <div className="ti-item"><span className="ti-check">✓</span><span>Gemiddeld <strong>30 min</strong> ter plaatse</span></div>
          <div className="ti-item"><span className="ti-check">✓</span><span><strong>Geen</strong> sloopwerk nodig</span></div>
          <div className="ti-item"><span className="ti-check">✓</span><span><strong>Erkend</strong> door verzekeraars</span></div>
          <div className="ti-item"><span className="ti-check">✓</span><span><strong>Gedetailleerde</strong> rapportage</span></div>
          <div className="ti-item"><span className="ti-check">✓</span><span><strong>24/7</strong> bereikbaar</span></div>
        </div>
      </div>

      <section className="section">
        <div className="section-inner">
          <div className="sec-head-center">
            <div className="eyebrow">Onze methoden</div>
            <h2>Lekdetectie <em>zonder sloopwerk</em></h2>
            <p className="sec-sub">Met moderne technologie vinden we 95% van alle lekken zonder ook maar één tegel te breken.</p>
          </div>
          <div className="svc-grid">
            <div className="svc" style={{cursor:'default'}}>
              <div className="svc-icon">🌡️</div>
              <h3>Thermische camera</h3>
              <p>Warmtebeeldcamera's detecteren temperatuurverschillen door vocht achter muren en vloeren — volledig non-destructief.</p>
            </div>
            <div className="svc" style={{cursor:'default'}}>
              <div className="svc-icon">🔊</div>
              <h3>Akoestische detectie</h3>
              <p>Geavanceerde luisterapparatuur vangt het geluid van stromend water op, zelfs diep in de muur of onder de vloer.</p>
            </div>
            <div className="svc" style={{cursor:'default'}}>
              <div className="svc-icon">🧪</div>
              <h3>Tracergas</h3>
              <p>Een onschadelijk gas in de leiding ontsnapt op de lekplek — een detector vindt exact de positie aan de oppervlakte.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt" id="steden">
        <div className="section-inner">
          <div className="sec-head">
            <div className="eyebrow">Werkgebied</div>
            <h2>Lekdetectie per <em>stad</em></h2>
            <p className="sec-sub">Klik op jouw stad voor specifieke informatie en een directe aanvraag.</p>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:'2.5rem'}}>
            {provincies.map(prov => (
              <div key={prov}>
                <h3 style={{fontSize:'0.82rem',fontWeight:700,color:'var(--green-dark)',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:'0.85rem',paddingBottom:'0.5rem',borderBottom:'2px solid var(--green4)'}}>📍 {prov}</h3>
                <div className="steden-grid">
                  {steden.filter(s => s.provincie === prov).map(s => (
                    <a key={s.slug} href={`/lekdetectie/${s.slug}`} className="stad-a">
                      <span>{s.naam}</span><span className="stad-arrow">→</span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="bottom-cta">
        <div className="eyebrow" style={{color:'#a8e6c0'}}>Direct geholpen</div>
        <h2 style={{color:'white'}}>Lek opsporen? Wacht niet te lang.</h2>
        <p>Hoe eerder we het lek vinden, hoe kleiner de schade. Onze specialisten staan voor je klaar.</p>
        <div className="cta-btns">
          <a href="tel:0800-1234" className="btn-call">📞 Bel nu: 0800-1234</a>
          <a href="#steden" className="btn-white-ghost">Kies jouw stad</a>
        </div>
      </div>

      <footer>
        <div className="footer-top">
          <div>
            <div className="footer-logo">Lekkage<b>Fix</b></div>
            <p className="footer-desc">Vakkundige lekdetectie door heel Nederland. Gecertificeerde specialisten, transparante prijzen, garantie op werk.</p>
          </div>
          <div className="footer-col">
            <h4>Diensten</h4>
            <a href="/lekdetectie">Lekdetectie</a>
            <a href="/lekkage/dak">Daklekkage</a>
            <a href="/lekkage/waterleiding">Waterleiding</a>
            <a href="/lekkage/riool">Rioollekkage</a>
          </div>
          <div className="footer-col">
            <h4>Steden</h4>
            {steden.slice(0,5).map(s => <a key={s.slug} href={`/lekdetectie/${s.slug}`}>{s.naam}</a>)}
            <a href="#steden">Alle steden →</a>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <a href="tel:0800-1234">0800-1234 (24/7)</a>
            <a href="mailto:info@lekkagefix.nl">info@lekkagefix.nl</a>
            <a href="/">Gratis offerte</a>
            <a href="/blog">Blog & tips</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 LekkageFix · KvK 89586557 · <a href="#">Privacy</a> · <a href="#">Voorwaarden</a></p>
          <div className="cert-badges"><span className="cert">VCA ✓</span><span className="cert">ISO 9001</span><span className="cert">Erkend verzekeraar</span></div>
        </div>
      </footer>

      <a href="tel:0800-1234" className="mobile-cta">📞 Bel nu: 0800-1234 (24/7 bereikbaar)</a>
    </>
  )
}
