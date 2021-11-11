import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminEncuestaComponent } from './adminEncuesta.component';

const routes: Routes = [
  {
    path: '',
    component: AdminEncuestaComponent,
    data: {
      title: 'adminUser'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminEncuestaRoutingModule { }
