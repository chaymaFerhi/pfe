import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StationsService} from '../../../../../shared/service/stations.service';
import {Observable, Subject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {Station} from '../../../../../shared/model/stations.types';

@Component({
    selector: 'app-add-station',
    templateUrl: './add-station.component.html',
    styleUrls: ['./add-station.component.scss']
})
export class AddStationComponent implements OnInit, OnDestroy {
    idStation: number;
    stationForm: FormGroup;
    station: Station;
    station$: Observable<Station>;
    notCorrectType = false;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(private _formBuilder: FormBuilder,
                private _changeDetectorRef: ChangeDetectorRef,
                private _stationService: StationsService,
                private _router: Router,
                private _activatedRoute: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        // Horizontal stepper form
        this.stationForm = this._formBuilder.group({
            name: ['', [Validators.required]],
            line: ['', Validators.required],
            longitude: ['', Validators.required],
            latitude: ['', Validators.required],
        });
        this.station$ = this._stationService.station$;
        this._activatedRoute.params.subscribe((res) => {
            console.log(res);
            if (res?.idStation) {

                this._stationService.station$.subscribe((station) => {
                    this.idStation = res?.idStation;
                    console.log(this.idStation);
                    this.stationForm.patchValue({
                        name: station?.name,
                        line: station?.line,
                        longitude: station?.longitude,
                        latitude: station?.latitude
                    });
                });
            }
        });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     * Create product
     */
    createStation(): void {
        this._stationService.addStation(this.stationForm.value).subscribe((newStation) => {
            // Mark for check
            this._changeDetectorRef.markForCheck();
            this._router.navigate(['pages/show-stations']);

        });
    }

    updateStation(): void {
        this._stationService.editStation(this.stationForm.value, this.idStation).subscribe((newStation) => {
            // Mark for check
            this._changeDetectorRef.markForCheck();
            this._router.navigate(['pages/show-stations']);

        });
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    getLatLong(): any {
        const baseUrl = 'https://nominatim.openstreetmap.org/search';
        const params = new URLSearchParams({
            q: this.stationForm.value.name,
            format: 'json'
        });

        const url = `${baseUrl}?${params.toString()}`;

        return fetch(url)
            .then((response) => {
                console.log(response);
                return response.json();
            })
            .then((data) => {
                if (data && data.length > 0) {
                    const lat = parseFloat(data[0].lat);
                    const lon = parseFloat(data[0].lon);
                    this.stationForm.patchValue({
                        longitude: lon,
                        latitude: lat,
                    });
                    return {lat, lon};
                } else {
                    return null;
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                return null;
            });
    }

}
