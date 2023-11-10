import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, switchMap, take, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {ApiService} from './api.service';
import {InventoryPagination} from '../../modules/admin/apps/ecommerce/inventory/inventory.types';
import {Geometry} from '../model/geometry.types';

@Injectable({
    providedIn: 'root'
})
export class GeometryService {
    private _geometrys: BehaviorSubject<Geometry[] | null> = new BehaviorSubject(null);
    private _pagination: BehaviorSubject<InventoryPagination | null> = new BehaviorSubject(null);

    constructor(
        private _httpClient: HttpClient
    ) {
    }

    /**
     * Getter for pagination
     */
    get pagination$(): Observable<InventoryPagination> {
        return this._pagination.asObservable();
    }
    /**
     * Getter for tags
     */
    get geometrys$(): Observable<Geometry[]> {
        return this._geometrys.asObservable();
    }

    /**
     * Get geometrys
     */
    getGeometrys(): Observable<Geometry[]> {
        return this._httpClient.get<Geometry[]>(`${ApiService.apiVersion}${ApiService.apiGeometrys}/get-all-geometrys`).pipe(
            tap((geometrys) => {
                this._geometrys.next(geometrys);
            })
        );
    }
    /**
     * Get geometrys
     *
     *
     * @param page
     * @param size
     * @param sort
     * @param order
     * @param search
     */
    getAllGeometrys(page: number = 0, size: number = 5, sort: string = 'title',
                   order: 'asc' | 'desc' | '' = 'asc',
                   search: string = ''):
        Observable<{ pageable: InventoryPagination; content: Geometry[] }> {
        return this._httpClient.get<{ pageable: InventoryPagination; content: Geometry[] }>
        (`${ApiService.apiVersion}${ApiService.apiGeometrys}/get-all-geometrys`
            //,
            //{
            //params: {
            //    page: '' + page,
            //    size: '' + size,
            //    sort,
            //    order,
            //    search
            //}
            //}
        ).pipe(
            tap((response) => {
                this._pagination.next(response.pageable);
                this._geometrys.next(response.content);
            })
        );
    }
    /**
     * Create geometrys
     *
     * @param geometrys
     */
    createGeometrys(geometrys: Geometry): Observable<Geometry> {
        return this.geometrys$.pipe(
            take(1),
            switchMap(geometry =>
                this._httpClient.post<Geometry>(`${ApiService.apiVersion}${ApiService.apiGeometrys}/add-geometrys`, {geometrys}).pipe(
                    map((newGeometrys) => {

                        // Update the tags with the new tag
                        this._geometrys.next([...geometry, newGeometrys]);

                        // Return new tag from observable
                        return newGeometrys;
                    })
                ))
        );
    }
    /**
     * Delete the geometry
     *
     * @param geometry
     */
    deleteGeometry(geometry: Geometry): Observable<boolean> {
        return this.geometrys$.pipe(
            take(1),
            switchMap(geometrys =>
                this._httpClient.delete(`${ApiService.apiVersion}${ApiService.apiGeometrys}/delete-geometry/${geometry.id}`).pipe(
                    map(() => {
                        // Find the index of the deleted product
                        const index = geometrys.findIndex(item => item.id === geometry.id);
                        // Delete the product
                        geometrys.splice(index, 1);
                        // Update the geometrys
                        this._geometrys.next(geometrys);
                        // Return the deleted status
                        return true;
                    })
                ))
        );
    }
}
