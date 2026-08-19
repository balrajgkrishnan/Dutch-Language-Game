import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Wrench, Sparkles, Volume2, CheckCircle2, ArrowRight, Lightbulb } from 'lucide-react';
import { SpellingFactoryItem, PlayerProfile } from '../types';
import { RIDHEYA_SPELLING_FACTORY_ITEMS } from '../data/specialMissionsData';
import { sound } from '../services/soundService';
import { speech } from '../services/speechService';
import confetti from 'canvas-confetti';

interface RidheyaSpellingFactoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: PlayerProfile;
  onUpdateProfile: (updater: (prev: PlayerProfile) => PlayerProfile) => void;
}

export const RidheyaSpellingFactoryModal: React.FC<RidheyaSpellingFactoryModalProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  if (!isOpen) return null;

  const currentItem = RIDHEYA_SPELLING_FACTORY_ITEMS[currentIndex] || RIDHEYA_SPELLING_FACTORY_ITEMS[0];

  const handleSpeakWord = () => {
    sound.playPop();
    speech.speak(currentItem.word, { rate: 0.85 });
  };

  const handleSpeakRule = () => {
    sound.playPop();
    speech.speak(currentItem.soundRule);
  };

  const handleSelectOption = (opt: string) => {
    if (isAnswered) return;
    setSelectedOption(opt);
    setIsAnswered(true);

    const isCorrect = opt === currentItem.syllables[currentItem.missingIndex];

    if (isCorrect) {
      sound.playSuccess();
      confetti({ particleCount: 50, spread: 60 });
      onUpdateProfile(prev => ({
        ...prev,
        score: prev.score + 20,
        coins: prev.coins + 10,
        mastery: {
          ...prev.mastery,
          spelling: Math.min(100, prev.mastery.spelling + 3),
          readingFluency: Math.min(100, prev.mastery.readingFluency + 2)
        }
      }));
    } else {
      sound.playError();
    }
  };

  const handleNext = () => {
    if (currentIndex < RIDHEYA_SPELLING_FACTORY_ITEMS.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      sound.playVictory();
      confetti({ particleCount: 90, spread: 80 });
      onClose();
    }
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
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-4 sm:p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-3xl">
              🏭
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black">Spelling Fabriek</h3>
                <span className="text-[10px] font-black uppercase bg-white/20 px-2 py-0.5 rounded-full">
                  Ridheya Modus 🐒
                </span>
              </div>
              <p className="text-xs text-amber-100 font-medium">
                Bouw woorden &amp; ontdek lastige klankregels
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

        {/* Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-500 uppercase tracking-wide">
              Woord {currentIndex + 1} van {RIDHEYA_SPELLING_FACTORY_ITEMS.length}
            </span>
            <button
              onClick={handleSpeakWord}
              className="text-xs font-black text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full flex items-center gap-1 cursor-pointer hover:bg-amber-100"
            >
              <Volume2 className="w-4 h-4" />
              <span>Luister naar hele woord</span>
            </button>
          </div>

          {/* Syllable Assembly Display */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col items-center justify-center gap-4">
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {currentItem.syllables.map((syl, sIdx) => {
                const isMissing = sIdx === currentItem.missingIndex;
                return (
                  <div
                    key={sIdx}
                    className={`h-14 px-4 rounded-2xl border-2 flex items-center justify-center font-black text-xl sm:text-2xl transition-all ${
                      isMissing
                        ? selectedOption
                          ? isCurrentCorrect
                            ? 'bg-emerald-100 border-emerald-500 text-emerald-950'
                            : 'bg-red-100 border-red-500 text-red-950'
                          : 'bg-amber-100 border-dashed border-amber-400 text-amber-900 animate-pulse'
                        : 'bg-white border-slate-300 text-slate-800'
                    }`}
                  >
                    {isMissing ? selectedOption || '???' : syl}
                  </div>
                );
              })}
            </div>

            <p className="text-xs text-slate-600 italic">
              "{currentItem.exampleSentence}"
            </p>
          </div>

          {/* Options Grid */}
          <div className="space-y-2">
            <span className="text-xs font-black text-slate-700">Kies het juiste ontbrekende stukje:</span>
            <div className="grid grid-cols-2 gap-3">
              {currentItem.options.map((opt, optIdx) => {
                const isThisOpt = selectedOption === opt;
                let btnStyle = 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800';

                if (isAnswered) {
                  if (opt === currentItem.syllables[currentItem.missingIndex]) {
                    btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-black';
                  } else if (isThisOpt) {
                    btnStyle = 'bg-red-100 border-red-400 text-red-950';
                  }
                }

                return (
                  <button
                    key={optIdx}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(opt)}
                    className={`p-4 rounded-2xl border-2 text-center text-lg font-black cursor-pointer transition-all ${btnStyle}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sound Rule Hint Box */}
          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-amber-950 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <span>Spellingregel &amp; Klankvoet</span>
              </span>
              <button
                onClick={handleSpeakRule}
                className="text-[11px] font-black text-amber-800 hover:underline flex items-center gap-0.5 cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Lees Regel</span>
              </button>
            </div>
            <p className="text-xs text-amber-900 font-medium">
              {currentItem.soundRule}
            </p>
          </div>

          {isAnswered && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl font-black text-sm flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>Volgende Woord ➔</span>
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
