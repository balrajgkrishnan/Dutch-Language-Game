import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Volume2, Lightbulb, Compass, Eye, Shield, Zap, Heart, 
  MessageSquare, Footprints, Wand2, Search, Trophy, CheckCircle2 
} from 'lucide-react';
import { sound } from '../services/soundService';
import { speech } from '../services/speechService';
import confetti from 'canvas-confetti';

export interface StoryCutsceneStageProps {
  protagonist: 'ridheya' | 'hemali';
  pageTitle: string;
  biomeName: string;
  sceneSummary?: string;
  characterDialogue?: string;
  characterEmote?: 'curious' | 'excited' | 'investigating' | 'casting_spell' | 'shocked' | 'caring' | 'clever' | 'triumphant';
  pageNumber?: number;
  totalPages?: number;
  onPlayVoice?: () => void;
  onAdvancePage?: () => void;
  compact?: boolean;
}

interface SceneryDiscoverable {
  id: string;
  emoji: string;
  name: string;
  xPercent: number;
  yPercent: number;
  loreFact: string;
  rewardType: 'xp' | 'coins' | 'clue';
}

export const StoryCutsceneStage: React.FC<StoryCutsceneStageProps> = ({
  protagonist,
  pageTitle,
  biomeName,
  sceneSummary,
  characterDialogue,
  characterEmote = 'excited',
  pageNumber = 1,
  totalPages = 12,
  onPlayVoice,
  onAdvancePage,
  compact = false
}) => {
  const isRidheya = protagonist === 'ridheya';
  const [currentEmote, setCurrentEmote] = useState(characterEmote);
  const [characterAction, setCharacterAction] = useState<'idle' | 'walking' | 'casting' | 'investigating' | 'jumping'>('idle');
  const [characterPositionX, setCharacterPositionX] = useState<number>(20 + ((pageNumber - 1) % 4) * 15);
  const [discoveredItems, setDiscoveredItems] = useState<Record<string, boolean>>({});
  const [activeLoreToast, setActiveLoreToast] = useState<{ title: string; desc: string; emoji: string } | null>(null);

  // Sync emote when props change
  useEffect(() => {
    setCurrentEmote(characterEmote);
    // Trigger walking transition when page updates
    setCharacterAction('walking');
    sound.playFootsteps();
    const newX = 20 + ((pageNumber - 1) % 4) * 18;
    setCharacterPositionX(newX);
    const timer = setTimeout(() => {
      setCharacterAction('idle');
    }, 900);
    return () => clearTimeout(timer);
  }, [characterEmote, pageNumber]);

  // Determine biome visual theme & landscape elements
  const getBiomeVisuals = () => {
    const lower = (biomeName || '').toLowerCase();
    if (lower.includes('zee') || lower.includes('koraal') || lower.includes('strand') || lower.includes('lagune') || lower.includes('tioman')) {
      return {
        bgGradient: 'from-cyan-900 via-teal-850 to-blue-950',
        platformGradient: 'from-teal-700 via-cyan-800 to-slate-900',
        borderColor: 'border-cyan-400/50',
        glowColor: 'shadow-cyan-500/30',
        accentBg: 'bg-cyan-500/20 text-cyan-200 border-cyan-400/30',
        particles: ['🐠', '🫧', '✨', '🌊', '🐚', '🪸'],
        sceneryObjects: ['🪸', '🐚', '🫧', '🌴', '⛵'],
        badgeIcon: '🌊',
        themeLabel: 'Tioman Koraalrif & Oceaan',
        discoverables: [
          { id: 'disc_1', emoji: '🐚', name: 'Zeeschelp met Magische Inscriptie', xPercent: 35, yPercent: 68, loreFact: 'Kijk! Binnenin staat een samengesteld woord: zee + schelp!', rewardType: 'clue' },
          { id: 'disc_2', emoji: '🪸', name: 'Lichtgevend Koraal', xPercent: 65, yPercent: 62, loreFact: 'Dit zeldzame koraal zuivert het zeewater voor de zeeschildpadden.', rewardType: 'xp' },
          { id: 'disc_3', emoji: '💎', name: 'Aquamarijn Kristal', xPercent: 82, yPercent: 70, loreFact: 'Een glanzend zeekristal dat oplicht bij juiste antwoorden!', rewardType: 'coins' }
        ] as SceneryDiscoverable[]
      };
    }
    if (lower.includes('kristal') || lower.includes('sterren') || lower.includes('astrolabium') || lower.includes('ruimte') || lower.includes('kinabalu')) {
      return {
        bgGradient: 'from-indigo-950 via-purple-900 to-slate-950',
        platformGradient: 'from-purple-800 via-indigo-900 to-slate-900',
        borderColor: 'border-purple-400/50',
        glowColor: 'shadow-purple-500/30',
        accentBg: 'bg-purple-500/20 text-purple-200 border-purple-400/30',
        particles: ['✨', '💎', '🌌', '⭐', '🔮', '🪐'],
        sceneryObjects: ['💎', '🔮', '🌌', '🏛️', '⭐'],
        badgeIcon: '✨',
        themeLabel: 'Kinabalu Kristalgrotten & Observatorium',
        discoverables: [
          { id: 'disc_1', emoji: '💎', name: 'Saffieren Sterrenkristal', xPercent: 32, yPercent: 66, loreFact: 'Hemali ontdekt een magisch signaalwoord dat oplicht: "desondanks"!', rewardType: 'clue' },
          { id: 'disc_2', emoji: '📜', name: 'Astronomen Perkament', xPercent: 68, yPercent: 64, loreFact: 'Eeuwenoude Cito logica en sterrenkaarten van de Tijdwachters.', rewardType: 'xp' },
          { id: 'disc_3', emoji: '🧭', name: 'Gouden Astrolabium Wijzer', xPercent: 84, yPercent: 72, loreFact: 'Een tandwiel van het verloren astrolabium!', rewardType: 'coins' }
        ] as SceneryDiscoverable[]
      };
    }
    if (lower.includes('school') || lower.includes('klas') || lower.includes('dagboek') || lower.includes('bibliotheek') || lower.includes('archief')) {
      return {
        bgGradient: 'from-amber-950 via-stone-900 to-orange-950',
        platformGradient: 'from-amber-800 via-stone-800 to-slate-900',
        borderColor: 'border-amber-400/50',
        glowColor: 'shadow-amber-500/30',
        accentBg: 'bg-amber-500/20 text-amber-200 border-amber-400/30',
        particles: ['📝', '🎒', '⭐', '💡', '📖', '📜'],
        sceneryObjects: ['📚', '🕯️', '⌛', '🏛️', '🏮'],
        badgeIcon: '📓',
        themeLabel: 'Oud Archief & Bibliotheek van Tijd',
        discoverables: [
          { id: 'disc_1', emoji: '📖', name: 'Toverwoordenboek', xPercent: 30, yPercent: 65, loreFact: 'Elke pagina bevat werkwoordregels en synoniemen voor Cito!', rewardType: 'clue' },
          { id: 'disc_2', emoji: '🕯️', name: 'Eeuwige Wijsheidskaars', xPercent: 64, yPercent: 63, loreFact: 'Verlicht moeilijke verwijswoorden in historische teksten.', rewardType: 'xp' },
          { id: 'disc_3', emoji: '🗝️', name: 'Sleutel van het Archief', xPercent: 80, yPercent: 70, loreFact: 'Ontgrendelt geheime bonusverhalen en quizvragen!', rewardType: 'coins' }
        ] as SceneryDiscoverable[]
      };
    }
    // Default Borneo Rainforest / Valley / Treehouse
    return {
      bgGradient: 'from-emerald-950 via-teal-900 to-slate-950',
      platformGradient: 'from-emerald-800 via-teal-900 to-slate-900',
      borderColor: 'border-emerald-400/50',
      glowColor: 'shadow-emerald-500/30',
      accentBg: 'bg-emerald-500/20 text-emerald-200 border-emerald-400/30',
      particles: ['🍃', '🦋', '🌿', '✨', '🦜', '🌸'],
      sceneryObjects: ['🌳', '🎋', '🌺', '🏡', '🏕️'],
      badgeIcon: '🌿',
      themeLabel: 'Borneo Dierenvallei & Boomhutkliniek 🇲🇾',
      discoverables: [
        { id: 'disc_1', emoji: '🌿', name: 'Aloë Vera Wonderplant', xPercent: 30, yPercent: 66, loreFact: 'Geneeskrachtig sap waarmee Ridheya verzachtende wonderzalf maakt!', rewardType: 'clue' },
        { id: 'disc_2', emoji: '🎒', name: 'Rode Dierenartskit', xPercent: 66, yPercent: 64, loreFact: 'Gevuld met stethoscoop, verbandjes en een vergrootglas.', rewardType: 'xp' },
        { id: 'disc_3', emoji: '🐾', name: 'Sporen van Kopi & Pip', xPercent: 82, yPercent: 72, loreFact: 'Kopi spitst zijn oren: "Woef! Dit dierenvriendje is veilig!"', rewardType: 'coins' }
      ] as SceneryDiscoverable[]
    };
  };

  const visuals = getBiomeVisuals();

  // Emote configurations
  const emoteDetails = {
    curious: {
      bubbleText: isRidheya ? 'Wat zie ik daar door mijn ronde bril?! Een nieuw dierenspoor!' : 'Interessant... dit patroon klopt precies met mijn theorie in mijn tovernotitieboek!',
      badge: '🔍 Nieuwsgierig',
      icon: '🔍',
      animation: { y: [0, -4, 0] }
    },
    investigating: {
      bubbleText: isRidheya ? 'Even mijn vergrootglas erbij pakken voor de veertjes en pootjes...' : 'Tijd om de logica en het signaalwoord haarscherp te ontleden!',
      badge: '🔎 Speurtocht',
      icon: '🔎',
      animation: { rotate: [-2, 2, -2] }
    },
    excited: {
      bubbleText: isRidheya ? 'Wauw, kijk hoe dapper dit diertje is! Kopi kwispelt er vrolijk van!' : 'Haha, dit is echt een meesterplan! Precies zoals de Tijdwachters voorspelden!',
      badge: '✨ Enthousiast',
      icon: '✨',
      animation: { scale: [1, 1.04, 1] }
    },
    casting_spell: {
      bubbleText: isRidheya ? 'Snel de zachte wonderzalf en het verband aanbrengen!' : 'Saffieren teleportatie-amulet: activeer sterrenfrequentie en verlicht het pad!',
      badge: '⚡ Magische Actie',
      icon: '⚡',
      animation: { y: [0, -8, 0] }
    },
    shocked: {
      bubbleText: isRidheya ? 'O jee! Pas op voor de scherpe doornstruik langs het pad!' : 'Wacht eens even... deze wending stond zéker niet in het lesrooster!',
      badge: '😲 Verrast!',
      icon: '😲',
      animation: { x: [-4, 4, -4] }
    },
    caring: {
      bubbleText: isRidheya ? 'Rustig maar lief vriendje, dokter Ridheya is bij je om je te helpen.' : 'Geen zorgen, we lossen dit raadsel samen op met het hele team!',
      badge: '💖 Zorgzaam',
      icon: '💖',
      animation: { scale: [1, 1.02, 1] }
    },
    clever: {
      bubbleText: isRidheya ? 'Aha! Het is een samengesteld woord: wonder + zalf = wonderzalf!' : 'Kijk, "desondanks" kondigt een tegenstelling aan tussen oorzaak en gevolg!',
      badge: '💡 Briljant Inzicht',
      icon: '💡',
      animation: { y: [0, -3, 0] }
    },
    triumphant: {
      bubbleText: isRidheya ? 'Hoera! Het diertje is genezen en huppelt weer vrolijk rond!' : 'Yes! Het Cito mysterie is gekraakt en de poort staat wijd open!',
      badge: '🏆 Zegevierend!',
      icon: '🏆',
      animation: { scale: [1, 1.1, 1] }
    }
  };

  const currentEmoteInfo = emoteDetails[currentEmote] || emoteDetails.excited;

  const handleSpeakDialogue = () => {
    sound.playPop();
    const textToSpeak = characterDialogue || currentEmoteInfo.bubbleText;
    speech.speak(`${isRidheya ? 'Ridheya' : 'Hemali'} zegt: ${textToSpeak}`);
  };

  const handleTriggerAction = (act: 'walking' | 'casting' | 'investigating' | 'jumping') => {
    sound.playPop();
    setCharacterAction(act);
    if (act === 'walking') {
      sound.playFootsteps();
      setCharacterPositionX(prev => (prev > 70 ? 20 : prev + 12));
    } else if (act === 'casting') {
      sound.playStar();
      setCurrentEmote('casting_spell');
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
    } else if (act === 'investigating') {
      sound.playMysteryChime();
      setCurrentEmote('investigating');
    } else if (act === 'jumping') {
      sound.playCorrect();
      setCurrentEmote('excited');
    }
    setTimeout(() => {
      setCharacterAction('idle');
    }, 1200);
  };

  const handleDiscoverItem = (disc: SceneryDiscoverable) => {
    sound.playDiscoverySparkle();
    setDiscoveredItems(prev => ({ ...prev, [disc.id]: true }));
    setCharacterPositionX(disc.xPercent - 6);
    setCharacterAction('investigating');
    setCurrentEmote('clever');
    
    setActiveLoreToast({
      title: disc.name,
      desc: disc.loreFact,
      emoji: disc.emoji
    });

    confetti({ particleCount: 25, spread: 45 });

    setTimeout(() => {
      setCharacterAction('idle');
    }, 1000);
  };

  return (
    <div className={`relative w-full rounded-3xl overflow-hidden shadow-2xl border-3 ${visuals.borderColor} bg-gradient-to-br ${visuals.bgGradient} text-white p-3.5 sm:p-5 transition-all select-none`}>
      
      {/* Top Retro Location Bar & Stepping Trail */}
      <div className="relative z-10 flex items-center justify-between gap-2 mb-2 pb-2 border-b border-white/10 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="bg-amber-400 text-slate-950 font-black text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
            <span>{visuals.badgeIcon}</span>
            <span>RPG Cutscene Arena</span>
          </span>
          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${visuals.accentBg}`}>
            {biomeName || visuals.themeLabel}
          </span>
        </div>

        {/* Step checkpoints mini trail */}
        <div className="flex items-center gap-1.5 text-xs bg-slate-950/60 px-3 py-1 rounded-xl border border-white/10">
          <Footprints className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-mono text-amber-300 font-black">
            Hoofdstuk {pageNumber}/{totalPages}
          </span>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 3D PARALLAX ADVENTURE STAGE (WITH LIVE WALKING SPRITES & OBJECTS)   */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div className="relative h-44 sm:h-56 w-full rounded-2xl overflow-hidden bg-slate-950/60 border border-white/10 shadow-inner flex flex-col justify-end p-3 my-2">
        
        {/* Floating Animated Environmental Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {visuals.particles.map((p, idx) => (
            <motion.div
              key={idx}
              className="absolute text-lg sm:text-2xl opacity-60"
              initial={{
                x: `${(idx * 22) % 90}%`,
                y: `${(idx * 31) % 75}%`
              }}
              animate={{
                y: [`${(idx * 31) % 75}%`, `${((idx * 31) % 75) - 25}%`, `${(idx * 31) % 75}%`],
                opacity: [0.3, 0.8, 0.3],
                scale: [0.9, 1.15, 0.9],
                rotate: [0, 15, -15, 0]
              }}
              transition={{
                duration: 3.5 + (idx % 3),
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              {p}
            </motion.div>
          ))}
        </div>

        {/* Background Scenic Landscape Silhouette */}
        <div className="absolute bottom-6 inset-x-0 flex justify-between px-4 opacity-40 pointer-events-none text-3xl sm:text-4xl">
          {visuals.sceneryObjects.map((obj, oIdx) => (
            <span key={oIdx} className="filter drop-shadow-md">{obj}</span>
          ))}
        </div>

        {/* Point & Click Interactive Scenery Discoverables */}
        {visuals.discoverables.map(disc => {
          const isFound = Boolean(discoveredItems[disc.id]);
          return (
            <motion.button
              key={disc.id}
              onClick={() => handleDiscoverItem(disc)}
              className={`absolute p-1.5 rounded-2xl cursor-pointer transition-all z-20 flex flex-col items-center group ${
                isFound
                  ? 'bg-amber-400/20 border border-amber-400/40 text-amber-300'
                  : 'bg-white/15 hover:bg-amber-400/30 border border-white/30 hover:border-amber-400 animate-bounce'
              }`}
              style={{ left: `${disc.xPercent}%`, top: `${disc.yPercent}%` }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              title={`Klik om te onderzoeken: ${disc.name}`}
            >
              <span className="text-xl sm:text-2xl filter drop-shadow-md group-hover:rotate-12 transition-transform">
                {disc.emoji}
              </span>
              <span className="text-[8px] font-black uppercase bg-slate-950/80 px-1 py-0.2 rounded text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                {disc.name.split(' ')[0]}
              </span>
            </motion.button>
          );
        })}

        {/* Active Lore Discovery Banner (Toast) */}
        <AnimatePresence>
          {activeLoreToast && (
            <motion.div
              initial={{ y: -20, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="absolute top-2 inset-x-4 bg-slate-900/95 border-2 border-amber-400 rounded-2xl p-2.5 shadow-2xl z-30 flex items-center justify-between gap-2 text-xs"
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">{activeLoreToast.emoji}</span>
                <div>
                  <div className="font-black text-amber-300 text-[11px]">{activeLoreToast.title}</div>
                  <div className="text-[11px] text-slate-200">{activeLoreToast.desc}</div>
                </div>
              </div>
              <button
                onClick={() => setActiveLoreToast(null)}
                className="text-slate-400 hover:text-white px-2 py-1 font-bold text-xs"
              >
                ✕
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3D Walkway / Platform Path Layer */}
        <div className={`relative w-full h-8 rounded-xl bg-gradient-to-r ${visuals.platformGradient} opacity-90 shadow-2xl border-t border-white/20 flex items-center justify-between px-4 z-10`}>
          <div className="text-[10px] font-black text-emerald-300/80 flex items-center gap-1">
            <span>🐾</span>
            <span>Avonturenpad</span>
          </div>
          <div className="text-[10px] font-bold text-amber-300/90 flex items-center gap-1">
            <span>⭐</span>
            <span>Mijlpaal #{pageNumber}</span>
          </div>
        </div>

        {/* ────────────────────────────────────────────────────────── */}
        {/* ANIMATED PARTY SPRITES (PROTAGONIST & COMPANION MASCOT)    */}
        {/* ────────────────────────────────────────────────────────── */}
        <motion.div
          className="absolute z-20 flex items-end gap-1.5 pointer-events-auto cursor-pointer"
          style={{ bottom: '26px' }}
          animate={{
            left: `${characterPositionX}%`,
            y: characterAction === 'jumping' ? [-15, 0] : [0, -3, 0]
          }}
          transition={{
            left: { duration: 0.8, ease: 'easeInOut' },
            y: { repeat: Infinity, duration: characterAction === 'walking' ? 0.35 : 2, ease: 'easeInOut' }
          }}
          onClick={() => handleTriggerAction('jumping')}
          title="Klik om te springen of te reageren!"
        >
          {/* Protagonist Sprite & Aura */}
          <div className="relative flex flex-col items-center">
            {/* Sparkle Aura when Casting */}
            {characterAction === 'casting' && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1.5, opacity: 0.8 }}
                exit={{ opacity: 0 }}
                className="absolute -top-3 w-12 h-12 rounded-full bg-amber-400/40 blur-md pointer-events-none"
              />
            )}

            {/* Character Avatar */}
            <motion.div
              animate={
                characterAction === 'investigating'
                  ? { rotate: [-5, 5, -5], scale: 1.1 }
                  : characterAction === 'casting'
                  ? { y: [-6, 0], scale: 1.2 }
                  : characterAction === 'walking'
                  ? { rotate: [-8, 8, -8] }
                  : { y: [0, -2, 0] }
              }
              transition={{ repeat: Infinity, duration: 0.5 }}
              className="text-4xl sm:text-5xl filter drop-shadow-[0_8px_8px_rgba(0,0,0,0.8)]"
            >
              {isRidheya ? '🩺' : '✨'}
            </motion.div>

            {/* Character Nameplate */}
            <div className="bg-slate-950/85 text-[9px] font-black text-amber-300 px-1.5 py-0.2 rounded-md border border-white/20 uppercase tracking-tight shadow-md">
              {isRidheya ? 'Ridheya 👓' : 'Hemali 📖'}
            </div>
          </div>

          {/* Companion Mascot Sprite (Kopi 🐶 or Ollie 🦉) */}
          <motion.div
            animate={{
              y: isRidheya ? [0, -4, 0] : [-6, 2, -6],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="text-2xl sm:text-3xl filter drop-shadow-md mb-1"
          >
            {isRidheya ? '🐶' : '🦉'}
          </motion.div>
        </motion.div>

      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* COMIC DIALOGUE BOX & INTERACTIVE HERO ACTIONS                      */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 bg-slate-900/90 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-white/15 shadow-inner space-y-2.5">
        
        {/* Header with Character Name, Emote Badge & Voice Button */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="font-black text-xs sm:text-sm text-amber-300 tracking-tight flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
              {isRidheya ? 'Ridheya (Dierenarts Speurheld)' : 'Hemali (Schrandere Magiër)'}:
            </span>
            <span className="text-[10px] bg-white/20 text-white font-bold px-2 py-0.5 rounded-md">
              {currentEmoteInfo.badge}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleSpeakDialogue}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 text-[11px] font-black px-2.5 py-1 rounded-xl shadow-xs flex items-center gap-1 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
              title="Luister naar het personage"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Stem</span>
            </button>
          </div>
        </div>

        {/* Dynamic Comic Dialogue Line */}
        <blockquote className="text-xs sm:text-sm font-medium text-white/95 leading-relaxed italic border-l-3 border-amber-400/90 pl-3 py-0.5">
          "{characterDialogue || currentEmoteInfo.bubbleText}"
        </blockquote>

        {/* Scene Context Prompt */}
        {sceneSummary && (
          <p className="text-[11px] sm:text-xs text-white/70 flex items-center gap-1.5 font-sans not-italic pt-1 border-t border-white/10">
            <Lightbulb className="w-3.5 h-3.5 text-amber-300 flex-shrink-0" />
            <span>{sceneSummary}</span>
          </p>
        )}

        {/* 4 Interactive In-Stage Action Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
          <button
            onClick={() => handleTriggerAction('walking')}
            className="p-1.5 sm:p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-black text-[11px] flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 border border-slate-700 hover:border-amber-400/50"
          >
            <Footprints className="w-3.5 h-3.5 text-amber-400" />
            <span>Loop Verder 🐾</span>
          </button>

          <button
            onClick={() => handleTriggerAction('investigating')}
            className="p-1.5 sm:p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-black text-[11px] flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 border border-slate-700 hover:border-cyan-400/50"
          >
            <Search className="w-3.5 h-3.5 text-cyan-400" />
            <span>Onderzoek 🔍</span>
          </button>

          <button
            onClick={() => handleTriggerAction('casting')}
            className="p-1.5 sm:p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-black text-[11px] flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 border border-slate-700 hover:border-purple-400/50"
          >
            <Wand2 className="w-3.5 h-3.5 text-purple-400" />
            <span>{isRidheya ? 'Wonderzalf 🌿' : 'Magie ✨'}</span>
          </button>

          <button
            onClick={() => {
              sound.playPop();
              const nextEmotes: (keyof typeof emoteDetails)[] = ['excited', 'investigating', 'clever', 'curious', 'casting_spell', 'caring', 'shocked', 'triumphant'];
              const curIdx = nextEmotes.indexOf(currentEmote);
              setCurrentEmote(nextEmotes[(curIdx + 1) % nextEmotes.length]);
            }}
            className="p-1.5 sm:p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-black text-[11px] flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 border border-slate-700 hover:border-emerald-400/50"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Wissel Reactie 🎭</span>
          </button>
        </div>

      </div>

    </div>
  );
};
