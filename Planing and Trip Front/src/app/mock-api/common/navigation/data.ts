/* eslint-disable */
import {FuseNavigationItem} from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [

    {
        id: 'dashboards',
        title: 'Dashboards',
        meta: 'ROLE_ADMIN',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: '/dashboards/project',
    },
    {
        id: 'traces',
        title: 'Trace',
        subtitle: '',
        type: 'group',
        icon: 'heroicons_outline:home',
        meta: 'ROLE_ADMIN',
        children: [
            {
                id: 'traces.add',
                title: 'Add trace',
                type: 'basic',
                icon: 'heroicons_outline:pencil-alt',
                link: '/pages/add-trace',
                meta: 'ROLE_ADMIN',

            },
            {
                id: 'traces.show',
                title: 'Show traces',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: '/pages/show-traces',
                meta: 'ROLE_ADMIN',

            },
        ]
    },
    {
        id: 'users',
        title: 'Users',
        subtitle: '',
        type: 'group',
        icon: 'heroicons_outline:home',
        meta: 'ROLE_ADMIN',
        children: [
            {
                id: 'users.add',
                title: 'Add user',
                type: 'basic',
                icon: 'heroicons_outline:pencil-alt',
                link: '/pages/add-user',
                meta: 'ROLE_ADMIN',

            },
            {
                id: 'users.show',
                title: 'Show users',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: '/pages/show-users',
                meta: 'ROLE_ADMIN',
            },
        ]
    },
    {
        id: 'stations',
        title: 'Stations',
        subtitle: '',
        type: 'group',
        icon: 'heroicons_outline:home',
        meta: 'ROLE_ADMIN',
        children: [
            {
                id: 'stations.add',
                title: 'Add station',
                type: 'basic',
                icon: 'heroicons_outline:pencil-alt',
                link: '/pages/add-station',
                meta: 'ROLE_ADMIN',
            },
            {
                id: 'stations.show',
                title: 'Show stations',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: '/pages/show-stations',
                meta: 'ROLE_ADMIN',
            },
        ]
    },
    // {
    //     id: 'quizes',
    //     title: 'Quiz',
    //     subtitle: '',
    //     type: 'group',
    //     icon: 'heroicons_outline:home',
    //     meta: 'ROLE_ADMIN',
    //     children: [
    //         {
    //             id: 'quizes.add',
    //             title: 'Add quiz',
    //             type: 'basic',
    //             icon: 'heroicons_outline:pencil-alt',
    //             link: '/pages/add-quiz',
    //             meta: 'ROLE_ADMIN',
    //         },
    //         {
    //             id: 'quizes.show',
    //             title: 'Show quizes',
    //             type: 'basic',
    //             icon: 'heroicons_outline:chart-pie',
    //             link: '/pages/show-quizes',
    //             meta: 'ROLE_ADMIN',
    //         },
    //     ]
    // },
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboards',
        title: 'Dashboards',
        tooltip: 'Dashboards',
        type: 'basic',
        icon: 'heroicons_outline:home',
        meta: 'ROLE_ADMIN',
        link: '/dashboards/project',
    },
    {
        id: 'resources',
        title: 'Resources',
        subtitle: '',
        type: 'group',
        meta: 'ROLE_USER',
        icon: 'heroicons_outline:home',
        children: [

            {
                id: 'resources.show',
                title: 'Show resources',
                type: 'basic',
                meta: '',
                icon: 'heroicons_outline:chart-pie',
                link: '/apps/file-manager'
            },
        ]
    }

];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboards',
        title: 'DASHBOARDS',
        type: 'group',
        meta: 'ROLE_ADMIN',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'resources',
        title: 'Resources',
        meta: 'ROLE_USER',
        subtitle: '',
        type: 'group',
        icon: 'heroicons_outline:home',
        children: [

            {
                id: 'resources.show',
                title: 'Show resources',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: '/apps/file-manager',
                meta: ''
            },
        ]
    }

];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboards',
        title: 'Dashboards',
        meta: 'ROLE_ADMIN',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: '/dashboards/project',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },

    {
        id: 'apps',
        title: 'Academy',
        subtitle: '',
        type: 'basic',
        icon: 'heroicons_outline:home',
        meta: 'ROLE_USER',
        link: '/apps/academy',
    },
    {
        id: 'resources',
        title: 'Resources',
        subtitle: '',
        type: 'basic',
        meta: 'ROLE_USER',
        icon: 'heroicons_outline:folder',
        link: '/apps/file-manager'
    },
    {
        id: 'pricing',
        title: 'Offers',
        subtitle: '',
        type: 'basic',
        icon: 'heroicons_outline:shopping-bag',
        meta: 'ROLE_USER',
        link: '/pages/pricing/simple',
    }
];
