import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule } from '@angular/common';
import { TecnicoEquipoComponent } from './tecnicoEquipo.component';
import { TecnicoEquipoRoutingModule } from './tecnicoEquipo-routing.module';

import { ModalModule } from 'ngx-bootstrap/modal';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ModalModule,

    TecnicoEquipoRoutingModule,
    BsDropdownModule,
    ModalModule.forRoot(),
    TypeaheadModule.forRoot(),
    ButtonsModule.forRoot()
  ],
  declarations: [TecnicoEquipoComponent]
})
export class TecnicoEquipoModule { }
