import { useState, useRef } from 'react'
import { lekkageTypes } from '../data'

const PHONE = '0800-1234'
const PHONE_DISPLAY = '0800-1234'

export default function Nav({ activePath }) {
  const [openMenu, setOpenMenu] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const closeTimer = useRef(null)

  function openDropdown(name) {
    clearTimeout(closeTimer.current)
    setOpenMenu(name)
  }

  function scheduleClose() {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120)
  }

  function cancelClose() {
    clearTimeout(closeTimer.current)
  }

  const navItems = [
    {
      label: 'Lekkage',
      href: '/lekkage',
      key: 'lekkage',
      dropdown: {
        intro: { label: 'Alle lekkage diensten →', href: '/lekkage' },
        items: lekkageTypes.map(t => ({
          icon: t.icon,
          label: t.naam,
          sub: t.omschrijving?.slice(0, 48) + '...',
          href: `/lekkage/dienst/${t.slug}`,
        }))
      }
    },
    {
      label: 'Lekdetectie',
      href: '/lekdetectie',
      key: 'lekdetectie',
      dropdown: {
        intro: { label: 'Alle lekdetectie diensten →', href: '/lekdetectie' },
        items: [
          { icon: '🌡️', label: 'Thermische camera', sub: 'Non-destructief via warmtebeelden', href: '/lekdetectie' },
          { icon: '🔊', label: 'Akoestische detectie', sub: 'Geluid van stromend water opsporen', href: '/lekdetectie' },
          { icon: '🧪', label: 'Tracergas detectie', sub: 'Exacte leklocatie zonder sloopwerk', href: '/lekdetectie' },
          { icon: '📷', label: 'Camera-inspectie', sub: 'HD-inspectie van riolering', href: '/lekdetectie' },
          { icon: '💧', label: 'Druktest leidingen', sub: 'Snel vaststellen of er een lek is', href: '/lekdetectie' },
          { icon: '📋', label: 'Lekrapportage', sub: 'Rapport voor je verzekeraar', href: '/lekdetectie' },
        ]
      }
    },
    {
      label: 'Over ons',
      href: '/over-ons',
      key: 'over',
    },
    {
      label: 'Contact',
      href: '/contact',
      key: 'contact',
    },
  ]

  return (
    <>
      <style>{`
        .nav-wrap {
          position: sticky;
          top: 0;
          z-index: 200;
          background: var(--green-dark);
          box-shadow: 0 2px 16px rgba(20,92,56,0.3);
        }
        .nav-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 clamp(2rem,6vw,6rem);
          height: 66px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 3rem;
        }
        .nav-logo {
          font-size: 1.4rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: white;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          flex-shrink: 0;
        }
        .nav-logo-icon {
          background: white;
          color: var(--green-dark);
          width: 28px;
          height: 28px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
        }
        .nav-logo b { color: #a8e6c0; }

        /* DESKTOP NAV */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          list-style: none;
          margin-right: 1rem;
        }
        .nav-item {
          position: relative;
        }
        .nav-item-link {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          padding: 0.5rem 1rem;
          color: rgba(255,255,255,0.82);
          font-size: 0.88rem;
          font-weight: 500;
          text-decoration: none;
          border-radius: 8px;
          transition: color 0.15s, background 0.15s;
          cursor: pointer;
          white-space: nowrap;
        }
        .nav-item-link:hover,
        .nav-item-link.active {
          color: white;
          background: rgba(255,255,255,0.1);
        }
        .nav-item-link .chevron {
          font-size: 0.6rem;
          opacity: 0.6;
          transition: transform 0.2s;
        }
        .nav-item-link.open .chevron {
          transform: rotate(180deg);
        }

        /* DROPDOWN */
        .nav-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%);
          background: white;
          border: 1.5px solid var(--border);
          border-radius: 16px;
          box-shadow: 0 12px 40px rgba(0,0,0,0.14);
          padding: 0.75rem;
          min-width: 540px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.3rem;
          z-index: 300;
          /* Truc: negatieve margin-top + padding-top zorgt dat muis niet "valt" */
          margin-top: -4px;
          padding-top: 1rem;
        }
        /* Onzichtbare brug tussen nav-item en dropdown */
        .nav-dropdown::before {
          content: '';
          position: absolute;
          top: -12px;
          left: 0;
          right: 0;
          height: 12px;
        }
        .nav-dropdown-intro {
          grid-column: 1 / -1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.5rem 0.75rem;
          margin-bottom: 0.25rem;
          border-bottom: 1px solid var(--border);
        }
        .nav-dropdown-intro a {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--green);
          text-decoration: none;
        }
        .nav-dropdown-intro a:hover { text-decoration: underline; }
        .nav-dd-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.65rem 0.75rem;
          border-radius: 10px;
          text-decoration: none;
          color: var(--text);
          transition: background 0.15s;
        }
        .nav-dd-item:hover {
          background: var(--green3);
        }
        .nav-dd-icon {
          width: 36px;
          height: 36px;
          background: var(--green3);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          flex-shrink: 0;
        }
        .nav-dd-label {
          font-size: 0.84rem;
          font-weight: 600;
          color: var(--text);
          line-height: 1.2;
        }
        .nav-dd-sub {
          font-size: 0.73rem;
          color: var(--muted);
          line-height: 1.3;
          margin-top: 0.1rem;
        }

        /* CTA PHONE */
        .nav-phone {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--orange);
          color: white;
          padding: 0.5rem 1.2rem;
          border-radius: var(--radius);
          font-weight: 700;
          font-size: 0.88rem;
          text-decoration: none;
          transition: background 0.2s;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .nav-phone:hover { background: var(--orange2); }

        /* MOBILE */
        .nav-hamburger {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          color: white;
          font-size: 1.4rem;
        }
        .nav-mobile-menu {
          display: none;
          position: fixed;
          inset: 0;
          background: var(--green-dark);
          z-index: 500;
          overflow-y: auto;
          padding: 1.5rem;
        }
        .nav-mobile-menu.open { display: block; }
        .nav-mobile-close {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        .nav-mobile-items { display: flex; flex-direction: column; gap: 0.5rem; }
        .nav-mobile-link {
          display: block;
          padding: 0.85rem 1rem;
          color: white;
          font-size: 1.05rem;
          font-weight: 600;
          text-decoration: none;
          border-radius: 10px;
          background: rgba(255,255,255,0.08);
        }
        .nav-mobile-sub {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          margin-top: 0.35rem;
          padding-left: 1rem;
        }
        .nav-mobile-sub a {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: rgba(255,255,255,0.75);
          font-size: 0.88rem;
          text-decoration: none;
          padding: 0.4rem 0.5rem;
          border-radius: 6px;
        }
        .nav-mobile-sub a:hover { background: rgba(255,255,255,0.08); }
        .nav-mobile-phone {
          display: block;
          background: var(--orange);
          color: white;
          text-align: center;
          padding: 1rem;
          border-radius: 10px;
          font-weight: 700;
          font-size: 1rem;
          text-decoration: none;
          margin-top: 1.5rem;
        }

        @media (max-width: 900px) {
          .nav-links, .nav-phone { display: none; }
          .nav-hamburger { display: block; }
        }
      `}</style>

      <nav className="nav-wrap">
        <div className="nav-inner">
          {/* LOGO */}
          <a href="/" className="nav-logo">
            <div className="nav-logo-icon">💧</div>
            Lekkage<b>Fix</b>
          </a>

          {/* DESKTOP LINKS */}
          <ul className="nav-links">
            {navItems.map(item => (
              <li key={item.key} className="nav-item"
                onMouseEnter={() => item.dropdown && openDropdown(item.key)}
                onMouseLeave={() => item.dropdown && scheduleClose()}
              >
                <a
                  href={item.href}
                  className={`nav-item-link${
                    item.key === 'lekkage'
                      ? activePath === '/lekkage' || activePath?.startsWith('/lekkage/') && !activePath?.startsWith('/lekdetectie')
                        ? ' active' : ''
                      : activePath?.startsWith(item.href) ? ' active' : ''
                  }${openMenu === item.key ? ' open' : ''}`}
                  onMouseEnter={() => item.dropdown && cancelClose()}
                >
                  {item.label}
                  {item.dropdown && <span className="chevron">▼</span>}
                </a>

                {item.dropdown && openMenu === item.key && (
                  <div
                    className="nav-dropdown"
                    onMouseEnter={cancelClose}
                    onMouseLeave={scheduleClose}
                  >
                    <div className="nav-dropdown-intro">
                      <span style={{fontSize:'0.75rem',color:'var(--muted)',fontWeight:600}}>
                        {item.label.toUpperCase()}
                      </span>
                      <a href={item.dropdown.intro.href}>{item.dropdown.intro.label}</a>
                    </div>
                    {item.dropdown.items.map((d, i) => (
                      <a key={i} href={d.href} className="nav-dd-item">
                        <div className="nav-dd-icon">{d.icon}</div>
                        <div>
                          <div className="nav-dd-label">{d.label}</div>
                          <div className="nav-dd-sub">{d.sub}</div>
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* PHONE CTA */}
          <a href={`tel:${PHONE}`} className="nav-phone">
            📞 {PHONE_DISPLAY}
          </a>

          {/* HAMBURGER */}
          <button className="nav-hamburger" onClick={() => setMobileOpen(true)} aria-label="Menu openen">
            ☰
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div className={`nav-mobile-menu${mobileOpen ? ' open' : ''}`}>
        <div className="nav-mobile-close">
          <a href="/" className="nav-logo" style={{fontSize:'1.2rem'}}>
            <div className="nav-logo-icon">💧</div>
            Lekkage<b>Fix</b>
          </a>
          <button onClick={() => setMobileOpen(false)}
            style={{background:'none',border:'none',color:'white',fontSize:'1.6rem',cursor:'pointer'}}>
            ✕
          </button>
        </div>
        <div className="nav-mobile-items">
          {navItems.map(item => (
            <div key={item.key}>
              <a href={item.href} className="nav-mobile-link">{item.label}</a>
              {item.dropdown && (
                <div className="nav-mobile-sub">
                  {item.dropdown.items.map((d, i) => (
                    <a key={i} href={d.href}>
                      <span>{d.icon}</span><span>{d.label}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <a href={`tel:${PHONE}`} className="nav-mobile-phone">📞 Bel nu: {PHONE_DISPLAY}</a>
      </div>
    </>
  )
}
