import React from 'react';
import { CheckCircle, Lock, Play, Sparkles, Compass } from 'lucide-react';
import { Level, Animal, BiomeType } from '../types';
import { sound } from '../services/soundService';
import { AnimalAvatar } from './AnimalAvatar';
import { BIOMES } from '../data/biomeData';

interface LevelRoadmapProps {
  levels: Level[];
  currentLevelIndex: number;
  unlockedAnimals: Animal[];
  selectedBiome?: BiomeType;
  onSelectLevel: (levelIndex: number) => void;
}

export const LevelRoadmap: React.FC<LevelRoadmapProps> = ({
  levels,
  currentLevelIndex,
  unlockedAnimals,
  selectedBiome = 'farm',
  onSelectLevel
}) => {
  const currentBiome = BIOMES.find(b => b.id === selectedBiome) || BIOMES[0];

  return (
    <div id="level-roadmap-container" className="w-full max-w-5xl mx-auto px-4 py-2">
      {/* Roadmap Header */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 mb-6 shadow-xl shadow-emerald-950/5 border border-emerald-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-xl shadow-xs">
              🗺️
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-emerald-950 tracking-tight">
                {currentBiome.name} Expeditie Route
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm font-medium">
                Kies een hoofdstuk om te spelen en nieuwe knuffelvriendjes te redden!
              </p>
            </div>
          </div>
        </div>

        <div className="bg-amber-100/80 px-4 py-2 rounded-full border border-amber-300 font-black text-xs sm:text-sm text-amber-900 uppercase tracking-wider flex items-center gap-2 shadow-xs">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>Level {currentLevelIndex + 1}/{levels.length} Actief</span>
        </div>
      </div>

      {/* Levels Trail Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {levels.map((level, idx) => {
          const isCompleted = idx < currentLevelIndex || unlockedAnimals.some(a => a.id === level.animalReward.id && a.unlocked);
          const isCurrent = idx === currentLevelIndex;
          const isLocked = idx > currentLevelIndex && !isCompleted;

          return (
            <div
              key={level.id}
              id={`level-card-${level.id}`}
              onClick={() => {
                if (!isLocked) {
                  sound.playPop();
                  onSelectLevel(idx);
                } else {
                  sound.playIncorrect();
                }
              }}
              className={`rounded-3xl p-5 border transition-all relative flex flex-col justify-between ${
                isCurrent
                  ? 'bg-white border-2 border-emerald-500 shadow-xl shadow-emerald-900/10 ring-2 ring-emerald-400/30 -translate-y-1'
                  : isCompleted
                  ? 'bg-white hover:bg-emerald-50/40 border-emerald-200 shadow-sm hover:shadow-md'
                  : 'bg-slate-100/70 border-slate-200 opacity-60'
              } ${!isLocked ? 'cursor-pointer' : 'cursor-not-allowed'}`}
            >
              {/* Header inside card */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider ${
                    isCurrent
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : isCompleted
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-slate-200 text-slate-500'
                  }`}>
                    Level {level.id}
                  </span>

                  {isCompleted ? (
                    <span className="flex items-center gap-1 text-xs font-black text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Voltooid
                    </span>
                  ) : isCurrent ? (
                    <span className="flex items-center gap-1 text-xs font-black text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300">
                      Nu Spelen!
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs font-bold text-slate-400">
                      <Lock className="w-3.5 h-3.5" /> Op slot
                    </span>
                  )}
                </div>

                {/* Level Title & Reward Animal */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 bg-gradient-to-br from-amber-50 to-emerald-50 rounded-2xl border border-amber-200">
                    <AnimalAvatar animalId={level.animalReward.id} size="sm" isAnimated={!isLocked} />
                  </div>
                  <div>
                    <h3 className="font-black text-base text-slate-800 leading-tight">
                      {level.name}
                    </h3>
                    <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mt-0.5">
                      Beloning: {level.animalReward.name}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-500 font-medium mb-3">
                  🏷️ <b>Thema:</b> {level.theme}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-2 border-t border-slate-100">
                {isLocked ? (
                  <div className="text-center py-1 text-xs font-bold text-slate-400">
                    Voltooi Level {level.id - 1} eerst
                  </div>
                ) : (
                  <button
                    className={`w-full py-2.5 px-3 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                      isCurrent
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-700/20'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{isCompleted ? 'Opnieuw Spelen' : 'Start Level'}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
