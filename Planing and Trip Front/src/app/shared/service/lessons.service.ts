import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {InventoryPagination} from '../../modules/admin/apps/ecommerce/inventory/inventory.types';
import {Lessons} from '../model/lessons.types';
import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';
import {map, switchMap, take, tap} from 'rxjs/operators';

const lessonURL = environment.lessons;

@Injectable({
    providedIn: 'root'
})
export class LessonsService {
    private _pagination: BehaviorSubject<InventoryPagination | null> = new BehaviorSubject(null);
    private _lessons: BehaviorSubject<Lessons[] | null> = new BehaviorSubject(null);
    private _lessonsCourse: BehaviorSubject<Lessons[] | null> = new BehaviorSubject(null);
    private _lesson: BehaviorSubject<Lessons | null> = new BehaviorSubject(null);

    constructor(private _apiService: ApiService,
                private _httpClient: HttpClient) {
    }

    /**
     * Getter for lessons
     */
    get lessons$(): Observable<Lessons[]> {
        return this._lessons.asObservable();
    }

    /**
     * Getter for item
     */
    get lesson$(): Observable<Lessons> {
        return this._lesson.asObservable();
    }

    /**
     * Getter for item
     */
    get lessonsCourse$(): Observable<Lessons[]> {
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
    addLesson(lesson): Observable<Lessons> {
        return this.lessons$.pipe(
            take(1),
            switchMap(lessons => this._httpClient.post<Lessons>(`${ApiService.apiVersion}${ApiService.apiLessons}/add-lesson`, lesson).pipe(
                map((newLesson) => {
                    if (lessons == null) {
                        lessons = [];
                    }
                    // Update the lessons with the new product
                    this._lessons.next([newLesson, ...lessons]);
                    // Return the new product
                    return newLesson;
                })
            ))
        );
    }

    editLesson(body, id): Observable<Lessons> {
        return this._apiService.patch(`${ApiService.apiVersion}${ApiService.apiLessons}/${id}`, body).pipe(map(res => res));
    }

    /**
     * Get lesson by id
     */
    getLessonById(id): Observable<Lessons> {
        return this._lessons.pipe(
            take(1),
            map((lessons) => {
                // Find the product
                const lesson = lessons.find((item) => {
                    id = id * 1;
                    return item.id === id;
                }) || null;
                // Update the product
                this._lesson.next(lesson);
                // Return the product
                return lesson;
            }),
            switchMap((lesson) => {

                if (!lesson) {
                    return throwError('Could not found product with id of ' + id + '!');
                }

                return of(lesson);
            })
        );
    }

    /**
     * Get lessons
     *
     *
     * @param page
     * @param size
     * @param sort
     * @param order
     * @param search
     */
    getAllLessons(page=0, size=0, sort: string = 'title', order: 'asc' | 'desc' | '' = 'asc', search?):
        Observable<{ pageable: InventoryPagination; content: Lessons[] }> {
        return this._httpClient.get<{ pageable: InventoryPagination; content: Lessons[] }>
        (`${ApiService.apiVersion}${ApiService.apiLessons}/get-all-lessons`, {
            params: {
                page: '' + page,
                size: '' + size,
                sort,
                order,
                search
            }
        }).pipe(
            tap((response) => {
                console.log(response.pageable);
                this._pagination.next(response.pageable);
                this._lessons.next(response.content);
            })
        );
    }

    /**
     * Delete the lesson
     *
     * @param lesson
     */
    deleteLesson(lesson: Lessons): Observable<boolean> {
        return this.lessons$.pipe(
            take(1),
            switchMap(lessons =>
                this._httpClient.delete(`${ApiService.apiVersion}${ApiService.apiLessons}/delete-lesson/${lesson.id}`).pipe(
                    map(() => {
                        // Find the index of the deleted product
                        const index = lessons.findIndex(item => item.id === lesson.id);
                        // Delete the product
                        lessons.splice(index, 1);
                        // Update the lessons
                        this._lessons.next(lessons);
                        // Return the deleted status
                        return true;
                    })
                ))
        );
    }

    getLessons(): Observable<Lessons[]> {
        return this._httpClient.get<Lessons[]>(`${ApiService.apiVersion}${ApiService.apiLessons}`).pipe(
            tap((response: any) => {
                this._lessons.next(response);
            })
        );
    }

    getLessonsByCourseId(idCourse: string): Observable<Lessons[]> {
        return this._httpClient.get<Lessons[]>(`${ApiService.apiVersion}${ApiService.apiLessons}/find-lesson-by-course/${idCourse}`).pipe(
            tap((response: any) => {
                this._lessonsCourse.next(response);
            })
        );
    }
}
