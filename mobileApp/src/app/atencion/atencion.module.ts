import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AtencionPageRoutingModule } from './atencion-routing.module';

import { AtencionPage } from './atencion.page';
import { CallNumber } from '@ionic-native/call-number/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,    
    IonicModule,
    AtencionPageRoutingModule
  ],
  providers: [   
    CallNumber,    
	],
  declarations: [AtencionPage]
})
export class AtencionPageModule {}
