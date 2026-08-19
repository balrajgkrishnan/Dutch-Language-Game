import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Sparkles, TrendingUp, CheckCircle2, Lock, X, Heart, Star } from 'lucide-react';
import { PlayerProfile, GrowthMilestone } from '../../types';
import { sound } from '../../services/soundService';

interface GrowthMilestonesModalProps {
  isOpen: boolean;
  profile: PlayerProfile;
  onClose: () => void;
}

export const GrowthMilestonesModal: React.FC<GrowthMilestonesModalProps> = ({
  isOpen,
  profile,
  onClose
}) => {
  if (!isOpen) return null;

  const milestones: GrowthMilestone[] = profile.milestones || [];
  const unlockedCount = milestones.filter(m => m.unlocked).length;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-2 border-amber-500/20 overflow-hidden flex flex-col my-auto"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 p-5 sm:p-6 text-white relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center text-2xl shadow-inner">
                  🏆
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                    Groei- &amp; Ontwikkelingsbijeenkomst
                  </h2>
                  <p className="text-xs sm:text-sm text-amber-100">
                    We belonen echte vooruitgang en groei boven pure cijfers!
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Summary Badge */}
            <div className="flex items-center gap-3 mt-4 bg-black/15 p-2.5 rounded-2xl border border-white/20">
              <Star className="w-5 h-5 text-amber-300 fill-amber-300" />
              <div className="text-xs font-bold">
                <span>{unlockedCount} van {milestones.length} Groeimijlpalen Behaald door {profile.name}</span>
              </div>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-5 sm:p-6 space-y-4 overflow-y-auto max-h-[70vh]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {milestones.map((m) => (
                <div
                  key={m.id}
                  className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                    m.unlocked
                      ? 'bg-amber-50/70 border-amber-300 shadow-xs'
                      : 'bg-slate-50/70 border-slate-200 opacity-60'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-inner ${
                    m.unlocked ? 'bg-amber-200/80 border border-amber-300' : 'bg-slate-200 text-slate-400'
                  }`}>
                    {m.unlocked ? m.emoji : '🔒'}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h4 className="text-sm font-black text-slate-900">
                        {m.title}
                      </h4>
                      {m.unlocked && (
                        <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-black text-[10px]">
                          BEHAALD
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 font-medium leading-tight">
                      {m.description}
                    </p>
                    {m.unlockedDate && (
                      <div className="text-[10px] text-amber-800 font-bold pt-1">
                        Ontgrendeld op: {m.unlockedDate}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-950 font-medium flex items-center gap-2.5">
              <TrendingUp className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                <strong>Pedagogisch Groeimodel:</strong> Elke procentuele stijging in spreekdurf, leessnelheid of woordbegrip ontgrendelt automatisch nieuwe safari-eretekens voor {profile.name}.
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
