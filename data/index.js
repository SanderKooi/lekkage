export const steden = [
  // Noord-Holland
  { naam: 'Amsterdam', slug: 'amsterdam', provincie: 'Noord-Holland', woningtype: 'grachtenpanden en jaren-30 woningen', inwoners: '921.000', fact: 'Door de hoge grondwaterstand en oude bebouwing komen lekkages in Amsterdam vaker voor dan gemiddeld.' },
  { naam: 'Haarlem', slug: 'haarlem', provincie: 'Noord-Holland', woningtype: 'historische binnenstad en jaren-20 rijtjeswoningen', inwoners: '163.000', fact: 'Veel woningen in Haarlem hebben oude loden leidingen die gevoelig zijn voor lekkage.' },
  { naam: 'Alkmaar', slug: 'alkmaar', provincie: 'Noord-Holland', woningtype: 'historische panden en naoorlogse woningen', inwoners: '108.000', fact: 'De kleibodem rondom Alkmaar zorgt voor extra druk op funderingen en kelders.' },
  { naam: 'Zaandam', slug: 'zaandam', provincie: 'Noord-Holland', woningtype: 'traditionele houten bebouwing en nieuwbouw', inwoners: '76.000', fact: 'Houten constructies in Zaandam zijn extra gevoelig voor vochtproblemen.' },
  { naam: 'Purmerend', slug: 'purmerend', provincie: 'Noord-Holland', woningtype: 'jaren-70 en jaren-80 uitbreidingswijken', inwoners: '81.000', fact: 'Platte daken uit de jaren-70 in Purmerend naderen het einde van hun levensduur.' },
  { naam: 'Hoofddorp', slug: 'hoofddorp', provincie: 'Noord-Holland', woningtype: 'moderne nieuwbouw en kantoorpanden', inwoners: '79.000', fact: 'Nieuwbouw in Hoofddorp heeft soms last van settingslekkages in de eerste jaren.' },
  { naam: 'Hilversum', slug: 'hilversum', provincie: 'Noord-Holland', woningtype: 'villa\'s en jaren-30 architectuur', inwoners: '93.000', fact: 'De grote daken van Hilversumse villa\'s vragen om regelmatig onderhoud.' },
  // Zuid-Holland
  { naam: 'Rotterdam', slug: 'rotterdam', provincie: 'Zuid-Holland', woningtype: 'naoorlogse wederopbouw en moderne architectuur', inwoners: '655.000', fact: 'Rotterdam heeft veel platte daken door de wederopbouwarchitectuur — een bekende lekkageoorzaak.' },
  { naam: 'Den Haag', slug: 'den-haag', provincie: 'Zuid-Holland', woningtype: 'hofjeswoningen en belle-époque panden', inwoners: '548.000', fact: 'Den Haag heeft veel oudere herenhuizen met complexe dakconstructies.' },
  { naam: 'Leiden', slug: 'leiden', provincie: 'Zuid-Holland', woningtype: 'historische grachtenpanden en studentenwoningen', inwoners: '124.000', fact: 'De hoge grondwaterstand in Leiden zorgt voor veel vochtproblemen in kelders.' },
  { naam: 'Delft', slug: 'delft', provincie: 'Zuid-Holland', woningtype: 'historische binnenstad en TU-campuswoningen', inwoners: '103.000', fact: 'Delftse grachtenwoningen hebben vaak oude voegwerk dat water doorlaat.' },
  { naam: 'Dordrecht', slug: 'dordrecht', provincie: 'Zuid-Holland', woningtype: 'historische havenwoningen en rijtjeshuizen', inwoners: '118.000', fact: 'Als eilandstad heeft Dordrecht extra te maken met waterdrukvariaties.' },
  { naam: 'Zoetermeer', slug: 'zoetermeer', provincie: 'Zuid-Holland', woningtype: 'jaren-70 en jaren-80 groeikernwoningen', inwoners: '124.000', fact: 'Zoetermeer is gebouwd als groeikern — veel daken uit dezelfde periode die samen verouderen.' },
  { naam: 'Gouda', slug: 'gouda', provincie: 'Zuid-Holland', woningtype: 'historische panden en grondgebonden woningen', inwoners: '73.000', fact: 'De veenbodem onder Gouda zorgt voor verzakking en daarmee lekkagerisico.' },
  { naam: 'Schiedam', slug: 'schiedam', provincie: 'Zuid-Holland', woningtype: 'havenwoningen en naoorlogse flats', inwoners: '77.000', fact: 'Schiedamse jeneverhuizen hebben complexe historische dakconstructies.' },
  // Utrecht
  { naam: 'Utrecht', slug: 'utrecht', provincie: 'Utrecht', woningtype: 'historische grachtenpanden en studentenwoningen', inwoners: '361.000', fact: 'De unieke werfkelders in Utrecht zijn extra kwetsbaar voor grondwaterlekkage.' },
  { naam: 'Amersfoort', slug: 'amersfoort', provincie: 'Utrecht', woningtype: 'historische binnenstad en Vathorst nieuwbouw', inwoners: '161.000', fact: 'Amersfoort combineert oude historische panden met moderne nieuwbouwwijken.' },
  { naam: 'Veenendaal', slug: 'veenendaal', provincie: 'Utrecht', woningtype: 'naoorlogse uitbreidingswijken en nieuwbouw', inwoners: '66.000', fact: 'Veenendaal heeft veel woningen uit de jaren-60 en -70 met verouderde dakbedekking.' },
  { naam: 'Nieuwegein', slug: 'nieuwegein', provincie: 'Utrecht', woningtype: 'jaren-70 groeikernwoningen', inwoners: '62.000', fact: 'Nieuwegein is volledig gebouwd in de jaren-70 — dakproblemen komen gesynchroniseerd voor.' },
  { naam: 'Zeist', slug: 'zeist', provincie: 'Utrecht', woningtype: 'villa\'s en bosrijke eengezinswoningen', inwoners: '65.000', fact: 'Bladeren van omliggende bomen verstoppen dakgoten in Zeist bovengemiddeld vaak.' },
  // Noord-Brabant
  { naam: 'Eindhoven', slug: 'eindhoven', provincie: 'Noord-Brabant', woningtype: 'Philips-woningbouw en moderne architectuur', inwoners: '234.000', fact: 'De Eindhovense Philipswoningen uit de jaren-20 hebben karakteristieke dakproblemen.' },
  { naam: 'Tilburg', slug: 'tilburg', provincie: 'Noord-Brabant', woningtype: 'textielfabriekswoningen en nieuwbouw', inwoners: '224.000', fact: 'Tilburg heeft veel voormalige fabrieksgebouwen omgebouwd tot woningen met platte daken.' },
  { naam: 'Breda', slug: 'breda', provincie: 'Noord-Brabant', woningtype: 'vestingstad met historische panden', inwoners: '184.000', fact: 'De vesting Breda heeft veel monumentale panden met specifieke lekkage-uitdagingen.' },
  { naam: 'Den Bosch', slug: 'den-bosch', provincie: 'Noord-Brabant', woningtype: 'middeleeuwse binnenstad en moderne wijken', inwoners: '154.000', fact: 'Den Bosch heeft de beroemde gotische Sint-Jan — maar ook veel historische woningen met oude dakpannen.' },
  { naam: 'Helmond', slug: 'helmond', provincie: 'Noord-Brabant', woningtype: 'industriestad met naoorlogse woningbouw', inwoners: '93.000', fact: 'Naoorlogse flatgebouwen in Helmond kampen vaker met gevellekkages.' },
  { naam: 'Oss', slug: 'oss', provincie: 'Noord-Brabant', woningtype: 'grondgebonden rijtjeshuizen en vrijstaande woningen', inwoners: '93.000', fact: 'Oss heeft veel jaren-60 en -70 woningen met bitumen platte daken.' },
  // Gelderland
  { naam: 'Nijmegen', slug: 'nijmegen', provincie: 'Gelderland', woningtype: 'heuvelachtige stadsbebouwing en studentenwoningen', inwoners: '178.000', fact: 'De helling waarop Nijmegen is gebouwd zorgt voor extra waterafvoerproblemen.' },
  { naam: 'Arnhem', slug: 'arnhem', provincie: 'Gelderland', woningtype: 'villawijk Sonsbeek en naoorlogse wederopbouw', inwoners: '163.000', fact: 'Arnhem heeft veel wederopbouwwoningen met platte daken uit de jaren-50.' },
  { naam: 'Apeldoorn', slug: 'apeldoorn', provincie: 'Gelderland', woningtype: 'bosrijke villabebouwing en grondgebonden woningen', inwoners: '163.000', fact: 'Apeldoorn heeft veel vrijstaande woningen met complexe dakkappen.' },
  { naam: 'Ede', slug: 'ede', provincie: 'Gelderland', woningtype: 'grondgebonden gezinswoningen en militaire bebouwing', inwoners: '116.000', fact: 'Ede heeft veel jaren-50 woningen gebouwd voor militaire gezinnen — verouderde sanitaire leidingen.' },
  { naam: 'Harderwijk', slug: 'harderwijk', provincie: 'Gelderland', woningtype: 'historische havenstad en nieuwbouwwijken', inwoners: '48.000', fact: 'De ligging aan het Veluwemeer geeft Harderwijk een hoge luchtvochtigheid.' },
  // Overijssel
  { naam: 'Enschede', slug: 'enschede', provincie: 'Overijssel', woningtype: 'textielfabriekswoningen en studentenbebouwing', inwoners: '158.000', fact: 'Voormalige fabriekswoningen in Enschede hebben complexe dakconstructies.' },
  { naam: 'Zwolle', slug: 'zwolle', provincie: 'Overijssel', woningtype: 'historische Hanzestad met diverse woningtypes', inwoners: '129.000', fact: 'Zwolle ligt laag en heeft historisch veel met wateroverlast te maken gehad.' },
  { naam: 'Deventer', slug: 'deventer', provincie: 'Overijssel', woningtype: 'historische Hanzestad en IJsseloevers', inwoners: '100.000', fact: 'De IJsseloevers in Deventer zorgen voor hoge grondwaterstanden bij hoog water.' },
  { naam: 'Hengelo', slug: 'hengelo', provincie: 'Overijssel', woningtype: 'industriestad met arbeiderswoningen', inwoners: '80.000', fact: 'Hengelose arbeiderswoningen uit de jaren-30 hebben smallere dakgoten die snel verstopt raken.' },
  { naam: 'Almelo', slug: 'almelo', provincie: 'Overijssel', woningtype: 'textielfabrieksstad met rijtjeshuizen', inwoners: '72.000', fact: 'Almelo heeft veel identieke rijtjeswoningen — lekkageproblemen komen er systematisch voor.' },
  // Groningen
  { naam: 'Groningen', slug: 'groningen', provincie: 'Groningen', woningtype: 'historische binnenstad en studentenwoningen', inwoners: '232.000', fact: 'Groningen heeft veel oude studentenwoningen met verwaarloosde dakbedekking.' },
  // Friesland
  { naam: 'Leeuwarden', slug: 'leeuwarden', provincie: 'Friesland', woningtype: 'historische Friese panden en naoorlogse woningen', inwoners: '123.000', fact: 'De windrijke ligging van Leeuwarden zorgt voor extra slijtage aan dakbedekking.' },
  // Limburg
  { naam: 'Maastricht', slug: 'maastricht', provincie: 'Limburg', woningtype: 'historische mergelstenen panden', inwoners: '119.000', fact: 'Mergelstenen woningen in Maastricht hebben specifieke vochtproblemen door de poreuze steen.' },
  { naam: 'Venlo', slug: 'venlo', provincie: 'Limburg', woningtype: 'historische binnenstad en moderne bedrijvenparken', inwoners: '101.000', fact: 'Venlo ligt aan de Maas en heeft te maken met periodiek hoge grondwaterstanden.' },
  // Drenthe
  { naam: 'Assen', slug: 'assen', provincie: 'Drenthe', woningtype: 'grondgebonden gezinswoningen en nieuwbouw', inwoners: '68.000', fact: 'Assen heeft veel naoorlogse woningbouw met verouderde leidingen.' },
  // Flevoland
  { naam: 'Almere', slug: 'almere', provincie: 'Flevoland', woningtype: 'jaren-80 en -90 nieuwbouwwoningen', inwoners: '215.000', fact: 'Almere is gebouwd op ingepolderd land — de hoge grondwaterstand geeft specifieke lekrisico\'s.' },
  { naam: 'Lelystad', slug: 'lelystad', provincie: 'Flevoland', woningtype: 'jaren-70 en -80 polderbebouwing', inwoners: '78.000', fact: 'Lelystad heeft veel woningen met platte daken uit de pioniersjaren van de polder.' },
  // Zeeland
  { naam: 'Middelburg', slug: 'middelburg', provincie: 'Zeeland', woningtype: 'historische panden en naoorlogse wederopbouw', inwoners: '48.000', fact: 'Middelburg is na de oorlog herbouwd — veel woningen hebben identieke dakconstructies.' },
  // Zuid-Holland extra
  { naam: 'Rijswijk', slug: 'rijswijk', provincie: 'Zuid-Holland', woningtype: 'naoorlogse flats en grondgebonden woningen', inwoners: '47.000', fact: 'Rijswijk grenst aan Den Haag en heeft veel identieke naoorlogse flatgebouwen.' },
  { naam: 'Vlaardingen', slug: 'vlaardingen', provincie: 'Zuid-Holland', woningtype: 'havenwoningen en naoorlogse rijtjeshuizen', inwoners: '72.000', fact: 'De hoge luchtvochtigheid door de Maas zorgt in Vlaardingen voor snellere dakdegradatie.' },
]

export const lekkageTypes = [
  {
    naam: 'Daklekkage',
    slug: 'dak',
    icon: '🏠',
    omschrijving: 'Waterindringing via plat dak, schuin dak, pannendak of dakkapel.',
    intro: 'Een daklekkage is een van de meest voorkomende en kostbare problemen voor huiseigenaren in Nederland. Regen, wind en temperatuurwisselingen tasten dakbedekking aan — soms jarenlang ongemerkt totdat er waterschade zichtbaar wordt.',
    oorzaken: ['Verouderde of gescheurde dakbedekking', 'Defecte dakdoorvoeren of dakramen', 'Beschadigde dakpannen of nokvorsten', 'Verstopte of lekkende dakgoten', 'Slechte kitaansluiting bij dakkapel'],
    urgentie: 'hoog',
    keywords: ['daklekkage', 'lekkage dak', 'dak lekt', 'lekkend dak repareren'],
  },
  {
    naam: 'Waterleiding',
    slug: 'waterleiding',
    icon: '🔧',
    omschrijving: 'Lekkende of gesprongen waterleiding, kraan of cv-installatie.',
    intro: 'Een lekkende waterleiding kan in korte tijd aanzienlijke schade veroorzaken. Van een druppelende kraan tot een gesprongen leiding — waterlekkages vragen om snelle actie om verdere waterschade te voorkomen.',
    oorzaken: ['Verouderde of gecorrodeerde leidingen', 'Bevroren en gesprongen leidingen', 'Slechte verbindingen of koppelstukken', 'Hoge waterdruk', 'Mechanische beschadiging'],
    urgentie: 'hoog',
    keywords: ['waterleiding lekkage', 'gesprongen leiding', 'lekkende waterleiding', 'loodgieter lekkage'],
  },
  {
    naam: 'Badkamerlekkage',
    slug: 'badkamer',
    icon: '🚿',
    omschrijving: 'Lekkage vanuit de badkamer naar de verdieping eronder.',
    intro: 'Badkamerlekkages worden vaak te laat ontdekt — het water sijpelt door vloeren en wanden voordat het zichtbaar wordt op het plafond eronder. Schimmelvorming en houtrot zijn het gevolg als je te lang wacht.',
    oorzaken: ['Verouderd of gebarsten kitwerk rondom douche of bad', 'Lekkende afvoer of sifon', 'Beschadigde waterdichte laag onder tegels', 'Lekkende kranen of doucheverbindingen', 'Condensatieproblemen door slechte ventilatie'],
    urgentie: 'middel',
    keywords: ['badkamer lekkage', 'lekkage badkamer', 'douche lekt', 'bad lekt door plafond'],
  },
  {
    naam: 'Rioollekkage',
    slug: 'riool',
    icon: '🚰',
    omschrijving: 'Verstopt of lekkend riool, afvoer of riolering.',
    intro: 'Een lekkend of verstopt riool is niet alleen vervelend — het kan ook gevaarlijk zijn voor de volksgezondheid. Rioolgas, terugstromend afvalwater en verzakkende leidingen vragen om professionele aanpak.',
    oorzaken: ['Verzakte of gebarsten rioolbuizen', 'Boomwortels die leidingen binnendringen', 'Vetafzetting en verstoppingen', 'Verouderde terracotta leidingen', 'Grondverzakking'],
    urgentie: 'hoog',
    keywords: ['riool lekkage', 'verstopt riool', 'rioollekkage', 'riolering lekkage'],
  },
  {
    naam: 'Vochtproblemen',
    slug: 'vocht',
    icon: '💧',
    omschrijving: 'Schimmel, condensatie, optrekkend vocht of vochtige muren.',
    intro: 'Vochtproblemen zijn verraderlijk — ze zijn niet altijd direct zichtbaar maar kunnen jarenlang schade aanrichten aan de constructie van je woning. Schimmel is bovendien schadelijk voor de gezondheid van bewoners.',
    oorzaken: ['Optrekkend grondvocht via fundering', 'Condensatie door onvoldoende ventilatie', 'Doorslag via gevels of spouwmuur', 'Lekkende dakgoot of regenpijp', 'Onvoldoende isolatie'],
    urgentie: 'middel',
    keywords: ['vochtproblemen', 'schimmel muur', 'optrekkend vocht', 'vochtige muren'],
  },
  {
    naam: 'Gevellekkage',
    slug: 'gevel',
    icon: '🧱',
    omschrijving: 'Waterindringing via gevels, spouwmuur of kozijnen.',
    intro: 'Gevellekkages worden door veel eigenaren niet herkend als zodanig — vochtige muren worden toegeschreven aan condensatie terwijl het water van buiten naar binnen trekt. Zeker bij oudere woningen met slechte voegen.',
    oorzaken: ['Verouderd voegwerk dat water doorlaat', 'Beschadigde of ontbrekende kit rondom kozijnen', 'Spouwmuurisolatie die vocht vasthoudt', 'Scheuren in de gevel door verzakking', 'Ontbrekende waterkering boven kozijnen'],
    urgentie: 'middel',
    keywords: ['gevellekkage', 'lekkage gevel', 'spouwmuur lekkage', 'vocht door muur'],
  },
  {
    naam: 'Kelderwaterdichting',
    slug: 'kelder',
    icon: '🏚️',
    omschrijving: 'Grondwater of regenwater dat de kelder binnendringt.',
    intro: 'Een lekkende kelder is een van de meest complexe lekkageproblemen. Grondwaterdruk, capillaire werking en directe waterindringing vragen elk om een andere aanpak. Tijdig ingrijpen voorkomt structurele schade.',
    oorzaken: ['Hoge grondwaterstand na veel neerslag', 'Verouderde of ontbrekende waterdichting', 'Scheuren in de kelderwand of vloer', 'Verstopte drainage', 'Capillaire werking via betonnen wanden'],
    urgentie: 'middel',
    keywords: ['kelder lekkage', 'lekkende kelder', 'water in kelder', 'kelder waterdicht maken'],
  },
]

export const getSted = (slug) => steden.find(s => s.slug === slug)
export const getType = (slug) => lekkageTypes.find(t => t.slug === slug)
