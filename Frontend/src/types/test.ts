export interface TestQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  topic: string;
  level: 'beginner' | 'intermediate' | 'expert';
}

export interface TestResult {
  score: number;
  totalQuestions: number;
  recommendedLevel: 'beginner' | 'intermediate' | 'expert';
  recommendedTopics: string[];
}