import { ApiService } from './../../api/api.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  templateUrl: 'aLoadData.component.html',
  styleUrls: ['aLoadData.component.css']

})
export class ALoadDataComponent implements OnInit {

  @ViewChild('error') error: TemplateRef<any>;

  constructor(public api: ApiService, private modalService: BsModalService) { }


  modalRef: BsModalRef;


  file;
  horo;
  fecha;
  noResult = false;
  states = []


  IdSolicitud;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();


  records = [];
  record = new Array();



  async ngOnInit() {
    this.records = await this.api.getAllCompany()

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 25],
      processing: true
    };

    this.dtTrigger.next()
  }

  openModalData(template: TemplateRef<any>, item) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
    this.record = [item];
    this.IdSolicitud = item.equipment;

  }

  openModal(template: TemplateRef<any>, id) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
    this.IdSolicitud = id;
  }




  decline(): void {
    this.modalRef.hide();
  }


  async LoadData() {
    var data = new FormData()
    data.append('file', this.file)

    await this.api.loadFile(data);
    this.decline()
    window.location.reload();

  }

  async reiniciarHorometro() {
    let result = await this.api.createProductHistorial({ id: this.IdSolicitud, horo: this.horo, fecha: this.fecha })
    if (result.success) {
      this.decline()
      window.location.reload();
    } else {
      this.decline()
      this.openModal(this.error, "")
    }
  }


  onFileChange(event: any) {
    this.file = event.target.files[0];
  }



}
