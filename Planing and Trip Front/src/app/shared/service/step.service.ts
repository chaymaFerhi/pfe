import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {Steps} from '../model/steps.types';
import {map, switchMap, take, tap} from 'rxjs/operators';
import {InventoryPagination} from '../../modules/admin/apps/ecommerce/inventory/inventory.types';
import {HttpClient} from '@angular/common/http';
import {CoursesService} from "./courses.service";

@Injectable({
    providedIn: 'root'
})
export class StepService {
    private _pagination: BehaviorSubject<InventoryPagination | null> = new BehaviorSubject(null);
    private _steps: BehaviorSubject<Steps[] | null> = new BehaviorSubject(null);
    private _step: BehaviorSubject<Steps | null> = new BehaviorSubject(null);
    step:any;
    constructor(private _apiService: ApiService,
                private _courseService: CoursesService,
                private _httpClient: HttpClient) {
    }

    /**
     * Getter for products
     */
    get steps$(): Observable<Steps[]> {
        return this._steps.asObservable();
    }

    /**
     * Getter for pagination
     */
    get pagination$(): Observable<InventoryPagination> {
        return this._pagination.asObservable();
    }

    addStep(body): Observable<any> {
        console.log(body);
        return this._apiService.post(`${ApiService.apiStep}/add`, body)
            .pipe(map(res => res));

    }

    editStep(body, id): Observable<Steps> {
        return this._apiService.patch(`${ApiService.apiStep}/${id}`, body).pipe(map(res => res));
    }

    /**
     * Get step by id
     */
    getStepById(id: number): Observable<Steps> {
        return this._steps.pipe(
            take(1),
            map((steps) => {

                // Find the product
                const step = steps.find(item => item.id === id) || null;

                // Update the product
                this._step.next(step);

                // Return the product
                return step;
            }),
            switchMap((step) => {

                if (!step) {
                    return throwError('Could not found product with id of ' + id + '!');
                }

                return of(step);
            })
        );
    }

    /**
     * Get step by id
     */
    getStepsByCourseId(id: string): Observable<Steps> {
        return this._courseService.getCourseById(id).pipe(
            take(1),
            map((courses) => {
                console.log(courses)
                // Find the product
                // const step = courses.lessons.steps.find(item => item.id === id) || null;
                // console.log(step);
                // Update the product
                // this._step.next(step);

                return this.step;
                // Return the product
                // return step;
            }),
            switchMap((step) => {

                if (!step) {
                    return throwError('Could not found course with id of ' + id + '!');
                }

                return of(step);
            })
        );
    }

    /**
     * Get products
     *
     *
     * @param page
     * @param size
     * @param sort
     * @param order
     * @param search
     */
    getAllSteps(page: number = 0, size: number = 10, sort: string = 'title', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
        Observable<{ pageable: InventoryPagination; content: Steps[] }> {
        return this._httpClient.get<{ pageable: InventoryPagination; content: Steps[] }>
        (`${ApiService.apiVersion}${ApiService.apiStep}/get-all-steps`, {
            params: {
                page: '' + page,
                size: '' + size,
                sort,
                order,
                search
            }
        }).pipe(
            tap((response) => {
                this._pagination.next(response.pageable);
                this._steps.next(response.content);
            })
        );
    }

    /**
     * Delete the step
     *
     * @param step
     */
    deleteStep(step: Steps): Observable<boolean> {
        return this.steps$.pipe(
            take(1),
            switchMap(steps =>
                this._httpClient.delete(`${ApiService.apiVersion}${ApiService.apiStep}/delete-step/${step.id}`).pipe(
                    map(() => {
                        // Find the index of the deleted product
                        const index = steps.findIndex(item => item.id === step.id);
                        // Delete the product
                        steps.splice(index, 1);
                        // Update the steps
                        this._steps.next(steps);
                        // Return the deleted status
                        return true;
                    })
                ))
        );
    }
}
