
export enum GameType {
  ADDITION = 'ADDITION',
  SUBTRACTION = 'SUBTRACTION',
  SEQUENCE = 'SEQUENCE',
  MISSING = 'MISSING'
}

export interface UserProgress {
  stars: number;
  level: number;
  badges: string[];
  achievements: string[];
  gameStats: Record<GameType, {
    correct: number;
    total: number;
  }>;
}

export interface GameQuestion {
  id: string;
  type: GameType;
  prompt: string;
  operands?: number[];
  answer: number;
  options: number[];
  visualHint?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requiredStars: number;
}
