import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ShowUsersComponent} from './show-users.component';
import {
    InventoryBrandsResolver,
    InventoryCategoriesResolver,
    InventoryVendorsResolver
} from '../../../apps/ecommerce/inventory/inventory.resolvers';
import {UsersResolvers} from '../../../../../shared/resolver/users.resolvers';
import {GeometrysResolvers} from '../../../../../shared/resolver/geometrys.resolvers';

const routes: Routes = [{
    path: '',
    component: ShowUsersComponent,
    resolve: {
        brands: InventoryBrandsResolver,
        categories: InventoryCategoriesResolver,
        trainers: UsersResolvers,
        skills: GeometrysResolvers,
        vendors: InventoryVendorsResolver
    }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowUsersRoutingModule { }
