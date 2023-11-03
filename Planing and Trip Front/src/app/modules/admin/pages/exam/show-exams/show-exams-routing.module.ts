import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ShowExamsComponent} from './show-exams.component';
import {QuizsResolvers} from '../../../../../shared/resolver/quizs.resolvers';

const routes: Routes = [{
    path: '',
    component: ShowExamsComponent,
    data: {
        layout: 'modern'
    },
    resolve: {
        quizs: QuizsResolvers
    }
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShowExamsRoutingModule {
}
