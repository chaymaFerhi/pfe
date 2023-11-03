import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLessonFilesUploadComponent } from './add-lesson-files-upload.component';

describe('AddLessonFilesUploadComponent', () => {
  let component: AddLessonFilesUploadComponent;
  let fixture: ComponentFixture<AddLessonFilesUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLessonFilesUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLessonFilesUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
