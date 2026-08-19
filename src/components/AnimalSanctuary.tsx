import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Utensils, Lock, Compass, ArrowRight, Volume2, Footprints, LayoutGrid, Eye } from 'lucide-react';
import { Animal, BiomeType, PlayerProfile } from '../types';
import { FOOD_ITEMS } from '../data/gameData';
import { BIOMES } from '../data/biomeData';
import { sound } from '../services/soundService';
import { AnimalAvatar } from './AnimalAvatar';
import { AnimatedSafariPark } from './AnimatedSafariPark';

interface AnimalSanctuaryProps {
  animals: Animal[];
  score: number;
  profile: PlayerProfile;
  onFeedAnimal: (animalId: string, foodCost: number, heartsGiven: number) => void;
  onPetAnimal: (animalId: string) => void;
  onGoToAdventure: () => void;
}

export const AnimalSanctuary: React.FC<AnimalSanctuaryProps> = ({
  animals,
  score,
  profile,
  onFeedAnimal,
  onPetAnimal,
  onGoToAdventure
}) => {
  const [viewMode, setViewMode] = useState<'walk_explore' | 'album_grid'>('walk_explore');
  const [selectedBiomeFilter, setSelectedBiomeFilter] = useState<BiomeType | 'all'>('all');
  const [selectedAnimalId, setSelectedAnimalId] = useState<string>(
    animals.find(a => a.unlocked)?.id || animals[0]?.id || 'bella-koe'
  );
  const [selectedFoodId, setSelectedFoodId] = useState<string>(FOOD_ITEMS[0].id);
  const [feedNotification, setFeedNotification] = useState<string | null>(null);

  const filteredAnimals = selectedBiomeFilter === 'all'
    ? animals
    : animals.filter(a => a.biome === selectedBiomeFilter);

  const selectedAnimal = animals.find(a => a.id === selectedAnimalId) || animals[0];
  const unlockedAnimals = animals.filter(a => a.unlocked);
  const selectedFood = FOOD_ITEMS.find(f => f.id === selectedFoodId) || FOOD_ITEMS[0];

  const handleFeed = () => {
    if (!selectedAnimal.unlocked) return;
    if (score < selectedFood.cost) {
      sound.playIncorrect();
      setFeedNotification(`Je hebt ${selectedFood.cost} munten nodig! Speel quizzen om munten te verdienen! ⭐`);
      setTimeout(() => setFeedNotification(null), 3000);
      return;
    }

    sound.playStar();
    sound.playAnimalHappy(selectedAnimal.soundName);
    onFeedAnimal(selectedAnimal.id, selectedFood.cost, selectedFood.heartsGiven);
    setFeedNotification(`${selectedAnimal.name} geniet van ${selectedFood.name}! +${selectedFood.heartsGiven} ❤️`);
    setTimeout(() => setFeedNotification(null), 3000);
  };

  const handleReadFact = () => {
    sound.speakDutch(`${selectedAnimal.name}. ${selectedAnimal.personality} Wist je dat: ${selectedAnimal.funFact}`);
  };

  return (
    <div id="animal-sanctuary-container" className="w-full max-w-5xl mx-auto space-y-4">
      
      {/* Sanctuary Header with Mode Switcher */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 shadow-xl shadow-emerald-950/5 border border-emerald-100 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white flex items-center justify-center text-2xl shadow-md flex-shrink-0">
            🏡
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-emerald-950 tracking-tight">
                {profile.name}’s Levend Dierenreservaat
              </h2>
              <span className="text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                {unlockedAnimals.length}/{animals.length} Vrijgespeeld
              </span>
            </div>
            <p className="text-slate-600 text-xs sm:text-sm font-medium mt-0.5">
              Wandel rond tussen je loslopende dieren, aai ze, voer ze en ontdek hun geheimen!
            </p>
          </div>
        </div>

        {/* View Switcher & Quiz Button */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200">
            <button
              onClick={() => {
                sound.playPop();
                setViewMode('walk_explore');
              }}
              className={`px-3 py-1.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'walk_explore'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Footprints className="w-3.5 h-3.5" />
              <span>Wandelpark (2D)</span>
            </button>

            <button
              onClick={() => {
                sound.playPop();
                setViewMode('album_grid');
              }}
              className={`px-3 py-1.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'album_grid'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Dieren Album</span>
            </button>
          </div>

          <button
            id="go-to-adventure-btn"
            onClick={onGoToAdventure}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-2xl font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-700/20 active:scale-95 cursor-pointer flex items-center gap-1.5 transition-all"
          >
            <span>Naar Quiz</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* MODE 1: INTERACTIVE ANIMATED 2D WALKING PARK */}
      {viewMode === 'walk_explore' && (
        <AnimatedSafariPark
          animals={animals}
          score={score}
          profile={profile}
          selectedBiome={selectedBiomeFilter}
          onFeedAnimal={onFeedAnimal}
          onPetAnimal={onPetAnimal}
          onGoToAdventure={onGoToAdventure}
        />
      )}

      {/* MODE 2: CLASSIC ANIMAL ALBUM & SPOTLIGHT GRID */}
      {viewMode === 'album_grid' && (
        <div className="space-y-4">
          {/* Habitat Biome Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 px-1">
            <button
              onClick={() => {
                sound.playPop();
                setSelectedBiomeFilter('all');
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                selectedBiomeFilter === 'all'
                  ? 'bg-emerald-700 text-white shadow-md shadow-emerald-800/20'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              🌟 Alle Habitats ({unlockedAnimals.length}/{animals.length})
            </button>

            {BIOMES.map(b => {
              const count = animals.filter(a => a.biome === b.id && a.unlocked).length;
              const total = animals.filter(a => a.biome === b.id).length;
              const isSelected = selectedBiomeFilter === b.id;

              return (
                <button
                  key={b.id}
                  onClick={() => {
                    sound.playPop();
                    setSelectedBiomeFilter(b.id);
                  }}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-700 text-white shadow-md shadow-emerald-800/20'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <span>{b.emoji}</span>
                  <span>{b.name}</span>
                  <span className="text-[10px] opacity-80">({count}/{total})</span>
                </button>
              );
            })}
          </div>

          {/* Animal Selection Grid */}
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 shadow-xl shadow-emerald-950/5 border border-emerald-100">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                Dieren in deze Habitat ({filteredAnimals.filter(a => a.unlocked).length}/{filteredAnimals.length} Vrijgespeeld)
              </span>
              <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Klik op een dier
              </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
              {filteredAnimals.map((animal) => {
                const isSelected = animal.id === selectedAnimalId;

                return (
                  <button
                    key={animal.id}
                    id={`sanctuary-animal-btn-${animal.id}`}
                    onClick={() => {
                      sound.playPop();
                      setSelectedAnimalId(animal.id);
                    }}
                    className={`p-3 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer relative border ${
                      isSelected
                        ? 'bg-amber-50 border-2 border-amber-500 shadow-md ring-2 ring-amber-400/30 -translate-y-1'
                        : animal.unlocked
                        ? 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300'
                        : 'bg-slate-100/70 border-dashed border-slate-300 opacity-60'
                    }`}
                  >
                    {/* Heart Badge */}
                    {animal.unlocked && (
                      <div className="absolute top-1.5 right-1.5 flex items-center gap-0.5 text-[10px] font-black text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded-full border border-rose-200">
                        <Heart className="w-2.5 h-2.5 fill-rose-500" />
                        <span>{animal.hearts}</span>
                      </div>
                    )}

                    <div className="text-3xl my-1 select-none">
                      {animal.unlocked ? (
                        <span className="filter drop-shadow-xs">{animal.emoji}</span>
                      ) : (
                        <span className="filter grayscale opacity-40">🔒</span>
                      )}
                    </div>

                    <span className="text-[11px] font-black text-slate-800 text-center leading-tight truncate w-full">
                      {animal.name.split(' ')[0]}
                    </span>

                    <span className="text-[9px] text-slate-500 font-medium truncate w-full text-center">
                      {animal.unlocked ? animal.title.split(' ')[0] : `Level ${animal.levelRequired}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Animal Spotlight Card */}
          {selectedAnimal && (
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl shadow-emerald-950/5 border border-emerald-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                
                {/* Left Animal Stage */}
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-3xl bg-gradient-to-b from-amber-50 to-emerald-50 border-2 border-emerald-100 flex items-center justify-center p-4 shadow-inner">
                    {selectedAnimal.unlocked ? (
                      <div className="flex flex-col items-center">
                        <AnimalAvatar
                          animalId={selectedAnimal.id}
                          size="xl"
                          interactive={true}
                          onPet={() => onPetAnimal(selectedAnimal.id)}
                        />
                        <span className="text-[11px] font-bold text-slate-500 mt-2 flex items-center gap-1 bg-white/80 px-3 py-1 rounded-full border border-slate-200">
                          <span>👆 Klik of tik om te aaien!</span>
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center text-slate-400">
                        <Lock className="w-12 h-12 mb-2 text-slate-400" />
                        <p className="text-sm font-bold text-slate-600">Nog vergrendeld!</p>
                        <p className="text-xs text-slate-500">Speel meer levels om dit dier vrij te spelen</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-center gap-2">
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                        {selectedAnimal.name}
                      </h3>
                      <button
                        onClick={handleReadFact}
                        className="p-1.5 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 cursor-pointer transition-all border border-emerald-200"
                        title="Lees dierweetjes voor"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mt-0.5">
                      {selectedAnimal.title} • {selectedAnimal.habitatName || 'Natuurgebied'}
                    </p>
                  </div>
                </div>

                {/* Right Details & Feeding Station */}
                <div className="flex flex-col justify-between h-full space-y-4">
                  {/* Fun Fact Card */}
                  <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4">
                    <span className="text-xs font-black uppercase tracking-wider text-amber-800 flex items-center gap-1 mb-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>Dierenweetje &amp; Karakter:</span>
                    </span>
                    <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed mb-2">
                      {selectedAnimal.funFact}
                    </p>
                    <p className="text-xs text-amber-900 font-semibold italic">
                      "{selectedAnimal.personality}"
                    </p>
                  </div>

                  {/* Feed Station */}
                  <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-black uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                        <Utensils className="w-4 h-4 text-emerald-600" />
                        <span>Voederstation:</span>
                      </span>
                      <span className="text-xs font-bold text-emerald-700">
                        Lievelingseten: <span className="font-black">{selectedAnimal.favoriteFood}</span> {selectedAnimal.favoriteFoodEmoji}
                      </span>
                    </div>

                    {/* Food Choices */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                      {FOOD_ITEMS.map((f) => {
                        const isFoodSelected = f.id === selectedFoodId;
                        return (
                          <button
                            key={f.id}
                            id={`food-btn-${f.id}`}
                            onClick={() => {
                              sound.playPop();
                              setSelectedFoodId(f.id);
                            }}
                            className={`p-2 rounded-xl text-center transition-all cursor-pointer border ${
                              isFoodSelected
                                ? 'bg-white border-2 border-emerald-600 shadow-md ring-2 ring-emerald-400/20'
                                : 'bg-white/70 hover:bg-white border-slate-200'
                            }`}
                          >
                            <span className="text-2xl block">{f.emoji}</span>
                            <span className="text-[11px] font-black text-slate-800 block truncate">
                              {f.name}
                            </span>
                            <span className="text-[10px] text-amber-700 font-bold">
                              {f.cost} 🪙 (+{f.heartsGiven}❤️)
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Feed Action Button */}
                    <button
                      id="feed-action-btn"
                      onClick={handleFeed}
                      disabled={!selectedAnimal.unlocked}
                      className={`w-full py-3 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                        selectedAnimal.unlocked
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-700/20 active:scale-98'
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      <Utensils className="w-4 h-4" />
                      <span>Geef {selectedFood.name} ({selectedFood.cost} Munten)</span>
                    </button>

                    {/* Feed Notification Toast */}
                    <AnimatePresence>
                      {feedNotification && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="mt-3 p-2.5 rounded-xl bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold text-center"
                        >
                          {feedNotification}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                </div>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
