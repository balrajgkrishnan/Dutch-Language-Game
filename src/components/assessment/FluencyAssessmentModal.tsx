import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Timer, 
  Mic, 
  MicOff, 
  Volume2, 
  CheckCircle2, 
  Award, 
  TrendingUp, 
  X, 
  Sparkles, 
  Activity,
  Play,
  RotateCcw,
  BookOpen
} from 'lucide-react';
import { PlayerProfile, FluencySession, GradeLevel } from '../../types';
import { FLUENCY_TEST_PASSAGES } from '../../data/assessmentData';
import { sound } from '../../services/soundService';
import { speechService } from '../../services/speechService';
import confetti from 'canvas-confetti';

interface FluencyAssessmentModalProps {
  isOpen: boolean;
  profile: PlayerProfile;
  onClose: () => void;
  onUpdateProfile: (updater: (prev: PlayerProfile) => PlayerProfile) => void;
}

export const FluencyAssessmentModal: React.FC<FluencyAssessmentModalProps> = ({
  isOpen,
  profile,
  onClose,
  onUpdateProfile
}) => {
  const [selectedPassageIdx, setSelectedPassageIdx] = useState(
    profile.selectedGrade === 'group_6_7_8' ? 1 : 0
  );
  const [isTesting, setIsTesting] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [spokenTranscript, setSpokenTranscript] = useState('');
  const [completedSession, setCompletedSession] = useState<FluencySession | null>(null);

  const passage = FLUENCY_TEST_PASSAGES[selectedPassageIdx] || FLUENCY_TEST_PASSAGES[0];
  const wordsInPassage = passage.text.split(/\s+/);
  const totalWords = wordsInPassage.length;

  useEffect(() => {
    let timer: any;
    if (isTesting) {
      timer = setInterval(() => {
        setSecondsElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTesting]);

  if (!isOpen) return null;

  const handleStartTest = () => {
    setIsTesting(true);
    setSecondsElapsed(0);
    setSpokenTranscript('');
    setCompletedSession(null);
    sound.playPop();

    speechService.startListening(
      (transcript) => {
        setSpokenTranscript(transcript);
      },
      () => {
        // stopped
      }
    );
  };

  const handleFinishTest = () => {
    speechService.stopListening();
    setIsTesting(false);

    const timeInSeconds = Math.max(5, secondsElapsed);
    const minutes = timeInSeconds / 60;
    const spokenWordsCount = spokenTranscript.trim() ? spokenTranscript.trim().split(/\s+/).length : totalWords;
    const calculatedWpm = Math.round(spokenWordsCount / minutes);

    // Calculate accuracy against target passage
    const accuracy = speechService.calculateSpeechAccuracy(spokenTranscript || passage.text, passage.text);
    const hesitations = Math.max(0, Math.floor((timeInSeconds - (totalWords / (passage.targetWpm / 60))) / 3));

    const fluencyScore = Math.min(100, Math.round((accuracy * 0.6) + (Math.min(1.2, calculatedWpm / passage.targetWpm) * 40)));

    const newSession: FluencySession = {
      id: `flu_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      timestamp: Date.now(),
      passageTitle: passage.title,
      passageText: passage.text,
      durationSeconds: timeInSeconds,
      wordsRead: totalWords,
      wpm: calculatedWpm,
      accuracyPct: accuracy,
      hesitationsCount: hesitations,
      audioRecordingUsed: true,
      fluencyScore
    };

    setCompletedSession(newSession);

    onUpdateProfile(prev => {
      const updatedSessions = [newSession, ...(prev.fluencySessions || [])];
      return {
        ...prev,
        stars: prev.stars + 40,
        score: prev.score + 40,
        fluencySessions: updatedSessions,
        mastery: {
          ...prev.mastery,
          readingFluency: Math.min(100, Math.max(prev.mastery.readingFluency, fluencyScore)),
          reading: Math.min(100, prev.mastery.reading + 2)
        }
      };
    });

    sound.playLevelUp();
    try {
      confetti({ particleCount: 60, spread: 60 });
    } catch {
      // ignore
    }
  };

  const recentSessions = profile.fluencySessions || [];

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
          <div className="bg-gradient-to-r from-teal-800 via-emerald-800 to-teal-950 p-5 sm:p-6 text-white relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center text-2xl shadow-inner">
                  ⏱️
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                    Leesvloeiendheid &amp; WPM Test
                  </h2>
                  <p className="text-xs sm:text-sm text-teal-200">
                    Meet jouw leessnelheid, ritme en nauwkeurigheid in woorden per minuut
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

            {/* Passage Selector */}
            <div className="flex items-center gap-2 mt-4">
              {FLUENCY_TEST_PASSAGES.map((p, idx) => (
                <button
                  key={p.id}
                  disabled={isTesting}
                  onClick={() => {
                    setSelectedPassageIdx(idx);
                    setCompletedSession(null);
                    sound.playPop();
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedPassageIdx === idx
                      ? 'bg-amber-400 text-slate-950 shadow-sm'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {p.grade === 'group_4_5' ? 'Groep 4-5 Tekst' : 'Groep 6-7-8 Tekst'} ({p.totalWords}w)
                </button>
              ))}
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-5 sm:p-6 space-y-5 overflow-y-auto max-h-[70vh]">
            {!completedSession ? (
              <div className="space-y-4">
                {/* Passage Box */}
                <div className="bg-amber-50/60 border-2 border-amber-200 rounded-2xl p-5 shadow-xs relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black uppercase text-amber-900 tracking-wider">
                      📜 {passage.title}
                    </span>
                    <button
                      onClick={() => sound.speak(passage.text)}
                      className="p-1.5 rounded-lg bg-amber-200/70 hover:bg-amber-300 text-amber-950 text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Voorleesvoorbeeld</span>
                    </button>
                  </div>

                  <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
                    {passage.text}
                  </p>

                  <div className="mt-3 flex items-center justify-between text-[11px] text-amber-900/80 font-bold border-t border-amber-200/60 pt-2">
                    <span>Totaal: {totalWords} woorden</span>
                    <span>Streefsnelheid: ~{passage.targetWpm} WPM</span>
                  </div>
                </div>

                {/* Live Controls */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-100 border border-teal-300 flex items-center justify-center text-teal-800 font-black text-sm">
                      <Timer className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-bold">Verstreken Tijd:</div>
                      <div className="text-xl font-black text-slate-900">{secondsElapsed}s</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {!isTesting ? (
                      <button
                        onClick={handleStartTest}
                        className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 shadow-md cursor-pointer"
                      >
                        <Play className="w-4 h-4" />
                        <span>Start Leesopname</span>
                      </button>
                    ) : (
                      <button
                        onClick={handleFinishTest}
                        className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 shadow-md animate-pulse cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Klaar met Lezen</span>
                      </button>
                    )}
                  </div>
                </div>

                {isTesting && spokenTranscript && (
                  <div className="p-3 bg-white border border-teal-200 rounded-xl text-xs space-y-1">
                    <span className="font-bold text-teal-900">Live Herkenning:</span>
                    <p className="text-slate-700 italic">"{spokenTranscript}"</p>
                  </div>
                )}
              </div>
            ) : (
              /* Session Results */
              <div className="space-y-4 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-teal-100 border-2 border-teal-300 text-3xl shadow-sm">
                  🎯
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-black text-slate-900">
                    Geweldig Gelezen, {profile.name}!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Jouw leestest is succesvol geanalyseerd en opgeslagen in jouw portfolio.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-left">
                  <div className="p-3 bg-teal-50 rounded-2xl border border-teal-200">
                    <span className="text-xs font-bold text-teal-800">⚡ Snelheid</span>
                    <p className="text-xl font-black text-teal-950">{completedSession.wpm} <span className="text-xs font-normal">WPM</span></p>
                  </div>
                  <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200">
                    <span className="text-xs font-bold text-emerald-800">🎯 Nauwkeurigheid</span>
                    <p className="text-xl font-black text-emerald-950">{completedSession.accuracyPct}%</p>
                  </div>
                  <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200">
                    <span className="text-xs font-bold text-amber-800">⏱️ Leestijd</span>
                    <p className="text-xl font-black text-amber-950">{completedSession.durationSeconds}s</p>
                  </div>
                  <div className="p-3 bg-indigo-50 rounded-2xl border border-indigo-200">
                    <span className="text-xs font-bold text-indigo-800">🏆 Fluency Score</span>
                    <p className="text-xl font-black text-indigo-950">{completedSession.fluencyScore}%</p>
                  </div>
                </div>

                <div className="flex gap-2 justify-center pt-2">
                  <button
                    onClick={() => {
                      setCompletedSession(null);
                      setSecondsElapsed(0);
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Nog een keer testen</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider cursor-pointer"
                  >
                    Opslaan &amp; Sluiten (+40 🌟)
                  </button>
                </div>
              </div>
            )}

            {/* Historical Trend List */}
            {recentSessions.length > 0 && (
              <div className="border-t border-slate-200 pt-4 space-y-2 text-left">
                <div className="flex items-center justify-between text-xs font-black text-slate-800 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                    <span>Recente Vloeiendheidsmetingen</span>
                  </span>
                  <span className="text-slate-500 font-normal">{recentSessions.length} sessies</span>
                </div>

                <div className="space-y-2 max-h-36 overflow-y-auto">
                  {recentSessions.slice(0, 4).map((s) => (
                    <div key={s.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-slate-800">{s.passageTitle}</div>
                        <div className="text-[10px] text-slate-500">{s.date} • {s.durationSeconds} sec</div>
                      </div>
                      <div className="flex items-center gap-3 font-bold">
                        <span className="text-teal-700">{s.wpm} WPM</span>
                        <span className="text-emerald-700">{s.accuracyPct}% juist</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
