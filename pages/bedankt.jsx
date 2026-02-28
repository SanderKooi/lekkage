import Head from 'next/head'
import Nav from '../components/Nav'

const PHONE = '0800-1234'
const PHONE_DISPLAY = '0800-1234'

export default function Bedankt() {
  return (
    <>
      <Head>
        <title>Bedankt voor je bericht – LekkageFix</title>
        <meta name="description" content="We hebben je bericht ontvangen en nemen snel contact op." />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>

      <Nav activePath="/contact" />

      <section className="hero" style={{minHeight:'70vh'}}>
        <div className="hero-dots" />
        <div className="hero-inner" style={{gridTemplateColumns:'1fr',maxWidth:'640px',margin:'0 auto',textAlign:'center'}}>
          <div>
            <div style={{fontSize:'4rem',marginBottom:'1rem'}}>✅</div>
            <div className="hero-badge" style={{justifyContent:'center',marginBottom:'1rem'}}>Bericht ontvangen</div>
            <h1>Bedankt voor <em>je bericht!</em></h1>
            <p className="hero-sub" style={{maxWidth:'480px',margin:'0 auto 2rem'}}>
              We hebben je bericht goed ontvangen. Op werkdagen reageren we binnen 2 uur. Heb je spoed? Bel ons direct.
            </p>
            <div className="hero-actions" style={{justifyContent:'center'}}>
              <a href={`tel:${PHONE}`} className="btn-call">📞 Bel direct: {PHONE_DISPLAY}</a>
              <a href="/" className="btn-ghost">Terug naar home →</a>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-bottom" style={{borderTop:'1px solid var(--border)'}}>
          <p>© 2025 LekkageFix · <a href="#">Privacy</a> · <a href="#">Voorwaarden</a></p>
        </div>
      </footer>
    </>
  )
}
