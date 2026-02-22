// data/diensten.js
// Alle diensten met SEO-geoptimaliseerde content templates
// {stad} wordt vervangen door de werkelijke plaatsnaam

const diensten = [
  {
    slug: 'daklekkage',
    label: 'Daklekkage',
    shortDesc: 'Alle soorten daken: plat dak, schuin dak, pannendak.',
    intro: 'Waterindringing via uw dak in {stad}? Wij repareren alle soorten daken snel en vakkundig, 24/7 bereikbaar.',
    longDesc: `Een daklekkage in {stad} kan grote schade veroorzaken als het niet snel wordt verholpen. 
    Water dat via het dak naar binnen sijpelt beschadigt isolatie, houten constructies en interieurdelen. 
    Onze dakspecialisten in {stad} zijn vertrouwd met alle daktypen: platte daken, schuin dak, pannendaken, 
    bitumen en EPDM daken. We inspecteren direct de oorzaak en repareren duurzaam zodat u geen terugkerende 
    problemen heeft. Wij bedienen {stad} en alle omliggende wijken.`,
    icon: '🏠',
    keywords: ['daklekkage', 'lekkend dak', 'dakraam lekkage', 'goot lekkage', 'plat dak lekkage']
  },
  {
    slug: 'loodgieter',
    label: 'Loodgieter',
    shortDesc: 'Gesprongen leidingen, lekkende kranen, lage waterdruk.',
    intro: 'Loodgietersklus nodig in {stad}? Van gesprongen leiding tot lekkende kraan — wij zijn binnen 30 minuten bij u.',
    longDesc: `Loodgietersproblemen in {stad} vereisen snelle actie. Een gesprongen waterleiding kan per uur 
    honderden liters water verliezen en enorme waterschade veroorzaken. Onze loodgieters in {stad} zijn 
    24/7 beschikbaar voor alle spoedreparaties. We repareren of vervangen leidingen, kranen, boilers, 
    radiatoren en sanitair. Dankzij onze moderne detectieapparatuur vinden we verborgen lekkages zonder 
    onnodige sloopwerkzaamheden.`,
    icon: '🔧',
    keywords: ['loodgieter', 'lekkende leiding', 'gesprongen leiding', 'waterleiding', 'kraan reparatie']
  },
  {
    slug: 'rioollekkage',
    label: 'Rioollekkage',
    shortDesc: 'Camera-inspectie, verstoppingen, rioolreparatie.',
    intro: 'Rioolproblemen in {stad}? Camera-inspectie, ontstopping en reparatie — snel en zonder onnodige sloop.',
    longDesc: `Rioollekkages in {stad} zijn serieuze problemen die direct aangepakt moeten worden. 
    Rioolwater bevat bacteriën en kan gezondheidsrisico\'s opleveren. Onze rioolspecialisten in {stad} 
    werken met moderne cameratechnologie om de exacte locatie van de lekkage te bepalen. Zo voorkomen we 
    onnodig breekwerk. We reinigen, repareren en vervangen rioolleidingen en werken ook samen met de 
    gemeente {stad} bij aansluiting op het openbaar riool.`,
    icon: '🚰',
    keywords: ['rioollekkage', 'verstopt riool', 'riool ontstopping', 'riool camera inspectie']
  },
  {
    slug: 'vochtproblemen',
    label: 'Vochtproblemen',
    shortDesc: 'Schimmel, condensatie, optrekkend vocht.',
    intro: 'Vochtproblemen of schimmel in {stad}? Wij vinden de oorzaak en bieden een duurzame oplossing.',
    longDesc: `Vochtproblemen in woningen in {stad} komen vaker voor dan gedacht. Schimmel, condensatie en 
    optrekkend vocht kunnen leiden tot gezondheidsklachten en structurele schade aan uw woning. 
    Onze vochtspecialisten in {stad} voeren een grondige inspectie uit om de oorzaak te achterhalen. 
    Vervolgens bieden we een maatwerkoplossing: vochtinjectie, betere ventilatie, isolatie of drainage. 
    We werken met erkende methodes die door verzekeringsmaatschappijen geaccepteerd worden.`,
    icon: '💧',
    keywords: ['vochtproblemen', 'schimmel woning', 'optrekkend vocht', 'condensatie', 'vochtbestrijding']
  }
]

module.exports = { diensten }
