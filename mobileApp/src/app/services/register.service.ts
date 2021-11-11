import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  APIURL = "https://godevsol.tech/api/";
  //APIURL = "http://localhost/api/";

  constructor() { }

  registerUser(credentials) {

    return fetch(this.APIURL + "solicitudes/create.php", {


      method: "POST",
      body: JSON.stringify({
        nombre: credentials.nombre,
        apellido: credentials.apellido,
        correo: credentials.correo,
        telefono: credentials.telefono,
        compania: credentials.compañia
      })
    }).then(res => { return res.json() })
  }


  sendEmailConvenio(credentials, body) {

    return fetch(this.APIURL + "email/sendMailConvenio.php", {


      method: "POST",
      body: JSON.stringify({
        nombre: credentials.nombre,
        apellido: credentials.apellido,
        correo: credentials.correo,
        telefono: credentials.telefono,
        compania: credentials.compañia,
        body: body
      })
    }).then(res => { return res.json() })
  }



  sendEmailCotizacion(credentials, body) {

    return fetch(this.APIURL + "email/sendMailCotizacion.php", {


      method: "POST",
      body: JSON.stringify({
        nombre: credentials.nombre,
        apellido: credentials.apellido,
        correo: credentials.correo,
        telefono: credentials.telefono,
        compania: credentials.compañia,
        body: body
      })
    }).then(res => { return res.json() })
  }

  sendEmailCotizacionProductos(credentials, body) {

    return fetch(this.APIURL + "email/sendEmailCotizacionProductos.php", {


      method: "POST",
      body: JSON.stringify({
        nombre: credentials.nombre,
        apellido: credentials.apellido,
        correo: credentials.correo,
        telefono: credentials.telefono,
        compania: credentials.compañia,
        body: body
      })
    }).then(res => { return res.json() })
  }


  getProducto(JWT) {

    return fetch(this.APIURL + "product/ProductShow.php", {
      method: "POST",
      body: JSON.stringify({ jwt: JWT })
    }).then(res => { return res.json() })
  }

  getUserData(JWT) {
    return fetch(this.APIURL + "login/validate_token.php", {
      method: "POST",
      body: JSON.stringify({ jwt: JWT })
    }).then(res => { return res.json() })
  }




}
