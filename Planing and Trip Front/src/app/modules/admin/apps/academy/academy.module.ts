import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTooltipModule} from '@angular/material/tooltip';
import {FuseFindByKeyPipeModule} from '@fuse/pipes/find-by-key';
import {SharedModule} from 'app/shared/shared.module';
import {academyRoutes} from 'app/modules/admin/apps/academy/academy.routing';
import {AcademyComponent} from 'app/modules/admin/apps/academy/academy.component';
import {AcademyListComponent} from 'app/modules/admin/apps/academy/list/list.component';
import {MatTabsModule} from '@angular/material/tabs';
import {ReactiveFormsModule} from '@angular/forms';
import {FuseDateRangeModule} from '../../../../../@fuse/components/date-range';
import {PaymentComponent} from './payment/payment.component';
import {MaterialModule} from '../../../../shared/material/material.module';
import {MatListModule} from '@angular/material/list';
import {NgxQRCodeModule} from '@techiediaries/ngx-qrcode';

@NgModule({
    declarations: [
        AcademyComponent,
        AcademyListComponent,
        PaymentComponent,
    ],
    imports: [
        RouterModule.forChild(academyRoutes),
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressBarModule,
        MatSelectModule,
        MatSidenavModule,
        MatSlideToggleModule,
        MatTooltipModule,
        FuseFindByKeyPipeModule,
        SharedModule,
        MatTabsModule,

        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,

        FuseDateRangeModule,
        MaterialModule,
        MatListModule,
        NgxQRCodeModule,
    ]
})
export class AcademyModule {
}
