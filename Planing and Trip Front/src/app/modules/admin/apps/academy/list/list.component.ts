import {
    ChangeDetectorRef,
    Component, ElementRef,
    OnDestroy,
    OnInit, Renderer2, ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSelectChange} from '@angular/material/select';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {AcademyService} from 'app/modules/admin/apps/academy/academy.service';
import {StationsService} from '../../../../../shared/service/stations.service';
import {Station} from '../../../../../shared/model/stations.types';
import {combineLatest} from 'rxjs';
import {debounceTime, switchMap, takeUntil} from 'rxjs/operators';
import {Category} from '../../../../../shared/model/category.types';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Overlay} from '@angular/cdk/overlay';
import {TracesService} from '../../../../../shared/service/traces.service';
import * as moment from 'moment/moment';
import {Trace} from '../../../../../shared/model/traces.types';
import {FuseConfirmationService} from '../../../../../../@fuse/services/confirmation';
import {AuthService} from '../../../../../core/auth/auth.service';


@Component({
    selector: 'academy-list',
    templateUrl: './list.component.html',
    encapsulation: ViewEncapsulation.None,
    //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AcademyListComponent implements OnInit, OnDestroy {
    traces$: Observable<Trace[]> = new Observable<Trace[]>();

    searchForm: FormGroup;
    categories: Category[];
    stations: Station[];
    filteredStations: Station[];
    filters: {
        categorySlug$: BehaviorSubject<string>;
        query$: BehaviorSubject<string>;
        hideCompleted$: BehaviorSubject<boolean>;
    } = {
        categorySlug$: new BehaviorSubject('all'),
        query$: new BehaviorSubject(''),
        hideCompleted$: new BehaviorSubject(false)
    };

    dateFormat: string;
    timeFormat: string;
    private _unsubscribeAll: Subject<any> = new Subject<any>();


    /**
     * Constructor
     */
    constructor(
        public _tracesService: TracesService,
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _academyService: AcademyService,
        private _fuseConfirmationService: FuseConfirmationService,
        private _authService: AuthService,
        private _stationsService: StationsService,
        private _elementRef: ElementRef,
        private fb: FormBuilder,
        private _overlay: Overlay,
        private _renderer2: Renderer2,
        private _viewContainerRef: ViewContainerRef
    ) {
        this.dateFormat = 'DD/MM/YYYY';
        this.timeFormat = '12';

    }

    /**
     * On init
     */
    ngOnInit(): void {
        this._academyService.categories$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((categories: Category[]) => {
                this.categories = categories;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
        this.searchForm = this.fb.group({
            range: [],
            depart: [],
            destination: [],
        });
        //Get the courses
        this._stationsService.stations$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((stations: Station[]) => {
                this.stations = this.filteredStations = stations;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
        this.searchForm.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(300),
                switchMap((query) => {
                    console.log('loading');
                    return this._tracesService.getAllTraces();
                }),
            )
            .subscribe();

        // Filter the stations
        combineLatest([this.filters.categorySlug$, this.filters.query$, this.filters.hideCompleted$])
            .subscribe(([categorySlug, query, hideCompleted]) => {
                if (categorySlug !== 'all') {
                    this.filteredStations = this.filteredStations.filter(trace => trace.name === categorySlug);
                }
                if (query !== '') {
                    this.filteredStations = this.filteredStations.filter(trace =>
                        trace.name.toLowerCase().includes(query.toLowerCase()));
                }
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     * Filter by search query
     *
     * @param query
     */
    filterByQuery(query: string): void {
        this.filters.query$.next(query);
    }

    /**
     * Filter by category
     *
     * @param change
     */
    filterByCategory(change: MatSelectChange): void {
        this.filters.categorySlug$.next(change.value);
    }


    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    search(): any {
        console.log(this.searchForm.value);
        this._tracesService.searchTraces(this.searchForm.value).subscribe(() => this.traces$ = this._tracesService.traces$);
    }

    /**
     * Returns whether the given dates are different days
     *
     * @param current
     * @param compare
     */
    isSameDay(current: string, compare: string): boolean {
        return moment(current, moment.ISO_8601).isSame(moment(compare, moment.ISO_8601), 'hour');
    }

    goToPayment(trace): any {
        console.log(this._authService.accessToken);
        if (this._authService.accessToken) {
            this._router.navigateByUrl('/apps/trace/payment/' + trace?._id);
        } else {
            this.showAlert();
        }


    }


// Example usage

    private showAlert(): void {
        const confirmation = this._fuseConfirmationService.open({
            title: 'Not connected',
            message: 'Do you have an account? Can you sign in please!',
            actions: {
                confirm: {
                    label: 'Sign In'
                }
            }
        });

        confirmation.afterClosed().subscribe((result) => {
            if (result === 'confirmed') {
                this._router.navigateByUrl('sign-in');
            }
        });
    }

}
