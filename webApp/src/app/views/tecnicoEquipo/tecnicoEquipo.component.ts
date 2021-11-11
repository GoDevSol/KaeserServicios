import { ApiService } from './../../api/api.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';

@Component({
  templateUrl: 'tecnicoEquipo.component.html'
})
export class TecnicoEquipoComponent implements OnInit {

  @ViewChild('reiniciar') reiniciar: TemplateRef<any>;

  @ViewChild('error') error: TemplateRef<any>;
  @ViewChild('errorCompany') errorCompany: TemplateRef<any>;
  @ViewChild('errorHorometro') errorHorometro: TemplateRef<any>;

  constructor(public api: ApiService, private modalService: BsModalService) { }


  modalRef: BsModalRef;
  message: string;
  selected: string;
  file;
  noResult = false;
  states = []
  horo;
  fecha;

  selectedValue: string;
  IdSolicitud;
  numeroEquipo;
  selectedOption: any;
  previewOption?: any;



  records = [];



  async ngOnInit() {
    this.states = await this.api.getCompany()

    this.records = await this.api.getAllCompany()
  }



  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  async validarDato() {
    if (!(this.selectedOption == undefined)) {

      let result = await this.api.getCompanyAndEquipment({ soldToParty: this.selectedOption.soldToParty, equipment: this.numeroEquipo })

      if (!(result == undefined)) {
        this.records = result;

        this.IdSolicitud = result[0].equipment
        this.openModal(this.reiniciar)
      } else {
        this.openModal(this.error)
      }
    } else {
      this.openModal(this.errorCompany)
    }
  }


  decline(): void {
    this.modalRef.hide();
  }

  onSelect(event: TypeaheadMatch): void {
    this.selectedOption = event.item;

  }


  async reiniciarHorometro() {
    let result = await this.api.createProductHistorial({ id: this.IdSolicitud, horo: this.horo, fecha: this.fecha })
    if (result.success) {
      this.decline()
      window.location.reload();
    } else {
      this.decline()
      this.openModal(this.errorHorometro)
    }
  }


}
