import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AConfigComponent } from './aConfig.component';

const routes: Routes = [
  {
    path: '',
    component: AConfigComponent,
    data: {
      title: 'adminUser'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AConfigRoutingModule {}
