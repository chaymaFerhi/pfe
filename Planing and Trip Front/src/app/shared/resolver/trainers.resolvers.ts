import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve,  RouterStateSnapshot } from '@angular/router';
import { Observable} from 'rxjs';
import {TrainerService} from '../service/trainer.service';
import {InventoryPagination} from '../../modules/admin/apps/ecommerce/inventory/inventory.types';
import {Trainers} from '../model/trainers.types';
@Injectable({
    providedIn: 'root'
})
export class TrainersResolvers implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _trainerService: TrainerService)
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ pageable: InventoryPagination; content: Trainers[] }>
    {
        return this._trainerService.getAllTrainers();
    }
}

