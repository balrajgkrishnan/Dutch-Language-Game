import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Sparkles, Zap, BookOpen } from 'lucide-react';
import { GradeLevel } from '../types';
import { sound } from '../services/soundService';

interface GradeSwitcherBarProps {
  selectedGrade: GradeLevel;
  onSelectGrade: (grade: GradeLevel) => void;
}

export const GradeSwitcherBar: React.FC<GradeSwitcherBarProps> = ({
  selectedGrade,
  onSelectGrade
}) => {
  return (
    <div id="grade-switcher-bar" className="w-full max-w-5xl mx-auto px-3 sm:px-4 mb-3">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-2.5 sm:p-3.5 shadow-md shadow-emerald-950/5 border border-emerald-100 flex flex-col sm:flex-row items-center justify-between gap-2.5">
        
        {/* Label Left */}
        <div className="flex items-center gap-2 text-slate-700">
          <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-black text-sm">
            <GraduationCap className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-slate-800 block leading-tight">
              Kies Je Leerjaar / Niveau:
            </span>
            <span className="text-[10px] text-slate-500 font-semibold">
              Beide niveaus bevatten alle 7 werelden &amp; 42 dieren!
            </span>
          </div>
        </div>

        {/* Big Toggle Buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Groep 4-5 Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              sound.playPop();
              onSelectGrade('group_4_5');
            }}
            className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all border ${
              selectedGrade === 'group_4_5'
                ? 'bg-emerald-600 text-white border-emerald-700 shadow-md shadow-emerald-600/25 ring-2 ring-emerald-400/40'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <div className="text-left">
              <div className="leading-tight">Groep 4 - 5</div>
              <div className="text-[9px] opacity-85 font-bold normal-case">Basis Spelling & Begrip</div>
            </div>
            {selectedGrade === 'group_4_5' && <span>✨</span>}
          </motion.button>

          {/* Groep 6-7-8 Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              sound.playPop();
              onSelectGrade('group_6_7_8');
            }}
            className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all border ${
              selectedGrade === 'group_6_7_8'
                ? 'bg-amber-500 text-white border-amber-600 shadow-md shadow-amber-500/25 ring-2 ring-amber-400/40'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <div className="text-left">
              <div className="leading-tight">Groep 6 - 7 - 8</div>
              <div className="text-[9px] opacity-85 font-bold normal-case">Werkwoorden & Moeilijke Spelling</div>
            </div>
            {selectedGrade === 'group_6_7_8' && <span>⚡</span>}
          </motion.button>
        </div>
      </div>
    </div>
  );
};
