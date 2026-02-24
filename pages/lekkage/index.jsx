import Head from 'next/head'
import Nav from '../../components/Nav'
import { useState } from 'react'
import { lekkageTypes, steden } from '../../data'

const PHONE = '0800-1234'
const PHONE_DISPLAY = '0800-1234'
const EMAIL = 'info@lekkagefix.nl'

const provincies = [...new Set(steden.map(s => s.provincie))].sort()
const topSteden = steden.slice(0, 8)

export default function LekkageIndex() {
  const [search, setSearch] = useState('')
  const [openProv, setOpenProv] = useState({})
  const MAX_VISIBLE = 10

  const filtered = search.trim().length > 1
    ? steden.filter(s =>
        s.naam.toLowerCase().includes(search.toLowerCase()) ||
        s.provincie.toLowerCase().includes(search.toLowerCase())
      )
    : []

  function toggleProv(prov) {
    setOpenProv(p => ({ ...p, [prov]: !p[prov] }))
  }

  return (
    <>
      <Head>
        <title>Lekkage Reparatie Nederland – Alle Diensten & Steden | LekkageFix</title>
        <meta name="description" content="Lekkage reparatie in heel Nederland. Daklekkage, waterleiding, badkamer, riool, vocht, gevel of kelder — gecertificeerde vakmensen, gemiddeld 30 min ter plaatse. Gratis offerte." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://lekkagefix.nl/lekkage" />
        <meta property="og:title" content="Lekkage Reparatie Nederland – Alle Diensten | LekkageFix" />
        <meta property="og:description" content="Lekkage reparatie in heel Nederland. 7 specialisaties, 130 steden, 24/7 bereikbaar." />
        <meta property="og:url" content="https://lekkagefix.nl/lekkage" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "LekkageFix",
          "url": "https://lekkagefix.nl",
          "telephone": PHONE,
          "openingHours": "Mo-Su 00:00-24:00",
          "areaServed": { "@type": "Country", "name": "Netherlands" },
          "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "2847" }
        }) }} />
      </Head>
      <Nav activePath="/lekkage" />

      {/* BREADCRUMB */}
      <div className="breadcrumb-bar">
        <div className="breadcrumb">
          <a href="/">Home</a><span className="breadcrumb-sep">›</span>
          <span>Lekkage reparatie</span>
        </div>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-dots" />
        <div className="hero-inner" style={{gridTemplateColumns:'1fr',maxWidth:'820px',margin:'0 auto',textAlign:'center'}}>
          <div>
            <div className="hero-badge"><span className="pulse" /> 24/7 bereikbaar · heel Nederland</div>
            <h1>Lekkage reparatie — <em>snel, vakkundig & gegarandeerd</em></h1>
            <p className="hero-sub" style={{margin:'0 auto 2rem',maxWidth:'620px'}}>Van daklekkage tot rioolprobleem — onze gecertificeerde vakmensen lossen elk type lekkage op. Gemiddeld binnen 30 minuten ter plaatse, dag en nacht.</p>

            {/* ZOEKBALK */}
            <div style={{position:'relative',maxWidth:'480px',margin:'0 auto 2rem'}}>
              <input
                type="text"
                placeholder="Zoek op stad of postcode..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{width:'100%',padding:'1rem 1.25rem 1rem 3rem',borderRadius:'50px',border:'2px solid var(--green4)',fontSize:'1rem',fontFamily:'inherit',outline:'none',boxSizing:'border-box',background:'white',boxShadow:'0 4px 16px rgba(0,0,0,0.08)'}}
              />
              <span style={{position:'absolute',left:'1.1rem',top:'50%',transform:'translateY(-50%)',fontSize:'1.1rem'}}>🔍</span>
              {filtered.length > 0 && (
                <div style={{position:'absolute',top:'calc(100% + 8px)',left:0,right:0,background:'white',border:'1.5px solid var(--border)',borderRadius:'14px',boxShadow:'0 8px 24px rgba(0,0,0,0.12)',zIndex:100,overflow:'hidden'}}>
                  {filtered.slice(0,6).map(s => (
                    <a key={s.slug} href={`/lekkage/dak/${s.slug}`} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0.75rem 1.25rem',textDecoration:'none',color:'var(--text)',borderBottom:'1px solid var(--border)',fontSize:'0.9rem',transition:'background 0.15s'}}
                      onMouseEnter={e => e.currentTarget.style.background='var(--green3)'}
                      onMouseLeave={e => e.currentTarget.style.background='white'}
                    >
                      <span>📍 {s.naam}</span>
                      <span style={{fontSize:'0.78rem',color:'var(--muted)'}}>{s.provincie}</span>
                    </a>
                  ))}
                  {filtered.length > 6 && <div style={{padding:'0.6rem 1.25rem',fontSize:'0.8rem',color:'var(--muted)',textAlign:'center'}}>{filtered.length - 6} meer resultaten</div>}
                </div>
              )}
              {search.trim().length > 1 && filtered.length === 0 && (
                <div style={{position:'absolute',top:'calc(100% + 8px)',left:0,right:0,background:'white',border:'1.5px solid var(--border)',borderRadius:'14px',padding:'1rem 1.25rem',fontSize:'0.9rem',color:'var(--muted)',boxShadow:'0 8px 24px rgba(0,0,0,0.12)',zIndex:100}}>
                  Geen resultaten gevonden. Bel ons op {PHONE_DISPLAY}.
                </div>
              )}
            </div>

            <div className="hero-stats">
              <div className="stat-item"><div className="stat-val">30<sup>min</sup></div><div className="stat-key">Gem. reactie</div></div>
              <div className="stat-item"><div className="stat-val">4.9<sup>★</sup></div><div className="stat-key">Beoordeling</div></div>
              <div className="stat-item"><div className="stat-val">7</div><div className="stat-key">Specialisaties</div></div>
              <div className="stat-item"><div className="stat-val">24<sup>/7</sup></div><div className="stat-key">Bereikbaar</div></div>
            </div>
            <div className="hero-actions" style={{justifyContent:'center'}}>
              <a href={`tel:${PHONE}`} className="btn-call">📞 Bel direct: {PHONE_DISPLAY}</a>
              <a href="#diensten" className="btn-ghost">Kies jouw type →</a>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="trust-bar">
        <div className="trust-inner">
          <div className="ti-item"><span className="ti-check">✓</span><span>Gemiddeld <strong>30 min</strong> ter plaatse</span></div>
          <div className="ti-item"><span className="ti-check">✓</span><span><strong>Garantie</strong> op al het werk</span></div>
          <div className="ti-item"><span className="ti-check">✓</span><span><strong>Erkend</strong> door verzekeraars</span></div>
          <div className="ti-item"><span className="ti-check">✓</span><span><strong>Transparante</strong> prijzen</span></div>
          <div className="ti-item"><span className="ti-check">✓</span><span><strong>24/7</strong> bereikbaar</span></div>
        </div>
      </div>

      {/* DIENSTEN */}
      <section className="section" id="diensten">
        <div className="section-inner">
          <div className="sec-head-center">
            <div className="eyebrow">Specialisaties</div>
            <h2>Elk type lekkage <em>opgelost</em></h2>
            <p className="sec-sub">Kies uw type lekkage voor gedetailleerde informatie, prijzen en een overzicht van steden waar wij actief zijn.</p>
          </div>
          <div className="svc-grid">
            {lekkageTypes.map(t => (
              <a key={t.slug} href={`/lekkage/${t.slug}`} className="svc">
                <div className="svc-icon">{t.icon}</div>
                <h3>{t.naam}</h3>
                <p>{t.omschrijving}</p>
                <div className="svc-cta">Meer over {t.naam.toLowerCase()} →</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* WERKWIJZE */}
      <section className="section section-alt">
        <div className="section-inner">
          <div className="sec-head-center">
            <div className="eyebrow">Werkwijze</div>
            <h2>Van melding tot <em>oplossing</em></h2>
            <p className="sec-sub">Helder en transparant — zo lossen we elk lekkageprobleem op.</p>
          </div>
          <div className="steps">
            {[
              {n:'1',t:'Melding',p:'Bel of stuur een aanvraag. We bespreken het probleem en plannen direct een afspraak in.'},
              {n:'2',t:'Vakman onderweg',p:'De dichtstbijzijnde gecertificeerde monteur rijdt naar je toe. Gemiddeld binnen 30 minuten.'},
              {n:'3',t:'Inspectie & offerte',p:'Grondige inspectie met moderne detectieapparatuur. Transparante prijsopgave vooraf — geen verrassingen.'},
              {n:'4',t:'Opgelost & gegarandeerd',p:'Vakkundige reparatie met garantie op het werk. Netjes opgeruimd achtergelaten.'},
            ].map(s => (
              <div key={s.n} className="step">
                <div className="step-num">{s.n}</div>
                <h3>{s.t}</h3>
                <p>{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STEDEN PER PROVINCIE */}
      <section className="section section-white" id="steden">
        <div className="section-inner">
          <div className="sec-head-center">
            <div className="eyebrow">Werkgebied</div>
            <h2>Lekkage reparatie in <em>jouw stad</em></h2>
            <p className="sec-sub">Wij zijn actief in 130+ steden door heel Nederland. Selecteer uw stad voor lokale informatie en direct een vakman aanvragen.</p>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:'2rem'}}>
            {provincies.map(prov => {
              const provSteden = steden.filter(s => s.provincie === prov)
              const isOpen = openProv[prov]
              const visible = isOpen ? provSteden : provSteden.slice(0, MAX_VISIBLE)
              return (
                <div key={prov}>
                  <h3 style={{fontSize:'0.82rem',fontWeight:700,color:'var(--green-dark)',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:'0.85rem',paddingBottom:'0.5rem',borderBottom:'2px solid var(--green4)'}}>📍 {prov}</h3>
                  <div className="steden-grid">
                    {visible.map(s => (
                      <a key={s.slug} href={`/lekkage/dak/${s.slug}`} className="stad-a">
                        <span>{s.naam}</span><span className="stad-arrow">→</span>
                      </a>
                    ))}
                  </div>
                  {provSteden.length > MAX_VISIBLE && (
                    <button
                      onClick={() => toggleProv(prov)}
                      style={{marginTop:'0.75rem',background:'none',border:'1.5px solid var(--green4)',borderRadius:'50px',padding:'0.4rem 1rem',fontSize:'0.8rem',fontWeight:600,color:'var(--green-dark)',cursor:'pointer',fontFamily:'inherit',transition:'all 0.2s'}}
                      onMouseEnter={e => { e.currentTarget.style.background='var(--green3)' }}
                      onMouseLeave={e => { e.currentTarget.style.background='none' }}
                    >
                      {isOpen ? `▲ Minder steden` : `▼ Nog ${provSteden.length - MAX_VISIBLE} steden in ${prov}`}
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* SEO BLOK */}
      <section className="section">
        <div className="section-inner">
          <div style={{maxWidth:'820px'}}>
            <div className="eyebrow">Lekkage informatie</div>
            <h2 style={{marginBottom:'1.5rem'}}>Lekkage reparatie: <em>alles wat je moet weten</em></h2>

            <h3>Wat is een lekkage en wanneer moet u handelen?</h3>
            <p>Een lekkage is ongecontroleerde waterindringing in uw woning of gebouw. Van een klein druppeltje op het plafond tot een ondergelopen kelder — elke lekkage vraagt om snelle actie. Water richt in korte tijd aanzienlijke schade aan: houtrot, schimmelvorming, verzwakking van constructies en schade aan interieur. Hoe eerder u ingrijpt, hoe beperkter de schade en hoe lager de kosten.</p>

            <h3>De 7 meest voorkomende typen lekkages in Nederland</h3>
            <p>In Nederland komen zeven typen lekkages het meest voor, elk met een eigen oorzaak en aanpak. Daklekkages zijn de meest voorkomende klacht, met name bij platte daken en na stormschade. Waterleidinglekkages kunnen zowel zichtbaar als volledig verborgen in muren of vloeren optreden. Badkamerlekkages ontstaan door versleten kitwerk of beschadigde waterdichte lagen. Rioollekkages herken je aan terugstromend water of aanhoudende geur. Vochtproblemen zijn verraderlijk omdat ze sluipend optreden. Gevellekkages komen veel voor bij oudere woningen met verouderd voegwerk. Kelderwaterdichting is een specialisme op zich, waarbij grondwaterdruk de grote vijand is.</p>

            <h3>Lekkage reparatie kosten: wat kunt u verwachten?</h3>
            <p>De kosten van lekkage reparatie variëren sterk per type en omvang. Een eenvoudige kitrand vervangen kost tussen de € 80 en € 200. Een daklekkage reparatie begint vanaf € 75 voor een losse dakpan tot € 1.500 of meer voor gedeeltelijke dakbedekking. Rioollekken en kelderwaterdichting zijn de meest kostbare reparaties. Bij LekkageFix ontvangt u altijd een transparante offerte vooraf — volledig vrijblijvend en zonder verborgen kosten.</p>

            <h3>Lekkage en uw verzekering</h3>
            <p>Of uw verzekering de schade vergoedt hangt af van de oorzaak en uw polisvoorwaarden. Plotselinge schade door storm, extreme neerslag of gesprongen leidingen valt doorgaans onder de opstalverzekering. Slijtage, achterstallig onderhoud of geleidelijke lekkages worden vrijwel nooit vergoed. LekkageFix is erkend door alle grote Nederlandse verzekeraars en stelt gedetailleerde rapporten op die u direct kunt gebruiken voor uw schadeclaim.</p>

            <h3>Waarom kiezen voor LekkageFix?</h3>
            <p>Met meer dan 12.000 opgeloste lekkages en een gemiddelde beoordeling van 4.9 sterren is LekkageFix de meest gekozen lekkage specialist van Nederland. Onze monteurs zijn VCA-gecertificeerd, werken met de nieuwste detectieapparatuur en geven garantie op al het uitgevoerde werk. Dag en nacht bereikbaar, gemiddeld binnen 30 minuten ter plaatse.</p>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <div className="bottom-cta">
        <div className="eyebrow" style={{color:'#a8e6c0'}}>Direct geholpen</div>
        <h2 style={{color:'white'}}>Lekkage? Wacht niet te lang.</h2>
        <p>Hoe eerder je belt, hoe kleiner de schade. Onze vakmensen staan dag en nacht voor je klaar.</p>
        <div className="cta-btns">
          <a href={`tel:${PHONE}`} className="btn-call">📞 Bel nu: {PHONE_DISPLAY}</a>
          <a href="#diensten" className="btn-white-ghost">Gratis offerte aanvragen</a>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <div className="footer-top">
          <div>
            <div className="footer-logo">Lekkage<b>Fix</b></div>
            <p className="footer-desc">Vakkundige lekkage reparaties door heel Nederland. Gecertificeerde vakmensen, transparante prijzen, garantie op werk.</p>
          </div>
          <div className="footer-col">
            <h4>Diensten</h4>
            {lekkageTypes.map(t => <a key={t.slug} href={`/lekkage/${t.slug}`}>{t.naam}</a>)}
          </div>
          <div className="footer-col">
            <h4>Steden</h4>
            {topSteden.slice(0,5).map(s => <a key={s.slug} href={`/lekkage/dak/${s.slug}`}>{s.naam}</a>)}
            <a href="#steden">Alle steden →</a>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <a href={`tel:${PHONE}`}>{PHONE_DISPLAY} (24/7)</a>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <a href="/">Gratis offerte</a>
            <a href="/blog">Blog & tips</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 LekkageFix · KvK 89586557 · <a href="#">Privacy</a> · <a href="#">Voorwaarden</a></p>
          <div className="cert-badges"><span className="cert">VCA ✓</span><span className="cert">ISO 9001</span><span className="cert">Erkend verzekeraar</span></div>
        </div>
      </footer>

      <a href={`tel:${PHONE}`} className="mobile-cta">📞 Bel nu: {PHONE_DISPLAY} (24/7 bereikbaar)</a>
    </>
  )
}
