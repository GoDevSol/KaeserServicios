import { ApiService } from './../../api/api.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = "";
  password = "";
  url = "";
  constructor(private router: Router, public api: ApiService, private rutaActiva: ActivatedRoute) {
  }

  ngOnInit() {
    this.url = this.rutaActiva.snapshot.params.urlBack;
  }

  async login() {
    let respuesta = await this.api.login({ user: this.user, password: this.password })
    if (respuesta) {
      localStorage.setItem('JWT', respuesta.jwt)

      if (this.url) {

        this.url = this.url.replaceAll("**", "/")
        this.router.navigate([this.url])

      } else {
        let respuesta = await this.api.validateToken({ jwt: localStorage.getItem('JWT') })
        if (respuesta.tipo == 0) {
          this.router.navigateByUrl("/dashboard");
        } else {
          this.router.navigateByUrl("/tecnicoEquipo");
        }


      }
    }

  }

}
