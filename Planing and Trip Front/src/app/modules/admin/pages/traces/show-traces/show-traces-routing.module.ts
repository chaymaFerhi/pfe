import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ShowTracesComponent} from './show-traces.component';
import {
    InventoryBrandsResolver,
    InventoryCategoriesResolver, InventoryVendorsResolver
} from '../../../apps/ecommerce/inventory/inventory.resolvers';
import {TracesResolvers} from '../../../../../shared/resolver/traces-resolvers.service';


const routes: Routes = [{
    path: '',
    component: ShowTracesComponent,
    resolve: {
        brands: InventoryBrandsResolver,
        categories: InventoryCategoriesResolver,
        trainers: TracesResolvers,
        vendors: InventoryVendorsResolver
    }
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShowTracesRoutingModule {
}
