import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavingWarningComponent } from './leaving-warning.component';

describe('LeavingWarningComponent', () => {
  let component: LeavingWarningComponent;
  let fixture: ComponentFixture<LeavingWarningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeavingWarningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeavingWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
