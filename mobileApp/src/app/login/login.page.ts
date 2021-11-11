import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formLogin: FormGroup;


  constructor(private navCtrl: NavController, private storage: Storage, private formBuilder: FormBuilder, private loginService: LoginService, public toastController: ToastController) {

    this.formLogin = this.formBuilder.group({
      user: new FormControl("", Validators.compose([Validators.required])),
      password: new FormControl("", Validators.compose([Validators.required]))
    })


  }

  async ngOnInit() {

  }

  func(nav) {
    switch (nav) {
      case 1:
        this.navCtrl.navigateForward('/conocenos')
        break;
      case 2:
        this.navCtrl.navigateForward('/cotizacion')
        break;
      case 3:
        this.navCtrl.navigateForward('/convenio')
        break;
      case 4:
        this.navCtrl.navigateForward('/atencion')
        break;
    }

  }


  async getToast() {
    const toast = await this.toastController.create({
      color: 'dark',
      header: 'Usuario o Contraseña incorrectos.',
      position: 'top',
      duration: 750
    });
    toast.present();
  }

  async login(credentials) {
    const login = await this.loginService.loginUser(credentials)

    if (login.message == "Successful login.") {
      this.storage.create();
      this.formLogin.reset()
      this.storage.set("JWT", login.jwt);
      this.storage.set("isLogged", true);
      this.navCtrl.navigateForward('/principal')
    } else {
      this.getToast()
    }
  }

  registrar() {
    this.formLogin.reset()
    this.navCtrl.navigateForward('/register')
  }






}
