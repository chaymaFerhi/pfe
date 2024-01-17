import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UsersService} from '../../../../shared/service/users.service';
import * as moment from 'moment';
import {Observable} from 'rxjs';
import {Users} from '../../../../shared/model/users.types';
import {ApiService} from '../../../../shared/service/api.service';

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
    user: Users = {
        active: false,
        address: '',
        age: 0,
        avatar: '',
        createdAt: undefined,
        datedenaissance: undefined,
        email: '',
        id: '',
        name: '',
        password: '',
        phonenumber: 0,
        photo: '',
        role: '',
        status: ''
    };
    idUser: string;
    userForm: FormGroup;
    imgUrl: string | ArrayBuffer | null = null;
    fileList: any;

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
            photo: [],
            email: [],
            age: [],
            phonenumber: [],
            address: [],
            datedenaissance: [],
            role: [],
        });
        this.getUser();

        this._activatedRoute.params.subscribe((res) => {
            console.log(res);
            if (res?.id) {
                this.idUser = res?.id;
                this.getUser();

                //this.imgUrl = `${ApiService.apiPicture}img/User/${this.user?.photo}`;
                //this.userForm.patchValue({
                //    name: this.user?.name,
                //    role: this.user?.role,
                //    email: this.user?.email,
                //    phonenumber: this.user?.phonenumber,
                //    address: this.user?.address,
                //    datedenaissance: this.user?.datedenaissance,
                //});
            } else {
                this.getUser();

            }
        });
    }

    getUser(): any {
        this._userService.get().subscribe((user: any) => {
            console.log(user);
            this.user = user.data;
            this.imgUrl = `${ApiService.apiPicture}img/User/${this.user?.photo}`;
            this.userForm.patchValue({
                name: this.user?.name,
                role: this.user?.role,
                email: this.user?.email,
                phonenumber: this.user?.phonenumber,
                address: this.user?.address,
                datedenaissance: this.user?.datedenaissance,
            });
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

    update(): void {
        console.log(this.userForm.value.address);
        const fd = new FormData();
        fd.append('name', this.userForm.value.name);
        fd.append('email', this.userForm.value.email);
        fd.append('phonenumber', this.userForm.value.phonenumber);
        fd.append('address', this.userForm.value.address);
        fd.append('datedenaissance', this.userForm.value.datedenaissance);
        fd.append('role', this.userForm.value.role);
        fd.append('photo', this.userForm.value.photo);
        this._userService.editUser(fd).subscribe((res) => {
            console.log(res);
            this.getUser();
            this._router.navigateByUrl('/pages/profile');
        });
    }

    getRelativeFormat(date: string): string {
        const birthDate = moment(date, moment.ISO_8601);
        const currentDate = moment();

        const years = currentDate.diff(birthDate, 'years');
        return `${years} years`;

    }

    uploadImage(event): void {
        this.fileList = event.target.files;
        console.log(this.fileList);
        // Return if canceled
        if (this.fileList.length === 0) {
            return;
        }
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        const file = this.fileList[0];
        console.log(file.type);
        // Return if the file is not allowed
        if (!allowedTypes.includes(file.type)) {
            return;
        }
        console.log(file.filename !== 0);
        if (file.filename !== 0) {
            this.userForm.patchValue({
                photo: file
            });
            console.log(this.userForm.value);
        } else {
            this.userForm.patchValue({
                photo: ''
            });
        }
    }

}
