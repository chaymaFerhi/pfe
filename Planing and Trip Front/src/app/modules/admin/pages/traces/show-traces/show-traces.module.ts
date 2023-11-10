import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ShowTracesRoutingModule} from './show-traces-routing.module';
import {MaterialModule} from '../../../../../shared/material/material.module';
import {ShowTracesComponent} from './show-traces.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations: [
        ShowTracesComponent
    ],
    imports: [
        CommonModule,
        ShowTracesRoutingModule,
        MaterialModule,
        ReactiveFormsModule
    ]
})
export class ShowTracesModule {
}
