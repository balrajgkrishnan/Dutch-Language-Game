import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { VerbItem, Animal, BiomeType } from '../types';
import { sound } from '../services/soundService';
import { getImperfectumOptions, checkAux, checkParticiple, WERKWOORDEN_DATA } from '../data/werkwoorden';
import { Volume2, Sparkles, CheckCircle2, XCircle, ArrowRight, Lightbulb, Zap } from 'lucide-react';
import { AnimalAvatar } from './AnimalAvatar';
import { StoryDialogueCard } from './StoryDialogueCard';
import confetti from 'canvas-confetti';

import { ALL_BIOME_ANIMALS } from '../data/biomeData';

interface VerbQuizCardProps {
  verb?: VerbItem;
  verbItem?: VerbItem;
  animal?: Animal;
  mascotAnimal?: Animal;
  tierName?: string;
  selectedTier?: 'all' | 'A1' | 'A2' | 'B1' | 'B2';
  onSelectTier?: (tier: 'all' | 'A1' | 'A2' | 'B1' | 'B2') => void;
  playerName?: string;
  avatarEmoji?: string;
  questionNumber?: number;
  currentVerbIndex?: number;
  totalQuestions?: number;
  totalVerbsAvailable?: number;
  biome?: BiomeType;
  onAnswerCorrect: (points: number) => void;
  onAnswerIncorrect: () => void;
  onNextQuestion?: () => void;
  onNextVerb?: () => void;
}

export const VerbQuizCard: React.FC<VerbQuizCardProps> = ({
  verb,
  verbItem,
  animal,
  mascotAnimal,
  tierName,
  selectedTier,
  onSelectTier,
  playerName,
  avatarEmoji,
  questionNumber,
  currentVerbIndex,
  totalQuestions,
  totalVerbsAvailable,
  biome = 'safari',
  onAnswerCorrect,
  onAnswerIncorrect,
  onNextQuestion,
  onNextVerb
}) => {
  const activeVerb = verb || verbItem || WERKWOORDEN_DATA[0];
  const activeAnimal = animal || mascotAnimal || ALL_BIOME_ANIMALS[0];
  const activeQNum = questionNumber || (currentVerbIndex !== undefined ? currentVerbIndex + 1 : 1);
  const activeTotal = totalQuestions || totalVerbsAvailable || WERKWOORDEN_DATA.length;
  const activeTierLabel = tierName || (selectedTier ? `Niveau ${selectedTier.toUpperCase()}` : `Niveau ${activeVerb.tier}`);
  const handleNext = () => {
    if (onNextQuestion) onNextQuestion();
    else if (onNextVerb) onNextVerb();
  };

  const [step, setStep] = useState<'step_mc' | 'step_participle' | 'feedback'>('step_mc');
  const [mcOptions, setMcOptions] = useState<string[]>([]);
  const [selectedMcOption, setSelectedMcOption] = useState<string | null>(null);
  const [isMcCorrect, setIsMcCorrect] = useState<boolean | null>(null);
  
  const [selectedAux, setSelectedAux] = useState<'heeft' | 'is' | null>(null);
  const [participleInput, setParticipleInput] = useState('');
  const [auxError, setAuxError] = useState(false);
  const [participleResult, setParticipleResult] = useState<boolean | null>(null);
  const [auxResult, setAuxResult] = useState<boolean | null>(null);

  useEffect(() => {
    setStep('step_mc');
    setSelectedMcOption(null);
    setIsMcCorrect(null);
    setSelectedAux(null);
    setParticipleInput('');
    setAuxError(false);
    setParticipleResult(null);
    setAuxResult(null);

    const opts = getImperfectumOptions(activeVerb, WERKWOORDEN_DATA, 4);
    setMcOptions(opts);
  }, [activeVerb]);

  const handleSpeak = () => {
    sound.speakDutch(`${activeVerb.infinitief}. ${activeVerb.example?.nl || ''}`);
  };

  const handleSelectMc = (opt: string) => {
    if (selectedMcOption !== null) return;
    setSelectedMcOption(opt);

    const isCorrect = opt.toLowerCase() === activeVerb.imperfectum_ev.toLowerCase() ||
      (activeVerb.accept_alt?.imperfectum_ev?.some(alt => alt.toLowerCase() === opt.toLowerCase()) ?? false);

    setIsMcCorrect(isCorrect);

    if (isCorrect) {
      sound.playCorrect();
    } else {
      sound.playIncorrect();
    }

    setTimeout(() => {
      setStep('step_participle');
    }, 700);
  };

  const handleParticipleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!selectedAux) {
      setAuxError(true);
      sound.playIncorrect();
      return;
    }
    setAuxError(false);

    const auxOk = checkAux(selectedAux, activeVerb.hulpwerkwoord);
    const partOk = checkParticiple(participleInput, activeVerb);

    setAuxResult(auxOk);
    setParticipleResult(partOk);

    const isTotalCorrect = Boolean(isMcCorrect && auxOk && partOk);

    if (isTotalCorrect) {
      sound.playCorrect();
      sound.playFanfare();
      onAnswerCorrect(20);
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // safe
      }
    } else {
      sound.playIncorrect();
      onAnswerIncorrect();
    }

    setStep('feedback');
  };

  const isFullSuccess = isMcCorrect && auxResult && participleResult;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-2 space-y-4">
      {/* Top Story Dialogue Narrative Card */}
      <StoryDialogueCard
        biome={biome}
        animal={activeAnimal}
        chapterTitle={`Werkwoord Training: ${activeTierLabel}`}
        storyText={`Onderzoek samen met Boerin Tess de verleden tijd en het voltooid deelwoord van '${activeVerb.infinitief}'!`}
        onPetAnimal={() => sound.playAnimalHappy(activeAnimal.soundName)}
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        
        {/* Left Character Mascot Card */}
        <div className="md:col-span-5 bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 shadow-xl shadow-emerald-950/5 border border-emerald-100 flex flex-col items-center justify-between text-center min-h-[300px]">
          <div className="w-full flex items-center justify-between">
            <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
              Groep 6-7-8 Werkwoorden
            </span>
            <span className="text-xs font-black text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full uppercase">
              {activeTierLabel}
            </span>
          </div>

          <div className="my-3 flex flex-col items-center">
            <div className="p-3 bg-gradient-to-br from-amber-50 to-emerald-50 rounded-2xl border border-amber-200/60 shadow-inner">
              <AnimalAvatar animalId={activeAnimal.id} size="lg" interactive={true} isAnimated={true} />
            </div>
            <h3 className="text-lg font-black text-slate-800 mt-2 leading-none">
              {activeAnimal.name}
            </h3>
            <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mt-0.5">
              {activeAnimal.title}
            </p>
          </div>

          <div className="w-full bg-amber-50/80 border border-amber-200/80 rounded-2xl p-3 text-left">
            <div className="flex items-center gap-1.5 text-[11px] font-black text-amber-800 uppercase mb-1">
              <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
              <span>Taalweetje van Tess</span>
            </div>
            <p className="text-xs font-medium text-slate-700 leading-relaxed">
              Sterke werkwoorden veranderen van klank in de verleden tijd! Oefen mee met {activeAnimal.name}.
            </p>
          </div>
        </div>

        {/* Right Challenge Box */}
        <div className="md:col-span-7 bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-7 shadow-xl shadow-emerald-950/5 border border-emerald-100 flex flex-col justify-between">
          <div>
            {/* Challenge Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="bg-emerald-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase">
                  Vraag {activeQNum}/{activeTotal}
                </span>
                {activeVerb.school_priority && (
                  <span className="bg-amber-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                    ⭐ CITO Kern
                  </span>
                )}
              </div>

              <button
                onClick={handleSpeak}
                className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 cursor-pointer border border-emerald-200 transition-colors"
                title="Spreek uit"
              >
                <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Lees Voor</span>
              </button>
            </div>

            {/* Verb Spotlight Header */}
            <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50 border border-emerald-200/80 rounded-2xl p-4 sm:p-5 text-center mb-5">
              <span className="text-[11px] uppercase tracking-widest text-emerald-800 font-black">
                Infinitief (Hele Werkwoord)
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-0.5 tracking-wide">
                {activeVerb.infinitief}
              </h2>
              <p className="text-xs font-bold text-slate-500 mt-1">
                🇬🇧 {activeVerb.english}
              </p>
            </div>

            {/* STAP 1: MULTIPLE CHOICE IMPERFECTUM */}
            {step === 'step_mc' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs sm:text-sm font-black text-emerald-900 uppercase tracking-wide">
                    Stap 1: Kies de verleden tijd (imperfectum)
                  </p>
                  <span className="text-[11px] text-slate-400 font-bold">1/2</span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                  {mcOptions.map((opt, idx) => {
                    const isSelected = selectedMcOption === opt;
                    const isTargetCorrect = opt.toLowerCase() === activeVerb.imperfectum_ev.toLowerCase();
                    let btnStyle = "bg-white text-slate-800 border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 shadow-sm";

                    if (selectedMcOption !== null) {
                      if (isTargetCorrect) {
                        btnStyle = "bg-emerald-500 text-white border-emerald-600 shadow-md";
                      } else if (isSelected) {
                        btnStyle = "bg-rose-500 text-white border-rose-600 shadow-md";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={selectedMcOption !== null}
                        onClick={() => handleSelectMc(opt)}
                        className={`py-3.5 px-3 rounded-2xl font-black text-base sm:text-lg border-2 transition-all cursor-pointer text-center active:scale-98 ${btnStyle}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STAP 2: VOLTOOID DEELWOORD & HULPWOORD */}
            {step === 'step_participle' && (
              <motion.form
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleParticipleSubmit}
                className="flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs sm:text-sm font-black text-emerald-900 uppercase tracking-wide">
                    Stap 2: Voltooid Deelwoord & Hulpwoord
                  </p>
                  <span className="text-[11px] text-slate-400 font-bold">2/2</span>
                </div>

                {/* Aux selector */}
                <div className="flex items-center gap-2 justify-center my-1">
                  <span className="text-xs font-bold text-slate-600">Hulpwoord:</span>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedAux('heeft');
                      setAuxError(false);
                      sound.playPop();
                    }}
                    className={`px-4 py-2 rounded-xl text-sm font-black uppercase transition-all cursor-pointer border ${
                      selectedAux === 'heeft'
                        ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                        : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    heb / heeft
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedAux('is');
                      setAuxError(false);
                      sound.playPop();
                    }}
                    className={`px-4 py-2 rounded-xl text-sm font-black uppercase transition-all cursor-pointer border ${
                      selectedAux === 'is'
                        ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                        : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    ben / is
                  </button>
                </div>

                {auxError && (
                  <p className="text-center text-xs font-bold text-rose-500">
                    ☝ Kies eerst het hulpwoord (heb of ben)!
                  </p>
                )}

                {/* Participle text input */}
                <div className="flex flex-col gap-1.5 mt-1">
                  <label className="text-xs font-bold text-slate-500 text-center">
                    Typ het voltooid deelwoord (bijv. <i>gebakken</i>):
                  </label>
                  <input
                    type="text"
                    autoFocus
                    value={participleInput}
                    onChange={(e) => setParticipleInput(e.target.value)}
                    placeholder={`bijv. ge...`}
                    className="w-full bg-slate-50 text-slate-800 font-black text-lg py-3 px-4 rounded-2xl border-2 border-emerald-300 text-center outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white text-base font-black py-3.5 rounded-2xl shadow-md shadow-emerald-700/20 uppercase tracking-wider cursor-pointer active:scale-98"
                >
                  Controleer Antwoord! ➔
                </button>
              </motion.form>
            )}

            {/* FEEDBACK VIEW */}
            {step === 'feedback' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col gap-3"
              >
                <div className={`p-4 rounded-2xl border text-left ${
                  isFullSuccess
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                    : 'bg-rose-50 border-rose-300 text-rose-900'
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    {isFullSuccess ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        <span className="font-black text-sm uppercase">Uitstekend Gedaan! +20 Sterren</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-rose-600" />
                        <span className="font-black text-sm uppercase">Bijna goed! Bekijk de regels:</span>
                      </>
                    )}
                  </div>

                  <div className="text-xs font-bold space-y-1 mt-2">
                    <p>• Verleden tijd (enkelvoud): <b className="text-black">{activeVerb.imperfectum_ev}</b></p>
                    <p>• Verleden tijd (meervoud): <b className="text-black">{activeVerb.imperfectum_mv}</b></p>
                    <p>• Voltooid deelwoord: <b className="text-black">{activeVerb.hulpwerkwoord.split('/')[0]} {activeVerb.perfectum}</b></p>
                  </div>

                  {activeVerb.example && (
                    <div className="mt-2.5 pt-2 border-t border-black/10">
                      <p className="text-xs italic font-bold text-slate-700">
                        "{activeVerb.example.nl}"
                      </p>
                      <p className="text-[11px] text-slate-500">
                        🇬🇧 {activeVerb.example.en}
                      </p>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => {
                    sound.playPop();
                    handleNext();
                  }}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white text-base font-black py-3.5 rounded-2xl shadow-md shadow-amber-600/20 uppercase tracking-wider cursor-pointer active:scale-98 flex items-center justify-center gap-2 mt-1"
                >
                  <span>Volgende Werkwoord ➔</span>
                </button>
              </motion.div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
