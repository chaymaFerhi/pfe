import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {InventoryPagination} from '../../modules/admin/apps/ecommerce/inventory/inventory.types';
import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';
import {map, switchMap, take, tap} from 'rxjs/operators';
import {Quizs, QuizsByLesson} from '../model/quizs.types';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class QuizService {
    private _pagination: BehaviorSubject<InventoryPagination | null> = new BehaviorSubject(null);
    private _quizs: BehaviorSubject<Quizs[] | null> = new BehaviorSubject(null);
    private _quizsByLesson: BehaviorSubject<QuizsByLesson[] | null> = new BehaviorSubject(null);
    private _quiz: BehaviorSubject<Quizs | null> = new BehaviorSubject(null);

    constructor(private _apiService: ApiService,
                private _httpClient: HttpClient) {
    }

    /**
     * Getter for quizs
     */
    get quizs$(): Observable<Quizs[]> {
        return this._quizs.asObservable();
    }

    /**
     * Getter for quizs
     */
    get quizsByLesson$(): Observable<Quizs[]> {
        return this._quizsByLesson.asObservable();
    }

    /**
     * Getter for item
     */
    get quiz$(): Observable<Quizs> {
        return this._quiz.asObservable();
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
    addQuiz(quizs): Observable<Quizs> {
        console.log(quizs);
        return this.quizs$.pipe(
            take(1),
            switchMap(quiz => this._httpClient.post<Quizs>(`${ApiService.apiVersion}${ApiService.apiQuiz}/add-quiz`, quizs).pipe(
                map((newQuiz: any) => {
                    console.log(quiz);
                    console.log(newQuiz);
                    // Update the quizs with the new product

                    // Return the new product
                    return newQuiz;
                })
            ))
        );
    }

    editQuiz(body, id): Observable<Quizs> {
        return this._apiService.patch(`${ApiService.apiVersion}${ApiService.apiQuiz}/${id}`, body).pipe(map(res => res));
    }

    /**
     * Get quiz by id
     */
    getQuizById(id): Observable<Quizs> {
        return this._quizs.pipe(
            take(1),
            map((quizs) => {
                console.log(typeof id);
                // Find the product
                const quiz = quizs.find((item) => {
                    id = id * 1;
                    return item.id === id;
                }) || null;
                // Update the product
                this._quiz.next(quiz);

                // Return the product
                return quiz;
            }),
            switchMap((quiz) => {

                if (!quiz) {
                    return throwError('Could not found product with id of ' + id + '!');
                }

                return of(quiz);
            })
        );
    }

    /**
     * Get quiz list by lesson id
     */
    listQuizsByLessonId(id): Observable<QuizsByLesson[]> {
        return this._httpClient.get<QuizsByLesson[]>
        (`${ApiService.apiVersion}${ApiService.apiQuiz}/find-quizs-lesson-id/${id}`)
            .pipe(
                tap((response) => {
                    this._quizsByLesson.next(response);
                })
            );
    }

    /**
     * Get quizs
     *
     *
     * @param page
     * @param size
     * @param sort
     * @param order
     * @param search
     */
    getAllQuizs(page: number = 0, size: number = 5, sort: string = 'id', order: 'asc' | 'desc' | '' = 'asc', search: string = ''):
        Observable<{ pageable: InventoryPagination; content: Quizs[] }> {
        return this._httpClient.get<{ pageable: InventoryPagination; content: Quizs[] }>
        (`${ApiService.apiVersion}${ApiService.apiQuiz}/get-all-quizs`, {
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
                this._quizs.next(response.content);
            })
        );
    }

    /**
     * Delete the quiz
     *
     * @param quiz
     */
    deleteQuiz(quiz: Quizs): Observable<boolean> {
        return this.quizs$.pipe(
            take(1),
            switchMap(quizs =>
                this._httpClient.delete(`${ApiService.apiVersion}${ApiService.apiQuiz}/delete-quiz/${quiz.id}`).pipe(
                    map(() => {
                        // Find the index of the deleted product
                        const index = quizs.findIndex(item => item.id === quiz.id);
                        // Delete the product
                        quizs.splice(index, 1);
                        // Update the quizs
                        this._quizs.next(quizs);
                        // Return the deleted status
                        return true;
                    })
                ))
        );
    }

    getQuizs(): Observable<Quizs[]> {
        return this._httpClient.get<Quizs[]>(`${ApiService.apiVersion}${ApiService.apiQuiz}`).pipe(
            tap((response: any) => {
                this._quizs.next(response);
            })
        );
    }
}
