import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import {NavController, ToastController } from '@ionic/angular';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-notificacion-page3',
  templateUrl: './notificacion-page3.page.html',
  styleUrls: ['./notificacion-page3.page.scss'],
})
export class NotificacionPage3Page implements OnInit {
  formRegister: FormGroup;
  product: any;
  JWT;

  constructor(private storage:Storage,private navCtrl: NavController,public toastController: ToastController,private formBuilder: FormBuilder,private registerService: RegisterService) { 

    this.formRegister = this.formBuilder.group({
    nombre: new FormControl("", Validators.compose([Validators.required])),
    apellido: new FormControl("", Validators.compose([Validators.required])),
    compañia: new FormControl("", Validators.compose([Validators.required])),
    telefono: new FormControl("", Validators.compose([Validators.required,Validators.min(10000000),Validators.maxLength(8)])),
    correo: new FormControl("", Validators.compose([Validators.required,Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")]))
    })

  }

  

  async ngOnInit() {
    try {
      this.product = await this.storage.get('Equipos');     
      this.JWT = await this.storage.get('JWT');      
      let Productos = await this.registerService.getUserData(this.JWT);            
      this.formRegister.controls.nombre.setValue(Productos.data.nombre);
      this.formRegister.controls.apellido.setValue(Productos.data.apellido);
      this.formRegister.controls.compañia.setValue(Productos.data.compania);
      this.formRegister.controls.telefono.setValue(Productos.data.telefono);
      this.formRegister.controls.correo.setValue(Productos.data.correo);
      
    } catch (error) {        
      this.navCtrl.navigateForward('/login')
    }
    
  }
  

  
  SendEmail(valuesEmail){
    this.registerService.sendEmailCotizacionProductos(valuesEmail, this.product).then(res=> {      
      this.formRegister.reset()
      this.navCtrl.navigateBack('/principal')
      this.handleButtonClick()
    })
  }

  prevPage(){
    this.navCtrl.navigateBack('/notificacion-page2')
  }

  nextPage(){
    this.navCtrl.navigateBack('/notificacion-page3')
  }

  
  async handleButtonClick() {
    const toast = await this.toastController.create({
      color: 'dark',
      message: 'Se ha enviado el convenio de mantenimiento exitosamente.',
      header: 'Convenio de Mantenimiento',      
      position: 'top',
      duration: 2500
    });
    this.navCtrl.navigateBack('/principal')
    toast.present();
  }

}
