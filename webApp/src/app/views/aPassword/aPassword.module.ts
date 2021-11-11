import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';

import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

import { APasswordComponent } from './aPassword.component';
import { APasswordRoutingModule } from './aPassword-routing.module';

@NgModule({
  imports: [
    FormsModule,
    APasswordRoutingModule,
    BsDropdownModule,
    CommonModule,
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    TypeaheadModule.forRoot(),
  ],
  declarations: [APasswordComponent]
})
export class APasswordModule { }
