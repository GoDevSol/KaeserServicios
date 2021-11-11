import { ApiService } from './../../api/api.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';

@Component({
  templateUrl: 'aConfig.component.html'
})
export class AConfigComponent implements OnInit {

  constructor(public api: ApiService, private modalService: BsModalService) { }
  modalRef: BsModalRef;
  message: string;
  selected: string;
  CorreoAdmin = { id: "", valor: "" };
  CorreoConvenio = { id: "", valor: "" };
  CorreoCotizacion = { id: "", valor: "" };
  noResult = false;
  states = []

  selectedValue: string;
  IdSolicitud;
  CantidadPermitida;
  selectedOption: any;
  previewOption?: any;

  async ngOnInit() {
    this.states = await this.api.getCompany()


    var configResultData = await this.api.getConfig()

    var Correo = configResultData.filter(data => data.configuracion == "correoAdmin");
    this.CorreoAdmin = Correo[0]

    Correo = configResultData.filter(data => data.configuracion == "correoConvenios");
    this.CorreoConvenio = Correo[0]

    Correo = configResultData.filter(data => data.configuracion == "correoCotizaciones");
    this.CorreoCotizacion = Correo[0]

  }

  dismiss() {
    window.location.reload();
  }

  decline(): void {
    this.modalRef.hide();
  }


  onSelect(event: TypeaheadMatch): void {
    this.selectedOption = event.item;
    this.CantidadPermitida = event.item.cantidadDeUsuarios;

  }

  onPreview(event: TypeaheadMatch): void {
    if (event) {
      this.previewOption = event.item;
    } else {
      this.previewOption = null;
    }
  }

  async ActualizarCantidad() {
    await this.api.modifiedConfigCantidad({ soldToParty: this.selectedOption.soldToParty, cantidadDeUsuarios: this.CantidadPermitida })
    this.dismiss()
  }

  async ActualizarCorreo(data) {
    await this.api.modifiedConfig({ id: data.id, valor: data.valor })
    this.dismiss()
  }



}
