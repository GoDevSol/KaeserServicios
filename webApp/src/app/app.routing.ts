import { EncuestaComponent } from './views/encuesta/encuesta.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { LogOutComponent } from './views/logOut/login.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login/:urlBack',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'encuesta',
    component: EncuestaComponent,
    data: {
      title: 'Encuesta de Satisfaccion'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'passWord',
        loadChildren: () => import('./views/aPassword/aPassword.module').then(m => m.APasswordModule)
      },
      {
        path: 'adminUser',
        loadChildren: () => import('./views/admin/admin.module').then(m => m.AdminModule)
      },
      {
        path: 'aHistorial',
        loadChildren: () => import('./views/aHistorial/aHistorial.module').then(m => m.AHistorialModule)
      },
      {
        path: 'aQRCreator',
        loadChildren: () => import('./views/aQR/aqr.module').then(m => m.AQRModule)
      },
      {
        path: 'adminEncuesta',
        loadChildren: () => import('./views/adminEncuesta/adminEncuesta.module').then(m => m.AdminEncuestaModule)
      },
      {
        path: 'tecnicoEquipoWithQR/:qrCode',
        loadChildren: () => import('./views/tecnicoQR/tecnicoQR.module').then(m => m.TecnicoQRModule)
      },

      {
        path: 'tecnicoEquipo',
        loadChildren: () => import('./views/tecnicoEquipo/tecnicoEquipo.module').then(m => m.TecnicoEquipoModule)
      },
      {
        path: 'aLoadData',
        loadChildren: () => import('./views/aLoadData/aLoadData.module').then(m => m.ALoadDataModule)
      },
      {
        path: 'aConfig',
        loadChildren: () => import('./views/aConfig/aConfig.module').then(m => m.AConfigModule)
      },
      {
        path: 'aModifiedData',
        loadChildren: () => import('./views/aModifiedData/aModifiedData.module').then(m => m.ALoadDataModule)
      }
    ]
  },
  {
    path: 'logOut',
    component: LogOutComponent
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
