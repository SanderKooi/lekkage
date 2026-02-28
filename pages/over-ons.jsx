import Head from 'next/head'
import Nav from '../components/Nav'

const PHONE = '0800-1234'
const PHONE_DISPLAY = '0800-1234'

const monteurs = [
  { naam: 'Henk van der Berg',  foto: 'HB', img: '/images/henk.png',   regio: 'Noord-Holland',  ervaring: '14 jaar', spec: 'Daklekkage & gevelreparatie' },
  { naam: 'Marco de Wit',       foto: 'MW', img: '/images/marco.png',   regio: 'Zuid-Holland',   ervaring: '11 jaar', spec: 'Waterleiding & riool' },
  { naam: 'Jeroen Smit',        foto: 'JS', img: '/images/jeroen.png',  regio: 'Utrecht',         ervaring: '9 jaar',  spec: 'Lekdetectie & badkamer' },
  { naam: 'Kevin Janssen',      foto: 'KJ', img: '/images/kevin.png',   regio: 'Noord-Brabant',  ervaring: '12 jaar', spec: 'Kelderafdichting & vocht' },
  { naam: 'Arjan Meijer',       foto: 'AM', img: '/images/arjan.png',   regio: 'Gelderland',     ervaring: '10 jaar', spec: 'Daklekkage & riool' },
  { naam: 'Pieter Visser',      foto: 'PV', img: '/images/pieter.png',  regio: 'Friesland',      ervaring: '13 jaar', spec: 'Daklekkage & gevel' },
  { naam: 'Rob Hofstra',        foto: 'RH', img: '/images/rob.png',     regio: 'Drenthe',        ervaring: '9 jaar',  spec: 'Waterleiding & vocht' },
  { naam: 'Thomas Bos',         foto: 'TB', img: '/images/thomas.png',  regio: 'Overijssel',     ervaring: '8 jaar',  spec: 'Riool & lekdetectie' },
  { naam: 'Danny Kramer',       foto: 'DK', img: '/images/danny.png',   regio: 'Flevoland',      ervaring: '6 jaar',  spec: 'Daklekkage & waterleiding' },
  { naam: 'Luc Hermans',        foto: 'LH', img: '/images/luc.png',     regio: 'Limburg',        ervaring: '11 jaar', spec: 'Kelderafdichting & gevel' },
  { naam: 'Kees de Vos',        foto: 'KV', img: '/images/kees.png',    regio: 'Zeeland',        ervaring: '15 jaar', spec: 'Vocht & daklekkage' },
  { naam: 'Sander Dijkstra',    foto: 'SD', img: '/images/sander.png',  regio: 'Groningen',      ervaring: '7 jaar',  spec: 'Riool & waterleiding' },
]

const waarden = [
  { icon: '⚡', titel: 'Snel ter plaatse', tekst: 'Gemiddeld binnen 30 minuten. We begrijpen dat een lekkage nooit wacht.' },
  { icon: '🔍', titel: 'Eerlijk diagnose', tekst: 'We zoeken de échte oorzaak, niet alleen het symptoom. Transparante offerte vooraf.' },
  { icon: '🛡️', titel: 'Garantie op werk', tekst: 'Op alle reparaties geven we garantie. Niet goed? Dan lossen we het kosteloos op.' },
  { icon: '📋', titel: 'Erkend verzekeraar', tekst: 'Wij werken erkend door alle grote verzekeraars en stellen gedetailleerde rapporten op.' },
  { icon: '🌍', titel: 'Heel Nederland', tekst: 'Met specialisten in elke provincie dekken we heel Nederland — van Zeeland tot Groningen.' },
  { icon: '✅', titel: 'VCA gecertificeerd', tekst: 'Al onze monteurs zijn VCA gecertificeerd en werken volgens de hoogste veiligheidsnormen.' },
]

export default function OverOns() {
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
        "description": "LekkageFix is een landelijk opererende specialist in lekkagereparatie en lekdetectie. Met gecertificeerde monteurs in elke provincie lossen we elk type lekkage op, gemiddeld binnen 30 minuten.",
        "foundingDate": "2010",
        "numberOfEmployees": { "@type": "QuantitativeValue", "value": 12 },
        "areaServed": { "@type": "Country", "name": "Netherlands" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "2847", "bestRating": "5" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://lekkagefix.nl" },
          { "@type": "ListItem", "position": 2, "name": "Over ons", "item": "https://lekkagefix.nl/over-ons" }
        ]
      }
    ]
  }

  return (
    <>
      <Head>
        <title>Over ons – LekkageFix | Landelijk lekkage specialist</title>
        <meta name="description" content="LekkageFix is dé specialist in lekkagereparatie en lekdetectie. Meer dan 12 gecertificeerde monteurs door heel Nederland. Gemiddeld binnen 30 minuten ter plaatse." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://lekkagefix.nl/over-ons" />
        <meta property="og:title" content="Over ons – LekkageFix" />
        <meta property="og:description" content="Meer dan 12 gecertificeerde monteurs door heel Nederland. Gemiddeld binnen 30 minuten ter plaatse." />
        <meta property="og:url" content="https://lekkagefix.nl/over-ons" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <style>{`
          @media (max-width: 900px) {
            .hero-inner { grid-template-columns: 1fr !important; }
            .verhaal-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
            .stats-grid  { grid-template-columns: 1fr 1fr !important; }
          }
        `}</style>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      </Head>

      <Nav activePath="/over-ons" />

      {/* HERO */}
      <section className="hero">
        <div className="hero-dots" />
        <div className="hero-inner" style={{gridTemplateColumns:'1fr',maxWidth:'820px',margin:'0 auto',textAlign:'center'}}>
          <div>
            <div className="hero-badge"><span className="pulse" /> Actief since 2010 · heel Nederland</div>
            <h1>Wij lossen <em>elk lek op</em></h1>
            <p className="hero-sub" style={{maxWidth:'580px',margin:'0 auto 2rem'}}>LekkageFix is opgericht vanuit een eenvoudige overtuiging: een lekkage moet snel, vakkundig en eerlijk worden opgelost. Met meer dan 12 gecertificeerde monteurs zijn we actief in elke provincie.</p>
            <div className="hero-stats">
              <div className="stat-item"><div className="stat-val">12<sup>+</sup></div><div className="stat-key">Monteurs</div></div>
              <div className="stat-item"><div className="stat-val">4.9<sup>★</sup></div><div className="stat-key">Beoordeling</div></div>
              <div className="stat-item"><div className="stat-val">12k<sup>+</sup></div><div className="stat-key">Klanten</div></div>
              <div className="stat-item"><div className="stat-val">2010</div><div className="stat-key">Opgericht</div></div>
            </div>
            <div className="hero-actions" style={{justifyContent:'center'}}>
              <a href={`tel:${PHONE}`} className="btn-call">📞 Bel direct: {PHONE_DISPLAY}</a>
              <a href="/contact" className="btn-ghost">Neem contact op →</a>
            </div>
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

      {/* VERHAAL */}
      <section className="section section-white">
        <div className="section-inner verhaal-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'4rem',alignItems:'center'}}>
          <div>
            <div className="eyebrow">Ons verhaal</div>
            <h2>Vakmanschap dat <em>je kunt vertrouwen</em></h2>
            <p style={{color:'var(--muted)',lineHeight:1.85,marginBottom:'1rem'}}>
              LekkageFix is in 2010 opgericht door een groep ervaren monteurs die één ding gemeen hadden: frustratie over hoe de markt werkte. Onduidelijke prijzen, lange wachttijden en reparaties die het probleem niet echt oplosten.
            </p>
            <p style={{color:'var(--muted)',lineHeight:1.85,marginBottom:'1rem'}}>
              We bouwden een bedrijf op drie pijlers: eerlijkheid, snelheid en vakmanschap. Elke monteur bij LekkageFix is gecertificeerd, heeft minimaal 5 jaar ervaring en kent de woningbouw in zijn regio als geen ander.
            </p>
            <p style={{color:'var(--muted)',lineHeight:1.85}}>
              Inmiddels helpen we meer dan 12.000 klanten per jaar — van spoedgevallen midden in de nacht tot geplande inspecties voor woningverkoop. Maar de aanpak is altijd hetzelfde: snel, transparant en met garantie.
            </p>
          </div>
          <div className="stats-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}>
            {[
              { num: '2010', label: 'Opgericht' },
              { num: '12+', label: 'Specialisten' },
              { num: '12k+', label: 'Klanten per jaar' },
              { num: '4.9★', label: 'Gemiddelde score' },
            ].map((s, i) => (
              <div key={i} style={{background:'var(--green3)',border:'1.5px solid var(--green4)',borderRadius:'16px',padding:'1.5rem',textAlign:'center'}}>
                <div style={{fontSize:'2rem',fontWeight:900,color:'var(--green-dark)',lineHeight:1}}>{s.num}</div>
                <div style={{fontSize:'0.8rem',color:'var(--muted)',marginTop:'0.4rem',fontWeight:500}}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WAARDEN */}
      <section className="section section-alt">
        <div className="section-inner">
          <div className="sec-head-center">
            <div className="eyebrow">Waarom LekkageFix</div>
            <h2>Waar wij <em>voor staan</em></h2>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'1.25rem'}}>
            {waarden.map((w, i) => (
              <div key={i} style={{background:'white',border:'1.5px solid var(--border)',borderRadius:'14px',padding:'1.5rem'}}>
                <div style={{fontSize:'1.75rem',marginBottom:'0.75rem'}}>{w.icon}</div>
                <h3 style={{fontSize:'1rem',marginBottom:'0.5rem'}}>{w.titel}</h3>
                <p style={{fontSize:'0.85rem',color:'var(--muted)',lineHeight:1.7,margin:0}}>{w.tekst}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="section section-white">
        <div className="section-inner">
          <div className="sec-head-center">
            <div className="eyebrow">Ons team</div>
            <h2>De mensen <em>achter LekkageFix</em></h2>
            <p className="sec-sub">Elk van onze specialisten is gecertificeerd, lokaal verankerd en klaar om snel te helpen.</p>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:'1.25rem'}}>
            {monteurs.map((m, i) => (
              <div key={i} style={{background:'var(--green3)',border:'1.5px solid var(--green4)',borderRadius:'14px',padding:'1.25rem',textAlign:'center'}}>
                {m.img
                  ? <img src={m.img} alt={m.naam} style={{width:'72px',height:'72px',borderRadius:'50%',objectFit:'cover',border:'3px solid white',boxShadow:'0 2px 12px rgba(26,122,74,0.2)',margin:'0 auto 0.75rem'}} />
                  : <div style={{width:'72px',height:'72px',borderRadius:'50%',background:'var(--green)',color:'white',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.25rem',fontWeight:800,margin:'0 auto 0.75rem',border:'3px solid white'}}>{m.foto}</div>
                }
                <div style={{fontWeight:700,fontSize:'0.9rem',color:'var(--text)',marginBottom:'0.2rem'}}>{m.naam}</div>
                <div style={{fontSize:'0.75rem',color:'var(--green-dark)',fontWeight:600,marginBottom:'0.2rem'}}>{m.regio}</div>
                <div style={{fontSize:'0.72rem',color:'var(--muted)'}}>{m.spec}</div>
                <div style={{fontSize:'0.72rem',color:'var(--muted)',marginTop:'0.2rem'}}>{m.ervaring} ervaring</div>
              </div>
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
              { n:'4', t:'Opgelost & gegarandeerd', p:'Vakkundige reparatie met garantie op het werk. Netjes opgeruimd achtergelaten.' },
            ].map(s => (
              <div key={s.n} className="step"><div className="step-num">{s.n}</div><h3>{s.t}</h3><p>{s.p}</p></div>
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
          <a href={`tel:${PHONE}`} className="btn-call">📞 Bel nu: {PHONE_DISPLAY}</a>
          <a href="/contact" className="btn-white-ghost">Stuur een bericht →</a>
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
            <a href="mailto:info@lekkagefix.nl">info@lekkagefix.nl</a>
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
