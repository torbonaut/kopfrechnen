import {Duration, Exercise, NumberSpace} from '../models/game.model';

export class GameReset {
  static readonly type = '[Game] Reset';
}

export class GameAddExercise {
  static readonly type = '[Game] Add Exercise';
  constructor(public exercise: Partial<Exercise>) {}
}

export class GameTick {
  static readonly type = '[Game] Tick';
}

export class GameSetNumberSpace {
  static readonly type = '[Game] set number space';
  constructor(public numberSpace: NumberSpace) {}
}

export class GameSetDuration {
  static readonly type = '[Game] set duration';
  constructor(public duration: Duration) {}
}
