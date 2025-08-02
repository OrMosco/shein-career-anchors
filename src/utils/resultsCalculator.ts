import { Answer, CareerAnchor, CareerAnchorResult, CAREER_ANCHORS_INFO } from '@/types/career';
import { QUESTIONS } from '@/data/questions';

// Mapping of questions to anchors (5 questions per anchor)
const ANCHOR_QUESTIONS: Record<CareerAnchor, number[]> = {
  TF: [1, 9, 17, 25, 33],
  GM: [2, 10, 18, 26, 34],
  AU: [3, 11, 19, 27, 35],
  SE: [4, 12, 20, 28, 36],
  EC: [5, 13, 21, 29, 37],
  SV: [6, 14, 22, 30, 38],
  CH: [7, 15, 23, 31, 39],
  LS: [8, 16, 24, 32, 40]
};

export const calculateResults = (answers: Answer[]): CareerAnchorResult[] => {
  const results: CareerAnchorResult[] = [];

  // Calculate score for each anchor
  Object.entries(ANCHOR_QUESTIONS).forEach(([anchor, questionNumbers]) => {
    const anchorAnswers = answers.filter(answer => 
      questionNumbers.includes(answer.questionNumber)
    );

    // Calculate average score (only if we have all 5 answers)
    const totalScore = anchorAnswers.reduce((sum, answer) => sum + answer.rating, 0);
    const averageScore = anchorAnswers.length === 5 ? totalScore / 5 : 0;

    const anchorInfo = CAREER_ANCHORS_INFO[anchor as CareerAnchor];

    results.push({
      ...anchorInfo,
      score: Math.round(averageScore * 100) / 100 // Round to 2 decimal places
    });
  });

  // Sort by score (highest first)
  return results.sort((a, b) => b.score - a.score);
};

export const getTopAnchors = (results: CareerAnchorResult[], count: number = 2): CareerAnchorResult[] => {
  return results.slice(0, count);
};

export const validateAnswers = (answers: Answer[]): boolean => {
  // Check if we have all 40 answers
  return answers.length === 40 && 
         answers.every(answer => answer.rating >= 1 && answer.rating <= 6);
};