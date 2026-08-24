import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, BookOpen, Sparkles, Volume2, ArrowRight, CheckCircle2, RotateCcw, Award, Footprints } from 'lucide-react';
import { StoryAdventure, PlayerProfile, VocabularyWord } from '../types';
import { READING_ADVENTURES } from '../data/readingAdventuresData';
import { sound } from '../services/soundService';
import { speech } from '../services/speechService';
import { StoryCutsceneStage } from './StoryCutsceneStage';
import confetti from 'canvas-confetti';

interface ReadingAdventureModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: PlayerProfile;
  onUpdateProfile: (updater: (prev: PlayerProfile) => PlayerProfile) => void;
}

type AdventureStep = 'vocab_preview' | 'read_story' | 'comprehension' | 'sequencing' | 'summary' | 'completed';

export const ReadingAdventureModal: React.FC<ReadingAdventureModalProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile
}) => {
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);
  const [step, setStep] = useState<AdventureStep>('vocab_preview');
  const [activeParagraphIndex, setActiveParagraphIndex] = useState(0);
  const [isNarrating, setIsNarrating] = useState(false);
  const [readingSpeed, setReadingSpeed] = useState<number>(1.0);
  
  // Comprehension state
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [steppingStones, setSteppingStones] = useState<boolean[]>([]);

  // Sequencing state
  const [orderedSequenceIds, setOrderedSequenceIds] = useState<string[]>([]);
  const [isSequenceCorrect, setIsSequenceCorrect] = useState<boolean | null>(null);

  // Summary state
  const [summaryAnswers, setSummaryAnswers] = useState({ characters: '', problem: '', solution: '' });
  const [summarySaved, setSummarySaved] = useState(false);

  if (!isOpen) return null;

  const currentStory = READING_ADVENTURES[selectedStoryIndex] || READING_ADVENTURES[0];

  const handleStartStory = (index: number) => {
    sound.playPop();
    setSelectedStoryIndex(index);
    setStep('vocab_preview');
    setActiveParagraphIndex(0);
    setCurrentQIndex(0);
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
    setSteppingStones([]);
    setOrderedSequenceIds([]);
    setIsSequenceCorrect(null);
    setSummarySaved(false);
  };

  const handleSpeakWord = (word: VocabularyWord) => {
    sound.playPop();
    speech.speak(`${word.word}. ${word.meaning}. Voorbeeldzin: ${word.exampleSentence}`, { rate: readingSpeed });
  };

  const handleSpeakSyllables = (syllables: string[]) => {
    sound.playPop();
    speech.speakSyllables(syllables);
  };

  const handleNarrateStory = () => {
    if (isNarrating) {
      speech.stop();
      setIsNarrating(false);
      return;
    }

    setIsNarrating(true);
    const fullText = currentStory.paragraphs.join(' ');
    speech.speak(fullText, {
      rate: readingSpeed,
      onEnd: () => {
        setIsNarrating(false);
      }
    });
  };

  const handleAnswerQuestion = (idx: number) => {
    if (isAnswerChecked) return;
    setSelectedAnswer(idx);
    setIsAnswerChecked(true);

    const q = currentStory.comprehensionQuestions[currentQIndex];
    const isCorrect = idx === q.correctOptionIndex;

    if (isCorrect) {
      sound.playSuccess();
      confetti({ particleCount: 40, spread: 60 });
      setSteppingStones(prev => [...prev, true]);
      onUpdateProfile(prev => ({
        ...prev,
        score: prev.score + 15,
        coins: prev.coins + 10,
        mastery: {
          ...prev.mastery,
          readingComprehension: Math.min(100, prev.mastery.readingComprehension + 2)
        }
      }));
    } else {
      sound.playError();
      setSteppingStones(prev => [...prev, false]);
    }
  };

  const handleNextQuestion = () => {
    if (currentQIndex < currentStory.comprehensionQuestions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerChecked(false);
    } else {
      if (currentStory.sequenceEvents && currentStory.sequenceEvents.length > 0) {
        setStep('sequencing');
      } else {
        setStep('summary');
      }
    }
  };

  const handleSequenceClick = (id: string) => {
    sound.playPop();
    if (orderedSequenceIds.includes(id)) {
      setOrderedSequenceIds(prev => prev.filter(item => item !== id));
    } else {
      setOrderedSequenceIds(prev => [...prev, id]);
    }
  };

  const checkSequencing = () => {
    if (!currentStory.sequenceEvents) return;
    const isAllCorrect = currentStory.sequenceEvents.every((item, idx) => {
      return orderedSequenceIds[idx] === item.id;
    });

    if (isAllCorrect) {
      sound.playLevelUp();
      setIsSequenceCorrect(true);
      confetti({ particleCount: 70, spread: 80 });
      onUpdateProfile(prev => ({
        ...prev,
        score: prev.score + 25,
        mastery: {
          ...prev.mastery,
          reading: Math.min(100, prev.mastery.reading + 3)
        }
      }));
    } else {
      sound.playError();
      setIsSequenceCorrect(false);
    }
  };

  const handleFinishAdventure = () => {
    sound.playVictory();
    confetti({ particleCount: 100, spread: 90 });
    onUpdateProfile(prev => ({
      ...prev,
      storiesCompleted: (prev.storiesCompleted || 0) + 1,
      readingMinutes: (prev.readingMinutes || 0) + 10,
      score: prev.score + 50,
      coins: prev.coins + 30
    }));
    setStep('completed');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl border border-emerald-100 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-4 sm:p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl filter drop-shadow-xs">{currentStory.coverEmoji}</span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black">{currentStory.title}</h3>
                <span className="text-[10px] font-black uppercase bg-white/20 px-2 py-0.5 rounded-full">
                  {currentStory.grade === 'group_4_5' ? 'Groep 4-5' : 'Groep 6-7-8'}
                </span>
              </div>
              <p className="text-xs text-emerald-100 font-medium">{currentStory.subtitle}</p>
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

        {/* Story Selector Bar */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex items-center gap-2 overflow-x-auto">
          {READING_ADVENTURES.map((st, idx) => (
            <button
              key={st.id}
              onClick={() => handleStartStory(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black whitespace-nowrap cursor-pointer transition-all flex items-center gap-1.5 ${
                selectedStoryIndex === idx
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span>{st.coverEmoji}</span>
              <span>{st.title.split(' ')[1] || st.title}</span>
            </button>
          ))}
        </div>

        {/* Modal Body Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">

          {/* STEP 1: VOCABULARY PREVIEW */}
          {step === 'vocab_preview' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h4 className="text-base sm:text-lg font-black text-slate-800 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    <span>Stap 1: Woordenschat Voorproefje</span>
                  </h4>
                  <p className="text-xs text-slate-500">
                    Leer deze 3-4 speciale safariavontuur woorden vóórdat je het verhaal leest!
                  </p>
                </div>

                <button
                  onClick={() => {
                    sound.playPop();
                    setStep('read_story');
                  }}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Start met Lezen</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentStory.vocabulary.map((vocab, vIdx) => (
                  <div
                    key={vIdx}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-all flex flex-col justify-between gap-3 shadow-2xs"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{vocab.emoji}</span>
                          <span className="text-base font-black text-slate-800">{vocab.word}</span>
                        </div>
                        <button
                          onClick={() => handleSpeakWord(vocab)}
                          className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center cursor-pointer hover:bg-emerald-200"
                          title="Spreek uit"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Syllable Breakdown Mode */}
                      <div className="flex items-center gap-1.5 mt-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Stukjes:</span>
                        <div className="flex gap-1 flex-wrap">
                          {vocab.syllables.map((syl, sIdx) => (
                            <button
                              key={sIdx}
                              onClick={() => speech.speak(syl)}
                              className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-xs font-bold text-emerald-800 hover:bg-emerald-50 cursor-pointer"
                            >
                              {syl}
                            </button>
                          ))}
                        </div>
                        <button
                          onClick={() => handleSpeakSyllables(vocab.syllables)}
                          className="text-[10px] font-black text-emerald-700 hover:underline ml-1"
                        >
                          [Hak & Luister]
                        </button>
                      </div>

                      <p className="text-xs text-slate-600 mt-2 font-medium">
                        💡 <b>Betekenis:</b> {vocab.meaning}
                      </p>
                    </div>

                    <div className="bg-white p-2.5 rounded-xl border border-slate-100 text-xs text-slate-700 italic">
                      "{vocab.exampleSentence}"
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: READ ALONG STORY */}
          {step === 'read_story' && (
            <div className="space-y-4">
              
              {/* Dynamic Animated Adventure Stage */}
              <StoryCutsceneStage
                protagonist={profile.name.toLowerCase().includes('hemali') ? 'hemali' : 'ridheya'}
                pageTitle={currentStory.title}
                biomeName={`${currentStory.coverEmoji} ${currentStory.grade === 'group_4_5' ? 'Safaripark Borneo Dierenkliniek' : 'Gevorderd Safari Mysterie'}`}
                characterDialogue={currentStory.subtitle}
                characterEmote="excited"
                pageNumber={selectedStoryIndex + 1}
                totalPages={READING_ADVENTURES.length}
              />

              <div className="flex items-center justify-between flex-wrap gap-2 bg-emerald-50 p-3 rounded-2xl border border-emerald-200">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-700" />
                  <span className="text-xs font-black text-emerald-950 uppercase tracking-wide">
                    Lees-Met-Mij Modus
                  </span>
                </div>

                {/* Speed Controls */}
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-slate-600">Snelheid:</span>
                  {[0.75, 1.0, 1.25].map(spd => (
                    <button
                      key={spd}
                      onClick={() => setReadingSpeed(spd)}
                      className={`px-2 py-0.5 rounded-lg text-xs font-black cursor-pointer ${
                        readingSpeed === spd
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white text-slate-600 border border-slate-200'
                      }`}
                    >
                      {spd}x
                    </button>
                  ))}

                  <button
                    onClick={handleNarrateStory}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 cursor-pointer shadow-xs ${
                      isNarrating
                        ? 'bg-amber-500 text-white animate-pulse'
                        : 'bg-emerald-600 text-white'
                    }`}
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>{isNarrating ? 'Pauzeer Audio' : 'Lees Voor (AI Stem)'}</span>
                  </button>
                </div>
              </div>

              {/* Story Paragraphs */}
              <div className="space-y-3 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs leading-relaxed text-slate-800 text-base sm:text-lg font-medium">
                {currentStory.paragraphs.map((para, pIdx) => (
                  <p key={pIdx} className="hover:bg-emerald-50/50 p-2 rounded-xl transition-colors">
                    {para}
                  </p>
                ))}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => {
                    sound.playPop();
                    setStep('comprehension');
                  }}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black text-sm flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Naar de Vragen &amp; Rivieroversteek</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: COMPREHENSION & RIVER CROSSING */}
          {step === 'comprehension' && (
            <div className="space-y-5">
              {/* River Stepping Stones Visual */}
              <div className="bg-gradient-to-r from-sky-100 to-blue-100 p-4 rounded-2xl border border-sky-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-sky-950 font-black text-xs uppercase">
                    <Footprints className="w-4 h-4 text-sky-700" />
                    <span>Rivieroversteek Spel: Help het dier oversteken!</span>
                  </div>
                  <span className="text-[11px] font-bold text-sky-800">
                    Vraag {currentQIndex + 1} van {currentStory.comprehensionQuestions.length}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2 overflow-x-auto py-2">
                  <span className="text-2xl">🏝️</span>
                  {currentStory.comprehensionQuestions.map((_, sIdx) => {
                    const isStoneWon = steppingStones[sIdx] === true;
                    return (
                      <div
                        key={sIdx}
                        className={`flex-1 h-8 rounded-xl border-2 flex items-center justify-center font-black text-xs transition-all ${
                          isStoneWon
                            ? 'bg-amber-300 border-amber-500 text-amber-950 shadow-md shadow-amber-500/30'
                            : sIdx === currentQIndex
                            ? 'bg-white border-sky-400 animate-bounce'
                            : 'bg-sky-200/50 border-sky-300 text-sky-600'
                        }`}
                      >
                        {isStoneWon ? '🪨 Stap!' : `Vraag ${sIdx + 1}`}
                      </div>
                    );
                  })}
                  <span className="text-2xl">🌴</span>
                </div>
              </div>

              {/* Question Card */}
              {(() => {
                const q = currentStory.comprehensionQuestions[currentQIndex];
                return (
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                    <h4 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                      {q.question}
                    </h4>

                    <div className="grid grid-cols-1 gap-2.5">
                      {q.options?.map((opt, optIdx) => {
                        let btnStyle = 'bg-white hover:bg-slate-100 border-slate-200 text-slate-800';
                        if (isAnswerChecked) {
                          if (optIdx === q.correctOptionIndex) {
                            btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-black';
                          } else if (optIdx === selectedAnswer) {
                            btnStyle = 'bg-red-100 border-red-400 text-red-950';
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={isAnswerChecked}
                            onClick={() => handleAnswerQuestion(optIdx)}
                            className={`p-3.5 rounded-xl border-2 text-left text-sm font-bold cursor-pointer transition-all flex items-center justify-between ${btnStyle}`}
                          >
                            <span>{opt}</span>
                            {isAnswerChecked && optIdx === q.correctOptionIndex && (
                              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {isAnswerChecked && (
                      <div className="flex justify-end pt-2">
                        <button
                          onClick={handleNextQuestion}
                          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black text-sm flex items-center gap-1.5 cursor-pointer shadow-md"
                        >
                          <span>Volgende ➔</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}

          {/* STEP 4: STORY SEQUENCING */}
          {step === 'sequencing' && currentStory.sequenceEvents && (
            <div className="space-y-4">
              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200">
                <h4 className="text-base font-black text-amber-950 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-600" />
                  <span>Verhaal Volgorde: Zet de gebeurtenissen op een rij!</span>
                </h4>
                <p className="text-xs text-amber-800 mt-1">
                  Klik op de gebeurtenissen in de volgorde waarin ze in het verhaal plaatsvonden (1 t/m 4).
                </p>
              </div>

              <div className="space-y-2">
                {currentStory.sequenceEvents.map((evt, idx) => {
                  const pickIndex = orderedSequenceIds.indexOf(evt.id);
                  const isPicked = pickIndex !== -1;

                  return (
                    <button
                      key={evt.id}
                      onClick={() => handleSequenceClick(evt.id)}
                      className={`w-full p-3.5 rounded-xl border-2 text-left font-bold text-xs sm:text-sm cursor-pointer transition-all flex items-center justify-between ${
                        isPicked
                          ? 'bg-amber-100 border-amber-400 text-amber-950 shadow-xs'
                          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      <span>{evt.text}</span>
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${
                        isPicked ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-600'
                      }`}>
                        {isPicked ? pickIndex + 1 : idx + 1}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={() => setOrderedSequenceIds([])}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Opnieuw kiezen</span>
                </button>

                <button
                  disabled={orderedSequenceIds.length !== currentStory.sequenceEvents.length}
                  onClick={checkSequencing}
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white rounded-xl font-black text-xs sm:text-sm cursor-pointer shadow-md"
                >
                  Controleer Volgorde ✨
                </button>
              </div>

              {isSequenceCorrect !== null && (
                <div className={`p-4 rounded-xl text-xs font-bold ${
                  isSequenceCorrect
                    ? 'bg-emerald-100 text-emerald-950 border border-emerald-300'
                    : 'bg-red-100 text-red-950 border border-red-300'
                }`}>
                  {isSequenceCorrect ? (
                    <div className="flex items-center justify-between">
                      <span>🎉 Geweldig! De volgorde klopt helemaal!</span>
                      <button
                        onClick={() => setStep('summary')}
                        className="px-3 py-1 bg-emerald-700 text-white rounded-lg text-xs font-black"
                      >
                        Naar Samenvatting ➔
                      </button>
                    </div>
                  ) : (
                    <span>💡 Probeer het nog eens: wie zag je als eerste en wat gebeurde er als laatste?</span>
                  )}
                </div>
              )}
            </div>
          )}

          {/* STEP 5: SUMMARY COACHING */}
          {step === 'summary' && (
            <div className="space-y-4">
              <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-200">
                <h4 className="text-base font-black text-indigo-950 flex items-center gap-2">
                  <Award className="w-5 h-5 text-indigo-600" />
                  <span>Samenvattingscoach: Vertel het in je eigen woorden!</span>
                </h4>
                <p className="text-xs text-indigo-800 mt-1">
                  Beantwoord kort de drie belangrijkste vragen over het verhaal.
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-black text-slate-700 mb-1">
                    1. Wie waren de belangrijkste personages?
                  </label>
                  <input
                    type="text"
                    value={summaryAnswers.characters}
                    onChange={(e) => setSummaryAnswers(prev => ({ ...prev, characters: e.target.value }))}
                    placeholder="Bijv: Ella het olifantje, Boerin Tess en Max..."
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 mb-1">
                    2. Wat was het probleem in het verhaal?
                  </label>
                  <input
                    type="text"
                    value={summaryAnswers.problem}
                    onChange={(e) => setSummaryAnswers(prev => ({ ...prev, problem: e.target.value }))}
                    placeholder="Bijv: Ella was verdwaald geraakt..."
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 mb-1">
                    3. Hoe werd het probleem opgelost?
                  </label>
                  <input
                    type="text"
                    value={summaryAnswers.solution}
                    onChange={(e) => setSummaryAnswers(prev => ({ ...prev, solution: e.target.value }))}
                    placeholder="Bijv: Ze volgden de pootafdrukken naar de waterpoel..."
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleFinishAdventure}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-sm flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-600/30"
                >
                  <Award className="w-5 h-5" />
                  <span>Voltooi Avontuur &amp; Ontvang Beloning!</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 6: COMPLETED */}
          {step === 'completed' && (
            <div className="text-center py-8 space-y-4">
              <div className="text-6xl animate-bounce">🏆</div>
              <h3 className="text-2xl font-black text-slate-800">
                Gefeliciteerd, {profile.name}!
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Je hebt het verhaal "{currentStory.title}" succesvol gelezen en alle opdrachten voltooid!
              </p>
              <div className="flex justify-center gap-3">
                <span className="px-4 py-2 rounded-xl bg-amber-100 text-amber-800 font-black text-xs">
                  +50 Score 🌟
                </span>
                <span className="px-4 py-2 rounded-xl bg-emerald-100 text-emerald-800 font-black text-xs">
                  +30 Munten 🪙
                </span>
                <span className="px-4 py-2 rounded-xl bg-indigo-100 text-indigo-800 font-black text-xs">
                  +10 Leesminuten 📖
                </span>
              </div>
              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black text-sm cursor-pointer shadow-md"
                >
                  Terug naar het Safaripark ➔
                </button>
              </div>
            </div>
          )}

        </div>
      </motion.div>
    </div>
  );
};
