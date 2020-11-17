import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, SecurityContext, ViewEncapsulation} from '@angular/core';
import {BehaviorSubject, interval, Observable, Subscription, timer} from 'rxjs';
import {finalize, takeUntil, tap} from 'rxjs/operators';
import {DEFAULT_OPERATORS, Difficulty, Exercise, SHUFFLE_TIME} from '../../models/game.model';
import {Actions, ofActionSuccessful, Select, Store} from '@ngxs/store';
import {GameState} from '../../store/game.state';
import {GameSetCurrentExercise, GameSubmitCurrentExercise} from '../../store/game.actions';
import {TermTree} from '../../classes/math.util';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-term',
  templateUrl: './term.component.html',
  styleUrls: ['./term.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class TermComponent implements OnInit, OnDestroy {

  Difficulty = Difficulty;

  difficulty = Difficulty.EASY;
  operators: number[] = DEFAULT_OPERATORS;

  term$: BehaviorSubject<string> = new BehaviorSubject('');
  formattedTerm$: BehaviorSubject<string> = new BehaviorSubject('');
  computedAnswer$: BehaviorSubject<number> = new BehaviorSubject( null);

  @Select(GameState.currentStrAnswer) currentStringAnswer$: Observable<string>;

  subscriptions: Subscription = new Subscription();

  constructor(
    private store: Store,
    private actions: Actions,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.difficulty = this.store.selectSnapshot(GameState.difficulty);
    this.operators = this.store.selectSnapshot(GameState.operators);
    this.shuffle();

    this.subscriptions.add(
      this.actions.pipe(
        ofActionSuccessful(GameSubmitCurrentExercise)
      ).subscribe( () => this.shuffle())
    );
  }


  shuffle(): void {
    const source$ = interval(50);
    const until$ = timer(SHUFFLE_TIME);

    this.subscriptions.add(
      source$.pipe(
        tap( () => {
          const term: TermTree = new TermTree(this.difficulty, this.operators);
          this.term$.next(term.toString());
          this.formattedTerm$.next(term.toFormattedString());
          this.computedAnswer$.next(term.calculateResult());
        }),
        takeUntil(until$),
        finalize( () => {
          const exercise: Partial<Exercise> = {
            startTime: performance.now(),
            term:  this.term$.getValue(),
            formattedTerm: this.formattedTerm$.getValue(),
            computedAnswer: this.computedAnswer$.getValue()
          };
          this.store.dispatch(new GameSetCurrentExercise(exercise));
        })
      ).subscribe()
    );
  }

  sanitize(str: string): SafeHtml {
    return this.sanitizer.sanitize(SecurityContext.HTML, str);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
