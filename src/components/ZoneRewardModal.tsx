import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, Star } from 'lucide-react';
import { ZoneMeta } from '../data/verbZones';
import { sound } from '../services/soundService';

interface ZoneRewardModalProps {
  isOpen: boolean;
  zone: ZoneMeta | undefined;
  onClose: () => void;
  onGoToZoneMap: () => void;
}

export const ZoneRewardModal: React.FC<ZoneRewardModalProps> = ({
  isOpen,
  zone,
  onClose,
  onGoToZoneMap
}) => {
  useEffect(() => {
    if (isOpen) {
      sound.playFanfare();
      try {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      } catch {
        // Safe fallback
      }
    }
  }, [isOpen]);

  if (!isOpen || !zone) return null;

  return (
    <AnimatePresence>
      <div
        id="zone-reward-modal-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      >
        <motion.div
          id="zone-reward-modal-content"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-emerald-100 text-center relative overflow-hidden"
        >
          <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 font-black px-4 py-1.5 rounded-full text-xs uppercase tracking-wider mb-4 border border-amber-300 shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>{zone.title} Voltooid!</span>
          </div>

          <motion.div
            animate={{ y: [-4, 4, -4], rotate: [-2, 2, -2] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
            className="relative my-2 flex justify-center"
          >
            <div className="p-4 bg-gradient-to-br from-amber-50 to-emerald-50 rounded-3xl border border-emerald-200 shadow-inner text-6xl">
              {zone.reward.emoji}
            </div>
          </motion.div>

          <h2 className="text-2xl sm:text-3xl font-black text-emerald-950 tracking-tight mt-3 mb-0.5">
            Nieuw Zone-Dier Ontgrendeld! 🎉
          </h2>
          <p className="text-sm font-black text-amber-700 uppercase tracking-wider mb-3">
            {zone.reward.name} ({zone.reward.title})
          </p>

          <p className="text-slate-700 font-medium text-xs sm:text-sm leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-200 mb-4">
            Je hebt alle 20 werkwoorden in deze zone onder de knie! {zone.reward.name} sluit zich bij je aan.
          </p>

          <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
            <div className="bg-amber-50 text-amber-900 font-black px-3.5 py-1.5 rounded-xl border border-amber-200 flex items-center gap-1 text-xs sm:text-sm">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>+50 Sterren & Munten 🌟</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              id="go-to-zone-map-modal-btn"
              onClick={() => {
                sound.playPop();
                onGoToZoneMap();
              }}
              className="py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-black text-xs sm:text-sm uppercase tracking-wider border border-slate-300 shadow-sm cursor-pointer transition-all active:scale-98"
            >
              Naar Zone Kaart 🗺️
            </button>

            <button
              id="continue-playing-zone-modal-btn"
              onClick={() => {
                sound.playPop();
                onClose();
              }}
              className="py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-emerald-700/20 active:scale-98 cursor-pointer transition-all flex items-center justify-center gap-1.5"
            >
              <span>Verder Spelen! ➔</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
