import React, { useState, useEffect } from 'react';
import { TopBar } from './components/TopBar';
import { QuizCard } from './components/QuizCard';
import { VerbQuizCard } from './components/VerbQuizCard';
import { AnimalSanctuary } from './components/AnimalSanctuary';
import { BadgeShowcase } from './components/BadgeShowcase';
import { LevelRoadmap } from './components/LevelRoadmap';
import { RewardModal } from './components/RewardModal';
import { GradeSelectorModal } from './components/GradeSelectorModal';
import { GradeSwitcherBar } from './components/GradeSwitcherBar';
import { ProfileAvatarModal } from './components/ProfileAvatarModal';
import { LoginModal } from './components/LoginModal';
import { ParentScoreboardModal } from './components/ParentScoreboardModal';
import { BiomeSelector } from './components/BiomeSelector';
import { AmbientParticles } from './components/AmbientParticles';
import { INITIAL_BADGES } from './data/gameData';
import { BIOMES, ALL_BIOME_ANIMALS } from './data/biomeData';
import { BIOME_LEVELS_GROEP_4_5 } from './data/biomeLevels45';
import { BIOME_LEVELS_GROEP_6_8 } from './data/biomeLevels68';
import { WERKWOORDEN_DATA } from './data/werkwoorden';
import { Animal, Badge, PlayerProfile, GradeLevel, VerbItem, BiomeType } from './types';
import { sound } from './services/soundService';
import { 
  getActiveUsername, 
  setActiveUsername, 
  loadUserProfile, 
  saveUserProfile, 
  appendActivityLog 
} from './services/authService';
import { Map, RotateCcw, Sparkles, Zap, BookOpen, Compass, Download, User, BarChart3, Users } from 'lucide-react';

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
  const [activeTab, setActiveTab] = useState<'adventure' | 'sanctuary' | 'badges' | 'map'>('adventure');
  
  // Modals state
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [showGradeModal, setShowGradeModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showScoreboardModal, setShowScoreboardModal] = useState(false);
  
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
  const handleSaveProfile = (name: string, avatarId: string, avatarEmoji: string, avatarTitle: string) => {
    setProfile(prev => ({
      ...prev,
      name,
      avatarId,
      avatarEmoji,
      avatarTitle,
      hasCustomizedAvatar: true
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

  // Active Biome Config & Levels depending on Selected Grade
  const activeBiomeConfig = BIOMES.find(b => b.id === selectedBiome) || BIOMES[0];
  const levelsByGrade = profile.selectedGrade === 'group_4_5'
    ? BIOME_LEVELS_GROEP_4_5
    : BIOME_LEVELS_GROEP_6_8;
  const biomeLevels = levelsByGrade[selectedBiome] || levelsByGrade.farm;
  const currentBiomeLevelIdx = profile.biomeProgress?.[selectedBiome] ?? (profile.currentLevelIndex % biomeLevels.length);
  const currentLevel = biomeLevels[currentBiomeLevelIdx % biomeLevels.length] || biomeLevels[0];
  const currentQuestion = currentLevel.questions[currentQuestionIndex % currentLevel.questions.length] || currentLevel.questions[0];

  // Group 6-8 Extra Verb Trainer
  const filteredVerbs = selectedVerbTier === 'all'
    ? WERKWOORDEN_DATA
    : WERKWOORDEN_DATA.filter(v => v.tier === selectedVerbTier);
  const currentVerb: VerbItem = filteredVerbs[currentVerbIndex % filteredVerbs.length] || filteredVerbs[0];

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

      const logged = appendActivityLog(
        prev,
        currentQuestion.question,
        currentQuestion.category,
        activeBiomeConfig.name,
        true,
        pointsEarned * bonusMultiplier
      );

      const nextProfile: PlayerProfile = {
        ...logged,
        score: totalCoins,
        stars: totalStars,
        streak: newStreak,
        highestStreak: Math.max(prev.highestStreak, newStreak),
        totalCorrect: prev.totalCorrect + 1,
        totalAnswered: prev.totalAnswered + 1
      };

      evaluateBadges(nextProfile);
      return nextProfile;
    });
  };

  // Handler: Answer Incorrect
  const handleAnswerIncorrect = () => {
    setProfile(prev => {
      const logged = appendActivityLog(
        prev,
        currentQuestion.question,
        currentQuestion.category,
        activeBiomeConfig.name,
        false,
        0
      );

      return {
        ...logged,
        streak: 0,
        totalAnswered: prev.totalAnswered + 1
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

      const curBiomeIdx = profile.biomeProgress?.[selectedBiome] ?? (profile.currentLevelIndex % biomeLevels.length);
      const nextBiomeLevelIndex = Math.min(curBiomeIdx + 1, biomeLevels.length - 1);
      const nextLevelIndex = Math.min(profile.currentLevelIndex + 1, biomeLevels.length - 1);

      setProfile(prev => {
        const next: PlayerProfile = {
          ...prev,
          stars: prev.stars + 50,
          score: prev.score + 50,
          unlockedAnimals: updatedUnlocked,
          currentLevelIndex: nextLevelIndex,
          biomeProgress: {
            ...(prev.biomeProgress || {}),
            [selectedBiome]: nextBiomeLevelIndex
          }
        };
        evaluateBadges(next);
        return next;
      });

      setJustUnlockedAnimal(rewardAnimal);
      setShowRewardModal(true);
      setCurrentQuestionIndex(0);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  // Handler: Next Verb in Arena Mode
  const handleNextVerb = () => {
    const nextIdx = currentVerbIndex + 1;
    if (nextIdx % 4 === 0) {
      const nextLockedAnimal = ALL_BIOME_ANIMALS.find(a => !profile.unlockedAnimals.includes(a.id));
      if (nextLockedAnimal) {
        setProfile(prev => ({
          ...prev,
          stars: prev.stars + 50,
          score: prev.score + 50,
          unlockedAnimals: [...prev.unlockedAnimals, nextLockedAnimal.id]
        }));
        setJustUnlockedAnimal(nextLockedAnimal);
        setShowRewardModal(true);
      }
    }
    setCurrentVerbIndex(nextIdx);
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

  return (
    <div className="min-h-screen bg-slate-100/90 text-slate-900 flex flex-col font-sans relative selection:bg-emerald-200 selection:text-emerald-950 pb-12">
      {/* Background ambient gentle particles */}
      <AmbientParticles biome={selectedBiome} />

      {/* Top Application Header Bar */}
      <TopBar
        playerName={profile.name}
        avatarEmoji={profile.avatarEmoji}
        avatarTitle={profile.avatarTitle}
        onOpenProfileModal={() => setShowProfileModal(true)}
        onOpenLoginModal={() => setShowLoginModal(true)}
        onOpenScoreboardModal={() => setShowScoreboardModal(true)}
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
      <div className="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 py-2 sm:py-3">
        
        {/* Prominent Grade Switcher Bar with Description */}
        <GradeSwitcherBar
          selectedGrade={profile.selectedGrade}
          onSelectGrade={handleSelectGrade}
          onOpenModal={() => setShowGradeModal(true)}
        />

        <main className="space-y-4">
          
          {/* TAB 1: ADVENTURE & EXPEDITION MODE */}
          {activeTab === 'adventure' && (
            <div className="space-y-4">
              
              {/* 1. Global Biome Location Switcher (7 Biomes) */}
              <BiomeSelector
                selectedBiome={selectedBiome}
                onSelectBiome={handleSelectBiome}
                unlockedCountByBiome={unlockedCountByBiome}
                totalCountByBiome={totalCountByBiome}
              />

              {/* 2. Sub-Toggle for Groep 6-7-8 (Expedition vs Verb Arena) */}
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

              {/* 3. Render Quiz or Verb Arena */}
              {profile.selectedGrade === 'group_4_5' || groep68Mode === 'expedition' ? (
                /* Primary Unified Expeditie Quiz for Both Grades */
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
                /* Groep 6-7-8 Special Sterke Werkwoorden Arena */
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
                  totalVerbsAvailable={filteredVerbs.length}
                  currentVerbIndex={currentVerbIndex}
                />
              )}
            </div>
          )}

          {/* TAB 2: ANIMAL SANCTUARY (DIERENPARK) */}
          {activeTab === 'sanctuary' && (
            <AnimalSanctuary
              animals={animals}
              score={profile.score}
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
          <span>🌍 Wereld Safaripark & Boerderij</span>
          <span>•</span>
          <span>7 Wereldlocaties • 42 Dieren • Groep 4-5 & Groep 6-7-8</span>
        </div>

        <div className="flex items-center gap-3">
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

          <a
            href="/boerin_tess_safari.html"
            download="Boerin_Tess_Safaripark_Spel.html"
            className="text-emerald-800 hover:text-emerald-950 font-black uppercase text-[11px] flex items-center gap-1 bg-white/80 hover:bg-white px-3 py-1.5 rounded-xl border border-emerald-200 shadow-xs"
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

      {/* Parent Scoreboard & Progress Modal */}
      <ParentScoreboardModal
        isOpen={showScoreboardModal}
        onClose={() => setShowScoreboardModal(false)}
        onSelectUser={handleSwitchUser}
      />

      {/* Grade Level Selection Modal */}
      <GradeSelectorModal
        isOpen={showGradeModal}
        selectedGrade={profile.selectedGrade}
        onSelectGrade={handleSelectGrade}
        onClose={() => setShowGradeModal(false)}
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
    </div>
  );
}
