import Head from 'next/head'
import { useState, useRef, useEffect } from 'react'
import Nav from '../components/Nav'
import { steden as alleSteden, lekkageTypes } from '../data'

const faqs = [
  { v: 'Hoe snel komen jullie bij een lekkage?', a: 'We streven ernaar zo snel mogelijk bij je te zijn. Gemiddeld zijn we binnen 30 minuten ter plaatse. Bel ons voor een actuele inschatting.' },
  { v: 'Wat kost een bezoek?', a: 'We werken met transparante tarieven. Je ontvangt altijd een duidelijke prijsopgave voordat we aan het werk gaan. Geen verborgen kosten.' },
  { v: 'Vergoedt de verzekering de lekkage?', a: 'Bij de meeste opstalverzekeringen zijn plotselinge lekkages gedekt. Wij zijn erkend door alle grote verzekeraars en helpen je met de benodigde documentatie.' },
  { v: 'Geven jullie garantie op de reparatie?', a: 'We staan achter ons werk en geven garantie op alle uitgevoerde reparaties. Mocht er iets niet naar tevredenheid zijn, lossen we dat netjes op.' },
  { v: 'Werken jullie ook buiten kantooruren?', a: 'Ja — we zijn 24 uur per dag, 7 dagen per week bereikbaar. Ook in de nacht, het weekend en op feestdagen.' },
  { v: 'In welke steden zijn jullie actief?', a: 'We werken door heel Nederland. Bekijk ons complete steden-overzicht of bel ons om te vragen of we in jouw regio actief zijn.' },
]

const diensten = [
  { icon:'🏠', title:'Daklekkage', slug:'lekkage-dak', desc:'Waterindringing via plat dak, schuin dak, pannendak of dakkapel. Direct inspecteren en repareren voordat de schade groter wordt.' },
  { icon:'🔧', title:'Waterleiding', slug:'lekkage-waterleiding', desc:'Gesprongen waterleiding, lekkende kraan, lage waterdruk of defecte boiler. Snel een ervaren loodgieter aan de deur.' },
  { icon:'🚿', title:'Badkamerlekkage', slug:'lekkage-badkamer', desc:'Lekkage rondom douche, bad of toilet. Voorkomen dat water in de vloer of wanden trekt. Snel en vakkundig.' },
  { icon:'🚰', title:'Rioollekkage', slug:'riool-lekkage', desc:'Verstopt of lekkend riool? Camera-inspectie zonder sloopwerk. We vinden de oorzaak en repareren duurzaam.' },
  { icon:'💧', title:'Vochtproblemen', slug:'vochtprobleem', desc:'Schimmel, condensatie of optrekkend vocht? We zoeken de bron, niet alleen het symptoom. Blijvende oplossing.' },
  { icon:'🧱', title:'Gevellekkage', slug:'lekkage-muur', desc:'Waterindringing via gevels, spouwmuur of kozijnen. Vochtschade aan de buitenkant stoppen voordat het verder gaat.' },
  { icon:'🏚️', title:'Kelderwaterdichting', slug:'kelderafdichting', desc:'Grondwater of regenwater dat de kelder binnendringt. Structurele waterdichting voor een droge kelder.' },
]

export default function Homepage() {
  const [openFaq, setOpenFaq] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  const [offset, setOffset] = useState(0)
  const trackRef = useRef(null)
  const touchStartX = useRef(0)
  const VISIBLE = 3
  const GAP = 20

  // Postcode → stad mapping (hoofdplaatsen per reeks)
  const postcodeMap = [
    { from: 1000, to: 1109, slug: 'amsterdam', naam: 'Amsterdam' },
    { from: 1110, to: 1135, slug: 'diemen', naam: 'Diemen' },
    { from: 1180, to: 1187, slug: 'amstelveen', naam: 'Amstelveen' },
    { from: 2000, to: 2099, slug: 'haarlem', naam: 'Haarlem' },
    { from: 2490, to: 2599, slug: 'den-haag', naam: 'Den Haag' },
    { from: 2600, to: 2729, slug: 'delft', naam: 'Delft' },
    { from: 3000, to: 3099, slug: 'rotterdam', naam: 'Rotterdam' },
    { from: 3500, to: 3599, slug: 'utrecht', naam: 'Utrecht' },
    { from: 3800, to: 3899, slug: 'amersfoort', naam: 'Amersfoort' },
    { from: 4600, to: 4699, slug: 'bergen-op-zoom', naam: 'Bergen op Zoom' },
    { from: 4800, to: 4899, slug: 'breda', naam: 'Breda' },
    { from: 5000, to: 5099, slug: 'tilburg', naam: 'Tilburg' },
    { from: 5600, to: 5659, slug: 'eindhoven', naam: 'Eindhoven' },
    { from: 6200, to: 6229, slug: 'maastricht', naam: 'Maastricht' },
    { from: 6500, to: 6549, slug: 'nijmegen', naam: 'Nijmegen' },
    { from: 6800, to: 6839, slug: 'arnhem', naam: 'Arnhem' },
    { from: 7400, to: 7429, slug: 'deventer', naam: 'Deventer' },
    { from: 7500, to: 7549, slug: 'enschede', naam: 'Enschede' },
    { from: 8000, to: 8049, slug: 'zwolle', naam: 'Zwolle' },
    { from: 8900, to: 8939, slug: 'leeuwarden', naam: 'Leeuwarden' },
    { from: 9700, to: 9779, slug: 'groningen', naam: 'Groningen' },
    { from: 9400, to: 9419, slug: 'assen', naam: 'Assen' },
  ]

  function resolvePostcode(val) {
    const num = parseInt(val.replace(/\D/g, '').slice(0, 4))
    if (isNaN(num) || num < 1000 || num > 9999) return null
    return postcodeMap.find(p => num >= p.from && num <= p.to) || null
  }

  // Funnel state
  const [funnelDienst, setFunnelDienst] = useState(null)
  const [funnelStad, setFunnelStad] = useState('')
  const [funnelSuggestions, setFunnelSuggestions] = useState([])
  const [funnelStadSlug, setFunnelStadSlug] = useState(null)
  const [funnelPostcodeHint, setFunnelPostcodeHint] = useState(null)

  function handleFunnelStadInput(val) {
    setFunnelStad(val)
    setFunnelStadSlug(null)
    setFunnelPostcodeHint(null)

    // Postcode check
    if (/^\d{4}/.test(val.trim())) {
      const hit = resolvePostcode(val)
      if (hit) setFunnelPostcodeHint(hit)
      setFunnelSuggestions([])
      return
    }

    if (val.length < 2) { setFunnelSuggestions([]); return }
    const matches = alleSteden.filter(s =>
      s.naam.toLowerCase().startsWith(val.toLowerCase())
    ).slice(0, 6)
    setFunnelSuggestions(matches)
  }

  function selectFunnelStad(s) {
    setFunnelStad(s.naam)
    setFunnelStadSlug(s.slug)
    setFunnelSuggestions([])
    setFunnelPostcodeHint(null)
  }

  function funnelGo() {
    if (!funnelDienst) return
    if (funnelStadSlug) {
      window.location.href = `/lekkage/${funnelDienst}/${funnelStadSlug}`
    } else if (funnelPostcodeHint) {
      window.location.href = `/lekkage/${funnelDienst}/${funnelPostcodeHint.slug}`
    } else if (funnelStad.trim().length > 1) {
      // Vrije tekst, stad niet in database → hoofddienst pagina
      window.location.href = `/lekkage/dienst/${funnelDienst}`
    }
  }

  const funnelCanGo = funnelDienst && (funnelStadSlug || funnelPostcodeHint || funnelStad.trim().length > 1)
  const funnelLabel = () => {
    if (!funnelDienst) return 'Kies eerst een probleem en stad'
    const dienstNaam = lekkageTypes.find(t => t.slug === funnelDienst)?.naam
    const stadNaam = funnelStadSlug
      ? funnelStad
      : funnelPostcodeHint
        ? funnelPostcodeHint.naam
        : funnelStad.trim()
    return stadNaam ? `${dienstNaam} in ${stadNaam} bekijken →` : `Typ je stad of postcode`
  }

  // Steden carrousels
  const lekkageSteden = ['amsterdam','rotterdam','den-haag','utrecht','eindhoven','groningen','tilburg','breda','nijmegen','haarlem']
  const lekdetectieSteden = ['amsterdam','rotterdam','den-haag','utrecht','eindhoven','groningen','tilburg','breda','arnhem','leiden']

  const [slideLekkage, setSlideLekkage] = useState(0)
  const [slideLekdetectie, setSlideLekdetectie] = useState(0)
  const trackLekkageRef = useRef(null)
  const trackLekdetectieRef = useRef(null)
  const touchLekkageX = useRef(0)
  const touchLekdetectieX = useRef(0)

  function goCarousel(slugs, slide, setSlide, trackRef2) {
    const vis = getVisible()
    const max = slugs.length - vis
    const next = Math.max(0, Math.min(max, slide))
    const wrapWidth = trackRef2.current?.parentElement?.offsetWidth || window.innerWidth - 32
    const cardWidth = (wrapWidth - (vis - 1) * GAP) / vis
    trackRef2.current.style.transform = `translateX(-${next * (cardWidth + GAP)}px)`
    setSlide(next)
  }

  function handleTouchStartLekkage(e) { touchLekkageX.current = e.touches[0].clientX }
  function handleTouchEndLekkage(e) {
    const diff = touchLekkageX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) goCarousel(lekkageSteden, slideLekkage + (diff > 0 ? 1 : -1), setSlideLekkage, trackLekkageRef)
  }
  function handleTouchStartLekdetectie(e) { touchLekdetectieX.current = e.touches[0].clientX }
  function handleTouchEndLekdetectie(e) {
    const diff = touchLekdetectieX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) goCarousel(lekdetectieSteden, slideLekdetectie + (diff > 0 ? 1 : -1), setSlideLekdetectie, trackLekdetectieRef)
  }

  function getVisible() {
    if (typeof window === 'undefined') return 3
    if (window.innerWidth <= 600) return 1
    if (window.innerWidth <= 900) return 2
    return 3
  }

  function goTo(n) {
    const vis = getVisible()
    const max = diensten.length - vis
    const next = Math.max(0, Math.min(max, n))
    const wrapWidth = trackRef.current?.parentElement?.offsetWidth || window.innerWidth - 32
    const cardWidth = (wrapWidth - (vis - 1) * GAP) / vis
    setOffset(next * (cardWidth + GAP))
    setActiveSlide(next)
  }

  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX
  }

  function handleTouchEnd(e) {
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) goTo(diff > 0 ? activeSlide + 1 : activeSlide - 1)
  }

  return (
    <>
      <Head>
        <title>Lekkage Reparatie – 24/7 Spoedhulp door heel Nederland | LekkageFix</title>
        <meta name="description" content="Lekkage? Onze vakmensen komen zo snel mogelijk naar je toe. Daklekkage, loodgieter, riool of vocht — dag en nacht bereikbaar. Gratis offerte." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "LocalBusiness", "name": "LekkageFix", "telephone": "0800-1234", "url": "https://lekkagefix.nl", "openingHours": "Mo-Su 00:00-24:00", "priceRange": "€€", "areaServed": "Netherlands", "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "2847" } },
            { "@type": "FAQPage", "mainEntity": faqs.map(f => ({ "@type": "Question", "name": f.v, "acceptedAnswer": { "@type": "Answer", "text": f.a } })) }
          ]
        })}} />
      </Head>

      {/* NAV */}
      <Nav activePath="/" />

      {/* HERO */}
      <section className="hero">
        <div className="hero-dots" />
        <div className="hero-inner">
          <div>
            <div className="hero-badge"><span className="pulse" /> 24/7 bereikbaar · heel Nederland</div>
            <h1>Lekkage<br/>reparatie — <em>snel,<br/>vakkundig &<br/>gegarandeerd.</em></h1>
            <p className="hero-sub">Daklekkage, gesprongen waterleiding, rioolprobleem of vochtige muren? Onze gecertificeerde vakmensen staan voor je klaar. Dag en nacht, ook in het weekend.</p>
            <div className="hero-stats">
              <div className="stat-item"><div className="stat-val">30<sup>min</sup></div><div className="stat-key">Gemiddeld</div></div>
              <div className="stat-item"><div className="stat-val">4.9<sup>★</sup></div><div className="stat-key">Beoordeling</div></div>
              <div className="stat-item"><div className="stat-val">12k<sup>+</sup></div><div className="stat-key">Klanten</div></div>
              <div className="stat-item"><div className="stat-val">24<sup>/7</sup></div><div className="stat-key">Bereikbaar</div></div>
            </div>
            <div className="hero-actions">
              <a href="tel:0800-1234" className="btn-call">📞 Bel nu: 0800-1234</a>
              <a href="#offerte" className="btn-ghost">Gratis offerte →</a>
            </div>
          </div>
          <div className="form-card" id="offerte">
            <div className="form-title">Vakman aanvragen</div>
            <div className="form-sub">Gratis & vrijblijvend · we nemen snel contact op</div>
            <div className="fg"><label>Type lekkage</label>
              <select><option>Daklekkage</option><option>Loodgieter / waterleiding</option><option>Rioollekkage</option><option>Vochtproblemen / schimmel</option><option>Weet ik niet zeker</option></select>
            </div>
            <div className="form-row">
              <div className="fg"><label>Naam</label><input type="text" placeholder="Jan de Vries" /></div>
              <div className="fg"><label>Telefoon</label><input type="tel" placeholder="06-12345678" /></div>
            </div>
            <div className="fg"><label>Postcode + stad</label><input type="text" placeholder="1011 AB Amsterdam" /></div>
            <div className="fg"><label>Omschrijving (optioneel)</label><textarea placeholder="Beschrijf kort het probleem..." /></div>
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
          <div className="ti-item"><span className="ti-check">✓</span><span><strong>Transparante</strong> prijzen</span></div>
          <div className="ti-item"><span className="ti-check">✓</span><span><strong>VCA</strong> gecertificeerd</span></div>
          <div className="ti-item"><span className="ti-check">✓</span><span>Erkend door <strong>verzekeraars</strong></span></div>
        </div>
      </div>

      {/* DIENSTEN CARROUSEL */}
      <section className="section" id="diensten">
        <div className="section-inner">
          <div className="sec-head" style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',flexWrap:'wrap',gap:'1rem'}}>
            <div>
              <div className="eyebrow">Specialisaties</div>
              <h2>Elk type lekkage <em>opgelost</em></h2>
              <p className="sec-sub">Van noodgeval midden in de nacht tot geplande reparatie — voor elk probleem hebben we een oplossing.</p>
            </div>
            <div className="carousel-nav-top">
              <button className="carousel-btn" onClick={() => goTo(activeSlide - 1)} disabled={activeSlide === 0} aria-label="Vorige">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <button className="carousel-btn" onClick={() => goTo(activeSlide + 1)} disabled={activeSlide === diensten.length - getVisible()} aria-label="Volgende">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>
          <div className="carousel-wrap" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            <div className="carousel-track" ref={trackRef} style={{transform:`translateX(-${offset}px)`}}>
              {diensten.map(s => (
                <a key={s.slug} href={`/lekkage/dienst/${s.slug}`} className="svc carousel-card">
                  <div className="svc-icon">{s.icon}</div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <div className="svc-cta">Meer over {s.title.toLowerCase()} <span className="arrow">→</span></div>
                </a>
              ))}
            </div>
          </div>
          <div className="carousel-footer">
            {Array.from({length: diensten.length - getVisible() + 1}).map((_, i) => (
              <button key={i} className={`carousel-dot${activeSlide === i ? ' active' : ''}`} onClick={() => goTo(i)} aria-label={`Dienst ${i + 1}`} />
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
              { n:'1', t:'Melding', p:'Bel of stuur een aanvraag. We bespreken het probleem en plannen een afspraak.' },
              { n:'2', t:'Vakman onderweg', p:'De dichtstbijzijnde monteur rijdt naar je toe. Gemiddeld binnen 30 minuten.' },
              { n:'3', t:'Inspectie & offerte', p:'Grondige inspectie en transparante prijsopgave. Jij beslist voordat we beginnen.' },
              { n:'4', t:'Opgelost', p:'Vakkundige reparatie met garantie op het werk. Netjes opgeruimd achtergelaten.' },
            ].map(s => (
              <div key={s.n} className="step"><div className="step-num">{s.n}</div><h3>{s.t}</h3><p>{s.p}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* FUNNEL */}
      <section className="section section-alt" id="steden">
        <div className="section-inner">
          <div className="sec-head-center">
            <div className="eyebrow">Direct naar jouw oplossing</div>
            <h2>Kies je probleem & <em>jouw stad</em></h2>
            <p className="sec-sub">In twee stappen direct naar alle informatie en een vakman in jouw buurt.</p>
          </div>

          <div style={{maxWidth:'680px',margin:'0 auto'}}>
            {/* STAP 1 */}
            <div style={{marginBottom:'1.5rem'}}>
              <div style={{fontSize:'0.75rem',fontWeight:700,color:'var(--green-dark)',letterSpacing:'0.08em',textTransform:'uppercase',marginBottom:'0.75rem'}}>Stap 1 — Wat is het probleem?</div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))',gap:'0.5rem'}}>
                {lekkageTypes.map(t => (
                  <button key={t.slug} onClick={() => setFunnelDienst(t.slug)} style={{display:'flex',alignItems:'center',gap:'0.6rem',padding:'0.65rem 0.85rem',borderRadius:'10px',border:funnelDienst===t.slug?'2px solid var(--green)':'1.5px solid var(--border)',background:funnelDienst===t.slug?'var(--green3)':'white',cursor:'pointer',fontSize:'0.85rem',fontWeight:funnelDienst===t.slug?700:500,color:funnelDienst===t.slug?'var(--green-dark)':'var(--text)',transition:'all 0.15s',fontFamily:'inherit',textAlign:'left'}}>
                    <span style={{fontSize:'1.1rem'}}>{t.icon}</span> {t.naam}
                  </button>
                ))}
              </div>
            </div>

            {/* STAP 2 */}
            <div style={{marginBottom:'1.25rem',opacity:funnelDienst?1:0.4,transition:'opacity 0.2s',pointerEvents:funnelDienst?'auto':'none'}}>
              <div style={{fontSize:'0.75rem',fontWeight:700,color:'var(--green-dark)',letterSpacing:'0.08em',textTransform:'uppercase',marginBottom:'0.75rem'}}>Stap 2 — In welke stad of postcode?</div>
              <div style={{position:'relative'}}>
                <input
                  type="text"
                  placeholder="Typ je stad of postcode, bijv. Amsterdam of 1011..."
                  value={funnelStad}
                  onChange={e => handleFunnelStadInput(e.target.value)}
                  style={{width:'100%',padding:'0.75rem 1rem',border:'1.5px solid var(--border)',borderRadius:'10px',fontSize:'0.92rem',fontFamily:'inherit',outline:'none',boxSizing:'border-box',color:'var(--text)'}}
                  onFocus={e => e.target.style.borderColor='var(--green)'}
                  onBlur={e => { e.target.style.borderColor='var(--border)'; setTimeout(() => setFunnelSuggestions([]), 150) }}
                />
                {/* Autocomplete dropdown */}
                {funnelSuggestions.length > 0 && (
                  <div style={{position:'absolute',top:'calc(100% + 4px)',left:0,right:0,background:'white',border:'1.5px solid var(--border)',borderRadius:'10px',boxShadow:'0 8px 24px rgba(0,0,0,0.1)',zIndex:10,overflow:'hidden'}}>
                    {funnelSuggestions.map(s => (
                      <div key={s.slug} onMouseDown={() => selectFunnelStad(s)}
                        style={{padding:'0.65rem 1rem',cursor:'pointer',fontSize:'0.88rem',color:'var(--text)',borderBottom:'1px solid var(--border)',display:'flex',justifyContent:'space-between',alignItems:'center'}}
                        onMouseEnter={e => e.currentTarget.style.background='var(--green3)'}
                        onMouseLeave={e => e.currentTarget.style.background='white'}>
                        <span>📍 {s.naam}</span>
                        <span style={{fontSize:'0.75rem',color:'var(--muted)'}}>{s.provincie}</span>
                      </div>
                    ))}
                  </div>
                )}
                {/* Postcode hint */}
                {funnelPostcodeHint && (
                  <div style={{marginTop:'0.5rem',padding:'0.6rem 1rem',background:'var(--green3)',border:'1px solid var(--green4)',borderRadius:'8px',fontSize:'0.83rem',color:'var(--green-dark)',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                    <span>📍 Postcode herkend als <strong>{funnelPostcodeHint.naam}</strong></span>
                    <button onMouseDown={() => selectFunnelStad(funnelPostcodeHint)} style={{background:'var(--green)',color:'white',border:'none',borderRadius:'6px',padding:'0.25rem 0.65rem',fontSize:'0.78rem',fontWeight:700,cursor:'pointer',fontFamily:'inherit'}}>Gebruik deze stad</button>
                  </div>
                )}
                {/* Vrije tekst hint — stad niet in database */}
                {funnelStad.trim().length > 2 && !funnelStadSlug && !funnelPostcodeHint && funnelSuggestions.length === 0 && !/^\d/.test(funnelStad) && (
                  <div style={{marginTop:'0.5rem',padding:'0.6rem 1rem',background:'#fff8ed',border:'1px solid #fed7aa',borderRadius:'8px',fontSize:'0.83rem',color:'#92400e'}}>
                    💡 <strong>{funnelStad}</strong> staat nog niet in onze database. Je wordt doorgestuurd naar alle informatie over deze dienst.
                  </div>
                )}
              </div>
            </div>

            {/* GO */}
            <button onClick={funnelGo} disabled={!funnelCanGo}
              style={{width:'100%',padding:'0.9rem',borderRadius:'10px',border:'none',background:funnelCanGo?'var(--orange)':'var(--border)',color:funnelCanGo?'white':'var(--muted)',fontSize:'1rem',fontWeight:700,cursor:funnelCanGo?'pointer':'not-allowed',transition:'all 0.2s',fontFamily:'inherit'}}>
              {funnelLabel()}
            </button>
          </div>
        </div>
      </section>

      {/* STEDEN CARROUSEL — LEKKAGE */}
      <section className="section section-white">
        <div className="section-inner">
          <div className="sec-head" style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',flexWrap:'wrap',gap:'1rem',marginBottom:'1.5rem'}}>
            <div>
              <div className="eyebrow">Lekkage reparatie</div>
              <h2>Populaire <em>steden</em></h2>
            </div>
            <div className="carousel-nav-top">
              <button className="carousel-btn" onClick={() => goCarousel(lekkageSteden, slideLekkage-1, setSlideLekkage, trackLekkageRef)} disabled={slideLekkage===0} aria-label="Vorige">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <button className="carousel-btn" onClick={() => goCarousel(lekkageSteden, slideLekkage+1, setSlideLekkage, trackLekkageRef)} disabled={slideLekkage>=lekkageSteden.length-getVisible()} aria-label="Volgende">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>
          <div className="carousel-wrap" onTouchStart={handleTouchStartLekkage} onTouchEnd={handleTouchEndLekkage}>
            <div className="carousel-track" ref={trackLekkageRef} style={{transform:'translateX(0)'}}>
              {lekkageSteden.map(slug => {
                const s = alleSteden.find(x => x.slug === slug)
                if (!s) return null
                return (
                  <a key={slug} href={`/lekkage/${slug}`} className="svc carousel-card" style={{textDecoration:'none'}}>
                    <div style={{fontSize:'0.68rem',fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:'var(--green)',marginBottom:'0.5rem'}}>Lekkage reparatie</div>
                    <h3 style={{fontSize:'1.15rem',marginBottom:'0.2rem'}}>{s.naam}</h3>
                    <p style={{fontSize:'0.8rem',color:'var(--muted)',marginBottom:'0.75rem'}}>📍 {s.provincie}</p>
                    <div className="svc-cta">Bekijk {s.naam} <span className="arrow">→</span></div>
                  </a>
                )
              })}
            </div>
          </div>
          <div className="carousel-footer">
            {lekkageSteden.map((_, i) => (
              <button key={i} className={`carousel-dot${slideLekkage === i ? ' active' : ''}`} onClick={() => goCarousel(lekkageSteden, i, setSlideLekkage, trackLekkageRef)} aria-label={`Stad ${i + 1}`} />
            ))}
          </div>
        </div>
      </section>

      {/* STEDEN CARROUSEL — LEKDETECTIE */}
      <section className="section section-alt">
        <div className="section-inner">
          <div className="sec-head" style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',flexWrap:'wrap',gap:'1rem',marginBottom:'1.5rem'}}>
            <div>
              <div className="eyebrow">Lekdetectie</div>
              <h2>Populaire <em>steden</em></h2>
            </div>
            <div className="carousel-nav-top">
              <button className="carousel-btn" onClick={() => goCarousel(lekdetectieSteden, slideLekdetectie-1, setSlideLekdetectie, trackLekdetectieRef)} disabled={slideLekdetectie===0} aria-label="Vorige">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <button className="carousel-btn" onClick={() => goCarousel(lekdetectieSteden, slideLekdetectie+1, setSlideLekdetectie, trackLekdetectieRef)} disabled={slideLekdetectie>=lekdetectieSteden.length-getVisible()} aria-label="Volgende">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>
          <div className="carousel-wrap" onTouchStart={handleTouchStartLekdetectie} onTouchEnd={handleTouchEndLekdetectie}>
            <div className="carousel-track" ref={trackLekdetectieRef} style={{transform:'translateX(0)'}}>
              {lekdetectieSteden.map(slug => {
                const s = alleSteden.find(x => x.slug === slug)
                if (!s) return null
                return (
                  <a key={slug} href={`/lekdetectie/${slug}`} className="svc carousel-card" style={{textDecoration:'none'}}>
                    <div style={{fontSize:'0.68rem',fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:'var(--green)',marginBottom:'0.5rem'}}>Lekdetectie</div>
                    <h3 style={{fontSize:'1.15rem',marginBottom:'0.2rem'}}>{s.naam}</h3>
                    <p style={{fontSize:'0.8rem',color:'var(--muted)',marginBottom:'0.75rem'}}>📍 {s.provincie}</p>
                    <div className="svc-cta">Bekijk {s.naam} <span className="arrow">→</span></div>
                  </a>
                )
              })}
            </div>
          </div>
          <div className="carousel-footer">
            {lekdetectieSteden.map((_, i) => (
              <button key={i} className={`carousel-dot${slideLekdetectie === i ? ' active' : ''}`} onClick={() => goCarousel(lekdetectieSteden, i, setSlideLekdetectie, trackLekdetectieRef)} aria-label={`Stad ${i + 1}`} />
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section section-white">
        <div className="section-inner">
          <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:'2.5rem',gap:'1rem',flexWrap:'wrap'}}>
            <div>
              <div className="eyebrow">Klantervaringen</div>
              <h2>Wat klanten zeggen</h2>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:'1.25rem',background:'var(--green3)',border:'1.5px solid var(--green4)',borderRadius:'12px',padding:'1rem 1.5rem'}}>
              <div style={{fontSize:'3rem',fontWeight:900,color:'var(--green-dark)',lineHeight:1}}>4.9</div>
              <div><div style={{color:'#f59e0b',fontSize:'1rem'}}>★★★★★</div><div style={{fontSize:'0.75rem',color:'var(--muted)',marginTop:'0.2rem'}}>2.847 beoordelingen</div></div>
            </div>
          </div>
          <div className="reviews-grid">
            {[
              { naam:'Martijn V.', stad:'Amsterdam', tekst:'Binnen een uur was het probleem gevonden en opgelost. Vakkundig werk voor een eerlijke prijs. Zeker aanrader.', datum:'2 weken geleden' },
              { naam:'Sandra K.', stad:'Rotterdam', tekst:'Snel gereageerd op mijn melding. Nette monteur, transparante prijsopgave vooraf. Ik ben heel tevreden.', datum:'1 maand geleden' },
              { naam:'Peter D.', stad:'Utrecht', tekst:'Al weken last van het probleem. LekkageFix vond de echte oorzaak die anderen misten. Eindelijk opgelost!', datum:'3 weken geleden' },
            ].map((r, i) => (
              <div key={i} className="review">
                <div className="review-top">
                  <div className="stars">★★★★★</div>
                  <div className="review-date">{r.datum}</div>
                </div>
                <p className="review-text">"{r.tekst}"</p>
                <div className="reviewer">
                  <div className="avatar">{r.naam.split(' ').map(n => n[0]).join('')}</div>
                  <div>
                    <div className="rev-name">{r.naam}</div>
                    <div className="rev-meta">{r.stad} · <span className="verified">✓ geverifieerd</span></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section className="section" id="blog">
        <div className="section-inner">
          <div className="sec-head">
            <div className="eyebrow">Kennisbank</div>
            <h2>Handige tips & <em>uitleg</em></h2>
            <p className="sec-sub">Alles wat je wilt weten over lekkages — van eerste hulp bij wateroverlast tot het herkennen van vochtproblemen.</p>
          </div>
          <div className="blog-grid">
            <a href="/blog/wat-te-doen-bij-daklekkage" className="blog-card">
              <div className="blog-img blog-img-main">
                <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80&auto=format&fit=crop" alt="Daklekkage reparatie" />
                <span className="blog-cat">Daklekkage</span>
              </div>
              <div className="blog-body">
                <div className="blog-meta"><span>📅 12 feb 2025</span><span>⏱ 5 min lezen</span></div>
                <h3>Wat moet je doen bij een daklekkage? De eerste 5 stappen</h3>
                <p className="blog-excerpt">Water dat door het dak naar binnen sijpelt kan snel grote schade veroorzaken. Dit zijn de eerste stappen die je zet terwijl je wacht op de vakman.</p>
                <div className="blog-link">Lees artikel →</div>
              </div>
            </a>
            <a href="/blog/oorzaken-vochtproblemen" className="blog-card">
              <div className="blog-img">
                <img src="https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80&auto=format&fit=crop" alt="Vochtproblemen" />
                <span className="blog-cat">Vocht</span>
              </div>
              <div className="blog-body">
                <div className="blog-meta"><span>📅 5 feb 2025</span><span>⏱ 4 min</span></div>
                <h3>De 6 meest voorkomende oorzaken van vochtproblemen</h3>
                <div className="blog-link">Lees artikel →</div>
              </div>
            </a>
            <a href="/blog/verzekering-lekkage" className="blog-card">
              <div className="blog-img">
                <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80&auto=format&fit=crop" alt="Verzekering lekkage" />
                <span className="blog-cat">Verzekering</span>
              </div>
              <div className="blog-body">
                <div className="blog-meta"><span>📅 28 jan 2025</span><span>⏱ 3 min</span></div>
                <h3>Vergoedt je verzekering een lekkage? Zo zit het</h3>
                <div className="blog-link">Lees artikel →</div>
              </div>
            </a>
          </div>
          <div style={{display:'flex',justifyContent:'center',marginTop:'2rem'}}>
            <a href="/blog" className="btn-blog">Bekijk alle artikelen →</a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section-alt">
        <div className="section-inner">
          <div className="sec-head-center">
            <div className="eyebrow">FAQ</div>
            <h2>Antwoorden op je vragen</h2>
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
        <div className="eyebrow" style={{color:'#a8e6c0'}}>Direct geholpen</div>
        <h2 style={{color:'white'}}>Lekkage? Wacht niet te lang.</h2>
        <p>Hoe eerder je belt, hoe kleiner de schade. Onze vakmensen staan voor je klaar.</p>
        <div className="cta-btns">
          <a href="tel:0800-1234" className="btn-call">📞 Bel nu: 0800-1234</a>
          <a href="#offerte" className="btn-white-ghost">Gratis offerte aanvragen</a>
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
            {diensten.map(d => <a key={d.slug} href={`/lekkage/dienst/${d.slug}`}>{d.title}</a>)}
          </div>
          <div className="footer-col">
            <h4>Steden</h4>
            {alleSteden.slice(0,4).map(s => <a key={s.slug} href={`/lekkage/${s.slug}`}>{s.naam}</a>)}
            <a href="/lekkage">Alle steden →</a>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <a href="tel:0800-1234">0800-1234 (24/7)</a>
            <a href="mailto:info@lekkagefix.nl">info@lekkagefix.nl</a>
            <a href="#offerte">Gratis offerte</a>
            <a href="/blog">Blog & tips</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 LekkageFix · KvK 89586557 · <a href="#">Privacy</a> · <a href="#">Voorwaarden</a></p>
          <div className="cert-badges"><span className="cert">VCA ✓</span><span className="cert">ISO 9001</span><span className="cert">Erkend verzekeraar</span></div>
        </div>
      </footer>
    </>
  )
}
