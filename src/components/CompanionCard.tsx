import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Zap, MessageCircle, Volume2, Home, Utensils, Star, Smile, Bath, Music } from 'lucide-react';
import { PetCompanionState, PlayerProfile } from '../types';
import { PET_GROWTH_STAGES, PET_HOMES, ALL_PETS, createInitialCompanion, TAMAGOTCHI_FOODS } from '../data/companionData';
import { sound } from '../services/soundService';
import { speech } from '../services/speechService';
import { PetAnimatedAvatar } from './PetAnimatedAvatar';

interface CompanionCardProps {
  profile: PlayerProfile;
  onUpdateProfile: (updater: (prev: PlayerProfile) => PlayerProfile) => void;
  onOpenHomeModal?: () => void;
  onOpenTamagotchiRoom?: () => void;
}

export const CompanionCard: React.FC<CompanionCardProps> = ({
  profile,
  onUpdateProfile,
  onOpenHomeModal,
  onOpenTamagotchiRoom
}) => {
  const companion = profile.companion || createInitialCompanion();

  const stageInfo = PET_GROWTH_STAGES[companion.level] || PET_GROWTH_STAGES[1];
  const homeInfo = PET_HOMES[companion.home] || PET_HOMES.treehouse;

  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [showSnackMenu, setShowSnackMenu] = useState(false);
  const [speechBubble, setSpeechBubble] = useState<string | null>(null);
  const [actionState, setActionState] = useState<'idle' | 'happy' | 'eating' | 'sleeping' | 'bathing' | 'playing' | 'dancing'>('idle');

  // Vitals percentages
  const hunger = companion.hunger ?? 85;
  const happiness = companion.happiness ?? 90;
  const energy = companion.energy ?? 95;
  const cleanliness = companion.cleanliness ?? 90;

  const handlePetCompanion = (e?: React.MouseEvent) => {
    sound.playStar();
    sound.playAnimalHappy(companion.id);
    setActionState('happy');
    setTimeout(() => setActionState('idle'), 2000);
    
    // Add heart animation
    const newHeart = { id: Date.now() + Math.random(), x: 40 + Math.random() * 20, y: 10 + Math.random() * 20 };
    setHearts(prev => [...prev.slice(-4), newHeart]);

    const petPhrases = profile.name.toLowerCase() === 'hemali'
      ? [
          `Je bent een kanjer, ${profile.name}! Blijf zo doorgaan!`,
          `Samen ontdekken we de hele savanne!`,
          `Wat fijn dat je mij aait! Mijn vacht glanst er helemaal van!`,
          `Spreek je antwoorden maar luid en trots uit!`
        ]
      : [
          `Joehoe ${profile.name}! Wat lees je al ontzettend knap!`,
          `Ik spring van blijdschap door de kamer!`,
          `Je vriendschapshartjes maken mij beresterk!`,
          `Stukje voor stukje worden we de beste lezers van Nederland!`
        ];

    const randomPhrase = petPhrases[Math.floor(Math.random() * petPhrases.length)];
    setSpeechBubble(randomPhrase);
    setTimeout(() => setSpeechBubble(null), 5000);

    onUpdateProfile(prev => {
      const nextXp = prev.companion.xp + 20;
      const nextHappiness = Math.min(100, (prev.companion.happiness ?? 90) + 10);
      let nextLevel = prev.companion.level;
      let nextMaxXp = prev.companion.maxXp;
      let nextHearts = prev.companion.friendshipHearts;

      if (nextXp >= nextMaxXp && nextLevel < 7) {
        nextLevel += 1;
        nextMaxXp = Math.round(nextMaxXp * 1.5);
        nextHearts = Math.min(5, nextHearts + 1);
        sound.playLevelUp();
      }

      return {
        ...prev,
        score: prev.score + 5,
        companion: {
          ...prev.companion,
          happiness: nextHappiness,
          xp: nextXp,
          level: nextLevel,
          maxXp: nextMaxXp,
          friendshipHearts: nextHearts
        }
      };
    });
  };

  const handleFeedSnack = (food: typeof TAMAGOTCHI_FOODS[0]) => {
    sound.playCorrect();
    sound.playStar();
    setShowSnackMenu(false);
    setActionState('eating');
    setTimeout(() => setActionState('idle'), 2500);

    setSpeechBubble(`Mmm! Wat heerlijk! Bedankt voor de ${food.name}! ✨`);
    setTimeout(() => setSpeechBubble(null), 4000);

    onUpdateProfile(prev => {
      const nextXp = prev.companion.xp + (food.effect.xp || 25);
      const nextHunger = Math.min(100, (prev.companion.hunger ?? 85) + (food.effect.hunger || 25));
      const nextHappiness = Math.min(100, (prev.companion.happiness ?? 90) + (food.effect.happiness || 15));
      let nextLevel = prev.companion.level;
      let nextMaxXp = prev.companion.maxXp;
      let nextHearts = Math.min(5, prev.companion.friendshipHearts + (food.effect.hearts || 0));

      if (nextXp >= nextMaxXp && nextLevel < 7) {
        nextLevel += 1;
        nextMaxXp = Math.round(nextMaxXp * 1.5);
        sound.playLevelUp();
      }

      return {
        ...prev,
        score: Math.max(0, prev.score - food.cost + 5),
        stars: prev.stars + (food.effect.hearts || 0),
        companion: {
          ...prev.companion,
          hunger: nextHunger,
          happiness: nextHappiness,
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
      ? `${companion.name} zegt: Vertel me eens ${profile.name}, waarom denk je dat? Spreek je gedachten maar lekker hardop uit!`
      : `${companion.name} zegt: Super goed bezig ${profile.name}! Zullen we dit woord rustig in stukjes hakken en samen lezen?`;
    
    setSpeechBubble(advice);
    setTimeout(() => setSpeechBubble(null), 5000);
    speech.speak(advice, { rate: profile.name.toLowerCase() === 'ridheya' ? 0.85 : 1.0 });
  };

  const xpPercent = Math.min(100, Math.round((companion.xp / companion.maxXp) * 100));

  return (
    <div className="w-full bg-gradient-to-r from-pink-500/10 via-amber-500/10 to-teal-500/10 backdrop-blur-md rounded-3xl p-3.5 sm:p-4 border-2 border-pink-200/80 shadow-md shadow-pink-950/5 flex flex-col relative overflow-hidden">
      
      {/* Active Encouragement Speech Bubble */}
      <AnimatePresence>
        {speechBubble && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-2.5 bg-white/95 border-2 border-pink-300 text-purple-950 rounded-2xl px-3.5 py-2 text-xs sm:text-sm font-bold shadow-md flex items-center gap-2"
          >
            <span className="text-lg">💬</span>
            <span className="flex-1">{speechBubble}</span>
            <button 
              onClick={() => setSpeechBubble(null)}
              className="text-slate-400 hover:text-slate-600 text-xs font-bold"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 w-full">
        {/* Left: Animated Pet Avatar & Friendship Status */}
        <div className="flex items-center gap-3 w-full sm:w-auto relative">
          <div
            onClick={handlePetCompanion}
            className="relative cursor-pointer flex-shrink-0 group"
            title="Klik om je dierenvriendje te aaien!"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-pink-100 to-amber-100 border-2 border-pink-300 flex items-center justify-center shadow-sm overflow-hidden p-1">
              <PetAnimatedAvatar
                companion={companion}
                size={70}
                actionState={actionState}
              />
            </div>

            <span className="absolute -bottom-1 -right-1 bg-pink-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full border border-white shadow-xs z-10">
              Lvl {companion.level}
            </span>

            {/* Floating Heart Particles */}
            <AnimatePresence>
              {hearts.map(heart => (
                <motion.span
                  key={heart.id}
                  initial={{ opacity: 1, y: 0, scale: 0.8 }}
                  animate={{ opacity: 0, y: -35, scale: 1.4 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute text-rose-500 text-base font-bold pointer-events-none z-30"
                  style={{ left: `${heart.x}%`, top: `${heart.y}%` }}
                >
                  ❤️
                </motion.span>
              ))}
            </AnimatePresence>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-sm font-black text-slate-800 leading-tight">
                {companion.name}
              </h4>
              <span className="text-[10px] font-black text-purple-900 bg-purple-100 px-2 py-0.5 rounded-md border border-purple-200">
                {stageInfo.name} ✨
              </span>
            </div>

            {/* Tamagotchi Micro Vitals Bar */}
            <div className="flex items-center gap-2 mt-1 text-[10px] font-bold text-slate-600">
              <span>🍖 {hunger}%</span>
              <span>💖 {happiness}%</span>
              <span>⚡ {energy}%</span>
              <span className="text-rose-500">{'❤️'.repeat(Math.max(1, companion.friendshipHearts))}</span>
            </div>

            {/* XP Progress Bar */}
            <div className="flex items-center gap-2 mt-1 max-w-xs">
              <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-pink-400 via-rose-400 to-amber-400 rounded-full transition-all duration-300"
                  style={{ width: `${xpPercent}%` }}
                />
              </div>
              <span className="text-[9px] font-black text-slate-600 whitespace-nowrap">
                {companion.xp}/{companion.maxXp} XP
              </span>
            </div>
          </div>
        </div>

        {/* Right: Companion Quick Care Actions & Speelkamer Button */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end flex-wrap relative">
          
          {/* Quick Pet Button */}
          <button
            onClick={handlePetCompanion}
            className="px-2.5 sm:px-3 py-1.5 sm:py-2 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-800 rounded-xl text-xs font-black cursor-pointer transition-all shadow-2xs flex items-center gap-1 active:scale-95"
            title="Aai je maatje voor XP"
          >
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>Aaien (+XP)</span>
          </button>

          {/* Quick Feed Button */}
          <div className="relative">
            <button
              onClick={() => {
                sound.playPop();
                setShowSnackMenu(!showSnackMenu);
              }}
              className="px-2.5 sm:px-3 py-1.5 sm:py-2 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 rounded-xl text-xs font-black cursor-pointer transition-all shadow-2xs flex items-center gap-1 active:scale-95"
              title="Geef een lekkere snack"
            >
              <Utensils className="w-3.5 h-3.5 text-amber-600" />
              <span>Voeren</span>
            </button>

            {/* Snack Dropdown Popover */}
            {showSnackMenu && (
              <div className="absolute right-0 top-full mt-1.5 z-40 bg-white border-2 border-amber-200 rounded-2xl p-2 shadow-xl w-56 space-y-1">
                <span className="text-[10px] font-black uppercase text-amber-800 tracking-wider block px-2 mb-1">
                  Kies een traktatie:
                </span>
                {TAMAGOTCHI_FOODS.map(food => (
                  <button
                    key={food.id}
                    onClick={() => handleFeedSnack(food)}
                    className="w-full text-left px-2.5 py-1.5 rounded-xl hover:bg-amber-50 flex items-center justify-between text-xs font-bold text-slate-800 cursor-pointer transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{food.emoji}</span>
                      <span>{food.name}</span>
                    </div>
                    <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                      +{food.effect.hunger}%
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Tip Advice Button */}
          <button
            onClick={handleSpeakAdvice}
            className="px-2.5 sm:px-3 py-1.5 sm:py-2 bg-white hover:bg-purple-50 border border-purple-200 text-purple-900 rounded-xl text-xs font-black cursor-pointer transition-all shadow-2xs flex items-center gap-1 active:scale-95"
            title="Vraag advies aan je maatje"
          >
            <Volume2 className="w-3.5 h-3.5 text-purple-600" />
            <span>Tip</span>
          </button>

          {/* Full Tamagotchi Room & Adoption Studio Button */}
          {onOpenTamagotchiRoom && (
            <button
              onClick={() => {
                sound.playPop();
                onOpenTamagotchiRoom();
              }}
              className="px-3 py-1.5 sm:py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-black cursor-pointer transition-all shadow-md shadow-emerald-700/20 flex items-center gap-1.5 active:scale-95"
              title="Open de complete Tamagotchi Speelkamer & Kies Huisdier"
            >
              <span>💖 Speelkamer</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            </button>
          )}

          {/* Open Home / Treehouse Modal */}
          {onOpenHomeModal && (
            <button
              onClick={() => {
                sound.playPop();
                onOpenHomeModal();
              }}
              className="px-2.5 sm:px-3 py-1.5 sm:py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-black cursor-pointer transition-all shadow-2xs flex items-center gap-1 active:scale-95"
            >
              <Home className="w-3.5 h-3.5" />
              <span>{homeInfo.name.split(' ')[0]}</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
