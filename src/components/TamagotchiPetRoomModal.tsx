import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  X, Heart, Sparkles, Utensils, Moon, Sun, Music,
  Bath, Stethoscope, Trophy, Volume2, Edit3, Check,
  Smile, Shield, Zap, RefreshCw, ShoppingBag, ArrowRight,
  Flame, Award, Star, Compass, Play, Plus, Activity,
  Maximize2, Minimize2
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
import { useFullscreen } from '../hooks/useFullscreen';

interface TamagotchiPetRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: PlayerProfile;
  onUpdateProfile: (updater: (prev: PlayerProfile) => PlayerProfile) => void;
}

// Room Themes / Habitats
interface RoomTheme {
  id: string;
  name: string;
  emoji: string;
  bgGradient: string;
  wallAccents: string;
  floorColor: string;
  ambientParticles: string[];
  ambientLabel: string;
}

const ROOM_THEMES: RoomTheme[] = [
  {
    id: 'treehouse',
    name: 'Borneo Boomhut',
    emoji: '🌴',
    bgGradient: 'from-amber-100 via-emerald-50 to-teal-100',
    wallAccents: 'border-emerald-300/60',
    floorColor: 'from-amber-200 to-amber-300',
    ambientParticles: ['🍃', '✨', '🌸', '🌿'],
    ambientLabel: 'Frisse oerwoudbries & vogelgezang'
  },
  {
    id: 'crystal_castle',
    name: 'Magisch Kristalkasteel',
    emoji: '🔮',
    bgGradient: 'from-indigo-900 via-purple-900 to-slate-950',
    wallAccents: 'border-purple-400/60',
    floorColor: 'from-purple-950 to-slate-900',
    ambientParticles: ['💎', '✨', '🔮', '⭐'],
    ambientLabel: 'Stralende runenstenen & toverkracht'
  },
  {
    id: 'space_station',
    name: 'Kosmische Sterrenkamer',
    emoji: '🌌',
    bgGradient: 'from-slate-950 via-blue-950 to-indigo-950',
    wallAccents: 'border-cyan-400/60',
    floorColor: 'from-slate-900 to-indigo-900',
    ambientParticles: ['🪐', '🚀', '⭐', '✨'],
    ambientLabel: 'Zero-gravity & fonkelende sterrenstelsels'
  },
  {
    id: 'ocean_bay',
    name: 'Koraalrif Oceaanbaai',
    emoji: '🌊',
    bgGradient: 'from-cyan-900 via-teal-900 to-blue-950',
    wallAccents: 'border-cyan-300/60',
    floorColor: 'from-teal-950 to-blue-950',
    ambientParticles: ['🫧', '🐠', '🐚', '🌊'],
    ambientLabel: 'Zachte golven & speelse zeeschildpadden'
  },
  {
    id: 'circus_tent',
    name: 'Speelparadijs & Kermis',
    emoji: '🎪',
    bgGradient: 'from-rose-100 via-amber-50 to-yellow-100',
    wallAccents: 'border-rose-300/60',
    floorColor: 'from-orange-200 to-rose-200',
    ambientParticles: ['🎈', '🎉', '🍿', '⭐'],
    ambientLabel: 'Vrolijke kermismuziek & slingers'
  }
];

// Interactive Bubble for Bubble Popper Mini-game
interface FloatingBubble {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  points: number;
  icon: string;
}

export const TamagotchiPetRoomModal: React.FC<TamagotchiPetRoomModalProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile
}) => {
  const companion = profile.companion || createInitialCompanion();

  // Active care sub-station: 'care' | 'minigames' | 'vet' | 'wardrobe' | 'adopt'
  const [activeTab, setActiveTab] = useState<'care' | 'minigames' | 'vet' | 'wardrobe' | 'adopt'>('care');
  const [careMode, setCareMode] = useState<'feed' | 'wash' | 'play' | 'sleep'>('feed');

  // Room Theme state
  const [selectedThemeId, setSelectedThemeId] = useState<string>('treehouse');
  const activeTheme = ROOM_THEMES.find(t => t.id === selectedThemeId) || ROOM_THEMES[0];

  // Animation and reaction states
  const [petActionState, setPetActionState] = useState<'idle' | 'happy' | 'eating' | 'sleeping' | 'bathing' | 'playing' | 'dancing' | 'sad' | 'vet_exam' | 'bubble_pop'>('idle');
  const [speechBubble, setSpeechBubble] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [isLightsOff, setIsLightsOff] = useState(false);

  // Floating score/XP popups (+25 XP ✨)
  const [floatingPopups, setFloatingPopups] = useState<{ id: number; text: string; x: number; y: number; color: string }[]>([]);

  // Custom Pet Name Editing State
  const [isEditingName, setIsEditingName] = useState(false);
  const [customNameInput, setCustomNameInput] = useState(companion.name);

  // Mini-Game: Bubble Popper State
  const [isBubbleGameActive, setIsBubbleGameActive] = useState(false);
  const [bubbles, setBubbles] = useState<FloatingBubble[]>([]);
  const [bubbleGameScore, setBubbleGameScore] = useState(0);

  // Mini-Game: Rhythm Dance State
  const [danceBeatIndex, setDanceBeatIndex] = useState(0);
  const [danceCombo, setDanceCombo] = useState(0);

  // Interactive Bathing / Washing State
  const [sudsCount, setSudsCount] = useState(0);
  const [isUsingSponge, setIsUsingSponge] = useState(false);

  // Vet Clinic State
  const [vetScanProgress, setVetScanProgress] = useState(0);
  const [isScanningVet, setIsScanningVet] = useState(false);
  const [bandagesApplied, setBandagesApplied] = useState<number[]>([]);
  const { isFullscreen, containerRef, toggleFullscreen } = useFullscreen<HTMLDivElement>();

  // Synchronize customNameInput when companion changes
  useEffect(() => {
    setCustomNameInput(companion.name);
  }, [companion.name]);

  // Bubble Game Loop
  useEffect(() => {
    if (!isBubbleGameActive) return;

    // Spawn bubbles periodically
    const spawnInterval = setInterval(() => {
      if (bubbles.length < 8) {
        const newBubble: FloatingBubble = {
          id: Date.now() + Math.random(),
          x: 10 + Math.random() * 80,
          y: 85 + Math.random() * 10,
          size: 40 + Math.random() * 25,
          speed: 1.5 + Math.random() * 2,
          points: Math.random() > 0.3 ? 10 : 25,
          icon: Math.random() > 0.5 ? '🫧' : Math.random() > 0.5 ? '⭐' : '🪙'
        };
        setBubbles(prev => [...prev, newBubble]);
      }
    }, 900);

    // Float bubbles upwards
    const floatInterval = setInterval(() => {
      setBubbles(prev => 
        prev
          .map(b => ({ ...b, y: b.y - b.speed }))
          .filter(b => b.y > -15)
      );
    }, 50);

    return () => {
      clearInterval(spawnInterval);
      clearInterval(floatInterval);
    };
  }, [isBubbleGameActive, bubbles.length]);

  if (!isOpen) return null;

  // Vitals percentages
  const hunger = companion.hunger ?? 85;
  const happiness = companion.happiness ?? 90;
  const energy = companion.energy ?? 95;
  const cleanliness = companion.cleanliness ?? 90;
  const stageInfo = PET_GROWTH_STAGES[companion.level] || PET_GROWTH_STAGES[1];

  // Trigger floating popup helper
  const addFloatingPopup = (text: string, x = 50, y = 40, color = 'text-amber-400') => {
    const id = Date.now() + Math.random();
    setFloatingPopups(prev => [...prev, { id, text, x, y, color }]);
    setTimeout(() => {
      setFloatingPopups(prev => prev.filter(p => p.id !== id));
    }, 1200);
  };

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
      speech.speak(phrase, { rate: profile.name.toLowerCase() === 'ridheya' ? 0.88 : 1.0 });
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
    triggerPetReaction('happy', `Wat een toffe naam! Voortaan heet ik ${customNameInput.trim()}! ❤️`);
  };

  // 2. Adopt New Pet
  const handleAdoptPet = (petDef: typeof ALL_PETS[0]) => {
    sound.playFanfare();
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
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
    triggerPetReaction('happy', `Hoi ${profile.name}! Ik ben zo blij dat ik je beste maatje mag zijn! 🌟`, 4000);
  };

  // 3. Feed Pet with particle animation
  const handleFeedFood = (food: typeof TAMAGOTCHI_FOODS[0]) => {
    if (food.cost > 0 && profile.score < food.cost) {
      sound.playIncorrect();
      setNotification(`Je hebt ${food.cost} munten nodig! Los Cito-raadsels op om munten te verdienen! 🪙`);
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    sound.playStar();
    sound.playAnimalHappy(companion.id);
    addFloatingPopup(`+${food.effect.hunger}% Honger 🍖`, 45, 30, 'text-amber-500');
    addFloatingPopup(`+${food.effect.xp || 20} XP ✨`, 55, 35, 'text-emerald-500');

    onUpdateProfile(prev => {
      const nextHunger = Math.min(100, (prev.companion.hunger ?? 85) + (food.effect.hunger || 20));
      const nextHappiness = Math.min(100, (prev.companion.happiness ?? 90) + (food.effect.happiness || 10));
      const nextXp = prev.companion.xp + (food.effect.xp || 25);
      let nextLevel = prev.companion.level;
      let nextMaxXp = prev.companion.maxXp;
      let nextHearts = prev.companion.friendshipHearts;

      if (nextXp >= nextMaxXp && nextLevel < 7) {
        nextLevel += 1;
        nextMaxXp = Math.round(nextMaxXp * 1.5);
        nextHearts = Math.min(5, nextHearts + 1);
        sound.playLevelUp();
        confetti({ particleCount: 100, spread: 80 });
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

    triggerPetReaction('eating', `Nom nom nom! Die ${food.name} smaakt verrukkelijk, ${profile.name}! 😋✨`, 2800);
  };

  // 4. Interactive Sponge Scrubbing
  const handleApplySuds = () => {
    sound.playPop();
    setIsUsingSponge(true);
    setSudsCount(prev => Math.min(10, prev + 2));
    setPetActionState('bathing');
    addFloatingPopup('+15 Schuim 🧼', 48, 30, 'text-teal-400');
  };

  // 5. Shower Rinse
  const handleRinseShower = () => {
    sound.playStar();
    setSudsCount(0);
    setIsUsingSponge(false);
    triggerPetReaction('happy', `Zo heerlijk fris! Kijk eens hoe mijn vacht glanst! 🚿✨`, 2800);
    addFloatingPopup('100% Schoon! 🛁', 50, 25, 'text-cyan-400');
    addFloatingPopup('+35 XP ✨', 50, 35, 'text-emerald-400');

    onUpdateProfile(prev => ({
      ...prev,
      companion: {
        ...prev.companion,
        cleanliness: 100,
        happiness: Math.min(100, (prev.companion.happiness ?? 90) + 15),
        xp: prev.companion.xp + 35
      }
    }));
  };

  // 6. Pop Floating Bubble Mini-game
  const handlePopBubble = (bubbleId: number, points: number, x: number, y: number) => {
    sound.playPop();
    setBubbles(prev => prev.filter(b => b.id !== bubbleId));
    setBubbleGameScore(prev => prev + points);
    setPetActionState('bubble_pop');
    setTimeout(() => setPetActionState('idle'), 700);

    addFloatingPopup(`+${points} 🪙`, x, y, 'text-amber-400');

    onUpdateProfile(prev => ({
      ...prev,
      score: prev.score + points,
      companion: {
        ...prev.companion,
        xp: prev.companion.xp + points * 2,
        happiness: Math.min(100, (prev.companion.happiness ?? 90) + 5)
      }
    }));
  };

  // 7. Vet Scan Clinic Tool
  const handleStartVetScan = () => {
    sound.playStar();
    setIsScanningVet(true);
    setVetScanProgress(0);
    setPetActionState('vet_exam');

    let current = 0;
    const interval = setInterval(() => {
      current += 20;
      setVetScanProgress(current);
      sound.playPop();

      if (current >= 100) {
        clearInterval(interval);
        setIsScanningVet(false);
        sound.playFanfare();
        confetti({ particleCount: 50, spread: 60 });
        triggerPetReaction('happy', `Diagnose compleet! Hartslag perfect & Kerngezond! 🩺💚`, 3500);

        onUpdateProfile(prev => ({
          ...prev,
          score: prev.score + 25,
          companion: {
            ...prev.companion,
            energy: 100,
            happiness: 100,
            xp: prev.companion.xp + 45
          }
        }));
      }
    }, 400);
  };

  // 8. Place Band-Aid Sticker on Pet
  const handleApplyBandage = (posIndex: number) => {
    sound.playStar();
    setBandagesApplied(prev => [...prev, posIndex]);
    addFloatingPopup('Genezen! 🩹✨', 50, 40, 'text-rose-400');
    triggerPetReaction('happy', `Dankjewel voor de magische pleister, dokter ${profile.name}! ❤️`);
  };

  // 9. Rhythm Dance Beat Tap
  const handleTapDanceBeat = (direction: string) => {
    sound.playPop();
    setDanceBeatIndex(prev => (prev + 1) % 4);
    setDanceCombo(prev => prev + 1);
    setPetActionState('dancing');

    addFloatingPopup(`Dance Combo x${danceCombo + 1} 🎶`, 50, 30, 'text-pink-400');

    if ((danceCombo + 1) % 5 === 0) {
      sound.playFanfare();
      confetti({ particleCount: 40, spread: 50 });
      onUpdateProfile(prev => ({
        ...prev,
        score: prev.score + 15,
        companion: {
          ...prev.companion,
          xp: prev.companion.xp + 30
        }
      }));
    }
  };

  // 10. Sleep & Rest
  const handleToggleSleep = () => {
    sound.playStar();
    setIsLightsOff(prev => !prev);
    if (!isLightsOff) {
      setPetActionState('sleeping');
      setSpeechBubble(`Slaap lekker ${profile.name}... Droom van grote avonturen! Zzz 🌙`);
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
      setSpeechBubble(`Goedemorgen! Ik ben weer super fit en uitgerust! ☀️`);
      setTimeout(() => setSpeechBubble(null), 3000);
    }
  };

  // 11. Equip Hat / Accessory
  const handleEquipHat = (hatId: string) => {
    sound.playPop();
    onUpdateProfile(prev => ({
      ...prev,
      companion: {
        ...prev.companion,
        equippedHat: hatId
      }
    }));
    triggerPetReaction('happy', `Kijk eens hoe schitterend deze hoed mij staat! 🎩✨`, 2200);
  };

  return (
    <div className={`fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center ${isFullscreen ? 'p-0' : 'p-2 sm:p-4'} select-none`}>
      <motion.div
        ref={containerRef}
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        className={`bg-slate-900 ${
          isFullscreen
            ? 'w-full h-full max-w-none max-h-none rounded-none border-0'
            : 'rounded-3xl shadow-2xl border-4 border-amber-400 max-w-3xl w-full max-h-[94vh]'
        } overflow-hidden flex flex-col`}
      >
        {/* Top Header Bar */}
        <div className="bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 p-3 sm:p-4 text-white flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs border-2 border-white/40 flex items-center justify-center text-3xl shadow-inner">
              {companion.emoji}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-lg sm:text-xl leading-tight text-white drop-shadow-xs">
                  {companion.name}
                </h3>
                <button
                  onClick={() => setIsEditingName(true)}
                  className="p-1 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-all cursor-pointer"
                  title="Geef je dier een eigen naam"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[11px] font-bold text-amber-100">
                  {companion.species} • {stageInfo.title}
                </span>
                <span className="text-[10px] bg-amber-300 text-slate-950 font-black px-2 py-0.5 rounded-full">
                  Level {companion.level}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-2xl text-xs font-black flex items-center gap-1.5 border border-white/20 shadow-inner">
              <Trophy className="w-4 h-4 text-amber-300" />
              <span className="text-amber-300">{profile.score} 🪙</span>
            </div>
            <button
              onClick={toggleFullscreen}
              className="w-9 h-9 rounded-2xl bg-white/20 hover:bg-white/30 text-white flex items-center justify-center cursor-pointer transition-all border border-white/30"
              title={isFullscreen ? 'Verlaat Volledig Scherm' : 'Volledig Scherm'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-2xl bg-white/20 hover:bg-rose-600 text-white flex items-center justify-center cursor-pointer transition-all border border-white/30"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Navigation Tabs (5 Game Stations) */}
        <div className="bg-slate-950/80 p-1.5 border-b border-white/10 flex items-center justify-between gap-1 overflow-x-auto">
          <button
            onClick={() => { sound.playPop(); setActiveTab('care'); }}
            className={`flex-1 py-2 px-2.5 rounded-xl font-black text-[11px] sm:text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap transition-all ${
              activeTab === 'care'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>💖 Huisdier Zorg</span>
          </button>

          <button
            onClick={() => { sound.playPop(); setActiveTab('minigames'); }}
            className={`flex-1 py-2 px-2.5 rounded-xl font-black text-[11px] sm:text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap transition-all ${
              activeTab === 'minigames'
                ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🎮 Mini-Games</span>
          </button>

          <button
            onClick={() => { sound.playPop(); setActiveTab('vet'); }}
            className={`flex-1 py-2 px-2.5 rounded-xl font-black text-[11px] sm:text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap transition-all ${
              activeTab === 'vet'
                ? 'bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🩺 Dierenkliniek</span>
          </button>

          <button
            onClick={() => { sound.playPop(); setActiveTab('wardrobe'); }}
            className={`flex-1 py-2 px-2.5 rounded-xl font-black text-[11px] sm:text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap transition-all ${
              activeTab === 'wardrobe'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🎩 Hoedjes</span>
          </button>

          <button
            onClick={() => { sound.playPop(); setActiveTab('adopt'); }}
            className={`flex-1 py-2 px-2.5 rounded-xl font-black text-[11px] sm:text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap transition-all ${
              activeTab === 'adopt'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🐾 Adopteer</span>
          </button>
        </div>

        {/* Custom Pet Name Edit Popover */}
        <AnimatePresence>
          {isEditingName && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-amber-400 p-3.5 text-slate-950 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md"
            >
              <div className="flex-1 w-full">
                <label className="text-xs font-black uppercase tracking-wider block mb-1">
                  Kies een leuke naam voor je maatje:
                </label>
                <input
                  type="text"
                  value={customNameInput}
                  onChange={(e) => setCustomNameInput(e.target.value)}
                  placeholder="Bijv. Fluffy, Ollie, Rakker, Pip..."
                  className="w-full bg-white border-2 border-slate-900 rounded-xl px-3 py-1.5 text-sm font-bold text-slate-950 focus:outline-hidden"
                />
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handleSavePetName}
                  className="flex-1 sm:flex-initial px-4 py-2 bg-slate-950 hover:bg-slate-800 text-amber-300 font-black text-xs uppercase tracking-wider rounded-xl shadow-md cursor-pointer flex items-center justify-center gap-1"
                >
                  <Check className="w-4 h-4" />
                  <span>Opslaan</span>
                </button>
                <button
                  onClick={() => setIsEditingName(false)}
                  className="px-3 py-2 bg-amber-200 hover:bg-amber-300 text-slate-900 font-black text-xs rounded-xl cursor-pointer"
                >
                  Annuleren
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scrollable Center Room Content */}
        <div className="p-3 sm:p-4 overflow-y-auto flex-1 space-y-4 bg-slate-900 text-white">
          
          {/* MAIN ROOM STAGE (Rendered on Care, Minigames & Vet) */}
          {(activeTab === 'care' || activeTab === 'minigames' || activeTab === 'vet') && (
            <div className="space-y-3">
              
              {/* Habitat Theme Selector Bar */}
              <div className="flex items-center justify-between gap-2 bg-slate-950/60 p-1.5 rounded-2xl border border-white/10">
                <span className="text-[11px] font-black text-amber-300 uppercase tracking-wider pl-2 flex items-center gap-1">
                  <span>🎨</span>
                  <span className="hidden sm:inline">Kamer Thema:</span>
                </span>
                <div className="flex items-center gap-1.5 overflow-x-auto">
                  {ROOM_THEMES.map(theme => (
                    <button
                      key={theme.id}
                      onClick={() => {
                        sound.playPop();
                        setSelectedThemeId(theme.id);
                      }}
                      className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                        selectedThemeId === theme.id
                          ? 'bg-amber-400 text-slate-950 shadow-md scale-105'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      <span>{theme.emoji}</span>
                      <span className="text-[10px]">{theme.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Interactive Animated Room Environment */}
              <div 
                className={`relative rounded-3xl p-6 transition-all duration-700 overflow-hidden border-2 shadow-2xl min-h-[260px] sm:min-h-[290px] flex flex-col items-center justify-center ${
                  isLightsOff 
                    ? 'bg-gradient-to-b from-indigo-950 via-slate-950 to-slate-950 border-indigo-700 text-amber-200' 
                    : `bg-gradient-to-b ${activeTheme.bgGradient} ${activeTheme.wallAccents}`
                }`}
              >
                {/* Ambient Particles for active theme */}
                {!isLightsOff && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {activeTheme.ambientParticles.map((p, idx) => (
                      <motion.span
                        key={idx}
                        animate={{
                          y: [0, -40, 0],
                          x: [0, idx % 2 === 0 ? 20 : -20, 0],
                          opacity: [0.3, 0.8, 0.3],
                          rotate: [0, 45, 0]
                        }}
                        transition={{
                          duration: 4 + idx,
                          repeat: Infinity,
                          ease: 'easeInOut'
                        }}
                        style={{
                          top: `${15 + idx * 20}%`,
                          left: `${10 + idx * 25}%`
                        }}
                        className="absolute text-xl select-none"
                      >
                        {p}
                      </motion.span>
                    ))}
                  </div>
                )}

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
                      className="absolute top-3 bg-slate-950/95 text-amber-300 border-2 border-amber-400 px-4 py-2 rounded-2xl text-xs sm:text-sm font-black shadow-xl z-30 max-w-[85%] text-center"
                    >
                      {speechBubble}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Floating Popups (+25 XP ✨, +10 🪙) */}
                <AnimatePresence>
                  {floatingPopups.map(popup => (
                    <motion.div
                      key={popup.id}
                      initial={{ opacity: 1, scale: 0.8, y: 0 }}
                      animate={{ opacity: 0, scale: 1.3, y: -40 }}
                      exit={{ opacity: 0 }}
                      style={{ top: `${popup.y}%`, left: `${popup.x}%` }}
                      className={`absolute font-black text-sm sm:text-base pointer-events-none z-50 drop-shadow-md ${popup.color}`}
                    >
                      {popup.text}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Interactive Soap Suds on Pet */}
                {sudsCount > 0 && (
                  <div className="absolute inset-0 pointer-events-none z-25 flex items-center justify-center">
                    {Array.from({ length: sudsCount }).map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ scale: [0.8, 1.2, 0.8], rotate: [-10, 10, -10] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.1 }}
                        style={{
                          top: `${40 + (i % 3) * 15}%`,
                          left: `${35 + (i % 4) * 10}%`
                        }}
                        className="absolute text-2xl filter drop-shadow-md"
                      >
                        🫧
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Bandages on Pet in Vet mode */}
                {bandagesApplied.map(pos => (
                  <motion.div
                    key={pos}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    style={{
                      top: `${45 + (pos % 2) * 20}%`,
                      left: `${40 + (pos % 3) * 10}%`
                    }}
                    className="absolute text-2xl z-25 filter drop-shadow-md"
                  >
                    🩹
                  </motion.div>
                ))}

                {/* Animated Interactive Pet Rig */}
                <div className="my-2 relative z-20">
                  <PetAnimatedAvatar
                    companion={companion}
                    size={175}
                    actionState={petActionState}
                    onClick={() => {
                      sound.playStar();
                      sound.playAnimalHappy(companion.id);
                      addFloatingPopup('+15 Vriendschap ❤️', 50, 30, 'text-rose-400');
                      triggerPetReaction('happy', `Prrr! Ik ben zo dol op jou, ${profile.name}! ❤️`);
                    }}
                  />
                </div>

                {/* Interactive Floating Bubbles in Bubble Mini-Game */}
                {isBubbleGameActive && bubbles.map(b => (
                  <motion.button
                    key={b.id}
                    onClick={() => handlePopBubble(b.id, b.points, b.x, b.y)}
                    style={{
                      top: `${b.y}%`,
                      left: `${b.x}%`,
                      width: `${b.size}px`,
                      height: `${b.size}px`
                    }}
                    className="absolute z-40 bg-gradient-to-tr from-cyan-400/80 to-blue-400/80 rounded-full border-2 border-white flex items-center justify-center text-xl shadow-lg cursor-pointer hover:scale-125 transition-transform animate-pulse"
                  >
                    <span>{b.icon}</span>
                  </motion.button>
                ))}

                {/* Sleep Button Toggle */}
                <button
                  onClick={(e) => { e.stopPropagation(); handleToggleSleep(); }}
                  className={`absolute bottom-3 right-3 px-3 py-1.5 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg cursor-pointer transition-all border ${
                    isLightsOff
                      ? 'bg-amber-400 text-slate-950 border-amber-500'
                      : 'bg-slate-900/90 text-amber-300 border-white/20 hover:bg-slate-800'
                  }`}
                >
                  {isLightsOff ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  <span>{isLightsOff ? 'Licht Aan ☀️' : 'Dutje Doen 🌙'}</span>
                </button>

                {/* Ambient Floor Description */}
                <div className="absolute bottom-3 left-3 text-[10px] font-bold text-slate-800 bg-white/80 px-2.5 py-1 rounded-full pointer-events-none shadow-xs">
                  {activeTheme.ambientLabel}
                </div>
              </div>

              {/* Tamagotchi Vitals Status Bars with Glowing Effects */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {/* 1. Hunger */}
                <div className="bg-slate-950/80 border border-amber-500/30 rounded-2xl p-2.5 shadow-inner">
                  <div className="flex items-center justify-between text-xs font-black text-amber-300 mb-1">
                    <span>🍖 Honger</span>
                    <span>{hunger}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500" 
                      style={{ width: `${hunger}%` }} 
                    />
                  </div>
                </div>

                {/* 2. Happiness */}
                <div className="bg-slate-950/80 border border-rose-500/30 rounded-2xl p-2.5 shadow-inner">
                  <div className="flex items-center justify-between text-xs font-black text-rose-300 mb-1">
                    <span>💖 Blijdschap</span>
                    <span>{happiness}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5">
                    <div 
                      className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full transition-all duration-500" 
                      style={{ width: `${happiness}%` }} 
                    />
                  </div>
                </div>

                {/* 3. Energy */}
                <div className="bg-slate-950/80 border border-blue-500/30 rounded-2xl p-2.5 shadow-inner">
                  <div className="flex items-center justify-between text-xs font-black text-blue-300 mb-1">
                    <span>⚡ Energie</span>
                    <span>{energy}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-500" 
                      style={{ width: `${energy}%` }} 
                    />
                  </div>
                </div>

                {/* 4. Cleanliness */}
                <div className="bg-slate-950/80 border border-teal-500/30 rounded-2xl p-2.5 shadow-inner">
                  <div className="flex items-center justify-between text-xs font-black text-teal-300 mb-1">
                    <span>🛁 Schoonheid</span>
                    <span>{cleanliness}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5">
                    <div 
                      className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full transition-all duration-500" 
                      style={{ width: `${cleanliness}%` }} 
                    />
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 1: MAIN CARE SUB-STATIONS */}
          {activeTab === 'care' && (
            <div className="space-y-3">
              {/* Care Sub-Stations Navigation */}
              <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                <button
                  onClick={() => { sound.playPop(); setCareMode('feed'); }}
                  className={`px-3.5 py-2 rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all ${
                    careMode === 'feed' ? 'bg-amber-500 text-slate-950 shadow-md font-black' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  <Utensils className="w-4 h-4" />
                  <span>Traktaties Voeren</span>
                </button>
                <button
                  onClick={() => { sound.playPop(); setCareMode('wash'); }}
                  className={`px-3.5 py-2 rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all ${
                    careMode === 'wash' ? 'bg-teal-500 text-slate-950 shadow-md font-black' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  <Bath className="w-4 h-4" />
                  <span>Interactief Baden</span>
                </button>
                <button
                  onClick={() => { sound.playPop(); setCareMode('play'); }}
                  className={`px-3.5 py-2 rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all ${
                    careMode === 'play' ? 'bg-purple-500 text-white shadow-md font-black' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  <Music className="w-4 h-4" />
                  <span>Spelen &amp; Dansen</span>
                </button>
              </div>

              {/* Feed Mode */}
              {careMode === 'feed' && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {TAMAGOTCHI_FOODS.map(food => (
                    <button
                      key={food.id}
                      onClick={() => handleFeedFood(food)}
                      className="p-3 bg-slate-950 hover:bg-slate-800 border-2 border-slate-800 hover:border-amber-400 rounded-2xl text-left transition-all cursor-pointer shadow-md active:scale-95 flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-3xl group-hover:scale-125 transition-transform">{food.emoji}</span>
                        <div>
                          <span className="font-black text-xs text-white block">
                            {food.name}
                          </span>
                          <span className="text-[10px] text-emerald-400 font-bold">
                            +{food.effect.hunger}% Honger
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-black bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full">
                        {food.cost === 0 ? 'Gratis' : `${food.cost} 🪙`}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* Wash Mode */}
              {careMode === 'wash' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={handleApplySuds}
                    className="p-4 bg-gradient-to-br from-teal-950 to-slate-950 border-2 border-teal-500/50 hover:border-teal-400 rounded-2xl text-center cursor-pointer transition-all shadow-lg active:scale-95 group"
                  >
                    <span className="text-4xl block mb-1 group-hover:scale-110 transition-transform">🧼</span>
                    <span className="font-black text-sm text-teal-300 block">Spons &amp; Schuimbellen Maken</span>
                    <span className="text-xs text-slate-400 font-medium mt-0.5 block">Tik meerdere keren om meer zeepsop te maken!</span>
                  </button>

                  <button
                    onClick={handleRinseShower}
                    className="p-4 bg-gradient-to-br from-cyan-950 to-slate-950 border-2 border-cyan-500/50 hover:border-cyan-400 rounded-2xl text-center cursor-pointer transition-all shadow-lg active:scale-95 group"
                  >
                    <span className="text-4xl block mb-1 group-hover:scale-110 transition-transform">🚿</span>
                    <span className="font-black text-sm text-cyan-300 block">Warme Douche Afspoelen</span>
                    <span className="text-xs text-slate-400 font-medium mt-0.5 block">Spoelt alle zeep weg en geeft +35 XP!</span>
                  </button>
                </div>
              )}

              {/* Play Mode */}
              {careMode === 'play' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      sound.playFanfare();
                      setPetActionState('dancing');
                      triggerPetReaction('dancing', `Joepie! Tijd voor het grote Safarifeest! 🪕🎶`, 3500);
                      onUpdateProfile(prev => ({
                        ...prev,
                        companion: {
                          ...prev.companion,
                          happiness: 100,
                          xp: prev.companion.xp + 35
                        }
                      }));
                    }}
                    className="p-4 bg-gradient-to-br from-pink-950 to-slate-950 border-2 border-pink-500/50 hover:border-pink-400 rounded-2xl text-center cursor-pointer transition-all shadow-lg active:scale-95 group"
                  >
                    <span className="text-4xl block mb-1 group-hover:scale-110 transition-transform">🪕</span>
                    <span className="font-black text-sm text-pink-300 block">Safari Dansfeestje</span>
                    <span className="text-xs text-slate-400 font-medium mt-0.5 block">Start vrolijke safarimuziek en laat je dier dansen!</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('minigames');
                      setIsBubbleGameActive(true);
                    }}
                    className="p-4 bg-gradient-to-br from-purple-950 to-slate-950 border-2 border-purple-500/50 hover:border-purple-400 rounded-2xl text-center cursor-pointer transition-all shadow-lg active:scale-95 group"
                  >
                    <span className="text-4xl block mb-1 group-hover:scale-110 transition-transform">🫧</span>
                    <span className="font-black text-sm text-purple-300 block">Start Bellen Prikken Mini-Game</span>
                    <span className="text-xs text-slate-400 font-medium mt-0.5 block">Prik zwevende bellen voor munten en XP!</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: MINI-GAMES STATION */}
          {activeTab === 'minigames' && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-purple-950 to-slate-950 border-2 border-purple-500/40 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <h4 className="font-black text-base text-purple-300 flex items-center gap-2">
                    <span>🎮</span>
                    <span>Interactieve Mini-Games &amp; Arcade</span>
                  </h4>
                  <p className="text-xs text-slate-400 font-medium">
                    Speel met je dier om extra munten, sterren en XP te verdienen!
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black uppercase text-amber-400 block">Game Score:</span>
                  <span className="text-lg font-black text-white">{bubbleGameScore} 🪙</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Mini-Game 1: Bubble Pop */}
                <div className="bg-slate-950 border-2 border-cyan-500/40 rounded-2xl p-4 flex flex-col justify-between gap-3">
                  <div>
                    <span className="text-3xl block mb-1">🫧</span>
                    <h5 className="font-black text-sm text-cyan-300">Bellen Prikker (Bubble Popper)</h5>
                    <p className="text-xs text-slate-400 font-medium mt-1">
                      Tik op alle zwevende bellen op het kamerscherm voordat ze wegvliegen!
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      sound.playStar();
                      setIsBubbleGameActive(prev => !prev);
                    }}
                    className={`w-full py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      isBubbleGameActive
                        ? 'bg-rose-600 text-white shadow-lg animate-pulse'
                        : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                    }`}
                  >
                    <span>{isBubbleGameActive ? 'Stop Bellen Spel ⏹️' : 'Start Bellen Spel ▶️'}</span>
                  </button>
                </div>

                {/* Mini-Game 2: Rhythm Beat */}
                <div className="bg-slate-950 border-2 border-pink-500/40 rounded-2xl p-4 flex flex-col justify-between gap-3">
                  <div>
                    <span className="text-3xl block mb-1">🎵</span>
                    <h5 className="font-black text-sm text-pink-300">Rhythm Disco Tap</h5>
                    <p className="text-xs text-slate-400 font-medium mt-1">
                      Tik op het ritme om dance combos op te bouwen en speciale trucs te ontgrendelen!
                    </p>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {['⬆️', '⬇️', '⬅️', '➡️'].map((dir, i) => (
                      <button
                        key={dir}
                        onClick={() => handleTapDanceBeat(dir)}
                        className={`py-2 rounded-xl text-sm font-black transition-all cursor-pointer ${
                          danceBeatIndex === i
                            ? 'bg-pink-500 text-white scale-105 shadow-md ring-2 ring-pink-300'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {dir}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: VETERINARIAN CLINIC */}
          {activeTab === 'vet' && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-rose-950 to-slate-950 border-2 border-rose-500/40 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <h4 className="font-black text-base text-rose-300 flex items-center gap-2">
                    <Stethoscope className="w-5 h-5 text-rose-400" />
                    <span>Dierenkliniek &amp; Gezondheidscheck</span>
                  </h4>
                  <p className="text-xs text-slate-400 font-medium">
                    Gebruik de stethoscoop, scan de hartslag en plak magische pleisters!
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Vet Tool 1: Stethoscope Scan */}
                <div className="bg-slate-950 border-2 border-emerald-500/40 rounded-2xl p-4 flex flex-col justify-between gap-3">
                  <div>
                    <span className="text-3xl block mb-1">🩺</span>
                    <h5 className="font-black text-sm text-emerald-300">Stethoscoop &amp; ECG Scan</h5>
                    <p className="text-xs text-slate-400 font-medium mt-1">
                      Luister naar de hartslag van {companion.name} en meet de lichaamstemperatuur.
                    </p>
                    {isScanningVet && (
                      <div className="mt-2">
                        <div className="flex justify-between text-[11px] font-black text-emerald-300 mb-1">
                          <span>Scannen...</span>
                          <span>{vetScanProgress}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-400 rounded-full transition-all" style={{ width: `${vetScanProgress}%` }} />
                        </div>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={handleStartVetScan}
                    disabled={isScanningVet}
                    className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50"
                  >
                    <Activity className="w-4 h-4" />
                    <span>{isScanningVet ? 'Scannen...' : 'Start Gezondheidsscan ➔'}</span>
                  </button>
                </div>

                {/* Vet Tool 2: Magic Band-Aids */}
                <div className="bg-slate-950 border-2 border-rose-500/40 rounded-2xl p-4 flex flex-col justify-between gap-3">
                  <div>
                    <span className="text-3xl block mb-1">🩹</span>
                    <h5 className="font-black text-sm text-rose-300">Magische Zalf &amp; Pleisters</h5>
                    <p className="text-xs text-slate-400 font-medium mt-1">
                      Verzorg kleine krasjes met wonderzalf en vrolijke dierenpleisters!
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3].map(idx => (
                      <button
                        key={idx}
                        onClick={() => handleApplyBandage(idx)}
                        className="py-2 bg-rose-500/20 hover:bg-rose-500/40 border border-rose-400/40 rounded-xl text-xs font-black text-rose-200 transition-all cursor-pointer flex items-center justify-center gap-1"
                      >
                        <span>🩹 Pleister {idx}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: WARDROBE & HATS */}
          {activeTab === 'wardrobe' && (
            <div className="space-y-4">
              <div className="text-center">
                <h4 className="font-black text-base text-white">
                  Kies een feestelijk hoedje of accessoire voor {companion.name}!
                </h4>
                <p className="text-xs text-slate-400 font-medium mt-0.5">
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
                      className={`p-4 rounded-2xl border-2 text-center transition-all cursor-pointer shadow-md ${
                        isEquipped
                          ? 'bg-amber-500/20 border-amber-400 text-amber-300 ring-2 ring-amber-400/40'
                          : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-white'
                      }`}
                    >
                      <span className="text-4xl block mb-1.5">{hat.emoji}</span>
                      <span className="font-black text-xs block truncate">
                        {hat.name}
                      </span>
                      <span className={`text-[10px] font-black mt-1.5 inline-block px-2.5 py-0.5 rounded-full ${
                        isEquipped ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {isEquipped ? 'Aangedaan ✨' : 'Aantrekken'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 5: ADOPT / SWITCH PET */}
          {activeTab === 'adopt' && (
            <div className="space-y-4">
              <div className="text-center">
                <h4 className="font-black text-base text-white">
                  Adopteer je Favoriete Maatje
                </h4>
                <p className="text-xs text-slate-400 font-medium mt-0.5">
                  Kies uit een trouwe hond, knuffelig katje, wijze uil, speelse aap, panda en meer!
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ALL_PETS.map(pet => {
                  const isCurrent = companion.id === pet.id;

                  return (
                    <div
                      key={pet.id}
                      className={`p-4 rounded-2xl border-2 transition-all relative flex flex-col justify-between ${
                        isCurrent
                          ? 'bg-amber-500/20 border-amber-400 shadow-lg'
                          : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-white/20 flex items-center justify-center p-1 shadow-inner overflow-hidden">
                          <PetAnimatedAvatar
                            companion={{
                              ...companion,
                              id: pet.id,
                              species: pet.species,
                              name: pet.name,
                              emoji: pet.emoji
                            }}
                            size={56}
                            showHat={false}
                            showAura={false}
                            actionState="idle"
                          />
                        </div>
                        <div className="flex-1">
                          <h5 className="font-black text-sm text-white flex items-center gap-1.5">
                            <span>{pet.name}</span>
                            <span className="text-base">{pet.emoji}</span>
                          </h5>
                          <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-400/20 px-2 py-0.5 rounded-full inline-block mt-0.5">
                            {pet.species} • {pet.focusSkill}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 font-medium mb-3">
                        {pet.personality}
                      </p>

                      <button
                        onClick={() => handleAdoptPet(pet)}
                        disabled={isCurrent}
                        className={`w-full py-2 rounded-xl font-black text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                          isCurrent
                            ? 'bg-emerald-500/30 text-emerald-300 cursor-default'
                            : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 shadow-md'
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
              className="p-2.5 bg-amber-400 text-slate-950 font-black text-xs text-center"
            >
              {notification}
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </div>
  );
};
