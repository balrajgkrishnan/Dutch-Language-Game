export type GradeLevel = 'group_4_5' | 'group_6_7_8';

export type BiomeType = 'farm' | 'safari' | 'sea' | 'snow' | 'jungle' | 'outback' | 'mountain';

export type CompanionPetId = 
  | 'ollie-owl' 
  | 'max-monkey' 
  | 'bowie-puppy' 
  | 'mimi-kitten' 
  | 'coco-parrot' 
  | 'leo-lion' 
  | 'ella-elephant'
  | 'pippa-panda'
  | 'bibi-bunny'
  | 'vossie-fox'
  | 'draco-dragon';

export type PetHomeType = 'treehouse' | 'acacia_grove' | 'savannah_nest' | 'waterfall_cave' | 'safari_camp' | 'jungle_cabin' | 'explorer_lodge' | 'animal_sanctuary';

export interface SkillMastery {
  vocabulary: number; // 0-100%
  reading: number; // 0-100%
  readingFluency: number; // 0-100%
  readingComprehension: number; // 0-100%
  listening: number; // 0-100%
  speaking: number; // 0-100%
  pronunciation: number; // 0-100%
  spelling: number; // 0-100%
  grammar: number; // 0-100%
  writing: number; // 0-100%
  mathematics: number; // 0-100%
  confidence: number; // 0-100%
  communication: number; // 0-100%
}

export interface AssessmentSnapshot {
  id: string;
  date: string; // e.g. "2026-08-19"
  timestamp: number;
  monthLabel: string; // e.g. "Maand 1 (Aug)", "Maand 2 (Sep)"
  readingFluency: number;
  readingComprehension: number;
  vocabulary: number;
  spelling: number;
  pronunciation: number;
  listening: number;
  writing: number;
  mathematics: number;
  confidence: number;
  wpm: number; // words per minute
  accuracyPct: number;
  notes?: string;
  weakAreas?: string[];
  strongAreas?: string[];
}

export interface BaselineAssessmentData {
  completed: boolean;
  completedDate?: string;
  readingFluency: number;
  readingComprehension: number;
  vocabulary: number;
  spelling: number;
  pronunciation: number;
  listening: number;
  writing: number;
  mathematics: number;
  confidence: number;
  initialWpm?: number;
  recommendedStartingGrade?: GradeLevel;
}

export interface FluencySession {
  id: string;
  date: string;
  timestamp: number;
  passageTitle: string;
  passageText: string;
  durationSeconds: number;
  wordsRead: number;
  wpm: number;
  accuracyPct: number;
  hesitationsCount: number;
  audioRecordingUsed: boolean;
  fluencyScore: number; // 0-100
}

export interface WritingSample {
  id: string;
  date: string;
  timestamp: number;
  promptTitle: string;
  userText: string;
  wordCount: number;
  uniqueWordsCount: number;
  vocabularyRichnessScore: number; // 0-100
  sentenceComplexityScore: number; // 0-100
  grammarScore: number; // 0-100
  creativityScore: number; // 0-100
  structureScore: number; // 0-100
  teacherFeedback: string;
}

export interface GrowthMilestone {
  id: string;
  title: string;
  skill: keyof SkillMastery;
  requiredGrowthPct: number; // e.g. +10, +15, +20
  description: string;
  emoji: string;
  unlocked: boolean;
  unlockedDate?: string;
}

export interface PetCompanionState {
  id: CompanionPetId;
  name: string;
  species: string;
  emoji: string;
  level: number; // 1-7 (Baby to Grand Scholar)
  stage?: string;
  xp: number;
  maxXp: number;
  friendshipHearts: number; // 1-5
  mood?: 'super_happy' | 'proud' | 'curious' | 'encouraging' | 'sleepy' | 'hungry' | 'playful';
  specialAbility: string;
  home: PetHomeType;
  unlockedAccessories?: string[];
  unlockedHomeDecorations?: string[];
  customAccessories?: string[];
  personality?: string;
  // Tamagotchi Care Vitals (0 - 100)
  hunger?: number; // 100 = full
  happiness?: number; // 100 = joyful
  energy?: number; // 100 = rested
  cleanliness?: number; // 100 = sparkling clean
  equippedHat?: string;
  equippedAccessory?: string;
  customColor?: string;
}

export interface ExplorerCustomization {
  hairStyle: string;
  hairColor: string;
  hat: string;
  outfit: string;
  backpack: string;
  glasses: string;
  boots: string;
  badgePin: string;
  unlockedItems: string[];
}


export interface SpellingFactoryItem {
  id: string;
  word: string;
  syllables: string[];
  missingIndex: number;
  options: string[];
  soundRule: string;
  exampleSentence: string;
  category?: 'dubbelzetter' | 'klinkerdief' | 'langermaak' | 'luchtwoord' | 't-kofschip' | 'ij-ei-au-ou' | 'achtervoegsel' | 'samengesteld' | 'all';
  categoryLabel?: string;
  difficulty?: 'groep3-4' | 'groep5-6' | 'groep7-8';
  emoji?: string;
}

export interface Question {
  id: string;
  type: 'choice' | 'spell' | 'fill' | 'word_type' | 'sequence' | 'pronounce' | 'comprehension' | 'fluency';
  category: string; // e.g. "Woordenschat", "Begrijpend Lezen", "Spelling - Dubbelzetters", "Spreekvaardigheid"
  categoryIcon?: string;
  question: string;
  contextSentence?: string; // rich sentence context for reading fluency
  shortStory?: string;
  passage?: string;
  options?: string[]; // for choice / comprehension
  correctOptionIndex?: number; // for choice / comprehension
  targetWord?: string; // for spell / pronounce
  syllables?: string[]; // e.g. ["ont", "dek", "ken"]
  scrambledLetters?: string[]; // for spell
  wordTypeOptions?: { text: string; isCorrect: boolean }[]; // for word_type
  sequenceItems?: { id: string; text: string; order: number }[];
  hint?: string;
  explanation?: string;
  gradeBadge?: string; // e.g. "Groep 4-5", "Groep 6-7-8", "Begrijpend Lezen"
}

export interface VerbItem {
  infinitief: string;
  english: string;
  imperfectum_ev: string;
  imperfectum_mv: string;
  perfectum: string;
  hulpwerkwoord: string; // "heeft" | "is" | "heeft/is"
  notes?: string;
  tier: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  accept_alt?: {
    imperfectum_ev?: string[];
    imperfectum_mv?: string[];
    perfectum?: string[];
  };
  frequency?: number;
  school_priority?: boolean;
  example?: {
    nl: string;
    en: string;
  };
}

export interface Animal {
  id: string;
  name: string;
  title: string;
  emoji: string;
  biome?: BiomeType;
  color: string;
  bgGradient: string;
  soundName: string;
  funFact: string;
  favoriteFood: string;
  favoriteFoodEmoji: string;
  unlocked: boolean;
  hearts: number;
  levelRequired: number;
  personality?: string;
  habitatName?: string;
}

export interface ZoneRewardAnimal {
  id: string;
  name: string;
  title: string;
  emoji: string;
}

export interface BiomeInfo {
  id: BiomeType;
  name: string;
  dutchTitle: string;
  subtitle: string;
  emoji: string;
  themeColor: string;
  bgGradient: string;
  totalAnimals?: number;
  badgeId?: string;
  unlockedByDefault?: boolean;
  cardBg?: string;
  particleEmoji?: string | string[];
  accentColor?: string;
  description?: string;
  storyIntro?: string;
}

export interface LevelConfig {
  id: number;
  title?: string;
  name?: string;
  theme?: string;
  themeColor?: string;
  bannerEmoji?: string;
  chapterTitle?: string;
  introStory: string;
  biome?: BiomeType;
  questions: Question[];
  animalReward: Animal;
  requiredStars?: number;
}

export type Level = LevelConfig;

export interface Badge {
  id: string;
  name: string;
  description: string;
  emoji: string;
  unlocked: boolean;
  condition: string;
  category: 'spelling' | 'streaks' | 'safari' | 'feeding' | 'verbs' | 'biomes' | 'speaking' | 'reading' | 'team';
}

export interface FemaleAvatar {
  id: string;
  name: string;
  emoji: string;
  title: string;
  description: string;
  badgeBg: string;
}

export interface ActivityLogItem {
  id: string;
  timestamp: number;
  timeFormatted: string; // e.g. "14:23"
  dateFormatted: string; // e.g. "18-08-2026"
  hourKey: string; // e.g. "2026-08-18 14:00"
  question: string;
  category: string;
  biome?: string;
  biomeName?: string;
  isCorrect: boolean;
  grade?: GradeLevel;
  pointsEarned: number;
  skillType?: keyof SkillMastery;
  spokenText?: string;
}

export interface TestResult {
  id: string;
  gameType: 'spelling' | 'werkwoorden';
  grade: GradeLevel;
  dateFormatted: string; // e.g. "18-08-2026"
  timestamp: number;
  correct: number;
  total: number;
  percentage: number;
}

export interface AccessibilitySettings {
  dyslexiaFont: boolean;
  fontSize: 'normal' | 'large' | 'xlarge';
  highContrast: boolean;
  reducedDistraction: boolean;
  speechRate: number; // 0.75, 1.0, 1.25
  autoReadText: boolean;
}

export interface PlayerProfile {
  name: string;
  avatarId?: string;
  avatarEmoji?: string;
  avatarTitle?: string;
  hasCustomizedAvatar?: boolean;
  selectedGrade: GradeLevel;
  selectedBiome?: BiomeType;
  score: number;
  stars: number;
  coins: number;
  currentLevelIndex: number;
  biomeProgress?: Record<string, number>;
  verbTierIndex: number;
  streak: number;
  highestStreak: number;
  totalCorrect: number;
  totalAnswered: number;
  readingMinutes: number;
  storiesCompleted: number;
  unlockedAnimals: string[];
  unlockedBadges: string[];
  animalHearts: Record<string, number>;
  animalFedCount: Record<string, number>;
  verbStats: Record<string, { correct: number; wrong: number }>;
  activityLogs?: ActivityLogItem[];
  lastActiveTimestamp?: number;
  testAttempts?: TestResult[];

  // New Adaptive & Child-Centric Features
  mastery: SkillMastery;
  companion: PetCompanionState;
  customization: ExplorerCustomization;
  accessibility: AccessibilitySettings;
  reviewQueue: string[]; // List of concept/question IDs requiring review
  teamScore?: number;

  // Assessment & Long-Term Growth Tracking
  baseline: BaselineAssessmentData;
  monthlySnapshots: AssessmentSnapshot[];
  fluencySessions: FluencySession[];
  writingSamples: WritingSample[];
  milestones: GrowthMilestone[];
  masteredWords: string[];
  wordsNeedingReview: string[];
  spellingMistakePatterns: Record<string, number>; // e.g. { "dubbelzetters": 3, "kofschip_dt": 2 }
  seenQuestionIds?: string[]; // IDs of questions already encountered across sessions to prioritize new questions
  questionHistory?: Record<string, { count: number; lastSeen: number; wasCorrect?: boolean }>;
  confidenceMetrics: {
    speakingMissionsCount: number;
    voluntaryExplanationsCount: number;
    questionsAskedCount: number;
  };
}

export interface UserAccountConfig {
  username: string;
  displayName: string;
  defaultAvatar: string;
  defaultAvatarId: string;
  defaultTitle: string;
  defaultGrade: GradeLevel;
  passwordHash: string;
  companionId: CompanionPetId;
  companionName: string;
  companionSpecies: string;
  companionEmoji: string;
  focusBio: string;
}

