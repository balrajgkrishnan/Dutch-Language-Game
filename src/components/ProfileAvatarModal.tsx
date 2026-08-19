import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Check, User, Heart } from 'lucide-react';
import { FEMALE_AVATARS } from '../data/avatarsData';
import { sound } from '../services/soundService';

interface ProfileAvatarModalProps {
  isOpen: boolean;
  currentName: string;
  currentAvatarId?: string;
  onSave: (name: string, avatarId: string, avatarEmoji: string, avatarTitle: string) => void;
  onClose: () => void;
  isFirstTime?: boolean;
}

export const ProfileAvatarModal: React.FC<ProfileAvatarModalProps> = ({
  isOpen,
  currentName,
  currentAvatarId = 'tess',
  onSave,
  onClose,
  isFirstTime = false
}) => {
  const [selectedAvatarId, setSelectedAvatarId] = useState(currentAvatarId);
  const [name, setName] = useState(currentName || 'Boerin Tess');

  if (!isOpen) return null;

  const selectedAvatar = FEMALE_AVATARS.find(a => a.id === selectedAvatarId) || FEMALE_AVATARS[0];

  const handleSelect = (id: string) => {
    setSelectedAvatarId(id);
    const chosen = FEMALE_AVATARS.find(a => a.id === id);
    if (chosen && (name === 'Boerin Tess' || name === '' || FEMALE_AVATARS.some(a => a.name === name))) {
      setName(chosen.name);
    }
    sound.playPop();
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = name.trim() || selectedAvatar.name;
    sound.playCorrect();
    onSave(finalName, selectedAvatar.id, selectedAvatar.emoji, selectedAvatar.title);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-emerald-100 shadow-2xl relative overflow-hidden"
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
          <div className="text-center mb-6">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-full inline-flex items-center gap-1.5 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Kies Jouw Avonturier</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
              Wie gaat er op safari? 🌟
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
              Kies je favoriete ontdekkingsreiziger en vul je eigen naam in voor een persoonlijk avontuur!
            </p>
          </div>

          <form onSubmit={handleSave} className="space-y-5">
            {/* Name Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-emerald-600" />
                <span>Jouw Naam:</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={20}
                placeholder="Bijv. Tess, Sanne, Emma..."
                className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 focus:border-emerald-500 focus:bg-white rounded-2xl text-slate-800 font-bold text-base outline-none transition-all"
              />
            </div>

            {/* Avatar Grid (Only Female Avatars) */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center justify-between">
                <span>Kies Jouw Vrouwelijke Avatar:</span>
                <span className="text-emerald-700 font-bold lowercase">({FEMALE_AVATARS.length} karakters)</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 max-h-56 overflow-y-auto p-1">
                {FEMALE_AVATARS.map((avatar) => {
                  const isSelected = selectedAvatarId === avatar.id;
                  return (
                    <button
                      key={avatar.id}
                      type="button"
                      onClick={() => handleSelect(avatar.id)}
                      className={`p-2.5 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-50 shadow-md scale-102 ring-2 ring-emerald-300'
                          : 'border-slate-100 bg-slate-50/80 hover:bg-slate-100 hover:border-slate-300'
                      }`}
                    >
                      <div className="text-3xl sm:text-4xl filter drop-shadow-xs">
                        {avatar.emoji}
                      </div>
                      <span className="text-[11px] font-black text-slate-800 line-clamp-1 text-center">
                        {avatar.name.split(' ')[1] || avatar.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Avatar Preview Card */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-3.5 flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-white shadow-xs flex items-center justify-center text-3xl border border-emerald-200 flex-shrink-0">
                {selectedAvatar.emoji}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-black text-emerald-950 truncate">
                    {name.trim() || selectedAvatar.name}
                  </h4>
                  <span className="text-[10px] font-extrabold uppercase bg-emerald-200/80 text-emerald-900 px-2 py-0.5 rounded-md truncate">
                    {selectedAvatar.title}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5 line-clamp-1">
                  {selectedAvatar.description}
                </p>
              </div>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/40 cursor-pointer transition-all active:scale-98 flex items-center justify-center gap-2"
            >
              <Check className="w-5 h-5" />
              <span>Start Avontuur als {name.trim() || selectedAvatar.name}!</span>
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
