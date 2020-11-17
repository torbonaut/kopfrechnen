import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {Difficulty, Duration, Operator} from '../../models/game.model';
import {
  GameReset,
  GameSetDifficulty,
  GameSetDuration,
  GameSetOperators
} from '../../store/game.actions';
import {Observable} from 'rxjs';
import {GameState} from '../../store/game.state';
import {MathUtil, TermTree} from '../../classes/math.util';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageHomeComponent implements OnInit {

  difficulty = Difficulty;
  duration = Duration;
  operator = Operator;

  @Select(GameState.difficulty) difficulty$: Observable<number>;
  @Select(GameState.timer) duration$: Observable<number>;
  @Select(GameState.operators) operators$: Observable<number[]>;

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new GameReset());
  }

  setDifficulty( { value }): void {
    this.store.dispatch(new GameSetDifficulty(value));
  }

  setDuration( { value }): void {
    this.store.dispatch(new GameSetDuration(value));
  }

  setOperators( { value }): void {
    this.store.dispatch(new GameSetOperators(value));
  }
}
