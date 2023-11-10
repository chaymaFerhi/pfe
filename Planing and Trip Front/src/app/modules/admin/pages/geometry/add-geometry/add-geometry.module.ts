import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../../../../shared/material/material.module';
import {ReversePipeModule} from '@fuse/pipes/reverse/reverse.module';
import {AddGeometryComponent} from './add-geometry.component';
import {AddGeometryRoutingModule} from './add-geometry-routing.module';


@NgModule({
    declarations: [
        AddGeometryComponent
    ],
    exports: [
    ],
    imports: [
        CommonModule,
        AddGeometryRoutingModule,
        MaterialModule,
        ReactiveFormsModule,
        ReversePipeModule,

    ]
})
export class AddGeometryModule {
}
