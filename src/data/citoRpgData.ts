import { TWENTY_CITO_PLACEMENT_QUESTIONS, PlacementQuestion } from './citoQuestions';
import { RIDHEYA_12_PAGES_CAMPAIGN } from './campaignRidheya';
import { HEMALI_12_PAGES_CAMPAIGN } from './campaignHemali';
import { SISTERS_12_PAGES_CAMPAIGN } from './campaignSisters';
import { RIDHEYA_CORAL_REEF_CAMPAIGN, RIDHEYA_TREEHOUSE_CLINIC_CAMPAIGN } from './campaignRidheyaNew';
import { HEMALI_CRYSTAL_CAVERN_CAMPAIGN, HEMALI_TIME_LIBRARY_CAMPAIGN } from './campaignHemaliNew';

export type { PlacementQuestion };

export interface ProtagonistProfile {
  id: 'ridheya' | 'hemali';
  name: string;
  ageDesc: string;
  gradeLevel: string;
  aviLevel: string;
  persona: string;
  visuals: string;
  gear: string;
  readingFocus: string[];
  emoji: string;
  currentMission: string;
}

export const PROTAGONISTS: Record<'ridheya' | 'hemali', ProtagonistProfile> = {
  ridheya: {
    id: 'ridheya',
    name: 'Ridheya',
    ageDesc: 'Jongere zus (Groep 3–4 / Dierenarts in opleiding)',
    gradeLevel: 'Groep 3–4',
    aviLevel: 'AVI M3–E4',
    persona: 'Dappere jonge dierenarts in Maleisië & Borneo, nieuwsgierig, zorgzaam, beschermt gewonde zwerfdieren, vogels en jonge dieren in het oerwoud.',
    visuals: 'Jong meisje met bruin haar, warme bruine ogen en een heldere ronde bril.',
    gear: 'Witte dierenartskit, stethoscoop, verbandgaas-tas, pincet en vergrootglas.',
    readingFocus: ['Korte frequente woorden', 'Eenvoudige voegwoorden (want, maar, zodat, omdat)', 'Woorden ontleden (wonder + zalf)', 'Context raden'],
    emoji: '🩺',
    currentMission: 'De Geheime Dierenvallei van Borneo: red de zonnepapegaai, dwerghoefhertje Pip, zonnebeer Baloe en baby orang-oetan Bintang!'
  },
  hemali: {
    id: 'hemali',
    name: 'Hemali',
    ageDesc: 'Oudere zus (Groep 5–6 / Magische Ontdekkingsreiziger & Cito Prep)',
    gradeLevel: 'Groep 5–6',
    aviLevel: 'AVI M5–E6',
    persona: 'Schrandere ontdekkingsreiziger met teleportatiekracht, spreekt met wijze jungledieren en beschermer van baby giraf Appel en het universum.',
    visuals: 'Ouder meisje met lang steil donker haar, warme bruine ogen en een schrandere glimlach.',
    gear: 'Ontdekkingsreizigersjas, saffieren teleportatie-amulet, tovernotitieboek en gouden ganzenveer.',
    readingFocus: ['Signaalwoorden (daardoor, desondanks, bovendien, echter, mits, tenzij)', 'Verwijswoorden (deze, waarmee, hetgeen)', 'Hoofdgedachte vinden', 'Oorzaak en gevolg'],
    emoji: '✨',
    currentMission: 'Het Verloren Astrolabium van de Tijdwachters: ontcijfer de sterrenkaarten van Mount Kinabalu met wijze olifant Raja en girafje Appel!'
  }
};

export interface InterestQuestion {
  id: string;
  question: string;
  category: string;
  options: {
    text: string;
    themeKey: string;
    icon: string;
  }[];
}

export const INTEREST_QUESTIONS: InterestQuestion[] = [
  {
    id: 'int_1',
    question: 'Welke heldenrol of droomberoep past het allerbeste bij jou in dit verhaal?',
    category: '1. Heldenrol & Beroep',
    options: [
      { text: 'Dierenarts in opleiding: met stethoscoop en kruidentas gewonde dieren redden in het woud (zoals Ridheya)', themeKey: 'malaysia_vet', icon: '🩺' },
      { text: 'Magische Ontdekkingsreiziger: teleporteren, praten met olifanten en sterrenastrolabia herstellen (zoals Hemali)', themeKey: 'jungle_magic', icon: '✨' },
      { text: 'Koninklijke Safaribeschermer: samen met je zus een zwevend natuurparadijs behoeden voor gevaar', themeKey: 'sisters_safari', icon: '👑' },
      { text: 'Natuurwetenschapper: op een historisch onderzoeksschip zeldzame fauna bestuderen', themeKey: 'ship', icon: '🚢' }
    ]
  },
  {
    id: 'int_2',
    question: 'Op welke avontuurlijke locatie wil jij jouw verhaal laten afspelen?',
    category: '2. Locatie & Wereld',
    options: [
      { text: 'De geheime dierenvallei en banyanbossen van Borneo 🇲🇾 (tussen lotusbronnen en rivieren)', themeKey: 'city_malaysia', icon: '🏞️' },
      { text: 'Het zwevende sterrenobservatorium van Mount Kinabalu 🌌 (tussen marmeren pilaren en kometen)', themeKey: 'night_jungle', icon: '✨' },
      { text: 'Het Drijvende Nevelkasteel met kristallen koepels en botanische serres 🏰', themeKey: 'savanna_coast', icon: '🌊' },
      { text: 'De lichtgevende gloeiwormengrot van Kinabatangan 🪱', themeKey: 'temple_ruins', icon: '🕯️' }
    ]
  },
  {
    id: 'int_3',
    question: 'Welk dier in nood wil jij als eerste eerste hulp verlenen en verzorgen?',
    category: '3. Dieren Eerste Hulp',
    options: [
      { text: 'Kopi de geadopteerde zwerfhond en de gouden zonnepapegaai verzorgen met wonderzalf', themeKey: 'stray_dog_kopi', icon: '🐕' },
      { text: 'Pip het zilveren dwerghoefhertje bevrijden uit de banyanboomwortels', themeKey: 'kingfisher_stone', icon: '🦌' },
      { text: 'Baby orang-oetan Bintang verlossen van een pijnlijke splinter in zijn duimpje', themeKey: 'zombie_monkey', icon: '🦧' },
      { text: 'Leeuwenwelp Simba en wolkenpantertje Nube redden uit de wilde stroomversnelling', themeKey: 'lion_cub', icon: '🦁' }
    ]
  },
  {
    id: 'int_4',
    question: 'Welke bijzondere magische gave of uitrusting wil jij gebruiken tijdens je tocht?',
    category: '4. Krachten & Gereedschap',
    options: [
      { text: 'Magische teleportatie met een saffieren amulet om in een flits door de ruimte te springen', themeKey: 'teleportation', icon: '✨' },
      { text: 'Een rode dierenartstas met stethoscoop, verbandgaas, spalkjes en natuurlijke wonderzalf', themeKey: 'vet_toolkit', icon: '🩺' },
      { text: 'De Gouden Schrijverscalamus en expeditieboek om Cito logica en signaalwoorden te ontcijferen', themeKey: 'detective_book', icon: '📖' },
      { text: 'Een hydro-magnetisch kristal en veilige ankerlijn om stroomversnellingen te bedwingen', themeKey: 'magic_compass', icon: '🧭' }
    ]
  },
  {
    id: 'int_5',
    question: 'Met welk trouw dierenvriendje wil jij vriendschap sluiten en adopteren?',
    category: '5. Dieren Vriend & Adoptie',
    options: [
      { text: 'Een schattig babygirafje genaamd Appel met ronde appelvlekjes adopteren en voeden', themeKey: 'baby_giraffe_apple', icon: '🦒' },
      { text: 'De wijze sprekende olifant Raja die met een diepe telepathische stem eeuwenoude kennis deelt', themeKey: 'talking_elephant_raja', icon: '🐘' },
      { text: 'Kopi de trouwe straathond en Pip het dwerghoefhertje die overal met je meehuppelen', themeKey: 'adopted_kopi', icon: '🐕' },
      { text: 'Zonnebeer Baloe die dol is op wilde honing en knuffels', themeKey: 'guide_monkey_zazu', icon: '🐻' }
    ]
  },
  {
    id: 'int_6',
    question: 'Hoe werk jij het allerliefst samen om moeilijke situaties en raadsels op te lossen?',
    category: '6. Vrienden & Samenwerking',
    options: [
      { text: 'Team Maleisië: samenwerken met fietskoerier Amir (met bakfiets) en botanist Mei-Ling', themeKey: 'team_malaysia_friends', icon: '🚲' },
      { text: 'Het Zussen Verbond: observatie (Ridheya) en logica (Hemali) combineren als onverslaanbaar team', themeKey: 'sisters_team', icon: '👑' },
      { text: 'Praten met dieren: telepathisch luisteren naar wijze jungledieren om de harmonie te herstellen', themeKey: 'talking_animals', icon: '🌿' },
      { text: 'Cito Wetenschappelijke Logica: signaalwoorden van oorzaak, gevolg, voorwaarde en tegenstelling kraken', themeKey: 'cito_logic', icon: '🧠' }
    ]
  }
];

export const PLACEMENT_QUESTIONS: PlacementQuestion[] = TWENTY_CITO_PLACEMENT_QUESTIONS;

export interface RpgPage {
  pageNumber: number;
  title: string;
  biome: string;
  storyText: string;
  targetWords: {
    word: string;
    breakdown?: string;
    dutchMeaning: string;
    englishMeaning: string;
  }[];
  mysteryQuestion?: {
    clueTitle: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  choices: {
    label: string;
    nextPage: number;
    skillBonus: string;
    icon: string;
  }[];
}

export interface StoryCampaign {
  id: string;
  protagonistId: 'ridheya' | 'hemali' | 'both';
  title: string;
  subtitle: string;
  location: string;
  badge: string;
  themeEmoji: string;
  recommendedGrade: string;
  pages: RpgPage[];
}

export const RIDHEYA_MALAYSIA_PAGES: RpgPage[] = RIDHEYA_12_PAGES_CAMPAIGN;
export const HEMALI_JUNGLE_PAGES: RpgPage[] = HEMALI_12_PAGES_CAMPAIGN;
export const SISTERS_SAFARI_PAGES: RpgPage[] = SISTERS_12_PAGES_CAMPAIGN;

// All campaigns bundled for the campaign selector
export const STORY_CAMPAIGNS: StoryCampaign[] = [
  {
    id: 'ridheya_malaysia',
    protagonistId: 'ridheya',
    title: 'Ridheya en de Geheime Dierenvallei van Borneo',
    subtitle: '12-Delige Medische Reddingsqueeste (Papegaai, Pip & Bintang)',
    location: 'Borneo & Regenwouden van Maleisië 🇲🇾',
    badge: 'Groep 3–4 (AVI M3-E4)',
    themeEmoji: '🩺',
    recommendedGrade: 'Groep 3–4 (12 Hoofdstukken)',
    pages: RIDHEYA_12_PAGES_CAMPAIGN
  },
  {
    id: 'ridheya_coral_reef',
    protagonistId: 'ridheya',
    title: 'Ridheya en het Gevaar in het Koraalrif',
    subtitle: 'Onderwater Eerste Hulp Queeste (Zeeschildpad Sam & Baby Dolfijn)',
    location: 'Pulau Tioman & Koninginnenrif 🪸',
    badge: 'Groep 3–4 (AVI M3-E4)',
    themeEmoji: '🐢',
    recommendedGrade: 'Groep 3–4 (Nieuwe Missie)',
    pages: RIDHEYA_CORAL_REEF_CAMPAIGN
  },
  {
    id: 'ridheya_treehouse',
    protagonistId: 'ridheya',
    title: 'Ridheya’s Geheime Boomhutkliniek in de Jungle',
    subtitle: 'Regenwoud Patiëntenzorg (Pipit de Vleermuis & Nevelpanter)',
    location: 'Taman Negara Banyanbos 🌳',
    badge: 'Groep 3–4 (AVI M3-E4)',
    themeEmoji: '🛖',
    recommendedGrade: 'Groep 3–4 (Nieuwe Missie)',
    pages: RIDHEYA_TREEHOUSE_CLINIC_CAMPAIGN
  },
  {
    id: 'hemali_jungle',
    protagonistId: 'hemali',
    title: 'Hemali en het Verloren Astrolabium van de Tijdwachters',
    subtitle: '12-Delige Kosmische Cito Queeste (Raja, Appel & Sterrenwijzer)',
    location: 'Mount Kinabalu Hemelobservatorium 🌌',
    badge: 'Groep 5–6 (Doorstroomtoets Prep)',
    themeEmoji: '✨',
    recommendedGrade: 'Groep 5–6 (12 Hoofdstukken)',
    pages: HEMALI_12_PAGES_CAMPAIGN
  },
  {
    id: 'hemali_crystal_cavern',
    protagonistId: 'hemali',
    title: 'Hemali en de Fluisterende Kristalgrotten van Mulu',
    subtitle: 'Cito Resonantie- en Logicaqueeste (Smaragden Wijsheidssleutel)',
    location: 'Mulu Grottenstelsel van Sarawak 💎',
    badge: 'Groep 5–6 (Doorstroomtoets Prep)',
    themeEmoji: '💎',
    recommendedGrade: 'Groep 5–6 (Nieuwe Missie)',
    pages: HEMALI_CRYSTAL_CAVERN_CAMPAIGN
  },
  {
    id: 'hemali_time_library',
    protagonistId: 'hemali',
    title: 'Hemali en de Oneindige Tijdsbibliotheek van Chronos',
    subtitle: 'Syntaxis & Verwijswoorden Meesterproef (Diadeem der Wijsheid)',
    location: 'Tijdsbibliotheek van Chronos ⏳',
    badge: 'Groep 5–6 (Doorstroomtoets Prep)',
    themeEmoji: '⏳',
    recommendedGrade: 'Groep 5–6 (Nieuwe Missie)',
    pages: HEMALI_TIME_LIBRARY_CAMPAIGN
  },
  {
    id: 'sisters_safari',
    protagonistId: 'both',
    title: 'Hemali & Ridheya: Het Raadsel van het Drijvende Nevelkasteel',
    subtitle: '12-Delige Gezamenlijke Zussen Expeditie (Simba & Nube)',
    location: 'Drijvend Nevelkasteel & Kristalbaai 🏰',
    badge: 'Zussen Samen (Groep 3–6)',
    themeEmoji: '👑',
    recommendedGrade: 'Alle Groepen (12 Hoofdstukken)',
    pages: SISTERS_12_PAGES_CAMPAIGN
  }
];

// Default backwards compatibility
export const RPG_STORY_CHAPTERS: RpgPage[] = RIDHEYA_12_PAGES_CAMPAIGN;
