export type QuestionType = 'boolean' | 'multiple_choice';

export interface Question {
  id: number;
  question: string;
  type: QuestionType;
  options: string[];
  correctAnswer: string;
  explanation: string;
  category: 'Consumers' | 'Business' | 'Energy' | 'Nations' | 'Global';
}

export type GameStatus = 'idle' | 'registering' | 'playing' | 'finished';

export interface User {
  nickname: string;
  email: string;
}

export interface LeaderboardEntry {
  nickname: string;
  email: string; // Stored for backend logic, hidden in UI
  score: number;
  timestamp: number;
}

export interface GameState {
  status: GameStatus;
  currentQuestionIndex: number;
  answers: boolean[];
  startTime: number | null;
  endTime: number | null;
  penaltyTimeMs: number;
  user: User | null;
}
