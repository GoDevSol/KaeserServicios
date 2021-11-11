import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule } from '@angular/common';
import { TecnicoQRComponent } from './tecnicoQR.component';
import { TecnicoQRRoutingModule } from './tecnicoQR-routing.module';

import { ModalModule } from 'ngx-bootstrap/modal';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';


@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ModalModule,
    TecnicoQRRoutingModule,
    BsDropdownModule,
    ModalModule.forRoot(),
    TypeaheadModule.forRoot(),
    ButtonsModule.forRoot()
  ],
  declarations: [TecnicoQRComponent]
})
export class TecnicoQRModule { }
