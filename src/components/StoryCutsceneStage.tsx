import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Volume2, Lightbulb, Compass, Eye, Shield, Zap, Heart, MessageSquare } from 'lucide-react';
import { sound } from '../services/soundService';
import { speech } from '../services/speechService';

export interface StoryCutsceneStageProps {
  protagonist: 'ridheya' | 'hemali';
  pageTitle: string;
  biomeName: string;
  sceneSummary?: string;
  characterDialogue?: string;
  characterEmote?: 'curious' | 'excited' | 'investigating' | 'casting_spell' | 'shocked' | 'caring' | 'clever';
  onPlayVoice?: () => void;
  compact?: boolean;
}

export const StoryCutsceneStage: React.FC<StoryCutsceneStageProps> = ({
  protagonist,
  pageTitle,
  biomeName,
  sceneSummary,
  characterDialogue,
  characterEmote = 'excited',
  onPlayVoice,
  compact = false
}) => {
  const isRidheya = protagonist === 'ridheya';
  const [currentEmote, setCurrentEmote] = useState(characterEmote);

  useEffect(() => {
    setCurrentEmote(characterEmote);
  }, [characterEmote]);

  // Determine biome visual styling & theme colors
  const getBiomeVisuals = () => {
    const lower = (biomeName || '').toLowerCase();
    if (lower.includes('zee') || lower.includes('koraal') || lower.includes('strand') || lower.includes('lagune') || lower.includes('tioman')) {
      return {
        bgGradient: 'from-cyan-900 via-teal-800 to-blue-950',
        borderColor: 'border-cyan-400/40',
        glowColor: 'shadow-cyan-500/20',
        accentBg: 'bg-cyan-500/20 text-cyan-200',
        particles: ['🐠', '🫧', '✨', '🌊', '🐚'],
        badgeIcon: '🌊',
        themeLabel: 'Koraalrif & Oceaan'
      };
    }
    if (lower.includes('kristal') || lower.includes('sterren') || lower.includes('astrolabium') || lower.includes('ruimte') || lower.includes('kinabalu')) {
      return {
        bgGradient: 'from-indigo-950 via-purple-900 to-slate-950',
        borderColor: 'border-purple-400/40',
        glowColor: 'shadow-purple-500/20',
        accentBg: 'bg-purple-500/20 text-purple-200',
        particles: ['✨', '💎', '🌌', '⭐', '🔮'],
        badgeIcon: '✨',
        themeLabel: 'Magische Kristalgrotten'
      };
    }
    if (lower.includes('school') || lower.includes('klas') || lower.includes('dagboek') || lower.includes('bibliotheek')) {
      return {
        bgGradient: 'from-amber-950 via-stone-900 to-orange-950',
        borderColor: 'border-amber-400/40',
        glowColor: 'shadow-amber-500/20',
        accentBg: 'bg-amber-500/20 text-amber-200',
        particles: ['📝', '🎒', '⭐', '💡', '📖'],
        badgeIcon: '📓',
        themeLabel: 'Oud Archief & Speurderskamer'
      };
    }
    // Default Borneo Rainforest / Valley
    return {
      bgGradient: 'from-emerald-950 via-teal-900 to-slate-950',
      borderColor: 'border-emerald-400/40',
      glowColor: 'shadow-emerald-500/20',
      accentBg: 'bg-emerald-500/20 text-emerald-200',
      particles: ['🍃', '🦋', '🌿', '✨', '🦜'],
      badgeIcon: '🌿',
      themeLabel: 'Borneo Nevelwoud'
    };
  };

  const visuals = getBiomeVisuals();

  // Emote configurations
  const emoteDetails = {
    curious: {
      bubbleText: isRidheya ? 'Wat zie ik daar door mijn ronde bril?!' : 'Interessant... dit patroon klopt precies met mijn theorie!',
      badge: '🔍 Nieuwsgierig',
      icon: '🔍',
      animation: { y: [0, -4, 0] }
    },
    investigating: {
      bubbleText: isRidheya ? 'Even mijn vergrootglas erbij pakken voor de pootjes...' : 'Tijd om de logica en het signaalwoord te ontleden!',
      badge: '🔎 Speurtocht',
      icon: '🔎',
      animation: { rotate: [-2, 2, -2] }
    },
    excited: {
      bubbleText: isRidheya ? 'Wauw, kijk hoe dapper dit diertje is!' : 'Haha, dit is echt een meesterplan! Precies zoals in mijn dagboek!',
      badge: '✨ Enthousiast',
      icon: '✨',
      animation: { scale: [1, 1.04, 1] }
    },
    casting_spell: {
      bubbleText: isRidheya ? 'Snel de aloë vera wonderzalf aanbrengen!' : 'Saffieren teleportatie-amulet: activeer sterrenfrequentie!',
      badge: '⚡ Magische Actie',
      icon: '⚡',
      animation: { y: [0, -6, 0] }
    },
    shocked: {
      bubbleText: isRidheya ? 'O jee! Pas op voor de scherpe doornstruik!' : 'Wacht eens even... dit stond zéker niet in het lesrooster!',
      badge: '😲 Verrast!',
      icon: '😲',
      animation: { x: [-3, 3, -3] }
    },
    caring: {
      bubbleText: isRidheya ? 'Rustig maar lief vriendje, dokter Ridheya is bij je.' : 'Geen zorgen, we lossen dit raadsel samen op met Raja!',
      badge: '💖 Zorgzaam',
      icon: '💖',
      animation: { scale: [1, 1.02, 1] }
    },
    clever: {
      bubbleText: isRidheya ? 'Aha! Het is een samengesteld woord: wonder + zalf!' : 'Kijk, "desondanks" kondigt een tegenstelling aan!',
      badge: '💡 Briljant Inzicht',
      icon: '💡',
      animation: { y: [0, -3, 0] }
    }
  };

  const currentEmoteInfo = emoteDetails[currentEmote] || emoteDetails.excited;

  const handleSpeakDialogue = () => {
    sound.playPop();
    const textToSpeak = characterDialogue || currentEmoteInfo.bubbleText;
    speech.speak(`${isRidheya ? 'Ridheya' : 'Hemali'} zegt: ${textToSpeak}`);
  };

  return (
    <div className={`relative w-full rounded-3xl overflow-hidden shadow-2xl border-2 ${visuals.borderColor} bg-gradient-to-br ${visuals.bgGradient} text-white p-4 sm:p-5 transition-all`}>
      {/* Floating Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        {visuals.particles.map((p, idx) => (
          <motion.div
            key={idx}
            className="absolute text-xl sm:text-2xl select-none"
            initial={{
              x: `${(idx * 23) % 90}%`,
              y: `${(idx * 37) % 80}%`,
              opacity: 0.2
            }}
            animate={{
              y: [`${(idx * 37) % 80}%`, `${((idx * 37) % 80) - 20}%`, `${(idx * 37) % 80}%`],
              opacity: [0.2, 0.7, 0.2],
              rotate: [0, 15, -15, 0]
            }}
            transition={{
              duration: 4 + (idx % 3),
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            {p}
          </motion.div>
        ))}
      </div>

      {/* Atmospheric Top Bar with Scene Location */}
      <div className="relative z-10 flex items-center justify-between gap-2 mb-3 pb-2 border-b border-white/10 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="bg-amber-400 text-slate-950 font-black text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
            <span>{visuals.badgeIcon}</span>
            <span>Cutscene &amp; Stripboek Scène</span>
          </span>
          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${visuals.accentBg}`}>
            {biomeName || visuals.themeLabel}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-white/70">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-semibold">{isRidheya ? 'Groep 5 • Dierenarts Avontuur' : 'Groep 8 • Cito & Magie Quest'}</span>
        </div>
      </div>

      {/* Main Cutscene Stage: Visual Character Bust & Comic Dialogue Bubble */}
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-4 sm:gap-6">
        
        {/* Character Avatar Bust Container with Live Glow */}
        <motion.div
          className="relative flex-shrink-0 cursor-pointer group"
          onClick={() => {
            sound.playPop();
            const nextEmotes: (keyof typeof emoteDetails)[] = ['excited', 'investigating', 'clever', 'curious', 'casting_spell', 'caring', 'shocked'];
            const curIdx = nextEmotes.indexOf(currentEmote);
            setCurrentEmote(nextEmotes[(curIdx + 1) % nextEmotes.length]);
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="Klik op het karakter om haar emotie en reactie te veranderen!"
        >
          {/* Glowing Ring Frame */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-amber-400 via-emerald-400 to-cyan-400 p-1 shadow-lg shadow-black/40">
            <div className="w-full h-full rounded-[22px] bg-slate-900/90 border border-white/20 flex items-center justify-center relative overflow-hidden backdrop-blur-md">
              
              {/* Character Illustration Portrait */}
              <div className="text-4xl sm:text-5xl select-none">
                {isRidheya ? '🩺' : '✨'}
              </div>

              {/* Character Badge Overlay */}
              <div className="absolute bottom-0 inset-x-0 bg-slate-950/80 backdrop-blur-xs text-center py-0.5 text-[9px] sm:text-[10px] font-black text-amber-300 uppercase tracking-tight">
                {isRidheya ? 'Ridheya 👓' : 'Hemali 📖'}
              </div>
            </div>
          </div>

          {/* Interactive Emote Badge */}
          <motion.div
            className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full shadow-md flex items-center gap-1 border border-white/40"
            animate={currentEmoteInfo.animation}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span>{currentEmoteInfo.icon}</span>
            <span className="hidden sm:inline">{currentEmote}</span>
          </motion.div>
        </motion.div>

        {/* Comic Strip Dialogue Bubble & Story Lead-in */}
        <div className="flex-1 w-full bg-white/10 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 border border-white/15 shadow-inner relative">
          
          {/* Comic Pointer Triangle (for desktop view) */}
          <div className="hidden md:block absolute -left-2 top-6 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-white/15" />

          <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="font-black text-sm sm:text-base text-amber-300 tracking-tight flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-amber-400" />
                {isRidheya ? 'Ridheya (De Speurende Dierenarts)' : 'Hemali (De Schrandere Magiër)'}:
              </span>
              <span className="text-[10px] bg-white/20 text-white font-bold px-2 py-0.5 rounded-md">
                {currentEmoteInfo.badge}
              </span>
            </div>

            <button
              onClick={handleSpeakDialogue}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black px-2.5 py-1 rounded-xl shadow-sm flex items-center gap-1 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
              title="Luister naar het gesproken personage"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Stem</span>
            </button>
          </div>

          {/* Dialogue Quote in Comic Style */}
          <blockquote className="text-xs sm:text-sm font-medium text-white/95 leading-relaxed italic border-l-2 border-amber-400/80 pl-2.5 py-0.5">
            "{characterDialogue || currentEmoteInfo.bubbleText}"
          </blockquote>

          {/* Quick Scene Context Hint */}
          {sceneSummary && (
            <p className="mt-2 text-[11px] sm:text-xs text-white/70 flex items-center gap-1.5 font-sans not-italic">
              <Lightbulb className="w-3.5 h-3.5 text-amber-300 flex-shrink-0" />
              <span>{sceneSummary}</span>
            </p>
          )}
        </div>

      </div>
    </div>
  );
};
