import { Router } from '@angular/router';
import { ApiService } from '../../api/api.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';

@Component({
  templateUrl: 'aPassword.component.html'
})
export class APasswordComponent implements OnInit {

  @ViewChild('error') error: TemplateRef<any>;

  password = "";
  passwordOld = "";
  passwordConfirm = "";

  constructor(public api: ApiService, private modalService: BsModalService, public router: Router) { }

  modalRef: BsModalRef;


  async ngOnInit() {
  }

  dismiss() {
    window.location.reload();
  }

  decline(): void {
    this.modalRef.hide();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }



  async ActualizarContra() {
    let jwt = localStorage.getItem("JWT");

    let respuesta = await this.api.updatePassword({ jwt: jwt, passwordOld: this.passwordOld, password: this.password, passwordConfirm: this.passwordConfirm })
    if (respuesta.message == true) {
      this.router.navigateByUrl("/login")
      localStorage.clear()
    } else {
      this.openModal(this.error)

    }
  }



}
