import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve,  RouterStateSnapshot } from '@angular/router';
import { Observable} from 'rxjs';
import {TracesService} from '../service/traces.service';
import {InventoryPagination} from '../../modules/admin/apps/ecommerce/inventory/inventory.types';
import {Trace} from '../model/traces.types';
@Injectable({
    providedIn: 'root'
})
export class TracesResolvers implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _traceService: TracesService)
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Trace[]>
    {
        return this._traceService.getAllTraces();
    }
}

