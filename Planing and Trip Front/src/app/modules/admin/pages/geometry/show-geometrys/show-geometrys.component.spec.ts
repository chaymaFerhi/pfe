import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowQuizesComponent } from './show-quizes.component';

describe('ShowQuizesComponent', () => {
  let component: ShowQuizesComponent;
  let fixture: ComponentFixture<ShowQuizesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowQuizesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowQuizesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
