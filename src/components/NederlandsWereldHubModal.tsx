import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Lock } from 'lucide-react';
import { PlayerProfile, Building } from '../types';
import { NEDERLANDS_WERELD_BUILDINGS } from '../data/nederlandsWereldBuildings';
import { sound } from '../services/soundService';
import { SandboxSceneModal } from './SandboxSceneModal';

interface NederlandsWereldHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: PlayerProfile;
  onUpdateProfile: (updater: (prev: PlayerProfile) => PlayerProfile) => void;
}

export const NederlandsWereldHubModal: React.FC<NederlandsWereldHubModalProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile
}) => {
  const [activeBuilding, setActiveBuilding] = useState<Building | null>(null);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden"
        >
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 p-5 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-3xl shadow-inner">🏘️</div>
              <div>
                <h3 className="text-lg font-black">Nederlands Wereld</h3>
                <p className="text-xs text-emerald-100 font-medium">Kies een gebouw om te ontdekken</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {NEDERLANDS_WERELD_BUILDINGS.map(building => (
              <button
                key={building.id}
                disabled={!building.unlocked}
                onClick={() => {
                  sound.playPop();
                  setActiveBuilding(building);
                }}
                className={`rounded-2xl p-4 flex flex-col items-center gap-2 text-center border-2 transition-all cursor-pointer ${
                  building.unlocked
                    ? 'bg-amber-50 hover:bg-amber-100 border-amber-300'
                    : 'bg-slate-50 border-slate-200 opacity-70 cursor-not-allowed'
                }`}
              >
                <span className="text-4xl">{building.unlocked ? building.emoji : <Lock className="w-8 h-8 text-slate-400" />}</span>
                <span className="font-black text-sm text-slate-800">{building.name}</span>
                {!building.unlocked && building.unlockHint && (
                  <span className="text-[10px] text-slate-500 font-medium">{building.unlockHint}</span>
                )}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      <SandboxSceneModal
        isOpen={!!activeBuilding}
        onClose={() => setActiveBuilding(null)}
        building={activeBuilding || NEDERLANDS_WERELD_BUILDINGS[0]}
        profile={profile}
        onUpdateProfile={onUpdateProfile}
      />
    </>
  );
};
