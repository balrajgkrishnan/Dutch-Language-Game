import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Mic, 
  Volume2, 
  Award, 
  X, 
  BookOpen, 
  Zap, 
  Smile, 
  RotateCcw,
  Check
} from 'lucide-react';
import { PlayerProfile, BaselineAssessmentData, GradeLevel } from '../../types';
import { SAFARI_PLACEMENT_STAGES, PlacementStage } from '../../data/assessmentData';
import { sound } from '../../services/soundService';
import { speechService } from '../../services/speechService';
import confetti from 'canvas-confetti';

interface SafariPlacementModalProps {
  isOpen: boolean;
  profile: PlayerProfile;
  onClose: () => void;
  onCompletePlacement: (baseline: BaselineAssessmentData, updatedProfile: PlayerProfile) => void;
}

export const SafariPlacementModal: React.FC<SafariPlacementModalProps> = ({
  isOpen,
  profile,
  onClose,
  onCompletePlacement
}) => {
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [spokenTranscript, setSpokenTranscript] = useState('');
  const [speechAccuracy, setSpeechAccuracy] = useState<number | null>(null);
  const [writingInput, setWritingInput] = useState('');
  const [stageScores, setStageScores] = useState<Record<string, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isOpen) return null;

  const currentStage: PlacementStage = SAFARI_PLACEMENT_STAGES[currentStageIdx] || SAFARI_PLACEMENT_STAGES[0];
  const totalStages = SAFARI_PLACEMENT_STAGES.length;
  const progressPct = ((currentStageIdx + 1) / totalStages) * 100;

  const handleSelectOption = (index: number) => {
    setSelectedOption(index);
    sound.playPop();
  };

  const handleStartSpeech = () => {
    const targetText = currentStage.readAloudText || '';
    setIsRecording(true);
    setSpokenTranscript('');
    setSpeechAccuracy(null);

    speechService.startListening(
      (transcript) => {
        setSpokenTranscript(transcript);
        const accuracy = speechService.calculateSpeechAccuracy(transcript, targetText);
        setSpeechAccuracy(accuracy);
      },
      () => {
        setIsRecording(false);
        sound.playStar();
      }
    );
  };

  const handleStopSpeech = () => {
    speechService.stopListening();
    setIsRecording(false);
  };

  const handleNextStage = () => {
    // Calculate score for this stage
    let score = 75; // default benchmark
    if (currentStage.type === 'vocab' || currentStage.type === 'comprehension' || currentStage.type === 'listening' || currentStage.type === 'spelling' || currentStage.type === 'math') {
      if (selectedOption !== null && selectedOption === currentStage.correctOptionIndex) {
        score = 90;
      } else {
        score = 60;
      }
    } else if (currentStage.type === 'fluency' || currentStage.type === 'pronounce') {
      score = speechAccuracy !== null ? Math.max(50, Math.min(100, speechAccuracy)) : 75;
    } else if (currentStage.type === 'writing') {
      const words = writingInput.trim().split(/\s+/).length;
      score = words >= 8 ? 88 : words >= 4 ? 75 : 60;
    }

    const updatedStageScores = {
      ...stageScores,
      [currentStage.id]: score
    };
    setStageScores(updatedStageScores);

    sound.playCorrect();

    if (currentStageIdx < totalStages - 1) {
      setCurrentStageIdx(prev => prev + 1);
      setSelectedOption(null);
      setSpokenTranscript('');
      setSpeechAccuracy(null);
      setWritingInput('');
    } else {
      // Finalize placement
      const vocabScore = updatedStageScores['stage_1_vocab'] || 70;
      const fluencyScore = updatedStageScores['stage_2_fluency'] || 65;
      const compScore = updatedStageScores['stage_3_comprehension'] || 75;
      const listenScore = updatedStageScores['stage_4_listening'] || 80;
      const spellScore = updatedStageScores['stage_5_spelling'] || 70;
      const pronScore = updatedStageScores['stage_6_pronounce'] || 65;
      const writeScore = updatedStageScores['stage_7_writing'] || 65;
      const mathScore = updatedStageScores['stage_8_math'] || 85;

      const isOlder = profile.name.toLowerCase() === 'hemali' || (vocabScore + compScore + writeScore) / 3 > 75;
      const recommendedGrade: GradeLevel = isOlder ? 'group_6_7_8' : 'group_4_5';

      const baseline: BaselineAssessmentData = {
        completed: true,
        completedDate: new Date().toISOString().split('T')[0],
        vocabulary: vocabScore,
        readingFluency: fluencyScore,
        readingComprehension: compScore,
        listening: listenScore,
        spelling: spellScore,
        pronunciation: pronScore,
        writing: writeScore,
        mathematics: mathScore,
        confidence: isOlder ? 55 : 70,
        initialWpm: isOlder ? 95 : 60,
        recommendedStartingGrade: recommendedGrade
      };

      setIsCompleted(true);
      sound.playLevelUp();
      try {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      } catch {
        // ignore
      }
    }
  };

  const handleFinishAdventure = () => {
    const vocabScore = stageScores['stage_1_vocab'] || 70;
    const compScore = stageScores['stage_3_comprehension'] || 75;
    const writeScore = stageScores['stage_7_writing'] || 65;
    const isOlder = profile.name.toLowerCase() === 'hemali' || (vocabScore + compScore + writeScore) / 3 > 75;
    const recommendedGrade: GradeLevel = isOlder ? 'group_6_7_8' : 'group_4_5';

    const baseline: BaselineAssessmentData = {
      completed: true,
      completedDate: new Date().toISOString().split('T')[0],
      vocabulary: stageScores['stage_1_vocab'] || 70,
      readingFluency: stageScores['stage_2_fluency'] || 65,
      readingComprehension: stageScores['stage_3_comprehension'] || 75,
      listening: stageScores['stage_4_listening'] || 80,
      spelling: stageScores['stage_5_spelling'] || 70,
      pronunciation: stageScores['stage_6_pronounce'] || 65,
      writing: stageScores['stage_7_writing'] || 65,
      mathematics: stageScores['stage_8_math'] || 85,
      confidence: isOlder ? 55 : 70,
      initialWpm: isOlder ? 95 : 60,
      recommendedStartingGrade: recommendedGrade
    };

    const updatedProfile: PlayerProfile = {
      ...profile,
      baseline,
      selectedGrade: recommendedGrade,
      mastery: {
        ...profile.mastery,
        vocabulary: baseline.vocabulary,
        readingFluency: baseline.readingFluency,
        readingComprehension: baseline.readingComprehension,
        listening: baseline.listening,
        spelling: baseline.spelling,
        pronunciation: baseline.pronunciation,
        writing: baseline.writing,
        mathematics: baseline.mathematics
      },
      stars: profile.stars + 100,
      score: profile.score + 100
    };

    onCompletePlacement(baseline, updatedProfile);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-2 border-emerald-500/20 overflow-hidden flex flex-col my-auto"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-950 p-5 sm:p-6 text-white relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center text-2xl shadow-inner">
                  🧭
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                    Safari Plaatsingsexpeditie
                  </h2>
                  <p className="text-xs sm:text-sm text-emerald-200">
                    Vind jouw startniveau samen met {profile.companion.name}
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Progress Bar */}
            {!isCompleted && (
              <div className="mt-4">
                <div className="flex justify-between text-xs text-emerald-200 font-bold mb-1">
                  <span>Etappe {currentStageIdx + 1} van {totalStages}: {currentStage.skillName}</span>
                  <span>{Math.round(progressPct)}%</span>
                </div>
                <div className="h-2.5 bg-emerald-950/60 rounded-full overflow-hidden p-0.5 border border-emerald-400/20">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full"
                    style={{ width: `${progressPct}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Modal Body */}
          <div className="p-5 sm:p-6 space-y-5 overflow-y-auto max-h-[70vh]">
            {!isCompleted ? (
              <div className="space-y-4">
                {/* Adventure Scenario Card */}
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3.5">
                  <span className="text-3xl">{currentStage.iconEmoji}</span>
                  <div className="space-y-1">
                    <h3 className="text-sm font-black text-emerald-950 uppercase tracking-wide">
                      {currentStage.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                      {currentStage.adventureStory}
                    </p>
                    <div className="text-[11px] text-emerald-800 font-bold flex items-center gap-1.5 pt-1">
                      <span>{profile.companion.emoji} {profile.companion.name} zegt:</span>
                      <span className="italic font-normal text-slate-600">"{currentStage.companionTip}"</span>
                    </div>
                  </div>
                </div>

                {/* Question / Task Card */}
                <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-indigo-100 text-indigo-900 font-black text-xs uppercase tracking-wider">
                      {currentStage.skillName}
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900">
                      {currentStage.question}
                    </h4>
                  </div>

                  {/* Multiple Choice Options */}
                  {currentStage.options && (
                    <div className="grid grid-cols-1 gap-2.5 pt-1">
                      {currentStage.options.map((option, idx) => {
                        const isSelected = selectedOption === idx;
                        return (
                          <button
                            key={idx}
                            onClick={() => handleSelectOption(idx)}
                            className={`p-3.5 rounded-xl border text-left font-medium text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between ${
                              isSelected
                                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                                : 'bg-slate-50 hover:bg-emerald-50/60 border-slate-200 text-slate-800'
                            }`}
                          >
                            <span>{option}</span>
                            {isSelected && <Check className="w-4 h-4 shrink-0 text-white" />}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Read Aloud / Pronounce Voice Task */}
                  {currentStage.readAloudText && (
                    <div className="space-y-3 bg-amber-50/50 p-4 rounded-xl border border-amber-200/80">
                      <div className="text-slate-900 font-bold text-sm sm:text-base bg-white p-3 rounded-lg border border-amber-200/60 shadow-inner flex items-center justify-between">
                        <span>"{currentStage.readAloudText}"</span>
                        <button
                          onClick={() => sound.speak(currentStage.readAloudText || '')}
                          className="p-1.5 rounded-lg bg-amber-100 text-amber-800 hover:bg-amber-200 cursor-pointer"
                          title="Beluister voorbeeld"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={isRecording ? handleStopSpeech : handleStartSpeech}
                          className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all ${
                            isRecording
                              ? 'bg-rose-600 text-white animate-pulse'
                              : 'bg-emerald-700 text-white hover:bg-emerald-800 shadow-xs'
                          }`}
                        >
                          <Mic className="w-4 h-4" />
                          <span>{isRecording ? 'Luistert... (Klik om te stoppen)' : '🎙️ Spreek nu in via microfoon'}</span>
                        </button>
                      </div>

                      {spokenTranscript && (
                        <div className="text-xs bg-white p-2.5 rounded-lg border border-slate-200 space-y-1">
                          <div className="text-slate-500 font-bold">Jij zei: <span className="text-slate-800 font-normal">"{spokenTranscript}"</span></div>
                          {speechAccuracy !== null && (
                            <div className="text-emerald-700 font-bold">Nauwkeurigheid: {speechAccuracy}% ⭐</div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Writing Task */}
                  {currentStage.type === 'writing' && (
                    <div className="space-y-2">
                      <textarea
                        value={writingInput}
                        onChange={(e) => setWritingInput(e.target.value)}
                        placeholder="Typ hier jouw antwoord in het Nederlands..."
                        rows={3}
                        className="w-full p-3 border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-emerald-600 focus:ring-2 focus:ring-emerald-200"
                      />
                      <div className="text-[11px] text-slate-500 text-right">
                        Aantal woorden: {writingInput.trim() ? writingInput.trim().split(/\s+/).length : 0}
                      </div>
                    </div>
                  )}
                </div>

                {/* Navigation Button */}
                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleNextStage}
                    className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 shadow-md cursor-pointer"
                  >
                    <span>{currentStageIdx < totalStages - 1 ? 'Volgende Etappe' : 'Expeditie Voltooien'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              /* Completed Baseline Results Celebration */
              <div className="text-center space-y-5 py-4">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-emerald-100 border-2 border-emerald-300 text-4xl shadow-md">
                  🎉
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-2xl font-black text-emerald-950">
                    Gefeliciteerd, Safari Verkenner {profile.name}!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                    Jouw Safari Plaatsingsexpeditie is succesvol afgerond. We hebben jouw unieke leerkracht en vertrekpunt vastgesteld!
                  </p>
                </div>

                {/* Baseline Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-left">
                  <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200">
                    <span className="text-xs font-bold text-emerald-800">📖 Lezen & Begrip</span>
                    <p className="text-lg font-black text-emerald-950">{stageScores['stage_3_comprehension'] || 75}%</p>
                  </div>
                  <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200">
                    <span className="text-xs font-bold text-amber-800">🔤 Woordenschat</span>
                    <p className="text-lg font-black text-amber-950">{stageScores['stage_1_vocab'] || 70}%</p>
                  </div>
                  <div className="p-3 bg-indigo-50 rounded-2xl border border-indigo-200">
                    <span className="text-xs font-bold text-indigo-800">🎙️ Spreekdurf</span>
                    <p className="text-lg font-black text-indigo-950">{stageScores['stage_6_pronounce'] || 65}%</p>
                  </div>
                  <div className="p-3 bg-teal-50 rounded-2xl border border-teal-200">
                    <span className="text-xs font-bold text-teal-800">🧮 Wiskunde</span>
                    <p className="text-lg font-black text-teal-950">{stageScores['stage_8_math'] || 85}%</p>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-left space-y-1">
                  <div className="flex items-center gap-2 text-xs font-black text-slate-800 uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Aanbevolen Safari Startgroep:</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 font-medium">
                    {profile.name.toLowerCase() === 'hemali' ? 'Groep 6-7-8 (Focus op Spreekdurf, Verrijkte Woordenschat & Sterke Werkwoorden)' : 'Groep 4-5 (Focus op Leesvloeiendheid, Woordenschat & Dubbelzetters)'}
                  </p>
                </div>

                <button
                  onClick={handleFinishAdventure}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-black text-sm uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Start Jouw Persoonlijke Safari Avontuur (+100 🌟)</span>
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
