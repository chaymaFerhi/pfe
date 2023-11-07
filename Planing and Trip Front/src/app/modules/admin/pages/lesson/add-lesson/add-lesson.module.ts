import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AddLessonRoutingModule} from './add-lesson-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../../../../shared/material/material.module';
import {AddLessonComponent} from './add-lesson.component';


@NgModule({
    declarations: [
        AddLessonComponent
    ],
    exports: [
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
