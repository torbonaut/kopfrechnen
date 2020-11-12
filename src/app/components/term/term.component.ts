import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, interval, Observable, Subscription, timer} from 'rxjs';
import {finalize, switchMap, takeUntil, tap} from 'rxjs/operators';
import {Exercise, NumberSpace} from '../../models/game.model';
import {Actions, ofActionSuccessful, Select, Store} from '@ngxs/store';
import {GameState} from '../../store/game.state';
import {GameSetCurrentExercise, GameSubmitCurrentExercise} from '../../store/game.actions';

@Component({
  selector: 'app-term',
  templateUrl: './term.component.html',
  styleUrls: ['./term.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TermComponent implements OnInit, OnDestroy {

  numberSpace = null;

  numA$: BehaviorSubject<number> = new BehaviorSubject(0);
  numB$: BehaviorSubject<number> = new BehaviorSubject(0);
  op$: BehaviorSubject<number> = new BehaviorSubject(1);
  opStr$: Observable<string>;

  @Select(GameState.currentStrAnswer) currentStringAnswer$: Observable<string>;

  operators: number[];

  subscriptions: Subscription = new Subscription();

  constructor(
    private store: Store,
    private actions: Actions
  ) { }

  ngOnInit(): void {
    this.numberSpace = this.store.selectSnapshot(GameState.numberSpace);
    this.operators = this.store.selectSnapshot(GameState.operators);

    this.opStr$ = this.op$.pipe(
      switchMap( (op: number) => {
        switch (op) {
          case 1: return '+';
          case 2: return '-';
          case 3: return '*';
          case 4: return '/';
        }
      })
    );
    this.shuffle();

    this.subscriptions.add(
      this.actions.pipe(
        ofActionSuccessful(GameSubmitCurrentExercise)
      ).subscribe( () => this.shuffle())
    );
  }

  getRandomIntInclusive(a, b): number {
    const min = Math.ceil(a);
    const max = Math.floor(b);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRandomNumberSpaceNumber(): number {
    switch (this.numberSpace) {
      case NumberSpace.SMALL: return this.getRandomIntInclusive(-10, 10); break;
      case NumberSpace.MEDIUM: return this.getRandomIntInclusive(-100, 100); break;
      case NumberSpace.BIG: return this.getRandomIntInclusive(-1000, 1000); break;
    }
  }

  getRandomOperator(): number {
    return this.operators[this.getRandomIntInclusive(0, this.operators.length - 1)];
  }

  shuffle(): void {
    const source$ = interval(50);
    const until$ = timer(500);

    this.subscriptions.add(
      source$.pipe(
        tap( () => {
          this.numA$.next(this.getRandomNumberSpaceNumber());
          this.numB$.next(this.getRandomNumberSpaceNumber());
          this.op$.next(this.getRandomOperator());
        }),
        takeUntil(until$),
        finalize( () => {
          const exercise: Partial<Exercise> = {
            a: this.numA$.getValue(),
            b: this.numB$.getValue(),
            operator: this.op$.getValue(),
            startTime: performance.now()
          };
          this.store.dispatch(new GameSetCurrentExercise(exercise));
        })
      ).subscribe()
    );
  }

  getStringAnswer(answer: string): string {
    return ((typeof answer === 'undefined' || answer === '') ? '?' : answer);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
