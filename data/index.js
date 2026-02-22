
import Head from 'next/head'
import { useState } from 'react'
import '../styles/global.css'

const steden = [
  { naam: 'Amsterdam', slug: 'amsterdam', prov: 'Noord-Holland', tags: ['Daklekkage','Loodgieter','Riool'] },
  { naam: 'Rotterdam', slug: 'rotterdam', prov: 'Zuid-Holland', tags: ['Daklekkage','Loodgieter','Vocht'] },
  { naam: 'Den Haag', slug: 'den-haag', prov: 'Zuid-Holland', tags: ['Daklekkage','Riool','Vocht'] },
  { naam: 'Utrecht', slug: 'utrecht', prov: 'Utrecht', tags: ['Daklekkage','Loodgieter','Riool'] },
  { naam: 'Eindhoven', slug: 'eindhoven', prov: 'Noord-Brabant', tags: ['Daklekkage','Loodgieter'] },
  { naam: 'Groningen', slug: 'groningen', prov: 'Groningen', tags: ['Daklekkage','Vocht'] },
  { naam: 'Tilburg', slug: 'tilburg', prov: 'Noord-Brabant', tags: ['Loodgieter','Riool'] },
  { naam: 'Breda', slug: 'breda', prov: 'Noord-Brabant', tags: ['Daklekkage','Riool'] },
]

const faqs = [
  { v: 'Hoe snel komen jullie bij een lekkage?', a: 'We streven ernaar zo snel mogelijk bij je te zijn. Gemiddeld zijn we binnen 30 minuten ter plaatse. Bel ons voor een actuele inschatting.' },
  { v: 'Wat kost een bezoek?', a: 'We werken met transparante tarieven. Je ontvangt altijd een duidelijke prijsopgave voordat we aan het werk gaan. Geen verborgen kosten.' },
  { v: 'Vergoedt de verzekering de lekkage?', a: 'Bij de meeste opstalverzekeringen zijn plotselinge lekkages gedekt. Wij zijn erkend door alle grote verzekeraars en helpen je met de benodigde documentatie.' },
  { v: 'Geven jullie garantie op de reparatie?', a: 'We staan achter ons werk en geven garantie op alle uitgevoerde reparaties. Mocht er iets niet naar tevredenheid zijn, lossen we dat netjes op.' },
  { v: 'Werken jullie ook buiten kantooruren?', a: 'Ja — we zijn 24 uur per dag, 7 dagen per week bereikbaar. Ook in de nacht, het weekend en op feestdagen.' },
  { v: 'In welke steden zijn jullie actief?', a: 'We werken door heel Nederland. Bekijk ons complete steden-overzicht of bel ons om te vragen of we in jouw regio actief zijn.' },
]

const diensten = [
  { icon:'🏠', title:'Daklekkage', slug:'dak', desc:'Waterindringing via plat dak, schuin dak, pannendak of dakkapel. Direct inspecteren en repareren voordat de schade groter wordt.' },
  { icon:'🔧', title:'Waterleiding', slug:'waterleiding', desc:'Gesprongen waterleiding, lekkende kraan, lage waterdruk of defecte boiler. Snel een ervaren loodgieter aan de deur.' },
  { icon:'🚰', title:'Rioollekkage', slug:'riool', desc:'Verstopt of lekkend riool? Camera-inspectie zonder sloopwerk. We vinden de oorzaak en repareren duurzaam.' },
  { icon:'💧', title:'Vochtproblemen', slug:'vocht', desc:'Schimmel, condensatie of optrekkend vocht? We zoeken de bron, niet alleen het symptoom. Blijvende oplossing.' },
]

export default function Homepage() {
  const [openFaq, setOpenFaq] = useState(null)
  const [submitted, setSubmitted] = useState(false)

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
      <nav>
        <a href="/" className="logo"><span className="logo-icon">💧</span>Lekkage<b>Fix</b></a>
        <div className="nav-right">
          <a href="#diensten" className="nav-link">Diensten</a>
          <a href="#steden" className="nav-link">Steden</a>
          <a href="/blog" className="nav-link">Blog</a>
          <a href="tel:0800-1234" className="nav-phone">📞 0800-1234</a>
        </div>
      </nav>

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

      {/* DIENSTEN */}
      <section className="section" id="diensten">
        <div className="section-inner">
          <div className="sec-head">
            <div className="eyebrow">Specialisaties</div>
            <h2>Elk type lekkage <em>opgelost</em></h2>
            <p className="sec-sub">Van noodgeval midden in de nacht tot geplande reparatie — voor elk probleem hebben we een oplossing.</p>
          </div>
          <div className="svc-grid">
            {diensten.map(s => (
              <a key={s.slug} href={`/lekkage/${s.slug}`} className="svc">
                <div className="svc-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <div className="svc-cta">Bekijk alle steden →</div>
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
            <h2>Zo pakken we het aan</h2>
          </div>
          <div className="steps">
            {[
              { n:'1', t:'Bel of stuur een aanvraag', p:'Direct contact, geen wachtrij. We nemen zo snel mogelijk contact op.' },
              { n:'2', t:'Vakman onderweg', p:'De dichtstbijzijnde monteur rijdt naar je toe. Gemiddeld binnen 30 minuten.' },
              { n:'3', t:'Transparante offerte', p:'Inspectie en heldere prijsopgave. Geen verborgen kosten, geen verrassingen.' },
              { n:'4', t:'Probleem opgelost', p:'Vakkundige reparatie met garantie op het werk. Netjes opgeruimd achtergelaten.' },
            ].map(s => (
              <div key={s.n} className="step"><div className="step-num">{s.n}</div><h3>{s.t}</h3><p>{s.p}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* STEDEN */}
      <section className="section" id="steden">
        <div className="section-inner">
          <div className="sec-head">
            <div className="eyebrow">Werkgebied</div>
            <h2>Actief in <em>jouw stad</em></h2>
            <p className="sec-sub">We werken door heel Nederland. Klik op jouw stad voor specifieke informatie.</p>
          </div>
          <div className="cities-grid">
            {steden.map(s => (
              <a key={s.slug} href={`/lekdetectie/${s.slug}`} className="city-card">
                <div className="city-name">{s.naam}</div>
                <div className="city-prov">📍 {s.prov}</div>
                <div className="city-tags">{s.tags.map(t => <span key={t} className="city-tag">{t}</span>)}</div>
                <div className="city-arrow">Bekijk {s.naam} →</div>
              </a>
            ))}
          </div>
          <div className="cities-cta">
            <div className="cities-cta-left"><h3>Jouw stad er niet bij?</h3><p>We zijn actief in 500+ steden en plaatsen door heel Nederland.</p></div>
            <div className="cities-counts">
              <div className="count-item"><div className="count-num">500<sup>+</sup></div><div className="count-label">Steden</div></div>
              <div className="count-item"><div className="count-num">12</div><div className="count-label">Provincies</div></div>
              <div className="count-item"><div className="count-num">24<sup>/7</sup></div><div className="count-label">Bereikbaar</div></div>
            </div>
            <a href="/alle-steden" className="btn-all">Alle steden bekijken →</a>
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
            {diensten.map(d => <a key={d.slug} href={`/lekkage/${d.slug}`}>{d.title}</a>)}
          </div>
          <div className="footer-col">
            <h4>Steden</h4>
            {steden.slice(0,4).map(s => <a key={s.slug} href={`/lekdetectie/${s.slug}`}>{s.naam}</a>)}
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
