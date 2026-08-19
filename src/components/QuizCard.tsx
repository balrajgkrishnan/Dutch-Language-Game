import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Lightbulb, CheckCircle2, ArrowRight, RotateCcw, Sparkles, BookOpen } from 'lucide-react';
import { Question, Animal, BiomeType, Level } from '../types';
import { ALL_BIOME_ANIMALS } from '../data/biomeData';
import { sound } from '../services/soundService';
import { AnimalAvatar } from './AnimalAvatar';
import { StoryDialogueCard } from './StoryDialogueCard';

interface QuizCardProps {
  question: Question;
  animal?: Animal;
  level?: Level;
  levelNumber?: number;
  questionNumber?: number;
  currentQuestionIndex?: number;
  totalQuestionsInLevel?: number;
  biome?: BiomeType;
  chapterTitle?: string;
  introStory?: string;
  playerName?: string;
  avatarEmoji?: string;
  onAnswerCorrect: (pointsEarned: number) => void;
  onAnswerIncorrect: () => void;
  onNextQuestion: () => void;
  onSpeakStory?: () => void;
}

export const QuizCard: React.FC<QuizCardProps> = ({
  question,
  animal,
  level,
  levelNumber,
  questionNumber,
  currentQuestionIndex,
  totalQuestionsInLevel,
  biome = 'farm',
  chapterTitle,
  introStory,
  playerName,
  avatarEmoji,
  onAnswerCorrect,
  onAnswerIncorrect,
  onNextQuestion,
  onSpeakStory
}) => {
  const activeAnimal: Animal = animal || (level && level.animalReward) || ALL_BIOME_ANIMALS[0];
  const activeLevelNum = levelNumber || (level && level.id) || 1;
  const activeQNum = questionNumber || (currentQuestionIndex !== undefined ? currentQuestionIndex + 1 : 1);
  const activeTotalQ = totalQuestionsInLevel || (level && level.questions ? level.questions.length : 1);
  const activeChapter = chapterTitle || (level && level.title) || `Level ${activeLevelNum}: ${activeAnimal.name}`;
  const activeIntroStory = introStory || (level && level.introStory) || question.shortStory || `Boerin Tess en ${activeAnimal.name} zijn op zoek naar het juiste woord!`;

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [spelledLetters, setSpelledLetters] = useState<string[]>([]);
  const [availableLetters, setAvailableLetters] = useState<string[]>([]);
  const [shuffledOptions, setShuffledOptions] = useState<{ text: string; isCorrect: boolean }[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHintAfterError, setShowHintAfterError] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);

  // Helper to thoroughly scramble letters
  const scrambleLetters = (letters: string[], targetWord?: string): string[] => {
    const arr = [...letters];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    // If it accidentally equals target word and has at least 2 letters, swap first two
    if (targetWord && arr.join('').toUpperCase() === targetWord.toUpperCase() && arr.length > 1) {
      [arr[0], arr[1]] = [arr[1], arr[0]];
    }
    return arr;
  };

  // Initialize or reset question state
  useEffect(() => {
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(null);
    setShowHintAfterError(false);
    setFailedAttempts(0);

    // Shuffle options so correct answer is NOT always in the same position
    if ((question.type === 'choice' || question.type === 'comprehension') && question.options) {
      const mapped = question.options.map((opt, idx) => ({
        text: opt,
        isCorrect: idx === question.correctOptionIndex
      }));
      // Fisher-Yates shuffle
      for (let i = mapped.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [mapped[i], mapped[j]] = [mapped[j], mapped[i]];
      }
      setShuffledOptions(mapped);
    } else {
      setShuffledOptions([]);
    }

    // Scramble spelling letters thoroughly
    if (question.type === 'spell') {
      const sourceLetters = question.scrambledLetters && question.scrambledLetters.length > 0
        ? question.scrambledLetters
        : question.targetWord ? question.targetWord.toUpperCase().split('') : [];
      setAvailableLetters(scrambleLetters(sourceLetters, question.targetWord));
      setSpelledLetters([]);
    }
  }, [question]);

  // Handle multiple choice selection
  const handleChoiceClick = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    sound.playPop();

    const optionItem = shuffledOptions[index];
    const correct = optionItem ? optionItem.isCorrect : index === question.correctOptionIndex;
    setIsAnswered(true);
    setIsCorrect(correct);

    if (correct) {
      sound.playCorrect();
      onAnswerCorrect(15);
    } else {
      sound.playIncorrect();
      setFailedAttempts(prev => prev + 1);
      setShowHintAfterError(true);
      onAnswerIncorrect();
    }
  };

  // Letter builder: Add letter
  const handleAddLetter = (letter: string, index: number) => {
    if (isAnswered && isCorrect) return;
    sound.playPop();
    const newSpelled = [...spelledLetters, letter];
    setSpelledLetters(newSpelled);

    const newAvail = [...availableLetters];
    newAvail.splice(index, 1);
    setAvailableLetters(newAvail);

    if (question.targetWord && newSpelled.length === question.targetWord.length) {
      const spelledWord = newSpelled.join('').toUpperCase();
      const target = question.targetWord.toUpperCase();
      const correct = spelledWord === target;

      setIsAnswered(true);
      setIsCorrect(correct);

      if (correct) {
        sound.playCorrect();
        onAnswerCorrect(20);
      } else {
        sound.playIncorrect();
        setFailedAttempts(prev => prev + 1);
        setShowHintAfterError(true);
        onAnswerIncorrect();
      }
    }
  };

  // Letter builder: Remove letter back to available
  const handleRemoveLetter = (index: number) => {
    if (isAnswered && isCorrect) return;
    sound.playPop();
    const letter = spelledLetters[index];
    const newSpelled = [...spelledLetters];
    newSpelled.splice(index, 1);
    setSpelledLetters(newSpelled);
    setAvailableLetters([...availableLetters, letter]);
  };

  // Reset letter builder for retry
  const handleResetLetters = () => {
    sound.playPop();
    setIsAnswered(false);
    setIsCorrect(null);
    const sourceLetters = question.scrambledLetters && question.scrambledLetters.length > 0
      ? question.scrambledLetters
      : question.targetWord ? question.targetWord.toUpperCase().split('') : [];
    setAvailableLetters(scrambleLetters(sourceLetters, question.targetWord));
    setSpelledLetters([]);
  };

  const handleReadAloud = () => {
    sound.playPop();
    const fullText = `${question.passage ? question.passage + '. ' : ''}${question.shortStory ? question.shortStory + '. ' : ''}${question.question}`;
    sound.speakDutch(fullText);
  };

  const storySnippet = activeIntroStory;

  return (
    <div id="quiz-card-container" className="w-full max-w-5xl mx-auto px-4 py-2 space-y-4">
      {/* Top Story Dialogue Narrative Card */}
      <StoryDialogueCard
        biome={biome}
        animal={activeAnimal}
        chapterTitle={activeChapter}
        storyText={storySnippet}
        passage={question.passage}
        onPetAnimal={() => sound.playAnimalHappy(activeAnimal.soundName)}
      />

      {/* Main Question & Interaction Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* Left Side: Question Brief & Animal Card */}
        <section className="lg:col-span-5 bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 shadow-xl shadow-emerald-950/5 border border-emerald-100 flex flex-col justify-between relative">
          <div>
            {/* Badges */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                {question.category}
              </span>
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                {activeQNum}/{activeTotalQ}
              </span>
            </div>

            {/* Question Text */}
            <h2 className="text-base sm:text-lg font-black text-slate-800 leading-snug">
              {question.question}
            </h2>
          </div>

          {/* Center Graphic */}
          <div className="flex flex-col items-center justify-center my-4">
            <div className="p-3 bg-gradient-to-br from-amber-50 to-emerald-50 rounded-2xl border border-amber-200/60 shadow-inner">
              <AnimalAvatar animalId={activeAnimal.id} size="lg" interactive={true} isAnimated={true} />
            </div>
            <span className="text-[11px] font-bold text-slate-500 mt-2">
              {activeAnimal.name} ({activeAnimal.title})
            </span>
          </div>

          {/* Hint Only Displays AFTER an Incorrect Attempt */}
          {question.hint && isAnswered && !isCorrect && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full bg-amber-50/90 border border-amber-200 rounded-2xl p-3.5 text-xs font-bold text-amber-900 flex items-start gap-2 shadow-xs"
            >
              <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-black text-amber-950 block mb-0.5">💡 Tip van je gids:</span>
                <span>{question.hint}</span>
              </div>
            </motion.div>
          )}
        </section>

        {/* Right Side: Options and Answer Area */}
        <section className="lg:col-span-7 flex flex-col justify-between gap-4">
          
          {/* Question Mode: Choice & Comprehension */}
          {(question.type === 'choice' || question.type === 'comprehension') && (shuffledOptions.length > 0 ? shuffledOptions : (question.options || []).map((o, i) => ({ text: o, isCorrect: i === question.correctOptionIndex }))) && (
            <div id="quiz-options-list" className="flex-1 flex flex-col justify-center gap-2.5">
              {(shuffledOptions.length > 0 ? shuffledOptions : (question.options || []).map((o, i) => ({ text: o, isCorrect: i === question.correctOptionIndex }))).map((optionItem, idx) => {
                const isSelected = selectedOption === idx;
                const isThisCorrect = optionItem.isCorrect;

                let cardClasses = 'group bg-white hover:bg-emerald-50/50 border border-slate-200 hover:border-emerald-400 rounded-2xl p-4 flex items-center justify-between transition-all shadow-sm hover:shadow-md cursor-pointer relative overflow-hidden';
                let markerClasses = 'w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-emerald-100 flex items-center justify-center font-black text-sm text-slate-500 group-hover:text-emerald-700 mr-3.5 flex-shrink-0';

                if (isAnswered) {
                  if (isThisCorrect) {
                    cardClasses = 'bg-emerald-50/90 border-2 border-emerald-500 rounded-2xl p-4 flex items-center justify-between shadow-md text-emerald-950 font-black';
                    markerClasses = 'w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-sm mr-3.5 flex-shrink-0';
                  } else if (isSelected && !isThisCorrect) {
                    cardClasses = 'bg-rose-50 border-2 border-rose-400 rounded-2xl p-4 flex items-center justify-between shadow-sm text-rose-800 line-through opacity-85';
                    markerClasses = 'w-9 h-9 rounded-xl bg-rose-200 text-rose-800 flex items-center justify-center font-black text-sm mr-3.5 flex-shrink-0';
                  } else {
                    cardClasses = 'bg-white/60 border border-slate-200 rounded-2xl p-4 flex items-center justify-between opacity-50 cursor-not-allowed';
                  }
                }

                return (
                  <motion.button
                    key={idx}
                    whileHover={!isAnswered ? { scale: 1.01 } : {}}
                    whileTap={!isAnswered ? { scale: 0.99 } : {}}
                    onClick={() => handleChoiceClick(idx)}
                    disabled={isAnswered}
                    className={cardClasses}
                  >
                    <div className="flex items-center text-left">
                      <div className={markerClasses}>
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <span className="text-sm sm:text-base font-bold text-slate-800">
                        {optionItem.text}
                      </span>
                    </div>

                    {isAnswered && isThisCorrect && (
                      <div className="bg-emerald-500 text-white p-1.5 rounded-full shadow-xs">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          )}

          {/* Question Mode: Spell / Letter Builder */}
          {question.type === 'spell' && question.targetWord && (
            <div className="flex-1 flex flex-col justify-center gap-5 bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-emerald-100 shadow-xl shadow-emerald-950/5">
              <div className="text-center">
                <span className="text-xs font-black uppercase tracking-wider text-slate-500 block mb-3">
                  Tik op de letters in de juiste volgorde:
                </span>

                {/* Spelled letters slots */}
                <div className="flex flex-wrap items-center justify-center gap-2 min-h-[56px] p-2 bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl">
                  {spelledLetters.length === 0 ? (
                    <span className="text-xs font-bold text-slate-400">
                      Klik op de letters hieronder om het woord te spellen...
                    </span>
                  ) : (
                    spelledLetters.map((char, idx) => (
                      <motion.button
                        key={`spelled-${idx}`}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        onClick={() => handleRemoveLetter(idx)}
                        disabled={isAnswered && isCorrect === true}
                        className={`w-11 h-11 rounded-xl text-lg font-black flex items-center justify-center shadow-md transition-all ${
                          isAnswered
                            ? isCorrect
                              ? 'bg-emerald-500 text-white shadow-emerald-500/20'
                              : 'bg-rose-500 text-white shadow-rose-500/20 animate-shake'
                            : 'bg-amber-400 hover:bg-amber-300 text-amber-950 shadow-amber-400/30 cursor-pointer active:scale-95'
                        }`}
                      >
                        {char}
                      </motion.button>
                    ))
                  )}
                </div>
              </div>

              {/* Available scrambled letters */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                {availableLetters.map((char, idx) => (
                  <motion.button
                    key={`avail-${idx}`}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => handleAddLetter(char, idx)}
                    disabled={isAnswered && isCorrect === true}
                    className="w-11 h-11 rounded-xl bg-white border-2 border-slate-300 hover:border-emerald-500 hover:bg-emerald-50 text-slate-800 text-lg font-black flex items-center justify-center shadow-sm cursor-pointer"
                  >
                    {char}
                  </motion.button>
                ))}
              </div>

              {/* Reset / retry button if incorrect */}
              {isAnswered && !isCorrect && (
                <div className="flex justify-center">
                  <button
                    onClick={handleResetLetters}
                    className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs uppercase tracking-wider rounded-xl cursor-pointer transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Opnieuw Proberen</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Action / Next Question Trigger Footer */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-emerald-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                id="voice-read-btn"
                onClick={handleReadAloud}
                className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 flex items-center justify-center cursor-pointer transition-colors"
                title="Lees vraag hardop voor"
              >
                <Volume2 className="w-5 h-5" />
              </button>
              <span className="text-xs font-bold text-slate-500">
                {isAnswered
                  ? isCorrect
                    ? '🎉 Geweldig gedaan!'
                    : '💡 Bekijk de tip en ga door!'
                  : 'Kies het beste antwoord'}
              </span>
            </div>

            {isAnswered && (
              <motion.button
                id="next-question-btn"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  sound.playPop();
                  onNextQuestion();
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 cursor-pointer"
              >
                <span>Volgende Vraag</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
