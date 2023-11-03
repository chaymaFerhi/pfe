import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ShowCoursesRoutingModule} from './show-courses-routing.module';
import {ShowCoursesComponent} from './show-courses.component';
import {MaterialModule} from '../../../../../shared/material/material.module';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations: [
        ShowCoursesComponent
    ],
    imports: [
        CommonModule,
        ShowCoursesRoutingModule,
        MaterialModule,
        ReactiveFormsModule
    ]
})
export class ShowCoursesModule {
}
