import { Building } from '../types';

// Nederlands Wereld -- open-world sandbox pilot. Bakery is the only fully
// built building; vet-clinic and shop are locked stubs establishing the
// hub's "choose a building" pattern for later expansion.

const BAKERY: Building = {
  id: 'bakery',
  name: 'De Bakkerij',
  emoji: '🥖',
  backgroundImageUrl: '/nederlands-wereld/bakery-background.png',
  unlocked: true,
  items: [
    {
      id: 'deeg',
      emoji: '🫓',
      imageUrl: '/nederlands-wereld/deeg.png',
      vocab: { word: 'deeg', article: 'het', english: 'dough' },
      position: { x: 20, y: 55 },
      draggable: true,
      transformsInto: 'brood'
    },
    {
      id: 'brood',
      emoji: '🍞',
      imageUrl: '/nederlands-wereld/brood.png',
      vocab: { word: 'brood', article: 'het', english: 'bread' },
      position: { x: 20, y: 55 },
      draggable: true,
      hiddenUntilTransformed: true
    },
    {
      id: 'bloem',
      emoji: '🌾',
      imageUrl: '/nederlands-wereld/bloem.png',
      vocab: { word: 'bloem', article: 'de', english: 'flour' },
      position: { x: 35, y: 60 },
      draggable: true
    },
    {
      id: 'boter',
      emoji: '🧈',
      imageUrl: '/nederlands-wereld/boter.png',
      vocab: { word: 'boter', article: 'de', english: 'butter' },
      position: { x: 45, y: 62 },
      draggable: true
    },
    {
      id: 'melk',
      emoji: '🥛',
      imageUrl: '/nederlands-wereld/melk.png',
      vocab: { word: 'melk', article: 'de', english: 'milk' },
      position: { x: 55, y: 60 },
      draggable: true
    },
    {
      id: 'suiker',
      emoji: '🍬',
      imageUrl: '/nederlands-wereld/suiker.png',
      vocab: { word: 'suiker', article: 'de', english: 'sugar' },
      position: { x: 65, y: 62 },
      draggable: true
    },
    {
      id: 'taart',
      emoji: '🎂',
      imageUrl: '/nederlands-wereld/taart.png',
      vocab: { word: 'taart', article: 'de', english: 'cake' },
      position: { x: 75, y: 58 },
      draggable: true
    },
    {
      id: 'koek',
      emoji: '🍪',
      imageUrl: '/nederlands-wereld/koek.png',
      vocab: { word: 'koek', article: 'de', english: 'cookie' },
      position: { x: 30, y: 40 },
      draggable: true
    },
    {
      id: 'mand',
      emoji: '🧺',
      imageUrl: '/nederlands-wereld/mand.png',
      vocab: { word: 'mand', article: 'de', english: 'basket' },
      position: { x: 60, y: 78 },
      draggable: false,
      dropZoneId: 'mand-zone'
    },
    {
      id: 'zak',
      emoji: '🛍️',
      imageUrl: '/nederlands-wereld/zak.png',
      vocab: { word: 'zak', article: 'de', english: 'bag' },
      position: { x: 12, y: 40 },
      draggable: true
    },
    {
      id: 'lepel',
      emoji: '🥄',
      imageUrl: '/nederlands-wereld/lepel.png',
      vocab: { word: 'lepel', article: 'de', english: 'spoon' },
      position: { x: 48, y: 38 },
      draggable: true
    },
    {
      id: 'oven',
      emoji: '🔥',
      imageUrl: '/nederlands-wereld/oven.png',
      vocab: { word: 'oven', article: 'de', english: 'oven' },
      position: { x: 20, y: 78 },
      draggable: false,
      dropZoneId: 'oven-zone'
    }
  ],
  dropZones: [
    {
      id: 'oven-zone',
      label: 'De Oven',
      position: { x: 12, y: 70, width: 18, height: 18 },
      acceptsItemIds: ['deeg']
    },
    {
      id: 'mand-zone',
      label: 'De Mand',
      position: { x: 52, y: 70, width: 18, height: 18 },
      acceptsItemIds: ['brood', 'koek', 'taart']
    }
  ],
  characters: [
    {
      id: 'customer-bella',
      animalId: 'bella-koe',
      requests: [
        {
          id: 'bella-wil-brood',
          speechNl: 'Ik wil graag een brood.',
          speechEn: 'I would like a bread.',
          requiredItemIds: ['brood'],
          thankYouNl: 'Dank je wel! Heerlijk brood!',
          rewardCoins: 15
        }
      ]
    },
    {
      id: 'customer-wolletje',
      animalId: 'wolletje-schaap',
      requests: [
        {
          id: 'wolletje-wil-koek',
          speechNl: 'Mag ik een lekkere koek?',
          speechEn: 'May I have a tasty cookie?',
          requiredItemIds: ['koek'],
          thankYouNl: 'Mmm, heel lekker! Dank je wel!',
          rewardCoins: 10
        }
      ]
    },
    {
      id: 'customer-flap',
      animalId: 'flap-konijn',
      requests: [
        {
          id: 'flap-wil-taart',
          speechNl: 'Ik hou van taart! Mag ik een stukje?',
          speechEn: 'I love cake! May I have a piece?',
          requiredItemIds: ['taart'],
          thankYouNl: 'Dank je, dit is de lekkerste taart!',
          rewardCoins: 10
        }
      ]
    }
  ],
  quests: [
    {
      id: 'bakery-collect-1',
      type: 'collect',
      promptNl: 'Zoek 3 ingrediënten voor het deeg: bloem, boter en melk!',
      promptEn: 'Find 3 ingredients for the dough: flour, butter and milk!',
      requiredItemIds: ['bloem', 'boter', 'melk'],
      rewardCoins: 15,
      rewardStars: 1
    },
    {
      id: 'bakery-place-1',
      type: 'place',
      promptNl: 'Zet het brood en de koek in de mand!',
      promptEn: 'Put the bread and the cookie in the basket!',
      requiredItemIds: ['brood', 'koek'],
      rewardCoins: 20,
      rewardStars: 1
    },
    {
      id: 'bakery-serve-1',
      type: 'serve',
      promptNl: 'Help de klanten met hun bestelling!',
      promptEn: "Help the customers with their order!",
      requiredItemIds: ['bella-wil-brood'],
      rewardCoins: 15,
      rewardStars: 1
    },
    {
      id: 'bakery-discover-1',
      type: 'discover',
      promptNl: 'Ontdek 5 nieuwe Nederlandse woorden in de bakkerij!',
      promptEn: 'Discover 5 new Dutch words in the bakery!',
      // 'deeg' is deliberately excluded: it disappears from the scene once
      // baked into 'brood' (transformsInto), so requiring a tap on it could
      // become permanently unwinnable if the player bakes before tapping it.
      // 'brood' stays visible/tappable indefinitely (even once placed).
      requiredItemIds: ['brood', 'bloem', 'boter', 'melk', 'suiker'],
      rewardCoins: 10,
      rewardStars: 1
    }
  ],
  ambientPhrases: [
    { nl: 'Welkom bij de bakkerij!', en: 'Welcome to the bakery!' },
    { nl: 'Vers brood, net uit de oven!', en: 'Fresh bread, straight from the oven!' },
    { nl: 'Wat wil je vandaag kopen?', en: 'What would you like to buy today?' },
    { nl: 'Mmm, ruik je die lekkere geur?', en: 'Mmm, do you smell that lovely scent?' }
  ]
};

const VET_CLINIC: Building = {
  id: 'vet-clinic',
  name: 'De Dierenkliniek',
  emoji: '🩺',
  unlocked: false,
  unlockHint: 'Voltooi 3 opdrachten om te ontgrendelen.',
  items: [],
  dropZones: [],
  characters: [],
  quests: [],
  ambientPhrases: []
};

const SHOP: Building = {
  id: 'shop',
  name: 'De Winkel',
  emoji: '🛒',
  unlocked: false,
  unlockHint: 'Voltooi 5 opdrachten om te ontgrendelen.',
  items: [],
  dropZones: [],
  characters: [],
  quests: [],
  ambientPhrases: []
};

export const NEDERLANDS_WERELD_BUILDINGS: Building[] = [BAKERY, VET_CLINIC, SHOP];
