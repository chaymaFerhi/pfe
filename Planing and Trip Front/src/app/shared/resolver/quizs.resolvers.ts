import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {CoursesService} from '../service/courses.service';
import {Courses} from '../model/courses.types';
import {InventoryPagination} from '../../modules/admin/apps/ecommerce/inventory/inventory.types';
import {catchError} from 'rxjs/operators';
import {QuizService} from "../service/quiz.service";
import {Quizs, QuizsByLesson} from "../model/quizs.types";

@Injectable({
    providedIn: 'root'
})
export class QuizsResolvers implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(private _quizService: QuizService) {
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ pageable: InventoryPagination; content: Quizs[] }> {
        return this._quizService.getAllQuizs();
    }
}
@Injectable({
    providedIn: 'root'
})
export class QuizsByLessonResolvers implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(private _quizService: QuizService) {
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QuizsByLesson[]> {
        console.log(route.paramMap.get('idQuiz'));
        return this._quizService.listQuizsByLessonId(route.paramMap.get('idQuiz'));
    }
}


