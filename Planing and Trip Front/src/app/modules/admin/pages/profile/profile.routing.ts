import {Route} from '@angular/router';
import {ProfileComponent} from 'app/modules/admin/pages/profile/profile.component';
import {ActiveUserResolvers} from '../../../../shared/resolver/users.resolvers';

export const profileRoutes: Route[] = [
    {
        path     : '',
        component: ProfileComponent
    }
];
