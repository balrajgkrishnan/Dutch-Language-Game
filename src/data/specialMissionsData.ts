import { ReporterMission, SpellingFactoryItem } from '../types';

export const HEMALI_REPORTER_MISSIONS: ReporterMission[] = [
  {
    id: 'rep-lion-interview',
    title: '🎙️ Safari Nieuws: Interview met de Leeuwenkoning',
    targetAnimalName: 'Leo de Leeuw',
    targetAnimalEmoji: '🦁',
    scenario: 'Je staat oog in oog met de trotse koning van de savanne! Als hoofdverslaggever stel je drie scherpe vragen over het dagelijkse leven en de bescherming van de roedel.',
    promptQuestions: [
      'Stel jezelf voor als safari-verslaggever en vraag hoe een gewone dag op de savanne eruitziet.',
      'Vraag waarom leeuwen in een groep (roedel) samenwerken om te jagen.',
      'Wat is volgens de leeuw de belangrijkste boodschap voor alle kinderen die van dieren houden?'
    ],
    sampleGoodAnswer: 'Hallo iedereen! Dit is Hemali live vanaf de savanne. Koning Leo, hoe zorgt u ervoor dat alle welpjes veilig blijven in de roedel?',
    vocabularyToUse: ['roedel', 'leefgebied', 'samenwerking', 'bescherming'],
    badgeRewardId: 'brave-speaker'
  },
  {
    id: 'rep-rainforest-report',
    title: '🌿 Weer- & Natuurverslag: De Tropische Regenbui',
    targetAnimalName: 'Kiki de Kameleon',
    targetAnimalEmoji: '🦎',
    scenario: 'Er barst een plotselinge tropische moessonbui los in het regenwoud. Geef een live weerbericht en leg uit waarom regen zo levensbelangrijk is voor de planten en dieren!',
    promptQuestions: [
      'Beschrijf wat je ziet, hoort en voelt als de regendruppels op de grote bladeren vallen.',
      'Waarom verandert de kameleon van kleur tijdens verschillende weersomstandigheden?',
      'Leg uit hoe de hoge woudreuzen al het water opvangen.'
    ],
    sampleGoodAnswer: 'Welkom bij het Safari Weerbericht! Hier in het bladerdak klettert de regen neer, waardoor de bloemen en kameleons helemaal opfleuren!',
    vocabularyToUse: ['bladerdak', 'luchtvochtigheid', 'ecosysteem', 'verfrissing'],
    badgeRewardId: 'young-journalist'
  },
  {
    id: 'rep-explain-thinking',
    title: '🦉 Filosofeer met Professor Ollie: Waarom & Wat Als?',
    targetAnimalName: 'Professor Ollie Uil',
    targetAnimalEmoji: '🦉',
    scenario: 'Professor Ollie stelt je een diepe denk-vraag over de natuur. Oefen met het beargumenteren van jouw eigen mening en gedachten!',
    promptQuestions: [
      'Waarom hebben dieren in koude poolgebieden een dikkere vacht dan dieren op de savanne?',
      'Wat zou er gebeuren als er geen bijen en vlinders meer waren om bloemen te bestuiven?',
      'Hoe kunnen mensen en wilde dieren het beste in harmonie met elkaar samenleven?'
    ],
    sampleGoodAnswer: 'Ik denk dat dit komt doordat de dikke vetlaag en vacht de lichaamswarmte vasthouden, waardoor ze niet bevriezen in de sneeuw.',
    vocabularyToUse: ['isolatie', 'oorzaak', 'gevolg', 'harmonie'],
    badgeRewardId: 'curiosity-champion'
  }
];

export const RIDHEYA_SPELLING_FACTORY_ITEMS: SpellingFactoryItem[] = [
  {
    id: 'spf-1',
    word: 'olifanten',
    syllables: ['o', 'li', 'fan', 'ten'],
    missingIndex: 1,
    options: ['li', 'lie', 'lee', 'ly'],
    soundRule: 'Korte klank / i / in een open lettergreep schrijf je met één letter i.',
    exampleSentence: 'De grote olifanten wandelen rustig naar het water.'
  },
  {
    id: 'spf-2',
    word: 'klimmen',
    syllables: ['klim', 'men'],
    missingIndex: 1,
    options: ['men', 'en', 'man', 'nem'],
    soundRule: 'Korte klank / i / aan het einde van de klankgroep krijgt een dubbele medeklinker (dubbelzetter -mm-).',
    exampleSentence: 'De speelse aapjes klimmen snel in de hoge bomen.'
  },
  {
    id: 'spf-3',
    word: 'bomen',
    syllables: ['bo', 'men'],
    missingIndex: 0,
    options: ['bo', 'boo', 'bou', 'bu'],
    soundRule: 'Lange klank / oo / aan het einde van de klankgroep verliest een letter (klankvoet / klankteen -o-).',
    exampleSentence: 'In het regenwoud groeien reusachtige bomen.'
  },
  {
    id: 'spf-4',
    word: 'schildpad',
    syllables: ['schild', 'pad'],
    missingIndex: 1,
    options: ['pad', 'pat', 'padd', 'path'],
    soundRule: 'Langermaakregel: schildpad -> schildpadden, dus je hoort een / d / en schrijft een d.',
    exampleSentence: 'De oude schildpad zwemt sierlijk door de oceaan.'
  },
  {
    id: 'spf-5',
    word: 'nachtegaal',
    syllables: ['nach', 'te', 'gaal'],
    missingIndex: 0,
    options: ['nach', 'nagt', 'nak', 'nah'],
    soundRule: 'Luchtwoord: korte klank + / cht / met de ch van lucht, behalve bij hij ligt, hij legt, hij zegt.',
    exampleSentence: 'De nachtegaal zingt het mooiste lied van het bos.'
  },
  {
    id: 'spf-6',
    word: 'savanne',
    syllables: ['sa', 'van', 'ne'],
    missingIndex: 1,
    options: ['van', 'vaan', 'fan', 'ven'],
    soundRule: 'Korte klank / a / gevolgd door dubbelzetter -nn-.',
    exampleSentence: 'De leeuwen rusten uit op de warme savanne.'
  }
];

export interface SisterTeamQuest {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  hemaliTask: {
    title: string;
    description: string;
    requirement: string;
    isCompleted: boolean;
  };
  ridheyaTask: {
    title: string;
    description: string;
    requirement: string;
    isCompleted: boolean;
  };
  rewardTitle: string;
  rewardBadge: string;
}

export const SISTER_TEAM_QUESTS: SisterTeamQuest[] = [
  {
    id: 'team-lion-sanctuary',
    title: '👑 Zussen Missie: Het Gouden Leeuwenheiligdom',
    subtitle: 'Samenwerken tussen Hemali & Ridheya voor een gedeelde overwinning!',
    description: 'Om de legendarische Gouden Leeuwenkroon en het beschermde Leeuwenheiligdom te ontgrendelen, bundelen Hemali en Ridheya hun krachten!',
    hemaliTask: {
      title: 'Hemali’s Communicatie Missie',
      description: 'Voltooi 1 Safari Verslaggever interview en spreek je antwoord luid en duidelijk in.',
      requirement: '1 Reporter Mission voltooien',
      isCompleted: false
    },
    ridheyaTask: {
      title: 'Ridheya’s Leesheld Missie',
      description: 'Voltooi 1 Spelling Factory missie en lees 1 verhaal vloeiend mee.',
      requirement: '1 Spelling Factory ronde voltooien',
      isCompleted: false
    },
    rewardTitle: 'Gouden Leeuwen Trofee & Gedeeld Koninklijk Safari Kamp',
    rewardBadge: 'sister-team-champions'
  }
];
