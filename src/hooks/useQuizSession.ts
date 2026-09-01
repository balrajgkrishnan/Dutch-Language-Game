import { useState, useCallback } from 'react';

export interface QuizAnswerRecord {
  chosen: string;
  correct: boolean;
}

export interface QuizReport {
  total: number;
  correct: number;
  percentage: number;
  answers: Record<string, QuizAnswerRecord>;
}

/**
 * Generic multi-question session state (index, current answer, history,
 * completion, a final report) -- independent from CitoRpgExamModal's own
 * quiz state so a bug here can't regress that working diagnostic feature.
 */
export function useQuizSession<Q extends { id: string }>(questions: Q[]) {
  const [index, setIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [answersHistory, setAnswersHistory] = useState<Record<string, QuizAnswerRecord>>({});

  const currentQuestion = questions[index];
  const isComplete = questions.length > 0 && index >= questions.length;

  const submitAnswer = useCallback((chosen: string, correct: boolean) => {
    if (!currentQuestion || isAnswerChecked) return;
    setSelectedOption(chosen);
    setIsAnswerChecked(true);
    setAnswersHistory(prev => ({ ...prev, [currentQuestion.id]: { chosen, correct } }));
  }, [currentQuestion, isAnswerChecked]);

  const nextQuestion = useCallback(() => {
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setIndex(i => i + 1);
  }, []);

  const reset = useCallback(() => {
    setIndex(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setAnswersHistory({});
  }, []);

  const report = useCallback((): QuizReport => {
    const answers = Object.values(answersHistory);
    const correct = answers.filter(a => a.correct).length;
    const total = questions.length;
    return {
      total,
      correct,
      percentage: total > 0 ? Math.round((correct / total) * 100) : 0,
      answers: answersHistory
    };
  }, [answersHistory, questions.length]);

  return {
    index,
    currentQuestion,
    selectedOption,
    isAnswerChecked,
    answersHistory,
    isComplete,
    submitAnswer,
    nextQuestion,
    reset,
    report
  };
}
