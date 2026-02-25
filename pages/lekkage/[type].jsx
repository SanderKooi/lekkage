import Head from 'next/head'
import Nav from '../../components/Nav'
import { useState } from 'react'
import { steden, lekkageTypes, getType } from '../../data'

const PHONE = '0800-1234'
const PHONE_DISPLAY = '0800-1234'
const EMAIL = 'info@lekkagefix.nl'

const provincies = [...new Set(steden.map(s => s.provincie))].sort()
const topSteden = steden.slice(0, 8)

export async function getStaticPaths() {
  return {
    paths: lekkageTypes.map(t => ({ params: { type: t.slug } })),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const type = getType(params.type)
  if (!type) return { notFound: true }
  return { props: { type } }
}

export default function LekkageType({ type }) {
  const [search, setSearch] = useState('')
  const [openProv, setOpenProv] = useState({})
  const MAX_VISIBLE = 11

  const filtered = search.trim().length > 1
    ? steden.filter(s =>
        s.naam.toLowerCase().includes(search.toLowerCase()) ||
        s.provincie.toLowerCase().includes(search.toLowerCase())
      )
    : []

  function toggleProv(prov) {
    setOpenProv(p => ({ ...p, [prov]: !p[prov] }))
  }

  const andereTypes = lekkageTypes.filter(t => t.slug !== type.slug)

  const title = `${type.naam} – Snel & Vakkundig in Heel Nederland | LekkageFix`
  const description = `${type.naam} in jouw stad? LekkageFix is er snel bij. ${type.omschrijving} Gecertificeerde vakmensen, gemiddeld 30 min ter plaatse. Gratis offerte.`

  const faqs = [
    { v: `Hoe snel komen jullie bij een ${type.naam.toLowerCase()}?`, a: `Gemiddeld zijn we binnen 30 minuten ter plaatse, door heel Nederland. We zijn 24/7 bereikbaar, ook in het weekend.` },
    { v: `Wat zijn veelvoorkomende oorzaken van ${type.naam.toLowerCase()}?`, a: `De meest voorkomende oorzaken zijn: ${type.oorzaken?.slice(0,3).map(o => o.titel || o).join(', ')}.` },
    { v: `Wat kost ${type.naam.toLowerCase()} reparatie?`, a: `De kosten hangen af van de omvang en oorzaak. Je ontvangt altijd een transparante offerte vooraf. Gratis inspectie, geen verrassingen.` },
    { v: `Vergoedt mijn verzekering ${type.naam.toLowerCase()}?`, a: `Plotselinge schade valt bij de meeste opstalverzekeringen onder de dekking. Wij stellen een rapport op dat je direct kunt indienen bij je verzekeraar.` },
    { v: `In welke steden zijn jullie actief voor ${type.naam.toLowerCase()}?`, a: `We zijn actief in meer dan 130 steden door heel Nederland. Selecteer jouw stad hierboven voor lokale informatie en een directe aanvraag.` },
  ]

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://lekkagefix.nl/#business",
        "name": "LekkageFix",
        "url": "https://lekkagefix.nl",
        "telephone": PHONE,
        "openingHours": "Mo-Su 00:00-24:00",
        "priceRange": "€€",
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "2847", "bestRating": "5" }
      },
      {
        "@type": "Service",
        "name": type.naam,
        "provider": { "@id": "https://lekkagefix.nl/#business" },
        "areaServed": { "@type": "Country", "name": "Netherlands" },
        "description": description,
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqs.map(f => ({
          "@type": "Question",
          "name": f.v,
          "acceptedAnswer": { "@type": "Answer", "text": f.a }
        }))
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://lekkagefix.nl" },
          { "@type": "ListItem", "position": 2, "name": "Lekkage", "item": "https://lekkagefix.nl/lekkage" },
          { "@type": "ListItem", "position": 3, "name": type.naam, "item": `https://lekkagefix.nl/lekkage/${type.slug}` },
        ]
      }
    ]
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href={`https://lekkagefix.nl/lekkage/${type.slug}`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`https://lekkagefix.nl/lekkage/${type.slug}`} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      </Head>
      <Nav activePath="/lekkage" />

      {/* BREADCRUMB */}
      <div className="breadcrumb-bar">
        <div className="breadcrumb">
          <a href="/">Home</a><span className="breadcrumb-sep">›</span>
          <a href="/lekkage">Lekkage</a><span className="breadcrumb-sep">›</span>
          <span>{type.naam}</span>
        </div>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-dots" />
        <div className="hero-inner" style={{gridTemplateColumns:'1fr',maxWidth:'820px',margin:'0 auto',textAlign:'center'}}>
          <div>
            <div className="hero-badge"><span className="pulse" /> 24/7 bereikbaar · heel Nederland</div>
            <span style={{fontSize:'3rem',display:'block',marginBottom:'0.5rem'}}>{type.icon}</span>
            <h1><em>{type.naam}</em> — snel, vakkundig & gegarandeerd</h1>
            <p className="hero-sub" style={{margin:'0 auto 2rem',maxWidth:'620px'}}>{type.omschrijving} Onze gecertificeerde vakmensen lossen het op, gemiddeld binnen 30 minuten ter plaatse.</p>

            {/* ZOEKBALK */}
            <div style={{position:'relative',maxWidth:'480px',margin:'0 auto 2rem'}}>
              <input
                type="text"
                placeholder="Zoek jouw stad..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{width:'100%',padding:'1rem 1.25rem 1rem 3rem',borderRadius:'50px',border:'2px solid var(--green4)',fontSize:'1rem',fontFamily:'inherit',outline:'none',boxSizing:'border-box',background:'white',boxShadow:'0 4px 16px rgba(0,0,0,0.08)'}}
              />
              <span style={{position:'absolute',left:'1.1rem',top:'50%',transform:'translateY(-50%)',fontSize:'1.1rem'}}>🔍</span>
              {filtered.length > 0 && (
                <div style={{position:'absolute',top:'calc(100% + 8px)',left:0,right:0,background:'white',border:'1.5px solid var(--border)',borderRadius:'14px',boxShadow:'0 8px 24px rgba(0,0,0,0.12)',zIndex:100,overflow:'hidden'}}>
                  {filtered.slice(0,6).map(s => (
                    <a key={s.slug} href={`/lekkage/${s.slug}/${type.slug}`}
                      style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0.75rem 1.25rem',textDecoration:'none',color:'var(--text)',borderBottom:'1px solid var(--border)',fontSize:'0.9rem',transition:'background 0.15s'}}
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
              <div className="stat-item"><div className="stat-val">130<sup>+</sup></div><div className="stat-key">Steden</div></div>
              <div className="stat-item"><div className="stat-val">24<sup>/7</sup></div><div className="stat-key">Bereikbaar</div></div>
            </div>
            <div className="hero-actions" style={{justifyContent:'center'}}>
              <a href={`tel:${PHONE}`} className="btn-call">📞 Bel direct: {PHONE_DISPLAY}</a>
              <a href="#steden" className="btn-ghost">Kies jouw stad →</a>
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

      {/* OORZAKEN */}
      {type.oorzaken && (
        <section className="section">
          <div className="section-inner">
            <div className="sec-head-center">
              <div className="eyebrow">Oorzaken</div>
              <h2>Veelvoorkomende oorzaken van <em>{type.naam.toLowerCase()}</em></h2>
              <p className="sec-sub">{type.intro}</p>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'1rem',marginTop:'1rem'}}>
              {type.oorzaken.map((o, i) => (
                <div key={i} style={{display:'flex',alignItems:'flex-start',gap:'0.85rem',background:'white',border:'1.5px solid var(--border)',borderRadius:'12px',padding:'1.1rem'}}>
                  <div style={{width:'30px',height:'30px',background:'var(--green3)',color:'var(--green-dark)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.75rem',fontWeight:800,flexShrink:0}}>{i+1}</div>
                  <div>
                    <div style={{fontWeight:600,fontSize:'0.87rem',marginBottom:'0.2rem'}}>{o.icon} {o.titel}</div>
                    <p style={{fontSize:'0.8rem',color:'var(--muted)',lineHeight:1.5}}>{o.tekst}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* STEDEN PER PROVINCIE */}
      <section className="section section-alt" id="steden">
        <div className="section-inner">
          <div className="sec-head-center">
            <div className="eyebrow">Werkgebied</div>
            <h2><em>{type.naam}</em> in jouw stad</h2>
            <p className="sec-sub">Actief in 130+ steden. Klik op jouw stad voor lokale informatie en een directe aanvraag.</p>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:'2rem'}}>
            {provincies.map(prov => {
              const provSteden = steden.filter(s => s.provincie === prov)
              const isOpen = openProv[prov]
              const visible = isOpen ? provSteden : provSteden.slice(0, MAX_VISIBLE)
              return (
                <div key={prov} id={prov.toLowerCase().replace(/\s+/g, '-')} style={{scrollMarginTop:'90px'}}>
                  <h3 style={{fontSize:'0.82rem',fontWeight:700,color:'var(--green-dark)',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:'0.85rem',paddingBottom:'0.5rem',borderBottom:'2px solid var(--green4)'}}>📍 {prov}</h3>
                  <div className="steden-grid">
                    {visible.map(s => (
                      <a key={s.slug} href={`/lekkage/${s.slug}/${type.slug}`} className="stad-a">
                        <span>{s.naam}</span><span className="stad-arrow">→</span>
                      </a>
                    ))}
                  </div>
                  {provSteden.length > MAX_VISIBLE && (
                    <button
                      onClick={() => toggleProv(prov)}
                      style={{marginTop:'0.75rem',background:'none',border:'1.5px solid var(--green4)',borderRadius:'50px',padding:'0.4rem 1rem',fontSize:'0.8rem',fontWeight:600,color:'var(--green-dark)',cursor:'pointer',fontFamily:'inherit',transition:'all 0.2s'}}
                      onMouseEnter={e => e.currentTarget.style.background='var(--green3)'}
                      onMouseLeave={e => e.currentTarget.style.background='none'}
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

      {/* ANDERE DIENSTEN */}
      <section className="section section-white">
        <div className="section-inner">
          <div className="sec-head-center">
            <div className="eyebrow">Andere diensten</div>
            <h2>Meer <em>lekkage specialisaties</em></h2>
            <p className="sec-sub">Naast {type.naam.toLowerCase()} lossen we ook andere lekkageproblemen op.</p>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:'0.75rem',marginTop:'1rem'}}>
            {andereTypes.map(t => (
              <a key={t.slug} href={`/lekkage/${t.slug}`}
                style={{display:'flex',alignItems:'center',gap:'0.85rem',padding:'1rem',background:'white',border:'1.5px solid var(--border)',borderRadius:'12px',textDecoration:'none',color:'var(--text)',transition:'all 0.2s'}}
                onMouseEnter={e => { e.currentTarget.style.borderColor='var(--green)'; e.currentTarget.style.transform='translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.transform='translateY(0)' }}
              >
                <div style={{width:'40px',height:'40px',background:'var(--green3)',borderRadius:'10px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.2rem',flexShrink:0}}>{t.icon}</div>
                <div>
                  <div style={{fontWeight:700,fontSize:'0.88rem'}}>{t.naam}</div>
                  <div style={{fontSize:'0.75rem',color:'var(--muted)',marginTop:'0.1rem'}}>{t.omschrijving?.slice(0,45)}...</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* SEO BLOK */}
      <section className="section">
        <div className="section-inner">
          <div style={{maxWidth:'820px'}}>
            <div className="eyebrow">{type.naam} informatie</div>
            <h2 style={{marginBottom:'1.5rem'}}>{type.naam}: <em>alles wat je moet weten</em></h2>
            <h3>Wat is {type.naam.toLowerCase()} en wanneer handelen?</h3>
            <p>{type.intro} Hoe eerder je ingrijpt, hoe beperkter de schade en hoe lager de kosten.</p>
            <h3>Oorzaken van {type.naam.toLowerCase()}</h3>
            <p>De meest voorkomende oorzaken zijn {type.oorzaken?.slice(0,3).map(o => o.titel?.toLowerCase() || o).join(', ')}. Een vakkundige inspectie stelt snel de juiste diagnose.</p>
            <h3>Kosten {type.naam.toLowerCase()} reparatie</h3>
            <p>De kosten variëren afhankelijk van de omvang en oorzaak. Bij LekkageFix ontvang je altijd een transparante offerte vooraf, volledig vrijblijvend en zonder verborgen kosten.</p>
            <h3>{type.naam} en je verzekering</h3>
            <p>Plotselinge schade valt bij de meeste opstalverzekeringen onder de dekking. Wij zijn erkend door alle grote Nederlandse verzekeraars en stellen een gedetailleerd rapport op voor je claim.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{background:'var(--green3)'}}>
        <div className="section-inner">
          <div className="sec-head-center">
            <div className="eyebrow">Veelgestelde vragen</div>
            <h2><em>{type.naam}</em> — antwoorden op jouw vragen</h2>
          </div>
          <div className="faq-grid">
            {faqs.map((f, i) => (
              <div key={i} className="faq-item">
                <div className="faq-q" onClick={e => e.currentTarget.parentElement.classList.toggle('open')}>
                  {f.v} <span className="faq-arrow">▼</span>
                </div>
                <div className="faq-a">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <div className="bottom-cta">
        <div className="eyebrow" style={{color:'#a8e6c0'}}>{type.naam}</div>
        <h2 style={{color:'white'}}>{type.naam}? Wacht niet te lang.</h2>
        <p>Hoe eerder je belt, hoe kleiner de schade. Dag en nacht bereikbaar, door heel Nederland.</p>
        <div className="cta-btns">
          <a href={`tel:${PHONE}`} className="btn-call">📞 Bel nu: {PHONE_DISPLAY}</a>
          <a href="#steden" className="btn-white-ghost">Kies jouw stad</a>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <div className="footer-top">
          <div>
            <div className="footer-logo">Lekkage<b>Fix</b></div>
            <p className="footer-desc">Vakkundige {type.naam.toLowerCase()} reparaties door heel Nederland. Gecertificeerde vakmensen, transparante prijzen, garantie.</p>
          </div>
          <div className="footer-col">
            <h4>Diensten</h4>
            {lekkageTypes.map(t => <a key={t.slug} href={`/lekkage/${t.slug}`}>{t.naam}</a>)}
          </div>
          <div className="footer-col">
            <h4>Steden</h4>
            {topSteden.slice(0,5).map(s => <a key={s.slug} href={`/lekkage/${s.slug}/${type.slug}`}>{s.naam}</a>)}
            <a href="#steden">Alle steden →</a>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <a href={`tel:${PHONE}`}>{PHONE_DISPLAY} (24/7)</a>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <a href="/lekkage">Gratis offerte</a>
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
