import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddStationComponent} from './add-station.component';

import {TrainersResolvers} from '../../../../../shared/resolver/trainers.resolvers';

const routes: Routes = [{
    path: '',
    component: AddStationComponent,
    resolve: {
        trainers: TrainersResolvers,
    }
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddStationRoutingModule {
}
