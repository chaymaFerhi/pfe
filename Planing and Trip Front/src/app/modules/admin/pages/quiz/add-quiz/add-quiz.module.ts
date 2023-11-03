import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AddQuizRoutingModule} from './add-quiz-routing.module';
import { AddQuizStepComponent } from './add-quiz-step/add-quiz-step.component';
import { AddQuizStepModule } from './add-quiz-step/add-quiz-step.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../../../../shared/material/material.module';
import {ReversePipeModule} from '@fuse/pipes/reverse/reverse.module';
import {AddQuizComponent} from './add-quiz.component';


@NgModule({
    declarations: [
        AddQuizStepComponent,
        AddQuizComponent
    ],
    exports: [
        AddQuizStepComponent
    ],
    imports: [
        CommonModule,
        AddQuizRoutingModule,
        MaterialModule,
        AddQuizStepModule,
        ReactiveFormsModule,
        ReversePipeModule,

    ]
})
export class AddQuizModule {
}
