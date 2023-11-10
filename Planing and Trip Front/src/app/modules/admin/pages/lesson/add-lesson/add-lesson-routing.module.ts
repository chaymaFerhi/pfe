import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TracesResolvers} from '../../../../../shared/resolver/traces-resolvers.service';
import {AddLessonComponent} from './add-lesson.component';

const routes: Routes = [{
    path: '',
    component: AddLessonComponent,
    resolve: {
        trainers: TracesResolvers,
    }
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddLessonRoutingModule {
}
