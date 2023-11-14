import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import {MaterialModule} from '../../../../../shared/material/material.module';
import {PaymentComponent} from './payment.component';

export const routes: Route[] = [
    {
        path     : '',
        component: PaymentComponent
    }
];

@NgModule({
    declarations: [
    ],
    imports     : [
        RouterModule.forChild(routes),
        SharedModule,
        MaterialModule
    ]
})
export class PaymentModule
{
}
