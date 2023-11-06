import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ShowStationsRoutingModule} from './show-stations-routing.module';
import {ShowStationsComponent} from './show-stations.component';
import {MaterialModule} from '../../../../../shared/material/material.module';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations: [
        ShowStationsComponent
    ],
    imports: [
        CommonModule,
        ShowStationsRoutingModule,
        MaterialModule,
        ReactiveFormsModule
    ]
})
export class ShowStationsModule {
}
