import { RpgPage } from './citoRpgData';

export const SISTERS_12_PAGES_CAMPAIGN: RpgPage[] = [
  {
    pageNumber: 1,
    title: 'Het Zwevende Eiland aan de Tropische Horizon',
    biome: 'Dek van het Onderzoeksschip',
    storyText: `De twee zussen, Hemali en Ridheya, stonden zij aan zij op de boeg van hun witte **onderzoeksschip**. De zeebries deed de vlaggen vrolijk wapperen. Ridheya keek met haar ronde bril door de koperen verrekijker, terwijl Hemali de oude zeekaarten bestudeerde.

Aan de horizon dreef een **wonderbaarlijk** fenomeen: een weelderig groen eiland dat boven de oceaan leek te zweven in een gouden nevelkrans! Ridheya ontdekte direct silhouetten van zeldzame vogels rondom het eiland. "Kijk Hemali! Er zijn daar dieren die we moeten onderzoeken!" riep Ridheya enthousiast.`,
    targetWords: [
      {
        word: 'onderzoeksschip',
        breakdown: 'onderzoek + s + schip',
        dutchMeaning: 'een groot schip uitgerust met laboratoria en instrumenten om de natuur en zee te bestuderen.',
        englishMeaning: 'Research vessel'
      },
      {
        word: 'wonderbaarlijk',
        breakdown: 'wonder + baar + lijk',
        dutchMeaning: 'zo bijzonder en magisch dat het je met verbazing vervult.',
        englishMeaning: 'Miraculous / wondrous'
      },
      {
        word: 'zeekaarten',
        breakdown: 'zee + kaarten',
        dutchMeaning: 'speciale kaarten voor zeevaarders met dieptes, stromingen en eilanden.',
        englishMeaning: 'Nautical navigation charts'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🔍 Observatie #1',
      question: 'Wat ontdekken Hemali en Ridheya aan de horizon?',
      options: [
        'Een grote stormwolk vol hagel',
        'Een zwevend groen eiland omringd door een gouden nevelkrans',
        'Een gezonken roeiboot',
        'Een winkelcentrum'
      ],
      correctIndex: 1,
      explanation: 'De zussen zien een wonderbaarlijk zwevend groen eiland in een gouden nevelkrans.'
    },
    choices: [
      { label: 'Zet direct koers naar de Kristalbaai van het eiland', nextPage: 2, skillBonus: '+15 Navigatie', icon: '🚢' },
      { label: 'Laat Kopi en Simba op het voordek de wind peilen', nextPage: 2, skillBonus: '+15 Dierinstinct', icon: '🐕' }
    ]
  },
  {
    pageNumber: 2,
    title: 'Landing in de Kristalbaai & De Vermoeide Zeereiger',
    biome: 'Kristalbaai met Wit Koraalzand',
    storyText: `Het schip ankerde geruisloos in de turquoise baai. Toen de sloep het strand raakte, sprong Ridheya meteen naar voren met haar **dierenartstas**. Op een aangespoelde drijfhoutstam zat een grote zilverblauwe **zeereiger**. Het beestje was uitgeput door de felle zeestroming.

Ridheya reikte haar veldfles met zoetwater aan en gaf het diertje wat voedzame visolie. Hemali hief haar saffieren toverstaf om de reiger te omhullen met een zachte, verwarmende energiegloed. Binnen enkele minuten strekte de vogel fier zijn vleugels uit en boog dankbaar naar de twee zussen.`,
    targetWords: [
      {
        word: 'zeereiger',
        breakdown: 'zee + reiger',
        dutchMeaning: 'een statige kustvogel met lange poten en een scherpe snavel.',
        englishMeaning: 'Coastal heron'
      },
      {
        word: 'uitgeput',
        breakdown: 'uit + geput',
        dutchMeaning: 'helemaal zonder energie en doodmoe door grote inspanning.',
        englishMeaning: 'Exhausted'
      },
      {
        word: 'turquoise',
        dutchMeaning: 'een heldere, schitterende groenblauwe kleur zoals tropisch zeewater.',
        englishMeaning: 'Turquoise'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🩺 Eerste Hulp Samenwerking #2',
      question: 'Hoe vullen Hemali en Ridheya elkaar aan bij de verzorging van de zeereiger?',
      options: [
        'Ze maken ruzie over wie de vogel mag aaien',
        'Ridheya geeft water en visolie, terwijl Hemali de vogel verwarmt met een energieglans',
        'Ze laten de vogel alleen achter op het zand',
        'Ze bellen de politie'
      ],
      correctIndex: 1,
      explanation: 'Ridheya levert medische verzorging en voeding, terwijl Hemali met haar amulet voor warmte en energie zorgt.'
    },
    choices: [
      { label: 'Volg de zeereiger die het pad naar de kasteelpoort wijst', nextPage: 3, skillBonus: '+15 Gidsbegeleiding', icon: '🐦' },
      { label: 'Onderzoek de schelpenrunen op het koraalstrand', nextPage: 3, skillBonus: '+15 Archeologie', icon: '🐚' }
    ]
  },
  {
    pageNumber: 3,
    title: 'Het Poortraadsel van de Twee Sleutels',
    biome: 'Buitenste Kasteelpoort van Graniet',
    storyText: `Aan de voet van het nevelkasteel rees een kolossale poort van graniet en brons op. Boven de boog stond in gouden letters gebeiteld: *'Slechts het verbond van het zorgzame hart en het scherpzinnige verstand vermag deze grendel te breken.'*

Aan de linkerkant zat een holte in de vorm van een stethoscoop; aan de rechterkant een gravure van een wiskundige passer. Ridheya legde haar medische penlicht in de linkerholte en Hemali plaatste haar ganzenveer in de rechtergleuf. Met een diepe galm schoof de **toegangspoort** opzij!`,
    targetWords: [
      {
        word: 'toegangspoort',
        breakdown: 'toegang + s + poort',
        dutchMeaning: 'een grote, zware deur die de doorgang naar een kasteel bewaakt.',
        englishMeaning: 'Entrance gateway'
      },
      {
        word: 'scherpzinnig',
        breakdown: 'scherp + zinnig',
        dutchMeaning: 'heel slim en snel in staat om ingewikkelde problemen te doorzien.',
        englishMeaning: 'Sharp-minded / astute'
      },
      {
        word: 'vermag',
        dutchMeaning: 'in staat is om; de kracht of bevoegdheid heeft om iets te doen.',
        englishMeaning: 'Is able to / capable of'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🧠 Cito Logica #3',
      question: 'Wat symboliseert de dubbele sleutel op de kasteelpoort?',
      options: [
        'Dat je twee fietsen moet meenemen',
        'De harmonieuze samenwerking tussen medische dierenliefde (Ridheya) en intellectuele logica (Hemali)',
        'Dat de poort kapot is',
        'Dat je alleen overdag naar binnen mag'
      ],
      correctIndex: 1,
      explanation: 'De poort eist zowel de zorg van het hart als de scherpzinnigheid van het verstand.'
    },
    choices: [
      { label: 'Stap binnen in de overdekte botanische binnentuin', nextPage: 4, skillBonus: '+15 Botanica', icon: '🌿' },
      { label: 'Laat Simba de jonge leeuwenwelp de omgeving beveiligen', nextPage: 4, skillBonus: '+15 Moed', icon: '🦁' }
    ]
  },
  {
    pageNumber: 4,
    title: 'De Verborgen Botanische Kas van het Kasteel',
    biome: 'Tropische Binnentuin met Zwevende Bloemen',
    storyText: `Binnenin wachtte een adembenemende verrassing: een reusachtige glazen **plantenkas** waarin planten groeiden die al eeuwen niet meer op aarde waren gezien! Felblauwe orchideeën zweefden in de lucht zonder potten, gevoed door neveldruppels.

Ridheya herkende direct een zeldzame **genezingsvaren**. "Als we hiervan een beetje sap mengen met bronwater, kunnen we elke diepe wond bij dieren binnen seconden helen!" riep ze opgewonden. Hemali noteerde de Latijnse namen en chemische eigenschappen van de planten in haar expeditieschrift.`,
    targetWords: [
      {
        word: 'plantenkas',
        breakdown: 'planten + kas',
        dutchMeaning: 'een glazen gebouw waarin bijzondere planten onder ideale warmte groeien.',
        englishMeaning: 'Botanical greenhouse / conservatory'
      },
      {
        word: 'genezingsvaren',
        breakdown: 'genezing + s + varen',
        dutchMeaning: 'een zeldzame plantensoort waarvan het sap wonden bliksemsnel herstelt.',
        englishMeaning: 'Healing fern'
      },
      {
        word: 'eigenschappen',
        breakdown: 'eigen + schappen',
        dutchMeaning: 'de bijzondere kenmerken en kwaliteiten van een stof of wezen.',
        englishMeaning: 'Properties / characteristics'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🌱 Wetenschap & Natuur #4',
      question: 'Waarom is de genezingsvaren zo waardevol voor Ridheya?',
      options: [
        'Omdat hij lekker smaakt op een pizza',
        'Omdat het sap van de varen diepe wonden bij dieren in seconden kan helen',
        'Omdat hij blauwe verf maakt voor kleren',
        'Omdat hij muziek kan maken'
      ],
      correctIndex: 1,
      explanation: 'Ridheya ontdekt dat het sap van de genezingsvaren krachtige wondhelende eigenschappen bezit.'
    },
    choices: [
      { label: 'Pluk zorgvuldig twee bladeren voor de medische kit', nextPage: 5, skillBonus: '+15 Geneeskunst', icon: '🍃' },
      { label: 'Volg het zachte gemiauw achter de bamboewand', nextPage: 5, skillBonus: '+15 Dierenredding', icon: '🐾' }
    ]
  },
  {
    pageNumber: 5,
    title: 'Het Gewonde Wolkenpantertje',
    biome: 'Bamboeprieel in de Binnentuin',
    storyText: `Achter een dichte bamboehaag lag een jong **wolkenpantertje** met een bezeerde achterpoot. Het diertje had een prachtige vacht met donkere wolkvlekken. Hij blies zachtjes van de schrik, maar Kopi liep kalm naar voren en gaf het pantertje een troostende lik over zijn oren.

Ridheya haalde haar **spalkhoutjes** tevoorschijn. "Houd jij zijn kopje vast, Hemali?" vroeg ze. Hemali fluisterde rustgevende woorden, terwijl Ridheya het pootje behendig spalkte en insmeerde met het verse varensap. Het pantertje begon zachtjes te spinnen van opluchting.`,
    targetWords: [
      {
        word: 'wolkenpantertje',
        breakdown: 'wolken + panter + tje',
        dutchMeaning: 'een schitterende, zeldzame katachtige met vlekken die lijken op wolken.',
        englishMeaning: 'Clouded leopard cub'
      },
      {
        word: 'spalkhoutjes',
        breakdown: 'spalk + houtjes',
        dutchMeaning: 'smalle, stevige houten latjes om een gebroken of verstuikte poot recht te houden.',
        englishMeaning: 'Splints'
      },
      {
        word: 'opluchting',
        breakdown: 'op + luchting',
        dutchMeaning: 'het verdwijnen van zorgen of pijn, waardoor je weer vrij ademhaalt.',
        englishMeaning: 'Relief'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🩺 Behandeling #5',
      question: 'Waarvoor dienen de spalkhoutjes die Ridheya gebruikt?',
      options: [
        'Om een vuurtje mee te stoken',
        'Om de bezeerde poot recht en stabiel te houden tijdens het genezen',
        'Als eetstokjes voor het avondeten',
        'Om een kooi te bouwen'
      ],
      correctIndex: 1,
      explanation: 'Spalkhoutjes zorgen ervoor dat een bezeerd pootje niet buigt en veilig kan herstellen.'
    },
    choices: [
      { label: 'Geef het pantertje de naam Nube en neem hem mee in de zachte draagmand', nextPage: 6, skillBonus: '+15 Bescherming', icon: '🐆' },
      { label: 'Ga via de wenteltrap omhoog naar de Boekenzaal der Kapiteins', nextPage: 6, skillBonus: '+15 Ontdekking', icon: '📚' }
    ]
  },
  {
    pageNumber: 6,
    title: 'De Boekenzaal van de Oceaankapiteins',
    biome: 'Hoge Bibliotheek met Boogramen',
    storyText: `Op de eerste verdieping bevond zich de historische bibliotheek van de Oceaankapiteins. Duizenden boeken in leren banden stonden opgesteld langs cederhouten kasten. 

Hemali trok een zware atlas tevoorschijn: *'Het Drijvende Nevelkasteel wordt aangedreven door een hydro-magnetisch kristal in de troonzaal. **Indien** dit kristal niet op tijd wordt schoongemaakt van kalk, zal het eiland langzaam zinken naar de zeebodem.'* Hemali keek Ridheya ernstig aan: "We hebben geen moment te verliezen, we moeten naar de troonzaal!"`,
    targetWords: [
      {
        word: 'oceaankapiteins',
        breakdown: 'oceaan + kapiteins',
        dutchMeaning: 'ervaren zeelieden die het bevel voeren over grote schepen op de wereldzeeën.',
        englishMeaning: 'Ocean captains'
      },
      {
        word: 'hydro-magnetisch',
        dutchMeaning: 'werkend op de gecombineerde kracht van waterstroming en magnetisme.',
        englishMeaning: 'Hydro-magnetic'
      },
      {
        word: 'indien',
        dutchMeaning: 'als, in het geval dat (formeel signaalwoord van voorwaarde).',
        englishMeaning: 'If / in case that'
      }
    ],
    mysteryQuestion: {
      clueTitle: '📖 Cito Begrip #6',
      question: 'Wat dreigt er te gebeuren als het hydro-magnetische kristal niet wordt schoongemaakt?',
      options: [
        'Het kasteel verandert in chocolade',
        'Het zwevende eiland zal langzaam zinken naar de zeebodem',
        'De boeken vliegen weg naar het vasteland',
        'De lichten gaan feller branden'
      ],
      correctIndex: 1,
      explanation: 'De atlas waarschuwt dat kalkaanslag op het kristal ervoor zorgt dat het eiland zijn zweefkracht verliest en zinkt.'
    },
    choices: [
      { label: 'Ren direct door de spiegelgang naar de troonzaal', nextPage: 7, skillBonus: '+15 Snelheid', icon: '⚡' },
      { label: 'Neem de schoonmaakformule van natuurazijn en aloë vera mee', nextPage: 7, skillBonus: '+15 Scheikunde', icon: '🧪' }
    ]
  },
  {
    pageNumber: 7,
    title: 'De Gevaarlijke Stroomversnelling in de Spiegelgang',
    biome: 'Spiegelende Marmeren Hal met Watergeulen',
    storyText: `In de gang naar de troonzaal was een waterleiding gebarsten. Een wilde stroomversnelling kolkte door de marmeren bogen. Op een klein rotsblokje in het midden zat een jonge **leeuwenwelp** (Simba) afgesneden van het droge pad!

Ridheya aarzelde geen seconde. Ze bond een stevig veiligheidstouw om haar middel. "Hemali, houd het ankerpunt vast met je toverkracht!" riep ze dapper. Ridheya waadde door het schuimende water, tilde Simba liefdevol op en bracht hem veilig in Hemali’s armen. Samen waren de zussen onoverwinnelijk!`,
    targetWords: [
      {
        word: 'stroomversnelling',
        breakdown: 'stroom + versnelling',
        dutchMeaning: 'een plek waar water ineens heel snel en wild stroomt over stenen.',
        englishMeaning: 'Rapids / water torrent'
      },
      {
        word: 'onoverwinnelijk',
        breakdown: 'on + overwinnelijk',
        dutchMeaning: 'zo sterk en eensgezind dat niemand je kan verslaan.',
        englishMeaning: 'Invincible'
      },
      {
        word: 'veiligheidstouw',
        breakdown: 'veiligheid + s + touw',
        dutchMeaning: 'een oersterk touw om redders te beveiligen tegen wegzakken of verdrinking.',
        englishMeaning: 'Safety rope'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🦁 Dappere Redding #7',
      question: 'Hoe redt Ridheya leeuwenwelp Simba uit de stroomversnelling?',
      options: [
        'Ze wacht tot het water vanzelf opdroogt',
        'Ze bindt een veiligheidstouw om en waadt moedig door het water terwijl Hemali het anker vasthoudt',
        'Ze gooit een banaan naar de welp',
        'Ze belt een helikopter'
      ],
      correctIndex: 1,
      explanation: 'Met het veiligheidstouw en Hemali’s ankersteun redt Ridheya de welp veilig uit de stroom.'
    },
    choices: [
      { label: 'Draai het hoofdafsluitventiel van de waterleiding dicht', nextPage: 8, skillBonus: '+15 Techniek', icon: '🔧' },
      { label: 'Vervoer Simba en Nube veilig in de bagagekar naar de troonzaal', nextPage: 8, skillBonus: '+15 Karavaanleiding', icon: '🛒' }
    ]
  },
  {
    pageNumber: 8,
    title: 'De Mechanische Zon van de Troonzaal',
    biome: 'Grote Koepelzaal van Kristal & Goud',
    storyText: `In de gigantische troonzaal hing een schitterende **mechanische zon**. Binnenin deze gouden koepel pulseerde het reusachtige hydro-magnetische kristal. Er zat echter een dikke laag witte kalksteen omheen, waardoor de stralen dof werden.

Hemali bestudeerde de **bedieningshendels**. Er waren drie hefbomen met Latijnse inscripties: *Aqua (Water)*, *Ventus (Wind)* en *Lux (Licht)*. Ridheya overhandigde het flesje met haar zuiverende kruidenmengsel. "Als we het mengsel in de stoomopening gieten en hefboom Lux overhalen, lost de kalk op!" concludeerde Hemali.`,
    targetWords: [
      {
        word: 'bedieningshendels',
        breakdown: 'bediening + s + hendels',
        dutchMeaning: 'handvatten waarmee je grote machines of kranen in werking stelt.',
        englishMeaning: 'Control levers'
      },
      {
        word: 'mechanische',
        dutchMeaning: 'werkend met behulp van raderen, assen en motoren in plaats van spierkracht.',
        englishMeaning: 'Mechanical'
      },
      {
        word: 'zuiverende',
        breakdown: 'zuiver + ende',
        dutchMeaning: 'schoonmakend en vuil verwijderend.',
        englishMeaning: 'Purifying / cleansing'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🧠 Logische Oplossing #8',
      question: 'Wat is het plan van de zussen om het kristal van de mechanische zon te reinigen?',
      options: [
        'Met een hamer op het glas slaan',
        'Het zuiverende kruidenmengsel in de stoomopening gieten en de juiste hefboom bedienen',
        'Wachten tot de zon ondergaat',
        'Het kasteel verlaten'
      ],
      correctIndex: 1,
      explanation: 'Door het mengsel in de stoomopening te gieten en hendel Lux over te halen, lost de kalksteen veilig op.'
    },
    choices: [
      { label: 'Giet het mengsel in de trechter en haal gezamenlijk hendel Lux over', nextPage: 9, skillBonus: '+20 Teamwork', icon: '✨' },
      { label: 'Laat Raja de olifant en de dieren getuige zijn van de herstart', nextPage: 9, skillBonus: '+20 Harmonie', icon: '🐘' }
    ]
  },
  {
    pageNumber: 9,
    title: 'De Hergeboorte van het Zwevende Paradijs',
    biome: 'Stralende Kristalkoepel',
    storyText: `Met een zacht sissend geluid stroomde de hete kruidenstoom door de leidingen. De kalksteen loste binnen seconden op. Het grote kristal schoot vol fel azuurblauw en goud licht! 

Een warme schokgolf van energie trok door het hele kasteel. Het eiland veerde met een majestueuze zucht tien meter omhoog in de lucht. De fonteinen begonnen weer melodieus te klateren en overal in de tuinen openden zeldzame bloemen hun knoppen. Alle geredde dieren slaakten een kreet van vreugde!`,
    targetWords: [
      {
        word: 'paradijs',
        dutchMeaning: 'een volmaakt mooie, vredige en gelukkige plek op aarde.',
        englishMeaning: 'Paradise'
      },
      {
        word: 'schokgolf',
        breakdown: 'schok + golf',
        dutchMeaning: 'een plotselinge, krachtige golf van energie die zich door de ruimte verspreidt.',
        englishMeaning: 'Shockwave / wave of energy'
      },
      {
        word: 'melodieus',
        dutchMeaning: 'heel mooi en muzikaal klinkend als een liedje.',
        englishMeaning: 'Melodious / musical'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🌟 Gevolg & Resultaat #9',
      question: 'Wat gebeurt er met het eiland zodra het kristal weer volop straalt?',
      options: [
        'Het eiland stort in zee',
        'Het eiland veert majestueus omhoog, de fonteinen klateren weer en de bloemen bloeien',
        'Alle dieren lopen weg naar het strand',
        'Het begint te sneeuwen'
      ],
      correctIndex: 1,
      explanation: 'De zweefkracht is volledig hersteld, waardoor het eiland opveert en het hele paradijs tot bloei komt.'
    },
    choices: [
      { label: 'Installeer een permanent monitoringsysteem voor het kristal', nextPage: 10, skillBonus: '+15 Ingenieurskunst', icon: '🖥️' },
      { label: 'Keer terug naar het dek van het onderzoeksschip voor het zeebanket', nextPage: 10, skillBonus: '+15 Feestelijkheid', icon: '🚢' }
    ]
  },
  {
    pageNumber: 10,
    title: 'Het Eerbetoon van de Eilandbewoners',
    biome: 'Grote Marmeren Balustrade boven de Oceaan',
    storyText: `Op het brede terras boven de oceaan verzamelden alle dieren zich rondom Hemali en Ridheya. Wolkenpantertje Nube liep trots zonder manken rond, Simba de leeuwenwelp speelde met Kopi in het gras, en de zilveren zeereiger vloog sierlijke ere-saluutschoten door de lucht.

De sprekende olifant Raja boog zijn slurf: *“Door jullie onbaatzuchtige liefde en wetenschappelijke scherpzinnigheid is ons thuis gered. Gij zult voor altijd de Beschermvrouwen van de Nevelzee heten.”*`,
    targetWords: [
      {
        word: 'onbaatzuchtig',
        breakdown: 'on + baat + zuchtig',
        dutchMeaning: 'anderen helpen zonder er zelf voordeel of geld voor terug te vragen.',
        englishMeaning: 'Unselfish / selfless'
      },
      {
        word: 'beschermvrouwen',
        breakdown: 'bescherm + vrouwen',
        dutchMeaning: 'dappere vrouwelijke behoeders en bewakers van een rijk of gemeenschap.',
        englishMeaning: 'Protectors / patronesses'
      },
      {
        word: 'saluutschoten',
        breakdown: 'saluut + schoten',
        dutchMeaning: 'feestelijke eerbetonen ter verwelkoming van helden.',
        englishMeaning: 'Salute rounds / honorary fly-pasts'
      }
    ],
    mysteryQuestion: {
      clueTitle: '👑 Woordbetekenis #10',
      question: 'Wat betekent het woord "onbaatzuchtig" in de toespraak van Raja?',
      options: [
        'Heel gierig en gemeen zijn',
        'Anderen helpen uit pure goedheid zonder er zelf beloning voor te eisen',
        'Bang zijn voor water',
        'Geen schoenen dragen'
      ],
      correctIndex: 1,
      explanation: 'Onbaatzuchtig betekent dat je puur uit mededogen handelt zonder eigenbelang.'
    },
    choices: [
      { label: 'Plant een gouden vriendschapsboom op het centrale plein', nextPage: 11, skillBonus: '+20 Eeuwige Herinnering', icon: '🌳' },
      { label: 'Schrijf het gezamenlijke expeditielogboek compleet', nextPage: 11, skillBonus: '+20 Documentatie', icon: '📖' }
    ]
  },
  {
    pageNumber: 11,
    title: 'Het Gezamenlijke Zussen-Logboek',
    biome: 'Kapiteinshut op het Onderzoeksschip',
    storyText: `In de gezellige kajuit van het onderzoeksschip bogen Hemali en Ridheya zich over het grote perkamenten logboek. Ridheya tekende prachtige illustraties van alle geredde dieren en voegde instructies toe voor de wonderzalf.

Hemali formuleerde de wetenschappelijke conclusies met scherpe signaalwoorden van tegenstelling, oorzaak en voorwaarde. *“Samen vullen we elkaar perfect aan,”* zei Hemali met een glimlach. Ridheya knikte enthousiast: *“Jouw logica en mijn dierenkennis maken ons onverslaanbaar!”*`,
    targetWords: [
      {
        word: 'kajuit',
        dutchMeaning: 'een gezellige woon- of slaapkamer aan boord van een schip.',
        englishMeaning: 'Ship’s cabin'
      },
      {
        word: 'illustraties',
        dutchMeaning: 'mooie en verhelderende tekeningen bij een tekst.',
        englishMeaning: 'Illustrations / drawings'
      },
      {
        word: 'onverslaanbaar',
        breakdown: 'on + verslaan + baar',
        dutchMeaning: 'zo goed en sterk samen dat niemand van jullie kan winnen.',
        englishMeaning: 'Unbeatable'
      }
    ],
    mysteryQuestion: {
      clueTitle: '📖 Cito Kernboodschap #11',
      question: 'Wat is de kracht van de samenwerking tussen de twee zussen in het logboek?',
      options: [
        'Ze laten iemand anders het werk doen',
        'Ze combineren Ridheya’s praktische medische dierenkennis met Hemali’s scherpe wetenschappelijke logica',
        'Ze gebruiken alleen maar potloden',
        'Ze schrijven alleen in geheimschrift'
      ],
      correctIndex: 1,
      explanation: 'Het samensmelten van Ridheya’s dierenzorg en illustraties met Hemali’s logische taalvaardigheid maakt hen een topteam.'
    },
    choices: [
      { label: 'Voltooi de 12-delige Campagne & Ontvang de Koninklijke Zussenorde', nextPage: 12, skillBonus: '+25 Hoogste Eer', icon: '👑' }
    ]
  },
  {
    pageNumber: 12,
    title: 'De Koninklijke Orde der Zusterschap',
    biome: 'Zonsondergang boven de Nevelzee',
    storyText: `Onder een hemel vol paarse en gouden wolken reikten Hemali en Ridheya elkaar de hand. Het onderzoeksschip voer rustig door het kalme water, vergezeld door spelende dolfijnen.

Aan hun halzen glansden de medailles van de Koninklijke Orde der Zusterschap. Ze hadden niet alleen het zwevende paradijs gered en tientallen dieren genezen, maar ook bewezen dat liefde, nieuwsgierigheid en leergierigheid de mooiste avonturen opleveren. Met een glimlach keken ze uit over de horizon: klaar voor elke nieuwe test en elk nieuw verhaal!`,
    targetWords: [
      {
        word: 'zusterschap',
        breakdown: 'zuster + schap',
        dutchMeaning: 'de hechte, onbreekbare vriendschapsband tussen zussen.',
        englishMeaning: 'Sisterhood'
      },
      {
        word: 'leergierigheid',
        breakdown: 'leer + gierig + heid',
        dutchMeaning: 'het enthousiaste verlangen om steeds nieuwe dingen te ontdekken en te leren.',
        englishMeaning: 'Eagerness to learn / curiosity'
      },
      {
        word: 'medailles',
        dutchMeaning: 'metalen eretekens die worden uitgereikt als beloning voor heldendaden.',
        englishMeaning: 'Medals / awards'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🏆 Grote Eindtoets #12',
      question: 'Wat is de blijvende les van deze 12-delige gezamenlijke expeditie?',
      options: [
        'Dat je nooit naar zwevende eilanden moet varen',
        'Dat zusterschap, leergierigheid, medische zorg en taalvaardigheid samen elke uitdaging overwinnen',
        'Dat schepen altijd rechtdoor varen',
        'Dat dolfijnen niet van muziek houden'
      ],
      correctIndex: 1,
      explanation: 'De expeditie bewijst dat hechte zusterschap gekoppeld aan leergierigheid en zorg alle obstakels overwint.'
    },
    choices: [
      { label: 'Voltooi de Campagne & Sla je Zussencertificaat op in het Dashboard', nextPage: 1, skillBonus: '🌟 Koninklijk Cito Zussen Diploma!', icon: '🎓' }
    ]
  }
];
