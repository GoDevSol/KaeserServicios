import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TecnicoQRComponent } from './tecnicoQR.component';

const routes: Routes = [
  {
    path: '',
    component: TecnicoQRComponent,
    data: {
      title: 'adminUser'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TecnicoQRRoutingModule { }
