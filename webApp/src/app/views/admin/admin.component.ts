import { ApiService } from './../../api/api.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  templateUrl: 'admin.component.html'
})
export class AdminComponent implements OnInit {

  modalRef: BsModalRef;
  message: string;
  selected: string;
  noResult = false;
  states = []

  selectedValue: string;
  selectedOption: any;
  previewOption?: any;

  idUser = ""
  nombre = ""
  correo = ""
  tipo = 0

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();


  records = [];

  constructor(public api: ApiService, private modalService: BsModalService) { }

  async ngOnInit() {
    this.records = await this.api.getUserWeb()

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
    this.loadData(id);
  }

  async loadData(id) {
    var data = await this.api.getUserWebById({ id: id })
    let result = data[0]

    this.idUser = result.id;
    this.nombre = result.nombres
    this.tipo = result.tipo
    this.correo = result.correo
  }


  dismiss() {
    this.decline();
    window.location.reload();
  }


  decline(): void {
    this.modalRef.hide();
  }

  async createUser() {
    await this.api.createUserWeb({ nombres: this.nombre, tipo: this.tipo, correo: this.correo })
    this.decline();
    window.location.reload();
  }

  async modifiedUser() {
    await this.api.modifiedUserWeb({ id: this.idUser, nombres: this.nombre, tipo: this.tipo, correo: this.correo })
    this.decline();
    window.location.reload();
  }

  async rechazarUser() {
    await this.api.rechazarUserWeb({ id: this.idUser })
    this.dismiss()
    window.location.reload();
  }

  async ReinicarContraUser() {
    await this.api.reinicarUserWeb({ id: this.idUser })
    this.dismiss()
  }






}
