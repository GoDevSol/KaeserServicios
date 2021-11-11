import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificacionPage3PageRoutingModule } from './notificacion-page3-routing.module';

import { NotificacionPage3Page } from './notificacion-page3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    NotificacionPage3PageRoutingModule
  ],
  declarations: [NotificacionPage3Page]
})
export class NotificacionPage3PageModule {}
