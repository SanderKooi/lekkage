import Head from 'next/head'
import Nav from '../../components/Nav'
import { useState, useRef } from 'react'
import { lekkageTypes, getType, steden } from '../../data'

export async function getStaticPaths() {
  return { paths: lekkageTypes.map(t => ({ params: { type: t.slug } })), fallback: false }
}
export async function getStaticProps({ params }) {
  const type = getType(params.type)
  if (!type) return { notFound: true }
  return { props: { type } }
}

const reviewsPerType = {
  dak: [
    { naam:'Martijn V.', stad:'Amsterdam', tekst:'Al maanden last van een druipend plafond na regen. LekkageFix vond het lek binnen 20 minuten — een losse dakpan én gescheurde nokbedekking. Dezelfde dag gerepareerd.', datum:'2 weken geleden' },
    { naam:'Sandra K.', stad:'Rotterdam', tekst:'Plat dak van onze uitbouw lekte al twee winters. Twee andere bedrijven hadden het niet gevonden. LekkageFix traceerde het naar een verkeerd afgedichte dakdoorvoer. Eindelijk droog!', datum:'1 maand geleden' },
    { naam:'Peter D.', stad:'Utrecht', tekst:'Na een storm waterschade via de dakkapel. Binnen een uur was de monteur er. Nette offerte vooraf, kitrand hersteld. Uitstekende service.', datum:'3 weken geleden' },
  ],
  waterleiding: [
    { naam:'Karin M.', stad:'Den Haag', tekst:'Gesprongen leiding in de muur. LekkageFix vond de oorzaak snel zonder onnodig sloopwerk. Netjes afgedicht en opgeruimd.', datum:'1 week geleden' },
    { naam:'Thomas B.', stad:'Eindhoven', tekst:'Lage waterdruk al weken. Bleek een verborgen lekkage in de kruipruimte. Snel en vakkundig verholpen.', datum:'2 weken geleden' },
    { naam:'Linda W.', stad:'Groningen', tekst:'Lekkende cv-leiding midden in de nacht. Binnen 40 minuten aan de deur. Geweldig dat ze 24/7 bereikbaar zijn.', datum:'3 weken geleden' },
  ],
  badkamer: [
    { naam:'Joost H.', stad:'Utrecht', tekst:'Plafond eronder werd nat na douchen. Bleek verouderd kitwerk rond de douchebak. Snel vervangen, geen schade meer.', datum:'1 week geleden' },
    { naam:'Anita S.', stad:'Tilburg', tekst:'Al maanden vlekken op het plafond. LekkageFix vond de oorzaak: beschadigde waterdichte laag onder de tegels.', datum:'2 weken geleden' },
    { naam:'Rob V.', stad:'Amsterdam', tekst:'Lekkende afvoer onder de badkamervloer. Geen sloopwerk nodig dankzij camera-inspectie. Heel tevreden.', datum:'1 maand geleden' },
  ],
  riool: [
    { naam:'Frank D.', stad:'Rotterdam', tekst:'Terugstromend rioolwater in de kelder. Camera-inspectie vond een verzakte leiding. Vakkundig hersteld zonder graafwerk.', datum:'1 week geleden' },
    { naam:'Miriam K.', stad:'Nijmegen', tekst:'Andere bedrijven wilden direct slopen. LekkageFix loste het op met hogedruk reiniging. Scheelde een hoop geld.', datum:'2 weken geleden' },
    { naam:'Erik T.', stad:'Zwolle', tekst:'Boomwortels in de riolering. Volledige inspectie met rapport voor de verzekering. Professioneel en transparant.', datum:'3 weken geleden' },
  ],
  vocht: [
    { naam:'Petra L.', stad:'Haarlem', tekst:'Schimmel in de slaapkamer al jaren. Anderen behandelden alleen de schimmel. LekkageFix vond de echte oorzaak: doorslag via de spouwmuur.', datum:'2 weken geleden' },
    { naam:'Henk J.', stad:'Leiden', tekst:'Optrekkend vocht in de kelder. Duidelijke uitleg, transparante offerte. De waterdichting werkt uitstekend.', datum:'1 maand geleden' },
    { naam:'Sanne V.', stad:'Delft', tekst:'Vochtplekken op meerdere muren. Volledige vochtmeting en duurzame oplossing voorgesteld. Aanrader.', datum:'3 weken geleden' },
  ],
  gevel: [
    { naam:'Bas K.', stad:'Den Haag', tekst:'Vochtige binnenmuur na elke regenbui. Bleek verouderd voegwerk. LekkageFix heeft alles opnieuw gevoegd. Droog en netjes.', datum:'1 week geleden' },
    { naam:'Inge M.', stad:'Amsterdam', tekst:'Lekkage rondom het kozijn al jaren. Kit volledig versleten. Snel vervangen en waterdicht gemaakt.', datum:'2 weken geleden' },
    { naam:'Willem H.', stad:'Utrecht', tekst:'Scheuren in de gevel na vorstschade. Vakkundig gerepareerd met de juiste materialen. Goede communicatie.', datum:'1 maand geleden' },
  ],
  kelder: [
    { naam:'Arjen B.', stad:'Leiden', tekst:'Water in de kelder na zware regenval. Kelderwand waterdicht gemaakt van binnenuit. Vorig jaar nog droog gebleven.', datum:'2 weken geleden' },
    { naam:'Corine V.', stad:'Utrecht', tekst:'Grondwater via de keldervloer. Duidelijke inspectie, eerlijke offerte. De drainage werkt uitstekend.', datum:'1 maand geleden' },
    { naam:'Daan W.', stad:'Amsterdam', tekst:'Kelder stond blank na extreme neerslag. Structurele oplossing aangebracht. Eindelijk kunnen we de kelder gebruiken.', datum:'3 weken geleden' },
  ],
}

const seoPerType = {
  dak: {
    h2: 'Daklekkage reparatie', sub: 'alles wat je moet weten',
    h3_1: 'Daklekkage herkennen: de vroege signalen',
    p1: 'Natte plekken op het plafond zijn het meest duidelijk, maar let ook op verkleuringen op muren, schimmel in hoeken, bobbels in behang en een geur van vocht die na regen verergert. Belangrijk: de plek waar u het lek ziet is zelden de plek waar het water binnendringt.',
    h3_2: 'Plat dak vs. schuin dak vs. dakkapel',
    p2: 'Bij een plat dak is stilstaand water de grootste vijand — de dakbedekking (bitumen, EPDM, PVC of TPO) moet volledig intact zijn. Bij een schuin dak gaat het om dakpannen, leien en aansluitingen rondom schoorstenen en dakramen. Een dakkapel combineert beide: kitranden en de overgang naar het dakvlak zijn kwetsbare punten.',
    prijzen: [
      ['Losliggende dakpan vervangen','€ 75 – € 150','1–2 uur'],
      ['Kitnaad dakkapel herstellen','€ 100 – € 250','1–3 uur'],
      ['Dakdoorvoer afdichten','€ 150 – € 300','2–4 uur'],
      ['Plat dak lokaal repareren','€ 200 – € 500','halve dag'],
      ['Lood rondom schoorsteen','€ 250 – € 600','halve dag'],
      ['Dakbedekking deels vervangen','€ 500 – € 1.500','1–2 dagen'],
      ['Volledige inspectie + offerte','Gratis','30–60 min'],
    ],
    checklist: ['Dakbedekking en naden','Dakdoorvoeren en aansluitingen','Goten en afvoeren','Dakkapel en kozijnen','Nok en randafwerkingen','Eerdere reparaties'],
    slot: 'Met meer dan 8.000 daklekkages opgelost in heel Nederland heeft LekkageFix de expertise om elk type daklekkage snel en structureel te verhelpen. Onze monteurs zijn gecertificeerd en geven garantie op al het uitgevoerde werk.',
  },
  waterleiding: {
    h2: 'Waterleiding lekkage reparatie', sub: 'alles wat je moet weten',
    h3_1: 'Waterleiding lekkage herkennen',
    p1: 'Let op natte plekken op muren of plafonds, een onverklaarbaar hoge waterrekening, verminderde waterdruk of het geluid van stromend water terwijl alle kranen dicht zijn. Een verborgen lekkage kan maandenlang schade aanrichten voordat die zichtbaar wordt.',
    h3_2: 'Soorten waterleidinglekkages',
    p2: 'Van druppelende kranen en lekkende verbindingen tot gesprongen leidingen in de muur of vloer. Bevroren leidingen in de winter zijn een veelvoorkomende oorzaak van plotselinge schade. Ook verouderde koperen of loden leidingen zijn risicofactoren die regelmatig inspecteren verdienen.',
    prijzen: [
      ['Druppelende kraan repareren','€ 60 – € 120','1 uur'],
      ['Lekkende verbinding afdichten','€ 80 – € 180','1–2 uur'],
      ['Leiding in muur lokaliseren','€ 120 – € 250','1–3 uur'],
      ['Gesprongen leiding repareren','€ 200 – € 500','halve dag'],
      ['Leidingwerk deels vervangen','€ 400 – € 1.200','1–2 dagen'],
      ['Volledige inspectie + offerte','Gratis','30–60 min'],
    ],
    checklist: ['Zichtbare leidingen en verbindingen','Kranen en afsluiters','Cv-installatie en boiler','Leidingen in muur/vloer','Waterdruk en doorstroming','Staat van het leidingwerk'],
    slot: 'LekkageFix beschikt over moderne lekdetectie-apparatuur waarmee we verborgen leidinglekkages lokaliseren zonder onnodig sloopwerk. Snel, vakkundig en met garantie.',
  },
  badkamer: {
    h2: 'Badkamerlekkage reparatie', sub: 'alles wat je moet weten',
    h3_1: 'Badkamerlekkage herkennen',
    p1: 'Typische signalen zijn natte plekken of verkleuringen op het plafond onder de badkamer, schimmel rondom de douche of het bad, loszittende tegels of zwellende vloerdelen, en lekkage bij de afvoer zichtbaar vanuit de kruipruimte.',
    h3_2: 'Meest voorkomende oorzaken',
    p2: 'Verouderd kitwerk rondom douche, bad of wastafel is de meest voorkomende oorzaak. Maar ook een beschadigde waterdichte laag onder de tegels, een lekkende sifon of afvoer, en condensatieproblemen door onvoldoende ventilatie kunnen de boosdoener zijn.',
    prijzen: [
      ['Kit rondom douche vervangen','€ 80 – € 180','2–3 uur'],
      ['Sifon of afvoer repareren','€ 80 – € 200','1–2 uur'],
      ['Waterdichte laag herstellen','€ 200 – € 600','halve–hele dag'],
      ['Tegelwerk lokaal repareren','€ 250 – € 700','1–2 dagen'],
      ['Volledige badkamer waterdichting','€ 800 – € 2.500','2–4 dagen'],
      ['Volledige inspectie + offerte','Gratis','30–60 min'],
    ],
    checklist: ['Kitwerk rondom douche en bad','Afvoer en sifon','Voegwerk en tegels','Waterdichte laag','Ventilatie en condensatie','Leidingen en aansluitingen'],
    slot: 'LekkageFix heeft gespecialiseerde kennis van badkamerdichting en werkt met professionele materialen die voldoen aan de hoogste normen voor waterdichting.',
  },
  riool: {
    h2: 'Rioollekkage reparatie', sub: 'alles wat je moet weten',
    h3_1: 'Rioollekkage herkennen',
    p1: 'Let op slechte geur vanuit afvoeren, terugstromend water in de douche of wc bij gebruik van andere afvoerpunten, langzaam leeglopende afvoeren door het hele huis, of natte plekken in de tuin boven de riolering. Camera-inspectie geeft zekerheid.',
    h3_2: 'Soorten rioolproblemen',
    p2: 'Van vetafzettingen en verstoppingen tot verzakte leidingen, boomwortels die leidingen binnendringen en gebarsten terracottabuizen. Elke situatie vraagt om een andere aanpak — van hogedruk reiniging tot relining of gerichte graafwerkzaamheden.',
    prijzen: [
      ['Riool reinigen (hogedruk)','€ 150 – € 350','1–3 uur'],
      ['Camera-inspectie met rapport','€ 200 – € 450','2–4 uur'],
      ['Lokale rioolreparatie','€ 300 – € 800','halve–hele dag'],
      ['Rioolrelining (no-dig)','€ 600 – € 2.000','1–2 dagen'],
      ['Riool gedeeltelijk vervangen','€ 1.000 – € 4.000','2–5 dagen'],
      ['Volledige inspectie + offerte','Gratis','30–60 min'],
    ],
    checklist: ['Camera-inspectie leidingen','Staat van rioleringsbuizen','Boomwortelindringing','Vetafzetting en verstoppingen','Aansluiting gemeenteriool','Drainage en grondwater'],
    slot: 'Met camera-inspecties en no-dig technieken lost LekkageFix rioolproblemen op met minimale overlast. Geen onnodig sloopwerk, wel duurzame reparaties met garantie.',
  },
  vocht: {
    h2: 'Vochtproblemen oplossen', sub: 'alles wat je moet weten',
    h3_1: 'Vochtproblemen herkennen',
    p1: 'Signalen zijn schimmelvorming op muren of plafonds, een muffe geur, natte of koude muren, witte zoutuitbloeiingen op muren, loszittend behang of verf, en vochtplekken die na regen toenemen.',
    h3_2: 'Oorzaken van vochtproblemen',
    p2: 'Optrekkend grondvocht via de fundering, doorslag via gevel of spouwmuur, condensatie door onvoldoende ventilatie, en lekkende dakgoten of regenpijpen. De oorzaak bepaalt de oplossing — symptomen behandelen zonder diagnose werkt niet duurzaam.',
    prijzen: [
      ['Vochtmeting en diagnose','€ 100 – € 250','1–2 uur'],
      ['Schimmelbehandeling','€ 150 – € 400','2–4 uur'],
      ['Optrekkend vocht behandelen','€ 400 – € 1.200','1–2 dagen'],
      ['Spouwmuur isolatie/dichting','€ 500 – € 1.500','1–2 dagen'],
      ['Kruipruimte sanering','€ 600 – € 2.000','1–3 dagen'],
      ['Volledige inspectie + offerte','Gratis','30–60 min'],
    ],
    checklist: ['Vochtmeting muren en vloeren','Fundering en kruipruimte','Spouwmuur en gevel','Ventilatie en luchtcirculatie','Dakgoten en afvoeren','Isolatie en koudebruggen'],
    slot: 'LekkageFix werkt met professionele vochtmeters en diagnoseapparatuur om de exacte oorzaak te vinden. Geen symptoombestrijding maar een duurzame oplossing.',
  },
  gevel: {
    h2: 'Gevellekkage reparatie', sub: 'alles wat je moet weten',
    h3_1: 'Gevellekkage herkennen',
    p1: 'Vochtige binnenmuren die natter worden bij regen, zoutuitbloeiingen op gevels, donkere verkleuringen in het metselwerk, loslatend voegwerk of kit rondom kozijnen, en schimmelvorming aan de binnenkant van buitenmuren.',
    h3_2: 'Oorzaken van gevellekkage',
    p2: 'Verouderd voegwerk is de meest voorkomende oorzaak. Maar ook beschadigde kit rondom kozijnen, scheuren in de gevel door verzakking, spouwmuurisolatie die vocht vasthoudt en ontbrekende waterkeringen boven kozijnen spelen een rol.',
    prijzen: [
      ['Kit rondom kozijnen vervangen','€ 100 – € 300','2–4 uur'],
      ['Voegwerk gedeeltelijk herstellen','€ 200 – € 600','halve dag'],
      ['Scheur in gevel repareren','€ 200 – € 500','2–4 uur'],
      ['Gevel hydrofoberen','€ 300 – € 800','halve–hele dag'],
      ['Groot voegwerk herstel','€ 800 – € 3.000','2–5 dagen'],
      ['Volledige inspectie + offerte','Gratis','30–60 min'],
    ],
    checklist: ['Voegwerk en metselwerk','Kit rondom kozijnen','Waterkering en lekdorpels','Spouwmuur en isolatie','Scheuren en verzakking','Dakrand en geveltop'],
    slot: 'LekkageFix heeft specialisten in gevelonderhoud en waterdichting die de juiste materialen kiezen voor elk type gevel — baksteen, beton of gevelplaten.',
  },
  kelder: {
    h2: 'Kelderwaterdichting', sub: 'alles wat je moet weten',
    h3_1: 'Kelderwaterdichting herkennen',
    p1: 'Water op de keldervloer of langs de wanden na neerslag, witte uitbloeiingen op betonnen wanden, schimmelvorming, vochtplekken op de kelderwand en een muffe geur zijn duidelijke signalen. Ook constante wateraanvoer via capillaire werking is een probleem.',
    h3_2: 'Methoden voor kelderwaterdichting',
    p2: 'Waterdichting van binnenuit is minder invasief en geschikt voor de meeste situaties. Bij hoge grondwaterdruk is waterdichting van buitenaf of een drainagesysteem beter. Injectie van scheuren en minerale afdichtingslagen zijn beproefde technieken.',
    prijzen: [
      ['Scheuren injecteren','€ 200 – € 600','2–4 uur'],
      ['Kelderwand waterdicht coaten','€ 400 – € 1.200','1–2 dagen'],
      ['Drainage aanleggen','€ 800 – € 2.500','2–4 dagen'],
      ['Waterdichting van buitenaf','€ 2.000 – € 8.000','3–7 dagen'],
      ['Complete keldersanering','€ 3.000 – € 12.000','1–3 weken'],
      ['Volledige inspectie + offerte','Gratis','30–60 min'],
    ],
    checklist: ['Staat kelderwanden en vloer','Grondwaterstand','Scheuren en naden','Bestaande drainage','Fundering en waterkering','Capillaire werking'],
    slot: 'LekkageFix heeft gespecialiseerde kennis van kelderwaterdichting en werkt met beproefde systemen die ook bij hoge grondwaterdruk betrouwbaar presteren.',
  },
}

const blogItems = [
  { href:'/blog/lekkage-herkennen', img:'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80&auto=format&fit=crop', cat:'Tips', datum:'12 feb 2025', tijd:'5 min', title:'Lekkage herkennen: de vroege signalen die je niet mag negeren', excerpt:'Een lekkage begint klein maar kan snel groot worden. Zo herken je het op tijd.' },
  { href:'/blog/verzekering-lekkage', img:'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80&auto=format&fit=crop', cat:'Verzekering', datum:'5 feb 2025', tijd:'4 min', title:'Vergoedt je verzekering een lekkage? Zo zit het' },
  { href:'/blog/preventie-tips', img:'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80&auto=format&fit=crop', cat:'Preventie', datum:'28 jan 2025', tijd:'3 min', title:'7 tips om lekkage te voorkomen' },
]

export default function LekkageType({ type }) {
  const [openFaq, setOpenFaq] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  const [offset, setOffset] = useState(0)
  const trackRef = useRef(null)
  const touchStartX = useRef(0)

  const andereTypes = lekkageTypes.filter(t => t.slug !== type.slug)
  const reviews = reviewsPerType[type.slug] || reviewsPerType.dak
  const seo = seoPerType[type.slug] || seoPerType.dak
  const topSteden = steden.slice(0, 8)
  const GAP = 20

  function getVisible() {
    if (typeof window === 'undefined') return 3
    if (window.innerWidth <= 600) return 1
    if (window.innerWidth <= 900) return 2
    return 3
  }

  function goTo(n) {
    const vis = getVisible()
    const max = andereTypes.length - vis
    const next = Math.max(0, Math.min(max, n))
    const wrapWidth = trackRef.current?.parentElement?.offsetWidth || (typeof window !== 'undefined' ? window.innerWidth - 32 : 800)
    const cardWidth = (wrapWidth - (vis - 1) * GAP) / vis
    setOffset(next * (cardWidth + GAP))
    setActiveSlide(next)
  }

  const faqs = [
    { v:`Wat zijn de meest voorkomende oorzaken van ${type.naam.toLowerCase()}?`, a:`De meest voorkomende oorzaken zijn: ${type.oorzaken.join(', ')}.` },
    { v:'Hoe snel kunnen jullie komen?', a:'Gemiddeld binnen 30 minuten ter plaatse. Bel 0800-1234 voor een actuele inschatting.' },
    { v:'Wat kost een reparatie?', a:'Kosten variëren per situatie. U ontvangt altijd een transparante offerte vooraf.' },
    { v:'Vergoedt mijn verzekering dit?', a:'Bij plotselinge schade is de opstalverzekering vaak van toepassing. Wij helpen met de documentatie.' },
    { v:'Geven jullie garantie?', a:'Ja — we geven garantie op alle uitgevoerde reparaties.' },
    { v:"Werken jullie ook 's nachts en in het weekend?", a:'Ja, 24/7 bereikbaar, ook op feestdagen.' },
  ]

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type":"LocalBusiness", "@id":"https://lekkagefix.nl/#business", "name":"LekkageFix", "url":"https://lekkagefix.nl", "telephone":"0800-1234", "openingHours":"Mo-Su 00:00-24:00", "priceRange":"€€", "aggregateRating":{ "@type":"AggregateRating", "ratingValue":"4.9", "reviewCount":"2847", "bestRating":"5" } },
      { "@type":"BreadcrumbList", "itemListElement":[ {"@type":"ListItem","position":1,"name":"Home","item":"https://lekkagefix.nl"}, {"@type":"ListItem","position":2,"name":"Lekkage","item":"https://lekkagefix.nl/lekkage"}, {"@type":"ListItem","position":3,"name":type.naam,"item":`https://lekkagefix.nl/lekkage/${type.slug}`} ] },
      { "@type":"FAQPage", "mainEntity":faqs.map(f => ({ "@type":"Question", "name":f.v, "acceptedAnswer":{"@type":"Answer","text":f.a} })) },
      { "@type":"Service", "name":`${type.naam} reparatie`, "provider":{"@id":"https://lekkagefix.nl/#business"}, "areaServed":{"@type":"Country","name":"Netherlands"}, "description":type.intro, "offers":{"@type":"AggregateOffer","lowPrice":seo.prijzen[0][1].replace(/[^0-9]/g,'').slice(0,3),"highPrice":"5000","priceCurrency":"EUR"} }
    ]
  }

  return (
    <>
      <Head>
        <title>{type.naam} Reparatie – Snel & Vakkundig | LekkageFix</title>
        <meta name="description" content={`${type.naam}? ${type.omschrijving} LekkageFix helpt 24/7 door heel Nederland. Gemiddeld 30 min ter plaatse. Gratis offerte.`} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://lekkagefix.nl/lekkage/${type.slug}`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${type.naam} Reparatie – Snel & Vakkundig | LekkageFix`} />
        <meta property="og:description" content={`${type.naam}? LekkageFix helpt 24/7 door heel Nederland. Gemiddeld 30 min ter plaatse.`} />
        <meta property="og:url" content={`https://lekkagefix.nl/lekkage/${type.slug}`} />
        <meta property="og:locale" content="nl_NL" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>

      <Nav activePath="/lekkage" />

      {/* BREADCRUMB */}
      <div className="breadcrumb-bar">
        <div className="breadcrumb">
          <a href="/">Home</a><span className="breadcrumb-sep">›</span>
          <a href="/lekkage">Lekkage</a><span className="breadcrumb-sep">›</span>
          <span>{type.naam}</span>
        </div>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-dots" />
        <div className="hero-inner">
          <div>
            <div className="hero-badge"><span className="pulse" /> {type.urgentie === 'hoog' ? 'Spoedreparatie beschikbaar · 24/7' : '24/7 bereikbaar · heel Nederland'}</div>
            <h1>{type.naam}<br/>reparatie — <em>snel,<br/>vakkundig &<br/>gegarandeerd.</em></h1>
            <p className="hero-sub">{type.intro}</p>
            <div className="hero-stats">
              <div className="stat-item"><div className="stat-val">30<sup>min</sup></div><div className="stat-key">Reactietijd</div></div>
              <div className="stat-item"><div className="stat-val">4.9<sup>★</sup></div><div className="stat-key">Beoordeling</div></div>
              <div className="stat-item"><div className="stat-val">12k<sup>+</sup></div><div className="stat-key">Klanten</div></div>
              <div className="stat-item"><div className="stat-val">24<sup>/7</sup></div><div className="stat-key">Bereikbaar</div></div>
            </div>
            <div className="hero-actions">
              <a href="tel:0800-1234" className="btn-call">📞 Bel: 0800-1234</a>
              <a href="#offerte" className="btn-ghost">Gratis offerte →</a>
            </div>
          </div>
          <div className="form-card" id="offerte">
            <div className="form-title">{type.naam} aanvragen</div>
            <div className="form-sub">Gratis & vrijblijvend · snelle reactie</div>
            <div className="fg"><label>Type probleem</label>
              <select>{type.oorzaken.map(o => <option key={o}>{o}</option>)}<option>Weet ik niet zeker</option></select>
            </div>
            <div className="form-row">
              <div className="fg"><label>Naam</label><input type="text" placeholder="Jan de Vries" /></div>
              <div className="fg"><label>Telefoon</label><input type="tel" placeholder="06-12345678" /></div>
            </div>
            <div className="fg"><label>Postcode + stad</label><input type="text" placeholder="1011 AB Amsterdam" /></div>
            <div className="fg"><label>Beschrijving (optioneel)</label><textarea placeholder={`Beschrijf de ${type.naam.toLowerCase()} kort...`} /></div>
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
          <div className="ti-item"><span className="ti-check">✓</span><span><strong>Erkend</strong> door verzekeraars</span></div>
          <div className="ti-item"><span className="ti-check">✓</span><span><strong>Transparante</strong> prijzen</span></div>
          <div className="ti-item"><span className="ti-check">✓</span><span><strong>24/7</strong> bereikbaar</span></div>
        </div>
      </div>

      {/* OORZAKEN */}
      <section className="section">
        <div className="section-inner">
          <div className="sec-head">
            <div className="eyebrow">Oorzaken</div>
            <h2>Waardoor ontstaat <em>{type.naam.toLowerCase()}?</em></h2>
            <p className="sec-sub">Onze specialisten traceren de bron en repareren structureel — geen lapmiddelen.</p>
          </div>
          <div className="oorzaken-row">
            {type.oorzaken.map((o, i) => (
              <div key={i} className="oorzaak">
                <div className="oorzaak-num">{i + 1}</div>
                <h3>{o}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WERKWIJZE */}
      <section className="section section-alt">
        <div className="section-inner">
          <div className="sec-head-center">
            <div className="eyebrow">Werkwijze</div>
            <h2>Van melding tot <em>oplossing</em></h2>
            <p className="sec-sub">Helder en transparant — zo lossen we elk lekkageprobleem op.</p>
          </div>
          <div className="steps">
            {[
              {n:'1',t:'Melding',p:'Bel of stuur een aanvraag. We bespreken het probleem en plannen een afspraak.'},
              {n:'2',t:'Vakman onderweg',p:'De dichtstbijzijnde monteur rijdt naar je toe. Gemiddeld binnen 30 minuten.'},
              {n:'3',t:'Inspectie & offerte',p:'Grondige inspectie en transparante prijsopgave. Jij beslist voordat we beginnen.'},
              {n:'4',t:'Opgelost',p:'Vakkundige reparatie met garantie op het werk. Netjes opgeruimd achtergelaten.'},
            ].map(s => (
              <div key={s.n} className="step">
                <div className="step-num">{s.n}</div>
                <h3>{s.t}</h3>
                <p>{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STEDEN */}
      <section className="section" id="steden">
        <div className="section-inner">
          <div className="sec-head">
            <div className="eyebrow">Werkgebied</div>
            <h2>{type.naam} reparatie in <em>jouw stad</em></h2>
            <p className="sec-sub">We lossen {type.naam.toLowerCase()} op door heel Nederland.</p>
          </div>
          <div className="cities-grid">
            {topSteden.map(s => (
              <a key={s.slug} href={`/lekkage/${type.slug}/${s.slug}`} className="city-card">
                <div className="city-name">{s.naam}</div>
                <div className="city-prov">📍 {s.provincie}</div>
                <div className="city-arrow">Bekijk {s.naam} →</div>
              </a>
            ))}
          </div>
          <div className="cities-cta">
            <div className="cities-cta-left">
              <h3>Jouw stad er niet bij?</h3>
              <p>We lossen {type.naam.toLowerCase()} op in 46+ steden door heel Nederland.</p>
            </div>
            <div className="cities-counts">
              <div className="count-item"><div className="count-num">46<sup>+</sup></div><div className="count-label">Steden</div></div>
              <div className="count-item"><div className="count-num">12</div><div className="count-label">Provincies</div></div>
              <div className="count-item"><div className="count-num">24<sup>/7</sup></div><div className="count-label">Bereikbaar</div></div>
            </div>
            <a href="/lekdetectie" className="btn-all">Alle steden →</a>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section section-alt">
        <div className="section-inner">
          <div className="sec-head-center">
            <div className="eyebrow">Ervaringen</div>
            <h2>Wat klanten zeggen over <em>{type.naam.toLowerCase()} reparatie</em></h2>
          </div>
          <div className="reviews-summary">
            <div className="rating-big">
              <div className="rating-num">4.9</div>
              <div className="rating-stars">★★★★★</div>
              <div className="rating-count">op basis van 2.847 reviews</div>
            </div>
            <div className="rating-bars">
              {[['5★',89],['4★',8],['3★',2],['2★',1],['1★',0]].map(([s,w]) => (
                <div key={s} className="bar-row">
                  <span>{s}</span>
                  <div className="bar-track"><div className="bar-fill" style={{width:`${w}%`}} /></div>
                  <span>{w}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className="reviews-grid">
            {reviews.map((r, i) => (
              <div key={i} className="review">
                <div className="review-top"><div className="stars">★★★★★</div><div className="review-date">{r.datum}</div></div>
                <p className="review-text">"{r.tekst}"</p>
                <div className="reviewer">
                  <div className="avatar">{r.naam.split(' ').map(n => n[0]).join('')}</div>
                  <div><div className="rev-name">{r.naam}</div><div className="rev-meta">{r.stad} · <span className="verified">✓ geverifieerd</span></div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="section-inner">
          <div className="sec-head-center">
            <div className="eyebrow">Veelgestelde vragen</div>
            <h2>Alles over <em>{type.naam.toLowerCase()}</em></h2>
          </div>
          <div className="faq-grid">
            {faqs.map((f, i) => (
              <div key={i} className={`faq-item${openFaq === i ? ' open' : ''}`}>
                <div className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {f.v} <span className="faq-arrow">▼</span>
                </div>
                <div className="faq-a">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ANDERE DIENSTEN CARROUSEL */}
      <section className="section section-alt">
        <div className="section-inner">
          <div className="sec-head" style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',flexWrap:'wrap',gap:'1rem'}}>
            <div>
              <div className="eyebrow">Overige diensten</div>
              <h2>Ook last van een <em>ander probleem?</em></h2>
              <p className="sec-sub">Naast {type.naam.toLowerCase()} lossen we alle typen lekkages op in heel Nederland.</p>
            </div>
            <div className="carousel-nav-top">
              <button className="carousel-btn" onClick={() => goTo(activeSlide - 1)} disabled={activeSlide === 0} aria-label="Vorige">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <button className="carousel-btn" onClick={() => goTo(activeSlide + 1)} disabled={activeSlide === andereTypes.length - getVisible()} aria-label="Volgende">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>
          <div className="carousel-wrap" onTouchStart={e => { touchStartX.current = e.touches[0].clientX }} onTouchEnd={e => { const d = touchStartX.current - e.changedTouches[0].clientX; if(Math.abs(d)>50) goTo(d>0?activeSlide+1:activeSlide-1) }}>
            <div className="carousel-track" ref={trackRef} style={{transform:`translateX(-${offset}px)`}}>
              {andereTypes.map(t => (
                <a key={t.slug} href={`/lekkage/${t.slug}`} className="carousel-card">
                  <div className="svc-icon">{t.icon}</div>
                  <h3>{t.naam}</h3>
                  <p>{t.omschrijving}</p>
                  <div className="svc-cta">Meer over {t.naam.toLowerCase()} →</div>
                </a>
              ))}
            </div>
          </div>
          <div className="carousel-footer">
            {Array.from({length: Math.max(0, andereTypes.length - getVisible() + 1)}).map((_, i) => (
              <button key={i} className={`carousel-dot${activeSlide === i ? ' active' : ''}`} onClick={() => goTo(i)} aria-label={`Dienst ${i+1}`} />
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section className="section">
        <div className="section-inner">
          <div className="sec-head">
            <div className="eyebrow">Kennisbank</div>
            <h2>Handige tips & <em>uitleg</em></h2>
            <p className="sec-sub">Alles wat je wilt weten over {type.naam.toLowerCase()} — van eerste hulp tot preventie.</p>
          </div>
          <div className="blog-grid">
            {blogItems.map((b, i) => (
              <a key={i} href={b.href} className="blog-card">
                <div className={`blog-img${i===0?' blog-img-main':''}`}>
                  <img src={b.img} alt={b.title} />
                  <span className="blog-cat">{b.cat}</span>
                </div>
                <div className="blog-body">
                  <div className="blog-meta"><span>📅 {b.datum}</span><span>⏱ {b.tijd}</span></div>
                  <h3>{b.title}</h3>
                  {b.excerpt && <p className="blog-excerpt">{b.excerpt}</p>}
                  <div className="blog-link">Lees artikel →</div>
                </div>
              </a>
            ))}
          </div>
          <div style={{display:'flex',justifyContent:'center',marginTop:'2rem'}}>
            <a href="/blog" className="btn-all">Bekijk alle artikelen →</a>
          </div>
        </div>
      </section>

      {/* SEO TEKST */}
      <section className="section section-white">
        <div className="section-inner">
          <div className="seo-grid">
            <div className="seo-block">
              <div className="eyebrow">{type.naam} informatie</div>
              <h2 style={{marginBottom:'1.5rem'}}>{seo.h2}: <em>{seo.sub}</em></h2>

              <h3>{seo.h3_1}</h3>
              <p>{seo.p1}</p>

              <h3>{seo.h3_2}</h3>
              <p>{seo.p2}</p>

              <h3>Wat kost een {type.naam.toLowerCase()} reparatie?</h3>
              <p>De kosten hangen af van de oorzaak en de omvang van de schade. Onderstaand een indicatief overzicht — u ontvangt altijd een transparante offerte vooraf.</p>

              <div className="price-table">
                <table>
                  <thead><tr><th scope="col">Type reparatie</th><th scope="col">Indicatie</th><th scope="col">Doorlooptijd</th></tr></thead>
                  <tbody>
                    {seo.prijzen.map(([r,p,t], i) => (
                      <tr key={i} className={i === seo.prijzen.length-1 ? 'highlight-row' : ''}>
                        <td>{i === seo.prijzen.length-1 ? <strong>{r}</strong> : r}</td>
                        <td>{p}</td><td>{t}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="table-note">* Prijzen zijn indicatief en afhankelijk van locatie en omvang. Definitieve prijs na inspectie.</p>
              </div>

              <h3>{type.naam} en verzekering</h3>
              <p>Bij plotselinge schade door storm of extreme neerslag is de opstalverzekering vaak van toepassing. Bij slijtage of achterstallig onderhoud vergoeden verzekeraars doorgaans niet. LekkageFix is erkend door alle grote verzekeraars en helpt u met de documentatie voor uw claim.</p>

              <p style={{marginTop:'1rem'}}>{seo.slot}</p>
            </div>
            <div className="seo-sticky">
              <div style={{background:'var(--green3)',border:'1.5px solid var(--green4)',borderRadius:'14px',padding:'1.5rem',marginBottom:'1rem'}}>
                <div className="eyebrow" style={{marginBottom:'0.75rem'}}>Snel handelen?</div>
                <p style={{fontSize:'0.85rem',color:'var(--muted)',marginBottom:'1rem',lineHeight:1.7}}>Bel direct voor spoedservice. Onze monteurs zijn gemiddeld binnen 30 minuten ter plaatse.</p>
                <a href="tel:0800-1234" className="btn-call" style={{width:'100%',justifyContent:'center',fontSize:'0.95rem'}}>📞 0800-1234</a>
              </div>
              <div style={{background:'white',border:'1.5px solid var(--border)',borderRadius:'14px',padding:'1.5rem'}}>
                <div style={{fontSize:'0.8rem',fontWeight:700,color:'var(--text)',marginBottom:'1rem'}}>✓ Wat wij controleren</div>
                <div style={{display:'flex',flexDirection:'column',gap:'0.5rem',fontSize:'0.82rem',color:'var(--muted)'}}>
                  {seo.checklist.map((c,i) => <span key={i}>✓ {c}</span>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <div className="bottom-cta">
        <div className="eyebrow" style={{color:'#a8e6c0'}}>Direct geholpen</div>
        <h2 style={{color:'white'}}>{type.naam}? Wacht niet te lang.</h2>
        <p>Hoe eerder je belt, hoe kleiner de schade. Onze vakspecialisten staan dag en nacht voor je klaar.</p>
        <div className="cta-btns">
          <a href="tel:0800-1234" className="btn-call">📞 Bel nu: 0800-1234</a>
          <a href="#offerte" className="btn-white-ghost">Gratis offerte aanvragen</a>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <div className="footer-top">
          <div>
            <div className="footer-logo">Lekkage<b>Fix</b></div>
            <p className="footer-desc">Vakkundige lekkage reparaties door heel Nederland. Gecertificeerde vakmensen, transparante prijzen, garantie op werk.</p>
          </div>
          <div className="footer-col">
            <h4>Diensten</h4>
            {lekkageTypes.map(t => <a key={t.slug} href={`/lekkage/${t.slug}`}>{t.naam}</a>)}
          </div>
          <div className="footer-col">
            <h4>Steden</h4>
            {steden.slice(0,5).map(s => <a key={s.slug} href={`/lekkage/${type.slug}/${s.slug}`}>{s.naam}</a>)}
            <a href="/lekdetectie">Alle steden →</a>
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
          <p>© 2025 LekkageFix · KvK 89586557 · <a href="#">Privacy</a> · <a href="#">Voorwaarden</a></p>
          <div className="cert-badges"><span className="cert">VCA ✓</span><span className="cert">ISO 9001</span><span className="cert">Erkend verzekeraar</span></div>
        </div>
      </footer>

      <a href="tel:0800-1234" className="mobile-cta">📞 Bel nu: 0800-1234 (24/7 bereikbaar)</a>
    </>
  )
}
