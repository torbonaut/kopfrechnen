export enum Operand {
  ADD= 1,
  SUBTRACT= 2,
  MULTIPLY= 3,
  DIVIDE = 4
}

export enum NumberSpace {
  SMALL= 10,
  MEDIUM = 100,
  BIG= 1000
}

export enum Duration {
  SHORT= 60,
  MEDIUM= 120,
  LONG= 300
}

export interface Exercise {
  a: number;
  b: number;
  operand: Operand;
  answer: number;
  duration: number;
  result: boolean;
}