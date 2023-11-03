import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddCourseComponent} from './add-course.component';

import {TrainersResolvers} from '../../../../../shared/resolver/trainers.resolvers';

const routes: Routes = [{
    path: '',
    component: AddCourseComponent,
    resolve: {
        trainers: TrainersResolvers,
    }
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddCourseRoutingModule {
}
