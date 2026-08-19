import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Check, User, Heart, Palette } from 'lucide-react';
import { TOCA_PRESETS, TocaPreset } from '../data/tocaAvatarData';
import { TocaAvatar } from './TocaAvatar';
import { sound } from '../services/soundService';

interface ProfileAvatarModalProps {
  isOpen: boolean;
  currentName: string;
  currentAvatarId?: string;
  onSave: (name: string, avatarId: string, avatarEmoji: string, avatarTitle: string, tocaData?: any) => void;
  onClose: () => void;
  isFirstTime?: boolean;
}

export const ProfileAvatarModal: React.FC<ProfileAvatarModalProps> = ({
  isOpen,
  currentName,
  currentAvatarId = 'maya_vet',
  onSave,
  onClose,
  isFirstTime = false
}) => {
  const [selectedPresetId, setSelectedPresetId] = useState(
    TOCA_PRESETS.some(p => p.id === currentAvatarId) ? currentAvatarId : TOCA_PRESETS[0].id
  );
  const [name, setName] = useState(currentName || 'Ridheya');

  if (!isOpen) return null;

  const selectedPreset = TOCA_PRESETS.find(p => p.id === selectedPresetId) || TOCA_PRESETS[0];

  const handleSelect = (id: string) => {
    setSelectedPresetId(id);
    sound.playPop();
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = name.trim() || selectedPreset.name.split(' ')[0];
    sound.playCorrect();
    onSave(
      finalName, 
      selectedPreset.id, 
      '🛹', 
      selectedPreset.tagline,
      selectedPreset.customization
    );
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white rounded-3xl p-6 sm:p-7 max-w-xl w-full border-2 border-cyan-200 shadow-2xl relative overflow-hidden"
        >
          {/* Close button if not first-time mandatory */}
          {!isFirstTime && (
            <button
              onClick={() => {
                sound.playPop();
                onClose();
              }}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {/* Header */}
          <div className="text-center mb-5">
            <span className="text-xs font-black uppercase tracking-wider text-teal-800 bg-teal-100/80 px-3 py-1 rounded-full inline-flex items-center gap-1.5 mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Toca &amp; Roblox Karakter Keuze</span>
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
              Wie ben jij in het Safaripark? 🌟
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              Kies jouw favoriete hippe ontdekkingsreiziger. Je kunt kleding, haar en accessoires altijd aanpassen!
            </p>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            {/* Name Input */}
            <div className="space-y-1">
              <label className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-teal-600" />
                <span>Jouw Naam:</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={20}
                placeholder="Bijv. Ridheya, Hemali..."
                className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-200 focus:border-teal-500 focus:bg-white rounded-2xl text-slate-800 font-bold text-sm outline-none transition-all"
              />
            </div>

            {/* Avatar Grid (Toca/Roblox Cool Avatars) */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center justify-between">
                <span>Kies Jouw Karakter Archetype:</span>
                <span className="text-teal-700 font-bold lowercase">({TOCA_PRESETS.length} stijlen)</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-56 overflow-y-auto p-1">
                {TOCA_PRESETS.map((preset) => {
                  const isSelected = selectedPresetId === preset.id;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleSelect(preset.id)}
                      className={`p-2.5 rounded-2xl border-2 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-teal-500 bg-teal-50 shadow-md scale-102 ring-2 ring-teal-300'
                          : 'border-slate-100 bg-slate-50/80 hover:bg-slate-100 hover:border-slate-300'
                      }`}
                    >
                      <div className="p-1 rounded-xl bg-white shadow-xs">
                        <TocaAvatar customization={preset.customization} size={48} />
                      </div>
                      <span className="text-[11px] font-black text-slate-800 line-clamp-1 text-center">
                        {preset.name.split(' ')[0]}
                      </span>
                      <span className="text-[9px] font-bold text-teal-700 line-clamp-1">
                        {preset.tagline.split('&')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Avatar Preview Card */}
            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200 rounded-2xl p-3 flex items-center gap-3">
              <div className="p-1 rounded-2xl bg-white shadow-xs border border-teal-200 flex-shrink-0">
                <TocaAvatar customization={selectedPreset.customization} size={54} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-black text-teal-950 truncate">
                    {name.trim() || selectedPreset.name}
                  </h4>
                  <span className="text-[10px] font-extrabold uppercase bg-teal-200/80 text-teal-900 px-2 py-0.5 rounded-md truncate">
                    {selectedPreset.tagline}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5 line-clamp-2">
                  {selectedPreset.bio}
                </p>
              </div>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              className="w-full py-3 px-6 rounded-2xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-teal-600/25 cursor-pointer transition-all active:scale-98 flex items-center justify-center gap-2"
            >
              <Check className="w-5 h-5" />
              <span>Start Avontuur als {name.trim() || selectedPreset.name.split(' ')[0]}!</span>
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
