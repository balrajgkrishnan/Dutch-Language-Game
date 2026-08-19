import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GradeLevel } from '../types';
import { sound } from '../services/soundService';
import { BookOpen, Zap, Sparkles, Check, ArrowRight } from 'lucide-react';

interface GradeSelectorModalProps {
  isOpen: boolean;
  selectedGrade: GradeLevel;
  onSelectGrade: (grade: GradeLevel) => void;
  onClose?: () => void;
  isInitialSetup?: boolean;
}

export const GradeSelectorModal: React.FC<GradeSelectorModalProps> = ({
  isOpen,
  selectedGrade,
  onSelectGrade,
  onClose,
  isInitialSetup = false
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          className="w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-emerald-100 text-center relative"
        >
          {/* Top Emoji Mascot */}
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-100 border border-amber-300 text-3xl shadow-sm mb-3 select-none">
            🎒
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-emerald-950 tracking-tight">
            Kies je Groep &amp; Niveau!
          </h2>
          <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1 max-w-md mx-auto">
            Beide niveaus bevatten alle 7 werelden en 42 dieren om te verzamelen!
          </p>

          {/* 2 Smooth Option Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-left">
            
            {/* OPTION 1: GROEP 4-5 */}
            <button
              id="select-group-4-5-btn"
              onClick={() => {
                sound.playPop();
                onSelectGrade('group_4_5');
                if (onClose) onClose();
              }}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between relative group ${
                selectedGrade === 'group_4_5'
                  ? 'bg-emerald-50/80 border-2 border-emerald-500 shadow-md ring-2 ring-emerald-400/20'
                  : 'bg-white hover:bg-slate-50 border-slate-200 shadow-sm'
              }`}
            >
              {selectedGrade === 'group_4_5' && (
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-black">
                  <Check className="w-4 h-4" />
                </div>
              )}

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🐮</span>
                  <span className="bg-emerald-600 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                    Basis
                  </span>
                </div>
                <h3 className="text-base font-black text-emerald-950 uppercase">
                  Groep 4 - 5
                </h3>
                <p className="text-xs font-medium text-slate-600 mt-1 leading-snug">
                  Spelling, klankgroepen (korte/lange klinkers), d/t eindklank, begrijpend lezen en verhaaltjes in alle 7 werelden.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-black text-emerald-700 uppercase">
                <span>7 Werelden • 42 Dieren</span>
                <span>▶ Start</span>
              </div>
            </button>

            {/* OPTION 2: GROEP 6-7-8 */}
            <button
              id="select-group-6-8-btn"
              onClick={() => {
                sound.playPop();
                onSelectGrade('group_6_7_8');
                if (onClose) onClose();
              }}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between relative group ${
                selectedGrade === 'group_6_7_8'
                  ? 'bg-amber-50/80 border-2 border-amber-500 shadow-md ring-2 ring-amber-400/20'
                  : 'bg-white hover:bg-slate-50 border-slate-200 shadow-sm'
              }`}
            >
              {selectedGrade === 'group_6_7_8' && (
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-black">
                  <Check className="w-4 h-4" />
                </div>
              )}

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">⚡</span>
                  <span className="bg-amber-500 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                    Gevorderd
                  </span>
                </div>
                <h3 className="text-base font-black text-amber-900 uppercase">
                  Groep 6 - 7 - 8
                </h3>
                <p className="text-xs font-medium text-slate-600 mt-1 leading-snug">
                  Sterke werkwoorden (tt, vt, vd), d/t werkwoordregels, moeilijke leenwoorden (-isch, apostrof) &amp; diepe leesteksten.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-black text-amber-700 uppercase">
                <span>7 Werelden + 100 Werkwoorden</span>
                <span>▶ Start</span>
              </div>
            </button>

          </div>

          {/* Close / Continue Button */}
          {!isInitialSetup && onClose && (
            <button
              onClick={onClose}
              className="mt-6 text-xs font-bold text-slate-400 hover:text-slate-700 uppercase tracking-wider cursor-pointer transition-colors"
            >
              Sluiten
            </button>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
