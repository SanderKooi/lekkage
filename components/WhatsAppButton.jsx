import { useState, useEffect } from 'react'

const WA_NUMBER = '31612345678' // Vervang met echt nummer: 31 + nummer zonder 0
const WA_MESSAGE = 'Hallo LekkageFix, ik heb een vraag over een lekkage.'

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false)
  const [tooltip, setTooltip] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1500)
    // Check of tooltip al eerder weggeklikt is
    try {
      if (localStorage.getItem('lf_wa_tooltip_dismissed')) setTooltip(false)
    } catch(e) {}
    const t2 = setTimeout(() => setTooltip(false), 6000)
    return () => { clearTimeout(t); clearTimeout(t2) }
  }, [])

  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`

  if (!visible) return null

  return (
    <>
      <style>{`
        .wa-wrap {
          position: fixed;
          bottom: 5.5rem;
          right: 1.5rem;
          z-index: 999;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-direction: row-reverse;
        }
        /* Op mobiel zit de bel-knop al onderaan, zet wa daar net boven */
        @media (max-width: 768px) {
          .wa-wrap { bottom: 5rem; right: 1rem; }
        }
        .wa-btn {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #25D366;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          box-shadow: 0 4px 20px rgba(37,211,102,0.4);
          transition: transform 0.2s, box-shadow 0.2s;
          flex-shrink: 0;
          animation: wa-pop 0.4s cubic-bezier(0.34,1.56,0.64,1) both;
        }
        .wa-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 28px rgba(37,211,102,0.55);
        }
        .wa-btn svg { width: 30px; height: 30px; }
        .wa-pulse {
          position: absolute;
          top: 0; right: 0;
          width: 14px; height: 14px;
          border-radius: 50%;
          background: #ff4444;
          border: 2px solid white;
          animation: wa-ping 1.8s ease-in-out infinite;
        }
        .wa-tooltip {
          background: white;
          border-radius: 12px;
          padding: 0.75rem 1rem;
          box-shadow: 0 4px 24px rgba(0,0,0,0.12);
          font-size: 0.82rem;
          line-height: 1.5;
          max-width: 200px;
          position: relative;
          animation: wa-slide 0.3s ease both;
          border: 1px solid rgba(0,0,0,0.06);
        }
        .wa-tooltip::after {
          content: '';
          position: absolute;
          right: -7px;
          top: 50%;
          transform: translateY(-50%);
          border: 7px solid transparent;
          border-right: none;
          border-left-color: white;
        }
        .wa-tooltip strong { display: block; color: #128C7E; margin-bottom: 0.2rem; font-size: 0.85rem; }
        .wa-tooltip span { color: #555; }
        .wa-close {
          position: absolute;
          top: -6px; right: -6px;
          width: 18px; height: 18px;
          border-radius: 50%;
          background: #ccc;
          border: none;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.65rem;
          color: white;
          line-height: 1;
        }
        @keyframes wa-pop {
          from { transform: scale(0); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }
        @keyframes wa-ping {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.6; }
        }
        @keyframes wa-slide {
          from { opacity: 0; transform: translateX(8px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      <div className="wa-wrap">
        <a href={waUrl} target="_blank" rel="noopener noreferrer" className="wa-btn" aria-label="Chat via WhatsApp" style={{position:'relative'}}>
          <svg viewBox="0 0 32 32" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 2C8.268 2 2 8.268 2 16c0 2.442.661 4.73 1.812 6.7L2 30l7.52-1.775A13.94 13.94 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.44 11.44 0 01-5.885-1.624l-.422-.25-4.463 1.053 1.08-4.34-.277-.446A11.46 11.46 0 014.5 16C4.5 9.648 9.648 4.5 16 4.5S27.5 9.648 27.5 16 22.352 27.5 16 27.5zm6.29-8.538c-.343-.172-2.03-1.002-2.346-1.116-.315-.114-.545-.172-.774.172-.229.344-.887 1.116-1.087 1.345-.2.229-.4.258-.743.086-.343-.172-1.449-.534-2.76-1.704-1.02-.912-1.709-2.036-1.91-2.38-.2-.344-.021-.53.15-.701.154-.154.343-.4.515-.6.171-.2.228-.344.343-.573.114-.229.057-.43-.029-.601-.086-.172-.774-1.867-1.06-2.556-.28-.672-.563-.58-.774-.591l-.658-.011a1.26 1.26 0 00-.916.43c-.315.344-1.202 1.174-1.202 2.864s1.23 3.322 1.401 3.551c.172.229 2.42 3.693 5.863 5.18.82.354 1.46.565 1.959.723.823.261 1.572.224 2.164.136.66-.099 2.03-.83 2.317-1.633.286-.8.286-1.487.2-1.633-.085-.143-.314-.229-.657-.4z"/>
          </svg>
          <span className="wa-pulse" />
        </a>

        {tooltip && (
          <div className="wa-tooltip" style={{position:'relative'}}>
            <button className="wa-close" onClick={() => {
          setTooltip(false)
          try { localStorage.setItem('lf_wa_tooltip_dismissed', '1') } catch(e) {}
        }}>✕</button>
            <strong>Chat via WhatsApp</strong>
            <span>Snel antwoord op je vraag</span>
          </div>
        )}
      </div>
    </>
  )
}
