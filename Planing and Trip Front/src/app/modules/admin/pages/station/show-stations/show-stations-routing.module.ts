import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    InventoryBrandsResolver,
    InventoryCategoriesResolver, InventoryVendorsResolver
} from '../../../apps/ecommerce/inventory/inventory.resolvers';
import {GeometrysResolvers} from '../../../../../shared/resolver/geometrys.resolvers';
import {ShowStationsComponent} from './show-stations.component';
import {StationsResolvers} from '../../../../../shared/resolver/stations.resolvers';

const routes: Routes = [{
    path: '',
    component: ShowStationsComponent,
    resolve: {
        brands: InventoryBrandsResolver,
        categories: InventoryCategoriesResolver,
        stations: StationsResolvers,
        vendors: InventoryVendorsResolver
    }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowStationsRoutingModule { }
