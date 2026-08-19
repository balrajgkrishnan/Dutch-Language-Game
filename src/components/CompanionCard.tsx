import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Zap, MessageCircle, Volume2, Home } from 'lucide-react';
import { PetCompanionState, PlayerProfile } from '../types';
import { PET_GROWTH_STAGES, PET_HOMES } from '../data/companionData';
import { sound } from '../services/soundService';
import { speech } from '../services/speechService';

interface CompanionCardProps {
  profile: PlayerProfile;
  onUpdateProfile: (updater: (prev: PlayerProfile) => PlayerProfile) => void;
  onOpenHomeModal?: () => void;
}

export const CompanionCard: React.FC<CompanionCardProps> = ({
  profile,
  onUpdateProfile,
  onOpenHomeModal
}) => {
  const companion = profile.companion;
  const stageInfo = PET_GROWTH_STAGES[companion.level] || PET_GROWTH_STAGES[1];
  const homeInfo = PET_HOMES[companion.home] || PET_HOMES.treehouse;

  const handlePetCompanion = () => {
    sound.playStar();
    onUpdateProfile(prev => {
      const nextXp = prev.companion.xp + 15;
      let nextLevel = prev.companion.level;
      let nextMaxXp = prev.companion.maxXp;
      let nextHearts = prev.companion.friendshipHearts;

      if (nextXp >= nextMaxXp && nextLevel < 7) {
        nextLevel += 1;
        nextMaxXp = Math.round(nextMaxXp * 1.6);
        nextHearts = Math.min(5, nextHearts + 1);
        sound.playLevelUp();
      }

      return {
        ...prev,
        score: prev.score + 5,
        companion: {
          ...prev.companion,
          xp: nextXp,
          level: nextLevel,
          maxXp: nextMaxXp,
          friendshipHearts: nextHearts
        }
      };
    });
  };

  const handleSpeakAdvice = () => {
    sound.playPop();
    const advice = profile.name.toLowerCase() === 'hemali'
      ? `${companion.name} zegt: Vertel me eens Hemali, waarom denk je dat? Spreek je gedachten maar lekker hardop uit!`
      : `${companion.name} zegt: Super goed bezig Ridheya! Zullen we dit woord rustig in stukjes hakken en samen lezen?`;
    speech.speak(advice);
  };

  const xpPercent = Math.min(100, Math.round((companion.xp / companion.maxXp) * 100));

  return (
    <div className="w-full bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-teal-500/10 backdrop-blur-md rounded-3xl p-3.5 sm:p-4 border border-emerald-200/80 shadow-md shadow-emerald-950/5 flex flex-col sm:flex-row items-center justify-between gap-3">
      
      {/* Left: Companion Avatar & Friendship */}
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <motion.button
          whileHover={{ scale: 1.08, rotate: 3 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePetCompanion}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 border-2 border-amber-300 flex items-center justify-center text-3xl sm:text-4xl shadow-sm cursor-pointer relative group flex-shrink-0"
          title="Klik om je maatje te aaien en XP te geven!"
        >
          <span className="select-none filter drop-shadow-xs">{companion.emoji}</span>
          <span className="absolute -bottom-1 -right-1 bg-amber-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full border border-white">
            Lvl {companion.level}
          </span>
        </motion.button>

        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-sm font-black text-slate-800 leading-tight">
              {companion.name}
            </h4>
            <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md border border-emerald-200">
              {stageInfo.name}
            </span>
          </div>

          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center text-red-500 text-xs">
              {'❤️'.repeat(Math.max(1, companion.friendshipHearts))}
            </div>
            <span className="text-[10px] text-slate-500 font-bold">
              {companion.specialAbility}
            </span>
          </div>

          {/* XP Progress Bar */}
          <div className="flex items-center gap-2 mt-1.5 max-w-xs">
            <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${xpPercent}%` }}
              />
            </div>
            <span className="text-[9px] font-black text-slate-600 whitespace-nowrap">
              {companion.xp}/{companion.maxXp} XP
            </span>
          </div>
        </div>
      </div>

      {/* Right: Companion Advice & Home Action */}
      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
        <button
          onClick={handleSpeakAdvice}
          className="flex-1 sm:flex-initial px-3 py-2 bg-white hover:bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl text-xs font-black cursor-pointer transition-all shadow-2xs flex items-center justify-center gap-1.5 active:scale-95"
          title="Vraag advies aan je maatje"
        >
          <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Vraag Tip</span>
        </button>

        {onOpenHomeModal && (
          <button
            onClick={() => {
              sound.playPop();
              onOpenHomeModal();
            }}
            className="flex-1 sm:flex-initial px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black cursor-pointer transition-all shadow-xs flex items-center justify-center gap-1.5 active:scale-95"
          >
            <Home className="w-3.5 h-3.5" />
            <span>{homeInfo.name.split(' ')[0]}</span>
          </button>
        )}
      </div>

    </div>
  );
};
