import Head from 'next/head'
import { steden } from '../../data'

const provincies = [...new Set(steden.map(s => s.provincie))].sort()

export default function LekdetectieIndex() {
  return (
    <>
      <Head>
        <title>Lekdetectie – Lek opsporen zonder sloopwerk | LekkageFix</title>
        <meta name="description" content="Professionele lekdetectie door heel Nederland. Wij vinden het lek zonder hak- en breekwerk met thermische camera, akoestische detectie en tracergas. Bel direct." />
        <link rel="canonical" href="https://lekkagefix.nl/lekdetectie" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
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
        .breadcrumb{max-width:1200px;margin:0 auto;padding:1rem clamp(1rem,4vw,3rem);font-size:0.8rem;color:var(--muted);display:flex;gap:0.5rem}
        .breadcrumb a{color:var(--green);text-decoration:none}
        .hero{background:linear-gradient(150deg,var(--green-dark),var(--green));padding:clamp(3rem,6vw,5rem) clamp(1rem,5vw,3rem);text-align:center;position:relative;overflow:hidden}
        .hero::after{content:'';position:absolute;bottom:-2px;left:0;right:0;height:50px;background:var(--bg);clip-path:ellipse(55% 100% at 50% 100%)}
        .hero-inner{max-width:780px;margin:0 auto;position:relative;z-index:1}
        .hero-badge{display:inline-flex;align-items:center;gap:0.5rem;background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.2);color:white;padding:0.35rem 0.9rem;border-radius:100px;font-size:0.75rem;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:1rem}
        .hero h1{font-size:clamp(2.2rem,5vw,3.5rem);font-weight:900;line-height:1.1;letter-spacing:-0.03em;color:white;margin-bottom:1rem}
        .hero h1 em{font-style:normal;color:#a8e6c0}
        .hero-sub{color:rgba(255,255,255,0.8);font-size:1rem;line-height:1.75;margin-bottom:2rem;max-width:580px;margin-left:auto;margin-right:auto}
        .hero-actions{display:flex;gap:0.75rem;justify-content:center;flex-wrap:wrap}
        .btn-call{display:inline-flex;align-items:center;gap:0.5rem;background:var(--orange);color:white;padding:0.9rem 1.8rem;border-radius:var(--radius);font-weight:700;font-size:1rem;text-decoration:none;box-shadow:0 4px 16px rgba(232,82,10,0.35)}
        .btn-ghost{display:inline-flex;align-items:center;gap:0.5rem;background:rgba(255,255,255,0.12);color:white;padding:0.9rem 1.8rem;border-radius:var(--radius);font-weight:600;font-size:1rem;border:1px solid rgba(255,255,255,0.25);text-decoration:none}
        .section{padding:4.5rem clamp(1rem,5vw,3rem)}
        .section-inner{max-width:1200px;margin:0 auto}
        .section-alt{background:var(--green3);border-top:1px solid var(--border);border-bottom:1px solid var(--border)}
        .eyebrow{font-size:0.7rem;color:var(--green);font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.4rem}
        h2{font-size:clamp(1.6rem,2.8vw,2.2rem);font-weight:800;letter-spacing:-0.03em;line-height:1.2;color:var(--text)}
        h2 em{font-style:normal;color:var(--green)}
        .sec-sub{color:var(--muted);margin-top:0.5rem;font-size:0.9rem;line-height:1.7}
        .method-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem;margin-top:2.5rem}
        .method{background:white;border:1.5px solid var(--border);border-radius:14px;padding:1.75rem;transition:all 0.25s}
        .method:hover{border-color:var(--green);box-shadow:0 8px 28px rgba(26,122,74,0.1);transform:translateY(-2px)}
        .method-icon{font-size:2rem;margin-bottom:0.75rem}
        .method h3{font-size:0.95rem;font-weight:700;color:var(--text);margin-bottom:0.5rem}
        .method p{color:var(--muted);font-size:0.83rem;line-height:1.65}
        .cities-by-prov{display:flex;flex-direction:column;gap:2.5rem}
        .prov-group h3{font-size:0.82rem;font-weight:700;color:var(--green-dark);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:0.85rem;padding-bottom:0.5rem;border-bottom:2px solid var(--green4)}
        .prov-steden{display:grid;grid-template-columns:repeat(auto-fill,minmax(175px,1fr));gap:0.6rem}
        .city-a{display:flex;align-items:center;gap:0.6rem;background:white;border:1.5px solid var(--border);border-radius:8px;padding:0.7rem 1rem;color:var(--muted);font-size:0.83rem;font-weight:500;text-decoration:none;transition:all 0.2s}
        .city-a:hover{color:var(--green-dark);border-color:var(--green);background:var(--green3)}
        footer{background:var(--green-dark);padding:2.5rem clamp(1rem,5vw,3rem) 1.5rem}
        .footer-inner{max-width:1200px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;padding-bottom:1.5rem;margin-bottom:1.5rem;border-bottom:1px solid rgba(255,255,255,0.1)}
        .footer-logo{font-size:1.2rem;font-weight:800;color:white}
        .footer-logo b{color:#a8e6c0}
        .footer-links{display:flex;gap:1.5rem;flex-wrap:wrap}
        .footer-links a{color:rgba(255,255,255,0.55);font-size:0.82rem;text-decoration:none}
        .footer-links a:hover{color:white}
        .footer-bottom p{color:rgba(255,255,255,0.3);font-size:0.72rem}
        .footer-bottom a{color:rgba(255,255,255,0.3);text-decoration:none}
        @media(max-width:900px){.method-grid{grid-template-columns:1fr 1fr}.nav-link{display:none}}
        @media(max-width:600px){.method-grid{grid-template-columns:1fr}}
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
        <a href="/">Home</a> › Lekdetectie
      </div>

      <section className="hero">
        <div className="hero-inner">
          <div className="hero-badge">🔍 Zonder sloopwerk</div>
          <h1>Lekdetectie door heel <em>Nederland</em></h1>
          <p className="hero-sub">Wij vinden de exacte locatie van uw lekkage met geavanceerde detectieapparatuur — thermische camera, akoestische detectie en tracergas. Zonder hak- en breekwerk.</p>
          <div className="hero-actions">
            <a href="tel:0800-1234" className="btn-call">📞 Bel direct: 0800-1234</a>
            <a href="#steden" className="btn-ghost">Kies jouw stad →</a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="eyebrow">Onze methoden</div>
          <h2>Lekdetectie <em>zonder sloopwerk</em></h2>
          <p className="sec-sub">Met moderne technologie vinden we 95% van alle lekken zonder ook maar één tegel te breken.</p>
          <div className="method-grid">
            <div className="method"><div className="method-icon">🌡️</div><h3>Thermische camera</h3><p>Warmtebeeldcamera's detecteren temperatuurverschillen door vocht achter muren en vloeren — volledig non-destructief.</p></div>
            <div className="method"><div className="method-icon">🔊</div><h3>Akoestische detectie</h3><p>Geavanceerde luisterapparatuur vangt het geluid van stromend water op, zelfs diep in de muur of onder de vloer.</p></div>
            <div className="method"><div className="method-icon">🧪</div><h3>Tracergas</h3><p>Een onschadelijk gas in de leiding ontsnapt op de lekplek — een detector vindt exact de positie aan de oppervlakte.</p></div>
          </div>
        </div>
      </section>

      <section className="section section-alt" id="steden">
        <div className="section-inner">
          <div style={{marginBottom:'2.5rem'}}>
            <div className="eyebrow">Werkgebied</div>
            <h2>Lekdetectie per stad</h2>
            <p className="sec-sub">Klik op jouw stad voor specifieke informatie en een directe aanvraag.</p>
          </div>
          <div className="cities-by-prov">
            {provincies.map(prov => (
              <div key={prov} className="prov-group">
                <h3>📍 {prov}</h3>
                <div className="prov-steden">
                  {steden.filter(s => s.provincie === prov).map(s => (
                    <a key={s.slug} href={`/lekdetectie/${s.slug}`} className="city-a">
                      {s.naam}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-inner">
          <div className="footer-logo">Lekkage<b>Fix</b></div>
          <div className="footer-links">
            <a href="/">Home</a><a href="/lekdetectie">Lekdetectie</a><a href="/lekkage">Lekkage</a><a href="/blog">Blog</a><a href="tel:0800-1234">0800-1234</a>
          </div>
        </div>
        <div className="footer-bottom" style={{maxWidth:'1200px',margin:'0 auto'}}>
          <p>© 2025 LekkageFix · KvK 89586557 · <a href="/privacy">Privacy</a></p>
        </div>
      </footer>
    </>
  )
}

