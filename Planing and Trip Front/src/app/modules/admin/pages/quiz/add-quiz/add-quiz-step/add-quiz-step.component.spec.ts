import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuizStepComponent } from './add-quiz-step.component';

describe('AddQuizStepComponent', () => {
  let component: AddQuizStepComponent;
  let fixture: ComponentFixture<AddQuizStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddQuizStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddQuizStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
