export const SHUFFLE_TIME = 500;

export enum Operator {
  ADD= 1,
  SUBTRACT= 2,
  MULTIPLY= 3,
  DIVIDE = 4
}

export const DEFAULT_OPERATORS: Operator[] = [
  Operator.ADD,
  Operator.SUBTRACT,
  Operator.MULTIPLY
];

export enum Duration {
  SHORT= 10,
  MEDIUM= 120,
  LONG= 300
}

export enum Difficulty {
  TODDLER,
  EASY = 1,
  MEDIUM = 2,
  HARD= 3,
  MASTER = 4
}

export interface OperatorRange {
  OperatorAMin: number;
  OperatorAMax: number;
  OperatorBMin: number;
  OperatorBMax: number;
}

export interface Exercise {
  term: string;
  formattedTerm: string;
  computedAnswer: number;
  userAnswer: number;
  userAnswerStr: string;
  startTime: number;
  endTime: number;
  resultCorrect: boolean;
}
