import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    InventoryBrandsResolver,
    InventoryCategoriesResolver, InventoryVendorsResolver
} from '../../../apps/ecommerce/inventory/inventory.resolvers';
import {SkillsResolvers} from '../../../../../shared/resolver/skills.resolvers';
import {ShowStationsComponent} from './show-stations.component';
import {StationsResolvers} from '../../../../../shared/resolver/stations.resolvers';

const routes: Routes = [{
    path: '',
    component: ShowStationsComponent,
    resolve: {
        brands: InventoryBrandsResolver,
        categories: InventoryCategoriesResolver,
        courses: StationsResolvers,
        skills: SkillsResolvers,
        vendors: InventoryVendorsResolver
    }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowStationsRoutingModule { }
