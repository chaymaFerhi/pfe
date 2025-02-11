import {Route} from '@angular/router';
import {AcademyComponent} from 'app/modules/admin/apps/academy/academy.component';
import {AcademyListComponent} from 'app/modules/admin/apps/academy/list/list.component';
import {AcademyCategoriesResolver} from 'app/modules/admin/apps/academy/academy.resolvers';
import {StationsResolvers} from '../../../../shared/resolver/stations.resolvers';
import {ActivitiesResolver} from '../../pages/activities/activities.resolvers';
import {TracesResolvers} from '../../../../shared/resolver/traces.resolvers';
import {PaymentComponent} from './payment/payment.component';
import {ActiveUserResolvers} from '../../../../shared/resolver/users.resolvers';

export const academyRoutes: Route[] = [
    {
        path: '',
        component: AcademyComponent,
        data: {
            layout: 'modern'
        },
        resolve: {
            activities: ActivitiesResolver,

            categories: AcademyCategoriesResolver
        },
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: AcademyListComponent,
                resolve: {
                    traces: TracesResolvers,

                    stations: StationsResolvers
                }
            },
            {
                path: 'payment/:id',
                component: PaymentComponent,
                resolve: {

                    users: ActiveUserResolvers
                }
            },
        ]
    }
];
