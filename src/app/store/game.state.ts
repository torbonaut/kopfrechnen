import {Action, Selector, State, StateContext} from '@ngxs/store';
import {GameStateDefaults, GameStateModel} from './game.state-model';
import {Injectable} from '@angular/core';
import {
  GameAddExercise,
  GameReset,
  GameSetCurrentExercise, GameSetCurrentExerciseAnswer, GameSetCurrentExerciseStringAnswer, GameSetDifficulty,
  GameSetDuration,
  GameSetOperators, GameSubmitCurrentExercise,
  GameTick, GameTimeOver
} from './game.actions';
import {Difficulty, Duration, Exercise, Operator} from '../models/game.model';

@State<GameStateModel>({
  name: 'game',
  defaults: GameStateDefaults
})
@Injectable()
export class GameState {
  @Selector()
  static difficulty(state: GameStateModel): number {
    return state.difficulty;
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
    return state.currentExercise.userAnswer;
  }

  @Selector()
  static currentStrAnswer(state: GameStateModel): string {
    return state.currentExercise.userAnswerStr;
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

  @Action(GameSetDifficulty)
  setNumberSpace(ctx: StateContext<GameStateModel>, action: GameSetDifficulty): any {
    const difficulty: Difficulty = action.difficulty;
    ctx.patchState({ difficulty });
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
    ctx.patchState( { currentExercise: { ...state.currentExercise, userAnswer: action.answer}});
  }

  @Action(GameSetCurrentExerciseStringAnswer)
  setCurrentExerciseStringAnswer(ctx: StateContext<GameStateModel>, action: GameSetCurrentExerciseStringAnswer): any {
    const state = ctx.getState();
    ctx.patchState( { currentExercise: { ...state.currentExercise, userAnswerStr: action.answer } });
  }

  @Action(GameSubmitCurrentExercise)
  submitCurrentExercise(ctx: StateContext<GameStateModel>, action: GameSubmitCurrentExercise): any {
    const state = ctx.getState();
    const currentExercise = { ...state.currentExercise };
    const endTime = performance.now();

    let userResult;

    if (currentExercise.userAnswerStr !== 'ERR') {
      userResult = parseFloat(currentExercise.userAnswerStr);
    }

    const computedAnswer = 5;
    const resultCorrect = true;


    let correct = state.correct;
    let failed = state.failed;

    if (resultCorrect === true) {
      correct += 1;
    } else {
      failed += 1;
    }

    const exercise: Exercise = {
      startTime: currentExercise.startTime,
      endTime: currentExercise.endTime,
      term: currentExercise.term,
      formattedTerm: currentExercise.formattedTerm,
      resultCorrect,
      userAnswer: currentExercise.userAnswer,
      userAnswerStr: currentExercise.userAnswerStr,
      computedAnswer
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
