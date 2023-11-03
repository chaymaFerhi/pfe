import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {CoursesService} from '../../../../../shared/service/courses.service';
import {Observable, Subject} from 'rxjs';
import {Trainers} from '../../../../../shared/model/trainers.types';
import {TrainerService} from '../../../../../shared/service/trainer.service';
import {Router} from '@angular/router';
import {Courses} from '../../../../../shared/model/courses.types';

@Component({
    selector: 'app-add-course',
    templateUrl: './add-course.component.html',
    styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit, OnDestroy {
    courseForm: FormGroup;
    course: Courses;
    trainers$: Observable<Trainers[]>;
    notCorrectType = false;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(private _formBuilder: FormBuilder,
                private _changeDetectorRef: ChangeDetectorRef,
                private _courseService: CoursesService,
                private _router: Router,
                private _trainerService: TrainerService,
    ) {
    }

    ngOnInit(): void {
        // Horizontal stepper form
        this.courseForm = this._formBuilder.group({
            title: ['', [Validators.required]],
            description: ['', Validators.required],
            videoFile: ['', Validators.required],
            coverFile: ['', Validators.required],
            trainer: ['', Validators.required],
            category: ['', Validators.required],
        });
        this.trainers$ = this._trainerService.trainers$;

    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     * Create product
     */
    createCourse(): void {
        const fd = new FormData();
        fd.append('title', this.courseForm.value.title);
        fd.append('trainer.id', this.courseForm.value.trainer.id);
        fd.append('category', this.courseForm.value.category);
        fd.append('description', this.courseForm.value.description);
        fd.append('videoFile', this.courseForm.value.videoFile);
        fd.append('coverFile', this.courseForm.value.coverFile);
        // Create the product
        this._courseService.addCourse(fd).subscribe((newCourse) => {
            // Mark for check
            this._changeDetectorRef.markForCheck();
            this._router.navigate(['pages/show-courses']);

        });
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
            this.courseForm.patchValue({
                coverFile: file
            });
            console.log(this.courseForm.value);
        } else {
            this.courseForm.patchValue({
                coverFile: ''
            });
        }
    }

    uploadVideo(fileList): void {
        console.log(fileList);
        // Return if canceled
        if (fileList.length === 0) {
            return;
        }
        const allowedTypes = ['video/mp4'];
        const file = fileList[0];
        // Return if the file is not allowed
        if (!allowedTypes.includes(file.type)) {
            this.notCorrectType = true;
            return;
        }
        if (file.filename !== 0) {
            this.notCorrectType = false;
            this.courseForm.patchValue({
                videoFile: file
            });
            console.log(this.courseForm.value);
        } else {
            this.courseForm.patchValue({
                videoFile: ''
            });
        }
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }


}
