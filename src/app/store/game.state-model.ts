import {Duration, Exercise, NumberSpace} from '../models/game.model';


export interface GameStateModel {
  total: number;
  correct: number;
  failed: number;
  numberSpace: NumberSpace;
  exercises: Exercise[];
  duration: number;
}

export const GameStateDefaults: GameStateModel = {
  total: 0,
  correct: 0,
  failed: 0,
  numberSpace: NumberSpace.SMALL,
  exercises: [],
  duration: Duration.SHORT
};
