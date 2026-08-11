import { DimensionScore, Dimension, Question } from '../types/assessment';
import questionsData from '../../data/assessment-questions.json';

const questions: Question[] = questionsData as Question[];

export function calculateScore(answers: Record<string, string>): DimensionScore[] {
  const scoresByDimension: Record<string, number> = {};

  // Initialize dimensions to 0
  Object.values(Dimension).forEach((dim) => {
    scoresByDimension[dim] = 0;
  });

  // Evaluate answers
  questions.forEach((q) => {
    const userAnswer = answers[q.id];
    if (userAnswer && userAnswer === q.correctAnswer) {
      scoresByDimension[q.dimension] += 1;
    }
  });

  // Convert to percentage
  const dimensionScores: DimensionScore[] = Object.keys(scoresByDimension).map((dimName) => {
    const rawScore = scoresByDimension[dimName];
    // Max score per dimension is 5
    const percentageScore = (rawScore / 5) * 100;

    return {
      dimension: dimName as Dimension,
      rawScore,
      percentageScore,
    };
  });

  return dimensionScores;
}
