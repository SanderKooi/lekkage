// pages/[dienst]-[stad]/index.jsx
// Next.js dynamische pagina voor stad × dienst combinaties
// Voorbeeld: /daklekkage-amsterdam/

import Head from 'next/head'

export default function DienstStadPage({ dienst, stad, dienstData }) {
  const title = `${dienstData.label} ${stad} – 24/7 Spoedreparatie | LekkageFix`
  const description = `${dienstData.label} in ${stad}? Onze experts zijn binnen 30 minuten ter plaatse. ${dienstData.shortDesc} Bel nu voor een gratis offerte.`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <link rel="canonical" href={`https://lekkagefix.nl/${dienst}-${stad.toLowerCase()}/`} />
        {/* Structured data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "LekkageFix",
          "description": description,
          "areaServed": stad,
          "telephone": "0800-1234",
          "openingHours": "Mo-Su 00:00-24:00",
          "priceRange": "€€"
        })}} />
      </Head>

      <main>
        {/* Hero */}
        <section className="hero">
          <div className="hero-content">
            <span className="badge">📍 Nu actief in {stad}</span>
            <h1>{dienstData.label} {stad} – Direct geholpen</h1>
            <p>{dienstData.intro.replace('{stad}', stad)}</p>
            <div className="cta-group">
              <a href="tel:0800-1234" className="btn-primary">📞 Bel 0800-1234</a>
              <a href="#offerte" className="btn-secondary">Gratis offerte</a>
            </div>
          </div>
          <div className="lead-form" id="offerte">
            <LeadForm dienst={dienstData.label} stad={stad} />
          </div>
        </section>

        {/* Lokale content */}
        <section className="local-content">
          <h2>{dienstData.label} in {stad}: wat u moet weten</h2>
          <p>{dienstData.longDesc.replace(/\{stad\}/g, stad)}</p>
        </section>

        {/* Diensten in deze stad */}
        <RelatedServices currentDienst={dienst} stad={stad} />

        {/* Reviews */}
        <Reviews stad={stad} />

        {/* FAQ */}
        <FAQ dienst={dienstData.label} stad={stad} />
      </main>
    </>
  )
}

// Genereert alle paden: dienst × stad
export async function getStaticPaths() {
  const { diensten } = require('../../data/diensten')
  const { steden } = require('../../data/steden')

  const paths = []
  diensten.forEach(d => {
    steden.forEach(s => {
      paths.push({
        params: {
          dienst: d.slug,
          stad: s.slug
        }
      })
    })
  })

  return { paths, fallback: false }
}

// Data per pagina
export async function getStaticProps({ params }) {
  const { diensten } = require('../../data/diensten')
  const { steden } = require('../../data/steden')

  const dienstData = diensten.find(d => d.slug === params.dienst)
  const stadData = steden.find(s => s.slug === params.stad)

  if (!dienstData || !stadData) {
    return { notFound: true }
  }

  return {
    props: {
      dienst: params.dienst,
      stad: stadData.naam,
      dienstData
    }
  }
}
