
import Head from 'next/head'
import { useState } from 'react'
import { lekkageTypes, getType, steden } from '../../data'

export async function getStaticPaths() {
  return {
    paths: lekkageTypes.map(t => ({ params: { type: t.slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const type = getType(params.type)
  if (!type) return { notFound: true }
  return { props: { type } }
}

const reviews = [
  { naam: 'Martijn V.', stad: 'Amsterdam', tekst: 'Binnen een uur was het probleem gevonden en opgelost. Vakkundig werk voor een eerlijke prijs.', },
  { naam: 'Sandra K.', stad: 'Rotterdam', tekst: 'Snel gereageerd op mijn melding. Nette monteur, transparante prijsopgave vooraf. Aanrader!', },
  { naam: 'Peter D.', stad: 'Utrecht', tekst: 'Al weken last van het probleem. LekkageFix vond de echte oorzaak die anderen misten.', },
]

export default function LekkageType({ type }) {
  const [openFaq, setOpenFaq] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const topSteden = steden.slice(0, 24)

  const faqs = [
    { v: `Wat zijn de meest voorkomende oorzaken van ${type.naam.toLowerCase()}?`, a: `De meest voorkomende oorzaken zijn: ${type.oorzaken.join(', ')}. Een van onze specialisten inspecteert ter plaatse en bepaalt de exacte oorzaak.` },
    { v: 'Hoe snel kunnen jullie komen?', a: 'We streven ernaar zo snel mogelijk bij je te zijn — gemiddeld binnen 30 minuten ter plaatse. Bel ons voor een actuele inschatting op basis van jouw locatie.' },
    { v: 'Vergoedt mijn verzekering dit?', a: 'Plotselinge lekkages zijn bij de meeste opstalverzekeringen gedekt. Wij zijn erkend door alle grote verzekeraars en helpen je met de benodigde documentatie voor je claim.' },
    { v: 'Wat kost een reparatie?', a: 'We werken met transparante tarieven en geven altijd een duidelijke prijsopgave voordat we beginnen. Geen verborgen kosten, geen verrassingen achteraf.' },
    { v: 'Geven jullie garantie op de reparatie?', a: 'Ja — we staan achter ons werk en geven garantie op alle uitgevoerde reparaties. Mocht er iets niet naar tevredenheid zijn, lossen we het op.' },
    { v: 'Werken jullie ook buiten kantooruren?', a: 'Ja, we zijn 24 uur per dag bereikbaar, ook in het weekend en op feestdagen. Een lekkage wacht immers niet.' },
  ]

  return (
    <>
      <Head>
        <title>{type.naam} – Snel & vakkundig verholpen | LekkageFix</title>
        <meta name="description" content={`${type.naam} in huis? ${type.omschrijving} LekkageFix helpt snel en vakkundig door heel Nederland. Bel direct voor een afspraak.`} />
        <link rel="canonical" href={`https://lekkagefix.nl/lekkage/${type.slug}`} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "Service", "name": type.naam, "provider": { "@type": "LocalBusiness", "name": "LekkageFix", "telephone": "0800-1234", "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "2847" } }, "areaServed": "Netherlands", "description": type.intro },
            { "@type": "FAQPage", "mainEntity": faqs.map(f => ({ "@type": "Question", "name": f.v, "acceptedAnswer": { "@type": "Answer", "text": f.a } })) }
          ]
        })}} />
      </Head>

      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{--bg:#f4f7f4;--bg2:#fff;--green:#1a7a4a;--green2:#22924f;--green3:#e8f5ee;--green4:#d0ebda;--green-dark:#145c38;--orange:#e8520a;--orange2:#d4480a;--text:#1a2e1a;--muted:#4a6352;--muted2:#7a9482;--border:#ddeae2;--font:'Outfit',sans-serif;--radius:10px}
        html{scroll-behavior:smooth}
        body{font-family:var(--font);background:var(--bg);color:var(--text);line-height:1.5;overflow-x:hidden}
        nav{position:sticky;top:0;z-index:100;background:var(--green-dark);display:flex;align-items:center;justify-content:space-between;padding:0 clamp(1rem,4vw,3rem);height:66px;box-shadow:0 2px 16px rgba(20,92,56,0.3)}
        .logo{font-size:1.4rem;font-weight:800;color:white;text-decoration:none;display:flex;align-items:center;gap:0.4rem}
        .logo-icon{background:white;color:var(--green-dark);width:28px;height:28px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:0.9rem}
        .logo b{color:#a8e6c0}
        .nav-right{display:flex;align-items:center;gap:2rem}
        .nav-link{color:rgba(255,255,255,0.75);font-size:0.88rem;font-weight:500;text-decoration:none;transition:color 0.2s}
        .nav-link:hover{color:white}
        .nav-phone{background:var(--orange);color:white;padding:0.5rem 1.2rem;border-radius:var(--radius);font-weight:700;font-size:0.9rem;text-decoration:none}
        .nav-phone:hover{background:var(--orange2)}
        .breadcrumb-bar{background:var(--green3);border-bottom:1px solid var(--green4)}
        .breadcrumb{max-width:1200px;margin:0 auto;padding:0.7rem clamp(1rem,4vw,3rem);font-size:0.78rem;color:var(--muted);display:flex;gap:0.4rem;align-items:center;flex-wrap:wrap}
        .breadcrumb a{color:var(--green);text-decoration:none;font-weight:500}
        .breadcrumb a:hover{text-decoration:underline}
        .hero{background:linear-gradient(150deg,var(--green-dark) 0%,var(--green) 65%,#2a9e60 100%);padding:clamp(3rem,6vw,5rem) clamp(1rem,5vw,3rem);position:relative;overflow:hidden}
        .hero-dots{position:absolute;top:0;right:0;bottom:0;width:45%;background-image:radial-gradient(rgba(255,255,255,0.05) 1px,transparent 1px);background-size:26px 26px;pointer-events:none}
        .hero::after{content:'';position:absolute;bottom:-2px;left:0;right:0;height:60px;background:var(--bg);clip-path:ellipse(55% 100% at 50% 100%)}
        .hero-inner{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 420px;gap:4rem;align-items:start;position:relative;z-index:1}
        .hero-badge{display:inline-flex;align-items:center;gap:0.5rem;background:rgba(232,82,10,0.2);border:1px solid rgba(232,82,10,0.4);color:#ffb494;padding:0.35rem 0.9rem;border-radius:100px;font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:1.1rem}
        .hero-icon{font-size:3.5rem;margin-bottom:0.75rem;display:block}
        h1{font-size:clamp(2.2rem,4.2vw,3.6rem);font-weight:900;line-height:1.08;letter-spacing:-0.04em;color:white;margin-bottom:1.1rem}
        h1 em{font-style:normal;color:#a8e6c0}
        .hero-sub{color:rgba(255,255,255,0.82);font-size:1.02rem;line-height:1.75;margin-bottom:2rem;max-width:500px}
        .hero-stats{display:flex;gap:0;margin-bottom:2rem;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);border-radius:12px;overflow:hidden}
        .stat{flex:1;padding:1rem;text-align:center;border-right:1px solid rgba(255,255,255,0.08)}
        .stat:last-child{border-right:none}
        .stat-val{font-size:1.6rem;font-weight:800;color:white;line-height:1}
        .stat-val sup{font-size:0.8rem;color:#a8e6c0;font-weight:700}
        .stat-key{font-size:0.62rem;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:0.07em;margin-top:0.15rem}
        .hero-actions{display:flex;gap:0.85rem;flex-wrap:wrap}
        .btn-call{display:inline-flex;align-items:center;gap:0.55rem;background:var(--orange);color:white;padding:0.9rem 1.75rem;border-radius:var(--radius);font-weight:700;font-size:0.97rem;text-decoration:none;transition:all 0.2s;box-shadow:0 4px 20px rgba(232,82,10,0.4);border:none;cursor:pointer}
        .btn-call:hover{background:var(--orange2);transform:translateY(-2px)}
        .btn-ghost{display:inline-flex;align-items:center;gap:0.5rem;background:rgba(255,255,255,0.1);color:white;padding:0.9rem 1.75rem;border-radius:var(--radius);font-weight:600;font-size:0.97rem;border:1px solid rgba(255,255,255,0.22);text-decoration:none;transition:all 0.2s}
        .btn-ghost:hover{background:rgba(255,255,255,0.18)}
        .form-card{background:white;border-radius:16px;padding:2rem;box-shadow:0 24px 60px rgba(0,0,0,0.18);position:relative;overflow:hidden}
        .form-card::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,var(--green),var(--orange))}
        .form-title{font-size:1.1rem;font-weight:700;color:var(--text);margin-bottom:0.2rem}
        .form-sub{font-size:0.78rem;color:var(--muted);margin-bottom:1.25rem}
        .fg{margin-bottom:0.75rem}
        .fg label{display:block;font-size:0.72rem;color:var(--muted);margin-bottom:0.25rem;font-weight:600;text-transform:uppercase;letter-spacing:0.04em}
        .fg input,.fg select,.fg textarea{width:100%;background:var(--bg);border:1.5px solid var(--border);border-radius:8px;padding:0.65rem 0.9rem;color:var(--text);font-family:var(--font);font-size:0.88rem;outline:none;transition:border-color 0.2s}
        .fg input:focus,.fg select:focus,.fg textarea:focus{border-color:var(--green);background:white}
        .fg textarea{resize:vertical;min-height:60px}
        .form-row{display:grid;grid-template-columns:1fr 1fr;gap:0.7rem}
        .btn-submit{width:100%;background:var(--green);color:white;padding:0.9rem;border-radius:var(--radius);font-weight:700;font-size:0.95rem;border:none;cursor:pointer;font-family:var(--font);margin-top:0.25rem;transition:all 0.2s;box-shadow:0 4px 16px rgba(26,122,74,0.25)}
        .btn-submit:hover{background:var(--green2);transform:translateY(-1px)}
        .btn-submit.ok{background:#15803d}
        .form-trust{display:flex;justify-content:center;gap:1.25rem;margin-top:0.85rem;flex-wrap:wrap}
        .form-trust span{font-size:0.7rem;color:var(--muted);display:flex;align-items:center;gap:0.3rem}
        .trust-bar{background:white;border-bottom:2px solid var(--green4);padding:0.9rem clamp(1rem,5vw,3rem)}
        .trust-inner{max-width:1200px;margin:0 auto;display:flex;justify-content:center;gap:clamp(1rem,3vw,3rem);flex-wrap:wrap}
        .ti{display:flex;align-items:center;gap:0.5rem;font-size:0.8rem;font-weight:500;color:var(--muted)}
        .ti-check{width:18px;height:18px;background:var(--green);color:white;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.6rem;font-weight:800;flex-shrink:0}
        .ti strong{color:var(--green-dark)}
        .section{padding:4.5rem clamp(1rem,5vw,3rem)}
        .section-inner{max-width:1200px;margin:0 auto}
        .section-alt{background:var(--green3);border-top:1px solid var(--border);border-bottom:1px solid var(--border)}
        .section-white{background:white;border-top:1px solid var(--border);border-bottom:1px solid var(--border)}
        .eyebrow{font-size:0.68rem;color:var(--green);font-weight:700;text-transform:uppercase;letter-spacing:0.12em;margin-bottom:0.45rem}
        h2{font-size:clamp(1.7rem,2.8vw,2.3rem);font-weight:800;letter-spacing:-0.03em;line-height:1.15;color:var(--text)}
        h2 em{font-style:normal;color:var(--green)}
        .sec-sub{color:var(--muted);margin-top:0.6rem;font-size:0.92rem;max-width:560px;line-height:1.72}
        .sec-head{margin-bottom:2.75rem}
        .sec-head-center{text-align:center;margin-bottom:2.75rem}
        .sec-head-center .sec-sub{margin-left:auto;margin-right:auto}
        .intro-grid{display:grid;grid-template-columns:1.2fr 1fr;gap:3.5rem;align-items:start}
        .intro-text p{color:var(--muted);font-size:0.92rem;line-height:1.85;margin-bottom:1rem}
        .intro-aside{background:var(--green3);border:1.5px solid var(--green4);border-radius:16px;padding:1.75rem}
        .intro-aside h3{font-size:0.88rem;font-weight:700;color:var(--text);margin-bottom:1.25rem;padding-bottom:0.75rem;border-bottom:1px solid var(--green4)}
        .aside-item{display:flex;align-items:center;gap:1rem;padding:0.85rem 0;border-bottom:1px solid var(--green4)}
        .aside-item:last-child{border-bottom:none;padding-bottom:0}
        .aside-num{font-size:1.75rem;font-weight:900;color:var(--green-dark);line-height:1;min-width:55px}
        .aside-label{font-size:0.82rem;color:var(--muted);line-height:1.4}
        .aside-label strong{color:var(--text);display:block;font-size:0.85rem;margin-bottom:0.1rem}
        .oorzaken-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:1.1rem}
        .oorzaak{background:white;border:1.5px solid var(--border);border-radius:14px;padding:1.5rem;display:flex;align-items:flex-start;gap:1rem;transition:all 0.25s}
        .oorzaak:hover{border-color:var(--green);box-shadow:0 6px 24px rgba(26,122,74,0.1);transform:translateY(-2px)}
        .oorzaak-icon{width:40px;height:40px;background:var(--green3);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0}
        .oorzaak-text h4{font-size:0.85rem;font-weight:700;color:var(--text);margin-bottom:0.3rem}
        .oorzaak-text p{font-size:0.8rem;color:var(--muted);line-height:1.55}
        .steps{display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem;position:relative}
        .steps::before{content:'';position:absolute;top:22px;left:calc(12.5% + 11px);right:calc(12.5% + 11px);height:2px;background:linear-gradient(90deg,var(--green),var(--orange));z-index:0}
        .step{text-align:center;position:relative;z-index:1}
        .step-num{width:44px;height:44px;border-radius:50%;background:var(--green);color:white;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:0.95rem;margin:0 auto 1rem;border:3px solid var(--bg);box-shadow:0 0 0 3px var(--green)}
        .step h3{font-weight:700;font-size:0.92rem;margin-bottom:0.4rem;color:var(--text)}
        .step p{color:var(--muted);font-size:0.8rem;line-height:1.6}
        .steden-intro{display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:center;margin-bottom:2.5rem}
        .steden-stats{display:flex;align-items:center;gap:2rem;background:white;border-radius:14px;padding:1.5rem 2rem;border:1.5px solid var(--border)}
        .sstat{text-align:center}
        .sstat-num{font-size:2rem;font-weight:900;color:var(--green-dark);line-height:1}
        .sstat-num sup{font-size:1rem;color:var(--green)}
        .sstat-label{font-size:0.62rem;color:var(--muted);text-transform:uppercase;letter-spacing:0.07em;margin-top:0.2rem}
        .steden-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:0.7rem}
        .stad-a{display:flex;align-items:center;justify-content:space-between;background:white;border:1.5px solid var(--border);border-radius:10px;padding:0.8rem 1rem;color:var(--text);text-decoration:none;font-size:0.83rem;font-weight:500;transition:all 0.2s}
        .stad-a:hover{border-color:var(--green);color:var(--green-dark);background:var(--green3);transform:translateY(-1px)}
        .stad-arrow{color:var(--green);font-size:0.75rem}
        .steden-cta{display:flex;justify-content:center;margin-top:1.5rem}
        .btn-all{display:inline-flex;align-items:center;gap:0.6rem;background:var(--green);color:white;padding:0.8rem 1.75rem;border-radius:var(--radius);font-weight:700;font-size:0.9rem;text-decoration:none;transition:all 0.2s;box-shadow:0 4px 16px rgba(26,122,74,0.2)}
        .btn-all:hover{background:var(--green2);transform:translateY(-1px)}
        .reviews-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem}
        .review{background:white;border:1.5px solid var(--border);border-radius:14px;padding:1.75rem;transition:all 0.25s}
        .review:hover{border-color:var(--green);box-shadow:0 6px 24px rgba(26,122,74,0.1)}
        .review-stars{color:#f59e0b;font-size:0.9rem;margin-bottom:0.85rem}
        .review-text{color:var(--muted);font-size:0.87rem;line-height:1.75;margin-bottom:1.25rem;font-style:italic}
        .reviewer{display:flex;align-items:center;gap:0.75rem}
        .avatar{width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,var(--green-dark),var(--green2));display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.78rem;color:white;flex-shrink:0}
        .rev-name{font-weight:600;font-size:0.85rem;color:var(--text)}
        .rev-meta{font-size:0.7rem;color:var(--muted2)}
        .verified{color:var(--green);font-weight:600}
        .faq-grid{display:grid;grid-template-columns:1fr 1fr;gap:0.8rem;max-width:1000px;margin:0 auto}
        .faq-item{background:white;border:1.5px solid var(--border);border-radius:12px;overflow:hidden;transition:border-color 0.2s}
        .faq-open{border-color:var(--green)}
        .faq-q{display:flex;justify-content:space-between;align-items:center;gap:1rem;padding:1.1rem 1.3rem;cursor:pointer;font-weight:600;font-size:0.88rem;color:var(--text);transition:color 0.2s}
        .faq-q:hover,.faq-open .faq-q{color:var(--green)}
        .faq-arrow{font-size:0.7rem;transition:transform 0.25s;color:var(--muted);flex-shrink:0}
        .faq-open .faq-arrow{transform:rotate(180deg)}
        .faq-a{display:none;padding:0 1.3rem 1.1rem;color:var(--muted);font-size:0.84rem;line-height:1.78;border-top:1px solid var(--border)}
        .faq-open .faq-a{display:block}
        .types-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:1rem}
        .type-card{display:flex;align-items:center;gap:0.85rem;background:white;border:1.5px solid var(--border);border-radius:12px;padding:1.1rem 1.25rem;color:var(--text);text-decoration:none;font-weight:600;font-size:0.88rem;transition:all 0.2s}
        .type-card:hover{border-color:var(--green);color:var(--green-dark);background:var(--green3);transform:translateY(-2px)}
        .type-card-icon{font-size:1.5rem}
        .bottom-cta{background:linear-gradient(135deg,var(--green-dark),var(--green));padding:5rem clamp(1rem,5vw,3rem);text-align:center;position:relative;overflow:hidden}
        .bottom-cta::before{content:'';position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,0.04) 1px,transparent 1px);background-size:24px 24px}
        .bottom-cta>*{position:relative;z-index:1}
        .bottom-cta h2{color:white;margin-bottom:0.7rem}
        .bottom-cta p{color:rgba(255,255,255,0.75);margin-bottom:2.5rem;font-size:1rem}
        .cta-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap}
        .btn-white-ghost{display:inline-flex;align-items:center;gap:0.5rem;background:rgba(255,255,255,0.1);color:white;padding:0.9rem 1.75rem;border-radius:var(--radius);font-weight:600;font-size:0.97rem;border:1px solid rgba(255,255,255,0.28);text-decoration:none;transition:all 0.2s}
        .btn-white-ghost:hover{background:rgba(255,255,255,0.2)}
        footer{background:var(--green-dark);padding:3rem clamp(1rem,5vw,3rem) 1.75rem}
        .footer-top{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;gap:2.5rem;padding-bottom:2.5rem;border-bottom:1px solid rgba(255,255,255,0.08)}
        .footer-logo{font-size:1.35rem;font-weight:800;color:white;margin-bottom:0.65rem}
        .footer-logo b{color:#a8e6c0}
        .footer-desc{color:rgba(255,255,255,0.45);font-size:0.8rem;line-height:1.7}
        .footer-col h4{font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.3);margin-bottom:1rem}
        .footer-col a{display:block;color:rgba(255,255,255,0.55);font-size:0.8rem;text-decoration:none;margin-bottom:0.45rem;transition:color 0.2s}
        .footer-col a:hover{color:white}
        .footer-bottom{max-width:1200px;margin:1.5rem auto 0;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.75rem}
        .footer-bottom p{color:rgba(255,255,255,0.28);font-size:0.72rem}
        .footer-bottom a{color:rgba(255,255,255,0.28);text-decoration:none}
        .mobile-cta{display:none;position:fixed;bottom:0;left:0;right:0;z-index:99;background:var(--orange);padding:1rem 1.5rem;align-items:center;justify-content:center;font-weight:700;color:white;text-decoration:none;font-size:0.92rem;box-shadow:0 -4px 20px rgba(232,82,10,0.3)}
        @media(max-width:1024px){.intro-grid{grid-template-columns:1fr}.steden-intro{grid-template-columns:1fr}.footer-top{grid-template-columns:1fr 1fr}}
        @media(max-width:900px){.hero-inner{grid-template-columns:1fr}.steps{grid-template-columns:1fr 1fr}.steps::before{display:none}.reviews-grid{grid-template-columns:1fr 1fr}.faq-grid{grid-template-columns:1fr}.nav-link{display:none}}
        @media(max-width:600px){.form-row{grid-template-columns:1fr}.footer-top{grid-template-columns:1fr}.mobile-cta{display:flex}body{padding-bottom:58px}.steps{grid-template-columns:1fr}.reviews-grid{grid-template-columns:1fr}}
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

      <div className="breadcrumb-bar">
        <div className="breadcrumb">
          <a href="/">Home</a> › <a href="/lekkage">Lekkage</a> › {type.naam}
        </div>
      </div>

      <section className="hero">
        <div className="hero-dots" />
        <div className="hero-inner">
          <div>
            <div className="hero-badge">⚠️ {type.urgentie === 'hoog' ? 'Spoed aanbevolen' : 'Tijdig handelen'}</div>
            <span className="hero-icon">{type.icon}</span>
            <h1><em>{type.naam}</em><br/>vakkundig verholpen</h1>
            <p className="hero-sub">{type.intro}</p>
            <div className="hero-stats">
              <div className="stat"><div className="stat-val">30<sup>min</sup></div><div className="stat-key">Gem. reactie</div></div>
              <div className="stat"><div className="stat-val">4.9<sup>★</sup></div><div className="stat-key">Beoordeling</div></div>
              <div className="stat"><div className="stat-val">24<sup>/7</sup></div><div className="stat-key">Bereikbaar</div></div>
              <div className="stat"><div className="stat-val">100<sup>%</sup></div><div className="stat-key">Garantie</div></div>
            </div>
            <div className="hero-actions">
              <a href="tel:0800-1234" className="btn-call">📞 Bel direct: 0800-1234</a>
              <a href="#offerte" className="btn-ghost">Offerte aanvragen →</a>
            </div>
          </div>
          <div className="form-card" id="offerte">
            <div className="form-title">Vakman aanvragen</div>
            <div className="form-sub">{type.naam} · gratis & vrijblijvend</div>
            <div className="fg"><label>Stad / gemeente</label><input type="text" placeholder="Amsterdam" /></div>
            <div className="form-row">
              <div className="fg"><label>Naam</label><input type="text" placeholder="Jan de Vries" /></div>
              <div className="fg"><label>Telefoon</label><input type="tel" placeholder="06-12345678" /></div>
            </div>
            <div className="fg"><label>Beschrijving</label><textarea placeholder={`Beschrijf de ${type.naam.toLowerCase()} kort...`} /></div>
            <button className={`btn-submit${submitted ? ' ok' : ''}`} onClick={() => setSubmitted(true)}>
              {submitted ? '✓ Aanvraag ontvangen!' : 'Stuur aanvraag →'}
            </button>
            <div className="form-trust"><span>🔒 Veilig</span><span>✓ Geen spam</span><span>⚡ Snelle reactie</span></div>
          </div>
        </div>
      </section>

      <div className="trust-bar">
        <div className="trust-inner">
          <div className="ti"><span className="ti-check">✓</span><span>Gemiddeld <strong>30 min</strong> ter plaatse</span></div>
          <div className="ti"><span className="ti-check">✓</span><span><strong>Garantie</strong> op al het werk</span></div>
          <div className="ti"><span className="ti-check">✓</span><span><strong>Erkend</strong> door verzekeraars</span></div>
          <div className="ti"><span className="ti-check">✓</span><span><strong>Transparante</strong> prijzen</span></div>
          <div className="ti"><span className="ti-check">✓</span><span><strong>24/7</strong> bereikbaar</span></div>
        </div>
      </div>

      <section className="section">
        <div className="section-inner">
          <div className="intro-grid">
            <div className="intro-text">
              <div className="eyebrow">Over dit probleem</div>
              <h2>Wat is een <em>{type.naam.toLowerCase()}</em>?</h2>
              <div style={{marginTop:'1.25rem'}}>
                <p>{type.intro}</p>
                <p>Een {type.naam.toLowerCase()} vraagt om snelle actie. Hoe langer je wacht, hoe groter de schade en hoe hoger de herstelkosten. Onze gecertificeerde vakmensen staan 24 uur per dag voor je klaar.</p>
                <p>Wij werken met <strong>transparante tarieven</strong> en geven altijd een duidelijke prijsopgave voordat we beginnen. Je staat nooit voor verrassingen.</p>
              </div>
            </div>
            <div className="intro-aside">
              <h3>In het kort</h3>
              <div className="aside-item">
                <div className="aside-num">30<span style={{fontSize:'0.9rem'}}>m</span></div>
                <div className="aside-label"><strong>Gemiddelde responstijd</strong>We doen ons best zo snel mogelijk bij je te zijn</div>
              </div>
              <div className="aside-item">
                <div className="aside-num">4.9<span style={{fontSize:'0.9rem'}}>★</span></div>
                <div className="aside-label"><strong>Gemiddelde beoordeling</strong>Op basis van 2.847 klantreviews</div>
              </div>
              <div className="aside-item">
                <div className="aside-num">✓</div>
                <div className="aside-label"><strong>Erkend door verzekeraars</strong>Wij regelen de documentatie voor je claim</div>
              </div>
              <div className="aside-item">
                <div className="aside-num">24<span style={{fontSize:'0.9rem'}}>/7</span></div>
                <div className="aside-label"><strong>Dag en nacht bereikbaar</strong>Ook weekend en feestdagen</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="section-inner">
          <div className="sec-head">
            <div className="eyebrow">Oorzaken</div>
            <h2>Waardoor ontstaat <em>{type.naam.toLowerCase()}</em>?</h2>
            <p className="sec-sub">Kennis van de oorzaak is essentieel voor een blijvende oplossing — niet alleen het symptoom aanpakken.</p>
          </div>
          <div className="oorzaken-grid">
            {type.oorzaken.map((o, i) => (
              <div key={i} className="oorzaak">
                <div className="oorzaak-icon">{['🔍','⚙️','🌧️','🏚️','⏰','🔬'][i % 6]}</div>
                <div className="oorzaak-text">
                  <h4>Oorzaak {i + 1}</h4>
                  <p>{o}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="section-inner">
          <div className="sec-head-center">
            <div className="eyebrow">Werkwijze</div>
            <h2>Van melding tot <em>oplossing</em></h2>
            <p className="sec-sub">Helder en transparant — zo pakken we een {type.naam.toLowerCase()} aan.</p>
          </div>
          <div className="steps">
            <div className="step"><div className="step-num">1</div><h3>Melding</h3><p>Bel of stuur een aanvraag. We bespreken het probleem en plannen een afspraak.</p></div>
            <div className="step"><div className="step-num">2</div><h3>Vakman onderweg</h3><p>De dichtstbijzijnde monteur rijdt naar je toe. Gemiddeld binnen 30 minuten.</p></div>
            <div className="step"><div className="step-num">3</div><h3>Inspectie & offerte</h3><p>Grondige inspectie en transparante prijsopgave. Jij beslist voordat we beginnen.</p></div>
            <div className="step"><div className="step-num">4</div><h3>Opgelost</h3><p>Vakkundige reparatie met garantie op het werk. Netjes opgeruimd achtergelaten.</p></div>
          </div>
        </div>
      </section>

      <section className="section section-alt" id="steden">
        <div className="section-inner">
          <div className="steden-intro">
            <div>
              <div className="eyebrow">Werkgebied</div>
              <h2>{type.naam} in <em>jouw stad</em></h2>
              <p className="sec-sub">Selecteer jouw stad voor specifieke informatie en een directe aanvraag. We werken door heel Nederland.</p>
            </div>
            <div className="steden-stats">
              <div className="sstat"><div className="sstat-num">46<sup>+</sup></div><div className="sstat-label">Steden</div></div>
              <div className="sstat"><div className="sstat-num">12</div><div className="sstat-label">Provincies</div></div>
              <div className="sstat"><div className="sstat-num">24<sup>/7</sup></div><div className="sstat-label">Bereikbaar</div></div>
            </div>
          </div>
          <div className="steden-grid">
            {topSteden.map(s => (
              <a key={s.slug} href={`/lekkage/${type.slug}/${s.slug}`} className="stad-a">
                <span>📍 {s.naam}</span>
                <span className="stad-arrow">→</span>
              </a>
            ))}
          </div>
          <div className="steden-cta">
            <a href="/alle-steden" className="btn-all">Bekijk alle steden →</a>
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="section-inner">
          <div className="sec-head-center">
            <div className="eyebrow">Klantervaringen</div>
            <h2>Wat klanten zeggen over <em>LekkageFix</em></h2>
            <p className="sec-sub">4.9 sterren op basis van 2.847 reviews via Google en Trustpilot.</p>
          </div>
          <div className="reviews-grid">
            {reviews.map((r, i) => (
              <div key={i} className="review">
                <div className="review-stars">★★★★★</div>
                <p className="review-text">"{r.tekst}"</p>
                <div className="reviewer">
                  <div className="avatar">{r.naam.split(' ').map(n => n[0]).join('')}</div>
                  <div>
                    <div className="rev-name">{r.naam}</div>
                    <div className="rev-meta">{r.stad} · <span className="verified">✓ geverifieerd</span></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="section-inner">
          <div className="sec-head-center">
            <div className="eyebrow">Veelgestelde vragen</div>
            <h2>Alles over <em>{type.naam.toLowerCase()}</em></h2>
          </div>
          <div className="faq-grid">
            {faqs.map((f, i) => (
              <div key={i} className={`faq-item${openFaq === i ? ' faq-open' : ''}`}>
                <div className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {f.v} <span className="faq-arrow">▼</span>
                </div>
                <div className="faq-a">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="sec-head">
            <div className="eyebrow">Andere diensten</div>
            <h2>Meer <em>lekkageproblemen</em></h2>
            <p className="sec-sub">Wij lossen elk type lekkage op — van daklekkage tot rioolproblemen.</p>
          </div>
          <div className="types-grid">
            {lekkageTypes.filter(t => t.slug !== type.slug).map(t => (
              <a key={t.slug} href={`/lekkage/${t.slug}`} className="type-card">
                <span className="type-card-icon">{t.icon}</span>
                <span>{t.naam}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="bottom-cta">
        <div className="eyebrow" style={{color:'#a8e6c0'}}>{type.naam} — direct geholpen</div>
        <h2 style={{color:'white'}}>{type.naam}? Wacht niet te lang.</h2>
        <p>Hoe eerder je belt, hoe kleiner de schade. Onze vakmensen staan voor je klaar.</p>
        <div className="cta-btns">
          <a href="tel:0800-1234" className="btn-call">📞 Bel nu: 0800-1234</a>
          <a href="#offerte" className="btn-white-ghost">Offerte aanvragen</a>
        </div>
      </div>

      <footer>
        <div className="footer-top">
          <div>
            <div className="footer-logo">Lekkage<b>Fix</b></div>
            <p className="footer-desc">Vakkundige lekkage reparaties door heel Nederland. Gecertificeerde vakmensen, transparante prijzen, garantie op werk.</p>
          </div>
          <div className="footer-col">
            <h4>Diensten</h4>
            {lekkageTypes.slice(0,4).map(t => <a key={t.slug} href={`/lekkage/${t.slug}`}>{t.naam}</a>)}
          </div>
          <div className="footer-col">
            <h4>Steden</h4>
            {steden.slice(0,5).map(s => <a key={s.slug} href={`/lekkage/${type.slug}/${s.slug}`}>{s.naam}</a>)}
            <a href="/alle-steden">Alle steden →</a>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <a href="tel:0800-1234">0800-1234 (24/7)</a>
            <a href="mailto:info@lekkagefix.nl">info@lekkagefix.nl</a>
            <a href="#offerte">Gratis offerte</a>
            <a href="/blog">Blog & tips</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 LekkageFix · KvK 89586557 · <a href="/privacy">Privacy</a> · <a href="/voorwaarden">Voorwaarden</a></p>
          <p>{type.naam} · LekkageFix Nederland</p>
        </div>
      </footer>

      <a href="tel:0800-1234" className="mobile-cta">📞 Bel nu: 0800-1234 (24/7 bereikbaar)</a>
    </>
  )
}
