import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLessonDetailsComponent } from './add-lesson-details.component';

describe('AddLessonFilesDetailsComponent', () => {
  let component: AddLessonDetailsComponent;
  let fixture: ComponentFixture<AddLessonDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLessonDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLessonDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
