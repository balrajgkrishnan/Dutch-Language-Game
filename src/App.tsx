import React, { useState, useEffect } from 'react';
import { TopBar } from './components/TopBar';
import { QuizCard } from './components/QuizCard';
import { VerbQuizCard } from './components/VerbQuizCard';
import { AnimalSanctuary } from './components/AnimalSanctuary';
import { BadgeShowcase } from './components/BadgeShowcase';
import { LevelRoadmap } from './components/LevelRoadmap';
import { RewardModal } from './components/RewardModal';
import { VerbZoneMapPanel } from './components/VerbZoneMapPanel';
import { ZoneRewardModal } from './components/ZoneRewardModal';
import { GradeSelectorModal } from './components/GradeSelectorModal';
import { ProfileAvatarModal } from './components/ProfileAvatarModal';
import { LoginModal } from './components/LoginModal';
import { EnhancedParentDashboardModal } from './components/EnhancedParentDashboardModal';
import { RidheyaSpellingFactoryModal } from './components/RidheyaSpellingFactoryModal';
import { TestModeSelectorModal } from './components/TestModeSelectorModal';
import { SpellingTestModal } from './components/SpellingTestModal';
import { SterkeWerkwoordenTestModal } from './components/SterkeWerkwoordenTestModal';
import { TocaWardrobeStudioModal } from './components/TocaWardrobeStudioModal';
import { TamagotchiPetRoomModal } from './components/TamagotchiPetRoomModal';
import { VersionFlashModal } from './components/VersionFlashModal';
import { CitoRpgExamModal } from './components/CitoRpgExamModal';
import { WerkwoordBossArenaModal } from './components/WerkwoordBossArenaModal';
import { VoiceSettingsModal } from './components/VoiceSettingsModal';
import { DutchDictionaryModal } from './components/DutchDictionaryModal';
import { DutchArcadeArenaModal } from './components/DutchArcadeArenaModal';
import { BiomeSelector } from './components/BiomeSelector';
import { AmbientParticles } from './components/AmbientParticles';
import { BentoTile } from './components/BentoTile';
import { buildHomeTiles, HOME_TILE_GROUP_LABELS, HomeTileGroup } from './data/homeTiles';
import { INITIAL_BADGES } from './data/gameData';
import { BIOMES, ALL_BIOME_ANIMALS } from './data/biomeData';
import { BIOME_LEVELS_GROEP_4_5 } from './data/biomeLevels45';
import { BIOME_LEVELS_GROEP_6_8 } from './data/biomeLevels68';
import { WERKWOORDEN_DATA } from './data/werkwoorden';
import { getVerbsInZone, getZoneMeta, getZoneProgress, isZoneComplete, pickNextVerbInZone } from './data/verbZones';
import { getEffectiveGrade } from './utils/gradeTier';
import { Animal, Badge, PlayerProfile, GradeLevel, VerbItem, BiomeType, AccessibilitySettings } from './types';
import { sound } from './services/soundService';
import { 
  getActiveUsername, 
  setActiveUsername, 
  loadUserProfile, 
  saveUserProfile, 
  addActivityLog 
} from './services/authService';
import { 
  Map, RotateCcw, Sparkles, Zap, BookOpen, Compass, Download, 
  User, BarChart3, Users, Swords, Flame, Heart, Shield, Trophy, 
  FileText, ArrowRight, Play, CheckCircle2 
} from 'lucide-react';

// Picks the next item to show: the first not-yet-seen item in stable order,
// or (once everything has been seen at least once) cycles through the full
// list by index. Never indexes into a list that reorders itself between
// calls — that's what let some items go permanently unseen while others
// repeated indefinitely (a real bug: see git history for details).
function pickNextItem<T>(items: T[], seenKeys: Set<string>, keyOf: (item: T) => string, cycleIndex: number): T | undefined {
  const nextUnseen = items.find(item => !seenKeys.has(keyOf(item)));
  if (nextUnseen !== undefined) return nextUnseen;
  return items.length > 0 ? items[cycleIndex % items.length] : undefined;
}

export default function App() {
  // Current active user (Hemali or Ridheya)
  const [currentUsername, setCurrentUsername] = useState<string>(() => getActiveUsername());

  // Player Profile State loaded for active user
  const [profile, setProfile] = useState<PlayerProfile>(() => {
    return loadUserProfile(currentUsername);
  });

  const [selectedBiome, setSelectedBiome] = useState<BiomeType>(profile.selectedBiome || 'farm');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentVerbIndex, setCurrentVerbIndex] = useState(0);
  const [groep68Mode, setGroep68Mode] = useState<'expedition' | 'verb_arena'>('expedition');
  const [selectedVerbTier, setSelectedVerbTier] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [selectedVerbZone, setSelectedVerbZone] = useState<number>(0);
  const [showZoneRewardModal, setShowZoneRewardModal] = useState(false);
  const [justCompletedZoneIndex, setJustCompletedZoneIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'adventure' | 'arcade' | 'sanctuary' | 'badges' | 'map'>('adventure');
  const [isExpeditionActive, setIsExpeditionActive] = useState(false);
  
  // Modals state
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [showGradeModal, setShowGradeModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showScoreboardModal, setShowScoreboardModal] = useState(false);
  
  // New Adaptive Modals state
  const [showSpellingFactoryModal, setShowSpellingFactoryModal] = useState(false);
  const [showWardrobeModal, setShowWardrobeModal] = useState(false);
  const [showVersionModal, setShowVersionModal] = useState(false);
  const [showTamagotchiModal, setShowTamagotchiModal] = useState(false);
  const [showCitoRpgModal, setShowCitoRpgModal] = useState(false);
  const [showBossArenaModal, setShowBossArenaModal] = useState(false);
  const [showTestSelectorModal, setShowTestSelectorModal] = useState(false);
  const [showSpellingTestModal, setShowSpellingTestModal] = useState(false);
  const [showWerkwoordenTestModal, setShowWerkwoordenTestModal] = useState(false);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [showDictionaryModal, setShowDictionaryModal] = useState(false);
  const [showArcadeModal, setShowArcadeModal] = useState(false);

  const [justUnlockedAnimal, setJustUnlockedAnimal] = useState<Animal>(ALL_BIOME_ANIMALS[0]);
  const [justUnlockedBadges, setJustUnlockedBadges] = useState<Badge[]>([]);

  // Save to per-user localStorage whenever profile or biome changes
  useEffect(() => {
    saveUserProfile(currentUsername, { ...profile, selectedBiome });
  }, [profile, selectedBiome, currentUsername]);

  // Handle switching user profile (Hemali / Ridheya)
  const handleSwitchUser = (newUsername: string) => {
    // Save current user first
    saveUserProfile(currentUsername, { ...profile, selectedBiome });
    
    // Switch to new user
    setActiveUsername(newUsername);
    setCurrentUsername(newUsername);
    const loaded = loadUserProfile(newUsername);
    const isNewRidheya = newUsername.toLowerCase() === 'ridheya';

    if (isNewRidheya) {
      loaded.selectedGrade = 'group_4_5';
      setSelectedVerbTier('beginner');
    } else {
      loaded.selectedGrade = 'group_6_7_8';
      setSelectedVerbTier('all');
    }

    setProfile(loaded);
    setSelectedBiome(loaded.selectedBiome || 'farm');
    setCurrentQuestionIndex(0);
    setCurrentVerbIndex(0);
    setShowLoginModal(false);

    // Papa's account pins the parent dashboard so progress is front-and-center,
    // while still leaving the normal home screen underneath for testing games.
    if (newUsername.toLowerCase() === 'papa') {
      setShowScoreboardModal(true);
    }
  };

  // Opens the Sterke Werkwoorden zone arena directly, forcing Hemali's
  // groep68Mode toggle so the tile doesn't land on the plain expedition view.
  const openVerbArena = () => {
    if (profile.selectedGrade === 'group_6_7_8') {
      setGroep68Mode('verb_arena');
    }
    setIsExpeditionActive(true);
  };

  // Handle Biome Change
  const handleSelectBiome = (biome: BiomeType) => {
    setSelectedBiome(biome);
    setProfile(prev => ({ ...prev, selectedBiome: biome }));
    setCurrentQuestionIndex(0);
    sound.playPop();
  };

  // Handle Save Profile / Avatar
  const handleSaveProfile = (name: string, avatarId: string, avatarEmoji: string, avatarTitle: string, tocaData?: any) => {
    setProfile(prev => ({
      ...prev,
      name,
      avatarId,
      avatarEmoji,
      avatarTitle,
      hasCustomizedAvatar: true,
      customization: {
        ...prev.customization,
        ...(tocaData ? { toca: tocaData, outfit: tocaData.outfit, hairStyle: tocaData.hairStyle, hairColor: tocaData.hairColor } : {})
      } as any
    }));
    setShowProfileModal(false);
  };

  // Switch Grade Handler
  const handleSelectGrade = (grade: GradeLevel) => {
    setProfile(prev => ({ ...prev, selectedGrade: grade }));
    setCurrentQuestionIndex(0);
    setCurrentVerbIndex(0);
    sound.playStar();
  };

  // Derived Animals List with unlock & heart state across all 42 animals
  const animals: Animal[] = ALL_BIOME_ANIMALS.map(baseAnimal => {
    const isUnlocked = profile.unlockedAnimals.includes(baseAnimal.id);
    const hearts = profile.animalHearts[baseAnimal.id] || 0;
    return {
      ...baseAnimal,
      unlocked: isUnlocked,
      hearts
    };
  });

  // Calculate unlocked and total animals per biome
  const unlockedCountByBiome = BIOMES.reduce((acc, b) => {
    acc[b.id] = animals.filter(a => a.biome === b.id && a.unlocked).length;
    return acc;
  }, {} as Record<string, number>);

  const totalCountByBiome = BIOMES.reduce((acc, b) => {
    acc[b.id] = animals.filter(a => a.biome === b.id).length;
    return acc;
  }, {} as Record<string, number>);

  // Derived Badges List with unlock state
  const badges: Badge[] = INITIAL_BADGES.map(baseBadge => {
    const isUnlocked = profile.unlockedBadges.includes(baseBadge.id);
    return {
      ...baseBadge,
      unlocked: isUnlocked
    };
  });

  // Active Biome Config & Levels depending on Selected Grade & User Profile
  const activeBiomeConfig = BIOMES.find(b => b.id === selectedBiome) || BIOMES[0];
  const isRidheya = currentUsername.toLowerCase() === 'ridheya';
  const isHemali = currentUsername.toLowerCase() === 'hemali';

  // Ensure appropriate grade level defaults for each sister
  const effectiveGrade = getEffectiveGrade(profile, isRidheya);
  const levelsByGrade = effectiveGrade === 'group_4_5'
    ? BIOME_LEVELS_GROEP_4_5
    : BIOME_LEVELS_GROEP_6_8;
  const biomeLevels = levelsByGrade[selectedBiome] || levelsByGrade.farm;
  const currentBiomeLevelIdx = profile.biomeProgress?.[selectedBiome] ?? (profile.currentLevelIndex % biomeLevels.length);
  const currentLevel = biomeLevels[currentBiomeLevelIdx % biomeLevels.length] || biomeLevels[0];

  // Prioritize unseen questions in the current level for cross-session freshness
  const levelQuestions = currentLevel.questions;
  const seenSet = new Set<string>(profile.seenQuestionIds || []);
  const currentQuestion = pickNextItem(levelQuestions, seenSet, (q: (typeof levelQuestions)[number]) => q.id, currentQuestionIndex) || levelQuestions[0];

  // Sterke Werkwoorden: verbs are scoped to the selected zone, not tier.
  // Always serves a not-yet-mastered verb (least-recently-attempted first),
  // so a wrong answer's retry doesn't have to wait for a full lap through
  // every verb in the zone -- see pickNextVerbInZone's own doc comment.
  const zoneVerbs = getVerbsInZone(selectedVerbZone, WERKWOORDEN_DATA);
  const currentVerb: VerbItem = pickNextVerbInZone(zoneVerbs, profile) || WERKWOORDEN_DATA[0];

  // Mascot animal for current interaction
  const verbMascotAnimal = animals[currentVerbIndex % animals.length] || animals[0];

  // Evaluate badges on any state change
  const evaluateBadges = (updatedProfile: PlayerProfile) => {
    const newlyUnlocked: string[] = [];

    if (updatedProfile.totalCorrect >= 1 && !updatedProfile.unlockedBadges.includes('first-step')) {
      newlyUnlocked.push('first-step');
    }
    if (updatedProfile.highestStreak >= 3 && !updatedProfile.unlockedBadges.includes('streak-3')) {
      newlyUnlocked.push('streak-3');
    }
    if (updatedProfile.highestStreak >= 5 && !updatedProfile.unlockedBadges.includes('streak-5')) {
      newlyUnlocked.push('streak-5');
    }
    if (updatedProfile.unlockedAnimals.includes('bella-koe') && !updatedProfile.unlockedBadges.includes('first-step')) {
      newlyUnlocked.push('first-step');
    }
    if (updatedProfile.unlockedAnimals.includes('gigi-giraf') && !updatedProfile.unlockedBadges.includes('gigi-friend')) {
      newlyUnlocked.push('gigi-friend');
    }
    if (updatedProfile.unlockedAnimals.includes('leo-leeuw') && !updatedProfile.unlockedBadges.includes('leo-friend')) {
      newlyUnlocked.push('leo-friend');
    }
    if (updatedProfile.unlockedAnimals.includes('pippa-panda') && !updatedProfile.unlockedBadges.includes('pippa-friend')) {
      newlyUnlocked.push('pippa-friend');
    }
    if (updatedProfile.totalCorrect >= 10 && !updatedProfile.unlockedBadges.includes('spelling-champ')) {
      newlyUnlocked.push('spelling-champ');
    }
    const totalFed = Object.values(updatedProfile.animalFedCount || {}).reduce((a: number, b: number) => a + b, 0);
    if (totalFed >= 5 && !updatedProfile.unlockedBadges.includes('master-feeder')) {
      newlyUnlocked.push('master-feeder');
    }
    if (updatedProfile.unlockedAnimals.length >= ALL_BIOME_ANIMALS.length && !updatedProfile.unlockedBadges.includes('safari-director')) {
      newlyUnlocked.push('safari-director');
    }

    if (newlyUnlocked.length > 0) {
      const allUnlocked = [...updatedProfile.unlockedBadges, ...newlyUnlocked];
      setProfile(prev => ({
        ...prev,
        unlockedBadges: allUnlocked
      }));

      const newBadgeObjects = INITIAL_BADGES.filter(b => newlyUnlocked.includes(b.id));
      setJustUnlockedBadges(newBadgeObjects);
    }
  };

  // Handler: Answer Correct
  const handleAnswerCorrect = (pointsEarned: number) => {
    setProfile(prev => {
      const newStreak = prev.streak + 1;
      const bonusMultiplier = newStreak >= 3 ? 2 : 1;
      const totalStars = prev.stars + (pointsEarned * bonusMultiplier);
      const totalCoins = prev.score + (pointsEarned * bonusMultiplier);

      const qId = currentQuestion.id || `q-${currentQuestion.category}-${currentQuestion.question}`;
      const seenSet = new Set<string>(prev.seenQuestionIds || []);
      seenSet.add(qId);

      const logged = addActivityLog(prev, {
        question: currentQuestion.question,
        category: currentQuestion.category,
        biomeName: activeBiomeConfig.name,
        isCorrect: true,
        pointsEarned: pointsEarned * bonusMultiplier
      });

      const nextProfile: PlayerProfile = {
        ...logged,
        score: totalCoins,
        stars: totalStars,
        streak: newStreak,
        highestStreak: Math.max(prev.highestStreak, newStreak),
        totalCorrect: prev.totalCorrect + 1,
        totalAnswered: prev.totalAnswered + 1,
        seenQuestionIds: Array.from(seenSet),
        mastery: {
          ...prev.mastery,
          spelling: Math.min(100, prev.mastery.spelling + 1),
          grammar: Math.min(100, prev.mastery.grammar + 1)
        }
      };

      evaluateBadges(nextProfile);
      return nextProfile;
    });
  };

  // Handler: Answer Incorrect
  const handleAnswerIncorrect = () => {
    setProfile(prev => {
      const qId = currentQuestion.id || `q-${currentQuestion.category}-${currentQuestion.question}`;
      const seenSet = new Set<string>(prev.seenQuestionIds || []);
      seenSet.add(qId);

      const logged = addActivityLog(prev, {
        question: currentQuestion.question,
        category: currentQuestion.category,
        biomeName: activeBiomeConfig.name,
        isCorrect: false,
        pointsEarned: 0
      });

      return {
        ...logged,
        streak: 0,
        totalAnswered: prev.totalAnswered + 1,
        seenQuestionIds: Array.from(seenSet)
      };
    });
  };

  // Handler: Next Question / Level Advancement for Both Grades!
  const handleNextQuestion = () => {
    const isLastQuestionInLevel = currentQuestionIndex >= currentLevel.questions.length - 1;

    if (isLastQuestionInLevel) {
      const rewardAnimal = currentLevel.animalReward;
      const isAlreadyUnlocked = profile.unlockedAnimals.includes(rewardAnimal.id);

      const updatedUnlocked = isAlreadyUnlocked
        ? profile.unlockedAnimals
        : [...profile.unlockedAnimals, rewardAnimal.id];

      // If already unlocked, boost friendship hearts up to 5!
      const currentHearts = profile.animalHearts?.[rewardAnimal.id] || (isAlreadyUnlocked ? 1 : 0);
      const updatedHearts = {
        ...(profile.animalHearts || {}),
        [rewardAnimal.id]: Math.min(5, currentHearts + 1)
      };

      // Boost Pet Companion XP
      const updatedCompanion = profile.companion ? {
        ...profile.companion,
        xp: profile.companion.xp + 75,
        friendshipHearts: Math.min(5, profile.companion.friendshipHearts + 1)
      } : profile.companion;

      const curBiomeIdx = profile.biomeProgress?.[selectedBiome] ?? (profile.currentLevelIndex % biomeLevels.length);
      
      // If at last level of current biome, cycle to next biome or restart with prestige
      let nextBiome = selectedBiome;
      let nextBiomeLevelIndex = curBiomeIdx + 1;
      
      if (nextBiomeLevelIndex >= biomeLevels.length) {
        const biomeOrder: BiomeType[] = ['farm', 'safari', 'sea', 'snow', 'jungle', 'outback', 'mountain'];
        const curIdx = biomeOrder.indexOf(selectedBiome);
        nextBiome = biomeOrder[(curIdx + 1) % biomeOrder.length];
        nextBiomeLevelIndex = 0;
      }

      setProfile(prev => {
        const next: PlayerProfile = {
          ...prev,
          stars: prev.stars + 50,
          score: prev.score + 50,
          unlockedAnimals: updatedUnlocked,
          animalHearts: updatedHearts,
          companion: updatedCompanion || prev.companion,
          currentLevelIndex: nextBiomeLevelIndex,
          biomeProgress: {
            ...(prev.biomeProgress || {}),
            [selectedBiome]: nextBiomeLevelIndex
          }
        };
        evaluateBadges(next);
        return next;
      });

      if (nextBiome !== selectedBiome) {
        setSelectedBiome(nextBiome);
      }

      setJustUnlockedAnimal(rewardAnimal);
      setShowRewardModal(true);
      setCurrentQuestionIndex(0);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  // Handler: Next Verb in Arena Mode
  const handleNextVerb = (wasCorrect: boolean) => {
    const verbKey = `verb-${currentVerb.infinitief}`;
    const seenSet = new Set<string>(profile.seenQuestionIds || []);
    seenSet.add(verbKey);

    const wasZoneCompleteBefore = isZoneComplete(selectedVerbZone, profile);

    setProfile(prev => {
      const history = prev.questionHistory || {};
      const prevEntry = history[verbKey] || { count: 0, lastSeen: 0 };
      const nextProfile: PlayerProfile = {
        ...prev,
        seenQuestionIds: Array.from(seenSet),
        questionHistory: {
          ...history,
          [verbKey]: {
            count: prevEntry.count + 1,
            lastSeen: Date.now(),
            wasCorrect: prevEntry.wasCorrect || wasCorrect
          }
        }
      };

      const isZoneCompleteNow = isZoneComplete(selectedVerbZone, nextProfile);
      if (!wasZoneCompleteBefore && isZoneCompleteNow) {
        nextProfile.stars = prev.stars + 50;
        nextProfile.score = prev.score + 50;
      }
      return nextProfile;
    });

    // setProfile's updater must stay pure (no side effects), so it can't trigger the
    // reward modal itself. Recompute zone-completion here from the same inputs (prev
    // profile + this verb's outcome) just to decide whether to pop the modal. If you
    // change how `wasCorrect` is derived above, change it identically here too.
    const wasZoneCompleteAfter = isZoneComplete(
      selectedVerbZone,
      { ...profile, questionHistory: { ...(profile.questionHistory || {}), [verbKey]: { count: 1, lastSeen: Date.now(), wasCorrect: profile.questionHistory?.[verbKey]?.wasCorrect || wasCorrect } } }
    );
    if (!wasZoneCompleteBefore && wasZoneCompleteAfter) {
      setJustCompletedZoneIndex(selectedVerbZone);
      setShowZoneRewardModal(true);
    }

    setCurrentVerbIndex(prev => prev + 1);
  };

  // Handler: Feed Animal in Sanctuary
  const handleFeedAnimal = (animalId: string) => {
    if (profile.score < 20) {
      sound.playWrong();
      return;
    }

    setProfile(prev => {
      const currentHearts = prev.animalHearts[animalId] || 0;
      const currentFed = prev.animalFedCount[animalId] || 0;

      const next: PlayerProfile = {
        ...prev,
        score: prev.score - 20,
        stars: prev.stars + 10,
        animalHearts: {
          ...prev.animalHearts,
          [animalId]: Math.min(5, currentHearts + 1)
        },
        animalFedCount: {
          ...prev.animalFedCount,
          [animalId]: currentFed + 1
        }
      };

      evaluateBadges(next);
      return next;
    });

    sound.playMunch();
  };

  // Handler: Pet Animal
  const handlePetAnimal = (animalId: string) => {
    sound.playStar();
    setProfile(prev => ({
      ...prev,
      stars: prev.stars + 2
    }));
  };

  // Reset Progress Handler for Active User
  const handleResetProgress = () => {
    if (window.confirm(`Weet je zeker dat je alle voortgang voor ${currentUsername} wilt resetten?`)) {
      const fresh = loadUserProfile(currentUsername);
      fresh.score = 50;
      fresh.stars = 0;
      fresh.currentLevelIndex = 0;
      fresh.streak = 0;
      fresh.highestStreak = 0;
      fresh.totalCorrect = 0;
      fresh.totalAnswered = 0;
      fresh.unlockedAnimals = ['bella-koe'];
      fresh.unlockedBadges = [];
      fresh.animalHearts = { 'bella-koe': 1 };
      fresh.animalFedCount = {};
      fresh.activityLogs = [];
      
      setProfile(fresh);
      saveUserProfile(currentUsername, fresh);
      setCurrentQuestionIndex(0);
      setCurrentVerbIndex(0);
      sound.playPop();
    }
  };

  const unlockedCount = profile.unlockedAnimals.length;
  const totalAnimals = ALL_BIOME_ANIMALS.length;

  const fontClass = profile.accessibility?.dyslexiaFont
    ? 'font-mono'
    : 'font-sans';

  const sizeClass = profile.accessibility?.fontSize === 'xlarge'
    ? 'text-lg'
    : profile.accessibility?.fontSize === 'large'
    ? 'text-base'
    : 'text-sm';

  const rpgEmoji = isRidheya ? '🩺' : '✨';
  const rpgTitle = isRidheya
    ? 'Het Geheim van de Boomhut Dierenkliniek & De Dierenvallei 🐾'
    : 'Het Verloren Astrolabium & Het Mysterie van de Cito Tijdwachters 📜';
  const rpgSubtitle = isRidheya
    ? 'Reis met Ridheya en hondje Kopi door het oerwoud, ontdek moeilijke woorden met het pop-up woordenboek en genees dieren!'
    : 'Ontrafel cryptische manuscripten, kraak moeilijke signaalwoorden (desondanks, daarentegen) en kies je eigen verhaalroute!';

  const homeTiles = buildHomeTiles(
    {
      openRpgAdventure: () => setShowCitoRpgModal(true),
      openVerbArena,
      openDictionary: () => setShowDictionaryModal(true),
      openSpellingFactory: () => setShowSpellingFactoryModal(true),
      openArcade: () => setShowArcadeModal(true),
      openBossArena: () => setShowBossArenaModal(true),
      openTamagotchi: () => setShowTamagotchiModal(true),
      openTestSelector: () => setShowTestSelectorModal(true),
      openExpedition: () => setIsExpeditionActive(true),
      goToSanctuary: () => setActiveTab('sanctuary'),
      goToMap: () => setActiveTab('map'),
      goToBadges: () => setActiveTab('badges'),
      openScoreboard: () => setShowScoreboardModal(true)
    },
    {
      rpgEmoji,
      rpgTitle,
      rpgSubtitle,
      expeditionEmoji: activeBiomeConfig.emoji,
      expeditionTitle: `${activeBiomeConfig.name} Expeditie`,
      expeditionSubtitle: `${currentLevel.name} • Level ${currentBiomeLevelIdx + 1} van ${biomeLevels.length}`
    }
  );

  const HOME_TILE_GROUPS: HomeTileGroup[] = ['learn', 'play', 'explore', 'progress'];

  return (
    <div className={`min-h-screen bg-slate-100/90 text-slate-900 flex flex-col ${fontClass} ${sizeClass} relative selection:bg-emerald-200 selection:text-emerald-950 pb-12`}>
      {/* Background ambient gentle particles */}
      <AmbientParticles biome={selectedBiome} />

      {/* Top Application Header Bar */}
      <TopBar
        playerName={profile.name}
        avatarEmoji={profile.avatarEmoji}
        avatarTitle={profile.avatarTitle}
        tocaCustomization={(profile.customization as any)?.toca}
        onOpenProfileModal={() => setShowProfileModal(true)}
        onOpenLoginModal={() => setShowLoginModal(true)}
        onOpenWardrobeModal={() => setShowWardrobeModal(true)}
        onOpenVoiceModal={() => setShowVoiceModal(true)}
        onResetProgress={handleResetProgress}
        stars={profile.stars}
        score={profile.score}
        streak={profile.streak}
        unlockedCount={unlockedCount}
        totalAnimals={totalAnimals}
        selectedGrade={profile.selectedGrade}
        onOpenGradeSelector={() => setShowGradeModal(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 py-2 sm:py-3 space-y-4">
        
        <main className="space-y-4">
          
          {/* TAB 1: ADVENTURE & EXPEDITION MODE */}
          {activeTab === 'adventure' && (
            <div className="space-y-4">
              
              {/* VIEW A: ACTIVE EXPEDITION QUIZ (When student clicked 'Start Safari Expeditie' or chose a level) */}
              {isExpeditionActive ? (
                <div className="space-y-4">
                  {/* Expedition Top Navigation & Status Bar */}
                  <div className="bg-slate-900/95 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 border border-white/15 text-white flex items-center justify-between gap-3 flex-wrap shadow-lg">
                    <button
                      onClick={() => {
                        sound.playPop();
                        setIsExpeditionActive(false);
                      }}
                      className="bg-slate-800 hover:bg-slate-700 text-white font-black text-xs px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer border border-slate-700 active:scale-95"
                    >
                      <span>←</span>
                      <span>Terug naar Hoofdmenu</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <span className="text-xl p-1 bg-white/10 rounded-xl">{activeBiomeConfig.emoji}</span>
                      <div className="text-left leading-tight">
                        <div className="text-xs sm:text-sm font-black text-white flex items-center gap-1.5">
                          <span>{activeBiomeConfig.name}</span>
                          <span className="text-emerald-400">• Level {currentBiomeLevelIdx + 1}: {currentLevel.name}</span>
                        </div>
                        <div className="text-[10px] text-slate-300 font-medium">
                          Dierbeloning: <strong>{currentLevel.animalReward.name} {currentLevel.animalReward.emoji}</strong>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        sound.playPop();
                        setIsExpeditionActive(false);
                        setActiveTab('map');
                      }}
                      className="bg-emerald-600/80 hover:bg-emerald-600 text-white font-bold text-xs px-3 py-2 rounded-xl transition-all flex items-center gap-1 cursor-pointer shadow-xs active:scale-95"
                    >
                      <Compass className="w-3.5 h-3.5" />
                      <span>Kies Ander Werelddeel</span>
                    </button>
                  </div>

                  {/* Sub-Toggle for Groep 6-7-8 (Expedition vs Verb Arena) */}
                  {profile.selectedGrade === 'group_6_7_8' && (
                    <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2 border border-slate-200 shadow-xs flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-1.5 pl-2">
                        <Zap className="w-4 h-4 text-amber-500" />
                        <span className="text-xs font-black text-slate-800 uppercase tracking-wider">
                          Groep 6-8 Modus:
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setGroep68Mode('expedition');
                            sound.playPop();
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                            groep68Mode === 'expedition'
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          <Compass className="w-3.5 h-3.5" />
                          <span>{activeBiomeConfig.name} Expeditie</span>
                        </button>

                        <button
                          onClick={() => {
                            setGroep68Mode('verb_arena');
                            sound.playPop();
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                            groep68Mode === 'verb_arena'
                              ? 'bg-amber-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          <Zap className="w-3.5 h-3.5" />
                          <span>Sterke Werkwoorden Arena (100+)</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Render Primary Unified Expeditie Quiz or Verb Arena */}
                  {profile.selectedGrade === 'group_4_5' || groep68Mode === 'expedition' ? (
                    <QuizCard
                      question={currentQuestion}
                      animal={currentLevel.animalReward}
                      level={currentLevel}
                      biome={selectedBiome}
                      chapterTitle={currentLevel.chapterTitle}
                      introStory={currentLevel.introStory}
                      playerName={profile.name}
                      avatarEmoji={profile.avatarEmoji}
                      totalQuestionsInLevel={currentLevel.questions.length}
                      currentQuestionIndex={currentQuestionIndex}
                      onAnswerCorrect={handleAnswerCorrect}
                      onAnswerIncorrect={handleAnswerIncorrect}
                      onNextQuestion={handleNextQuestion}
                      onSpeakStory={() => sound.speak(currentLevel.introStory)}
                    />
                  ) : (
                    <>
                      <VerbZoneMapPanel
                        profile={profile}
                        selectedZoneIndex={selectedVerbZone}
                        onSelectZone={(zoneIndex) => {
                          setSelectedVerbZone(zoneIndex);
                          setCurrentVerbIndex(0);
                        }}
                      />
                      <VerbQuizCard
                        verbItem={currentVerb}
                        mascotAnimal={verbMascotAnimal}
                        playerName={profile.name}
                        avatarEmoji={profile.avatarEmoji}
                        selectedTier={getZoneMeta(selectedVerbZone)?.tierLabel}
                        onSelectTier={(tier) => {
                          setSelectedVerbTier(tier);
                          setCurrentVerbIndex(0);
                          sound.playPop();
                        }}
                        onAnswerCorrect={handleAnswerCorrect}
                        onAnswerIncorrect={handleAnswerIncorrect}
                        onNextVerb={handleNextVerb}
                        totalVerbsAvailable={zoneVerbs.length}
                        currentVerbIndex={currentVerbIndex}
                        zoneProgress={getZoneProgress(selectedVerbZone, profile)}
                      />
                    </>
                  )}
                </div>
              ) : (
                /* VIEW B: CLEAN HOME HUB (grouped bento tile grid) */
                <div className="space-y-5">
                  {HOME_TILE_GROUPS.map(group => (
                    <div key={group} className="space-y-2">
                      <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 pl-1">
                        {HOME_TILE_GROUP_LABELS[group]}
                      </h3>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                        {homeTiles
                          .filter(tile => tile.group === group)
                          .map(tile => (
                            <BentoTile key={tile.id} tile={tile} />
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: SAFARI ARCADE ARENA HUB */}
          {activeTab === 'arcade' && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-950 rounded-3xl p-6 text-white border-2 border-purple-400/50 shadow-xl flex flex-col md:flex-row items-center justify-between gap-5">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-purple-500/20 border border-purple-300/40 flex items-center justify-center text-4xl shadow-inner flex-shrink-0">
                    🕹️
                  </div>
                  <div>
                    <span className="bg-pink-500 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider">
                      Arcade Mini-Games (15s Blitz Modus)
                    </span>
                    <h3 className="text-xl font-black text-white mt-1">
                      Safari Dutch Arcade Arena
                    </h3>
                    <p className="text-xs text-purple-200 mt-1 max-w-xl">
                      Train spelling, signaalwoorden en leesvaardigheid met snelle 15-seconden rondes, combo vermenigvuldigers en sterrenbeloningen!
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    sound.playPop();
                    setShowArcadeModal(true);
                  }}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-black text-sm px-6 py-3 rounded-2xl shadow-lg transition-all cursor-pointer whitespace-nowrap active:scale-95 flex items-center gap-2"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Start Arcade Modus ➔</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Game 1: Balloon Popper */}
                <div
                  onClick={() => {
                    sound.playPop();
                    setShowArcadeModal(true);
                  }}
                  className="bg-white rounded-3xl p-5 border border-purple-100 shadow-md hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-pink-100 text-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      🎈
                    </div>
                    <h4 className="text-base font-black text-slate-800">
                      Klank Ballon Popper
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Laat ballonnen knappen met de juiste doelwoorden en dubbelzetters. Perfect voor snelle woordherkenning!
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-black text-purple-600">
                    <span>Speel Ballon Popper</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Game 2: Meteor Sprint */}
                <div
                  onClick={() => {
                    sound.playPop();
                    setShowArcadeModal(true);
                  }}
                  className="bg-white rounded-3xl p-5 border border-purple-100 shadow-md hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-amber-100 text-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      ☄️
                    </div>
                    <h4 className="text-base font-black text-slate-800">
                      Woord Meteor Sprint (15s)
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Los binnen 15 seconden definities, synoniemen en tegenstellingen op voor meteoren inslaan!
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-black text-amber-600">
                    <span>Speel Meteor Sprint</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Game 3: Cito Turbo Dash */}
                <div
                  onClick={() => {
                    sound.playPop();
                    setShowArcadeModal(true);
                  }}
                  className="bg-white rounded-3xl p-5 border border-purple-100 shadow-md hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      ⚡
                    </div>
                    <h4 className="text-base font-black text-slate-800">
                      Cito Turbo Dash (15s)
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Kraak signaalwoorden en verwijswoorden in authentieke Cito passages onder de 15s timer!
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-black text-emerald-600">
                    <span>Speel Turbo Dash</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ANIMAL SANCTUARY (DIERENPARK) */}
          {activeTab === 'sanctuary' && (
            <AnimalSanctuary
              animals={animals}
              score={profile.score}
              profile={profile}
              onFeedAnimal={handleFeedAnimal}
              onPetAnimal={handlePetAnimal}
              onGoToAdventure={() => setActiveTab('adventure')}
            />
          )}

          {/* TAB 3: BADGES TROPHY CASE */}
          {activeTab === 'badges' && (
            <BadgeShowcase
              badges={badges}
              totalCorrect={profile.totalCorrect}
              highestStreak={profile.highestStreak}
              unlockedAnimalsCount={unlockedCount}
              totalFedCount={Object.values(profile.animalFedCount || {}).reduce((a: number, b: number) => a + b, 0)}
            />
          )}

          {/* TAB 4: LEVEL ROADMAP */}
          {activeTab === 'map' && (
            <div className="space-y-4">
              <BiomeSelector
                selectedBiome={selectedBiome}
                onSelectBiome={handleSelectBiome}
                unlockedCountByBiome={unlockedCountByBiome}
                totalCountByBiome={totalCountByBiome}
              />
              <LevelRoadmap
                levels={biomeLevels}
                currentLevelIndex={currentBiomeLevelIdx}
                unlockedAnimals={animals}
                selectedBiome={selectedBiome}
                onSelectLevel={(idx) => {
                  setProfile(prev => ({
                    ...prev,
                    currentLevelIndex: idx,
                    biomeProgress: {
                      ...(prev.biomeProgress || {}),
                      [selectedBiome]: idx
                    }
                  }));
                  setCurrentQuestionIndex(0);
                  setIsExpeditionActive(true);
                  setActiveTab('adventure');
                }}
              />
            </div>
          )}
        </main>
      </div>

      {/* Footer Controls & Reset */}
      <footer className="w-full max-w-5xl mx-auto px-4 mt-8 pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-medium gap-3 relative z-10">
        <div className="flex items-center gap-2">
          <span>🌍 Wereld Safaripark &amp; Boerderij</span>
          <span>•</span>
          <span>7 Wereldlocaties • 42 Dieren • Groep 3-5 &amp; Groep 6-8</span>
        </div>

        <button
          onClick={() => setShowVersionModal(true)}
          className="text-slate-400 hover:text-slate-600 font-bold text-[11px] cursor-pointer"
          title="Versie-informatie"
        >
          v8.0.1
        </button>
      </footer>

      {/* Female Explorer Profile / Avatar Selection Modal */}
      <ProfileAvatarModal
        isOpen={showProfileModal}
        currentName={profile.name}
        currentAvatarId={profile.avatarId || 'tess'}
        onSave={handleSaveProfile}
        onClose={() => setShowProfileModal(false)}
        isFirstTime={false}
      />

      {/* Signon / User Switch Modal (Hemali & Ridheya) */}
      <LoginModal
        isOpen={showLoginModal}
        currentUsername={currentUsername}
        onLoginSuccess={handleSwitchUser}
        onClose={() => setShowLoginModal(false)}
      />

      {/* Enhanced Parent & Teacher Dashboard Modal */}
      <EnhancedParentDashboardModal
        isOpen={showScoreboardModal}
        currentProfile={profile}
        onClose={() => setShowScoreboardModal(false)}
        onResetProgress={handleResetProgress}
        onUpdateProfile={(updater) => setProfile(updater)}
      />

      {/* Ridheya Spelling Factory Modal */}
      <RidheyaSpellingFactoryModal
        isOpen={showSpellingFactoryModal}
        profile={profile}
        onClose={() => setShowSpellingFactoryModal(false)}
        onUpdateProfile={(updater) => setProfile(updater)}
      />

      {/* Toetsweek: mode selector + the two test modals */}
      <TestModeSelectorModal
        isOpen={showTestSelectorModal}
        onClose={() => setShowTestSelectorModal(false)}
        onSelectSpelling={() => { setShowTestSelectorModal(false); setShowSpellingTestModal(true); }}
        onSelectWerkwoorden={() => { setShowTestSelectorModal(false); setShowWerkwoordenTestModal(true); }}
      />
      <SpellingTestModal
        isOpen={showSpellingTestModal}
        profile={profile}
        onClose={() => setShowSpellingTestModal(false)}
        onUpdateProfile={(updater) => setProfile(updater)}
      />
      <SterkeWerkwoordenTestModal
        isOpen={showWerkwoordenTestModal}
        profile={profile}
        onClose={() => setShowWerkwoordenTestModal(false)}
        onUpdateProfile={(updater) => setProfile(updater)}
      />

      {/* Toca & Roblox Avatar & Wardrobe Studio Modal */}
      <TocaWardrobeStudioModal
        isOpen={showWardrobeModal}
        profile={profile}
        onClose={() => setShowWardrobeModal(false)}
        onUpdateProfile={(updater) => setProfile(updater)}
      />

      {/* Grade Level Selection Modal */}
      <GradeSelectorModal
        isOpen={showGradeModal}
        selectedGrade={profile.selectedGrade}
        onSelectGrade={handleSelectGrade}
        onClose={() => setShowGradeModal(false)}
      />

      {/* Version Flash Modal (Game Versie 8) */}
      <VersionFlashModal
        isOpen={showVersionModal}
        onClose={() => setShowVersionModal(false)}
      />

      {/* Interactive Tamagotchi Pet Room & Adoption Studio Modal */}
      <TamagotchiPetRoomModal
        isOpen={showTamagotchiModal}
        onClose={() => setShowTamagotchiModal(false)}
        profile={profile}
        onUpdateProfile={(updater) => setProfile(updater)}
      />

      {/* Cito RPG Choose-Your-Own-Adventure & Diagnostic Placement Modal */}
      <CitoRpgExamModal
        isOpen={showCitoRpgModal}
        onClose={() => setShowCitoRpgModal(false)}
        defaultActiveProfile={currentUsername.toLowerCase() === 'ridheya' ? 'ridheya' : 'hemali'}
        onRewardStars={(stars) => {
          setProfile(p => ({
            ...p,
            stars: p.stars + stars,
            score: p.score + stars * 10
          }));
        }}
      />

      {/* Werkwoord Boss Arena Modal for Hemali & Groep 8 ('t Kofschip, d/t/dt, leenwoorden) */}
      <WerkwoordBossArenaModal
        isOpen={showBossArenaModal}
        onClose={() => setShowBossArenaModal(false)}
        profile={profile}
        onUpdateProfile={(updater) => setProfile(updater)}
      />

      {/* Voice Persona & Audio Settings Modal */}
      <VoiceSettingsModal
        isOpen={showVoiceModal}
        onClose={() => setShowVoiceModal(false)}
      />

      {/* Dutch Educational Dictionary & Vocabulary Explorer Modal */}
      <DutchDictionaryModal
        isOpen={showDictionaryModal}
        onClose={() => setShowDictionaryModal(false)}
      />

      {/* Safari Dutch Arcade Arena Modal (Bubble Pop, Syllable Sprint, Cito Turbo) */}
      <DutchArcadeArenaModal
        isOpen={showArcadeModal}
        onClose={() => setShowArcadeModal(false)}
        profile={profile}
        onUpdateProfile={(updater) => setProfile(updater)}
      />

      {/* Level Complete / Animal Unlock Reward Modal */}
      <RewardModal
        isOpen={showRewardModal}
        animal={justUnlockedAnimal}
        levelNumber={currentLevel.id}
        newBadges={justUnlockedBadges}
        earnedStars={50}
        onClose={() => {
          setShowRewardModal(false);
          setJustUnlockedBadges([]);
        }}
        onGoToSanctuary={() => {
          setShowRewardModal(false);
          setJustUnlockedBadges([]);
          setActiveTab('sanctuary');
        }}
      />

      <ZoneRewardModal
        isOpen={showZoneRewardModal}
        zone={getZoneMeta(justCompletedZoneIndex)}
        onClose={() => setShowZoneRewardModal(false)}
        onGoToZoneMap={() => {
          setShowZoneRewardModal(false);
        }}
      />
    </div>
  );
}
