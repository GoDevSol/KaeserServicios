import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { RegisterService } from './services/register.service';
import { Storage } from '@ionic/storage';
import { Location } from "@angular/common";


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})


export class AppComponent implements OnInit {

  asideVisible: boolean = false;
  public Nombre = "";
  public Compania = "";
  JWT = "";

  public appPages = [
    { title: 'Inicio', url: '/principal', icon: 'reorder-four' },
    { title: 'Notificaciones', url: '/notificaciones', icon: 'notifications' },
    { title: 'Conócenos', url: '/conocenos', icon: 'file-tray-full' },
    { title: 'Cotización de Servicios Kaeser', url: '/cotizacion', icon: 'cart' },
    { title: 'Conoce nuestros Convenios de Mantenimiento', url: '/convenio', icon: 'clipboard' },
    { title: 'Atención al Cliente', url: '/atencion', icon: 'people-circle' },
    { title: 'Cerrar Sesión', url: '/login', icon: 'log-out' },
  ];

  constructor(private location: Location, private router: Router, private menu: MenuController, private storage: Storage, private registerService: RegisterService) {

    router.events.subscribe(val => {

      if (location.isCurrentPathEqualTo("/login")) {
        this.asideVisible = false;
      } else {
        this.asideVisible = true;
      }
    });

  }

  async onMenuOpen() {
    try {
      this.JWT = await this.storage.get('JWT');
      let Productos = await this.registerService.getUserData(this.JWT);
      this.Nombre = Productos.data.nombre + " " + Productos.data.apellido;
      this.Compania = Productos.data.compania;
    } catch (error) {
      this.Nombre = "";
      this.Compania = "";
    }

  }


  ngOnInit() {
  }

  logOut(url) {
    if (url == "/login") {
      this.storage.set("isLogged", false);
      this.storage.set("JWT", "");
    }
  }


}
