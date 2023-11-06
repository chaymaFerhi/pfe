import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {InventoryPagination} from '../../modules/admin/apps/ecommerce/inventory/inventory.types';
import {Station} from '../model/stations.types';
import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';
import {map, switchMap, take, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class StationsService {
    private _pagination: BehaviorSubject<InventoryPagination | null> = new BehaviorSubject(null);
    private _stations: BehaviorSubject<Station[] | null> = new BehaviorSubject(null);
    private _station: BehaviorSubject<Station | null> = new BehaviorSubject(null);

    constructor(private _apiService: ApiService,
                private _httpClient: HttpClient) {
    }

    /**
     * Getter for stations
     */
    get stations$(): Observable<Station[]> {
        return this._stations.asObservable();
    }

    /**
     * Getter for item
     */
    get station$(): Observable<Station> {
        return this._station.asObservable();
    }


    /**
     * Getter for pagination
     */
    get pagination$(): Observable<InventoryPagination> {
        return this._pagination.asObservable();
    }

    /**
     * Create product
     */
    addStation(station): Observable<Station> {
        return this.stations$.pipe(
            take(1),
            switchMap(stations => this._httpClient.post<Station>(`${ApiService.apiVersion}${ApiService.apiStations}/add-station`, station).pipe(
                map((newCourse) => {

                    // Update the stations with the new product
                    this._stations.next([newCourse]);

                    // Return the new product
                    return newCourse;
                })
            ))
        );
    }

    editCourse(body, id): Observable<Station> {
        return this._apiService.patch(`${ApiService.apiVersion}${ApiService.apiStations}/${id}`, body).pipe(map(res => res));
    }

    /**
     * Get station by id
     */
    getCourseById(id: string): Observable<Station> {
        return this._httpClient.get<Station>(`${ApiService.apiVersion}${ApiService.apiStations}/find-station/${id}`).pipe(
            map((station) => {
                // Update the station
                this._station.next(station);

                // Return the station
                return station;
            }),
            switchMap((station) => {

                if (!station) {
                    return throwError('Could not found station with id of ' + id + '!');
                }

                return of(station);
            })
        );
    }



    /**
     * Get stations
     *
     *
     * @param page
     * @param size
     * @param sort
     * @param order
     * @param search
     */
    getAllCourses(page: number = 0, size: number = 5, sort: string = 'title', order: 'asc' | 'desc' | '' = 'asc', search: string = ''):
        Observable<{ pageable: InventoryPagination; content: Station[] }> {
        return this._httpClient.get<{ pageable: InventoryPagination; content: Station[] }>
        (`${ApiService.apiVersion}${ApiService.apiStations}/get-all-stations`, {
            params: {
                page: '' + page,
                size: '' + size,
                sort,
                order,
                search
            }
        }).pipe(
            tap((response) => {
                this._pagination.next(response.pageable);
                this._stations.next(response.content);
            })
        );
    }

    /**
     * Delete the station
     *
     * @param station
     */
    deleteCourse(station: Station): Observable<boolean> {
        return this.stations$.pipe(
            take(1),
            switchMap(stations =>
                this._httpClient.delete(`${ApiService.apiVersion}${ApiService.apiStations}/delete-station/${station.id}`).pipe(
                    map(() => {
                        // Find the index of the deleted product
                        const index = stations.findIndex(item => item.id === station.id);
                        // Delete the product
                        stations.splice(index, 1);
                        // Update the stations
                        this._stations.next(stations);
                        // Return the deleted status
                        return true;
                    })
                ))
        );
    }

    getCourses(): Observable<Station[]> {
        return this._httpClient.get<Station[]>(`${ApiService.apiVersion}${ApiService.apiStations}`).pipe(
            tap((response: any) => {
                this._stations.next(response);
            })
        );
    }

}
