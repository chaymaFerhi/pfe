import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Trace} from '../../../../../shared/model/traces.types';
import {TracesService} from '../../../../../shared/service/traces.service';
import {Observable} from 'rxjs';
import {Station} from '../../../../../shared/model/stations.types';
import {StationsService} from '../../../../../shared/service/stations.service';
import {Voyage} from '../../../../../shared/model/voyages.types';
import {Geometry} from '../../../../../shared/model/geometry.types';

@Component({
    selector: 'app-add-trace',
    templateUrl: './add-trace.component.html',
    styleUrls: ['./add-trace.component.scss']
})
export class AddTraceComponent implements OnInit {
    traceForm: FormGroup;
    traces: Trace[];
    selectedFiles: FileList;
    stations$: Observable<Station[]>;
    idTrace: number;


    constructor(private _formBuilder: FormBuilder,
                private _router: Router,
                private _changeDetectorRef: ChangeDetectorRef,
                private _activatedRoute: ActivatedRoute,
                private _traceService: TracesService,
                private _stationsService: StationsService) {

    }

    ngOnInit(): void {
        // Horizontal stepper form
        this.traceForm = this._formBuilder.group({
            destination: ['', Validators.required],
            depart: ['', [Validators.required]],
            between: ['', [Validators.required]],
            transport: ['', Validators.required],
            departureDate: ['', Validators.required],
            arrivalDate: ['', Validators.required]
        });
        this.stations$ = this._stationsService.stations$;
        this._activatedRoute.params.subscribe((res) => {
            console.log(res)
            if (res?.idTrace) {
                this._traceService.trace$.subscribe((trace) => {
                    console.log(trace);
                    this.idTrace = res?.idTrace;
                    this.traceForm.patchValue({
                        numeroLigne: trace?.numeroLigne,
                        voyage: trace?.voyage,
                        depart: trace?.depart?.name,
                        destination: trace?.destination?.name,
                        between: trace?.between,
                        geometry: trace?.geometry,
                        record_timestamp: trace?.record_timestamp,
                        transport: trace?.transport,
                        departureDate: trace?.departureDate,
                        arrivalDate: trace?.arrivalDate,
                    });
                });
            }
        });

    }

    addTrace(): void {

        this._traceService.addTrace(this.traceForm.value).subscribe((res) => {
            console.log(res);
            this.selectedFiles = undefined;
            this._router.navigate(['pages/show-traces']);
            return res;
        });
    }


    uploadImage(fileList): void {
        // Return if canceled
        if (fileList.length === 0) {
            return;
        }
        const allowedTypes = ['image/jpeg', 'image/png'];
        const file = fileList[0];
        console.log(file.type);
        // Return if the file is not allowed
        if (!allowedTypes.includes(file.type)) {
            return;
        }
        console.log(file.filename !== 0);
        if (file.filename !== 0) {
            this.traceForm.patchValue({
                picture: file
            });
            console.log(this.traceForm.value);
        } else {
            this.traceForm.patchValue({
                picture: ''
            });
        }
    }
    updateTrace(): void {
        this._traceService.editTrace(this.traceForm.value, this.idTrace).subscribe((newStation) => {
            // Mark for check
            this._changeDetectorRef.markForCheck();
            this._router.navigate(['pages/show-traces']);

        });
    }

    cancelTraceForm(): void {
        this.traceForm.reset();
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
