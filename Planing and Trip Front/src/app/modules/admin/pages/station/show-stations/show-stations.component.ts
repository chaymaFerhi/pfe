import {
    AfterViewInit,
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {fuseAnimations} from '@fuse/animations';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Observable, Subject} from 'rxjs';
import {Station} from '../../../../../shared/model/stations.types';
import {
    InventoryBrand,
    InventoryCategory,
    InventoryPagination, InventoryVendor
} from '../../../apps/ecommerce/inventory/inventory.types';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FuseConfirmationService} from '@fuse/services/confirmation';
import {InventoryService} from '../../../apps/ecommerce/inventory/inventory.service';
import {StationsService} from '../../../../../shared/service/stations.service';
import {debounceTime, map, switchMap, takeUntil} from 'rxjs/operators';
import {ApiService} from '../../../../../shared/service/api.service';

@Component({
    selector: 'app-show-stations',
    templateUrl: './show-stations.component.html',
    styles: [
        /* language=SCSS */
        `
            .inventory-grid {
                grid-template-columns: 148px 112px 140px;

                @screen sm {
                    grid-template-columns: 148px 112px 112px ;
                }

                @screen md {
                    grid-template-columns: 148px 112px 112px;
                }

                @screen lg {
                    grid-template-columns: 248px auto 112px ;
                }
            }
        `
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations
})
export class ShowStationsComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;
    selectedStation: Station | null = null;

    stations$: Observable<Station[]>;
    apiImg = ApiService.apiPicture;
    brands: InventoryBrand[];
    categories: InventoryCategory[];
    filteredStations: Station[];
    flashMessage: 'success' | 'error' | null = null;
    isLoading: boolean = false;
    pagination: InventoryPagination;
    searchInputControl: FormControl = new FormControl();
    selectedProductForm: FormGroup;
    tagsEditMode: boolean = false;
    vendors: InventoryVendor[];
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService,
        private _formBuilder: FormBuilder,
        private _inventoryService: InventoryService,
        private _stationService: StationsService
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the selected product form
        this.selectedProductForm = this._formBuilder.group({
            id: [''],
            category: [''],
            name: ['', [Validators.required]],
            description: [''],
            skills: [[]],
            sku: [''],
            barcode: [''],
            brand: [''],
            vendor: [''],
            stock: [''],
            reserved: [''],
            cost: [''],
            basePrice: [''],
            taxPercent: [''],
            price: [''],
            weight: [''],
            thumbnail: [''],
            images: [[]],
            currentImageIndex: [0], // Image index that is currently being viewed
            active: [false]
        });

        // Get the pagination
        this._stationService.pagination$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((pagination: InventoryPagination) => {
                console.log(pagination);
                // Update the pagination
                this.pagination = pagination;
                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
        // Get the products
        this.stations$ = this._stationService.stations$;
        // Get the vendors
        this._inventoryService.vendors$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((vendors: InventoryVendor[]) => {

                // Update the vendors
                this.vendors = vendors;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Subscribe to search input field value changes
        this.searchInputControl.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(300),
                switchMap((query) => {
                    console.log('loading');
                    this.closeDetails();
                    this.isLoading = true;
                    return this._stationService.getAllStations(0, 10, 'name', 'asc', query);
                }),
                map(() => {
                    this.isLoading = false;
                })
            )
            .subscribe();
    }

    /**
     * After view init
     */
    ngAfterViewInit(): void {
        console.log(this._sort);
        console.log(this._paginator);
        //if (this._sort && this._paginator) {
        //    // Set the initial sort
        //    this._sort.sort({
        //        id: 'name',
        //        start: 'asc',
        //        disableClear: true
        //    });
        //
        //    // Mark for check
        //    //this._changeDetectorRef.markForCheck();
        //
        //    // If the user changes the sort order...
        //    this._sort.sortChange
        //        .pipe(takeUntil(this._unsubscribeAll))
        //        .subscribe(() => {
        //            // Reset back to the first page
        //            this._paginator.pageIndex = 0;
        //
        //            // Close the details
        //            this.closeDetails();
        //        });
        //
        //    // Get products if sort or page changes
        //    merge(this._sort.sortChange, this._paginator.page).pipe(
        //        switchMap(() => {
        //            this.closeDetails();
        //            this.isLoading = true;
        //            return this._stationService.getAllStations(this._paginator.pageIndex, this._paginator.pageSize, this._sort.active, this._sort.direction);
        //        }),
        //        map(() => {
        //            this.isLoading = false;
        //        })
        //    ).subscribe();
        //}
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


    /**
     * Close the details
     */
    closeDetails(): void {
        this.selectedStation = null;
    }

    /**
     * Delete the selected product using the form data
     */
    deleteSelectedStation(station: Station): void {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete Station',
            message: 'Are you sure you want to remove this station? This action cannot be undone!',
            actions: {
                confirm: {
                    label: 'Delete'
                }
            }
        });

        // Subscribe to the confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {

            // If the confirm button pressed...
            if (result === 'confirmed') {

                // Get the product object

                // Delete the product on the server
                this._stationService.deleteStation(station).subscribe(() => {

                    // Close the details
                    this.closeDetails();
                });
            }
        });
    }

    /**
     * Show flash message
     */
    showFlashMessage(type: 'success' | 'error'): void {
        // Show the message
        this.flashMessage = type;

        // Mark for check
        this._changeDetectorRef.markForCheck();

        // Hide it after 3 seconds
        setTimeout(() => {

            this.flashMessage = null;

            // Mark for check
            this._changeDetectorRef.markForCheck();
        }, 3000);
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


}
