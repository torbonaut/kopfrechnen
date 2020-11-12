import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Actions, ofActionSuccessful} from '@ngxs/store';
import {GameTimeOver} from './store/game.actions';
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
    private router: Router,
    private actions: Actions
  ) {}

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
