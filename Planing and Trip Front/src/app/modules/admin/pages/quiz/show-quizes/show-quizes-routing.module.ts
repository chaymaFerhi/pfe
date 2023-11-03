import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ShowQuizesComponent} from './show-quizes.component';

const routes: Routes = [{
    path: '',
    component: ShowQuizesComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowQuizesRoutingModule { }
