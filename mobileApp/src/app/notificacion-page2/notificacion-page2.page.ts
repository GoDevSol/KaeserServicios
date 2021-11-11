import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-notificacion-page2',
  templateUrl: './notificacion-page2.page.html',
  styleUrls: ['./notificacion-page2.page.scss'],
})
export class NotificacionPage2Page implements OnInit {
  JWT: String;
  public Compresores = []
  public form = [];

  constructor(private navCtrl: NavController,private storage: Storage,private registerService: RegisterService) { }

  async ngOnInit() {
    try {
      this.JWT = await this.storage.get('JWT');      
      let Productos = await this.registerService.getProducto(this.JWT);
      Productos.records.forEach(element => {
        
        this.form.push({
          val: element.Categoria + " " + element.Equipo,
          value: element.Value,
          isChecked: true,          
          color: element.Color,
          message: element.Message
        })      
      });   
  } catch (error) {        
    this.navCtrl.navigateForward('/login')
  }

      
  }

  crazyEvent(value) {
     if (value.detail.checked){
        this.Compresores.push(value.detail.value)
     }else{        
        this.Compresores.splice(this.Compresores.indexOf(value.detail.value), 1);
     }
      
   
}

  prevPage(){
    this.navCtrl.navigateBack('/notificaciones')
  }

  nextPage(){
    this.storage.set("Equipos", this.Compresores.toString());      
    this.navCtrl.navigateForward('/notificacion-page3')
  }

  

}
