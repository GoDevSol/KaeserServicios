import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { APasswordComponent } from './aPassword.component';

const routes: Routes = [
  {
    path: '',
    component: APasswordComponent,
    data: {
      title: 'adminUser'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class APasswordRoutingModule { }
