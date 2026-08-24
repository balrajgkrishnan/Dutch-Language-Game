import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, BookOpen, Sparkles, X, Puzzle, ArrowRight, Lightbulb } from 'lucide-react';
import { DictionaryEntry } from '../data/dutchDictionaryData';
import { sound } from '../services/soundService';

interface DutchDictionaryTooltipProps {
  entry: DictionaryEntry | null;
  position: { x: number; y: number } | null;
  onClose: () => void;
  onSelectWord?: (word: string) => void;
  isPinned?: boolean;
}

export const DutchDictionaryTooltip: React.FC<DutchDictionaryTooltipProps> = ({
  entry,
  position,
  onClose,
  onSelectWord,
  isPinned = false
}) => {
  if (!entry || !position) return null;

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.speakDutch(`${entry.word}. ${entry.meaningNl}`);
  };

  // Calculate smart positioning within viewport
  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;
  const tooltipWidth = 340;
  
  let left = position.x - tooltipWidth / 2;
  if (left < 12) left = 12;
  if (left + tooltipWidth > viewportWidth - 12) {
    left = viewportWidth - tooltipWidth - 12;
  }

  // Determine top/bottom position
  const top = position.y - 8; // Tooltip sits above the word or below if near top
  const isNearTop = position.y < 240;

  return (
    <AnimatePresence>
      <div
        id="dutch-dictionary-tooltip-container"
        className="fixed z-50 pointer-events-auto"
        style={{
          left: `${left}px`,
          top: isNearTop ? `${position.y + 24}px` : `${top}px`,
          transform: isNearTop ? 'none' : 'translateY(-100%)'
        }}
        onClick={(e) => e.stopPropagation()}
        onMouseEnter={(e) => e.stopPropagation()}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: isNearTop ? -6 : 6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.15 }}
          className="w-[340px] max-w-[calc(100vw-24px)] bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl border-2 border-amber-300 ring-4 ring-amber-400/20 text-slate-800"
        >
          {/* Header Row */}
          <div className="flex items-start justify-between gap-2 border-b border-amber-100 pb-2 mb-2.5">
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-base font-black text-slate-900 capitalize">
                  {entry.word}
                </span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300">
                  {entry.wordType}
                </span>
              </div>

              {/* Syllable Breakdown (Klankgroepen) */}
              {entry.syllables && entry.syllables.length > 0 && (
                <div className="flex items-center gap-1 mt-1 text-[11px] font-bold text-amber-800">
                  <span className="text-[10px] text-slate-400 uppercase">Klankgroepen:</span>
                  <span className="bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/70 tracking-wide font-mono font-bold text-amber-900">
                    {entry.syllables.join(' • ')}
                  </span>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                onClick={handleSpeak}
                className="p-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white cursor-pointer transition-all shadow-xs active:scale-95 flex items-center gap-1 text-[11px] font-bold"
                title="Spreek woord en uitleg uit"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
              
              <button
                onClick={onClose}
                className="p-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 cursor-pointer transition-colors"
                title="Sluit woordenhulp"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Root Lemma Badge (If Applicable) */}
          {entry.lemma && entry.lemma !== entry.word && (
            <div className="mb-2 px-2.5 py-1 rounded-xl bg-indigo-50/80 border border-indigo-200 text-indigo-950 text-xs flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="font-bold text-indigo-700">Grondwoord:</span>
                <span className="font-black text-indigo-900">{entry.lemma}</span>
              </div>
              {onSelectWord && (
                <button
                  onClick={() => onSelectWord(entry.lemma!)}
                  className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 hover:underline flex items-center gap-0.5 cursor-pointer"
                >
                  Bekijk <ArrowRight className="w-2.5 h-2.5" />
                </button>
              )}
            </div>
          )}

          {/* Compound Breakdown (If Applicable) */}
          {entry.compound && (
            <div className="mb-2 px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-emerald-950 text-xs flex items-center gap-1.5">
              <Puzzle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span className="font-bold">Samenstelling:</span>
              <span className="font-mono bg-white px-1.5 py-0.5 rounded border border-emerald-300 font-black text-emerald-800">
                {entry.compound}
              </span>
            </div>
          )}

          {/* Cito Category Badge (If Present) */}
          {entry.citoCategory && (
            <div className="mb-2 flex items-center gap-1 text-[10px] font-black uppercase text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200 w-fit">
              <Sparkles className="w-3 h-3 text-indigo-500" />
              <span>{entry.citoCategory}</span>
            </div>
          )}

          {/* Meaning (Dutch Definition) */}
          <div className="text-xs font-semibold leading-relaxed text-slate-700 mb-2">
            <span className="font-bold text-amber-900 block mb-0.5">📖 Betekenis:</span>
            <p className="bg-amber-50/70 p-2 rounded-xl border border-amber-200/80 shadow-2xs text-slate-800">
              {entry.meaningNl}
            </p>
          </div>

          {/* English Translation */}
          <div className="text-xs text-slate-600 mb-2 flex items-baseline gap-1.5 flex-wrap">
            <span className="font-bold text-slate-900 flex-shrink-0">🇬🇧 Engels:</span>
            <span className="font-bold text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200 text-xs italic">
              {entry.translationEn}
            </span>
          </div>

          {/* Natural Example Sentence */}
          {entry.exampleNl && (
            <div className="text-[11px] bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-700 italic mb-2">
              <span className="font-bold not-italic text-slate-800 block mb-0.5">🌟 Voorbeeld in een zin:</span>
              "{entry.exampleNl}"
            </div>
          )}

          {/* Semantically Related Words & Synonyms Only */}
          {entry.synonyms && entry.synonyms.length > 0 && (
            <div className="mb-2 p-2 rounded-xl bg-amber-50/60 border border-amber-200/80 text-xs">
              <div className="flex items-center gap-1 text-[10px] font-bold text-amber-900 mb-1">
                <Sparkles className="w-3 h-3 text-amber-600" />
                <span>🔄 Synoniemen & betekenisverwanten:</span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {entry.synonyms.map((s, sIdx) => (
                  <button
                    key={sIdx}
                    onClick={() => onSelectWord && onSelectWord(s)}
                    className="px-2 py-0.5 rounded-lg bg-white hover:bg-amber-100 text-slate-800 border border-amber-300 text-[10px] font-bold cursor-pointer transition-colors shadow-2xs"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Footer Hint */}
          <div className="pt-1.5 border-t border-amber-100 flex items-center justify-between text-[9px] font-bold text-amber-700">
            <span className="flex items-center gap-1">
              <BookOpen className="w-2.5 h-2.5" />
              <span>Woordenboek voor Ridheya & Hemali</span>
            </span>
            {entry.level && <span>{entry.level.split(' ')[0]}</span>}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
