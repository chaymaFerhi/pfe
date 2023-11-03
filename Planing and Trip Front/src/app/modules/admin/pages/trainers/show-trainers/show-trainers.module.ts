import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ShowTrainersRoutingModule} from './show-trainers-routing.module';
import {MaterialModule} from '../../../../../shared/material/material.module';
import {ShowTrainersComponent} from './show-trainers.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations: [
        ShowTrainersComponent
    ],
    imports: [
        CommonModule,
        ShowTrainersRoutingModule,
        MaterialModule,
        ReactiveFormsModule
    ]
})
export class ShowTrainersModule {
}
