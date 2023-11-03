import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ShowUsersRoutingModule} from './show-users-routing.module';
import {MaterialModule} from '../../../../../shared/material/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {ShowUsersComponent} from './show-users.component';


@NgModule({
    declarations: [
        ShowUsersComponent
    ],
    imports: [
        CommonModule,
        ShowUsersRoutingModule,
        MaterialModule,
        ReactiveFormsModule
    ]
})
export class ShowUsersModule {
}
