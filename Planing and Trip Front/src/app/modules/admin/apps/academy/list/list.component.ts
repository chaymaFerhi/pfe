import {
    ChangeDetectionStrategy,
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
import {takeUntil} from 'rxjs/operators';
import {combineLatest} from 'rxjs';
import {Category} from '../../../../../shared/model/category.types';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Overlay} from '@angular/cdk/overlay';
import {TracesService} from '../../../../../shared/service/traces.service';
import * as moment from 'moment/moment';
import {Trace} from '../../../../../shared/model/traces.types';


@Component({
    selector: 'academy-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],

    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AcademyListComponent implements OnInit, OnDestroy {
    traces$: Observable<Trace[]>;

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
       this.traces$ = this._tracesService.traces$;

        // Get the categories
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

        // Filter the stations
        combineLatest([this.filters.categorySlug$, this.filters.query$, this.filters.hideCompleted$])
            .subscribe(([categorySlug, query, hideCompleted]) => {

                // Reset the filtered courses
                // this.filteredCourses = this.courses;

                // Filter by category
                if (categorySlug !== 'all') {
                    this.filteredStations = this.filteredStations.filter(trace => trace.name === categorySlug);
                }

                // Filter by search query
                if (query !== '') {
                    this.filteredStations = this.filteredStations.filter(trace =>
                        trace.name.toLowerCase().includes(query.toLowerCase()));
                }

                // Filter by completed
                //if (hideCompleted) {
                //    this.filteredStations = this.filteredStations.filter(course => course.progress.completed === 0);
                //}
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

    search(): void {
        console.log(this.searchForm.value);
        this._tracesService.searchTraces(this.searchForm.value).subscribe((res) => {
            this.traces$.subscribe((ress) => {
                console.log(ress);
            });
        });
    }

    /**
     * Returns whether the given dates are different days
     *
     * @param current
     * @param compare
     */
    isSameDay(current: string, compare: string): boolean {
        return moment(current, moment.ISO_8601).isSame(moment(compare, moment.ISO_8601), 'day');
    }

    /**
     * Get the relative format of the given date
     *
     * @param date
     */
    getRelativeFormat(date: string): string {
        const today = moment().startOf('day');
        const yesterday = moment().subtract(1, 'day').startOf('day');

        // Is today?
        if (moment(date, moment.ISO_8601).isSame(today, 'day')) {
            return 'Today';
        }

        // Is yesterday?
        if (moment(date, moment.ISO_8601).isSame(yesterday, 'day')) {
            return 'Yesterday';
        }

        return moment(date, moment.ISO_8601).fromNow();
    }
}
