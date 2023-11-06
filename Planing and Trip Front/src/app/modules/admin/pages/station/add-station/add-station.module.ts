import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddStationRoutingModule } from './add-station-routing.module';
import {MaterialModule} from '../../../../../shared/material/material.module';
import {AddStationComponent} from './add-station.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [AddStationComponent],
  imports: [
    CommonModule,
    AddStationRoutingModule,
      MaterialModule,
      ReactiveFormsModule
  ]
})
export class AddStationModule { }
