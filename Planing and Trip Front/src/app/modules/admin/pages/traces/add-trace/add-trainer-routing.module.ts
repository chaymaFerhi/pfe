import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddTraceComponent} from './add-trace.component';
import {StationsResolvers} from '../../../../../shared/resolver/stations.resolvers';
import {TraceByIdResolver} from '../../../../../shared/resolver/traces.resolvers';

const routes: Routes = [{
    path: '',
    component: AddTraceComponent,
    resolve: {
        stations: StationsResolvers,
        trace: TraceByIdResolver,
    }
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddTrainerRoutingModule {
}
