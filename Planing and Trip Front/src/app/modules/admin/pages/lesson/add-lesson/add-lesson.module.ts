import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AddLessonRoutingModule} from './add-lesson-routing.module';
import {AddLessonFilesUploadComponent} from './add-lesson-files-upload/add-lesson-files-upload.component';
import {AddLessonDetailsComponent} from './add-lesson-details/add-lesson-details.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AddLessonSectionsComponent} from './add-lesson-sections/add-lesson-sections.component';
import {MaterialModule} from '../../../../../shared/material/material.module';
import {AddLessonComponent} from './add-lesson.component';


@NgModule({
    declarations: [
        AddLessonFilesUploadComponent,
        AddLessonDetailsComponent,
        AddLessonSectionsComponent,
        AddLessonComponent
    ],
    exports: [
        AddLessonDetailsComponent,
        AddLessonFilesUploadComponent,
        AddLessonSectionsComponent

    ],
    imports: [
        CommonModule,
        AddLessonRoutingModule,
        MaterialModule,
        ReactiveFormsModule,
    ]
})
export class AddLessonModule {
}
