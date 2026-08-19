import { GrowthMilestone, AssessmentSnapshot, GradeLevel } from '../types';

export interface PlacementStage {
  id: string;
  stageNumber: number;
  title: string;
  skillName: string;
  adventureStory: string;
  companionTip: string;
  iconEmoji: string;
  type: 'vocab' | 'fluency' | 'comprehension' | 'listening' | 'spelling' | 'pronounce' | 'writing' | 'math';
  question: string;
  options?: string[];
  correctOptionIndex?: number;
  readAloudText?: string;
  targetWord?: string;
  mathAnswer?: number;
  writingPrompt?: string;
}

export const SAFARI_PLACEMENT_STAGES: PlacementStage[] = [
  {
    id: 'stage_1_vocab',
    stageNumber: 1,
    title: 'Het Geheime Spoor in het Zand',
    skillName: 'Woordenschat',
    adventureStory: 'Max en Professor Ollie hebben vreemde pootafdrukken gevonden bij de waterpoel. Welk woord beschrijft een dier dat ’s nachts op pad gaat?',
    companionTip: 'Kijk goed naar de betekenis van nachtelijke dieren!',
    iconEmoji: '🐾',
    type: 'vocab',
    question: 'Een dier dat vooral in het donker leeft en actief is, noemen we een...',
    options: ['Nachtdier (Nocturn)', 'Koudbloedig dier', 'Woestijndier', 'Kuddedier'],
    correctOptionIndex: 0
  },
  {
    id: 'stage_2_fluency',
    stageNumber: 2,
    title: 'De Fluisterende Savannebomen',
    skillName: 'Leesvloeiendheid',
    adventureStory: 'Lees de safarikaart hardop voor. Luister naar het rustige ritme van de wind door de acaciabomen!',
    companionTip: 'Spreek rustig, duidelijk en zonder te haasten. Elke letter telt!',
    iconEmoji: '📜',
    type: 'fluency',
    question: 'Lees deze zin vloeiend en duidelijk hardop:',
    readAloudText: 'De trotse leeuwin loopt rustig door het gouden gras naar haar speelse welpjes bij de veilige rotspartij.'
  },
  {
    id: 'stage_3_comprehension',
    stageNumber: 3,
    title: 'Het Mysterie van de Verloren Sleutel',
    skillName: 'Begrijpend Lezen',
    adventureStory: 'Boerin Tess verloor haar heksleutel. In het logboek staat: "Tess legde de sleutel op de hoogste tak van de baobabboom zodat de nieuwsgierige apen er niet bij konden, maar een briesje waaide haar hoed over de tak."',
    companionTip: 'Lees de tekst goed: waar ligt de sleutel nu verborgen?',
    iconEmoji: '🔍',
    type: 'comprehension',
    question: 'Waarom legde Boerin Tess de sleutel juist hoog in de baobabboom?',
    options: [
      'Omdat de apen er anders mee vandoor zouden gaan',
      'Omdat het daar lekker warm was',
      'Omdat de giraf ernaar vroeg',
      'Ze was de sleutel per ongeluk vergeten'
    ],
    correctOptionIndex: 0
  },
  {
    id: 'stage_4_listening',
    stageNumber: 4,
    title: 'Het Radiosignaal van het Dierenkamp',
    skillName: 'Luistervaardigheid & Klanken',
    adventureStory: 'Er komt een krakend radiosignaal binnen van de veldwachter. Luister goed naar de klankopbouw van het dier!',
    companionTip: 'Luister naar het audiobericht of bekijk de klankstructuur.',
    iconEmoji: '📻',
    type: 'listening',
    question: 'Welk dier hoor je in de klankreeks: [ o - li - fant ] ?',
    options: ['Olifant', 'Antilope', 'Flamingo', 'Krokodil'],
    correctOptionIndex: 0
  },
  {
    id: 'stage_5_spelling',
    stageNumber: 5,
    title: 'De Gereedschapskist van de Ranger',
    skillName: 'Spelling & Klankregels',
    adventureStory: 'Om het waterreservoir te repareren moeten we de juiste buizen labelen. Welk woord is op de juiste manier geschreven met dubbele medeklinkers?',
    companionTip: 'Denk aan de klankvoetregel: korte klank krijgt dubbele medeklinker!',
    iconEmoji: '🧰',
    type: 'spelling',
    question: 'Kies het correct gespelde woord:',
    options: ['Kudde (korte klank [u] -> dubbel d)', 'Kude', 'Kuddeu', 'Kudte'],
    correctOptionIndex: 0
  },
  {
    id: 'stage_6_pronounce',
    stageNumber: 6,
    title: 'De Dierenarts Oproep',
    skillName: 'Spraak & Uitspraak',
    adventureStory: 'Roep het safariteam op via de megafoon. Zorg dat je stem vol zelfvertrouwen klinkt!',
    companionTip: 'Adem diep in en spreek helder en trots!',
    iconEmoji: '🎙️',
    type: 'pronounce',
    question: 'Spreek de zin in met luide, duidelijke stem:',
    readAloudText: 'Attentie team, alle zebra’s zijn veilig teruggekeerd naar de groene weide!'
  },
  {
    id: 'stage_7_writing',
    stageNumber: 7,
    title: 'Het Safari Dagboekbericht',
    skillName: 'Schrijfvaardigheid & Expressie',
    adventureStory: 'Schrijf een korte zin over welk dier jij vandaag zou willen helpen en waarom.',
    companionTip: 'Gebruik minstens 5 woorden en vertel waarom!',
    iconEmoji: '✍️',
    type: 'writing',
    question: 'Schrijf jouw safaribericht hieronder:',
    writingPrompt: 'Ik wil vandaag de olifant helpen, omdat hij veel water nodig heeft in de warme zon.'
  },
  {
    id: 'stage_8_math',
    stageNumber: 8,
    title: 'Het Voedselrantsoen Berekenen',
    skillName: 'Wiskunde & Logica',
    adventureStory: 'Er zijn 4 giraffen. Elke giraf eet 6 bundels acaciabladeren per dag. Hoeveel bundels hebben we in totaal nodig voor 1 dag?',
    companionTip: 'Denk aan de tafel van 4 of 6: 4 x 6 = ?',
    iconEmoji: '🧮',
    type: 'math',
    question: 'Hoeveel bundels bladeren zijn er in totaal nodig? (4 x 6)',
    options: ['24 bundels', '20 bundels', '18 bundels', '28 bundels'],
    correctOptionIndex: 0
  }
];

export const INITIAL_GROWTH_MILESTONES: GrowthMilestone[] = [
  {
    id: 'milestone_reading_10',
    title: 'Leesverkenner Medaille',
    skill: 'readingFluency',
    requiredGrowthPct: 10,
    description: '+10% Groei in Leesvloeiendheid en zinsritme',
    emoji: '📖',
    unlocked: true,
    unlockedDate: '2026-08-01'
  },
  {
    id: 'milestone_vocab_15',
    title: 'Woordentovenaar Trofee',
    skill: 'vocabulary',
    requiredGrowthPct: 15,
    description: '+15% Groei in Woordenschat en begripsrijkdom',
    emoji: '🧙‍♂️',
    unlocked: true,
    unlockedDate: '2026-08-10'
  },
  {
    id: 'milestone_confidence_20',
    title: 'Moedige Spreker Bokaal',
    skill: 'confidence',
    requiredGrowthPct: 20,
    description: '+20% Groei in Spreekdurf, zelfvertrouwen & vragen stellen',
    emoji: '🦁',
    unlocked: true,
    unlockedDate: '2026-08-15'
  },
  {
    id: 'milestone_spelling_15',
    title: 'Spellingsmeester Speld',
    skill: 'spelling',
    requiredGrowthPct: 15,
    description: '+15% Groei in Klankzuivere spelling & werkwoordspelling',
    emoji: '🏅',
    unlocked: false
  },
  {
    id: 'milestone_comprehension_20',
    title: 'Tekstdetective Kroon',
    skill: 'readingComprehension',
    requiredGrowthPct: 20,
    description: '+20% Groei in Begrijpend lezen, conclusies trekken & voorspellen',
    emoji: '👑',
    unlocked: false
  },
  {
    id: 'milestone_math_15',
    title: 'Rekenheld Schild',
    skill: 'mathematics',
    requiredGrowthPct: 15,
    description: '+15% Groei in Rekensnelheid en logisch redeneren',
    emoji: '🛡️',
    unlocked: true,
    unlockedDate: '2026-08-18'
  }
];

export const INITIAL_MONTHLY_SNAPSHOTS_HEMALI: AssessmentSnapshot[] = [
  {
    id: 'snap_hemali_m1',
    date: '2026-06-15',
    timestamp: Date.now() - 60 * 24 * 60 * 60 * 1000,
    monthLabel: 'Maand 1 (Juni - Nulmeting)',
    readingFluency: 72,
    readingComprehension: 75,
    vocabulary: 65,
    spelling: 82,
    pronunciation: 60,
    listening: 80,
    writing: 58,
    mathematics: 92,
    confidence: 42,
    wpm: 88,
    accuracyPct: 91,
    notes: 'Sterk in rekenen en begrijpen; terughoudend bij mondelinge presentaties en het uiten van meningen.',
    weakAreas: ['Mondelinge spreekdurf', 'Nederlandse uitspraakverfijning', 'Open vragen formuleren'],
    strongAreas: ['Wiskundig inzicht', 'Grammaticale spelling', 'Luisterfocus']
  },
  {
    id: 'snap_hemali_m2',
    date: '2026-07-15',
    timestamp: Date.now() - 30 * 24 * 60 * 60 * 1000,
    monthLabel: 'Maand 2 (Juli)',
    readingFluency: 76,
    readingComprehension: 79,
    vocabulary: 69,
    spelling: 85,
    pronunciation: 64,
    listening: 83,
    writing: 62,
    mathematics: 94,
    confidence: 48,
    wpm: 94,
    accuracyPct: 94,
    notes: 'Begint actiever mee te doen met de Safari Reporter missies. Meer ontspannen houding bij microfoonopnames.',
    weakAreas: ['Zelfvertrouwen bij onverwachte vragen'],
    strongAreas: ['Wiskunde', 'Begrijpend lezen', 'Schriftelijke structuur']
  },
  {
    id: 'snap_hemali_m3',
    date: '2026-08-18',
    timestamp: Date.now(),
    monthLabel: 'Maand 3 (Augustus - Huidig)',
    readingFluency: 80,
    readingComprehension: 82,
    vocabulary: 72,
    spelling: 88,
    pronunciation: 68,
    listening: 85,
    writing: 65,
    mathematics: 95,
    confidence: 55,
    wpm: 102,
    accuracyPct: 96,
    notes: 'Mooie stijging in spreekdurf (+13% sinds baseline)! Hemali formuleert nu volledige journalistenzinnen.',
    weakAreas: ['Vloeiend improviseren'],
    strongAreas: ['Wiskunde & Logica', 'Spelling', 'Nauwkeurige leessnelheid']
  }
];

export const INITIAL_MONTHLY_SNAPSHOTS_RIDHEYA: AssessmentSnapshot[] = [
  {
    id: 'snap_ridheya_m1',
    date: '2026-06-15',
    timestamp: Date.now() - 60 * 24 * 60 * 60 * 1000,
    monthLabel: 'Maand 1 (Juni - Nulmeting)',
    readingFluency: 48,
    readingComprehension: 68,
    vocabulary: 56,
    spelling: 52,
    pronunciation: 65,
    listening: 72,
    writing: 50,
    mathematics: 85,
    confidence: 68,
    wpm: 52,
    accuracyPct: 84,
    notes: 'Veel enthousiasme en logisch inzicht. Moet nog wennen aan dubbele medeklinkers en hakken/plakken bij lange zinnen.',
    weakAreas: ['Technisch lezen van samengestelde woorden', 'Spelling van open/gesloten lettergrepen'],
    strongAreas: ['Rekenbegrip', 'Luisterplezier', 'Vrolijkheid & Durf']
  },
  {
    id: 'snap_ridheya_m2',
    date: '2026-07-15',
    timestamp: Date.now() - 30 * 24 * 60 * 60 * 1000,
    monthLabel: 'Maand 2 (Juli)',
    readingFluency: 53,
    readingComprehension: 71,
    vocabulary: 60,
    spelling: 58,
    pronunciation: 68,
    listening: 75,
    writing: 55,
    mathematics: 88,
    confidence: 72,
    wpm: 60,
    accuracyPct: 88,
    notes: 'Goede vooruitgang in de Spelling Fabriek. Klankgroepen hakken gaat aanzienlijk sneller.',
    weakAreas: ['Spelling met d/t aan het woordeinde'],
    strongAreas: ['Begrijpend luisteren', 'Rekenen', 'Positieve werkhouding']
  },
  {
    id: 'snap_ridheya_m3',
    date: '2026-08-18',
    timestamp: Date.now(),
    monthLabel: 'Maand 3 (Augustus - Huidig)',
    readingFluency: 58,
    readingComprehension: 74,
    vocabulary: 64,
    spelling: 62,
    pronunciation: 70,
    listening: 78,
    writing: 60,
    mathematics: 90,
    confidence: 76,
    wpm: 68,
    accuracyPct: 92,
    notes: 'Leesvloeiendheid is gestegen naar 68 woorden per minuut (+16 WPM sinds baseline)! Fantastische leesheld.',
    weakAreas: ['Lange leesteksten zonder pauze'],
    strongAreas: ['Woordenschat in context', 'Rekenen', 'Leesplezier & Volharding']
  }
];

export const FLUENCY_TEST_PASSAGES = [
  {
    id: 'passage_safari_1',
    grade: 'group_4_5' as GradeLevel,
    title: 'De Jonge Zebra bij de Drinkplaats',
    targetWpm: 70,
    totalWords: 45,
    text: 'Op een zonnige ochtend rent de kleine zebra vrolijk door het hoge savannegroen. Bij de drinkplaats wachten zijn moeder en twee giraffen. Samen drinken ze het frisse water, terwijl een groepje vogels hoog boven de bomen zingt.'
  },
  {
    id: 'passage_safari_2',
    grade: 'group_6_7_8' as GradeLevel,
    title: 'De Geheime Nachtsafari van het Onderzoeksteam',
    targetWpm: 110,
    totalWords: 72,
    text: 'Zodra de schemering over het reservaat valt, ontwaakt een volstrekt andere dierenwereld. Gewapend met infraroodkijkers volgen de onderzoekers een troep leeuwen die geruisloos manoeuvreert langs de oever van de rivier. Elk geluid in de duisternis bevat waardevolle informatie over het territorium en het sociale gedrag van deze majestueuze roofdieren.'
  }
];
