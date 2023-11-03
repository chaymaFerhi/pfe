import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Subject} from 'rxjs';
import {QuizService} from '../../../../../shared/service/quiz.service';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-show-exams',
    templateUrl: './show-exams.component.html',
    encapsulation: ViewEncapsulation.None

})
export class ShowExamsComponent implements OnInit,OnDestroy {
    quizs: any[];
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     * Constructor
     */
    constructor(private _quizService: QuizService) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Get the FAQs
        this._quizService.quizs$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((quizs) => {
                this.quizs = quizs;
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

}
