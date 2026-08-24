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
    id: 'bowie-puppy',
    name: 'Bowie de Speurpup',
    species: 'Puppy',
    emoji: '🐶',
    avatarBg: 'from-amber-300 to-yellow-500',
    recommendedFor: 'all',
    focusSkill: 'Trouwe Hulp & Woordspeurtochten',
    personality: 'Ontzettend enthousiast, kwispelt bij elk goed antwoord en ruikt moeilijke letters van verre!',
    sampleQuestions: ['Woef! Welke letter ruik jij als eerste in dit woord?'],
    encouragements: ['Woef woef! Je bent de allerbeste speurneus van het land!'],
    specialAbility: 'Geeft een gratis hint bij de moeilijkste vraag.'
  },
  {
    id: 'mimi-kitten',
    name: 'Mimi het Knuffelkittentje',
    species: 'Kittentje',
    emoji: '🐱',
    avatarBg: 'from-amber-300 via-orange-400 to-amber-500',
    recommendedFor: 'all',
    focusSkill: 'Zachte Klanken & Ritmisch Lezen',
    personality: 'Spint luidkeels van geluk als je rustig en vloeiend leest, dol op bolletjes wol en aaitjes!',
    sampleQuestions: ['Mauw! Kun je dit woord zachtjes en zuiver spellen?'],
    encouragements: ['Prrr! Mijn hartje spint van trots om hoe jij leest!'],
    specialAbility: 'Herstelt 1 extra poging bij een leesfoutje.'
  },
  {
    id: 'pippa-panda',
    name: 'Pippa de Luie Panda',
    species: 'Panda',
    emoji: '🐼',
    avatarBg: 'from-emerald-300 to-teal-500',
    recommendedFor: 'all',
    focusSkill: 'Rust, Geduld & Diepe Concentratie',
    personality: 'Houdt van bamboe snacks en helpt je kalm te blijven tijdens lange leesteksten.',
    sampleQuestions: ['Neem even rustig de tijd om de vraag nog een keer te bekijken.'],
    encouragements: ['Super ontspannen en geconcentreerd gewerkt!'],
    specialAbility: 'Geeft 50% extra concentratie-XP bij voltooide verhalen.'
  },
  {
    id: 'bibi-bunny',
    name: 'Bibi het Huppelkonijntje',
    species: 'Konijntje',
    emoji: '🐰',
    avatarBg: 'from-purple-300 to-pink-400',
    recommendedFor: 'all',
    focusSkill: 'Snelheid & Vlot Leestempo',
    personality: 'Huppelt vrolijk in het rond en viert elke voltooide alinea met een vrolijke sprong!',
    sampleQuestions: ['Hop hop! Zullen we doorlezen naar de volgende alinea?'],
    encouragements: ['Je leest net zo vlot als een huppelend konijntje!'],
    specialAbility: 'Verhoogt je leessnelheid-bonus met +10 sterren.'
  },
  {
    id: 'vossie-fox',
    name: 'Vossie de Poolvos',
    species: 'Poolvos',
    emoji: '🦊',
    avatarBg: 'from-orange-300 to-rose-500',
    recommendedFor: 'all',
    focusSkill: 'Slimme Woordstrategieën & Raadsels',
    personality: 'Pienter en behendig. Lost met plezier de meest ingewikkelde grammaticaraadsels op!',
    sampleQuestions: ['Wat is de slimste truc om deze werkwoordsvorm te vinden?'],
    encouragements: ['Sluw en slim als een vosje! Goed nagedacht!'],
    specialAbility: 'Onthult de stam van elk Nederlands werkwoord.'
  },
  {
    id: 'draco-dragon',
    name: 'Draco het Vuur-Draakje',
    species: 'Draakje',
    emoji: '🐉',
    avatarBg: 'from-red-400 to-amber-500',
    recommendedFor: 'all',
    focusSkill: 'Kracht, Passie & Woordenschat-Magie',
    personality: 'Spuwt magische glittervonkjes wanneer je een 5-streak behaalt!',
    sampleQuestions: ['Voel de magische energie in deze zin!'],
    encouragements: ['Vlammend goed gedaan! Niet te stoppen!'],
    specialAbility: 'Geeft een magische vlammen-streak bonus.'
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

export interface TamagotchiItem {
  id: string;
  name: string;
  emoji: string;
  type: 'food' | 'wash' | 'toy' | 'sleep' | 'accessory';
  effect: {
    hunger?: number;
    happiness?: number;
    energy?: number;
    cleanliness?: number;
    xp?: number;
    hearts?: number;
  };
  cost: number;
  description: string;
}

export const TAMAGOTCHI_FOODS: TamagotchiItem[] = [
  { id: 'apple', name: 'Knapperige Appel', emoji: '🍎', type: 'food', effect: { hunger: 25, happiness: 15, xp: 20 }, cost: 0, description: 'Lekker vers en gezond!' },
  { id: 'banana', name: 'Gouden Banaan', emoji: '🍌', type: 'food', effect: { hunger: 30, happiness: 20, xp: 25 }, cost: 5, description: 'Super zoet en vol energie!' },
  { id: 'cookies', name: 'Melk & Koekjes', emoji: '🥛', type: 'food', effect: { hunger: 35, happiness: 30, xp: 30 }, cost: 10, description: 'Warme melk en knapperige koekjes.' },
  { id: 'fish', name: 'Vers Visje', emoji: '🐟', type: 'food', effect: { hunger: 40, happiness: 35, xp: 35 }, cost: 10, description: 'Geliefd bij katjes, pinguïns en welpjes!' },
  { id: 'bamboo', name: 'Zoete Bamboe Scheut', emoji: '🎋', type: 'food', effect: { hunger: 35, happiness: 30, xp: 30 }, cost: 10, description: 'Knapperig lievelingseten van panda Pippa!' },
  { id: 'cake', name: 'Verjaardags Feesttaart', emoji: '🎂', type: 'food', effect: { hunger: 50, happiness: 50, xp: 50, hearts: 1 }, cost: 20, description: 'Een gigantische feesttraktatie!' }
];

export const TAMAGOTCHI_CARE_ACTIONS = [
  { id: 'soap_wash', name: 'Lekker Inzepen', emoji: '🧼', type: 'wash', effect: { cleanliness: 40, happiness: 20, xp: 25 }, description: 'Zachte schuimbellen overal!' },
  { id: 'warm_shower', name: 'Warme Douche', emoji: '🚿', type: 'wash', effect: { cleanliness: 60, happiness: 30, xp: 30 }, description: 'Lekker afspoelen met warm water.' },
  { id: 'ball_play', name: 'Balletje Gooien', emoji: '🎾', type: 'toy', effect: { happiness: 40, energy: -15, xp: 35 }, description: 'Gooi de bal en je maatje rent erachteraan!' },
  { id: 'dance_party', name: 'Dansfeestje', emoji: '🪕', type: 'toy', effect: { happiness: 45, energy: -20, xp: 40 }, description: 'Zet de safariradio aan en dans samen!' },
  { id: 'tickle_hug', name: 'Knuffelen & Kietelen', emoji: '💖', type: 'toy', effect: { happiness: 30, xp: 20, hearts: 1 }, description: 'Zachte aaitjes en liefde.' },
  { id: 'power_nap', name: 'Knus Dutje Doen', emoji: '🛏️', type: 'sleep', effect: { energy: 50, happiness: 15, xp: 20 }, description: 'Onder het warme dekentje slapen.' },
  { id: 'lullaby', name: 'Slaapliedje Zingen', emoji: '🌙', type: 'sleep', effect: { energy: 75, happiness: 25, xp: 30 }, description: 'Een rustig sterrenliedje voor zoete dromen.' }
];

export const TAMAGOTCHI_HATS = [
  { id: 'none', name: 'Geen Hoed', emoji: '❌' },
  { id: 'crown', name: 'Gouden Kroon', emoji: '👑' },
  { id: 'safari_hat', name: 'Safari Hoed', emoji: '🤠' },
  { id: 'party_hat', name: 'Feestmuts', emoji: '🥳' },
  { id: 'headphones', name: 'Gamer Headset', emoji: '🎧' },
  { id: 'bow', name: 'Roze Strikje', emoji: '🎀' },
  { id: 'glasses', name: 'Slimme Bril', emoji: '👓' },
  { id: 'nightcap', name: 'Slaapmuts', emoji: '🛌' }
];

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
    specialAbility: def.specialAbility,
    hunger: 85,
    happiness: 90,
    energy: 95,
    cleanliness: 90,
    equippedHat: 'none',
    equippedAccessory: 'none'
  };
}
