import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificacionPage2PageRoutingModule } from './notificacion-page2-routing.module';

import { NotificacionPage2Page } from './notificacion-page2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificacionPage2PageRoutingModule
  ],  
  declarations: [NotificacionPage2Page]
})
export class NotificacionPage2PageModule {}
