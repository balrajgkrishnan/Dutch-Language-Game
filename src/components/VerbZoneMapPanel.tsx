import React from 'react';
import { motion } from 'motion/react';
import { Lock, CheckCircle2 } from 'lucide-react';
import { PlayerProfile } from '../types';
import { ZONE_REWARDS, getZoneProgress, isZoneUnlocked, isZoneComplete } from '../data/verbZones';
import { sound } from '../services/soundService';

interface VerbZoneMapPanelProps {
  profile: PlayerProfile;
  selectedZoneIndex: number;
  onSelectZone: (zoneIndex: number) => void;
}

export const VerbZoneMapPanel: React.FC<VerbZoneMapPanelProps> = ({
  profile,
  selectedZoneIndex,
  onSelectZone
}) => {
  return (
    <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 border border-slate-200 shadow-xs">
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {ZONE_REWARDS.map(zone => {
          const unlocked = isZoneUnlocked(zone.index, profile);
          const completed = isZoneComplete(zone.index, profile);
          const { mastered, total } = getZoneProgress(zone.index, profile);
          const isSelected = selectedZoneIndex === zone.index;

          return (
            <motion.button
              key={zone.index}
              disabled={!unlocked}
              whileHover={unlocked ? { scale: 1.03 } : undefined}
              whileTap={unlocked ? { scale: 0.97 } : undefined}
              onClick={() => {
                if (!unlocked) return;
                sound.playPop();
                onSelectZone(zone.index);
              }}
              className={`relative rounded-xl p-2.5 border-2 text-center transition-all ${
                !unlocked
                  ? 'bg-slate-50 border-slate-200 opacity-60 cursor-not-allowed'
                  : isSelected
                  ? 'bg-amber-50 border-amber-500 shadow-md cursor-pointer'
                  : 'bg-white border-slate-200 hover:border-emerald-400 cursor-pointer'
              }`}
            >
              <div className="text-2xl mb-1">
                {unlocked ? zone.reward.emoji : <Lock className="w-5 h-5 mx-auto text-slate-400" />}
              </div>
              <div className="text-[10px] font-black text-slate-700 uppercase tracking-wide leading-tight">
                Zone {zone.index + 1}
              </div>
              <div className="text-[9px] font-bold text-slate-400">
                {unlocked ? `${mastered}/${total}` : 'Op slot'}
              </div>
              {completed && (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 absolute top-1 right-1" />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
