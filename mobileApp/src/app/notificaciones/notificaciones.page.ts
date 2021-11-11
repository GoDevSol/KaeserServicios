import { Component, OnInit } from '@angular/core';
import {ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
})
export class NotificacionesPage implements OnInit {

  constructor(private router: Router,public toastController: ToastController) { }

  ngOnInit() {
  }
  
  async handleButtonClick() {
    const toast = await this.toastController.create({
      color: 'dark',
      message: 'Se ha enviado el convenio de mantenimiento exitosamente.',
      header: 'Convenio de Mantenimiento',      
      position: 'top',
      duration: 2500
    });
    this.router.navigateByUrl('/principal')
    toast.present();
  }

  home(){
    this.router.navigateByUrl('/principal')
  }

  nextPage(){
    this.router.navigateByUrl('/notificacion-page2')
  }

  

}
