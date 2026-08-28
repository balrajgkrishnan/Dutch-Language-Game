import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { InteractiveDutchText } from './InteractiveDutchText';

interface IllustratedStoryPageProps {
  imageUrl?: string;
  text: string;
  pageNumber: number;
  totalPages: number;
  onPrev?: () => void;
  onNext?: () => void;
  nextLabel?: string;
}

export const IllustratedStoryPage: React.FC<IllustratedStoryPageProps> = ({
  imageUrl,
  text,
  pageNumber,
  totalPages,
  onPrev,
  onNext,
  nextLabel = 'Volgende'
}) => {
  return (
    <div className="rounded-3xl overflow-hidden border border-emerald-100 shadow-xl shadow-emerald-950/5 bg-white">
      <div className="relative aspect-4/3 bg-gradient-to-br from-amber-50 to-emerald-50">
        <AnimatePresence mode="wait">
          <motion.div
            key={pageNumber}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0"
          >
            {imageUrl ? (
              <img src={imageUrl} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-6xl">
                <BookOpen className="w-16 h-16 text-emerald-300" />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
        <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs font-black px-2.5 py-1 rounded-full">
          Pagina {pageNumber}/{totalPages}
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <div className="text-base sm:text-lg font-medium text-slate-800 leading-relaxed">
          <InteractiveDutchText text={text} />
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 p-4 border-t border-slate-100">
        <button
          onClick={onPrev}
          disabled={!onPrev}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed bg-slate-100 hover:bg-slate-200 text-slate-700"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Vorige</span>
        </button>
        <button
          onClick={onNext}
          disabled={!onNext}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-700/20"
        >
          <span>{nextLabel}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
