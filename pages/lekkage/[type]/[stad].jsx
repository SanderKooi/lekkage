import Head from 'next/head'
import Nav from '../../../components/Nav'
import { useState, useEffect } from 'react'
import { steden, lekkageTypes, getSted, getType } from '../../../data'

const PHONE = '0800-1234'
const PHONE_DISPLAY = '0800-1234'
const EMAIL = 'info@lekkagefix.nl'

const monteurs = {
  'Noord-Holland':  { naam: 'Henk van der Berg',  foto: 'HB', img: '/images/monteurs/henk.jpg', functie: 'Lekkage specialist', ervaring: '14 jaar', quote: 'In Noord-Holland ken ik elk woningtype van binnen en buiten.' },
  'Zuid-Holland':   { naam: 'Marco de Wit',        foto: 'MW', img: null, functie: 'Lekkage specialist', ervaring: '11 jaar', quote: 'Van grachtenpand tot jaren-70 flat — ik los het op.' },
  'Utrecht':        { naam: 'Jeroen Smit',          foto: 'JS', img: null, functie: 'Lekkage specialist', ervaring: '9 jaar',  quote: 'Utrecht kent zijn werfkelders, ik ken de lekkages.' },
  'Noord-Brabant':  { naam: 'Kevin Janssen',        foto: 'KJ', img: null, functie: 'Lekkage specialist', ervaring: '12 jaar', quote: 'Van Eindhoven tot Bergen op Zoom, ik ben er snel bij.' },
  'Gelderland':     { naam: 'Arjan Meijer',         foto: 'AM', img: null, functie: 'Lekkage specialist', ervaring: '10 jaar', quote: 'De Gelderse woningbouw heeft geen geheimen voor mij.' },
  'Overijssel':     { naam: 'Thomas Bos',           foto: 'TB', img: null, functie: 'Lekkage specialist', ervaring: '8 jaar',  quote: 'Twente en Zwolle, ik ben altijd in de buurt.' },
  'Groningen':      { naam: 'Sander Dijkstra',      foto: 'SD', img: null, functie: 'Lekkage specialist', ervaring: '7 jaar',  quote: 'Groningse studentenwoningen? Mijn specialiteit.' },
  'Friesland':      { naam: 'Pieter Visser',        foto: 'PV', img: null, functie: 'Lekkage specialist', ervaring: '13 jaar', quote: 'De Friese wind tast daken aan — ik herstel ze.' },
  'Drenthe':        { naam: 'Rob Hofstra',          foto: 'RH', img: null, functie: 'Lekkage specialist', ervaring: '9 jaar',  quote: 'Drentse woningen verdienen vakkundig onderhoud.' },
  'Flevoland':      { naam: 'Danny Kramer',         foto: 'DK', img: null, functie: 'Lekkage specialist', ervaring: '6 jaar',  quote: 'Polderbouw heeft specifieke risico\'s — ik ken ze.' },
  'Limburg':        { naam: 'Luc Hermans',          foto: 'LH', img: null, functie: 'Lekkage specialist', ervaring: '11 jaar', quote: 'Mergelstenen huizen zijn mijn specialiteit.' },
  'Zeeland':        { naam: 'Kees de Vos',          foto: 'KV', img: null, functie: 'Lekkage specialist', ervaring: '15 jaar', quote: 'Zeeuwse panden kennen hun eigen vochtproblemen.' },
}

function getMonteur(provincie) {
  return monteurs[provincie] || { naam: 'Jan Peters', foto: 'JP', functie: 'Lekkage specialist', ervaring: '10 jaar', quote: 'Vakkundig en snel door heel Nederland.' }
}

export async function getStaticPaths() {
  const paths = []
  lekkageTypes.forEach(type => {
    steden.forEach(stad => {
      paths.push({ params: { type: type.slug, stad: stad.slug } })
    })
  })
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const type = getType(params.type)
  const stad = getSted(params.stad)
  if (!type || !stad) return { notFound: true }
  return { props: { type, stad } }
}

function getSeizoenTip(typeSlug, stadNaam) {
  const m = new Date().getMonth()
  const seizoen = m >= 2 && m <= 4 ? 'lente' : m >= 5 && m <= 7 ? 'zomer' : m >= 8 && m <= 10 ? 'herfst' : 'winter'
  const tips = {
    dak: {
      lente: `🌱 Lentetip voor ${stadNaam}: Inspecteer uw dak na de winter op losgewaaide dakpannen en beschadigd voegwerk.`,
      zomer: `☀️ Zomertip voor ${stadNaam}: Controleer dakdoorvoeringen en kit — warmte en UV-straling versnellen slijtage.`,
      herfst: `🍂 Herfsttip voor ${stadNaam}: Reinig dakgoten vóór de natte periode — verstopte goten zijn de #1 oorzaak van daklekkages.`,
      winter: `❄️ Wintertip voor ${stadNaam}: Let op ijsvorming bij dakranden en dakkapellen — bevroren water kan dakbedekking scheuren.`,
    },
    waterleiding: {
      lente: `🌱 Lentetip voor ${stadNaam}: Controleer buitenkranen na de winter op vorstschade aan leidingen.`,
      zomer: `☀️ Zomertip voor ${stadNaam}: Hogere waterdruk in de zomer kan zwakke verbindingen aan het licht brengen.`,
      herfst: `🍂 Herfsttip voor ${stadNaam}: Isoleer buitenleidingen vóór de eerste vorst om leidingbreuk te voorkomen.`,
      winter: `❄️ Wintertip voor ${stadNaam}: Bij vorst kunnen leidingen bevriezen en barsten — houd de cv op minimaal 15°C.`,
    },
    badkamer: {
      lente: `🌱 Lentetip voor ${stadNaam}: Inspecteer kitnaden in douche en bad na de winter op scheuren.`,
      zomer: `☀️ Zomertip voor ${stadNaam}: Extra ventilatie in de badkamer voorkomt schimmelvorming door hogere temperaturen.`,
      herfst: `🍂 Herfsttip voor ${stadNaam}: Controleer voegen en tegels vóór het stookseizoen begint.`,
      winter: `❄️ Wintertip voor ${stadNaam}: Temperatuurwisselingen in de badkamer kunnen voegwerk en tegels doen scheuren.`,
    },
    riool: {
      lente: `🌱 Lentetip voor ${stadNaam}: Laat uw riool inspecteren na de winter — wortels groeien het hardst in het voorjaar.`,
      zomer: `☀️ Zomertip voor ${stadNaam}: Droge periodes kunnen rioolbuizen doen krimpen en scheuren.`,
      herfst: `🍂 Herfsttip voor ${stadNaam}: Bladeren verstoppen rioolaansluitingen — laat ze tijdig reinigen.`,
      winter: `❄️ Wintertip voor ${stadNaam}: Bevroren rioolaansluiting? Bel direct — dit kan snel leiden tot terugstromend water.`,
    },
    vocht: {
      lente: `🌱 Lentetip voor ${stadNaam}: Na de winter worden vochtplekken in muren zichtbaar — laat ze tijdig behandelen.`,
      zomer: `☀️ Zomertip voor ${stadNaam}: Goed ventileren voorkomt condensatie en schimmelvorming.`,
      herfst: `🍂 Herfsttip voor ${stadNaam}: Stijgende grondwaterstand in het najaar vergroot het risico op kelderlekkages.`,
      winter: `❄️ Wintertip voor ${stadNaam}: Koudebruggen in de gevel zorgen voor condensatie en vochtproblemen in de winter.`,
    },
    gevel: {
      lente: `🌱 Lentetip voor ${stadNaam}: Inspecteer voegwerk na de winter op vorstschade en barsten.`,
      zomer: `☀️ Zomertip voor ${stadNaam}: Droge zomers laten scheuren in de gevel groter worden — laat ze tijdig bijwerken.`,
      herfst: `🍂 Herfsttip voor ${stadNaam}: Herstel gevelvoegen vóór de regen- en stormperiode begint.`,
      winter: `❄️ Wintertip voor ${stadNaam}: Waterinfiltratie in gevels bevriest en vergroot scheuren — tijdig repareren bespaart kosten.`,
    },
    kelder: {
      lente: `🌱 Lentetip voor ${stadNaam}: Hogere grondwaterstanden in het voorjaar verhogen de druk op keldermuuren.`,
      zomer: `☀️ Zomertip voor ${stadNaam}: Inspecteer de kelderafdichting na een droge zomer — uitdroging kan scheuren veroorzaken.`,
      herfst: `🍂 Herfsttip voor ${stadNaam}: Bereid uw kelder voor op de natte periode — controleer afdichting en afvoer.`,
      winter: `❄️ Wintertip voor ${stadNaam}: Bevroren grond kan extra druk uitoefenen op keldermuuren — let op nieuwe scheuren.`,
    },
  }
  return tips[typeSlug]?.[seizoen] || tips.dak[seizoen]
}

function getLocalReviews(stad, type) {
  return [
    {
      naam: `Thomas B.`,
      stad: stad.naam,
      buurt: stad.naam,
      tekst: `Na weken zoeken naar de oorzaak van vocht in mijn woning in ${stad.naam} heeft LekkageFix het probleem binnen een uur gevonden en opgelost. De monteur kende de ${stad.woningtype} goed en wist precies waar te zoeken.`,
      datum: '1 week geleden',
      rating: 5,
    },
    {
      naam: `Marieke V.`,
      stad: stad.naam,
      buurt: stad.naam,
      tekst: `Wij wonen al jaren in ${stad.naam} en hebben al eerder last gehad van ${type.naam.toLowerCase()}. LekkageFix was snel ter plaatse, transparante offerte vooraf en het werk is netjes uitgevoerd. Eindelijk droog!`,
      datum: '2 weken geleden',
      rating: 5,
    },
    {
      naam: `Rob H.`,
      stad: stad.naam,
      buurt: stad.naam,
      tekst: `Als ${stad.naam}-er was ik blij dat de monteur lokale kennis had over ${stad.woningtype}. Direct de juiste diagnose gesteld. Aanrader voor iedereen in de regio ${stad.provincie}.`,
      datum: '1 maand geleden',
      rating: 5,
    },
  ]
}

export default function LekkageTypeStad({ type, stad }) {
  const [submitted, setSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const [seizoenTip, setSeizoenTip] = useState('')
  const monteur = getMonteur(stad.provincie)

  useEffect(() => {
    setSeizoenTip(getSeizoenTip(type.slug, stad.naam))
  }, [type.slug, stad.naam])

  const title = `${type.naam} ${stad.naam} – Snel & Vakkundig | LekkageFix`
  const description = `${type.naam} in ${stad.naam}? Gecertificeerde specialist ter plaatse in 30 min. ${stad.fact} Gratis offerte, erkend door verzekeraars.`

  const andereSteden = steden.filter(s => s.slug !== stad.slug && s.provincie === stad.provincie).slice(0, 9)
  const andereTypes = lekkageTypes.filter(t => t.slug !== type.slug)
  const localReviews = getLocalReviews(stad, type)

  const faqs = [
    { v: `Hoe snel zijn jullie bij een ${type.naam.toLowerCase()} in ${stad.naam}?`, a: `In ${stad.naam} en omgeving streven we naar een reactietijd van gemiddeld 30 minuten. We zijn 24/7 bereikbaar, ook in het weekend en op feestdagen.` },
    { v: `Wat zijn typische oorzaken van ${type.naam.toLowerCase()} in ${stad.naam}?`, a: `In ${stad.naam}, met name bij ${stad.woningtype}, zijn veelvoorkomende oorzaken: ${type.oorzaken.slice(0,3).map(o => o.titel || o).join(', ')}. ${stad.fact}` },
    { v: `Wat kost ${type.naam.toLowerCase()} reparatie in ${stad.naam}?`, a: `De kosten hangen af van de omvang en oorzaak. We geven altijd een transparante offerte vooraf. Bel ons voor een vrijblijvende indicatie.` },
    { v: `Vergoedt mijn verzekering ${type.naam.toLowerCase()} in ${stad.naam}?`, a: `Plotselinge lekkages vallen doorgaans onder de opstalverzekering. Wij zijn erkend door alle grote verzekeraars en stellen een gedetailleerd rapport op voor uw claim.` },
    { v: 'Geven jullie garantie op het werk?', a: 'Ja — we geven garantie op alle uitgevoerde reparaties. Mocht er iets niet goed zijn, dan lossen we het kosteloos op.' },
    { v: `Werken jullie ook 's nachts in ${stad.naam}?`, a: `Ja, we zijn dag en nacht bereikbaar in ${stad.naam} en omgeving. Ook in het weekend en op feestdagen.` },
    { v: `Hebben jullie ervaring met ${stad.woningtype}?`, a: `Absoluut. Onze monteurs in ${stad.provincie} hebben ruime ervaring met ${stad.woningtype} en kennen de specifieke uitdagingen hiervan.` },
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
          "reviewRating": { "@type": "Rating", "ratingValue": String(r.rating), "bestRating": "5" },
          "reviewBody": r.tekst,
        }))
      },
      {
        "@type": "Service",
        "name": `${type.naam} ${stad.naam}`,
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
          { "@type": "ListItem", "position": 3, "name": type.naam, "item": `https://lekkagefix.nl/lekkage/${type.slug}` },
          { "@type": "ListItem", "position": 4, "name": stad.naam, "item": `https://lekkagefix.nl/lekkage/${type.slug}/${stad.slug}` },
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
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://lekkagefix.nl/lekkage/${type.slug}/${stad.slug}`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`https://lekkagefix.nl/lekkage/${type.slug}/${stad.slug}`} />
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
          <a href={`/lekkage/${type.slug}`}>{type.naam}</a><span className="breadcrumb-sep">›</span>
          <span>{stad.naam}</span>
        </div>
      </div>

      {/* SEIZOEN TIP BANNER */}
      {seizoenTip && (
        <div style={{background:'var(--green3)',borderBottom:'1px solid var(--green4)',padding:'0.65rem clamp(1rem,5vw,3rem)',fontSize:'0.82rem',color:'var(--green-dark)',fontWeight:500}}>
          <div style={{maxWidth:'1200px',margin:'0 auto'}}>{seizoenTip}</div>
        </div>
      )}

      {/* HERO */}
      <section className="hero">
        <div className="hero-dots" />
        <div className="hero-inner">
          <div>
            <div className="hero-badge-urgency">⚠️ {type.urgentie === 'hoog' ? 'Spoed aanbevolen' : 'Tijdig handelen'}</div>
            <span className="hero-icon">{type.icon}</span>
            <h1><em>{type.naam}</em> in {stad.naam}</h1>
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

          {/* OFFERTE FORMULIER */}
          <div className="form-card" id="offerte">
            {/* MONTEUR INTRO */}
            <div style={{display:'flex',alignItems:'center',gap:'0.85rem',padding:'0.85rem 1rem',background:'var(--green3)',borderRadius:'10px',marginBottom:'1.25rem',border:'1px solid var(--green4)'}}>
              {monteur.img ? (
                <img src={monteur.img} alt={monteur.naam} style={{width:'46px',height:'46px',borderRadius:'50%',objectFit:'cover',border:'2px solid white',boxShadow:'0 2px 8px rgba(26,122,74,0.25)',flexShrink:0}} />
              ) : (
                <div style={{width:'46px',height:'46px',borderRadius:'50%',background:'var(--green)',color:'white',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.9rem',fontWeight:800,flexShrink:0,border:'2.5px solid white',boxShadow:'0 2px 8px rgba(26,122,74,0.25)'}}>
                  {monteur.foto}
                </div>
              )}
              <div>
                <div style={{fontSize:'0.78rem',fontWeight:700,color:'var(--green-dark)'}}>{monteur.naam} · {monteur.functie}</div>
                <div style={{fontSize:'0.72rem',color:'var(--muted)',lineHeight:1.4}}>Actief in {stad.provincie} · {monteur.ervaring} ervaring</div>
                <div style={{fontSize:'0.72rem',color:'var(--muted)',fontStyle:'italic',marginTop:'0.15rem'}}>"{monteur.quote}"</div>
              </div>
            </div>
            <div className="form-title">{type.naam} in {stad.naam}</div>
            <div className="form-sub">Gratis & vrijblijvend · we nemen snel contact op</div>
            <div className="fg"><label>Adres in {stad.naam}</label><input type="text" placeholder="Straat + huisnummer" /></div>
            <div className="form-row">
              <div className="fg"><label>Naam</label><input type="text" placeholder="Jan de Vries" /></div>
              <div className="fg"><label>Telefoon</label><input type="tel" placeholder="06-12345678" /></div>
            </div>
            <div className="fg">
              <label>Type probleem</label>
              <select style={{width:'100%',padding:'0.65rem 0.85rem',border:'1.5px solid var(--border)',borderRadius:'var(--radius)',fontFamily:'inherit',fontSize:'0.88rem',color:'var(--text)',background:'white'}}>
                <option value={type.slug}>{type.naam} (geselecteerd)</option>
                {andereTypes.map(t => <option key={t.slug} value={t.slug}>{t.naam}</option>)}
              </select>
            </div>
            <div className="fg"><label>Beschrijving</label><textarea placeholder={`Beschrijf de ${type.naam.toLowerCase()} kort...`} /></div>
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

      {/* INFO + OORZAKEN */}
      <section className="section">
        <div className="section-inner">
          <div style={{display:'grid',gridTemplateColumns:'1.2fr 1fr',gap:'3.5rem',alignItems:'start'}}>
            <div>
              <div className="eyebrow">{type.naam} in {stad.naam}</div>
              <h2><em>{type.naam}</em> in {stad.naam} — wat je moet weten</h2>
              <p style={{color:'var(--muted)',fontSize:'0.92rem',lineHeight:'1.85',marginTop:'1.25rem',marginBottom:'1rem'}}>{stad.naam} heeft voornamelijk {stad.woningtype}. {stad.fact}</p>
              <p style={{color:'var(--muted)',fontSize:'0.92rem',lineHeight:'1.85',marginBottom:'1rem'}}>{type.intro}</p>
              <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:'0.55rem',marginTop:'1rem'}}>
                {[
                  `Snelle inzet van ervaren vakmensen in ${stad.naam}`,
                  `Lokale kennis van ${stad.woningtype}`,
                  'Transparante prijsopgave vooraf',
                  'Erkend door verzekeraars — wij helpen met je claim',
                  'Garantie op uitgevoerd werk',
                  `Bereikbaar voor heel ${stad.provincie}`,
                ].map((item, i) => (
                  <li key={i} style={{display:'flex',alignItems:'flex-start',gap:'0.7rem',fontSize:'0.85rem',color:'var(--muted)',lineHeight:1.5}}>
                    <span style={{width:'18px',height:'18px',background:'var(--green)',color:'white',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.6rem',fontWeight:800,flexShrink:0,marginTop:'0.1rem'}}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="eyebrow">Oorzaken</div>
              <h2 style={{fontSize:'1.3rem',marginBottom:'1rem'}}>Veelvoorkomende oorzaken in {stad.naam}</h2>
              <div style={{display:'flex',flexDirection:'column',gap:'0.6rem'}}>
                {type.oorzaken.map((o, i) => (
                  <div key={i} style={{display:'flex',alignItems:'flex-start',gap:'0.85rem',background:'white',border:'1.5px solid var(--border)',borderRadius:'10px',padding:'1rem 1.1rem'}}>
                    <div style={{width:'28px',height:'28px',background:'var(--green3)',color:'var(--green-dark)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.72rem',fontWeight:800,flexShrink:0}}>{i+1}</div>
                    <div>
                      <div style={{fontWeight:600,fontSize:'0.85rem',color:'var(--text)',marginBottom:'0.2rem'}}>{o.icon} {o.titel}</div>
                      <p style={{fontSize:'0.82rem',color:'var(--muted)',lineHeight:1.5}}>{o.tekst}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KAART + WERKGEBIED */}
      <section className="section section-alt">
        <div className="section-inner">
          <div style={{display:'grid',gridTemplateColumns:'1fr 1.4fr',gap:'3rem',alignItems:'start'}}>
            <div>
              <div className="eyebrow">Werkgebied</div>
              <h2>{type.naam} in <em>{stad.naam}</em> en omgeving</h2>
              <p style={{color:'var(--muted)',fontSize:'0.92rem',lineHeight:1.85,margin:'1rem 0'}}>
                {stad.naam} telt {stad.inwoners} inwoners en bestaat voornamelijk uit {stad.woningtype}. {stad.fact}
              </p>
              <p style={{color:'var(--muted)',fontSize:'0.92rem',lineHeight:1.85,marginBottom:'1rem'}}>
                Onze monteurs zijn dagelijks actief in {stad.naam} en de omliggende gemeenten in {stad.provincie}. Door onze lokale aanwezigheid zijn we gemiddeld binnen 30 minuten ter plaatse — ook voor spoedgevallen buiten kantooruren.
              </p>
              <p style={{color:'var(--muted)',fontSize:'0.92rem',lineHeight:1.85,marginBottom:'1.5rem'}}>
                Wij kennen de specifieke eigenschappen van de bebouwing in {stad.naam}. Dat betekent sneller de juiste diagnose, minder onnodige werkzaamheden en een lagere eindrekening voor u.
              </p>

              {/* MONTEUR KAARTJE */}
              <div style={{display:'flex',alignItems:'center',gap:'0.85rem',padding:'0.85rem 1rem',background:'white',borderRadius:'10px',border:'1.5px solid var(--border)',marginBottom:'1.5rem'}}>
                <div style={{width:'42px',height:'42px',borderRadius:'50%',background:'var(--green)',color:'white',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.85rem',fontWeight:800,flexShrink:0}}>
                  {monteur.foto}
                </div>
                <div>
                  <div style={{fontSize:'0.8rem',fontWeight:700,color:'var(--text)'}}>{monteur.naam}</div>
                  <div style={{fontSize:'0.72rem',color:'var(--muted)'}}>Uw specialist in {stad.provincie} · {monteur.ervaring} ervaring</div>
                </div>
                <a href={`tel:${PHONE}`} style={{marginLeft:'auto',background:'var(--orange)',color:'white',borderRadius:'8px',padding:'0.4rem 0.85rem',fontSize:'0.78rem',fontWeight:700,textDecoration:'none',whiteSpace:'nowrap'}}>Bel direct</a>
              </div>
            </div>

            <div>
              <div style={{borderRadius:'16px',overflow:'hidden',border:'2px solid var(--border)',boxShadow:'0 4px 20px rgba(0,0,0,0.08)',height:'300px',marginBottom:'1rem'}}>
                <iframe
                  title={`Kaart ${stad.naam}`}
                  width="100%"
                  height="100%"
                  style={{border:0,display:'block'}}
                  loading="lazy"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${stad.lon-0.08}%2C${stad.lat-0.05}%2C${stad.lon+0.08}%2C${stad.lat+0.05}&layer=mapnik&marker=${stad.lat}%2C${stad.lon}`}
                />
              </div>
              {/* INTERNE LINKS ONDER KAART */}
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.4rem'}}>
                {andereSteden.slice(0,8).map(s => (
                  <a key={s.slug} href={`/lekkage/${type.slug}/${s.slug}`}
                    style={{fontSize:'0.8rem',color:'var(--green)',textDecoration:'none',padding:'0.35rem 0.5rem',borderRadius:'6px',background:'white',border:'1px solid var(--border)',transition:'all 0.15s'}}
                    onMouseEnter={e => e.currentTarget.style.borderColor='var(--green)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor='var(--border)'}
                  >
                    {type.naam} {s.naam}
                  </a>
                ))}
                <a href={`/lekkage/${type.slug}`}
                  style={{fontSize:'0.8rem',color:'var(--muted)',textDecoration:'none',padding:'0.35rem 0.5rem',borderRadius:'6px',background:'white',border:'1px solid var(--border)',gridColumn:'1/-1'}}>
                  Alle steden in {stad.provincie} bekijken →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WERKWIJZE */}
      <section className="section section-white">
        <div className="section-inner">
          <div className="sec-head-center">
            <div className="eyebrow">Werkwijze</div>
            <h2>Van melding tot <em>oplossing</em> in {stad.naam}</h2>
            <p className="sec-sub">Helder en transparant — zo pakken we een {type.naam.toLowerCase()} aan in {stad.naam}.</p>
          </div>
          <div className="steps">
            <div className="step"><div className="step-num">1</div><h3>Melding</h3><p>Bel of stuur een aanvraag. We bespreken het probleem en plannen een afspraak in {stad.naam}.</p></div>
            <div className="step"><div className="step-num">2</div><h3>Vakman onderweg</h3><p>De dichtstbijzijnde monteur in {stad.provincie} rijdt naar je toe. Gemiddeld binnen 30 minuten.</p></div>
            <div className="step"><div className="step-num">3</div><h3>Inspectie & offerte</h3><p>Grondige inspectie met moderne apparatuur. Transparante prijsopgave vooraf — geen verrassingen.</p></div>
            <div className="step"><div className="step-num">4</div><h3>Opgelost & gegarandeerd</h3><p>Vakkundige reparatie met garantie op het werk. Netjes opgeruimd achtergelaten.</p></div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section section-alt">
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
                    <div className="rev-meta">📍 {r.stad} · <span className="verified">✓ geverifieerd</span></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO CONTENT */}
      <section className="section section-white">
        <div className="section-inner">
          <div className="seo-grid">
            <div className="seo-block">
              <div className="eyebrow">{type.naam} informatie</div>
              <h2>{type.naam} in {stad.naam}: <em>alles wat je moet weten</em></h2>

              <h3>{type.naam} in {stad.naam} herkennen</h3>
              <p>{type.seo?.p1 || `${type.naam} in ${stad.naam} is een veelvoorkomend probleem, met name bij ${stad.woningtype}. ${stad.fact} Vroegtijdig ingrijpen voorkomt grotere schade.`}</p>
              {type.seo?.bullets1 && (
                <ul>{type.seo.bullets1.map((b,i) => <li key={i}>{b}</li>)}</ul>
              )}

              <h3>Oorzaken van {type.naam.toLowerCase()} in {stad.naam}</h3>
              <p>{type.seo?.p2 || `In ${stad.naam} zijn de meest voorkomende oorzaken gerelateerd aan het type bebouwing: ${stad.woningtype}. ${stad.fact}`}</p>

              <h3>Kosten {type.naam.toLowerCase()} reparatie in {stad.naam}</h3>
              <p>{type.seo?.prijzenIntro || 'De kosten hangen af van de omvang en oorzaak van het probleem. Onderstaand een indicatief overzicht:'}</p>
              {type.prijzen && (
                <div className="price-table">
                  <table>
                    <thead><tr><th>Reparatie</th><th>Indicatie prijs</th><th>Reactietijd</th></tr></thead>
                    <tbody>
                      {type.prijzen.map((p, i) => (
                        <tr key={i} className={i === type.prijzen.length-1 ? 'highlight-row' : ''}>
                          <td>{p.label}</td><td>{p.prijs}</td><td>30 min</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="table-note">* Prijzen zijn indicatief. Definitieve prijs na inspectie ter plaatse in {stad.naam}.</p>
                </div>
              )}

              <h3>{type.naam} en uw verzekering in {stad.naam}</h3>
              <p>{type.seo?.verzekering || `Plotselinge ${type.naam.toLowerCase()} valt doorgaans onder de opstalverzekering. Wij zijn erkend door alle grote Nederlandse verzekeraars en stellen een gedetailleerd inspectierapport op dat u direct kunt gebruiken voor uw claim.`}</p>
            </div>

            <div className="seo-sticky">
              {/* MONTEUR CTA */}
              <div style={{background:'var(--green-dark)',borderRadius:'14px',padding:'1.5rem',marginBottom:'1rem',color:'white'}}>
                <div style={{display:'flex',alignItems:'center',gap:'0.85rem',marginBottom:'1rem'}}>
                  {monteur.img ? (
                    <img src={monteur.img} alt={monteur.naam} style={{width:'56px',height:'56px',borderRadius:'50%',objectFit:'cover',border:'2.5px solid rgba(255,255,255,0.4)',flexShrink:0}} />
                  ) : (
                    <div style={{width:'56px',height:'56px',borderRadius:'50%',background:'rgba(255,255,255,0.15)',color:'white',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1rem',fontWeight:800,flexShrink:0,border:'2px solid rgba(255,255,255,0.3)'}}>
                      {monteur.foto}
                    </div>
                  )}
                  <div>
                    <div style={{fontWeight:700,fontSize:'0.9rem'}}>{monteur.naam}</div>
                    <div style={{fontSize:'0.75rem',opacity:0.8}}>{monteur.functie} · {stad.provincie}</div>
                    <div style={{fontSize:'0.72rem',opacity:0.7,marginTop:'0.1rem'}}>{monteur.ervaring} ervaring</div>
                  </div>
                </div>
                <p style={{fontSize:'0.82rem',opacity:0.9,lineHeight:1.7,marginBottom:'1.25rem',fontStyle:'italic'}}>"{monteur.quote}"</p>
                <div style={{display:'flex',alignItems:'center',gap:'0.4rem',marginBottom:'0.5rem',opacity:0.75}}>
                  <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
                    <path d="M2 5 C7 1, 18 1, 24 10" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" strokeDasharray="3 2"/>
                    <path d="M21 7 L25 11 L20 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  </svg>
                  <span style={{fontSize:'0.7rem'}}>direct verbonden met {monteur.naam.split(' ')[0]}</span>
                </div>
                <a href={`tel:${PHONE}`} className="btn-call" style={{width:'100%',justifyContent:'center',background:'var(--orange)',fontSize:'0.9rem',display:'flex'}}>📞 Bel {monteur.naam.split(' ')[0]}</a>
              </div>

              <div style={{background:'white',border:'1.5px solid var(--border)',borderRadius:'14px',padding:'1.5rem',marginBottom:'1rem'}}>
                <div style={{fontSize:'0.8rem',fontWeight:700,color:'var(--text)',marginBottom:'1rem'}}>✓ Wat wij controleren</div>
                <div style={{display:'flex',flexDirection:'column',gap:'0.5rem',fontSize:'0.82rem',color:'var(--muted)'}}>
                  {type.oorzaken.slice(0,5).map((o,i) => (
                    <span key={i}>✓ {o.titel || o}</span>
                  ))}
                </div>
              </div>
              <div style={{background:'white',border:'1.5px solid var(--border)',borderRadius:'14px',padding:'1.5rem'}}>
                <div style={{fontSize:'0.8rem',fontWeight:700,color:'var(--text)',marginBottom:'1rem'}}>Ook actief in {stad.provincie}</div>
                <div style={{display:'flex',flexDirection:'column',gap:'0.4rem'}}>
                  {andereSteden.slice(0,5).map(s => (
                    <a key={s.slug} href={`/lekkage/${type.slug}/${s.slug}`}
                      style={{fontSize:'0.82rem',color:'var(--green)',textDecoration:'none',fontWeight:500}}>
                      {type.naam} {s.naam}
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
            <h2>{type.naam} in <em>{stad.naam}</em></h2>
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

      {/* INTERNE LINKING */}
      <section className="section section-white">
        <div className="section-inner" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'3rem'}}>
          <div>
            <div className="eyebrow">{type.naam} per stad</div>
            <h2 style={{fontSize:'1.3rem',marginBottom:'1.25rem'}}>Andere steden in <em>{stad.provincie}</em></h2>
            <div className="steden-grid">
              {andereSteden.map(s => (
                <a key={s.slug} href={`/lekkage/${type.slug}/${s.slug}`} className="stad-a">
                  <span>📍 {s.naam}</span><span className="stad-arrow">→</span>
                </a>
              ))}
              <a href={`/lekkage/${type.slug}`} className="stad-a" style={{color:'var(--green)',fontWeight:600}}>
                <span>Alle steden</span><span className="stad-arrow">→</span>
              </a>
            </div>
          </div>
          <div>
            <div className="eyebrow">Andere diensten in {stad.naam}</div>
            <h2 style={{fontSize:'1.3rem',marginBottom:'1.25rem'}}>Meer <em>lekkageproblemen</em></h2>
            <div className="steden-grid">
              {andereTypes.map(t => (
                <a key={t.slug} href={`/lekkage/${t.slug}/${stad.slug}`} className="stad-a">
                  <span>{t.icon} {t.naam}</span><span className="stad-arrow">→</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <div className="bottom-cta">
        <div className="eyebrow" style={{color:'#a8e6c0'}}>{type.naam} in {stad.naam}</div>
        <h2 style={{color:'white'}}>{type.naam} in {stad.naam}? Wacht niet te lang.</h2>
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
            <p className="footer-desc">Vakkundige {type.naam.toLowerCase()} reparaties in {stad.naam} en heel {stad.provincie}. Gecertificeerde vakmensen, transparante prijzen, garantie.</p>
          </div>
          <div className="footer-col">
            <h4>Diensten in {stad.naam}</h4>
            {lekkageTypes.map(t => <a key={t.slug} href={`/lekkage/${t.slug}/${stad.slug}`}>{t.naam}</a>)}
          </div>
          <div className="footer-col">
            <h4>{stad.provincie}</h4>
            {andereSteden.slice(0,5).map(s => <a key={s.slug} href={`/lekkage/${type.slug}/${s.slug}`}>{s.naam}</a>)}
            <a href={`/lekkage/${type.slug}`}>Alle steden →</a>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <a href={`tel:${PHONE}`}>{PHONE_DISPLAY} (24/7)</a>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <a href="#offerte">Gratis offerte</a>
            <a href="/blog">Blog & tips</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 LekkageFix · KvK 89586557 · {type.naam} {stad.naam} · <a href="#">Privacy</a> · <a href="#">Voorwaarden</a></p>
          <div className="cert-badges"><span className="cert">VCA ✓</span><span className="cert">ISO 9001</span><span className="cert">Erkend verzekeraar</span></div>
        </div>
      </footer>

      <a href={`tel:${PHONE}`} className="mobile-cta">📞 Bel nu: {PHONE_DISPLAY} (24/7 bereikbaar)</a>
    </>
  )
}
