import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ShowGeometrysRoutingModule} from './show-geometrys-routing.module';
import {ShowGeometrysComponent} from './show-geometrys.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../../../../shared/material/material.module';


@NgModule({
    declarations: [
        ShowGeometrysComponent
    ],
    imports: [
        CommonModule,
        ShowGeometrysRoutingModule,
        MaterialModule,
        ReactiveFormsModule

    ]
})
export class ShowGeometrysModule {
}
