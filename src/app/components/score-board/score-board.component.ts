import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {interval, Observable, Subscription, timer} from 'rxjs';
import {GameState} from '../../store/game.state';
import {Select, Store} from '@ngxs/store';
import {finalize, takeUntil} from 'rxjs/operators';
import {GameTick, GameTimeOver} from '../../store/game.actions';

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScoreBoardComponent implements OnInit, OnDestroy {

  @Input()
  startTimer = true;

  @Select(GameState.total) total$: Observable<number>;
  @Select(GameState.correct) correct$: Observable<number>;
  @Select(GameState.failed) failed$: Observable<number>;
  @Select(GameState.timer) timer$: Observable<number>;

  subscriptions: Subscription = new Subscription();

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    if (this.startTimer === true) {
      const duration = this.store.selectSnapshot(GameState.timer);
      const totalTimeLeft$ = timer(duration * 1000);
      const interval$ = interval(1000).pipe(
        takeUntil(totalTimeLeft$),
        finalize( () => this.store.dispatch(new GameTimeOver()))
      );

      this.subscriptions.add(
        interval$.subscribe( () => this.store.dispatch(new GameTick()))
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
