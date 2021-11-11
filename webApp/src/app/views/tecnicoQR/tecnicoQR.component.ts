import { ApiService } from '../../api/api.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: 'tecnicoQR.component.html'
})
export class TecnicoQRComponent implements OnInit {

  @ViewChild('reiniciar') reiniciar: TemplateRef<any>;

  @ViewChild('error') error: TemplateRef<any>;

  constructor(public api: ApiService, private modalService: BsModalService, private router: Router, private rutaActiva: ActivatedRoute) { }


  modalRef: BsModalRef;
  message: string;
  selected: string;
  url;
  IdSolicitud
  horo = 0;
  fecha

  records = [];

  async ngOnInit() {
    let jwt = await localStorage.getItem("JWT")

    if (jwt) {
      this.url = this.rutaActiva.snapshot.params.qrCode;

      let Equipo = await this.api.validateQRCode({ QRcode: this.url })
      if (Equipo) {
        this.records = Equipo;

        this.IdSolicitud = Equipo[0].equipment
      } else {
        this.router.navigateByUrl("/*")
      }


    }


  }



  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }


  decline(): void {
    this.modalRef.hide();
  }

  async validarDato() {


    if ((this.horo > 0) && (this.fecha != undefined)) {

      this.reiniciarHorometro()


    } else {
      this.openModal(this.error)
    }
  }


  async reiniciarHorometro() {
    let result = await this.api.createProductHistorial({ id: this.IdSolicitud, horo: this.horo, fecha: this.fecha })
    if (result.success) {
      this.decline()
      window.location.reload();
    } else {
      this.decline()
      this.openModal(this.error)
    }
  }



}
