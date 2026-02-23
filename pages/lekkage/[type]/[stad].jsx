import Head from 'next/head'
import Nav from '../../../components/Nav'
import { useState } from 'react'
import { steden, lekkageTypes, getSted, getType } from '../../../data'

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

const reviews = [
  { naam: 'Martijn V.', stad: 'Amsterdam', tekst: 'Binnen een uur was het probleem gevonden en opgelost. Vakkundig werk voor een eerlijke prijs.', datum: '2 weken geleden' },
  { naam: 'Sandra K.', stad: 'Rotterdam', tekst: 'Snel gereageerd op mijn melding. Nette monteur, transparante prijsopgave vooraf. Aanrader!', datum: '1 maand geleden' },
  { naam: 'Peter D.', stad: 'Utrecht', tekst: 'Al weken last van het probleem. LekkageFix vond de echte oorzaak die anderen misten.', datum: '3 weken geleden' },
]

export default function LekkageTypeStad({ type, stad }) {
  const [submitted, setSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  const title = `${type.naam} ${stad.naam} – Snel & vakkundig verholpen | LekkageFix`
  const description = `${type.naam} in ${stad.naam}? ${type.omschrijving} LekkageFix helpt snel en vakkundig in ${stad.provincie}. Bel direct voor een afspraak.`

  const faqs = [
    { v: `Hoe snel komen jullie bij een ${type.naam.toLowerCase()} in ${stad.naam}?`, a: `We streven ernaar zo snel mogelijk bij je te zijn in ${stad.naam}. Gemiddeld zijn we binnen 30 minuten ter plaatse.` },
    { v: `Wat zijn veelvoorkomende oorzaken van ${type.naam.toLowerCase()} in ${stad.naam}?`, a: `In ${stad.naam}, met name ${stad.woningtype}, zijn de meest voorkomende oorzaken: ${type.oorzaken.slice(0,3).join(', ')}.` },
    { v: 'Vergoedt mijn verzekering dit?', a: 'Plotselinge lekkages zijn bij de meeste opstalverzekeringen gedekt. Wij helpen met de documentatie voor je claim.' },
    { v: 'Wat kost een reparatie?', a: 'We werken met transparante tarieven en geven altijd een duidelijke prijsopgave voordat we beginnen.' },
    { v: 'Geven jullie garantie?', a: 'Ja — we staan achter ons werk en geven garantie op alle uitgevoerde reparaties.' },
    { v: "Werken jullie ook 's nachts?", a: 'Ja, we zijn 24 uur per dag bereikbaar, ook in het weekend en op feestdagen.' },
  ]

  const andereSteden = steden.filter(s => s.slug !== stad.slug && s.provincie === stad.provincie).slice(0, 8)
  const andereTypes = lekkageTypes.filter(t => t.slug !== type.slug)

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`https://lekkagefix.nl/lekkage/${type.slug}/${stad.slug}`} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "Service", "name": `${type.naam} ${stad.naam}`, "areaServed": { "@type": "City", "name": stad.naam }, "provider": { "@type": "LocalBusiness", "name": "LekkageFix", "telephone": "0800-1234", "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "2847" } }, "description": description },
            { "@type": "FAQPage", "mainEntity": faqs.map(f => ({ "@type": "Question", "name": f.v, "acceptedAnswer": { "@type": "Answer", "text": f.a } })) }
          ]
        })}} />
      </Head>
      <Nav activePath="/lekkage" />

      <div className="breadcrumb-bar">
        <div className="breadcrumb">
          <a href="/">Home</a><span className="breadcrumb-sep">›</span>
          <a href="/lekkage">Lekkage</a><span className="breadcrumb-sep">›</span>
          <a href={`/lekkage/${type.slug}`}>{type.naam}</a><span className="breadcrumb-sep">›</span>
          <span>{stad.naam}</span>
        </div>
      </div>

      <section className="hero">
        <div className="hero-dots" />
        <div className="hero-inner">
          <div>
            <div className="hero-badge-urgency">⚠️ {type.urgentie === 'hoog' ? 'Spoed aanbevolen' : 'Tijdig handelen'}</div>
            <span className="hero-icon">{type.icon}</span>
            <h1><em>{type.naam}</em> in<br/>{stad.naam}</h1>
            <p className="hero-sub">{stad.naam} heeft voornamelijk {stad.woningtype}. {stad.fact}</p>
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
            <div className="form-title">{type.naam} in {stad.naam}</div>
            <div className="form-sub">Gratis & vrijblijvend · we nemen snel contact op</div>
            <div className="fg"><label>Adres in {stad.naam}</label><input type="text" placeholder="Straat + huisnummer" /></div>
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

      <div className="trust-bar">
        <div className="trust-inner">
          <div className="ti-item"><span className="ti-check">✓</span><span>Gemiddeld <strong>30 min</strong> ter plaatse</span></div>
          <div className="ti-item"><span className="ti-check">✓</span><span><strong>Garantie</strong> op al het werk</span></div>
          <div className="ti-item"><span className="ti-check">✓</span><span><strong>Erkend</strong> door verzekeraars</span></div>
          <div className="ti-item"><span className="ti-check">✓</span><span><strong>Transparante</strong> prijzen</span></div>
          <div className="ti-item"><span className="ti-check">✓</span><span><strong>24/7</strong> bereikbaar</span></div>
        </div>
      </div>

      <section className="section">
        <div className="section-inner">
          <div style={{display:'grid',gridTemplateColumns:'1.2fr 1fr',gap:'3.5rem',alignItems:'start'}}>
            <div>
              <div className="eyebrow">{type.naam} in {stad.naam}</div>
              <h2><em>{type.naam}</em> in {stad.naam} — wat je moet weten</h2>
              <p style={{color:'var(--muted)',fontSize:'0.92rem',lineHeight:'1.85',marginTop:'1.25rem',marginBottom:'1rem'}}>{stad.naam} heeft voornamelijk {stad.woningtype}. {stad.fact}</p>
              <p style={{color:'var(--muted)',fontSize:'0.92rem',lineHeight:'1.85',marginBottom:'1rem'}}>{type.intro}</p>
              <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:'0.55rem',marginTop:'1rem'}}>
                {[`Snelle inzet van ervaren vakmensen in ${stad.naam}`,`Lokale kennis van ${stad.woningtype}`,'Transparante prijsopgave vooraf','Erkend door verzekeraars — wij helpen met je claim','Garantie op uitgevoerd werk'].map((item,i) => (
                  <li key={i} style={{display:'flex',alignItems:'flex-start',gap:'0.7rem',fontSize:'0.85rem',color:'var(--muted)',lineHeight:1.5}}>
                    <span style={{width:'18px',height:'18px',background:'var(--green)',color:'white',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.6rem',fontWeight:800,flexShrink:0,marginTop:'0.1rem'}}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="eyebrow">Oorzaken</div>
              <h2 style={{fontSize:'1.3rem',marginBottom:'1rem'}}>Veelvoorkomende oorzaken</h2>
              <div style={{display:'flex',flexDirection:'column',gap:'0.6rem'}}>
                {type.oorzaken.map((o, i) => (
                  <div key={i} style={{display:'flex',alignItems:'flex-start',gap:'0.85rem',background:'white',border:'1.5px solid var(--border)',borderRadius:'10px',padding:'1rem 1.1rem'}}>
                    <div style={{width:'28px',height:'28px',background:'var(--green3)',color:'var(--green-dark)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.72rem',fontWeight:800,flexShrink:0}}>{i+1}</div>
                    <p style={{fontSize:'0.83rem',color:'var(--muted)',lineHeight:1.5}}>{o}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="section-inner">
          <div className="sec-head-center">
            <div className="eyebrow">Werkwijze</div>
            <h2>Van melding tot <em>oplossing</em></h2>
            <p className="sec-sub">Helder en transparant — zo pakken we een {type.naam.toLowerCase()} aan in {stad.naam}.</p>
          </div>
          <div className="steps">
            <div className="step"><div className="step-num">1</div><h3>Melding</h3><p>Bel of stuur een aanvraag. We bespreken het probleem en plannen een afspraak in {stad.naam}.</p></div>
            <div className="step"><div className="step-num">2</div><h3>Vakman onderweg</h3><p>De dichtstbijzijnde monteur rijdt naar je toe. Gemiddeld binnen 30 minuten.</p></div>
            <div className="step"><div className="step-num">3</div><h3>Inspectie & offerte</h3><p>Grondige inspectie en transparante prijsopgave. Jij beslist voordat we beginnen.</p></div>
            <div className="step"><div className="step-num">4</div><h3>Opgelost</h3><p>Vakkundige reparatie met garantie op het werk. Netjes opgeruimd achtergelaten.</p></div>
          </div>
        </div>
      </section>

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

      <section className="section section-alt">
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

      <section className="section">
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
              <a href={`/lekkage/${type.slug}`} className="stad-a" style={{color:'var(--green)',fontWeight:600}}>Alle steden →</a>
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

      <div className="bottom-cta">
        <div className="eyebrow" style={{color:'#a8e6c0'}}>{type.naam} in {stad.naam}</div>
        <h2 style={{color:'white'}}>{type.naam} in {stad.naam}? Wacht niet te lang.</h2>
        <p>Hoe eerder je belt, hoe kleiner de schade. Onze vakmensen staan voor je klaar.</p>
        <div className="cta-btns">
          <a href="tel:0800-1234" className="btn-call">📞 Bel nu: 0800-1234</a>
          <a href="#offerte" className="btn-white-ghost">Offerte aanvragen</a>
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
            <h4>{stad.provincie}</h4>
            {andereSteden.slice(0,4).map(s => <a key={s.slug} href={`/lekkage/${type.slug}/${s.slug}`}>{s.naam}</a>)}
            <a href={`/lekkage/${type.slug}`}>Alle steden →</a>
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
          <p>© 2025 LekkageFix · KvK 89586557 · {type.naam} {stad.naam} · <a href="#">Privacy</a> · <a href="#">Voorwaarden</a></p>
          <div className="cert-badges"><span className="cert">VCA ✓</span><span className="cert">ISO 9001</span><span className="cert">Erkend verzekeraar</span></div>
        </div>
      </footer>

      <a href="tel:0800-1234" className="mobile-cta">📞 Bel nu: 0800-1234 (24/7 bereikbaar)</a>
    </>
  )
}
