import { ApiService } from './../../api/api.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  templateUrl: 'aHistorial.component.html'
})
export class AHistorialComponent implements OnInit {

  constructor(public api: ApiService, private modalService: BsModalService) { }


  modalRef: BsModalRef;

  noResult = false;
  states = []

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  records = [];
  historial = [];



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



  async openModal(template: TemplateRef<any>, item) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
    this.historial = await this.api.getProductHistorial({ equipment: item.equipment })
  }


  decline(): void {
    this.modalRef.hide();
  }

}
