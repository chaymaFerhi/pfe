import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLessonSectionsComponent } from './add-lesson-sections.component';

describe('AddLessonSectionsComponent', () => {
  let component: AddLessonSectionsComponent;
  let fixture: ComponentFixture<AddLessonSectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLessonSectionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLessonSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
