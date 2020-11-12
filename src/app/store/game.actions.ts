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
  constructor(public numberSpace: number) {}
}

export class GameSetDuration {
  static readonly type = '[Game] set duration';
  constructor(public duration: number) {}
}

export class GameSetCurrentExercise {
  static readonly type = '[Game] set current Exercise';
  constructor(public exercise: Partial<Exercise>) {}
}

export class GameSetOperators {
  static readonly type = '[Game] set operators';
  constructor(public operators: number[]) {}
}

export class GameSetCurrentExerciseAnswer {
  static readonly type = '[Game] set numeric answer of current exercise';
  constructor(public answer: number | undefined) {}
}

export class GameSetCurrentExerciseStringAnswer {
  static readonly type = '[Game] set string answer of current exercise';
  constructor(public answer: string) {}
}

export class GameSubmitCurrentExercise {
  static readonly type = '[Game] submit current Excercise';
}

export class GameTimeOver {
  static readonly type = '[Game] Time Over';
}
