import { Level } from '../types';
import { findAnimal } from './biomeLevels68_part1';

// ==========================================
// 5. POOLCIRKEL (ARCTIC) - GROEP 6-7-8 NEW
// ==========================================
export const ARCTIC_LEVELS_68: Level[] = [
  {
    id: 1,
    name: 'Barny’s IJskap Expeditie',
    biome: 'snow',
    theme: 'Werkwoordspelling (d/t/dt) & Sterke Werkwoorden',
    themeColor: '#00BCD4',
    bannerEmoji: '🐻‍❄️',
    chapterTitle: 'Hoofdstuk 1: De Grote Noordelijke IJszee',
    introStory: 'Barny de ijsbeer navigeert over het pakijs. "In de ijzige vrieskou moeten onze spellingregels messcherp blijven!"',
    animalReward: findAnimal('barny-ijsbeer'),
    questions: [
      {
        id: 'arc68-new-1-1',
        category: 'Werkwoordspelling (TT)',
        categoryIcon: '🐻‍❄️',
        question: 'Vul in: "De ijsbeer ___ kilometerslang over het krakende ijs."',
        type: 'choice',
        options: ['zwerft', 'zwerfd', 'zwerfdt'],
        correctOptionIndex: 0,
        hint: 'Zwerven: stam zwerf + t = zwerft.',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'arc68-new-1-2',
        category: 'Sterke Werkwoorden (VT)',
        categoryIcon: '❄️',
        question: 'Wat is de verleden tijd van "bevriezen"? (Gisteren ... het hele meer)',
        type: 'choice',
        options: ['bevroor', 'bevriesde', 'bevroren'],
        correctOptionIndex: 0,
        hint: 'Bevriezen - bevroor - bevroren.',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'arc68-new-1-3',
        category: 'Letters Leggen',
        categoryIcon: '✏️',
        question: 'Spel het woord voor de drijvende ijsmassa in zee:',
        type: 'spell',
        targetWord: 'PAKIJS',
        scrambledLetters: ['P', 'A', 'K', 'I', 'J', 'S'],
        hint: 'Pak + ijs (6 letters, met lange ij).',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'arc68-new-1-4',
        category: 'Begrijpend Lezen',
        categoryIcon: '📖',
        question: 'Waarom hebben ijsberen een dikke laag spek (blubber) van wel 10 centimeter?',
        passage: 'Het water in de Noordelijke IJszee is vaak onder het vriespunt (-1,5 °C). De dikke speklaag onder de huid van een ijsbeer isoleert het lichaam zo perfect dat hij urenlang in ijskoud water kan zwemmen zonder onderkoeld te raken.',
        type: 'choice',
        options: ['Als thermische isolatie tegen dodelijke onderkoeling in vrieswater', 'Om sneller te kunnen zinken naar de zeebodem', 'Om voedsel in op te slaan als reservemaag'],
        correctOptionIndex: 0,
        hint: 'Lees over de isolatie tegen de ijskoude watertemperatuur.',
        gradeBadge: 'Begrijpend Lezen'
      }
    ]
  },
  {
    id: 2,
    name: 'Plons’ Kolonieformatie',
    biome: 'snow',
    theme: 'Woordsoorten & Verbuigingen',
    themeColor: '#03A9F4',
    bannerEmoji: '🐧',
    chapterTitle: 'Hoofdstuk 2: Warmte in de Barre Storm',
    introStory: 'Plons de pinguïn staat middenin de kolonie. "Weet jij hoe je bijvoeglijke naamwoorden correct verbuigt?"',
    animalReward: findAnimal('plons-pinguin'),
    questions: [
      {
        id: 'arc68-new-2-1',
        category: 'Bijvoeglijk Naamwoord Verbuiging',
        categoryIcon: '🐧',
        question: 'Kies de juiste spelling: "De pinguïns trotseren de ___ vrieskou."',
        type: 'choice',
        options: ['onbarmhartige', 'onbarmhartigen', 'onbarmhartigge'],
        correctOptionIndex: 0,
        hint: 'De onbarmhartige vrieskou (met enkele -e).',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'arc68-new-2-2',
        category: 'Werkwoordspelling (d/t)',
        categoryIcon: '❄️',
        question: 'Vul in: "De vaderpinguïn ___ het ei op zijn voeten warm."',
        type: 'choice',
        options: ['houdt', 'houd', 'hout'],
        correctOptionIndex: 0,
        hint: 'Houden: stam houd + t = houdt.',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'arc68-new-2-3',
        category: 'Letters Leggen',
        categoryIcon: '✏️',
        question: 'Spel het woord voor een grote groep pinguïns samen:',
        type: 'spell',
        targetWord: 'KOLONIE',
        scrambledLetters: ['K', 'O', 'L', 'O', 'N', 'I', 'E'],
        hint: 'K - O - L - O - N - IE (7 letters).',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'arc68-new-2-4',
        category: 'Zinsleer',
        categoryIcon: '🔍',
        question: 'Wat is het onderwerp (OW) in: "Tijdens de donkere poolnacht beschermen de pinguïns hun kwetsbare jongen."',
        type: 'choice',
        options: ['de pinguïns (wie beschermen?)', 'de donkere poolnacht', 'hun kwetsbare jongen'],
        correctOptionIndex: 0,
        hint: 'Vraag: WIE beschermen de jongen? -> de pinguïns.',
        gradeBadge: 'Grammatica'
      }
    ]
  },
  {
    id: 3,
    name: 'Robbie’s Diepteduik',
    biome: 'snow',
    theme: 'Signaalwoorden (Samenvatting & Conclusie)',
    themeColor: '#0097A7',
    bannerEmoji: '🦭',
    chapterTitle: 'Hoofdstuk 3: Onder het Dikke Zeerijs',
    introStory: 'Robbie de zeehond duikt honderden meters diep onder het ijs. "Let op signaalwoorden die een conclusie inluiden!"',
    animalReward: findAnimal('robbie-zeehond'),
    questions: [
      {
        id: 'arc68-new-3-1',
        category: 'Signaalwoorden (Conclusie)',
        categoryIcon: '🦭',
        question: 'Welk signaalwoord geeft een CONCLUSIE aan?',
        type: 'choice',
        options: ['kortom', 'bijvoorbeeld', 'hoewel'],
        correctOptionIndex: 0,
        hint: '"Kortom" of "concluderend" vat samen en trekt een conclusie.',
        gradeBadge: 'Begrijpend Lezen'
      },
      {
        id: 'arc68-new-3-2',
        category: 'Sterke Werkwoorden',
        categoryIcon: '🐟',
        question: 'Wat is de verleden tijd van "glijden"? (De zeehond ... gisteren van het ijs)',
        type: 'choice',
        options: ['gleed', 'glijdde', 'gegleden'],
        correctOptionIndex: 0,
        hint: 'Glijden - gleed - gegleden.',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'arc68-new-3-3',
        category: 'Letters Leggen',
        categoryIcon: '✏️',
        question: 'Spel het woord voor het ademgat in het ijs:',
        type: 'spell',
        targetWord: 'BIJT',
        scrambledLetters: ['B', 'I', 'J', 'T'],
        hint: 'B - IJ - T (4 letters, een open wak in het ijs).',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'arc68-new-3-4',
        category: 'Begrijpend Lezen',
        categoryIcon: '📖',
        question: 'Hoe houden zeehonden hun ademgaten open als het ijs meters dik wordt?',
        passage: 'Zeehonden krabben met hun scherpe klauwen en tanden continu aan de randen van hun ademgaten in het ijs. Zelfs bij -40 °C voorkomen ze zo dat het gat dichtvriest.',
        type: 'choice',
        options: ['Ze schrapen het ijs continu open met hun sterke klauwen en tanden', 'Ze blazen warme lucht', 'Ze gebruiken vuur'],
        correctOptionIndex: 0,
        hint: 'Lees over het schrapen met de klauwen.',
        gradeBadge: 'Begrijpend Lezen'
      }
    ]
  },
  {
    id: 4,
    name: 'Pip’s Tundra Sluiproute',
    biome: 'snow',
    theme: 'Werkwoordspelling (d/t) & Tundra Woordenschat',
    themeColor: '#E0F7FA',
    bannerEmoji: '🦊',
    chapterTitle: 'Hoofdstuk 4: Het Witte Spook van de Toendra',
    introStory: 'Pip de poolvos springt geruisloos. "In de toendra is precisie van levensbelang, net als bij de werkwoordspelling!"',
    animalReward: findAnimal('pip-poolvos'),
    questions: [
      {
        id: 'arc68-new-4-1',
        category: 'Werkwoordspelling (d/t)',
        categoryIcon: '🦊',
        question: 'Vul in: "De poolvos ___ de lemming onder de sneeuw."',
        type: 'choice',
        options: ['lokaliseert', 'lokaliseerd', 'lokaliseerdt'],
        correctOptionIndex: 0,
        hint: 'Lokaliseren: stam lokaliseer + t = lokaliseert.',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'arc68-new-4-2',
        category: 'Woordenschat',
        categoryIcon: '❄️',
        question: 'Wat betekent het woord "permafrost"?',
        type: 'choice',
        options: ['Grond die het hele jaar door permanent bevroren blijft', 'Een soort ijskoude hagel', 'Een poolbloem'],
        correctOptionIndex: 0,
        hint: 'Permanente vorst in de bodem = permafrost.',
        gradeBadge: 'Woordenschat'
      },
      {
        id: 'arc68-new-4-3',
        category: 'Letters Leggen',
        categoryIcon: '✏️',
        question: 'Spel het woord voor het boomloze poollandschap:',
        type: 'spell',
        targetWord: 'TOENDRA',
        scrambledLetters: ['T', 'O', 'E', 'N', 'D', 'R', 'A'],
        hint: 'T - OE - N - D - R - A (7 letters).',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'arc68-new-4-4',
        category: 'Zinsleer',
        categoryIcon: '🔍',
        question: 'Wat is het lijdend voorwerp in: "De vos vangt behendig een lemming in de sneeuw."',
        type: 'choice',
        options: ['een lemming (WAT vangt de vos?)', 'de vos', 'in de sneeuw'],
        correctOptionIndex: 0,
        hint: 'Vraag: WAT vangt de vos? -> een lemming.',
        gradeBadge: 'Grammatica'
      }
    ]
  },
  {
    id: 5,
    name: 'Boris’ Slagtand Vesting',
    biome: 'snow',
    theme: 'Hoofdgedachte & Alineaverbanden',
    themeColor: '#546E7A',
    bannerEmoji: '🦭',
    chapterTitle: 'Hoofdstuk 5: Kracht en Uithoudingsvermogen',
    introStory: 'Boris de walrus rust uit op een gigantische ijsschots. "Begrijpend lezen op Cito-niveau vraagt om goed kijken naar de kern van elke alinea!"',
    animalReward: findAnimal('boris-walrus'),
    questions: [
      {
        id: 'arc68-new-5-1',
        category: 'Cito Hoofdgedachte',
        categoryIcon: '🦭',
        question: 'Wat is de beste samenvattende titel voor een alinea over walrussenslagtanden en hun dubbele functie?',
        type: 'choice',
        options: ['Slagtanden: IJspriem en Voedselgraver', 'Waarom Walrussen van IJs Houden', 'De Zeebodem van de Noordpool'],
        correctOptionIndex: 0,
        hint: 'De titel moet beide hoofdfuncties van de slagtanden dekken.',
        gradeBadge: 'Begrijpend Lezen'
      },
      {
        id: 'arc68-new-5-2',
        category: 'Werkwoordspelling (Voltooid Deelwoord)',
        categoryIcon: '🌊',
        question: 'Kies de juiste spelling: "De walrus heeft zijn tanden diep in het ijs ___."',
        type: 'choice',
        options: ['geplant', 'gepland', 'geplantt'],
        correctOptionIndex: 0,
        hint: 'Planten - plantte - geplant (t-kofschip). Gepland met een d komt van plannen (een afspraak).',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'arc68-new-5-3',
        category: 'Letters Leggen',
        categoryIcon: '✏️',
        question: 'Spel het woord voor het materiaal van de slagtanden:',
        type: 'spell',
        targetWord: 'IVOOR',
        scrambledLetters: ['I', 'V', 'O', 'O', 'R'],
        hint: 'I - V - OO - R (5 letters).',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'arc68-new-5-4',
        category: 'Zinsleer',
        categoryIcon: '🔍',
        question: 'Wat is het werkwoordelijk gezegde in: "De zware walrus zal morgen vroeg naar een nieuwe ijsschots moeten zwemmen."',
        type: 'choice',
        options: ['zal moeten zwemmen', 'de zware walrus', 'naar een nieuwe ijsschots'],
        correctOptionIndex: 0,
        hint: 'Alle werkwoorden samen: hulpwerkwoord zal + hulpwerkwoord moeten + zelfstandig werkwoord zwemmen.',
        gradeBadge: 'Grammatica'
      }
    ]
  },
  {
    id: 6,
    name: 'Nora’s Poollicht Paleis',
    biome: 'snow',
    theme: 'Eindtoets Poolcirkel (Meesterschap Groep 6-7-8)',
    themeColor: '#7E57C2',
    bannerEmoji: '🦄',
    chapterTitle: 'Hoofdstuk 6: De Kroning onder de Aurora Borealis',
    introStory: 'Nora de narwal zwemt onder het dansende noorderlicht. "Fantastisch werk! Sluit de poolmissie af met een 100% topscore!"',
    animalReward: findAnimal('nora-narwal'),
    questions: [
      {
        id: 'arc68-new-6-1',
        category: 'Cito Tekstverbanden',
        categoryIcon: '🦄',
        question: 'Welk signaalwoord geeft een VOORWAARDE aan in een zin?',
        type: 'choice',
        options: ['mits (of indien/tenzij)', 'daarom', 'echter'],
        correctOptionIndex: 0,
        hint: '"Mits" betekent: op voorwaarde dat!',
        gradeBadge: 'Begrijpend Lezen'
      },
      {
        id: 'arc68-new-6-2',
        category: 'Werkwoordspelling (d/t)',
        categoryIcon: '✨',
        question: 'Vul in: "Het noorderlicht ___ de nachtelijke hemel groen."',
        type: 'choice',
        options: ['kleurt', 'kleurd', 'kleurdt'],
        correctOptionIndex: 0,
        hint: 'Kleuren: stam kleur + t = kleurt.',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'arc68-new-6-3',
        category: 'Letters Leggen',
        categoryIcon: '✏️',
        question: 'Spel de Latijnse naam voor het noorderlicht:',
        type: 'spell',
        targetWord: 'AURORA',
        scrambledLetters: ['A', 'U', 'R', 'O', 'R', 'A'],
        hint: 'A - U - R - O - R - A (6 letters).',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'arc68-new-6-4',
        category: 'Zinsleer',
        categoryIcon: '🔍',
        question: 'Wat is het meewerkend voorwerp (MV) in: "De expeditieleider gaf de onderzoekers nieuwe instructies."',
        type: 'choice',
        options: ['de onderzoekers (aan wie gaf hij ze?)', 'de expeditieleider', 'nieuwe instructies'],
        correctOptionIndex: 0,
        hint: 'Vraag: Aan wie gaf hij instructies? -> aan de onderzoekers.',
        gradeBadge: 'Grammatica'
      }
    ]
  }
];

// ==========================================
// 6. DINOVALLEI (DINOSAUR) - GROEP 6-7-8 NEW
// ==========================================
export const DINOSAUR_LEVELS_68: Level[] = [
  {
    id: 1,
    name: 'Rexy’s Paleontologie Vulkaan',
    biome: 'outback',
    theme: 'Werkwoordspelling & Prehistorische Wetenschap',
    themeColor: '#D32F2F',
    bannerEmoji: '🦖',
    chapterTitle: 'Hoofdstuk 1: Giganten van het Mesozoïcum',
    introStory: 'Rexy de T-rex stampt door het fossielenveld. "Laten we de wetten van de Nederlandse taal opgraven!"',
    animalReward: findAnimal('rexy-trex'),
    questions: [
      {
        id: 'dino68-new-1-1',
        category: 'Werkwoordspelling (d/t)',
        categoryIcon: '🦖',
        question: 'Vul in: "De paleontoloog ___ een reusachtig bot op in het kalksteen."',
        type: 'choice',
        options: ['graaft', 'graafd', 'graafdt'],
        correctOptionIndex: 0,
        hint: 'Graven: stam graaf + t = graaft.',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'dino68-new-1-2',
        category: 'Sterke Werkwoorden (VT)',
        categoryIcon: '🌋',
        question: 'Wat is de verleden tijd van "vergaan"? (De botten ... miljoenen jaren geleden niet)',
        type: 'choice',
        options: ['vergingen', 'vergaanden', 'vergingde'],
        correctOptionIndex: 0,
        hint: 'Vergaan - verging - vergaan.',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'dino68-new-1-3',
        category: 'Letters Leggen',
        categoryIcon: '✏️',
        question: 'Spel het woord voor een wetenschapper die fossielen onderzoekt:',
        type: 'spell',
        targetWord: 'PALEONTOLOOG',
        scrambledLetters: ['P', 'A', 'L', 'E', 'O', 'N', 'T', 'O', 'L', 'O', 'O', 'G'],
        hint: 'P - A - L - E - O - N - T - O - L - OO - G (12 letters).',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'dino68-new-1-4',
        category: 'Begrijpend Lezen',
        categoryIcon: '📖',
        question: 'Hoe ontstaat een versteend dinosaurusfossiel?',
        passage: 'Wanneer een dinosaurus stierf en snel werd bedekt door modder of zand, losten de zachte weefsels op. Over een periode van miljoenen jaren drongen mineraalrijke waterstromen in de poriën van de botten, waardoor de botstructuur langzaam veranderde in massieve steen.',
        type: 'choice',
        options: ['Mineralen in grondwater vullen over miljoenen jaren de poriën van botten op tot steen', 'Door vulkaanlava die direct stolt', 'Door blikseminslag op het zand'],
        correctOptionIndex: 0,
        hint: 'Lees over de mineralen die de poriën van de botten vullen.',
        gradeBadge: 'Begrijpend Lezen'
      }
    ]
  },
  {
    id: 2,
    name: 'Trippy’s Verdedigingslinie',
    biome: 'outback',
    theme: 'Zinsleer (Bijvoeglijke Bepaling & Verbuigingen)',
    themeColor: '#5D4037',
    bannerEmoji: '🦕',
    chapterTitle: 'Hoofdstuk 2: Het Bottenpantser',
    introStory: 'Trippy de Triceratops zakt door zijn voorpoten. "Onderzoek de structuur van complexe zinnen!"',
    animalReward: findAnimal('trippy-triceratops'),
    questions: [
      {
        id: 'dino68-new-2-1',
        category: 'Bijvoeglijke Bepaling',
        categoryIcon: '🦕',
        question: 'Wat is de bijvoeglijke bepaling in: "Het massieve nekschild van hoorn beschermde de dinosaurus tegen beten."',
        type: 'choice',
        options: ['van hoorn (zegt iets over het nekschild)', 'beschermde', 'tegen beten'],
        correctOptionIndex: 0,
        hint: '"Van hoorn" zegt direct iets over het zelfstandig naamwoord nekschild!',
        gradeBadge: 'Grammatica'
      },
      {
        id: 'dino68-new-2-2',
        category: 'Werkwoordspelling (d/t)',
        categoryIcon: '🌿',
        question: 'Vul in: "De Triceratops ___ een naderend roofdier af."',
        type: 'choice',
        options: ['weert', 'weerd', 'weerdt'],
        correctOptionIndex: 0,
        hint: 'Afweren: stam weer + t = weert.',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'dino68-new-2-3',
        category: 'Letters Leggen',
        categoryIcon: '✏️',
        question: 'Spel het woord voor het massieve benige kraagstuk:',
        type: 'spell',
        targetWord: 'NEKSCHILD',
        scrambledLetters: ['N', 'E', 'K', 'S', 'C', 'H', 'I', 'L', 'D'],
        hint: 'Nek + schild (9 letters, eindigt op een d).',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'dino68-new-2-4',
        category: 'Woordenschat',
        categoryIcon: '💡',
        question: 'Wat betekent de term "herbivoor"?',
        type: 'choice',
        options: ['Een planteneter', 'Een vleeseter', 'Een alleseter'],
        correctOptionIndex: 0,
        hint: 'Herba betekent plant/kruid in het Latijn.',
        gradeBadge: 'Woordenschat'
      }
    ]
  },
  {
    id: 3,
    name: 'Broonty’s Kolossale Hoogte',
    biome: 'outback',
    theme: 'Woordsoorten (Vragend & Onbepaald Voornaamwoord)',
    themeColor: '#388E3C',
    bannerEmoji: '🦕',
    chapterTitle: 'Hoofdstuk 3: De Boomtoppenreus',
    introStory: 'Broonty kijkt neer over het woud. "Herken jij onbepaalde voornaamwoorden zoals \'iemand\', \'niemand\', \'iets\', \'alles\'?"',
    animalReward: findAnimal('broonty-brachiosaurus'),
    questions: [
      {
        id: 'dino68-new-3-1',
        category: 'Onbepaald Voornaamwoord',
        categoryIcon: '🦕',
        question: 'Wat voor soort woord is "niemand" in: "Niemand kon de reusachtige dinosaurus omverduwen."',
        type: 'choice',
        options: ['onbepaald voornaamwoord', 'persoonlijk voornaamwoord', 'aanwijzend voornaamwoord'],
        correctOptionIndex: 0,
        hint: 'Niemand wijst geen specifieke persoon aan, dus onbepaald!',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'dino68-new-3-2',
        category: 'Sterke Werkwoorden',
        categoryIcon: '🌳',
        question: 'Wat is het voltooid deelwoord van "verslinden"? (De sauropode heeft alle bladeren ...)',
        type: 'choice',
        options: ['verslonden', 'verslind', 'verslindt'],
        correctOptionIndex: 0,
        hint: 'Verslinden - verslond - verslonden.',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'dino68-new-3-3',
        category: 'Letters Leggen',
        categoryIcon: '✏️',
        question: 'Spel de wetenschappelijke familie der langnekdino’s:',
        type: 'spell',
        targetWord: 'SAUROPODE',
        scrambledLetters: ['S', 'A', 'U', 'R', 'O', 'P', 'O', 'D', 'E'],
        hint: 'S - AU - R - O - P - O - D - E (9 letters).',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'dino68-new-3-4',
        category: 'Begrijpend Lezen',
        categoryIcon: '📖',
        question: 'Hoe konden langnekdinosaurussen tientallen kilo’s bladeren per minuut verteren zonder te kauwen?',
        passage: 'Brachiosaurussen kauwden hun voedsel niet. In plaats daarvan slikten ze grote gladde stenen (gastrolieten) in. In hun spiermaag maalden deze stenen de taaie bladeren en takken fijn, net als een gigantische blender!',
        type: 'choice',
        options: ['Ze slikten maagstenen (gastrolieten) in die het voedsel in hun spiermaag vermaalden', 'Ze hadden 500 reservekiezen', 'Ze aten alleen vloeibaar mos'],
        correctOptionIndex: 0,
        hint: 'Lees over de gastrolieten die het voedsel fijnmaalden.',
        gradeBadge: 'Begrijpend Lezen'
      }
    ]
  },
  {
    id: 4,
    name: 'Flappie’s Thermiekstroom',
    biome: 'outback',
    theme: 'Signaalwoorden & Tekststructuren',
    themeColor: '#0288D1',
    bannerEmoji: '🦅',
    chapterTitle: 'Hoofdstuk 4: Zweefvlucht over de Oeroceaan',
    introStory: 'Flappie de Pterodactylus spreidt haar vleugels. "Let op hoe alinea’s logisch aan elkaar gekoppeld zijn!"',
    animalReward: findAnimal('flappie-pterodactylus'),
    questions: [
      {
        id: 'dino68-new-4-1',
        category: 'Cito Tekststructuur',
        categoryIcon: '🦅',
        question: 'Welk signaalwoord duidt op een OPSOMMING in een tekst?',
        type: 'choice',
        options: ['tevens (of voorts/bovendien)', 'desalniettemin', 'doordat'],
        correctOptionIndex: 0,
        hint: '"Tevens" en "bovendien" voegen een nieuw punt toe aan een opsomming.',
        gradeBadge: 'Begrijpend Lezen'
      },
      {
        id: 'dino68-new-4-2',
        category: 'Werkwoordspelling (d/t)',
        categoryIcon: '💨',
        question: 'Vul in: "De warme thermiekwind ___ het vliegreptiel omhoog."',
        type: 'choice',
        options: ['stuwt', 'stuwd', 'stuwdt'],
        correctOptionIndex: 0,
        hint: 'Stuwen: stam stuw + t = stuwt.',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'dino68-new-4-3',
        category: 'Letters Leggen',
        categoryIcon: '✏️',
        question: 'Spel het woord voor de opstijgende warme luchtstroom:',
        type: 'spell',
        targetWord: 'THERMIEK',
        scrambledLetters: ['T', 'H', 'E', 'R', 'M', 'I', 'E', 'K'],
        hint: 'T - H - E - R - M - IE - K (8 letters).',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'dino68-new-4-4',
        category: 'Zinsleer',
        categoryIcon: '🔍',
        question: 'Wat is de persoonsvorm (PV) in: "Boven de dampende vulkaankrater zweefden drie vliegende reptielen."',
        type: 'choice',
        options: ['zweefden', 'vliegende reptielen', 'boven de vulkaankrater'],
        correctOptionIndex: 0,
        hint: 'Vragend maken: "Zweefden drie vliegende reptielen boven...?" -> zweefden staat vooraan!',
        gradeBadge: 'Grammatica'
      }
    ]
  },
  {
    id: 5,
    name: 'Steggie’s Pantserrug',
    biome: 'outback',
    theme: 'Werkwoordspelling (Engelse Leenwoorden in VT & VD)',
    themeColor: '#E65100',
    bannerEmoji: '🦖',
    chapterTitle: 'Hoofdstuk 5: Verdedigingstechnieken',
    introStory: 'Steggie zwaait met haar staartknots. "Weet jij hoe je moderne leenwoorden in de verleden tijd spelt volgens \'t kofschip?"',
    animalReward: findAnimal('steggie-stegosaurus'),
    questions: [
      {
        id: 'dino68-new-5-1',
        category: 'Leenwerkwoorden (VT)',
        categoryIcon: '🦖',
        question: 'Wat is de juiste verleden tijd van "checken"? (De onderzoeker ... het fossiel)',
        type: 'choice',
        options: ['checkte', 'checkde', 'checkede'],
        correctOptionIndex: 0,
        hint: 'Stam is check (eindigt op k-klank, zit in \'t kofschip) + te = checkte.',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'dino68-new-5-2',
        category: 'Werkwoordspelling (d/t)',
        categoryIcon: '🛡️',
        question: 'Vul in: "De Stegosaurus ___ de aanval van de Allosaurus af."',
        type: 'choice',
        options: ['wendt', 'wend', 'went'],
        correctOptionIndex: 0,
        hint: 'Afwenden: stam wend + t = wendt.',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'dino68-new-5-3',
        category: 'Letters Leggen',
        categoryIcon: '✏️',
        question: 'Spel het woord voor de staartstekels van een Stegosaurus:',
        type: 'spell',
        targetWord: 'THAGOMIZER',
        scrambledLetters: ['T', 'H', 'A', 'G', 'O', 'M', 'I', 'Z', 'E', 'R'],
        hint: 'T - H - A - G - O - M - I - Z - E - R (10 letters).',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'dino68-new-5-4',
        category: 'Begrijpend Lezen',
        categoryIcon: '📖',
        question: 'Hoe groot waren de hersenen van een Stegosaurus in verhouding tot zijn gigantische lichaam?',
        passage: 'Hoewel een Stegosaurus tot wel vijf ton kon wegen, had hij opmerkelijk kleine hersenen ter grootte van een walnoot (ongeveer 80 gram). Dit bewijst dat complex denkvermogen niet nodig was om miljoenen jaren succesvol te overleven.',
        type: 'choice',
        options: ['Ter grootte van een walnoot (ongeveer 80 gram)', 'Zo groot als een voetbal', 'Zo groot als een olifantenhersenen'],
        correctOptionIndex: 0,
        hint: 'Lees over de grootte van een walnoot.',
        gradeBadge: 'Begrijpend Lezen'
      }
    ]
  },
  {
    id: 6,
    name: 'Velo’s Jachtformatie',
    biome: 'outback',
    theme: 'Eindtoets Dinovallei (Cito Meesterschap)',
    themeColor: '#C2185B',
    bannerEmoji: '🦖',
    chapterTitle: 'Hoofdstuk 6: De Grote Krijt-Finale',
    introStory: 'Velo de Velociraptor tikt met haar klauw. "Je staat in de finale van de Dinovallei! Laat zien dat jij de ware Cito-kampioen bent!"',
    animalReward: findAnimal('velo-velociraptor'),
    questions: [
      {
        id: 'dino68-new-6-1',
        category: 'Cito Tekstanalyse',
        categoryIcon: '🦖',
        question: 'Wat is de functie van een "inleiding" in een wetenschappelijk artikel over dinosauriërs?',
        type: 'choice',
        options: ['De aandacht van de lezer trekken en de onderzoeksvraag introduceren', 'Alle data tabellen tonen', 'De eindconclusie verklappen'],
        correctOptionIndex: 0,
        hint: 'De inleiding introduceert het onderwerp en wekt nieuwsgierigheid.',
        gradeBadge: 'Begrijpend Lezen'
      },
      {
        id: 'dino68-new-6-2',
        category: 'Werkwoordspelling (Voltooid Deelwoord)',
        categoryIcon: '⚡',
        question: 'Kies de juiste spelling: "De jachtgroep heeft de prooi succesvol ___."',
        type: 'choice',
        options: ['omcirkeld', 'omcirkelt', 'omcirkelde'],
        correctOptionIndex: 0,
        hint: 'Omcirkelen - omcirkelde - omcirkeld (d-werkwoord).',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'dino68-new-6-3',
        category: 'Letters Leggen',
        categoryIcon: '✏️',
        question: 'Spel het woord voor de prehistorische vogel-dinosaurus overgangsvorm:',
        type: 'spell',
        targetWord: 'ARCHAEOPTERYX',
        scrambledLetters: ['A', 'R', 'C', 'H', 'A', 'E', 'O', 'P', 'T', 'E', 'R', 'Y', 'X'],
        hint: 'A - R - CH - A - E - O - P - T - E - R - Y - X (13 letters).',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'dino68-new-6-4',
        category: 'Zinsleer',
        categoryIcon: '🔍',
        question: 'Wat is het lijdend voorwerp (LV) in: "De raptors coördineren hun jachtstrategie met uiterste precisie."',
        type: 'choice',
        options: ['hun jachtstrategie (WAT coördineren ze?)', 'de raptors', 'met uiterste precisie'],
        correctOptionIndex: 0,
        hint: 'Vraag: WAT coördineren ze? -> hun jachtstrategie.',
        gradeBadge: 'Grammatica'
      }
    ]
  }
];

// ==========================================
// 7. SPROOKJESBOS (ENCHANTED FOREST) - GROEP 6-7-8 NEW
// ==========================================
export const ENCHANTED_FOREST_LEVELS_68: Level[] = [
  {
    id: 1,
    name: 'Draco’s Magische Bibliotheek',
    biome: 'mountain',
    theme: 'Werkwoordspelling (Klassieke & Vaste Vormen)',
    themeColor: '#7B1FA2',
    bannerEmoji: '🐉',
    chapterTitle: 'Hoofdstuk 1: Oude Boeken en Toverspreuken',
    introStory: 'Draco het vuurdraakje opent het gouden toverboek. "Welkom in het Sprookjesbos van de bovenbouw! Hier ontleden we de diepste geheimen van de Nederlandse taal!"',
    animalReward: findAnimal('draco-draak'),
    questions: [
      {
        id: 'fairy68-new-1-1',
        category: 'Werkwoordspelling (d/t)',
        categoryIcon: '🐉',
        question: 'Vul in: "Draco ___ een magische vuurbal in de lucht."',
        type: 'choice',
        options: ['ontbrandt', 'ontbrand', 'ontbrant'],
        correctOptionIndex: 0,
        hint: 'Ontbranden: stam ontbrand + t = ontbrandt.',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'fairy68-new-1-2',
        category: 'Sterke Werkwoorden',
        categoryIcon: '✨',
        question: 'Wat is de verleden tijd van "blazen"? (Gisteren ... de draak vuur)',
        type: 'choice',
        options: ['blies', 'blaasde', 'geblazen'],
        correctOptionIndex: 0,
        hint: 'Blazen - blies - geblazen.',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'fairy68-new-1-3',
        category: 'Letters Leggen',
        categoryIcon: '✏️',
        question: 'Spel het woord voor een geheimzinnige oude toverspreuk:',
        type: 'spell',
        targetWord: 'INCANTATIE',
        scrambledLetters: ['I', 'N', 'C', 'A', 'N', 'T', 'A', 'T', 'I', 'E'],
        hint: 'I - N - C - A - N - T - A - T - IE (10 letters).',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'fairy68-new-1-4',
        category: 'Begrijpend Lezen',
        categoryIcon: '📖',
        question: 'Wat is het kenmerk van een allegorie (een sprookje met diepere betekenis)?',
        type: 'choice',
        options: ['Een verhaal waarin alle personages en gebeurtenissen symbool staan voor abstracte ideeën zoals goed, kwaad of rechtvaardigheid', 'Een tekst met alleen maar kookrecepten', 'Een krantenbericht over sport'],
        correctOptionIndex: 0,
        hint: 'Een allegorie is een diep symbolisch verhaal waarin figuren staan voor morele waarden.',
        gradeBadge: 'Begrijpend Lezen'
      }
    ]
  },
  {
    id: 2,
    name: 'Stella’s Etherische Weide',
    biome: 'mountain',
    theme: 'Stijlfiguren (Alliteratie, Personificatie & Metaforen)',
    themeColor: '#EC407A',
    bannerEmoji: '🦄',
    chapterTitle: 'Hoofdstuk 2: Schittering van de Taal',
    introStory: 'Stella de eenhoorn danst over het fonkelende mos. "Herken jij personificaties, waarbij levenloze dingen menselijke eigenschappen krijgen?"',
    animalReward: findAnimal('stella-eenhoorn'),
    questions: [
      {
        id: 'fairy68-new-2-1',
        category: 'Stijlfiguren (Personificatie)',
        categoryIcon: '🦄',
        question: 'Welke zin is een PERSONIFICATIE?',
        type: 'choice',
        options: ['De bomen fluisterden geheimen in de herfstwind.', 'De eenhoorn rende over het gras.', 'Het water was koud.'],
        correctOptionIndex: 0,
        hint: 'Bomen kunnen niet echt fluisteren; ze krijgen een menselijke eigenschap!',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'fairy68-new-2-2',
        category: 'Werkwoordspelling (d/t)',
        categoryIcon: '🌈',
        question: 'Vul in: "Haar hoorn ___ een zachte roze gloed af."',
        type: 'choice',
        options: ['straalt', 'straald', 'straaldt'],
        correctOptionIndex: 0,
        hint: 'Stralen: stam straal + t = straalt.',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'fairy68-new-2-3',
        category: 'Letters Leggen',
        categoryIcon: '✏️',
        question: 'Spel het synoniem voor hemels en ongrijpbaar mooi:',
        type: 'spell',
        targetWord: 'ETHERISCH',
        scrambledLetters: ['E', 'T', 'H', 'E', 'R', 'I', 'S', 'C', 'H'],
        hint: 'E - T - H - E - R - I - SCH (9 letters).',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'fairy68-new-2-4',
        category: 'Zinsleer',
        categoryIcon: '🔍',
        question: 'Wat is het onderwerp in: "Door de glinsterende mist galoppeerde de majestueuze eenhoorn."',
        type: 'choice',
        options: ['de majestueuze eenhoorn (wie galoppeerde?)', 'de glinsterende mist', 'galoppeerde'],
        correctOptionIndex: 0,
        hint: 'Vraag: WIE galoppeerde? -> de majestueuze eenhoorn.',
        gradeBadge: 'Grammatica'
      }
    ]
  },
  {
    id: 3,
    name: 'Faye’s Elfenpoel',
    biome: 'mountain',
    theme: 'Woordbenoeming (Voorzetsels & Voegwoorden)',
    themeColor: '#AB47BC',
    bannerEmoji: '🧚‍♀️',
    chapterTitle: 'Hoofdstuk 3: Zwevend Tussen Woordsoorten',
    introStory: 'Faye het woudelfje zweeft boven een bloemblad. "Ontleed de zin taalkundig tot in de kleinste details!"',
    animalReward: findAnimal('faye-elfje'),
    questions: [
      {
        id: 'fairy68-new-3-1',
        category: 'Woordsoorten (Voorzetsel)',
        categoryIcon: '🧚‍♀️',
        question: 'Wat voor soort woord is "ondanks" in: "Ondanks de schemering vond het elfje de weg."',
        type: 'choice',
        options: ['voorzetsel', 'werkwoord', 'bijvoeglijk naamwoord'],
        correctOptionIndex: 0,
        hint: 'Ondanks (de schemering) is een voorzetsel!',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'fairy68-new-3-2',
        category: 'Sterke Werkwoorden',
        categoryIcon: '✨',
        question: 'Wat is het voltooid deelwoord van "weven"? (De elfjes hebben een kleed ...)',
        type: 'choice',
        options: ['geweven', 'geweefd', 'geweeft'],
        correctOptionIndex: 0,
        hint: 'Weven - weefde/woof - geweven.',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'fairy68-new-3-3',
        category: 'Letters Leggen',
        categoryIcon: '✏️',
        question: 'Spel het woord voor de doorschijnende vleugeltjes:',
        type: 'spell',
        targetWord: 'TRANSPARANT',
        scrambledLetters: ['T', 'R', 'A', 'N', 'S', 'P', 'A', 'R', 'A', 'N', 'T'],
        hint: 'T - R - A - N - S - P - A - R - A - N - T (11 letters).',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'fairy68-new-3-4',
        category: 'Begrijpend Lezen',
        categoryIcon: '📖',
        question: 'Wat is de morele les (boodschap) in de meeste klassieke volkssprookjes?',
        type: 'choice',
        options: ['Dat moed, eerlijkheid en vriendelijkheid uiteindelijk het kwade overwinnen', 'Dat je zoveel mogelijk goud moet verzamelen', 'Dat je nooit in het bos mag wandelen'],
        correctOptionIndex: 0,
        hint: 'Klassieke sprookjes leren dat innerlijke goedheid en dapperheid altijd zegevieren.',
        gradeBadge: 'Begrijpend Lezen'
      }
    ]
  },
  {
    id: 4,
    name: 'Grom’s Alchemielaboratorium',
    biome: 'mountain',
    theme: 'Werkwoordspelling (d/t bij Wederkerende Werkwoorden)',
    themeColor: '#E53935',
    bannerEmoji: '🍄',
    chapterTitle: 'Hoofdstuk 4: Toverdranken en Elixers',
    introStory: 'Grom de kabouter mengt kruiden in een koperen ketel. "Bij wederkerende werkwoorden zoals \'zich haasten\' of \'zich vergissen\' geldt dezelfde d/t regel!"',
    animalReward: findAnimal('grom-kabouter'),
    questions: [
      {
        id: 'fairy68-new-4-1',
        category: 'Wederkerend Werkwoord (d/t)',
        categoryIcon: '🍄',
        question: 'Vul in: "De kabouter ___ zich om de drank voor zonsondergang klaar te hebben."',
        type: 'choice',
        options: ['haast', 'haasd', 'haastt'],
        correctOptionIndex: 0,
        hint: 'Zich haasten: stam haast eindigt al op een t -> haast.',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'fairy68-new-4-2',
        category: 'Woordenschat',
        categoryIcon: '🧪',
        question: 'Wat is een "elixer"?',
        type: 'choice',
        options: ['Een magisch drankje met genezende of bijzondere krachten', 'Een soort paddenstoel', 'Een stenen ketel'],
        correctOptionIndex: 0,
        hint: 'Een elixer is een toverdrank.',
        gradeBadge: 'Woordenschat'
      },
      {
        id: 'fairy68-new-4-3',
        category: 'Letters Leggen',
        categoryIcon: '✏️',
        question: 'Spel de oude wetenschap van toverdranken en goud maken:',
        type: 'spell',
        targetWord: 'ALCHEMIE',
        scrambledLetters: ['A', 'L', 'C', 'H', 'E', 'M', 'I', 'E'],
        hint: 'A - L - CH - E - M - IE (8 letters).',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'fairy68-new-4-4',
        category: 'Zinsleer',
        categoryIcon: '🔍',
        question: 'Wat is het lijdend voorwerp (LV) in: "De alchemist roert het fonkelende brouwsel met een zilveren lepel."',
        type: 'choice',
        options: ['het fonkelende brouwsel (WAT roert hij?)', 'de alchemist', 'met een zilveren lepel'],
        correctOptionIndex: 0,
        hint: 'Vraag: WAT roert hij? -> het fonkelende brouwsel.',
        gradeBadge: 'Grammatica'
      }
    ]
  },
  {
    id: 5,
    name: 'Ignis’ Feniks Altaar',
    biome: 'mountain',
    theme: 'Trema, Koppeltekens & Leenwoorden',
    themeColor: '#FF6F00',
    bannerEmoji: '🦅',
    chapterTitle: 'Hoofdstuk 5: Onsterfelijke Vlammen',
    introStory: 'Ignis de feniks spreidt haar vlammende vleugels. "Weet jij wanneer je een koppelteken (-) gebruikt in samenstellingen met klinkerbotsing?"',
    animalReward: findAnimal('ignis-feniks'),
    questions: [
      {
        id: 'fairy68-new-5-1',
        category: 'Koppelteken Regel',
        categoryIcon: '🦅',
        question: 'Kies de juiste spelling voor de samenstelling van zonne + energie:',
        type: 'choice',
        options: ['zonne-energie', 'zonneenergie', 'zonneënenergie'],
        correctOptionIndex: 0,
        hint: 'Bij klinkerbotsing (e + e) in een samenstelling gebruiken we een koppelteken: zonne-energie!',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'fairy68-new-5-2',
        category: 'Sterke Werkwoorden',
        categoryIcon: '🔥',
        question: 'Wat is de verleden tijd van "herrijzen"? (De feniks ... uit haar eigen as)',
        type: 'choice',
        options: ['herrees', 'herreesde', 'herrezen'],
        correctOptionIndex: 0,
        hint: 'Herrijzen - herrees - herrezen.',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'fairy68-new-5-3',
        category: 'Letters Leggen',
        categoryIcon: '✏️',
        question: 'Spel het synoniem voor eeuwig leven:',
        type: 'spell',
        targetWord: 'ONSTERFELIJK',
        scrambledLetters: ['O', 'N', 'S', 'T', 'E', 'R', 'F', 'E', 'L', 'I', 'J', 'K'],
        hint: 'On + sterfelijk (12 letters, met lange ij aan het eind).',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'fairy68-new-5-4',
        category: 'Begrijpend Lezen',
        categoryIcon: '📖',
        question: 'Waarvoor staat het mythische beeld van de feniks symbool in de wereldliteratuur?',
        passage: 'In gedichten en verhalen over de hele wereld staat de feniks symbool voor veerkracht, hoop en vernieuwing. Het toont aan dat zelfs na de totale verwoesting er altijd een kans is om opnieuw te beginnen en sterker terug te keren.',
        type: 'choice',
        options: ['Voor veerkracht, vernieuwing en de kracht om na tegenslag opnieuw te beginnen', 'Voor gevaarlijke bosbranden', 'Voor het einde van alle verhalen'],
        correctOptionIndex: 0,
        hint: 'Lees over de universele betekenis van veerkracht en hoop.',
        gradeBadge: 'Begrijpend Lezen'
      }
    ]
  },
  {
    id: 6,
    name: 'Luna’s Wijsheidskoepel',
    biome: 'mountain',
    theme: 'Grote Meesterproef Nederlands (Groep 8 Eindtoets Niveau)',
    themeColor: '#303F9F',
    bannerEmoji: '🦉',
    chapterTitle: 'Hoofdstuk 6: De Grote Kroning der Taalkunde',
    introStory: 'Luna de Maanuil heft haar vleugels. "Je hebt alle biomen doorlopen en alle vraagstukken overwonnen! Bewijs nu je ultieme meesterschap over de Nederlandse taal!"',
    animalReward: findAnimal('luna-uil'),
    questions: [
      {
        id: 'fairy68-new-6-1',
        category: 'Cito Eindtoets Meesterschap',
        categoryIcon: '🦉',
        question: 'Wat is de persoonsvorm (PV) én het onderwerp (OW) in: "Door de eeuwenoude bomen fluisterde de wijze uil haar laatste profetie."',
        type: 'choice',
        options: ['PV: fluisterde | OW: de wijze uil', 'PV: bomen | OW: profetie', 'PV: fluisterde | OW: de bomen'],
        correctOptionIndex: 0,
        hint: 'Vragend maken: "Fluisterde de wijze uil...?" -> PV = fluisterde. Wie fluisterde? -> de wijze uil (OW).',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'fairy68-new-6-2',
        category: 'Werkwoordspelling (d/t/dt Finale)',
        categoryIcon: '🌙',
        question: 'Kies de correcte zin qua werkwoordspelling:',
        type: 'choice',
        options: [
          'De onderzoeker beantwoordt de vraag die gisteren werd gesteld.',
          'De onderzoeker beantwoord de vraag die gisteren werd gesteld.',
          'De onderzoeker beantwoordt de vraag die gisteren werdt gesteld.'
        ],
        correctOptionIndex: 0,
        hint: 'Beantwoorden (hij-vorm TT) = stam beantwoord + t = beantwoordt. Werd (VT) is een vorm van worden zonder t!',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'fairy68-new-6-3',
        category: 'Letters Leggen',
        categoryIcon: '✏️',
        question: 'Spel de eretitel die jij vandaag hebt verdiend:',
        type: 'spell',
        targetWord: 'TAALKAMPIOEN',
        scrambledLetters: ['T', 'A', 'A', 'L', 'K', 'A', 'M', 'P', 'I', 'O', 'E', 'N'],
        hint: 'Taal + kampioen (12 letters).',
        gradeBadge: 'Groep 6-7-8'
      },
      {
        id: 'fairy68-new-6-4',
        category: 'Begrijpend Lezen & Synthese',
        categoryIcon: '📖',
        question: 'Wat is de belangrijkste vaardigheid bij het begrijpend lezen van complexe teksten op de middelbare school?',
        type: 'choice',
        options: ['Kritisch verbanden leggen tussen alinea’s, signaalwoorden herkennen en de hoofdgedachte samenvatten', 'Zo snel mogelijk bladeren zonder te lezen', 'Alle moeilijke woorden overslaan'],
        correctOptionIndex: 0,
        hint: 'Kritisch analyseren, verbanden leggen en de kern samenvatten vormt de essentie van begrijpend lezen.',
        gradeBadge: 'Begrijpend Lezen'
      }
    ]
  }
];
