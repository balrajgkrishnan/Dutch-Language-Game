import React from 'react';
import { motion } from 'motion/react';
import { BiomeInfo, BiomeType } from '../types';
import { BIOMES } from '../data/biomeData';
import { sound } from '../services/soundService';
import { Compass, Globe } from 'lucide-react';

interface BiomeSelectorProps {
  selectedBiome: BiomeType;
  onSelectBiome: (biome: BiomeType) => void;
  unlockedCountByBiome?: Record<string, number>;
  totalCountByBiome?: Record<string, number>;
}

export const BiomeSelector: React.FC<BiomeSelectorProps> = ({
  selectedBiome,
  onSelectBiome,
  unlockedCountByBiome = {},
  totalCountByBiome = {}
}) => {
  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-4 mb-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <Globe className="w-4 h-4 text-emerald-700" />
          <span className="text-xs font-black uppercase tracking-wider text-emerald-950">
            Reis Rond de Wereld:
          </span>
        </div>
        <span className="text-[11px] font-extrabold text-emerald-800 bg-emerald-100/90 px-2.5 py-0.5 rounded-full border border-emerald-200 shadow-2xs">
          7 Wereldlocaties (42 Dieren) 🌍
        </span>
      </div>

      {/* 7 Biome Cards Deck */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {BIOMES.map((b) => {
          const isSelected = b.id === selectedBiome;
          const unlocked = unlockedCountByBiome[b.id] ?? 1;
          const total = totalCountByBiome[b.id] ?? 6;

          return (
            <motion.button
              key={b.id}
              id={`biome-btn-${b.id}`}
              onClick={() => {
                sound.playPop();
                onSelectBiome(b.id);
              }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className={`relative p-2.5 rounded-2xl text-left transition-all cursor-pointer overflow-hidden border ${
                isSelected
                  ? 'bg-white shadow-md shadow-emerald-900/10 border-2 border-emerald-500 ring-2 ring-emerald-400/30'
                  : 'bg-white/80 hover:bg-white border-slate-200/80 shadow-2xs hover:shadow-xs'
              }`}
            >
              {/* Active Indicator Top Accent */}
              {isSelected && (
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ backgroundColor: b.themeColor }}
                />
              )}

              <div className="flex items-center justify-between gap-1">
                <span className="text-2xl select-none filter drop-shadow-2xs">
                  {b.emoji}
                </span>
                <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600">
                  {unlocked}/{total}
                </span>
              </div>

              <div className="mt-1">
                <h3 className="text-xs font-black text-slate-800 leading-tight truncate">
                  {b.name}
                </h3>
                <p className="text-[9px] text-slate-500 font-medium line-clamp-1">
                  {b.subtitle.split(',')[0]}
                </p>
              </div>

              {isSelected && (
                <div className="text-[9px] text-emerald-600 font-black mt-0.5">
                  ● Actief
                </div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
