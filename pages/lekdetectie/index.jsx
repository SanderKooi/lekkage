import Head from 'next/head'
import Nav from '../../components/Nav'
import { useState } from 'react'
import { lekkageTypes, steden } from '../../data'

const PHONE = '0800-1234'
const PHONE_DISPLAY = '0800-1234'
const EMAIL = 'info@lekkagefix.nl'

const provincies = [...new Set(steden.map(s => s.provincie))].sort()
const topSteden = steden.slice(0, 8)

export default function LekdetectieIndex() {
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
        <title>Lekdetectie Nederland – Lek Opsporen Zonder Sloopwerk | LekkageFix</title>
        <meta name="description" content="Professionele lekdetectie door heel Nederland. Wij vinden de exacte locatie van uw lekkage met thermische camera, akoestische detectie en tracergas — zonder sloopwerk. 24/7 bereikbaar." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://lekkagefix.nl/lekdetectie" />
        <meta property="og:title" content="Lekdetectie Nederland – Lek Opsporen Zonder Sloopwerk | LekkageFix" />
        <meta property="og:description" content="Professionele lekdetectie in heel Nederland. 95% zonder sloopwerk. 24/7 bereikbaar." />
        <meta property="og:url" content="https://lekkagefix.nl/lekdetectie" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
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
              "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "2847", "bestRating": "5" },
              "review": [
                { "@type": "Review", "author": { "@type": "Person", "name": "Joost H." }, "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }, "reviewBody": "Waterleiding lek in de muur. LekkageFix vond het met tracergas zonder ook maar één tegel te breken. Professioneel en snel.", "datePublished": "2025-02-14" },
                { "@type": "Review", "author": { "@type": "Person", "name": "Petra L." }, "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }, "reviewBody": "Lekdetectie via thermische camera — binnen 30 minuten wisten we exact waar het lek zat. Andere bedrijven wilden direct slopen.", "datePublished": "2025-02-03" },
                { "@type": "Review", "author": { "@type": "Person", "name": "Frank D." }, "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }, "reviewBody": "Camera-inspectie van het riool gaf direct duidelijkheid. Helder rapport, eerlijke offerte. Aanrader voor iedereen met lekkageproblemen.", "datePublished": "2025-01-28" }
              ]
            },
            {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://lekkagefix.nl" },
                { "@type": "ListItem", "position": 2, "name": "Lekdetectie", "item": "https://lekkagefix.nl/lekdetectie" }
              ]
            },
            {
              "@type": "Service",
              "name": "Lekdetectie Nederland",
              "provider": { "@id": "https://lekkagefix.nl/#business" },
              "areaServed": { "@type": "Country", "name": "Netherlands" },
              "description": "Professionele lekdetectie met thermische camera, akoestische detectie en tracergas — zonder sloopwerk.",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Lekdetectie methoden",
                "itemListElement": [
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Thermische camera detectie" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Akoestische lekdetectie" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Tracergas detectie" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Camera-inspectie riool" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Druktest leidingen" } }
                ]
              }
            }
          ]
        }) }} />
      </Head>
      <Nav activePath="/lekdetectie" />

      {/* BREADCRUMB */}
      <div className="breadcrumb-bar">
        <div className="breadcrumb">
          <a href="/">Home</a><span className="breadcrumb-sep">›</span>
          <span>Lekdetectie</span>
        </div>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-dots" />
        <div className="hero-inner" style={{gridTemplateColumns:'1fr',maxWidth:'820px',margin:'0 auto',textAlign:'center'}}>
          <div>
            <div className="hero-badge"><span className="pulse" /> Zonder sloopwerk · heel Nederland</div>
            <h1>Lekdetectie — <em>lek opsporen zonder hak- en breekwerk</em></h1>
            <p className="hero-sub" style={{margin:'0 auto 2rem',maxWidth:'620px'}}>Wij vinden de exacte locatie van uw lekkage met geavanceerde detectieapparatuur. Thermische camera, akoestische detectie en tracergas — 95% van alle lekken opgespoord zonder ook maar één tegel te breken.</p>

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
                    <a key={s.slug} href={`/lekdetectie/${s.slug}`} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0.75rem 1.25rem',textDecoration:'none',color:'var(--text)',borderBottom:'1px solid var(--border)',fontSize:'0.9rem',transition:'background 0.15s'}}
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
              <div className="stat-item"><div className="stat-val">95<sup>%</sup></div><div className="stat-key">Zonder sloop</div></div>
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
          <div className="ti-item"><span className="ti-check">✓</span><span><strong>Geen</strong> sloopwerk nodig</span></div>
          <div className="ti-item"><span className="ti-check">✓</span><span><strong>Erkend</strong> door verzekeraars</span></div>
          <div className="ti-item"><span className="ti-check">✓</span><span><strong>Gedetailleerde</strong> rapportage</span></div>
          <div className="ti-item"><span className="ti-check">✓</span><span><strong>24/7</strong> bereikbaar</span></div>
        </div>
      </div>

      {/* METHODEN */}
      <section className="section" id="methoden">
        <div className="section-inner">
          <div className="sec-head-center">
            <div className="eyebrow">Detectiemethoden</div>
            <h2>Lekdetectie <em>zonder sloopwerk</em></h2>
            <p className="sec-sub">Met drie geavanceerde methoden vinden we 95% van alle lekken zonder ook maar één tegel te breken.</p>
          </div>
          <div className="svc-grid">
            {[
              { icon:'🌡️', naam:'Thermische camera', omschrijving:'Warmtebeeldcamera\'s detecteren temperatuurverschillen door vocht achter muren en vloeren — volledig non-destructief en direct zichtbaar.' },
              { icon:'🔊', naam:'Akoestische detectie', omschrijving:'Geavanceerde luisterapparatuur vangt het geluid van stromend water op, zelfs diep in de muur of onder de vloer.' },
              { icon:'🧪', naam:'Tracergas detectie', omschrijving:'Een onschadelijk gas in de leiding ontsnapt op de lekplek — een detector vindt exact de positie aan de oppervlakte.' },
              { icon:'📋', naam:'Lekrapportage', omschrijving:'Na elke detectie ontvangt u een gedetailleerd rapport met foto\'s en bevindingen — direct bruikbaar voor de verzekering.' },
              { icon:'💧', naam:'Druktest leidingen', omschrijving:'Met een druktest bepalen we snel of er een lekkage in uw leidingnet aanwezig is en hoe groot die is.' },
              { icon:'📷', naam:'Camera-inspectie riool', omschrijving:'Een HD-camera rijdt door uw riolering en toont live de staat van de leidingen — verzakking, wortelindringing en scheuren.' },
            ].map(m => (
              <div key={m.naam} className="svc" style={{cursor:'default'}}>
                <div className="svc-icon">{m.icon}</div>
                <h3>{m.naam}</h3>
                <p>{m.omschrijving}</p>
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
            <h2>Wat klanten zeggen over <em>lekdetectie</em></h2>
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
              { naam:'Joost H.', stad:'Utrecht', tekst:'Waterleiding lek in de muur. LekkageFix vond het met tracergas zonder ook maar één tegel te breken. Professioneel en snel.', datum:'2 weken geleden' },
              { naam:'Petra L.', stad:'Haarlem', tekst:'Lekdetectie via thermische camera — binnen 30 minuten wisten we exact waar het lek zat. Andere bedrijven wilden direct slopen.', datum:'3 weken geleden' },
              { naam:'Frank D.', stad:'Rotterdam', tekst:'Camera-inspectie van het riool gaf direct duidelijkheid. Helder rapport, eerlijke offerte. Aanrader voor iedereen met lekkageproblemen.', datum:'1 maand geleden' },
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
            <h2>Lekdetectie per <em>stad</em></h2>
            <p className="sec-sub">Klik op jouw stad voor specifieke informatie en een directe aanvraag.</p>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:'2rem'}}>
            {provincies.map(prov => {
              const provSteden = steden.filter(s => s.provincie === prov)
              const isOpen = openProv[prov]
              const visible = isOpen ? provSteden : provSteden.slice(0, MAX_VISIBLE)
              const hasMore = !isOpen && provSteden.length > MAX_VISIBLE
              return (
                <div key={prov}>
                  <h3 style={{fontSize:'0.82rem',fontWeight:700,color:'var(--green-dark)',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:'0.85rem',paddingBottom:'0.5rem',borderBottom:'2px solid var(--green4)'}}>📍 {prov}</h3>
                  <div className="steden-grid">
                    {visible.map(s => (
                      <a key={s.slug} href={`/lekdetectie/${s.slug}`} className="stad-a">
                        <span>{s.naam}</span><span className="stad-arrow">→</span>
                      </a>
                    ))}
                    {hasMore && (
                      <button onClick={() => toggleProv(prov)} className="stad-a"
                        style={{background:'var(--green4)',border:'1.5px solid var(--green)',cursor:'pointer',fontFamily:'inherit',fontWeight:600,color:'var(--green-dark)',justifyContent:'center',gap:'0.4rem'}}>
                        <span>+{provSteden.length - MAX_VISIBLE} meer</span><span className="stad-arrow">▼</span>
                      </button>
                    )}
                    {isOpen && provSteden.length > MAX_VISIBLE && (
                      <button onClick={() => toggleProv(prov)} className="stad-a"
                        style={{background:'var(--green4)',border:'1.5px solid var(--green)',cursor:'pointer',fontFamily:'inherit',fontWeight:600,color:'var(--green-dark)',justifyContent:'center',gap:'0.4rem'}}>
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
              <div className="eyebrow">Lekdetectie informatie</div>
              <h2 style={{marginBottom:'1.5rem'}}>Lekdetectie: <em>alles wat je moet weten</em></h2>

              <h3>Wat is lekdetectie en wanneer heeft u het nodig?</h3>
              <p>Lekdetectie is het professioneel opsporen van de exacte locatie van een lekkage met behulp van geavanceerde apparatuur. U heeft lekdetectie nodig als de oorzaak van uw lekkage niet zichtbaar is — water reist namelijk langs constructies en wordt zichtbaar op een plek die soms meters verwijderd is van het werkelijke lek. Zonder detectie wordt er onnodig gesloopt of wordt de verkeerde plek gerepareerd.</p>

              <h3>Lekdetectie zonder sloopwerk: hoe werkt het?</h3>
              <p>Moderne lekdetectie is volledig non-destructief. Met een thermische camera meten we temperatuurverschillen in muren en vloeren — vochtige plekken zijn koeler en direct zichtbaar op het scherm. Akoestische detectieapparatuur 'hoort' het geluid van stromend water door muren heen. Bij leidinglekkages gebruiken we tracergas: een onschadelijke gasmix die via het leidingnet ontsnapt op de lekplek en door een detector aan de oppervlakte wordt gevonden. In 95% van de gevallen vinden we het lek zonder ook maar één tegel te verwijderen.</p>

              <h3>Lekdetectie kosten en verzekering</h3>
              <p>De kosten voor lekdetectie variëren van € 150 tot € 450 afhankelijk van de methode en de complexiteit. Bij LekkageFix ontvangt u altijd een transparante offerte vooraf. Veel verzekeringen vergoeden de detectiekosten als onderdeel van de waterschadeclaim — wij stellen een gedetailleerd rapport op dat u direct kunt indienen bij uw verzekeraar. We zijn erkend door alle grote Nederlandse verzekeraars.</p>

              <h3>Lekdetectie in uw regio</h3>
              <p>LekkageFix is actief in meer dan 130 steden door heel Nederland. Onze specialisten zijn gelijkmatig verspreid over het land zodat we gemiddeld binnen 30 minuten bij u zijn. Van Groningen tot Zeeland, van Utrecht tot de Randstad — er is altijd een gecertificeerde lekdetectie specialist in uw buurt beschikbaar.</p>
            </div>

            <div className="seo-sticky">
              <div style={{background:'var(--green3)',border:'1.5px solid var(--green4)',borderRadius:'14px',padding:'1.5rem',marginBottom:'1rem'}}>
                <div className="eyebrow" style={{marginBottom:'0.75rem'}}>Snel handelen?</div>
                <p style={{fontSize:'0.85rem',color:'var(--muted)',marginBottom:'1rem',lineHeight:1.7}}>Bel direct voor spoedservice. Onze specialisten zijn gemiddeld binnen 30 minuten ter plaatse.</p>
                <a href={`tel:${PHONE}`} className="btn-call" style={{width:'100%',justifyContent:'center',fontSize:'0.95rem'}}>📞 {PHONE_DISPLAY}</a>
              </div>
              <div style={{background:'white',border:'1.5px solid var(--border)',borderRadius:'14px',padding:'1.5rem'}}>
                <div style={{fontSize:'0.8rem',fontWeight:700,color:'var(--text)',marginBottom:'1rem'}}>✓ Onze detectiemethoden</div>
                <div style={{display:'flex',flexDirection:'column',gap:'0.5rem',fontSize:'0.82rem',color:'var(--muted)'}}>
                  {['🌡️ Thermische camera','🔊 Akoestische detectie','🧪 Tracergas','📷 Camera-inspectie riool','💧 Druktest leidingen','📋 Lekrapportage'].map((m,i) => (
                    <span key={i}>✓ {m}</span>
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
        <h2 style={{color:'white'}}>Lek opsporen? Wacht niet te lang.</h2>
        <p>Hoe eerder we het lek vinden, hoe kleiner de schade. Onze specialisten staan voor je klaar.</p>
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
            <p className="footer-desc">Vakkundige lekdetectie door heel Nederland. Gecertificeerde specialisten, transparante prijzen, garantie op werk.</p>
          </div>
          <div className="footer-col">
            <h4>Diensten</h4>
            <a href="/lekdetectie">Lekdetectie</a>
            {lekkageTypes.slice(0,3).map(t => <a key={t.slug} href={`/lekkage/${t.slug}`}>{t.naam}</a>)}
          </div>
          <div className="footer-col">
            <h4>Steden</h4>
            {topSteden.slice(0,5).map(s => <a key={s.slug} href={`/lekdetectie/${s.slug}`}>{s.naam}</a>)}
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
