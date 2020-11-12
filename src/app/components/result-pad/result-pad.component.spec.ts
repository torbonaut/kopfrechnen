import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultPadComponent } from './result-pad.component';

describe('ResultPadComponent', () => {
  let component: ResultPadComponent;
  let fixture: ComponentFixture<ResultPadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultPadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultPadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
