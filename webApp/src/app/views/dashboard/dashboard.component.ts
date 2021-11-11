import { ApiService } from './../../api/api.service';
import { Component, OnInit, TemplateRef, AfterViewInit, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { Subject } from 'rxjs';



@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  modalRef: BsModalRef;
  message: string;
  selected: string;
  noResult = false;
  states = []

  dtOptions: DataTables.Settings = {};

  selectedValue: string;
  IdSolicitud;
  selectedOption: any;
  previewOption?: any;
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private modalService: BsModalService, public api: ApiService) { }

  records = []; negados = []; aceptados = []; pendientes = [];

  nombre = "";



  async ngOnInit() {
    this.records = await this.api.getSolicitudes()

    this.pendientes = this.records.filter(data => data.estado == 0);
    this.negados = this.records.filter(data => data.estado == -1);
    this.aceptados = this.records.filter(data => data.estado == 1);


    this.states = await this.api.getCompany()

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 25],
      processing: true
    };

    this.dtTrigger.next()
  }



  openModal(template: TemplateRef<any>, id) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
    this.IdSolicitud = id;
  }


  async rechazarSol() {
    await this.api.updateRechazarSol({ id: this.IdSolicitud })
    this.dismiss()
  }

  dismiss() {
    this.decline();
    window.location.reload();
  }

  async eliminarUsuario() {

    await this.api.updateEliminarSol({ id: this.IdSolicitud })
    this.dismiss()
  }

  async confirmarSol() {

    await this.api.updateConfirmarSol({ id: this.IdSolicitud, codEmpresa: this.selectedOption.soldToParty, name: this.selectedOption.cliente })
    this.dismiss()

  }

  decline(): void {
    this.modalRef.hide();
  }





  onSelect(event: TypeaheadMatch): void {
    this.selectedOption = event.item;

  }

  onPreview(event: TypeaheadMatch): void {
    if (event) {
      this.previewOption = event.item;
    } else {
      this.previewOption = null;
    }
  }

}
