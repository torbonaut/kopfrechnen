import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {Duration, NumberSpace} from '../../models/game.model';
import {GameSetDuration, GameSetNumberSpace} from '../../store/game.actions';
import {GameStateModel} from '../../store/game.state-model';
import {Observable} from 'rxjs';
import {GameState} from '../../store/game.state';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageHomeComponent implements OnInit {

  numberSpace = NumberSpace;
  duration = Duration;

  @Select(GameState.numberSpace) numberSpace$: Observable<number>;
  @Select(GameState.duration) duration$: Observable<number>;

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {}

  setNumberSpace( { value }): void {
    this.store.dispatch(new GameSetNumberSpace(value));
  }

  setDuration( { value }): void {
    this.store.dispatch(new GameSetDuration(value));
  }

}
