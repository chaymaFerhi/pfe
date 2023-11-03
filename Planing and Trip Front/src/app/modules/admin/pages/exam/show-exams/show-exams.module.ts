import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ShowExamsRoutingModule} from './show-exams-routing.module';
import {ShowExamsComponent} from './show-exams.component';
import {MaterialModule} from '../../../../../shared/material/material.module';


@NgModule({
    declarations: [
        ShowExamsComponent
    ],
    imports: [
        CommonModule,
        ShowExamsRoutingModule,
        MaterialModule
    ]
})
export class ShowExamsModule {
}
