import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddStationComponent} from './add-station.component';

import {StationByIdResolver, StationsResolvers} from '../../../../../shared/resolver/stations.resolvers';

const routes: Routes = [{
    path: '',
    component: AddStationComponent,
    resolve: {
        station: StationByIdResolver,
    }
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddStationRoutingModule {
}
