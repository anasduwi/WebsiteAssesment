import { QUESTION_BANK } from "./question-bank";

export type ScoreSummary = {
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unansweredQuestions: number;
  finalScore: number;
  passed: boolean;
};

export function calculateScore(
  selectedAnswers: Record<number, "A" | "B" | "C" | "D">,
  passingGrade = 70,
): ScoreSummary {
  const totalQuestions = QUESTION_BANK.length;

  let correctAnswers = 0;
  let incorrectAnswers = 0;
  let unansweredQuestions = 0;

  for (const question of QUESTION_BANK) {
    const selectedOption = selectedAnswers[question.question_number];

    if (!selectedOption) {
      unansweredQuestions += 1;
      continue;
    }

    if (selectedOption === question.correct_option) {
      correctAnswers += 1;
    } else {
      incorrectAnswers += 1;
    }
  }

  const finalScore = Number(((correctAnswers / totalQuestions) * 100).toFixed(2));

  return {
    totalQuestions,
    correctAnswers,
    incorrectAnswers,
    unansweredQuestions,
    finalScore,
    passed: finalScore >= passingGrade,
  };
}
