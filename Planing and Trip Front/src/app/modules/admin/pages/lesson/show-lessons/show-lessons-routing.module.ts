import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    InventoryBrandsResolver,
    InventoryCategoriesResolver, InventoryVendorsResolver
} from '../../../apps/ecommerce/inventory/inventory.resolvers';
import {GeometrysResolvers} from '../../../../../shared/resolver/geometrys.resolvers';
import {ShowLessonsComponent} from './show-lessons.component';
import {LessonsResolvers} from '../../../../../shared/resolver/lessons.resolvers';

const routes: Routes = [{
    path: '',
    component: ShowLessonsComponent,
    resolve: {
        brands: InventoryBrandsResolver,
        categories: InventoryCategoriesResolver,
        lessons: LessonsResolvers,
        skills: GeometrysResolvers,
        vendors: InventoryVendorsResolver,
        paginations: LessonsResolvers
    }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowLessonsRoutingModule { }
