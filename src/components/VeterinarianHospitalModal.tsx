import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Stethoscope, 
  Heart, 
  Sparkles, 
  Volume2, 
  CheckCircle2, 
  ShieldCheck, 
  RotateCcw, 
  Award, 
  Activity, 
  Thermometer, 
  ArrowRight,
  Smile,
  Syringe
} from 'lucide-react';
import { PlayerProfile, VetPatientCase } from '../types';
import { VET_PATIENT_CASES } from '../data/veterinarianData';
import { sound } from '../services/soundService';
import { speech } from '../services/speechService';
import confetti from 'canvas-confetti';

interface VeterinarianHospitalModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: PlayerProfile;
  onUpdateProfile: (updater: (prev: PlayerProfile) => PlayerProfile) => void;
}

type HospitalStage = 'select_patient' | 'intake_reading' | 'choose_tool' | 'spell_cure' | 'healed_celebration';

export const VeterinarianHospitalModal: React.FC<VeterinarianHospitalModalProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile
}) => {
  const [selectedCaseIndex, setSelectedCaseIndex] = useState(0);
  const [stage, setStage] = useState<HospitalStage>('select_patient');
  const [isNarrating, setIsNarrating] = useState(false);
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null);
  const [toolFeedback, setToolFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  
  // Spelling state
  const [placedLetters, setPlacedLetters] = useState<string[]>([]);
  const [availableLetters, setAvailableLetters] = useState<{ id: string; letter: string }[]>([]);
  const [isSpellingChecked, setIsSpellingChecked] = useState(false);
  const [healedPatients, setHealedPatients] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(`vet_healed_${profile.name.toLowerCase()}`);
      return raw ? JSON.parse(raw) : ['vet-1'];
    } catch {
      return ['vet-1'];
    }
  });

  if (!isOpen) return null;

  const currentCase: VetPatientCase = VET_PATIENT_CASES[selectedCaseIndex] || VET_PATIENT_CASES[0];

  const handleSelectPatient = (idx: number) => {
    sound.playPop();
    setSelectedCaseIndex(idx);
    const targetCase = VET_PATIENT_CASES[idx];
    
    // Setup scrambled letters for spelling
    const scrambled = [...targetCase.spellingWord.scrambledLetters]
      .sort(() => Math.random() - 0.5)
      .map((letter, i) => ({ id: `${letter}-${i}-${Math.random()}`, letter }));
      
    setAvailableLetters(scrambled);
    setPlacedLetters([]);
    setSelectedToolId(null);
    setToolFeedback(null);
    setIsSpellingChecked(false);
    setStage('intake_reading');
  };

  const handleNarrateReport = () => {
    if (isNarrating) {
      speech.stop();
      setIsNarrating(false);
      return;
    }

    setIsNarrating(true);
    const speechText = `Patiënt: ${currentCase.patientName}. Symptomen: ${currentCase.symptoms.join(', ')}. Verslag: ${currentCase.caseReport}`;
    speech.speak(speechText, {
      rate: 0.82, // Slower gentle rate for Ridheya & young readers
      pitch: 1.1,
      onEnd: () => setIsNarrating(false)
    });
  };

  const handleChooseTool = (toolId: string) => {
    sound.playPop();
    setSelectedToolId(toolId);
    
    if (toolId === currentCase.treatmentTool.id) {
      sound.playSuccess();
      setToolFeedback({
        isCorrect: true,
        message: `Uitstekend gediagnosticeerd! De ${currentCase.treatmentTool.name} is precies wat ${currentCase.patientName} nodig heeft.`
      });
    } else {
      sound.playWrong();
      setToolFeedback({
        isCorrect: false,
        message: 'Nog niet helemaal! Lees het verslag nog eens goed: wat past het allerbeste bij deze klacht?'
      });
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
    const currentSpelled = placedLetters.join('');
    const target = currentCase.spellingWord.word;

    if (currentSpelled.toUpperCase() === target.toUpperCase()) {
      sound.playLevelUp();
      confetti({ particleCount: 80, spread: 80 });
      setIsSpellingChecked(true);

      // Save to healed list
      const updatedHealed = Array.from(new Set([...healedPatients, currentCase.id]));
      setHealedPatients(updatedHealed);
      try {
        localStorage.setItem(`vet_healed_${profile.name.toLowerCase()}`, JSON.stringify(updatedHealed));
      } catch {}

      // Award stars, coins & veterinary mastery
      onUpdateProfile(prev => ({
        ...prev,
        score: prev.score + currentCase.rewardStars,
        coins: prev.coins + currentCase.rewardCoins,
        mastery: {
          ...prev.mastery,
          readingComprehension: Math.min(100, prev.mastery.readingComprehension + 3),
          vocabulary: Math.min(100, prev.mastery.vocabulary + 3),
          spelling: Math.min(100, prev.mastery.spelling + 3)
        }
      }));

      setTimeout(() => {
        setStage('healed_celebration');
      }, 700);
    } else {
      sound.playWrong();
      speech.speak('Nog even goed kijken naar de letters! Probeer het gerust opnieuw.', { rate: 0.85 });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/65 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl border-2 border-emerald-200 overflow-hidden flex flex-col max-h-[94vh]"
      >
        {/* Hospital Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 p-4 sm:p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-3xl shadow-inner">
              🏥
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg sm:text-xl font-black tracking-tight">
                  Dokter Ridheya’s Dierenarts Ziekenhuis
                </h3>
                <span className="bg-amber-300 text-emerald-950 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-xs">
                  ✨ Genezen: {healedPatients.length} / {VET_PATIENT_CASES.length}
                </span>
              </div>
              <p className="text-xs text-emerald-100 font-medium">
                Lees patiëntendossiers, kies de juiste verzorging &amp; spel het wonderwoord!
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

        {/* Hospital Stage Nav Tabs */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5 flex items-center justify-between gap-2 overflow-x-auto">
          <button
            onClick={() => setStage('select_patient')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black whitespace-nowrap cursor-pointer transition-all flex items-center gap-1.5 ${
              stage === 'select_patient'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span>🐾</span>
            <span>Kies Patiënt</span>
          </button>

          {stage !== 'select_patient' && (
            <div className="flex items-center gap-2">
              <span className={`text-[11px] font-black px-2.5 py-1 rounded-lg ${stage === 'intake_reading' ? 'bg-teal-100 text-teal-900 border border-teal-300' : 'text-slate-500'}`}>
                1. Dossier Lezen 📋
              </span>
              <span>➔</span>
              <span className={`text-[11px] font-black px-2.5 py-1 rounded-lg ${stage === 'choose_tool' ? 'bg-cyan-100 text-cyan-900 border border-cyan-300' : 'text-slate-500'}`}>
                2. Behandeling 🩹
              </span>
              <span>➔</span>
              <span className={`text-[11px] font-black px-2.5 py-1 rounded-lg ${stage === 'spell_cure' ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'text-slate-500'}`}>
                3. Wonderwoord Spellen ✨
              </span>
            </div>
          )}
        </div>

        {/* Modal Main Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5">
          
          {/* VIEW 1: PATIENT SELECTION CAROUSEL */}
          {stage === 'select_patient' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base sm:text-lg font-black text-slate-800">
                    Kies een diertje in de wachtkamer:
                  </h4>
                  <p className="text-xs text-slate-500">
                    Elk diertje heeft een eigen verhaal en heeft de zorg van een echte dierenarts nodig!
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5">
                {VET_PATIENT_CASES.map((pCase, idx) => {
                  const isHealed = healedPatients.includes(pCase.id);
                  return (
                    <motion.div
                      key={pCase.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelectPatient(idx)}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between gap-3 text-left relative ${
                        isHealed
                          ? 'bg-emerald-50/70 border-emerald-300 hover:border-emerald-500 shadow-xs'
                          : 'bg-white border-slate-200 hover:border-teal-400 hover:shadow-md'
                      }`}
                    >
                      {isHealed && (
                        <div className="absolute top-2 right-2 bg-emerald-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Genezen</span>
                        </div>
                      )}

                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-3xl shadow-inner">
                          {pCase.animalEmoji}
                        </div>
                        <div>
                          <h5 className="text-sm font-black text-slate-800 line-clamp-1">{pCase.patientName}</h5>
                          <span className="text-[11px] text-slate-500 font-medium">{pCase.species} • {pCase.age}</span>
                        </div>
                      </div>

                      <div className="bg-slate-50 p-2 rounded-xl text-[11px] font-medium text-slate-600 line-clamp-2">
                        🚨 {pCase.targetProblem}
                      </div>

                      <button className="w-full py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-black shadow-xs cursor-pointer flex items-center justify-center gap-1">
                        <span>Onderzoek Starten</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {/* VIEW 2: PATIENT INTAKE READING */}
          {stage === 'intake_reading' && (
            <div className="space-y-5">
              
              {/* Patient Clipboard Card */}
              <div className="bg-gradient-to-br from-amber-50/80 to-orange-50/50 p-5 rounded-3xl border-2 border-amber-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-amber-200/80">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl filter drop-shadow-xs">{currentCase.animalEmoji}</span>
                    <div>
                      <h4 className="text-base sm:text-lg font-black text-slate-800">
                        Patiëntendossier: {currentCase.patientName}
                      </h4>
                      <span className="text-xs text-amber-900 font-semibold">
                        Soort: {currentCase.species} • Leeftijd: {currentCase.age}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleNarrateReport}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-black cursor-pointer transition-all flex items-center gap-1.5 shadow-xs ${
                      isNarrating
                        ? 'bg-rose-500 text-white animate-pulse'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    }`}
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>{isNarrating ? 'Pauzeer Audio' : '🔊 Luister naar Dossier'}</span>
                  </button>
                </div>

                {/* Vitals Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="bg-white/90 p-3 rounded-2xl border border-amber-200 flex items-center gap-2.5">
                    <Thermometer className="w-5 h-5 text-rose-500 flex-shrink-0" />
                    <div>
                      <span className="text-[10px] uppercase font-black text-slate-400 block">Temperatuur:</span>
                      <span className="text-xs font-black text-slate-700">{currentCase.temperature}</span>
                    </div>
                  </div>

                  <div className="bg-white/90 p-3 rounded-2xl border border-amber-200 flex items-center gap-2.5">
                    <Activity className="w-5 h-5 text-teal-600 flex-shrink-0" />
                    <div>
                      <span className="text-[10px] uppercase font-black text-slate-400 block">Symptomen:</span>
                      <span className="text-xs font-black text-slate-700">{currentCase.symptoms.join(' • ')}</span>
                    </div>
                  </div>
                </div>

                {/* Short Child-Friendly Case Reading (<100 words) */}
                <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-amber-300/80 text-slate-800 text-sm sm:text-base font-medium leading-relaxed shadow-inner">
                  <span className="text-amber-800 font-black mr-2">📋 Wat is er gebeurd?</span>
                  {currentCase.caseReport}
                </div>
              </div>

              {/* Next Step Button */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setStage('select_patient')}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-black cursor-pointer"
                >
                  Terug naar Wachtkamer
                </button>
                
                <button
                  onClick={() => {
                    sound.playPop();
                    setStage('choose_tool');
                  }}
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs sm:text-sm font-black shadow-md cursor-pointer flex items-center gap-2"
                >
                  <span>Stap 2: Kies Behandeling</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* VIEW 3: CHOOSE TREATMENT TOOL */}
          {stage === 'choose_tool' && (
            <div className="space-y-5">
              <div className="text-center max-w-xl mx-auto space-y-1">
                <span className="text-xs font-black text-teal-700 uppercase tracking-wider bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                  Stap 2: Dierenarts Gereedschap
                </span>
                <h4 className="text-base sm:text-lg font-black text-slate-800">
                  Welk medisch hulpmiddel heeft {currentCase.patientName} nodig?
                </h4>
                <p className="text-xs text-slate-500">
                  Klacht: <strong className="text-slate-700">{currentCase.targetProblem}</strong>
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {currentCase.toolOptions.map((tool) => {
                  const isSelected = selectedToolId === tool.id;
                  return (
                    <motion.div
                      key={tool.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleChooseTool(tool.id)}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center text-center gap-2.5 ${
                        isSelected
                          ? tool.id === currentCase.treatmentTool.id
                            ? 'bg-emerald-50 border-emerald-500 shadow-md ring-2 ring-emerald-400'
                            : 'bg-rose-50 border-rose-400 shadow-xs'
                          : 'bg-white border-slate-200 hover:border-teal-400 hover:shadow-sm'
                      }`}
                    >
                      <div className="w-16 h-16 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-3xl shadow-inner">
                        {tool.icon}
                      </div>
                      <div>
                        <h5 className="text-sm font-black text-slate-800">{tool.name}</h5>
                        <p className="text-[11px] text-slate-500 mt-1 font-medium leading-tight">
                          {tool.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Feedback Box */}
              {toolFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-2xl border text-xs sm:text-sm font-black flex items-center gap-3 ${
                    toolFeedback.isCorrect
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                      : 'bg-rose-50 border-rose-300 text-rose-950'
                  }`}
                >
                  <span className="text-2xl">{toolFeedback.isCorrect ? '🌟' : '💡'}</span>
                  <div className="flex-1">{toolFeedback.message}</div>
                </motion.div>
              )}

              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={() => setStage('intake_reading')}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-black cursor-pointer"
                >
                  Vorige Stap
                </button>

                {toolFeedback?.isCorrect && (
                  <button
                    onClick={() => {
                      sound.playPop();
                      setStage('spell_cure');
                    }}
                    className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 rounded-xl text-xs sm:text-sm font-black shadow-md cursor-pointer flex items-center gap-2"
                  >
                    <span>Stap 3: Spel het Wonderwoord!</span>
                    <Sparkles className="w-4 h-4 text-slate-900" />
                  </button>
                )}
              </div>

            </div>
          )}

          {/* VIEW 4: SPELL THE CURE WORD */}
          {stage === 'spell_cure' && (
            <div className="space-y-5">
              <div className="text-center max-w-xl mx-auto space-y-1">
                <span className="text-xs font-black text-amber-700 uppercase tracking-wider bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  Stap 3: Wonderwoord Spellen
                </span>
                <h4 className="text-base sm:text-lg font-black text-slate-800">
                  Spel het toverwoord om {currentCase.patientName} te genezen!
                </h4>
                <p className="text-xs text-slate-500 font-medium">
                  💡 Hint: {currentCase.spellingWord.hint}
                </p>
              </div>

              {/* Target Placed Letters Slot Box */}
              <div className="bg-slate-100 p-4 rounded-3xl border-2 border-slate-200 flex items-center justify-center gap-2 flex-wrap min-h-[72px]">
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
                      className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 font-black text-xl shadow-md flex items-center justify-center cursor-pointer border-2 border-amber-500"
                    >
                      {letter}
                    </motion.button>
                  ))
                )}
              </div>

              {/* Available Scrambled Letters Pool */}
              <div className="flex items-center justify-center gap-2 flex-wrap pt-2">
                {availableLetters.map((item) => (
                  <motion.button
                    key={item.id}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => handleAddLetter(item)}
                    className="w-12 h-12 rounded-2xl bg-white hover:bg-teal-50 text-slate-800 hover:text-teal-900 font-black text-xl shadow-xs border-2 border-slate-300 hover:border-teal-400 flex items-center justify-center cursor-pointer"
                  >
                    {item.letter}
                  </motion.button>
                ))}
              </div>

              <div className="flex justify-between items-center pt-3">
                <button
                  onClick={() => {
                    const scrambled = [...currentCase.spellingWord.scrambledLetters]
                      .sort(() => Math.random() - 0.5)
                      .map((letter, i) => ({ id: `${letter}-${i}-${Math.random()}`, letter }));
                    setAvailableLetters(scrambled);
                    setPlacedLetters([]);
                    sound.playPop();
                  }}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-black cursor-pointer flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Wis &amp; Schud Letters</span>
                </button>

                <button
                  onClick={handleCheckSpelling}
                  disabled={placedLetters.length === 0}
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs sm:text-sm font-black shadow-md cursor-pointer flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Diertje Genezen! ✨</span>
                </button>
              </div>

            </div>
          )}

          {/* VIEW 5: CELEBRATION & HEALED SUCCESS */}
          {stage === 'healed_celebration' && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-6 text-center space-y-5"
            >
              <div className="relative inline-block">
                <motion.div
                  animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-7xl filter drop-shadow-md"
                >
                  {currentCase.animalEmoji}
                </motion.div>
                <div className="absolute -top-2 -right-2 text-3xl">💖</div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xl sm:text-2xl font-black text-emerald-900">
                  {currentCase.patientName} is Helemaal Beter! 🎉
                </h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto font-medium">
                  {currentCase.cureCheerMessage}
                </p>
              </div>

              {/* Earned Rewards Badge Box */}
              <div className="bg-gradient-to-r from-amber-100 via-yellow-100 to-emerald-100 p-4 rounded-2xl border-2 border-amber-300 inline-flex items-center gap-6 shadow-sm">
                <div className="flex items-center gap-1.5 text-amber-900 font-black text-sm">
                  <span>⭐</span>
                  <span>+{currentCase.rewardStars} Sterren</span>
                </div>
                <div className="flex items-center gap-1.5 text-amber-900 font-black text-sm">
                  <span>🪙</span>
                  <span>+{currentCase.rewardCoins} Munten</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-950 font-black text-sm">
                  <span>🩺</span>
                  <span>Dierenarts XP +15</span>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-center gap-3">
                <button
                  onClick={() => setStage('select_patient')}
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs sm:text-sm font-black shadow-md cursor-pointer flex items-center gap-2"
                >
                  <span>Volgende Patiënt Behandelen ➔</span>
                </button>
              </div>
            </motion.div>
          )}

        </div>
      </motion.div>
    </div>
  );
};
