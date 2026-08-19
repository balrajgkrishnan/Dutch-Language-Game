import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Heart, Sparkles, Utensils, Moon, Sun, Music, 
  Bath, Stethoscope, Trophy, Volume2, Edit3, Check, 
  Smile, Shield, Zap, RefreshCw, ShoppingBag, ArrowRight
} from 'lucide-react';
import { PetCompanionState, PlayerProfile, CompanionPetId } from '../types';
import { 
  ALL_PETS, 
  TAMAGOTCHI_FOODS, 
  TAMAGOTCHI_CARE_ACTIONS, 
  TAMAGOTCHI_HATS, 
  PET_GROWTH_STAGES, 
  PET_HOMES, 
  createInitialCompanion 
} from '../data/companionData';
import { sound } from '../services/soundService';
import { speech } from '../services/speechService';
import { PetAnimatedAvatar } from './PetAnimatedAvatar';

interface TamagotchiPetRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: PlayerProfile;
  onUpdateProfile: (updater: (prev: PlayerProfile) => PlayerProfile) => void;
}

export const TamagotchiPetRoomModal: React.FC<TamagotchiPetRoomModalProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile
}) => {
  const companion = profile.companion || createInitialCompanion();

  // Active care sub-station: 'care' | 'adopt' | 'wardrobe' | 'minigame'
  const [activeTab, setActiveTab] = useState<'care' | 'adopt' | 'wardrobe'>('care');
  const [careMode, setCareMode] = useState<'feed' | 'wash' | 'play' | 'sleep'>('feed');

  // Animation and reaction states
  const [petActionState, setPetActionState] = useState<'idle' | 'happy' | 'eating' | 'sleeping' | 'bathing' | 'playing' | 'dancing' | 'sad'>('idle');
  const [speechBubble, setSpeechBubble] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [isLightsOff, setIsLightsOff] = useState(false);

  // Custom Pet Name Editing State
  const [isEditingName, setIsEditingName] = useState(false);
  const [customNameInput, setCustomNameInput] = useState(companion.name);

  // Mini-game ball physics
  const [ballPosition, setBallPosition] = useState<{ x: number; y: number } | null>(null);

  // Synchronize customNameInput when companion changes
  useEffect(() => {
    setCustomNameInput(companion.name);
  }, [companion.name]);

  if (!isOpen) return null;

  // Vitals percentages
  const hunger = companion.hunger ?? 85;
  const happiness = companion.happiness ?? 90;
  const energy = companion.energy ?? 95;
  const cleanliness = companion.cleanliness ?? 90;
  const stageInfo = PET_GROWTH_STAGES[companion.level] || PET_GROWTH_STAGES[1];

  // Helper to trigger pet speech & reaction
  const triggerPetReaction = (
    action: typeof petActionState,
    phrase: string,
    durationMs: number = 3000,
    speakVoice: boolean = true
  ) => {
    setPetActionState(action);
    setSpeechBubble(phrase);
    if (speakVoice) {
      speech.speak(phrase, { rate: profile.name.toLowerCase() === 'ridheya' ? 0.85 : 1.0 });
    }
    setTimeout(() => {
      setPetActionState('idle');
      setSpeechBubble(null);
    }, durationMs);
  };

  // 1. Rename Pet
  const handleSavePetName = () => {
    if (!customNameInput.trim()) return;
    sound.playCorrect();
    onUpdateProfile(prev => ({
      ...prev,
      companion: {
        ...prev.companion,
        name: customNameInput.trim()
      }
    }));
    setIsEditingName(false);
    triggerPetReaction('happy', `Wat een geweldige naam! Vanaf nu heet ik ${customNameInput.trim()}! ❤️`);
  };

  // 2. Adopt New Pet
  const handleAdoptPet = (petDef: typeof ALL_PETS[0]) => {
    sound.playFanfare();
    onUpdateProfile(prev => ({
      ...prev,
      companion: {
        ...prev.companion,
        id: petDef.id,
        species: petDef.species,
        emoji: petDef.emoji,
        name: customNameInput.trim() || petDef.name,
        personality: petDef.personality,
        specialAbility: petDef.specialAbility
      }
    }));
    setActiveTab('care');
    triggerPetReaction('happy', `Hoi ${profile.name}! Ik ben zo blij dat je mij hebt gekozen als je beste maatje! 🌟`, 4000);
  };

  // 3. Feed Pet
  const handleFeedFood = (food: typeof TAMAGOTCHI_FOODS[0]) => {
    if (food.cost > 0 && profile.score < food.cost) {
      sound.playIncorrect();
      setNotification(`Je hebt ${food.cost} munten nodig! Speel quizzen om munten te verdienen! 🪙`);
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    sound.playStar();
    sound.playAnimalHappy(companion.id);

    onUpdateProfile(prev => {
      const nextHunger = Math.min(100, (prev.companion.hunger ?? 85) + (food.effect.hunger || 20));
      const nextHappiness = Math.min(100, (prev.companion.happiness ?? 90) + (food.effect.happiness || 10));
      const nextXp = prev.companion.xp + (food.effect.xp || 20);
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

    triggerPetReaction('eating', `Mmm! Wat heerlijk! Bedankt voor de lekkere ${food.name}! ✨`, 2500, false);
  };

  // 4. Wash & Bathe Pet
  const handleWashPet = (type: 'soap' | 'shower') => {
    sound.playPop();
    onUpdateProfile(prev => ({
      ...prev,
      companion: {
        ...prev.companion,
        cleanliness: 100,
        happiness: Math.min(100, (prev.companion.happiness ?? 90) + 15),
        xp: prev.companion.xp + 25
      }
    }));

    triggerPetReaction('bathing', `Heerlijk fris gewassen met warme schuimbellen! 🧼🫧`, 2500);
  };

  // 5. Play Ball Throw Mini-Game
  const handleThrowBall = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setBallPosition({ x, y });
    sound.playPop();

    setPetActionState('playing');
    setTimeout(() => {
      sound.playAnimalHappy(companion.id);
      setBallPosition(null);
      setPetActionState('happy');

      onUpdateProfile(prev => ({
        ...prev,
        companion: {
          ...prev.companion,
          happiness: Math.min(100, (prev.companion.happiness ?? 90) + 20),
          energy: Math.max(10, (prev.companion.energy ?? 95) - 10),
          xp: prev.companion.xp + 30
        }
      }));

      triggerPetReaction('happy', `Gevangen! Wat een mooie worp, ${profile.name}! 🎾✨`, 2000);
    }, 900);
  };

  // 6. Dance Party
  const handleDanceParty = () => {
    sound.playFanfare();
    triggerPetReaction('dancing', `Joepie! Tijd voor het grote Safarifeest! 🪕🎶`, 3500);
    onUpdateProfile(prev => ({
      ...prev,
      companion: {
        ...prev.companion,
        happiness: 100,
        energy: Math.max(15, (prev.companion.energy ?? 95) - 15),
        xp: prev.companion.xp + 35
      }
    }));
  };

  // 7. Sleep & Rest (Turn off room light)
  const handleToggleSleep = () => {
    sound.playStar();
    setIsLightsOff(prev => !prev);
    if (!isLightsOff) {
      setPetActionState('sleeping');
      setSpeechBubble(`Slaap lekker ${profile.name}... Zzz 🌙`);
      onUpdateProfile(prev => ({
        ...prev,
        companion: {
          ...prev.companion,
          energy: 100,
          xp: prev.companion.xp + 20
        }
      }));
    } else {
      setPetActionState('idle');
      setSpeechBubble(`Goedemorgen! Ik ben weer uitgerust en klaar voor avontuur! ☀️`);
      setTimeout(() => setSpeechBubble(null), 3000);
    }
  };

  // 8. Equip Hat / Accessory
  const handleEquipHat = (hatId: string) => {
    sound.playPop();
    onUpdateProfile(prev => ({
      ...prev,
      companion: {
        ...prev.companion,
        equippedHat: hatId
      }
    }));
    triggerPetReaction('happy', `Kijk eens hoe mooi deze hoed mij staat! 🎩✨`, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 select-none">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-3xl shadow-2xl border-4 border-amber-300 max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Top Header Bar */}
        <div className="bg-gradient-to-r from-amber-400 via-rose-400 to-purple-500 p-4 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-xs border border-white/40 flex items-center justify-center text-2xl">
              {companion.emoji}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-lg sm:text-xl leading-tight">
                  {companion.name}
                </h3>
                <button
                  onClick={() => setIsEditingName(true)}
                  className="p-1 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-all cursor-pointer"
                  title="Geef je maatje een eigen naam"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs text-white/90 font-medium">
                {companion.species} • {stageInfo.title} (Level {companion.level})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-black/25 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black flex items-center gap-1.5 border border-white/20">
              <Trophy className="w-3.5 h-3.5 text-amber-300" />
              <span>{profile.score} 🪙</span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center cursor-pointer transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="bg-slate-100 p-1.5 border-b border-slate-200 flex items-center justify-between gap-1 overflow-x-auto">
          <button
            onClick={() => { sound.playPop(); setActiveTab('care'); }}
            className={`flex-1 py-2 px-3 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
              activeTab === 'care'
                ? 'bg-white text-emerald-800 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>💖 Tamagotchi Kamer</span>
          </button>

          <button
            onClick={() => { sound.playPop(); setActiveTab('wardrobe'); }}
            className={`flex-1 py-2 px-3 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
              activeTab === 'wardrobe'
                ? 'bg-white text-purple-800 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>🎩 Hoedjes &amp; Stijl</span>
          </button>

          <button
            onClick={() => { sound.playPop(); setActiveTab('adopt'); }}
            className={`flex-1 py-2 px-3 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
              activeTab === 'adopt'
                ? 'bg-white text-amber-800 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>🐾 Kies Nieuw Huisdier</span>
          </button>
        </div>

        {/* Custom Pet Name Edit Modal Popover */}
        <AnimatePresence>
          {isEditingName && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-amber-50 p-4 border-b border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-3"
            >
              <div className="flex-1 w-full">
                <label className="text-xs font-black uppercase text-amber-900 block mb-1">
                  Kies een leuke naam voor je huisdier:
                </label>
                <input
                  type="text"
                  value={customNameInput}
                  onChange={(e) => setCustomNameInput(e.target.value)}
                  placeholder="Bijv. Fluffy, Snickers, Mika, Rakker..."
                  className="w-full bg-white border-2 border-amber-300 rounded-xl px-3 py-1.5 text-sm font-bold text-slate-800 focus:outline-hidden focus:border-amber-500"
                />
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handleSavePetName}
                  className="flex-1 sm:flex-initial px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-xs cursor-pointer flex items-center justify-center gap-1"
                >
                  <Check className="w-4 h-4" />
                  <span>Opslaan</span>
                </button>
                <button
                  onClick={() => setIsEditingName(false)}
                  className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-black text-xs rounded-xl cursor-pointer"
                >
                  Annuleren
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scrollable Center Room Content */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-4">
          
          {/* TAB 1: TAMAGOTCHI MAIN CARE ROOM */}
          {activeTab === 'care' && (
            <div className="space-y-4">
              
              {/* Pet Stage / Bedroom Environment */}
              <div 
                onClick={handleThrowBall}
                className={`relative rounded-3xl p-6 transition-all duration-500 overflow-hidden border-2 shadow-inner min-h-[240px] flex flex-col items-center justify-center cursor-crosshair ${
                  isLightsOff 
                    ? 'bg-gradient-to-b from-indigo-950 via-slate-900 to-purple-950 border-indigo-800 text-amber-200' 
                    : 'bg-gradient-to-b from-amber-100 via-rose-50 to-emerald-100 border-amber-200 text-slate-900'
                }`}
              >
                {/* Night Sky Stars when Lights Off */}
                {isLightsOff && (
                  <div className="absolute inset-0 pointer-events-none">
                    <span className="absolute top-4 left-6 text-sm animate-pulse">⭐</span>
                    <span className="absolute top-8 right-10 text-xs animate-pulse">✨</span>
                    <span className="absolute top-14 left-1/3 text-xs animate-pulse">🌟</span>
                    <span className="absolute top-6 right-1/4 text-sm animate-pulse">🌙</span>
                  </div>
                )}

                {/* Speech Bubble from Pet */}
                <AnimatePresence>
                  {speechBubble && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute top-3 bg-white/95 text-slate-900 border-2 border-amber-300 px-4 py-1.5 rounded-2xl text-xs sm:text-sm font-black shadow-lg z-30 max-w-[85%] text-center"
                    >
                      {speechBubble}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Animated Interactive Pet Engine */}
                <div className="my-2 relative z-10">
                  <PetAnimatedAvatar
                    companion={companion}
                    size={160}
                    actionState={petActionState}
                    onClick={() => {
                      sound.playStar();
                      sound.playAnimalHappy(companion.id);
                      triggerPetReaction('happy', `Prrr! Ik ben zo dol op jou, ${profile.name}! ❤️`);
                    }}
                  />
                </div>

                {/* Bouncing Ball in Play Mode */}
                {ballPosition && (
                  <motion.div
                    initial={{ scale: 0, x: 0, y: 0 }}
                    animate={{ scale: 1, x: ballPosition.x - 100, y: ballPosition.y - 100 }}
                    className="absolute text-3xl pointer-events-none z-40 animate-bounce"
                  >
                    🎾
                  </motion.div>
                )}

                {/* Lights Off / Sleep Button in Corner */}
                <button
                  onClick={(e) => { e.stopPropagation(); handleToggleSleep(); }}
                  className={`absolute bottom-3 right-3 p-2 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md cursor-pointer transition-all border ${
                    isLightsOff
                      ? 'bg-amber-400 text-slate-900 border-amber-500'
                      : 'bg-indigo-900 text-amber-200 border-indigo-800 hover:bg-indigo-800'
                  }`}
                  title="Lamp aan/uit doen voor dutje"
                >
                  {isLightsOff ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  <span>{isLightsOff ? 'Licht Aan ☀️' : 'Dutje Doen 🌙'}</span>
                </button>

                <div className="absolute bottom-3 left-3 text-[10px] font-bold text-slate-500 bg-white/80 px-2.5 py-1 rounded-full pointer-events-none">
                  👆 Klik op de kamer om met de bal te spelen of aai je dier!
                </div>
              </div>

              {/* Tamagotchi Vitals Status Bars */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {/* 1. Hunger */}
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-2.5">
                  <div className="flex items-center justify-between text-xs font-black text-amber-900 mb-1">
                    <span>🍖 Honger</span>
                    <span>{hunger}%</span>
                  </div>
                  <div className="w-full h-2 bg-amber-200 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full transition-all" style={{ width: `${hunger}%` }} />
                  </div>
                </div>

                {/* 2. Happiness */}
                <div className="bg-rose-50 border border-rose-200 rounded-2xl p-2.5">
                  <div className="flex items-center justify-between text-xs font-black text-rose-900 mb-1">
                    <span>💖 Blijdschap</span>
                    <span>{happiness}%</span>
                  </div>
                  <div className="w-full h-2 bg-rose-200 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-500 rounded-full transition-all" style={{ width: `${happiness}%` }} />
                  </div>
                </div>

                {/* 3. Energy */}
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-2.5">
                  <div className="flex items-center justify-between text-xs font-black text-blue-900 mb-1">
                    <span>⚡ Energie</span>
                    <span>{energy}%</span>
                  </div>
                  <div className="w-full h-2 bg-blue-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${energy}%` }} />
                  </div>
                </div>

                {/* 4. Cleanliness */}
                <div className="bg-teal-50 border border-teal-200 rounded-2xl p-2.5">
                  <div className="flex items-center justify-between text-xs font-black text-teal-900 mb-1">
                    <span>🛁 Schoonheid</span>
                    <span>{cleanliness}%</span>
                  </div>
                  <div className="w-full h-2 bg-teal-200 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-500 rounded-full transition-all" style={{ width: `${cleanliness}%` }} />
                  </div>
                </div>
              </div>

              {/* Care Sub-Stations Navigation */}
              <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                <button
                  onClick={() => { sound.playPop(); setCareMode('feed'); }}
                  className={`px-3 py-1.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-all ${
                    careMode === 'feed' ? 'bg-amber-500 text-white shadow-xs' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <Utensils className="w-3.5 h-3.5" />
                  <span>Traktaties Voeren</span>
                </button>
                <button
                  onClick={() => { sound.playPop(); setCareMode('wash'); }}
                  className={`px-3 py-1.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-all ${
                    careMode === 'wash' ? 'bg-teal-500 text-white shadow-xs' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <Bath className="w-3.5 h-3.5" />
                  <span>Baden &amp; Schuim</span>
                </button>
                <button
                  onClick={() => { sound.playPop(); setCareMode('play'); }}
                  className={`px-3 py-1.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-all ${
                    careMode === 'play' ? 'bg-purple-500 text-white shadow-xs' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <Music className="w-3.5 h-3.5" />
                  <span>Spelen &amp; Dansen</span>
                </button>
              </div>

              {/* Care Actions List */}
              {careMode === 'feed' && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {TAMAGOTCHI_FOODS.map(food => (
                    <button
                      key={food.id}
                      onClick={() => handleFeedFood(food)}
                      className="p-3 bg-white hover:bg-amber-50 border border-slate-200 hover:border-amber-300 rounded-2xl text-left transition-all cursor-pointer shadow-xs active:scale-95 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-3xl">{food.emoji}</span>
                        <div>
                          <span className="font-black text-xs text-slate-800 block">
                            {food.name}
                          </span>
                          <span className="text-[10px] text-emerald-700 font-bold">
                            +{food.effect.hunger}% Honger
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-black bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
                        {food.cost === 0 ? 'Gratis' : `${food.cost} 🪙`}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {careMode === 'wash' && (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleWashPet('soap')}
                    className="p-4 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-2xl text-center cursor-pointer transition-all shadow-xs active:scale-95"
                  >
                    <span className="text-4xl block mb-1">🧼</span>
                    <span className="font-black text-xs text-teal-900 block">Inzepen met Schuimbellen</span>
                    <span className="text-[10px] text-teal-700 font-medium">Maakt je dier super schoon! (+25 XP)</span>
                  </button>

                  <button
                    onClick={() => handleWashPet('shower')}
                    className="p-4 bg-cyan-50 hover:bg-cyan-100 border border-cyan-200 rounded-2xl text-center cursor-pointer transition-all shadow-xs active:scale-95"
                  >
                    <span className="text-4xl block mb-1">🚿</span>
                    <span className="font-black text-xs text-cyan-900 block">Warme Safari Douche</span>
                    <span className="text-[10px] text-cyan-700 font-medium">Lekker afspoelen en glanzen! (+30 XP)</span>
                  </button>
                </div>
              )}

              {careMode === 'play' && (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      triggerPetReaction('playing', `Gooi de bal maar op het scherm! 🎾`, 2500);
                    }}
                    className="p-4 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-2xl text-center cursor-pointer transition-all shadow-xs active:scale-95"
                  >
                    <span className="text-4xl block mb-1">🎾</span>
                    <span className="font-black text-xs text-purple-900 block">Balletje Overgooien</span>
                    <span className="text-[10px] text-purple-700 font-medium">Tik op de kamer om te gooien!</span>
                  </button>

                  <button
                    onClick={handleDanceParty}
                    className="p-4 bg-pink-50 hover:bg-pink-100 border border-pink-200 rounded-2xl text-center cursor-pointer transition-all shadow-xs active:scale-95"
                  >
                    <span className="text-4xl block mb-1">🪕</span>
                    <span className="font-black text-xs text-pink-900 block">Safari Dansfeestje</span>
                    <span className="text-[10px] text-pink-700 font-medium">Dans samen op vrolijke muziek!</span>
                  </button>
                </div>
              )}

            </div>
          )}

          {/* TAB 2: WARDROBE & HATS */}
          {activeTab === 'wardrobe' && (
            <div className="space-y-4">
              <div className="text-center">
                <h4 className="font-black text-base text-slate-900">
                  Kies een feestelijk hoedje of accessoire voor {companion.name}!
                </h4>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Laat je huisdier schitteren tijdens het leren en spelen!
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {TAMAGOTCHI_HATS.map(hat => {
                  const isEquipped = (companion.equippedHat || 'none') === hat.id;
                  return (
                    <button
                      key={hat.id}
                      onClick={() => handleEquipHat(hat.id)}
                      className={`p-4 rounded-2xl border text-center transition-all cursor-pointer shadow-xs ${
                        isEquipped
                          ? 'bg-amber-50 border-2 border-amber-500 shadow-md ring-2 ring-amber-400/30'
                          : 'bg-white hover:bg-slate-50 border-slate-200'
                      }`}
                    >
                      <span className="text-4xl block mb-1.5">{hat.emoji}</span>
                      <span className="font-black text-xs text-slate-800 block truncate">
                        {hat.name}
                      </span>
                      <span className={`text-[10px] font-bold mt-1 inline-block px-2 py-0.5 rounded-full ${
                        isEquipped ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {isEquipped ? 'Aangedaan ✨' : 'Aantrekken'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: ADOPT / SWITCH PET */}
          {activeTab === 'adopt' && (
            <div className="space-y-4">
              <div className="text-center">
                <h4 className="font-black text-base text-slate-900">
                  Adopteer je Favoriete Maatje
                </h4>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Kies uit een trouwe hond, knuffelig katje, wijze uil, speelse aap, panda en meer!
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ALL_PETS.map(pet => {
                  const isCurrent = companion.id === pet.id;

                  return (
                    <div
                      key={pet.id}
                      className={`p-4 rounded-2xl border transition-all relative flex flex-col justify-between ${
                        isCurrent
                          ? 'bg-amber-50 border-2 border-amber-500 shadow-md'
                          : 'bg-white hover:bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-100 to-rose-100 border border-slate-200 flex items-center justify-center text-3xl shadow-xs">
                          {pet.emoji}
                        </div>
                        <div className="flex-1">
                          <h5 className="font-black text-sm text-slate-900">
                            {pet.name}
                          </h5>
                          <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full inline-block mt-0.5">
                            {pet.species} • {pet.focusSkill}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 font-medium mb-3">
                        {pet.personality}
                      </p>

                      <button
                        onClick={() => handleAdoptPet(pet)}
                        disabled={isCurrent}
                        className={`w-full py-2 rounded-xl font-black text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                          isCurrent
                            ? 'bg-emerald-100 text-emerald-800 cursor-default'
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                        }`}
                      >
                        {isCurrent ? 'Huidig Maatje 🌟' : 'Adopteer Dit Maatje ✨'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* Bottom Notification Toast */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-2.5 bg-amber-100 border-t border-amber-300 text-amber-950 font-bold text-xs text-center"
            >
              {notification}
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </div>
  );
};
