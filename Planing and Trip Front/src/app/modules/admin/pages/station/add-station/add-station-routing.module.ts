import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddStationComponent} from './add-station.component';

import {StationsResolvers} from '../../../../../shared/resolver/stations.resolvers';

const routes: Routes = [{
    path: '',
    component: AddStationComponent,
    resolve: {
        trainers: StationsResolvers,
    }
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddStationRoutingModule {
}
