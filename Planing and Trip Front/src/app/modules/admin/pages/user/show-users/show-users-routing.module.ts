import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ShowUsersComponent} from './show-users.component';
import {
    InventoryBrandsResolver,
    InventoryCategoriesResolver,
    InventoryVendorsResolver
} from '../../../apps/ecommerce/inventory/inventory.resolvers';
import {UsersResolvers} from '../../../../../shared/resolver/users.resolvers';
import {SkillsResolvers} from '../../../../../shared/resolver/skills.resolvers';

const routes: Routes = [{
    path: '',
    component: ShowUsersComponent,
    resolve: {
        brands: InventoryBrandsResolver,
        categories: InventoryCategoriesResolver,
        trainers: UsersResolvers,
        skills: SkillsResolvers,
        vendors: InventoryVendorsResolver
    }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowUsersRoutingModule { }
