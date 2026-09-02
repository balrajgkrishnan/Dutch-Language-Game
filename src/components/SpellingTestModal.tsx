import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion } from 'motion/react';
import { X, Volume2, CheckCircle2, XCircle, Maximize2, Minimize2, Trophy } from 'lucide-react';
import { PlayerProfile, SpellingFactoryItem, TestResult } from '../types';
import { SPELLING_GROEP_3_5, SPELLING_GROEP_6_8 } from '../data/comprehensiveSpellingData';
import { fisherYatesShuffle } from '../data/werkwoorden';
import { sound } from '../services/soundService';
import { speech } from '../services/speechService';
import { useFullscreen } from '../hooks/useFullscreen';
import { useQuizSession } from '../hooks/useQuizSession';
import { getEffectiveGrade } from '../utils/gradeTier';
import confetti from 'canvas-confetti';

interface SpellingTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: PlayerProfile;
  onUpdateProfile: (updater: (prev: PlayerProfile) => PlayerProfile) => void;
}

const TEST_LENGTH = 50;

function buildQuestions(pool: SpellingFactoryItem[]): SpellingFactoryItem[] {
  return fisherYatesShuffle(pool).slice(0, Math.min(TEST_LENGTH, pool.length));
}

export const SpellingTestModal: React.FC<SpellingTestModalProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile
}) => {
  const { isFullscreen, containerRef, toggleFullscreen } = useFullscreen<HTMLDivElement>();
  const isRidheya = profile.name.toLowerCase().includes('ridheya');
  const effectiveGrade = getEffectiveGrade(profile, isRidheya);
  const gradePool = effectiveGrade === 'group_4_5' ? SPELLING_GROEP_3_5 : SPELLING_GROEP_6_8;

  const [questions, setQuestions] = useState<SpellingFactoryItem[]>([]);
  const [typedAnswer, setTypedAnswer] = useState('');
  const session = useQuizSession<SpellingFactoryItem>(questions);
  const hasRecordedRef = useRef(false);

  useEffect(() => {
    if (!isOpen) return;
    setQuestions(buildQuestions(gradePool));
    session.reset();
    setTypedAnswer('');
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
      id: `spelling-${Date.now()}`,
      gameType: 'spelling',
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
      mastery: { ...prev.mastery, spelling: Math.min(100, prev.mastery.spelling + Math.round(correct / 5)) },
      testAttempts: [...(prev.testAttempts || []), result]
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.isComplete]);

  // options[0] is always the correct answer in the data (authoring convention),
  // so it must be shuffled before display or the answer is trivially the first chip.
  const displayOptions = useMemo(
    () => (session.currentQuestion ? fisherYatesShuffle(session.currentQuestion.options) : []),
    [session.currentQuestion?.id]
  );

  if (!isOpen) return null;

  const q = session.currentQuestion;
  const correctSyllable = q ? q.syllables[q.missingIndex] : '';

  const handleSubmit = () => {
    if (!q || session.isAnswerChecked || !typedAnswer.trim()) return;
    const isCorrect = typedAnswer.trim().toLowerCase() === correctSyllable.toLowerCase();
    session.submitAnswer(typedAnswer.trim(), isCorrect);
    sound[isCorrect ? 'playCorrect' : 'playIncorrect']();
  };

  const handleNext = () => {
    setTypedAnswer('');
    session.nextQuestion();
  };

  const handleRestart = () => {
    setQuestions(buildQuestions(gradePool));
    session.reset();
    setTypedAnswer('');
    hasRecordedRef.current = false;
    sound.playPop();
  };

  const maskedWord = q
    ? q.syllables.map((syl, i) => (i === q.missingIndex ? '•'.repeat(syl.length) : syl)).join('-')
    : '';

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
            : 'w-full max-w-2xl rounded-3xl shadow-2xl border border-violet-100 max-h-[92vh]'
        } overflow-hidden flex flex-col`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-violet-700 p-4 sm:p-5 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-3xl shadow-inner">
              🎯
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg sm:text-xl font-black">Spelling Toets</h3>
                <span className="text-[10px] font-black uppercase bg-white/20 px-2 py-0.5 rounded-full border border-white/30">
                  {effectiveGrade === 'group_4_5' ? 'Groep 3-5' : 'Groep 6-8'}
                </span>
              </div>
              <p className="text-xs text-violet-100 font-medium">
                {questions.length} vragen • Typ de ontbrekende klankgroep
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
                <span className="bg-violet-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase">
                  Vraag {session.index + 1}/{questions.length}
                </span>
                <button
                  onClick={() => speech.speak(q.word, { rate: 0.8 })}
                  className="bg-violet-50 hover:bg-violet-100 text-violet-800 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 cursor-pointer border border-violet-200 transition-colors"
                >
                  <Volume2 className="w-3.5 h-3.5 text-violet-600" />
                  <span>Lees Voor</span>
                </button>
              </div>

              <div className="bg-gradient-to-r from-violet-50 via-purple-50 to-amber-50 border border-violet-200/80 rounded-2xl p-5 text-center">
                <span className="text-[11px] uppercase tracking-widest text-violet-800 font-black">
                  Vul de ontbrekende klankgroep in
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-0.5 tracking-wide">{maskedWord}</h2>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="flex flex-col gap-2 items-center">
                <input
                  type="text"
                  autoFocus
                  disabled={session.isAnswerChecked}
                  value={typedAnswer}
                  onChange={(e) => setTypedAnswer(e.target.value)}
                  placeholder="typ hier..."
                  className="w-full max-w-xs bg-slate-50 text-slate-800 font-black text-lg py-3 px-4 rounded-2xl border-2 border-violet-300 text-center outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-70"
                />
                <div className="flex flex-wrap items-center justify-center gap-1.5">
                  {displayOptions.map((opt, i) => (
                    <button
                      key={i}
                      type="button"
                      disabled={session.isAnswerChecked}
                      onClick={() => setTypedAnswer(opt)}
                      className="text-xs font-bold px-3 py-1.5 rounded-xl border transition-all cursor-pointer bg-slate-100 hover:bg-violet-50 text-slate-700 border-slate-200 disabled:opacity-50"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {!session.isAnswerChecked && (
                  <button
                    type="submit"
                    disabled={!typedAnswer.trim()}
                    className="mt-1 w-full max-w-xs bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white text-base font-black py-3 rounded-2xl shadow-md shadow-violet-700/20 uppercase tracking-wider cursor-pointer active:scale-98"
                  >
                    Controleer ➔
                  </button>
                )}
              </form>

              {session.isAnswerChecked && (
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-3">
                  <div className={`p-4 rounded-2xl border text-left ${
                    session.answersHistory[q.id]?.correct
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                      : 'bg-rose-50 border-rose-300 text-rose-900'
                  }`}>
                    <div className="flex items-center gap-2 mb-1">
                      {session.answersHistory[q.id]?.correct ? (
                        <><CheckCircle2 className="w-5 h-5 text-emerald-600" /><span className="font-black text-sm uppercase">Goed zo!</span></>
                      ) : (
                        <><XCircle className="w-5 h-5 text-rose-600" /><span className="font-black text-sm uppercase">Het juiste woord was: {q.word}</span></>
                      )}
                    </div>
                    <p className="text-xs font-bold mt-1">{q.soundRule}</p>
                    <p className="text-xs italic mt-2 border-t border-black/10 pt-2">"{q.exampleSentence}"</p>
                  </div>
                  <button
                    onClick={handleNext}
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
                  className="bg-violet-600 hover:bg-violet-700 text-white text-sm font-black px-5 py-3 rounded-2xl cursor-pointer active:scale-98"
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
