import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {InventoryPagination} from '../../modules/admin/apps/ecommerce/inventory/inventory.types';
import {Courses} from '../model/courses.types';
import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';
import {map, switchMap, take, tap} from 'rxjs/operators';
import {Steps} from "../model/steps.types";

@Injectable({
    providedIn: 'root'
})
export class CoursesService {
    private _pagination: BehaviorSubject<InventoryPagination | null> = new BehaviorSubject(null);
    private _courses: BehaviorSubject<Courses[] | null> = new BehaviorSubject(null);
    private _course: BehaviorSubject<Courses | null> = new BehaviorSubject(null);
    private _lessonsCourse: BehaviorSubject<Courses | null> = new BehaviorSubject(null);

    constructor(private _apiService: ApiService,
                private _httpClient: HttpClient) {
    }

    /**
     * Getter for courses
     */
    get courses$(): Observable<Courses[]> {
        return this._courses.asObservable();
    }

    /**
     * Getter for item
     */
    get course$(): Observable<Courses> {
        return this._course.asObservable();
    }

    /**
     * Getter for item
     */
    get _lessonsCourse$(): Observable<Courses> {
        return this._lessonsCourse.asObservable();
    }

    /**
     * Getter for pagination
     */
    get pagination$(): Observable<InventoryPagination> {
        return this._pagination.asObservable();
    }

    /**
     * Create product
     */
    addCourse(course): Observable<Courses> {
        return this.courses$.pipe(
            take(1),
            switchMap(courses => this._httpClient.post<Courses>(`${ApiService.apiVersion}${ApiService.apiCourses}/add-course`, course).pipe(
                map((newCourse) => {

                    // Update the courses with the new product
                    this._courses.next([newCourse]);

                    // Return the new product
                    return newCourse;
                })
            ))
        );
    }

    editCourse(body, id): Observable<Courses> {
        return this._apiService.patch(`${ApiService.apiVersion}${ApiService.apiCourses}/${id}`, body).pipe(map(res => res));
    }

    /**
     * Get course by id
     */
    getCourseById(id: string): Observable<Courses> {
        return this._httpClient.get<Courses>(`${ApiService.apiVersion}${ApiService.apiCourses}/find-course/${id}`).pipe(
            map((course) => {
                // Update the course
                this._course.next(course);

                // Return the course
                return course;
            }),
            switchMap((course) => {

                if (!course) {
                    return throwError('Could not found course with id of ' + id + '!');
                }

                return of(course);
            })
        );
    }

    /**
     * Get course by id
     */
    getLessonsByCourseId(id: string): Observable<Courses> {
        return this._httpClient.get<Courses>(`${ApiService.apiVersion}${ApiService.apiCourses}/find-lessons-course/${id}`).pipe(
            map((course) => {
                // Update the course
                this._lessonsCourse.next(course);

                // Return the course
                return course;
            }),
            switchMap((course) => {

                if (!course) {
                    return throwError('Could not found course with id of ' + id + '!');
                }

                return of(course);
            })
        );
    }

    /**
     * Get courses
     *
     *
     * @param page
     * @param size
     * @param sort
     * @param order
     * @param search
     */
    getAllCourses(page: number = 0, size: number = 5, sort: string = 'title', order: 'asc' | 'desc' | '' = 'asc', search: string = ''):
        Observable<{ pageable: InventoryPagination; content: Courses[] }> {
        return this._httpClient.get<{ pageable: InventoryPagination; content: Courses[] }>
        (`${ApiService.apiVersion}${ApiService.apiCourses}/get-all-courses`, {
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
                this._courses.next(response.content);
            })
        );
    }

    /**
     * Delete the course
     *
     * @param course
     */
    deleteCourse(course: Courses): Observable<boolean> {
        return this.courses$.pipe(
            take(1),
            switchMap(courses =>
                this._httpClient.delete(`${ApiService.apiVersion}${ApiService.apiCourses}/delete-course/${course.id}`).pipe(
                    map(() => {
                        // Find the index of the deleted product
                        const index = courses.findIndex(item => item.id === course.id);
                        // Delete the product
                        courses.splice(index, 1);
                        // Update the courses
                        this._courses.next(courses);
                        // Return the deleted status
                        return true;
                    })
                ))
        );
    }

    getCourses(): Observable<Courses[]> {
        return this._httpClient.get<Courses[]>(`${ApiService.apiVersion}${ApiService.apiCourses}`).pipe(
            tap((response: any) => {
                this._courses.next(response);
            })
        );
    }

}
