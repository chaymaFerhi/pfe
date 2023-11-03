import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-add-lesson-sections',
    templateUrl: './add-lesson-sections.component.html',
    styleUrls: ['./add-lesson-sections.component.scss']
})
export class AddLessonSectionsComponent implements OnInit {
    @ViewChild('mainPage') buttons: ElementRef;

    index = 1;
    form = this.fb.group({
        sections: this.fb.array([])
    });

    constructor(private renderer: Renderer2,
                private fb: FormBuilder
    ) {
    }

    ngOnInit(): void {
    }

    get sections(): FormArray {
        return this.form.controls.sections as FormArray;
    }

    deleteSection(index): void {
        this.sections.removeAt(index);
        this.index--;
    }


    addSection(event): void {
        const quizForm = this.fb.group({
            title: [''],
            subTitle: [''],
            description: [''],
        });

        this.sections.push(quizForm);
        this.index++;
    }

}
