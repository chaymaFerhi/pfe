import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';
import {MatMenuModule} from '@angular/material/menu';
import {MatRippleModule} from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatChipsModule} from '@angular/material/chips';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatExpansionModule} from '@angular/material/expansion';

const materialModules = [
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatStepperModule,
    MatMenuModule,
    MatRippleModule,
    MatDialogModule,
    MatSidenavModule,
    MatDividerModule,
    MatChipsModule,
    MatProgressBarModule,
    MatSortModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatButtonToggleModule,
    MatMomentDateModule,
    MatExpansionModule,
];


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        materialModules
    ],
    exports: [
        materialModules
    ]
})
export class MaterialModule {
}
