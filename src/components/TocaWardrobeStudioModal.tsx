import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Sparkles, 
  Check, 
  Shirt, 
  Smile, 
  Glasses, 
  Camera, 
  Palette, 
  Heart, 
  Crown,
  RotateCcw,
  Sparkle,
  Dices,
  Wand2
} from 'lucide-react';
import { PlayerProfile } from '../types';
import { 
  TOCA_PRESETS, 
  TOCA_SKIN_TONES, 
  TOCA_HAIR_COLORS, 
  TOCA_HAIR_STYLES, 
  TOCA_EYES,
  TOCA_MOUTHS,
  TOCA_FACE_STICKERS,
  TOCA_OUTFITS, 
  TOCA_HEADWEAR, 
  TOCA_GLASSES, 
  TOCA_HANDHELD,
  TOCA_AURAS,
  TocaCustomization,
  DEFAULT_TOCA_CUSTOMIZATION
} from '../data/tocaAvatarData';
import { TocaAvatar } from './TocaAvatar';
import { sound } from '../services/soundService';
import confetti from 'canvas-confetti';

interface TocaWardrobeStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: PlayerProfile;
  onUpdateProfile: (updater: (prev: PlayerProfile) => PlayerProfile) => void;
}

type StudioTab = 'presets' | 'hair' | 'face' | 'outfit' | 'accessories' | 'props' | 'aura';

export const TocaWardrobeStudioModal: React.FC<TocaWardrobeStudioModalProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile
}) => {
  const [activeTab, setActiveTab] = useState<StudioTab>('presets');

  // Load active customization or default
  const [custom, setCustom] = useState<TocaCustomization>(() => {
    if ((profile.customization as any)?.toca) {
      return (profile.customization as any).toca;
    }
    const isHemali = profile.name.toLowerCase().includes('hemali');
    const isRidheya = profile.name.toLowerCase().includes('ridheya');

    if (isHemali) {
      const foundHemali = TOCA_PRESETS.find(p => p.id === 'hemali_scholar');
      return foundHemali ? foundHemali.customization : DEFAULT_TOCA_CUSTOMIZATION;
    }
    if (isRidheya) {
      const foundRidheya = TOCA_PRESETS.find(p => p.id === 'ridheya_explorer');
      return foundRidheya ? foundRidheya.customization : DEFAULT_TOCA_CUSTOMIZATION;
    }
    return DEFAULT_TOCA_CUSTOMIZATION;
  });

  if (!isOpen) return null;

  const handleApplyPreset = (presetId: string) => {
    sound.playStar();
    const found = TOCA_PRESETS.find(p => p.id === presetId);
    if (found) {
      setCustom(found.customization);
      saveCustomization(found.customization);
    }
  };

  const updateField = <K extends keyof TocaCustomization>(key: K, value: TocaCustomization[K]) => {
    sound.playPop();
    const updated = { ...custom, [key]: value };
    setCustom(updated);
    saveCustomization(updated);
  };

  const handleRandomize = () => {
    sound.playStar();
    const randomSkin = TOCA_SKIN_TONES[Math.floor(Math.random() * TOCA_SKIN_TONES.length)].color;
    const randomHairColor = TOCA_HAIR_COLORS[Math.floor(Math.random() * TOCA_HAIR_COLORS.length)].color;
    const randomHairStyle = TOCA_HAIR_STYLES[Math.floor(Math.random() * TOCA_HAIR_STYLES.length)].id;
    const randomOutfit = TOCA_OUTFITS[Math.floor(Math.random() * TOCA_OUTFITS.length)].id;
    const randomEyes = TOCA_EYES[Math.floor(Math.random() * TOCA_EYES.length)].id;
    const randomMouth = TOCA_MOUTHS[Math.floor(Math.random() * TOCA_MOUTHS.length)].id;
    const randomSticker = TOCA_FACE_STICKERS[Math.floor(Math.random() * TOCA_FACE_STICKERS.length)].id;
    const randomHeadwear = TOCA_HEADWEAR[Math.floor(Math.random() * TOCA_HEADWEAR.length)].id;
    const randomGlasses = TOCA_GLASSES[Math.floor(Math.random() * TOCA_GLASSES.length)].id;
    const randomHandheld = TOCA_HANDHELD[Math.floor(Math.random() * TOCA_HANDHELD.length)].id;
    const randomAura = TOCA_AURAS[Math.floor(Math.random() * TOCA_AURAS.length)].id;

    const randomized: TocaCustomization = {
      baseId: 'custom_mix',
      skinTone: randomSkin,
      hairColor: randomHairColor,
      hairStyle: randomHairStyle,
      outfit: randomOutfit,
      eyes: randomEyes,
      mouth: randomMouth,
      faceSticker: randomSticker,
      headwear: randomHeadwear,
      glasses: randomGlasses,
      handheld: randomHandheld,
      aura: randomAura
    };

    setCustom(randomized);
    saveCustomization(randomized);
  };

  const handleResetToProtagonist = () => {
    sound.playPop();
    const isHemali = profile.name.toLowerCase().includes('hemali');
    const presetId = isHemali ? 'hemali_scholar' : 'ridheya_explorer';
    const found = TOCA_PRESETS.find(p => p.id === presetId);
    if (found) {
      setCustom(found.customization);
      saveCustomization(found.customization);
    }
  };

  const saveCustomization = (newCustom: TocaCustomization) => {
    onUpdateProfile(prev => ({
      ...prev,
      customization: {
        ...prev.customization,
        toca: newCustom,
        outfit: newCustom.outfit,
        hairStyle: newCustom.hairStyle,
        hairColor: newCustom.hairColor,
        hat: newCustom.headwear,
        glasses: newCustom.glasses
      } as any
    }));
  };

  const handleSaveAndCelebrate = () => {
    sound.playVictory();
    confetti({ particleCount: 120, spread: 90 });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/75 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl border-2 border-cyan-200 overflow-hidden flex flex-col max-h-[94vh]"
      >
        {/* Header - Modern Urban Cool Studio */}
        <div className="bg-gradient-to-r from-teal-700 via-cyan-600 to-indigo-700 p-4 sm:p-5 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-3xl shadow-inner border border-white/20">
              🛹
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg sm:text-xl font-black tracking-tight">
                  Toca &amp; Roblox Avatar Studio
                </h3>
                <span className="bg-amber-300 text-slate-950 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-xs">
                  Pro Customizer ✨
                </span>
              </div>
              <p className="text-xs text-cyan-100 font-medium">
                Kies je favoriete karakter, pas je haar, streetwear, safari outfits, brillen &amp; magische auras aan!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRandomize}
              className="px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white rounded-xl text-xs font-black flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
              title="Willekeurige leuke look!"
            >
              <Dices className="w-4 h-4 text-amber-300" />
              <span className="hidden sm:inline">Verras Mij!</span>
            </button>

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
        </div>

        {/* Live Interactive Paper-Doll Preview Stage */}
        <div className="bg-gradient-to-b from-cyan-50 via-slate-50 to-white p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative p-2 rounded-3xl bg-white border-2 border-cyan-300 shadow-md flex items-center justify-center">
              <TocaAvatar customization={custom} size={112} animate={true} />
              
              <div className="absolute -bottom-2 bg-slate-900 text-cyan-300 text-[10px] font-black uppercase px-2 py-0.5 rounded-full shadow-xs">
                Live Preview
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-base sm:text-lg font-black text-slate-800">{profile.name}</h4>
                <span className="text-xs font-bold text-teal-700 bg-teal-100 px-2 py-0.5 rounded-lg border border-teal-200">
                  {TOCA_OUTFITS.find(o => o.id === custom.outfit)?.name || 'Custom Outfit'}
                </span>
                {custom.aura && custom.aura !== 'none' && (
                  <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-lg border border-purple-200">
                    {TOCA_AURAS.find(a => a.id === custom.aura)?.icon} {TOCA_AURAS.find(a => a.id === custom.aura)?.name}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5 flex-wrap mt-2">
                <span className="text-[11px] font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200">
                  💇‍♀️ {TOCA_HAIR_STYLES.find(h => h.id === custom.hairStyle)?.name}
                </span>
                {custom.headwear !== 'none' && (
                  <span className="text-[11px] font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200">
                    🎧 {TOCA_HEADWEAR.find(h => h.id === custom.headwear)?.name}
                  </span>
                )}
                {custom.glasses !== 'none' && (
                  <span className="text-[11px] font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200">
                    👓 {TOCA_GLASSES.find(g => g.id === custom.glasses)?.name}
                  </span>
                )}
                {custom.handheld !== 'none' && (
                  <span className="text-[11px] font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200">
                    📷 {TOCA_HANDHELD.find(h => h.id === custom.handheld)?.name}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetToProtagonist}
              className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl text-xs font-bold border border-slate-300 cursor-pointer flex items-center gap-1.5 active:scale-95"
              title="Herstel naar Ridheya of Hemali standaard"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span>Herstel</span>
            </button>

            <button
              onClick={handleSaveAndCelebrate}
              className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-2xl text-xs sm:text-sm font-black shadow-md cursor-pointer flex items-center gap-1.5 active:scale-95"
            >
              <Check className="w-4 h-4" />
              <span>Outfit Opslaan!</span>
            </button>
          </div>
        </div>

        {/* Studio Navigation Tabs */}
        <div className="bg-slate-100/90 border-b border-slate-200 px-3 sm:px-4 py-2 flex items-center gap-1.5 overflow-x-auto">
          {[
            { id: 'presets', label: '⭐ Karakter Presets', icon: '✨' },
            { id: 'hair', label: '💇‍♀️ Haar & Kleur', icon: '🎨' },
            { id: 'face', label: '😊 Huid & Gezicht', icon: '👀' },
            { id: 'outfit', label: '👕 Hip Outfits', icon: '🛹' },
            { id: 'accessories', label: '🎧 Hoofd & Bril', icon: '🕶️' },
            { id: 'props', label: '📷 Handheld Gadgets', icon: '📱' },
            { id: 'aura', label: '✨ Magische Auras', icon: '🌈' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                sound.playPop();
                setActiveTab(tab.id as StudioTab);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black whitespace-nowrap cursor-pointer transition-all flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Customizer Option Panels */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5">
          
          {/* TAB 1: CHARACTER PRESETS */}
          {activeTab === 'presets' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-black text-slate-800">
                  Kies uit populaire karakters &amp; pas ze naar wens aan:
                </h4>
                <p className="text-xs text-slate-500">
                  Van Ridheya en Hemali tot de dierenarts, safari ranger en magiër.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
                {TOCA_PRESETS.map(preset => {
                  const isSelected = custom.baseId === preset.id;
                  return (
                    <motion.div
                      key={preset.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleApplyPreset(preset.id)}
                      className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between gap-2.5 text-left relative ${
                        isSelected
                          ? 'bg-cyan-50/80 border-cyan-500 shadow-md ring-2 ring-cyan-300'
                          : 'bg-white border-slate-200 hover:border-cyan-400 hover:shadow-xs'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-1 rounded-2xl bg-slate-100 border border-slate-200 flex-shrink-0">
                          <TocaAvatar customization={preset.customization} size={52} />
                        </div>
                        <div>
                          <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 inline-block mb-0.5">
                            {preset.badge}
                          </span>
                          <h5 className="text-xs font-black text-slate-800 line-clamp-1">{preset.name}</h5>
                          <span className="text-[10px] text-teal-700 font-bold block line-clamp-1">{preset.tagline}</span>
                        </div>
                      </div>

                      <p className="text-[10px] text-slate-500 leading-relaxed line-clamp-2">
                        {preset.bio}
                      </p>

                      <button className="w-full py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer flex items-center justify-center gap-1">
                        <span>{isSelected ? '✓ Gekozen' : 'Kies Karakter'}</span>
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: HAIR & HAIR COLOR */}
          {activeTab === 'hair' && (
            <div className="space-y-5">
              {/* Hair Color Palette */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-slate-700 block">
                  Kies je Haarkleur:
                </label>
                <div className="flex items-center gap-2.5 flex-wrap">
                  {TOCA_HAIR_COLORS.map(color => {
                    const isSelected = custom.hairColor === color.color;
                    return (
                      <button
                        key={color.id}
                        onClick={() => updateField('hairColor', color.color)}
                        className={`w-10 h-10 rounded-2xl cursor-pointer transition-all relative flex items-center justify-center border-2 ${
                          isSelected ? 'scale-110 border-slate-900 shadow-md ring-2 ring-cyan-400' : 'border-slate-300 hover:scale-105'
                        }`}
                        style={{ backgroundColor: color.color }}
                        title={color.name}
                      >
                        {isSelected && <Check className="w-4 h-4 text-white drop-shadow-md" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Hair Styles Grid */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-slate-700 block">
                  Kies je Haarstijl:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {TOCA_HAIR_STYLES.map(style => {
                    const isSelected = custom.hairStyle === style.id;
                    return (
                      <button
                        key={style.id}
                        onClick={() => updateField('hairStyle', style.id)}
                        className={`p-3.5 rounded-2xl border-2 text-left cursor-pointer transition-all flex items-center gap-3 ${
                          isSelected
                            ? 'bg-cyan-50 border-cyan-500 shadow-xs ring-2 ring-cyan-300'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <span className="text-2xl">{style.icon}</span>
                        <div>
                          <h5 className="text-xs font-black text-slate-800">{style.name}</h5>
                          <p className="text-[10px] text-slate-500 leading-tight mt-0.5">{style.description}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FACE, SKIN, EYES & MOUTH */}
          {activeTab === 'face' && (
            <div className="space-y-5">
              {/* Skin Tone Swatches */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-slate-700 block">
                  Kies je Huidskleur:
                </label>
                <div className="flex items-center gap-2.5 flex-wrap">
                  {TOCA_SKIN_TONES.map(st => {
                    const isSelected = custom.skinTone === st.color;
                    return (
                      <button
                        key={st.id}
                        onClick={() => updateField('skinTone', st.color)}
                        className={`w-10 h-10 rounded-2xl cursor-pointer transition-all flex items-center justify-center border-2 ${
                          isSelected ? 'scale-110 border-slate-900 shadow-md ring-2 ring-cyan-400' : 'border-slate-300 hover:scale-105'
                        }`}
                        style={{ backgroundColor: st.color }}
                        title={st.name}
                      >
                        {isSelected && <Check className="w-4 h-4 text-slate-900 drop-shadow-sm" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Eyes Expression */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-slate-700 block">
                  Ooguitdrukking:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {TOCA_EYES.map(eye => (
                    <button
                      key={eye.id}
                      onClick={() => updateField('eyes', eye.id)}
                      className={`p-3 rounded-2xl border-2 text-center cursor-pointer transition-all flex flex-col items-center gap-1 ${
                        custom.eyes === eye.id
                          ? 'bg-cyan-50 border-cyan-500 ring-2 ring-cyan-300'
                          : 'bg-white border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-2xl">{eye.icon}</span>
                      <span className="text-[11px] font-black text-slate-800">{eye.name}</span>
                      <span className="text-[9px] text-slate-500 line-clamp-1">{eye.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mouth Expression */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-slate-700 block">
                  Mond &amp; Expressie:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {TOCA_MOUTHS.map(m => (
                    <button
                      key={m.id}
                      onClick={() => updateField('mouth', m.id)}
                      className={`p-3 rounded-2xl border-2 text-center cursor-pointer transition-all flex flex-col items-center gap-1 ${
                        custom.mouth === m.id
                          ? 'bg-cyan-50 border-cyan-500 ring-2 ring-cyan-300'
                          : 'bg-white border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-2xl">{m.icon}</span>
                      <span className="text-[11px] font-black text-slate-800">{m.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Face Stickers / Details */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-slate-700 block">
                  Gezichtsstickers, Sproetjes &amp; Wangen:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
                  {TOCA_FACE_STICKERS.map(stk => (
                    <button
                      key={stk.id}
                      onClick={() => updateField('faceSticker', stk.id)}
                      className={`p-3 rounded-2xl border-2 text-center cursor-pointer transition-all flex flex-col items-center gap-1 ${
                        custom.faceSticker === stk.id
                          ? 'bg-cyan-50 border-cyan-500 ring-2 ring-cyan-300'
                          : 'bg-white border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-2xl">{stk.icon}</span>
                      <span className="text-[10px] font-black text-slate-800 line-clamp-1">{stk.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: HIP OUTFITS */}
          {activeTab === 'outfit' && (
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-black text-slate-800">
                  Kies je Streetwear, Safari &amp; Dierenarts Outfit:
                </h4>
                <p className="text-xs text-slate-500">
                  Hip, functioneel en ontworpen voor spannende Nederlandse verhalen en avonturen!
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                {TOCA_OUTFITS.map(out => {
                  const isSelected = custom.outfit === out.id;
                  return (
                    <button
                      key={out.id}
                      onClick={() => updateField('outfit', out.id)}
                      className={`p-4 rounded-2xl border-2 text-left cursor-pointer transition-all flex flex-col justify-between gap-2.5 ${
                        isSelected
                          ? 'bg-cyan-50 border-cyan-500 shadow-xs ring-2 ring-cyan-300'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-3xl">{out.icon}</span>
                        <span className="text-[9px] font-black bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full uppercase">
                          {out.tag}
                        </span>
                      </div>
                      <div>
                        <h5 className="text-xs font-black text-slate-800">{out.name}</h5>
                        <p className="text-[11px] text-slate-500 mt-1 leading-tight">{out.style}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 5: HEADWEAR & GLASSES */}
          {activeTab === 'accessories' && (
            <div className="space-y-5">
              {/* Headwear */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-slate-700 block">
                  Hoofddeksels, Tiara’s &amp; Headsets:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {TOCA_HEADWEAR.map(hw => (
                    <button
                      key={hw.id}
                      onClick={() => updateField('headwear', hw.id)}
                      className={`p-3 rounded-2xl border-2 text-left cursor-pointer transition-all flex items-center gap-2.5 ${
                        custom.headwear === hw.id
                          ? 'bg-cyan-50 border-cyan-500 ring-2 ring-cyan-300'
                          : 'bg-white border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-2xl">{hw.icon}</span>
                      <div>
                        <h5 className="text-xs font-black text-slate-800">{hw.name}</h5>
                        {hw.desc && <p className="text-[10px] text-slate-500">{hw.desc}</p>}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Glasses */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-slate-700 block">
                  Brillen &amp; Shades:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
                  {TOCA_GLASSES.map(gl => (
                    <button
                      key={gl.id}
                      onClick={() => updateField('glasses', gl.id)}
                      className={`p-3 rounded-2xl border-2 text-center cursor-pointer transition-all flex flex-col items-center gap-1 ${
                        custom.glasses === gl.id
                          ? 'bg-cyan-50 border-cyan-500 ring-2 ring-cyan-300'
                          : 'bg-white border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-2xl">{gl.icon}</span>
                      <span className="text-xs font-black text-slate-800">{gl.name}</span>
                      <span className="text-[9px] text-slate-500">{gl.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: PROPS & GADGETS */}
          {activeTab === 'props' && (
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-black text-slate-800">
                  Kies je Handheld Safari, Speurder &amp; Dierenarts Gadget:
                </h4>
                <p className="text-xs text-slate-500">
                  Draag je scanner tablet, vergrootglas, spellbook, uiltje of camera in je hand!
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {TOCA_HANDHELD.map(prop => (
                  <button
                    key={prop.id}
                    onClick={() => updateField('handheld', prop.id)}
                    className={`p-3.5 rounded-2xl border-2 text-left cursor-pointer transition-all flex items-center gap-3 ${
                      custom.handheld === prop.id
                        ? 'bg-cyan-50 border-cyan-500 ring-2 ring-cyan-300'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-3xl">{prop.icon}</span>
                    <div>
                      <h5 className="text-xs font-black text-slate-800">{prop.name}</h5>
                      <p className="text-[10px] text-slate-500 leading-tight mt-0.5">{prop.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: MAGICAL AURAS & SPECIAL FX */}
          {activeTab === 'aura' && (
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-black text-slate-800">
                  Kies je Magische Aura &amp; Special Effects:
                </h4>
                <p className="text-xs text-slate-500">
                  Laat sterren, bladeren, vuurvliegjes of een pastel regenboog rondom je avatar zweven!
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {TOCA_AURAS.map(aur => (
                  <button
                    key={aur.id}
                    onClick={() => updateField('aura', aur.id)}
                    className={`p-3.5 rounded-2xl border-2 text-left cursor-pointer transition-all flex flex-col justify-between gap-2 ${
                      custom.aura === aur.id
                        ? 'bg-purple-50 border-purple-500 ring-2 ring-purple-300 shadow-xs'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-3xl">{aur.icon}</span>
                    <div>
                      <h5 className="text-xs font-black text-slate-800">{aur.name}</h5>
                      <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">{aur.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>
      </motion.div>
    </div>
  );
};
