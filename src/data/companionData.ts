import { CompanionPetId, PetCompanionState, PetHomeType } from '../types';

export interface PetDefinition {
  id: CompanionPetId;
  name: string;
  species: string;
  emoji: string;
  avatarBg: string;
  recommendedFor: 'hemali' | 'ridheya' | 'all';
  focusSkill: string;
  personality: string;
  sampleQuestions: string[];
  encouragements: string[];
  specialAbility: string;
}

export const ALL_PETS: PetDefinition[] = [
  {
    id: 'ollie-owl',
    name: 'Professor Ollie Uil',
    species: 'Uil',
    emoji: '🦉',
    avatarBg: 'from-amber-400 to-indigo-600',
    recommendedFor: 'hemali',
    focusSkill: 'Communicatie, Zelfvertrouwen & Vragen stellen',
    personality: 'Wijs, nieuwsgierig en moedigt je altijd aan om hardop te praten en je mening te delen!',
    sampleQuestions: [
      'Waarom denk je dat dit het juiste antwoord is?',
      'Kun je jouw antwoord in een mooie zin uitleggen?',
      'Welke vraag zou jij aan Boerin Tess willen stellen?',
      'Wat denk je dat er hierna in het safariavontuur gaat gebeuren?'
    ],
    encouragements: [
      'Geweldig gesproken, Hemali! Je uitleg is super helder!',
      'Wat een slimme vraag! Nieuwsgierigheid maakt je een echte onderzoeker!',
      'Spreek maar lekker vol vertrouwen, je weet ontzettend veel!'
    ],
    specialAbility: 'Vraagt je om je gedachten hardop te verwoorden voor extra sterren.'
  },
  {
    id: 'max-monkey',
    name: 'Max de Lees-Aap',
    species: 'Aapje',
    emoji: '🐒',
    avatarBg: 'from-amber-500 to-orange-600',
    recommendedFor: 'ridheya',
    focusSkill: 'Leesvloeiendheid, Woordenschat & Spelling',
    personality: 'Vrolijk, speels en helpt je stap voor stap bij het ontleden van moeilijke woorden!',
    sampleQuestions: [
      'Zullen we dit woord samen in stukjes hakken?',
      'Kun je deze zin rustig en duidelijk voorlezen?',
      'Waar zit de lastige klank in dit woord?',
      'Welk nieuw woord hebben we zojuist ontdekt?'
    ],
    encouragements: [
      'Wat lees je al ontzettend vlot, Ridheya! Trots op jou!',
      'Stukje voor stukje kom je er altijd uit! Fantastisch gespeld!',
      'Elk boek maakt jou sterker en wijzer!'
    ],
    specialAbility: 'Hakt lastige Nederlandse woorden in kleurrijke lettergrepen.'
  },
  {
    id: 'coco-parrot',
    name: 'Coco de Papegaai',
    species: 'Papegaai',
    emoji: '🦜',
    avatarBg: 'from-emerald-400 to-teal-600',
    recommendedFor: 'all',
    focusSkill: 'Uitspraak & Woorden Nazeggen',
    personality: 'Kleurrijk en dol op het herhalen van nieuwe woorden met de juiste intonatie!',
    sampleQuestions: [
      'Kun je dit woord net zo vrolijk nazeggen als ik?',
      'Hoor je het verschil tussen de lange en korte klank?'
    ],
    encouragements: ['KRAAI! Prachtige uitspraak!', 'Je praat net zo duidelijk als een echte safari-gids!'],
    specialAbility: 'Spreekt woorden extra langzaam en melodieus voor.'
  },
  {
    id: 'leo-lion',
    name: 'Leo het Leeuwenwelpje',
    species: 'Leeuw',
    emoji: '🦁',
    avatarBg: 'from-amber-400 to-yellow-600',
    recommendedFor: 'all',
    focusSkill: 'Dappere Spraak & Zelfexpressie',
    personality: 'Moedig, vriendelijk en geeft je de kracht om luid en trots te spreken!',
    sampleQuestions: ['Durf jij als een koning hardop het antwoord te roepen?'],
    encouragements: ['Brul van trots! Je deed het geweldig!'],
    specialAbility: 'Verdubbelt je reeks-munten bij moeilijke vragen.'
  },
  {
    id: 'ella-elephant',
    name: 'Ella het Olifantje',
    species: 'Olifant',
    emoji: '🐘',
    avatarBg: 'from-sky-400 to-blue-600',
    recommendedFor: 'all',
    focusSkill: 'Geheugen & Begrijpend Lezen',
    personality: 'Heeft een fantastisch geheugen en onthoudt elk detail uit de verhalen!',
    sampleQuestions: ['Wie was er ook alweer aan het begin van het verhaal?'],
    encouragements: ['Jouw geheugen is net zo sterk als een olifant!'],
    specialAbility: 'Geeft een hint over de alinea waar het antwoord verstopt zit.'
  }
];

export const PET_GROWTH_STAGES: Record<number, { stage: PetCompanionState['stage']; name: string; minXp: number; title: string; bonus: string }> = {
  1: { stage: 'baby', name: 'Baby Welp', minXp: 0, title: 'Kleine Leerling', bonus: '+10% Munten' },
  2: { stage: 'explorer', name: 'Avonturier', minXp: 100, title: 'Wakkere Speurneus', bonus: '+15% Munten & Tips' },
  3: { stage: 'helper', name: 'Hulpje', minXp: 250, title: 'Trouwe Taalhulp', bonus: 'Lettergreep Hint Vrij' },
  4: { stage: 'guide', name: 'Gids', minXp: 500, title: 'Safari Meester', bonus: 'Verdubbelde Hartjes' },
  5: { stage: 'mentor', name: 'Mentor', minXp: 900, title: 'Grote Taalwijsheid', bonus: 'Geheime Verhalen Vrij' },
  6: { stage: 'master', name: 'Meester', minXp: 1500, title: 'Koninklijke Kampioen', bonus: 'Gouden Kroon Kostuum' },
  7: { stage: 'legend', name: 'Legende', minXp: 2500, title: 'Onsterfelijke Safarilegende', bonus: 'Alles Ontgrendeld' }
};

export const PET_HOMES: Record<PetHomeType, { name: string; emoji: string; bgGradient: string; description: string }> = {
  treehouse: {
    name: 'Boomhut in het Regenwoud',
    emoji: '🏡',
    bgGradient: 'from-emerald-800 to-teal-900',
    description: 'Een knusse houten boomhut tussen de groene bladeren en lianen.'
  },
  safari_camp: {
    name: 'Savanne Safari Kamp',
    emoji: '⛺',
    bgGradient: 'from-amber-700 to-orange-900',
    description: 'Een gezellige canvastent met kampvuur onder de Afrikaanse sterrenhemel.'
  },
  jungle_cabin: {
    name: 'Tropische Junglehut',
    emoji: '🛖',
    bgGradient: 'from-green-900 to-emerald-950',
    description: 'Een bamboe lodge met hangmatten en zingende vogels rondom.'
  },
  explorer_lodge: {
    name: 'Onderzoekers Blokhut',
    emoji: '🪵',
    bgGradient: 'from-slate-800 to-blue-950',
    description: 'Vol landkaarten, vergrootglazen, boeken en safari-trofeeën.'
  },
  animal_sanctuary: {
    name: 'Koraal & Kust Heiligdom',
    emoji: '🌊',
    bgGradient: 'from-blue-800 to-cyan-950',
    description: 'Aan de rand van het helderblauwe water met spelende dolfijnen.'
  },
  acacia_grove: {
    name: 'Acacia Boompjes Veld',
    emoji: '🌳',
    bgGradient: 'from-amber-600 to-yellow-800',
    description: 'Tussen de weidse acaciabomen en gouden savannegrassen.'
  },
  savannah_nest: {
    name: 'Savanne Kraaiennest',
    emoji: '🪺',
    bgGradient: 'from-orange-700 to-amber-900',
    description: 'Een warm en veilig nest hoog op de rotsen met uitzicht over de hele safari.'
  },
  waterfall_cave: {
    name: 'Waterval Grot',
    emoji: '💎',
    bgGradient: 'from-cyan-800 to-blue-950',
    description: 'Een fonkelende grot achter een kletterende junglewaterval.'
  }
};

export function createInitialCompanion(petId: CompanionPetId = 'ollie-owl'): PetCompanionState {
  const def = ALL_PETS.find(p => p.id === petId) || ALL_PETS[0];
  return {
    id: def.id,
    name: def.name,
    species: def.species,
    emoji: def.emoji,
    stage: 'explorer',
    level: 1,
    xp: 0,
    maxXp: 100,
    friendshipHearts: 3,
    home: 'treehouse',
    unlockedHomeDecorations: ['warm-carpet', 'bookshelf', 'fairy-lights'],
    customAccessories: ['safari-bandana'],
    personality: def.personality,
    specialAbility: def.specialAbility
  };
}
