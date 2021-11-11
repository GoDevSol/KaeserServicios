import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DataTablesModule } from "angular-datatables"
import { AdminEncuestaComponent } from './adminEncuesta.component';
import { AdminEncuestaRoutingModule } from './adminEncuesta-routing.module';

@NgModule({
  imports: [
    FormsModule,
    DataTablesModule,
    AdminEncuestaRoutingModule,
    BsDropdownModule,
    CommonModule,
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
  ],
  declarations: [AdminEncuestaComponent]
})
export class AdminEncuestaModule { }
