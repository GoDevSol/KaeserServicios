import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public URL = "https://godevsol.tech/api/";
  public URL_QR = "https://kaeserservicios.com/#/tecnicoEquipoWithQR/";

  constructor() { }


  //FILE
  async loadFile(file) {
    return await this.resolverSolicitudSinJSON(this.URL + "upload.php", file);
  }


  //SOLICITUDES

  async getSolicitudes() {
    return await this.resolverSolicitud(this.URL + "solicitudes/read.php");
  }

  async updateRechazarSol(json) {
    return await this.resolverSolicitudParams(this.URL + "solicitudes/rechazar.php", json);
  }

  async updateEliminarSol(json) {
    return await this.resolverSolicitudParams(this.URL + "solicitudes/eliminar.php", json);
  }

  async updateConfirmarSol(json) {
    return await this.resolverSolicitudParams(this.URL + "solicitudes/aceptar.php", json);
  }


  //PRODUCT
  async getCompany() {
    return await this.resolverSolicitud(this.URL + "product/CompanyShow.php");
  }

  async getAllCompany() {
    return await this.resolverSolicitud(this.URL + "product/ProductShowAll.php");
  }

  async getAllCompanyWithQR() {
    return await this.resolverSolicitud(this.URL + "product/ProductShowAllWithQR.php");
  }

  async getCompanyAndEquipment(json) {
    return await this.resolverSolicitudParams(this.URL + "product/validateProduct.php", json);
  }

  async validateQRCode(json) {
    return await this.resolverSolicitudParams(this.URL + "product/validateQRCode.php", json);
  }



  //PRODUCT HISTORIAL

  async createProductHistorial(json) {
    return await this.resolverSolicitudParamsWithOutAData(this.URL + "productHistorial/create.php", json);
  }

  async getProductHistorial(json) {
    return await this.resolverSolicitudParams(this.URL + "productHistorial/read.php", json);
  }




  //USERWEB

  async login(json) {
    return await this.resolverSolicitudParamsWithOutAData(this.URL + "userWeb/login.php", json);
  }

  async validateToken(json) {
    return await this.resolverSolicitudParams(this.URL + "login/validate_token.php", json);
  }

  async getUserWeb() {
    return await this.resolverSolicitud(this.URL + "userWeb/read.php");
  }

  async getUserWebById(json) {
    return await this.resolverSolicitudParams(this.URL + "userWeb/readUser.php", json);
  }

  async createUserWeb(json) {
    return await this.resolverSolicitudParams(this.URL + "userWeb/create.php", json);
  }

  async modifiedUserWeb(json) {
    return await this.resolverSolicitudParams(this.URL + "userWeb/modified.php", json);
  }

  async rechazarUserWeb(json) {
    return await this.resolverSolicitudParams(this.URL + "userWeb/delete.php", json);
  }

  async reinicarUserWeb(json) {
    return await this.resolverSolicitudParams(this.URL + "userWeb/updatePasswordUser.php", json);
  }


  async updatePassword(json) {
    return await this.resolverSolicitudParamsWithOutAData(this.URL + "userWeb/updatePassword.php", json);
  }

  //CONFIG

  async getConfig() {
    return await this.resolverSolicitud(this.URL + "configuracion/read.php");
  }

  async modifiedConfigCantidad(json) {
    return await this.resolverSolicitudParams(this.URL + "configuracion/updateCantidad.php", json);
  }

  async modifiedConfig(json) {
    return await this.resolverSolicitudParams(this.URL + "configuracion/update.php", json);
  }




  //ENCUESTA HEADER



  async getEncuestaHeader() {
    return await this.resolverSolicitud(this.URL + "encuestaHeader/read.php");
  }


  async createEncuesta(json) {
    return await this.resolverSolicitudParamsWithOutAData(this.URL + "encuestaHeader/create.php", json);
  }

  async updateEncuesta(json) {
    return await this.resolverSolicitudParamsWithOutAData(this.URL + "encuestaHeader/update.php", json);
  }





  //RESOLVE

  async resolverSolicitud(url) {
    var data = await fetch(url)
    var result = await data.json()
    return result.data;
  }

  async resolverSolicitudParams(url, json) {
    var data = await fetch(url, {
      method: "POST",
      body: JSON.stringify(json)
    })
    var result = await data.json()

    return result.data;
  }

  async resolverSolicitudParamsWithOutAData(url, json) {
    var data = await fetch(url, {
      method: "POST",
      body: JSON.stringify(json)
    })
    var result = await data.json()


    return result;
  }


  async resolverSolicitudSinJSON(url, file) {
    var data = await fetch(url, {
      method: "POST",
      body: file
    })
    var result = await data.json()

    return result.data;
  }









}
