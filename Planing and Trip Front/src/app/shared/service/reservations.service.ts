import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {InventoryPagination} from '../../modules/admin/apps/ecommerce/inventory/inventory.types';
import {Reservation} from '../model/reservations.types';
import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';
import {catchError, map, switchMap, take, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ReservationsService {
    _reservation: BehaviorSubject<Reservation | null> = new BehaviorSubject(null);
    private _pagination: BehaviorSubject<InventoryPagination | null> = new BehaviorSubject(null);
    private _reservations: BehaviorSubject<Reservation[] | null> = new BehaviorSubject(null);

    constructor(private _apiService: ApiService,
                private _httpClient: HttpClient) {
    }

    /**
     * Getter for products
     */
    get reservations$(): Observable<Reservation[]> {
        return this._reservations.asObservable();
    }

    /**
     * Getter for products
     */
    get reservation$(): Observable<Reservation> {
        return this._reservation.asObservable();
    }

    /**
     * Getter for pagination
     */
    get pagination$(): Observable<InventoryPagination> {
        return this._pagination.asObservable();
    }

    addReservation(body): Observable<any> {
        console.log(body);
        return this._apiService.post(`${ApiService.apiReservation}/add-reservation`, body)
            .pipe(map(res => res));

    }

    editReservation(body): Observable<Reservation> {
        return this._apiService.patch(`${ApiService.apiReservation}/updateMe`, body).pipe(map(res => res));
    }

    /**
     * Get reservation by id
     */
    getReservationByUserId(): Observable<Reservation[]> {
        return this._httpClient.get(`${ApiService.apiVersion}${ApiService.apiReservation}/get-my-reservations`).pipe(
            map((response: any) => {
                console.log(response.content);
                this._reservations.next(response.content);
                return response.content;
            })
        );
    }

    /**
     * Get products
     *
     *
     * @param page
     * @param size
     * @param sort
     * @param order
     * @param search
     */
    getAllReservations(page: number = 0, size: number = 10, sort: string = 'id', order: 'asc' | 'desc' | '' = 'asc', search: string = ''):
        Observable<{ pageable: InventoryPagination; content: Reservation[] }> {
        return this._httpClient.get<{ pageable: InventoryPagination; content: Reservation[] }>
        (`${ApiService.apiVersion}${ApiService.apiReservation}`
            //, {
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
                this._reservations.next(response.content);
            })
        );
    }

    /**
     * Delete the reservation
     *
     * @param reservation
     */
    deleteReservation(reservation: Reservation): Observable<boolean> {
        return this.reservations$.pipe(
            take(1),
            switchMap(reservations =>
                this._httpClient.delete(`${ApiService.apiVersion}${ApiService.apiReservation}/delete-reservation/${reservation.id}`).pipe(
                    map(() => {
                        // Find the index of the deleted product
                        const index = reservations.findIndex(item => item.id === reservation.id);
                        // Delete the product
                        reservations.splice(index, 1);
                        // Update the reservations
                        this._reservations.next(reservations);
                        // Return the deleted status
                        return true;
                    })
                ))
        );
    }

}
