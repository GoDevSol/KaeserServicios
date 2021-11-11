import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificacionPage2Page } from './notificacion-page2.page';

const routes: Routes = [
  {
    path: '',
    component: NotificacionPage2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificacionPage2PageRoutingModule {}
