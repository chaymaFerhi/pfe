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
        id: 'trainers',
        title: 'Trainer',
        subtitle: '',
        type: 'group',
        icon: 'heroicons_outline:home',
        meta: 'ROLE_ADMIN',
        children: [
            {
                id: 'trainers.add',
                title: 'Add trainer',
                type: 'basic',
                icon: 'heroicons_outline:pencil-alt',
                link: '/pages/add-trainer',
                meta: 'ROLE_ADMIN',

            },
            {
                id: 'trainers.show',
                title: 'Show trainers',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: '/pages/show-trainers',
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
        id: 'courses',
        title: 'Courses',
        subtitle: '',
        type: 'group',
        icon: 'heroicons_outline:home',
        meta: 'ROLE_ADMIN',
        children: [
            {
                id: 'courses.add',
                title: 'Add course',
                type: 'basic',
                icon: 'heroicons_outline:pencil-alt',
                link: '/pages/add-course',
                meta: 'ROLE_ADMIN',
            },
            {
                id: 'courses.show',
                title: 'Show courses',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: '/pages/show-courses',
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
    {
        id: 'lessons',
        title: 'Lessons',
        subtitle: '',
        type: 'group',
        icon: 'heroicons_outline:home',
        meta: 'ROLE_ADMIN',
        children: [
            // {
            //     id: 'lessons.add',
            //     title: 'Add lesson',
            //     type: 'basic',
            //     icon: 'heroicons_outline:pencil-alt',
            //     link: '/pages/add-lesson',
            //     meta: 'ROLE_ADMIN',
            // },
            {
                id: 'lessons.show',
                title: 'Show lesson',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: '/pages/show-lessons',
                meta: 'ROLE_ADMIN',
            },
        ]
    },
    {
        id: 'resources',
        title: 'Resources',
        subtitle: '',
        type: 'group',
        icon: 'heroicons_outline:home',
        meta: 'ROLE_USER',
        children: [

            {
                id: 'resources.show',
                title: 'Show resources',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: '/apps/file-manager',
                meta: 'ROLE_USER',
            },
        ]
    },
    {
        id: 'apps',
        title: 'Academy',
        subtitle: 'Custom made application designs',
        type: 'group',
        icon: 'heroicons_outline:home',
        meta: 'ROLE_USER',
        children: [
            {
                id: 'apps.academy',
                title: 'Academy',
                type: 'basic',
                icon: 'heroicons_outline:academic-cap',
                link: '/apps/academy',
                meta: 'ROLE_USER',
            },
        ]
    },
    {
        id: 'pricing',
        title: 'Offers',
        subtitle: '',
        type: 'group',
        icon: 'heroicons_outline:home',
        meta: 'ROLE_USER',
        children: [
            {
                id: 'apps.offers',
                title: 'Offers',
                type: 'basic',
                icon: 'heroicons_outline:academic-cap',
                link: '/pages/pricing/simple',
                meta: 'ROLE_USER',
            },
        ]
    },
    {
        id: 'passExams',
        title: 'Exams',
        subtitle: '',
        type: 'group',
        icon: 'heroicons_outline:home',
        meta: 'ROLE_USER',
        children: [
            {
                id: 'apps.passExams',
                title: 'Exams',
                type: 'basic',
                icon: 'heroicons_outline:academic-cap',
                link: '/apps/show-exams',
                meta: 'ROLE_USER',
            },
        ]
    },
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
