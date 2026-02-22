import Head from 'next/head'
import { useState } from 'react'

const steden = [
  { naam: 'Amsterdam', slug: 'amsterdam', prov: 'Noord-Holland', tags: ['Daklekkage','Loodgieter','Riool'] },
  { naam: 'Rotterdam', slug: 'rotterdam', prov: 'Zuid-Holland', tags: ['Daklekkage','Loodgieter','Vocht'] },
  { naam: 'Den Haag', slug: 'den-haag', prov: 'Zuid-Holland', tags: ['Daklekkage','Riool','Vocht'] },
  { naam: 'Utrecht', slug: 'utrecht', prov: 'Utrecht', tags: ['Daklekkage','Loodgieter','Riool'] },
  { naam: 'Eindhoven', slug: 'eindhoven', prov: 'Noord-Brabant', tags: ['Daklekkage','Loodgieter'] },
  { naam: 'Groningen', slug: 'groningen', prov: 'Groningen', tags: ['Daklekkage','Vocht'] },
  { naam: 'Tilburg', slug: 'tilburg', prov: 'Noord-Brabant', tags: ['Loodgieter','Riool'] },
  { naam: 'Breda', slug: 'breda', prov: 'Noord-Brabant', tags: ['Daklekkage','Riool'] },
]

const faqs = [
  { v: 'Hoe snel komen jullie bij een lekkage?', a: 'We streven ernaar zo snel mogelijk bij je te zijn. Gemiddeld zijn we binnen 30 minuten ter plaatse. Bel ons voor een actuele inschatting.' },
  { v: 'Wat kost een bezoek?', a: 'We werken met transparante tarieven. Je ontvangt altijd een duidelijke prijsopgave voordat we aan het werk gaan. Geen verborgen kosten.' },
  { v: 'Vergoedt de verzekering de lekkage?', a: 'Bij de meeste opstalverzekeringen zijn plotselinge lekkages gedekt. Wij zijn erkend door alle grote verzekeraars en helpen je met de benodigde documentatie.' },
  { v: 'Geven jullie garantie op de reparatie?', a: 'We staan achter ons werk en geven garantie op alle uitgevoerde reparaties. Mocht er iets niet naar tevredenheid zijn, lossen we dat netjes op.' },
  { v: 'Werken jullie ook buiten kantooruren?', a: 'Ja — we zijn 24 uur per dag, 7 dagen per week bereikbaar. Ook in de nacht, het weekend en op feestdagen.' },
  { v: 'In welke steden zijn jullie actief?', a: 'We werken door heel Nederland. Bekijk ons complete steden-overzicht of bel ons om te vragen of we in jouw regio actief zijn.' },
]

export default function Homepage() {
  const [openFaq, setOpenFaq] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  return (
    <>
      <Head>
        <title>Lekkage Reparatie – 24/7 Spoedhulp door heel Nederland | LekkageFix</title>
        <meta name="description" content="Lekkage? Onze vakmensen komen zo snel mogelijk naar je toe. Daklekkage, loodgieter, riool of vocht — dag en nacht bereikbaar. Gratis offerte." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              { "@type": "LocalBusiness", "name": "LekkageFix", "telephone": "0800-1234", "url": "https://lekkagefix.nl", "openingHours": "Mo-Su 00:00-24:00", "priceRange": "€€", "areaServed": "Netherlands", "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "2847" } },
              { "@type": "FAQPage", "mainEntity": faqs.map(f => ({ "@type": "Question", "name": f.v, "acceptedAnswer": { "@type": "Answer", "text": f.a } })) }
            ]
          })}}
        />
      </Head>

      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{
          --bg:#f4f7f4;--bg2:#fff;
          --green:#1a7a4a;--green2:#22924f;--green3:#e8f5ee;--green4:#d0ebda;--green-dark:#145c38;
          --orange:#e8520a;--orange2:#d4480a;
          --text:#1a2e1a;--muted:#4a6352;--muted2:#7a9482;
          --border:#ddeae2;--font:'Outfit',sans-serif;--radius:10px;
        }
        html{scroll-behavior:smooth}
        body{font-family:var(--font);background:var(--bg);color:var(--text);overflow-x:hidden;line-height:1.5}
        nav{position:sticky;top:0;z-index:100;background:var(--green-dark);display:flex;align-items:center;justify-content:space-between;padding:0 clamp(1rem,4vw,3rem);height:66px;box-shadow:0 2px 16px rgba(20,92,56,0.3)}
        .logo{font-size:1.4rem;font-weight:800;letter-spacing:-0.03em;color:white;text-decoration:none;display:flex;align-items:center;gap:0.4rem}
        .logo-icon{background:white;color:var(--green-dark);width:28px;height:28px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:0.9rem}
        .logo b{color:#a8e6c0}
        .nav-right{display:flex;align-items:center;gap:2rem}
        .nav-link{color:rgba(255,255,255,0.75);font-size:0.88rem;font-weight:500;text-decoration:none;transition:color 0.2s}
        .nav-link:hover{color:white}
        .nav-phone{display:flex;align-items:center;gap:0.5rem;background:var(--orange);color:white;padding:0.5rem 1.3rem;border-radius:var(--radius);font-weight:700;font-size:0.9rem;text-decoration:none}
        .nav-phone:hover{background:var(--orange2)}
        .hero{background:linear-gradient(150deg,var(--green-dark) 0%,var(--green) 60%,#2a9e60 100%);padding:clamp(3rem,6vw,5rem) clamp(1rem,5vw,3rem);position:relative;overflow:hidden}
        .hero::after{content:'';position:absolute;bottom:-2px;left:0;right:0;height:60px;background:var(--bg);clip-path:ellipse(55% 100% at 50% 100%)}
        .hero-dots{position:absolute;top:0;right:0;bottom:0;width:50%;background-image:radial-gradient(rgba(255,255,255,0.06) 1px,transparent 1px);background-size:28px 28px}
        .hero-inner{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 420px;gap:4rem;align-items:start;position:relative;z-index:1}
        .hero-badge{display:inline-flex;align-items:center;gap:0.5rem;background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.2);color:white;padding:0.4rem 1rem;border-radius:100px;font-size:0.78rem;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;margin-bottom:1.25rem}
        .pulse{width:7px;height:7px;background:#a8e6c0;border-radius:50%;animation:pulse 1.6s infinite;display:inline-block}
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.5;transform:scale(1.4)}}
        h1{font-size:clamp(2.4rem,4.5vw,3.8rem);font-weight:900;line-height:1.07;letter-spacing:-0.04em;color:white;margin-bottom:1.2rem}
        h1 em{font-style:normal;color:#a8e6c0}
        .hero-sub{color:rgba(255,255,255,0.8);font-size:1.05rem;line-height:1.75;margin-bottom:2.25rem;max-width:500px}
        .hero-stats{display:flex;gap:0;margin-bottom:2.5rem;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.15);border-radius:12px;overflow:hidden}
        .stat-item{flex:1;padding:1.1rem 1rem;text-align:center;border-right:1px solid rgba(255,255,255,0.1)}
        .stat-item:last-child{border-right:none}
        .stat-val{font-size:1.8rem;font-weight:800;color:white;line-height:1}
        .stat-val sup{font-size:0.85rem;color:#a8e6c0;font-weight:700}
        .stat-key{font-size:0.67rem;color:rgba(255,255,255,0.55);text-transform:uppercase;letter-spacing:0.07em;margin-top:0.2rem}
        .hero-actions{display:flex;gap:0.9rem;flex-wrap:wrap}
        .btn-call{display:flex;align-items:center;gap:0.6rem;background:var(--orange);color:white;padding:0.9rem 1.8rem;border-radius:var(--radius);font-weight:700;font-size:1rem;text-decoration:none;transition:all 0.2s;box-shadow:0 4px 20px rgba(232,82,10,0.4);border:none;cursor:pointer}
        .btn-call:hover{background:var(--orange2);transform:translateY(-2px)}
        .btn-ghost{display:flex;align-items:center;gap:0.5rem;background:rgba(255,255,255,0.12);color:white;padding:0.9rem 1.8rem;border-radius:var(--radius);font-weight:600;font-size:1rem;border:1px solid rgba(255,255,255,0.25);cursor:pointer;text-decoration:none}
        .btn-ghost:hover{background:rgba(255,255,255,0.2)}
        .form-card{background:white;border-radius:16px;padding:2rem;box-shadow:0 24px 60px rgba(0,0,0,0.2);position:relative;overflow:hidden}
        .form-card::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,var(--green),var(--orange))}
        .form-head h2{font-size:1.15rem;font-weight:700;color:var(--text);margin-bottom:0.2rem}
        .form-head p{font-size:0.82rem;color:var(--muted);margin-bottom:1.25rem}
        .fg{margin-bottom:0.8rem}
        .fg label{display:block;font-size:0.75rem;color:var(--muted);margin-bottom:0.3rem;font-weight:600}
        .fg input,.fg select,.fg textarea{width:100%;background:var(--bg);border:1.5px solid var(--border);border-radius:8px;padding:0.65rem 0.9rem;color:var(--text);font-family:var(--font);font-size:0.9rem;outline:none;transition:border-color 0.2s}
        .fg input:focus,.fg select:focus,.fg textarea:focus{border-color:var(--green);background:white}
        .fg textarea{resize:vertical;min-height:60px}
        .form-row{display:grid;grid-template-columns:1fr 1fr;gap:0.75rem}
        .btn-form{width:100%;background:var(--green);color:white;padding:0.9rem;border-radius:var(--radius);font-weight:700;font-size:0.95rem;border:none;cursor:pointer;font-family:var(--font);margin-top:0.25rem;transition:all 0.2s;box-shadow:0 4px 16px rgba(26,122,74,0.25)}
        .btn-form:hover{background:var(--green2);transform:translateY(-1px)}
        .btn-form.ok{background:#15803d}
        .form-trust{display:flex;justify-content:center;gap:1.25rem;margin-top:0.85rem;flex-wrap:wrap}
        .form-trust span{font-size:0.72rem;color:var(--muted);display:flex;align-items:center;gap:0.3rem}
        .trust-bar{background:var(--green3);border-bottom:2px solid var(--green4);padding:1rem clamp(1rem,5vw,3rem)}
        .trust-inner{max-width:1200px;margin:0 auto;display:flex;justify-content:center;gap:clamp(1rem,3vw,3rem);flex-wrap:wrap}
        .ti-item{display:flex;align-items:center;gap:0.5rem;font-size:0.82rem;font-weight:500;color:var(--muted)}
        .ti-item strong{color:var(--green-dark)}
        .ti-check{width:20px;height:20px;background:var(--green);color:white;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.65rem;font-weight:800;flex-shrink:0}
        .section{padding:5rem clamp(1rem,5vw,3rem)}
        .section-inner{max-width:1200px;margin:0 auto}
        .section-alt{background:var(--green3);border-top:1px solid var(--border);border-bottom:1px solid var(--border)}
        .sec-top{margin-bottom:2.75rem}
        .eyebrow{font-size:0.72rem;color:var(--green);font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.5rem}
        h2{font-size:clamp(1.8rem,3vw,2.5rem);font-weight:800;letter-spacing:-0.03em;line-height:1.15;color:var(--text)}
        h2 em{font-style:normal;color:var(--green)}
        .sec-sub{color:var(--muted);margin-top:0.65rem;font-size:0.95rem;max-width:560px;line-height:1.7}
        .svc-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(255px,1fr));gap:1.25rem}
        .svc{background:white;border:1.5px solid var(--border);border-radius:14px;padding:1.75rem;transition:all 0.25s;cursor:pointer}
        .svc:hover{border-color:var(--green);transform:translateY(-3px);box-shadow:0 8px 32px rgba(26,122,74,0.12)}
        .svc-icon{font-size:2.25rem;margin-bottom:1rem}
        .svc h3{font-size:1.05rem;font-weight:700;margin-bottom:0.5rem;color:var(--text)}
        .svc p{color:var(--muted);font-size:0.85rem;line-height:1.65;margin-bottom:1.25rem}
        .svc-cta{color:var(--green);font-size:0.82rem;font-weight:700}
        .steps{display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem;position:relative}
        .steps::before{content:'';position:absolute;top:24px;left:calc(12.5% + 12px);right:calc(12.5% + 12px);height:2px;background:linear-gradient(90deg,var(--green),var(--orange));z-index:0}
        .step{text-align:center;position:relative;z-index:1}
        .step-num{width:48px;height:48px;border-radius:50%;background:var(--green);color:white;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:1rem;margin:0 auto 1rem;border:3px solid #fff;box-shadow:0 0 0 3px var(--green)}
        .step h3{font-weight:700;font-size:0.95rem;margin-bottom:0.5rem;color:var(--text)}
        .step p{color:var(--muted);font-size:0.82rem;line-height:1.65}
        .cities-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1.25rem}
        .city-card{background:white;border:1.5px solid var(--border);border-radius:14px;padding:1.5rem 1.25rem;text-decoration:none;color:var(--text);transition:all 0.25s;position:relative;overflow:hidden;display:flex;flex-direction:column;gap:0.4rem}
        .city-card::before{content:'';position:absolute;bottom:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--green),var(--green2));transform:scaleX(0);transform-origin:left;transition:transform 0.25s}
        .city-card:hover{border-color:var(--green);transform:translateY(-3px);box-shadow:0 8px 32px rgba(26,122,74,0.12)}
        .city-card:hover::before{transform:scaleX(1)}
        .city-name{font-size:1rem;font-weight:700}
        .city-prov{font-size:0.75rem;color:var(--muted)}
        .city-tags{display:flex;gap:0.35rem;flex-wrap:wrap;margin-top:0.2rem}
        .city-tag{background:var(--green3);color:var(--green-dark);font-size:0.67rem;font-weight:600;padding:0.2rem 0.55rem;border-radius:100px}
        .city-arrow{margin-top:auto;padding-top:0.75rem;color:var(--green);font-size:0.78rem;font-weight:700}
        .cities-cta{display:flex;align-items:center;justify-content:space-between;background:var(--green3);border:1.5px solid var(--green4);border-radius:14px;padding:1.5rem 2rem;gap:2rem;flex-wrap:wrap}
        .cities-cta-left h3{font-size:1rem;font-weight:700;color:var(--text);margin-bottom:0.25rem}
        .cities-cta-left p{font-size:0.85rem;color:var(--muted)}
        .cities-counts{display:flex;align-items:center;gap:1.5rem;flex-shrink:0}
        .count-item{text-align:center}
        .count-num{font-size:1.6rem;font-weight:800;color:var(--green-dark);line-height:1}
        .count-num sup{font-size:1rem;color:var(--green)}
        .count-label{font-size:0.67rem;color:var(--muted);text-transform:uppercase;letter-spacing:0.07em}
        .btn-all{display:flex;align-items:center;gap:0.6rem;background:var(--green);color:white;padding:0.8rem 1.6rem;border-radius:var(--radius);font-weight:700;font-size:0.9rem;text-decoration:none;transition:all 0.2s;white-space:nowrap;box-shadow:0 4px 16px rgba(26,122,74,0.25)}
        .btn-all:hover{background:var(--green2);transform:translateY(-1px)}
        .reviews-header{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:2.5rem;gap:1rem;flex-wrap:wrap}
        .rating-summary{display:flex;align-items:center;gap:1.25rem;background:var(--green3);border:1.5px solid var(--green4);border-radius:12px;padding:1rem 1.5rem}
        .rating-big{font-size:3rem;font-weight:900;color:var(--green-dark);line-height:1}
        .stars-row{color:#f59e0b;font-size:1rem}
        .rating-count{font-size:0.75rem;color:var(--muted);margin-top:0.2rem}
        .reviews-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem}
        .review{background:white;border:1.5px solid var(--border);border-radius:14px;padding:1.75rem}
        .review-top{display:flex;justify-content:space-between;align-items:start;margin-bottom:0.9rem}
        .stars{color:#f59e0b;font-size:0.9rem}
        .review-date{font-size:0.72rem;color:var(--muted2)}
        .review-text{color:var(--muted);font-size:0.87rem;line-height:1.75;margin-bottom:1.25rem}
        .reviewer{display:flex;align-items:center;gap:0.75rem}
        .avatar{width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,var(--green-dark),var(--green2));display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.82rem;color:white;flex-shrink:0}
        .rev-name{font-weight:600;font-size:0.87rem;color:var(--text)}
        .rev-meta{font-size:0.72rem;color:var(--muted2)}
        .verified{color:var(--green);font-size:0.7rem;font-weight:600}
        .usp-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.25rem}
        .usp{background:white;border:1.5px solid var(--border);border-radius:14px;padding:1.75rem;text-align:center}
        .usp-icon{font-size:2.25rem;margin-bottom:1rem}
        .usp h3{font-weight:700;font-size:0.95rem;color:var(--text);margin-bottom:0.5rem}
        .usp p{color:var(--muted);font-size:0.82rem;line-height:1.65}
        .blog-grid{display:grid;grid-template-columns:1.6fr 1fr 1fr;gap:1.5rem}
        .blog-card{background:white;border:1.5px solid var(--border);border-radius:16px;overflow:hidden;text-decoration:none;color:var(--text);transition:all 0.25s;display:flex;flex-direction:column}
        .blog-card:hover{border-color:var(--green);transform:translateY(-3px);box-shadow:0 8px 32px rgba(26,122,74,0.12)}
        .blog-img{height:180px;position:relative;overflow:hidden}
        .blog-img-main{height:220px}
        .blog-img img{width:100%;height:100%;object-fit:cover;display:block}
        .blog-cat{position:absolute;top:1rem;left:1rem;background:var(--green);color:white;font-size:0.68rem;font-weight:700;padding:0.25rem 0.65rem;border-radius:100px;text-transform:uppercase;letter-spacing:0.05em}
        .blog-body{padding:1.25rem;display:flex;flex-direction:column;flex:1;gap:0.5rem}
        .blog-meta{font-size:0.72rem;color:var(--muted2);display:flex;gap:0.75rem}
        .blog-card h3{font-size:1rem;font-weight:700;color:var(--text);line-height:1.35}
        .blog-excerpt{color:var(--muted);font-size:0.82rem;line-height:1.65;flex:1}
        .blog-link{color:var(--green);font-size:0.8rem;font-weight:700;margin-top:auto;padding-top:0.75rem}
        .blog-cta{display:flex;justify-content:center;margin-top:2rem}
        .btn-blog{display:flex;align-items:center;gap:0.5rem;background:transparent;color:var(--green);padding:0.75rem 1.75rem;border-radius:var(--radius);font-weight:700;font-size:0.9rem;border:1.5px solid var(--green);text-decoration:none;transition:all 0.2s}
        .btn-blog:hover{background:var(--green);color:white}
        .seo-block{background:white;border:1.5px solid var(--border);border-radius:20px;overflow:hidden}
        .seo-block-inner{display:grid;grid-template-columns:1fr 1fr}
        .seo-left{padding:2.5rem;background:linear-gradient(150deg,var(--green-dark),var(--green));position:relative;overflow:hidden}
        .seo-left::before{content:'';position:absolute;top:-60px;right:-60px;width:240px;height:240px;border-radius:50%;background:rgba(255,255,255,0.05)}
        .seo-left h2{color:white;font-size:clamp(1.5rem,2.5vw,2rem);margin-bottom:1rem}
        .seo-left p{color:rgba(255,255,255,0.75);font-size:0.88rem;line-height:1.8;margin-bottom:1rem}
        .seo-tags{display:flex;flex-wrap:wrap;gap:0.5rem;margin-top:1.5rem}
        .seo-tag{background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);color:rgba(255,255,255,0.85);font-size:0.75rem;font-weight:500;padding:0.3rem 0.75rem;border-radius:100px;text-decoration:none;transition:all 0.2s}
        .seo-tag:hover{background:rgba(255,255,255,0.2);color:white}
        .seo-right{padding:2.5rem;display:flex;flex-direction:column;gap:1.25rem}
        .seo-right h3{font-size:1rem;font-weight:700;color:var(--text);margin-bottom:0.25rem}
        .seo-item{display:flex;gap:1rem;padding-bottom:1.25rem;border-bottom:1px solid var(--border)}
        .seo-item:last-child{border-bottom:none;padding-bottom:0}
        .seo-item-icon{width:40px;height:40px;background:var(--green3);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1.2rem;flex-shrink:0}
        .seo-item-text h4{font-size:0.88rem;font-weight:700;color:var(--text);margin-bottom:0.2rem}
        .seo-item-text p{font-size:0.8rem;color:var(--muted);line-height:1.65}
        .faq-grid{display:grid;grid-template-columns:1fr 1fr;gap:0.85rem;max-width:1000px;margin:0 auto}
        .faq-item{background:white;border:1.5px solid var(--border);border-radius:12px;overflow:hidden}
        .faq-q{display:flex;justify-content:space-between;align-items:center;gap:1rem;padding:1.1rem 1.3rem;cursor:pointer;font-weight:600;font-size:0.9rem;color:var(--text);transition:color 0.2s;list-style:none}
        .faq-q:hover,.faq-open .faq-q{color:var(--green)}
        .faq-arrow{font-size:0.75rem;transition:transform 0.2s;color:var(--muted)}
        .faq-open .faq-arrow{transform:rotate(180deg)}
        .faq-a{display:none;padding:0 1.3rem 1.1rem;color:var(--muted);font-size:0.85rem;line-height:1.75;border-top:1px solid var(--border)}
        .faq-open .faq-a{display:block}
        .bottom-cta{background:linear-gradient(135deg,var(--green-dark),var(--green));padding:5rem clamp(1rem,5vw,3rem);text-align:center;position:relative;overflow:hidden}
        .bottom-cta::before{content:'';position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,0.05) 1px,transparent 1px);background-size:24px 24px}
        .bottom-cta>*{position:relative;z-index:1}
        .bottom-cta h2{color:white;margin-bottom:0.75rem}
        .bottom-cta p{color:rgba(255,255,255,0.75);margin-bottom:2.5rem}
        .cta-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap}
        .btn-green-ghost{display:flex;align-items:center;gap:0.5rem;background:rgba(255,255,255,0.12);color:white;padding:0.9rem 1.8rem;border-radius:var(--radius);font-weight:600;font-size:1rem;border:1px solid rgba(255,255,255,0.3);text-decoration:none;transition:all 0.2s}
        .btn-green-ghost:hover{background:rgba(255,255,255,0.22)}
        footer{background:var(--green-dark);padding:3.5rem clamp(1rem,5vw,3rem) 2rem}
        .footer-top{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1.6fr 1fr 1fr 1fr;gap:3rem;padding-bottom:2.5rem;border-bottom:1px solid rgba(255,255,255,0.1)}
        .footer-logo{font-size:1.4rem;font-weight:800;letter-spacing:-0.03em;color:white;margin-bottom:0.75rem}
        .footer-logo b{color:#a8e6c0}
        .footer-desc{color:rgba(255,255,255,0.5);font-size:0.83rem;line-height:1.7}
        .footer-col h4{font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.35);margin-bottom:1.1rem}
        .footer-col a{display:block;color:rgba(255,255,255,0.6);font-size:0.83rem;text-decoration:none;margin-bottom:0.5rem;transition:color 0.2s}
        .footer-col a:hover{color:white}
        .footer-bottom{max-width:1200px;margin:1.75rem auto 0;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem}
        .footer-bottom p{color:rgba(255,255,255,0.3);font-size:0.75rem}
        .footer-bottom a{color:rgba(255,255,255,0.3);text-decoration:none}
        .cert-badges{display:flex;gap:0.5rem}
        .cert{background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.12);border-radius:6px;padding:0.3rem 0.7rem;font-size:0.72rem;color:rgba(255,255,255,0.5);font-weight:600}
        .mobile-cta{display:none;position:fixed;bottom:0;left:0;right:0;z-index:99;background:var(--orange);padding:1rem 1.5rem;align-items:center;justify-content:center;font-weight:700;color:white;text-decoration:none;font-size:0.95rem}
        @media(max-width:1024px){.cities-grid{grid-template-columns:repeat(2,1fr)}.usp-grid{grid-template-columns:repeat(2,1fr)}.blog-grid{grid-template-columns:1fr 1fr}.seo-block-inner{grid-template-columns:1fr}}
        @media(max-width:900px){.hero-inner{grid-template-columns:1fr}.steps{grid-template-columns:1fr 1fr}.steps::before{display:none}.footer-top{grid-template-columns:1fr 1fr}.faq-grid{grid-template-columns:1fr}.reviews-grid{grid-template-columns:1fr}.nav-link{display:none}}
        @media(max-width:600px){.form-row{grid-template-columns:1fr}.footer-top{grid-template-columns:1fr}.mobile-cta{display:flex}body{padding-bottom:58px}.steps{grid-template-columns:1fr}.cities-grid{grid-template-columns:1fr 1fr}.cities-cta{flex-direction:column;text-align:center}.cities-counts{justify-content:center}.usp-grid{grid-template-columns:1fr 1fr}.blog-grid{grid-template-columns:1fr}}
      `}</style>

      {/* NAV */}
      <nav>
        <a href="/" className="logo"><span className="logo-icon">💧</span>Lekkage<b>Fix</b></a>
        <div className="nav-right">
          <a href="#diensten" className="nav-link">Diensten</a>
          <a href="#steden" className="nav-link">Steden</a>
          <a href="#blog" className="nav-link">Blog</a>
          <a href="tel:0800-1234" className="nav-phone">📞 0800-1234</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-dots"></div>
        <div className="hero-inner">
          <div>
            <div className="hero-badge"><span className="pulse"></span>24/7 bereikbaar · heel Nederland</div>
            <h1>Lekkage<br/>reparatie — <em>snel,<br/>vakkundig &<br/>gegarandeerd.</em></h1>
            <p className="hero-sub">Daklekkage, gesprongen waterleiding, rioolprobleem of vochtige muren? Onze gecertificeerde vakmensen staan voor je klaar. Dag en nacht, ook in het weekend.</p>
            <div className="hero-stats">
              <div className="stat-item"><div className="stat-val">30<sup>min</sup></div><div className="stat-key">Gemiddeld</div></div>
              <div className="stat-item"><div className="stat-val">4.9<sup>★</sup></div><div className="stat-key">Beoordeling</div></div>
              <div className="stat-item"><div className="stat-val">12k<sup>+</sup></div><div className="stat-key">Klanten</div></div>
              <div className="stat-item"><div className="stat-val">24<sup>/7</sup></div><div className="stat-key">Bereikbaar</div></div>
            </div>
            <div className="hero-actions">
              <a href="tel:0800-1234" className="btn-call">📞 Bel nu: 0800-1234</a>
              <a href="#offerte" className="btn-ghost">Gratis offerte →</a>
            </div>
          </div>
          <div className="form-card" id="offerte">
            <div className="form-head">
              <h2>Vakman aanvragen</h2>
              <p>Gratis & vrijblijvend · we nemen snel contact op</p>
            </div>
            <div className="fg"><label>Type lekkage</label>
              <select><option>Daklekkage</option><option>Loodgieter / waterleiding</option><option>Rioollekkage</option><option>Vochtproblemen / schimmel</option><option>Weet ik niet zeker</option></select>
            </div>
            <div className="form-row">
              <div className="fg"><label>Naam</label><input type="text" placeholder="Jan de Vries" /></div>
              <div className="fg"><label>Telefoon</label><input type="tel" placeholder="06-12345678" /></div>
            </div>
            <div className="fg"><label>Postcode + stad</label><input type="text" placeholder="1011 AB Amsterdam" /></div>
            <div className="fg"><label>Omschrijving (optioneel)</label><textarea placeholder="Beschrijf kort het probleem..." /></div>
            <button className={`btn-form${submitted ? ' ok' : ''}`} onClick={() => setSubmitted(true)}>
              {submitted ? '✓ Aanvraag ontvangen!' : 'Stuur aanvraag →'}
            </button>
            <div className="form-trust"><span>🔒 Veilig</span><span>✓ Geen spam</span><span>⚡ Snelle reactie</span></div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="trust-bar">
        <div className="trust-inner">
          <div className="ti-item"><span className="ti-check">✓</span><span>Gemiddeld <strong>30 min</strong> ter plaatse</span></div>
          <div className="ti-item"><span className="ti-check">✓</span><span><strong>Garantie</strong> op al het werk</span></div>
          <div className="ti-item"><span className="ti-check">✓</span><span><strong>Transparante</strong> prijzen</span></div>
          <div className="ti-item"><span className="ti-check">✓</span><span><strong>VCA</strong> gecertificeerd</span></div>
          <div className="ti-item"><span className="ti-check">✓</span><span>Erkend door <strong>verzekeraars</strong></span></div>
        </div>
      </div>

      {/* DIENSTEN */}
      <section className="section" id="diensten">
        <div className="section-inner">
          <div className="sec-top">
            <div className="eyebrow">Specialisaties</div>
            <h2>Elk type lekkage <em>opgelost</em></h2>
            <p className="sec-sub">Van noodgeval midden in de nacht tot geplande reparatie — voor elk probleem hebben we een oplossing.</p>
          </div>
          <div className="svc-grid">
            {[
              { icon:'🏠', title:'Daklekkage', desc:'Waterindringing via plat dak, schuin dak, pannendak of dakkapel. Direct inspecteren en repareren voordat de schade groter wordt.' },
              { icon:'🔧', title:'Loodgieter', desc:'Gesprongen waterleiding, lekkende kraan, lage waterdruk of defecte boiler. Snel een ervaren loodgieter aan de deur.' },
              { icon:'🚰', title:'Rioollekkage', desc:'Verstopt of lekkend riool? Camera-inspectie zonder sloopwerk. We vinden de oorzaak en repareren duurzaam.' },
              { icon:'💧', title:'Vochtproblemen', desc:'Schimmel, condensatie of optrekkend vocht? We zoeken de bron, niet alleen het symptoom. Blijvende oplossing.' },
            ].map(s => (
              <div key={s.title} className="svc">
                <div className="svc-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <div className="svc-cta">Bekijk alle steden →</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW */}
      <section className="section section-alt">
        <div className="section-inner">
          <div className="sec-top" style={{textAlign:'center'}}><div className="eyebrow">Werkwijze</div><h2>Zo pakken we het aan</h2></div>
          <div className="steps">
            {[
              {n:'1',t:'Bel of stuur een aanvraag',p:'Direct contact, geen wachtrij. We nemen zo snel mogelijk contact op.'},
              {n:'2',t:'Vakman onderweg',p:'De dichtstbijzijnde monteur rijdt naar je toe. Gemiddeld binnen 30 minuten.'},
              {n:'3',t:'Transparante offerte',p:'Inspectie en heldere prijsopgave. Geen verborgen kosten, geen verrassingen.'},
              {n:'4',t:'Probleem opgelost',p:'Vakkundige reparatie met garantie op het werk. Netjes opgeruimd achtergelaten.'},
            ].map(s => (
              <div key={s.n} className="step"><div className="step-num">{s.n}</div><h3>{s.t}</h3><p>{s.p}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* STEDEN */}
      <section className="section" id="steden">
        <div className="section-inner">
          <div className="sec-top">
            <div className="eyebrow">Werkgebied</div>
            <h2>Actief in <em>jouw stad</em></h2>
            <p className="sec-sub">We werken door heel Nederland. Klik op jouw stad voor specifieke informatie.</p>
          </div>
          <div className="cities-grid">
            {steden.map(s => (
              <a key={s.slug} href={`/daklekkage-${s.slug}`} className="city-card">
                <div className="city-name">{s.naam}</div>
                <div className="city-prov">📍 {s.prov}</div>
                <div className="city-tags">{s.tags.map(t => <span key={t} className="city-tag">{t}</span>)}</div>
                <div className="city-arrow">Bekijk {s.naam} →</div>
              </a>
            ))}
          </div>
          <div className="cities-cta">
            <div className="cities-cta-left"><h3>Jouw stad er niet bij?</h3><p>We zijn actief in 500+ steden en plaatsen door heel Nederland.</p></div>
            <div className="cities-counts">
              <div className="count-item"><div className="count-num">500<sup>+</sup></div><div className="count-label">Steden</div></div>
              <div className="count-item"><div className="count-num">12</div><div className="count-label">Provincies</div></div>
            </div>
            <a href="/alle-steden" className="btn-all">Bekijk alle steden →</a>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section section-alt" id="reviews">
        <div className="section-inner">
          <div className="reviews-header">
            <div><div className="eyebrow">Klantervaringen</div><h2>Wat klanten zeggen</h2></div>
            <div className="rating-summary">
              <div className="rating-big">4.9</div>
              <div><div className="stars-row">★★★★★</div><div className="rating-count">2.847 reviews · Google & Trustpilot</div></div>
            </div>
          </div>
          <div className="reviews-grid">
            {[
              {i:'MV',n:'Martijn V.',c:'Amsterdam · daklekkage',d:'3 dagen geleden',t:'Zaterdagnacht daklekkage. Er was snel iemand bij me. Professioneel, vakkundig en voor een eerlijke prijs opgelost.'},
              {i:'SK',n:'Sandra K.',c:'Rotterdam · loodgieter',d:'1 week geleden',t:'Gesprongen waterleiding op zondag. Snel geholpen, transparante prijs, nette monteur. Zeker een aanrader!'},
              {i:'PD',n:'Peter D.',c:'Utrecht · vochtproblemen',d:'2 weken geleden',t:'Al maanden last van schimmel. LekkageFix heeft de echte oorzaak gevonden die anderen misten. Eindelijk een droog huis!'},
            ].map(r => (
              <div key={r.i} className="review">
                <div className="review-top"><div className="stars">★★★★★</div><div className="review-date">{r.d}</div></div>
                <p className="review-text">"{r.t}"</p>
                <div className="reviewer"><div className="avatar">{r.i}</div><div><div className="rev-name">{r.n}</div><div className="rev-meta">{r.c} · <span className="verified">✓ geverifieerd</span></div></div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USP */}
      <section className="section">
        <div className="section-inner">
          <div className="sec-top" style={{textAlign:'center'}}><div className="eyebrow">Waarom LekkageFix</div><h2>Zekerheid bij elke reparatie</h2></div>
          <div className="usp-grid">
            {[
              {i:'⚡',t:'Snel ter plaatse',p:'Gemiddeld 30 minuten. We doen ons best om zo snel mogelijk bij je te zijn, dag en nacht.'},
              {i:'💰',t:'Transparante prijzen',p:'Geen verrassingen op de rekening. Je krijgt altijd een duidelijke prijsopgave vooraf.'},
              {i:'🛡️',t:'Garantie op werk',p:'We staan achter ons werk. Mocht er iets niet kloppen, lossen we het netjes op.'},
              {i:'📋',t:'Erkend door verzekeraars',p:'Wij leveren alle documentatie voor je verzekeringsclaim. Volledig erkend en gecertificeerd.'},
            ].map(u => (
              <div key={u.t} className="usp"><div className="usp-icon">{u.i}</div><h3>{u.t}</h3><p>{u.p}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section className="section section-alt" id="blog">
        <div className="section-inner">
          <div className="sec-top">
            <div className="eyebrow">Kennisbank</div>
            <h2>Handige tips & <em>uitleg</em></h2>
            <p className="sec-sub">Alles wat je wilt weten over lekkages — van eerste hulp bij wateroverlast tot het herkennen van vochtproblemen.</p>
          </div>
          <div className="blog-grid">
            <a href="/blog/wat-te-doen-bij-daklekkage" className="blog-card">
              <div className="blog-img blog-img-main" style={{padding:0,overflow:'hidden',position:'relative'}}>
                <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80&auto=format&fit=crop" alt="Daklekkage reparatie vakman" style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}} />
                <span className="blog-cat">Daklekkage</span>
              </div>
              <div className="blog-body">
                <div className="blog-meta"><span>📅 12 feb 2025</span><span>⏱ 5 min lezen</span></div>
                <h3>Wat moet je doen bij een daklekkage? De eerste 5 stappen</h3>
                <p className="blog-excerpt">Water dat door het dak naar binnen sijpelt kan snel grote schade veroorzaken. Dit zijn de eerste stappen die je zet terwijl je wacht op de vakman.</p>
                <div className="blog-link">Lees artikel →</div>
              </div>
            </a>
            <a href="/blog/oorzaken-vochtproblemen" className="blog-card">
              <div className="blog-img" style={{padding:0,overflow:'hidden',position:'relative'}}>
                <img src="https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80&auto=format&fit=crop" alt="Vochtproblemen schimmel muur" style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}} />
                <span className="blog-cat">Vocht</span>
              </div>
              <div className="blog-body">
                <div className="blog-meta"><span>📅 5 feb 2025</span><span>⏱ 4 min</span></div>
                <h3>De 6 meest voorkomende oorzaken van vochtproblemen</h3>
                <div className="blog-link">Lees artikel →</div>
              </div>
            </a>
            <a href="/blog/verzekering-lekkage" className="blog-card">
              <div className="blog-img" style={{padding:0,overflow:'hidden',position:'relative'}}>
                <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80&auto=format&fit=crop" alt="Huis verzekering lekkage" style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}} />
                <span className="blog-cat">Verzekering</span>
              </div>
              <div className="blog-body">
                <div className="blog-meta"><span>📅 28 jan 2025</span><span>⏱ 3 min</span></div>
                <h3>Vergoedt je verzekering een lekkage? Zo zit het</h3>
                <div className="blog-link">Lees artikel →</div>
              </div>
            </a>
          </div>
          <div className="blog-cta"><a href="/blog" className="btn-blog">Bekijk alle artikelen →</a></div>
        </div>
      </section>

      {/* SEO BLOCK */}
      <section className="section">
        <div className="section-inner">
          <div className="sec-top"><div className="eyebrow">Over LekkageFix</div><h2>Lekkage reparatie in <em>Nederland</em></h2></div>
          <div className="seo-block">
            <div className="seo-block-inner">
              <div className="seo-left">
                <div className="eyebrow" style={{color:'#a8e6c0'}}>Werkgebied</div>
                <h2>Actief van noord tot zuid</h2>
                <p>LekkageFix werkt door heel Nederland. Of je nu in Amsterdam woont of in Maastricht — we hebben vakmensen in jouw regio die de lokale bouwstijlen en woningtypen kennen.</p>
                <p>Van grachtenpanden in Amsterdam met ouder dakbeschot tot rijtjeshuizen in Eindhoven met moderne leidingen — we hebben de kennis voor elk type woning.</p>
                <div className="seo-tags">
                  {[['Amsterdam','amsterdam'],['Rotterdam','rotterdam'],['Den Haag','den-haag'],['Utrecht','utrecht'],['Eindhoven','eindhoven'],['Groningen','groningen']].map(([n,s]) => (
                    <a key={s} href={`/daklekkage-${s}`} className="seo-tag">{n}</a>
                  ))}
                  <a href="/alle-steden" className="seo-tag">+ 500 steden</a>
                </div>
              </div>
              <div className="seo-right">
                <h3>Waarom snel handelen bij een lekkage?</h3>
                {[
                  {i:'🏚️',t:'Structurele schade',p:'Water dat langere tijd inwerkt op hout of isolatie veroorzaakt rottende balken en schimmelgroei. Hoe eerder je ingrijpt, hoe kleiner de schade.'},
                  {i:'🧫',t:'Schimmel en gezondheid',p:'Vochtige muren zijn een ideale voedingsbodem voor schimmel. Schimmelsporen kunnen leiden tot luchtwegklachten en allergieën.'},
                  {i:'💸',t:'Hogere herstelkosten',p:'Een kleine lekkage die vroeg wordt verholpen kost een fractie van een lekkage die weken onopgemerkt blijft.'},
                ].map(s => (
                  <div key={s.t} className="seo-item">
                    <div className="seo-item-icon">{s.i}</div>
                    <div className="seo-item-text"><h4>{s.t}</h4><p>{s.p}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section-alt">
        <div className="section-inner">
          <div className="sec-top" style={{textAlign:'center'}}><div className="eyebrow">FAQ</div><h2>Antwoorden op je vragen</h2></div>
          <div className="faq-grid">
            {faqs.map((f,i) => (
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

      {/* BOTTOM CTA */}
      <div className="bottom-cta">
        <div className="eyebrow" style={{color:'#a8e6c0'}}>Direct geholpen</div>
        <h2 style={{color:'white'}}>Lekkage? Wacht niet te lang.</h2>
        <p>Hoe eerder je belt, hoe kleiner de schade. Onze vakmensen staan voor je klaar.</p>
        <div className="cta-btns">
          <a href="tel:0800-1234" className="btn-call">📞 Bel nu: 0800-1234</a>
          <a href="#offerte" className="btn-green-ghost">Gratis offerte aanvragen</a>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <div className="footer-top">
          <div>
            <div className="footer-logo">Lekkage<b>Fix</b></div>
            <p className="footer-desc">Vakkundige lekkage reparaties door heel Nederland. Gecertificeerde vakmensen, transparante prijzen, garantie op werk.</p>
          </div>
          <div className="footer-col"><h4>Diensten</h4><a href="#">Daklekkage</a><a href="#">Loodgieter</a><a href="#">Rioollekkage</a><a href="#">Vochtproblemen</a></div>
          <div className="footer-col"><h4>Steden</h4><a href="/daklekkage-amsterdam">Amsterdam</a><a href="/daklekkage-rotterdam">Rotterdam</a><a href="/daklekkage-den-haag">Den Haag</a><a href="/daklekkage-utrecht">Utrecht</a><a href="/alle-steden">Alle steden →</a></div>
          <div className="footer-col"><h4>Contact</h4><a href="tel:0800-1234">0800-1234 (24/7)</a><a href="mailto:info@lekkagefix.nl">info@lekkagefix.nl</a><a href="#offerte">Gratis offerte</a><a href="/blog">Blog & tips</a></div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 LekkageFix · KvK <span style={{userSelect:'all'}}>89586557</span> · <a href="#">Privacy</a> · <a href="#">Voorwaarden</a></p>
          <div className="cert-badges"><span className="cert">VCA ✓</span><span className="cert">ISO 9001</span><span className="cert">Erkend verzekeraar</span></div>
        </div>
      </footer>

      <a href="tel:0800-1234" className="mobile-cta">📞 Bel nu: 0800-1234 (24/7 bereikbaar)</a>
    </>
  )
}
