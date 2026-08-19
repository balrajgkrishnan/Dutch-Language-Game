import { Level, Animal, Badge } from '../types';

export const INITIAL_ANIMALS: Animal[] = [
  {
    id: 'gigi-giraf',
    name: 'Gigi de Giraf',
    title: 'De Vriendelijke Reus',
    emoji: '🦒',
    color: '#FFB74D',
    bgGradient: 'from-amber-100 to-orange-200',
    soundName: 'general',
    funFact: 'Gigi heeft een tong van wel 45 cm waarmee ze blaadjes uit de hoogste acaciabomen plukt!',
    favoriteFood: 'Groene Blaadjes',
    favoriteFoodEmoji: '🌿',
    unlocked: false,
    hearts: 0,
    levelRequired: 1
  },
  {
    id: 'leo-leeuw',
    name: 'Leo het Leeuwtje',
    title: 'De Stoere Knuffelkoning',
    emoji: '🦁',
    color: '#FFA726',
    bgGradient: 'from-amber-200 to-yellow-300',
    soundName: 'lion',
    funFact: 'Leo oefent elke ochtend zijn brul. Een volwassen leeuwenbrul hoor je tot 8 kilometer ver!',
    favoriteFood: 'Safari Koekjes',
    favoriteFoodEmoji: '🍪',
    unlocked: false,
    hearts: 0,
    levelRequired: 2
  },
  {
    id: 'pippa-panda',
    name: 'Pippa de Panda',
    title: 'De Bamboe Acrobaat',
    emoji: '🐼',
    color: '#78909C',
    bgGradient: 'from-emerald-100 to-teal-200',
    soundName: 'general',
    funFact: 'Pippa kan koprollen maken in het gras en eet wel 12 uur per dag knapperige bamboe!',
    favoriteFood: 'Knapperige Bamboe',
    favoriteFoodEmoji: '🎋',
    unlocked: false,
    hearts: 0,
    levelRequired: 3
  },
  {
    id: 'ollie-olifant',
    name: 'Ollie het Olifantje',
    title: 'De Spetterkampioen',
    emoji: '🐘',
    color: '#90CAF9',
    bgGradient: 'from-blue-100 to-cyan-200',
    soundName: 'elephant',
    funFact: 'Ollie gebruikt zijn slurf als snorkel bij het zwemmen en kan er wel 8 liter water mee opzuigen!',
    favoriteFood: 'Zoete Watermeloen',
    favoriteFoodEmoji: '🍉',
    unlocked: false,
    hearts: 0,
    levelRequired: 4
  },
  {
    id: 'mimi-aap',
    name: 'Mimi het Aapje',
    title: 'De Vrolijke Slingerheld',
    emoji: '🐒',
    color: '#A1887F',
    bgGradient: 'from-amber-100 to-lime-200',
    soundName: 'general',
    funFact: 'Mimi kan balanceren op één teentje en deelt graag rijpe banaantjes met Boerin Tess!',
    favoriteFood: 'Rijpe Bananen',
    favoriteFoodEmoji: '🍌',
    unlocked: false,
    hearts: 0,
    levelRequired: 5
  },
  {
    id: 'zara-zebra',
    name: 'Zara de Zebra',
    title: 'De Streepjes Kampioen',
    emoji: '🦓',
    color: '#78909C',
    bgGradient: 'from-slate-100 to-stone-200',
    soundName: 'general',
    funFact: 'Geen twee zebra’s hebben hetzelfde streepjespatroon; ze zijn net zo uniek als een vingerafdruk!',
    favoriteFood: 'Mals Steppegras',
    favoriteFoodEmoji: '🌾',
    unlocked: false,
    hearts: 0,
    levelRequired: 6
  },
  {
    id: 'koko-kangoeroe',
    name: 'Koko de Kangoeroe',
    title: 'De Hoogspring Meester',
    emoji: '🦘',
    color: '#D7CCC8',
    bgGradient: 'from-amber-100 to-yellow-200',
    soundName: 'general',
    funFact: 'Koko kan met één sprong wel 8 meter ver springen en gebruikt haar staart voor evenwicht!',
    favoriteFood: 'Knapperige Wortels',
    favoriteFoodEmoji: '🥕',
    unlocked: false,
    hearts: 0,
    levelRequired: 7
  },
  {
    id: 'fifi-flamingo',
    name: 'Fifi de Flamingo',
    title: 'De Roze Danseres',
    emoji: '🦩',
    color: '#F48FB1',
    bgGradient: 'from-pink-100 to-rose-200',
    soundName: 'general',
    funFact: 'Fifi krijgt haar roze kleur door het speciale eten (kleine kreeftjes en algen) in het water!',
    favoriteFood: 'Roze Bessen',
    favoriteFoodEmoji: '🍓',
    unlocked: false,
    hearts: 0,
    levelRequired: 8
  },
  {
    id: 'boris-bever',
    name: 'Boris de Bouwbever',
    title: 'De Meester Ingenieur',
    emoji: '🦫',
    color: '#8D6E63',
    bgGradient: 'from-amber-200 to-orange-200',
    soundName: 'general',
    funFact: 'De tanden van Boris stoppen nooit met groeien en zijn oranje door het sterke ijzer erin!',
    favoriteFood: 'Houtknaag Stengels',
    favoriteFoodEmoji: '🪵',
    unlocked: false,
    hearts: 0,
    levelRequired: 9
  },
  {
    id: 'sterre-eenhoorn',
    name: 'Sterre het Wonder-Veulen',
    title: 'De Magische Safari Beschermer',
    emoji: '🦄',
    color: '#CE93D8',
    bgGradient: 'from-purple-100 via-pink-100 to-amber-100',
    soundName: 'general',
    funFact: 'Sterre laat een spoor van fonkelende glittersterretjes achter als ze door het Safaripark galoppeert!',
    favoriteFood: 'Regenboog Appels',
    favoriteFoodEmoji: '🍎',
    unlocked: false,
    hearts: 0,
    levelRequired: 10
  }
];

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'first-step',
    name: 'Eerste Safari Stap',
    description: 'Beantwoord je allereerste vraag goed!',
    emoji: '🌱',
    unlocked: false,
    condition: 'Beantwoord 1 vraag goed',
    category: 'spelling'
  },
  {
    id: 'streak-3',
    name: 'Speurneus Tess',
    description: '3 goede antwoorden achter elkaar!',
    emoji: '🔥',
    unlocked: false,
    condition: '3 antwoorden streak',
    category: 'streaks'
  },
  {
    id: 'streak-5',
    name: 'Super Safari Ster',
    description: '5 goede antwoorden achter elkaar!',
    emoji: '⚡',
    unlocked: false,
    condition: '5 antwoorden streak',
    category: 'streaks'
  },
  {
    id: 'streak-10',
    name: 'Onstuitbare Kampioen',
    description: '10 goede antwoorden achter elkaar!',
    emoji: '💎',
    unlocked: false,
    condition: '10 antwoorden streak',
    category: 'streaks'
  },
  {
    id: 'reading-star',
    name: 'Boekenwurm Safari',
    description: 'Beantwoord 5 begrijpend lezen vragen goed!',
    emoji: '📖',
    unlocked: false,
    condition: '5 begrijpend lezen vragen',
    category: 'spelling'
  },
  {
    id: 'gigi-friend',
    name: 'Gigi Giraf Vriendin',
    description: 'Speel Gigi de Baby-Giraf vrij!',
    emoji: '🦒',
    unlocked: false,
    condition: 'Voltooi Level 1',
    category: 'safari'
  },
  {
    id: 'leo-friend',
    name: 'Leeuwen Knuffelaar',
    description: 'Speel Leo het Leeuwtje vrij!',
    emoji: '🦁',
    unlocked: false,
    condition: 'Voltooi Level 2',
    category: 'safari'
  },
  {
    id: 'pippa-friend',
    name: 'Bamboe Maatje',
    description: 'Speel Pippa de Panda vrij!',
    emoji: '🐼',
    unlocked: false,
    condition: 'Voltooi Level 3',
    category: 'safari'
  },
  {
    id: 'zara-friend',
    name: 'Streepjes Speurder',
    description: 'Speel Zara de Zebra vrij!',
    emoji: '🦓',
    unlocked: false,
    condition: 'Voltooi Level 6',
    category: 'safari'
  },
  {
    id: 'master-feeder',
    name: 'Dieren Smulbaas',
    description: 'Voer de dieren in je park minstens 5 keer!',
    emoji: '🍏',
    unlocked: false,
    condition: 'Voer 5 keer een dier',
    category: 'feeding'
  },
  {
    id: 'spelling-champ',
    name: 'Taal & Spellings Wonder',
    description: 'Beantwoord 15 vragen foutloos!',
    emoji: '⭐',
    unlocked: false,
    condition: '15 goede antwoorden totaal',
    category: 'spelling'
  },
  {
    id: 'safari-director',
    name: 'Safari Park Directeur',
    description: 'Verzamel alle dieren in je safaripark!',
    emoji: '🏆',
    unlocked: false,
    condition: 'Speel alle dieren vrij',
    category: 'safari'
  }
];

export const GAME_LEVELS: Level[] = [
  // ==========================================
  // LEVEL 1: Gigi Giraf (Groep 4-5 Basis & Langermaakwoorden)
  // ==========================================
  {
    id: 1,
    name: 'De Zonnige Savanne',
    theme: 'Langermaakwoorden & Verwijswoorden (Groep 4-5)',
    themeColor: '#FF9800',
    bannerEmoji: '🦒🌾',
    introStory: 'Boerin Tess wandelt door het goudgele gras. Achter een acacia-boompje ziet ze een vrolijk girafje met grote nieuwsgierige kijkers!',
    animalReward: INITIAL_ANIMALS[0],
    questions: [
      {
        id: 'q1-1',
        category: '🔤 Spelling (Langermaakwoord d/t)',
        categoryIcon: '🔤',
        gradeBadge: 'Groep 4-5',
        shortStory: 'Gigi hoort in de verte een hond blaffen bij het hek.',
        question: "Wat is het juiste meervoud van 'hond' en hoe schrijf je het?",
        type: 'choice',
        options: ['Honden (je hoort een d)', 'Honten', 'Hontten'],
        correctOptionIndex: 0,
        hint: "Maak het woord langer: één hond, twee hon...?",
        explanation: "Goed zo! Als je 'honden' langer maakt, hoor je duidelijk de letter 'd'!"
      },
      {
        id: 'q1-2',
        category: '🧩 Woord Bouwer (Spelling)',
        categoryIcon: '🧩',
        gradeBadge: 'Groep 4',
        shortStory: 'Het girafje zoekt lekker vers groen voor het ontbijt.',
        question: "Klik op de letters om het woord 'BLAD' te spellen:",
        type: 'spell',
        targetWord: 'BLAD',
        scrambledLetters: ['D', 'B', 'A', 'L', 'O', 'S'],
        hint: "B - L - A - D (één blad, twee bladeren)",
        explanation: "Super! Eén blad, twee bladeren. Dus met een 'd'!"
      },
      {
        id: 'q1-3',
        category: '📖 Begrijpend Lezen & Verwijswoorden',
        categoryIcon: '📖',
        gradeBadge: 'Begrijpend Lezen',
        passage: "Gigi de baby-giraf kijkt Boerin Tess vrolijk aan. Hij zwaait met zijn pluizige oortjes en stapt voorzichtig naar voren. Tess lacht en pakt een takje verse blaadjes.",
        question: "Naar wie verwijst het woordje 'Hij' in de tweede zin?",
        type: 'choice',
        options: ['Naar Gigi de baby-giraf', 'Naar Boerin Tess', 'Naar de boom'],
        correctOptionIndex: 0,
        hint: "Wie zwaait er met zijn pluizige oortjes?",
        explanation: "Heel scherp! 'Hij' verwijst naar het girafje Gigi."
      },
      {
        id: 'q1-4',
        category: '🔤 Spelling (Langermaakwoord b/p)',
        categoryIcon: '🔤',
        gradeBadge: 'Groep 5',
        shortStory: 'Bij het water loopt een klein beestje met scharen.',
        question: "Hoe schrijf je 'krab' en 'krabben'?",
        type: 'choice',
        options: ['Krab (met een b, want krab-ben)', 'Krap (met een p)', 'Krabb (met dubbel b)'],
        correctOptionIndex: 0,
        hint: "Maak het langer: één krab, twee krab-ben!",
        explanation: "Uitstekend! Omdat je bij 'krabben' een b hoort, schrijf je 'krab' met een b!"
      },
      {
        id: 'q1-5',
        category: '📖 Begrijpend Lezen (Oorzaak & Gevolg)',
        categoryIcon: '📖',
        gradeBadge: 'Begrijpend Lezen',
        passage: "De zon schijnt erg fel op de savanne. Gigi zoekt daarom een plekje onder de grote parasolboom. In de schaduw kan ze heerlijk rustig herkauwen.",
        question: "WAAROM gaat Gigi onder de parasolboom staan?",
        type: 'choice',
        options: [
          'Omdat de zon fel schijnt en ze schaduw zoekt',
          'Omdat ze bang is voor de regen',
          'Omdat ze wil gaan slapen in het donker'
        ],
        correctOptionIndex: 0,
        hint: "Kijk naar het begin: 'De zon schijnt erg fel...'",
        explanation: "Super! Het felle zonlicht is de oorzaak, en schaduw zoeken het gevolg."
      },
      {
        id: 'q1-6',
        category: '🧩 Woord Bouwer (Spelling)',
        categoryIcon: '🧩',
        gradeBadge: 'Groep 4-5',
        shortStory: 'Gigi eet het liefste van de hoogste tak.',
        question: "Spel het woord 'HOOG':",
        type: 'spell',
        targetWord: 'HOOG',
        scrambledLetters: ['O', 'H', 'G', 'O', 'K', 'T'],
        hint: "H - O - O - G (lange klank)",
        explanation: "Keurig! Hoog schrijf je met dubbel o en een g!"
      }
    ]
  },

  // ==========================================
  // LEVEL 2: Leo Leeuw (Groep 4-5 Verkleinwoorden & Bijvoeglijk Naamwoord)
  // ==========================================
  {
    id: 2,
    name: 'Het Gouden Zandduin',
    theme: 'Verkleinwoorden, Bijvoeglijk Naamwoord & Zinsbegrip',
    themeColor: '#F57C00',
    bannerEmoji: '🦁☀️',
    introStory: 'In het warme zand rolt een speels goudgeel leeuwtje rond. Hij zoekt zijn favoriete knuffelbal!',
    animalReward: INITIAL_ANIMALS[1],
    questions: [
      {
        id: 'q2-1',
        category: '🔤 Spelling (Verkleinwoorden)',
        categoryIcon: '🔤',
        gradeBadge: 'Groep 4',
        shortStory: 'Leo is nog maar een klein katje van de savanne.',
        question: "Wat is het juiste verkleinwoord van 'boom'?",
        type: 'choice',
        options: ['Boompje', 'Boomtje', 'Boomje'],
        correctOptionIndex: 0,
        hint: "Na woorden op -m plak je vaak '-pje'!",
        explanation: "Precies! Boom + pje = boompje!"
      },
      {
        id: 'q2-2',
        category: '✨ Grammatica (Bijvoeglijk Naamwoord)',
        categoryIcon: '✨',
        gradeBadge: 'Groep 5',
        shortStory: "Tess aait het zachte leeuwtje over zijn pluizige bolletje.",
        question: "Welk woord in de zin is een BIJVOEGLIJK NAAMWOORD (zegt hoe iets is)?",
        type: 'choice',
        options: ['pluizige', 'aait', 'het'],
        correctOptionIndex: 0,
        hint: "Hoe is het bolletje? Het is...",
        explanation: "Geweldig! 'Pluizige' zegt iets over het bolletje."
      },
      {
        id: 'q2-3',
        category: '🧩 Woord Bouwer (Spelling eeuw/ieuw)',
        categoryIcon: '🧩',
        gradeBadge: 'Groep 4-5',
        shortStory: 'Leo oefent zijn stoerste brul.',
        question: "Spel het woord 'LEEUW':",
        type: 'spell',
        targetWord: 'LEEUW',
        scrambledLetters: ['W', 'E', 'L', 'E', 'U', 'M'],
        hint: "Denk aan de eeu-klank: L - E - E - U - W!",
        explanation: "Wauw! Eeuw-woorden schrijf je altijd met e-e-u-w!"
      },
      {
        id: 'q2-4',
        category: '🔤 Spelling (Verkleinwoorden met -etje)',
        categoryIcon: '🔤',
        gradeBadge: 'Groep 5',
        shortStory: 'In het gras kruipt een heel klein diertje met een schild.',
        question: "Wat is het verkleinwoord van 'bal'?",
        type: 'choice',
        options: ['Balletje (korte klank verdubbelt de l)', 'Baltje', 'Balje'],
        correctOptionIndex: 0,
        hint: "De 'a' is kort, dus dubbele l + etje!",
        explanation: "Top! Korte klinker + l/m/n/r/ng krijgt '-etje': balletje, mannetje, zonnetje!"
      },
      {
        id: 'q2-5',
        category: '📖 Begrijpend Lezen (Details Vinden)',
        categoryIcon: '📖',
        gradeBadge: 'Begrijpend Lezen',
        passage: "Leeuwen leven samen in een groep die een 'troep' wordt genoemd. De leeuwinnen jagen meestal samen in de schemering, terwijl de grote mannetjes met hun donkere manen het territorium bewaken.",
        question: "Wanneer jagen de leeuwinnen meestal?",
        type: 'choice',
        options: ['In de schemering', 'Midden op de hete middag', 'Alleen in de winter'],
        correctOptionIndex: 0,
        hint: "Lees de tweede zin goed: 'De leeuwinnen jagen meestal...'",
        explanation: "Heel goed gelezen! Ze jagen in de schemering omdat het dan koeler is."
      },
      {
        id: 'q2-6',
        category: '🔤 Spelling (Woorden op -ig en -lijk)',
        categoryIcon: '🔤',
        gradeBadge: 'Groep 5',
        shortStory: 'Leo is een heel opgewekt diertje.',
        question: "Hoe schrijf je 'vrolijk'?",
        type: 'choice',
        options: ['Vrolijk (je hoort -luk, schrijft -lijk)', 'Vroluk', 'Vrolik'],
        correctOptionIndex: 0,
        hint: "Achtervoegsel -lijk klinkt als /luk/!",
        explanation: "Super! Woorden op -lijk (vrolijk, eerlijk, vriendelijk) schrijf je met -ijk!"
      }
    ]
  },

  // ==========================================
  // LEVEL 3: Pippa Panda (Groep 4-5 Klankgroepen & Werkwoorden)
  // ==========================================
  {
    id: 3,
    name: 'Het Groene Bamboebos',
    theme: 'Klankgroepen (Korte & Lange Klanken) & Werkwoorden',
    themeColor: '#2E7D32',
    bannerEmoji: '🐼🎋',
    introStory: 'Tussen de frisgroene bamboestengels zit Pippa de panda vrolijk te schommelen aan een tak.',
    animalReward: INITIAL_ANIMALS[2],
    questions: [
      {
        id: 'q3-1',
        category: '🔤 Spelling (Korte Klank / Verdubbeling)',
        categoryIcon: '🔤',
        gradeBadge: 'Groep 4-5',
        shortStory: 'Pippa breekt twee dunne takken af voor haar lunch.',
        question: "Hoe schrijf je het meervoud van 'tak'?",
        type: 'choice',
        options: ['Takken (met dubbel k)', 'Taken (met 1 k)', 'Takkens'],
        correctOptionIndex: 0,
        hint: "De 'a' klinkt kort (tak-ken), dus de klinkerdief komt niet en de medeklinker verdubbelt!",
        explanation: "Topper! Korte klank 'a' = twee k's: takken!"
      },
      {
        id: 'q3-2',
        category: '🏃 Grammatica (Doewoorden / Werkwoorden)',
        categoryIcon: '🏃',
        gradeBadge: 'Groep 4-5',
        shortStory: "Pippa knabbelt rustig op een vers bamboeblaadje.",
        question: "Welk woord is het WERKWOORD (wat iemand doet)?",
        type: 'choice',
        options: ['Knabbelt', 'Pippa', 'Blaadje'],
        correctOptionIndex: 0,
        hint: "Wat is de actie die Pippa doet?",
        explanation: "Jazeker! 'Knabbelen' is een actie, dus een werkwoord!"
      },
      {
        id: 'q3-3',
        category: '📖 Begrijpend Lezen (Tekstbegrip)',
        categoryIcon: '📖',
        gradeBadge: 'Begrijpend Lezen',
        passage: "Reuzenpanda's hebben een speciale 'valse duim'. Dit is een extra botje aan hun pols waarmee ze bamboestengels stevig kunnen vastpakken, net zoals mensen een potlood vasthouden.",
        question: "Waarom is de 'valse duim' zo handig voor Pippa?",
        type: 'choice',
        options: [
          'Om bamboestengels stevig mee vast te pakken',
          'Om heel snel in bomen te sprinten',
          'Om er water mee op te scheppen'
        ],
        correctOptionIndex: 0,
        hint: "Lees de tekst: 'waarmee ze bamboestengels stevig kunnen...'",
        explanation: "Fantastisch! De duim helpt om het bamboe goed vast te klemmen."
      },
      {
        id: 'q3-4',
        category: '🔤 Spelling (Lange Klank / Verenkeling)',
        categoryIcon: '🔤',
        gradeBadge: 'Groep 5',
        shortStory: 'Er groeien prachtige hoge bomen in het bos.',
        question: "Wat is het meervoud van 'boom'?",
        type: 'choice',
        options: ['Bomen (1 klinker, 1 medeklinker)', 'Boomen', 'Bommen'],
        correctOptionIndex: 0,
        hint: "Klankgroep bo-men: lange klank aan het eind verliest een letter!",
        explanation: "Briljant! Bo-men: je hoort /oo/, aan het eind van de klankgroep schrijf je 1 o!"
      },
      {
        id: 'q3-5',
        category: '🧩 Woord Bouwer (Spelling)',
        categoryIcon: '🧩',
        gradeBadge: 'Groep 4-5',
        shortStory: 'Pippa zit lekker in het groene bos.',
        question: "Spel het woord 'BAMBOE':",
        type: 'spell',
        targetWord: 'BAMBOE',
        scrambledLetters: ['B', 'A', 'M', 'B', 'O', 'E', 'P'],
        hint: "B - A - M - B - O - E",
        explanation: "Geweldig gespeld! Bamboe schrijf je met oe!"
      },
      {
        id: 'q3-6',
        category: '🔤 Spelling (Woorden op -teit of -heid)',
        categoryIcon: '🔤',
        gradeBadge: 'Groep 5',
        shortStory: 'Pippa is bekend om haar vrolijke karakter.',
        question: "Hoe schrijf je 'vrolijkheid'?",
        type: 'choice',
        options: ['Vrolijkheid (met korte ei en d aan het eind)', 'Vrolijkhijd', 'Vrolijkheit'],
        correctOptionIndex: 0,
        hint: "Achtervoegsel -heid schrijf je altijd met ei en d (meervoud: heden)!",
        explanation: "Top! Woorden op -heid hebben altijd een korte ei en een d!"
      }
    ]
  },

  // ==========================================
  // LEVEL 4: Ollie Olifant (Groep 4-5 Zelfstandig Naamwoord & Lidwoorden)
  // ==========================================
  {
    id: 4,
    name: 'De Vrolijke Waterpoel',
    theme: 'Zelfstandig Naamwoord, Lidwoorden (De / Het) & Rijm',
    themeColor: '#0288D1',
    bannerEmoji: '🐘💧',
    introStory: 'Plons! Een lief olifantje spuit met zijn slurfje vrolijke fonteinen water over de savanne!',
    animalReward: INITIAL_ANIMALS[3],
    questions: [
      {
        id: 'q4-1',
        category: '🏷️ Grammatica (Lidwoorden De of Het)',
        categoryIcon: '🏷️',
        gradeBadge: 'Groep 4-5',
        shortStory: 'Ollie spettert lekker in het koele water.',
        question: "Welk lidwoord hoort voor 'waterpoel'?",
        type: 'choice',
        options: ['De waterpoel', 'Het waterpoel', 'Een het waterpoel'],
        correctOptionIndex: 0,
        hint: "Zeg je 'de poel' of 'het poel'?",
        explanation: "Helemaal goed! Het is DE waterpoel!"
      },
      {
        id: 'q4-2',
        category: '🎵 Rijmen & Klanken',
        categoryIcon: '🎵',
        gradeBadge: 'Groep 4',
        shortStory: 'Ollie spuit water en maakt alles nat.',
        question: "Welk woord rijmt op 'SPAT'?",
        type: 'choice',
        options: ['NAT', 'Boom', 'Zon'],
        correctOptionIndex: 0,
        hint: "Spat - ... klinkt hetzelfde aan het einde!",
        explanation: "Ja! Spat rijmt op nat (en op mat en kat)!"
      },
      {
        id: 'q4-3',
        category: '🧩 Woord Bouwer (Spelling)',
        categoryIcon: '🧩',
        gradeBadge: 'Groep 4-5',
        shortStory: 'Ollie spuit water met zijn handige neus.',
        question: "Spel het woord 'SLURF':",
        type: 'spell',
        targetWord: 'SLURF',
        scrambledLetters: ['R', 'S', 'F', 'L', 'U', 'P'],
        hint: "S - L - U - R - F (geen stomme e ertussen!)",
        explanation: "Keigoed! Geen extra e tussen r en f: s-l-u-r-f!"
      },
      {
        id: 'q4-4',
        category: '🔤 Spelling (Woorden met cht)',
        categoryIcon: '🔤',
        gradeBadge: 'Groep 5',
        shortStory: 'Ollie drinkt water in het zachte avondlicht.',
        question: "Hoe schrijf je 'nacht' en 'licht'?",
        type: 'choice',
        options: ['Met -cht (korte klank + cht)', 'Met alleen -gt', 'Met -chtt'],
        correctOptionIndex: 0,
        hint: "Na een korte klank schrijf je bijna altijd 'cht' (behalve hij ligt, hij legt, hij zegt)!",
        explanation: "Uitstekend! Nacht, licht, bocht, lucht schrijf je met cht!"
      },
      {
        id: 'q4-5',
        category: '📖 Begrijpend Lezen (Feit & Mening)',
        categoryIcon: '📖',
        gradeBadge: 'Begrijpend Lezen',
        passage: "Olifanten kunnen met hun grote oren zwaaien om af te koelen. Tess vindt olifanten de allerliefste dieren van de hele wereld.",
        question: "Wat is in deze tekst een MENING (wat iemand vindt, niet een bewezen feit)?",
        type: 'choice',
        options: [
          'Dat olifanten de allerliefste dieren zijn',
          'Dat olifanten met hun oren zwaaien',
          'Dat oren helpen om af te koelen'
        ],
        correctOptionIndex: 0,
        hint: "Een mening herken je aan woorden zoals 'vindt' of 'allerliefste'!",
        explanation: "Knap gezien! 'De allerliefste dieren' is een mening van Tess."
      },
      {
        id: 'q4-6',
        category: '🏷️ Grammatica (Zelfstandig Naamwoord Herkennen)',
        categoryIcon: '🏷️',
        gradeBadge: 'Groep 5',
        shortStory: 'De zware olifant stapt vrolijk door de modder.',
        question: "Welke woorden zijn ZELFSTANDIGE NAAMWOORDEN in die zin?",
        type: 'choice',
        options: ['olifant & modder', 'zware & vrolijk', 'stapt & door'],
        correctOptionIndex: 0,
        hint: "Woorden waar je 'de' of 'het' voor kunt zetten en die een dier/ding zijn!",
        explanation: "Geweldig! De olifant en de modder zijn zelfstandige naamwoorden!"
      }
    ]
  },

  // ==========================================
  // LEVEL 5: Mimi het Aapje (Groep 5 Samengestelde Woorden & Tegenstellingen)
  // ==========================================
  {
    id: 5,
    name: 'De Jungle Speeltuin',
    theme: 'Samengestelde Woorden, Tegenstellingen & Open Lettergrepen',
    themeColor: '#7CB342',
    bannerEmoji: '🐒🌴',
    introStory: 'Hoog in de bomen slingert Mimi aan een liaan. Ze maakt een driedubbele salto voor Boerin Tess!',
    animalReward: INITIAL_ANIMALS[4],
    questions: [
      {
        id: 'q5-1',
        category: '🧩 Samengestelde Woorden',
        categoryIcon: '🧩',
        gradeBadge: 'Groep 4-5',
        shortStory: 'Tess ziet een mooie boog vol kleuren na een bui.',
        question: "Welke twee woorden maken samen 'regenboog'?",
        type: 'choice',
        options: ['Regen + boog', 'Rege + boog', 'Regens + boogje'],
        correctOptionIndex: 0,
        hint: "Twee hele woorden aan elkaar geplakt!",
        explanation: "Precies! Twee woorden aan elkaar: regen + boog = regenboog!"
      },
      {
        id: 'q5-2',
        category: '↔️ Woordenschat (Tegenstellingen)',
        categoryIcon: '↔️',
        gradeBadge: 'Groep 4-5',
        shortStory: 'Mimi klimt heel HOOG in de boomtop.',
        question: "Wat is het tegenovergestelde van 'HOOG'?",
        type: 'choice',
        options: ['LAAG', 'Groot', 'Ver'],
        correctOptionIndex: 0,
        hint: "Het omgekeerde van hoog is...",
        explanation: "Uitstekend! Hoog is het tegenovergestelde van laag!"
      },
      {
        id: 'q5-3',
        category: '🔤 Spelling (Open Lettergreep)',
        categoryIcon: '🔤',
        gradeBadge: 'Groep 5',
        shortStory: 'Mimi eet graag een zoete gele vrucht.',
        question: "Hoe spel je het meervoud van 'banaan'?",
        type: 'choice',
        options: ['Bananen', 'Banannen', 'Banaanen'],
        correctOptionIndex: 0,
        hint: "Ba-na-nen: de klank is lang aan het eind van de klankgroep, dus 1 a!",
        explanation: "Super slim! Lange klank aan het eind van een klankgroep = 1 klinker!"
      },
      {
        id: 'q5-4',
        category: '📖 Begrijpend Lezen (Hoofdgedachte)',
        categoryIcon: '📖',
        gradeBadge: 'Begrijpend Lezen',
        passage: "Apen gebruiken verschillende geluiden en gezichtsuitdrukkingen om met elkaar te praten. Als een aapje zijn tanden laat zien en grimast, betekent dit vaak dat hij vriendelijk is en geen ruzie wil.",
        question: "Wat is de hoofdgedachte van dit verhaaltje?",
        type: 'choice',
        options: [
          'Hoe apen met geluiden en gezichten communiceren',
          'Waarom apen graag bananen eten in de jungle',
          'Dat apen altijd ruzie zoeken'
        ],
        correctOptionIndex: 0,
        hint: "Waar gaat de hele tekst over?",
        explanation: "Spot on! De tekst legt uit hoe apen met elkaar communiceren."
      },
      {
        id: 'q5-5',
        category: '🔤 Spelling (Woorden met ei of ij)',
        categoryIcon: '🔤',
        gradeBadge: 'Groep 5',
        shortStory: 'Mimi maakt een verre tocht door de jungle.',
        question: "Schrijf je 'reizen' (op reis gaan) met een korte ei of lange ij?",
        type: 'choice',
        options: ['Korte ei (reizen / reis)', 'Lange ij (rijzen)', 'Allebei fout'],
        correctOptionIndex: 0,
        hint: "Op reis gaan schrijf je met de ei van trein en plein!",
        explanation: "Top! Reizen (vakantie/tocht) = korte ei. Rijzen (omhoog komen van brooddeeg) = lange ij!"
      },
      {
        id: 'q5-6',
        category: '🧩 Woord Bouwer (Spelling)',
        categoryIcon: '🧩',
        gradeBadge: 'Groep 4-5',
        shortStory: 'Mimi zwaait aan een sterke plant.',
        question: "Spel het woord 'LIAAN':",
        type: 'spell',
        targetWord: 'LIAAN',
        scrambledLetters: ['A', 'L', 'I', 'A', 'N', 'K'],
        hint: "L - I - A - A - N",
        explanation: "Keurig! Een liaan is een lange slingerplant!"
      }
    ]
  },

  // ==========================================
  // LEVEL 6: Zara Zebra (Groep 5 Thema: Klankgroepen & Signaalwoorden)
  // ==========================================
  {
    id: 6,
    name: 'De Gestreepte Steppe',
    theme: 'Klankgroepen (Jager / Bakker) & Signaalwoorden (Groep 5)',
    themeColor: '#455A64',
    bannerEmoji: '🦓🌾',
    introStory: 'Over de uitgestrekte savanne galoppeert Zara Zebra. Haar zwart-witte streepjes glanzen in de ochtendzon!',
    animalReward: INITIAL_ANIMALS[5],
    questions: [
      {
        id: 'q6-1',
        category: '🔤 Spelling (Jager / Bakker Regel)',
        categoryIcon: '🔤',
        gradeBadge: 'Groep 5',
        shortStory: 'Zara loopt samen met andere zebra’s over het pad.',
        question: "Welk woord is het meervoud van 'pad' (om op te lopen)?",
        type: 'choice',
        options: ['Paden (met 1 d, klankgroep pa-den)', 'Padden (met dubbel d)', 'Padens'],
        correctOptionIndex: 0,
        hint: "Pa-den: lange klank aan het eind van de klankgroep verliest een a!",
        explanation: "Juist! Paden = wandelpaden. Padden met dubbel d zijn de kikkers!"
      },
      {
        id: 'q6-2',
        category: '📖 Begrijpend Lezen (Signaalwoorden: Omdat / Want)',
        categoryIcon: '📖',
        gradeBadge: 'Begrijpend Lezen',
        passage: "Vliegen en muggen houden niet van gestreepte patronen. Wetenschappers hebben ontdekt dat zebra's strepen hebben, OMDAT ze daardoor minder vaak gestoken worden door vervelende insecten.",
        question: "Waarom hebben zebra's volgens de tekst strepen?",
        type: 'choice',
        options: [
          'Zodat insecten en vliegen hen minder snel steken',
          'Om er mooier uit te zien dan paarden',
          'Om warm te blijven in de koude nacht'
        ],
        correctOptionIndex: 0,
        hint: "Kijk direct na het woordje 'OMDAT'!",
        explanation: "Heel scherp gelezen! De strepen houden stekende insecten op afstand."
      },
      {
        id: 'q6-3',
        category: '🔤 Spelling (Woorden met au of ou)',
        categoryIcon: '🔤',
        gradeBadge: 'Groep 5',
        shortStory: 'Zara stopt bij een mooie vogel met grote veren.',
        question: "Hoe schrijf je 'pauw' (de vogel met de mooie staart)?",
        type: 'choice',
        options: ['P-a-u-w (met atje au)', 'P-o-u-w (met otje ou)', 'P-a-u'],
        correctOptionIndex: 0,
        hint: "Pauw staat op de atje-au praatplaat (pauw, saus, blauw)!",
        explanation: "Helemaal goed! Pauw schrijf je met a-u-w!"
      },
      {
        id: 'q6-4',
        category: '🧩 Woord Bouwer (Spelling)',
        categoryIcon: '🧩',
        gradeBadge: 'Groep 4-5',
        shortStory: 'Zara heeft prachtige zwarte en witte strepen.',
        question: "Spel het woord 'STREEP':",
        type: 'spell',
        targetWord: 'STREEP',
        scrambledLetters: ['P', 'S', 'T', 'R', 'E', 'E', 'N'],
        hint: "S - T - R - E - E - P",
        explanation: "Geweldig! Streep schrijf je met dubbel e!"
      },
      {
        id: 'q6-5',
        category: '🔍 Grammatica (Persoonsvorm Vinden)',
        categoryIcon: '🔍',
        gradeBadge: 'Groep 5',
        shortStory: 'Zara drinkt fris water bij de rivier.',
        question: "Wat is de PERSOONSVORM (het werkwoord dat verandert als je er een vraagzin van maakt)?",
        type: 'choice',
        options: ['drinkt (Drinkt Zara fris water...?)', 'Zara', 'water'],
        correctOptionIndex: 0,
        hint: "Maak van de zin een vraagzin: het eerste woord is de persoonsvorm!",
        explanation: "Super knap! 'Drinkt Zara fris water?' -> drinkt is de persoonsvorm!"
      },
      {
        id: 'q6-6',
        category: '🔤 Spelling (Woorden met -s of -z)',
        categoryIcon: '🔤',
        gradeBadge: 'Groep 5',
        shortStory: 'Zara loopt op haar gemak over het veld.',
        question: "Wat is het meervoud van 'huis' en 'muis'?",
        type: 'choice',
        options: ['Huizen & muizen (de s verandert in een z)', 'Huisen & muisen', 'Huissens & muissens'],
        correctOptionIndex: 0,
        hint: "In het meervoud verandert de s vaak in een zangerige z!",
        explanation: "Uitstekend! Huis -> huizen, muis -> muizen, reus -> reuzen!"
      }
    ]
  },

  // ==========================================
  // LEVEL 7: Koko Kangoeroe (Groep 5 Thema: Woordsoorten & Tekststructuur)
  // ==========================================
  {
    id: 7,
    name: 'De Rode Outback Heuvels',
    theme: 'Woordsoorten, Buidelweetjes & Samengestelde Zinnen',
    themeColor: '#E65100',
    bannerEmoji: '🦘🏜️',
    introStory: 'Boing! Boing! Met grote sprongen hopt Koko Kangoeroe over de rode heuvels. Uit haar buidel piept een klein snuitje!',
    animalReward: INITIAL_ANIMALS[6],
    questions: [
      {
        id: 'q7-1',
        category: '📖 Begrijpend Lezen (Verwijswoorden & Feiten)',
        categoryIcon: '📖',
        gradeBadge: 'Begrijpend Lezen',
        passage: "Een baby-kangoeroe heet een 'joey'. Als hij geboren wordt, is hij zo klein als een gummibeertje! Hij kruipt meteen veilig in de warme buidel van zijn moeder om melk te drinken en te groeien.",
        question: "Hoe groot is een pasgeboren baby-kangoeroe (joey)?",
        type: 'choice',
        options: [
          'Zo klein als een gummibeertje',
          'Zo groot als een voetbal',
          'Zo groot als een konijntje'
        ],
        correctOptionIndex: 0,
        hint: "Lees de tweede zin: 'is hij zo klein als een...'",
        explanation: "Geweldig gelezen! Een joey is bij de geboorte piepklein (slechts 2 cm)!"
      },
      {
        id: 'q7-2',
        category: '🔤 Spelling (Woorden met -f of -v)',
        categoryIcon: '🔤',
        gradeBadge: 'Groep 5',
        shortStory: 'Koko ziet een wolf in een boek over dieren.',
        question: "Wat is het juiste meervoud van 'wolf' en 'duif'?",
        type: 'choice',
        options: ['Wolven & duiven (de f verandert in een v)', 'Wolfen & duifen', 'Wolffs & duiffs'],
        correctOptionIndex: 0,
        hint: "De 'f' verandert in een zoemende 'v' in het meervoud!",
        explanation: "Precies! Wolf -> wolven, duif -> duiven, brief -> brieven!"
      },
      {
        id: 'q7-3',
        category: '🧩 Woord Bouwer (Spelling)',
        categoryIcon: '🧩',
        gradeBadge: 'Groep 4-5',
        shortStory: 'Koko bewaart haar kleintje op een veilige plek.',
        question: "Spel het woord 'BUIDEL':",
        type: 'spell',
        targetWord: 'BUIDEL',
        scrambledLetters: ['D', 'B', 'U', 'I', 'L', 'E', 'S'],
        hint: "B - U - I - D - E - L (met ui)",
        explanation: "Knap! Buidel schrijf je met de ui van buik!"
      },
      {
        id: 'q7-4',
        category: '🔍 Grammatica (Onderwerp Vinden)',
        categoryIcon: '🔍',
        gradeBadge: 'Groep 5',
        shortStory: 'De vrolijke kangoeroe springt over de rotsen.',
        question: "Wat is het ONDERWERP in die zin (vraag: WIE springt over de rotsen?)?",
        type: 'choice',
        options: ['De vrolijke kangoeroe', 'springt', 'over de rotsen'],
        correctOptionIndex: 0,
        hint: "Vraag: WIE + persoonsvorm (Wie springt)?",
        explanation: "Uitstekend! 'De vrolijke kangoeroe' doet het, dus dat is het onderwerp!"
      },
      {
        id: 'q7-5',
        category: '🔤 Spelling (Woorden met -lijk vs -ig)',
        categoryIcon: '🔤',
        gradeBadge: 'Groep 5',
        shortStory: 'Koko sprong heel snel en handig weg.',
        question: "Hoe schrijf je 'handig' en 'prachtig'?",
        type: 'choice',
        options: ['Handig & prachtig (met -ig)', 'Handech & prachtech', 'Handik & prachtik'],
        correctOptionIndex: 0,
        hint: "Je hoort /ug/, maar schrijft -ig!",
        explanation: "Helemaal goed! Achtervoegsel -ig schrijf je altijd met i-g!"
      },
      {
        id: 'q7-6',
        category: '📖 Begrijpend Lezen (Woordbetekenis)',
        categoryIcon: '📖',
        gradeBadge: 'Begrijpend Lezen',
        passage: "Kangoeroes kunnen niet achteruit huppelen. Vanwege hun enorme voeten en dikke staart kunnen ze zich alleen maar voorwaarts verplaatsen.",
        question: "Wat betekent het woord 'voorwaarts' in deze zin?",
        type: 'choice',
        options: ['Naar voren', 'Naar achteren', 'Naar beneden in de grond'],
        correctOptionIndex: 0,
        hint: "Het tegenovergestelde van achteruit!",
        explanation: "Super! Voorwaarts betekent naar voren toe."
      }
    ]
  },

  // ==========================================
  // LEVEL 8: Fifi Flamingo (Groep 4-5 Zinsopbouw & Klankvastheid)
  // ==========================================
  {
    id: 8,
    name: 'Het Roze Spiegellagune',
    theme: 'Hoofdletters, Leestekens & Woorden op -eer, -oor, -eur',
    themeColor: '#EC407A',
    bannerEmoji: '🦩🌺',
    introStory: 'Aan de rand van het water staat Fifi de flamingo op één pootje te balanceren als een gracieuze ballerina!',
    animalReward: INITIAL_ANIMALS[7],
    questions: [
      {
        id: 'q8-1',
        category: '✍️ Zinsopbouw & Leestekens',
        categoryIcon: '✍️',
        gradeBadge: 'Groep 4-5',
        shortStory: 'Boerin Tess schrijft in haar safari-logboek.',
        question: "Welke zin is helemaal correct geschreven met hoofdletter en leesteken?",
        type: 'choice',
        options: [
          'Tess ziet een mooie roze flamingo.',
          'tess ziet een mooie roze flamingo',
          'Tess ziet een mooie roze Flamingo'
        ],
        correctOptionIndex: 0,
        hint: "Begin met een hoofdletter en eindig met een punt!",
        explanation: "Perfect! Elke zin begint met een hoofdletter en eindigt met een leesteken."
      },
      {
        id: 'q8-2',
        category: '🔤 Spelling (Ei of Ij)',
        categoryIcon: '🔤',
        gradeBadge: 'Groep 4-5',
        shortStory: 'Fifi legt een eitje in een nest van warme klei.',
        question: "Hoe schrijf je 'ei' in 'vogel-ei' en 'klei'?",
        type: 'choice',
        options: ['Korte ei (ei)', 'Lange ij (ij)', 'Aai'],
        correctOptionIndex: 0,
        hint: "Denk aan een kippenei en boetseerklei: allebei korte ei!",
        explanation: "Helemaal juist! Ei en klei schrijf je met de korte ei!"
      },
      {
        id: 'q8-3',
        category: '🧩 Woord Bouwer (Spelling eer/oor/eur)',
        categoryIcon: '🧩',
        gradeBadge: 'Groep 4-5',
        shortStory: 'Fifi heeft een prachtige zachte vacht van veren.',
        question: "Spel het woord 'VEER':",
        type: 'spell',
        targetWord: 'VEER',
        scrambledLetters: ['R', 'E', 'V', 'E', 'N', 'T'],
        hint: "V - E - E - R",
        explanation: "Briljant! Eer-oor-eur woorden: je hoort /ir/ maar schrijft eer!"
      },
      {
        id: 'q8-4',
        category: '📖 Begrijpend Lezen (Verbanden Leggen)',
        categoryIcon: '📖',
        gradeBadge: 'Begrijpend Lezen',
        passage: "Flamingo's staan vaak op één pootje om lichaamswarmte te bewaren. Door één poot tegen hun warme buik te trekken, verliezen ze minder warmte in het koude water.",
        question: "Waarom trekt een flamingo één pootje in?",
        type: 'choice',
        options: [
          'Om lekker warm te blijven en geen warmte te verliezen',
          'Omdat haar andere pootje moe is van het stappen',
          'Om sneller visjes te vangen'
        ],
        correctOptionIndex: 0,
        hint: "Lees de eerste zin: 'om lichaamswarmte te bewaren'!",
        explanation: "Top! Het helpt ze warm te blijven."
      },
      {
        id: 'q8-5',
        category: '🔤 Spelling (Woorden met -nk en -ng)',
        categoryIcon: '🔤',
        gradeBadge: 'Groep 5',
        shortStory: 'Fifi zingt een vrolijk liedje en drinkt uit de beek.',
        question: "Wat is de regel voor de 'nk' in 'drinken' en 'plank'?",
        type: 'choice',
        options: [
          'In de plank zit geen g (dus n-k zonder g ertussen)',
          'Je schrijft altijd n-g-k',
          'Je schrijft n-c-k'
        ],
        correctOptionIndex: 0,
        hint: "Het bekende versje: 'In de plank zit geen stang, dus n-k zonder g'!",
        explanation: "Geweldig! Tussen de n en de k mag nooit een g!"
      },
      {
        id: 'q8-6',
        category: '✨ Grammatica (Trappen van Vergelijking)',
        categoryIcon: '✨',
        gradeBadge: 'Groep 5',
        shortStory: 'Tess vergelijkt de vogels in het park.',
        question: "Vul aan: mooi - mooier - ...",
        type: 'choice',
        options: ['mooist', 'mooiste', 'meest mooi'],
        correctOptionIndex: 0,
        hint: "Groot - groter - grootst. Mooi - mooier - ...",
        explanation: "Top! Mooi, mooier, mooist!"
      }
    ]
  },

  // ==========================================
  // LEVEL 9: Boris de Bever (Groep 5 Thema: Werkwoordspelling Basis & Begrijpend Lezen)
  // ==========================================
  {
    id: 9,
    name: 'De Kristalheldere Rivier',
    theme: 'Werkwoordspelling Tegenwoordige Tijd (Stam + t) & Samenvattingen',
    themeColor: '#795548',
    bannerEmoji: '🦫🪵',
    introStory: 'Klots, klots! Boris de Bever sleept met stevige takken door het kabbelende beekje. Hij bouwt een prachtige burcht voor alle safaridieren!',
    animalReward: INITIAL_ANIMALS[8],
    questions: [
      {
        id: 'q9-1',
        category: '⚡ Werkwoordspelling (Tegenwoordige Tijd)',
        categoryIcon: '⚡',
        gradeBadge: 'Groep 5',
        shortStory: 'Boris bouwt vandaag een nieuwe dam.',
        question: "Kies de juiste spelling: 'Boris ___ een stevige tak.' (werkwoord: vinden)",
        type: 'choice',
        options: ['vindt (stam vind + t)', 'vind', 'vint'],
        correctOptionIndex: 0,
        hint: "Boris is een 'hij' -> stam + t. De stam van vinden is vind + t = vindt!",
        explanation: "Heel knap! Hij-vorm in de tegenwoordige tijd = stam + t (vind + t = vindt)!"
      },
      {
        id: 'q9-2',
        category: '📖 Begrijpend Lezen (Vind de Samenvatting)',
        categoryIcon: '📖',
        gradeBadge: 'Begrijpend Lezen',
        passage: "Beverburchten hebben een geheime ingang onder water. Zo kunnen roofdieren zoals wolven en beren nooit zomaar naar binnen glippen. Binnenin is een droge en gezellige woonkamer met zacht mos.",
        question: "Waarom zit de ingang van een beverburcht onder water?",
        type: 'choice',
        options: [
          'Zodat roofdieren niet zomaar binnen kunnen komen',
          'Omdat bevers alleen maar onder water kunnen slapen',
          'Om de woonkamer lekker nat te houden'
        ],
        correctOptionIndex: 0,
        hint: "Lees de tweede zin over de roofdieren!",
        explanation: "Uitstekend! De onderwaterdeur beschermt de familie bever tegen gevaar."
      },
      {
        id: 'q9-3',
        category: '🔤 Spelling (Stoffelijk Bijvoeglijk Naamwoord)',
        categoryIcon: '🔤',
        gradeBadge: 'Groep 5',
        shortStory: 'De dam is gemaakt van dikke takken van hout.',
        question: "Hoe schrijf je: 'een ___ dam' (gemaakt van hout)?",
        type: 'choice',
        options: ['houten (met -en aan het eind)', 'houte', 'houtte'],
        correctOptionIndex: 0,
        hint: "Stoffelijke bijvoeglijke naamwoorden (hout, goud, zilver) krijgen bijna altijd -en!",
        explanation: "Super! Houten, gouden, zilveren, stenen krijgen altijd -en!"
      },
      {
        id: 'q9-4',
        category: '🧩 Woord Bouwer (Spelling)',
        categoryIcon: '🧩',
        gradeBadge: 'Groep 4-5',
        shortStory: 'Boris bouwt een veilig huisje.',
        question: "Spel het woord 'BURCHT':",
        type: 'spell',
        targetWord: 'BURCHT',
        scrambledLetters: ['C', 'B', 'H', 'U', 'R', 'T', 'K'],
        hint: "B - U - R - C - H - T",
        explanation: "Keigoed! Burcht schrijf je met c-h-t!"
      },
      {
        id: 'q9-5',
        category: '⚡ Werkwoordspelling (Ik-vorm vs Hij-vorm)',
        categoryIcon: '⚡',
        gradeBadge: 'Groep 5',
        shortStory: 'Boris werkt hard aan de rivier.',
        question: "Vul in: 'Ik ___ hout, maar Boris ___ stenen.' (werkwoord: dragen)",
        type: 'choice',
        options: ['draag / draagt', 'draagt / draag', 'draagd / draagt'],
        correctOptionIndex: 0,
        hint: "Ik = ik-vorm (draag), Boris (hij) = stam + t (draagt)!",
        explanation: "Perfect! Ik draag, hij draagt!"
      },
      {
        id: 'q9-6',
        category: '📖 Begrijpend Lezen (Woordenschat in Context)',
        categoryIcon: '📖',
        gradeBadge: 'Begrijpend Lezen',
        passage: "Bevers zijn echte 'sleutelsoorten'. Door hun dammen ontstaan er rustige vijvertjes waarin kikkers, vissen, eenden en libellen kunnen floreren en een fijn thuis vinden.",
        question: "Wat gebeurt er dankzij de dammen van bevers?",
        type: 'choice',
        options: [
          'Er ontstaan vijvertjes waarin allerlei andere dieren kunnen leven',
          'Het hele bos verdroogt en alle bomen sterven af',
          'De rivier verdwijnt voorgoed'
        ],
        correctOptionIndex: 0,
        hint: "Kijk naar de tweede zin: 'waarin kikkers, vissen, eenden... een thuis vinden'!",
        explanation: "Geweldig! Bevers helpen de hele natuur door vijvers te creëren."
      }
    ]
  },

  // ==========================================
  // LEVEL 10: Sterre het Wonder-Veulen (Grand Finale Safari Meesterproef)
  // ==========================================
  {
    id: 10,
    name: 'De Magische Regenboog Oase',
    theme: 'De Grote Safari Meesterproef (Groep 4 & 5 Diploma)',
    themeColor: '#AB47BC',
    bannerEmoji: '🦄🌈',
    introStory: 'Onder een stralende dubbele regenboog verschijnt Sterre, het wonder-veulen! Samen met Boerin Tess vieren alle geredde dieren een groot feest in het Safaripark!',
    animalReward: INITIAL_ANIMALS[9],
    questions: [
      {
        id: 'q10-1',
        category: '🌟 Meesterproef (Alle Woordsoorten)',
        categoryIcon: '🌟',
        gradeBadge: 'Groep 5 Meester',
        shortStory: "Sterre springt sierlijk over de gouden heuvels.",
        question: "Benoem de woorden: 'Sterre' (1), 'springt' (2), 'sierlijk' (3), 'heuvels' (4):",
        type: 'choice',
        options: [
          '1=Zelfstandig Nw, 2=Werkwoord, 3=Bijvoeglijk Nw / Bijwoord, 4=Zelfstandig Nw',
          '1=Werkwoord, 2=Zelfstandig Nw, 3=Lidwoord, 4=Werkwoord',
          'Alles is een werkwoord'
        ],
        correctOptionIndex: 0,
        hint: "Sterre en heuvels zijn namen/dingen, springt is wat ze doet, sierlijk zegt hoe ze het doet!",
        explanation: "Fantastisch meesterschap! Je herkent alle woordsoorten moeiteloos!"
      },
      {
        id: 'q10-2',
        category: '🔤 Spelling (Klinker- en Medeklinker Dief)',
        categoryIcon: '🔤',
        gradeBadge: 'Groep 5',
        shortStory: 'Kies de juiste spelling van beide woorden.',
        question: "Welke regel klopt helemaal?",
        type: 'choice',
        options: [
          'bakker (korte klank verdubbelt) & jager (lange klank verenkeling)',
          'baker (met 1 k) & jaager (met dubbel a)',
          'bakkerr & jagerrr'
        ],
        correctOptionIndex: 0,
        hint: "Korte klank = dubbele medeklinker. Lange klank = 1 klinker!",
        explanation: "Geweldig! De bakker/jager regel is de belangrijkste regel van Groep 4 en 5!"
      },
      {
        id: 'q10-3',
        category: '📖 Begrijpend Lezen (Hoofdgedachte & Boodschap)',
        categoryIcon: '📖',
        gradeBadge: 'Begrijpend Lezen',
        passage: "Boerin Tess kijkt met een grote glimlach over het Safaripark. Alle dieren hebben een veilig thuis, vers eten en lieve vriendjes om mee te spelen. Door samen te werken en goed voor de natuur te zorgen, is het Safaripark het mooiste park op aarde geworden.",
        question: "Wat is de belangrijkste les van Boerin Tess haar safariavontuur?",
        type: 'choice',
        options: [
          'Dat dierenliefde, samenwerken en voor de natuur zorgen alles mooier maakt',
          'Dat dieren liever helemaal alleen in het donker wonen',
          'Dat je dieren nooit eten moet geven'
        ],
        correctOptionIndex: 0,
        hint: "Kijk naar de zin over 'samenwerken en goed voor de natuur zorgen'!",
        explanation: "Prachtig begrepen! Je bent een echte natuurbeschermer en safarivriend!"
      },
      {
        id: 'q10-4',
        category: '⚡ Werkwoordspelling (Persoonsvorm T.T.)',
        categoryIcon: '⚡',
        gradeBadge: 'Groep 5',
        shortStory: 'Sterre helpt iedereen in nood.',
        question: "Wat is de juiste spelling: 'Het veulen ___ vrolijk door het gras.' (werkwoord: huppelen)",
        type: 'choice',
        options: ['huppelt (stam huppel + t)', 'huppel', 'huppeld'],
        correctOptionIndex: 0,
        hint: "Het veulen (hij/het) krijgt stam + t!",
        explanation: "Briljant! Stam van huppelen is huppel + t = huppelt!"
      },
      {
        id: 'q10-5',
        category: '🧩 Woord Bouwer (Spelling Finale)',
        categoryIcon: '🧩',
        gradeBadge: 'Meester Speller',
        shortStory: 'Sterre brengt geluk aan iedereen.',
        question: "Spel het woord 'MAGISCH':",
        type: 'spell',
        targetWord: 'MAGISCH',
        scrambledLetters: ['S', 'M', 'G', 'A', 'I', 'C', 'H', 'P'],
        hint: "M - A - G - I - S - C - H (woorden op -isch!)",
        explanation: "Fenomenaal! Woorden op -isch (magisch, tropisch, fantastisch) schrijf je met i-s-c-h!"
      },
      {
        id: 'q10-6',
        category: '🏆 Het Grote Safari Taal Diploma',
        categoryIcon: '🏆',
        gradeBadge: 'Diploma Vraag',
        shortStory: 'Tess en Sterre feliciteren jou!',
        question: "Welke zin is grammaticaal en qua spelling 100% vlekkeloos?",
        type: 'choice',
        options: [
          'Wij hebben vandaag fantastisch veel geleerd in het mooie safaripark.',
          'wij hebbe vandaag veel geleert in het safaripark',
          'Wij heeft vandaag veel geleerd in het safaripark'
        ],
        correctOptionIndex: 0,
        hint: "Let op hoofdletter, punt, meervoudsvorm (wij hebben) en voltooid deelwoord (geleerd)!",
        explanation: "GEFELICITEERD! 🎉 Je hebt de volledige Groep 4 & 5 Meesterproef met glans behaald!"
      }
    ]
  }
];

export const FOOD_ITEMS = [
  { id: 'apple', name: 'Appeltje', emoji: '🍎', cost: 15, heartsGiven: 2 },
  { id: 'bamboo', name: 'Bamboetak', emoji: '🎋', cost: 20, heartsGiven: 3 },
  { id: 'leaf', name: 'Vers Blaadje', emoji: '🌿', cost: 10, heartsGiven: 1 },
  { id: 'banana', name: 'Banaantje', emoji: '🍌', cost: 20, heartsGiven: 3 },
  { id: 'cookie', name: 'Safarikoekje', emoji: '🍪', cost: 25, heartsGiven: 4 },
  { id: 'carrot', name: 'Knapperige Wortel', emoji: '🥕', cost: 15, heartsGiven: 2 },
  { id: 'watermelon', name: 'Zoete Meloen', emoji: '🍉', cost: 30, heartsGiven: 4 },
  { id: 'star_snack', name: 'Magische Ster', emoji: '⭐', cost: 35, heartsGiven: 5 }
];
