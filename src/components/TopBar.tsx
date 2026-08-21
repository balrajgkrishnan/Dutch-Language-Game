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
  stars: number;
  score: number;
  streak: number;
  activeTab: 'adventure' | 'sanctuary' | 'badges' | 'map';
  onSelectTab: (tab: 'adventure' | 'sanctuary' | 'badges' | 'map') => void;
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
      <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-xl shadow-emerald-950/5 border border-emerald-100 px-4 sm:px-6 py-3.5 sm:py-4 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
        
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
              className="relative p-0.5 w-12 h-12 sm:w-13 sm:h-13 bg-gradient-to-br from-teal-500 via-cyan-500 to-indigo-600 hover:from-teal-400 hover:to-indigo-500 rounded-2xl flex items-center justify-center shadow-md shadow-cyan-600/25 flex-shrink-0 cursor-pointer transition-all hover:scale-105 active:scale-95 border-2 border-white ring-2 ring-cyan-200 overflow-hidden group"
              title="Klik om je Toca & Roblox karakter, haarstijl en streetwear aan te passen!"
            >
              <TocaAvatar customization={tocaCustomization} size={46} />
              <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <Sparkles className="w-4 h-4 text-cyan-300 animate-spin" />
              </div>
            </button>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                {/* Player Switch Login Button */}
                <button
                  id="user-switch-button"
                  onClick={() => {
                    sound.playPop();
                    if (onOpenLoginModal) onOpenLoginModal();
                    else onOpenProfileModal();
                  }}
                  className="bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-950 font-black text-xs sm:text-sm px-2.5 py-1 rounded-xl cursor-pointer transition-all flex items-center gap-1.5 shadow-xs hover:scale-102 active:scale-95"
                  title="Klik om in te loggen als Hemali of Ridheya"
                >
                  <span>👤 {playerName}</span>
                  <span className="text-[10px] text-white font-black bg-emerald-600 px-1.5 py-0.5 rounded-md flex items-center gap-0.5 uppercase tracking-wide">
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
                  className={`text-[10px] sm:text-xs font-black uppercase px-2.5 py-1 rounded-xl border cursor-pointer transition-all flex items-center gap-1 shadow-xs active:scale-95 ${
                    selectedGrade === 'group_4_5'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                      : 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
                  }`}
                  title="Klik om te wisselen tussen Groep 4-5 en Groep 6-7-8"
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>{selectedGrade === 'group_4_5' ? 'Groep 4-5' : 'Groep 6-7-8'}</span>
                </button>
              </div>

              <div className="text-[11px] font-bold text-slate-500 mt-1 flex items-center gap-1.5">
                <span className="text-emerald-700 font-extrabold">{avatarTitle}</span>
                <span>•</span>
                <span>{unlockedCount}/{totalAnimals} Dieren</span>
              </div>
            </div>
          </div>

          {/* Action Buttons (Scoreboard, Download, Version 8 & Sound) */}
          <div className="flex items-center gap-2 flex-wrap">
            {onOpenCitoRpgModal && (
              <button
                id="cito-rpg-exam-btn"
                onClick={() => {
                  sound.playPop();
                  onOpenCitoRpgModal();
                }}
                className="px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl border-2 border-emerald-400 bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 hover:from-emerald-500 hover:to-indigo-600 text-white transition-all cursor-pointer font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-emerald-700/25 active:scale-95 animate-pulse"
                title="Open Cito RPG Avontuur, Doorstroomtoets Vragen & Leesdiagnose"
              >
                <span className="text-sm">🗺️</span>
                <span>Cito RPG Toets ✨</span>
              </button>
            )}

            {onOpenVersionModal && (
              <button
                id="game-version-badge-btn"
                onClick={() => {
                  sound.playPop();
                  onOpenVersionModal();
                }}
                className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl border border-amber-300 bg-amber-100/90 hover:bg-amber-200 text-amber-950 transition-all cursor-pointer font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-xs active:scale-95 animate-bounce-short"
                title="Klik om te zien wat er nieuw is in Game Versie 8"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin-slow" />
                <span>Versie 8 ✨</span>
              </button>
            )}

            {onOpenScoreboardModal && (
              <button
                id="parent-scoreboard-btn"
                onClick={() => {
                  sound.playPop();
                  onOpenScoreboardModal();
                }}
                className="px-3 py-1.5 sm:py-2 rounded-xl border-2 border-indigo-300 bg-indigo-600 hover:bg-indigo-700 text-white transition-all cursor-pointer font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-indigo-600/20 active:scale-95"
                title="Open Ouder Scorebord & Vaardigheden"
              >
                <span className="text-sm">📊</span>
                <span className="font-extrabold">Ouder Scorebord</span>
              </button>
            )}

            <button
              id="download-html-btn"
              onClick={handleDownloadOfflineHTML}
              className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-all cursor-pointer font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-xs active:scale-95"
              title="Download standalone HTML bestand om offline te spelen"
            >
              <Download className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-emerald-600" />
              <span className="inline">Offline .html</span>
            </button>

            <button
              id="sound-toggle-btn"
              onClick={toggleSound}
              className={`p-2 sm:p-2.5 rounded-xl border transition-all cursor-pointer ${
                soundOn
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
                  : 'bg-slate-100 border-slate-200 text-slate-400 hover:bg-slate-200'
              }`}
              title={soundOn ? 'Geluid & Spraak aan' : 'Geluid uit'}
            >
              {soundOn ? <Volume2 className="w-4 sm:w-5 h-4 sm:h-5" /> : <VolumeX className="w-4 sm:w-5 h-4 sm:h-5" />}
            </button>
          </div>
        </div>

        {/* Right Stats & Progress Bar */}
        <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-between sm:justify-center w-full md:w-auto">
          {/* Score Counter */}
          <div className="flex flex-col items-start sm:items-end">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Score</span>
            <span className="text-base sm:text-xl font-black text-amber-600 leading-tight flex items-center gap-1">
              {stars.toLocaleString()} 🌟
            </span>
          </div>

          {/* Coins */}
          <div className="flex flex-col items-start sm:items-end">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Munten</span>
            <span className="text-base sm:text-xl font-black text-emerald-700 leading-tight flex items-center gap-1">
              {score.toLocaleString()} 🪙
            </span>
          </div>

          {/* Streak Counter */}
          <div className="flex flex-col items-start sm:items-end">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Reeks</span>
            <span className={`text-base sm:text-xl font-black leading-tight flex items-center gap-1 ${streak > 0 ? 'text-rose-600 animate-pulse' : 'text-slate-400'}`}>
              {streak} 🔥
            </span>
          </div>
        </div>
      </div>

      {/* Special Learning Adventures & Missions Quick Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {onOpenCitoRpgModal && (
          <button
            onClick={() => {
              sound.playPop();
              onOpenCitoRpgModal();
            }}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-black text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap transition-all active:scale-95 border border-emerald-300/40"
          >
            <span>🗺️ Cito RPG &amp; Diagnose ✨</span>
          </button>
        )}

        {onOpenDictionaryModal && (
          <button
            onClick={() => {
              sound.playPop();
              onOpenDictionaryModal();
            }}
            className="px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap transition-all active:scale-95"
            title="Open interactief Nederlands woordenboek & woordenschatzoeker"
          >
            <span>📖 Woordenboek</span>
          </button>
        )}

        {onOpenVoiceModal && (
          <button
            onClick={() => {
              sound.playPop();
              onOpenVoiceModal();
            }}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-400 hover:to-orange-400 text-white font-black text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap transition-all active:scale-95 border border-amber-300/40"
            title="Kies een vrolijke, vrouwelijke voorleesstem of stel de snelheid in"
          >
            <span>🎙️ Vrolijke Stem 🌸</span>
          </button>
        )}

        {onOpenScoreboardModal && (
          <button
            onClick={() => {
              sound.playPop();
              onOpenScoreboardModal();
            }}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap transition-all active:scale-95"
          >
            <Award className="w-3.5 h-3.5" />
            <span>📊 Groei &amp; Rapport</span>
          </button>
        )}

        {onOpenReadingModal && (
          <button
            onClick={() => {
              sound.playPop();
              onOpenReadingModal();
            }}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap transition-all active:scale-95"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>📖 Lees Avonturen</span>
          </button>
        )}

        {onOpenVetHospitalModal && (
          <button
            onClick={() => {
              sound.playPop();
              onOpenVetHospitalModal();
            }}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-black text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap transition-all active:scale-95"
          >
            <span>🏥 Dierenarts Ziekenhuis</span>
          </button>
        )}

        {isHemali && onOpenReporterModal && (
          <button
            onClick={() => {
              sound.playPop();
              onOpenReporterModal();
            }}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap transition-all active:scale-95"
          >
            <Mic className="w-3.5 h-3.5" />
            <span>🎙️ Safari Reporter</span>
          </button>
        )}

        {!isHemali && onOpenSpellingFactoryModal && (
          <button
            onClick={() => {
              sound.playPop();
              onOpenSpellingFactoryModal();
            }}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-black text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap transition-all active:scale-95"
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>🏭 Spelling Fabriek</span>
          </button>
        )}

        {onOpenSisterTeamModal && (
          <button
            onClick={() => {
              sound.playPop();
              onOpenSisterTeamModal();
            }}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-white font-black text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap transition-all active:scale-95"
          >
            <Crown className="w-3.5 h-3.5" />
            <span>👑 Zussen Team</span>
          </button>
        )}

        {onOpenWardrobeModal && (
          <button
            onClick={() => {
              sound.playPop();
              onOpenWardrobeModal();
            }}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-400 hover:to-indigo-500 text-white font-black text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap transition-all active:scale-95"
          >
            <Palette className="w-3.5 h-3.5 text-amber-300" />
            <span>✨ Avatar Studio</span>
          </button>
        )}
      </div>

      {/* Main Navigation Tabs */}
      <nav id="game-navigation-tabs" className="flex items-center justify-between gap-1.5 sm:gap-2 overflow-x-auto pb-1">
        <div className="flex items-center gap-1.5 sm:gap-2 flex-nowrap min-w-max">
          {/* Adventure Tab */}
          <button
            id="nav-tab-adventure"
            onClick={() => {
              sound.playPop();
              onSelectTab('adventure');
            }}
            className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all border ${
              activeTab === 'adventure'
                ? 'bg-emerald-600 text-white border-emerald-700 shadow-md shadow-emerald-600/20'
                : 'bg-white/80 backdrop-blur-md text-slate-600 hover:text-emerald-900 hover:bg-white border-slate-200/80 shadow-xs'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Taal Avontuur</span>
          </button>

          {/* Dierenpark Sanctuary Tab */}
          <button
            id="nav-tab-sanctuary"
            onClick={() => {
              sound.playPop();
              onSelectTab('sanctuary');
            }}
            className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all border ${
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
            className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all border ${
              activeTab === 'badges'
                ? 'bg-emerald-600 text-white border-emerald-700 shadow-md shadow-emerald-600/20'
                : 'bg-white/80 backdrop-blur-md text-slate-600 hover:text-emerald-900 hover:bg-white border-slate-200/80 shadow-xs'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Medailles</span>
          </button>
        </div>

        {/* Global Dieren Progress Bar */}
        <div className="hidden md:flex items-center gap-2.5 bg-white/80 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-black text-slate-600 whitespace-nowrap">Wereldcollectie:</span>
          <div className="w-24 bg-slate-200 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-400 to-emerald-500 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-xs font-black text-emerald-800">{progressPercent}%</span>
        </div>
      </nav>
    </header>
  );
};
