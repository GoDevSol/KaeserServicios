import { NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';

import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { DataTablesModule } from "angular-datatables"

@NgModule({
  imports: [
    FormsModule,
    DataTablesModule,
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    TypeaheadModule.forRoot(),
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule implements OnInit {

  ngOnInit() {

  }




}
