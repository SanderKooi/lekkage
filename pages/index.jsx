import Head from 'next/head'
import Link from 'next/link'
import { diensten } from '../data/diensten'
import { steden } from '../data/steden'

export default function Homepage() {
  const topSteden = steden.slice(0, 24)

  return (
    <>
      <Head>
        <title>Lekkage Spoedreparatie Nederland – 24/7 | LekkageFix</title>
        <meta name="description" content="Lekkage? Onze experts zijn binnen 30 minuten ter plaatse. Daklekkage, loodgieter, riool, vochtproblemen – heel Nederland, 24/7 bereikbaar." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      </Head>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --navy: #0a1628; --navy-mid: #112240; --blue: #1a56db;
          --cyan: #06b6d4; --amber: #f59e0b; --white: #f8fafc; --gray: #94a3b8;
        }
        body { font-family: 'DM Sans', sans-serif; background: var(--navy); color: var(--white); }
        nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 1rem 2rem;
          background: rgba(10,22,40,0.9); backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .logo { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.4rem; }
        .logo span { color: var(--cyan); }
        .nav-phone {
          background: var(--blue); color: white; padding: 0.55rem 1.2rem;
          border-radius: 2rem; font-weight: 500; font-size: 0.95rem; text-decoration: none;
        }
        .hero {
          min-height: 100vh; display: flex; align-items: center; justify-content: center;
          text-align: center; padding: 6rem 2rem 4rem;
          background: radial-gradient(ellipse 80% 60% at 50% 30%, rgba(26,86,219,0.15) 0%, transparent 60%);
        }
        .hero-inner { max-width: 720px; }
        .badge {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: rgba(6,182,212,0.12); border: 1px solid rgba(6,182,212,0.3);
          color: var(--cyan); padding: 0.4rem 1rem; border-radius: 2rem;
          font-size: 0.82rem; font-weight: 500; margin-bottom: 1.5rem;
        }
        .dot { width: 7px; height: 7px; background: var(--cyan); border-radius: 50%; animation: pulse 1.5s infinite; }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.3)} }
        h1 {
          font-family: 'Syne', sans-serif; font-size: clamp(2.4rem, 5vw, 4rem);
          font-weight: 800; line-height: 1.1; letter-spacing: -0.03em; margin-bottom: 1.2rem;
        }
        h1 em { font-style: normal; color: var(--cyan); }
        .hero-sub { color: var(--gray); font-size: 1.1rem; line-height: 1.7; margin-bottom: 2rem; }
        .stats { display: flex; justify-content: center; gap: 3rem; margin-bottom: 2.5rem; }
        .stat-num { font-family: 'Syne', sans-serif; font-size: 2rem; font-weight: 800; }
        .stat-num span { color: var(--cyan); }
        .stat-label { font-size: 0.75rem; color: var(--gray); text-transform: uppercase; letter-spacing: 0.06em; }
        .cta-group { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
        .btn-primary {
          background: var(--blue); color: white; padding: 0.9rem 2rem; border-radius: 0.5rem;
          font-weight: 600; font-size: 1rem; text-decoration: none; transition: all 0.2s;
        }
        .btn-primary:hover { background: #3b82f6; transform: translateY(-2px); }
        .btn-secondary {
          background: transparent; color: var(--white); padding: 0.9rem 2rem;
          border-radius: 0.5rem; font-weight: 500; font-size: 1rem;
          text-decoration: none; border: 1px solid rgba(255,255,255,0.2); transition: all 0.2s;
        }
        .btn-secondary:hover { border-color: var(--cyan); color: var(--cyan); }
        section { padding: 5rem 2rem; max-width: 1200px; margin: 0 auto; }
        .section-label { font-size: 0.78rem; color: var(--cyan); text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600; margin-bottom: 0.8rem; }
        h2 { font-family: 'Syne', sans-serif; font-size: clamp(1.8rem, 3vw, 2.5rem); font-weight: 800; letter-spacing: -0.02em; margin-bottom: 2.5rem; }
        .diensten-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem; }
        .dienst-card {
          background: var(--navy-mid); border: 1px solid rgba(255,255,255,0.07);
          border-radius: 1rem; padding: 1.8rem; text-decoration: none; color: var(--white);
          transition: all 0.3s; display: block;
        }
        .dienst-card:hover { border-color: rgba(6,182,212,0.4); transform: translateY(-4px); }
        .dienst-icon { font-size: 2rem; margin-bottom: 1rem; }
        .dienst-card h3 { font-family: 'Syne', sans-serif; font-weight: 700; margin-bottom: 0.5rem; }
        .dienst-card p { color: var(--gray); font-size: 0.88rem; line-height: 1.6; margin-bottom: 1rem; }
        .card-link { color: var(--cyan); font-size: 0.85rem; font-weight: 600; }
        .steden-section { background: rgba(255,255,255,0.02); border-top: 1px solid rgba(255,255,255,0.05); }
        .steden-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 0.75rem; }
        .stad-link {
          background: var(--navy-mid); border: 1px solid rgba(255,255,255,0.07);
          border-radius: 0.6rem; padding: 0.7rem 1rem; color: var(--gray);
          text-decoration: none; font-size: 0.88rem; transition: all 0.2s;
        }
        .stad-link:hover { color: var(--white); border-color: rgba(6,182,212,0.3); }
        footer {
          background: rgba(0,0,0,0.3); border-top: 1px solid rgba(255,255,255,0.06);
          padding: 3rem 2rem; text-align: center;
        }
        .footer-logo { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.5rem; margin-bottom: 1rem; }
        .footer-logo span { color: var(--cyan); }
        footer p { color: var(--gray); font-size: 0.85rem; line-height: 1.8; }
        footer a { color: var(--cyan); text-decoration: none; }
      `}</style>

      <nav>
        <div className="logo">Lekkage<span>Fix</span></div>
        <a href="tel:0800-1234" className="nav-phone">📞 0800-1234 (24/7)</a>
      </nav>

      <div className="hero">
        <div className="hero-inner">
          <div className="badge"><span className="dot"></span>24/7 bereikbaar in heel Nederland</div>
          <h1>Lekkage?<br />Wij lossen het <em>op.</em></h1>
          <p className="hero-sub">Daklekkage, waterleiding, riool of vochtproblemen — onze experts zijn binnen 30 minuten ter plaatse. Dag en nacht.</p>
          <div className="stats">
            <div><div className="stat-num">30<span>min</span></div><div className="stat-label">Responstijd</div></div>
            <div><div className="stat-num">4.9<span>★</span></div><div className="stat-label">Beoordeling</div></div>
            <div><div className="stat-num">12<span>k+</span></div><div className="stat-label">Klanten</div></div>
          </div>
          <div className="cta-group">
            <a href="tel:0800-1234" className="btn-primary">📞 Bel direct: 0800-1234</a>
            <a href="#diensten" className="btn-secondary">Bekijk diensten →</a>
          </div>
        </div>
      </div>

      <section id="diensten">
        <div className="section-label">Onze diensten</div>
        <h2>Wat kunnen we voor u doen?</h2>
        <div className="diensten-grid">
          {diensten.map(d => (
            <Link key={d.slug} href={`/${d.slug}-amsterdam/`} className="dienst-card">
              <div className="dienst-icon">{d.icon}</div>
              <h3>{d.label}</h3>
              <p>{d.shortDesc}</p>
              <span className="card-link">Bekijk per stad →</span>
            </Link>
          ))}
        </div>
      </section>

      <div className="steden-section">
        <section>
          <div className="section-label">Werkgebied</div>
          <h2>Actief door heel Nederland</h2>
          <div className="steden-grid">
            {topSteden.map(s => (
              <Link key={s.slug} href={`/lekkage-${s.slug}/`} className="stad-link">
                📍 {s.naam}
              </Link>
            ))}
          </div>
        </section>
      </div>

      <footer>
        <div className="footer-logo">Lekkage<span>Fix</span></div>
        <p>
          24/7 bereikbaar voor alle lekkages in Nederland<br />
          <a href="tel:0800-1234">0800-1234</a> · info@lekkagefix.nl
        </p>
        <p style={{marginTop: '1.5rem', fontSize: '0.75rem'}}>© 2025 LekkageFix · KvK 12345678</p>
      </footer>
    </>
  )
}
