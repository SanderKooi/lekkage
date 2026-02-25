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
  const MAX_VISIBLE = 11

  const filtered = search.trim().length > 1
    ? steden.filter(s =>
        s.naam.toLowerCase().includes(search.toLowerCase()) ||
        s.provincie.toLowerCase().includes(search.toLowerCase()) ||
        s.slug.toLowerCase().includes(search.toLowerCase().replace(/\s+/g, '-'))
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
        <style>{`[id] { scroll-margin-top: 90px; }`}</style>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "LocalBusiness",
              "@id": "https://lekkagefix.nl/#business",
              "name": "LekkageFix",
              "url": "https://lekkagefix.nl",
              "telephone": PHONE,
              "email": EMAIL,
              "openingHours": "Mo-Su 00:00-24:00",
              "priceRange": "€€",
              "areaServed": { "@type": "Country", "name": "Netherlands" },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "2847",
                "bestRating": "5"
              },
              "review": [
                {
                  "@type": "Review",
                  "author": { "@type": "Person", "name": "Martijn V." },
                  "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                  "reviewBody": "Al maanden last van een druipend plafond na regen. LekkageFix vond het lek binnen 20 minuten — een losse dakpan én gescheurde nokbedekking. Dezelfde dag gerepareerd.",
                  "datePublished": "2025-02-10"
                },
                {
                  "@type": "Review",
                  "author": { "@type": "Person", "name": "Sandra K." },
                  "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                  "reviewBody": "Plat dak van onze uitbouw lekte al twee winters. Twee andere bedrijven hadden het niet gevonden. LekkageFix traceerde het naar een verkeerd afgedichte dakdoorvoer. Eindelijk droog!",
                  "datePublished": "2025-01-24"
                },
                {
                  "@type": "Review",
                  "author": { "@type": "Person", "name": "Karin M." },
                  "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                  "reviewBody": "Gesprongen leiding in de muur. LekkageFix vond de oorzaak snel zonder onnodig sloopwerk. Netjes afgedicht en opgeruimd. Aanrader!",
                  "datePublished": "2025-02-17"
                }
              ]
            },
            {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://lekkagefix.nl" },
                { "@type": "ListItem", "position": 2, "name": "Lekkage reparatie", "item": "https://lekkagefix.nl/lekkage" }
              ]
            },
            {
              "@type": "Service",
              "name": "Lekkage reparatie Nederland",
              "provider": { "@id": "https://lekkagefix.nl/#business" },
              "areaServed": { "@type": "Country", "name": "Netherlands" },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Lekkage reparatie diensten",
                "itemListElement": lekkageTypes.map(t => ({
                  "@type": "Offer",
                  "itemOffered": { "@type": "Service", "name": t.naam, "description": t.omschrijving }
                }))
              }
            }
          ]
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

      {/* REVIEWS */}
      <section className="section section-white">
        <div className="section-inner">
          <div className="sec-head-center">
            <div className="eyebrow">Klantervaringen</div>
            <h2>Wat klanten zeggen over <em>LekkageFix</em></h2>
          </div>
          <div className="reviews-summary" style={{marginBottom:'2rem'}}>
            <div className="rating-big">
              <div className="rating-num">4.9</div>
              <div className="rating-stars">★★★★★</div>
              <div className="rating-count">op basis van 2.847 reviews</div>
            </div>
            <div className="rating-bars">
              {[['5★',89],['4★',8],['3★',2],['2★',1],['1★',0]].map(([s,w]) => (
                <div key={s} className="bar-row">
                  <span>{s}</span>
                  <div className="bar-track"><div className="bar-fill" style={{width:`${w}%`}} /></div>
                  <span>{w}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className="reviews-grid">
            {[
              { naam:'Martijn V.', stad:'Amsterdam', tekst:'Al maanden last van een druipend plafond na regen. LekkageFix vond het lek binnen 20 minuten — een losse dakpan én gescheurde nokbedekking. Dezelfde dag gerepareerd.', datum:'2 weken geleden' },
              { naam:'Sandra K.', stad:'Rotterdam', tekst:'Plat dak van onze uitbouw lekte al twee winters. Twee andere bedrijven hadden het niet gevonden. LekkageFix traceerde het naar een verkeerd afgedichte dakdoorvoer. Eindelijk droog!', datum:'1 maand geleden' },
              { naam:'Karin M.', stad:'Den Haag', tekst:'Gesprongen leiding in de muur. LekkageFix vond de oorzaak snel zonder onnodig sloopwerk. Netjes afgedicht en opgeruimd. Aanrader!', datum:'1 week geleden' },
            ].map((r, i) => (
              <div key={i} className="review">
                <div className="review-top"><div className="stars">★★★★★</div><div className="review-date">{r.datum}</div></div>
                <p className="review-text">"{r.tekst}"</p>
                <div className="review-author">
                  <div className="avatar">{r.naam.split(' ').map(n => n[0]).join('')}</div>
                  <div><div className="author-name">{r.naam}</div><div className="author-loc">📍 {r.stad}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STEDEN PER PROVINCIE */}
      <section className="section" id="steden" style={{background:'var(--green3)'}}>
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
              const hasMore = !isOpen && provSteden.length > MAX_VISIBLE
              return (
                <div key={prov} id={prov.toLowerCase().replace(/\s+/g, '-')}>
                  <h3 style={{fontSize:'0.82rem',fontWeight:700,color:'var(--green-dark)',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:'0.85rem',paddingBottom:'0.5rem',borderBottom:'2px solid var(--green4)'}}>📍 {prov}</h3>
                  <div className="steden-grid">
                    {visible.map(s => (
                      <a key={s.slug} href={`/lekkage/dak/${s.slug}`} className="stad-a">
                        <span>{s.naam}</span><span className="stad-arrow">→</span>
                      </a>
                    ))}
                    {hasMore && (
                      <button
                        onClick={() => toggleProv(prov)}
                        className="stad-a"
                        style={{background:'var(--green4)',border:'1.5px solid var(--green)',cursor:'pointer',fontFamily:'inherit',fontWeight:600,color:'var(--green-dark)',justifyContent:'center',gap:'0.4rem'}}
                      >
                        <span>+{provSteden.length - MAX_VISIBLE} meer</span><span className="stad-arrow">▼</span>
                      </button>
                    )}
                    {isOpen && provSteden.length > MAX_VISIBLE && (
                      <button
                        onClick={() => toggleProv(prov)}
                        className="stad-a"
                        style={{background:'var(--green4)',border:'1.5px solid var(--green)',cursor:'pointer',fontFamily:'inherit',fontWeight:600,color:'var(--green-dark)',justifyContent:'center',gap:'0.4rem'}}
                      >
                        <span>Minder tonen</span><span className="stad-arrow">▲</span>
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* SEO BLOK */}
      <section className="section section-white">
        <div className="section-inner">
          <div className="seo-grid">
            <div className="seo-block">
              <div className="eyebrow">Lekkage informatie</div>
              <h2 style={{marginBottom:'1.5rem'}}>Lekkage reparatie: <em>alles wat je moet weten</em></h2>

              <h3>Wat is een lekkage en wanneer moet u handelen?</h3>
              <p>Een lekkage is ongecontroleerde waterindringing in uw woning of gebouw. Van een klein druppeltje op het plafond tot een ondergelopen kelder — elke lekkage vraagt om snelle actie. Water richt in korte tijd aanzienlijke schade aan: houtrot, schimmelvorming, verzwakking van constructies en schade aan interieur. Hoe eerder u ingrijpt, hoe beperkter de schade en hoe lager de kosten.</p>

              <h3>De 7 meest voorkomende typen lekkages in Nederland</h3>
              <p>In Nederland komen zeven typen lekkages het meest voor, elk met een eigen oorzaak en aanpak:</p>
              <ul>
                {lekkageTypes.map(t => <li key={t.slug}><strong>{t.naam}</strong> — {t.omschrijving}</li>)}
              </ul>

              <h3>Lekkage reparatie kosten: wat kunt u verwachten?</h3>
              <p>De kosten van lekkage reparatie variëren sterk per type en omvang. Een eenvoudige kitrand vervangen kost tussen de € 80 en € 200. Een daklekkage reparatie begint vanaf € 75 voor een losse dakpan tot € 1.500 of meer voor gedeeltelijke dakbedekking. Rioollekken en kelderwaterdichting zijn de meest kostbare reparaties. Bij LekkageFix ontvangt u altijd een transparante offerte vooraf — volledig vrijblijvend en zonder verborgen kosten.</p>

              <div className="price-table">
                <table>
                  <thead><tr><th scope="col">Type lekkage</th><th scope="col">Indicatie kosten</th><th scope="col">Reactietijd</th></tr></thead>
                  <tbody>
                    {[
                      ['Daklekkage reparatie','€ 75 – € 1.500','30 min'],
                      ['Waterleiding reparatie','€ 60 – € 1.200','30 min'],
                      ['Badkamer dichting','€ 80 – € 2.500','30 min'],
                      ['Riool inspectie & reparatie','€ 150 – € 4.000','30 min'],
                      ['Vochtbehandeling','€ 100 – € 2.000','30 min'],
                      ['Gevel reparatie','€ 100 – € 3.000','30 min'],
                      ['Kelderwaterdichting','€ 200 – € 12.000','30 min'],
                      ['Volledige inspectie + offerte','Gratis','30 min'],
                    ].map(([r,p,t], i, arr) => (
                      <tr key={i} className={i === arr.length-1 ? 'highlight-row' : ''}>
                        <td>{i === arr.length-1 ? <strong>{r}</strong> : r}</td>
                        <td>{p}</td><td>{t}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="table-note">* Prijzen zijn indicatief en afhankelijk van type, omvang en locatie. Definitieve prijs na inspectie.</p>
              </div>

              <h3>Lekkage en uw verzekering</h3>
              <p>Of uw verzekering de schade vergoedt hangt af van de oorzaak en uw polisvoorwaarden. Plotselinge schade door storm, extreme neerslag of gesprongen leidingen valt doorgaans onder de opstalverzekering. Slijtage, achterstallig onderhoud of geleidelijke lekkages worden vrijwel nooit vergoed. LekkageFix is erkend door alle grote Nederlandse verzekeraars en stelt gedetailleerde rapporten op die u direct kunt gebruiken voor uw schadeclaim.</p>

              <h3>Waarom kiezen voor LekkageFix?</h3>
              <p>Met meer dan 12.000 opgeloste lekkages en een gemiddelde beoordeling van 4.9 sterren is LekkageFix de meest gekozen lekkage specialist van Nederland. Onze monteurs zijn VCA-gecertificeerd, werken met de nieuwste detectieapparatuur en geven garantie op al het uitgevoerde werk. Dag en nacht bereikbaar, gemiddeld binnen 30 minuten ter plaatse.</p>
            </div>

            <div className="seo-sticky">
              <div style={{background:'var(--green3)',border:'1.5px solid var(--green4)',borderRadius:'14px',padding:'1.5rem',marginBottom:'1rem'}}>
                <div className="eyebrow" style={{marginBottom:'0.75rem'}}>Snel handelen?</div>
                <p style={{fontSize:'0.85rem',color:'var(--muted)',marginBottom:'1rem',lineHeight:1.7}}>Bel direct voor spoedservice. Onze monteurs zijn gemiddeld binnen 30 minuten ter plaatse.</p>
                <a href={`tel:${PHONE}`} className="btn-call" style={{width:'100%',justifyContent:'center',fontSize:'0.95rem'}}>📞 {PHONE_DISPLAY}</a>
              </div>
              <div style={{background:'white',border:'1.5px solid var(--border)',borderRadius:'14px',padding:'1.5rem'}}>
                <div style={{fontSize:'0.8rem',fontWeight:700,color:'var(--text)',marginBottom:'1rem'}}>✓ Onze specialisaties</div>
                <div style={{display:'flex',flexDirection:'column',gap:'0.5rem',fontSize:'0.82rem',color:'var(--muted)'}}>
                  {lekkageTypes.map(t => (
                    <a key={t.slug} href={`/lekkage/${t.slug}`} style={{display:'flex',alignItems:'center',gap:'0.5rem',color:'var(--muted)',textDecoration:'none',transition:'color 0.2s'}}
                      onMouseEnter={e => e.currentTarget.style.color='var(--green)'}
                      onMouseLeave={e => e.currentTarget.style.color='var(--muted)'}
                    >
                      <span>{t.icon}</span><span>{t.naam}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
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
