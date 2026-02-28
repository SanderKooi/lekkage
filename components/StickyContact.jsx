import { useState, useEffect, useRef } from 'react'

const PHONE = '0800-1234'
const PHONE_DISPLAY = '0800-1234'

export default function StickyContact() {
  const [exitVisible, setExitVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState(false)
  const exitShown = useRef(false)

  useEffect(() => {
    // Exit intent: muis verlaat viewport bovenaan (desktop)
    function handleMouseLeave(e) {
      if (e.clientY <= 10 && !exitShown.current && !dismissed) {
        exitShown.current = true
        setExitVisible(true)
      }
    }
    document.addEventListener('mouseleave', handleMouseLeave)

    // Sluit exit intent na 12s automatisch
    let timer
    if (exitVisible) timer = setTimeout(() => setExitVisible(false), 12000)

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      clearTimeout(timer)
    }
  }, [exitVisible, dismissed])

  function dismissExit() {
    setExitVisible(false)
    setDismissed(true)
  }

  return (
    <>
      <style>{`
        /* ─── MOBIEL STICKY BEL-BALK ─── */
        .sticky-mobile {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 800;
          background: var(--green-dark);
          border-top: 2px solid rgba(255,255,255,0.1);
          box-shadow: 0 -4px 24px rgba(0,0,0,0.2);
        }
        @media (max-width: 768px) {
          .sticky-mobile { display: block; }
        }
        .sticky-mobile-inner {
          display: flex;
        }
        .sticky-bel {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: var(--orange);
          color: white;
          text-decoration: none;
          border-radius: 0;
          padding: 1rem 1.25rem;
          font-weight: 800;
          font-size: 1rem;
          transition: background 0.2s;
        }
        .sticky-bel:active { background: var(--orange2); }
        .sticky-wa { display: none; }
        .sticky-bel svg { width: 18px; height: 18px; flex-shrink: 0; }
        .sticky-pulse {
          display: inline-block;
          width: 8px; height: 8px;
          background: #a8e6c0;
          border-radius: 50%;
          margin-right: 0.25rem;
          animation: s-ping 1.5s ease-in-out infinite;
        }

        /* ─── DESKTOP EXIT INTENT ─── */
        .exit-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          z-index: 8000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          animation: ei-fade 0.2s ease;
        }
        .exit-box {
          background: white;
          border-radius: 20px;
          padding: 2.5rem 2rem;
          max-width: 420px;
          width: 100%;
          text-align: center;
          box-shadow: 0 20px 60px rgba(0,0,0,0.25);
          position: relative;
          animation: ei-pop 0.3s cubic-bezier(0.34,1.3,0.64,1) both;
        }
        .exit-close {
          position: absolute;
          top: 1rem; right: 1rem;
          width: 32px; height: 32px;
          background: var(--green3);
          border: none;
          border-radius: 50%;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.9rem;
          color: var(--muted);
          transition: background 0.15s;
        }
        .exit-close:hover { background: var(--green4); }
        .exit-icon {
          font-size: 2.5rem;
          margin-bottom: 0.75rem;
          display: block;
        }
        .exit-box h2 {
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--text);
          margin-bottom: 0.5rem;
          line-height: 1.25;
        }
        .exit-box h2 em { color: var(--green-dark); font-style: normal; }
        .exit-box p {
          color: var(--muted);
          font-size: 0.88rem;
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }
        .exit-btns { display: flex; flex-direction: column; gap: 0.6rem; }
        .exit-btn-call {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: var(--orange);
          color: white;
          text-decoration: none;
          border-radius: 12px;
          padding: 0.9rem 1.5rem;
          font-weight: 800;
          font-size: 1rem;
          transition: background 0.2s;
          box-shadow: 0 4px 16px rgba(255,107,0,0.3);
        }
        .exit-btn-call:hover { background: var(--orange2); }
        .exit-btn-dismiss {
          background: none;
          border: none;
          color: var(--muted);
          font-size: 0.8rem;
          font-family: inherit;
          cursor: pointer;
          padding: 0.25rem;
          text-decoration: underline;
          transition: color 0.15s;
        }
        .exit-btn-dismiss:hover { color: var(--text); }
        .exit-trust {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: 1rem;
          flex-wrap: wrap;
        }
        .exit-trust span {
          font-size: 0.74rem;
          color: var(--muted);
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        @media (max-width: 768px) {
          .exit-overlay { display: none; }
        }

        @keyframes s-ping {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }
        @keyframes ei-fade { from { opacity:0 } to { opacity:1 } }
        @keyframes ei-pop {
          from { opacity:0; transform: scale(0.85) translateY(20px); }
          to   { opacity:1; transform: scale(1) translateY(0); }
        }
      `}</style>

      {/* MOBIEL STICKY BALK */}
      <div className="sticky-mobile">
        <div className="sticky-mobile-inner">
          <a href={`tel:${PHONE}`} className="sticky-bel">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.92a16 16 0 0 0 5.61 5.61l1.27-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16z"/>
            </svg>
            <span className="sticky-pulse" />
            Bel nu: {PHONE_DISPLAY}
          </a>
        </div>
      </div>

      {/* DESKTOP EXIT INTENT */}
      {exitVisible && (
        <div className="exit-overlay" onClick={e => { if(e.target === e.currentTarget) dismissExit() }}>
          <div className="exit-box">
            <button className="exit-close" onClick={dismissExit} aria-label="Sluiten">✕</button>
            <span className="exit-icon">💧</span>
            <h2>Nog een lekkage<br/><em>vraag?</em></h2>
            <p>Onze specialisten staan direct klaar. Bel ons en we zijn gemiddeld binnen 30 minuten ter plaatse — dag en nacht.</p>
            <div className="exit-btns">
              <a href={`tel:${PHONE}`} className="exit-btn-call" onClick={dismissExit}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.92a16 16 0 0 0 5.61 5.61l1.27-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16z"/></svg>
                Bel direct: {PHONE_DISPLAY}
              </a>
              <button className="exit-btn-dismiss" onClick={dismissExit}>Nee, ik ga nog even verder kijken</button>
            </div>
            <div className="exit-trust">
              <span>✓ 24/7 bereikbaar</span>
              <span>✓ 30 min ter plaatse</span>
              <span>✓ Gratis inspectie</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
