import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddTraceComponent} from './add-trace.component';

const routes: Routes = [{
    path: '',
    component: AddTraceComponent
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddTrainerRoutingModule {
}
