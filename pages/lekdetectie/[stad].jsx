
import Head from 'next/head'
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

export default function LekdetectieStad({ stad }) {
  const [submitted, setSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  const title = `Lekdetectie ${stad.naam} – Lek opsporen zonder sloopwerk`
  const description = `Lekdetectie in ${stad.naam}? Wij vinden de exacte locatie van uw lekkage zonder hak- en breekwerk. Snel, nauwkeurig en erkend. Bel direct.`

  const faqs = [
    { v: `Hoe werkt lekdetectie in ${stad.naam}?`, a: `We gebruiken geavanceerde detectietechnieken zoals thermische camera's, akoestische detectie en tracer gas om de exacte locatie van een lekkage te vinden — zonder sloopwerk.` },
    { v: 'Hoe snel kunnen jullie komen?', a: `We werken door heel ${stad.provincie} en proberen zo snel mogelijk bij je te zijn. Bel ons voor een actuele beschikbaarheid.` },
    { v: 'Wat kost lekdetectie?', a: 'We werken met transparante tarieven. Je ontvangt altijd een duidelijke prijsopgave voordat we beginnen.' },
    { v: 'Vergoedt de verzekering lekdetectie?', a: 'Bij veel opstalverzekeringen zijn de kosten voor lekdetectie gedekt als onderdeel van de schademelding. Wij helpen je met de benodigde documentatie.' },
  ]

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`https://lekkagefix.nl/lekdetectie/${stad.slug}`} />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": `Lekdetectie ${stad.naam}`,
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

        .breadcrumb{max-width:1200px;margin:0 auto;padding:1rem clamp(1rem,4vw,3rem);font-size:0.8rem;color:var(--muted);display:flex;gap:0.5rem;align-items:center}
        .breadcrumb a{color:var(--green);text-decoration:none}
        .breadcrumb a:hover{text-decoration:underline}

        .hero{background:linear-gradient(150deg,var(--green-dark),var(--green));padding:clamp(2.5rem,5vw,4rem) clamp(1rem,5vw,3rem);position:relative;overflow:hidden}
        .hero::after{content:'';position:absolute;bottom:-2px;left:0;right:0;height:50px;background:var(--bg);clip-path:ellipse(55% 100% at 50% 100%)}
        .hero-inner{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 400px;gap:3.5rem;align-items:start;position:relative;z-index:1}
        .hero-badge{display:inline-flex;align-items:center;gap:0.5rem;background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.2);color:white;padding:0.35rem 0.9rem;border-radius:100px;font-size:0.75rem;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:1rem}
        .hero h1{font-size:clamp(2rem,4vw,3.2rem);font-weight:900;line-height:1.1;letter-spacing:-0.03em;color:white;margin-bottom:1rem}
        .hero h1 em{font-style:normal;color:#a8e6c0}
        .hero-sub{color:rgba(255,255,255,0.8);font-size:1rem;line-height:1.75;margin-bottom:1.75rem;max-width:480px}
        .hero-fact{background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.15);border-radius:10px;padding:1rem 1.25rem;margin-bottom:1.75rem;font-size:0.85rem;color:rgba(255,255,255,0.85);line-height:1.6}
        .hero-fact strong{color:#a8e6c0}
        .hero-actions{display:flex;gap:0.75rem;flex-wrap:wrap}
        .btn-call{display:inline-flex;align-items:center;gap:0.5rem;background:var(--orange);color:white;padding:0.85rem 1.6rem;border-radius:var(--radius);font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.2s;box-shadow:0 4px 16px rgba(232,82,10,0.35)}
        .btn-call:hover{background:#d4480a;transform:translateY(-2px)}
        .btn-ghost{display:inline-flex;align-items:center;gap:0.5rem;background:rgba(255,255,255,0.12);color:white;padding:0.85rem 1.6rem;border-radius:var(--radius);font-weight:600;font-size:0.95rem;border:1px solid rgba(255,255,255,0.25);text-decoration:none}
        .btn-ghost:hover{background:rgba(255,255,255,0.2)}

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
        .btn-form{width:100%;background:var(--green);color:white;padding:0.85rem;border-radius:var(--radius);font-weight:700;font-size:0.9rem;border:none;cursor:pointer;font-family:var(--font);margin-top:0.2rem;transition:all 0.2s}
        .btn-form:hover{background:var(--green2)}
        .btn-form.ok{background:#15803d}
        .form-trust{display:flex;justify-content:center;gap:1rem;margin-top:0.75rem;flex-wrap:wrap}
        .form-trust span{font-size:0.7rem;color:var(--muted)}

        .section{padding:4rem clamp(1rem,5vw,3rem)}
        .section-inner{max-width:1200px;margin:0 auto}
        .section-alt{background:var(--green3);border-top:1px solid var(--border);border-bottom:1px solid var(--border)}
        .eyebrow{font-size:0.7rem;color:var(--green);font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.4rem}
        h2{font-size:clamp(1.6rem,2.8vw,2.2rem);font-weight:800;letter-spacing:-0.03em;line-height:1.2;color:var(--text)}
        h2 em{font-style:normal;color:var(--green)}
        .sec-sub{color:var(--muted);margin-top:0.5rem;font-size:0.9rem;max-width:540px;line-height:1.7}

        .method-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem}
        .method{background:white;border:1.5px solid var(--border);border-radius:14px;padding:1.5rem;transition:all 0.25s}
        .method:hover{border-color:var(--green);box-shadow:0 8px 28px rgba(26,122,74,0.1)}
        .method-icon{font-size:2rem;margin-bottom:0.75rem}
        .method h3{font-size:0.95rem;font-weight:700;color:var(--text);margin-bottom:0.4rem}
        .method p{color:var(--muted);font-size:0.82rem;line-height:1.65}

        .steps{display:grid;grid-template-columns:repeat(4,1fr);gap:1.25rem;position:relative}
        .steps::before{content:'';position:absolute;top:22px;left:calc(12.5% + 10px);right:calc(12.5% + 10px);height:2px;background:linear-gradient(90deg,var(--green),var(--orange));z-index:0}
        .step{text-align:center;position:relative;z-index:1}
        .step-num{width:44px;height:44px;border-radius:50%;background:var(--green);color:white;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:0.95rem;margin:0 auto 0.85rem;border:3px solid var(--bg);box-shadow:0 0 0 3px var(--green)}
        .step h3{font-weight:700;font-size:0.88rem;margin-bottom:0.4rem}
        .step p{color:var(--muted);font-size:0.78rem;line-height:1.6}

        .content-block{display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:start}
        .content-block h2{margin-bottom:1rem}
        .content-block p{color:var(--muted);font-size:0.9rem;line-height:1.8;margin-bottom:1rem}
        .check-list{list-style:none;display:flex;flex-direction:column;gap:0.6rem;margin-top:1rem}
        .check-list li{display:flex;align-items:flex-start;gap:0.75rem;font-size:0.88rem;color:var(--muted);line-height:1.5}
        .check-list li::before{content:'✓';width:20px;height:20px;background:var(--green);color:white;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.65rem;font-weight:800;flex-shrink:0;margin-top:0.1rem}
        .content-aside{background:var(--green3);border:1.5px solid var(--green4);border-radius:16px;padding:2rem}
        .content-aside h3{font-size:1rem;font-weight:700;color:var(--text);margin-bottom:1.25rem}
        .aside-stat{display:flex;align-items:center;gap:1rem;padding:0.85rem 0;border-bottom:1px solid var(--green4)}
        .aside-stat:last-child{border-bottom:none}
        .aside-num{font-size:1.8rem;font-weight:900;color:var(--green-dark);line-height:1;min-width:60px}
        .aside-label{font-size:0.82rem;color:var(--muted);line-height:1.4}

        .faq-grid{display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;max-width:920px;margin:0 auto}
        .faq-item{background:white;border:1.5px solid var(--border);border-radius:12px;overflow:hidden}
        .faq-q{display:flex;justify-content:space-between;align-items:center;gap:1rem;padding:1rem 1.25rem;cursor:pointer;font-weight:600;font-size:0.88rem;color:var(--text)}
        .faq-q:hover,.faq-open .faq-q{color:var(--green)}
        .faq-arrow{font-size:0.7rem;transition:transform 0.2s;color:var(--muted);flex-shrink:0}
        .faq-open .faq-arrow{transform:rotate(180deg)}
        .faq-a{display:none;padding:0 1.25rem 1rem;color:var(--muted);font-size:0.83rem;line-height:1.75;border-top:1px solid var(--border)}
        .faq-open .faq-a{display:block}

        .related-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:0.75rem}
        .related-a{display:flex;align-items:center;gap:0.6rem;background:white;border:1.5px solid var(--border);border-radius:8px;padding:0.65rem 1rem;color:var(--muted);font-size:0.82rem;font-weight:500;text-decoration:none;transition:all 0.2s}
        .related-a:hover{color:var(--green-dark);border-color:var(--green);background:var(--green3)}

        .bottom-cta{background:linear-gradient(135deg,var(--green-dark),var(--green));padding:4rem clamp(1rem,5vw,3rem);text-align:center}
        .bottom-cta h2{color:white;margin-bottom:0.65rem}
        .bottom-cta p{color:rgba(255,255,255,0.75);margin-bottom:2rem}
        .cta-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap}
        .btn-white-ghost{display:inline-flex;align-items:center;gap:0.5rem;background:rgba(255,255,255,0.12);color:white;padding:0.85rem 1.6rem;border-radius:var(--radius);font-weight:600;border:1px solid rgba(255,255,255,0.3);text-decoration:none}

        footer{background:var(--green-dark);padding:2.5rem clamp(1rem,5vw,3rem) 1.5rem}
        .footer-inner{max-width:1200px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:1.5rem;margin-bottom:1.5rem}
        .footer-logo{font-size:1.2rem;font-weight:800;color:white}
        .footer-logo b{color:#a8e6c0}
        .footer-links{display:flex;gap:1.5rem;flex-wrap:wrap}
        .footer-links a{color:rgba(255,255,255,0.55);font-size:0.82rem;text-decoration:none}
        .footer-links a:hover{color:white}
        .footer-bottom{max-width:1200px;margin:0 auto;display:flex;justify-content:space-between;flex-wrap:wrap;gap:0.5rem}
        .footer-bottom p{color:rgba(255,255,255,0.3);font-size:0.72rem}
        .footer-bottom a{color:rgba(255,255,255,0.3);text-decoration:none}

        .mobile-cta{display:none;position:fixed;bottom:0;left:0;right:0;z-index:99;background:var(--orange);padding:0.9rem 1.5rem;align-items:center;justify-content:center;font-weight:700;color:white;text-decoration:none;font-size:0.9rem}

        @media(max-width:900px){.hero-inner{grid-template-columns:1fr}.steps{grid-template-columns:1fr 1fr}.steps::before{display:none}.content-block{grid-template-columns:1fr}.method-grid{grid-template-columns:1fr 1fr}.faq-grid{grid-template-columns:1fr}.nav-link{display:none}}
        @media(max-width:600px){.form-row{grid-template-columns:1fr}.mobile-cta{display:flex}body{padding-bottom:56px}.method-grid{grid-template-columns:1fr}.steps{grid-template-columns:1fr}}
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
        <a href="/">Home</a> › <a href="/lekdetectie">Lekdetectie</a> › {stad.naam}
      </div>

      <section className="hero">
        <div className="hero-inner">
          <div>
            <div className="hero-badge">📍 {stad.provincie}</div>
            <h1>Lekdetectie<br/><em>{stad.naam}</em></h1>
            <p className="hero-sub">Lek opsporen zonder sloopwerk in {stad.naam}. Wij vinden de exacte locatie van uw lekkage met geavanceerde detectieapparatuur — snel, nauwkeurig en zonder onnodige schade.</p>
            <div className="hero-fact"><strong>📌 Lokale kennis:</strong> {stad.fact}</div>
            <div className="hero-actions">
              <a href="tel:0800-1234" className="btn-call">📞 Bel direct: 0800-1234</a>
              <a href="#offerte" className="btn-ghost">Offerte aanvragen →</a>
            </div>
          </div>
          <div className="form-card" id="offerte">
            <h2>Lekdetectie aanvragen</h2>
            <p>Gratis & vrijblijvend in {stad.naam}</p>
            <div className="fg"><label>Type probleem</label>
              <select><option>Ik weet niet waar het vandaan komt</option><option>Daklekkage</option><option>Waterleiding</option><option>Badkamer</option><option>Riool</option><option>Kelder</option></select>
            </div>
            <div className="form-row">
              <div className="fg"><label>Naam</label><input type="text" placeholder="Jan de Vries" /></div>
              <div className="fg"><label>Telefoon</label><input type="tel" placeholder="06-12345678" /></div>
            </div>
            <div className="fg"><label>Adres in {stad.naam}</label><input type="text" placeholder={`Straat + huisnummer, ${stad.naam}`} /></div>
            <div className="fg"><label>Beschrijving</label><textarea placeholder="Beschrijf het probleem kort..." /></div>
            <button className={`btn-form${submitted ? ' ok' : ''}`} onClick={() => setSubmitted(true)}>
              {submitted ? '✓ Aanvraag ontvangen!' : 'Stuur aanvraag →'}
            </button>
            <div className="form-trust"><span>🔒 Veilig</span><span>✓ Geen spam</span><span>📍 {stad.naam}</span></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div style={{marginBottom:'2.5rem'}}>
            <div className="eyebrow">Detectiemethoden</div>
            <h2>Hoe wij een lek opsporen in <em>{stad.naam}</em></h2>
            <p className="sec-sub">We gebruiken de meest geavanceerde technieken om lekken te vinden zonder onnodige sloopkosten.</p>
          </div>
          <div className="method-grid">
            <div className="method">
              <div className="method-icon">🌡️</div>
              <h3>Thermische camera</h3>
              <p>Met een warmtebeeldcamera zien we temperatuurverschillen die duiden op vochtige plekken achter muren of onder vloeren — volledig non-destructief.</p>
            </div>
            <div className="method">
              <div className="method-icon">🔊</div>
              <h3>Akoestische detectie</h3>
              <p>Geavanceerde luisterapparatuur vangt het geluid op van water dat door een barst of gaatje stroomt. Zelfs leidingen op grote diepte worden gevonden.</p>
            </div>
            <div className="method">
              <div className="method-icon">🧪</div>
              <h3>Tracergas methode</h3>
              <p>Voor moeilijk bereikbare leidingen blazen we een onschadelijk gas in de leiding. Een detector vindt de exacte locatie van het lek aan de oppervlakte.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="section-inner">
          <div style={{textAlign:'center',marginBottom:'2.5rem'}}>
            <div className="eyebrow">Werkwijze</div>
            <h2>Van aanvraag tot oplossing</h2>
          </div>
          <div className="steps">
            <div className="step"><div className="step-num">1</div><h3>Melding</h3><p>Bel ons of stuur een aanvraag. We bespreken het probleem en plannen een afspraak in {stad.naam}.</p></div>
            <div className="step"><div className="step-num">2</div><h3>Inspectie</h3><p>Onze specialist komt met detectieapparatuur en brengt de situatie in kaart.</p></div>
            <div className="step"><div className="step-num">3</div><h3>Detectie</h3><p>We vinden de exacte locatie van het lek — zonder sloopwerk, met nauwkeurige rapportage.</p></div>
            <div className="step"><div className="step-num">4</div><h3>Rapportage</h3><p>Je ontvangt een gedetailleerd rapport, inclusief foto's en aanbevelingen voor reparatie.</p></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="content-block">
            <div>
              <div className="eyebrow">Over {stad.naam}</div>
              <h2>Lekdetectie in {stad.naam} — wat je moet weten</h2>
              <p>{stad.naam} heeft voornamelijk {stad.woningtype}. {stad.fact}</p>
              <p>Onze specialisten kennen de veelvoorkomende lekkageproblemen in {stad.provincie} en weten welke detectiemethode het meest effectief is voor het type woning in jouw buurt.</p>
              <ul className="check-list">
                <li>Geen sloopwerk — wij vinden het lek zonder schade te maken</li>
                <li>Erkend door alle grote verzekeraars in Nederland</li>
                <li>Gedetailleerde rapportage voor je verzekeringsclaim</li>
                <li>Gecertificeerde technici met lokale kennis van {stad.naam}</li>
                <li>Transparante prijsopgave vooraf, geen verborgen kosten</li>
              </ul>
            </div>
            <div className="content-aside">
              <h3>Lekdetectie in cijfers</h3>
              <div className="aside-stat"><div className="aside-num">95%</div><div className="aside-label">Van lekken gevonden zonder sloopwerk</div></div>
              <div className="aside-stat"><div className="aside-num">4.9★</div><div className="aside-label">Gemiddelde beoordeling van onze klanten</div></div>
              <div className="aside-stat"><div className="aside-num">30min</div><div className="aside-label">Gemiddelde responstijd in {stad.naam}</div></div>
              <div className="aside-stat"><div className="aside-num">100%</div><div className="aside-label">Erkend door grote verzekeraars</div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="section-inner">
          <div style={{textAlign:'center',marginBottom:'2rem'}}>
            <div className="eyebrow">FAQ</div>
            <h2>Vragen over lekdetectie in {stad.naam}</h2>
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
        <div className="section-inner">
          <div style={{marginBottom:'1.75rem'}}>
            <div className="eyebrow">Andere steden</div>
            <h2>Lekdetectie in heel <em>Nederland</em></h2>
            <p className="sec-sub">We werken door heel {stad.provincie} en de rest van Nederland.</p>
          </div>
          <div className="related-grid">
            {steden.filter(s => s.slug !== stad.slug).slice(0, 12).map(s => (
              <a key={s.slug} href={`/lekdetectie/${s.slug}`} className="related-a">📍 {s.naam}</a>
            ))}
            <a href="/alle-steden" className="related-a" style={{color:'var(--green)',fontWeight:600}}>Alle steden →</a>
          </div>
        </div>
      </section>

      <div className="bottom-cta">
        <h2 style={{color:'white'}}>Lek gevonden in {stad.naam}?</h2>
        <p>Wacht niet te lang — hoe eerder we het lek opsporen, hoe kleiner de schade.</p>
        <div className="cta-btns">
          <a href="tel:0800-1234" className="btn-call">📞 Bel: 0800-1234</a>
          <a href="#offerte" className="btn-white-ghost">Offerte aanvragen</a>
        </div>
      </div>

      <footer>
        <div className="footer-inner">
          <div className="footer-logo">Lekkage<b>Fix</b></div>
          <div className="footer-links">
            <a href="/">Home</a>
            <a href="/lekdetectie">Lekdetectie</a>
            <a href="/lekkage">Lekkage</a>
            <a href="/blog">Blog</a>
            <a href="/alle-steden">Alle steden</a>
            <a href="tel:0800-1234">0800-1234</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 LekkageFix · KvK 89586557 · <a href="/privacy">Privacy</a></p>
          <p>Lekdetectie {stad.naam} · {stad.provincie}</p>
        </div>
      </footer>

      <a href="tel:0800-1234" className="mobile-cta">📞 Bel nu: 0800-1234</a>
    </>
  )
}
