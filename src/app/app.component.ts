import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Store} from '@ngxs/store';
import {GameReset} from './store/game.actions';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'kopfrechnen';

  constructor(
    private store: Store,
    private router: Router
  ) {}

  reset(): void {
    this.store.dispatch(new GameReset())
      .toPromise()
      .then( () => {
        this.router.navigate(['home']);
      });
  }
}
