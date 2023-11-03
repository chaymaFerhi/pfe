import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AcademyService} from 'app/modules/admin/apps/academy/academy.service';
import {CoursesService} from '../../../../shared/service/courses.service';
import {Courses} from '../../../../shared/model/courses.types';
import {Category} from '../../../../shared/model/category.types';

@Injectable({
    providedIn: 'root'
})
export class AcademyCategoriesResolver implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(private _academyService: AcademyService) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Category[]> {
        return this._academyService.getCategories();
    }
}

@Injectable({
    providedIn: 'root'
})
export class AcademyCoursesResolver implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(private _courseService: CoursesService) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Courses[]> {
        return this._courseService.getCourses();
    }
}


