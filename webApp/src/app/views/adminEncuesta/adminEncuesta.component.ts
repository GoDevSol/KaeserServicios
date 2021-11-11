import { ApiService } from '../../api/api.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  templateUrl: 'adminEncuesta.component.html'
})
export class AdminEncuestaComponent implements OnInit {

  modalRef: BsModalRef;


  noResult = false;
  states = []
  encuestas = []
  respuesta = { pregunta: "", tipo: 1, respuestas: [] };


  previewOption?: any;

  idUser = ""
  nombre = ""
  answer = ""
  item = { id: "", preguntas: "" }
  IndexAnswer = -1
  IndexQuestion = -1
  tipo = 0

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();


  records = [];

  constructor(public api: ApiService, private modalService: BsModalService) { }

  async ngOnInit() {
    this.records = await this.api.getEncuestaHeader()

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 25],
      processing: true
    };

    this.dtTrigger.next()
  }

  openModal(template: TemplateRef<any>, item) {


    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });

    this.encuestas = JSON.parse(item.preguntas.replaceAll('&quot;', '"'))
    this.item = item;
    this.respuesta = { pregunta: "", tipo: 1, respuestas: [] };
    this.IndexAnswer = -1
    this.IndexQuestion = -1

  }

  addQuestion() {
    this.respuesta = { pregunta: "", tipo: 1, respuestas: [] };
    this.encuestas.push(this.respuesta)
  }

  deleteQuestion() {
    this.encuestas.splice(this.IndexQuestion, 1);
  }

  addAnswer() {

    this.respuesta.respuestas.push({ valor: this.answer })
  }

  deleteAnswer() {
    this.respuesta.respuestas.splice(this.IndexAnswer, 1);
  }

  saveAnswer() {
    this.encuestas[this.IndexQuestion] = JSON.parse(JSON.stringify(this.respuesta))
    this.respuesta = { pregunta: "", tipo: 1, respuestas: [] };
    this.IndexQuestion = -1
  }

  async saveAll() {

    await this.api.updateEncuesta({ id: this.item.id, preguntas: JSON.stringify(this.encuestas) })
    this.dismiss()


  }



  eventGetChange(valor) {
    this.IndexAnswer = valor
  }

  eventGetChangeQ(valor) {
    this.respuesta = JSON.parse(JSON.stringify(this.encuestas[valor]))
    this.IndexQuestion = valor
  }


  dismiss() {
    this.decline();
    window.location.reload();
  }


  decline(): void {
    this.modalRef.hide();
  }

  async createUser() {
    let jwt = localStorage.getItem('JWT')
    await this.api.createEncuesta({ nombre: this.nombre, objetivo: this.tipo, jwt: jwt })
    this.dismiss()
  }




}
