import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Volume2, VolumeX, Flame, Star, Coins, Award, Compass, Trees, Download, GraduationCap, User, BookOpen, Mic, Wrench, Crown, Shirt, Palette } from 'lucide-react';
import { sound } from '../services/soundService';
import { GradeLevel, BiomeType } from '../types';
import { BIOMES } from '../data/biomeData';
import { TocaAvatar } from './TocaAvatar';
import { TocaCustomization } from '../data/tocaAvatarData';

interface TopBarProps {
  playerName: string;
  avatarEmoji?: string;
  avatarTitle?: string;
  tocaCustomization?: Partial<TocaCustomization>;
  onOpenProfileModal: () => void;
  onOpenLoginModal?: () => void;
  onOpenScoreboardModal?: () => void;
  onOpenReadingModal?: () => void;
  onOpenReporterModal?: () => void;
  onOpenSpellingFactoryModal?: () => void;
  onOpenSisterTeamModal?: () => void;
  onOpenWardrobeModal?: () => void;
  onOpenVersionModal?: () => void;
  onOpenVetHospitalModal?: () => void;
  onOpenCitoRpgModal?: () => void;
  onOpenVoiceModal?: () => void;
  onOpenDictionaryModal?: () => void;
  onOpenArcadeModal?: () => void;
  stars: number;
  score: number;
  streak: number;
  activeTab: 'adventure' | 'arcade' | 'sanctuary' | 'badges' | 'map';
  onSelectTab: (tab: 'adventure' | 'arcade' | 'sanctuary' | 'badges' | 'map') => void;
  unlockedCount: number;
  totalAnimals: number;
  selectedGrade: GradeLevel;
  selectedBiome?: BiomeType;
  onOpenGradeSelector: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  playerName,
  avatarEmoji = '👩‍🌾',
  avatarTitle = 'Avonturier',
  tocaCustomization,
  onOpenProfileModal,
  onOpenLoginModal,
  onOpenScoreboardModal,
  onOpenReadingModal,
  onOpenReporterModal,
  onOpenSpellingFactoryModal,
  onOpenSisterTeamModal,
  onOpenWardrobeModal,
  onOpenVersionModal,
  onOpenVetHospitalModal,
  onOpenCitoRpgModal,
  onOpenVoiceModal,
  onOpenDictionaryModal,
  onOpenArcadeModal,
  stars,
  score,
  streak,
  activeTab,
  onSelectTab,
  unlockedCount,
  totalAnimals,
  selectedGrade,
  selectedBiome = 'farm',
  onOpenGradeSelector
}) => {
  const [soundOn, setSoundOn] = useState(true);

  const isHemali = playerName.toLowerCase() === 'hemali';

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    sound.soundEnabled = next;
    sound.speechEnabled = next;
    if (next) sound.playPop();
  };

  const handleDownloadOfflineHTML = () => {
    sound.playStar();
    const link = document.createElement('a');
    link.href = '/boerin_tess_safari.html';
    link.download = 'Boerin_Tess_Safaripark_Spel.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const progressPercent = Math.min(100, Math.round((unlockedCount / totalAnimals) * 100));

  return (
    <header id="top-navbar" className="w-full max-w-5xl mx-auto px-3 sm:px-4 pt-3 sm:pt-4 pb-2 space-y-2.5">
      {/* Top Header Card in Modern Fluid Glassmorphic Style */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-xl shadow-emerald-950/5 border border-emerald-100 px-4 sm:px-6 py-3 sm:py-3.5 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
        
        {/* Left Branding / Avatar & Profile */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start flex-wrap sm:flex-nowrap">
          <div className="flex items-center gap-3">
            {/* Clickable Avatar Badge with Live Toca / Roblox Avatar */}
            <button
              id="avatar-profile-btn"
              onClick={() => {
                sound.playPop();
                if (onOpenWardrobeModal) onOpenWardrobeModal();
                else onOpenProfileModal();
              }}
              className="relative p-0.5 w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-teal-500 via-cyan-500 to-indigo-600 hover:from-teal-400 hover:to-indigo-500 rounded-2xl flex items-center justify-center shadow-md shadow-cyan-600/25 flex-shrink-0 cursor-pointer transition-all hover:scale-105 active:scale-95 border-2 border-white ring-2 ring-cyan-200 overflow-hidden group"
              title="Klik om je Toca & Roblox karakter, haarstijl en streetwear aan te passen!"
            >
              <TocaAvatar customization={tocaCustomization} size={42} />
              <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <Sparkles className="w-4 h-4 text-cyan-300 animate-spin" />
              </div>
            </button>

            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {/* Player Switch Login Button */}
                <button
                  id="user-switch-button"
                  onClick={() => {
                    sound.playPop();
                    if (onOpenLoginModal) onOpenLoginModal();
                    else onOpenProfileModal();
                  }}
                  className="bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-950 font-black text-xs px-2.5 py-1 rounded-xl cursor-pointer transition-all flex items-center gap-1.5 shadow-xs hover:scale-102 active:scale-95"
                  title="Klik om te wisselen van speler"
                >
                  <span>👤 {playerName}</span>
                  <span className="text-[9px] text-white font-black bg-emerald-600 px-1.5 py-0.5 rounded-md uppercase tracking-wide">
                    Wissel
                  </span>
                </button>
                
                {/* Grade Switcher Pill */}
                <button
                  id="grade-toggle-btn"
                  onClick={() => {
                    sound.playPop();
                    onOpenGradeSelector();
                  }}
                  className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-xl border cursor-pointer transition-all flex items-center gap-1 shadow-xs active:scale-95 ${
                    selectedGrade === 'group_4_5'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                      : 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
                  }`}
                  title="Klik om het onderwijsniveau te wijzigen"
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>{selectedGrade === 'group_4_5' ? 'Groep 4-5' : 'Groep 6-7-8'}</span>
                </button>
              </div>

              <div className="text-[11px] font-bold text-slate-500 mt-0.5 flex items-center gap-1.5">
                <span className="text-emerald-700 font-extrabold">{avatarTitle}</span>
                <span>•</span>
                <span>{unlockedCount}/{totalAnimals} Dieren</span>
              </div>
            </div>
          </div>

          {/* Quick Utility Icon Group */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {onOpenVoiceModal && (
              <button
                id="voice-settings-quick-btn"
                onClick={() => {
                  sound.playPop();
                  onOpenVoiceModal();
                }}
                className="p-2 rounded-xl border border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-800 transition-all cursor-pointer shadow-xs active:scale-95"
                title="Steminstellingen & Voorleessnelheid"
              >
                <Mic className="w-4 h-4 text-amber-700" />
              </button>
            )}

            {onOpenDictionaryModal && (
              <button
                id="dictionary-quick-btn"
                onClick={() => {
                  sound.playPop();
                  onOpenDictionaryModal();
                }}
                className="p-2 rounded-xl border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-800 transition-all cursor-pointer shadow-xs active:scale-95"
                title="Interactief Nederlands Woordenboek & Cito Hulp"
              >
                <BookOpen className="w-4 h-4 text-blue-700" />
              </button>
            )}

            {onOpenScoreboardModal && (
              <button
                id="parent-scoreboard-btn"
                onClick={() => {
                  sound.playPop();
                  onOpenScoreboardModal();
                }}
                className="p-2 rounded-xl border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 transition-all cursor-pointer shadow-xs active:scale-95"
                title="Ouder & Docent Scorebord"
              >
                <Award className="w-4 h-4 text-indigo-700" />
              </button>
            )}

            <button
              id="download-html-btn"
              onClick={handleDownloadOfflineHTML}
              className="p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition-all cursor-pointer shadow-xs active:scale-95"
              title="Download offline HTML versie"
            >
              <Download className="w-4 h-4 text-slate-600" />
            </button>

            <button
              id="sound-toggle-btn"
              onClick={toggleSound}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                soundOn
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
                  : 'bg-slate-100 border-slate-200 text-slate-400 hover:bg-slate-200'
              }`}
              title={soundOn ? 'Geluid & Spraak aan' : 'Geluid uit'}
            >
              {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Right Stats & Progress Bar */}
        <div className="flex items-center gap-3 sm:gap-5 flex-wrap justify-between sm:justify-end w-full md:w-auto">
          {/* Score Counter */}
          <div className="flex flex-col items-start sm:items-end">
            <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Score</span>
            <span className="text-sm sm:text-base font-black text-amber-600 leading-tight flex items-center gap-1">
              {stars.toLocaleString()} 🌟
            </span>
          </div>

          {/* Coins */}
          <div className="flex flex-col items-start sm:items-end">
            <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Munten</span>
            <span className="text-sm sm:text-base font-black text-emerald-700 leading-tight flex items-center gap-1">
              {score.toLocaleString()} 🪙
            </span>
          </div>

          {/* Streak Counter */}
          <div className="flex flex-col items-start sm:items-end">
            <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Reeks</span>
            <span className={`text-sm sm:text-base font-black leading-tight flex items-center gap-1 ${streak > 0 ? 'text-rose-600 animate-pulse' : 'text-slate-400'}`}>
              {streak} 🔥
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <nav id="game-navigation-tabs" className="flex items-center justify-between gap-1.5 sm:gap-2 overflow-x-auto pb-0.5">
        <div className="flex items-center gap-1.5 sm:gap-2 flex-nowrap min-w-max">
          {/* Adventure Tab */}
          <button
            id="nav-tab-adventure"
            onClick={() => {
              sound.playPop();
              onSelectTab('adventure');
            }}
            className={`px-3 sm:px-4 py-2 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all border ${
              activeTab === 'adventure'
                ? 'bg-emerald-600 text-white border-emerald-700 shadow-md shadow-emerald-600/20'
                : 'bg-white/80 backdrop-blur-md text-slate-600 hover:text-emerald-900 hover:bg-white border-slate-200/80 shadow-xs'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Taal Avontuur</span>
          </button>

          {/* Safari Arcade Tab */}
          <button
            id="nav-tab-arcade"
            onClick={() => {
              sound.playPop();
              onSelectTab('arcade');
            }}
            className={`px-3 sm:px-4 py-2 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all border ${
              activeTab === 'arcade'
                ? 'bg-purple-600 text-white border-purple-700 shadow-md shadow-purple-600/20'
                : 'bg-white/80 backdrop-blur-md text-slate-600 hover:text-purple-900 hover:bg-white border-slate-200/80 shadow-xs'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Safari Arcade ⚡</span>
          </button>

          {/* Dierenpark Sanctuary Tab */}
          <button
            id="nav-tab-sanctuary"
            onClick={() => {
              sound.playPop();
              onSelectTab('sanctuary');
            }}
            className={`px-3 sm:px-4 py-2 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all border ${
              activeTab === 'sanctuary'
                ? 'bg-emerald-600 text-white border-emerald-700 shadow-md shadow-emerald-600/20'
                : 'bg-white/80 backdrop-blur-md text-slate-600 hover:text-emerald-900 hover:bg-white border-slate-200/80 shadow-xs'
            }`}
          >
            <Trees className="w-4 h-4" />
            <span>Dierenpark ({unlockedCount}/{totalAnimals})</span>
          </button>

          {/* Badges Showcase Tab */}
          <button
            id="nav-tab-badges"
            onClick={() => {
              sound.playPop();
              onSelectTab('badges');
            }}
            className={`px-3 sm:px-4 py-2 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all border ${
              activeTab === 'badges'
                ? 'bg-emerald-600 text-white border-emerald-700 shadow-md shadow-emerald-600/20'
                : 'bg-white/80 backdrop-blur-md text-slate-600 hover:text-emerald-900 hover:bg-white border-slate-200/80 shadow-xs'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Medailles</span>
          </button>

          {/* Level Roadmap Tab */}
          <button
            id="nav-tab-map"
            onClick={() => {
              sound.playPop();
              onSelectTab('map');
            }}
            className={`px-3 sm:px-4 py-2 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all border ${
              activeTab === 'map'
                ? 'bg-emerald-600 text-white border-emerald-700 shadow-md shadow-emerald-600/20'
                : 'bg-white/80 backdrop-blur-md text-slate-600 hover:text-emerald-900 hover:bg-white border-slate-200/80 shadow-xs'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Wereldkaart</span>
          </button>
        </div>

        {/* Global Dieren Progress Bar */}
        <div className="hidden md:flex items-center gap-2 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-black text-slate-600 whitespace-nowrap">Wereldcollectie:</span>
          <div className="w-20 bg-slate-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-400 to-emerald-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-[11px] font-black text-emerald-800">{progressPercent}%</span>
        </div>
      </nav>
    </header>
  );
};
