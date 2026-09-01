import { SpellingFactoryItem } from '../types';

export const COMPREHENSIVE_SPELLING_FACTORY_ITEMS: SpellingFactoryItem[] = [
  // =========================================================================
  // 1. KLINKERDIEF / OPEN LETTERGREEP (Lange klank verliest een klinker: bomen, slapen, jager)
  // =========================================================================
  {
    id: 'spf-kd-1',
    word: 'bomen',
    syllables: ['bo', 'men'],
    missingIndex: 0,
    options: ['bo', 'boo', 'bou', 'bu'],
    soundRule: 'Klinkerdief regel: Aan het einde van de klankgroep hoor je een lange /oo/, maar je schrijft maar één o.',
    exampleSentence: 'In het oerwoud groeien reusachtige, eeuwenoude bomen.',
    category: 'klinkerdief',
    categoryLabel: '🌴 Klinkerdief (Lange Klank)',
    difficulty: 'groep3-4',
    emoji: '🌳'
  },
  {
    id: 'spf-kd-2',
    word: 'olifanten',
    syllables: ['o', 'li', 'fan', 'ten'],
    missingIndex: 1,
    options: ['li', 'lie', 'lee', 'ly'],
    soundRule: 'Korte klank /i/ in een open lettergreep schrijf je met één letter i (zoals in olifant, giraffe, piramide).',
    exampleSentence: 'De vriendelijke olifanten nemen een heerlijk bad in de rivier.',
    category: 'klinkerdief',
    categoryLabel: '🌴 Klinkerdief (Lange Klank)',
    difficulty: 'groep3-4',
    emoji: '🐘'
  },
  {
    id: 'spf-kd-3',
    word: 'slapen',
    syllables: ['sla', 'pen'],
    missingIndex: 0,
    options: ['sla', 'slaa', 'slap', 'slee'],
    soundRule: 'Klankgroep /sla/: je hoort een lange /aa/ aan het einde, dus de klinkerdief steelt een a.',
    exampleSentence: 'De luipaarden slapen overdag hoog op de takken.',
    category: 'klinkerdief',
    categoryLabel: '🌴 Klinkerdief (Lange Klank)',
    difficulty: 'groep3-4',
    emoji: '😴'
  },
  {
    id: 'spf-kd-4',
    word: 'jagers',
    syllables: ['ja', 'gers'],
    missingIndex: 0,
    options: ['ja', 'jaa', 'jai', 'je'],
    soundRule: 'Klankgroep /ja/: lange klank aan het einde van de klankgroep, dus je schrijft één a.',
    exampleSentence: 'Valken en uilen zijn buitengewoon behendige jagers in de lucht.',
    category: 'klinkerdief',
    categoryLabel: '🌴 Klinkerdief (Lange Klank)',
    difficulty: 'groep3-4',
    emoji: '🦅'
  },
  {
    id: 'spf-kd-5',
    word: 'vogels',
    syllables: ['vo', 'gels'],
    missingIndex: 0,
    options: ['vo', 'voo', 'vou', 've'],
    soundRule: 'Klankgroep /vo/: lange klank /oo/, dus één o schrijven (klinkerdief).',
    exampleSentence: 'Kleurrijke vogels zingen vrolijk bij het ochtendgloren.',
    category: 'klinkerdief',
    categoryLabel: '🌴 Klinkerdief (Lange Klank)',
    difficulty: 'groep3-4',
    emoji: '🦜'
  },
  {
    id: 'spf-kd-6',
    word: 'kamelen',
    syllables: ['ka', 'me', 'len'],
    missingIndex: 1,
    options: ['me', 'mee', 'men', 'mi'],
    soundRule: 'Klankgroep /me/: lange klank /ee/ aan het einde verliest een e!',
    exampleSentence: 'In de hete woestijn stappen de kamelen kalm door het zand.',
    category: 'klinkerdief',
    categoryLabel: '🌴 Klinkerdief (Lange Klank)',
    difficulty: 'groep5-6',
    emoji: '🐫'
  },
  {
    id: 'spf-kd-7',
    word: 'raketten',
    syllables: ['ra', 'ket', 'ten'],
    missingIndex: 0,
    options: ['ra', 'raa', 'rak', 're'],
    soundRule: 'Klankgroep /ra/: lange /aa/ aan het einde van de klankgroep wordt geschreven met één a.',
    exampleSentence: 'De astronauten bouwen raketten om naar de sterren te reizen.',
    category: 'klinkerdief',
    categoryLabel: '🌴 Klinkerdief (Lange Klank)',
    difficulty: 'groep5-6',
    emoji: '🚀'
  },
  {
    id: 'spf-kd-8',
    word: 'apen',
    syllables: ['a', 'pen'],
    missingIndex: 0,
    options: ['a', 'aa', 'ap', 'ae'],
    soundRule: 'Klankgroep /a/: lange klank /aa/ aan het einde van de klankgroep schrijf je met één a.',
    exampleSentence: 'De speelse apen slingeren aan lianen door het bladerdak.',
    category: 'klinkerdief',
    categoryLabel: '🌴 Klinkerdief (Lange Klank)',
    difficulty: 'groep3-4',
    emoji: '🐒'
  },

  // =========================================================================
  // 2. DUBBELZETTER / GESLOTEN LETTERGREEP (Korte klank krijgt dubbele medeklinker: klimmen, savanne, vallen)
  // =========================================================================
  {
    id: 'spf-dz-1',
    word: 'klimmen',
    syllables: ['klim', 'men'],
    missingIndex: 1,
    options: ['men', 'en', 'man', 'nem'],
    soundRule: 'Dubbelzetter regel: Korte klank /i/ aan het einde van de klankgroep krijgt twee medeklinkers (-mm-).',
    exampleSentence: 'De jonge eekhoorntjes klimmen vliegensvlug in de eik.',
    category: 'dubbelzetter',
    categoryLabel: '⚡ Dubbelzetter (Korte Klank)',
    difficulty: 'groep3-4',
    emoji: '🐿️'
  },
  {
    id: 'spf-dz-2',
    word: 'savanne',
    syllables: ['sa', 'van', 'ne'],
    missingIndex: 1,
    options: ['van', 'vaan', 'fan', 'ven'],
    soundRule: 'Korte klank /a/ in /van/ wordt gevolgd door de dubbelzetter -nn-.',
    exampleSentence: 'De leeuwenrust vindt plaats onder een acaciaboom op de savanne.',
    category: 'dubbelzetter',
    categoryLabel: '⚡ Dubbelzetter (Korte Klank)',
    difficulty: 'groep5-6',
    emoji: '🦁'
  },
  {
    id: 'spf-dz-3',
    word: 'vallen',
    syllables: ['val', 'len'],
    missingIndex: 0,
    options: ['val', 'va', 'vaal', 'vel'],
    soundRule: 'Korte klank /a/ -> dubbelzetter -ll-. Je hoort /val/ en schrijft twee l-en.',
    exampleSentence: 'In de herfst vallen de goudgele bladeren zacht op de grond.',
    category: 'dubbelzetter',
    categoryLabel: '⚡ Dubbelzetter (Korte Klank)',
    difficulty: 'groep3-4',
    emoji: '🍂'
  },
  {
    id: 'spf-dz-4',
    word: 'kikkers',
    syllables: ['kik', 'kers'],
    missingIndex: 0,
    options: ['kik', 'ki', 'kiek', 'kek'],
    soundRule: 'Korte klank /i/ aan het einde van de klankgroep krijgt een dubbele k (-kk-).',
    exampleSentence: 'De groene kikkers kwaken vrolijk bij de vijverrand.',
    category: 'dubbelzetter',
    categoryLabel: '⚡ Dubbelzetter (Korte Klank)',
    difficulty: 'groep3-4',
    emoji: '🐸'
  },
  {
    id: 'spf-dz-5',
    word: 'ballonnen',
    syllables: ['bal', 'lon', 'nen'],
    missingIndex: 1,
    options: ['lon', 'lo', 'loon', 'len'],
    soundRule: 'Korte klank /o/ in /lon/ krijgt een dubbele n (-nn-).',
    exampleSentence: 'Op het feest zweefden tientallen kleurige ballonnen in de lucht.',
    category: 'dubbelzetter',
    categoryLabel: '⚡ Dubbelzetter (Korte Klank)',
    difficulty: 'groep5-6',
    emoji: '🎈'
  },
  {
    id: 'spf-dz-6',
    word: 'stoppen',
    syllables: ['stop', 'pen'],
    missingIndex: 1,
    options: ['pen', 'en', 'pan', 'pe'],
    soundRule: 'Korte klank /o/ in /stop/ krijgt een dubbele p (-pp-).',
    exampleSentence: 'De ranger gebaart dat alle safari-wagens moeten stoppen.',
    category: 'dubbelzetter',
    categoryLabel: '⚡ Dubbelzetter (Korte Klank)',
    difficulty: 'groep3-4',
    emoji: '🛑'
  },
  {
    id: 'spf-dz-7',
    word: 'kuddes',
    syllables: ['kud', 'des'],
    missingIndex: 0,
    options: ['kud', 'ku', 'kuud', 'kod'],
    soundRule: 'Korte klank /u/ in /kud/ krijgt een dubbele d (-dd-).',
    exampleSentence: 'Enorme kuddes zebra’s steken de rivier gezamenlijk over.',
    category: 'dubbelzetter',
    categoryLabel: '⚡ Dubbelzetter (Korte Klank)',
    difficulty: 'groep5-6',
    emoji: '🦓'
  },
  {
    id: 'spf-dz-8',
    word: 'krokodillen',
    syllables: ['kro', 'ko', 'dil', 'len'],
    missingIndex: 2,
    options: ['dil', 'diel', 'di', 'del'],
    soundRule: 'Korte klank /i/ in /dil/ krijgt een dubbele l (-ll-).',
    exampleSentence: 'De krokodillen zonnen rustig op de modderige oever.',
    category: 'dubbelzetter',
    categoryLabel: '⚡ Dubbelzetter (Korte Klank)',
    difficulty: 'groep5-6',
    emoji: '🐊'
  },

  // =========================================================================
  // 3. LANGERMAAKWOORDEN (d of t aan het einde: hond/honden, schildpad, tent/tenten)
  // =========================================================================
  {
    id: 'spf-lm-1',
    word: 'schildpad',
    syllables: ['schild', 'pad'],
    missingIndex: 1,
    options: ['pad', 'pat', 'padd', 'path'],
    soundRule: 'Langermaakregel: schildpad -> schildpadden. Je hoort een /d/, dus je schrijft pad met een d.',
    exampleSentence: 'De wijze zeeschildpad zwemt sierlijk door het koraalrif.',
    category: 'langermaak',
    categoryLabel: '🐢 Langermaakwoord (d of t)',
    difficulty: 'groep3-4',
    emoji: '🐢'
  },
  {
    id: 'spf-lm-2',
    word: 'hondenhok',
    syllables: ['hon', 'den', 'hok'],
    missingIndex: 0,
    options: ['hon', 'hont', 'hond', 'hom'],
    soundRule: 'Langermaakregel: hond -> honden, dus stam is met een d.',
    exampleSentence: 'De vrolijke puppy rent enthousiast uit zijn hondenhok.',
    category: 'langermaak',
    categoryLabel: '🐢 Langermaakwoord (d of t)',
    difficulty: 'groep3-4',
    emoji: '🐶'
  },
  {
    id: 'spf-lm-3',
    word: 'luipaard',
    syllables: ['lui', 'paard'],
    missingIndex: 1,
    options: ['paard', 'paart', 'part', 'pard'],
    soundRule: 'Langermaakregel: paard -> paarden. Je hoort een /d/, dus luipaard eindigt op een d.',
    exampleSentence: 'Het gevlekte luipaard rust uit op een dikke tak in de boom.',
    category: 'langermaak',
    categoryLabel: '🐢 Langermaakwoord (d of t)',
    difficulty: 'groep5-6',
    emoji: '🐆'
  },
  {
    id: 'spf-lm-4',
    word: 'strandbal',
    syllables: ['strand', 'bal'],
    missingIndex: 0,
    options: ['strand', 'strant', 'stran', 'strang'],
    soundRule: 'Langermaakregel: strand -> stranden. Je hoort een /d/, dus strand met een d.',
    exampleSentence: 'Ridheya gooit de opblaasbare strandbal hoog in de lucht.',
    category: 'langermaak',
    categoryLabel: '🐢 Langermaakwoord (d of t)',
    difficulty: 'groep3-4',
    emoji: '🏖️'
  },
  {
    id: 'spf-lm-5',
    word: 'arendsnest',
    syllables: ['a', 'rends', 'nest'],
    missingIndex: 1,
    options: ['rends', 'rents', 'rens', 'rent'],
    soundRule: 'Langermaakregel: arend -> arenden (met een d) + tussenletter s.',
    exampleSentence: 'Boven op de rotsachtige bergpiek ontdekten ze een arendsnest.',
    category: 'langermaak',
    categoryLabel: '🐢 Langermaakwoord (d of t)',
    difficulty: 'groep5-6',
    emoji: '🦅'
  },
  {
    id: 'spf-lm-6',
    word: 'olifantshuid',
    syllables: ['o', 'li', 'fants', 'huid'],
    missingIndex: 3,
    options: ['huid', 'huit', 'huyt', 'hud'],
    soundRule: 'Langermaakregel: huid -> huiden, dus huid schrijf je met een d.',
    exampleSentence: 'De dikke olifantshuid beschermt het dier tegen scherpe doornen.',
    category: 'langermaak',
    categoryLabel: '🐢 Langermaakwoord (d of t)',
    difficulty: 'groep5-6',
    emoji: '🐘'
  },

  // =========================================================================
  // 4. LUCHTWOORDEN (Korte klank + cht: nachtegaal, lichtje, boerderijknecht)
  // =========================================================================
  {
    id: 'spf-lw-1',
    word: 'nachtegaal',
    syllables: ['nach', 'te', 'gaal'],
    missingIndex: 0,
    options: ['nach', 'nagt', 'nak', 'nah'],
    soundRule: 'Luchtwoord: korte klank /a/ + /cht/ schrijf je met de ch van lucht.',
    exampleSentence: 'De nachtegaal zingt het allermooiste lied van het diepe woud.',
    category: 'luchtwoord',
    categoryLabel: '🌙 Luchtwoord (-cht)',
    difficulty: 'groep3-4',
    emoji: '🐦'
  },
  {
    id: 'spf-lw-2',
    word: 'lichtflits',
    syllables: ['licht', 'flits'],
    missingIndex: 0,
    options: ['licht', 'ligt', 'likt', 'list'],
    soundRule: 'Luchtwoord: korte klank /i/ + /cht/ schrijf je met ch van lucht.',
    exampleSentence: 'Een felle lichtflits verlichtte plotseling de donkere jungle.',
    category: 'luchtwoord',
    categoryLabel: '🌙 Luchtwoord (-cht)',
    difficulty: 'groep3-4',
    emoji: '⚡'
  },
  {
    id: 'spf-lw-3',
    word: 'uitzicht',
    syllables: ['uit', 'zicht'],
    missingIndex: 1,
    options: ['zicht', 'zigt', 'zikt', 'zist'],
    soundRule: 'Luchtwoord: korte klank /i/ + /cht/ schrijf je altijd met -cht.',
    exampleSentence: 'Vanaf de top van de uitkijktoren hadden ze een adembenemend uitzicht.',
    category: 'luchtwoord',
    categoryLabel: '🌙 Luchtwoord (-cht)',
    difficulty: 'groep5-6',
    emoji: '🔭'
  },
  {
    id: 'spf-lw-4',
    word: 'vrachtwagen',
    syllables: ['vracht', 'wa', 'gen'],
    missingIndex: 0,
    options: ['vracht', 'fragt', 'vragt', 'vrakt'],
    soundRule: 'Luchtwoord: korte klank /a/ + /cht/ schrijf je met -cht.',
    exampleSentence: 'De zware vrachtwagen brengt vers hooi naar de savannedieren.',
    category: 'luchtwoord',
    categoryLabel: '🌙 Luchtwoord (-cht)',
    difficulty: 'groep5-6',
    emoji: '🚚'
  },
  {
    id: 'spf-lw-5',
    word: 'speurtocht',
    syllables: ['speur', 'tocht'],
    missingIndex: 1,
    options: ['tocht', 'togt', 'tokt', 'toch'],
    soundRule: 'Luchtwoord: korte klank /o/ + /cht/ met ch van lucht.',
    exampleSentence: 'Hemali en Ridheya begonnen een spannende speurtocht naar verborgen schatten.',
    category: 'luchtwoord',
    categoryLabel: '🌙 Luchtwoord (-cht)',
    difficulty: 'groep3-4',
    emoji: '🗺️'
  },

  // =========================================================================
  // 5. TWEEKLANKEN & WEETWOORDEN (IJ vs EI & AU vs OU)
  // =========================================================================
  {
    id: 'spf-ie-1',
    word: 'woestijn',
    syllables: ['woes', 'tijn'],
    missingIndex: 1,
    options: ['tijn', 'tein', 'tien', 'tyn'],
    soundRule: 'Weetwoord: woestijn schrijf je met de lange IJ (zoals rijp, ijs, pijl).',
    exampleSentence: 'De woestijnvos heeft grote oren om lekker koel te blijven.',
    category: 'ij-ei-au-ou',
    categoryLabel: '🦊 Weetwoorden (ij/ei & au/ou)',
    difficulty: 'groep5-6',
    emoji: '🏜️'
  },
  {
    id: 'spf-ie-2',
    word: 'aardbei',
    syllables: ['aard', 'bei'],
    missingIndex: 1,
    options: ['bei', 'bij', 'bee', 'bay'],
    soundRule: 'Weetwoord: aardbei staat op de ei-plaat, dus je schrijft het met de korte EI.',
    exampleSentence: 'In de zomertuin plukte Ridheya een zoete, rode aardbei.',
    category: 'ij-ei-au-ou',
    categoryLabel: '🦊 Weetwoorden (ij/ei & au/ou)',
    difficulty: 'groep3-4',
    emoji: '🍓'
  },
  {
    id: 'spf-ie-3',
    word: 'kabeljauw',
    syllables: ['ka', 'bel', 'jauw'],
    missingIndex: 2,
    options: ['jauw', 'jouw', 'jou', 'jau'],
    soundRule: 'Weetwoord: kabeljauw staat op de au-plaat, dus met de at-au en een w aan het einde.',
    exampleSentence: 'In de Noordzee zwemt de zilveren kabeljauw tussen het zeewier.',
    category: 'ij-ei-au-ou',
    categoryLabel: '🦊 Weetwoorden (ij/ei & au/ou)',
    difficulty: 'groep5-6',
    emoji: '🐟'
  },
  {
    id: 'spf-ie-4',
    word: 'kabouter',
    syllables: ['ka', 'bou', 'ter'],
    missingIndex: 1,
    options: ['bou', 'bau', 'bo', 'bu'],
    soundRule: 'Weetwoord: kabouter schrijf je met de otje-OU.',
    exampleSentence: 'Onder de paddenstoel woonde een vriendelijke kabouter.',
    category: 'ij-ei-au-ou',
    categoryLabel: '🦊 Weetwoorden (ij/ei & au/ou)',
    difficulty: 'groep3-4',
    emoji: '🍄'
  },
  {
    id: 'spf-ie-5',
    word: 'bliksemflits',
    syllables: ['blik', 'sem', 'flits'],
    missingIndex: 0,
    options: ['blik', 'bliek', 'blek', 'blijk'],
    soundRule: 'Korte klank /i/ in bliksem; flits met korte klank /i/.',
    exampleSentence: 'Een daverende bliksemflits scheurde door de donkere wolken.',
    category: 'ij-ei-au-ou',
    categoryLabel: '🦊 Weetwoorden (ij/ei & au/ou)',
    difficulty: 'groep5-6',
    emoji: '🌩️'
  },

  // =========================================================================
  // 6. ACHTERVOEGSELS (-ig, -lijk, -heid, -schap)
  // =========================================================================
  {
    id: 'spf-av-1',
    word: 'gevaarlijk',
    syllables: ['ge', 'vaar', 'lijk'],
    missingIndex: 2,
    options: ['lijk', 'luk', 'lik', 'liek'],
    soundRule: 'Achtervoegsel -lijk: Je hoort /luk/, maar je schrijft -lijk.',
    exampleSentence: 'Het smalle bergpad langs de afgrond was behoorlijk gevaarlijk.',
    category: 'achtervoegsel',
    categoryLabel: '✨ Achtervoegsels (-lijk, -ig, -heid)',
    difficulty: 'groep5-6',
    emoji: '⚠️'
  },
  {
    id: 'spf-av-2',
    word: 'nieuwsgierig',
    syllables: ['nieuws', 'gie', 'rig'],
    missingIndex: 2,
    options: ['rig', 'rug', 'reg', 'rich'],
    soundRule: 'Achtervoegsel -ig: Je hoort /ug/, maar je schrijft -ig.',
    exampleSentence: 'Het jonge aapje keek nieuwsgierig door de verrekijker.',
    category: 'achtervoegsel',
    categoryLabel: '✨ Achtervoegsels (-lijk, -ig, -heid)',
    difficulty: 'groep3-4',
    emoji: '🔍'
  },
  {
    id: 'spf-av-3',
    word: 'gezelligheid',
    syllables: ['ge', 'zel', 'lig', 'heid'],
    missingIndex: 3,
    options: ['heid', 'hijd', 'heit', 'hyt'],
    soundRule: 'Achtervoegsel -heid: schrijf je altijd met de korte ei en een d aan het einde.',
    exampleSentence: 'Bij het knisperende kampvuur heerste een warme gezelligheid.',
    category: 'achtervoegsel',
    categoryLabel: '✨ Achtervoegsels (-lijk, -ig, -heid)',
    difficulty: 'groep5-6',
    emoji: '🔥'
  },
  {
    id: 'spf-av-4',
    word: 'vriendschap',
    syllables: ['vriend', 'schap'],
    missingIndex: 1,
    options: ['schap', 'sgap', 'skop', 'shap'],
    soundRule: 'Achtervoegsel -schap schrijf je met sch-.',
    exampleSentence: 'De hechte vriendschap tussen de twee zussen overwint elk avontuur.',
    category: 'achtervoegsel',
    categoryLabel: '✨ Achtervoegsels (-lijk, -ig, -heid)',
    difficulty: 'groep5-6',
    emoji: '🤝'
  },
  {
    id: 'spf-av-5',
    word: 'moeilijk',
    syllables: ['moei', 'lijk'],
    missingIndex: 1,
    options: ['lijk', 'luk', 'lik', 'lyke'],
    soundRule: 'Achtervoegsel -lijk: Je hoort /luk/, maar schrijft altijd -lijk.',
    exampleSentence: 'Dit Cito-raadsel leek in eerste instantie erg moeilijk.',
    category: 'achtervoegsel',
    categoryLabel: '✨ Achtervoegsels (-lijk, -ig, -heid)',
    difficulty: 'groep5-6',
    emoji: '🧩'
  },

  // =========================================================================
  // 7. SAMENGESTELDE WOORDEN (Woord + Woord: onderzoekschip, regenwoud)
  // =========================================================================
  {
    id: 'spf-sg-1',
    word: 'onderzoeksschip',
    syllables: ['on', 'der', 'zoeks', 'schip'],
    missingIndex: 2,
    options: ['zoeks', 'zoek', 'soeks', 'zoex'],
    soundRule: 'Samenstelling met tussen-s: onderzoek + s + schip = onderzoeksschip (dubbele s).',
    exampleSentence: 'Het moderne onderzoeksschip vaart naar de Noordpool voor wetenschappelijk onderzoek.',
    category: 'samengesteld',
    categoryLabel: '🔬 Samengestelde Woorden',
    difficulty: 'groep7-8',
    emoji: '🚢'
  },
  {
    id: 'spf-sg-2',
    word: 'regenwoud',
    syllables: ['re', 'gen', 'woud'],
    missingIndex: 2,
    options: ['woud', 'wout', 'wouwd', 'wou'],
    soundRule: 'Samenstelling: regen + woud (woud met ou en d, want wouden).',
    exampleSentence: 'In het tropische regenwoud klinkt het gefluister van duizenden dieren.',
    category: 'samengesteld',
    categoryLabel: '🔬 Samengestelde Woorden',
    difficulty: 'groep5-6',
    emoji: '🌴'
  },
  {
    id: 'spf-sg-3',
    word: 'uitkijktoren',
    syllables: ['uit', 'kijk', 'to', 'ren'],
    missingIndex: 1,
    options: ['kijk', 'keik', 'kyk', 'keijk'],
    soundRule: 'Samenstelling: uit + kijk + toren (kijk met lange ij).',
    exampleSentence: 'Vanaf de houten uitkijktoren zagen ze de giraffen grazen.',
    category: 'samengesteld',
    categoryLabel: '🔬 Samengestelde Woorden',
    difficulty: 'groep5-6',
    emoji: '🏰'
  },
  {
    id: 'spf-sg-4',
    word: 'waterstofzuiger',
    syllables: ['wa', 'ter', 'stof', 'zui', 'ger'],
    missingIndex: 3,
    options: ['zui', 'zuy', 'sui', 'zoei'],
    soundRule: 'Samenstelling: water + stof + zuiger (zuiger met z en ui).',
    exampleSentence: 'In het laboratorium gebruiken de onderzoekers een geavanceerde waterstofzuiger.',
    category: 'samengesteld',
    categoryLabel: '🔬 Samengestelde Woorden',
    difficulty: 'groep7-8',
    emoji: '🧪'
  },
  {
    id: 'spf-sg-5',
    word: 'nachtkijker',
    syllables: ['nacht', 'kij', 'ker'],
    missingIndex: 0,
    options: ['nacht', 'nagt', 'nahkt', 'nast'],
    soundRule: 'Samenstelling: nacht (luchtwoord) + kijker (met lange ij).',
    exampleSentence: 'Met de infrarood nachtkijker zagen ze de uilen jagen in het donker.',
    category: 'samengesteld',
    categoryLabel: '🔬 Samengestelde Woorden',
    difficulty: 'groep5-6',
    emoji: '🦉'
  },

  // =========================================================================
  // 8. NIEUWE WOORDEN (curriculum-breed, niet-dieren thema's: school, sport,
  //    weer, gezin, eten, ruimte/techniek, natuur) -- toegevoegd om beide
  //    niveaus te verbreden voor de Spelling Fabriek & de Toets-modus.
  // =========================================================================
  // --- klinkerdief: Groep 3-5 ---
  {
    id: 'spf-kd-9',
    word: 'wonen',
    syllables: ['wo', 'nen'],
    missingIndex: 0,
    options: ['wo', 'woo', 'wou', 'we'],
    soundRule: 'Klankgroep /wo/: je hoort een lange /oo/, maar je schrijft één o (klinkerdief).',
    exampleSentence: 'Ridheya en Hemali wonen in een gezellig huis met een grote tuin.',
    category: 'klinkerdief',
    categoryLabel: '🌴 Klinkerdief (Lange Klank)',
    difficulty: 'groep3-4',
    emoji: '🏠'
  },
  {
    id: 'spf-kd-10',
    word: 'lopen',
    syllables: ['lo', 'pen'],
    missingIndex: 0,
    options: ['lo', 'loo', 'lou', 'le'],
    soundRule: 'Klankgroep /lo/: lange klank /oo/ aan het einde van de klankgroep schrijf je met één o.',
    exampleSentence: 'Na school lopen de kinderen samen naar huis.',
    category: 'klinkerdief',
    categoryLabel: '🌴 Klinkerdief (Lange Klank)',
    difficulty: 'groep3-4',
    emoji: '🚶'
  },
  {
    id: 'spf-kd-11',
    word: 'dromen',
    syllables: ['dro', 'men'],
    missingIndex: 0,
    options: ['dro', 'droo', 'drow', 'dre'],
    soundRule: 'Klankgroep /dro/: je hoort een lange /oo/, maar de klinkerdief steelt een o.',
    exampleSentence: "'s Nachts dromen kinderen vaak over spannende avonturen.",
    category: 'klinkerdief',
    categoryLabel: '🌴 Klinkerdief (Lange Klank)',
    difficulty: 'groep3-4',
    emoji: '💭'
  },
  // --- klinkerdief: Groep 6-8 ---
  {
    id: 'spf-kd-12',
    word: 'planeten',
    syllables: ['pla', 'ne', 'ten'],
    missingIndex: 1,
    options: ['ne', 'nee', 'nen', 'ni'],
    soundRule: 'Klankgroep /ne/: lange klank /ee/ aan het einde van de klankgroep verliest een e (klinkerdief).',
    exampleSentence: 'Door de telescoop bekeken de kinderen de verre planeten aan de sterrenhemel.',
    category: 'klinkerdief',
    categoryLabel: '🌴 Klinkerdief (Lange Klank)',
    difficulty: 'groep5-6',
    emoji: '🪐'
  },
  {
    id: 'spf-kd-13',
    word: 'tomaten',
    syllables: ['to', 'ma', 'ten'],
    missingIndex: 1,
    options: ['ma', 'maa', 'man', 'mo'],
    soundRule: 'Klankgroep /ma/: lange /aa/ aan het einde van de klankgroep schrijf je met één a.',
    exampleSentence: 'Opa kweekt sappige tomaten in de moestuin achter het huis.',
    category: 'klinkerdief',
    categoryLabel: '🌴 Klinkerdief (Lange Klank)',
    difficulty: 'groep5-6',
    emoji: '🍅'
  },
  {
    id: 'spf-kd-14',
    word: 'reizigers',
    syllables: ['rei', 'zi', 'gers'],
    missingIndex: 1,
    options: ['zi', 'zie', 'zij', 'ze'],
    soundRule: 'Klankgroep /zi/: lange klank /ie/ aan het einde van de klankgroep schrijf je met één i.',
    exampleSentence: 'Op het station wachtten de reizigers geduldig op de trein naar Amsterdam.',
    category: 'klinkerdief',
    categoryLabel: '🌴 Klinkerdief (Lange Klank)',
    difficulty: 'groep5-6',
    emoji: '🚆'
  },

  // --- dubbelzetter: Groep 3-5 ---
  {
    id: 'spf-dz-9',
    word: 'zitten',
    syllables: ['zit', 'ten'],
    missingIndex: 0,
    options: ['zit', 'zi', 'ziet', 'zet'],
    soundRule: 'Korte klank /i/ in /zit/ krijgt een dubbele t (-tt-).',
    exampleSentence: 'Tijdens de kringtijd moeten alle kinderen stil op hun stoel zitten.',
    category: 'dubbelzetter',
    categoryLabel: '⚡ Dubbelzetter (Korte Klank)',
    difficulty: 'groep3-4',
    emoji: '🪑'
  },
  {
    id: 'spf-dz-10',
    word: 'bakken',
    syllables: ['bak', 'ken'],
    missingIndex: 0,
    options: ['bak', 'ba', 'baak', 'bek'],
    soundRule: 'Korte klank /a/ in /bak/ krijgt een dubbele k (-kk-).',
    exampleSentence: 'Op zaterdag gaan we samen een lekkere appeltaart bakken.',
    category: 'dubbelzetter',
    categoryLabel: '⚡ Dubbelzetter (Korte Klank)',
    difficulty: 'groep3-4',
    emoji: '🥧'
  },
  {
    id: 'spf-dz-11',
    word: 'rennen',
    syllables: ['ren', 'nen'],
    missingIndex: 0,
    options: ['ren', 're', 'reen', 'ran'],
    soundRule: 'Korte klank /e/ in /ren/ krijgt een dubbele n (-nn-).',
    exampleSentence: 'Tijdens de gymles mogen de kinderen hard over het veld rennen.',
    category: 'dubbelzetter',
    categoryLabel: '⚡ Dubbelzetter (Korte Klank)',
    difficulty: 'groep3-4',
    emoji: '🏃'
  },
  // --- dubbelzetter: Groep 6-8 ---
  {
    id: 'spf-dz-12',
    word: 'zwemmen',
    syllables: ['zwem', 'men'],
    missingIndex: 1,
    options: ['men', 'en', 'man', 'nem'],
    soundRule: 'Korte klank /e/ aan het einde van de klankgroep krijgt twee medeklinkers (-mm-).',
    exampleSentence: 'Elke donderdagmiddag gaat groep zes vrolijk zwemmen in het buitenbad.',
    category: 'dubbelzetter',
    categoryLabel: '⚡ Dubbelzetter (Korte Klank)',
    difficulty: 'groep5-6',
    emoji: '🏊'
  },
  {
    id: 'spf-dz-13',
    word: 'bakkers',
    syllables: ['bak', 'kers'],
    missingIndex: 0,
    options: ['bak', 'ba', 'baak', 'bek'],
    soundRule: 'Korte klank /a/ in /bak/ krijgt een dubbele k (-kk-).',
    exampleSentence: 'Vroeg in de ochtend beginnen de bakkers met het bakken van vers brood.',
    category: 'dubbelzetter',
    categoryLabel: '⚡ Dubbelzetter (Korte Klank)',
    difficulty: 'groep5-6',
    emoji: '🍞'
  },
  {
    id: 'spf-dz-14',
    word: 'hutten',
    syllables: ['hut', 'ten'],
    missingIndex: 0,
    options: ['hut', 'hu', 'huut', 'het'],
    soundRule: 'Korte klank /u/ in /hut/ krijgt een dubbele t (-tt-).',
    exampleSentence: 'Tijdens het zomerkamp bouwden de kinderen knusse hutten van takken en bladeren.',
    category: 'dubbelzetter',
    categoryLabel: '⚡ Dubbelzetter (Korte Klank)',
    difficulty: 'groep5-6',
    emoji: '🏕️'
  },

  // --- langermaak: Groep 3-5 ---
  {
    id: 'spf-lm-7',
    word: 'handdoek',
    syllables: ['hand', 'doek'],
    missingIndex: 0,
    options: ['hand', 'hant', 'han', 'hang'],
    soundRule: 'Langermaakregel: hand -> handen. Je hoort een /t/, maar schrijft een d.',
    exampleSentence: 'Na het zwemmen droogde ze zich af met een zachte handdoek.',
    category: 'langermaak',
    categoryLabel: '🐢 Langermaakwoord (d of t)',
    difficulty: 'groep3-4',
    emoji: '🛁'
  },
  {
    id: 'spf-lm-8',
    word: 'vriendjes',
    syllables: ['vriend', 'jes'],
    missingIndex: 0,
    options: ['vriend', 'vrient', 'vrind', 'vrend'],
    soundRule: 'Langermaakregel: vriend -> vrienden. Je hoort een /t/, maar schrijft een d.',
    exampleSentence: 'Op het schoolplein spelen alle vriendjes samen een leuk spel.',
    category: 'langermaak',
    categoryLabel: '🐢 Langermaakwoord (d of t)',
    difficulty: 'groep3-4',
    emoji: '🤝'
  },
  {
    id: 'spf-lm-9',
    word: 'eiland',
    syllables: ['ei', 'land'],
    missingIndex: 1,
    options: ['land', 'lant', 'lan', 'lang'],
    soundRule: 'Langermaakregel: land -> landen. Je hoort een /t/, maar schrijft een d.',
    exampleSentence: 'Op vakantie zwommen ze naar een klein eiland midden in het meer.',
    category: 'langermaak',
    categoryLabel: '🐢 Langermaakwoord (d of t)',
    difficulty: 'groep3-4',
    emoji: '🏝️'
  },
  // --- langermaak: Groep 6-8 ---
  {
    id: 'spf-lm-10',
    word: 'hoofdstad',
    syllables: ['hoofd', 'stad'],
    missingIndex: 0,
    options: ['hoofd', 'hooft', 'hoft', 'hoofdt'],
    soundRule: 'Langermaakregel: hoofd -> hoofden. Je hoort een /t/, maar schrijft een d.',
    exampleSentence: 'Amsterdam is de hoofdstad van Nederland en trekt jaarlijks miljoenen toeristen.',
    category: 'langermaak',
    categoryLabel: '🐢 Langermaakwoord (d of t)',
    difficulty: 'groep5-6',
    emoji: '🏙️'
  },
  {
    id: 'spf-lm-11',
    word: 'handschoenen',
    syllables: ['hand', 'schoe', 'nen'],
    missingIndex: 0,
    options: ['hand', 'hant', 'han', 'hang'],
    soundRule: 'Langermaakregel: hand -> handen. Je hoort een /t/ klinken, maar schrijft een d.',
    exampleSentence: 'Bij koud winterweer trekt oma warme handschoenen aan voordat ze naar buiten gaat.',
    category: 'langermaak',
    categoryLabel: '🐢 Langermaakwoord (d of t)',
    difficulty: 'groep5-6',
    emoji: '🧤'
  },

  // --- luchtwoord: Groep 3-5 ---
  {
    id: 'spf-lw-6',
    word: 'achtbaan',
    syllables: ['acht', 'baan'],
    missingIndex: 0,
    options: ['acht', 'agt', 'akt', 'aght'],
    soundRule: 'Luchtwoord: korte klank /a/ + /cht/ schrijf je met de ch van lucht.',
    exampleSentence: 'In het pretpark gingen ze samen in de snelle achtbaan.',
    category: 'luchtwoord',
    categoryLabel: '🌙 Luchtwoord (-cht)',
    difficulty: 'groep3-4',
    emoji: '🎢'
  },
  {
    id: 'spf-lw-7',
    word: 'krachtig',
    syllables: ['kracht', 'ig'],
    missingIndex: 0,
    options: ['kracht', 'kragt', 'krakt', 'kraht'],
    soundRule: 'Luchtwoord: korte klank /a/ + /cht/ schrijf je altijd met -cht.',
    exampleSentence: 'De brandweerman is sterk en heeft krachtige spieren.',
    category: 'luchtwoord',
    categoryLabel: '🌙 Luchtwoord (-cht)',
    difficulty: 'groep3-4',
    emoji: '💪'
  },
  {
    id: 'spf-lw-8',
    word: 'nachtlampje',
    syllables: ['nacht', 'lamp', 'je'],
    missingIndex: 0,
    options: ['nacht', 'nagt', 'nakt', 'naht'],
    soundRule: 'Luchtwoord: korte klank /a/ + /cht/ schrijf je met ch van lucht.',
    exampleSentence: 'Voor het slapengaan doet Ridheya haar knusse nachtlampje aan.',
    category: 'luchtwoord',
    categoryLabel: '🌙 Luchtwoord (-cht)',
    difficulty: 'groep3-4',
    emoji: '🛌'
  },
  // --- luchtwoord: Groep 6-8 ---
  {
    id: 'spf-lw-9',
    word: 'gerecht',
    syllables: ['ge', 'recht'],
    missingIndex: 1,
    options: ['recht', 'regt', 'rekt', 'rest'],
    soundRule: 'Luchtwoord: korte klank /e/ + /cht/ schrijf je altijd met -cht.',
    exampleSentence: 'Het hoofdgerecht tijdens het schoolfeest was een heerlijke pastaschotel.',
    category: 'luchtwoord',
    categoryLabel: '🌙 Luchtwoord (-cht)',
    difficulty: 'groep5-6',
    emoji: '🍝'
  },
  {
    id: 'spf-lw-10',
    word: 'wachtwoord',
    syllables: ['wacht', 'woord'],
    missingIndex: 0,
    options: ['wacht', 'wagt', 'wakt', 'wecht'],
    soundRule: 'Luchtwoord: korte klank /a/ + /cht/ schrijf je met de ch van lucht.',
    exampleSentence: 'Voor de nieuwe schoolcomputer moet iedereen een geheim wachtwoord bedenken.',
    category: 'luchtwoord',
    categoryLabel: '🌙 Luchtwoord (-cht)',
    difficulty: 'groep5-6',
    emoji: '🔐'
  },

  // --- ij-ei-au-ou: Groep 3-5 ---
  {
    id: 'spf-ie-6',
    word: 'zeilboot',
    syllables: ['zeil', 'boot'],
    missingIndex: 0,
    options: ['zeil', 'zijl', 'zeel', 'zail'],
    soundRule: 'Weetwoord: zeil schrijf je met de korte EI, niet met de lange IJ.',
    exampleSentence: 'Op het meer voer een kleurige zeilboot voorbij.',
    category: 'ij-ei-au-ou',
    categoryLabel: '🦊 Weetwoorden (ij/ei & au/ou)',
    difficulty: 'groep3-4',
    emoji: '⛵'
  },
  {
    id: 'spf-ie-7',
    word: 'rijstpap',
    syllables: ['rijst', 'pap'],
    missingIndex: 0,
    options: ['rijst', 'reist', 'rijzt', 'rijs'],
    soundRule: 'Weetwoord: rijst schrijf je met de lange IJ (zoals rijp, ijs, pijl).',
    exampleSentence: 'Voor het avondeten maakte oma een warme kom rijstpap.',
    category: 'ij-ei-au-ou',
    categoryLabel: '🦊 Weetwoorden (ij/ei & au/ou)',
    difficulty: 'groep3-4',
    emoji: '🍚'
  },
  {
    id: 'spf-ie-8',
    word: 'houten',
    syllables: ['hou', 'ten'],
    missingIndex: 0,
    options: ['hou', 'hau', 'ho', 'how'],
    soundRule: 'Weetwoord: houten schrijf je met de otje-OU, niet met AU.',
    exampleSentence: 'In de klas staat een oude houten kast vol met boeken.',
    category: 'ij-ei-au-ou',
    categoryLabel: '🦊 Weetwoorden (ij/ei & au/ou)',
    difficulty: 'groep3-4',
    emoji: '🪑'
  },
  // --- ij-ei-au-ou: Groep 6-8 ---
  {
    id: 'spf-ie-9',
    word: 'fontein',
    syllables: ['fon', 'tein'],
    missingIndex: 1,
    options: ['tein', 'tijn', 'teen', 'tyn'],
    soundRule: 'Weetwoord: fontein schrijf je met de korte EI, niet met de lange IJ.',
    exampleSentence: 'Op een hete zomerdag spat het verfrissende water vrolijk uit de fontein in het park.',
    category: 'ij-ei-au-ou',
    categoryLabel: '🦊 Weetwoorden (ij/ei & au/ou)',
    difficulty: 'groep5-6',
    emoji: '⛲'
  },
  {
    id: 'spf-ie-10',
    word: 'ijsberg',
    syllables: ['ijs', 'berg'],
    missingIndex: 0,
    options: ['ijs', 'eis', 'ies', 'eijs'],
    soundRule: 'Weetwoord: ijsberg schrijf je met de lange IJ (zoals rijp, ijs, pijl).',
    exampleSentence: 'De poolonderzoekers meten hoe snel de ijsberg smelt door de opwarming van de aarde.',
    category: 'ij-ei-au-ou',
    categoryLabel: '🦊 Weetwoorden (ij/ei & au/ou)',
    difficulty: 'groep5-6',
    emoji: '🧊'
  },
  {
    id: 'spf-ie-11',
    word: 'kauwgom',
    syllables: ['kauw', 'gom'],
    missingIndex: 0,
    options: ['kauw', 'kouw', 'kou', 'kau'],
    soundRule: 'Weetwoord: kauwgom staat op de au-plaat, dus met de at-au en een w erachter.',
    exampleSentence: 'Tijdens de lange autorit deelde Hemali een rolletje kauwgom uit aan haar broertje.',
    category: 'ij-ei-au-ou',
    categoryLabel: '🦊 Weetwoorden (ij/ei & au/ou)',
    difficulty: 'groep5-6',
    emoji: '🍬'
  },

  // --- achtervoegsel: Groep 3-5 ---
  {
    id: 'spf-av-6',
    word: 'voorzichtig',
    syllables: ['voor', 'zich', 'tig'],
    missingIndex: 2,
    options: ['tig', 'tug', 'teg', 'tich'],
    soundRule: 'Achtervoegsel -ig: Je hoort /tug/, maar je schrijft -tig.',
    exampleSentence: 'Wees voorzichtig met de schaar tijdens de knutselles.',
    category: 'achtervoegsel',
    categoryLabel: '✨ Achtervoegsels (-lijk, -ig, -heid)',
    difficulty: 'groep3-4',
    emoji: '✂️'
  },
  {
    id: 'spf-av-7',
    word: 'vrolijk',
    syllables: ['vro', 'lijk'],
    missingIndex: 1,
    options: ['lijk', 'luk', 'lik', 'lyke'],
    soundRule: 'Achtervoegsel -lijk: Je hoort /luk/, maar je schrijft altijd -lijk.',
    exampleSentence: 'Op haar verjaardag was Hemali de hele dag vrolijk.',
    category: 'achtervoegsel',
    categoryLabel: '✨ Achtervoegsels (-lijk, -ig, -heid)',
    difficulty: 'groep3-4',
    emoji: '😄'
  },
  {
    id: 'spf-av-8',
    word: 'eerlijk',
    syllables: ['eer', 'lijk'],
    missingIndex: 1,
    options: ['lijk', 'luk', 'lik', 'liek'],
    soundRule: 'Achtervoegsel -lijk: Je hoort /luk/, maar je schrijft altijd -lijk.',
    exampleSentence: 'Het is belangrijk om altijd eerlijk te zijn tegen je vrienden.',
    category: 'achtervoegsel',
    categoryLabel: '✨ Achtervoegsels (-lijk, -ig, -heid)',
    difficulty: 'groep3-4',
    emoji: '🤞'
  },
  // --- achtervoegsel: Groep 6-8 ---
  {
    id: 'spf-av-9',
    word: 'eenzaamheid',
    syllables: ['een', 'zaam', 'heid'],
    missingIndex: 2,
    options: ['heid', 'hijd', 'heit', 'hyt'],
    soundRule: 'Achtervoegsel -heid schrijf je altijd met de korte ei en een d aan het einde.',
    exampleSentence: 'Na de verhuizing voelde Ridheya af en toe een lichte eenzaamheid.',
    category: 'achtervoegsel',
    categoryLabel: '✨ Achtervoegsels (-lijk, -ig, -heid)',
    difficulty: 'groep5-6',
    emoji: '😔'
  },
  {
    id: 'spf-av-10',
    word: 'duidelijk',
    syllables: ['dui', 'de', 'lijk'],
    missingIndex: 2,
    options: ['lijk', 'luk', 'lik', 'liek'],
    soundRule: 'Achtervoegsel -lijk: Je hoort /luk/, maar je schrijft altijd -lijk.',
    exampleSentence: 'De juf legt duidelijk uit hoe je een deelsom moet oplossen.',
    category: 'achtervoegsel',
    categoryLabel: '✨ Achtervoegsels (-lijk, -ig, -heid)',
    difficulty: 'groep5-6',
    emoji: '📘'
  },

  // --- samengesteld: Groep 6-8 (no groep3-4 entries, by design) ---
  {
    id: 'spf-sg-6',
    word: 'sneeuwpop',
    syllables: ['sneeuw', 'pop'],
    missingIndex: 0,
    options: ['sneeuw', 'sneuw', 'snouw', 'sneew'],
    soundRule: 'Samenstelling: sneeuw (met eeuw, want je hoort een lange /ee/ gevolgd door /w/) + pop.',
    exampleSentence: 'In de winter bouwden Ridheya en haar broertje een grote sneeuwpop in de tuin.',
    category: 'samengesteld',
    categoryLabel: '🔬 Samengestelde Woorden',
    difficulty: 'groep5-6',
    emoji: '⛄'
  },
  {
    id: 'spf-sg-7',
    word: 'zonnestraal',
    syllables: ['zon', 'ne', 'straal'],
    missingIndex: 1,
    options: ['ne', 'nen', 'ni', 'en'],
    soundRule: 'Samenstelling met tussenletter n: zon + ne + straal = zonnestraal (je hoort maar één n-klank, maar schrijft er twee).',
    exampleSentence: 'Een warme zonnestraal viel door het keukenraam naar binnen.',
    category: 'samengesteld',
    categoryLabel: '🔬 Samengestelde Woorden',
    difficulty: 'groep5-6',
    emoji: '☀️'
  },
  {
    id: 'spf-sg-8',
    word: 'natuurkunde',
    syllables: ['na', 'tuur', 'kun', 'de'],
    missingIndex: 1,
    options: ['tuur', 'tur', 'toer', 'tuu'],
    soundRule: 'Samenstelling: natuur (met uu, want je hoort een lange /uu/ vlak voor de r) + kunde.',
    exampleSentence: 'Tijdens de natuurkundeles leerden de kinderen hoe een magneet werkt.',
    category: 'samengesteld',
    categoryLabel: '🔬 Samengestelde Woorden',
    difficulty: 'groep5-6',
    emoji: '🧲'
  }
];

// Two-tier split for the Spelling Fabriek game, reusing the existing
// difficulty tag rather than re-authoring/duplicating entries: groep3-4 ->
// Groep 3-5, groep5-6 + groep7-8 -> Groep 6-8. Confirmed every category has
// at least 1 word in both pools except "samengesteld" (compound words),
// which only exists in the Groep 6-8 pool -- that category tab should be
// hidden when showing the Groep 3-5 pool.
export const SPELLING_GROEP_3_5 = COMPREHENSIVE_SPELLING_FACTORY_ITEMS.filter(
  item => item.difficulty === 'groep3-4'
);
export const SPELLING_GROEP_6_8 = COMPREHENSIVE_SPELLING_FACTORY_ITEMS.filter(
  item => item.difficulty === 'groep5-6' || item.difficulty === 'groep7-8'
);
