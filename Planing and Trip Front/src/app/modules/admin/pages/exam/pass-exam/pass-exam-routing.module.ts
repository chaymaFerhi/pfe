import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PassExamComponent} from './pass-exam.component';
import {QuizsByLessonResolvers} from '../../../../../shared/resolver/quizs.resolvers';

const routes: Routes = [
    {
        path: '',
        component: PassExamComponent,
        data: {
            layout: 'modern'
        },
        resolve: {
            quizs: QuizsByLessonResolvers
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PassExamRoutingModule {
}
