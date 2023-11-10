import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddGeometryComponent} from './add-geometry.component';
import {LessonByIdResolver} from '../../../../../shared/resolver/lessons.resolvers';

const routes: Routes = [{
    path: '',
    component: AddGeometryComponent
    , resolve: {
        lesson: LessonByIdResolver
    }
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddGeometryRoutingModule {
}
