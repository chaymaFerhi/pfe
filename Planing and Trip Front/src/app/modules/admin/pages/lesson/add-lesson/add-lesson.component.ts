import {Component, Inject, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LessonsService} from '../../../../../shared/service/lessons.service';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {FuseConfirmationConfig, FuseConfirmationService} from '@fuse/services/confirmation';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FuseConfirmationDialogComponent} from '@fuse/services/confirmation/dialog/dialog.component';
import {merge} from 'lodash-es';
import {DOCUMENT} from '@angular/common';

@Component({
    selector: 'app-add-lesson',
    templateUrl: './add-lesson.component.html',
    styleUrls: ['./add-lesson.component.scss'],
    providers: [
        {
            provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
        }
    ]
})

export class AddLessonComponent implements OnInit {
    idCourse: string;

    constructor(@Inject(DOCUMENT) private _document: Document,
                private fuseConfirmationService: FuseConfirmationService,
                private _lessonService: LessonsService,
                private _router: Router,
                private _active: ActivatedRoute,
                private _matDialog: MatDialog
    ) {
    }

    ngOnInit(): void {
        this._active.params.subscribe((res) => {
            this.idCourse = res.idCourse;
        });
    }

    /**
     * Create product
     */
    createLesson(step1, step2, step3): void {
        const fd = new FormData();
        fd.append('title', step1.lessonForm.value.title);
        fd.append('subtitle', step1.lessonForm.value.subtitle);
        fd.append('description', step1.lessonForm.value.description);
        fd.append('sectionDTOLists', JSON.stringify(step2.form.value.sections));
        fd.append('videoFile', step3.lessonForm.value.videoFile);
        fd.append('coverFile', step3.lessonForm.value.coverFile);
        fd.append('course.id', this.idCourse);
        fd.append('step.id', step1.lessonForm.value.step.toString());
        // Create the product
        this._lessonService.addLesson(fd).subscribe((res) => {
            console.log(res);
            this.open(step1.lessonForm.value.step);
            step1.lessonForm.reset();
            step2.form.reset();
            step3.lessonForm.reset();
            this._scrollCurrentStepElementIntoView();
            // this._router.navigate(['pages/show-lessons']);
        });
    }

    open(step): MatDialogRef<FuseConfirmationDialogComponent> {
        // Merge the user config with the default config
        const userConfig = merge({}, {
            title: 'Confirm action',
            message: 'Please add step' + (step + 1),
            icon: {
                show: true,
                name: 'heroicons_outline:exclamation',
                color: 'warn'
            },
            actions: {
                confirm: {
                    show: true,
                    label: 'Confirm',
                    color: 'warn'
                },
                cancel: {
                    show: true,
                    label: 'Cancel'
                }
            },
            dismissible: false
        });

        // Open the dialog
        return this._matDialog.open(FuseConfirmationDialogComponent, {
            autoFocus: false,
            disableClose: !userConfig.dismissible,
            data: userConfig,
            panelClass: 'fuse-confirmation-dialog-panel'
        });
    }


    private _scrollCurrentStepElementIntoView(): void {
        // Wrap everything into setTimeout so we can make sure that the 'current-step' class points to correct element
        setTimeout(() => {

            // Get the current step element and scroll it into view
            const currentStepElement = this._document.getElementsByClassName('current-step')[0];
            if (currentStepElement) {
                currentStepElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}
