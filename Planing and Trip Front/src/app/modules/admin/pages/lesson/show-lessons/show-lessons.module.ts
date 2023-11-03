import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ShowLessonsRoutingModule} from './show-lessons-routing.module';
import {ShowLessonsComponent} from './show-lessons.component';
import {MaterialModule} from '../../../../../shared/material/material.module';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations: [ShowLessonsComponent],
    imports: [
        CommonModule,
        ShowLessonsRoutingModule,
        MaterialModule,
        ReactiveFormsModule
    ]
})
export class ShowLessonsModule {
}
