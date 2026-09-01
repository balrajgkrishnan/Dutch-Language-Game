import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { X, Volume2, CheckCircle2, XCircle, Maximize2, Minimize2, Trophy } from 'lucide-react';
import { PlayerProfile, VerbItem, TestResult } from '../types';
import { WERKWOORDEN_DATA, getImperfectumOptions, fisherYatesShuffle } from '../data/werkwoorden';
import { sound } from '../services/soundService';
import { speech } from '../services/speechService';
import { useFullscreen } from '../hooks/useFullscreen';
import { useQuizSession } from '../hooks/useQuizSession';
import { getEffectiveGrade } from '../utils/gradeTier';
import confetti from 'canvas-confetti';

interface SterkeWerkwoordenTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: PlayerProfile;
  onUpdateProfile: (updater: (prev: PlayerProfile) => PlayerProfile) => void;
}

interface WerkwoordTestQuestion {
  id: string;
  verb: VerbItem;
  options: string[];
  correctAnswer: string;
}

const TEST_LENGTH = 50;

function buildQuestions(pool: VerbItem[]): WerkwoordTestQuestion[] {
  const picked = fisherYatesShuffle(pool).slice(0, Math.min(TEST_LENGTH, pool.length));
  return picked.map(verb => ({
    id: verb.infinitief,
    verb,
    options: getImperfectumOptions(verb, pool, 4),
    correctAnswer: verb.imperfectum_ev
  }));
}

export const SterkeWerkwoordenTestModal: React.FC<SterkeWerkwoordenTestModalProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile
}) => {
  const { isFullscreen, containerRef, toggleFullscreen } = useFullscreen<HTMLDivElement>();
  const isRidheya = profile.name.toLowerCase().includes('ridheya');
  const effectiveGrade = getEffectiveGrade(profile, isRidheya);
  const tierPool = effectiveGrade === 'group_4_5'
    ? WERKWOORDEN_DATA.filter(v => v.tier === 'beginner')
    : WERKWOORDEN_DATA.filter(v => v.tier === 'intermediate' || v.tier === 'advanced');

  const [questions, setQuestions] = useState<WerkwoordTestQuestion[]>([]);
  const session = useQuizSession<WerkwoordTestQuestion>(questions);
  const hasRecordedRef = useRef(false);

  useEffect(() => {
    if (!isOpen) return;
    setQuestions(buildQuestions(tierPool));
    session.reset();
    hasRecordedRef.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    if (!session.isComplete || hasRecordedRef.current || questions.length === 0) return;
    hasRecordedRef.current = true;

    const { correct, total, percentage } = session.report();
    sound.playVictory();
    confetti({ particleCount: 100, spread: 90 });

    const result: TestResult = {
      id: `werkwoorden-${Date.now()}`,
      gameType: 'werkwoorden',
      grade: effectiveGrade,
      dateFormatted: new Date().toLocaleDateString('nl-NL'),
      timestamp: Date.now(),
      correct,
      total,
      percentage
    };

    onUpdateProfile(prev => ({
      ...prev,
      score: prev.score + correct * 15,
      coins: prev.coins + correct * 5,
      mastery: { ...prev.mastery, grammar: Math.min(100, prev.mastery.grammar + Math.round(correct / 5)) },
      testAttempts: [...(prev.testAttempts || []), result]
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.isComplete]);

  if (!isOpen) return null;

  const q = session.currentQuestion;

  const handleSelect = (opt: string) => {
    if (session.isAnswerChecked || !q) return;
    const isCorrect = opt.toLowerCase() === q.correctAnswer.toLowerCase();
    session.submitAnswer(opt, isCorrect);
    sound[isCorrect ? 'playCorrect' : 'playIncorrect']();
  };

  const handleRestart = () => {
    setQuestions(buildQuestions(tierPool));
    session.reset();
    hasRecordedRef.current = false;
    sound.playPop();
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${isFullscreen ? 'p-0' : 'p-3 sm:p-4'} bg-slate-950/60 backdrop-blur-sm overflow-y-auto`}>
      <motion.div
        ref={containerRef}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className={`bg-white ${
          isFullscreen
            ? 'w-full h-full max-w-none max-h-none rounded-none border-0'
            : 'w-full max-w-2xl rounded-3xl shadow-2xl border border-emerald-100 max-h-[92vh]'
        } overflow-hidden flex flex-col`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 p-4 sm:p-5 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-3xl shadow-inner">
              🎯
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg sm:text-xl font-black">Sterke Werkwoorden Toets</h3>
                <span className="text-[10px] font-black uppercase bg-white/20 px-2 py-0.5 rounded-full border border-white/30">
                  {effectiveGrade === 'group_4_5' ? 'Groep 3-5' : 'Groep 6-8'}
                </span>
              </div>
              <p className="text-xs text-emerald-100 font-medium">
                {questions.length} vragen • Geen tweede kans, gewoon je best doen!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleFullscreen}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-all"
              title={isFullscreen ? 'Verlaat Volledig Scherm' : 'Volledig Scherm'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => { speech.stop(); onClose(); }}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 sm:p-7">
          {!session.isComplete && q && (
            <motion.div key={q.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="bg-emerald-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase">
                  Vraag {session.index + 1}/{questions.length}
                </span>
                <button
                  onClick={() => speech.speak(q.verb.infinitief, { rate: 0.85 })}
                  className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 cursor-pointer border border-emerald-200 transition-colors"
                >
                  <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Lees Voor</span>
                </button>
              </div>

              <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50 border border-emerald-200/80 rounded-2xl p-5 text-center">
                <span className="text-[11px] uppercase tracking-widest text-emerald-800 font-black">
                  Wat is de verleden tijd (ik-vorm)?
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-0.5">{q.verb.infinitief}</h2>
                <p className="text-xs font-bold text-slate-500 mt-1">🇬🇧 {q.verb.english}</p>
              </div>

              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                {q.options.map((opt, idx) => {
                  const isSelected = session.selectedOption === opt;
                  const isTargetCorrect = opt.toLowerCase() === q.correctAnswer.toLowerCase();
                  let btnStyle = 'bg-white text-slate-800 border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 shadow-sm';
                  if (session.isAnswerChecked) {
                    if (isTargetCorrect) btnStyle = 'bg-emerald-500 text-white border-emerald-600 shadow-md';
                    else if (isSelected) btnStyle = 'bg-rose-500 text-white border-rose-600 shadow-md';
                  }
                  return (
                    <button
                      key={idx}
                      disabled={session.isAnswerChecked}
                      onClick={() => handleSelect(opt)}
                      className={`py-3.5 px-3 rounded-2xl font-black text-base sm:text-lg border-2 transition-all cursor-pointer text-center active:scale-98 ${btnStyle}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {session.isAnswerChecked && (
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-3">
                  {q.verb.example && (
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs italic text-slate-600">
                      "{q.verb.example.nl}"
                    </div>
                  )}
                  <button
                    onClick={session.nextQuestion}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white text-base font-black py-3.5 rounded-2xl shadow-md shadow-amber-600/20 uppercase tracking-wider cursor-pointer active:scale-98"
                  >
                    Volgende ➔
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {session.isComplete && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center gap-4 py-4">
              <Trophy className="w-16 h-16 text-amber-500" />
              <h2 className="text-2xl font-black text-slate-900">Toets Voltooid!</h2>
              {(() => {
                const { correct, total, percentage } = session.report();
                return (
                  <>
                    <p className="text-lg font-bold text-slate-700">
                      {correct}/{total} goed ({percentage}%)
                    </p>
                    <div className="flex items-center gap-2 text-sm font-bold">
                      {percentage >= 80 ? (
                        <span className="text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Uitstekend!</span>
                      ) : percentage >= 50 ? (
                        <span className="text-amber-600 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Goed gedaan!</span>
                      ) : (
                        <span className="text-rose-600 flex items-center gap-1"><XCircle className="w-4 h-4" /> Blijf oefenen!</span>
                      )}
                    </div>
                  </>
                );
              })()}
              <div className="flex gap-3 mt-2">
                <button
                  onClick={handleRestart}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-black px-5 py-3 rounded-2xl cursor-pointer active:scale-98"
                >
                  Opnieuw Proberen
                </button>
                <button
                  onClick={onClose}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-black px-5 py-3 rounded-2xl cursor-pointer active:scale-98"
                >
                  Sluiten
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
