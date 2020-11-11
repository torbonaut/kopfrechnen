import {Action, Selector, State, StateContext} from '@ngxs/store';
import {GameStateDefaults, GameStateModel} from './game.state-model';
import {Injectable} from '@angular/core';
import {GameAddExercise, GameReset, GameSetDuration, GameSetNumberSpace, GameTick} from './game.actions';
import {Duration, NumberSpace} from '../models/game.model';
import {Observable, of} from 'rxjs';

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
  static duration(state: GameStateModel): number {
    return state.duration;
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
    // ctx.patchState( { timer: state.duration-- });
  }

  @Action(GameSetNumberSpace)
  setNumberSpace(ctx: StateContext<GameStateModel>, action: GameSetNumberSpace): any {
    const numberSpace: NumberSpace = action.numberSpace;
    ctx.patchState({ numberSpace });
  }

  @Action(GameSetDuration)
  setDuration(ctx: StateContext<GameStateModel>, action: GameSetDuration): any {
    const duration: Duration = action.duration;
    ctx.patchState( { duration });
  }

}
