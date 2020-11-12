import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {GameState} from '../../store/game.state';
import {Observable} from 'rxjs';
import {Exercise, Operator} from '../../models/game.model';
import {Select} from '@ngxs/store';

@Component({
  selector: 'app-page-result',
  templateUrl: './page-result.component.html',
  styleUrls: ['./page-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageResultComponent implements OnInit {

  @Select(GameState.exercises) exercises$: Observable<Exercise[]>;

  constructor() { }

  ngOnInit(): void {
  }

  getTitle(exercise: Exercise): string {
    let operator: string;

    switch (exercise.operator) {
      case Operator.ADD: operator = '+'; break;
      case Operator.SUBTRACT: operator = '-'; break;
      case Operator.DIVIDE: operator = '/'; break;
      case Operator.MULTIPLY: operator = '*'; break;
    }

    return exercise.a + ' ' + operator + ' ' + exercise.b + ' = ' + exercise.strAnswer;

  }

  getContent(exercise: Exercise): string {
    return exercise.resultCorrect === true ? 'Deine Antwort war korrekt!' : 'Deine Antwort war leider nicht korrekt';
  }

  getDuration(exercise: Exercise): string {
    const duration: number = (exercise.endTime - exercise.startTime) / 1000;
    return duration.toFixed(2);
  }

}
