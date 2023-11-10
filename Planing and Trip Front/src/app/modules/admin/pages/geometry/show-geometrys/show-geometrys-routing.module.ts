import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ShowGeometrysComponent} from './show-geometrys.component';

const routes: Routes = [{
    path: '',
    component: ShowGeometrysComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowGeometrysRoutingModule { }
