import {Action, Selector, State, StateContext} from '@ngxs/store';
import {GameStateDefaults, GameStateModel} from './game.state-model';
import {Injectable} from '@angular/core';
import {
  GameAddExercise,
  GameReset,
  GameSetCurrentExercise, GameSetCurrentExerciseAnswer, GameSetCurrentExerciseStringAnswer,
  GameSetDuration,
  GameSetNumberSpace, GameSetOperators, GameSubmitCurrentExercise,
  GameTick, GameTimeOver
} from './game.actions';
import {Duration, Exercise, NumberSpace, Operator} from '../models/game.model';

@State<GameStateModel>({
  name: 'game',
  defaults: GameStateDefaults
})
@Injectable()
export class GameState {
  @Selector()
  static numberSpace(state: GameStateModel): number {
    return state.numberSpace;
  }

  @Selector()
  static timer(state: GameStateModel): number {
    return state.timer;
  }

  @Selector()
  static total(state: GameStateModel): number {
    return state.total;
  }

  @Selector()
  static correct(state: GameStateModel): number {
    return state.correct;
  }

  @Selector()
  static failed(state: GameStateModel): number {
    return state.failed;
  }

  @Selector()
  static operators(state: GameStateModel): number[] {
    return state.operators;
  }

  @Selector()
  static currentAnswer(state: GameStateModel): number | undefined {
    return state.currentExercise.answer;
  }

  @Selector()
  static currentStrAnswer(state: GameStateModel): string {
    return state.currentExercise.strAnswer;
  }

  @Selector()
  static exercises(state: GameStateModel): Exercise[] {
    return state.exercises;
  }

  @Action(GameReset)
  reset(ctx: StateContext<GameStateModel>, action: GameReset): any {
    ctx.setState({...GameStateDefaults });
  }

  @Action(GameAddExercise)
  addExercise(ctx: StateContext<GameStateModel>, action: GameAddExercise): any {

  }

  @Action(GameTick)
  tick(ctx: StateContext<GameStateModel>, action: GameTick): any {
    const state = ctx.getState();
    const timer = state.timer - 1;
    ctx.patchState( { timer });
  }

  @Action(GameSetNumberSpace)
  setNumberSpace(ctx: StateContext<GameStateModel>, action: GameSetNumberSpace): any {
    const numberSpace: NumberSpace = action.numberSpace;
    ctx.patchState({ numberSpace });
  }

  @Action(GameSetDuration)
  setDuration(ctx: StateContext<GameStateModel>, action: GameSetDuration): any {
    const timer: Duration = action.duration;
    ctx.patchState( { timer });
  }

  @Action(GameSetCurrentExercise)
  setCurrentExercise(ctx: StateContext<GameStateModel>, action: GameSetCurrentExercise): any {
    ctx.patchState( { currentExercise: action.exercise });
  }

  @Action(GameSetOperators)
  setOperators(ctx: StateContext<GameStateModel>, action: GameSetOperators): any {
    ctx.patchState( { operators: action.operators });
  }

  @Action(GameSetCurrentExerciseAnswer)
  setCurrentExerciseAnswer(ctx: StateContext<GameStateModel>, action: GameSetCurrentExerciseAnswer): any {
    const state = ctx.getState();
    ctx.patchState( { currentExercise: { ...state.currentExercise, answer: action.answer}});
  }

  @Action(GameSetCurrentExerciseStringAnswer)
  setCurrentExerciseStringAnswer(ctx: StateContext<GameStateModel>, action: GameSetCurrentExerciseStringAnswer): any {
    const state = ctx.getState();
    ctx.patchState( { currentExercise: { ...state.currentExercise, strAnswer: action.answer } });
  }

  @Action(GameSubmitCurrentExercise)
  submitCurrentExercise(ctx: StateContext<GameStateModel>, action: GameSubmitCurrentExercise): any {
    const state = ctx.getState();
    const currentExercise = { ...state.currentExercise };
    const timerEnd = performance.now();

    let userResult;

    if (currentExercise.strAnswer !== 'ERR') {
      userResult = parseFloat(currentExercise.strAnswer);
    }

    let computedResult;

    switch (currentExercise.operator) {
      case Operator.ADD:
        computedResult = currentExercise.a + currentExercise.b;
        break;
      case Operator.SUBTRACT:
        computedResult = currentExercise.a - currentExercise.b;
        break;
      case Operator.MULTIPLY:
        if (currentExercise.b !== 0) {
          computedResult = currentExercise.a * currentExercise.b;
        }
        break;
      case Operator.DIVIDE:
        computedResult = currentExercise.a / currentExercise.b;
    }

    let resultCorrect;

    if (typeof computedResult === 'undefined' && typeof userResult === 'undefined') {
      resultCorrect = true;
    } else if (typeof computedResult === 'undefined' && typeof userResult !== 'undefined') {
      resultCorrect = false;
    } else if (typeof computedResult !== 'undefined' && typeof userResult === 'undefined') {
      return false;
    } else {
      resultCorrect = userResult.toFixed(2) === computedResult.toFixed(2);
    }

    let correct = state.correct;
    let failed = state.failed;

    if (resultCorrect === true) {
      correct += 1;
    } else {
      failed += 1;
    }

    const exercise: Exercise = {
      a: currentExercise.a,
      b: currentExercise.b,
      strAnswer: currentExercise.strAnswer,
      answer: userResult,
      operator: currentExercise.operator,
      startTime: currentExercise.startTime,
      endTime: timerEnd,
      resultCorrect
    };

    const exercises: Exercise[] = [...state.exercises];
    exercises.push(exercise);

    const total = state.total + 1;

    ctx.patchState( { exercises, currentExercise: null, total, correct, failed });

  }

  @Action(GameTimeOver)
  timeOver(ctx: StateContext<GameStateModel>, action: GameTimeOver): any {

  }

}
