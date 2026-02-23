import Head from 'next/head'
import Nav from '../../components/Nav'
import { useState } from 'react'
import { steden, getSted } from '../../data'

export async function getStaticPaths() {
  return {
    paths: steden.map(s => ({ params: { stad: s.slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const stad = getSted(params.stad)
  if (!stad) return { notFound: true }
  return { props: { stad } }
}

const reviews = [
  { naam: 'Martijn V.', stad: 'Amsterdam', tekst: 'Binnen een uur was het probleem gevonden en opgelost. Vakkundig werk voor een eerlijke prijs.', datum: '2 weken geleden' },
  { naam: 'Sandra K.', stad: 'Rotterdam', tekst: 'Snel gereageerd op mijn melding. Nette monteur, transparante prijsopgave vooraf. Aanrader!', datum: '1 maand geleden' },
  { naam: 'Peter D.', stad: 'Utrecht', tekst: 'Al weken last van het probleem. LekkageFix vond de echte oorzaak die anderen misten.', datum: '3 weken geleden' },
]

export default function LekdetectieStad({ stad }) {
  const [submitted, setSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  const title = `Lekdetectie ${stad.naam} – Lek opsporen zonder sloopwerk | LekkageFix`
  const description = `Lekdetectie in ${stad.naam}? Wij vinden de exacte locatie van uw lekkage zonder hak- en breekwerk. Snel, nauwkeurig en erkend. Bel direct.`

  const faqs = [
    { v: `Hoe werkt lekdetectie in ${stad.naam}?`, a: `We gebruiken geavanceerde detectietechnieken zoals thermische camera's, akoestische detectie en tracer gas om de exacte locatie van een lekkage te vinden — zonder sloopwerk.` },
    { v: 'Hoe snel kunnen jullie komen?', a: `We werken door heel ${stad.provincie} en proberen zo snel mogelijk bij je te zijn. Gemiddeld zijn we binnen 30 minuten ter plaatse.` },
    { v: 'Wat kost lekdetectie?', a: 'We werken met transparante tarieven. Je ontvangt altijd een duidelijke prijsopgave voordat we beginnen.' },
    { v: 'Vergoedt de verzekering lekdetectie?', a: 'Bij veel opstalverzekeringen zijn de kosten voor lekdetectie gedekt als onderdeel van de schademelding. Wij helpen je met de benodigde documentatie.' },
    { v: 'Geven jullie garantie?', a: 'Ja — we staan achter ons werk en geven garantie op alle uitgevoerde reparaties.' },
    { v: "Werken jullie ook 's nachts?", a: 'Ja, we zijn 24 uur per dag bereikbaar, ook in het weekend en op feestdagen.' },
  ]

  const andereSteden = steden.filter(s => s.slug !== stad.slug).slice(0, 12)

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`https://lekkagefix.nl/lekdetectie/${stad.slug}`} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "Service", "name": `Lekdetectie ${stad.naam}`, "areaServed": { "@type": "City", "name": stad.naam }, "provider": { "@type": "LocalBusiness", "name": "LekkageFix", "telephone": "0800-1234", "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "2847" } }, "description": description },
            { "@type": "FAQPage", "mainEntity": faqs.map(f => ({ "@type": "Question", "name": f.v, "acceptedAnswer": { "@type": "Answer", "text": f.a } })) }
          ]
        })}} />
      </Head>
      <Nav activePath="/lekdetectie" />

      <div className="breadcrumb-bar">
        <div className="breadcrumb">
          <a href="/">Home</a><span className="breadcrumb-sep">›</span>
          <a href="/lekdetectie">Lekdetectie</a><span className="breadcrumb-sep">›</span>
          <span>{stad.naam}</span>
        </div>
      </div>

      <section className="hero">
        <div className="hero-dots" />
        <div className="hero-inner">
          <div>
            <div className="hero-badge"><span className="pulse" /> Lekdetectie zonder sloopwerk</div>
            <span className="hero-icon">🔍</span>
            <h1>Lekdetectie in<br/><em>{stad.naam}</em></h1>
            <p className="hero-sub">{stad.naam} heeft voornamelijk {stad.woningtype}. {stad.fact} Wij vinden het lek zonder hak- en breekwerk.</p>
            <div className="hero-stats">
              <div className="stat-item"><div className="stat-val">95<sup>%</sup></div><div className="stat-key">Zonder sloop</div></div>
              <div className="stat-item"><div className="stat-val">4.9<sup>★</sup></div><div className="stat-key">Beoordeling</div></div>
              <div className="stat-item"><div className="stat-val">24<sup>/7</sup></div><div className="stat-key">Bereikbaar</div></div>
              <div className="stat-item"><div className="stat-val">100<sup>%</sup></div><div className="stat-key">Erkend</div></div>
            </div>
            <div className="hero-actions">
              <a href="tel:0800-1234" className="btn-call">📞 Bel direct: 0800-1234</a>
              <a href="#offerte" className="btn-ghost">Offerte aanvragen →</a>
            </div>
          </div>
          <div className="form-card" id="offerte">
            <div className="form-title">Lekdetectie aanvragen</div>
            <div className="form-sub">{stad.naam} · gratis & vrijblijvend</div>
            <div className="fg"><label>Adres in {stad.naam}</label><input type="text" placeholder="Straat + huisnummer" /></div>
            <div className="form-row">
              <div className="fg"><label>Naam</label><input type="text" placeholder="Jan de Vries" /></div>
              <div className="fg"><label>Telefoon</label><input type="tel" placeholder="06-12345678" /></div>
            </div>
            <div className="fg"><label>Beschrijving</label><textarea placeholder="Beschrijf het probleem kort..." /></div>
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
          <div className="ti-item"><span className="ti-check">✓</span><span><strong>Geen</strong> sloopwerk nodig</span></div>
          <div className="ti-item"><span className="ti-check">✓</span><span><strong>Erkend</strong> door verzekeraars</span></div>
          <div className="ti-item"><span className="ti-check">✓</span><span><strong>Gedetailleerde</strong> rapportage</span></div>
          <div className="ti-item"><span className="ti-check">✓</span><span><strong>24/7</strong> bereikbaar</span></div>
        </div>
      </div>

      <section className="section">
        <div className="section-inner">
          <div style={{display:'grid',gridTemplateColumns:'1.2fr 1fr',gap:'3.5rem',alignItems:'start'}}>
            <div>
              <div className="eyebrow">Lekdetectie in {stad.naam}</div>
              <h2>Lek opsporen in {stad.naam} — <em>zonder sloopwerk</em></h2>
              <p style={{color:'var(--muted)',fontSize:'0.92rem',lineHeight:'1.85',marginTop:'1.25rem',marginBottom:'1rem'}}>{stad.naam} heeft voornamelijk {stad.woningtype}. {stad.fact}</p>
              <p style={{color:'var(--muted)',fontSize:'0.92rem',lineHeight:'1.85',marginBottom:'1rem'}}>Onze specialisten kennen de veelvoorkomende lekkageproblemen in {stad.provincie} en weten welke detectiemethode het meest effectief is voor het type woning in jouw buurt.</p>
              <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:'0.55rem',marginTop:'1rem'}}>
                {['Geen sloopwerk — wij vinden het lek zonder schade te maken','Erkend door alle grote verzekeraars in Nederland','Gedetailleerde rapportage voor je verzekeringsclaim',`Gecertificeerde technici met lokale kennis van ${stad.naam}`,'Transparante prijsopgave vooraf, geen verborgen kosten'].map((item,i) => (
                  <li key={i} style={{display:'flex',alignItems:'flex-start',gap:'0.7rem',fontSize:'0.85rem',color:'var(--muted)',lineHeight:1.5}}>
                    <span style={{width:'18px',height:'18px',background:'var(--green)',color:'white',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.6rem',fontWeight:800,flexShrink:0,marginTop:'0.1rem'}}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{background:'var(--green3)',border:'1.5px solid var(--green4)',borderRadius:'16px',padding:'1.75rem'}}>
              <h3 style={{fontSize:'0.88rem',fontWeight:700,color:'var(--text)',marginBottom:'1.25rem',paddingBottom:'0.75rem',borderBottom:'1px solid var(--green4)'}}>Lekdetectie in cijfers</h3>
              {[{num:'95%',label:'Van lekken gevonden zonder sloopwerk'},{num:'4.9★',label:'Gemiddelde beoordeling van onze klanten'},{num:'30min',label:`Gemiddelde responstijd in ${stad.naam}`},{num:'100%',label:'Erkend door grote verzekeraars'}].map((item,i,arr) => (
                <div key={i} style={{display:'flex',alignItems:'center',gap:'1rem',padding:'0.85rem 0',borderBottom:i<arr.length-1?'1px solid var(--green4)':'none'}}>
                  <div style={{fontSize:'1.6rem',fontWeight:900,color:'var(--green-dark)',lineHeight:1,minWidth:'70px'}}>{item.num}</div>
                  <div style={{fontWeight:600,fontSize:'0.85rem',color:'var(--text)'}}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="section-inner">
          <div className="sec-head">
            <div className="eyebrow">Detectiemethoden</div>
            <h2>Hoe we het lek <em>opsporen</em></h2>
            <p className="sec-sub">We kiezen altijd de meest geschikte methode voor jouw situatie.</p>
          </div>
          <div className="svc-grid">
            {[
              {icon:'🌡️',title:'Thermische camera',desc:'Met een warmtebeeldcamera zien we temperatuurverschillen die duiden op vochtige plekken achter muren, vloeren of plafonds.'},
              {icon:'🔊',title:'Akoestische detectie',desc:'Geavanceerde luisterapparatuur vangt het geluid op van water dat door een barst of gaatje stroomt. Zelfs leidingen op grote diepte worden gevonden.'},
              {icon:'🧪',title:'Tracergas methode',desc:'Voor moeilijk bereikbare leidingen blazen we een onschadelijk gas in de leiding. Een detector vindt de exacte locatie aan de oppervlakte.'},
            ].map(m => (
              <div key={m.title} className="svc" style={{cursor:'default'}}>
                <div className="svc-icon">{m.icon}</div>
                <h3>{m.title}</h3>
                <p>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="section-inner">
          <div className="sec-head-center">
            <div className="eyebrow">Werkwijze</div>
            <h2>Van melding tot <em>oplossing</em></h2>
            <p className="sec-sub">Helder en transparant — zo pakken we lekdetectie aan in {stad.naam}.</p>
          </div>
          <div className="steps">
            <div className="step"><div className="step-num">1</div><h3>Melding</h3><p>Bel ons of stuur een aanvraag. We bespreken het probleem en plannen een afspraak in {stad.naam}.</p></div>
            <div className="step"><div className="step-num">2</div><h3>Vakman onderweg</h3><p>Onze specialist komt met detectieapparatuur. Gemiddeld binnen 30 minuten ter plaatse.</p></div>
            <div className="step"><div className="step-num">3</div><h3>Inspectie & offerte</h3><p>We vinden de exacte locatie van het lek — zonder sloopwerk, met nauwkeurige rapportage.</p></div>
            <div className="step"><div className="step-num">4</div><h3>Opgelost</h3><p>Je ontvangt een gedetailleerd rapport met foto's en aanbevelingen voor reparatie.</p></div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
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

      <section className="section">
        <div className="section-inner">
          <div className="sec-head-center">
            <div className="eyebrow">Veelgestelde vragen</div>
            <h2>Vragen over lekdetectie in <em>{stad.naam}</em></h2>
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

      <section className="section section-alt">
        <div className="section-inner">
          <div className="sec-head">
            <div className="eyebrow">Andere steden</div>
            <h2>Lekdetectie in heel <em>Nederland</em></h2>
            <p className="sec-sub">We werken door heel {stad.provincie} en de rest van Nederland.</p>
          </div>
          <div className="steden-grid">
            {andereSteden.map(s => (
              <a key={s.slug} href={`/lekdetectie/${s.slug}`} className="stad-a">
                <span>📍 {s.naam}</span><span className="stad-arrow">→</span>
              </a>
            ))}
            <a href="/alle-steden" className="stad-a" style={{color:'var(--green)',fontWeight:600}}>Alle steden →</a>
          </div>
        </div>
      </section>

      <div className="bottom-cta">
        <div className="eyebrow" style={{color:'#a8e6c0'}}>Lekdetectie {stad.naam}</div>
        <h2 style={{color:'white'}}>Lek gevonden in {stad.naam}? Wacht niet te lang.</h2>
        <p>Hoe eerder we het lek opsporen, hoe kleiner de schade. Onze vakmensen staan klaar.</p>
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
            <a href="/lekdetectie">Lekdetectie</a>
            <a href="/lekkage/dak">Daklekkage</a>
            <a href="/lekkage/waterleiding">Waterleiding</a>
            <a href="/lekkage/riool">Rioollekkage</a>
          </div>
          <div className="footer-col">
            <h4>Steden</h4>
            {andereSteden.slice(0,4).map(s => <a key={s.slug} href={`/lekdetectie/${s.slug}`}>{s.naam}</a>)}
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
          <p>© 2025 LekkageFix · KvK 89586557 · Lekdetectie {stad.naam} · <a href="#">Privacy</a> · <a href="#">Voorwaarden</a></p>
          <div className="cert-badges"><span className="cert">VCA ✓</span><span className="cert">ISO 9001</span><span className="cert">Erkend verzekeraar</span></div>
        </div>
      </footer>

      <a href="tel:0800-1234" className="mobile-cta">📞 Bel nu: 0800-1234 (24/7 bereikbaar)</a>
    </>
  )
}
