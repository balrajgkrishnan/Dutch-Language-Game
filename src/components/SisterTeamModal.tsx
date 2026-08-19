import React from 'react';
import { motion } from 'motion/react';
import { X, Crown, Users, Sparkles, CheckCircle2, Award } from 'lucide-react';
import { PlayerProfile } from '../types';
import { SISTER_TEAM_QUESTS } from '../data/specialMissionsData';
import { sound } from '../services/soundService';
import confetti from 'canvas-confetti';

interface SisterTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: PlayerProfile;
  onOpenHemaliMission?: () => void;
  onOpenRidheyaMission?: () => void;
}

export const SisterTeamModal: React.FC<SisterTeamModalProps> = ({
  isOpen,
  onClose,
  profile,
  onOpenHemaliMission,
  onOpenRidheyaMission
}) => {
  if (!isOpen) return null;

  const quest = SISTER_TEAM_QUESTS[0];

  const handleCelebrateTeam = () => {
    sound.playVictory();
    confetti({ particleCount: 120, spread: 100 });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-3xl w-full max-w-3xl shadow-2xl border border-amber-100 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-emerald-600 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-3xl">
              👑
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black">{quest.title}</h3>
              <p className="text-xs text-amber-100 font-medium">{quest.subtitle}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-700 leading-relaxed">
            {quest.description}
          </div>

          {/* Sibling Tasks Deck */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Hemali's Task */}
            <div className="bg-indigo-50/70 p-4 rounded-2xl border-2 border-indigo-200 flex flex-col justify-between gap-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-black uppercase text-indigo-900 flex items-center gap-1.5">
                    <span>👧</span>
                    <span>Hemali (Groep 8)</span>
                  </span>
                  <span className="text-[10px] font-black bg-indigo-200 text-indigo-900 px-2 py-0.5 rounded-md">
                    Spraak &amp; Vragen
                  </span>
                </div>
                <h4 className="text-sm font-black text-slate-800">{quest.hemaliTask.title}</h4>
                <p className="text-xs text-slate-600 mt-1">{quest.hemaliTask.description}</p>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onOpenHemaliMission?.();
                }}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black cursor-pointer shadow-xs"
              >
                Start Hemali’s Taak ➔
              </button>
            </div>

            {/* Ridheya's Task */}
            <div className="bg-amber-50/70 p-4 rounded-2xl border-2 border-amber-200 flex flex-col justify-between gap-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-black uppercase text-amber-900 flex items-center gap-1.5">
                    <span>👩‍🌾</span>
                    <span>Ridheya (Groep 5)</span>
                  </span>
                  <span className="text-[10px] font-black bg-amber-200 text-amber-900 px-2 py-0.5 rounded-md">
                    Lezen &amp; Spelling
                  </span>
                </div>
                <h4 className="text-sm font-black text-slate-800">{quest.ridheyaTask.title}</h4>
                <p className="text-xs text-slate-600 mt-1">{quest.ridheyaTask.description}</p>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onOpenRidheyaMission?.();
                }}
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-black cursor-pointer shadow-xs"
              >
                Start Ridheya’s Taak ➔
              </button>
            </div>

          </div>

          {/* Reward Box */}
          <div className="bg-gradient-to-r from-amber-100 to-yellow-100 p-4 rounded-2xl border border-amber-300 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🏆</span>
              <div>
                <span className="text-[10px] font-black text-amber-800 uppercase tracking-wider block">
                  Gezamenlijke Beloning:
                </span>
                <span className="text-xs sm:text-sm font-black text-amber-950">
                  {quest.rewardTitle}
                </span>
              </div>
            </div>

            <button
              onClick={handleCelebrateTeam}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-black cursor-pointer shadow-sm"
            >
              🎉 Samen Vieren
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
