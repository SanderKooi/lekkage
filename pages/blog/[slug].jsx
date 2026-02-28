import Head from 'next/head'
import Nav from '../../components/Nav'
import { useState, useEffect, useRef } from 'react'

const PHONE = '0800-1234'
const PHONE_DISPLAY = '0800-1234'

const artikelen = {
  'wat-te-doen-bij-daklekkage': {
    titel: 'Wat moet je doen bij een daklekkage? De eerste 5 stappen',
    excerpt: 'Water dat door het dak naar binnen sijpelt kan snel grote schade veroorzaken. Dit zijn de eerste stappen die je zet terwijl je wacht op de vakman.',
    categorie: 'Daklekkage',
    datum: '12 februari 2025',
    auteur: 'Henk van der Berg',
    leestijd: '5 min',
    img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80&auto=format&fit=crop',
    secties: [
      { id: 'stap-1', titel: 'Stap 1: Beperk de waterschade direct' },
      { id: 'stap-2', titel: 'Stap 2: Zoek de oorzaak' },
      { id: 'stap-3', titel: 'Stap 3: Documenteer voor de verzekeraar' },
      { id: 'stap-4', titel: 'Stap 4: Tijdelijke afdichting' },
      { id: 'stap-5', titel: 'Stap 5: Bel een specialist' },
      { id: 'veelgestelde-vragen', titel: 'Veelgestelde vragen' },
    ],
    inhoud: [
      {
        id: 'stap-1',
        titel: 'Stap 1: Beperk de waterschade direct',
        tekst: `Als je een daklekkage ontdekt, is de eerste prioriteit het beperken van de schade. Plaats emmers of bakken onder de lekkende plek en bescherm vloeren en meubels met plastic folie of handdoeken. Zet apparaten en elektrische installaties die nat dreigen te worden uit en verplaats ze indien mogelijk.

Kijk ook of het water in contact komt met elektrische bedrading of stopcontacten. Als dat het geval is, schakel dan de stroom in dat gedeelte van de woning uit via de meterkast. Veiligheid gaat voor alles.`
      },
      {
        id: 'stap-2',
        titel: 'Stap 2: Zoek de oorzaak',
        tekst: `Een daklekkage is zelden precies op de plek waar je de watervlek ziet. Water baant zich een weg langs constructiedelen, dakspanten en isolatie voordat het zichtbaar wordt op het plafond. De werkelijke oorzaak kan meters verderop zitten.

Veelvoorkomende oorzaken zijn een beschadigde dakpan, een scheur in de dakbedekking bij een plat dak, een slecht afgedichte dakdoorvoer (schoorsteen, ventilatiebuis), of verouderd lood en kitwerk rondom dakramen. Ga zelf niet op het dak als het nat of glad is — laat inspectie over aan de vakman.`
      },
      {
        id: 'stap-3',
        titel: 'Stap 3: Documenteer voor de verzekeraar',
        tekst: `Maak zo snel mogelijk foto's en video's van de schade — zowel de natte plek op het plafond als eventuele beschadigingen aan meubels of vloeren. Noteer ook het tijdstip waarop je de lekkage ontdekte.

Dit documentatiemateriaal is essentieel voor je schadeclaim bij de verzekeraar. Bewaar ook alle bonnen voor materiaal dat je koopt om de schade te beperken, zoals emmers, folie of handdoeken. Een gedetailleerd rapport van de monteur — wat wij altijd standaard opstellen — versterkt je claim aanzienlijk.`
      },
      {
        id: 'stap-4',
        titel: 'Stap 4: Tijdelijke afdichting',
        tekst: `Als je veilig kunt constateren waar het lek vandaan komt en het gaat om een beperkt defect — een losse dakpan of een zichtbaar gat in de afdichting — kun je een tijdelijke noodoplossing toepassen. Dakdichttape of bitumineuze kit zijn tijdelijk effectief totdat de vakman arriveert.

Let op: een tijdelijke oplossing is geen definitieve reparatie. Gebruik nooit gewone tape of kit die niet voor dakgebruik bedoeld is — dat verergert het probleem vaak. Wacht altijd op een professionele inspectie en reparatie.`
      },
      {
        id: 'stap-5',
        titel: 'Stap 5: Bel een specialist',
        tekst: `Een daklekkage lost zichzelf niet op en wordt bij uitstel vrijwel altijd erger. Hoe langer water in de constructie trekt, hoe groter de kans op rotting, schimmel en structurele schade. De kosten van een tijdig reparatiekan een fractie zijn van wat je betaalt als de schade escaleert.

Een gecertificeerde dakspecialist inspecteert systematisch het dak, stelt de exacte oorzaak vast en geeft een transparante offerte vooraf. Bij LekkageFix zijn we gemiddeld binnen 30 minuten ter plaatse, ook 's nachts en in het weekend.`
      },
      {
        id: 'veelgestelde-vragen',
        titel: 'Veelgestelde vragen over daklekkage',
        tekst: ''
      },
    ],
    faqs: [
      { v: 'Wat kost het repareren van een daklekkage?', a: 'De kosten hangen sterk af van de oorzaak en omvang. Een kleine reparatie zoals een dakpan terugleggen of kit vernieuwen kost doorgaans weinig. Grotere werkzaamheden zoals het gedeeltelijk vernieuwen van dakbedekking zijn duurder. Je ontvangt altijd een transparante offerte vooraf.' },
      { v: 'Vergoedt mijn verzekering een daklekkage?', a: 'Dat hangt af van de oorzaak. Plotselinge schade door storm of een vallende boom is bij de meeste opstalverzekeringen gedekt. Slijtage door achterstallig onderhoud is dat doorgaans niet. Wij stellen een gedetailleerd rapport op dat je kunt indienen bij je verzekeraar.' },
      { v: 'Hoe lang duurt een daklekkage reparatie?', a: 'Kleine reparaties zijn vaak binnen een uur klaar. Grotere werkzaamheden kunnen een halve dag tot een dag in beslag nemen. Na inspectie geven we een realistische tijdsinschatting.' },
    ]
  },

  'oorzaken-vochtproblemen': {
    titel: 'De 6 meest voorkomende oorzaken van vochtproblemen',
    excerpt: 'Schimmel op de muur, een natte kelder of condensatie op de ramen — vochtproblemen zijn vervelend en kunnen gezondheidsrisico\'s opleveren. Maar wat is de oorzaak?',
    categorie: 'Vocht',
    datum: '5 februari 2025',
    auteur: 'Rob Hofstra',
    leestijd: '4 min',
    img: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=1200&q=80&auto=format&fit=crop',
    secties: [
      { id: 'oorzaak-1', titel: '1. Condensatie' },
      { id: 'oorzaak-2', titel: '2. Optrekkend vocht' },
      { id: 'oorzaak-3', titel: '3. Doorslaand vocht' },
      { id: 'oorzaak-4', titel: '4. Lekkage waterleiding' },
      { id: 'oorzaak-5', titel: '5. Daklekkage' },
      { id: 'oorzaak-6', titel: '6. Slechte ventilatie' },
      { id: 'wanneer-specialist', titel: 'Wanneer een specialist inschakelen?' },
    ],
    inhoud: [
      {
        id: 'oorzaak-1',
        titel: '1. Condensatie',
        tekst: `Condensatie is de meest voorkomende oorzaak van vochtproblemen in Nederlandse woningen. Warm, vochtig lucht in de woning — ontstaan door koken, douchen, ademen en drogen van kleding — koelt af bij contact met koude oppervlakken zoals ramen, buitenmuren en hoeken. Hierbij slaat vocht neer.

Condensatie herken je aan waterdruppels op ramen, vochtige muren in hoeken en schimmel die bij buitenlucht-zijden begint. Oplossing: betere ventilatie, een mechanisch ventilatiesysteem of warmteterugwinning.`
      },
      {
        id: 'oorzaak-2',
        titel: '2. Optrekkend vocht',
        tekst: `Optrekkend vocht treedt op wanneer grondwater via de fundering en muren omhoog trekt. Dit is een klassiek probleem in oudere woningen zonder of met verouderde vochtbarrière (horizontale isolatielaag in de muur).

Je herkent optrekkend vocht aan een witachtige aanslag (kalkuitbloeiing) onderaan de muren, verkleurde en afbladderende verf of behang op geringe hoogte, en een typische muffe geur. Optrekkend vocht treft vaak woningen gebouwd vóór 1960.`
      },
      {
        id: 'oorzaak-3',
        titel: '3. Doorslaand vocht',
        tekst: `Doorslaand vocht ontstaat wanneer regenwater via de buitengevel naar binnen dringt. Dit kan door beschadigde voegen, scheuren in de gevel, een poreuze buitenmuur of een slecht afgewerkt kozijn.

Het verschil met optrekkend vocht: doorslaand vocht verschijnt hoger in de muur en wordt erger na regen. Gevels op het zuiden en westen zijn het meest kwetsbaar, omdat die het meest blootgesteld worden aan slagregen.`
      },
      {
        id: 'oorzaak-4',
        titel: '4. Lekkage waterleiding',
        tekst: `Een langzaam lekkende waterleiding kan weken of maanden onopgemerkt blijven, terwijl de schade steeds groter wordt. Kleine scheuren in leidingen, een lekkende verbinding of corrosie bij oudere koperen leidingen zijn veelvoorkomende oorzaken.

Signalen zijn een onverklaarbare stijging van je waterrekening, vochtige plekken op vloer of wand zonder duidelijke oorzaak, of een aanhoudende schimmelgeur. Lekdetectie zonder sloopwerk kan de exacte locatie achterhalen.`
      },
      {
        id: 'oorzaak-5',
        titel: '5. Daklekkage',
        tekst: `Een daklekkage manifesteert zich vaak als vochtige plekken op het plafond of bovenaan de wanden. Het treedt meestal op na regen en kan worden veroorzaakt door beschadigde dakpannen, verouderd bitumen bij een plat dak, of een slecht afgedichte doorvoer.

Het verraderlijke van daklekkages: het water kan meters ver langs dakspanten lopen voordat het zichtbaar wordt. De natte vlek op het plafond geeft daardoor zelden de exacte oorzaak aan.`
      },
      {
        id: 'oorzaak-6',
        titel: '6. Slechte ventilatie',
        tekst: `Onvoldoende ventilatie is de stille veroorzaker achter veel vochtproblemen. Wanneer vochtige lucht niet afgevoerd wordt, stijgt de relatieve luchtvochtigheid in de woning. Dit bevordert condensatie en biedt een ideale omgeving voor schimmelgroei.

Keuken, badkamer en toilet zijn de grootste vochtbronnen. Zorg voor adequate afzuiging en laat mechanische ventilatie regelmatig controleren. In oudere, goed geïsoleerde woningen is dit extra aandachtspunt.`
      },
      {
        id: 'wanneer-specialist',
        titel: 'Wanneer een specialist inschakelen?',
        tekst: `Schakel altijd een specialist in bij: terugkerende schimmelplekken ondanks reinigen, vochtige muren zonder duidelijke oorzaak, een aanhoudende muffe geur, zichtbare schade aan constructiedelen of wanneer je twijfelt over de oorzaak.

Vochtproblemen lossen zichzelf niet op. Hoe langer je wacht, hoe groter de schade aan constructie, isolatie en gezondheid. Een vakkundige diagnose is altijd de eerste stap naar een blijvende oplossing.`
      },
    ],
    faqs: [
      { v: 'Hoe onderscheid ik condensatie van een lekkage?', a: 'Condensatie treedt op bij kou en verdwijnt zodra het warmer wordt of de ventilatie verbetert. Een lekkage is locatiegebonden, wordt erger na regen en verdwijnt niet vanzelf. Bij twijfel laat je het altijd inspecteren.' },
      { v: 'Is schimmel door vocht gevaarlijk?', a: 'Schimmel kan gezondheidsklachten veroorzaken, met name bij mensen met luchtwegproblemen of allergieën. Verwijder schimmel altijd met geschikte middelen en pak de oorzaak aan.' },
      { v: 'Wat kost een vochtonderzoek?', a: 'De kosten hangen af van de methode en omvang. We geven altijd een transparante offerte vooraf na een eerste inspectie.' },
    ]
  },

  'verzekering-lekkage': {
    titel: 'Vergoedt je verzekering een lekkage? Zo zit het',
    excerpt: 'Bij een lekkage vraag je je al snel af: dekt mijn verzekering dit? Het antwoord hangt af van het type lekkage en je polis. We leggen het helder uit.',
    categorie: 'Verzekering',
    datum: '28 januari 2025',
    auteur: 'Marco de Wit',
    leestijd: '3 min',
    img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80&auto=format&fit=crop',
    secties: [
      { id: 'opstalverzekering', titel: 'Opstalverzekering' },
      { id: 'inboedelverzekering', titel: 'Inboedelverzekering' },
      { id: 'wat-vergoed', titel: 'Wat wordt vergoed?' },
      { id: 'wat-niet', titel: 'Wat wordt niet vergoed?' },
      { id: 'claim-indienen', titel: 'Claim indienen: zo doe je dat' },
      { id: 'veelgestelde-vragen', titel: 'Veelgestelde vragen' },
    ],
    inhoud: [
      {
        id: 'opstalverzekering',
        titel: 'Opstalverzekering',
        tekst: `De opstalverzekering dekt schade aan de woning zelf — muren, vloeren, plafonds en vaste installaties. Voor lekkages is dit de meest relevante verzekering. Plotselinge en onvoorziene waterschade door een gesprongen leiding, een storm die dakpannen beschadigt of een plotselinge daklekkage vallen doorgaans onder de dekking.

De sleutelwoorden zijn "plotseling" en "onvoorzien". Schade die ontstaat door slijtage, achterstallig onderhoud of een gebrek dat de verzekerde kende of had moeten kennen, valt buiten de dekking.`
      },
      {
        id: 'inboedelverzekering',
        titel: 'Inboedelverzekering',
        tekst: `De inboedelverzekering dekt schade aan je bezittingen — meubels, apparatuur, kleding en dergelijke. Als een lekkage schade veroorzaakt aan je inboedel, kan dit vergoed worden via de inboedelverzekering. Ook hier geldt dat de oorzaak plotseling en onvoorzien moet zijn.

Heb je beide verzekeringen? Dan dekt de opstal de schade aan de woning en de inboedel de schade aan je spullen. Sommige polissen combineren beide dekkingen.`
      },
      {
        id: 'wat-vergoed',
        titel: 'Wat wordt doorgaans vergoed?',
        tekst: `De volgende situaties vallen bij de meeste polissen onder de dekking: een gesprongen waterleiding, schade door een storm (dakpannen, dakramen), plotselinge daklekkage als gevolg van extreme neerslag, lekkage door een defecte cv-installatie en schade door bluswater na brand.

Wij zijn erkend door alle grote Nederlandse verzekeraars. Na een inspectie stellen we altijd een gedetailleerd rapport op met oorzaak, omvang en hersteladvies — precies wat je nodig hebt voor een succesvolle claim.`
      },
      {
        id: 'wat-niet',
        titel: 'Wat wordt niet vergoed?',
        tekst: `Niet vergoed worden doorgaans: schade door achterstallig onderhoud (verouderd kitwerk, een al jaren lekkend dak), geleidelijke schade die over lange tijd is ontstaan, vochtproblemen door condensatie of slechte ventilatie, en schade die al bestond voor het afsluiten van de verzekering.

Tip: lees je polisvoorwaarden goed door op het begrip "geleidelijke schade". Sommige verzekeraars hanteren een ruimere interpretatie dan andere.`
      },
      {
        id: 'claim-indienen',
        titel: 'Claim indienen: zo doe je dat',
        tekst: `Meld de schade zo snel mogelijk bij je verzekeraar — de meeste polissen hebben een meldtermijn. Documenteer de schade met foto's en video's voordat je begint met opruimen. Noteer het tijdstip van ontdekking en bewaar bonnen van noodmaatregelen die je treft.

Een expertrapport van een gecertificeerde lekkagespecialist versterkt je claim aanzienlijk. Bij LekkageFix leveren we standaard een gedetailleerd inspectierapport met de oorzaak van de schade, de gebruikte methode en het hersteladvies. Dit rapport is opgesteld in het format dat verzekeraars accepteren.`
      },
      {
        id: 'veelgestelde-vragen',
        titel: 'Veelgestelde vragen',
        tekst: ''
      },
    ],
    faqs: [
      { v: 'Moet ik de lekkage zelf betalen als de verzekeraar niet uitkeert?', a: 'Als de verzekeraar de claim afwijst, ben je zelf verantwoordelijk voor de reparatiekosten. Laat bij twijfel een second opinion uitvoeren door een onafhankelijke expert.' },
      { v: 'Hoe lang duurt een schadeclaim bij de verzekeraar?', a: 'Dat verschilt per verzekeraar en omvang van de schade. Eenvoudige claims worden vaak binnen 2-3 weken afgehandeld. Grotere schades waarbij een expert ingeschakeld wordt kunnen langer duren.' },
      { v: 'Kan LekkageFix helpen bij de schadeclaim?', a: 'Ja. Wij stellen standaard een gedetailleerd inspectierapport op dat je direct kunt indienen bij je verzekeraar. Op verzoek nemen we ook contact op met de schadeafdeling.' },
    ]
  }
}

export async function getStaticPaths() {
  return {
    paths: Object.keys(artikelen).map(slug => ({ params: { slug } })),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const artikel = artikelen[params.slug]
  if (!artikel) return { notFound: true }
  return { props: { artikel, slug: params.slug } }
}

export default function BlogArtikel({ artikel, slug }) {
  const [actieveSecite, setActieveSectie] = useState(artikel.secties[0]?.id)
  const contentRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActieveSectie(entry.target.id)
      })
    }, { rootMargin: '-20% 0px -70% 0px' })

    artikel.secties.forEach(s => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "headline": artikel.titel,
        "description": artikel.excerpt,
        "image": artikel.img,
        "datePublished": artikel.datum,
        "author": { "@type": "Person", "name": artikel.auteur },
        "publisher": { "@type": "Organization", "name": "LekkageFix", "url": "https://lekkagefix.nl" },
        "mainEntityOfPage": `https://lekkagefix.nl/blog/${slug}`
      },
      {
        "@type": "FAQPage",
        "mainEntity": artikel.faqs.map(f => ({
          "@type": "Question",
          "name": f.v,
          "acceptedAnswer": { "@type": "Answer", "text": f.a }
        }))
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://lekkagefix.nl" },
          { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://lekkagefix.nl/blog" },
          { "@type": "ListItem", "position": 3, "name": artikel.titel, "item": `https://lekkagefix.nl/blog/${slug}` }
        ]
      }
    ]
  }

  return (
    <>
      <Head>
        <title>{artikel.titel} – LekkageFix</title>
        <meta name="description" content={artikel.excerpt} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={`https://lekkagefix.nl/blog/${slug}`} />
        <meta property="og:title" content={`${artikel.titel} – LekkageFix`} />
        <meta property="og:description" content={artikel.excerpt} />
        <meta property="og:image" content={artikel.img} />
        <meta property="og:url" content={`https://lekkagefix.nl/blog/${slug}`} />
        <meta property="og:type" content="article" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
        <style>{`
          @media (max-width: 900px) {
            .artikel-grid { grid-template-columns: 1fr !important; }
            .toc-sidebar { display: none !important; }
          }
        `}</style>
      </Head>

      <Nav activePath="/blog" />

      {/* HERO ARTIKEL */}
      <section style={{background:'var(--green-dark)',padding:'4rem 0 0',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0,backgroundImage:'radial-gradient(circle at 70% 50%, rgba(255,255,255,0.04) 0%, transparent 60%)'}} />
        <div style={{maxWidth:'1400px',margin:'0 auto',padding:'0 clamp(2rem,6vw,6rem)'}}>
          <div style={{marginBottom:'1.5rem'}}>
            <a href="/blog" style={{color:'rgba(255,255,255,0.6)',fontSize:'0.82rem',textDecoration:'none',fontWeight:500,display:'inline-flex',alignItems:'center',gap:'0.4rem'}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              Terug naar blog
            </a>
          </div>
          <span style={{background:'rgba(255,255,255,0.12)',color:'white',fontSize:'0.72rem',fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',padding:'0.3rem 0.75rem',borderRadius:'20px',display:'inline-block',marginBottom:'1rem'}}>{artikel.categorie}</span>
          <h1 style={{color:'white',fontSize:'clamp(1.75rem,4vw,2.75rem)',fontWeight:800,lineHeight:1.2,maxWidth:'760px',marginBottom:'1.25rem'}}>{artikel.titel}</h1>
          <div style={{display:'flex',alignItems:'center',gap:'1.5rem',marginBottom:'2.5rem',flexWrap:'wrap'}}>
            <span style={{color:'rgba(255,255,255,0.7)',fontSize:'0.82rem',display:'flex',alignItems:'center',gap:'0.4rem'}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              {artikel.auteur}
            </span>
            <span style={{color:'rgba(255,255,255,0.7)',fontSize:'0.82rem',display:'flex',alignItems:'center',gap:'0.4rem'}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              {artikel.datum}
            </span>
            <span style={{color:'rgba(255,255,255,0.7)',fontSize:'0.82rem',display:'flex',alignItems:'center',gap:'0.4rem'}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              {artikel.leestijd} lezen
            </span>
          </div>
        </div>
        <div style={{maxWidth:'1400px',margin:'0 auto',padding:'0 clamp(2rem,6vw,6rem)'}}>
          <img src={artikel.img} alt={artikel.titel} style={{width:'100%',maxWidth:'900px',height:'340px',objectFit:'cover',borderRadius:'16px 16px 0 0',display:'block'}} />
        </div>
      </section>

      {/* ARTIKEL BODY */}
      <section className="section section-white">
        <div className="section-inner">
          <div className="artikel-grid" style={{display:'grid',gridTemplateColumns:'1fr 280px',gap:'3rem',alignItems:'start'}}>

            {/* CONTENT */}
            <div ref={contentRef}>
              <p style={{fontSize:'1.05rem',color:'var(--muted)',lineHeight:1.9,marginBottom:'2.5rem',fontStyle:'italic',borderLeft:'3px solid var(--green)',paddingLeft:'1.25rem'}}>
                {artikel.excerpt}
              </p>

              {artikel.inhoud.map((sectie, i) => (
                <div key={sectie.id} id={sectie.id} style={{marginBottom:'2.5rem',scrollMarginTop:'90px'}}>
                  <h2 style={{fontSize:'1.35rem',fontWeight:800,marginBottom:'1rem',color:'var(--text)'}}>{sectie.titel}</h2>
                  {sectie.tekst && sectie.tekst.split('\n\n').map((alinea, j) => (
                    <p key={j} style={{color:'var(--muted)',lineHeight:1.85,marginBottom:'1rem',fontSize:'0.95rem'}}>{alinea}</p>
                  ))}
                  {/* FAQ sectie */}
                  {sectie.id === 'veelgestelde-vragen' && (
                    <div style={{display:'flex',flexDirection:'column',gap:'0.75rem',marginTop:'1rem'}}>
                      {artikel.faqs.map((f, k) => (
                        <div key={k} style={{background:'var(--green3)',border:'1px solid var(--green4)',borderRadius:'10px',padding:'1rem 1.25rem'}}>
                          <div style={{fontWeight:700,fontSize:'0.9rem',color:'var(--text)',marginBottom:'0.4rem'}}>{f.v}</div>
                          <div style={{fontSize:'0.85rem',color:'var(--muted)',lineHeight:1.7}}>{f.a}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* CTA IN ARTIKEL */}
              <div style={{background:'var(--green-dark)',borderRadius:'16px',padding:'2rem',marginTop:'3rem',textAlign:'center'}}>
                <div style={{color:'#a8e6c0',fontSize:'0.8rem',fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',marginBottom:'0.5rem'}}>Direct geholpen</div>
                <h3 style={{color:'white',fontSize:'1.25rem',marginBottom:'0.75rem'}}>Heb je een lekkage?</h3>
                <p style={{color:'rgba(255,255,255,0.75)',fontSize:'0.88rem',marginBottom:'1.25rem'}}>Onze specialisten staan klaar. Gemiddeld binnen 30 minuten ter plaatse.</p>
                <a href={`tel:${PHONE}`} className="btn-call" style={{justifyContent:'center'}}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight:"0.4rem"}}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.92a16 16 0 0 0 5.61 5.61l1.27-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16z"/></svg>Bel direct: {PHONE_DISPLAY}</a>
              </div>
            </div>

            {/* INHOUDSOPGAVE SIDEBAR */}
            <div className="toc-sidebar" style={{position:'sticky',top:'90px'}}>
              <div style={{background:'var(--green3)',border:'1.5px solid var(--green4)',borderRadius:'14px',padding:'1.25rem'}}>
                <div style={{fontSize:'0.72rem',fontWeight:700,color:'var(--green-dark)',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:'0.75rem'}}>Inhoudsopgave</div>
                <div style={{display:'flex',flexDirection:'column',gap:'0.2rem'}}>
                  {artikel.secties.map(s => (
                    <a key={s.id} href={`#${s.id}`}
                      style={{fontSize:'0.82rem',color: actieveSecite === s.id ? 'var(--green-dark)' : 'var(--muted)',fontWeight: actieveSecite === s.id ? 700 : 400,textDecoration:'none',padding:'0.35rem 0.5rem',borderRadius:'6px',background: actieveSecite === s.id ? 'white' : 'transparent',transition:'all 0.15s',lineHeight:1.4}}>
                      {s.titel}
                    </a>
                  ))}
                </div>
              </div>

              {/* MINI CONTACT CARD */}
              <div style={{background:'white',border:'1.5px solid var(--border)',borderRadius:'14px',padding:'1.25rem',marginTop:'1rem'}}>
                <div style={{fontWeight:700,fontSize:'0.85rem',marginBottom:'0.4rem'}}>Spoed nodig?</div>
                <p style={{fontSize:'0.78rem',color:'var(--muted)',marginBottom:'0.85rem',lineHeight:1.6}}>Gemiddeld binnen 30 min ter plaatse. 24/7 bereikbaar.</p>
                <a href={`tel:${PHONE}`} className="btn-call" style={{width:'100%',justifyContent:'center',fontSize:'0.82rem',background:'var(--orange)'}}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight:'0.4rem'}}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.92a16 16 0 0 0 5.61 5.61l1.27-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16z"/></svg>{PHONE_DISPLAY}</a>
              </div>

              {/* GERELATEERDE ARTIKELEN */}
              <div style={{background:'white',border:'1.5px solid var(--border)',borderRadius:'14px',padding:'1.25rem',marginTop:'1rem'}}>
                <div style={{fontSize:'0.72rem',fontWeight:700,color:'var(--muted)',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:'0.75rem'}}>Meer artikelen</div>
                {Object.entries(artikelen).filter(([s]) => s !== slug).map(([s, a]) => (
                  <a key={s} href={`/blog/${s}`} style={{display:'block',textDecoration:'none',marginBottom:'0.75rem'}}>
                    <div style={{fontSize:'0.8rem',fontWeight:600,color:'var(--text)',lineHeight:1.4,marginBottom:'0.2rem'}}>{a.titel}</div>
                    <div style={{fontSize:'0.72rem',color:'var(--muted)'}}>{a.categorie} · {a.leestijd}</div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <div className="bottom-cta">
        <div className="eyebrow" style={{color:'#a8e6c0'}}>Direct geholpen</div>
        <h2 style={{color:'white'}}>Lekkage? Wacht niet te lang.</h2>
        <p>Hoe eerder je belt, hoe kleiner de schade.</p>
        <div className="cta-btns">
          <a href={`tel:${PHONE}`} className="btn-call"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight:"0.4rem"}}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.92a16 16 0 0 0 5.61 5.61l1.27-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16z"/></svg>Bel nu: {PHONE_DISPLAY}</a>
          <a href="/contact" className="btn-white-ghost">Gratis offerte aanvragen</a>
        </div>
      </div>

      <footer>
        <div className="footer-top">
          <div>
            <div className="footer-logo">Lekkage<b>Fix</b></div>
            <p className="footer-desc">Vakkundige lekkage reparaties door heel Nederland.</p>
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

      <a href={`tel:${PHONE}`} className="mobile-cta"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight:"0.4rem"}}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.92a16 16 0 0 0 5.61 5.61l1.27-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16z"/></svg>Bel nu: {PHONE_DISPLAY} (24/7 bereikbaar)</a>
    </>
  )
}
