
import Head from 'next/head'
import Nav from '../../components/Nav'
import { useState, useEffect } from 'react'
import { steden, lekkageTypes, getSted } from '../../data'  

const PHONE = '0800-1234'
const PHONE_DISPLAY = '0800-1234'
const EMAIL = 'info@lekkagefix.nl'

const monteurs = {
  'Noord-Holland':  { naam: 'Henk van der Berg',  foto: 'HB', img: '/images/henk.png',   functie: 'Lekkage specialist', ervaring: '14 jaar', quote: 'In Noord-Holland ken ik elk woningtype van binnen en buiten.' },
  'Zuid-Holland':   { naam: 'Marco de Wit',        foto: 'MW', img: '/images/marco.png',  functie: 'Lekkage specialist', ervaring: '11 jaar', quote: 'Van grachtenpand tot jaren-70 flat, ik los het op.' },
  'Utrecht':        { naam: 'Jeroen Smit',          foto: 'JS', img: '/images/jeroen.png', functie: 'Lekkage specialist', ervaring: '9 jaar',  quote: 'Utrecht kent zijn werfkelders, ik ken de lekkages.' },
  'Noord-Brabant':  { naam: 'Kevin Janssen',        foto: 'KJ', img: '/images/kevin.png',  functie: 'Lekkage specialist', ervaring: '12 jaar', quote: 'Van Eindhoven tot Bergen op Zoom, ik ben er snel bij.' },
  'Gelderland':     { naam: 'Arjan Meijer',         foto: 'AM', img: '/images/arjan.png',  functie: 'Lekkage specialist', ervaring: '10 jaar', quote: 'De Gelderse woningbouw heeft geen geheimen voor mij.' },
  'Overijssel':     { naam: 'Thomas Bos',           foto: 'TB', img: '/images/thomas.png', functie: 'Lekkage specialist', ervaring: '8 jaar',  quote: 'Twente en Zwolle, ik ben altijd in de buurt.' },
  'Groningen':      { naam: 'Sander Dijkstra',      foto: 'SD', img: '/images/sander.png', functie: 'Lekkage specialist', ervaring: '7 jaar',  quote: 'Groningse studentenwoningen? Mijn specialiteit.' },
  'Friesland':      { naam: 'Pieter Visser',        foto: 'PV', img: '/images/pieter.png', functie: 'Lekkage specialist', ervaring: '13 jaar', quote: 'De Friese wind tast daken aan, ik herstel ze.' },
  'Drenthe':        { naam: 'Rob Hofstra',          foto: 'RH', img: '/images/rob.png',    functie: 'Lekkage specialist', ervaring: '9 jaar',  quote: 'Drentse woningen verdienen vakkundig onderhoud.' },
  'Flevoland':      { naam: 'Danny Kramer',         foto: 'DK', img: '/images/danny.png',  functie: 'Lekkage specialist', ervaring: '6 jaar',  quote: "Polderbouw heeft specifieke risico's, ik ken ze." },
  'Limburg':        { naam: 'Luc Hermans',          foto: 'LH', img: '/images/luc.png',    functie: 'Lekkage specialist', ervaring: '11 jaar', quote: 'Mergelstenen huizen zijn mijn specialiteit.' },
  'Zeeland':        { naam: 'Kees de Vos',          foto: 'KV', img: '/images/kees.png',   functie: 'Lekkage specialist', ervaring: '15 jaar', quote: 'Zeeuwse panden kennen hun eigen vochtproblemen.' },
}

function getMonteur(provincie) {
  return monteurs[provincie] || { naam: 'Jan Peters', foto: 'JP', img: null, functie: 'Lekkage specialist', ervaring: '10 jaar', quote: 'Vakkundig en snel door heel Nederland.' }
}

function MonteurAvatar({ monteur, size = 52, border = '2px solid rgba(255,255,255,0.3)', bg = 'rgba(255,255,255,0.15)' }) {
  if (monteur.img) {
    return (
      <img
        src={monteur.img}
        alt={monteur.naam}
        style={{width:size,height:size,borderRadius:'50%',objectFit:'cover',flexShrink:0,border,boxShadow:'0 2px 8px rgba(26,122,74,0.25)'}}
      />
    )
  }
  return (
    <div style={{width:size,height:size,borderRadius:'50%',background:bg,color:'white',display:'flex',alignItems:'center',justifyContent:'center',fontSize:size*0.32+'px',fontWeight:800,flexShrink:0,border}}>
      {monteur.foto}
    </div>
  )
}

export async function getStaticPaths() {
  return {
    paths: steden.map(s => ({ params: { stad: s.slug } })),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const stad = getSted(params.stad)
  if (!stad) return { notFound: true }
  return { props: { stad } }
}

function getLocalReviews(stad) {
  return [
    {
      naam: 'Thomas B.',
      tekst: `Fijne ervaring met LekkageFix in ${stad.naam}. Ze waren snel ter plaatse en kenden de ${stad.woningtype} goed. Probleem direct opgelost.`,
      datum: '1 week geleden', rating: 5,
    },
    {
      naam: 'Marieke V.',
      tekst: `Al een tijdje last van vocht in onze woning in ${stad.naam}. LekkageFix vond de oorzaak snel en loste het netjes op. Eerlijke prijs, goede communicatie.`,
      datum: '2 weken geleden', rating: 5,
    },
    {
      naam: 'Rob H.',
      tekst: `Wonen al jaren in ${stad.naam} en hadden nog nooit zo'n goede vakman gehad. Binnen 30 minuten ter plaatse, duidelijke uitleg en netjes werk.`,
      datum: '1 maand geleden', rating: 5,
    },
  ]
}

export default function LekkageStadHub({ stad }) {
  const [submitted, setSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const monteur = getMonteur(stad.provincie)
  const andereSteden = steden.filter(s => s.slug !== stad.slug && s.provincie === stad.provincie).slice(0, 9)
  const localReviews = getLocalReviews(stad)

  const title = `Lekkage ${stad.naam} – Snel geholpen door lokale specialist | LekkageFix`
  const description = `Lekkage in ${stad.naam}? LekkageFix is er snel bij. ${stad.fact} Gratis inspectie, erkend door verzekeraars, 24/7 bereikbaar.`

  const faqs = [
    { v: `Hoe snel zijn jullie bij een lekkage in ${stad.naam}?`, a: `In ${stad.naam} en omgeving zijn we gemiddeld binnen 30 minuten ter plaatse. We zijn 24/7 bereikbaar, ook in het weekend.` },
    { v: `Welke soorten lekkage repareren jullie in ${stad.naam}?`, a: `We verhelpen alle soorten lekkages in ${stad.naam}: daklekkage, waterleiding, badkamer, riool, vocht, gevel en kelder. Kies hieronder jouw type.` },
    { v: `Wat kost een lekkage reparatie in ${stad.naam}?`, a: `De kosten hangen af van het type en de omvang. Je ontvangt altijd een transparante offerte vooraf. Gratis inspectie, geen verrassingen.` },
    { v: `Vergoedt mijn verzekering de lekkage in ${stad.naam}?`, a: `Een plotselinge lekkage valt bij de meeste opstalverzekeringen onder de dekking. Wij stellen een rapport op dat je direct kunt indienen bij je verzekeraar.` },
    { v: `Hebben jullie ervaring met ${stad.woningtype}?`, a: `Ja. Onze monteur ${monteur.naam} kent de ${stad.woningtype} in ${stad.provincie} van binnen en buiten en stelt snel de juiste diagnose.` },
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
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "2847", "bestRating": "5" },
        "review": localReviews.map(r => ({
          "@type": "Review",
          "author": { "@type": "Person", "name": r.naam },
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "reviewBody": r.tekst,
        }))
      },
      {
        "@type": "Service",
        "name": `Lekkage reparatie ${stad.naam}`,
        "provider": { "@id": "https://lekkagefix.nl/#business" },
        "areaServed": { "@type": "City", "name": stad.naam, "containedInPlace": { "@type": "AdministrativeArea", "name": stad.provincie } },
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
          { "@type": "ListItem", "position": 3, "name": stad.naam, "item": `https://lekkagefix.nl/lekkage/${stad.slug}` },
        ]
      },
      {
        "@type": "Person",
        "name": monteur.naam,
        "jobTitle": monteur.functie,
        "worksFor": { "@id": "https://lekkagefix.nl/#business" },
        "areaServed": { "@type": "AdministrativeArea", "name": stad.provincie }
      }
    ]
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href={`https://lekkagefix.nl/lekkage/${stad.slug}`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`https://lekkagefix.nl/lekkage/${stad.slug}`} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
        <style>{`
          @media (max-width: 768px) {
            .hero-inner { grid-template-columns: 1fr !important; }
            .hub-grid { grid-template-columns: 1fr !important; }
            .kaart-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </Head>
      <Nav activePath="/lekkage" />

      {/* BREADCRUMB */}
      <div className="breadcrumb-bar">
        <div className="breadcrumb">
          <a href="/">Home</a><span className="breadcrumb-sep">›</span>
          <a href="/lekkage">Lekkage</a><span className="breadcrumb-sep">›</span>
          <span>{stad.naam}</span>
        </div>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-dots" />
        <div className="hero-inner">
          <div>
            <div className="hero-badge-urgency">24/7 bereikbaar in {stad.naam}</div>
            <span className="hero-icon">💧</span>
            <h1>Lekkage in <em>{stad.naam}</em>?</h1>
            <p className="hero-sub">{stad.naam} heeft voornamelijk {stad.woningtype}. {stad.fact}</p>
            <div className="hero-stats">
              <div className="stat-item"><div className="stat-val">30<sup>min</sup></div><div className="stat-key">Gem. reactie</div></div>
              <div className="stat-item"><div className="stat-val">4.9<sup>★</sup></div><div className="stat-key">Beoordeling</div></div>
              <div className="stat-item"><div className="stat-val">24<sup>/7</sup></div><div className="stat-key">Bereikbaar</div></div>
              <div className="stat-item"><div className="stat-val">100<sup>%</sup></div><div className="stat-key">Garantie</div></div>
            </div>
            <div className="hero-actions">
              <a href={`tel:${PHONE}`} className="btn-call">📞 Bel direct: {PHONE_DISPLAY}</a>
              <a href="#offerte" className="btn-ghost">Offerte aanvragen →</a>
            </div>
          </div>

          {/* FORMULIER */}
          <div className="form-card" id="offerte">
            <div style={{display:'flex',alignItems:'center',gap:'0.85rem',padding:'0.85rem 1rem',background:'var(--green3)',borderRadius:'10px',marginBottom:'1.25rem',border:'1px solid var(--green4)'}}>
              {monteur.img ? (
                <img src={monteur.img} alt={monteur.naam} style={{width:'46px',height:'46px',borderRadius:'50%',objectFit:'cover',border:'2px solid white',boxShadow:'0 2px 8px rgba(26,122,74,0.25)',flexShrink:0}} />
              ) : (
                <div style={{width:'46px',height:'46px',borderRadius:'50%',background:'var(--green)',color:'white',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.9rem',fontWeight:800,flexShrink:0,border:'2.5px solid white'}}>
                  {monteur.foto}
                </div>
              )}
              <div>
                <div style={{fontSize:'0.78rem',fontWeight:700,color:'var(--green-dark)'}}>{monteur.naam} · {monteur.functie}</div>
                <div style={{fontSize:'0.72rem',color:'var(--muted)',lineHeight:1.4}}>Actief in {stad.provincie} · {monteur.ervaring} ervaring</div>
                <div style={{fontSize:'0.72rem',color:'var(--muted)',fontStyle:'italic',marginTop:'0.15rem'}}>"{monteur.quote}"</div>
              </div>
            </div>
            <div className="form-title">Lekkage in {stad.naam}</div>
            <div className="form-sub">Gratis inspectie · we nemen snel contact op</div>
            <div className="fg"><label>Adres in {stad.naam}</label><input type="text" placeholder="Straat + huisnummer" /></div>
            <div className="form-row">
              <div className="fg"><label>Naam</label><input type="text" placeholder="Jan de Vries" /></div>
              <div className="fg"><label>Telefoon</label><input type="tel" placeholder="06-12345678" /></div>
            </div>
            <div className="fg">
              <label>Type lekkage</label>
              <select style={{width:'100%',padding:'0.65rem 0.85rem',border:'1.5px solid var(--border)',borderRadius:'var(--radius)',fontFamily:'inherit',fontSize:'0.88rem',color:'var(--text)',background:'white'}}>
                <option value="">Weet ik nog niet</option>
                {lekkageTypes.map(t => <option key={t.slug} value={t.slug}>{t.naam}</option>)}
              </select>
            </div>
            <div className="fg"><label>Beschrijving</label><textarea placeholder="Beschrijf de lekkage kort..." /></div>
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

      {/* DIENSTEN GRID */}
      <section className="section">
        <div className="section-inner">
          <div className="sec-head-center">
            <div className="eyebrow">Wat is jouw lekkage?</div>
            <h2>Kies het type lekkage in <em>{stad.naam}</em></h2>
            <p className="sec-sub">We verhelpen alle soorten lekkages in {stad.naam}. Kies hieronder jouw situatie voor specifieke informatie en een directe aanvraag.</p>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))',gap:'1rem',marginTop:'1rem'}}>
            {lekkageTypes.map(t => (
              <a key={t.slug} href={`/lekkage/${t.slug}/${stad.slug}`}
                style={{display:'flex',alignItems:'center',gap:'1rem',padding:'1.25rem',background:'white',border:'1.5px solid var(--border)',borderRadius:'14px',textDecoration:'none',color:'var(--text)',transition:'all 0.2s',boxShadow:'0 1px 4px rgba(0,0,0,0.04)'}}
                onMouseEnter={e => { e.currentTarget.style.borderColor='var(--green)'; e.currentTarget.style.boxShadow='0 4px 16px rgba(26,122,74,0.12)'; e.currentTarget.style.transform='translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.boxShadow='0 1px 4px rgba(0,0,0,0.04)'; e.currentTarget.style.transform='translateY(0)' }}
              >
                <div style={{width:'48px',height:'48px',background:'var(--green3)',borderRadius:'12px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.4rem',flexShrink:0}}>
                  {t.icon}
                </div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:700,fontSize:'0.95rem',marginBottom:'0.25rem'}}>{t.naam}</div>
                  <div style={{fontSize:'0.78rem',color:'var(--muted)',lineHeight:1.4}}>{t.omschrijving?.slice(0,60)}...</div>
                </div>
                <span style={{color:'var(--green)',fontSize:'1rem',flexShrink:0}}>→</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* INFO + KAART */}
      <section className="section section-alt">
        <div className="section-inner">
          <div className="kaart-grid" style={{display:'grid',gridTemplateColumns:'1fr 1.4fr',gap:'3rem',alignItems:'start'}}>
            <div>
              <div className="eyebrow">Werkgebied</div>
              <h2>Lekkage reparatie in <em>{stad.naam}</em></h2>
              <p style={{color:'var(--muted)',fontSize:'0.92rem',lineHeight:1.85,margin:'1rem 0'}}>
                {stad.naam} telt {stad.inwoners} inwoners en bestaat voornamelijk uit {stad.woningtype}. {stad.fact}
              </p>
              <p style={{color:'var(--muted)',fontSize:'0.92rem',lineHeight:1.85,marginBottom:'1.5rem'}}>
                Onze monteurs zijn dagelijks actief in {stad.naam} en de omliggende gemeenten in {stad.provincie}. Door onze lokale aanwezigheid zijn we gemiddeld binnen 30 minuten ter plaatse, ook voor spoedgevallen buiten kantooruren.
              </p>
              <div style={{display:'flex',alignItems:'center',gap:'0.85rem',padding:'0.85rem 1rem',background:'white',borderRadius:'10px',border:'1.5px solid var(--border)'}}>
                {monteur.img ? (
                  <img src={monteur.img} alt={monteur.naam} style={{width:'42px',height:'42px',borderRadius:'50%',objectFit:'cover',flexShrink:0}} />
                ) : (
                  <div style={{width:'42px',height:'42px',borderRadius:'50%',background:'var(--green)',color:'white',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.85rem',fontWeight:800,flexShrink:0}}>
                    {monteur.foto}
                  </div>
                )}
                <div>
                  <div style={{fontSize:'0.8rem',fontWeight:700,color:'var(--text)'}}>{monteur.naam}</div>
                  <div style={{fontSize:'0.72rem',color:'var(--muted)'}}>Specialist in {stad.provincie} · {monteur.ervaring} ervaring</div>
                </div>
                <a href={`tel:${PHONE}`} style={{marginLeft:'auto',background:'var(--orange)',color:'white',borderRadius:'8px',padding:'0.4rem 0.85rem',fontSize:'0.78rem',fontWeight:700,textDecoration:'none',whiteSpace:'nowrap'}}>Bel direct</a>
              </div>
            </div>
            <div>
              <div style={{borderRadius:'16px',overflow:'hidden',border:'2px solid var(--border)',boxShadow:'0 4px 20px rgba(0,0,0,0.08)',height:'300px',marginBottom:'1rem'}}>
                <iframe
                  title={`Kaart ${stad.naam}`}
                  width="100%" height="100%"
                  style={{border:0,display:'block'}}
                  loading="lazy"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${stad.lon-0.08}%2C${stad.lat-0.05}%2C${stad.lon+0.08}%2C${stad.lat+0.05}&layer=mapnik&marker=${stad.lat}%2C${stad.lon}`}
                />
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.4rem'}}>
                {andereSteden.slice(0,8).map(s => (
                  <a key={s.slug} href={`/lekkage/${s.slug}`}
                    style={{fontSize:'0.8rem',color:'var(--green)',textDecoration:'none',padding:'0.35rem 0.5rem',borderRadius:'6px',background:'white',border:'1px solid var(--border)'}}
                    onMouseEnter={e => e.currentTarget.style.borderColor='var(--green)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor='var(--border)'}
                  >
                    Lekkage {s.naam}
                  </a>
                ))}
                <a href={`/lekkage#${stad.provincie.toLowerCase().replace(/\s+/g, '-')}`}
                  style={{fontSize:'0.8rem',color:'var(--muted)',textDecoration:'none',padding:'0.35rem 0.5rem',borderRadius:'6px',background:'white',border:'1px solid var(--border)',gridColumn:'1/-1'}}>
                  Alle steden in {stad.provincie} bekijken →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section section-white">
        <div className="section-inner">
          <div className="sec-head-center">
            <div className="eyebrow">Klantervaringen in {stad.naam}</div>
            <h2>Wat klanten in <em>{stad.naam}</em> zeggen</h2>
            <p className="sec-sub">4.9 sterren op basis van 2.847 reviews.</p>
          </div>
          <div className="reviews-grid">
            {localReviews.map((r, i) => (
              <div key={i} className="review">
                <div className="review-top">
                  <div className="stars">{'★'.repeat(r.rating)}</div>
                  <div className="review-date">{r.datum}</div>
                </div>
                <p className="review-text">"{r.tekst}"</p>
                <div className="reviewer">
                  <div className="avatar">{r.naam.split(' ').map(n => n[0]).join('')}</div>
                  <div>
                    <div className="rev-name">{r.naam}</div>
                    <div className="rev-meta">📍 {stad.naam} · <span className="verified">✓ geverifieerd</span></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO BLOK MET STICKY FORMULIER */}
      <section className="section section-white">
        <div className="section-inner">
          <div className="seo-grid">
            <div className="seo-block">
              <div className="eyebrow">Lekkage {stad.naam} informatie</div>
              <h2>Lekkage in {stad.naam}: <em>alles wat je moet weten</em></h2>

              <h3>Waarom komt lekkage in {stad.naam} veel voor?</h3>
              <p>{stad.naam} heeft voornamelijk {stad.woningtype}. {stad.fact} Water zoekt altijd de weg naar beneden en vindt zijn weg langs dakbalken, muren en vloerconstructies voordat het zichtbaar wordt. Hoe eerder je ingrijpt, hoe kleiner de schade en hoe lager de uiteindelijke reparatiekosten.</p>

              <h3>Welke soorten lekkage komen voor in {stad.naam}?</h3>
              <p>De meest voorkomende lekkages in {stad.naam} zijn daklekkages, badkamerlekkages en lekkages aan de waterleiding. Bij oudere woningen spelen ook vochtproblemen en gevellekkages een grote rol. Hieronder een overzicht van de meest gevraagde reparaties in {stad.naam} en de bijbehorende indicatieve kosten.</p>

              <div className="price-table">
                <table>
                  <thead><tr><th scope="col">Type lekkage</th><th scope="col">Indicatie kosten</th><th scope="col">Reactietijd</th></tr></thead>
                  <tbody>
                    {[
                      { type: 'Daklekkage reparatie', prijs: '€ 75 – € 1.800', slug: 'lekkage-dak' },
                      { type: 'Lekkage waterleiding', prijs: '€ 60 – € 1.800', slug: 'lekkage-waterleiding' },
                      { type: 'Badkamerlekkage', prijs: '€ 80 – € 2.200', slug: 'lekkage-badkamer' },
                      { type: 'Rioollekkage', prijs: '€ 150 – € 2.200', slug: 'riool-lekkage' },
                      { type: 'Vochtproblemen', prijs: '€ 100 – € 2.200', slug: 'vochtprobleem' },
                      { type: 'Gevellekkage', prijs: '€ 100 – € 2.800', slug: 'lekkage-muur' },
                      { type: 'Kelderafdichting', prijs: '€ 200 – € 9.000', slug: 'kelderafdichting' },
                    ].map((r, i) => (
                      <tr key={i}>
                        <td><a href={`/lekkage/${r.slug}/${stad.slug}`} style={{color:'var(--green)',textDecoration:'none',fontWeight:600}}>{r.type} {stad.naam}</a></td>
                        <td>{r.prijs}</td>
                        <td>30 min</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="table-note">* Prijzen zijn indicatief. Definitieve prijs na gratis inspectie ter plaatse in {stad.naam}.</p>
              </div>

              <h3>Hoe werkt een lekkage reparatie in {stad.naam}?</h3>
              <p>Wij werken altijd in vier stappen. Eerst bespreken we telefonisch het probleem. Daarna rijdt de dichtstbijzijnde monteur in {stad.provincie} naar je toe, gemiddeld binnen 30 minuten. Op locatie voeren we een grondige inspectie uit en geven we een transparante offerte. Na akkoord repareren we vakkundig en ruimen we alles netjes op. Op al ons werk geven we garantie.</p>

              <h3>Lekkage in {stad.naam} en je verzekering</h3>
              <p>Een plotselinge lekkage valt bij de meeste opstalverzekeringen onder de dekking. Schade door achterstallig onderhoud of slijtage wordt doorgaans niet vergoed. Wij zijn erkend door alle grote Nederlandse verzekeraars en stellen een gedetailleerd inspectierapport op dat je direct kunt gebruiken voor je schadeclaim in {stad.naam}.</p>
            </div>

            <div className="seo-sticky">
              <div style={{background:'var(--green-dark)',borderRadius:'14px',padding:'1.5rem',marginBottom:'1rem',color:'white'}}>
                <div style={{display:'flex',alignItems:'center',gap:'0.85rem',marginBottom:'1rem'}}>
                  <MonteurAvatar monteur={monteur} size={48} border="2px solid rgba(255,255,255,0.3)" bg="rgba(255,255,255,0.15)" />
                  <div>
                    <div style={{fontWeight:700,fontSize:'0.88rem'}}>{monteur.naam}</div>
                    <div style={{fontSize:'0.73rem',opacity:0.8}}>{monteur.functie} · {stad.provincie}</div>
                    <div style={{fontSize:'0.7rem',opacity:0.7}}>{monteur.ervaring} ervaring</div>
                  </div>
                </div>
                <p style={{fontSize:'0.8rem',opacity:0.85,lineHeight:1.7,marginBottom:'1rem',fontStyle:'italic'}}>"{monteur.quote}"</p>
                <a href={`tel:${PHONE}`} className="btn-call" style={{width:'100%',justifyContent:'center',background:'var(--orange)',fontSize:'0.88rem'}}>📞 Bel {monteur.naam.split(' ')[0]}</a>
              </div>

              <div style={{background:'white',border:'1.5px solid var(--border)',borderRadius:'14px',padding:'1.5rem'}}>
                <div className="eyebrow" style={{marginBottom:'0.75rem'}}>Gratis offerte aanvragen</div>
                {!submitted ? (
                  <div style={{display:'flex',flexDirection:'column',gap:'0.6rem'}}>
                    <input type="text" placeholder="Uw naam" className="form-input" />
                    <input type="tel" placeholder="Telefoonnummer" className="form-input" />
                    <input type="text" placeholder={`Adres in ${stad.naam}`} className="form-input" />
                    <select className="form-input">
                      <option value="">Type lekkage</option>
                      {lekkageTypes.map(t => <option key={t.slug} value={t.slug}>{t.naam}</option>)}
                    </select>
                    <textarea placeholder="Korte omschrijving" className="form-input" rows={2} style={{resize:'vertical'}} />
                    <button onClick={() => setSubmitted(true)} className="btn-call" style={{width:'100%',justifyContent:'center',fontSize:'0.88rem'}}>
                      Offerte aanvragen →
                    </button>
                  </div>
                ) : (
                  <div style={{textAlign:'center',padding:'1rem 0'}}>
                    <div style={{fontSize:'2rem',marginBottom:'0.5rem'}}>✅</div>
                    <p style={{fontWeight:700,color:'var(--green)'}}>Aanvraag ontvangen!</p>
                    <p style={{fontSize:'0.82rem',color:'var(--muted)'}}>We nemen binnen 15 minuten contact op.</p>
                  </div>
                )}
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
            <h2>Lekkage in <em>{stad.naam}</em></h2>
          </div>
          <div className="faq-grid">
            {faqs.map((f, i) => (
              <div key={i} className={`faq-item${openFaq === i ? ' open' : ''}`}>
                <div className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
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
        <div className="eyebrow" style={{color:'#a8e6c0'}}>Lekkage in {stad.naam}</div>
        <h2 style={{color:'white'}}>Lekkage in {stad.naam}? Wacht niet te lang.</h2>
        <p>Hoe eerder je belt, hoe kleiner de schade. Onze vakmensen staan dag en nacht voor je klaar in {stad.naam} en omgeving.</p>
        <div className="cta-btns">
          <a href={`tel:${PHONE}`} className="btn-call">📞 Bel nu: {PHONE_DISPLAY}</a>
          <a href="#offerte" className="btn-white-ghost">Offerte aanvragen</a>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <div className="footer-top">
          <div>
            <div className="footer-logo">Lekkage<b>Fix</b></div>
            <p className="footer-desc">Vakkundige lekkage reparaties in {stad.naam} en heel {stad.provincie}. Gecertificeerde vakmensen, transparante prijzen, garantie.</p>
          </div>
          <div className="footer-col">
            <h4>Diensten in {stad.naam}</h4>
            {lekkageTypes.map(t => <a key={t.slug} href={`/lekkage/${t.slug}/${stad.slug}`}>{t.naam}</a>)}
          </div>
          <div className="footer-col">
            <h4>{stad.provincie}</h4>
            {andereSteden.slice(0,5).map(s => <a key={s.slug} href={`/lekkage/${s.slug}`}>{s.naam}</a>)}
            <a href={`/lekkage#${stad.provincie.toLowerCase().replace(/\s+/g, '-')}`}>Alle steden →</a>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <a href={`tel:${PHONE}`}>{PHONE_DISPLAY} (24/7)</a>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <a href="#offerte">Gratis offerte</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 LekkageFix · KvK 89586557 · Lekkage {stad.naam} · <a href="#">Privacy</a> · <a href="#">Voorwaarden</a></p>
          <div className="cert-badges"><span className="cert">VCA ✓</span><span className="cert">ISO 9001</span><span className="cert">Erkend verzekeraar</span></div>
        </div>
      </footer>

      <a href={`tel:${PHONE}`} className="mobile-cta">📞 Bel nu: {PHONE_DISPLAY} (24/7 bereikbaar)</a>
    </>
  )
}
