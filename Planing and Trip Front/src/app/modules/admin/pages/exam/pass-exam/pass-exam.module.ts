import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PassExamRoutingModule } from './pass-exam-routing.module';
import {PassExamComponent} from './pass-exam.component';


@NgModule({
  declarations: [PassExamComponent],
  imports: [
    CommonModule,
    PassExamRoutingModule
  ]
})
export class PassExamModule { }
