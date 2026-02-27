import Head from 'next/head'
import Nav from '../../../components/Nav'
import { useState } from 'react'
import { steden, lekkageTypes, getType } from '../../../data'

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
  const [submitted, setSubmitted] = useState(false)
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
          { "@type": "ListItem", "position": 3, "name": type.naam, "item": `https://lekkagefix.nl/lekkage/dienst/${type.slug}` },
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
        <link rel="canonical" href={`https://lekkagefix.nl/lekkage/dienst/${type.slug}`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`https://lekkagefix.nl/lekkage/dienst/${type.slug}`} />
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
        <div className="hero-inner">
          <div>
            <div className="hero-badge"><span className="pulse" /> 24/7 bereikbaar · heel Nederland</div>
            <span style={{fontSize:'2.5rem',display:'block',marginBottom:'0.5rem'}}>{type.icon}</span>
            <h1><em>{type.naam}</em> — snel,<br/>vakkundig &<br/>gegarandeerd.</h1>
            <p className="hero-sub">{type.omschrijving} Onze gecertificeerde vakmensen lossen het op, gemiddeld binnen 30 minuten ter plaatse.</p>
            <div className="hero-stats">
              <div className="stat-item"><div className="stat-val">30<sup>min</sup></div><div className="stat-key">Gem. reactie</div></div>
              <div className="stat-item"><div className="stat-val">4.9<sup>★</sup></div><div className="stat-key">Beoordeling</div></div>
              <div className="stat-item"><div className="stat-val">130<sup>+</sup></div><div className="stat-key">Steden</div></div>
              <div className="stat-item"><div className="stat-val">24<sup>/7</sup></div><div className="stat-key">Bereikbaar</div></div>
            </div>
            <div className="hero-actions">
              <a href={`tel:${PHONE}`} className="btn-call">📞 Bel direct: {PHONE_DISPLAY}</a>
              <a href="#steden" className="btn-ghost">Kies jouw stad →</a>
            </div>
          </div>

          <div className="form-card" id="offerte">
            <div className="form-title">{type.naam} aanvragen</div>
            <div className="form-sub">Gratis & vrijblijvend · we nemen snel contact op</div>
            <div className="fg">
              <label>Jouw stad</label>
              <div style={{position:'relative'}}>
                <input
                  type="text"
                  placeholder="Zoek jouw stad..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{width:'100%',boxSizing:'border-box'}}
                />
                {filtered.length > 0 && (
                  <div style={{position:'absolute',top:'calc(100% + 4px)',left:0,right:0,background:'white',border:'1.5px solid var(--border)',borderRadius:'10px',boxShadow:'0 8px 24px rgba(0,0,0,0.12)',zIndex:100,overflow:'hidden'}}>
                    {filtered.slice(0,5).map(s => (
                      <a key={s.slug} href={`/lekkage/${type.slug}/${s.slug}`}
                        style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0.65rem 1rem',textDecoration:'none',color:'var(--text)',borderBottom:'1px solid var(--border)',fontSize:'0.85rem'}}
                        onMouseEnter={e => e.currentTarget.style.background='var(--green3)'}
                        onMouseLeave={e => e.currentTarget.style.background='white'}>
                        <span>📍 {s.naam}</span>
                        <span style={{fontSize:'0.75rem',color:'var(--muted)'}}>{s.provincie}</span>
                      </a>
                    ))}
                  </div>
                )}
                {search.trim().length > 1 && filtered.length === 0 && (
                  <div style={{position:'absolute',top:'calc(100% + 4px)',left:0,right:0,background:'white',border:'1.5px solid var(--border)',borderRadius:'10px',padding:'0.75rem 1rem',fontSize:'0.85rem',color:'var(--muted)',boxShadow:'0 8px 24px rgba(0,0,0,0.12)',zIndex:100}}>
                    Niet gevonden — bel ons op {PHONE_DISPLAY}
                  </div>
                )}
              </div>
            </div>
            <div className="form-row">
              <div className="fg"><label>Naam</label><input type="text" placeholder="Jan de Vries" /></div>
              <div className="fg"><label>Telefoon</label><input type="tel" placeholder="06-12345678" /></div>
            </div>
            <div className="fg"><label>Omschrijving (optioneel)</label><textarea placeholder={`Beschrijf kort het ${type.naam.toLowerCase()} probleem...`} /></div>
            <button className={`btn-form${submitted ? ' ok' : ''}`} onClick={() => setSubmitted(true)}>
              {submitted ? '✓ Aanvraag ontvangen!' : 'Stuur aanvraag →'}
            </button>
            <div className="form-trust"><span>🔒 Veilig</span><span>✓ Geen spam</span><span>⚡ Snelle reactie</span></div>
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
                      <a key={s.slug} href={`/lekkage/${type.slug}/${s.slug}`} className="stad-a">
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
              <a key={t.slug} href={`/lekkage/dienst/${t.slug}`}
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
      <section className="section section-white">
        <div className="section-inner">
          <div className="seo-grid">
            <div className="seo-block">
              <div className="eyebrow">{type.naam} informatie</div>
              <h2 style={{marginBottom:'1.5rem'}}>{type.naam}: <em>alles wat je moet weten</em></h2>

              {/* PER-DIENST SEO CONTENT */}
              {type.slug === 'lekkage-dak' && <>
                <h3>Wat is een daklekkage?</h3>
                <p>Een daklekkage ontstaat wanneer water door je dak naar binnen komt. Dit kan via een beschadigde dakpan, een scheur in de dakbedekking of een slecht afgedichte dakdoorvoer (een plek waar iets door het dak heen gaat, zoals een schoorsteen of ventilatiebuis). Water zoekt altijd de weg naar beneden, waardoor een daklekkage zich vaak pas laat zien op een plek ver van de werkelijke oorzaak. Je ziet dan een natte vlek op het plafond, terwijl het lek eigenlijk meters verderop zit.</p>

                <h3>Wanneer moet je actie ondernemen?</h3>
                <p>Handel direct als je een natte plek op het plafond ziet, als dakpannen zijn verschoven of gebroken, als er na regen water binnenkwam, of als je schimmel ruikt op zolder. Een daklekkage lost zichzelf nooit op. Hout dat lang vochtig blijft begint te rotten en schimmel verspreidt zich razendsnel. Hoe langer je wacht, hoe duurder de reparatie.</p>

                <h3>De meest voorkomende oorzaken van een daklekkage</h3>
                <p>Veruit de meeste daklekkages in Nederland worden veroorzaakt door verouderde of beschadigde dakbedekking op platte daken. Bitumen (een zwart, rubberachtig materiaal dat op platte daken wordt geplakt) wordt na 15 tot 20 jaar brokkelig en gaat scheuren. Bij schuin dak zijn verschoven of gebroken dakpannen de meest voorkomende oorzaak. Andere veelvoorkomende oorzaken zijn kapot voegwerk rondom de schoorsteen, verouderd kit rondom dakramen en dakkapellen, verstopte of lekkende dakgoten waardoor water terugstroomt onder de dakbedekking, en stormschade waarbij dakpannen zijn opgetild.</p>

                <h3>Hoe repareren wij een daklekkage?</h3>
                <p>Onze monteur begint altijd met een grondige inspectie van het dak. We zoeken systematisch naar de oorzaak, want de zichtbare waterschade binnen zegt niet altijd waar het lek zit. Na de diagnose volgt een heldere offerte. Kleine reparaties zoals het terugleggen van een dakpan of het opnieuw kitten van een aansluiting zijn vaak binnen een uur klaar. Grotere werkzaamheden zoals het gedeeltelijk vernieuwen van dakbedekking plannen we zorgvuldig in. Op al ons werk geven we garantie.</p>

                <h3>Kosten daklekkage reparatie</h3>
                <p>Wat een daklekkage reparatie kost hangt af van de oorzaak en de omvang. Een losse dakpan terugleggen kost weinig. Het vervangen van een groot stuk dakbedekking op een plat dak is een groter werk. Hieronder zie je een overzicht van indicatieve prijzen. Je ontvangt altijd eerst een gratis offerte, zodat je nooit voor verrassingen komt te staan.</p>

                <div className="price-table">
                  <table>
                    <thead><tr><th scope="col">Type werkzaamheid</th><th scope="col">Indicatie kosten</th><th scope="col">Reactietijd</th></tr></thead>
                    <tbody>
                      {[
                        { werk: 'Inspectie & diagnose', prijs: 'Gratis', tijd: '30 min' },
                        { werk: 'Dakpan terugleggen of vervangen', prijs: '€ 75 – € 200', tijd: '30 min' },
                        { werk: 'Kit vervangen rondom dakraam of schoorsteen', prijs: '€ 100 – € 300', tijd: '30 min' },
                        { werk: 'Gedeeltelijke vernieuwing plat dak', prijs: '€ 300 – € 1.500', tijd: '30 min' },
                        { werk: 'Volledige dakbedekking vernieuwen', prijs: 'Op aanvraag', tijd: '30 min' },
                      ].map((r, i) => (
                        <tr key={i} className={i === 0 ? 'highlight-row' : ''}>
                          <td>{i === 0 ? <strong>{r.werk}</strong> : r.werk}</td>
                          <td>{r.prijs}</td><td>{r.tijd}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="table-note">* Prijzen zijn indicatief. Definitieve prijs na inspectie.</p>
                </div>

                <h3>Daklekkage en je verzekering</h3>
                <p>Een daklekkage door plotselinge stormschade of een gebroken dakpan valt bij de meeste opstalverzekeringen onder de dekking. Een lekkage door achterstallig onderhoud (wanneer je het dak al jaren niet hebt laten nakijken) wordt meestal niet vergoed. Twijfel je? Wij stellen een gedetailleerd inspectierapport op dat je direct kunt insturen bij je verzekeraar. We zijn erkend door alle grote Nederlandse verzekeraars.</p>
              </>}

              {type.slug === 'lekkage-waterleiding' && <>
                <h3>Wat is een lekkage waterleiding?</h3>
                <p>Een lekkage aan de waterleiding betekent dat er ergens in je leidingnet water ontsnapt. Dit kan zichtbaar zijn, zoals water dat langs de muur loopt, maar ook onzichtbaar, zoals een leiding die achter de muur of onder de vloer langzaam lekt. Een lekkende waterleiding is een van de meest voorkomende oorzaken van waterschade in Nederlandse woningen. Het vervelende is dat je het soms pas merkt als de schade al groot is.</p>

                <h3>Hoe herken je een lekkende waterleiding?</h3>
                <p>Let op de volgende signalen: een onverklaarbaar hoge waterrekening (meer water verbruik dan normaal zonder duidelijke reden), een voortdurend zacht ruisend of druppelend geluid in de muren, natte of verkleurde plekken op muren of vloeren, schimmelvorming op plekken waar het normaal droog hoort te zijn, of een waterdruk die steeds lager wordt. Als de watermeter doorloopt terwijl alle kranen dicht zijn, heb je vrijwel zeker een lekkage.</p>

                <h3>Veelvoorkomende oorzaken</h3>
                <p>Leidingen gaan kapot door ouderdom en roest, dit geldt met name voor oudere koperen of ijzeren leidingen die na 30 tot 40 jaar slijten. Vorstschade is een andere veelvoorkomende oorzaak: water zet uit als het bevriest en kan de leiding letterlijk splijten. Verder kunnen slechte verbindingen of aansluitingen na verloop van tijd gaan lekken, en kan een te hoge waterdruk (overdruk is een waterdruk van meer dan 3 bar) de leidingen beschadigen.</p>

                <h3>Hoe repareren wij een lekkage waterleiding?</h3>
                <p>Wij beginnen met het opsporen van het lek. Met moderne detectieapparatuur, zoals een akoestische lekzoekmethode waarbij we het geluid van stromend water opvangen, kunnen we in 95% van de gevallen het lek vinden zonder sloopwerk. Na het vinden van het lek repareren we de leiding op de minst invasieve manier. Soms volstaat een koppelstuk, soms is een groter stuk leiding vervangen. We werken netjes en ruimen altijd alles op.</p>

                <h3>Kosten lekkage waterleiding reparatie</h3>
                <p>De kosten zijn sterk afhankelijk van waar het lek zit. Een zichtbare lekkage bij een koppeling is snel en goedkoop te repareren. Een lek diep in de muur vraagt meer werk. Zie hieronder de indicatieve prijzen.</p>

                <div className="price-table">
                  <table>
                    <thead><tr><th scope="col">Type werkzaamheid</th><th scope="col">Indicatie kosten</th><th scope="col">Reactietijd</th></tr></thead>
                    <tbody>
                      {[
                        { werk: 'Inspectie & lekdetectie', prijs: 'Gratis', tijd: '30 min' },
                        { werk: 'Reparatie zichtbare leiding', prijs: '€ 60 – € 200', tijd: '30 min' },
                        { werk: 'Reparatie leiding in muur of vloer', prijs: '€ 200 – € 800', tijd: '30 min' },
                        { werk: 'Gedeeltelijke leidingvervanging', prijs: '€ 400 – € 1.500', tijd: '30 min' },
                        { werk: 'Volledige leidingvernieuwing', prijs: 'Op aanvraag', tijd: '30 min' },
                      ].map((r, i) => (
                        <tr key={i} className={i === 0 ? 'highlight-row' : ''}>
                          <td>{i === 0 ? <strong>{r.werk}</strong> : r.werk}</td>
                          <td>{r.prijs}</td><td>{r.tijd}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="table-note">* Prijzen zijn indicatief. Definitieve prijs na inspectie.</p>
                </div>

                <h3>Lekkage waterleiding en je verzekering</h3>
                <p>Plotselinge schade door een gesprongen waterleiding valt bij de meeste opstalverzekeringen onder de dekking. Geleidelijke lekkages door ouderdom worden meestal niet vergoed. Wij stellen een gedetailleerd rapport op dat je kunt gebruiken voor je schadeclaim.</p>
              </>}

              {type.slug === 'lekkage-badkamer' && <>
                <h3>Wat is een badkamerlekkage?</h3>
                <p>Een badkamerlekkage is een lekkage die vanuit de badkamer ontstaat en water doorlaat naar de verdieping eronder of naar aangrenzende muren. Dit klinkt eenvoudig, maar een badkamerlekkage is vaak lastig te vinden. Water kan via een haarfijne scheur in de tegels, langs een versleten kitrand of door een beschadigde waterdichte laag (ook wel waterbarende laag of badkamerisolatie genoemd) de vloer of muur ingaan. Je buurman op de verdieping eronder merkt het vaak eerder dan jijzelf.</p>

                <h3>Hoe herken je een badkamerlekkage?</h3>
                <p>Signalen zijn: een natte of verkleurde plek op het plafond van de ruimte onder de badkamer, loslating van tegels of zwellende vloerdelen rondom de douche of het bad, schimmelvorming op plaatsen die niet direct contact hebben met water, een doordringende vochtgeur in de badkamer of eronder, of zichtbaar verouderd of gebarsten kitwerk rondom de douche of het bad.</p>

                <h3>Veelvoorkomende oorzaken van badkamerlekkage</h3>
                <p>De meest voorkomende oorzaak is versleten of gebarsten kit. Kit (het flexibele afdichtingsmateriaal rondom de douche of het bad) gaat na vijf tot tien jaar scheuren en laat dan water door. Een andere veelvoorkomende oorzaak is een beschadigde waterdichte laag onder de tegels. Deze laag, die aangebracht wordt voor het tegelen, kan door verzakking of beweging van de vloer scheuren. Ook een lekke afvoer of een beschadigd sifon (het waterslot onder de douche dat geur tegenhoudt) zorgt regelmatig voor lekkages.</p>

                <h3>Hoe repareren wij een badkamerlekkage?</h3>
                <p>We beginnen met een grondige visuele inspectie en vochtmeting. Met een vochtmeter stellen we precies vast hoe vochtig de vloer en wanden zijn en waar het vocht vandaan komt. In veel gevallen is het vernieuwen van de kit al voldoende. Als de waterdichte laag beschadigd is, brengen we een nieuwe laag aan zonder per se alle tegels te hoeven verwijderen. Alleen als de schade groot is, is een gedeeltelijke of volledige verbouwing nodig.</p>

                <h3>Kosten badkamerlekkage reparatie</h3>
                <p>Een kitbehandeling is relatief goedkoop. Een beschadigde waterdichte laag herstellen is een groter werk. Zie de indicatieve prijzen hieronder.</p>

                <div className="price-table">
                  <table>
                    <thead><tr><th scope="col">Type werkzaamheid</th><th scope="col">Indicatie kosten</th><th scope="col">Reactietijd</th></tr></thead>
                    <tbody>
                      {[
                        { werk: 'Inspectie & vochtmeting', prijs: 'Gratis', tijd: '30 min' },
                        { werk: 'Kit vernieuwen rondom douche of bad', prijs: '€ 80 – € 250', tijd: '30 min' },
                        { werk: 'Afvoer of sifon repareren', prijs: '€ 100 – € 300', tijd: '30 min' },
                        { werk: 'Waterdichte laag herstellen', prijs: '€ 400 – € 2.000', tijd: '30 min' },
                        { werk: 'Gedeeltelijke badkamerrenovatie', prijs: 'Op aanvraag', tijd: '30 min' },
                      ].map((r, i) => (
                        <tr key={i} className={i === 0 ? 'highlight-row' : ''}>
                          <td>{i === 0 ? <strong>{r.werk}</strong> : r.werk}</td>
                          <td>{r.prijs}</td><td>{r.tijd}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="table-note">* Prijzen zijn indicatief. Definitieve prijs na inspectie.</p>
                </div>

                <h3>Badkamerlekkage en je verzekering</h3>
                <p>Plotselinge schade door een gesprongen afvoer of een plotseling kapotte aansluiting kan vergoed worden door je opstalverzekering. Slijtage aan kit of verouderde tegels valt buiten de dekking. Wij stellen altijd een inspectierapport op zodat je weet wat er is en wat vergoed kan worden.</p>
              </>}

              {type.slug === 'riool-lekkage' && <>
                <h3>Wat is een rioollekkage?</h3>
                <p>Een rioollekkage is een lekkage in de riolering van je woning, het leidingnet dat al het afvalwater afvoert naar het gemeentelijk riool. Dit kan gaan om de leidingen onder de vloer, in de muren of buiten in de grond. Een rioollekkage is niet alleen vervelend door de vochtigheid, maar ook door de geur die erbij komt kijken. Rioolgas bevat bacterien en is ongezond om in te ademen, dus snel handelen is belangrijk.</p>

                <h3>Hoe herken je een rioollekkage?</h3>
                <p>De meest duidelijke signalen zijn een aanhoudende rioollucht in huis terwijl alle afvoeren schoon zijn, water dat terugstroomt uit het toilet of de douche, een traag afvoerende wasbak of douche (wat kan duiden op een verstopping of een beschadigde leiding), natte plekken op de vloer rondom het toilet of de douche zonder duidelijke oorzaak, of insecten (zoals fruitvliegjes of kakkerlakken) die via de riolering binnenkomen.</p>

                <h3>Veelvoorkomende oorzaken</h3>
                <p>Rioollekkages ontstaan vaak door ouderdom van de leidingen. PVC-leidingen (kunststof leidingen die sinds de jaren 70 worden gebruikt) gaan lang mee, maar kunnen na decennia gaan scheuren of verzakken. Wortelindringing is een andere veelvoorkomende oorzaak: boomwortels groeien naar de warmte en vochtigheid van rioolbuizen toe en kunnen deze beschadigen. Verstoppingen door vet, doekjes of andere materialen die niet in het toilet thuishoren, kunnen ook leiden tot drukopbouw en uiteindelijk lekkage.</p>

                <h3>Hoe repareren wij een rioollekkage?</h3>
                <p>We beginnen vrijwel altijd met een camera-inspectie. We rijden een kleine HD-camera door de rioolleiding en zien live op een scherm precies waar en wat het probleem is. Dit voorkomt onnodig sloopwerk. Afhankelijk van de bevindingen reinigen we de leiding met een hogedrukspuit, repareren we een specifieke beschadiging, of brengen we een inliner aan. Een inliner is een nieuwe buis die van binnenuit in de bestaande leiding wordt geplaatst, zodat we de grond niet hoeven op te graven.</p>

                <h3>Kosten rioollekkage reparatie</h3>
                <p>De kosten hangen sterk af van waar het probleem zit en hoe groot het is. Zie hieronder de indicatieve prijzen.</p>

                <div className="price-table">
                  <table>
                    <thead><tr><th scope="col">Type werkzaamheid</th><th scope="col">Indicatie kosten</th><th scope="col">Reactietijd</th></tr></thead>
                    <tbody>
                      {[
                        { werk: 'Camera-inspectie riolering', prijs: 'Gratis', tijd: '30 min' },
                        { werk: 'Reiniging met hogedrukspuit', prijs: '€ 150 – € 400', tijd: '30 min' },
                        { werk: 'Reparatie kleine beschadiging', prijs: '€ 200 – € 600', tijd: '30 min' },
                        { werk: 'Inliner plaatsen (geen opgraving)', prijs: '€ 500 – € 2.000', tijd: '30 min' },
                        { werk: 'Vervanging rioolleiding', prijs: 'Op aanvraag', tijd: '30 min' },
                      ].map((r, i) => (
                        <tr key={i} className={i === 0 ? 'highlight-row' : ''}>
                          <td>{i === 0 ? <strong>{r.werk}</strong> : r.werk}</td>
                          <td>{r.prijs}</td><td>{r.tijd}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="table-note">* Prijzen zijn indicatief. Definitieve prijs na inspectie.</p>
                </div>

                <h3>Rioollekkage en je verzekering</h3>
                <p>Schade door een plotseling brekende rioolleiding kan in sommige gevallen vergoed worden door je opstalverzekering. Schade door verstopping of wortelindringing valt doorgaans niet onder de dekking. Vraag ons altijd om een inspectierapport, dit geeft je verzekeraar de informatie die nodig is om de claim te beoordelen.</p>
              </>}

              {type.slug === 'vochtprobleem' && <>
                <h3>Wat is een vochtprobleem?</h3>
                <p>Een vochtprobleem betekent dat er meer vocht in je woning aanwezig is dan gezond is. Dit vocht kan van buiten komen, via de muur, de vloer of het dak, maar kan ook van binnenuit ontstaan door condensatie. Condensatie is het verschijnsel waarbij warme, vochtige lucht in contact komt met een koude muur of raam en dan vloeibaar water wordt, vergelijkbaar met een koud glas water dat aan de buitenkant nat wordt op een warme dag. Een vochtprobleem los je niet op met een verflaag. Je moet de bron aanpakken.</p>

                <h3>Hoe herken je een vochtprobleem?</h3>
                <p>Signalen zijn: schimmelplekken op muren of plafonds, met name in hoeken en achter meubels, verf of behang dat loslaat of bobbelt, een muffe of aardse geur in huis, witte kalkuitslag op bakstenen muren (dit heet uitbloei en ontstaat doordat water zouten mee naar buiten trekt), vochtige of natte muurvlakken, en condensatie op ramen die ook aanwezig is als de ramen goed geventileerd zijn.</p>

                <h3>Veelvoorkomende oorzaken van vochtproblemen</h3>
                <p>Optrekkend vocht is een klassiek probleem in oudere woningen: grondvocht trekt via de fundering omhoog in de muren. Slaand vocht is regenwater dat via de gevel naar binnen dringt, vaak bij oudere woningen met poreuze stenen of versleten voegwerk (de mortel tussen de stenen). Condensatie ontstaat door een combinatie van weinig ventilatie en een groot temperatuurverschil tussen binnen en buiten. Lekkages vanuit het dak of de waterleiding kunnen ook leiden tot vochtopbouw in muren.</p>

                <h3>Hoe lossen wij een vochtprobleem op?</h3>
                <p>We beginnen met een vochtmeting en een grondige inspectie om de exacte bron te vinden. Dit is het belangrijkste onderdeel: zonder de bron te kennen is elke reparatie tijdelijk. Afhankelijk van de oorzaak brengen we een waterdichte injectie aan in de muur tegen optrekkend vocht, behandelen we de gevel met een waterafstotende coating, verbeteren we de ventilatie, of repareren we de lekkage die het vocht veroorzaakt.</p>

                <h3>Kosten vochtprobleem oplossen</h3>
                <p>Wat het kost hangt volledig af van de oorzaak en de omvang. Een ventilatie-advies is goedkoop. Een volledige gevelbehandeling of muurinjectie is een grotere investering. Hieronder de indicatieve prijzen.</p>

                <div className="price-table">
                  <table>
                    <thead><tr><th scope="col">Type werkzaamheid</th><th scope="col">Indicatie kosten</th><th scope="col">Reactietijd</th></tr></thead>
                    <tbody>
                      {[
                        { werk: 'Vochtinspectie & meting', prijs: 'Gratis', tijd: '30 min' },
                        { werk: 'Ventilatie-advies en kleine aanpassingen', prijs: '€ 100 – € 300', tijd: '30 min' },
                        { werk: 'Schimmelbehandeling', prijs: '€ 150 – € 500', tijd: '30 min' },
                        { werk: 'Muurinjectie tegen optrekkend vocht', prijs: '€ 500 – € 2.000', tijd: '30 min' },
                        { werk: 'Gevelbehandeling of isolatie', prijs: 'Op aanvraag', tijd: '30 min' },
                      ].map((r, i) => (
                        <tr key={i} className={i === 0 ? 'highlight-row' : ''}>
                          <td>{i === 0 ? <strong>{r.werk}</strong> : r.werk}</td>
                          <td>{r.prijs}</td><td>{r.tijd}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="table-note">* Prijzen zijn indicatief. Definitieve prijs na inspectie.</p>
                </div>

                <h3>Vochtprobleem en je verzekering</h3>
                <p>Een vochtprobleem door achterstallig onderhoud of slijtage wordt zelden vergoed. Als het vocht het gevolg is van een plotselinge lekkage, zoals een gesprongen leiding of stormschade aan het dak, kan de schade wel onder je opstalverzekering vallen. Wij helpen je met het opstellen van een inspectierapport.</p>
              </>}

              {type.slug === 'lekkage-muur' && <>
                <h3>Wat is een lekkage muur of gevellekkage?</h3>
                <p>Een lekkage muur, ook wel gevellekkage of gevellekkage genoemd, is een lekkage waarbij regenwater via de buitenmuur naar binnen dringt. Dit is een veelvoorkomend probleem in Nederland, met name bij oudere woningen. De buitenmuur van een woning moet regen, wind en kou tegenhouden. Als de muur dat niet meer doet, krijg je natte plekken aan de binnenkant van de muur, schimmelvorming en op den duur ernstige constructieschade.</p>

                <h3>Hoe herken je een lekkage muur?</h3>
                <p>De signalen zijn natte of donkere plekken op de binnenmuur, met name na hevige regen of bij aanhoudende westelijke wind, schimmel of witte kalkuitslag op de muur, loslating van verf of behang, en een koude of tochtige binnenmuur. Het verschil met condensatie is dat een gevellekkage altijd samenvalt met neerslag of hoge luchtvochtigheid buiten, terwijl condensatie ook optreedt zonder regen.</p>

                <h3>Veelvoorkomende oorzaken van gevellekkage</h3>
                <p>Versleten voegwerk is de meest voorkomende oorzaak. De mortel tussen de bakstenen wordt na 20 tot 30 jaar poreus en laat dan water door. Beschadigd of ontbrekend kit rondom kozijnen (de houten of kunststof omlijsting van ramen en deuren) is een andere veelvoorkomende oorzaak. Scheuren in de gevel door verzakking van de fundering, een beschadigde windveer (de afwerking bovenaan de gevel onder het dak), en een spouwmuur die niet goed geventileerd is (de spouw is de smalle luchtruimte tussen de binnenmuur en de buitenmuur) zorgen ook regelmatig voor lekkages.</p>

                <h3>Hoe repareren wij een lekkage muur?</h3>
                <p>Wij voeren eerst een uitgebreide buitenInspectie uit. Met een vochtmeter meten we hoe diep het vocht in de muur zit. Afhankelijk van de bevindingen vernieuwen we het voegwerk, brengen we nieuw kit aan rondom kozijnen, dichten we scheuren, of behandelen we de gehele gevel met een waterafstotende coating. Een coating maakt de gevel waterafstotend zonder de uitstraling te veranderen.</p>

                <h3>Kosten lekkage muur reparatie</h3>
                <p>Het opnieuw voegen van een gedeelte van de gevel is relatief betaalbaar. Een volledige gevelbehandeling is een groter werk. Zie de indicatieve prijzen hieronder.</p>

                <div className="price-table">
                  <table>
                    <thead><tr><th scope="col">Type werkzaamheid</th><th scope="col">Indicatie kosten</th><th scope="col">Reactietijd</th></tr></thead>
                    <tbody>
                      {[
                        { werk: 'Inspectie & vochtmeting gevel', prijs: 'Gratis', tijd: '30 min' },
                        { werk: 'Kit vernieuwen rondom kozijnen', prijs: '€ 100 – € 350', tijd: '30 min' },
                        { werk: 'Gedeeltelijk opnieuw voegen', prijs: '€ 200 – € 800', tijd: '30 min' },
                        { werk: 'Gevelcoating aanbrengen', prijs: '€ 500 – € 2.500', tijd: '30 min' },
                        { werk: 'Volledig gevelonderhoud', prijs: 'Op aanvraag', tijd: '30 min' },
                      ].map((r, i) => (
                        <tr key={i} className={i === 0 ? 'highlight-row' : ''}>
                          <td>{i === 0 ? <strong>{r.werk}</strong> : r.werk}</td>
                          <td>{r.prijs}</td><td>{r.tijd}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="table-note">* Prijzen zijn indicatief. Definitieve prijs na inspectie.</p>
                </div>

                <h3>Gevellekkage en je verzekering</h3>
                <p>Plotselinge schade door stormschade aan de gevel kan vergoed worden. Lekkage door verouderd voegwerk of achterstallig onderhoud valt buiten de dekking. Wij stellen een rapport op dat je kunt gebruiken bij je verzekering.</p>
              </>}

              {type.slug === 'kelderafdichting' && <>
                <h3>Wat is kelderafdichting?</h3>
                <p>Kelderafdichting is het waterdicht maken van een kelder of souterrain. Een kelder ligt geheel of gedeeltelijk onder de grond en heeft constant te maken met grondwater. Grondwater is het water dat in de bodem aanwezig is en onder druk staat. Als de afdichting van de kelderwanden en -vloer niet meer goed is, dringt dit grondwater naar binnen. Dit noemen we waterindringing door hydrostatische druk, wat simpelweg betekent: water dat onder druk door de wand of vloer wordt gedrukt.</p>

                <h3>Hoe herken je een probleem met kelderafdichting?</h3>
                <p>Signalen zijn: een natte of vochtige keldervloer, water dat langs de kelderwanden omlaag loopt, witte kalkuitslag op de kelderwanden, schimmel of een muffe geur in de kelder, en puddels water op de keldervloer na zware regenval of in het voorjaar wanneer het grondwater hoog staat. In sommige gevallen staat er zelfs water op de keldervloer als het buiten lang geregend heeft.</p>

                <h3>Veelvoorkomende oorzaken</h3>
                <p>De meest voorkomende oorzaak is het wegvallen van de originele buitenafdichting. Huizen die gebouwd zijn voor 1970 hebben vaak een kelderwand van beton of baksteen die aan de buitenkant is afgedicht met bitumen. Dit bitumen (een zwart, rubberachtig afdichtingsmateriaal) veroudert en gaat barsten. Ook scheuren in de kelderwand door verzakking van de fundering of beweging van de bodem zijn een veelvoorkomende oorzaak. In sommige gevallen is er een probleem met de drainage, het systeem van buizen rondom de fundering dat grondwater afvoert.</p>

                <h3>Hoe repareren wij kelderafdichting?</h3>
                <p>We werken altijd van binnenuit, zodat we niet hoeven te graven rondom het huis. We brengen een speciale minerale afdichtingsmortel aan op de kelderwanden en -vloer. Deze mortel dringt diep in het beton of de steen en kristalliseert, waardoor het materiaal zelf waterdicht wordt. Dit heet kristallisatie-afdichting. Aanvullend kunnen we een drainagesysteem aan de binnenkant aanbrengen dat optredend grondwater gecontroleerd afvoert naar een pompput.</p>

                <h3>Kosten kelderafdichting</h3>
                <p>Kelderafdichting is een specialistisch werk en de kosten zijn navenant. De grootte van de kelder, de ernst van de lekkage en het gekozen systeem bepalen de uiteindelijke prijs. Zie hieronder de indicatieve prijzen.</p>

                <div className="price-table">
                  <table>
                    <thead><tr><th scope="col">Type werkzaamheid</th><th scope="col">Indicatie kosten</th><th scope="col">Reactietijd</th></tr></thead>
                    <tbody>
                      {[
                        { werk: 'Inspectie & vochtmeting kelder', prijs: 'Gratis', tijd: '30 min' },
                        { werk: 'Kleine scheurreparatie kelderwand', prijs: '€ 200 – € 600', tijd: '30 min' },
                        { werk: 'Afdichting gedeelte kelderwand', prijs: '€ 500 – € 2.000', tijd: '30 min' },
                        { werk: 'Volledige kelderafdichting met kristallisatie', prijs: '€ 2.000 – € 8.000', tijd: '30 min' },
                        { werk: 'Drainagesysteem binnenzijde', prijs: 'Op aanvraag', tijd: '30 min' },
                      ].map((r, i) => (
                        <tr key={i} className={i === 0 ? 'highlight-row' : ''}>
                          <td>{i === 0 ? <strong>{r.werk}</strong> : r.werk}</td>
                          <td>{r.prijs}</td><td>{r.tijd}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="table-note">* Prijzen zijn indicatief. Definitieve prijs na inspectie.</p>
                </div>

                <h3>Kelderafdichting en je verzekering</h3>
                <p>Schade door grondwater wordt door de meeste verzekeraars gezien als een geleidelijk proces en valt daardoor vaak buiten de dekking. Plotselinge instroming door een extreme grondwaterstand of een gesprongen waterleiding kan soms wel vergoed worden. Wij stellen altijd een gedetailleerd rapport op zodat je een goed onderbouwde claim kunt indienen.</p>
              </>}

              {/* FALLBACK voor onbekende types */}
              {!['lekkage-dak','lekkage-waterleiding','lekkage-badkamer','riool-lekkage','vochtprobleem','lekkage-muur','kelderafdichting'].includes(type.slug) && <>
                <h3>Wat is {type.naam.toLowerCase()} en wanneer handelen?</h3>
                <p>{type.intro} Hoe eerder je ingrijpt, hoe beperkter de schade en hoe lager de kosten.</p>
                <h3>Oorzaken van {type.naam.toLowerCase()}</h3>
                <p>De meest voorkomende oorzaken zijn {type.oorzaken?.slice(0,3).map(o => o.titel?.toLowerCase() || o).join(', ')}. Een vakkundige inspectie stelt snel de juiste diagnose.</p>
                <h3>Kosten {type.naam.toLowerCase()} reparatie</h3>
                <p>De kosten variëren afhankelijk van de omvang en oorzaak. Bij LekkageFix ontvang je altijd een transparante offerte vooraf, volledig vrijblijvend en zonder verborgen kosten.</p>
                <div className="price-table">
                  <table>
                    <thead><tr><th scope="col">Type werkzaamheid</th><th scope="col">Indicatie kosten</th><th scope="col">Reactietijd</th></tr></thead>
                    <tbody>
                      {[
                        { werk: 'Inspectie & diagnose', prijs: 'Gratis', tijd: '30 min' },
                        { werk: 'Kleine reparatie', prijs: '€ 75 – € 250', tijd: '30 min' },
                        { werk: 'Middelgrote reparatie', prijs: '€ 250 – € 750', tijd: '30 min' },
                        { werk: 'Grote reparatie', prijs: '€ 750 – € 2.500', tijd: '30 min' },
                        { werk: 'Volledige vervanging', prijs: 'Op aanvraag', tijd: '30 min' },
                      ].map((r, i) => (
                        <tr key={i} className={i === 0 ? 'highlight-row' : ''}>
                          <td>{i === 0 ? <strong>{r.werk}</strong> : r.werk}</td>
                          <td>{r.prijs}</td><td>{r.tijd}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="table-note">* Prijzen zijn indicatief. Definitieve prijs na inspectie.</p>
                </div>
                <h3>{type.naam} en je verzekering</h3>
                <p>Plotselinge schade valt bij de meeste opstalverzekeringen onder de dekking. Wij zijn erkend door alle grote Nederlandse verzekeraars en stellen een gedetailleerd rapport op voor je claim.</p>
              </>}
            </div>

            <div className="seo-sticky">
              <div style={{background:'var(--green3)',border:'1.5px solid var(--green4)',borderRadius:'14px',padding:'1.5rem',marginBottom:'1rem'}}>
                <div className="eyebrow" style={{marginBottom:'0.75rem'}}>Snel handelen?</div>
                <p style={{fontSize:'0.85rem',color:'var(--muted)',marginBottom:'1rem',lineHeight:1.7}}>Bel direct voor spoedservice. Onze monteurs zijn gemiddeld binnen 30 minuten ter plaatse.</p>
                <a href={`tel:${PHONE}`} className="btn-call" style={{width:'100%',justifyContent:'center',fontSize:'0.95rem'}}>📞 {PHONE_DISPLAY}</a>
              </div>
              <div style={{background:'white',border:'1.5px solid var(--border)',borderRadius:'14px',padding:'1.5rem'}}>
                <div style={{fontSize:'0.8rem',fontWeight:700,color:'var(--text)',marginBottom:'1rem'}}>✓ Andere diensten</div>
                <div style={{display:'flex',flexDirection:'column',gap:'0.5rem',fontSize:'0.82rem',color:'var(--muted)'}}>
                  {lekkageTypes.filter(t => t.slug !== type.slug).map(t => (
                    <a key={t.slug} href={`/lekkage/dienst/${t.slug}`} style={{display:'flex',alignItems:'center',gap:'0.5rem',color:'var(--muted)',textDecoration:'none',transition:'color 0.2s'}}
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
            {lekkageTypes.map(t => <a key={t.slug} href={`/lekkage/dienst/${t.slug}`}>{t.naam}</a>)}
          </div>
          <div className="footer-col">
            <h4>Steden</h4>
            {topSteden.slice(0,5).map(s => <a key={s.slug} href={`/lekkage/${type.slug}/${s.slug}`}>{s.naam}</a>)}
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
