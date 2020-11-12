import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {GameSetCurrentExerciseStringAnswer, GameSubmitCurrentExercise} from '../../store/game.actions';
import {GameState} from '../../store/game.state';

@Component({
  selector: 'app-result-pad',
  templateUrl: './result-pad.component.html',
  styleUrls: ['./result-pad.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultPadComponent implements OnInit {

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
  }

  enterNumber(num: number): void {
    let currentStringAnswer: string = this.store.selectSnapshot(GameState.currentStrAnswer) ?? '';
    if (currentStringAnswer === 'ERR') {
      currentStringAnswer = '';
    }
    this.store.dispatch(new GameSetCurrentExerciseStringAnswer(currentStringAnswer + num.toString()));
  }

  enterError(): void {
    this.store.dispatch(new GameSetCurrentExerciseStringAnswer('ERR'));
  }

  enterPlusMinus(): void {
    const currentStringAnswer: string = this.store.selectSnapshot(GameState.currentStrAnswer) ?? '';
    if (currentStringAnswer === 'ERR' || currentStringAnswer === '') {
      return;
    }

    if (currentStringAnswer.charAt(0) === '-') {
      this.store.dispatch(new GameSetCurrentExerciseStringAnswer(currentStringAnswer.substr(1)));
    } else {
      this.store.dispatch(new GameSetCurrentExerciseStringAnswer('-' + currentStringAnswer));
    }
  }

  enterComma(): void {
    const currentStringAnswer: string = this.store.selectSnapshot(GameState.currentStrAnswer) ?? '';

    if (currentStringAnswer === 'ERR' || currentStringAnswer === '') {
      return;
    }

    this.store.dispatch(new GameSetCurrentExerciseStringAnswer(currentStringAnswer + '.'));
  }

  enterClear(): void {
    this.store.dispatch(new GameSetCurrentExerciseStringAnswer(''));
  }

  enterOk(): void {
    this.store.dispatch(new GameSubmitCurrentExercise());
  }

}
