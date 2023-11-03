import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {SkillsService} from '../service/skills.service';
import {Skills} from '../model/skills.types';

@Injectable({
    providedIn: 'root'
})
export class SkillsResolvers implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _skillsService: SkillsService)
    {
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Skills[]>
    {
        return this._skillsService.getSkills();

    }
}
