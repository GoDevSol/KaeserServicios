import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from "angular-datatables"

import { AHistorialComponent } from './aHistorial.component';
import { AHistorialRoutingModule } from './aHistorial-routing.module';

import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ModalModule,
    DataTablesModule,
    AHistorialRoutingModule,
    BsDropdownModule,
    ModalModule.forRoot(),
    ButtonsModule.forRoot()
  ],
  declarations: [AHistorialComponent]
})
export class AHistorialModule { }
