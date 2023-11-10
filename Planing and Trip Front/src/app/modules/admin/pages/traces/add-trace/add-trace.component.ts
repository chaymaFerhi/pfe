import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatChipInputEvent} from '@angular/material/chips';
import {Router} from '@angular/router';
import {Trace} from '../../../../../shared/model/traces.types';
import {TracesService} from '../../../../../shared/service/traces.service';

@Component({
    selector: 'app-add-trace',
    templateUrl: './add-trace.component.html',
    styleUrls: ['./add-trace.component.scss']
})
export class AddTraceComponent implements OnInit {
    traceForm: FormGroup;
    traces: Trace[] ;
    selectedFiles: FileList;


    constructor(private _formBuilder: FormBuilder,
                private _router: Router,
                private _traceService: TracesService) {

    }

    ngOnInit(): void {
        // Horizontal stepper form
        this.traceForm = this._formBuilder.group({
            username: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            post: ['', Validators.required],
            about: ['', Validators.required],
            picture: ['', Validators.required]
        });

    }

    addTrace(): void {
        const fd = new FormData();
        fd.append('users.username', this.traceForm.value.username);
        fd.append('users.email', this.traceForm.value.email);
        fd.append('picture', this.traceForm.value.picture);
        fd.append('users.password', this.traceForm.value.password);
        fd.append('post', this.traceForm.value.post);
        fd.append('about', this.traceForm.value.about);
        this._traceService.addTrace(fd)
            .subscribe((res) => {
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

    cancelTraceForm(): void {
        this.traceForm.reset();
    }
}
