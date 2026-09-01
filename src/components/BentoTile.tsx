import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { sound } from '../services/soundService';
import { HomeTile } from '../data/homeTiles';

interface BentoTileProps {
  tile: HomeTile;
}

const SIZE_CLASSES: Record<HomeTile['size'], string> = {
  standard: 'col-span-1 p-3.5',
  large: 'col-span-2 p-4',
  xl: 'col-span-2 p-5 sm:p-6'
};

export const BentoTile: React.FC<BentoTileProps> = ({ tile }) => {
  const isXl = tile.size === 'xl';
  const [iconFailed, setIconFailed] = useState(false);
  useEffect(() => setIconFailed(false), [tile.id]);

  return (
    <div
      onClick={() => {
        sound.playPop();
        tile.onClick();
      }}
      className={`bg-gradient-to-br ${tile.theme} ${SIZE_CLASSES[tile.size]} border ${
        tile.accented ? 'ring-4 ring-white/80' : ''
      } rounded-2xl text-white flex flex-col justify-between gap-3 shadow-md transition-all hover:scale-[1.02] cursor-pointer group`}
    >
      <div className="space-y-1.5">
        {iconFailed ? (
          <span
            className={`inline-flex items-center justify-center rounded-xl bg-white/10 border border-white/20 group-hover:rotate-6 transition-transform ${
              isXl ? 'w-14 h-14 text-3xl' : 'w-9 h-9 text-xl'
            }`}
          >
            {tile.emoji}
          </span>
        ) : (
          <img
            src={`/tile-icons/${tile.id}.png`}
            alt=""
            onError={() => setIconFailed(true)}
            draggable={false}
            className={`rounded-xl shadow-sm group-hover:rotate-6 transition-transform select-none ${
              isXl ? 'w-14 h-14' : 'w-9 h-9'
            }`}
          />
        )}
        <h4 className={`font-black text-white ${isXl ? 'text-lg sm:text-xl' : 'text-sm'}`}>
          {tile.title}
        </h4>
        <p className={`text-white/85 font-medium ${isXl ? 'text-sm' : 'text-xs'} line-clamp-2`}>
          {tile.subtitle}
        </p>
      </div>

      <div className="pt-2 flex items-center justify-between text-xs font-black text-white/80 border-t border-white/10">
        <span>Openen</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
};
