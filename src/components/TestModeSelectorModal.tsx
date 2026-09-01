import React from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';

interface TestModeSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSpelling: () => void;
  onSelectWerkwoorden: () => void;
}

export const TestModeSelectorModal: React.FC<TestModeSelectorModalProps> = ({
  isOpen,
  onClose,
  onSelectSpelling,
  onSelectWerkwoorden
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
      >
        <div className="bg-gradient-to-r from-slate-700 to-slate-900 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-3xl shadow-inner">📝</div>
            <div>
              <h3 className="text-lg font-black">Toetsweek</h3>
              <p className="text-xs text-slate-300 font-medium">Kies welke toets je wilt maken</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 flex flex-col gap-3">
          <button
            onClick={onSelectSpelling}
            className="w-full text-left bg-violet-50 hover:bg-violet-100 border border-violet-200 rounded-2xl p-4 flex items-center gap-3 cursor-pointer transition-colors"
          >
            <span className="text-3xl">🎯</span>
            <div>
              <p className="font-black text-violet-900">Spelling Toets</p>
              <p className="text-xs text-violet-700 font-medium">Luister naar het woord en typ de ontbrekende klankgroep</p>
            </div>
          </button>

          <button
            onClick={onSelectWerkwoorden}
            className="w-full text-left bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3 cursor-pointer transition-colors"
          >
            <span className="text-3xl">🎯</span>
            <div>
              <p className="font-black text-emerald-900">Werkwoorden Toets</p>
              <p className="text-xs text-emerald-700 font-medium">Kies de juiste verleden tijd, meerkeuze</p>
            </div>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
