import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IntroGuard } from './guards/intro.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'principal',    
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule),
    canActivate:[IntroGuard]
  },
  {
    path: 'login',
    pathMatch: 'full',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'notificaciones',
    loadChildren: () => import('./notificaciones/notificaciones.module').then( m => m.NotificacionesPageModule),
    canActivate:[IntroGuard]
  },
  {
    path: 'conocenos',
    loadChildren: () => import('./conocenos/conocenos.module').then( m => m.ConocenosPageModule),    
  },
  {
    path: 'cotizacion',
    loadChildren: () => import('./cotizacion/cotizacion.module').then( m => m.CotizacionPageModule),    
  },
  {
    path: 'atencion',
    loadChildren: () => import('./atencion/atencion.module').then( m => m.AtencionPageModule),    
  },
  {
    path: 'convenio',
    loadChildren: () => import('./convenio/convenio.module').then( m => m.ConvenioPageModule),    
  },
  {
    path: 'notificacion-page2',
    loadChildren: () => import('./notificacion-page2/notificacion-page2.module').then( m => m.NotificacionPage2PageModule),
    canActivate:[IntroGuard]
  },
  {
    path: 'notificacion-page3',
    loadChildren: () => import('./notificacion-page3/notificacion-page3.module').then( m => m.NotificacionPage3PageModule),    
    canActivate:[IntroGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
