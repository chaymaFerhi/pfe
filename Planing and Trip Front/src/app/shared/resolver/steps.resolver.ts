import {Injectable} from '@angular/core';
import {Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import {Observable} from 'rxjs';
import {StepService} from '../service/step.service';
import {InventoryPagination} from '../../modules/admin/apps/ecommerce/inventory/inventory.types';
import {Steps} from '../model/steps.types';

@Injectable({
    providedIn: 'root'
})
export class StepsResolver implements Resolve<any> {
    constructor(private _stepService: StepService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ pageable: InventoryPagination; content: Steps[] }> {
        return this._stepService.getAllSteps();

    }
}
