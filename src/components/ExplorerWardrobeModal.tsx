import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Check, Lock, Heart, Crown } from 'lucide-react';
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
    hairStyle: 'vlechtjes met strikjes',
    hairColor: '#4a2c11',
    hat: 'hat-safari',
    outfit: 'outfit-khaki',
    backpack: 'bag-canvas',
    glasses: 'glass-none',
    boots: 'boots-pink',
    badgePin: 'heart-pin',
    unlockedItems: ['hat-safari', 'hat-tiara', 'hat-flower', 'outfit-khaki', 'outfit-princess', 'bag-canvas', 'bag-unicorn', 'glass-none', 'glass-heart']
  };

  const filteredItems = WARDROBE_ITEMS.filter(item => item.type === activeTab);

  const equippedHat = WARDROBE_ITEMS.find(i => i.id === currentCustom.hat);
  const equippedOutfit = WARDROBE_ITEMS.find(i => i.id === currentCustom.outfit);
  const equippedBag = WARDROBE_ITEMS.find(i => i.id === currentCustom.backpack);
  const equippedGlass = WARDROBE_ITEMS.find(i => i.id === currentCustom.glasses);

  const handleSelectItem = (item: WardrobeItem) => {
    const isUnlocked = item.unlockedByDefault || (currentCustom.unlockedItems && currentCustom.unlockedItems.includes(item.id));
    if (!isUnlocked) {
      sound.playIncorrect();
      return;
    }

    sound.playStar();
    onUpdateProfile(prev => ({
      ...prev,
      customization: {
        ...currentCustom,
        [activeTab]: item.id
      }
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl border-2 border-pink-200 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header with Pink & Purple Girly Theme */}
        <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 p-4 sm:p-5 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-3xl border border-white/30 shadow-inner">
              👑
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-lg sm:text-xl font-black">Prinsessen &amp; Safari Kledingkast</h3>
                <span className="bg-amber-300 text-pink-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">Girls Edition</span>
              </div>
              <p className="text-xs text-pink-100 font-medium">
                Kies je mooiste tiara, glitterjurk, eenhoorntas en hartjesbril!
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-all active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Character Dress-Up Stage Preview */}
        <div className="bg-gradient-to-b from-pink-50 via-purple-50 to-white p-4 border-b border-pink-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20 rounded-2xl bg-white border-2 border-pink-300 shadow-md flex items-center justify-center">
              <span className="text-5xl filter drop-shadow-sm select-none">{profile.avatarEmoji || '👧🏽'}</span>
              
              {/* Overlay equipped badge badges */}
              {equippedHat && equippedHat.id !== 'hat-none' && (
                <span className="absolute -top-3 -right-2 text-2xl filter drop-shadow-xs animate-bounce-short">
                  {equippedHat.emoji}
                </span>
              )}
              {equippedGlass && equippedGlass.id !== 'glass-none' && (
                <span className="absolute top-3 -left-2 text-xl filter drop-shadow-xs">
                  {equippedGlass.emoji}
                </span>
              )}
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-black text-purple-950">{profile.name}</span>
                <span className="text-xs text-pink-600 font-bold">✨ Safari Outfit</span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap mt-1">
                <span className="text-[11px] font-bold bg-pink-100 text-pink-800 px-2 py-0.5 rounded-lg border border-pink-200">
                  {equippedHat?.name || 'Roze Safarihoed'}
                </span>
                <span className="text-[11px] font-bold bg-purple-100 text-purple-800 px-2 py-0.5 rounded-lg border border-purple-200">
                  {equippedOutfit?.name || 'Pastel Jurk'}
                </span>
                <span className="text-[11px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-lg border border-amber-200">
                  {equippedBag?.name || 'Hartjestas'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-rose-700 bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-200 flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              <span>{profile.stars} Sterren</span>
            </span>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex items-center gap-2 overflow-x-auto">
          {[
            { id: 'hat', name: 'Tiara\'s & Strikken 👑' },
            { id: 'outfit', name: 'Jurkjes & Outfits 👗' },
            { id: 'backpack', name: 'Eenhoorn Tassen 🦄' },
            { id: 'glasses', name: 'Hartjes Bril & Sieraden 🎀' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                sound.playPop();
                setActiveTab(tab.id as any);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black whitespace-nowrap cursor-pointer transition-all ${
                activeTab === tab.id
                  ? 'bg-pink-600 text-white shadow-md shadow-pink-600/20 scale-102'
                  : 'bg-white text-slate-600 hover:bg-pink-50 border border-slate-200'
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
              const isUnlocked = item.unlockedByDefault || (currentCustom.unlockedItems && currentCustom.unlockedItems.includes(item.id));
              const isEquipped = currentCustom[activeTab] === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => handleSelectItem(item)}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between gap-2 relative ${
                    isEquipped
                      ? 'bg-pink-50 border-pink-500 ring-2 ring-pink-300 shadow-md scale-101'
                      : isUnlocked
                      ? 'bg-white hover:bg-pink-50/50 border-slate-200 hover:border-pink-300 shadow-xs'
                      : 'bg-slate-100 border-slate-200 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-3xl filter drop-shadow-xs">{item.emoji}</span>
                    {isEquipped && (
                      <span className="text-[10px] font-black text-white bg-pink-600 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
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
                    <p className="text-[10px] font-semibold text-slate-500 mt-0.5">
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
