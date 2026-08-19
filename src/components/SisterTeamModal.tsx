import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Crown, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  Award, 
  ArrowRight, 
  Heart, 
  Volume2, 
  RotateCcw,
  Star,
  Coins
} from 'lucide-react';
import { PlayerProfile } from '../types';
import { sound } from '../services/soundService';
import { speech } from '../services/speechService';
import confetti from 'canvas-confetti';

interface SisterTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: PlayerProfile;
  onOpenHemaliMission?: () => void;
  onOpenRidheyaMission?: () => void;
}

type TeamStep = 'intro' | 'hemali_clue' | 'ridheya_spelling' | 'shared_celebration';

export const SisterTeamModal: React.FC<SisterTeamModalProps> = ({
  isOpen,
  onClose,
  profile,
  onOpenHemaliMission,
  onOpenRidheyaMission
}) => {
  const [step, setStep] = useState<TeamStep>('intro');
  const [selectedClueOption, setSelectedClueOption] = useState<number | null>(null);
  const [isClueChecked, setIsClueChecked] = useState(false);
  
  // Ridheya's spelling bridge state
  const targetWord = 'SAMENWERKEN';
  const targetLetters = ['S', 'A', 'M', 'E', 'N', 'W', 'E', 'R', 'K', 'E', 'N'];
  const [placedLetters, setPlacedLetters] = useState<string[]>([]);
  const [availableLetters, setAvailableLetters] = useState<{ id: string; letter: string }[]>(() => {
    return targetLetters
      .slice()
      .sort(() => Math.random() - 0.5)
      .map((letter, i) => ({ id: `${letter}-${i}`, letter }));
  });

  if (!isOpen) return null;

  const handleStartCoop = () => {
    sound.playPop();
    setStep('hemali_clue');
    setSelectedClueOption(null);
    setIsClueChecked(false);
  };

  const handleSelectClue = (idx: number) => {
    sound.playPop();
    setSelectedClueOption(idx);
    setIsClueChecked(true);

    if (idx === 1) { // Correct: "Bij de Gouden Savanne Waterpoel"
      sound.playSuccess();
      confetti({ particleCount: 50, spread: 70 });
    } else {
      sound.playWrong();
    }
  };

  const handleAddLetter = (item: { id: string; letter: string }) => {
    sound.playPop();
    setPlacedLetters(prev => [...prev, item.letter]);
    setAvailableLetters(prev => prev.filter(l => l.id !== item.id));
  };

  const handleRemoveLetter = (index: number) => {
    sound.playPop();
    const letter = placedLetters[index];
    setPlacedLetters(prev => prev.filter((_, i) => i !== index));
    setAvailableLetters(prev => [...prev, { id: `${letter}-${Date.now()}`, letter }]);
  };

  const handleCheckSpelling = () => {
    if (placedLetters.join('') === targetWord) {
      sound.playVictory();
      confetti({ particleCount: 150, spread: 100 });
      setStep('shared_celebration');
    } else {
      sound.playWrong();
      speech.speak('Kijk nog even goed naar de letters! Jullie kunnen dit samen!', { rate: 0.85 });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/65 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-3xl w-full max-w-3xl shadow-2xl border-2 border-amber-200 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-emerald-600 p-4 sm:p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-3xl shadow-inner">
              👑
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black">Zussen Co-Op: Hemali &amp; Ridheya</h3>
                <span className="text-[10px] bg-white/20 font-black px-2 py-0.5 rounded-full uppercase">
                  Samen Spelen
                </span>
              </div>
              <p className="text-xs text-amber-100 font-medium">
                Samen raadsels oplossen, zussenkracht bundelen en gouden beloningen winnen!
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              speech.stop();
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Co-Op Flow Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5">
          
          {/* STEP 1: INTRO VIEW */}
          {step === 'intro' && (
            <div className="space-y-5">
              {/* Sisters Banner */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="bg-indigo-50/80 p-4 rounded-2xl border-2 border-indigo-200 flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-200 flex items-center justify-center text-3xl">
                    👧
                  </div>
                  <div>
                    <h5 className="text-sm font-black text-indigo-950">Hemali (Groep 8)</h5>
                    <span className="text-[11px] text-indigo-700 font-semibold">Onderzoeker &amp; Reporter</span>
                    <p className="text-[11px] text-slate-500 mt-0.5">Leest de geheime safaricode &amp; geeft hints!</p>
                  </div>
                </div>

                <div className="bg-amber-50/80 p-4 rounded-2xl border-2 border-amber-200 flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-amber-200 flex items-center justify-center text-3xl">
                    👩‍🌾
                  </div>
                  <div>
                    <h5 className="text-sm font-black text-amber-950">Ridheya (Groep 5)</h5>
                    <span className="text-[11px] text-amber-700 font-semibold">Dierenarts &amp; Woordheld</span>
                    <p className="text-[11px] text-slate-500 mt-0.5">Spelt de toversleutel om de poort te openen!</p>
                  </div>
                </div>
              </div>

              {/* Quest Mission Card */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-5 rounded-3xl border border-amber-200 text-center space-y-2">
                <span className="text-3xl">🦁 ✨ 🗝️</span>
                <h4 className="text-base sm:text-lg font-black text-slate-800">
                  Missie: Het Gouden Leeuwenheiligdom Ontgrendelen
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto font-medium leading-relaxed">
                  De oude gouden poort van het Safaripark zit op slot. Alleen als Hemali het raadsel ontcijfert en Ridheya het toverwoord spelt, opent de poort zich!
                </p>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleStartCoop}
                  className="px-8 py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-600 hover:from-amber-400 hover:to-emerald-500 text-white rounded-2xl text-sm sm:text-base font-black shadow-lg shadow-amber-500/20 cursor-pointer flex items-center gap-2 transform transition-transform hover:scale-105 active:scale-95"
                >
                  <Sparkles className="w-5 h-5 text-amber-200" />
                  <span>Start Zussen Co-Op Avontuur! ➔</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: HEMALI'S DETECTIVE CLUE */}
          {step === 'hemali_clue' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">👧</span>
                  <div>
                    <h4 className="text-sm sm:text-base font-black text-indigo-950">
                      Stap 1: Hemali’s Speurders Hint
                    </h4>
                    <p className="text-xs text-slate-500">Hemali leest de aanwijzing voor aan Ridheya.</p>
                  </div>
                </div>

                <button
                  onClick={() => speech.speak('Geheim verslag: De leeuwenfamilie heeft dorst na een lange tocht over de zandheuvels. Waar gaan ze allemaal heen?', { rate: 0.9 })}
                  className="px-3 py-1.5 rounded-xl bg-indigo-100 hover:bg-indigo-200 text-indigo-900 font-bold text-xs flex items-center gap-1 cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>🔊 Luister</span>
                </button>
              </div>

              <div className="bg-indigo-50/90 p-4 sm:p-5 rounded-2xl border-2 border-indigo-200 text-slate-800 text-sm sm:text-base font-medium leading-relaxed">
                🔍 <strong>Hemali’s Notitieboek:</strong> &quot;De leeuwenfamilie heeft enorme dorst na een lange tocht over de warme zandheuvels. Waar moeten we de gouden sleutel zoeken?&quot;
              </div>

              <div className="space-y-2">
                <span className="text-xs font-black text-slate-600 block">Kies de juiste locatie:</span>
                {[
                  'Bovenin de kille sneeuwberg',
                  'Bij de koele Gouden Savanne Waterpoel 💧',
                  'In de diepe oceaan'
                ].map((opt, idx) => {
                  const isSelected = selectedClueOption === idx;
                  const isCorrect = idx === 1;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectClue(idx)}
                      className={`w-full p-3.5 rounded-2xl border-2 font-black text-xs sm:text-sm text-left transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? isCorrect
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-300'
                            : 'bg-rose-50 border-rose-400 text-rose-950'
                          : 'bg-white border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span>{opt}</span>
                      {isSelected && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                    </button>
                  );
                })}
              </div>

              {isClueChecked && selectedClueOption === 1 && (
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => {
                      sound.playPop();
                      setStep('ridheya_spelling');
                    }}
                    className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 text-white rounded-xl text-xs sm:text-sm font-black shadow-md cursor-pointer flex items-center gap-2"
                  >
                    <span>Naar Ridheya’s Toverwoord ➔</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: RIDHEYA'S SPELLING BRIDGE */}
          {step === 'ridheya_spelling' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">👩‍🌾</span>
                  <div>
                    <h4 className="text-sm sm:text-base font-black text-amber-950">
                      Stap 2: Ridheya’s Gouden Woordsleutel
                    </h4>
                    <p className="text-xs text-slate-500">Spel het magische woord: SAMENWERKEN</p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50/80 p-3.5 rounded-2xl border border-amber-200 text-xs sm:text-sm font-medium text-amber-950 text-center">
                ✨ <strong>Hint van Hemali:</strong> Als zussen doen jullie alles samen! Spel het woord: <strong>SAMENWERKEN</strong>.
              </div>

              {/* Target Placed Letters */}
              <div className="bg-slate-100 p-3.5 rounded-3xl border-2 border-slate-200 flex items-center justify-center gap-1.5 flex-wrap min-h-[64px]">
                {placedLetters.length === 0 ? (
                  <span className="text-xs font-bold text-slate-400">
                    Klik op de letters hieronder om het woord te spellen...
                  </span>
                ) : (
                  placedLetters.map((letter, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleRemoveLetter(idx)}
                      className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-amber-400 text-slate-950 font-black text-lg shadow-sm flex items-center justify-center cursor-pointer border-2 border-amber-500"
                    >
                      {letter}
                    </motion.button>
                  ))
                )}
              </div>

              {/* Available Scrambled Letters Pool */}
              <div className="flex items-center justify-center gap-2 flex-wrap pt-1">
                {availableLetters.map((item) => (
                  <motion.button
                    key={item.id}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => handleAddLetter(item)}
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white hover:bg-amber-50 text-slate-800 hover:text-amber-950 font-black text-lg shadow-xs border-2 border-slate-300 hover:border-amber-400 flex items-center justify-center cursor-pointer"
                  >
                    {item.letter}
                  </motion.button>
                ))}
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={() => {
                    const shuffled = targetLetters
                      .slice()
                      .sort(() => Math.random() - 0.5)
                      .map((letter, i) => ({ id: `${letter}-${i}-${Math.random()}`, letter }));
                    setAvailableLetters(shuffled);
                    setPlacedLetters([]);
                    sound.playPop();
                  }}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-black cursor-pointer flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Opnieuw</span>
                </button>

                <button
                  onClick={handleCheckSpelling}
                  disabled={placedLetters.length === 0}
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white rounded-xl text-xs sm:text-sm font-black shadow-md cursor-pointer flex items-center gap-2 disabled:opacity-50"
                >
                  <Crown className="w-4 h-4 text-amber-300" />
                  <span>Ontgrendel Gouden Poort! ✨</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: SHARED CELEBRATION */}
          {step === 'shared_celebration' && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-4 text-center space-y-4"
            >
              <div className="text-6xl animate-bounce">👑 🦁 💖</div>

              <div className="space-y-1">
                <h4 className="text-xl sm:text-2xl font-black text-amber-950">
                  Gefeliciteerd Hemali &amp; Ridheya!
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto font-medium">
                  Jullie hebben als echt zussenteam het Gouden Leeuwenheiligdom geopend!
                </p>
              </div>

              {/* Shared Reward Box */}
              <div className="bg-gradient-to-r from-amber-100 via-yellow-100 to-emerald-100 p-4 rounded-2xl border-2 border-amber-300 inline-flex items-center gap-6 shadow-sm">
                <div className="flex items-center gap-1.5 text-amber-900 font-black text-sm">
                  <Star className="w-4 h-4 text-amber-600 fill-amber-500" />
                  <span>+100 Zussen-Sterren</span>
                </div>
                <div className="flex items-center gap-1.5 text-amber-900 font-black text-sm">
                  <Coins className="w-4 h-4 text-amber-600" />
                  <span>+50 Munten Elk</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-950 font-black text-sm">
                  <Crown className="w-4 h-4 text-amber-600" />
                  <span>Zussenkroon Badge</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white rounded-xl text-xs sm:text-sm font-black shadow-md cursor-pointer"
                >
                  Terug naar Safaripark
                </button>
              </div>
            </motion.div>
          )}

        </div>
      </motion.div>
    </div>
  );
};
