import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TecnicoEquipoComponent } from './tecnicoEquipo.component';

const routes: Routes = [
  {
    path: '',
    component: TecnicoEquipoComponent,
    data: {
      title: 'adminUser'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TecnicoEquipoRoutingModule { }
