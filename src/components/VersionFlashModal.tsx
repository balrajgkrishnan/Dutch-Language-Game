import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, CheckCircle, Heart, Star, Compass, BookOpen, Mic, X } from 'lucide-react';
import { sound } from '../services/soundService';

interface VersionFlashModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VersionFlashModal: React.FC<VersionFlashModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        id="version-flash-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      >
        <motion.div
          id="version-flash-modal"
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border-2 border-emerald-300 relative overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-all active:scale-95"
            title="Sluiten"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top Banner Tag */}
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-xs uppercase px-3.5 py-1.5 rounded-full shadow-xs flex items-center gap-1.5 tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Nieuwste Update</span>
            </span>
            <span className="bg-amber-100 text-amber-900 border border-amber-300 font-black text-xs px-2.5 py-1 rounded-full uppercase tracking-wider">
              🎮 Game Versie 8
            </span>
          </div>

          {/* Header Title */}
          <h2 className="text-2xl sm:text-3xl font-black text-emerald-950 tracking-tight mb-2">
            Boerin Tess & Het Safaripark <br />
            <span className="text-emerald-600 font-black text-xl sm:text-2xl">Game Versie 8 is Live! 🎉</span>
          </h2>

          <p className="text-slate-600 text-xs sm:text-sm font-medium mb-4">
            Welkom in de allernieuwste editie! Speciaal ontworpen voor Hemali en Ridheya met onbeperkt speelplezier en diepere taalontwikkeling.
          </p>

          {/* Feature Highlights Grid */}
          <div className="space-y-2.5 mb-6 text-left">
            <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-3 flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 text-sm font-bold shadow-xs">
                ❤️
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-black text-emerald-950">Onbeperkt Herspelen &amp; Vriendschapshartjes</h4>
                <p className="text-[11px] sm:text-xs text-slate-600 font-medium">
                  Heb je alle dieren al gered? Levels kunnen eindeloos worden herspeeld voor extra gouden vriendschapshartjes (tot 5 ❤️) per dier!
                </p>
              </div>
            </div>

            <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-3 flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center flex-shrink-0 text-sm font-bold shadow-xs">
                🦉
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-black text-amber-950">Max &amp; Ollie Huisdier-XP</h4>
                <p className="text-[11px] sm:text-xs text-slate-600 font-medium">
                  Elke voltooide oefening geeft +75 XP aan je actieve huisdier om te groeien naar Safari Meester en Grootgeleerde.
                </p>
              </div>
            </div>

            <div className="bg-purple-50/80 border border-purple-200 rounded-2xl p-3 flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center flex-shrink-0 text-sm font-bold shadow-xs">
                🗺️
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-black text-purple-950">7 Safari Werelden &amp; 250+ Vragen</h4>
                <p className="text-[11px] sm:text-xs text-slate-600 font-medium">
                  Verken de Boerderij, Savanne, Diepzee, Sneeuw &amp; IJs, Regenwoud, Outback en Hoge Bergen!
                </p>
              </div>
            </div>
          </div>

          {/* Action button */}
          <button
            id="start-version8-game-btn"
            onClick={() => {
              sound.playStar();
              onClose();
            }}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-emerald-700/20 active:scale-98 cursor-pointer transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Start Game Versie 8 ➔</span>
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
