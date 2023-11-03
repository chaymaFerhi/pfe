import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {QuizService} from '../../../../../shared/service/quiz.service';
import {LessonsService} from '../../../../../shared/service/lessons.service';
import {Lessons} from '../../../../../shared/model/lessons.types';

@Component({
    selector: 'app-add-quiz',
    templateUrl: './add-quiz.component.html',
    styleUrls: ['./add-quiz.component.scss']
})
export class AddQuizComponent implements OnInit {
    done = false;
    idLesson: number;
    lesson$: Observable<Lessons>;

    /**
     * Constructor
     */
    constructor(private _formBuilder: FormBuilder,
                private _active: ActivatedRoute,
                private _router: Router,
                private _lessonsService: LessonsService,
                private quizService: QuizService) {

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this._active.params.subscribe((res) => {
            this.idLesson = res.idLesson;
            this.lesson$ = this._lessonsService.lesson$;

        });

    }

    submit(step): void {
        const quizsListItems = [];
        for (const item of step.quizs) {
            quizsListItems.push(
                {
                    questions: [
                        {
                            question: item.questions,
                            answers: [
                                {
                                    answer: item.answer1,
                                    correctRequest: true
                                },
                                {
                                    answer: item.answer2,
                                    correctRequest: false
                                },
                                {
                                    answer: item.answer3,
                                    correctRequest: false
                                }
                            ]
                        }
                    ]
                });
        }
        console.log(quizsListItems);
        const body = {
            quizsList: quizsListItems,
            lesson: {
                id: this.idLesson
            }
        };
        console.log(typeof body.quizsList);
        this.quizService.addQuiz(body).subscribe((res: any) => {
            console.log(res);
            this._router.navigateByUrl('/pages/show-lessons');
        });
    }

}

