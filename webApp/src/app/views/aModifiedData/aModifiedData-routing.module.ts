import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AModifiedDataComponent } from './aModifiedData.component';

const routes: Routes = [
  {
    path: '',
    component: AModifiedDataComponent,
    data: {
      title: 'adminUser'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AModifiedDataRoutingModule {}
