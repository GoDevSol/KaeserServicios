import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-atencion',
  templateUrl: './atencion.page.html',
  styleUrls: ['./atencion.page.scss'],
})
export class AtencionPage implements OnInit {

  constructor(public router: Router,private callNumber: CallNumber) { }

  ngOnInit() {
  }

  home(){
    this.router.navigateByUrl('/principal')
  }

  call(){
    this.callNumber.callNumber("+50224126000", true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }

}
