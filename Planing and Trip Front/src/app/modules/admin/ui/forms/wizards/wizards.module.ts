import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { FormsWizardsComponent } from 'app/modules/admin/ui/forms/wizards/wizards.component';
import {MaterialModule} from '../../../../../shared/material/material.module';

export const routes: Route[] = [
    {
        path     : '',
        component: FormsWizardsComponent
    }
];

@NgModule({
    declarations: [
        FormsWizardsComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        SharedModule,
        MaterialModule
    ]
})
export class FormsWizardsModule
{
}
