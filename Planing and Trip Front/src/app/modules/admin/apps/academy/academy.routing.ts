import {Route} from '@angular/router';
import {AcademyComponent} from 'app/modules/admin/apps/academy/academy.component';
import {AcademyListComponent} from 'app/modules/admin/apps/academy/list/list.component';
import {AcademyCategoriesResolver} from 'app/modules/admin/apps/academy/academy.resolvers';
import {StationsResolvers} from '../../../../shared/resolver/stations.resolvers';

export const academyRoutes: Route[] = [
    {
        path: '',
        component: AcademyComponent,
        data: {
            layout: 'modern'
        },
        resolve: {
            categories: AcademyCategoriesResolver
        },
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: AcademyListComponent,
                resolve: {
                    stations: StationsResolvers
                }
            },
        ]
    }
];
