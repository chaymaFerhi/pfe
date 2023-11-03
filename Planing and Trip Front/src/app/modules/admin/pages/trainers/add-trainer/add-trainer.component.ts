import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatChipInputEvent} from '@angular/material/chips';
import {Router} from '@angular/router';
import {Skills} from '../../../../../shared/model/skills.types';
import {TrainerService} from '../../../../../shared/service/trainer.service';

@Component({
    selector: 'app-add-trainer',
    templateUrl: './add-trainer.component.html',
    styleUrls: ['./add-trainer.component.scss']
})
export class AddTrainerComponent implements OnInit {
    trainerForm: FormGroup;
    skills: Skills[] = [{title: 'Grammar'}, {title: 'Writing'}, {title: 'Reading'}];
    selectedFiles: FileList;


    constructor(private _formBuilder: FormBuilder,
                private _router: Router,
                private _trainerService: TrainerService) {

    }

    ngOnInit(): void {
        // Horizontal stepper form
        this.trainerForm = this._formBuilder.group({
            username: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            skills: [this.skills, Validators.required],
            post: ['', Validators.required],
            about: ['', Validators.required],
            picture: ['', Validators.required]
        });

    }

    addTrainer(): void {
        const fd = new FormData();
        fd.append('users.username', this.trainerForm.value.username);
        fd.append('users.email', this.trainerForm.value.email);
        fd.append('picture', this.trainerForm.value.picture);
        fd.append('users.password', this.trainerForm.value.password);
        fd.append('skillsList', JSON.stringify(this.skills));
        fd.append('post', this.trainerForm.value.post);
        fd.append('about', this.trainerForm.value.about);
        this._trainerService.addTrainer(fd)
            .subscribe((res) => {
                console.log(res);
                this.selectedFiles = undefined;
                this._router.navigate(['pages/show-trainers']);
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
            this.trainerForm.patchValue({
                picture: file
            });
            console.log(this.trainerForm.value);
        } else {
            this.trainerForm.patchValue({
                picture: ''
            });
        }
    }

    addSkills(event: MatChipInputEvent):
        void {
        const value = (event.value || '').trim();
        if (value) {
            this.skills.push({title: value});
            this.trainerForm.patchValue({
                skills: [...this.skills]
            });
        }
        // Clear the input value
        event.chipInput?.clear();
    }

    removeSkills(skil: any): any[] {
        const index = this.skills.indexOf(skil);
        if (index >= 0) {
            this.trainerForm.controls.skills.value.splice(index, 1);
        }
        this.skills = this.trainerForm.controls.skills.value;
        return this.skills;
    }


    cancelTrainerForm(): void {
        this.trainerForm.reset();
    }
}
