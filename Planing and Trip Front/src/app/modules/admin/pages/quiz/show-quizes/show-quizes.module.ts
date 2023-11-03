import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowQuizesRoutingModule } from './show-quizes-routing.module';
import { ShowQuizesComponent } from './show-quizes.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../../../../shared/material/material.module';


@NgModule({
  declarations: [
    ShowQuizesComponent
  ],
    imports: [
        CommonModule,
        ShowQuizesRoutingModule,
        MaterialModule,
        ReactiveFormsModule

    ]
})
export class ShowQuizesModule { }
