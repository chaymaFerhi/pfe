import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddQuizComponent} from './add-quiz.component';
import {LessonByIdResolver} from '../../../../../shared/resolver/lessons.resolvers';

const routes: Routes = [{
    path: '',
    component: AddQuizComponent
    , resolve: {
        lesson: LessonByIdResolver
    }
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddQuizRoutingModule {
}
