import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {  

  constructor(private activatedRoute: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    
  }
  
  enviar(ruta){
    this.router.navigateByUrl('/'+ruta)
  }

  ionViewWillEnter() {
    console.log("VAMOS");
  }
  

}
