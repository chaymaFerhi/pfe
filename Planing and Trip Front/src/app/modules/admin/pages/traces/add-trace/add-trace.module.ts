import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AddTrainerRoutingModule} from './add-trainer-routing.module';
import {MaterialModule} from '../../../../../shared/material/material.module';
import {AddTraceComponent} from './add-trace.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations: [
        AddTraceComponent
    ],
    imports: [
        CommonModule,
        AddTrainerRoutingModule,
        MaterialModule,
        ReactiveFormsModule
    ]
})
export class AddTraceModule {
}
