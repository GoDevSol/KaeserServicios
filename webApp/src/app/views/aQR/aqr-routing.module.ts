import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AQRComponent } from './aqr.component';

const routes: Routes = [
  {
    path: '',
    component: AQRComponent,
    data: {
      title: 'adminUser'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AQRRoutingModule { }
