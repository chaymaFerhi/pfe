import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {GeometryService} from '../service/geometry.service';
import {Geometry} from '../model/geometry.types';
import {InventoryPagination} from '../../modules/admin/apps/ecommerce/inventory/inventory.types';
import {Lessons} from '../model/lessons.types';

@Injectable({
    providedIn: 'root'
})
export class GeometrysResolvers implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _geometrysService: GeometryService)
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ pageable: InventoryPagination; content: Geometry[] }> {
        return this._geometrysService.getAllGeometrys();
    }
}
