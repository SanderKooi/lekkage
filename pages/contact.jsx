import Head from 'next/head'
import Nav from '../components/Nav'
import { useState } from 'react'

const PHONE = '0800-1234'
const PHONE_DISPLAY = '0800-1234'
const EMAIL = 'info@lekkagefix.nl'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ naam: '', telefoon: '', email: '', onderwerp: '', bericht: '' })
  const [openFaq, setOpenFaq] = useState(null)

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSubmit() {
    setSubmitted(true)
    // TODO: koppel aan backend / emailservice
    window.location.href = '/bedankt'
  }

  const schemaData = {
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
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": PHONE,
          "email": EMAIL,
          "contactType": "customer service",
          "availableLanguage": "Dutch",
          "hoursAvailable": { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"] }
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://lekkagefix.nl" },
          { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://lekkagefix.nl/contact" }
        ]
      }
    ]
  }

  return (
    <>
      <Head>
        <title>Contact – LekkageFix | 24/7 bereikbaar</title>
        <meta name="description" content="Neem contact op met LekkageFix. Bel 0800-1234 voor spoed, of stuur een bericht. 24/7 bereikbaar voor lekkages door heel Nederland." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://lekkagefix.nl/contact" />
        <meta property="og:title" content="Contact – LekkageFix" />
        <meta property="og:description" content="24/7 bereikbaar voor lekkages door heel Nederland. Bel of stuur een bericht." />
        <meta property="og:url" content="https://lekkagefix.nl/contact" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      </Head>

      <Nav activePath="/contact" />

      {/* HERO */}
      <section className="hero">
        <div className="hero-dots" />
        <div className="hero-inner">
          <div>
            <div className="hero-badge"><span className="pulse" /> 24/7 bereikbaar · heel Nederland</div>
            <h1>Neem <em>contact</em><br/>met ons op</h1>
            <p className="hero-sub">Spoed? Bel direct. Voor overige vragen kun je het formulier invullen — we reageren binnen 2 uur op werkdagen.</p>

            <div style={{display:'flex',flexDirection:'column',gap:'1rem',marginBottom:'2rem'}}>
              <a href={`tel:${PHONE}`} style={{display:'flex',alignItems:'center',gap:'1rem',background:'white',border:'1.5px solid var(--border)',borderRadius:'12px',padding:'1rem 1.25rem',textDecoration:'none',color:'var(--text)'}}>
                <div style={{width:'44px',height:'44px',background:'var(--green3)',borderRadius:'10px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.25rem',flexShrink:0}}>📞</div>
                <div>
                  <div style={{fontWeight:700,fontSize:'0.95rem'}}>{PHONE_DISPLAY}</div>
                  <div style={{fontSize:'0.78rem',color:'var(--muted)'}}>24/7 bereikbaar · ook voor spoed</div>
                </div>
                <span style={{marginLeft:'auto',color:'var(--green)',fontWeight:700,fontSize:'0.85rem'}}>Bel direct →</span>
              </a>
              <a href={`mailto:${EMAIL}`} style={{display:'flex',alignItems:'center',gap:'1rem',background:'white',border:'1.5px solid var(--border)',borderRadius:'12px',padding:'1rem 1.25rem',textDecoration:'none',color:'var(--text)'}}>
                <div style={{width:'44px',height:'44px',background:'var(--green3)',borderRadius:'10px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.25rem',flexShrink:0}}>✉️</div>
                <div>
                  <div style={{fontWeight:700,fontSize:'0.95rem'}}>{EMAIL}</div>
                  <div style={{fontSize:'0.78rem',color:'var(--muted)'}}>Reactie binnen 2 uur op werkdagen</div>
                </div>
                <span style={{marginLeft:'auto',color:'var(--green)',fontWeight:700,fontSize:'0.85rem'}}>Mail ons →</span>
              </a>
            </div>

            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.75rem'}}>
              {[
                { icon:'⏱', label:'30 min', sub:'Gemiddelde reactietijd' },
                { icon:'🌍', label:'Heel NL', sub:'Actief in alle provincies' },
                { icon:'🌙', label:'24/7', sub:'Ook \'s nachts bereikbaar' },
                { icon:'✅', label:'Gratis', sub:'Vrijblijvende offerte' },
              ].map((s, i) => (
                <div key={i} style={{background:'rgba(255,255,255,0.08)',borderRadius:'10px',padding:'0.85rem',display:'flex',alignItems:'center',gap:'0.75rem'}}>
                  <span style={{fontSize:'1.4rem'}}>{s.icon}</span>
                  <div>
                    <div style={{fontWeight:700,color:'white',fontSize:'0.9rem'}}>{s.label}</div>
                    <div style={{fontSize:'0.72rem',color:'rgba(255,255,255,0.6)'}}>{s.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CONTACT FORM */}
          <div className="form-card" id="contactform">
            <div className="form-title">Stuur een bericht</div>
            <div className="form-sub">We reageren binnen 2 uur op werkdagen</div>
            <div className="fg">
              <label>Onderwerp</label>
              <select name="onderwerp" onChange={handleChange}>
                <option value="">Kies een onderwerp</option>
                <option>Offerte aanvragen</option>
                <option>Spoedhulp lekkage</option>
                <option>Vraag over factuur</option>
                <option>Garantieclaim</option>
                <option>Overig</option>
              </select>
            </div>
            <div className="fg"><label>Plaats</label><input type="text" name="plaats" placeholder="Jouw plaats" onChange={handleChange} /></div>
            <div className="form-row">
              <div className="fg"><label>Naam</label><input type="text" name="naam" placeholder="Jan de Vries" onChange={handleChange} /></div>
              <div className="fg"><label>Telefoon</label><input type="tel" name="telefoon" placeholder="06-12345678" onChange={handleChange} /></div>
            </div>
            <div className="fg"><label>E-mail</label><input type="email" name="email" placeholder="jan@email.nl" onChange={handleChange} /></div>
            <div className="fg"><label>Bericht</label><textarea name="bericht" placeholder="Beschrijf kort jouw vraag of probleem..." onChange={handleChange} /></div>
            <button className="btn-form" onClick={handleSubmit}>Verstuur bericht →</button>
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

      {/* FAQ CONTACT */}
      <section className="section section-white">
        <div className="section-inner">
          <div className="sec-head-center">
            <div className="eyebrow">Veelgestelde vragen</div>
            <h2>Antwoord op <em>jouw vraag</em></h2>
          </div>
          <div className="faq-grid">
            {[
              { v: 'Hoe snel reageren jullie op een bericht?', a: 'Op werkdagen reageren we binnen 2 uur. Voor spoed raden we aan te bellen — we zijn 24/7 bereikbaar.' },
              { v: "Kan ik ook 's nachts bellen?", a: 'Ja. Ons noodnummer is dag en nacht bereikbaar, ook in het weekend en op feestdagen.' },
              { v: 'Hoe vraag ik een offerte aan?', a: 'Vul het contactformulier in of bel ons direct. We sturen een transparante offerte, altijd voordat we beginnen.' },
              { v: "In welke regio's zijn jullie actief?", a: 'We zijn actief door heel Nederland. Met specialisten in elke provincie zijn we snel bij je in de buurt.' },
            ].map((f, i) => (
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
        <div className="eyebrow" style={{color:'#a8e6c0'}}>Spoed?</div>
        <h2 style={{color:'white'}}>Bel direct — we zijn er altijd.</h2>
        <p>24/7 bereikbaar voor lekkages door heel Nederland.</p>
        <div className="cta-btns">
          <a href={`tel:${PHONE}`} className="btn-call">📞 Bel nu: {PHONE_DISPLAY}</a>
          <a href="#contactform" className="btn-white-ghost">Stuur een bericht →</a>
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
            <a href="/lekkage">Lekkage reparatie</a>
            <a href="/lekdetectie">Lekdetectie</a>
            <a href="/lekkage/dienst/lekkage-dak">Daklekkage</a>
            <a href="/lekkage/dienst/riool-lekkage">Rioollekkage</a>
          </div>
          <div className="footer-col">
            <h4>Bedrijf</h4>
            <a href="/over-ons">Over ons</a>
            <a href="/contact">Contact</a>
            <a href="/blog">Blog & tips</a>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <a href={`tel:${PHONE}`}>0800-1234 (24/7)</a>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <a href="/contact">Stuur een bericht</a>
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
