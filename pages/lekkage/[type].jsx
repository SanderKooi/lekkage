
import Head from 'next/head'
import { useState } from 'react'
import { lekkageTypes, getType, steden } from '../../data'
import '../../styles/global.css'

export async function getStaticPaths() {
  return {
    paths: lekkageTypes.map(t => ({ params: { type: t.slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const type = getType(params.type)
  if (!type) return { notFound: true }
  return { props: { type } }
}

const reviews = [
  { naam: 'Martijn V.', stad: 'Amsterdam', tekst: 'Binnen een uur was het probleem gevonden en opgelost. Vakkundig werk voor een eerlijke prijs.', datum: '2 weken geleden' },
  { naam: 'Sandra K.', stad: 'Rotterdam', tekst: 'Snel gereageerd op mijn melding. Nette monteur, transparante prijsopgave vooraf. Aanrader!', datum: '1 maand geleden' },
  { naam: 'Peter D.', stad: 'Utrecht', tekst: 'Al weken last van het probleem. LekkageFix vond de echte oorzaak die anderen misten.', datum: '3 weken geleden' },
]

export default function LekkageType({ type }) {
  const [openFaq, setOpenFaq] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const topSteden = steden.slice(0, 24)

  const faqs = [
    { v: `Wat zijn de meest voorkomende oorzaken van ${type.naam.toLowerCase()}?`, a: `De meest voorkomende oorzaken zijn: ${type.oorzaken.join(', ')}.` },
    { v: 'Hoe snel kunnen jullie komen?', a: 'We streven ernaar zo snel mogelijk bij je te zijn — gemiddeld binnen 30 minuten ter plaatse.' },
    { v: 'Vergoedt mijn verzekering dit?', a: 'Plotselinge lekkages zijn bij de meeste opstalverzekeringen gedekt. Wij helpen je met de documentatie voor je claim.' },
    { v: 'Wat kost een reparatie?', a: 'We werken met transparante tarieven en geven altijd een duidelijke prijsopgave voordat we beginnen.' },
    { v: 'Geven jullie garantie?', a: 'Ja — we staan achter ons werk en geven garantie op alle uitgevoerde reparaties.' },
    { v: "Werken jullie ook 's nachts?", a: 'Ja, we zijn 24 uur per dag bereikbaar, ook in het weekend en op feestdagen.' },
  ]

  return (
    <>
      <Head>
        <title>{type.naam} – Snel & vakkundig verholpen | LekkageFix</title>
        <meta name="description" content={`${type.naam} in huis? ${type.omschrijving} LekkageFix helpt snel en vakkundig door heel Nederland. Bel direct voor een afspraak.`} />
        <link rel="canonical" href={`https://lekkagefix.nl/lekkage/${type.slug}`} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "Service", "name": type.naam, "provider": { "@type": "LocalBusiness", "name": "LekkageFix", "telephone": "0800-1234", "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "2847" } }, "areaServed": "Netherlands" },
            { "@type": "FAQPage", "mainEntity": faqs.map(f => ({ "@type": "Question", "name": f.v, "acceptedAnswer": { "@type": "Answer", "text": f.a } })) }
          ]
        })}} />
      </Head>

      {/* NAV */}
      <nav>
        <a href="/" className="logo"><span className="logo-icon">💧</span>Lekkage<b>Fix</b></a>
        <div className="nav-right">
          <a href="/lekdetectie" className="nav-link">Lekdetectie</a>
          <a href="/lekkage" className="nav-link">Lekkage</a>
          <a href="/blog" className="nav-link">Blog</a>
          <a href="tel:0800-1234" className="nav-phone">📞 0800-1234</a>
        </div>
      </nav>

      {/* BREADCRUMB */}
      <div className="breadcrumb-bar">
        <div className="breadcrumb">
          <a href="/">Home</a>
          <span className="breadcrumb-sep">›</span>
          <a href="/lekkage">Lekkage</a>
          <span className="breadcrumb-sep">›</span>
          <span>{type.naam}</span>
        </div>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-dots" />
        <div className="hero-inner">
          <div>
            <div className="hero-badge-urgency">⚠️ {type.urgentie === 'hoog' ? 'Spoed aanbevolen' : 'Tijdig handelen'}</div>
            <span className="hero-icon">{type.icon}</span>
            <h1><em>{type.naam}</em><br/>vakkundig verholpen</h1>
            <p className="hero-sub">{type.intro}</p>
            <div className="hero-stats">
              <div className="stat-item"><div className="stat-val">30<sup>min</sup></div><div className="stat-key">Gem. reactie</div></div>
              <div className="stat-item"><div className="stat-val">4.9<sup>★</sup></div><div className="stat-key">Beoordeling</div></div>
              <div className="stat-item"><div className="stat-val">24<sup>/7</sup></div><div className="stat-key">Bereikbaar</div></div>
              <div className="stat-item"><div className="stat-val">100<sup>%</sup></div><div className="stat-key">Garantie</div></div>
            </div>
            <div className="hero-actions">
              <a href="tel:0800-1234" className="btn-call">📞 Bel direct: 0800-1234</a>
              <a href="#offerte" className="btn-ghost">Offerte aanvragen →</a>
            </div>
          </div>
          <div className="form-card" id="offerte">
            <div className="form-title">Vakman aanvragen</div>
            <div className="form-sub">{type.naam} · gratis & vrijblijvend</div>
            <div className="fg"><label>Stad / gemeente</label><input type="text" placeholder="Amsterdam" /></div>
            <div className="form-row">
              <div className="fg"><label>Naam</label><input type="text" placeholder="Jan de Vries" /></div>
              <div className="fg"><label>Telefoon</label><input type="tel" placeholder="06-12345678" /></div>
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

      {/* INTRO */}
      <section className="section">
        <div className="section-inner">
          <div style={{display:'grid',gridTemplateColumns:'1.2fr 1fr',gap:'3.5rem',alignItems:'start'}}>
            <div>
              <div className="eyebrow">Over dit probleem</div>
              <h2>Wat is een <em>{type.naam.toLowerCase()}</em>?</h2>
              <div style={{marginTop:'1.25rem'}}>
                <p style={{color:'var(--muted)',fontSize:'0.92rem',lineHeight:'1.85',marginBottom:'1rem'}}>{type.intro}</p>
                <p style={{color:'var(--muted)',fontSize:'0.92rem',lineHeight:'1.85',marginBottom:'1rem'}}>Een {type.naam.toLowerCase()} vraagt om snelle actie. Hoe langer je wacht, hoe groter de schade en hoe hoger de herstelkosten.</p>
                <p style={{color:'var(--muted)',fontSize:'0.92rem',lineHeight:'1.85'}}>Wij werken met <strong>transparante tarieven</strong> en geven altijd een duidelijke prijsopgave voordat we beginnen.</p>
              </div>
            </div>
            <div style={{background:'var(--green3)',border:'1.5px solid var(--green4)',borderRadius:'16px',padding:'1.75rem'}}>
              <h3 style={{fontSize:'0.88rem',fontWeight:700,color:'var(--text)',marginBottom:'1.25rem',paddingBottom:'0.75rem',borderBottom:'1px solid var(--green4)'}}>In het kort</h3>
              {[
                { num:'30m', label:'Gemiddelde responstijd', sub:'We doen ons best zo snel mogelijk bij je te zijn' },
                { num:'4.9★', label:'Gemiddelde beoordeling', sub:'Op basis van 2.847 klantreviews' },
                { num:'✓', label:'Erkend door verzekeraars', sub:'Wij regelen de documentatie voor je claim' },
                { num:'24/7', label:'Dag en nacht bereikbaar', sub:'Ook weekend en feestdagen' },
              ].map((item, i) => (
                <div key={i} style={{display:'flex',alignItems:'center',gap:'1rem',padding:'0.85rem 0',borderBottom: i < 3 ? '1px solid var(--green4)' : 'none'}}>
                  <div style={{fontSize:'1.6rem',fontWeight:900,color:'var(--green-dark)',lineHeight:1,minWidth:'60px'}}>{item.num}</div>
                  <div>
                    <div style={{fontWeight:700,fontSize:'0.85rem',color:'var(--text)',marginBottom:'0.1rem'}}>{item.label}</div>
                    <div style={{fontSize:'0.8rem',color:'var(--muted)'}}>{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OORZAKEN */}
      <section className="section section-alt">
        <div className="section-inner">
          <div className="sec-head">
            <div className="eyebrow">Oorzaken</div>
            <h2>Waardoor ontstaat <em>{type.naam.toLowerCase()}</em>?</h2>
            <p className="sec-sub">Kennis van de oorzaak is essentieel voor een blijvende oplossing.</p>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(230px,1fr))',gap:'1.1rem'}}>
            {type.oorzaken.map((o, i) => (
              <div key={i} className="svc" style={{cursor:'default'}}>
                <div className="svc-icon">{['🔍','⚙️','🌧️','🏚️','⏰','🔬'][i % 6]}</div>
                <h3>Oorzaak {i + 1}</h3>
                <p>{o}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WERKWIJZE */}
      <section className="section section-white">
        <div className="section-inner">
          <div className="sec-head-center">
            <div className="eyebrow">Werkwijze</div>
            <h2>Van melding tot <em>oplossing</em></h2>
            <p className="sec-sub">Helder en transparant — zo pakken we een {type.naam.toLowerCase()} aan.</p>
          </div>
          <div className="steps">
            <div className="step"><div className="step-num">1</div><h3>Melding</h3><p>Bel of stuur een aanvraag. We bespreken het probleem en plannen een afspraak.</p></div>
            <div className="step"><div className="step-num">2</div><h3>Vakman onderweg</h3><p>De dichtstbijzijnde monteur rijdt naar je toe. Gemiddeld binnen 30 minuten.</p></div>
            <div className="step"><div className="step-num">3</div><h3>Inspectie & offerte</h3><p>Grondige inspectie en transparante prijsopgave. Jij beslist voordat we beginnen.</p></div>
            <div className="step"><div className="step-num">4</div><h3>Opgelost</h3><p>Vakkundige reparatie met garantie op het werk. Netjes opgeruimd achtergelaten.</p></div>
          </div>
        </div>
      </section>

      {/* STEDEN */}
      <section className="section section-alt" id="steden">
        <div className="section-inner">
          <div style={{display:'grid',gridTemplateColumns:'1fr auto',gap:'3rem',alignItems:'center',marginBottom:'2.5rem',flexWrap:'wrap'}}>
            <div>
              <div className="eyebrow">Werkgebied</div>
              <h2>{type.naam} in <em>jouw stad</em></h2>
              <p className="sec-sub">Selecteer jouw stad voor specifieke informatie en een directe aanvraag.</p>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:'2.5rem',background:'white',borderRadius:'14px',padding:'1.5rem 2rem',border:'1.5px solid var(--border)'}}>
              {[['46+','Steden'],['12','Provincies'],['24/7','Bereikbaar']].map(([n,l]) => (
                <div key={l} style={{textAlign:'center'}}>
                  <div style={{fontSize:'2rem',fontWeight:900,color:'var(--green-dark)',lineHeight:1}}>{n}</div>
                  <div style={{fontSize:'0.62rem',color:'var(--muted)',textTransform:'uppercase',letterSpacing:'0.07em',marginTop:'0.2rem'}}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="steden-grid">
            {topSteden.map(s => (
              <a key={s.slug} href={`/lekkage/${type.slug}/${s.slug}`} className="stad-a">
                <span>📍 {s.naam}</span>
                <span className="stad-arrow">→</span>
              </a>
            ))}
          </div>
          <div style={{display:'flex',justifyContent:'center',marginTop:'1.5rem'}}>
            <a href="/alle-steden" className="btn-all">Bekijk alle steden →</a>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section section-white">
        <div className="section-inner">
          <div className="sec-head-center">
            <div className="eyebrow">Klantervaringen</div>
            <h2>Wat klanten zeggen over <em>LekkageFix</em></h2>
            <p className="sec-sub">4.9 sterren op basis van 2.847 reviews via Google en Trustpilot.</p>
          </div>
          <div className="reviews-grid">
            {reviews.map((r, i) => (
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

      {/* FAQ */}
      <section className="section section-alt">
        <div className="section-inner">
          <div className="sec-head-center">
            <div className="eyebrow">Veelgestelde vragen</div>
            <h2>Alles over <em>{type.naam.toLowerCase()}</em></h2>
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

      {/* ANDERE TYPES */}
      <section className="section">
        <div className="section-inner">
          <div className="sec-head">
            <div className="eyebrow">Andere diensten</div>
            <h2>Meer <em>lekkageproblemen</em></h2>
            <p className="sec-sub">Wij lossen elk type lekkage op — van daklekkage tot rioolproblemen.</p>
          </div>
          <div className="svc-grid">
            {lekkageTypes.filter(t => t.slug !== type.slug).map(t => (
              <a key={t.slug} href={`/lekkage/${t.slug}`} className="svc">
                <div className="svc-icon">{t.icon}</div>
                <h3>{t.naam}</h3>
                <p>{t.omschrijving}</p>
                <div className="svc-cta">Meer informatie →</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <div className="bottom-cta">
        <div className="eyebrow" style={{color:'#a8e6c0'}}>{type.naam} — direct geholpen</div>
        <h2 style={{color:'white'}}>{type.naam}? Wacht niet te lang.</h2>
        <p>Hoe eerder je belt, hoe kleiner de schade. Onze vakmensen staan voor je klaar.</p>
        <div className="cta-btns">
          <a href="tel:0800-1234" className="btn-call">📞 Bel nu: 0800-1234</a>
          <a href="#offerte" className="btn-white-ghost">Offerte aanvragen</a>
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
            {lekkageTypes.slice(0,4).map(t => <a key={t.slug} href={`/lekkage/${t.slug}`}>{t.naam}</a>)}
          </div>
          <div className="footer-col">
            <h4>Steden</h4>
            {steden.slice(0,5).map(s => <a key={s.slug} href={`/lekkage/${type.slug}/${s.slug}`}>{s.naam}</a>)}
            <a href="/alle-steden">Alle steden →</a>
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

      <a href="tel:0800-1234" className="mobile-cta">📞 Bel nu: 0800-1234 (24/7 bereikbaar)</a>
    </>
  )
}
