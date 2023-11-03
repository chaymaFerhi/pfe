import {Route} from '@angular/router';
import {FileManagerComponent} from './file-manager.component';
import {FileManagerListComponent} from './list/list.component';
import {FileManagerDetailsComponent} from './details/details.component';
import {CanDeactivateFileManagerDetails} from './file-manager.guards';
import {CoursesResolvers, CourseManagerItemResolver} from '../../shared/resolver/courses.resolvers';

export const fileManagerRoutes: Route[] = [
    {
        path: '',
        component: FileManagerComponent,
        data: {
            layout: 'modern'
        },
        children: [
            {
                path: 'folders/:folderId',
                component: FileManagerListComponent,
                resolve: {
                    courses: CoursesResolvers,
                    course: CoursesResolvers
                },
                children: [
                    {
                        path: 'details/:id',
                        component: FileManagerDetailsComponent,
                        resolve: {
                            courses: CoursesResolvers,
                            course: CoursesResolvers,

                        },
                        canDeactivate: [CanDeactivateFileManagerDetails]
                    }
                ]
            },
            {
                path: '',
                component: FileManagerListComponent,
                resolve: {
                    courses: CoursesResolvers
                },
                children: [
                    {
                        path: 'details/:id',
                        component: FileManagerDetailsComponent,
                        resolve: {
                            courses: CoursesResolvers,
                            course: CourseManagerItemResolver

                        },
                        canDeactivate: [CanDeactivateFileManagerDetails]
                    }
                ]
            }
        ]
    }
];
