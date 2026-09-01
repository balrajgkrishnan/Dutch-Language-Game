import { PlayerProfile, UserAccountConfig, ActivityLogItem, SkillMastery, BaselineAssessmentData } from '../types';
import { createInitialCompanion } from '../data/companionData';
import { INITIAL_CUSTOMIZATION } from '../data/wardrobeData';
import { 
  INITIAL_GROWTH_MILESTONES, 
  INITIAL_MONTHLY_SNAPSHOTS_HEMALI, 
  INITIAL_MONTHLY_SNAPSHOTS_RIDHEYA 
} from '../data/assessmentData';

export const USER_ACCOUNTS: Record<string, { password: string; config: UserAccountConfig }> = {
  hemali: {
    password: 'Big2014!',
    config: {
      username: 'Hemali',
      displayName: 'Hemali',
      defaultAvatar: '👧',
      defaultAvatarId: 'lotte',
      defaultTitle: 'De Dierenredder & Hoofdverslaggever',
      defaultGrade: 'group_6_7_8',
      passwordHash: 'Big2014!',
      companionId: 'ollie-owl',
      companionName: 'Professor Ollie Uil',
      companionSpecies: 'Uil',
      companionEmoji: '🦉',
      focusBio: 'Groep 8 • Uitblinker in Wiskunde & Engels • Focus: Spreekvaardigheid, Zelfvertrouwen & Communicatie'
    }
  },
  ridheya: {
    password: 'Small2018!',
    config: {
      username: 'Ridheya',
      displayName: 'Ridheya',
      defaultAvatar: '👩‍🌾',
      defaultAvatarId: 'tess',
      defaultTitle: 'De Vrolijke Boerderijheld & Leesheld',
      defaultGrade: 'group_4_5',
      passwordHash: 'Small2018!',
      companionId: 'max-monkey',
      companionName: 'Max de Lees-Aap',
      companionSpecies: 'Aapje',
      companionEmoji: '🐒',
      focusBio: 'Groep 5 • Sterk in Rekenen & Logisch Denken • Focus: Leesvloeiendheid, Woordenschat & Spelling'
    }
  },
  papa: {
    password: 'Papa2026!',
    config: {
      username: 'Papa',
      displayName: 'Papa',
      defaultAvatar: '👨',
      defaultAvatarId: 'tess',
      defaultTitle: 'Ouder Testaccount',
      defaultGrade: 'group_6_7_8',
      passwordHash: 'Papa2026!',
      companionId: 'ollie-owl',
      companionName: 'Professor Ollie Uil',
      companionSpecies: 'Uil',
      companionEmoji: '🦉',
      focusBio: 'Ouder account voor testen & voortgang bekijken'
    }
  }
};

const ACTIVE_USER_KEY = 'boerin_tess_active_username_v2';

export function getActiveUsername(): string {
  try {
    return localStorage.getItem(ACTIVE_USER_KEY) || 'Hemali';
  } catch {
    return 'Hemali';
  }
}

export function setActiveUsername(username: string): void {
  try {
    localStorage.setItem(ACTIVE_USER_KEY, username);
  } catch {
    // ignore
  }
}

export function getUserStorageKey(username: string): string {
  return `boerin_tess_profile_${username.toLowerCase()}_v2`;
}

export function getInitialMasteryForUser(username: string): SkillMastery {
  const lower = username.toLowerCase();
  if (lower === 'hemali') {
    return {
      vocabulary: 72,
      reading: 78,
      readingFluency: 80,
      readingComprehension: 82,
      listening: 85,
      speaking: 55,
      pronunciation: 68,
      spelling: 88,
      grammar: 84,
      writing: 65,
      mathematics: 95,
      confidence: 55,
      communication: 58
    };
  } else {
    // Ridheya
    return {
      vocabulary: 64,
      reading: 60,
      readingFluency: 58,
      readingComprehension: 74,
      listening: 78,
      speaking: 72,
      pronunciation: 70,
      spelling: 62,
      grammar: 65,
      writing: 60,
      mathematics: 90,
      confidence: 76,
      communication: 75
    };
  }
}

export function getInitialBaselineForUser(username: string): BaselineAssessmentData {
  const lower = username.toLowerCase();
  if (lower === 'hemali') {
    return {
      completed: true,
      completedDate: '2026-06-15',
      readingFluency: 72,
      readingComprehension: 75,
      vocabulary: 65,
      spelling: 82,
      pronunciation: 60,
      listening: 80,
      writing: 58,
      mathematics: 92,
      confidence: 42,
      initialWpm: 88,
      recommendedStartingGrade: 'group_6_7_8'
    };
  } else {
    return {
      completed: true,
      completedDate: '2026-06-15',
      readingFluency: 48,
      readingComprehension: 68,
      vocabulary: 56,
      spelling: 52,
      pronunciation: 65,
      listening: 72,
      writing: 50,
      mathematics: 85,
      confidence: 68,
      initialWpm: 52,
      recommendedStartingGrade: 'group_4_5'
    };
  }
}

export function getDefaultProfileForUser(username: string): PlayerProfile {
  const lower = username.toLowerCase();
  const acc = USER_ACCOUNTS[lower];
  const config = acc ? acc.config : {
    username: username,
    displayName: username,
    defaultAvatar: '👩‍🌾',
    defaultAvatarId: 'tess',
    defaultTitle: 'Avonturier',
    defaultGrade: 'group_4_5' as const,
    passwordHash: '',
    companionId: 'ollie-owl' as const,
    companionName: 'Professor Ollie',
    companionSpecies: 'Uil',
    companionEmoji: '🦉',
    focusBio: 'Safari Leerling'
  };

  const initialCompanion = createInitialCompanion(config.companionId);
  const snapshots = lower === 'hemali' ? INITIAL_MONTHLY_SNAPSHOTS_HEMALI : INITIAL_MONTHLY_SNAPSHOTS_RIDHEYA;

  return {
    name: config.displayName,
    avatarId: config.defaultAvatarId,
    avatarEmoji: config.defaultAvatar,
    avatarTitle: config.defaultTitle,
    hasCustomizedAvatar: true,
    selectedGrade: config.defaultGrade,
    selectedBiome: 'farm',
    score: 50,
    stars: 0,
    coins: 50,
    currentLevelIndex: 0,
    biomeProgress: { farm: 0, safari: 0, sea: 0, snow: 0, jungle: 0, outback: 0, mountain: 0 },
    verbTierIndex: 0,
    streak: 0,
    highestStreak: 0,
    totalCorrect: 0,
    totalAnswered: 0,
    readingMinutes: 28,
    storiesCompleted: 4,
    unlockedAnimals: ['bella-koe'],
    unlockedBadges: [],
    animalHearts: { 'bella-koe': 1 },
    animalFedCount: {},
    verbStats: {},
    activityLogs: [],
    lastActiveTimestamp: Date.now(),
    mastery: getInitialMasteryForUser(username),
    companion: initialCompanion,
    customization: { ...INITIAL_CUSTOMIZATION },
    accessibility: {
      dyslexiaFont: false,
      fontSize: 'normal',
      highContrast: false,
      reducedDistraction: false,
      speechRate: 1.0,
      autoReadText: true
    },
    reviewQueue: [],
    teamScore: 10,

    // Assessment & Growth System fields
    baseline: getInitialBaselineForUser(username),
    monthlySnapshots: [...snapshots],
    fluencySessions: [
      {
        id: `flu_${Date.now() - 500000}`,
        date: '2026-08-16',
        timestamp: Date.now() - 172800000,
        passageTitle: 'De Jonge Zebra bij de Drinkplaats',
        passageText: 'Op een zonnige ochtend rent de kleine zebra vrolijk...',
        durationSeconds: 42,
        wordsRead: 45,
        wpm: lower === 'hemali' ? 98 : 64,
        accuracyPct: 94,
        hesitationsCount: 2,
        audioRecordingUsed: true,
        fluencyScore: lower === 'hemali' ? 88 : 74
      }
    ],
    writingSamples: [
      {
        id: `writ_${Date.now() - 600000}`,
        date: '2026-08-17',
        timestamp: Date.now() - 86400000,
        promptTitle: 'Het Safari Dagboekbericht',
        userText: 'Vandaag hielpen we de gewonde olifant bij het meer. Het water was heel koel en verfrissend.',
        wordCount: 16,
        uniqueWordsCount: 15,
        vocabularyRichnessScore: 82,
        sentenceComplexityScore: 78,
        grammarScore: 90,
        creativityScore: 85,
        structureScore: 88,
        teacherFeedback: 'Prachtige zinsbouw met actieve werkwoorden en sfeerbeschrijving!'
      }
    ],
    milestones: [...INITIAL_GROWTH_MILESTONES],
    masteredWords: ['savanne', 'acaciaboom', 'territorium', 'kudde', 'nachtdier', 'koudbloedig'],
    wordsNeedingReview: ['onmiddellijk', 'enthousiast', 'herbivoor'],
    spellingMistakePatterns: {
      'dubbelzetters': 2,
      'kofschip_dt': 1,
      'langermaakregel': 2
    },
    seenQuestionIds: [],
    questionHistory: {},
    confidenceMetrics: {
      speakingMissionsCount: lower === 'hemali' ? 6 : 4,
      voluntaryExplanationsCount: lower === 'hemali' ? 8 : 12,
      questionsAskedCount: lower === 'hemali' ? 5 : 9
    }
  };
}

export function loadUserProfile(username: string): PlayerProfile {
  try {
    const raw = localStorage.getItem(getUserStorageKey(username));
    if (raw) {
      const parsed = JSON.parse(raw);
      const def = getDefaultProfileForUser(username);
      return {
        ...def,
        ...parsed,
        mastery: { ...def.mastery, ...(parsed.mastery || {}) },
        companion: { ...def.companion, ...(parsed.companion || {}) },
        customization: { ...def.customization, ...(parsed.customization || {}) },
        accessibility: { ...def.accessibility, ...(parsed.accessibility || {}) },
        baseline: { ...def.baseline, ...(parsed.baseline || {}) },
        monthlySnapshots: parsed.monthlySnapshots && parsed.monthlySnapshots.length > 0 ? parsed.monthlySnapshots : def.monthlySnapshots,
        fluencySessions: parsed.fluencySessions || def.fluencySessions,
        writingSamples: parsed.writingSamples || def.writingSamples,
        milestones: parsed.milestones || def.milestones,
        masteredWords: parsed.masteredWords || def.masteredWords,
        wordsNeedingReview: parsed.wordsNeedingReview || def.wordsNeedingReview,
        spellingMistakePatterns: parsed.spellingMistakePatterns || def.spellingMistakePatterns,
        seenQuestionIds: parsed.seenQuestionIds || [],
        questionHistory: parsed.questionHistory || {},
        confidenceMetrics: { ...def.confidenceMetrics, ...(parsed.confidenceMetrics || {}) },
        activityLogs: parsed.activityLogs || []
      };
    }
  } catch (e) {
    console.error('Failed to load profile for user:', username, e);
  }
  return getDefaultProfileForUser(username);
}

export function saveUserProfile(username: string, profile: PlayerProfile): void {
  try {
    profile.lastActiveTimestamp = Date.now();
    localStorage.setItem(getUserStorageKey(username), JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save profile for user:', username, e);
  }
}

export function verifyLogin(
  username: string,
  passwordAttempt: string
): { success: boolean; username?: string; error?: string } {
  const lower = username.toLowerCase();
  const acc = USER_ACCOUNTS[lower];
  if (!acc) {
    return { success: false, error: 'Onbekende speler. Kies Hemali, Ridheya of Papa.' };
  }

  if (acc.password !== passwordAttempt) {
    return { success: false, error: 'Onjuist wachtwoord. Probeer het opnieuw!' };
  }

  return { success: true, username: acc.config.displayName };
}

export function addActivityLog(
  profile: PlayerProfile,
  entry: Omit<ActivityLogItem, 'id' | 'timestamp' | 'timeFormatted' | 'dateFormatted' | 'hourKey'>
): PlayerProfile {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();

  const timeFormatted = `${hours}:${minutes}`;
  const dateFormatted = `${day}-${month}-${year}`;
  const hourKey = `${year}-${month}-${day} ${hours}:00`;

  const newLog: ActivityLogItem = {
    id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: Date.now(),
    timeFormatted,
    dateFormatted,
    hourKey,
    ...entry
  };

  const updatedLogs = [newLog, ...(profile.activityLogs || [])].slice(0, 100);

  return {
    ...profile,
    activityLogs: updatedLogs
  };
}

export function getAllUsersProfiles(): Record<string, PlayerProfile> {
  const result: Record<string, PlayerProfile> = {};
  Object.keys(USER_ACCOUNTS).forEach(key => {
    const acc = USER_ACCOUNTS[key];
    result[acc.config.displayName] = loadUserProfile(acc.config.displayName);
  });
  return result;
}

export function appendActivityLog(
  profile: PlayerProfile,
  question: string,
  category: string,
  biomeName: string,
  isCorrect: boolean,
  pointsEarned: number
): PlayerProfile {
  return addActivityLog(profile, {
    question,
    category,
    biomeName,
    isCorrect,
    pointsEarned
  });
}
