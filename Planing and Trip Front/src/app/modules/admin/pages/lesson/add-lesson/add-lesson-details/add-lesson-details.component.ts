import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {Steps} from '../../../../../../shared/model/steps.types';
import {StepService} from '../../../../../../shared/service/step.service';

@Component({
    selector: 'app-add-lesson-details',
    templateUrl: './add-lesson-details.component.html',
    styleUrls: ['./add-lesson-details.component.scss']
})
export class AddLessonDetailsComponent implements OnInit, OnDestroy {
    steps$: Observable<Steps[]>;
    lessonForm = this._formBuilder.group({
        title: [''],
        subtitle: [''],
        description: [''],
        step: [''],
    });
    private _unsubscribeAll: Subject<any> = new Subject<any>();


    constructor(private _formBuilder: FormBuilder,
                private stepService: StepService) {
    }

    ngOnInit(): void {
        this.steps$ = this.stepService.steps$;

    }
    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }


    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

}
