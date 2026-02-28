import { useState, useEffect } from 'react'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [showDetail, setShowDetail] = useState(false)
  const [prefs, setPrefs] = useState({ analytics: true, marketing: false })

  useEffect(() => {
    try {
      const saved = localStorage.getItem('lf_cookie_consent')
      if (!saved) setVisible(true)
    } catch(e) {
      setVisible(true)
    }
  }, [])

  function acceptAll() {
    save({ analytics: true, marketing: true })
  }

  function acceptSelected() {
    save(prefs)
  }

  function rejectAll() {
    save({ analytics: false, marketing: false })
  }

  function save(p) {
    try {
      localStorage.setItem('lf_cookie_consent', JSON.stringify({ ...p, timestamp: Date.now() }))
    } catch(e) {}
    setVisible(false)
  }

  if (!visible) return null

  return (
    <>
      <style>{`
        .cookie-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.35);
          z-index: 9000;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding: 1rem;
          animation: cookie-fade 0.25s ease;
        }
        @media (min-width: 640px) {
          .cookie-backdrop { align-items: flex-end; justify-content: flex-start; padding: 1.5rem; }
        }
        .cookie-box {
          background: white;
          border-radius: 16px;
          padding: 1.5rem;
          max-width: 480px;
          width: 100%;
          box-shadow: 0 8px 48px rgba(0,0,0,0.18);
          animation: cookie-up 0.3s cubic-bezier(0.34,1.2,0.64,1) both;
        }
        .cookie-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.85rem;
        }
        .cookie-logo-icon {
          width: 28px; height: 28px;
          background: var(--green-dark);
          border-radius: 6px;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.85rem;
        }
        .cookie-logo span { font-weight: 800; font-size: 0.95rem; color: var(--green-dark); }
        .cookie-logo span b { color: var(--green); }
        .cookie-title {
          font-weight: 800;
          font-size: 1rem;
          color: var(--text);
          margin-bottom: 0.5rem;
        }
        .cookie-text {
          font-size: 0.82rem;
          color: var(--muted);
          line-height: 1.65;
          margin-bottom: 1rem;
        }
        .cookie-text a { color: var(--green); }
        .cookie-detail {
          border-top: 1px solid var(--border);
          padding-top: 1rem;
          margin-bottom: 1rem;
        }
        .cookie-toggle-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.5rem 0;
          border-bottom: 1px solid var(--border);
          gap: 1rem;
        }
        .cookie-toggle-row:last-child { border-bottom: none; }
        .cookie-toggle-info strong { font-size: 0.82rem; color: var(--text); display: block; }
        .cookie-toggle-info span { font-size: 0.74rem; color: var(--muted); }
        .cookie-toggle {
          position: relative;
          width: 40px; height: 22px;
          flex-shrink: 0;
        }
        .cookie-toggle input { opacity: 0; width: 0; height: 0; }
        .cookie-slider {
          position: absolute;
          inset: 0;
          background: #ddd;
          border-radius: 22px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .cookie-slider::before {
          content: '';
          position: absolute;
          width: 16px; height: 16px;
          left: 3px; top: 3px;
          background: white;
          border-radius: 50%;
          transition: transform 0.2s;
        }
        .cookie-toggle input:checked + .cookie-slider { background: var(--green); }
        .cookie-toggle input:checked + .cookie-slider::before { transform: translateX(18px); }
        .cookie-toggle input:disabled + .cookie-slider { cursor: default; opacity: 0.7; }
        .cookie-btns {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .cookie-btn-accept {
          background: var(--green-dark);
          color: white;
          border: none;
          border-radius: 10px;
          padding: 0.75rem;
          font-family: inherit;
          font-weight: 700;
          font-size: 0.88rem;
          cursor: pointer;
          transition: background 0.2s;
        }
        .cookie-btn-accept:hover { background: var(--green); }
        .cookie-btn-row {
          display: flex;
          gap: 0.5rem;
        }
        .cookie-btn-secondary {
          flex: 1;
          background: none;
          border: 1.5px solid var(--border);
          border-radius: 10px;
          padding: 0.65rem;
          font-family: inherit;
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--muted);
          cursor: pointer;
          transition: all 0.2s;
        }
        .cookie-btn-secondary:hover { border-color: var(--green); color: var(--green); }
        .cookie-link-btn {
          background: none;
          border: none;
          color: var(--green);
          font-size: 0.78rem;
          font-family: inherit;
          cursor: pointer;
          padding: 0;
          text-decoration: underline;
          margin-top: 0.25rem;
          display: block;
          text-align: center;
        }
        @keyframes cookie-fade { from { opacity:0 } to { opacity:1 } }
        @keyframes cookie-up {
          from { opacity:0; transform:translateY(20px) }
          to   { opacity:1; transform:translateY(0) }
        }
      `}</style>

      <div className="cookie-backdrop">
        <div className="cookie-box" role="dialog" aria-modal="true" aria-label="Cookie instellingen">
          <div className="cookie-logo">
            <div className="cookie-logo-icon">💧</div>
            <span>Lekkage<b>Fix</b></span>
          </div>

          <div className="cookie-title">Wij gebruiken cookies 🍪</div>
          <p className="cookie-text">
            We gebruiken cookies voor een goede werking van de website en om ons bezoekersverkeer te analyseren.
            Lees meer in ons <a href="#">privacybeleid</a>.
          </p>

          {showDetail && (
            <div className="cookie-detail">
              <div className="cookie-toggle-row">
                <div className="cookie-toggle-info">
                  <strong>Noodzakelijk</strong>
                  <span>Altijd actief — website werkt niet zonder</span>
                </div>
                <label className="cookie-toggle">
                  <input type="checkbox" checked disabled />
                  <span className="cookie-slider" />
                </label>
              </div>
              <div className="cookie-toggle-row">
                <div className="cookie-toggle-info">
                  <strong>Analytisch</strong>
                  <span>Bezoekersgedrag meten (Google Analytics)</span>
                </div>
                <label className="cookie-toggle">
                  <input type="checkbox" checked={prefs.analytics} onChange={e => setPrefs(p => ({...p, analytics: e.target.checked}))} />
                  <span className="cookie-slider" />
                </label>
              </div>
              <div className="cookie-toggle-row">
                <div className="cookie-toggle-info">
                  <strong>Marketing</strong>
                  <span>Gepersonaliseerde advertenties</span>
                </div>
                <label className="cookie-toggle">
                  <input type="checkbox" checked={prefs.marketing} onChange={e => setPrefs(p => ({...p, marketing: e.target.checked}))} />
                  <span className="cookie-slider" />
                </label>
              </div>
            </div>
          )}

          <div className="cookie-btns">
            <button className="cookie-btn-accept" onClick={acceptAll}>Alles accepteren</button>
            <div className="cookie-btn-row">
              {showDetail
                ? <button className="cookie-btn-secondary" onClick={acceptSelected}>Opslaan</button>
                : <button className="cookie-btn-secondary" onClick={() => setShowDetail(true)}>Instellen</button>
              }
              <button className="cookie-btn-secondary" onClick={rejectAll}>Alleen noodzakelijk</button>
            </div>
            {!showDetail && (
              <button className="cookie-link-btn" onClick={() => setShowDetail(true)}>Cookievoorkeuren aanpassen</button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
