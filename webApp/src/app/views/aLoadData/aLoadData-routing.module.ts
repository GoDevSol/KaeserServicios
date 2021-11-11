import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ALoadDataComponent } from './aLoadData.component';

const routes: Routes = [
  {
    path: '',
    component: ALoadDataComponent,
    data: {
      title: 'adminUser'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ALoadDataRoutingModule {}
