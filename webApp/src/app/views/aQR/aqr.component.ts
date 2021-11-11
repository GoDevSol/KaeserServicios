import { ApiService } from '../../api/api.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  templateUrl: 'aQR.component.html'
})
export class AQRComponent implements OnInit {

  constructor(public api: ApiService, private modalService: BsModalService) { }

  imagePath = "";
  modalRef: BsModalRef;
  message: string;
  selected: string;
  equipment;
  noResult = false;
  states = []

  selectedValue: string;
  url;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();


  records = [];
  record = [];
  historial = [];



  async ngOnInit() {

    this.records = await this.api.getAllCompanyWithQR()

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

    this.record = [item]

    this.url = encodeURIComponent(this.api.URL_QR + item.QRCode).replace(/'/g, "%27").replace(/"/g, "%22");



    this.imagePath = "https://api.qrserver.com/v1/create-qr-code/?data=" + this.url + "&amp;size=500x500"

  }


  decline(): void {
    this.modalRef.hide();
  }

  openImage(): void {
    window.open("https://api.qrserver.com/v1/create-qr-code/?data=" + this.url + "&amp;size=1000x1000", '_blank');

  }





}
