import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Volume2, VolumeX, Flame, Star, Coins, Award, Compass, Trees, Download, GraduationCap, User } from 'lucide-react';
import { sound } from '../services/soundService';
import { GradeLevel, BiomeType } from '../types';
import { BIOMES } from '../data/biomeData';

interface TopBarProps {
  playerName: string;
  avatarEmoji?: string;
  avatarTitle?: string;
  onOpenProfileModal: () => void;
  onOpenLoginModal?: () => void;
  onOpenScoreboardModal?: () => void;
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
  onOpenProfileModal,
  onOpenLoginModal,
  onOpenScoreboardModal,
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

  const currentBiome = BIOMES.find(b => b.id === selectedBiome) || BIOMES[0];

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
    <header id="top-navbar" className="w-full max-w-5xl mx-auto px-3 sm:px-4 pt-3 sm:pt-4 pb-2">
      {/* Top Header Card in Modern Fluid Glassmorphic Style */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-xl shadow-emerald-950/5 border border-emerald-100 px-4 sm:px-6 py-3.5 sm:py-4 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
        
        {/* Left Branding / Avatar & Profile */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start flex-wrap sm:flex-nowrap">
          <div className="flex items-center gap-3">
            {/* Clickable Avatar Badge - opens Avatar/Profile Modal */}
            <button
              id="avatar-profile-btn"
              onClick={() => {
                sound.playPop();
                onOpenProfileModal();
              }}
              className="w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 rounded-2xl flex items-center justify-center text-white text-2xl sm:text-3xl font-bold shadow-md shadow-emerald-600/20 flex-shrink-0 cursor-pointer transition-all hover:scale-105 active:scale-95 border-2 border-white ring-2 ring-emerald-200"
              title="Klik om je avatar en titel aan te passen"
            >
              {avatarEmoji}
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
                <span>{unlockedCount}/{totalAnimals} Dieren vrijgespeeld</span>
              </div>
            </div>
          </div>

          {/* Action Buttons (Scoreboard, Download & Sound) */}
          <div className="flex items-center gap-2 flex-wrap">
            {onOpenScoreboardModal && (
              <button
                id="parent-scoreboard-btn"
                onClick={() => {
                  sound.playPop();
                  onOpenScoreboardModal();
                }}
                className="px-3 py-1.5 sm:py-2 rounded-xl border-2 border-indigo-300 bg-indigo-600 hover:bg-indigo-700 text-white transition-all cursor-pointer font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-indigo-600/20 active:scale-95"
                title="Open Ouder Scorebord & Voortgang per Uur / Dag"
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

      {/* Modern Navigation Tabs */}
      <nav id="game-navigation-tabs" className="mt-3 flex items-center justify-between gap-1.5 sm:gap-2 overflow-x-auto pb-1">
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
