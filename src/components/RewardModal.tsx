import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, Star, ArrowRight, Award } from 'lucide-react';
import { Animal, Badge } from '../types';
import { sound } from '../services/soundService';
import { AnimalAvatar } from './AnimalAvatar';

interface RewardModalProps {
  isOpen: boolean;
  animal: Animal;
  levelNumber: number;
  newBadges: Badge[];
  earnedStars: number;
  onClose: () => void;
  onGoToSanctuary: () => void;
}

export const RewardModal: React.FC<RewardModalProps> = ({
  isOpen,
  animal,
  levelNumber,
  newBadges,
  earnedStars,
  onClose,
  onGoToSanctuary
}) => {
  useEffect(() => {
    if (isOpen) {
      sound.playFanfare();

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });

        setTimeout(() => {
          confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
          });
          confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
          });
        }, 300);
      } catch {
        // Safe fallback
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        id="reward-modal-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      >
        <motion.div
          id="reward-modal-content"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-emerald-100 text-center relative overflow-hidden"
        >
          {/* Level Complete Pill */}
          <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 font-black px-4 py-1.5 rounded-full text-xs uppercase tracking-wider mb-4 border border-amber-300 shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Level {levelNumber} Voltooid!</span>
          </div>

          {/* Unlocked Animal Spotlight in Avatar Box */}
          <div className="relative my-2 flex justify-center">
            <div className="p-4 bg-gradient-to-br from-amber-50 to-emerald-50 rounded-3xl border border-emerald-200 shadow-inner">
              <AnimalAvatar animalId={animal.id} size="xl" interactive={true} isAnimated={true} />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-black text-emerald-950 tracking-tight mt-3 mb-0.5">
            Nieuw Dier Gered! 🎉
          </h2>
          <p className="text-sm font-black text-amber-700 uppercase tracking-wider mb-3">
            {animal.name} ({animal.title})
          </p>

          <p className="text-slate-700 font-medium text-xs sm:text-sm leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-200 mb-4">
            {animal.name} is super blij met jouw hulp en woont nu veilig in jouw Wonderpark!
          </p>

          {/* Rewards Pill */}
          <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
            <div className="bg-amber-50 text-amber-900 font-black px-3.5 py-1.5 rounded-xl border border-amber-200 flex items-center gap-1 text-xs sm:text-sm">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>+{earnedStars} Score & Munten 🌟</span>
            </div>

            {newBadges.length > 0 && (
              <div className="bg-emerald-50 text-emerald-900 font-black px-3.5 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1 text-xs sm:text-sm">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>Nieuwe Medaille Vrij!</span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              id="go-to-sanctuary-modal-btn"
              onClick={() => {
                sound.playPop();
                onGoToSanctuary();
              }}
              className="py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-black text-xs sm:text-sm uppercase tracking-wider border border-slate-300 shadow-sm cursor-pointer transition-all active:scale-98"
            >
              Naar Dierenpark 🏡
            </button>

            <button
              id="continue-playing-modal-btn"
              onClick={() => {
                sound.playPop();
                onClose();
              }}
              className="py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-emerald-700/20 active:scale-98 cursor-pointer transition-all flex items-center justify-center gap-1.5"
            >
              <span>Volgend Level! ➔</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
