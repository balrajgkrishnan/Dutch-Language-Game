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
import { GradeSwitcherBar } from './components/GradeSwitcherBar';
import { ProfileAvatarModal } from './components/ProfileAvatarModal';
import { LoginModal } from './components/LoginModal';
import { EnhancedParentDashboardModal } from './components/EnhancedParentDashboardModal';
import { CompanionCard } from './components/CompanionCard';
import { ReadingAdventureModal } from './components/ReadingAdventureModal';
import { HemaliReporterModal } from './components/HemaliReporterModal';
import { RidheyaSpellingFactoryModal } from './components/RidheyaSpellingFactoryModal';
import { SisterTeamModal } from './components/SisterTeamModal';
import { TocaWardrobeStudioModal } from './components/TocaWardrobeStudioModal';
import { TamagotchiPetRoomModal } from './components/TamagotchiPetRoomModal';
import { VersionFlashModal } from './components/VersionFlashModal';
import { VeterinarianHospitalModal } from './components/VeterinarianHospitalModal';
import { CitoRpgExamModal } from './components/CitoRpgExamModal';
import { WerkwoordBossArenaModal } from './components/WerkwoordBossArenaModal';
import { VoiceSettingsModal } from './components/VoiceSettingsModal';
import { DutchDictionaryModal } from './components/DutchDictionaryModal';
import { DutchArcadeArenaModal } from './components/DutchArcadeArenaModal';
import { AccessibilityBar } from './components/AccessibilityBar';
import { BiomeSelector } from './components/BiomeSelector';
import { AmbientParticles } from './components/AmbientParticles';
import { INITIAL_BADGES } from './data/gameData';
import { BIOMES, ALL_BIOME_ANIMALS } from './data/biomeData';
import { BIOME_LEVELS_GROEP_4_5 } from './data/biomeLevels45';
import { BIOME_LEVELS_GROEP_6_8 } from './data/biomeLevels68';
import { WERKWOORDEN_DATA } from './data/werkwoorden';
import { getVerbsInZone, getZoneMeta, isZoneComplete } from './data/verbZones';
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
  const [showReadingModal, setShowReadingModal] = useState(false);
  const [showReporterModal, setShowReporterModal] = useState(false);
  const [showSpellingFactoryModal, setShowSpellingFactoryModal] = useState(false);
  const [showSisterTeamModal, setShowSisterTeamModal] = useState(false);
  const [showWardrobeModal, setShowWardrobeModal] = useState(false);
  const [showVersionModal, setShowVersionModal] = useState(false);
  const [showVetHospitalModal, setShowVetHospitalModal] = useState(false);
  const [showTamagotchiModal, setShowTamagotchiModal] = useState(false);
  const [showCitoRpgModal, setShowCitoRpgModal] = useState(false);
  const [showBossArenaModal, setShowBossArenaModal] = useState(false);
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
  const effectiveGrade = profile.selectedGrade || (isRidheya ? 'group_4_5' : 'group_6_7_8');
  const levelsByGrade = effectiveGrade === 'group_4_5'
    ? BIOME_LEVELS_GROEP_4_5
    : BIOME_LEVELS_GROEP_6_8;
  const biomeLevels = levelsByGrade[selectedBiome] || levelsByGrade.farm;
  const currentBiomeLevelIdx = profile.biomeProgress?.[selectedBiome] ?? (profile.currentLevelIndex % biomeLevels.length);
  const currentLevel = biomeLevels[currentBiomeLevelIdx % biomeLevels.length] || biomeLevels[0];

  // Prioritize unseen questions in the current level for cross-session freshness
  const levelQuestions = currentLevel.questions;
  const seenSet = new Set(profile.seenQuestionIds || []);
  const unseenQuestions = levelQuestions.filter(q => !seenSet.has(q.id));
  const prioritizedQuestions = unseenQuestions.length > 0
    ? [...unseenQuestions, ...levelQuestions.filter(q => seenSet.has(q.id))]
    : levelQuestions;
  const currentQuestion = prioritizedQuestions[currentQuestionIndex % prioritizedQuestions.length] || levelQuestions[0];

  // Sterke Werkwoorden: verbs are scoped to the selected zone, not tier.
  const zoneVerbs = getVerbsInZone(selectedVerbZone, WERKWOORDEN_DATA);
  const unseenVerbs = zoneVerbs.filter(v => !seenSet.has(`verb-${v.infinitief}`));
  const prioritizedVerbs = unseenVerbs.length > 0
    ? [...unseenVerbs, ...zoneVerbs.filter(v => seenSet.has(`verb-${v.infinitief}`))]
    : zoneVerbs;
  const currentVerb: VerbItem = prioritizedVerbs[currentVerbIndex % prioritizedVerbs.length] || WERKWOORDEN_DATA[0];

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

  return (
    <div className={`min-h-screen bg-slate-100/90 text-slate-900 flex flex-col ${fontClass} ${sizeClass} relative selection:bg-emerald-200 selection:text-emerald-950 pb-12`}>
      {/* Background ambient gentle particles */}
      <AmbientParticles biome={selectedBiome} />

      {/* Accessibility Helper Bar */}
      <div className="pt-2">
        <AccessibilityBar
          settings={profile.accessibility}
          onOpenVoiceModal={() => setShowVoiceModal(true)}
          onOpenDictionaryModal={() => setShowDictionaryModal(true)}
          onChangeSettings={(updater) => {
            setProfile(prev => ({
              ...prev,
              accessibility: updater(prev.accessibility)
            }));
          }}
        />
      </div>

      {/* Top Application Header Bar */}
      <TopBar
        playerName={profile.name}
        avatarEmoji={profile.avatarEmoji}
        avatarTitle={profile.avatarTitle}
        tocaCustomization={(profile.customization as any)?.toca}
        onOpenProfileModal={() => setShowProfileModal(true)}
        onOpenLoginModal={() => setShowLoginModal(true)}
        onOpenScoreboardModal={() => setShowScoreboardModal(true)}
        onOpenReadingModal={() => setShowReadingModal(true)}
        onOpenReporterModal={() => setShowReporterModal(true)}
        onOpenSpellingFactoryModal={() => setShowSpellingFactoryModal(true)}
        onOpenSisterTeamModal={() => setShowSisterTeamModal(true)}
        onOpenWardrobeModal={() => setShowWardrobeModal(true)}
        onOpenVersionModal={() => setShowVersionModal(true)}
        onOpenVetHospitalModal={() => setShowVetHospitalModal(true)}
        onOpenCitoRpgModal={() => setShowCitoRpgModal(true)}
        onOpenVoiceModal={() => setShowVoiceModal(true)}
        onOpenDictionaryModal={() => setShowDictionaryModal(true)}
        onOpenArcadeModal={() => setShowArcadeModal(true)}
        stars={profile.stars}
        score={profile.score}
        streak={profile.streak}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        unlockedCount={unlockedCount}
        totalAnimals={totalAnimals}
        selectedGrade={profile.selectedGrade}
        selectedBiome={selectedBiome}
        onOpenGradeSelector={() => setShowGradeModal(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 py-2 sm:py-3 space-y-4">
        
        <main className="space-y-4">
          
          {/* TAB 1: ADVENTURE & EXPEDITION MODE */}
          {activeTab === 'adventure' && (
            <div className="space-y-4">
              
              {/* 1. Quick Sister Switcher Banner (1-tap between Ridheya Gr 5 & Hemali Gr 8) */}
              <div className="bg-slate-900/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 border border-white/15 shadow-md flex items-center justify-between gap-2.5 flex-wrap">
                <div className="flex items-center gap-2 pl-1">
                  <span className="text-xs font-black uppercase text-amber-400 tracking-wider flex items-center gap-1.5">
                    <span>👑</span>
                    <span>Kies Avonturier:</span>
                  </span>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => {
                      if (currentUsername.toLowerCase() !== 'ridheya') {
                        sound.playPop();
                        handleSwitchUser('ridheya');
                        setIsExpeditionActive(false);
                      }
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
                      currentUsername.toLowerCase() === 'ridheya'
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md scale-102 ring-2 ring-emerald-300'
                        : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                    }`}
                  >
                    <span className="text-sm">🩺</span>
                    <div className="text-left leading-tight">
                      <div className="font-black">Ridheya (Groep 5)</div>
                      <div className="text-[10px] text-emerald-100 font-medium opacity-90">Dierenarts &amp; AVI M3-E4</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      if (currentUsername.toLowerCase() !== 'hemali') {
                        sound.playPop();
                        handleSwitchUser('hemali');
                        setIsExpeditionActive(false);
                      }
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
                      currentUsername.toLowerCase() === 'hemali'
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md scale-102 ring-2 ring-indigo-300'
                        : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                    }`}
                  >
                    <span className="text-sm">✨</span>
                    <div className="text-left leading-tight">
                      <div className="font-black">Hemali (Groep 8)</div>
                      <div className="text-[10px] text-indigo-100 font-medium opacity-90">Cito Master &amp; Doorstroomtoets</div>
                    </div>
                  </button>
                </div>
              </div>

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
                          <span className="text-emerald-400">• Level {currentBiomeLevelIdx + 1}: {currentLevel.title}</span>
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
                          Groep 6-7-8 Modus:
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
                      chapterTitle={currentLevel.title}
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
                        selectedTier={selectedVerbTier}
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
                      />
                    </>
                  )}
                </div>
              ) : (
                /* VIEW B: CLEAN HOME HUB (Story Quest, Active Expedition Card & 4 Bento Modules) */
                <div className="space-y-4">
                  {/* 2. Hero Interactive Comic & Cutscene Story Quest Card */}
                  <div 
                    onClick={() => {
                      sound.playPop();
                      setShowCitoRpgModal(true);
                    }}
                    className={`rounded-3xl p-5 sm:p-6 shadow-xl border-2 text-white flex flex-col sm:flex-row items-center justify-between gap-5 cursor-pointer transition-all hover:scale-[1.01] active:scale-99 group relative overflow-hidden ${
                      currentUsername.toLowerCase() === 'ridheya'
                        ? 'bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-950 border-emerald-400/50 shadow-emerald-950/30'
                        : 'bg-gradient-to-r from-indigo-950 via-purple-950 to-slate-950 border-purple-400/50 shadow-purple-950/30'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-3xl sm:text-4xl shadow-inner flex-shrink-0 group-hover:scale-110 transition-transform">
                        {currentUsername.toLowerCase() === 'ridheya' ? '🩺' : '✨'}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="bg-amber-400 text-slate-950 text-[10px] sm:text-xs font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-slate-950" />
                            Interactief RPG Avontuur met Cutscenes
                          </span>
                          <span className="text-xs text-amber-200 font-bold">
                            {currentUsername.toLowerCase() === 'ridheya' ? 'Groep 5 • Dierenredding Avontuur' : 'Groep 8 • Doorstroomtoets & Cito'}
                          </span>
                        </div>
                        <h3 className="text-base sm:text-xl font-black text-white tracking-tight">
                          {currentUsername.toLowerCase() === 'ridheya'
                            ? 'Het Geheim van de Boomhut Dierenkliniek & De Dierenvallei 🐾'
                            : 'Het Verloren Astrolabium & Het Mysterie van de Cito Tijdwachters 📜'}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-200/90 font-medium line-clamp-2 mt-1">
                          {currentUsername.toLowerCase() === 'ridheya'
                            ? 'Reis met Ridheya en hondje Kopi door het oerwoud, ontdek moeilijke woorden met het pop-up woordenboek en genees dieren!'
                            : 'Ontrafel cryptische manuscripten, kraak moeilijke signaalwoorden (desondanks, daarentegen) en kies je eigen verhaalroute!'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end flex-shrink-0">
                      <button className="w-full sm:w-auto bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-xs sm:text-sm px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap">
                        <Play className="w-4 h-4 fill-current" />
                        <span>Speel Verhaal ➔</span>
                      </button>
                    </div>
                  </div>

                  {/* 3. Linked Safari Expeditie Launch Card */}
                  <div className="bg-white/95 backdrop-blur-md rounded-3xl p-4 sm:p-5 border border-emerald-200/80 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4 w-full md:w-auto">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center text-3xl sm:text-4xl shadow-md flex-shrink-0">
                        {activeBiomeConfig.emoji}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] sm:text-xs font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                            🦁 Actieve Safari Expeditie
                          </span>
                          <span className="text-xs font-bold text-slate-500">
                            Level {currentBiomeLevelIdx + 1} van {biomeLevels.length}
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-black text-slate-900">
                          {activeBiomeConfig.name}: {currentLevel.title}
                        </h3>
                        <p className="text-xs text-slate-600 font-medium">
                          Dierbeloning: <strong className="text-emerald-700">{currentLevel.animalReward.name} {currentLevel.animalReward.emoji}</strong> ({currentLevel.animalReward.rarity}) • {currentLevel.questions.length} vragen
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 w-full md:w-auto justify-end flex-wrap sm:flex-nowrap">
                      <button
                        onClick={() => {
                          sound.playPop();
                          setActiveTab('map');
                        }}
                        className="px-3.5 py-2.5 rounded-2xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs cursor-pointer transition-all flex items-center gap-1.5 whitespace-nowrap shadow-xs"
                        title="Bekijk de 7 werelddelen op de wereldkaart"
                      >
                        <Compass className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Wereldkaart 🗺️</span>
                      </button>

                      <button
                        onClick={() => {
                          sound.playPop();
                          setIsExpeditionActive(true);
                        }}
                        className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs sm:text-sm px-5 py-2.5 sm:py-3 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap active:scale-95"
                      >
                        <Play className="w-4 h-4 fill-current" />
                        <span>Start {activeBiomeConfig.name} ➔</span>
                      </button>
                    </div>
                  </div>

                  {/* 4. The 4 Core Game Bento Modules */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    
                    {/* Card 1: Safari Arcade Arena */}
                    <div
                      id="bento-arcade-card"
                      onClick={() => {
                        sound.playPop();
                        setShowArcadeModal(true);
                      }}
                      className="bg-gradient-to-br from-slate-900 via-purple-950 to-indigo-950 border border-pink-500/40 rounded-2xl p-3.5 text-white flex flex-col justify-between gap-3 shadow-md hover:border-pink-300 transition-all hover:scale-[1.02] cursor-pointer group"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xl p-1.5 rounded-xl bg-pink-500/20 border border-pink-400/30 group-hover:rotate-6 transition-transform">
                            🕹️
                          </span>
                          <span className="text-[10px] font-black uppercase bg-pink-500/30 text-pink-200 px-2 py-0.5 rounded-full animate-pulse">
                            15s Blitz ⚡
                          </span>
                        </div>
                        <h4 className="text-sm font-black text-white group-hover:text-pink-300 transition-colors">
                          Safari Arcade Arena
                        </h4>
                        <p className="text-xs text-slate-300 font-medium">
                          Ballon Popper, Woord Sprint &amp; Cito Turbo Dash!
                        </p>
                      </div>
                      
                      <div className="pt-2 flex items-center justify-between text-xs font-black text-pink-300 border-t border-white/10">
                        <span>Speel Arcade</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                    {/* Card 2: Poké-Boss Duel Arena */}
                    <div
                      id="bento-boss-card"
                      onClick={() => {
                        sound.playPop();
                        setShowBossArenaModal(true);
                      }}
                      className="bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 border border-amber-500/40 rounded-2xl p-3.5 text-white flex flex-col justify-between gap-3 shadow-md hover:border-amber-400/80 transition-all hover:scale-[1.02] cursor-pointer group"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xl p-1.5 rounded-xl bg-amber-500/20 border border-amber-400/30 group-hover:rotate-6 transition-transform">
                            ⚔️
                          </span>
                          <span className="text-[10px] font-black uppercase bg-amber-500/30 text-amber-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <span>🔴</span>
                            <span>Poké-Duel</span>
                          </span>
                        </div>
                        <h4 className="text-sm font-black text-white group-hover:text-amber-300 transition-colors">
                          Poké-Boss Duel Arena
                        </h4>
                        <p className="text-xs text-slate-300 font-medium">
                          Vecht tegen de DT-Draak, 't Kofschip &amp; de Klanken-Golem!
                        </p>
                      </div>
                      
                      <div className="pt-2 flex items-center justify-between text-xs font-black text-amber-300 border-t border-white/10">
                        <span>Start Poké-Gevecht</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                    {/* Card 3: Tamagotchi Pet Sanctuary */}
                    <div
                      id="bento-tamagotchi-card"
                      onClick={() => {
                        sound.playPop();
                        setShowTamagotchiModal(true);
                      }}
                      className="bg-gradient-to-br from-slate-900 to-emerald-950 border border-emerald-500/40 rounded-2xl p-3.5 text-white flex flex-col justify-between gap-3 shadow-md hover:border-emerald-400/60 transition-all hover:scale-[1.02] cursor-pointer group"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xl p-1.5 rounded-xl bg-emerald-500/20 border border-emerald-400/30 group-hover:rotate-6 transition-transform">
                            🐾
                          </span>
                          <span className="text-[10px] font-black uppercase bg-emerald-500/30 text-emerald-200 px-2 py-0.5 rounded-full">
                            Dierenzorg
                          </span>
                        </div>
                        <h4 className="text-sm font-black text-white group-hover:text-emerald-300 transition-colors">
                          Dierenkamer
                        </h4>
                        <p className="text-xs text-slate-300 font-medium">
                          Verzorg, aai en voed je huisdier in de Dierenkamer!
                        </p>
                      </div>

                      <div className="pt-2 flex items-center justify-between text-xs font-black text-emerald-300 border-t border-white/10">
                        <span>Dierenkamer Openen</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                    {/* Card 4: Interactive Dutch Dictionary & Cito Lab */}
                    <div
                      id="bento-dict-card"
                      onClick={() => {
                        sound.playPop();
                        setShowDictionaryModal(true);
                      }}
                      className="bg-gradient-to-br from-slate-900 to-amber-950 border border-amber-500/40 rounded-2xl p-3.5 text-white flex flex-col justify-between gap-3 shadow-md hover:border-amber-400/60 transition-all hover:scale-[1.02] cursor-pointer group"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xl p-1.5 rounded-xl bg-amber-500/20 border border-amber-400/30 group-hover:rotate-6 transition-transform">
                            📚
                          </span>
                          <span className="text-[10px] font-black uppercase bg-amber-500/30 text-amber-200 px-2 py-0.5 rounded-full">
                            Woordenboek
                          </span>
                        </div>
                        <h4 className="text-sm font-black text-white group-hover:text-amber-300 transition-colors">
                          Nederlands Woordenboek
                        </h4>
                        <p className="text-xs text-slate-300 font-medium">
                          7-traps woordontleding, Cito signaalwoorden &amp; synoniemen!
                        </p>
                      </div>

                      <div className="pt-2 flex items-center justify-between text-xs font-black text-amber-300 border-t border-white/10">
                        <span>Woordenboek</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                  </div>
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
          <span>7 Wereldlocaties • 42 Dieren • Groep 4-5 &amp; Groep 6-7-8</span>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => setShowLoginModal(true)}
            className="text-slate-700 hover:text-emerald-800 font-bold text-[11px] flex items-center gap-1.5 bg-white/90 hover:bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-xs cursor-pointer"
          >
            <Users className="w-3.5 h-3.5 text-emerald-600" />
            <span>Speler: {profile.name} ({profile.avatarEmoji})</span>
          </button>

          <button
            onClick={() => setShowScoreboardModal(true)}
            className="text-indigo-800 hover:text-indigo-950 font-bold text-[11px] flex items-center gap-1.5 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-xl border border-indigo-200 shadow-xs cursor-pointer"
          >
            <BarChart3 className="w-3.5 h-3.5 text-indigo-600" />
            <span>Ouder Scorebord</span>
          </button>

          <button
            onClick={() => setShowCitoRpgModal(true)}
            className="text-emerald-800 hover:text-emerald-950 font-black uppercase text-[11px] flex items-center gap-1 bg-emerald-100/80 hover:bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-300 shadow-xs cursor-pointer"
          >
            <span>🗺️ Cito RPG &amp; Toets</span>
          </button>

          <a
            href="/boerin_tess_safari.html"
            download="Boerin_Tess_Safaripark_Spel.html"
            className="text-slate-800 hover:text-slate-950 font-black uppercase text-[11px] flex items-center gap-1 bg-white/80 hover:bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-xs"
          >
            <span>📥 Offline HTML</span>
          </a>

          <button
            id="reset-game-btn"
            onClick={handleResetProgress}
            className="text-slate-400 hover:text-rose-600 flex items-center gap-1 cursor-pointer transition-colors font-bold uppercase text-[11px]"
            title="Herstart voortgang vanaf level 1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Herstart</span>
          </button>
        </div>
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

      {/* Reading Adventure Modal */}
      <ReadingAdventureModal
        isOpen={showReadingModal}
        profile={profile}
        onClose={() => setShowReadingModal(false)}
        onUpdateProfile={(updater) => setProfile(updater)}
      />

      {/* Hemali Safari Reporter Modal */}
      <HemaliReporterModal
        isOpen={showReporterModal}
        profile={profile}
        onClose={() => setShowReporterModal(false)}
        onUpdateProfile={(updater) => setProfile(updater)}
      />

      {/* Ridheya Spelling Factory Modal */}
      <RidheyaSpellingFactoryModal
        isOpen={showSpellingFactoryModal}
        profile={profile}
        onClose={() => setShowSpellingFactoryModal(false)}
        onUpdateProfile={(updater) => setProfile(updater)}
      />

      {/* Sister Team Cooperative Quest Modal */}
      <SisterTeamModal
        isOpen={showSisterTeamModal}
        profile={profile}
        onClose={() => setShowSisterTeamModal(false)}
        onOpenHemaliMission={() => setShowReporterModal(true)}
        onOpenRidheyaMission={() => setShowSpellingFactoryModal(true)}
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

      {/* Veterinarian Animal Hospital Modal (Dokter Ridheya) */}
      <VeterinarianHospitalModal
        isOpen={showVetHospitalModal}
        onClose={() => setShowVetHospitalModal(false)}
        profile={profile}
        onUpdateProfile={(updater) => setProfile(updater)}
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
