import { INavData } from '@coreui/angular';

export const navItemsInt: INavData[] = [
  {
    title: true,
    name: 'Tecnico'
  },
  {
    name: 'Equipos',
    url: '/tecnicoEquipo',
    icon: 'cil-gauge'
  }, {
    title: true,
    name: 'Usuario'
  }, {
    name: 'Cambio de Contraseña',
    url: '/passWord',
    icon: 'cil-user'
  },
  {
    name: 'Log Out',
    url: '/login',
    icon: 'cil-account-logout'
  },



];
