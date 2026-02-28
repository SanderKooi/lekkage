import Head from 'next/head'
import Nav from '../components/Nav'
import { useState } from 'react'

const PHONE = '0800-1234'
const PHONE_DISPLAY = '0800-1234'

const suggesties = [
  { label: 'Lekkage reparatie', href: '/lekkage', icon: '💧' },
  { label: 'Lekdetectie', href: '/lekdetectie', icon: '🔍' },
  { label: 'Daklekkage', href: '/lekkage/dienst/lekkage-dak', icon: '🏠' },
  { label: 'Waterleiding', href: '/lekkage/dienst/lekkage-waterleiding', icon: '🔧' },
  { label: 'Over ons', href: '/over-ons', icon: '👋' },
  { label: 'Contact', href: '/contact', icon: '✉️' },
]

export default function NotFound() {
  const [zoek, setZoek] = useState('')

  function handleZoek(e) {
    e.preventDefault()
    if (zoek.trim()) window.location.href = `/lekkage?zoek=${encodeURIComponent(zoek)}`
  }

  return (
    <>
      <Head>
        <title>Pagina niet gevonden – LekkageFix</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <style>{`
          .not-found-wrap {
            min-height: 70vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--green-dark);
            position: relative;
            overflow: hidden;
            padding: 4rem clamp(2rem,6vw,6rem);
          }
          .not-found-wrap::before {
            content: '404';
            position: absolute;
            font-size: clamp(12rem, 30vw, 22rem);
            font-weight: 900;
            color: rgba(255,255,255,0.04);
            line-height: 1;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            letter-spacing: -0.05em;
          }
          .not-found-inner {
            position: relative;
            z-index: 1;
            text-align: center;
            max-width: 600px;
          }
          .not-found-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            background: rgba(255,255,255,0.1);
            border: 1px solid rgba(255,255,255,0.15);
            color: rgba(255,255,255,0.8);
            font-size: 0.78rem;
            font-weight: 600;
            padding: 0.35rem 0.85rem;
            border-radius: 20px;
            margin-bottom: 1.5rem;
            letter-spacing: 0.05em;
            text-transform: uppercase;
          }
          .not-found-inner h1 {
            color: white;
            font-size: clamp(2rem, 5vw, 3rem);
            font-weight: 800;
            line-height: 1.2;
            margin-bottom: 1rem;
          }
          .not-found-inner h1 em { color: #a8e6c0; font-style: normal; }
          .not-found-inner p {
            color: rgba(255,255,255,0.7);
            font-size: 1rem;
            line-height: 1.75;
            margin-bottom: 2rem;
          }
          .not-found-search {
            display: flex;
            gap: 0.5rem;
            margin-bottom: 2.5rem;
          }
          .not-found-search input {
            flex: 1;
            padding: 0.75rem 1rem;
            border-radius: 10px;
            border: 1.5px solid rgba(255,255,255,0.2);
            background: rgba(255,255,255,0.08);
            color: white;
            font-family: inherit;
            font-size: 0.9rem;
            outline: none;
            transition: border-color 0.2s;
          }
          .not-found-search input::placeholder { color: rgba(255,255,255,0.4); }
          .not-found-search input:focus { border-color: rgba(255,255,255,0.5); }
          .not-found-search button {
            background: var(--orange);
            color: white;
            border: none;
            border-radius: 10px;
            padding: 0.75rem 1.25rem;
            font-family: inherit;
            font-size: 0.9rem;
            font-weight: 700;
            cursor: pointer;
            white-space: nowrap;
            transition: background 0.2s;
          }
          .not-found-search button:hover { background: var(--orange2); }
          .not-found-links {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 0.6rem;
            margin-bottom: 2rem;
          }
          @media (max-width: 500px) {
            .not-found-links { grid-template-columns: 1fr 1fr; }
          }
          .not-found-link {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.65rem 0.85rem;
            background: rgba(255,255,255,0.07);
            border: 1px solid rgba(255,255,255,0.12);
            border-radius: 10px;
            color: rgba(255,255,255,0.85);
            text-decoration: none;
            font-size: 0.82rem;
            font-weight: 500;
            transition: all 0.15s;
          }
          .not-found-link:hover {
            background: rgba(255,255,255,0.14);
            border-color: rgba(255,255,255,0.25);
            color: white;
          }
          .not-found-cta {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            flex-wrap: wrap;
          }
        `}</style>
      </Head>

      <Nav activePath="/" />

      <div className="not-found-wrap">
        <div className="not-found-inner">
          <div className="not-found-badge">⚠ Pagina niet gevonden</div>
          <h1>Oeps — deze pagina<br/><em>bestaat niet meer</em></h1>
          <p>De pagina die je zoekt is verplaatst of bestaat niet. Gebruik de zoekbalk of ga naar een van de populaire pagina's hieronder.</p>

          <form className="not-found-search" onSubmit={handleZoek}>
            <input
              type="text"
              placeholder="Zoek bijv. 'daklekkage Amsterdam'..."
              value={zoek}
              onChange={e => setZoek(e.target.value)}
            />
            <button type="submit">Zoeken →</button>
          </form>

          <div className="not-found-links">
            {suggesties.map(s => (
              <a key={s.href} href={s.href} className="not-found-link">
                <span>{s.icon}</span>{s.label}
              </a>
            ))}
          </div>

          <div className="not-found-cta">
            <a href="/" className="btn-ghost" style={{borderColor:'rgba(255,255,255,0.3)',color:'white'}}>← Terug naar home</a>
            <a href={`tel:${PHONE}`} className="btn-call">📞 Bel direct: {PHONE_DISPLAY}</a>
          </div>
        </div>
      </div>

      <footer>
        <div className="footer-bottom" style={{borderTop:'1px solid var(--border)'}}>
          <p>© 2025 LekkageFix · <a href="#">Privacy</a> · <a href="#">Voorwaarden</a></p>
        </div>
      </footer>
    </>
  )
}
