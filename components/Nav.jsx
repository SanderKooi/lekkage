import { useState, useEffect, useRef } from 'react'
import { lekkageTypes, steden } from '../data'

const topSteden = steden.slice(0, 8)

export default function Nav({ activePath = '' }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [lekdetectieOpen, setLekdetectieOpen] = useState(false)
  const [lekkageOpen, setLekkageOpen] = useState(false)
  const navRef = useRef(null)

  // Sluit menu bij klik buiten nav
  useEffect(() => {
    function handleClick(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setLekdetectieOpen(false)
        setLekkageOpen(false)
        setMobileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // Sluit mobiel menu bij resize naar desktop
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 900) {
        setMobileOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <style>{`
        .nav-dropdown-wrap{position:relative}
        .nav-dropdown-btn{display:flex;align-items:center;gap:0.3rem;color:rgba(255,255,255,0.75);font-size:0.88rem;font-weight:500;background:none;border:none;cursor:pointer;font-family:var(--font);padding:0;transition:color 0.15s}
        .nav-dropdown-btn:hover,.nav-dropdown-btn.active{color:white}
        .nav-chevron{font-size:0.6rem;transition:transform 0.2s;display:inline-block}
        .nav-chevron.open{transform:rotate(180deg)}
        .dropdown{position:absolute;top:calc(100% + 12px);left:50%;transform:translateX(-50%);background:white;border-radius:14px;box-shadow:0 20px 60px rgba(0,0,0,0.2);padding:1.25rem;display:none;z-index:200;min-width:520px;border:1px solid var(--border)}
        .dropdown.open{display:flex;gap:1.5rem}
        .dropdown::before{content:'';position:absolute;top:-6px;left:50%;transform:translateX(-50%);width:12px;height:12px;background:white;border-left:1px solid var(--border);border-top:1px solid var(--border);transform:translateX(-50%) rotate(45deg)}
        .dd-col h4{font-size:0.65rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:var(--muted);margin-bottom:0.65rem;padding-bottom:0.5rem;border-bottom:1px solid var(--border)}
        .dd-link{display:flex;align-items:center;gap:0.5rem;color:var(--text);font-size:0.83rem;text-decoration:none;padding:0.35rem 0.5rem;border-radius:6px;transition:all 0.15s;white-space:nowrap}
        .dd-link:hover{background:var(--green3);color:var(--green-dark)}
        .dd-link-icon{font-size:1rem;width:20px;text-align:center}
        .dd-all{display:flex;align-items:center;gap:0.4rem;color:var(--green);font-size:0.8rem;font-weight:700;text-decoration:none;margin-top:0.65rem;padding:0.35rem 0.5rem;border-radius:6px;transition:background 0.15s}
        .dd-all:hover{background:var(--green3)}

        /* MOBIEL */
        .hamburger{display:none;flex-direction:column;gap:5px;cursor:pointer;background:none;border:none;padding:4px;flex-shrink:0}
        .hamburger span{display:block;width:22px;height:2px;background:white;border-radius:2px;transition:all 0.25s}
        .hamburger.open span:nth-child(1){transform:translateY(7px) rotate(45deg)}
        .hamburger.open span:nth-child(2){opacity:0}
        .hamburger.open span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}

        .mobile-menu{display:none;position:fixed;top:66px;left:0;right:0;bottom:0;background:var(--green-dark);z-index:150;overflow-y:auto;padding:1.5rem}
        .mobile-menu.open{display:block}
        .mobile-section{margin-bottom:1.5rem}
        .mobile-section-title{font-size:0.65rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.4);margin-bottom:0.65rem}
        .mobile-link{display:flex;align-items:center;gap:0.65rem;color:rgba(255,255,255,0.85);font-size:0.92rem;text-decoration:none;padding:0.65rem 0;border-bottom:1px solid rgba(255,255,255,0.08)}
        .mobile-link:hover{color:white}
        .mobile-link-icon{font-size:1.1rem;width:24px;text-align:center}
        .mobile-cta-wrap{margin-top:1.5rem}
        .mobile-cta-btn{display:block;background:var(--orange);color:white;text-align:center;padding:1rem;border-radius:var(--radius);font-weight:700;font-size:1rem;text-decoration:none;margin-bottom:0.75rem}

        @media(max-width:900px){
          .hamburger{display:flex!important}
          .nav-desktop{display:none!important}
        }
      `}</style>

      <nav ref={navRef}>
        <a href="/" className="logo"><span className="logo-icon">💧</span>Lekkage<b>Fix</b></a>

        {/* DESKTOP */}
        <div className="nav-right nav-desktop">
          {/* Lekdetectie dropdown */}
          <div className="nav-dropdown-wrap"
            onMouseEnter={() => { setLekdetectieOpen(true); setLekkageOpen(false) }}
            onMouseLeave={() => setLekdetectieOpen(false)}
          >
            <button className={`nav-dropdown-btn${activePath.startsWith('/lekdetectie') ? ' active' : ''}`}>
              Lekdetectie <span className={`nav-chevron${lekdetectieOpen ? ' open' : ''}`}>▾</span>
            </button>
            <div className={`dropdown${lekdetectieOpen ? ' open' : ''}`}>
              <div className="dd-col">
                <h4>Populaire steden</h4>
                {topSteden.map(s => (
                  <a key={s.slug} href={`/lekdetectie/${s.slug}`} className="dd-link">
                    <span className="dd-link-icon">📍</span>{s.naam}
                  </a>
                ))}
                <a href="/lekdetectie" className="dd-all">Alle 46 steden →</a>
              </div>
              <div className="dd-col" style={{minWidth:'200px'}}>
                <h4>Over lekdetectie</h4>
                <a href="/lekdetectie" className="dd-link"><span className="dd-link-icon">🔍</span>Wat is lekdetectie?</a>
                <a href="/lekdetectie" className="dd-link"><span className="dd-link-icon">🌡️</span>Thermische camera</a>
                <a href="/lekdetectie" className="dd-link"><span className="dd-link-icon">🔊</span>Akoestische detectie</a>
                <a href="/lekdetectie" className="dd-link"><span className="dd-link-icon">🧪</span>Tracergas methode</a>
                <a href="/lekdetectie" className="dd-link"><span className="dd-link-icon">📋</span>Verzekering & vergoeding</a>
              </div>
            </div>
          </div>

          {/* Lekkage dropdown */}
          <div className="nav-dropdown-wrap"
            onMouseEnter={() => { setLekkageOpen(true); setLekdetectieOpen(false) }}
            onMouseLeave={() => setLekkageOpen(false)}
          >
            <button className={`nav-dropdown-btn${activePath.startsWith('/lekkage') ? ' active' : ''}`}>
              Lekkage <span className={`nav-chevron${lekkageOpen ? ' open' : ''}`}>▾</span>
            </button>
            <div className={`dropdown${lekkageOpen ? ' open' : ''}`}>
              <div className="dd-col">
                <h4>Type lekkage</h4>
                {lekkageTypes.map(t => (
                  <a key={t.slug} href={`/lekkage/${t.slug}`} className="dd-link">
                    <span className="dd-link-icon">{t.icon}</span>{t.naam}
                  </a>
                ))}
                <a href="/lekkage" className="dd-all">Alle diensten →</a>
              </div>
              <div className="dd-col" style={{minWidth:'200px'}}>
                <h4>Populaire combinaties</h4>
                <a href="/lekkage/dak/amsterdam" className="dd-link"><span className="dd-link-icon">🏠</span>Daklekkage Amsterdam</a>
                <a href="/lekkage/waterleiding/rotterdam" className="dd-link"><span className="dd-link-icon">🔧</span>Waterleiding Rotterdam</a>
                <a href="/lekkage/badkamer/den-haag" className="dd-link"><span className="dd-link-icon">🚿</span>Badkamer Den Haag</a>
                <a href="/lekkage/dak/utrecht" className="dd-link"><span className="dd-link-icon">🏠</span>Daklekkage Utrecht</a>
                <a href="/lekkage/riool/eindhoven" className="dd-link"><span className="dd-link-icon">🚰</span>Riool Eindhoven</a>
                <a href="/lekkage/dak/amsterdam" className="dd-all">Meer combinaties →</a>
              </div>
            </div>
          </div>

          <a href="/blog" className="nav-link">Blog</a>
          <a href="tel:0800-1234" className="nav-phone">📞 0800-1234</a>
        </div>

        {/* HAMBURGER */}
        <button
          className={`hamburger${mobileOpen ? ' open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* MOBIEL MENU */}
      <div className={`mobile-menu${mobileOpen ? ' open' : ''}`}>
        <div className="mobile-cta-wrap">
          <a href="tel:0800-1234" className="mobile-cta-btn">📞 Bel nu: 0800-1234</a>
        </div>

        <div className="mobile-section">
          <div className="mobile-section-title">Lekdetectie</div>
          {topSteden.map(s => (
            <a key={s.slug} href={`/lekdetectie/${s.slug}`} className="mobile-link" onClick={() => setMobileOpen(false)}>
              <span className="mobile-link-icon">📍</span>{s.naam}
            </a>
          ))}
          <a href="/lekdetectie" className="mobile-link" style={{color:'#a8e6c0',fontWeight:600}} onClick={() => setMobileOpen(false)}>
            <span className="mobile-link-icon">→</span>Alle steden
          </a>
        </div>

        <div className="mobile-section">
          <div className="mobile-section-title">Lekkage types</div>
          {lekkageTypes.map(t => (
            <a key={t.slug} href={`/lekkage/${t.slug}`} className="mobile-link" onClick={() => setMobileOpen(false)}>
              <span className="mobile-link-icon">{t.icon}</span>{t.naam}
            </a>
          ))}
          <a href="/lekkage" className="mobile-link" style={{color:'#a8e6c0',fontWeight:600}} onClick={() => setMobileOpen(false)}>
            <span className="mobile-link-icon">→</span>Alle diensten
          </a>
        </div>

        <div className="mobile-section">
          <div className="mobile-section-title">Overig</div>
          <a href="/" className="mobile-link" onClick={() => setMobileOpen(false)}><span className="mobile-link-icon">🏠</span>Home</a>
          <a href="/blog" className="mobile-link" onClick={() => setMobileOpen(false)}><span className="mobile-link-icon">📝</span>Blog</a>
        </div>
      </div>
    </>
  )
}
