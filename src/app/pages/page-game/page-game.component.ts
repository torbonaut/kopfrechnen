import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-page-game',
  templateUrl: './page-game.component.html',
  styleUrls: ['./page-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageGameComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
