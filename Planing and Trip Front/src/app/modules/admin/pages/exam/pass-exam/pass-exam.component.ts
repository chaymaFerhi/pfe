import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {merge} from 'lodash-es';
import {QuizService} from '../../../../../shared/service/quiz.service';
import {QuizsByLesson} from '../../../../../shared/model/quizs.types';
import {FuseConfirmationDialogComponent} from '../../../../../../@fuse/services/confirmation/dialog/dialog.component';

@Component({
    selector: 'app-pass-exam',
    templateUrl: './pass-exam.component.html',
    styleUrls: ['./pass-exam.component.scss']
})
export class PassExamComponent implements OnInit, OnDestroy {
    quizs$: Observable<QuizsByLesson[]>;
    correctScore = 0;
    showResult = false;
    previousURL: any;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(private _quizService: QuizService,
                private router: Router,
                private _matDialog: MatDialog
    ) {
    }

    ngOnInit(): void {
        console.log(this.router.events);
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe((event: NavigationEnd) => {
                console.log(event);
                this.previousURL = event.url;
            }
        );
        // filter((event: any) => {
        //     console.log(event);
        //     console.log(event instanceof NavigationEnd);
        // }));
        console.log(this.previousURL);
        this.quizs$ = this._quizService.quizsByLesson$;
        this.quizs$.subscribe((res) => {

        });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    getCorrectAnswer(event, data): void {
        if (data.correctRequest) {
            this.correctScore++;
        }
    }

    submitted(quizs): void {
        this.showResult = true;
        this.openDialog(this.correctScore, quizs);
        this.router.navigateByUrl('/apps/academy');
    }

    openDialog(step, quizs): MatDialogRef<FuseConfirmationDialogComponent> {
        // Merge the user config with the default config
        const userConfig = merge({}, {
            title: 'Quiz',
            message: 'You got ' + this.correctScore + ' / ' + quizs.quiz.length,
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


}
