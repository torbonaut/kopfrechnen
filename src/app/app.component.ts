import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Actions, ofActionSuccessful, Store} from '@ngxs/store';
import {GameReset, GameTimeOver} from './store/game.actions';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'kopfrechnen';
  subscriptions: Subscription = new Subscription();

  constructor(
    private store: Store,
    private router: Router,
    private actions: Actions
  ) {}

  reset(): void {
    this.store.dispatch(new GameReset())
      .toPromise()
      .then( () => {
        this.router.navigate(['home']);
      });
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.actions.pipe(
        ofActionSuccessful(
          GameTimeOver
        )
      ).subscribe( () => this.router.navigate(['/result']))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
