export type QuestionType = 'choice' | 'spell' | 'word_type' | 'comprehension';

export type GradeLevel = 'group_4_5' | 'group_6_7_8';

export type BiomeType = 'farm' | 'safari' | 'sea' | 'snow' | 'jungle' | 'outback' | 'mountain';

export interface Question {
  id: string;
  category: string;
  categoryIcon: string;
  shortStory?: string;
  passage?: string; // Rich reading comprehension story or informational text
  question: string;
  type: QuestionType;
  options?: string[]; // for choice / comprehension
  correctOptionIndex?: number; // for choice / comprehension
  targetWord?: string; // for spell
  scrambledLetters?: string[]; // for spell
  wordTypeOptions?: { text: string; isCorrect: boolean }[]; // for word_type
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

export interface BiomeInfo {
  id: BiomeType;
  name: string;
  dutchTitle: string;
  subtitle: string;
  emoji: string;
  themeColor: string;
  bgGradient: string;
  cardBg: string;
  accentColor: string;
  particleEmoji: string[];
  description: string;
  storyIntro: string;
}

export interface Level {
  id: number;
  name: string;
  biome?: BiomeType;
  theme: string;
  themeColor: string;
  bannerEmoji: string;
  introStory: string;
  chapterTitle?: string;
  animalReward: Animal;
  questions: Question[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  emoji: string;
  unlocked: boolean;
  condition: string;
  category: 'spelling' | 'streaks' | 'safari' | 'feeding' | 'verbs' | 'biomes';
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
  biome: string;
  isCorrect: boolean;
  grade: GradeLevel;
  pointsEarned: number;
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
  currentLevelIndex: number;
  verbTierIndex: number;
  streak: number;
  highestStreak: number;
  totalCorrect: number;
  totalAnswered: number;
  unlockedAnimals: string[];
  unlockedBadges: string[];
  animalHearts: Record<string, number>;
  animalFedCount: Record<string, number>;
  verbStats: Record<string, { correct: number; wrong: number }>;
  activityLogs?: ActivityLogItem[];
  lastActiveTimestamp?: number;
}

export interface UserAccountConfig {
  username: string;
  displayName: string;
  defaultAvatar: string;
  defaultAvatarId: string;
  defaultTitle: string;
  defaultGrade: GradeLevel;
  passwordHash: string;
}
