import React from 'react';
import { motion } from 'motion/react';
import { Volume2, BookOpen, Sparkles, Heart } from 'lucide-react';
import { Animal, BiomeType } from '../types';
import { BIOMES } from '../data/biomeData';
import { TessAvatar } from './TessAvatar';
import { sound } from '../services/soundService';

interface StoryDialogueCardProps {
  biome: BiomeType;
  animal: Animal;
  chapterTitle?: string;
  storyText: string;
  passage?: string;
  onPetAnimal?: () => void;
}

export const StoryDialogueCard: React.FC<StoryDialogueCardProps> = ({
  biome,
  animal,
  chapterTitle,
  storyText,
  passage,
  onPetAnimal
}) => {
  const currentBiome = BIOMES.find(b => b.id === biome) || BIOMES[0];

  const handleReadStory = () => {
    const textToRead = passage
      ? `${passage}. ${storyText}`
      : `Boerin Tess zegt: ${storyText}. Weetje: ${animal.funFact}`;
    sound.speakDutch(textToRead);
  };

  return (
    <div className="w-full bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 shadow-xl shadow-emerald-950/5 border border-emerald-100 relative overflow-hidden">
      {/* Decorative Biome Ambient Glow */}
      <div
        className="absolute -top-12 -right-12 w-36 h-36 rounded-full blur-2xl opacity-20 pointer-events-none"
        style={{ backgroundColor: currentBiome.themeColor }}
      />

      {/* Top Header Badge */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="text-[11px] font-black uppercase px-3 py-1 rounded-full text-white shadow-xs flex items-center gap-1"
            style={{ backgroundColor: currentBiome.accentColor }}
          >
            <span>{currentBiome.emoji}</span>
            <span>{currentBiome.name}</span>
          </span>

          {chapterTitle && (
            <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
              {chapterTitle}
            </span>
          )}
        </div>

        <button
          onClick={handleReadStory}
          className="flex items-center gap-1 text-xs font-black text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1 rounded-full cursor-pointer transition-all shadow-xs active:scale-95"
          title="Lees verhaal voor"
        >
          <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Lees Voor</span>
        </button>
      </div>

      {/* Main Story Content with Boerin Tess & Animal */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        
        {/* Characters Visual Group */}
        <div className="flex items-center gap-2 flex-shrink-0 self-center sm:self-auto">
          {/* Tess Avatar */}
          <div className="flex flex-col items-center">
            <TessAvatar mood="cheering" size="md" />
            <span className="text-[10px] font-black text-emerald-800 uppercase mt-1">Boerin Tess</span>
          </div>

          <span className="text-slate-300 font-bold">❤️</span>

          {/* Target Animal */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 4 }}
            whileTap={{ scale: 0.95 }}
            onClick={onPetAnimal}
            className="flex flex-col items-center cursor-pointer group"
            title="Klik om te aaien!"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 border-2 border-amber-300 flex items-center justify-center text-3xl shadow-sm group-hover:shadow-md transition-all">
              <span className="select-none filter drop-shadow-xs">{animal.emoji}</span>
            </div>
            <span className="text-[10px] font-black text-amber-800 uppercase mt-1 flex items-center gap-0.5">
              <span>{animal.name.split(' ')[0]}</span>
              <Sparkles className="w-2.5 h-2.5 text-amber-500" />
            </span>
          </motion.div>
        </div>

        {/* Speech Bubble / Dialogue */}
        <div className="flex-1 bg-amber-50/70 border border-amber-200/80 rounded-2xl p-3.5 sm:p-4 text-slate-800 relative">
          {/* Dialogue text */}
          <p className="text-xs sm:text-sm font-semibold leading-relaxed text-slate-700">
            <span className="font-black text-emerald-800">"</span>
            {storyText}
            <span className="font-black text-emerald-800">"</span>
          </p>

          {/* Fun Fact snippet */}
          <div className="mt-2.5 pt-2 border-t border-amber-200/60 flex items-start gap-1.5 text-[11px] text-amber-900 font-medium">
            <span className="text-amber-600 font-bold flex-shrink-0">💡 Wist je dat:</span>
            <span>{animal.funFact}</span>
          </div>
        </div>
      </div>

      {/* Reading Comprehension Passage (If Present) */}
      {passage && (
        <div className="mt-4 bg-emerald-50/70 border-2 border-emerald-200 rounded-2xl p-4 text-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>Safari & Boerderij Verhaaltje:</span>
            </span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
              Begrijpend Lezen 📖
            </span>
          </div>
          <p className="text-xs sm:text-sm font-medium leading-relaxed text-slate-700 italic bg-white/60 p-3 rounded-xl border border-emerald-100">
            "{passage}"
          </p>
        </div>
      )}
    </div>
  );
};
