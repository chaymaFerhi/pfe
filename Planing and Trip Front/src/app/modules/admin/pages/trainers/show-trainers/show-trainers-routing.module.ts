import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ShowTrainersComponent} from './show-trainers.component';
import {
    InventoryBrandsResolver,
    InventoryCategoriesResolver, InventoryVendorsResolver
} from '../../../apps/ecommerce/inventory/inventory.resolvers';
import {TrainersResolvers} from '../../../../../shared/resolver/trainers.resolvers';
import {SkillsResolvers} from '../../../../../shared/resolver/skills.resolvers';


const routes: Routes = [{
    path: '',
    component: ShowTrainersComponent,
    resolve: {
        brands: InventoryBrandsResolver,
        categories: InventoryCategoriesResolver,
        trainers: TrainersResolvers,
        skills: SkillsResolvers,
        vendors: InventoryVendorsResolver
    }
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShowTrainersRoutingModule {
}
