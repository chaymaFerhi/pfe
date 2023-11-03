import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    public static apiVersion = environment.apiUrl;
    public static apiPicture = environment.apiImg;
    public static apiUser = environment.users;
    public static apiSKills = environment.skills;
    public static apiCourses = environment.courses;
    public static apiLessons = environment.lessons;
    public static apiTrainer = environment.trainers;
    public static apiQuiz = environment.quizs;
    public static apiStep = environment.steps;

    token: any;

    constructor(private http: HttpClient, private route: Router,) {
        this.token = localStorage.getItem(environment.accessToken);

    }

    /**
     * @param url
     */
    get(url: string): Observable<any> {

        return this.http.get<any>(environment.apiUrl + url)
            .pipe(map((res: any) => res),
                catchError(err => throwError(err)
                ));

    }


    /**
     *
     * @param url string
     * @param entities string
     * @param id number
     */
    put(url: string, entities: string, id: number): Observable<any> {

        return this.http.put(environment.apiUrl + url + id, entities)
            .pipe(
                map((res: any) => res,
                    err => console.log(err)));
    }


    patch(url: string, entities: any): Observable<any> {
        console.log(entities);

        return this.http.patch(environment.apiUrl + url, entities)
            .pipe(map((res: any) => res,
                catchError(err => throwError(err)
                )));
    }

    /**
     *
     * @param url string
     * @param id number
     */
    delete(url: string, id: number): Observable<any> {
        // console.log(url)
        // console.log(id)
        return this.http.delete(`${environment.apiUrl}${url}/${id}`)
            .pipe(map((res: any) => res,
                catchError(err => throwError(err)
                )));
    }

    /**
     * @param url string
     * @param entity object
     */

    post(url, entity, headers?): Observable<any> {
        console.log(environment.apiUrl + url, entity);

        return this.http.post(`${environment.apiUrl}${url}`, entity, headers)
            .pipe(map((res: any) => res,
                catchError((err: any) => {
                        console.log(err);
                        return throwError(err);
                    }
                )));
    }

}
