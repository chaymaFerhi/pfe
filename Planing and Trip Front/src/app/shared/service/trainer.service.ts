import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {Trainers} from '../model/trainers.types';
import {map, switchMap, take, tap} from 'rxjs/operators';
import {InventoryPagination} from '../../modules/admin/apps/ecommerce/inventory/inventory.types';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TrainerService {
    private _pagination: BehaviorSubject<InventoryPagination | null> = new BehaviorSubject(null);
    private _trainers: BehaviorSubject<Trainers[] | null> = new BehaviorSubject(null);
    private _trainer: BehaviorSubject<Trainers | null> = new BehaviorSubject(null);

    constructor(private _apiService: ApiService,
                private _httpClient: HttpClient) {
    }

    /**
     * Getter for products
     */
    get trainers$(): Observable<Trainers[]> {
        return this._trainers.asObservable();
    }

    /**
     * Getter for pagination
     */
    get pagination$(): Observable<InventoryPagination> {
        return this._pagination.asObservable();
    }

    addTrainer(body): Observable<any> {
        console.log(body);
        return this._apiService.post(`${ApiService.apiTrainer}/add`, body)
            .pipe(map(res => res));

    }

    editTrainer(body, id): Observable<Trainers> {
        return this._apiService.patch(`${ApiService.apiTrainer}/${id}`, body).pipe(map(res => res));
    }

    /**
     * Get trainer by id
     */
    getTrainerById(id: string): Observable<Trainers> {
        return this._trainers.pipe(
            take(1),
            map((trainers) => {

                // Find the product
                const trainer = trainers.find(item => item.id === id) || null;

                // Update the product
                this._trainer.next(trainer);

                // Return the product
                return trainer;
            }),
            switchMap((trainer) => {

                if (!trainer) {
                    return throwError('Could not found product with id of ' + id + '!');
                }

                return of(trainer);
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
    getAllTrainers(page: number = 0, size: number = 10, sort: string = 'post', order: 'asc' | 'desc' | '' = 'asc', search: string = ''):
        Observable<{ pageable: InventoryPagination; content: Trainers[] }> {
        return this._httpClient.get<{ pageable: InventoryPagination; content: Trainers[] }>
        (`${ApiService.apiVersion}${ApiService.apiTrainer}/get-all-trainers`, {
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
                this._trainers.next(response.content);
            })
        );
    }

    /**
     * Delete the trainer
     *
     * @param trainer
     */
    deleteTrainer(trainer: Trainers): Observable<boolean> {
        return this.trainers$.pipe(
            take(1),
            switchMap(trainers =>
                this._httpClient.delete(`${ApiService.apiVersion}${ApiService.apiTrainer}/delete-trainer/${trainer.id}`).pipe(
                    map(() => {
                        // Find the index of the deleted product
                        const index = trainers.findIndex(item => item.id === trainer.id);
                        // Delete the product
                        trainers.splice(index, 1);
                        // Update the trainers
                        this._trainers.next(trainers);
                        // Return the deleted status
                        return true;
                    })
                ))
        );
    }
}
