import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve,  RouterStateSnapshot } from '@angular/router';
import { Observable} from 'rxjs';
import {InventoryPagination} from '../../modules/admin/apps/ecommerce/inventory/inventory.types';
import {UsersService} from '../service/users.service';
import {Users} from '../model/users.types';
@Injectable({
    providedIn: 'root'
})
export class UsersResolvers implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _userService: UsersService)
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ pageable: InventoryPagination; content: Users[] }>
    {
        return this._userService.getAllUsers();
    }
}
@Injectable({
    providedIn: 'root'
})
export class ActiveUserResolvers implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _userService: UsersService)
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Users>
    {
        return this._userService.get();
    }
}

