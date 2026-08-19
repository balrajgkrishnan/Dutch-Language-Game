import { PlayerProfile, UserAccountConfig, ActivityLogItem } from '../types';

export const USER_ACCOUNTS: Record<string, { password: string; config: UserAccountConfig }> = {
  hemali: {
    password: 'Big2014!',
    config: {
      username: 'Hemali',
      displayName: 'Hemali',
      defaultAvatar: '👧',
      defaultAvatarId: 'lotte',
      defaultTitle: 'De Dierenredder',
      defaultGrade: 'group_6_7_8',
      passwordHash: 'Big2014!'
    }
  },
  ridheya: {
    password: 'Small2018!',
    config: {
      username: 'Ridheya',
      displayName: 'Ridheya',
      defaultAvatar: '👩‍🌾',
      defaultAvatarId: 'tess',
      defaultTitle: 'De Vrolijke Boerderijheld',
      defaultGrade: 'group_4_5',
      passwordHash: 'Small2018!'
    }
  }
};

const ACTIVE_USER_KEY = 'boerin_tess_active_username_v1';

export function getActiveUsername(): string {
  try {
    return localStorage.getItem(ACTIVE_USER_KEY) || 'Ridheya';
  } catch {
    return 'Ridheya';
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
  return `boerin_tess_profile_${username.toLowerCase()}_v1`;
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
    passwordHash: ''
  };

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
    currentLevelIndex: 0,
    verbTierIndex: 0,
    streak: 0,
    highestStreak: 0,
    totalCorrect: 0,
    totalAnswered: 0,
    unlockedAnimals: ['bella-koe'],
    unlockedBadges: [],
    animalHearts: { 'bella-koe': 1 },
    animalFedCount: {},
    verbStats: {},
    activityLogs: [],
    lastActiveTimestamp: Date.now()
  };
}

export function loadUserProfile(username: string): PlayerProfile {
  try {
    const raw = localStorage.getItem(getUserStorageKey(username));
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...getDefaultProfileForUser(username),
        ...parsed,
        activityLogs: parsed.activityLogs || []
      };
    }
  } catch {
    // fallback
  }
  return getDefaultProfileForUser(username);
}

export function saveUserProfile(username: string, profile: PlayerProfile): void {
  try {
    localStorage.setItem(getUserStorageKey(username), JSON.stringify(profile));
  } catch {
    // fallback
  }
}

export function verifyLogin(usernameInput: string, passwordInput: string): { success: boolean; username?: string; error?: string } {
  const normalized = usernameInput.trim().toLowerCase();
  const user = USER_ACCOUNTS[normalized];
  if (!user) {
    return { success: false, error: 'Gebruikersnaam onbekend. Kies Hemali of Ridheya.' };
  }
  if (user.password !== passwordInput.trim()) {
    return { success: false, error: 'Onjuist wachtwoord voor dit account.' };
  }
  return { success: true, username: user.config.username };
}

export function appendActivityLog(
  profile: PlayerProfile,
  questionText: string,
  category: string,
  biome: string,
  isCorrect: boolean,
  points: number
): PlayerProfile {
  const now = new Date();
  const timeFormatted = now.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const dateFormatted = now.toLocaleDateString('nl-NL', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const hourKey = `${dateFormatted} ${now.getHours()}:00`;

  const newLog: ActivityLogItem = {
    id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    timestamp: Date.now(),
    timeFormatted,
    dateFormatted,
    hourKey,
    question: questionText,
    category,
    biome,
    isCorrect,
    grade: profile.selectedGrade,
    pointsEarned: points
  };

  const logs = [newLog, ...(profile.activityLogs || [])].slice(0, 200); // keep last 200 logs
  return {
    ...profile,
    activityLogs: logs,
    lastActiveTimestamp: Date.now()
  };
}

export function getAllUsersProfiles(): Record<string, PlayerProfile> {
  const out: Record<string, PlayerProfile> = {};
  Object.keys(USER_ACCOUNTS).forEach(key => {
    const acc = USER_ACCOUNTS[key];
    out[acc.config.username] = loadUserProfile(acc.config.username);
  });
  return out;
}
