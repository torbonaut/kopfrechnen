import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-page-result',
  templateUrl: './page-result.component.html',
  styleUrls: ['./page-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageResultComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
