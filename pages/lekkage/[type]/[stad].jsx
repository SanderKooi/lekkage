import Head from 'next/head'
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

export default function LekkageTypeStad({ type, stad }) {
  const [submitted, setSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  const title = `${type.naam} ${stad.naam} – Snel & vakkundig verholpen | LekkageFix`
  const description = `${type.naam} in ${stad.naam}? ${type.omschrijving} LekkageFix helpt snel en vakkundig in ${stad.provincie}. Bel direct voor een afspraak.`

  const faqs = [
    { v: `Hoe snel komen jullie bij een ${type.naam.toLowerCase()} in ${stad.naam}?`, a: `We streven ernaar zo snel mogelijk bij je te zijn in ${stad.naam} en omgeving. Gemiddeld zijn we binnen 30 minuten ter plaatse. Bel ons voor een actuele inschatting.` },
    { v: `Wat zijn veelvoorkomende oorzaken van ${type.naam.toLowerCase()} in ${stad.naam}?`, a: `In ${stad.naam}, met name ${stad.woningtype}, zijn de meest voorkomende oorzaken: ${type.oorzaken.slice(0,3).join(', ')}.` },
    { v: 'Vergoedt mijn verzekering dit?', a: 'Plotselinge lekkages zijn bij de meeste opstalverzekeringen gedekt. Wij zijn erkend door alle grote verzekeraars en helpen met de documentatie voor je claim.' },
    { v: 'Wat kost een reparatie?', a: 'We werken met transparante tarieven en geven altijd een duidelijke prijsopgave voordat we beginnen — geen verborgen kosten.' },
  ]

  const andereSteden = steden.filter(s => s.slug !== stad.slug && s.provincie === stad.provincie).slice(0, 8)
  const andereTypes = lekkageTypes.filter(t => t.slug !== type.slug)

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`https://lekkagefix.nl/lekkage/${type.slug}/${stad.slug}`} />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": `${type.naam} ${stad.naam}`,
          "areaServed": { "@type": "City", "name": stad.naam },
          "provider": { "@type": "LocalBusiness", "name": "LekkageFix", "telephone": "0800-1234" },
          "description": description,
        })}} />
      </Head>

      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{--bg:#f4f7f4;--green:#1a7a4a;--green2:#22924f;--green3:#e8f5ee;--green4:#d0ebda;--green-dark:#145c38;--orange:#e8520a;--text:#1a2e1a;--muted:#4a6352;--border:#ddeae2;--font:'Outfit',sans-serif;--radius:10px}
        body{font-family:var(--font);background:var(--bg);color:var(--text);line-height:1.5}
        nav{position:sticky;top:0;z-index:100;background:var(--green-dark);display:flex;align-items:center;justify-content:space-between;padding:0 clamp(1rem,4vw,3rem);height:66px;box-shadow:0 2px 16px rgba(20,92,56,0.3)}
        .logo{font-size:1.4rem;font-weight:800;color:white;text-decoration:none;display:flex;align-items:center;gap:0.4rem}
        .logo-icon{background:white;color:var(--green-dark);width:28px;height:28px;border-radius:6px;display:flex;align-items:center;justify-content:center}
        .logo b{color:#a8e6c0}
        .nav-right{display:flex;align-items:center;gap:1.5rem}
        .nav-link{color:rgba(255,255,255,0.75);font-size:0.88rem;font-weight:500;text-decoration:none}
        .nav-link:hover{color:white}
        .nav-phone{background:var(--orange);color:white;padding:0.5rem 1.2rem;border-radius:var(--radius);font-weight:700;font-size:0.9rem;text-decoration:none}
        .breadcrumb{max-width:1200px;margin:0 auto;padding:1rem clamp(1rem,4vw,3rem);font-size:0.8rem;color:var(--muted);display:flex;gap:0.5rem;flex-wrap:wrap}
        .breadcrumb a{color:var(--green);text-decoration:none}
        .hero{background:linear-gradient(150deg,var(--green-dark),var(--green));padding:clamp(2.5rem,5vw,4.5rem) clamp(1rem,5vw,3rem);position:relative;overflow:hidden}
        .hero::after{content:'';position:absolute;bottom:-2px;left:0;right:0;height:50px;background:var(--bg);clip-path:ellipse(55% 100% at 50% 100%)}
        .hero-inner{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 400px;gap:3.5rem;align-items:start;position:relative;z-index:1}
        .hero-labels{display:flex;gap:0.5rem;flex-wrap:wrap;margin-bottom:1rem}
        .label{display:inline-flex;align-items:center;gap:0.4rem;padding:0.3rem 0.85rem;border-radius:100px;font-size:0.72rem;font-weight:600;text-transform:uppercase;letter-spacing:0.04em}
        .label-city{background:rgba(168,230,192,0.2);border:1px solid rgba(168,230,192,0.35);color:#a8e6c0}
        .label-urgency{background:rgba(232,82,10,0.2);border:1px solid rgba(232,82,10,0.35);color:#ffb494}
        .hero h1{font-size:clamp(1.9rem,3.8vw,3rem);font-weight:900;line-height:1.1;letter-spacing:-0.03em;color:white;margin-bottom:1rem}
        .hero h1 em{font-style:normal;color:#a8e6c0}
        .hero-sub{color:rgba(255,255,255,0.8);font-size:0.97rem;line-height:1.75;margin-bottom:1.25rem;max-width:480px}
        .hero-local{background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.15);border-radius:10px;padding:0.9rem 1.1rem;margin-bottom:1.5rem;font-size:0.83rem;color:rgba(255,255,255,0.85);line-height:1.6}
        .hero-local strong{color:#a8e6c0}
        .hero-actions{display:flex;gap:0.75rem;flex-wrap:wrap}
        .btn-call{display:inline-flex;align-items:center;gap:0.5rem;background:var(--orange);color:white;padding:0.85rem 1.6rem;border-radius:var(--radius);font-weight:700;font-size:0.95rem;text-decoration:none;box-shadow:0 4px 16px rgba(232,82,10,0.35)}
        .btn-ghost{display:inline-flex;align-items:center;gap:0.5rem;background:rgba(255,255,255,0.12);color:white;padding:0.85rem 1.6rem;border-radius:var(--radius);font-weight:600;font-size:0.95rem;border:1px solid rgba(255,255,255,0.25);text-decoration:none}
        .form-card{background:white;border-radius:16px;padding:1.75rem;box-shadow:0 20px 50px rgba(0,0,0,0.18);position:relative;overflow:hidden}
        .form-card::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,var(--green),var(--orange))}
        .form-card h2{font-size:1.05rem;font-weight:700;color:var(--text);margin-bottom:0.15rem}
        .form-card p{font-size:0.78rem;color:var(--muted);margin-bottom:1.1rem}
        .fg{margin-bottom:0.7rem}
        .fg label{display:block;font-size:0.72rem;color:var(--muted);margin-bottom:0.25rem;font-weight:600}
        .fg input,.fg select,.fg textarea{width:100%;background:var(--bg);border:1.5px solid var(--border);border-radius:8px;padding:0.6rem 0.85rem;color:var(--text);font-family:var(--font);font-size:0.88rem;outline:none;transition:border-color 0.2s}
        .fg input:focus,.fg select:focus,.fg textarea:focus{border-color:var(--green);background:white}
        .fg textarea{resize:vertical;min-height:55px}
        .form-row{display:grid;grid-template-columns:1fr 1fr;gap:0.65rem}
        .btn-form{width:100%;background:var(--green);color:white;padding:0.85rem;border-radius:var(--radius);font-weight:700;font-size:0.9rem;border:none;cursor:pointer;font-family:var(--font);transition:all 0.2s}
        .btn-form.ok{background:#15803d}
        .section{padding:4rem clamp(1rem,5vw,3rem)}
        .section-inner{max-width:1200px;margin:0 auto}
        .section-alt{background:var(--green3);border-top:1px solid var(--border);border-bottom:1px solid var(--border)}
        .eyebrow{font-size:0.7rem;color:var(--green);font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.4rem}
        h2{font-size:clamp(1.6rem,2.8vw,2.2rem);font-weight:800;letter-spacing:-0.03em;line-height:1.2;color:var(--text)}
        h2 em{font-style:normal;color:var(--green)}
        .sec-sub{color:var(--muted);margin-top:0.5rem;font-size:0.9rem;line-height:1.7}
        .content-grid{display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:start}
        .content-grid h2{margin-bottom:1rem}
        .content-grid p{color:var(--muted);font-size:0.88rem;line-height:1.8;margin-bottom:0.85rem}
        .check-list{list-style:none;display:flex;flex-direction:column;gap:0.55rem;margin-top:0.75rem}
        .check-list li{display:flex;align-items:flex-start;gap:0.7rem;font-size:0.85rem;color:var(--muted);line-height:1.5}
        .check-list li::before{content:'✓';width:18px;height:18px;background:var(--green);color:white;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.6rem;font-weight:800;flex-shrink:0;margin-top:0.1rem}
        .oorzaken-list{display:flex;flex-direction:column;gap:0.6rem}
        .oorzaak-item{display:flex;align-items:flex-start;gap:0.85rem;background:white;border:1.5px solid var(--border);border-radius:10px;padding:1rem 1.1rem}
        .oorzaak-num{width:28px;height:28px;background:var(--green3);color:var(--green-dark);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.72rem;font-weight:800;flex-shrink:0}
        .oorzaak-item p{font-size:0.83rem;color:var(--muted);line-height:1.5}
        .related-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(175px,1fr));gap:0.65rem}
        .related-a{display:flex;align-items:center;justify-content:space-between;background:white;border:1.5px solid var(--border);border-radius:10px;padding:0.75rem 1rem;color:var(--text);text-decoration:none;font-size:0.83rem;font-weight:500;transition:all 0.2s}
        .related-a:hover{border-color:var(--green);color:var(--green-dark);background:var(--green3)}
        .type-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(175px,1fr));gap:0.65rem}
        .type-a{display:flex;align-items:center;gap:0.65rem;background:white;border:1.5px solid var(--border);border-radius:10px;padding:0.75rem 1rem;color:var(--muted);text-decoration:none;font-size:0.83rem;font-weight:500;transition:all 0.2s}
        .type-a:hover{border-color:var(--green);color:var(--green-dark);background:var(--green3)}
        .faq-grid{display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;max-width:920px;margin:0 auto}
        .faq-item{background:white;border:1.5px solid var(--border);border-radius:12px;overflow:hidden}
        .faq-q{display:flex;justify-content:space-between;align-items:center;gap:1rem;padding:1rem 1.25rem;cursor:pointer;font-weight:600;font-size:0.88rem;color:var(--text)}
        .faq-q:hover,.faq-open .faq-q{color:var(--green)}
        .faq-arrow{font-size:0.7rem;transition:transform 0.2s;color:var(--muted);flex-shrink:0}
        .faq-open .faq-arrow{transform:rotate(180deg)}
        .faq-a{display:none;padding:0 1.25rem 1rem;color:var(--muted);font-size:0.83rem;line-height:1.75;border-top:1px solid var(--border)}
        .faq-open .faq-a{display:block}
        .bottom-cta{background:linear-gradient(135deg,var(--green-dark),var(--green));padding:4rem clamp(1rem,5vw,3rem);text-align:center}
        .bottom-cta h2{color:white;margin-bottom:0.65rem}
        .bottom-cta p{color:rgba(255,255,255,0.75);margin-bottom:2rem}
        .cta-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap}
        .btn-white-ghost{display:inline-flex;align-items:center;gap:0.5rem;background:rgba(255,255,255,0.12);color:white;padding:0.85rem 1.6rem;border-radius:var(--radius);font-weight:600;border:1px solid rgba(255,255,255,0.3);text-decoration:none}
        footer{background:var(--green-dark);padding:2.5rem clamp(1rem,5vw,3rem) 1.5rem}
        .footer-inner{max-width:1200px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;padding-bottom:1.5rem;margin-bottom:1.5rem;border-bottom:1px solid rgba(255,255,255,0.1)}
        .footer-logo{font-size:1.2rem;font-weight:800;color:white}
        .footer-logo b{color:#a8e6c0}
        .footer-links{display:flex;gap:1.5rem;flex-wrap:wrap}
        .footer-links a{color:rgba(255,255,255,0.55);font-size:0.82rem;text-decoration:none}
        .footer-links a:hover{color:white}
        .footer-bottom p{color:rgba(255,255,255,0.3);font-size:0.72rem}
        .footer-bottom a{color:rgba(255,255,255,0.3);text-decoration:none}
        .mobile-cta{display:none;position:fixed;bottom:0;left:0;right:0;z-index:99;background:var(--orange);padding:0.9rem 1.5rem;align-items:center;justify-content:center;font-weight:700;color:white;text-decoration:none;font-size:0.9rem}
        @media(max-width:900px){.hero-inner{grid-template-columns:1fr}.content-grid{grid-template-columns:1fr}.faq-grid{grid-template-columns:1fr}.nav-link{display:none}}
        @media(max-width:600px){.form-row{grid-template-columns:1fr}.mobile-cta{display:flex}body{padding-bottom:56px}}
      `}</style>

      <nav>
        <a href="/" className="logo"><span className="logo-icon">💧</span>Lekkage<b>Fix</b></a>
        <div className="nav-right">
          <a href="/lekdetectie" className="nav-link">Lekdetectie</a>
          <a href="/lekkage" className="nav-link">Lekkage</a>
          <a href="/blog" className="nav-link">Blog</a>
          <a href="tel:0800-1234" className="nav-phone">📞 0800-1234</a>
        </div>
      </nav>

      <div className="breadcrumb">
        <a href="/">Home</a> ›
        <a href="/lekkage">Lekkage</a> ›
        <a href={`/lekkage/${type.slug}`}>{type.naam}</a> ›
        {stad.naam}
      </div>

      <section className="hero">
        <div className="hero-inner">
          <div>
            <div className="hero-labels">
              <span className="label label-city">📍 {stad.naam}</span>
              <span className="label label-urgency">⚠️ {type.urgentie === 'hoog' ? 'Spoed aanbevolen' : 'Tijdig handelen'}</span>
            </div>
            <h1>{type.icon} <em>{type.naam}</em><br/>in {stad.naam}</h1>
            <p className="hero-sub">{type.omschrijving} Onze vakmensen kennen de specifieke situatie in {stad.naam} en komen snel ter plaatse.</p>
            <div className="hero-local"><strong>📌 {stad.naam}:</strong> {stad.fact}</div>
            <div className="hero-actions">
              <a href="tel:0800-1234" className="btn-call">📞 Bel direct: 0800-1234</a>
              <a href="#offerte" className="btn-ghost">Offerte aanvragen →</a>
            </div>
          </div>
          <div className="form-card" id="offerte">
            <h2>{type.naam} in {stad.naam}</h2>
            <p>Gratis & vrijblijvend · snelle reactie</p>
            <div className="form-row">
              <div className="fg"><label>Naam</label><input type="text" placeholder="Jan de Vries" /></div>
              <div className="fg"><label>Telefoon</label><input type="tel" placeholder="06-12345678" /></div>
            </div>
            <div className="fg"><label>Adres in {stad.naam}</label><input type="text" placeholder="Straat + huisnummer" /></div>
            <div className="fg"><label>Beschrijving</label><textarea placeholder={`Beschrijf de ${type.naam.toLowerCase()} kort...`} /></div>
            <button className={`btn-form${submitted ? ' ok' : ''}`} onClick={() => setSubmitted(true)}>
              {submitted ? '✓ Aanvraag ontvangen!' : 'Stuur aanvraag →'}
            </button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="content-grid">
            <div>
              <div className="eyebrow">{type.naam} in {stad.naam}</div>
              <h2><em>{type.naam}</em> in {stad.naam} — wat je moet weten</h2>
              <p>{stad.naam} heeft voornamelijk {stad.woningtype}. {stad.fact}</p>
              <p>{type.intro}</p>
              <ul className="check-list">
                <li>Snelle inzet van ervaren vakmensen in {stad.naam}</li>
                <li>Lokale kennis van {stad.woningtype}</li>
                <li>Transparante prijsopgave vooraf</li>
                <li>Erkend door verzekeraars — wij helpen met je claim</li>
                <li>Garantie op uitgevoerd werk</li>
              </ul>
            </div>
            <div>
              <div className="eyebrow">Oorzaken</div>
              <h2 style={{fontSize:'1.3rem',marginBottom:'1rem'}}>Veelvoorkomende oorzaken</h2>
              <div className="oorzaken-list">
                {type.oorzaken.map((o, i) => (
                  <div key={i} className="oorzaak-item">
                    <div className="oorzaak-num">{i+1}</div>
                    <p>{o}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="section-inner">
          <div style={{textAlign:'center',marginBottom:'2rem'}}>
            <div className="eyebrow">FAQ</div>
            <h2>{type.naam} in <em>{stad.naam}</em></h2>
          </div>
          <div className="faq-grid">
            {faqs.map((f,i) => (
              <div key={i} className={`faq-item${openFaq===i?' faq-open':''}`}>
                <div className="faq-q" onClick={() => setOpenFaq(openFaq===i?null:i)}>
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
            <div className="related-grid">
              {andereSteden.map(s => (
                <a key={s.slug} href={`/lekkage/${type.slug}/${s.slug}`} className="related-a">
                  📍 {s.naam} <span style={{color:'var(--green)',fontSize:'0.75rem'}}>→</span>
                </a>
              ))}
              <a href={`/lekkage/${type.slug}`} className="related-a" style={{color:'var(--green)',fontWeight:600}}>
                Alle steden →
              </a>
            </div>
          </div>
          <div>
            <div className="eyebrow">Andere diensten in {stad.naam}</div>
            <h2 style={{fontSize:'1.3rem',marginBottom:'1.25rem'}}>Meer <em>lekkageproblemen</em></h2>
            <div className="type-grid">
              {andereTypes.map(t => (
                <a key={t.slug} href={`/lekkage/${t.slug}/${stad.slug}`} className="type-a">
                  {t.icon} {t.naam}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="bottom-cta">
        <h2 style={{color:'white'}}>{type.naam} in {stad.naam}?</h2>
        <p>Hoe eerder je belt, hoe kleiner de schade. Onze vakmensen staan klaar.</p>
        <div className="cta-btns">
          <a href="tel:0800-1234" className="btn-call">📞 Bel: 0800-1234</a>
          <a href="#offerte" className="btn-white-ghost">Offerte aanvragen</a>
        </div>
      </div>

      <footer>
        <div className="footer-inner">
          <div className="footer-logo">Lekkage<b>Fix</b></div>
          <div className="footer-links">
            <a href="/">Home</a><a href="/lekdetectie">Lekdetectie</a><a href="/lekkage">Lekkage</a><a href="/blog">Blog</a><a href="tel:0800-1234">0800-1234</a>
          </div>
        </div>
        <div className="footer-bottom" style={{maxWidth:'1200px',margin:'0 auto'}}>
          <p>© 2025 LekkageFix · KvK 89586557 · {type.naam} {stad.naam} · <a href="/privacy">Privacy</a></p>
        </div>
      </footer>

      <a href="tel:0800-1234" className="mobile-cta">📞 Bel nu: 0800-1234</a>
    </>
  )
}
