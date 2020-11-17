import {Difficulty, Duration, Exercise} from '../models/game.model';


export interface GameStateModel {
  total: number;
  correct: number;
  failed: number;
  difficulty: Difficulty;
  exercises: Exercise[];
  currentExercise: Partial<Exercise>;
  operators: number[];
  timer: number;
}

export const GameStateDefaults: GameStateModel = {
  total: 0,
  correct: 0,
  failed: 0,
  difficulty: Difficulty.EASY,
  exercises: [],
  currentExercise: null,
  operators: [1, 2, 3],
  timer: Duration.SHORT
};
