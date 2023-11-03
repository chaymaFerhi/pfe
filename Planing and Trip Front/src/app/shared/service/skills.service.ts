import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Skills} from '../model/skills.types';
import {map, switchMap, take, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {ApiService} from './api.service';

@Injectable({
    providedIn: 'root'
})
export class SkillsService {
    private _skills: BehaviorSubject<Skills[] | null> = new BehaviorSubject(null);

    constructor(
        private _httpClient: HttpClient
    ) {
    }


    /**
     * Getter for tags
     */
    get skills$(): Observable<Skills[]> {
        return this._skills.asObservable();
    }

    /**
     * Get skills
     */
    getSkills(): Observable<Skills[]> {
        return this._httpClient.get<Skills[]>(`${ApiService.apiVersion}${ApiService.apiSKills}/get-all-skills`).pipe(
            tap((skills) => {
                this._skills.next(skills);
            })
        );
    }

    /**
     * Create skills
     *
     * @param skills
     */
    createSkills(skills: Skills): Observable<Skills> {
        return this.skills$.pipe(
            take(1),
            switchMap(skill =>
                this._httpClient.post<Skills>(`${ApiService.apiVersion}${ApiService.apiSKills}/add-skills`, {skills}).pipe(
                    map((newSkills) => {

                        // Update the tags with the new tag
                        this._skills.next([...skill, newSkills]);

                        // Return new tag from observable
                        return newSkills;
                    })
                ))
        );
    }

}
