import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {fuseAnimations} from '@fuse/animations';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {merge, Observable, Subject} from 'rxjs';

import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {debounceTime, map, switchMap, takeUntil} from 'rxjs/operators';
import {Trace} from '../../../../../shared/model/traces.types';
import {
    InventoryBrand,
    InventoryCategory,
    InventoryPagination, InventoryVendor
} from '../../../apps/ecommerce/inventory/inventory.types';
import {FuseConfirmationService} from '../../../../../../@fuse/services/confirmation';
import {InventoryService} from '../../../apps/ecommerce/inventory/inventory.service';
import {TracesService} from '../../../../../shared/service/traces.service';

@Component({
    selector: 'app-show-traces',
    templateUrl: './show-traces.component.html',
    styles: [
        /* language=SCSS */
        `
            .inventory-grid {
                grid-template-columns: 148px 112px auto 112px 96px 96px 72px;

                @screen sm {
                    grid-template-columns: 48px auto 112px 72px;
                }

                @screen md {
                    grid-template-columns: 48px 112px auto 112px 72px;
                }

                @screen lg {
                    grid-template-columns: 148px 112px 112px 112px 96px 96px 72px;
                }
            }
        `
    ],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ShowTracesComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;

    traces$: Observable<Trace[]>;

    brands: InventoryBrand[];
    categories: InventoryCategory[];
    flashMessage: 'success' | 'error' | null = null;
    isLoading: boolean = false;
    pagination: InventoryPagination;
    searchInputControl: FormControl = new FormControl();
    selectedTrace: Trace | null = null;
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
        private _traceService: TracesService,
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

        // Get the brands
        this._inventoryService.brands$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((brands: InventoryBrand[]) => {
                // Update the brands
                this.brands = brands;
                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the categories
        this._inventoryService.categories$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((categories: InventoryCategory[]) => {
                // Update the categories
                this.categories = categories;
                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the pagination
        this._traceService.pagination$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((pagination: InventoryPagination) => {
                // Update the pagination
                this.pagination = pagination;
                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
        // Get the products
        this.traces$ = this._traceService.traces$;

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
                    return this._traceService.getAllTraces();
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
        if (this._sort && this._paginator) {
            // Set the initial sort
            this._sort.sort({
                id: 'name',
                start: 'asc',
                disableClear: true
            });

            // Mark for check
            this._changeDetectorRef.markForCheck();

            // If the user changes the sort order...
            this._sort.sortChange
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe(() => {
                    // Reset back to the first page
                    this._paginator.pageIndex = 0;

                    // Close the details
                    this.closeDetails();
                });

            // Get products if sort or page changes
            merge(this._sort.sortChange, this._paginator.page).pipe(
                switchMap(() => {
                    this.closeDetails();
                    this.isLoading = true;
                    return this._traceService.getAllTraces();
                }),
                map(() => {
                    this.isLoading = false;
                })
            ).subscribe();
        }
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
        this.selectedTrace = null;
    }

    /**
     * Delete the selected product using the form data
     */
    deleteSelectedTrace(trace: Trace): void {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete Trace',
            message: 'Are you sure you want to remove this trace? This action cannot be undone!',
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
                this._traceService.deleteTrace(trace).subscribe(() => {

                    // Close the details
                    this.closeDetails();
                });
            }
        });
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
