import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddTraceComponent} from './add-trace.component';
import {TracesResolvers} from '../../../../../shared/resolver/traces-resolvers.service';
import {StationsResolvers} from '../../../../../shared/resolver/stations.resolvers';

const routes: Routes = [{
    path: '',
    component: AddTraceComponent,
    resolve: {
        stations: StationsResolvers,
    }
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddTrainerRoutingModule {
}
