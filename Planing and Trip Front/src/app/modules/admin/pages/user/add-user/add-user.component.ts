import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Skills} from '../../../../../shared/model/skills.types';
import {Router} from '@angular/router';
import {MatChipInputEvent} from '@angular/material/chips';
import {UsersService} from '../../../../../shared/service/users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
    apiURL = environment.apiImg;
    userForm: FormGroup;
    skills: Skills[] = [{title: 'Grammar'}, {title: 'Writing'}, {title: 'Reading'}];
    selectedFiles: FileList;


    constructor(private _formBuilder: FormBuilder,
                private _router: Router,
                private _userService: UsersService) {

    }

    ngOnInit(): void {
        // Horizontal stepper form
        this.userForm = this._formBuilder.group({
            username: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            roleName: ['', Validators.required],
            address: ['', Validators.required],
            phoneNumber: ['', Validators.required],
            birthDate: ['', Validators.required],
            picture: ['', Validators.required]

        });

    }

    addUser(): void {
        const fd = new FormData();
        fd.append('username', this.userForm.value.username);
        fd.append('email', this.userForm.value.email);
        fd.append('picture', this.userForm.value.picture);
        fd.append('password', this.userForm.value.password);
        fd.append('roleName', this.userForm.value.roleName);
        fd.append('address', this.userForm.value.address);
        fd.append('phoneNumber', this.userForm.value.phoneNumber);
        fd.append('birthDate', this.userForm.value.birthDate);
        this._userService.addUser(fd)
            .subscribe((res) => {
                console.log(res);
                this.selectedFiles = undefined;
                this._router.navigate(['pages/show-users']);
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
            this.userForm.patchValue({
                picture: file
            });
            console.log(this.userForm.value);
        } else {
            this.userForm.patchValue({
                picture: ''
            });
        }
    }

    addSkills(event: MatChipInputEvent):
        void {
        const value = (event.value || '').trim();
        if (value) {
            this.skills.push({title: value});
            this.userForm.patchValue({
                skills: [...this.skills]
            });
        }
        // Clear the input value
        event.chipInput?.clear();
    }

    removeSkills(skil: any): any[] {
        const index = this.skills.indexOf(skil);
        if (index >= 0) {
            this.userForm.controls.skills.value.splice(index, 1);
        }
        this.skills = this.userForm.controls.skills.value;
        return this.skills;
    }


    cancelUserForm(): void {
        this.userForm.reset();
    }

}
