import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddCourseRoutingModule } from './add-course-routing.module';
import {MaterialModule} from '../../../../../shared/material/material.module';
import {AddCourseComponent} from './add-course.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [AddCourseComponent],
  imports: [
    CommonModule,
    AddCourseRoutingModule,
      MaterialModule,
      ReactiveFormsModule
  ]
})
export class AddCourseModule { }
