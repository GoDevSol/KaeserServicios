import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    title: true,
    name: 'Usuarios'
  },
  {
    name: 'Usuarios Aplicaciòn',
    url: '/dashboard',
    icon: 'icon-speedometer'
  },
  {
    title: true,
    name: 'Administraciòn'
  },
  {
    name: 'Usuarios Web',
    url: '/adminUser',
    icon: 'cil-user'
  },
  {
    name: 'Configuracion',
    url: '/aConfig',
    icon: 'cil-apps-settings'
  }
  ,
  {
    title: true,
    name: 'Base De Datos'
  },
  {
    name: 'Cargar Datos',
    url: '/aLoadData',
    icon: 'cil-gauge'
  }, {
    name: 'Historial',
    url: './aHistorial',
    icon: 'cil-av-timer'
  }, {
    title: true,
    name: 'Usuario'
  },
  {
    name: 'Cambio de Contraseña',
    url: '/passWord',
    icon: 'cil-user'
  },
  {
    name: 'Log Out',
    url: '/logOut',
    icon: 'cil-account-logout'
  },




];
