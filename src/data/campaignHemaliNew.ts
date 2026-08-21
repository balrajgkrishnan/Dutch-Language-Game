import { RpgPage } from './citoRpgData';

export const HEMALI_CRYSTAL_CAVERN_CAMPAIGN: RpgPage[] = [
  {
    pageNumber: 1,
    title: 'De Fluisterende Kristalgrotten van Mulu',
    biome: 'Ondergrondse Kristalkathedraal in Sarawak',
    storyText: `Hemali streek haar diepblauwe magiërsgewaad glad terwijl haar saffieren toverstaf een zacht indigo schijnsel wierp over de ontzagwekkende gewelven van Sarawak. Haar lange, sluike donkere haren wapperden licht in de koele luchtstroom en haar warme bruine ogen speurden scherpzinnig langs de duizenden glinsterende stalagmieten. Naast haar stapte de wijze olifant Raja geruisloos over de marmeren kalkstenen bodem.

Op een massieve kristalwand stond een eeuwenoude runeninscriptie gebeiteld: *'Slechts wie de tegenstelling tussen schijn en wezen doorziet, zal de weg naar de centrale **resonantiekamer** vinden. **Desondanks** dwalen velen omdat zij zich laten verblinden door het uiterlijke schijnsel.'*

Hemali glimlachte schrander en sloeg haar met goud afgezette toverboek open. "Het signaalwoord *desondanks* markeert hier een cruciale tegenstelling," legde ze uit aan Raja. "Het waarschuwt ons dat visuele pracht geen garantie is voor de juiste koers."`,
    targetWords: [
      {
        word: 'resonantiekamer',
        breakdown: 'resonantie + kamer',
        dutchMeaning: 'een speciaal gevormde akoestische ruimte waarin klanktrillingen en magische frequenties zuiver worden versterkt.',
        englishMeaning: 'Resonance chamber'
      },
      {
        word: 'desondanks',
        dutchMeaning: 'signaalwoord van tegenstelling: toch, ondanks het voorafgaande (synoniem: desalniettemin).',
        englishMeaning: 'Nevertheless / despite that'
      },
      {
        word: 'schrander',
        dutchMeaning: 'buitengewoon scherpzinnig, pienter en snel van begrip bij het oplossen van moeilijke kwesties.',
        englishMeaning: 'Astute / clever / discerning'
      }
    ],
    mysteryQuestion: {
      clueTitle: '📜 Cito Signaalwoorden #1',
      question: 'Welke tekstuele functie vervult het woord "Desondanks" in de inscriptie op de kristalwand?',
      options: [
        'Het geeft een chronologische volgorde in de tijd aan',
        'Het introduceert een tegenstelling: ondanks de waarschuwing maken velen toch de denkfout',
        'Het legt uit waar de kristallen scheikundig uit bestaan',
        'Het fungeert als samenvatting van de hele tekst'
      ],
      correctIndex: 1,
      explanation: '"Desondanks" is een signaalwoord van tegenstelling dat benadrukt dat men ondanks de les toch kan verdwalen.'
    },
    choices: [
      { label: 'Stem de saffieren toverstaf af op de 432Hz grondfrequentie van de kristallen', nextPage: 2, skillBonus: '+15 Geluidsleer', icon: '💎' },
      { label: 'Vraag wijze Raja om met zijn slurf de diepe harmonische resonantietoon aan te slaan', nextPage: 2, skillBonus: '+15 Akoestiek', icon: '🐘' }
    ]
  },
  {
    pageNumber: 2,
    title: 'Het Geometrische Runenlabyrint van Hexagonen',
    biome: 'Geometrische Zaal der Zeshoeken',
    storyText: `De massieve kristalwand schoof met een harmonieuze klank opzij. Voor Hemali en Raja ontvouwde zich een duizelingwekkend labyrint van zwevende **hexagonale** platforms die boven een diepe kloof hingen. Elk platform droeg een logische premisse over oorzaak en gevolg.

**Aangezien** de magnetische velden elke zestig seconden van polariteit wisselden, moest Hemali de sprongen uiterst behoedzaam en wiskundig exact berekenen. **Daardoor** dat zij haar telekinesische spreuk feilloos synchroniseerde met het zwaartepunt van het platform, zweefden zij en Raja moeiteloos van zeshoek naar zeshoek zonder de afgrond te naderen.

"Kijk Raja," wees Hemali naar de runen onder haar voeten. "De zeshoek is de meest efficiënte geometrische vorm in zowel de kristalchemie als de woudbiologie van bijenraten!"`,
    targetWords: [
      {
        word: 'hexagonale',
        breakdown: 'hexagon + ale',
        dutchMeaning: 'zeshoekig van vorm, bestaande uit zes gelijke rechte zijden en hoeken van 120 graden.',
        englishMeaning: 'Hexagonal / six-sided'
      },
      {
        word: 'aangezien',
        dutchMeaning: 'onderschikkend voegwoord dat een reden of motief aangeeft (synoniem: omdat, daar).',
        englishMeaning: 'Since / seeing that'
      },
      {
        word: 'daardoor',
        dutchMeaning: 'signaalwoord van gevolg of causaliteit: als direct resultaat van wat er gebeurde.',
        englishMeaning: 'Therefore / as a result'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🧠 Cito Causaliteit & Redengeving #2',
      question: 'Welk tekstueel verband legt het voegwoord "Aangezien" in de tweede alinea?',
      options: [
        'Het somt drie verschillende toverspreuken op',
        'Het verklaart de reden waarom Hemali haar sprongen heel nauwkeurig en wiskundig moest timen',
        'Het drukt een twijfel of ontkenning uit',
        'Het geeft het einde van het verhaal aan'
      ],
      correctIndex: 1,
      explanation: '"Aangezien" is een redengevend signaalwoord: de polariteitswisseling is de reden voor de precieze berekening.'
    },
    choices: [
      { label: 'Teleporteer direct naar het centrale altaar van het Vloeibare Kwarts', nextPage: 3, skillBonus: '+15 Teleportatie', icon: '✨' },
      { label: 'Bestudeer de sterrenpatronen in de gewelven met je astrometrische kwadrant', nextPage: 3, skillBonus: '+15 Astrometrie', icon: '📐' }
    ]
  },
  {
    pageNumber: 3,
    title: 'Het Vloeibare Kwarts & Het Ethische Vraagstuk',
    biome: 'Het Sanctuarium van de Kwartsbron',
    storyText: `In het hart van het sanctuarium zweefde een reusachtige bol van vloeibaar kwarts die een warm, goudgroen licht uitstraalde. Binnenin rustte de legendarische *Smaragden Wijsheidssleutel*.

Om de bol te openen, verscheen een formele inscriptie van de Oude Bewaarders: *'De poort zal zich slechts ontsluiten, **mits** de magiër aantoont dat theoretisch intellect en ethisch handelen onlosmakelijk met elkaar verbonden zijn. **Tenzij** men bereid is kennis in te zetten voor het welzijn van allen, blijft de sleutel ontoegankelijk.'*

Hemali aarzelde geen moment. Met haar veer schreef ze op het magische membraan: *"Wetenschap zonder mededogen is leeg; ware wijsheid dient het behoud van de natuur en de bescherming van de weerlozen."* Haar stelling klopte tot in de perfectie: het vloeibare kwarts week langzaam uiteen.`,
    targetWords: [
      {
        word: 'mits',
        dutchMeaning: 'signaalwoord van strikte voorwaarde: alleen onder het beding dat (synoniem: op voorwaarde dat).',
        englishMeaning: 'Provided that / on condition that'
      },
      {
        word: 'tenzij',
        dutchMeaning: 'signaalwoord van ontkennende voorwaarde: behalve in het geval dat (synoniem: als niet).',
        englishMeaning: 'Unless / except if'
      },
      {
        word: 'mededogen',
        breakdown: 'mede + dogen',
        dutchMeaning: 'oprechte sympathie, barmhartigheid en diep medeleven met het lijden van anderen.',
        englishMeaning: 'Compassion / empathy'
      }
    ],
    mysteryQuestion: {
      clueTitle: '⚖️ Cito Logische Voorwaarden #3',
      question: 'Wat is de betekenis van de signaalwoorden "mits" en "tenzij" in de inscriptie van de Oude Bewaarders?',
      options: [
        'Ze geven beide een tijdsbepaling in het verleden aan',
        '"Mits" stelt een noodzakelijke voorwaarde (alleen als), terwijl "tenzij" de uitzondering of uitsluiting aangeeft (behalve als)',
        'Ze duiden op een vrolijke groet',
        'Ze beschrijven de kleur van het kwarts'
      ],
      correctIndex: 1,
      explanation: '"Mits" stelt een positieve voorwaarde, "tenzij" een negatieve uitsluitingsvoorwaarde.'
    },
    choices: [
      { label: 'Plaats de Smaragden Wijsheidssleutel in het centrale tijdsaltaar', nextPage: 4, skillBonus: '+20 Hermeneutiek', icon: '🗝️' },
      { label: 'Deel de magische energie van de kwartsbron met Raja\'s helende aura', nextPage: 4, skillBonus: '+20 Aura-expansie', icon: '🐘' }
    ]
  },
  {
    pageNumber: 4,
    title: 'De Geheime Spoorzoekerskamers van de Onderwereld',
    biome: 'Ondergrondse Magmarivier & Basaltkloof',
    storyText: `Het pad daalde verder af naar een ondergrondse basaltkloof waar een fonkelende stroom van vloeibaar licht langs de rotswanden gleed. Hier ontdekten Hemali en Raja een verzwakte grottrol die bekneld zat onder een gevallen zuil van obsidiaan.

Raja zette zijn krachtige schouder tegen de steenkolos, terwijl Hemali een verminderingsspreuk uitsprak om het soortelijk gewicht van de rots tijdelijk te verlagen. **Dankzij** deze naadloze samenwerking gleed het zware gesteente zonder schokken opzij.

De geredde trol boog dankbaar en overhandigde Hemali een zeldzame **perkamentrol** met geografische kaarten van de diepste aardspleten. "De chronokristallen in de troonzaal verliezen hun stabiliteit," waarschuwde hij met hese stem. "Jullie intellectuele interventie is dringend vereist!"`,
    targetWords: [
      {
        word: 'dankzij',
        dutchMeaning: 'voorzetsel/signaalwoord dat een gunstige of helpende oorzaak aangeeft (door de goede hulp van).',
        englishMeaning: 'Thanks to'
      },
      {
        word: 'interventie',
        dutchMeaning: 'een actieve, doelgerichte tussenkomst om een hachelijke situatie te corrigeren of te verbeteren.',
        englishMeaning: 'Intervention'
      },
      {
        word: 'perkamentrol',
        breakdown: 'perkament + rol',
        dutchMeaning: 'een opgerold blad van fijn bewerkt materiaal waarop historische teksten en kaarten zijn genoteerd.',
        englishMeaning: 'Parchment scroll'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🗺️ Oorzaak & Gevolg Analyse #4',
      question: 'Waarom kon de zware obsidiaanzuil veilig worden verwijderd volgens de tekst?',
      options: [
        'Omdat de grot begon in te storten',
        'Dankzij de combinatie van Raja\'s fysieke kracht en Hemali\'s zwaartekrachtverminderende spreuk',
        'Omdat de trol heel hard begon te roepen',
        'Omdat het gesteente vanzelf wegvloog'
      ],
      correctIndex: 1,
      explanation: 'De tekst legt met "Dankzij" uit dat de samenwerking tussen fysieke steun en magische wetenschap het succes bracht.'
    },
    choices: [
      { label: 'Gebruik de perkamentrol om de snelste route naar de Kernzaal te navigeren', nextPage: 5, skillBonus: '+20 Cartografie', icon: '📜' },
      { label: 'Genees de schrammen van de trol met een zalf van amethiststof', nextPage: 5, skillBonus: '+20 Empathie', icon: '💜' }
    ]
  },
  {
    pageNumber: 5,
    title: 'De Stabilisatie van de Chrono-Resonantie',
    biome: 'De Centrale Troonzaal van de Tijdskristallen',
    storyText: `In de gigantische troonzaal trilde een reusachtige zuil van zuiver paars amethist op gevaarlijk hoge frequentie. Fijn kristalstof dwarrelde door de lucht en de aarde daverde onder hun voeten. 

Hemali analyseerde direct de golfpatronen in haar magische **observatoriumlens**. "De resonantie is asynchroon geworden," stelde ze vast. "Als we de frequentie niet dempen met een tegengestelde harmonische golf, zal het hele grottenstelsel imploderen."

Zij en Raja stelden zich aan weerszijden van de zuil op. Hemali zong een zuivere tegentoon terwijl Raja met zijn slurf een diepe baspuls genereerde. Langzaam maar zeker stabiliseerden de trillingen; het wilde gekraak verstomde en maakte plaats voor een rustgevend, goudviolet schijnsel dat de hele kathedraal vulde met warmte.`,
    targetWords: [
      {
        word: 'observatoriumlens',
        breakdown: 'observatorium + lens',
        dutchMeaning: 'een optisch instrument van geslepen kwarts om natuurverschijnselen en magische energiebanen nauwkeurig te analyseren.',
        englishMeaning: 'Observatory lens'
      },
      {
        word: 'asynchroon',
        breakdown: 'a + synchroon',
        dutchMeaning: 'niet tegelijkertijd of niet in hetzelfde ritme lopend; uit de pas met het basistempo.',
        englishMeaning: 'Asynchronous / out of sync'
      },
      {
        word: 'imploderen',
        dutchMeaning: 'door grote druk van buitenaf met geweld naar binnen toe ineenstorten (het tegenovergestelde van exploderen).',
        englishMeaning: 'To implode'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🔬 Didactische Synthese #5',
      question: 'Hoe slaagden Hemali en Raja erin om de dreigende catastrofe in de troonzaal af te wenden?',
      options: [
        'Door heel hard weg te rennen uit de grotten',
        'Door de asynchrone trillingen te neutraliseren met een tegengestelde harmonische geluidsgolf',
        'Door de amethistzuil met dynamiet op te blazen',
        'Door te wachten tot de storm vanzelf ging liggen'
      ],
      correctIndex: 1,
      explanation: 'Hemali paste natuurkundige golfinterferentie toe om de gevaarlijke trillingen te dempen.'
    },
    choices: [
      { label: 'Veranker de gekalmeerde kristalmatrix met een eeuwigheidszegel', nextPage: 6, skillBonus: '+25 Kwantum-Mageia', icon: '🔮' },
      { label: 'Schrijf de wiskundige harmonieformule over in je Cito-meesterboek', nextPage: 6, skillBonus: '+25 Academische Meestergraad', icon: '📖' }
    ]
  },
  {
    pageNumber: 6,
    title: 'De Meestergraad der Elementaire Hermeneutiek',
    biome: 'Bovengrondse Tempeltuin van Mulu bij Zonsopkomst',
    storyText: `Toen Hemali en wijze Raja via de oude tempeltrap weer naar de oppervlakte klommen, brak het eerste ochtendgloren door de nevels van het regenwoud. Boven hen cirkelden neushoornvogels en in de bomen klonk het ochtendconcert van gibbons.

Daar stonden Ridheya, hond Kopi en de Hoge Raad van Wetenschappers al te wachten. De Hoogste Geleerde trad naar voren en overhandigde Hemali het *'Grote Certificaat van Elementaire Hermeneutiek en Tekstuele Deductie'*.

"Jouw vermogen om signaalwoorden te doorgronden, oorzakelijke verbanden te ontleden en complexe ethische premissen op te lossen, heeft onze onderwereld gered," sprak hij plechtig. Hemali omhelsde haar zusje Ridheya en glimlachte met voldoening. Hun gecombineerde talenten — wetenschappelijke deductie en grenzeloze dierenzorg — maakten hen een onoverwinnelijk team!`,
    targetWords: [
      {
        word: 'hermeneutiek',
        dutchMeaning: 'de wetenschap en kunst van het diepgaand interpreteren en verklaren van teksten en symbolen.',
        englishMeaning: 'Hermeneutics / text interpretation'
      },
      {
        word: 'deductie',
        dutchMeaning: 'het afleiden van logische en zekere conclusies uit algemene regels of waargenomen feiten.',
        englishMeaning: 'Deduction / logical inference'
      },
      {
        word: 'onoverwinnelijk',
        breakdown: 'on + overwin + lijk',
        dutchMeaning: 'niet te verslaan; buitengewoon sterk en harmonieus samenwerkend.',
        englishMeaning: 'Invincible'
      }
    ],
    mysteryQuestion: {
      clueTitle: '👑 Cito Eindconclusie #6',
      question: 'Wat is de voornaamste didactische kernboodschap van Hemali\'s odyssee in de Kristalgrotten?',
      options: [
        'Dat kristallen alleen mooi zijn als versiering',
        'Dat diepgaand tekstbegrip, logische deductie en ethische verantwoordelijkheid samen de hoogste vorm van wijsheid vormen',
        'Dat olifanten bang zijn voor grotten',
        'Dat men nooit in boeken moet schrijven'
      ],
      correctIndex: 1,
      explanation: 'Hemali toont aan dat kritisch lezen, logisch redeneren en ethisch handelen tot meesterschap leiden.'
    },
    choices: [
      { label: 'Vier de overwinning samen met Ridheya, Raja en Kopi in de boomhut', nextPage: 1, skillBonus: '👑 Hoogste Cito Meesterschapsbokaal!', icon: '🌟' }
    ]
  }
];

export const HEMALI_TIME_LIBRARY_CAMPAIGN: RpgPage[] = [
  {
    pageNumber: 1,
    title: 'Het Portaal naar de Bibliotheek van Eeuwige Boeken',
    biome: 'Zwevende Sanctum der Kronieken in Alexandrië',
    storyText: `In de gewelfde torenkamers van de Tijdloze Bibliotheek zweefden tienduizenden leren boekbanden zachtjes door de gewichtloze lucht. Hemali liep met vastberaden tred over de spiegelende vloer van lapis lazuli. Haar toverstaf verspreidde een kalmerend violet licht over de torenhoge boekenkasten die reikten tot in de oneindigheid.

Aan het uiteinde van de hoofdvleugel ontdekte ze een monumentale catalogus opengeslagen op een pergamenten standaard. *'Elk historisch document bevat een diepere **hoofdgedachte**. **Hoewel** oppervlakkige lezers slechts naar jaartallen staren, ontdekt de ware detective de onderliggende maatschappelijke motieven.'*

Hemali knikte bedachtzaam. "Het signaalwoord *hoewel* introduceert een concessie of tegenstelling," sprak ze hardop in de gewelven. "Het spoort ons aan om voorbij de feitelijke buitenkant te kijken naar het ware thema van de auteur."`,
    targetWords: [
      {
        word: 'hoofdgedachte',
        breakdown: 'hoofd + gedachte',
        dutchMeaning: 'de belangrijkste uitspraak of kerboodschap die de schrijver over het onderwerp van een tekst wil overbrengen.',
        englishMeaning: 'Main idea / central theme'
      },
      {
        word: 'hoewel',
        dutchMeaning: 'onderschikkend voegwoord van toegeving of tegenstelling (synoniem: ofschoon, alhoewel).',
        englishMeaning: 'Although / even though'
      },
      {
        word: 'monumentale',
        dutchMeaning: 'zeer indrukwekkend, groots en van historisch gewicht en formaat.',
        englishMeaning: 'Monumental'
      }
    ],
    mysteryQuestion: {
      clueTitle: '📚 Cito Hoofdgedachte & Thema #1',
      question: 'Wat leert het signaalwoord "Hoewel" ons in de inscriptie van de catalogus?',
      options: [
        'Het geeft een recept voor inkt',
        'Het stelt een tegenstelling vast: oppervlakkige lezers zien alleen cijfers, maar scherpe lezers zoeken de diepere kerngedachte',
        'Het telt het aantal boeken in de bibliotheek',
        'Het is een groet aan de bibliothecaris'
      ],
      correctIndex: 1,
      explanation: '"Hoewel" wijst op de tegenstelling tussen louter feiten onthouden versus het werkelijk begrijpen van de hoofdgedachte.'
    },
    choices: [
      { label: 'Ontcijfer de magische index van historische causale verbanden', nextPage: 2, skillBonus: '+15 Tekstanalyse', icon: '🔍' },
      { label: 'Vlieg met de zwevende boekenladder naar de hoogste filosofievleugel', nextPage: 2, skillBonus: '+15 Boekmagie', icon: '🪜' }
    ]
  },
  {
    pageNumber: 2,
    title: 'De Boekenwurm van Babylon & De Verwijzingspuzzel',
    biome: 'Het Archief der Oude Kleitabletten',
    storyText: `In de historische afdeling van Babylon kronkelde de reusachtige, maar zachtmoedige **Boekenwurm** Barnaby tussen de stapels rollen. Hij bewaakte een beschadigd document vol raadselachtige **verwijswoorden**.

*'De koningin sprak tot haar raadslieden. **Zij** wees **hen** op het gevaar van de naderende zandstorm. **Deze** dreigde immers **hun** oogst te vernietigen als **men** niet onmiddellijk de dijken sloot.'*

Hemali pakte haar ganzenveer en verbond de lijnen in haar logboek: *Zij* verwees naar de koningin, *hen* en *hun* naar de raadslieden, en *deze* naar de zandstorm. Barnaby zuchtte van bewondering en vouwde zijn fluwelen voelsprieten samen: de grammaticale referentieketting was foutloos hersteld!`,
    targetWords: [
      {
        word: 'verwijswoorden',
        breakdown: 'verwijs + woorden',
        dutchMeaning: 'woorden (zoals zij, hen, deze, die) die verwijzen naar personen, zaken of zinnen die eerder zijn genoemd in de tekst.',
        englishMeaning: 'Reference words / pronouns'
      },
      {
        word: 'grammaticale',
        dutchMeaning: 'betrekking hebbend op de regels van de taal en zinsbouw.',
        englishMeaning: 'Grammatical'
      },
      {
        word: 'referentieketting',
        breakdown: 'referentie + ketting',
        dutchMeaning: 'de aaneenschakeling van voornaamwoorden die naar hetzelfde kernonderwerp in een alinea verwijzen.',
        englishMeaning: 'Co-reference chain'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🔗 Cito Verwijswoorden & Relaties #2',
      question: 'Naar welk zelfstandig naamwoord verwijst het woord "Deze" in de Babylonische tekst?',
      options: [
        'Naar de koningin',
        'Naar de naderende zandstorm',
        'Naar de raadslieden',
        'Naar de dijken'
      ],
      correctIndex: 1,
      explanation: '"Deze" verwijst hier grammaticaal naar het dichtstbijzijnde onderwerp: de naderende zandstorm.'
    },
    choices: [
      { label: 'Repareer de kleitabletten met een stollingsspreuk van vloeibaar goud', nextPage: 3, skillBonus: '+15 Restauratie', icon: '🏺' },
      { label: 'Onderzoek de verborgen kroniek van het Oude Egypte in sectie Delta', nextPage: 3, skillBonus: '+15 Papyrologie', icon: '📜' }
    ]
  },
  {
    pageNumber: 3,
    title: 'De Papyrusrol van Alexandrië & Het Signaalwoordenaltaar',
    biome: 'De Goudomrande Papyruszaal',
    storyText: `In de Papyruszaal rustte de legendarische kroniek van de Bibliotheek van Alexandrië. De tekst was echter aangetast door een magische tijdcorrosie, waardoor alle **signaalwoorden** van argumentatie waren vervaagd.

Hemali bestudeerde de ontbrekende plekken in de tekstconstructie: *'De burgers bouwden een vuurtoren; [1] konden schepen \'s nachts veilig binnenvaren. De koning investeerde fors, [2] het land verkeerde in vrede. [3] bleef men waakzaam voor piraten.'*

Met vaste hand vulde Hemali de exacte academische connectoren in: [1] *zodat* (gevolg), [2] *aangezien* (reden), en [3] *desalniettemin* (tegenstelling). Op dat moment lichtte de papyrusrol op in een schitterend gouden gloed en onthulde de sleutel tot de Tijdkern!`,
    targetWords: [
      {
        word: 'signaalwoorden',
        breakdown: 'signaal + woorden',
        dutchMeaning: 'schakelwoorden die het verband aangeven tussen zinnen of alinea\'s (zoals oorzaak, reden, gevolg, tijd of tegenstelling).',
        englishMeaning: 'Signal words / transition markers'
      },
      {
        word: 'argumentatie',
        dutchMeaning: 'het geheel van argumenten en redenen waarmee een bewering of stelling logisch wordt onderbouwd.',
        englishMeaning: 'Argumentation'
      },
      {
        word: 'desalniettemin',
        dutchMeaning: 'formeel signaalwoord van tegenstelling: ondanks dat alles toch (synoniem: niettemin, desondanks).',
        englishMeaning: 'Nonetheless / nevertheless'
      }
    ],
    mysteryQuestion: {
      clueTitle: '✍️ Cito Connectoren & Zinslogica #3',
      question: 'Welk signaalwoord past het beste op positie [1] om het logische gevolg van de vuurtoren aan te geven?',
      options: [
        'Hoewel',
        'Zodat / waardoor',
        'Noch',
        'Tenzij'
      ],
      correctIndex: 1,
      explanation: '"Zodat" of "waardoor" verbindt de bouw van de vuurtoren met het logische gevolg: het veilig binnenvaren van schepen.'
    },
    choices: [
      { label: 'Activeer de Tijdkern met de herstelde papyrusrol', nextPage: 4, skillBonus: '+20 Chronomantie', icon: '⏳' },
      { label: 'Sla de reconstructie op in het universele lexicon van de bibliotheek', nextPage: 4, skillBonus: '+20 Lexicografie', icon: '📚' }
    ]
  },
  {
    pageNumber: 4,
    title: 'De Geheime Vleugel der Verloren Paradigmen',
    biome: 'Gewichtloze Spiraalkamer in het Tijdcontinuüm',
    storyText: `De Tijdkern opende een poort naar de gewichtloze Spiraalkamer. Hier zweefden historische manuscripten rond in eeuwige banen. Eén bijzonder perkament trok Hemali\'s aandacht: een verhandeling over **oorzaak en gevolg** bij de grote wereldontdekkingen.

De tekst luidde: *'De uitvinding van het kompas leidde tot nauwkeurigere navigatie op open zee. **Dientengevolge** breidden handelsroutes zich exponentieel uit. **Echter**, deze expansie bracht ook ecologische veranderingen met zich mee.'*

Hemali analyseerde de structuur: het eerste signaalwoord (*Dientengevolge*) markeerde een direct gevolg, terwijl het tweede (*Echter*) een kritische nuancering en tegenstelling toevoegde. Haar scherpe analytische geest ontrafelde het complete causale netwerk in luttele seconden.`,
    targetWords: [
      {
        word: 'dientengevolge',
        breakdown: 'diente + n + gevolge',
        dutchMeaning: 'formeel signaalwoord van gevolg: als uitvloeisel of direct resultaat daarvan.',
        englishMeaning: 'Consequently / as a result'
      },
      {
        word: 'expansie',
        dutchMeaning: 'de uitbreiding of vergroting van grondgebied, invloed, handel of volume.',
        englishMeaning: 'Expansion'
      },
      {
        word: 'nuancering',
        dutchMeaning: 'het aanbrengen van verfijnde details of kleine verschillen om een oordeel minder zwart-wit te maken.',
        englishMeaning: 'Nuance / refinement'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🧠 Cito Causaliteit & Tegenstelling #4',
      question: 'Welk tekstueel effect bereikt de auteur door het gebruik van "Echter" na "Dientengevolge"?',
      options: [
        'De auteur stopt met schrijven',
        'De auteur nuanceert het positieve gevolg door een belangrijk keerzijde of tegenargument aan te stippen',
        'De auteur herhaalt precies dezelfde zin nogmaals',
        'De auteur legt uit hoe een kompas werkt'
      ],
      correctIndex: 1,
      explanation: '"Echter" brengt een tegenstelling/nuance aan: ondanks de voordelen waren er ook ecologische gevolgen.'
    },
    choices: [
      { label: 'Integreer de causale cirkeldiagrammen in je magische toverboek', nextPage: 5, skillBonus: '+20 Grafische Data-analyse', icon: '📊' },
      { label: 'Herstel de gravitationele balans van de Spiraalkamer met je toverstaf', nextPage: 5, skillBonus: '+20 Ruimtemagie', icon: '🌌' }
    ]
  },
  {
    pageNumber: 5,
    title: 'Het Eindexamen van de Hoogste Chrono-Curator',
    biome: 'Het Opperste Heiligdom van de Tijdloze Wijsheid',
    storyText: `In het hoogste gewelf verscheen de Hoogste Chrono-Curator, een majestueuze verschijning van puur sterrenlicht. Hij presenteerde Hemali de ultieme uitdaging: een complex betoog over de wisselwerking tussen cultuur, taal en techniek.

*'Een taal is geen statisch monument, **maar** een levend organisme dat voortdurend evolueert. **Enerzijds** behoudt zij historische wortels; **anderzijds** adopteert zij nieuwe termen voor moderne innovaties. **Kortom**, taal weerspiegelt de dynamiek van het menselijk denken.'*

Hemali formuleerde direct de synthese: *"De stelling gebruikt een nevenschikkende tegenstelling, gevolgd door een vergelijkende balans (*enerzijds/anderzijds*) en mondt uit in een samenvattende conclusie (*Kortom*) die de hoofdgedachte kernachtig weergeeft."* De Curator boog met diep respect voor haar ongeëvenaarde inzicht.`,
    targetWords: [
      {
        word: 'enerzijds',
        dutchMeaning: 'signaalwoord dat het eerste aspect van een vergelijking of tweeledige situatie introduceert (aan de ene kant).',
        englishMeaning: 'On the one hand'
      },
      {
        word: 'anderzijds',
        dutchMeaning: 'signaalwoord dat de keerzijde of het complementaire deel van een vergelijking aangeeft (aan de andere kant).',
        englishMeaning: 'On the other hand'
      },
      {
        word: 'kortom',
        dutchMeaning: 'signaalwoord van samenvatting: om het in weinig woorden krachtig samen te vatten.',
        englishMeaning: 'In short / in summary'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🎓 Cito Samenvatting & Structuur #5',
      question: 'Wat is de tekstuele functie van het signaalwoord "Kortom" aan het slot van het betoog?',
      options: [
        'Het geeft aan dat het verhaal te kort is',
        'Het leidt de samenvattende hoofdconclusie in die de kernboodschap bondig herhaalt',
        'Het stelt een moeilijke rekenopgave',
        'Het vraagt om stilte in de bibliotheek'
      ],
      correctIndex: 1,
      explanation: '"Kortom" is het klassieke Cito-signaalwoord voor een samenvatting en de kernachtige hoofdgedachte.'
    },
    choices: [
      { label: 'Ontvang het Opperste Zegel van Chrono-Filologie uit handen van de Curator', nextPage: 6, skillBonus: '+25 Hermeneutisch Meesterschap', icon: '📜' },
      { label: 'Plaats alle gerestaureerde boeken terug in de Eeuwige Catalogus', nextPage: 6, skillBonus: '+25 Kosmische Orde', icon: '✨' }
    ]
  },
  {
    pageNumber: 6,
    title: 'De Triomf van de Meester-Filologe',
    biome: 'De Grote Zaal van Kennis bij Zonsondergang',
    storyText: `Onder luid applaus van alle historische geleerden, boekenwurmen en wachters trad Hemali door het portaal terug naar haar eigen wereld. Haar toverboek straalde met een warme gouden gloed waarin alle literaire, Cito- en Doorstroomtoetsvaardigheden voorgoed waren vastgelegd.

Ridheya vloog haar zusje om de hals en toonde trots haar eigen oorkonde van de koraalredding. Ook wijze olifant Raja en hond Kopi kwamen vrolijk aangerend om het grote succes te vieren.

Hemali zette haar toverstaf even neer, keek naar haar familie en wist dat echte kennis niet alleen bedoeld is voor examens, maar om de wereld om ons heen te begrijpen, beschermen en mooier te maken. De Bibliotheek van Tijd was gered, en de toekomst lag wijd open voor nieuwe ontdekkingen!`,
    targetWords: [
      {
        word: 'filologe',
        dutchMeaning: 'een taalkundige wetenschapper die taal- en letterkunde van historische teksten diepgaand bestudeert.',
        englishMeaning: 'Philologist / linguist'
      },
      {
        word: 'literair',
        dutchMeaning: 'betrekking hebbend op de schrijfkunst, boeken en hoogwaardige teksten.',
        englishMeaning: 'Literary'
      },
      {
        word: 'doorstroomtoetsvaardigheden',
        breakdown: 'doorstroom + toets + vaardigheden',
        dutchMeaning: 'de competenties in begrijpend lezen, redeneren en woordenschat die nodig zijn voor de landelijke eindtoets in groep 8.',
        englishMeaning: 'National end-of-primary school exam skills'
      }
    ],
    mysteryQuestion: {
      clueTitle: '👑 Cito Eindoordeel #6',
      question: 'Wat is de overkoepelende hoofdgedachte van Hemali\'s prestaties in de Tijdloze Bibliotheek?',
      options: [
        'Dat oude boeken te veel stof verzamelen',
        'Dat een grondige beheersing van signaalwoorden, verwijsrelaties en tekststructuren de sleutel is tot waarachtig tekstbegrip en academisch meesterschap',
        'Dat toverspreuken altijd belangrijker zijn dan grammatica',
        'Dat bibliotheken \'s avonds gesloten moeten zijn'
      ],
      correctIndex: 1,
      explanation: 'Het beheersen van signaalwoorden, logische verbanden en tekstbegrip stelt de lezer in staat elke complexe tekst te doorgronden.'
    },
    choices: [
      { label: 'Vier het grote familiefeest met vers kokoswater en vers fruit in de boomhut', nextPage: 1, skillBonus: '👑 Koninklijke Cito & Doorstroomtoets Diamanten Trofee!', icon: '🌟' }
    ]
  }
];
