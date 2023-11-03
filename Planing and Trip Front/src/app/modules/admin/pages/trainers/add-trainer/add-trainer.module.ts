import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AddTrainerRoutingModule} from './add-trainer-routing.module';
import {MaterialModule} from '../../../../../shared/material/material.module';
import {AddTrainerComponent} from './add-trainer.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations: [
        AddTrainerComponent
    ],
    imports: [
        CommonModule,
        AddTrainerRoutingModule,
        MaterialModule,
        ReactiveFormsModule
    ]
})
export class AddTrainerModule {
}
