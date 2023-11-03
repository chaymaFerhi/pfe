import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TrainersResolvers} from '../../../../../shared/resolver/trainers.resolvers';
import {AddLessonComponent} from './add-lesson.component';
import {StepsResolver} from '../../../../../shared/resolver/steps.resolver';

const routes: Routes = [{
    path: '',
    component: AddLessonComponent,
    resolve: {
        trainers: TrainersResolvers,
        steps: StepsResolver,
    }
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddLessonRoutingModule {
}
