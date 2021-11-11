import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';

import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

import { AConfigComponent } from './aConfig.component';
import { AConfigRoutingModule } from './aConfig-routing.module';

@NgModule({
  imports: [
    FormsModule,
    AConfigRoutingModule,    
    BsDropdownModule,
    CommonModule,
    ButtonsModule.forRoot(),    
    ModalModule.forRoot(),    
    TypeaheadModule.forRoot(),
  ],
  declarations: [ AConfigComponent ]
})
export class AConfigModule { }
