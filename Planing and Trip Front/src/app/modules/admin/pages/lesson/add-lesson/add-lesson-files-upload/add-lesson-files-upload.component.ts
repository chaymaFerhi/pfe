import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
    selector: 'app-add-lesson-files-upload',
    templateUrl: './add-lesson-files-upload.component.html',
    styleUrls: ['./add-lesson-files-upload.component.scss']
})
export class AddLessonFilesUploadComponent implements OnInit {
    lessonForm = this._formBuilder.group({
        videoFile: ['', Validators.required],
        coverFile: ['', Validators.required],
    });

    constructor(private _formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
    }

    uploadImage(fileList): void {
        // Return if canceled
        if (fileList.length === 0) {
            return;
        }
        const allowedTypes = ['image/jpeg', 'image/png'];
        const file = fileList[0];
        // Return if the file is not allowed
        if (!allowedTypes.includes(file.type)) {
            return;
        }
        if (file.filename !== 0) {
         return   this.lessonForm.patchValue({
                coverFile: file
            });
        } else {
            this.lessonForm.patchValue({
                coverFile: ''
            });
        }
    }

    uploadVideo(fileList): void {
        console.log(fileList.target.files[0]);
        // Return if canceled
        if (fileList.target.length === 0) {
            return;
        }
        const allowedTypes = ['video/mp4'];
        const file = fileList.target.files[0];
        console.log(file);
        // Return if the file is not allowed
        if (!allowedTypes.includes(file.type)) {
            return;
        }
        if (file.filename !== 0) {
            this.lessonForm.patchValue({
                videoFile: file
            });

        } else {
            this.lessonForm.setValue({
                videoFile: ''
            });
        }
    }
}
