import { Level, BiomeType } from '../types';
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

const findAnimal = (id: string) => {
  const resolvedId = ANIMAL_ALIASES[id] || id;
  const a = ALL_BIOME_ANIMALS.find(item => item.id === resolvedId || item.id === id);
  if (a) return a;
  return ALL_BIOME_ANIMALS[0];
};

export const BIOME_LEVELS_GROEP_4_5: Record<BiomeType, Level[]> = {
  // ==========================================
  // 1. BOERDERIJ (FARM) - BRAND NEW QUESTIONS
  // ==========================================
  farm: [
    {
      id: 1,
      name: 'Bella’s Klavertjesweide',
      biome: 'farm',
      theme: 'Korte en Lange Klanken (Bomen vs Bommen)',
      themeColor: '#4CAF50',
      bannerEmoji: '🐮',
      chapterTitle: 'Hoofdstuk 1: Dauwdruppels op het Gras',
      introStory: 'De haan kraait en de zon komt op boven de molen. Bella de koe kauwt rustig op sappige klaver: "Moeh! Help je me de verse woorden van de boerderij goed te spellen?"',
      animalReward: findAnimal('bella-koe'),
      questions: [
        {
          id: 'farm45-new-1-1',
          category: 'Klinkerdief Regel',
          categoryIcon: '🐮',
          question: 'Kies het juiste woord: Langs het weiland staan honderd hoge ___.',
          type: 'choice',
          options: ['bomen', 'boomen', 'boommen'],
          correctOptionIndex: 0,
          hint: 'Klankgroep bo-men: je hoort een lange /oo/, maar aan het einde van de klankgroep pikt de klinkerdief er eentje weg!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'farm45-new-1-2',
          category: 'Dubbelzetter Regel',
          categoryIcon: '🥛',
          question: 'Welk woord is juist gespeld: De boerin plukt sappige rode ___ in de boomgaard.',
          type: 'choice',
          options: ['besen', 'bessen', 'bezen'],
          correctOptionIndex: 1,
          hint: 'Klankgroep bes-sen: korte /e/ klank, dus je schrijft twee s-en (de dubbelzetter)!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'farm45-new-1-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel het woord voor het witte drankje uit de uier:',
          type: 'spell',
          targetWord: 'MELK',
          scrambledLetters: ['M', 'E', 'L', 'K'],
          hint: 'Je hoort me-lek, maar het is een speciaal hakwoord zonder e!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'farm45-new-1-4',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Waarom grazen koeien vaak in een groep samen?',
          passage: 'Koeien zijn sociale kuddedieren. Als ze samen in de wei staan voelen ze zich veilig en kalm. Ze waarschuwen elkaar met zachte loeigeluiden als er gevaar dreigt.',
          type: 'choice',
          options: ['Omdat ze zich samen veilig en kalm voelen', 'Omdat ze niet alleen kunnen slapen', 'Om sneller te kunnen springen'],
          correctOptionIndex: 0,
          hint: 'Lees de tweede zin in de tekst goed.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    },
    {
      id: 2,
      name: 'Knorrie’s Modderpoel',
      biome: 'farm',
      theme: 'Woorden met -d of -t (Hond/Kat)',
      themeColor: '#8D6E63',
      bannerEmoji: '🐷',
      chapterTitle: 'Hoofdstuk 2: Vrolijk Geknor in het Zand',
      introStory: 'Knorrie het varkentje plonst in een modderpoel om lekker af te koelen. "Knor knor! Weet jij of je een woord met een d of een t schrijft?"',
      animalReward: findAnimal('knorrie-varken'),
      questions: [
        {
          id: 'farm45-new-2-1',
          category: 'Langermaakwoord',
          categoryIcon: '🐷',
          question: 'Kies de juiste spelling: De trouwe ___ waakt over het erf.',
          type: 'choice',
          options: ['hond', 'hont', 'hontt'],
          correctOptionIndex: 0,
          hint: 'Maak het woord langer: één hond, twee hon-den. Je hoort een d, dus je schrijft een d!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'farm45-new-2-2',
          category: 'Langermaakwoord',
          categoryIcon: '🌾',
          question: 'Welk woord is juist: Het pasgeboren kalfje heeft een zachte ___.',
          type: 'choice',
          options: ['huyd', 'huid', 'huit'],
          correctOptionIndex: 1,
          hint: 'Langer maken: hui-den. Je hoort een d en het is de korte /ui/.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'farm45-new-2-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel het woord voor het dier met een krulstaart:',
          type: 'spell',
          targetWord: 'VARKEN',
          scrambledLetters: ['V', 'A', 'R', 'K', 'E', 'N'],
          hint: 'Begint met de scherpe V en heeft 6 letters.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'farm45-new-2-4',
          category: 'Woordenschat & Synoniemen',
          categoryIcon: '💡',
          question: 'Wat betekent het spreekwoord "als een vis in het water zijn"?',
          type: 'choice',
          options: ['Je ergens helemaal thuis en op je gemak voelen', 'Heel diep kunnen duiken', 'Geen dorst hebben'],
          correctOptionIndex: 0,
          hint: 'Een vis voelt zich nergens beter dan in het water!',
          gradeBadge: 'Spreekwoorden'
        }
      ]
    },
    {
      id: 3,
      name: 'Wollie’s Schapenberg',
      biome: 'farm',
      theme: 'Woorden met ng en nk',
      themeColor: '#795548',
      bannerEmoji: '🐑',
      chapterTitle: 'Hoofdstuk 3: Zachte Wollen Dekens',
      introStory: 'Wollie het schaap staat op de groene heuvel. De wind waait door haar dikke vacht: "Bèèèh! Ken jij de regel van de zingende ng en de plank-nk?"',
      animalReward: findAnimal('wollie-schaap'),
      questions: [
        {
          id: 'farm45-new-3-1',
          category: 'Zingwoord & Plankwoord',
          categoryIcon: '🐑',
          question: 'Kies het juiste woord: De herdershond rent ___ over het veld.',
          type: 'choice',
          options: ['vlug', 'vlugg', 'vlugk'],
          correctOptionIndex: 0,
          hint: 'Vlug schrijf je gewoon met een g aan het eind.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'farm45-new-3-2',
          category: 'Plankwoord Regel',
          categoryIcon: '🪵',
          question: 'Kies het juist gespelde woord: Op het grasveld staat een houten zit___.',
          type: 'choice',
          options: ['bank', 'bangk', 'bangck'],
          correctOptionIndex: 0,
          hint: 'Plankwoord: daar mag geen g tussen!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'farm45-new-3-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel het woord voor de warme vacht van het schaap:',
          type: 'spell',
          targetWord: 'WOL',
          scrambledLetters: ['W', 'O', 'L'],
          hint: 'Drie letters: W - O - L.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'farm45-new-3-4',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Waarom worden schapen in het voorjaar geschoren?',
          passage: 'In de lente wordt het warmer buiten. De dikke wollen vacht is dan te heet voor het schaap. Door de wol te scheren blijft het dier lekker koel en kunnen mensen er warme truien van breien.',
          type: 'choice',
          options: ['Zodat ze het in de warme lente niet te heet krijgen', 'Omdat schapen niet van wol houden', 'Om sneller te kunnen eten'],
          correctOptionIndex: 0,
          hint: 'Lees waarom de schapen het anders te warm krijgen in de lente.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    },
    {
      id: 4,
      name: 'Pico’s Kippenren',
      biome: 'farm',
      theme: 'Woorden met ch en g (Lucht / Lachen)',
      themeColor: '#FF9800',
      bannerEmoji: '🐔',
      chapterTitle: 'Hoofdstuk 4: Kakelend Avontuur',
      introStory: 'Pico de kip pikt graantjes op het erf. "Tok tok tok! Heb jij scherpe ogen voor woorden met ch en g?"',
      animalReward: findAnimal('pico-kip'),
      questions: [
        {
          id: 'farm45-new-4-1',
          category: 'Luchtwoord Regel',
          categoryIcon: '🐔',
          question: 'Kies het juiste woord: De zon schijnt hoog in de blauwe ___.',
          type: 'choice',
          options: ['lugt', 'lucht', 'lught'],
          correctOptionIndex: 1,
          hint: 'Luchtwoord: korte klank /u/ + cht (behalve bij hij ligt, hij legt, hij zegt).',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'farm45-new-4-2',
          category: 'Eieren & Klanken',
          categoryIcon: '🥚',
          question: 'Welk woord is juist: Pico legt elke ochtend een vers ___.',
          type: 'choice',
          options: ['eij', 'ei', 'ij'],
          correctOptionIndex: 1,
          hint: 'Een kippenei schrijf je met de korte ei van de ei-plaat!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'farm45-new-4-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel het woord voor de trotse vogel die kraait:',
          type: 'spell',
          targetWord: 'HAAN',
          scrambledLetters: ['H', 'A', 'A', 'N'],
          hint: 'H - AA - N (vier letters).',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'farm45-new-4-4',
          category: 'Taal & Zinsbouw',
          categoryIcon: '🔍',
          question: 'Wat is het werkwoord (de doe-handeling) in deze zin: "De kippen pikken graan in het zand."',
          type: 'choice',
          options: ['pikken', 'kippen', 'graan'],
          correctOptionIndex: 0,
          hint: 'Wat doen de kippen? Ze pikken!',
          gradeBadge: 'Grammatica'
        }
      ]
    },
    {
      id: 5,
      name: 'Storm’s Paardenstal',
      biome: 'farm',
      theme: 'Samenstellingen & Open Lettergrepen',
      themeColor: '#3F51B5',
      bannerEmoji: '🐴',
      chapterTitle: 'Hoofdstuk 5: Galopperen door het Zand',
      introStory: 'Storm het paard hinnikt vrolijk en schudt zijn glanzende manen. "Hinnik! Laten we samen twee woorden aan elkaar plakken tot een mooie samenstelling!"',
      animalReward: findAnimal('storm-paard'),
      questions: [
        {
          id: 'farm45-new-5-1',
          category: 'Samenstellingen',
          categoryIcon: '🐴',
          question: 'Plak de woorden aan elkaar: paard + stal = ___',
          type: 'choice',
          options: ['paardenstal', 'paardstal', 'paardestal'],
          correctOptionIndex: 0,
          hint: 'We voegen een tussenklank toe: paard + en + stal = paardenstal.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'farm45-new-5-2',
          category: 'Klinkerdief',
          categoryIcon: '🥕',
          question: 'Kies het juist gespelde woord: Storm knabbelt op oranje ___.',
          type: 'choice',
          options: ['wortelen', 'woortelen', 'worttelen'],
          correctOptionIndex: 0,
          hint: 'Wor-te-len: na de r hoor je gewoon wor-te-len met één o.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'farm45-new-5-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel het woord voor het snelle rennen van een paard:',
          type: 'spell',
          targetWord: 'GALOP',
          scrambledLetters: ['G', 'A', 'L', 'O', 'P'],
          hint: 'G - A - L - O - P (5 letters).',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'farm45-new-5-4',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Waarom dragen sommige werkpaarden hoefijzers?',
          passage: 'Paardenhoeven zijn gemaakt van keratine, net als mensennagels. Als een paard veel over harde stenen of asfalt loopt slijten de hoeven snel af. Een ijzeren hoefijzer beschermt de hoef tegen slijtage en pijn.',
          type: 'choice',
          options: ['Om de hoeven te beschermen tegen slijtage op harde wegen', 'Om sneller te kunnen springen over sloten', 'Omdat paarden van glimmende schoenen houden'],
          correctOptionIndex: 0,
          hint: 'Zoek naar de reden in de laatste zin.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    },
    {
      id: 6,
      name: 'Flap’s Worteltjesbos',
      biome: 'farm',
      theme: 'Verkleinwoorden (-je, -pje, -tje)',
      themeColor: '#E91E63',
      bannerEmoji: '🐰',
      chapterTitle: 'Hoofdstuk 6: Huppelen tussen de Bessen',
      introStory: 'Flap het konijn hopt met haar lange oren door het klaverveld. "Snuffel snuffel! Weet jij hoe je kleine dingen noemt met een verkleinwoord?"',
      animalReward: findAnimal('flap-konijn'),
      questions: [
        {
          id: 'farm45-new-6-1',
          category: 'Verkleinwoord',
          categoryIcon: '🐰',
          question: 'Wat is het juiste verkleinwoord van "konijn"?',
          type: 'choice',
          options: ['konijntje', 'konijnjte', 'konijnetje'],
          correctOptionIndex: 0,
          hint: 'Konijn + tje = konijntje.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'farm45-new-6-2',
          category: 'Verkleinwoord met -pje',
          categoryIcon: '🌳',
          question: 'Wat is het juiste verkleinwoord van "boom"?',
          type: 'choice',
          options: ['boompje', 'boomtje', 'boomje'],
          correctOptionIndex: 0,
          hint: 'Eindigt op een m? Dan komt er vaak -pje achter: boom -> boompje!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'farm45-new-6-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel de favoriete oranje groente van het konijn:',
          type: 'spell',
          targetWord: 'WORTEL',
          scrambledLetters: ['W', 'O', 'R', 'T', 'E', 'L'],
          hint: 'W - O - R - T - E - L (6 letters).',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'farm45-new-6-4',
          category: 'Woordsoorten',
          categoryIcon: '🏷️',
          question: 'Welk woord in de zin is een bijvoeglijk naamwoord (zegt iets over het dier): "Het zachte konijntje eet een wortel."',
          type: 'choice',
          options: ['zachte', 'konijntje', 'eet'],
          correctOptionIndex: 0,
          hint: 'Het vertelt HOE het konijntje voelt: zacht!',
          gradeBadge: 'Grammatica'
        }
      ]
    }
  ],

  // ==========================================
  // 2. SAVANNE (SAVANNA) - BRAND NEW QUESTIONS
  // ==========================================
  safari: [
    {
      id: 1,
      name: 'Simba’s Gouden Rots',
      biome: 'safari',
      theme: 'Korte en Lange Klanken (Savanne Avontuur)',
      themeColor: '#FFA000',
      bannerEmoji: '🦁',
      chapterTitle: 'Hoofdstuk 1: De Koning Ontwaakt',
      introStory: 'Simba de leeuw rekt zich uit bovenop de Koningsrots. De zon kleurt het gras goudgeel: "Brul! Welkom op de savanne. Laat zien hoe dapper jij kunt spellen!"',
      animalReward: findAnimal('simba-leeuw'),
      questions: [
        {
          id: 'sav45-new-1-1',
          category: 'Klinkerdief',
          categoryIcon: '🦁',
          question: 'Kies het juist gespelde woord: De leeuw heeft prachtige gouden ___.',
          type: 'choice',
          options: ['manen', 'maanen', 'mannen'],
          correctOptionIndex: 0,
          hint: 'Klankgroep ma-nen: lange /aa/ aan het eind van de klankgroep wordt met 1 a geschreven.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'sav45-new-1-2',
          category: 'Dubbelzetter',
          categoryIcon: '🐾',
          question: 'Kies het juiste woord: Met zijn scherpe ___ loopt de leeuw muisstil door het gras.',
          type: 'choice',
          options: ['klauwen', 'klouwen', 'klawen'],
          correctOptionIndex: 0,
          hint: 'Klauwen schrijf je met de atje-au van de au-plaat!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'sav45-new-1-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel de koning der dieren in het Nederlands:',
          type: 'spell',
          targetWord: 'LEEUW',
          scrambledLetters: ['L', 'E', 'E', 'U', 'W'],
          hint: 'Denk aan de klank -eeuw: vergeet de u niet!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'sav45-new-1-4',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Wie gaan er in een leeuwengroep meestal op jacht?',
          passage: 'In een leeuwenfamilie (een troep) zijn het vooral de vrouwtjesleeuwen die samenwerken bij het jagen. Ze omsingelen hun prooi slim en geruisloos.',
          type: 'choice',
          options: ['De vrouwtjesleeuwen', 'Alleen de jonge welpjes', 'De mannetjesleeuw in zijn eentje'],
          correctOptionIndex: 0,
          hint: 'Kijk naar wie er in de tekst samenwerkt.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    },
    {
      id: 2,
      name: 'Raffi’s Acaciaboom',
      biome: 'safari',
      theme: 'Woorden met -eeuw en -ieuw',
      themeColor: '#F57C00',
      bannerEmoji: '🦒',
      chapterTitle: 'Hoofdstuk 2: Hoog Boven de Bomen',
      introStory: 'Raffi de giraffe steekt haar superlange nek uit om bij de zoetste blaadjes te kunnen. "Welkom hoog in de lucht! Ken jij de woorden met eeuw en ieuw?"',
      animalReward: findAnimal('raffi-giraffe'),
      questions: [
        {
          id: 'sav45-new-2-1',
          category: 'Eeuw/Ieuw Regel',
          categoryIcon: '🦒',
          question: 'Kies het juist gespelde woord: Raffi ontdekt elke dag iets ___.',
          type: 'choice',
          options: ['nieuws', 'niews', 'nieuwt'],
          correctOptionIndex: 0,
          hint: 'Eeuw/Ieuw woord: denk aan de u voor de w!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'sav45-new-2-2',
          category: 'Langermaakwoord',
          categoryIcon: '🦒',
          question: 'Kies het juiste woord: De giraffe heeft een hele lange ___.',
          type: 'choice',
          options: ['nek', 'neck', 'nekk'],
          correctOptionIndex: 0,
          hint: 'In het Nederlands schrijven we gewoon nek met een k.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'sav45-new-2-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel het langste dier van de savanne:',
          type: 'spell',
          targetWord: 'GIRAFFE',
          scrambledLetters: ['G', 'I', 'R', 'A', 'F', 'F', 'E'],
          hint: 'Let op de dubbele ff in het midden!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'sav45-new-2-4',
          category: 'Weetjes & Begrip',
          categoryIcon: '🌿',
          question: 'Waarom heeft een giraffe een paarsblauwe tong?',
          passage: 'Een giraffe steekt haar tong urenlang uit in de felle Afrikaanse zon. De donkere paarsblauwe kleur beschermt de tong tegen zonnebrand!',
          type: 'choice',
          options: ['Het beschermt haar tong tegen verbranding door de zon', 'Omdat ze alleen maar bosbessen eet', 'Om andere dieren te laten schrikken'],
          correctOptionIndex: 0,
          hint: 'Lees de laatste zin over bescherming tegen de felle zon.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    },
    {
      id: 3,
      name: 'Jumbo’s Waterpoel',
      biome: 'safari',
      theme: 'Woorden met Open en Gesloten Klankgroepen',
      themeColor: '#78909C',
      bannerEmoji: '🐘',
      chapterTitle: 'Hoofdstuk 3: Modderdouche bij de Rivier',
      introStory: 'Jumbo het olifantje spuit een fontein van koel water over haar rug. "Spetter spater! Weet jij wanneer we een klinker stelen of een medeklinker verdubbelen?"',
      animalReward: findAnimal('jumbo-olifant'),
      questions: [
        {
          id: 'sav45-new-3-1',
          category: 'Klinkerdief',
          categoryIcon: '🐘',
          question: 'Kies het juiste woord: Olifanten drinken heel veel ___.',
          type: 'choice',
          options: ['water', 'waater', 'watter'],
          correctOptionIndex: 0,
          hint: 'Wa-ter: lange /aa/ aan het einde van de klankgroep, dus je schrijft 1 a!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'sav45-new-3-2',
          category: 'Samenstelling',
          categoryIcon: '💧',
          question: 'Welk samengesteld woord is juist: slurf + dier = ___',
          type: 'choice',
          options: ['slurfdier', 'slurvendier', 'slurfendier'],
          correctOptionIndex: 0,
          hint: 'Gewoon aan elkaar vastplakken: slurf + dier = slurfdier.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'sav45-new-3-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel de lange neus van een olifant:',
          type: 'spell',
          targetWord: 'SLURF',
          scrambledLetters: ['S', 'L', 'U', 'R', 'F'],
          hint: 'S - L - U - R - F (5 letters).',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'sav45-new-3-4',
          category: 'Taal & Begrip',
          categoryIcon: '💡',
          question: 'Wat betekent de uitdrukking "een olifantengeheugen hebben"?',
          type: 'choice',
          options: ['Heel goed dingen kunnen onthouden', 'Een heel groot hoofd hebben', 'Alleen maar verhalen over dieren onthouden'],
          correctOptionIndex: 0,
          hint: 'Olifanten onthouden waterpoelen en vrienden tientallen jaren lang!',
          gradeBadge: 'Spreekwoorden'
        }
      ]
    },
    {
      id: 4,
      name: 'Charly’s Sprintbaan',
      biome: 'safari',
      theme: 'Woorden met ch/g en Sch/Schr',
      themeColor: '#FF7043',
      bannerEmoji: '🐆',
      chapterTitle: 'Hoofdstuk 4: Vliegensvlug door het Zand',
      introStory: 'Charly de cheeta buigt haar soepele rug. In één sprint schiet ze vooruit: "Woesj! Ik ren sneller dan een auto! Ren jij mee door deze spellingregels?"',
      animalReward: findAnimal('charly-cheeta'),
      questions: [
        {
          id: 'sav45-new-4-1',
          category: 'Sch/Schr Woord',
          categoryIcon: '🐆',
          question: 'Kies het juiste woord: De cheeta rent ___ over de savanne.',
          type: 'choice',
          options: ['snel', 'snell', 'schnel'],
          correctOptionIndex: 0,
          hint: 'In het Nederlands schrijven we snel met sn (geen sch).',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'sav45-new-4-2',
          category: 'Luchtwoord',
          categoryIcon: '💨',
          question: 'Kies het juist gespelde woord: Haar poten raken nauwelijks de ___.',
          type: 'choice',
          options: ['grond', 'gront', 'gronnd'],
          correctOptionIndex: 0,
          hint: 'Langer maken: één grond, twee gron-den -> dus met een d!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'sav45-new-4-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel het snelste landdier op aarde:',
          type: 'spell',
          targetWord: 'CHEETA',
          scrambledLetters: ['C', 'H', 'E', 'E', 'T', 'A'],
          hint: 'Begint met CH en heeft dubbel ee!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'sav45-new-4-4',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Hoe helpt de lange staart van een cheeta tijdens het sprinten?',
          passage: 'Tijdens een topsnelheid van 100 km/u moet een cheeta scherpe bochten kunnen maken. Haar lange, gespierde staart werkt als een stuur van een boot om in balans te blijven.',
          type: 'choice',
          options: ['Als een stuur om scherpe bochten te maken en in balans te blijven', 'Om vliegen weg te jagen', 'Om zachter te kunnen landen'],
          correctOptionIndex: 0,
          hint: 'Kijk naar de vergelijking met het stuur van een boot.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    },
    {
      id: 5,
      name: 'Zara’s Strepenpad',
      biome: 'safari',
      theme: 'Woorden met z/s en v/f',
      themeColor: '#424242',
      bannerEmoji: '🦓',
      chapterTitle: 'Hoofdstuk 5: Zwart-Witte Optische Illusie',
      introStory: 'Zara de zebra stapt vrolijk door het lange gras. "Zie jij hoe mijn zwart-witte strepen dansen in de zon? Laten we de zachte z en scherpe s oefenen!"',
      animalReward: findAnimal('zara-zebra'),
      questions: [
        {
          id: 'sav45-new-5-1',
          category: 'Z/S Klank',
          categoryIcon: '🦓',
          question: 'Kies het juiste woord: De zebra loopt over het zandige ___.',
          type: 'choice',
          options: ['pad', 'pat', 'padd'],
          correctOptionIndex: 0,
          hint: 'Langer maken: paden (je hoort een d, dus je schrijft pad met een d).',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'sav45-new-5-2',
          category: 'Dubbelzetter',
          categoryIcon: '🦓',
          question: 'Kies het juist gespelde woord: Zara heeft honderd witte ___.',
          type: 'choice',
          options: ['strepen', 'streepen', 'streppen'],
          correctOptionIndex: 0,
          hint: 'Stre-pen: lange /ee/ aan het einde van de klankgroep wordt met 1 e geschreven!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'sav45-new-5-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel het gestreepte dier met een zachte Z:',
          type: 'spell',
          targetWord: 'ZEBRA',
          scrambledLetters: ['Z', 'E', 'B', 'R', 'A'],
          hint: 'Z - E - B - R - A (5 letters).',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'sav45-new-5-4',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Waarom hebben alle zebra’s een ander strepenpatroon?',
          passage: 'Geen twee zebra’s op aarde zijn precies hetzelfde. Hun strepenpatroon is uniek, net zoals een menselijke vingerafdruk. Zo herkennen veulens hun moeder direct!',
          type: 'choice',
          options: ['Het is uniek zodat veulens hun moeder direct herkennen', 'Omdat ze van verschillende kleuren houden', 'Zodat roofdieren ze kunnen tellen'],
          correctOptionIndex: 0,
          hint: 'Lees over de herkenning tussen veulens en moeders.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    },
    {
      id: 6,
      name: 'Mo’s Stokstaartjesburcht',
      biome: 'safari',
      theme: 'Woorden met -je verkleiningen & Signaalwoorden',
      themeColor: '#8D6E63',
      bannerEmoji: '🦫',
      chapterTitle: 'Hoofdstuk 6: Speurneus op de Uitkijk',
      introStory: 'Mo het stokstaartje staat kaarsrecht op zijn achterpoten. "Kijk uit! Geen roofvogel in zicht! Laten we samen de savanne-missie afsluiten met een topscore!"',
      animalReward: findAnimal('mo-meerkat'),
      questions: [
        {
          id: 'sav45-new-6-1',
          category: 'Verkleinwoord',
          categoryIcon: '🦫',
          question: 'Wat is het juiste verkleinwoord van "staart"?',
          type: 'choice',
          options: ['staartje', 'staarttje', 'staartpje'],
          correctOptionIndex: 0,
          hint: 'Staart + je = staartje.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'sav45-new-6-2',
          category: 'Signaalwoorden',
          categoryIcon: '🧭',
          question: 'Welk signaalwoord past het best: Mo staat op de uitkijk, ___ zijn vriendjes naar eten zoeken.',
          type: 'choice',
          options: ['terwijl', 'omdat', 'zodat'],
          correctOptionIndex: 0,
          hint: 'Het gebeurt op hetzelfde moment: terwijl!',
          gradeBadge: 'Begrijpend Lezen'
        },
        {
          id: 'sav45-new-6-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel het woord voor de heuvel waar Mo op staat:',
          type: 'spell',
          targetWord: 'ROTS',
          scrambledLetters: ['R', 'O', 'T', 'S'],
          hint: 'R - O - T - S (4 letters).',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'sav45-new-6-4',
          category: 'Taal & Zinsleer',
          categoryIcon: '🔍',
          question: 'Wat is het onderwerp (wie doet het?) in de zin: "Het dappere stokstaartje waarschuwt de hele familie."',
          type: 'choice',
          options: ['Het dappere stokstaartje', 'waarschuwt', 'de hele familie'],
          correctOptionIndex: 0,
          hint: 'Wie waarschuwt de familie? Het dappere stokstaartje!',
          gradeBadge: 'Grammatica'
        }
      ]
    }
  ],

  // ==========================================
  // 3. OCEAAN (OCEAN) - BRAND NEW QUESTIONS
  // ==========================================
  sea: [
    {
      id: 1,
      name: 'Willy’s Diepzee Baai',
      biome: 'sea',
      theme: 'Korte en Lange Klanken (Waterwereld)',
      themeColor: '#0288D1',
      bannerEmoji: '🐋',
      chapterTitle: 'Hoofdstuk 1: Zingen onder het Wateroppervlak',
      introStory: 'Willy de blauwe vinvis spuit een gigantische fontein van zeewater de lucht in. "Tsjoep! Duik mee in de diepzee en leer de golven van de Nederlandse taal kennen!"',
      animalReward: findAnimal('willy-walvis'),
      questions: [
        {
          id: 'ocean45-new-1-1',
          category: 'Klinkerdief',
          categoryIcon: '🐋',
          question: 'Kies het juist gespelde woord: De walvis zwemt door de hoge ___.',
          type: 'choice',
          options: ['golven', 'goolven', 'gollven'],
          correctOptionIndex: 0,
          hint: 'Gol-ven: na de medeklinker l schrijf je gewoon golven.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'ocean45-new-1-2',
          category: 'Dubbelzetter',
          categoryIcon: '🌊',
          question: 'Kies het juiste woord: Op de bodem liggen fonkelende ___.',
          type: 'choice',
          options: ['schelpen', 'scheelpen', 'schelppen'],
          correctOptionIndex: 0,
          hint: 'Schel-pen: gewoon één p na de l.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'ocean45-new-1-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel het grootste zoogdier ter wereld:',
          type: 'spell',
          targetWord: 'WALVIS',
          scrambledLetters: ['W', 'A', 'L', 'V', 'I', 'S'],
          hint: 'W - A - L - V - I - S (6 letters).',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'ocean45-new-1-4',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Waarom zingen blauwe vinvissen onder water?',
          passage: 'Blauwe vinvissen maken diepe, brommende zanggeluiden. Deze geluiden kunnen duizenden kilometers door het water reizen om andere walvissen te begroeten.',
          type: 'choice',
          options: ['Om over duizenden kilometers met elkaar te praten', 'Om vissen te laten schrikken', 'Omdat ze niet kunnen slapen'],
          correctOptionIndex: 0,
          hint: 'Lees over hoe ver de geluiden door het water reizen.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    },
    {
      id: 2,
      name: 'Dolly’s Sprongengolf',
      biome: 'sea',
      theme: 'Woorden met -d of -t & Woordschat',
      themeColor: '#00ACC1',
      bannerEmoji: '🐬',
      chapterTitle: 'Hoofdstuk 2: Salto’s in het Zonlicht',
      introStory: 'Dolly de dolfijn maakt een sierlijke sprong door de golven. "Klik-klik! Wij dolfijnen zijn superslim. Laat zien dat jij ook een taalkampioen bent!"',
      animalReward: findAnimal('dolly-dolfijn'),
      questions: [
        {
          id: 'ocean45-new-2-1',
          category: 'Langermaakwoord',
          categoryIcon: '🐬',
          question: 'Kies de juiste spelling: Dolly springt hoog boven het water___.',
          type: 'choice',
          options: ['oppervlak', 'oppervlag', 'oppervlack'],
          correctOptionIndex: 0,
          hint: 'Oppervlak schrijf je met een k aan het eind.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'ocean45-new-2-2',
          category: 'Open/Gesloten Klank',
          categoryIcon: '🌊',
          question: 'Kies het juist gespelde woord: In de zee zwemmen duizenden vrolijke ___.',
          type: 'choice',
          options: ['dolfijnen', 'dolfynen', 'dolvijnen'],
          correctOptionIndex: 0,
          hint: 'Dolfijnen schrijf je met de lange ij van de ijstrein!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'ocean45-new-2-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel het woord voor de grote zoute watermassa:',
          type: 'spell',
          targetWord: 'OCEAAN',
          scrambledLetters: ['O', 'C', 'E', 'A', 'A', 'N'],
          hint: 'Begint met O-C-E-AA-N (let op de c die klinkt als s).',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'ocean45-new-2-4',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Hoe slapen dolfijnen zonder te zinken?',
          passage: 'Dolfijnen slapen met één hersenhelft tegelijk, terwijl het andere oog open blijft. Zo kunnen ze blijven zwemmen en op tijd naar adem happen aan de oppervlakte.',
          type: 'choice',
          options: ['Met één hersenhelft tegelijk zodat ze kunnen blijven ademhalen', 'Op de rug van een zeeschildpad', 'Ze slapen helemaal nooit'],
          correctOptionIndex: 0,
          hint: 'Zoek naar hoe hun hersenhelft werkt tijdens de slaap.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    },
    {
      id: 3,
      name: 'Sammy’s Zandbank',
      biome: 'sea',
      theme: 'Woorden met ng/nk en Dubbele Klinkers',
      themeColor: '#26A69A',
      bannerEmoji: '🐢',
      chapterTitle: 'Hoofdstuk 3: Honderd Jaar Oude Wijsheid',
      introStory: 'Sammy de zeeschildpad peddelt rustig tussen het koraal. "Rustig aan! Haastige spoed is zelden goed. Neem je tijd voor elk woord!"',
      animalReward: findAnimal('sammy-schildpad'),
      questions: [
        {
          id: 'ocean45-new-3-1',
          category: 'Plankwoord',
          categoryIcon: '🐢',
          question: 'Kies het juiste woord: Sammy rust uit op de zand___.',
          type: 'choice',
          options: ['bank', 'bangk', 'banck'],
          correctOptionIndex: 0,
          hint: 'Plankwoord: daar mag geen g tussen!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'ocean45-new-3-2',
          category: 'Langermaakwoord',
          categoryIcon: '🛡️',
          question: 'Kies de juiste spelling: Het schild van de schildpad is heel ___.',
          type: 'choice',
          options: ['hard', 'hart', 'hartt'],
          correctOptionIndex: 0,
          hint: 'Langer maken: har-de schilden -> dus met een d (niet hart zoals in je borst)!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'ocean45-new-3-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel het harde pantser op Sammy’s rug:',
          type: 'spell',
          targetWord: 'SCHILD',
          scrambledLetters: ['S', 'C', 'H', 'I', 'L', 'D'],
          hint: 'Begint met SCH en eindigt op een D (schilden).',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'ocean45-new-3-4',
          category: 'Woordenschat',
          categoryIcon: '💡',
          question: 'Wat is een "tegenstelling" van het woord LANGZAAM?',
          type: 'choice',
          options: ['snel', 'kalm', 'rustig'],
          correctOptionIndex: 0,
          hint: 'Het tegenovergestelde van traag en langzaam is snel!',
          gradeBadge: 'Woordenschat'
        }
      ]
    },
    {
      id: 4,
      name: 'Octo’s Koraaltuin',
      biome: 'sea',
      theme: 'Woorden met C (klinkt als k of s) & Aantallen',
      themeColor: '#AB47BC',
      bannerEmoji: '🐙',
      chapterTitle: 'Hoofdstuk 4: Acht Armen Vol Kleuren',
      introStory: 'Octo de octopus verandert van kleur en verstopt zich achter felroze koraal. "Kijk eens hoeveel armen ik heb! Kun jij tellen en spellen tegelijk?"',
      animalReward: findAnimal('octo-octopus'),
      questions: [
        {
          id: 'ocean45-new-4-1',
          category: 'C-Woord Regel',
          categoryIcon: '🐙',
          question: 'Kies de juiste spelling voor het kleurrijke zeegewas:',
          type: 'choice',
          options: ['koraal', 'coraal', 'koraall'],
          correctOptionIndex: 0,
          hint: 'In het Nederlands schrijven we koraal met een k.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'ocean45-new-4-2',
          category: 'Aantalwoorden',
          categoryIcon: '🐙',
          question: 'Hoeveel tentakels heeft een octopus?',
          type: 'choice',
          options: ['acht', 'agt', 'achg'],
          correctOptionIndex: 0,
          hint: 'Acht is een luchtwoord met ch!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'ocean45-new-4-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel het slimme achtarmige zeedier:',
          type: 'spell',
          targetWord: 'OCTOPUS',
          scrambledLetters: ['O', 'C', 'T', 'O', 'P', 'U', 'S'],
          hint: 'O - C - T - O - P - U - S (7 letters).',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'ocean45-new-4-4',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Waarom kan een octopus zo snel van kleur en huidstructuur veranderen?',
          passage: 'Octopussen hebben speciale pigmentcellen in hun huid. Binnen een fractie van een seconde kunnen ze de kleur en textuur van een steen of koraal nadoen om zich onzichtbaar te maken voor roofdieren.',
          type: 'choice',
          options: ['Om zich perfect te camoufleren en onzichtbaar te maken', 'Omdat ze van mode houden', 'Om het water te verwarmen'],
          correctOptionIndex: 0,
          hint: 'Lees over hoe ze de stenen nadoen om niet gezien te worden.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    },
    {
      id: 5,
      name: 'Kora’s Zeegrasveld',
      biome: 'sea',
      theme: 'Woorden met -eeuw en Verkleinwoorden',
      themeColor: '#29B6F6',
      bannerEmoji: '🐡',
      chapterTitle: 'Hoofdstuk 5: Schommelen aan het Zeewier',
      introStory: 'Kora het zeepaardje houdt zich met haar gekrulde staartje vast aan een stengel zeegras. "Hoi kleine ontdekker! Laten we speuren naar fijne klanken!"',
      animalReward: findAnimal('kora-zeepaardje'),
      questions: [
        {
          id: 'ocean45-new-5-1',
          category: 'Samenstelling',
          categoryIcon: '🐡',
          question: 'Plak de woorden samen: zee + paard = ___',
          type: 'choice',
          options: ['zeepaard', 'zeepaardje', 'zeenpaard'],
          correctOptionIndex: 0,
          hint: 'Gewoon zee + paard = zeepaard.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'ocean45-new-5-2',
          category: 'Verkleinwoord',
          categoryIcon: '🌿',
          question: 'Wat is het juiste verkleinwoord van "vis"?',
          type: 'choice',
          options: ['visje', 'visstje', 'vispje'],
          correctOptionIndex: 0,
          hint: 'Vis + je = visje.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'ocean45-new-5-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel het woord voor de groene planten in de zee:',
          type: 'spell',
          targetWord: 'ZEEWIER',
          scrambledLetters: ['Z', 'E', 'E', 'W', 'I', 'E', 'R'],
          hint: 'ZEE + WIER (7 letters).',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'ocean45-new-5-4',
          category: 'Taal & Begrip',
          categoryIcon: '🔍',
          question: 'Welk woord is een zelfstandig naamwoord (mens, dier, plant of ding): "Het kleine zeepaardje zwemt vrolijk."',
          type: 'choice',
          options: ['zeepaardje', 'kleine', 'zwemt'],
          correctOptionIndex: 0,
          hint: 'Het is de naam van een dier (je kunt er "het" voor zetten)!',
          gradeBadge: 'Grammatica'
        }
      ]
    },
    {
      id: 6,
      name: 'Oscar’s IJzige Diepten',
      biome: 'sea',
      theme: 'Woorden met Open/Gesloten Lettergrepen & Begrip',
      themeColor: '#1A237E',
      bannerEmoji: '🦈',
      chapterTitle: 'Hoofdstuk 6: De Zwart-Witte Heerser',
      introStory: 'Oscar de orka glijdt majestueus door de ijskoude golven. "Fantastisch gedaan in de oceaan! Laten we deze oceaanexpeditie feestelijk bekronen!"',
      animalReward: findAnimal('oscar-orka'),
      questions: [
        {
          id: 'ocean45-new-6-1',
          category: 'Klinkerdief',
          categoryIcon: '🦈',
          question: 'Kies het juist gespelde woord: De orka zwemt samen met zijn ___.',
          type: 'choice',
          options: ['familie', 'famillie', 'familije'],
          correctOptionIndex: 0,
          hint: 'Familie schrijf je met 1 m en 1 l.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'ocean45-new-6-2',
          category: 'Dubbelzetter',
          categoryIcon: '🌊',
          question: 'Kies het juiste woord: De orka’s springen hoog boven de ___ uit.',
          type: 'choice',
          options: ['golven', 'goolven', 'gollven'],
          correctOptionIndex: 0,
          hint: 'Golven schrijf je gewoon met één l.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'ocean45-new-6-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel de naam van dit zwart-witte zeeroofdier:',
          type: 'spell',
          targetWord: 'ORKA',
          scrambledLetters: ['O', 'R', 'K', 'A'],
          hint: 'O - R - K - A (4 letters).',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'ocean45-new-6-4',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Wat is de taalkundige familie waar orka’s eigenlijk bij horen?',
          passage: 'Hoewel mensen orka’s soms "killer whales" noemen, zijn het biologisch gezien geen echte walvissen. Orka’s zijn de allergrootste soort van de dolfijnenfamilie!',
          type: 'choice',
          options: ['Ze zijn de grootste soort van de dolfijnenfamilie', 'Ze horen bij de haaienfamilie', 'Ze zijn familie van de pinguïns'],
          correctOptionIndex: 0,
          hint: 'Lees de laatste zin over de dolfijnenfamilie.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    }
  ],

  // ==========================================
  // 4. REGENWOUD (RAINFOREST) - BRAND NEW
  // ==========================================
  jungle: [
    {
      id: 1,
      name: 'Toko’s Regenwoudkruin',
      biome: 'jungle',
      theme: 'Korte en Lange Klanken (Tropisch Woud)',
      themeColor: '#2E7D32',
      bannerEmoji: '🦜',
      chapterTitle: 'Hoofdstuk 1: Zingende Kleuren in de Boomtop',
      introStory: 'Toko de toekan zwaait met zijn reusachtige gele snavel tussen de lianen. "Welkom in het regenwoud! De bomen zijn hier zo hoog dat ze de wolken kietelen!"',
      animalReward: findAnimal('toko-toekan'),
      questions: [
        {
          id: 'rain45-new-1-1',
          category: 'Klinkerdief',
          categoryIcon: '🦜',
          question: 'Kies het juist gespelde woord: In het oerwoud groeien zoete ___.',
          type: 'choice',
          options: ['bananen', 'baananen', 'banannen'],
          correctOptionIndex: 0,
          hint: 'Ba-na-nen: twee open klankgroepen, dus met 1 a!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'rain45-new-1-2',
          category: 'Langermaakwoord',
          categoryIcon: '🍌',
          question: 'Kies de juiste spelling: De toekan heeft een felgekleurde ___.',
          type: 'choice',
          options: ['snavel', 'snaavel', 'snavvel'],
          correctOptionIndex: 0,
          hint: 'Sna-vel: lange /aa/ aan het eind van de klankgroep -> 1 a!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'rain45-new-1-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel de tropische vogel met de grote snavel:',
          type: 'spell',
          targetWord: 'TOEKAN',
          scrambledLetters: ['T', 'O', 'E', 'K', 'A', 'N'],
          hint: 'T - OE - K - A - N (6 letters).',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'rain45-new-1-4',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Waarom is de reusachtige snavel van een toekan niet te zwaar om mee te vliegen?',
          passage: 'De snavel van een toekan ziet er heel massief uit, maar is van binnen hol met een structuur die lijkt op een spons van keratine. Hierdoor is de snavel vederlicht!',
          type: 'choice',
          options: ['Omdat de snavel van binnen hol en sponsachtig is', 'Omdat de toekan extra sterke spieren heeft', 'Omdat er luchtballonnen in zitten'],
          correctOptionIndex: 0,
          hint: 'Lees over de holle, sponsachtige binnenkant.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    },
    {
      id: 2,
      name: 'Chico’s Lianenpad',
      biome: 'jungle',
      theme: 'Woorden met -eeuw/-ieuw & Samengestelde Woorden',
      themeColor: '#388E3C',
      bannerEmoji: '🐒',
      chapterTitle: 'Hoofdstuk 2: Slingeren van Tak naar Tak',
      introStory: 'Chico het slingeraapje zwaait aan zijn lange grijpstaart door het bladerdak. "Oeh-oeh-aah-aah! Vang de juiste letters voor je naar beneden tuimelt!"',
      animalReward: findAnimal('chico-slingeraap'),
      questions: [
        {
          id: 'rain45-new-2-1',
          category: 'Samenstelling',
          categoryIcon: '🐒',
          question: 'Plak de woorden aan elkaar: regen + woud = ___',
          type: 'choice',
          options: ['regenwoud', 'regenswoud', 'regenwout'],
          correctOptionIndex: 0,
          hint: 'Regen + woud (met een d van wouden) = regenwoud.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'rain45-new-2-2',
          category: 'Luchtwoord',
          categoryIcon: '🌿',
          question: 'Kies het juist gespelde woord: Chico houdt zich vast met zijn lange ___.',
          type: 'choice',
          options: ['staart', 'staard', 'staartt'],
          correctOptionIndex: 0,
          hint: 'Langer maken: staar-ten (je hoort een t, dus met een t).',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'rain45-new-2-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel het touw van planten waar apen aan slingeren:',
          type: 'spell',
          targetWord: 'LIAAN',
          scrambledLetters: ['L', 'I', 'A', 'A', 'N'],
          hint: 'L - I - AA - N (5 letters).',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'rain45-new-2-4',
          category: 'Woordsoorten',
          categoryIcon: '🔍',
          question: 'Welk woord is het werkwoord (doe-woord): "Het aapje slingert behendig door de bomen."',
          type: 'choice',
          options: ['slingert', 'aapje', 'behendig'],
          correctOptionIndex: 0,
          hint: 'Wat doet het aapje? Het slingert!',
          gradeBadge: 'Grammatica'
        }
      ]
    },
    {
      id: 3,
      name: 'Bongo’s Schaduwbos',
      biome: 'jungle',
      theme: 'Woorden met ng/nk & Begrijpend Lezen',
      themeColor: '#1B5E20',
      bannerEmoji: '🦍',
      chapterTitle: 'Hoofdstuk 3: De Wijze Zilverrug',
      introStory: 'Bongo de gorilla zit rustig op een bed van zachte bladeren. "Gorilla’s zijn heel vredig en zorgen goed voor elkaar. Laten we samen leren!"',
      animalReward: findAnimal('bongo-gorilla'),
      questions: [
        {
          id: 'rain45-new-3-1',
          category: 'Zingwoord',
          categoryIcon: '🦍',
          question: 'Kies het juiste woord: Bongo is ontzettend ___ en tilt zware takken op.',
          type: 'choice',
          options: ['sterk', 'sterrek', 'sterc'],
          correctOptionIndex: 0,
          hint: 'Sterk is een speciaal hakwoord: geen e tussen r en k!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'rain45-new-3-2',
          category: 'Klinkerdief',
          categoryIcon: '🌿',
          question: 'Kies het juist gespelde woord: Gorilla’s eten voornamelijk groene ___.',
          type: 'choice',
          options: ['bladeren', 'blaaderen', 'bladerren'],
          correctOptionIndex: 0,
          hint: 'Bla-de-ren: lange klank aan het einde van de klankgroep -> 1 a!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'rain45-new-3-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel de grootste mensaap ter wereld:',
          type: 'spell',
          targetWord: 'GORILLA',
          scrambledLetters: ['G', 'O', 'R', 'I', 'L', 'L', 'A'],
          hint: 'G - O - R - I - LL - A (let op de dubbele l).',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'rain45-new-3-4',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Wat is een "zilverrug" bij gorilla’s?',
          passage: 'Wanneer een mannetjesgorilla volwassen en wijs wordt, verkleuren de haren op zijn rug van zwart naar zilverwit. Hij wordt dan de trotse leider en beschermer van de groep.',
          type: 'choice',
          options: ['De volwassen mannelijke leider van de gorillagroep', 'Een gorilla die in het zilveren water zwemt', 'Een jonge babygorilla'],
          correctOptionIndex: 0,
          hint: 'Lees over de volwassen leider met zilveren haren op zijn rug.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    },
    {
      id: 4,
      name: 'Maya’s Rivieroever',
      biome: 'jungle',
      theme: 'Woorden met au/ou & ei/ij',
      themeColor: '#F9A825',
      bannerEmoji: '🐆',
      chapterTitle: 'Hoofdstuk 4: Gevlekte Schaduw langs het Water',
      introStory: 'Maya de jaguar sluipt geruisloos langs de Amazone-rivier. Haar rozetvlekken glanzen in het gefilterde zonlicht. "Weet jij het verschil tussen au en ou?"',
      animalReward: findAnimal('maya-jaguar'),
      questions: [
        {
          id: 'rain45-new-4-1',
          category: 'Au/Ou Klank',
          categoryIcon: '🐆',
          question: 'Kies het juist gespelde woord: Maya heeft scherpe ___ aan haar poten.',
          type: 'choice',
          options: ['klauwen', 'klouwen', 'clauwen'],
          correctOptionIndex: 0,
          hint: 'Klauwen staat op de au-plaat, dus met de atje-au!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'rain45-new-4-2',
          category: 'Ei/Ij Klank',
          categoryIcon: '💧',
          question: 'Kies het juiste woord: De jaguar zwemt door de diepe ___.',
          type: 'choice',
          options: ['rivier', 'revier', 'riveer'],
          correctOptionIndex: 0,
          hint: 'Rivier schrijf je met een i en -ier.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'rain45-new-4-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel de krachtige roofkat van het regenwoud:',
          type: 'spell',
          targetWord: 'JAGUAR',
          scrambledLetters: ['J', 'A', 'G', 'U', 'A', 'R'],
          hint: 'J - A - G - U - A - R (6 letters).',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'rain45-new-4-4',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Wat maakt jaguars bijzonder vergeleken met de meeste andere katten?',
          passage: 'Terwijl de meeste huiskatten en leeuwen een hekel hebben aan water, zijn jaguars fantastische zwemmers. Ze jagen met plezier in rivieren op vissen en kaaimannen.',
          type: 'choice',
          options: ['Ze houden erg van water en zijn uitstekende zwemmers', 'Ze kunnen vliegen door de bomen', 'Ze hebben geen vlekken'],
          correctOptionIndex: 0,
          hint: 'Lees over hoe graag ze zwemmen in de rivier.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    },
    {
      id: 5,
      name: 'Pepe’s Gifkikkermeertje',
      biome: 'jungle',
      theme: 'Woorden met Open/Gesloten Klanken & Kleuren',
      themeColor: '#00E676',
      bannerEmoji: '🐸',
      chapterTitle: 'Hoofdstuk 5: Glimmende Gifpijltjes',
      introStory: 'Pepe het gifkikkertje is piepklein maar knalblauw gekleurd. "Kwaak! Mijn felle kleuren waarschuwen iedereen. Ben jij net zo scherp met spelling?"',
      animalReward: findAnimal('pepe-gifkikker'),
      questions: [
        {
          id: 'rain45-new-5-1',
          category: 'Dubbelzetter',
          categoryIcon: '🐸',
          question: 'Kies het juist gespelde woord: Pepe springt van blad naar ___.',
          type: 'choice',
          options: ['kikker', 'kiker', 'kickker'],
          correctOptionIndex: 0,
          hint: 'Kik-ker: korte /i/ klank -> dus twee k-en (dubbelzetter)!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'rain45-new-5-2',
          category: 'Kleurwoorden',
          categoryIcon: '🎨',
          question: 'Kies het juiste woord: De huid van Pepe is fel___.',
          type: 'choice',
          options: ['blauw', 'blou', 'blaauw'],
          correctOptionIndex: 0,
          hint: 'Blauw schrijf je met auw (denk aan de au-plaat)!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'rain45-new-5-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel het groene of blauwe amfibie dat kwaakt:',
          type: 'spell',
          targetWord: 'KIKKER',
          scrambledLetters: ['K', 'I', 'K', 'K', 'E', 'R'],
          hint: 'K - I - KK - E - R (6 letters).',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'rain45-new-5-4',
          category: 'Woordenschat',
          categoryIcon: '💡',
          question: 'Wat is een "synoniem" (ander woord met dezelfde betekenis) voor PIEPKLEIN?',
          type: 'choice',
          options: ['minuscuul', 'gigantisch', 'reusachtig'],
          correctOptionIndex: 0,
          hint: 'Minuscuul betekent ook heel erg klein!',
          gradeBadge: 'Woordenschat'
        }
      ]
    },
    {
      id: 6,
      name: 'Paco’s Luiaardtak',
      biome: 'jungle',
      theme: 'Woorden met -tje Verkleiningen & Rustig Lezen',
      themeColor: '#795548',
      bannerEmoji: '🦥',
      chapterTitle: 'Hoofdstuk 6: Het Rustigste Dier op Aarde',
      introStory: 'Paco de luiaard hangt ondersteboven aan een stevige tak en knippert loom met zijn ogen. "Gaaaaap... Waarom zou je haasten als je rustig kunt genieten?"',
      animalReward: findAnimal('paco-luiaard'),
      questions: [
        {
          id: 'rain45-new-6-1',
          category: 'Samenstelling',
          categoryIcon: '🦥',
          question: 'Plak de woorden samen: lui + aard = ___',
          type: 'choice',
          options: ['luiaard', 'luijaard', 'luiaart'],
          correctOptionIndex: 0,
          hint: 'Lui + aard (met een d van aarden) = luiaard.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'rain45-new-6-2',
          category: 'Verkleinwoord',
          categoryIcon: '🌿',
          question: 'Wat is het juiste verkleinwoord van "blad"?',
          type: 'choice',
          options: ['blaadje', 'bladtje', 'blaadtje'],
          correctOptionIndex: 0,
          hint: 'Bij blad verandert de a in een lange aa: blaadje!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'rain45-new-6-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel het tegenovergestelde van actief:',
          type: 'spell',
          targetWord: 'RUSTIG',
          scrambledLetters: ['R', 'U', 'S', 'T', 'I', 'G'],
          hint: 'R - U - S - T - I - G (let op achtervoegsel -ig).',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'rain45-new-6-4',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Waarom groeit er soms groen mos en algen op de vacht van een luiaard?',
          passage: 'Luiaards bewegen zó langzaam dat er kleine groene algen in hun vacht gaan groeien. Dit is juist heel handig: de groene kleur zorgt voor perfecte camouflage tussen de bladeren!',
          type: 'choice',
          options: ['Het zorgt voor handige groene camouflage tussen de boombladeren', 'Omdat ze nooit in bad gaan', 'Om andere dieren te voeren'],
          correctOptionIndex: 0,
          hint: 'Lees hoe de groene kleur hen helpt te verstoppen.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    }
  ],

  // ==========================================
  // 5. POOLCIRKEL (ARCTIC) - BRAND NEW
  // ==========================================
  snow: [
    {
      id: 1,
      name: 'Barny’s IJsschots',
      biome: 'snow',
      theme: 'Korte en Lange Klanken (Poolwereld)',
      themeColor: '#00BCD4',
      bannerEmoji: '🐻‍❄️',
      chapterTitle: 'Hoofdstuk 1: De Witte Reus van het Noorden',
      introStory: 'Barny de ijsbeer stapt met zijn reusachtige poten over krakend ijs. "Brrr! Welkom in de vrieskou! Laten we ons opwarmen met fonkelnieuwe spellingvragen!"',
      animalReward: findAnimal('barny-ijsbeer'),
      questions: [
        {
          id: 'arc45-new-1-1',
          category: 'Samenstelling',
          categoryIcon: '🐻‍❄️',
          question: 'Plak de woorden aan elkaar: ijs + beer = ___',
          type: 'choice',
          options: ['ijsbeer', 'ijzenbeer', 'eijsbeer'],
          correctOptionIndex: 0,
          hint: 'IJs met de lange ij + beer = ijsbeer.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'arc45-new-1-2',
          category: 'Langermaakwoord',
          categoryIcon: '❄️',
          question: 'Kies de juiste spelling: De noordenwind waait heel ___.',
          type: 'choice',
          options: ['koud', 'kout', 'kouwd'],
          correctOptionIndex: 0,
          hint: 'Langer maken: kou-de wind -> dus met een d aan het eind!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'arc45-new-1-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel het bevroren water op de noordpool:',
          type: 'spell',
          targetWord: 'IJS',
          scrambledLetters: ['I', 'J', 'S'],
          hint: 'I - J - S (3 letters).',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'arc45-new-1-4',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Welke kleur heeft de huid onder de witte vacht van een ijsbeer?',
          passage: 'Hoewel de vacht van een ijsbeer er sneeuwwit uitziet, zijn de haren eigenlijk hol en doorzichtig. De huid daaronder is pikzwart! Die zwarte huid absorbeert de warmte van de zon.',
          type: 'choice',
          options: ['Pikzwart, om de zonnewarmte goed vast te houden', 'Felroze', 'Sneeuwwit'],
          correctOptionIndex: 0,
          hint: 'Lees over de zwarte huid onder de doorzichtige haren.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    },
    {
      id: 2,
      name: 'Plons’ Gletsjerglijbaan',
      biome: 'snow',
      theme: 'Woorden met -d of -t & Verkleinwoorden',
      themeColor: '#03A9F4',
      bannerEmoji: '🐧',
      chapterTitle: 'Hoofdstuk 2: Buikschuiven over de Sneeuw',
      introStory: 'Plons de keizerspinguïn glijdt op zijn buik over de gladde gletsjer. "Woehoe! Wie het snelste glijdt en de minste foutjes maakt wint de gouden ijsmedaille!"',
      animalReward: findAnimal('plons-pinguin'),
      questions: [
        {
          id: 'arc45-new-2-1',
          category: 'Dubbelzetter',
          categoryIcon: '🐧',
          question: 'Kies het juist gespelde woord: Plons plonst in het ijskoude ___.',
          type: 'choice',
          options: ['water', 'waater', 'watter'],
          correctOptionIndex: 0,
          hint: 'Wa-ter: 1 a aan het einde van de klankgroep.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'arc45-new-2-2',
          category: 'Verkleinwoord',
          categoryIcon: '❄️',
          question: 'Wat is het juiste verkleinwoord van "pinguïn"?',
          type: 'choice',
          options: ['pinguïntje', 'pinguïnetje', 'pinguïnpje'],
          correctOptionIndex: 0,
          hint: 'Pinguïn + tje = pinguïntje.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'arc45-new-2-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel het witte dons dat uit de lucht dwarrelt:',
          type: 'spell',
          targetWord: 'SNEEUW',
          scrambledLetters: ['S', 'N', 'E', 'E', 'U', 'W'],
          hint: 'Denk aan de -eeuw regel (vergeet de u niet)!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'arc45-new-2-4',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Waarom gaan duizenden pinguïns dicht tegen elkaar aan staan tijdens een sneeuwstorm?',
          passage: 'Tijdens een ijskoude storm kruipen pinguïns in een gigantische cirkel dicht tegen elkaar. De pinguïns aan de koude buitenkant schuifelen steeds om de beurt naar het warme midden.',
          type: 'choice',
          options: ['Om elkaar lekker warm te houden en om de beurt in het midden te staan', 'Omdat ze niet alleen kunnen slapen', 'Om een dansje te doen'],
          correctOptionIndex: 0,
          hint: 'Lees over het samen warm blijven in de cirkel.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    },
    {
      id: 3,
      name: 'Robbie’s Wak in het Ijs',
      biome: 'snow',
      theme: 'Woorden met ng/nk & Open Klankgroepen',
      themeColor: '#0097A7',
      bannerEmoji: '🦭',
      chapterTitle: 'Hoofdstuk 3: Koppie Boven Water',
      introStory: 'Robbie de zeehond steekt zijn nieuwsgierige snuit door een rond wak in het ijs. "Snork! Laten we duiken naar de beste klanken!"',
      animalReward: findAnimal('robbie-zeehond'),
      questions: [
        {
          id: 'arc45-new-3-1',
          category: 'Samenstelling',
          categoryIcon: '🦭',
          question: 'Plak de woorden samen: zee + hond = ___',
          type: 'choice',
          options: ['zeehond', 'zeenhond', 'zeehont'],
          correctOptionIndex: 0,
          hint: 'Zee + hond (met een d van honden) = zeehond.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'arc45-new-3-2',
          category: 'Plankwoord',
          categoryIcon: '🐟',
          question: 'Kies het juiste woord: Robbie eet een heerlijke verse ___.',
          type: 'choice',
          options: ['haring', 'haaring', 'harring'],
          correctOptionIndex: 0,
          hint: 'Ha-ring: 1 a aan het einde van de klankgroep + zingwoord ng!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'arc45-new-3-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel de snorharen waarmee Robbie onder water voelt:',
          type: 'spell',
          targetWord: 'SNOR',
          scrambledLetters: ['S', 'N', 'O', 'R'],
          hint: 'S - N - O - R (4 letters).',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'arc45-new-3-4',
          category: 'Taal & Zinsleer',
          categoryIcon: '🔍',
          question: 'Wat is het gezegde (alle werkwoorden samen) in: "De zeehond heeft urenlang in de zee gezwommen."',
          type: 'choice',
          options: ['heeft gezwommen', 'zeehond', 'in de zee'],
          correctOptionIndex: 0,
          hint: 'Zoek alle werkwoorden: hulpwerkwoord "heeft" + voltooid deelwoord "gezwommen".',
          gradeBadge: 'Grammatica'
        }
      ]
    },
    {
      id: 4,
      name: 'Pip’s Sneeuwhol',
      biome: 'snow',
      theme: 'Woorden met ch/g & Tegenstellingen',
      themeColor: '#E0F7FA',
      bannerEmoji: '🦊',
      chapterTitle: 'Hoofdstuk 4: Een Witte Pluimstaart',
      introStory: 'Pip de poolvos duikt met een sierlijke sprong met haar kopje in de diepe sneeuw om een muisje te vangen. "Kijk eens hoe stil ik kan sluipen!"',
      animalReward: findAnimal('pip-poolvos'),
      questions: [
        {
          id: 'arc45-new-4-1',
          category: 'Luchtwoord',
          categoryIcon: '🦊',
          question: 'Kies het juist gespelde woord: De poolvos heeft een hele dikke ___.',
          type: 'choice',
          options: ['vacht', 'vagt', 'vackt'],
          correctOptionIndex: 0,
          hint: 'Luchtwoord: korte klank /a/ + cht (vacht).',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'arc45-new-4-2',
          category: 'Samenstelling',
          categoryIcon: '❄️',
          question: 'Plak de woorden samen: pool + vos = ___',
          type: 'choice',
          options: ['poolvos', 'polenvos', 'poolsfos'],
          correctOptionIndex: 0,
          hint: 'Pool + vos = poolvos.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'arc45-new-4-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel het hol van de poolvos onder de sneeuw:',
          type: 'spell',
          targetWord: 'HOL',
          scrambledLetters: ['H', 'O', 'L'],
          hint: 'H - O - L (3 letters).',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'arc45-new-4-4',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Waarom verandert de vacht van de poolvos in de zomer van kleur?',
          passage: 'In de winter is de vacht van de poolvos spierwit om op te gaan in het ijs en de sneeuw. Maar in de zomer smelt het ijs en kleurt haar vacht bruingrijs om niet op te vallen tussen de rotsen en mossen.',
          type: 'choice',
          options: ['Om ook in de zomer gecamoufleerd te zijn tussen de rotsen en aarde', 'Omdat ze in de zomer te warm wordt', 'Omdat ze van kleur houdt'],
          correctOptionIndex: 0,
          hint: 'Lees over de camouflage tussen de zomerse rotsen.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    },
    {
      id: 5,
      name: 'Boris’ Slagtandenbaai',
      biome: 'snow',
      theme: 'Woorden met Open/Gesloten Klankgroepen',
      themeColor: '#546E7A',
      bannerEmoji: '🦭',
      chapterTitle: 'Hoofdstuk 5: Zonnen op het Pakijs',
      introStory: 'Boris de walrus ligt met zijn zware lijf en twee lange ivoren slagtanden te luieren op een ijsschots. "Oef! Ben jij net zo sterk in taal als mijn tanden?"',
      animalReward: findAnimal('boris-walrus'),
      questions: [
        {
          id: 'arc45-new-5-1',
          category: 'Klinkerdief',
          categoryIcon: '🦭',
          question: 'Kies het juiste woord: Boris heeft twee lange ___.',
          type: 'choice',
          options: ['tanden', 'taanden', 'tandden'],
          correctOptionIndex: 0,
          hint: 'Tan-den: na de medeklinker n schrijf je gewoon tanden.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'arc45-new-5-2',
          category: 'Langermaakwoord',
          categoryIcon: '🌊',
          question: 'Kies het juist gespelde woord: Met zijn tanden hakt Boris zich vast in het ___.',
          type: 'choice',
          options: ['ijs', 'eijs', 'yjs'],
          correctOptionIndex: 0,
          hint: 'IJs schrijf je met de lange ij.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'arc45-new-5-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel het zware pooldier met de slagtanden:',
          type: 'spell',
          targetWord: 'WALRUS',
          scrambledLetters: ['W', 'A', 'L', 'R', 'U', 'S'],
          hint: 'W - A - L - R - U - S (6 letters).',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'arc45-new-5-4',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Waarvoor gebruikt een walrus zijn lange slagtanden?',
          passage: 'Een walrus gebruikt zijn slagtanden niet alleen om schelpen van de zeebodem los te woelen, maar ook als handige ijspriemen om zijn zware lijf uit het water op het gladde ijs te trekken!',
          type: 'choice',
          options: ['Om schelpen op te graven en zichzelf op het ijs te hijsen', 'Om visjes mee te vangen', 'Om te kunnen slapen'],
          correctOptionIndex: 0,
          hint: 'Lees over de twee functies van de slagtanden.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    },
    {
      id: 6,
      name: 'Nora’s Magische Noorderlicht',
      biome: 'snow',
      theme: 'Woorden met -eeuw/-ieuw & Feestelijke Woordenschat',
      themeColor: '#7E57C2',
      bannerEmoji: '🦄',
      chapterTitle: 'Hoofdstuk 6: De Eenhoorn van de Oceaan',
      introStory: 'Nora de narwal zwemt onder het dansende groene noorderlicht. Haar lange spiraalvormige slagtand fonkelt in het donker: "Gefeliciteerd met je poolreis! Laten we schitteren!"',
      animalReward: findAnimal('nora-narwal'),
      questions: [
        {
          id: 'arc45-new-6-1',
          category: 'Eeuw/Ieuw Woord',
          categoryIcon: '🦄',
          question: 'Kies het juist gespelde woord: Het noorderlicht kleurt de lucht elke avond ___.',
          type: 'choice',
          options: ['opnieuw', 'opniew', 'opnieuwt'],
          correctOptionIndex: 0,
          hint: 'Opnieuw is een eeuw/ieuw woord (vergeet de u voor de w niet)!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'arc45-new-6-2',
          category: 'Langermaakwoord',
          categoryIcon: '✨',
          question: 'Kies de juiste spelling: De narwal heeft een magische lange ___.',
          type: 'choice',
          options: ['tand', 'tant', 'tandt'],
          correctOptionIndex: 0,
          hint: 'Langer maken: tan-den -> dus met een d aan het eind.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'arc45-new-6-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel de mysterieuze walvis met de slagtand:',
          type: 'spell',
          targetWord: 'NARWAL',
          scrambledLetters: ['N', 'A', 'R', 'W', 'A', 'L'],
          hint: 'N - A - R - W - A - L (6 letters).',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'arc45-new-6-4',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Wat is de lange "hoorn" van een narwal eigenlijk?',
          passage: 'De hoorn van de narwal is geen echte hoorn, maar een reusachtige uitgroeiende linkertand vol met miljoenen gevoelige zenuwen. Hiermee kan de narwal temperatuur- en zoutverschillen in het water voelen!',
          type: 'choice',
          options: ['Een superlange tand vol gevoelige zenuwen', 'Een magische toverstaf van ijs', 'Een bot uit haar staart'],
          correctOptionIndex: 0,
          hint: 'Lees wat de hoorn eigenlijk is (een tand).',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    }
  ],

  // ==========================================
  // 6. DINOVALLEI (DINOSAUR) - BRAND NEW
  // ==========================================
  outback: [
    {
      id: 1,
      name: 'Rexy’s Brullende Vulkaan',
      biome: 'outback',
      theme: 'Korte en Lange Klanken (Dinosauriërs)',
      themeColor: '#D32F2F',
      bannerEmoji: '🦖',
      chapterTitle: 'Hoofdstuk 1: De Koning van het Krijttijdperk',
      introStory: 'Rexy de Tyrannosaurus Rex stampt over de aarde. De grond beeft onder zijn zware poten: "ROOOAAAR! Durf jij het prehistorische taalavontuur aan?"',
      animalReward: findAnimal('rexy-trex'),
      questions: [
        {
          id: 'dino45-new-1-1',
          category: 'Klinkerdief',
          categoryIcon: '🦖',
          question: 'Kies het juist gespelde woord: Rexy stapt met reusachtige stappen over de ___.',
          type: 'choice',
          options: ['aarde', 'aarden', 'arrde'],
          correctOptionIndex: 0,
          hint: 'Aarde schrijf je met dubbel aa en rde.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'dino45-new-1-2',
          category: 'Dubbelzetter',
          categoryIcon: '🌋',
          question: 'Kies het juiste woord: Uit de vulkaan stroomt hete rode ___.',
          type: 'choice',
          options: ['lava', 'laava', 'lavva'],
          correctOptionIndex: 0,
          hint: 'La-va: twee open klankgroepen, dus la-va met twee enkele a’s!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'dino45-new-1-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel het woord voor de prehistorische reus:',
          type: 'spell',
          targetWord: 'DINO',
          scrambledLetters: ['D', 'I', 'N', 'O'],
          hint: 'D - I - N - O (4 letters).',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'dino45-new-1-4',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Waarom hadden T-rexen zulke korte voorpootjes?',
          passage: 'Hoewel de voorpoten van een T-rex heel kort waren, waren ze ontzettend gespierd. Wetenschappers denken dat hij ze gebruikte om zich overeind te duwen na een dutje op de grond!',
          type: 'choice',
          options: ['Om zich met sterke spieren overeind te duwen vanaf de grond', 'Om vleugels na te doen', 'Omdat ze nooit gebruikt werden'],
          correctOptionIndex: 0,
          hint: 'Lees over het opstaan na een dutje op de grond.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    },
    {
      id: 2,
      name: 'Trippy’s Driehoornbos',
      biome: 'outback',
      theme: 'Woorden met -d of -t & Schildregels',
      themeColor: '#5D4037',
      bannerEmoji: '🦕',
      chapterTitle: 'Hoofdstuk 2: Het Drievoudige Pantser',
      introStory: 'Trippy de Triceratops graast rustig tussen de reuzenvarens. Zijn grote nekschild beschermt hem tegen roofdieren. "Laten we samen moeilijke woorden verslaan!"',
      animalReward: findAnimal('trippy-triceratops'),
      questions: [
        {
          id: 'dino45-new-2-1',
          category: 'Langermaakwoord',
          categoryIcon: '🦕',
          question: 'Kies de juiste spelling: Trippy heeft een groot en stevig nek___.',
          type: 'choice',
          options: ['schild', 'schilt', 'schiltt'],
          correctOptionIndex: 0,
          hint: 'Langer maken: schil-den -> dus schrijf je schild met een d!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'dino45-new-2-2',
          category: 'Samenstelling',
          categoryIcon: '🌿',
          question: 'Plak de woorden samen: drie + hoorn = ___',
          type: 'choice',
          options: ['driehoorn', 'drieënhoorn', 'driehoornt'],
          correctOptionIndex: 0,
          hint: 'Drie + hoorn = driehoorn.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'dino45-new-2-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel het getal van de hoorns op Trippy’s kop:',
          type: 'spell',
          targetWord: 'DRIE',
          scrambledLetters: ['D', 'R', 'I', 'E'],
          hint: 'D - R - I - E (4 letters).',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'dino45-new-2-4',
          category: 'Woordenschat',
          categoryIcon: '💡',
          question: 'Hoe noem je een dier dat alleen maar planten en bladeren eet?',
          type: 'choice',
          options: ['planteneter (herbivoor)', 'vleeseter (carnivoor)', 'alleseter (omnivoor)'],
          correctOptionIndex: 0,
          hint: 'Trippy eet alleen bladeren en varens, dus een planteneter!',
          gradeBadge: 'Woordenschat'
        }
      ]
    },
    {
      id: 3,
      name: 'Broonty’s Lange Nekvallei',
      biome: 'outback',
      theme: 'Woorden met Open/Gesloten Klankgroepen & Hoge Bomen',
      themeColor: '#388E3C',
      bannerEmoji: '🦕',
      chapterTitle: 'Hoofdstuk 3: De Reus van de Boomtoppen',
      introStory: 'Broonty de Brachiosaurus reikt met zijn gigantische nek tot in de hoogste oerwoudkruinen. "Hoi kleine vriend! Bovenin de bomen waait de wind vol nieuwe woorden!"',
      animalReward: findAnimal('broonty-brachiosaurus'),
      questions: [
        {
          id: 'dino45-new-3-1',
          category: 'Klinkerdief',
          categoryIcon: '🦕',
          question: 'Kies het juist gespelde woord: Broonty eet sappige groene ___.',
          type: 'choice',
          options: ['bladeren', 'blaaderen', 'bladerren'],
          correctOptionIndex: 0,
          hint: 'Bla-de-ren: lange klank aan het einde van de klankgroep -> 1 a!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'dino45-new-3-2',
          category: 'Dubbelzetter',
          categoryIcon: '🌳',
          question: 'Kies het juiste woord: Met zijn zware poten maakt hij diepe ___.',
          type: 'choice',
          options: ['stappen', 'stapen', 'staappen'],
          correctOptionIndex: 0,
          hint: 'Stap-pen: korte /a/ klank -> dus twee p-en (dubbelzetter)!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'dino45-new-3-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel het lichaamsdeel waarmee Broonty hoog in de bomen reikt:',
          type: 'spell',
          targetWord: 'NEK',
          scrambledLetters: ['N', 'E', 'K'],
          hint: 'N - E - K (3 letters).',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'dino45-new-3-4',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Waarom hadden langnekdinosaurussen holle wervels in hun nek?',
          passage: 'De nek van een Brachiosaurus kon wel 12 meter lang worden. Om te voorkomen dat die nek veel te zwaar werd om op te tillen, zaten er luchtkamers in zijn botten, net zoals bij moderne vogels!',
          type: 'choice',
          options: ['Om de nek licht genoeg te maken om hoog op te tillen', 'Om water in te bewaren', 'Zodat hij kon fluiten'],
          correctOptionIndex: 0,
          hint: 'Lees over de lichte botten vol luchtkamers.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    },
    {
      id: 4,
      name: 'Flappie’s Wolkenrots',
      biome: 'outback',
      theme: 'Woorden met -eeuw/-ieuw & Vleugelklanken',
      themeColor: '#0288D1',
      bannerEmoji: '🦅',
      chapterTitle: 'Hoofdstuk 4: Zweven boven de Kraters',
      introStory: 'Flappie de Pterodactylus spreidt haar enorme lederen vleugels uit en zweeft over de dampende geisers. "Vlieg mee over het prehistorische landschap!"',
      animalReward: findAnimal('flappie-pterodactylus'),
      questions: [
        {
          id: 'dino45-new-4-1',
          category: 'Eeuw/Ieuw Woord',
          categoryIcon: '🦅',
          question: 'Kies het juist gespelde woord: Flappie zweeft hoog in de ___ lucht.',
          type: 'choice',
          options: ['blauwe', 'blouwe', 'blaauwe'],
          correctOptionIndex: 0,
          hint: 'Blauw schrijf je met de atje-au van de au-plaat!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'dino45-new-4-2',
          category: 'Luchtwoord',
          categoryIcon: '💨',
          question: 'Kies de juiste spelling: De wind tilt haar vleugels op in de ___.',
          type: 'choice',
          options: ['lucht', 'lugt', 'lught'],
          correctOptionIndex: 0,
          hint: 'Luchtwoord: korte /u/ + cht = lucht.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'dino45-new-4-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel het woord voor de ledematen waarmee Flappie vliegt:',
          type: 'spell',
          targetWord: 'VLEUGEL',
          scrambledLetters: ['V', 'L', 'E', 'U', 'G', 'E', 'L'],
          hint: 'V - L - EU - G - E - L (7 letters).',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'dino45-new-4-4',
          category: 'Woordsoorten',
          categoryIcon: '🏷️',
          question: 'Wat is het bijvoeglijk naamwoord in de zin: "De snelle vliegdino zweeft boven de vulkaan."',
          type: 'choice',
          options: ['snelle', 'vliegdino', 'zweeft'],
          correctOptionIndex: 0,
          hint: 'Het vertelt HOE de vliegdino is: snelle!',
          gradeBadge: 'Grammatica'
        }
      ]
    },
    {
      id: 5,
      name: 'Steggie’s Ruggengraatpad',
      biome: 'outback',
      theme: 'Woorden met ng/nk & Puntige Platen',
      themeColor: '#E65100',
      bannerEmoji: '🦖',
      chapterTitle: 'Hoofdstuk 5: De Gepantserde Rug',
      introStory: 'Steggie de Stegosaurus wiegt met haar met stekels bezette staart. Langs haar rug staan grote benige platen: "Laat zien hoe scherp jouw taalkennis is!"',
      animalReward: findAnimal('steggie-stegosaurus'),
      questions: [
        {
          id: 'dino45-new-5-1',
          category: 'Plankwoord',
          categoryIcon: '🦖',
          question: 'Kies het juiste woord: Steggie heeft scherpe stekels op haar staart___.',
          type: 'choice',
          options: ['punt', 'puntt', 'pund'],
          correctOptionIndex: 0,
          hint: 'Punt schrijf je met een t (punten).',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'dino45-new-5-2',
          category: 'Zingwoord',
          categoryIcon: '🛡️',
          question: 'Kies het juist gespelde woord: Langs haar rug loopt een rij van ___ platen.',
          type: 'choice',
          options: ['puntige', 'puntigge', 'puntighe'],
          correctOptionIndex: 0,
          hint: 'Puntig + e = puntige (achtervoegsel -ig).',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'dino45-new-5-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel de puntige verdediging op Steggie’s staart:',
          type: 'spell',
          targetWord: 'STEKEL',
          scrambledLetters: ['S', 'T', 'E', 'K', 'E', 'L'],
          hint: 'S - T - E - K - E - L (6 letters).',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'dino45-new-5-4',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Waarom had een Stegosaurus grote benige platen op haar rug?',
          passage: 'Wetenschappers denken dat de rugplaten van de Stegosaurus fungeerden als zonnepanelen. Door er bloed doorheen te pompen kon de dinosaurus snel opwarmen in de ochtendzon of afkoelen in de wind.',
          type: 'choice',
          options: ['Om haar lichaamstemperatuur te regelen met de zon en de wind', 'Om mee te kunnen zwemmen', 'Om eten op te bewaren'],
          correctOptionIndex: 0,
          hint: 'Lees over het opwarmen en afkoelen als zonnepanelen.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    },
    {
      id: 6,
      name: 'Velo’s Snelheidskloof',
      biome: 'outback',
      theme: 'Woorden met Verkleinwoorden & Snelle Zinnen',
      themeColor: '#C2185B',
      bannerEmoji: '🦖',
      chapterTitle: 'Hoofdstuk 6: De Pientere Jager',
      introStory: 'Velo de Velociraptor tikt met haar sikkelklauw op een steen. "Wij jagen altijd slim en in teamverband. Sluit de dinovallei af met een perfecte score!"',
      animalReward: findAnimal('velo-velociraptor'),
      questions: [
        {
          id: 'dino45-new-6-1',
          category: 'Verkleinwoord',
          categoryIcon: '🦖',
          question: 'Wat is het juiste verkleinwoord van "klauw"?',
          type: 'choice',
          options: ['klauwtje', 'klauwje', 'klauwetje'],
          correctOptionIndex: 0,
          hint: 'Klauw + tje = klauwtje.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'dino45-new-6-2',
          category: 'Signaalwoorden',
          categoryIcon: '⚡',
          question: 'Welk signaalwoord geeft een reden aan: "Velo rent hard, ___ ze haar prooi wil vangen."',
          type: 'choice',
          options: ['omdat', 'terwijl', 'maar'],
          correctOptionIndex: 0,
          hint: 'Omdat legt de reden uit!',
          gradeBadge: 'Begrijpend Lezen'
        },
        {
          id: 'dino45-new-6-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel het woord voor het spoor dat dino’s achterlieten:',
          type: 'spell',
          targetWord: 'FOSSIEL',
          scrambledLetters: ['F', 'O', 'S', 'S', 'I', 'E', 'L'],
          hint: 'F - O - SS - IE - L (let op dubbele ss).',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'dino45-new-6-4',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Wat hadden Velociraptors op hun lichaam dat pas recent door fossielen is ontdekt?',
          passage: 'Lange tijd dachten mensen dat Velociraptors schubben hadden zoals hagedissen. Maar recente fossielvondsten in Mongolië hebben bewezen dat ze bedekt waren met echte vogelveren!',
          type: 'choice',
          options: ['Echte vogelveren', 'Glimmende schelpen', 'Zachte wollen vacht'],
          correctOptionIndex: 0,
          hint: 'Lees over de ontdekking van de vogelveren.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    }
  ],

  // ==========================================
  // 7. SPROOKJESBOS (ENCHANTED FOREST) - BRAND NEW
  // ==========================================
  mountain: [
    {
      id: 1,
      name: 'Draco’s Vlammenburcht',
      biome: 'mountain',
      theme: 'Korte en Lange Klanken (Magische Sprookjes)',
      themeColor: '#7B1FA2',
      bannerEmoji: '🐉',
      chapterTitle: 'Hoofdstuk 1: Fonkelende Vlammen en Goud',
      introStory: 'Draco het vriendelijke vuurdraakje blaast glinsterende vonkjes over het kasteel. "Welkom in het Betoverde Sprookjesbos! Hier zit elk woord vol magie!"',
      animalReward: findAnimal('draco-draak'),
      questions: [
        {
          id: 'fairy45-new-1-1',
          category: 'Klinkerdief',
          categoryIcon: '🐉',
          question: 'Kies het juist gespelde woord: De draak woont in een kasteel met hoge ___.',
          type: 'choice',
          options: ['muren', 'muuren', 'murren'],
          correctOptionIndex: 0,
          hint: 'Mu-ren: lange /uu/ aan het eind van de klankgroep -> 1 u!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'fairy45-new-1-2',
          category: 'Dubbelzetter',
          categoryIcon: '✨',
          question: 'Kies het juiste woord: Uit zijn neus vliegen gouden ___.',
          type: 'choice',
          options: ['vlammen', 'vlamen', 'vlaamen'],
          correctOptionIndex: 0,
          hint: 'Vlam-men: korte /a/ klank -> twee m-en (dubbelzetter)!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'fairy45-new-1-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel het mythische wezen dat vuur spuwt:',
          type: 'spell',
          targetWord: 'DRAAK',
          scrambledLetters: ['D', 'R', 'A', 'A', 'K'],
          hint: 'D - R - AA - K (5 letters).',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'fairy45-new-1-4',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Waarom bewaakt Draco het gouden boek van het sprookjesbos?',
          passage: 'In het gouden boek staan alle mooie verhalen van de wereld opgeschreven. Draco zorgt ervoor dat niemand de bladzijden kan beschadigen, zodat kinderen voor altijd sprookjes kunnen blijven lezen.',
          type: 'choice',
          options: ['Om alle mooie verhalen te beschermen zodat kinderen ze kunnen lezen', 'Omdat hij van goud houdt om op te slapen', 'Om het boek te verstoppen in de grond'],
          correctOptionIndex: 0,
          hint: 'Lees over het bewaren van verhalen voor kinderen.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    },
    {
      id: 2,
      name: 'Stella’s Regenboogweide',
      biome: 'mountain',
      theme: 'Woorden met -d of -t & Magische Hoorns',
      themeColor: '#EC407A',
      bannerEmoji: '🦄',
      chapterTitle: 'Hoofdstuk 2: Galop over de Regenboog',
      introStory: 'Stella de eenhoorn danst over een tapijt van fonkelende bloemen. Haar spiraalvormige hoorn geeft een zacht roze licht. "Laat je fantasie stralen!"',
      animalReward: findAnimal('stella-eenhoorn'),
      questions: [
        {
          id: 'fairy45-new-2-1',
          category: 'Langermaakwoord',
          categoryIcon: '🦄',
          question: 'Kies de juiste spelling: Stella heeft een glanzende zachte ___.',
          type: 'choice',
          options: ['huid', 'huit', 'huyt'],
          correctOptionIndex: 0,
          hint: 'Langer maken: hui-den (je hoort een d, dus schrijf je huid met een d)!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'fairy45-new-2-2',
          category: 'Samenstelling',
          categoryIcon: '🌈',
          question: 'Plak de woorden samen: regen + boog = ___',
          type: 'choice',
          options: ['regenboog', 'regensboog', 'regenboge'],
          correctOptionIndex: 0,
          hint: 'Regen + boog = regenboog.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'fairy45-new-2-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel het magische paard met één hoorn:',
          type: 'spell',
          targetWord: 'EENHOORN',
          scrambledLetters: ['E', 'E', 'N', 'H', 'O', 'O', 'R', 'N'],
          hint: 'EEN + HOORN (8 letters).',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'fairy45-new-2-4',
          category: 'Woordenschat',
          categoryIcon: '💡',
          question: 'Wat betekent het woord BETOVEREND?',
          type: 'choice',
          options: ['Magisch mooi en adembenemend', 'Heel erg donker en koud', 'Vol met lawaai'],
          correctOptionIndex: 0,
          hint: 'Betoverend betekent zo mooi dat het lijkt op toverkunst!',
          gradeBadge: 'Woordenschat'
        }
      ]
    },
    {
      id: 3,
      name: 'Faye’s Elfjeswaterval',
      biome: 'mountain',
      theme: 'Woorden met -eeuw/-ieuw & Glitterstof',
      themeColor: '#AB47BC',
      bannerEmoji: '🧚‍♀️',
      chapterTitle: 'Hoofdstuk 3: Vleugeltjes van Sterrenstof',
      introStory: 'Faye het woudelfje strooit glitterend elfenstof over de waterlelies. "Elk goed gespeld woord laat de bloemen nog feller bloeien!"',
      animalReward: findAnimal('faye-elfje'),
      questions: [
        {
          id: 'fairy45-new-3-1',
          category: 'Eeuw/Ieuw Woord',
          categoryIcon: '🧚‍♀️',
          question: 'Kies het juist gespelde woord: Faye leert elke dag een ___ toverspreuk.',
          type: 'choice',
          options: ['nieuwe', 'niewe', 'nieuwt'],
          correctOptionIndex: 0,
          hint: 'Eeuw/Ieuw woord: denk aan de u voor de w (nieuwe)!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'fairy45-new-3-2',
          category: 'Verkleinwoord',
          categoryIcon: '✨',
          question: 'Wat is het juiste verkleinwoord van "ster"?',
          type: 'choice',
          options: ['sterretje', 'stertje', 'sterpje'],
          correctOptionIndex: 0,
          hint: 'Korte klank /e/ bij ster -> ster-re-tje met dubbel r!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'fairy45-new-3-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel het magische wezentje met transparante vleugels:',
          type: 'spell',
          targetWord: 'ELFJE',
          scrambledLetters: ['E', 'L', 'F', 'J', 'E'],
          hint: 'E - L - F - J - E (5 letters).',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'fairy45-new-3-4',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Waarom zingen de elfjes bij zonsondergang voor de bloemen?',
          passage: 'In het sprookjesbos sluiten de bloemblaadjes zich als de nacht valt. De elfjes zingen een zacht wiegeliedje zodat de bloemen zoete dromen hebben en ’s ochtends weer vol nectar ontwaken.',
          type: 'choice',
          options: ['Zodat de bloemen rustig kunnen slapen en ’s ochtends vol nectar ontwaken', 'Omdat ze niet van stilte houden', 'Om de bijen weg te jagen'],
          correctOptionIndex: 0,
          hint: 'Lees over het wiegeliedje voor de bloemen.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    },
    {
      id: 4,
      name: 'Grom’s Paddenstoelenhut',
      biome: 'mountain',
      theme: 'Woorden met ng/nk & Rood-Witte Stippen',
      themeColor: '#E53935',
      bannerEmoji: '🍄',
      chapterTitle: 'Hoofdstuk 4: Een Rode Muts in het Mos',
      introStory: 'Grom de vriendelijke kabouter veegt het stoepje voor zijn grote paddenstoelenhuis met een berkentakje. "Kom gezellig binnen voor een kopje kruidenthee!"',
      animalReward: findAnimal('grom-kabouter'),
      questions: [
        {
          id: 'fairy45-new-4-1',
          category: 'Plankwoord',
          categoryIcon: '🍄',
          question: 'Kies het juiste woord: Grom zit op een houten zit___.',
          type: 'choice',
          options: ['bank', 'bangk', 'banck'],
          correctOptionIndex: 0,
          hint: 'Plankwoord: daar mag geen g tussen!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'fairy45-new-4-2',
          category: 'Zingwoord',
          categoryIcon: '🔔',
          question: 'Kies het juist gespelde woord: Boven de deur hangt een gouden ___.',
          type: 'choice',
          options: ['belletje', 'beltje', 'belletie'],
          correctOptionIndex: 0,
          hint: 'Bel-le-tje: korte /e/ -> twee l-en + etje.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'fairy45-new-4-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel het huisje met witte stippen op een rode hoed:',
          type: 'spell',
          targetWord: 'ZWAM',
          scrambledLetters: ['Z', 'W', 'A', 'M'],
          hint: 'Z - W - A - M (4 letters, ander woord voor paddenstoel).',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'fairy45-new-4-4',
          category: 'Taal & Zinsleer',
          categoryIcon: '🔍',
          question: 'Wat is het meervoud (meer dan één) van KABOUTER?',
          type: 'choice',
          options: ['kabouters', 'kabouteren', 'kabouterse'],
          correctOptionIndex: 0,
          hint: 'Eén kabouter, twee kabouters (met een -s)!',
          gradeBadge: 'Grammatica'
        }
      ]
    },
    {
      id: 5,
      name: 'Ignis’ Asvallei',
      biome: 'mountain',
      theme: 'Woorden met ch/g & Herrijzende Vlammen',
      themeColor: '#FF6F00',
      bannerEmoji: '🦅',
      chapterTitle: 'Hoofdstuk 5: Uit de As Herrezen',
      introStory: 'Ignis de magische feniks spreidt haar gouden veren uit. Een gloed van warm licht verlicht het hele bos: "Geef nooit op! Zelfs uit tegenslag herrijs je sterker!"',
      animalReward: findAnimal('ignis-feniks'),
      questions: [
        {
          id: 'fairy45-new-5-1',
          category: 'Luchtwoord',
          categoryIcon: '🦅',
          question: 'Kies het juist gespelde woord: De feniks vliegt hoog in de zwoele ___.',
          type: 'choice',
          options: ['nacht', 'nagt', 'naght'],
          correctOptionIndex: 0,
          hint: 'Luchtwoord: korte klank /a/ + cht = nacht.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'fairy45-new-5-2',
          category: 'Klinkerdief',
          categoryIcon: '🔥',
          question: 'Kies het juiste woord: Haar veren hebben een diepe gouden ___.',
          type: 'choice',
          options: ['kleur', 'kloer', 'cleur'],
          correctOptionIndex: 0,
          hint: 'Kleur schrijf je met kl- en -eur.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'fairy45-new-5-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel de magische vuurvogel uit de mythologie:',
          type: 'spell',
          targetWord: 'FENIKS',
          scrambledLetters: ['F', 'E', 'N', 'I', 'K', 'S'],
          hint: 'F - E - N - I - K - S (6 letters).',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'fairy45-new-5-4',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Wat is de legendarische eigenschap van een feniks?',
          passage: 'Volgens oude sprookjes kan een feniks honderden jaren oud worden. Als haar tijd gekomen is, vat ze vlam en herrijst er uit haar eigen as direct weer een gezond, jong kuikentje.',
          type: 'choice',
          options: ['Ze kan na honderden jaren uit haar eigen as herrijzen als jong kuiken', 'Ze kan onder water ademen', 'Ze kan stenen in ijs veranderen'],
          correctOptionIndex: 0,
          hint: 'Lees over het herrijzen uit haar eigen as.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    },
    {
      id: 6,
      name: 'Luna’s Maanverlichte Eik',
      biome: 'mountain',
      theme: 'Woorden met Open/Gesloten Klankgroepen & Wijsheid',
      themeColor: '#303F9F',
      bannerEmoji: '🦉',
      chapterTitle: 'Hoofdstuk 6: De Grote Kroning van het Sprookjesbos',
      introStory: 'Luna de Maanuil zit op de hoogste tak van de duizendjarige eik. Haar ogen fonkelen als sterren: "Je hebt alle geheimen van het sprookjesbos ontrafeld! Je bent een ware Meester-Taalonderzoeker!"',
      animalReward: findAnimal('luna-uil'),
      questions: [
        {
          id: 'fairy45-new-6-1',
          category: 'Klinkerdief',
          categoryIcon: '🦉',
          question: 'Kies het juist gespelde woord: De uil spreekt met grote ___.',
          type: 'choice',
          options: ['wijsheid', 'weijsheid', 'wijsheit'],
          correctOptionIndex: 0,
          hint: 'Wijs (met de lange ij) + heid (met een d) = wijsheid.',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'fairy45-new-6-2',
          category: 'Dubbelzetter',
          categoryIcon: '🌙',
          question: 'Kies het juiste woord: De maan schijnt door de dichte boom___.',
          type: 'choice',
          options: ['takken', 'taken', 'taakken'],
          correctOptionIndex: 0,
          hint: 'Tak-ken: korte /a/ klank -> dus twee k-en (dubbelzetter)!',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'fairy45-new-6-3',
          category: 'Letters Leggen',
          categoryIcon: '✏️',
          question: 'Spel het hemellichaam dat ’s nachts schijnt:',
          type: 'spell',
          targetWord: 'MAAN',
          scrambledLetters: ['M', 'A', 'A', 'N'],
          hint: 'M - AA - N (4 letters).',
          gradeBadge: 'Groep 4-5'
        },
        {
          id: 'fairy45-new-6-4',
          category: 'Begrijpend Lezen',
          categoryIcon: '📖',
          question: 'Waarom kunnen uilen ’s nachts geruisloos vliegen?',
          passage: 'De randen van de uilenveren hebben speciale gekartelde franjes. Deze franjes breken de luchtstromen zachtjes af, waardoor een uil muisstil door de nacht kan vliegen zonder enig suizend geluid!',
          type: 'choice',
          options: ['Dankzij speciale gefranjerde veren die het vlieggeluid dempen', 'Omdat ze heel klein zijn', 'Omdat ze alleen zweven'],
          correctOptionIndex: 0,
          hint: 'Lees over de speciale gefranjerde veren die het geluid dempen.',
          gradeBadge: 'Begrijpend Lezen'
        }
      ]
    }
  ]
};
