import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule } from '@angular/common';
import { ALoadDataComponent } from './aLoadData.component';
import { ALoadDataRoutingModule } from './aLoadData-routing.module';
import { DataTablesModule } from "angular-datatables"

import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ModalModule,
    DataTablesModule,
    ALoadDataRoutingModule,
    BsDropdownModule,
    ModalModule.forRoot(),
    ButtonsModule.forRoot()
  ],
  declarations: [ALoadDataComponent]
})
export class ALoadDataModule { }
