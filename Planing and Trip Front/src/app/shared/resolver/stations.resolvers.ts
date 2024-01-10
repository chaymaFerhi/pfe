import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { StationsService } from '../service/stations.service';
import { Station } from '../model/stations.types';
import { InventoryPagination } from '../../modules/admin/apps/ecommerce/inventory/inventory.types';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class StationsResolvers implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(private _stationsService: StationsService) {
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ pageable: InventoryPagination; content: Station[] }> {
        return this._stationsService.getAllStations();
    }
}


@Injectable({
    providedIn: 'root'
})
export class FileManagerFolderResolver implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(
        private _router: Router,
        private _stationsService: StationsService
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Station> {
        console.log(route.paramMap.get('idStation'));
        return this._stationsService.getStationById(route.paramMap.get('folderId'))
            .pipe(
                // Error here means the requested task is not available
                catchError((error) => {

                    // Log the error
                    console.error(error);

                    // Get the parent url
                    const parentUrl = state.url.split('/').slice(0, -1).join('/');

                    // Navigate to there
                    this._router.navigateByUrl(parentUrl);

                    // Throw an error
                    return throwError(error);
                })
            );
    }
}

@Injectable({
    providedIn: 'root'
})
export class StationManagerItemResolver implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(
        private _router: Router,
        private _stationsService: StationsService
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Station> {
        return this._stationsService.getStationById(route.paramMap.get('id'))
            .pipe(
                // Error here means the requested task is not available
                catchError((error) => {

                    // Log the error
                    console.error(error);

                    // Get the parent url
                    const parentUrl = state.url.split('/').slice(0, -1).join('/');

                    // Navigate to there
                    this._router.navigateByUrl(parentUrl);

                    // Throw an error
                    return throwError(error);
                })
            );
    }
}
@Injectable({
    providedIn: 'root'
})
export class StationByIdResolver implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(
        private _router: Router,
        private _stationService: StationsService
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Station> {
        console.log(route.paramMap.get('idStation'));
        if (route.paramMap.get('idStation') !== null){
            return this._stationService.getStationById(route.paramMap.get('idStation'))
                .pipe(
                    // Error here means the requested task is not available
                    catchError((error) => {

                        // Log the error
                        console.error(error);

                        // Get the parent url
                        const parentUrl = state.url.split('/').slice(0, -1).join('/');

                        // Navigate to there
                        this._router.navigateByUrl(parentUrl);

                        // Throw an error
                        return throwError(error);
                    })
                );
        }
    }
}
