import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTracesComponent } from './show-traces.component';

describe('ShowTrainersComponent', () => {
  let component: ShowTracesComponent;
  let fixture: ComponentFixture<ShowTracesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowTracesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTracesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
