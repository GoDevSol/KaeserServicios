import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConvenioPageRoutingModule } from './convenio-routing.module';

import { ConvenioPage } from './convenio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ConvenioPageRoutingModule
  ],
  declarations: [ConvenioPage]
})
export class ConvenioPageModule {}
