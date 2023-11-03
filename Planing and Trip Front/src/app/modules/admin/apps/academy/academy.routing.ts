import { Route } from '@angular/router';
import { AcademyComponent } from 'app/modules/admin/apps/academy/academy.component';
import { AcademyListComponent } from 'app/modules/admin/apps/academy/list/list.component';
import { AcademyDetailsComponent } from 'app/modules/admin/apps/academy/details/details.component';
import { AcademyCategoriesResolver } from 'app/modules/admin/apps/academy/academy.resolvers';
import {CourseByIdResolver, CoursesResolvers} from '../../../../shared/resolver/courses.resolvers';
import {LessonCourseResolver} from '../../../../shared/resolver/lessons.resolvers';

export const academyRoutes: Route[] = [
    {
        path     : '',
        component: AcademyComponent,
        data:{
            layout:'modern'
        },
        resolve  : {
            categories: AcademyCategoriesResolver
        },
        children : [
            {
                path     : '',
                pathMatch: 'full',
                component: AcademyListComponent,
                resolve  : {
                    // courses: CoursesResolvers
                }
            },
            {
                path     : ':id',
                component: AcademyDetailsComponent,
                resolve  : {
                    course: CourseByIdResolver,
                    lessonsCourse: LessonCourseResolver
                }
            }
        ]
    }
];
