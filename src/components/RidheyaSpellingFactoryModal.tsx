import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Volume2, CheckCircle2, ArrowRight, Lightbulb, 
  Sparkles, Filter, Shuffle, RefreshCw, Award, ChevronRight
} from 'lucide-react';
import { SpellingFactoryItem, PlayerProfile } from '../types';
import { COMPREHENSIVE_SPELLING_FACTORY_ITEMS } from '../data/comprehensiveSpellingData';
import { sound } from '../services/soundService';
import { speech } from '../services/speechService';
import confetti from 'canvas-confetti';

interface RidheyaSpellingFactoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: PlayerProfile;
  onUpdateProfile: (updater: (prev: PlayerProfile) => PlayerProfile) => void;
}

type CategoryFilter = 'all' | 'klinkerdief' | 'dubbelzetter' | 'langermaak' | 'luchtwoord' | 'ij-ei-au-ou' | 'achtervoegsel' | 'samengesteld';

const CATEGORY_TABS: { id: CategoryFilter; label: string; icon: string }[] = [
  { id: 'all', label: 'Alle Categorieën', icon: '🌟' },
  { id: 'klinkerdief', label: 'Klinkerdief', icon: '🌴' },
  { id: 'dubbelzetter', label: 'Dubbelzetters', icon: '⚡' },
  { id: 'langermaak', label: 'Langermaak (-d/-t)', icon: '🐢' },
  { id: 'luchtwoord', label: 'Luchtwoorden (-cht)', icon: '🌙' },
  { id: 'ij-ei-au-ou', label: 'Weetwoorden', icon: '🦊' },
  { id: 'achtervoegsel', label: 'Achtervoegsels', icon: '✨' },
  { id: 'samengesteld', label: 'Samenstellingen', icon: '🔬' }
];

export const RidheyaSpellingFactoryModal: React.FC<RidheyaSpellingFactoryModalProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [streak, setStreak] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [sessionScore, setSessionScore] = useState(0);
  const [isArcadeBlitz, setIsArcadeBlitz] = useState(false);
  const [blitzTimeLeft, setBlitzTimeLeft] = useState(15);
  const blitzTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Filtered pool of items based on category
  const filteredItems = useMemo(() => {
    if (selectedCategory === 'all') {
      return COMPREHENSIVE_SPELLING_FACTORY_ITEMS;
    }
    return COMPREHENSIVE_SPELLING_FACTORY_ITEMS.filter(item => item.category === selectedCategory);
  }, [selectedCategory]);

  if (!isOpen) return null;

  const currentItem: SpellingFactoryItem = filteredItems[currentIndex] || filteredItems[0] || COMPREHENSIVE_SPELLING_FACTORY_ITEMS[0];

  const handleSpeakWord = () => {
    sound.playPop();
    speech.speak(currentItem.word, { rate: 0.85 });
  };

  const handleSpeakRule = () => {
    sound.playPop();
    speech.speak(currentItem.soundRule);
  };

  // Arcade Blitz Countdown Timer
  useEffect(() => {
    if (!isArcadeBlitz || isAnswered || showSummary) {
      if (blitzTimerRef.current) clearInterval(blitzTimerRef.current);
      return;
    }

    setBlitzTimeLeft(15);
    blitzTimerRef.current = setInterval(() => {
      setBlitzTimeLeft(prev => {
        if (prev <= 1) {
          // Time out!
          if (blitzTimerRef.current) clearInterval(blitzTimerRef.current);
          handleTimeOut();
          return 0;
        }
        if (prev <= 3) {
          sound.playArcadeTick();
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (blitzTimerRef.current) clearInterval(blitzTimerRef.current);
    };
  }, [currentIndex, isArcadeBlitz, isAnswered, showSummary]);

  const handleTimeOut = () => {
    if (isAnswered) return;
    sound.playError();
    setStreak(0);
    setIsAnswered(true);
    setSelectedOption('TIJD OM!');
  };

  const handleSelectOption = (opt: string) => {
    if (isAnswered) return;
    if (blitzTimerRef.current) clearInterval(blitzTimerRef.current);
    setSelectedOption(opt);
    setIsAnswered(true);

    const isCorrect = opt === currentItem.syllables[currentItem.missingIndex];

    if (isCorrect) {
      const nextStreak = streak + 1;
      setStreak(nextStreak);

      const comboMult = isArcadeBlitz ? (nextStreak >= 5 ? 3 : nextStreak >= 3 ? 2 : 1) : 1;
      const pts = 20 * comboMult;
      setSessionScore(prev => prev + pts);

      if (isArcadeBlitz) {
        sound.playArcadeCombo(nextStreak);
      } else {
        sound.playSuccess();
      }

      confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
      
      onUpdateProfile(prev => ({
        ...prev,
        score: prev.score + pts,
        coins: prev.coins + (isArcadeBlitz ? 15 : 10),
        mastery: {
          ...prev.mastery,
          spelling: Math.min(100, prev.mastery.spelling + 2),
          readingFluency: Math.min(100, prev.mastery.readingFluency + 1)
        }
      }));
    } else {
      sound.playError();
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredItems.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      sound.playVictory();
      confetti({ particleCount: 100, spread: 90 });
      setShowSummary(true);
    }
  };

  const handleCategoryChange = (cat: CategoryFilter) => {
    setSelectedCategory(cat);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setShowSummary(false);
    sound.playPop();
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setShowSummary(false);
    setSessionScore(0);
    setStreak(0);
    sound.playPop();
  };

  const isCurrentCorrect = selectedOption === currentItem.syllables[currentItem.missingIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl border border-amber-100 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 p-4 sm:p-5 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-3xl shadow-inner">
              🏭
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg sm:text-xl font-black">Spelling Fabriek</h3>
                <span className="text-[10px] font-black uppercase bg-white/20 px-2 py-0.5 rounded-full border border-white/30">
                  {filteredItems.length} Woorden Beschikbaar
                </span>
                {streak > 1 && (
                  <span className="text-[10px] font-black bg-amber-300 text-amber-950 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs animate-bounce">
                    🔥 {streak} Reeks!
                  </span>
                )}
              </div>
              <p className="text-xs text-amber-100 font-medium">
                Kies de juiste klankgroep en ontdek alle spellingregels
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              speech.stop();
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Scroll Filter Tabs + Arcade Blitz Toggle */}
        <div className="bg-amber-50/80 border-b border-amber-200/70 px-4 py-2 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 flex-1 overflow-x-auto no-scrollbar">
            {CATEGORY_TABS.map(tab => {
              const isSelected = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleCategoryChange(tab.id)}
                  className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap cursor-pointer transition-all flex items-center gap-1 ${
                    isSelected
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-amber-100/80 border border-slate-200/80'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => {
              sound.playPop();
              setIsArcadeBlitz(prev => !prev);
              setStreak(0);
            }}
            className={`px-3 py-1 rounded-full text-xs font-black whitespace-nowrap cursor-pointer transition-all flex items-center gap-1.5 border shadow-xs flex-shrink-0 ${
              isArcadeBlitz
                ? 'bg-purple-600 border-purple-400 text-white animate-pulse'
                : 'bg-white border-purple-300 text-purple-700 hover:bg-purple-50'
            }`}
            title="Schakel 15-seconden timer en combo multipliers in!"
          >
            <span>🕹️ Blitz:</span>
            <span>{isArcadeBlitz ? 'AAN ⚡' : 'UIT'}</span>
          </button>
        </div>

        {/* Body Content */}
        {!showSummary ? (
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-slate-500 uppercase tracking-wide">
                  Vraag {currentIndex + 1} van {filteredItems.length}
                </span>
                {currentItem.categoryLabel && (
                  <span className="text-[11px] font-bold text-amber-900 bg-amber-100/80 px-2 py-0.5 rounded-md border border-amber-200">
                    {currentItem.categoryLabel}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {isArcadeBlitz && (
                  <span className="text-xs font-black font-mono text-purple-700 bg-purple-100 px-2.5 py-1 rounded-full border border-purple-300">
                    ⏱️ {blitzTimeLeft}s
                  </span>
                )}
                <button
                  onClick={handleSpeakWord}
                  className="text-xs font-black text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full flex items-center gap-1.5 cursor-pointer hover:bg-amber-100 shadow-2xs transition-colors"
                >
                  <Volume2 className="w-4 h-4 text-amber-600" />
                  <span>Luister</span>
                </button>
              </div>
            </div>

            {/* Syllable Assembly Display */}
            <div className="bg-slate-50 p-6 rounded-3xl border-2 border-slate-200/80 flex flex-col items-center justify-center gap-4 shadow-inner relative overflow-hidden">
              {/* Arcade Countdown Bar */}
              {isArcadeBlitz && (
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-200">
                  <motion.div
                    className={`h-full ${blitzTimeLeft <= 3 ? 'bg-rose-500' : 'bg-purple-600'}`}
                    animate={{ width: `${(blitzTimeLeft / 15) * 100}%` }}
                    transition={{ ease: 'linear', duration: 0.2 }}
                  />
                </div>
              )}
              <div className="text-3xl mb-1">{currentItem.emoji || '✨'}</div>
              <div className="flex items-center gap-2 flex-wrap justify-center">
                {currentItem.syllables.map((syl, sIdx) => {
                  const isMissing = sIdx === currentItem.missingIndex;
                  return (
                    <div
                      key={sIdx}
                      className={`h-14 px-4 min-w-[56px] rounded-2xl border-2 flex items-center justify-center font-black text-xl sm:text-2xl transition-all shadow-sm ${
                        isMissing
                          ? selectedOption
                            ? isCurrentCorrect
                              ? 'bg-emerald-100 border-emerald-500 text-emerald-950 scale-105'
                              : 'bg-red-100 border-red-500 text-red-950 animate-shake'
                            : 'bg-amber-100 border-dashed border-amber-400 text-amber-900 animate-pulse'
                          : 'bg-white border-slate-300 text-slate-800'
                      }`}
                    >
                      {isMissing ? selectedOption || '???' : syl}
                    </div>
                  );
                })}
              </div>

              <p className="text-xs sm:text-sm text-slate-600 italic text-center max-w-md bg-white/80 py-1.5 px-3 rounded-xl border border-slate-200">
                "{currentItem.exampleSentence}"
              </p>
            </div>

            {/* Options Grid */}
            <div className="space-y-2">
              <span className="text-xs font-black text-slate-700">Kies het juiste ontbrekende stukje:</span>
              <div className="grid grid-cols-2 gap-3">
                {currentItem.options.map((opt, optIdx) => {
                  const isThisOpt = selectedOption === opt;
                  let btnStyle = 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 shadow-2xs hover:border-amber-300';

                  if (isAnswered) {
                    if (opt === currentItem.syllables[currentItem.missingIndex]) {
                      btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-black shadow-md';
                    } else if (isThisOpt) {
                      btnStyle = 'bg-red-100 border-red-400 text-red-950 shadow-inner';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={isAnswered}
                      onClick={() => handleSelectOption(opt)}
                      className={`p-4 rounded-2xl border-2 text-center text-lg sm:text-xl font-black cursor-pointer transition-all ${btnStyle}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sound Rule Hint Box */}
            <div className="bg-amber-50/90 p-4 rounded-2xl border border-amber-200/90 space-y-1.5 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-amber-950 flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  <span>Spellingregel &amp; Klankvoet</span>
                </span>
                <button
                  onClick={handleSpeakRule}
                  className="text-[11px] font-black text-amber-800 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Lees Regel</span>
                </button>
              </div>
              <p className="text-xs text-amber-900 font-medium leading-relaxed">
                {currentItem.soundRule}
              </p>
            </div>

            {/* Action Bar */}
            {isAnswered && (
              <div className="flex justify-between items-center pt-2">
                <div className="flex items-center gap-2">
                  {isCurrentCorrect ? (
                    <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Uitstekend gespeld! (+20 XP)
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-red-700 bg-red-50 px-3 py-1.5 rounded-xl border border-red-200">
                      Het juiste antwoord is "{currentItem.syllables[currentItem.missingIndex]}"
                    </span>
                  )}
                </div>

                <button
                  onClick={handleNext}
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl font-black text-sm flex items-center gap-2 cursor-pointer shadow-md transition-all active:scale-95"
                >
                  <span>
                    {currentIndex < filteredItems.length - 1 ? 'Volgende Woord ➔' : 'Bekijk Resultaat 🏆'}
                  </span>
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Summary Screen when all items in category are finished */
          <div className="p-6 sm:p-8 text-center space-y-5 overflow-y-auto">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-4xl shadow-md animate-bounce">
              🏆
            </div>
            
            <div className="space-y-1">
              <h3 className="text-2xl font-black text-slate-800">
                Geweldig gewerkt, Spellingkampioen!
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Je hebt alle {filteredItems.length} woorden uit deze categorie met succes doorlopen!
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
              <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200">
                <span className="text-xs text-amber-800 font-bold block">Behaalde Score</span>
                <span className="text-2xl font-black text-amber-950">+{sessionScore} XP</span>
              </div>
              <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-200">
                <span className="text-xs text-emerald-800 font-bold block">Woorden Geleerd</span>
                <span className="text-2xl font-black text-emerald-950">{filteredItems.length}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={handleRestart}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Opnieuw Spelen</span>
              </button>

              <button
                onClick={() => {
                  setSelectedCategory('all');
                  handleRestart();
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all"
              >
                <span>Alle 37 Woorden Oefenen 🚀</span>
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
