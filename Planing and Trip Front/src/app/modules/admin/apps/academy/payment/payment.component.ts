import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {Users} from '../../../../../shared/model/users.types';
import {UsersService} from '../../../../../shared/service/users.service';
import {NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels} from '@techiediaries/ngx-qrcode';
import {ReservationsService} from '../../../../../shared/service/reservations.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'payment',
    templateUrl: './payment.component.html',
    encapsulation: ViewEncapsulation.None
})
export class PaymentComponent implements OnInit {
    users$: Observable<Users>;
    elementType = NgxQrcodeElementTypes.URL;
    correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
    value = 'https://i.pinimg.com/564x/2b/23/b4/2b23b4430e651e20ada0e1bb2ab9c174.jpg';
    horizontalStepperForm: FormGroup;
    verticalStepperForm: FormGroup;
    traceId: number;

    /**
     * Constructor
     */
    constructor(private _formBuilder: FormBuilder,
                private _router: Router,
                private _reservationsService: ReservationsService,
                private activatedRoute: ActivatedRoute,
                private _userService: UsersService) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Horizontal stepper form
        this.horizontalStepperForm = this._formBuilder.group({
            step1: this._formBuilder.group({
                id: [''],
                email: ['', [Validators.required, Validators.email]],
                phonenumber: ['', Validators.required],
                role: ['',],
                name: ['', Validators.required],
                address: ['', Validators.required],
            }),
            step2: this._formBuilder.group({
                carteName: ['', Validators.required],
                carteNumber: ['', Validators.required],
                dateExpiration: ['', Validators.required],
                crypto: ['']
            }),
            step3: this._formBuilder.group({
                byEmail: this._formBuilder.group({
                    companyNews: [true],
                    featuredProducts: [false],
                    messages: [true]
                }),
                pushNotifications: ['everything', Validators.required]
            })
        });
        this.users$ = this._userService.user$;

        this.users$.subscribe((user) => {
            this.horizontalStepperForm.patchValue({
                step1: {
                    id: user.id,
                    email: user.email,
                    phonenumber: user.phonenumber,
                    role: user?.role,
                    name: user?.name,
                    address: user?.address,
                }
            });
            this.horizontalStepperForm.get('step1.email').disable();
            this.horizontalStepperForm.get('step1.phonenumber').disable();
            this.horizontalStepperForm.get('step1.name').disable();
            this.horizontalStepperForm.get('step1.address').disable();
        });
        this.activatedRoute.params.subscribe((res) => {
            this.traceId = res?.id;
        });
    }

    addReservation(): void {
        console.log(this.horizontalStepperForm.value)
        const body = {
            user: this.horizontalStepperForm.value.step1.id,
            trace:this.traceId
        };
        this._reservationsService.addReservation(body)
            .subscribe((res) => {
                console.log(res);
                this._router.navigate(['/apps/trace']);
                return res;
            });

    }
}
