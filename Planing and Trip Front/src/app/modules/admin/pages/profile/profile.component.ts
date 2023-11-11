import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UsersService} from '../../../../shared/service/users.service';

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
    user: any;
    idUser: string;
    userForm: FormGroup;

    /**
     * Constructor
     */
    constructor(
        private fb: FormBuilder,
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _userService: UsersService
    ) {
    }

    ngOnInit(): void {
        this.userForm = this.fb.group({
            id: [],
            name: [],
            email: [],

            age: [],
            phonenumber: [],
            adresse: [],
            datedenaissance: [],
            role: [],
        });
        this.getUser();

        this._activatedRoute.params.subscribe((res) => {
            console.log(res);
            if (res?.id) {
                this.idUser = res?.id;
                console.log(this.user);
                this.userForm.patchValue({
                    name: this.user?.name,
                    role: this.user?.role,
                    email: this.user?.email,
                    phonenumber: this.user?.phonenumber,
                    adresse: this.user?.adresse,
                    datedenaissance: this.user?.datedenaissance,
                });
            }
        });
    }

    getUser(): any {
        this.user = JSON.parse(localStorage.getItem(environment.activeUser));
        console.log(this.user);
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

    update(): void {
        this._userService.editUser(this.userForm.value, this.idUser).subscribe((res) => {
            console.log(res);
            this._router.navigateByUrl('/pages/profile');
        });
    }
}
