import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddGeometryComponent} from './add-geometry.component';

const routes: Routes = [{
    path: '',
    component: AddGeometryComponent
    , resolve: {
    }
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddGeometryRoutingModule {
}
