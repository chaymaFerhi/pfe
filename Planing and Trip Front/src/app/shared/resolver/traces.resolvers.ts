import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {TracesService} from '../service/traces.service';
import {InventoryPagination} from '../../modules/admin/apps/ecommerce/inventory/inventory.types';
import {Trace} from '../model/traces.types';
import {StationsService} from '../service/stations.service';
import {Station} from '../model/stations.types';
import {catchError} from 'rxjs/operators';
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
@Injectable({
    providedIn: 'root'
})
export class TraceByIdResolver implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(
        private _router: Router,
        private _tracesService: TracesService
    ) {
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Trace> {
        if (route.paramMap.get('idTrace') !== null){
            return this._tracesService.getTraceById(route.paramMap.get('idTrace'))
            .pipe(
                // Error here means the requested task is not available
                catchError((error) => {
                    console.error(error);
                    const parentUrl = state.url.split('/').slice(0, -1).join('/');
                    this._router.navigateByUrl(parentUrl);
                    return throwError(error);
                })
            );
        }
    }
}

