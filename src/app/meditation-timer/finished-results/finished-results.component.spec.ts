import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedResultsComponent } from './finished-results.component';

describe('FinishedResultsComponent', () => {
  let component: FinishedResultsComponent;
  let fixture: ComponentFixture<FinishedResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinishedResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishedResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
