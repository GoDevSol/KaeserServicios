import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from "angular-datatables"

import { AQRComponent } from './aqr.component';
import { AQRRoutingModule } from './aqr-routing.module';

import { ModalModule } from 'ngx-bootstrap/modal';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ModalModule,
    DataTablesModule,
    AQRRoutingModule,
    BsDropdownModule,
    ModalModule.forRoot(),
    TypeaheadModule.forRoot(),
    ButtonsModule.forRoot()
  ],
  declarations: [AQRComponent]
})
export class AQRModule { }
