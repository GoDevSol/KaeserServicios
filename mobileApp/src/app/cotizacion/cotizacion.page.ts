import { Component, OnInit } from '@angular/core';
import {NavController, ToastController } from '@ionic/angular';
import { RegisterService } from '../services/register.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.page.html',
  styleUrls: ['./cotizacion.page.scss'],
})
export class CotizacionPage implements OnInit {
  formRegister: FormGroup;  
  JWT = "";
  
  constructor(public toastController: ToastController,private formBuilder: FormBuilder,private registerService: RegisterService,private navCtrl: NavController,private storage: Storage) { 
    this.formRegister = this.formBuilder.group({
      nombre: new FormControl("", Validators.compose([Validators.required])),
      apellido: new FormControl("", Validators.compose([Validators.required])),
      compañia: new FormControl("", Validators.compose([Validators.required])),
      telefono: new FormControl("", Validators.compose([Validators.required,Validators.min(10000000),Validators.maxLength(8)])),
      correo: new FormControl("", Validators.compose([Validators.required,Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")]))
    })
    
  }

  async ngOnInit() {
    this.formRegister.reset()
    try {
      this.JWT = await this.storage.get('JWT');      
      let Productos = await this.registerService.getUserData(this.JWT);      
      console.log(Productos)
      this.formRegister.controls.nombre.setValue(Productos.data.nombre);
      this.formRegister.controls.apellido.setValue(Productos.data.apellido);
      this.formRegister.controls.compañia.setValue(Productos.data.compania);
      this.formRegister.controls.telefono.setValue(Productos.data.telefono);
      this.formRegister.controls.correo.setValue(Productos.data.correo);
      
      
      
      
  } catch (error) {        
   
  }


  }


  SendEmail(valuesEmail){
    this.registerService.sendEmailCotizacion(valuesEmail, "Cotizacion").then(res=> {      
      this.formRegister.reset()
      this.navCtrl.navigateBack('/principal')
      this.handleButtonClick()
    })
  }


  
  async handleButtonClick() {
    const toast = await this.toastController.create({
      color: 'dark',
      message: 'Se ha enviado la solicitud de cotizacion exitosamente.',
      header: 'Cotizacion',      
      position: 'top',
      duration: 1500
    });
    this.navCtrl.navigateBack('/principal')
    toast.present();
  }

  home(){
    this.formRegister.reset()
    this.navCtrl.navigateBack('/principal')
    
  }

    

}
