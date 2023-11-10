import {Route} from '@angular/router';
import {AuthGuard} from 'app/core/auth/guards/auth.guard';
import {LayoutComponent} from 'app/layout/layout.component';
import {InitialDataResolver} from 'app/app.resolvers';
import {NoAuthGuard} from './core/auth/guards/noAuth.guard';

const roleAdmin = 'ROLE_ADMIN';
const roleUser = 'ROLE_USER';
// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/dashboards/project'
    {path: '', pathMatch: 'full', redirectTo: '/apps/academy'},

    // Redirect signed-in user to the '/apps/academy'
    //
    // After the user signs in, the sign-in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    {path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'apps/academy'},

    // Auth routes for guests
    {
        path: '',
        // canActivate: [NoAuthGuard],
        // canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {
                path: 'confirmation-required',
                loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule)
            },
            {
                path: 'forgot-password',
                loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule)
            },
            {
                path: 'reset-password',
                loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule)
            },
            {
                path: 'sign-in',
                loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule)
            },
            {
                path: 'sign-up',
                loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule)
            },
            {
                path: 'apps',
                data: {
                    role: [roleAdmin, roleUser]
                },
                resolve: {
                    initialData: InitialDataResolver,
                },
                children: [
                    {
                        path: 'academy',
                        data: {
                            // role: [roleAdmin, roleUser]
                        },
                        loadChildren: () => import('app/modules/admin/apps/academy/academy.module').then(m => m.AcademyModule)
                    },
                    {
                        path: 'ecommerce',
                        loadChildren: () => import('app/modules/admin/apps/ecommerce/ecommerce.module').then(m => m.ECommerceModule)
                    },
                    {
                        path: 'show-exams',
                        loadChildren: () => import('app/modules/admin/pages/exam/show-exams/show-exams.module').then(m => m.ShowExamsModule)
                    },
                    {
                        path: 'pass-exam/:idQuiz',
                        loadChildren: () => import('app/modules/admin/pages/exam/pass-exam/pass-exam.module').then(m => m.PassExamModule)
                    },
                ]
            }
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {
                path: 'sign-out',
                loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule)
            },
            {
                path: 'unlock-session',
                loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule)
            }
        ]
    },

    // Landing routes
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {
                path: 'home',
                loadChildren: () => import('app/modules/landing/home/home.module').then(m => m.LandingHomeModule)
            },
        ]
    },

    // Admin routes
    {
        path: '',
        // canActivate: [AuthGuard],
        // canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [

            // Dashboards
            {
                path: 'dashboards', children: [
                    {
                        path: 'project',
                        data: {
                            role: roleAdmin
                        },
                        loadChildren: () => import('app/modules/admin/dashboards/project/project.module').then(m => m.ProjectModule)
                    },
                    {
                        path: 'analytics',
                        loadChildren: () => import('app/modules/admin/dashboards/analytics/analytics.module').then(m => m.AnalyticsModule)
                    },
                    {
                        path: 'finance',
                        loadChildren: () => import('app/modules/admin/dashboards/finance/finance.module').then(m => m.FinanceModule)
                    },
                    {
                        path: 'crypto',
                        loadChildren: () => import('app/modules/admin/dashboards/crypto/crypto.module').then(m => m.CryptoModule)
                    },
                ]
            },
            // Pages
            {
                path: 'pages',
                // canActivate: [AuthGuard],
                // canActivateChild: [AuthGuard],
                children: [

                    // Activities
                    {
                        path: 'activities',
                        loadChildren: () => import('app/modules/admin/pages/activities/activities.module').then(m => m.ActivitiesModule)
                    },
                    {
                        path: 'add-station',
                        canActivate: [AuthGuard],
                        data: {
                            role: roleAdmin
                        },
                        loadChildren: () => import('app/modules/admin/pages/station/add-station/add-station.module').then(m => m.AddStationModule)
                    },
                    {
                        path: 'show-stations',
                        data: {
                            role: roleAdmin
                        },
                        loadChildren: () => import('app/modules/admin/pages/station/show-stations/show-stations.module').then(m => m.ShowStationsModule)
                    },
                    {
                        path: 'add-geometry/:idGeometry',
                        data: {
                            role: roleAdmin
                        },
                        loadChildren: () => import('app/modules/admin/pages/geometry/add-geometry/add-geometry.module').then(m => m.AddGeometryModule)
                    },
                    {
                        path: 'show-geometryes',
                        data: {
                            role: roleAdmin
                        },
                        loadChildren: () => import('app/modules/admin/pages/geometry/show-geometrys/show-geometrys.module').then(m => m.ShowGeometrysModule)
                    },
                    {
                        path: 'show-traces',
                        data: {
                            role: roleAdmin
                        },
                        loadChildren: () => import('app/modules/admin/pages/traces/show-traces/show-traces.module').then(m => m.ShowTracesModule)
                    },
                    {
                        path: 'add-trace',
                        data: {
                            role: roleAdmin
                        },
                        loadChildren: () => import('app/modules/admin/pages/traces/add-trace/add-trace.module').then(m => m.AddTraceModule)
                    },
                    {
                        path: 'show-lessons',
                        data: {
                            role: roleAdmin
                        },
                        loadChildren: () => import('app/modules/admin/pages/lesson/show-lessons/show-lessons.module').then(m => m.ShowLessonsModule)
                    },
                    {
                        path: 'add-lesson/:idCourse',
                        data: {
                            role: roleAdmin
                        },
                        loadChildren: () => import('app/modules/admin/pages/lesson/add-lesson/add-lesson.module').then(m => m.AddLessonModule)
                    },

                    {
                        path: 'add-user',
                        data: {
                            role: roleAdmin
                        },
                        loadChildren: () => import('app/modules/admin/pages/user/add-user/add-user.module').then(m => m.AddUserModule)
                    },
                    {
                        path: 'show-users',
                        data: {
                            role: roleAdmin
                        },
                        loadChildren: () => import('app/modules/admin/pages/user/show-users/show-users.module').then(m => m.ShowUsersModule)
                    },
                    // Error
                    {
                        path: 'error', children: [
                            {
                                path: '404',
                                loadChildren: () => import('app/modules/admin/pages/error/error-404/error-404.module').then(m => m.Error404Module)
                            },
                            {
                                path: '500',
                                loadChildren: () => import('app/modules/admin/pages/error/error-500/error-500.module').then(m => m.Error500Module)
                            }
                        ]
                    },
                    // Pricing
                    {
                        path: 'pricing',
                        data: {
                            role: roleUser,
                            layout: 'modern'

                        },
                        children: [

                            {
                                path: 'simple',
                                data: {
                                    role: roleUser
                                },
                                loadChildren: () => import('app/modules/admin/pages/pricing/simple/simple.module').then(m => m.PricingSimpleModule)
                            },

                        ]
                    },

                    // Profile
                    {
                        path: 'profile',
                        loadChildren: () => import('app/modules/admin/pages/profile/profile.module').then(m => m.ProfileModule)
                    },

                    // Settings
                    {
                        path: 'settings',
                        loadChildren: () => import('app/modules/admin/pages/settings/settings.module').then(m => m.SettingsModule)
                    },
                ]
            },

            // User Interface
            {
                path: 'ui', children: [

                    // Material Components
                    {
                        path: 'material-components',
                        loadChildren: () => import('app/modules/admin/ui/material-components/material-components.module').then(m => m.MaterialComponentsModule)
                    },

                    // Fuse Components
                    {
                        path: 'fuse-components',
                        loadChildren: () => import('app/modules/admin/ui/fuse-components/fuse-components.module').then(m => m.FuseComponentsModule)
                    },

                    // Other Components
                    {
                        path: 'other-components',
                        loadChildren: () => import('app/modules/admin/ui/other-components/other-components.module').then(m => m.OtherComponentsModule)
                    },


                    // Advanced Search
                    {
                        path: 'advanced-search',
                        loadChildren: () => import('app/modules/admin/ui/advanced-search/advanced-search.module').then(m => m.AdvancedSearchModule)
                    },

                    // Cards
                    {
                        path: 'cards',
                        loadChildren: () => import('app/modules/admin/ui/cards/cards.module').then(m => m.CardsModule)
                    },

                    // Colors
                    {
                        path: 'colors',
                        loadChildren: () => import('app/modules/admin/ui/colors/colors.module').then(m => m.ColorsModule)
                    },

                    // Confirmation Dialog
                    {
                        path: 'confirmation-dialog',
                        loadChildren: () => import('app/modules/admin/ui/confirmation-dialog/confirmation-dialog.module').then(m => m.ConfirmationDialogModule)
                    },


                    // Forms
                    {
                        path: 'forms', children: [
                            {
                                path: 'fields',
                                loadChildren: () => import('app/modules/admin/ui/forms/fields/fields.module').then(m => m.FormsFieldsModule)
                            },
                            {
                                path: 'layouts',
                                loadChildren: () => import('app/modules/admin/ui/forms/layouts/layouts.module').then(m => m.FormsLayoutsModule)
                            },
                            {
                                path: 'wizards',
                                loadChildren: () => import('app/modules/admin/ui/forms/wizards/wizards.module').then(m => m.FormsWizardsModule)
                            }
                        ]
                    },

                    // Icons
                    {
                        path: 'icons',
                        loadChildren: () => import('app/modules/admin/ui/icons/icons.module').then(m => m.IconsModule)
                    },

                    // Page Layouts
                    {
                        path: 'page-layouts',
                        loadChildren: () => import('app/modules/admin/ui/page-layouts/page-layouts.module').then(m => m.PageLayoutsModule)
                    },

                ]
            },

            // Documentation
            {
                path: 'docs', children: [

                    // Changelog
                    {
                        path: 'changelog',
                        loadChildren: () => import('app/modules/admin/docs/changelog/changelog.module').then(m => m.ChangelogModule)
                    },

                    // Guides
                    {
                        path: 'guides',
                        loadChildren: () => import('app/modules/admin/docs/guides/guides.module').then(m => m.GuidesModule)
                    }
                ]
            },

            // 404 & Catch all
            {
                path: '404-not-found',
                pathMatch: 'full',
                loadChildren: () => import('app/modules/admin/pages/error/error-404/error-404.module').then(m => m.Error404Module)
            },
            {path: '**', redirectTo: '404-not-found'}
        ]
    }
];
