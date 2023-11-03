import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-add-quiz-step',
    templateUrl: './add-quiz-step.component.html',
    styleUrls: ['./add-quiz-step.component.scss']
})
export class AddQuizStepComponent implements OnInit {
    index = 1;
    form = this.fb.group({
        quizs: this.fb.array([this.newQuiz()])
    });

    constructor(
        private fb: FormBuilder
    ) {
    }

    ngOnInit(): void {
    }

    get quizs(): FormArray {
        return this.form.controls.quizs as FormArray;
    }

    deleteQuiz(index): void {
        this.quizs.removeAt(index);
        this.index--;
    }


    addQuiz(event): void {
        const quizForm = this.fb.group({
            questions: ['What are ... names? Dan and Sandra', Validators.required],
            answer1: ['there', Validators.required],
            answer2: ['their', Validators.required],
            answer3: ['they', Validators.required],
            correctRequest1: [true],
            correctRequest2: [false],
            correctRequest3: [false]
        });
        this.quizs.push(quizForm);
        this.index++;
    }

    newQuiz(): FormGroup {
        return this.fb.group({
            questions: ['What are ... names? Dan and Sandra', Validators.required],
            answer1: ['there', Validators.required],
            answer2: ['their', Validators.required],
            answer3: ['they', Validators.required],
            correctRequest1: [true],
            correctRequest2: [false],
            correctRequest3: [false]
        });
    }

    showOptions(event,index): void {
        console.log(event,index); //true or false
        // this.quizs.controls[index].get('correctRequest').patchValue(event.name);
    }

}
