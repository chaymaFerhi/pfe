import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {GeometryService} from '../../../../../shared/service/geometry.service';
import {Lessons} from '../../../../../shared/model/lessons.types';

@Component({
    selector: 'app-add-geometry',
    templateUrl: './add-geometry.component.html',
    styleUrls: ['./add-geometry.component.scss']
})
export class AddGeometryComponent implements OnInit {
    done = false;
    idLesson: number;
    lesson$: Observable<Lessons>;

    /**
     * Constructor
     */
    constructor(private _formBuilder: FormBuilder,
                private _active: ActivatedRoute,
                private _router: Router,
                private geometryService: GeometryService) {

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
        });

    }

    submit(step): void {

        this.geometryService.createGeometrys(step).subscribe((res: any) => {
            console.log(res);
            this._router.navigateByUrl('/pages/show-lessons');
        });
    }

}

