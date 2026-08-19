import { Level } from '../types';
import { ALL_BIOME_ANIMALS } from './biomeAnimals';

const ANIMAL_ALIASES: Record<string, string> = {
  'mimi-aap': 'mo-meerkat',
  'kiki-cheeta': 'charly-cheeta',
  'wally-walvis': 'willy-walvis',
  'otto-octopus': 'octo-octopus',
  'nemo-clownvis': 'kora-zeepaardje',
  'hugo-haai': 'oscar-orka',
  'piet-pinguin': 'plons-pinguin',
  'sam-zeehond': 'robbie-zeehond',
  'fay-poolvos': 'pip-poolvos',
  'finn-vos': 'finn-woestijnvos'
};

export const findAnimal = (id: string) => {
  const resolvedId = ANIMAL_ALIASES[id] || id;
  const a = ALL_BIOME_ANIMALS.find(item => item.id === resolvedId || item.id === id);
  if (a) return a;
  return ALL_BIOME_ANIMALS[0];
};

// ==========================================
// 1. BOERDERIJ (FARM) - GROEP 6-7-8 NEW
// ==========================================
export const FARM_LEVELS_68: Level[] = [
  {
    id: 1,
    name: 'Bella’s Grammatica Weide',
    biome: 'farm',
    theme: 'Werkwoordspelling (d/t/dt) & Sterke Werkwoorden',
    themeColor: '#4CAF50',
    bannerEmoji: '🐮',
    chapterTitle: 'Hoofdstuk 1: Vervoegen in het Ochtendgloren',
    introStory: 'Bella de koe kijkt uit over het erf: "In Groep 6-7-8 gaan we aan de slag met werkwoordspelling, sterke werkwoorden en zinsontleding! Help jij mee?"',
    animalReward: findAnimal('bella-koe'),
    questions: [
      {
        id: 'farm68-new-1-1',
        category: 'Werkwoordspelling (TT)',
        categoryIcon: '🐮',
        question: 'Vul in: De jonge boerin ___ dagelijks de pasgeboren kalfjes.',
        type: 'choice',
        options: ['voedt', 'voed', 'voett'],
        correctOptionIndex: 0,
        hint: 'Onderwerp is "de jonge boerin" (hij/zij-vorm). Stam voed + t = voedt.',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'farm68-new-1-2',
        category: 'Sterke Werkwoorden (VT)',
        categoryIcon: '⚡',
        question: 'Wat is de verleden tijd (VT) van "schenken"? (Gisteren ... hij)',
        type: 'choice',
        options: ['schonk', 'schenkte', 'geschonken'],
        correctOptionIndex: 0,
        hint: 'Schenken is een sterk werkwoord: schenken - schonk - geschonken.',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'farm68-new-1-3',
        category: 'Letters Leggen',
        categoryIcon: '✏️',
        question: 'Spel het voltooid deelwoord van het werkwoord "melken":',
        type: 'spell',
        targetWord: 'GEMOLKEN',
        scrambledLetters: ['G', 'E', 'M', 'O', 'L', 'K', 'E', 'N'],
        hint: 'Melken - molk - gemolken.',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'farm68-new-1-4',
        category: 'Begrijpend Lezen & Cito',
        categoryIcon: '📖',
        question: 'Wat is de hoofdgedachte van de volgende alinea?',
        passage: 'Moderne melkveehouderijen gebruiken steeds vaker automatische melkrobots. Deze robots scannen de koe met sensoren, reinigen de uiers en registreren de melkgift per kwartier. Hierdoor bepalen koeien zelf wanneer ze gemolken willen worden, wat zorgt voor minder stress en een hogere melkkwaliteit.',
        type: 'choice',
        options: ['Melkrobots verbeteren het dierenwelzijn en de melkproductie doordat koeien hun eigen ritme bepalen', 'Koeien houden niet van mensenhanden', 'Melkrobots zijn te duur voor kleine boerderijen'],
        correctOptionIndex: 0,
        hint: 'Kijk naar de samenvattende conclusie in de laatste zin over dierenwelzijn en ritme.',
        gradeBadge: 'Begrijpend Lezen'
      }
    ]
  },
  {
    id: 2,
    name: 'Knorrie’s Zinsontledingspoel',
    biome: 'farm',
    theme: 'Onderwerp, Persoonsvorm & Lijdend Voorwerp',
    themeColor: '#8D6E63',
    bannerEmoji: '🐷',
    chapterTitle: 'Hoofdstuk 2: Speuren naar Zinsdelen',
    introStory: 'Knorrie wroet met zijn snuit in het zand. "Knor! Kun jij de persoonsvorm en het lijdend voorwerp in een zin vinden?"',
    animalReward: findAnimal('knorrie-varken'),
    questions: [
      {
        id: 'farm68-new-2-1',
        category: 'Zinsontleding (Lijdend Voorwerp)',
        categoryIcon: '🐷',
        question: 'Wat is het lijdend voorwerp (LV) in: "De dierenarts onderzoekt het zieke biggetje grondig."',
        type: 'choice',
        options: ['het zieke biggetje', 'de dierenarts', 'onderzoekt'],
        correctOptionIndex: 0,
        hint: 'Vraag: WIE of WAT onderzoekt de dierenarts? -> het zieke biggetje.',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'farm68-new-2-2',
        category: 'Werkwoordspelling (Voltooid Deelwoord)',
        categoryIcon: '🌾',
        question: 'Kies de juiste spelling: De modderpoel is gisteren helemaal ___.',
        type: 'choice',
        options: ['vergroot', 'vergrootte', 'vergrood'],
        correctOptionIndex: 0,
        hint: 'Vergroten: stam eindigt op t (t-kofschip). Voltooid deelwoord krijgt geen dubbele t achteraan: vergroot.',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'farm68-new-2-3',
        category: 'Letters Leggen',
        categoryIcon: '✏️',
        question: 'Spel het voltooid deelwoord van "wroeten":',
        type: 'spell',
        targetWord: 'GEWROET',
        scrambledLetters: ['G', 'E', 'W', 'R', 'O', 'E', 'T'],
        hint: 'Wroeten - wroette - gewroet (t-kofschip).',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'farm68-new-2-4',
        category: 'Spreekwoorden & Uitdrukkingen',
        categoryIcon: '💡',
        question: 'Wat betekent: "Een addertje onder het gras"?',
        type: 'choice',
        options: ['Er zit een verborgen gevaar of stiekem nadeel aan', 'Er kruipt een slang in het hooi', 'Het gras moet gemaaid worden'],
        correctOptionIndex: 0,
        hint: 'Iets lijkt heel mooi, maar er zit een verborgen stiekeme valkuil.',
        gradeBadge: 'Spreekwoorden'
      }
    ]
  },
  {
    id: 3,
    name: 'Wollie’s Trema & Tussen-n Weide',
    biome: 'farm',
    theme: 'Woorden met Trema & Tussen-n / Tussen-s',
    themeColor: '#795548',
    bannerEmoji: '🐑',
    chapterTitle: 'Hoofdstuk 3: Punten op de E en Tussenletters',
    introStory: 'Wollie het schaap kijkt door haar krullen. "Weet jij wanneer er puntjes (trema) op een klinker moeten om klinkerbótsing te voorkomen?"',
    animalReward: findAnimal('wollie-schaap'),
    questions: [
      {
        id: 'farm68-new-3-1',
        category: 'Trema Regel',
        categoryIcon: '🐑',
        question: 'Kies de juiste spelling voor het dierlijk geneesmiddel:',
        type: 'choice',
        options: ['bacterieën', 'bacteriën', 'bacterien'],
        correctOptionIndex: 1,
        hint: 'Klemtoon ligt niet op de ie: bacterie -> bacteriën met trema op de e.',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'farm68-new-3-2',
        category: 'Tussen-n Regel',
        categoryIcon: '🌾',
        question: 'Kies het juist gespelde samengestelde woord:',
        type: 'choice',
        options: ['schapenwol', 'schaapwol', 'schaapewol'],
        correctOptionIndex: 0,
        hint: 'Schaap heeft als meervoud schapen (alleen op -en), dus schapenwol!',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'farm68-new-3-3',
        category: 'Letters Leggen',
        categoryIcon: '✏️',
        question: 'Spel het woord voor de leider van de schaapskudde:',
        type: 'spell',
        targetWord: 'HERDER',
        scrambledLetters: ['H', 'E', 'R', 'D', 'E', 'R'],
        hint: 'H - E - R - D - E - R (6 letters).',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'farm68-new-3-4',
        category: 'Begrijpend Lezen & Signaalwoorden',
        categoryIcon: '📖',
        question: 'Welk tekstverband geeft het signaalwoord "desondanks" aan in een zin?',
        type: 'choice',
        options: ['Een tegenstelling (ondanks dat het zo is, gebeurt het toch)', 'Een opsomming van feiten', 'Een tijdsbepaling in de ochtend'],
        correctOptionIndex: 0,
        hint: 'Desondanks betekent: ondanks dat / toch.',
        gradeBadge: 'Begrijpend Lezen'
      }
    ]
  },
  {
    id: 4,
    name: 'Pico’s Woordbenoeming Schuur',
    biome: 'farm',
    theme: 'Woordsoorten (Voornaamwoorden & Bijwoorden)',
    themeColor: '#FF9800',
    bannerEmoji: '🐔',
    chapterTitle: 'Hoofdstuk 4: Taalkundig Ontleden',
    introStory: 'Pico de hen pikt graan op de deel. "Kakel! Kun jij het verschil zien tussen een bezittelijk, persoonlijk en aanwijzend voornaamwoord?"',
    animalReward: findAnimal('pico-kip'),
    questions: [
      {
        id: 'farm68-new-4-1',
        category: 'Woordbenoeming (Voornaamwoord)',
        categoryIcon: '🐔',
        question: 'Wat voor soort woord is "haar" in de zin: "Pico verzorgt haar pasgeboren kuikentjes zorgvuldig."',
        type: 'choice',
        options: ['bezittelijk voornaamwoord (geeft bezit aan)', 'persoonlijk voornaamwoord', 'bijvoeglijk naamwoord'],
        correctOptionIndex: 0,
        hint: 'Het zijn HAAR kuikentjes (bezit), dus een bezittelijk voornaamwoord!',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'farm68-new-4-2',
        category: 'Werkwoordspelling (VT)',
        categoryIcon: '🥚',
        question: 'Wat is de juiste verleden tijd van "leggen"? (Gisteren ... de hen een ei)',
        type: 'choice',
        options: ['legde', 'leide', 'leegde'],
        correctOptionIndex: 0,
        hint: 'Leggen - legde - gelegd (zwak werkwoord, stam leg + de).',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'farm68-new-4-3',
        category: 'Letters Leggen',
        categoryIcon: '✏️',
        question: 'Spel het bijvoeglijk naamwoord voor eieren die biologisch zijn:',
        type: 'spell',
        targetWord: 'VERS',
        scrambledLetters: ['V', 'E', 'R', 'S'],
        hint: 'V - E - R - S (4 letters).',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'farm68-new-4-4',
        category: 'Zinsleer',
        categoryIcon: '🔍',
        question: 'Wat is de persoonsvorm (PV) in: "De haan kraaide vanmorgen al om vijf uur luidkeels."',
        type: 'choice',
        options: ['kraaide', 'de haan', 'luidkeels'],
        correctOptionIndex: 0,
        hint: 'Maak de zin vragend: "Kraaide de haan vanmorgen...?" -> kraaide staat vooraan!',
        gradeBadge: 'Grammatica'
      }
    ]
  },
  {
    id: 5,
    name: 'Storm’s Samengestelde Zinnen Paddock',
    biome: 'farm',
    theme: 'Hoofdzin & Bijzin, Voegwoorden',
    themeColor: '#3F51B5',
    bannerEmoji: '🐴',
    chapterTitle: 'Hoofdstuk 5: Complexe Zinsconstructies',
    introStory: 'Storm het paard galoppeert door de bak. "Hinnik! In de bovenbouw bouwen we lange, samengestelde zinnen met onderschikkende en nevenschikkende voegwoorden!"',
    animalReward: findAnimal('storm-paard'),
    questions: [
      {
        id: 'farm68-new-5-1',
        category: 'Zinsleer (Bijzin)',
        categoryIcon: '🐴',
        question: 'Welk deel is de bijzin in: "De ruiter zadelde het paard, omdat de training bijna begon."',
        type: 'choice',
        options: ['omdat de training bijna begon', 'De ruiter zadelde het paard', 'het paard'],
        correctOptionIndex: 0,
        hint: 'Begint met het voegwoord "omdat" en de persoonsvorm "begon" staat helemaal achteraan!',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'farm68-new-5-2',
        category: 'Werkwoordspelling (Engelse Leenwoorden)',
        categoryIcon: '🏇',
        question: 'Wat is de juiste spelling in de tegenwoordige tijd (TT): "De ruiter ___ zijn paard op de show."',
        type: 'choice',
        options: ['showt', 'showed', 'shows'],
        correctOptionIndex: 0,
        hint: 'Engels leenwoord show: stam is show + t = showt.',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'farm68-new-5-3',
        category: 'Letters Leggen',
        categoryIcon: '✏️',
        question: 'Spel het stoffelijk bijvoeglijk naamwoord voor hoefijzers van ijzer:',
        type: 'spell',
        targetWord: 'IJZEREN',
        scrambledLetters: ['I', 'J', 'Z', 'E', 'R', 'E', 'N'],
        hint: 'Stoffelijk bijvoeglijk naamwoord eindigt altijd op -en: ijzeren!',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'farm68-new-5-4',
        category: 'Begrijpend Lezen',
        categoryIcon: '📖',
        question: 'Wat is het doel van de auteur bij een informatieve tekst over paardenverzorging?',
        type: 'choice',
        options: ['De lezer feitelijke kennis en instructies bijbrengen', 'De lezer overhalen om een paard te kopen', 'De lezer aan het lachen maken met grappige verhalen'],
        correctOptionIndex: 0,
        hint: 'Een informatieve tekst heeft als hoofddoel feitelijke kennis overdragen.',
        gradeBadge: 'Begrijpend Lezen'
      }
    ]
  },
  {
    id: 6,
    name: 'Flap’s Woordenschat Arena',
    biome: 'farm',
    theme: 'Spreekwoorden, Archaïsmen & Cito Eindtoets',
    themeColor: '#E91E63',
    bannerEmoji: '🐰',
    chapterTitle: 'Hoofdstuk 6: Boerderij Eindtoets Meesterschap',
    introStory: 'Flap het konijn hopt trots over de eindstreep. "Laat zien dat jij klaar bent voor de Cito-eindtoets en de brugklas!"',
    animalReward: findAnimal('flap-konijn'),
    questions: [
      {
        id: 'farm68-new-6-1',
        category: 'Spreekwoorden',
        categoryIcon: '🐰',
        question: 'Wat betekent: "Het paard achter de wagen spannen"?',
        type: 'choice',
        options: ['Iets op een totaal verkeerde, onlogische manier aanpakken', 'Een hele zware vracht vervoeren', 'Te hard rijden op de weg'],
        correctOptionIndex: 0,
        hint: 'Een paard moet immers vóór de wagen staan om hem vooruit te trekken!',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'farm68-new-6-2',
        category: 'Werkwoordspelling (Voltooid Deelwoord)',
        categoryIcon: '🥕',
        question: 'Kies de juiste spelling: "De boer heeft alle verse wortels al ___."',
        type: 'choice',
        options: ['gerooid', 'gerooit', 'gerooyd'],
        correctOptionIndex: 0,
        hint: 'Rooien - rooide - gerooid (d-werkwoord).',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'farm68-new-6-3',
        category: 'Letters Leggen',
        categoryIcon: '✏️',
        question: 'Spel het synoniem voor "overvloedige oogst":',
        type: 'spell',
        targetWord: 'OPBRENGST',
        scrambledLetters: ['O', 'P', 'B', 'R', 'E', 'N', 'G', 'S', 'T'],
        hint: 'O - P - B - R - E - N - G - S - T (9 letters).',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'farm68-new-6-4',
        category: 'Zinsleer (Meewerkend Voorwerp)',
        categoryIcon: '🔍',
        question: 'Wat is het meewerkend voorwerp (MV) in: "De boerin gaf de kinderen een rondleiding over het erf."',
        type: 'choice',
        options: ['de kinderen (aan wie gaf ze het?)', 'de boerin', 'een rondleiding'],
        correctOptionIndex: 0,
        hint: 'Vraag: Aan wie of voor wie gaf de boerin een rondleiding? -> aan de kinderen.',
        gradeBadge: 'Grammatica'
      }
    ]
  }
];

// ==========================================
// 2. SAVANNE (SAVANNA) - GROEP 6-7-8 NEW
// ==========================================
export const SAVANNA_LEVELS_68: Level[] = [
  {
    id: 1,
    name: 'Simba’s Heersersrots',
    biome: 'safari',
    theme: 'Sterke Werkwoorden & Leenwoorden',
    themeColor: '#FFA000',
    bannerEmoji: '🦁',
    chapterTitle: 'Hoofdstuk 1: De Koninklijke Brul',
    introStory: 'Simba de leeuw overziet de savanne. "Welkom op het hoogste taalniveau! We gaan aan de slag met klankveranderende werkwoorden en synoniemen!"',
    animalReward: findAnimal('simba-leeuw'),
    questions: [
      {
        id: 'sav68-new-1-1',
        category: 'Sterke Werkwoorden (VT)',
        categoryIcon: '🦁',
        question: 'Wat is de juiste verleden tijd van "sluipen"? (Gisteren ... de leeuw door het gras)',
        type: 'choice',
        options: ['sloop', 'sluipte', 'geslopen'],
        correctOptionIndex: 0,
        hint: 'Sluipen is een sterk werkwoord: sluipen - sloop - geslopen.',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'sav68-new-1-2',
        category: 'Woordenschat & Stijl',
        categoryIcon: '👑',
        question: 'Wat is een chique synoniem voor "majestueus"?',
        type: 'choice',
        options: ['groots en indrukwekkend', 'klein en bang', 'snel en lawaaierig'],
        correctOptionIndex: 0,
        hint: 'Majesteit betekent koning: koninklijk en groots!',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'sav68-new-1-3',
        category: 'Letters Leggen',
        categoryIcon: '✏️',
        question: 'Spel het meervoud van "roofdier":',
        type: 'spell',
        targetWord: 'ROOFDIEREN',
        scrambledLetters: ['R', 'O', 'O', 'F', 'D', 'I', 'E', 'R', 'E', 'N'],
        hint: 'Roof + dieren (let op de f die blijft staan in deze samenstelling).',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'sav68-new-1-4',
        category: 'Begrijpend Lezen',
        categoryIcon: '📖',
        question: 'Wat is de functie van de eerste zin in een informatieve alinea (vaak de kernzin)?',
        type: 'choice',
        options: ['Het hoofdthema van de alinea introduceren', 'Een grapje maken', 'De conclusie van het hele boek geven'],
        correctOptionIndex: 0,
        hint: 'De kernzin staat meestal aan het begin of eind en vat de alinea samen.',
        gradeBadge: 'Begrijpend Lezen'
      }
    ]
  },
  {
    id: 2,
    name: 'Raffi’s Hoogtepunt',
    biome: 'safari',
    theme: 'Bijvoeglijk Naamwoord als Zelfstandig Naamwoord & Trema',
    themeColor: '#F57C00',
    bannerEmoji: '🦒',
    chapterTitle: 'Hoofdstuk 2: Uitzicht over de Horizon',
    introStory: 'Raffi de giraffe kijkt over de acaciakruinen. "Weet jij hoe je zelfstandig gebruikte bijvoeglijke naamwoorden zoals \'de langste\' spelt?"',
    animalReward: findAnimal('raffi-giraffe'),
    questions: [
      {
        id: 'sav68-new-2-1',
        category: 'Spellingregel (Verzelfstandigd BN)',
        categoryIcon: '🦒',
        question: 'Kies de juiste spelling: "Van alle giraffen in het reservaat is Raffi de ___."',
        type: 'choice',
        options: ['langste', 'langsten', 'langstte'],
        correctOptionIndex: 0,
        hint: 'Verzelfstandigd bijvoeglijk naamwoord zonder zelfstandig naamwoord erachter krijgt geen -n als het over een dier/ding gaat: de langste.',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'sav68-new-2-2',
        category: 'Sterke Werkwoorden',
        categoryIcon: '🌿',
        question: 'Wat is het voltooid deelwoord van "buigen"? (Zij heeft haar nek ...)',
        type: 'choice',
        options: ['gebogen', 'gebuigd', 'gebogd'],
        correctOptionIndex: 0,
        hint: 'Buigen - boog - gebogen.',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'sav68-new-2-3',
        category: 'Letters Leggen',
        categoryIcon: '✏️',
        question: 'Spel het woord voor de boom met scherpe doorns op de savanne:',
        type: 'spell',
        targetWord: 'ACACIA',
        scrambledLetters: ['A', 'C', 'A', 'C', 'I', 'A'],
        hint: 'A - C - A - C - I - A (6 letters, met twee c’s).',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'sav68-new-2-4',
        category: 'Zinsleer',
        categoryIcon: '🔍',
        question: 'Wat is de bepaling van tijd in: "De giraffen drinken elke ochtend bij zonsopgang water."',
        type: 'choice',
        options: ['elke ochtend bij zonsopgang', 'de giraffen', 'bij de rivier'],
        correctOptionIndex: 0,
        hint: 'Vraag: WANNEER drinken de giraffen? -> elke ochtend bij zonsopgang.',
        gradeBadge: 'Grammatica'
      }
    ]
  },
  {
    id: 3,
    name: 'Jumbo’s Geheugenbank',
    biome: 'safari',
    theme: 'Apostrof-Regels (\'s en Meervoud) & Werkwoorden',
    themeColor: '#78909C',
    bannerEmoji: '🐘',
    chapterTitle: 'Hoofdstuk 3: Wijsheid der Generaties',
    introStory: 'Jumbo de matriarch leidt de kudde. "Weet jij wanneer je een apostrof (\'s) gebruikt bij meervoud en bezit?"',
    animalReward: findAnimal('jumbo-olifant'),
    questions: [
      {
        id: 'sav68-new-3-1',
        category: 'Apostrof Meervoud',
        categoryIcon: '🐘',
        question: 'Kies de juiste meervoudsspelling van "zebra":',
        type: 'choice',
        options: ['zebra\'s', 'zebras', 'zebraas'],
        correctOptionIndex: 0,
        hint: 'Woorden die eindigen op een lange klinker (a, i, o, u, y) krijgen \'s in het meervoud om de lange klank te bewaren!',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'sav68-new-3-2',
        category: 'Werkwoordspelling (d/t)',
        categoryIcon: '💧',
        question: 'Vul in: "Het jonge olifantje ___ het koele water over zijn rug."',
        type: 'choice',
        options: ['spuit', 'spuid', 'spuitt'],
        correctOptionIndex: 0,
        hint: 'Stam spuit eindigt al op een t, dus in de hij-vorm komt er geen extra t bij: spuit.',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'sav68-new-3-3',
        category: 'Letters Leggen',
        categoryIcon: '✏️',
        question: 'Spel het woord voor de leidster van een olifantenkudde:',
        type: 'spell',
        targetWord: 'MATRIARCH',
        scrambledLetters: ['M', 'A', 'T', 'R', 'I', 'A', 'R', 'C', 'H'],
        hint: 'M - A - T - R - I - A - R - CH (9 letters).',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'sav68-new-3-4',
        category: 'Begrijpend Lezen',
        categoryIcon: '📖',
        question: 'Wat toont wetenschappelijk onderzoek aan over de communicatie tussen olifanten?',
        passage: 'Olifanten communiceren niet alleen met getrompetter, maar vooral via infrageluid. Dit zijn hele lage trillingen die mensen niet kunnen horen, maar die door de grond reizen en door andere olifanten met de gevoelige zenuwkussentjes in hun voetzolen worden opgevangen over afstanden van meer dan 10 kilometer!',
        type: 'choice',
        options: ['Ze voelen onhoorbare lage trillingen door de grond met hun voetzolen over kilometers afstand', 'Ze communiceren alleen met hun slurfgebaren', 'Ze praten alleen als het regent'],
        correctOptionIndex: 0,
        hint: 'Lees over het infrageluid dat door de grond reist.',
        gradeBadge: 'Begrijpend Lezen'
      }
    ]
  },
  {
    id: 4,
    name: 'Charly’s Acceleratiebaan',
    biome: 'safari',
    theme: 'Werkwoordspelling (Gebiedende Wijs) & Snelheid',
    themeColor: '#FF7043',
    bannerEmoji: '🐆',
    chapterTitle: 'Hoofdstuk 4: Flitsende Reflexen',
    introStory: 'Charly de cheeta spant haar spieren. "Let op: bij de gebiedende wijs (een bevel) schrijf je ALTIJD alleen de ik-vorm (de stam)!"',
    animalReward: findAnimal('charly-cheeta'),
    questions: [
      {
        id: 'sav68-new-4-1',
        category: 'Gebiedende Wijs Regel',
        categoryIcon: '🐆',
        question: 'Kies de juiste spelling voor het bevel: "___ snel opzij voor de sprintende cheeta!"',
        type: 'choice',
        options: ['Stap', 'Stapt', 'Stapte'],
        correctOptionIndex: 0,
        hint: 'Gebiedende wijs = altijd enkel de stam: Stap!',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'sav68-new-4-2',
        category: 'Sterke Werkwoorden',
        categoryIcon: '💨',
        question: 'Wat is de verleden tijd van "vangen"? (Gisteren ... zij de prooi)',
        type: 'choice',
        options: ['ving', 'vangde', 'gevangen'],
        correctOptionIndex: 0,
        hint: 'Vangen - ving - gevangen.',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'sav68-new-4-3',
        category: 'Letters Leggen',
        categoryIcon: '✏️',
        question: 'Spel het natuurkundige woord voor versnelling:',
        type: 'spell',
        targetWord: 'ACCELERATIE',
        scrambledLetters: ['A', 'C', 'C', 'E', 'L', 'E', 'R', 'A', 'T', 'I', 'E'],
        hint: 'A - CC - E - L - E - R - A - T - IE (11 letters).',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'sav68-new-4-4',
        category: 'Zinsleer',
        categoryIcon: '🔍',
        question: 'Wat is de bepaling van wijze in: "De cheeta accelereert met verbluffende souplesse over het zand."',
        type: 'choice',
        options: ['met verbluffende souplesse (HOE accelereert ze?)', 'over het zand', 'de cheeta'],
        correctOptionIndex: 0,
        hint: 'Vraag: HOE accelereert het dier? -> met verbluffende souplesse.',
        gradeBadge: 'Grammatica'
      }
    ]
  },
  {
    id: 5,
    name: 'Zara’s Illusieweg',
    biome: 'safari',
    theme: 'Woordenschat (Figuurlijk Taalgebruik & Metaforen)',
    themeColor: '#424242',
    bannerEmoji: '🦓',
    chapterTitle: 'Hoofdstuk 5: Zwart-Wit Contrasten',
    introStory: 'Zara de zebra loopt in formatie met de kudde. "Zie jij het verschil tussen letterlijk en figuurlijk taalgebruik?"',
    animalReward: findAnimal('zara-zebra'),
    questions: [
      {
        id: 'sav68-new-5-1',
        category: 'Figuurlijk Taalgebruik',
        categoryIcon: '🦓',
        question: 'Welke zin bevat FIGUURLIJK taalgebruik (beeldspraak)?',
        type: 'choice',
        options: ['De zon brandde als een oven boven het dorre landschap.', 'De zebra heeft zwarte en witte strepen.', 'Het water in de poel is drinkbaar.'],
        correctOptionIndex: 0,
        hint: 'De zon is geen echte keukenoven, maar een vergelijking om de hitte te beschrijven!',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'sav68-new-5-2',
        category: 'Werkwoordspelling (d/t)',
        categoryIcon: '🦓',
        question: 'Vul in: "De verwarring ___ de leeuw tijdens de jacht."',
        type: 'choice',
        options: ['misleidt', 'misleid', 'misleit'],
        correctOptionIndex: 0,
        hint: 'Onderwerp is "de verwarring" (hij-vorm). Stam misleid + t = misleidt.',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'sav68-new-5-3',
        category: 'Letters Leggen',
        categoryIcon: '✏️',
        question: 'Spel het woord voor het verwarren van roofdieren met strepen:',
        type: 'spell',
        targetWord: 'CAMOUFLAGE',
        scrambledLetters: ['C', 'A', 'M', 'O', 'U', 'F', 'L', 'A', 'G', 'E'],
        hint: 'C - A - M - OU - F - L - A - G - E (10 letters, Frans leenwoord).',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'sav68-new-5-4',
        category: 'Begrijpend Lezen',
        categoryIcon: '📖',
        question: 'Wat is de "optische illusie" die een rennende zebrakudde veroorzaakt?',
        passage: 'Wanneer tientallen zebra’s tegelijk door elkaar rennen, smelten hun bewegende strepen samen tot één grote flikkerende massa. Voor een jagende leeuw is het daardoor bijna onmogelijk om één individuele zebra te isoleren en de afstand in te schatten.',
        type: 'choice',
        options: ['De strepen smelten samen waardoor roofdieren geen afzonderlijk dier kunnen focussen', 'De zebra’s worden onzichtbaar in het donker', 'De leeuwen worden verblind door de zon'],
        correctOptionIndex: 0,
        hint: 'Lees over het samensmelten tot één flikkerende massa.',
        gradeBadge: 'Begrijpend Lezen'
      }
    ]
  },
  {
    id: 6,
    name: 'Mo’s Strategieburcht',
    biome: 'safari',
    theme: 'Cito Tekstbegrip & Eindtoets Savanne',
    themeColor: '#8D6E63',
    bannerEmoji: '🦫',
    chapterTitle: 'Hoofdstuk 6: De Ultieme Savanne Meesterproef',
    introStory: 'Mo het stokstaartje salueert. "Tijd om alle opgedane kennis te bundelen en de Savanne-trofee te veroveren!"',
    animalReward: findAnimal('mo-meerkat'),
    questions: [
      {
        id: 'sav68-new-6-1',
        category: 'Zinsleer (Naamwoordelijk Deel)',
        categoryIcon: '🦫',
        question: 'Wat is het naamwoordelijk deel van het gezegde in: "Mo is een uiterst waakzame wachter."',
        type: 'choice',
        options: ['een uiterst waakzame wachter', 'is', 'Mo'],
        correctOptionIndex: 0,
        hint: 'Koppelwerkwoord "is" koppelt het onderwerp aan het naamwoordelijk deel: een uiterst waakzame wachter.',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'sav68-new-6-2',
        category: 'Werkwoordspelling (Voltooid Deelwoord)',
        categoryIcon: '🧭',
        question: 'Kies de juiste spelling: "De stokstaartjes hebben de jonge welpen veilig ___."',
        type: 'choice',
        options: ['begeleid', 'begeleidt', 'begeleide'],
        correctOptionIndex: 0,
        hint: 'Begeleiden - begeleidde - begeleid (d-werkwoord).',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'sav68-new-6-3',
        category: 'Letters Leggen',
        categoryIcon: '✏️',
        question: 'Spel het synoniem voor oplettendheid:',
        type: 'spell',
        targetWord: 'WAAKZAAMHEID',
        scrambledLetters: ['W', 'A', 'A', 'K', 'Z', 'A', 'A', 'M', 'H', 'E', 'I', 'D'],
        hint: 'Waakzaam + heid (12 letters, eindigt op een d).',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'sav68-new-6-4',
        category: 'Cito Tekstanalyse',
        categoryIcon: '📖',
        question: 'Wat is het tekstdoel van een betoog?',
        type: 'choice',
        options: ['De lezer overtuigen van een bepaald standpunt met argumenten', 'Alleen feiten opsommen zonder mening', 'Een stappenplan uitleggen om een taart te bakken'],
        correctOptionIndex: 0,
        hint: 'Een betoog heeft als doel de lezer te overtuigen van een mening.',
        gradeBadge: 'Begrijpend Lezen'
      }
    ]
  }
];
