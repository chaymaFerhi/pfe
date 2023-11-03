import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTrainersComponent } from './show-trainers.component';

describe('ShowTrainersComponent', () => {
  let component: ShowTrainersComponent;
  let fixture: ComponentFixture<ShowTrainersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowTrainersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTrainersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
