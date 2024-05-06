import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {InventoryPagination} from '../../modules/admin/apps/ecommerce/inventory/inventory.types';
import {Trace} from '../model/traces.types';
import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';
import {map, switchMap, take, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TracesService {
    private _pagination: BehaviorSubject<InventoryPagination | null> = new BehaviorSubject(null);
    _traces: BehaviorSubject<Trace[] | null> = new BehaviorSubject(null);
    private _trace: BehaviorSubject<Trace | null> = new BehaviorSubject(null);

    constructor(private _apiService: ApiService,
                private _httpClient: HttpClient) {
    }

    /**
     * Getter for traces
     */
    get traces$(): Observable<Trace[]> {
        return this._traces.asObservable();
    }

    /**
     * Getter for item
     */
    get trace$(): Observable<Trace> {
        return this._trace.asObservable();
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
    addTrace(trace): Observable<Trace> {
        return this.traces$.pipe(
            take(1),
            switchMap(traces => this._httpClient.post<Trace>(`${ApiService.apiVersion}${ApiService.apiTraces}/add-trace`, trace).pipe(
                map((newTrace) => {

                    // Update the traces with the new product
                    this._traces.next([newTrace]);

                    // Return the new product
                    return newTrace;
                })
            ))
        );
    }

    editTrace(body, id): Observable<Trace> {
        return this._apiService.patch(`${ApiService.apiTraces}/${id}`, body).pipe(map(res => res));
    }

    /**
     * Get trace by id
     */
    getTraceById(id: string): Observable<Trace> {
        return this._httpClient.get<Trace>(`${ApiService.apiVersion}${ApiService.apiTraces}/${id}`).pipe(
            map((trace: any) => {
                this._trace.next(trace?.data);
                return trace.data;
            }),
            switchMap((trace) => {

                if (!trace) {
                    return throwError('Could not found trace with id of ' + id + '!');
                }

                return of(trace);
            })
        );
    }


    /**
     * Get traces
     *
     *
     * @param page
     * @param size
     * @param sort
     * @param order
     * @param search
     */
    getAllTraces():
        Observable<Trace[]> {
        return this._httpClient.get<Trace[]>
        (`${ApiService.apiVersion}${ApiService.apiTraces}/get-all-traces`
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
            tap((response: any) => {
                //this._pagination.next(response.pageable);
                this._traces.next(response.content);
            })
        );
    }

    /**
     * search traces
     *
     * @param trace
     */
    searchTraces(trace):
        Observable<Trace[]> {
        console.log(trace);
        return this._httpClient.post<Trace[]>
        (`${ApiService.apiVersion}${ApiService.apiTraces}/search-traces`, trace).pipe(
            tap((response: any) => {
                console.log(response);
                this._traces.next(response.content);
            })
        );
    }

    /**
     * Delete the trace
     *
     * @param trace
     */
    deleteTrace(trace: Trace): Observable<boolean> {
        return this.traces$.pipe(
            take(1),
            switchMap(traces =>
                this._httpClient.delete(`${ApiService.apiVersion}${ApiService.apiTraces}/${trace.id}`).pipe(
                    map(() => {
                        // Find the index of the deleted product
                        const index = traces.findIndex(item => item.id === trace.id);
                        // Delete the product
                        traces.splice(index, 1);
                        // Update the traces
                        this._traces.next(traces);
                        // Return the deleted status
                        return true;
                    })
                ))
        );
    }


}
