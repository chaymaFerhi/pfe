import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTraceComponent } from './add-trace.component';

describe('AddTrainerComponent', () => {
  let component: AddTraceComponent;
  let fixture: ComponentFixture<AddTraceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTraceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTraceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
