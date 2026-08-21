import { RpgPage } from './citoRpgData';

export const HEMALI_CRYSTAL_CAVERN_CAMPAIGN: RpgPage[] = [
  {
    pageNumber: 1,
    title: 'De Fluisterende Kristalgrotten van Mulu',
    biome: 'Ondergrondse Kristalkathedraal in Sarawak',
    storyText: `Hemali streek haar mantel glad terwijl het saffieren amulet een zacht indigoblauw licht over de gigantische stalagmieten wierp. Naast haar stapte de wijze olifant Raja geruisloos over het zilverglanzende kalksteen. 

Op een massieve kristalwand stond een eeuwenoude inscriptie gegraveerd. *'Slechts wie de tegenstelling tussen schijn en wezen doorziet, zal de weg naar de Centrale resonantiekamer vinden. **Desondanks** dwalen velen omdat zij zich laten verblinden door het uiterlijke schijnsel.'* Hemali glimlachte schrander: het signaalwoord van tegenstelling gaf direct de didactische sleutel prijs.`,
    targetWords: [
      {
        word: 'resonantiekamer',
        breakdown: 'resonantie + kamer',
        dutchMeaning: 'een ruimte waarin geluidsgolven en magische trillingen zuiver worden weerkaatst en versterkt.',
        englishMeaning: 'Resonance chamber'
      },
      {
        word: 'desondanks',
        dutchMeaning: 'toch, alhoewel er een duidelijke tegenstelling of belemmering is.',
        englishMeaning: 'Nevertheless / despite that'
      },
      {
        word: 'stalagmieten',
        dutchMeaning: 'kalksteenpegels die vanaf de grond van een druipsteengrot omhoog groeien.',
        englishMeaning: 'Stalagmites'
      }
    ],
    mysteryQuestion: {
      clueTitle: '📜 Cito Signaalwoorden #1',
      question: 'Wat is de betekenis van "Desondanks" in de inscriptie op de kristalwand?',
      options: [
        'Het geeft een tijdstip aan in de ochtend',
        'Het geeft een tegenstelling aan: ondanks de waarschuwing maken velen toch de fout',
        'Het legt uit waar de kristallen vandaan komen',
        'Het telt het aantal stenen op'
      ],
      correctIndex: 1,
      explanation: '"Desondanks" is een signaalwoord van tegenstelling dat benadrukt dat men ondanks de les toch kan verdwalen.'
    },
    choices: [
      { label: 'Stem de saffieren toverstaf af op de 432Hz klankfrequentie van de kristallen', nextPage: 2, skillBonus: '+15 Geluidsleer', icon: '💎' },
      { label: 'Vraag wijze Raja om met zijn slurf de diepe grondtoon aan te slaan', nextPage: 2, skillBonus: '+15 Resonantie', icon: '🐘' }
    ]
  },
  {
    pageNumber: 2,
    title: 'Het Geometrische Runenlabyrint',
    biome: 'Geometrische Zaal der Zeshoeken',
    storyText: `De kristalwand schoof met een melodieuze trilling open. Voor Hemali en Raja ontvouwde zich een reusachtig labyrint van zwevende hexagonale platforms. Elk platform droeg een logische stelling over oorzaak en gevolg.

**Aangezien** de magnetische velden elke minuut van polariteit wisselden, moest Hemali de sprongen exact berekenen. **Daardoor** dat zij haar teleportatieformule feilloos koppelde aan het zwaartepunt, zweefden zij en Raja moeiteloos van zeshoek naar zeshoek zonder de afgrond te raken.`,
    targetWords: [
      {
        word: 'aangezien',
        dutchMeaning: 'omdat, op grond van het feit dat (geeft een logische reden/oorzaak aan).',
        englishMeaning: 'Since / seeing that'
      },
      {
        word: 'daardoor',
        dutchMeaning: 'als rechtstreeks gevolg van het voorafgaande.',
        englishMeaning: 'Therefore / as a result'
      },
      {
        word: 'hexagonale',
        dutchMeaning: 'zeshoekig van vorm met zes gelijke zijden.',
        englishMeaning: 'Hexagonal'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🧠 Cito Causaliteit #2',
      question: 'Welk logisch verband geeft het woord "Aangezien" aan aan het begin van de tweede alinea?',
      options: [
        'Het geeft een opsomming van drie dieren',
        'Het geeft de reden of oorzaak waarom Hemali haar sprongen heel nauwkeurig moest berekenen',
        'Het duidt een ontkenning aan',
        'Het is een vraagteken'
      ],
      correctIndex: 1,
      explanation: '"Aangezien" is een redengevend voegwoord: het verklaart waarom precieze berekening vereist was.'
    },
    choices: [
      { label: 'Teleporteer naar het centrale altaar van de Vloeibare Kwarts', nextPage: 3, skillBonus: '+15 Teleportatie', icon: '✨' },
      { label: 'Bestudeer de sterrenpatronen in de gewelven met je kwadrant', nextPage: 3, skillBonus: '+15 Astrometrie', icon: '📐' }
    ]
  },
  {
    pageNumber: 3,
    title: 'De Zwevende Kwartsbol & De Verborgen Schat',
    biome: 'Het Hart van de Kwartsbron',
    storyText: `In het centrum van het sanctuarium dreef een bol van vloeibaar kwarts. Binnenin rustte de *Smaragden Wijsheidssleutel*. 

Om de bol te openen verscheen een formele vraagstelling van de Tijdwachters: *'De poort zal slechts ontsluiten, **mits** de ontdekkingsreiziger aantoont dat logisch redeneren en ethisch handelen onlosmakelijk met elkaar verbonden zijn.'* Hemali noteerde in haar toverboek: ware kennis dient altijd het welzijn van de natuur en alle levende wezens.`,
    targetWords: [
      {
        word: 'mits',
        dutchMeaning: 'op voorwaarde dat, alleen indien.',
        englishMeaning: 'Provided that / on condition that'
      },
      {
        word: 'ethisch',
        dutchMeaning: 'betrekking hebbend op wat goed, eerlijk en rechtvaardig is voor iedereen.',
        englishMeaning: 'Ethical / moral'
      },
      {
        word: 'onlosmakelijk',
        breakdown: 'on + los + makelijk',
        dutchMeaning: 'zo hecht aan elkaar vastzittend dat het niet gescheiden kan worden.',
        englishMeaning: 'Inextricably / inseparable'
      }
    ],
    mysteryQuestion: {
      clueTitle: '📖 Cito Voorwaardelijke Zinnen #3',
      question: 'Wat eist het woord "mits" in de tempeltekst?',
      options: [
        'Dat je de sleutel moet stelen',
        'Een bindende voorwaarde: de poort opent alléén als bewezen is dat logica en ethiek samengaan',
        'Dat je zo snel mogelijk moet wegrennen',
        'Dat er geen kwarts meer is'
      ],
      correctIndex: 1,
      explanation: '"Mits" stelt de absolute voorwaarde waaraan voldaan moet worden om de bol te openen.'
    },
    choices: [
      { label: 'Ontvang de Smaragden Wijsheidssleutel met eerbied', nextPage: 4, skillBonus: '+20 Moraal & Wijsheid', icon: '🗝️' },
      { label: 'Laat wijze Raja een trompetstoot van harmonie blazen', nextPage: 4, skillBonus: '+20 Verbondenheid', icon: '🐘' }
    ]
  },
  {
    pageNumber: 4,
    title: 'De Meester-Kroniek van de Kristalgrot',
    biome: 'Verlichte Uitgang met Uitzicht op de Junglevallei',
    storyText: `Met de Smaragden Wijsheidssleutel in haar hand traden Hemali en Raja naar buiten op een hoog bergplateau. De ondergaande zon kleurde de nevelwouden van Borneo in schitterend purper en goud.

Hemali sloeg haar expeditiejournaal open en schreef met haar ganzenveer het slotbetoog: *'Kennis zonder mededogen is leeg, maar rede gecombineerd met empathie opent elke poort.'* Babygiraf Appel en uil Tycho kwamen aangevlogen om de overwinning te vieren. Hemali had haar meesterschap in de Nederlandse taal en Cito-logica wederom glansrijk bewezen!`,
    targetWords: [
      {
        word: 'expeditiejournaal',
        breakdown: 'expeditie + journaal',
        dutchMeaning: 'een gedetailleerd dagboek waarin een onderzoeker alle ontdekkingen en lessen noteert.',
        englishMeaning: 'Expedition journal / logbook'
      },
      {
        word: 'mededogen',
        breakdown: 'mede + dogen',
        dutchMeaning: 'diep medeleven en de oprechte wens om anderen te helpen.',
        englishMeaning: 'Compassion / empathy'
      },
      {
        word: 'glansrijk',
        breakdown: 'glans + rijk',
        dutchMeaning: 'op een buitengewoon schitterende en succesvolle manier.',
        englishMeaning: 'Gloriously / brilliantly'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🏆 Hoofdgedachte & Synthese #4',
      question: 'Wat is de voornaamste hoofdgedachte van Hemali’s tocht door de kristalgrotten?',
      options: [
        'Dat kristallen zwaar zijn om te dragen',
        'Dat scherpe logische taalbeheersing pas echt waardevol is wanneer zij gepaard gaat met empathie en rechtvaardigheid',
        'Dat je beter geen boeken kunt lezen in grotten',
        'Dat olifanten bang zijn voor licht'
      ],
      correctIndex: 1,
      explanation: 'De kernboodschap is de harmonieuze synthese van verstand, taalbeheersing en mededogen.'
    },
    choices: [
      { label: 'Berg de Smaragden Sleutel op in je Academisch Dossier', nextPage: 1, skillBonus: '👑 Meester-Logicus Cito Diploma!', icon: '🎓' }
    ]
  }
];

export const HEMALI_TIME_LIBRARY_CAMPAIGN: RpgPage[] = [
  {
    pageNumber: 1,
    title: 'De Oneindige Tijdsbibliotheek van Chronos',
    biome: 'Grote Zaal der Eeuwige Boekrollen',
    storyText: `Hemali wandelde door de monumentale zuilengang van de Tijdsbibliotheek van Chronos. Miljoenen perkamenten zweefden geruisloos door de ether, aangedreven door tijdskristallen. In haar hand hield zij haar gouden ganzenveer.

Op de centrale lessenaar lag een cryptische waarschuwing: *'De tijdstromen raken verstoord **doordat** onjuiste grammaticale verwijswoorden de historische waarheid vertroebelen. **Tenzij** een schrandere taalkundige de causale ketens herstelt, zullen hele eeuwen in vergetelheid wegzinken.'* Hemali knikte vastberaden: dit was de ultieme uitdaging voor haar Cito-analyseskills.`,
    targetWords: [
      {
        word: 'tijdsbibliotheek',
        breakdown: 'tijds + bibliotheek',
        dutchMeaning: 'een magische bewaarplaats waarin alle geschiedenissen en kennis van alle tijden zijn opgeslagen.',
        englishMeaning: 'Chronos library / time archives'
      },
      {
        word: 'doordat',
        dutchMeaning: 'als gevolg van de omstandigheid dat (voegwoord van oorzaak).',
        englishMeaning: 'Because of / due to the fact that'
      },
      {
        word: 'tenzij',
        dutchMeaning: 'behalve als, in het geval dat niet (beperkende voorwaarde).',
        englishMeaning: 'Unless'
      }
    ],
    mysteryQuestion: {
      clueTitle: '📖 Grammaticale Analyse #1',
      question: 'Welk tekstverband drukt het woord "doordat" uit in de waarschuwingstekst?',
      options: [
        'Een vergelijking tussen twee pennen',
        'De directe oorzaak van de verstoring in de tijdstromen',
        'Een begroeting van een vriend',
        'Een getal op de klok'
      ],
      correctIndex: 1,
      explanation: '"Doordat" geeft de niet-menselijke oorzaak aan waardoor de verstoring optrad.'
    },
    choices: [
      { label: 'Activeer het saffieren amulet om de betrekkelijke voornaamwoorden te herstellen', nextPage: 2, skillBonus: '+15 Syntaxis', icon: '✨' },
      { label: 'Raadpleeg de zilveren zandloper van Chronos', nextPage: 2, skillBonus: '+15 Tijdsrekening', icon: '⏳' }
    ]
  },
  {
    pageNumber: 2,
    title: 'De Kroniek der Verwijswoorden',
    biome: 'Zaal der Spiegelende Manuscripten',
    storyText: `Voor Hemali zweefde het grote kroniekboek van het Oude Rijk. Verschillende zinnen waren vervaagd. 

In de tekst stond: *'De grote koningin schonk haar zegelring aan de admiraal, **waarmee** hij de vloot bevel voerde. **Degenen** die haar trouw bleven, ontvingen eer en aanzien.'* Hemali ontleedde direct dat het woord *waarmee* verwees naar het instrument (de zegelring) en *degenen* naar de loyale ridders. Met één elegante pennenstreek herstelde zij de syntactische balans!`,
    targetWords: [
      {
        word: 'waarmee',
        dutchMeaning: 'met welk voorwerp of middel (betrekkelijk voornaamwoordelijk bijwoord).',
        englishMeaning: 'With which / whereby'
      },
      {
        word: 'degenen',
        dutchMeaning: 'die mensen, die personen (aanwijzend voornaamwoord voor meervoud).',
        englishMeaning: 'Those who / the ones who'
      },
      {
        word: 'syntactische',
        dutchMeaning: 'betrekking hebbend op de juiste zinsbouw en zinsconstructies.',
        englishMeaning: 'Syntactical'
      }
    ],
    mysteryQuestion: {
      clueTitle: '📜 Cito Verwijswoorden #2',
      question: 'Waar verwijst het woord "waarmee" naar in de herstelde zin?',
      options: [
        'Naar de koningin',
        'Naar de zegelring (het instrument waarmee het bevel werd gevoerd)',
        'Naar de schepen op zee',
        'Naar de inktpot'
      ],
      correctIndex: 1,
      explanation: '"Waarmee" duidt het middel aan (de zegelring) waarmee de admiraal het gezag uitoefende.'
    },
    choices: [
      { label: 'Draai aan de gouden chronometer om de historische tijdlijn te stabiliseren', nextPage: 3, skillBonus: '+15 Tijdstabilisatie', icon: '⚙️' },
      { label: 'Laat uil Tycho de herstelde boekrol terugvliegen naar zijn kluis', nextPage: 3, skillBonus: '+15 Archiefkunde', icon: '🦉' }
    ]
  },
  {
    pageNumber: 3,
    title: 'De Slag om de Chrono-Sfeer',
    biome: 'Gewelf der Kosmische Klokken',
    storyText: `Een schaduwstorm van vergeten woorden probeerde het centrale uurwerk binnen te dringen. **Desalniettemin** behield Hemali haar kalmte. Zij hief haar saffieren toverstaf en formuleerde een onweerlegbaar argumentatief betoog.

**Enerzijds** ontkrachtte zij de drogredenen van de schaduwen met strakke logische premissen; **anderzijds** versterkte zij het schild met authentieke poëzie. De schaduwen losten geruisloos op in het gouden licht van de waarheid.`,
    targetWords: [
      {
        word: 'desalniettemin',
        dutchMeaning: 'toch, desondanks (zeer formeel signaalwoord van tegenstelling).',
        englishMeaning: 'Nonetheless / nevertheless'
      },
      {
        word: 'enerzijds',
        dutchMeaning: 'aan de ene kant (introduceert het eerste aspect van een genuanceerde vergelijking).',
        englishMeaning: 'On the one hand'
      },
      {
        word: 'onweerlegbaar',
        breakdown: 'on + weerleg + baar',
        dutchMeaning: 'zo overduidelijk waar en logisch dat niemand het kan tegenspreken.',
        englishMeaning: 'Irrefutable / undeniable'
      }
    ],
    mysteryQuestion: {
      clueTitle: '🧠 Cito Argumentatie #3',
      question: 'Welk tekstueel effect bereikt Hemali door de combinatie "Enerzijds... anderzijds"?',
      options: [
        'Zij telt twee appels op',
        'Zij belicht twee complementaire strategieën (logica én poëzie) om het probleem integraal op te lossen',
        'Zij geeft op',
        'Zij noemt de namen van twee rivieren'
      ],
      correctIndex: 1,
      explanation: '"Enerzijds... anderzijds" nuanceert twee kanten die samen het complete, onweerlegbare antwoord vormen.'
    },
    choices: [
      { label: 'Vergrendel het uurwerk met het Zegel van Eeuwige Grammatica', nextPage: 4, skillBonus: '+20 Harmoniebeheer', icon: '🔒' },
      { label: 'Roep babygiraf Appel en de wijze dieren toe voor de slotceremonie', nextPage: 4, skillBonus: '+20 Vriendschap', icon: '🦒' }
    ]
  },
  {
    pageNumber: 4,
    title: 'De Hoogste Onderscheiding: Grootmeester der Tijd en Taal',
    biome: 'Troonzaal van de Tijdloze Raad',
    storyText: `De Oude Hoeders van Chronos materialiseerden zich in een kring van puur licht. Zij bogen diep voor Hemali. 

De Opperhoeder sprak plechtig: *“Hemali, gij hebt bewezen dat taal niet slechts een communicatiemiddel is, maar de ankerlijn van de werkelijkheid. Door uw beheersing van complexe signaalwoorden, causale structuren en empathische kracht zijn alle tijdlijnen gered.”* Zij schonken haar het *Diadeem der Tijdloze Wijsheid*. Hemali glimlachte met haar kenmerkende schrandere blik: klaar voor elk nieuw Cito-examen en elk nieuw avontuur!`,
    targetWords: [
      {
        word: 'materialiseerden',
        dutchMeaning: 'zich in tastbare, zichtbare gedaante vertonen.',
        englishMeaning: 'Materialized / manifested physically'
      },
      {
        word: 'diadeem',
        dutchMeaning: 'een met edelstenen bezette ceremoniële kroonband voor het hoofd.',
        englishMeaning: 'Diadem / crown'
      },
      {
        word: 'communicatiemiddel',
        breakdown: 'communicatie + middel',
        dutchMeaning: 'een instrument of taal waarmee informatie en gevoelens worden uitgewisseld.',
        englishMeaning: 'Means of communication'
      }
    ],
    mysteryQuestion: {
      clueTitle: '👑 Cito Doorstroomtoets Uitmuntendheid #4',
      question: 'Waarom noemen de Hoeders taal "de ankerlijn van de werkelijkheid"?',
      options: [
        'Omdat boeken zwaar zijn',
        'Omdat heldere, logische en waarachtige taal gedachten ordent, geschiedenis bewaart en mensen en tijden verbindt',
        'Omdat iedereen stil moet zijn in de bibliotheek',
        'Omdat letters van ijzer zijn gesmeed'
      ],
      correctIndex: 1,
      explanation: 'Taal vormt het fundament van begrip, logica en waarheid in menselijke interactie en geschiedenis.'
    },
    choices: [
      { label: 'Voltooi de Campagne & Sla je Grootmeesterscore op in het Eindrapport', nextPage: 1, skillBonus: '🌟 Cito Doorstroomtoets 2F+ Superieur Certificaat!', icon: '🎓' }
    ]
  }
];
