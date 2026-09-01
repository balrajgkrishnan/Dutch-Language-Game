import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, Sparkles, Utensils, Volume2, Camera, Stethoscope, 
  Bell, Compass, Sun, Moon, Sunset, Footprints, Wind, X, 
  Check, ArrowRight, Award, Zap, Smile, Play
} from 'lucide-react';
import { Animal, BiomeType, PlayerProfile } from '../types';
import { BIOMES } from '../data/biomeData';
import { FOOD_ITEMS } from '../data/gameData';
import { sound } from '../services/soundService';
import { speech } from '../services/speechService';
import { TocaAvatar } from './TocaAvatar';
import { AnimalAvatar } from './AnimalAvatar';

interface AnimatedSafariParkProps {
  animals: Animal[];
  score: number;
  profile: PlayerProfile;
  selectedBiome?: BiomeType | 'all';
  onFeedAnimal: (animalId: string, foodCost: number, heartsGiven: number) => void;
  onPetAnimal: (animalId: string) => void;
  onGoToAdventure: () => void;
}

interface RoamingAnimalState {
  id: string;
  x: number; // percentage 5% to 92%
  y: number; // percentage 15% to 85%
  targetX: number;
  targetY: number;
  direction: 'left' | 'right';
  action: 'walking' | 'grazing' | 'sleeping' | 'happy' | 'playing';
  actionTimer: number;
  bubble: string | null;
  bubbleTimer: number;
  bounceOffset: number;
}

export const AnimatedSafariPark: React.FC<AnimatedSafariParkProps> = ({
  animals,
  score,
  profile,
  selectedBiome: initialBiome = 'all',
  onFeedAnimal,
  onPetAnimal,
  onGoToAdventure
}) => {
  const [activeBiome, setActiveBiome] = useState<BiomeType | 'all'>(initialBiome);
  const [timeOfDay, setTimeOfDay] = useState<'day' | 'sunset' | 'night'>('day');
  const [isSkating, setIsSkating] = useState<boolean>(false);

  // Player position in the park (% coordinates)
  const [playerPos, setPlayerPos] = useState<{ x: number; y: number }>({ x: 50, y: 65 });
  const [playerTarget, setPlayerTarget] = useState<{ x: number; y: number } | null>(null);
  const [playerFacing, setPlayerFacing] = useState<'left' | 'right'>('right');
  const [isPlayerWalking, setIsPlayerWalking] = useState(false);
  const [footprints, setFootprints] = useState<{ id: number; x: number; y: number }[]>([]);

  // Proximity & Selected animal interaction
  const [selectedAnimalId, setSelectedAnimalId] = useState<string | null>(null);
  const [nearbyAnimal, setNearbyAnimal] = useState<Animal | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [polaroidPhoto, setPolaroidPhoto] = useState<{ animal: Animal; timestamp: string } | null>(null);
  const [showVetCheckup, setShowVetCheckup] = useState<Animal | null>(null);

  // Filter animals by active biome
  const unlockedAnimals = animals.filter(a => a.unlocked);
  const currentBiomeAnimals = activeBiome === 'all'
    ? unlockedAnimals
    : unlockedAnimals.filter(a => a.biome === activeBiome);

  // Animals roaming state
  const [roamingAnimals, setRoamingAnimals] = useState<Record<string, RoamingAnimalState>>({});

  // Park container ref for click-to-move calculations
  const parkRef = useRef<HTMLDivElement>(null);

  // Initialize roaming animal positions
  useEffect(() => {
    const initialStates: Record<string, RoamingAnimalState> = {};
    currentBiomeAnimals.forEach((animal, index) => {
      // Distribute evenly across map
      const cols = Math.max(3, Math.ceil(Math.sqrt(currentBiomeAnimals.length)));
      const col = index % cols;
      const row = Math.floor(index / cols);
      const baseX = 12 + (col * (76 / cols)) + (Math.random() * 8 - 4);
      const baseY = 25 + (row * (55 / Math.max(1, Math.ceil(currentBiomeAnimals.length / cols)))) + (Math.random() * 8 - 4);

      initialStates[animal.id] = {
        id: animal.id,
        x: Math.max(8, Math.min(88, baseX)),
        y: Math.max(20, Math.min(82, baseY)),
        targetX: baseX,
        targetY: baseY,
        direction: Math.random() > 0.5 ? 'right' : 'left',
        action: 'grazing',
        actionTimer: 20 + Math.random() * 30,
        bubble: null,
        bubbleTimer: 0,
        bounceOffset: 0
      };
    });
    setRoamingAnimals(initialStates);
  }, [activeBiome, currentBiomeAnimals.length]);

  // Main Animal AI & Wandering Loop
  useEffect(() => {
    const interval = setInterval(() => {
      setRoamingAnimals(prev => {
        const next = { ...prev };
        Object.keys(next).forEach(animalId => {
          const state = { ...next[animalId] };
          state.actionTimer -= 1;
          state.bubbleTimer = Math.max(0, state.bubbleTimer - 1);
          if (state.bubbleTimer === 0) state.bubble = null;

          // Pick new action if timer expired
          if (state.actionTimer <= 0) {
            const rand = Math.random();
            if (rand < 0.45) {
              // Start walking to a new spot
              state.action = 'walking';
              state.actionTimer = 40 + Math.random() * 50;
              const newX = Math.max(10, Math.min(88, state.x + (Math.random() * 30 - 15)));
              const newY = Math.max(20, Math.min(80, state.y + (Math.random() * 24 - 12)));
              state.targetX = newX;
              state.targetY = newY;
              state.direction = newX >= state.x ? 'right' : 'left';
            } else if (rand < 0.75) {
              // Graze / Eat
              state.action = 'grazing';
              state.actionTimer = 35 + Math.random() * 40;
              if (Math.random() < 0.3) {
                state.bubble = '🌿';
                state.bubbleTimer = 25;
              }
            } else if (rand < 0.9) {
              // Happy bounce
              state.action = 'happy';
              state.actionTimer = 25 + Math.random() * 25;
              state.bubble = '❤️';
              state.bubbleTimer = 25;
            } else {
              // Nap / Sleep
              state.action = 'sleeping';
              state.actionTimer = 50 + Math.random() * 60;
              state.bubble = '💤';
              state.bubbleTimer = 50;
            }
          }

          // Move animal if walking
          if (state.action === 'walking') {
            const dx = state.targetX - state.x;
            const dy = state.targetY - state.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist > 0.8) {
              const speed = 0.35;
              state.x += (dx / dist) * speed;
              state.y += (dy / dist) * speed;
              state.direction = dx >= 0 ? 'right' : 'left';
              state.bounceOffset = Math.sin(Date.now() / 150) * 4;
            } else {
              state.action = 'grazing';
              state.actionTimer = 30 + Math.random() * 30;
              state.bounceOffset = 0;
            }
          } else if (state.action === 'happy') {
            state.bounceOffset = Math.abs(Math.sin(Date.now() / 120)) * 8;
          } else {
            state.bounceOffset = 0;
          }

          next[animalId] = state;
        });
        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Player Smooth Walking to Target Loop
  useEffect(() => {
    if (!playerTarget) {
      setIsPlayerWalking(false);
      return;
    }

    const interval = setInterval(() => {
      setPlayerPos(current => {
        const dx = playerTarget.x - current.x;
        const dy = playerTarget.y - current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 1.2) {
          setPlayerTarget(null);
          setIsPlayerWalking(false);
          return current;
        }

        const moveSpeed = isSkating ? 2.2 : 1.2;
        const nextX = current.x + (dx / dist) * moveSpeed;
        const nextY = current.y + (dy / dist) * moveSpeed;
        setPlayerFacing(dx >= 0 ? 'right' : 'left');
        setIsPlayerWalking(true);

        // Add subtle footprint
        if (Math.random() < 0.25) {
          setFootprints(prev => [...prev.slice(-8), { id: Date.now() + Math.random(), x: nextX, y: nextY + 3 }]);
        }

        return { x: nextX, y: nextY };
      });
    }, 50);

    return () => clearInterval(interval);
  }, [playerTarget, isSkating]);

  // Proximity Detection: Check if player is near any animal
  useEffect(() => {
    let closestAnimal: Animal | null = null;
    let minDistance = 14; // Proximity radius in %

    currentBiomeAnimals.forEach(animal => {
      const pos = roamingAnimals[animal.id];
      if (pos) {
        const dx = pos.x - playerPos.x;
        const dy = pos.y - playerPos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < minDistance) {
          minDistance = dist;
          closestAnimal = animal;
        }
      }
    });

    setNearbyAnimal(closestAnimal);
  }, [playerPos, roamingAnimals, currentBiomeAnimals]);

  // Keyboard navigation listener (WASD & Arrow Keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const step = isSkating ? 5 : 3;
      let newX = playerPos.x;
      let newY = playerPos.y;
      let moved = false;

      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        newY = Math.max(18, playerPos.y - step);
        moved = true;
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        newY = Math.min(84, playerPos.y + step);
        moved = true;
      } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        newX = Math.max(6, playerPos.x - step);
        setPlayerFacing('left');
        moved = true;
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        newX = Math.min(92, playerPos.x + step);
        setPlayerFacing('right');
        moved = true;
      }

      if (moved) {
        setPlayerTarget(null);
        setIsPlayerWalking(true);
        setPlayerPos({ x: newX, y: newY });
        setTimeout(() => setIsPlayerWalking(false), 200);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playerPos, isSkating]);

  // Handle clicking on the park ground to walk
  const handleParkClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!parkRef.current) return;
    const rect = parkRef.current.getBoundingClientRect();
    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;

    const clampedX = Math.max(6, Math.min(92, xPercent));
    const clampedY = Math.max(18, Math.min(84, yPercent));

    setPlayerTarget({ x: clampedX, y: clampedY });
    sound.playPop();
  };

  // Safari Whistle / Bell: Gather nearby animals around the player
  const handleRingSafariBell = () => {
    sound.playStar();
    sound.playFanfare();
    setNotification('🔔 Boerin Tess / Ranger luidt de safaribel! Alle dieren komen vrolijk naar je toe!');
    setTimeout(() => setNotification(null), 4000);

    setRoamingAnimals(prev => {
      const next = { ...prev };
      Object.keys(next).forEach((animalId, index) => {
        const angle = (index / Object.keys(next).length) * Math.PI * 2;
        const radius = 10 + Math.random() * 8;
        const targetX = Math.max(8, Math.min(90, playerPos.x + Math.cos(angle) * radius));
        const targetY = Math.max(20, Math.min(82, playerPos.y + Math.sin(angle) * radius));

        next[animalId] = {
          ...next[animalId],
          targetX,
          targetY,
          action: 'walking',
          actionTimer: 80,
          bubble: '❤️',
          bubbleTimer: 50
        };
      });
      return next;
    });
  };

  // Pet Animal Action
  const handlePet = (animal: Animal) => {
    sound.playStar();
    sound.playAnimalHappy(animal.soundName || 'general');
    onPetAnimal(animal.id);
    setNotification(`Je aait ${animal.name}! ${animal.name} spint van blijdschap! ✨ +2 ⭐`);
    setTimeout(() => setNotification(null), 3000);

    // Make animal happy
    setRoamingAnimals(prev => {
      if (!prev[animal.id]) return prev;
      return {
        ...prev,
        [animal.id]: {
          ...prev[animal.id],
          action: 'happy',
          actionTimer: 40,
          bubble: '💖',
          bubbleTimer: 40
        }
      };
    });
  };

  // Feed Animal Action
  const handleFeed = (animal: Animal) => {
    const favFood = FOOD_ITEMS[0];
    if (score < favFood.cost) {
      sound.playIncorrect();
      setNotification(`Je hebt ${favFood.cost} munten nodig om ${animal.name} te voeren! Speel quizzen om munten te verdienen! 🪙`);
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    sound.playPop();
    sound.playAnimalHappy(animal.soundName || 'general');
    onFeedAnimal(animal.id, favFood.cost, favFood.heartsGiven);
    setNotification(`${animal.name} eet lekker van ${animal.favoriteFood || favFood.name}! +${favFood.heartsGiven} ❤️`);
    setTimeout(() => setNotification(null), 3000);

    setRoamingAnimals(prev => {
      if (!prev[animal.id]) return prev;
      return {
        ...prev,
        [animal.id]: {
          ...prev[animal.id],
          action: 'happy',
          actionTimer: 50,
          bubble: animal.favoriteFoodEmoji || '🍎',
          bubbleTimer: 40
        }
      };
    });
  };

  // Listen to Animal Fact
  const handleSpeakFact = (animal: Animal) => {
    sound.playPop();
    const factText = `${animal.name}. ${animal.personality} Wist je dat: ${animal.funFact}`;
    speech.speak(factText, { rate: profile.name.toLowerCase() === 'ridheya' ? 0.85 : 1.0 });
    setNotification(`🎙️ ${animal.name}: "${animal.funFact}"`);
    setTimeout(() => setNotification(null), 6000);
  };

  // Snap Safari Polaroid Photo
  const handleSnapPhoto = (animal: Animal) => {
    sound.playStar();
    sound.playFanfare();
    const newPhoto = {
      animal,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setPolaroidPhoto(newPhoto);
  };

  // D-Pad Touch Controls Helper
  const handleDPadMove = (dx: number, dy: number) => {
    const step = isSkating ? 8 : 5;
    const newX = Math.max(6, Math.min(92, playerPos.x + dx * step));
    const newY = Math.max(18, Math.min(84, playerPos.y + dy * step));
    if (dx !== 0) setPlayerFacing(dx > 0 ? 'right' : 'left');
    setPlayerTarget(null);
    setIsPlayerWalking(true);
    setPlayerPos({ x: newX, y: newY });
    setTimeout(() => setIsPlayerWalking(false), 200);
  };

  // Biome Themes and Scenery Decor Styling
  const biomeTheme = {
    farm: {
      bg: 'from-emerald-300 via-green-400 to-lime-500',
      path: 'bg-amber-200/50',
      pond: 'bg-cyan-400/80 border-cyan-300',
      fence: 'border-amber-700/60',
      trees: ['🌳', '🏡', '🌾', '🌻', '🍎', '🚜', '🌸']
    },
    safari: {
      bg: 'from-amber-200 via-yellow-300 to-orange-300',
      path: 'bg-amber-400/50',
      pond: 'bg-cyan-500/70 border-cyan-400',
      fence: 'border-amber-800/60',
      trees: ['🌴', '🌾', '⛺', '🪨', '🦒', '🌿', '🌵']
    },
    sea: {
      bg: 'from-cyan-300 via-teal-300 to-blue-400',
      path: 'bg-amber-100/60',
      pond: 'bg-blue-500/60 border-cyan-200',
      fence: 'border-cyan-700/50',
      trees: ['🏝️', '🪸', '🐚', '🌊', '⚓', '🌴', '🫧']
    },
    snow: {
      bg: 'from-cyan-100 via-slate-100 to-blue-200',
      path: 'bg-blue-200/50',
      pond: 'bg-cyan-400/60 border-white',
      fence: 'border-blue-700/40',
      trees: ['🌲', '❄️', '🏔️', '☃️', '🧊', '✨', '⛺']
    },
    jungle: {
      bg: 'from-emerald-400 via-teal-500 to-green-600',
      path: 'bg-amber-300/40',
      pond: 'bg-teal-400/80 border-emerald-300',
      fence: 'border-emerald-900/60',
      trees: ['🌴', '🌺', '🍌', '🦜', '🎋', '💧', '🌿']
    },
    outback: {
      bg: 'from-orange-300 via-amber-400 to-red-400',
      path: 'bg-red-200/50',
      pond: 'bg-cyan-600/70 border-amber-300',
      fence: 'border-red-900/60',
      trees: ['🏜️', '🪨', '🦘', '🌿', '⛺', '🪵', '🔥']
    },
    mountain: {
      bg: 'from-slate-200 via-emerald-300 to-cyan-300',
      path: 'bg-stone-300/60',
      pond: 'bg-cyan-400/80 border-white',
      fence: 'border-stone-700/60',
      trees: ['🏔️', '🌲', '🦅', '🪨', '🏕️', '✨', '🌿']
    },
    all: {
      bg: 'from-emerald-300 via-teal-300 to-amber-200',
      path: 'bg-amber-100/50',
      pond: 'bg-cyan-400/80 border-cyan-200',
      fence: 'border-emerald-800/50',
      trees: ['🌳', '🌴', '🌸', '🏡', '🏕️', '🌻', '✨']
    }
  }[activeBiome] || {
    bg: 'from-emerald-300 via-green-400 to-lime-500',
    path: 'bg-amber-200/50',
    pond: 'bg-cyan-400/80 border-cyan-300',
    fence: 'border-amber-700/60',
    trees: ['🌳', '🌴', '🌸', '🏡', '🏕️', '🌻', '✨']
  };

  const activeFocusAnimal = selectedAnimalId
    ? animals.find(a => a.id === selectedAnimalId)
    : nearbyAnimal;

  return (
    <div id="animated-safari-park-root" className="w-full max-w-5xl mx-auto space-y-3 select-none">
      
      {/* Top Habitat & Atmosphere Controls Bar */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl p-4 shadow-xl shadow-emerald-950/5 border border-emerald-100 flex flex-wrap items-center justify-between gap-3">
        {/* Left Habitat Switcher */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          <button
            onClick={() => {
              sound.playPop();
              setActiveBiome('all');
            }}
            className={`px-3 py-1.5 rounded-2xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 ${
              activeBiome === 'all'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <span>🌟 Hele Safaripark</span>
            <span className="text-[10px] opacity-80">({unlockedAnimals.length})</span>
          </button>

          {BIOMES.map(b => {
            const count = animals.filter(a => a.biome === b.id && a.unlocked).length;
            const isSel = activeBiome === b.id;
            return (
              <button
                key={b.id}
                onClick={() => {
                  sound.playPop();
                  setActiveBiome(b.id);
                }}
                className={`px-3 py-1.5 rounded-2xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 ${
                  isSel
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <span>{b.emoji}</span>
                <span>{b.name}</span>
                <span className="text-[10px] opacity-80">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Right Atmosphere & Gadget Tools */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          {/* Day / Sunset / Night mode */}
          <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200">
            <button
              onClick={() => {
                sound.playPop();
                setTimeOfDay('day');
              }}
              className={`p-1.5 rounded-xl transition-all cursor-pointer ${
                timeOfDay === 'day' ? 'bg-amber-400 text-slate-900 shadow-xs' : 'text-slate-500'
              }`}
              title="Dag"
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                sound.playPop();
                setTimeOfDay('sunset');
              }}
              className={`p-1.5 rounded-xl transition-all cursor-pointer ${
                timeOfDay === 'sunset' ? 'bg-orange-500 text-white shadow-xs' : 'text-slate-500'
              }`}
              title="Zonsondergang"
            >
              <Sunset className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                sound.playPop();
                setTimeOfDay('night');
              }}
              className={`p-1.5 rounded-xl transition-all cursor-pointer ${
                timeOfDay === 'night' ? 'bg-indigo-900 text-amber-200 shadow-xs' : 'text-slate-500'
              }`}
              title="Nacht"
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Skate / Turbo Speed */}
          <button
            onClick={() => {
              sound.playStar();
              setIsSkating(prev => !prev);
            }}
            className={`px-3 py-1.5 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all border ${
              isSkating
                ? 'bg-amber-400 text-slate-900 border-amber-500 shadow-md scale-102 ring-2 ring-amber-300'
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
            }`}
            title="Wissel tussen wandelen en snelle skates"
          >
            <span>🛹</span>
            <span>{isSkating ? 'Turbo Skates!' : 'Wandelen'}</span>
          </button>

          {/* Safari Whistle / Bell */}
          <button
            onClick={handleRingSafariBell}
            className="px-3.5 py-1.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-orange-500/20 active:scale-95 cursor-pointer transition-all"
            title="Luid de safaribel om alle dieren te roepen!"
          >
            <Bell className="w-3.5 h-3.5 animate-bounce" />
            <span>Safaribel 🔔</span>
          </button>
        </div>
      </div>

      {/* Main Interactive 2D Safari Park Canvas Stage */}
      <div 
        ref={parkRef}
        onClick={handleParkClick}
        className={`relative w-full h-[480px] sm:h-[540px] rounded-3xl overflow-hidden shadow-2xl border-4 border-emerald-800/30 cursor-crosshair transition-all bg-gradient-to-b ${biomeTheme.bg}`}
      >
        {/* Day/Night/Sunset Overlay Filter */}
        {timeOfDay === 'sunset' && (
          <div className="absolute inset-0 bg-gradient-to-t from-orange-600/25 via-amber-500/15 to-purple-800/30 pointer-events-none z-1" />
        )}
        {timeOfDay === 'night' && (
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/70 via-slate-900/60 to-purple-950/70 pointer-events-none z-1">
            {/* Night Stars */}
            <div className="absolute top-4 left-10 text-amber-200 text-xs animate-pulse">✨</div>
            <div className="absolute top-8 right-24 text-amber-200 text-sm animate-pulse">⭐</div>
            <div className="absolute top-16 left-1/3 text-amber-200 text-xs animate-pulse">✨</div>
            <div className="absolute top-6 right-1/4 text-amber-200 text-sm animate-pulse">🌟</div>
          </div>
        )}

        {/* Ambient Environment Decorations */}
        {/* Winding Sandy Path */}
        <div className={`absolute top-1/4 left-0 right-0 h-20 ${biomeTheme.path} rounded-full filter blur-sm pointer-events-none transform -rotate-1`} />
        <div className={`absolute top-2/3 left-10 right-10 h-16 ${biomeTheme.path} rounded-full filter blur-xs pointer-events-none transform rotate-2`} />

        {/* Watering Hole / Pond */}
        <div className={`absolute top-1/3 right-12 w-36 h-28 sm:w-48 sm:h-36 rounded-[60%_40%_70%_30%] ${biomeTheme.pond} border-4 shadow-inner flex items-center justify-center pointer-events-none z-0 overflow-hidden`}>
          <div className="text-2xl animate-pulse opacity-80">🐟</div>
          <div className="absolute bottom-2 right-4 text-sm opacity-70">🫧</div>
          <div className="absolute top-2 left-6 text-sm opacity-70">🪷</div>
        </div>

        {/* Scattered Scenery Flora & Decor */}
        <div className="absolute top-6 left-8 text-3xl sm:text-4xl pointer-events-none">{biomeTheme.trees[0]}</div>
        <div className="absolute top-12 left-28 text-2xl sm:text-3xl pointer-events-none">{biomeTheme.trees[1]}</div>
        <div className="absolute top-4 right-1/3 text-3xl sm:text-4xl pointer-events-none">{biomeTheme.trees[2]}</div>
        <div className="absolute bottom-8 left-12 text-2xl sm:text-3xl pointer-events-none">{biomeTheme.trees[3]}</div>
        <div className="absolute bottom-12 right-20 text-3xl sm:text-4xl pointer-events-none">{biomeTheme.trees[4]}</div>
        <div className="absolute top-1/2 left-1/4 text-xl pointer-events-none opacity-90">{biomeTheme.trees[5]}</div>

        {/* Fluttering Butterflies */}
        <div className="absolute top-1/4 left-1/3 text-lg animate-bounce pointer-events-none z-1">🦋</div>
        <div className="absolute top-2/3 right-1/4 text-sm animate-pulse pointer-events-none z-1">🌸</div>

        {/* Player Footprints Trail */}
        {footprints.map(fp => (
          <div 
            key={fp.id} 
            style={{ left: `${fp.x}%`, top: `${fp.y}%` }} 
            className="absolute w-2 h-2 rounded-full bg-amber-900/20 filter blur-[0.5px] pointer-events-none transition-opacity duration-1000"
          />
        ))}

        {/* Click Destination Beacon Marker */}
        {playerTarget && (
          <div 
            style={{ left: `${playerTarget.x}%`, top: `${playerTarget.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-1"
          >
            <div className="w-8 h-8 rounded-full border-2 border-cyan-400 bg-cyan-300/30 animate-ping" />
            <div className="w-3 h-3 rounded-full bg-cyan-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-md shadow-cyan-500" />
          </div>
        )}

        {/* Roaming Autonomous Animals */}
        {currentBiomeAnimals.map(animal => {
          const state = roamingAnimals[animal.id];
          if (!state) return null;

          const isSelected = selectedAnimalId === animal.id;
          const isNearby = nearbyAnimal?.id === animal.id;

          return (
            <div
              key={animal.id}
              onClick={(e) => {
                e.stopPropagation();
                sound.playPop();
                setSelectedAnimalId(animal.id);
                handlePet(animal);
              }}
              style={{
                left: `${state.x}%`,
                top: `${state.y}%`,
                transform: `translate(-50%, -50%) translateY(${state.bounceOffset}px)`
              }}
              className={`absolute cursor-pointer transition-all duration-300 z-2 group ${
                isSelected ? 'scale-125 z-10' : 'hover:scale-115'
              }`}
              title={`${animal.name} (${animal.title}) - Klik om te verzorgen!`}
            >
              {/* Proximity / Selection Glow Ring */}
              {(isNearby || isSelected) && (
                <div className="absolute -inset-3 rounded-full bg-amber-400/40 animate-pulse filter blur-xs -z-1" />
              )}

              {/* Animal Shadow */}
              <div className="w-10 h-3 bg-black/20 rounded-full filter blur-[1px] absolute -bottom-1 left-1/2 -translate-x-1/2" />

              {/* Thought / Action Bubble */}
              {state.bubble && (
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-white/95 px-2 py-0.5 rounded-full border border-slate-200 text-xs shadow-md animate-bounce whitespace-nowrap z-10 font-bold">
                  {state.bubble}
                </div>
              )}

              {/* Animal Avatar & Direction Flip */}
              <div
                className={`transition-transform ${
                  state.direction === 'left' ? 'scale-x-[-1]' : 'scale-x-100'
                }`}
              >
                <AnimalAvatar animalId={animal.id} size="sm" isAnimated={false} interactive={false} />
              </div>

              {/* Name Tag on Hover or Proximity */}
              <div className="opacity-0 group-hover:opacity-100 absolute -bottom-5 left-1/2 -translate-x-1/2 bg-slate-900/80 text-white font-black text-[9px] px-1.5 py-0.5 rounded-md whitespace-nowrap pointer-events-none transition-opacity">
                {animal.name.split(' ')[0]} ❤️{animal.hearts}
              </div>
            </div>
          );
        })}

        {/* Player Avatar Character Walking on Stage */}
        <div
          style={{
            left: `${playerPos.x}%`,
            top: `${playerPos.y}%`,
            transform: `translate(-50%, -50%) ${playerFacing === 'left' ? 'scaleX(-1)' : 'scaleX(1)'}`
          }}
          className={`absolute z-5 pointer-events-none transition-all duration-75 ${
            isPlayerWalking ? 'animate-bounce' : ''
          }`}
        >
          {/* Player Ground Shadow */}
          <div className="w-12 h-3.5 bg-black/25 rounded-full filter blur-[1px] absolute -bottom-1 left-1/2 -translate-x-1/2" />

          {/* Render Toca/Roblox Custom Avatar */}
          <div className="p-0.5 rounded-2xl bg-white/90 shadow-lg border-2 border-cyan-300">
            <TocaAvatar 
              customization={(profile.customization as any)?.toca} 
              size={54} 
            />
          </div>

          {/* Player Name Overhead Pill */}
          <div className={`absolute -top-5 left-1/2 -translate-x-1/2 bg-cyan-600 text-white font-black text-[10px] px-2 py-0.5 rounded-full shadow-md whitespace-nowrap flex items-center gap-1 ${
            playerFacing === 'left' ? 'scale-x-[-1]' : ''
          }`}>
            <span>⭐ {profile.name}</span>
          </div>
        </div>

        {/* On-Screen Virtual D-Pad Touch Controller */}
        <div className="absolute bottom-4 left-4 z-10 bg-white/85 backdrop-blur-md p-2 rounded-2xl border border-slate-200 shadow-xl flex flex-col items-center gap-1 sm:scale-100 scale-90">
          <button
            onClick={(e) => { e.stopPropagation(); handleDPadMove(0, -1); }}
            className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-emerald-500 hover:text-white text-slate-700 font-black flex items-center justify-center shadow-xs active:scale-90 cursor-pointer text-xs"
          >
            ▲
          </button>
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => { e.stopPropagation(); handleDPadMove(-1, 0); }}
              className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-emerald-500 hover:text-white text-slate-700 font-black flex items-center justify-center shadow-xs active:scale-90 cursor-pointer text-xs"
            >
              ◀
            </button>
            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-[10px] text-emerald-800 font-bold">
              🐾
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); handleDPadMove(1, 0); }}
              className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-emerald-500 hover:text-white text-slate-700 font-black flex items-center justify-center shadow-xs active:scale-90 cursor-pointer text-xs"
            >
              ▶
            </button>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); handleDPadMove(0, 1); }}
            className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-emerald-500 hover:text-white text-slate-700 font-black flex items-center justify-center shadow-xs active:scale-90 cursor-pointer text-xs"
          >
            ▼
          </button>
        </div>

        {/* Walk Hint Overlay */}
        <div className="absolute top-3 left-4 z-5 bg-black/40 backdrop-blur-md text-white font-bold text-[11px] px-3 py-1.5 rounded-full pointer-events-none flex items-center gap-1.5 shadow-sm">
          <Footprints className="w-3.5 h-3.5 text-cyan-300" />
          <span>Klik ergens op het gras of gebruik pijltjestoetsen om rond te wandelen!</span>
        </div>
      </div>

      {/* Proximity Interaction Hub Pod (When close to an animal) */}
      <AnimatePresence>
        {activeFocusAnimal && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="bg-white/95 backdrop-blur-md rounded-3xl p-4 sm:p-5 shadow-2xl border-2 border-amber-300 relative overflow-hidden"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              
              {/* Animal Identity Header */}
              <div className="flex items-center gap-3.5 w-full md:w-auto">
                <AnimalAvatar
                  animalId={activeFocusAnimal.id}
                  size="md"
                  isAnimated={false}
                  interactive={false}
                  className="border-2 border-amber-300 shadow-md flex-shrink-0 bg-gradient-to-br from-amber-100 to-emerald-100"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg sm:text-xl font-black text-slate-900">
                      {activeFocusAnimal.name}
                    </h3>
                    <span className="text-[10px] font-black uppercase bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Heart className="w-3 h-3 fill-rose-500" />
                      <span>{activeFocusAnimal.hearts}/5 Vriendschap</span>
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium mt-0.5">
                    {activeFocusAnimal.title} • {activeFocusAnimal.personality}
                  </p>
                  <p className="text-[11px] text-amber-800 italic mt-0.5">
                    Lievelingseten: <span className="font-black">{activeFocusAnimal.favoriteFood || 'Gezonde Hapjes'}</span> {activeFocusAnimal.favoriteFoodEmoji || '🍎'}
                  </p>
                </div>
              </div>

              {/* Action Buttons Grid */}
              <div className="flex items-center gap-2 flex-wrap justify-center w-full md:w-auto">
                {/* 1. Pet Animal */}
                <button
                  onClick={() => handlePet(activeFocusAnimal)}
                  className="px-3.5 py-2.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-400 hover:to-pink-400 text-white font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-rose-500/20 active:scale-95 cursor-pointer transition-all"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Aai {activeFocusAnimal.name.split(' ')[0]}</span>
                </button>

                {/* 2. Feed Animal */}
                <button
                  onClick={() => handleFeed(activeFocusAnimal)}
                  className="px-3.5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-emerald-600/20 active:scale-95 cursor-pointer transition-all"
                >
                  <Utensils className="w-4 h-4" />
                  <span>Voer Lekkernij (10🪙)</span>
                </button>

                {/* 3. Read Fact Out Loud */}
                <button
                  onClick={() => handleSpeakFact(activeFocusAnimal)}
                  className="px-3.5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-2xs active:scale-95 cursor-pointer transition-all border border-slate-200"
                >
                  <Volume2 className="w-4 h-4 text-emerald-600" />
                  <span>Weetje Voorlezen</span>
                </button>

                {/* 4. Vet Scan Checkup (Dokter Ridheya Mode) */}
                <button
                  onClick={() => {
                    sound.playStar();
                    setShowVetCheckup(activeFocusAnimal);
                  }}
                  className="px-3.5 py-2.5 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-teal-500/20 active:scale-95 cursor-pointer transition-all"
                >
                  <Stethoscope className="w-4 h-4" />
                  <span>Dokter Check-up</span>
                </button>

                {/* 5. Snap Safari Polaroid Photo (Hemali Safari Reporter Mode) */}
                <button
                  onClick={() => handleSnapPhoto(activeFocusAnimal)}
                  className="px-3.5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-purple-600/20 active:scale-95 cursor-pointer transition-all"
                >
                  <Camera className="w-4 h-4" />
                  <span>Safari Foto 📸</span>
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Live Activity Notification Banner */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3 rounded-2xl bg-amber-100 border border-amber-300 text-amber-950 font-bold text-xs sm:text-sm text-center shadow-md flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Polaroid Photo Modal Preview (Hemali Wildlife Snapshot) */}
      <AnimatePresence>
        {polaroidPhoto && (
          <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.8, rotate: -4, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-3xl p-6 shadow-2xl border-4 border-slate-100 max-w-sm w-full text-center relative"
            >
              <button
                onClick={() => setPolaroidPhoto(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="bg-gradient-to-b from-amber-100 via-emerald-100 to-cyan-100 rounded-2xl p-6 mb-4 border border-slate-200 relative overflow-hidden flex flex-col items-center justify-center min-h-[220px]">
                <div className="mb-2 animate-bounce">
                  <AnimalAvatar animalId={polaroidPhoto.animal.id} size="xl" isAnimated={false} interactive={false} />
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <div className="p-0.5 rounded-xl bg-white shadow-xs">
                    <TocaAvatar customization={(profile.customization as any)?.toca} size={36} />
                  </div>
                  <span className="text-xs font-black text-slate-800">
                    {profile.name} &amp; {polaroidPhoto.animal.name}
                  </span>
                </div>
                <div className="absolute top-2 right-2 text-[10px] font-black uppercase tracking-wider bg-black/40 text-white px-2 py-0.5 rounded-full">
                  📸 Safari Polaroid • {polaroidPhoto.timestamp}
                </div>
              </div>

              <h4 className="font-black text-base text-slate-900">
                {polaroidPhoto.animal.name} op Safari!
              </h4>
              <p className="text-xs text-slate-500 italic mt-1">
                "{polaroidPhoto.animal.funFact}"
              </p>

              <button
                onClick={() => {
                  sound.playCorrect();
                  setPolaroidPhoto(null);
                  setNotification('Foto bewaard in je safari avonturen logboek! 🌟');
                  setTimeout(() => setNotification(null), 3000);
                }}
                className="w-full mt-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md cursor-pointer transition-all"
              >
                Foto Opslaan in Dagboek ✨
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Veterinarian Quick Scan Modal (Dokter Ridheya) */}
      <AnimatePresence>
        {showVetCheckup && (
          <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-6 shadow-2xl border-2 border-teal-300 max-w-md w-full relative"
            >
              <button
                onClick={() => setShowVetCheckup(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-center mb-4">
                <span className="text-xs font-black uppercase text-teal-800 bg-teal-100 px-3 py-1 rounded-full inline-flex items-center gap-1.5 mb-1.5">
                  <Stethoscope className="w-3.5 h-3.5 text-teal-600" />
                  <span>Dierenarts Safari Check-up</span>
                </span>
                <h3 className="text-xl font-black text-slate-900">
                  Gezondheidsrapport: {showVetCheckup.name}
                </h3>
              </div>

              <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 space-y-2.5 mb-4 text-xs font-bold text-slate-700">
                <div className="flex items-center justify-between">
                  <span>🩺 Hartslag &amp; Conditie:</span>
                  <span className="text-teal-800 font-black">100% Super Gezond! 💓</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>🐾 Stemming &amp; Energie:</span>
                  <span className="text-emerald-800 font-black">Vrolijk &amp; Speels 🌟</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>🍎 Hongerpeil:</span>
                  <span className="text-amber-800 font-black">Lust graag {showVetCheckup.favoriteFood || 'een snack'}!</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>❤️ Vriendschapsband:</span>
                  <span className="text-rose-600 font-black">{showVetCheckup.hearts}/5 Gouden Hartjes</span>
                </div>
              </div>

              <button
                onClick={() => {
                  sound.playSuccess();
                  handlePet(showVetCheckup);
                  setShowVetCheckup(null);
                }}
                className="w-full py-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-teal-600/20 cursor-pointer transition-all"
              >
                Gezondheidskeurmerk Toekennen (+5⭐)
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
