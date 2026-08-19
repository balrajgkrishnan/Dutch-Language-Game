import { Animal, BiomeInfo, BiomeType, Level } from '../types';

export const BIOMES: BiomeInfo[] = [
  {
    id: 'farm',
    name: 'Boerderij',
    dutchTitle: 'Boerderij Wonderrijk',
    subtitle: 'Verse weilanden, knusse stallen & ronkende tractoren',
    emoji: '🚜',
    themeColor: '#4CAF50',
    bgGradient: 'from-emerald-100/70 via-amber-50 to-lime-100/60',
    cardBg: 'bg-emerald-50/90',
    accentColor: '#2E7D32',
    particleEmoji: ['🌾', '🌸', '🚜', '🌻', '🍃'],
    description: 'Help mee met de ochtendronde langs de stallen en weilanden vol trouwe boerderijdieren!',
    storyIntro: 'De ochtendzon schijnt over de boerderij. De haan kraait en alle lieve boerderijdieren hebben zin in een nieuw taalavontuur!'
  },
  {
    id: 'safari',
    name: 'Savanne Safari',
    dutchTitle: 'De Grote Savanne',
    subtitle: 'Gouden graslanden, acaciabomen & brullende leeuwen',
    emoji: '🦒',
    themeColor: '#FF9800',
    bgGradient: 'from-amber-100/70 via-orange-50 to-yellow-100/60',
    cardBg: 'bg-amber-50/90',
    accentColor: '#E65100',
    particleEmoji: ['☀️', '🌾', '🦒', '🌿', '🦁'],
    description: 'Stap in de stoere safaritruck en speur naar wilde dieren op de zonovergoten savanne!',
    storyIntro: 'Met een verrekijker in de hand rijden we door het hoge savannegras. In de verte brult Leo en knabbelt Gigi aan de acacia!'
  },
  {
    id: 'sea',
    name: 'Oceaan & Koraalzee',
    dutchTitle: 'De Mystieke Diepzee',
    subtitle: 'Kleurrijk koraalrif, speelse dolfijnen & azuurblauwe golven',
    emoji: '🌊',
    themeColor: '#0288D1',
    bgGradient: 'from-cyan-100/70 via-sky-50 to-blue-100/60',
    cardBg: 'bg-cyan-50/90',
    accentColor: '#01579B',
    particleEmoji: ['🫧', '🐠', '🐬', '🪸', '🌊'],
    description: 'Duik in een magisch snorkelavontuur vol wijze zeedieren en verborgen zeebodemgeheimen!',
    storyIntro: 'Plons! Zet je duikbril op en zwem tussen kleurrijke scholen tropische vissen en zingende walvissen!'
  },
  {
    id: 'snow',
    name: 'Poolgebied & Sneeuw',
    dutchTitle: 'Het Magische Poolrijk',
    subtitle: 'Glanzende gletsjers, noorderlicht & donzige ijsberen',
    emoji: '❄️',
    themeColor: '#00ACC1',
    bgGradient: 'from-sky-100/70 via-indigo-50 to-teal-100/60',
    cardBg: 'bg-blue-50/90',
    accentColor: '#006064',
    particleEmoji: ['❄️', '✨', '🌨️', '🧊', '⭐'],
    description: 'Trek je warme sjaal aan en help de pooldieren op het krakende ijs onder het fonkelende noorderlicht!',
    storyIntro: 'Brrr! Het sneeuwt zachtjes. Glijd met de hondenslee over de sneeuwvallei waar nieuwsgierige pinguïns je begroeten!'
  },
  {
    id: 'jungle',
    name: 'Tropisch Regenwoud',
    dutchTitle: 'Het Tropisch Regenwoud',
    subtitle: 'Reusachtige bomen, watervallen & kleurrijke papegaaien',
    emoji: '🎋',
    themeColor: '#388E3C',
    bgGradient: 'from-emerald-100/70 via-teal-50 to-green-100/60',
    cardBg: 'bg-teal-50/90',
    accentColor: '#1B5E20',
    particleEmoji: ['🍃', '🦜', '🌺', '🎋', '💧'],
    description: 'Baan je een weg door de weelderige lianen en vind verborgen speelse dieren in de dichte jungle!',
    storyIntro: 'Tussen het gefluit van exotische vogels door wandel je over een hangbrug in de jungle. Pippa de Panda zit al klaar!'
  },
  {
    id: 'outback',
    name: 'Australische Outback',
    dutchTitle: 'De Rode Outback',
    subtitle: 'Rode rotsen, eucalyptusbomen & springende kangoeroes',
    emoji: '🦘',
    themeColor: '#E65100',
    bgGradient: 'from-orange-100/70 via-amber-50 to-red-100/60',
    cardBg: 'bg-orange-50/90',
    accentColor: '#BF360C',
    particleEmoji: ['🦘', '🏜️', '🐨', '☀️', '🪵'],
    description: 'Reis naar het rode hart van Australië waar kangoeroes huppelen en koala’s in eucalyptusbomen slapen!',
    storyIntro: 'De zon kleurt de rode aarde van de Outback goudgeel. Kiki de Kangoeroe springt enthousiast naar voren om je te verwelkomen!'
  },
  {
    id: 'mountain',
    name: 'Alpen & Hoge Bergen',
    dutchTitle: 'De Hoge Alpen',
    subtitle: 'Sneeuwtoppen, alpenweiden, edelweiss & berggeiten',
    emoji: '🏔️',
    themeColor: '#5C6BC0',
    bgGradient: 'from-indigo-100/70 via-slate-50 to-blue-100/60',
    cardBg: 'bg-indigo-50/90',
    accentColor: '#283593',
    particleEmoji: ['🏔️', '🌸', '🐐', '🦙', '🦅'],
    description: 'Klim naar adembenemende berghutten en ontdek moedige dieren op steile rotswanden en bloeiende alpenweiden!',
    storyIntro: 'Hoor je de koebellen in het dal? Bovenop de bergtop zwaait Boris de Steenbok vrolijk met zijn hoorns!'
  }
];

export const ALL_BIOME_ANIMALS: Animal[] = [
  // 1. FARM ANIMALS (🌾)
  {
    id: 'bella-koe',
    name: 'Bella de Koe',
    title: 'De Vriendelijke Melkmaker',
    emoji: '🐮',
    biome: 'farm',
    color: '#4CAF50',
    bgGradient: 'from-emerald-200 to-lime-300',
    soundName: 'general',
    funFact: 'Koeien hebben vier magen en kunnen vers gras van 10 kilometer ver ruiken!',
    favoriteFood: 'Mals Klavergras',
    favoriteFoodEmoji: '🍀',
    unlocked: true,
    hearts: 1,
    levelRequired: 1,
    personality: 'Gemoedelijk en dol op zachte aaitjes over haar snuit.',
    habitatName: 'De Bloemrijke Weilanden'
  },
  {
    id: 'wolletje-schaap',
    name: 'Wolletje het Schaap',
    title: 'De Zachte Wolkampioen',
    emoji: '🐑',
    biome: 'farm',
    color: '#81C784',
    bgGradient: 'from-green-200 to-emerald-300',
    soundName: 'general',
    funFact: 'Schapen herkennen elkaars gezichten en onthouden wel 50 verschillende schapengezichten!',
    favoriteFood: 'Knapperige Brokjes',
    favoriteFoodEmoji: '🌾',
    unlocked: false,
    hearts: 0,
    levelRequired: 2,
    personality: 'Nieuwsgierig en dartelt graag door het ochtenddauw.',
    habitatName: 'De Schapenheuvel'
  },
  {
    id: 'storm-paard',
    name: 'Storm het Paard',
    title: 'De Snelle Galoppeur',
    emoji: '🐴',
    biome: 'farm',
    color: '#A1887F',
    bgGradient: 'from-amber-200 to-orange-300',
    soundName: 'general',
    funFact: 'Paarden kunnen zowel staand als liggend slapen dankzij een speciaal spiersysteem!',
    favoriteFood: 'Rode Appeltjes',
    favoriteFoodEmoji: '🍎',
    unlocked: false,
    hearts: 0,
    levelRequired: 3,
    personality: 'Moedig en rent graag zij aan zij met de tractor.',
    habitatName: 'De Paardenrenbaan'
  },
  {
    id: 'pip-varken',
    name: 'Pip het Varkentje',
    title: 'De Modderkampioen',
    emoji: '🐷',
    biome: 'farm',
    color: '#F48FB1',
    bgGradient: 'from-pink-200 to-rose-300',
    soundName: 'general',
    funFact: 'Varkens zijn slimmer dan honden en rollen in de modder om lekker koel te blijven!',
    favoriteFood: 'Zoete Worteltjes',
    favoriteFoodEmoji: '🥕',
    unlocked: false,
    hearts: 0,
    levelRequired: 4,
    personality: 'Vrolijk, knort tevreden als ze lekker mag wroeten.',
    habitatName: 'Het Modderbad'
  },
  {
    id: 'haantje-haan',
    name: 'Haantje de Haan',
    title: 'De Vroege Wekker',
    emoji: '🐓',
    biome: 'farm',
    color: '#FF7043',
    bgGradient: 'from-orange-200 to-amber-300',
    soundName: 'general',
    funFact: 'Een haan kraait al voordat de zon opkomt omdat hij een ingebouwde biologische klok heeft!',
    favoriteFood: 'Gouden Graankorrels',
    favoriteFoodEmoji: '🌽',
    unlocked: false,
    hearts: 0,
    levelRequired: 5,
    personality: 'Trots en waakt over alle kippen in het nachthok.',
    habitatName: 'De Hoge Hooiberg'
  },
  {
    id: 'daisy-eend',
    name: 'Daisy het Eendje',
    title: 'De Vrolijke Slootduiker',
    emoji: '🦆',
    biome: 'farm',
    color: '#26A69A',
    bgGradient: 'from-teal-200 to-emerald-300',
    soundName: 'general',
    funFact: 'Eendenveertjes zijn helemaal waterdicht dankzij een speciaal natuurlijk olielaagje!',
    favoriteFood: 'Waterkroos & Zaadjes',
    favoriteFoodEmoji: '🌱',
    unlocked: false,
    hearts: 0,
    levelRequired: 6,
    personality: 'Kwekkerig en zwemt in een keurig rijtje over de boerensloot.',
    habitatName: 'De Boerderijvijver'
  },

  // 2. SAFARI ANIMALS (🦒)
  {
    id: 'gigi-giraf',
    name: 'Gigi de Giraf',
    title: 'De Trotse Boomtopper',
    emoji: '🦒',
    biome: 'safari',
    color: '#FFB300',
    bgGradient: 'from-amber-200 to-yellow-300',
    soundName: 'general',
    funFact: 'De tong van een giraf is wel 45 centimeter lang en donkerblauw!',
    favoriteFood: 'Acaciablaadjes',
    favoriteFoodEmoji: '🌿',
    unlocked: false,
    hearts: 0,
    levelRequired: 1,
    personality: 'Elegant en kan kilometers ver over de savanne kijken.',
    habitatName: 'Het Acacia Woud'
  },
  {
    id: 'leo-leeuw',
    name: 'Leo de Leeuw',
    title: 'De Koning van het Zand',
    emoji: '🦁',
    biome: 'safari',
    color: '#FFA726',
    bgGradient: 'from-orange-200 to-amber-300',
    soundName: 'general',
    funFact: 'De brul van een volwassen leeuw is tot wel 8 kilometer ver te horen!',
    favoriteFood: 'Sappige Savannemeloen',
    favoriteFoodEmoji: '🍉',
    unlocked: false,
    hearts: 0,
    levelRequired: 2,
    personality: 'Koninklijk, maar slaapt gerust 18 uur per dag in de schaduw.',
    habitatName: 'De Leeuwenrots'
  },
  {
    id: 'ollie-olifant',
    name: 'Ollie de Olifant',
    title: 'De Vriendelijke Reus',
    emoji: '🐘',
    biome: 'safari',
    color: '#90A4AE',
    bgGradient: 'from-slate-200 to-blue-300',
    soundName: 'general',
    funFact: 'Olifanten gebruiken hun slurf om te ruiken, water te drinken én trompetgeluiden te maken!',
    favoriteFood: 'Knapperige Pinda’s',
    favoriteFoodEmoji: '🥜',
    unlocked: false,
    hearts: 0,
    levelRequired: 3,
    personality: 'Zachtaardig en vergeet nooit een vriendje.',
    habitatName: 'De Grote Waterplas'
  },
  {
    id: 'zara-zebra',
    name: 'Zara de Zebra',
    title: 'De Strepenkampioen',
    emoji: '🦓',
    biome: 'safari',
    color: '#78909C',
    bgGradient: 'from-slate-100 to-slate-300',
    soundName: 'general',
    funFact: 'Elke zebra heeft een uniek streeppatroon, net zoals menselijke vingerafdrukken!',
    favoriteFood: 'Goudgeel Steppegras',
    favoriteFoodEmoji: '🌾',
    unlocked: false,
    hearts: 0,
    levelRequired: 4,
    personality: 'Speels en galoppeert graag met de kudde.',
    habitatName: 'De Uitgestrekte Vlakte'
  },
  {
    id: 'mo-meerkat',
    name: 'Mo het Stokstaartje',
    title: 'De Alerte Wachtpost',
    emoji: '🦦',
    biome: 'safari',
    color: '#D7CCC8',
    bgGradient: 'from-amber-200 to-yellow-200',
    soundName: 'general',
    funFact: 'Stokstaartjes staan kaarsrecht op hun achterpootjes op de uitkijk voor roofvogels!',
    favoriteFood: 'Knapperige Kevertjes',
    favoriteFoodEmoji: '🥜',
    unlocked: false,
    hearts: 0,
    levelRequired: 5,
    personality: 'Super alert en piept vrolijk als er iets spannends gebeurt.',
    habitatName: 'Het Zandburchten Rijk'
  },
  {
    id: 'charly-cheeta',
    name: 'Charly de Cheeta',
    title: 'De Snelle Sprinter',
    emoji: '🐆',
    biome: 'safari',
    color: '#FBC02D',
    bgGradient: 'from-yellow-200 to-amber-400',
    soundName: 'general',
    funFact: 'Een cheeta kan binnen 3 seconden accelereren naar 100 kilometer per uur!',
    favoriteFood: 'Verse Watermeloen',
    favoriteFoodEmoji: '🍉',
    unlocked: false,
    hearts: 0,
    levelRequired: 6,
    personality: 'Snel als de bliksem en rust graag uit op een hoge termietenheuvel.',
    habitatName: 'De Snelle Sprintbaan'
  },

  // 3. SEA ANIMALS (🌊)
  {
    id: 'dolly-dolfijn',
    name: 'Dolly de Dolfijn',
    title: 'De Vrolijke Golfspringer',
    emoji: '🐬',
    biome: 'sea',
    color: '#0288D1',
    bgGradient: 'from-cyan-200 to-blue-300',
    soundName: 'general',
    funFact: 'Dolfijnen slapen met één oog open en één hersenhelft wakker om adem te halen!',
    favoriteFood: 'Zilveren Visjes',
    favoriteFoodEmoji: '🐟',
    unlocked: false,
    hearts: 0,
    levelRequired: 1,
    personality: 'Doet salto’s boven de golven en maakt grappige klikgeluidjes.',
    habitatName: 'De Azuurblauwe Baai'
  },
  {
    id: 'sammy-zeeschildpad',
    name: 'Sammy de Zeeschildpad',
    title: 'De Wijze Navigator',
    emoji: '🐢',
    biome: 'sea',
    color: '#26A69A',
    bgGradient: 'from-teal-200 to-emerald-300',
    soundName: 'general',
    funFact: 'Zeeschildpadden reizen duizenden kilometers en vinden altijd hun geboortestrand terug!',
    favoriteFood: 'Mals Zeegras',
    favoriteFoodEmoji: '🌿',
    unlocked: false,
    hearts: 0,
    levelRequired: 2,
    personality: 'Rustig, vertelt oude verhalen van de diepe oceaan.',
    habitatName: 'De Koraaltuin'
  },
  {
    id: 'octo-octopus',
    name: 'Octo de Octopus',
    title: 'De Meesterverstopper',
    emoji: '🐙',
    biome: 'sea',
    color: '#AB47BC',
    bgGradient: 'from-purple-200 to-pink-300',
    soundName: 'general',
    funFact: 'Een octopus heeft drie harten en blauw bloed!',
    favoriteFood: 'Kleine Krabjes',
    favoriteFoodEmoji: '🦀',
    unlocked: false,
    hearts: 0,
    levelRequired: 3,
    personality: 'Slim, kan puzzels oplossen en van kleur veranderen.',
    habitatName: 'De Onderwatergrot'
  },
  {
    id: 'willy-walvis',
    name: 'Willy de Blauwe Walvis',
    title: 'De Zingende Oceaanreus',
    emoji: '🐋',
    biome: 'sea',
    color: '#1565C0',
    bgGradient: 'from-blue-300 to-indigo-400',
    soundName: 'general',
    funFact: 'De blauwe walvis is het grootste dier dat ooit op aarde heeft geleefd!',
    favoriteFood: 'Kleine Krill & Plankton',
    favoriteFoodEmoji: '🦐',
    unlocked: false,
    hearts: 0,
    levelRequired: 4,
    personality: 'Zingt diepe liederen die honderden kilometers ver klinken.',
    habitatName: 'De Open Oceaan'
  },
  {
    id: 'kora-zeepaardje',
    name: 'Kora het Zeepaardje',
    title: 'De Rustige Danser',
    emoji: '🐡',
    biome: 'sea',
    color: '#FFCA28',
    bgGradient: 'from-amber-200 to-yellow-300',
    soundName: 'general',
    funFact: 'Zeepaardjes zwemmen rechtop en houden elkaar vast met hun staartje!',
    favoriteFood: 'Piepkleine Garnaaltjes',
    favoriteFoodEmoji: '🦐',
    unlocked: false,
    hearts: 0,
    levelRequired: 5,
    personality: 'Lief, drijft rustig tussen het wuivende koraal.',
    habitatName: 'Het Koraalrif'
  },
  {
    id: 'oscar-orka',
    name: 'Oscar de Orka',
    title: 'De Slimme Jager',
    emoji: '🐬',
    biome: 'sea',
    color: '#37474F',
    bgGradient: 'from-slate-300 to-blue-400',
    soundName: 'general',
    funFact: 'Orka’s leven in hechte families en hebben hun eigen geheime dialect!',
    favoriteFood: 'Grote Zalm',
    favoriteFoodEmoji: '🐟',
    unlocked: false,
    hearts: 0,
    levelRequired: 6,
    personality: 'Sociaal en springt met een reuzenplons door de branding.',
    habitatName: 'De Diepe Fjord'
  },

  // 4. SNOW ANIMALS (❄️)
  {
    id: 'barny-ijsbeer',
    name: 'Barny de IJsbeer',
    title: 'De Koning van het IJs',
    emoji: '🐻‍❄️',
    biome: 'snow',
    color: '#90CAF9',
    bgGradient: 'from-sky-200 to-blue-200',
    soundName: 'general',
    funFact: 'Onder zijn witte vacht heeft een ijsbeer een zwarte huid om zonnewarmte op te slaan!',
    favoriteFood: 'Verse Zalm',
    favoriteFoodEmoji: '🍣',
    unlocked: false,
    hearts: 0,
    levelRequired: 1,
    personality: 'Stoer, maar glijdt het liefst op zijn buik van ijsschotsen.',
    habitatName: 'De Drijvende IJsschotsen'
  },
  {
    id: 'plons-pinguin',
    name: 'Plons de Pinguïn',
    title: 'De Vrolijke Waggelaar',
    emoji: '🐧',
    biome: 'snow',
    color: '#546E7A',
    bgGradient: 'from-slate-200 to-cyan-200',
    soundName: 'general',
    funFact: 'Pinguïns vliegen letterlijk onder water met 35 km/u door de golven!',
    favoriteFood: 'Zoute Haring',
    favoriteFoodEmoji: '🐟',
    unlocked: false,
    hearts: 0,
    levelRequired: 2,
    personality: 'Waggelt vrolijk rond en organiseert sneeuwbal-spelletjes.',
    habitatName: 'De Pinguïn Glijbaan'
  },
  {
    id: 'robbie-zeehond',
    name: 'Robbie de Zeehond',
    title: 'De Blije Snorkelaar',
    emoji: '🦭',
    biome: 'snow',
    color: '#9FA8DA',
    bgGradient: 'from-blue-200 to-indigo-300',
    soundName: 'general',
    funFact: 'Zeehonden kunnen wel twee uur onder water blijven en klappen met hun flippers!',
    favoriteFood: 'Sappige Garnalen',
    favoriteFoodEmoji: '🦐',
    unlocked: false,
    hearts: 0,
    levelRequired: 3,
    personality: 'Nieuwsgierig, gluurt met grote ogen boven het ijswak uit.',
    habitatName: 'De Bevroren Fjorden'
  },
  {
    id: 'pip-poolvos',
    name: 'Pip de Poolvos',
    title: 'De Donzige Speurder',
    emoji: '🦊',
    biome: 'snow',
    color: '#FFB74D',
    bgGradient: 'from-orange-200 to-amber-300',
    soundName: 'general',
    funFact: 'Poolvossen veranderen van kleur: ’s winters sneeuwwit, ’s zomers grijsbruin!',
    favoriteFood: 'Wilde Poolbessen',
    favoriteFoodEmoji: '🫐',
    unlocked: false,
    hearts: 0,
    levelRequired: 4,
    personality: 'Vlug, slim en slaapt met haar staart over haar neus.',
    habitatName: 'De Witte Toendra'
  },
  {
    id: 'hedwig-sneeuwuil',
    name: 'Hedwig de Sneeuwuil',
    title: 'De Geruisloze Wachter',
    emoji: '🦉',
    biome: 'snow',
    color: '#B0BEC5',
    bgGradient: 'from-slate-200 to-blue-200',
    soundName: 'general',
    funFact: 'Sneeuwuilen kunnen hun kop 270 graden ronddraaien en vliegen geruisloos!',
    favoriteFood: 'Kleine Bosbessen',
    favoriteFoodEmoji: '🍓',
    unlocked: false,
    hearts: 0,
    levelRequired: 5,
    personality: 'Wijs, kijkt met gele ogen naar de noorderlichtsterren.',
    habitatName: 'De Hoge IJspieken'
  },
  {
    id: 'sven-rendier',
    name: 'Sven het Rendier',
    title: 'De Sneeuwstapper',
    emoji: '🦌',
    biome: 'snow',
    color: '#8D6E63',
    bgGradient: 'from-amber-200 to-orange-200',
    soundName: 'general',
    funFact: 'De hoeven van rendieren passen zich aan: zacht in de zomer en scherp hard in de winter!',
    favoriteFood: 'Rendiermos & Kruiden',
    favoriteFoodEmoji: '🌿',
    unlocked: false,
    hearts: 0,
    levelRequired: 6,
    personality: 'Sterk en wandelt dapper door sneeuwstormen.',
    habitatName: 'De Sneeuwvallei'
  },

  // 5. JUNGLE ANIMALS (🎋)
  {
    id: 'pippa-panda',
    name: 'Pippa de Panda',
    title: 'De Bamboe Acrobaat',
    emoji: '🐼',
    biome: 'jungle',
    color: '#388E3C',
    bgGradient: 'from-emerald-200 to-teal-300',
    soundName: 'general',
    funFact: 'Reuzenpanda’s eten wel 12 uur per dag en kauwen tot 15 kilo verse bamboe!',
    favoriteFood: 'Malse Bamboescheuten',
    favoriteFoodEmoji: '🎋',
    unlocked: false,
    hearts: 0,
    levelRequired: 1,
    personality: 'Gemoedelijk en rolt graag van grasheuvels af.',
    habitatName: 'Het Bamboebos'
  },
  {
    id: 'paco-papegaai',
    name: 'Paco de Papegaai',
    title: 'De Woordenkunstenaar',
    emoji: '🦜',
    biome: 'jungle',
    color: '#E53935',
    bgGradient: 'from-red-200 to-amber-300',
    soundName: 'general',
    funFact: 'Papegaaien kunnen menselijke woorden onthouden en hebben hele sterke snavels!',
    favoriteFood: 'Rijpe Papaja & Noten',
    favoriteFoodEmoji: '🥭',
    unlocked: false,
    hearts: 0,
    levelRequired: 2,
    personality: 'Kletskous, zingt vrolijk alle liedjes na.',
    habitatName: 'De Kleurrijke Boomtoppen'
  },
  {
    id: 'toby-tijger',
    name: 'Toby de Tijger',
    title: 'De Zachte Reus van het Woud',
    emoji: '🐯',
    biome: 'jungle',
    color: '#FB8C00',
    bgGradient: 'from-orange-200 to-yellow-300',
    soundName: 'general',
    funFact: 'Tijgers zijn uitstekende zwemmers en houden van een fris bad in de junglebeek!',
    favoriteFood: 'Verse Kokosnoten',
    favoriteFoodEmoji: '🥥',
    unlocked: false,
    hearts: 0,
    levelRequired: 3,
    personality: 'Dapper en besluipt speels vallende blaadjes.',
    habitatName: 'De Geheime Tempelruïne'
  },
  {
    id: 'koko-aap',
    name: 'Koko de Slingeraap',
    title: 'De Acrobaat in de Bomen',
    emoji: '🐒',
    biome: 'jungle',
    color: '#8D6E63',
    bgGradient: 'from-amber-200 to-emerald-200',
    soundName: 'general',
    funFact: 'Slingerapen gebruiken hun staart als een vijfde hand om aan takken te hangen!',
    favoriteFood: 'Rijpe Jungle Bananen',
    favoriteFoodEmoji: '🍌',
    unlocked: false,
    hearts: 0,
    levelRequired: 4,
    personality: 'Grapjas, verstopt graag spullen.',
    habitatName: 'De Lianen Jungle'
  },
  {
    id: 'charlie-kameleon',
    name: 'Charlie de Kameleon',
    title: 'De Kleurenmagiër',
    emoji: '🦎',
    biome: 'jungle',
    color: '#43A047',
    bgGradient: 'from-green-200 to-teal-300',
    soundName: 'general',
    funFact: 'Kameleons kunnen hun ogen onafhankelijk in twee richtingen laten kijken!',
    favoriteFood: 'Kleine Vliegjes',
    favoriteFoodEmoji: '🪰',
    unlocked: false,
    hearts: 0,
    levelRequired: 5,
    personality: 'Verstoppertjeskoning, verandert van kleur als hij blij is.',
    habitatName: 'De Tropische Waterval'
  },
  {
    id: 'maya-toekan',
    name: 'Maya de Toekan',
    title: 'De Reuzensnavel',
    emoji: '🪶',
    biome: 'jungle',
    color: '#FF6F00',
    bgGradient: 'from-amber-200 to-rose-300',
    soundName: 'general',
    funFact: 'De snavel van een toekan is supergroot maar weegt bijna niks doordat hij hol is!',
    favoriteFood: 'Wilde Vijgen',
    favoriteFoodEmoji: '🫐',
    unlocked: false,
    hearts: 0,
    levelRequired: 6,
    personality: 'Vrolijk en vangt bessen in de lucht op.',
    habitatName: 'De Hoge Luifel'
  },

  // 6. OUTBACK ANIMALS (🦘)
  {
    id: 'kiki-kangoeroe',
    name: 'Kiki de Kangoeroe',
    title: 'De Grote Sprongkampioen',
    emoji: '🦘',
    biome: 'outback',
    color: '#E65100',
    bgGradient: 'from-orange-200 to-amber-300',
    soundName: 'general',
    funFact: 'Kangoeroes kunnen tot wel 3 meter hoog en 9 meter ver springen in één sprong!',
    favoriteFood: 'Droog Woestijngras',
    favoriteFoodEmoji: '🌾',
    unlocked: false,
    hearts: 0,
    levelRequired: 1,
    personality: 'Energiek en draagt haar baby vrolijk in haar buidel.',
    habitatName: 'De Rode Duinen'
  },
  {
    id: 'coco-koala',
    name: 'Coco de Koala',
    title: 'De Slaperige Boomklimmer',
    emoji: '🐨',
    biome: 'outback',
    color: '#78909C',
    bgGradient: 'from-slate-200 to-emerald-200',
    soundName: 'general',
    funFact: 'Koala’s slapen tot wel 20 uur per dag tussen de eucalyptusbladeren!',
    favoriteFood: 'Verse Eucalyptus',
    favoriteFoodEmoji: '🌿',
    unlocked: false,
    hearts: 0,
    levelRequired: 2,
    personality: 'Rustig, houdt stevig vast aan takken.',
    habitatName: 'Het Eucalyptusbos'
  },
  {
    id: 'wally-wombat',
    name: 'Wally de Wombat',
    title: 'De Holengraver',
    emoji: '🐻',
    biome: 'outback',
    color: '#8D6E63',
    bgGradient: 'from-amber-200 to-orange-200',
    soundName: 'general',
    funFact: 'Wombats graven ondergrondse tunnels tot wel 30 meter lang!',
    favoriteFood: 'Wortels & Kruiden',
    favoriteFoodEmoji: '🥕',
    unlocked: false,
    hearts: 0,
    levelRequired: 3,
    personality: 'Stevig en knuffelig, waggelt door het zand.',
    habitatName: 'De Ondergrondse Burcht'
  },
  {
    id: 'daan-dingo',
    name: 'Daan de Dingo',
    title: 'De Outback Speurder',
    emoji: '🐕',
    biome: 'outback',
    color: '#FFB74D',
    bgGradient: 'from-amber-200 to-yellow-200',
    soundName: 'general',
    funFact: 'Dingo’s kunnen hun polsen draaien en deuren openmaken!',
    favoriteFood: 'Knapperige Brokjes',
    favoriteFoodEmoji: '🍖',
    unlocked: false,
    hearts: 0,
    levelRequired: 4,
    personality: 'Vrij en alert op elk geluidje in de wind.',
    habitatName: 'De Rotsachtige Kloof'
  },
  {
    id: 'ellie-emoe',
    name: 'Ellie de Emoe',
    title: 'De Snelle Loopvogel',
    emoji: '🦤',
    biome: 'outback',
    color: '#5D4037',
    bgGradient: 'from-stone-200 to-amber-200',
    soundName: 'general',
    funFact: 'Emoes kunnen niet achteruit lopen en rennen wel 50 km per uur!',
    favoriteFood: 'Wilde Zaadjes',
    favoriteFoodEmoji: '🌾',
    unlocked: false,
    hearts: 0,
    levelRequired: 5,
    personality: 'Nieuwsgierig en pikt naar glimmende voorwerpen.',
    habitatName: 'De Grote Zoutvlakte'
  },
  {
    id: 'finn-woestijnvos',
    name: 'Finn de Woestijnvos',
    title: 'De Grote Oren Wachter',
    emoji: '🦊',
    biome: 'outback',
    color: '#FF8A65',
    bgGradient: 'from-orange-200 to-amber-200',
    soundName: 'general',
    funFact: 'Zijn grote oren werken als koelers om zijn lichaam fris te houden in de hete woestijn!',
    favoriteFood: 'Woestijnbessen',
    favoriteFoodEmoji: '🫐',
    unlocked: false,
    hearts: 0,
    levelRequired: 6,
    personality: 'Speels en graaft zich bliksemsnel in het zand.',
    habitatName: 'De Gouden Zandheuvels'
  },

  // 7. MOUNTAIN ANIMALS (🏔️)
  {
    id: 'boris-steenbok',
    name: 'Boris de Steenbok',
    title: 'De Rotswand Acrobaat',
    emoji: '🐐',
    biome: 'mountain',
    color: '#5C6BC0',
    bgGradient: 'from-indigo-200 to-blue-300',
    soundName: 'general',
    funFact: 'Steenbokken klimmen moeiteloos op bijna kaarsrechte dammen en rotsen dankzij speciale elastische hoeven!',
    favoriteFood: 'Alpengras & Mos',
    favoriteFoodEmoji: '🌿',
    unlocked: false,
    hearts: 0,
    levelRequired: 1,
    personality: 'Zeker van zijn stap en springt van richel naar richel.',
    habitatName: 'De Steile Rotswanden'
  },
  {
    id: 'max-marmot',
    name: 'Max de Bergmarmot',
    title: 'De Fluitende Bewaker',
    emoji: '🐿️',
    biome: 'mountain',
    color: '#8D6E63',
    bgGradient: 'from-amber-200 to-stone-300',
    soundName: 'general',
    funFact: 'Marmotten fluiten keihard om de hele vallei te waarschuwen als er een arend overvliegt!',
    favoriteFood: 'Alpenbloemetjes',
    favoriteFoodEmoji: '🌸',
    unlocked: false,
    hearts: 0,
    levelRequired: 2,
    personality: 'Lief en houdt een heerlijke winterslaap van wel 7 maanden.',
    habitatName: 'De Alpenweide'
  },
  {
    id: 'luna-alpaca',
    name: 'Luna de Berg-Alpaca',
    title: 'De Zachte Hoogvlieger',
    emoji: '🦙',
    biome: 'mountain',
    color: '#A1887F',
    bgGradient: 'from-orange-200 to-amber-200',
    soundName: 'general',
    funFact: 'Alpacawol is superzacht, kriebelt nooit en houdt warmte vast op ijzige hoogtes!',
    favoriteFood: 'Kruidig Hooi',
    favoriteFoodEmoji: '🌾',
    unlocked: false,
    hearts: 0,
    levelRequired: 3,
    personality: 'Zachtaardig en neuriet als ze tevreden is.',
    habitatName: 'Het Bergplateau'
  },
  {
    id: 'alex-arend',
    name: 'Alex de Koningsarend',
    title: 'De Heerser van het Luchtruim',
    emoji: '🦅',
    biome: 'mountain',
    color: '#4E342E',
    bgGradient: 'from-stone-300 to-indigo-200',
    soundName: 'general',
    funFact: 'Een arend kan een klein muisje zien bewegen vanaf meer dan 3 kilometer hoogte!',
    favoriteFood: 'Verse Vis uit Bergmeren',
    favoriteFoodEmoji: '🐟',
    unlocked: false,
    hearts: 0,
    levelRequired: 4,
    personality: 'Majestueus en zweeft geruisloos op de thermiek.',
    habitatName: 'De Hoge Berghorst'
  },
  {
    id: 'saar-sint-bernard',
    name: 'Saar de Hulphond',
    title: 'De Bergredder',
    emoji: '🐕‍🦺',
    biome: 'mountain',
    color: '#BCAAA4',
    bgGradient: 'from-amber-100 to-rose-200',
    soundName: 'general',
    funFact: 'Sint-Bernards hebben een fantastische neus en redden al eeuwen wandelaars in de sneeuw!',
    favoriteFood: 'Hondenkoekjes & Kaas',
    favoriteFoodEmoji: '🧀',
    unlocked: false,
    hearts: 0,
    levelRequired: 5,
    personality: 'Trouw, vriendelijk en heeft een enorm warm hart.',
    habitatName: 'De Gezellige Berghut'
  },
  {
    id: 'bella-gems',
    name: 'Bella het Gemsje',
    title: 'De Bergspringer',
    emoji: '🦌',
    biome: 'mountain',
    color: '#795548',
    bgGradient: 'from-stone-200 to-blue-200',
    soundName: 'general',
    funFact: 'Gemsen kunnen sprongen maken van wel 2 meter hoog en 6 meter ver over gletsjerkloven!',
    favoriteFood: 'Edelweiss & Bergklaver',
    favoriteFoodEmoji: '🌸',
    unlocked: false,
    hearts: 0,
    levelRequired: 6,
    personality: 'Snel, behendig en dartelt tussen de sneeuwvelden.',
    habitatName: 'De Gletsjerrand'
  }
];

// ----------------------------------------------------
// EXPANDED GROEP 4-5 BIOME LEVELS (Spelling, Klinkers, Begrijpend Lezen)
// ----------------------------------------------------
export const BIOME_LEVELS_GROEP_4_5: Record<BiomeType, Level[]> = {
  farm: [
    {
      id: 1,
      name: 'Bella’s Weilanden',
      biome: 'farm',
      theme: 'Korte en Lange Klanken (Bomen vs Bommen)',
      themeColor: '#4CAF50',
      bannerEmoji: '🐮',
      chapterTitle: 'Hoofdstuk 1: Ochtendgloren op de Boerderij',
      introStory: 'De ochtendzon schijnt over de weilanden. Bella de koe loeit: "Moeh! Help je me de verse bomen en kruiden op de juiste manier te spellen?"',
      animalReward: ALL_BIOME_ANIMALS.find(a => a.id === 'bella-koe')!,
      questions: [
        {
          id: 'farm45-1',
          category: 'Klinkers & Klankgroepen',
          categoryIcon: '🐮',
          question: 'Kies het juist gespelde woord: In de wei staan mooie grote ___.',
          type: 'choice',
          options: ['boomen', 'bomen', 'boommen'],
          correctOptionIndex: 1,
          hint: 'Klankgroep bo-men: lange klank aan het einde van de klankgroep, dus je schrijft één klinker!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'farm45-2',
          category: 'Klinkers (Dubbele Medeklinker)',
          categoryIcon: '🥛',
          question: 'Welk woord is goed gespeld: De boer vult twee emmers vol verse ___.',
          type: 'choice',
          options: ['melk', 'mellek', 'melek'],
          correctOptionIndex: 0,
          hint: 'In melk hoor je een stomme e tussen de l en k, maar je schrijft hem niet!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'farm45-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel het woord voor het edele rijdier met manen:',
          type: 'spell',
          targetWord: 'PAARD',
          scrambledLetters: ['P', 'A', 'A', 'R', 'D'],
          hint: 'Luister naar de klanken: p - aa - r - d.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'farm45-4',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Begrijpend Lezen: Waarom hebben koeien vier magen?',
          passage: 'Koeien zijn herkauwers. Ze eten taai gras dat moeilijk te verteren is. Dankzij hun vier verschillende magen kunnen ze het gras twee keer fijnmalen en alle vitamines opnemen.',
          type: 'choice',
          options: [
            'Om het taaie gras goed te kunnen verteren',
            'Omdat ze vier keer per dag water drinken',
            'Om sneller over het grasland te rennen'
          ],
          correctOptionIndex: 0,
          hint: 'Zoek in de tekst naar het woord "verteren".',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    },
    {
      id: 2,
      name: 'Wolletje’s Schaapskooi',
      biome: 'farm',
      theme: 'Woorden met -ng, -nk en Samenstellingen',
      themeColor: '#81C784',
      bannerEmoji: '🐑',
      chapterTitle: 'Hoofdstuk 2: Zachte Wolletjes',
      introStory: 'Wolletje huppelt door het klaverveld. "Bèèh! Wie helpt mee met het sorteren van de woorden met de ring- en bankklank?"',
      animalReward: ALL_BIOME_ANIMALS.find(a => a.id === 'wolletje-schaap')!,
      questions: [
        {
          id: 'farm45-5',
          category: 'Regelwoorden (-ng / -nk)',
          categoryIcon: '🐑',
          question: 'Kies het juiste woord: De schapen drinken water bij de houten ___.',
          type: 'choice',
          options: ['plaank', 'plank', 'plang'],
          correctOptionIndex: 1,
          hint: 'Onthoud: in een plankwoord zit geen g tussen de n en de k!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'farm45-6',
          category: 'Klankregel (-ng)',
          categoryIcon: '💍',
          question: 'Kies het juiste woord: De bel aan de staldeur maakt een vrolijke ___.',
          type: 'choice',
          options: ['klang', 'klank', 'klanck'],
          correctOptionIndex: 1,
          hint: 'Net als bank, plank en klank.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'farm45-7',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel het woord voor de zachte vacht van een schaap:',
          type: 'spell',
          targetWord: 'WOL',
          scrambledLetters: ['W', 'O', 'L'],
          hint: 'Korte klank o tussen de w en l.',
          gradeBadge: 'Groep 4-5'
        }
      ]
    }
  ],

  safari: [
    {
      id: 1,
      name: 'Gigi’s Savanne Vlakte',
      biome: 'safari',
      theme: 'Korte en Lange Klinkers & Begrijpend Lezen',
      themeColor: '#FFB300',
      bannerEmoji: '🦒',
      chapterTitle: 'Hoofdstuk 1: De Hoge Acacia',
      introStory: 'De zon straalt over de savanne. Gigi buigt haar lange nek omlaag: "Welkom op de savanne! Laten we speuren naar de juiste spelling!"',
      animalReward: ALL_BIOME_ANIMALS.find(a => a.id === 'gigi-giraf')!,
      questions: [
        {
          id: 'safari45-1',
          category: 'Klinkers',
          categoryIcon: '🦒',
          question: 'Kies het juiste woord: De giraf eet van de hoogste ___.',
          type: 'choice',
          options: ['takken', 'taken', 'tacken'],
          correctOptionIndex: 0,
          hint: 'Korte klank a, dus twee medeklinkers (k-k)!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'safari45-2',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel het woord voor het dier met de lange nek:',
          type: 'spell',
          targetWord: 'GIRAF',
          scrambledLetters: ['G', 'I', 'R', 'A', 'F'],
          hint: 'Begint met een G en eindigt op een F.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'safari45-3',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Begrijpend Lezen: Waarom is de tong van een giraf donkerblauw?',
          passage: 'Giraffen steken hun tong wel 45 centimeter uit om blaadjes tussen scherpe doorns vandaan te plukken. Doordat de tong veel donker pigment bevat, verbrandt hij niet in de felle Afrikaanse zon.',
          type: 'choice',
          options: [
            'Als bescherming tegen de felle zon',
            'Omdat ze alleen blauwe bessen eten',
            'Om roofdieren af te schrikken'
          ],
          correctOptionIndex: 0,
          hint: 'Kijk naar de zin over het pigment en bescherming tegen de zon.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    },
    {
      id: 2,
      name: 'Leo’s Leeuwenrots',
      biome: 'safari',
      theme: 'Woorden met -eeuw en -ieuw',
      themeColor: '#FFA726',
      bannerEmoji: '🦁',
      chapterTitle: 'Hoofdstuk 2: De Koning Brult',
      introStory: 'Leo de leeuw rekt zich uit op de warme rots: "Brrr! Wie weet hoe je het woord leeuw en schreeuw spelt?"',
      animalReward: ALL_BIOME_ANIMALS.find(a => a.id === 'leo-leeuw')!,
      questions: [
        {
          id: 'safari45-4',
          category: 'Eeuw/Ieuw woorden',
          categoryIcon: '🦁',
          question: 'Kies het juist gespelde woord: De koning van de savanne is de ___.',
          type: 'choice',
          options: ['leeuw', 'leuw', 'leew'],
          correctOptionIndex: 0,
          hint: 'Denk aan de regel: in eeuw-woorden vergeet je de u niet!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'safari45-5',
          category: 'Woordenschat',
          categoryIcon: '👑',
          question: 'Welk woord past in de zin: De leeuw laat een luide ___ horen.',
          type: 'choice',
          options: ['brul', 'bruhl', 'brull'],
          correctOptionIndex: 0,
          hint: 'Een korte klank met één l aan het einde.',
          gradeBadge: 'Groep 4-5'
        }
      ]
    }
  ],

  sea: [
    {
      id: 1,
      name: 'Dolly’s Koraalbaai',
      biome: 'sea',
      theme: 'D/T Eindklank & Meervoud van f naar v',
      themeColor: '#0288D1',
      bannerEmoji: '🐬',
      chapterTitle: 'Hoofdstuk 1: De Sprong in de Baai',
      introStory: 'Dolly de dolfijn springt boven het water uit: "Klik-klik! Duik mee naar het koraalrif en ontdek de geheimen van de oceaan!"',
      animalReward: ALL_BIOME_ANIMALS.find(a => a.id === 'dolly-dolfijn')!,
      questions: [
        {
          id: 'sea45-1',
          category: 'Eindklank (d/t)',
          categoryIcon: '🐬',
          question: 'Kies het juiste woord: De dolfijn zwemt naar het zandige ___.',
          type: 'choice',
          options: ['strant', 'strand', 'straant'],
          correctOptionIndex: 1,
          hint: 'Maak het woord langer: één strand, twee stranden.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'sea45-2',
          category: 'Meervoud (f naar v)',
          categoryIcon: '🌊',
          question: 'Wat is het juiste meervoud van "golf"?',
          type: 'choice',
          options: ['golfen', 'golven', 'golwen'],
          correctOptionIndex: 1,
          hint: 'De letter f verandert vaak in een v bij het meervoud.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'sea45-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel het woord voor de zeedieren met schubben:',
          type: 'spell',
          targetWord: 'VISSEN',
          scrambledLetters: ['V', 'I', 'S', 'S', 'E', 'N'],
          hint: 'Korte klank i, dus twee s-en!',
          gradeBadge: 'Groep 4-5'
        }
      ]
    }
  ],

  snow: [
    {
      id: 1,
      name: 'Barny’s IJsschotsen',
      biome: 'snow',
      theme: 'Woorden met ij / ei en au / ou',
      themeColor: '#00ACC1',
      bannerEmoji: '🐻‍❄️',
      chapterTitle: 'Hoofdstuk 1: Het Krakende IJs',
      introStory: 'Barny de ijsbeer schudt zijn dikke vacht uit. "Brrr! Laten we ons opwarmen met slimme taalopgaven!"',
      animalReward: ALL_BIOME_ANIMALS.find(a => a.id === 'barny-ijsbeer')!,
      questions: [
        {
          id: 'snow45-1',
          category: 'Klinkers (ij/ei)',
          categoryIcon: '🐻‍❄️',
          question: 'Kies het juiste woord: De ijsbeer glijdt over het gladde ___.',
          type: 'choice',
          options: ['ijs', 'eys', 'eijs'],
          correctOptionIndex: 0,
          hint: 'IJs schrijf je met de lange ij.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'snow45-2',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Begrijpend Lezen: Welke kleur heeft de huid van een ijsbeer onder zijn vacht?',
          passage: 'Hoewel de dikke vacht van een ijsbeer er spierwit uitziet, zijn de haren hol en transparant. De huid eronder is diepzwart om de warmte van het zonlicht optimaal vast te houden.',
          type: 'choice',
          options: [
            'Zwart, om zonnewarmte vast te houden',
            'Roze, zoals een varkentje',
            'Felblauw, net als ijs'
          ],
          correctOptionIndex: 0,
          hint: 'Lees over de diepzwarte huid onder de haren.',
          gradeBadge: 'Begrijpend Lezen'
        },
        {
          id: 'snow45-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel het woord voor de witte neerslag:',
          type: 'spell',
          targetWord: 'SNEEUW',
          scrambledLetters: ['S', 'N', 'E', 'E', 'U', 'W'],
          hint: 'Woord uit de -eeuw familie.',
          gradeBadge: 'Groep 4-5'
        }
      ]
    }
  ],

  jungle: [
    {
      id: 1,
      name: 'Pippa’s Bamboewoud',
      biome: 'jungle',
      theme: 'Samenstellingen & Klankgroepen',
      themeColor: '#388E3C',
      bannerEmoji: '🐼',
      chapterTitle: 'Hoofdstuk 1: Het Groene Regenwoud',
      introStory: 'Pippa smult van een verse stengel bamboe. "Krok krok! Help je mee om de junglewoorden goed te spellen?"',
      animalReward: ALL_BIOME_ANIMALS.find(a => a.id === 'pippa-panda')!,
      questions: [
        {
          id: 'jungle45-1',
          category: 'Samenstellingen',
          categoryIcon: '🐼',
          question: 'Welk samengesteld woord is juist gespeld?',
          type: 'choice',
          options: ['regenwout', 'regenwoud', 'reegenwoud'],
          correctOptionIndex: 1,
          hint: 'Maak het woord woud langer: de wouden.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'jungle45-2',
          category: 'Klankgroepen',
          categoryIcon: '🎋',
          question: 'Kies het juiste woord: De panda eet malse groene ___.',
          type: 'choice',
          options: ['bamboestengels', 'bambustengels', 'bamboestengels'],
          correctOptionIndex: 0,
          hint: 'Bamboe + stengels.',
          gradeBadge: 'Groep 4-5'
        }
      ]
    }
  ],

  outback: [
    {
      id: 1,
      name: 'Kiki’s Rode Outback',
      biome: 'outback',
      theme: 'Woorden met open klanken & Begrijpend Lezen',
      themeColor: '#E65100',
      bannerEmoji: '🦘',
      chapterTitle: 'Hoofdstuk 1: De Sprong over de Rode Heuvel',
      introStory: 'Kiki de Kangoeroe stuitert door het mulle rode zand: "Boing boing! Welkom in Australië! Speur mee naar de beste woorden!"',
      animalReward: ALL_BIOME_ANIMALS.find(a => a.id === 'kiki-kangoeroe')!,
      questions: [
        {
          id: 'outback45-1',
          category: 'Eeuw/Ieuw woorden',
          categoryIcon: '🦘',
          question: 'Kies het juiste woord: Kiki ontdekt een ___ pad door de duinen.',
          type: 'choice',
          options: ['nieuwd', 'nieuw', 'nief'],
          correctOptionIndex: 1,
          hint: 'Denk aan de regel voor eeuw/ieuw woorden: vergeet de u niet!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'outback45-2',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Begrijpend Lezen: Waarom kunnen kangoeroes zo hoog springen?',
          passage: 'Kangoeroes hebben enorm krachtige achterpoten met pezen die werken als sterke elastieken veren. Als ze neerkomen, slaat de pees energie op die bij de volgende sprong automatisch vrijkomt.',
          type: 'choice',
          options: [
            'Omdat hun pezen werken als elastische veren',
            'Omdat ze vleugels hebben onder hun vacht',
            'Doordat ze heel veel water drinken'
          ],
          correctOptionIndex: 0,
          hint: 'Zoek naar de uitleg over de elastieken veren in de pezen.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    }
  ],

  mountain: [
    {
      id: 1,
      name: 'Boris’ Alpenpieken',
      biome: 'mountain',
      theme: 'Woorden met -ch/cht & Bergverhalen',
      themeColor: '#5C6BC0',
      bannerEmoji: '🏔️',
      chapterTitle: 'Hoofdstuk 1: De Hoge Steenwand',
      introStory: 'Boris de Steenbok balanceert op een smalle rotsrichel hoog boven het dal. "Kijk eens naar het uitzicht! Help je me de bergwoorden te vinden?"',
      animalReward: ALL_BIOME_ANIMALS.find(a => a.id === 'boris-steenbok')!,
      questions: [
        {
          id: 'mountain45-1',
          category: 'Woorden met -cht',
          categoryIcon: '🐐',
          question: 'Kies het juist gespelde woord: Vanaf de bergtop heb je een prachtig ___.',
          type: 'choice',
          options: ['uitzigt', 'uitzicht', 'uitzygt'],
          correctOptionIndex: 1,
          hint: 'Na een korte klank schrijf je -cht, behalve bij hij ligt, legt en zegt.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'mountain45-2',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Begrijpend Lezen: Hoe kunnen steenbokken op steile rotsen lopen zonder uit te glijden?',
          passage: 'De hoeven van steenbokken hebben een harde buitenrand en een zacht, rubberachtig kussentje in het midden. Hierdoor zuigen hun hoeven zich als het ware vast aan de kleinste oneffenheden in de rotswand.',
          type: 'choice',
          options: [
            'Dankzij een zacht rubberachtig kussentje en harde buitenrand',
            'Doordat ze schoenen dragen',
            'Omdat rotsen altijd zacht zijn'
          ],
          correctOptionIndex: 0,
          hint: 'Lees over het zachte kussentje in de hoeven.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    }
  ]
};

// ----------------------------------------------------
// EXPANDED GROEP 6-7-8 BIOME LEVELS (Sterke Werkwoorden, d/t, Leenwoorden, Moeilijk Begrip)
// ----------------------------------------------------
export const BIOME_LEVELS_GROEP_6_8: Record<BiomeType, Level[]> = {
  farm: [
    {
      id: 1,
      name: 'Bella’s Grammatica Weide',
      biome: 'farm',
      theme: 'Werkwoordspelling (d/t/dt) & Sterke Werkwoorden',
      themeColor: '#4CAF50',
      bannerEmoji: '🐮',
      chapterTitle: 'Hoofdstuk 1: Boerderij Werkwoorden & Vervoegingen',
      introStory: 'Bella de koe kijkt wijs over het hek: "In Groep 6-7-8 gaan we aan de slag met sterke werkwoorden en de d/t regels! Help jij mee?"',
      animalReward: ALL_BIOME_ANIMALS.find(a => a.id === 'bella-koe')!,
      questions: [
        {
          id: 'farm68-1',
          category: 'Werkwoordspelling (Tegenwoordige Tijd)',
          categoryIcon: '🐮',
          question: 'Vul in: De boer ___ vroeg in de ochtend de koeien in de wei.',
          type: 'choice',
          options: ['vind', 'vindt', 'vint'],
          correctOptionIndex: 1,
          hint: 'Onderwerp is "de boer" (hij-vorm). De stam van vinden is vind + t = vindt.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'farm68-2',
          category: 'Sterke Werkwoorden (Verleden Tijd)',
          categoryIcon: '⚡',
          question: 'Wat is de verleden tijd (VT) van het sterke werkwoord "brengen"? (Gisteren ... hij)',
          type: 'choice',
          options: ['bracht', 'bragte', 'brengde'],
          correctOptionIndex: 0,
          hint: 'Brengen is een sterk werkwoord: brengen - bracht - gebracht.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'farm68-3',
          category: 'Sterke Werkwoorden (VT Meervoud)',
          categoryIcon: '🚜',
          question: 'Wat is de verleden tijd van "rijden"? (De boeren ... op de tractor)',
          type: 'choice',
          options: ['reden', 'rijdden', 'reeden'],
          correctOptionIndex: 0,
          hint: 'Rijden - reed - reden (met één e).',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'farm68-4',
          category: 'Voltooid Deelwoord & ’t Kofschip',
          categoryIcon: '📖',
          question: 'Welke zin is grammaticaal geheel correct gespeld?',
          type: 'choice',
          options: [
            'De boer heeft het verse hooi keurig opgestapelt.',
            'De boer heeft het verse hooi keurig opgestapeld.',
            'De boer heeft het verse hooi keurig opgestapelt.'
          ],
          correctOptionIndex: 1,
          hint: 'Kijk naar de laatste letter van de stam van stapelen (stapel). De "l" zit niet in ’t kofschip, dus eindigt het op een -d.',
          gradeBadge: 'Groep 6-7-8'
        }
      ]
    },
    {
      id: 2,
      name: 'Wolletje’s Moeilijke Leenwoorden',
      biome: 'farm',
      theme: 'Trema, Apostrof & Leenwoorden',
      themeColor: '#81C784',
      bannerEmoji: '🐑',
      chapterTitle: 'Hoofdstuk 2: Schapenwol & Woordsoorten',
      introStory: 'Wolletje loopt langs de schaapskooi. "Pak je vergrootglas! Tijd voor trema’s, meervouden en leestekens!"',
      animalReward: ALL_BIOME_ANIMALS.find(a => a.id === 'wolletje-schaap')!,
      questions: [
        {
          id: 'farm68-5',
          category: 'Trema & Klinkerbotsing',
          categoryIcon: '🐑',
          question: 'Kies de juiste spelling van het meervoud:',
          type: 'choice',
          options: ['koloniën', 'kolonien', 'kolonieën'],
          correctOptionIndex: 0,
          hint: 'Bij woorden die eindigen op een onbeklemtoonde -ie (zoals kolonie) krijgt de -en een trema: koloniën.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'farm68-6',
          category: 'Letters Leggen (Sterke Werkwoorden)',
          categoryIcon: '✏️',
          question: 'Spel het voltooid deelwoord van het werkwoord "ZWEMMEN":',
          type: 'spell',
          targetWord: 'GEZWOMMEN',
          scrambledLetters: ['G', 'E', 'Z', 'W', 'O', 'M', 'M', 'E', 'N'],
          hint: 'Het werkwoord verandert van klank: zwemmen - zwom - gezwommen.',
          gradeBadge: 'Groep 6-7-8'
        }
      ]
    }
  ],

  safari: [
    {
      id: 1,
      name: 'Gigi’s Savanne Vervoegingen',
      biome: 'safari',
      theme: 'Sterke Werkwoorden & Academisch Begrip',
      themeColor: '#FFB300',
      bannerEmoji: '🦒',
      chapterTitle: 'Hoofdstuk 1: De Savanne Vervoegingen',
      introStory: 'Gigi buigt haar sierlijke hals: "Op de savanne rennen de cheetahs en brullen de leeuwen. Weet jij alle werkwoordsvormen?"',
      animalReward: ALL_BIOME_ANIMALS.find(a => a.id === 'gigi-giraf')!,
      questions: [
        {
          id: 'safari68-1',
          category: 'Sterke Werkwoorden (VT)',
          categoryIcon: '🦒',
          question: 'Wat is de juiste verleden tijd van "vechten"? (De leeuwen ... moedig)',
          type: 'choice',
          options: ['vochten', 'vechtten', 'vachten'],
          correctOptionIndex: 0,
          hint: 'Vechten - vocht - gevochten (meervoud: vochten).',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'safari68-2',
          category: 'Sterke Werkwoorden (VT)',
          categoryIcon: '🏃',
          question: 'Wat is de verleden tijd van "lopen"? (Gigi ... door het savannegras)',
          type: 'choice',
          options: ['liep', 'loopte', 'leep'],
          correctOptionIndex: 0,
          hint: 'Lopen - liep - gelopen.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'safari68-3',
          category: 'Begrijpend Lezen & Causaliteit',
          categoryIcon: '📖',
          question: 'Wat is de belangrijkste reden dat cheeta’s na een sprint moeten rusten?',
          passage: 'Tijdens een topsprint van 110 km/u verbruikt een cheeta in korte tijd een gigantische hoeveelheid energie. Zijn lichaamstemperatuur stijgt razendsnel naar bijna 41 graden Celsius, waardoor hij na enkele honderden meters moet stoppen om af te koelen en niet oververhit te raken.',
          type: 'choice',
          options: [
            'Om te voorkomen dat zijn lichaam oververhit raakt',
            'Omdat zijn poten direct pijn gaan doen',
            'Omdat hij meteen in slaap valt'
          ],
          correctOptionIndex: 0,
          hint: 'Lees de zin over lichaamstemperatuur en afkoelen.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    }
  ],

  sea: [
    {
      id: 1,
      name: 'Dolly’s Diepzee Grammatica',
      biome: 'sea',
      theme: 'Moeilijke Leenwoorden & D/T bij Bijvoeglijk Naamwoord',
      themeColor: '#0288D1',
      bannerEmoji: '🐬',
      chapterTitle: 'Hoofdstuk 1: De Diepzee Grammatica',
      introStory: 'Dolly de dolfijn springt door een regenboog van opspattend zeewater: "Klaar voor uitdagende oceaantaal?"',
      animalReward: ALL_BIOME_ANIMALS.find(a => a.id === 'dolly-dolfijn')!,
      questions: [
        {
          id: 'sea68-1',
          category: 'Vergroot Woord (Bijvoeglijk gebruikt)',
          categoryIcon: '🐬',
          question: 'Kies de juiste spelling: Het pas ___ schip zonk naar de zeebodem.',
          type: 'choice',
          options: ['gesloopte', 'gesloopten', 'gesloopde'],
          correctOptionIndex: 0,
          hint: 'Bijvoeglijk gebruikt voltooid deelwoord: zo kort mogelijk. Slopen heeft stam sloop (p zit in ’t kofschip) dus gesloopte.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'sea68-2',
          category: 'Letters Leggen (Sterke Werkwoorden)',
          categoryIcon: '✏️',
          question: 'Spel het voltooid deelwoord van "DUIKEN":',
          type: 'spell',
          targetWord: 'GEDOKEN',
          scrambledLetters: ['G', 'E', 'D', 'O', 'K', 'E', 'N'],
          hint: 'Duiken verandert van klank: duiken - dook - gedoken.',
          gradeBadge: 'Groep 6-7-8'
        }
      ]
    }
  ],

  snow: [
    {
      id: 1,
      name: 'Barny’s Pool Taalpuzzels',
      biome: 'snow',
      theme: 'Woorden met -isch, -lijk en Hoofdletters',
      themeColor: '#00ACC1',
      bannerEmoji: '🐻‍❄️',
      chapterTitle: 'Hoofdstuk 1: Het Bevroren Taalrijk',
      introStory: 'Barny de ijsbeer schudt de sneeuw van zijn oren: "Krakend ijs en scherpe grammatica!"',
      animalReward: ALL_BIOME_ANIMALS.find(a => a.id === 'barny-ijsbeer')!,
      questions: [
        {
          id: 'snow68-1',
          category: 'Woorden met -isch',
          categoryIcon: '🐻‍❄️',
          question: 'Kies het juist gespelde woord: Het noorderlicht is een prachtig ___ verschijnsel.',
          type: 'choice',
          options: ['fantastisch', 'fantastis', 'fantastiese'],
          correctOptionIndex: 0,
          hint: 'Woorden die eindigen op de klank -ies schrijf je als -isch.',
          gradeBadge: 'Groep 6-7-8'
        },
        {
          id: 'snow68-2',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Waarom bevriezen de poten van pinguïns niet op het ijs?',
          passage: 'Pinguïns beschikken over een ingenieus warmtewisselsysteem in hun poten. Warm bloed uit hun lichaam stroomt langs het koude bloed dat uit de voeten terugkeert, waardoor de warmte behouden blijft en de poten precies warm genoeg blijven om niet aan het ijs te vriezen.',
          type: 'choice',
          options: [
            'Dankzij een intern warmtewisselsysteem in hun bloedvaten',
            'Doordat ze op warme stenen staan',
            'Omdat hun bloed van kokend water is gemaakt'
          ],
          correctOptionIndex: 0,
          hint: 'Lees over het ingenieuze warmtewisselsysteem.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    }
  ],

  jungle: [
    {
      id: 1,
      name: 'Pippa’s Woordenschat Tempel',
      biome: 'jungle',
      theme: 'Apostrof-s, Meervouden & Uitdrukkingen',
      themeColor: '#388E3C',
      bannerEmoji: '🐼',
      chapterTitle: 'Hoofdstuk 1: De Woordenschat Tempel',
      introStory: 'Pippa kauwt rustig op bamboe: "Laten we de moeilijkste meervouden van het regenwoud ontrafelen!"',
      animalReward: ALL_BIOME_ANIMALS.find(a => a.id === 'pippa-panda')!,
      questions: [
        {
          id: 'jungle68-1',
          category: 'Meervoud met Apostrof',
          categoryIcon: '🐼',
          question: 'Kies de juiste spelling van het meervoud van "panda":',
          type: 'choice',
          options: ["panda's", 'pandas', "panda'es"],
          correctOptionIndex: 0,
          hint: 'Als een woord eindigt op een lange a, o, u of y, gebruik je een apostrof-s bij het meervoud om de lange klank te bewaren.',
          gradeBadge: 'Groep 6-7-8'
        }
      ]
    }
  ],

  outback: [
    {
      id: 1,
      name: 'Kiki’s Woestijn Werkwoorden',
      biome: 'outback',
      theme: 'Sterke Werkwoorden & Samengestelde Zinnen',
      themeColor: '#E65100',
      bannerEmoji: '🦘',
      chapterTitle: 'Hoofdstuk 1: De Grote Outback Sprong',
      introStory: 'Kiki de kangoeroe springt over de rotsen: "Geen sprong is te ver voor onze taalmeesters!"',
      animalReward: ALL_BIOME_ANIMALS.find(a => a.id === 'kiki-kangoeroe')!,
      questions: [
        {
          id: 'outback68-1',
          category: 'Sterke Werkwoorden (VT)',
          categoryIcon: '🦘',
          question: 'Wat is de verleden tijd van "springen"? (Gisteren ... Kiki over het ravijn)',
          type: 'choice',
          options: ['sprong', 'springde', 'sprang'],
          correctOptionIndex: 0,
          hint: 'Springen is een sterk werkwoord: springen - sprong - gesprongen.',
          gradeBadge: 'Groep 6-7-8'
        }
      ]
    }
  ],

  mountain: [
    {
      id: 1,
      name: 'Boris’ Hoge Grammatica Toppen',
      biome: 'mountain',
      theme: 'Moeilijke Spelling & Vaste Voorzetsels',
      themeColor: '#5C6BC0',
      bannerEmoji: '🏔️',
      chapterTitle: 'Hoofdstuk 1: De Berg der Wijsheid',
      introStory: 'Boris kijkt vanaf de hoogste bergtop: "We hebben de top bereikt! Tijd voor de ultieme taaltoets!"',
      animalReward: ALL_BIOME_ANIMALS.find(a => a.id === 'boris-steenbok')!,
      questions: [
        {
          id: 'mountain68-1',
          category: 'Vaste Voorzetsels & Uitdrukkingen',
          categoryIcon: '🐐',
          question: 'Kies het juiste voorzetsel: Boris verbaast zich ___ de steile bergwand.',
          type: 'choice',
          options: ['over', 'aan', 'voor'],
          correctOptionIndex: 0,
          hint: 'Je verbaast je ALTIJD "over" iets.',
          gradeBadge: 'Groep 6-7-8'
        }
      ]
    }
  ]
};

export const BIOME_LEVELS = BIOME_LEVELS_GROEP_4_5;
