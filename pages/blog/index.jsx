import Head from 'next/head'
import Nav from '../../components/Nav'

const PHONE = '0800-1234'
const PHONE_DISPLAY = '0800-1234'

export const blogPosts = [
  {
    slug: 'wat-te-doen-bij-daklekkage',
    titel: 'Wat moet je doen bij een daklekkage? De eerste 5 stappen',
    excerpt: 'Water dat door het dak naar binnen sijpelt kan snel grote schade veroorzaken. Dit zijn de eerste stappen die je zet terwijl je wacht op de vakman.',
    categorie: 'Daklekkage',
    datum: '12 feb 2025',
    leestijd: '5 min',
    img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80&auto=format&fit=crop',
  },
  {
    slug: 'oorzaken-vochtproblemen',
    titel: 'De 6 meest voorkomende oorzaken van vochtproblemen',
    excerpt: 'Schimmel op de muur, een natte kelder of condensatie op de ramen — vochtproblemen zijn vervelend en kunnen gezondheidsrisico\'s opleveren. Maar wat is de oorzaak?',
    categorie: 'Vocht',
    datum: '5 feb 2025',
    leestijd: '4 min',
    img: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80&auto=format&fit=crop',
  },
  {
    slug: 'verzekering-lekkage',
    titel: 'Vergoedt je verzekering een lekkage? Zo zit het',
    excerpt: 'Bij een lekkage vraag je je al snel af: dekt mijn verzekering dit? Het antwoord hangt af van het type lekkage en je polis. We leggen het helder uit.',
    categorie: 'Verzekering',
    datum: '28 jan 2025',
    leestijd: '3 min',
    img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80&auto=format&fit=crop',
  },
]

const categorieen = ['Alle', 'Daklekkage', 'Vocht', 'Verzekering', 'Lekdetectie', 'Waterleiding']

export default function BlogArchief() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "name": "LekkageFix Blog",
        "url": "https://lekkagefix.nl/blog",
        "description": "Tips, uitleg en advies over lekkages, vochtproblemen en lekdetectie door de specialisten van LekkageFix.",
        "publisher": { "@type": "Organization", "name": "LekkageFix", "url": "https://lekkagefix.nl" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://lekkagefix.nl" },
          { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://lekkagefix.nl/blog" }
        ]
      }
    ]
  }

  return (
    <>
      <Head>
        <title>Blog & Tips over Lekkages – LekkageFix</title>
        <meta name="description" content="Alles over daklekkage, vochtproblemen, lekdetectie en verzekeringen. Praktische tips van de specialisten van LekkageFix." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://lekkagefix.nl/blog" />
        <meta property="og:title" content="Blog & Tips over Lekkages – LekkageFix" />
        <meta property="og:url" content="https://lekkagefix.nl/blog" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      </Head>

      <Nav activePath="/blog" />

      {/* HERO */}
      <div style={{background:'var(--green-dark)',padding:'4rem 0 3rem',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0,backgroundImage:'radial-gradient(circle at 70% 50%, rgba(255,255,255,0.04) 0%, transparent 60%)'}} />
        <div style={{maxWidth:'1400px',margin:'0 auto',padding:'0 clamp(2rem,6vw,6rem)',position:'relative'}}>
          <span style={{background:'rgba(255,255,255,0.12)',color:'white',fontSize:'0.72rem',fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',padding:'0.3rem 0.75rem',borderRadius:'20px',display:'inline-block',marginBottom:'1.25rem'}}>Kennisbank</span>
          <h1 style={{color:'white',fontSize:'clamp(2rem,5vw,3.25rem)',fontWeight:800,lineHeight:1.15,maxWidth:'640px',marginBottom:'1rem'}}>Tips & uitleg over <em style={{color:'#a8e6c0'}}>lekkages</em></h1>
          <p style={{color:'rgba(255,255,255,0.72)',fontSize:'1rem',lineHeight:1.75,maxWidth:'520px',margin:0}}>Alles wat je wilt weten over lekkages — van eerste hulp bij wateroverlast tot het herkennen van vochtproblemen en je verzekering.</p>
        </div>
      </div>

      {/* ARTIKELEN */}
      <section className="section section-white">
        <div className="section-inner">
          {/* FEATURED */}
          <a href={`/blog/${blogPosts[0].slug}`} className="blog-card" style={{display:'grid',gridTemplateColumns:'1.2fr 1fr',gap:'2.5rem',marginBottom:'3rem',textDecoration:'none'}}>
            <div className="blog-img blog-img-main" style={{height:'320px'}}>
              <img src={blogPosts[0].img} alt={blogPosts[0].titel} style={{width:'100%',height:'100%',objectFit:'cover'}} />
              <span className="blog-cat">{blogPosts[0].categorie}</span>
            </div>
            <div className="blog-body" style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
              <div className="blog-meta"><span>📅 {blogPosts[0].datum}</span><span>⏱ {blogPosts[0].leestijd} lezen</span></div>
              <h2 style={{fontSize:'1.5rem',marginBottom:'1rem'}}>{blogPosts[0].titel}</h2>
              <p className="blog-excerpt" style={{marginBottom:'1.5rem'}}>{blogPosts[0].excerpt}</p>
              <div className="blog-link">Lees artikel →</div>
            </div>
          </a>

          {/* GRID */}
          <div className="blog-grid">
            {blogPosts.slice(1).map(post => (
              <a key={post.slug} href={`/blog/${post.slug}`} className="blog-card" style={{textDecoration:'none'}}>
                <div className="blog-img">
                  <img src={post.img} alt={post.titel} style={{width:'100%',height:'100%',objectFit:'cover'}} />
                  <span className="blog-cat">{post.categorie}</span>
                </div>
                <div className="blog-body">
                  <div className="blog-meta"><span>📅 {post.datum}</span><span>⏱ {post.leestijd}</span></div>
                  <h3>{post.titel}</h3>
                  <p className="blog-excerpt">{post.excerpt}</p>
                  <div className="blog-link">Lees artikel →</div>
                </div>
              </a>
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
          <a href={`tel:${PHONE}`} className="btn-call">📞 Bel nu: {PHONE_DISPLAY}</a>
          <a href="/contact" className="btn-white-ghost">Gratis offerte aanvragen</a>
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
            <a href="/lekkage">Lekkage reparatie</a>
            <a href="/lekdetectie">Lekdetectie</a>
          </div>
          <div className="footer-col">
            <h4>Bedrijf</h4>
            <a href="/over-ons">Over ons</a>
            <a href="/contact">Contact</a>
            <a href="/blog">Blog & tips</a>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <a href={`tel:${PHONE}`}>0800-1234 (24/7)</a>
            <a href="mailto:info@lekkagefix.nl">info@lekkagefix.nl</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 LekkageFix · KvK 89586557 · <a href="#">Privacy</a> · <a href="#">Voorwaarden</a></p>
          <div className="cert-badges"><span className="cert">VCA ✓</span><span className="cert">ISO 9001</span><span className="cert">Erkend verzekeraar</span></div>
        </div>
      </footer>

      <a href={`tel:${PHONE}`} className="mobile-cta">📞 Bel nu: {PHONE_DISPLAY} (24/7 bereikbaar)</a>
    </>
  )
}
