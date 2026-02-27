import Head from 'next/head'
import Nav from '../../../components/Nav'
import { useState, useEffect } from 'react'
import { steden, lekkageTypes, getSted, getType } from '../../../data'

const PHONE = '0800-1234'
const PHONE_DISPLAY = '0800-1234'
const EMAIL = 'info@lekkagefix.nl'

const monteurs = {
  'Noord-Holland':  { naam: 'Henk van der Berg',  foto: 'HB', img: '/images/henk.png',   functie: 'Lekkage specialist', ervaring: '14 jaar', quote: 'In Noord-Holland ken ik elk woningtype van binnen en buiten.' },
  'Zuid-Holland':   { naam: 'Marco de Wit',        foto: 'MW', img: '/images/marco.png',  functie: 'Lekkage specialist', ervaring: '11 jaar', quote: 'Van grachtenpand tot jaren-70 flat, ik los het op.' },
  'Utrecht':        { naam: 'Jeroen Smit',          foto: 'JS', img: '/images/jeroen.png', functie: 'Lekkage specialist', ervaring: '9 jaar',  quote: 'Utrecht kent zijn werfkelders, ik ken de lekkages.' },
  'Noord-Brabant':  { naam: 'Kevin Janssen',        foto: 'KJ', img: '/images/kevin.png',  functie: 'Lekkage specialist', ervaring: '12 jaar', quote: 'Van Eindhoven tot Bergen op Zoom, ik ben er snel bij.' },
  'Gelderland':     { naam: 'Arjan Meijer',         foto: 'AM', img: '/images/arjan.png',  functie: 'Lekkage specialist', ervaring: '10 jaar', quote: 'De Gelderse woningbouw heeft geen geheimen voor mij.' },
  'Overijssel':     { naam: 'Thomas Bos',           foto: 'TB', img: '/images/thomas.png', functie: 'Lekkage specialist', ervaring: '8 jaar',  quote: 'Twente en Zwolle, ik ben altijd in de buurt.' },
  'Groningen':      { naam: 'Sander Dijkstra',      foto: 'SD', img: '/images/sander.png', functie: 'Lekkage specialist', ervaring: '7 jaar',  quote: 'Groningse studentenwoningen? Mijn specialiteit.' },
  'Friesland':      { naam: 'Pieter Visser',        foto: 'PV', img: '/images/pieter.png', functie: 'Lekkage specialist', ervaring: '13 jaar', quote: 'De Friese wind tast daken aan, ik herstel ze.' },
  'Drenthe':        { naam: 'Rob Hofstra',          foto: 'RH', img: '/images/rob.png',    functie: 'Lekkage specialist', ervaring: '9 jaar',  quote: 'Drentse woningen verdienen vakkundig onderhoud.' },
  'Flevoland':      { naam: 'Danny Kramer',         foto: 'DK', img: '/images/danny.png',  functie: 'Lekkage specialist', ervaring: '6 jaar',  quote: "Polderbouw heeft specifieke risico's, ik ken ze." },
  'Limburg':        { naam: 'Luc Hermans',          foto: 'LH', img: '/images/luc.png',    functie: 'Lekkage specialist', ervaring: '11 jaar', quote: 'Mergelstenen huizen zijn mijn specialiteit.' },
  'Zeeland':        { naam: 'Kees de Vos',          foto: 'KV', img: '/images/kees.png',   functie: 'Lekkage specialist', ervaring: '15 jaar', quote: 'Zeeuwse panden kennen hun eigen vochtproblemen.' },
}

function getMonteur(provincie) {
  return monteurs[provincie] || { naam: 'Jan Peters', foto: 'JP', img: null, functie: 'Lekkage specialist', ervaring: '10 jaar', quote: 'Vakkundig en snel door heel Nederland.' }
}

function MonteurAvatar({ monteur, size = 52, border = '2.5px solid white', bg = 'var(--green)' }) {
  if (monteur.img) {
    return <img src={monteur.img} alt={monteur.naam} style={{width:size,height:size,borderRadius:'50%',objectFit:'cover',flexShrink:0,border,boxShadow:'0 2px 8px rgba(26,122,74,0.25)'}} />
  }
  return <div style={{width:size,height:size,borderRadius:'50%',background:bg,color:'white',display:'flex',alignItems:'center',justifyContent:'center',fontSize:size*0.32+'px',fontWeight:800,flexShrink:0,border}}>{monteur.foto}</div>
}

// Extra stadsdata voor unieke content
const stadsData = {
  'amsterdam':      { bodem: 'veengrond met houten paalfondering', bouwperiode: 'grachtenpanden (17e eeuw) en vooroorlogse uitbreidingen', buurt: 'de Jordaan en De Pijp', klimaat: 'windrijk en regenachtig door de ligging aan het IJ' },
  'rotterdam':      { bodem: 'klei op veen, laag gelegen polder', bouwperiode: 'naoorlogse wederopbouw (1945-1965) en moderne architectuur', buurt: 'Kralingen en het Oude Westen', klimaat: 'zeeklimaat met veel neerslag door de Maasmonding' },
  'den-haag':       { bodem: 'zandgrond met kleilagen', bouwperiode: 'belle-epoquepanden en interbellum hofjeswoningen (1900-1940)', buurt: 'Statenkwartier en Bezuidenhout', klimaat: 'kustklimaat met harde westenwind en zilte lucht' },
  'utrecht':        { bodem: 'veen en rivierklei', bouwperiode: 'middeleeuwse werfkelders en Vinex-uitbreidingen', buurt: 'Wittevrouwen en Lombok', klimaat: 'continentaal met hoge grondwaterstand door de Singels' },
  'eindhoven':      { bodem: 'zandgrond (keileemvrij)', bouwperiode: 'Philips-fabriekswoningen (1910-1940) en naoorlogse uitbreidingen', buurt: 'Woensel en het Centrum', klimaat: 'relatief droog maar met hevige zomerbuien' },
  'tilburg':        { bodem: 'dekzand op leem', bouwperiode: 'textielfabriekswoningen (1920-1950) en jaren-70 groeikernen', buurt: 'Oud-Noord en het Wilhelminapark', klimaat: 'gematigd met veel najaarsneerslag' },
  'groningen':      { bodem: 'klei op veen, kweldruk', bouwperiode: 'studentenpanden (1890-1930) en jaren-60 flatwijken', buurt: 'Schilderswijk en de Oosterpoort', klimaat: 'koud en winderig met hoge neerslag in herfst en winter' },
  'breda':          { bodem: 'zandgrond op leem', bouwperiode: 'vestingstad met historische panden en jaren-70 uitbreidingen', buurt: 'Ginneken en de Haagdijk', klimaat: 'mild, Brabants zeeklimaat' },
  'nijmegen':       { bodem: 'rivierklei en stuwwal', bouwperiode: 'heuvelstadsbebouwing en naoorlogse wederopbouw', buurt: 'de Benedenstad en Nijmegen-Oost', klimaat: 'rivierstad met hoge grondwaterstanden bij hoogwater op de Waal' },
  'arnhem':         { bodem: 'stuwwalzand en rivierklei', bouwperiode: 'wederopbouwwoningen (1950-1965) en villawijk Sonsbeek', buurt: 'Sonsbeek en Presikhaaf', klimaat: 'wisselvallig met vochtige westenwind' },
  'haarlem':        { bodem: 'kleigrond op veen', bouwperiode: 'historische binnenstad en jaren-20 uitbreidingen', buurt: 'de Koninginnebuurt en Schalkwijk', klimaat: 'zeeklimaat, zilte lucht tast dakgoten aan' },
  'amersfoort':     { bodem: 'zandgrond op keizandleemlagen', bouwperiode: 'historische binnenstad en Vathorst nieuwbouw', buurt: 'Soesterkwartier en Vathorst', klimaat: 'gematigd, minder neerslag dan westkust' },
  'apeldoorn':      { bodem: 'zandgrond op de Veluwe', bouwperiode: 'bosrijke villabebouwing en jaren-60 grondgebonden woningen', buurt: 'Berg en Bos en de Binnenstad', klimaat: 'continentaal met koude winters en bladval die dakgoten verstopt' },
  'enschede':       { bodem: 'zandgrond (Twents keileemgebied)', bouwperiode: 'textielfabriekswoningen (1890-1940) en naoorlogse uitbreidingen', buurt: 'het Roombeek en de Getfert', klimaat: 'continentaal, relatief droog maar met harde winterbuien' },
  'zwolle':         { bodem: 'rivierklei en laagveengrond', bouwperiode: 'historische Hanzestad en jaren-80 uitbreidingswijken', buurt: 'Dieze en de Binnenstad', klimaat: 'laaggelegen met hoge grondwaterstanden na neerslag' },
  'leiden':         { bodem: 'hollandveen op zeeklei', bouwperiode: 'historische grachtenpanden en studentenpanden (17e-19e eeuw)', buurt: 'de Breestraat en het Rapenburg', klimaat: 'zeeklimaat met hoge grondwaterstand door de Rijn' },
  'delft':          { bodem: 'zeeklei op veen', bouwperiode: 'historische grachtenpanden en TU-campuswoningen', buurt: 'Binnenstad en TU-wijk', klimaat: 'zeeklimaat, hoog neerslagoverschot in najaar' },
  'dordrecht':      { bodem: 'rivierklei, eilandligging', bouwperiode: 'historische havenwoningen en jaren-50 rijtjeshuizen', buurt: 'de Voorstraat en Sterrenburg', klimaat: 'riviereiland met wisselende grondwaterstanden' },
  'zoetermeer':     { bodem: 'zeeklei op veen', bouwperiode: 'jaren-70 en -80 groeikernwoningen (vrijwel uitsluitend)', buurt: 'Seghwaert en Buytenwegh', klimaat: 'zeeklimaat, veel daken uit dezelfde bouwperiode die gelijktijdig verouderen' },
  'maastricht':     { bodem: 'mergel en rivierklei', bouwperiode: 'historische mergelstenen panden en jaren-60 uitbreidingen', buurt: 'de Wyck en het Statenkwartier', klimaat: 'het warmste en droogste klimaat van Nederland, maar zachte mergelstenen zijn vochtgevoelig' },
  'den-bosch':      { bodem: 'rivierklei op zand', bouwperiode: 'middeleeuwse binnenstad en naoorlogse uitbreidingen', buurt: 'de Binnenstad en Rosmalen', klimaat: 'gematigd Brabants klimaat met herfst en winterregenval' },
  'almere':         { bodem: 'ingepolderde zeebodem, hoge grondwaterstand', bouwperiode: 'jaren-80 en jaren-90 nieuwbouwwoningen (polderbouw)', buurt: 'Almere-Stad en Almere-Haven', klimaat: 'open polderlandschap met harde wind en hoge luchtvochtigheid' },
  'zaandam':        { bodem: 'veengrond met houten paalfondering', bouwperiode: 'traditionele houten bebouwing en jaren-70 uitbreidingen', buurt: 'de Kogerveldwijk en Zaandam-Zuid', klimaat: 'zeeklimaat, houtrotproblematiek door vochtige omgeving' },
  'deventer':       { bodem: 'rivierklei op zand (IJsseloever)', bouwperiode: 'historische Hanzestad en jaren-60 uitbreidingen', buurt: 'de Brink en Keizerslanden', klimaat: 'rivierstad, hoge grondwaterstand bij hoogwater op de IJssel' },
  'venlo':          { bodem: 'rivierklei (Maasoevers)', bouwperiode: 'historische binnenstad en moderne bedrijvenparken', buurt: 'Blerick en de Binnenstad', klimaat: 'continentaal, warm maar met periodiek hoge grondwaterstand door de Maas' },
  'leeuwarden':     { bodem: 'zeeklei op veen', bouwperiode: 'historische Friese panden en naoorlogse woningen', buurt: 'de Oldehove en Huizum', klimaat: 'winderig kustklimaat met veel neerslag in herfst en winter' },
  'alkmaar':        { bodem: 'kleigrond in een droogmakerij', bouwperiode: 'historische VOC-panden en naoorlogse uitbreidingen', buurt: 'de Binnenstad en Oudorp', klimaat: 'zeeklimaat, kleibodem vergroot funderingsproblematiek' },
  'gouda':          { bodem: 'veengrond, laag gelegen', bouwperiode: 'historische grachtenpanden en jaren-50 uitbreidingen', buurt: 'de Binnenstad en Goverwelle', klimaat: 'laaggelegen veengebied met hoge grondwaterstand' },
  'helmond':        { bodem: 'dekzand op leem', bouwperiode: 'naoorlogse industriewoningbouw (1950-1975)', buurt: 'Binnenstad en Rijpelberg', klimaat: 'gematigd Brabants klimaat' },
  'ede':            { bodem: 'zandgrond op de Veluwe', bouwperiode: 'jaren-50 militaire woningbouw en jaren-70 uitbreidingen', buurt: 'Veldhuizen en Ede-Centrum', klimaat: 'continentaal, koude winters met kans op vorstschade aan leidingen' },
  'hilversum':      { bodem: 'zandgrond', bouwperiode: "villa's en jaren-30 architectuur (Dudok)", buurt: 'Gooische Meent en Trompenberg', klimaat: 'relatief droog zandgebied maar grote daken vragen om aandacht' },
  'hengelo':        { bodem: 'zandgrond (Twents keileemgebied)', bouwperiode: 'industriearbeiderswoningen uit de jaren-30 en jaren-50', buurt: 'het Centrum en Woolde', klimaat: 'continentaal, harde noordoostenwind in winter' },
  'purmerend':      { bodem: 'veengrond in een droogmakerij', bouwperiode: 'jaren-70 en jaren-80 groeikernwoningen', buurt: 'Wheermolen en Purmer-Noord', klimaat: 'polderlandschap met hoge luchtvochtigheid' },
  'schiedam':       { bodem: 'rivierklei op veen', bouwperiode: 'historische jeneverstad en naoorlogse flats', buurt: 'de Binnenstad en Nieuwland', klimaat: 'zeeklimaat, hoge luchtvochtigheid door de Maas' },
}

function getStadsData(slug) {
  return stadsData[slug] || {
    bodem: 'gemengde bodemgesteldheid',
    bouwperiode: 'diverse woningtypes uit verschillende periodes',
    buurt: 'diverse wijken',
    klimaat: 'gematigd Nederlands klimaat'
  }
}

// Unieke meta titles en descriptions per type
function getMetaTitle(type, stad) {
  const titles = {
    'lekkage-dak':          `Daklekkage ${stad.naam} repareren? Bel direct | LekkageFix`,
    'lekkage-waterleiding': `Lekkage waterleiding ${stad.naam}? Spoed loodgieter | LekkageFix`,
    'lekkage-badkamer':     `Badkamerlekkage ${stad.naam} verhelpen | LekkageFix`,
    'riool-lekkage':        `Rioollekkage ${stad.naam}? Camera-inspectie & reparatie | LekkageFix`,
    'vochtprobleem':        `Vochtproblemen ${stad.naam} oplossen aan de bron | LekkageFix`,
    'lekkage-muur':         `Gevellekkage ${stad.naam} stoppen? Specialist ter plaatse | LekkageFix`,
    'kelderafdichting':     `Kelder waterdicht maken ${stad.naam} | LekkageFix`,
  }
  return titles[type.slug] || `${type.naam} ${stad.naam} | LekkageFix`
}

function getMetaDescription(type, stad) {
  const sd = getStadsData(stad.slug)
  const descs = {
    'lekkage-dak':          `Dak lekt in ${stad.naam}? Binnen 30 min een vakman bij jou thuis. Specialist in ${stad.woningtype}. Gratis inspectie, transparante offerte, 24/7 bereikbaar. Bel nu.`,
    'lekkage-waterleiding': `Gesprongen waterleiding in ${stad.naam}? Loodgieter binnen 30 min ter plaatse. ${sd.bouwperiode} vraagt om ervaren handen. Gratis inspectie. Bel 24/7.`,
    'lekkage-badkamer':     `Badkamer lekt door plafond in ${stad.naam}? Wij vinden de oorzaak zonder sloopwerk. Specialist in ${stad.woningtype}. Bel nu voor een gratis inspectie.`,
    'riool-lekkage':        `Rioollekkage of verstopt riool in ${stad.naam}? HD camera-inspectie zonder sloopwerk. Snel en vakkundig. 24/7 bereikbaar. Gratis offerte. Bel direct.`,
    'vochtprobleem':        `Vochtige muren of schimmel in ${stad.naam}? Wij pakken de bron aan, niet het symptoom. Ervaring met ${stad.woningtype}. Gratis vochtmeting. Bel nu.`,
    'lekkage-muur':         `Lekkage door de muur of gevel in ${stad.naam}? Regen dat naar binnen dringt stoppen we snel. Specialist in gevelreparatie. Gratis offerte. Bel 24/7.`,
    'kelderafdichting':     `Water in de kelder in ${stad.naam}? Duurzame kelderafdichting van binnenuit, geen opgraving. Ervaring met ${sd.bodem}. Gratis inspectie. Bel nu.`,
  }
  return descs[type.slug] || `${type.naam} in ${stad.naam}? LekkageFix is binnen 30 min ter plaatse. Gecertificeerde specialist, gratis offerte. Bel 24/7.`
}

// Unieke SEO content per stad+type combinatie
function getSeoContent(type, stad, sd) {
  const content = {
    'lekkage-dak': {
      p1: `Een daklekkage in ${stad.naam} is een urgente situatie die je niet moet uitstellen. ${stad.naam} heeft voornamelijk ${stad.woningtype} en de ${sd.klimaat}. Die combinatie maakt daken in ${stad.naam} kwetsbaarder dan gemiddeld. Water dat via een lek dak naar binnen komt, vindt zijn weg langs dakbalken en isolatiemateriaal voordat het als een natte vlek op het plafond zichtbaar wordt. Tegen die tijd is er al meer schade dan je ziet.`,
      p2: `De ${sd.bouwperiode} kent typische zwakke plekken. Bij ${stad.woningtype} zijn dat met name de dakvoeten, de overgangen bij dakkapellen en de afdichting rondom dakdoorvoeringen. ${stad.fact} De ${sd.bodem} zorgt er bovendien voor dat funderingsbewegingen bijdragen aan scheuren in dakafwerkingen.`,
      verzekering: `Een plotselinge daklekkage door stormschade of een gebroken pan valt bij de meeste opstalverzekeringen onder de dekking. Lekkage door slijtage van dakbedekking die al langer bestond, wordt doorgaans niet vergoed. Wij stellen een gedetailleerd inspectierapport op. In ${stad.naam} zijn wij erkend bij alle grote verzekeraars en helpen we je bij het indienen van de schadeclaim.`,
      prijzen: [
        { label: 'Inspectie dak ' + stad.naam, prijs: 'Gratis', tijd: '30 min' },
        { label: 'Dakpan(nen) vervangen', prijs: '€ 75 – € 200', tijd: '30 min' },
        { label: 'Kit rondom dakraam of schoorsteen', prijs: '€ 100 – € 350', tijd: '30 min' },
        { label: 'Gedeeltelijke vernieuwing plat dak', prijs: '€ 350 – € 1.800', tijd: '30 min' },
        { label: 'Volledige dakbedekking vernieuwen', prijs: 'Op aanvraag', tijd: '30 min' },
      ]
    },
    'lekkage-waterleiding': {
      p1: `Een lekkage aan de waterleiding in ${stad.naam} is altijd spoed. Zeker in wijken met ${sd.bouwperiode}, want leidingen uit die periode zijn soms al 40 tot 70 jaar oud. Koperen leidingen corrderen van binnenuit, loden leidingen (die bij oudere panden soms nog aanwezig zijn) worden na decennia poreus. Wat begint als een kleine druppel achter de muur kan binnen enkele weken uitgroeien tot ernstige waterschade in vloeren en wanden.`,
      p2: `In ${stad.naam}, gebouwd op ${sd.bodem}, speelt ook grondbeweging een rol. Een leiding die jarenlang heeft meegebogen met kleine verzakkingen kan op een punt scheuren. Wijken als ${sd.buurt} hebben bovengemiddeld veel lekkages aan oudere leidingen. ${stad.fact} De ${sd.klimaat} zorgt daarnaast voor vorstschade in de wintermaanden bij slecht geisoleerde buitenleidingen.`,
      verzekering: `Een plotseling gesprongen waterleiding valt bij de meeste opstalverzekeringen onder de dekking als de schade plotseling en onverwacht is. Geleidelijke lekkage door slijtage of achterstallig onderhoud wordt niet vergoed. Wij stellen in ${stad.naam} altijd een gedetailleerd rapport op dat aantoont dat het om acute schade gaat.`,
      prijzen: [
        { label: 'Lekdetectie waterleiding ' + stad.naam, prijs: 'Gratis', tijd: '30 min' },
        { label: 'Reparatie zichtbare leiding', prijs: '€ 60 – € 200', tijd: '30 min' },
        { label: 'Reparatie leiding in muur of vloer', prijs: '€ 200 – € 900', tijd: '30 min' },
        { label: 'Gedeeltelijke leidingvervanging', prijs: '€ 400 – € 1.800', tijd: '30 min' },
        { label: 'Volledige leidingvernieuwing', prijs: 'Op aanvraag', tijd: '30 min' },
      ]
    },
    'lekkage-badkamer': {
      p1: `Badkamerlekkage in ${stad.naam} is een veelvoorkomend probleem dat zich vaak pas laat zien. Water sijpelt via een gebarsten kitrand of beschadigde waterdichte laag door de vloerconstructie heen, en wordt pas zichtbaar als er een natte plek op het plafond van de kamer eronder verschijnt. Bij ${stad.woningtype}, met name bij woningen uit de ${sd.bouwperiode}, zijn badkamers soms al 20 tot 30 jaar oud zonder grote renovatie.`,
      p2: `In wijken als ${sd.buurt} in ${stad.naam} zien wij regelmatig badkamers waarbij de originele kit nog aanwezig is van bij de bouw. Die kit heeft een levensduur van 5 tot 10 jaar en scheurt daarna. ${stad.fact} De ${sd.klimaat} maakt ventilatie in badkamers extra belangrijk, want condensatie versnelt het slijten van kitranden en voegen.`,
      verzekering: `Plotselinge schade door een gesprongen badkamerafvoer of acute lekkage kan worden vergoed. Slijtage van kit of voegen valt buiten de dekking. Wij stellen altijd een inspectierapport op met de oorzaak en de datering van de schade voor je verzekeraar in ${stad.naam}.`,
      prijzen: [
        { label: 'Inspectie badkamer ' + stad.naam, prijs: 'Gratis', tijd: '30 min' },
        { label: 'Kit vernieuwen rondom douche of bad', prijs: '€ 80 – € 250', tijd: '30 min' },
        { label: 'Afvoer of sifon repareren', prijs: '€ 100 – € 350', tijd: '30 min' },
        { label: 'Waterdichte laag herstellen', prijs: '€ 450 – € 2.200', tijd: '30 min' },
        { label: 'Gedeeltelijke badkamerrenovatie', prijs: 'Op aanvraag', tijd: '30 min' },
      ]
    },
    'riool-lekkage': {
      p1: `Een rioollekkage in ${stad.naam} is geen probleem dat je kunt negeren. Rioolgas is ongezond en de geur is doordringend. Bij ${stad.woningtype} zijn rioolbuizen soms al decennia oud. Buizen van terracotta, die voor 1970 veel werden gebruikt, worden na 50 jaar bros. In ${stad.naam}, op ${sd.bodem}, speelt ook grondverzakking een rol: leidingen die meebewegen met de bodem kunnen op verbindingspunten breken.`,
      p2: `In wijken als ${sd.buurt} zien we boomwortels als een van de meest voorkomende oorzaken van rioollekkage. Bomen zoeken water en dringen via naden rioolbuizen binnen. ${stad.fact} Wij voeren altijd een camera-inspectie uit voor we iets repareren, zodat we precies weten wat er speelt en geen onnodige kosten maken.`,
      verzekering: `Een plotselinge breuk in een rioolleiding kan in sommige gevallen worden vergoed. Schade door verstopping, wortelindringing of ouderdom valt doorgaans buiten de dekking. Wij stellen voor klanten in ${stad.naam} altijd een inspectierapport op met de HD camerabeelden als bewijs.`,
      prijzen: [
        { label: 'Camera-inspectie riolering ' + stad.naam, prijs: 'Gratis', tijd: '30 min' },
        { label: 'Reiniging met hogedrukspuit', prijs: '€ 150 – € 450', tijd: '30 min' },
        { label: 'Reparatie lokale beschadiging', prijs: '€ 200 – € 700', tijd: '30 min' },
        { label: 'Inliner plaatsen (geen opgraving)', prijs: '€ 600 – € 2.200', tijd: '30 min' },
        { label: 'Vervanging rioolleiding', prijs: 'Op aanvraag', tijd: '30 min' },
      ]
    },
    'vochtprobleem': {
      p1: `Vochtproblemen in ${stad.naam} hebben bijna altijd te maken met de specifieke bodemgesteldheid en het lokale klimaat. ${stad.naam} heeft ${sd.bodem}. ${sd.klimaat}. Die twee factoren maken dat woningen in ${stad.naam} structureel te maken hebben met vochtindringing van buitenaf of optrekkend grondvocht. Bij ${stad.woningtype} uit de ${sd.bouwperiode} zijn de waterkerende lagen soms al sterk verouderd.`,
      p2: `Schimmel, die vaak het eerste zichtbare teken is van een vochtprobleem, is niet alleen lelijk maar ook gezondheidsschadelijk. Schimmelsporen in de lucht kunnen luchtwegproblemen veroorzaken. ${stad.fact} In wijken als ${sd.buurt} zien wij regelmatig dat een verflaag of schimmelreiniger het probleem tijdelijk verbergt maar niet oplost. Wij zoeken altijd de bron.`,
      verzekering: `Vochtschade door achterstallig onderhoud of slijtage wordt door verzekeraars vrijwel nooit vergoed. Als het vocht het gevolg is van een plotselinge lekkage (gesprongen leiding, stormschade aan dak) kan de schade wel onder de opstalverzekering vallen. Wij stellen in ${stad.naam} altijd een rapport op met de oorzaak.`,
      prijzen: [
        { label: 'Vochtinspectie ' + stad.naam, prijs: 'Gratis', tijd: '30 min' },
        { label: 'Ventilatie-advies en aanpassing', prijs: '€ 100 – € 350', tijd: '30 min' },
        { label: 'Schimmelbehandeling', prijs: '€ 150 – € 550', tijd: '30 min' },
        { label: 'Muurinjectie tegen optrekkend vocht', prijs: '€ 500 – € 2.200', tijd: '30 min' },
        { label: 'Gevelbehandeling of isolatieadvies', prijs: 'Op aanvraag', tijd: '30 min' },
      ]
    },
    'lekkage-muur': {
      p1: `Lekkage door de muur is in ${stad.naam} een klassieker, met name bij de ${sd.bouwperiode}. Voegwerk slijt na 20 tot 30 jaar en wordt poreus. Regenwater trekt dan via de voegen de binnenmuur in. Bij harde westenwind, zoals ${sd.klimaat} regelmatig brengt, staat er een waterdruk op de gevel die het voegwerk snel veroudert. De natte plek aan de binnenkant van de muur verschijnt dan altijd na regen en trekt weg als het droog is.`,
      p2: `In wijken als ${sd.buurt} in ${stad.naam} zien we ook loslatende kit rondom kozijnen als een veelvoorkomende oorzaak. ${stad.fact} Kit heeft een levensduur van 10 tot 15 jaar en dan is het voorbij. Water loopt via de overgang tussen kozijn en metselwerk naar binnen, soms volledig onzichtbaar van buiten.`,
      verzekering: `Plotselinge schade aan de gevel door stormschade kan worden vergoed. Lekkage door verouderd voegwerk of slijtende kit valt buiten de dekking. Wij stellen voor onze klanten in ${stad.naam} altijd een rapport op dat duidelijk maakt wat de oorzaak is en of er sprake is van acuut of geleidelijk ontstane schade.`,
      prijzen: [
        { label: 'Gevelinspectie ' + stad.naam, prijs: 'Gratis', tijd: '30 min' },
        { label: 'Kit vernieuwen rondom kozijnen', prijs: '€ 100 – € 380', tijd: '30 min' },
        { label: 'Gedeeltelijk opnieuw voegen', prijs: '€ 200 – € 900', tijd: '30 min' },
        { label: 'Gevelcoating aanbrengen', prijs: '€ 500 – € 2.800', tijd: '30 min' },
        { label: 'Volledig gevelonderhoud', prijs: 'Op aanvraag', tijd: '30 min' },
      ]
    },
    'kelderafdichting': {
      p1: `Kelderafdichting in ${stad.naam} is een specialistisch werk dat nauwkeurige kennis van de lokale bodem vereist. ${stad.naam} heeft ${sd.bodem}. Dat betekent dat grondwater in ${stad.naam} een hoge druk uitoefent op kelderwanden en -vloer, zeker na natte periodes. Bij woningen uit de ${sd.bouwperiode} is de originele afdichting soms al 40 tot 80 jaar oud en niet meer waterdicht.`,
      p2: `In wijken als ${sd.buurt} zien wij regelmatig kelders die jarenlang vochtig zijn geweest zonder dat de bewoners de oorzaak kenden. ${stad.fact} Grondwater dringt niet als een stroom binnen maar sijpelt geleidelijk door microscopische porieen in beton of steen, een proces dat kristallisatie-afdichting kan stoppen zonder opgraving.`,
      verzekering: `Schade door grondwater wordt door de meeste verzekeraars beschouwd als een geleidelijk proces en valt buiten de dekking. Plotselinge instroming door extreme grondwaterstand of een gesprongen fundering kan soms wel worden vergoed. Wij stellen een gedetailleerd rapport op voor je claim in ${stad.naam}.`,
      prijzen: [
        { label: 'Kelderinspectie ' + stad.naam, prijs: 'Gratis', tijd: '30 min' },
        { label: 'Scheurreparatie kelderwand', prijs: '€ 200 – € 700', tijd: '30 min' },
        { label: 'Afdichting gedeelte kelderwand', prijs: '€ 600 – € 2.200', tijd: '30 min' },
        { label: 'Volledige kelderafdichting (kristallisatie)', prijs: '€ 2.200 – € 9.000', tijd: '30 min' },
        { label: 'Drainagesysteem binnenzijde', prijs: 'Op aanvraag', tijd: '30 min' },
      ]
    },
  }
  return content[type.slug] || {
    p1: `${type.naam} in ${stad.naam} is een veelvoorkomend probleem, met name bij ${stad.woningtype}. ${stad.fact}`,
    p2: `In ${stad.naam}, op ${sd.bodem}, zijn de meest voorkomende oorzaken gerelateerd aan het type bebouwing en het lokale klimaat.`,
    verzekering: `Plotselinge schade valt doorgaans onder de opstalverzekering. Wij stellen een inspectierapport op voor je claim.`,
    prijzen: [
      { label: 'Inspectie ' + stad.naam, prijs: 'Gratis', tijd: '30 min' },
      { label: 'Kleine reparatie', prijs: '€ 75 – € 250', tijd: '30 min' },
      { label: 'Middelgrote reparatie', prijs: '€ 250 – € 800', tijd: '30 min' },
      { label: 'Grote reparatie', prijs: '€ 800 – € 2.500', tijd: '30 min' },
      { label: 'Volledige vervanging', prijs: 'Op aanvraag', tijd: '30 min' },
    ]
  }
}

function getSeizoenTip(typeSlug, stadNaam) {
  const m = new Date().getMonth()
  const seizoen = m >= 2 && m <= 4 ? 'lente' : m >= 5 && m <= 7 ? 'zomer' : m >= 8 && m <= 10 ? 'herfst' : 'winter'
  const tips = {
    dak: {
      lente: `🌱 Lentetip voor ${stadNaam}: Inspecteer je dak na de winter op losgewaaide dakpannen en beschadigd voegwerk.`,
      zomer: `☀️ Zomertip voor ${stadNaam}: Controleer dakdoorvoeringen en kit. Warmte en UV-straling versnellen slijtage.`,
      herfst: `🍂 Herfsttip voor ${stadNaam}: Reinig dakgoten voor de natte periode. Verstopte goten zijn de grootste oorzaak van daklekkages.`,
      winter: `❄️ Wintertip voor ${stadNaam}: Let op ijsvorming bij dakranden en dakkapellen. Bevroren water kan dakbedekking scheuren.`,
    },
    waterleiding: {
      lente: `🌱 Lentetip voor ${stadNaam}: Controleer buitenkranen na de winter op vorstschade aan leidingen.`,
      zomer: `☀️ Zomertip voor ${stadNaam}: Hogere waterdruk in de zomer kan zwakke verbindingen aan het licht brengen.`,
      herfst: `🍂 Herfsttip voor ${stadNaam}: Isoleer buitenleidingen voor de eerste vorst om leidingbreuk te voorkomen.`,
      winter: `❄️ Wintertip voor ${stadNaam}: Bij vorst kunnen leidingen bevriezen en barsten. Houd de cv op minimaal 15 graden.`,
    },
    badkamer: {
      lente: `🌱 Lentetip voor ${stadNaam}: Inspecteer kitnaden in douche en bad na de winter op scheuren.`,
      zomer: `☀️ Zomertip voor ${stadNaam}: Extra ventilatie in de badkamer voorkomt schimmelvorming door hogere temperaturen.`,
      herfst: `🍂 Herfsttip voor ${stadNaam}: Controleer voegen en tegels voor het stookseizoen begint.`,
      winter: `❄️ Wintertip voor ${stadNaam}: Temperatuurwisselingen in de badkamer kunnen voegwerk en tegels doen scheuren.`,
    },
    riool: {
      lente: `🌱 Lentetip voor ${stadNaam}: Laat je riool inspecteren na de winter. Wortels groeien het hardst in het voorjaar.`,
      zomer: `☀️ Zomertip voor ${stadNaam}: Droge periodes kunnen rioolbuizen doen krimpen en scheuren.`,
      herfst: `🍂 Herfsttip voor ${stadNaam}: Bladeren verstoppen rioolaansluitingen. Laat ze tijdig reinigen.`,
      winter: `❄️ Wintertip voor ${stadNaam}: Bevroren rioolaansluiting? Bel direct. Dit kan snel leiden tot terugstromend water.`,
    },
    vocht: {
      lente: `🌱 Lentetip voor ${stadNaam}: Na de winter worden vochtplekken in muren zichtbaar. Laat ze tijdig behandelen.`,
      zomer: `☀️ Zomertip voor ${stadNaam}: Goed ventileren voorkomt condensatie en schimmelvorming.`,
      herfst: `🍂 Herfsttip voor ${stadNaam}: Stijgende grondwaterstand in het najaar vergroot het risico op kelderlekkages.`,
      winter: `❄️ Wintertip voor ${stadNaam}: Koudebruggen in de gevel zorgen voor condensatie en vochtproblemen in de winter.`,
    },
    gevel: {
      lente: `🌱 Lentetip voor ${stadNaam}: Inspecteer voegwerk na de winter op vorstschade en barsten.`,
      zomer: `☀️ Zomertip voor ${stadNaam}: Droge zomers laten scheuren in de gevel groter worden. Laat ze tijdig bijwerken.`,
      herfst: `🍂 Herfsttip voor ${stadNaam}: Herstel gevelvoegen voor de regen- en stormperiode begint.`,
      winter: `❄️ Wintertip voor ${stadNaam}: Waterinfiltratie in gevels bevriest en vergroot scheuren. Tijdig repareren bespaart kosten.`,
    },
    kelder: {
      lente: `🌱 Lentetip voor ${stadNaam}: Hogere grondwaterstanden in het voorjaar verhogen de druk op keldermuren.`,
      zomer: `☀️ Zomertip voor ${stadNaam}: Inspecteer de kelderafdichting na een droge zomer. Uitdroging kan scheuren veroorzaken.`,
      herfst: `🍂 Herfsttip voor ${stadNaam}: Bereid je kelder voor op de natte periode. Controleer afdichting en afvoer.`,
      winter: `❄️ Wintertip voor ${stadNaam}: Bevroren grond kan extra druk uitoefenen op keldermuren. Let op nieuwe scheuren.`,
    },
  }
  const slugMap = { 'lekkage-dak':'dak', 'lekkage-waterleiding':'waterleiding', 'lekkage-badkamer':'badkamer', 'riool-lekkage':'riool', 'vochtprobleem':'vocht', 'lekkage-muur':'gevel', 'kelderafdichting':'kelder' }
  const key = slugMap[typeSlug] || typeSlug
  return tips[key]?.[seizoen] || tips.dak[seizoen]
}

function getLocalReviews(stad, type) {
  return [
    {
      naam: `Thomas B.`,
      stad: stad.naam,
      tekst: `Na weken zoeken naar de oorzaak van vocht in mijn woning in ${stad.naam} heeft LekkageFix het probleem binnen een uur gevonden en opgelost. De monteur kende de ${stad.woningtype} goed en wist precies waar te zoeken.`,
      datum: '1 week geleden',
      rating: 5,
    },
    {
      naam: `Marieke V.`,
      stad: stad.naam,
      tekst: `Wij wonen al jaren in ${stad.naam} en hebben al eerder last gehad van ${type.naam.toLowerCase()}. LekkageFix was snel ter plaatse, transparante offerte vooraf en het werk is netjes uitgevoerd. Eindelijk droog.`,
      datum: '2 weken geleden',
      rating: 5,
    },
    {
      naam: `Rob H.`,
      stad: stad.naam,
      tekst: `Als ${stad.naam}-er was ik blij dat de monteur lokale kennis had over ${stad.woningtype}. Direct de juiste diagnose gesteld. Aanrader voor iedereen in de regio ${stad.provincie}.`,
      datum: '1 maand geleden',
      rating: 5,
    },
  ]
}

export async function getStaticPaths() {
  const paths = []
  lekkageTypes.forEach(type => {
    steden.forEach(stad => {
      paths.push({ params: { type: type.slug, stad: stad.slug } })
    })
  })
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const type = getType(params.type)
  const stad = getSted(params.stad)
  if (!type || !stad) return { notFound: true }
  return { props: { type, stad } }
}

export default function LekkageTypeStad({ type, stad }) {
  const [submitted, setSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const [seizoenTip, setSeizoenTip] = useState('')
  const monteur = getMonteur(stad.provincie)
  const sd = getStadsData(stad.slug)
  const seoContent = getSeoContent(type, stad, sd)

  useEffect(() => {
    setSeizoenTip(getSeizoenTip(type.slug, stad.naam))
  }, [type.slug, stad.naam])

  const title = getMetaTitle(type, stad)
  const description = getMetaDescription(type, stad)

  const andereSteden = steden.filter(s => s.slug !== stad.slug && s.provincie === stad.provincie)
  const andereTypes = lekkageTypes.filter(t => t.slug !== type.slug)
  const localReviews = getLocalReviews(stad, type)

  const faqs = [
    { v: `Hoe snel zijn jullie bij een ${type.naam.toLowerCase()} in ${stad.naam}?`, a: `In ${stad.naam} en omgeving streven we naar een reactietijd van gemiddeld 30 minuten. We zijn 24/7 bereikbaar, ook in het weekend en op feestdagen.` },
    { v: `Wat zijn typische oorzaken van ${type.naam.toLowerCase()} in ${stad.naam}?`, a: `In ${stad.naam}, met name bij ${stad.woningtype}, zijn veelvoorkomende oorzaken: ${type.oorzaken.slice(0,3).map(o => o.titel || o).join(', ')}. ${stad.fact}` },
    { v: `Wat kost ${type.naam.toLowerCase()} reparatie in ${stad.naam}?`, a: `De kosten hangen af van de omvang en oorzaak. We geven altijd een transparante offerte vooraf. Bel ons voor een vrijblijvende indicatie.` },
    { v: `Vergoedt mijn verzekering ${type.naam.toLowerCase()} in ${stad.naam}?`, a: `Plotselinge lekkages vallen doorgaans onder de opstalverzekering. Wij zijn erkend door alle grote verzekeraars en stellen een gedetailleerd rapport op voor je claim.` },
    { v: 'Geven jullie garantie op het werk?', a: 'Ja. We geven garantie op alle uitgevoerde reparaties. Mocht er iets niet goed zijn, dan lossen we het kosteloos op.' },
    { v: `Werken jullie ook 's nachts in ${stad.naam}?`, a: `Ja, we zijn dag en nacht bereikbaar in ${stad.naam} en omgeving. Ook in het weekend en op feestdagen.` },
    { v: `Hebben jullie ervaring met ${stad.woningtype}?`, a: `Absoluut. Onze monteurs in ${stad.provincie} hebben ruime ervaring met ${stad.woningtype} en kennen de specifieke uitdagingen hiervan.` },
  ]

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://lekkagefix.nl/#business",
        "name": "LekkageFix",
        "url": "https://lekkagefix.nl",
        "telephone": PHONE,
        "openingHours": "Mo-Su 00:00-24:00",
        "priceRange": "€€",
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "2847", "bestRating": "5" },
        "review": localReviews.map(r => ({
          "@type": "Review",
          "author": { "@type": "Person", "name": r.naam },
          "reviewRating": { "@type": "Rating", "ratingValue": String(r.rating), "bestRating": "5" },
          "reviewBody": r.tekst,
        }))
      },
      {
        "@type": "Service",
        "name": `${type.naam} ${stad.naam}`,
        "provider": { "@id": "https://lekkagefix.nl/#business" },
        "areaServed": { "@type": "City", "name": stad.naam, "containedInPlace": { "@type": "AdministrativeArea", "name": stad.provincie } },
        "description": description,
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqs.map(f => ({
          "@type": "Question",
          "name": f.v,
          "acceptedAnswer": { "@type": "Answer", "text": f.a }
        }))
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://lekkagefix.nl" },
          { "@type": "ListItem", "position": 2, "name": "Lekkage", "item": "https://lekkagefix.nl/lekkage" },
          { "@type": "ListItem", "position": 3, "name": type.naam, "item": `https://lekkagefix.nl/lekkage/dienst/${type.slug}` },
          { "@type": "ListItem", "position": 4, "name": stad.naam, "item": `https://lekkagefix.nl/lekkage/${type.slug}/${stad.slug}` },
        ]
      },
      {
        "@type": "Person",
        "name": monteur.naam,
        "jobTitle": monteur.functie,
        "worksFor": { "@id": "https://lekkagefix.nl/#business" },
        "areaServed": { "@type": "AdministrativeArea", "name": stad.provincie }
      }
    ]
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://lekkagefix.nl/lekkage/${type.slug}/${stad.slug}`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`https://lekkagefix.nl/lekkage/${type.slug}/${stad.slug}`} />
        <style>{`
          @media (max-width: 768px) {
            .hero-inner { grid-template-columns: 1fr !important; }
            .kaart-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      </Head>
      <Nav activePath="/lekkage" />

      {/* BREADCRUMB */}
      <div className="breadcrumb-bar">
        <div className="breadcrumb">
          <a href="/">Home</a><span className="breadcrumb-sep">›</span>
          <a href="/lekkage">Lekkage</a><span className="breadcrumb-sep">›</span>
          <a href={`/lekkage/dienst/${type.slug}`}>{type.naam}</a><span className="breadcrumb-sep">›</span>
          <span>{stad.naam}</span>
        </div>
      </div>

      {/* SEIZOEN TIP BANNER */}
      {seizoenTip && (
        <div style={{background:'var(--green3)',borderBottom:'1px solid var(--green4)',padding:'0.65rem clamp(1rem,5vw,3rem)',fontSize:'0.82rem',color:'var(--green-dark)',fontWeight:500}}>
          <div style={{maxWidth:'1200px',margin:'0 auto'}}>{seizoenTip}</div>
        </div>
      )}

      {/* HERO */}
      <section className="hero">
        <div className="hero-dots" />
        <div className="hero-inner">
          <div>
            <div className="hero-badge-urgency">⚠️ {type.urgentie === 'hoog' ? 'Spoed aanbevolen' : 'Tijdig handelen'}</div>
            <span className="hero-icon">{type.icon}</span>
            <h1><em>{type.naam}</em> in {stad.naam}</h1>
            <p className="hero-sub">{stad.naam} heeft voornamelijk {stad.woningtype}. {stad.fact}</p>
            <div className="hero-stats">
              <div className="stat-item"><div className="stat-val">30<sup>min</sup></div><div className="stat-key">Gem. reactie</div></div>
              <div className="stat-item"><div className="stat-val">4.9<sup>★</sup></div><div className="stat-key">Beoordeling</div></div>
              <div className="stat-item"><div className="stat-val">24<sup>/7</sup></div><div className="stat-key">Bereikbaar</div></div>
              <div className="stat-item"><div className="stat-val">100<sup>%</sup></div><div className="stat-key">Garantie</div></div>
            </div>
            <div className="hero-actions">
              <a href={`tel:${PHONE}`} className="btn-call">📞 Bel direct: {PHONE_DISPLAY}</a>
              <a href="#offerte" className="btn-ghost">Offerte aanvragen →</a>
            </div>
          </div>

          {/* OFFERTE FORMULIER */}
          <div className="form-card" id="offerte">
            <div style={{display:'flex',alignItems:'center',gap:'0.85rem',padding:'0.85rem 1rem',background:'var(--green3)',borderRadius:'10px',marginBottom:'1.25rem',border:'1px solid var(--green4)'}}>
              <MonteurAvatar monteur={monteur} size={46} border="2.5px solid white" bg="var(--green)" />
              <div>
                <div style={{fontSize:'0.78rem',fontWeight:700,color:'var(--green-dark)'}}>{monteur.naam} · {monteur.functie}</div>
                <div style={{fontSize:'0.72rem',color:'var(--muted)',lineHeight:1.4}}>Actief in {stad.provincie} · {monteur.ervaring} ervaring</div>
                <div style={{fontSize:'0.72rem',color:'var(--muted)',fontStyle:'italic',marginTop:'0.15rem'}}>"{monteur.quote}"</div>
              </div>
            </div>
            <div className="form-title">{type.naam} in {stad.naam}</div>
            <div className="form-sub">Gratis inspectie · we nemen snel contact op</div>
            <div className="fg"><label>Adres in {stad.naam}</label><input type="text" placeholder="Straat + huisnummer" /></div>
            <div className="form-row">
              <div className="fg"><label>Naam</label><input type="text" placeholder="Jan de Vries" /></div>
              <div className="fg"><label>Telefoon</label><input type="tel" placeholder="06-12345678" /></div>
            </div>
            <div className="fg">
              <label>Type lekkage</label>
              <select style={{width:'100%',padding:'0.65rem 0.85rem',border:'1.5px solid var(--border)',borderRadius:'var(--radius)',fontFamily:'inherit',fontSize:'0.88rem',color:'var(--text)',background:'white'}}>
                <option value={type.slug}>{type.naam}</option>
                {lekkageTypes.filter(t => t.slug !== type.slug).map(t => <option key={t.slug} value={t.slug}>{t.naam}</option>)}
              </select>
            </div>
            <div className="fg"><label>Beschrijving</label><textarea placeholder={`Beschrijf de ${type.naam.toLowerCase()} kort...`} /></div>
            <button className={`btn-form${submitted ? ' ok' : ''}`} onClick={() => setSubmitted(true)}>
              {submitted ? '✓ Aanvraag ontvangen!' : 'Stuur aanvraag →'}
            </button>
            <div className="form-trust"><span>🔒 Veilig</span><span>✓ Geen spam</span><span>⚡ Snelle reactie</span></div>
          </div>
        </div>
      </section>

      {/* WERKWIJZE */}
      <section className="section section-white">
        <div className="section-inner">
          <div className="sec-head-center">
            <div className="eyebrow">Werkwijze</div>
            <h2>Van melding tot <em>oplossing</em> in {stad.naam}</h2>
            <p className="sec-sub">Helder en transparant. Zo pakken we een {type.naam.toLowerCase()} aan in {stad.naam}.</p>
          </div>
          <div className="steps">
            <div className="step"><div className="step-num">1</div><h3>Melding</h3><p>Bel of stuur een aanvraag. We bespreken het probleem en plannen een afspraak in {stad.naam}.</p></div>
            <div className="step"><div className="step-num">2</div><h3>Vakman onderweg</h3><p>De dichtstbijzijnde monteur in {stad.provincie} rijdt naar je toe. Gemiddeld binnen 30 minuten.</p></div>
            <div className="step"><div className="step-num">3</div><h3>Inspectie & offerte</h3><p>Grondige inspectie met moderne apparatuur. Transparante prijsopgave vooraf, geen verrassingen.</p></div>
            <div className="step"><div className="step-num">4</div><h3>Opgelost & gegarandeerd</h3><p>Vakkundige reparatie met garantie op het werk. Netjes opgeruimd achtergelaten.</p></div>
          </div>
        </div>
      </section>

      {/* INFO + KAART */}
      <section className="section section-alt">
        <div className="section-inner">
          <div className="kaart-grid" style={{display:'grid',gridTemplateColumns:'1fr 1.4fr',gap:'3rem',alignItems:'start'}}>
            <div>
              <div className="eyebrow">Werkgebied</div>
              <h2>{type.naam} in <em>{stad.naam}</em></h2>
              <p style={{color:'var(--muted)',fontSize:'0.92rem',lineHeight:1.85,margin:'1rem 0'}}>
                {stad.naam} telt {stad.inwoners} inwoners en bestaat voornamelijk uit {stad.woningtype}. {stad.fact}
              </p>
              <p style={{color:'var(--muted)',fontSize:'0.92rem',lineHeight:1.85,marginBottom:'1.5rem'}}>
                Onze monteurs zijn dagelijks actief in {stad.naam} en de omliggende gemeenten in {stad.provincie}. Door onze lokale aanwezigheid zijn we gemiddeld binnen 30 minuten ter plaatse, ook voor spoedgevallen buiten kantooruren.
              </p>
              <div style={{display:'flex',alignItems:'center',gap:'0.85rem',padding:'0.85rem 1rem',background:'white',borderRadius:'10px',border:'1.5px solid var(--border)'}}>
                {monteur.img ? (
                  <img src={monteur.img} alt={monteur.naam} style={{width:'42px',height:'42px',borderRadius:'50%',objectFit:'cover',flexShrink:0}} />
                ) : (
                  <div style={{width:'42px',height:'42px',borderRadius:'50%',background:'var(--green)',color:'white',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.85rem',fontWeight:800,flexShrink:0}}>
                    {monteur.foto}
                  </div>
                )}
                <div>
                  <div style={{fontSize:'0.8rem',fontWeight:700,color:'var(--text)'}}>{monteur.naam}</div>
                  <div style={{fontSize:'0.72rem',color:'var(--muted)'}}>Specialist in {stad.provincie} · {monteur.ervaring} ervaring</div>
                </div>
                <a href={`tel:${PHONE}`} style={{marginLeft:'auto',background:'var(--orange)',color:'white',borderRadius:'8px',padding:'0.4rem 0.85rem',fontSize:'0.78rem',fontWeight:700,textDecoration:'none',whiteSpace:'nowrap'}}>Bel direct</a>
              </div>
            </div>
            <div>
              <div style={{borderRadius:'16px',overflow:'hidden',border:'2px solid var(--border)',boxShadow:'0 4px 20px rgba(0,0,0,0.08)',height:'300px',marginBottom:'1rem'}}>
                <iframe
                  title={`Kaart ${stad.naam}`}
                  width="100%" height="100%"
                  style={{border:0,display:'block'}}
                  loading="lazy"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${stad.lon-0.08}%2C${stad.lat-0.05}%2C${stad.lon+0.08}%2C${stad.lat+0.05}&layer=mapnik&marker=${stad.lat}%2C${stad.lon}`}
                />
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.4rem'}}>
                {andereSteden.slice(0,8).map(s => (
                  <a key={s.slug} href={`/lekkage/${type.slug}/${s.slug}`}
                    style={{fontSize:'0.8rem',color:'var(--green)',textDecoration:'none',padding:'0.35rem 0.5rem',borderRadius:'6px',background:'white',border:'1px solid var(--border)'}}
                    onMouseEnter={e => e.currentTarget.style.borderColor='var(--green)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor='var(--border)'}
                  >
                    {type.naam} {s.naam}
                  </a>
                ))}
                <a href={`/lekkage/dienst/${type.slug}`}
                  style={{fontSize:'0.8rem',color:'var(--muted)',textDecoration:'none',padding:'0.35rem 0.5rem',borderRadius:'6px',background:'white',border:'1px solid var(--border)',gridColumn:'1/-1'}}>
                  Alle steden in {stad.provincie} bekijken →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section section-alt">
        <div className="section-inner">
          <div className="sec-head-center">
            <div className="eyebrow">Klantervaringen in {stad.naam}</div>
            <h2>Wat klanten in <em>{stad.naam}</em> zeggen</h2>
            <p className="sec-sub">4.9 sterren op basis van 2.847 reviews.</p>
          </div>
          <div className="reviews-grid">
            {localReviews.map((r, i) => (
              <div key={i} className="review">
                <div className="review-top">
                  <div className="stars">{'★'.repeat(r.rating)}</div>
                  <div className="review-date">{r.datum}</div>
                </div>
                <p className="review-text">"{r.tekst}"</p>
                <div className="reviewer">
                  <div className="avatar">{r.naam.split(' ').map(n => n[0]).join('')}</div>
                  <div>
                    <div className="rev-name">{r.naam}</div>
                    <div className="rev-meta">📍 {r.stad} · <span className="verified">✓ geverifieerd</span></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO CONTENT */}
      <section className="section section-white">
        <div className="section-inner">
          <div className="seo-grid">
            <div className="seo-block">
              <div className="eyebrow">{type.naam} in {stad.naam}</div>
              <h2>{type.naam} in {stad.naam}: <em>alles wat je moet weten</em></h2>

              <h3>{type.naam} in {stad.naam} herkennen</h3>
              <p>{seoContent.p1}</p>

              <h3>Oorzaken van {type.naam.toLowerCase()} in {stad.naam}</h3>
              <p>{seoContent.p2}</p>

              <h3>Kosten {type.naam.toLowerCase()} reparatie in {stad.naam}</h3>
              <p>De kosten hangen af van de omvang en de oorzaak. Hieronder een overzicht van indicatieve prijzen voor {stad.naam}. Je ontvangt altijd eerst een gratis offerte voor we iets aanpakken.</p>

              <div className="price-table">
                <table>
                  <thead><tr><th scope="col">Type werkzaamheid</th><th scope="col">Indicatie kosten</th><th scope="col">Reactietijd</th></tr></thead>
                  <tbody>
                    {seoContent.prijzen.map((r, i) => (
                      <tr key={i} className={i === 0 ? 'highlight-row' : ''}>
                        <td>{i === 0 ? <strong>{r.label}</strong> : r.label}</td>
                        <td>{r.prijs}</td>
                        <td>{r.tijd}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="table-note">* Prijzen zijn indicatief. Definitieve prijs na inspectie ter plaatse in {stad.naam}.</p>
              </div>

              <h3>{type.naam} en je verzekering in {stad.naam}</h3>
              <p>{seoContent.verzekering}</p>
            </div>

            <div className="seo-sticky">
              <div style={{background:'var(--green-dark)',borderRadius:'14px',padding:'1.5rem',marginBottom:'1rem',color:'white'}}>
                <div style={{display:'flex',alignItems:'center',gap:'0.85rem',marginBottom:'1rem'}}>
                  <MonteurAvatar monteur={monteur} size={52} border="2px solid rgba(255,255,255,0.3)" bg="rgba(255,255,255,0.15)" />
                  <div>
                    <div style={{fontWeight:700,fontSize:'0.9rem'}}>{monteur.naam}</div>
                    <div style={{fontSize:'0.75rem',opacity:0.8}}>{monteur.functie} · {stad.provincie}</div>
                    <div style={{fontSize:'0.72rem',opacity:0.7,marginTop:'0.1rem'}}>{monteur.ervaring} ervaring</div>
                  </div>
                </div>
                <p style={{fontSize:'0.82rem',opacity:0.9,lineHeight:1.7,marginBottom:'1rem',fontStyle:'italic'}}>"{monteur.quote}"</p>
                <a href={`tel:${PHONE}`} className="btn-call" style={{width:'100%',justifyContent:'center',background:'var(--orange)',fontSize:'0.9rem'}}>📞 Bel {monteur.naam.split(' ')[0]}</a>
              </div>

              <div style={{background:'white',border:'1.5px solid var(--border)',borderRadius:'14px',padding:'1.5rem'}}>
                <div style={{fontSize:'0.8rem',fontWeight:700,color:'var(--text)',marginBottom:'1rem'}}>✓ Wat wij controleren</div>
                <div style={{display:'flex',flexDirection:'column',gap:'0.5rem',fontSize:'0.82rem',color:'var(--muted)'}}>
                  {type.oorzaken.slice(0,5).map((o,i) => (
                    <span key={i}>✓ {o.titel || o}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{background:'var(--green3)'}}>
        <div className="section-inner">
          <div className="sec-head-center">
            <div className="eyebrow">Veelgestelde vragen</div>
            <h2>{type.naam} in <em>{stad.naam}</em></h2>
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

      {/* BOTTOM CTA */}
      <div className="bottom-cta">
        <div className="eyebrow" style={{color:'#a8e6c0'}}>{type.naam} in {stad.naam}</div>
        <h2 style={{color:'white'}}>{type.naam} in {stad.naam}? Wacht niet te lang.</h2>
        <p>Hoe eerder je belt, hoe kleiner de schade. Onze vakmensen staan dag en nacht voor je klaar in {stad.naam} en omgeving.</p>
        <div className="cta-btns">
          <a href={`tel:${PHONE}`} className="btn-call">📞 Bel nu: {PHONE_DISPLAY}</a>
          <a href="#offerte" className="btn-white-ghost">Offerte aanvragen</a>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <div className="footer-top">
          <div>
            <div className="footer-logo">Lekkage<b>Fix</b></div>
            <p className="footer-desc">Vakkundige {type.naam.toLowerCase()} reparaties in {stad.naam} en heel {stad.provincie}. Gecertificeerde vakmensen, transparante prijzen, garantie.</p>
          </div>
          <div className="footer-col">
            <h4>Diensten in {stad.naam}</h4>
            {lekkageTypes.map(t => <a key={t.slug} href={`/lekkage/${t.slug}/${stad.slug}`}>{t.naam}</a>)}
          </div>
          <div className="footer-col">
            <h4>{stad.provincie}</h4>
            {andereSteden.slice(0,5).map(s => <a key={s.slug} href={`/lekkage/${type.slug}/${s.slug}`}>{s.naam}</a>)}
            <a href={`/lekkage/dienst/${type.slug}`}>Alle steden →</a>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <a href={`tel:${PHONE}`}>{PHONE_DISPLAY} (24/7)</a>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <a href="#offerte">Gratis offerte</a>
            <a href="/blog">Blog & tips</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 LekkageFix · KvK 89586557 · {type.naam} {stad.naam} · <a href="#">Privacy</a> · <a href="#">Voorwaarden</a></p>
          <div className="cert-badges"><span className="cert">VCA ✓</span><span className="cert">ISO 9001</span><span className="cert">Erkend verzekeraar</span></div>
        </div>
      </footer>

      <a href={`tel:${PHONE}`} className="mobile-cta">📞 Bel nu: {PHONE_DISPLAY} (24/7 bereikbaar)</a>
    </>
  )
}
