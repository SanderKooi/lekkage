import Head from 'next/head'
import Link from 'next/link'
import { diensten } from '../data/diensten'
import { steden } from '../data/steden'

export default function DienstStadPage({ dienst, stad, dienstData }) {
  if (!dienstData) return <div>Pagina niet gevonden</div>

  const title = `${dienstData.label} ${stad} – 24/7 Spoedreparatie | LekkageFix`
  const description = `${dienstData.label} in ${stad}? Onze experts zijn binnen 30 minuten ter plaatse. ${dienstData.shortDesc} Bel nu voor een gratis offerte.`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      </Head>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --navy: #0a1628; --navy-mid: #112240; --blue: #1a56db;
          --cyan: #06b6d4; --white: #f8fafc; --gray: #94a3b8;
        }
        body { font-family: 'DM Sans', sans-serif; background: var(--navy); color: var(--white); }
        nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 1rem 2rem; background: rgba(10,22,40,0.9); backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .logo { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.4rem; text-decoration: none; color: var(--white); }
        .logo span { color: var(--cyan); }
        .nav-phone { background: var(--blue); color: white; padding: 0.55rem 1.2rem; border-radius: 2rem; font-weight: 500; text-decoration: none; }
        .hero {
          min-height: 100vh; display: flex; align-items: center; justify-content: center;
          padding: 6rem 2rem 4rem;
          background: radial-gradient(ellipse 80% 60% at 50% 30%, rgba(26,86,219,0.15) 0%, transparent 60%);
        }
        .hero-inner { max-width: 1100px; width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
        .badge {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: rgba(6,182,212,0.12); border: 1px solid rgba(6,182,212,0.3);
          color: var(--cyan); padding: 0.4rem 1rem; border-radius: 2rem;
          font-size: 0.82rem; font-weight: 500; margin-bottom: 1.5rem;
        }
        .dot { width: 7px; height: 7px; background: var(--cyan); border-radius: 50%; animation: pulse 1.5s infinite; display: inline-block; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
        h1 { font-family: 'Syne', sans-serif; font-size: clamp(2rem, 4vw, 3rem); font-weight: 800; line-height: 1.15; letter-spacing: -0.03em; margin-bottom: 1.2rem; }
        h1 em { font-style: normal; color: var(--cyan); }
        .hero-sub { color: var(--gray); font-size: 1rem; line-height: 1.7; margin-bottom: 2rem; }
        .stats { display: flex; gap: 2rem; margin-bottom: 2rem; }
        .stat-num { font-family: 'Syne', sans-serif; font-size: 1.8rem; font-weight: 800; }
        .stat-num span { color: var(--cyan); }
        .stat-label { font-size: 0.75rem; color: var(--gray); text-transform: uppercase; letter-spacing: 0.06em; }
        .cta-group { display: flex; gap: 1rem; flex-wrap: wrap; }
        .btn-primary { background: var(--blue); color: white; padding: 0.9rem 2rem; border-radius: 0.5rem; font-weight: 600; text-decoration: none; }
        .btn-secondary { background: transparent; color: var(--white); padding: 0.9rem 2rem; border-radius: 0.5rem; font-weight: 500; text-decoration: none; border: 1px solid rgba(255,255,255,0.2); }
        .form-card {
          background: var(--navy-mid); border: 1px solid rgba(255,255,255,0.08);
          border-radius: 1.2rem; padding: 2rem; position: relative; overflow: hidden;
        }
        .form-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, var(--blue), var(--cyan)); }
        .form-card h2 { font-family: 'Syne', sans-serif; font-size: 1.2rem; font-weight: 700; margin-bottom: 0.3rem; }
        .form-card p { color: var(--gray); font-size: 0.85rem; margin-bottom: 1.5rem; }
        .form-group { margin-bottom: 1rem; }
        label { display: block; font-size: 0.78rem; color: var(--gray); margin-bottom: 0.35rem; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; }
        input, select, textarea { width: 100%; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 0.5rem; padding: 0.7rem 1rem; color: var(--white); font-size: 0.95rem; outline: none; font-family: inherit; }
        input:focus, select:focus { border-color: var(--cyan); }
        select option { background: var(--navy-mid); }
        textarea { resize: vertical; min-height: 70px; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .btn-submit { width: 100%; background: linear-gradient(135deg, var(--blue), var(--cyan)); color: white; padding: 1rem; border-radius: 0.5rem; font-weight: 700; font-size: 1rem; border: none; cursor: pointer; margin-top: 0.5rem; font-family: 'Syne', sans-serif; }
        .form-note { text-align: center; font-size: 0.75rem; color: var(--gray); margin-top: 0.7rem; }
        section.content { padding: 4rem 2rem; max-width: 1100px; margin: 0 auto; }
        section.content h2 { font-family: 'Syne', sans-serif; font-size: 1.8rem; font-weight: 800; margin-bottom: 1rem; }
        section.content p { color: var(--gray); line-height: 1.8; }
        .diensten-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin-top: 1.5rem; }
        .dienst-card { background: var(--navy-mid); border: 1px solid rgba(255,255,255,0.07); border-radius: 0.8rem; padding: 1.4rem; text-decoration: none; color: var(--white); transition: border-color 0.2s; }
        .dienst-card:hover { border-color: rgba(6,182,212,0.4); }
        .dienst-card h3 { font-family: 'Syne', sans-serif; font-size: 0.95rem; font-weight: 700; margin-top: 0.5rem; }
        footer { background: rgba(0,0,0,0.3); border-top: 1px solid rgba(255,255,255,0.06); padding: 2.5rem 2rem; text-align: center; }
        .footer-logo { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.3rem; margin-bottom: 0.8rem; }
        .footer-logo span { color: var(--cyan); }
        footer p { color: var(--gray); font-size: 0.85rem; }
        footer a { color: var(--cyan); text-decoration: none; }
        @media (max-width: 768px) {
          .hero-inner { grid-template-columns: 1fr; }
          .form-row { grid-template-columns: 1fr; }
          .stats { gap: 1.2rem; }
        }
      `}</style>

      <nav>
        <Link href="/" className="logo">Lekkage<span>Fix</span></Link>
        <a href="tel:0800-1234" className="nav-phone">📞 0800-1234</a>
      </nav>

      <div className="hero">
        <div className="hero-inner">
          <div>
            <div className="badge"><span className="dot"></span> Nu actief in {stad}</div>
            <h1>{dienstData.label} in <em>{stad}</em></h1>
            <p className="hero-sub">{dienstData.intro.replace(/\{stad\}/g, stad)}</p>
            <div className="stats">
              <div><div className="stat-num">30<span>min</span></div><div className="stat-label">Responstijd</div></div>
              <div><div className="stat-num">4.9<span>★</span></div><div className="stat-label">Beoordeling</div></div>
              <div><div className="stat-num">24<span>/7</span></div><div className="stat-label">Bereikbaar</div></div>
            </div>
            <div className="cta-group">
              <a href="tel:0800-1234" className="btn-primary">📞 Bel 0800-1234</a>
              <a href="#offerte" className="btn-secondary">Gratis offerte →</a>
            </div>
          </div>

          <div className="form-card" id="offerte">
            <h2>Gratis offerte aanvragen</h2>
            <p>Binnen 10 minuten reactie — ook 's nachts</p>
            <div className="form-group">
              <label>Type lekkage</label>
              <select defaultValue={dienstData.label}>
                {diensten.map(d => <option key={d.slug}>{d.label}</option>)}
              </select>
            </div>
            <div className="form-row">
              <div className="form-group"><label>Naam</label><input type="text" placeholder="Jan de Vries" /></div>
              <div className="form-group"><label>Telefoon</label><input type="tel" placeholder="06-12345678" /></div>
            </div>
            <div className="form-group"><label>Postcode</label><input type="text" placeholder="1011 AB" /></div>
            <div className="form-group"><label>Omschrijving</label><textarea placeholder="Beschrijf kort het probleem..." /></div>
            <button className="btn-submit">Stuur aanvraag →</button>
            <p className="form-note">🔒 Gratis & vrijblijvend · Geen spam</p>
          </div>
        </div>
      </div>

      <section className="content">
        <h2>{dienstData.label} in {stad}: wat u moet weten</h2>
        <p>{dienstData.longDesc.replace(/\{stad\}/g, stad)}</p>
      </section>

      <section className="content">
        <h2>Andere diensten in {stad}</h2>
        <div className="diensten-grid">
          {diensten.filter(d => d.slug !== dienst).map(d => (
            <Link key={d.slug} href={`/${d.slug}-${stad.toLowerCase().replace(/ /g, '-')}/`} className="dienst-card">
              <div>{d.icon}</div>
              <h3>{d.label} {stad}</h3>
            </Link>
          ))}
        </div>
      </section>

      <footer>
        <div className="footer-logo">Lekkage<span>Fix</span></div>
        <p>24/7 bereikbaar · <a href="tel:0800-1234">0800-1234</a></p>
      </footer>
    </>
  )
}

export async function getStaticPaths() {
  const paths = []
  diensten.forEach(d => {
    steden.forEach(s => {
      paths.push({ params: { slug: `${d.slug}-${s.slug}` } })
    })
  })
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const slug = params.slug
  
  let matchedDienst = null
  let matchedStad = null

  for (const d of diensten) {
    for (const s of steden) {
      if (slug === `${d.slug}-${s.slug}`) {
        matchedDienst = d
        matchedStad = s
        break
      }
    }
    if (matchedDienst) break
  }

  if (!matchedDienst || !matchedStad) {
    return { notFound: true }
  }

  return {
    props: {
      dienst: matchedDienst.slug,
      stad: matchedStad.naam,
      dienstData: matchedDienst
    }
  }
}
