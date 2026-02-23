import Head from 'next/head'
import { lekkageTypes, steden } from '../../data'

const topSteden = steden.slice(0, 8)

export default function LekkageIndex() {
  return (
    <>
      <Head>
        <title>Lekkage reparatie – Alle diensten | LekkageFix</title>
        <meta name="description" content="Daklekkage, waterleiding, badkamer, riool, vocht, gevel of kelder? LekkageFix repareert elk type lekkage snel en vakkundig door heel Nederland." />
        <link rel="canonical" href="https://lekkagefix.nl/lekkage" />
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
          <span>Lekkage</span>
        </div>
      </div>

      <section className="hero">
        <div className="hero-dots" />
        <div className="hero-inner" style={{gridTemplateColumns:'1fr',maxWidth:'780px',margin:'0 auto',textAlign:'center'}}>
          <div>
            <div className="hero-badge"><span className="pulse" /> 24/7 bereikbaar · heel Nederland</div>
            <h1>Lekkage reparatie — <em>elk type opgelost</em></h1>
            <p className="hero-sub" style={{margin:'0 auto 2rem'}}>Van daklekkage tot rioolprobleem — onze gecertificeerde vakmensen lossen elk type lekkage snel en vakkundig op. Dag en nacht bereikbaar.</p>
            <div className="hero-stats">
              <div className="stat-item"><div className="stat-val">30<sup>min</sup></div><div className="stat-key">Gem. reactie</div></div>
              <div className="stat-item"><div className="stat-val">4.9<sup>★</sup></div><div className="stat-key">Beoordeling</div></div>
              <div className="stat-item"><div className="stat-val">7</div><div className="stat-key">Specialisaties</div></div>
              <div className="stat-item"><div className="stat-val">24<sup>/7</sup></div><div className="stat-key">Bereikbaar</div></div>
            </div>
            <div className="hero-actions" style={{justifyContent:'center'}}>
              <a href="tel:0800-1234" className="btn-call">📞 Bel direct: 0800-1234</a>
              <a href="#diensten" className="btn-ghost">Kies jouw type →</a>
            </div>
          </div>
        </div>
      </section>

      <div className="trust-bar">
        <div className="trust-inner">
          <div className="ti-item"><span className="ti-check">✓</span><span>Gemiddeld <strong>30 min</strong> ter plaatse</span></div>
          <div className="ti-item"><span className="ti-check">✓</span><span><strong>Garantie</strong> op al het werk</span></div>
          <div className="ti-item"><span className="ti-check">✓</span><span><strong>Erkend</strong> door verzekeraars</span></div>
          <div className="ti-item"><span className="ti-check">✓</span><span><strong>Transparante</strong> prijzen</span></div>
          <div className="ti-item"><span className="ti-check">✓</span><span><strong>24/7</strong> bereikbaar</span></div>
        </div>
      </div>

      <section className="section" id="diensten">
        <div className="section-inner">
          <div className="sec-head-center">
            <div className="eyebrow">Specialisaties</div>
            <h2>Elk type lekkage <em>opgelost</em></h2>
            <p className="sec-sub">Kies het type lekkage voor meer informatie en een overzicht van steden waar we actief zijn.</p>
          </div>
          <div className="svc-grid">
            {lekkageTypes.map(t => (
              <a key={t.slug} href={`/lekkage/${t.slug}`} className="svc">
                <div className="svc-icon">{t.icon}</div>
                <h3>{t.naam}</h3>
                <p>{t.omschrijving}</p>
                <div className="svc-cta">Bekijk alle steden →</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="section-inner">
          <div className="sec-head-center">
            <div className="eyebrow">Werkwijze</div>
            <h2>Van melding tot <em>oplossing</em></h2>
            <p className="sec-sub">Helder en transparant — zo lossen we elk lekkageprobleem op.</p>
          </div>
          <div className="steps">
            <div className="step"><div className="step-num">1</div><h3>Melding</h3><p>Bel of stuur een aanvraag. We bespreken het probleem en plannen een afspraak.</p></div>
            <div className="step"><div className="step-num">2</div><h3>Vakman onderweg</h3><p>De dichtstbijzijnde monteur rijdt naar je toe. Gemiddeld binnen 30 minuten.</p></div>
            <div className="step"><div className="step-num">3</div><h3>Inspectie & offerte</h3><p>Grondige inspectie en transparante prijsopgave. Jij beslist voordat we beginnen.</p></div>
            <div className="step"><div className="step-num">4</div><h3>Opgelost</h3><p>Vakkundige reparatie met garantie op het werk. Netjes opgeruimd achtergelaten.</p></div>
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="section-inner">
          <div className="sec-head">
            <div className="eyebrow">Werkgebied</div>
            <h2>Actief in <em>jouw stad</em></h2>
            <p className="sec-sub">We werken door heel Nederland. Selecteer een stad voor direct een vakman aanvragen.</p>
          </div>
          <div className="cities-grid">
            {topSteden.map(s => (
              <a key={s.slug} href={`/lekdetectie/${s.slug}`} className="city-card">
                <div className="city-name">{s.naam}</div>
                <div className="city-prov">📍 {s.provincie}</div>
                <div className="city-arrow">Bekijk {s.naam} →</div>
              </a>
            ))}
          </div>
          <div style={{display:'flex',justifyContent:'center',marginTop:'1.5rem'}}>
            <a href="/lekdetectie" className="btn-all">Alle steden bekijken →</a>
          </div>
        </div>
      </section>

      <div className="bottom-cta">
        <div className="eyebrow" style={{color:'#a8e6c0'}}>Direct geholpen</div>
        <h2 style={{color:'white'}}>Lekkage? Wacht niet te lang.</h2>
        <p>Hoe eerder je belt, hoe kleiner de schade. Onze vakmensen staan voor je klaar.</p>
        <div className="cta-btns">
          <a href="tel:0800-1234" className="btn-call">📞 Bel nu: 0800-1234</a>
          <a href="/" className="btn-white-ghost">Gratis offerte aanvragen</a>
        </div>
      </div>

      <footer>
        <div className="footer-top">
          <div>
            <div className="footer-logo">Lekkage<b>Fix</b></div>
            <p className="footer-desc">Vakkundige lekkage reparaties door heel Nederland. Gecertificeerde vakmensen, transparante prijzen, garantie op werk.</p>
          </div>
          <div className="footer-col">
            <h4>Diensten</h4>
            {lekkageTypes.slice(0,4).map(t => <a key={t.slug} href={`/lekkage/${t.slug}`}>{t.naam}</a>)}
          </div>
          <div className="footer-col">
            <h4>Steden</h4>
            {topSteden.slice(0,5).map(s => <a key={s.slug} href={`/lekdetectie/${s.slug}`}>{s.naam}</a>)}
            <a href="/lekdetectie">Alle steden →</a>
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
