import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Sparkles, Check, Lock, Shirt } from 'lucide-react';
import { PlayerProfile } from '../types';
import { WARDROBE_ITEMS, WardrobeItem } from '../data/wardrobeData';
import { sound } from '../services/soundService';

interface ExplorerWardrobeModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: PlayerProfile;
  onUpdateProfile: (updater: (prev: PlayerProfile) => PlayerProfile) => void;
}

export const ExplorerWardrobeModal: React.FC<ExplorerWardrobeModalProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile
}) => {
  const [activeTab, setActiveTab] = useState<'hat' | 'outfit' | 'backpack' | 'glasses'>('hat');

  if (!isOpen) return null;

  const currentCustom = profile.customization || {
    hairStyle: 'vlechtjes',
    hairColor: '#4a2c11',
    hat: 'hat-safari',
    outfit: 'outfit-khaki',
    backpack: 'bag-canvas',
    glasses: 'glass-none',
    boots: 'boots-leather',
    badgePin: 'star-pin',
    unlockedItems: ['hat-safari', 'outfit-khaki', 'bag-canvas', 'glass-none']
  };

  const filteredItems = WARDROBE_ITEMS.filter(item => item.type === activeTab);

  const handleSelectItem = (item: WardrobeItem) => {
    const isUnlocked = item.unlockedByDefault || currentCustom.unlockedItems.includes(item.id);
    if (!isUnlocked) {
      sound.playError();
      alert(`🔒 Dit voorwerp is nog vergrendeld!\nVoorwaarde: ${item.unlockRequirement}`);
      return;
    }

    sound.playPop();
    onUpdateProfile(prev => ({
      ...prev,
      customization: {
        ...currentCustom,
        [activeTab]: item.id
      }
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl border border-emerald-100 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-4 sm:p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-3xl">
              🤠
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black">Ontdekkingsreiziger Kledingkast</h3>
              <p className="text-xs text-emerald-100 font-medium">
                Pas je eigen safari-outfit aan met behaalde leerbeloningen!
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Categories Bar */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex items-center gap-2 overflow-x-auto">
          {[
            { id: 'hat', name: 'Hoeden 🤠' },
            { id: 'outfit', name: 'Outfits 🧥' },
            { id: 'backpack', name: 'Rugzakken 🎒' },
            { id: 'glasses', name: 'Brillen & Extra 👓' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                sound.playPop();
                setActiveTab(tab.id as any);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black whitespace-nowrap cursor-pointer transition-all ${
                activeTab === tab.id
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Items Grid */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
            {filteredItems.map(item => {
              const isUnlocked = item.unlockedByDefault || currentCustom.unlockedItems.includes(item.id);
              const isEquipped = currentCustom[activeTab] === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => handleSelectItem(item)}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between gap-2 relative ${
                    isEquipped
                      ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-300'
                      : isUnlocked
                      ? 'bg-white hover:bg-slate-50 border-slate-200'
                      : 'bg-slate-100 border-slate-200 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-3xl filter drop-shadow-xs">{item.emoji}</span>
                    {isEquipped && (
                      <span className="text-[10px] font-black text-white bg-emerald-600 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Check className="w-3 h-3" /> Aan
                      </span>
                    )}
                    {!isUnlocked && (
                      <span className="text-slate-400">
                        <Lock className="w-4 h-4" />
                      </span>
                    )}
                  </div>

                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-slate-800 leading-tight">
                      {item.name}
                    </h4>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      {isUnlocked ? 'Ontgrendeld ✨' : item.unlockRequirement}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
