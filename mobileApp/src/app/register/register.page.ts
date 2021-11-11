import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  formRegister: FormGroup;


  constructor(private router: Router, private formBuilder: FormBuilder, private registerService: RegisterService, private navCtrl: NavController) {
    this.formRegister = this.formBuilder.group({
      nombre: new FormControl("", Validators.compose([Validators.required])),
      apellido: new FormControl("", Validators.compose([Validators.required])),
      compañia: new FormControl("", Validators.compose([])),
      telefono: new FormControl("", Validators.compose([Validators.min(10000000), Validators.maxLength(8)])),
      correo: new FormControl("", Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")]))
    })
  }

  ngOnInit() {
  }


  home() {
    this.formRegister.reset()
    this.navCtrl.navigateBack('/login')
  }

  registerUser(credenciales) {
    this.registerService.registerUser(credenciales).then(res => {
      this.formRegister.reset()
      this.navCtrl.navigateBack('/login')
    })


  }


}
